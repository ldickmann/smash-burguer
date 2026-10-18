// §13.6 Micro-interações: flip, odômetro, tilt e montador, normal e com movimento reduzido.
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
  await page.goto(BASE + '#/menu');
  await page.waitForLoadState('networkidle');

  // Tilt
  const card = page.locator('.product-card').first();
  const box = await card.boundingBox();
  await page.mouse.move(box.x + 6, box.y + 6);
  await page.waitForTimeout(250);
  const tilt = await card.evaluate((el) => {
    const t = getComputedStyle(el).transform;
    if (t === 'none') return { t, rx: 0, ry: 0 };
    // ângulos aproximados a partir da matriz (sem a perspectiva)
    return { t: t.slice(0, 18), rx: Math.abs(parseFloat(el.style.getPropertyValue('--rx')) || 0), ry: Math.abs(parseFloat(el.style.getPropertyValue('--ry')) || 0), listener: el.dataset.tilt };
  });
  if (reduce) check(tilt.t === 'none', 'tilt: transform none com movimento reduzido');
  else check(tilt.rx <= 4 && tilt.ry <= 4 && tilt.rx > 3, 'tilt: ponteiro no canto, ângulo ≤ 4° em cada eixo', `rx=${tilt.rx}° ry=${tilt.ry}°`);
  await page.mouse.move(700, 880);

  // Montador
  await page.getByRole('button', { name: 'Adicionar Cheese Bacon' }).click();
  await page.waitForTimeout(500);
  await page.locator('dialog[open] label', { hasText: 'Tomate' }).click();
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

  // Flip
  await page.waitForTimeout(120);
  const mid = await page.evaluate(() => {
    const inner = document.querySelector('.add-btn__inner');
    const t = getComputedStyle(inner).transform;
    const deg = t === 'none' ? 0 : Math.abs(Math.atan2(new DOMMatrix(t).m23, new DOMMatrix(t).m22) * 180 / Math.PI);
    return { t: t === 'none' ? 'none' : 'matrix', deg, back: getComputedStyle(document.querySelector('.add-btn__face--back')).opacity, front: getComputedStyle(document.querySelector('.add-btn__face--front')).opacity };
  });
  if (reduce) check(mid.t === 'none' && Number(mid.back) > 0, 'flip: sem rotação, as faces trocam por opacidade', `back=${mid.back} front=${mid.front}`);
  else check(mid.deg > 0 && mid.deg < 180, 'flip: transform intermediário durante o giro', `${mid.deg.toFixed(1)}°`);
  await page.screenshot({ path: `./shots/final/micro-flip-${tag}.png`, clip: await page.locator('.product-card').first().boundingBox() });
  await page.waitForTimeout(1700);
  const end = await page.evaluate(() => getComputedStyle(document.querySelector('.add-btn__inner')).transform);
  check(end === 'none', 'flip: volta a none depois de ~1,7 s', end);

  // Odômetro 9 → 10
  await page.evaluate(() => {
    const cart = document.querySelector('#app').__vue_app__.config.globalProperties.$pinia._s.get('cart');
    cart.clearCart();
    cart.addItem({ name: 'Coca', unitPrice: 1, quantity: 9 });
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const cart = document.querySelector('#app').__vue_app__.config.globalProperties.$pinia._s.get('cart');
    cart.addItem({ name: 'Coca', unitPrice: 1, quantity: 1 });
  });
  await page.waitForTimeout(90);
  const odo = await page.evaluate(() => ({
    animating: [...document.querySelectorAll('.odo__digit')].filter((d) => /enter-active|leave-active/.test(d.className)).map((d) => `${d.textContent}:${getComputedStyle(d).transform === 'none' ? 'none' : 'matrix'}`),
    windows: [...document.querySelectorAll('.odo__window')].filter((w) => w.querySelector('[class*="enter-active"]')).length,
  }));
  await page.screenshot({ path: `./shots/final/micro-odometro-${tag}.png`, clip: { x: 1000, y: 0, width: 440, height: 64 } });
  await page.waitForTimeout(500);
  const label = await page.evaluate(() => document.querySelector('.cart-badge').getAttribute('aria-label'));
  check(odo.windows === 2, 'odômetro: de 9 para 10, dois dígitos animam', odo.animating.join(' '));
  check(label === 'Carrinho, 10 itens', 'texto final do link "Carrinho, 10 itens"', label);
  if (reduce) check(odo.animating.every((a) => a.endsWith(':none')), 'odômetro: crossfade sem rotação com movimento reduzido');
  results[`odo-${tag}`] = label;
  await ctx.close();
}

// Toque: nenhum transform no card e nenhum listener
const tctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const tp = await tctx.newPage();
await tp.goto(BASE + '#/menu');
await tp.waitForLoadState('networkidle');
const touch = await tp.locator('.product-card').first().evaluate((el) => ({ t: getComputedStyle(el).transform, listener: el.dataset.tilt ?? 'nenhum' }));
check(touch.t === 'none' && touch.listener === 'nenhum', 'tilt com toque emulado: nenhum transform e nenhum listener', JSON.stringify(touch));
await tctx.close();

check(results['montador-normal'] === results['montador-reduzido'] && results['odo-normal'] === results['odo-reduzido'], 'movimento reduzido: conteúdo e resultado iguais (legenda, contagem, rótulo)', `${results['montador-reduzido']} | ${results['odo-reduzido']}`);
await browser.close();
console.log(failures ? `FALHAS: ${failures}` : 'MICRO-INTERAÇÕES OK');
