/* global process */
// §13.7: peso da Home em 390 até networkidle sem rolar, LCP e imagens servidas.
// Confere (SPEC-material §1.1, item 9, e §13.7): a Home em 390 transfere ≤ 1,5 MB, com a Roboto; a
// foto do hero (fetchpriority="high") é a LCP da Home; toda <img> tem width e height.
import { chromium } from 'playwright';
const BASE = 'http://localhost:4173/smash-burguer/';
const LIMITE = 1.5 * 1024 * 1024;
let failures = 0;
const check = (c, l, x = '') => { if (!c) failures++; console.log(`${c ? '  ✓' : '  ✗'} ${l}${x ? ` — ${x}` : ''}`); };
const browser = await chromium.launch();
for (const [w, route] of [[390, '#/'], [1440, '#/'], [390, '#/menu']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, deviceScaleFactor: w === 390 ? 3 : 1 });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  let bytes = 0;
  const byType = {};
  const imgs = [];
  const fontes = [];
  cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength; });
  cdp.on('Network.responseReceived', (e) => {
    const t = e.type;
    byType[t] = (byType[t] || 0) + 1;
    if (t === 'Image') imgs.push(`${e.response.url.split('/').pop()} (${e.response.mimeType})`);
    if (t === 'Font') fontes.push(e.response.url.split('/').pop());
  });
  await page.addInitScript(() => {
    window.__lcp = [];
    new PerformanceObserver((list) => { for (const e of list.getEntries()) window.__lcp.push(e); }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const last = window.__lcp.at(-1);
    const el = last?.element;
    return {
      lcp: el ? `${el.tagName} ${el.currentSrc?.split('/').pop() ?? ''} fetchpriority=${el.getAttribute('fetchpriority')}` : 'n/a',
      lcpHero: !!el && el.tagName === 'IMG' && el.matches('.m3-hero__img') && el.getAttribute('fetchpriority') === 'high',
      lcpMs: last ? Math.round(last.startTime) : null,
      semDimensoes: [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).map((i) => i.src),
      lazy: [...document.querySelectorAll('img')].map((i) => `${i.currentSrc.split('/').pop() || '(não carregada)'}:${i.loading}${i.getAttribute('fetchpriority') ? ':' + i.getAttribute('fetchpriority') : ''}`),
    };
  });
  console.log(`--- ${route} ${w}px (DPR ${w === 390 ? 3 : 1}): ${(bytes / 1024 / 1024).toFixed(2)} MB transferidos`);
  console.log('    imagens baixadas:', imgs.join(', ') || 'nenhuma');
  console.log('    fontes:', fontes.join(', ') || 'nenhuma');
  console.log('    LCP:', info.lcp, `${info.lcpMs}ms`);
  console.log('    img sem width/height:', info.semDimensoes.length ? info.semDimensoes : 'nenhuma');
  if (route === '#/') console.log('    imgs:', info.lazy.slice(0, 6).join(' | '));
  check(info.semDimensoes.length === 0, `${route} ${w}: toda <img> com width e height`);
  if (route === '#/') {
    check(info.lcpHero, `${route} ${w}: a foto do hero (fetchpriority="high") é a LCP`, info.lcp);
    check(imgs.every((i) => /image\/(webp|svg)/.test(i)), `${route} ${w}: as imagens servidas são WebP`, imgs.filter((i) => !/image\/(webp|svg)/.test(i)).join(', '));
  }
  if (route === '#/' && w === 390) {
    check(bytes <= LIMITE && fontes.some((f) => /roboto/i.test(f)), 'Home em 390: ≤ 1,5 MB transferidos, com a Roboto', `${(bytes / 1024 / 1024).toFixed(2)} MB`);
  }
  await ctx.close();
}
await browser.close();
console.log(failures ? `FALHAS: ${failures}` : 'PERF OK');
process.exit(failures ? 1 : 0);
