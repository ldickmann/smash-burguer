// Microcopy da Home deste estilo: só títulos de seção e rótulos que o app não tem.
// Cada texto novo leva o comentário // provisório e passa pela revisão de UX copy.
// Nada de número, prazo, taxa, preço, nota, avaliação, depoimento, promessa ou promoção.
// Módulo puro: o portão de conteúdo (P15) também lê.

export const TEXTOS = {
  nestaPagina: "Nesta página", // provisório (nome do sumário do hero)
  atendimento: "Atendimento", // provisório (título da seção e item do sumário)
  contato: "Contato", // provisório (rótulo do WhatsApp e do e-mail)
  whatsapp: "WhatsApp", // provisório (rótulo do número; o número sai sozinho de TELEFONE, em dados.js)
  verFoto: "Ver foto", // provisório (botão da foto e começo de "Ver foto de <nome>")
  notaAdicionais: "Você escolhe ao adicionar.", // provisório (frase da nota dos adicionais)
  rodape: "Rodapé", // provisório (nome da navegação repetida no rodapé)
  // Textos reais de outras telas, iguais aos de lá
  adicionais: "Adicionais", // h3 do ModalAdditional.vue (título da nota de cada categoria)
  categoriaVazia: "Nada nesta categoria por enquanto", // título do EmptyState do MenuView.vue
  adicionar: "Adicionar", // botão do ProductCard.vue
  adicionado: "Adicionado", // retorno do ProductCard.vue
  carrinho: "Carrinho", // o mesmo do rótulo do useContadorCarrinho (nome acessível "Carrinho N itens")
};
