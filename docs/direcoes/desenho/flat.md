# Desenho da Home: Flat, "Ladrilhos" (rodada 2)

Desenho para o construtor do W4. Slug `flat`, esquema `light`, componentes com o prefixo `Fl` e classes `fl-`. A identidade aprovada (paleta, Segoe UI e Open Sans, títulos leves em caixa baixa visual, botão com canto de 4 px, nenhuma sombra) continua; muda a composição. Fontes entre colchetes: [F..] e [MS..] são do dossiê `docs/direcoes/pesquisa/flat.md` e da seção "Flat" do `PESQUISA.md`; [H..] são do transversal `docs/direcoes/pesquisa/home-delivery.md`; "galeria nº" é a tabela do `r2/galerias/flat.md`.

## 1. Tese

**Mantida, com um ajuste.** A ficha diz que "a Home vira um painel de ladrilhos" e que é flat 2.0, com botões que continuam com cara de botão [F2][F3]. A v1 não cumpriu a primeira parte: eram dois ladrilhos e um carrossel. A rodada 2 faz a Home abrir como a tela Iniciar do Metro: um título grande e leve no papel e, logo abaixo, um mosaico de ladrilhos chapados em poucos tamanhos, cada um um alvo só, com a área de contagem [F28][F32][F37].

**O ajuste (com fonte): cor chapada só no que se clica.** No flat, sem relevo, a função vem da cor: fundo colorido sugere botão, faixa no topo sugere navegação [F1]. Por isso título que não se clica não leva fundo colorido [F5], e a cor do botão principal não pode ser o fundo de um título [F3]. A v1 fazia as duas coisas: o `h1` ficava num ladrilho roxo, da mesma cor dos botões "Adicionar". Na v2 vale a regra: **cebola, cheddar, alface e tinta como preenchimento só em alvos** (ladrilhos, botões, o quadrado do link de contato) e nas duas faixas de moldura (topo e rodapé, convenção de navegação e de rodapé [F1][H30]). Todo texto que não se clica fica no papel branco.

Texto sugerido para a ficha (o W5 decide): "O flat dispensa brilho, 3D e textura e nasceu como reação ao esqueumorfismo; o Metro e o Windows 8 são os marcos [F1]. A Home abre como a tela Iniciar: um título leve e um mosaico de ladrilhos chapados, cada um um alvo só, com a contagem calculada [F28][F32]. Cor chapada só no que se clica, porque fundo colorido sugere botão [F1][F5]. É flat 2.0: os botões continuam com cara de botão [F2][F3]."

### O que mudou da rodada 1

| v1 | v2 | Por quê |
|---|---|---|
| Hero de dois ladrilhos: o `h1` num roxo chapado e a foto num cheddar | Tela inicial: `h1` no papel e um mosaico de 5 ladrilhos (Hambúrgueres, Bebidas, Sobremesas, Adicionais e Horário), cada um um botão inteiro com a contagem | A tese pede o painel de ladrilhos; o ladrilho é a porta de entrada, um alvo só, com área de contagem [F28][F37]; título em fundo colorido parece botão [F5][F3] |
| Carrossel "Mais pedidos" com 7 lanches, setas e quadradinhos de paginação | Pivot de três páginas (Hambúrgueres, Bebidas e Sobremesas) com os produtos em lista e o "Adicionar" real | Pontos são pista fraca [F23]; rolagem lateral passa despercebida [F33][F56]; os 7 lanches num carrossel são passos demais [H9]; "Mais pedidos" afirma popularidade sem dado [H25][H26]; bebidas e sobremesa passam a aparecer na Home [H21] |
| Cards cinza (ladrilho) com foto 1:1 | Linhas de produto no papel, sem caixa nem divisória | O card é dispensável em conteúdo homogêneo, e o Material v1 sugere lista [F36]; agrupar sem linha nem caixa [F51]; o Metro lista itens na vertical [F26] |
| Barra branca no topo; menu escondido no celular | Faixa preta no topo, com os três links visíveis também em 390 | Faixa forte no topo é navegação [F1]; com 4 links ou menos, deixá-los visíveis [H14] |
| Sem adicionais na Home | Seção `adicionais`: os 12 adicionais com o preço, em tipo grande e leve | Mostrar de antemão o que se pode personalizar [H24]; "type is information" [F7][F51] |
| Contatos e redes no rodapé de 4 colunas | Seção `loja` com horário, endereço, WhatsApp e e-mail; rodapé enxuto, sem as redes | Endereço e contato mostram que há uma casa de verdade [H26][H29]; os links de `REDES` são genéricos (`facebook.com`, `instagram.com`) e minam a credibilidade [H25][H26] |

## 2. Processo (as duas passadas da skill frontend-design)

### Plano (primeira passada)

- **Cor:** papel `#ffffff`, tinta `#000000`, cebola `#5b2a86`, cheddar `#f2b705`, alface `#2f7d32`, ladrilho `#f0f0f0` (os tokens aprovados).
- **Tipo:** Segoe UI no Windows e Open Sans Variable nos outros (já importada). Títulos em 300 e caixa baixa visual a partir de 768 px, 400 abaixo; texto em 400; botões, nomes e preços em 600.
- **Layout:** a tela Iniciar no topo (título à esquerda, mosaico na largura toda), depois o pivot, os adicionais e a loja, alinhados à esquerda, numa coluna de 1136 px.
- **Princípios:** cor chapada é sinal de clique; a tipografia é a informação; a ousadia fica só no mosaico.

### Revisão contra o pedido (o que saiu genérico, repetido ou inviável e foi trocado)

1. **"A partir de" em cada ladrilho: saiu.** O menor preço de `foods` é o da Batata Frita, e o ladrilho "Hambúrgueres" diria "a partir de" um valor que nenhum hambúrguer tem: o rótulo prometeria o que não cumpre [H1]. O ladrilho fica com a contagem, que é o traço do ladrilho do Metro [F28]; o preço aparece em cada linha do pivot [H20].
2. **Título de panorama cortado na borda direita: saiu.** É o gesto mais conhecido do panorama [F53], mas cortaria o `h1`, e o título do panorama não pode depender de nada para ser lido [F24]. A ousadia fica num lugar só, o mosaico.
3. **Ladrilhos levando ao `/menu`: trocados por destinos na própria página.** O `/menu` abre sempre em Hambúrgueres (`MenuView.vue`: `currentCategory = ref("foods")`), e um ladrilho "Bebidas" que cai em Hambúrgueres quebra a expectativa [H1]. Cada ladrilho de categoria seleciona a página do pivot e leva até ela, como o painel inicial do hub, que é o menu das áreas, com os resumos ao lado [F25].
4. **Uma segunda fileira de ladrilhos para os contatos: trocada por lista tipográfica.** Dois mosaicos dividiriam a ousadia. A seção `loja` fica quieta: horário em tipo grande e leve, links em linha com um quadrado chapado.
5. **Ladrilho do carrinho e navegação repetida no rodapé: saíram.** Repetiriam os nomes acessíveis do cabeçalho ("Carrinho, vazio", "Cardápio"), e os testes do contrato procuram esses nomes.
6. **Barra de aplicativo embaixo, no celular (a app bar do Windows Phone [F53]): saiu.** Somaria uma barra fixa ao cabeçalho [H17], e o alternador das direções já fica fixo no canto de baixo (`SeletorDirecao.vue`).
7. **Mosaico com cara de "bento" (cards arredondados de conteúdo misto): evitado pela anatomia do Metro.** Canto 0, junta de 8 px, só as proporções 1:1 e 2:1 (médio, largo e grande [F28][F55]), nome embaixo à esquerda, contagem no alto à direita, ícone ou imagem no meio, nenhuma sombra e nenhum degradê.

### Desenho final

O que segue. A ousadia é o mosaico da tela inicial. O resto é papel branco, tinta preta e o roxo só nos botões e no sublinhado.

## 3. Composição

Ordem dos blocos:

1. **Topo** (`FlTopo`, slot `#topo`): faixa preta fixa com a marca, a navegação principal e o carrinho.
2. **`inicio`** (hero): `h1`, texto e "Ver cardápio"; abaixo, o mosaico de 5 ladrilhos. **A ousadia.**
3. **`cardapio`** (nova): o pivot com as três categorias e os produtos em lista, com "Adicionar".
4. **`adicionais`** (nova): os adicionais de hambúrguer e de sobremesa, com o preço.
5. **`loja`** (nova): horário, endereço, WhatsApp e e-mail.
6. **Rodapé** (`FlRodape`, slot `#rodape`): faixa preta com a marca, a descrição e o copyright.

São 4 seções de conteúdo (o hero conta), 3 delas novas em relação à v1, e 10 componentes próprios.

**Grade:** contêiner do projeto (`.container`: 1136 px em 1440, 960 px em 1024, 358 px em 390). Tudo alinhado à esquerda; nada centralizado, nem os títulos. Ritmo vertical: `--space-8` entre seções a partir de `md`, `--space-7` abaixo.

### Wireframe em 1440 × 900

```
┌──────────────────────────────────────────────────────────────────────────────────┐ faixa tinta, 72 px, sticky
│  smash burger                                início  cardápio  entrar     🛒 ▣2  │ início: sublinhado cheddar 4 px
└──────────────────────────────────────────────────────────────────────────────────┘
      papel; contêiner de 1136 px (x de 152 a 1288)
      smash na chapa,                                  Hambúrgueres artesanais prensados   ← texto (cols 7-10),
      entregue quente                                  na hora. De terça a sexta, das       alinhado ao pé do h1
      (h1, 300, ≈84 px, colunas 1 a 6, 2 linhas)       13h à 01h.  [ Ver cardápio ]         botão cebola, canto 4 px
      ┌──────────────────────────┐┌──────────────────────────┐┌────────────┐
      │                  7 itens ││                  3 itens ││     1 item │
      │                          ││          (copo)          ││   (pote)   │   linha 1: bebidas (largo, CEBOLA)
      │      [hambúrguer         ││ bebidas                  ││ sobremesas │            sobremesas (médio, ALFACE)
      │       recortado,         │└──────────────────────────┘└────────────┘
      │       sem fundo]         │┌──────────────────────────┐┌────────────┐
      │                          ││                 12 itens ││  (relógio) │   linha 2: adicionais (largo, TINTA)
      │ hambúrgueres             ││          ( + )           ││ horário    │            horário (médio, CHEDDAR)
      │ (grande, CHEDDAR)        ││ adicionais               ││ Terça a    │
      └──────────────────────────┘└──────────────────────────┘└sexta, das…─┘
       mosaico: 10 colunas, junta de 8 px, aspect-ratio 5/2 (≈1136 × 454)
      cardápio                                          ← h2 da seção seguinte, acima da dobra (≈ y 840)
```

### Em 1024 × 900

Mesma grade do 1440, com contêiner de 960 px: `h1` (≈70 px, 300) nas colunas 1 a 6, em 2 ou 3 linhas; texto e botão nas colunas 7 a 10; mosaico de 960 × 384. O `h2` "cardápio" começa por volta de y 760.

### Wireframe em 390 × 844

```
┌────────────────────────────────┐ faixa tinta sticky, 2 linhas (≈96 px)
│ smash burger            🛒 ▣2  │
│ início   cardápio   entrar     │ início sublinhado cheddar
└────────────────────────────────┘
 smash na chapa,
 entregue quente                    h1 400, ≈44 px, 2 ou 3 linhas
 Hambúrgueres artesanais prensados
 na hora. De terça a sexta, das
 13h à 01h.
 [ Ver cardápio ]
 ┌──────────────────────────────┐
 │                      7 itens │  hambúrgueres: largo 4×2, CHEDDAR
 │             [hambúrguer]     │  (≈358 × 175)
 │ hambúrgueres                 │
 └──────────────────────────────┘
 ┌─────────────┐┌─────────────┐
 │     3 itens ││      1 item │  bebidas (CEBOLA) | sobremesas (ALFACE)
 │   (copo)    ││   (pote)    │  médios 2×2, ≈175 × 175
 │ bebidas     ││ sobremesas  │
 └─────────────┘└─────────────┘   ← dobra de 844 por aqui
 ┌─────────────┐┌─────────────┐
 │    12 itens ││  (relógio)  │  adicionais (TINTA) | horário (CHEDDAR)
 │ adicionais  ││ horário     │
 └─────────────┘└─────────────┘
 cardápio
 Escolha, personalize e peça.
 hambúrgueres   bebidas            abas em 400; quebram linha se faltar
 sobremesas                        espaço (nada de rolagem lateral)
 ┌──────┐ Cheese Bacon
 │ foto │ Hambúrguer artesanal com…
 └──────┘ R$ 25,99      [Adicionar]
 … (uma linha por produto)
 adicionais
 nos hambúrgueres
 bacon        ovo
 R$ 3,50      R$ 2,50   …           grade de 2 colunas
 horário e contato
 terça a sexta, das 13h à 01h      linha grande e leve
 ▣ Rua Beira da Praia - Navegantes, SC
 ▣ WhatsApp · +55 47 5 6355 3265
 ▣ contato@smashburger.com.br
┌────────────────────────────────┐ rodapé tinta
│ smash burger                   │
│ Sabor irresistível em cada…    │
│ © 2026 Smash Burger · Sabiá…   │
└────────────────────────────────┘
```

## 4. Seções

### 4.1 `inicio`: a tela inicial (hero, a ousadia)

- **Arquivo:** `secoes/FlSecaoInicio.vue`. Raiz `<section data-secao="inicio" aria-labelledby="fl-titulo">`.
- **Objetivo:** dizer o que a casa faz e quando abre [H1] e mostrar o alcance do cardápio logo na primeira tela, como o hub, que mostra o alcance do app com uma amostra por seção [F31][H21][H22]. Cada ladrilho é uma porta de entrada para uma área da página [F28][F25].
- **Conteúdo real:**

  | Campo | Origem |
  |---|---|
  | `h1#fl-titulo` | `dados.js` → `HERO.titulo` |
  | Texto de apoio | `dados.js` → `HERO.texto` (traz o horário) |
  | Botão "Ver cardápio" (`RouterLink` para `/menu`) | `dados.js` → `HERO.acao` |
  | Rótulos dos três ladrilhos de categoria | `dados.js` → `CATEGORIAS[].rotulo` (Hambúrgueres, Bebidas, Sobremesas) |
  | Contagem de cada categoria | calculada: `formatItemCount(useProductsStore()[chave].length)` |
  | Imagem do ladrilho Hambúrgueres | `dados.js` → `HERO.imagem`, `HERO.largura`, `HERO.altura`, `IMAGEM_HERO` (recorte com alfa, WebP 480 e 960, PNG 960) |
  | Rótulo do ladrilho Adicionais | `textos.js` → `TEXTOS.adicionais.titulo` ("Adicionais", o mesmo título do modal real, `ModalAdditional.vue`) |
  | Contagem dos adicionais | calculada: `formatItemCount(foodAdditionals.length + dessertAdditionals.length)` |
  | Rótulo e texto do ladrilho Horário | `dados.js` → `RODAPE.horario` ("Horário") e `HORARIO` |

- **Textos provisórios:** nenhum nesta seção.
- **Componentes:** `FlBotao` ("Ver cardápio") e 5 × `FlLadrilho`, numa `<ul role="list" class="fl-mosaico">` (um `<li>` por ladrilho).
- **Os cinco ladrilhos** (ordem do DOM = ordem visual em todas as larguras):

  | `destino` | rótulo | cor | conteúdo do meio | contagem | grande (≥ lg) | abaixo de lg |
  |---|---|---|---|---|---|---|
  | `foods` | Hambúrgueres | `cheddar` | imagem do hero (recorte) | 7 itens | grande 4×4 | largo 4×2 |
  | `drinks` | Bebidas | `cebola` | ícone `faGlassWater` (importado no componente) | 3 itens | largo 4×2 | médio 2×2 |
  | `desserts` | Sobremesas | `alface` | ícone `faIceCream` (importado) | 1 item | médio 2×2 | médio 2×2 |
  | `adicionais` | Adicionais | `tinta` | ícone `['fas', 'plus']` (registrado) | 12 itens | largo 4×2 | médio 2×2 |
  | `loja` | Horário | `cheddar` | ícone `faClock` (importado) + `HORARIO` como detalhe | sem contagem | médio 2×2 | médio 2×2 |

  As cores foram distribuídas para que dois ladrilhos da mesma cor nunca se encostem, em 1440, 1024 e 390. A cor de cada chave fica numa constante da seção (`COR_POR_DESTINO`), não no `dados.js`.

- **Interação e estados:**
  - Cada ladrilho é um `<button type="button">` inteiro, sem nada clicável dentro [F28][F37][F47]. A ação é `irPara(destino)`, do `useHub` (seção 7):
    - `foods`, `drinks` e `desserts`: seleciona a página do pivot, rola até a seção `cardapio` e põe o foco na aba selecionada;
    - `adicionais` e `loja`: rola até a seção e põe o foco no `h2` dela (`tabindex="-1"`).
  - É botão, e não link, porque muda o estado de um widget da página (a aba do pivot) além de rolar; fundo chapado já sugere botão [F1].
  - Estados do ladrilho (padrão, hover, foco, pressionado) na seção 5. Não há selecionado nem desabilitado: categoria vazia continua ativa e mostra "0 itens".
  - "Ver cardápio": estados do `FlBotao` na seção 5.
- **Acessibilidade:**
  - Landmark: a seção, rotulada pelo `h1`.
  - Nome de cada ladrilho por `aria-label`, montado com os mesmos valores visíveis, na mesma ordem (o texto visível fica contido no nome, 2.5.3): "Hambúrgueres, 7 itens", "Adicionais, 12 itens", "Horário: Terça a sexta, das 13h à 01h".
  - A imagem dentro do ladrilho Hambúrgueres é decorativa ali (o botão já tem nome): `alt=""`, com `width` e `height`. Os ícones levam `aria-hidden="true"`.
  - Foco: anel `--focus-width` de `--color-focus` (tinta) com `--focus-offset`, desenhado fora do ladrilho, sobre o papel e dentro da junta de 8 px.
  - Atributo de teste estável: `data-destino="<destino>"` no botão.
- **Comportamento:**
  - **1440:** linha do título numa grade de 10 colunas: `h1` nas colunas 1 a 6 (`--flat-titulo`, 300, `line-height: var(--leading-display)`, `letter-spacing: -0.02em`, 2 linhas); texto (`max-width: 34ch`) e botão nas colunas 7 a 10, alinhados ao pé (`align-self: end`). Abaixo, com `--space-6`, o mosaico: `grid-template-columns: repeat(10, 1fr)`, `gap: var(--flat-junta)`, `aspect-ratio: 5 / 2`, áreas:
    ```
    "h h h h b b b b s s"
    "h h h h b b b b s s"
    "h h h h a a a a l l"
    "h h h h a a a a l l"
    ```
    `padding-top` da seção: `--space-7`.
  - **1024:** igual, com o `h1` em ≈70 px (2 ou 3 linhas).
  - **390:** uma coluna: `h1` (400, ≈44 px, 2 ou 3 linhas), texto, botão (largura do conteúdo) e o mosaico em 4 colunas: `grid-template-columns: repeat(4, 1fr)`, `grid-auto-rows: var(--flat-celula)` (perto da largura da coluna, ≈84 px), Hambúrgueres com `grid-column: span 4; grid-row: span 2` e os outros com `grid-column: span 2; grid-row: span 2`. Entre 768 e 1023 px vale o mesmo arranjo de 4 colunas, com a célula limitada pelo `clamp` do token. Abaixo de `md`, se o detalhe do ladrilho Horário não couber com o ícone (o portão de texto cortado acusa), o ícone sai só nesse ladrilho; o texto nunca é cortado.
  - **Anatomia do ladrilho:** grade interna com `grid-template-areas: ". contagem" "meio meio" "nome nome"` e `grid-template-rows: auto 1fr auto`; `padding: var(--space-4)` (`--space-3` abaixo de `md`). Nome embaixo à esquerda (1.25rem, 600, caixa baixa visual); contagem no alto à direita (0.9375rem, 600, `tabular`); o detalhe do ladrilho Horário logo abaixo do nome (0.9375rem, 400, até 3 linhas). O meio é o ícone (2.5rem, centrado) ou a imagem (`max-height: 100%`, `object-fit: contain`, encostada à direita e embaixo, cortada pela borda do ladrilho com `overflow: hidden`). Texto e imagem ficam em linhas diferentes da grade: nada de texto sobre a foto [F16][H5].
- **Movimento:**
  - **O único momento orquestrado da página** (o Metro é "vivo em movimento" [F7]; a coreografia é escolha de projeto): na montagem, dentro do `motion-ok`, os ladrilhos 2 a 5 entram da direita, um depois do outro: `@keyframes fl-entra { from { opacity: 0; transform: translateX(var(--space-6)); } }`, `animation: fl-entra var(--dur-slow) var(--ease-out) both`, com `animation-delay: calc(var(--fl-ordem) * var(--dur-stagger) * 2)` (`--fl-ordem` de 1 a 4, por `style`). O ladrilho Hambúrgueres não anima: tem a imagem do LCP [F48].
  - **Com movimento reduzido:** nenhuma animação de entrada; os ladrilhos aparecem prontos.
  - Hover e pressionado do ladrilho e a rolagem do `irPara`: seções 5 e 7.
  - Nada se atualiza sozinho: nenhum ladrilho vivo, nenhuma troca automática [F21][F28][F32].
- **Imagem e desempenho:** só a imagem do ladrilho Hambúrgueres na primeira tela, `loading="eager"`, `fetchpriority="high"`, `decoding="async"`, por `responsiveImage(HERO.imagem, { ...IMAGEM_HERO, sizes: "(min-width: 1024px) 320px, 50vw" })` [F48]. Em 390 (DPR 3) o navegador escolhe a de 960 (≈190 KB), bem abaixo de 1 MB.
- **Cardápio editado:** as contagens saem do store a cada render. Categoria vazia: "0 itens", e o ladrilho continua levando à página do pivot, que explica o vazio [F27]. Adicionais vazios: "0 itens", e o ladrilho leva à seção, que explica o vazio. A imagem do ladrilho é a do hero (arquivo fixo), não a de um produto: nada a reservar para `data:` ou produto sumido; se ela falhar ao carregar (`@error`), o meio fica vazio e o ladrilho continua inteiro.

### 4.2 `cardapio`: o pivot das categorias (nova)

- **Arquivo:** `secoes/FlSecaoCardapio.vue`. Raiz `<section data-secao="cardapio" aria-labelledby="fl-cardapio-titulo">`.
- **Objetivo:** mostrar os produtos reais com preço e "Adicionar" [H20], uma categoria por vez, no controle mais característico do Metro: o pivot, com cabeçalhos de uma ou duas palavras e visões do mesmo tipo de dado [F27][F25]. Não é a aba genérica: os cabeçalhos são texto de título (grande, leve, em caixa baixa), sem caixa, pílula nem borda, e o próximo cabeçalho fica à vista como pista [F27].
- **Conteúdo real:**

  | Campo | Origem |
  |---|---|
  | `h2#fl-cardapio-titulo` | `textos.js` → `TEXTOS.cardapio.titulo` ("Cardápio", o rótulo real do link em `useLinksPrincipais.js`) |
  | Linha de apoio | `dados.js` → `FRASE_CARDAPIO` ("Escolha, personalize e peça.") |
  | Cabeçalhos do pivot | `dados.js` → `CATEGORIAS` (`chave`, `rotulo`) |
  | Produtos de cada página | `useProductsStore()[chave]`: `name`, `description`, `price` (via `cartao.preco`, que usa `formatPrice`), `image` (via `cartao.imagem`) |
  | Nome acessível e estado do "Adicionar" | `useCartaoProduto` → `atributosAdicionar`, `adicionado`, `contexto` |
  | Página vazia | `textos.js` → `TEXTOS.cardapio.vazio` ("Nada nesta categoria por enquanto", o título real do EmptyState de `src/views/MenuView.vue`) |

- **Textos provisórios:** nenhum.
- **Componentes:** `FlPivot` (abas e painéis) e, em cada painel, `<ul role="list" class="fl-lista">` com `FlLinhaProduto` por produto (que usa `FlBotaoAdicionar`).
- **Interação e estados:**
  - Aba ativa: `abaAtiva` do `useHub` (começa em `foods`), em `v-model` no `FlPivot`. Os ladrilhos da seção `inicio` mudam essa mesma aba.
  - Teclado do padrão APG [F46]: setas esquerda e direita com volta do fim ao início, Home e End, ativação automática (o painel aparece sem atraso, porque os três já estão no DOM), tabindex móvel. Tab sai da lista de abas e entra no painel (no primeiro "Adicionar").
  - "Adicionar <nome>": `personalizar(produto, cartao.contexto)` do `usePersonalizar()`. A seção não calcula preço nem chama o `cartStore`.
  - Estados das abas e da linha na seção 5.
- **Acessibilidade:**
  - `role="tablist"` com `aria-labelledby="fl-cardapio-titulo"`; cada aba é `<button role="tab" id="fl-aba-<chave>" aria-controls="fl-painel-<chave>" :aria-selected>`, filha direta da lista (os seletores do JSON dependem disso).
  - Cada painel: `<div role="tabpanel" id="fl-painel-<chave>" aria-labelledby="fl-aba-<chave>">`, com `v-show`. O `display` do painel não pode ser trocado por CSS (a grade fica num filho, a `ul`), senão o `v-show` deixa de esconder.
  - Aba selecionada marcada além da cor: sublinhado de `--flat-sublinhado` (4 px) em cebola, `text-underline-offset: 8px` [F17].
  - Os nomes dos produtos são `h3` (h1 → h2 → h3, sem salto).
- **Comportamento:**
  - **1440:** `h2` (`--flat-titulo-secao`, 300, caixa baixa) e, abaixo, `FRASE_CARDAPIO` (1.1875rem, tinta). Abas numa linha com `gap: var(--space-6)`, em `--flat-titulo-pivot` (300). Painel a `--space-6` das abas: a `ul` em 2 colunas (`grid-template-columns: repeat(2, minmax(0, 1fr))`, `column-gap: var(--space-7)`, `row-gap: var(--space-6)`), 4 linhas para os 7 lanches.
  - **1024:** igual, com colunas de ≈450 px.
  - **390:** abas em 400 e `flex-wrap: wrap` (se não couberem, "sobremesas" desce para a segunda linha; nada de rolagem lateral [F33][F56][F42]). A `ul` em 1 coluna, `row-gap: var(--space-5)`.
- **Movimento:** troca de página com o deslize do pivot: dentro do `motion-ok`, o painel que entra vem de `translateX(var(--space-6))` (ou do negativo, se a aba nova está à esquerda da anterior; da última para a primeira pela seta direita conta como avanço) com `opacity` de 0 a 1, em `--dur-base` e `--ease-out`; o que sai some na hora. **Reduzido:** só `opacity`, em `--dur-fast`. O sublinhado não se move: aparece na aba nova.
- **Cardápio editado:** a lista sai do store a cada render; produto excluído some da página; nome e preço trocados aparecem como estão. Página vazia: o painel mostra `TEXTOS.cardapio.vazio` num `<p>` em `--text-lg`, e a aba continua lá [F27]. Imagem `data:`: o `responsiveImage` devolve só `src`, e o `<source>` só entra com `v-if="cartao.imagem.srcset"`. Imagem que falha: o quadrado mostra o ícone da categoria (seção 5).

### 4.3 `adicionais`: o painel dos adicionais (nova)

- **Arquivo:** `secoes/FlSecaoAdicionais.vue`. Raiz `<section data-secao="adicionais" aria-labelledby="fl-adicionais-titulo">`.
- **Objetivo:** mostrar antes do pedido o que se pode acrescentar e quanto custa, que o Baymard viu faltar nos sites de delivery [H24][H23], como o painel de resumo de uma subárea do hub [F25]. A forma é tipográfica, "type is information" [F7]: palavras grandes e leves sobre o preço pequeno e mais pesado [F51], agrupadas só pelo espaço, sem linha nem caixa [F51].
- **Conteúdo real:**

  | Campo | Origem |
  |---|---|
  | `h2#fl-adicionais-titulo` (`tabindex="-1"`) | `textos.js` → `TEXTOS.adicionais.titulo` ("Adicionais", o título real do modal, `ModalAdditional.vue`) |
  | Linha de apoio | `textos.js` → `TEXTOS.adicionais.texto` (provisório) |
  | Grupo dos hambúrgueres | `useProductsStore().foodAdditionals` (`id`, `name`, `price` via `formatPrice`) |
  | Grupo das sobremesas | `useProductsStore().dessertAdditionals` (idem) |
  | Títulos dos grupos (`h3`) | `textos.js` → `TEXTOS.adicionais.hamburgueres` e `TEXTOS.adicionais.sobremesas` (provisórios) |
  | Os dois vazios | `textos.js` → `TEXTOS.cardapio.vazio` |

- **Textos provisórios:** "Os adicionais aparecem quando você adiciona um hambúrguer ou uma sobremesa." (verdade no app: o modal só mostra adicionais para hambúrgueres e sobremesas, `ModalAdditional.vue`); "Nos hambúrgueres"; "Nas sobremesas".
- **Componentes:** 2 × `FlParedePalavras`.
- **Interação e estados:** nenhuma interação; é informação. Os adicionais se escolhem no modal real, a partir do "Adicionar" de cada produto. Nenhum preenchimento colorido: nada aqui se clica.
- **Acessibilidade:** seção rotulada pelo `h2`; cada grupo com `h3` e `<ul role="list">`; cada item lido como "Bacon R$ 3,50" (nome e preço no mesmo `li`). O `h2` recebe o foco quando o ladrilho Adicionais é usado.
- **Comportamento:**
  - **1440:** `h2` e apoio; abaixo, os dois grupos lado a lado (`grid-template-columns: 5fr 7fr`, `gap: var(--space-7)`), cada `ul` com `grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr))` e `gap: var(--space-5) var(--space-6)`. Palavra em `--flat-palavra` (300, caixa baixa visual, `line-height: var(--leading-tight)`), preço em 1rem, 600, `tabular`, logo abaixo.
  - **1024:** igual (colunas de `minmax(10rem, 1fr)`).
  - **390:** grupos empilhados; `ul` em 2 colunas; palavra em 400. "Cebola caramelizada" e "Calda de chocolate" quebram em 2 linhas.
- **Movimento:** nenhum.
- **Cardápio editado:** grupo com lista vazia não aparece; com os dois vazios, a seção mostra só o `h2` e `TEXTOS.cardapio.vazio` (a seção não some, para a ordem do JSON valer sempre). Nome e preço trocados aparecem como estão.

### 4.4 `loja`: horário e contato (nova)

- **Arquivo:** `secoes/FlSecaoLoja.vue`. Raiz `<section data-secao="loja" aria-labelledby="fl-loja-titulo">`.
- **Objetivo:** dizer quando abre e como chegar ou falar com a casa, com links reais [H29][H26][H32][H33]. É o "ladrilho de informações" do dossiê em versão quieta: o horário em texto absoluto, como pede a diretriz do ladrilho [F28], e os links em linha.
- **Conteúdo real:**

  | Campo | Origem |
  |---|---|
  | `h2#fl-loja-titulo` (`tabindex="-1"`) | `textos.js` → `TEXTOS.loja.titulo` (provisório) |
  | Linha do horário | `dados.js` → `HORARIO` |
  | Endereço (Google Maps, nova aba), WhatsApp (`wa.me`, nova aba) e e-mail (`mailto:`) | `dados.js` → `CONTATOS` (`chave`, `texto`, `href`, `externo`, `icone`) |
  | Aviso de nova aba | `dados.js` → `NOVA_ABA` |

- **Textos provisórios:** "Horário e contato".
- **Componentes:** 3 × `FlLinkContato`, numa `<ul role="list">`.
- **Interação e estados:** os três são links (`<a>`), cada um uma linha inteira clicável; estados na seção 5. Nenhum "aberto agora": não há dado de feriado, e o horário passa da meia-noite [H31].
- **Acessibilidade:** seção rotulada pelo `h2`, que recebe o foco quando o ladrilho Horário é usado. Os externos levam `target="_blank"`, `rel="noopener noreferrer"` e o `NOVA_ABA` num `span.visually-hidden` [H34]. Ícones com `aria-hidden="true"`. A linha do horário é um `<p>`.
- **Comportamento:**
  - **1440:** `h2` em cima; abaixo, duas colunas (`grid-template-columns: 5fr 7fr`, `gap: var(--space-7)`): à esquerda o `HORARIO` em `--flat-horario` (300, caixa baixa visual, `max-width: 14ch`), à direita a lista de links (`gap: var(--space-3)`).
  - **1024:** igual.
  - **390:** empilhado: horário (400) e a lista.
- **Movimento:** nenhum além do hover (cor, `--dur-fast`).
- **Cardápio editado:** não depende do cardápio.

### 4.5 Topo e rodapé (fora das seções)

**Topo (`FlTopo`, slot `#topo`):**
- `<header class="fl-topo">`, `position: sticky; top: 0; z-index: var(--z-navbar)`, fundo `--flat-tinta`, texto `--flat-papel`, `--color-focus: var(--flat-cheddar)` dentro dele. É a faixa forte no topo que se lê como navegação [F1]; opaca e baixa [H17].
- Marca: `RouterLink` para `/direcoes/flat` com `MARCA` (1.5rem, 600, caixa baixa visual; 1.25rem abaixo de `md`).
- `<nav aria-label="Principal">` com `<ul role="list">` dos links de `useLinksPrincipais("/direcoes/flat")` (Início, Cardápio, Entrar ou Perfil), em 1.125rem, 400, caixa baixa visual. Início com `aria-current="page"` (o do `RouterLink`).
- Carrinho: `FlCarrinho`, no canto superior direito [H35].
- **≥ md:** uma linha de 4.5rem: marca à esquerda, nav e carrinho à direita.
- **< md:** duas linhas, sem menu escondido [H14]: marca e carrinho na primeira (3.25rem), os três links na segunda (2.75rem, alvos de 44 px). Altura total no token `--flat-topo-altura`.
- Sem botão de menu: o contrato só exige `aria-controls` e `aria-expanded` se houver um.

**Rodapé (`FlRodape`, slot `#rodape`):**
- `<footer class="fl-rodape">`, fundo `--flat-tinta`, texto `--flat-papel`, `--color-focus: var(--flat-cheddar)`.
- `MARCA` (1.75rem, 300, caixa baixa visual), `DESCRICAO` (`max-width: 38ch`) e `RODAPE.copyright` abaixo de uma linha de 1 px em `--flat-tinta-suave`.
- Sem as redes (`REDES` aponta para as páginas genéricas do Facebook e do Instagram [H25][H26]) e sem repetir a navegação (seção 2, item 5). O contato fica na seção `loja`, logo acima.
- **1440 e 1024:** marca e descrição em duas colunas (`1fr 2fr`); copyright embaixo. **390:** empilhado.

## 5. Inventário de componentes (10, fora as seções)

Todos em `componentes/`, com `<script setup>`, `defineProps` com tipo e padrão, `defineEmits` declarado e a parcial em `scss/_<nome>.scss` com `@use` no próprio `<style scoped lang="scss">`. O anel de foco de todos é `outline: var(--focus-width) solid var(--color-focus); outline-offset: var(--focus-offset)` em `:focus-visible` (mixin `fl-foco` em `scss/_base.scss`).

### 5.1 `FlLadrilho`

- **Papel:** o ladrilho da tela inicial: um `<button type="button">` inteiro, chapado, com contagem, meio (ícone ou imagem) e nome [F28][F37][F55].
- **Props:**
  - `destino: { type: String, required: true }` (vai em `data-destino` e no emit);
  - `rotulo: { type: String, required: true }` (nome visível);
  - `rotuloAcessivel: { type: String, required: true }` (`aria-label`);
  - `cor: { type: String, default: "cebola" }` (`cheddar`, `cebola`, `alface` ou `tinta`; vira a classe `fl-ladrilho--<cor>`);
  - `contagem: { type: String, default: "" }`;
  - `detalhe: { type: String, default: "" }`;
  - `icone: { type: [Array, Object], default: null }`;
  - `imagem: { type: Object, default: null }` (`{ src, srcset, sizes, largura, altura }`);
  - `prioritaria: { type: Boolean, default: false }` (`loading="eager"` e `fetchpriority="high"`; senão `lazy`);
  - `ordem: { type: Number, default: 0 }` (vira `--fl-ordem` para a entrada).
- **Slots:** nenhum. **Emits:** `ativar` (com o `destino`).
- **Estados:**

  | Estado | cheddar | cebola | alface | tinta |
  |---|---|---|---|---|
  | padrão | fundo `--flat-cheddar`, texto `--flat-tinta` | `--flat-cebola` / `--flat-papel` | `--flat-alface` / `--flat-papel` | `--flat-tinta` / `--flat-papel` |
  | hover (`hover-capable`) | `--flat-cheddar-escuro` | `--flat-cebola-escura` | `--flat-alface-escura` | `--flat-preto-hover` |
  | foco | anel tinta fora do ladrilho, sobre o papel | idem | idem | idem |
  | pressionado (`:active`) | `--flat-cheddar-pressionado`; `scale(0.97)` em `--dur-instant` só no `motion-ok` | `--flat-cebola-pressionada` | `--flat-alface-pressionada` | `--flat-tinta-suave` |
  | imagem carregando | o meio fica no fundo do ladrilho; sem salto (`width` e `height`) | | | |
  | imagem que falha | o meio fica vazio (`@error` esconde o `img`) | | | |

  Transição de cor: `transition: background-color var(--dur-fast)`. Sem selecionado, desabilitado nem carregando.
- **Forced colors:** `border: 2px solid ButtonText`, para o ladrilho não sumir sem o fundo. **`prefers-contrast: more`:** `border: 2px solid var(--flat-tinta)`.
- **Tokens:** `--flat-cheddar`, `--flat-cheddar-escuro`, `--flat-cheddar-pressionado`, `--flat-cebola`, `--flat-cebola-escura`, `--flat-cebola-pressionada`, `--flat-alface`, `--flat-alface-escura`, `--flat-alface-pressionada`, `--flat-tinta`, `--flat-preto-hover`, `--flat-tinta-suave`, `--flat-papel`, `--flat-fonte`, `--space-3`, `--space-4`, `--space-6`, `--dur-fast`, `--dur-instant`, `--dur-slow`, `--dur-stagger`, `--ease-out`, `--focus-width`, `--focus-offset`, `--color-focus`.
- **Referência:** [F28] (porta de entrada, tamanhos, área de contagem, alvo inteiro), [F37] (ação primária ocupando o ladrilho), [F55] e [F57] (ladrilhos na web), [F32] (tela Iniciar do Windows 8), [F1] (fundo chapado sugere botão), galeria nº 1 (Aldis Burger, publicado: produto recortado pousado em bloco de cor lisa).

### 5.2 `FlBotao`

- **Papel:** o botão principal flat 2.0, preenchido, com canto de 4 px [F3][F5]. Um `RouterLink` (navega para outra tela). Usado em "Ver cardápio".
- **Props:** `para: { type: [String, Object], required: true }`. **Slots:** `default` (o texto). **Emits:** nenhum.
- **Estados:** padrão (`--flat-cebola`, texto `--flat-papel`, 600, 1.125rem, `min-height: 3.25rem`, `padding-inline: var(--space-6)`, `border-radius: var(--flat-raio-botao)`); hover (`--flat-cebola-escura`) [F41]; foco (anel tinta sobre o papel); pressionado (`--flat-cebola-pressionada` e `scale(0.97)` no `motion-ok`). Sem desabilitado [F40].
- **Forced colors:** `border: 2px solid ButtonText`.
- **Tokens:** `--flat-cebola`, `--flat-cebola-escura`, `--flat-cebola-pressionada`, `--flat-papel`, `--flat-raio-botao`, `--space-6`, `--dur-fast`, `--dur-instant`.
- **Referência:** [F3] (botão com cara de botão, nada de fantasma), [F5] (retângulo de canto arredondado), [F41] e [F40] (GOV.UK, publicado: hover mais escuro, sem desabilitado).

### 5.3 `FlPivot`

- **Papel:** o pivot do Metro no padrão de abas da APG [F27][F46].
- **Props:** `abas: { type: Array, required: true }` (`{ chave, rotulo }`); `modelValue: { type: String, required: true }`; `idTitulo: { type: String, required: true }` (o `aria-labelledby` da lista de abas).
- **Slots:** `painel` com escopo `{ aba }` (o conteúdo de cada página). **Emits:** `update:modelValue`.
- **Lógica:** `usePivotTeclado` (seção 7) e o `sentido` da troca (avanço ou recuo) para a transição.
- **Estados da aba:**

  | Estado | Aparência |
  |---|---|
  | padrão | `--flat-tinta-suave`, `--flat-titulo-pivot`, 300 (400 abaixo de `md`), caixa baixa visual, `min-height: var(--target-min)` |
  | hover (`hover-capable`) | `--flat-tinta` |
  | foco | anel tinta (o `tabindex` móvel deixa só a aba ativa na ordem do Tab) |
  | pressionado | `--flat-tinta` |
  | selecionado (`aria-selected="true"`) | `--flat-tinta` e sublinhado de 4 px em `--flat-cebola`, `text-underline-offset: 8px` |
  | página vazia | a aba continua; o painel mostra o texto de vazio |

- **Forced colors:** a aba selecionada troca o sublinhado para `Highlight`.
- **Tokens:** `--flat-tinta`, `--flat-tinta-suave`, `--flat-cebola`, `--flat-sublinhado`, `--flat-titulo-pivot`, `--target-min`, `--space-6`, `--dur-base`, `--dur-fast`, `--ease-out`.
- **Referência:** [F27] (cabeçalho de uma ou duas palavras, até quatro páginas, página vazia com texto), [F25] (Music + Videos e Facebook, publicados na época), [F46] (APG), [F17] (seleção além da cor).

### 5.4 `FlLinhaProduto`

- **Papel:** uma linha da lista do pivot: foto quadrada, nome, descrição, preço e "Adicionar" [F26][F36][H20].
- **Props:** `produto: { type: Object, required: true }`; `icone: { type: [Array, Object], default: () => ["fas", "burger"] }` (a reserva quando a foto falha; a seção passa o ícone da categoria).
- **Slots:** nenhum. **Emits:** nenhum (chama `usePersonalizar()` direto).
- **Lógica:** `useCartaoProduto(() => props.produto, { sizes: "(min-width: 1024px) 128px, 88px" })` e `usePersonalizar()`.
- **Marcação:** `<li class="fl-linha">` → `div.fl-linha__foto` (`<picture>` com `<source v-if="cartao.imagem.srcset" type="image/webp">` e `<img :alt="produto.name" width="960" height="720" loading="lazy" decoding="async" @error="cartao.aoFalharImagem">`, ou a reserva) → `div.fl-linha__corpo` (`h3` com o nome, `p` com a descrição, e `div.fl-linha__acao` com o preço em `p.tabular` e o `FlBotaoAdicionar`).
- **Estados:** padrão; foto carregando (quadrado em `--flat-ladrilho-escuro`, mesmo tamanho); foto que falha (o ícone da categoria em `--flat-tinta-suave`, 2rem, centrado); imagem `data:` (só `src`); nome longo (até 2 linhas); descrição (corte em 2 linhas com `line-clamp`); "Adicionado" (o do botão). **Sem hover na linha**: só o botão reage.
- **Medidas:** foto `--flat-foto-linha` (≈ 88 px) abaixo de `lg` e `--flat-foto-linha-lg` (≈ 128 px) a partir de `lg`, `object-fit: cover`; `grid-template-columns: <foto> 1fr`, `gap: var(--space-4)` (`--space-5` a partir de `lg`); nome 1.25rem, 600; descrição 0.9375rem, `--flat-tinta-suave`; preço 1.25rem, 600; ação com `justify-content: space-between`.
- **Tokens:** `--flat-tinta`, `--flat-tinta-suave`, `--flat-ladrilho-escuro`, `--flat-foto-linha`, `--flat-foto-linha-lg`, `--space-4`, `--space-5`.
- **Referência:** [F26] (People Hub: lista vertical de itens), [F36] (card dispensável em conteúdo homogêneo), [F51] (agrupar sem linha nem caixa), [H20] (nome, foto reconhecível e preço na listagem).

### 5.5 `FlBotaoAdicionar`

- **Papel:** o "Adicionar" com a troca de face chapada (cebola para alface com o check), herdada da v1.
- **Props:** `adicionado: { type: Boolean, default: false }`. Os atributos `aria-label` e `data-adicionado` chegam por `v-bind="cartao.atributosAdicionar"` e caem no `<button>` raiz (`inheritAttrs` padrão).
- **Slots:** nenhum. **Emits:** `ativar` (a linha chama `personalizar(produto, cartao.contexto)`).
- **Estados:**

  | Estado | Aparência |
  |---|---|
  | padrão | face "Adicionar" em `--flat-cebola`, texto `--flat-papel`, 600, `height: 3rem`, `border-radius: var(--flat-raio-botao)` |
  | hover | `--flat-cebola-escura` |
  | foco | anel tinta sobre o papel |
  | pressionado | `--flat-cebola-pressionada` e `scale(0.97)` no `motion-ok` |
  | adicionado (`data-adicionado="true"`, de `--dur-base` + `--dur-hold`) | face de trás em `--flat-alface`, check e "Adicionado" (`aria-hidden`; o anúncio é o do modal) |

- **Movimento:** no `motion-ok`, o trilho das duas faces sobe 50% em `--dur-base` e `--ease-out`. **Reduzido:** as duas faces no mesmo lugar, trocadas por `opacity` em `--dur-fast`.
- **Forced colors:** `border: 2px solid ButtonText`.
- **Tokens:** `--flat-cebola`, `--flat-cebola-escura`, `--flat-cebola-pressionada`, `--flat-alface`, `--flat-papel`, `--flat-raio-botao`, `--dur-base`, `--dur-fast`, `--dur-instant`, `--ease-out`.
- **Referência:** [F1] e [F4] (verbo e retorno imediato, rodada 1), [F3] (botão preenchido).

### 5.6 `FlParedePalavras`

- **Papel:** um grupo de adicionais como parede de palavras: nome grande e leve, preço pequeno e pesado [F51][F7].
- **Props:** `titulo: { type: String, required: true }`; `idTitulo: { type: String, required: true }`; `itens: { type: Array, required: true }` (`{ id, name, price }`).
- **Slots:** nenhum. **Emits:** nenhum.
- **Marcação:** `<div class="fl-parede">` → `<h3 :id="idTitulo">` (1.125rem, 600, caixa baixa visual) → `<ul role="list" :aria-labelledby="idTitulo">` → `<li>` com `span.fl-parede__nome` e `span.fl-parede__preco.tabular` (`formatPrice(item.price)`).
- **Estados:** só o padrão (informação, sem alvo). A seção não monta o componente com `itens` vazio.
- **Tokens:** `--flat-tinta`, `--flat-palavra`, `--leading-tight`, `--space-5`, `--space-6`.
- **Referência:** [F51] (título enorme e fino sobre texto pequeno de peso médio; agrupar sem linha), [F7] ("type is information"), galeria nº 7 (experimento Metro, conceito: hierarquia só por tamanho e tom).

### 5.7 `FlLinkContato`

- **Papel:** um contato da loja como linha clicável: um quadrado chapado com o ícone e o texto sublinhado [F1][F17].
- **Props:** `contato: { type: Object, required: true }` (um item de `CONTATOS`). **Slots:** nenhum. **Emits:** nenhum.
- **Marcação:** `<a :href :target :rel class="fl-contato">` → `span.fl-contato__quadrado` (2.75rem, `--flat-cebola`, ícone `--flat-papel`) → `span.fl-contato__texto` (sublinhado de 1 px, `text-underline-offset: 4px`) e, se externo, `span.visually-hidden` com `NOVA_ABA` (importado de `dados.js`).
- **Estados:** padrão; hover (quadrado `--flat-cebola-escura`, sublinhado de 2 px); foco (anel tinta em volta da linha); pressionado (quadrado `--flat-cebola-pressionada`). `min-height: 3.25rem`.
- **Forced colors:** quadrado com `border: 2px solid LinkText`.
- **Tokens:** `--flat-cebola`, `--flat-cebola-escura`, `--flat-cebola-pressionada`, `--flat-papel`, `--flat-tinta`, `--space-3`, `--dur-fast`.
- **Referência:** [F1] (fundo chapado marca o clicável), [F17] (link não só por cor), [F3] (texto e link nunca com o mesmo tratamento), [H32][H33][H34].

### 5.8 `FlTopo`

- **Papel:** o `<header>` em faixa preta, com marca, navegação principal e carrinho (seção 4.5).
- **Props:** `inicio: { type: String, required: true }`. **Slots:** nenhum. **Emits:** nenhum.
- **Estados dos links:** padrão (`--flat-papel`); hover (`--flat-cheddar`, texto); foco (anel cheddar sobre a tinta); atual (`aria-current="page"`: sublinhado de 4 px em `--flat-cheddar`, offset 8 px [F1][F17]).
- **Tokens:** `--flat-tinta`, `--flat-papel`, `--flat-cheddar`, `--flat-sublinhado`, `--flat-topo-altura`, `--flat-topo-altura-md`, `--z-navbar`, `--target-min`, `--space-5`.
- **Referência:** [F1] (faixa forte no topo), [H14] (links visíveis), [H17] (fixo, opaco e baixo), [H35] (carrinho no canto superior direito).

### 5.9 `FlCarrinho`

- **Papel:** o link para `/cart` com o selo quadrado em cheddar e os dígitos que rolam (lógica da v1).
- **Props:** nenhuma (usa `useContadorCarrinho()`). **Slots:** nenhum. **Emits:** nenhum.
- **Acessibilidade:** `aria-label="rotulo"` (casa com `^Carrinho,? (vazio|\d+ itens?)$`); ícone e selo com `aria-hidden="true"`; alvo de 3rem.
- **Estados:** vazio (só o ícone); com itens (selo `--flat-cheddar`, dígitos `--flat-tinta`, 700, `tabular`); a contagem muda (cada dígito sobe ou desce por `translateY` em `--dur-base` no `motion-ok`; reduzido: `opacity` em `--dur-fast`); hover (ícone `--flat-cheddar`); foco (anel cheddar).
- **Tokens:** `--flat-cheddar`, `--flat-tinta`, `--flat-papel`, `--dur-base`, `--dur-fast`, `--ease-out`.
- **Referência:** [F28] (área de contagem), [H35].

### 5.10 `FlRodape`

- **Papel:** o `<footer>` em faixa preta (seção 4.5).
- **Props:** nenhuma. **Slots:** nenhum. **Emits:** nenhum.
- **Estados:** sem alvos (nenhum link no rodapé).
- **Tokens:** `--flat-tinta`, `--flat-papel`, `--flat-tinta-suave`, `--space-5`, `--space-6`, `--space-7`.
- **Referência:** [H30] (rodapé que não se esconde), [H25][H26] (nada de link genérico).

### Matriz resumida

| Componente | padrão | hover | foco | pressionado | selecionado | desabilitado | carregando |
|---|---|---|---|---|---|---|---|
| `FlLadrilho` | sim | sim | sim | sim | não | não | só a imagem |
| `FlBotao` | sim | sim | sim | sim | não | não (evitado [F40]) | não |
| `FlPivot` (aba) | sim | sim | sim | sim | sim (`aria-selected`) | não | não |
| `FlLinhaProduto` | sim | não | no botão | no botão | não | não | só a foto |
| `FlBotaoAdicionar` | sim | sim | sim | sim | "adicionado" | não | não |
| `FlParedePalavras` | sim | não | não | não | não | não | não |
| `FlLinkContato` | sim | sim | sim | sim | não | não | não |
| `FlTopo` (links) | sim | sim | sim | não | atual (`aria-current`) | não | não |
| `FlCarrinho` | sim | sim | sim | não | não | não | não |
| `FlRodape` | sim | não | não | não | não | não | não |

## 6. Movimento e acessibilidade (resumo)

**Movimento.** Só `transform` e `opacity`; todo `transform` e toda duração acima de `--dur-fast` dentro de `@include motion-ok { … }`.

| Onde | `motion-ok` | Reduzido |
|---|---|---|
| Entrada do mosaico (único momento não disparado pela pessoa) | ladrilhos 2 a 5 entram da direita, `--dur-slow`, escalonados | nenhum |
| Hover de ladrilho, botão, aba e link | cor em `--dur-fast` | igual (só cor) |
| Pressionar ladrilho e botões | `scale(0.97)` em `--dur-instant` + cor | só a cor |
| Troca de página do pivot | deslize de `--space-6` + `opacity`, `--dur-base` | `opacity` em `--dur-fast` |
| "Adicionado" | trilho sobe, `--dur-base` | troca por `opacity`, `--dur-fast` |
| Contador do carrinho | dígito sobe ou desce, `--dur-base` | `opacity`, `--dur-fast` |
| Rolagem do `irPara` | `behavior: "smooth"` | `behavior: "auto"` |

Nada de autoplay, ladrilho vivo, paralaxe nem rolagem lateral [F21][F24][F44][F33].

**Acessibilidade.**
- Landmarks: `header` (com a `nav` "Principal"), `main` (da moldura), 4 `section` rotuladas, `footer`.
- Títulos: `h1` (início) → `h2` (cardápio, adicionais, loja) → `h3` (produtos e grupos de adicionais).
- Alvos: ladrilhos muito acima de 44 px; botões de 3rem ou mais; abas e links de 44 px ou mais.
- Foco: anel de 3 px com offset de 2 px; tinta no papel, cheddar na faixa preta (3:1 nos dois [F15]).
- `scroll-margin-top: var(--flat-topo-altura)` (`--flat-topo-altura-md` a partir de `md`) nas quatro seções, para o `irPara` e o `scrollIntoView` não deixarem o título embaixo da faixa fixa.
- Contraste: pares na seção 7. Nenhum texto sobre foto.
- Forced colors e `prefers-contrast: more`: bordas nos ladrilhos e botões (o flat separa por bloco de cor, que some no modo de alto contraste).

## 7. Tokens, pares, lógica e dependências

### Tokens novos (em `_tokens.scss`, prefixo `--flat-`; os valores ficam para o construtor)

| Token | Papel |
|---|---|
| `--flat-cheddar-escuro` | hover dos ladrilhos cheddar (Hambúrgueres e Horário), com texto tinta |
| `--flat-cheddar-pressionado` | ladrilho cheddar pressionado |
| `--flat-alface-escura` | hover do ladrilho Sobremesas, com texto papel |
| `--flat-alface-pressionada` | ladrilho alface pressionado |
| `--flat-junta` | junta entre ladrilhos (8 px, a mesma da v1) |
| `--flat-celula` | altura da célula do mosaico abaixo de `lg` (um `clamp` perto da largura da coluna em 390) |
| `--flat-topo-altura` | altura da faixa do topo abaixo de `md` (duas linhas), para o `scroll-margin-top` |
| `--flat-topo-altura-md` | altura da faixa do topo a partir de `md` |
| `--flat-titulo-secao` | tamanho dos `h2` (o `clamp` que a v1 tinha solto no "mais pedidos") |
| `--flat-titulo-pivot` | tamanho dos cabeçalhos do pivot |
| `--flat-palavra` | tamanho das palavras dos adicionais |
| `--flat-horario` | tamanho da linha do horário na seção `loja` |
| `--flat-foto-linha` | lado da foto da linha de produto abaixo de `lg` |
| `--flat-foto-linha-lg` | lado da foto da linha de produto a partir de `lg` |

Ficam sem uso e podem sair: `--flat-lilas` (o botão claro da v1) e `--flat-cinza` (a paginação), se nenhum outro arquivo da pasta os usar.

### Pares de contraste novos (para `contraste.js`)

| Frente | Fundo | Mínimo | Onde |
|---|---|---|---|
| `flat-tinta` | `flat-cheddar-escuro` | 4,5 | texto do ladrilho cheddar no hover |
| `flat-tinta` | `flat-cheddar-pressionado` | 4,5 | texto do ladrilho cheddar pressionado |
| `flat-papel` | `flat-alface-escura` | 4,5 | texto do ladrilho Sobremesas no hover |
| `flat-papel` | `flat-alface-pressionada` | 4,5 | texto do ladrilho Sobremesas pressionado |
| `flat-papel` | `flat-cebola-escura` | 4,5 | hover do ladrilho Bebidas, do "Ver cardápio", do "Adicionar" e do quadrado de contato |
| `flat-papel` | `flat-cebola-pressionada` | 4,5 | pressionado dos mesmos |
| `flat-papel` | `flat-preto-hover` | 4,5 | hover do ladrilho Adicionais |
| `flat-papel` | `flat-tinta-suave` | 4,5 | ladrilho Adicionais pressionado |
| `flat-cheddar` | `flat-tinta` | 4,5 | link do topo no hover (texto) |
| `flat-cheddar` | `flat-tinta` | 3 | sublinhado do link atual e anel de foco no topo e no rodapé |
| `flat-tinta-suave` | `flat-papel` | 4,5 | abas não selecionadas, descrição do produto |

Mudam só o "onde" (os pares já existem): `flat-tinta` sobre `flat-cheddar` (nome e contagem dos ladrilhos cheddar), `flat-papel` sobre `flat-cebola` (ladrilho Bebidas, botões, ícone do contato), `flat-papel` sobre `flat-alface` (ladrilho Sobremesas e "Adicionado"), `flat-papel` sobre `flat-tinta` (faixa do topo, ladrilho Adicionais, rodapé), `flat-cebola` sobre `flat-papel` (sublinhado da aba selecionada). Saem, se o construtor confirmar que ficaram sem uso: `flat-cinza`/`flat-papel` (paginação), `flat-cheddar`/`flat-cebola` (foco no ladrilho roxo) e `flat-cebola`/`flat-lilas` (botão claro).

### Lógica necessária (na pasta do estilo)

| Nome | O que faz | Outro estilo poderia usar? |
|---|---|---|
| `useHub.js` (`provideHub()` e `useHub()`) | A `HomeFlat` chama `provideHub()` (`provide` de `{ abaAtiva, irPara }`; `abaAtiva` começa em `"foods"`). `irPara(destino)`: se for uma `chave` de `CATEGORIAS`, muda `abaAtiva`, espera o `nextTick` e usa a seção `[data-secao="cardapio"]` como alvo e `#fl-aba-<chave>` como foco; se for `adicionais` ou `loja`, a seção e o `h2` dela. Rola com `alvo.scrollIntoView({ block: "start", behavior })`, com `behavior` `"auto"` quando `matchMedia("(prefers-reduced-motion: reduce)")` casa e `"smooth"` fora disso, e põe o foco com `focus({ preventScroll: true })`. `useHub()` lança erro fora da `HomeFlat`, como o `usePersonalizar` | Não: amarra o mosaico ao pivot do flat |
| `usePivotTeclado.js` | Teclado das abas da APG: setas com volta, Home, End, ativação automática, tabindex móvel e o `sentido` da última troca | Sim (qualquer abas da APG); fica aqui até a fase 3 |
| `useResumoCategorias.js` | A partir do `useProductsStore()` e de `CATEGORIAS`: `[{ chave, rotulo, quantidade }]` e o total de adicionais, em `computed` | Sim (contagem por categoria é um derivado comum); fica aqui até a fase 3 |

### Dependências novas

Nenhuma. Os ícones novos (`faGlassWater`, `faIceCream`, `faClock`) vêm do `@fortawesome/free-solid-svg-icons` 6.7.2 já instalado e são importados na `FlSecaoInicio`, sem mexer no `src/plugins/fontawesome.js`.

### `textos.js`

```js
export const TEXTOS = {
  cardapio: {
    titulo: "Cardápio", // rótulo real do link (useLinksPrincipais.js)
    vazio: "Nada nesta categoria por enquanto", // título real do EmptyState (src/views/MenuView.vue)
  },
  adicionais: {
    titulo: "Adicionais", // título real da seção do modal (src/components/ModalAdditional.vue)
    texto: "Os adicionais aparecem quando você adiciona um hambúrguer ou uma sobremesa.", // provisório
    hamburgueres: "Nos hambúrgueres", // provisório
    sobremesas: "Nas sobremesas", // provisório
  },
  loja: {
    titulo: "Horário e contato", // provisório
  },
};
```

## 8. Arquivos para o construtor

```
src/direcoes/estilos/flat/
  HomeFlat.vue                fonte, tokens, useEstiloAtivo("flat", { esquema: "light" }), provideHub(),
                              MolduraDirecao com FlTopo (#topo), as 4 seções e FlRodape (#rodape); layout .moldura
  _tokens.scss · ficha.js · contraste.js · textos.js
  useHub.js · usePivotTeclado.js · useResumoCategorias.js
  secoes/FlSecaoInicio.vue · FlSecaoCardapio.vue · FlSecaoAdicionais.vue · FlSecaoLoja.vue
  componentes/FlLadrilho.vue · FlBotao.vue · FlPivot.vue · FlLinhaProduto.vue · FlBotaoAdicionar.vue
              FlParedePalavras.vue · FlLinkContato.vue · FlTopo.vue · FlCarrinho.vue · FlRodape.vue
  scss/_base.scss (mixins fl-foco, fl-titulo-leve, fl-forced) e uma parcial por componente e seção
  __tests__/HomeFlat.test.js  um h1; botões "Adicionar <nome>"; monta com o cardápio vazio
                              (ladrilhos com "0 itens" e o texto de vazio no pivot)
```

O `_home.scss` e o carrossel da v1 saem (o `vue3-carousel` deixa de ser importado por esta Home).

## 9. Referências usadas

| Ref. | Publicado ou conceito | Padrão abstraído | Onde entra |
|---|---|---|---|
| [F28] Tile design guidelines (Microsoft, WP8) | autor do estilo; sistema publicado na época | ladrilho como porta de entrada, poucos tamanhos, área de contagem, alvo inteiro, data absoluta, sem cor berrante | `FlLadrilho`, contagem, horário em texto |
| [F32] Windows 8 (NN/g) | publicado na época | tela Iniciar de ladrilhos chapados; ladrilhos de informação úteis, mas animação demais | mosaico estático |
| [F55] Metro UI e [F57] Bulma tiles | publicado (biblioteca e post) | ladrilhos 1:1 e 2:1 numa grade web; os efeitos automáticos do Metro UI ficam de fora | proporções do mosaico |
| [F37] Grid lists (Material v1) | conceito (especificação) | a ação primária ocupa o ladrilho inteiro | ladrilho = um botão |
| [F25] Hub com menu (Music + Videos, Facebook) | publicado na época | painel inicial como menu das áreas, com os resumos ao lado | ladrilhos levam às seções da página |
| [F31] e [F30] Hub, seção e detalhe | autor do estilo | o hub mostra o alcance com uma amostra por seção; abaixo de 500 px, seções na vertical | ordem da página, tudo empilhado na vertical |
| [F27] Pivot e [F46] APG Tabs | autor do estilo e referência técnica | cabeçalhos de uma ou duas palavras, até quatro páginas, página vazia com texto; teclado da APG | `FlPivot` |
| [F26] People Hub | publicado na época | lista vertical de itens que levam ao detalhe | `FlLinhaProduto` |
| [F7] Metro (Kruzeniski) e [F51] Flat and thin | autor do estilo e praticante | tipografia é informação; título grande e fino sobre texto pequeno e médio; agrupar sem linha | `h1`, abas, `FlParedePalavras` |
| [F1], [F5] e [F3] (NN/g) | pesquisa; exemplos publicados (Trader Joe's, Apple) | fundo chapado sugere botão, faixa no topo é navegação, título não leva fundo colorido, flat 2.0 | regra "cor só no que se clica", faixa preta |
| [F41] e [F40] GOV.UK Button | publicado | botão chapado com hover mais escuro e sem desabilitado | `FlBotao`, `FlBotaoAdicionar` |
| [F23], [F33], [F56] e [F34] | pesquisa e praticante | pontos e rolagem lateral são sinais fracos; o próximo conteúdo aparece acima da dobra | sem carrossel; mosaico termina antes da dobra |
| [F21], [F24] e [F44] | referência técnica e autor do estilo | nada que se atualize sozinho; paralaxe desligável | sem ladrilho vivo nem paralaxe |
| [F48] Optimize LCP | referência técnica | imagem do LCP sem lazy e com `fetchpriority` | imagem do ladrilho Hambúrgueres |
| Galeria nº 1, Aldis Burger (Behance) | publicado (identidade de marca) | blocos de cor chapada lado a lado; produto recortado sobre fundo liso; paleta tirada da comida | o recorte no ladrilho cheddar |
| Galeria nº 7, experimento Metro (Dribbble) | conceito | tipo fino e grande alinhado à esquerda, cantos retos, sem sombra, hierarquia por tamanho e tom | títulos e abas |
| Galeria nº 4, Japo restaurant (One Page Love) | publicado (2019, hoje fora do ar) | fundo branco, blocos chapados atrás do conteúdo, nada de sombra | papel branco e blocos só nos alvos |
| [H14], [H17], [H35] | pesquisa | links visíveis, cabeçalho fixo opaco e baixo, carrinho no canto superior direito | `FlTopo`, `FlCarrinho` |
| [H20], [H21], [H22], [H24] | pesquisa | preço na listagem; mostrar a variedade; adicionais antes do pedido | pivot, mosaico e `adicionais` |
| [H25], [H26], [H29], [H31], [H32], [H33], [H34] | pesquisa e documentação | contato real e verificável, sem link genérico; nada de "aberto agora" sem dado | `loja` e rodapé |
