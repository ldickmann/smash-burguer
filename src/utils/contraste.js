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
  { frente: "m3-on-surface", fundo: "m3-surface", minimo: 4.5, onde: "texto principal, marca, títulos das seções e h3 dos Adicionais; h1 do Cardápio e título do EmptyState; marca, h1 e valor dos filtros do painel" },
  { frente: "m3-primary", fundo: "m3-surface", minimo: 4.5, onde: "text button Ver cardápio do feed e dos Adicionais; categoria marcada contra a barra do Cardápio; Voltar ao cardápio (filled) na confirmação; Sair no perfil; contorno e rótulo com foco da busca e dos filtros do painel, Novo produto e Limpar busca" },
  { frente: "m3-secondary", fundo: "m3-surface", minimo: 3, onde: "anel de foco" },
  { frente: "m3-on-surface", fundo: "m3-surface-container", minimo: 4.5, onde: "marca no rodapé; cabeça e rótulos dos itens do menu do perfil do painel" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container", minimo: 4.5, onde: "rótulos da toolbar e textos do rodapé; rótulo das categorias desmarcadas; ícones do menu do perfil do painel" },
  { frente: "m3-secondary", fundo: "m3-surface-container", minimo: 3, onde: "anel de foco na toolbar e anel interno da categoria desmarcada; anel interno dos itens do menu do perfil do painel" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container", minimo: 4.5, onde: "item atual da toolbar e Adicionar tonal; forma de pagamento marcada (nome, descrição e ícone); item atual da navegação do painel, avatar e botão de imagem do ModalProducts" },
  { frente: "m3-secondary", fundo: "m3-secondary-container", minimo: 3, onde: "anel de foco no item atual da toolbar; anel interno da forma de pagamento marcada e do item atual da navegação do painel" },
  { frente: "m3-on-error", fundo: "m3-error", minimo: 4.5, onde: "badge do carrinho e selos dos atalhos do painel" },

  // Hero (o disco primary dentro do contêiner primary-container) e FAB
  { frente: "m3-on-primary-container", fundo: "m3-primary-container", minimo: 4.5, onde: "ícone do FAB, face Adicionado e, abaixo de md, título e texto do hero no contêiner; h1, ícone e dados da faixa da confirmação" },
  { frente: "m3-primary", fundo: "m3-primary-container", minimo: 3, onde: "borda do disco do hero e, abaixo de md, do Ver cardápio filled contra o contêiner" },
  { frente: "m3-secondary", fundo: "m3-primary-container", minimo: 3, onde: "anel de foco no FAB e, abaixo de md, no Ver cardápio do hero; anel no h1 da confirmação" },
  { frente: "m3-on-primary", fundo: "m3-primary", minimo: 4.5, onde: "título e texto dentro do disco do hero (a partir de md), Adicionar e Ver cardápio filled (abaixo de md); rótulo da categoria marcada e check do checkbox; check do rádio marcado e rótulo do Adicionar endereço" },
  { frente: "m3-on-primary", fundo: "m3-primary", minimo: 3, onde: "anel de foco dentro do disco do hero e anel interno da categoria marcada" },
  { frente: "m3-secondary-container", fundo: "m3-primary", minimo: 3, onde: "contêiner do Ver cardápio tonal contra o disco do hero" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container-hover", minimo: 4.5, onde: "Ver cardápio tonal no hover" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container-pressed", minimo: 4.5, onde: "Ver cardápio tonal pressionado; forma de pagamento marcada pressionada; item atual da navegação do painel pressionado" },
  { frente: "m3-on-primary", fundo: "m3-primary-hover", minimo: 4.5, onde: "Adicionar e categoria marcada no hover; Adicionar endereço no hover" },
  { frente: "m3-on-primary", fundo: "m3-primary-pressed", minimo: 4.5, onde: "Adicionar e categoria marcada pressionados; Adicionar endereço pressionado" },

  // Feed (filled card em surface-container-highest) e folha de ingredientes
  { frente: "m3-on-surface", fundo: "m3-surface-container-highest", minimo: 4.5, onde: "nome e preço no card" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-highest", minimo: 4.5, onde: "descrição no card" },
  { frente: "m3-primary", fundo: "m3-surface-container-highest", minimo: 3, onde: "contêiner do split contra o card" },
  { frente: "m3-secondary", fundo: "m3-surface-container-highest", minimo: 3, onde: "anel de foco no card" },
  { frente: "m3-on-surface", fundo: "m3-surface-container-high", minimo: 4.5, onde: "título da folha e nome nos chips dos Adicionais; títulos, valores, textos e dd dos cards do painel; título, textos, campos e títulos das seções do diálogo a partir de md" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-high", minimo: 4.5, onde: "ingredientes na folha e acréscimo nos chips dos Adicionais; rótulos dos KPIs, notas, dt, endereço e telefone dos cards do painel e descrição do card de produto; descrição, ajuda, placeholder, dt e ícone do Fechar do diálogo a partir de md" },

  // Listas segmentada e agrupada
  { frente: "m3-on-surface", fundo: "m3-surface-container-low", minimo: 4.5, onde: "h2 e h3 das duas listas; títulos do resumo e das seções do carrinho e do pagamento, endereço e Total; valor e rótulo do campo, contorno no hover, h1 do painel, h2 do perfil e link do rodapé do painel; título, textos e campos do sheet abaixo de md" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-low", minimo: 4.5, onde: "aviso de lista vazia nas bebidas e sobremesas; Subtotal, linhas do resumo compacto, ajuda do CTA do pagamento e aviso do visitante no carrinho; placeholder, ajuda, seta e botão de mostrar a senha do campo, frase do rodapé do painel, texto de exclusão e contorno do campo com prefers-contrast: more; itens da gaveta do painel e texto do bloco do admin de teste; descrição, ajuda e ícone do Fechar no sheet abaixo de md" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface", minimo: 4.5, onde: "aviso de lista vazia no feed e frase dos Adicionais; frase do Cardápio e texto do EmptyState; itens da coluna do painel, ícones da barra, lupa e placeholder da busca, seta dos filtros e linha do resultado da busca" },
  { frente: "m3-on-surface", fundo: "m3-surface-container-lowest", minimo: 4.5, onde: "título e preço dos itens das listas; ingredientes e adicionais do modal; nome e total do item do carrinho e nome da forma de pagamento; número, total e resumo do pedido no perfil" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-lowest", minimo: 4.5, onde: "apoio e descrição dos itens; acréscimo dos adicionais, ingrediente removido, legenda do montador e contorno do checkbox; detalhes do item do carrinho, descrição e ícone da forma de pagamento e contorno do rádio desmarcado; data, contagem e detalhes do pedido no perfil" },
  { frente: "m3-secondary", fundo: "m3-surface-container-lowest", minimo: 3, onde: "anel de foco interno nos itens e nas linhas de ingrediente; anel interno da forma de pagamento desmarcada e anel nos controles do item do carrinho; anel interno do Ver itens" },
  { frente: "m3-on-tertiary-container", fundo: "m3-tertiary-container", minimo: 3, onde: "ícone do horário" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container", minimo: 3, onde: "ícones dos itens com link" },
  { frente: "m3-outline", fundo: "m3-surface", minimo: 3, onde: "borda da toolbar, do FAB, da folha e dos chips com prefers-contrast: more; borda do painel do login e das seções do perfil nesse modo; contorno da busca e dos filtros do painel; borda dos cards, da gaveta e do rótulo de status do painel com prefers-contrast: more" },
];

// 2. Os que entram com as outras telas (SPEC-material §2.2: "Pares que entram com as outras telas" e,
// da tabela de Error, error sobre error-container)
export const PARES_OUTRAS_TELAS = [
  { frente: "m3-error", fundo: "m3-surface", minimo: 4.5, onde: "texto de erro" },
  { frente: "m3-on-error-container", fundo: "m3-error-container", minimo: 4.5, onde: "texto do banner de erro do login, do cadastro e do diálogo de exclusão da conta" },
  { frente: "m3-error", fundo: "m3-error-container", minimo: 4.5, onde: "ícone do banner de erro do login, do cadastro e do diálogo de exclusão da conta" },
  { frente: "m3-sucesso", fundo: "m3-sucesso-container", minimo: 4.5, onde: "rótulo de status (M3RotuloStatus) Concluído" },
  { frente: "m3-aviso", fundo: "m3-aviso-container", minimo: 4.5, onde: "rótulo de status (M3RotuloStatus) Pendente; texto e ícone do aviso sem endereço no pagamento e do aviso de conta salva" },
  { frente: "m3-info", fundo: "m3-info-container", minimo: 4.5, onde: "rótulo de status (M3RotuloStatus) Em preparo, A caminho e Recebido (no perfil)" },
  { frente: "m3-inverse-on-surface", fundo: "m3-inverse-surface", minimo: 4.5, onde: "aviso (toast): texto, ícone de erro e Fechar aviso; anel interno dos botões do aviso" },
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
  { frente: "color-border-strong", fundo: "color-surface-2", minimo: 3, onde: "borda do campo e do stepper da Quantidade" },
  { frente: "color-border-strong", fundo: "color-input", minimo: 3, onde: "borda do campo" },
  { frente: "color-accent", fundo: "color-surface-2", minimo: 3, onde: "indicador" },
  { frente: "color-focus", fundo: "color-bg", minimo: 3, onde: "anel de foco na página" },
  { frente: "color-focus", fundo: "color-surface-2", minimo: 3, onde: "anel de foco no modal" },
];

// 4. Os das telas que ainda têm a estrutura da Brasa (pelos apelidos) e que os grupos acima não
// cobrem: vêm da lista que o tokens-contrast.mjs media até a etapa 1. Saem quando a tela migrar.
export const PARES_TELAS_BRASA = [
  { frente: "m3-on-primary", fundo: "m3-sucesso", minimo: 4.5, onde: "face Adicionado do botão da Brasa" },
];

// 5. Os do Cardápio e do modal Personalizar (etapa 6; docs/direcoes/desenho/cardapio.md, §8). A camada
// de estado real usa currentColor; o par mede com o token da camada (on-surface a 10%). Os pares que só
// ganham uso (primary sobre surface, on-primary sobre primary e os de surface-container e lowest) já
// estão nos grupos acima.
export const PARES_CARDAPIO = [
  { frente: "m3-primary", fundo: "m3-surface-container-lowest", minimo: 4.5, onde: "caixa marcada do checkbox dos ingredientes; texto e chevron do Ver itens no perfil" },
  { frente: "m3-primary", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-lowest", minimo: 3, onde: "caixa marcada com a linha do ingrediente pressionada" },
  { frente: "m3-on-surface-variant", fundo: "m3-camada-pressionada", sobre: "m3-surface-container", minimo: 4.5, onde: "rótulo da categoria desmarcada, pressionada; ícone do item do menu do perfil do painel pressionado" },
  { frente: "m3-primary", fundo: "m3-surface-container", minimo: 4.5, onde: "categoria marcada contra a desmarcada (sinal além da cor, 1.4.1)" },
  { frente: "m3-outline", fundo: "m3-surface-container-lowest", minimo: 3, onde: "borda dos botões do QuantityStepper (tonal) sobre as linhas dos adicionais e no item do carrinho, e da forma de pagamento, com prefers-contrast: more" },
  { frente: "m3-on-surface", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-lowest", minimo: 4.5, onde: "nome do ingrediente com a linha pressionada; nome da forma de pagamento desmarcada pressionada" },
  { frente: "m3-on-surface-variant", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-lowest", minimo: 4.5, onde: "nome do ingrediente removido com a linha pressionada; descrição e controle da forma de pagamento desmarcada pressionada" },
  { frente: "m3-secondary", fundo: "m3-camada-pressionada", sobre: "m3-surface-container", minimo: 3, onde: "anel interno da categoria desmarcada pressionada e do item do menu do perfil do painel pressionado" },
];

// 6. Os do Carrinho, do Pagamento e da Confirmação (etapa 7; docs/direcoes/desenho/carrinho-pagamento.md,
// §8). Os que só ganham uso estão nos grupos acima, com o "onde" ampliado.
export const PARES_CARRINHO = [
  { frente: "m3-primary", fundo: "m3-surface-container-low", minimo: 4.5, onde: "text buttons Continuar comprando e Alterar no perfil; o filled contra o resumo e as seções, o painel do login e o perfil; contorno, rótulo e cursor do campo com foco; Voltar à loja do login do admin" },
  { frente: "m3-primary", fundo: "m3-camada-primary-pressionada", sobre: "m3-surface-container-low", minimo: 4.5, onde: "text button pressionado sobre o resumo e as seções; Voltar à loja do login do admin pressionado" },
  { frente: "m3-secondary", fundo: "m3-surface-container-low", minimo: 3, onde: "anel de foco no resumo e nas seções do pagamento; nos campos, botões e links do painel e do perfil" },
  { frente: "m3-secondary", fundo: "m3-aviso-container", minimo: 3, onde: "anel do Adicionar endereço dentro do aviso" },
  { frente: "m3-primary", fundo: "m3-aviso-container", minimo: 3, onde: "contêiner do filled S Adicionar endereço contra o aviso" },
  { frente: "m3-primary-hover", fundo: "m3-aviso-container", minimo: 3, onde: "contêiner do Adicionar endereço no hover" },
  { frente: "m3-primary-pressed", fundo: "m3-aviso-container", minimo: 3, onde: "contêiner do Adicionar endereço pressionado" },
  { frente: "m3-error", fundo: "m3-surface-container-lowest", minimo: 4.5, onde: "Remover sobre o item do carrinho" },
  { frente: "m3-primary", fundo: "m3-secondary-container", minimo: 3, onde: "controle marcado contra a forma de pagamento marcada" },
  { frente: "m3-primary", fundo: "m3-secondary-container-pressed", minimo: 3, onde: "controle marcado com a forma de pagamento pressionada" },
  { frente: "m3-secondary", fundo: "m3-secondary-container-pressed", minimo: 3, onde: "anel interno da forma de pagamento marcada pressionada" },
  { frente: "m3-secondary", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-lowest", minimo: 3, onde: "anel interno da forma de pagamento desmarcada pressionada" },
  { frente: "m3-outline", fundo: "m3-surface-container-low", minimo: 3, onde: "borda das formas de pagamento e do aviso com prefers-contrast: more; contorno do campo no painel e no perfil (contínuo e tracejado); borda do banner e do aviso nesse modo" },
];

// 7. Os do Login, do Cadastro e do Perfil (etapa 8; docs/direcoes/desenho/conta.md, §8). Os que só ganham
// uso estão nos grupos acima, com o "onde" ampliado.
export const PARES_CONTA = [
  { frente: "m3-error", fundo: "m3-surface-container-low", minimo: 4.5, onde: "erro, rótulo e contorno do campo com erro no painel, no perfil e no sheet; Excluir conta e as ações de perigo no sheet" },
  { frente: "m3-on-error-container", fundo: "m3-surface-container-low", minimo: 4.5, onde: "contorno e rótulo do campo com erro no hover (painel e perfil)" },
  { frente: "m3-primary", fundo: "m3-camada-primary-pressionada", sobre: "m3-surface", minimo: 4.5, onde: "Sair pressionado; text buttons da Home pressionados sobre a superfície; Limpar busca do painel pressionado" },
  { frente: "m3-secondary", fundo: "m3-camada-primary-pressionada", sobre: "m3-surface", minimo: 3, onde: "anel do Sair pressionado" },
  { frente: "m3-primary", fundo: "m3-camada-primary-pressionada", sobre: "m3-surface-container-lowest", minimo: 4.5, onde: "Ver itens pressionado" },
  { frente: "m3-secondary", fundo: "m3-camada-primary-pressionada", sobre: "m3-surface-container-lowest", minimo: 3, onde: "anel interno do Ver itens pressionado" },
];

// 8. Os do painel admin (etapa 9; docs/direcoes/desenho/admin.md, §8). Os que só ganham uso estão nos
// grupos acima, com o "onde" ampliado; o anel sobre surface-container-high veio de PARES_TELAS_BRASA.
export const PARES_ADMIN = [
  { frente: "m3-on-surface-variant", fundo: "m3-camada-pressionada", sobre: "m3-surface", minimo: 4.5, onde: "item da navegação pressionado na coluna" },
  { frente: "m3-on-surface-variant", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-low", minimo: 4.5, onde: "item da gaveta pressionado" },
  { frente: "m3-secondary", fundo: "m3-camada-pressionada", sobre: "m3-surface", minimo: 3, onde: "anel interno do item pressionado na coluna" },
  { frente: "m3-secondary", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-low", minimo: 3, onde: "anel interno do item pressionado na gaveta" },
  { frente: "m3-on-surface", fundo: "m3-camada-pressionada", sobre: "m3-surface-container", minimo: 4.5, onde: "rótulo do item do menu do perfil pressionado" },
  { frente: "m3-primary", fundo: "m3-surface-container-high", minimo: 4.5, onde: "Detalhes (texto) no card do pedido; campo com foco e text buttons no diálogo a partir de md" },
  { frente: "m3-primary", fundo: "m3-camada-primary-pressionada", sobre: "m3-surface-container-high", minimo: 4.5, onde: "Detalhes pressionado" },
  { frente: "m3-secondary", fundo: "m3-camada-primary-pressionada", sobre: "m3-surface-container-high", minimo: 3, onde: "anel do Detalhes pressionado" },
  { frente: "m3-error", fundo: "m3-surface-container-high", minimo: 4.5, onde: "Excluir (danger) no card de produto; campo com erro e perigo no diálogo a partir de md" },
  { frente: "m3-secondary", fundo: "m3-surface-container-high", minimo: 3, onde: "anel de foco nos cards do painel e no diálogo a partir de md" },
];

// 9. Os dos componentes base (etapa 10; docs/direcoes/desenho/componentes-base.md, §8): o aviso em
// inverse-surface, o perigo que escurece para on-error-container no hover e no pressionado e o diálogo
// em surface-container-high. As camadas inversas medem o caso pior do aviso (o CSS usa currentColor).
// Os que só ganham uso estão nos grupos acima, com o "onde" ampliado.
export const PARES_COMPONENTES = [
  { frente: "m3-inverse-primary", fundo: "m3-inverse-surface", minimo: 4.5, onde: "ação Desfazer do aviso" },
  { frente: "m3-inverse-primary", fundo: "m3-camada-inversa-pressionada", sobre: "m3-inverse-surface", minimo: 4.5, onde: "Desfazer pressionado" },
  { frente: "m3-inverse-on-surface", fundo: "m3-camada-inversa-pressionada", sobre: "m3-inverse-surface", minimo: 4.5, onde: "Fechar aviso pressionado, com o anel interno" },
  { frente: "m3-on-error-container", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-high", minimo: 4.5, onde: "perigo pressionado no card de produto e no diálogo a partir de md" },
  { frente: "m3-on-error-container", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-low", minimo: 4.5, onde: "perigo pressionado no perfil e no sheet" },
  { frente: "m3-on-error-container", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-lowest", minimo: 4.5, onde: "Remover pressionado no item do carrinho" },
  { frente: "m3-secondary", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-high", minimo: 3, onde: "anel do perigo e do Fechar pressionados no card e no diálogo" },
  { frente: "m3-on-surface-variant", fundo: "m3-camada-pressionada", sobre: "m3-surface-container-high", minimo: 3, onde: "ícone do Fechar do diálogo pressionado" },
  { frente: "m3-outline", fundo: "m3-surface-container-high", minimo: 3, onde: "contorno dos campos no diálogo a partir de md (observação, ModalProducts) e da caixa do seletor de imagem; borda do tonal com prefers-contrast: more no card" },
  { frente: "m3-on-error-container", fundo: "m3-surface-container-high", minimo: 4.5, onde: "campo com erro no hover, no diálogo a partir de md" },
];

export const PARES = [
  ...PARES_HOME,
  ...PARES_OUTRAS_TELAS,
  ...PARES_COMUNS,
  ...PARES_TELAS_BRASA,
  ...PARES_CARDAPIO,
  ...PARES_CARRINHO,
  ...PARES_CONTA,
  ...PARES_ADMIN,
  ...PARES_COMPONENTES,
];
