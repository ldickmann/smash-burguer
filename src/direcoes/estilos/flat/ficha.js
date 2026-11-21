// Ficha deste estilo no índice (#/direcoes). Texto de documentação, não da loja.
// Cada afirmação cita uma fonte aberta pelo rótulo entre colchetes (docs/direcoes/PESQUISA.md
// e docs/direcoes/pesquisa/flat.md). `cores` aponta para tokens: a ficha lê o valor no navegador.
// Módulo puro: o Node também lê.

export const FICHA = {
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
  custoResumo: "Médio",
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
};
