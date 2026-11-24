/* global process */
// §13.7 do SPEC-material: contraste dos pares de tokens de base, por papel (§2.2).
// Os pares e a fórmula vêm de src/utils/contraste.js, os mesmos do src/__tests__/contraste.test.js.
// uso: REPO=<raiz do repositório> node tokens-contrast.mjs (sem REPO, usa a pasta atual)
// Sai com 1 se algum par reprovar e com 2 se não achar o repositório.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const REPO = process.env.REPO || process.cwd();
const CONTRASTE = path.join(REPO, 'src/utils/contraste.js');
if (!fs.existsSync(CONTRASTE)) {
  console.error(`Não achei ${CONTRASTE}. Rode da raiz do repositório ou informe a raiz em REPO=<pasta>.`);
  process.exit(2);
}
const { PARES, lerTokens, medirPar } = await import(pathToFileURL(CONTRASTE).href);
const { ler } = lerTokens(fs.readFileSync(path.join(REPO, 'src/assets/styles/base/_tokens.scss'), 'utf8'));
const duasCasas = (valor) => (Math.floor(valor * 100) / 100).toFixed(2);

let falhas = 0;
for (const par of PARES) {
  const medido = medirPar(ler, par);
  const ok = medido !== null && medido >= par.minimo;
  if (!ok) falhas += 1;
  const valor = medido === null ? 'sem cor' : `${duasCasas(medido).padStart(5)}:1`;
  console.log(`${ok ? '✓' : '✗'} ${par.frente.padEnd(28)} / ${par.fundo.padEnd(32)} ${valor} (mín. ${par.minimo})  ${par.onde}`);
}
// Informativo (isento de contraste): o rótulo do botão desabilitado, on-surface a 38% sobre o contêiner
// on-surface a 10% sobre a surface (os dois em rgba, compostos)
const desabilitado = medirPar(ler, { frente: 'm3-desabilitado-conteudo', fundo: 'm3-desabilitado-container', sobre: 'm3-surface' });
console.log(`\nInformativo (isento): m3-desabilitado-conteudo / m3-desabilitado-container / m3-surface = ${duasCasas(desabilitado)}:1`);
console.log(falhas ? `FALHAS: ${falhas}` : `TODOS OS ${PARES.length} PARES OK`);
process.exitCode = falhas ? 1 : 0;
