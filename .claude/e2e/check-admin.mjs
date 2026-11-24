// §13.8 e §13.5 (admin): coluna, gaveta, menu de perfil, telas (docs/direcoes/desenho/admin.md, §9).
import { chromium } from 'playwright';
const BASE = 'http://localhost:4173/smash-burguer/';
const ADMIN = { firstName: 'Admin', lastName: 'User', email: 'admin@example.com', password: 'Demo1234', role: 'admin' };
let failures = 0;
const check = (c, l, x = '') => { if (!c) failures++; console.log(`${c ? '  ✓' : '  ✗'} ${l}${x ? ` — ${x}` : ''}`); };
const browser = await chromium.launch();

for (const w of [1440, 390]) {
  console.log(`=== ${w}`);
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 } });
  // Admin criado à mão na chave `admin`, como no site publicado
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
  await page.locator('[role=alert] .auth-alert').waitFor({ timeout: 2500 }).catch(() => {});
  check(await page.locator('[role=alert] .auth-alert').count() === 1, 'senha errada: banner dentro da região role="alert", sem alert() nativo');
  await page.fill('#password', ADMIN.password);
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  await page.waitForURL(/#\/admin$/, { timeout: 3000 }).catch(() => {});
  check(page.url().endsWith('#/admin'), 'login admin vai para #/admin');
  await page.waitForTimeout(300);

  for (const [hash, label] of [['#/admin', 'Painel'], ['#/admin/products', 'Produtos'], ['#/admin/orders', 'Pedidos'], ['#/admin/reports', 'Relatórios'], ['#/admin/profile', null], ['#/admin/settings', null]]) {
    await page.evaluate((h) => { location.hash = h; }, hash);
    await page.waitForTimeout(400);
    const active = await page.evaluate(() => [...document.querySelectorAll('.admin-sidebar__item[aria-current="page"]')].map((a) => a.textContent.trim()));
    if (label) check(active.length === 1 && active[0] === label, `um único item ativo em ${hash}`, active.join(','));
    else check(active.length === 0, `nenhum item ativo em ${hash} (fora da navegação)`, active.join(','));
  }
  // Os atalhos levam aria-current="false": na página inteira, um item atual só
  await page.evaluate(() => { location.hash = '#/admin/orders?status=pending'; });
  await page.waitForTimeout(400);
  const atuais = await page.evaluate(() => [...document.querySelectorAll('[aria-current="page"]')].map((a) => a.textContent.trim()));
  check(atuais.length === 1 && atuais[0] === 'Pedidos', 'em #/admin/orders?status=pending, um só aria-current="page" na página', atuais.join(','));
  const marca = await page.evaluate(() => { const p = document.querySelector('.admin-sidebar__brand'); return { texto: p?.textContent.trim(), caixa: p && getComputedStyle(p).textTransform }; });
  check(marca.texto === 'Smash Burger' && marca.caixa === 'none', 'a marca "Smash Burger" sem caixa alta', JSON.stringify(marca));

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
    const estado = () => page.evaluate(() => ({
      open: getComputedStyle(document.querySelector('.admin-sidebar')).display !== 'none',
      overlay: !!document.querySelector('.admin-overlay'),
      expanded: document.querySelector('[aria-label="Alternar menu"]')?.getAttribute('aria-expanded'),
      role: document.querySelector('#admin-sidebar')?.getAttribute('role'),
      modal: document.querySelector('#admin-sidebar')?.getAttribute('aria-modal'),
      nome: document.querySelector('#admin-sidebar')?.getAttribute('aria-label'),
      inert: ['main', '.admin-header', '.skip-link'].map((sel) => document.querySelector(sel)?.hasAttribute('inert') ?? null),
      foco: document.activeElement.getAttribute('aria-label') || document.activeElement.id || document.activeElement.textContent.trim() || document.activeElement.tagName,
    }));
    // A volta do foco nos três fechamentos, no Chromium (o jsdom não implementa o inert). Mutação: com
    // o focus() antes do nextTick, o foco fica no body.
    const fechamentos = [
      ['Esc', () => page.keyboard.press('Escape')],
      ['"Fechar"', () => page.locator('#admin-sidebar').getByRole('button', { name: 'Fechar' }).click()],
      ['o clique no fundo', () => page.locator('.admin-overlay').click({ position: { x: 370, y: 400 } })],
    ];
    for (const [como, fechar] of fechamentos) {
      await page.getByRole('button', { name: 'Alternar menu' }).click();
      await page.waitForTimeout(300);
      const aberta = await estado();
      check(aberta.open && aberta.overlay && aberta.expanded === 'true' && aberta.role === 'dialog' && aberta.modal === 'true' && aberta.nome === 'Menu do painel' && aberta.inert.every(Boolean) && aberta.foco === 'Painel',
        `gaveta aberta (antes de fechar por ${como}): diálogo modal sobre o fundo, página inert, foco em "Painel"`, JSON.stringify(aberta));
      if (como === 'Esc') await page.screenshot({ path: `./shots/fase6/26-admin-gaveta-${w}.png` });
      await fechar();
      await page.waitForTimeout(250);
      const fechada = await estado();
      check(!fechada.open && fechada.inert.every((x) => !x) && fechada.foco === 'Alternar menu', `${como} fecha a gaveta, tira o inert e devolve o foco ao "Alternar menu"`, JSON.stringify(fechada));
    }
    // Troca de rota pelo link e troca só de query: o foco vai ao main
    await page.getByRole('button', { name: 'Alternar menu' }).click();
    await page.waitForTimeout(300);
    await page.locator('#admin-sidebar').getByRole('link', { name: 'Pedidos' }).click();
    await page.waitForTimeout(400);
    let depois = await estado();
    check(!depois.open && depois.foco === 'conteudo', 'trocar de rota pelo link fecha a gaveta e leva o foco ao main', JSON.stringify(depois));
    await page.evaluate(() => { location.hash = '#/admin/orders?status=pending'; });
    await page.waitForTimeout(400);
    await page.getByRole('button', { name: 'Alternar menu' }).click();
    await page.waitForTimeout(300);
    await page.locator('#admin-sidebar').getByRole('link', { name: 'Pedidos' }).press('Enter');
    await page.waitForTimeout(400);
    depois = await estado();
    check(!depois.open && page.url().endsWith('#/admin/orders') && depois.foco === 'conteudo', 'a troca só de query (?status=pending → sem filtro) leva o foco ao main', JSON.stringify({ ...depois, url: page.url() }));
    await page.evaluate(() => { location.hash = '#/admin/products'; });
    await page.waitForTimeout(400);
  } else {
    check(sidebarVisible, 'a partir de lg a sidebar fica fixa e aberta');
    check(!(await page.getByRole('button', { name: 'Alternar menu' }).isVisible()), 'a partir de lg não há botão para esconder a sidebar fixa');
    const coluna = await page.evaluate(() => {
      const div = document.querySelector('#admin-sidebar');
      const nav = div?.querySelector('nav[aria-label="Seções do painel"]');
      return { tag: div?.tagName, role: div?.getAttribute('role'), nome: div?.getAttribute('aria-label'), marca: !!nav?.querySelector('.admin-sidebar__brand'), sair: !!nav && [...nav.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Sair'), inert: !!document.querySelector('[inert]') };
    });
    check(coluna.tag === 'DIV' && !coluna.role && !coluna.nome && coluna.marca && coluna.sair && !coluna.inert, 'a coluna é um div sem papel nem nome, e a nav "Seções do painel" tem a marca e o "Sair"', JSON.stringify(coluna));
  }

  // Menu de perfil: Enter abre, Esc fecha
  await page.locator('.navbar-profile__avatar').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(250);
  const menu = await page.evaluate(() => ({ visible: getComputedStyle(document.querySelector('.navbar-profile__menu')).display !== 'none', focus: document.activeElement.getAttribute('role'), initials: document.querySelector('.navbar-profile__avatar').textContent.trim(), expanded: document.querySelector('.navbar-profile__avatar').getAttribute('aria-expanded') }));
  check(menu.visible && menu.focus === 'menuitem' && menu.expanded === 'true', 'menu de perfil abre com Enter e o foco vai para o 1º item', JSON.stringify(menu));
  check(menu.initials === 'AU', 'avatar com as iniciais do admin logado', menu.initials);
  if (w === 1440) await page.screenshot({ path: `./shots/fase6/27-admin-menu-perfil-${w}.png`, clip: { x: 900, y: 0, width: 540, height: 300 } });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  const menuClosed = await page.evaluate(() => ({ visible: getComputedStyle(document.querySelector('.navbar-profile__menu')).display !== 'none', focus: document.activeElement.className }));
  check(!menuClosed.visible && menuClosed.focus.includes('navbar-profile__avatar'), 'Esc fecha o menu e devolve o foco ao avatar');

  // Telas
  await page.evaluate(() => { location.hash = '#/admin/reports'; });
  await page.waitForTimeout(400);
  const reports = await page.evaluate(() => [...document.querySelectorAll('.kpi__value')].map((v) => v.textContent.trim().replace(/\u00a0/g, ' ')));
  check(reports.includes('R$ 12.450,00') && reports.includes('324'), 'relatórios mostram os valores', reports.join(' | '));
  await page.evaluate(() => { location.hash = '#/admin/orders'; });
  await page.waitForTimeout(400);
  const orders = await page.evaluate(() => ({ label: document.querySelector('label[for="statusFilter"]')?.textContent.trim(), chips: [...document.querySelectorAll('.m3-status')].map((c) => c.textContent.trim()), prices: [...document.querySelectorAll('.order-info__total')].map((t) => t.textContent.replace(/\s+/g, ' ').trim()) }));
  check(orders.label === 'Status', 'filtro de pedidos tem rótulo "Status"');
  check(orders.chips.join(',') === 'Pendente,Em preparo', 'rótulos de status em português', orders.chips.join(','));
  check(orders.prices.every((p) => p.includes('R$') && p.includes(',')), 'preços com formatPrice', orders.prices.join(' | '));
  await page.selectOption('#statusFilter', 'completed');
  await page.waitForTimeout(200);
  check(await page.locator('.empty-state').count() === 1, 'filtro sem resultado mostra EmptyState');
  check(errors.length === 0, 'sem erros de página', errors.join(' | '));
  await ctx.close();
}
await browser.close();
console.log(failures ? `FALHAS: ${failures}` : 'ADMIN OK');
