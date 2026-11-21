// Ficha deste estilo no índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação cita uma fonte aberta pelo rótulo entre colchetes (docs/direcoes/PESQUISA.md
// e docs/direcoes/pesquisa/escuro.md). `cores` aponta para tokens: a ficha lê o valor no navegador.
// Módulo puro: o Node também lê.

export const FICHA = {
  tese:
    "O tema escuro é um modo de aparência, e muita gente o escolhe como padrão [47]. Aqui ele é a Brasa refeita pelas regras do Material 3 e da Apple: saem o carvão quente com sombra e brilho e o laranja vivo único; entram superfícies neutras em degraus tonais, o laranja num tom claro dessaturado e texto que não é branco puro [13][48][4]. A tabela abaixo compara com a Brasa da Home de produção (#/).",
  cores: [
    { nome: "Grafite (surface N6)", token: "esc-surface" },
    { nome: "Card (container N17)", token: "esc-surface-high" },
    { nome: "Rodapé (N4)", token: "esc-surface-lowest" },
    { nome: "Névoa (on-surface)", token: "esc-on-surface" },
    { nome: "Névoa variante", token: "esc-on-surface-variant" },
    { nome: "Brasa clara (primary 80)", token: "esc-primary" },
    { nome: "Cheddar (tertiary-container)", token: "esc-tertiary-container" },
    { nome: "Contorno (outline)", token: "esc-outline" },
  ],
  diferencas: [
    { tema: "Fundo", brasa: "carvão quente (color-bg)", aqui: "grafite neutro, surface N6 com croma 0 [48]" },
    { tema: "Elevação", brasa: "superfície, sombra e brilho", aqui: "só degraus tonais e contorno nos cards [46][4]" },
    { tema: "Acento", brasa: "laranja vivo e único", aqui: "tom 80 dessaturado, com papéis secundário e terciário [48]" },
    { tema: "Texto", brasa: "quase branco quente (color-ink)", aqui: "on-surface (tom 90), sem branco puro; 7:1 no texto pequeno como a Apple sugere [47]" },
    { tema: "Hero", brasa: "brilho de brasa atrás do lanche", aqui: "sem brilho" },
  ],
  tipografia:
    "Bebas Neue e Archivo, as da Brasa. No escuro, fonte fina some e a grossa borra [46]: o texto corrido fica em Archivo 450, os botões em 600 e a Bebas só a partir de 28 px.",
  pros: [
    "Cerca de um terço das pessoas usa o escuro, um terço o claro e um terço alterna [46]: o modo escuro atende uma parte grande do público.",
    "Regras publicadas para cada decisão: cinza escuro em vez de preto, tom 80 no acento, texto sem branco puro, elevação por superfície [13][48][4][47].",
    "O custo é o menor depois do minimalismo, porque os tokens do projeto já são semânticos.",
  ],
  contras: [
    "Para quem tem visão normal, o claro rendeu mais na leitura, e a vantagem cresce com a fonte menor; a NN/g não recomenda o escuro como padrão para o público geral e sugere oferecer a escolha [45].",
    "A economia de energia só existe em tela OLED [46].",
    "Armadilhas conhecidas: fundo branco em imagens, sombra que parece brilho, divisores e cards que somem [46].",
  ],
  riscos: [
    "Ainda lembrar a Brasa: a tabela acima e os neutros sem matiz deixam a diferença explícita.",
    "As fotos escuras sumirem nos cards escuros: o contorno em outline segura a borda.",
    "Para leitura, o claro rende mais [45].",
  ],
  custo:
    "Médio-baixo, porque os tokens já são semânticos. Na próxima fase vira o modo escuro do estilo escolhido, com o alternador Claro, Escuro e Sistema [49][50].",
  custoResumo: "Médio-baixo",
  desvios: [
    "Neutros com croma 0 no lugar dos neutros gerados da semente, que davam superfícies marrons quase iguais às da Brasa.",
  ],
  fontes: [
    { ref: "4", titulo: "androidx (Compose): ColorDarkTokens.kt", url: "https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ColorDarkTokens.kt" },
    { ref: "13", titulo: "material-components-android: docs/theming/Dark.md", url: "https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md" },
    { ref: "45", titulo: "NN/g: Dark Mode vs. Light Mode: Which Is Better? (2020)", url: "https://www.nngroup.com/articles/dark-mode/" },
    { ref: "46", titulo: "NN/g: Dark Mode: How Users Think About It and Issues to Avoid (2023)", url: "https://www.nngroup.com/articles/dark-mode-users-issues/" },
    { ref: "47", titulo: "Apple HIG: Dark Mode (JSON da página)", url: "https://developer.apple.com/tutorials/data/design/human-interface-guidelines/dark-mode.json" },
    { ref: "48", titulo: "Google Codelabs: Material Dark Theme", url: "https://codelabs.developers.google.com/codelabs/design-material-darktheme" },
    { ref: "49", titulo: "Android Developers: Dark theme", url: "https://developer.android.com/develop/ui/views/theming/darktheme" },
    { ref: "50", titulo: "web.dev: prefers-color-scheme", url: "https://web.dev/articles/prefers-color-scheme" },
  ],
};
