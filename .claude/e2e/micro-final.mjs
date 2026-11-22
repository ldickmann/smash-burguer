// §13.6 Micro-interações, normal e com movimento reduzido. Na Home (SPEC-material §7): a prensa, a
// troca de forma, o chevron, a folha e o retorno "Adicionado". No Cardápio (etapa 6): o card sem tilt, o
// check do checkbox dos ingredientes, o montador, o retorno "Adicionado" no card de origem e o badge do
// FAB (§7.5). O tilt e o flip saíram com o ProductCard do Cardápio; o odômetro, com o CartBadge (§7.8).
import { chromium } from 'playwright';
const BASE = 'http://localhost:4173/smash-burguer/';
let failures = 0;
const check = (c, l, x = '') => { if (!c) failures++; console.log(`${c ? '  ✓' : '  ✗'} ${l}${x ? ` — ${x}` : ''}`); };
const browser = await chromium.launch();
const results = {};

for (const reduce of [false, true]) {
  const tag = reduce ? 'reduzido' : 'normal';
  console.log(`=== movimento ${tag}`);
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: reduce ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();

  // ---------- Home (SPEC-material §7 e §13.6): prensa, troca de forma, chevron, folha e retorno ----------
  await page.goto(BASE + '#/');
  await page.locator('.m3-prensa__disco').waitFor();
  const prensa0 = await page.evaluate(() => {
    const bola = document.querySelector('.m3-prensa__bola');
    const disco = document.querySelector('.m3-prensa__disco');
    return { bolaCaixa: bola.getClientRects().length > 0, bolaAnim: bola.getAnimations().map((a) => a.animationName), discoT: getComputedStyle(disco).transform, discoO: getComputedStyle(disco).opacity };
  });
  await page.waitForTimeout(1200);
  // Com fill-mode both, o Chrome mostra o "none" do último quadro como a matriz identidade
  const prensa1 = await page.evaluate(() => {
    const t = getComputedStyle(document.querySelector('.m3-prensa__disco')).transform;
    return { bolaO: getComputedStyle(document.querySelector('.m3-prensa__bola')).opacity, discoT: t, discoNone: t === 'none' || new DOMMatrix(t).isIdentity, discoO: getComputedStyle(document.querySelector('.m3-prensa__disco')).opacity };
  });
  if (reduce) check(!prensa0.bolaCaixa && prensa0.discoT === 'none' && prensa0.discoO === '1', 'prensa: a bola sem caixa e o disco parado (none, opacidade 1) desde o início', JSON.stringify(prensa0));
  else check(prensa0.bolaCaixa && prensa0.bolaAnim.some((n) => n.startsWith('m3-prensa-bola')) && prensa1.bolaO === '0' && prensa1.discoNone && prensa1.discoO === '1', 'prensa: a bola anima e some, e o disco termina em none', JSON.stringify({ prensa0, prensa1 }));

  // Troca de forma: no :active da frente do split (filled), o ::after aparece e o canto aperta
  const frente = page.getByRole('button', { name: 'Adicionar Cheese Bacon', exact: true });
  await frente.scrollIntoViewIfNeeded();
  const forma = (el) => ({ raio: parseFloat(getComputedStyle(el).borderTopLeftRadius), depois: getComputedStyle(el, '::after').opacity, transicao: getComputedStyle(el).transitionProperty });
  const repouso = await frente.evaluate(forma);
  const caixa = await frente.boundingBox();
  await page.mouse.move(caixa.x + caixa.width / 2, caixa.y + caixa.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(250);
  const apertado = await frente.evaluate(forma);
  await page.mouse.move(5, 5);
  await page.mouse.up();
  check(apertado.depois === '1' && apertado.raio < repouso.raio && !/border-radius/.test(`${repouso.transicao},${apertado.transicao}`), 'troca de forma: ::after com opacidade 1 e canto apertado no :active, sem transição de border-radius', JSON.stringify({ repouso, apertado }));

  // Chevron e folha: a metade de trás do destaque
  const tras = page.getByRole('button', { name: 'Ingredientes de Smash Burger', exact: true });
  await tras.scrollIntoViewIfNeeded();
  await tras.click();
  await page.waitForTimeout(40);
  const folhaT = await page.evaluate(() => getComputedStyle(document.querySelector('.m3-cartao--destaque .m3-folha')).transform);
  await page.waitForTimeout(600);
  const chevron = await page.evaluate(() => {
    const b = document.querySelector('.m3-cartao--destaque .m3-dividido__tras');
    const t = getComputedStyle(b.querySelector('.m3-dividido__seta--baixo')).transform;
    return { expanded: b.getAttribute('aria-expanded'), t, deg: t === 'none' ? 0 : Math.round(Math.abs(Math.atan2(new DOMMatrix(t).b, new DOMMatrix(t).a) * 180 / Math.PI)), cima: getComputedStyle(b.querySelector('.m3-dividido__seta--cima')).opacity, folhaFim: getComputedStyle(document.querySelector('.m3-cartao--destaque .m3-folha')).transform };
  });
  if (reduce) {
    check(chevron.expanded === 'true' && chevron.t === 'none' && chevron.cima === '1', 'chevron: sem giro, o chevron para cima com opacidade 1', JSON.stringify(chevron));
    check(folhaT === 'none' && chevron.folhaFim === 'none', 'folha: entra só por opacidade', folhaT);
  } else {
    check(chevron.expanded === 'true' && chevron.deg === 180, 'chevron: giro de 180° com aria-expanded="true"', JSON.stringify(chevron));
    check(folhaT !== 'none' && chevron.folhaFim === 'none', 'folha: transform intermediário na entrada, termina em none', `${folhaT} → ${chevron.folhaFim}`);
  }
  await page.keyboard.press('Escape');

  // Retorno "Adicionado" pela Home: data-adicionado logo após confirmar e ausente depois de ~1,45 s
  await frente.click();
  await page.waitForTimeout(500);
  await page.locator('dialog[open] .dialog__footer button').click();
  await page.waitForTimeout(100);
  const retorno0 = await page.evaluate(() => ({ attr: document.activeElement.dataset.adicionado, check: getComputedStyle(document.activeElement.querySelector('.m3-dividido__check')).transform }));
  await page.waitForTimeout(1600);
  const retorno1 = await page.evaluate(() => document.querySelectorAll('[data-adicionado]').length);
  check(retorno0.attr === 'true' && retorno1 === 0, 'retorno: data-adicionado logo após confirmar e ausente depois de ~1,45 s', JSON.stringify({ retorno0, depois: retorno1 }));
  if (reduce) check(retorno0.check === 'none', 'retorno: o check sem escala com movimento reduzido', retorno0.check);
  results[`home-${tag}`] = `${chevron.expanded}|${retorno0.attr}|${retorno1}`;
  await page.evaluate(() => document.querySelector('#app').__vue_app__.config.globalProperties.$pinia._s.get('cart').clearCart());

  // ---------- Cardápio (etapa 6): card sem tilt, checkbox, montador, retorno e badge ----------
  // Carga nova: com só o hash mudando, a caixa do card seria medida antes da volta ao topo
  await page.goto('about:blank');
  await page.goto(BASE + '#/menu');
  await page.waitForLoadState('networkidle');

  // O card do M3 não reage a hover: sem tilt, sem transform e sem listener (SPEC-material §7.8)
  const card = page.locator('.m3-cartao').first();
  const box = await card.boundingBox();
  await page.mouse.move(box.x + 6, box.y + 6);
  await page.waitForTimeout(250);
  const semTilt = await card.evaluate((el) => ({ t: getComputedStyle(el).transform, listener: el.dataset.tilt ?? 'nenhum' }));
  check(semTilt.t === 'none' && semTilt.listener === 'nenhum', 'card do Cardápio: sem tilt no hover (transform none, nenhum listener)', JSON.stringify(semTilt));
  await page.mouse.move(700, 880);

  // Montador
  await page.getByRole('button', { name: 'Adicionar Cheese Bacon' }).click();
  await page.waitForTimeout(500);
  await page.locator('dialog[open] label', { hasText: 'Tomate' }).click();
  // Check do checkbox (desenho do Cardápio, §5.5.2): o desmarcado some por opacidade; com movimento,
  // fica também em scale(0); com movimento reduzido, nenhum transform. O marcado fica em none
  await page.waitForTimeout(400);
  const caixas = await page.evaluate(() => {
    const ler = (texto) => {
      const linha = [...document.querySelectorAll('dialog[open] .ingredients-list__label')].find((l) => l.querySelector('.ingredients-list__name').textContent.trim() === texto);
      const c = getComputedStyle(linha.querySelector('.ingredients-list__check'));
      return { t: c.transform, escala: c.transform === 'none' ? 1 : new DOMMatrix(c.transform).a, o: c.opacity, marcado: linha.querySelector('input').checked };
    };
    return { tomate: ler('Tomate'), queijo: ler('Queijo') };
  });
  check(!caixas.tomate.marcado && caixas.tomate.o === '0' && (reduce ? caixas.tomate.t === 'none' : caixas.tomate.escala === 0), `checkbox: o check do desmarcado some ${reduce ? 'só por opacidade' : 'com scale(0)'}`, JSON.stringify(caixas.tomate));
  check(caixas.queijo.marcado && caixas.queijo.o === '1' && caixas.queijo.t === 'none', 'checkbox: o check do marcado em opacidade 1 e transform none', JSON.stringify(caixas.queijo));
  await page.getByRole('button', { name: 'Aumentar Bacon' }).click();
  await page.getByRole('button', { name: 'Aumentar Ovo' }).click();
  await page.waitForTimeout(600);
  const stack = await page.evaluate(() => {
    const included = [...document.querySelectorAll('dialog .ingredients-list__checkbox')].filter((c) => c.checked).length;
    const adds = [...document.querySelectorAll('dialog .additionals-list .stepper__value')].reduce((s, o) => s + Number(o.textContent.trim()), 0);
    const layers = [...document.querySelectorAll('.burger-stack__layer')].filter((l) => l.dataset.part !== 'top');
    return { included, adds, layers: layers.length, legend: document.querySelector('.burger-stack__legend').textContent.trim(), transforms: [...new Set([...document.querySelectorAll('.burger-stack__layer, .burger-stack__scene, .burger-stack__slot')].map((l) => getComputedStyle(l).transform === 'none' ? 'none' : 'matrix'))] };
  });
  check(stack.layers === stack.included + stack.adds, 'montador: camadas = ingredientes incluídos + adicionais', `${stack.layers} = ${stack.included} + ${stack.adds}`);
  if (reduce) check(stack.transforms.length === 1 && stack.transforms[0] === 'none', 'montador: transform none com movimento reduzido', stack.transforms.join(','));
  results[`montador-${tag}`] = `${stack.layers}|${stack.legend}`;
  await page.screenshot({ path: `./shots/final/micro-montador-${tag}.png`, clip: await page.locator('dialog .customize__visual').boundingBox() });
  await page.locator('dialog[open] .dialog__footer button').click();

  // Retorno no Cardápio (§7.6): o foco volta à frente do split do card de origem, com "Adicionado"
  await page.waitForTimeout(100);
  const retornoMenu = await page.evaluate(() => ({ nome: document.activeElement.getAttribute('aria-label'), attr: document.activeElement.dataset.adicionado, check: getComputedStyle(document.activeElement.querySelector('.m3-dividido__check')).transform }));
  check(retornoMenu.nome === 'Adicionar Cheese Bacon' && retornoMenu.attr === 'true', 'retorno no Cardápio: foco na frente do split de origem, com data-adicionado', JSON.stringify(retornoMenu));
  if (reduce) check(retornoMenu.check === 'none', 'retorno no Cardápio: o check sem escala com movimento reduzido', retornoMenu.check);
  await page.screenshot({ path: `./shots/final/micro-adicionado-cardapio-${tag}.png`, clip: await page.locator('.m3-cartao').first().boundingBox() });
  await page.waitForTimeout(1600);
  const retornoFim = await page.evaluate(() => document.querySelectorAll('[data-adicionado]').length);
  check(retornoFim === 0, 'retorno no Cardápio: data-adicionado ausente depois de ~1,45 s', String(retornoFim));

  // Badge do FAB (SPEC-material §7.5): de 0 para 1 entra com escala (normal) ou só opacidade (reduzido)
  // A store do carrinho pela instância do Pinia no #app
  const cart = (acao) => page.evaluate((a) => {
    const store = document.querySelector('#app').__vue_app__.config.globalProperties.$pinia._s.get('cart');
    if (a === 'limpar') store.clearCart();
    else store.addItem({ name: 'Coca', unitPrice: 1, quantity: a });
  }, acao);
  await cart('limpar');
  await page.waitForTimeout(500);
  const empty = await page.evaluate(() => !document.querySelector('.m3-fab .m3-badge'));
  await cart(1);
  await page.waitForTimeout(40);
  const badge = await page.evaluate(() => {
    const b = document.querySelector('.m3-fab .m3-badge');
    return b && { entering: /m3-badge-enter-active/.test(b.className), t: getComputedStyle(b).transform };
  });
  await page.screenshot({ path: `./shots/final/micro-badge-${tag}.png`, clip: await page.locator('.m3-fab').boundingBox() });
  check(empty && badge?.entering, 'badge: some com o carrinho vazio e entra pela transição ao chegar o 1º item', JSON.stringify({ empty, badge }));
  if (reduce) check(badge?.t === 'none', 'badge: transform none com movimento reduzido', badge?.t);
  else check(badge && badge.t !== 'none', 'badge: escala na entrada com movimento', badge?.t);
  await page.waitForTimeout(500);
  const settled = await page.evaluate(() => getComputedStyle(document.querySelector('.m3-fab .m3-badge')).transform);
  check(settled === 'none', 'badge: termina sem transform', settled);
  await cart(9);
  await page.waitForTimeout(300);
  const label = await page.evaluate(() => { const f = document.querySelector('a.m3-fab'); return `${f.getAttribute('aria-label')} | ${f.querySelector('.m3-badge').textContent.trim()}`; });
  check(label === 'Carrinho, 10 itens | 10', 'nome final do FAB "Carrinho, 10 itens" e badge "10"', label);
  results[`badge-${tag}`] = label;
  await ctx.close();
}

// Toque: nenhum transform no card e nenhum listener
const tctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const tp = await tctx.newPage();
await tp.goto(BASE + '#/menu');
await tp.waitForLoadState('networkidle');
const touch = await tp.locator('.m3-cartao').first().evaluate((el) => ({ t: getComputedStyle(el).transform, listener: el.dataset.tilt ?? 'nenhum' }));
check(touch.t === 'none' && touch.listener === 'nenhum', 'card com toque emulado: nenhum transform e nenhum listener', JSON.stringify(touch));
await tctx.close();

check(results['montador-normal'] === results['montador-reduzido'] && results['badge-normal'] === results['badge-reduzido'] && results['home-normal'] === results['home-reduzido'], 'movimento reduzido: conteúdo e resultado iguais (legenda, contagem, rótulo, folha e retorno)', `${results['montador-reduzido']} | ${results['badge-reduzido']} | ${results['home-reduzido']}`);
await browser.close();
console.log(failures ? `FALHAS: ${failures}` : 'MICRO-INTERAÇÕES OK');
