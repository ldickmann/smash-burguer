// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "flat-tinta", fundo: "flat-papel", minimo: 4.5, onde: "texto principal, títulos e preços no papel" },
  { frente: "flat-tinta-suave", fundo: "flat-papel", minimo: 4.5, onde: "abas não selecionadas e descrição do produto" },
  { frente: "flat-tinta-suave", fundo: "flat-ladrilho-escuro", minimo: 3, onde: "ícone de reserva da foto que falha" },
  { frente: "flat-papel", fundo: "flat-cebola", minimo: 4.5, onde: "ladrilho Bebidas, Ver cardápio, Adicionar e ícone do contato" },
  { frente: "flat-papel", fundo: "flat-cebola-escura", minimo: 4.5, onde: "hover do ladrilho Bebidas, do Ver cardápio, do Adicionar e do contato" },
  { frente: "flat-papel", fundo: "flat-cebola-pressionada", minimo: 4.5, onde: "pressionado dos mesmos" },
  { frente: "flat-papel", fundo: "flat-alface", minimo: 4.5, onde: "ladrilho Sobremesas e face Adicionado" },
  { frente: "flat-papel", fundo: "flat-alface-escura", minimo: 4.5, onde: "ladrilho Sobremesas no hover" },
  { frente: "flat-papel", fundo: "flat-alface-pressionada", minimo: 4.5, onde: "ladrilho Sobremesas pressionado" },
  { frente: "flat-tinta", fundo: "flat-cheddar", minimo: 4.5, onde: "nome e contagem dos ladrilhos cheddar e número do selo" },
  { frente: "flat-tinta", fundo: "flat-cheddar-escuro", minimo: 4.5, onde: "ladrilho cheddar no hover" },
  { frente: "flat-tinta", fundo: "flat-cheddar-pressionado", minimo: 4.5, onde: "ladrilho cheddar pressionado" },
  { frente: "flat-papel", fundo: "flat-tinta", minimo: 4.5, onde: "faixa do topo, ladrilho Adicionais e rodapé" },
  { frente: "flat-papel", fundo: "flat-preto-hover", minimo: 4.5, onde: "ladrilho Adicionais no hover" },
  { frente: "flat-papel", fundo: "flat-tinta-suave", minimo: 4.5, onde: "ladrilho Adicionais pressionado" },
  { frente: "flat-cheddar", fundo: "flat-tinta", minimo: 4.5, onde: "link do topo no hover e ícone do carrinho no hover" },
  { frente: "flat-cheddar", fundo: "flat-tinta", minimo: 3, onde: "sublinhado do link atual e anel de foco no topo e no rodapé" },
  { frente: "flat-cebola", fundo: "flat-papel", minimo: 3, onde: "sublinhado da aba selecionada do pivot" },
  { frente: "flat-tinta", fundo: "flat-papel", minimo: 3, onde: "anel de foco no papel (também em volta dos ladrilhos)" },
];
