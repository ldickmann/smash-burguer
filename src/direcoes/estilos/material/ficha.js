// Ficha deste estilo no índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação cita uma fonte aberta pelo rótulo entre colchetes (docs/direcoes/PESQUISA.md
// e docs/direcoes/pesquisa/material.md). `cores` aponta para tokens: a ficha lê o valor no navegador.
// Módulo puro: o Node também lê.

export const FICHA = {
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
  custoResumo: "Alto",
  desvios: [
    "Ícones do Font Awesome no lugar dos Material Symbols.",
    "Molas do Expressive [23] convertidas em curvas linear() por um script: é uma aproximação da física do Compose.",
    "Botão S de 40 dp com 44 px de altura [19], pela regra de alvo de toque do projeto.",
    "Sem ripple: só as camadas de estado [12].",
    "Sombras de elevação aproximadas, nos níveis do M3 [10].",
  ],
  fontes: [
    { ref: "1", titulo: "Android Developers: Material Design 3 in Compose", url: "https://developer.android.com/develop/ui/compose/designsystems/material3" },
    { ref: "5", titulo: "material-web: docs/theming/color.md", url: "https://github.com/material-components/material-web/blob/main/docs/theming/color.md" },
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
  ],
};
