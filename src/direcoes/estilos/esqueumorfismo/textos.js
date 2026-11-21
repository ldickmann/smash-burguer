// Microcopy da Home deste estilo: só títulos de seção e rótulos que o app não tem.
// Cada texto novo leva o comentário // provisório e passa pela revisão de UX copy.
// Nada de número, prazo, taxa, preço, nota, avaliação, depoimento, promessa ou promoção.
// Módulo puro: o portão de conteúdo (P15) também lê.
// Os textos marcados "o mesmo do <arquivo>" já existem nas telas reais; ficam aqui porque o P15 só
// reconhece o dados.js, o products.json e este arquivo.
// Troca de título (decisão da sessão principal, 21/11/2026): "Bebidas e sobremesas" fica com o
// material. O expositor usa "No expositor", da própria metáfora; as prateleiras continuam com os
// rótulos reais de CATEGORIAS (Bebidas e Sobremesas).

export const TEXTOS = {
  adicionar: "Adicionar", // provisório (o mesmo do ProductCard.vue)
  adicionado: "Adicionado", // provisório (o mesmo do ProductCard.vue)
  vazio: "Nada nesta categoria por enquanto", // provisório (o mesmo do MenuView.vue)
  comandas: {
    ingredientes: "Ingredientes", // provisório (o mesmo do ModalAdditional.vue)
  },
  expositor: {
    titulo: "No expositor", // provisório
    adicional: "adicional", // provisório ("1 adicional", contagem calculada)
    adicionais: "adicionais", // provisório ("7 adicionais", contagem calculada)
  },
  cupom: {
    titulo: "Seu carrinho", // provisório (o mesmo do CartView.vue)
    vazioTitulo: "Seu carrinho está vazio", // provisório (o mesmo do CartView.vue)
    vazioTexto: "Escolha um burger no cardápio para começar.", // provisório (o mesmo do CartView.vue)
    listaRotulo: "Itens do carrinho", // provisório (o mesmo do CartView.vue)
    subtotal: "Subtotal", // provisório (o mesmo do OrderSummary.vue)
    cada: "cada", // provisório (depois do preço unitário, quando a linha tem mais de uma unidade)
    ocultos: "no carrinho", // provisório ("+ 2 itens no carrinho": as linhas fora da janela do cupom)
    acao: "Ver carrinho", // provisório
  },
  rodape: {
    whatsapp: "WhatsApp", // provisório (rótulo do telefone, sem o "·" de CONTATOS)
    email: "E-mail", // provisório (rótulo do e-mail)
  },
};
