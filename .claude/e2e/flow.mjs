/* global process */
// Fluxo do pedido de ponta a ponta (SPEC §13.4), com ViaCEP simulado e localStorage limpo.
// uso: node flow.mjs [largura]   (padrão: 390 e depois 1440)
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://localhost:4173/smash-burguer/';
const OUT = process.env.FLOW_OUT;
const widths = process.argv[2] ? [Number(process.argv[2])] : [390, 1440];
const norm = (s) => (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
let failures = 0;
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
  await page.fill('#email', 'maria@exemplo.com');
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
  await page.goto(BASE + '#/menu');
  await page.waitForLoadState('networkidle');
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
  await page.waitForTimeout(120);
  const after = await page.evaluate(() => {
    const btn = document.activeElement;
    const inner = btn.querySelector?.('.add-btn__inner');
    const t = inner ? getComputedStyle(inner).transform : 'none';
    let deg = null;
    if (t !== 'none') { const mm = new DOMMatrix(t); deg = Math.abs(Math.atan2(mm.m23, mm.m22) * 180 / Math.PI); }
    return { open: document.querySelector('dialog').open, focus: btn.getAttribute('aria-label'), added: btn.classList.contains('is-added'), deg };
  });
  check(!after.open && after.focus === 'Adicionar Cheese Bacon', 'diálogo fecha e o foco está no "Adicionar" do card', JSON.stringify(after));
  check(after.added && after.deg > 0 && after.deg < 180, 'botão com is-added e rotação entre 0 e 180° em ~120ms', `${after.deg?.toFixed(1)}°`);
  await page.waitForTimeout(400);
  const live = await page.evaluate(() => ({ badge: document.querySelector('.cart-badge__count')?.textContent.trim(), live: document.querySelector('[data-announcer]').textContent }));
  check(live.badge === '1', 'badge mostra "1"', live.badge);
  check(norm(live.live).includes('Cheese Bacon adicionado ao carrinho'), 'região viva anuncia a adição', norm(live.live));
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Adicionar Smash Burger', exact: true }).click();
  await page.waitForTimeout(500);
  const smash = await page.evaluate(() => ({ zeros: [...document.querySelectorAll('dialog .additionals-list .stepper__value')].every((o) => o.textContent.trim() === '0'), cta: document.querySelector('dialog .dialog__footer button').textContent }));
  check(smash.zeros, 'Smash Burger abre sem nenhum adicional marcado');
  check(norm(smash.cta).endsWith('R$ 22,50'), 'preço do Smash Burger R$ 22,50', norm(smash.cta));
  await page.keyboard.press('Escape');
  await page.reload();
  await page.waitForLoadState('networkidle');
  const persisted = await page.evaluate(() => document.querySelector('.cart-badge').getAttribute('aria-label'));
  check(persisted === 'Carrinho, 1 item', 'depois de recarregar o carrinho mantém 1 item', persisted);

  // Carrinho
  console.log('Carrinho');
  await page.goto(BASE + '#/cart');
  await page.waitForTimeout(500);
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
  await page.fill('#email', 'maria@exemplo.com');
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
  const conf = await page.evaluate(() => ({ focus: document.activeElement.tagName + ':' + document.activeElement.textContent.trim(), meta: document.querySelector('.confirmation-page__meta')?.textContent, badge: !!document.querySelector('.cart-badge__count') }));
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
  await page.fill('#email', 'maria@exemplo.com');
  await page.fill('#password', 'senha123');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForTimeout(1500);
  const relogged = await page.evaluate(() => ({ url: location.hash, link: [...document.querySelectorAll('.navbar__link')].map((a) => a.textContent.trim()).join(',') }));
  check(relogged.url === '#/' && relogged.link.includes('Perfil'), 'sair e entrar de novo funciona', JSON.stringify(relogged));

  // Quantidade e remoção
  console.log('Quantidade e remoção');
  await page.goto(BASE + '#/menu');
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Bebidas' }).click();
  await page.getByRole('button', { name: 'Adicionar Coca Cola Lata', exact: true }).click();
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: 'Aumentar Coca Cola Lata' }).click();
  await page.getByRole('button', { name: 'Aumentar Coca Cola Lata' }).click();
  await page.locator('dialog[open] .dialog__footer button').click();
  await page.waitForTimeout(500);
  const three = await page.evaluate(() => ({ badge: document.querySelector('.cart-badge__count')?.textContent.trim(), label: document.querySelector('.cart-badge').getAttribute('aria-label') }));
  check(three.badge === '3' && three.label === 'Carrinho, 3 itens', 'bebida com quantidade 3: badge "3" e "Carrinho, 3 itens"', JSON.stringify(three));
  await page.goto(BASE + '#/cart');
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
