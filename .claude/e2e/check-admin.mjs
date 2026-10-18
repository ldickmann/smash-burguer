// §13.8 e §13.5 (admin): sidebar, gaveta, menu de perfil, telas.
import { chromium } from 'playwright';
const BASE = 'http://localhost:4173/smash-burguer/';
const ADMIN = { firstName: 'Admin', lastName: 'User', email: 'luksadmin@gmail.com', password: 'Dick1234$', role: 'admin' };
let failures = 0;
const check = (c, l, x = '') => { if (!c) failures++; console.log(`${c ? '  ✓' : '  ✗'} ${l}${x ? ` — ${x}` : ''}`); };
const browser = await chromium.launch();

for (const w of [1440, 390]) {
  console.log(`=== ${w}`);
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  // Admin semeado como o createAdmin.html faz
  await ctx.addInitScript((a) => { if (!sessionStorage.getItem('s')) { localStorage.clear(); localStorage.setItem('admin', JSON.stringify(a)); sessionStorage.setItem('s', '1'); } }, ADMIN);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  // Login admin pela tela
  await page.goto(BASE + '#/admin/login');
  await page.waitForLoadState('networkidle');
  check(await page.locator('main').count() === 1, 'login admin tem <main>');
  await page.fill('#email', ADMIN.email);
  await page.fill('#password', 'errada1');
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.locator('[role=alert]').waitFor({ timeout: 2500 }).catch(() => {});
  check(await page.locator('[role=alert]').count() === 1, 'senha errada: banner role="alert", sem alert() nativo');
  await page.fill('#password', ADMIN.password);
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForURL(/#\/admin$/, { timeout: 3000 }).catch(() => {});
  check(page.url().endsWith('#/admin'), 'login admin vai para #/admin');
  await page.waitForTimeout(300);

  for (const [hash, label] of [['#/admin', 'Painel'], ['#/admin/products', 'Gestão de Produtos'], ['#/admin/orders', 'Gestão de Pedidos'], ['#/admin/reports', 'Relatórios de Vendas']]) {
    await page.evaluate((h) => { location.hash = h; }, hash);
    await page.waitForTimeout(400);
    const active = await page.evaluate(() => [...document.querySelectorAll('.admin-sidebar__item[aria-current="page"]')].map((a) => a.textContent.trim()));
    check(active.length === 1 && active[0] === label, `um único item ativo em ${hash}`, active.join(','));
  }

  await page.evaluate(() => { location.hash = '#/admin/products'; });
  await page.waitForTimeout(400);
  const sidebarVisible = await page.evaluate(() => getComputedStyle(document.querySelector('.admin-sidebar')).display !== 'none');
  if (w === 390) {
    check(!sidebarVisible, 'em 390 a sidebar começa fechada');
    await page.getByRole('button', { name: 'Novo produto' }).click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(400);
    check(await page.evaluate(() => document.querySelector('dialog')?.matches(':modal')), '"Novo produto" clicável sem fechar nada');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    // Gaveta: abre, Esc fecha e devolve o foco
    await page.getByRole('button', { name: 'Alternar menu' }).click();
    await page.waitForTimeout(300);
    const drawer = await page.evaluate(() => ({ open: getComputedStyle(document.querySelector('.admin-sidebar')).display !== 'none', overlay: !!document.querySelector('.admin-overlay'), focus: document.activeElement.textContent.trim(), expanded: document.querySelector('[aria-label="Alternar menu"]').getAttribute('aria-expanded') }));
    check(drawer.open && drawer.overlay && drawer.expanded === 'true', 'gaveta abre sobre fundo escurecido', JSON.stringify(drawer));
    await page.screenshot({ path: `./shots/fase6/26-admin-gaveta-${w}.png` });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    const closed = await page.evaluate(() => ({ open: getComputedStyle(document.querySelector('.admin-sidebar')).display !== 'none', focus: document.activeElement.getAttribute('aria-label') }));
    check(!closed.open && closed.focus === 'Alternar menu', 'Esc fecha a gaveta e devolve o foco', JSON.stringify(closed));
    await page.getByRole('button', { name: 'Alternar menu' }).click();
    await page.waitForTimeout(200);
    await page.locator('.admin-overlay').click({ position: { x: 370, y: 400 } });
    await page.waitForTimeout(200);
    check(await page.evaluate(() => getComputedStyle(document.querySelector('.admin-sidebar')).display === 'none'), 'clique no fundo fecha a gaveta');
    await page.getByRole('button', { name: 'Alternar menu' }).click();
    await page.waitForTimeout(200);
    await page.getByRole('link', { name: 'Gestão de Pedidos' }).click();
    await page.waitForTimeout(400);
    check(await page.evaluate(() => getComputedStyle(document.querySelector('.admin-sidebar')).display === 'none'), 'trocar de rota fecha a gaveta');
  } else {
    check(sidebarVisible, 'a partir de lg a sidebar fica fixa e aberta');
    check(!(await page.getByRole('button', { name: 'Alternar menu' }).isVisible()), 'a partir de lg não há botão para esconder a sidebar fixa');
  }

  // Menu de perfil: Enter abre, Esc fecha
  await page.locator('.navbar-profile__avatar').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  const menu = await page.evaluate(() => ({ visible: getComputedStyle(document.querySelector('.navbar-profile__menu')).display !== 'none', focus: document.activeElement.getAttribute('role'), initials: document.querySelector('.navbar-profile__avatar').textContent.trim(), expanded: document.querySelector('.navbar-profile__avatar').getAttribute('aria-expanded') }));
  check(menu.visible && menu.focus === 'menuitem' && menu.expanded === 'true', 'menu de perfil abre com Enter e o foco vai para o 1º item', JSON.stringify(menu));
  check(menu.initials === 'AU', 'avatar com as iniciais do admin logado', menu.initials);
  if (w === 1440) await page.screenshot({ path: `./shots/fase6/27-admin-menu-perfil-${w}.png`, clip: { x: 900, y: 0, width: 540, height: 300 } });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  const menuClosed = await page.evaluate(() => ({ visible: getComputedStyle(document.querySelector('.navbar-profile__menu')).display !== 'none', focus: document.activeElement.className }));
  check(!menuClosed.visible && menuClosed.focus.includes('navbar-profile__avatar'), 'Esc fecha o menu e devolve o foco ao avatar');

  // Telas
  await page.evaluate(() => { location.hash = '#/admin/reports'; });
  await page.waitForTimeout(400);
  const reports = await page.evaluate(() => [...document.querySelectorAll('.kpi__value')].map((v) => v.textContent.trim().replace(/\u00a0/g, ' ')));
  check(reports.includes('R$ 12.450,00') && reports.includes('324'), 'relatórios mostram os valores', reports.join(' | '));
  await page.evaluate(() => { location.hash = '#/admin/orders'; });
  await page.waitForTimeout(400);
  const orders = await page.evaluate(() => ({ label: document.querySelector('label[for="statusFilter"]')?.textContent.trim(), chips: [...document.querySelectorAll('.status-chip')].map((c) => c.textContent.trim()), prices: [...document.querySelectorAll('.order-info__total')].map((t) => t.textContent.replace(/\s+/g, ' ').trim()) }));
  check(orders.label === 'Status', 'filtro de pedidos tem rótulo "Status"');
  check(orders.chips.join(',') === 'Pendente,Em preparo', 'status em português', orders.chips.join(','));
  check(orders.prices.every((p) => p.includes('R$') && p.includes(',')), 'preços com formatPrice', orders.prices.join(' | '));
  await page.selectOption('#statusFilter', 'completed');
  await page.waitForTimeout(200);
  check(await page.locator('.empty-state').count() === 1, 'filtro sem resultado mostra EmptyState');
  check(errors.length === 0, 'sem erros de página', errors.join(' | '));
  await ctx.close();
}
await browser.close();
console.log(failures ? `FALHAS: ${failures}` : 'ADMIN OK');
