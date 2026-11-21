// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  // Página (N6): palco, vitrine e turno
  { frente: "esc-on-surface", fundo: "esc-surface", minimo: 4.5, onde: "texto principal, h1 e títulos das seções" },
  { frente: "esc-on-surface", fundo: "esc-surface", minimo: 7, informativo: true, onde: "texto pequeno, sugestão da Apple" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface", minimo: 4.5, onde: "texto do palco, links da barra e rótulos de baixo da faixa das horas" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface", minimo: 7, informativo: true, onde: "texto do palco, sugestão da Apple" },
  { frente: "esc-on-surface", fundo: "esc-surface", minimo: 3, onde: "sublinhado do link atual da barra (--esc-sublinhado-atual)" },
  { frente: "esc-outline", fundo: "esc-surface", minimo: 3, onde: "contorno do card e borda da faixa da junto em prefers-contrast: more" },
  { frente: "esc-outline-variant", fundo: "esc-surface", minimo: 1.4, informativo: true, onde: "linha da barra rolada (separação, não informação)" },

  // Botões
  { frente: "esc-on-primary", fundo: "esc-primary", minimo: 4.5, onde: "Ver cardápio, Adicionar e selo do carrinho" },
  { frente: "esc-on-primary", fundo: "esc-primary-hover", minimo: 4.5, onde: "Ver cardápio e Adicionar no hover" },
  { frente: "esc-on-primary", fundo: "esc-primary-pressed", minimo: 4.5, onde: "Ver cardápio e Adicionar pressionados" },
  { frente: "esc-on-secondary-container", fundo: "esc-secondary-container", minimo: 4.5, onde: "Adicionar tonal e Ver cardápio tonal do estado vazio" },
  { frente: "esc-on-secondary-container", fundo: "esc-secondary-container-hover", minimo: 4.5, onde: "Adicionar tonal no hover" },
  { frente: "esc-on-secondary-container", fundo: "esc-secondary-container-pressed", minimo: 4.5, onde: "Adicionar tonal pressionado" },
  { frente: "esc-on-tertiary-container", fundo: "esc-tertiary-container", minimo: 4.5, onde: "face Adicionado, marca No seu pedido e a marca da legenda da vitrine" },

  // Card da vitrine (N17) e card no seu pedido (N22)
  { frente: "esc-on-surface", fundo: "esc-surface-high", minimo: 4.5, onde: "nome e preço no card e na linha no seu pedido" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-high", minimo: 4.5, onde: "descrição no card e na linha no seu pedido" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-high", minimo: 7, informativo: true, onde: "descrição no card, sugestão da Apple" },
  { frente: "esc-outline", fundo: "esc-surface-high", minimo: 3, onde: "contorno do card" },
  { frente: "esc-on-surface", fundo: "esc-surface-highest", minimo: 4.5, onde: "nome e preço no card no seu pedido" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-highest", minimo: 4.5, onde: "descrição no card no seu pedido e ícone da foto que falhou" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-highest", minimo: 7, informativo: true, onde: "descrição no card no seu pedido, sugestão da Apple" },
  { frente: "esc-tertiary", fundo: "esc-surface-highest", minimo: 3, onde: "borda no seu pedido no card" },
  { frente: "esc-tertiary", fundo: "esc-surface-high", minimo: 3, onde: "borda no seu pedido na linha, do lado de dentro" },

  // Caixa da vitrine (N12): o degrau que sai da base, com os cards N17 dentro
  { frente: "esc-on-surface", fundo: "esc-surface-container", minimo: 4.5, onde: "h2 da vitrine e link Ver cardápio da vitrine (neutro, sublinhado)" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-container", minimo: 4.5, onde: "frase da legenda No seu pedido e link Ver cardápio da vitrine pressionado" },
  { frente: "esc-tertiary-container", fundo: "esc-surface-container", minimo: 1.2, informativo: true, onde: "marca da legenda contra a caixa (o texto dela faz o contraste)" },
  { frente: "esc-outline", fundo: "esc-surface-container", minimo: 3, onde: "contorno do card na caixa da vitrine e borda da caixa em prefers-contrast: more" },
  { frente: "esc-anel-claro", fundo: "esc-surface-container", minimo: 3, onde: "anel do link Ver cardápio na caixa da vitrine" },

  // Faixa da junto (N12)
  { frente: "esc-on-surface", fundo: "esc-surface-container", minimo: 4.5, onde: "títulos, nome e preço na faixa da junto" },
  { frente: "esc-on-surface", fundo: "esc-surface-container", minimo: 7, informativo: true, onde: "títulos, nome e preço na faixa, sugestão da Apple" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-container", minimo: 4.5, onde: "descrição na faixa e texto do estado vazio" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-container", minimo: 7, informativo: true, onde: "descrição na faixa, sugestão da Apple" },
  { frente: "esc-tertiary", fundo: "esc-surface-container", minimo: 3, onde: "borda no seu pedido na linha, contra a faixa" },

  // Faixa das 24 horas
  { frente: "esc-faixa-acesa", fundo: "esc-faixa-apagada", minimo: 3, onde: "trecho aberto contra o trilho" },
  { frente: "esc-faixa-acesa", fundo: "esc-surface", minimo: 3, onde: "trecho aberto contra a página" },

  // Rodapé (N4)
  { frente: "esc-on-surface", fundo: "esc-surface-lowest", minimo: 4.5, onde: "marca e títulos do rodapé" },
  { frente: "esc-on-surface-variant", fundo: "esc-surface-lowest", minimo: 4.5, onde: "texto do rodapé, rótulo WhatsApp e direitos" },
  { frente: "esc-primary", fundo: "esc-surface-lowest", minimo: 4.5, onde: "links de contato e da navegação do rodapé" },
  { frente: "esc-primary-pressed", fundo: "esc-surface-lowest", minimo: 4.5, onde: "link de contato pressionado" },

  // Anel de foco em duas cores [88]
  { frente: "esc-anel-claro", fundo: "esc-anel-escuro", minimo: 9, onde: "faixa clara contra a faixa escura do anel" },
  { frente: "esc-anel-claro", fundo: "esc-surface", minimo: 3, onde: "anel na página" },
  { frente: "esc-anel-claro", fundo: "esc-surface-high", minimo: 3, onde: "anel do Adicionar no card e na linha no seu pedido" },
  { frente: "esc-anel-claro", fundo: "esc-surface-highest", minimo: 3, onde: "anel do Adicionar no card no seu pedido" },
  { frente: "esc-anel-claro", fundo: "esc-surface-container", minimo: 3, onde: "anel do Adicionar na faixa da junto" },
  { frente: "esc-anel-claro", fundo: "esc-surface-lowest", minimo: 3, onde: "anel no rodapé" },
  { frente: "esc-anel-escuro", fundo: "esc-primary", minimo: 3, onde: "faixa escura do anel sobre o botão preenchido" },
  { frente: "esc-anel-escuro", fundo: "esc-secondary-container", minimo: 1.5, informativo: true, onde: "faixa escura sobre o botão tonal (a clara faz o contraste)" },
];
