# Desenho do Carrinho, do Pagamento e da Confirmação: Material 3 Expressive (etapa 7)

22/11/2026. Desenho das três telas que fecham o caminho do pedido: o Carrinho (`#/cart`), o Pagamento (`#/payment`) e a Confirmação (`#/confirmation`). A Home (etapas 5 e 5a), a moldura (etapa 4), o Cardápio e o modal Personalizar (etapa 6) já estão no M3. Fontes: `docs/direcoes/SPEC-material.md` (SPEC-M), `SPEC.md` (a Brasa, para o fluxo e os textos), `docs/direcoes/desenho/cardapio.md` (o desenho da etapa 6, modelo deste), `docs/direcoes/desenho/material.md` (o desenho da Home), `docs/direcoes/pesquisa/material.md` ([53] a [117]; a seção da etapa 6 traz [88] a [117]), `docs/direcoes/PESQUISA.md` ([1] a [36]) e `docs/direcoes/pesquisa/home-delivery.md` ([H…]). Nenhuma pesquisa nova: onde falta fonte, está escrito "não encontrei".

**Resumo:**

- **Carrinho:** as linhas viram itens de lista segmentada (blocos `surface-container-lowest`, cantos 20/4, vão de 2 px) numa bandeja `surface-container-low` de canto 28 com padding de 8 px, o que deixa os cantos concêntricos (28 = 20 + 8). A miniatura é a `M3Foto` de 64 px na forma da Home: círculo nas bebidas, flor na sobremesa e cartão quadrado de canto 16 nos hambúrgueres. O resumo é um contêiner `surface-container-low` de canto 28, na coluna 4/12 da grade do `SPEC.md` a partir de `lg`.
- **Pagamento:** "Entrega" e "Forma de pagamento" em contêineres `surface-container-low`, cada uma com o seu `h2`. O `PaymentMethodPicker` vira uma lista segmentada de rádios nativos numa coluna, com um controle redondo no início da linha (vazio na desmarcada; `primary` com check na marcada), a marcada em `secondary-container` e com os quatro cantos de 20. Sem endereço, o aviso fica em `aviso` sobre `aviso-container`, com o "Adicionar endereço" em filled S dentro dele. O rótulo do CTA "Confirmar pedido · R$ x" pode quebrar linha.
- **Confirmação:** uma pilha de dois segmentos numa coluna central: a faixa `primary-container` (check, `h1` "Pedido recebido" em headline-m e os dados do pedido) e, colado por 2 px, o resumo somente leitura em `surface-container-low`. Sem prensa, sem disco e sem foto: não repete o hero. Os dados do pedido dentro da faixa são desvio registrado da SPEC-M §5.7, que os punha abaixo dela (seção 5.9).
- **Textos:** o "·" fica em "Confirmar pedido · R$ x" (como o "Adicionar · R$ x" da etapa 6) e sai de "Pedido #1001 · PIX", que vira uma lista de definição com rótulos reais ("Pedido" e "Forma de pagamento").
- **Foco não coberto:** o rádio escondido passa a ter o tamanho do `label` (a pendência da etapa 4 com 800 e 830 px de altura); enquanto há aviso (toast) na tela, o `scroll-padding` da rota soma a altura dele, para o "Remover" vizinho e o CTA não ficarem debaixo do aviso.
- **Fica para outras etapas:** a 8 desenha o perfil, que só ganha a tipografia nova do `OrderSummary` no histórico. A 10 desenha:
  - o `QuantityStepper`, o `EmptyState` e as variantes `danger` e `loading` do `BaseButton`;
  - o desabilitado do filled (decisão da sessão principal, seção 12);
  - o `AppToast`, que herda ou absorve a reserva do aviso desta etapa e resolve o "Desfazer" pouco alcançável e o foco depois do "Fechar aviso".

  Os dois pares da Brasa que estas telas deixam de usar saem já na sessão C.

---

## 1. Tese

**A tese do SPEC-M vale como está:** a ousadia fica no hero da Home, e o resto é quieto (SPEC-M §0, "Tese"). Nas três telas, isso quer dizer:

- **Carrinho:** é a tela de conferir. As linhas são as peças da lista segmentada da Home [66][81], com as mesmas formas de foto, para o produto ter a mesma cara do Início ao carrinho. O traço próprio é a bandeja de cantos concêntricos, que segura as linhas sem título visível.
- **Pagamento:** é um formulário curto. O único gesto do Expressive é a opção marcada, que troca de forma (cantos de 20 nos quatro lados) e ganha o controle `primary` com check, como o selecionado do grupo conectado [54] e o checkbox do modal [113].
- **Confirmação:** é o fim do fluxo. A faixa `primary-container` diz o estado em uma linha e se cola ao resumo, como dois segmentos de uma lista. Nada se move sozinho.
- **Sem:** foto atrás de texto [H5], entrada animada de seção, hover em bloco que não é ação, sombra fora do que flutua [1][13] e `primary` fora de ação. O controle marcado em `primary` segue o precedente da caixa marcada do checkbox (SPEC-M §2.2, tabela de primary).

### O que muda da Brasa

| Na Brasa (capturas `cart-*`, `payment-*` e `confirmation-*` da etapa 6) | No M3 | Por quê |
|---|---|---|
| Lista num card `surface-container` com sombra e canto 12; linhas separadas por borda | Bandeja `surface-container-low` de canto 28 e padding 8; itens `surface-container-lowest` de cantos 20/4, vão de 2 px | Lista segmentada [66][81], cantos 20/4 [8]; contenção [66][26]; cantos concêntricos (28 = 20 + 8) |
| Miniatura `<picture>` de 64 px com canto 4 e `alt=""` | `M3Foto` de 64 px na forma da Home (círculo, flor ou cartão de canto 16), com reserva e `alt=""` | Mesma forma do produto na Home (desenho da Home, §5.3); reserva da `M3Foto` (SPEC-M §9) |
| Nome em 700, total em 700 | Nome em body-l, total em title-m 500 tabular | Os papéis do `M3ItemLista` (SPEC-M §4.1; desenho da Home, §5.3) |
| Resumo num card com sombra; título em 700; Total de 28 px em 700 | Contêiner `surface-container-low` de canto 28, sem sombra; título `h2` em headline-s; Total em headline-s 500 tabular | SPEC-M §4.2 e §5.5; elevação tonal [1][13] |
| Colunas 8/12 e 4/12 a partir de `lg`; CTA sem quebra de linha | As mesmas colunas (`SPEC.md` §5.5 e §5.6); o rótulo do CTA do pagamento pode quebrar linha (`white-space: normal`) | Em 1024, o botão M tem 216 px de conteúdo: "Confirmar pedido · R$ 129,90" ocupa cerca de 212 e cabe; "R$ 1.299,90", cerca de 273, quebra (medidas do revisor na captura, seção 5.3) |
| "Entrega" com `h2`; "Forma de pagamento" só com a `legend` | Um `h2` visível em cada seção; a `legend` fica, escondida | A navegação por títulos alcança as duas seções; o grupo continua nomeado pela `legend` [95] |
| Forma de pagamento em 4 cards de borda 2 px, grade 2×2 a partir de `sm`; marcada com borda `primary`, fundo `primary-container` e `circle-check` | Lista segmentada de rádios numa coluna; controle redondo no início; marcada em `secondary-container`, com o controle `primary` e check e os quatro cantos de 20 | A lista segmentada é vertical [66][81]; o controle na linha é o do `ListItem` de seleção única [107]; o fundo sozinho não é sinal [98][99] |
| "Alterar no perfil" e "Adicionar endereço" como texto sublinhado | "Alterar no perfil" como text button; "Adicionar endereço" como filled S dentro do aviso | Link solto não é texto corrido (`_typography.scss`); dentro do aviso, o text button em `primary` pressionado dá 4,37 e o tonal some no fundo (1,00); o filled S dá 4,98 contra o aviso (medidos) |
| Aviso sem endereço em `--color-warning` sobre o card | Bloco `aviso-container` com o texto e o ícone em `aviso` (5,03) | SPEC-M §5.6 |
| Confirmação: card central de 560 px com sombra, check de 40 px em `sucesso`, `h1` em display, "Pedido #1001 · PIX" | Faixa `primary-container` (cantos 28/28/4/4) com o check em `on-primary-container`, o `h1` em headline-m e os dados em lista de definição, colada ao resumo (cantos 4/4/28/28) | SPEC-M §5.7, com os dados do pedido dentro da faixa (desvio registrado em 5.9); não repetir o hero da Home (seção 5.9) |

---

## 2. Processo: plano, revisão contra o pacote e desenho final

### Sistema (dentro da identidade aprovada; nenhuma cor nova)

- **Cores, por papel:**
  - página (`surface`) #f7fbf1;
  - bandeja, resumo e seções (`surface-container-low`) #f1f5ec;
  - itens e opções (`surface-container-lowest`) #ffffff;
  - opção marcada (`secondary-container`) #d5e8cf, com a tinta (`on-secondary-container`) #3b4b39;
  - ação e controle marcado (`primary`) #3a693b;
  - faixa da confirmação (`primary-container`) #bbf0b6, com a tinta (`on-primary-container`) #225025;
  - aviso (`aviso-container`) #ffdeaa, com a tinta (`aviso`) #7d5700.
- **Tipo:** Roboto, uma família. `h1` pela regra global (`--text-page`, de display-s a display-m, 500), menos na confirmação (headline-m 500, seção 5.9). `h2` em headline-s. Linhas em body-l, detalhes em body-m, totais em title-m 500 e o Total final em headline-s 500, sempre tabulares.
- **Layout:** tudo alinhado à esquerda no `.container`, menos a confirmação, numa coluna central de 40rem. Uma coluna abaixo de `lg`; a partir dele, 8/12 para o conteúdo e 4/12 para o resumo, como no `SPEC.md`.
- **Princípio:** uma coisa memorável por tela, e quieta. No carrinho, a bandeja concêntrica com as formas da Home. No pagamento, a opção que troca de forma ao ser marcada. Na confirmação, a faixa colada ao resumo.

### Plano (primeira passada)

1. O contador "· 2 itens" ao lado do `h1` do carrinho.
2. Miniaturas pela categoria, com o cookie nos hambúrgueres.
3. A lista do carrinho num contêiner `surface-container-low` com padding de 16 px, e o nome em title-m 500, como o card do Cardápio.
4. O contêiner `surface-container-low` dentro do `OrderSummary`, para as três telas o herdarem.
5. O `PaymentMethodPicker` na grade 2×2 de hoje a partir de `sm`, com a marcada em `secondary-container` e o `circle-check` no fim, sem controle nas desmarcadas.
6. A seção "Forma de pagamento" só com a `legend` no papel de título.
7. "Alterar no perfil" e "Adicionar endereço" como text buttons em `primary`.
8. Confirmação num contêiner `primary-container` de canto 48, com o check de 40 px em cima, o `h1` em display-s centralizado e o resumo dentro do contêiner, sobre um bloco `lowest`.
9. Os dois "·" ficam.
10. As colunas 8/12 e 4/12 da Brasa.

### Revisão contra o pacote (o que saiu genérico, repetido, inventado, infiel ou inviável, e o que entrou)

- **Contador ao lado do `h1`: saiu (genérico e inventado).** É texto novo com "·", que a lista de padrões genéricos condena, e repete o nome do FAB ("Carrinho, 2 itens", SPEC-M §4.1). O `SPEC.md` não tem esse texto.
- **Cookie nos hambúrgueres: trocado (repetição).** O cookie é a forma-assinatura do hero e do destaque; espalhá-lo dilui a ousadia, e o desenho da Home tirou o cookie dos grupos de `monte-o-seu` pelo mesmo motivo (desenho da Home, §7.12). Entrou o cartão quadrado de canto 16 nos hambúrgueres; o círculo e a flor ficam nas bebidas e na sobremesa, como na Home.
- **Padding de 16 e nome em title-m 500: trocados.** Com 16 px, o texto da linha fica com cerca de 134 px em 390. Com 8 px, ganha cerca de 16 px e os cantos ficam concêntricos (28 = 20 + 8). O 500 da decisão 6.d é do nome do card (`h3`); nas listas, o `M3ItemLista` usa body-l e põe o peso no preço (SPEC-M §4.1). Entrou body-l no nome e title-m 500 no total.
- **Contêiner dentro do `OrderSummary`: trocado (inviável com a etapa 8).** O perfil usa o componente dentro de um `details` dentro do card do pedido; ganharia uma caixa dentro de outra, o painel com caixas aninhadas que a Brasa tirou [ESP-05]. A confirmação também pede outros cantos. O contêiner fica nas páginas (seção 5.3).
- **Grade 2×2 e só o check na marcada: trocados (acessibilidade).** A lista segmentada é vertical [66][81]. Sem controle nas desmarcadas, nada mostra que é escolha única antes do primeiro toque, e o `ListItem` de seleção única põe o rádio na linha [107]. O fundo `secondary-container` contra o `lowest` dá 1,29 (medido), abaixo dos 3:1 que contam como sinal [99]. Entrou uma coluna, o controle redondo no início e a troca de forma na marcada.
- **Só a `legend`: trocada.** A navegação por títulos pularia a seção. Entrou o `h2` visível, com a `legend` escondida.
  - **Volta 1 do revisor:** com a `section` nomeada pelo `h2`, o nome seria lido três vezes (região, título e grupo). A `section` "Forma de pagamento" perde o `aria-labelledby` (seção 5.7).
- **"Adicionar endereço" em `primary` no aviso: trocado (contraste medido).** O text button pressionado (`primary` sobre a camada de 10% de `primary` no `aviso-container`) dá 4,37, abaixo de 4,5. Entrou o botão tonal, a cor de ação do sistema (SPEC-M §2.2, "a cor do círculo separa informação de ação"). "Alterar no perfil" fica text button: 5,82 sobre o `surface-container-low` e 5,07 pressionado.
  - **Volta 1 do revisor:** o tonal contra o `aviso-container` dá 1,00 (medido), e é a única saída da tela sem endereço. Virou filled S: o contêiner dá 4,98 contra o aviso, e o rótulo `on-primary`, 6,43 (seção 5.6).
- **Confirmação de canto 48 com display-s: trocada (repetição).** Abaixo de `md`, o hero é um contêiner `primary-container` com o título em display-s (desenho da Home, §5.1); a partir dele, tem canto 48. Entrou a faixa compacta, de cantos 28/28/4/4, com o `h1` em headline-m ao lado do ícone, sem texto corrido, foto, disco nem ação dentro. O resumo dentro do `primary-container` pediria pares novos e misturaria estado e conferência: virou o segundo segmento, em `surface-container-low`.
- **Os dois "·": um sai.** "Confirmar pedido · R$ x" é rótulo e preço de uma ação só, como o "Adicionar · R$ x" que a etapa 6 manteve (6.h). "Pedido #1001 · PIX" junta dois dados, como o WhatsApp com o número e os direitos que a Home separou (SPEC-M §8.1 e §10.2): sai o "·".
- **Colunas 8/4: ficam (corrigido na volta 1 do revisor).** Na primeira passada, a conta do CTA dizia que "Confirmar pedido · R$ 129,90" precisava de cerca de 280 px e não cabia em 1024; a estimativa estava errada. Medido pelo revisor na captura `payment-1024-viewport.png`, o botão M tem 216 px de conteúdo nessa largura; "R$ 29,49" ocupa cerca de 203 e "R$ 129,90", cerca de 212: cabe. A coluna de 24rem saiu, e a grade é a do `SPEC.md`. Para os totais maiores ("R$ 1.299,90", cerca de 273 px) e as telas estreitas (em 320 px, 208 px de conteúdo), o rótulo do CTA passa a quebrar linha sempre (seção 5.3).

### Desenho final

As seções 3 a 12 abaixo. As decisões do pacote (item 6) estão em 5.2 (a), 5.3 (b), 5.4 (c), 5.6 e 5.8 (d), 5.7 (e), 5.9 (f), 8 (g), 5.1 (h), 4 (i) e 5.5 (j), e numa linha cada na seção 12.

---

## 3. Composição

### Carrinho (`#/cart`)

1. **Título** (`h1` "Seu carrinho"), na superfície.
2. **Lista** (`section.cart-page__lista`): a bandeja com o `h2` escondido "Itens do carrinho" e os itens.
3. **Resumo** (`OrderSummary variant="cart"`): título, Subtotal, Total e os CTAs (logado ou visitante).
4. **Vazio:** o `EmptyState` no lugar da lista e do resumo.

### Pagamento (`#/payment`)

1. **Título** (`h1` "Finalizar pedido").
2. **Entrega** (`section`, `h2` "Entrega"): o endereço e "Alterar no perfil", ou o aviso com "Adicionar endereço".
3. **Forma de pagamento** (`section`, `h2` "Forma de pagamento"): o `PaymentMethodPicker`.
4. **Resumo compacto** (`OrderSummary variant="compact"`) com o CTA "Confirmar pedido · R$ x" e a ajuda.

### Confirmação (`#/confirmation`)

1. **Pilha** (coluna central de 40rem): a faixa de estado (`h1` "Pedido recebido") e o resumo somente leitura, colados por 2 px.
2. **Ações:** "Voltar ao cardápio" (filled) e "Ver meus pedidos" (tonal).

**Ritmo vertical (as três telas):** a página começa a `--space-5` do cabeçalho abaixo de `md` e a `--space-7` a partir dele, como o Cardápio; o `h1` fica a `--space-5` do conteúdo abaixo de `md` e a `--space-6` a partir dele; os blocos empilhados ficam a `--space-5` uns dos outros; a página termina com `--space-8`.

### Wireframe do Carrinho em 1440 (logado, dois itens)

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ header (sticky, 64 px, surface)                                                                │
│ Smash Burger                               ( ⌂ Início | ⑂ Cardápio | ◯ Perfil )  [🛒 2]        │
│                                              nenhum item atual na pílula                       │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                              ↕ --space-7       │
│ Seu carrinho                 h1, --text-page (display-m 45/52 em 1440), 500, on-surface        │
│                                                                              ↕ --space-6       │
│ ╭ bandeja: surface-container-low, canto 28, padding 8 ─────────╮  ╭ resumo: low, canto 28 ──╮ │
│ │╭ item lowest, cantos 20/20/4/4 ─────────────────────────────╮│  │ Resumo do pedido    h2   │ │
│ ││ ▢64  Cheese Bacon                              R$ 29,49   ││  │ (headline-s)             │ │
│ ││      Sem tomate                   body-m  title-m 500 tab. ││  │ Subtotal       R$ 34,48  │ │
│ ││      +1 bacon                                             ││  │ Total          R$ 34,48  │ │
│ ││      [−] 1 [+]                               🗑 Remover   ││  │ title-m 500  headline-s  │ │
│ │╰───────────────────────────────────────────────────────────╯│  │ (   Finalizar pedido   ) │ │
│ │┃ vão de 2 px                                                 │  │  filled M, block         │ │
│ │╭ item lowest, cantos 4/4/20/20 ─────────────────────────────╮│  │   Continuar comprando    │ │
│ ││ ◯64  Coca Cola Lata                             R$ 4,99   ││  │  texto, block            │ │
│ ││      [−] 1 [+]                               🗑 Remover   ││  ╰──────────────────────────╯ │
│ │╰───────────────────────────────────────────────────────────╯│   4/12, sticky (top:         │
│ ╰──────────────────────────────────────────────────────────────╯   --navbar-h + --space-5)     │
│                                                                              ↕ --space-8       │
│ ╭ rodapé (decisão g): marca, descrição, horário e contato, direitos ─────────────────────────╮ │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

Legenda: `▢` é o cartão quadrado de canto 16 (hambúrguer), `◯` o círculo (bebida); a sobremesa usaria a flor. `┃` é o vão de 2 px. A primeira linha de cada item tem a foto, o texto e o total; a segunda, alinhada ao nome, o `QuantityStepper` no início e o "Remover" no fim. O `h2` "Itens do carrinho" está na bandeja, escondido.

**Visitante em 1440:** o resumo troca os CTAs por "Entre para finalizar seu pedido." (body-m, `on-surface-variant`), "Entrar e finalizar" (filled M, block) e "Criar conta" (tonal, block). O resto não muda.

### Wireframe do Carrinho em 390 (visitante, um item)

```
┌──────────────────────────────────┐
│ Smash Burger                     │  header estático, 64 px
│                       ↕ --space-5│
│ Seu carrinho                     │  h1, display-s 36/44, 500
│                       ↕ --space-5│
│╭ bandeja low, canto 28, pad. 8 ─╮│  358 px
││╭ item lowest, cantos 20 ──────╮││  342 px; padding 12
│││ ▢64 Cheese Bacon     R$ 29,49│││  texto com cerca de 150 px
│││     Sem tomate               │││
│││     +1 bacon                 │││
│││ [−] 1 [+]          🗑 Remover│││  2ª linha na largura toda
││╰──────────────────────────────╯││
│╰────────────────────────────────╯│
│                       ↕ --space-5│
│╭ resumo low, canto 28, pad. 16 ─╮│
││ Resumo do pedido               ││  h2, headline-s
││ Subtotal              R$ 29,49 ││
││ Total                 R$ 29,49 ││
││ Entre para finalizar seu pedido││  body-m, on-surface-variant
││(      Entrar e finalizar      )││  filled M, 56 px
││(          Criar conta         )││  tonal, 44 px
│╰────────────────────────────────╯│
│ ╭ rodapé ──────────────────────╮ │
│ AssinaturaEncaixe                │
│         ╭⌂ ┃⑂ ┃◯ ╮ ╭──╮          │  toolbar flutuante; reserva de 6rem no pé
│         ╰───────────╯ ╰──╯       │
└──────────────────────────────────┘
```

**Logado em 390:** o resumo mostra "Finalizar pedido" (filled M, block) e "Continuar comprando" (texto, block).

### Wireframe do Carrinho vazio (1440 e 390)

```
1440                                                          390
┌─────────────────────────────────────────────────────┐       ┌────────────────────────────┐
│ Seu carrinho              h1, alinhado ao início    │       │ Seu carrinho               │
│                                                     │       │                            │
│                    🛒                               │       │            🛒              │
│          Seu carrinho está vazio                    │       │  Seu carrinho está vazio   │
│   Escolha um burger no cardápio para começar.       │       │  Escolha um burger no      │
│               ( Ver cardápio )                      │       │  cardápio para começar.    │
│  EmptyState na superfície, sem bandeja (etapa 10)   │       │      ( Ver cardápio )      │
└─────────────────────────────────────────────────────┘       └────────────────────────────┘
```

### Wireframe do Pagamento em 1440 (com endereço, PIX marcado)

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ header (sticky)  Smash Burger                    ( ⌂ Início | ⑂ Cardápio | ◯ Perfil )  [🛒 1]  │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ Finalizar pedido                     h1, --text-page                          ↕ --space-6       │
│ ╭ Entrega: low, canto 28, padding 24 ──────────────────────────╮  ╭ resumo compacto ────────╮ │
│ │ Entrega                                   h2, headline-s     │  │ Resumo do pedido         │ │
│ │ Rua Beira da Praia                        address, body-l    │  │ 1× Cheese Bacon R$ 29,49 │ │
│ │ Centro                                                       │  │ Sem tomate     body-m    │ │
│ │ Navegantes/SC                                                │  │ +1 bacon                 │ │
│ │ CEP 88370-000                                                │  │ ──────── outline-variant │ │
│ │ Alterar no perfil                         text button        │  │ Subtotal       R$ 29,49  │ │
│ ╰──────────────────────────────────────────────────────────────╯  │ Total          R$ 29,49  │ │
│                                                   ↕ --space-5     │ (Confirmar pedido ·      │ │
│ ╭ Forma de pagamento: low, canto 28 ───────────────────────────╮  │      R$ 29,49)  filled M │ │
│ │ Forma de pagamento                        h2 (legend escond.)│  ╰──────────────────────────╯ │
│ │╭ lowest, 20/20/4/4, 64 px ───────────────────────────────────╮│   4/12, sticky só com        │
│ ││ ○  Cartão de crédito                                    💳 ││   altura-min (48rem)         │
│ ││    na entrega                                              ││                               │
│ │├ lowest, 4 ────────────────────────────────────────────────┤│                               │
│ ││ ○  Cartão de débito / na entrega                        💳 ││                               │
│ │╭ secondary-container, cantos 20 nos quatro (marcada) ───────╮│                               │
│ ││ ✔  PIX                                                  ▦  ││  ✔ = controle primary com    │
│ ││    aprovação na hora               on-secondary-container  ││  check on-primary            │
│ │╰────────────────────────────────────────────────────────────╯│                               │
│ ││ ○  Dinheiro / na entrega              lowest, 4/4/20/20  💵 ││                               │
│ ╰──────────────────────────────────────────────────────────────╯                               │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

Legenda: `○` é o controle vazio de 24 px (contorno de 2 px em `on-surface-variant`); `✔` o controle marcado. Sem forma marcada, o CTA fica desabilitado e a ajuda "Escolha uma forma de pagamento" aparece logo abaixo dele, centralizada.

### Wireframe do Pagamento em 390 (sem endereço)

```
┌──────────────────────────────────┐
│ Finalizar pedido                 │  h1, display-s
│╭ Entrega: low, canto 28, pad. 16╮│
││ Entrega                        ││  h2
││╭ aviso-container, canto 16 ───╮││
│││ ⚠ Cadastre um endereço para  │││  aviso (5,03), body-l
│││   receber o pedido.          │││
│││ ( Adicionar endereço )       │││  filled S (40 px, alvo de 44), link para /profile
││╰──────────────────────────────╯││
│╰────────────────────────────────╯│
│╭ Forma de pagamento ────────────╮│
││ Forma de pagamento             ││  h2
││╭ ○ Cartão de crédito       💳 ╮││  uma coluna; 64 px
│││   na entrega                 │││
││├ ○ Cartão de débito        💳 ┤││
││├ ○ PIX                     ▦  ┤││
││╰ ○ Dinheiro                💵 ╯││
│╰────────────────────────────────╯│
│╭ Resumo do pedido ──────────────╮│
││ 1× Cheese Bacon       R$ 29,49 ││
││ Sem tomate                     ││  um detalhe por linha, body-m
││ +1 bacon                       ││
││ Subtotal / Total               ││
││( Confirmar pedido · R$ 29,49  )││  desabilitado (hoje: surface-container-highest)
││ Cadastre um endereço para      ││  ajuda, body-m, ligada por aria-describedby
││ receber o pedido.              ││
│╰────────────────────────────────╯│
│ rodapé · assinatura · toolbar    │
└──────────────────────────────────┘
```

### Wireframe da Confirmação em 1440

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ header (sticky)                                                                                │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                              ↕ --space-7       │
│                    ╭ faixa primary-container, cantos 28/28/4/4, padding 24 ─╮  coluna de 40rem │
│                    │ ✔  Pedido recebido          h1, headline-m 28/36, 500  │  centralizada    │
│                    │ 40  Pedido        Forma de pagamento      dt: body-m    │                  │
│                    │     #1001         PIX                     dd: title-m   │                  │
│                    ╰────────────────────────────────────────────────────────╯                  │
│                    ┃ vão de 2 px                                                               │
│                    ╭ resumo low, cantos 4/4/28/28, padding 24 ──────────────╮                  │
│                    │ Resumo do pedido                         h2            │                  │
│                    │ 1× Cheese Bacon                         R$ 29,49       │                  │
│                    │ Sem tomate                                             │                  │
│                    │ +1 bacon                                               │                  │
│                    │ ───────────────────────────────────── outline-variant  │                  │
│                    │ Subtotal                                R$ 29,49       │                  │
│                    │ Total                                   R$ 29,49       │                  │
│                    ╰────────────────────────────────────────────────────────╯                  │
│                                                                   ↕ --space-5                  │
│                    ( Voltar ao cardápio ) ( Ver meus pedidos )   filled M e tonal M, no início   │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Wireframe da Confirmação em 390

```
┌──────────────────────────────────┐
│                       ↕ --space-5│
│╭ faixa primary-container ───────╮│  358 px; padding 24
││ ✔  Pedido recebido             ││  ícone 40 + h1 headline-m (cabe numa linha)
││    Pedido    Forma de pagamento││  os dois pares lado a lado (cerca de 225 px)
││    #1001     PIX               ││
│╰────────────────────────────────╯│
│┃                                 │
│╭ resumo low, 4/4/28/28 ─────────╮│
││ Resumo do pedido               ││
││ 1× Cheese Bacon       R$ 29,49 ││
││ …                              ││
│╰────────────────────────────────╯│
│(       Voltar ao cardápio       )│  filled M, largura toda
│(        Ver meus pedidos        )│  tonal M, largura toda
│ rodapé · assinatura · toolbar    │
└──────────────────────────────────┘
```

### As três telas em 1024

- **Cabeçalho do site:** sticky, com a pílula ancorada (a partir de `lg`).
- **Carrinho e pagamento:** `h1` em `--text-page` (45 px, o limite do clamp). Duas colunas, 8/12 e 4/12: o conteúdo com 624 px e o resumo com 312, grudado (264 px de conteúdo com o padding de 24; 216 px dentro do botão M).
  - Carrinho: a bandeja de 624 px deixa cerca de 410 px para o texto da linha.
  - Pagamento: as opções têm 576 px, numa coluna.
- **Confirmação:** a mesma coluna central de 40rem de 1440.
- **De `md` a `lg` (768 a 1023):** uma coluna só, como em 390, com o ritmo de `md` (`--space-7` em cima), o cabeçalho rolando e a toolbar flutuando embaixo; o aviso (toast) aparece no topo à direita (`AppToast`, etapa 4).

---

## 4. Navegação (a moldura nestas rotas)

- **Sem mudança na moldura:** `M3BarraSuperior` e `M3BarraFerramentas` como na etapa 4. Nenhum item da pílula fica atual (Início, Cardápio e Entrar ou Perfil não são estas rotas).
- **O FAB:** leva ao carrinho, e o nome continua "Carrinho, N itens". Ele é um `RouterLink to="/cart"` (`M3BarraFerramentas.vue`, linha 17) e, em `/cart`, ganha `aria-current="page"`. Fica sem estilo próprio para esse estado (a parcial da toolbar só pinta o `aria-current` dos itens da pílula): o `h1` já diz onde se está.
- **Ordem do Tab:** a da moldura (skip link, marca, três links, carrinho, `main`) e, dentro do `main`, a ordem do DOM de cada tela (seção 5).
- **Foco não coberto (2.4.11 [76]; decisão i):**
  - **Abaixo de `lg`:** o `scroll-padding-bottom: var(--m3-barra-reserva)` e a reserva do layout, de hoje, cobrem a toolbar para todos os focos destas telas: os `QuantityStepper`, os "Remover", os CTAs do carrinho (logado e visitante), "Alterar no perfil", "Adicionar endereço", as opções do pagamento e o CTA do pagamento. A ajuda do CTA e o aviso não recebem foco; a reserva do pé deixa rolá-los para cima da toolbar.
  - **Rádio escondido:** o pacote registra a pendência da etapa 4: com 800 e 830 px de altura, o foco pelas setas no Dinheiro deixa a base do card sob a toolbar, porque o navegador garante o rádio de 1 × 1 px, e não o `label`. O desenho dá ao rádio o retângulo do `label` (seção 5.7).
  - **Aviso (toast) na tela:** abaixo de `md`, o aviso fica logo acima da toolbar (etapa 4); a partir de `md`, no topo à direita, com 26rem (416 px) de largura, alinhado à direita do contêiner, a `--navbar-h` + `--space-3` (76 px) do topo (`_app-toast.scss`). Ele pode cobrir o "Remover" vizinho que recebe o foco depois de uma remoção e o CTA do pagamento depois da conferência com o cardápio.
    - **A regra:** enquanto houver aviso, o `scroll-padding` da rota soma a altura de um aviso (token `--m3-toast-reserva`): no pé abaixo de `md` e no topo a partir de `md`. É a técnica C43 [76], por `:global(html:has(.cart-page):has(.toast-region .toast))` e o mesmo com `.payment-page`, como o `scroll-padding-top` da rota do Cardápio.
    - **A conta a partir de `lg`** (pelo CSS do `AppToast` e da grade 8/4; as medidas do revisor batem em 1440 e 1024; a sessão C confere na captura):
      - **1440:** o aviso vai de x 872 a 1288. A coluna do conteúdo vai até 893; a bandeja deixa os itens até 885, e o padding de 16 do item deixa o "Remover" terminar em 869. O aviso começa 3 px depois dele; só o anel (3 px, afastado 2) encosta, em 2 px.
      - **1280:** o aviso vai de 792 a 1208, e o "Remover" termina em 789: a mesma folga de 3 px.
      - **1024:** o aviso vai de 576 a 992, e o "Remover" (cerca de 112 px) vai de cerca de 520 a 632. Na faixa de cima (de 76 px até o pé do aviso), o aviso cobre cerca de metade dele: não o cobre inteiro, o que a 2.4.11 pede [76], mas cobre parte. Por isso a soma no topo vale de `md` para cima, e não só até `lg`.
    - **Quem fica com a regra:** ela e o `--m3-toast-reserva` ficam nesta etapa, porque o ponto de atenção 3 do plano vale agora. Dependem das classes e da posição do `AppToast` (`.toast-region .toast`): a etapa 10 herda os dois ou os absorve no próprio aviso (seção 12).
  - **Resumo grudado:** a partir de `lg`, ele fica na própria coluna e nunca cobre a coluna do conteúdo; o cabeçalho sticky é coberto pelo `scroll-padding-top` de hoje (80 px).

---

## 5. Blocos

### 5.1 Títulos das telas (decisão h)

- **Arquivos:** `CartView.vue` (`h1.cart-page__title`, `tabindex="-1"`, `ref` para o foco), `PaymentView.vue` (`h1.payment-page__title`) e `ConfirmationView.vue` (`h1.confirmation-page__title`, `tabindex="-1"`, foco ao montar).
- **Objetivo:** dizer onde se está, sem contêiner nem foto atrás no carrinho e no pagamento.

| Campo | Origem |
|---|---|
| "Seu carrinho" | `CartView.vue` (também o `meta.title` da rota) |
| "Finalizar pedido" | `PaymentView.vue` |
| "Pedido recebido" | `ConfirmationView.vue` |

- **Tipografia:** no carrinho e no pagamento, a regra global do `h1` (`--text-page`, de display-s 36/44 a display-m 45/52 [1], 500, `on-surface`), como o Cardápio. Na confirmação, `tipo(headline-m, 500)` dentro da faixa (seção 5.9): o display-s dentro de um `primary-container` é o hero da Home abaixo de `md`. O peso 500 continua, e o `axe-scan.mjs` confere o peso do `h1`.
- **`h2` por papel:** a regra global (headline-s 24/32 [1]): "Itens do carrinho" (escondido), "Resumo do pedido", "Entrega" e "Forma de pagamento".
- **Ritmo:** página a `--space-5` do cabeçalho abaixo de `md` e `--space-7` a partir dele; `h1` a `--space-5` do conteúdo abaixo de `md` e `--space-6` a partir dele.
- **Acessibilidade:** um `h1` por tela; `h1` → `h2`, sem salto. Pares que já existem: `on-surface` sobre `surface` (16,31) e `on-primary-container` sobre `primary-container` (7,24).
- **Foco no `h1`:** o do carrinho recebe o foco quando o último "Remover" some (hoje); o da confirmação, ao montar (hoje). O anel é o de 3 px em `secondary`: 6,15 sobre `surface` (SPEC-M §2.2) e 4,99 sobre `primary-container` (medido).
- **Movimento:** nenhum.

### 5.2 Lista do carrinho (`CartItem`; decisão a)

- **Arquivos e raiz:** `CartView.vue` → `section.cart-page__lista[aria-labelledby="itens-titulo"]` → `h2#itens-titulo.visually-hidden` "Itens do carrinho" → `ul.cart-page__itens[role=list]` (o `ref` do foco) → `CartItem` (`li.cart-item`). Parciais: `pages/_cart-page.scss` e `components/cart-item.scss`.
- **Objetivo:** conferir cada linha (o que é, como foi personalizado, quanto custa) e ajustar a quantidade ou tirar, sem sair da tela.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Miniatura | `item.image` por `responsiveImage(item.image, { widths: [480], sizes: "64px" })` (hoje); `data:` vai sem `srcset` |
| Forma da miniatura | `item.category`: `drinks` → `circulo`, `desserts` → `flor`, o resto → `cartao` |
| Nome | `item.name` |
| Detalhes | `describeItem(item)`: "Sem tomate, sem cebola", "+2 bacon", "Obs.: bem passado" (zero a três linhas) |
| Total da linha | `formatPrice(item.unitPrice * item.quantity)` (a única conta da tela, a de hoje) |
| Quantidade | `QuantityStepper` de 1 a 10, `label` = nome |
| "Remover" | `BaseButton variant="danger" icon-start="trash-can"`, `aria-label="Remover {nome}"`, `data-remove` |
| `h2` escondido | "Itens do carrinho" (o `aria-label` de hoje) |

**Forma do item e superfície:**

- **Bandeja:** `section.cart-page__lista` em `--m3-surface-container-low`, canto `--m3-forma-xl` (28), `padding: var(--space-2)` (8). Sobre a superfície, os blocos brancos se perderiam: `lowest` contra `surface` dá 1,04 (e o `low` contra o `surface`, 1,05; medidos), e a Home sempre põe os itens `lowest` num contêiner `low` [66][81]. Com 8 px, os cantos ficam concêntricos (28 = 20 + 8).
- **Itens:** `li.cart-item` em `--m3-surface-container-lowest`, com os cantos pelas variáveis do `M3ItemLista` (`--m3-item-canto-cima` e `--m3-item-canto-baixo`): 20 (`--m3-forma-l-aumentada`) por fora e 4 (`--m3-forma-xs`) por dentro, pela posição (`:first-child`, `:last-child`; só um item, 20 nos quatro) [8]; vão de `--m3-vao-segmento` (2 px) na `ul`. Padding `var(--space-3)` abaixo de `sm` e `var(--space-3) var(--space-4)` a partir dele. Sem borda entre itens (sai o `& + &` de hoje).
- **O item não é ação:** sem camada de estado nem foco; o foco fica no stepper e no "Remover".

**Miniatura (`M3Foto`, 64 px):**

- `forma` pela categoria, como na Home: círculo nas bebidas e flor na sobremesa (desenho da Home, §5.3). Nos hambúrgueres, `cartao` com `proporcao="1 / 1"`, sem o cookie, que é a forma do hero e do destaque.
- **Canto do cartão:** o `cartao` da `M3Foto` usa `--m3-forma-l` (16) e passa a `--m3-forma-xl` (28) a partir de `md` (`_m3-foto.scss`, linhas 15 a 18). Numa caixa de 64 px, 28 é quase um círculo e confundiria o hambúrguer com a bebida.
  - **Onde fica o canto:** o `border-radius` está na raiz da `M3Foto` (`div.m3-foto.m3-foto--cartao`), que tem `overflow: hidden` e recorta o `picture`, o `img` e a reserva do ícone. Nenhum filho tem canto próprio.
  - **O mecanismo:** o Vue aplica o escopo do pai à raiz do componente filho. Uma regra no `<style scoped>` do `CartItem` sobre essa raiz, com especificidade maior que a do `.m3-foto--cartao`, fixa `--m3-forma-l` em todas as larguras. Por exemplo, `.cart-item__foto.m3-foto--cartao { border-radius: var(--m3-forma-l); }`: compilada, ela ganha o atributo do escopo do `CartItem` (duas classes e um atributo), contra uma classe e um atributo da regra da `M3Foto`, também dentro do `up(md)`.
  - **Sem `:deep()`:** a regra alcança a raiz, não um filho. A `M3Foto` não muda.
- `alt=""`, como hoje: o nome está ao lado, e repetir o nome na imagem dobraria a leitura da linha. Não encontrei no dossiê fonte sobre `alt` vazio; vale a decisão de hoje (`CartItem.vue`).
- Falha: `:falhou` por um `imagemFalhou` (ref) ligado ao `@erro`, com o ícone `['fas', 'utensils']` em `surface-container`, na mesma forma (como o `M3ItemLista`). `:largura="64"` e `:altura="64"`.

**Disposição:**

- **390 (abaixo de `sm`):** grade em duas linhas. Na primeira, a foto (64), o texto (nome e detalhes) e o total, com `gap: var(--space-3)` e `align-items: start`. Na segunda, na largura toda do item, o stepper no início e o "Remover" no fim. Contas: 358 − 16 (bandeja) − 24 (item) = 318 px; o texto fica com cerca de 150 px; o stepper (cerca de 124 px) e o "Remover" (cerca de 112 px) cabem na segunda linha.
- **A partir de `sm`:** a segunda linha recua até o nome (`padding-inline-start: calc(64px + var(--space-3))`, como hoje).
- **1440 e 1024:** o mesmo, com o texto mais largo (cerca de 530 px em 1440 e 410 em 1024, na coluna 8/12).
- **Tipografia por papel:** nome em body-l 16/24 (`on-surface`), detalhes em body-m 14/20 (`on-surface-variant`), um por linha, e total em title-m 500 tabular (`on-surface`), sem quebra (`white-space: nowrap`). São os papéis do `M3ItemLista` (nome em body-l, preço em title-m 500). O nome (`.cart-item__name`) e os detalhes (`.cart-item__detail`) levam `overflow-wrap: anywhere`.
- **"Remover" longe do "+":** no fim da segunda linha. A pesquisa transversal pede espaço entre alvos vizinhos, porque alvo apertado aumenta os toques errados [H19], e o "Remover" age na hora. Alvo de 44 px de altura (`md`), como hoje [78]. A forma é a da Brasa (`.btn--legado`, tinta `error`) até a etapa 10.
- **`QuantityStepper`:** sobre `surface-container-lowest`, como nas linhas dos adicionais do modal (desenho do Cardápio, 5.5.3). A borda de hoje (`outline`) dá 4,48 sobre o item (par da etapa 6).

**Interação e estados:**

- **Quantidade:** o stepper de hoje; no limite, `disabled` real.
- **Remover:** tira na hora e mostra o aviso info "{nome} removido." com "Desfazer" (`rotate-left`) por 5 s (`SPEC.md` §5.5). O foco vai ao "Remover" de mesmo índice ou ao último, ou ao `h1` (hoje).
- **Desfazer:** devolve o item à mesma posição (`restoreItem`). **Novo:** o foco vai ao "Remover" do item devolvido. Hoje, o botão "Desfazer" some com o aviso e o foco cai no `body`. Ver a seção 8, "Lógica". O "Desfazer" é pouco alcançável pelo teclado (o aviso vem depois do rodapé e some em 5 s), e o "Fechar aviso" também deixa o foco no `body`: os dois ficam para a etapa 10 (seções 11 e 12).
- **Sem animação de layout:** a lista perde e ganha o item direto; os cantos se acertam sozinhos pelas pseudoclasses de posição.

**Acessibilidade:**

- A região é nomeada pelo `h2` escondido, como a região da grade do Cardápio (desenho do Cardápio, 6.c). A navegação por títulos passa a alcançar a lista e o resumo do mesmo jeito: `h1` "Seu carrinho" → `h2` "Itens do carrinho" → `h2` "Resumo do pedido".
- `ul[role=list]`; o nome é `<p>` (item de lista, não título), como no `M3ItemLista` (SPEC-M §4.1).
- Ordem do DOM e do Tab: foto (sem nome), nome, detalhes, total, "Diminuir", "Aumentar", "Remover".
- Pares: `on-surface` sobre `lowest` (17,11), `on-surface-variant` sobre `lowest` (9,29), `error` sobre `lowest` (6,46, medido) e, no hover do "Remover", `error` sobre `error-container` (4,99). Anel: `secondary` sobre `lowest` (6,44).

**Movimento:** nenhum novo. O número do stepper rola como hoje (`SPEC.md` §7.5), só em `motion-ok`, até a etapa 10.

**Reservas:**

- **Imagem `data:` ou que falha:** sem `<source>`; ícone `utensils` na forma da categoria.
- **Nome longo:** quebra em quantas linhas precisar, com `overflow-wrap: anywhere` (no carrinho, o nome inteiro é parte da conferência; sem `line-clamp`).
- **Observação de 140 caracteres:** em 390, cerca de 7 linhas de body-m; em 1440, 2. Sem corte: é o que a pessoa escreveu. Com `overflow-wrap: anywhere` também nos detalhes, uma observação sem espaço quebra dentro da coluna e não vaza em 390.
- **Dez itens:** a lista cresce. A partir de `lg`, o resumo do carrinho (curto, cerca de 340 px) fica grudado e o CTA sempre à vista. Em 390, o resumo vem depois da lista (`SPEC.md` §5.5).
- **Quantidade 10:** o "+" fica `disabled`. A linha mais cara possível hoje é a do Burger Picanha (R$ 29,90) com 5 de cada adicional: R$ 97,40 a unidade e R$ 974,00 com quantidade 10. O total em title-m tabular cabe na primeira linha, à direita.

### 5.3 `OrderSummary` (decisão b)

- **Arquivo e raiz:** `src/components/OrderSummary.vue` e `components/_order-summary.scss`, raiz `section.order-summary.order-summary--{variant}[aria-labelledby]`. API igual (decisão j): `items`, `variant` (`cart`, `compact`, `readonly`), `title`, `titleId`, `showTitle`, `headingLevel` e o slot `cta`.
- **Objetivo:** mostrar o que se paga, com o total sempre no mesmo lugar.

**O contêiner fica na página, não no componente.**

- No carrinho e no pagamento: `.cart-page__resumo` e `.payment-page__resumo` (classes na raiz do componente) com `--m3-surface-container-low`, canto `--m3-forma-xl` (28), `padding: var(--space-4)` abaixo de `sm` e `var(--space-5)` a partir dele, sem sombra e sem borda.
- Na confirmação: o segundo segmento da pilha, com cantos 4/4/28/28 (seção 5.9).
- **No perfil (etapa 8):** o `ProfileView` usa `variant="readonly"` com `:show-title="false"` dentro do `details` "Ver itens". Ele não ganha contêiner, só a tipografia nova (abaixo): linhas em body-l, detalhes em body-m e o Total em headline-s 500 (hoje é headline-m em 700). Ganha também o `overflow-wrap: anywhere` nos nomes e nos detalhes: uma observação sem espaço deixa de vazar do card do pedido. O divisor continua da mesma cor (`--color-border` já é o `outline-variant`). Se o contêiner fosse do componente, o perfil teria uma caixa dentro do `details` dentro do card do pedido.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Título | `title` (padrão "Resumo do pedido"), `h{headingLevel}` |
| Linhas (`compact` e `readonly`) | "{quantidade}× {nome}" (o número tabular), `describeItem(item)`, `formatPrice(item.unitPrice * item.quantity)` |
| Subtotal e Total | o `subtotal` do componente (soma de hoje), por `formatPrice`; o Total é o Subtotal (sem taxa de entrega) |
| CTA | o slot `cta` |

**Tipografia por papel:**

- **Título:** a regra global do `h2` (headline-s 24/32 [1]), `on-surface`.
- **Linhas:** no `readonly`, "{n}× {nome}" e o total da linha em body-l (`on-surface`), detalhes em body-m (`on-surface-variant`); no `compact`, tudo em body-m, para caber mais linhas na coluna grudada. Vão de `--space-2` entre as linhas. `.order-summary__name` e `.order-summary__detail` levam `overflow-wrap: anywhere`.
- **Subtotal:** rótulo e valor em body-l, `on-surface-variant`.
- **Total:** rótulo em title-m 500 e valor em headline-s 500 tabular, `on-surface`. O headline-s em 500 já é o do nome do destaque da Home (SPEC-M §2.3); a ênfase vem do peso e do tamanho, sem cor [1].
- **Divisor:** 1 px em `--m3-outline-variant`, só quando há linhas acima (`compact` e `readonly`). Na variante `cart`, que não tem linhas, sai o divisor entre o título e os totais. É decorativo: a estrutura vem da `dl` e dos rótulos "Subtotal" e "Total"; a 1.4.11 cobre os gráficos necessários para entender o conteúdo [98], e o SPEC-M já usa o `outline-variant` só em divisor decorativo (§2.2). Medido: 1,53 contra o `low`.

**As três variantes:**

| Variante | Onde | Linhas | Divisor | CTA |
|---|---|---|---|---|
| `cart` | Carrinho | não (as linhas estão na lista ao lado) | não | sim (logado ou visitante, 5.4) |
| `compact` | Pagamento | sim, em body-m | sim | sim ("Confirmar pedido · R$ x", 5.8) |
| `readonly` | Confirmação e perfil | sim, em body-l | sim | não |

**Sticky a partir de `lg`:**

- **Coluna:** a grade do `SPEC.md` (§5.5 e §5.6): `grid-template-columns: 8fr 4fr` a partir de `lg`, `gap: var(--space-5)`, `align-items: start`. O resumo tem cerca de 371 px em 1440 e 312 em 1024; com o padding de 24, sobram 323 e 264 px; dentro do botão M (padding de 24 de cada lado), 275 e 216.
- **O rótulo do CTA:** medido pelo revisor na captura `payment-1024-viewport.png`, "Confirmar pedido · R$ 29,49" ocupa cerca de 203 dos 216 px em 1024; com "R$ 129,90", cerca de 212: cabe. "R$ 1.299,90" ocupa cerca de 273 e passa de 216. Em 320 px de janela, o botão tem 208 px de conteúdo. Por isso o rótulo do CTA do pagamento quebra linha sempre (5.8).
- **Posição:** `position: sticky; top: calc(var(--navbar-h) + var(--space-5))` (SPEC-M §5.1), sobre `surface-container-low`, sem borda nem sombra: ele gruda na própria coluna e não passa por cima de nada.
- **O risco do resumo compacto mais alto que a janela, com os dados reais** (estimativa pelo CSS, com cada detalhe numa linha; a sessão C mede na captura):
  - a coluna das seções do pagamento mede cerca de 618 px com endereço (Entrega 240 + vão 24 + Forma de pagamento 354) e 578 sem ele; a largura não muda essas alturas, porque as opções têm altura fixa e o endereço cabe numa linha por campo;
  - o resumo compacto mede cerca de 297 px sem linhas (padding, título, totais, CTA e ajuda), mais 20 px por linha de item e por detalhe, e 8 px entre os itens;
  - enquanto o resumo é mais baixo que a coluna das seções, ele gruda: cabem 11 itens sem detalhe, 4 com dois detalhes ou 3 com três, em 1440×900 e em 1024×768;
  - na coluna 4/12, um detalhe longo quebra mais: com 264 px de texto em 1024 (cerca de 38 caracteres de body-m por linha) e 323 em 1440 (cerca de 47), a observação de 140 caracteres ocupa 4 e 3 linhas, e "+5 bacon, +5 ovo, +5 queijo, +5 queijo cheddar, +5 cebola caramelizada", 2 ou 3. Cada linha a mais soma 20 px e tira um item da conta. O rótulo do CTA em duas linhas não muda a altura (dois title-m somam 48 px, dentro dos 56 do M);
  - passando disso, a linha da grade fica com a altura do resumo, e ele rola com a página, com o CTA no fim, sem nada escondido;
  - em 1440×900 sobram 812 px abaixo do topo grudado (900 − 88) e em 1024×768, 680: os dois são maiores que a coluna das seções (618), então o resumo nunca fica grudado mais alto que a janela, e o caso não acontece. A conta não depende da largura da coluna: o resumo só gruda enquanto é mais baixo que a coluna das seções;
  - **reserva para janelas mais baixas:** no pagamento, o sticky só vale a partir de 48rem (768 px) de altura. O limite real seria cerca de 706 px (618 + 88); 48rem deixa folga para um endereço que quebre. Abaixo disso, o resumo fica no fluxo (no topo da coluna) e rola com a página. A media query vai para um mixin novo em `base/_breakpoints.scss`, ao lado do `up()` e do `below()`, por exemplo `altura-min($altura)`, com um mapa de alturas como o `$breakpoints` (nome e chave a critério do construtor; o valor é 48rem). A parcial do pagamento só chama o mixin. No carrinho, o resumo tem no máximo cerca de 340 px e gruda sem essa condição.
- **Sem rolagem interna:** nenhum `max-height` nem `overflow` no resumo.

**Interação e estados:** nenhum no contêiner (não é ação). O foco fica nos botões do slot.

**Acessibilidade:** a raiz é `section` nomeada pelo título (região), como hoje. Valores tabulares (`.tabular`). Pares: `on-surface` sobre `low` (15,49) e `on-surface-variant` sobre `low` (8,41).

**Movimento:** nenhum.

**Reservas:**

- **Totais grandes:** com a linha mais cara de hoje (R$ 974,00, 5.2), o total passa de R$ 10.000 com 11 linhas assim. O rótulo do CTA quebra linha em qualquer total (5.8); o Total em headline-s tabular cabe na coluna (cerca de 150 px para "R$ 10.714,00").
- **Nome longo e observação sem espaço nas linhas:** quebram (`overflow-wrap: anywhere` no nome e nos detalhes); o total da linha fica à direita, na primeira linha (`align-items: baseline`, como hoje).

### 5.4 CTAs do carrinho (decisão c)

- **Arquivo:** `CartView.vue`, no slot `cta` do `OrderSummary`. Coluna com `gap: var(--space-3)`.
- **Objetivo:** um caminho principal e um secundário, conforme a sessão, sem handler de autenticação no carrinho (`SPEC.md` §10.5).

| Sessão | Ordem | Componente | Destino |
|---|---|---|---|
| Logado | 1. "Finalizar pedido" | `BaseButton size="lg" block` (filled M, 56 px) | `/payment` |
| Logado | 2. "Continuar comprando" | `BaseButton variant="ghost" block` (texto, 44 px) | `/menu` |
| Visitante | 1. "Entre para finalizar seu pedido." | `p.cart-page__notice`, body-m, `on-surface-variant` | — |
| Visitante | 2. "Entrar e finalizar" | `BaseButton size="lg" block` (filled M) | `/login?redirect=/payment` |
| Visitante | 3. "Criar conta" | `BaseButton variant="secondary" block` (tonal, 44 px) | `/register?redirect=/payment` |

- **Por quê:** um filled por região (SPEC-M §2.2); o filled é de ênfase alta, para ações importantes ou finais, e o tonal, de ênfase média [55]. O "link secundário" do `SPEC.md` continua link: o `BaseButton` com `to` vira `RouterLink`; a forma tonal dá o peso de um caminho real, criar a conta. "Continuar comprando" é o text button: o dossiê lista o text button entre os botões do M3 [16], mas não encontrei nele a ênfase do text button; o uso segue o desenho da Home, que já o trata como a variante de menor ênfase (o "Ver cardápio" de `monte-o-seu`, desenho da Home, §5.5).
- **Largura:** `block` nos três botões, na largura do resumo.
- **Pares:** o filled contra o `low`: 5,82 (medido, mínimo 3); o text button em `primary` sobre o `low`: 5,82, e pressionado (camada de 10% de `primary`), 5,07 (medidos, mínimo 4,5); o anel sobre o `low`: 5,83 (medido). O tonal e o filled têm os pares de texto de hoje.
- **"Criar conta" tonal sobre o `low`: isento.** O contêiner tonal contra o `low` dá 1,16 (medido). Um controle com texto dispensa borda [98]; o rótulo `on-secondary-container` sobre o `secondary-container` dá 7,22. É o precedente da etapa 6, que registrou a mesma isenção para as opções desmarcadas do grupo de categorias e lembrou o tonal sobre o `lowest` da Home, 1,29 (desenho do Cardápio, §8).
- **Foco não coberto:** seção 4.

### 5.5 Carrinho vazio (decisão j)

- **Arquivo:** `CartView.vue`, o `EmptyState` no lugar do layout (o `h1` fica).

| Campo | Origem |
|---|---|
| Ícone | `shopping-cart` |
| Título | "Seu carrinho está vazio" |
| Texto | "Escolha um burger no cardápio para começar." |
| Ação | "Ver cardápio" (`BaseButton to="/menu"`, filled) |

- **Como entra:** o componente e a API de hoje; o visual é da etapa 10 (SPEC-M §4.2). Na largura do `.container`, direto na superfície, sem bandeja (uma bandeja vazia mostraria um contêiner sem conteúdo). O `h1` fica alinhado ao início, acima; o alinhamento interno do `EmptyState` (hoje centralizado) é da etapa 10, que o desenha para o carrinho, o Cardápio e o perfil de uma vez.
- **Pares:** `on-surface` e `on-surface-variant` sobre `surface` (16,31 e 8,86).
- **Quando o último item sai:** o foco vai ao `h1` (hoje), e o `EmptyState` aparece; com "Desfazer", a lista volta e o foco vai ao "Remover" do item devolvido (5.2).
- **Movimento:** nenhum.

### 5.6 Entrega (endereço e aviso; decisão d)

- **Arquivo e raiz:** `PaymentView.vue`, `section.payment-page__secao[aria-labelledby="entrega-titulo"]` → `h2#entrega-titulo` "Entrega" e o endereço ou o aviso. Parcial: `pages/_payment.scss`.
- **Contêiner das seções:** `--m3-surface-container-low`, canto 28, `padding: var(--space-4)` abaixo de `sm` e `var(--space-5)` a partir dele; `--space-3` entre o `h2` e o conteúdo; `--space-5` entre as seções. Sem sombra.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Endereço | `userStore.user.address`: `street`, `neighborhood`, `city`/`state` |
| CEP | "CEP " + `maskCEP(userStore.user.CEP)` ("CEP 88370-000") |
| "Alterar no perfil" | `PaymentView.vue`, para `/profile` |
| Aviso | ícone `circle-exclamation` e "Cadastre um endereço para receber o pedido." |
| "Adicionar endereço" | `PaymentView.vue`, para `/profile` |

**Com endereço:**

- `<address>` com uma linha por campo, em body-l (`on-surface`), `font-style: normal`.
- **"Alterar no perfil":** `BaseButton variant="ghost" to="/profile"` (text button, 44 px), alinhado ao texto por `margin-inline-start: calc(-1 * var(--space-3))`, como o "Ver cardápio" de `monte-o-seu` (desenho da Home, §5.5). Por quê: é uma ação solta, não um link em texto corrido (o sublinhado fica para o `.link-inline`, `_typography.scss`), e é opcional: o endereço já está ali. O text button está entre os botões do M3 [16]; não encontrei no dossiê a ênfase dele, e o uso segue o desenho da Home (5.4). Pares: 5,82 e 5,07 (medidos).

**Sem endereço (o aviso):**

- `div.payment-page__aviso` em `--m3-aviso-container`, canto `--m3-forma-l` (16), `padding: var(--space-4)`, com o mixin `reserva-de-sombra` (borda de 1 px em `CanvasText` com cores forçadas e em `outline` com `prefers-contrast: more`; `outline` sobre o `low` dá 4,06, medido).
- Dentro: `p` com o ícone (20 px, `aria-hidden`) e o texto em body-l, os dois em `--m3-aviso` (5,03 sobre o contêiner, par de hoje); depois, `--space-2` abaixo, o **"Adicionar endereço"** como `BaseButton size="sm" to="/profile"` (filled S: `variant` `primary`, 40 px, com o alvo de 44 px pelo `::after` da face, como o `sm` de hoje, SPEC-M §4.1).
- **Por que filled S** (decisão da sessão principal, volta 1 do revisor):
  - é a única saída da tela sem endereço, e o filled é de ênfase alta, para ações importantes [55];
  - o text button em `primary` sobre o `aviso-container` passa em repouso (4,98) e reprova pressionado (4,37, medido);
  - o tonal, que entrou na primeira versão, some no aviso: `secondary-container` contra `aviso-container` dá 1,00 (medido);
  - o filled S se separa do aviso pelo contêiner: `primary` contra o `aviso-container` dá 4,98, `primary-hover` 4,13 e `primary-pressed` 3,94 (medidos; mínimo 3, contêiner de botão, SPEC-M §1.1, item 2). O rótulo `on-primary` dá 6,43 em repouso, 5,33 no hover e 5,09 pressionado, pares de hoje;
  - é S, e não M, porque o CTA M do pedido, no resumo, continua a ação principal da tela; o aviso é outra região (um filled por região, SPEC-M §2.2).
- **Anel:** `secondary` sobre o `aviso-container`, 4,99 (medido), afastado 2 px, dentro do padding de 16 do aviso.
- **Sem papel ARIA:** o aviso já está na página ao carregar; não é mudança ao vivo. A mesma frase volta como ajuda do CTA (5.8), ligada por `aria-describedby`.
- **O CTA fica desabilitado** (`canSubmit` de hoje).

**Comportamento:** igual nas três larguras, na coluna do conteúdo; em 390, o aviso tem 326 px e o texto quebra em 2 linhas.

**Movimento:** nenhum.

**Reserva:** rua ou bairro longos quebram (`overflow-wrap: anywhere`); sem CEP salvo, a linha do CEP some (hoje).

### 5.7 `PaymentMethodPicker` (decisão e)

- **Arquivo e raiz:** `src/components/PaymentMethodPicker.vue` e `components/_payment-method-picker.scss`, raiz `fieldset.payment-picker`. Dentro da `section.payment-page__secao` (sem `aria-labelledby`) com o `h2` "Forma de pagamento" na `PaymentView`.
- **API (decisão j):** a mesma: `v-model` (String, padrão `""`) e `PAYMENT_METHODS` exportado, sem mudança.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Nome do grupo | "Forma de pagamento" (`legend`, agora escondida, e o `h2` da seção) |
| Opções | `PAYMENT_METHODS`: "Cartão de crédito" (`credit-card`, "na entrega"), "Cartão de débito" (`credit-card`, "na entrega"), "PIX" (`qrcode`, "aprovação na hora"), "Dinheiro" (`money-bill`, "na entrega") |
| Valor | `value` (`credit`, `debit`, `pix`, `cash`) |

**Estrutura (rádio nativo, o padrão do `CategoryTabs` da etapa 6):**

- `fieldset.payment-picker` → `legend.visually-hidden` "Forma de pagamento" → `div.payment-picker__options` → um `label.payment-option(.is-checked)` por opção → `input[type=radio][name="payment-method"].visually-hidden.payment-option__input` (`v-model`, `:value`), `span.payment-option__controle[aria-hidden]` (com o `font-awesome-icon` `['fas', 'check']` `.payment-option__check`), `span.payment-option__text` (`span.payment-option__name` e `span.payment-option__desc`) e o ícone da forma (`.payment-option__icon`, `aria-hidden`), no fim.
- **Por quê:** é escolha exclusiva; o `fieldset` com `legend` agrupa os rádios [95]; nativo, o teclado e o estado vêm do navegador [92][96]; é o que o `CategoryTabs` adotou na etapa 6 [88][92][95][96].
- **Título e `legend`:** a seção ganha o `h2` visível, e a `legend` fica escondida, com o mesmo texto. Assim, a navegação por títulos alcança "Entrega" e "Forma de pagamento" do mesmo jeito, e o grupo continua nomeado quando o foco entra nos rádios: é a `legend` que dá o contexto do grupo [95].
  - **A `section` fica sem `aria-labelledby`** (volta 1 do revisor). Nomeada pelo `h2`, ela viraria uma região com o mesmo nome, e o nome seria lido três vezes: região, título e grupo. A seção "Entrega", sem `fieldset`, continua nomeada pelo `h2`.
  - Efeito esperado no leitor de tela (inferência, sem fonte que descreva os leitores): na leitura linear, o nome aparece duas vezes, no título e no grupo.
  - Nenhuma página aberta trata de título dentro da `legend`, por isso essa alternativa ficou de fora.

**Visual (lista segmentada [66][81]):**

- **Uma coluna em todas as larguras.** A lista segmentada é vertical [66][81]. Na grade 2×2 de hoje, a seta para baixo vai de "Cartão de crédito" para "Cartão de débito", que está ao lado, e não embaixo; numa coluna, a ordem das setas é a ordem visual.
- **Itens:** `--m3-surface-container-lowest`, cantos 20/4 pela posição (variáveis `--m3-item-canto-*`), vão de 2 px, `min-height: 4rem` (64 px, o de hoje, `SPEC.md` §4.1), `padding: var(--space-2) var(--space-4)`, `gap: var(--space-3)`, conteúdo centrado na vertical. A seção é a bandeja (`low`).
- **Controle no início (24 × 24):** o `ListItem` de seleção única do M3 põe o rádio no início da linha [107], e o rádio do material-web tem o ícone em `on-surface-variant` e o selecionado em `primary` [117]. Aqui:
  - **desmarcado:** círculo vazio, contorno de 2 px em `--m3-on-surface-variant` (9,29 sobre o item), como o contorno do checkbox desmarcado [113];
  - **marcado:** círculo cheio em `--m3-primary` com o check do Font Awesome em `--m3-on-primary` (6,43), como a caixa marcada do checkbox do modal [113]. É o "check" que o plano e a §6 do SPEC-M pedem.
  - **Tamanho:** 24 px, e não os 20 de [117], pelo critério 3 da §1.1 do SPEC-M (rádio com pelo menos 24 × 24, dentro de um `label` com pelo menos 44 px).
- **Por que o controle fica visível:** sem ele, nada mostra que a escolha é única antes do primeiro toque, e o grupo começa sem marcado. O controle também é o sinal do marcado que não depende da cor (abaixo).
- **Texto:** nome em body-l (`on-surface`), descrição em body-m (`on-surface-variant`), como o título e o apoio do `M3ItemSegmentado`.
- **Ícone da forma:** solto no fim, 20 px, em `on-surface-variant`. Sem o círculo tonal do `M3ItemSegmentado`: na marcada, o círculo `secondary-container` sumiria no fundo da linha, e o ícone é apoio, não ação.

**Marcado:**

- **Cores:** `--m3-secondary-container`, com nome, descrição e ícone em `--m3-on-secondary-container` (7,22), como o item atual da pílula (SPEC-M §4.2).
- **Forma:** os quatro cantos passam a 20 (`--m3-forma-l-aumentada`), em qualquer posição; a opção se destaca da lista. O selecionado troca de forma no grupo conectado [54], e as formas do `ListItem` mudam com a interação [107] (a página não diz em quais estados). A troca é direta, sem transição de `border-radius` (SPEC-M §1.1, item 8).
- **Sinais além da cor (1.4.1 [99]):**
  - o controle, que passa de círculo vazio a círculo cheio com check;
  - a forma, com os quatro cantos de 20;
  - o estado nativo `checked`, lido pelo leitor de tela [96];
  - a diferença de luminância **não** conta: `secondary-container` contra `lowest` dá 1,29 (medido), abaixo dos 3:1 que contam como sinal [99].
- **Contraste não textual [98] (medido):** o controle marcado contra a opção marcada, 4,98; com a opção no hover, 4,41; pressionada, 4,28; o contorno do desmarcado, 9,29 (7,60 com a linha pressionada).

**Estados:**

| Estado | Opção | Controle |
|---|---|---|
| Desmarcada | `lowest`, cantos da posição | contorno de 2 px em `on-surface-variant` |
| Desmarcada, hover (`hover-capable`) | camada de 8% (`currentColor`, o `on-surface`) [12] | igual |
| Desmarcada, pressionada | camada de 10% [12] | igual |
| Marcada | `secondary-container`, cantos 20 nos quatro | `primary` cheio, check `on-primary` |
| Marcada, hover e pressionada | camada de `on-secondary-container` (≈ `secondary-container-hover` e `-pressed`) | igual |
| Foco (`:has(:focus-visible)`) | anel interno de 3 px em `secondary` no `label` (`outline-offset: calc(-1 * var(--focus-width))`), porque os itens ficam encostados por 2 px (SPEC-M §1.1, item 4); 6,44 na desmarcada, 4,99 na marcada, 5,27 e 4,29 pressionadas (medidos) | — |
| `forced-colors: active` | toda opção com `border: 1px solid CanvasText`; a marcada com `2px solid Highlight`, como o `CategoryTabs` | contorno em `CanvasText`; o marcado com fundo `CanvasText` e check em `Canvas`, como o checkbox do material-web [114] |
| `prefers-contrast: more` | borda de 1 px em `outline` (4,06 sobre a bandeja; 4,48 sobre o item) | igual |

**Teclado:**

- **Tab:** uma parada só. Sem marcado, o foco cai no primeiro rádio; com Shift+Tab, alguns navegadores põem o foco no último quando nenhum está marcado [88]. Com um marcado, o Tab cai nele [88].
- **Setas (baixo e direita, cima e esquerda):** movem o foco e marcam, com volta do último ao primeiro [88]. No nativo, é o navegador quem faz [92][96]; nenhuma página aberta descreve o teclado do rádio nativo além do Shift+Tab (dossiê, "Não encontrei"), e por isso o `keyboard.mjs` confere.
- **Espaço:** marca o rádio focado.
- **Marcar com as setas habilita o CTA** (com endereço): é mudança de conteúdo, não de contexto [97]; o foco fica no rádio.
- **O grupo continua sem marcado no início.** O `SPEC.md` pede o CTA desabilitado até a escolha (§5.6, [EST-08, FLX-04]), e a APG prevê o grupo sem marcado para obrigar a escolha [88]. Marcar uma forma por padrão escolheria pela pessoa.

**Foco não coberto (pendência da etapa 4):**

- **Causa:** o `.visually-hidden` deixa o rádio com 1 × 1 px no meio do `label`, e o navegador rola até o rádio, não até o `label`.
- **Resposta:** a classe `.payment-option__input` dá ao rádio o retângulo do `label` (`inset: 0`, `width: 100%`, `height: 100%`, `margin: 0`) e `appearance: none`, para o desenho nativo do rádio não aparecer em nenhum navegador com o tamanho novo. O recorte do `.visually-hidden` continua (`clip` e `clip-path: inset(50%)`), então ele segue invisível e fora do clique. O `label` já é `position: relative` pela camada de estado. A rolagem usa o retângulo de layout, e o `clip-path` não muda o layout. Inferência: com isso, a rolagem do foco leva o `label` inteiro para cima do `scroll-padding-bottom`. A seleção `.payment-option__input` (uma classe com o atributo do escopo) vence a `.visually-hidden` global (uma classe).
- **O que continua igual** (conferido pelo revisor): o nome do rádio, o clique pelo `label`, o anel por `:has(:focus-visible)`, o `coveredBy` e o `ringOf` do `keyboard.mjs`, que sobem do `input.visually-hidden` ao `label`, e as cores forçadas.
- **Como o `keyboard.mjs` confere:** com `KB_ALTURA=800` e `KB_ALTURA=830`, em 390: entrar no grupo com Tab, marcar com Espaço e descer com as setas até o Dinheiro; a cada seta, o `coveredBy` não pode dar `overlap` com a toolbar. E com Shift+Tab, vindo do rodapé, sem marcado: o foco no último rádio também não pode dar `overlap`. O `keyboard.mjs` roda no Chromium (Playwright): a prova vale para ele, e os outros navegadores ficam sem prova (seção 11).

**Comportamento:** igual nas três larguras: uma coluna na largura da seção (cerca de 693 px em 1440, 576 em 1024 e 326 em 390).

**Movimento:**

- **Sempre:** o check entra e sai por opacidade em `--m3-dur-mola-efeitos-rapida`, por `transition` ligada ao estado (o check fica no DOM, com opacidade 0 na desmarcada; nunca por `@keyframes`), como o check do checkbox da etapa 6. A camada de estado troca por opacidade [12]. Fundo, contorno e cantos trocam direto.
- **`motion-ok`:** o check entra também com `scale(0)` → `none` na mola espacial rápida, como o check do "Adicionado" (SPEC-M §7.6).
- **Reduzido:** só a opacidade. A classe `.payment-option__check` entra no `_motion.scss`.

**Reserva:** as opções são fixas (`PAYMENT_METHODS`); o painel não as edita.

### 5.8 CTA do pagamento (decisão d)

- **Arquivo:** `PaymentView.vue`, no slot `cta` do `OrderSummary variant="compact"`.

| Campo | Origem |
|---|---|
| Rótulo | "Confirmar pedido · " e `formatPrice(cartStore.subtotal)` em `span.tabular` |
| Carregando | "Enviando pedido…" (800 ms, `SUBMIT_DELAY`) |
| Ajuda | "Escolha uma forma de pagamento" ou "Cadastre um endereço para receber o pedido." (`helpText`) |
| Aviso da conferência | "O carrinho foi atualizado com o cardápio. Confira o pedido antes de confirmar." |

- **Botão:** `BaseButton size="lg" block` (filled M, 56 px [17][18][19]) com a classe `payment-page__cta`.
- **O rótulo quebra linha, sempre:** a página põe `white-space: normal` na raiz do botão (`.payment-page__resumo .payment-page__cta`: duas classes e o atributo do escopo, contra o `.btn` do `BaseButton`), e o texto herda. Medidas (5.3): o botão tem 216 px de conteúdo em 1024 e 208 px numa janela de 320; "R$ 1.299,90" ocupa cerca de 273. Em duas linhas, o rótulo (dois title-m, 48 px) cabe nos 56 px do M; com três, o botão cresce.
- **Desabilitado** (sem forma ou sem endereço; `disabled` real, fora do Tab):
  - **Hoje, pelos apelidos:** fundo `--color-surface-4` (`surface-container-highest`, #e0e4db) e texto `--color-ink-disabled` (#a2a79e, `on-surface` a 38% já composto), sem camada nem troca de forma (`_base-button.scss`). O componente desabilitado fica isento de contraste [98].
  - **Decidido pela sessão principal:** fica para a etapa 10, que já desenha o `loading` e as variantes do `BaseButton`; o plano não lhe dava dono. Desenhá-lo aqui fixaria o desabilitado do login, do cadastro e do painel sem o desenho deles. O SPEC-M diz que a opacidade fica só no desabilitado [1]; não encontrei nos dossiês as medidas do botão desabilitado do M3.
- **Ajuda:** `p#pagamento-ajuda.payment-page__help`, logo abaixo do botão (`--space-3`), em body-m `on-surface-variant` (8,41 sobre o `low`), centralizada no eixo do botão, ligada por `aria-describedby` (hoje). Some quando o formulário fica válido.
- **Carregando:** "Enviando pedido…" com o spinner, `aria-busy` e a largura travada (hoje); a forma é da etapa 10. Spinner girando só em `motion-ok`; reduzido, parado, com o texto.
- **Conferência com o cardápio (§10.1 do `SPEC.md`):**
  - igual: o pedido não sai, o aviso info aparece, e a pessoa confirma de novo; se o carrinho ficar vazio, a tela vai para `/cart`;
  - **novo (apresentação; aceito pela sessão principal):** com o carrinho ainda com itens, depois do aviso, a `PaymentView` rola o elemento focado para a vista (`document.activeElement?.scrollIntoView?.({ block: "nearest" })`). Com o `scroll-padding` da rota somando a altura do aviso (seção 4), o CTA sai de baixo dele em 390. O jsdom não tem `scrollIntoView`: a chamada é opcional (`?.`).
  - **O que a rolagem não cobre:** no Safari e no Firefox do macOS, o clique não põe o foco no botão. Com o mouse, o `activeElement` é o `body`, e nada rola; o CTA pode ficar sob o aviso até ele sumir. Sem foco no CTA, não há foco a cobrir (a 2.4.11 trata do componente com o foco do teclado [76]); pelo teclado, o botão recebe o foco, e a rolagem vale.
- **Foco não coberto:** seção 4.

### 5.9 Confirmação (decisão f)

- **Arquivo e raiz:** `ConfirmationView.vue` e `pages/_confirmation.scss`: `div.confirmation-page.container` → `div.confirmation-page__coluna` (`max-width: 40rem`, `margin-inline: auto`) → `div.confirmation-page__pilha` (`gap: var(--m3-vao-segmento)`) → `div.confirmation-page__status` e `OrderSummary.confirmation-page__resumo` → `div.confirmation-page__acoes`.
- **Objetivo:** dizer que o pedido foi recebido, com o número e a forma, e mostrar o que foi pedido.

**Conteúdo:**

| Campo | Origem |
|---|---|
| `h1` | "Pedido recebido" (`ConfirmationView.vue`), `tabindex="-1"`, foco ao montar |
| Ícone | `circle-check`, `aria-hidden` |
| "Pedido" / "#1001" | rótulo da linha de hoje; `order.id` (tabular) |
| "Forma de pagamento" / "PIX" | o nome do grupo do pagamento; `order.paymentMethod` (o rótulo de `PAYMENT_METHODS`, gravado no pedido) |
| Resumo | `OrderSummary variant="readonly"` com `order.items` (sem imagem) |
| Ações | "Voltar ao cardápio" (`/menu`) e "Ver meus pedidos" (`/profile`) |

**A faixa (`primary-container`):**

- `--m3-primary-container`, cantos 28/28/4/4 (`--m3-forma-xl` em cima, `--m3-forma-xs` embaixo), `padding: var(--space-5)`, tinta `--m3-on-primary-container` (7,24). Sem sombra e sem borda.
- **Dentro:** grade `auto 1fr`, `gap: var(--space-4)`. O ícone (2,5rem, 40 px, `on-primary-container`, SPEC-M §5.7) no início, alinhado ao topo do `h1`. O `h1` em headline-m 28/36, 500. Abaixo dele (`--space-3`), `dl.confirmation-page__dados` com dois pares lado a lado (`gap` de `--space-5`, com quebra): `dt` em body-m e `dd` em title-m 500.
- **Desvio registrado da SPEC-M §5.7:** lá, a linha do pedido fica abaixo do `primary-container`, junto do `OrderSummary`. Aqui, a `dl` entra na faixa. Motivo:
  - o número e a forma dizem qual pedido foi recebido: são parte do estado que o `h1` anuncia, e não do que foi pedido;
  - sem eles, a faixa teria só o ícone e o título, e o resumo começaria com dados soltos antes do próprio título;
  - os pares já existem: `on-primary-container` sobre `primary-container` (7,24), o mesmo do `h1`.
  - A sessão C atualiza a §5.7 do SPEC-M. A troca do "·" pela `dl` foi confirmada pelo usuário em 22/11/2026, ao ler o desenho (seção 12).
- **Como se diferencia do hero da Home:**

  | | Hero da Home abaixo de `md` | Faixa da confirmação |
  |---|---|---|
  | Forma | canto 28 nos quatro (48 a partir de `md`) | 28 em cima e 4 embaixo, colada ao resumo por 2 px |
  | Título | display-s 36/44 (display-l em `xl`) | headline-m 28/36, ao lado de um ícone |
  | Conteúdo | título, texto corrido, botão e a foto no disco | ícone, título e dois dados |
  | Altura em 390 | cerca de 600 px | cerca de 130 px |
  | Movimento | a prensa, uma vez | nenhum |
  | Disco, foto, ação dentro | sim | não |

- **Por que a pilha:** a faixa diz o estado, e o resumo é o que foi pedido; são uma coisa só, como os segmentos de uma lista agrupada [66]. Os cantos de dentro de 4 e o vão de 2 px são os da lista segmentada [8].
- **O resumo fica fora da faixa,** como segundo segmento, em `--m3-surface-container-low`, cantos 4/4/28/28, `padding: var(--space-5)`, com o título "Resumo do pedido" (`h2`). Dentro do `primary-container`, o resumo precisaria de pares novos (`on-surface-variant`, `outline-variant`) sobre o verde e misturaria estado e conferência.

**Ações:**

- `BaseButton size="lg" to="/menu"` (filled M) e `BaseButton variant="secondary" size="lg" to="/profile"` (tonal M), nessa ordem, a `--space-5` da pilha, sobre a `surface`: os pares são os de hoje (o filled contra a `surface`, 6,13; o texto do tonal, 7,22). Nenhum par sobre o `primary-container`.
- **390:** uma coluna, os dois na largura toda (grade de uma coluna), o filled primeiro.
- **A partir de `sm`:** lado a lado, alinhados ao início da coluna, com `gap: var(--space-3)`.

**Acessibilidade:**

- Um `h1`, dentro da faixa; o `h2` do resumo depois dele.
- **Foco ao montar:** o `h1` recebe o foco (hoje). O anel aparece quando o navegador considera o foco visível (a captura da etapa 6 o mostra); sobre a faixa, `secondary` sobre `primary-container` dá 4,99 (medido; par de hoje). O afastamento de 2 px fica dentro do padding de 24.
- **A `dl`:** "Pedido" e "#1001", "Forma de pagamento" e "PIX". O nome acessível é o texto dos termos e das definições; como cada leitor apresenta a `dl` não está no dossiê (inferência).

**Comportamento:**

- **1440 e 1024:** coluna de 40rem no centro; a faixa com cerca de 130 px de altura.
- **390:** a coluna na largura toda (358 px); o ícone e o `h1` numa linha (cerca de 40 + 16 + 215 px dos 310 úteis); os dois pares da `dl` lado a lado (cerca de 225 px).

**Movimento:** nenhum. O check é estático (sem "check animado de sucesso", regras comuns). A troca de tela é a do router.

**Reserva:**

- **Sem `lastOrderId`:** o guard leva a `/menu` (hoje).
- **Pedido com muitas linhas:** o resumo cresce; as ações ficam no fim.
- **Forma de pagamento longa:** o par quebra para a linha de baixo (`flex-wrap`).
- **`forced-colors`:** os fundos somem; o texto, o ícone e a `dl` continuam. Sem borda: o estado está no texto.

---

## 6. Matriz de estados

Mesmo formato da §6 do SPEC-M. "Anel" é o contorno de 3 px em `--m3-secondary`, afastado 2 px [30]; "anel interno" usa `outline-offset: calc(-1 * var(--focus-width))`; "camada" é o `currentColor` a 8% no hover (só `hover-capable`) e 10% no pressionado [12].

| Componente | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
|---|---|---|---|---|---|---|---|
| Bandeja do carrinho | `surface-container-low`, canto 28, padding 8 | — | — (não é interativa) | — | — | — | — |
| Item do carrinho | `surface-container-lowest`, cantos 20/4, vão de 2 px; nome body-l, detalhes body-m, total title-m 500 | — (não é ação) | nos controles | — | — | stepper no limite: `disabled` real | foto: caixa em `surface-container`; falha: ícone `utensils` |
| "Remover" (forma da Brasa até a etapa 10) | tinta `error` (6,46), 44 px | `error-container` | anel | `error-container` | — | — | — |
| Contêiner do `OrderSummary` (na página) | `surface-container-low`, canto 28, sem sombra; coluna 4/12 a partir de `lg` | — | — | — | grudado a partir de `lg` (no pagamento, só com 48rem de altura, pelo mixin `altura-min`) | — | — |
| `OrderSummary` (conteúdo) | título headline-s; Subtotal body-l `on-surface-variant`; Total title-m 500 e headline-s 500 tabular; divisor `outline-variant` só com linhas | — | — | — | — | — | — |
| Links de texto ("Continuar comprando", "Alterar no perfil") | text button, tinta `primary` (5,82 sobre o `low`) | camada 8% | anel (5,83) | camada 10% (5,07) | — | — | — |
| "Criar conta" | tonal de hoje sobre o `low` (contêiner 1,16, isento [98]) | `secondary-container-hover` | anel (5,83 sobre o `low`) | `secondary-container-pressed` | — | — | — |
| "Adicionar endereço" | filled S (`primary` / `on-primary`, 6,43), 40 px com alvo de 44; contêiner 4,98 contra o `aviso-container` | `primary-hover` (4,13 contra o aviso; rótulo 5,33) | anel (4,99 sobre o `aviso-container`) | `primary-pressed` (3,94; rótulo 5,09), cantos `forma-m` | — | — | — |
| Aviso de endereço | `aviso-container`, canto 16; texto e ícone `aviso` (5,03) | — | — | — | — | — | — |
| Aviso de endereço em `forced-colors` e `prefers-contrast: more` | borda de 1 px (`CanvasText`; `outline` com mais contraste) | — | — | — | — | — | — |
| `PaymentMethodPicker`, opção desmarcada | `lowest`, cantos da posição, 64 px; controle vazio (2 px `on-surface-variant`) | camada 8% | anel interno no `label` (`:has(:focus-visible)`) | camada 10% | — | — | — |
| `PaymentMethodPicker`, opção marcada | `secondary-container` / `on-secondary-container`, cantos 20 nos quatro; controle `primary` com check `on-primary` | camada de `on-secondary-container` | anel interno (4,99) | camada 10% (controle 4,28) | `checked` nativo; controle cheio e forma (1.4.1 [99]) | — | — |
| `PaymentMethodPicker` em `forced-colors` e `prefers-contrast: more` | toda opção com borda de 1 px (`CanvasText`; `outline` com mais contraste); controle em `CanvasText` | — | anel do sistema | — | marcada: `2px solid Highlight`; controle com fundo `CanvasText` e check `Canvas` [114] | — | — |
| CTA do pagamento | filled M, `block`; rótulo com quebra de linha (`white-space: normal`) | `primary-hover` | anel (5,83 sobre o `low`) | `primary-pressed`, cantos `forma-l` | — | hoje: `surface-container-highest` e `ink-disabled` (isento [98]); desenho na etapa 10 | "Enviando pedido…", spinner e `aria-busy` (etapa 10) |
| Faixa da confirmação | `primary-container`, cantos 28/28/4/4; tinta `on-primary-container` (7,24) | — | anel no `h1` ao montar (4,99) | — | — | — | — |
| Resumo da confirmação | `surface-container-low`, cantos 4/4/28/28 | — | — | — | — | — | — |

Os estados de vazio seguem a §6 do `SPEC.md`: o carrinho vazio tem o `EmptyState` (5.5).

---

## 7. Inventário

**Contagem:** nenhum componente novo. Mudam **3 componentes** (`CartItem`, `OrderSummary` e `PaymentMethodPicker`) e **3 views** (`CartView`, `PaymentView` e `ConfirmationView`). A bandeja, o aviso, a faixa e a pilha ficam nas views, sem `M3*` novo. Nada vem de `src/direcoes/`: a `M3Foto`, o `M3ItemLista` (só como padrão de cantos) e o rádio do `CategoryTabs` já são de produção.

### 7.1 `CartItem` (muda)

- **Props:** `item: { type: Object, required: true }`; `index: { type: Number, required: true }`.
- **Emits:** `remove` (índice) e `update-quantity` (índice, quantidade), como hoje.
- **Slots:** nenhum.
- **Estrutura:** `li.cart-item` → `div.cart-item__top` (`M3Foto.cart-item__foto`, `div.cart-item__info` com `p.cart-item__name` e `p.cart-item__detail` × n, `p.cart-item__total.tabular`) → `div.cart-item__bottom` (`QuantityStepper`, `BaseButton` danger com `data-remove`).
- **Na parcial:** o canto de 16 do cartão pela regra sobre a raiz da `M3Foto`, sem `:deep()` (5.2); `overflow-wrap: anywhere` no nome e nos detalhes.
- **Lógica nova:** `imagemFalhou` (ref, ligado ao `@erro` da `M3Foto`); `forma` (computed: `drinks` → `circulo`, `desserts` → `flor`, o resto → `cartao`).
- **Classes que ficam:** `.cart-item`, `.cart-item__detail`, `.cart-item__total` (o `flow.mjs` lê as três). Saem `.cart-item__thumb` e `.cart-item__img`.
- **Tokens:** `--m3-surface-container-lowest`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-forma-l-aumentada`, `--m3-forma-xs`, `--m3-forma-l`, `--m3-body-l`, `--m3-body-m`, `--m3-title-m`, `--space-1` a `--space-4`.
- **Mixins:** `tipo`, `up(sm)`.
- **Referências:** [8], [66], [81], [78], [H19].

### 7.2 `OrderSummary` (muda)

- **Props (iguais):** `items: { type: Array, required: true }`; `variant: { type: String, default: "cart", validator: cart | compact | readonly }`; `title: { type: String, default: "Resumo do pedido" }`; `titleId: { type: String, default: "resumo-do-pedido" }`; `showTitle: { type: Boolean, default: true }`; `headingLevel: { type: [Number, String], default: 2 }`.
- **Slots:** `cta`. **Emits:** nenhum.
- **Estrutura:** a de hoje: `section.order-summary` → título → `ul.order-summary__items` (fora do `cart`) → `dl.order-summary__totals` → `div.order-summary__cta`.
- **Muda só a parcial:** a tipografia por papel, o divisor só com linhas e o `overflow-wrap: anywhere` em `.order-summary__name` e `.order-summary__detail` (5.3). O contêiner fica nas páginas.
- **Classes que ficam:** `.order-summary__name`, `.order-summary__value`, `.order-summary__cta` (o `flow.mjs` lê as três).
- **Tokens:** `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-outline-variant`, `--m3-body-l`, `--m3-body-m`, `--m3-title-m`, `--m3-headline-s`, `--space-2` a `--space-4`.
- **Referências:** [1], [66], [98].

### 7.3 `PaymentMethodPicker` (muda)

- **API:** `defineModel({ type: String, default: "" })`; `export const PAYMENT_METHODS` sem mudança.
- **Estrutura:** 5.7.
- **Classes que ficam:** `.payment-picker`, `.payment-option`, `.is-checked`, `.payment-option__icon`, `.payment-option__text`, `.payment-option__name`, `.payment-option__desc` (o `flow.mjs` clica em `label.payment-option`). Novas: `.payment-option__input` (o retângulo do `label` e `appearance: none`, 5.7), `.payment-option__controle`, `.payment-option__check` (agora o `check` dentro do controle; sai o `circle-check` daqui).
- **Tokens:** `--m3-surface-container-lowest`, `--m3-secondary-container`, `--m3-on-secondary-container`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-primary`, `--m3-on-primary`, `--m3-secondary`, `--m3-outline`, `--m3-forma-l-aumentada`, `--m3-forma-xs`, `--m3-forma-full`, `--m3-vao-segmento`, `--m3-body-l`, `--m3-body-m`, `--m3-mola-efeitos-rapida`, `--m3-dur-mola-efeitos-rapida`, `--m3-mola-espacial-rapida`, `--m3-dur-mola-espacial-rapida`, `--focus-width`, `--color-focus`, `--space-2` a `--space-4`.
- **Mixins:** `camada-de-estado`, `tipo`, `hover-capable`, `motion-ok`.
- **Referências:** [12], [54], [66], [81], [88], [92], [95], [96], [97], [98], [99], [107], [113], [114], [117].

### 7.4 `CartView` (muda)

- **Estrutura:** `div.cart-page.container` → `h1` → `EmptyState` ou `div.cart-page__layout` (`section.cart-page__lista` com o `h2` escondido e a `ul`; `OrderSummary.cart-page__resumo` com os CTAs).
- **Lógica:** a de hoje; mais o foco no "Remover" do item devolvido pelo "Desfazer" (seção 8).
- **Parcial:** a bandeja, o contêiner do resumo, a grade 8/12 e 4/12 (a de hoje), o sticky e o `scroll-padding` com o aviso (seção 4).

### 7.5 `PaymentView` (muda)

- **Estrutura:** `div.payment-page.container` → `h1` → `div.payment-page__layout` → `div.payment-page__sections` (a `section` "Entrega", nomeada pelo `h2`, e a `section` "Forma de pagamento", sem `aria-labelledby`) e `OrderSummary.payment-page__resumo` com o CTA `.payment-page__cta` e a ajuda. No aviso, o "Adicionar endereço" em filled S.
- **Lógica:** a de hoje; mais a rolagem do foco depois do aviso da conferência (seção 8).
- **Parcial:** contêineres, aviso, grade 8/12 e 4/12, sticky com o mixin `altura-min` (48rem), `scroll-padding` com o aviso, `white-space: normal` no rótulo do CTA.

### 7.6 `ConfirmationView` (muda)

- **Estrutura:** 5.9. Sai `.confirmation-page__card` e `.confirmation-page__meta`; entram `__coluna`, `__pilha`, `__status`, `__icone`, `__dados`, `__resumo` e `__acoes`.
- **Lógica:** a de hoje (`order` pelo `lastOrderId`, foco no `h1` ao montar).

### O que fica sem uso (para a etapa 11, salvo quando dito)

- **Pares do `PARES_TELAS_BRASA` que saem já nesta etapa** (o comentário do grupo diz que saem quando a tela migrar): "aviso sem endereço" (`aviso` sobre `surface-container`) e "ícone e texto de sucesso" (`sucesso` sobre `surface-container`, só a confirmação o usava). Ver a seção 8.
- **Apelidos:** `--color-warning` e `--color-success` continuam em uso no login, no admin e no toast; `--color-accent-soft`, na sidebar do admin. Nada sai daqui.
- **Ícones:** `circle-check` continua (toast e confirmação); nenhum fica sem uso.

---

## 8. Tokens, pares, lógica, dependências e textos

### Tokens novos (em `base/_tokens.scss`, prefixo `--m3-`; o valor final é do construtor)

| Token | Tipo | Valor | Referência |
|---|---|---|---|
| `--m3-toast-reserva` | layout | cerca de `6rem` (um aviso de até 3 linhas em 390, de 72 a 92 px, mais o vão); o construtor mede na captura | Soma ao `scroll-padding` da rota enquanto há aviso (seção 4). Fica nesta etapa; a etapa 10 o herda ou o absorve no `AppToast` |

Nenhuma cor nova, nenhuma duração nova (o check usa as molas que existem), nenhum z-index novo. A coluna do resumo é a 4/12 de hoje: sem token.

**Mixin novo em `base/_breakpoints.scss`:** a altura mínima do sticky do pagamento (48rem) não vai para a parcial nem para um token CSS (media query não lê variável CSS). Entra como mixin ao lado do `up()` e do `below()`, por exemplo `altura-min($altura)`, que lê um mapa de alturas como o `$breakpoints` e dá erro com chave desconhecida, como o `up()`. O nome do mixin e a chave ficam a critério do construtor; o valor é 48rem.

### Pares novos (para `src/utils/contraste.js`, num grupo `PARES_CARRINHO`)

Medidos nesta sessão com `lerTokens` e `medirPar` do próprio `contraste.js`, num `node --input-type=module -e` que só lê o `base/_tokens.scss`, em duas casas, para baixo, como o `contraste.test.js`.

| Frente | Fundo | Mínimo | Medido | Onde |
|---|---|---|---|---|
| `m3-primary` | `m3-surface-container-low` | 4,5 | 5,82 | Text buttons "Continuar comprando" e "Alterar no perfil"; o filled contra os contêineres |
| `m3-primary` | `m3-camada-primary-pressionada` sobre `m3-surface-container-low` | 4,5 | 5,07 | Text button pressionado sobre os contêineres (hover: 5,22) |
| `m3-secondary` | `m3-surface-container-low` | 3 | 5,83 | Anel de foco nos contêineres (resumo e seções) |
| `m3-secondary` | `m3-aviso-container` | 3 | 4,99 | Anel do "Adicionar endereço" dentro do aviso |
| `m3-primary` | `m3-aviso-container` | 3 | 4,98 | Contêiner do filled S "Adicionar endereço" contra o aviso |
| `m3-primary-hover` | `m3-aviso-container` | 3 | 4,13 | O mesmo contêiner no hover |
| `m3-primary-pressed` | `m3-aviso-container` | 3 | 3,94 | O mesmo contêiner pressionado |
| `m3-error` | `m3-surface-container-lowest` | 4,5 | 6,46 | "Remover" sobre o item do carrinho |
| `m3-primary` | `m3-secondary-container` | 3 | 4,98 | Controle marcado contra a opção marcada |
| `m3-primary` | `m3-secondary-container-pressed` | 3 | 4,28 | Controle marcado com a opção pressionada (hover: 4,41) |
| `m3-secondary` | `m3-secondary-container-pressed` | 3 | 4,29 | Anel interno da opção marcada pressionada |
| `m3-secondary` | `m3-camada-pressionada` sobre `m3-surface-container-lowest` | 3 | 5,27 | Anel interno da opção desmarcada pressionada |
| `m3-outline` | `m3-surface-container-low` | 3 | 4,06 | Borda das opções e do aviso com `prefers-contrast: more` |

**Pares que ganham uso** (o mínimo não muda; a coluna "onde" muda):

| Frente | Fundo | Medido | Novo uso |
|---|---|---|---|
| `m3-on-surface` | `m3-surface-container-low` | 15,49 | Títulos do resumo e das seções; endereço; Total |
| `m3-on-surface-variant` | `m3-surface-container-low` | 8,41 | Subtotal, linhas do compacto, ajuda do CTA, aviso do visitante |
| `m3-on-surface` | `m3-surface-container-lowest` | 17,11 | Nome e total do item; nome da opção |
| `m3-on-surface-variant` | `m3-surface-container-lowest` | 9,29 | Detalhes do item; descrição e ícone da opção; contorno do controle desmarcado |
| `m3-on-surface` / `m3-on-surface-variant` | `m3-camada-pressionada` sobre `m3-surface-container-lowest` | 14,00 / 7,60 | Opção desmarcada pressionada (nome; descrição e controle) |
| `m3-secondary` | `m3-surface-container-lowest` | 6,44 | Anel interno da opção desmarcada; anel nos controles do item |
| `m3-outline` | `m3-surface-container-lowest` | 4,48 | Borda do `QuantityStepper` no item; borda da opção com `prefers-contrast: more` |
| `m3-on-secondary-container` | `m3-secondary-container` / `-pressed` | 7,22 / 6,21 | Opção marcada (nome, descrição, ícone), em repouso e pressionada |
| `m3-secondary` | `m3-secondary-container` | 4,99 | Anel interno da opção marcada |
| `m3-on-primary` | `m3-primary` | 6,43 | Check do controle marcado; rótulo do "Adicionar endereço" |
| `m3-on-primary` | `m3-primary-hover` / `-pressed` | 5,33 / 5,09 | Rótulo do "Adicionar endereço" no hover e pressionado |
| `m3-aviso` | `m3-aviso-container` | 5,03 | Texto e ícone do aviso sem endereço |
| `m3-error` | `m3-error-container` | 4,99 | "Remover" no hover e pressionado |
| `m3-on-primary-container` | `m3-primary-container` | 7,24 | `h1`, ícone e dados da faixa da confirmação |
| `m3-secondary` | `m3-primary-container` | 4,99 | Anel no `h1` da confirmação |
| `m3-primary` | `m3-surface` | 6,13 | "Voltar ao cardápio" (filled) na superfície |

**Medidos e descartados:**

- `m3-primary` sobre `m3-camada-primary-pressionada` sobre `m3-aviso-container`: 4,37. Reprova o text button dentro do aviso. Em repouso, 4,98.
- `m3-secondary-container` contra `m3-aviso-container`: 1,00. O tonal some no aviso; por isso o "Adicionar endereço" é filled S (volta 1 do revisor).
- `m3-secondary-container` contra `m3-surface-container-lowest`: 1,29. Não serve de sinal do marcado (1.4.1 [99]); os sinais são o controle e a forma.
- `m3-surface-container-lowest` contra `m3-surface-container-low`: 1,10; `m3-surface-container-lowest` contra `m3-surface`: 1,04; `m3-surface-container-low` contra `m3-surface`: 1,05; `m3-primary-container` contra `m3-surface`: 1,23. Os contornos dos itens, da bandeja e da faixa ficam isentos: nenhum é controle, e o texto os identifica [98]. O precedente é a lista da Home (`lowest` no `low`).

**Isento e declarado:** `m3-secondary-container` contra `m3-surface-container-low`, 1,16: o contêiner do tonal "Criar conta" no resumo. Um controle com texto dispensa borda [98]; é o precedente da etapa 6 (desenho do Cardápio, §8). O rótulo tem 7,22.
- `m3-outline-variant` sobre `m3-surface-container-low`: 1,53. O divisor do resumo é decorativo (5.3).
- `m3-on-surface-variant` sobre `m3-secondary-container`: 7,20. Passaria, mas a opção marcada usa `on-secondary-container` em tudo (7,22).

**Pares de hoje que mudam (`PARES_TELAS_BRASA`):**

| Par | O que acontece |
|---|---|
| "item selecionado (forma de pagamento)": `m3-on-surface` sobre `m3-primary-container` (13,24) | Deixa de servir ao pagamento; fica para o item atual da sidebar do admin (`--color-accent-soft` com `--color-ink`, `_sidebar-admin.scss`) até a etapa 9. Muda o "onde" |
| "aviso sem endereço": `m3-aviso` sobre `m3-surface-container` (5,57) | Sai: o aviso passa ao `aviso-container` (par de hoje em `PARES_OUTRAS_TELAS`, 5,03, que ganha o uso) |
| "ícone e texto de sucesso": `m3-sucesso` sobre `m3-surface-container` (5,53) | Sai: o check da confirmação passa a `on-primary-container` |

### Lógica (nenhuma mudança de fluxo; só o que a apresentação pede)

| O que | Onde | Por quê |
|---|---|---|
| `forma` pela categoria e `imagemFalhou` | `CartItem` | Miniatura `M3Foto` com reserva (5.2) |
| `h2#itens-titulo` e `aria-labelledby` (no lugar do `aria-label`) | `CartView` | Título da região da lista (5.2) |
| No "Desfazer": `restoreItem`, `await nextTick()` e o foco no `[data-remove]` do índice devolvido (aceito pela sessão principal) | `CartView` | Hoje o foco cai no `body` quando o aviso some (5.2). O `runAction` do `toast.js` chama o `onClick` e o `dismiss` em seguida; o foco do `nextTick` vem depois do `dismiss` |
| Depois do aviso da conferência, com itens: `await nextTick()` e `document.activeElement?.scrollIntoView?.({ block: "nearest" })` (aceito pela sessão principal) | `PaymentView` | O CTA focado sai de baixo do aviso em 390 (5.8). Não cobre o clique no Safari e no Firefox do macOS, onde o botão não recebe foco (5.8) |
| `:global(html:has(.cart-page):has(.toast-region .toast))` e o mesmo com `.payment-page`: `scroll-padding` somando `--m3-toast-reserva` (abaixo de `md` no pé; a partir de `md` no topo) | `_cart-page.scss`, `_payment.scss` | Foco não coberto pelo aviso, técnica C43 [76] (seção 4). Fica nesta etapa; a etapa 10 herda ou absorve |
| `.payment-option__input` com o retângulo do `label` e `appearance: none` | `_payment-method-picker.scss` | Foco não coberto pelas setas (5.7) |
| Mixin `altura-min` (48rem) | `base/_breakpoints.scss` | Sticky do resumo do pagamento só em janelas com altura para ele (5.3) |
| `white-space: normal` na raiz do CTA do pagamento | `_payment.scss` | O rótulo quebra linha em totais grandes e janelas estreitas (5.8) |

Nada muda no `cartStore`, no `userStore`, no `toast.js`, nos guards, nos 800 ms, na conferência nem no `placeOrder`.

### Dependências

Nenhuma. Ícones: `check`, `utensils`, `trash-can`, `rotate-left`, `circle-exclamation`, `circle-check`, `credit-card`, `qrcode`, `money-bill` e `shopping-cart`, todos já registrados no plugin.

### Textos

Todos reais. Mudam três apresentações; nenhuma palavra nova:

| Texto | Antes | Depois | Motivo |
|---|---|---|---|
| "Pedido #1001 · PIX" | uma linha com "·" (`SPEC.md` §5.7, SPEC-M §5.7) | `dl`: "Pedido" / "#1001" e "Forma de pagamento" / "PIX" | Junta dois dados com "·", o padrão genérico que a Home tirou dos contatos e dos direitos (SPEC-M §8.1 e §10.2); coerente com o 6.h, que manteve o "·" só onde rótulo e preço são uma ação. Os rótulos são reais ("Pedido", da linha de hoje; "Forma de pagamento", do grupo). **Confirmado pelo usuário em 22/11/2026; a sessão C passa pela skill `design:ux-copy`** |
| "Forma de pagamento" | `legend` visível | `h2` visível e a `legend` escondida, com o mesmo texto | Hierarquia (5.7) |
| "Itens do carrinho" | `aria-label` da `section` | `h2` escondido que nomeia a `section` | Hierarquia (5.2) |

Ficam como estão:

| Texto | Origem | Onde |
|---|---|---|
| "Seu carrinho", "Finalizar pedido", "Pedido recebido" | views | `h1` |
| "Resumo do pedido", "Subtotal", "Total" | `OrderSummary.vue` | Resumo |
| "Finalizar pedido", "Continuar comprando", "Entre para finalizar seu pedido.", "Entrar e finalizar", "Criar conta" | `CartView.vue` | CTAs do carrinho |
| "Remover", "Remover {nome}", "{nome} removido.", "Desfazer" | `CartItem.vue`, `CartView.vue` | Remover e aviso |
| "Diminuir {nome}", "Aumentar {nome}", "Quantidade de {nome}" | `QuantityStepper.vue` | Stepper |
| "Seu carrinho está vazio", "Escolha um burger no cardápio para começar.", "Ver cardápio" | `CartView.vue` | `EmptyState` |
| "Entrega", "CEP {cep}", "Alterar no perfil", "Cadastre um endereço para receber o pedido.", "Adicionar endereço" | `PaymentView.vue` | Entrega |
| Os quatro rótulos e descrições de `PAYMENT_METHODS` | `PaymentMethodPicker.vue` | Opções |
| "Confirmar pedido · R$ x" | `SPEC.md` §5.6 | CTA (o "·" fica: rótulo e preço de uma ação, 6.h). Nome acessível: o texto do botão |
| "Enviando pedido…", "Escolha uma forma de pagamento", "O carrinho foi atualizado com o cardápio. Confira o pedido antes de confirmar." | `PaymentView.vue` | Carregando, ajuda e aviso |
| "Voltar ao cardápio", "Ver meus pedidos" | `ConfirmationView.vue` | Ações |

---

## 9. Arquivos para o construtor (sessão C)

```
src/views/CartView.vue                       h2 escondido, bandeja, resumo com classe, foco no Desfazer
src/assets/styles/pages/_cart-page.scss      bandeja, contêiner do resumo, grade 8/12 e 4/12 (a de hoje),
                                             sticky, scroll-padding com o aviso
src/components/CartItem.vue                  M3Foto (forma pela categoria, imagemFalhou), estrutura
src/assets/styles/components/cart-item.scss  item segmentado (--m3-item-canto-*), canto 16 do cartão (regra
                                             na raiz da M3Foto, sem :deep()), tipo, overflow-wrap
src/components/OrderSummary.vue              sem mudança de template (só se a sessão C precisar de classe)
src/assets/styles/components/_order-summary.scss   tipografia por papel, divisor só com linhas,
                                             overflow-wrap no nome e nos detalhes
src/views/PaymentView.vue                    duas seções com h2 (a de Forma de pagamento sem
                                             aria-labelledby), aviso com filled S, CTA com classe,
                                             rolagem depois da conferência
src/assets/styles/pages/_payment.scss        contêineres, aviso, grade 8/12 e 4/12, sticky com altura-min,
                                             scroll-padding, white-space: normal no CTA
src/components/PaymentMethodPicker.vue       legend escondida, controle, check, ícone no fim
src/assets/styles/components/_payment-method-picker.scss   lista segmentada, marcada, rádio do
                                             tamanho do label com appearance: none, forced-colors,
                                             prefers-contrast
src/views/ConfirmationView.vue               coluna, pilha, faixa, dl, ações
src/assets/styles/pages/_confirmation.scss   faixa, segmento do resumo, ações
src/assets/styles/base/_tokens.scss          --m3-toast-reserva
src/assets/styles/base/_breakpoints.scss     mixin altura-min (mapa de alturas; 48rem)
src/assets/styles/base/_motion.scss          + .payment-option__check
src/utils/contraste.js                       PARES_CARRINHO (13 pares), os "onde" da seção 8, e os
                                             dois pares que saem do PARES_TELAS_BRASA
```

**Não mexer:** `BurgerStack.vue`, `AssinaturaEncaixe.vue`, `src/direcoes/`, `BaseButton`, `QuantityStepper`, `EmptyState`, `AppToast` e `toast.js` (etapa 10), `M3Foto` (o canto do cartão é ajustado pela parcial do `CartItem`), `ProfileView` (etapa 8).

**Testes:**

- `src/__tests__/PaymentView.test.js`: os 5 de hoje ficam. Entram:
  - um `fieldset` com `legend` "Forma de pagamento", quatro `input[type=radio]` no mesmo `name`, nenhum marcado ao abrir, e um `h2` "Forma de pagamento" visível, com a `section` dele sem `aria-labelledby`;
  - sem endereço, o "Adicionar endereço" é um link para `/profile` com a forma filled S;
  - marcar um rádio (`setValue` ou `change`) habilita o CTA; sem endereço, continua desabilitado, com `aria-describedby="pagamento-ajuda"` e a ajuda certa;
  - "Enviando pedido…" e `aria-busy` durante os 800 ms (temporizadores falsos);
  - na conferência, a chamada a `scrollIntoView` não quebra no jsdom (que não a tem).
  - **As setas não marcam no jsdom:** o comportamento é do navegador [92][96]. O grupo com setas fica no `keyboard.mjs`.
- `src/__tests__/CartView.test.js` (novo):
  - um `h1` "Seu carrinho" e um `h2` "Itens do carrinho" que nomeia a lista;
  - a lista segmentada: um `li.cart-item` por linha, na ordem da store, com "Remover {nome}";
  - remover mostra o aviso "{nome} removido." com "Desfazer"; "Desfazer" devolve o item ao mesmo índice e põe o foco no "Remover" dele;
  - o foco vai ao "Remover" vizinho, ou ao `h1` quando o último sai;
  - o visitante vê "Entrar e finalizar" (`/login?redirect=/payment`) e "Criar conta" (`/register?redirect=/payment`); logado, "Finalizar pedido" e "Continuar comprando";
  - carrinho vazio: "Seu carrinho está vazio".
- `src/__tests__/ConfirmationView.test.js` (novo):
  - o `h1` "Pedido recebido" recebe o foco ao montar;
  - o número do pedido e a forma aparecem (`dl` com "Pedido" / "#1001" e "Forma de pagamento" / "PIX"), sem "·";
  - o resumo somente leitura mostra as linhas do pedido;
  - "Voltar ao cardápio" (`/menu`) e "Ver meus pedidos" (`/profile`).
- Opcional, no padrão do `cardapio-estilo.test.js`: um `carrinho-estilo.test.js` com as parciais compiladas (cantos 20/4 e vão de 2 px, a bandeja de padding 8, o rádio do tamanho do `label`, o `:global()` do `scroll-padding`, a grade 8/12 e 4/12, o `white-space: normal` do CTA, o `overflow-wrap` dos detalhes, nenhum `transform` fora de `motion-ok`).

**e2e (`.claude/e2e/`):**

- `flow.mjs` (carrinho e pagamento):
  - os seletores que ficam: `.cart-item__detail`, `.cart-item__total`, `.cart-item`, `.order-summary__value`, `.order-summary__name`, `.order-summary__cta button`, `.cart-page__notice`, `label.payment-option`;
  - a confirmação: a conferência de "Pedido #1001 · PIX" em `.confirmation-page__meta` passa à `dl.confirmation-page__dados` ("#1001" e "PIX");
  - o "Desfazer": além de devolver o item, o foco fica no "Remover" dele.
- `keyboard.mjs` (o ponto de atenção 3):
  - as setas do pagamento, com `KB_ALTURA=800` e `KB_ALTURA=830` (e os 844 de hoje), em 390: Tab entra no primeiro rádio, Espaço marca, as setas descem até o Dinheiro e voltam ao primeiro; a cada passo, o `label` focado não dá `overlap` com a toolbar; com Shift+Tab vindo de baixo, sem marcado, o mesmo;
  - o `focusNotCovered` passa também pelo carrinho do visitante e pelo pagamento sem endereço;
  - o "Remover" em 390 (844 e 800): com três itens, remover o do meio perto do pé; o "Remover" vizinho, focado, não fica dentro nem por baixo do retângulo do `.toast`, nem da toolbar;
  - o anel de 3 px no `label` da opção (o `ringOf` de hoje sobe do `input.visually-hidden` ao `label`);
  - a partir de `md` (1024), o "Remover" vizinho focado depois de uma remoção perto do topo não fica por baixo do `.toast`;
  - o `keyboard.mjs` roda no Chromium: as três inferências (rádio do tamanho do `label`, `focus()` com o `scroll-padding` e a reserva de um aviso) ficam provadas só nele (seção 11).
- `lacunas.mjs`: a conferência do padding de `.confirmation-page__card` (32 px) passa a `.confirmation-page__status` (24 px) ou sai.
- `axe-scan.mjs`: os estados abaixo; o `cart-itens` de hoje é o do visitante.

**SPEC-M (no mesmo PR):** as linhas `PaymentMethodPicker`, `CartItem` e `OrderSummary` da §4.2; o "a desenhar" das §5.5 a §5.7; a linha `PaymentMethodPicker` da §6; na §5.7, os dados do pedido dentro da faixa (desvio registrado em 5.9) e a `dl` no lugar de "Pedido #1001 · PIX" (troca confirmada pelo usuário em 22/11/2026).

**Estados para o axe** (em 1440 e 390, com e sem movimento reduzido):

| Nome | Passos | Seletor estável |
|---|---|---|
| Carrinho com itens, logado | `#/cart` com sessão e carrinho (`LOGGED`) | link "Finalizar pedido" no `.cart-page__resumo` |
| Carrinho com itens, visitante | `#/cart` só com o carrinho (o `cart-itens` de hoje) | `.cart-page__notice` |
| Carrinho vazio | `#/cart` sem carrinho | `.cart-page .empty-state` |
| Aviso "Desfazer" | carrinho logado → "Remover Cheese Bacon" → medir em até 5 s | `.toast` com o botão "Desfazer" |
| Pagamento com endereço | `#/payment` com `LOGGED` | `.payment-page address` |
| Pagamento sem endereço | `#/payment` com a sessão sem `address.street` | `.payment-page__aviso` |
| Forma marcada | pagamento com endereço → marcar `input[name="payment-method"][value="pix"]` (`check({ force: true })`) | `.payment-option.is-checked` |
| "Enviando pedido…" | forma marcada → clicar no CTA → medir antes dos 800 ms | `.order-summary__cta [aria-busy="true"]` |
| Confirmação | `#/confirmation` com `LOGGED` (`lastOrderId` 1001) | `.confirmation-page__status h1` |

**Documentação (CLAUDE.md):** os testes novos entram no `TESTING.md` e na contagem do README, no mesmo PR.

---

## 10. Referências usadas

| Ref. | Publicado ou conceito | Padrão abstraído | Onde entra |
|---|---|---|---|
| [66], [81], [8] Listas agrupadas | conceito e publicado | Blocos com vãos de 2 px, cantos 20/4, dentro de um contêiner | Lista do carrinho, opções do pagamento, pilha da confirmação |
| [66], [26] Contenção | conceito | Contêineres que dividem o espaço e criam hierarquia | Bandeja, resumo, seções |
| [107] ListItem (Compose) | conceito | Linha de seleção única com o rádio no início; formas que mudam com a interação | Controle das opções; forma da marcada |
| [117] Radio (material-web) | conceito (documentação) | Ícone em `on-surface-variant`, selecionado em `primary`, 20 px | Cores do controle |
| [113], [114] Checkbox (material-web) | conceito (código de componente) | Contorno de 2 px em `on-surface-variant`; marcado em `primary` com ícone `on-primary`; cores forçadas | Controle e `forced-colors` |
| [54] Button groups (Compose) | conceito | Troca de forma no selecionado | Cantos de 20 na opção marcada |
| [88], [89] Radio Group (APG) | referência técnica | Tab no marcado ou no primeiro; Shift+Tab no último sem marcado; setas com volta; grupo que começa sem marcado | Teclado do `PaymentMethodPicker` |
| [92] Read Me First (APG) | referência técnica | Papel ARIA é promessa de teclado; o nativo traz o teclado | Rádio nativo |
| [95], [96], [97] H71, 4.1.2, 3.2.2 (W3C) | referência técnica | `fieldset` e `legend`; controles nativos cumprem; mudança de conteúdo não é de contexto | Grupo, `legend`, CTA que habilita |
| [98], [99] 1.4.11 e 1.4.1 (W3C) | referência técnica | 3:1 em componente e estado; desabilitado isento; luminância de 3:1 como sinal | Controle, divisor, sinais do marcado, CTA desabilitado |
| [76], [77], [78] 2.4.11, 2.3.3, 2.5.8 (W3C) | referência técnica | Foco não coberto (C43); movimento disparado por interação; alvo de 24 px | `scroll-padding`, `motion-ok`, alvos |
| [1], [12], [13], [16]-[19], [30] (rodada 1) | documentação oficial | Escala de tipo (title em Medium), camadas de estado, elevação tonal, tipos e tamanhos de botão, anel | Tipografia, estados, CTAs |
| [55] Split button (Compose) | conceito | Filled de ênfase alta, tonal de ênfase média | Ordem e variante dos CTAs |
| [H5], [H19] | pesquisa | Texto fora da foto; alvo apertado aumenta toques errados | Títulos sem foto; "Remover" longe do "+" |
| [H23] | pesquisa | Sem edição da personalização no carrinho, a pessoa supõe que precisa apagar e recomeçar | Risco (seção 11) |

**Recorrência:** nenhum padrão desta etapa tem 3 exemplos publicados novos. A lista agrupada é recorrente pela contagem de produtos, com uma fonte de imprensa [81] (dossiê, padrão 2); o rádio na linha e o checkbox vêm da documentação.

---

## 11. Riscos e como o desenho responde

| Risco | Resposta |
|---|---|
| O resumo compacto mais alto que a janela, com o CTA fora da tela | Com os dados reais, não acontece em 1440×900 nem em 1024×768 (5.3); em janelas mais baixas que 768 px, o sticky do pagamento desliga |
| O aviso (toast) cobrir o "Remover" vizinho ou o CTA em 390 | `scroll-padding` da rota soma `--m3-toast-reserva` enquanto há aviso; a `PaymentView` rola o foco depois da conferência; o `keyboard.mjs` mede |
| O aviso cobrir parte do "Remover" em 1024 (no topo à direita, de x 576 a 992) | A soma no topo vale de `md` para cima (seção 4); em 1280 e 1440, o aviso começa 3 px depois do "Remover" |
| A regra do aviso depender das classes e da posição do `AppToast` (`.toast-region .toast`) | Fica nesta etapa, porque o ponto de atenção 3 vale agora; a etapa 10 a herda, com o `--m3-toast-reserva`, ou a absorve no próprio aviso (seção 12) |
| Dois ou três avisos empilhados (remoções seguidas) passarem da reserva de um | Risco aceito: o `toast.js` empilha até 3. A etapa 10 (o `AppToast`) decide a regra geral do aviso que não cobre o foco; o `keyboard.mjs` mede uma remoção |
| O "Desfazer" pouco alcançável pelo teclado | O `AppToast` vem depois do rodapé no DOM e some em 5 s: pelo Tab, a pessoa passa pelo resto da página antes de chegar a ele, e o tempo pode acabar (o aviso pausa só com o foco ou o ponteiro nele). Fica para a etapa 10: um aviso com ação alcançável pelo teclado, ou que não some sozinho. Esta etapa não desenha o `AppToast`; a volta do foco ao "Remover" depois do "Desfazer" fica no `CartView` (5.2) |
| O "Fechar aviso" derrubar o foco no `body` | Hoje, fechar o aviso tira o botão do DOM, e o foco cai no `body` (o mesmo que o "Desfazer" fazia). Fica para a etapa 10: para onde vai o foco depois do "Fechar aviso" |
| A inferência do rádio do tamanho do `label` não valer em algum navegador | O `keyboard.mjs` mede com 800 e 830 px, **só no Chromium** (Playwright); nos outros navegadores fica sem prova. O `appearance: none` tira o desenho nativo do rádio com o tamanho novo. A reserva é o `scroll-margin` no rádio, com metade da altura da opção mais o anel (não encontrei fonte no dossiê para o `scroll-margin`; a sonda decide) |
| O `focus()` programático não respeitar o `scroll-padding` | Inferência (a técnica C43 [76] trata do foco pelo teclado), provada só no Chromium pelo `keyboard.mjs`. Se ele mostrar o "Remover" sob o aviso, o `CartView` usa a mesma rolagem do pagamento (`scrollIntoView({ block: "nearest" })`) |
| O `scrollIntoView` do `activeElement` não rolar no clique | No Safari e no Firefox do macOS, o clique não põe o foco no botão; o `activeElement` é o `body`, e nada rola. Sem foco no CTA, não há foco a cobrir [76]; pelo teclado, a rolagem vale (5.8) |
| `h2` e `legend` com o mesmo texto lidos duas vezes | A `section` "Forma de pagamento" ficou sem `aria-labelledby` (volta 1), e o nome deixou de ser lido três vezes. As duas leituras que ficam servem a modos diferentes (títulos e formulário); a `legend` dá o contexto do grupo [95]. Inferência, sem fonte sobre os leitores |
| O controle `primary` na opção marcada contrariar "primary só em ação" | Decidido pela sessão principal: fica em `primary` com check, pelo precedente da caixa marcada do checkbox da etapa 6 (SPEC-M §2.2) e do selecionado em `primary` do rádio [117] |
| O "Criar conta" tonal sem contraste de contêiner contra o `low` (1,16) | Isento: um controle com texto dispensa borda [98], como na etapa 6 (desenho do Cardápio, §8); o rótulo tem 7,22 |
| O rótulo do CTA não caber numa linha (totais de quatro dígitos ou mais; janelas de 320 px) | `white-space: normal` sempre no CTA do pagamento (5.8); com duas linhas, a altura do M não muda |
| A faixa da confirmação ser lida como o hero | Forma, tamanho, conteúdo e altura diferentes (tabela em 5.9); sem disco, prensa, foto nem ação dentro |
| A confirmação lembrar o cupom do esqueumorfismo (o carrinho impresso) | Aqui não há papel, serrilha, letra monoespaçada nem impressão: é um contêiner tonal colado a outro, na linguagem da lista agrupada |
| Três formas de miniatura numa lista misturada parecerem enfeite | São as formas que cada produto já tem na Home; o hambúrguer fica no cartão, sem o cookie; uma forma por categoria, sem variação dentro dela |
| O cartão de 64 px ficar quase redondo com o canto de 28 da `M3Foto` | A parcial do `CartItem` fixa o canto de 16 por uma regra na raiz da `M3Foto`, sem `:deep()` (5.2) |
| Uma observação de 140 caracteres sem espaço vazar em 390 | `overflow-wrap: anywhere` no nome e nos detalhes do `CartItem` e do `OrderSummary` (5.2 e 5.3); vale também no perfil |
| A pessoa não conseguir editar a personalização no carrinho [H23] | Fora do escopo: o fluxo é o do `SPEC.md`. Os detalhes à vista em cada linha mostram o que foi escolhido |
| CTA do pagamento desabilitado fora do Tab, com a ajuda só por `aria-describedby` | A ajuda fica logo abaixo, em texto visível; o `SPEC.md` pede o desabilitado (§5.6). O desabilitado do filled é da etapa 10 (decisão da sessão principal) |
| Dez itens em 390 deixarem o CTA longe | O resumo vem depois da lista (`SPEC.md` §5.5); o "Finalizar pedido" fica no fim, alcançável pelo Tab e pela rolagem |
| O perfil mudar sem desenho (etapa 8) | Só a tipografia do `OrderSummary` (5.3); o contêiner do perfil fica com a etapa 8 |

---

## 12. Decidido e fora

**Decidido (item 6 do pacote):**

- **a.** `CartItem` como item de lista segmentada (`lowest`, 20/4, vão de 2 px) numa bandeja `low` de canto 28 e padding 8 (cantos concêntricos); `M3Foto` de 64 px na forma da Home (círculo, flor, cartão de canto 16), `alt=""`, ícone `utensils`; duas linhas por item; nome body-l, detalhes body-m, total title-m 500; "Remover" no fim da segunda linha, longe do "+"; stepper sobre `lowest`; `h2` escondido "Itens do carrinho"; sem animação; "Desfazer" devolve o foco ao "Remover" do item.
- **b.** O contêiner do `OrderSummary` fica na página (o perfil só ganha a tipografia e o `overflow-wrap`); título headline-s, Total headline-s 500, divisor só com linhas; a grade 8/12 e 4/12 do `SPEC.md`, com o resumo grudado a partir de `lg`; com os dados reais, o resumo nunca gruda mais alto que a janela em 1440×900 e 1024×768 (estimativa; a sessão C mede); sticky do pagamento só com 48rem de altura, pelo mixin `altura-min` de `base/_breakpoints.scss`.
- **c.** Logado: filled M "Finalizar pedido" e texto "Continuar comprando"; visitante: o aviso, filled M "Entrar e finalizar" e tonal "Criar conta" (link; contêiner isento, 1,16); todos `block`.
- **d.** Seções em contêineres `low` de canto 28, cada uma com `h2`; "Alterar no perfil" como text button; aviso `aviso-container` com o filled S "Adicionar endereço" dentro (4,98 contra o aviso); CTA filled M com o rótulo que quebra linha; o desabilitado fica como hoje e vai para a etapa 10.
- **e.** Rádios nativos em `fieldset` com `legend` escondida, numa `section` sem `aria-labelledby`; uma coluna; controle de 24 px no início (vazio → `primary` com check); marcada em `secondary-container` com os quatro cantos de 20; sem marcado no início; rádio com o retângulo do `label` e `appearance: none` para o foco não coberto.
- **f.** Pilha central de 40rem: faixa `primary-container` (28/28/4/4) com o check, o `h1` em headline-m e a `dl`, colada ao resumo `low` (4/4/28/28); ações filled M e tonal M na superfície. A `dl` dentro da faixa é desvio registrado da SPEC-M §5.7 (5.9).
- **g.** O "·" fica em "Confirmar pedido · R$ x" e sai de "Pedido #1001 · PIX" (vira `dl`). **O usuário confirmou a troca em 22/11/2026, ao ler o desenho**; a sessão C passa o texto pela `design:ux-copy`.
- **h.** `h1` em `--text-page` no carrinho e no pagamento, com o ritmo do Cardápio; na confirmação, headline-m 500 dentro da faixa.
- **i.** A reserva de hoje cobre a toolbar; enquanto há aviso, o `scroll-padding` soma `--m3-toast-reserva` (no pé abaixo de `md`, no topo a partir dele); o rádio cobre o `label`; o `keyboard.mjs` mede com 800 e 830 px, no Chromium.
- **j.** `EmptyState` na superfície, na largura do contêiner, abaixo do `h1`, sem bandeja.

**Decisões da sessão principal (22/11/2026, depois da volta 1 do revisor):**

- o desabilitado do filled fica para a etapa 10;
- o controle marcado do rádio fica em `primary` com check, pelo precedente do checkbox da etapa 6;
- a lógica de apresentação nova (o foco no "Remover" depois do "Desfazer" e o `scrollIntoView` depois da conferência) é aceita, porque não muda o fluxo;
- a coluna de 24rem saiu: a grade é a 8/12 e 4/12 do `SPEC.md`, e o rótulo do CTA quebra linha;
- o "Adicionar endereço" é filled S;
- a `section` "Forma de pagamento" fica sem `aria-labelledby`;
- a `dl` fica na faixa, como desvio registrado da SPEC-M §5.7; a troca do "·" foi confirmada pelo usuário (g);
- as três inferências (rádio do tamanho do `label`, `focus()` com o `scroll-padding`, reserva de um aviso) ficam para o `keyboard.mjs` da sessão C;
- o canto da `M3Foto` de 64 px: o `cartao` usa `--m3-forma-l` e passa a `--m3-forma-xl` a partir de `md` (`_m3-foto.scss`, linhas 15 a 18); uma regra no `<style scoped>` do `CartItem` sobre a raiz da `M3Foto`, onde fica o `border-radius`, com especificidade maior que a do `.m3-foto--cartao`, fixa `--m3-forma-l` em todas as larguras, sem `:deep()` (5.2);
- a regra do `scroll-padding` com o aviso e o `--m3-toast-reserva` ficam nesta etapa; a altura mínima do sticky vira o mixin `altura-min` em `base/_breakpoints.scss`.

**Fora:**

- taxa de entrega, frete, prazo, previsão, rastreio, status ao vivo, cupom, desconto, gorjeta, troco, parcelamento, QR code do PIX, número de cartão, pedido mínimo, avaliação, "peça de novo" e sugestão de produto;
- contador ao lado do `h1`;
- edição da personalização no carrinho;
- check animado ou qualquer entrada animada na confirmação;
- forma de pagamento marcada por padrão;
- rolagem interna no resumo.

**Para outras etapas:**

- **Etapa 8:** o perfil recebe o `OrderSummary` com a tipografia nova, sem contêiner; a linha "data · N itens · R$ x" do histórico decide o "·" pela mesma regra (7.g).
- **Etapa 10:**
  - o `QuantityStepper` (sobre `lowest` no carrinho) e o `EmptyState` (alinhamento na página);
  - as variantes `danger` ("Remover") e `loading` ("Enviando pedido…") do `BaseButton`;
  - **o desabilitado do filled** (decisão da sessão principal);
  - o `AppToast`:
    - a regra geral do aviso que não cobre o foco, com a pilha de até 3;
    - **herda ou absorve** a regra do `scroll-padding` com o aviso e o `--m3-toast-reserva` desta etapa, que dependem de `.toast-region .toast` e da posição de hoje;
    - **o "Desfazer" alcançável pelo teclado**, ou um aviso com ação que não some sozinho: hoje ele vem depois do rodapé no DOM e some em 5 s;
    - **o foco depois do "Fechar aviso"**, que hoje cai no `body`.
- **Etapa 11:** nada novo sem uso desta etapa; os dois pares que saem do `PARES_TELAS_BRASA` saem já na sessão C.

---

## 13. Revisão

**Volta 1 do revisor (22/11/2026): aprovado, sem bloqueante.** Subagente só de leitura, com os critérios do pacote e seis pontos de atenção. O resultado inteiro fica em `pacotes\revisao-carrinho-pagamento-volta-1.md`, na pasta de estado do plano.

**O que o revisor confirmou:**

- **Rádio:** o rádio do tamanho do `label` funciona.
  - O nome acessível não muda, e o clique cai no `label`.
  - O anel fica no `label`, e o do input é cortado pelo `clip-path`.
  - O `coveredBy` e o `ringOf` dos e2e sobem ao `label`.
- **Reserva do aviso e `scrollIntoView`:** cabem nesta etapa e não mudam o fluxo.
- **Sticky:** as contas batem (seções de 618 e 578 px; 11, 4 e 3 linhas grudadas). O limite real do `min-height` fica em cerca de 706 px.
- **Pares:** todos batem, com duas exceções corrigidas abaixo (o 1,04 e o par de 1,00 que faltava).
- **"Desfazer":** hoje o foco cai no `body` depois da ação. A volta ao "Remover" com `await nextTick()` no `CartView` funciona.

**Achados e o que mudou** (3 importantes e 10 menores, todos aplicados pelo designer na mesma sessão):

| Nº | Tipo, gravidade | Achado | Resposta |
|---|---|---|---|
| 1 | infiel/contrato, importante | A coluna de 24rem dependia de "R$ 129,90 não cabe em 1024". Medido: cabe (cerca de 212 dos 216 px). Outras contas de preço também estavam erradas | Volta a grade 8/12 e 4/12 do `SPEC.md`, e sai o `--m3-resumo-largura`. As contas foram refeitas: R$ 97,40 por unidade e R$ 974,00 por linha; o total passa de R$ 10.000 com 11 linhas. O CTA ganha `white-space: normal` sempre |
| 2 | acessibilidade, importante | O "Adicionar endereço" tonal mede 1,00 contra o `aviso-container`, e é a única saída da tela | Vira filled S. Contra o aviso, mede 4,98 em repouso, 4,13 no hover e 3,94 no pressionado. O "Criar conta" sobre o `low` (1,16) fica declarado isento [98], como na etapa 6 |
| 3 | acessibilidade, importante | O "Desfazer" é pouco alcançável pelo teclado, e o "Fechar aviso" deixa o foco no `body` | Registrado no §11 e na lista da etapa 10 (§12). O `AppToast` não é desenhado aqui |
| 4 | acessibilidade, menor | O leitor de tela lia "Forma de pagamento" três vezes (região, `h2` e `legend`) | A `section` fica sem `aria-labelledby` |
| 5 | infiel, menor | A `dl` entrou na faixa, e o SPEC-M §5.7 a põe abaixo | Fica, como desvio registrado (5.9). A sessão C atualiza a §5.7 do SPEC-M |
| 6 | coerência, menor | A conta da posição do aviso faltava | A conta entrou na seção 4. Em 1024, o aviso cobre metade do "Remover"; por isso a reserva no topo vale a partir de `md`, e não só de `md` a `lg`. Essa é a única mudança além da lista, consequência direta da conta |
| 7 | contrato, menor | `overflow-wrap` só no nome | Vale também nos detalhes do item e nas linhas do resumo, o que serve ao perfil |
| 8 | fronteira, menor | A regra do aviso depende do `AppToast` de hoje | Fica nesta etapa; a etapa 10 herda ou absorve a regra. O limite do `scrollIntoView` no clique (Safari e Firefox do macOS) ficou documentado |
| 9 | menor | "1,07" | Corrigido para 1,04 (medido) |
| 10 | fonte, menor | O [16] não sustenta "o text button é a menor ênfase" | Agora diz "não encontrei"; o [55] fica só para o filled e o tonal |
| 11 | menor | O `aria-current` do FAB ficava em dúvida | O FAB é `RouterLink to="/cart"` e ganha `aria-current="page"` em `/cart` |
| 12 | convenção, menor | `@media (min-height: 48rem)` escrito na parcial | Vira o mixin `altura-min` em `base/_breakpoints.scss` |
| 13 | acessibilidade, menor | O rádio dependia do desenho nativo | Ganha `appearance: none`. O §11 diz que o `keyboard.mjs` só prova no Chromium |

**Volta 2: não rodou.** As correções seguiram a lista. A única extensão é a do achado 6, que decorre da conta pedida.

**Decisões da sessão principal:** estão na §12, na lista de 22/11/2026.
- O desabilitado do filled vai para a etapa 10.
- O controle marcado fica em `primary`.
- A lógica de foco é aceita.
- As inferências ficam para o `keyboard.mjs`.
- O canto da `M3Foto` é fixado por uma regra do `CartItem` na raiz do filho, sem `:deep()`.

**Decidido pelo usuário ao ler o desenho (22/11/2026):**
- "Pedido #1001 · PIX" vira a `dl` "Pedido" / "Forma de pagamento" (7.g);
- a sessão C muda a §5.7 do SPEC-M no mesmo PR.

**O que a sessão C mede, porque o desenho estimou pelo CSS:**
- as alturas do sticky com a coluna 4/12;
- os 6rem do `--m3-toast-reserva`;
- as posições do aviso em 1280 e 1024;
- as três inferências: o rádio do tamanho do `label` com 800 e 830 px, o `focus()` com o `scroll-padding` e a reserva de um aviso só.

**Construção (sessão C, 23/11/2026):**
- **Sticky (5.3):** a coluna das seções do pagamento mede 622 px com endereço (o desenho estimou 618). O resumo compacto mede 377 px com um lanche de três detalhes, 553 com três e 641 com quatro; com quatro, passa da coluna e rola com a página, com o CTA à vista no fim, em 1440×900 e 1024×768. Em 1440×760 (abaixo de 48rem), o resumo fica no fluxo. No carrinho, com dez itens em 1024×768, o resumo (288 px) gruda a 88 px do topo.
- **Rótulo do CTA (5.8):** em 1024, o botão tem 264 px; "Confirmar pedido · R$ 29,49" cabe numa linha, e "Confirmar pedido · R$ 1.948,00" (duas linhas de R$ 974,00) quebra em duas, com o botão nos 56 px do M.
- **`--m3-toast-reserva`: 6,5rem, e não 6.** Em 390, o aviso da remoção, com "Desfazer", tem 72 px, e o da conferência com o cardápio, em 3 linhas, 92 px. Com 6rem (96 px), o anel de 5 px do CTA encostaria 1 px no aviso de 92 px; com 6,5rem (104 px), sobra um vão de 7 px.
- **Posições do aviso (§4):** em 1440, o aviso vai de x 872 a 1288 e o "Remover" termina em 869; em 1280, de 792 a 1208, contra 789: os 3 px de folga da conta. Em 1024, o aviso vai de 576 a 992 e cruza 56 px do "Remover" (521 a 632) na horizontal; a soma no topo a partir de `md` resolve.
- **As três inferências, no Chromium (`keyboard.mjs`):**
  - **rádio com o retângulo do `label`:** em 390, com 844, 830 e 800 px de altura, as setas descem até o Dinheiro sem a opção focada cruzar a toolbar. A pendência da etapa 4 está resolvida;
  - **`focus()` com o `scroll-padding`:** o Chromium respeita a reserva, e o `CartView` não precisou da rolagem extra do §11. Quando o elemento focado está inteiro dentro da reserva, ele o centraliza na área útil; quando está só em parte, alinha-o à borda dela. Em 1024×768, o "Remover" vizinho, a 100 px do topo antes da remoção, termina em 431–485 (com o anel);
  - **reserva de um aviso:** em 390, com o 5º de seis itens perto do pé (696 px em 844 de altura), o "Remover" vizinho termina centrado (335–389), fora do aviso e da toolbar.
- **Shift+Tab sem forma marcada (5.7):** o Chromium põe o foco no último rádio (o Dinheiro), como [88] descreve para "alguns navegadores". O `keyboard.mjs` recarrega a página, confere que nada está marcado, descobre o rádio escolhido, põe essa opção em parte sob a toolbar e confere que o Shift+Tab a tira de lá. Com o rádio de volta ao ponto de 1 × 1 px (mutação), a opção fica coberta, em 844 e em 800 px de altura. Nas primeiras rodadas, o script não recarregava a página, o primeiro rádio continuava marcado pelas setas, e o foco ia para ele.
- **Revisão final (subagente, 23/11/2026):** nenhum crítico. Corrigidos na mesma passada:
  - **a reserva do topo do carrinho vale de `md` a `xl`, e não de `md` para cima** (desvio desta seção 4 e do 12.i). A partir de 1280 px, o aviso começa depois do "Remover", e só o anel encosta; com a reserva, remover pelo mouse um item perto do topo fazia a página pular 336 px. No pagamento, a reserva continua de `md` para cima, porque o aviso cruza a coluna do resumo em qualquer largura;
  - cada item do carrinho ganha a borda dos modos de contraste (`reserva-de-sombra`), porque o fundo e o vão de 2 px somem nas cores forçadas;
  - a 2ª linha do item quebra quando não cabe (`flex-wrap`, com o "Remover" no fim), para não vazar com a fonte maior em 320 px;
  - as checagens do `keyboard.mjs` passaram a distinguir: as setas conferem a opção marcada, e não só a focada; o Shift+Tab parte de uma opção em parte coberta; em 1440, a checagem confere que a página não pula.
  - **`/code-review` da branch (pedido do usuário):** o foco depois de remover e de desfazer rolava a página também para quem toca ou clica, que não vê o anel; no celular, tocar no "Remover" na metade de baixo da tela fazia a página pular uns 350 px. Agora o `CartView` guarda a última entrada (`pointerdown` ou `keydown`) e foca com `preventScroll` quando ela foi de ponteiro; pelo teclado, a rolagem continua. Mutação: com o `focus()` sem `preventScroll`, o clique de mouse perto do pé leva a página de 136 para 492 px; com a correção, ela fica em 136.
  - **Fica para a etapa 10:** com dois ou três avisos empilhados, um "Remover" que já estava na área útil não rola e pode ficar sob o aviso mais antigo (risco aceito no §11).
- **Ajustes do construtor:**
  - o controle do rádio usa `forced-color-adjust: none` com as cores forçadas, só com cores do sistema, porque o modo forçado troca o fundo do autor;
  - o ícone do aviso sem endereço fica num `span` da altura da linha de body-l, para ficar centrado na primeira linha sem margem literal;
  - a chave do mixin `altura-min` é `resumo-grudado`;
  - a `design:ux-copy` manteve os rótulos da `dl` ("Pedido" e "Forma de pagamento").
