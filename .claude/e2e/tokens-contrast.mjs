// §13.7: contraste dos pares de tokens de _tokens.scss usados como texto/fundo (§2.2).
import fs from 'node:fs';
const src = fs.readFileSync('/home/user/smash-burguer/src/assets/styles/base/_tokens.scss', 'utf8');
const tokens = {};
for (const m of src.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) tokens[m[1]] = m[2].trim();
const resolve = (name) => { let v = tokens[name]; while (v?.startsWith('var(')) v = tokens[v.slice(6, -1)]; return v; };
const parse = (v) => {
  if (v.startsWith('#')) { const h = v.slice(1); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).concat(1); }
  const n = v.match(/[\d.]+/g).map(Number); return [n[0], n[1], n[2], n[3] ?? 1];
};
const over = (fg, bg) => fg.slice(0, 3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3])).concat(1);
const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const color = (name, base = 'color-surface-2') => { const c = parse(resolve(name)); return c[3] < 1 ? over(c, color(base)) : c; };

// [texto/primeiro plano, fundo, mínimo, onde, fundo sob o translúcido]
const PAIRS = [
  ['color-ink', 'color-bg', 4.5, 'texto principal na página'],
  ['color-ink', 'color-surface-sunken', 4.5, 'título do rodapé'],
  ['color-ink-muted', 'color-surface-sunken', 4.5, 'texto do rodapé'],
  ['color-ink', 'color-surface-1', 4.5, 'sidebar/header admin, menu mobile'],
  ['color-ink', 'color-surface-2', 4.5, 'cards, diálogos'],
  ['color-ink', 'color-surface-3', 4.5, 'toast, menus'],
  ['color-ink-muted', 'color-bg', 4.5, 'texto secundário'],
  ['color-ink-muted', 'color-surface-1', 4.5, 'link inativo da sidebar/menu'],
  ['color-ink-muted', 'color-surface-2', 4.5, 'descrições nos cards'],
  ['color-ink-muted', 'color-surface-3', 4.5, 'itens do menu de perfil'],
  ['color-ink-subtle', 'color-surface-2', 4.5, 'placeholder/metadado'],
  ['color-ink-subtle', 'color-input', 4.5, 'placeholder no campo'],
  ['color-ink', 'color-input', 4.5, 'texto do campo'],
  ['color-accent-ink', 'color-accent', 4.5, 'texto do botão primário'],
  ['color-accent-ink', 'color-accent-hover', 4.5, 'primário no hover'],
  ['color-accent-ink', 'color-accent-pressed', 4.5, 'primário pressionado'],
  ['color-accent-ink', 'color-success', 4.5, 'face "Adicionado ✓"'],
  ['color-ink', 'color-accent-soft', 4.5, 'item selecionado (sobre surface-2)'],
  ['color-ink', 'color-danger-soft', 4.5, 'banner de erro (sobre surface-2)'],
  ['color-danger', 'color-bg', 4.5, 'erro de campo / Remover'],
  ['color-danger', 'color-surface-2', 4.5, 'erro dentro do painel'],
  ['color-danger', 'color-input', 4.5, 'erro sobre o campo'],
  ['color-danger', 'color-danger-soft', 4.5, 'botão danger no hover (sobre surface-2)'],
  ['color-success', 'color-surface-2', 4.5, 'ícone/texto de sucesso'],
  ['color-success', 'color-surface-3', 4.5, 'ícone no toast'],
  ['color-warning', 'color-surface-2', 4.5, 'aviso sem endereço'],
  ['color-warning', 'color-warning-soft', 4.5, 'chip Pendente'],
  ['color-info', 'color-info-soft', 4.5, 'chip Em preparo / Recebido'],
  ['color-success', 'color-success-soft', 4.5, 'chip Concluído'],
  ['color-danger-solid-ink', 'color-danger-solid', 4.5, 'ação destrutiva sólida'],
  ['color-ink', 'color-hover-ghost', 4.5, 'botão ghost no hover (sobre surface-2)'],
  ['color-accent', 'color-bg', 3, 'badge/aba selecionada como forma (não texto)'],
  ['color-border-strong', 'color-surface-2', 3, 'borda de campo/checkbox (limite de componente)'],
  ['color-border-strong', 'color-bg', 3, 'borda do botão secundário'],
  ['color-border-strong', 'color-input', 3, 'borda do campo contra o próprio fundo'],
  ['color-focus', 'color-bg', 3, 'anel de foco'],
  ['color-focus', 'color-surface-2', 3, 'anel de foco em card'],
  ['color-focus', 'color-surface-3', 3, 'anel de foco em toast/menu'],
  ['color-accent', 'color-surface-2', 3, 'barra/indicador ativo'],
];
let fails = 0;
for (const [fg, bg, min, where] of PAIRS) {
  const r = ratio(color(fg, bg.endsWith('soft') || bg === 'color-hover-ghost' ? 'color-surface-2' : bg), color(bg));
  const ok = r >= min;
  if (!ok) fails++;
  console.log(`${ok ? '✓' : '✗'} ${fg.padEnd(24)} / ${bg.padEnd(22)} ${r.toFixed(2).padStart(5)}:1 (mín. ${min})  ${where}`);
}
console.log(`\nInformativo (isento): ink-disabled / surface-4 = ${ratio(color('color-ink-disabled'), color('color-surface-4')).toFixed(2)}:1`);
console.log(fails ? `FALHAS: ${fails}` : `TODOS OS ${PAIRS.length} PARES OK`);
