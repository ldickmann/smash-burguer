// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "esq-tinta", fundo: "esq-papel", minimo: 4.5, onde: "texto da comanda e do cupom" },
  { frente: "esq-tinta", fundo: "esq-grao-max", sobre: "esq-papel", minimo: 4.5, onde: "texto no ponto mais escuro do grão" },
  { frente: "esq-tinta-clara", fundo: "esq-grao-max", sobre: "esq-papel", minimo: 4.5, onde: "descrição no ponto mais escuro do grão" },
  { frente: "esq-letra", fundo: "esq-chapa", minimo: 4.5, onde: "título estampado na chapa" },
  { frente: "esq-tinta", fundo: "esq-inox", minimo: 4.5, onde: "links gravados na coifa" },
  { frente: "esq-tinta", fundo: "esq-inox-escuro", minimo: 4.5, onde: "link no ponto mais escuro do inox" },
  { frente: "esq-letra", fundo: "esq-placa", minimo: 4.5, onde: "texto da placa" },
  { frente: "color-accent-ink", fundo: "esq-ketchup-claro", minimo: 4.5, onde: "botão físico (ponto mais claro)" },
  { frente: "esq-carimbo", fundo: "esq-papel", minimo: 3, onde: "carimbo Adicionado (texto grande)" },
  { frente: "esq-led", fundo: "esq-led-apagado", minimo: 3, onde: "LED aceso contra o apagado" },
  { frente: "esq-letra", fundo: "esq-chapa", minimo: 3, onde: "anel de foco na chapa" },
  { frente: "esq-tinta", fundo: "esq-inox-claro", minimo: 3, onde: "anel de foco no inox" },
];
