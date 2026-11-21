// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "3d-carne", fundo: "3d-pao-claro", minimo: 4.5, onde: "texto no topo do degradê" },
  { frente: "3d-carne", fundo: "3d-tomate-claro", minimo: 4.5, onde: "texto no ponto mais escuro do degradê (h1 da capa e h2 dos degraus)" },
  { frente: "3d-carne-suave", fundo: "3d-tomate-claro", minimo: 4.5, onde: "texto secundário no ponto mais escuro (texto da capa)" },
  { frente: "3d-carne-suave", fundo: "3d-maionese", minimo: 4.5, onde: "eixo da fileira, descrições, preços dos adicionais e rodapé" },
  { frente: "3d-branco", fundo: "3d-ketchup-claro", minimo: 4.5, onde: "Ver cardápio (hover, o mais claro)" },
  { frente: "3d-maionese", fundo: "3d-carne", minimo: 4.5, onde: "Adicionar, e os links das lajes (Ver cardápio e Seu carrinho)" },
  { frente: "3d-branco", fundo: "3d-alface", minimo: 4.5, onde: "face Adicionado" },
  { frente: "3d-carne", fundo: "3d-tomate-claro", minimo: 3, onde: "anel de foco sobre o degradê" },
  // Rodada 2
  { frente: "3d-carne", fundo: "3d-maionese", minimo: 4.5, onde: "h2 do palco, h3 das fichas, rótulo do alternador, títulos das lajes, nomes dos adicionais e links do rodapé" },
  { frente: "3d-maionese", fundo: "3d-carne-clara", minimo: 4.5, onde: "Adicionar e links das lajes no hover" },
  { frente: "3d-carne", fundo: "3d-maionese", minimo: 3, onde: "anel de foco dentro do palco, da bandeja, das lajes e do rodapé; anel do alternador ligado" },
  { frente: "3d-carne", fundo: "3d-pao-claro", minimo: 3, onde: "anel e ícone de check do alternador ligado (fundo pão claro)" },
  { frente: "3d-branco", fundo: "3d-ketchup", minimo: 4.5, onde: "selo da contagem (cabeçalho e degrau Peça)" },
  { frente: "3d-carne-suave", fundo: "3d-pao-claro", minimo: 4.5, onde: "ícone da reserva de foto (fundo pão claro)" },
];
