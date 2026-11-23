/* global process */
// Varredura §13.3: axe (WCAG 2.x A/AA), rolagem horizontal, alvos de toque, fontes, peso do h1 e violações da CSP.
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
  firstName: 'Maria', lastName: 'Silva', email: 'maria@example.com', password: 'senha123',
  dateOfBirth: '1990-05-10', phone: '47999999999', CEP: '88370000',
  address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' },
};
const ORDER = {
  id: 1001, date: '2026-10-17T22:15:00.000Z', status: 'Recebido', paymentMethod: 'PIX', total: 29.49, address: USER.address,
  items: [{ productId: 1, category: 'foods', name: 'Cheese Bacon', image: '/images/foods/cheese-bacon', unitPrice: 29.49, quantity: 1, removedIngredients: ['Tomate'], additionals: [{ name: 'Bacon', price: 3.5, quantity: 1 }], observation: '' }],
};
const SESSION = { user: USER, isAuthenticated: true, orderHistory: [ORDER], lastOrderId: 1001, nextOrderId: 1002 };
const CART = { items: [ORDER.items[0]] };
const ADMIN = { firstName: 'Admin', lastName: 'User', email: 'admin@example.com', password: 'Demo1234', role: 'admin' };

const LOGGED = { user: SESSION, 'smash-burger:session': SESSION, 'smash-burger:account': USER, 'smash-burger:cart:v1': CART, cart: CART };

// Cardápio (desenho do Cardápio, §9): as categorias são rádios nativos escondidos sob o rótulo (o force
// clica no label e confere que o rádio ficou marcado), e cada estado confere o seletor estável dele antes
// do axe, para não medir a tela errada
const marcar = async (p, nome) => { await p.getByRole('radio', { name: nome, exact: true }).check({ force: true }); await p.waitForTimeout(200); };
const exigir = async (p, seletor, estado) => { if (!(await p.locator(seletor).count())) throw new Error(`${estado}: o estado não abriu (${seletor})`); };
const abrirModal = async (p, nome) => { await p.getByRole('button', { name: `Adicionar ${nome}`, exact: true }).click(); await p.waitForTimeout(600); };
const SCENARIOS = {
  loja: [
    { name: 'home', hash: '#/' },
    // SPEC-material §13.3: a Home com a folha de ingredientes aberta e com o cardápio esvaziado no
    // painel (a store de produtos vazia, salva no navegador como o painel salva, e a página recarregada)
    { name: 'home-folha', hash: '#/', act: async (p) => { await p.getByRole('button', { name: 'Ingredientes de Smash Burger', exact: true }).click(); await p.waitForTimeout(600); } },
    {
      name: 'home-vazio', hash: '#/', full: true, act: async (p) => {
        await p.evaluate(() => { const s = document.querySelector('#app').__vue_app__.config.globalProperties.$pinia._s.get('products'); s.menuItems = { foods: [], drinks: [], desserts: [] }; s.loadedCategories = ['foods', 'drinks', 'desserts']; });
        await p.waitForTimeout(300);
        await p.reload();
        await p.waitForLoadState('networkidle').catch(() => {});
        await p.waitForTimeout(300);
        // Sem esta conferência, uma mudança na persistência do catálogo faria o axe medir a Home cheia
        const vazio = await p.evaluate(() => ({ produtos: document.querySelectorAll('[data-secao] article, [data-secao] .m3-item').length, avisos: [...document.querySelectorAll('[data-secao]')].filter((s) => s.textContent.includes('Nada nesta categoria por enquanto')).length }));
        if (vazio.produtos > 0 || vazio.avisos !== 2) throw new Error(`home-vazio: o cardápio não ficou vazio depois de recarregar (${JSON.stringify(vazio)})`);
      },
    },
    { name: 'menu', hash: '#/menu' },
    { name: 'menu-bebidas', hash: '#/menu', full: true, act: async (p) => { await marcar(p, 'Bebidas'); await exigir(p, '.category-tabs input[value="drinks"]:checked', 'menu-bebidas'); } },
    {
      name: 'menu-vazio', hash: '#/menu', full: true, act: async (p) => {
        // Sobremesas esvaziadas na store (salva no navegador, como o painel salva) e a página recarregada
        await p.evaluate(() => { const s = document.querySelector('#app').__vue_app__.config.globalProperties.$pinia._s.get('products'); s.menuItems = { foods: [...s.foods], drinks: [...s.drinks], desserts: [] }; s.loadedCategories = ['foods', 'drinks', 'desserts']; });
        await p.waitForTimeout(300);
        await p.reload();
        await p.waitForLoadState('networkidle').catch(() => {});
        await p.waitForTimeout(300);
        await marcar(p, 'Sobremesas');
        await exigir(p, '.menu-page__regiao .empty-state', 'menu-vazio');
      },
    },
    { name: 'menu-folha', hash: '#/menu', act: async (p) => { await p.getByRole('button', { name: 'Ingredientes de Cheese Bacon', exact: true }).click(); await p.waitForTimeout(600); await exigir(p, '#m3-ingredientes-1:visible', 'menu-folha'); } },
    { name: 'modal-burger', hash: '#/menu', act: async (p) => { await abrirModal(p, 'Cheese Bacon'); await exigir(p, 'dialog[open] .burger-stack', 'modal-burger'); } },
    { name: 'modal-bebida', hash: '#/menu', act: async (p) => { await marcar(p, 'Bebidas'); await abrirModal(p, 'Copo de Refrigerante'); await exigir(p, 'dialog[open] #quantidade-titulo', 'modal-bebida'); } },
    {
      name: 'modal-sobremesa', hash: '#/menu', act: async (p) => {
        await marcar(p, 'Sobremesas');
        await abrirModal(p, 'Sorvete de Pote');
        await exigir(p, 'dialog[open] .additionals-list', 'modal-sobremesa');
        if (await p.locator('dialog[open] .burger-stack').count()) throw new Error('modal-sobremesa: o montador apareceu na sobremesa');
      },
    },
    { name: 'modal-ingrediente-removido', hash: '#/menu', act: async (p) => { await abrirModal(p, 'Cheese Bacon'); await p.locator('dialog[open] .ingredients-list__label', { hasText: 'Tomate' }).click(); await p.waitForTimeout(300); await exigir(p, 'dialog[open] .ingredients-list__label.is-removed', 'modal-ingrediente-removido'); } },
    { name: 'modal-adicional', hash: '#/menu', act: async (p) => { await abrirModal(p, 'Cheese Bacon'); await p.getByRole('button', { name: 'Aumentar Bacon' }).click(); await p.waitForTimeout(400); const bacon = await p.locator('dialog[open] .additionals-list .stepper__value').first().textContent(); if (bacon.trim() !== '1') throw new Error(`modal-adicional: o Bacon ficou em "${bacon.trim()}"`); } },
    // Carrinho, pagamento e confirmação (desenho do Carrinho, §9): cada estado confere o seletor dele
    { name: 'cart-vazio', hash: '#/cart', full: true, act: async (p) => { await exigir(p, '.cart-page .empty-state', 'cart-vazio'); } },
    { name: 'cart-itens', hash: '#/cart', storage: { 'smash-burger:cart:v1': CART }, full: true, act: async (p) => { await exigir(p, '.cart-page__notice', 'cart-itens'); } },
    { name: 'cart-logado', hash: '#/cart', storage: LOGGED, full: true, act: async (p) => { await exigir(p, '.cart-page__resumo a:has-text("Finalizar pedido")', 'cart-logado'); } },
    { name: 'cart-desfazer', hash: '#/cart', storage: LOGGED, act: async (p) => { await p.getByRole('button', { name: 'Remover Cheese Bacon' }).click(); await p.waitForTimeout(300); await exigir(p, '.toast button:has-text("Desfazer")', 'cart-desfazer'); } },
    { name: 'payment', hash: '#/payment', storage: LOGGED, full: true, act: async (p) => { await exigir(p, '.payment-page address', 'payment'); } },
    {
      name: 'payment-sem-endereco', hash: '#/payment', full: true,
      storage: { ...LOGGED, 'smash-burger:session': { ...SESSION, user: { ...USER, address: {} } }, 'smash-burger:account': { ...USER, address: {} } },
      act: async (p) => { await exigir(p, '.payment-page__aviso', 'payment-sem-endereco'); },
    },
    { name: 'payment-marcada', hash: '#/payment', storage: LOGGED, act: async (p) => { await p.locator('input[name="payment-method"][value="pix"]').check({ force: true }); await p.waitForTimeout(300); await exigir(p, '.payment-option.is-checked', 'payment-marcada'); } },
    {
      // A espera simulada de 800 ms é esticada só nesta página, para o axe medir o estado carregando
      name: 'payment-enviando', hash: '#/payment', storage: LOGGED, act: async (p) => {
        await p.locator('input[name="payment-method"][value="pix"]').check({ force: true });
        await p.evaluate(() => { const original = window.setTimeout; window.setTimeout = (fn, ms, ...resto) => original(fn, ms === 800 ? 60000 : ms, ...resto); });
        await p.getByRole('button', { name: /Confirmar pedido/ }).click();
        await p.waitForTimeout(300);
        await exigir(p, '.order-summary__cta [aria-busy="true"]', 'payment-enviando');
      },
    },
    { name: 'confirmation', hash: '#/confirmation', storage: LOGGED, full: true, act: async (p) => { await exigir(p, '.confirmation-page__status h1', 'confirmation'); } },
    { name: 'login', hash: '#/login' },
    { name: 'login-erro', hash: '#/login', storage: { 'smash-burger:account': USER }, act: async (p) => { await p.fill('#email', USER.email); await p.fill('#password', 'errada123'); await p.getByRole('button', { name: 'Entrar', exact: true }).click(); await p.waitForTimeout(1600); } },
    { name: 'register', hash: '#/register' },
    { name: 'register-vazio', hash: '#/register', act: async (p) => { await p.getByRole('button', { name: 'Criar conta', exact: true }).click(); await p.waitForTimeout(600); } },
    { name: 'register-conta-salva', hash: '#/register', storage: { 'smash-burger:account': USER } },
    { name: 'profile', hash: '#/profile', storage: LOGGED },
    { name: 'profile-excluir', hash: '#/profile', storage: LOGGED, act: async (p) => { await p.getByRole('button', { name: 'Excluir conta' }).click(); await p.waitForTimeout(600); } },
    { name: '404', hash: '#/rota-inexistente' },
  ],
  admin: [
    { name: 'admin-login', hash: '#/admin/login' },
    { name: 'admin', hash: '#/admin', storage: { 'smash-burger:admin-session': { admin: ADMIN, isAuthenticated: true } } },
    { name: 'admin-produtos', hash: '#/admin/products', storage: { 'smash-burger:admin-session': { admin: ADMIN, isAuthenticated: true } } },
    { name: 'admin-modal', hash: '#/admin/products', storage: { 'smash-burger:admin-session': { admin: ADMIN, isAuthenticated: true } }, act: async (p) => { await p.getByRole('button', { name: 'Novo produto' }).click(); await p.waitForTimeout(500); } },
    { name: 'admin-pedidos', hash: '#/admin/orders', storage: { 'smash-burger:admin-session': { admin: ADMIN, isAuthenticated: true } } },
    { name: 'admin-relatorios', hash: '#/admin/reports', storage: { 'smash-burger:admin-session': { admin: ADMIN, isAuthenticated: true } } },
  ],
};
const list = GROUP === 'todos' ? [...SCENARIOS.loja, ...SCENARIOS.admin] : SCENARIOS[GROUP];

// SPEC-material §2.3: o texto da loja e do painel é a Roboto Variable
const FONTE_BODY = '"Roboto Variable"';
// SPEC-material §13.3, item 5: o h1 em Medium (peso 500); a caixa alta não é conferida aqui
const PESO_H1 = '500';

const browser = await chromium.launch();
let total = 0;
let cspTotal = 0;
let fonteTotal = 0;
let pesoTotal = 0;
for (const w of VPS) {
  for (const sc of list) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, reducedMotion: REDUCE ? 'reduce' : 'no-preference' });
    await ctx.route('https://viacep.com.br/**', (r) => r.fulfill({ json: { logradouro: 'Rua Beira da Praia', bairro: 'Centro', localidade: 'Navegantes', uf: 'SC' } }));
    const storage = Object.fromEntries(Object.entries(sc.storage || {}).map(([k, v]) => [k, JSON.stringify(v)]));
    await ctx.addInitScript((s) => { if (sessionStorage.getItem('__s')) return; localStorage.clear(); for (const [k, v] of Object.entries(s)) localStorage.setItem(k, v); sessionStorage.setItem('__s', '1'); }, storage);
    const page = await ctx.newPage();
    // Violações da Content-Security-Policy do index.html: o Chromium as escreve no console
    const csp = [];
    page.on('console', (m) => { if (m.type() === 'error' && /Content Security Policy/i.test(m.text())) csp.push(m.text()); });
    await page.goto(BASE + sc.hash);
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(300);
    if (sc.act) await sc.act(page);
    if (OUT) {
      const tag = `${sc.name}-${w}${REDUCE ? '-reduce' : ''}`;
      await page.screenshot({ path: `${OUT}/${tag}-viewport.png` });
      if (!sc.act || sc.full) {
        // Página inteira: rola até o fim e volta, para carregar o lazy
        await page.evaluate(async () => { window.scrollTo(0, document.documentElement.scrollHeight); await new Promise((r) => setTimeout(r, 400)); window.scrollTo(0, 0); document.activeElement?.blur?.(); });
        await page.waitForLoadState('networkidle').catch(() => {});
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${OUT}/${tag}-full.png`, fullPage: true });
      }
    }
    // Por evaluate, e não por <script> inline, que a CSP bloqueia
    await page.evaluate(AXE);
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
        const assinatura = el.matches('.ldk-encaixe__l') && box.height >= 24; // §1.1: faixa fixa de 40 px
        if (inline || dot || assinatura) continue;
        if (box.width < 44 || box.height + extra < 44) small.push(`${el.tagName}.${[...el.classList].slice(0, 2).join('.')} "${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 24)}" ${Math.round(box.width)}x${Math.round(box.height)}`);
      }
      const h1 = [...document.querySelectorAll('h1')].map((h) => h.textContent.trim());
      const pesoH1 = [...document.querySelectorAll('h1')].map((h) => getComputedStyle(h).fontWeight);
      return {
        violations: r.violations.map((v) => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`),
        overflow: document.documentElement.scrollWidth !== vw ? document.documentElement.scrollWidth : 0,
        small: [...new Set(small)].slice(0, 8),
        h1,
        font: getComputedStyle(document.body).fontFamily.split(',')[0],
        pesoH1: [...new Set(pesoH1)],
        title: document.title,
      };
    });
    total += res.violations.length;
    cspTotal += csp.length;
    const fonteErrada = res.font !== FONTE_BODY;
    if (fonteErrada) fonteTotal += 1;
    const pesoErrado = res.pesoH1.some((p) => p !== PESO_H1);
    if (pesoErrado) pesoTotal += 1;
    const flag = res.violations.length || res.overflow || res.small.length || csp.length || fonteErrada || pesoErrado ? '✗' : '✓';
    console.log(`${flag} ${w} ${sc.name.padEnd(15)} axe=${res.violations.length} csp=${csp.length} overflow=${res.overflow} h1=${JSON.stringify(res.h1)} font=${res.font} h1W=${res.pesoH1} title="${res.title}"`);
    res.violations.forEach((v) => console.log('    axe:', v));
    res.small.forEach((v) => console.log('    alvo:', v));
    csp.forEach((v) => console.log('    csp:', v));
    if (fonteErrada) console.log(`    fonte: o body usa ${res.font}, e não ${FONTE_BODY}`);
    if (pesoErrado) console.log(`    peso: o h1 usa ${res.pesoH1}, e não ${PESO_H1}`);
    await ctx.close();
  }
}
console.log('TOTAL violações axe:', total);
console.log('TOTAL violações CSP:', cspTotal);
console.log('TOTAL telas com o body fora da Roboto:', fonteTotal);
console.log('TOTAL telas com o h1 fora do peso 500:', pesoTotal);
await browser.close();
