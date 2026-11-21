// Ficha deste estilo no índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação cita uma fonte aberta pelo rótulo entre colchetes (docs/direcoes/PESQUISA.md
// e docs/direcoes/pesquisa/esqueumorfismo.md). `cores` aponta para tokens: a ficha lê o valor no navegador.
// Módulo puro: o Node também lê.

export const FICHA = {
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
  custoResumo: "O mais alto",
  desvios: [
    "Comanda com foto do lanche: a de verdade não tem, mas o cardápio precisa da imagem.",
    "Com movimento reduzido, comandas e carimbo ficam retos (sem o giro de ±0,75° e de −8°), pela regra do projeto de usar transform só com movimento.",
    "Grão do papel gerado com feTurbulence nesta exploração; nenhuma textura foi copiada.",
    "Títulos de seção gravados, sem placa: a placa fica só na marca, que é clicável [E15].",
  ],
  fontes: [
    { ref: "E1", titulo: "NN/g: Skeuomorphism (Megan Chan, 15/03/2024)", url: "https://www.nngroup.com/articles/skeuomorphism/" },
    { ref: "E3", titulo: "NN/g: iOS 7", url: "https://www.nngroup.com/articles/ios-7/" },
    { ref: "E4", titulo: "Apple HIG: Materials", url: "https://developer.apple.com/design/human-interface-guidelines/materials.md" },
    { ref: "E5", titulo: "Apple: Liquid Glass", url: "https://developer.apple.com/documentation/technologyoverviews/liquid-glass.md" },
    { ref: "E6", titulo: "NN/g: Liquid Glass (10/10/2025)", url: "https://www.nngroup.com/articles/liquid-glass/" },
    { ref: "E9", titulo: "NN/g: Flat UI Elements Attract Less Attention and Cause Uncertainty", url: "https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/" },
    { ref: "E11", titulo: "NN/g: Young Adults and Flat Design", url: "https://www.nngroup.com/articles/young-adults-flat-design/" },
    { ref: "E12", titulo: "W3C: Understanding 1.4.3 Contrast (Minimum)", url: "https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum" },
  ],
};
