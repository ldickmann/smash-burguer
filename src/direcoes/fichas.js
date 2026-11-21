// Agregador das fichas do índice (#/direcoes): cada estilo é dono da própria, em
// estilos/<slug>/ficha.js. Imports estáticos relativos, com .js, para o Node também ler.
// A lista completa das fontes, com o que não abriu, fica em docs/direcoes/.

import { FICHA as material } from "./estilos/material/ficha.js";
import { FICHA as esqueumorfismo } from "./estilos/esqueumorfismo/ficha.js";
import { FICHA as neumorfismo } from "./estilos/neumorfismo/ficha.js";
import { FICHA as d3 } from "./estilos/3d/ficha.js";
import { FICHA as flat } from "./estilos/flat/ficha.js";
import { FICHA as minimalismo } from "./estilos/minimalismo/ficha.js";
import { FICHA as escuro } from "./estilos/escuro/ficha.js";

export const FICHAS = {
  material,
  esqueumorfismo,
  neumorfismo,
  "3d": d3,
  flat,
  minimalismo,
  escuro,
};
