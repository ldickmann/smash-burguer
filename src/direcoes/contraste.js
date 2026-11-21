// Contraste do WCAG 2.x (critérios 1.4.3 e 1.4.11) e os pares de tokens medidos em cada direção.
// Usado pela ficha do índice, no navegador, e pelo script de verificação, no Node: por isso não
// importa nada do Vue nem do DOM.

import { PARES as material } from "./estilos/material/contraste.js";
import { PARES as esqueumorfismo } from "./estilos/esqueumorfismo/contraste.js";
import { PARES as neumorfismo } from "./estilos/neumorfismo/contraste.js";
import { PARES as d3 } from "./estilos/3d/contraste.js";
import { PARES as flat } from "./estilos/flat/contraste.js";
import { PARES as minimalismo } from "./estilos/minimalismo/contraste.js";
import { PARES as escuro } from "./estilos/escuro/contraste.js";

// ---------- Fórmula ----------

const canal = (valor) => {
  const c = valor / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export const luminancia = ([r, g, b]) => 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);

export const razao = (a, b) => {
  const [clara, escura] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (clara + 0.05) / (escura + 0.05);
};

// Hex de 3, 4, 6 ou 8 dígitos e as funções rgb e rgba → [r, g, b, alfa]; o resto → null
export const lerCor = (texto) => {
  const valor = String(texto ?? "").trim().toLowerCase();
  if (valor === "transparent") return [0, 0, 0, 0];
  if (valor.startsWith("#")) {
    let hex = valor.slice(1);
    if (hex.length === 3 || hex.length === 4) hex = [...hex].map((c) => c + c).join("");
    if (![6, 8].includes(hex.length)) return null;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const alfa = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    return [r, g, b, alfa];
  }
  const funcao = valor.match(/^rgba?\(([^)]+)\)$/);
  if (!funcao) return null;
  const partes = funcao[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
  return [partes[0], partes[1], partes[2], partes[3] ?? 1];
};

// Cor (possivelmente translúcida) pintada sobre um fundo opaco
export const compor = ([r, g, b, alfa = 1], [fr, fg, fb]) => [
  r * alfa + fr * (1 - alfa),
  g * alfa + fg * (1 - alfa),
  b * alfa + fb * (1 - alfa),
  1,
];

/**
 * Mede um par. `ler(token)` devolve o valor CSS do token (sem o "--"), já com os var() resolvidos.
 * O fundo translúcido é composto sobre `par.sobre` (padrão: color-bg); a frente, sobre o fundo.
 * @returns {number|null} a razão, ou null se algum valor não for uma cor simples
 */
export const medirPar = (ler, par) => {
  const base = lerCor(ler(par.sobre ?? "color-bg"));
  const fundo = lerCor(ler(par.fundo));
  const frente = lerCor(ler(par.frente));
  if (!base || !fundo || !frente) return null;
  const fundoOpaco = compor(fundo, compor(base, [255, 255, 255]));
  return razao(compor(frente, fundoOpaco), fundoOpaco);
};

// O WCAG não arredonda: 4,499 não passa em 4,5. A exibição corta em duas casas.
export const passa = (valor, minimo) => valor !== null && valor >= minimo;
export const cortarDuasCasas = (valor) => Math.floor(valor * 100) / 100;

// ---------- Pares ----------
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.

// Usados pelos componentes reais que aparecem em todas as Homes: modal Personalizar, toast e skip link
export const PARES_COMUNS = [
  { frente: "color-ink", fundo: "color-bg", minimo: 4.5, onde: "texto principal na página" },
  { frente: "color-ink-muted", fundo: "color-bg", minimo: 4.5, onde: "texto secundário" },
  { frente: "color-ink", fundo: "color-surface-2", minimo: 4.5, onde: "modal Personalizar" },
  { frente: "color-ink-muted", fundo: "color-surface-2", minimo: 4.5, onde: "ajuda e descrição no modal" },
  { frente: "color-ink", fundo: "color-surface-3", minimo: 4.5, onde: "aviso (toast)" },
  { frente: "color-ink", fundo: "color-input", minimo: 4.5, onde: "texto do campo" },
  { frente: "color-ink-subtle", fundo: "color-input", minimo: 4.5, onde: "placeholder da observação" },
  { frente: "color-accent-ink", fundo: "color-accent", minimo: 4.5, onde: "botão primário e skip link" },
  { frente: "color-accent-ink", fundo: "color-accent-hover", minimo: 4.5, onde: "primário no hover" },
  { frente: "color-accent-ink", fundo: "color-accent-pressed", minimo: 4.5, onde: "primário pressionado" },
  { frente: "color-danger", fundo: "color-surface-2", minimo: 4.5, onde: "erro no modal" },
  { frente: "color-success", fundo: "color-surface-3", minimo: 3, onde: "ícone de sucesso no aviso" },
  { frente: "color-border-strong", fundo: "color-surface-2", minimo: 3, onde: "borda do checkbox e do campo" },
  { frente: "color-border-strong", fundo: "color-input", minimo: 3, onde: "borda do campo" },
  { frente: "color-accent", fundo: "color-surface-2", minimo: 3, onde: "checkbox marcado e indicador" },
  { frente: "color-focus", fundo: "color-bg", minimo: 3, onde: "anel de foco na página" },
  { frente: "color-focus", fundo: "color-surface-2", minimo: 3, onde: "anel de foco no modal" },
];

// Pares da Home de cada direção: cada estilo é dono dos próprios, em estilos/<slug>/contraste.js
export const PARES_POR_DIRECAO = {
  material,
  esqueumorfismo,
  neumorfismo,
  "3d": d3,
  flat,
  minimalismo,
  escuro,
};
