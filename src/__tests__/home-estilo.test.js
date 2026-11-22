// @vitest-environment node
// Estilo da Home na produção (SPEC-material §10.3): a camada dos lobos do cookie do destaque, na
// parcial do M3CartaoLanche, e o chip da seção dos adicionais (etapa 5a), compilados pelo sass-embedded
// (o mesmo compilador do build). Lidos pelo node:fs (no Vitest, um .scss importado com ?raw chega
// vazio); o alias @/ é resolvido por um importador.
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { beforeAll, describe, expect, it } from 'vitest';
import { PARES_HOME } from '@/utils/contraste';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

let css = '';
let cssMonte = '';
beforeAll(() => {
  const sass = initCompiler();
  const compilar = (parcial) => {
    try {
      return sass.compile(`${SRC}assets/styles/${parcial}`, { importers: [ALIAS] }).css;
    } catch {
      return '';
    }
  };
  css = compilar('components/_m3-cartao-lanche.scss');
  cssMonte = compilar('pages/home/_secao-monte.scss');
  sass.dispose();
});

// Declarações das regras cujo seletor é exatamente `seletor`, fora de @media, na ordem do CSS. O Sass
// divide uma regra em duas quando um @include com @media vem antes das outras declarações.
function regra(seletor, fonte = css) {
  const semMedia = fonte.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '');
  const achados = [...semMedia.matchAll(/([^{}]+)\{([^{}]*)\}/g)].filter(([, sel]) => sel.trim() === seletor);
  if (!achados.length) return null;
  return Object.fromEntries(
    achados
      .flatMap(([, , corpo]) => corpo.split(';'))
      .map((d) => d.trim())
      .filter(Boolean)
      .map((d) => [d.slice(0, d.indexOf(':')).trim(), d.slice(d.indexOf(':') + 1).trim()])
  );
}

describe('cookie do destaque (§10.3)', () => {
  it('a camada tem o mesmo cookie, em primary, um pouco maior por inset negativo e atrás da foto', () => {
    expect(regra('.m3-cartao__lobos')).toEqual({
      position: 'absolute',
      inset: 'calc(-1 * var(--space-1))',
      'z-index': 'var(--m3-z-fundo)',
      'clip-path': 'var(--m3-forma-cookie)',
      background: 'var(--m3-primary)',
    });
  });

  it('o invólucro isola a camada e ocupa o lugar da foto', () => {
    expect(regra('.m3-cartao--destaque .m3-cartao__cookie')).toMatchObject({
      position: 'relative',
      isolation: 'isolate',
      width: '100%',
      'max-width': '15rem',
      'align-self': 'center',
    });
  });

  it('nada na parcial usa transform', () => {
    expect(css.length).toBeGreaterThan(0);
    expect(css).not.toMatch(/transform/);
  });
});

// O chip dos adicionais é informação, e não filter chip [60]: na captura parada em 390, o fundo
// tertiary-container cheio parecia selecionado (crítico da etapa 5a). Fica a reserva neutra do desenho
// (§7.12 e §11), sem estado, cursor de ação nem transição, e com borda nos modos de contraste.
describe('chip dos adicionais (etapa 5a)', () => {
  it('fundo neutro, nome em on-surface e acréscimo em on-surface-variant, no canto small', () => {
    expect(regra('.m3-monte__chip', cssMonte)).toMatchObject({
      'min-height': '2rem',
      'border-radius': 'var(--m3-forma-s)',
      background: 'var(--m3-surface-container-high)',
      color: 'var(--m3-on-surface)',
    });
    expect(regra('.m3-monte__preco', cssMonte)).toMatchObject({
      color: 'var(--m3-on-surface-variant)',
      'white-space': 'nowrap',
    });
  });

  it('sem estado, cursor de ação, transição nem transform; borda nos modos de contraste', () => {
    expect(cssMonte.length).toBeGreaterThan(0);
    expect(cssMonte).not.toMatch(/tertiary|:hover|:active|:focus|cursor|transition|transform|animation/);
    expect(cssMonte).toMatch(/@media \(forced-colors: active\)\s*\{\s*\.m3-monte__chip\s*\{\s*border: 1px solid CanvasText/);
    expect(cssMonte).toMatch(/@media \(prefers-contrast: more\)\s*\{\s*\.m3-monte__chip\s*\{\s*border: 1px solid var\(--m3-outline\)/);
  });

  it('as tintas do chip sobre o fundo dele têm par de texto (4,5) em src/utils/contraste.js', () => {
    const papel = (valor) => valor?.match(/^var\(--(m3-[a-z-]+)\)$/)?.[1];
    const fundo = papel(regra('.m3-monte__chip', cssMonte)?.background);
    const tintas = [regra('.m3-monte__chip', cssMonte)?.color, regra('.m3-monte__preco', cssMonte)?.color].map(papel);
    expect(tintas).toHaveLength(2);
    for (const frente of tintas) {
      const par = PARES_HOME.find((p) => p.frente === frente && p.fundo === fundo);
      expect(par?.minimo, `${frente} sobre ${fundo}`).toBeGreaterThanOrEqual(4.5);
    }
  });
});
