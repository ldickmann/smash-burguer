// @vitest-environment node
// Base de estilo do M3 (SPEC-material §2.3, §2.8 e §3, itens 2, 6, 8 e 9): a lista do movimento
// reduzido, os títulos fora da Brasa, o anel de 3 px, o espaçamento entre letras por papel e os
// mixins de base/_m3.scss. Os arquivos são lidos pelo node:fs (no Vitest, um .scss importado com
// ?raw chega vazio) e compilados pelo sass-embedded, o mesmo compilador do build.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { lerTokens } from '@/utils/contraste';

const BASE = fileURLToPath(new URL('../assets/styles/base/', import.meta.url));
const lerFonte = (nome) => readFileSync(`${BASE}${nome}`, 'utf8').replace(/\r\n/g, '\n');

let sass;
beforeAll(() => {
  sass = initCompiler();
});
afterAll(() => sass?.dispose());

const compilarArquivo = (nome) => sass.compile(`${BASE}${nome}`).css;
const compilarTexto = (fonte) => sass.compileString(fonte, { loadPaths: [BASE] }).css;

// Regras sem chaves dentro (as de dentro de um @media também entram): [seletores, declarações]
const regras = (css) =>
  [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, seletor, corpo]) => [
    seletor.split(',').map((s) => s.trim()),
    corpo.trim().replace(/\s+/g, ' '),
  ]);
const regraDe = (css, seletor) => regras(css).find(([seletores]) => seletores.includes(seletor))?.[1] ?? '';

describe('base de estilo do M3', () => {
  it('movimento reduzido cobre as classes do M3', () => {
    const css = compilarArquivo('_motion.scss');
    // Só o bloco do @media: na saída do Sass, ele fecha com a chave na coluna 0
    const reduzido = css.split('@media (prefers-reduced-motion: reduce) {')[1]?.split('\n}')[0] ?? '';
    // O check do BaseButton (.btn__check) é o .m3-botao__check da §3, item 6, com o bloco do BaseButton
    const classes = ['.m3-prensa__disco', '.m3-dividido__seta--baixo', '.m3-folha', '.m3-dividido__check', '.m3-badge', '.btn__check'];
    const semTransformNone = classes.filter((classe) => !regraDe(reduzido, classe).includes('transform: none'));
    expect(semTransformNone).toEqual([]);
  });

  // A fonte de display da Brasa não é escrita aqui: o nome dela neste arquivo reprovaria a busca de
  // "fontes da Brasa" da §13.2, que também varre src/__tests__. Toda família tem de ser a do M3.
  it('títulos sem a Brasa', () => {
    const fonte = lerFonte('_typography.scss');
    expect(fonte).not.toMatch(/\.display\b/);
    expect(fonte).not.toMatch(/text-transform:\s*uppercase/);
    const familias = [...compilarArquivo('_typography.scss').matchAll(/font-family:\s*([^;]+);/g)].map(([, valor]) => valor.trim());
    expect(familias.length).toBeGreaterThan(0);
    expect(familias.filter((valor) => valor !== 'var(--m3-fonte)')).toEqual([]);
  });

  it('h1 a h3 nos papéis do M3', () => {
    const css = compilarArquivo('_typography.scss');
    const h1 = regraDe(css, 'h1');
    for (const declaracao of [
      'font-family: var(--m3-fonte)',
      'font-size: var(--text-page)',
      'font-weight: 500',
      'line-height: var(--leading-display)',
      'font-synthesis: none',
    ]) {
      expect(h1).toContain(declaracao);
    }
    expect(regraDe(css, 'h2')).toContain('font-size: var(--m3-headline-s)');
    expect(regraDe(css, 'h2')).toContain('font-weight: 400');
    expect(regraDe(css, 'h3')).toContain('font-size: var(--m3-title-m)');
    expect(regraDe(css, 'h3')).toContain('font-weight: 500');
  });

  it('anel de foco de 3 px', () => {
    const { tokens } = lerTokens(lerFonte('_tokens.scss'));
    expect(tokens.get('focus-width')).toBe('3px');
  });

  it('espaçamento entre letras por papel, com os valores da §2.3', () => {
    const { tokens } = lerTokens(lerFonte('_tokens.scss'));
    const esperado = {
      'display-l': '-0.015625rem',
      'display-m': '0',
      'display-s': '0',
      'headline-m': '0',
      'headline-s': '0',
      'title-l': '0',
      'title-m': '0',
      'body-l': '0.03125rem',
      'body-m': '0.015625rem',
      'body-s': '0',
      'label-l': '0.00625rem',
      'label-m': '0.03125rem',
      'label-s': '0',
    };
    const lido = Object.fromEntries(Object.keys(esperado).map((papel) => [papel, tokens.get(`m3-${papel}-tracking`)]));
    expect(lido).toEqual(esperado);
  });

  it('os seis mixins compilam, e o módulo sozinho não gera CSS', () => {
    expect(compilarTexto('@use "m3";').trim()).toBe('');

    const css = compilarTexto(`
      @use "m3" as *;
      .a { @include tipo(title-m, 500); }
      .b { @include camada-de-estado; }
      .c { @include anel-interno; }
      .d { @include troca-de-forma(var(--m3-forma-full), var(--m3-forma-m)); }
      .e { @include reserva-de-sombra; }
      .f { @include linhas(2); }
    `);
    const a = regraDe(css, '.a');
    expect(a).toContain('font-family: var(--m3-fonte)');
    expect(a).toContain('font-size: var(--m3-title-m)');
    expect(a).toContain('font-weight: 500');
    expect(a).toContain('line-height: var(--m3-title-m-linha)');
    expect(regraDe(css, '.b::before')).toContain('background: currentColor');
    expect(regraDe(css, '.c:focus-visible')).toContain('outline-offset: calc(-1 * var(--focus-width))');
    expect(regraDe(css, '.d:active::after')).toContain('opacity: 1');
    expect(css).toContain('@media (forced-colors: active)');
    expect(regraDe(css, '.f')).toContain('-webkit-line-clamp: 2');
  });
});
