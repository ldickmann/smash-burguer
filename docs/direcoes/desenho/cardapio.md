# Desenho do Cardápio e do modal Personalizar: Material 3 Expressive (etapa 6)

21/11/2026. Desenho das duas telas reais que faltam no caminho do pedido: o Cardápio (`#/menu`) e o modal Personalizar (`ModalAdditional`). A Home (etapas 5 e 5a) e a moldura (etapa 4) já estão no M3. Fontes: `docs/direcoes/SPEC-material.md` (SPEC-M), `SPEC.md` (a Brasa, para o fluxo e os textos), `docs/direcoes/desenho/material.md` (o desenho da Home), `docs/direcoes/pesquisa/material.md` ([53] a [117]; a seção da etapa 6 traz [88] a [117]), `docs/direcoes/PESQUISA.md` ([1] a [36]) e `docs/direcoes/pesquisa/home-delivery.md` ([H…]).

**Resumo:**

- **Cardápio:** sai o banner com foto. Fica um cabeçalho de texto (o `h1` "Cardápio" e a `FRASE_CARDAPIO`) direto na superfície, o grupo de categorias e a grade de `M3CartaoLanche` comuns, em 2, 3 e 4 colunas, sem destaque.
- **Grupo de categorias:** visual de grupo conectado [54], com semântica de rádio nativo num `fieldset` (o padrão do `PaymentMethodPicker`). O `aria-pressed` sai. O marcado é uma pílula `primary`, sem contagem, e o grupo continua grudando, com uma altura de token que entra no `scroll-padding-top` da rota.
- **Hierarquia:** um `h2` escondido com o rótulo da categoria nomeia a região da grade, e os cards continuam com o `h3`.
- **Card:** recomendo o nome em Medium (500) [1], o que muda também a Home (em aberto, 6.d). Proponho mostrar a descrição abaixo de `md` quando o produto não tem a folha (as bebidas).
- **Modal:** o montador fica (decisão f), sobre um "prato" em `surface-container-lowest`, e a foto vira `M3Foto`. Os ingredientes viram linhas de checkbox do M3 [113] num bloco branco, com a linha inteira como alvo [111]. Os adicionais viram lista segmentada [66][81]. O CTA filled M já existe e o "·" fica.
- **Fica para outras etapas:** a 8 desenha a "Observação" (`FormGroup`); a 10, o `BaseDialog`, o `QuantityStepper` e o `EmptyState` (o desenho supõe a superfície e a API de hoje); a 11 apaga o `BannerComponent`, o `--gradient-scrim`, a variante `menu` do `ProductCard` e o `useTilt` e decide os apelidos que o `BurgerStack` lê (seção 11).

---

## 1. Tese

**A tese do SPEC-M vale como está:** a ousadia fica no hero da Home, e o resto é quieto (SPEC-M §0, "Tese"). Nas duas telas, isso quer dizer:

- **Cardápio:** é uma tela de tarefa. Não tem prensa, cookie nem contêiner de cor: o título é texto sobre a superfície, e o único gesto do Expressive é a troca de forma da categoria marcada [54]. A grade é a do feed sem destaque, porque no cardápio os itens são equivalentes [64].
- **Modal:** é a personalização. O traço próprio dele é o montador (decisão f), que mostra o que se tira e o que se acrescenta [FLX-02]. Ele ganha um "prato" tonal, e as opções viram as peças do sistema: linhas de checkbox e lista segmentada. O CTA continua o filled M, o maior controle da tela.
- **Sem:** foto atrás de texto [H5], entrada animada de seção, hover nos cards, sombra fora do que flutua [1][13] e `primary` fora de ação. A opção marcada do grupo em `primary` é exceção a essa regra, **em aberto** para o usuário (§12 b).

### O que muda da Brasa

| Na Brasa (captura `menu-*` e `modal-*` da 5a) | No M3 | Por quê |
|---|---|---|
| Banner de 220 a 340 px com a foto `banner-burger-black`, scrim e o título branco sobre ela | Cabeçalho de texto: `h1` em display-s/display-m e a frase em body-l, na `surface`, sem foto nem contêiner | O texto nunca fica sobre a foto [H5]. Os produtos sobem: em 390, a grade começa por volta de 245 px (hoje, 385) |
| Abas `BaseButton` com `pressed`, em retângulo da Brasa (`.btn--legado`), separadas por 8 px | Grupo conectado: vão de 2 px, formas de início, meio e fim, e a marcada em pílula `primary` [54][105] | O grupo conectado substitui os segmented buttons [54] |
| `role="group"` com toggles (`aria-pressed`) | Rádios nativos num `fieldset` com `legend` "Categorias" | Escolha exclusiva é rádio na APG [93] e no Compose [54][100]; o nativo traz o teclado e o estado [92][96] |
| `ProductCard variant="menu"` com tilt e flip, em 1, 2, 3 e 4 colunas | `M3CartaoLanche` comum em 2, 3 e 4 colunas, com o split e a folha | Os mesmos cards do feed [63][64]; saem o tilt e o flip (SPEC-M §7.8) |
| Modal: montador solto à esquerda; foto em `<picture>` com canto 12 | Montador sobre um prato `surface-container-lowest` de canto 28 (16 abaixo de `md`); foto em `M3Foto` 4:3 com o mesmo canto | A foto e o montador ocupam a mesma moldura; contenção [66] |
| Checkbox quadrado de 24 px em `primary`, com o check girado por `transform` fora do `motion-ok` | Linha de 48 px com camada de estado e anel; caixa de 24 px, canto de 2 px [113], contorno `on-surface-variant` e check do Font Awesome | Checkbox do M3 [113]; a linha é o alvo [111]; sem `transform` parado |
| Adicionais em linhas separadas por borda | Lista segmentada: blocos brancos, cantos 20/4, vão de 2 px | Listas agrupadas do M3E [66][81] |
| CTA "Adicionar · R$ x" em pílula | O mesmo `BaseButton` filled M (`size="lg" block`) | Já é o M3 (§4.1 do SPEC-M); o texto fica (6.h) |

---

## 2. Processo: plano, revisão contra o pacote e desenho final

### Sistema (dentro da identidade aprovada; nenhuma cor nova)

- **Cores, por papel:**
  - Fundo e barra das categorias (`surface`) #f7fbf1;
  - Opção desmarcada (`surface-container`) #ebefe6, com a tinta (`on-surface-variant`) #424940;
  - Opção marcada e caixa marcada (`primary`) #3a693b, com o check e o rótulo (`on-primary`) #ffffff;
  - Prato, bloco dos ingredientes e linhas dos adicionais (`surface-container-lowest`) #ffffff;
  - Tinta (`on-surface`) #181d17.
- **Tipo:** Roboto, uma família. O `h1` usa a regra global (`--text-page`, de display-s a display-m, peso 500). Títulos das seções do modal em title-m 500 (a regra global do `h3`), opções em label-l 500 e linhas em body-l.
- **Layout:** tudo alinhado à esquerda, no `.container`. A grade é a do feed (2, 3 e 4 colunas). No modal, as duas colunas de hoje (2fr e 3fr) a partir de `md`, e o sheet abaixo.
- **Princípio:** uma coisa memorável por tela, e quieta. No Cardápio, a pílula da categoria marcada, que troca de forma. No modal, o montador no prato.

### Plano (primeira passada)

1. Cabeçalho num contêiner `primary-container` de canto 48, com um cookie pequeno ao lado do `h1`.
2. Grupo de categorias com a contagem no botão ("Hambúrgueres 7"), mantendo o `aria-pressed`.
3. Marcada em `secondary-container`, como o item atual da pílula, e as outras em `surface-container`.
4. Um `h2` visível com o rótulo da categoria acima da grade.
5. Modal: ingredientes e adicionais na mesma lista segmentada, em uma coluna; caixa de 18 px do M3; a linha do adicional vai para `secondary-container` quando a quantidade passa de 0.
6. Foto em 16:9 abaixo de `md`, como hoje.
7. CTA "Adicionar R$ 25,99", sem o "·".

### Revisão contra o pacote (o que saiu genérico, repetido, inventado, infiel ou inviável, e o que entrou)

- **Contêiner `primary-container` com cookie: saiu (repetição).** Repete o hero da Home, que é o único lugar da ousadia (SPEC-M §0; pacote, 6.a). Entrou o texto sobre a superfície.
- **Contagem no botão: saiu.**
  - A grade mostra a categoria inteira (`SPEC.md` §5.3), e a contagem só repetiria o que está à vista. O juiz tirou o "7 itens" do feed pelo mesmo motivo (desenho da Home, §13).
  - A contagem é traço do acervo: está na etiqueta do esqueumorfismo e era o dos ladrilhos do flat (desenho da Home, §13).
  - Os três rótulos deixariam de caber numa linha em 390.
- **Marcada em `secondary-container`: trocada.** A troca de fundo sozinha não passa na 1.4.1 [98][99], e `secondary-container` contra `surface-container` não chega à diferença de luminância de 3:1 [99]. Ficaria só a forma; o check do segmented [102] mudaria a largura do item marcado e o encaixe em 390. Entrou a marcada em `primary` (5,52:1 contra a desmarcada, medido), com a troca de forma.
- **`aria-pressed`: trocado por rádio nativo.** A APG não trata vários toggles como seleção única [90] e usa rádio no caso equivalente [93]. Inferência: com `aria-pressed`, nada diz ao leitor de tela que só um vale.
- **`h2` visível: trocado por um `h2` escondido.** O rótulo da categoria já está na opção marcada, logo acima. Repetido em título, ele dobraria o texto na tela.
- **Ingredientes e adicionais na mesma lista: trocado.** São tarefas diferentes: tirar (marcar e desmarcar) e acrescentar (contar). Em uma coluna, os 8 ingredientes do X-Salada somariam cerca de 400 px. Ficou um bloco de linhas de checkbox em 2 colunas a partir de `sm`, como hoje, e a lista segmentada só nos adicionais.
- **Caixa de 18 px: trocada por 24 px.** O critério 3 da §1.1 do SPEC-M pede checkbox de pelo menos 24 × 24. O canto de 2 px fica do M3 [113].
- **Linha do adicional em `secondary-container`: saiu.** Repetiria só a cor como sinal [98][99], e o `QuantityStepper` que a §4.2 recomenda é tonal (`secondary-container`): os botões sumiriam no fundo da linha. O estado é o número do stepper.
- **Foto 16:9 abaixo de `md`: trocada por 4:3.** A `M3Foto` tem a proporção por prop, sem troca por largura. As fotos são 4:3 (960 × 720), e 4:3 mostra o produto inteiro.
- **CTA sem "·": saiu.** É o rótulo padronizado do `SPEC.md` §8 [CON-09], e a legenda do montador, que não muda, também usa " · " (6.h).

### Desenho final

As seções 3 a 12 abaixo. As decisões do pacote (item 6) estão em 5.1 (a), 5.2 (b), 5.3 (c, d, e, f), 5.5 (g, h, i) e 4 (j), e em uma linha cada na seção 12.

---

## 3. Composição

### Cardápio (`#/menu`)

1. **Cabeçalho da página** (`div.menu-page__cabecalho.container`): o `h1` "Cardápio" e a frase.
2. **Grupo de categorias** (`CategoryTabs`): barra opaca, que gruda no topo abaixo de `lg` e abaixo do cabeçalho a partir de `lg`.
3. **Região da grade** (`section[aria-labelledby="menu-categoria-titulo"]`): o `h2` escondido, a grade de cards ou o `EmptyState`.
4. **Modal** (`ModalAdditional`), aberto pelo "Adicionar" de qualquer card.

Ritmo vertical: o cabeçalho começa a `--space-5` do topo abaixo de `md` e a `--space-7` a partir dele; a frase fica a `--space-2` do `h1`; o grupo tem `--space-3` em cima e embaixo; a grade fica a `--space-3` do grupo abaixo de `md` e a `--space-5` a partir dele; a página termina com `--space-8`, como hoje.

### Wireframe do Cardápio em 1440

```
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│ header (sticky, 64 px, surface)                                                            │
│ Smash Burger                                 ( ⌂ Início | ⑂ Cardápio | ◯ Entrar )  [🛒]    │
│                                                  "Cardápio" atual: secondary-container      │
├───────────────────────────────────────────────────────────────────────────────────────────┤
│ [cabeçalho da página] na surface, sem foto e sem contêiner                ↕ --space-7       │
│ Cardápio                        h1, --text-page (display-m 45/52 em 1440), 500, on-surface │
│ Escolha, personalize e peça.    body-l 16/24, on-surface-variant                           │
│                                                                            ↕ --space-3      │
│ [grupo] barra sticky (top: --navbar-h), surface, 68 px de altura                           │
│ (  Hambúrgueres  )┃[  Bebidas  ]┃[  Sobremesas  ⟩                                          │
│  marcada: pílula    meio: cantos   fim: cantos de dentro 8, de fora redondos               │
│  primary            de 8           (desmarcadas em surface-container)                      │
│ ─────────────── borda de 1 px em outline-variant, só quando grudada ───────────────────── │
│ [região "Hambúrgueres"] h2 escondido                                       ↕ --space-5      │
│ ┌ card ──────────┐ ┌ card ──────────┐ ┌ card ──────────┐ ┌ card ──────────┐               │
│ │╭ foto 4:3, 28 ╮│ │╭──────────────╮│ │╭──────────────╮│ │╭──────────────╮│               │
│ │╰──────────────╯│ │╰──────────────╯│ │╰──────────────╯│ │╰──────────────╯│               │
│ │Cheese Bacon    │ │Smash Burger    │ │Veggie Burger   │ │X-Salada        │ title-l 500   │
│ │descrição, 2 l. │ │descrição, 2 l. │ │descrição, 2 l. │ │descrição, 2 l. │ body-m        │
│ │R$ 25,99        │ │R$ 22,50        │ │R$ 24,90        │ │R$ 20,90        │ title-m 500   │
│ │(Adicionar┃⌄)   │ │(Adicionar┃⌄)   │ │(Adicionar┃⌄)   │ │(Adicionar┃⌄)   │ split S       │
│ └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘               │
│ ┌ Chicken Burger ┐ ┌ Burger Picanha ┐ ┌ Batata Frita   ┐                                  │
│ │ …              │ │ …              │ │ …              │  a última linha alinha ao início  │
│ └────────────────┘ └────────────────┘ └────────────────┘                                  │
│                                                                            ↕ --space-8      │
│ ╭ rodapé (decisão g): marca, descrição, horário e contato, direitos ─────────────────────╮ │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

Legenda: `┃` é o vão de 2 px (`--m3-vao-segmento`); `(  )` é a pílula inteira; `[  ]` e `[  ⟩` são as formas de meio e de fim do grupo conectado. O Smash Burger aqui é um card comum, na ordem do JSON. O peso do nome (500 no wireframe) é a recomendação da 6.d, **em aberto**: 400 ou 500.

### Wireframe do Cardápio em 390

```
┌──────────────────────────────────┐
│ Smash Burger                     │  header estático, 64 px
│                       ↕ --space-5│
│ Cardápio                         │  h1, display-s 36/44, 500
│ Escolha, personalize e peça.     │  body-l, on-surface-variant
│                       ↕ --space-3│
│(Hambúrgueres)┃[Bebidas]┃[Sobremesas⟩ grupo na largura toda (358 px), 44 px;
│──────────────────────────────────│  gruda em top: 0, com a borda
│ ┌ card ────────┐┌ card ────────┐ │  2 colunas, --space-3
│ │╭ foto 4:3 16╮││╭────────────╮│ │
│ │Cheese Bacon  ││Smash Burger  │ │  title-m 400 ou 500 (6.d, em aberto), até 2 linhas
│ │R$ 25,99      ││R$ 22,50      │ │  sem descrição: a folha faz o papel dela
│ │(Adicionar┃⌄)││(Adicionar┃⌄)│ │
│ └──────────────┘└──────────────┘ │
│ … Veggie, X-Salada, Chicken, Picanha
│ ┌ Batata Frita ┐                 │  sozinha na última linha
│ ╭ rodapé ──────────────────────╮ │
│ ╰──────────────────────────────╯ │
│ AssinaturaEncaixe                │
│         ╭⌂ ┃⑂ ┃◯ ╮ ╭──╮          │  toolbar flutuante; "Cardápio" atual
│         ╰───────────╯ ╰──╯       │
└──────────────────────────────────┘
```

Em "Bebidas", a 390: os três cards sem ingredientes têm o split de uma metade só (o "Adicionar" redondo) e, pela proposta de 6.e, a descrição ("Copo de refrigerante 500ml").

### Cardápio em 1024

- **Cabeçalho do site:** sticky, com a pílula ancorada (a partir de `lg`).
- **Cabeçalho da página:** o `h1` em `--text-page` (45 px nessa largura, o limite do clamp) e a frase.
- **Grupo:** com a largura do conteúdo, alinhado ao início, e grudado em `top: var(--navbar-h)`.
- **Grade:** 3 colunas, `--space-5`. Os 7 hambúrgueres em 3 + 3 + 1; as bebidas numa linha só.
- **De `md` a `lg` (768 a 1023):** o cabeçalho do site rola; o grupo gruda em `top: 0`; a grade tem 2 colunas com `--space-5`; a toolbar flutua embaixo.

### Modal (dentro do `BaseDialog`)

Ordem: a coluna visual (montador ou foto) e as opções. As opções, de cima para baixo, como no `SPEC.md` §5.4: descrição, ingredientes (hambúrgueres e sobremesas), adicionais (idem), quantidade (bebidas) e observação. O CTA fica no rodapé fixo do diálogo.

### Wireframe do modal em 1440 (hambúrguer)

```
┌──────── BaseDialog (etapa 10: contêiner, cabeçalho, fechar, fundo, rodapé), até 880 px ────────┐
│ Cheese Bacon                                                                       [✕]          │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ╭ prato: surface-container-lowest, canto 28 ╮  Hambúrguer artesanal com queijo e bacon          │
│ │                                           │  crocante, alface, tomate e maionese              │
│ │                                           │  body-l, on-surface-variant                       │
│ │        BurgerStack (220 px, sem mudança)  │                              ↕ --space-6          │
│ │                                           │  Ingredientes                 title-m 500         │
│ │                                           │  Desmarque o que quiser tirar  body-m             │
│ │        Sem tomate                         │  ╭ surface-container-lowest, canto 20 ──────────╮ │
│ ╰───────────────────────────────────────────╯  │ ☑ Pão de hambúrguer   ☑ Hambúrguer artesanal │ │
│   2fr (sticky no topo do corpo)                │ ☑ Queijo              ☑ Bacon                │ │
│                                                │ ☑ Alface              ☐ T̶o̶m̶a̶t̶e̶              │ │
│                                                │ ☑ Maionese                                   │ │
│                                                ╰──────────────────────────────────────────────╯ │
│                                                 Adicionais                    title-m 500       │
│                                                 ╭ Bacon                       [−] 0 [+] ╮       │
│                                                 │ + R$ 3,50                             │       │
│                                                 ├ Ovo                         [−] 0 [+] ┤       │
│                                                 │ + R$ 2,50                             │       │
│                                                 …  Queijo, Queijo Cheddar                       │
│                                                 ╰ Cebola Caramelizada         [−] 0 [+] ╯       │
│                                                 Observação (FormGroup, etapa 8)                 │
│                                                 [ textarea de 3 linhas            ]  0/140      │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ (                              Adicionar · R$ 25,99                              )  filled M     │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Legenda: `☑` e `☐` são as caixas de 24 px; cada linha de ingrediente tem 48 px e é o alvo inteiro. `╭ ├ ╰` marcam os itens da lista segmentada (cantos 20 por fora e 4 por dentro, vão de 2 px). O stepper é o de hoje até a etapa 10.

**Bebida em 1440:** a coluna visual é a `M3Foto` 4:3 com canto 28, na largura da coluna; as opções são a descrição, "Quantidade" com o stepper de 1 a 10 e a observação. **Sobremesa:** a foto, os 3 ingredientes e os 7 adicionais. **Batata Frita:** a foto, a descrição e a observação.

### Wireframe do modal em 390 (sheet)

```
┌──────────────────────────────────┐
│ Cheese Bacon                 [✕] │  BaseDialog (etapa 10)
├──────────────────────────────────┤
│ ╭ prato lowest, canto 16 ──────╮ │
│ │      BurgerStack (160 px)    │ │
│ │      Do jeito da casa        │ │
│ ╰──────────────────────────────╯ │
│ Hambúrguer artesanal com queijo  │  body-l
│ e bacon crocante, alface, tomate…│
│ Ingredientes                     │  title-m 500
│ Desmarque o que quiser tirar     │  body-m
│ ╭ lowest, canto 20 ────────────╮ │
│ │ ☑ Pão de hambúrguer          │ │  1 coluna, linhas de 48 px
│ │ ☑ Hambúrguer artesanal       │ │
│ │ ☑ Queijo …                   │ │
│ ╰──────────────────────────────╯ │
│ Adicionais                       │
│ ╭ Bacon          [−] 0 [+] ╮     │  nome e "+ R$" à esquerda, stepper à direita
│ │ + R$ 3,50                │     │
│ ├ Ovo …                    ┤     │
│ ╰ Cebola Caramelizada …    ╯     │
│ Observação                       │
│ [ textarea ]            0/140    │
├──────────────────────────────────┤
│ (     Adicionar · R$ 25,99     ) │  filled M, 56 px, block
└──────────────────────────────────┘
```

Bebida em 390: a foto 4:3 na largura do corpo (cerca de 342 × 256), a descrição, a quantidade e a observação; o conteúdo cabe no sheet de 844 px sem rolar (estimativa pela captura `modal-bebida-390-viewport.png`).

### Modal em 1024

O diálogo tem os mesmos 880 px de 1440, e o layout é o mesmo. A janela de 768 px de altura deixa o corpo mais curto, com mais rolagem; o prato continua grudado no topo do corpo. De `md` a `lg`, o diálogo ocupa a largura menos as margens (`--gutter`), com as duas colunas.

---

## 4. Navegação (a moldura nesta rota)

- **Sem mudança na moldura:** `M3BarraSuperior` e `M3BarraFerramentas` como na etapa 4. O item "Cardápio" da pílula fica com `aria-current="page"`, em `secondary-container` (SPEC-M §4.1).
- **Dois elementos fixos abaixo de `lg`:** o grupo grudado no topo e a toolbar flutuante embaixo à direita. A partir de `lg`, o cabeçalho e o grupo grudam juntos no topo.
- **Foco não coberto (2.4.11 [76]; decisão j):**
  - **Altura do grupo grudado:** a opção de 44 px (`--target-min`) mais `--space-3` em cima e embaixo, ou 68 px, mais a borda de 1 px. Vira o token de layout `--m3-categorias-altura: calc(var(--target-min) + 2 * var(--space-3))`.
  - **Abaixo de `lg`:** o `scroll-padding-top` global (80 px) cobre os 69 px por coincidência de valores. Na rota, passa a ser `calc(var(--m3-categorias-altura) + var(--space-4))` (84 px), para depender do token e não da coincidência.
  - **A partir de `lg`:** o cabeçalho (64 px) e o grupo somam 133 px, e os 80 px de hoje não bastam. Um split de 44 px rolado até 80 px do topo ficaria inteiro debaixo do grupo (de 64 a 133 px), o que falha na 2.4.11. Na rota, passa a ser `calc(var(--navbar-h) + var(--m3-categorias-altura) + var(--space-4))` (148 px).
  - **Onde:** no `_menu-page.scss`, por `:global(html:has(.menu-page))`, a técnica C43 [76]. O seletor só vale com a view montada, sem JS. O `:has()` já é a técnica do SPEC-M para o anel do `PaymentMethodPicker` (§6).
  - **No pé:** o `scroll-padding-bottom: var(--m3-barra-reserva)` e a reserva do layout, de hoje, já cobrem a toolbar.
- **Sheet do modal:** o diálogo fica na *top layer* (`showModal()`), e o fundo cobre a toolbar e o grupo. Dentro dele, o corpo é o contêiner de rolagem e termina acima do rodapé: o CTA nunca cobre um campo focado. A folga da rolagem dentro do corpo é do `BaseDialog` (etapa 10).

---

## 5. Blocos

### 5.1 Cabeçalho da página (e a decisão do banner)

- **Arquivo e raiz:** `src/views/MenuView.vue`, `div.menu-page__cabecalho.container`, primeiro filho de `div.menu-page`. Parcial: `pages/_menu-page.scss`.
- **Objetivo:** dizer onde se está e o que se faz aqui, sem tirar os produtos da primeira tela [H1].

**Conteúdo:**

| Campo | Origem |
|---|---|
| `h1` "Cardápio" | `MenuView.vue` (hoje, prop `title` do `BannerComponent`) |
| Frase "Escolha, personalize e peça." | `textosLoja.js` → `FRASE_CARDAPIO` |

**Decisão do banner (6.a): sai.**

- **Por quê:** o texto não fica sobre a foto [H5] (SPEC-M §4.2), e o hero da Home é o único lugar da imagem grande. Sem o banner, a grade sobe cerca de 140 px em 390 e 200 px em 1440 (capturas `menu-390-viewport.png` e `menu-1440-viewport.png`).
- **O que sai na etapa 11:** o `BannerComponent.vue` (a variante `hero` já não tem uso desde a etapa 5), o `_banner.scss`, o `BannerComponent.test.js` e o `--gradient-scrim` (SPEC-M §4.4).
- **A imagem `banner-burger-black`** (960, 1440 e 1920 em WebP e 1440 em JPG) fica sem uso e **fica no repositório**: os arquivos otimizados da §9 do `SPEC.md` ficam como estão (SPEC-M §9), e o desenho da Home a lista entre as imagens reais (§5.6 de lá). Tirá-la é decisão do usuário na limpeza.
- **O que entra no lugar:** texto direto na superfície. Não repete o hero: sem contêiner, sem cor de fundo, sem forma e sem foto.

**Componentes:** nenhum (um `h1` e um `p`).

**Tipografia por papel:**
- `h1`: a regra global (`base/_typography.scss`): `--text-page`, de display-s 36/44 a display-m 45/52 [1], peso 500, `on-surface`;
- frase: body-l 16/24 [1], `on-surface-variant`, `max-width: 40ch`.

**Acessibilidade:** o único `h1` da página. A frase é `p`. Pares: `on-surface` sobre `surface` (16,31) e `on-surface-variant` sobre `surface` (8,86), que já existem.

**Comportamento:** 1440 e 1024 com `--space-7` em cima; 390 com `--space-5`. Alinhado à esquerda, no `.container`.

**Movimento:** nenhum.

**Reserva:** nenhuma (texto fixo).

### 5.2 Grupo de categorias (`CategoryTabs`)

- **Arquivo e raiz:** `src/components/ui/CategoryTabs.vue` e `components/ui/_category-tabs.scss`. Raiz: a sentinela (`div.category-tabs__sentinel`, sem mudança) e `div.category-tabs` (a barra) → `div.category-tabs__inner.container` → `fieldset.category-tabs__grupo`.
- **Objetivo:** trocar a grade entre as três categorias reais, sempre à mão (grudado) e com o escolhido legível sem depender da cor.
- **API (decisão j):** a mesma: `v-model` (`modelValue`, String, obrigatório) e `options` (Array de `{ value, label }`, obrigatório). A `MenuView` passa a montar as opções do `CATEGORIAS`.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Rótulos | `textosLoja.js` → `CATEGORIAS[].rotulo` ("Hambúrgueres", "Bebidas", "Sobremesas") |
| Valor | `CATEGORIAS[].chave` (`foods`, `drinks`, `desserts`) |
| Nome do grupo | "Categorias" (o `aria-label` de hoje vira a `legend`, escondida) |

**Semântica (6.b): rádio nativo.**

- **Estrutura:** `fieldset.category-tabs__grupo` → `legend.visually-hidden` "Categorias" → um `label.category-tabs__opcao` por opção → `input[type=radio].visually-hidden` (`name="categoria"`, `:value`, `:checked`, `@change` emite `update:modelValue`) e `span.category-tabs__rotulo`.
- **Por quê:**
  - é escolha exclusiva: a APG usa rádio no caso com cara de toggle [93], e o Compose marca o grupo conectado de seleção única com o papel de rádio [54][100];
  - nativo, o teclado e o estado vêm do navegador [92][96], e a `legend` dá o contexto do grupo [95]. Um `radiogroup` feito à mão deixaria o teclado e o foco itinerante por conta do código [88][89][92];
  - é o padrão que o projeto já tem no `PaymentMethodPicker` (`fieldset`, rádios `.visually-hidden` no mesmo `name`, anel no `label` por `:has(:focus-visible)`), que os e2e já sabem medir (`ringOf` e `coveredBy` sobem do `input.visually-hidden` ao `label`).
- **Por que não as abas:** pediriam `aria-controls` e fariam da grade um `tabpanel` [91], sem ganho sobre o rádio para três opções.
- **Por que sai o `aria-pressed`:** a APG não trata vários toggles como seleção única [90]. Com ele, o `BaseButton` com `pressed` deixa de ter uso (seção 7).

**Teclado:**

- **Tab e Shift+Tab:** uma parada só; o foco cai na opção marcada. O grupo sempre tem uma marcada (a `MenuView` começa em `foods`), o que evita o caso do Shift+Tab no último rádio sem marcado [88].
- **Setas (esquerda e cima, direita e baixo):** movem o foco e marcam, como no padrão [88]. No nativo, é o navegador quem faz [92][96]. A volta do último ao primeiro é a do padrão [88]; nenhuma página aberta descreve o teclado do rádio nativo além do Shift+Tab (dossiê, "Não encontrei"), e por isso o `keyboard.mjs` confere.
- **Espaço:** marca a focada.
- **Enter:** nada (o grupo não está num formulário).
- **Cada seta troca a grade:** é mudança de conteúdo, não de contexto [97]. A grade já está carregada, como pede a ativação no foco das abas [91]. O foco fica no rádio, porque o grupo não é recriado.

**Visual (grupo conectado [54]):**

- **Barra:** `div.category-tabs` com `--m3-surface` opaca [H17], `padding-block: var(--space-3)`, borda de baixo de 1 px transparente que vira `--m3-outline-variant` quando grudada (a regra e a sentinela de hoje). Sem sombra.
- **Itens:** 44 px de altura (`--target-min`). O toggle padrão é o small [103], o S de 40 dp, que o projeto põe em 44 px (desvio da ficha, [19]). Rótulo em label-l 14/20, peso 500, `padding-inline: var(--space-3)` abaixo de `sm` e `var(--space-4)` a partir dele (revisão, volta 1). Vão de `--m3-vao-segmento` (2 px) entre os itens: o `ConnectedSpaceBetween` não tem valor na página [105], e o projeto usa 2 px nos segmentos.
- **Cores:** o `ToggleButton` troca entre primary e tonal, e a página não diz qual cor vai em qual estado [103]. Aqui:
  - **marcada:** `--m3-primary`, com o rótulo em `--m3-on-primary` (o filled [103]); hover `--m3-primary-hover`, pressionada `--m3-primary-pressed`;
  - **desmarcada:** `--m3-surface-container`, com o rótulo em `--m3-on-surface-variant` e camada de estado de 8% e 10% [12]. São os papéis dos itens não atuais da pílula (SPEC-M §4.1). A `secondary-container`, o "tonal", fica de fora de propósito: no sistema ela é o "atual" da pílula [83] e o marcado do `PaymentMethodPicker` (SPEC-M §4.2). Pintar com ela as opções não escolhidas inverteria o sentido na mesma tela, onde a pílula mostra "Cardápio" em `secondary-container`.
- **Formas (por opacidade entre camadas, mixin `troca-de-forma`; nenhuma anima):**

  | Posição | Repouso | Pressionado |
  |---|---|---|
  | Início | `full`, `s`, `s`, `full` (de fora redondos, de dentro 8) | `m`, `xs`, `xs`, `m` |
  | Meio | `s` nos quatro | `xs` nos quatro |
  | Fim | `s`, `full`, `full`, `s` | `xs`, `m`, `m`, `xs` |
  | Marcada (qualquer posição) | `full` nos quatro (pílula) | `m` nos quatro |

  - O canto de dentro em repouso é o Small: a do meio usa `ShapeDefaults.Small` [105], e o Small da escala do M3 é 8 [6][7][8]. A página do `ShapeDefaults` não dá o número [106].
  - O marcado é uma forma só, nas três posições [105]; a pílula inteira é a escolha deste desenho (a página não dá o raio).
  - Nenhuma forma pressionada tem número na fonte [104][105]. Os valores seguem o botão S apertado do projeto (`forma-m`, SPEC-M §6) e o canto de dentro do split (`forma-xs`).
  - A forma da marcada troca direto (o raio de repouso muda de valor, sem transição), e a cor troca em `--m3-dur-mola-efeitos-rapida`, como no `BaseButton`.
  - **Técnica (revisão, volta 1):** o `camada-de-estado` e o `troca-de-forma` usam os dois o `::before`. A camada vai no fundo composto que o `troca-de-forma` pinta: `--m3-botao-fundo-hover: linear-gradient(var(--m3-camada-hover) 0 0), var(--m3-surface-container)` e o mesmo no pressionado, com `--m3-camada-pressionada` (a composição que o par da §8 mede). As formas por posição passam quatro valores ao `troca-de-forma`, como o `.m3-dividido__frente`.
- **Sinais do marcado além da cor (1.4.1 [99]):**
  - a diferença de luminância: `primary` contra `surface-container` dá 5,52:1 (medido), acima dos 3:1 que contam como sinal extra [99];
  - a forma: pílula inteira contra os cantos de 8;
  - o estado nativo `checked`, lido pelo leitor de tela [96].
  - Sem check: nenhum exemplo do grupo conectado mostra check [100], e o check mudaria a largura da marcada a cada troca.
- **Anel:** por dentro (`anel-interno`), porque os itens ficam encostados (SPEC-M §1.1, item 4), no `label` por `:has(:focus-visible)`. Na desmarcada, `--m3-secondary` sobre `surface-container` (5,53). Na marcada, `--m3-on-primary` (6,43): o `secondary` sobre o `primary` dá 1,00:1 (medido) e sumiria. Como no disco do hero, a cor do anel troca, sem token novo.
- **Alto contraste (revisão, volta 1):** com `forced-colors: active`, o fundo das opções some. Toda opção ganha `border: 1px solid CanvasText`, e a forma (pílula contra cantos de 8) volta a aparecer; a marcada ganha `border: 2px solid Highlight`, como o item atual da pílula (`_m3-barra-ferramentas.scss`). Com `prefers-contrast: more`, a borda de 1 px vai para `--m3-outline` (SPEC-M §2.6).

**Comportamento:**

- **1440 e 1024 (`lg` e acima):** o grupo com a largura do conteúdo, alinhado ao início; gruda em `top: var(--navbar-h)`.
- **De `md` a `lg`:** igual, grudando em `top: 0`.
- **390 (abaixo de `md`):** o grupo ocupa a largura toda, e cada item cresce a partir do rótulo (`flex: 1 1 auto`). Os rótulos medem cerca de 96, 52 e 81 px em label-l (estimativa pela captura `menu-390-viewport.png`). Com 12 px de cada lado abaixo de `sm`, somam cerca de 305 px com os vãos, nos 358 px úteis: **cabem numa linha**, e também numa janela de 360 px (328 úteis). Com 16 px, seriam cerca de 329 px, e em 360 a barra rolaria (revisão, volta 1).
- **Rolagem horizontal:** fica só como reserva, abaixo de cerca de 337 px (`overflow-x: auto`, sem barra visível e sem `scroll-snap`, para a rolagem não brigar com o foco). Não empilha (`SPEC.md` §4.1). Com o anel por dentro, sai o padding de folga em volta do grupo que existe hoje.

**Contagem por categoria (6.b): não entra.** A grade mostra a categoria inteira; a contagem é traço do acervo (desenho da Home, §13); e "Hambúrgueres 7" não caberia na linha em 390. A categoria vazia tem o `EmptyState` (5.4).

**Movimento:**

- **`motion-ok` e reduzido:** o mesmo. A troca de forma do pressionado é opacidade entre o `::before` e o `::after` (SPEC-M §7.2), e a camada de estado é opacidade [12]. Nenhum `transform`.
- **Sem animação:** a barra não entra animada e não some ao rolar.

**Reserva:** os rótulos e as chaves são fixos (`CATEGORIAS`); o painel não edita categorias. Uma categoria vazia continua no grupo, e o `EmptyState` explica (5.4).

### 5.3 Região da grade (decisões c, d, e, f)

- **Arquivo e raiz:** `MenuView.vue`, `section.menu-page__regiao.container[aria-labelledby="menu-categoria-titulo"]` → `h2#menu-categoria-titulo.visually-hidden` → `ul.menu-page__grade[role=list]` → `li` → `M3CartaoLanche`.
- **Objetivo:** a categoria inteira à vista, sem paginação (`SPEC.md` §5.3), com foto, nome, preço e "Adicionar" [H20].

**Conteúdo:**

| Campo | Origem |
|---|---|
| `h2` (escondido) | `CATEGORIAS.find((c) => c.chave === categoriaAtual).rotulo` |
| Cards | `useProductsStore()[categoriaAtual]`, na ordem do JSON: `name`, `description`, `price` (via `useCartaoProduto` → `preco`), `image`, `ingredients` |
| Chave do `v-for` | `` `${categoriaAtual}-${produto.id}` `` (os ids se repetem entre as categorias) |

**Hierarquia (6.c): `h2` escondido.**

- A página fica com `h1` "Cardápio" → `h2` "Hambúrgueres" (ou a categoria escolhida) → `h3` de cada card, sem salto de nível.
- Escondido porque o rótulo já está na opção marcada, logo acima.
- **Nome acessível da região:** o do `h2`, que muda com a categoria ("Hambúrgueres", "Bebidas" ou "Sobremesas").
- O `M3CartaoLanche` continua com o `h3` fixo: nenhuma prop de nível, e a Home não muda.
- Sem região viva: o rádio já diz o que foi marcado, e anunciar a grade a cada seta seria ruído.

**Peso do nome do card comum (6.d): recomendo Medium (500).**

- **Por quê:**
  - o M3 dá title em Medium [1], e a tabela da §2.3 do SPEC-M põe title-m e title-l em 500;
  - abaixo de `md`, o nome (title-m, 400) e o preço (title-m, 500) têm o mesmo tamanho, e o preço pesa mais que o nome (captura `home-390-full.png`);
  - o nome do destaque já é 500 (`tipo(headline-s, 500)`).
- **A mudança:** uma linha no `_m3-cartao-lanche.scss`: `.m3-cartao__nome { @include tipo(title-m, 500); }`.
- **Efeito na Home:** o mesmo card está no feed. Os nomes dos 6 cards comuns da Home de produção ficam em 500, e a referência `#/direcoes/material`, congelada (decisão e), continua em 400. **Fica em aberto para a sessão principal**, porque muda a Home aprovada.
- **Como a sessão C confere:**
  1. capturas da Home em 1440, 1024 e 390 antes e depois, com os retângulos das 5 seções iguais (como na etapa 5a, 0 px de diferença) e nenhum nome quebrando em mais linhas;
  2. a mesma conferência nos 11 cards do Cardápio;
  3. o crítico olha o card em 390. Se algum nome quebrar diferente, ou se o crítico reprovar, volta a 400.

**Grade (6.e):**

- **Colunas:** 2 abaixo de `lg` (como o feed), 3 a partir de `lg` e 4 a partir de `xl`. Gaps do feed: `--space-3` abaixo de `md` e `--space-5` a partir dele. A regra é a do `.m3-feed` sem o destaque, copiada no `_menu-page.scss` (a parcial da Home não muda).
- **Mesma altura na linha:** `align-items: stretch`. O card já tem `height: 100%` e o preço com `margin-top: auto`, e o preço e o split ficam alinhados no pé.
- **Encaixes:** hambúrgueres em 4 + 3 (1440), 3 + 3 + 1 (1024) e 2 + 2 + 2 + 1 (390); bebidas em 3 (1440 e 1024) e 2 + 1 (390); a sobremesa sozinha na primeira coluna. A última linha alinha ao início.
- **`sizes`:** o do card comum (`(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 45vw`), sem mudança.
- **Reservas, como no feed:** nome longo em 2 linhas (`line-clamp`); imagem que falha com o ícone `burger` em `surface-container`; imagem `data:` sem o `<source>`; produto sem ingredientes com o split de uma metade só.
- **Proposta: descrição abaixo de `md` sem a folha.** Abaixo de `md`, o card esconde a descrição porque a folha de ingredientes faz o papel dela. Os produtos sem ingredientes (as 3 bebidas) ficam sem folha e sem descrição, e o volume ("500ml", "350ml") só aparece no modal. Proposta: com a lista de ingredientes vazia, o card mostra a descrição também abaixo de `md` (classe `m3-cartao--sem-folha`). Na Home de hoje não muda nada, porque os 7 hambúrgueres têm ingredientes. **Em aberto para a sessão principal**, porque mexe no componente da Home.

**Folha única (6.f): fecha ao trocar de categoria.**

- O `useFolhaUnica` guarda o `produto.id`, e os ids se repetem entre as categorias. Com a folha do Cheese Bacon (id 1) aberta, trocar para Sobremesas montaria o Sorvete de Pote (id 1) com a folha aberta.
- **A regra:** `watch(categoriaAtual, () => fechar())`, sem devolver o foco, que fica no rádio.
- O clique numa opção já fecha a folha pelo `pointerdown` fora do card. O `watch` cobre o teclado, em que as setas trocam a categoria sem clique.
- Com uma categoria na tela por vez, os ids do DOM (`m3-ingredientes-<id>`) continuam únicos.

**Componentes:** `M3CartaoLanche` (comum), `M3BotaoDividido`, `M3FolhaIngredientes`, `M3Foto`; a lógica `useFolhaUnica`, `usePersonalizar` (a `MenuView` faz o `provide(CHAVE_PERSONALIZAR, openModal)`) e `useCartaoProduto`.

**Interação e estados:** os do feed (desenho da Home, §5.2): "Adicionar" abre o modal real; a metade de trás abre a folha; Esc fecha e devolve o foco; o card não reage a hover; com a folha aberta, o card sobe para `--z-raised`. O grupo grudado (`--z-sticky`) passa por cima da folha ao rolar.

**Acessibilidade:** a lista é `ul[role=list]`; cada card é `article` com o nome em `h3`; "Adicionar <nome>" e "Ingredientes de <nome>" vêm do card. Todos os alvos com pelo menos 44 × 44.

**Movimento:** o do feed (chevron, folha e check do "Adicionado" só em `motion-ok`). A troca de categoria troca a grade direto, sem entrada animada.

**Reserva (cardápio editado):** produto excluído some da grade; nome e preço editados aparecem como vierem; categoria vazia mostra o `EmptyState` (5.4); a ordem é a do JSON.

### 5.4 Categoria vazia

- **Arquivo e raiz:** `MenuView.vue`, o `EmptyState` no lugar do `ul`, dentro da mesma `section` (o `h2` escondido continua nomeando a região).
- **Objetivo:** dizer que a categoria está vazia e para onde ir.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Título | "Nada nesta categoria por enquanto" (`textosLoja.js` → `TEXTOS.vazio`) |
| Texto | "Dê uma olhada nas outras categorias." (`MenuView.vue`, texto real de hoje) |
| Ícone | `utensils` (o de hoje, registrado no plugin) |

- **Como entra:** o componente e a API de hoje; o visual é da etapa 10 (SPEC-M §4.2). Sem ação: o grupo, logo acima, já é o caminho.
- **Pares:** os textos ficam sobre `surface`, com os pares de hoje (`on-surface` e `on-surface-variant` sobre `surface`).
- **Comportamento:** igual nas três larguras, dentro do `.container`.
- **Movimento:** nenhum.

### 5.5 Modal Personalizar

- **Arquivo e raiz:** `src/components/ModalAdditional.vue` e `components/_modal.scss`, dentro do slot padrão do `BaseDialog` (`div.customize`). O cabeçalho, o fechar, o fundo, o sheet e o contêiner do rodapé são da etapa 10.
- **API:** a mesma (`open`, `product`; emite `close` e `confirm`). O fluxo, o cálculo, os campos e os textos são os do `SPEC.md` §5.4 e §10.2.
- **Superfície de base:** o desenho supõe o `BaseDialog` em `surface-container` (o apelido `--color-surface-2` de hoje). Se a etapa 10 trocar, os pares das seções 5.5.x são medidos de novo.

#### 5.5.1 Coluna visual

- **Estrutura:** `div.customize__visual` → `div.customize__prato` com o `BurgerStack` (hambúrgueres, `isBurger`). Nos outros produtos, a `M3Foto.customize__foto` fica no lugar do prato, sem padding, porque a foto já tem a moldura dela (revisão, volta 1).
- **Prato do montador:** `--m3-surface-container-lowest`, canto `--m3-forma-xl` a partir de `md` e `--m3-forma-l` abaixo (os cantos da `M3Foto` cartão), `padding: var(--space-5)`, conteúdo centrado. A foto e o montador ocupam a mesma moldura, e o prato isola as cores da ilustração do fundo do diálogo. Sem sombra.
- **`BurgerStack`:** sem mudança (decisão f): 220 px a partir de `md` e 160 px abaixo, com a legenda dele ("Do jeito da casa", "Sem tomate · +1 bacon") em `--color-ink-muted` sobre o prato (9,29:1, o par `on-surface-variant` sobre `surface-container-lowest`, que já existe).
- **Foto:** `M3Foto` com `forma="cartao"`, `proporcao="4 / 3"`, `alt` igual ao nome, `icone` `["fas", "utensils"]` e `:falhou` por um `fotoFalhou` que zera a cada abertura. `sizes` de hoje: `(min-width: 768px) 340px, 92vw`.
- **1440 e 1024:** coluna de 2fr (cerca de 320 px), `position: sticky; top: 0` dentro do corpo, como hoje.
- **390:** no topo do sheet, na largura do corpo. A foto em 4:3 tem cerca de 342 × 256 px, e o prato com o montador, cerca de 270 px de altura (o montador de 160 px, a margem dele, a legenda e o padding).
- **Movimento:** o do `BurgerStack`, que não muda.
- **Reserva:** imagem que falha mostra o ícone na mesma proporção; imagem `data:` vai sem `<source>`; um produto de `foods` editado com um ingrediente fora do mapa deixa de ser `isBurger` e mostra a foto.

#### 5.5.2 Ingredientes (`IngredientsList`)

- **Quando:** hambúrgueres e sobremesas com ingredientes (a regra de hoje: `showIngredients`).
- **Seção:** o `fieldset.customize__section` de hoje, com `legend.customize__title` "Ingredientes" (title-m 500, `on-surface`) e `p#ingredientes-ajuda` "Desmarque o que quiser tirar" (body-m, `on-surface-variant`), ligado por `aria-describedby`.
- **Bloco:** `ul.ingredients-list[role=list]` em `--m3-surface-container-lowest`, canto `--m3-forma-l-aumentada` (20, o canto de fora das listas segmentadas), `padding: var(--space-2)`. Uma coluna abaixo de `sm` e duas a partir dele (como hoje), sem vão vertical entre as linhas.
- **Linha (`label.ingredients-list__label`):** a linha inteira é o alvo [111], com `min-height: 3rem` (48 px, o alvo do Material [111]; a amostra do Compose tem 56 dp [109]) e `padding-inline: var(--space-3)`.
  - Checkbox no início [107][109], `gap: var(--space-3)`, nome em body-l (`on-surface`).
  - Camada de estado em `currentColor`, 8% no hover e 10% no pressionado [12], com o canto `--m3-forma-full`. A camada do checkbox do M3 é um círculo de 40 px [113]; com a linha como alvo, ela se estende à linha e guarda o canto redondo.
- **Checkbox:**
  - `input[type=checkbox].ingredients-list__checkbox.visually-hidden` (nativo: estado e teclado do navegador [96]; o componente do material-web também usa o input nativo [115]);
  - `span.ingredients-list__caixa[aria-hidden]` desenhada: 24 × 24 px (critério 3 da §1.1 do SPEC-M; o M3 desenha 18 px [113]), canto de 2 px [113] (token novo `--m3-forma-caixa`) e contorno de 2 px;
  - dentro dela, o check do Font Awesome (`['fas', 'check']`, já registrado), `span.ingredients-list__check`. Sem `transform` parado: sai o check de bordas girado de hoje.
- **Cores por papel [113]:**

  | Estado | Contorno | Contêiner | Check | Linha |
  |---|---|---|---|---|
  | Marcado | 0 (mesma cor do fundo) | `primary` | `on-primary` | — |
  | Desmarcado ("removido") | 2 px, `on-surface-variant` | transparente | — | nome riscado em `on-surface-variant` e "(removido)" escondido |
  | Desmarcado, no hover ou pressionado | 2 px, `on-surface` | transparente | — | camada de 8% ou 10% |
  | Foco | — | — | — | anel interno de 3 px em `secondary` na linha (`anel-interno`), porque as linhas ficam encostadas |

- **Sinais de "removido" além da cor:** a caixa vazia, o nome riscado e o "(removido)" escondido, como hoje.
- **Anel:** interno (`anel-interno`), na linha, por `:has(:focus-visible)`. As linhas ficam encostadas, e a §1.1 (item 4) e a §13.5 do SPEC-M pedem o anel por dentro nesse caso, como no grupo de categorias (5.2). O exemplo da APG envolve o rádio e o rótulo [89]; aqui, a linha inteira, que é o alvo. Par: `secondary` sobre `surface-container-lowest` (6,44).
- **Contraste não textual [98] (medido):** o contorno desmarcado tem 9,29:1 sobre o bloco; a caixa marcada, 6,43:1 (5,26:1 com a linha pressionada); o check, 6,43:1 sobre a caixa; o anel, 6,44:1.
- **`forced-colors`:** a caixa ganha borda de 1 px em `CanvasText` nos dois estados (o fundo forçado esconde o `primary`), e o check, em `currentColor`, aparece sobre o fundo forçado [114]. A linha não precisa da `reserva-de-sombra`: o texto e a caixa já a delimitam.
- **1440 e 1024:** duas colunas de cerca de 230 px. Os nomes cabem numa linha ("Hambúrguer artesanal" tem cerca de 150 px em body-l).
- **De `sm` a `md` e na coluna estreita de `md`:** duas colunas mais estreitas, e um nome longo pode quebrar em 2 linhas; a linha cresce (`min-height`).
- **390:** uma coluna.
- **Movimento:**
  - **sempre:** o check entra por opacidade em `--m3-dur-mola-efeitos-rapida`, por `transition` ligada ao `:checked` e nunca por `@keyframes`: os ingredientes abrem todos marcados, e não pode haver entrada animada (revisão, volta 1); o contorno e o fundo da caixa trocam direto;
  - **`motion-ok`:** o check entra também com `scale(0)` → `none` na mola espacial rápida, como o check do "Adicionado" (SPEC-M §7.6);
  - **reduzido:** só a opacidade. A classe `.ingredients-list__check` entra no `_motion.scss`;
  - **o que não se copia:** o check do material-web anima `width` em 350 ms [114], o que fere a regra do projeto.
- **Reserva:** produto sem ingredientes não mostra a seção (regra de hoje).

#### 5.5.3 Adicionais (`AdditionalsList`)

- **Quando:** hambúrgueres e sobremesas (a regra de hoje), e só se a lista do catálogo tiver itens (`showAdditionals` também confere `additionals.length`; é defesa sem caso real hoje, porque os adicionais vêm só do `products.json` e o painel não os edita).
- **Seção:** a `section.customize__section` de hoje, com o `h3#adicionais-titulo` "Adicionais" (title-m 500).
- **Lista segmentada [66][81]:** `ul.additionals-list[role=list]` com `gap: var(--m3-vao-segmento)`. Cada `li.additionals-list__item` em `--m3-surface-container-lowest`, com cantos de fora de `--m3-forma-l-aumentada` (20) e de dentro de `--m3-forma-xs` (4) pela posição (`:first-child`, `:last-child`, `:only-child`), como no `M3ItemLista` [8].
- **Linha:** `padding: var(--space-2) var(--space-3) var(--space-2) var(--space-4)`; à esquerda, o nome (body-l, `on-surface`) sobre o acréscimo "+ R$ 3,50" (body-m, `on-surface-variant`, tabular, `formatPrice`); à direita, o `QuantityStepper` (0 a 5). O `trailingContent` do `ListItem` aceita um controle no fim [107].
- **Estado "com quantidade":** a linha **não muda**. O estado é o número do stepper (`<output aria-live="polite">`), com o total do CTA e, nos hambúrgueres, a legenda do montador. Por quê:
  - a troca de fundo sozinha não passa na 1.4.1 [98][99];
  - o stepper que a §4.2 do SPEC-M recomenda é tonal: numa linha em `secondary-container`, os botões sumiriam.
- **`QuantityStepper`:** o de hoje, com a API de hoje; o desenho dele é da etapa 10. Ele passa a ficar sobre `surface-container-lowest` nas linhas e sobre `surface-container` na quantidade (5.5.4): a etapa 10 mede os dois fundos.
- **A linha não é ação:** sem camada de estado nem foco; o foco fica nos botões do stepper.
- **1440 e 1024:** linhas de cerca de 480 px, com o stepper à direita.
- **390:** linhas de cerca de 342 px. O nome mais longo ("Cebola Caramelizada", cerca de 150 px) e o stepper (cerca de 120 px) cabem com o padding.
- **Movimento:** o do stepper de hoje (`SPEC.md` §7.5) até a etapa 10.
- **Reserva:** os adicionais não são editáveis (a store persiste só `menuItems`, `lastIds` e `catalogVersion`); a lista vazia some (acima), como defesa.

#### 5.5.4 Quantidade (bebidas)

- **Onde:** depois da descrição, como hoje: `section.customize__section` com o `h3#quantidade-titulo` "Quantidade" e o `QuantityStepper` (1 a 10, `label` = nome do produto).
- **Superfície:** a do diálogo, sem bloco: um controle só não precisa de contêiner.
- **Comportamento:** igual nas três larguras.

#### 5.5.5 Observação

- **Onde:** a última seção das opções, na largura da coluna, como hoje: `FormGroup` com `id="observacao"`, "Observação", textarea de 3 linhas, `maxlength` de `OBSERVATION_MAX` (140), o contador "0/140" e o placeholder "Ex.: ponto da carne, sem sal…".
- **Desenho:** da etapa 8. Aqui só a posição.

#### 5.5.6 CTA e confirmação

- **CTA:** o `BaseButton` de hoje no slot `footer`: `size="lg"` (M, 56 px [17][18][19]), `block`, filled (`primary`). Texto "Adicionar · " e o preço em `span.tabular` com `formatPrice(total)`, recalculado ao vivo. Sem "Cancelar": fechar já cancela.
- **O "·" (6.h): fica.**
  - É o texto real e padronizado do `SPEC.md` §8 [CON-09], e a §5.6 do SPEC-M repete o padrão em "Confirmar pedido · R$ x". Trocar aqui deixaria o pagamento diferente.
  - A legenda do montador ("Sem tomate · +1 bacon") usa o mesmo separador e não pode mudar (decisão f).
  - A Home tirou o "·" de textos que juntavam dados separados (o WhatsApp e o número; os direitos), que viraram itens próprios (SPEC-M §8.1 e §10.2). Aqui, o rótulo e o preço são uma ação só.
  - Nome acessível: o texto do botão ("Adicionar · R$ 25,99"). Nenhum texto muda.
- **Ao confirmar (6.i):**
  1. o `useProductModal` adiciona ao carrinho e fecha o diálogo;
  2. o `BaseDialog` devolve o foco a quem abriu, a frente do split (`Adicionar <nome>`) do card de origem;
  3. o `contexto.markAdded()` liga o retorno "Adicionado" por `--dur-base` + `--dur-hold` (SPEC-M §7.6), com `data-adicionado="true"`;
  4. o badge do FAB muda, e o FAB passa a "Carrinho, N itens";
  5. o anúncio diz "{nome} adicionado ao carrinho. {n} itens no carrinho." (com o `formatItemCount`).
- **Se a origem saiu da tela:** com o `showModal()`, a página fica inerte, e a categoria não troca com o modal aberto (nem por clique, nem pelas setas, que não alcançam o grupo). O cardápio só muda no painel, em outra rota. Se mesmo assim o botão de origem não estiver no DOM, o `BaseDialog` não devolve o foco (`document.contains`), e o card que saiu não roda o retorno (o `useCartaoProduto` limpa o temporizador ao desmontar). Risco aceito: não há caso real hoje.

---

## 6. Matriz de estados

Mesmo formato da §6 do SPEC-M. "Anel" é o contorno de 3 px em `--m3-secondary`, afastado 2 px [30]; "anel interno" usa `outline-offset: calc(-1 * var(--focus-width))`; "camada" é o `currentColor` a 8% no hover (só `hover-capable`) e 10% no pressionado [12].

| Componente | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
|---|---|---|---|---|---|---|---|
| `CategoryTabs`, opção desmarcada | `surface-container` / `on-surface-variant`, label-l 500, 44 px, forma da posição (5.2) | camada 8% | anel interno, `secondary`, no `label` (`:has(:focus-visible)`) | camada 10%; cantos apertados por opacidade (`troca-de-forma`) | — | — | — |
| `CategoryTabs`, opção marcada | `primary` / `on-primary`, pílula inteira | `primary-hover` | anel interno em `on-primary` | `primary-pressed`; cantos `forma-m` | `checked` nativo; pílula; 5,52:1 contra a desmarcada [99] | — | — |
| Barra do grupo | `surface` opaca, borda de 1 px transparente | — | — | — | grudada: borda em `outline-variant` | — | — |
| `CategoryTabs` em `forced-colors` e `prefers-contrast: more` | toda opção com borda de 1 px (`CanvasText`; `outline` com mais contraste) | — | anel do sistema | — | marcada: `2px solid Highlight` | — | — |
| Linha de ingrediente (checkbox) | caixa de 24 px: marcada em `primary` com check `on-primary`; nome `on-surface` | camada 8% na linha; contorno da desmarcada em `on-surface` | anel interno na linha (`:has(:focus-visible)`) | camada 10%; contorno da desmarcada em `on-surface` | desmarcada = "removido": caixa vazia com contorno `on-surface-variant`, nome riscado em `on-surface-variant`, "(removido)" escondido | — | — |
| Linha de adicional | `surface-container-lowest`, cantos 20/4, nome `on-surface`, "+ R$" `on-surface-variant` | — (não é ação) | nos botões do stepper | — | — (o estado é o número do stepper) | botão do stepper no limite: `disabled` real | — |
| Prato do montador | `surface-container-lowest`, canto 28 (16 abaixo de `md`) | — | — (não é interativo) | — | — | — | foto: caixa em `surface-container`; falha: ícone `utensils` |
| Cabeçalho da página | `h1` `on-surface`, frase `on-surface-variant`, na `surface` | — | — | — | — | — | — |
| Região da grade | `section` nomeada pelo `h2` escondido | — | — | — | muda com a categoria marcada | — | categoria vazia: `EmptyState` |
| CTA do modal | o filled M de hoje (SPEC-M §6) | `primary-hover` | anel | `primary-pressed`, cantos `forma-l` | — | — | — |

---

## 7. Inventário

**Contagem:** nenhum componente novo. Mudam **5 componentes** (`CategoryTabs`, `IngredientsList`, `AdditionalsList`, `ModalAdditional` e, se aceito, `M3CartaoLanche`) e **1 view** (`MenuView`). Peças novas ficam dentro dos componentes (o prato, a caixa do checkbox), sem `M3*` novo. Nada é copiado de `src/direcoes/`: o `M3CartaoLanche`, o `useFolhaUnica` e a `M3Foto` já são as cópias de produção.

### 7.1 `CategoryTabs` (muda)

- **Props:** `options: { type: Array, required: true }` (`{ value, label }`); `modelValue: { type: String, required: true }`.
- **Emits:** `update:modelValue` (no `change` do rádio).
- **Slots:** nenhum.
- **Estrutura:** `div.category-tabs__sentinel[aria-hidden]` → `div.category-tabs(.is-stuck)` → `div.category-tabs__inner.container` → `fieldset.category-tabs__grupo` → `legend.visually-hidden` "Categorias" → `label.category-tabs__opcao` (`--inicio`, `--meio`, `--fim`; `.is-marcada`) → `input[type=radio][name="categoria"].visually-hidden` + `span.category-tabs__rotulo`.
- **`fieldset`:** com `min-inline-size: 0` (o padrão é `min-content`, que impediria a rolagem de reserva) e um `div.category-tabs__opcoes` com as opções, como o `.payment-picker__options` (revisão, volta 1).
- **Fica:** a sentinela e o `IntersectionObserver` com o `matchMedia` de `lg` (os 5 casos do `CategoryTabs.test.js` continuam).
- **Sai:** o `BaseButton` com `pressed`, o `role="group"` e o `aria-label` (viram `fieldset` e `legend`).
- **Tokens:** `--m3-surface`, `--m3-outline-variant`, `--m3-surface-container`, `--m3-on-surface-variant`, `--m3-primary`, `--m3-primary-hover`, `--m3-primary-pressed`, `--m3-on-primary`, `--m3-secondary`, `--m3-forma-full`, `--m3-forma-m`, `--m3-forma-s`, `--m3-forma-xs`, `--m3-vao-segmento`, `--m3-label-l`, `--m3-label-l-linha`, `--target-min`, `--space-3`, `--space-4`, `--navbar-h`, `--z-sticky`, `--m3-mola-efeitos-rapida`, `--m3-dur-mola-efeitos-rapida` e o novo `--m3-categorias-altura` (o `min-block-size` da barra, com a borda de 1 px, para o `scroll-padding-top` seguir a altura real; revisão, volta 1).
- **Mixins:** `troca-de-forma`, `camada-de-estado`, `anel-interno`, `tipo(label-l, 500)`, `up(md)`, `up(lg)`, `hover-capable`.
- **Referências:** [54], [88], [89], [90], [92], [93], [95], [96], [97], [99], [100], [103], [104], [105], [106], [H17].

### 7.2 `IngredientsList` (muda)

- **API:** `v-model` (Array de `{ id, name, included }`, com o validador de hoje).
- **Estrutura:** `ul.ingredients-list[role=list]` → `li.ingredients-list__item` → `label.ingredients-list__label(.is-removed)[for]` → `input#ingrediente-<id>.ingredients-list__checkbox.visually-hidden` + `span.ingredients-list__caixa[aria-hidden]` (com `font-awesome-icon.ingredients-list__check`) + `span.ingredients-list__name` + `span.visually-hidden` "(removido)" quando desmarcado.
- **Classes que ficam:** `.ingredients-list__checkbox`, `.ingredients-list__label`, `.ingredients-list__name` e `.is-removed` (o `micro-final.mjs` conta os `.ingredients-list__checkbox` marcados e clica no `label` com o texto).
- **Tokens:** `--m3-surface-container-lowest`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-primary`, `--m3-on-primary`, `--m3-secondary`, `--m3-forma-l-aumentada`, `--m3-forma-full`, `--m3-forma-caixa` (novo), `--m3-body-l`, `--m3-body-l-linha`, `--m3-mola-efeitos-rapida`, `--m3-dur-mola-efeitos-rapida`, `--m3-mola-espacial-rapida`, `--m3-dur-mola-espacial-rapida`, `--space-2`, `--space-3`.
- **Referências:** [12], [96], [98], [107], [108], [109], [111], [113], [114], [115].

### 7.3 `AdditionalsList` (muda)

- **API:** `v-model` (Array de `{ id, name, price, quantity }`, com o validador de hoje).
- **Estrutura:** `ul.additionals-list[role=list]` → `li.additionals-list__item` → `div.additionals-list__info` (`span.additionals-list__name`, `span.additionals-list__price.tabular` "+ " e `formatPrice`) + `QuantityStepper` (0 a 5).
- **Classes que ficam:** `.additionals-list` e o `.stepper__value` do stepper (o `flow.mjs` e o `micro-final.mjs` leem os dois).
- **Tokens:** `--m3-surface-container-lowest`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-forma-l-aumentada`, `--m3-forma-xs`, `--m3-vao-segmento`, `--m3-body-l`, `--m3-body-m`, `--space-2`, `--space-3`, `--space-4`.
- **Referências:** [8], [66], [81], [107].

### 7.4 `ModalAdditional` (muda)

- **API:** a de hoje.
- **Estrutura:** `div.customize` → `div.customize__visual` (`div.customize__prato` com o `BurgerStack`, ou `M3Foto.customize__foto`) e `div.customize__options` (descrição, `fieldset` dos ingredientes, `section` dos adicionais, `section` da quantidade, `FormGroup`). O CTA no `#footer`.
- **Lógica nova:** `fotoFalhou` (ref, zerada no `reset()`); `showAdditionals` confere também `additionals.length`.
- **Classes que ficam:** `.customize__visual` (o `micro-final.mjs` recorta a captura do montador por ela) e as de seção.
- **Tipografia:** descrição em body-l `on-surface-variant`; títulos em title-m 500 `on-surface`; ajuda em body-m `on-surface-variant`. Vão de `--space-6` entre as seções; `--space-1` entre título e ajuda; `--space-3` entre a ajuda e o bloco.
- **Tokens:** `--m3-surface-container-lowest`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-forma-xl`, `--m3-forma-l`, `--m3-title-m`, `--m3-body-l`, `--m3-body-m` e os espaços.
- **Referências:** [1], [17]-[19], [66], decisão (f).

### 7.5 `M3CartaoLanche` (muda pouco, se a sessão principal aceitar)

- **Peso do nome:** `tipo(title-m, 500)` (6.d).
- **Sem folha:** classe `m3-cartao--sem-folha` quando a lista de ingredientes está vazia, com a descrição visível também abaixo de `md` (6.e).
- **API, estrutura e tokens:** os de hoje.

### 7.6 `MenuView` (muda)

- **Estrutura:** `div.menu-page` → `div.menu-page__cabecalho.container` (`h1`, `p.menu-page__frase`) → `CategoryTabs` → `section.menu-page__regiao.container` (`h2.visually-hidden`, `ul.menu-page__grade` ou `EmptyState`) → `ModalAdditional`.
- **Lógica:** `categoriaAtual` (ref, `"foods"`); `opcoes` de `CATEGORIAS`; `rotuloAtual`; `produtos`; `useFolhaUnica()` com o `watch` que fecha; `useProductModal()` e o `provide(CHAVE_PERSONALIZAR, openModal)`.
- **Sai:** o `BannerComponent` e o `ProductCard`.

### O que fica sem uso (para a etapa 11, salvo quando dito)

- `BannerComponent.vue`, `_banner.scss`, `BannerComponent.test.js` e o `--gradient-scrim` (5.1). A imagem `banner-burger-black` fica.
- A variante `menu` do `ProductCard` (tilt e flip) e o `useTilt.js`: deixam de rodar; o import continua no `ProductCard`, que o admin usa até a etapa 9.
- As classes da Brasa no `_motion.scss` que só o Cardápio usava (`.add-btn__inner`, `.add-btn__face`, `.product-card`).
- **A prop `pressed` do `BaseButton`** e a forma `.btn--legado` dela: o `CategoryTabs` era o único usuário. A etapa 10, que desenharia o `pressed`, pode tirá-lo.
- O comentário "props do BannerComponent" do `FRASE_CARDAPIO` em `textosLoja.js` passa a apontar para a `MenuView` (sessão C).

---

## 8. Tokens, pares, lógica, dependências e textos

### Tokens novos (em `base/_tokens.scss`, prefixo `--m3-`; o valor final é do construtor)

| Token | Tipo | Valor | Referência |
|---|---|---|---|
| `--m3-categorias-altura` | layout | `calc(var(--target-min) + 2 * var(--space-3))` (68 px) | A barra grudada; entra no `scroll-padding-top` da rota (seção 4) |
| `--m3-forma-caixa` | forma | `2px` | O canto do checkbox do M3 [113] |

Nenhuma cor nova, nenhuma duração nova (o check usa as molas que existem), nenhum z-index novo.

### Pares novos (para `src/utils/contraste.js`)

Medidos nesta sessão com `lerTokens` e `medirPar` do próprio `contraste.js` sobre o `base/_tokens.scss`, em duas casas, para baixo, como o `contraste.test.js`. A camada de estado real usa `currentColor`; o par mede com o token `--m3-camada-pressionada` (o `on-surface` a 10%).

| Frente | Fundo | Mínimo | Medido | Onde |
|---|---|---|---|---|
| `m3-primary` | `m3-surface-container-lowest` | 3 | 6,43 | Caixa marcada do checkbox |
| `m3-primary` | `m3-camada-pressionada` sobre `m3-surface-container-lowest` | 3 | 5,26 | Caixa marcada com a linha pressionada |
| `m3-on-surface-variant` | `m3-camada-pressionada` sobre `m3-surface-container` | 4,5 | 6,55 | Rótulo da categoria desmarcada, pressionada |
| `m3-primary` | `m3-surface-container` | 3 | 5,52 | Diferença entre a categoria marcada e a desmarcada (sinal extra da 1.4.1 [99]) |
| `m3-outline` | `m3-surface-container-lowest` | 3 | 4,48 | Borda do `QuantityStepper` de hoje sobre as linhas dos adicionais (medido na revisão) |
| `m3-on-surface` | `m3-camada-pressionada` sobre `m3-surface-container-lowest` | 4,5 | 14,00 | Nome do ingrediente com a linha pressionada (medido na revisão) |
| `m3-on-surface-variant` | `m3-camada-pressionada` sobre `m3-surface-container-lowest` | 4,5 | 7,60 | Nome removido com a linha pressionada (medido na revisão) |
| `m3-secondary` | `m3-camada-pressionada` sobre `m3-surface-container` | 3 | 4,54 | Anel interno da categoria desmarcada pressionada (medido na revisão) |

**Pares que ganham uso** (o mínimo não muda; a coluna "onde" muda):

| Frente | Fundo | Medido | Novo uso |
|---|---|---|---|
| `m3-primary` | `m3-surface` | 6,13 | Categoria marcada contra a barra |
| `m3-on-primary` | `m3-primary` | 6,43 | Rótulo e anel interno da categoria marcada; check do checkbox |
| `m3-on-primary` | `m3-primary-hover` / `-pressed` | 5,33 / 5,09 | Categoria marcada no hover e pressionada |
| `m3-on-surface-variant` | `m3-surface-container` | 7,97 | Rótulo das categorias desmarcadas; descrição e ajuda do modal |
| `m3-secondary` | `m3-surface-container` | 5,53 | Anel interno da categoria desmarcada |
| `m3-on-surface` | `m3-surface-container` | 14,68 | Títulos das seções do modal |
| `m3-on-surface` | `m3-surface-container-lowest` | 17,11 | Ingredientes e adicionais |
| `m3-on-surface-variant` | `m3-surface-container-lowest` | 9,29 | "+ R$", nome removido, legenda do montador, contorno do checkbox desmarcado |
| `m3-secondary` | `m3-surface-container-lowest` | 6,44 | Anel das linhas de ingrediente |
| `m3-on-surface` / `m3-on-surface-variant` | `m3-surface` | 16,31 / 8,86 | `h1` e frase do Cardápio; textos do `EmptyState` |

**Medidos e descartados:** `m3-secondary` sobre `m3-primary` dá 1,00 (por isso o anel da marcada é `on-primary`); `m3-secondary-container` sobre `m3-surface-container-lowest` dá 1,29 (a etapa 10 confere o stepper tonal sobre as linhas). `m3-surface-container` contra `m3-surface` dá 1,11: o contorno das opções desmarcadas fica isento, porque um controle com texto dispensa borda [98]; o precedente é o tonal sobre `lowest` na Home (1,29), sem par (revisão, volta 1).

**Pares de hoje que mudam de "onde"** (`PARES_COMUNS`): "borda do checkbox" e "checkbox marcado" (`color-border-strong` e `color-accent` sobre `color-surface-2`) deixam de servir ao checkbox do modal, que passa ao bloco branco: o `color-border-strong` continua no campo e na borda do stepper da "Quantidade"; o `color-accent` perde o uso no checkbox. O modal das Homes do acervo é o mesmo componente: o esqueumorfismo e o neumorfismo passam a mostrar os blocos brancos e o checkbox `primary`, efeito aceito (SPEC-M §11.4). Medidos na revisão sobre os fundos de lá: `on-surface-variant` 5,40 (kraft) e 8,90 (papel), `on-surface` 9,95 e `secondary` 3,74 (kraft).

### Lógica

| O que | Onde | Por quê |
|---|---|---|
| `watch(categoriaAtual, () => fechar())` | `MenuView` | Folha única com ids repetidos (6.f) |
| `provide(CHAVE_PERSONALIZAR, openModal)` | `MenuView` | O card chama `usePersonalizar()` (SPEC-M §4.1) |
| `opcoes` e `rotuloAtual` de `CATEGORIAS` | `MenuView` | Fim da lista repetida à mão (pacote, item 3) |
| Chave do `v-for`: `` `${categoriaAtual}-${produto.id}` `` | `MenuView` | Os ids se repetem |
| `fotoFalhou` e `showAdditionals` com o comprimento | `ModalAdditional` | Reservas (5.5.1 e 5.5.3) |
| `scroll-padding-top` por `:global(html:has(.menu-page))` | `_menu-page.scss` | Foco não coberto (seção 4) |

### Dependências

Nenhuma. Ícones: `check` e `utensils`, já registrados no plugin.

### Textos

Todos reais; **nenhum muda**.

| Texto | Origem | Onde |
|---|---|---|
| "Cardápio" | `MenuView.vue` | `h1` |
| "Escolha, personalize e peça." | `FRASE_CARDAPIO` | Frase do cabeçalho |
| "Hambúrgueres", "Bebidas", "Sobremesas" | `CATEGORIAS` | Opções e `h2` escondido |
| "Categorias" | `CategoryTabs.vue` (era o `aria-label`) | `legend` escondida |
| "Nada nesta categoria por enquanto" / "Dê uma olhada nas outras categorias." | `TEXTOS.vazio` / `MenuView.vue` | `EmptyState` |
| "Ingredientes", "Desmarque o que quiser tirar", "(removido)", "Adicionais", "Quantidade", "Observação", "Ex.: ponto da carne, sem sal…", "0/140" | `ModalAdditional.vue`, `IngredientsList.vue`, `FormGroup` | Modal |
| "Adicionar · R$ x" | `SPEC.md` §8 [CON-09] | CTA (o "·" fica, 6.h) |
| "Do jeito da casa", "Sem tomate · +1 bacon" | `BurgerStack.vue` (com os `formatters`) | Legenda do montador |

---

## 9. Arquivos para o construtor (sessão C)

```
src/views/MenuView.vue                       cabeçalho de texto, CategoryTabs com CATEGORIAS, região com h2
                                             escondido, M3CartaoLanche, EmptyState, provide, watch que fecha a folha
src/assets/styles/pages/_menu-page.scss      cabeçalho, grade 2/3/4 com os gaps do feed, scroll-padding-top da rota
src/components/ui/CategoryTabs.vue           fieldset com rádios nativos (a sentinela e o observador ficam)
src/assets/styles/components/ui/_category-tabs.scss   barra, grupo conectado, formas, anel interno
src/components/ModalAdditional.vue           prato, M3Foto, fotoFalhou, showAdditionals
src/assets/styles/components/_modal.scss     colunas, prato, seções
src/components/IngredientsList.vue           linha de checkbox (input escondido, caixa e check)
src/assets/styles/components/ingredients-list.scss
src/components/AdditionalsList.vue           lista segmentada
src/assets/styles/components/additionals-list.scss
src/components/M3CartaoLanche.vue            (se aceito) m3-cartao--sem-folha
src/assets/styles/components/_m3-cartao-lanche.scss   (se aceito) nome em 500; descrição sem folha
src/assets/styles/base/_tokens.scss          --m3-categorias-altura e --m3-forma-caixa
src/assets/styles/base/_motion.scss          + .ingredients-list__check
src/utils/contraste.js                       os 4 pares novos e os "onde" da seção 8
src/utils/textosLoja.js                      só o comentário de origem do FRASE_CARDAPIO
```

**Não mexer:** `BurgerStack.vue`, `AssinaturaEncaixe.vue`, `src/direcoes/`, `BannerComponent.vue` (sai na 11), `BaseDialog`, `QuantityStepper`, `EmptyState` e `FormGroup` (etapas 10 e 8).

**Testes:**

- `src/__tests__/CategoryTabs.test.js`: os 5 casos do observador ficam. Entram:
  - um `fieldset` com `legend` "Categorias";
  - um `input[type=radio]` por opção, no mesmo `name`, com o do `modelValue` marcado;
  - o `change` de um rádio emite `update:modelValue` com o valor;
  - nenhum `aria-pressed`.
- `src/__tests__/MenuView.test.js` (novo):
  - um `h1` só, "Cardápio", e nenhuma imagem `banner-burger-black`;
  - um rádio por categoria, com "Hambúrgueres" marcado ao abrir (o "botão com `aria-pressed`" do plano vira rádio, por esta decisão);
  - o `h2` escondido com o rótulo e a `section` nomeada por ele; ao marcar "Bebidas", o `h2` e a grade mudam;
  - "Adicionar <nome>" só de produto real, um por card da categoria;
  - a categoria vazia (store com a lista vazia) mostra "Nada nesta categoria por enquanto";
  - com a folha do Cheese Bacon aberta, marcar "Sobremesas" monta o Sorvete de Pote com `aria-expanded="false"`.
- `src/__tests__/ModalAdditional.test.js` (novo):
  - hambúrguer: `BurgerStack`, uma caixa por ingrediente, os 5 adicionais;
  - Batata Frita: sem ingredientes nem adicionais;
  - bebida: "Quantidade" de 1 a 10, sem ingredientes;
  - sobremesa: `M3Foto`, 3 ingredientes e 7 adicionais;
  - desmarcar "Tomate" mostra "(removido)", e o confirmar emite `removedIngredients: ["Tomate"]`;
  - somar um Bacon muda o CTA para o preço com o acréscimo (`formatPrice`);
  - o CTA tem "Adicionar · " e o preço.
  - O retorno do foco e o anúncio são do `BaseDialog` e do `useProductModal`: a sessão C os testa pela `MenuView` montada, ou no teste do `useProductModal`, como o plano pede.
- `M3CartaoLanche.test.js` (se 6.e for aceito): sem ingredientes, a classe `m3-cartao--sem-folha`.

**e2e (`.claude/e2e/`):**

- `flow.mjs`: adicionar pelo Cardápio (o Cheese Bacon), com o foco na frente do split com `data-adicionado="true"` e o anúncio na região viva.
- `micro-final.mjs`: saem as conferências de tilt, flip e odômetro do Cardápio; o montador fica (os seletores ficam). Entra o check do checkbox: `transform: none` com movimento reduzido.
- `lacunas.mjs`:
  - `getByRole('button', { name: tab })` → `getByRole('radio', { name: tab })`;
  - na lista de seletores de movimento, `.category-tabs .btn` → `.category-tabs__opcao`, `.product-card` → `.m3-cartao` e `.add-btn__inner` → `.m3-dividido__frente`;
  - o clique em "Destaques", que não existe mais, sai.
- `keyboard.mjs` (ponto de atenção 3):
  - o grupo é uma parada só no Tab, na opção marcada;
  - a seta para a direita marca "Bebidas", e o foco continua no rádio;
  - a seta no último volta ao primeiro;
  - o foco não coberto no `#/menu` em 390 (toolbar e grupo) e em 1440 (cabeçalho e grupo): com Shift+Tab pelos cards, o retângulo focado nunca fica inteiro dentro da barra do grupo nem do cabeçalho.
- `axe-scan.mjs`: os estados abaixo. O estado `modal-bebida` que já existe (`getByRole('button', { name: 'Bebidas' })`) passa ao rádio.
- `video-tour.mjs`: as categorias como rádio e o `.product-card` trocado pelo `.m3-cartao`.
- **Janela de 360 px:** o grupo numa linha só, sem rolagem.

**SPEC-M e CLAUDE.md (no mesmo PR):**
- no SPEC-M: a linha do `pressed` na §4.1; as linhas `CategoryTabs`, `IngredientsList`/`AdditionalsList` e `BannerComponent` da §4.2; o "a desenhar" das §5.3 e §5.4; a linha `CategoryTabs` da §6;
- no CLAUDE.md: a linha do `pressed` só muda com o pedido do usuário.

**Estados para o axe** (em 1440 e 390, com e sem movimento reduzido):

| Nome | Passos | Seletor estável |
|---|---|---|
| Categoria Bebidas | `#/menu` → marcar o rádio "Bebidas" | `.category-tabs input[value="drinks"]:checked` |
| Categoria vazia | `#/menu` → esvaziar `desserts` na store (como o "Home vazia") → marcar "Sobremesas" | `.menu-page__regiao .empty-state` |
| Folha aberta no Cardápio | `#/menu` → clicar em "Ingredientes de Cheese Bacon" | `#m3-ingredientes-1` visível |
| Modal de hambúrguer | `#/menu` → "Adicionar Cheese Bacon" | `dialog[open] .burger-stack` |
| Modal de bebida | marcar "Bebidas" → "Adicionar Copo de Refrigerante" | `dialog[open] #quantidade-titulo` |
| Modal de sobremesa | marcar "Sobremesas" → "Adicionar Sorvete de Pote" | `dialog[open] .additionals-list` sem `.burger-stack` |
| Ingrediente desmarcado | modal de hambúrguer → clicar no `label` com "Tomate" | `dialog[open] .ingredients-list__label.is-removed` |
| Adicional somado | modal de hambúrguer → "Aumentar Bacon" | `dialog[open] .additionals-list .stepper__value` com "1" |

**Documentação (CLAUDE.md):** os testes novos entram no `TESTING.md` e na contagem do README, no mesmo PR.

---

## 10. Referências usadas

| Ref. | Publicado ou conceito | Padrão abstraído | Onde entra |
|---|---|---|---|
| [54] Button groups (Compose) | conceito (documentação) | Grupo conectado de seleção única com papel de rádio, formas de início, meio e fim, troca de forma no selecionado; substitui o segmented | Grupo de categorias |
| [100] ButtonGroup (referência) | conceito | Amostras com `Role.RadioButton`; nenhum check | Semântica e sinal do marcado |
| [103], [104], [105], [106] ToggleButton, defaults, ShapeDefaults | conceito | Primary e tonal sem dizer qual em qual estado; forma do meio Small; marcado numa forma só; sem dp | Cores e formas do grupo |
| [102] Segmented button | conceito | Check no selecionado | Descartado (largura) |
| [88], [89] Radio Group (APG) | referência técnica | Tab no marcado, setas que movem e marcam; anel em volta do rádio e do rótulo | Teclado do grupo; anel da linha |
| [90], [91], [93], [94] Button, Tabs, Toolbar (APG) | referência técnica | Toggle não é seleção única; abas pedem painel; alinhamento como `radiogroup` | Escolha do rádio |
| [92] Read Me First (APG) | referência técnica | Papel ARIA é promessa de teclado | Rádio nativo |
| [95], [96], [97] H71, 4.1.2, 3.2.2 (W3C) | referência técnica | `fieldset` e `legend`; controles nativos cumprem; mudança de conteúdo não é de contexto | `fieldset`, setas que trocam a grade |
| [98], [99] 1.4.11 e 1.4.1 (W3C) | referência técnica | 3:1 em componente, check e foco; luminância de 3:1 como sinal extra | Marcado do grupo, checkbox, linha do adicional |
| [78], [111] Alvo (W3C, Compose) | referência técnica e documentação | 24 px na WCAG; 48 dp no Material; a linha como alvo | Linhas de 48 px |
| [107], [108], [109] ListItem, Checkbox (Compose) | conceito | Linha de seleção múltipla com o checkbox no início; anatomia; linha de 56 dp | Linha de ingrediente |
| [113], [114], [115] Checkbox (material-web) | conceito (código de componente) | Caixa de 18 px, canto de 2 px, cores por papel, `forced-colors`, input nativo; o movimento que não se copia | Checkbox |
| [66], [81], [8] Listas agrupadas | conceito e publicado | Blocos com vãos de 2 px, cantos 20/4 | Adicionais |
| [63], [64] Cards e feed | conceito | Filled card; itens equivalentes sem destaque | Grade |
| [1], [6], [7], [12], [16]-[19], [30] (rodada 1) | documentação oficial | Escala de tipo (title em Medium), formas, camadas de estado, tamanhos de botão, anel | Tokens e estados |
| [76], [77] W3C | referência técnica | Foco não coberto (C43); movimento | `scroll-padding-top` da rota; `motion-ok` |
| [H1], [H5], [H17], [H20] | pesquisa | Identidade e tarefa no topo; texto fora da foto; barra fixa opaca; nome, foto e preço | Cabeçalho, banner, barra, grade |

**Recorrência:** nenhum padrão desta etapa tem 3 exemplos publicados. O grupo conectado e a linha de checkbox vêm da documentação; o grupo conectado publicado não foi encontrado (dossiê, padrão 6).

---

## 11. Riscos e como o desenho responde

| Risco | Resposta |
|---|---|
| A cor da marcada contrariar o "tonal" de [103] | É inferência: [103] não diz qual cor vai em qual estado. A escolha guarda a `secondary-container` como "atual" no sistema. Se a sessão principal preferir o tonal no desmarcado, a medida da 1.4.1 cai para 4,99 (`secondary-container` contra `primary`, SPEC-M §2.2) e continua acima de 3 |
| Dois "selecionados" no sistema: `primary` no grupo e `secondary-container` na pílula e no `PaymentMethodPicker` | Widgets diferentes: o grupo é um toggle filled [103]; a pílula é navegação [83]; o picker é lista. Na etapa 7, o picker pode seguir qualquer um dos dois, com o motivo |
| Rádio nativo: teclado sem fonte aberta além do Shift+Tab | O `keyboard.mjs` confere Tab, setas e volta; o projeto já usa o mesmo padrão no `PaymentMethodPicker` |
| Cada seta troca a grade | Mudança de conteúdo [97], com a grade já carregada [91]; o foco fica no rádio. Se o teste com leitor de tela incomodar, o plano B são as abas com ativação manual [91] |
| Grupo grudado cobrir o foco a partir de `lg` | `scroll-padding-top` da rota com o token (seção 4); o `keyboard.mjs` mede em 1440 |
| Rótulos não caberem numa linha abaixo de cerca de 337 px | Rolagem horizontal de reserva, como hoje; nunca empilha |
| Peso 500 mudar a Home aprovada | Em aberto; conferência por captura e volta a 400 se algo quebrar (5.3) |
| Descrição abaixo de `md` só nos cards sem folha deixar a linha desigual | Na grade de 2 colunas, as bebidas têm todas descrição; um hambúrguer editado sem ingredientes ficaria mais alto que o vizinho, e a linha estica (`stretch`) |
| Batata Frita com folha ("Batata", "Sal") e sem ingredientes no modal | Já é assim na Home; o modal segue a regra do `isBurger` (decisão f). Fica registrado |
| **O `BurgerStack` lê apelidos que a etapa 11 tira** (`--text-sm`, `--leading-compact`, `--ease-out` e `--ease-spring`; o `--color-ink-muted` fica entre os seis do acervo) | A decisão (f) diz que ele não muda, e a (a) tira os apelidos. A sessão principal decide na etapa 11: manter esses quatro apelidos ou abrir exceção à (f) para trocar só os nomes |
| O prato branco tirar a separação das camadas claras do `BurgerStack` (maionese e clara do ovo; revisão, volta 1) | Conferir na captura da sessão C. O prato é a única alavanca, porque o `BurgerStack` não muda |
| A superfície do diálogo mudar na etapa 10 | Os pares do modal são medidos sobre `surface-container`; mudando, mede-se de novo |
| Teclado virtual cobrir a observação no sheet | Não encontrei fonte; fica para a conferência em aparelho, fora do Playwright |
| Tudo em blocos brancos parecer kit de cards | Três formas para três papéis: o prato (28), o bloco de checklist (20 em volta) e a lista segmentada (20/4 com vãos); nenhuma sombra; nenhum hover em bloco que não é ação |
| Repetir o acervo | O neumorfismo tem um teclado de rádio que escolhe um lanche para o visor (desenho de lá, §5); aqui o grupo escolhe a categoria da grade, na forma do grupo conectado do M3. A contagem nos botões, que é traço do acervo, ficou de fora |

---

## 12. Decidido e fora

**Decidido (item 6 do pacote):**

- **a.** O banner `page` sai; entra o cabeçalho de texto na superfície (`h1` e `FRASE_CARDAPIO`). `BannerComponent`, `_banner.scss`, `BannerComponent.test.js` e `--gradient-scrim` saem na etapa 11; a imagem `banner-burger-black` fica no repositório.
- **b.** Grupo conectado [54] com rádios nativos em `fieldset`/`legend` (sai o `aria-pressed`); marcada em pílula `primary`, desmarcadas em `surface-container`; 44 px; vão de 2 px; anel interno (`on-primary` na marcada).
  - **Em aberto para o usuário:** a marcada em `primary` é exceção à regra "`primary` só em ação" (SPEC-M §2.2), porque [103] não diz qual cor vai no marcado. A alternativa é `secondary-container` com a troca de forma, mas a diferença dela contra a desmarcada não chega a 3:1 (§2), e o sinal ficaria só na forma.
  - Sem contagem; uma linha em 390; continua grudando, opaco e sem sombra, com a borda quando grudado.
- **c.** `h2` escondido com o rótulo da categoria, que nomeia a `section` da grade; os cards ficam com o `h3`.
- **d.** Recomendação: nome do card comum em 500 [1], também na Home; **em aberto para o usuário**.
  - Se aceito, é exceção à §1.1 (item 13) e à §13.9 do SPEC-M: a Home de `#/` deixa de ser igual à referência congelada nesse peso.
  - A §2.3 do SPEC-M muda.
  - A conferência é a de 5.3.
- **e.** Grade de 2, 3 e 4 colunas com os gaps do feed, cards da mesma linha com a mesma altura, reservas do feed. Proposta **em aberto**: descrição abaixo de `md` nos cards sem folha.
- **f.** A folha fecha ao trocar de categoria (`watch` com `fechar()`), e a chave do `v-for` leva a categoria.
- **g.** Modal: montador sobre prato `surface-container-lowest` (28/16); foto em `M3Foto` 4:3; ingredientes em linhas de checkbox do M3 (caixa de 24, canto de 2 [113], linha de 48 como alvo [111]) num bloco branco de 1 e 2 colunas; adicionais em lista segmentada, sem mudar a linha com a quantidade; quantidade e observação onde estão; CTA filled M de hoje.
- **h.** O "·" do CTA fica.
- **i.** O foco volta à frente do split, com "Adicionado"; a categoria não troca com o modal aberto.
- **j.** `--m3-categorias-altura` e `scroll-padding-top` da rota: 84 px abaixo de `lg` e 148 px a partir dele; no sheet, o rodapé não cobre o corpo.

**Fora:**

- busca, filtro, ordenação e contagem nas categorias;
- avaliação, nota, "mais pedidos", prazo, taxa, promoção, selo, caloria e alergênico;
- destaque no Cardápio;
- entrada animada da grade ao trocar de categoria;
- hover nos cards;
- foto atrás de texto.

**Para outras etapas:**

- **Etapa 8:** o `FormGroup` da observação.
- **Etapa 10:** o `BaseDialog` (com a folga de rolagem do corpo), o `QuantityStepper` (sobre `surface-container-lowest` e `surface-container`), o `EmptyState` e o destino da prop `pressed` do `BaseButton`, que fica sem uso.
- **Etapa 11:** o `BannerComponent` e o `--gradient-scrim`; a variante `menu` do `ProductCard` e o `useTilt` (depois do admin); as classes da Brasa no `_motion.scss`; os apelidos que o `BurgerStack` lê (seção 11).

---

## 13. Revisão

**Volta 1 do revisor (22/11/2026): "aprovado: não".** Foram 2 bloqueantes, 7 importantes e 10 menores. Os pares medidos bateram.

**Aplicado pela sessão principal:**
- os dois bloqueantes:
  - borda em `forced-colors` e em `prefers-contrast: more` no grupo de categorias (5.2 e §6);
  - anel interno nas linhas de ingrediente, que ficam encostadas (5.5.2 e §6);
- os menores de texto: a legenda "Sem tomate" no wireframe, a altura do `h1` em 1024 e a do prato em 390, o par 16,31 e os adicionais, que não são editáveis.

**Aplicado depois, também pela sessão principal:**
- os importantes:
  - a técnica da camada com a troca de forma (5.2);
  - o `padding-inline` de 12 px abaixo de `sm`, para o grupo caber numa janela de 360 px;
  - o par da borda do stepper sobre as linhas brancas (4,48) e a isenção do contorno do grupo (1,11, [98]);
  - a marcada em `primary` e o peso 500, agora **em aberto para o usuário** (§12 b e d);
- os menores:
  - o modal do acervo (§11.4) e os pares de lá;
  - o `fieldset` com `min-inline-size: 0`;
  - o token como `min-block-size`;
  - a foto no lugar do prato;
  - o risco do prato branco;
  - o check por `transition`;
  - os e2e e as linhas do SPEC-M que mudam;
  - os três pares com a camada pressionada.

**Volta 2:** não rodou. As correções seguiram a lista da volta 1 e não mexeram em mais nada.

**Para o usuário decidir antes da sessão C:**
- **12 b:** a categoria marcada em `primary`;
- **12 d:** o peso 500 no nome do card, que muda também a Home.

**Pendências de outras etapas:**
- **Etapa 10:** a prop `pressed` sem uso; os pares do modal se a superfície do diálogo mudar.
- **Etapa 11:** os apelidos que o `BurgerStack` lê (§11).
