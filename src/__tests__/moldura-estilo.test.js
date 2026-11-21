// @vitest-environment node
// Moldura da loja no M3 (SPEC-material §5.1, §4.3 e §10.2): as parciais compiladas pelo
// sass-embedded, o mesmo compilador do build. Lidas pelo node:fs (no Vitest, um .scss importado com
// ?raw chega vazio); o alias @/ do Vite é resolvido por um importador.
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { compileStyle } from 'vue/compiler-sfc';
import { beforeAll, describe, expect, it } from 'vitest';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ESTILOS = `${SRC}assets/styles/`;
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

const PARCIAIS = {
  layout: 'layouts/_main-layout.scss',
  reset: 'base/_reset.scss',
  abas: 'components/ui/_category-tabs.scss',
  ferramentas: 'components/_m3-barra-ferramentas.scss',
  cabecalho: 'components/_m3-barra-superior.scss',
  rodape: 'components/_m3-rodape.scss',
  toast: 'components/ui/_app-toast.scss',
};
const ABAIXO_MD = '@media (max-width: 767.98px)';
const ABAIXO_LG = '@media (max-width: 1023.98px)';
const DESDE_LG = '@media (min-width: 1024px)';
const DESDE_MD = '@media (min-width: 768px)';

const css = {};
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

describe('moldura da loja no M3', () => {
  it('abaixo de lg, a página e a rolagem reservam o espaço da toolbar no pé', () => {
    expect(valor(css.layout, '.main-layout', 'padding-bottom', ABAIXO_LG)).toBe('var(--m3-barra-reserva)');
    expect(valor(css.layout, '.main-layout', 'padding-bottom')).toBeUndefined();
    expect(valor(css.reset, 'html', 'scroll-padding-bottom', ABAIXO_LG)).toBe('var(--m3-barra-reserva)');
    expect(valor(css.reset, 'html', 'scroll-padding-bottom')).toBeUndefined();
    expect(valor(css.reset, 'html', 'scroll-padding-top')).toBe('calc(var(--navbar-h) + var(--space-4))');
  });

  it('o <main> não reserva mais o cabeçalho fixo da Brasa, e o rodapé fica no fim', () => {
    expect(css.layout).not.toMatch(/padding-top/);
    expect(valor(css.layout, '.main-layout', 'min-height')).toBe('100dvh');
    expect(valor(css.layout, '.main-layout__main', 'flex')).toBe('1');
  });

  it('a toolbar flutua embaixo à direita abaixo de lg e entra no cabeçalho a partir dele', () => {
    expect(valor(css.ferramentas, '.m3-ferramentas', 'position')).toBe('fixed');
    expect(valor(css.ferramentas, '.m3-ferramentas', 'right')).toBe('var(--gutter)');
    expect(valor(css.ferramentas, '.m3-ferramentas', 'bottom')).toBe('calc(var(--space-4) + env(safe-area-inset-bottom))');
    expect(valor(css.ferramentas, '.m3-ferramentas', 'z-index')).toBe('var(--z-navbar)');
    expect(valor(css.ferramentas, '.m3-ferramentas', 'position', DESDE_LG)).toBe('static');
  });

  it('o cabeçalho rola com a página abaixo de lg e fica sticky e opaco a partir dele', () => {
    expect(valor(css.cabecalho, '.m3-cabecalho', 'position')).toBeUndefined();
    expect(valor(css.cabecalho, '.m3-cabecalho', 'background')).toBe('var(--m3-surface)');
    expect(valor(css.cabecalho, '.m3-cabecalho', 'position', DESDE_LG)).toBe('sticky');
    expect(valor(css.cabecalho, '.m3-cabecalho', 'top', DESDE_LG)).toBe('0');
    expect(valor(css.cabecalho, '.m3-cabecalho__interno', 'height')).toBe('var(--navbar-h)');
  });

  it('as abas do Cardápio grudam em top: 0 abaixo de lg e sob o cabeçalho a partir dele', () => {
    expect(valor(css.abas, '.category-tabs', 'position')).toBe('sticky');
    expect(valor(css.abas, '.category-tabs', 'top')).toBe('0');
    expect(valor(css.abas, '.category-tabs', 'top', DESDE_LG)).toBe('var(--navbar-h)');
  });

  it('abaixo de md, o toast sobe acima da toolbar, só onde ela existe (snackbar acima do FAB)', () => {
    // A parcial passa também pelo <style scoped> do AppToast, como no build: o :global() do Vue
    // torna global o seletor inteiro, e um seletor mal escrito perderia o .toast-region
    const { code, errors } = compileStyle({ source: css.toast, filename: 'AppToast.vue', id: 'data-v-teste', scoped: true });
    expect(errors).toEqual([]);
    // Na base, o toast fica no pé (o painel não tem toolbar); a partir de md ele vai para o topo
    expect(valor(code, '.toast-region[data-v-teste]', 'bottom')).toBe('calc(var(--space-4) + env(safe-area-inset-bottom))');
    expect(valor(code, 'body:has(.m3-ferramentas) .toast-region', 'bottom', ABAIXO_MD)).toBe(
      'calc(var(--m3-barra-reserva) + env(safe-area-inset-bottom))'
    );
    expect(valor(code, 'body:has(.m3-ferramentas) .toast-region', 'bottom')).toBeUndefined();
    expect(code).not.toMatch(/body:has\(\.m3-ferramentas\)\s*\{/);
  });

  it('os direitos ficam empilhados abaixo de md e lado a lado a partir dele (§10.2)', () => {
    expect(valor(css.rodape, '.m3-rodape__direitos', 'display')).toBe('grid');
    expect(valor(css.rodape, '.m3-rodape__direitos', 'display', DESDE_MD)).toBe('flex');
    expect(valor(css.rodape, '.m3-rodape__direitos', 'border-top')).toBe('1px solid var(--m3-outline-variant)');
  });
});
