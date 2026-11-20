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
};
