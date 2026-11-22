// Microcopy da Home deste estilo: só títulos de seção e rótulos que o app não tem.
// Cada texto novo leva o comentário // provisório e passa pela revisão de UX copy.
// Nada de número, prazo, taxa, preço, nota, avaliação, depoimento, promessa ou promoção.
// Módulo puro: o portão de conteúdo (P15) também lê.
// O título "Bebidas e sobremesas" não está aqui: sai dos rótulos reais das categorias (dados.js) e,
// pela decisão da sessão principal de 21/11/2026, fica com este estilo.

export const TEXTOS = {
  ingredientes: "Ingredientes", // provisório (título da folha e começo de "Ingredientes de <nome>")
  vazio: "Nada nesta categoria por enquanto", // provisório (o mesmo texto do MenuView)
  ondeTitulo: "Onde e quando", // provisório
  email: "E-mail", // provisório
  whatsapp: "WhatsApp", // provisório (rótulo do contato; o número sai sozinho de TELEFONE, em dados.js)
  monteTitulo: "Monte o seu", // provisório (h2 de monte-o-seu: o nome que o usuário deu à seção)
  monteLanche: "No hambúrguer", // provisório (h3 dos adicionais de lanche; "Hambúrgueres" inclui a Batata Frita)
  monteSobremesa: "Na sobremesa", // provisório (h3 dos adicionais de sobremesa)
};
