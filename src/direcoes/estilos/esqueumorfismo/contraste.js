// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.
// Sobre textura, o par mede o pior ponto do fundo (o -max de cada uma) [E22].

export const PARES = [
  // Papel térmico: comandas, etiquetas de gôndola e cupom
  { frente: "esq-tinta", fundo: "esq-papel", minimo: 4.5, onde: "texto da comanda, da etiqueta e do cupom" },
  { frente: "esq-tinta", fundo: "esq-grao-max", sobre: "esq-papel", minimo: 4.5, onde: "texto no ponto mais escuro do grão" },
  { frente: "esq-tinta-clara", fundo: "esq-grao-max", sobre: "esq-papel", minimo: 4.5, onde: "linhas do ticket e detalhes do cupom no ponto mais escuro do grão" },
  { frente: "esq-carimbo", fundo: "esq-papel", minimo: 3, onde: "carimbo Adicionado, normal e pequeno (texto grande)" },
  { frente: "esq-tinta", fundo: "esq-papel", minimo: 3, onde: "anel de foco no papel" },

  // Chapa (hero) e parede do rodapé
  { frente: "esq-letra", fundo: "esq-chapa", minimo: 4.5, onde: "título estampado na chapa" },
  { frente: "esq-letra", fundo: "esq-chapa-max", sobre: "esq-chapa", minimo: 3, onde: "h1 estampado no ponto mais claro da chapa (texto grande)" },
  { frente: "esq-letra", fundo: "esq-chapa", minimo: 3, onde: "anel de foco na chapa" },
  { frente: "esq-letra-suave", fundo: "esq-chapa", minimo: 4.5, onde: "linha de direitos na parede do rodapé" },
  { frente: "esq-letra-suave", fundo: "esq-chapa-max", sobre: "esq-chapa", minimo: 4.5, onde: "linha de direitos no ponto mais claro da parede" },

  // Inox: coifa, frente da chapa, balcão e placa do rodapé
  { frente: "esq-tinta", fundo: "esq-inox", minimo: 4.5, onde: "links gravados na coifa e títulos gravados no balcão" },
  { frente: "esq-tinta", fundo: "esq-inox-escuro", minimo: 4.5, onde: "texto do hero na frente de inox e links no ponto mais escuro do inox" },
  { frente: "esq-tinta", fundo: "esq-inox-claro", minimo: 3, onde: "anel de foco no inox" },
  { frente: "esq-letra", fundo: "esq-placa", minimo: 4.5, onde: "texto da placa da marca" },

  // Expositor: interior escuro com a luz fria
  { frente: "esq-letra", fundo: "esq-placa-escura", minimo: 4.5, onde: "títulos das prateleiras" },
  { frente: "esq-letra", fundo: "esq-luz-fria-max", sobre: "esq-placa-escura", minimo: 3, onde: "títulos das prateleiras no ponto mais claro da luz fria (texto grande)" },

  // Impressora
  { frente: "esq-tinta", fundo: "esq-impressora-escuro", minimo: 3, onde: "anel de foco do botão na carcaça (ponto mais escuro)" },

  // Botão físico
  { frente: "color-accent-ink", fundo: "esq-ketchup-claro", minimo: 4.5, onde: "botão físico (ponto mais claro)" },
  { frente: "color-accent-ink", fundo: "esq-ketchup", minimo: 4.5, onde: "botão físico (ponto mais escuro)" },

  // O LED virou decoração: o estado do cupom está no texto do papel [E23]
  { frente: "esq-led", fundo: "esq-led-apagado", minimo: 3, onde: "LED aceso contra o apagado", informativo: true },
];
