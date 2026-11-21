// Agregador das fichas do índice (#/direcoes): cada estilo é dono da própria, em
// estilos/<slug>/ficha.js. Imports estáticos relativos, com .js, para o Node também ler.
// A lista completa das fontes, com o que não abriu, fica em docs/direcoes/.

import { FICHA as material } from "./estilos/material/ficha.js";
import { FICHA as esqueumorfismo } from "./estilos/esqueumorfismo/ficha.js";
import { FICHA as neumorfismo } from "./estilos/neumorfismo/ficha.js";

export const FICHAS = {
  material,
  esqueumorfismo,
  neumorfismo,
};
