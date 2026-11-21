// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "m3-on-surface", fundo: "m3-surface", minimo: 4.5, onde: "texto principal" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-highest", minimo: 4.5, onde: "descrição no card" },
  { frente: "m3-on-primary", fundo: "m3-primary", minimo: 4.5, onde: "Ver cardápio e Adicionar" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container", minimo: 4.5, onde: "setas e item do menu" },
  { frente: "m3-on-primary", fundo: "m3-primary-pressed", minimo: 4.5, onde: "Adicionar pressionado" },
  { frente: "m3-on-primary-container", fundo: "m3-primary-container", minimo: 4.5, onde: "face Adicionado" },
  { frente: "m3-primary", fundo: "m3-surface-container", minimo: 4.5, onde: "links do rodapé" },
  { frente: "m3-on-error", fundo: "m3-error", minimo: 4.5, onde: "badge do carrinho" },
  { frente: "m3-primary", fundo: "m3-surface", minimo: 3, onde: "indicador da aba ativa" },
  { frente: "m3-outline", fundo: "m3-surface-container-low", minimo: 3, onde: "ponto da paginação" },
  { frente: "m3-secondary", fundo: "m3-surface", minimo: 3, onde: "anel de foco" },
  { frente: "m3-secondary", fundo: "m3-surface-container-highest", minimo: 3, onde: "anel de foco no card" },
];
