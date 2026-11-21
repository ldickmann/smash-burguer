// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  { frente: "neu-tinta", fundo: "neu-kraft", minimo: 4.5, onde: "texto principal" },
  { frente: "neu-tinta-suave", fundo: "neu-kraft", minimo: 4.5, onde: "texto secundário" },
  { frente: "neu-tinta-suave", fundo: "neu-sombra-sob-texto", sobre: "neu-kraft", minimo: 4.5, onde: "ingredientes do visor e texto do hero no fundo da cova, junto à sombra interna" },
  { frente: "neu-tinta", fundo: "neu-kraft-claro", minimo: 4.5, onde: "nome da tecla e do controle no hover (lado claro do convexo)" },
  { frente: "neu-tinta-suave", fundo: "neu-kraft-claro", minimo: 4.5, onde: "preço da tecla no hover" },
  { frente: "neu-branco", fundo: "neu-ketchup", minimo: 4.5, onde: "Ver cardápio, Adicionar e o número do selo do carrinho" },
  { frente: "neu-branco", fundo: "neu-ketchup-claro", minimo: 4.5, onde: "Ver cardápio e Adicionar no hover" },
  { frente: "neu-branco", fundo: "neu-ketchup-escuro", minimo: 4.5, onde: "Ver cardápio e Adicionar pressionados" },
  { frente: "neu-branco", fundo: "neu-alface", minimo: 4.5, onde: "face Adicionado" },
  { frente: "neu-borda", fundo: "neu-kraft", minimo: 3, onde: "borda dos controles e das teclas" },
  { frente: "neu-borda", fundo: "neu-kraft-claro", minimo: 3, onde: "borda do controle no hover" },
  { frente: "neu-tinta", fundo: "neu-kraft", minimo: 3, onde: "borda de 2 px e check da tecla marcada (indicador de estado)" },
  { frente: "neu-tinta", fundo: "neu-kraft", minimo: 3, onde: "anel de foco" },
  { frente: "neu-alface", fundo: "neu-kraft", minimo: 3, informativo: true, onde: "ponto dos dias abertos (NeuSemana, aria-hidden; o texto do horário é a informação)" },
  { frente: "neu-tinta-suave", fundo: "neu-kraft-poco", minimo: 3, informativo: true, onde: "ícone de reserva da foto que falhou" },
  { frente: "neu-sombra", fundo: "neu-kraft", minimo: 3, informativo: true, onde: "sombra escura (decorativa, não conta)" },
];
