// Contraste do WCAG 2.x (critérios 1.4.3 e 1.4.11) e os pares de tokens medidos em cada direção.
// Usado pela ficha do índice, no navegador, e pelo script de verificação, no Node: por isso não
// importa nada do Vue nem do DOM.

// ---------- Fórmula ----------

const canal = (valor) => {
  const c = valor / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export const luminancia = ([r, g, b]) => 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);

export const razao = (a, b) => {
  const [clara, escura] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (clara + 0.05) / (escura + 0.05);
};

// Hex de 3, 4, 6 ou 8 dígitos e as funções rgb e rgba → [r, g, b, alfa]; o resto → null
export const lerCor = (texto) => {
  const valor = String(texto ?? "").trim().toLowerCase();
  if (valor === "transparent") return [0, 0, 0, 0];
  if (valor.startsWith("#")) {
    let hex = valor.slice(1);
    if (hex.length === 3 || hex.length === 4) hex = [...hex].map((c) => c + c).join("");
    if (![6, 8].includes(hex.length)) return null;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const alfa = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    return [r, g, b, alfa];
  }
  const funcao = valor.match(/^rgba?\(([^)]+)\)$/);
  if (!funcao) return null;
  const partes = funcao[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
  return [partes[0], partes[1], partes[2], partes[3] ?? 1];
};

// Cor (possivelmente translúcida) pintada sobre um fundo opaco
export const compor = ([r, g, b, alfa = 1], [fr, fg, fb]) => [
  r * alfa + fr * (1 - alfa),
  g * alfa + fg * (1 - alfa),
  b * alfa + fb * (1 - alfa),
  1,
];

/**
 * Mede um par. `ler(token)` devolve o valor CSS do token (sem o "--"), já com os var() resolvidos.
 * O fundo translúcido é composto sobre `par.sobre` (padrão: color-bg); a frente, sobre o fundo.
 * @returns {number|null} a razão, ou null se algum valor não for uma cor simples
 */
export const medirPar = (ler, par) => {
  const base = lerCor(ler(par.sobre ?? "color-bg"));
  const fundo = lerCor(ler(par.fundo));
  const frente = lerCor(ler(par.frente));
  if (!base || !fundo || !frente) return null;
  const fundoOpaco = compor(fundo, compor(base, [255, 255, 255]));
  return razao(compor(frente, fundoOpaco), fundoOpaco);
};

// O WCAG não arredonda: 4,499 não passa em 4,5. A exibição corta em duas casas.
export const passa = (valor, minimo) => valor !== null && valor >= minimo;
export const cortarDuasCasas = (valor) => Math.floor(valor * 100) / 100;

// ---------- Pares ----------
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.

// Usados pelos componentes reais que aparecem em todas as Homes: modal Personalizar, toast e skip link
export const PARES_COMUNS = [
  { frente: "color-ink", fundo: "color-bg", minimo: 4.5, onde: "texto principal na página" },
  { frente: "color-ink-muted", fundo: "color-bg", minimo: 4.5, onde: "texto secundário" },
  { frente: "color-ink", fundo: "color-surface-2", minimo: 4.5, onde: "modal Personalizar" },
  { frente: "color-ink-muted", fundo: "color-surface-2", minimo: 4.5, onde: "ajuda e descrição no modal" },
  { frente: "color-ink", fundo: "color-surface-3", minimo: 4.5, onde: "aviso (toast)" },
  { frente: "color-ink", fundo: "color-input", minimo: 4.5, onde: "texto do campo" },
  { frente: "color-ink-subtle", fundo: "color-input", minimo: 4.5, onde: "placeholder da observação" },
  { frente: "color-accent-ink", fundo: "color-accent", minimo: 4.5, onde: "botão primário e skip link" },
  { frente: "color-accent-ink", fundo: "color-accent-hover", minimo: 4.5, onde: "primário no hover" },
  { frente: "color-accent-ink", fundo: "color-accent-pressed", minimo: 4.5, onde: "primário pressionado" },
  { frente: "color-danger", fundo: "color-surface-2", minimo: 4.5, onde: "erro no modal" },
  { frente: "color-success", fundo: "color-surface-3", minimo: 3, onde: "ícone de sucesso no aviso" },
  { frente: "color-border-strong", fundo: "color-surface-2", minimo: 3, onde: "borda do checkbox e do campo" },
  { frente: "color-border-strong", fundo: "color-input", minimo: 3, onde: "borda do campo" },
  { frente: "color-accent", fundo: "color-surface-2", minimo: 3, onde: "checkbox marcado e indicador" },
  { frente: "color-focus", fundo: "color-bg", minimo: 3, onde: "anel de foco na página" },
  { frente: "color-focus", fundo: "color-surface-2", minimo: 3, onde: "anel de foco no modal" },
];

// Pares da Home de cada direção (tokens próprios e os usados de outro jeito)
export const PARES_POR_DIRECAO = {
  brasa: [
    { frente: "color-ink", fundo: "color-bg", minimo: 4.5, onde: "texto principal" },
    { frente: "color-ink-muted", fundo: "color-surface-2", minimo: 4.5, onde: "descrição no card" },
    { frente: "color-accent-ink", fundo: "color-accent", minimo: 4.5, onde: "botão Adicionar" },
    { frente: "color-accent-ink", fundo: "color-success", minimo: 4.5, onde: "face Adicionado" },
    { frente: "color-accent", fundo: "color-bg", minimo: 3, onde: "indicador ativo" },
    { frente: "color-focus", fundo: "color-surface-2", minimo: 3, onde: "anel de foco no card" },
  ],
  material: [
    { frente: "m3-on-surface", fundo: "m3-surface", minimo: 4.5, onde: "texto principal" },
    { frente: "m3-on-surface-variant", fundo: "m3-surface-container-highest", minimo: 4.5, onde: "descrição no card" },
    { frente: "m3-on-primary", fundo: "m3-primary", minimo: 4.5, onde: "Ver cardápio" },
    { frente: "m3-on-secondary-container", fundo: "m3-secondary-container", minimo: 4.5, onde: "Adicionar, setas e item do menu" },
    { frente: "m3-on-secondary-container", fundo: "m3-secondary-container-pressed", minimo: 4.5, onde: "Adicionar pressionado" },
    { frente: "m3-on-primary-container", fundo: "m3-primary-container", minimo: 4.5, onde: "face Adicionado" },
    { frente: "m3-primary", fundo: "m3-surface-container", minimo: 4.5, onde: "links do rodapé" },
    { frente: "m3-on-error", fundo: "m3-error", minimo: 4.5, onde: "badge do carrinho" },
    { frente: "m3-primary", fundo: "m3-surface", minimo: 3, onde: "indicador da aba ativa" },
    { frente: "m3-outline", fundo: "m3-surface-container-low", minimo: 3, onde: "ponto da paginação" },
    { frente: "m3-secondary", fundo: "m3-surface", minimo: 3, onde: "anel de foco" },
    { frente: "m3-secondary", fundo: "m3-surface-container-highest", minimo: 3, onde: "anel de foco no card" },
  ],
  esqueumorfismo: [
    { frente: "esq-tinta", fundo: "esq-papel", minimo: 4.5, onde: "texto da comanda e do cupom" },
    { frente: "esq-tinta", fundo: "esq-grao-max", sobre: "esq-papel", minimo: 4.5, onde: "texto no ponto mais escuro do grão" },
    { frente: "esq-tinta-clara", fundo: "esq-grao-max", sobre: "esq-papel", minimo: 4.5, onde: "descrição no ponto mais escuro do grão" },
    { frente: "esq-letra", fundo: "esq-chapa", minimo: 4.5, onde: "título estampado na chapa" },
    { frente: "esq-tinta", fundo: "esq-inox", minimo: 4.5, onde: "links gravados na coifa" },
    { frente: "esq-tinta", fundo: "esq-inox-escuro", minimo: 4.5, onde: "link no ponto mais escuro do inox" },
    { frente: "esq-letra", fundo: "esq-placa", minimo: 4.5, onde: "texto da placa" },
    { frente: "color-accent-ink", fundo: "esq-ketchup-claro", minimo: 4.5, onde: "botão físico (ponto mais claro)" },
    { frente: "esq-carimbo", fundo: "esq-papel", minimo: 3, onde: "carimbo Adicionado (texto grande)" },
    { frente: "esq-led", fundo: "esq-led-apagado", minimo: 3, onde: "LED aceso contra o apagado" },
    { frente: "esq-letra", fundo: "esq-chapa", minimo: 3, onde: "anel de foco na chapa" },
    { frente: "esq-tinta", fundo: "esq-inox-claro", minimo: 3, onde: "anel de foco no inox" },
  ],
  neumorfismo: [
    { frente: "neu-tinta", fundo: "neu-kraft", minimo: 4.5, onde: "texto principal" },
    { frente: "neu-tinta-suave", fundo: "neu-kraft", minimo: 4.5, onde: "texto secundário" },
    { frente: "neu-tinta-suave", fundo: "neu-sombra-sob-texto", sobre: "neu-kraft", minimo: 4.5, onde: "texto do rodapé junto à sombra interna" },
    { frente: "neu-branco", fundo: "neu-ketchup", minimo: 4.5, onde: "Ver cardápio" },
    { frente: "neu-branco", fundo: "neu-ketchup-claro", minimo: 4.5, onde: "Ver cardápio no hover" },
    { frente: "neu-branco", fundo: "neu-alface", minimo: 4.5, onde: "face Adicionado" },
    { frente: "neu-tinta", fundo: "neu-sombra", minimo: 4.5, onde: "Adicionar (lado escuro do convexo)" },
    { frente: "neu-borda", fundo: "neu-kraft", minimo: 3, onde: "borda dos controles" },
    { frente: "neu-ketchup", fundo: "neu-kraft", minimo: 3, onde: "ponto ativo da paginação" },
    { frente: "neu-tinta", fundo: "neu-kraft", minimo: 3, onde: "anel de foco" },
    { frente: "neu-sombra", fundo: "neu-kraft", minimo: 3, informativo: true, onde: "sombra escura (decorativa, não conta)" },
  ],
  "3d": [
    { frente: "3d-carne", fundo: "3d-pao-claro", minimo: 4.5, onde: "texto no topo do degradê" },
    { frente: "3d-carne", fundo: "3d-tomate-claro", minimo: 4.5, onde: "texto no ponto mais escuro do degradê" },
    { frente: "3d-carne-suave", fundo: "3d-tomate-claro", minimo: 4.5, onde: "texto secundário no ponto mais escuro" },
    { frente: "3d-carne-suave", fundo: "3d-maionese", minimo: 4.5, onde: "descrição no card" },
    { frente: "3d-branco", fundo: "3d-ketchup-claro", minimo: 4.5, onde: "Ver cardápio (hover, o mais claro)" },
    { frente: "3d-maionese", fundo: "3d-carne", minimo: 4.5, onde: "Adicionar" },
    { frente: "3d-branco", fundo: "3d-alface", minimo: 4.5, onde: "face Adicionado" },
    { frente: "3d-carne-suave", fundo: "3d-alface-clara", minimo: 3, onde: "ponto da paginação no fim do degradê" },
    { frente: "3d-carne", fundo: "3d-tomate-claro", minimo: 3, onde: "anel de foco" },
  ],
  flat: [
    { frente: "flat-tinta", fundo: "flat-papel", minimo: 4.5, onde: "texto principal" },
    { frente: "flat-tinta-suave", fundo: "flat-ladrilho", minimo: 4.5, onde: "descrição no ladrilho" },
    { frente: "flat-papel", fundo: "flat-cebola", minimo: 4.5, onde: "texto no ladrilho roxo e Adicionar" },
    { frente: "flat-cebola", fundo: "flat-lilas", minimo: 4.5, onde: "Ver cardápio no hover" },
    { frente: "flat-papel", fundo: "flat-alface", minimo: 4.5, onde: "face Adicionado" },
    { frente: "flat-tinta", fundo: "flat-cheddar", minimo: 4.5, onde: "número do badge" },
    { frente: "flat-papel", fundo: "flat-tinta", minimo: 4.5, onde: "rodapé" },
    { frente: "flat-cinza", fundo: "flat-papel", minimo: 3, onde: "quadradinho da paginação" },
    { frente: "flat-cebola", fundo: "flat-papel", minimo: 3, onde: "sublinhado do link atual" },
    { frente: "flat-cheddar", fundo: "flat-cebola", minimo: 3, onde: "anel de foco no ladrilho roxo" },
    { frente: "flat-tinta", fundo: "flat-papel", minimo: 3, onde: "anel de foco no branco" },
  ],
  minimalismo: [
    { frente: "min-preto", fundo: "min-branco", minimo: 4.5, onde: "texto, título e Adicionado" },
    { frente: "min-cinza-texto", fundo: "min-branco", minimo: 4.5, onde: "descrição e texto secundário" },
    { frente: "min-branco", fundo: "min-preto", minimo: 4.5, onde: "Ver cardápio e Adicionar" },
    { frente: "min-branco", fundo: "min-preto-hover", minimo: 4.5, onde: "botão no hover" },
    { frente: "min-cinza-linha", fundo: "min-branco", minimo: 3, onde: "segmento da paginação" },
    { frente: "min-preto", fundo: "min-branco", minimo: 3, onde: "sublinhado do link atual e anel de foco" },
  ],
  escuro: [
    { frente: "esc-on-surface", fundo: "esc-surface", minimo: 4.5, onde: "texto principal" },
    { frente: "esc-on-surface", fundo: "esc-surface", minimo: 7, informativo: true, onde: "texto pequeno, sugestão da Apple" },
    { frente: "esc-on-surface-variant", fundo: "esc-surface-high", minimo: 4.5, onde: "descrição no card" },
    { frente: "esc-on-surface-variant", fundo: "esc-surface-high", minimo: 7, informativo: true, onde: "descrição no card, sugestão da Apple" },
    { frente: "esc-on-surface-variant", fundo: "esc-surface-lowest", minimo: 4.5, onde: "texto do rodapé" },
    { frente: "esc-on-primary", fundo: "esc-primary", minimo: 4.5, onde: "Ver cardápio e badge" },
    { frente: "esc-on-primary", fundo: "esc-primary-pressed", minimo: 4.5, onde: "Ver cardápio pressionado" },
    { frente: "esc-on-secondary-container", fundo: "esc-secondary-container-pressed", minimo: 4.5, onde: "Adicionar pressionado" },
    { frente: "esc-on-tertiary-container", fundo: "esc-tertiary-container", minimo: 4.5, onde: "face Adicionado" },
    { frente: "esc-outline", fundo: "esc-surface-high", minimo: 3, onde: "contorno do card e das setas" },
    { frente: "esc-primary", fundo: "esc-surface", minimo: 3, onde: "indicador ativo e anel de foco" },
    { frente: "esc-primary", fundo: "esc-surface-high", minimo: 3, onde: "anel de foco no card" },
  ],
};
