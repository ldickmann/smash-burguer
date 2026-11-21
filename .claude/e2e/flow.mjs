/* global process */
// Fluxo do pedido de ponta a ponta (SPEC §13.4 e SPEC-material §13.4), com ViaCEP simulado e
// localStorage limpo. A navegação é pela pílula (Início, Cardápio, Entrar/Perfil) e o carrinho, pelo FAB.
// O lanche e a bebida entram pela Home: a folha de ingredientes pelo split, o modal e o retorno
// "Adicionado" no split e no botão tonal da lista (SPEC-material §13.4 e §7.6).
// uso: node flow.mjs [largura]   (padrão: 390 e depois 1440)
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:4173/smash-burguer/';
const OUT = process.env.FLOW_OUT;
const widths = process.argv[2] ? [Number(process.argv[2])] : [390, 1440];
const norm = (s) => (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
let failures = 0;
// Toolbar do M3: a nav Principal na pílula e o FAB do carrinho, com o badge (SPEC-material §4.1)
const pill = (page, name) => page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name, exact: true });
const fab = (page) => page.locator('a.m3-fab');
const fabState = (page) => page.evaluate(() => { const f = document.querySelector('a.m3-fab'); return { badge: f.querySelector('.m3-badge')?.textContent.trim(), label: f.getAttribute('aria-label') }; });
const check = (cond, label, extra = '') => {
  if (!cond) failures += 1;
  console.log(`${cond ? '  ✓' : '  ✗'} ${label}${extra ? ` — ${extra}` : ''}`);
};

const browser = await chromium.launch();
for (const w of widths) {
  console.log(`\n=== ${w}px ===`);
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  await ctx.route('https://viacep.com.br/**', (r) => r.fulfill({ json: { logradouro: 'Rua Beira da Praia', bairro: 'Centro', localidade: 'Navegantes', uf: 'SC' } }));
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const snap = async (name) => { if (OUT) { fs.mkdirSync(OUT, { recursive: true }); await page.screenshot({ path: `${OUT}/flow-${name}-${w}.png` }); } };
  await page.goto(BASE + '#/');
  await page.evaluate(() => localStorage.clear());

  // Preparação: criar a conta
  console.log('Preparação');
  await page.goto(BASE + '#/register');
  await page.waitForLoadState('networkidle');
  await page.fill('#firstName', 'Maria');
  await page.fill('#lastName', 'Silva');
  await page.fill('#email', 'maria@example.com');
  await page.fill('#password', 'senha123');
  await page.fill('#dateOfBirth', '1990-05-10');
  await page.fill('#phone', '47999999999');
  await page.fill('#CEP', '88370000');
  await page.waitForTimeout(300);
  await page.getByRole('button', { name: 'Criar conta', exact: true }).click();
  await page.waitForTimeout(150);
  const regLoading = await page.evaluate(() => { const b = document.querySelector('.auth-form button[type=submit]'); return { busy: b.getAttribute('aria-busy'), text: b.textContent.trim() }; });
  check(regLoading.busy === 'true' && regLoading.text === 'Criando conta…', 'botão de cadastro em loading "Criando conta…"', JSON.stringify(regLoading));
  await page.waitForURL(/#\/login/, { timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(200);
  const toastText = norm(await page.locator('.toast').first().textContent().catch(() => ''));
  check(page.url().includes('#/login'), 'vai para #/login', page.url());
  check(toastText.includes('Conta criada. Entre para continuar.'), 'toast "Conta criada. Entre para continuar."', toastText);
  const account = await page.evaluate(() => JSON.parse(localStorage.getItem('smash-burger:account')));
  check(account?.address?.street === 'Rua Beira da Praia' && account?.address?.state === 'SC', 'endereço do CEP guardado na conta', JSON.stringify(account?.address));

  // Pedido como visitante
  console.log('Pedido como visitante');
  await page.goto(BASE + '#/');
  await page.waitForLoadState('networkidle');
  await pill(page, 'Cardápio').click();
  await page.waitForURL(/#\/menu$/, { timeout: 3000 }).catch(() => {});
  await page.waitForLoadState('networkidle');
  check(page.url().endsWith('#/menu'), 'a pílula leva ao Cardápio', page.url().split('#')[1]);
  check(await pill(page, 'Cardápio').getAttribute('aria-current') === 'page', 'o item atual da pílula tem aria-current="page"');
  if (w < 1024) {
    // Abaixo de lg, a toolbar flutua: depois de rolar até o fim, a pílula e o FAB seguem na tela
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(250);
    const bar = await page.evaluate(() => { const r = document.querySelector('.m3-ferramentas').getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight, pos: getComputedStyle(document.querySelector('.m3-ferramentas')).position }; });
    check(bar.pos === 'fixed' && bar.top >= 0 && bar.bottom <= bar.vh, 'rolado até o fim, a pílula e o FAB continuam à vista', JSON.stringify(bar));
    await page.evaluate(() => window.scrollTo(0, 0));
  }

  // Adicionar pela Home (SPEC-material §13.4): a folha de ingredientes pela metade de trás do split
  await pill(page, 'Início').click();
  await page.waitForURL(/#\/$/, { timeout: 3000 }).catch(() => {});
  await page.waitForLoadState('networkidle');
  check(await pill(page, 'Início').getAttribute('aria-current') === 'page', 'a pílula volta à Home, com Início atual');
  const tras = page.getByRole('button', { name: 'Ingredientes de Cheese Bacon', exact: true });
  await tras.click();
  await page.waitForTimeout(400);
  const folha = await page.evaluate(() => {
    const b = [...document.querySelectorAll('button[aria-controls]')].find((x) => x.getAttribute('aria-label') === 'Ingredientes de Cheese Bacon');
    const f = document.getElementById(b.getAttribute('aria-controls'));
    return { expanded: b.getAttribute('aria-expanded'), visivel: !!f && getComputedStyle(f).display !== 'none', itens: [...(f?.querySelectorAll('li') ?? [])].map((li) => li.textContent.trim()) };
  });
  check(folha.expanded === 'true' && folha.visivel && folha.itens.includes('Bacon') && folha.itens.includes('Tomate'), 'a metade de trás abre a folha com os ingredientes reais (aria-expanded="true")', JSON.stringify(folha));
  await snap('folha');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  const fechou = await page.evaluate(() => { const a = document.activeElement; return { label: a.getAttribute('aria-label'), expanded: a.getAttribute('aria-expanded') }; });
  check(fechou.label === 'Ingredientes de Cheese Bacon' && fechou.expanded === 'false', 'Esc fecha a folha e devolve o foco à metade de trás', JSON.stringify(fechou));

  await page.getByRole('button', { name: 'Adicionar Cheese Bacon', exact: true }).click();
  await page.waitForTimeout(500);
  check(await page.evaluate(() => document.querySelector('dialog').matches(':modal')), 'diálogo abre com :modal === true');
  const redBefore = await page.evaluate(() => !!document.querySelector('.burger-stack__layer[data-ingredient="Tomate"]'));
  await page.locator('dialog[open] label', { hasText: 'Tomate' }).click();
  await page.getByRole('button', { name: 'Aumentar Bacon' }).click();
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => ({ red: !!document.querySelector('.burger-stack__layer[data-ingredient="Tomate"]'), legend: document.querySelector('.burger-stack__legend').textContent, cta: document.querySelector('dialog .dialog__footer button').textContent }));
  check(redBefore && !m.red, 'a camada vermelha (tomate) some da pilha');
  check(norm(m.legend) === 'Sem tomate · +1 bacon', 'legenda "Sem tomate · +1 bacon"', norm(m.legend));
  check(norm(m.cta) === 'Adicionar · R$ 29,49', 'CTA "Adicionar · R$ 29,49"', norm(m.cta));
  await snap('modal');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  const esc = await page.evaluate(() => ({ open: document.querySelector('dialog').open, focus: document.activeElement.getAttribute('aria-label') }));
  check(!esc.open && esc.focus === 'Adicionar Cheese Bacon', 'Esc fecha e o foco volta ao botão', JSON.stringify(esc));
  await page.getByRole('button', { name: 'Adicionar Cheese Bacon', exact: true }).click();
  await page.waitForTimeout(500);
  await page.locator('dialog[open] label', { hasText: 'Tomate' }).click();
  await page.getByRole('button', { name: 'Aumentar Bacon' }).click();
  await page.locator('dialog[open] .dialog__footer button').click();
  await page.waitForTimeout(400);
  // Retorno "Adicionado" (SPEC-material §7.6): o foco na frente do split, com data-adicionado e a face
  // "Adicionado" à vista; o nome acessível não muda
  const after = await page.evaluate(() => {
    const btn = document.activeElement;
    const verso = btn.querySelector?.('.m3-dividido__face--verso');
    return { open: document.querySelector('dialog').open, focus: btn.getAttribute('aria-label'), frente: btn.classList.contains('m3-dividido__frente'), adicionado: btn.dataset.adicionado, verso: verso && { texto: verso.textContent.trim(), opacidade: getComputedStyle(verso).opacity } };
  });
  check(!after.open && after.focus === 'Adicionar Cheese Bacon' && after.frente, 'diálogo fecha e o foco está na frente do split do card', JSON.stringify(after));
  check(after.adicionado === 'true' && after.verso?.texto === 'Adicionado' && after.verso.opacidade === '1', 'a frente tem data-adicionado="true" e a face "Adicionado"', JSON.stringify(after.verso));
  const live = await page.evaluate(() => ({ badge: document.querySelector('.m3-fab .m3-badge')?.textContent.trim(), label: document.querySelector('a.m3-fab').getAttribute('aria-label'), live: document.querySelector('[data-announcer]').textContent }));
  check(live.badge === '1' && live.label === 'Carrinho, 1 item', 'badge do FAB mostra "1" e o FAB se chama "Carrinho, 1 item"', JSON.stringify({ badge: live.badge, label: live.label }));
  check(norm(live.live).includes('Cheese Bacon adicionado ao carrinho'), 'região viva anuncia a adição', norm(live.live));
  await page.waitForTimeout(1500);
  const fim = await page.evaluate(() => [...document.querySelectorAll('[data-adicionado]')].length);
  check(fim === 0, 'o data-adicionado some depois do retorno (~1,45 s)', `${fim} botão(ões)`);
  await page.getByRole('button', { name: 'Adicionar Smash Burger', exact: true }).click();
  await page.waitForTimeout(500);
  const smash = await page.evaluate(() => ({ zeros: [...document.querySelectorAll('dialog .additionals-list .stepper__value')].every((o) => o.textContent.trim() === '0'), cta: document.querySelector('dialog .dialog__footer button').textContent }));
  check(smash.zeros, 'Smash Burger abre sem nenhum adicional marcado');
  check(norm(smash.cta).endsWith('R$ 22,50'), 'preço do Smash Burger R$ 22,50', norm(smash.cta));
  await page.keyboard.press('Escape');
  await page.reload();
  await page.waitForLoadState('networkidle');
  const persisted = (await fabState(page)).label;
  check(persisted === 'Carrinho, 1 item', 'depois de recarregar o carrinho mantém 1 item', persisted);

  // Carrinho
  console.log('Carrinho');
  await fab(page).click();
  await page.waitForURL(/#\/cart$/, { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(500);
  check(page.url().endsWith('#/cart'), 'o FAB leva ao carrinho', page.url().split('#')[1]);
  const cart = await page.evaluate(() => ({ details: [...document.querySelectorAll('.cart-item__detail')].map((d) => d.textContent.trim()), total: document.querySelector('.order-summary__value').textContent, notice: document.querySelector('.cart-page__notice')?.textContent.trim() }));
  check(cart.details.includes('Sem tomate') && cart.details.includes('+1 bacon'), 'item mostra "Sem tomate" e "+1 bacon"', cart.details.join(' | '));
  check(norm(cart.total) === 'R$ 29,49', 'total R$ 29,49', norm(cart.total));
  check(cart.notice === 'Entre para finalizar seu pedido.', 'resumo diz "Entre para finalizar seu pedido."');
  await snap('cart-visitante');
  await page.getByRole('link', { name: 'Entrar e finalizar' }).click();
  await page.waitForTimeout(500);
  check(page.url().endsWith('#/login?redirect=/payment'), '"Entrar e finalizar" leva a #/login?redirect=/payment', page.url().split('#')[1]);

  // Login
  console.log('Login');
  await page.fill('#email', 'maria@example.com');
  await page.fill('#password', 'errada123');
  const t0 = Date.now();
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.locator('[role=alert]', { hasText: 'E-mail ou senha incorretos.' }).waitFor({ timeout: 1500 }).catch(() => {});
  const elapsed = Date.now() - t0;
  const banner = await page.evaluate(() => ({ alert: document.querySelector('.auth-alert')?.getAttribute('role'), text: document.querySelector('.auth-alert')?.textContent.trim(), busy: document.querySelector('.auth-form button[type=submit]').getAttribute('aria-busy') }));
  check(banner.alert === 'alert' && banner.text === 'E-mail ou senha incorretos.' && elapsed <= 1500, 'senha errada: banner role="alert" em até 1,5 s', `${elapsed}ms`);
  check(banner.busy === null, 'o botão sai do loading');
  await snap('login-erro');
  await page.fill('#password', 'senha123');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForURL(/#\/payment/, { timeout: 3000 }).catch(() => {});
  check(page.url().endsWith('#/payment'), 'senha correta vai para #/payment', page.url().split('#')[1]);

  // Pagamento
  console.log('Pagamento');
  await page.waitForTimeout(400);
  const pay = await page.evaluate(() => ({ items: [...document.querySelectorAll('.order-summary__name')].map((n) => n.textContent.replace(/\s+/g, ' ').trim()), total: document.querySelector('.order-summary__value').textContent, disabled: [...document.querySelectorAll('button')].find((b) => b.textContent.includes('Confirmar pedido'))?.disabled, describedby: [...document.querySelectorAll('button')].find((b) => b.textContent.includes('Confirmar pedido'))?.getAttribute('aria-describedby') }));
  check(pay.items.some((i) => i.includes('Cheese Bacon')) && norm(pay.total) === 'R$ 29,49', 'resumo mostra o item e o total', `${pay.items} ${norm(pay.total)}`);
  check(pay.disabled === true && pay.describedby === 'pagamento-ajuda', 'CTA desabilitado até escolher a forma de pagamento');
  await page.locator('label.payment-option', { hasText: 'PIX' }).click();
  const enabled = await page.evaluate(() => !([...document.querySelectorAll('button')].find((b) => b.textContent.includes('Confirmar pedido')).disabled));
  check(enabled, 'CTA habilita depois de escolher PIX');
  await snap('payment');
  await page.getByRole('button', { name: /Confirmar pedido/ }).click();
  await page.waitForTimeout(100);
  const loading = await page.evaluate(() => { const b = document.querySelector('.order-summary__cta button'); return { busy: b?.getAttribute('aria-busy'), text: b?.textContent.trim() }; });
  check(loading.busy === 'true' && loading.text === 'Enviando pedido…', 'CTA em loading "Enviando pedido…"', JSON.stringify(loading));
  await page.waitForURL(/#\/confirmation/, { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(400);

  // Confirmação
  console.log('Confirmação');
  const conf = await page.evaluate(() => ({ focus: document.activeElement.tagName + ':' + document.activeElement.textContent.trim(), meta: document.querySelector('.confirmation-page__meta')?.textContent, badge: !!document.querySelector('.m3-fab .m3-badge') }));
  check(conf.focus === 'H1:Pedido recebido', 'o foco está no h1 "Pedido recebido"', conf.focus);
  check(norm(conf.meta) === 'Pedido #1001 · PIX', 'mostra "Pedido #1001 · PIX"', norm(conf.meta));
  check(!conf.badge, 'o badge some (carrinho esvaziado)');
  await snap('confirmation');

  // Conta
  console.log('Conta');
  await page.goto(BASE + '#/profile');
  await page.waitForTimeout(500);
  const prof = await page.evaluate(() => ({ orders: [...document.querySelectorAll('.profile-order__number')].map((n) => n.textContent.trim()), meta: document.querySelector('.profile-order__meta')?.textContent }));
  check(prof.orders[0] === 'Pedido #1001' && norm(prof.meta).includes('R$ 29,49'), '"Seus pedidos" lista o #1001 com o total certo', `${prof.orders} ${norm(prof.meta)}`);
  await page.getByRole('button', { name: 'Sair' }).click();
  await page.waitForTimeout(300);
  await page.fill('#email', 'maria@example.com');
  await page.fill('#password', 'senha123');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForTimeout(1500);
  const relogged = await page.evaluate(() => ({ url: location.hash, link: [...document.querySelectorAll('.m3-pilula__item')].map((a) => a.textContent.trim()).join(',') }));
  check(relogged.url === '#/' && relogged.link.includes('Perfil'), 'sair e entrar de novo funciona', JSON.stringify(relogged));

  // Quantidade e remoção: a bebida entra pela lista segmentada da Home (SPEC-material §13.4)
  console.log('Quantidade e remoção');
  await pill(page, 'Início').click();
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Adicionar Coca Cola Lata', exact: true }).click();
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Aumentar Coca Cola Lata' }).click();
  await page.getByRole('button', { name: 'Aumentar Coca Cola Lata' }).click();
  await page.locator('dialog[open] .dialog__footer button').click();
  await page.waitForTimeout(400);
  // Retorno do BaseButton tonal da lista (o M3ItemLista): a mesma face "Adicionado" do split
  const lista = await page.evaluate(() => {
    const btn = document.activeElement;
    const verso = btn.querySelector?.('.btn__face--verso');
    return { focus: btn.getAttribute('aria-label'), item: !!btn.closest('.m3-item'), adicionado: btn.dataset.adicionado, verso: verso && { texto: verso.textContent.trim(), opacidade: getComputedStyle(verso).opacity } };
  });
  check(lista.focus === 'Adicionar Coca Cola Lata' && lista.item && lista.adicionado === 'true' && lista.verso?.texto === 'Adicionado' && lista.verso.opacidade === '1', 'na lista da Home, o foco volta ao "Adicionar" com o retorno "Adicionado"', JSON.stringify(lista));
  const three = await fabState(page);
  check(three.badge === '3' && three.label === 'Carrinho, 3 itens', 'bebida com quantidade 3: badge "3" e "Carrinho, 3 itens"', JSON.stringify(three));
  await fab(page).click();
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Diminuir Coca Cola Lata' }).click();
  await page.waitForTimeout(200);
  const lineTotal = norm(await page.locator('.cart-item__total').first().textContent());
  check(lineTotal === 'R$ 9,98', 'quantidade 2 recalcula o total da linha', lineTotal);
  await page.getByRole('button', { name: 'Remover Coca Cola Lata' }).click();
  await page.waitForTimeout(250);
  const undoToast = norm(await page.locator('.toast').last().textContent());
  check(undoToast.includes('Coca Cola Lata removido.') && undoToast.includes('Desfazer'), 'toast com "Desfazer"', undoToast);
  await snap('remover');
  await page.getByRole('button', { name: 'Desfazer' }).click();
  await page.waitForTimeout(250);
  const restored = await page.evaluate(() => document.querySelectorAll('.cart-item').length);
  check(restored === 1, 'desfazer devolve o item', `${restored} item(ns)`);

  // Rotas
  console.log('Rotas');
  const ctx2 = await browser.newContext({ viewport: { width: w, height: 900 } });
  const p2 = await ctx2.newPage();
  await p2.goto(BASE + '#/payment');
  await p2.waitForTimeout(500);
  check(p2.url().endsWith('#/login?redirect=/payment'), '#/payment sem sessão leva a #/login?redirect=/payment', p2.url().split('#')[1]);
  await p2.goto(BASE + '#/confirmation');
  await p2.waitForTimeout(500);
  check(p2.url().endsWith('#/menu'), '#/confirmation sem pedido leva a #/menu', p2.url().split('#')[1]);
  await p2.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await p2.waitForTimeout(200);
  const yMenu = await p2.evaluate(() => scrollY);
  await p2.evaluate(() => { location.hash = '#/cart'; });
  await p2.locator('h1', { hasText: 'Seu carrinho' }).waitFor({ timeout: 10000 });
  await p2.waitForTimeout(200);
  const yCart = await p2.evaluate(() => scrollY);
  check(yMenu > 0 && yCart === 0, 'de #/menu rolado até o fim para #/cart abre com scrollY === 0', `menu=${yMenu} cart=${yCart}`);
  await ctx2.close();

  check(errors.length === 0, 'nenhum erro de página', errors.join(' | '));
  await ctx.close();
}
await browser.close();
console.log(`\n${failures === 0 ? 'FLUXO OK' : `FALHAS: ${failures}`}`);
process.exit(failures ? 1 : 0);
