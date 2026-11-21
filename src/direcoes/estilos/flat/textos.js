// Microcopy da Home deste estilo: só títulos de seção e rótulos que o app não tem.
// Cada texto novo leva o comentário // provisório e passa pela revisão de UX copy.
// Nada de número, prazo, taxa, preço, nota, avaliação, depoimento, promessa ou promoção.
// Módulo puro: o portão de conteúdo (P15) também lê.
// O título da seção `loja` não é "Horário e contato", o do desenho: pela decisão da sessão principal
// de 21/11/2026, esse título fica com o neumorfismo, e o flat usa um próprio.

export const TEXTOS = {
  cardapio: {
    titulo: "Cardápio", // provisório (o rótulo real do link, em useLinksPrincipais.js)
    vazio: "Nada nesta categoria por enquanto", // provisório (o título real do EmptyState de src/views/MenuView.vue)
  },
  adicionais: {
    titulo: "Adicionais", // provisório (o título real da seção do modal, src/components/ModalAdditional.vue)
    texto: "Os adicionais aparecem quando você adiciona um hambúrguer ou uma sobremesa.", // provisório
    hamburgueres: "Nos hambúrgueres", // provisório
    sobremesas: "Nas sobremesas", // provisório
  },
  loja: {
    titulo: "Onde nos achar", // provisório (troca do "Horário e contato" do desenho, sugerida pelo juiz)
    whatsapp: "WhatsApp", // provisório (rótulo do contato; o número sai sozinho de TELEFONE, em dados.js)
  },
};
