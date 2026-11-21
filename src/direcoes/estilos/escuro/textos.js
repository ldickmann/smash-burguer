// Microcopy da Home deste estilo: só títulos de seção e rótulos que o app não tem.
// Cada texto novo leva o comentário // provisório e passa pela revisão de UX copy.
// Nada de número, prazo, taxa, preço, nota, avaliação, depoimento, promessa ou promoção.
// Módulo puro: o portão de conteúdo (P15) também lê.
// "Junto com o lanche" fica com este estilo, pela decisão da sessão principal de 21/11/2026 (o 3D
// usa outro título na bandeja).

export const TEXTOS = {
  palcoAlt: "Hambúrguer duplo com queijo derretido e cebola caramelizada", // provisório
  juntoTitulo: "Junto com o lanche", // provisório
  noPedido: "No seu pedido", // provisório
  noPedidoLegenda: "aparece nos lanches que você já adicionou", // provisório (legenda da marca na vitrine)
  meioDia: "meio-dia", // provisório (rótulo da faixa das horas)
  meiaNoite: "meia-noite", // provisório (rótulo da faixa das horas)
  contatoTitulo: "Contato", // provisório
  rodapeNav: "Rodapé", // provisório (nome da nav repetida no rodapé)
  whatsapp: "WhatsApp", // provisório (rótulo do contato; o número sai sozinho de TELEFONE, em dados.js)
};

// Textos que o app já tem, iguais aos das telas reais (não são provisórios)
export const REAIS = {
  adicionar: "Adicionar", // src/components/ProductCard.vue
  adicionado: "Adicionado", // src/components/ProductCard.vue
  vazioTitulo: "Nada nesta categoria por enquanto", // src/views/MenuView.vue (EmptyState)
  vazioTexto: "Dê uma olhada nas outras categorias.", // src/views/MenuView.vue (EmptyState)
};
