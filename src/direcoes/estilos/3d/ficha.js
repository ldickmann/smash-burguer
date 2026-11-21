// Ficha deste estilo no índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação cita uma fonte aberta pelo rótulo entre colchetes (docs/direcoes/PESQUISA.md
// e docs/direcoes/pesquisa/3d.md). `cores` aponta para tokens: a ficha lê o valor no navegador.
// Módulo puro: o Node também lê.

export const FICHA = {
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
  custoResumo: "Médio-alto",
  desvios: [
    "Contraste do texto medido no ponto mais escuro do degradê, o tomate claro [D22].",
    "Mola do achatar convertida em linear() pelo mesmo script do Material 3 (aproximação).",
    "Com movimento reduzido: sem paralaxe, sem achatar e com a troca de face por opacidade.",
  ],
  fontes: [
    { ref: "D3", titulo: "Michał Malewicz: Claymorphism in user interfaces", url: "https://hype4.academy/articles/design/claymorphism-in-user-interfaces" },
    { ref: "D5", titulo: "Airbnb: 2025 Summer Release", url: "https://news.airbnb.com/en-uk/2025-summer-release-now-you-can-airbnb-more-than-an-airbnb/" },
    { ref: "D6", titulo: "W3C: CSS Transforms Module Level 2", url: "https://www.w3.org/TR/css-transforms-2/" },
    { ref: "D7", titulo: "MDN: linear-gradient()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient" },
    { ref: "D8", titulo: "MDN: perspective", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/perspective" },
    { ref: "D9", titulo: "MDN: transform-style", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style" },
    { ref: "D11", titulo: "Apple HIG: Motion", url: "https://developer.apple.com/design/human-interface-guidelines/motion.md" },
    { ref: "D12", titulo: "NN/g: Executing UX Animations: Duration and Motion Characteristics", url: "https://www.nngroup.com/articles/animation-duration/" },
    { ref: "D14", titulo: "NN/g: The Role of Animation and Motion in UX", url: "https://www.nngroup.com/articles/animation-purpose-ux/" },
    { ref: "D16", titulo: "NN/g: Liquid Glass", url: "https://www.nngroup.com/articles/liquid-glass/" },
    { ref: "D17", titulo: "MDN: @media/hover", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover" },
    { ref: "D18", titulo: "W3C: Understanding 2.3.3 Animation from Interactions", url: "https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions" },
    { ref: "D21", titulo: "MDN: @media/prefers-reduced-motion", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion" },
    { ref: "D22", titulo: "W3C: Understanding 1.4.3 Contrast (Minimum)", url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum" },
  ],
};
