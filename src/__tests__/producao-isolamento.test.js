// @vitest-environment node
// A produção recebe cópias (SPEC-material §4.1): nenhum arquivo de src/ fora de src/direcoes/ importa
// de src/direcoes/. O único elo permitido é o src/router/index.js, que registra as rotas do acervo
// (só no yarn dev). Os arquivos são lidos pelo node:fs (no Vitest, um .scss importado com ?raw chega
// vazio). Ficam fora também as duas guardas, que citam caminhos do acervo nos próprios exemplos.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const PERMITIDOS = new Set([
  'router/index.js',
  '__tests__/direcoes-isolamento.test.js',
  '__tests__/producao-isolamento.test.js',
]);

const arquivos = readdirSync(SRC, { recursive: true })
  .map((caminho) => caminho.replace(/\\/g, '/'))
  .filter((caminho) => /\.(vue|js|scss)$/.test(caminho))
  .filter((caminho) => !caminho.startsWith('direcoes/') && !PERMITIDOS.has(caminho));

// Especificadores de import: estáticos, dinâmicos, reexportações, import.meta.glob e regras do Sass
export function especificadores(fonte) {
  const padroes = [
    /\bimport\s*(?:[\w*{}\s,$]+\s*from\s*)?["']([^"']+)["']/g,
    /\bimport\(\s*["']([^"']+)["']\s*\)/g,
    /\bexport\s+(?:\*|\{[^}]*\})\s*from\s*["']([^"']+)["']/g,
    /\bimport\.meta\.glob\(\s*["']([^"']+)["']/g,
    /^\s*@(?:use|forward|import)\s+["']([^"']+)["']/gm,
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
        .map((especificador) => `${caminho}: ${especificador}`)
    );
    expect(violacoes).toEqual([]);
  });
});
