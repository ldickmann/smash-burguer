// @vitest-environment node
// Estilo do M3RotuloStatus (desenho do admin, §5.5, §6 e §9): a parcial compilada pelo sass-embedded,
// o mesmo compilador do build. Recebe as asserções do "Recebido" do perfil, que saíram do
// conta-estilo.test.js, mais o letter-spacing do label-l. Mesmo padrão do conta-estilo.test.js.
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { beforeAll, describe, expect, it } from 'vitest';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ESTILOS = `${SRC}assets/styles/`;
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };
const CORES_FORCADAS = '@media (forced-colors: active)';
const MAIS_CONTRASTE = '@media (prefers-contrast: more)';

let css = '';
beforeAll(() => {
  const sass = initCompiler();
  try {
    css = sass.compile(`${ESTILOS}components/ui/_m3-rotulo-status.scss`, { importers: [ALIAS] }).css;
  } catch {
    css = '';
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

describe('M3RotuloStatus (§5.5 e §7.2)', () => {
  const status = '.m3-status';

  it('a parcial compila', () => {
    expect(css).not.toBe('');
  });

  it('cada tom: o papel sobre o contêiner dele', () => {
    for (const tom of ['info', 'aviso', 'sucesso']) {
      expect(valor(css, `.m3-status--${tom}`, 'color')).toBe(`var(--m3-${tom})`);
      expect(valor(css, `.m3-status--${tom}`, 'background')).toBe(`var(--m3-${tom}-container)`);
    }
  });

  it('forma-s, 4 e 8 de padding, label-l 500 com o tracking do label-l', () => {
    expect(valor(css, status, 'border-radius')).toBe('var(--m3-forma-s)');
    expect(valor(css, status, 'padding')).toBe('var(--space-1) var(--space-2)');
    expect(valor(css, status, 'font-size')).toBe('var(--m3-label-l)');
    expect(valor(css, status, 'line-height')).toBe('var(--m3-label-l-linha)');
    expect(valor(css, status, 'font-weight')).toBe('500');
    expect(valor(css, status, 'letter-spacing')).toBe('var(--m3-label-l-tracking)');
  });

  it('não encolhe nem quebra: o rótulo vai inteiro para a linha de baixo', () => {
    expect(valor(css, status, 'flex-shrink')).toBe('0');
    expect(valor(css, status, 'white-space')).toBe('nowrap');
  });

  it('sem cursor, sem camada e sem margem própria (a margem é de quem usa)', () => {
    expect(valor(css, status, 'cursor')).toBeUndefined();
    expect(valor(css, `${status}::before`, 'content')).toBeUndefined();
    expect(css).not.toMatch(/::before|::after|:hover|:focus|transition|transform/);
    expect(valor(css, status, 'margin-inline-start')).toBeUndefined();
  });

  it('nos modos de contraste, a borda desenha a caixa', () => {
    expect(valor(css, status, 'border')).toBeUndefined();
    expect(valor(css, status, 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
    expect(valor(css, status, 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });
});
