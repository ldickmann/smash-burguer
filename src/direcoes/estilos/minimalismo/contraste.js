// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "min-preto", fundo: "min-branco", minimo: 4.5, onde: "texto, título e Adicionado" },
  { frente: "min-cinza-texto", fundo: "min-branco", minimo: 4.5, onde: "descrição e texto secundário" },
  { frente: "min-branco", fundo: "min-preto", minimo: 4.5, onde: "Ver cardápio e Adicionar" },
  { frente: "min-branco", fundo: "min-preto-hover", minimo: 4.5, onde: "botão no hover" },
  { frente: "min-cinza-linha", fundo: "min-branco", minimo: 3, onde: "segmento da paginação" },
  { frente: "min-preto", fundo: "min-branco", minimo: 3, onde: "sublinhado do link atual e anel de foco" },
];
