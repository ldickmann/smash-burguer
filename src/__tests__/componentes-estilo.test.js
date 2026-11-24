// @vitest-environment node
// Estilo dos componentes base no M3 (docs/direcoes/desenho/componentes-base.md, §4 a §9): as parciais
// compiladas pelo sass-embedded, o mesmo compilador do build, e a do aviso também pelo <style scoped>
// do Vue (os :global() da posição e da reserva). Lidas pelo node:fs (no Vitest, um .scss importado com
// ?raw chega vazio); o alias @/ do Vite é resolvido por um importador. Mesmo padrão do admin-estilo.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { compileStyle } from 'vue/compiler-sfc';
import { beforeAll, describe, expect, it } from 'vitest';
import { PARES, PARES_COMPONENTES, lerTokens, medirPar } from '@/utils/contraste';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ESTILOS = `${SRC}assets/styles/`;
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

const PARCIAIS = {
  aviso: 'components/ui/_app-toast.scss',
  dialogo: 'components/ui/_base-dialog.scss',
  vazio: 'components/ui/_empty-state.scss',
  seletor: 'components/ui/_quantity-stepper.scss',
  botao: 'components/ui/_base-button.scss',
  carrinho: 'pages/_cart-page.scss',
  pagamento: 'pages/_payment.scss',
  perfil: 'pages/auth/_profile.scss',
  painel: 'layouts/_admin-layout.scss',
  movimento: 'base/_motion.scss',
};
const COMPONENTES = ['aviso', 'dialogo', 'vazio', 'seletor', 'botao'];
const DESDE_MD = '@media (min-width: 768px)';
const DESDE_LG = '@media (min-width: 1024px)';
const ABAIXO_LG = '@media (max-width: 1023.98px)';
const MOVIMENTO_OK = '@media (prefers-reduced-motion: no-preference)';
const MAIS_CONTRASTE = '@media (prefers-contrast: more)';

const css = {};
beforeAll(() => {
  const sass = initCompiler();
  try {
    for (const [nome, caminho] of Object.entries(PARCIAIS)) {
      try {
        css[nome] = sass.compile(`${ESTILOS}${caminho}`, { importers: [ALIAS] }).css;
      } catch {
        css[nome] = '';
      }
    }
  } finally {
    sass.dispose();
  }
});

// Separa o CSS em blocos @media (condição e corpo) e o resto, que vale sempre
function blocos(texto) {
  const lista = [];
  let fora = '';
  let i = 0;
  while (i < texto.length) {
    const at = texto.indexOf('@', i);
    if (at < 0) {
      fora += texto.slice(i);
      break;
    }
    fora += texto.slice(i, at);
    const abre = texto.indexOf('{', at);
    let fim = abre + 1;
    for (let nivel = 1; nivel > 0; fim++) {
      if (texto[fim] === '{') nivel++;
      else if (texto[fim] === '}') nivel--;
    }
    lista.push([texto.slice(at, abre).trim(), texto.slice(abre + 1, fim - 1)]);
    i = fim;
  }
  return { fora, lista };
}

// Valor de uma propriedade num seletor exato: fora dos @media, ou só dentro da condição pedida
function valor(texto, seletor, propriedade, condicao) {
  const { fora, lista } = blocos(texto);
  const corpos = condicao ? lista.filter(([c]) => c === condicao).map(([, corpo]) => corpo) : [fora];
  let achado;
  for (const corpo of corpos) {
    for (const [, seletores, declaracoes] of corpo.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!seletores.split(/,(?![^(]*\))/).map((s) => s.trim().replace(/\s+/g, ' ')).includes(seletor)) continue;
      for (const declaracao of declaracoes.split(';')) {
        const [nome, ...resto] = declaracao.split(':');
        if (nome.trim() === propriedade) achado = resto.join(':').trim();
      }
    }
  }
  return achado;
}

const dentro = (texto, condicao) =>
  blocos(texto)
    .lista.filter(([c]) => c === condicao)
    .map(([, corpo]) => corpo)
    .join('\n');

const escopado = (texto, filename) => {
  const { code, errors } = compileStyle({ source: texto, filename, id: 'data-v-teste', scoped: true });
  expect(errors).toEqual([]);
  return code;
};

// As condições de 1, 2 e 3 avisos na tela (uma lista ou as duas)
const AVISOS = [
  [1, [':has(.toast-region .toast)']],
  [2, [':has(.toast-region .toast + .toast)', ':has(.toast-region__list--status .toast):has(.toast-region__list--alert .toast)']],
  [
    3,
    [
      ':has(.toast-region .toast + .toast + .toast)',
      ':has(.toast-region__list--status .toast + .toast):has(.toast-region__list--alert .toast)',
      ':has(.toast-region__list--status .toast):has(.toast-region__list--alert .toast + .toast)',
    ],
  ],
];

describe('as cinco parciais dos componentes base (§9)', () => {
  it.each(COMPONENTES)('%s compila, sem apelido da Brasa (--color-*, --elev-*, --radius-*, --text-*)', (nome) => {
    expect(css[nome], `${PARCIAIS[nome]} compila`).not.toBe('');
    expect(css[nome]).not.toMatch(/--color-|--elev-|--radius-|--text-/);
    // Montado em partes: as buscas da §13.2 do SPEC não acham este teste
    expect(css[nome]).not.toMatch(new RegExp(['!impor' + 'tant', 'transition:\\s*al' + 'l', 'outline:\\s*no' + 'ne'].join('|')));
  });
});

describe('aviso (AppToast, §4.5 e §5.1)', () => {
  it('inverse-surface, inverse-on-surface, forma-xs, elevacao-3, sem borda colorida, gap de space-2', () => {
    expect(valor(css.aviso, '.toast', 'background')).toBe('var(--m3-inverse-surface)');
    expect(valor(css.aviso, '.toast', 'color')).toBe('var(--m3-inverse-on-surface)');
    expect(valor(css.aviso, '.toast', 'border-radius')).toBe('var(--m3-forma-xs)');
    expect(valor(css.aviso, '.toast', 'box-shadow')).toBe('var(--m3-elevacao-3)');
    expect(valor(css.aviso, '.toast', 'gap')).toBe('var(--space-2)');
    expect(valor(css.aviso, '.toast', 'font-size')).toBe('var(--m3-body-m)');
    expect(css.aviso).not.toMatch(/border-left/);
  });

  it('a ação em inverse-primary; o anel dos botões por dentro, em inverse-on-surface', () => {
    expect(valor(css.aviso, '.toast .btn.toast__action', 'color')).toBe('var(--m3-inverse-primary)');
    expect(valor(css.aviso, '.toast .btn.toast__close', 'color')).toBe('var(--m3-inverse-on-surface)');
    const anel = '.toast .btn:is(.toast__action, .toast__close):focus-visible';
    expect(valor(css.aviso, anel, 'outline-color')).toBe('var(--m3-inverse-on-surface)');
    expect(valor(css.aviso, anel, 'outline-offset')).toBe('calc(-1 * var(--focus-width))');
  });

  it('o transform da entrada e da saída só com movimento liberado', () => {
    expect(blocos(css.aviso).fora).not.toMatch(/transform/);
    expect(valor(css.aviso, '.toast-enter-from', 'transform', MOVIMENTO_OK)).toBe('scale(0.8)');
  });

  it('acima da toolbar abaixo de lg; a partir de lg, no início do .container, alinhado ao início', () => {
    const code = escopado(css.aviso, 'AppToast.vue');
    expect(valor(code, 'body:has(.m3-ferramentas) .toast-region', 'bottom', ABAIXO_LG)).toBe(
      'calc(var(--m3-barra-reserva) + env(safe-area-inset-bottom))'
    );
    // O Sass tira o calc() de dentro do max(), que já aceita a conta
    expect(valor(code, '.toast-region[data-v-teste]', 'inset-inline-start', DESDE_LG)).toBe(
      'max(var(--gutter), (100vw - var(--container-max)) / 2 + var(--gutter))'
    );
    expect(valor(code, '.toast-region__list[data-v-teste]', 'align-items', DESDE_LG)).toBe('flex-start');
    expect(valor(code, '.toast-region__list[data-v-teste]', 'align-items')).toBe('center');
  });

  it.each(AVISOS)('com %s aviso(s), a reserva no scroll-padding do html e no padding do body fora do painel', (n, condicoes) => {
    const code = escopado(css.aviso, 'AppToast.vue');
    for (const condicao of condicoes) {
      expect(valor(code, `html${condicao}`, 'scroll-padding-bottom'), `${condicao}`).toBe(
        `calc(var(--space-4) + ${n} * var(--m3-toast-reserva))`
      );
      expect(valor(code, `html:not(:has(.admin-layout))${condicao} body`, 'padding-bottom'), `${condicao}`).toBe(
        `calc(var(--space-4) + ${n} * var(--m3-toast-reserva))`
      );
      expect(valor(code, `html:has(.m3-ferramentas)${condicao}`, 'scroll-padding-bottom', ABAIXO_LG), `${condicao}`).toBe(
        `calc(var(--m3-barra-reserva) + ${n} * var(--m3-toast-reserva))`
      );
    }
  });

  it('as páginas da loja não têm mais regra do aviso; o painel só começa depois da coluna e conta no main', () => {
    for (const nome of ['carrinho', 'pagamento', 'perfil']) {
      expect(css[nome], `${nome}`).not.toMatch(/toast-region|m3-toast-reserva/);
    }
    const painel = escopado(css.painel, 'AdminLayout.vue');
    expect(painel).not.toMatch(/scroll-padding-bottom/);
    expect(valor(painel, 'html:has(.admin-layout) .toast-region', 'bottom')).toBeUndefined();
    expect(valor(painel, 'html:has(.admin-layout) .toast-region', 'inset-inline-start', DESDE_LG)).toBe(
      'calc(var(--m3-navegacao-largura) + var(--gutter))'
    );
    for (const [n, condicoes] of AVISOS) {
      for (const condicao of condicoes) {
        expect(valor(painel, `html:has(.admin-layout)${condicao} .admin-main`, 'padding-bottom')).toBe(
          `calc(var(--space-4) + ${n} * var(--m3-toast-reserva))`
        );
      }
    }
  });
});

describe('diálogo (BaseDialog, §5.2)', () => {
  it('surface-container-high a partir de md e surface-container-low no sheet, até 40rem', () => {
    expect(valor(css.dialogo, '.dialog', 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.dialogo, '.dialog', 'box-shadow')).toBe('var(--m3-elevacao-1)');
    expect(valor(css.dialogo, '.dialog', 'max-width')).toBe('40rem');
    expect(valor(css.dialogo, '.dialog', 'border-radius')).toBe('var(--m3-forma-xl) var(--m3-forma-xl) 0 0');
    expect(valor(css.dialogo, '.dialog', 'background', DESDE_MD)).toBe('var(--m3-surface-container-high)');
    expect(valor(css.dialogo, '.dialog', 'box-shadow', DESDE_MD)).toBe('var(--m3-elevacao-3)');
    expect(valor(css.dialogo, '.dialog', 'border-radius', DESDE_MD)).toBe('var(--m3-forma-xl)');
    expect(valor(css.dialogo, '.dialog::backdrop', 'background')).toBe('var(--m3-scrim)');
  });

  it('na altura do conteúdo: nenhuma height fixa com 100dvh, só o teto', () => {
    expect(css.dialogo).not.toMatch(/(^|[^-])height:\s*calc\(100dvh/m);
    expect(valor(css.dialogo, '.dialog', 'max-height')).toBe('calc(100dvh - var(--space-6))');
  });

  it('título headline-s 400; corpo com scroll-padding-block', () => {
    expect(valor(css.dialogo, '.dialog__title', 'font-size')).toBe('var(--m3-headline-s)');
    expect(valor(css.dialogo, '.dialog__title', 'font-weight')).toBe('400');
    expect(valor(css.dialogo, '.dialog__body', 'scroll-padding-block')).toBe('var(--space-4)');
  });

  it('divisores transparentes, em outline-variant só com .is-rolado e .tem-mais', () => {
    expect(valor(css.dialogo, '.dialog__header', 'border-block-end')).toBe('1px solid transparent');
    expect(valor(css.dialogo, '.dialog__footer', 'border-block-start')).toBe('1px solid transparent');
    expect(valor(css.dialogo, '.dialog__panel.is-rolado .dialog__header', 'border-block-end-color')).toBe('var(--m3-outline-variant)');
    expect(valor(css.dialogo, '.dialog__panel.tem-mais .dialog__footer', 'border-block-start-color')).toBe('var(--m3-outline-variant)');
  });

  it('borda nos modos de contraste (reserva-de-sombra)', () => {
    expect(valor(css.dialogo, '.dialog', 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });
});

describe('estado vazio e seletor (§5.3 e §5.4)', () => {
  it('vazio alinhado ao início, título title-l 500 e texto body-m', () => {
    expect(valor(css.vazio, '.empty-state', 'align-items')).toBe('flex-start');
    expect(valor(css.vazio, '.empty-state__title', 'font-size')).toBe('var(--m3-title-l)');
    expect(valor(css.vazio, '.empty-state__title', 'font-weight')).toBe('500');
    expect(valor(css.vazio, '.empty-state__text', 'font-size')).toBe('var(--m3-body-m)');
    expect(valor(css.vazio, '.empty-state__icon', 'color')).toBe('var(--m3-on-surface-variant)');
  });

  it('seletor sem transition nem transform; número em title-m 500 com 2ch', () => {
    expect(css.seletor).not.toMatch(/transition|transform/);
    expect(valor(css.seletor, '.stepper__value', 'font-size')).toBe('var(--m3-title-m)');
    expect(valor(css.seletor, '.stepper__value', 'font-weight')).toBe('500');
    expect(valor(css.seletor, '.stepper__value', 'min-width')).toBe('2ch');
  });
});

describe('botão (§5.5 a §5.9)', () => {
  it('sem .btn--legado; o perigo em error e on-error-container no :active', () => {
    expect(css.botao).not.toMatch(/btn--legado/);
    expect(valor(css.botao, '.m3-botao--perigo', 'color')).toBe('var(--m3-error)');
    expect(valor(css.botao, '.m3-botao--perigo:active:not(:disabled, [aria-disabled=true], .is-loading)', 'color')).toBe(
      'var(--m3-on-error-container)'
    );
  });

  it('o desabilitado com os tokens novos; o tonal com borda outline em prefers-contrast: more', () => {
    expect(valor(css.botao, '.btn:is(:disabled, [aria-disabled=true])', 'color')).toBe('var(--m3-desabilitado-conteudo)');
    expect(dentro(css.botao, '@media (forced-colors: active)')).toMatch(/GrayText/);
    expect(valor(css.botao, '.m3-botao--tonal', 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });
});

describe('movimento reduzido e tokens', () => {
  it('o _motion.scss leva .toast, .dialog e .btn__spinner à lista de transform: none', () => {
    const reduzido = dentro(css.movimento, '@media (prefers-reduced-motion: reduce)');
    for (const classe of ['.toast', '.dialog', '.btn__spinner']) {
      expect(valor(reduzido, classe, 'transform'), `${classe}`).toBe('none');
    }
  });

  it('o --m3-inverse-primary é #9fd49b, e os tokens do desabilitado e das camadas inversas existem', () => {
    const { tokens } = lerTokens(readFileSync(`${ESTILOS}base/_tokens.scss`, 'utf8'));
    expect(tokens.get('m3-inverse-primary')).toBe('#9fd49b');
    expect(tokens.get('m3-desabilitado-conteudo')).toBe('rgba(24, 29, 23, 0.38)');
    expect(tokens.get('m3-desabilitado-container')).toBe('rgba(24, 29, 23, 0.1)');
    expect(tokens.get('m3-camada-inversa-hover')).toBe('rgba(238, 242, 233, 0.08)');
    expect(tokens.get('m3-camada-inversa-pressionada')).toBe('rgba(238, 242, 233, 0.1)');
    expect(tokens.get('color-ink-disabled')).toBe('var(--m3-desabilitado-conteudo)');
  });
});

describe('pares dos componentes base (§8)', () => {
  const { ler } = lerTokens(readFileSync(`${ESTILOS}base/_tokens.scss`, 'utf8'));
  const duasCasas = (n) => Math.floor(n * 100) / 100;
  const ESPERADOS = [
    ['m3-inverse-primary', 'm3-inverse-surface', undefined, 4.5, 7.7],
    ['m3-inverse-primary', 'm3-camada-inversa-pressionada', 'm3-inverse-surface', 4.5, 5.75],
    ['m3-inverse-on-surface', 'm3-camada-inversa-pressionada', 'm3-inverse-surface', 4.5, 8.61],
    ['m3-on-error-container', 'm3-camada-pressionada', 'm3-surface-container-high', 4.5, 6.26],
    ['m3-on-error-container', 'm3-camada-pressionada', 'm3-surface-container-low', 4.5, 6.94],
    ['m3-on-error-container', 'm3-camada-pressionada', 'm3-surface-container-lowest', 4.5, 7.65],
    ['m3-secondary', 'm3-camada-pressionada', 'm3-surface-container-high', 3, 4.32],
    ['m3-on-surface-variant', 'm3-camada-pressionada', 'm3-surface-container-high', 3, 6.22],
    ['m3-outline', 'm3-surface-container-high', undefined, 3, 3.65],
    ['m3-on-error-container', 'm3-surface-container-high', undefined, 4.5, 7.61],
  ];

  it('são 10, no grupo PARES_COMPONENTES, todos em PARES', () => {
    expect(PARES_COMPONENTES).toHaveLength(ESPERADOS.length);
    for (const par of PARES_COMPONENTES) expect(PARES).toContain(par);
  });

  it.each(ESPERADOS)('%s sobre %s (%s): mínimo %s, medido %s', (frente, fundo, sobre, minimo, medido) => {
    const par = PARES_COMPONENTES.find((p) => p.frente === frente && p.fundo === fundo && p.sobre === sobre);
    expect(par, 'par em PARES_COMPONENTES').toBeTruthy();
    expect(par.minimo).toBe(minimo);
    expect(duasCasas(medirPar(ler, par))).toBe(medido);
    expect(medirPar(ler, par)).toBeGreaterThanOrEqual(minimo);
  });

  it('saem o ícone de sucesso do aviso e o ghost da Brasa no hover', () => {
    expect(PARES.find((par) => par.onde === 'ícone de sucesso no toast')).toBeUndefined();
    expect(PARES.find((par) => par.onde === 'botão ghost no hover')).toBeUndefined();
  });
});
