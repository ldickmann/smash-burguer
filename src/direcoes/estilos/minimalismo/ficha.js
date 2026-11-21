// Ficha deste estilo no índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação cita uma fonte aberta pelo rótulo entre colchetes (docs/direcoes/PESQUISA.md
// e docs/direcoes/pesquisa/minimalismo.md). `cores` aponta para tokens: a ficha lê o valor no navegador.
// Módulo puro: o Node também lê.

export const FICHA = {
  tese:
    "O minimalismo tira o que não ajuda a tarefa [M1] e mantém o necessário [M3]; o flat trata de textura e ícone, o minimalismo de conteúdo, função e layout [M1]. A interface fica em preto e branco, a única cor da página é a da comida, nas fotos, e a tipografia larga e pesada faz o papel do smash: prensada até ficar baixa e larga.",
  cores: [
    { nome: "Branco", token: "min-branco" },
    { nome: "Preto", token: "min-preto" },
    { nome: "Cinza texto", token: "min-cinza-texto" },
    { nome: "Cinza linha", token: "min-cinza-linha" },
  ],
  tipografia:
    "Archivo, uma grotesca [AR], na linha da tipografia suíça que está na raiz do estilo [M2]. O título usa o eixo de largura do mesmo pacote: Archivo Expanded (largura 125) em 800, de 48 a 112 px conforme a largura da tela (84 px em 1440), com entrelinha 0,9, a tipografia dramática que a NN/g mediu [M1]. Seções em 700 e texto em 400, na largura normal.",
  pros: [
    "Os traços medidos em 112 sites estão aqui: textura plana (96%), paleta monocromática com uma cor fixa para a ação principal (95%), funções reduzidas (87%), espaço negativo (84%) e tipografia dramática (75%) [M1].",
    "Navegação visível no celular: 89% de uso e 24 s, contra 44% e 33 s com o ícone pequeno, num estudo com 179 pessoas [M8].",
    "O mais barato de levar ao sistema e de manter.",
  ],
  contras: [
    "Cortar o necessário é o risco do estilo [M3]; aqui ficam os links visíveis, o contador, a descrição e o preço.",
    "Botão vazado e cinza claro ficam ilegíveis [M1]: a ação é sempre preta e cheia.",
  ],
  riscos: [
    "O título enorme quebrar mal no celular: em 390 px ele fica em quatro linhas de 48 px; de 768 px para cima, em duas.",
    "Páginas em preto e branco parecerem inacabadas.",
    "Depender da qualidade das fotos, que viram a única cor.",
  ],
  custo:
    "O mais baixo. Cor e raio nos tokens; a largura da Archivo em produção (o arquivo com o eixo de largura é maior que o de peso); componentes mais simples; o admin fica fácil.",
  custoResumo: "O mais baixo",
  desvios: [
    "Sem menu escondido: os quatro links ficam visíveis também no celular [M8].",
    "Setas e paginação ficam visíveis, com o estado ativo óbvio [M9].",
    "A página usa uma largura maior que a do resto do projeto (até 1440 px), para o título caber em duas linhas em dois terços dela.",
  ],
  fontes: [
    { ref: "M1", titulo: "NN/g: Characteristics of Minimalism in Web Design", url: "https://www.nngroup.com/articles/characteristics-minimalism/" },
    { ref: "M2", titulo: "NN/g: The Roots of Minimalism in Web Design", url: "https://www.nngroup.com/articles/roots-minimalism-web-design/" },
    { ref: "M3", titulo: "NN/g: Aesthetic and Minimalist Design (heurística nº 8)", url: "https://www.nngroup.com/articles/aesthetic-minimalist-design/" },
    { ref: "M7", titulo: "Vitsœ: Dieter Rams, Good Design", url: "https://www.vitsoe.com/us/about/good-design" },
    { ref: "M8", titulo: "NN/g: Hamburger Menus and Hidden Navigation", url: "https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/" },
    { ref: "M9", titulo: "NN/g: Designing Effective Carousels", url: "https://www.nngroup.com/articles/designing-effective-carousels/" },
    { ref: "AR", titulo: "Omnibus-Type: README da Archivo", url: "https://github.com/Omnibus-Type/Archivo" },
  ],
};
