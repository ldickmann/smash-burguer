// Pares de contraste da Home deste estilo (tokens próprios e os usados de outro jeito).
// texto: 4,5 (3 se grande); borda de componente, estado e foco: 3. `informativo` não reprova.
// Todo token novo usado como texto ou borda precisa estar num par. Módulo puro: o Node também lê.

export const PARES = [
  // Página, cabeçalho e rodapé
  { frente: "m3-on-surface", fundo: "m3-surface", minimo: 4.5, onde: "texto principal, marca, títulos das seções e h3 de Monte o seu" },
  { frente: "m3-primary", fundo: "m3-surface", minimo: 4.5, onde: "text button Ver cardápio do feed e de Monte o seu" },
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
  { frente: "m3-on-surface", fundo: "m3-surface-container-high", minimo: 4.5, onde: "título da folha e nome nos chips de Monte o seu" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-high", minimo: 4.5, onde: "ingredientes na folha e acréscimo nos chips de Monte o seu" },

  // Listas segmentada e agrupada
  { frente: "m3-on-surface", fundo: "m3-surface-container-low", minimo: 4.5, onde: "h2 e h3 das duas listas" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-low", minimo: 4.5, onde: "aviso de lista vazia nas bebidas e sobremesas" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface", minimo: 4.5, onde: "aviso de lista vazia no feed e frase de Monte o seu" },
  { frente: "m3-on-surface", fundo: "m3-surface-container-lowest", minimo: 4.5, onde: "título e preço dos itens das listas" },
  { frente: "m3-on-surface-variant", fundo: "m3-surface-container-lowest", minimo: 4.5, onde: "apoio e descrição dos itens" },
  { frente: "m3-secondary", fundo: "m3-surface-container-lowest", minimo: 3, onde: "anel de foco interno nos itens" },
  { frente: "m3-on-tertiary-container", fundo: "m3-tertiary-container", minimo: 3, onde: "ícone do horário" },
  { frente: "m3-on-secondary-container", fundo: "m3-secondary-container", minimo: 3, onde: "ícones dos itens com link" },
  { frente: "m3-outline", fundo: "m3-surface", minimo: 3, onde: "borda da toolbar, do FAB, da folha e dos chips com prefers-contrast: more" },
];
