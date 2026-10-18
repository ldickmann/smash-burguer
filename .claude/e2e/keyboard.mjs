// §13.5 Teclado: só Tab, Shift+Tab, Enter, Espaço, setas e Esc.
import { chromium } from 'playwright';
const BASE = 'http://localhost:4173/smash-burguer/';
const USER = { firstName: 'Maria', lastName: 'Silva', email: 'maria@exemplo.com', password: 'senha123', CEP: '88370000', address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' } };
const SESSION = { user: USER, isAuthenticated: true, orderHistory: [], lastOrderId: null, nextOrderId: 1001 };
const CART = { items: [{ productId: 1, category: 'foods', name: 'Cheese Bacon', image: '/images/foods/cheese-bacon', unitPrice: 25.99, quantity: 1, removedIngredients: [], additionals: [], observation: '' }] };
let failures = 0;
const check = (c, l, x = '') => { if (!c) failures++; console.log(`${c ? '  ✓' : '  ✗'} ${l}${x ? ` — ${x}` : ''}`); };
const browser = await chromium.launch();

// Anel visível no elemento focado (ou no card do rádio escondido)
const ringOf = () => {
  let el = document.activeElement;
  if (el.matches('input.visually-hidden')) el = el.closest('label');
  const s = getComputedStyle(el);
  const w = parseFloat(s.outlineWidth);
  return { tag: el.tagName, name: (el.getAttribute('aria-label') || el.textContent || el.id || '').trim().replace(/\s+/g, ' ').slice(0, 28), ok: s.outlineStyle !== 'none' && w >= 2, outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}` };
};

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
  await page.goto(BASE + '#/');
  await page.waitForLoadState('networkidle');
  await tabAll(page, 'Home');
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

  if (w === 390) {
    await page.goto(BASE + '#/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Menu principal' }).focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    const opened = await page.evaluate(() => document.activeElement.textContent.trim());
    await page.keyboard.press('Escape');
    const back = await page.evaluate(() => document.activeElement.getAttribute('aria-label'));
    check(opened === 'Início' && back === 'Menu principal', 'menu mobile: Enter abre, Esc fecha e devolve o foco');
  }
  await ctx.close();

  // Admin
  const actx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  await actx.addInitScript(() => { if (!sessionStorage.getItem('k')) { localStorage.clear(); localStorage.setItem('admin', JSON.stringify({ admin: { firstName: 'Admin', lastName: 'User', role: 'admin' }, isAuthenticated: true })); sessionStorage.setItem('k', '1'); } });
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
