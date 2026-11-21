// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "3d-carne", fundo: "3d-pao-claro", minimo: 4.5, onde: "texto no topo do degradê" },
  { frente: "3d-carne", fundo: "3d-tomate-claro", minimo: 4.5, onde: "texto no ponto mais escuro do degradê" },
  { frente: "3d-carne-suave", fundo: "3d-tomate-claro", minimo: 4.5, onde: "texto secundário no ponto mais escuro" },
  { frente: "3d-carne-suave", fundo: "3d-maionese", minimo: 4.5, onde: "descrição no card" },
  { frente: "3d-branco", fundo: "3d-ketchup-claro", minimo: 4.5, onde: "Ver cardápio (hover, o mais claro)" },
  { frente: "3d-maionese", fundo: "3d-carne", minimo: 4.5, onde: "Adicionar" },
  { frente: "3d-branco", fundo: "3d-alface", minimo: 4.5, onde: "face Adicionado" },
  { frente: "3d-carne-suave", fundo: "3d-alface-clara", minimo: 3, onde: "ponto da paginação no fim do degradê" },
  { frente: "3d-carne", fundo: "3d-tomate-claro", minimo: 3, onde: "anel de foco" },
];
