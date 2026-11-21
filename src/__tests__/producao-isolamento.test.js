// @vitest-environment node
// A produção recebe cópias (SPEC-material §4.1): nenhum arquivo de src/ fora de src/direcoes/ importa
// de src/direcoes/. O único elo permitido é o src/router/index.js, que registra as rotas do acervo
// (só no yarn dev). Os arquivos são lidos pelo node:fs (no Vitest, um .scss importado com ?raw chega
// vazio). Ficam fora também as duas guardas, que citam caminhos do acervo nos próprios exemplos.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const SRC = fileURLToPath(new URL('../', import.meta.url));
// O router só pode importar as rotas do acervo; as duas guardas ficam fora por inteiro
const PERMITIDOS = { 'router/index.js': new Set(['@/direcoes/rotas']) };
const GUARDAS = new Set(['__tests__/direcoes-isolamento.test.js', '__tests__/producao-isolamento.test.js']);

const arquivos = readdirSync(SRC, { recursive: true })
  .map((caminho) => caminho.replace(/\\/g, '/'))
  .filter((caminho) => /\.(vue|js|mjs|cjs|ts|tsx|jsx|scss|sass|css)$/.test(caminho))
  .filter((caminho) => !caminho.startsWith('direcoes/') && !GUARDAS.has(caminho));

// Especificadores de import: estáticos, dinâmicos (inclusive com crase), reexportações,
// import.meta.glob (com texto ou lista), new URL(…, import.meta.url), regras do Sass e do CSS
// (@import url()) e o atributo src (<style src>, <script src>)
export function especificadores(fonte) {
  const padroes = [
    /\bimport\s*(?:[\w*{}\s,$]+\s*from\s*)?["']([^"']+)["']/g,
    /\bimport\(\s*["'`]([^"'`]+)["'`]/g,
    /\bexport\s+(?:\*(?:\s+as\s+[\w$]+)?|\{[^}]*\})\s*from\s*["']([^"']+)["']/g,
    /\bimport\.meta\.glob\(\s*["'`]([^"'`]+)["'`]/g,
    /\bimport\.meta\.glob\(\s*\[([^\]]*)\]/g,
    /\bnew\s+URL\(\s*["'`]([^"'`]+)["'`]\s*,\s*import\.meta\.url/g,
    /^\s*@(?:use|forward|import)\s+["']([^"']+)["']/gm,
    /^\s*@import\s+url\(\s*["']?([^"')]+)/gm,
    /\bsrc\s*=\s*["']([^"']+)["']/g,
  ];
  return padroes.flatMap((padrao) => [...fonte.matchAll(padrao)].map((m) => m[1]));
}

const doAcervo = (especificador) => /(^|\/)direcoes(\/|$)/.test(especificador);

describe('isolamento da produção', () => {
  it('o detector acha todas as formas de import do acervo', () => {
    const exemplos = [
      'import { MARCA } from "@/direcoes/compartilhado/dados.js";',
      "import '../direcoes/estilos/material/_tokens.scss';",
      'const m = () => import("@/direcoes/rotas");',
      'export { x } from "../direcoes/x.js";',
      "const t = import.meta.glob('/src/direcoes/**/*.vue');",
      '@use "@/direcoes/estilos/material/scss/base" as *;',
      '<style scoped lang="scss" src="@/direcoes/estilos/material/scss/_botao.scss"></style>',
      'const m = () => import(`@/direcoes/estilos/${nome}/Home.vue`);',
      'export * as dados from "../direcoes/compartilhado/dados.js";',
      "const t = import.meta.glob(['/src/views/*.vue', '/src/direcoes/**/*.js']);",
      '@import url("../direcoes/estilos/material/scss/_base.scss");',
      "const u = new URL('../direcoes/compartilhado/dados.js', import.meta.url);",
    ];
    const achados = Object.fromEntries(exemplos.map((e) => [e, especificadores(e).filter(doAcervo).length]));
    expect(achados).toEqual(Object.fromEntries(exemplos.map((e) => [e, 1])));
    // Citar o acervo num comentário ou num texto não é import
    expect(especificadores('// cópia de src/direcoes/compartilhado/dados.js').filter(doAcervo)).toEqual([]);
  });

  it('nenhum arquivo de src/ fora do acervo importa de src/direcoes/, salvo o router', () => {
    expect(arquivos).toContain('components/ui/BaseButton.vue');
    expect(arquivos).toContain('assets/styles/components/ui/_base-button.scss');
    expect(arquivos.length).toBeGreaterThan(100);

    const violacoes = arquivos.flatMap((caminho) =>
      especificadores(readFileSync(`${SRC}${caminho}`, 'utf8'))
        .filter(doAcervo)
        .filter((especificador) => !PERMITIDOS[caminho]?.has(especificador))
        .map((especificador) => `${caminho}: ${especificador}`)
    );
    expect(violacoes).toEqual([]);
    // O router continua na lista: só o import das rotas do acervo é permitido nele
    expect(arquivos).toContain('router/index.js');
  });
});
