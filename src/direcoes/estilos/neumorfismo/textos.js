// Microcopy da Home deste estilo: só títulos de seção e rótulos que o app não tem.
// Cada texto novo leva o comentário // provisório e passa pela revisão de UX copy.
// Nada de número, prazo, taxa, preço, nota, avaliação, depoimento, promessa ou promoção.
// Módulo puro: o portão de conteúdo (P15) também lê.
// "Horário e contato": pela decisão da sessão principal de 21/11/2026, o título fica com este
// estilo; o flat usa outro na seção dele.

export const TEXTOS = {
  painelLegenda: "Escolha um lanche", // provisório
  acompanhamentosTitulo: "Para acompanhar", // provisório
  contatoTitulo: "Horário e contato", // provisório
  contatoSubtitulo: "Contato", // provisório
  diasSemana: ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"], // provisório
  rodapeNav: "Rodapé", // provisório
  whatsapp: "WhatsApp", // provisório (rótulo do número, separado dele, sem o "·")
  email: "E-mail", // provisório (rótulo do endereço de e-mail)
  // Textos que o app já tem (origem ao lado)
  adicionar: "Adicionar", // botão do ProductCard.vue
  adicionado: "Adicionado", // retorno do ProductCard.vue
  ingredientes: "Ingredientes", // legend do ModalAdditional.vue
  adicionais: "Adicionais", // h3 do ModalAdditional.vue
  vazio: "Nada nesta categoria por enquanto", // título do EmptyState do MenuView.vue
};
