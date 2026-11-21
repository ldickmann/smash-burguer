/* global process */
// §13.5 Teclado: só Tab, Shift+Tab, Enter, Espaço, setas e Esc (SPEC-material §13.5 e §13.3, item 6).
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
await browser.close();
console.log(failures ? `FALHAS: ${failures}` : 'TECLADO OK');
