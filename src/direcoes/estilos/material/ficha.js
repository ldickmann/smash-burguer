// Ficha deste estilo no índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação cita uma fonte aberta pelo rótulo entre colchetes (docs/direcoes/PESQUISA.md,
// docs/direcoes/pesquisa/material.md e docs/direcoes/pesquisa/home-delivery.md). `cores` aponta para
// tokens: a ficha lê o valor no navegador. Rodada 2: a Home nova (docs/direcoes/desenho/material.md).
// Módulo puro: o Node também lê.

export const FICHA = {
  tese:
    "No Material 3, a marca vira sistema: uma cor-semente (aqui, alface) gera o esquema [33], com os papéis de cor em pares [1][5]. O Expressive soma molas, troca de forma e tipografia enfatizada [25]. No hero, a Home nova cria um momento expressivo próprio do produto, como pede o nível excelente [65]. Ali, o disco de 12 lobos em primary é cortado pelo contêiner. Na entrada, uma bola é achatada e vira o disco: é a prensa do smash, feita com escala e opacidade (sem morph de forma). Fora do hero, a Home usa superfícies tonais, o feed [64] e listas em blocos [66][81].",
  cores: [
    { nome: "Alface (primary)", token: "m3-primary" },
    { nome: "Alface clara (primary-container)", token: "m3-primary-container" },
    { nome: "Tonal (secondary-container)", token: "m3-secondary-container" },
    { nome: "Fundo (surface)", token: "m3-surface" },
    { nome: "Card (surface-container-highest)", token: "m3-surface-container-highest" },
    { nome: "Tinta (on-surface)", token: "m3-on-surface" },
    { nome: "Tinta variante", token: "m3-on-surface-variant" },
    { nome: "Badge (error)", token: "m3-error" },
  ],
  tipografia:
    "Roboto, a fonte padrão do M3 [1][14], na escala do M3 [1]. O título do hero fica em display, com peso 500 por escolha desta Home: 36/44 abaixo de 1024, 45/52 em 1024 e 57/64 em 1440. Hambúrgueres em headline-m 28/36 (24/32 no celular); os títulos das listas em headline-s 24/32; o nome do card em title-l 22/28; o texto em body-l 16/24; o botão S em label-l 14/20 e o M em title-m 16/24; os rótulos da toolbar no celular em label-m 12/16 [1].",
  pros: [
    "As cores saem de um algoritmo e de uma semente, com um papel para cada uso: primary, container, surface, outline [1][5][33].",
    "A contenção organiza a página: contêineres agrupados dividem o espaço para criar hierarquia [66]. O Google relata que a contenção de alto contraste ajuda o uso [26].",
    "A toolbar flutuante em pílula é recorrente em apps publicados do Google: Photos, Files, Chat e Androidify [83][81][67]. Os links ficam à vista, e a navegação escondida piora a descoberta [H14].",
    "O Google relata 46 estudos, com mais de 18 mil participantes [26]. No eye-tracking em 10 apps, os elementos-chave foram achados até 4 vezes mais rápido [26]. É pesquisa do próprio autor do estilo, sem replicação independente.",
    "Estados descritos e prontos para virar token: camada de 8% no hover e 10% no pressionado [12], anel de foco de 3 px em secondary [30].",
  ],
  contras: [
    "A mesma pesquisa diz que o estilo não serve a todo produto, que tirar rótulos piorou a usabilidade e que uma minoria preferiu as versões calmas [26][27].",
    "A pesquisa não encontrou site nem app de comida publicado em M3 Expressive para servir de modelo [36][86][87].",
    "Nem diretriz oficial de página inteira para a web: o mais perto são o layout feed [64] e os hero moments de um guia de relógio [65].",
    "Na web, o @material/web está em manutenção e não tem top app bar, badge nem carrossel [29]: os 11 componentes da Home foram feitos à mão.",
    "O repositório do Theme Builder foi arquivado em 23/07/2026 [32]; o esquema daqui veio da biblioteca de cores [33].",
  ],
  riscos: [
    "Toolbar como navegação principal: o uso é disputado [83]. A Home mantém os rótulos à vista [26] e ancora a pílula no topo a partir de lg.",
    "Foco coberto pela barra fixa [76]: abaixo de lg, a reserva no pé e no scroll-padding-bottom é fixa em 6 rem, a pílula de 64 px mais dois afastamentos de 16 px. Um rótulo maior, com zoom só de texto, pode passar dela.",
    "Mola com overshoot: na curva linear() da mola espacial rápida, o pico é 1,094, ou 9,4% além do alvo; ela roda no chevron, na folha, no check e no badge. A mola lenta da prensa passa 1,5%. As duas só rodam sem o movimento reduzido [77].",
    "Contraste com pouca folga: o Adicionar pressionado dá 5,09:1 (on-primary sobre primary-pressed) e o hover, 5,33:1, contra o mínimo de 4,5.",
    "No cookie do destaque, o prato claro da foto encosta no fundo do card nos lobos de baixo.",
    "A linha de direitos do rodapé ainda junta textos com \"·\", porque é o texto real do copyright.",
  ],
  custo:
    "Alto. Todas as cores viram papéis do M3; entram raios (pílula, card 12, contêiner 28 e 48, listas 20 e 4), camada de estado e molas como tokens, e a rodada 2 somou tokens de forma, medida e layout, sem cor nova. A Home pede 11 componentes feitos à mão [29]. No resto do app, BaseButton (formas e troca de forma), ProductCard, CartBadge (badge do M3), CategoryTabs, BaseDialog, AppToast (snackbar), os campos e o admin precisam ser refeitos. A Roboto Variable passa a ser servida em produção: o arquivo latino tem 43 KB em woff2.",
  custoResumo: "Alto",
  desvios: [
    "Ícones do Font Awesome no lugar dos Material Symbols [71].",
    "Molas do Expressive [23] convertidas em curvas linear() por um script: é uma aproximação da física do Compose.",
    "Sem morph de forma: a prensa usa escala, giro e opacidade, e os botões trocam de forma por opacidade entre duas camadas, pela regra do projeto de animar só transform e opacity [72].",
    "Os guias de níveis de expressão e de linguagem do Expressive são do Wear OS [65][66]; na Home web, servem só de intenção.",
    "Botão S de 40 dp com 44 px de altura [19], pela regra de alvo de toque do projeto.",
    "Sem ripple: só as camadas de estado [12].",
    "Sombras de elevação aproximadas, nos níveis do M3 [10].",
  ],
  secoes: [
    {
      id: "hero",
      nome: "Hero: a prensa",
      papel:
        "Diz quem é a casa e leva ao cardápio. A partir de md, o título, o texto e o Ver cardápio ficam dentro do disco de 12 lobos, cortado pelo contêiner primary-container de canto 48; o lanche quebra a borda de baixo. É o hero moment: um momento expressivo próprio do produto [65].",
    },
    {
      id: "lanches",
      nome: "Hambúrgueres",
      papel:
        "Feed com os 7 lanches à vista, sem carrossel [75]. Um lanche ocupa duas colunas, porque no feed o item maior recebe a atenção [64]; é o Smash Burger por levar o nome da casa, sem dado de vendas por trás. Cada card tem foto, nome, preço e o split button.",
    },
    {
      id: "bebidas-e-sobremesas",
      nome: "Bebidas e sobremesas",
      papel:
        "Lista segmentada num contêiner [66][81], com as bebidas em miniatura redonda, a sobremesa em flor e o Adicionar tonal. Mostra a variedade da casa na própria Home [H21], já que o cardápio abre em Hambúrgueres.",
    },
    {
      id: "onde",
      nome: "Onde e quando",
      papel:
        "Lista agrupada sempre aberta com o horário, o endereço, o WhatsApp e o e-mail [66][81]. Só os contatos são links; o horário é informação. A partir de lg, fica ao lado de Bebidas e sobremesas.",
    },
  ],
  componentes: [
    { nome: "M3BarraSuperior", papel: "Cabeçalho com a marca; fixo e opaco a partir de lg, e abriga a toolbar." },
    {
      nome: "M3BarraFerramentas",
      papel:
        "Toolbar flutuante em pílula com Início, Cardápio e Entrar ou Perfil, e o FAB do carrinho com badge ao lado [57][83]. Flutua embaixo à direita abaixo de lg.",
    },
    {
      nome: "M3Botao",
      papel: "Botão filled, tonal ou de texto, S (44 px) ou M (56 px); pressionado, os cantos diminuem [19][54]. Tem a face Adicionado.",
    },
    {
      nome: "M3BotaoDividido",
      papel:
        "Split button: Adicionar na frente; atrás, a metade que gira o chevron, vira pílula e abre os ingredientes do produto [55].",
    },
    {
      nome: "M3FolhaIngredientes",
      papel: "Superfície flutuante com os ingredientes. Uma aberta por vez; o Esc fecha e devolve o foco à metade que a abriu.",
    },
    {
      nome: "M3CartaoLanche",
      papel:
        "Filled card do feed, com um conteúdo por card [63]. Na Home, não tem sombra nem hover. Pode ser comum, com foto 4:3 de canto 28 [34], ou destaque, com a foto no cookie.",
    },
    {
      nome: "M3FormaPrensa",
      papel: "O disco de 12 lobos e a bola que é achatada na entrada; achatamento e entrada com mola, só com o movimento liberado; sem morph de forma.",
    },
    { nome: "M3Foto", papel: "Foto de produto recortada em cartão, cookie, círculo ou flor, com ícone de reserva quando a imagem falha." },
    {
      nome: "M3ItemLista",
      papel: "Item da lista segmentada com produto, preço e Adicionar tonal; cantos de 20 por fora e 4 por dentro [8], com vão de 2 px.",
    },
    {
      nome: "M3ItemSegmentado",
      papel: "Item da lista de horário e contato. Com link, a linha inteira é o alvo; a cor do círculo do ícone separa informação de ação.",
    },
    { nome: "M3Rodape", papel: "Rodapé em surface-container com a marca, a descrição e os direitos." },
  ],
  referencias: [
    { ref: "57", padrao: "Ações ou abas numa pílula que flutua perto da base, com um FAB ao lado para a ação mais importante." },
    { ref: "83", padrao: "Aba ativa como pílula interna, FAB à direita e barra que não some ao rolar (Google Photos para iOS)." },
    { ref: "81", padrao: "Contêineres em vários apps do Google, como Gmail, Agenda e Drive, e a pílula de navegação do Chat." },
    { ref: "67", padrao: "Botão da câmera em forma de biscoito (Cookie9Sided) e transições com troca de forma (Androidify)." },
    { ref: "66", padrao: "Contêineres agrupados que dividem o espaço para criar hierarquia." },
    { ref: "65", padrao: "O nível excelente pede momentos expressivos próprios do produto." },
    { ref: "70", padrao: "Botões que mudam de forma com mola para separar estados." },
    { ref: "64", padrao: "Grade de itens equivalentes em que o maior recebe a atenção." },
    { ref: "63", padrao: "Um conteúdo coerente por card, na versão filled." },
    { ref: "55", padrao: "Ação principal na frente; a metade de trás expande, gira o ícone, muda de forma e pode abrir um card." },
    { ref: "54", padrao: "O botão pressionado troca de forma." },
    { ref: "34", padrao: "Imagens com canto extra-grande, aqui sem o carrossel." },
    { ref: "26", padrao: "Rótulos de texto visíveis e contenção de alto contraste." },
    { ref: "76", padrao: "Foco que a barra fixa não cobre, com scroll-padding (técnica C43)." },
    { ref: "75", padrao: "Mais de cinco quadros afastam o uso do carrossel: os 7 lanches ficam todos à vista." },
    { ref: "H14", padrao: "Poucos links de navegação ficam visíveis, sem menu escondido." },
    { ref: "H21", padrao: "Mostrar a variedade de tipos de produto na própria Home." },
  ],
  mudou: [
    "A top app bar com abas virou a toolbar flutuante em pílula, com os três links sempre à vista e o FAB do carrinho.",
    "O hero ganhou um contêiner de canto 48, e o disco passou a primary, maior e cortado pela borda.",
    "A partir de md, o título e o Ver cardápio ficam dentro do disco; na entrada, a bola vira o disco (a prensa).",
    "O Ver cardápio saiu do botão L (96 px) para o M (56 px).",
    "O carrossel Mais pedidos virou o feed Hambúrgueres, com os 7 à vista e o Smash Burger maior.",
    "O Adicionar virou split button, com a metade de trás que abre os ingredientes; o card não reage mais ao hover.",
    "Entraram Bebidas e sobremesas e Onde e quando, em listas segmentadas.",
    "O rodapé ficou com a marca, a descrição e os direitos; as redes saíram.",
  ],
  fontes: [
    { ref: "1", titulo: "Android Developers: Material Design 3 in Compose", url: "https://developer.android.com/develop/ui/compose/designsystems/material3" },
    { ref: "5", titulo: "material-web: docs/theming/color.md", url: "https://github.com/material-components/material-web/blob/main/docs/theming/color.md" },
    { ref: "8", titulo: "material-web: tokens v0_192, _md-sys-shape.scss", url: "https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-shape.scss" },
    { ref: "10", titulo: "material-web: tokens v0_192, _md-sys-elevation.scss", url: "https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-elevation.scss" },
    { ref: "12", titulo: "androidx (Compose): StateTokens.kt", url: "https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StateTokens.kt" },
    { ref: "14", titulo: "material-web: docs/theming/typography.md", url: "https://github.com/material-components/material-web/blob/main/docs/theming/typography.md" },
    { ref: "15", titulo: "Android Developers: referência de material3/Typography", url: "https://developer.android.com/reference/kotlin/androidx/compose/material3/Typography" },
    { ref: "19", titulo: "androidx (Compose): ButtonSmallTokens.kt e tamanhos XS a XL", url: "https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonSmallTokens.kt" },
    { ref: "23", titulo: "androidx (Compose): ExpressiveMotionTokens.kt", url: "https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt" },
    { ref: "25", titulo: "Google: lançamento do Material 3 Expressive (13/05/2025)", url: "https://blog.google/products/android/material-3-expressive-android-wearos-launch" },
    { ref: "26", titulo: "Google Design: pesquisa do Expressive Material Design", url: "https://design.google/library/expressive-material-design-google-research" },
    { ref: "27", titulo: "Android Developers: benefícios do Expressive no Wear OS", url: "https://developer.android.com/design/ui/wear/guides/get-started/benefits" },
    { ref: "29", titulo: "GitHub: material-components/material-web", url: "https://github.com/material-components/material-web" },
    { ref: "30", titulo: "material-web: docs/components/focus-ring.md", url: "https://github.com/material-components/material-web/blob/main/docs/components/focus-ring.md" },
    { ref: "32", titulo: "GitHub: material-foundation/material-theme-builder (arquivado)", url: "https://github.com/material-foundation/material-theme-builder" },
    { ref: "33", titulo: "GitHub: material-foundation/material-color-utilities", url: "https://github.com/material-foundation/material-color-utilities" },
    { ref: "34", titulo: "Carousel (Jetpack Compose)", url: "https://developer.android.com/develop/ui/compose/components/carousel" },
    { ref: "36", titulo: "Jetsnack (android/compose-samples)", url: "https://github.com/android/compose-samples/tree/main/Jetsnack" },
    { ref: "54", titulo: "Button groups (Jetpack Compose)", url: "https://developer.android.com/develop/ui/compose/components/button-group" },
    { ref: "55", titulo: "Split button (Jetpack Compose)", url: "https://developer.android.com/develop/ui/compose/components/split-button" },
    { ref: "57", titulo: "Floating toolbar (Jetpack Compose)", url: "https://developer.android.com/develop/ui/compose/components/floating-toolbar" },
    { ref: "63", titulo: "Cards (Jetpack Compose)", url: "https://developer.android.com/develop/ui/compose/components/card" },
    { ref: "64", titulo: "Canonical layouts (Android)", url: "https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts" },
    { ref: "65", titulo: "Levels of expression (Wear OS)", url: "https://developer.android.com/design/ui/wear/guides/get-started/levels-expression" },
    { ref: "66", titulo: "Material 3 Expressive design language (Wear OS)", url: "https://developer.android.com/design/ui/wear/guides/get-started/design-language" },
    { ref: "67", titulo: "Androidify: building delightful UI with Compose (Android Developers Blog, 20/05/2025, Rebecca Franks)", url: "https://android-developers.googleblog.com/2025/05/androidify-building-delightful-ui-with-compose.html" },
    { ref: "70", titulo: "Introducing Material 3 Expressive for Wear OS (Android Developers Blog, 25/08/2025)", url: "https://android-developers.googleblog.com/2025/08/introducing-material-3-expressive-for-wear-os.html" },
    { ref: "71", titulo: "Material Symbols guide (Google Fonts)", url: "https://developers.google.com/fonts/docs/material_symbols" },
    { ref: "72", titulo: "How to create high-performance CSS animations (web.dev)", url: "https://web.dev/articles/animations-guide" },
    { ref: "75", titulo: "Carousel Usability (Nielsen Norman Group, Kara Pernice, 14/09/2013, revista em 07/08/2026)", url: "https://www.nngroup.com/articles/designing-effective-carousels/" },
    { ref: "76", titulo: "Understanding SC 2.4.11 Focus Not Obscured (Minimum) (W3C)", url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html" },
    { ref: "77", titulo: "Understanding SC 2.3.3 Animation from Interactions (W3C)", url: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html" },
    { ref: "81", titulo: "What Google Material 3 Expressive redesigns are rolling out (9to5Google, Abner Li, 17/11/2025)", url: "https://9to5google.com/2025/11/17/google-material-3-expressive-redesign/" },
    { ref: "83", titulo: "Floating toolbar do Google Photos (9to5Google, Abner Li, 12/02/2026)", url: "https://9to5google.com/2026/02/12/google-photos-floating-toolbar/" },
    { ref: "86", titulo: "davidmarinangeli/Foodie (GitHub)", url: "https://github.com/davidmarinangeli/Foodie" },
    { ref: "87", titulo: "Tópico material-3-expressive (GitHub)", url: "https://github.com/topics/material-3-expressive" },
    { ref: "H14", titulo: "Hamburger Menus and Hidden Navigation Hurt UX Metrics (NN/g; Kara Pernice e Raluca Budiu, 26/06/2016)", url: "https://www.nngroup.com/articles/hamburger-menus/" },
    { ref: "H21", titulo: "Homepage UX: Featuring Product Breadth (Baymard; Edward Scott, 04/02/2014, atualizado em 10/04/2025)", url: "https://baymard.com/blog/inferring-product-catalog-from-homepage" },
  ],
};
