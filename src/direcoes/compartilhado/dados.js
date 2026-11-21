// Textos, contatos e rótulos reais da loja, copiados dos componentes de produção (origem em cada
// bloco). Nenhum texto de loja novo: as direções mudam só a apresentação. Módulo puro (sem Vue):
// o Node também lê, no portão de conteúdo.

// src/layouts/MainLayout.vue (title e props do TheFooter)
export const MARCA = "Smash Burger";
export const DESCRICAO =
  "Sabor irresistível em cada mordida. Burgers suculentos, ingredientes frescos e um toque especial.";
const ENDERECO = "Rua Beira da Praia - Navegantes, SC";
const TELEFONE = "+55 47 5 6355 3265";
const EMAIL = "contato@smashburger.com.br";
export const HORARIO = "Terça a sexta, das 13h à 01h";

// src/views/HomeView.vue (props do BannerComponent) e src/components/BannerComponent.vue (imagem)
export const HERO = {
  titulo: "Smash na chapa, entregue quente",
  texto: "Hambúrgueres artesanais prensados na hora. De terça a sexta, das 13h à 01h.",
  acao: "Ver cardápio",
  imagem: "/images/fundos/banner-burger-bg",
  alt: "Hambúrguer artesanal com queijo, carne prensada e alface",
  largura: 960,
  altura: 906,
};

// Recorte com transparência: WebP com alfa em 480 e 960, PNG 960 de reserva (BannerComponent.vue)
export const IMAGEM_HERO = { widths: [480, 960], fallbackWidth: 960, fallbackExt: "png" };

// src/views/HomeView.vue e src/components/CarouselBurguer.vue
export const SECAO = { titulo: "Mais pedidos", anterior: "Anterior", proximo: "Próximo" };

// src/components/layout/TheFooter.vue
export const RODAPE = {
  endereco: "Endereço",
  horario: "Horário",
  redes: "Redes sociais",
  copyright: `© 2026 ${MARCA} · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann`,
};

// src/components/layout/TheFooterContactInfo.vue
export const NOVA_ABA = " (abre em nova aba)";
export const CONTATOS = [
  {
    chave: "endereco",
    texto: ENDERECO,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`,
    externo: true,
    icone: ["fas", "location-dot"],
  },
  {
    chave: "whatsapp",
    texto: `WhatsApp · ${TELEFONE}`,
    href: `https://wa.me/${TELEFONE.replace(/\D/g, "")}`,
    externo: true,
    icone: ["fas", "phone"],
  },
  {
    chave: "email",
    texto: EMAIL,
    href: `mailto:${EMAIL}`,
    externo: false,
    icone: ["far", "envelope"],
  },
];

// src/components/layout/TheFooterSocialMediaLinks.vue
export const REDES = [
  { nome: "Facebook", icone: ["fab", "facebook-f"], url: "https://facebook.com" },
  { nome: "Instagram", icone: ["fab", "instagram"], url: "https://instagram.com" },
].map((rede) => ({ ...rede, rotulo: `${MARCA} no ${rede.nome}${NOVA_ABA}` }));

// src/views/MenuView.vue (props do BannerComponent)
export const FRASE_CARDAPIO = "Escolha, personalize e peça.";

// src/views/MenuView.vue (categories): rótulo de cada lista de products.json > menuItems
export const CATEGORIAS = [
  { chave: "foods", rotulo: "Hambúrgueres" },
  { chave: "drinks", rotulo: "Bebidas" },
  { chave: "desserts", rotulo: "Sobremesas" },
];
