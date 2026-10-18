// §13.7: peso da Home em 390 até networkidle sem rolar, LCP e imagens servidas.
import { chromium } from 'playwright';
const BASE = 'http://localhost:4173/smash-burguer/';
const browser = await chromium.launch();
for (const [w, route] of [[390, '#/'], [1440, '#/'], [390, '#/menu']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, deviceScaleFactor: w === 390 ? 3 : 1 });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  let bytes = 0;
  const byType = {};
  const imgs = [];
  cdp.on('Network.loadingFinished', (e) => { bytes += e.encodedDataLength; });
  cdp.on('Network.responseReceived', (e) => {
    const t = e.type;
    byType[t] = (byType[t] || 0) + 1;
    if (t === 'Image') imgs.push(`${e.response.url.split('/').pop()} (${e.response.mimeType})`);
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
      lcpMs: last ? Math.round(last.startTime) : null,
      semDimensoes: [...document.querySelectorAll('img')].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).map((i) => i.src),
      lazy: [...document.querySelectorAll('img')].map((i) => `${i.currentSrc.split('/').pop() || '(não carregada)'}:${i.loading}${i.getAttribute('fetchpriority') ? ':' + i.getAttribute('fetchpriority') : ''}`),
    };
  });
  console.log(`--- ${route} ${w}px (DPR ${w === 390 ? 3 : 1}): ${(bytes / 1024 / 1024).toFixed(2)} MB transferidos`);
  console.log('    imagens baixadas:', imgs.join(', ') || 'nenhuma');
  console.log('    LCP:', info.lcp, `${info.lcpMs}ms`);
  console.log('    img sem width/height:', info.semDimensoes.length ? info.semDimensoes : 'nenhuma');
  if (route === '#/') console.log('    imgs:', info.lazy.slice(0, 6).join(' | '));
  await ctx.close();
}
await browser.close();
