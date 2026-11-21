// @vitest-environment node
// Estilo da Home na produção (SPEC-material §10.3): a camada dos lobos do cookie do destaque, na
// parcial do M3CartaoLanche, compilada pelo sass-embedded (o mesmo compilador do build). Lida pelo
// node:fs (no Vitest, um .scss importado com ?raw chega vazio); o alias @/ é resolvido por um importador.
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { beforeAll, describe, expect, it } from 'vitest';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

let css = '';
beforeAll(() => {
  const sass = initCompiler();
  try {
    css = sass.compile(`${SRC}assets/styles/components/_m3-cartao-lanche.scss`, { importers: [ALIAS] }).css;
  } catch {
    css = '';
  } finally {
    sass.dispose();
  }
});

// Declarações da primeira regra cujo seletor é exatamente `seletor`, fora de @media
function regra(seletor) {
  const semMedia = css.replace(/@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '');
  const achado = [...semMedia.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(([, sel]) => sel.trim() === seletor);
  if (!achado) return null;
  return Object.fromEntries(
    achado[2]
      .split(';')
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
