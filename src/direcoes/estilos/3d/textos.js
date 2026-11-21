// Microcopy da Home deste estilo: só títulos de seção e rótulos que o app não tem.
// Cada texto novo leva o comentário // provisório e passa pela revisão de UX copy.
// Nada de número, prazo, taxa, preço, nota, avaliação, depoimento, promessa ou promoção.
// Módulo puro: o portão de conteúdo (P15) também lê.
// Bandeja: o desenho trazia "Para pedir junto", mas, pela decisão da sessão principal de 21/11/2026,
// "Junto com o lanche" fica com o escuro, e este estilo usa um título sem a palavra "junto".

export const TEXTOS = {
  // provisório: rótulo do botão de alternar da fileira
  fileira: { alternar: "Juntar camadas" },
  // provisório: rótulos do eixo que agrupam vários ingredientes (começo comum dos nomes reais)
  linhas: { hamburguer: "Hambúrguer", cebola: "Cebola", queijo: "Queijo" },
  // provisório: o que fica fora da pilha completa o pedido (sem "junto", decisão de 21/11/2026)
  bandeja: { titulo: "Para completar o pedido" },
  // provisório: os três verbos da FRASE_CARDAPIO ("Escolha, personalize e peça."), com inicial maiúscula;
  // as lajes não têm outro texto
  degraus: { passos: ["Escolha", "Personalize", "Peça"] },
  // "Adicionais": texto real, h3 do ModalAdditional.vue (nome acessível da lista do degrau do meio)
  // "+ ": prefixo real do preço de adicional, AdditionalsList.vue
  extras: { rotulo: "Adicionais", prefixo: "+ " },
  // CartView.vue (texto real): "Seu carrinho" é o h1, e "Seu carrinho está vazio", o título do EmptyState;
  // o link do degrau "Peça" mostra o titulo e põe o resto do nome em visually-hidden
  carrinho: { titulo: "Seu carrinho", vazio: "Seu carrinho está vazio" },
  // provisório: as duas palavras da contagem calculada de adicionais da sobremesa ("1 adicional", "N adicionais")
  contagem: { adicional: "adicional", adicionais: "adicionais" },
  // ProductCard.vue (texto real): as duas faces do botão
  adicionar: "Adicionar",
  adicionado: "Adicionado",
  // provisório: rótulo do número de WhatsApp no rodapé, separado dele (sem o "·" de CONTATOS)
  whatsapp: "WhatsApp",
  // MenuView.vue (texto real): título do EmptyState
  vazio: "Nada nesta categoria por enquanto",
};

// "1 adicional" ou "N adicionais", pela regra de plural do português; o número vem da lista real
const plural = new Intl.PluralRules("pt-BR");
export const adicionais = (n) =>
  `${n} ${plural.select(n) === "one" ? TEXTOS.contagem.adicional : TEXTOS.contagem.adicionais}`;
