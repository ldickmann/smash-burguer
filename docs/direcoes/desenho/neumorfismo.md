# Desenho da Home: Neumorfismo, rodada 2 ("Kraft prensado")

Desenho de 21/11/2026 para a Home nova de `#/direcoes/neumorfismo`. O construtor deve conseguir montar a página só com este arquivo e o `neumorfismo.json` ao lado, que é o que o portão P6 lê.

- **Fontes do estilo:** o dossiê `docs/direcoes/pesquisa/neumorfismo.md` ([N11] a [N56]) e a seção "Neumorfismo" de `docs/direcoes/PESQUISA.md` ([N1] a [N10]).
- **Fontes de Home de delivery:** `docs/direcoes/pesquisa/home-delivery.md` ([H1] a [H45]).
- **Galerias:** a coleta no Chrome de 20/11/2026, com os exemplos G1 a G7, todos conceito (endereços na seção 11).
- **Conteúdo:** só `src/json/products.json` (lido pela `useProductsStore`, que inclui o cardápio editado no painel), `src/direcoes/compartilhado/dados.js` e textos que o app já tem.
- **Identidade:** a ficha (`ficha.js`) e os tokens (`_tokens.scss`) da rodada 1 continuam valendo. Nada aqui muda paleta, fonte ou tese; não há desvio novo a registrar.

---

## 1. Tese

**Mantida, com um ajuste de composição.** A tese da ficha continua inteira. A interface é extrudada do kraft das embalagens de delivery, com a luz no canto superior esquerdo. O que se aperta afunda, como no smash. Os controles levam borda e cor sólida, e a fonte é a Nunito.

O ajuste ataca o defeito documentado do estilo: o clicável se parece com o não clicável, e por isso o neumorfismo não chegou ao mainstream [N13]. Tudo do mesmo material faz parecer que tudo é botão [N31], e o usuário não distingue repouso, pressionado e ativo [N32]. Por isso, nesta Home, o relevo vira gramática, com cinco regras que valem para a página inteira:

| Camada | O que é na Home | Forma | Fonte |
|---|---|---|---|
| Relevo sem borda | Contêiner estático: o painel e a barra do topo | Duas sombras (clara em cima e à esquerda, escura embaixo e à direita) | [N11][N30][N31][N32] |
| Poço | Leitura: foto, preço, horário e a cova do hero | Sombra interna, sem borda | P3: [N45][N47][N48] |
| Relevo com borda | Controle secundário: teclas do painel, contatos e carrinho | Convexo, borda de 1 px com 3:1 | [N16][N41][N51] |
| Cor chapada | Ação: "Ver cardápio" e "Adicionar <nome>" | Ketchup sólido e plano, sem relevo, que só afunda ao apertar | [N31][N37][N38], G1, G2 |
| Selecionado | Estado | Afunda, perde o convexo e ganha borda de 2 px em tinta e ícone de check | P4: [N11][N35][N49][N51] |

Corolário: sombras grandes ficam em poucos contêineres [N37], e cada região tem um grupo de controles só [N36]. Só a barra do topo e o painel são elevados; o resto é prensado no próprio kraft da página.

### O que mudou da rodada 1

A v1 tinha a barra, um hero com o lanche num prato circular elevado, o carrossel "Mais pedidos" com 7 cartões elevados e um rodapé num painel afundado.

- **Carrossel "Mais pedidos":** saiu. O título afirmava uma popularidade sem dado [H25][H26], e os 7 lanches, um por vez no celular, davam 6 deslizes até o fim [H9]. Entra o **painel**: um teclado de rádio com os 7 lanches à vista e um visor com o escolhido. O título passa a ser o rótulo real "Hambúrgueres".
- **Hero:** saiu a composição em duas colunas (texto à esquerda, lanche à direita), que era a da v1 e é a de outros estilos. O h1 fica sozinho em cima e, embaixo, uma **cova larga e rasa prensada no kraft, na largura toda**: o lanche fica de pé dentro dela, à esquerda, e o texto e "Ver cardápio" ficam ao lado da base. O hero ficou mais baixo, para o painel aparecer acima da dobra [H2][H3].
- **Ação:** "Adicionar" deixou o degradê convexo e ficou chapado em ketchup, como pedem os praticantes [N31][N37] e como aparece em G1 e G2.
- **Navegação no celular:** o botão de menu saiu, e os três links ficam visíveis numa segunda linha da barra [H14][H15].
- **Bebidas e sobremesa:** antes não apareciam; agora ficam em **poços redondos prensados na página** [H21].
- **Horário e contato:** saíram do rodapé e viraram uma **seção própria**, com o horário em poços por dia e os contatos como controles em relevo [H29][H26].
- **Rodapé:** o painel afundado virou um sulco e uma linha simples, com a navegação repetida [H30]. As redes saíram, porque os links de `REDES` são genéricos (`https://facebook.com`), e link que não leva aonde promete mina a credibilidade [H25][H26].
- **Movimento:** cor não anima mais. As camadas de relevo trocam só por opacidade [N22][N29].

---

## 2. Processo: plano e revisão

### Plano (primeira passada)

- **Cores** (todas já aprovadas):
  - kraft `#d6c3a5`;
  - luz `#f1e2c9`;
  - sombra `#b09c7f`;
  - tinta `#2e2318`;
  - ketchup `#a42a23`;
  - alface `#2e6b2e`.
  - Um tom novo, o kraft do fundo de poço, aparece só onde não há texto.
- **Tipo:** Nunito 400, 600 e 800, uma família só.
  - Escala: h1 de 40 a 72 px (`--neu-titulo`), h2 de 28 a 36 px, h3 de 21 a 24 px e corpo de 17 px.
  - Os preços usam algarismos tabulares, a 24 px no visor.
  - Tudo alinhado à esquerda, com no máximo 60 caracteres por linha. A exceção é o item dos poços redondos, centrado no eixo do círculo.
- **Layout:** superfície contínua, com um único aparelho elevado no meio da página. O resto é prensado no kraft.
- **Princípios:** a gramática da seção 1, a ousadia num lugar só (o painel) e movimento só como resposta a um gesto.

### Revisão contra o pedido (o que saiu genérico e foi trocado)

| Primeira ideia | Por que caiu | Troca |
|---|---|---|
| Faixa de números grandes sob o hero (P5): contagens e "a partir de" | Número grande com rótulo pequeno é o tratamento padrão de hero, e as contagens repetiam o que as teclas já mostram | Nenhuma. O cabeçalho do painel fica só com o h2, e o preço de cada lanche está na tecla (o "a partir de" que sobrou caiu na revisão do juiz) |
| Abas de categoria filtrando uma grade de 7 cartões elevados | Grade de cartões iguais com a mesma sombra está na lista de genéricos, e abas são o widget óbvio de qualquer estilo | Teclado de rádio e um visor: um produto inteiro por vez, os outros a um toque, sem carrossel |
| Bebidas e sobremesa em cartões elevados | "Tudo em card", e mais sombra grande em mais itens [N37] | Poços redondos prensados no próprio kraft, como a bandeja de polpa das bebidas no delivery |
| "Como pedir em três passos" numerados | Faixa de passos é template, e o fluxo real já está na página | Fora: teclas, visor e "Adicionar" são o caminho |
| Switch claro/escuro (candidato do dossiê) | Não serve ao pedido, custa um segundo jogo de sombras [N37] e um modo alternativo não substitui a acessibilidade do padrão [N40] | Fora |
| Contato em três cartões com ícone, como a página do kit [N47] | Cópia do kit e mais cartões | Contatos como controles em relevo, sobre o kraft, e o horário em poços por dia |
| Prato circular elevado no hero (v1) | Já existia | Primeiro, uma impressão elíptica ao lado do texto, que o juiz recusou por manter as duas colunas da v1. Ficou a cova larga e rasa na largura toda, sob o h1, com o lanche de pé e o texto ao lado da base |

---

## 3. Composição

Ordem dos blocos:

1. **Topo** (`NeuTopo`, slot `#topo`): barra elevada com a marca, a navegação e o carrinho.
2. **`abertura`** (hero): o h1 sozinho, direto no kraft. Embaixo, a cova larga e rasa na largura toda, com o recorte do lanche de pé à esquerda e o texto e "Ver cardápio" ao lado da base.
3. **`painel`** (a ousadia): o aparelho de kraft, com as teclas de rádio dos lanches, o visor fundo do escolhido e a régua de adicionais. A cova do hero é o negativo dele: o mesmo raio, afundada em vez de elevada.
4. **`acompanhamentos`**: as bebidas e a sobremesa em poços redondos prensados na página.
5. **`contato`**: o horário em poços por dia, o endereço e os contatos como controles em relevo.
6. **Rodapé** (`NeuRodape`, slot `#rodape`): um sulco e uma linha com a marca, a descrição, a navegação repetida e os direitos.

Ritmo vertical, em tokens:

- entre seções: `--space-8` a partir de `lg`, `--space-7` abaixo;
- dentro do painel: `--space-6`.

O hero termina antes da dobra de 900 px em 1440, com o cabeçalho do painel visível [H3].

### Wireframe em 1440

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ ╭─ NeuTopo: pílula elevada, fixa a partir de md, faixa de kraft opaca atrás ───────────╮ │
│ │ Smash Burger                 Início   Cardápio   Entrar                         (🛒) │ │
│ ╰───────────────────────── Início afundado e sublinhado ────────────────────────────────╯ │
│                                                                                          │
│ [abertura]                                                                               │
│  Smash na chapa,                h1, 72 px, 2 linhas, sozinho em cima                     │
│  entregue quente                                                                         │
│ ┌─ cova larga e rasa: afundada no kraft, na largura toda, raio do painel ──────────────┐ │
│ │  ╭─ recorte ─────╮                                                                   │ │
│ │  │ sem fundo,    │                                                                   │ │
│ │  │ 19 rem        │                                                                   │ │
│ │  │ (o lanche     │   Hambúrgueres artesanais prensados na hora.                      │ │
│ │  │  de pé)       │   De terça a sexta, das 13h à 01h.                                │ │
│ │  │               │   [ Ver cardápio ]  ketchup chapado, ao lado da base              │ │
│ └──┴─── lábio claro ┴── por cima da base do lanche ────────────────────────────────────┘ │
│                                                                                          │
│ [painel]  ╭──────── aparelho elevado: o único objeto grande em relevo ─────────────────╮ │
│           │ Hambúrgueres (h2)                                                          │ │
│           │ Escolha um lanche (legend)                                                 │ │
│           │ ╭✓ Cheese Bacon   ╮◂ afundada,    ┌──────────── visor (poço fundo) ───────┐ │ │
│           │ │  R$ 25,99       │  borda 2 px   │ ┌──── foto 4:3 ────┐  Cheese Bacon (h3)│ │ │
│           │ ╭○ Smash Burger   ╮               │ │                  │  Ingredientes (h4)│ │ │
│           │ ╭○ Veggie Burger  ╮               │ │                  │  Pão de…  Bacon   │ │ │
│           │ ╭○ X-Salada       ╮               │ │                  │  Queijo   Alface… │ │ │
│           │ ╭○ Chicken Burger ╮               │ └──────────────────┘  ⌜R$ 25,99⌟       │ │ │
│           │ ╭○ Burger Picanha ╮               │                       [ Adicionar ]    │ │ │
│           │ ╭○ Batata Frita   ╮               └────────────────────────────────────────┘ │ │
│           │ Adicionais (h3) ⌜ Bacon R$ 3,50   Ovo R$ 2,50   Queijo R$ 2,00   …        ⌟ │ │
│           ╰────────────────────────────────────────────────────────────────────────────╯ │
│                                                                                          │
│ [acompanhamentos]  Para acompanhar (h2)        poços prensados direto no kraft           │
│  Bebidas (h3)                                           ┊  Sobremesas (h3)               │
│    ◯           ◯           ◯                            ┊     ◯                          │
│  Copo de      Coca Cola   Suco de                       ┊  Sorvete de Pote               │
│  Refrigerante Lata        Abacaxi                       ┊  R$ 12,90                      │
│  R$ 5,99      R$ 4,99     R$ 7,99                       ┊  [Adicionar]                   │
│  [Adicionar]  [Adicionar] [Adicionar]                   ┊  (┊ = sulco)                   │
│                                                                                          │
│ [contato]  Horário e contato (h2)                                                        │
│  Horário (h3)                        Endereço (h3)                 Contato (h3)          │
│  (seg)(TER)(QUA)(QUI)(SEX)(sáb)(dom) ╭📍 Rua Beira da Praia -  ╮  ╭📞 WhatsApp · +55…  ╮ │
│  poços; abertos em tinta e com ponto  │  Navegantes, SC        │  ╭✉ contato@smash…   ╮ │
│  Terça a sexta, das 13h à 01h                                                            │
│                                                                                          │
│ ════════════════════════════════════ sulco ═════════════════════════════════════════════ │
│  Smash Burger                         Início   Cardápio   Entrar                         │
│  Sabor irresistível em cada mordida…                                                     │
│  © 2026 Smash Burger · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann           │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

No wireframe, `(TER)` em caixa alta só marca o dia aberto. Na tela, todo rótulo de dia é minúsculo ("ter").

### Wireframe em 390

```
╭───────────────────────────────╮
│ Smash Burger            (🛒)  │  NeuTopo, estático no celular
│  Início   Cardápio   Entrar   │  segunda linha, links visíveis
╰───────────────────────────────╯
[abertura]
Smash na chapa,
entregue quente       h1 40 px, até 4 linhas
┌─ cova (raio do card) ─────────┐
│        ╭─ recorte ─╮          │
│        │  12 rem   │          │
│        │ (de pé)   │          │
└────────┴─ lábio ───┴──────────┘
Hambúrgueres artesanais
prensados na hora. De terça…
[ Ver cardápio ]
[painel] ╭─────────────────────╮
│ Hambúrgueres (h2)             │
│ Escolha um lanche             │
│ ╭✓Cheese Bacon╮╭○Smash Burg.╮ │  2 colunas, 4 linhas
│ ╭○Veggie Burg.╮╭○X-Salada   ╮ │
│ ╭○Chicken Bu.╮╭○Burger Pica.╮ │
│ ╭○Batata Frita╮               │
│ ┌ visor ────────────────────┐ │
│ │ foto 4:3                  │ │
│ │ Cheese Bacon (h3)         │ │
│ │ Ingredientes, 2 colunas   │ │
│ │ ⌜R$ 25,99⌟  [Adicionar]   │ │
│ └───────────────────────────┘ │
│ Adicionais: lista 2 colunas   │
╰───────────────────────────────╯
[acompanhamentos]
Para acompanhar (h2)
Bebidas (h3)
◯  Copo de Refrigerante (h4)
   R$ 5,99   [Adicionar]
◯  Coca Cola Lata
   R$ 4,99   [Adicionar]
◯  Suco de Abacaxi
   R$ 7,99   [Adicionar]
──── sulco ────
Sobremesas (h3)
◯  Sorvete de Pote
   R$ 12,90  [Adicionar]
[contato]
Horário e contato (h2)
Horário (h3)
(seg)(ter)(qua)(qui)(sex)(sáb)(dom)
Terça a sexta, das 13h à 01h
Endereço (h3)
╭📍 Rua Beira da Praia - ╮
│  Navegantes, SC        │
Contato (h3)
╭📞 WhatsApp · +55 47 … ╮
╭✉ contato@smashburger… ╮
══════ sulco ══════
Smash Burger / descrição
Início  Cardápio  Entrar
© 2026 …
```

### Em 1024

O layout é o de 1440, mais estreito:

- **Topo:** uma linha só.
- **Hero:** o h1 em cima, em até 3 linhas; a cova com os 960 px do container e o recorte de 16 rem, com o texto ao lado da base.
- **Painel:**
  - a coluna das teclas tem 15 rem;
  - o visor fica em duas colunas, com a foto à esquerda e o texto à direita;
  - os ingredientes ficam em uma coluna.
- **Acompanhamentos:** os quatro poços seguem numa linha, com 8,5 rem de diâmetro.
- **Contato:** duas colunas, com o horário à esquerda e o endereço e o contato empilhados à direita.

---

## 4. Seções

### 4.1 `abertura` (hero)

- **Objetivo:**
  - dizer quem é a casa e o que ela faz, com a ação de pedir à mão [H1];
  - mostrar o gesto do estilo (o que se aperta afunda) numa peça estática, sem foto atrás de texto [H5]: a cova é a marca de uma prensa larga no kraft, e o lanche fica de pé dentro dela;
  - deixar o painel aparecer acima da dobra [H2][H3].
- **Nova em relação à v1:** não. É refeita: o h1 fica sozinho em cima, e a cova larga e rasa, na largura toda, junta o lanche e o texto num objeto só. Saem o prato elevado da v1 e as duas colunas (texto à esquerda, lanche à direita).
- **Raiz:** `<section data-secao="abertura" aria-labelledby="neu-abertura-titulo" class="neu-abertura">`.

**Conteúdo real**

| Campo | Origem |
|---|---|
| h1 | `dados.js` › `HERO.titulo` ("Smash na chapa, entregue quente") |
| Texto | `dados.js` › `HERO.texto` |
| Ação | `dados.js` › `HERO.acao` ("Ver cardápio"), `RouterLink` para `/menu` |
| Recorte | `dados.js` › `HERO.imagem`, `HERO.alt`, `HERO.largura` (960) e `HERO.altura` (906); `IMAGEM_HERO` (WebP com alfa em 480 e 960, PNG 960) |

Textos provisórios: nenhum.

**Componentes:** `NeuAcao` (com `para="/menu"`, tamanho `g`). A cova é marcação da própria seção, não um componente.

**Estrutura.** A seção tem o h1 e, embaixo dele, o palco `.neu-abertura__palco`: um grid com `isolation: isolate`. A cova e o lábio são camadas no mesmo grid do lanche e do texto, porque itens de grid podem ocupar as mesmas células. Na ordem do DOM:

1. **`.neu-cova`** (`<span>` decorativo, `aria-hidden="true"`):
   - é a cova larga e rasa. O fundo é `--neu-kraft`, o da própria página: a cova tem texto, então não leva o `--neu-kraft-poco`;
   - `box-shadow: var(--neu-afundado-grande)`, a mesma profundidade do visor;
   - `border-radius: var(--neu-raio-painel)` a partir de `md` e `var(--neu-raio-card)` abaixo;
   - ocupa a linha toda do palco a partir de `md` (`grid-column: 1 / -1`, sobre as áreas do lanche e do texto) e só a área `lanche` abaixo de `md`.
2. **`<picture class="neu-cova__lanche">`** (o recorte):
   - fica na área `lanche`, com `z-index: var(--neu-z-recorte)` e `filter: var(--neu-sombra-recorte)`;
   - vai alinhado embaixo (`align-self: end`), com `--space-5` de folga em cima (`--space-4` abaixo de `md`). A partir de `md`, fica a `--space-6` da borda esquerda da cova; abaixo, centrado;
   - a base fica a `--space-3` da borda de baixo da cova, dentro da faixa do lábio.
3. **`.neu-cova__labio`** (`<span>` decorativo, `aria-hidden="true"`):
   - tem a mesma área e o mesmo raio da cova, com `z-index: var(--neu-z-labio)` e `pointer-events: none`;
   - `box-shadow: var(--neu-labio)` e `clip-path: inset(50% 0 0 0)`, estático: só a metade da frente;
   - o lábio claro passa por cima da base do lanche, e o lanche parece de pé dentro da cova.
4. **`.neu-cova__texto`** (`<div>` com o `<p>` de `HERO.texto` e o `NeuAcao`):
   - fica na área `texto`, com `z-index: var(--neu-z-labio)`. Vem depois do lábio no DOM, e por isso o texto e o botão ficam por cima da faixa clara;
   - a partir de `md`, fica ao lado da base do lanche (`align-self: end`), a pelo menos `--space-6` da borda de baixo e da direita da cova, onde a sombra interna já não pesa sob o texto (o par de `--neu-sombra-sob-texto`);
   - abaixo de `md`, vem depois da cova, direto no kraft.

O resto da cova, acima e à direita do texto, fica vazio de propósito: é o kraft prensado, sem enfeite.

**Interação e estados:**

- só "Ver cardápio", com os estados de `NeuAcao`: padrão, hover, foco e pressionado;
- a cova não é interativa e não tem hover.

**Acessibilidade:**

- landmark: a seção nomeada pelo h1 (`id="neu-abertura-titulo"`);
- o único h1 da página;
- a ordem do DOM (h1, recorte, texto e "Ver cardápio") é a da leitura em todas as larguras;
- imagem com `alt` = `HERO.alt`, `width` e `height`, `loading="eager"`, `fetchpriority="high"` e `decoding="async"`;
- a cova e o lábio têm `aria-hidden`;
- o texto fica no fundo da cova, ao lado do recorte, e nunca sobre ele [H5];
- o link tem o nome do próprio texto, "Ver cardápio".

**Comportamento:**

- **1440:**
  - h1 no alto do container, com `max-width: 18ch` e `text-wrap: balance`, em 2 linhas ("Smash na chapa," e "entregue quente");
  - `--space-5` entre o h1 e o palco;
  - palco com os 1136 px do container, em grid `19rem minmax(0, 1fr)` (áreas `lanche texto`) e `column-gap` de `--space-6`;
  - recorte de 19 rem, com cerca de 287 px de altura; a cova fica com cerca de 20 rem de altura, larga e rasa (perto de 3,5 por 1);
  - texto com `max-width: 34ch`;
  - `padding-block` de `--space-6`.
  - **Conta da dobra:** o topo (cerca de 84 px), o h1 (cerca de 147 px), a cova (cerca de 323 px) e os respiros põem o h2 do painel perto de 760 px, acima da dobra de 900. O construtor confere.
- **1024:**
  - h1 em até 3 linhas;
  - palco com 960 px, em grid `16rem minmax(0, 1fr)`, e recorte de 16 rem.
- **768 (`md`):** o mesmo arranjo, com recorte de 13 rem.
- **390:**
  - uma coluna, na ordem h1, cova com o lanche, texto e ação (as áreas `lanche` e `texto` empilhadas);
  - a cova na largura do container (358 px), com o recorte de 12 rem centrado;
  - `padding-block` de `--space-5` em cima e `--space-6` embaixo, e `--space-4` entre o h1, a cova e o texto;
  - h1 em até 4 linhas.
  - O cabeçalho do painel deve aparecer acima de 844 px. Pela conta, fica perto de 750 px com o h1 em 2 linhas; se passar da dobra, o recorte desce a 11 rem.
- **`sizes` do recorte:** `"(min-width: 1280px) 304px, (min-width: 1024px) 256px, (min-width: 768px) 208px, 192px"`.

**Movimento:**

- nenhum ao carregar, sem entrada, paralaxe nem tilt [H1];
- só o pressionado de `NeuAcao`.
- **Versão reduzida:** a mesma, sem o deslocamento de 1 px.

**Cardápio editado:** não se aplica, porque o hero usa só a imagem fixa e os textos de `HERO`.

**Cores forçadas e mais contraste:**

- em `forced-colors: active`, a cova ganha `border: 1px solid CanvasText`, como o visor, e o lábio some (`display: none`), porque a sombra vira `none` [N20];
- em `prefers-contrast: more`, a cova ganha borda de `--neu-borda-largura` em `--neu-borda`.

### 4.2 `painel` (a ousadia)

- **Objetivo:** o aparelho de propósito único que os praticantes indicam para o estilo [N35][N36], e não um enfeite com controles que não fazem nada [N13].
  - Cada tecla escolhe um lanche de verdade, e o visor mostra tudo o que a listagem precisa (foto, nome, ingredientes e preço [H20]) mais o único botão que age, "Adicionar <nome>".
  - Os 7 lanches ficam à vista, com nome e preço nas teclas, sem carrossel [H6][H9][H10].
  - A régua de adicionais mostra de antemão o que se pode somar, a falha que o Baymard viu nos sites de delivery [H24].
- **Nova em relação à v1:** sim. Substitui o carrossel "Mais pedidos".
- **Raiz:** `<section data-secao="painel" aria-labelledby="neu-painel-titulo" class="neu-painel">`. Dentro dela, o aparelho é um `<div class="neu-painel__aparelho">` elevado, que não é landmark.

**Conteúdo real**

| Campo | Origem |
|---|---|
| h2 | `dados.js` › `CATEGORIAS`, `rotulo` da chave `foods` ("Hambúrgueres") |
| Teclas | `productsStore.foods[]`: `id` (valor do rádio), `name` (rótulo) e `price` (com `formatPrice`, como detalhe) |
| Visor, foto | `produto.image` via `CartaoProduto`/`useCartaoProduto` (480, 960 e 1440, WebP e JPG; ou `data:`) |
| Visor, h3 | `produto.name` |
| Visor, h4 "Ingredientes" | rótulo real do `ModalAdditional.vue` (legend "Ingredientes") |
| Visor, lista | `produto.ingredients[]`; se vier vazio ou faltar, `produto.description` |
| Visor, preço | `cartao.preco` (`formatPrice(produto.price)`) |
| Visor, ação | "Adicionar" (`ProductCard.vue`) com `v-bind="cartao.atributosAdicionar"` (`aria-label="Adicionar <nome>"`) e `@click="personalizar(produto, cartao.contexto)"` (`usePersonalizar()`) |
| Régua, h3 "Adicionais" | rótulo real do `ModalAdditional.vue` (h3 "Adicionais") |
| Régua, itens | `productsStore.foodAdditionals[]`: `name` e `price` (com `formatPrice`) |
| Vazio | "Nada nesta categoria por enquanto" (título do `EmptyState` do `MenuView.vue`) e `HERO.acao` para `/menu` |

**Textos provisórios** (`textos.js`): `painelLegenda: "Escolha um lanche"`.

O cabeçalho do painel não tem leitura de preço nem contagem. O menor preço de `foods` é o da Batata Frita, que não é hambúrguer, e os 7 lanches, cada um com o seu preço, já estão nas teclas logo abaixo.

**Componentes:** `NeuTeclado` (com `NeuTecla`), `NeuVisor` (com `NeuFotoPoco`, `NeuLeitura` e `NeuAcao`) e `NeuAcao` no estado vazio.

**Lógica:** `useLancheNoVisor(() => productsStore.foods)` devolve:

- `idSelecionado` (ref);
- `produto` (computed);
- `interagiu` (ref, true depois da primeira escolha do usuário);
- `selecionar(id)`.

O visor recebe `:pulsar="interagiu"`.

**Interação e estados:**

- **Teclado:** rádio nativo, em `fieldset` com `legend` visível.
  - Tab entra na tecla marcada, e as setas movem e marcam: o navegador faz o tabindex móvel do grupo.
  - Clique ou toque na tecla marca.
  - Não há botão "aplicar": a troca é imediata.
- **Visor:** mostra o lanche marcado.
  - `CartaoProduto` vai com `:key="produto.id"`, para o estado "Adicionado" de um lanche não passar para o outro.
- **Adicionar:**
  - abre o modal real;
  - na volta, `NeuAcao` mostra "Adicionado" com check, em alface, por `--dur-base` + `--dur-hold`;
  - o modal devolve o foco e anuncia.
- **Estados da seção:**
  - padrão, com o primeiro lanche da lista marcado;
  - outro lanche marcado;
  - adicionado;
  - imagem falhou (o ícone de reserva no poço da foto);
  - vazio.

**Acessibilidade:**

- **Landmark:** a seção nomeada pelo h2 (`id="neu-painel-titulo"`).
- **Títulos:** h2 › h3 (nome no visor) › h4 (Ingredientes); depois h3 (Adicionais).
- **Grupo:** `fieldset` com `legend` "Escolha um lanche".
  - Cada rádio é um `<input type="radio" class="visually-hidden" name="neu-lanche">` dentro do `<label class="neu-tecla">`.
  - Os `label` são filhos diretos de um `<div class="neu-teclado__teclas">`, logo depois da `legend`: é o seletor dos estados do `neumorfismo.json`.
  - O nome acessível é o texto do rótulo, nome e preço ("Cheese Bacon R$ 25,99"); não precisa de região viva.
- **Foco:** anel em `.neu-tecla__face` por `input:focus-visible + .neu-tecla__face`, com `outline` de `--focus-width` em `--color-focus` e `--focus-offset`.
- **Selecionado:** afunda, perde o convexo, ganha borda de `--neu-borda-estado` em tinta e mostra o check. Borda e ícone dão 3:1, e o estado não depende da sombra [N11][N16][N35].
- **Preço do visor:** o `NeuLeitura` é um `<p>` com o valor em texto.
- **Adicionais:** `<ul role="list">` com nome e preço em cada item, sem cara de botão (texto plano dentro de um poço). Evita o "parece clicável" [N13].
- **Alvos:** teclas com `min-height` de 3.5 rem e "Adicionar" com 3.5 rem.

**Comportamento:**

- **1440:**
  - aparelho com `--neu-elevado-grande`, `--neu-raio-painel` e `padding` de `--space-7`;
  - cabeçalho só com o h2, à esquerda;
  - corpo em grid `17.5rem 1fr` com `gap: --space-6`: teclas numa coluna de 7, visor à direita;
  - visor com `--neu-afundado-grande`, `--neu-raio-card` e `padding` de `--space-6`, em grid `1.1fr 1fr`: foto à esquerda; à direita h3, ingredientes em 2 colunas (`column-count: 2`) e uma linha com a leitura do preço e "Adicionar";
  - régua de adicionais na largura toda, com `--neu-afundado-pequeno` e `--neu-raio-pilula`: o h3 e os itens em linha com `flex-wrap` e `gap: --space-5`.
- **1024:**
  - grid `15rem 1fr`;
  - visor em `1fr 1fr`, com os ingredientes em 1 coluna;
  - régua com quebra de linha.
- **390:**
  - uma coluna, com `padding` de `--space-5` e o h2 no alto;
  - teclas em grid de 2 colunas (3 a partir de `md`), com `gap: --space-3`;
  - visor embaixo, com a foto 4:3 na largura toda, o h3, os ingredientes em 2 colunas e a linha do preço e "Adicionar" (`justify-content: space-between`);
  - régua com `--neu-raio-card` e lista em 2 colunas;
  - a página não rola na horizontal.
- **`sizes` da foto do visor:** `"(min-width: 1280px) 440px, (min-width: 1024px) 300px, 86vw"`.

**Movimento:**

- **Tecla:** as camadas trocam por opacidade em `--dur-fast`: a elevada some e a afundada aparece, a técnica do pseudo-elemento [N29]. A sombra não interpola entre elevada e interna [N22].
  - No `:active`, em `motion-ok`, a tecla desce `translateY(1px)`.
- **Visor:** o conteúdo novo entra com `opacity` de 0 a 1 em `--dur-fast` (`<Transition name="neu-visor">` só na entrada, sem `mode="out-in"`, para não pular a altura).
  - Em `motion-ok`, e só depois de uma escolha do usuário (`pulsar`), o poço "recebe a pressão". Uma camada `.neu-visor__pulso` (com `:key="produto.id"`) e `box-shadow: var(--neu-impressao)` faz `opacity` 0 → 0.9 → 0 em `--dur-slow`, com `--ease-out`.
  - É o smash como resposta: a tecla afunda, e o visor afunda junto e volta. Anima só a opacidade [N27].
- **Versão reduzida:**
  - a troca é imediata, sem pulso nem deslocamento;
  - fica só a troca de camadas, que a regra global de movimento reduzido encurta.
- **Carregar:** nada se mexe.

**Cardápio editado:**

- **Produto marcado que some:** o `useLancheNoVisor` volta ao primeiro da lista.
- **Lista vazia:**
  - somem o teclado, o visor e a régua;
  - fica um poço com "Nada nesta categoria por enquanto" e `NeuAcao` "Ver cardápio" para `/menu`;
  - o h2 continua.
- **Nome ou preço editados:** as teclas e o visor leem da store, e o preço sai sempre de `formatPrice`.
- **Imagem `data:`:**
  - `responsiveImage` devolve `srcset` vazio, e o `NeuFotoPoco` não renderiza `<source>`;
  - se falhar (`@error`), entra o ícone de reserva (`['fas','burger']`), e o nome continua no h3.
- **`foodAdditionals` vazio:** a régua some.
- **Nome longo:** a tecla quebra em duas linhas (altura automática), e o visor quebra o h3.

**Cores forçadas e mais contraste:**

- **Cores forçadas:**
  - o aparelho e o visor ganham borda de 1 px em `CanvasText`, e a régua também;
  - a tecla marcada fica com borda em `Highlight`, e o check fica;
  - as camadas de sombra viram `none`.
- **`prefers-contrast: more`:**
  - o aparelho e o visor ganham borda de `--neu-borda-largura` em `--neu-borda`;
  - `--neu-borda-estado` passa a 3 px.

### 4.3 `acompanhamentos`

- **Objetivo:** mostrar a variedade da casa além dos lanches [H21][H22], com preço e "Adicionar" visíveis sem caçar.
  - Os itens são poços redondos prensados no próprio kraft da página, e não cartões. É o baixo-relevo do estilo [N30][N33]: a bandeja de polpa das bebidas do delivery, feita do mesmo material, sem enfeite.
  - O vizinho mais próximo nas galerias são as vagas rebaixadas de G2 (conceito).
- **Nova em relação à v1:** sim.
- **Raiz:** `<section data-secao="acompanhamentos" aria-labelledby="neu-acompanhamentos-titulo" class="neu-acompanhamentos">`, sem contêiner elevado: a seção fica direto na superfície.

**Conteúdo real**

| Campo | Origem |
|---|---|
| h2 | `textos.js` › `acompanhamentosTitulo` ("Para acompanhar", provisório) |
| h3 dos grupos | `dados.js` › `CATEGORIAS`, `rotulo` das chaves `drinks` ("Bebidas") e `desserts` ("Sobremesas") |
| Itens | `productsStore.drinks[]` e `productsStore.desserts[]`: `name`, `image` e `price` (com `formatPrice` via `CartaoProduto`) |
| Ação | "Adicionar" com `atributosAdicionar` e `personalizar(produto, contexto)` (o modal mostra a quantidade para bebidas e os `dessertAdditionals` para a sobremesa) |
| Vazio | "Nada nesta categoria por enquanto" (`MenuView.vue`) |

**Textos provisórios:** `acompanhamentosTitulo: "Para acompanhar"`.

**Componentes:** `NeuVaga` (com `NeuFotoPoco` redondo e `NeuAcao`).

**Interação e estados:**

- só os botões "Adicionar", com os estados de `NeuAcao`;
- o item não tem hover nem é clicável inteiro;
- **estados da seção:**
  - padrão;
  - um grupo vazio: o grupo some, com o h3 junto;
  - os dois vazios: um poço com "Nada nesta categoria por enquanto" e `NeuAcao` "Ver cardápio";
  - imagem falhou.

**Acessibilidade:**

- landmark: a seção nomeada pelo h2;
- títulos: h2 › h3 (grupo) › h4 (nome do produto);
- cada grupo é um `<ul role="list">` com um `<li>` por item;
- a foto tem `alt` = `produto.name`, `loading="lazy"` e `width`/`height`;
- o preço é texto;
- o botão tem o nome "Adicionar <nome>".

**Comportamento:**

- **1440:**
  - os grupos em grid `3fr auto 1fr`: Bebidas, o sulco vertical (`.neu-sulco`, 6 px de largura, `box-shadow: var(--neu-sulco)`, `aria-hidden`) e Sobremesas;
  - cada grupo em grid com uma coluna por item;
  - item centrado no eixo do poço: poço de 10 rem, h4, preço (800, tabular) e "Adicionar";
  - se um grupo some, o grid fica com uma coluna só, sem o sulco.
- **1024:** o mesmo, com poço de 8,5 rem.
- **390:**
  - grupos empilhados, com o sulco na horizontal entre eles;
  - cada item é uma linha: poço de 5,5 rem à esquerda; à direita o h4 e, embaixo, o preço e "Adicionar" lado a lado;
  - texto alinhado à esquerda.
  - De `md` a `lg`, os itens voltam a ser colunas.
- **`sizes` dos poços:** `"(min-width: 1024px) 160px, 88px"`.

**Movimento:**

- só o pressionado e o "Adicionado" de `NeuAcao`; nada entra ao rolar.
- **Versão reduzida:** sem o deslocamento de 1 px.

**Cardápio editado:**

- as listas vêm da store a cada render, e nada é escolhido por id;
- uma categoria vazia esconde o grupo;
- uma imagem `data:` vai sem `<source>`, e a falha mostra o ícone de reserva (`['fas','utensils']`) no poço;
- o nome longo quebra em até 3 linhas, sem corte (sem `overflow: hidden`).

**Cores forçadas:** o poço ganha borda de 2 px em `CanvasText`, e o sulco vira uma borda de 1 px em `CanvasText`.

### 4.4 `contato`

- **Objetivo:** horário, endereço e contato fáceis de achar antes do rodapé [H29][H26][H30].
  - O horário vira uma leitura em poços, um por dia, no espírito do painel de aparelho: uma leitura estática, não um controle.
  - Os contatos são controles secundários em relevo com borda, a camada "relevo com borda" da gramática.
- **Nova em relação à v1:** sim. Na v1, os contatos estavam só no rodapé.
- **Raiz:** `<section data-secao="contato" aria-labelledby="neu-contato-titulo" class="neu-contato">`, direto na superfície, sem contêiner elevado.

**Conteúdo real**

| Campo | Origem |
|---|---|
| h2 | `textos.js` › `contatoTitulo` ("Horário e contato", provisório) |
| h3 "Horário" | `dados.js` › `RODAPE.horario` |
| Poços dos dias | `diasAbertos(HORARIO)` (lê "Terça a sexta" no texto de `HORARIO`); rótulos `textos.js` › `diasSemana` (provisórios) |
| Texto do horário | `dados.js` › `HORARIO` ("Terça a sexta, das 13h à 01h") |
| h3 "Endereço" | `dados.js` › `RODAPE.endereco` |
| Link do endereço | `dados.js` › `CONTATOS` (chave `endereco`): `texto`, `href` (Google Maps com `api=1`) e `icone`; abre em nova aba com `NOVA_ABA` |
| h3 "Contato" | `textos.js` › `contatoSubtitulo` ("Contato", provisório) |
| WhatsApp e e-mail | `dados.js` › `CONTATOS` (chaves `whatsapp` e `email`): `texto`, `href` (`wa.me` e `mailto:`), `externo` e `icone` |

**Textos provisórios:**

- `contatoTitulo: "Horário e contato"`;
- `contatoSubtitulo: "Contato"`;
- `diasSemana: ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"]`.

**Componentes:** `NeuSemana` e `NeuControle` (3 vezes).

**Interação e estados:**

- os três links com os estados de `NeuControle`: padrão, hover, foco e pressionado;
- os poços dos dias não são interativos e não têm hover.

**Acessibilidade:**

- landmark: a seção nomeada pelo h2;
- três h3;
- `NeuSemana` vai com `aria-hidden="true"`: repete visualmente o que o `<p>` de `HORARIO`, logo abaixo, diz em texto, e esse texto é a informação;
- os links externos levam `NOVA_ABA` num `.visually-hidden` [H34];
- o ícone tem `aria-hidden`;
- alvo de pelo menos 3 rem de altura.

**Comportamento:**

- **1440 (≥ `xl`):** grid de 3 colunas (`1.2fr 1fr 1fr`), uma por grupo.
- **1024 (`lg`):** 2 colunas, com o Horário à esquerda e o Endereço e o Contato empilhados à direita.
- **390:**
  - uma coluna;
  - `NeuSemana` com poços de 2,5 rem e `gap: --space-1` (7 poços cabem em 304 px);
  - os links na largura toda, quebrando em duas linhas se precisar (`--neu-raio-moldura`, nunca pílula, para a quebra não ficar estranha).

**Movimento:**

- só o pressionado dos controles: troca de camadas e, em `motion-ok`, o `translateY(1px)`.
- **Versão reduzida:** sem o deslocamento.

**Cardápio editado:** não se aplica.

- Se o texto de `HORARIO` mudar para algo que `diasAbertos` não entende, a função devolve `null` e `NeuSemana` não renderiza nada; o texto continua.

**Cores forçadas:** os poços dos dias ganham borda de 1 px em `CanvasText`, e o ponto de dia aberto fica em `CanvasText`.

---

## 5. Topo e rodapé (fora das seções)

### Topo (`NeuTopo`, slot `#topo`)

- **Conteúdo:**
  - a marca (`MARCA`, `RouterLink` para `/direcoes/neumorfismo`);
  - `<nav aria-label="Principal">` com `useLinksPrincipais("/direcoes/neumorfismo")`: Início (`aria-current="page"`, que o `RouterLink` exato põe), Cardápio e Entrar ou Perfil;
  - o carrinho (`RouterLink` para `/cart` com `:aria-label="rotulo"` de `useContadorCarrinho`, que casa com `^Carrinho,? (vazio|\d+ itens?)$`).
- **Sem botão de menu:** três links cabem visíveis em 390 [H14].
- **1440 e 1024:**
  - uma pílula elevada (`--neu-elevado`, `--neu-raio-pilula`), com a marca à esquerda, a navegação ao centro e o carrinho à direita;
  - `position: sticky` a partir de `md`, com `z-index: var(--z-navbar)`;
  - o `<header>` tem fundo `--neu-kraft` opaco e `padding-block` de `--space-3`, para o conteúdo não passar visível em volta da pílula [H17].
- **390:**
  - estático;
  - a pílula vira um bloco com `--neu-raio-card` e duas linhas: a marca e o carrinho em cima, e os três links embaixo, com `flex: 1` cada e `min-height` de 2.75 rem.
- **Link atual:** `--neu-afundado-pequeno`, tinta 800, sublinhado de 2 px com `text-underline-offset` de 5 px [N51] (a sombra não é o único sinal).
- **Carrinho:**
  - `NeuControle` redondo de 3 rem;
  - selo ketchup com o número (`texto`), `aria-hidden`, que entra com `opacity` em `--dur-fast` e, em `motion-ok`, com `scale(0.4)` → 1 em `--dur-base` e `--ease-spring`.

### Rodapé (`NeuRodape`, slot `#rodape`)

- **Conteúdo:**
  - um sulco na largura do container (`.neu-sulco` horizontal, `box-shadow: var(--neu-sulco)`, `aria-hidden`);
  - a marca (`MARCA`, `<p>`) e `DESCRICAO`;
  - `<nav aria-label="Rodapé">` (rótulo provisório) com os mesmos `useLinksPrincipais` [H30];
  - `RODAPE.copyright`.
- **Sem redes:** os links de `REDES` são genéricos [H25][H26].
- **1440:** grid de duas colunas (marca e descrição; navegação), com os direitos embaixo na largura toda.
- **390:** tudo empilhado.
- **Links:** tinta 600, `min-height` de 2.75 rem, sublinhado no hover (`hover-capable`) e anel de foco.
- **Sem títulos** no rodapé, para a ordem de h2 e h3 da página não saltar.

---

## 6. Inventário de componentes (11, fora as seções)

Todos em `src/direcoes/estilos/neumorfismo/componentes/`, com `<script setup>`, `defineProps` com tipo e padrão, `defineEmits` declarado e a própria parcial em `scss/_<nome>.scss` por `@use` no `<style scoped lang="scss">`. As camadas de relevo usam o mixin `relevo($elevado, $afundado)` de `scss/_base.scss` (o da v1, que troca `::before` e `::after` por opacidade).

| # | Nome | Papel | Props | Slots | Emits | Tokens | Ref. |
|---|---|---|---|---|---|---|---|
| 1 | `NeuTopo` | `<header>` com a marca, a navegação e o carrinho | `inicio: String` (obrigatória) | — | — | `--neu-kraft`, `--neu-elevado`, `--neu-afundado-pequeno`, `--neu-raio-pilula`, `--neu-raio-card`, `--neu-tinta`, `--neu-tinta-suave`, `--neu-ketchup`, `--neu-branco`, `--z-navbar` | [N51], G7, [H14][H17][H35] |
| 2 | `NeuRodape` | `<footer>` com o sulco, a marca, a navegação repetida e os direitos | `inicio: String` (obrigatória) | — | — | `--neu-sulco`, `--neu-tinta`, `--neu-tinta-suave` | [H30][H25][H26] |
| 3 | `NeuAcao` | Ação em cor chapada: link ("Ver cardápio") ou botão ("Adicionar") | `para: [String, Object]` (`null`; com valor, vira `RouterLink`), `adicionado: Boolean` (`false`), `tamanho: String` (`"m"`; `"m"` ou `"g"`) | padrão (o rótulo da face da frente) | `click` (só no modo botão) | `--neu-ketchup`, `--neu-ketchup-claro`, `--neu-ketchup-escuro`, `--neu-alface`, `--neu-branco`, `--neu-afundado-cor`, `--neu-raio-pilula`, `--neu-borda-largura` | [N31][N37][N38], G1, G2 |
| 4 | `NeuControle` | Controle secundário em relevo com borda: links de contato e o carrinho | `href: String` (`""`), `para: [String, Object]` (`null`), `externo: Boolean` (`false`), `icone: Array` (obrigatória), `redondo: Boolean` (`false`) | padrão (o texto; vazio quando `redondo`) | — | `--neu-convexo`, `--neu-convexo-hover`, `--neu-kraft`, `--neu-borda`, `--neu-borda-largura`, `--neu-elevado-pequeno`, `--neu-afundado-pequeno`, `--neu-raio-moldura` | [N11][N16][N49], [N47] |
| 5 | `NeuTecla` | Tecla de rádio com nome, preço e poço do check | `modelValue: [Number, String]` (`null`), `valor: [Number, String]` (obrigatória), `nome: String` (obrigatória), `rotulo: String` (obrigatória), `detalhe: String` (`""`) | — | `update:modelValue` | `--neu-convexo`, `--neu-convexo-hover`, `--neu-kraft`, `--neu-borda`, `--neu-borda-largura`, `--neu-borda-estado`, `--neu-tinta`, `--neu-tinta-suave`, `--neu-elevado-pequeno`, `--neu-afundado`, `--neu-afundado-pequeno`, `--neu-raio-pilula` | P4: [N51][N11][N49], G1, G3 |
| 6 | `NeuTeclado` | `fieldset` do grupo de rádio dos lanches | `produtos: Array` (obrigatória), `modelValue: [Number, String]` (`null`), `legenda: String` (obrigatória), `nome: String` (`"neu-lanche"`) | — | `update:modelValue` | `--space-3`, `--neu-tinta-suave` | P2: [N35][N36][N52] |
| 7 | `NeuVisor` | O poço fundo com o lanche marcado: foto, nome, ingredientes, preço e "Adicionar" | `produto: Object` (obrigatória), `pulsar: Boolean` (`false`) | — | — | `--neu-afundado-grande`, `--neu-impressao`, `--neu-raio-card`, `--neu-tinta`, `--neu-tinta-suave`, `--dur-fast`, `--dur-slow`, `--ease-out` | P2/P3: [N52][N35], G2 |
| 8 | `NeuLeitura` | Leitura estática num poço raso: o preço do visor, a 24 px, 800 e tabular | `valor: String` (obrigatória) | — | — | `--neu-afundado-pequeno`, `--neu-raio-pilula`, `--neu-tinta` | P3: [N45], G3 |
| 9 | `NeuFotoPoco` | Foto numa moldura afundada, retangular (visor) ou redonda (vagas), com reserva | `imagem: Object` (obrigatória; `{ src, srcset, sizes }`), `alt: String` (obrigatória), `forma: String` (`"retangular"`; ou `"redonda"`), `falhou: Boolean` (`false`), `largura: Number` (960), `altura: Number` (720), `icone: Array` (`['fas','utensils']`) | — | `erro` | `--neu-afundado`, `--neu-kraft-poco`, `--neu-raio-moldura`, `--neu-raio-foto`, `--radius-round`, `--neu-tinta-suave` | P3: [N45][N47], G2 |
| 10 | `NeuVaga` | Item de acompanhamento: poço redondo, nome, preço e "Adicionar" | `produto: Object` (obrigatória) | — | — | `--neu-tinta`, `--space-3`, `--space-4` (o resto vem dos filhos) | P3, G2, [H20] |
| 11 | `NeuSemana` | Leitura do horário: 7 poços, os dias abertos em tinta e com ponto | `texto: String` (obrigatória; `HORARIO`), `dias: Array` (obrigatória; `TEXTOS.diasSemana`) | — | — | `--neu-afundado-pequeno`, `--neu-tinta`, `--neu-tinta-suave`, `--neu-alface` | P3 e P5 (leitura em poço); não encontrei grade semanal neumórfica |

### Matriz de estados

**`NeuAcao`** (a ação, sem relevo em repouso)

| Estado | Fundo | Borda | Camada | Texto e ícone |
|---|---|---|---|---|
| Padrão | `--neu-ketchup` chapado | `--neu-borda-largura` em `--neu-ketchup-escuro` | Nenhuma | Branco, 800 |
| Hover (`hover-capable`) | `--neu-ketchup-claro` (instantâneo) | Igual | Nenhuma | Igual |
| Foco (`:focus-visible`) | Igual ao padrão | Igual | `outline` de `--focus-width` em `--color-focus`, `outline-offset: --focus-offset` | Igual |
| Pressionado (`:active`) | `--neu-ketchup-escuro` | Igual | `::after` com `--neu-afundado-cor`, `opacity` 0 → 1 em `--dur-fast`; em `motion-ok`, `translateY(1px)` | Igual |
| Adicionado (`adicionado`) | `--neu-alface` | `--neu-alface` | `::after` com `--neu-afundado-cor` visível | Face "Adicionado" com `['fas','check']`; as faces trocam por `opacity` em `--dur-fast` |
| Desabilitado e carregando | Não há: o fluxo real não desabilita o botão | — | — | — |

**`NeuControle`** (relevo com borda)

| Estado | Fundo | Borda | Camada | Texto e ícone |
|---|---|---|---|---|
| Padrão | `--neu-convexo` | `--neu-borda-largura` em `--neu-borda` | `::before` `--neu-elevado-pequeno` | Tinta 600, ícone tinta |
| Hover | `--neu-convexo-hover` (instantâneo) | Igual | Igual | Igual |
| Foco | Igual | Igual | `outline` de foco | Igual |
| Pressionado | `--neu-kraft` (o degradê sai [N49]) | Igual | `::before` some e `::after` `--neu-afundado-pequeno` aparece (`opacity`, `--dur-fast`); `translateY(1px)` em `motion-ok` | Igual |

**`NeuTecla`** (rádio)

| Estado | Fundo da face | Borda | Camada | Conteúdo |
|---|---|---|---|---|
| Padrão | `--neu-convexo` | 1 px em `--neu-borda` | `::before` `--neu-elevado-pequeno` | Poço do check vazio (`--neu-afundado-pequeno`), nome 700, preço 600 tinta-suave |
| Hover | `--neu-convexo-hover` | Igual | Igual | Igual |
| Foco (`input:focus-visible + .neu-tecla__face`) | Igual ao estado atual | Igual | `outline` de foco | Igual |
| Pressionado | `--neu-kraft` | Igual | Troca para `::after` `--neu-afundado` (`opacity`); `translateY(1px)` em `motion-ok` | Igual |
| Selecionado (`input:checked + .neu-tecla__face`) | `--neu-kraft` (sem convexo) | `--neu-borda-estado` em `--neu-tinta` | `::after` `--neu-afundado` fixo | Check `['fas','check']` tinta no poço (`opacity` 0 → 1, `--dur-fast`), nome 800 |
| Selecionado e foco | Como selecionado | Como selecionado | Mais o `outline` de foco | Igual |
| Desabilitado | Não há | — | — | — |

**`NeuFotoPoco`**

| Estado | O que se vê |
|---|---|
| Carregando | O poço na proporção (4:3 ou círculo), com fundo `--neu-kraft-poco` e a sombra interna |
| Carregado | A foto com `object-fit: cover` dentro da moldura, a 8 px da borda do poço |
| Falhou (`falhou`) | O ícone (`icone`) em tinta-suave, centrado, `aria-hidden`; o nome segue fora |
| `data:` | Só `<img>`, sem `<source>` |

**`NeuVisor`**

| Estado | O que se vê |
|---|---|
| Padrão | O lanche marcado |
| Trocando | O conteúdo novo com `opacity` de 0 a 1 (`--dur-fast`); em `motion-ok` e com `pulsar`, o pulso de profundidade em `--dur-slow` |
| Adicionado | O `NeuAcao` com o estado Adicionado |
| Imagem falhou | A reserva do `NeuFotoPoco` com `['fas','burger']` |

**`NeuLeitura`, `NeuSemana` e `NeuVaga`:** estáticos, sem hover nem foco próprio. O `NeuVaga` herda os estados do `NeuAcao` e do `NeuFotoPoco`.

**`NeuTopo` e `NeuRodape`** (links):

- padrão (tinta-suave 700);
- hover (tinta);
- foco (`outline`);
- atual (afundado, tinta 800 e sublinhado de 2 px);
- carrinho vazio, sem selo, ou com itens, com o selo.

### A11y e movimento por componente (resumo)

- **`NeuTeclado` e `NeuTecla`:**
  - rádio nativo em `fieldset` com `legend`; setas pelo navegador;
  - nome acessível = nome + preço;
  - estado por borda de 2 px e ícone, não só por sombra;
  - movimento: troca de camadas por opacidade e 1 px em `motion-ok`.
- **`NeuVisor`:**
  - h3 com o nome e h4 "Ingredientes";
  - o botão leva `atributosAdicionar`;
  - movimento: entrada por opacidade e pulso de profundidade só em `motion-ok`.
- **`NeuAcao`:**
  - `RouterLink` ou `<button type="button">`; repassa `aria-label` e `data-adicionado`;
  - a face "Adicionado" tem `aria-hidden` (quem anuncia é o modal);
  - movimento: faces por opacidade e 1 px em `motion-ok`.
- **`NeuControle`:** `<a>` (externo com `target="_blank"`, `rel="noopener noreferrer"` e `NOVA_ABA` oculto) ou `RouterLink`; ícone com `aria-hidden`.
- **`NeuSemana`:** `aria-hidden="true"` inteiro; o texto de `HORARIO` vem logo depois.

---

## 7. Tokens, pares, lógica e dependências

### Tokens novos (os valores ficam para o construtor, em `_tokens.scss`)

| Token | Papel |
|---|---|
| `--neu-impressao` | Sombra interna funda, com o par escuro e claro: o pulso do visor quando recebe a pressão. Mais funda que `--neu-afundado-grande`, que é a da cova do hero |
| `--neu-labio` | Sombra interna só clara, vinda de baixo, com o deslocamento e o desfoque da camada clara de `--neu-afundado-grande`: o lábio da frente da cova do hero, por cima da base do recorte |
| `--neu-sombra-recorte` | Valor de `filter: drop-shadow(...)` com a sombra do kraft em alfa: o contato do recorte do lanche com o fundo da cova |
| `--neu-kraft-poco` | Kraft um tom abaixo, para o fundo de poço **sem texto**: os poços de foto do visor e das vagas. A cova do hero tem texto e fica no `--neu-kraft` |
| `--neu-borda-estado` | Largura da borda de estado da tecla marcada: 2 px; 3 px em `prefers-contrast: more` |
| `--neu-sulco` | Sombra interna de uma linha (escura em cima, clara embaixo): o sulco do rodapé e o divisor entre Bebidas e Sobremesas |
| `--neu-z-recorte` | `z-index` do recorte sobre o fundo da cova (1) |
| `--neu-z-labio` | `z-index` do lábio sobre o recorte, e do texto do hero, que vem depois do lábio no DOM e fica por cima dele (2) |

### Pares de contraste novos (para `contraste.js`)

| Frente | Fundo | Mínimo | Onde |
|---|---|---|---|
| `neu-tinta` | `neu-kraft` | 3 | Borda de 2 px e ícone de check da tecla marcada (indicador de estado) |
| `neu-tinta` | `neu-kraft-claro` | 4,5 | Nome da tecla e do controle no hover (lado claro do convexo) |
| `neu-tinta-suave` | `neu-kraft-claro` | 4,5 | Preço da tecla no hover |
| `neu-tinta-suave` | `neu-sombra-sob-texto` (sobre `neu-kraft`) | 4,5 | Ingredientes e textos do visor e o texto do hero no fundo da cova, junto à sombra interna (novo uso do par existente) |
| `neu-borda` | `neu-kraft-claro` | 3 | Borda do controle no hover |
| `neu-alface` | `neu-kraft` | 3, informativo | Ponto dos dias abertos (`NeuSemana`, `aria-hidden`; o texto do horário é a informação) |
| `neu-tinta-suave` | `neu-kraft-poco` | 3, informativo | Ícone de reserva da foto que falhou |
| `neu-branco` | `neu-ketchup-escuro` | 4,5 | "Ver cardápio" e "Adicionar" pressionados (novo uso do par existente) |

### Lógica necessária

| Nome | Arquivo | O que faz | Outro estilo poderia usar? |
|---|---|---|---|
| `useLancheNoVisor(lista)` | `useLancheNoVisor.js` | Guarda o id marcado. O `produto` cai no primeiro da lista se o id sumir, e é `null` com a lista vazia. Expõe `interagiu`, que liga na primeira escolha do usuário | Sim: qualquer seção de "um produto em foco" escolhido pelo usuário |
| `diasAbertos(texto)` | `horario.js` (puro) | Lê "<dia> a <dia>" no começo de `HORARIO`, com os nomes de segunda a domingo e acentos tolerados. Devolve os índices de 0 (seg) a 6 (dom), ou `null` se não entender | Sim (puro; o lugar certo seria o `compartilhado/`, que este agente não edita) |

**Testes do estilo** (além do modelo de contrato):

- a seta para baixo no teclado marca o próximo lanche e troca o h3 do visor;
- com `foods` vazio, o painel mostra "Nada nesta categoria por enquanto" e o link para `/menu`;
- `diasAbertos("Terça a sexta, das 13h à 01h")` devolve `[1, 2, 3, 4]`, e um texto desconhecido devolve `null`;
- o cabeçalho do painel não mostra "a partir de" nem preço fora das teclas e do visor.

### Dependências novas

Nenhuma. A Home nova deixa de importar `vue3-carousel` e o CSS dele, que continuam no projeto para as outras telas.

---

## 8. Movimento (resumo)

- **Ao carregar:** nada. Sem entrada por seção, autoplay, paralaxe nem tilt [H1][H8].
- **Única coreografia:**
  - escolher um lanche faz a tecla afundar e o visor "receber a pressão": o pulso de profundidade, por opacidade, em `--dur-slow`, só em `motion-ok` e só depois de um gesto;
  - é a única resposta com mais de `--dur-fast` na página, fora o selo do carrinho.
- **Relevo:** as camadas trocam sempre por opacidade de pseudo-elemento [N29], porque a sombra não interpola entre elevada e interna [N22] e animar sombra pesa [N27][N29]. Cor e sombra não têm `transition`.
- **Transform:** `translateY(1px)` no `:active` e a escala do selo do carrinho, ambos dentro de `@include motion-ok`.
- **Reduzido:** sobram as trocas de camada e de face por opacidade, que a regra global encurta. Nada se desloca.

## 9. Acessibilidade (resumo)

- **Estrutura:** landmarks `header`, `nav` "Principal", `main` (da moldura), 4 `section` com `data-secao` e `aria-labelledby`, e `footer` com `nav` "Rodapé".
- **Títulos:** um h1 (hero). Os h2 das seções, os h3 dos grupos e do visor e os h4 de "Ingredientes" e dos itens, sem salto.
- **Clicável e não clicável:** borda de 3:1 só em controle, cor chapada só em ação, e o poço só em leitura [N13][N16]. Contêiner e poço não têm hover.
- **Estados:** o estado nunca depende só de sombra. A tecla marcada tem borda de 2 px e check; o link atual, sublinhado; o adicionado, cor, ícone e texto [N11][N35].
- **Foco:** `outline` próprio de 3 px com 3:1 em todo controle, nunca a sombra inset do hover [N49][N17].
- **Cores forçadas:** toda sombra vira `none`, e contêineres, poços e controles ganham borda em `CanvasText`. A tecla marcada fica em `Highlight` [N20].
- **Mais contraste:** a borda vai a 2 px, a de estado a 3 px, e a tinta suave escurece (já está nos tokens) [N21].
- **Alvos:** pelo menos 44 × 44 px em todo controle (`--target-min`), 56 px nas teclas e no "Adicionar" do visor [N18][N35].
- **Texto sobre foto:** não há. O h1 fica no kraft, e o texto do hero fica no fundo da cova, ao lado do recorte [H5].

## 10. Arquivos para o construtor

```
src/direcoes/estilos/neumorfismo/
  HomeNeumorfismo.vue              Nunito, tokens, useEstiloAtivo("neumorfismo", { esquema: "light" }),
                                   MolduraDirecao com NeuTopo (#topo), as 4 seções e NeuRodape (#rodape);
                                   o layout .moldura e .moldura__conteudo, como na v1
  _tokens.scss                     + os 8 tokens novos (e o reforço de --neu-borda-estado em prefers-contrast)
  textos.js                        TEXTOS: painelLegenda, acompanhamentosTitulo, contatoTitulo,
                                   contatoSubtitulo, diasSemana e rodapeNav (todos "// provisório")
  contraste.js                     + os pares da seção 7
  useLancheNoVisor.js · horario.js
  secoes/NeuSecaoAbertura.vue · NeuSecaoPainel.vue · NeuSecaoAcompanhamentos.vue · NeuSecaoContato.vue
  componentes/NeuTopo.vue · NeuRodape.vue · NeuAcao.vue · NeuControle.vue · NeuTecla.vue · NeuTeclado.vue ·
              NeuVisor.vue · NeuLeitura.vue · NeuFotoPoco.vue · NeuVaga.vue · NeuSemana.vue
  scss/_base.scss                  relevo(), foco(), reserva-sombra() (forced-colors e prefers-contrast), poco()
  scss/_<nome>.scss                uma parcial por componente e por seção
  __tests__/HomeNeumorfismo.test.js
```

- **O que sai:** o `_home.scss` da v1 deixa de ser usado pela Home nova. A decisão de apagá-lo é do construtor ou do orquestrador.
- **Microcopy real:** "Ingredientes", "Adicionais", "Adicionar", "Adicionado" e "Nada nesta categoria por enquanto" são textos que o app já tem. Podem ficar em `textos.js` com o comentário de origem, sem `// provisório`.

## 11. Referências usadas

Paráfrase sempre; nenhuma imagem, ícone, layout ou código foi copiado. Exemplo de galeria só dá o padrão abstrato.

| Ref. | O que é | Padrão abstraído e onde entrou | Publicado ou conceito |
|---|---|---|---|
| [N11]/[N1] | Malewicz, autor do estilo | Cartão como uso principal e estado por ícone, sublinhado ou cor: o check e a borda da tecla, e o sublinhado do link atual | Artigo (fonte) |
| [N13]/[N2] | NN/g | Clicável parecido com não clicável: a gramática da seção 1 | Pesquisa (fonte) |
| [N16]/[N6] | W3C 1.4.11 | 3:1 para borda e indicador de estado: a borda dos controles e a de 2 px da tecla | Referência (fonte) |
| [N20], [N21] | MDN | Borda de reserva em cores forçadas e reforço em mais contraste | Referência (fonte) |
| [N22], [N27], [N29] | MDN, web.dev, Tobias Ahlin | Sombra que não interpola e camadas por opacidade: toda a troca de relevo e o pulso do visor | Referência e praticante (fonte) |
| [N30]/[N3] | CSS-Tricks | `inset` dá o pressionado e o degradê dá o convexo: tecla e controle | Praticante (fonte) |
| [N31], [N37], [N38] | Smashing, Superdesign, Tuts+ | Ação plana em acento e neumorfismo nos contêineres; sombras grandes em poucos contêineres: `NeuAcao` chapado; só o topo e o painel elevados | Praticante (fonte) |
| [N35], [N36] | Setproduct, daisyUI | Interface de propósito único, poucos controles por região, sombra sozinha não é estado: o painel | Praticante (fonte) |
| [N45] | Kit Themesberg, página Sobre | Ícone e foto em poço afundado: `NeuFotoPoco` e o poço do preço (`NeuLeitura`) | Conceito (kit) |
| [N47] | Kit Themesberg, página Contato | Blocos de contato (visitar, ligar e horário, e-mail); aqui viraram controles em relevo, não cartões. O mapa num poço inset (P3, 2 exemplos, não recorrente) é o vizinho da cova do hero, um poço grande com conteúdo dentro | Conceito (kit) |
| [N49] | Kit Themesberg, mixin de botões | No ativo, o degradê sai: a tecla e o controle perdem o convexo ao afundar | Conceito (kit) |
| [N51] | Kit Themesberg, `_nav.scss` | Pílula ativa afunda e troca cores: link atual e tecla marcada | Conceito (kit) |
| [N52] | carlwebdev, demo | Central de controle num cartão: a ideia do painel como aparelho | Conceito (demo) |
| G1 | https://dribbble.com/shots/14238057-Neumorphism-Food-App-Design | Categorias em ladrilhos com o ativo afundado e um único CTA chapado: teclas e `NeuAcao` | Conceito (shot) |
| G2 | https://dribbble.com/shots/9934278-Neumorphism-Style-Food-Ordering-UI | Prato numa cuba circular afundada, vagas rebaixadas e CTA chapado sem relevo: a cova do hero (aqui larga e rasa, não circular), os poços redondos e `NeuAcao` | Conceito (shot) |
| G3 | https://dribbble.com/shots/14444054-Digital-Menu-App-Neumorphic | Preço numa pílula rebaixada: `NeuLeitura` | Conceito (shot) |
| G7 | https://dribbble.com/shots/27120014-Neumorphism-Design-Agency-Website-Website-UI-UX-design | Menu em pílula flutuante: `NeuTopo` (já era assim na v1) | Conceito (shot) |
| [H1][H2][H3] | NN/g | Identidade e ação no topo, sem movimento automático; parte da seção seguinte acima da dobra | Pesquisa (fonte) |
| [H6][H7][H8][H9][H10] | Baymard e NN/g | Contra o carrossel e o autoplay: o teclado e o visor no lugar do carrossel | Pesquisa (fonte) |
| [H14][H15][H17] | NN/g | Links visíveis no celular; cabeçalho fixo só se serve, opaco e baixo | Pesquisa (fonte) |
| [H20][H21][H24] | NN/g e Baymard | Preço e foto na listagem, variedade na Home e personalização descrita: preços nas teclas, acompanhamentos e régua de adicionais | Pesquisa (fonte) |
| [H25][H26][H29][H30][H33][H34] | NN/g, Stanford, WhatsApp, MDN | Contato visível, endereço com mapa, rodapé com navegação, nada de link quebrado ou genérico, aviso de nova aba | Pesquisa e documentação (fonte) |

Nenhum exemplo publicado de Home de comida em neumorfismo foi encontrado (dossiê, "Não encontrei"). Tudo o que veio de galeria é conceito.

## 12. Decidido e fora

- **Sem selo "aberto agora":** o horário passa da meia-noite e não há dado de feriado nem de fuso [H31].
- **Sem switch de tema, FAQ, depoimentos, planos ou combos:** não há conteúdo real, ou é controle que não serve ao pedido (dossiê, catálogo).
- **Sem redes sociais:** os links são genéricos [H25][H26].
- **Sem carrossel:** os 7 lanches ficam no teclado.
- **Sem mapa embutido:** exigiria mudar a CSP; o endereço leva ao Google Maps [H32].
- **Sem leitura de preço nem contagem no cabeçalho do painel:** o menor preço de `foods` é o da Batata Frita, e as teclas já mostram cada lanche com o seu preço (seção 13).
- **Sem o recorte dentro do aparelho:** ficaria ao lado da foto do visor (seção 13).
- **`justificativaEscopo`:** `null`. São 4 seções de conteúdo (3 novas) e 11 componentes.

---

## 13. Revisão do juiz

Revisão de 21/11/2026, com os dois achados do juiz de distinção. Os outros seis desenhos foram relidos para a troca não criar repetição nova.

### Achado 1: a abertura repetia a composição de outros estilos

- **Tipo e gravidade:** repetição, importante.
- **Onde:** seção `abertura`.
- **O problema:**
  - o hero mantinha a composição da v1: duas colunas (`7fr 5fr`), o texto à esquerda e o recorte `banner-burger-bg` à direita, agora numa elipse em vez do prato;
  - é a mesma composição do material e do esqueumorfismo;
  - o escuro já a tinha descartado, por ser a imagem de quase todas as outras Homes.

**O que mudou** (seções 1, 3 e 4.1):

- **Composição:**
  - o h1 fica sozinho no alto;
  - embaixo vem uma cova larga e rasa, na largura toda do container. Ela é prensada no kraft com `--neu-afundado-grande` e tem o raio do aparelho do painel, do qual é o negativo;
  - o lanche fica de pé dentro dela, à esquerda, com o lábio claro por cima da base;
  - o texto e "Ver cardápio" ficam no fundo da cova, ao lado da base;
  - no celular, a ordem é o h1, a cova com o lanche, o texto e a ação.
- **Mecânica:** a cova e o lábio viram camadas no mesmo grid do lanche e do texto. Assim, o mesmo DOM serve a todas as larguras, e a ordem de leitura (h1, recorte, texto e ação) é a da tela.
- **Tokens:** continuam 8, sem nenhum novo.
  - O `--neu-impressao` fica só no pulso do visor; a cova usa o `--neu-afundado-grande`, que já existia.
  - O `--neu-kraft-poco` sai da cova, porque ela tem texto. O fundo é o `--neu-kraft`, e o texto usa o par que já existia, `neu-tinta-suave` sobre `neu-sombra-sob-texto`, a pelo menos `--space-6` da borda.
  - O `--neu-z-labio` também põe o texto por cima do lábio.
- **Medidas:**
  - em 1440, o recorte passa a ter 19 rem; antes, o palco dele chegava a 30 rem. Em 390, passa de 16 para 12 rem;
  - com isso, o h2 do painel continua acima da dobra, perto de 760 px em 1440 e de 750 px em 390, pela conta da seção 4.1. Os `sizes` mudaram junto;
  - o h1 passa de `14ch` para `18ch`, com `text-wrap: balance`, e continua com no máximo 2, 3 e 4 linhas.

**Por que esta saída, e não a outra.** O juiz deu duas. A segunda, a abertura só tipográfica com o recorte dentro do aparelho, caiu por dois motivos:

- a abertura só tipográfica é a do minimalismo (o h1 e o sumário, sem imagem), e o 3D também tirou a imagem do hero;
- dentro do aparelho, o recorte ficaria ao lado da foto do visor: seriam dois hambúrgueres juntos, e o recorte não é nenhum produto do cardápio.

**Conferido contra os outros seis** (os desenhos de `docs/direcoes/desenho/` nesta data):

- **material:** o disco de 12 lobos com o recorte, à direita do texto, num contêiner;
- **esqueumorfismo:** o h1 e o lanche lado a lado na chapa, com o texto e o botão na frente de inox, embaixo;
- **3D:** o h1 e o texto em cima e o palco das pilhas embaixo, sem foto;
- **flat:** o h1 e o texto em cima e o mosaico de ladrilhos embaixo;
- **minimalismo:** só tipografia, com o sumário da página;
- **escuro:** a foto larga do Smash Burger em cima e o texto embaixo, sobre a base sólida.

Nenhum põe o lanche e o texto dentro de um mesmo objeto, sob um h1 sozinho. A cova também não é circular, como a cuba de G2 e os poços redondos dos acompanhamentos.

### Achado 2: "a partir de R$ 10,90" no cabeçalho de "Hambúrgueres"

- **Tipo e gravidade:** infiel, importante.
- **Onde:** seção `painel`, na leitura (`NeuLeitura`) do cabeçalho.
- **O problema:**
  - o menor `price` de `foods` em `products.json` é o da Batata Frita (10.9), e o hambúrguer mais barato é o X-Salada (20.9);
  - sob o h2 "Hambúrgueres", a leitura prometia um preço que nenhum hambúrguer tem;
  - a mesma leitura estava no material e no esqueumorfismo, que também a tiraram nas revisões deles.

**O que mudou** (seções 2, 3, 4.2, 6, 7, 10 e 11):

- **A leitura saiu, sem troca pela contagem.**
  - As 7 teclas logo abaixo já mostram quantos lanches são e o preço de cada um. "7 itens" só repetiria o que está à vista, o mesmo motivo que tirou as contagens na primeira passada (seção 2).
  - A contagem por categoria também é o traço dos ladrilhos do flat.
- **Consequências:**
  - saem o texto provisório `aPartirDe`, a função `menorPreco`, o arquivo `precos.js` e o teste dela;
  - o `NeuLeitura` fica só com o preço do visor, e só com a prop `valor`;
  - o [N53] e o padrão P5 (faixa de números) deixam de ser usados no painel.
- **Teste novo:** o cabeçalho do painel não mostra "a partir de" nem preço fora das teclas e do visor.

### O `neumorfismo.json`

Não mudou, e continua coerente com este desenho:

- os `data-secao` e a ordem das seções são os mesmos;
- o `h1MaxLinhas` (2, 3 e 4) vale para o h1 sozinho no alto;
- os dois estados (o segundo lanche no visor, por clique e pelas setas) não dependem da abertura nem da leitura que saiu. O seletor deles usa o `div.neu-teclado__teclas`, que a seção 4.2 passou a nomear, para o construtor criar a classe que o P6 procura.

## Notas da construção (W4, 21/11/2026)

A Home foi construída em 2 rodada(s) pelo W4 (construtor ou corretor, portões independentes e crítico). Soma das notas do crítico por rodada: 24, 25 (a v1 do piloto somava 16). Última avaliação: {"qualidade":4,"originalidade":4,"execucao":4,"funcionalidade":4,"estilo":5,"desenho":4}.

### Desvios do construtor em relação a este desenho

- (rodada 1) Lábio da cova (4.1): no lugar do clip-path: inset(50% 0 0 0) seco, uso uma máscara em degradê (transparente até 50% e opaco a partir de 80%), e o --neu-labio ficou só 'de baixo' (inset 0 -14px 28px, sem o deslocamento em x). Com o corte seco e o deslocamento em x, apareciam degraus claros nas laterais da cova, a meia altura, nas capturas de 1440 e de 390. O lábio continua claro, por cima da base do lanche.
- (rodada 1) Visor a partir de lg (4.2): o visor estica até a altura da coluna das teclas, e a foto ocupa a altura toda da tela do aparelho (o 4:3 vira mínimo, com min-height de 15 rem e object-fit: cover, via :deep na janela do NeuFotoPoco). O preço e 'Adicionar' descem para o pé da coluna de texto. Sem isso, sobrava uma faixa vazia de uns 140 px no visor ao lado das 7 teclas (lição 7).
- (rodada 1) Grid do visor em 1440: 0.9fr 1fr no lugar de 1.1fr 1fr, para a leitura do preço e 'Adicionar' caberem na mesma linha. Com 1.1fr, a coluna do texto tinha uns 300 px e os dois se empilhavam.
- (rodada 1) Medidas em 390 para a linha do preço e 'Adicionar' caber numa linha (wireframe de 390): padding do aparelho em --space-5 --space-4 (era --space-5), padding do visor em --space-3 abaixo de md (--space-6 a partir de md), padding lateral do NeuLeitura em --space-3 abaixo de md e --space-4 a partir de md, e NeuAcao tamanho g com --space-4 abaixo de md e --space-5 a partir de md (o desenho não fixava; a largura é a da face 'Adicionado', a maior). A altura de 3,5 rem continua.
- (rodada 1) Teclas em 390: o poço do check tem 1,75 rem abaixo de md (2 rem a partir de md), o nome tem 16 px abaixo de md e os espaços são de --space-2. A label é grid, para teclas vizinhas terem a mesma altura. Nomes como 'Cheese Bacon' quebram em duas linhas em 390, o que o desenho permite ('nome longo quebra').
- (rodada 1) Contatos (4.4): WhatsApp e e-mail mostram o rótulo (TEXTOS.whatsapp e TEXTOS.email, provisórios) e o valor (TELEFONE e EMAIL de dados.js) separados, no lugar do CONTATOS.texto com '·' (lição 4). O link do endereço mostra ENDERECO. O href, o ícone e o externo continuam vindo de CONTATOS.
- (rodada 1) Visor sem ingredientes: o h4 'Ingredientes' some junto com a lista, e entra só a descrição, para não pôr um título 'Ingredientes' em cima de uma descrição.
- (rodada 1) Acompanhamentos de md a lg: cada grupo usa um grid de 3 colunas (que quebra em linhas se houver mais itens), no lugar de uma coluna por item. Assim a sobremesa sozinha não fica centrada na largura toda. A partir de lg, os grupos ficam lado a lado, com a largura proporcional ao número de itens (minmax(0, Nfr) auto minmax(0, Nfr), por uma propriedade CSS inline), como no 3fr auto 1fr do desenho.
- (rodada 1) Ritmo vertical: a distância entre as seções sai do gap do <main> (--space-7, e --space-8 a partir de lg). A abertura não tem padding-block próprio: o padding de cima do <main> faz esse papel (--space-4, e --space-5 a partir de lg). O h2 do painel fica perto de 740 px em 1440 e aparece acima da dobra em 390 e em 1024.
- (rodada 1) Tokens além dos 8 do desenho: --neu-titulo-secao (h2 de 28 a 36 px), --neu-titulo-grupo (h3 de 21 a 24 px) e --neu-leitura (24 px), todos com o prefixo --neu-. O --neu-borda-estado entra na tecla por uma propriedade local (--neu-tecla-borda), e o padding desconta a espessura da borda para o texto não pular. Os tokens aprovados não mudaram, e a ficha.js não foi editada.
- (rodada 1) contraste.js: saíram os pares da v1 que não são mais usados (setas e ponto da paginação do carrossel), e entraram os pares da seção 7 do desenho (o selo do carrinho usa o par neu-branco/neu-ketchup, de 4,5).
- (rodada 1) textos.js: além dos textos provisórios do desenho, entraram whatsapp e email (provisórios) e os textos que o app já tem (adicionar, adicionado, ingredientes, adicionais e vazio), com a origem num comentário. 'Horário e contato' continua com este estilo, pela decisão de 21/11, registrada num comentário.
- (rodada 2) Painel a partir de lg: o corpo (.neu-painel__corpo) ganhou align-items: start. O visor fica alinhado ao topo e tem a altura do próprio conteúdo, sem esticar até a altura da coluna de 7 teclas. Medido: 331 px de visor contra 530 px de teclas em 1440, e 484 contra 530 em 1024.
- (rodada 2) Foto do visor: saiu o bloco de lg que esticava a foto (align-self: stretch, aspect-ratio: auto e min-height). A janela volta ao 4:3 do NeuFotoPoco em toda largura: 283 x 213 px em 1440 e 248 x 186 px em 1024. O Cheese Bacon aparece inteiro.
- (rodada 2) Linha do preço e do Adicionar: em lg saíram o margin-top: auto e o padding-top. A linha vem logo depois dos ingredientes, com o margin-top de --space-5 de sempre. Em lg+ fica justify-content: flex-start; em 390 continua space-between, como o desenho pede.
- (rodada 2) Efeito colateral em 1440: sobram uns 200 px de superfície do aparelho embaixo do visor, ao lado das últimas teclas, porque um visor 4:3 não alcança a altura da coluna de 7 teclas. É superfície do aparelho, não um poço esticado e vazio. Se o crítico reclamar, a saída seria levar a régua de adicionais para a coluna da direita, embaixo do visor. Isso muda a composição do desenho (régua na largura toda), por isso não foi feito.
- (rodada 2) Dobra de 900 em 1440: o painel começa em y 793. A foto agora mostra o lanche, mas a linha do preço e do Adicionar continua abaixo da dobra (y 1036), porque isso depende da posição do painel na página, não do visor.
- (rodada 2) Em 1024, a coluna de texto do visor tem 264 px, e o preço e o Adicionar quebram em duas linhas, um embaixo do outro, logo depois dos ingredientes.

### O que o crítico deixou na última rodada

- (menor) rodada anterior / painel / visor / fatia-1440-01, fatia-1440-02, janela-1024, estado-adicionado: Resolvido. A foto do visor agora sai em 4:3 (cerca de 283×212 px em 1440), o Cheese Bacon aparece inteiro e a linha com o preço e o Adicionar vem logo depois dos ingredientes, sem o vão de cerca de 230 px. O que sobrou entra no item abaixo.
- (menor) painel / visor / fatia-1440-02 (e o fundo do estado-modal): Como o visor foi alinhado ao topo e a coluna das 7 teclas é mais alta, ficam cerca de 200×728 px de kraft vazio embaixo do visor, dentro da peça principal da página, que por isso parece desequilibrada. A coluna da foto também ficou mais estreita que o `1.1fr 1fr` do desenho (cerca de 39% do visor). Correção: usar o `1.1fr 1fr` do desenho, para a foto crescer (cerca de 340×255 px) e o visor ganhar altura, e, se ainda sobrar vão, deixar o visor `position: sticky` dentro da coluna ou centralizá-lo na altura das teclas.
