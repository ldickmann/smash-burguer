// @vitest-environment node
// Visual do BaseButton no M3 (SPEC-material §4.1, §6 e §7.2): a parcial compilada pelo
// sass-embedded, o mesmo compilador do build. O arquivo é lido pelo node:fs (no Vitest, um .scss
// importado com ?raw chega vazio), e o alias @/ do Vite é resolvido por um importador.
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const PARCIAL = `${SRC}assets/styles/components/ui/_base-button.scss`;
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

let css;
beforeAll(() => {
  const sass = initCompiler();
  try {
    css = sass.compile(PARCIAL, { importers: [ALIAS] }).css;
  } finally {
    sass.dispose();
  }
});
afterAll(() => {
  css = undefined;
});

// Separa o CSS em [condição, corpo] dos blocos @media/@keyframes e o resto, que vale sempre
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

// Lista de seletores dividida só nas vírgulas de fora dos parênteses (as de :is() e :where() ficam)
function separar(seletor) {
  const partes = [''];
  let nivel = 0;
  for (const c of seletor) {
    if (c === '(') nivel++;
    else if (c === ')') nivel--;
    if (c === ',' && nivel === 0) partes.push('');
    else partes[partes.length - 1] += c;
  }
  return partes.map((s) => s.trim().replace(/\s+/g, ' '));
}

const regras = (texto) =>
  [...texto.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, seletor, corpo]) => [separar(seletor), corpo]);

// Valor de uma propriedade para um seletor exato, fora dos @media: a última declaração vence
function valor(seletor, propriedade, texto = blocos(css).fora) {
  let achado;
  for (const [seletores, corpo] of regras(texto)) {
    if (!seletores.includes(seletor)) continue;
    for (const declaracao of corpo.split(';')) {
      const [nome, ...resto] = declaracao.split(':');
      if (nome.trim() === propriedade) achado = resto.join(':').trim();
    }
  }
  return achado;
}

const fundos = (seletor) => ['repouso', 'hover', 'pressionado'].map((estado) => valor(seletor, `--m3-botao-fundo-${estado}`));

// Posição da primeira regra fora dos @media com o seletor exato (a regra que falta reprova)
function posicao(seletor, texto = blocos(css).fora) {
  for (const m of texto.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (regras(m[0])[0][0].includes(seletor)) return m.index;
  }
  throw new Error(`sem regra para ${seletor}`);
}

describe('BaseButton no M3', () => {
  it('filled e tonal trocam de forma por opacidade, sem animar o canto (§7.2)', () => {
    expect(valor('.m3-botao--filled', '--m3-botao-forma-repouso')).toBe('var(--m3-forma-full)');
    expect(valor('.m3-botao--filled', '--m3-botao-forma-pressionada')).toBe('var(--m3-forma-m)');
    expect(valor('.m3-botao--filled.btn--lg', '--m3-botao-forma-pressionada')).toBe('var(--m3-forma-l)');
    expect(valor('.m3-botao--tonal', '--m3-botao-forma-pressionada')).toBe('var(--m3-forma-s)');
    expect(valor('.m3-botao--filled::after', 'opacity')).toBe('0');
    expect(valor('.m3-botao--filled:active::after', 'opacity')).toBe('1');
    expect(valor('.m3-botao--filled:active', 'border-radius')).toBe('var(--m3-botao-forma-pressionada)');

    const transicoes = [...css.matchAll(/transition(?:-property)?:([^;}]+)/g)].map(([, v]) => v);
    expect(transicoes.length).toBeGreaterThan(0);
    expect(transicoes.filter((v) => v.includes('border-radius'))).toEqual([]);
  });

  it('cada variante pinta com os papéis do mapa (§6), e o retorno troca a face', () => {
    expect(fundos('.m3-botao--filled')).toEqual(['var(--m3-primary)', 'var(--m3-primary-hover)', 'var(--m3-primary-pressed)']);
    expect(valor('.m3-botao--filled', 'color')).toBe('var(--m3-on-primary)');
    expect(fundos('.m3-botao--tonal')).toEqual([
      'var(--m3-secondary-container)',
      'var(--m3-secondary-container-hover)',
      'var(--m3-secondary-container-pressed)',
    ]);
    expect(valor('.m3-botao--tonal', 'color')).toBe('var(--m3-on-secondary-container)');
    expect(valor('.m3-botao--texto', 'color')).toBe('var(--m3-primary)');
    expect(valor('.m3-botao--texto:active::before', 'opacity')).toBe('0.1');

    expect(fundos('.m3-botao.is-retorno')).toEqual(Array(3).fill('var(--m3-primary-container)'));
    expect(valor('.m3-botao.is-retorno', 'color')).toBe('var(--m3-on-primary-container)');
    expect(valor('.btn__face--verso', 'opacity')).toBe('0');
    expect(valor('.btn.is-retorno .btn__face--frente', 'opacity')).toBe('0');
    expect(valor('.btn.is-retorno .btn__face--verso', 'opacity')).toBe('1');
  });

  it('tamanhos: sm de 40 px com alvo de 44, md de 44 e lg de 56, na escala do M3 (§4.1)', () => {
    expect(valor('.btn', 'min-height')).toBe('var(--target-min)');
    expect(valor('.btn', 'font-size')).toBe('var(--m3-label-l)');
    expect(valor('.btn', 'font-weight')).toBe('500');
    expect(valor('.btn--sm', 'min-height')).toBe('2.5rem');
    expect(valor('.btn--sm .btn__face--frente::after', 'inset')).toBe('-2px 0');
    expect(valor('.btn--lg', 'min-height')).toBe('3.5rem');
    expect(valor('.btn--lg', 'font-size')).toBe('var(--m3-title-m)');
  });

  it('desabilitado e inerte vencem a cascata (§6; desenho dos componentes base, §5.8)', () => {
    // Desabilitado: os três fundos das camadas também viram o do desabilitado, senão o ::before
    // pintaria a cor da variante por cima; contêiner on-surface a 10% e conteúdo a 38%
    const desabilitado = '.btn:is(:disabled, [aria-disabled=true])';
    expect(fundos(desabilitado)).toEqual(Array(3).fill('var(--m3-desabilitado-container)'));
    expect(valor(desabilitado, 'color')).toBe('var(--m3-desabilitado-conteudo)');
    const forcado = blocos(css).lista.filter(([c]) => c === '@media (forced-colors: active)').map(([, corpo]) => corpo).join('');
    expect(valor(desabilitado, 'color', forcado)).toBe('GrayText');
    expect(valor(desabilitado, 'border-color', forcado)).toBe('GrayText');
    // Inerte (desabilitado ou carregando): o pressionado não troca a forma nem acende a camada
    const inerte = ':is(.m3-botao--filled, .m3-botao--tonal):is(:disabled, [aria-disabled=true], .is-loading):active';
    expect(valor(inerte, 'border-radius')).toBe('var(--m3-botao-forma-repouso)');
    expect(valor(`${inerte}::before`, 'opacity')).toBe('1');
    expect(valor(`${inerte}::after`, 'opacity')).toBe('0');
    expect(valor(':is(.m3-botao--texto, .m3-botao--perigo):is(:disabled, [aria-disabled=true], .is-loading)::before', 'opacity')).toBe('0');
    // Carregando: as cores do repouso, com o hover e o pressionado neutros
    expect(valor('.m3-botao.is-loading', '--m3-botao-fundo-hover')).toBe('var(--m3-botao-fundo-repouso)');
    expect(valor('.m3-botao.is-loading', '--m3-botao-fundo-pressionado')).toBe('var(--m3-botao-fundo-repouso)');

    // Entre regras de mesma especificidade, a ordem decide
    expect(posicao('.m3-botao--filled')).toBeLessThan(posicao(desabilitado));
    expect(posicao('.m3-botao.is-retorno')).toBeLessThan(posicao(desabilitado));
    expect(posicao('.m3-botao--texto.btn--icon-only')).toBeLessThan(posicao(desabilitado));
  });

  it('o legado da Brasa saiu: sem .btn--legado nem os apelidos de cor (§5.9)', () => {
    expect(css).not.toMatch(/btn--legado/);
    expect(css).not.toMatch(/--color-|--radius-|--elev-|--glow-/);
    expect(valor('.btn', 'border-radius')).toBe('var(--m3-forma-full)');
    expect(css).not.toMatch(/translateY/);
  });

  it('perigo: text button em error que escurece para on-error-container no hover e no pressionado (§5.5)', () => {
    expect(valor('.m3-botao--perigo', 'color')).toBe('var(--m3-error)');
    expect(valor('.m3-botao--perigo', 'padding-inline')).toBe('var(--space-3)');
    const ativo = '.m3-botao--perigo:active:not(:disabled, [aria-disabled=true], .is-loading)';
    expect(valor(ativo, 'color')).toBe('var(--m3-on-error-container)');
    const hover = blocos(css).lista.filter(([c]) => c.includes('hover: hover')).map(([, corpo]) => corpo).join('');
    expect(valor('.m3-botao--perigo:hover:not(:disabled, [aria-disabled=true], .is-loading)', 'color', hover)).toBe(
      'var(--m3-on-error-container)'
    );
  });

  it('botão de ícone: sm 40 com alvo de 44, md 44 e lg 56; ícone de 20 px (24 no lg); pressionado em forma-s (§5.6)', () => {
    expect(valor('.btn--icon-only', 'width')).toBe('var(--target-min)');
    expect(valor('.btn--icon-only', 'padding')).toBe('0');
    expect(valor('.btn--icon-only .btn__icon', 'font-size')).toBe('1.25rem');
    expect(valor('.btn--icon-only.btn--sm', 'width')).toBe('2.5rem');
    expect(valor('.btn--icon-only.btn--sm .btn__face--frente::after', 'inset')).toBe('-2px');
    expect(valor('.btn--icon-only.btn--lg', 'width')).toBe('3.5rem');
    expect(valor('.btn--icon-only.btn--lg .btn__icon', 'font-size')).toBe('1.5rem');
    expect(valor('.btn--icon-only:is(.m3-botao--filled, .m3-botao--tonal)', '--m3-botao-forma-pressionada')).toBe(
      'var(--m3-forma-s)'
    );
    expect(valor('.btn--icon-only:is(.m3-botao--filled, .m3-botao--tonal).btn--lg', '--m3-botao-forma-pressionada')).toBe(
      'var(--m3-forma-m)'
    );
    expect(valor('.m3-botao--texto.btn--icon-only', 'color')).toBe('var(--m3-on-surface-variant)');
  });

  it('o tonal ganha a borda outline com prefers-contrast: more (§4.6)', () => {
    const mais = blocos(css).lista.filter(([c]) => c === '@media (prefers-contrast: more)').map(([, corpo]) => corpo).join('');
    expect(valor('.m3-botao--tonal', 'border', mais)).toBe('1px solid var(--m3-outline)');
  });

  it('transform só com movimento liberado', () => {
    const { fora, lista } = blocos(css);
    expect(fora).not.toMatch(/transform\s*:/);
    const comTransform = lista
      .filter(([condicao, corpo]) => !condicao.startsWith('@keyframes') && /transform\s*:/.test(corpo))
      .map(([condicao]) => condicao);
    expect(comTransform.length).toBeGreaterThan(0);
    expect(comTransform.filter((condicao) => !condicao.includes('prefers-reduced-motion: no-preference'))).toEqual([]);
  });
});
