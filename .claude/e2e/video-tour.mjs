/* global process, Buffer */
// Grava um passeio pelo site (celular 390 e desktop 1440) para ver sem rodar localmente.
// uso: node video-tour.mjs <celular|desktop>
import { chromium } from 'playwright';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const BASE = 'http://localhost:4173/smash-burguer/';
const MODE = process.argv[2] || 'celular';
const OUT = './video';
fs.mkdirSync(`${OUT}/${MODE}`, { recursive: true });

// Conta fictícia já cadastrada e admin fictício (o createAdmin.html faz o mesmo papel)
const USER = { firstName: 'Maria', lastName: 'Silva', email: 'maria@exemplo.com', password: 'senha123', dateOfBirth: '1990-05-10', phone: '47999999999', CEP: '88370000', address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' } };
const ADMIN = { firstName: 'Ana', lastName: 'Costa', email: 'admin@exemplo.com', password: 'painel123', role: 'admin' };

// Indicador de toque/cursor e legenda: só para o vídeo, não fazem parte do site
const OVERLAY = () => {
  const style = document.createElement('style');
  style.textContent = `
    #__tap { position: fixed; z-index: 2147483647; width: 28px; height: 28px; margin: -14px 0 0 -14px; border-radius: 50%;
      background: rgba(255,255,255,.35); border: 2px solid rgba(255,255,255,.9); pointer-events: none; opacity: 0; transition: opacity .25s, transform .25s; }
    #__tap.on { opacity: 1; transform: scale(1.25); }
    #__cap { position: fixed; z-index: 2147483646; left: 50%; bottom: 112px; transform: translateX(-50%); max-width: 90vw; padding: 8px 16px;
      border-radius: 999px; background: rgba(0,0,0,.78); color: #fff; font: 600 17px/1.3 system-ui, sans-serif; pointer-events: none;
      opacity: 0; transition: opacity .3s; white-space: nowrap; }
    #__cap.on { opacity: 1; }`;
  const add = () => {
    if (document.getElementById('__tap')) return;
    document.head.appendChild(style);
    const tap = Object.assign(document.createElement('div'), { id: '__tap' });
    const cap = Object.assign(document.createElement('div'), { id: '__cap' });
    document.body.append(tap, cap);
    let t;
    const show = (e, keep) => {
      tap.style.left = `${e.clientX}px`; tap.style.top = `${e.clientY}px`;
      tap.classList.add('on'); clearTimeout(t);
      if (!keep) t = setTimeout(() => tap.classList.remove('on'), 450);
    };
    addEventListener('pointerdown', (e) => show(e), true);
    addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') { tap.style.left = `${e.clientX}px`; tap.style.top = `${e.clientY}px`; tap.classList.add('on'); tap.style.transform = 'scale(.6)'; } }, true);
    window.__caption = (text) => { cap.textContent = text; cap.classList.add('on'); clearTimeout(window.__capT); window.__capT = setTimeout(() => cap.classList.remove('on'), 2600); };
  };
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', add); else add();
};

const isPhone = MODE === 'celular';
const browser = await chromium.launch();
const VIEW = isPhone ? { width: 390, height: 844 } : { width: 1440, height: 900 };
const SCALE = isPhone ? 2 : 1;
const ctx = await browser.newContext(isPhone
  ? { viewport: VIEW, deviceScaleFactor: SCALE, isMobile: true, hasTouch: true }
  : { viewport: VIEW });
await ctx.addInitScript(([u, a]) => {
  if (sessionStorage.getItem('__seed')) return;
  localStorage.clear();
  localStorage.setItem('smash-burger:account', u);
  localStorage.setItem('admin', a);
  sessionStorage.setItem('__seed', '1');
}, [JSON.stringify(USER), JSON.stringify(ADMIN)]);
await ctx.addInitScript(OVERLAY);
const page = await ctx.newPage();

const wait = (ms) => page.waitForTimeout(ms);
const caption = (text) => page.evaluate((t) => window.__caption?.(t), text);
const press = async (locator) => {
  await locator.scrollIntoViewIfNeeded();
  await wait(250);
  if (isPhone) await locator.tap(); else {
    const b = await locator.boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 18 });
    await wait(150);
    await locator.click();
  }
};
const scrollBy = async (dy, pause = 900) => { await page.evaluate((y) => window.scrollBy({ top: y, behavior: 'smooth' }), dy); await wait(pause); };
const scrollTour = async (step, pause) => {
  for (let i = 0; i < 30; i++) {
    const done = await page.evaluate(() => innerHeight + scrollY >= document.documentElement.scrollHeight - 4);
    if (done) break;
    await scrollBy(step, pause);
  }
  await wait(600);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await wait(1200);
};
const go = async (hash) => { await page.evaluate((h) => { location.hash = h; }, hash); await wait(700); await page.waitForLoadState('networkidle'); };

await page.goto(BASE + '#/');
await page.waitForLoadState('networkidle');
await wait(800);

// Gravação: capturas em alta resolução (o gravador do Playwright ignora a densidade 2x)
// enviadas ao ffmpeg, que usa o horário de chegada de cada quadro e gera 30 fps constantes
const MP4 = `${OUT}/smash-burger-${MODE}.mp4`;
const ffmpeg = spawn('ffmpeg', ['-y', '-v', 'error', '-use_wallclock_as_timestamps', '1', '-f', 'image2pipe', '-c:v', 'mjpeg', '-i', '-',
  '-vf', 'fps=30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', MP4], { stdio: ['pipe', 'inherit', 'inherit'] });
const cdp = await ctx.newCDPSession(page);
let recording = true;
let frameCount = 0;
const recorder = (async () => {
  while (recording) {
    try {
      const v = (await cdp.send('Page.getLayoutMetrics')).cssVisualViewport;
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 82, optimizeForSpeed: true, clip: { x: v.pageX, y: v.pageY, width: VIEW.width, height: VIEW.height, scale: SCALE } });
      if (!ffmpeg.stdin.write(Buffer.from(data, 'base64'))) await new Promise((r) => ffmpeg.stdin.once('drain', r));
      frameCount++;
    } catch { /* quadro perdido durante navegação */ }
  }
})();
const startedAt = Date.now();

if (isPhone) {
  // 1. Home
  await caption('Home');
  await wait(1800);
  await scrollTour(520, 1000);

  // 2. Menu mobile → Cardápio
  await caption('Menu do celular');
  await press(page.getByRole('button', { name: 'Menu principal' }));
  await wait(1300);
  await press(page.getByRole('link', { name: 'Cardápio' }).first());
  await wait(1200);
  await caption('Cardápio');
  await scrollBy(420, 1200);
  await press(page.getByRole('button', { name: 'Bebidas', exact: true }));
  await wait(1100);
  await press(page.getByRole('button', { name: 'Sobremesas', exact: true }));
  await wait(1100);
  await press(page.getByRole('button', { name: 'Hambúrgueres', exact: true }));
  await wait(1000);

  // 3. Personalizar o burger (montador 3D)
  await press(page.getByRole('button', { name: 'Adicionar Cheese Bacon' }));
  await wait(900);
  await caption('Personalizar: o burger se monta');
  await wait(1500);
  await press(page.locator('dialog[open] label', { hasText: 'Tomate' }));
  await wait(1100);
  await press(page.getByRole('button', { name: 'Aumentar Bacon' }));
  await wait(900);
  await press(page.getByRole('button', { name: 'Aumentar Bacon' }));
  await wait(900);
  await press(page.getByRole('button', { name: 'Aumentar Ovo' }));
  await wait(1300);
  await page.locator('dialog[open] textarea').scrollIntoViewIfNeeded();
  await wait(500);
  await page.locator('dialog[open] textarea').tap();
  await page.keyboard.type('Bem passado', { delay: 90 });
  await wait(700);
  await caption('Adicionar: botão gira e o contador do carrinho anima');
  await press(page.locator('dialog[open] .dialog__footer button'));
  await wait(2400);

  // 4. Bebida com quantidade
  await press(page.getByRole('button', { name: 'Bebidas', exact: true }));
  await wait(900);
  await press(page.getByRole('button', { name: 'Adicionar Coca Cola Lata' }));
  await wait(1000);
  await press(page.getByRole('button', { name: /^Aumentar/ }).first());
  await wait(900);
  await press(page.locator('dialog[open] .dialog__footer button'));
  await wait(2000);

  // 5. Carrinho: quantidade, remover e desfazer
  await press(page.locator('.cart-badge'));
  await wait(1200);
  await caption('Carrinho');
  await wait(1400);
  await press(page.getByRole('button', { name: 'Aumentar Cheese Bacon' }));
  await wait(1100);
  await press(page.getByRole('button', { name: 'Remover Coca Cola Lata' }));
  await wait(1200);
  await caption('Remover tem "Desfazer"');
  await press(page.getByRole('button', { name: 'Desfazer' }));
  await wait(1400);
  await scrollBy(700, 1300);

  // 6. Entrar e finalizar
  await press(page.getByRole('link', { name: 'Entrar e finalizar' }).or(page.getByRole('button', { name: 'Entrar e finalizar' })));
  await wait(1200);
  await caption('Login (volta para o pagamento)');
  await press(page.locator('#email'));
  await page.keyboard.type(USER.email, { delay: 55 });
  await press(page.locator('#password'));
  await page.keyboard.type(USER.password, { delay: 70 });
  await wait(400);
  await press(page.getByRole('button', { name: 'Entrar', exact: true }));
  await wait(2200);

  // 7. Pagamento → confirmação
  await caption('Pagamento');
  await wait(1500);
  await scrollBy(450, 1200);
  await press(page.locator('label', { hasText: 'PIX' }));
  await wait(1000);
  await scrollBy(900, 1300);
  await press(page.getByRole('button', { name: /^Confirmar pedido/ }));
  await wait(2400);
  await caption('Pedido confirmado');
  await wait(2000);
  await scrollBy(450, 1600);
  await wait(800);
} else {
  // 1. Home
  await caption('Home');
  await page.mouse.move(700, 450, { steps: 10 });
  await wait(1800);
  await scrollTour(450, 950);

  // 2. Cardápio: tilt no hover, personalizar e flip
  await press(page.getByRole('link', { name: 'Cardápio' }).first());
  await wait(1200);
  await caption('Cardápio: o card inclina com o mouse');
  await scrollBy(380, 1100);
  const card = page.locator('.product-card').nth(1);
  const b = await card.boundingBox();
  for (const [x, y] of [[0.15, 0.15], [0.85, 0.2], [0.85, 0.85], [0.15, 0.8], [0.5, 0.5]]) {
    await page.mouse.move(b.x + b.width * x, b.y + b.height * y, { steps: 25 });
    await wait(350);
  }
  await press(page.getByRole('button', { name: 'Adicionar Smash Burger' }));
  await wait(1000);
  await caption('Personalizar: o burger se monta');
  await wait(1400);
  await press(page.locator('dialog[open] label', { hasText: 'Alface' }));
  await wait(1000);
  await press(page.getByRole('button', { name: 'Aumentar Bacon' }));
  await wait(900);
  await press(page.getByRole('button', { name: 'Aumentar Queijo Cheddar' }));
  await wait(1300);
  await press(page.locator('dialog[open] .dialog__footer button'));
  await wait(2400);

  // 3. Carrinho
  await press(page.locator('.cart-badge'));
  await wait(1300);
  await caption('Carrinho');
  await wait(2200);

  // 4. Admin
  await go('#/admin/login');
  await caption('Painel administrativo');
  await wait(1200);
  await press(page.locator('#email'));
  await page.keyboard.type(ADMIN.email, { delay: 50 });
  await press(page.locator('#password'));
  await page.keyboard.type(ADMIN.password, { delay: 60 });
  await press(page.getByRole('button', { name: 'Entrar', exact: true }));
  await wait(2600);
  for (const name of ['Gestão de Produtos', 'Gestão de Pedidos', 'Relatórios de Vendas']) {
    await press(page.getByRole('link', { name }));
    await wait(1800);
  }
  await press(page.getByRole('link', { name: 'Gestão de Produtos' }));
  await wait(900);
  await press(page.getByRole('button', { name: 'Novo produto' }));
  await wait(1800);
  await page.keyboard.press('Escape');
  await wait(1200);
}

await wait(600);
recording = false;
await recorder;
ffmpeg.stdin.end();
await new Promise((r) => ffmpeg.on('close', r));
const secs = (Date.now() - startedAt) / 1000;
console.log(`VIDEO ${MP4} — ${secs.toFixed(1)} s, ${frameCount} quadros (${(frameCount / secs).toFixed(1)} fps capturados)`);
await ctx.close();
await browser.close();
