# Desenho da Home: Dark mode, rodada 2 ("A Brasa pelas diretrizes")

Desenho de 21/11/2026 para a Home nova de `#/direcoes/escuro`. O construtor deve conseguir montar a página só com este arquivo e o `escuro.json` ao lado, que é o que o portão P6 lê.

- **Fontes do estilo:**
  - o dossiê `docs/direcoes/pesquisa/escuro.md` ([4], [13], [45] a [50], [63] e [80] a [108]);
  - a seção "Dark mode" de `docs/direcoes/PESQUISA.md`.
- **Fontes de Home de delivery:** `docs/direcoes/pesquisa/home-delivery.md` ([H1] a [H45]).
- **Galerias:** a coleta no Chrome de 20/11/2026 (`galerias/escuro.md` do scratch da rodada), com os exemplos G1 a G10. Os endereços estão na seção 11.
- **Conteúdo:** só `src/json/products.json`, lido pela `useProductsStore` (que inclui o cardápio editado no painel), `src/direcoes/compartilhado/dados.js`, os textos que o app já tem e o carrinho do próprio visitante (`useCartStore`).
- **Identidade:** a ficha (`ficha.js`) e os tokens (`_tokens.scss`) da rodada 1 continuam valendo:
  - neutros com croma 0;
  - primary no tom 80, secondary e tertiary;
  - Bebas Neue a partir de 28 px e Archivo 450 no texto;
  - elevação só por degrau tonal, sem sombra e sem brilho.
  Nada muda em `desvios`.

---

## 1. Tese

**Mantida, com um ajuste de composição.** A tese da ficha continua inteira: a Brasa refeita pelas regras do Material 3 e da Apple, com superfícies neutras em degraus tonais, o laranja num tom claro dessaturado e texto que não é branco puro [13][48][4].

O ajuste dá à página uma regra de luz, tirada de duas fontes documentadas:

1. **No escuro, o que está mais alto fica mais claro.** A elevação é feita com degraus de cinza, não com sombra: a base recua e o elevado avança [4][13][47][83][87].
2. **Sobre o escuro, a foto do produto vira o ponto de luz da página.** O padrão é recorrente: no dossiê, o padrão 3 ([100][105][106]); nas galerias, G1, G2, G4, G7 e G8 (dois publicados e três conceitos), com o fundo escuro servindo de palco para a comida.

Daí a gramática da Home, **"degraus de luz"**: a luz vem de duas fontes, a comida e o que está perto do seu pedido.

| Fonte de luz | O que é na Home | Regra | Fonte |
|---|---|---|---|
| A comida | A foto do palco, a mais clara da página; depois as fotos da vitrine; por último as de "Junto com o lanche", pequenas, um pouco atenuadas e apagadas na faixa | Quanto mais importante o item, mais luz a foto tem. A foto com fundo claro é escurecida de leve | [46][47][50], G1, G4, G7 |
| O pedido | O card (`vitrine`) ou a linha (`junto`) de um produto que já está no carrinho sobe um degrau (N17 para N22 no card; N12 para N17 na linha) e ganha a borda e a marca em tertiary ("No seu pedido") | Mais perto do pedido, mais claro | [4][87][83] |
| A ação | "Ver cardápio" e "Adicionar" com fundo primary (tom 80); "Adicionar" dos acompanhamentos em secondary-container | A cor vai no fundo da ação, e cada papel tem um significado só | [81][48][4] |
| O resto | Base N6, a faixa de `junto` em N12 (elevada, de ponta a ponta), rodapé N4 (afundado), cards N17 com contorno | Nada brilha e nada faz sombra | [13][46][81][87] |

De cima para baixo, a página mostra a escala inteira: base N6 (`palco` e `vitrine`), faixa N12 (`junto`), base N6 (`turno`) e rodapé N4. É a escala sunken, default e raised do Atlassian, em que o mais alto é o mais claro [87], aplicada à própria página e não a caixas.

Corolário: a cor não enfeita. O primary marca o que age, o secondary marca o que age com menos ênfase e o tertiary marca o que já está no pedido. Isso afasta o padrão genérico "quase-preto com um único acento vivo": o acento é dessaturado e há três papéis, cada um com função [81].

### O que mudou da rodada 1

| Na v1 | Na v2 | Por quê |
|---|---|---|
| Hero em duas colunas (texto à esquerda, recorte à direita), igual à composição da Brasa | **`palco`:** a foto real do Smash Burger, larga, cujas bordas, topo e tábua clara somem na página. O título fica embaixo, sobre a base sólida | A comida como ponto de luz (G1, G4, G7, [106]); a tábua clara brilharia no escuro [46][47]; composição que não é a da Brasa (risco da ficha) |
| "Ver cardápio" com seta | Sem seta | "→" no fim de botão é padrão genérico |
| Carrossel "Mais pedidos", 7 cards verticais | **`vitrine`:** grade estática "Hambúrgueres", com cards horizontais e o estado "No seu pedido" | O título alegava popularidade sem dado [H25][H26]; 7 quadros passam dos 5 [92][H7] e dão 6 deslizes no celular [H9] |
| "Adicionar" com giro 3D (o mesmo flip da Brasa) | Troca de face por deslize vertical curto, ou só opacidade com movimento reduzido | Não lembrar a Brasa (risco da ficha); movimento como resposta ao gesto |
| Sem bebidas nem sobremesa | **`junto`** (nova): as bebidas e a sobremesa em linhas sem caixa, sobre uma faixa N12 de ponta a ponta, com fotos pequenas atenuadas e "Adicionar" tonal | Variedade na Home [H21][H22]; o `/menu` abre sempre em Hambúrgueres; o degrau de luz pela faixa, não por caixas [87][81] |
| Horário só no rodapé e no texto do hero | **`turno`** (nova): o horário em destaque e a faixa das 24 horas, com o trecho aberto aceso, cruzando a meia-noite | O horário passa da meia-noite, um caso à parte [H31]; contato e horário fáceis de achar [H29] |
| Barra em surface-container (N12) e odômetro no contador (o da Brasa) | Barra na cor da base, com linha inferior só quando a página rola; o número do contador troca por opacidade | Borda no limite do conteúdo rolado [87]; sair da Brasa |
| Menu escondido atrás de um botão no celular | Os três links visíveis numa segunda linha | Com 4 links ou menos, mostrá-los [H14][H15] |
| Rodapé com redes | Rodapé afundado (N4) com endereço, WhatsApp, e-mail, a navegação repetida e os direitos. As redes saem | Os links de `REDES` são genéricos (`facebook.com`), e link que não leva aonde promete mina a confiança [H25][H26] |
| Foco pelo anel do projeto | Anel em duas cores, clara por fora e escura por dentro, com 9:1 entre elas | O foco some num escuro mal feito [94]; técnica C40 [88] |

Seções que a v1 não tinha: `junto` e `turno`. A `vitrine` troca o carrossel por outro padrão, e o `palco` refaz o hero.

---

## 2. Processo: plano e revisão

### Plano (primeira passada)

- **Cores** (todas já aprovadas):
  - grafite N6 `#131313` (base);
  - N4 `#0e0e0e` (rodapé, afundado);
  - N12 `#1f1f1f` (faixa de `junto`), N17 `#2a2a2a` (cards; linha no seu pedido) e N22 `#353535` (card no seu pedido);
  - névoa `#e2e2e2` (texto) e névoa variante `#c6c6c6`;
  - brasa clara `#ffb59d` (ação);
  - cheddar `#d7c68d` e `#51461a` (no seu pedido);
  - secondary-container `#5d4036` (ação dos acompanhamentos).
- **Tipo:**
  - Bebas Neue só a partir de 28 px: `h1` de 38 a 67 px (`--esc-titulo`), `h2` de 38 a 50 px e `h3` dos grupos com 28 px;
  - Archivo 450 no texto (17 px; 15 px no mínimo), 600 nos botões e 700 nos nomes e preços;
  - preços com algarismos tabulares;
  - tudo alinhado à esquerda, com no máximo 60 caracteres por linha.
- **Layout:**
  - uma única foto larga, sem moldura, no topo;
  - depois, o conteúdo em contêiner (75 rem) com grades, e uma faixa N12 de ponta a ponta (`junto`);
  - raios por hierarquia: 4 px nos botões, nas marcas e nas fotos das linhas, 10 px nos cards e 16 px nos painéis de estado vazio. A faixa não tem raio: é a página, não um objeto.
- **Princípios:**
  - degraus de luz (seção 1);
  - a ousadia num lugar só, o `palco`;
  - movimento só como resposta a um gesto;
  - nada brilha e nada faz sombra.

### Revisão contra o pedido (o que saiu genérico e foi trocado)

| Primeira ideia | Por que caiu | Troca |
|---|---|---|
| Faixa corrida de fatos da casa logo depois do hero (padrão 4 do dossiê, recorrente) | Movimento automático: o juiz não aceita autoplay, o 2.2.2 exige pausa [90], e o movimento tem cara de anúncio [H28]. Parada, seria uma fileira de fatos de enfeite | Fora |
| Título com a segunda linha no acento (G1, G9, G10) | Destacar uma palavra ou linha do título é a marca mais comum de página gerada | `h1` numa cor só, em on-surface |
| Palavra gigante em contorno de baixo contraste atrás do produto (G1, G7) | Texto decorativo de baixo contraste, sem função, com um exemplo só de comida | Fora |
| Hero com o recorte do lanche flutuando (G2, [46]) | É a imagem de quase todas as outras Homes e a da v1 | A foto real do produto, larga, que se dissolve na página |
| Brilho quente atrás do lanche, como um holofote (G1, G8) | A ficha tirou o brilho do hero, e sombra ou brilho no escuro parecem halo [46] | A luz vem só da foto: as bordas somem por máscara, sem nada pintado por cima |
| Seletor Sistema, Claro e Escuro (padrão 8) | A Apple pede para não criar ajuste próprio [47], a maioria dos sites não precisa do botão [84] e o estilo não tem paleta clara | Fora (fica para a fase seguinte, como diz a ficha) |
| Carrossel "Mais pedidos" | Sem dado de popularidade [H25]; 7 quadros [92] | Grade estática na `vitrine` |
| Cards verticais iguais para tudo | "Tudo em card igual" é o kit SaaS | Um card só, o horizontal dos lanches (primary), na `vitrine`. Os acompanhamentos, o `turno` e o rodapé não têm card |
| Bebidas e sobremesa em lista dentro de um contêiner arredondado | Repete a lista segmentada do Material 3 (itens em blocos dentro de um contêiner) e a lista de texto do minimalismo | Linhas sem fundo próprio e sem divisória, direto numa faixa N12 de ponta a ponta, que é um degrau da página e não um contêiner. A foto é pequena, atenuada e se apaga na faixa |
| Cards compactos nos acompanhamentos, com foto 1:1 em cima e "Adicionar" largo no pé (a primeira troca da lista em contêiner, na versão anterior deste desenho) | Mesma forma da `bandeja` do 3D; somados aos 7 cards da `vitrine`, a página depois do palco virava só grade de cards (juiz de distinção) | As linhas sem caixa sobre a faixa N12, descritas na linha de cima (seção 13) |
| Seção "Horário e contato" com os contatos em lista | Mesmo bloco de quatro outros estilos | O `turno` fica só com o horário, e a faixa das 24 horas mostra a virada da meia-noite. O endereço e os contatos vão para o rodapé, onde as pessoas os procuram [H30] |
| Odômetro no contador do carrinho | É o da Brasa | Troca do número por opacidade |
| Hover que levanta o card | "Hover em todo card" é padrão genérico | O card sobe de degrau quando o produto entra no pedido, não no hover |

---

## 3. Composição

Ordem dos blocos:

1. **Barra** (`EscBarra`, slot `#topo`):
   - a marca, os três links e o carrinho, na cor da base;
   - fixa a partir de `md`, com linha inferior só quando a página rola.
2. **`palco`** (hero, a ousadia): a foto do Smash Burger, larga e sem bordas, que se apaga na página. O título, o texto e "Ver cardápio" ficam embaixo, sobre a base sólida.
3. **`vitrine`**: "Hambúrgueres", com os lanches em cards horizontais contornados e o estado "No seu pedido".
4. **`junto`**: "Junto com o lanche", numa faixa N12 de ponta a ponta, com as bebidas e a sobremesa em linhas sem caixa (foto pequena atenuada, nome, descrição, preço e "Adicionar" tonal).
5. **`turno`**: "Horário", com o texto real em destaque e a faixa das 24 horas.
6. **Rodapé** (`EscRodape`, slot `#rodape`): afundado (N4), com a marca, a descrição, o endereço, os contatos, a navegação repetida e os direitos. Depois vem a `AssinaturaEncaixe`, da moldura.

**Ritmo vertical:**

- entre seções: `--space-8` a partir de `lg`, `--space-7` abaixo; a faixa de `junto` tem o mesmo respiro por dentro (`padding-block`);
- o `palco` termina antes da dobra de 900 px em 1440, e o `h2` da `vitrine` aparece acima dela [H2][H3].

### Wireframe em 1440

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ EscBarra · fundo N6 · fixa ≥ md · linha outline-variant só depois de rolar               │
│ SMASH BURGER                                          Início   Cardápio   Entrar   (🛒)2 │
│                                                       ══════ sublinhado primary          │
│ [palco]                                                                                  │
│                ░░▒▒▓▓██████████████████████████████████▓▓▒▒░░                            │
│           ░░▒▓██   foto foods/smash-burger · 72rem × 31rem · cover   ██▓▒░░              │
│          ░▒▓███      o pão, o queijo e a carne acesos no centro      ███▓▒░              │
│           ░░▒▓██     topo, laterais e a tábua clara somem (máscara)  ██▓▒░░              │
│                ░░▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒░░    ← 20% de baixo: alfa 0   │
│  ┌ bloco de texto em N6 sólido, sobe 4rem sobre a parte já transparente ┐                │
│  │ SMASH NA CHAPA,                               h1 · Bebas 67 px       │                │
│  │ ENTREGUE QUENTE                               até 2 linhas           │                │
│  │ Hambúrgueres artesanais prensados na hora.    Archivo 450 · 17 px    │                │
│  │ De terça a sexta, das 13h à 01h.                                     │                │
│  │ [ Ver cardápio ]   primary · 52 px                                   │                │
│  └──────────────────────────────────────────────────────────────────────┘                │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ dobra de 900 px: o h2 abaixo já aparece ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [vitrine]                                                                                │
│  HAMBÚRGUERES (h2)                                                        Ver cardápio   │
│  ┌──────────┬───────────────────────────┐  ┌──────────┬───────────────────────────┐     │
│  │          │ Cheese Bacon (h3)         │  │          │ Smash Burger              │     │
│  │ foto 1:1 │ Hambúrguer artesanal com  │  │ foto     │ Hambúrguer artesanal com  │     │
│  │ (cover)  │ queijo e bacon crocante…  │  │          │ queijo, cebola caramel…   │     │
│  │          │ R$ 25,99      [Adicionar] │  │          │ R$ 22,50      [Adicionar] │     │
│  └──────────┴───────────────────────────┘  └──────────┴───────────────────────────┘     │
│  ╔══════════╤═══════════════════════════╗  ┌──────────┬───────────────────────────┐     │
│  ║          │ Veggie Burger             ║  │          │ X-Salada                  │     │
│  ║ foto     │ Hambúrguer artesanal…     ║  │ foto     │ Hambúrguer artesanal…     │     │
│  ║┌────────┐│                           ║  │          │                           │     │
│  ║│🛒 No seu││ R$ 24,90  [Adicionado ✓]  ║  │          │ R$ 20,90      [Adicionar] │     │
│  ║│pedido 2 ││                           ║  │          │                           │     │
│  ╚══════════╧═══════════════════════════╝  └──────────┴───────────────────────────┘     │
│   ↑ no pedido: o card sobe para N22, com borda tertiary de 2 px e a marca cheddar       │
│  … Chicken Burger, Burger Picanha e Batata Frita: 2 colunas, o último fica sozinho      │
│ [junto]  faixa N12 de ponta a ponta da janela: a seção inteira é um degrau               │
│▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄│
│  JUNTO COM O LANCHE (h2)                                                                 │
│                                                                                          │
│  BEBIDAS (h3)                                 SOBREMESAS (h3)                            │
│  ▓▓▓▓▓▒░  Copo de Refrigerante                ▓▓▓▓▓▒░  Sorvete de Pote                   │
│  ▓▓▓▓▓▒░  Copo de refriger…    [Adicionar]    ▓▓▓▓▓▒░  Sorvete de creme…    [Adicionar]  │
│  ▓▓▓▓▓▒░  R$ 5,99                             ▓▓▓▓▓▒░  R$ 12,90                          │
│┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ← no pedido: a linha sobe de N12           │
│┃ ▓▓▓▓▓▒░  Coca Cola Lata                   ┃     para N17, com a borda tertiary          │
│┃ ▓▓▓▓▓▒░  Lata de Coca Co…     [Adicionar] ┃     de 2 px e a marca compacta              │
│┃ ▓▓▓▓▓▒░  R$ 4,99  [▣ 2]                   ┃     depois do preço (▣ = carrinho)          │
│┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛                                             │
│  ▓▓▓▓▓▒░  Suco de Abacaxi                                                                │
│  ▓▓▓▓▓▒░  Suco de abacaxi…     [Adicionar]    [Adicionar] = tonal                        │
│  ▓▓▓▓▓▒░  R$ 7,99                                                                        │
│  ↑ foto 4:3 de 7rem, atenuada e apagada para o lado do texto; sem fundo nem divisória    │
│▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
│ [turno]                                                                                  │
│  HORÁRIO (h2)                                                                            │
│  Terça a sexta, das 13h à 01h            Archivo 600 · 28 px                             │
│      13h                                    01h                                          │
│  ▕░│██████████████████████████████████████┆█│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▏     │
│  meio-dia                             meia-noite                             meio-dia    │
│  (faixa de 24 colunas, de meio-dia a meio-dia; aceso = on-surface, trilho = N22;        │
│   ┆ = corte de 2 px na meia-noite)                                                       │
│ ╔ EscRodape · N4 ══════════════════════════════════════════════════════════════════════╗ │
│ ║ SMASH BURGER               ENDEREÇO (h2)                  CONTATO (h2)                ║ │
│ ║ Sabor irresistível em      📍 Rua Beira da Praia -        📞 WhatsApp · +55 47 5 6355… ║ │
│ ║ cada mordida…                 Navegantes, SC  (sublinhado) ✉ contato@smashburger.com.br║ │
│ ║                                                                                       ║ │
│ ║ Início   Cardápio   Entrar                                                            ║ │
│ ║ ───────────────────────────────────────────────────────────────────────────────────── ║ │
│ ║ © 2026 Smash Burger · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann          ║ │
│ ╚═══════════════════════════════════════════════════════════════════════════════════════╝ │
│ (AssinaturaEncaixe, da moldura)                                                         │
└──────────────────────────────────────────────────────────────────────────────────────────┘
```

No wireframe, os títulos aparecem em caixa alta porque a Bebas Neue só tem maiúsculas. No DOM, o texto fica como está na origem ("Hambúrgueres"). Os rótulos da faixa das horas ficam em caixa baixa. Na `junto`, `▓▓▓▒░` é a foto que se apaga na faixa, e as linhas `▄` e `▀` marcam as bordas da faixa N12, que vai de um lado a outro da janela.

### Wireframe em 390

```
┌──────────────────────────────┐
│ SMASH BURGER           (🛒)2 │  EscBarra, estática no celular
│ Início   Cardápio   Entrar   │  segunda linha, links de 44 px
├──────────────────────────────┤
│ [palco]                      │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  foto de ponta a ponta, 4:3 (292 px)
│▓▓▓  pão, queijo e carne   ▓▓▓│  máscara estreita: topo e base somem
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│
│ SMASH NA CHAPA,              │  h1 38 px, sobe 2rem sobre a parte já
│ ENTREGUE QUENTE              │  transparente; até 4 linhas (dá 2)
│ Hambúrgueres artesanais      │
│ prensados na hora. De terça… │
│ [       Ver cardápio       ] │  largura total abaixo de sm
│ [vitrine]                    │
│ HAMBÚRGUERES     Ver cardápio│
│ ┌──────┬───────────────────┐ │
│ │ foto │ Cheese Bacon (h3) │ │  card dos lanches: foto de 7rem cobrindo
│ │ 7rem │ R$ 25,99          │ │  a altura; nome, preço, descrição em
│ │      │ Hambúrguer artes… │ │  2 linhas e o botão na largura do corpo
│ │      │ [   Adicionar   ] │ │
│ └──────┴───────────────────┘ │
│ … os 7, uma coluna           │
│ [junto]                      │
│▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄│  faixa N12 de ponta a ponta da tela
│ JUNTO COM O LANCHE           │
│ BEBIDAS                      │
│ ▓▓▓▒░ Copo de Refrigerante   │  linha sem caixa: foto 4:3 de 6rem,
│ ▓▓▓▒░ Copo de refrigera…     │  atenuada e apagada para o texto;
│ ▓▓▓▒░ R$ 5,99    [Adicionar] │  preço e botão tonal lado a lado
│ ▓▓▓▒░ Coca Cola Lata         │
│ ▓▓▓▒░ Lata de Coca Co…       │
│ ▓▓▓▒░ R$ 4,99    [Adicionar] │
│ … Suco de Abacaxi            │
│ SOBREMESAS                   │
│ ▓▓▓▒░ Sorvete de Pote        │
│ ▓▓▓▒░ Sorvete de creme…      │
│ ▓▓▓▒░ R$ 12,90   [Adicionar] │
│▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀│
│ [turno]                      │
│ HORÁRIO                      │
│ Terça a sexta, das 13h à 01h │  21 px
│  13h               01h       │
│ ▕█████████████┆█│░░░░░░░░░░▏ │  mesma grade de 24 colunas (~15 px)
│ meio-dia  meia-noite meio-dia│
│ ╔ rodapé N4 ════════════════╗│
│ ║ SMASH BURGER / descrição  ║│
│ ║ ENDEREÇO                  ║│
│ ║ 📍 Rua Beira da Praia -…  ║│
│ ║ CONTATO                   ║│
│ ║ 📞 WhatsApp · +55 47 5…   ║│
│ ║ ✉ contato@smashburger…    ║│
│ ║ Início  Cardápio  Entrar  ║│
│ ║ © 2026 …                  ║│
│ ╚═══════════════════════════╝│
└──────────────────────────────┘
```

### Em 1024

O layout é o de 1440, num contêiner de 960 px:

- **Barra:** uma linha, fixa.
- **Palco:**
  - a foto ocupa os 1024 px de largura, com `55svh` de altura e a máscara larga;
  - o texto sobe 4rem;
  - o `h1` fica em até 3 linhas (deve dar 2).
- **Vitrine:** 2 colunas de cards horizontais (cerca de 468 px), com a foto em 40% e o corpo com `--space-4` de respiro.
- **Junto:** a faixa N12 nos 1024 px de largura; os dois grupos lado a lado, em colunas de cerca de 450 px, cada um com as linhas numa coluna só (3 em Bebidas e 1 em Sobremesas).
- **Turno:** como em 1440, com a faixa em até 40 rem.
- **Rodapé:** 3 colunas (marca, endereço e contato), com a navegação e os direitos embaixo.

---

## 4. Seções

Todas as seções têm a raiz `<section data-secao="<id>" aria-labelledby="<id do título>">`, um `h1` só (no `palco`) e títulos sem salto. Os dados da loja vêm de `src/direcoes/compartilhado/dados.js`, e o cardápio vem de `useProductsStore()`. Os textos novos ficam em `src/direcoes/estilos/escuro/textos.js`: em `TEXTOS`, com `// provisório` e sem dígitos; em `REAIS`, os rótulos que o app já tem, com a origem.

Toda seção dá aos seus links e botões `scroll-margin-top: calc(var(--navbar-h) + var(--space-4))` a partir de `md`. Assim, o foco por Tab nunca para embaixo da barra fixa.

### 4.1 `palco` (hero, a ousadia)

- **Arquivo:** `secoes/EscSecaoPalco.vue`.
- **Raiz:** `<section data-secao="palco" aria-labelledby="esc-palco-titulo" class="esc-palco">`.
- **Objetivo:**
  - dizer quem é a casa e o que ela faz, com a ação de pedir à mão [H1];
  - mostrar o traço mais característico do escuro numa hamburgueria: a comida como a única luz da página (G1, G4, G7, [106]);
  - apagar a tábua clara da foto, que brilharia no escuro [46][47];
  - deixar a `vitrine` aparecer acima da dobra [H2][H3].
- **Nova em relação à v1:** não. É refeita, com outra foto, outra composição e sem seta.

**Conteúdo real**

| Campo | Origem |
|---|---|
| `h1#esc-palco-titulo` | `dados.js` › `HERO.titulo` ("Smash na chapa, entregue quente") |
| Texto | `dados.js` › `HERO.texto` (traz o horário) |
| Ação | `dados.js` › `HERO.acao` ("Ver cardápio"), `RouterLink` para `/menu` |
| Foto | `public/images/foods/smash-burger` por caminho fixo, que não vem da store e não muda com o painel. São WebP de 480, 960 e 1440 e JPG de 960, com 960 × 683 de tamanho natural. Vai por `responsiveImage("/images/foods/smash-burger", { sizes: "(min-width: 1152px) 1152px, 100vw" })` |
| `alt` | `textos.js` › `TEXTOS.palcoAlt` (provisório): descreve o que se vê, sem alegação |

**Textos provisórios:** `palcoAlt: "Hambúrguer duplo com queijo derretido e cebola caramelizada"`.

A foto é a de um produto real, como a rubrica do crítico permite para o hero. Fica de fora o `banner-burger-black`, que não é de produto.

**Componentes:** `EscBotao` (`para="/menu"`, `variante="primaria"`, `tamanho="g"`). A foto e a máscara são marcação da própria seção.

**Estrutura**

1. **`<picture class="esc-palco__foto">`:**
   - bloco com `width: min(100%, 72rem)`, `margin-inline: auto`, `position: relative`;
   - `<source type="image/webp" :srcset :sizes>` e `<img>` com `width="960"`, `height="683"`, `loading="eager"`, `fetchpriority="high"` e `decoding="async"`;
   - o `img` tem `width: 100%`, `object-fit: cover` e `object-position: 50% 30%`;
   - altura do `img`:
     - a partir de `lg`: `height: clamp(16rem, 55svh, 31rem)`;
     - abaixo de `lg`: `aspect-ratio: 4 / 3` com `max-height: 60svh`.
   - **Máscara, no `img`, estática:**
     - a partir de `lg`: `mask-image: var(--esc-palco-mascara)`, com `mask-composite: intersect` (e `-webkit-mask-composite: source-in`). O token tem duas camadas: uma elipse que apaga as laterais em volta do lanche e uma vertical que apaga o topo (junto da barra) e os 20% de baixo (a tábua clara);
     - abaixo de `lg`: `mask-image: var(--esc-palco-mascara-estreita)`, só vertical, com o topo e os 12% de baixo apagados. Nessa largura, as laterais são a borda da tela.
   - Nada é pintado por cima da foto: não há brilho, degradê colorido nem sombra (a ficha tirou o brilho do hero).
2. **`<div class="container"><div class="esc-palco__texto">`:**
   - `position: relative`, `z-index: var(--z-raised)`;
   - `background: var(--esc-surface)`, que é a garantia de contraste: o texto nunca fica sobre a foto [H5];
   - sobe sobre a foto: `margin-top: calc(-1 * var(--space-8))` a partir de `lg` e `calc(-1 * var(--space-6))` abaixo. Os dois valores caem dentro da faixa em que a máscara já está em alfa 0, então a borda do bloco não aparece;
   - `max-width: 40rem`; conteúdo em grade com `gap: var(--space-4)`; o botão com `margin-top: var(--space-2)`.

**Tipografia:**

- `h1`: `--esc-fonte-display`, `--esc-titulo`, peso 400, `line-height: var(--leading-display)`, `letter-spacing: 0.01em`, cor `--esc-on-surface`, `max-width: 16ch`;
- texto: Archivo `--esc-peso-texto`, 1.0625rem, `--esc-on-surface-variant`, `max-width: 36ch`.

**Interação e estados:**

- só "Ver cardápio", com os estados de `EscBotao`: padrão, hover, foco e pressionado;
- a foto não é interativa e não reage ao hover.

**Acessibilidade:**

- landmark: a seção, nomeada pelo `h1` (o único da página);
- `img` com `alt` = `TEXTOS.palcoAlt`, `width` e `height`;
- o link tem o nome do próprio texto, "Ver cardápio";
- a ordem do DOM é foto, `h1`, texto e botão. Não há texto sobre foto.

**Comportamento:**

- **1440:**
  - foto de 1152 × 496 px, centrada;
  - bloco de texto alinhado à esquerda do contêiner, subindo 64 px;
  - `h1` em 2 linhas;
  - `padding-block-end: var(--space-7)`;
  - o `h2` da `vitrine` começa acima de 900 px (o construtor confere na fatia 1).
- **1024:** foto de 1024 px de largura e cerca de 495 px de altura; `h1` em até 3 linhas.
- **390:**
  - foto de ponta a ponta, em 4:3 (cerca de 292 px);
  - texto subindo 32 px;
  - `h1` de 38 px em até 4 linhas (dá 2);
  - "Ver cardápio" com `width: 100%` abaixo de `sm` [H19].

**Movimento:**

- nenhum ao carregar: nada de acender, entrar, paralaxe ou tilt [H1]. Um fade da foto atrasaria o LCP [91];
- só os estados do botão.
- **Versão reduzida:** a mesma.

**Cardápio editado:** não se aplica. A foto é o arquivo fixo de `public/images`, e o texto vem de `HERO`.

**Cores forçadas e mais contraste:**

- a máscara não é cor e continua;
- o bloco de texto vira `Canvas`, e o botão segue as cores do sistema;
- em `prefers-contrast: more`, sai a máscara larga e fica só a estreita, para a foto ter bordas definidas.

### 4.2 `vitrine`

- **Arquivo:** `secoes/EscSecaoVitrine.vue`.
- **Raiz:** `<section data-secao="vitrine" aria-labelledby="esc-vitrine-titulo" class="esc-vitrine">`.
- **Objetivo:**
  - os lanches reais com foto, nome, preço e "Adicionar", sem carrossel e sem caçar [H20][H6][H9][H10];
  - o card contornado em superfície tonal, a forma de card do escuro [63][87][4];
  - mostrar o que já está no pedido: o card sobe um degrau [87][83]. Isso dá orientação no pedido, que o Baymard viu faltar nas Homes de delivery [H23][H24].
- **Nova em relação à v1:** não. Substitui o carrossel "Mais pedidos".

**Conteúdo real**

| Campo | Origem |
|---|---|
| `h2#esc-vitrine-titulo` | `dados.js` › `CATEGORIAS` (chave `foods`) › `rotulo` ("Hambúrgueres") |
| Link do cabeçalho | `HERO.acao` ("Ver cardápio"), `RouterLink` para `/menu` |
| Cards | `useProductsStore().foods[]` (`products.json` › `menuItems.foods`, editável): `id` (chave), `name` (`h3`), `description`, `image` e `price`. Imagem e preço vêm de `useCartaoProduto` (`imagem`, `preco` = `formatPrice`) |
| Botão | "Adicionar" e "Adicionado" (`ProductCard.vue`, em `REAIS`), com `v-bind="cartao.atributosAdicionar"` (`aria-label="Adicionar <nome>"`, `data-adicionado`) e `@click="personalizar(produto, cartao.contexto)"` (`usePersonalizar()`) |
| No seu pedido | `useNoPedido().quantidadeNoPedido(produto)`: a soma de `quantity` das linhas de `useCartStore().items` com o mesmo `category` e `productId`. É o carrinho do próprio visitante, sem dado de loja. Rótulo em `TEXTOS.noPedido`; para leitor de tela, `formatItemCount(n)` |
| Vazio | `MenuView.vue` (`EmptyState`): "Nada nesta categoria por enquanto" e "Dê uma olhada nas outras categorias.", em `REAIS` |

**Textos provisórios:** `noPedido: "No seu pedido"`.

**Componentes:**

- `EscCartao`, um por produto (é o único card da página);
- `EscBotaoAdicionar` (`variante="primaria"`, `largo`), `EscFoto` e `EscMarcaPedido`, dentro do card;
- `EscVazio`, quando a lista vem vazia.

O link "Ver cardápio" do cabeçalho é um `RouterLink` com o mixin `link-texto` de `scss/_base.scss` (primary, sublinhado, `min-height: var(--target-min)`), e não um componente.

**Estrutura:**

- cabeçalho `div.esc-vitrine__cabecalho` (flex, `justify-content: space-between`, `align-items: baseline`), com o `h2` e o link "Ver cardápio";
- `<ul class="esc-vitrine__lista" role="list">`, com um `<li>` por produto em `productsStore.foods`, na ordem do JSON;
- no `h2`, a Bebas em `--esc-titulo-secao`.

**Interação e estados:**

- **"Adicionar":** padrão, hover, foco, pressionado e adicionado (`dur-base` + `dur-hold`, do `useCartaoProduto`);
- **card padrão:**
  - fundo `--esc-surface-high` (N17), `border: 1px solid var(--esc-outline)` e `--esc-raio-md`;
  - o card não reage ao hover;
- **card "no seu pedido"** (`quantidadeNoPedido > 0`), em três camadas:
  - o `::before` em `--esc-surface-highest` (N22) vai à opacidade 1;
  - o `::after`, com `border: 2px solid var(--esc-tertiary)` e `pointer-events: none`, vai à opacidade 1;
  - a `EscMarcaPedido` aparece no canto inferior esquerdo da foto.
  O estado volta quando o produto sai do carrinho, que é sincronizado com o cardápio. Ele persiste ao recarregar, porque o carrinho fica no `localStorage`.
- **Imagem:** carregando (reserva na proporção, em N22), carregada, falhou (ícone de hambúrguer) e `data:`.

**Acessibilidade:**

- landmark: a seção, nomeada pelo `h2`;
- cada `li` leva um `<article aria-labelledby="esc-lanche-<id>">` com o `h3#esc-lanche-<id>`;
- o preço é um `<p class="tabular">`;
- a marca "No seu pedido" é texto do card: o leitor ouve "No seu pedido: 2 itens" ao navegar por ele;
- o botão mantém o nome "Adicionar <nome>". O anúncio de "adicionado" é do modal real, e nada é anunciado em dobro.

**Comportamento:**

- **1440 e 1024 (≥ `lg`):**
  - lista em grade de 2 colunas (`gap: var(--space-5)`);
  - card em grade `40% 1fr`, com a foto quadrada (`aspect-ratio: 1`, `object-fit: cover`) cobrindo a altura do card;
  - corpo com `padding: var(--space-5)` (`--space-4` em 1024) e `gap: var(--space-2)`;
  - nome em Archivo 700, 1.3125rem;
  - descrição em 0.9375rem, `--esc-on-surface-variant`, `line-clamp: 3`;
  - rodapé do corpo em flex, com o preço (700, 1.3125rem, tabular) e o botão à direita, colado embaixo (`margin-top: auto`);
  - com número ímpar de cards, o último fica sozinho à esquerda.
- **768 a 1023:** uma coluna, com o mesmo card horizontal, mais largo.
- **390 (< `sm`):**
  - card em grade `7rem 1fr`, com a foto cobrindo a altura;
  - corpo com nome, preço, descrição em `line-clamp: 2` e o botão com `width: 100%`;
  - padding `--space-4`.
- **`sizes` das fotos:** `"(min-width: 1024px) 340px, (min-width: 768px) 280px, 160px"`. O `cover` pede mais largura que a caixa quando a foto é 3:2.

**Movimento:**

- **com `motion-ok`:** as camadas do "no seu pedido" (`::before` e `::after`) fazem opacidade em `--dur-base` com `--ease-out`. A marca entra por opacidade em `--dur-fast`;
- **versão reduzida:** as mesmas opacidades em `--dur-fast`;
- nada de transformação no card.

**Cardápio editado:**

- **produto sumido:** sai da lista, que itera a store. A linha dele no carrinho é retirada pelo `syncWithCatalog`, e a marca some;
- **nome ou preço novo:** aparece na hora (store reativa; preço sempre por `formatPrice`);
- **imagem `data:`:** o `EscFoto` mostra só o `<img>`, sem `<source>`, com o mesmo `cover`;
- **lista vazia:** no lugar da lista entra a `EscVazio`, com "Nada nesta categoria por enquanto", "Dê uma olhada nas outras categorias." e "Ver cardápio". O `h2` e o `data-secao` continuam.

**Cores forçadas e mais contraste:**

- **`forced-colors: active`:**
  - os degraus somem (fundo `Canvas`);
  - o contorno do card fica (`CanvasText`);
  - o "no seu pedido" se mantém pela borda de 2 px (`Highlight`) e pelo texto da marca;
- **`prefers-contrast: more`:** o contorno do card passa a 2 px, e o do "no seu pedido" a 3 px.

### 4.3 `junto`

- **Arquivo:** `secoes/EscSecaoJunto.vue`.
- **Raiz:** `<section data-secao="junto" aria-labelledby="esc-junto-titulo" class="esc-junto">`.
- **Objetivo:**
  - mostrar na Home os outros tipos do cardápio, com "Adicionar", porque o `/menu` abre sempre em Hambúrgueres e quem não vê um tipo supõe que a loja não vende [H21][H22];
  - aplicar os degraus de luz sem caixas. A seção inteira é o degrau: uma faixa N12 de ponta a ponta, um passo acima da base N6, como a superfície elevada da escala sunken, default e raised [87] ou o fundo secundário da Apple [81]. Dentro dela, nenhum item ganha caixa: as linhas ficam direto na faixa, e a hierarquia vem do tom, não de bordas [87][4];
  - separar as linhas só pelo espaço, porque no escuro os divisores finos somem [46];
  - acompanhamento é ação de menos ênfase, então o botão é tonal, em secondary-container [81][4];
  - as fotos das bebidas têm fundo claro (bancada e copo, observado no dossiê), então ficam pequenas, atenuadas e se apagam na faixa pelo lado do texto [46][47][50]. É a regra do `palco` em escala baixa, sem disputar com ele.
- **Origem do bloco:** o equivalente ao "Bar & Wine" do Tomahawk [104] (conceito), que o dossiê lista como a seção "Bebidas e sobremesas".
- **Nova em relação à v1:** sim.

**Conteúdo real**

| Campo | Origem |
|---|---|
| `h2#esc-junto-titulo` | `TEXTOS.juntoTitulo` ("Junto com o lanche", provisório) |
| `h3` dos grupos | `CATEGORIAS` › `rotulo` de `drinks` ("Bebidas") e de `desserts` ("Sobremesas") |
| Linhas | `useProductsStore().drinks[]` e `.desserts[]`: `id`, `category`, `name` (`h4`), `description` (uma linha; hoje traz o volume, como "500ml"), `image` e `price` (via `useCartaoProduto`) |
| Botão e marca | Como na `vitrine` ("Adicionar" e "Adicionado" de `ProductCard.vue`; `TEXTOS.noPedido`) |
| Vazio | `MenuView.vue` (os mesmos textos da `vitrine`) |

O modal real cuida do resto: nas bebidas, mostra a quantidade; na sobremesa, os adicionais.

**Textos provisórios:** `juntoTitulo: "Junto com o lanche"`.

**Componentes:** `EscLinha`, uma por produto, com `EscFoto` (`atenuada`, `dissolvida`, `proporcao="4 / 3"`), `EscBotaoAdicionar` (`variante="tonal"`) e `EscMarcaPedido` (`compacta`); e `EscVazio` (`plano`).

**Estrutura:**

- **a raiz é a própria faixa:**
  - um bloco na largura toda do `<main>` da moldura, de ponta a ponta da janela, sem `max-width` e sem `100vw`;
  - `background: var(--esc-surface-container)`, sem raio, sem borda e sem sombra;
  - `padding-block: var(--space-8)` a partir de `lg` e `var(--space-7)` abaixo;
- dentro, `div.container` com o `h2` (Bebas, `--esc-titulo-secao`) e `div.esc-junto__grupos`;
- um `div.esc-junto__grupo` com `data-grupo="<chave>"` por categoria que tenha itens. Em cada um: o `h3` (Bebas, 1.75rem) e `<ul role="list" class="esc-junto__lista">`, com um `li` por produto e uma `EscLinha` em cada;
- a lista tem `margin-inline: calc(-1 * var(--space-3))` a partir de `lg` e `calc(-1 * var(--space-2))` abaixo, o mesmo valor do `padding` da linha. Assim a foto fica alinhada ao `h3`, e a borda do "no seu pedido" avança sobre a margem;
- nada separa as linhas além do `row-gap`: sem divisória, sem fundo por linha e sem contorno.

**Interação e estados:**

- os da `EscLinha`: padrão (direto na faixa), "no seu pedido" e imagem (carregando, falhou e `data:`);
- os do `EscBotaoAdicionar` tonal: padrão, hover, foco, pressionado e adicionado;
- a linha não reage ao hover e não é clicável inteira: só o botão age;
- **linha "no seu pedido"** (`quantidadeNoPedido > 0`): a linha sobe um degrau, de N12 (a faixa) para N17, em três camadas:
  - o `::before` em `--esc-surface-high` (N17), com `--esc-raio-md`, vai à opacidade 1;
  - o `::after`, com `border: 2px solid var(--esc-tertiary)`, `--esc-raio-md` e `pointer-events: none`, vai à opacidade 1;
  - a `EscMarcaPedido` compacta aparece depois do preço, na mesma linha.
  A linha tem sempre o mesmo `padding` (`--space-3` a partir de `lg` e `--space-2` abaixo), e só as camadas aparecem: nada muda de tamanho nem pula. O estado volta quando o produto sai do carrinho e persiste ao recarregar, como na `vitrine`.

**Acessibilidade:**

- seção nomeada pelo `h2`;
- títulos `h2` › `h3` (grupo) › `h4` (produto), sem salto;
- cada `li` leva um `<article aria-labelledby="esc-junto-<category>-<id>">` com o `h4` desse id. O `category` entra no id porque os ids se repetem entre categorias no `products.json` (a primeira bebida e a sobremesa têm `id` 1);
- a marca compacta tem o texto completo em `visually-hidden` ("No seu pedido: 2 itens");
- não há texto sobre foto: a foto fica na própria coluna, e a máscara só a apaga para a faixa;
- o resto como na `vitrine`.

**Comportamento:**

- **1440 e 1024 (≥ `lg`):**
  - grupos em grade de 2 colunas (`repeat(2, minmax(0, 1fr))`, `column-gap: var(--space-7)`), com Bebidas à esquerda e Sobremesas à direita. Se um grupo some, o outro fica na coluna da esquerda;
  - cada lista numa coluna só, com `row-gap: var(--space-3)`;
  - linha em grade `7rem 1fr auto`, com `align-items: center` e `column-gap: var(--space-4)`: a foto, o texto (nome, descrição e preço empilhados, `gap: var(--space-1)`) e o botão;
  - colunas de cerca de 560 px em 1440 e de 450 px em 1024.
- **768 a 1023:** grupos empilhados (`gap: var(--space-6)`); cada lista numa coluna só, na largura do contêiner, com a mesma linha de `lg` (em 2 colunas, o texto ficaria com pouco mais de 100 px).
- **390:**
  - a faixa vai de ponta a ponta da tela (390 px), e o conteúdo fica no contêiner (358 px);
  - grupos empilhados (`gap: var(--space-6)`), listas numa coluna (`row-gap: var(--space-2)`);
  - linha em grade `6rem 1fr`, com `column-gap: var(--space-3)`: a foto à esquerda e, à direita, o nome, a descrição numa linha e, embaixo, o preço e o botão lado a lado (`justify-content: space-between`). O botão fica no tamanho do texto, sem largura total.
- **Linha:**
  - foto 4:3 (`7rem` × `5.25rem` a partir de `lg`, `6rem` × `4.5rem` abaixo), `object-fit: cover`, cantos `--esc-raio-sm`;
  - na foto, `filter: var(--esc-foto-filtro-baixo)` e `mask-image: var(--esc-linha-mascara)`: opaca até 60% da largura e apagada até a borda do lado do texto (`to right`; a página é só LTR);
  - nome em Archivo 600, 1.0625rem, `--esc-on-surface`; descrição em 0.9375rem, `--esc-on-surface-variant`, `line-clamp: 1`; preço em 700, 1.0625rem, tabular;
  - o nome quebra em linhas e não é cortado.
- **`sizes`:** `"(min-width: 1024px) 112px, 96px"`. Com densidade 2, o navegador escolhe a versão de 480 px.

**Movimento:**

- **com `motion-ok`:** as camadas do "no seu pedido" (`::before` e `::after`) fazem opacidade em `--dur-base` com `--ease-out`, e a marca entra por opacidade em `--dur-fast`, como no card da `vitrine`;
- **versão reduzida:** as mesmas opacidades em `--dur-fast`;
- nada de transformação na linha. O filtro e a máscara são estáticos.

**Cardápio editado:**

- **categoria vazia:** o grupo some, com o `h3` e a lista;
- **as duas vazias:** no lugar dos grupos entra a `EscVazio` com `plano` (sem painel próprio, porque a faixa já é o degrau), com "Nada nesta categoria por enquanto", "Dê uma olhada nas outras categorias." e "Ver cardápio". O `h2`, o `data-secao` e a faixa continuam;
- **produto sumido, nome ou preço novo:** como na `vitrine`;
- **imagem `data:`:** o `EscFoto` mostra só o `<img>`, com o mesmo `cover`, filtro e máscara;
- **imagem que falhou:** o ícone da categoria (`faGlassWater` ou `faIceCream`) sobre `--esc-surface-highest`, na proporção 4:3 e sem máscara;
- **nome longo:** quebra em linhas; a linha cresce, e o botão continua centrado na altura (a partir de `lg`) ou ao lado do preço (abaixo).

**Cores forçadas e mais contraste:**

- **`forced-colors: active`:**
  - a faixa vira `Canvas` e ganha `border-block: 1px solid CanvasText`, para o degrau continuar visível;
  - o "no seu pedido" fica pela borda de 2 px (`Highlight`) e pelo texto da marca;
  - o filtro e a máscara da foto continuam, porque não são cor de sistema;
- **`prefers-contrast: more`:**
  - a faixa ganha `border-block: 1px solid var(--esc-outline)`;
  - a máscara da foto sai, e a foto fica com as bordas definidas, como no `palco`;
  - a borda do "no seu pedido" passa a 3 px.

### 4.4 `turno`

- **Arquivo:** `secoes/EscSecaoTurno.vue`.
- **Raiz:** `<section data-secao="turno" aria-labelledby="esc-turno-titulo" class="esc-turno">`.
- **Objetivo:**
  - dar ao horário um lugar próprio e fácil de achar [H29][H26];
  - mostrar o que o texto só diz: a cozinha abre à tarde e vai até depois da meia-noite, um horário que passa para o dia seguinte e é um caso à parte [H31];
  - o trecho aberto é o que está aceso (claro), de novo a regra de luz.
- **Nova em relação à v1:** sim.

**Conteúdo real**

| Campo | Origem |
|---|---|
| `h2#esc-turno-titulo` | `dados.js` › `RODAPE.horario` ("Horário"), rótulo real |
| Horário | `dados.js` › `HORARIO` ("Terça a sexta, das 13h à 01h") |
| Faixa | `lerTurno(HORARIO)` (`turno.js`), que devolve `{ abre: 13, fecha: 1, rotuloAbre: "13h", rotuloFecha: "01h" }`. Os rótulos são recortes do próprio `HORARIO`, sem texto escrito à mão |
| Rótulos do eixo | `TEXTOS.meioDia` ("meio-dia") e `TEXTOS.meiaNoite` ("meia-noite"), provisórios e sem dígitos |

**Textos provisórios:** `meioDia` e `meiaNoite`.

**Componentes:** `EscFaixaHoras`, só se `lerTurno` não devolver `null`.

**Estrutura:**

- `h2` (Bebas, `--esc-titulo-secao`);
- `<p class="esc-turno__horario">{{ HORARIO }}</p>`: Archivo 600, `--esc-on-surface`, 1.75rem a partir de `lg` e 1.3125rem abaixo, `max-width: 24ch`;
- `EscFaixaHoras`, com `margin-top: var(--space-5)` e `max-width: 40rem`.

**Interação e estados:**

- nada é interativo;
- a faixa tem um estado só, estático;
- se o texto do horário mudar de formato e `lerTurno` falhar, a faixa some e o texto fica.

**Acessibilidade:**

- seção nomeada pelo `h2`;
- a informação está no `<p>` do horário;
- a faixa é `aria-hidden="true"`, uma redundância visual do texto, e não precisa de nome. Ainda assim, o trecho aceso tem 3:1 contra o trilho e contra a página (pares na seção 7).

**Comportamento:**

- **1440 e 1024:** horário em 28 px e faixa com até 40 rem, alinhada à esquerda.
- **390:**
  - horário em 21 px e faixa na largura do contêiner (358 px; cada coluna com cerca de 15 px);
  - os rótulos não se encostam: os de cima ficam nas colunas 2 e 13, e os de baixo nas colunas 1 a 6, 9 a 16 e 19 a 24.

**Movimento:**

- nenhum: a faixa não se desenha nem anima;
- **versão reduzida:** a mesma.

**Cardápio editado:** não depende do cardápio.

**Cores forçadas e mais contraste:**

- **`forced-colors: active`:** o trecho aceso usa `background: CanvasText`, e o trilho fica com `border: 1px solid CanvasText` e fundo `Canvas`;
- **`prefers-contrast: more`:** o trilho ganha borda de 1 px em `--esc-outline`.

---

## 5. Topo e rodapé (fora das seções)

### Topo: `EscBarra` (slot `#topo`)

**Estrutura:**

- `<header ref="cabecalho" class="esc-barra" :class="{ 'is-rolada': rolada }">` e `div.container.esc-barra__interno`;
- **marca:** `RouterLink` para `INICIO` (`/direcoes/escuro`), com `MARCA` em Bebas 1.75rem, `--esc-on-surface`;
- **`<nav aria-label="Principal">`:** `<ul role="list">` com os links de `useLinksPrincipais(INICIO)`. Início leva `aria-current="page"`;
- **carrinho:**
  - `RouterLink` para `/cart` com `:aria-label="rotulo"` (`useContadorCarrinho`);
  - ícone `['fas','shopping-cart']` com `aria-hidden`;
  - selo `span.esc-barra__selo.tabular` com `aria-hidden="true"` e o `texto` (até "99+"), visível só com `quantidade > 0`.

**Visual:**

- fundo `--esc-surface`, na cor da base [87];
- `::after` com 1 px em `--esc-outline-variant` embaixo e opacidade 0, que passa a 1 com `.is-rolada`;
- link: `min-height: var(--target-min)`, `padding-inline: var(--space-3)`, `--esc-on-surface-variant`, peso 500, com a camada de estado;
- link atual: `--esc-on-surface` e `box-shadow: var(--underline-active)`;
- selo: `--esc-primary`, `--esc-on-primary`, 0.75rem, peso 700, `--esc-raio-sm`.

**Comportamento:**

- **a partir de `md`:**
  - `position: sticky; top: 0; z-index: var(--z-navbar)`;
  - uma linha só: a marca, a nav com `margin-left: auto` e o carrinho;
- **abaixo de `md`:**
  - `position: static`;
  - duas linhas: na primeira, a marca e o carrinho; na segunda, os três links, com `gap: var(--space-1)` e alinhados à esquerda.
  - Não há botão de menu [H14].

**Lógica:** `useRolada()` devolve `rolada` como `window.scrollY > 0`, com escuta `passive` de `scroll` e `requestAnimationFrame`, limpa no `onBeforeUnmount`.

**Movimento:**

- a linha inferior troca por opacidade em `--dur-fast`;
- o selo entra e sai por opacidade em `--dur-fast`, e o número troca do mesmo jeito (`Transition` com `key` no texto e `mode="out-in"`);
- a camada de estado faz opacidade em `--dur-fast`;
- **versão reduzida:** igual, porque nada passa de `--dur-fast` nem usa transformação.

**Contrato:** a nav "Principal" com Início, Cardápio e Entrar ou Perfil; o carrinho com o nome no formato `^Carrinho,? (vazio|\d+ itens?)$`. Sem botão de menu, o P8 não testa o menu aberto.

### Rodapé: `EscRodape` (slot `#rodape`)

**Estrutura:**

- `<footer class="esc-rodape">` em `--esc-surface-lowest` (N4, afundado [87]);
- **marca:** `<p>` com `MARCA` em Bebas 2rem e `DESCRICAO` em `--esc-on-surface-variant`, `max-width: 38ch`;
- **endereço:** `h2` com `RODAPE.endereco` ("Endereço"), Archivo 700, 1rem, e uma `EscLinkContato` com `CONTATOS[endereco]`;
- **contato:** `h2` com `TEXTOS.contatoTitulo` ("Contato", provisório) e `<ul role="list">` com duas `EscLinkContato` (`CONTATOS[whatsapp]` e `CONTATOS[email]`);
- **navegação:** `<nav aria-label="Rodapé">` (`TEXTOS.rodapeNav`, provisório) com os mesmos links de `useLinksPrincipais(INICIO)`. São links de texto com `min-height: var(--target-min)` e sem `aria-current`, porque a principal já marca;
- **direitos:** `<p>` com `RODAPE.copyright`, `border-top: 1px solid var(--esc-outline-variant)`, `--esc-on-surface-variant`, 0.875rem.

**Comportamento:**

- **1440 e 1024:** grade `1.4fr 1.3fr 1.3fr` (marca, endereço e contato); a navegação e os direitos embaixo, na largura toda;
- **390:** tudo empilhado, com `gap: var(--space-6)`.

**Por quê:** as pessoas vão direto ao rodapé procurar contato [H30], e o endereço abre o mapa [H29][H32]. Os externos avisam que abrem em nova aba [H34]. As redes ficam de fora: os links de `REDES` são genéricos [H25][H26].

**Movimento:** só os estados dos links.

---

## 6. Inventário de componentes (11, fora as seções)

Todos ficam em `componentes/`, com `<script setup>`, `defineProps` com tipo e padrão e `defineEmits` declarado. Cada um faz `@use` da própria parcial em `scss/_<nome>.scss`, dentro de `<style scoped lang="scss">`.

| Componente | Papel | Props (tipo, padrão) | Slots | Emits | Tokens | Origem |
|---|---|---|---|---|---|---|
| `EscBarra` | Cabeçalho com a marca, a nav e o carrinho; a linha aparece ao rolar | `inicio` (String, `"/direcoes/escuro"`) | — | — | `esc-surface`, `esc-outline-variant`, `esc-on-surface(-variant)`, `esc-primary`, `esc-on-primary`, `underline-active`, `esc-anel-*` | [87][H14][H17][H35] |
| `EscRodape` | Rodapé afundado com endereço, contatos, navegação e direitos | `inicio` (String, `"/direcoes/escuro"`) | — | — | `esc-surface-lowest`, `esc-on-surface(-variant)`, `esc-outline-variant` | [87][H30][H29], [99][102][104] |
| `EscBotao` | Ação preenchida ou tonal; vira `RouterLink` com `para` | `para` (String\|Object, `null`), `variante` (`"primaria"`\|`"tonal"`, `"primaria"`), `tamanho` (`"m"`\|`"g"`, `"m"`), `tipo` (String, `"button"`) | default | `click` (só como `<button>`) | `esc-primary(-hover/-pressed)`, `esc-on-primary`, `esc-secondary-container(-hover/-pressed)`, `esc-on-secondary-container`, `esc-raio-sm`, `esc-anel-*` | [4][81][82][88] |
| `EscBotaoAdicionar` | "Adicionar" com a face "Adicionado ✓" | `atributos` (Object, obrigatório: o `atributosAdicionar`), `adicionado` (Boolean, `false`), `variante` (`"primaria"`\|`"tonal"`, `"primaria"`), `largo` (Boolean, `false`: `width: 100%` abaixo de `sm`; é o botão do card da `vitrine` no celular) | — | `click` | os do `EscBotao` e `esc-tertiary-container`, `esc-on-tertiary-container` | `ProductCard.vue`; [81][82] |
| `EscFoto` | Foto de produto com reserva, falha, `data:`, atenuação e borda que se apaga | `imagem` (Object, obrigatório: `{ src, srcset, sizes }`), `alt` (String, obrigatório), `largura` (Number, 960), `altura` (Number, 720), `falhou` (Boolean, `false`), `categoria` (`"foods"`\|`"drinks"`\|`"desserts"`, `"foods"`), `proporcao` (String, `"1 / 1"`), `atenuada` (Boolean, `false`: filtro baixo), `dissolvida` (Boolean, `false`: `--esc-linha-mascara` no `img`, que sai em `prefers-contrast: more`) | — | `erro` | `esc-surface-highest`, `esc-on-surface-variant`, `esc-foto-filtro`, `esc-foto-filtro-baixo`, `esc-linha-mascara`, `esc-raio-sm` | [46][47][50] |
| `EscCartao` | Card contornado dos lanches em N17, que sobe a N22 no pedido. É o único card da página | `produto` (Object, obrigatório), `quantidadeNoPedido` (Number, 0), `tamanhos` (String, o `sizes` da `vitrine`) | — | — | `esc-surface-high`, `esc-surface-highest`, `esc-outline`, `esc-tertiary`, `esc-on-surface(-variant)`, `esc-raio-md` | [63][87][4][83][H20] |
| `EscLinha` | Linha de acompanhamento direto na faixa N12, sem caixa, que sobe a N17 com a borda tertiary no pedido | `produto` (Object, obrigatório), `quantidadeNoPedido` (Number, 0), `tamanhos` (String, `"(min-width: 1024px) 112px, 96px"`) | — | — | `esc-surface-high`, `esc-tertiary`, `esc-on-surface(-variant)`, `esc-raio-md` | [87][81][46][4][H20] |
| `EscMarcaPedido` | "No seu pedido" com a contagem, em tertiary | `quantidade` (Number, obrigatório, ≥ 1), `compacta` (Boolean, `false`: só o ícone e o número; o texto vai para o leitor) | — | — | `esc-tertiary-container`, `esc-on-tertiary-container`, `esc-raio-sm` | [4][81][H23][H24] |
| `EscFaixaHoras` | Faixa de 24 colunas, de meio-dia a meio-dia, com o trecho aberto aceso | `abre` (Number, obrigatório, 0 a 23), `fecha` (Number, obrigatório, 0 a 23), `rotuloAbre` (String, obrigatório), `rotuloFecha` (String, obrigatório), `rotulos` (Object, obrigatório: `{ meioDia, meiaNoite }`) | — | — | `esc-faixa-acesa`, `esc-faixa-apagada`, `esc-surface`, `esc-on-surface(-variant)`, `esc-raio-sm` | [H31][H29]; `HORARIO` |
| `EscLinkContato` | Link de contato sublinhado em primary, com ícone e aviso de nova aba | `contato` (Object, obrigatório: `{ chave, texto, href, externo, icone }`) | — | — | `esc-primary`, `esc-primary-pressed`, `esc-on-surface-variant`, `esc-anel-*` | [85][94][H29][H32][H33][H34] |
| `EscVazio` | Estado vazio de uma categoria, com o caminho para o cardápio | `titulo` (String, obrigatório), `texto` (String, obrigatório), `nivel` (Number, 3), `para` (String, `"/menu"`), `rotuloAcao` (String, `"Ver cardápio"`), `plano` (Boolean, `false`: sem painel próprio, para a faixa da `junto`) | — | — | `esc-surface-container`, `esc-on-surface(-variant)`, `esc-raio-lg` | `MenuView.vue`; [H1] |

**`EscCartao` por dentro:**

- usa `CartaoProduto` (`v-slot="cartao"`) com `:tamanhos` e chama `usePersonalizar()`;
- monta `EscFoto`, o `h3`, a descrição, o preço, `EscBotaoAdicionar` (`primaria`, `largo`) e, com `quantidadeNoPedido > 0`, `EscMarcaPedido`;
- a foto vai à esquerda, cobrindo a altura do card.

**`EscLinha` por dentro:**

- usa `CartaoProduto` (`v-slot="cartao"`) com `:tamanhos` e chama `usePersonalizar()`, como o card;
- raiz `<article class="esc-linha" :class="{ 'is-no-pedido': quantidadeNoPedido > 0 }" :aria-labelledby>`, com `position: relative`, `isolation: isolate` e o `padding` fixo da seção 4.3. O `::before` (N17) e o `::after` (borda tertiary) usam `inset: 0`, `--esc-raio-md` e o `--esc-z-fundo`, e só mudam de opacidade;
- monta `EscFoto` (`atenuada`, `dissolvida`, `proporcao="4 / 3"`, `:categoria="produto.category"`), o `h4`, a descrição, o `div.esc-linha__preco` (o preço e, com `quantidadeNoPedido > 0`, a `EscMarcaPedido` compacta) e o `EscBotaoAdicionar` tonal;
- não tem fundo, contorno nem sombra fora do estado "no seu pedido".

**`EscFoto`, ícone de reserva:** `['fas','burger']` (registrado), `faGlassWater` ou `faIceCream`, conforme a `categoria`. Os dois últimos são importados no próprio componente, de `@fortawesome/free-solid-svg-icons`.

**`EscMarcaPedido`, marcação:**

- `<p class="esc-marca-pedido">`, com o ícone do carrinho (`aria-hidden`), `TEXTOS.noPedido` (visível fora do modo compacto) e o número em `span.tabular aria-hidden="true"`;
- `span.visually-hidden` com `${TEXTOS.noPedido}: ${formatItemCount(quantidade)}`.
- Na `vitrine` fica em `position: absolute` no canto inferior esquerdo da foto (`inset: auto auto var(--space-2) var(--space-2)`). Tem fundo sólido próprio, então não é texto sobre foto sem garantia.
- Na `junto`, compacta, fica em linha depois do preço (`display: inline-flex`, `gap: var(--space-1)`), fora da foto.

**`EscFaixaHoras`, marcação:**

- `div.esc-faixa` com `aria-hidden="true"` e `display: grid; grid-template-columns: repeat(24, minmax(0, 1fr))`, em três linhas: rótulos de cima, trilho e rótulos de baixo;
- **trilho:** `grid-column: 1 / -1`, 0.75rem de altura, `--esc-faixa-apagada` e `--esc-raio-sm`;
- **trecho aceso:** `grid-column: <início> / span <duração>`, na mesma linha do trilho, em `--esc-faixa-acesa`, com:
  - `início = ((abre − 12 + 24) % 24) + 1` (hoje, 2);
  - `duração = (fecha − abre + 24) % 24` (hoje, 12);
- **corte da meia-noite:** `grid-column: 13`, `justify-self: start`, 2 px de largura em `--esc-surface`, por cima do trecho;
- **rótulos de cima** (Archivo 600, 0.9375rem, on-surface):
  - `rotuloAbre` em `grid-column: <início> / span 4`, `justify-self: start`;
  - `rotuloFecha` terminando na coluna `<início + duração − 1>`, com `justify-self: end`.
- **rótulos de baixo** (0.875rem, on-surface-variant):
  - `meioDia` em `1 / 7`, à esquerda;
  - `meiaNoite` em `9 / 17`, centrado;
  - `meioDia` em `19 / 25`, à direita.
- Nada usa `transform`: a centralização vem da grade.

### Matriz de estados

| Componente | Padrão | Hover (`hover-capable`) | Foco (`:focus-visible`) | Pressionado | Selecionado ou ativo | Desabilitado | Carregando |
|---|---|---|---|---|---|---|---|
| `EscBotao` primaria | `--esc-primary`, texto `--esc-on-primary`, 600 | `--esc-primary-hover` (camada 0,08 já composta [82]) | anel em duas cores [88] e camada 0,1 | `--esc-primary-pressed` (0,1) | — | não existe na Home | não existe |
| `EscBotao` tonal | `--esc-secondary-container`, texto `--esc-on-secondary-container` | `--esc-secondary-container-hover` | anel | `--esc-secondary-container-pressed` | — | não existe | não existe |
| `EscBotaoAdicionar` | face "Adicionar" (primaria ou tonal) | a do `EscBotao` | anel | a do `EscBotao` | "Adicionado ✓" em `--esc-tertiary-container` / `--esc-on-tertiary-container`, por `--dur-base` + `--dur-hold` | não existe | não existe (o modal é síncrono) |
| `EscCartao` | N17, contorno `--esc-outline` de 1 px | nenhum (não é alvo) | nenhum (o foco fica no botão) | nenhum | **no seu pedido:** N22, borda `--esc-tertiary` de 2 px e marca | — | foto com reserva N22 na proporção |
| `EscLinha` | direto na faixa N12, sem fundo, contorno nem divisória | nenhum (não é alvo) | nenhum (o foco fica no botão) | nenhum | **no seu pedido:** N17, borda `--esc-tertiary` de 2 px e marca compacta depois do preço | — | foto com reserva N22 na proporção 4:3 |
| `EscFoto` | foto com `cover`; filtro baixo e máscara só na `junto` | — | — | — | — | — | reserva `--esc-surface-highest`; **falhou:** ícone por categoria em `--esc-on-surface-variant`, sem máscara |
| `EscMarcaPedido` | `--esc-tertiary-container` com o número | — | — | — | o número muda com o carrinho | — | — |
| `EscBarra`, link | `--esc-on-surface-variant` | camada 0,08 | anel e camada 0,1 | camada 0,1 | `aria-current`: `--esc-on-surface` e sublinhado inset primary | — | — |
| `EscBarra`, carrinho | ícone `--esc-on-surface-variant`; selo só com itens | camada 0,08 | anel | camada 0,1 | — | — | — |
| `EscBarra` | no topo, sem linha | — | — | — | **rolada:** linha `--esc-outline-variant` (a partir de `md`) | — | — |
| `EscLinkContato` | `--esc-primary`, sublinhado de 1 px, `text-underline-offset: 4px`, ícone em `--esc-on-surface-variant` | sublinhado de 2 px | anel | `--esc-primary-pressed` | — (visitado igual) | — | — |
| `EscFaixaHoras` | estática | — | — | — | — | — | — |
| `EscVazio` | painel N12, texto e "Ver cardápio" (`EscBotao` tonal); com `plano`, sem painel, direto na faixa | do botão | do botão | do botão | — | — | — |

**Anel de foco em duas cores** (mixin `anel` em `scss/_base.scss`, técnica C40 [88]):

```scss
outline: var(--esc-anel-largura) solid var(--esc-anel-claro);
outline-offset: var(--esc-anel-largura);
box-shadow: 0 0 0 calc(var(--esc-anel-largura) * 2) var(--esc-anel-escuro);
```

- O resultado é uma faixa escura de 0 a 2 px e uma clara de 2 a 4 px.
- A clara contrasta com a página, e a escura com o botão preenchido.
- Em cores forçadas, o `box-shadow` vira `none` e a `outline` fica, na cor do sistema [89].

**Camada de estado** (mixin `camada-de-estado` em `scss/_base.scss`):

- `::before` em `currentColor`, com opacidade 0,08 no hover, 0,1 no foco e 0,1 no pressionado [82];
- usada nos links da barra e no carrinho. Os botões usam as cores já compostas dos tokens.

### A11y e movimento por componente (resumo)

| Componente | A11y | Movimento (`motion-ok`) | Versão reduzida |
|---|---|---|---|
| `EscBarra` | `header`, nav "Principal", `aria-current`, carrinho com `rotulo`, selo `aria-hidden` | linha e selo por opacidade em `--dur-fast` | igual |
| `EscRodape` | `footer`, `h2` "Endereço" e "Contato", nav "Rodapé", externos com `NOVA_ABA` oculto | — | — |
| `EscBotao` | `<button type>` ou `RouterLink`; nome pelo texto; alvo ≥ 44 px (52 px no `g`) | cor de fundo sem transição; camada por opacidade em `--dur-fast` | igual |
| `EscBotaoAdicionar` | `v-bind="atributos"` (`aria-label="Adicionar <nome>"`, `data-adicionado`); face "Adicionado" com `aria-hidden`; texto em `span` filhos (o botão não tem texto direto) | faces trocam com `translateY(-100%)`/`translateY(100%)` e opacidade em `--dur-base`, `--ease-out`, com `overflow: hidden` no botão | só opacidade em `--dur-fast` |
| `EscCartao` | `article aria-labelledby` (`h3`); nada clicável além do botão | camadas do "no seu pedido" por opacidade em `--dur-base` | opacidade em `--dur-fast` |
| `EscLinha` | `article aria-labelledby` (`h4#esc-junto-<category>-<id>`); nada clicável além do botão | camadas do "no seu pedido" por opacidade em `--dur-base` | opacidade em `--dur-fast` |
| `EscFoto` | `alt` = nome do produto; `width` e `height`; `loading="lazy"`, `decoding="async"`; ícone de reserva `aria-hidden` (o nome está no card) | — | — |
| `EscMarcaPedido` | texto completo em `visually-hidden`; ícone e número `aria-hidden` | entra e sai por opacidade em `--dur-fast` | igual |
| `EscFaixaHoras` | `aria-hidden="true"`; o horário está no `<p>` ao lado | — | — |
| `EscLinkContato` | `<a>` com `min-height: var(--target-min)`; externos com `target="_blank" rel="noopener noreferrer"` e `NOVA_ABA` em `span.visually-hidden` [H34]; ícone `aria-hidden` | sublinhado muda sem transição | — |
| `EscVazio` | título no `nivel` pedido (`h3` na `vitrine` e na `junto`), texto e link | — | — |

---

## 7. Tokens, pares, lógica e dependências

### Tokens novos (prefixo `--esc-`; os valores ficam para o construtor, no `_tokens.scss`)

| Token | Papel |
|---|---|
| `--esc-anel-claro` | Faixa clara do anel de foco (sugestão: o mesmo valor de `--esc-primary`) [88] |
| `--esc-anel-escuro` | Faixa escura do anel (sugestão: o de `--esc-surface-lowest`), com 9:1 contra a clara [88] |
| `--esc-anel-largura` | Largura de cada faixa (2 px [88]) |
| `--esc-palco-mascara` | Máscara do palco a partir de `lg`: uma elipse em volta do lanche, que apaga as laterais, e uma vertical, que apaga o topo e os 20% de baixo. Usa `#000` e `transparent`, por isso fica nos tokens |
| `--esc-palco-mascara-estreita` | Máscara do palco abaixo de `lg`: só vertical, com o topo e os 12% de baixo apagados |
| `--esc-foto-filtro` | `filter` das fotos da `vitrine`: `brightness` leve, quase nada [47][50] |
| `--esc-foto-filtro-baixo` | `filter` das fotos de `junto`: `brightness` mais baixo, o degrau de luz de baixo (fundos claros nas bebidas [46][47]) |
| `--esc-linha-mascara` | Máscara das fotos de `junto` (`EscFoto` com `dissolvida`): um `linear-gradient(to right, …)` opaco até 60% e transparente na borda do lado do texto, para a foto se apagar na faixa. Usa `#000` e `transparent`, por isso fica nos tokens |
| `--esc-faixa-acesa` | Trecho aberto da faixa (sugestão: o mesmo valor de `--esc-on-surface`) |
| `--esc-faixa-apagada` | Trilho da faixa (sugestão: o de `--esc-surface-highest`) |
| `--esc-titulo-secao` | Tamanho do `h2` em Bebas, de 38 a 50 px (um `clamp`) |

Os tokens que já existem continuam: superfícies N4 a N22, papéis, `--esc-camada-*`, raios, fontes, `--esc-titulo` e os aliases do projeto. O `--esc-z-fundo` serve ao `::before` das camadas, e o `--z-raised` do projeto ao bloco de texto do palco.

### Pares de contraste novos (para `contraste.js`)

| Frente | Fundo | Mínimo | Onde |
|---|---|---|---|
| `esc-on-surface-variant` | `esc-surface` | 4,5 (7 informativo) | texto do palco e rótulos de baixo da faixa |
| `esc-on-surface` | `esc-surface-high` | 4,5 | nome e preço no card e na linha "no seu pedido" |
| `esc-on-surface-variant` | `esc-surface-high` | 4,5 (7 informativo) | descrição na linha "no seu pedido" (o par já existe para a descrição no card; acrescentar o "onde") |
| `esc-on-surface` | `esc-surface-container` | 4,5 (7 informativo) | títulos, nome e preço na faixa da `junto` |
| `esc-on-surface` | `esc-surface-highest` | 4,5 | nome e preço no card "no seu pedido" |
| `esc-on-surface-variant` | `esc-surface-highest` | 4,5 (7 informativo) | descrição no card "no seu pedido" |
| `esc-tertiary` | `esc-surface-highest` | 3 | borda "no seu pedido" no card |
| `esc-tertiary` | `esc-surface-high` | 3 | borda "no seu pedido" na linha, do lado de dentro |
| `esc-tertiary` | `esc-surface-container` | 3 | borda "no seu pedido" na linha, contra a faixa |
| `esc-on-tertiary-container` | `esc-tertiary-container` | 4,5 | marca "No seu pedido" (o par já existe para a face "Adicionado"; acrescentar o "onde") |
| `esc-on-secondary-container` | `esc-secondary-container` | 4,5 | "Adicionar" tonal |
| `esc-on-secondary-container` | `esc-secondary-container-hover` | 4,5 | "Adicionar" tonal no hover |
| `esc-on-secondary-container` | `esc-secondary-container-pressed` | 4,5 | "Adicionar" tonal pressionado |
| `esc-primary` | `esc-surface` | 4,5 | link "Ver cardápio" em texto na `vitrine` |
| `esc-primary` | `esc-surface-lowest` | 4,5 | links de contato no rodapé |
| `esc-primary-pressed` | `esc-surface-lowest` | 4,5 | link de contato pressionado |
| `esc-on-surface-variant` | `esc-surface-container` | 4,5 (7 informativo) | texto da `EscVazio` e descrição na faixa da `junto` |
| `esc-outline` | `esc-surface` | 3 | borda da faixa da `junto` em `prefers-contrast: more` |
| `esc-faixa-acesa` | `esc-faixa-apagada` | 3 | trecho aberto contra o trilho |
| `esc-faixa-acesa` | `esc-surface` | 3 | trecho aberto contra a página |
| `esc-anel-claro` | `esc-anel-escuro` | 9 | anel de foco em duas cores [88] |
| `esc-anel-claro` | `esc-surface` | 3 | anel na página |
| `esc-anel-claro` | `esc-surface-high` | 3 | anel em volta do "Adicionar" no card e na linha "no seu pedido" |
| `esc-anel-claro` | `esc-surface-container` | 3 | anel em volta do "Adicionar" na faixa da `junto` |
| `esc-anel-claro` | `esc-surface-lowest` | 3 | anel no rodapé |
| `esc-anel-escuro` | `esc-primary` | 3 | faixa escura sobre o botão preenchido |

Conta de conferência, com os valores de hoje: `#ffb59d` contra `#0e0e0e` dá cerca de 11:1; `#d7c68d` contra `#353535`, cerca de 7:1, contra `#2a2a2a`, cerca de 8,4:1, e contra `#1f1f1f`, cerca de 9,7:1; `#c6c6c6` contra `#1f1f1f`, cerca de 9,6:1. O construtor mede de novo com `contraste.js`.

### Lógica necessária

| Nome | Onde | O que faz | Outro estilo poderia usar? |
|---|---|---|---|
| `useNoPedido()` | `escuro/useNoPedido.js` | Um `Map` computado de `${category}:${productId}` para a soma de `quantity`, a partir de `useCartStore().items`, e `quantidadeNoPedido(produto)`. Só lê: não calcula preço nem chama `addItem` | Sim (qualquer estilo que queira marcar o que já está no pedido) |
| `lerTurno(texto)` | `escuro/turno.js`, puro (o Node lê) | Lê `HORARIO` com `/(\d{1,2})h\D+?(\d{1,2})h/`. Devolve `{ abre, fecha, rotuloAbre, rotuloFecha }` (os rótulos são os recortes do próprio texto, como "13h" e "01h") ou `null` se não casar, se a hora passar de 23 ou se `abre === fecha` | Sim (qualquer estilo que mostre o horário) |
| `useRolada()` | `escuro/useRolada.js` | `rolada` (`ref`) igual a `scrollY > 0`, com escuta `passive` e `requestAnimationFrame`, limpa no `onBeforeUnmount` | Sim |
| Listas do cardápio | nas seções | `productsStore.foods`, `drinks` e `desserts`, mais `CATEGORIAS` para os rótulos. Se a fase 3 criar um `useCardapio` compartilhado, as seções passam a usá-lo | Sim (é o `useCardapio` que o plano prevê) |

**Testes** (`__tests__/`):

- `HomeEscuro.test.js`: um `h1`, os botões "Adicionar <nome>" de `foods`, `drinks` e `desserts`, e montagem com o cardápio vazio (as `EscVazio` aparecem e as quatro `data-secao` continuam);
- `turno.test.js`: o `HORARIO` real, um texto que não casa (`null`), um horário que não passa da meia-noite e horas inválidas;
- `useNoPedido.test.js`: soma de linhas do mesmo produto, categorias diferentes com o mesmo `id` e carrinho vazio.

### Dependências novas

Nenhuma. A máscara é CSS (`mask-image`, `mask-composite`), a faixa é grade CSS e os ícones novos vêm do pacote de ícones que o projeto já tem.

---

## 8. Movimento (resumo)

- Nada se move sozinho: sem entrada ao carregar, sem faixa corrida, sem carrossel e sem paralaxe [90][92][H1].
- Só `opacity` e `transform`. A única transformação é o deslize vertical das faces do "Adicionar", dentro de `motion-ok`. A faixa e os rótulos não usam `transform` nem para centralizar.
- Durações: `--dur-fast` nas camadas de estado, na linha da barra, no selo e na marca; `--dur-base` nas faces do "Adicionar" e no "no seu pedido", só dentro de `motion-ok`.
- Com movimento reduzido, tudo vira opacidade em `--dur-fast`. O "Adicionado" continua visível pelo mesmo tempo, porque o tempo vem do `useCartaoProduto` e não da animação.
- Cor de fundo e borda não animam. O web.dev anima `color` e `background-color` na troca de tema [50], o que a regra do projeto não permite.

## 9. Acessibilidade (resumo)

- **Landmarks:** `header` (com a nav "Principal"), `main` (da moldura, com o skip link), quatro `section` nomeadas e `footer` (com a nav "Rodapé").
- **Títulos:** um `h1` (palco); `h2` nas seções e no rodapé; `h3` nos lanches e nos grupos; `h4` nos acompanhamentos. Sem salto.
- **Texto sobre foto:** não há. O título do palco fica sobre um bloco sólido, numa faixa em que a máscara já está em alfa 0. A marca "No seu pedido" tem fundo sólido próprio. Na `junto`, a foto fica na própria coluna, ao lado do texto, e a marca compacta vai depois do preço.
- **Contraste:**
  - texto principal em on-surface (N90), sem branco puro [48];
  - texto pequeno com mais de 7:1 sobre N6, N12, N17 e N22, a meta da Apple [47];
  - pesos de 450 para cima no escuro [46][93].
- **Foco:** anel em duas cores com 9:1 entre elas [88]. `scroll-margin-top` livra o foco da barra fixa.
- **Alvos:** todos com 44 px ou mais; "Ver cardápio" com 52 px; links de contato e do rodapé com `min-height: var(--target-min)`.
- **Links:** cor própria (primary) e sublinhado, nunca só a cor [85][94]. Os externos avisam a nova aba [H34].
- **Cores forçadas:** contornos e bordas viram cor do sistema; a faixa das horas usa `CanvasText`; a faixa da `junto` ganha borda em cima e embaixo; o anel fica pela `outline` [89].
- **Mais contraste:** contornos mais grossos, a máscara estreita no palco, a faixa da `junto` com borda e as fotos das linhas sem máscara [47][81].
- **Testes de widget (`escuro.json`):**
  - "primeiro lanche no seu pedido" (hoje, o Cheese Bacon): adiciona pelo modal real e mede o card elevado, a marca e a face "Adicionado";
  - "primeira bebida no seu pedido" (hoje, o Copo de Refrigerante): adiciona pelo modal real e mede a linha que sobe a N17 na faixa, a borda tertiary, a marca compacta e a face "Adicionado" do botão tonal;
  - "barra rolada": foca o e-mail no rodapé, e a página rola.

## 10. Arquivos para o construtor

```
src/direcoes/estilos/escuro/
  HomeEscuro.vue              só composição (≤ 100 linhas): import "./_tokens.scss", useEstiloAtivo("escuro", { esquema: "dark" }),
                              MolduraDirecao, EscBarra, as 4 seções (palco, vitrine, junto, turno) e EscRodape
  _tokens.scss                os aprovados + os 11 tokens novos da seção 7
  ficha.js                    sem mudança
  contraste.js                + os pares da seção 7
  textos.js                   TEXTOS (provisórios: palcoAlt, juntoTitulo, noPedido, meioDia, meiaNoite, contatoTitulo,
                              rodapeNav) e REAIS (Adicionar, Adicionado, Nada nesta categoria por enquanto,
                              Dê uma olhada nas outras categorias., com a origem em comentário)
  turno.js · useNoPedido.js · useRolada.js
  secoes/EscSecaoPalco.vue · EscSecaoVitrine.vue · EscSecaoJunto.vue · EscSecaoTurno.vue
  componentes/EscBarra.vue · EscRodape.vue · EscBotao.vue · EscBotaoAdicionar.vue · EscFoto.vue · EscCartao.vue ·
              EscLinha.vue · EscMarcaPedido.vue · EscFaixaHoras.vue · EscLinkContato.vue · EscVazio.vue
  scss/_base.scss             mixins camada-de-estado, anel e link-texto (só var(--…))
  scss/_<nome>.scss           uma parcial por componente e por seção, com @use no próprio <style scoped>
  __tests__/HomeEscuro.test.js · turno.test.js · useNoPedido.test.js
```

- O `_home.scss` da v1 sai, e a `HomeEscuro.vue` deixa de importar `vue3-carousel`.
- A `.moldura` precisa do layout em coluna com `min-height: 100dvh`, como na v1, no `<style scoped>` da Home.

## 11. Referências usadas

| Ref. | Tipo | Padrão abstraído | Publicado ou conceito | Onde entra |
|---|---|---|---|---|
| [4] `ColorDarkTokens.kt` | autor do estilo | Superfícies N4 a N22, primary 80 e on-primary 20, papéis tertiary e secondary-container, on-surface N90 | publicado (sistema) | Degraus, papéis por função, "no seu pedido" |
| [13] Dark.md (Material) | autor do estilo | Cinza-escuro no lugar de preto; superfícies tonais no lugar da sobreposição | publicado | Base N6, elevação por tom |
| [46] NN/g, 2023 | pesquisa | Armadilhas do escuro: imagem com fundo claro, sombra que parece brilho, card e divisor fino que somem, fonte fina, cor saturada | — | Máscara que apaga a tábua, filtros das fotos, contorno, pesos, linhas da `junto` sem divisória |
| [47] Apple HIG, Dark Mode | autor do estilo | Base que recua e elevado que avança; escurecer imagem de fundo claro; 7:1 como meta | publicado | Degraus, filtros, pares informativos |
| [48] Codelab Material Dark | autor do estilo | Tons claros da primária; branco puro "vibra" | publicado | Papéis em tom 80, texto em N90 |
| [50] web.dev, prefers-color-scheme | referência técnica | Filtro nas fotos só no escuro; transição de cor na troca de tema (recusada aqui) | — | `--esc-foto-filtro*`; movimento |
| [63] Compose, Cards | documentação oficial | Card outlined com borda de 1 dp | publicado | `EscCartao` |
| [81] Apple HIG, Color | autor do estilo | Fundos primário, secundário e terciário; cor reservada para ênfase, no fundo da ação, sem repetir a cor com outro significado | publicado | primary age, secondary age com menos ênfase, tertiary marca o pedido; a faixa da `junto` como fundo secundário |
| [82] `StateTokens.kt` | autor do estilo | Camadas de 0,08 e 0,1 | publicado | Camada de estado e hover dos botões |
| [83] Google Design, Into the Dark | autor do estilo | Gradações de cinza sugerem superfície elevada | publicado (apps) | Card que sobe no pedido |
| [85] web.dev, color-scheme | referência técnica | O azul padrão de link tem 2,23:1 sobre preto | — | Links em primary, sublinhados |
| [87] Atlassian, Elevation | documentação oficial | Mais alto é mais claro; sunken, default, raised e overlay; card plano com borda; borda no cabeçalho com conteúdo rolado | publicado (sistema em uso) | Barra rolada, rodapé afundado, faixa elevada da `junto`, "no seu pedido" |
| [88] W3C C40 | referência técnica | Anel de foco em duas cores, com 9:1 entre elas | — | Mixin `anel` |
| [89] MDN, forced-colors | referência técnica | `box-shadow` vira `none`; a `outline` fica | — | Reservas de cores forçadas |
| [90] W3C 2.2.2 | referência técnica | Movimento automático precisa de pausa | — | Faixa corrida fora |
| [91] web.dev, LCP | referência técnica | `img` conta para o LCP | — | Foto do palco `eager` e `fetchpriority`, sem fade |
| [92] NN/g, Carousels | pesquisa | Cinco quadros ou menos, sem avanço automático | — | Carrossel fora |
| [93] Smashing; [94] BOIA | praticante | Halation; evitar preto e branco puros; pesos maiores | — | Pesos, N90 e N6 |
| [99] allta.ie; [100] One Page Love | galeria | Fotos de comida grandes sobre base escura | publicado | Palco (foto como protagonista) |
| [102] Bite Cult; [104] Tomahawk | galeria | Destaques com preço; rodapé com contato e navegação; no [104], um bloco Bar & Wine à parte do cardápio | conceito | Vitrine, rodapé, origem da `junto` |
| [105] Velvet Hour | galeria | Fotos de comida em luz baixa | conceito | Palco |
| [106] STÄCK | galeria | Imagens de ponta a ponta, "cinematográficas" | conceito | Palco |
| G1 Sear Smoke (dribbble.com/shots/27904965) | galeria | O produto como ponto de luz sobre o quase preto | conceito | Palco (sem o holofote pintado) |
| G2 Crave (dribbble.com/shots/26930492) | galeria | Cards um degrau mais claros que a base | conceito | `EscCartao` em N17 |
| G4 King River Wagyu (awwwards.com/sites/king-river-wagyu) | galeria | Fotografia em luz baixa fazendo o papel do fundo | publicado | Palco |
| G7 ossa (httpster.net/website/ossa) | galeria | Preto como palco do produto, sem cenário | publicado | Palco |
| G8 gad-ambre (smirnov-artur.github.io/cases/gad-ambre) | galeria | Profundidade pela luz, sem sombra de interface | conceito | Regra "nada faz sombra" |
| [H1] [H2] [H3] [H4] [H5] | pesquisa | Identidade e tarefa no topo; atenção acima da dobra; falso fim; imagem que não esconde o conteúdo; contraste de texto sobre foto | — | Palco |
| [H6] [H7] [H9] [H10] | pesquisa | Problemas de carrossel | — | Vitrine em grade |
| [H14] [H15] [H17] [H35] | pesquisa | Links visíveis; cabeçalho fixo baixo e opaco; carrinho no canto | — | `EscBarra` |
| [H20] [H21] [H22] | pesquisa | Mínimo da listagem; variedade na Home | — | Vitrine e junto |
| [H23] [H24] | pesquisa | Orientação no pedido em sites de delivery | — | "No seu pedido" |
| [H25] [H26] | pesquisa | Credibilidade: nada de dado sem fonte nem link que não leva aonde promete | — | Sem "Mais pedidos" e sem redes |
| [H29] [H30] [H31] [H32] [H33] [H34] | pesquisa e documentação | Horário e endereço com mapa; contato no rodapé; horário que passa da meia-noite; Maps, `wa.me`, `mailto:` e aviso de nova aba | — | Turno e rodapé |

Recorrência:

- **"o escuro como palco da foto":** cinco exemplos de galeria independentes (G1, G2, G4, G7 e G8, dois deles publicados) e o padrão 3 do dossiê;
- **"mais alto é mais claro":** três sistemas publicados ([87], [83] e [47]). É o que sustenta os degraus da página: a faixa da `junto`, o rodapé afundado e o "no seu pedido".

## 12. Decidido e fora

- **Faixa corrida de fatos (padrão 4):** fora, porque é autoplay [90][H28].
- **Seletor Sistema, Claro e Escuro (padrão 8):** fora [47][84]. A ficha o reserva para a fase seguinte.
- **Prova social, história, galeria do salão e reserva:** o inventário não tem os dados.
- **Adicionais na Home:** ficam no modal real. A lista não entra, e a Home ganha espaço (o "acessório a menos").
- **Redes sociais:** fora enquanto os links forem genéricos [H25][H26].
- **"Aberto agora":** fora. Não há feriado nem exceção, e o horário passa da meia-noite [H31]. A faixa não marca a hora atual.
- **Foto `banner-burger-black` no palco:** fora. A rubrica do crítico só aceita no hero o recorte `banner-burger-bg` ou foto de produto, e o recorte já é a imagem da v1.
- **Hover nos cards e nas linhas:** fora. O card e a linha só mudam de degrau quando o produto entra no pedido.
- **Card nos acompanhamentos:** fora (revisão do juiz, seção 13). A página tem um tipo de card só, o dos lanches.

## 13. Revisão do juiz

O juiz de distinção apontou uma repetição, de gravidade importante, na seção `junto`.

**O achado:** os cards compactos dos acompanhamentos tinham a forma da `bandeja` do 3D: foto 1:1 em cima, nome, descrição, preço e "Adicionar" largo no pé. Somados aos 7 cards da `vitrine`, faziam a página depois do palco ser só grade de cards, o padrão genérico "tudo em card".

**O que mudou:**

- **`junto` sem card (4.3).** A seção virou uma faixa N12 de ponta a ponta da janela, sem raio, borda nem sombra. Ela mesma é o degrau de luz, e não as caixas [87][81]. As bebidas e a sobremesa ficam em linhas direto na faixa, separadas só pelo espaço, porque no escuro o divisor fino some [46].
- **A linha:**
  - foto 4:3 pequena (7 rem a partir de `lg`, 6 rem abaixo), atenuada pelo filtro baixo e apagada na faixa pelo lado do texto (`--esc-linha-mascara`), a regra do `palco` em escala baixa;
  - nome, descrição numa linha (hoje, o volume) e preço;
  - "Adicionar" tonal, no tamanho do texto.
  A descrição ficou, além do que o juiz listou, porque traz um dado real que o nome não traz, o volume (500ml ou 350ml), e cabe numa linha.
- **"No seu pedido":** a linha sobe um degrau, de N12 para N17, com a borda tertiary de 2 px. A marca compacta aparece depois do preço, fora da foto. É a mesma regra do card, que sobe de N17 para N22.
- **A página como escala (seção 1):** de cima para baixo, base N6 (`palco` e `vitrine`), faixa N12 (`junto`), base N6 (`turno`) e rodapé N4. Depois do palco, a página alterna card, faixa, texto e rodapé, e não é mais grade de cards.
- **Componentes (seção 6), agora 11, dentro do teto de 12:**
  - entra `EscLinha`;
  - o `EscCartao` perde a variante `compacto` e as props `variante` e `nivelTitulo`, e fica só como o card dos lanches;
  - `EscFoto` ganha `dissolvida`;
  - `EscVazio` ganha `plano`, para o estado vazio não desenhar um painel N12 sobre a faixa N12;
  - `largo` do `EscBotaoAdicionar` passa a valer só abaixo de `sm`, no card da `vitrine`, que era o único uso que sobrou.
- **Tokens e pares (seção 7):**
  - token novo `--esc-linha-mascara` (agora são 11);
  - pares novos: texto em on-surface sobre N12, borda tertiary contra N17 e contra N12, anel claro sobre N12 e o contorno da faixa em mais contraste;
  - acrescentados dois "onde" a pares que já existiam.
- **Wireframes (seção 3):** a `junto` redesenhada em 1440 e em 390, e o texto de 1024 refeito.
- **`escuro.json`:** novo estado "primeira bebida no seu pedido" (linha em N17, borda tertiary e marca compacta), para o axe medir a linha elevada. Ele usa o seletor estável `[data-grupo='drinks']`, que a seção ganhou. As `secoes`, a ordem e o `h1MaxLinhas` não mudam.

**Por que não repete os outros seis** (conferido nos desenhos de hoje):

- **3D, `bandeja`:** itens em pé numa superfície de argila arredondada, com a foto 4:3 flutuando com sombra em cima e o botão no pé. Aqui não há superfície com raio nem sombra, e a foto fica ao lado do texto, apagando-se na faixa.
- **Material 3, `bebidas-e-sobremesas`:** lista segmentada num contêiner arredondado, na coluna de 7 das 12, com cada item num bloco próprio, vão de 2 px e miniatura de 56 px em forma (círculo e flor). Aqui a faixa é a página de ponta a ponta, sem raio. As linhas não têm fundo próprio nem vão desenhado, e a foto é retangular, atenuada e apagada.
- **Flat, `FlLinhaProduto`:** linhas num painel de abas (o pivot), com foto quadrada nítida, descrição em 2 linhas, e preço e botão embaixo. Aqui não há abas, todos os itens ficam à vista, e a foto se apaga na faixa.
- **Minimalismo:** linhas de texto com pontilhado até o preço e a foto escondida atrás de "Ver foto". Aqui não há pontilhado, e a foto está sempre à vista.
- **Neumorfismo, `acompanhamentos`:** poços redondos prensados no kraft, com os itens centrados em colunas. Aqui nada é redondo nem em relevo.
- **Esqueumorfismo, `expositor`:** o expositor refrigerado, com moldura de inox, prateleira e etiqueta de papel. Aqui não há objeto, só o degrau tonal.

**O que não mudou:**

- a identidade (ficha, tokens aprovados, nada em `desvios`) e o contrato;
- as quatro seções e a ordem;
- o conteúdo: só `products.json`, `dados.js` e textos que o app já tem, sem texto provisório novo.

Na leitura, "faixa" é a faixa N12 da `junto`. A do `turno` é a `EscFaixaHoras`, a faixa das 24 horas.
