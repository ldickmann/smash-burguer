// Contraste do WCAG 2.x (critérios 1.4.3 e 1.4.11) e os pares de tokens da loja e do painel
// (SPEC-material §1.1, item 2, e §2.2). Módulo puro: o Vitest e o script de e2e
// (.claude/e2e/tokens-contrast.mjs) o leem no Node. Fórmula copiada de src/direcoes/contraste.js.

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

/**
 * Lê as declarações `--nome: valor;` de um _tokens.scss.
 * `tokens` guarda o valor como está escrito; `ler(nome)` segue as cadeias de `var(--outro)` até o valor final.
 */
export const lerTokens = (fonte) => {
  const tokens = new Map();
  for (const m of fonte.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) tokens.set(m[1], m[2].trim());
  const ler = (nome) => {
    let valor = tokens.get(nome);
    for (let passo = 0; passo < 10 && valor?.startsWith("var(--"); passo += 1) {
      valor = tokens.get(valor.slice(6, -1).trim());
    }
    return valor;
  };
  return { tokens, ler };
};

// ---------- Pares ----------
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3.

// 1. Os 34 da Home aprovada, copiados de src/direcoes/estilos/material/contraste.js
export const PARES_HOME = [
  // Página, cabeçalho e rodapé
  { frente: "m3-on-surface", fundo: "m3-surface", minimo: 4.5, onde: "texto principal, marca e títulos das seções" },
  { frente: "m3-primary", fundo: "m3-surface", minimo: 4.5, onde: "text button Ver cardápio do feed" },
  { frente: "m3-secondary", fundo: "m3-surface", minimo: 3, onde: "anel de foco" },
  { frente: "m3-on-surface", fundo: "m3-surface-container", minimo: 4.5, onde: "marca no rodapé" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container", minimo: 4.5, onde: "rótulos da toolbar e textos do rodapé" },
  { frente: "m3-secondary", fundo: "m3-surface-container", minimo: 3, onde: "anel de foco na toolbar" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container", minimo: 4.5, onde: "item atual da toolbar e Adicionar tonal" },
  { frente: "m3-secondary", fundo: "m3-secondary-container", minimo: 3, onde: "anel de foco no item atual da toolbar" },
  { frente: "m3-on-error", fundo: "m3-error", minimo: 4.5, onde: "badge do carrinho" },

  // Hero (o disco primary dentro do contêiner primary-container) e FAB
  { frente: "m3-on-primary-container", fundo: "m3-primary-container", minimo: 4.5, onde: "ícone do FAB, face Adicionado e, abaixo de md, título e texto do hero no contêiner" },
  { frente: "m3-primary", fundo: "m3-primary-container", minimo: 3, onde: "borda do disco do hero e, abaixo de md, do Ver cardápio filled contra o contêiner" },
  { frente: "m3-secondary", fundo: "m3-primary-container", minimo: 3, onde: "anel de foco no FAB e, abaixo de md, no Ver cardápio do hero" },
  { frente: "m3-on-primary", fundo: "m3-primary", minimo: 4.5, onde: "título e texto dentro do disco do hero (a partir de md), Adicionar e Ver cardápio filled (abaixo de md)" },
  { frente: "m3-on-primary", fundo: "m3-primary", minimo: 3, onde: "anel de foco dentro do disco do hero" },
  { frente: "m3-secondary-container", fundo: "m3-primary", minimo: 3, onde: "contêiner do Ver cardápio tonal contra o disco do hero" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container-hover", minimo: 4.5, onde: "Ver cardápio tonal no hover" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container-pressed", minimo: 4.5, onde: "Ver cardápio tonal pressionado" },
  { frente: "m3-on-primary", fundo: "m3-primary-hover", minimo: 4.5, onde: "Adicionar no hover" },
  { frente: "m3-on-primary", fundo: "m3-primary-pressed", minimo: 4.5, onde: "Adicionar pressionado" },

  // Feed (filled card em surface-container-highest) e folha de ingredientes
  { frente: "m3-on-surface", fundo: "m3-surface-container-highest", minimo: 4.5, onde: "nome e preço no card" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-highest", minimo: 4.5, onde: "descrição no card" },
  { frente: "m3-primary", fundo: "m3-surface-container-highest", minimo: 3, onde: "contêiner do split contra o card" },
  { frente: "m3-secondary", fundo: "m3-surface-container-highest", minimo: 3, onde: "anel de foco no card" },
  { frente: "m3-on-surface", fundo: "m3-surface-container-high", minimo: 4.5, onde: "título da folha" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-high", minimo: 4.5, onde: "ingredientes na folha" },

  // Listas segmentada e agrupada
  { frente: "m3-on-surface", fundo: "m3-surface-container-low", minimo: 4.5, onde: "h2 e h3 das duas listas" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-low", minimo: 4.5, onde: "aviso de lista vazia nas bebidas e sobremesas" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface", minimo: 4.5, onde: "aviso de lista vazia no feed" },
  { frente: "m3-on-surface", fundo: "m3-surface-container-lowest", minimo: 4.5, onde: "título e preço dos itens das listas" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-lowest", minimo: 4.5, onde: "apoio e descrição dos itens" },
  { frente: "m3-secondary", fundo: "m3-surface-container-lowest", minimo: 3, onde: "anel de foco interno nos itens" },
  { frente: "m3-on-tertiary-container", fundo: "m3-tertiary-container", minimo: 3, onde: "ícone do horário" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container", minimo: 3, onde: "ícones dos itens com link" },
  { frente: "m3-outline", fundo: "m3-surface", minimo: 3, onde: "borda da toolbar, do FAB e da folha com prefers-contrast: more" },
];

// 2. Os que entram com as outras telas (SPEC-material §2.2: "Pares que entram com as outras telas" e,
// da tabela de Error, error sobre error-container)
export const PARES_OUTRAS_TELAS = [
  { frente: "m3-outline", fundo: "m3-surface-container-highest", minimo: 3, onde: "borda de campo" },
  { frente: "m3-error", fundo: "m3-surface", minimo: 4.5, onde: "texto de erro" },
  { frente: "m3-on-error-container", fundo: "m3-error-container", minimo: 4.5, onde: "texto sobre o banner de erro" },
  { frente: "m3-error", fundo: "m3-error-container", minimo: 4.5, onde: "erro e ação destrutiva sobre o banner de erro" },
  { frente: "m3-sucesso", fundo: "m3-sucesso-container", minimo: 4.5, onde: "chip Concluído" },
  { frente: "m3-aviso", fundo: "m3-aviso-container", minimo: 4.5, onde: "chip Pendente" },
  { frente: "m3-info", fundo: "m3-info-container", minimo: 4.5, onde: "chips Em preparo, A caminho e Recebido" },
  { frente: "m3-inverse-on-surface", fundo: "m3-inverse-surface", minimo: 4.5, onde: "aviso (toast) em inverse-surface" },
];

// 3. Os dos componentes reais que aparecem também nas Homes do acervo (modal Personalizar, toast e
// skip link), copiados de src/direcoes/contraste.js
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

// 4. Os das telas que ainda têm a estrutura da Brasa (pelos apelidos) e que os grupos acima não
// cobrem: vêm da lista que o tokens-contrast.mjs media até a etapa 1. Saem quando a tela migrar.
export const PARES_TELAS_BRASA = [
  { frente: "m3-error", fundo: "m3-surface-container-highest", minimo: 4.5, onde: "erro sobre o campo" },
  { frente: "m3-on-primary", fundo: "m3-sucesso", minimo: 4.5, onde: "face Adicionado do botão da Brasa" },
  { frente: "m3-on-surface", fundo: "m3-primary-container", minimo: 4.5, onde: "item selecionado (forma de pagamento)" },
  { frente: "m3-on-surface", fundo: "m3-error-container", minimo: 4.5, onde: "texto do banner de erro" },
  { frente: "m3-sucesso", fundo: "m3-surface-container", minimo: 4.5, onde: "ícone e texto de sucesso" },
  { frente: "m3-sucesso", fundo: "m3-surface-container-high", minimo: 4.5, onde: "ícone de sucesso no toast" },
  { frente: "m3-aviso", fundo: "m3-surface-container", minimo: 4.5, onde: "aviso sem endereço" },
  { frente: "m3-on-surface", fundo: "m3-camada-hover", sobre: "m3-surface-container", minimo: 4.5, onde: "botão ghost no hover" },
  { frente: "m3-secondary", fundo: "m3-surface-container-high", minimo: 3, onde: "anel de foco no toast e nos menus" },
];

export const PARES = [...PARES_HOME, ...PARES_OUTRAS_TELAS, ...PARES_COMUNS, ...PARES_TELAS_BRASA];
