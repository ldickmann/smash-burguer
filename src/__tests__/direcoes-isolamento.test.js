// Isolamento das direções visuais (src/direcoes, só no yarn dev): cada estilo é dono da própria
// pasta e só a lógica é compartilhada. Lê o código-fonte cru de todos os arquivos e reprova quando:
// - um arquivo de estilos/A importa (import, import(), @use, @forward ou @import) de estilos/B;
// - um arquivo de estilo importa de @/components ou de @/views;
// - compartilhado/ tem <style>, .scss ou import de estilos/;
// - um .vue de estilo tem <style> sem scoped;
// - um _tokens.scss aparece em @use, @forward ou @import (ele entra pelo <script>).
import { describe, expect, it } from 'vitest';

const ARQUIVOS = import.meta.glob('/src/direcoes/**/*.{vue,js,scss}', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const DIRECOES = '/src/direcoes/';
const ESTILOS = `${DIRECOES}estilos/`;
const COMPARTILHADO = `${DIRECOES}compartilhado/`;

// Resolve um especificador relativo ou com @/ para um caminho a partir da raiz (/src/…)
function resolver(de, especificador) {
  if (especificador.startsWith('@/')) return `/src/${especificador.slice(2)}`;
  if (!especificador.startsWith('.')) return especificador;
  const partes = de.split('/').slice(0, -1);
  for (const parte of especificador.split('/')) {
    if (parte === '..') partes.pop();
    else if (parte !== '.' && parte !== '') partes.push(parte);
  }
  return partes.join('/');
}

const estiloDe = (caminho) => (caminho.startsWith(ESTILOS) ? caminho.slice(ESTILOS.length).split('/')[0] : null);

// Imports de JS (estáticos, dinâmicos e reexportações) e regras do Sass, linha a linha
export function lerImports(fonte) {
  const js = [];
  const sass = [];
  for (const m of fonte.matchAll(/\bimport\s*(?:[\w*{}\s,$]+\s*from\s*)?["']([^"']+)["']/g)) js.push(m[1]);
  for (const m of fonte.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g)) js.push(m[1]);
  for (const m of fonte.matchAll(/\bexport\s+(?:\*|\{[^}]*\})\s*from\s*["']([^"']+)["']/g)) js.push(m[1]);
  for (const m of fonte.matchAll(/^\s*@(use|forward|import)\s+["']([^"']+)["']/gm)) sass.push(m[2]);
  return { js, sass };
}

const ehTokens = (especificador) => {
  const nome = especificador.split('/').pop().replace(/\.scss$/, '').replace(/^_/, '');
  return nome === 'tokens';
};

// Devolve a lista de violações de um arquivo
export function violacoes(caminho, fonte) {
  const erros = [];
  const { js, sass } = lerImports(fonte);
  const estilo = estiloDe(caminho);
  for (const especificador of [...js, ...sass]) {
    const alvo = resolver(caminho, especificador);
    const outro = estiloDe(alvo);
    if (estilo && outro && outro !== estilo) erros.push(`${caminho}: importa de outro estilo (${especificador})`);
    if (estilo && /^\/src\/(components|views)(\/|$)/.test(alvo)) {
      erros.push(`${caminho}: estilo importando de componente ou tela de produção (${especificador})`);
    }
    if (caminho.startsWith(COMPARTILHADO) && alvo.startsWith(ESTILOS)) {
      erros.push(`${caminho}: compartilhado importando de estilos/ (${especificador})`);
    }
  }
  for (const especificador of sass) {
    if (ehTokens(especificador)) erros.push(`${caminho}: _tokens.scss em @use, @forward ou @import (${especificador})`);
  }
  if (caminho.startsWith(COMPARTILHADO)) {
    if (caminho.endsWith('.scss')) erros.push(`${caminho}: .scss em compartilhado/`);
    if (/<style[\s>]/.test(fonte)) erros.push(`${caminho}: <style> em compartilhado/`);
  }
  if (estilo && caminho.endsWith('.vue')) {
    for (const m of fonte.matchAll(/<style\b([^>]*)>/g)) {
      if (!/\bscoped\b/.test(m[1])) erros.push(`${caminho}: <style> sem scoped`);
    }
  }
  return erros;
}

describe('isolamento das direções visuais', () => {
  it('encontra os arquivos das direções', () => {
    const caminhos = Object.keys(ARQUIVOS);
    expect(caminhos.some((c) => c.startsWith(ESTILOS))).toBe(true);
    expect(caminhos.some((c) => c.startsWith(COMPARTILHADO))).toBe(true);
  });

  it('nenhum arquivo quebra as regras de pasta', () => {
    const erros = Object.entries(ARQUIVOS).flatMap(([caminho, fonte]) => violacoes(caminho, fonte));
    expect(erros).toEqual([]);
  });

  // Casos negativos: cada regra precisa reprovar
  it.each([
    ['/src/direcoes/estilos/flat/secoes/FlSecaoX.vue', 'import X from "../../material/componentes/M3Y.vue";', 'outro estilo'],
    ['/src/direcoes/estilos/flat/HomeFlat.vue', '<style scoped lang="scss">\n@use "../3d/scss/base";\n</style>', 'outro estilo'],
    ['/src/direcoes/estilos/flat/useX.js', 'const m = () => import("@/direcoes/estilos/escuro/x.js");', 'outro estilo'],
    ['/src/direcoes/estilos/flat/HomeFlat.vue', 'import TheNavbar from "@/components/layout/TheNavbar.vue";', 'produção'],
    ['/src/direcoes/estilos/flat/HomeFlat.vue', 'import HomeView from "@/views/HomeView.vue";', 'produção'],
    ['/src/direcoes/compartilhado/useX.js', 'import { A } from "../estilos/flat/textos.js";', 'compartilhado importando'],
    ['/src/direcoes/compartilhado/X.vue', '<template><div /></template>\n<style scoped>.a { color: red }</style>', '<style> em compartilhado'],
    ['/src/direcoes/compartilhado/_x.scss', '.a { display: block; }', '.scss em compartilhado'],
    ['/src/direcoes/estilos/flat/HomeFlat.vue', '<style lang="scss">\n.a { display: block; }\n</style>', 'sem scoped'],
    ['/src/direcoes/estilos/flat/scss/_base.scss', '@use "../tokens";', '_tokens.scss'],
    ['/src/direcoes/estilos/flat/HomeFlat.vue', '<style scoped lang="scss">\n@import "./_tokens.scss";\n</style>', '_tokens.scss'],
  ])('reprova %s (%s)', (caminho, fonte, motivo) => {
    expect(violacoes(caminho, fonte).join('\n')).toContain(motivo);
  });

  it('aceita o que é permitido', () => {
    const home = [
      'import "./_tokens.scss";',
      'import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";',
      'import FlSecaoHero from "./secoes/FlSecaoHero.vue";',
      'import { useProductsStore } from "@/stores/products";',
      '<style scoped lang="scss">\n@use "@/assets/styles/base/breakpoints" as *;\n@use "./scss/home";\n</style>',
    ].join('\n');
    expect(violacoes('/src/direcoes/estilos/flat/HomeFlat.vue', home)).toEqual([]);
  });
});
