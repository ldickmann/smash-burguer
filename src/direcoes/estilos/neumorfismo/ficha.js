// Ficha deste estilo no índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação cita uma fonte aberta pelo rótulo entre colchetes (docs/direcoes/PESQUISA.md
// e docs/direcoes/pesquisa/neumorfismo.md). `cores` aponta para tokens: a ficha lê o valor no navegador.
// Módulo puro: o Node também lê.

export const FICHA = {
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
  custoResumo: "Alto",
  desvios: [
    "Borda de 1 px em todo controle (2 px com prefers-contrast: more [N9]) e cor sólida no estado ativo: em cores forçadas a sombra vira none e a borda fica [N8].",
    "O pressionado também muda de cor e ganha ícone, porque só a sombra para dentro não passa no 1.4.11 [N6].",
  ],
  fontes: [
    { ref: "N1", titulo: "Michał Malewicz: Neumorphism in user interfaces (versão do autor)", url: "https://hype4.academy/articles/design/neumorphism-in-user-interfaces" },
    { ref: "N2", titulo: "NN/g: Skeuomorphism", url: "https://www.nngroup.com/articles/skeuomorphism/" },
    { ref: "N3", titulo: "CSS-Tricks: Neumorphism and CSS", url: "https://css-tricks.com/neumorphism-and-css/" },
    { ref: "N4", titulo: "MDN: box-shadow", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" },
    { ref: "N5", titulo: "Google: estudo com pessoas de baixa visão (apresentação)", url: "https://docs.google.com/presentation/d/1CFNxozlyO1lmiyRVCFuhQ_0t2c5QTLskY03CCeTpUuA/htmlpresent" },
    { ref: "N6", titulo: "W3C: Understanding 1.4.11 Non-text Contrast", url: "https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast" },
    { ref: "N8", titulo: "MDN: @media/forced-colors", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors" },
    { ref: "N9", titulo: "MDN: @media/prefers-contrast", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast" },
  ],
};
