// @vitest-environment node
// Estilo do Cardápio e do modal Personalizar no M3 (docs/direcoes/desenho/cardapio.md, §4, §5 e §8): as
// parciais compiladas pelo sass-embedded, o mesmo compilador do build, e a do Cardápio também pelo
// <style scoped> do Vue (o :global() do scroll-padding-top). Lidas pelo node:fs (no Vitest, um .scss
// importado com ?raw chega vazio); o alias @/ do Vite é resolvido por um importador.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { compileStyle } from 'vue/compiler-sfc';
import { beforeAll, describe, expect, it } from 'vitest';
import { PARES_CARDAPIO, lerTokens, medirPar } from '@/utils/contraste';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ESTILOS = `${SRC}assets/styles/`;
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

const PARCIAIS = {
  menu: 'pages/_menu-page.scss',
  abas: 'components/ui/_category-tabs.scss',
  cartao: 'components/_m3-cartao-lanche.scss',
  ingredientes: 'components/ingredients-list.scss',
  adicionais: 'components/additionals-list.scss',
  modal: 'components/_modal.scss',
  movimento: 'base/_motion.scss',
};
const DESDE_MD = '@media (min-width: 768px)';
const DESDE_LG = '@media (min-width: 1024px)';
const DESDE_XL = '@media (min-width: 1280px)';
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

describe('tokens novos (§8)', () => {
  it('a altura da barra das categorias e o canto do checkbox', () => {
    // Pelo lerTokens: um "--m3-…:" escrito aqui contaria na busca dos papéis fora dos tokens (§13.2)
    const { tokens: declarados } = lerTokens(tokens);
    expect(declarados.get('m3-categorias-altura')).toBe('calc(var(--target-min) + 2 * var(--space-3))');
    expect(declarados.get('m3-forma-caixa')).toBe('2px');
  });
});

describe('Cardápio (§3, §4 e §5.3)', () => {
  it('o scroll-padding-top da rota soma a barra das categorias, e também o cabeçalho a partir de lg', () => {
    const { code, errors } = compileStyle({ source: css.menu, filename: 'MenuView.vue', id: 'data-v-teste', scoped: true });
    expect(errors).toEqual([]);
    expect(valor(code, 'html:has(.menu-page)', 'scroll-padding-top')).toBe('calc(var(--m3-categorias-altura) + var(--space-4))');
    expect(valor(code, 'html:has(.menu-page)', 'scroll-padding-top', DESDE_LG)).toBe(
      'calc(var(--navbar-h) + var(--m3-categorias-altura) + var(--space-4))'
    );
  });

  it('cabeçalho de texto: frase em body-l, on-surface-variant, até 40ch; nada de foto nem contêiner', () => {
    expect(valor(css.menu, '.menu-page__cabecalho', 'padding-top')).toBe('var(--space-5)');
    expect(valor(css.menu, '.menu-page__cabecalho', 'padding-top', DESDE_MD)).toBe('var(--space-7)');
    expect(valor(css.menu, '.menu-page__cabecalho', 'background')).toBeUndefined();
    expect(valor(css.menu, '.menu-page__frase', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.menu, '.menu-page__frase', 'font-size')).toBe('var(--m3-body-l)');
    expect(valor(css.menu, '.menu-page__frase', 'max-width')).toBe('40ch');
  });

  it('a grade é a do feed sem destaque: 2, 3 e 4 colunas, gaps de 12 e 24 px, linha esticada', () => {
    expect(valor(css.menu, '.menu-page__grade', 'grid-template-columns')).toBe('repeat(2, minmax(0, 1fr))');
    expect(valor(css.menu, '.menu-page__grade', 'grid-template-columns', DESDE_LG)).toBe('repeat(3, minmax(0, 1fr))');
    expect(valor(css.menu, '.menu-page__grade', 'grid-template-columns', DESDE_XL)).toBe('repeat(4, minmax(0, 1fr))');
    expect(valor(css.menu, '.menu-page__grade', 'gap')).toBe('var(--space-3)');
    expect(valor(css.menu, '.menu-page__grade', 'gap', DESDE_MD)).toBe('var(--space-5)');
    expect(valor(css.menu, '.menu-page__grade', 'align-items')).toBe('stretch');
  });
});

describe('grupo de categorias (§5.2)', () => {
  it('barra opaca em surface, com a altura do token; a borda só quando grudada', () => {
    expect(valor(css.abas, '.category-tabs', 'background')).toBe('var(--m3-surface)');
    expect(valor(css.abas, '.category-tabs', 'padding-block')).toBe('var(--space-3)');
    expect(valor(css.abas, '.category-tabs', 'min-block-size')).toBe('var(--m3-categorias-altura)');
    expect(valor(css.abas, '.category-tabs.is-stuck', 'border-bottom-color')).toBe('var(--m3-outline-variant)');
    expect(valor(css.abas, '.category-tabs__grupo', 'min-inline-size')).toBe('0');
  });

  it('opções de 44 px com vão de 2 px; desmarcada em surface-container, marcada em pílula primary', () => {
    expect(valor(css.abas, '.category-tabs__opcoes', 'gap')).toBe('var(--m3-vao-segmento)');
    expect(valor(css.abas, '.category-tabs__opcao', 'min-height')).toBe('var(--target-min)');
    expect(valor(css.abas, '.category-tabs__opcao', '--m3-botao-fundo')).toBe('var(--m3-surface-container)');
    expect(valor(css.abas, '.category-tabs__opcao', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.abas, '.category-tabs__opcao.is-marcada', '--m3-botao-fundo')).toBe('var(--m3-primary)');
    expect(valor(css.abas, '.category-tabs__opcao.is-marcada', 'color')).toBe('var(--m3-on-primary)');
    expect(valor(css.abas, '.category-tabs__opcao.is-marcada', '--m3-botao-forma-repouso')).toBe('var(--m3-forma-full)');
    expect(valor(css.abas, '.category-tabs__opcao.is-marcada', '--m3-botao-forma-pressionada')).toBe('var(--m3-forma-m)');
  });

  it('formas de início, meio e fim: de fora redondos e de dentro 8 (Small)', () => {
    const cheia = 'var(--m3-forma-full)';
    const s = 'var(--m3-forma-s)';
    expect(valor(css.abas, '.category-tabs__opcao--inicio', '--m3-botao-forma-repouso')).toBe(`${cheia} ${s} ${s} ${cheia}`);
    expect(valor(css.abas, '.category-tabs__opcao--meio', '--m3-botao-forma-repouso')).toBe(s);
    expect(valor(css.abas, '.category-tabs__opcao--fim', '--m3-botao-forma-repouso')).toBe(`${s} ${cheia} ${cheia} ${s}`);
  });

  it('a camada de estado vai no fundo composto que a troca de forma pinta', () => {
    expect(valor(css.abas, '.category-tabs__opcao:active', '--m3-botao-fundo')).toBe(
      'linear-gradient(var(--m3-camada-pressionada) 0 0), var(--m3-surface-container)'
    );
    expect(valor(css.abas, '.category-tabs__opcao:hover', '--m3-botao-fundo', '@media (hover: hover) and (pointer: fine)')).toBe(
      'linear-gradient(var(--m3-camada-hover) 0 0), var(--m3-surface-container)'
    );
  });

  it('anel por dentro no label (:has(:focus-visible)); na marcada, em on-primary', () => {
    expect(valor(css.abas, '.category-tabs__opcao:has(:focus-visible)', 'outline')).toBe('var(--focus-width) solid var(--color-focus)');
    expect(valor(css.abas, '.category-tabs__opcao:has(:focus-visible)', 'outline-offset')).toBe('calc(-1 * var(--focus-width))');
    expect(valor(css.abas, '.category-tabs__opcao.is-marcada:has(:focus-visible)', 'outline-color')).toBe('var(--m3-on-primary)');
  });

  it('alto contraste: borda em CanvasText em toda opção e 2 px em Highlight na marcada', () => {
    expect(valor(css.abas, '.category-tabs__opcao', 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
    expect(valor(css.abas, '.category-tabs__opcao.is-marcada', 'border', CORES_FORCADAS)).toBe('2px solid Highlight');
    expect(valor(css.abas, '.category-tabs__opcao', 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });

  it('sem transform, sem scroll-snap e sem aria-pressed na parcial', () => {
    expect(css.abas).not.toBe('');
    expect(css.abas).not.toMatch(/transform/);
    expect(css.abas).not.toMatch(/scroll-snap/);
    expect(css.abas).not.toMatch(/aria-pressed/);
  });
});

describe('card do feed no Cardápio (§5.3, 6.d e 6.e)', () => {
  it('o nome do card comum fica em Medium (500), decisão do usuário', () => {
    expect(valor(css.cartao, '.m3-cartao__nome', 'font-weight')).toBe('500');
  });

  it('sem folha, a descrição aparece também abaixo de md', () => {
    expect(valor(css.cartao, '.m3-cartao__descricao', 'display')).toBe('none');
    expect(valor(css.cartao, '.m3-cartao--sem-folha .m3-cartao__descricao', 'display')).toBe('-webkit-box');
  });
});

describe('modal Personalizar (§5.5)', () => {
  it('o prato do montador em surface-container-lowest, canto 16 e 28 a partir de md', () => {
    expect(valor(css.modal, '.customize__prato', 'background')).toBe('var(--m3-surface-container-lowest)');
    expect(valor(css.modal, '.customize__prato', 'border-radius')).toBe('var(--m3-forma-l)');
    expect(valor(css.modal, '.customize__prato', 'border-radius', DESDE_MD)).toBe('var(--m3-forma-xl)');
    expect(valor(css.modal, '.customize__prato', 'padding')).toBe('var(--space-5)');
    expect(valor(css.modal, '.customize__foto', 'width')).toBe('100%');
    expect(valor(css.modal, '.customize__options', 'gap')).toBe('var(--space-6)');
  });

  it('títulos em title-m 500 e ajuda em body-m, nos papéis do M3', () => {
    expect(valor(css.modal, '.customize__title', 'font-size')).toBe('var(--m3-title-m)');
    expect(valor(css.modal, '.customize__title', 'font-weight')).toBe('500');
    expect(valor(css.modal, '.customize__title', 'color')).toBe('var(--m3-on-surface)');
    expect(valor(css.modal, '.customize__help', 'font-size')).toBe('var(--m3-body-m)');
    expect(valor(css.modal, '.customize__help', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.modal, '.customize__description', 'color')).toBe('var(--m3-on-surface-variant)');
  });

  it('ingredientes: bloco branco de canto 20, linhas de 48 px como alvo e anel por dentro', () => {
    expect(valor(css.ingredientes, '.ingredients-list', 'background')).toBe('var(--m3-surface-container-lowest)');
    expect(valor(css.ingredientes, '.ingredients-list', 'border-radius')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.ingredientes, '.ingredients-list', 'grid-template-columns', '@media (min-width: 480px)')).toBe(
      'repeat(2, minmax(0, 1fr))'
    );
    expect(valor(css.ingredientes, '.ingredients-list__label', 'min-height')).toBe('3rem');
    expect(valor(css.ingredientes, '.ingredients-list__label', 'border-radius')).toBe('var(--m3-forma-full)');
    expect(valor(css.ingredientes, '.ingredients-list__label:has(:focus-visible)', 'outline-offset')).toBe(
      'calc(-1 * var(--focus-width))'
    );
  });

  it('a caixa de 24 px com canto de 2 px: marcada em primary, desmarcada com contorno on-surface-variant', () => {
    expect(valor(css.ingredientes, '.ingredients-list__caixa', 'width')).toBe('1.5rem');
    expect(valor(css.ingredientes, '.ingredients-list__caixa', 'height')).toBe('1.5rem');
    expect(valor(css.ingredientes, '.ingredients-list__caixa', 'border-radius')).toBe('var(--m3-forma-caixa)');
    expect(valor(css.ingredientes, '.ingredients-list__caixa', 'border')).toBe('2px solid var(--m3-on-surface-variant)');
    expect(valor(css.ingredientes, '.ingredients-list__checkbox:checked + .ingredients-list__caixa', 'background')).toBe(
      'var(--m3-primary)'
    );
    expect(valor(css.ingredientes, '.ingredients-list__checkbox:checked + .ingredients-list__caixa', 'color')).toBe(
      'var(--m3-on-primary)'
    );
    expect(valor(css.ingredientes, '.ingredients-list__caixa', 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
  });

  it('o check entra por opacidade sempre e com scale só no motion-ok; sem transform parado fora dele', () => {
    expect(valor(css.ingredientes, '.ingredients-list__check', 'opacity')).toBe('0');
    expect(valor(css.ingredientes, '.ingredients-list__checkbox:checked + .ingredients-list__caixa .ingredients-list__check', 'opacity')).toBe('1');
    expect(foraDe(css.ingredientes, MOVIMENTO_OK)).not.toMatch(/transform|rotate/);
    expect(valor(css.ingredientes, '.ingredients-list__check', 'transform', MOVIMENTO_OK)).toBe('scale(0)');
    expect(css.movimento).toMatch(/\.ingredients-list__check/);
    const reduzido = blocos(css.movimento).lista.find(([c]) => c === MOVIMENTO_REDUZIDO)?.[1] ?? '';
    expect(reduzido).toMatch(/\.ingredients-list__check/);
  });

  it('adicionais em lista segmentada: blocos brancos, vão de 2 px e cantos 20/4 pela posição', () => {
    expect(valor(css.adicionais, '.additionals-list', 'gap')).toBe('var(--m3-vao-segmento)');
    expect(valor(css.adicionais, '.additionals-list__item', 'background')).toBe('var(--m3-surface-container-lowest)');
    expect(valor(css.adicionais, '.additionals-list__item', '--m3-item-canto-cima')).toBe('var(--m3-forma-xs)');
    expect(valor(css.adicionais, '.additionals-list__item:first-child', '--m3-item-canto-cima')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.adicionais, '.additionals-list__item:last-child', '--m3-item-canto-baixo')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.adicionais, '.additionals-list__price', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(css.adicionais).not.toMatch(/border-top/);
  });
});

describe('pares novos do Cardápio e do modal (§8)', () => {
  const { ler } = lerTokens(tokens);
  const duasCasas = (n) => Math.floor(n * 100) / 100;
  const ESPERADOS = [
    // O mínimo subiu para 4,5 na etapa 8: o primary passou a ser texto (Ver itens, rótulo do campo com foco)
    ['m3-primary', 'm3-surface-container-lowest', undefined, 4.5, 6.43],
    ['m3-primary', 'm3-camada-pressionada', 'm3-surface-container-lowest', 3, 5.26],
    ['m3-on-surface-variant', 'm3-camada-pressionada', 'm3-surface-container', 4.5, 6.55],
    ['m3-primary', 'm3-surface-container', undefined, 4.5, 5.52],
    ['m3-outline', 'm3-surface-container-lowest', undefined, 3, 4.48],
    ['m3-on-surface', 'm3-camada-pressionada', 'm3-surface-container-lowest', 4.5, 14.0],
    ['m3-on-surface-variant', 'm3-camada-pressionada', 'm3-surface-container-lowest', 4.5, 7.6],
    ['m3-secondary', 'm3-camada-pressionada', 'm3-surface-container', 3, 4.54],
  ];

  it.each(ESPERADOS)('%s sobre %s (%s): mínimo %s, medido %s', (frente, fundo, sobre, minimo, medido) => {
    const par = PARES_CARDAPIO.find((p) => p.frente === frente && p.fundo === fundo && p.sobre === sobre);
    expect(par, 'par em PARES_CARDAPIO').toBeTruthy();
    expect(par.minimo).toBe(minimo);
    expect(duasCasas(medirPar(ler, par))).toBe(medido);
  });
});
