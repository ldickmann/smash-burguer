/* global process */
// §13.5 Teclado: só Tab, Shift+Tab, Enter, Espaço, setas e Esc (SPEC-material §13.5 e §13.3, item 6).
// No Cardápio (etapa 6): o grupo de categorias com rádios nativos (uma parada no Tab, setas que marcam e
// a volta do último ao primeiro), o foco não coberto pelo grupo grudado e pelo cabeçalho (1440, 390 e
// 360) e o grupo numa linha em 360 px. No carrinho e no pagamento (etapa 7): as setas do pagamento em
// 390 com a altura de KB_ALTURA (rode com 844, 830 e 800), o Shift+Tab sem forma marcada, o foco não
// coberto no carrinho do visitante e no pagamento sem endereço, e o "Remover" vizinho contra o aviso.
import { chromium } from 'playwright';
const BASE = 'http://localhost:4173/smash-burguer/';
// Altura das telas da checagem do foco não coberto (padrão 844, a da matriz da §13.3)
const ALTURA = Number(process.env.KB_ALTURA || 844);
const USER = { firstName: 'Maria', lastName: 'Silva', email: 'maria@example.com', password: 'senha123', CEP: '88370000', address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' } };
const SESSION = { user: USER, isAuthenticated: true, orderHistory: [], lastOrderId: null, nextOrderId: 1001 };
const CART = { items: [{ productId: 1, category: 'foods', name: 'Cheese Bacon', image: '/images/foods/cheese-bacon', unitPrice: 25.99, quantity: 1, removedIngredients: [], additionals: [], observation: '' }] };
// Pedido feito, para a confirmação abrir na checagem do foco não coberto
const ORDER = { id: 1001, date: '2026-10-17T22:15:00.000Z', status: 'Recebido', paymentMethod: 'PIX', total: 25.99, address: USER.address, items: CART.items };
const SESSION_PEDIDO = { ...SESSION, orderHistory: [ORDER], lastOrderId: 1001, nextOrderId: 1002 };
let failures = 0;
const check = (c, l, x = '') => { if (!c) failures++; console.log(`${c ? '  ✓' : '  ✗'} ${l}${x ? ` — ${x}` : ''}`); };
const browser = await chromium.launch();
const seed = (ctx, s) => ctx.addInitScript((s) => { if (!sessionStorage.getItem('k')) { localStorage.clear(); for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v); sessionStorage.setItem('k', '1'); } }, Object.fromEntries(Object.entries(s).map(([k, v]) => [k, JSON.stringify(v)])));

// Anel visível no elemento focado (ou no card do rádio escondido): 3 px (SPEC-material §2.2 e §13.5).
// O link da assinatura de autoria fica fora das convenções (CLAUDE.md) e mantém o anel próprio, de 2 px
const ringOf = () => {
  let el = document.activeElement;
  if (el.matches('input.visually-hidden')) el = el.closest('label');
  const s = getComputedStyle(el);
  const w = parseFloat(s.outlineWidth);
  const min = el.matches('.ldk-encaixe__l') ? 2 : 3;
  return { tag: el.tagName, name: (el.getAttribute('aria-label') || el.textContent || el.id || '').trim().replace(/\s+/g, ' ').slice(0, 28), ok: s.outlineStyle !== 'none' && w >= min, outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}` };
};

// §13.3, item 6: em 390, o elemento focado nunca fica inteiro dentro da toolbar flutuante. Com a
// reserva do pé (scroll-padding-bottom e padding-bottom de --m3-barra-reserva), também não encosta nela:
// a toolbar fica 16 px acima da borda, então um foco rolado até a borda nunca ficaria inteiro dentro.
// Mede o que aparece com o anel: o card do rádio escondido (1×1 px) e o retângulo somado ao anel
const coveredBy = () => {
  let el = document.activeElement;
  const bar = document.querySelector('.m3-ferramentas');
  if (bar.contains(el) || el === document.body) return null;
  if (el.matches('input.visually-hidden')) el = el.closest('label') ?? el;
  const s = getComputedStyle(el);
  const ring = s.outlineStyle === 'none' ? 0 : Math.max(0, parseFloat(s.outlineWidth) + parseFloat(s.outlineOffset));
  const box = el.getBoundingClientRect();
  const r = { left: box.left - ring, right: box.right + ring, top: box.top - ring, bottom: box.bottom + ring };
  const b = bar.getBoundingClientRect();
  const name = `${el.tagName} "${(el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28)}"`;
  const inside = box.width > 0 && r.left >= b.left && r.right <= b.right && r.top >= b.top && r.bottom <= b.bottom;
  const overlap = Math.min(r.right, b.right) > Math.max(r.left, b.left) && Math.min(r.bottom, b.bottom) > Math.max(r.top, b.top);
  return { name, inside, overlap };
};

// `title` é o começo do document.title da rota: a espera por ele garante a view desenhada
async function openRoute(page, hash, title) {
  await page.goto(BASE + hash);
  await page.waitForLoadState('networkidle');
  await page.waitForFunction((t) => document.title.startsWith(t), title, { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(250);
  return page.evaluate((t) => document.title.startsWith(t), title);
}

async function focusNotCovered(page, label, max = 150) {
  const hasBar = await page.evaluate(() => getComputedStyle(document.querySelector('.m3-ferramentas') ?? document.body).position === 'fixed');
  check(hasBar, `${label}: a toolbar flutuante está na página`);
  if (!hasBar) return;
  const seen = new Set();
  const covered = [];
  const touching = [];
  let count = 0;
  let ended = false;
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab');
    const key = await page.evaluate(() => { const el = document.activeElement; return el === document.body ? 'BODY' : `${el.tagName}:${(el.getAttribute('aria-label') || el.textContent || el.id || '').trim().slice(0, 40)}:${Math.round(el.getBoundingClientRect().top + scrollY)}`; });
    if (key === 'BODY' || seen.has(key)) { ended = true; break; }
    seen.add(key);
    count++;
    const c = await page.evaluate(coveredBy);
    if (c?.inside) covered.push(c.name);
    if (c?.overlap) touching.push(c.name);
  }
  check(ended, `${label}: o Tab percorreu a página inteira (${count} focos, limite ${max})`);
  check(covered.length === 0, `${label}: nenhum dos ${count} focos fica coberto pela toolbar`, covered.join(' | '));
  check(touching.length === 0, `${label}: a reserva do pé deixa todos os focos fora da toolbar`, touching.join(' | '));
}

// Desenho do Cardápio, §4 (2.4.11, decisão j): com o grupo de categorias grudado (e, a partir de lg, o
// cabeçalho sticky), o foco que volta pelos cards com Shift+Tab nunca fica inteiro sob as barras fixas
// do topo, nem encosta nelas. Mede o retângulo com o anel
async function focoSobAsBarras(page, label) {
  await page.goto(BASE + '#/menu');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(250);
  await page.locator('.menu-page__grade .m3-dividido__frente').last().focus();
  const cobertos = [];
  const encostados = [];
  let n = 0;
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Shift+Tab');
    const r = await page.evaluate(() => {
      const el = document.activeElement;
      if (!document.querySelector('.menu-page__grade')?.contains(el)) return { fim: true };
      const s = getComputedStyle(el);
      const anel = s.outlineStyle === 'none' ? 0 : Math.max(0, parseFloat(s.outlineWidth) + parseFloat(s.outlineOffset));
      const b = el.getBoundingClientRect();
      const barras = [document.querySelector('.category-tabs')];
      const cabecalho = document.querySelector('.m3-cabecalho');
      if (cabecalho && getComputedStyle(cabecalho).position === 'sticky') barras.push(cabecalho);
      const limite = Math.max(...barras.map((x) => x.getBoundingClientRect().bottom));
      const nome = (el.getAttribute('aria-label') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);
      return { nome, inteiro: b.bottom + anel <= limite, encosta: b.top - anel < limite };
    });
    if (r.fim) break;
    n++;
    if (r.inteiro) cobertos.push(r.nome);
    if (r.encosta) encostados.push(r.nome);
  }
  check(n > 5 && cobertos.length === 0, `${label}: voltando pelos ${n} focos da grade, nenhum fica inteiro sob as barras do topo`, cobertos.join(' | '));
  check(encostados.length === 0, `${label}: e nenhum encosta nelas (scroll-padding-top da rota)`, encostados.join(' | '));
}

async function tabAll(page, label, max = 60) {
  const seen = new Set();
  const bad = [];
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab');
    const r = await page.evaluate(ringOf);
    const key = `${r.tag}:${r.name}`;
    if (r.tag === 'BODY') break;
    if (seen.has(key) && seen.size > 3) break;
    seen.add(key);
    if (!r.ok) bad.push(`${key} (${r.outline})`);
  }
  check(bad.length === 0, `${label}: todos os ${seen.size} controles mostram o anel de foco`, bad.join(' | '));
}

for (const w of [1440, 390]) {
  console.log(`=== ${w}`);
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  await ctx.addInitScript(([s, c, u]) => { if (!sessionStorage.getItem('k')) { localStorage.clear(); localStorage.setItem('smash-burger:session', s); localStorage.setItem('smash-burger:cart:v1', c); localStorage.setItem('smash-burger:account', u); sessionStorage.setItem('k', '1'); } }, [JSON.stringify(SESSION), JSON.stringify(CART), JSON.stringify(USER)]);
  const page = await ctx.newPage();
  await page.goto(BASE + '#/');
  await page.waitForLoadState('networkidle');
  await page.keyboard.press('Tab');
  const skip = await page.evaluate(() => ({ text: document.activeElement.textContent.trim(), visible: getComputedStyle(document.activeElement).opacity === '1' }));
  check(skip.text === 'Pular para o conteúdo' && skip.visible, 'o primeiro Tab mostra o skip link');
  await page.keyboard.press('Enter');
  check(await page.evaluate(() => document.activeElement.id === 'conteudo'), 'Enter no skip link leva o foco ao conteúdo');

  // Ordem do Tab no topo: skip link, marca, Início, Cardápio, Perfil, carrinho e o <main>. O reload
  // começa o foco do início do documento (trocar só o hash manteria o foco no <main>)
  await page.goto(BASE + '#/menu');
  await page.reload();
  await page.waitForLoadState('networkidle');
  const order = [];
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press('Tab');
    order.push(await page.evaluate(() => { const el = document.activeElement; return document.getElementById('conteudo').contains(el) ? 'main' : (el.getAttribute('aria-label') || el.textContent).trim().replace(/\s+/g, ' '); }));
  }
  check(order.join(' | ') === 'Pular para o conteúdo | Smash Burger | Início | Cardápio | Perfil | Carrinho, 1 item | main', 'ordem do Tab: skip, marca, os 3 links, carrinho e main', order.join(' | '));
  await page.goto(BASE + '#/');
  await page.waitForLoadState('networkidle');
  await tabAll(page, 'Home');

  // Split da Home (SPEC-material §13.5): Enter e Espaço na metade de trás abrem e fecham a folha; Esc
  // fecha e devolve o foco à metade de trás
  const tras = page.getByRole('button', { name: 'Ingredientes de Cheese Bacon', exact: true });
  await tras.focus();
  const estado = () => page.evaluate(() => `${document.activeElement.getAttribute('aria-label')}:${document.activeElement.getAttribute('aria-expanded')}`);
  const passos = [];
  for (const tecla of ['Enter', 'Space', 'Space', 'Escape']) {
    await page.keyboard.press(tecla);
    await page.waitForTimeout(150);
    passos.push(`${tecla}→${(await estado()).split(':')[1]}`);
  }
  const fim = await estado();
  check(passos.join(' ') === 'Enter→true Space→false Space→true Escape→false' && fim === 'Ingredientes de Cheese Bacon:false', 'split da Home: Enter e Espaço alternam a folha, Esc fecha e o foco fica na metade de trás', `${passos.join(' ')} | ${fim}`);

  await page.goto(BASE + '#/menu');
  await page.waitForLoadState('networkidle');
  await tabAll(page, 'Cardápio', 30);

  // Grupo de categorias (desenho do Cardápio, §5.2): rádios nativos. O Tab para uma vez só, na opção
  // marcada; a seta para a direita marca a próxima e troca a grade, com o foco no rádio; no último,
  // volta ao primeiro
  await page.goto(BASE + '#/menu');
  await page.waitForLoadState('networkidle');
  await page.locator('#conteudo').focus();
  await page.keyboard.press('Tab');
  const radio = () => page.evaluate(() => {
    const el = document.activeElement;
    return { tipo: el.type, valor: el.value, marcado: el.checked, h2: document.getElementById('menu-categoria-titulo')?.textContent.trim(), primeiro: document.querySelector('.menu-page__grade .m3-dividido__frente')?.getAttribute('aria-label') };
  });
  const parada = await radio();
  const anelGrupo = await page.evaluate(ringOf);
  await page.keyboard.press('Tab');
  const depois = await page.evaluate(() => document.activeElement.getAttribute('aria-label') ?? document.activeElement.type);
  check(parada.tipo === 'radio' && parada.valor === 'foods' && parada.marcado && depois === 'Adicionar Cheese Bacon', 'grupo de categorias: uma parada só no Tab, na opção marcada', JSON.stringify({ parada, depois }));
  check(anelGrupo.ok && anelGrupo.tag === 'LABEL', 'grupo de categorias: anel de foco no rótulo da opção', anelGrupo.outline);
  await page.keyboard.press('Shift+Tab');
  const setas = [];
  for (let i = 0; i < 3; i++) {
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);
    const r = await radio();
    setas.push(`${r.tipo}:${r.valor}:${r.marcado}:${r.h2}:${r.primeiro}`);
  }
  check(
    setas.join(' | ') === 'radio:drinks:true:Bebidas:Adicionar Copo de Refrigerante | radio:desserts:true:Sobremesas:Adicionar Sorvete de Pote | radio:foods:true:Hambúrgueres:Adicionar Cheese Bacon',
    'grupo de categorias: a seta para a direita marca a próxima e troca a grade, com o foco no rádio; no último, volta ao primeiro',
    setas.join(' | ')
  );
  await focoSobAsBarras(page, `Cardápio em ${w}`);

  // Modal: abre com Enter e o foco fica preso
  await page.goto(BASE + '#/menu');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Adicionar Cheese Bacon' }).focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(400);
  let outside = 0;
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press(i % 7 === 6 ? 'Shift+Tab' : 'Tab');
    const inside = await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement));
    if (!inside) outside++;
  }
  check(outside === 0, 'no modal, o foco fica preso dentro dele (40 Tabs)', `${outside} fora`);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  check(await page.evaluate(() => document.activeElement.getAttribute('aria-label')) === 'Adicionar Cheese Bacon', 'Esc fecha o modal e devolve o foco');

  // Pagamento: setas trocam a forma de pagamento
  await page.goto(BASE + '#/payment');
  await page.waitForLoadState('networkidle');
  await page.locator('input[name="payment-method"]').first().focus();
  await page.keyboard.press('Space');
  const first = await page.evaluate(() => document.querySelector('input[name="payment-method"]:checked')?.value);
  await page.keyboard.press('ArrowDown');
  const second = await page.evaluate(() => document.querySelector('input[name="payment-method"]:checked')?.value);
  await page.keyboard.press('ArrowDown');
  const third = await page.evaluate(() => document.querySelector('input[name="payment-method"]:checked')?.value);
  const ring = await page.evaluate(ringOf);
  check(first === 'credit' && second === 'debit' && third === 'pix', 'as setas trocam a forma de pagamento', `${first} → ${second} → ${third}`);
  check(ring.ok && ring.tag === 'LABEL', 'anel de foco no card do pagamento', ring.outline);
  await tabAll(page, 'Pagamento', 25);

  // O menu mobile saiu: os três links ficam sempre à vista na pílula
  check(await page.getByRole('button', { name: 'Menu principal' }).count() === 0, 'sem o botão do menu mobile');
  await ctx.close();

  // §13.3, item 6: em 390 (a largura abaixo de lg da matriz), em todas as rotas da loja (com sessão;
  // login e cadastro sem). O título da aba confirma a rota desenhada, sem redirecionamento
  if (w < 1024) {
    const fctx = await browser.newContext({ viewport: { width: w, height: ALTURA } });
    await seed(fctx, { 'smash-burger:session': SESSION_PEDIDO, 'smash-burger:cart:v1': CART, 'smash-burger:account': USER });
    const fp = await fctx.newPage();
    for (const [hash, name, title] of [['#/', 'Home', 'Início'], ['#/menu', 'Cardápio', 'Cardápio'], ['#/cart', 'Carrinho', 'Seu carrinho'], ['#/payment', 'Pagamento', 'Finalizar pedido'], ['#/confirmation', 'Confirmação', 'Pedido recebido'], ['#/profile', 'Perfil', 'Sua conta'], ['#/rota-inexistente', '404', 'Página não encontrada']]) {
      const opened = await openRoute(fp, hash, title);
      check(opened && fp.url().endsWith(hash), `${name}: a rota abre com a sessão semeada`, `${fp.url().split('#')[1]} "${await fp.title()}"`);
      await focusNotCovered(fp, `${name} em ${w}`);
    }
    await fctx.close();
    const gctx = await browser.newContext({ viewport: { width: w, height: ALTURA } });
    const gp = await gctx.newPage();
    for (const [hash, name, title] of [['#/login', 'Login', 'Entrar'], ['#/register', 'Cadastro', 'Criar conta']]) {
      const opened = await openRoute(gp, hash, title);
      check(opened && gp.url().endsWith(hash), `${name}: a rota abre sem sessão`, `${gp.url().split('#')[1]} "${await gp.title()}"`);
      await focusNotCovered(gp, `${name} em ${w}`);
    }
    await gctx.close();
  }

  // Admin
  const actx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  await actx.addInitScript(() => { if (!sessionStorage.getItem('k')) { localStorage.clear(); localStorage.setItem('smash-burger:admin-session', JSON.stringify({ admin: { firstName: 'Admin', lastName: 'User', role: 'admin' }, isAuthenticated: true })); sessionStorage.setItem('k', '1'); } });
  const ap = await actx.newPage();
  await ap.goto(BASE + '#/admin/orders');
  await ap.waitForLoadState('networkidle');
  await tabAll(ap, 'Admin (pedidos)', 30);
  if (w === 390) {
    await ap.getByRole('button', { name: 'Alternar menu' }).focus();
    await ap.keyboard.press('Enter');
    await ap.waitForTimeout(300);
    await ap.keyboard.press('Escape');
    check(await ap.evaluate(() => document.activeElement.getAttribute('aria-label')) === 'Alternar menu', 'gaveta do admin fecha com Esc e devolve o foco');
  }
  await ap.locator('.navbar-profile__avatar').focus();
  await ap.keyboard.press('Enter');
  await ap.waitForTimeout(200);
  const menuOpen = await ap.evaluate(() => document.activeElement.getAttribute('role'));
  await ap.keyboard.press('ArrowDown');
  const second2 = await ap.evaluate(() => document.activeElement.textContent.trim());
  await ap.keyboard.press('Escape');
  const back2 = await ap.evaluate(() => document.activeElement.classList.contains('navbar-profile__avatar'));
  check(menuOpen === 'menuitem' && second2 === 'Configurações' && back2, 'menu de perfil do admin: Enter abre, setas navegam, Esc fecha');
  await actx.close();
}
// Carrinho e pagamento (desenho do Carrinho, §4, §5.2, §5.7 e §9). O foco, com o anel, não cruza a
// toolbar flutuante nem um aviso (toast) na tela. Vale só no Chromium (Playwright): as três inferências
// do desenho (o rádio com o retângulo do label, o focus() com o scroll-padding e a reserva de um aviso)
// ficam provadas só nele
const cobertoPor = () => {
  let el = document.activeElement;
  if (el.matches('input.visually-hidden')) el = el.closest('label') ?? el;
  const s = getComputedStyle(el);
  const anel = s.outlineStyle === 'none' ? 0 : Math.max(0, parseFloat(s.outlineWidth) + parseFloat(s.outlineOffset));
  const b = el.getBoundingClientRect();
  const r = { left: b.left - anel, right: b.right + anel, top: b.top - anel, bottom: b.bottom + anel };
  const cruza = (x, a = r) => { const q = x.getBoundingClientRect(); return Math.min(a.right, q.right) > Math.max(a.left, q.left) && Math.min(a.bottom, q.bottom) > Math.max(a.top, q.top); };
  const barra = document.querySelector('.m3-ferramentas');
  const avisos = [...document.querySelectorAll('.toast-region .toast')];
  const nome = (el.getAttribute('aria-label') || el.querySelector?.('input')?.value || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28);
  // aviso: o retângulo com o anel cruza um aviso; avisoCaixa: o próprio elemento, sem o anel
  return { nome, valor: document.activeElement.value, marcado: document.querySelector('input[name="payment-method"]:checked')?.value, barra: !!barra && getComputedStyle(barra).position === 'fixed' && cruza(barra), aviso: avisos.some((x) => cruza(x)), avisoCaixa: avisos.some((x) => cruza(x, b)), avisos: avisos.length, topo: Math.round(r.top), base: Math.round(r.bottom), rolagem: Math.round(scrollY) };
};
const CART3 = { items: [
  { productId: 1, category: 'foods', name: 'Cheese Bacon', image: '/images/foods/cheese-bacon', unitPrice: 25.99, quantity: 1, removedIngredients: ['Tomate'], additionals: [], observation: '' },
  { productId: 2, category: 'drinks', name: 'Coca Cola Lata', image: '/images/drinks/coca-cola-lata', unitPrice: 4.99, quantity: 1, removedIngredients: [], additionals: [], observation: '' },
  { productId: 1, category: 'desserts', name: 'Sorvete de Pote', image: '/images/desserts/sorvete-pote', unitPrice: 12.9, quantity: 1, removedIngredients: [], additionals: [], observation: '' },
] };
// Seis itens: em 390, o "Remover" do 5º começa abaixo do ponto perto do pé, e a página rola até ele
const linha = (productId, category, name, image, unitPrice) => ({ productId, category, name, image, unitPrice, quantity: 1, removedIngredients: [], additionals: [], observation: '' });
const CART6 = { items: [
  ...CART3.items,
  linha(2, 'foods', 'Smash Burger', '/images/foods/smash-burger', 22.5),
  linha(3, 'drinks', 'Suco de Abacaxi', '/images/drinks/suco-abacaxi', 7.99),
  linha(4, 'foods', 'X-Salada', '/images/foods/x-salada', 20.9),
] };
const SEM_ENDERECO = { ...USER, address: {} };
{
  console.log(`=== carrinho e pagamento em 390×${ALTURA}`);
  const c = await browser.newContext({ viewport: { width: 390, height: ALTURA } });
  await seed(c, { 'smash-burger:session': SESSION, 'smash-burger:cart:v1': CART, 'smash-burger:account': USER });
  const p = await c.newPage();

  // Setas do pagamento (pendência da etapa 4): o Tab entra no primeiro rádio, o Espaço marca, as setas
  // descem até o Dinheiro e voltam ao primeiro; a opção focada nunca cruza a toolbar
  await openRoute(p, '#/payment', 'Finalizar pedido');
  await p.getByRole('link', { name: 'Alterar no perfil' }).focus();
  await p.keyboard.press('Tab');
  const passos = [await p.evaluate(cobertoPor)];
  await p.keyboard.press('Space');
  for (let i = 0; i < 4; i++) {
    await p.keyboard.press('ArrowDown');
    await p.waitForTimeout(60);
    passos.push(await p.evaluate(cobertoPor));
  }
  // O foco e a marcação andam juntos: a seta marca a opção que recebe o foco
  const focados = passos.map((x) => x.valor).join(' → ');
  const marcados = passos.slice(1).map((x) => x.marcado).join(' → ');
  check(focados === 'credit → debit → pix → cash → credit' && marcados === 'debit → pix → cash → credit' && !passos[0].marcado, 'pagamento: Tab no primeiro rádio (nenhum marcado), setas que marcam até o Dinheiro e voltam ao primeiro', `focados ${focados}; marcados ${marcados}`);
  const sob = passos.filter((x) => x.barra).map((x) => `${x.valor} (${x.topo}–${x.base})`);
  check(sob.length === 0, `pagamento em 390×${ALTURA}: nenhuma opção focada pelas setas cruza a toolbar`, sob.join(' | '));
  const anelOpcao = await p.evaluate(ringOf);
  check(anelOpcao.ok && anelOpcao.tag === 'LABEL', 'pagamento: o anel de 3 px fica no label da opção', anelOpcao.outline);

  // Shift+Tab vindo de baixo, sem forma marcada: o foco cai num rádio do grupo (o primeiro ou o último,
  // conforme o navegador [88]). A opção que o navegador escolhe é posta antes em parte sob a toolbar
  // (24 px dentro da reserva do pé): com o rádio de 1 × 1 px no meio do label, nada rolaria e a opção
  // ficaria coberta; com o rádio do tamanho do label, a rolagem a tira de lá
  // O goto para a mesma URL não recarrega a página, e o rádio marcado pelas setas continuaria marcado:
  // recarrega e confere que nenhuma forma está marcada
  await openRoute(p, '#/payment', 'Finalizar pedido');
  await p.reload();
  await p.waitForLoadState('networkidle');
  await p.waitForTimeout(250);
  check(await p.locator('input[name="payment-method"]:checked').count() === 0, `pagamento em 390×${ALTURA}: recarregado, nenhuma forma marcada antes do Shift+Tab`);
  // Só no teste: um espaço acima da página, para a opção poder ficar perto do pé (no topo da página, ela
  // fica acima da reserva e não dá para rolar acima do início)
  await p.evaluate(() => { document.querySelector('.payment-page').style.paddingTop = `${innerHeight}px`; });
  const focarDepoisDoGrupo = () => p.evaluate(() => {
    const radios = [...document.querySelectorAll('input[name="payment-method"]')];
    const focaveis = [...document.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])')];
    focaveis.find((el) => radios.at(-1).compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING && !radios.includes(el)).focus({ preventScroll: true });
  });
  // 1ª passada: descobre qual rádio o navegador escolhe
  await focarDepoisDoGrupo();
  await p.keyboard.press('Shift+Tab');
  const escolhido = await p.evaluate(() => document.activeElement.value);
  // 2ª passada: essa opção começa em parte sob a toolbar
  await focarDepoisDoGrupo();
  const inicio = await p.evaluate((valor) => {
    const opcao = document.querySelector(`input[name="payment-method"][value="${valor}"]`).closest('label');
    scrollBy(0, opcao.getBoundingClientRect().bottom - (innerHeight - 96 + 24));
    const o = opcao.getBoundingClientRect();
    const t = document.querySelector('.m3-ferramentas').getBoundingClientRect();
    return { base: Math.round(o.bottom), cobre: Math.min(o.bottom, t.bottom) > Math.max(o.top, t.top) && Math.min(o.right, t.right) > Math.max(o.left, t.left) };
  }, escolhido);
  check(inicio.cobre, `pagamento em 390×${ALTURA}: antes do Shift+Tab, a opção escolhida (${escolhido}) fica em parte sob a toolbar`, `base em ${inicio.base}`);
  await p.keyboard.press('Shift+Tab');
  await p.waitForTimeout(60);
  const ultimo = await p.evaluate(cobertoPor);
  check(['credit', 'cash'].includes(ultimo.valor) && !ultimo.marcado && !ultimo.barra, `pagamento em 390×${ALTURA}: Shift+Tab sem marcado cai no grupo e tira a opção de baixo da toolbar`, `${ultimo.valor} (${ultimo.topo}–${ultimo.base})`);
  await c.close();

  // Foco não coberto também no carrinho do visitante e no pagamento sem endereço
  const vctx = await browser.newContext({ viewport: { width: 390, height: ALTURA } });
  await seed(vctx, { 'smash-burger:cart:v1': CART3 });
  const vp = await vctx.newPage();
  check(await openRoute(vp, '#/cart', 'Seu carrinho'), 'carrinho do visitante abre');
  await focusNotCovered(vp, `Carrinho do visitante em 390×${ALTURA}`);
  await vctx.close();
  const sctx = await browser.newContext({ viewport: { width: 390, height: ALTURA } });
  await seed(sctx, { 'smash-burger:session': { ...SESSION, user: SEM_ENDERECO }, 'smash-burger:cart:v1': CART, 'smash-burger:account': SEM_ENDERECO });
  const sp = await sctx.newPage();
  check(await openRoute(sp, '#/payment', 'Finalizar pedido') && await sp.locator('.payment-page__aviso').count() === 1, 'pagamento sem endereço abre com o aviso');
  await focusNotCovered(sp, `Pagamento sem endereço em 390×${ALTURA}`);
  await sctx.close();
}

// "Remover" vizinho contra o aviso (desenho do Carrinho, §4): remover um item deixa o foco no "Remover"
// do item seguinte, e ele não pode ficar sob o aviso nem sob a toolbar. Em 390, perto do pé (o aviso
// fica acima da toolbar), com o 5º de seis itens; em 1024, perto do topo (o aviso fica no topo à
// direita e cruza a coluna da lista), com o 2º. Em 1440, o aviso começa depois do "Remover": a página
// não pula, e o botão (sem o anel, que encosta 2 px) fica fora do aviso
for (const [w, h, onde, removido, vizinho] of [[390, ALTURA, 'pe', 'Suco de Abacaxi', 'X-Salada'], [1024, 768, 'topo', 'Coca Cola Lata', 'Sorvete de Pote'], [1440, 900, 'largo', 'Coca Cola Lata', 'Sorvete de Pote']]) {
  const c = await browser.newContext({ viewport: { width: w, height: h } });
  await seed(c, { 'smash-burger:session': SESSION, 'smash-burger:cart:v1': CART6, 'smash-burger:account': USER });
  const p = await c.newPage();
  await openRoute(p, '#/cart', 'Seu carrinho');
  const alvo = p.getByRole('button', { name: `Remover ${removido}` });
  // Leva o "Remover" do meio para perto do pé (acima da reserva da toolbar) ou para logo abaixo do aviso
  await alvo.evaluate((el, [lugar, barraReserva]) => {
    const r = el.getBoundingClientRect();
    const destino = lugar === 'pe' ? innerHeight - barraReserva - r.height - 8 : 100;
    scrollBy(0, r.top - destino);
  }, [onde, 96]);
  await alvo.evaluate((el) => el.focus({ preventScroll: true }));
  const antes = await p.evaluate(() => Math.round(document.activeElement.getBoundingClientRect().top));
  const rolagemAntes = await p.evaluate(() => Math.round(scrollY));
  const destino = onde === 'pe' ? h - 96 - 44 - 8 : 100;
  check(Math.abs(antes - destino) <= 2, `${w}×${h}: o "Remover ${removido}" começa ${onde === 'pe' ? 'perto do pé' : 'perto do topo'}`, `em ${antes}, alvo ${destino}`);
  await p.keyboard.press('Enter');
  await p.waitForTimeout(400);
  const depois = await p.evaluate(cobertoPor);
  check(depois.nome === `Remover ${vizinho}` && depois.avisos === 1, `${w}×${h}: depois de remover, o foco fica no "Remover" vizinho, com o aviso na tela`, `${depois.nome}, ${depois.avisos} aviso(s)`);
  if (onde === 'largo') {
    check(!depois.avisoCaixa && depois.rolagem === rolagemAntes, `${w}×${h}: sem pulo da página, e o "Remover" vizinho fica fora do aviso`, `rolagem ${rolagemAntes} → ${depois.rolagem}; ${depois.topo}–${depois.base}`);
  } else {
    check(!depois.aviso && !depois.barra, `${w}×${h}: o "Remover" vizinho focado não fica sob o aviso nem sob a toolbar (${onde === 'pe' ? 'perto do pé' : 'perto do topo'})`, `antes em ${antes}, depois ${depois.topo}–${depois.base}`);
  }
  await c.close();
}

// Janela de 360 px (desenho do Cardápio, §5.2): o grupo de categorias cabe numa linha, sem rolagem, e o
// foco que volta pela grade não fica sob ele
{
  const c = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const p = await c.newPage();
  await p.goto(BASE + '#/menu');
  await p.waitForLoadState('networkidle');
  const linha = await p.evaluate(() => {
    const g = document.querySelector('.category-tabs__opcoes');
    const topos = new Set([...g.querySelectorAll('.category-tabs__opcao')].map((o) => Math.round(o.getBoundingClientRect().top)));
    return { rola: g.scrollWidth > g.clientWidth, linhas: topos.size, largura: g.scrollWidth, util: g.clientWidth };
  });
  check(!linha.rola && linha.linhas === 1, 'em 360 px, o grupo de categorias cabe numa linha, sem rolagem', JSON.stringify(linha));
  await focoSobAsBarras(p, 'Cardápio em 360');
  await c.close();
}

await browser.close();
console.log(failures ? `FALHAS: ${failures}` : 'TECLADO OK');
