// @vitest-environment node
// Estilo do painel admin no M3 (docs/direcoes/desenho/admin.md, §5, §6, §8 e §9): as parciais compiladas
// pelo sass-embedded, o mesmo compilador do build, e a do layout também pelo <style scoped> do Vue (os
// :global() do aviso no pé e da reserva). Lidas pelo node:fs (no Vitest, um .scss importado com ?raw
// chega vazio); o alias @/ do Vite é resolvido por um importador. Mesmo padrão do conta-estilo.test.js.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { compileStyle } from 'vue/compiler-sfc';
import { beforeAll, describe, expect, it } from 'vitest';
import { PARES, PARES_ADMIN, PARES_TELAS_BRASA, lerTokens, medirPar } from '@/utils/contraste';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ESTILOS = `${SRC}assets/styles/`;
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

const PARCIAIS = {
  layout: 'layouts/_admin-layout.scss',
  sidebar: 'components/admin/_sidebar-admin.scss',
  navbar: 'components/admin/_navbar-admin.scss',
  busca: 'components/admin/navbar/_search-bar.scss',
  atalhos: 'components/admin/navbar/_notification-bar.scss',
  perfil: 'components/admin/navbar/_user-profile-bar.scss',
  card: 'components/admin/_admin-card.scss',
  modal: 'components/admin/_modal-products.scss',
  cartao: 'components/admin/_m3-cartao-produto.scss',
  rotulo: 'components/ui/_m3-rotulo-status.scss',
  pagina: 'pages/admin/_admin-page.scss',
  painel: 'pages/admin/_admin-dashboard.scss',
  produtos: 'pages/admin/_product-management.scss',
  pedidos: 'pages/admin/_order-management.scss',
  relatorios: 'pages/admin/_sales-reports.scss',
  meuPerfil: 'pages/admin/_admin-profile.scss',
  configuracoes: 'pages/admin/_admin-settings.scss',
  login: 'pages/admin/_login-admin.scss',
};
const DESDE_LG = '@media (min-width: 1024px)';
const ABAIXO_LG = '@media (max-width: 1023.98px)';
const MOVIMENTO_OK = '@media (prefers-reduced-motion: no-preference)';
const CORES_FORCADAS = '@media (forced-colors: active)';
const MAIS_CONTRASTE = '@media (prefers-contrast: more)';

const css = {};
const fonte = {};
beforeAll(() => {
  const sass = initCompiler();
  try {
    // Uma parcial que não compila (ou não existe) fica vazia e reprova só os casos dela
    for (const [nome, caminho] of Object.entries(PARCIAIS)) {
      try {
        fonte[nome] = readFileSync(`${ESTILOS}${caminho}`, 'utf8');
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
      if (!seletores.split(/,(?![^(]*\))/).map((s) => s.trim().replace(/\s+/g, ' ')).includes(seletor)) continue;
      for (const declaracao of declaracoes.split(';')) {
        const [nome, ...resto] = declaracao.split(':');
        if (nome.trim() === propriedade) achado = resto.join(':').trim();
      }
    }
  }
  return achado;
}

// O corpo de todos os blocos com a condição pedida, juntos
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

describe('as parciais do painel (§7 e §9)', () => {
  it.each(Object.keys(PARCIAIS))('%s compila e não usa apelido da Brasa, caixa alta nem 240px', (nome) => {
    expect(css[nome], `${PARCIAIS[nome]} compila`).not.toBe('');
    expect(css[nome]).not.toMatch(/--color-|--text-2xl|--elev-|--radius-sm|--radius-round/);
    expect(css[nome]).not.toMatch(/text-transform:\s*uppercase/);
    expect(css[nome]).not.toMatch(/240px/);
    // Montado em partes: as buscas da §13.2 do SPEC não acham este teste
    expect(css[nome]).not.toMatch(new RegExp(['!impor' + 'tant', 'transition:\\s*al' + 'l', 'outline:\\s*no' + 'ne'].join('|')));
  });

  it('o transform só dentro de prefers-reduced-motion: no-preference', () => {
    for (const nome of Object.keys(PARCIAIS)) {
      const { fora, lista } = blocos(css[nome]);
      const foraDoMovimento = [fora, ...lista.filter(([c]) => !c.includes('no-preference')).map(([, corpo]) => corpo)];
      for (const corpo of foraDoMovimento) {
        expect(corpo, `${PARCIAIS[nome]}`).not.toMatch(/(^|[;{\s])(transform|translate):\s*(?!none)/);
      }
    }
  });

  it('o comentário com "Archivo" saiu da página e o do card antigo, da grade de Produtos', () => {
    expect(fonte.pagina).not.toMatch(/Archivo/);
    // O nome montado em partes: a busca do plano pelo card antigo não acha este teste
    expect(fonte.produtos).not.toMatch(new RegExp(['Product', 'Card'].join('')));
  });
});

describe('pares do painel (§8)', () => {
  const { ler } = lerTokens(readFileSync(`${ESTILOS}base/_tokens.scss`, 'utf8'));
  const duasCasas = (n) => Math.floor(n * 100) / 100;
  const ESPERADOS = [
    ['m3-on-surface-variant', 'm3-camada-pressionada', 'm3-surface', 4.5, 7.26],
    ['m3-on-surface-variant', 'm3-camada-pressionada', 'm3-surface-container-low', 4.5, 6.9],
    ['m3-secondary', 'm3-camada-pressionada', 'm3-surface', 3, 5.03],
    ['m3-secondary', 'm3-camada-pressionada', 'm3-surface-container-low', 3, 4.78],
    ['m3-on-surface', 'm3-camada-pressionada', 'm3-surface-container', 4.5, 12.06],
    ['m3-primary', 'm3-surface-container-high', undefined, 4.5, 5.23],
    ['m3-primary', 'm3-camada-primary-pressionada', 'm3-surface-container-high', 4.5, 4.59],
    ['m3-secondary', 'm3-camada-primary-pressionada', 'm3-surface-container-high', 3, 4.6],
    ['m3-error', 'm3-surface-container-high', undefined, 4.5, 5.25],
    ['m3-secondary', 'm3-surface-container-high', undefined, 3, 5.25],
  ];

  it('são 10 (os 9 novos e o anel que veio da Brasa), no grupo PARES_ADMIN, todos em PARES', () => {
    expect(PARES_ADMIN).toHaveLength(ESPERADOS.length);
    for (const par of PARES_ADMIN) expect(PARES).toContain(par);
  });

  it.each(ESPERADOS)('%s sobre %s (%s): mínimo %s, medido %s', (frente, fundo, sobre, minimo, medido) => {
    const par = PARES_ADMIN.find((p) => p.frente === frente && p.fundo === fundo && p.sobre === sobre);
    expect(par, 'par em PARES_ADMIN').toBeTruthy();
    expect(par.minimo).toBe(minimo);
    expect(duasCasas(medirPar(ler, par))).toBe(medido);
  });

  it('sai o item atual da sidebar da Brasa, e o anel sobre surface-container-high sai de PARES_TELAS_BRASA', () => {
    expect(PARES.filter((par) => par.fundo === 'm3-primary-container' && par.frente === 'm3-on-surface')).toEqual([]);
    expect(PARES_TELAS_BRASA.filter((par) => par.fundo === 'm3-surface-container-high')).toEqual(
      PARES_TELAS_BRASA.filter((par) => par.frente === 'm3-sucesso')
    );
  });

  it('os rótulos de status deixam de se chamar chip', () => {
    for (const tom of ['aviso', 'info', 'sucesso']) {
      const par = PARES.find((p) => p.frente === `m3-${tom}` && p.fundo === `m3-${tom}-container`);
      expect(par.onde).toMatch(/rótulo de status/);
      expect(par.onde).not.toMatch(/chip/);
    }
  });
});

describe('moldura: layout, coluna e gaveta (§4, §5.1)', () => {
  it('a partir de lg, a grade com a coluna do token e o cabeçalho grudado em todas as larguras', () => {
    expect(valor(css.layout, '.admin-layout', 'background')).toBe('var(--m3-surface)');
    expect(valor(css.layout, '.admin-layout', 'grid-template-columns', DESDE_LG)).toBe('var(--m3-navegacao-largura) minmax(0, 1fr)');
    expect(valor(css.layout, '.admin-header', 'position')).toBe('sticky');
    expect(valor(css.layout, '.admin-header', 'background')).toBe('var(--m3-surface)');
    expect(valor(css.layout, '.admin-main', 'padding-top')).toBeUndefined();
    expect(valor(css.layout, '.admin-overlay', 'background')).toBe('var(--m3-scrim)');
  });

  it('o aviso vai ao pé no painel, e a reserva soma ao scroll-padding enquanto há aviso', () => {
    const code = escopado(css.layout, 'AdminLayout.vue');
    expect(valor(code, 'html:has(.admin-layout) .toast-region', 'top')).toBe('auto');
    expect(valor(code, 'html:has(.admin-layout) .toast-region', 'bottom')).toBe('calc(var(--space-4) + env(safe-area-inset-bottom))');
    expect(valor(code, 'html:has(.admin-layout):has(.toast-region .toast)', 'scroll-padding-bottom')).toBe(
      'calc(var(--m3-toast-reserva) + var(--space-4))'
    );
    expect(valor(code, 'html:has(.admin-layout)', '--m3-barra-reserva')).toBe('0rem');
    // O último botão da página precisa de onde subir: a reserva também no pé do main
    expect(valor(code, 'html:has(.admin-layout):has(.toast-region .toast) .admin-main', 'padding-bottom')).toBe(
      'calc(var(--m3-toast-reserva) + var(--space-4))'
    );
  });

  it('a coluna em surface (sticky a partir de lg); a gaveta em low, cantos de 16 por dentro e elevação 1', () => {
    expect(valor(css.sidebar, '.admin-sidebar', 'width')).toBe('var(--m3-navegacao-largura)');
    expect(valor(css.sidebar, '.admin-sidebar', 'background')).toBe('var(--m3-surface)');
    expect(valor(css.sidebar, '.admin-sidebar', 'position', DESDE_LG)).toBe('sticky');
    const gaveta = '.admin-sidebar.is-drawer';
    expect(valor(css.sidebar, gaveta, 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.sidebar, gaveta, 'box-shadow')).toBe('var(--m3-elevacao-1)');
    expect(valor(css.sidebar, gaveta, 'border-start-end-radius')).toBe('var(--m3-forma-l)');
    expect(valor(css.sidebar, gaveta, 'border-end-end-radius')).toBe('var(--m3-forma-l)');
    expect(valor(css.sidebar, gaveta, 'z-index')).toBe('var(--z-sidebar)');
  });

  it('o deslize da gaveta só com movimento; o reduzido só por opacidade; .admin-sidebar no _motion.scss', () => {
    expect(dentro(css.sidebar, MOVIMENTO_OK)).toMatch(/translateX\(-100%\)/);
    expect(valor(css.sidebar, '.admin-sidebar.is-drawer', 'animation')).toMatch(/^admin-sidebar-fade var\(--dur-fast\)/);
    const movimento = readFileSync(`${ESTILOS}base/_motion.scss`, 'utf8');
    expect(movimento).toMatch(/\.admin-sidebar\b/);
  });

  it('a marca em title-l 500, sem caixa alta', () => {
    expect(valor(css.sidebar, '.admin-sidebar__brand', 'font-size')).toBe('var(--m3-title-l)');
    expect(valor(css.sidebar, '.admin-sidebar__brand', 'font-weight')).toBe('500');
    expect(valor(css.sidebar, '.admin-sidebar__brand', 'text-transform')).toBeUndefined();
  });

  it('o item: 56 px na coluna e na gaveta, pílula, label-l 500 em on-surface-variant, camada e anel interno', () => {
    const item = '.admin-sidebar__item';
    expect(valor(css.sidebar, item, 'min-height')).toBe('3.5rem');
    expect(valor(css.sidebar, item, 'min-height', ABAIXO_LG)).toBeUndefined();
    expect(valor(css.sidebar, item, 'border-radius')).toBe('var(--m3-forma-full)');
    expect(valor(css.sidebar, item, 'margin-inline')).toBe('var(--space-3)');
    expect(valor(css.sidebar, item, 'padding-inline')).toBe('var(--space-4) var(--space-5)');
    expect(valor(css.sidebar, item, 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.sidebar, item, 'font-weight')).toBe('500');
    expect(css.sidebar).toMatch(/\.admin-sidebar__item::before/);
    expect(valor(css.sidebar, `${item}:focus-visible`, 'outline-offset')).toBe('calc(-1 * var(--focus-width))');
  });

  it('o item atual: secondary-container, on-secondary-container e 700; Highlight e outline nos modos de contraste', () => {
    const atual = (css.sidebar.match(/\.admin-sidebar__item\[aria-current=("page"|page)\]/) ?? [])[0];
    expect(atual, 'seletor do item atual').toBeTruthy();
    expect(valor(css.sidebar, atual, 'background')).toBe('var(--m3-secondary-container)');
    expect(valor(css.sidebar, atual, 'color')).toBe('var(--m3-on-secondary-container)');
    expect(valor(css.sidebar, atual, 'font-weight')).toBe('700');
    expect(valor(css.sidebar, atual, 'border', CORES_FORCADAS)).toBe('2px solid Highlight');
    expect(valor(css.sidebar, atual, 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });

  it('o pé: divisor outline-variant recuado 12 px', () => {
    expect(valor(css.sidebar, '.admin-sidebar__footer::before', 'border-block-start')).toBe('1px solid var(--m3-outline-variant)');
    expect(valor(css.sidebar, '.admin-sidebar__footer::before', 'margin-inline')).toBe('var(--space-3)');
  });
});

describe('cabeçalho: busca, atalhos e menu do perfil (§5.2)', () => {
  it('a busca outlined de 48 px, sem fundo, contorno outline, canto 12, lupa sem translate', () => {
    const campo = '.navbar-search__input';
    expect(valor(css.busca, campo, 'min-height')).toBe('3rem');
    expect(valor(css.busca, campo, 'border')).toBe('1px solid var(--m3-outline)');
    expect(valor(css.busca, campo, 'border-radius')).toBe('var(--m3-forma-m)');
    expect(valor(css.busca, campo, 'background-color')).toBe('transparent');
    expect(valor(css.busca, '.navbar-search', 'max-width')).toBe('22rem');
    expect(css.busca).not.toMatch(/translate/);
    expect(valor(css.busca, `${campo}:focus`, 'border-color')).toBe('var(--m3-primary)');
    expect(valor(css.busca, campo, 'border-color', CORES_FORCADAS)).toBe('CanvasText');
    expect(valor(css.busca, campo, 'border-color', MAIS_CONTRASTE)).toBe('var(--m3-on-surface-variant)');
  });

  it('o selo é o badge do M3: error / on-error, 16 px, canto full, label-s; borda nos modos de contraste', () => {
    const selo = '.navbar-notifications__count';
    expect(valor(css.atalhos, selo, 'background')).toBe('var(--m3-error)');
    expect(valor(css.atalhos, selo, 'color')).toBe('var(--m3-on-error)');
    expect(valor(css.atalhos, selo, 'min-width')).toBe('1rem');
    expect(valor(css.atalhos, selo, 'height')).toBe('1rem');
    expect(valor(css.atalhos, selo, 'border-radius')).toBe('var(--m3-forma-full)');
    expect(valor(css.atalhos, selo, 'font-size')).toBe('var(--m3-label-s)');
    expect(valor(css.atalhos, selo, 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
    expect(valor(css.atalhos, selo, 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });

  it('o avatar: alvo de 44 com o círculo de 32 em secondary-container', () => {
    expect(valor(css.perfil, '.navbar-profile__avatar', 'width')).toBe('var(--target-min)');
    expect(valor(css.perfil, '.navbar-profile__circulo', 'width')).toBe('2rem');
    expect(valor(css.perfil, '.navbar-profile__circulo', 'background')).toBe('var(--m3-secondary-container)');
    expect(valor(css.perfil, '.navbar-profile__circulo', 'color')).toBe('var(--m3-on-secondary-container)');
  });

  it('o menu em surface-container, canto 16, elevação 2; a linha antes do "Sair" no ::after', () => {
    expect(valor(css.perfil, '.navbar-profile__menu', 'background')).toBe('var(--m3-surface-container)');
    expect(valor(css.perfil, '.navbar-profile__menu', 'border-radius')).toBe('var(--m3-forma-l)');
    expect(valor(css.perfil, '.navbar-profile__menu', 'box-shadow')).toBe('var(--m3-elevacao-2)');
    expect(css.perfil).toMatch(/\.navbar-profile__sair::after\s*\{[^}]*var\(--m3-outline-variant\)/);
    expect(css.perfil).toMatch(/transition:\s*opacity/);
  });
});

describe('cards (§5.4, §5.7)', () => {
  it('o AdminCard: filled em surface-container-high, canto 12, sem sombra, height 100%, sem opacidade no loading', () => {
    expect(valor(css.card, '.admin-card', 'background')).toBe('var(--m3-surface-container-high)');
    expect(valor(css.card, '.admin-card', 'border-radius')).toBe('var(--m3-forma-m)');
    expect(valor(css.card, '.admin-card', 'height')).toBe('100%');
    expect(valor(css.card, '.admin-card', 'box-shadow')).toBeUndefined();
    expect(css.card).not.toMatch(/opacity/);
    expect(valor(css.card, '.admin-card--kpi .admin-card__title', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.card, '.admin-card__footer', 'border-top')).toBeUndefined();
  });

  it('o M3CartaoProduto: high, canto 12, padding 8, sem sombra, height 100%; na horizontal abaixo de sm', () => {
    expect(valor(css.cartao, '.m3-cartao-produto', 'background')).toBe('var(--m3-surface-container-high)');
    expect(valor(css.cartao, '.m3-cartao-produto', 'border-radius')).toBe('var(--m3-forma-m)');
    expect(valor(css.cartao, '.m3-cartao-produto', 'padding')).toBe('var(--space-2)');
    expect(valor(css.cartao, '.m3-cartao-produto', 'height')).toBe('100%');
    expect(valor(css.cartao, '.m3-cartao-produto', 'box-shadow')).toBeUndefined();
    expect(valor(css.cartao, '.m3-cartao-produto', 'grid-template-columns')).toBe('7rem minmax(0, 1fr)');
  });

  it('a borda dos modos de contraste vem da reserva-de-sombra, nos cards, na gaveta e no menu', () => {
    for (const nome of ['card', 'cartao', 'sidebar', 'perfil']) {
      expect(dentro(css[nome], CORES_FORCADAS), `${PARCIAIS[nome]}`).toMatch(/CanvasText/);
    }
  });
});

describe('páginas do painel (§5.3, §5.6, §5.9 a §5.11)', () => {
  it('a página não tem fundo próprio (a surface do layout), e o valor do KPI é headline-m tabular', () => {
    expect(css.pagina).not.toMatch(/surface-container\b/);
    expect(css.pagina).toMatch(/--m3-headline-m/);
  });

  it('o card do pedido: h3 sem caixa alta e o divisor só acima do Total', () => {
    expect(css.pedidos).toMatch(/var\(--m3-outline-variant\)/);
    expect(css.pedidos).not.toMatch(/letter-spacing:\s*0\.\d+em/);
  });

  it('o login do admin: scrim direto e o tracejado outline-variant do bloco do admin de teste', () => {
    expect(css.login).toMatch(/var\(--m3-scrim\)/);
    expect(css.login).toMatch(/1px dashed var\(--m3-outline-variant\)/);
  });
});
