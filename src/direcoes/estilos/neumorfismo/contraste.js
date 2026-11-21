// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "neu-tinta", fundo: "neu-kraft", minimo: 4.5, onde: "texto principal" },
  { frente: "neu-tinta-suave", fundo: "neu-kraft", minimo: 4.5, onde: "texto secundário" },
  { frente: "neu-tinta-suave", fundo: "neu-sombra-sob-texto", sobre: "neu-kraft", minimo: 4.5, onde: "texto do rodapé junto à sombra interna" },
  { frente: "neu-branco", fundo: "neu-ketchup", minimo: 4.5, onde: "Ver cardápio" },
  { frente: "neu-branco", fundo: "neu-ketchup-claro", minimo: 4.5, onde: "Ver cardápio no hover" },
  { frente: "neu-branco", fundo: "neu-alface", minimo: 4.5, onde: "face Adicionado" },
  { frente: "neu-tinta", fundo: "neu-sombra", minimo: 4.5, onde: "ícone das setas (lado escuro do convexo)" },
  { frente: "neu-branco", fundo: "neu-ketchup-escuro", minimo: 4.5, onde: "Adicionar (lado escuro do convexo)" },
  { frente: "neu-borda", fundo: "neu-kraft", minimo: 3, onde: "borda dos controles" },
  { frente: "neu-ketchup", fundo: "neu-kraft", minimo: 3, onde: "ponto ativo da paginação" },
  { frente: "neu-tinta", fundo: "neu-kraft", minimo: 3, onde: "anel de foco" },
  { frente: "neu-sombra", fundo: "neu-kraft", minimo: 3, informativo: true, onde: "sombra escura (decorativa, não conta)" },
];
