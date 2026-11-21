# Desenho da Home nova: Minimalismo (`minimalismo`), rodada 2

Desenho de 21/11/2026 para a Home de `#/direcoes/minimalismo`. Parte da identidade aprovada na rodada 1 (`src/direcoes/estilos/minimalismo/ficha.js` e `_tokens.scss`), do dossiê `docs/direcoes/pesquisa/minimalismo.md` (fontes [M1] a [M59]), da seção "Minimalismo" de `docs/direcoes/PESQUISA.md`, das notas de galeria da rodada 2 e do transversal `docs/direcoes/pesquisa/home-delivery.md` (fontes [H1] a [H45]). Prefixo dos componentes: `Mn`; das classes: `mn-`. Esquema: `light`.

**A ousadia, num lugar só: uma foto por vez.** A página inteira é tipografia em preto e branco. A única cor é uma foto de comida, que aparece ao lado do prato que a pessoa escolheu com "Ver foto". Abrir outra fecha a anterior. O resto (título, listas, atendimento, rodapé) é quieto: sem card, sombra, régua, ícone de enfeite nem animação de entrada.

---

## 1. Tese

**Mantida, com um ajuste de composição.** A tese da ficha continua: o minimalismo tira o que não ajuda a tarefa [M1] e mantém o necessário [M3]. A interface é preta e branca, a única cor é a da comida, nas fotos, e a tipografia larga e pesada (Archivo Expanded 800) faz o papel do smash. Tokens, paleta, tipografia e desvios da ficha ficam como estão, sem entrada nova em `desvios`.

O ajuste está no uso da foto. Na v1, a cor vinha de oito fotos ao mesmo tempo (o recorte do hero e os sete cards do carrossel). Agora vem de uma foto de cada vez, pedida pela pessoa:

- a heurística 8 dá o exemplo do modo zen, que mostra só o necessário em repouso e o resto quando se pede [M3];
- o padrão de disclosure mostra e esconde um conteúdo com um botão de `aria-expanded` [M44];
- os traços medidos são funções reduzidas (87%) e espaço negativo (84%) [M1];
- a galeria do estilo mostra o cardápio como lista tipográfica, sem foto por prato (Kalk, conceito), e um só ornamento por página (galerias, "O que se repete").

Não encontrei fonte que peça uma foto por vez. É uma decisão de desenho tirada de [M3] e [M44] e da própria tese.

**Tensão registrada:** o NN/g põe uma foto que deixe reconhecer o item no mínimo de cada listagem [H20], e não encontrei pesquisa que compare, em delivery, o cardápio em lista sem foto com o cardápio com foto (dossiê, "Não encontrei"). O desenho atenua isso de três jeitos: a primeira foto já abre aberta; toda linha com imagem tem "Ver foto" à vista; e o `/menu` real continua com os cards com foto.

### O que mudou da rodada 1

| Rodada 1 | Rodada 2 | Por quê |
|---|---|---|
| Carrossel "Mais pedidos" com os 7 lanches, setas e paginação | O cardápio inteiro em lista tipográfica, em três seções (Hambúrgueres, Bebidas, Sobremesas) | 7 quadros passam dos 5 que o NN/g recomenda [M9]; "Mais pedidos" afirma uma popularidade sem dado [H25][H26] (risco do transversal); a variedade da casa aparece inteira [H21][H22] |
| Hero com o título à esquerda e o recorte do hambúrguer à direita | Hero só tipográfico: título, linha de apoio, "Ver cardápio" e o sumário da página | A foto passa a ser uma por vez, no cardápio; o hero curto deixa a seção seguinte à vista acima da dobra [M17][H3] |
| Só lanches na Home | Lanches, bebidas e a sobremesa, com os adicionais em nota | Mostrar a variedade [H21]; a personalização descrita antes do modal [H24] |
| Horário, endereço e contato só no rodapé | Seção própria, "Atendimento" | Padrão 5 do dossiê (5 exemplos publicados) e o contato fácil de achar [H29][H30] |
| Rodapé com descrição, endereço, horário, redes e uma régua preta | Rodapé com a marca, a navegação repetida e a linha de direitos, sem régua | Navegação repetida no fim [M8] (padrão 7); redes com links genéricos prometem o que não entregam [M7] (honesto) [H26]; a descrição é slogan que não ajuda a pedir [M1] |
| Recorte com `fetchpriority="high"` no hero | Nenhuma imagem no hero; a LCP passa a ser o `h1` | Imagem só onde informa [H27][M18] |

---

## 2. Plano e revisão (as duas passadas da skill frontend-design)

### 2.1 Primeira passada (plano)

- **Assunto, público e tarefa:** hamburgueria de smash em Navegantes (SC), pedido pelo site, quase sempre no celular. A tarefa principal é achar o lanche, ver o preço e tocar "Adicionar". Depois vêm saber se está aberto e como falar com a loja.
- **Cor (tokens aprovados, nada novo):** Branco `#ffffff` (fundo), Preto `#000000` (texto, ação, foco), Cinza texto `#5e5e5e` (descrição, rótulos), Cinza linha `#8c8c8c` (pontilhado), Preto hover `#2b2b2b`, Superfície `#f2f2f2` (`--color-surface-4`, a reserva da foto).
- **Tipo:** Archivo Variable. O título vai em Expanded (largura 125) 800. Os títulos de seção e os nomes dos pratos vão em 700, na largura normal; o texto em 400; o preço em 400 com algarismos tabulares.
- **Layout:** grade de 12 colunas a partir de 1024 px. O texto fica nas colunas 1 a 6 (7 em 1024) e as colunas 8 a 12 ficam vazias, reservadas à foto aberta. No celular, uma coluna.
- **Princípios:** a página é o cardápio; uma foto por vez; agrupamento só por espaço; preço sempre com pontilhado e lido de uma vez; nenhum movimento que a pessoa não pediu.

### 2.2 Revisão contra o pedido (o que saiu genérico e foi trocado)

| Primeira ideia | Problema | Troca |
|---|---|---|
| Hero com o recorte do hambúrguer à direita | Repete a composição da v1 e põe duas fotos na primeira tela, contra "uma por vez" | Hero só tipográfico, com o sumário da página no lugar da foto |
| Sumário com contagem e "a partir de" por categoria | Atalhos com contagem e menor preço aparecem nos catálogos de 3D (bento), dark mode (cardápio por categoria) e neumorfismo (mostradores); e a contagem não ajuda a pular | Sumário só com os nomes das seções, como índice da página (a lista de nomes como navegação, Double Dimanche, galerias) |
| Seção própria de adicionais | Material (chips), flat (painel), esqueumorfismo (cubas), 3D (pilha) e dark mode já levam adicionais como seção | Os adicionais viram nota de rodapé da categoria, com o mesmo pontilhado do cardápio |
| Régua fina entre as linhas do cardápio | Cai no clichê do jornal (régua fina, raio zero e colunas densas) | Nenhuma régua: o espaço agrupa, como na v1 ("agrupamento só por espaço") |
| Foto num painel fixo (`sticky`) à direita | Pediria um invólucro em volta de três seções e não funciona em 390 | Foto dentro da própria linha: ao lado do texto a partir de 1024 e abaixo dele no celular. Um só lugar no DOM, só CSS |
| Disclosure de ingredientes em cada lanche | A descrição já lista quase todos os ingredientes (`products.json`): seria repetição | Sem ingredientes na Home [M1]; o modal real mostra o que se pode tirar |
| "Como pedir" em três passos numerados | Está no catálogo transversal (provável em outros estilos) e flerta com o 01/02/03 | Fica fora; a nota dos adicionais diz o essencial ("Você escolhe ao adicionar.") |
| Rótulo pequeno acima de cada título, "→" em "Ver cardápio" | Marcas de página gerada | Nenhum rótulo acima de título; nenhuma seta em texto |

O que sobra é o desenho deste documento. Como ninguém mais põe o cardápio inteiro em lista de texto com uma só foto, a composição não se confunde com os outros seis estilos.

---

## 3. Composição

Ordem dos blocos: `MnTopo` (navegação) → `hero` → `hamburgueres` → `bebidas` → `sobremesas` → `atendimento` → `MnRodape` → assinatura de autoria (da Moldura). São 5 seções de conteúdo, 4 delas novas em relação à v1 (`hamburgueres` substitui o carrossel por outra forma; `bebidas`, `sobremesas` e `atendimento` não existiam).

### 3.1 Wireframe em 1440 (viewport 1440 × 900; página de até 90rem, calha de 32 px)

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ Smash Burger                                        Início  Cardápio  Entrar  Carrinho 0 │ header (MnTopo), ~76 px
│                                                                                          │
│ Smash na chapa,                                                                          │ [hero] h1, Expanded 800,
│ entregue quente                                                                          │ ~84 px, 2 linhas, colunas 1-12
│                                                                                          │
│ Hambúrgueres artesanais prensados                        Hambúrgueres                    │ apoio: colunas 1-5
│ na hora. De terça a sexta, das 13h                       Bebidas                         │ sumário "Nesta página":
│ à 01h.                                                   Sobremesas                      │ colunas 8-12
│ [ Ver cardápio ]                                         Atendimento                     │
│                                                                                          │ fim do hero ~530 px
│ Hambúrgueres                                                                             │ [hamburgueres] h2 ~56 px
│                                                                                          │
│ Cheese Bacon ...................... R$ 25,99      ┌──────────────────────────────┐       │ linha: colunas 1-6
│ Hambúrguer artesanal com queijo e bacon           │                              │       │ foto aberta: colunas 8-12,
│ crocante, alface, tomate e maionese               │   a única foto da página     │       │ 4:3, começa ~670 px
│ [ Adicionar ]  ■ Ver foto                         │                              │       │ ─ dobra (900) ─
│                                                   └──────────────────────────────┘       │
│ Smash Burger ...................... R$ 22,50                                             │
│ Hambúrguer artesanal com queijo, cebola caramelizada, ...                                │
│ [ Adicionar ]  □ Ver foto                           (colunas 8-12 vazias)                │
│ … Veggie Burger, X-Salada, Chicken Burger, Burger Picanha, Batata Frita                  │
│                                                                                          │
│ Adicionais                                                                               │ h3 (MnNotaAdicionais)
│ Bacon .............. R$ 3,50      Queijo Cheddar ..... R$ 3,00                           │ 2 colunas de texto
│ Ovo ................ R$ 2,50      Cebola Caramelizada  R$ 2,50                           │
│ Queijo ............. R$ 2,00                                                             │
│ Você escolhe ao adicionar.                                                               │
│                                                                                          │
│ Bebidas                                                                                  │ [bebidas] 3 linhas
│ Copo de Refrigerante .............. R$ 5,99                                              │
│ …                                                                                        │
│ Sobremesas                                                                               │ [sobremesas] 1 linha + nota
│ Sorvete de Pote ................... R$ 12,90                                             │ dos 7 adicionais
│ …                                                                                        │
│ Atendimento                                                                              │ [atendimento] h2
│ Horário         Terça a sexta, das 13h à 01h                                             │ dt colunas 1-3
│ Endereço        Rua Beira da Praia - Navegantes, SC                                      │ dd colunas 4-12
│ Contato         WhatsApp · +55 47 5 6355 3265                                            │
│                 contato@smashburger.com.br                                               │
│                                                                                          │
│ Smash Burger                                              Início  Cardápio  Entrar       │ footer (MnRodape)
│ © 2026 Smash Burger · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann            │
├──────────────────────────────────────────────────────────────────────────────────────────┤
│ assinatura de autoria (AssinaturaEncaixe, tom escuro, intocada)                          │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

Nos wireframes, os pontos entre o nome e o preço representam o pontilhado de CSS, e "■"/"□" representam o quadrado cheio e o vazado do "Ver foto". Os dois "·" dos textos são da loja (`CONTATOS` e `RODAPE.copyright`, em `dados.js`).

### 3.2 Wireframe em 390 (viewport 390 × 844; calha de 16 px)

```
┌──────────────────────────────────┐
│ Smash Burger                     │ header: marca na 1ª linha
│ Início Cardápio Entrar Carrinho 0│ links sempre visíveis (sem menu escondido)
│                                  │
│ Smash na                         │ h1 48 px, 4 linhas
│ chapa,                           │
│ entregue                         │
│ quente                           │
│ Hambúrgueres artesanais          │ apoio, 3 linhas
│ prensados na hora. De terça a    │
│ sexta, das 13h à 01h.            │
│ [ Ver cardápio ]                 │
│ Hambúrgueres  Bebidas            │ sumário em linha, quebra em 2
│ Sobremesas  Atendimento          │
│                                  │
│ Hambúrgueres                     │ h2 ~40 px, começa ~740 px
│ Cheese Bacon .......... R$ 25,99 │ ─ dobra (844) ─
│ Hambúrguer artesanal com queijo  │
│ e bacon crocante, alface, ...    │
│ [ Adicionar ]  ■ Ver foto        │
│ ┌──────────────────────────────┐ │ foto aberta abaixo do texto,
│ │ foto 4:3, largura total       │ │ 358 × 268
│ └──────────────────────────────┘ │
│ Smash Burger .......... R$ 22,50 │
│ …                                │
│ Adicionais                       │ 1 coluna
│ Bacon ................. R$ 3,50  │
│ …                                │
│ Atendimento                      │
│ Horário                          │ dt acima do dd
│ Terça a sexta, das 13h à 01h     │
│ …                                │
│ Smash Burger                     │ rodapé empilhado
│ Início  Cardápio  Entrar         │
│ © 2026 Smash Burger · …          │
└──────────────────────────────────┘
```

### 3.3 Grade e ritmo

- **Página:** `.mn-largura` da v1 (`max-width: var(--min-largura-pagina)`, `padding-inline: var(--gutter)`).
- **Grade:** mixin `mn-grade` em `scss/_base.scss`, ligada só de `up(lg)` para cima: `grid-template-columns: repeat(12, minmax(0, 1fr))`, `column-gap: var(--space-5)`. A NN/g sugere 12 colunas no desktop e conteúdo dentro das colunas [M21].
- **Ritmo vertical:** entre seções, `padding-block: var(--space-8)` (as categorias seguidas parecem uma lista só, separadas pelo `h2`). Entre `h2` e lista, `var(--space-6)`. Entre linhas do cardápio, `row-gap: var(--space-7)`. Antes da nota dos adicionais, `var(--space-8)`. Antes do rodapé, `var(--space-9)`.
- **Alinhamento:** tudo à esquerda, sem centralizar nem justificar [M30]; o preço vai à direita da linha, puxado pelo pontilhado.

---

## 4. Seções

Em todas: raiz `<section data-secao="<id>" aria-labelledby="<id do título>">`, um `h1` só (no hero) e títulos sem salto (h1 → h2 → h3). Os dados da loja vêm de `src/direcoes/compartilhado/dados.js` (o `conteudo.js` do inventário) e o cardápio de `useProductsStore()` (`src/stores/products.js`, que lê `src/json/products.json` e o que o painel editou). Os textos provisórios ficam em `src/direcoes/estilos/minimalismo/textos.js`, com `// provisório` e sem dígitos (lista na seção 7).

### 4.1 `hero`: título, apoio e sumário (`secoes/MnSecaoHero.vue`)

- **Objetivo:** dizer em uma frase o que a casa faz e quando abre [M18][H1] e dar os pontos de partida (o cardápio real e as seções da própria página) [M18][H22]. Ser curto, para o cardápio aparecer acima da dobra [M17][H3].
- **Conteúdo real:**

  | Campo | Origem |
  |---|---|
  | Título (`h1#mn-titulo`) | `dados.js` → `HERO.titulo` ("Smash na chapa, entregue quente") |
  | Linha de apoio | `dados.js` → `HERO.texto` (traz o horário) |
  | Ação "Ver cardápio" para `/menu` | `dados.js` → `HERO.acao` |
  | Sumário: Hambúrgueres, Bebidas, Sobremesas | `dados.js` → `CATEGORIAS[].rotulo` |
  | Sumário: Atendimento | `textos.js` → `TEXTOS.atendimento` (provisório, o mesmo título da seção 4.5) |
  | Nome do sumário (`aria-label`) | `textos.js` → `TEXTOS.nestaPagina` (provisório) |

- **Componentes:** `MnAcao` ("Ver cardápio") e `MnSumario` (itens `{ id, rotulo }`, com `id` igual ao do `h2` de destino: `mn-hamburgueres`, `mn-bebidas`, `mn-sobremesas`, `mn-atendimento`).
- **Interação e estados:**
  - "Ver cardápio" é `RouterLink` para `/menu` e o único caminho para o cardápio real dentro do `<main>` (contrato). Estados do `MnAcao` na seção 5.
  - Cada item do sumário é link para a própria Home com hash (`{ path: INICIO, query: route.query, hash: '#mn-bebidas' }`). O `scrollBehavior` do router já rola até `to.hash` (`src/router/index.js`). Depois da navegação, o foco vai ao `h2` de destino (`tabindex="-1"`, `focus({ preventScroll: true })`). O `query` é mantido para o `?captura=1` não se perder.
- **Acessibilidade:** a seção é rotulada pelo `h1`. O sumário é `<nav aria-label="Nesta página">` com `<ul role="list">`; os links mantêm o nome visível. Nenhum item recebe `aria-current` (só a navegação principal marca a página).
- **Comportamento:**
  - **1440:** `h1` nas colunas 1 a 12, com `font-size: var(--min-titulo)` (≈ 84 px), `line-height: var(--min-titulo-linha)`, `letter-spacing: -0.03em` e `text-wrap: balance` [M34], em 2 linhas. Abaixo, o bloco de apoio (texto em `max-width: 34ch` e "Ver cardápio") nas colunas 1 a 5 e o sumário nas colunas 8 a 12, alinhados pelo topo. O sumário é uma lista vertical em `--text-xl`, peso 700. `padding-block: var(--space-8)`.
  - **1024:** mesma grade; apoio nas colunas 1 a 6, sumário nas colunas 8 a 12; `h1` ≈ 59 px, em 2 linhas.
  - **390:** uma coluna: `h1` (48 px, 4 linhas), apoio, "Ver cardápio" e o sumário em linha (`flex-wrap`, `gap: 0 var(--space-5)`, `--text-lg`), que quebra em duas linhas. `padding-block: var(--space-7)`. O `h2` seguinte começa por volta de 740 px, acima da dobra de 844.
- **Movimento:** nenhum na entrada. Sublinhado dos links do sumário: `text-decoration-color` em `--dur-fast` (permitido fora do `motion-ok`). A rolagem até o hash é a do router (instantânea), igual com e sem movimento reduzido.
- **Cardápio editado:** o sumário não depende de produtos. Categoria vazia continua no sumário e leva à seção, que explica o vazio (4.2).

### 4.2 `hamburgueres`: o cardápio de lanches em lista (`secoes/MnSecaoCategoria.vue`, `chave="foods"`)

As três categorias usam o mesmo componente de seção, com props diferentes (4.3 e 4.4 só listam o que muda).

- **Objetivo:** mostrar os lanches como texto real (nome, preço e descrição) com "Adicionar" em cada linha, sem caçar [H20][M18]. Abriga a única foto da página.
- **Conteúdo real:**

  | Campo | Origem |
  |---|---|
  | Título `h2#mn-hamburgueres` | `dados.js` → `CATEGORIAS` (`foods` → "Hambúrgueres") |
  | Linhas | `useProductsStore().foods` (`products.json` → `menuItems.foods[]`): `name`, `price` (sempre por `formatPrice`, via `useCartaoProduto`), `description`, `image` |
  | Foto aberta | `image` por `responsiveImage` (480, 960 e 1440 em WebP, JPG 960 de reserva); `alt` = `name` |
  | Nota dos adicionais | `useProductsStore().foodAdditionals` (`products.json` → `foodAdditionals[]`): `name`, `price` por `formatPrice` |
  | Título e frase da nota | `TEXTOS.adicionais`, `TEXTOS.notaAdicionais` (provisórios) |
  | Rótulo do botão de foto | `TEXTOS.verFoto` (provisório) |
  | Estado vazio | `TEXTOS.categoriaVazia` (provisório; cópia do título do `EmptyState` de `src/views/MenuView.vue`) |

  A Batata Frita tem `category` `foods` e entra sob "Hambúrgueres", como no `MenuView`.
- **Componentes:** `MnLinhaCardapio` (uma por produto), que usa `MnLinhaPreco`, `MnBotaoAdicionar`, `MnBotaoFoto` e `MnFoto`; depois, `MnNotaAdicionais`.
- **Interação e estados:**
  - "Adicionar" abre o modal real: `personalizar(produto, cartao.contexto)` de `usePersonalizar()`, com `v-bind="atributosAdicionar"` (`aria-label="Adicionar <nome>"` e `data-adicionado`). O modal adiciona, anuncia e devolve o foco. Nenhuma seção calcula preço nem chama `addItem`.
  - **Uma foto por vez** (`useFotoAberta`, injetado pela Home):
    - a chave é `"<categoria>:<id>"`, porque os ids se repetem entre categorias no `products.json`;
    - ao abrir uma linha, a que estava aberta fecha, em qualquer das três seções;
    - "Ver foto" na linha aberta fecha a foto, e a página fica sem nenhuma;
    - estado inicial: o primeiro lanche, na ordem do catálogo, que tenha `image` (hoje, Cheese Bacon); sem nenhum, nada abre.
  - **Rolagem estável:** quando a linha que fecha está acima da clicada, o conteúdo encolhe acima da pessoa. O `alternar(chave, botao)` mede o `top` do botão antes da troca, mede de novo depois do `nextTick` e compensa com `window.scrollBy(0, depois - antes)`. Se o navegador já ancorou a rolagem, a diferença é zero e nada acontece.
- **Acessibilidade:**
  - seção rotulada pelo `h2#mn-hamburgueres` (`tabindex="-1"`, alvo do sumário);
  - lista `<ul role="list">` (um cardápio é uma lista [M25]); cada `<li>` tem o nome em `h3`;
  - o preço é um só nó de texto, lido de uma vez [M27]; o pontilhado é um `span` com `aria-hidden="true"` [M26];
  - "Ver foto" é um disclosure [M44]: `<button type="button" aria-expanded aria-controls="mn-foto-<categoria>-<id>" aria-label="Ver foto de <nome>" data-ver-foto>`. Enter e Espaço alternam, e o nome acessível começa pelo texto visível;
  - o painel da foto vem depois dos botões no DOM e fica escondido com `v-show` (fora da árvore de acessibilidade quando fechado);
  - a nota dos adicionais tem `h3` próprio e uma lista.
- **Comportamento:**
  - **1440 (`up(xl)`):** o `<ul>` é uma grade de 12 colunas. Cada `<li>` ocupa `1 / -1` com `grid-template-columns: subgrid` [M35]. O texto fica em `1 / 7` e a foto aberta em `8 / -1` (colunas 8 a 12, ≈ 560 × 420), as duas com `align-self: start`. As colunas 8 a 12 das linhas fechadas ficam vazias. Nome e preço em `--min-nome-produto` (≈ 28 px); descrição em `--text-md`, com `max-width: var(--min-medida)`. A nota dos adicionais ocupa `1 / 7`, com a lista em 2 colunas de texto (`columns: 2`, `column-gap: var(--space-7)`).
  - **1024 (`up(lg)`):** a mesma grade, com o texto em `1 / 8` e a foto em `8 / -1` (≈ 390 × 292).
  - **390:** uma coluna. A foto aberta vem abaixo dos botões, na largura toda (358 × 268), com `margin-top: var(--space-4)`. Nome e preço em ≈ 22 px; a nota dos adicionais em 1 coluna.
  - **Nome longo:** `MnLinhaPreco` é `display: flex; align-items: flex-end`. O nome quebra dentro da própria caixa, o pontilhado (`flex: 1 1 var(--space-6)`) encolhe até o mínimo e o preço (`flex: none; white-space: nowrap`) não sai do alinhamento [M25].
- **Movimento:**
  - a foto entra com `opacity` 0 → 1 em `--dur-base` (`ease-out`), só dentro de `@include motion-ok`, por `<Transition name="mn-foto">` com `v-show`. A saída é imediata. Com movimento reduzido, a foto aparece sem transição;
  - nenhuma `transform` em toda a Home;
  - "Adicionar" → "Adicionado" troca as faces só por opacidade, em `--dur-fast`, nos dois modos.
- **Cardápio editado (reserva):**
  - **Produto sumido:** a lista é reativa e a linha some. Se era a aberta, um `watch` em `useFotoAberta` vê que a chave não existe mais e zera (`null`), sem abrir outra.
  - **Categoria vazia:** o `h2` fica, e no lugar da lista vem `<p>` com `TEXTOS.categoriaVazia`. A nota dos adicionais não aparece.
  - **Imagem `data:`:** `responsiveImage` devolve só `src`; o `<source>` só existe com `srcset` (padrão da v1). `width="960" height="720"` e `object-fit: cover` na caixa 4:3 seguram qualquer proporção.
  - **Sem imagem** (`image` vazio): a linha não tem "Ver foto" e não entra como estado inicial.
  - **Imagem que falha:** `@error` → `cartao.aoFalharImagem`, e `MnFoto` mostra a reserva tipográfica (o nome em Expanded 800 sobre `--color-surface-4`, com `aria-hidden`).
  - **Sem descrição:** o `<p>` não é renderizado. **Preço mudado:** `formatPrice` reativo.
  - **Adicionais vazios:** a nota inteira não aparece.

### 4.3 `bebidas` (`MnSecaoCategoria`, `chave="drinks"`)

- **Objetivo:** mostrar as bebidas na mesma lista, para quem completa o pedido [H21].
- **Conteúdo real:** `CATEGORIAS` (`drinks` → "Bebidas"); `useProductsStore().drinks` (`menuItems.drinks[]`: `name`, `description`, `price`, `image`). As bebidas não têm `ingredients` nem adicionais, e a seção não tem nota.
- **Componentes, interação, acessibilidade, comportamento e movimento:** os da 4.2, com `h2#mn-bebidas`. Abrir a foto de uma bebida fecha a do lanche.
- **Reserva:** a da 4.2.

### 4.4 `sobremesas` (`MnSecaoCategoria`, `chave="desserts"`)

- **Objetivo:** mostrar a sobremesa e as coberturas reais.
- **Conteúdo real:** `CATEGORIAS` (`desserts` → "Sobremesas"); `useProductsStore().desserts` (`menuItems.desserts[]`, hoje só o Sorvete de Pote); nota com `useProductsStore().dessertAdditionals` (7 itens, `name` e `price` por `formatPrice`).
- **Componentes, interação, acessibilidade, comportamento e movimento:** os da 4.2, com `h2#mn-sobremesas`. Em 1440, a nota dos 7 adicionais fica em 2 colunas (4 e 3).
- **Reserva:** a da 4.2. Uma categoria de um item só funciona sem ajuste.

### 4.5 `atendimento`: horário, endereço e contato (`secoes/MnSecaoAtendimento.vue`)

- **Objetivo:** responder "quando abre, onde fica e como falar" num bloco próprio, e não só no rodapé (padrão 5: Limón, Cabalar, Common Good, Union Boulangerie e Madie, publicados) [H29][H26].
- **Conteúdo real:**

  | Campo | Origem |
  |---|---|
  | Título `h2#mn-atendimento` | `TEXTOS.atendimento` (provisório) |
  | Rótulo "Horário" e valor | `dados.js` → `RODAPE.horario`; `HORARIO` |
  | Rótulo "Endereço" e link do mapa | `dados.js` → `RODAPE.endereco`; `CONTATOS` (`chave: "endereco"`: `texto`, `href` do Google Maps com `api=1` [H32], `externo`) |
  | Rótulo "Contato" | `TEXTOS.contato` (provisório) |
  | WhatsApp e e-mail | `dados.js` → `CONTATOS` (`whatsapp`: `wa.me` com só os dígitos [H33]; `email`: `mailto:` [H34]) |
  | Aviso de nova aba | `dados.js` → `NOVA_ABA`, em `span.visually-hidden` nos externos |

- **Componentes:** nenhum além da marcação; usa o mixin de link sublinhado de `scss/_base.scss`.
- **Interação e estados:** links reais. Os externos levam `target="_blank" rel="noopener noreferrer"` e o aviso de nova aba [H34]; o e-mail não. Estados: padrão (sublinhado preto de 1 px, `text-underline-offset: 4px`, que não depende só da cor [M37]); hover (sublinhado de 2 px, em `hover-capable`); foco (anel do projeto, 3 px preto, afastado 3 px [M41]); pressionado (sublinhado de 2 px).
- **Acessibilidade:** `<dl>` com pares `dt`/`dd`; no `dd` do contato, `<ul role="list">` com os dois links. Os links são `inline-flex` com `min-height: var(--target-min)` (44 px), porque não estão dentro de frase [M36]. O texto é preto ou `--min-cinza-texto` (6,4:1), nunca cinza claro [M22].
- **Comportamento:**
  - **1440 e 1024:** `dl` na grade de 12 colunas, com `dt` em `1 / 4` (`--text-md`, `--min-cinza-texto`, peso 400) e `dd` em `4 / -1` (`--text-xl`, preto, peso 400). Entre os pares, `row-gap: var(--space-6)`.
  - **390:** `dt` acima do `dd`, com `dd` em `--text-lg` e `overflow-wrap: anywhere` (o e-mail cabe em 358 px).
- **Movimento:** só a cor do sublinhado, em `--dur-fast`.
- **Cardápio editado:** não depende do cardápio.

---

## 5. Inventário de componentes (10, fora as seções)

Arquivos em `src/direcoes/estilos/minimalismo/componentes/`, cada um com a parcial `scss/_<nome>.scss` em `@use` dentro do `<style scoped lang="scss">`. Foco em todos: `outline: var(--focus-width) solid var(--color-focus)` com `outline-offset: var(--focus-offset)` em `:focus-visible` (mixin `mn-foco` em `scss/_base.scss`), preto sobre branco, 21:1 [M40][M41]. Hover só em `@include hover-capable`. Nenhum componente usa sombra, raio, `transform` ou gradiente.

### 5.1 `MnTopo` (cabeçalho)

- **Papel:** `<header>` com a marca (`RouterLink` para a Home do estilo), a `<nav aria-label="Principal">` com Início (`aria-current="page"`), Cardápio e Entrar ou Perfil (`useLinksPrincipais(inicio)`), e o carrinho (`RouterLink` para `/cart`). Sempre visível, também em 390, sem menu escondido (desvio da ficha) [M8][H14].
- **Props:** `inicio: { type: String, required: true }`. **Slots:** nenhum. **Emits:** nenhum.
- **Carrinho:** texto visível "Carrinho" + número (`useContadorCarrinho().quantidade`, algarismos tabulares) + `span.visually-hidden` com " item" ou " itens". O nome acessível ("Carrinho 0 itens", "Carrinho 1 item") casa com `^Carrinho,? (vazio|\d+ itens?)$`. O anúncio da mudança é o do modal real [M42].
- **Estados:**

  | Estado | Link de texto | Carrinho |
  |---|---|---|
  | padrão | preto, sublinhado transparente de 2 px, `offset 6px` | idem, número em 700 |
  | hover | sublinhado `--min-cinza-linha` | idem |
  | foco | anel `mn-foco` | idem |
  | pressionado | sublinhado preto | idem |
  | selecionado (`aria-current`) | sublinhado preto de 2 px, permanente (não só cor [M37][M43]) | não se aplica |
  | número muda | não se aplica | `<Transition mode="out-in">` só de `opacity`, em `--dur-fast` |

- **Tokens:** `--min-preto`, `--min-branco`, `--min-cinza-linha`, `--min-fonte`, `--min-largura-expandida` (marca em Expanded 800), `--target-min`, `--space-*`, `--dur-fast`.
- **1440 e 1024:** marca à esquerda e links à direita, numa linha. **390:** marca na primeira linha e links na segunda (`flex-wrap`), com alvos de 44 px.
- **Referência:** [M8] (navegação visível com 4 ou 5 opções), padrão 1 do dossiê (5 publicados), [H35] (carrinho no canto superior direito).

### 5.2 `MnSumario` (índice da página)

- **Papel:** a `<nav aria-label>` do hero com os links para as seções da Home.
- **Props:** `itens: { type: Array, required: true }` (`{ id: String, rotulo: String }`); `rotulo: { type: String, required: true }` (o `aria-label`). **Slots:** nenhum. **Emits:** nenhum.
- **Lógica:** `RouterLink custom v-slot="{ href, navigate }"` com `to = { path: inicio, query: route.query, hash: '#' + id }`; no clique, `await navigate(e)` e depois `document.getElementById(id)?.focus({ preventScroll: true })`.
- **Estados:** padrão (preto, 700, sublinhado transparente); hover (sublinhado `--min-cinza-linha`); foco (`mn-foco`); pressionado (sublinhado preto). Sem selecionado, desabilitado nem carregando.
- **Tokens:** `--text-xl` (≥ 1024), `--text-lg` (< 1024), `--target-min`, `--space-5`, `--min-cinza-linha`, `--dur-fast`.
- **Referência:** [M18] (pontos de partida para as tarefas), [H22] (links de texto para as categorias), Double Dimanche (publicado, galerias: a lista de nomes é a navegação, sem cards).

### 5.3 `MnAcao` (ação principal preta)

- **Papel:** a ação principal da página, um `RouterLink` preto, cheio e retangular, nunca vazado [M1]. Usado em "Ver cardápio".
- **Props:** `to: { type: [String, Object], required: true }`. **Slots:** `default` (o texto). **Emits:** nenhum.
- **Estados:**

  | Estado | Visual |
  |---|---|
  | padrão | fundo `--min-preto`, texto `--min-branco`, 600, `min-height: 3.25rem`, `padding-inline: var(--space-6)`, borda de 2 px transparente (aparece em `forced-colors`) |
  | hover | fundo `--min-preto-hover` (texto 4,5:1 ou mais) [M40] |
  | foco | `mn-foco` por fora (preto sobre branco) |
  | pressionado | volta a `--color-accent-pressed` e ganha sublinhado branco de 2 px no texto (a mudança não depende só de cor) |

- **Tokens:** `--min-preto`, `--min-preto-hover`, `--min-branco`, `--color-accent-pressed`, `--min-borda-botao`, `--space-6`, `--dur-fast` (só `background-color`).
- **Referência:** [M1] (cor de destaque consistente nas ações principais; botão vazado ilegível), ficha (contras).

### 5.4 `MnLinhaCardapio` (uma linha do cardápio)

- **Papel:** um `<li>` com o produto: `MnLinhaPreco` (nome em `h3`, pontilhado e preço), a descrição, as ações (`MnBotaoAdicionar` e, se houver imagem, `MnBotaoFoto`) e o painel `MnFoto`.
- **Props:** `produto: { type: Object, required: true }`; `categoria: { type: String, required: true }` (`foods`, `drinks` ou `desserts`). **Slots:** nenhum. **Emits:** nenhum (abre o modal por `usePersonalizar()` e alterna a foto pelo `useFotoAberta` injetado).
- **Lógica:** `CartaoProduto v-slot="cartao"` (ou `useCartaoProduto(() => produto, { sizes: "(min-width: 1024px) 38vw, 92vw" })`); `chave = categoria + ':' + produto.id`; `aberta = fotos.aberta(chave)`.
- **Estados:**

  | Estado | O que muda |
  |---|---|
  | padrão | só texto; colunas da foto vazias (≥ 1024) |
  | foto aberta (selecionado) | `MnBotaoFoto` com quadrado cheio e `aria-expanded="true"`; `MnFoto` visível |
  | adicionado | `MnBotaoAdicionar` na face "Adicionado" durante `--dur-base` + `--dur-hold` (`data-adicionado="true"`) |
  | sem imagem | sem `MnBotaoFoto` |
  | imagem falhou | `MnFoto` com a reserva tipográfica |
  | carregando a foto | caixa 4:3 em `--color-surface-4` até a imagem chegar (sem animação de carregamento) |

  Não há hover na linha (nada de hover em card).
- **Tokens:** `--min-medida`, `--min-nome-produto`, `--min-cinza-texto`, `--text-md`, `--space-2`, `--space-4`, `--space-7`.
- **Referência:** padrão 4 do dossiê (Kalk e Patty, conceito; TAB, publicado; demonstração do W3C [M25]), [M27], [M35], [H20].

### 5.5 `MnLinhaPreco` (nome, pontilhado e preço)

- **Papel:** a linha tipográfica de cardápio, usada nos produtos e nos adicionais.
- **Props:** `nome: { type: String, required: true }`; `preco: { type: String, required: true }` (já formatado por `formatPrice`); `tag: { type: String, default: "h3" }` (`h3` nos produtos, `span` nos adicionais); `tamanho: { type: String, default: "produto" }` (`"produto"` ou `"adicional"`). **Slots:** nenhum. **Emits:** nenhum.
- **Marcação:** `<div class="mn-linha-preco">` → `<component :is="tag" class="mn-linha-preco__nome">` + `<span class="mn-linha-preco__pontos" aria-hidden="true">` + `<span class="mn-linha-preco__valor tabular">`.
- **Estados:** só o padrão (não é interativo). Com `prefers-contrast: more`, o pontilhado passa a `--min-preto`.
- **Tokens:** `--min-pontilhado` (borda inferior pontilhada, cor `--min-cinza-linha`), `--min-nome-produto` (produto, 700 no nome e 400 no preço), `--text-md` (adicional, 400), `--space-2`, `--space-6`.
- **Referência:** [M25] (cardápio numa lista, pontilhado entre nome e preço), [M26] (pontilhado fora do leitor de tela), [M27] (preço lido de uma vez).

### 5.6 `MnBotaoAdicionar`

- **Papel:** o botão "Adicionar" da linha, preto e cheio, com a confirmação "Adicionado".
- **Props:** `atributos: { type: Object, required: true }` (o `atributosAdicionar`, aplicado com `v-bind`); `adicionado: { type: Boolean, default: false }`. **Slots:** nenhum. **Emits:** `["adicionar"]` (a linha chama `personalizar(produto, cartao.contexto)`).
- **Marcação:** a da v1: `<button type="button">` com duas faces em `grid-area: 1 / 1` ("Adicionar" e, em `aria-hidden`, o ícone `['fas', 'check']` com "Adicionado"). O nome acessível vem do `aria-label` ("Adicionar <nome>").
- **Estados:**

  | Estado | Visual |
  |---|---|
  | padrão | face preta, texto branco, 600, borda de 2 px preta, altura de 48 px |
  | hover | face `--min-preto-hover` |
  | foco | `mn-foco` |
  | pressionado | sublinhado branco de 2 px no texto |
  | adicionado | face branca com texto e borda pretos, ícone de check e "Adicionado"; troca só por `opacity` em `--dur-fast` |

  Sem desabilitado: o modal real cuida do resto.
- **Tokens:** `--min-preto`, `--min-preto-hover`, `--min-branco`, `--min-borda-botao`, `--target-min`, `--space-5`, `--dur-fast`.
- **Referência:** [M1] (ação cheia na cor de destaque), [M42] (o resultado anunciado pelo modal).

### 5.7 `MnBotaoFoto` (disclosure "Ver foto")

- **Papel:** o botão que abre ou fecha a foto da linha. É o gatilho da ousadia.
- **Props:** `expandido: { type: Boolean, default: false }`; `controla: { type: String, required: true }` (id do painel); `nome: { type: String, required: true }`. **Slots:** nenhum. **Emits:** `["alternar"]` (com o próprio elemento, para a compensação de rolagem).
- **Marcação:** `<button type="button" data-ver-foto :aria-expanded :aria-controls="controla" :aria-label="TEXTOS.verFoto + ' de ' + nome">`, com um `span.mn-ver-foto__marcador` (`aria-hidden`) e o texto `TEXTOS.verFoto`.
- **Estados:**

  | Estado | Visual |
  |---|---|
  | padrão (fechado) | quadrado vazado de `--min-marcador` (borda de 2 px preta) + "Ver foto" sublinhado de 1 px; `min-height: var(--target-min)` |
  | hover | sublinhado de 2 px |
  | foco | `mn-foco` |
  | pressionado | sublinhado de 2 px |
  | selecionado (aberto) | quadrado cheio, desenhado com `border-width: calc(var(--min-marcador) / 2)` em `currentColor`, para continuar visível em `forced-colors`; o texto não muda |

  O estado aberto não depende só de cor: a forma do quadrado muda [M37], e o quadrado tem 21:1 contra o fundo [M40]. Sem desabilitado: sem imagem, o botão não existe.
- **Tokens:** `--min-marcador`, `--min-borda-botao`, `--min-preto`, `--target-min`, `--space-2`, `--dur-fast` (só a cor do sublinhado).
- **Referência:** [M44] (disclosure), [M3] (o resto sob demanda).

### 5.8 `MnFoto` (o painel da foto)

- **Papel:** a única foto visível da página, dentro da linha aberta.
- **Props:** `id: { type: String, required: true }`; `imagem: { type: Object, required: true }` (`{ src, srcset, sizes }` do `useCartaoProduto`); `nome: { type: String, required: true }`; `falhou: { type: Boolean, default: false }`. **Slots:** nenhum. **Emits:** `["erro"]`.
- **Marcação:** `<div :id class="mn-foto">` com `aspect-ratio: var(--min-foto-proporcao)` e fundo `--color-surface-4`. Dentro, `<picture>` (com `<source type="image/webp">` só se houver `srcset`) e `<img width="960" height="720" :alt="nome" loading="lazy" decoding="async" @error="$emit('erro')">` com `object-fit: cover`. Sem `fetchpriority` (a foto não está no hero). Na falha, `<p class="mn-foto__reserva" aria-hidden="true">{{ nome }}</p>`, em Expanded 800, `--text-2xl`, preto sobre `--color-surface-4`, alinhado em baixo à esquerda com `padding: var(--space-5)`.
- **Estados:** carregando (caixa cinza na proporção, sem salto de layout [M33]); carregada; falhou (reserva). Sem hover nem foco (não é interativo).
- **Tokens:** `--min-foto-proporcao`, `--color-surface-4`, `--min-preto`, `--min-fonte`, `--min-largura-expandida`, `--text-2xl`, `--space-5`, `--dur-base` (só a entrada, em `motion-ok`).
- **Referência:** [M31] (imagem fora da primeira tela com `lazy`), [M33] (`width` e `height`), [H27] (foto que informa), Kalk (conceito, galerias: lista sem foto por prato, a cor vem de uma imagem só).

### 5.9 `MnNotaAdicionais`

- **Papel:** nota de rodapé da categoria com os adicionais e o preço, mostrando de antemão o que o modal oferece [H24].
- **Props:** `idTitulo: { type: String, required: true }`; `titulo: { type: String, required: true }`; `adicionais: { type: Array, default: () => [] }` (`{ id, name, price }`); `nota: { type: String, required: true }`. **Slots:** nenhum. **Emits:** nenhum.
- **Marcação:** `<div class="mn-nota" v-if="adicionais.length">` → `h3` (`TEXTOS.adicionais`, `--text-lg`, 700) → `<ul role="list">` com `MnLinhaPreco tag="span" tamanho="adicional"` por item (preço por `formatPrice`) → `<p>` com `TEXTOS.notaAdicionais` em `--min-cinza-texto`.
- **Estados:** só o padrão (não é interativo); vazio, não renderiza.
- **Tokens:** `--text-lg`, `--text-md`, `--min-cinza-texto`, `--space-7` (gap das colunas), `--space-8` (distância da lista).
- **Referência:** catálogo do dossiê, "Adicionais em lista" (padrão 4; [M18]); [H24].

### 5.10 `MnRodape`

- **Papel:** `<footer>` com a marca (Expanded 800, `--text-lg`), a navegação repetida (`<nav aria-label="Rodapé">` com Início, Cardápio e Entrar ou Perfil, `useLinksPrincipais(inicio)`, com `aria-current="page"` no Início deste conjunto) e `RODAPE.copyright` em `--min-cinza-texto`, `--text-sm`.
- **Props:** `inicio: { type: String, required: true }`. **Slots:** nenhum. **Emits:** nenhum.
- **Estados dos links:** os do `MnTopo` (padrão, hover, foco, pressionado, selecionado).
- **1440 e 1024:** marca à esquerda e links à direita, alinhados pela linha de base; os direitos embaixo. **390:** empilhado.
- **Sem:** redes (links genéricos para `facebook.com` e `instagram.com` [H26]; Rams pede o design honesto, que não promete o que não cumpre [M7]), descrição e régua.
- **Referência:** padrão 7 do dossiê (Common Good, Cabalar e Hungry Tiger, publicados), [M8] (navegação repetida no fim, no site de maior uso do estudo), [H30].

### 5.11 O que a Home monta

`HomeMinimalismo.vue` (até 100 linhas), na ordem:

1. `import "@fontsource-variable/archivo/wdth.css"` e `import "./_tokens.scss"`;
2. `useEstiloAtivo("minimalismo", { esquema: "light" })`;
3. `provide` do `useFotoAberta(...)`;
4. `<MolduraDirecao estilo="minimalismo">`, com `#topo` = `MnTopo`, o slot padrão com `MnSecaoHero`, `MnSecaoCategoria` × 3 (`foods`/`hamburgueres`, `drinks`/`bebidas`, `desserts`/`sobremesas`) e `MnSecaoAtendimento`, e `#rodape` = `MnRodape`.

O `_home.scss` da v1 dá lugar às parciais por componente. O `vue3-carousel` e as setas `faArrowLeft` e `faArrowRight` saem desta Home.

---

## 6. Tokens, pares, lógica e dependências

### 6.1 Tokens novos (`--min-`; os valores ficam para o construtor, no `_tokens.scss`)

| Token | Papel | Sugestão de faixa |
|---|---|---|
| `--min-titulo-secao` | tamanho dos `h2` das seções, em `clamp()` com `rem` (nunca só `vw` [M28]) | de 2,25 a 3,5 rem |
| `--min-nome-produto` | tamanho do nome e do preço na linha do cardápio | de 1,375 a 1,75 rem |
| `--min-medida` | medida máxima da descrição e do apoio (abaixo de 80 caracteres [M30]) | ≈ 60ch |
| `--min-pontilhado` | espessura, estilo e cor do pontilhado (`border-bottom`), com a cor em `var(--min-cinza-linha)` | 2px dotted |
| `--min-marcador` | lado do quadrado do "Ver foto" | ≈ 0,75 rem |
| `--min-foto-proporcao` | proporção da caixa da foto | 4 / 3 |

Os tokens aprovados continuam: `--min-branco`, `--min-preto`, `--min-preto-hover`, `--min-cinza-texto`, `--min-cinza-linha`, `--min-fonte`, `--min-largura-expandida`, `--min-titulo`, `--min-titulo-linha`, `--min-largura-pagina`, `--min-borda-botao` e os do projeto. O `--min-erro` e a `--min-regua` ficam sem uso nesta Home.

### 6.2 Pares de contraste (`contraste.js`)

- **Novo:** `{ frente: "min-preto", fundo: "color-surface-4", minimo: 4.5, onde: "nome na reserva da foto" }`.
- **Já existentes, com o `onde` a atualizar:**
  - `min-preto` sobre `min-branco` (3): acrescentar "quadrado do Ver foto, aberto e fechado";
  - `min-cinza-linha` sobre `min-branco` (3): trocar "segmento da paginação" por "pontilhado do cardápio (decorativo)".
- Os demais pares (texto preto, cinza texto, botão preto e hover) continuam como estão.

### 6.3 Lógica necessária

| Nome | O que faz | Outro estilo poderia usar? |
|---|---|---|
| `useCardapio` | as três categorias reativas do `useProductsStore` (`foods`, `drinks`, `desserts`), com o rótulo de `CATEGORIAS` e a lista vazia como estado | Sim: se a fundação criar em `compartilhado/`, use; senão, local |
| `useAdicionais` | `foodAdditionals` e `dessertAdditionals` com o preço por `formatPrice` | Sim, pelo mesmo critério |
| `useFotoAberta` | a chave aberta (`"<categoria>:<id>"`), o estado inicial (o primeiro lanche com imagem), `aberta(chave)`, `alternar(chave, botao)` com a compensação de rolagem, e o `watch` que zera quando o produto some; `provide` e `inject` por `Symbol` | Não: é a regra "uma foto por vez" deste estilo |
| Ida ao hash com foco (no `MnSumario`) | navegar para `{ path, query, hash }` e focar o `h2` de destino | Sim (qualquer atalho dentro da página); pode ficar local |

Testes sugeridos para `__tests__/HomeMinimalismo.test.js`, além do modelo de contrato:

- um `h1` só;
- um "Adicionar <nome>" por produto;
- monta com o cardápio vazio e mostra a frase de categoria vazia;
- "Ver foto" abre uma linha e fecha a anterior (`aria-expanded`);
- um produto sem `image` fica sem "Ver foto";
- a nota dos adicionais some com a lista vazia.

### 6.4 Dependências novas

Nenhuma. Archivo (`@fontsource-variable/archivo`) já é usada desde a v1.

---

## 7. Textos provisórios (`textos.js`, todos com `// provisório`, sem dígitos)

| Chave | Texto | Onde |
|---|---|---|
| `nestaPagina` | "Nesta página" | `aria-label` do sumário do hero |
| `atendimento` | "Atendimento" | título da seção 4.5 e item do sumário |
| `contato` | "Contato" | rótulo (`dt`) do WhatsApp e do e-mail |
| `verFoto` | "Ver foto" | botão de disclosure (e o início do `aria-label` "Ver foto de <nome>") |
| `adicionais` | "Adicionais" | título da nota das categorias |
| `notaAdicionais` | "Você escolhe ao adicionar." | frase da nota |
| `categoriaVazia` | "Nada nesta categoria por enquanto." | categoria vazia (cópia do título do `EmptyState` do `MenuView`) |
| `rodape` | "Rodapé" | `aria-label` da navegação repetida no rodapé |

Todo o resto é texto real: `HERO`, `CATEGORIAS`, `HORARIO`, `CONTATOS`, `RODAPE`, `NOVA_ABA` e `MARCA` (`dados.js`), os produtos e os adicionais (`products.json`), "item" e "itens" (`formatItemCount`), "Adicionar" e "Adicionado".

---

## 8. Acessibilidade e contrato (resumo)

- **Landmarks:** `header`; `nav "Principal"`; `main#conteudo` (Moldura); `nav "Nesta página"` (dentro do `main`); `footer`; `nav "Rodapé"`. Os nomes das três `nav` são únicos.
- **Títulos:** `h1` (hero) → `h2` (Hambúrgueres, Bebidas, Sobremesas, Atendimento) → `h3` (cada produto e "Adicionais"), sem salto.
- **Caminho para `/menu` no `main`:** "Ver cardápio". **Carrinho:** nome "Carrinho N itens". **Horário, endereço, WhatsApp e e-mail:** na seção `atendimento`; o horário também no apoio do hero.
- **Alvos:** todos os links e botões com 44 × 44 px ou mais, inclusive os links do `dd` e do sumário [M36].
- **Movimento:**
  - sem autoplay, paralaxe, rolagem lateral nem `transform`;
  - a única transição acima de `--dur-fast` é a entrada da foto, dentro de `motion-ok`;
  - com movimento reduzido, a tela tem os mesmos títulos e botões.
- **Texto sobre foto:** nenhum. A reserva tem texto preto sobre `#f2f2f2`.
- **Reflow em 320 px [M29]:** tudo em uma coluna abaixo de 1024; o `h1` usa o `clamp` com `rem` do token; o e-mail quebra com `overflow-wrap`.
- **Alto contraste:** em `forced-colors: active`, a ação preta, o "Adicionar" e o quadrado do "Ver foto" continuam visíveis pelas bordas. Em `prefers-contrast: more`, o pontilhado fica preto.
- **Limites para o `desenho/minimalismo.json`:** `h1` em até 2 linhas em 1440 e em 1024, e 4 em 390.

---

## 9. Referências usadas

| Ref. | Tipo | Padrão abstraído | Onde entra |
|---|---|---|---|
| [M1] | pesquisa | monocromático com uma cor fixa para a ação principal; funções reduzidas; espaço negativo; tipografia dramática; botão vazado ilegível | paleta, `MnAcao`, colunas vazias, `h1` |
| [M3] | pesquisa | o necessário em repouso e o resto sob demanda (modo zen); não cortar o necessário | "Ver foto", descrição e preço sempre à vista |
| [M7] | autor do estilo | o design honesto, que não promete o que não cumpre; menos, mas melhor | redes fora do rodapé |
| [M8] | pesquisa | navegação visível com poucas opções; navegação repetida no fim da página | `MnTopo`, `MnRodape` |
| [M9] | pesquisa | até 5 quadros; uma imagem estática forte | o carrossel sai |
| [M17], [H2], [H3] | pesquisa | atenção acima da dobra; evitar o falso fim | hero curto, o `h2` dos lanches acima da dobra |
| [M18], [H1] | pesquisa | slogan que diz o que o site faz; pontos de partida; conteúdo real | hero, sumário, cardápio inteiro |
| [M21], [M35] | praticante, referência técnica | grade de 12 colunas; `subgrid` para alinhar as linhas | grade da lista e da foto |
| [M22], [M38] | praticante, referência técnica | nada de texto em cinza claro; 4,5:1 sem arredondar | cores de texto |
| [M25], [M26], [M27] | referência técnica, praticante | cardápio como lista; pontilhado fora do leitor de tela; preço lido de uma vez | `MnLinhaPreco` |
| [M28], [M29], [M30], [M34] | referência técnica | tamanho em `rem`; reflow em 320; medida de linha; `text-wrap: balance` | tipografia e responsivo |
| [M31], [M33] | referência técnica | `lazy` fora do hero; dimensões declaradas | `MnFoto` |
| [M36], [M37], [M40], [M41], [M43], [M44] | referência técnica | alvo; estado que não depende só de cor; contraste de componente e foco; `aria-current`; disclosure | todos os componentes |
| [M42] | referência técnica | resultado anunciado sem mover o foco | o anúncio do modal real; o número do carrinho |
| [H20], [H21], [H22], [H24] | pesquisa | preço no mínimo da listagem; mostrar a variedade; links de texto para as categorias; descrever a personalização | três categorias, sumário, nota dos adicionais |
| [H25], [H26] | pesquisa | conteúdo correto e conferível; nada de link que não leva aonde promete | sai "Mais pedidos"; saem as redes |
| [H29], [H30], [H32], [H33], [H34] | pesquisa, documentação | contato fácil de achar; links de mapa, WhatsApp e e-mail; aviso de nova aba | `atendimento` |
| Kalk, https://kalk.framer.website/ [M46] | conceito (template) | lista de pratos com nome, descrição e preço à direita, sem foto por item | o cardápio em lista |
| Patty, https://patty.framer.website/ [M49] | conceito (template) | categorias em lista de texto, sem foto nos itens | as três seções de categoria |
| TAB Kitchen/Bakery, https://tabkitchenbakery.com [M56] | publicado | cardápio com pontilhado | `MnLinhaPreco` |
| W3C, Dot leaders [M25] | conceito (demonstração técnica) | pontilhado entre nome e preço numa `ul` | `MnLinhaPreco` |
| Limón, Cabalar, Common Good, Union Boulangerie, Madie [M52][M51][M53][M57][M55] | publicados | horário, endereço e contato como bloco próprio da Home | `atendimento` |
| Common Good, Cabalar, Hungry Tiger, CARNE [M53][M51][M58][M54] | publicados | rodapé que repete a navegação | `MnRodape` |
| Double Dimanche (siteinspire, galerias) | publicado | a lista de nomes como navegação; a grotesca negrita como único elemento gráfico | `MnSumario`, `h1` |
| Galerias do estilo, "O que se repete" | 10 exemplos: 8 publicados (um deles contraexemplo, a Hungry Tiger) e 2 conceitos (Kalk e Delice) | um só ornamento por página; o cardápio como lista tipográfica; a foto de comida traz a cor | a ousadia (uma foto por vez) |

Nada foi copiado: nenhuma imagem, ícone, layout ou código de referência. As fotos são as do `public/images`, e o quadrado e o pontilhado são CSS.

## Notas da construção (W4, 21/11/2026)

A Home foi construída em 2 rodada(s) pelo W4 (construtor ou corretor, portões independentes e crítico). Soma das notas do crítico por rodada: 26, 28 (a v1 do piloto somava 16). Última avaliação: {"qualidade":4,"originalidade":4,"execucao":5,"funcionalidade":5,"estilo":5,"desenho":5}.

### Desvios do construtor em relação a este desenho

- (rodada 1) --min-pontilhado virou só a cor do pontilhado (alias de --min-cinza-linha), não 'espessura, estilo e cor'. Os 2px dotted ficam escritos em scss/_linha-preco.scss. Motivo: o P5 trata como cor todo token novo usado em border, e um token composto não se mede. O par min-pontilhado/min-branco (3:1) está em contraste.js. Com prefers-contrast: more, o pontilhado fica preto.
- (rodada 1) Quadrado cheio do 'Ver foto': a espessura da borda (calc(var(--min-marcador) / 2)) passa por uma variável local do componente, --mn-traco, que não é token. Motivo: o mesmo do P5. A cor é currentColor (preto), e o par min-preto/min-branco 3:1 já cita o quadrado.
- (rodada 1) Ritmo vertical: as seções usam só padding-top (--space-8 a partir de 1024 e --space-7 abaixo), não padding-block. O hero usa padding-top --space-7 (lg) ou --space-5 (celular), sem espaço embaixo. Motivo: com padding-block, o vão entre duas seções dobrava (128 px) e o cardápio descia. Em 1440, o h2 de Hambúrgueres fica em ~560 px, e a foto aberta começa em ~650 px, com ~250 px acima da dobra.
- (rodada 1) Aperto no celular, para o cardápio subir: cabeçalho com padding-block --space-2 abaixo de 768 px, gaps do hero em --space-4 abaixo de 768 px e lista a --space-5 do h2. Em 390, o h2 fica em ~590 px (o desenho dizia ~740), o Cheese Bacon com preço, descrição e botões fica acima da dobra, e a foto começa em ~820 px. A foto continua quase toda abaixo da dobra em 390, como o próprio desenho previa: o traço do estilo se lê na primeira tela pelo h1 Expanded, pela linha com pontilhado e pelo quadrado cheio do 'Ver foto'.
- (rodada 1) h1 com text-transform: none, porque o h1 global do projeto é em caixa alta (Bebas). Sem isso, o título saía em maiúsculas.
- (rodada 1) Sumário: depois do navigate, um requestAnimationFrame refaz a rolagem com scrollIntoView (respeita o scroll-padding da página, 80 px) e põe o foco no h2. Motivo: o scrollBehavior do router faz scrollTo direto e deixa o título colado na borda; com o mesmo hash de novo, ele nem rola. Conferido no navegador em 1440 e em 390: o título fica a 80 px do topo, e o foco vai ao h2 (com :focus-visible pelo teclado).
- (rodada 1) MnSumario usa route.path (com route.query e o hash), não uma prop inicio. MnSecaoHero recebe uma prop ids (chave → data-secao), que a Home passa.
- (rodada 1) Saída imediata da foto: a <Transition name='mn-foto'> tem um hook @leave que chama done() na hora, para o v-show esconder o painel na mesma atualização e a compensação de rolagem do alternar() medir o layout final. Conferido: o botão clicado fica no mesmo y (468 e 468 em 1440, 440 e 440 em 390). A entrada é só de opacidade, em --dur-base, dentro de motion-ok.
- (rodada 1) MnLinhaPreco usa align-items: last baseline, com flex-end antes como reserva. Assim o pontilhado assenta na linha de base da última linha do nome, e o preço também; o desenho dizia só flex-end.
- (rodada 1) Contato: o link do WhatsApp mostra 'WhatsApp +55 47 5 6355 3265' num texto só, sem o '·' de CONTATOS. O rótulo 'WhatsApp' está no textos.js como provisório (lição 11). O e-mail vai sozinho, como no wireframe.
- (rodada 1) textos.js tem também textos reais de outras telas, marcados como reais e não como provisórios: 'Adicionais' (h3 do ModalAdditional), 'Adicionar' e 'Adicionado' (ProductCard), 'Carrinho' e categoriaVazia 'Nada nesta categoria por enquanto'. Este último vai sem o ponto final que o desenho pôs, porque é cópia exata do título do EmptyState do MenuView.
- (rodada 1) 'Adicionar' pressionado volta ao preto (--color-accent-pressed), como o MnAcao, além do sublinhado branco de 2 px. Antes, a face de hover continuava sob o mouse.
- (rodada 1) Rodapé: a marca e os links ficam lado a lado a partir de 768 px (md), não de 1024.
- (rodada 1) h2 de todas as seções com tabindex='-1' (alvos do sumário), anel só com :focus-visible.
- (rodada 1) ficha.js não mudou. O desvio da v1 'Setas e paginação ficam visíveis' não se aplica mais (a Home não tem carrossel). Fica para a sessão principal decidir se sai.
- (rodada 2) Seções 4.2 e 5.6 do desenho, layout a partir de 1024 px: a linha do cardápio deixou de usar a grade com subgrid [M35] e passou a usar flutuação (float). O texto flutua à esquerda, nas colunas 1 a 7 (1 a 6 em 1440), e a foto aberta flutua à direita, nas colunas 8 a 12. As larguras saem da mesma grade de 12 colunas com vão de --space-5, pela nova função `mn-colunas($n)` em scss/_base.scss. O `li` mede só o texto, porque um ::after com `clear: left` limpa só a flutuação do texto. Assim, a foto (4:3, cerca de 420 px em 1440) desce ao lado das linhas seguintes e da nota dos adicionais, nas colunas que já ficavam vazias, e não abre mais vão na lista. O espaço entre linhas continua --space-7 (padding-top em `li + li`).
- (rodada 2) O `.mn-categoria__interno` deixou de ser grade (`mn-grade`) a partir de 1024 px e passou a `display: flow-root`. A nota dos adicionais ganhou `width: mn-colunas(7)` (6 em 1440) no lugar de `grid-column`. O flow-root contém a foto flutuante: se ela passa do fim do texto e da nota (por exemplo, a última linha aberta, como Suco de Abacaxi ou Batata Frita, ou um cardápio editado mais curto), a seção cresce até o fim da foto e não invade a seguinte. Escolhi isso no lugar das três opções sugeridas (margem negativa, posição absoluta ou painel em várias linhas da grade), porque nenhuma delas protege a seção seguinte quando a foto aberta é a da última linha.
- (rodada 2) Abaixo de 1024 px nada mudou: a lista é uma grade de uma coluna com row-gap --space-7, e a foto vem abaixo dos botões. As capturas de 390 são iguais às da r1.

### O que o crítico deixou na última rodada

- (menor) atendimento / fatia-1440-05: O problema da rodada anterior (foto aberta definindo a altura da linha) está RESOLVIDO. Em 1440 e 1024 (fatia-1440-01/02, estado-desenho-1/3, janela-1024), a foto passa para as colunas 8 a 12 das linhas seguintes, e o intervalo entre os pratos volta a ter cerca de 50 px. A categoria não se parte mais. Resta só um polimento em Atendimento: os rótulos dt (Horário, Endereço, Contato, em --text-md) ficam alinhados pelo topo com os dd em --text-xl, e por isso a linha de base do rótulo fica alguns pixels abaixo da do valor. Correção: alinhar os pares pela linha de base (align-items: baseline na grade do dl) ou ajustar o padding-top do dt.
