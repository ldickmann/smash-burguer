// Verificação das lacunas apontadas pela revisão (uma checagem por lacuna corrigida).
import { chromium } from 'playwright';
const BASE = 'http://localhost:4173/smash-burguer/';
const USER = { firstName: 'Maria', lastName: 'Silva', email: 'maria@exemplo.com', password: 'senha123', CEP: '88370000', address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' } };
const ORDER = { id: 1001, date: '2026-10-17T22:15:00.000Z', status: 'Recebido', paymentMethod: 'PIX', total: 29.49, address: USER.address, items: [{ productId: 1, category: 'foods', name: 'Cheese Bacon', image: '/images/foods/cheese-bacon', unitPrice: 29.49, quantity: 1, removedIngredients: ['Tomate'], additionals: [{ name: 'Bacon', price: 3.5, quantity: 1 }], observation: '' }] };
const SESSION = { user: USER, isAuthenticated: true, orderHistory: [ORDER], lastOrderId: 1001, nextOrderId: 1002 };
let failures = 0;
const check = (c, l, x = '') => { if (!c) failures++; console.log(`${c ? '  ✓' : '  ✗'} ${l}${x ? ` — ${x}` : ''}`); };
const browser = await chromium.launch();
const seed = async (ctx, storage) => ctx.addInitScript((s) => { if (sessionStorage.getItem('__s')) return; localStorage.clear(); for (const [k, v] of Object.entries(s)) localStorage.setItem(k, JSON.stringify(v)); sessionStorage.setItem('__s', '1'); }, storage);
const go = async (page, hash) => { await page.goto(BASE + hash); await page.waitForLoadState('networkidle'); await page.waitForTimeout(250); };

// 1. §5.4: ingredientes e adicionais só para hambúrgueres e sobremesas
console.log('=== §5.4 seções do modal');
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await go(page, '#/menu');
  for (const [tab, name, expected] of [[null, 'Cheese Bacon', true], [null, 'Batata Frita', false], ['Sobremesas', 'Sorvete de Pote', true], ['Bebidas', 'Coca Cola Lata', false]]) {
    if (tab) await page.getByRole('button', { name: tab, exact: true }).click();
    await page.getByRole('button', { name: `Adicionar ${name}` }).click();
    await page.waitForTimeout(450);
    const s = await page.evaluate(() => ({ ing: !!document.querySelector('dialog[open] #ingredientes-titulo, dialog[open] .ingredients-list'), add: !!document.querySelector('dialog[open] .additionals-list'), qty: !!document.querySelector('dialog[open] #quantidade-titulo') }));
    check(s.ing === expected && s.add === expected, `${name}: Ingredientes/Adicionais ${expected ? 'aparecem' : 'não aparecem'}`, JSON.stringify(s));
    if (name === 'Batata Frita') await page.screenshot({ path: './shots/lacunas/modal-batata-1440.png' });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(250);
  }
  // Batata sem adicionais: o item entra no carrinho limpo
  await page.getByRole('button', { name: 'Destaques', exact: true }).click().catch(() => {});
  await ctx.close();
}

// 2. §2.8 + regra do usuário: com movimento reduzido só opacity, no máximo --dur-fast
console.log('=== §2.8 movimento reduzido');
for (const reduce of [true, false]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  await go(page, '#/menu');
  const props = await page.evaluate(() => {
    const out = {};
    for (const sel of ['.btn', '.navbar__link', '.category-tabs .btn', '.product-card', '.add-btn__inner', 'a']) {
      const el = document.querySelector(sel); if (!el) continue;
      const s = getComputedStyle(el); out[sel] = `${s.transitionProperty} ${s.transitionDuration}`;
    }
    return out;
  });
  await page.getByRole('button', { name: 'Menu principal' }).click();
  await page.waitForTimeout(30);
  const menu = await page.evaluate(() => { const m = document.querySelector('#menu-principal'); const s = getComputedStyle(m); return `${s.animationName.replace(/-[0-9a-f]{8}$/, '')} ${s.animationDuration}`; });
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Adicionar Cheese Bacon' }).click();
  await page.waitForTimeout(30);
  const dlg = await page.evaluate(() => { const d = document.querySelector('dialog[open]'); const s = getComputedStyle(d); const b = getComputedStyle(d, '::backdrop'); const n = (x) => x.replace(/-[0-9a-f]{8}$/, ''); return { dialog: `${n(s.animationName)} ${s.animationDuration}`, backdrop: `${n(b.animationName)} ${b.animationDuration}` }; });
  await page.keyboard.press('Escape');
  if (reduce) {
    const bad = Object.entries(props).filter(([, v]) => !/^opacity 0\.15s$|^(opacity, )*opacity 0\.15s(, 0\.15s)*$/.test(v) && !/^opacity 0\.15s/.test(v));
    check(bad.length === 0, 'reduzido: transições só de opacity em 150ms (botões, links, cards)', JSON.stringify(props));
    check(menu === 'navbar-menu-fade 0.15s', 'reduzido: menu mobile só com opacidade em 150ms', menu);
    check(dlg.dialog === 'dialog-fade 0.15s' && dlg.backdrop === 'dialog-fade 0.15s', 'reduzido: sheet e fundo do diálogo com opacidade em 150ms', JSON.stringify(dlg));
  } else {
    check(menu === 'navbar-menu-in 0.24s', 'normal: o menu mantém translateY + opacidade em 240ms', menu);
    check(dlg.dialog === 'dialog-sheet-in 0.4s' && dlg.backdrop === 'dialog-fade 0.24s', 'normal: sheet em 400ms e fundo em 240ms, como antes', JSON.stringify(dlg));
    check(!/color/.test(JSON.stringify(props)), 'normal: nenhuma transição de cor', JSON.stringify(props));
  }
  await ctx.close();
}

// 3. Menu mobile aberto e a tela passa de md: fecha e devolve a rolagem
console.log('=== §5.1 menu ao cruzar md');
{
  const ctx = await browser.newContext({ viewport: { width: 700, height: 900 } });
  const page = await ctx.newPage();
  await go(page, '#/');
  await page.getByRole('button', { name: 'Menu principal' }).click();
  await page.waitForTimeout(200);
  const before = await page.evaluate(() => getComputedStyle(document.body).overflow + '|' + getComputedStyle(document.documentElement).overflow);
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => ({ overflow: getComputedStyle(document.body).overflow + '|' + getComputedStyle(document.documentElement).overflow, scroll: (window.scrollTo(0, 600), window.scrollY) }));
  await page.setViewportSize({ width: 700, height: 900 });
  await page.waitForTimeout(200);
  const expanded = await page.getByRole('button', { name: 'Menu principal' }).getAttribute('aria-expanded');
  check(/hidden/.test(before) && !/hidden/.test(after.overflow) && after.scroll > 0 && expanded === 'false', 'ao passar de md o menu fecha e a rolagem volta', `antes=${before} depois=${after.overflow} scrollY=${after.scroll} expanded=${expanded}`);
  await ctx.close();
}

// 4. Guard genérico como no baseline: /profile sem sessão vai para /login (sem redirect)
console.log('=== §10.6 guard do perfil');
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await go(page, '#/profile');
  check(page.url().endsWith('#/login'), '/profile sem sessão → /login', page.url());
  await go(page, '#/payment');
  check(page.url().includes('#/login?redirect=/payment') || page.url().includes('redirect=%2Fpayment'), '/payment sem sessão continua com ?redirect=/payment', page.url());
  await ctx.close();
}

// 5. §5.7 padding do card e 6. KPIs com formatPrice e 7. spinner sem raio
console.log('=== §5.7 / §8 / §2.5');
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await seed(ctx, { 'smash-burger:session': SESSION, 'smash-burger:account': USER });
  const page = await ctx.newPage();
  await go(page, '#/confirmation');
  const pad = await page.evaluate(() => getComputedStyle(document.querySelector('.confirmation-page__card')).padding);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  check(pad === '32px', 'confirmação em 390: padding --space-6 (32px)', `${pad}, overflow=${overflow}`);
  await page.screenshot({ path: './shots/lacunas/confirmacao-390.png', fullPage: true });
  await ctx.close();
}
for (const reduce of [false, true]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  await seed(ctx, { 'smash-burger:account': USER });
  const page = await ctx.newPage();
  await go(page, '#/login');
  await page.fill('#email', USER.email);
  await page.fill('#password', USER.password);
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForTimeout(150);
  const sp = await page.evaluate(() => { const s = document.querySelector('.btn__spinner'); const cs = s && getComputedStyle(s); return s && { tag: s.tagName, radius: cs.borderRadius, anim: cs.animationName.replace(/-[0-9a-f]{8}$/, ''), text: s.closest('button').textContent.trim() }; });
  await page.screenshot({ path: `./shots/lacunas/login-loading-${reduce ? 'reduzido' : 'normal'}.png`, clip: await page.locator('form button[type=submit]').boundingBox() });
  check(sp && sp.tag === 'svg' && sp.radius === '0px' && (reduce ? sp.anim === 'none' : sp.anim === 'btn-spin') && sp.text === 'Entrando…', `spinner em SVG, sem raio, ${reduce ? 'parado' : 'girando'}, texto "Entrando…"`, JSON.stringify(sp));
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await seed(ctx, { admin: { admin: { firstName: 'Admin', lastName: 'User', role: 'admin' }, isAuthenticated: true } });
  const page = await ctx.newPage();
  await go(page, '#/admin');
  const kpis = await page.evaluate(() => [...document.querySelectorAll('.kpi__value')].map((k) => k.textContent.trim()));
  const nav = await page.evaluate(() => [...document.querySelectorAll('.admin-sidebar__item')].map((a) => a.textContent.trim()));
  check(kpis[0] === 'R$ 12.450,00' && kpis[2] === 'R$ 38,42', 'KPIs em reais via formatPrice', kpis.join(' | '));
  check(nav[0] === 'Painel' && !nav.includes('Dashboard'), 'sidebar: "Painel" no lugar de "Dashboard"', nav.join(' | '));
  const toggle = await page.getByRole('button', { name: 'Alternar menu' }).isVisible();
  const side = await page.evaluate(() => getComputedStyle(document.querySelector('.admin-sidebar')).display);
  check(!toggle && side !== 'none', '1440: sidebar fixa, sem botão de esconder', `toggle=${toggle} sidebar=${side}`);
  await page.screenshot({ path: './shots/lacunas/admin-1440.png' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  const small = { toggle: await page.getByRole('button', { name: 'Alternar menu' }).isVisible(), side: await page.evaluate(() => getComputedStyle(document.querySelector('.admin-sidebar')).display) };
  check(small.toggle && small.side === 'none', 'abaixo de lg: botão visível e gaveta fechada', JSON.stringify(small));
  await ctx.close();
}
await browser.close();
console.log(failures ? `FALHAS: ${failures}` : 'LACUNAS OK');
