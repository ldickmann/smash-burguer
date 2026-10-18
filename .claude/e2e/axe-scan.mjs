/* global process */
// Varredura §13.3: axe (WCAG 2.x A/AA), rolagem horizontal, alvos de toque e fontes.
// uso: node axe-scan.mjs <grupo: loja|admin|todos> [viewports] [reduce]
import { chromium } from 'playwright';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const BASE = 'http://localhost:4173/smash-burguer/';
const GROUP = process.argv[2] || 'loja';
const VPS = (process.argv[3] || '1440,390').split(',').map(Number);
const REDUCE = process.argv[4] === 'reduce';
const OUT = process.env.SCAN_OUT;
if (OUT) fs.mkdirSync(OUT, { recursive: true });

const USER = {
  firstName: 'Maria', lastName: 'Silva', email: 'maria@exemplo.com', password: 'senha123',
  dateOfBirth: '1990-05-10', phone: '47999999999', CEP: '88370000',
  address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' },
};
const ORDER = {
  id: 1001, date: '2026-10-17T22:15:00.000Z', status: 'Recebido', paymentMethod: 'PIX', total: 29.49, address: USER.address,
  items: [{ productId: 1, category: 'foods', name: 'Cheese Bacon', image: '/images/foods/cheese-bacon', unitPrice: 29.49, quantity: 1, removedIngredients: ['Tomate'], additionals: [{ name: 'Bacon', price: 3.5, quantity: 1 }], observation: '' }],
};
const SESSION = { user: USER, isAuthenticated: true, orderHistory: [ORDER], lastOrderId: 1001, nextOrderId: 1002 };
const CART = { items: [ORDER.items[0]] };
const ADMIN = { firstName: 'Admin', lastName: 'User', email: 'luksadmin@gmail.com', password: 'Dick1234$', role: 'admin' };

const LOGGED = { user: SESSION, 'smash-burger:session': SESSION, 'smash-burger:account': USER, 'smash-burger:cart:v1': CART, cart: CART };
const SCENARIOS = {
  loja: [
    { name: 'home', hash: '#/' },
    { name: 'menu', hash: '#/menu' },
    { name: 'modal-burger', hash: '#/menu', act: async (p) => { await p.getByRole('button', { name: 'Adicionar Cheese Bacon' }).click(); await p.waitForTimeout(600); } },
    { name: 'modal-bebida', hash: '#/menu', act: async (p) => { await p.getByRole('button', { name: 'Bebidas' }).click(); await p.getByRole('button', { name: 'Adicionar Copo de Refrigerante' }).click(); await p.waitForTimeout(600); } },
    { name: 'cart-vazio', hash: '#/cart' },
    { name: 'cart-itens', hash: '#/cart', storage: { 'smash-burger:cart:v1': CART } },
    { name: 'payment', hash: '#/payment', storage: LOGGED },
    { name: 'confirmation', hash: '#/confirmation', storage: LOGGED },
    { name: 'login', hash: '#/login' },
    { name: 'login-erro', hash: '#/login', storage: { 'smash-burger:account': USER }, act: async (p) => { await p.fill('#email', USER.email); await p.fill('#password', 'errada123'); await p.getByRole('button', { name: 'Entrar', exact: true }).click(); await p.waitForTimeout(1600); } },
    { name: 'register', hash: '#/register' },
    { name: 'register-vazio', hash: '#/register', act: async (p) => { await p.getByRole('button', { name: 'Criar conta', exact: true }).click(); await p.waitForTimeout(600); } },
    { name: 'profile', hash: '#/profile', storage: LOGGED },
    { name: '404', hash: '#/rota-inexistente' },
  ],
  admin: [
    { name: 'admin-login', hash: '#/admin/login' },
    { name: 'admin', hash: '#/admin', storage: { admin: { admin: ADMIN, isAuthenticated: true } } },
    { name: 'admin-produtos', hash: '#/admin/products', storage: { admin: { admin: ADMIN, isAuthenticated: true } } },
    { name: 'admin-modal', hash: '#/admin/products', storage: { admin: { admin: ADMIN, isAuthenticated: true } }, act: async (p) => { await p.getByRole('button', { name: 'Novo produto' }).click(); await p.waitForTimeout(500); } },
    { name: 'admin-pedidos', hash: '#/admin/orders', storage: { admin: { admin: ADMIN, isAuthenticated: true } } },
    { name: 'admin-relatorios', hash: '#/admin/reports', storage: { admin: { admin: ADMIN, isAuthenticated: true } } },
  ],
};
const list = GROUP === 'todos' ? [...SCENARIOS.loja, ...SCENARIOS.admin] : SCENARIOS[GROUP];

const browser = await chromium.launch();
let total = 0;
for (const w of VPS) {
  for (const sc of list) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, reducedMotion: REDUCE ? 'reduce' : 'no-preference' });
    await ctx.route('https://viacep.com.br/**', (r) => r.fulfill({ json: { logradouro: 'Rua Beira da Praia', bairro: 'Centro', localidade: 'Navegantes', uf: 'SC' } }));
    const storage = Object.fromEntries(Object.entries(sc.storage || {}).map(([k, v]) => [k, JSON.stringify(v)]));
    await ctx.addInitScript((s) => { if (sessionStorage.getItem('__s')) return; localStorage.clear(); for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v); sessionStorage.setItem('__s', '1'); }, storage);
    const page = await ctx.newPage();
    await page.goto(BASE + sc.hash);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(300);
    if (sc.act) await sc.act(page);
    if (OUT) {
      const tag = `${sc.name}-${w}${REDUCE ? '-reduce' : ''}`;
      await page.screenshot({ path: `${OUT}/${tag}-viewport.png` });
      if (!sc.act) {
        // Página inteira: rola até o fim e volta, para carregar o lazy
        await page.evaluate(async () => { window.scrollTo(0, document.documentElement.scrollHeight); await new Promise((r) => setTimeout(r, 400)); window.scrollTo(0, 0); document.activeElement?.blur?.(); });
        await page.waitForLoadState('networkidle').catch(() => {});
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
      }
    }
    await page.addScriptTag({ content: AXE });
    const res = await page.evaluate(async () => {
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] } });
      const vw = innerWidth;
      // Alvos de toque (§1.1 critério 3)
      const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && !el.closest('[aria-hidden="true"], [inert]') && !el.closest('.visually-hidden'); };
      const small = [];
      for (const el of document.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"]), input[type="checkbox"], input[type="radio"]')) {
        if (!visible(el) && !(el.matches('input') && el.closest('label'))) continue;
        let box = el.getBoundingClientRect();
        const label = el.closest('label');
        if (el.matches('input[type="radio"], input[type="checkbox"]')) {
          const lr = label?.getBoundingClientRect();
          const ok = el.classList.contains('visually-hidden') ? (lr && lr.height >= 44) : (box.width >= 24 && box.height >= 24 && lr && lr.height >= 44);
          if (!ok) small.push(`${el.tagName}[${el.type}] ${Math.round(box.width)}x${Math.round(box.height)} label=${lr ? Math.round(lr.height) : '-'}`);
          continue;
        }
        const extra = el.classList.contains('btn--sm') ? 4 : 0; // ::after estende o sm a 44
        const inline = el.matches('.link-inline, .prose a') && box.height >= 24;
        const dot = el.matches('.carousel__pagination-button') && box.width >= 24 && box.height >= 24; // §5.2: 24×24
        if (inline || dot) continue;
        if (box.width < 44 || box.height + extra < 44) small.push(`${el.tagName}.${[...el.classList].slice(0, 2).join('.')} "${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 24)}" ${Math.round(box.width)}x${Math.round(box.height)}`);
      }
      const h1 = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim());
      const bebas = [...document.querySelectorAll('h1, .display')].map((h) => getComputedStyle(h).fontWeight);
      return {
        violations: r.violations.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`),
        overflow: document.documentElement.scrollWidth !== vw ? document.documentElement.scrollWidth : 0,
        small: [...new Set(small)].slice(0, 8),
        h1,
        font: getComputedStyle(document.body).fontFamily.split(',')[0],
        bebas: [...new Set(bebas)],
        title: document.title,
      };
    });
    total += res.violations.length;
    const flag = res.violations.length || res.overflow || res.small.length ? '✗' : '✓';
    console.log(`${flag} ${w} ${sc.name.padEnd(15)} axe=${res.violations.length} overflow=${res.overflow} h1=${JSON.stringify(res.h1)} font=${res.font} bebasW=${res.bebas} title="${res.title}"`);
    res.violations.forEach((v) => console.log('    axe:', v));
    res.small.forEach((v) => console.log('    alvo:', v));
    await ctx.close();
  }
}
console.log('TOTAL violações axe:', total);
await browser.close();
