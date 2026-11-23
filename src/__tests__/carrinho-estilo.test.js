// @vitest-environment node
// Estilo do Carrinho, do Pagamento e da Confirmação no M3 (docs/direcoes/desenho/carrinho-pagamento.md,
// §4, §5, §8 e §9): as parciais compiladas pelo sass-embedded, o mesmo compilador do build, e as das
// páginas também pelo <style scoped> do Vue (o :global() do scroll-padding com o aviso). Lidas pelo
// node:fs (no Vitest, um .scss importado com ?raw chega vazio); o alias @/ do Vite é resolvido por um
// importador. Mesmo padrão do cardapio-estilo.test.js.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { compileStyle } from 'vue/compiler-sfc';
import { beforeAll, describe, expect, it } from 'vitest';
import { PARES, PARES_CARRINHO, PARES_TELAS_BRASA, lerTokens, medirPar } from '@/utils/contraste';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ESTILOS = `${SRC}assets/styles/`;
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

const PARCIAIS = {
  carrinho: 'pages/_cart-page.scss',
  item: 'components/cart-item.scss',
  resumo: 'components/_order-summary.scss',
  pagamento: 'pages/_payment.scss',
  formas: 'components/_payment-method-picker.scss',
  confirmacao: 'pages/_confirmation.scss',
  movimento: 'base/_motion.scss',
};
const DESDE_SM = '@media (min-width: 480px)';
const DESDE_MD = '@media (min-width: 768px)';
const DESDE_LG = '@media (min-width: 1024px)';
const ABAIXO_MD = '@media (max-width: 767.98px)';
const DE_MD_A_XL = '@media (min-width: 768px) and (max-width: 1279.98px)';
const GRUDADO = '@media (min-width: 1024px) and (min-height: 48rem)';
const MOVIMENTO_OK = '@media (prefers-reduced-motion: no-preference)';
const MOVIMENTO_REDUZIDO = '@media (prefers-reduced-motion: reduce)';
const CORES_FORCADAS = '@media (forced-colors: active)';
const MAIS_CONTRASTE = '@media (prefers-contrast: more)';

const css = {};
const tokens = readFileSync(`${ESTILOS}base/_tokens.scss`, 'utf8');
beforeAll(() => {
  const sass = initCompiler();
  try {
    // Uma parcial que não compila (ou não existe) fica vazia e reprova só os casos dela
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

// Valor de uma propriedade num seletor exato: fora dos @media, ou só dentro da condição pedida. A
// última declaração vence.
function valor(texto, seletor, propriedade, condicao) {
  const { fora, lista } = blocos(texto);
  const corpos = condicao ? lista.filter(([c]) => c === condicao).map(([, corpo]) => corpo) : [fora];
  let achado;
  for (const corpo of corpos) {
    for (const [, seletores, declaracoes] of corpo.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!seletores.split(',').map((s) => s.trim()).includes(seletor)) continue;
      for (const declaracao of declaracoes.split(';')) {
        const [nome, ...resto] = declaracao.split(':');
        if (nome.trim() === propriedade) achado = resto.join(':').trim();
      }
    }
  }
  return achado;
}

// Texto do CSS fora de um @media com a condição dada (para "transform só dentro do motion-ok")
const foraDe = (texto, condicao) =>
  blocos(texto).fora + blocos(texto).lista.filter(([c]) => c !== condicao).map(([, corpo]) => corpo).join('');

const escopado = (fonte, filename) => {
  const { code, errors } = compileStyle({ source: fonte, filename, id: 'data-v-teste', scoped: true });
  expect(errors).toEqual([]);
  return code;
};

const xl = 'var(--m3-forma-xl)';
const xs = 'var(--m3-forma-xs)';

describe('token e mixin novos (§8)', () => {
  it('a reserva de um aviso (toast) é um token de layout, medido na captura', () => {
    // Pelo lerTokens: um "--m3-…:" escrito aqui contaria na busca dos papéis fora dos tokens (§13.2).
    // Medido em 390: o aviso tem de 72 a 92 px (3 linhas); com o anel de 5 px do foco e um vão, 104 px
    const { tokens: declarados } = lerTokens(tokens);
    expect(declarados.get('m3-toast-reserva')).toBe('6.5rem');
  });

  it('o mixin altura-min existe em _breakpoints.scss, ao lado do up() e do below()', () => {
    const breakpoints = readFileSync(`${ESTILOS}base/_breakpoints.scss`, 'utf8');
    expect(breakpoints).toMatch(/@mixin altura-min\(\$altura\)/);
    expect(breakpoints).toMatch(/48rem/);
  });
});

describe('foco não coberto pelo aviso (§4, decisão i)', () => {
  const comAviso = (raiz) => `html:has(.${raiz}):has(.toast-region .toast)`;
  const RESERVA_TOPO = 'calc(var(--navbar-h) + var(--space-4) + var(--m3-toast-reserva))';

  it.each([
    ['carrinho', 'cart-page', 'CartView.vue'],
    ['pagamento', 'payment-page', 'PaymentView.vue'],
  ])('%s: com aviso na tela, o scroll-padding do pé soma a reserva abaixo de md', (nome, raiz, arquivo) => {
    const code = escopado(css[nome], arquivo);
    expect(valor(code, comAviso(raiz), 'scroll-padding-bottom', ABAIXO_MD)).toBe(
      'calc(var(--m3-barra-reserva) + var(--m3-toast-reserva))'
    );
  });

  it('pagamento: a reserva do topo vale a partir de md (o aviso cruza a coluna do resumo em qualquer largura)', () => {
    const code = escopado(css.pagamento, 'PaymentView.vue');
    expect(valor(code, comAviso('payment-page'), 'scroll-padding-top', DESDE_MD)).toBe(RESERVA_TOPO);
  });

  it('carrinho: a reserva do topo vale de md a xl; a partir de xl o aviso não cruza a coluna da lista, e a página não pula', () => {
    const code = escopado(css.carrinho, 'CartView.vue');
    expect(valor(code, comAviso('cart-page'), 'scroll-padding-top', DE_MD_A_XL)).toBe(RESERVA_TOPO);
    expect(valor(code, comAviso('cart-page'), 'scroll-padding-top', DESDE_MD)).toBeUndefined();
  });
});

describe('Carrinho (§3, §5.2 a §5.4)', () => {
  it('ritmo do Cardápio: a página a 20 e 40 px do cabeçalho; o h1 a 20 e 32 px do conteúdo', () => {
    expect(valor(css.carrinho, '.cart-page', 'padding-block')).toBe('var(--space-5) var(--space-8)');
    expect(valor(css.carrinho, '.cart-page', 'padding-top', DESDE_MD)).toBe('var(--space-7)');
    expect(valor(css.carrinho, '.cart-page__title', 'margin-bottom')).toBe('var(--space-5)');
    expect(valor(css.carrinho, '.cart-page__title', 'margin-bottom', DESDE_MD)).toBe('var(--space-6)');
    // O h1 segue a regra global (--text-page, 500)
    expect(valor(css.carrinho, '.cart-page__title', 'font-size')).toBeUndefined();
  });

  it('a grade 8/12 e 4/12 do SPEC.md a partir de lg', () => {
    expect(valor(css.carrinho, '.cart-page__layout', 'gap')).toBe('var(--space-5)');
    expect(valor(css.carrinho, '.cart-page__layout', 'align-items')).toBe('start');
    expect(valor(css.carrinho, '.cart-page__layout', 'grid-template-columns', DESDE_LG)).toBe('8fr 4fr');
  });

  it('a bandeja: surface-container-low, canto 28 e padding 8 (cantos concêntricos); itens com vão de 2 px', () => {
    expect(valor(css.carrinho, '.cart-page__lista', 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.carrinho, '.cart-page__lista', 'border-radius')).toBe(xl);
    expect(valor(css.carrinho, '.cart-page__lista', 'padding')).toBe('var(--space-2)');
    expect(valor(css.carrinho, '.cart-page__itens', 'gap')).toBe('var(--m3-vao-segmento)');
  });

  it('o resumo: contêiner low de canto 28, sem sombra, padding 16 e 24; grudado a partir de lg', () => {
    expect(valor(css.carrinho, '.cart-page__resumo', 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.carrinho, '.cart-page__resumo', 'border-radius')).toBe(xl);
    expect(valor(css.carrinho, '.cart-page__resumo', 'padding')).toBe('var(--space-4)');
    expect(valor(css.carrinho, '.cart-page__resumo', 'padding', DESDE_SM)).toBe('var(--space-5)');
    expect(valor(css.carrinho, '.cart-page__resumo', 'box-shadow')).toBeUndefined();
    expect(valor(css.carrinho, '.cart-page__resumo', 'position', DESDE_LG)).toBe('sticky');
    expect(valor(css.carrinho, '.cart-page__resumo', 'top', DESDE_LG)).toBe('calc(var(--navbar-h) + var(--space-5))');
    expect(valor(css.carrinho, '.cart-page__notice', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.carrinho, '.cart-page__notice', 'font-size')).toBe('var(--m3-body-m)');
  });

  it('o item: lowest, cantos 20/4 pela posição, sem borda entre itens', () => {
    expect(valor(css.item, '.cart-item', 'background')).toBe('var(--m3-surface-container-lowest)');
    expect(valor(css.item, '.cart-item', '--m3-item-canto-cima')).toBe(xs);
    expect(valor(css.item, '.cart-item', '--m3-item-canto-baixo')).toBe(xs);
    expect(valor(css.item, '.cart-item:first-child', '--m3-item-canto-cima')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.item, '.cart-item:last-child', '--m3-item-canto-baixo')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.item, '.cart-item', 'padding')).toBe('var(--space-3)');
    expect(valor(css.item, '.cart-item', 'padding', DESDE_SM)).toBe('var(--space-3) var(--space-4)');
    expect(css.item).not.toMatch(/border-top/);
  });

  it('cores forçadas e mais contraste: cada item ganha borda, porque o fundo e o vão de 2 px somem', () => {
    expect(valor(css.item, '.cart-item', 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
    expect(valor(css.item, '.cart-item', 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });

  it('a 2ª linha quebra quando não cabe (fonte maior em 320 px), com o "Remover" no fim', () => {
    expect(valor(css.item, '.cart-item__bottom', 'flex-wrap')).toBe('wrap');
    expect(valor(css.item, '.cart-item__remover', 'margin-inline-start')).toBe('auto');
  });

  it('o cartão da miniatura fica com canto 16 em todas as larguras, por uma regra na raiz da M3Foto', () => {
    const code = escopado(css.item, 'CartItem.vue');
    expect(valor(code, '.cart-item__foto.m3-foto--cartao[data-v-teste]', 'border-radius')).toBe('var(--m3-forma-l)');
    expect(css.item).not.toMatch(/:deep/);
    expect(valor(css.item, '.cart-item__foto', 'width')).toBe('4rem');
  });

  it('nome em body-l, detalhes em body-m (os dois quebram em qualquer ponto) e total em title-m 500', () => {
    expect(valor(css.item, '.cart-item__name', 'font-size')).toBe('var(--m3-body-l)');
    expect(valor(css.item, '.cart-item__name', 'overflow-wrap')).toBe('anywhere');
    expect(valor(css.item, '.cart-item__detail', 'font-size')).toBe('var(--m3-body-m)');
    expect(valor(css.item, '.cart-item__detail', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.item, '.cart-item__detail', 'overflow-wrap')).toBe('anywhere');
    expect(valor(css.item, '.cart-item__total', 'font-size')).toBe('var(--m3-title-m)');
    expect(valor(css.item, '.cart-item__total', 'font-weight')).toBe('500');
    expect(valor(css.item, '.cart-item__total', 'white-space')).toBe('nowrap');
  });
});

describe('OrderSummary (§5.3)', () => {
  it('sem contêiner no componente (fica nas páginas) e o título pela regra global do h2', () => {
    expect(valor(css.resumo, '.order-summary', 'background')).toBeUndefined();
    expect(valor(css.resumo, '.order-summary', 'box-shadow')).toBeUndefined();
    expect(valor(css.resumo, '.order-summary__title', 'font-size')).toBeUndefined();
    expect(valor(css.resumo, '.order-summary__title', 'font-weight')).toBeUndefined();
  });

  it('o divisor outline-variant só quando há linhas acima', () => {
    expect(valor(css.resumo, '.order-summary__totals', 'border-top')).toBeUndefined();
    expect(valor(css.resumo, '.order-summary__items + .order-summary__totals', 'border-top')).toBe(
      '1px solid var(--m3-outline-variant)'
    );
  });

  it('linhas em body-l (body-m no compacto), nomes e detalhes que quebram; Total em headline-s 500', () => {
    expect(valor(css.resumo, '.order-summary__item', 'font-size')).toBe('var(--m3-body-l)');
    expect(valor(css.resumo, '.order-summary--compact .order-summary__item', 'font-size')).toBe('var(--m3-body-m)');
    expect(valor(css.resumo, '.order-summary__name', 'overflow-wrap')).toBe('anywhere');
    expect(valor(css.resumo, '.order-summary__detail', 'overflow-wrap')).toBe('anywhere');
    expect(valor(css.resumo, '.order-summary__detail', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.resumo, '.order-summary__row', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.resumo, '.order-summary__row--total', 'color')).toBe('var(--m3-on-surface)');
    expect(valor(css.resumo, '.order-summary__row--total dt', 'font-size')).toBe('var(--m3-title-m)');
    expect(valor(css.resumo, '.order-summary__row--total dt', 'font-weight')).toBe('500');
    expect(valor(css.resumo, '.order-summary__row--total .order-summary__value', 'font-size')).toBe('var(--m3-headline-s)');
    expect(valor(css.resumo, '.order-summary__row--total .order-summary__value', 'font-weight')).toBe('500');
  });
});

describe('Pagamento (§5.6 e §5.8)', () => {
  it('seções em contêineres low de canto 28, com padding 16 e 24', () => {
    expect(valor(css.pagamento, '.payment-page__secao', 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.pagamento, '.payment-page__secao', 'border-radius')).toBe(xl);
    expect(valor(css.pagamento, '.payment-page__secao', 'padding')).toBe('var(--space-4)');
    expect(valor(css.pagamento, '.payment-page__secao', 'padding', DESDE_SM)).toBe('var(--space-5)');
    expect(valor(css.pagamento, '.payment-page__secao', 'gap')).toBe('var(--space-3)');
    expect(valor(css.pagamento, '.payment-page__sections', 'gap')).toBe('var(--space-5)');
  });

  it('o aviso sem endereço: aviso sobre aviso-container, canto 16, com borda nos modos de contraste', () => {
    expect(valor(css.pagamento, '.payment-page__aviso', 'background')).toBe('var(--m3-aviso-container)');
    expect(valor(css.pagamento, '.payment-page__aviso', 'color')).toBe('var(--m3-aviso)');
    expect(valor(css.pagamento, '.payment-page__aviso', 'border-radius')).toBe('var(--m3-forma-l)');
    expect(valor(css.pagamento, '.payment-page__aviso', 'padding')).toBe('var(--space-4)');
    expect(valor(css.pagamento, '.payment-page__aviso', 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
    expect(valor(css.pagamento, '.payment-page__aviso', 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });

  it('o endereço em body-l, sem itálico, e quebrando em qualquer ponto', () => {
    expect(valor(css.pagamento, '.payment-page__address', 'font-style')).toBe('normal');
    expect(valor(css.pagamento, '.payment-page__address', 'font-size')).toBe('var(--m3-body-l)');
    expect(valor(css.pagamento, '.payment-page__address', 'overflow-wrap')).toBe('anywhere');
  });

  it('o resumo gruda só a partir de lg e com 48rem de altura; o rótulo do CTA quebra linha', () => {
    expect(valor(css.pagamento, '.payment-page__resumo', 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.pagamento, '.payment-page__resumo', 'border-radius')).toBe(xl);
    expect(valor(css.pagamento, '.payment-page__resumo', 'position', DESDE_LG)).toBeUndefined();
    expect(valor(css.pagamento, '.payment-page__resumo', 'position', GRUDADO)).toBe('sticky');
    expect(valor(css.pagamento, '.payment-page__resumo', 'top', GRUDADO)).toBe('calc(var(--navbar-h) + var(--space-5))');
    expect(valor(css.pagamento, '.payment-page__resumo .payment-page__cta', 'white-space')).toBe('normal');
    expect(valor(css.pagamento, '.payment-page__help', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.pagamento, '.payment-page__help', 'font-size')).toBe('var(--m3-body-m)');
    expect(valor(css.pagamento, '.payment-page__help', 'text-align')).toBe('center');
  });
});

describe('PaymentMethodPicker (§5.7)', () => {
  it('uma coluna, em lista segmentada: vão de 2 px e itens lowest de 64 px com cantos 20/4', () => {
    expect(valor(css.formas, '.payment-picker', 'min-inline-size')).toBe('0');
    expect(valor(css.formas, '.payment-picker__options', 'gap')).toBe('var(--m3-vao-segmento)');
    expect(valor(css.formas, '.payment-picker__options', 'flex-direction')).toBe('column');
    expect(css.formas).not.toMatch(/grid-template-columns/);
    expect(valor(css.formas, '.payment-option', 'min-height')).toBe('4rem');
    expect(valor(css.formas, '.payment-option', 'background')).toBe('var(--m3-surface-container-lowest)');
    expect(valor(css.formas, '.payment-option:first-child', '--m3-item-canto-cima')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.formas, '.payment-option:last-child', '--m3-item-canto-baixo')).toBe('var(--m3-forma-l-aumentada)');
  });

  it('a marcada: secondary-container, on-secondary-container e os quatro cantos de 20', () => {
    const marcada = '.payment-option.is-checked';
    expect(valor(css.formas, marcada, 'background')).toBe('var(--m3-secondary-container)');
    expect(valor(css.formas, marcada, 'color')).toBe('var(--m3-on-secondary-container)');
    expect(valor(css.formas, marcada, '--m3-item-canto-cima')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.formas, marcada, '--m3-item-canto-baixo')).toBe('var(--m3-forma-l-aumentada)');
  });

  it('o controle de 24 px: contorno de 2 px em on-surface-variant; marcado, primary com o check on-primary', () => {
    expect(valor(css.formas, '.payment-option__controle', 'width')).toBe('1.5rem');
    expect(valor(css.formas, '.payment-option__controle', 'height')).toBe('1.5rem');
    expect(valor(css.formas, '.payment-option__controle', 'border')).toBe('2px solid var(--m3-on-surface-variant)');
    expect(valor(css.formas, '.payment-option__controle', 'border-radius')).toBe('var(--m3-forma-full)');
    expect(valor(css.formas, '.payment-option__controle', 'color')).toBe('var(--m3-on-primary)');
    expect(valor(css.formas, '.payment-option.is-checked .payment-option__controle', 'background')).toBe('var(--m3-primary)');
    expect(valor(css.formas, '.payment-option.is-checked .payment-option__controle', 'border-color')).toBe('var(--m3-primary)');
  });

  it('anel por dentro no label (:has(:focus-visible)), porque as opções ficam encostadas', () => {
    expect(valor(css.formas, '.payment-option:has(:focus-visible)', 'outline')).toBe('var(--focus-width) solid var(--color-focus)');
    expect(valor(css.formas, '.payment-option:has(:focus-visible)', 'outline-offset')).toBe('calc(-1 * var(--focus-width))');
  });

  it('o rádio escondido ganha o retângulo do label, sem o desenho nativo', () => {
    const code = escopado(css.formas, 'PaymentMethodPicker.vue');
    const seletor = '.payment-option__input[data-v-teste]';
    expect(valor(code, seletor, 'inset')).toBe('0');
    expect(valor(code, seletor, 'width')).toBe('100%');
    expect(valor(code, seletor, 'height')).toBe('100%');
    expect(valor(code, seletor, 'margin')).toBe('0');
    expect(valor(code, seletor, 'appearance')).toBe('none');
  });

  it('cores forçadas e mais contraste: borda em toda opção, 2 px em Highlight na marcada e controle em CanvasText', () => {
    expect(valor(css.formas, '.payment-option', 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
    expect(valor(css.formas, '.payment-option.is-checked', 'border', CORES_FORCADAS)).toBe('2px solid Highlight');
    expect(valor(css.formas, '.payment-option', 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
    expect(valor(css.formas, '.payment-option__controle', 'border-color', CORES_FORCADAS)).toBe('CanvasText');
    expect(valor(css.formas, '.payment-option.is-checked .payment-option__controle', 'background', CORES_FORCADAS)).toBe('CanvasText');
    expect(valor(css.formas, '.payment-option.is-checked .payment-option__controle', 'color', CORES_FORCADAS)).toBe('Canvas');
  });

  it('o check entra por opacidade sempre e com scale só no motion-ok; está no movimento reduzido', () => {
    expect(valor(css.formas, '.payment-option__check', 'opacity')).toBe('0');
    expect(valor(css.formas, '.payment-option.is-checked .payment-option__check', 'opacity')).toBe('1');
    expect(foraDe(css.formas, MOVIMENTO_OK)).not.toMatch(/transform|rotate/);
    expect(valor(css.formas, '.payment-option__check', 'transform', MOVIMENTO_OK)).toBe('scale(0)');
    expect(valor(css.formas, '.payment-option.is-checked .payment-option__check', 'transform', MOVIMENTO_OK)).toBe('none');
    const reduzido = blocos(css.movimento).lista.find(([c]) => c === MOVIMENTO_REDUZIDO)?.[1] ?? '';
    expect(reduzido).toMatch(/\.payment-option__check/);
  });
});

describe('Confirmação (§5.9)', () => {
  it('a coluna central de 40rem e a pilha com o vão de 2 px', () => {
    expect(valor(css.confirmacao, '.confirmation-page__coluna', 'max-width')).toBe('40rem');
    expect(valor(css.confirmacao, '.confirmation-page__coluna', 'margin-inline')).toBe('auto');
    expect(valor(css.confirmacao, '.confirmation-page__pilha', 'gap')).toBe('var(--m3-vao-segmento)');
  });

  it('a faixa primary-container (28/28/4/4) e o resumo low (4/4/28/28), com padding 24', () => {
    expect(valor(css.confirmacao, '.confirmation-page__status', 'background')).toBe('var(--m3-primary-container)');
    expect(valor(css.confirmacao, '.confirmation-page__status', 'color')).toBe('var(--m3-on-primary-container)');
    expect(valor(css.confirmacao, '.confirmation-page__status', 'border-radius')).toBe(`${xl} ${xl} ${xs} ${xs}`);
    expect(valor(css.confirmacao, '.confirmation-page__status', 'padding')).toBe('var(--space-5)');
    expect(valor(css.confirmacao, '.confirmation-page__resumo', 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.confirmacao, '.confirmation-page__resumo', 'border-radius')).toBe(`${xs} ${xs} ${xl} ${xl}`);
    expect(valor(css.confirmacao, '.confirmation-page__resumo', 'padding')).toBe('var(--space-5)');
  });

  it('o h1 em headline-m 500, não em display; os dados com dt em body-m e dd em title-m 500', () => {
    expect(valor(css.confirmacao, '.confirmation-page__title', 'font-size')).toBe('var(--m3-headline-m)');
    expect(valor(css.confirmacao, '.confirmation-page__title', 'font-weight')).toBe('500');
    expect(valor(css.confirmacao, '.confirmation-page__dados', 'flex-wrap')).toBe('wrap');
    expect(valor(css.confirmacao, '.confirmation-page__dados dt', 'font-size')).toBe('var(--m3-body-m)');
    expect(valor(css.confirmacao, '.confirmation-page__dados dd', 'font-size')).toBe('var(--m3-title-m)');
    expect(valor(css.confirmacao, '.confirmation-page__dados dd', 'font-weight')).toBe('500');
  });

  it('nada se move: sem transform, animation nem transition na confirmação', () => {
    expect(css.confirmacao).not.toBe('');
    expect(css.confirmacao).not.toMatch(/transform|animation|transition/);
  });
});

describe('pares do Carrinho e do Pagamento (§8)', () => {
  const { ler } = lerTokens(tokens);
  const duasCasas = (n) => Math.floor(n * 100) / 100;
  const ESPERADOS = [
    ['m3-primary', 'm3-surface-container-low', undefined, 4.5, 5.82],
    ['m3-primary', 'm3-camada-primary-pressionada', 'm3-surface-container-low', 4.5, 5.07],
    ['m3-secondary', 'm3-surface-container-low', undefined, 3, 5.83],
    ['m3-secondary', 'm3-aviso-container', undefined, 3, 4.99],
    ['m3-primary', 'm3-aviso-container', undefined, 3, 4.98],
    ['m3-primary-hover', 'm3-aviso-container', undefined, 3, 4.13],
    ['m3-primary-pressed', 'm3-aviso-container', undefined, 3, 3.94],
    ['m3-error', 'm3-surface-container-lowest', undefined, 4.5, 6.46],
    ['m3-primary', 'm3-secondary-container', undefined, 3, 4.98],
    ['m3-primary', 'm3-secondary-container-pressed', undefined, 3, 4.28],
    ['m3-secondary', 'm3-secondary-container-pressed', undefined, 3, 4.29],
    ['m3-secondary', 'm3-camada-pressionada', 'm3-surface-container-lowest', 3, 5.27],
    ['m3-outline', 'm3-surface-container-low', undefined, 3, 4.06],
  ];

  it('são 13, no grupo PARES_CARRINHO, todos em PARES', () => {
    expect(PARES_CARRINHO).toHaveLength(ESPERADOS.length);
    for (const par of PARES_CARRINHO) expect(PARES).toContain(par);
  });

  it.each(ESPERADOS)('%s sobre %s (%s): mínimo %s, medido %s', (frente, fundo, sobre, minimo, medido) => {
    const par = PARES_CARRINHO.find((p) => p.frente === frente && p.fundo === fundo && p.sobre === sobre);
    expect(par, 'par em PARES_CARRINHO').toBeTruthy();
    expect(par.minimo).toBe(minimo);
    expect(duasCasas(medirPar(ler, par))).toBe(medido);
  });

  it('saem da Brasa o aviso sem endereço e o ícone de sucesso; o item selecionado fica para a sidebar do admin', () => {
    const onde = PARES_TELAS_BRASA.map((par) => par.onde);
    expect(onde).not.toContain('aviso sem endereço');
    expect(onde).not.toContain('ícone e texto de sucesso');
    expect(PARES_TELAS_BRASA.find((par) => par.fundo === 'm3-primary-container')?.onde).toMatch(/sidebar do admin/);
  });
});
