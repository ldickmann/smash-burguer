// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "esc-on-surface", fundo: "esc-surface", minimo: 4.5, onde: "texto principal" },
  { frente: "esc-on-surface", fundo: "esc-surface", minimo: 7, informativo: true, onde: "texto pequeno, sugestão da Apple" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-high", minimo: 4.5, onde: "descrição no card" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-high", minimo: 7, informativo: true, onde: "descrição no card, sugestão da Apple" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-lowest", minimo: 4.5, onde: "texto do rodapé" },
  { frente: "esc-on-primary", fundo: "esc-primary", minimo: 4.5, onde: "Ver cardápio, Adicionar e badge" },
  { frente: "esc-on-primary", fundo: "esc-primary-pressed", minimo: 4.5, onde: "Ver cardápio e Adicionar pressionados" },
  { frente: "esc-on-tertiary-container", fundo: "esc-tertiary-container", minimo: 4.5, onde: "face Adicionado" },
  { frente: "esc-outline", fundo: "esc-surface-high", minimo: 3, onde: "contorno do card e das setas" },
  { frente: "esc-primary", fundo: "esc-surface", minimo: 3, onde: "indicador ativo e anel de foco" },
  { frente: "esc-primary", fundo: "esc-surface-high", minimo: 3, onde: "anel de foco no card" },
];
