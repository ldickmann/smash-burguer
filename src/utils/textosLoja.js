// Textos, contatos e rótulos reais da loja: a fonte única deles na produção (SPEC-material §4.1,
// "Lógica que vem junto"). Cópia de src/direcoes/compartilhado/dados.js, que segue no acervo, sem o
// carrossel (SECAO) e sem as redes sociais (REDES, §5.10). A origem de cada texto está no bloco.
// Módulo puro (sem Vue). Nenhum texto de loja novo: os textos da Home do material que ainda esperam
// a revisão de UX copy (§8.2) entram na etapa 5.

// src/layouts/MainLayout.vue (title e props do TheFooter). Endereço, telefone e e-mail também saem
// sozinhos, para mostrar o rótulo e o valor separados (sem juntar com "·")
export const MARCA = "Smash Burger";
export const DESCRICAO =
  "Sabor irresistível em cada mordida. Burgers suculentos, ingredientes frescos e um toque especial.";
export const ENDERECO = "Rua Beira da Praia - Navegantes, SC";
export const TELEFONE = "+55 47 5 6355 3265";
export const EMAIL = "contato@smashburger.com.br";
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

// src/components/layout/TheFooter.vue (sem o título das redes sociais, que saem do rodapé)
export const RODAPE = {
  endereco: "Endereço",
  horario: "Horário",
  copyright: `© 2026 ${MARCA} · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann`,
};

// src/components/layout/TheFooterContactInfo.vue. Ícones por nome, registrados em
// src/plugins/fontawesome.js
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
    // O rótulo sozinho, para mostrar rótulo e número separados (sem o "·")
    rotulo: "WhatsApp",
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

// src/views/MenuView.vue (props do BannerComponent)
export const FRASE_CARDAPIO = "Escolha, personalize e peça.";

// src/views/MenuView.vue (categories): rótulo de cada lista de products.json > menuItems
export const CATEGORIAS = [
  { chave: "foods", rotulo: "Hambúrgueres" },
  { chave: "drinks", rotulo: "Bebidas" },
  { chave: "desserts", rotulo: "Sobremesas" },
];

// Rótulos da Home do material que já existem na produção (SPEC-material §8.2, "tirar a marca"):
// ingredientes é a legenda da seção do src/components/ModalAdditional.vue; email, o rótulo dos
// formulários (LoginView, RegisterView e ProfileView); whatsapp, o CONTATOS[whatsapp].rotulo
export const TEXTOS = {
  ingredientes: "Ingredientes",
  email: "E-mail",
  whatsapp: "WhatsApp",
};
