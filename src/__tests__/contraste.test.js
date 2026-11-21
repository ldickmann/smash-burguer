// @vitest-environment node
// Contraste por papel (SPEC-material §1.1, item 2, e §2.2): lê os tokens de base crus, resolve as
// cadeias de var() e mede cada par de src/utils/contraste.js contra o mínimo declarado.
// Os arquivos são lidos pelo node:fs: no Vitest, um .scss importado com ?raw chega vazio.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { PARES, lerTokens, medirPar } from '@/utils/contraste';

const RAIZ = fileURLToPath(new URL('../../', import.meta.url));
const lerArquivo = (caminho) => readFileSync(`${RAIZ}${caminho}`, 'utf8').replace(/\r\n/g, '\n');
const { tokens, ler } = lerTokens(lerArquivo('src/assets/styles/base/_tokens.scss'));

// Valores dos papéis nas tabelas da §2 do SPEC-material: linhas "| `--m3-…` | `valor` |".
// Ficam de fora as abreviadas com "…" (as formas cookie e flor, de 120 e 96 pontos).
const secaoTokens = lerArquivo('docs/direcoes/SPEC-material.md').split('\n## 2. Tokens')[1].split('\n## 3.')[0];
const PAPEIS_DO_SPEC = [...secaoTokens.matchAll(/^\| `--(m3-[a-z0-9-]+)` \| `([^`]+)` \|/gm)]
  .map(([, nome, valor]) => ({ nome, valor }))
  .filter(({ valor }) => !valor.includes('…'));

const duasCasas = (valor) => Math.floor(valor * 100) / 100;

describe('contraste dos tokens de base', () => {
  it('cada par passa do mínimo declarado', () => {
    const reprovados = PARES.map((par) => ({ ...par, medido: medirPar(ler, par) }))
      .filter(({ medido, minimo }) => medido === null || medido < minimo)
      .map(({ frente, fundo, minimo, medido, onde }) => `${frente} sobre ${fundo}: ${medido === null ? 'sem cor' : duasCasas(medido)} < ${minimo} (${onde})`);
    expect(reprovados).toEqual([]);
  });

  it('papéis com os valores do SPEC', () => {
    const nomes = PAPEIS_DO_SPEC.map(({ nome }) => nome);
    expect(nomes).toEqual(expect.arrayContaining(['m3-primary', 'm3-surface', 'm3-secondary', 'm3-error', 'm3-outline']));
    const diferentes = PAPEIS_DO_SPEC.filter(({ nome, valor }) => ler(nome) !== valor)
      .map(({ nome, valor }) => `--${nome}: ${ler(nome)} (SPEC: ${valor})`);
    expect(diferentes).toEqual([]);
  });

  it('apelidos apontam para os papéis', () => {
    expect(tokens.get('color-accent')).toBe('var(--m3-primary)');
    expect(tokens.get('color-bg')).toBe('var(--m3-surface)');
    expect(tokens.get('color-focus')).toBe('var(--m3-secondary)');
  });
});
