// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "flat-tinta", fundo: "flat-papel", minimo: 4.5, onde: "texto principal" },
  { frente: "flat-tinta-suave", fundo: "flat-ladrilho", minimo: 4.5, onde: "descrição no ladrilho" },
  { frente: "flat-papel", fundo: "flat-cebola", minimo: 4.5, onde: "texto no ladrilho roxo e Adicionar" },
  { frente: "flat-cebola", fundo: "flat-lilas", minimo: 4.5, onde: "Ver cardápio no hover" },
  { frente: "flat-papel", fundo: "flat-alface", minimo: 4.5, onde: "face Adicionado" },
  { frente: "flat-tinta", fundo: "flat-cheddar", minimo: 4.5, onde: "número do badge" },
  { frente: "flat-papel", fundo: "flat-tinta", minimo: 4.5, onde: "rodapé" },
  { frente: "flat-cinza", fundo: "flat-papel", minimo: 3, onde: "quadradinho da paginação" },
  { frente: "flat-cebola", fundo: "flat-papel", minimo: 3, onde: "sublinhado do link atual" },
  { frente: "flat-cheddar", fundo: "flat-cebola", minimo: 3, onde: "anel de foco no ladrilho roxo" },
  { frente: "flat-tinta", fundo: "flat-papel", minimo: 3, onde: "anel de foco no branco" },
];
