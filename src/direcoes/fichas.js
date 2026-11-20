// Conteúdo das fichas do índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação sobre um estilo cita uma fonte aberta, pelo rótulo entre colchetes; a lista
// completa, com o que não abriu, fica em docs/direcoes/PESQUISA.md.
// `cores` aponta para tokens: a ficha lê o valor do próprio estilo no navegador.

export const FICHAS = {
  brasa: {
    tese:
      "A Home em produção: carvão quente com um único acento laranja, reservado para ação e seleção, Bebas Neue nos títulos, Archivo no texto e quatro micro-interações 3D em CSS [SPEC]. Entra sem nenhuma mudança, como régua para as outras sete.",
    cores: [
      { nome: "Carvão", token: "color-bg" },
      { nome: "Superfície do card", token: "color-surface-2" },
      { nome: "Texto", token: "color-ink" },
      { nome: "Texto secundário", token: "color-ink-muted" },
      { nome: "Brasa", token: "color-accent" },
      { nome: "Sucesso", token: "color-success" },
    ],
    tipografia:
      "Bebas Neue em caixa alta nos títulos de 28 px ou mais; Archivo variável no texto [SPEC].",
    pros: [
      "Já está publicada e verificada: o axe-core não achou violações WCAG 2.2 AA em 20 telas e estados, em 1440 e 390 px [README].",
      "Tokens, componentes, testes e scripts de verificação já existem.",
    ],
    contras: [
      "Fundo quase preto com um único acento vivo é um dos padrões que a skill frontend-design aponta como típicos de páginas geradas por IA [skill].",
      "Com visão normal, a leitura rendeu mais no tema claro, e a vantagem cresce com a fonte menor [45].",
    ],
    riscos: [
      "Ser confundida com qualquer hamburgueria de tema escuro.",
      "As fotos do cardápio, escuras, dependem da sombra e da borda do card para não sumir no fundo.",
    ],
    custo: "Zero: é o sistema atual.",
    custoResumo: "zero",
    desvios: [],
    fontes: [
      { ref: "SPEC", titulo: "SPEC.md, §0, §2 e §7 (neste repositório)" },
      { ref: "README", titulo: "README.md, seção Interface (neste repositório)" },
      { ref: "skill", titulo: "Skill frontend-design, carregada nesta exploração" },
      {
        ref: "45",
        titulo: "NN/g: Dark Mode vs. Light Mode: Which Is Better? (2020)",
        url: "https://www.nngroup.com/articles/dark-mode/",
      },
    ],
  },

  material: {
    tese:
      "No Material 3, a marca vira sistema: uma cor-semente gera os papéis de cor em pares, como primary e on-primary [1][5], e o Expressive soma molas, troca de forma e tipografia enfatizada [25]. A semente é a alface, que está em seis dos sete lanches e na foto do hero; a forma de 12 lobos vira a folha atrás do lanche.",
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
      "Roboto, a fonte padrão do M3 [1][14], na escala do M3: display-large 57/64 no título do hero, com peso 500, enfatizado [15]; headline-medium 28/36 em Mais pedidos; title-large 22/28 no card; body-large 16/24 no texto; label-large 14/20 nos botões [1].",
    pros: [
      "As cores saem de um algoritmo e de uma semente, com um papel para cada uso: primary, container, surface, outline [1][5][33].",
      "O Google relata 46 estudos, com mais de 18 mil participantes, em que elementos-chave foram achados até 4 vezes mais rápido com o Expressive [26]. É pesquisa do próprio autor do estilo, sem replicação independente.",
      "Estados descritos e prontos para virar token: camada de 8% no hover e 10% no foco e no pressionado [12], anel de foco de 3 px em secondary [30].",
    ],
    contras: [
      "A mesma pesquisa diz que o estilo não serve a todo produto, que tirar rótulos piorou a usabilidade e que uma minoria preferiu as versões calmas [26][27].",
      "Na web, o @material/web está em manutenção e não tem top app bar, badge nem carrossel [29]: tudo aqui foi feito à mão.",
      "O repositório do Theme Builder foi arquivado em 23/07/2026 [32]; o esquema daqui veio da biblioteca de cores [33].",
    ],
    riscos: [
      "Parecer um app genérico do Google.",
      "A mola com overshoot (amortecimento 0,6) pode incomodar quem é sensível a movimento; ela só roda sem o movimento reduzido.",
      "O botão L, de 96 px, dominar o hero.",
      "Muitos tokens novos para manter.",
    ],
    custo:
      "Alto. Todas as cores viram papéis do M3; entram raios novos (botão redondo, card 12, diálogo 28), camada de estado e molas como tokens. BaseButton (formas e troca de forma), ProductCard, CartBadge (badge do M3), CategoryTabs (abas do M3), BaseDialog, AppToast (snackbar), os campos e o admin precisam ser refeitos, e a Roboto passa a ser servida em produção.",
    custoResumo: "alto",
    desvios: [
      "Ícones do Font Awesome no lugar dos Material Symbols.",
      "Molas do Expressive [23] convertidas em curvas linear() por um script: é uma aproximação da física do Compose.",
      "Botão S de 40 dp com 44 px de altura [19], pela regra de alvo de toque do projeto.",
      "Sem ripple: só as camadas de estado [12].",
      "Sombras de elevação aproximadas, nos níveis do M3 [10].",
    ],
    fontes: [
      { ref: "1", titulo: "Android Developers: Material Design 3 in Compose", url: "https://developer.android.com/develop/ui/compose/designsystems/material3" },
      { ref: "5", titulo: "material-web: docs/theming/color.md" },
      { ref: "10", titulo: "material-web: tokens v0_192, _md-sys-elevation.scss" },
      { ref: "12", titulo: "androidx (Compose): StateTokens.kt" },
      { ref: "14", titulo: "material-web: docs/theming/typography.md" },
      { ref: "15", titulo: "Android Developers: referência de material3/Typography" },
      { ref: "19", titulo: "androidx (Compose): ButtonSmallTokens.kt e tamanhos XS a XL" },
      { ref: "23", titulo: "androidx (Compose): ExpressiveMotionTokens.kt" },
      { ref: "25", titulo: "Google: lançamento do Material 3 Expressive (13/05/2025)", url: "https://blog.google/products/android/material-3-expressive-android-wearos-launch" },
      { ref: "26", titulo: "Google Design: pesquisa do Expressive Material Design", url: "https://design.google/library/expressive-material-design-google-research" },
      { ref: "27", titulo: "Android Developers: benefícios do Expressive no Wear OS", url: "https://developer.android.com/design/ui/wear/guides/get-started/benefits" },
      { ref: "29", titulo: "GitHub: material-components/material-web", url: "https://github.com/material-components/material-web" },
      { ref: "30", titulo: "material-web: docs/components/focus-ring.md" },
      { ref: "32", titulo: "GitHub: material-foundation/material-theme-builder (arquivado)", url: "https://github.com/material-foundation/material-theme-builder" },
      { ref: "33", titulo: "GitHub: material-foundation/material-color-utilities", url: "https://github.com/material-foundation/material-color-utilities" },
    ],
  },

  esqueumorfismo: {
    tese:
      "O esqueumorfismo traz objetos do mundo real para a interface [E1]. Aqui a Home vira o caminho do pedido numa cozinha de smash: a coifa de inox no topo, o lanche na chapa, os mais pedidos como comandas presas no trilho e o rodapé como o cupom. Cada metáfora tem função: a comanda é o item que se pede.",
    cores: [
      { nome: "Inox", token: "esq-inox" },
      { nome: "Chapa", token: "esq-chapa" },
      { nome: "Papel térmico", token: "esq-papel" },
      { nome: "Tinta de impressão", token: "esq-tinta" },
      { nome: "Tinta clara", token: "esq-tinta-clara" },
      { nome: "Ketchup", token: "esq-ketchup" },
      { nome: "Letra clara", token: "esq-letra" },
      { nome: "LED", token: "esq-led" },
    ],
    tipografia:
      "A do próprio objeto: Courier Prime na comanda, na etiqueta e no cupom, como a impressão térmica, e Bebas Neue nas placas e no título estampado. As fontes abertas não prescrevem tipografia para o estilo [E1]; a escolha segue o objeto imitado.",
    pros: [
      "Objetos conhecidos encurtam a curva de aprendizado [E1].",
      "Sinais fortes de clique (relevo, brilho, sombra) ajudam a achar o alvo; com sinais fracos, o olhar se espalha mais [E9].",
      "Quem tem 35 anos ou mais deu ao flat 0,53 ponto a menos numa escala de 1 a 7; o design com algum esqueumorfismo teve notas iguais nas duas faixas de idade [E11].",
    ],
    contras: [
      "Poluição visual, carregamento mais lento, metáfora física que confunde e visual que envelhece [E1].",
      "O iOS 7, em 2013, abandonou esse visual, e o flat veio como reação a ele [E1][E3].",
      "Hoje a Apple fala em materiais e Liquid Glass, não em esqueumorfismo [E4][E5]; a NN/g chama o Liquid Glass de glassmórfico [E6].",
    ],
    riscos: [
      "Cair no kitsch, e o peso de pintura das texturas e sombras (medir com a CPU reduzida).",
      "Courier abaixo de 16 px perde legibilidade; por isso o texto da comanda fica em 16 px.",
      "Texto sobre textura: o contraste é medido no ponto mais escuro do grão [E12].",
    ],
    custo:
      "O mais alto. Texturas e sombras viram tokens; botões, cards, abas e campos são redesenhados como objetos; carrinho e pagamento precisam de metáforas próprias; o admin não tem metáfora óbvia; manutenção e desempenho pesam.",
    custoResumo: "o mais alto",
    desvios: [
      "Comanda com foto do lanche: a de verdade não tem, mas o cardápio precisa da imagem.",
      "Com movimento reduzido, comandas, etiqueta e carimbo ficam retos (sem o giro de ±1° e de −8°), pela regra do projeto de usar transform só com movimento.",
      "Grão do papel gerado com feTurbulence nesta exploração; nenhuma textura foi copiada.",
    ],
    fontes: [
      { ref: "E1", titulo: "NN/g: Skeuomorphism (Megan Chan, 15/03/2024)", url: "https://www.nngroup.com/articles/skeuomorphism/" },
      { ref: "E3", titulo: "NN/g: iOS 7" },
      { ref: "E4", titulo: "Apple HIG: Materials", url: "https://developer.apple.com/design/human-interface-guidelines/materials.md" },
      { ref: "E5", titulo: "Apple: Liquid Glass", url: "https://developer.apple.com/documentation/technologyoverviews/liquid-glass.md" },
      { ref: "E6", titulo: "NN/g: Liquid Glass (10/10/2025)", url: "https://www.nngroup.com/articles/liquid-glass/" },
      { ref: "E9", titulo: "NN/g: Flat UI Elements Attract Less Attention and Cause Uncertainty" },
      { ref: "E11", titulo: "NN/g: Young Adults and Flat Design", url: "https://www.nngroup.com/articles/young-adults-flat-design/" },
      { ref: "E12", titulo: "W3C: Understanding 1.4.3 Contrast (Minimum)" },
    ],
  },

  neumorfismo: {
    tese:
      "O neumorfismo extruda a interface do mesmo material do fundo, com uma sombra clara e uma escura em lados opostos e a luz no canto superior esquerdo [N1][N3]; o pressionado é a sombra para dentro [N3]. O material é o kraft das embalagens de delivery, e o gesto é o do smash: o que se aperta afunda. Os controles levam borda e cor sólida, para não depender só da sombra, o ponto fraco documentado do estilo [N2][N6].",
    cores: [
      { nome: "Kraft", token: "neu-kraft" },
      { nome: "Luz do kraft", token: "neu-luz" },
      { nome: "Sombra do kraft", token: "neu-sombra" },
      { nome: "Tinta", token: "neu-tinta" },
      { nome: "Tinta suave", token: "neu-tinta-suave" },
      { nome: "Borda", token: "neu-borda" },
      { nome: "Ketchup", token: "neu-ketchup" },
      { nome: "Alface", token: "neu-alface" },
    ],
    tipografia:
      "Nunito, nos pesos 400, 600 e 800. As fontes abertas não citam uma tipografia do neumorfismo; a Nunito entrou porque os terminais arredondados repetem a extrusão macia. É escolha de projeto, não fonte típica documentada.",
    pros: [
      "O fundo pode ter qualquer matiz, desde que não seja preto nem branco puro [N1]: o kraft dá à marca uma cor que nenhum outro estilo daqui usa.",
      "O pressionado (sombra para dentro) e o convexo (degradê no ângulo da luz) têm receita conhecida em CSS [N3][N4].",
    ],
    contras: [
      "O clicável se parece com o não clicável, e o estilo nunca virou mainstream por baixo contraste e pistas de clique inconsistentes [N2].",
      "O pressionado só por sombra invertida não comunica [N1]; aplicado em tudo, achata a hierarquia [N3].",
      "O próprio autor, em 2021: o produto ficou acessível, mas sem graça [N1].",
      "Num estudo qualitativo do Google com 15 pessoas de baixa visão, ninguém preferiu controles sem contorno nem sombra [N5].",
    ],
    riscos: [
      "Hierarquia achatada, porque tudo é do mesmo material; aqui a cor só aparece na ação e no estado.",
      "As fotos escuras parecerem buracos no kraft (a moldura afundada ameniza).",
      "O kraft parecer sujo em telas frias.",
    ],
    custo:
      "Alto. Sombra dupla e borda viram tokens, e todo componente ganha versão extrudada e afundada com borda. Formulários são o ponto mais caro (campo afundado com borda de 3:1), e o admin, denso, perde hierarquia.",
    custoResumo: "alto",
    desvios: [
      "Borda de 1 px em todo controle (2 px com prefers-contrast: more [N9]) e cor sólida no estado ativo: em cores forçadas a sombra vira none e a borda fica [N8].",
      "O pressionado também muda de cor e ganha ícone, porque só a sombra para dentro não passa no 1.4.11 [N6].",
    ],
    fontes: [
      { ref: "N1", titulo: "Michał Malewicz: Neumorphism in user interfaces (versão do autor)", url: "https://hype4.academy/articles/design/neumorphism-in-user-interfaces" },
      { ref: "N2", titulo: "NN/g: Skeuomorphism", url: "https://www.nngroup.com/articles/skeuomorphism/" },
      { ref: "N3", titulo: "CSS-Tricks: Neumorphism and CSS", url: "https://css-tricks.com/neumorphism-and-css/" },
      { ref: "N4", titulo: "MDN: box-shadow" },
      { ref: "N5", titulo: "Google: estudo com pessoas de baixa visão (apresentação)", url: "https://docs.google.com/presentation/d/1CFNxozlyO1lmiyRVCFuhQ_0t2c5QTLskY03CCeTpUuA/htmlpresent" },
      { ref: "N6", titulo: "W3C: Understanding 1.4.11 Non-text Contrast" },
      { ref: "N8", titulo: "MDN: @media/forced-colors" },
      { ref: "N9", titulo: "MDN: @media/prefers-contrast" },
    ],
  },

  "3d": {
    tese:
      "Não há definição canônica para \"3D e gradientes suaves\"; aqui é a família da profundidade: camadas, sombras macias, objetos em 3D e degradês, com o claymorphism (3D macio e inflado, duas sombras internas e uma externa, cantos muito arredondados) como referência [D3]. A profundidade é a do próprio lanche: as cores das camadas viram o degradê da página, os botões incham como pão e achatam quando apertados, como o smash.",
    cores: [
      { nome: "Pão claro", token: "3d-pao-claro" },
      { nome: "Tomate claro", token: "3d-tomate-claro" },
      { nome: "Alface clara", token: "3d-alface-clara" },
      { nome: "Maionese", token: "3d-maionese" },
      { nome: "Carne", token: "3d-carne" },
      { nome: "Carne suave", token: "3d-carne-suave" },
      { nome: "Ketchup", token: "3d-ketchup" },
      { nome: "Alface", token: "3d-alface" },
    ],
    tipografia:
      "Fredoka, títulos em 600 e texto em 400. O autor do claymorphism pede tipografia mínima e não cita uma fonte [D3]; a Fredoka tem forma inflada e terminais redondos, que ecoam o domo do pão. É escolha de projeto.",
    pros: [
      "Movimento com propósito mostra o que mudou: o botão achata ao apertar e vira para \"Adicionado\" [D11][D14].",
      "Profundidade real só com CSS: perspective e translateZ, sem biblioteca [D6][D8].",
      "O degradê em oklab evita a faixa acinzentada no meio da transição [D7].",
    ],
    contras: [
      "Animação decorativa frustra [D14], e o Liquid Glass cansou na repetição [D16].",
      "Paralaxe e movimento automático causam tontura em quem tem distúrbio vestibular [D12][D21].",
      "A Airbnb anunciou uma interface \"dimensional e animada\" [D5], mas é intenção da empresa, não evidência de resultado.",
    ],
    riscos: [
      "Parecer infantil.",
      "Movimento demais (2.3.3 [D18]): a paralaxe fica só no hero, só com mouse e sem movimento reduzido [D17][D21].",
      "Custo de pintura das sombras empilhadas.",
      "O 3D achatar por engano: nada de overflow: hidden ou opacity menor que 1 no elemento com preserve-3d [D9].",
    ],
    custo:
      "Médio-alto. Degradês, sombras de argila e molas viram tokens; o BaseButton ganha o achatar; o ProductCard fica em camadas; tilt e paralaxe pedem JS e teste de desempenho; o admin precisa de uma variante calma.",
    custoResumo: "médio-alto",
    desvios: [
      "Contraste do texto medido no ponto mais escuro do degradê, o tomate claro [D22].",
      "Mola do achatar convertida em linear() pelo mesmo script do Material 3 (aproximação).",
      "Com movimento reduzido: sem paralaxe, sem achatar e com a troca de face por opacidade.",
    ],
    fontes: [
      { ref: "D3", titulo: "Michał Malewicz: Claymorphism in user interfaces", url: "https://hype4.academy/articles/design/claymorphism-in-user-interfaces" },
      { ref: "D5", titulo: "Airbnb: 2025 Summer Release", url: "https://news.airbnb.com/en-uk/2025-summer-release-now-you-can-airbnb-more-than-an-airbnb/" },
      { ref: "D6", titulo: "W3C: CSS Transforms Module Level 2", url: "https://www.w3.org/TR/css-transforms-2/" },
      { ref: "D7", titulo: "MDN: linear-gradient()" },
      { ref: "D8", titulo: "MDN: perspective" },
      { ref: "D9", titulo: "MDN: transform-style" },
      { ref: "D11", titulo: "Apple HIG: Motion", url: "https://developer.apple.com/design/human-interface-guidelines/motion.md" },
      { ref: "D12", titulo: "NN/g: Executing UX Animations: Duration and Motion Characteristics", url: "https://www.nngroup.com/articles/animation-duration/" },
      { ref: "D14", titulo: "NN/g: The Role of Animation and Motion in UX" },
      { ref: "D16", titulo: "NN/g: Liquid Glass", url: "https://www.nngroup.com/articles/liquid-glass/" },
      { ref: "D17", titulo: "MDN: @media/hover" },
      { ref: "D18", titulo: "W3C: Understanding 2.3.3 Animation from Interactions", url: "https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions" },
      { ref: "D21", titulo: "MDN: @media/prefers-reduced-motion" },
      { ref: "D22", titulo: "W3C: Understanding 1.4.3 Contrast (Minimum)" },
    ],
  },

  flat: {
    tese:
      "O flat dispensa brilho, 3D e textura e nasceu como reação ao esqueumorfismo; o Metro e o Windows 8 são os marcos [F1]. Os princípios do Metro pedem tipografia celebrada, conteúdo em vez de enfeite e nada de brilho ou sombreado [F7]. As cores chapadas vêm dos ingredientes da foto do hero e do cardápio (cebola roxa, cheddar e alface), e a Home vira um painel de ladrilhos. É flat 2.0: os botões continuam com cara de botão, porque sinais fracos de clique custam tempo e atenção [F2][F3].",
    cores: [
      { nome: "Papel", token: "flat-papel" },
      { nome: "Tinta", token: "flat-tinta" },
      { nome: "Tinta suave", token: "flat-tinta-suave" },
      { nome: "Cebola roxa", token: "flat-cebola" },
      { nome: "Cheddar", token: "flat-cheddar" },
      { nome: "Alface", token: "flat-alface" },
      { nome: "Cinza", token: "flat-cinza" },
      { nome: "Ladrilho", token: "flat-ladrilho" },
    ],
    tipografia:
      "Segoe UI, a fonte de interface do Windows desde o Vista [MS1], e Open Sans nos outros sistemas: a Microsoft credita a Segoe a Steve Matteson [MS1], que também desenhou a Open Sans [OS]. No Windows Phone, cujo sistema de design tinha o codinome Metro [F8], a fonte de interface era a Segoe WP [MS2]. Títulos grandes em peso 300 e caixa baixa visual (escolha de projeto: não encontrei fonte aberta que descreva a caixa baixa como traço do Metro); 400 abaixo de 768 px; texto em 400 e botões em 600.",
    pros: [
      "Cor chapada também sinaliza: faixa colorida sugere navegação, fundo colorido sugere botão [F1].",
      "A diretriz de 2012 do Windows Phone pede um esquema de cor próprio da marca [F8].",
      "Barato de manter: sem sombras, texturas nem degradês.",
    ],
    contras: [
      "Com sinais fracos de clique, 22% mais tempo e 25% mais fixações num eyetracking com 71 pessoas [F2]; o uso prolongado gera incerteza de clique [F4].",
      "O ultraflat só serve a sites pequenos e pouco interativos; a NN/g recomenda o semiflat para a maioria dos produtos [F3].",
      "Pontos de paginação são sinal fraco num carrossel [F23].",
    ],
    riscos: [
      "Sinais de clique fracos: resolvidos com preenchimento no botão e sublinhado nos links.",
      "Título leve fraco no celular: peso 400 abaixo de 768 px.",
      "A Segoe UI só existe no Windows; nos outros sistemas entra a Open Sans.",
    ],
    custo:
      "Médio: baixo nos tokens (cores, raios, nenhuma sombra) e médio nos componentes (botões, cards, abas e campos planos com borda inferior de 3:1). O admin se adapta fácil.",
    custoResumo: "médio",
    desvios: [
      "Botões com canto de 4 px, e não retos, porque a NN/g associa o canto arredondado ao reconhecimento de botão [F5].",
      "O link atual leva sublinhado de 4 px, não só cor [F1].",
    ],
    fontes: [
      { ref: "F1", titulo: "NN/g: Flat Design: Its Origins, Its Problems", url: "https://www.nngroup.com/articles/flat-design/" },
      { ref: "F2", titulo: "NN/g: Flat UI Elements Attract Less Attention and Cause Uncertainty", url: "https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/" },
      { ref: "F3", titulo: "NN/g: Flat Design Best Practices", url: "https://www.nngroup.com/articles/flat-design-best-practices/" },
      { ref: "F4", titulo: "NN/g: Long-Term Exposure to Flat Design", url: "https://www.nngroup.com/articles/flat-design-long-exposure/" },
      { ref: "F5", titulo: "NN/g: Clickable Elements", url: "https://www.nngroup.com/articles/clickable-elements/" },
      { ref: "F7", titulo: "Windows Developer Blog: From Transportation to Pixels (2011)", url: "https://blogs.windows.com/windowsdeveloper/2011/02/17/from-transportation-to-pixels/" },
      { ref: "F8", titulo: "Microsoft: General design principles for Windows Phone", url: "https://learn.microsoft.com/en-us/previous-versions/visualstudio/hh202906(v=vs.105)" },
      { ref: "F23", titulo: "NN/g: Designing Effective Carousels", url: "https://www.nngroup.com/articles/designing-effective-carousels/" },
      { ref: "MS1", titulo: "Microsoft Typography: Segoe UI font family", url: "https://learn.microsoft.com/en-us/typography/font-list/segoe-ui" },
      { ref: "MS2", titulo: "Microsoft: Font and language configuration support for Windows Phone 8", url: "https://learn.microsoft.com/en-us/previous-versions/windows/apps/hh202920(v=vs.105)" },
      { ref: "OS", titulo: "Google Fonts: README do googlefonts/opensans", url: "https://github.com/googlefonts/opensans" },
    ],
  },
};
