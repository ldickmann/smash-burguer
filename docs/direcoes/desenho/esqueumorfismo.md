# Desenho da Home: Esqueumorfismo, rodada 2 ("O passe da cozinha")

Desenho para o construtor da Home nova de `#/direcoes/esqueumorfismo`. Escrito em 21/11/2026 a partir do pacote de desenho, das regras comuns, do inventário, da ficha e dos tokens aprovados, da Home v1 (código e capturas em 1440, 1024 e 390), do dossiê da rodada 2 (`docs/direcoes/pesquisa/esqueumorfismo.md`, fontes [E1] a [E57]), da seção do estilo na rodada 1 (`docs/direcoes/PESQUISA.md`), das galerias do Chrome (exemplos G1 a G8 deste documento, numerados como na tabela da galeria) e do transversal de delivery (`docs/direcoes/pesquisa/home-delivery.md`, fontes [H1] a [H45]).

Esquema `light`. Prefixo dos componentes `Esq`, das classes `esq-`, dos tokens novos `--esq-`.

Resumo: 4 seções (`chapa`, `comandas`, `expositor` e `cupom`), 2 delas novas, mais a coifa e o rodapé. São 9 componentes próprios e nenhuma dependência nova. A ousadia fica num lugar só: **a impressora térmica que imprime o carrinho de verdade**, presa ao lado do balcão em telas largas.

---

## 1. Tese

**Mantida, com um ajuste de composição.** A identidade aprovada continua: os materiais do caminho do pedido (inox, chapa, papel térmico, ketchup e LED), a Courier Prime no que é impresso e a Bebas Neue no que é estampado ou gravado. A frase da ficha passa a ser esta (sugestão para o `tese` do `ficha.js`, que o construtor ajusta):

> O esqueumorfismo traz objetos do mundo real para a interface [E1]. Aqui a Home vira o caminho do pedido numa cozinha de smash: a coifa de inox no topo, o lanche na chapa, as comandas presas no trilho, o expositor de bebidas e a impressora que imprime o seu pedido. Cada metáfora tem função: a comanda é o item que se pede, e o cupom é o carrinho.

**O ajuste e a fonte:**

- Na v1, o cupom era o rodapé, papel serrilhado com a marca e os contatos. Isso é o uso decorativo do recibo, como no GRIDDLE, em que os itens do recibo são frases de marca e o total é figurativo [E40].
- O dossiê só sustenta o recibo funcional, porque a metáfora útil mapeia a função, não a aparência [E1][E35]. Por isso o cupom passa a espelhar o carrinho real, como o resumo do pedido do QR MenuSlip [E41] e o recibo ao lado dos passos do Marcy's [E43]. O padrão é recorrente, com 4 exemplos (padrão 1 do dossiê).
- A comanda segue o ticket de cozinha publicado: itens e modificadores [E31][E33] (padrão 3, recorrente, com 3 produtos reais). Na v1, ela mostrava a descrição; agora mostra os ingredientes como as linhas do ticket.

### O que mudou da rodada 1

| # | v1 | Rodada 2 | Por quê |
|---|---|---|---|
| 1 | Cupom de papel como rodapé, com marca e contatos | Cupom vivo: a impressora imprime o carrinho (linhas, adicionais, retiradas e subtotal) | Recibo só funcional [E1][E35]; padrão 1 [E41][E43][E46] |
| 2 | Carrossel "Mais pedidos" com setas cromadas e paginação em LED | Trilho estático "Hambúrgueres", com todas as comandas à vista, sem setas nem paginação | Carrossel desaconselhado [H6][H8][H9]; "Mais pedidos" afirma uma popularidade sem dado [H25][H26] |
| 3 | Comanda com a descrição | Comanda com os ingredientes como linhas do ticket (itens do KDS) | Padrão 3 [E31][E33] |
| 4 | Títulos de seção em placas de metal com rebites, iguais à marca, que é um link | Títulos gravados na superfície, e só a marca fica em placa | Não dar cara de clicável ao que não se clica; elementos semelhantes, tratamento igual [E15] |
| 5 | Hero: título, etiqueta com clipe, botão e lanche em duas colunas | Hero: a chapa com o título e o lanche; o texto e o botão descem para a frente de inox da chapa, com a calha de gordura; em 390, a seção seguinte já aparece | Falso fim e dobra [H2][H3][H4] |
| 6 | Menu hambúrguer no celular | Os três links visíveis numa linha fixa, junto do carrinho | Com 4 links ou menos, mostrar [H14]; cabeçalho fixo, baixo e opaco [H17] |
| 7 | (não havia) | `expositor`: bebidas e sobremesa, com "Adicionar" | Variedade de tipos na Home [H21][H22]; o `/menu` abre sempre em Hambúrgueres |
| 8 | Redes sociais no cupom | Sem redes (os links de `REDES` são genéricos); o rodapé vira a placa de horário parafusada | Link que não leva aonde promete mina a confiança [H25][H26] |
| 9 | Hover endireitava a comanda | Sem hover em card; só os botões respondem | Lista genérica da skill (hover em todo card) |

---

## 2. Processo: plano, revisão e desenho final

### Plano (primeira passada)

- **Cor:** inox `#c5cad0`, chapa `#2a2624`, papel térmico `#fbfaf6`, tinta `#26221e`, ketchup `#b3261e` e LED `#f0a80f` (todos já são tokens aprovados).
- **Tipo:** Courier Prime (o que é impresso: comanda, etiqueta, fita, cupom) e Bebas Neue (o que é estampado ou gravado: título, títulos de seção, botões).
- **Layout:** hero de chapa; carrossel de comandas; geladeira de porta de vidro; faixa rolante com os nomes dos lanches; adesivos e fita colados nos títulos; rodapé em cupom.
- **Princípios:** cada objeto com função; texto nunca sobre foto; relevo só no que se aperta.

### Revisão contra o pedido (o que saiu genérico ou repetido e foi trocado)

1. **Carrossel de comandas:** repetia a v1, e o carrossel tem problemas documentados [H6][H9]. Virou um trilho estático, com as comandas penduradas em fileiras.
2. **Faixa rolante com os nomes:** é autoplay (proibido pelo contrato), pede pausa [E25] e é a moda de qualquer template [E39][E43]. Saiu.
3. **Adesivos, fita washi e selos:** é o realismo decorativo que a NN/g e Nielsen criticam [E1][E35] (padrão 4). Saíram. A fita ficou só onde carregava dado, na etiqueta da cuba com o nome e o preço, e saiu com a bancada na revisão do juiz (seção 16).
4. **Geladeira de porta de vidro com puxador:** o vidro é translúcido e perde contraste [E6][E26], o puxador promete um gesto que não existe [E15], e abrir a porta cobra a "taxa" da metáfora [E1][E35]. Virou um **expositor aberto**: moldura de inox, interior escuro e prateleiras, sem porta, vidro nem puxador.
5. **Cubas abertas com a comida desenhada:** o desenho de comida em CSS é o caminho do kitsch (risco da ficha). E cuba vazia parece "acabou". Virou **cuba tampada com etiqueta de fita**, como se guarda a mise en place numa cozinha. Depois, na revisão do juiz, a bancada inteira saiu, porque repetia os adicionais com preço de outros quatro estilos (seção 16).
6. **Luz que segue o cursor na chapa** (padrão 6): não é recorrente (2 exemplos) e gastaria a ousadia no hero. Saiu. A chapa fica parada.
7. **Rótulo "CUPOM NÃO FISCAL" em caixa alta espaçada:** é o rótulo de enfeite da lista genérica. Saiu. O papel abre com a marca e o título real "Seu carrinho".
8. **Total de cada linha do cupom:** as seções não calculam preço (regras comuns). A linha mostra a quantidade e o preço unitário ("2× CHEESE BACON", "R$ 25,99 cada"), e só o subtotal, que vem do getter da store.
9. **Placas nos títulos:** a placa também é a marca, que é um link [E15]. Os títulos passam a ser gravados na superfície.

### Desenho final

O plano revisado é o deste documento. A ousadia fica na impressora, e o resto obedece à gramática: um material por superfície, relevo só no que se aperta, texto sempre sobre área sólida e movimento só em resposta a um gesto.

---

## 3. Composição

Ordem do DOM, que é a mesma da leitura:

1. **Coifa** (`EsqCoifa`, slot `#topo`): o `<header>` com a placa da marca, a `nav` "Principal" e o carrinho com o contador de tambor.
2. **`chapa`** (hero): a chapa curada com o `h1` estampado e o lanche recortado, mais a frente de inox com o texto e o botão "Ver cardápio".
3. **Balcão** (`div.esq-balcao`, sem landmark): fundo de inox claro escovado, com uma grade de duas colunas a partir de `lg`.
   - Coluna da linha (`div.esq-balcao__linha`):
     1. **`comandas`**: os lanches pendurados no trilho;
     2. **`expositor`**: as bebidas e a sobremesa.
   - Coluna do passe: **`cupom`** (a ousadia), a impressora com o carrinho impresso, fixa ao rolar em `lg` ou mais.
4. **Rodapé** (`EsqRodape`, slot `#rodape`): a placa de horário parafusada na parede de chapa.
5. Assinatura de autoria (da `MolduraDirecao`).

Abaixo de `lg`, o balcão tem uma coluna só, e o `cupom` vem depois do `expositor`.

### Wireframe em 1440 (contêiner interno de 1136 px; coluna do passe com 320 px e vão de 48 px; coluna da linha com 768 px)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ [• SMASH BURGER •]                              INÍCIO  CARDÁPIO  ENTRAR  [🛒 ▌0▐]    │ coifa, 72 px, fixa
╞══════════════════════════════════════════════════════════════════════════════════════╡
│ chapa curada (têmpera, marcas de espátula, brilho de gordura)                         │
│                                                              ░░░ calor ░░░            │
│   SMASH NA CHAPA,                                          ╭──────────────╮           │ h1 em 2 linhas,
│   ENTREGUE QUENTE                                          │  hambúrguer  │           │ com o lanche
│                                                            │ recortado,   │           │ de 440 px
│                                                            │ 440 px       │           │
│                                                            ╰──────────────╯           │
│                                                          ▁▁▁ sombra de contato ▁▁▁    │
│▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ calha de gordura ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔│
│ frente de inox  Hambúrgueres artesanais prensados na hora.            (VER CARDÁPIO) │
│                 De terça a sexta, das 13h à 01h.                                      │
╞══════════════════════════════════════════════════════════════════════════════════════╡ ← dobra (900) mais ou menos aqui
│ balcão de inox claro                                                                  │
│  HAMBÚRGUERES (gravado)                                 │  ┌/\/\/\/\/\/\/\/\/\/\┐    │
│                                                         │  │   SMASH BURGER     │    │ cupom: o papel
│                                                         │  │ SEU CARRINHO ESTÁ  │    │ sai da fenda
│                                                         │  │ VAZIO              │    │ para cima
│                                                         │  │ Escolha um burger  │    │
│  ══════════════════════ trilho ═══════════════════════  │  │ no cardápio para   │    │
│   ┌──[▭]──────┐  ┌──[▭]──────┐  ┌──[▭]──────┐            │  │ começar.           │    │
│   │CHEESE     │  │SMASH      │  │VEGGIE     │            │┌─┴────────────────────┴─┐  │
│   │BACON      │  │BURGER     │  │BURGER     │            ││▬▬▬▬▬▬▬▬ fenda ▬▬▬▬▬▬▬▬▬ │  │
│   │┌─────────┐│  │┌─────────┐│  │┌─────────┐│            ││ ○ LED   (VER CARDÁPIO) │  │
│   ││  foto   ││  ││  foto   ││  ││  foto   ││            │└────────────────────────┘  │
│   │└─────────┘│  │└─────────┘│  │└─────────┘│            │   (fixo ao rolar)          │
│   │- Pão de … │  │- Pão de … │  │- Pão de … │            │                            │
│   │- Hambúrg… │  │- …        │  │- …        │            │                            │
│   │R$ 25,99   │  │R$ 22,50   │  │R$ 24,90   │            │                            │
│   │(ADICIONAR)│  │(ADICIONAR)│  │(ADICIONAR)│            │                            │
│   └/\/\/\/\/\/┘  └/\/\/\/\/\/┘  └/\/\/\/\/\/┘            │                            │
│  ═══════════════════════════════════════════════════   │                            │
│   (fileira 2: X-Salada, Chicken, Picanha)               │                            │
│  ═══════════ (fileira 3: Batata Frita)                  │                            │
│                                                         │                            │
│  BEBIDAS E SOBREMESAS (gravado)                         │                            │
│  ┌ expositor: moldura de inox, interior escuro ───────┐ │                            │
│  │ ░░░░░░░░░░░░░░░ luz fria no alto ░░░░░░░░░░░░░░░░░ │ │                            │
│  │ BEBIDAS                               ║ SOBREMESAS  │ │                            │
│  │ ┌foto┐      ┌foto┐      ┌foto┐       ║ ┌foto┐      │ │                            │
│  │ └────┘      └────┘      └────┘       ║ └────┘      │ │                            │
│  │ ════════ prateleira ═════════════════╬══════════   │ │                            │
│  │ ┌etiqueta┐  ┌etiqueta┐  ┌etiqueta┐   ║ ┌etiqueta┐  │ │                            │
│  │ │COPO DE │  │COCA    │  │SUCO DE │   ║ │SORVETE │  │ │                            │
│  │ │R$ 5,99 │  │R$ 4,99 │  │R$ 7,99 │   ║ │R$ 12,90│  │ │                            │
│  │ │(ADIC.) │  │(ADIC.) │  │(ADIC.) │   ║ │7 adic. │  │ │                            │
│  │ └────────┘  └────────┘  └────────┘   ║ │(ADIC.) │  │ │                            │
│  └─────────────────────────────────────────────────────┘ │                            │
╞══════════════════════════════════════════════════════════════════════════════════════╡
│ parede de chapa       ┌• placa de inox escovado, 4 rebites ─────────────────────•┐    │
│                       │ SMASH BURGER         HORÁRIO            ENDEREÇO          │    │
│                       │ Sabor irresistível…  Terça a sexta,     Rua Beira da …    │    │
│                       │                      das 13h à 01h      WhatsApp · …      │    │
│                       │                                         contato@…         │    │
│                       └•─────────────────────────────────────────────────────────•┘    │
│                    © 2026 Smash Burger · Sabiá Operações — Desenvolvido por …         │
├──────────────────────────────────────────────────────────────────────────────────────┤
│ assinatura de autoria (MolduraDirecao)                                                │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

### Wireframe em 390 (contêiner interno de 358 px)

```
┌────────────────────────────────┐
│ [• SMASH BURGER •]             │ linha da marca, 56 px, rola junto
│ INÍCIO  CARDÁPIO  ENTRAR [🛒▌0▐]│ linha da nav e do carrinho, 48 px, fixa
╞════════════════════════════════╡
│ SMASH NA CHAPA,                │ h1 de 52 px, em 2 ou 3 linhas
│ ENTREGUE QUENTE                │
│         ░░ calor ░░            │
│      ╭──────────────╮          │
│      │ hambúrguer,  │          │ 240 px, centralizado
│      │ 240 px       │          │
│      ╰──────────────╯          │
│▔▔▔▔▔▔▔▔▔▔ calha ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔│
│ Hambúrgueres artesanais        │ frente de inox
│ prensados na hora. De terça a  │
│ sexta, das 13h à 01h.          │
│ (VER CARDÁPIO)                 │
╞════════════════════════════════╡ ← dobra (844): o título das comandas e o trilho já aparecem
│ HAMBÚRGUERES                   │
│════════════ trilho ════════════│
│ ┌────────[▭]─────────────────┐ │
│ │CHEESE BACON                │ │ comanda deitada
│ │┌──────┐ - Pão de hambúrguer│ │
│ ││ foto │ - Hambúrguer       │ │
│ ││ 96²  │   artesanal        │ │
│ │└──────┘ - Queijo  - …      │ │
│ │R$ 25,99        (ADICIONAR) │ │
│ └/\/\/\/\/\/\/\/\/\/\/\/\/\/\┘ │
│════════════════════════════════│
│  … mais 6 comandas, uma por    │
│  trilho                        │
│ BEBIDAS E SOBREMESAS           │
│ ┌ expositor ─────────────────┐ │
│ │ BEBIDAS                    │ │
│ │┌foto┐┌etiqueta───────────┐ │ │ item deitado: foto de 88 px
│ ││ 88 ││COPO DE REFRIGERANTE│ │ │ e a etiqueta ao lado
│ │└────┘│R$ 5,99 (ADICIONAR)│ │ │
│ │══════└───────────────────┘ │ │
│ │ … (Coca, Suco)             │ │
│ │ SOBREMESAS                 │ │
│ │ … (Sorvete, 7 adicionais)  │ │
│ └────────────────────────────┘ │
│   ┌/\/\/\/\/\/\/\/\/\/\/\/\┐   │ cupom: largura máxima de 26 rem,
│   │     SMASH BURGER        │   │ centralizado
│   │ SEU CARRINHO ESTÁ VAZIO │   │
│   │ Escolha um burger no    │   │
│   │ cardápio para começar.  │   │
│  ┌┴─────────────────────────┴┐  │
│  │▬▬▬▬▬▬▬▬ fenda ▬▬▬▬▬▬▬▬▬▬▬ │  │
│  │ ○        (VER CARDÁPIO)   │  │
│  └───────────────────────────┘  │
╞════════════════════════════════╡
│ placa de horário, em 1 coluna  │
│ © 2026 …                       │
└────────────────────────────────┘
```

### Em 1024 (contêiner interno de 960 px)

- **Coifa:** uma linha de 72 px, fixa.
- **Chapa:** duas colunas, com o `h1` à esquerda e o lanche de 380 px à direita; a frente de inox em linha.
- **Balcão:** duas colunas, a da linha com cerca de 628 px e a do passe com 300 px, separadas por 32 px; o cupom fica fixo ao rolar.
- **Comandas:** 2 por fileira, em pé (cerca de 302 px cada).
- **Expositor:** uma prateleira por categoria, empilhadas: Bebidas com 3 itens em pé e Sobremesas com 1 à esquerda.

### Grade e alinhamento

- Texto alinhado à esquerda em toda a página. São exceções o papel do cupom (a marca e o título centralizados, como num cupom térmico) e a placa do rodapé em 390.
- A grade é a do `.container` do projeto (`--container-max` de 75 rem e `--gutter`).

---

## 4. Navegação: a coifa (`EsqCoifa`, slot `#topo`)

Não é seção, então não leva `data-secao`.

- **Raiz:** `<header class="esq-coifa" ref="cabecalho">`, em grade.
  - **Abaixo de `md`:** as áreas são `"marca marca" / "nav carrinho"`. A coifa é `position: sticky` com `top: calc(-1 * var(--esq-coifa-marca))`: a linha da marca sai ao rolar, e a linha da nav com o carrinho fica presa no topo, com 48 px. Assim o carrinho e os links continuam à mão sem menu escondido [H14] e com o cabeçalho fixo baixo [H17].
  - **A partir de `md`:** `"marca nav carrinho"` numa linha de `--esq-altura-coifa` (4,5 rem), com `top: 0`.
- **Marca:** `RouterLink` para `/direcoes/esqueumorfismo`, na placa de metal com dois rebites e o texto gravado (`MARCA`). A placa é o único elemento com esse tratamento, porque é clicável [E15].
- **Nav:** `<nav aria-label="Principal">` com `<ul role="list">` e os três links de `useLinksPrincipais(INICIO)` (Início, Cardápio e Entrar ou Perfil). São textos gravados no inox, em Bebas: 1,5 rem a partir de `md` e 1,125 rem abaixo de `sm`, com `padding-inline` de `--space-2`. O `RouterLink` exato recebe `aria-current="page"`, sublinhado de 3 px. Não há botão de menu, e por isso a Home não usa o `useMenuPrincipal`.
- **Carrinho:** `RouterLink to="/cart"` com `:aria-label="rotulo"` (`useContadorCarrinho`, que casa com `^Carrinho,? (vazio|\d+ itens?)$`). Por dentro: o ícone `['fas','shopping-cart']` (`aria-hidden`) e o **tambor** da v1, uma janelinha escura com um dígito por janela (`digitos`, `sentido`), também `aria-hidden`.
- **Largura mínima testada:** 360 px. A linha da nav com o carrinho precisa de cerca de 310 px com "ENTRAR" e "99+".
- **Estados:**
  - link: padrão, hover (sublinhado de 1 px, só em `hover-capable`), foco (anel `--color-focus` = tinta) e atual (sublinhado de 3 px);
  - carrinho: vazio ("0"), com itens e na mudança da contagem (o tambor rola).
- **Movimento:** o tambor rola o dígito com `translateY(±100%)` em `--dur-base` só dentro de `motion-ok`; com movimento reduzido, troca por opacidade em `--dur-fast` (como na v1).
- **Reservas:** `forced-colors` põe uma borda inferior de 3 px `CanvasText` na coifa e uma borda de 2 px na placa e no carrinho. `prefers-contrast: more` tira o `text-shadow` gravado e põe borda de 2 px `--esq-tinta` na placa e no carrinho.

---

## 5. Seções

### 5.1 `chapa` (hero)

- **Componente:** `secoes/EsqSecaoChapa.vue`. Raiz: `<section data-secao="chapa" aria-labelledby="esq-chapa-titulo" class="esq-chapa">`.
- **Objetivo:** dizer o que a casa faz e dar uma ação só (Ver cardápio), sem empurrar o cardápio para longe da dobra [H1][H3][H4].
- **Nova em relação à v1:** não. É o hero recomposto.
- **Conteúdo real:**

| Campo | Origem |
|---|---|
| Título (`h1`) | `src/direcoes/compartilhado/dados.js` → `HERO.titulo` |
| Texto (com o horário) | `dados.js` → `HERO.texto` |
| Ação | `dados.js` → `HERO.acao` ("Ver cardápio"), `RouterLink` para `/menu` |
| Lanche recortado | `dados.js` → `HERO.imagem`, `HERO.alt`, `HERO.largura`, `HERO.altura`, `IMAGEM_HERO` (WebP com alfa em 480 e 960, PNG 960); arquivos em `public/images/fundos/banner-burger-bg-*` |

- **Textos provisórios:** nenhum.
- **Estrutura:**
  - **`div.esq-chapa__superficie`:** a chapa curada, com o fundo `--esq-chapa-brilho, --esq-chapa-riscos, --esq-chapa-tempera, --esq-chapa`. Por dentro:
    - o `h1#esq-chapa-titulo`, estampado (Bebas, `--esq-titulo`, `--esq-letra` e `--esq-estampado`);
    - o `picture.esq-chapa__lanche`, com o calor (`--esq-calor`) e a sombra de contato (`--esq-contato`) em pseudo-elementos, como na v1.
  - **`div.esq-chapa__frente`:** a frente de inox da chapa (`--esq-escovado`, borda superior de 3 px `--esq-inox-borda`, com a calha de gordura `--esq-calha` logo abaixo da borda). Por dentro:
    - um `p` com `HERO.texto` (Courier, `--text-md`, `--esq-tinta`, sem sombra gravada, porque é texto corrido);
    - o `EsqBotao` com `to="/menu"` e `tamanho="grande"`.
- **Imagem:** `responsiveImage(HERO.imagem, { ...IMAGEM_HERO, sizes: "(min-width: 1280px) 440px, (min-width: 1024px) 380px, (min-width: 768px) 320px, 240px" })`, com `loading="eager"`, `fetchpriority="high"`, `decoding="async"`, `width`, `height` e `alt` = `HERO.alt`. É a LCP: descobrível no HTML e sem lazy-load [E28]. Em 390, fica em 480w (53 KB) com DPR 1 a 2 e em 960w (189 KB) com DPR 3, bem abaixo de 1 MB.
- **Interação e estados:** só o botão (padrão, hover, foco, pressionado). Nada mais se clica nem se mexe.
- **Acessibilidade:**
  - região nomeada pelo `h1` (o único da página);
  - o `h1` é texto grande, claro sobre escuro, e o contraste se mede no ponto mais claro da textura (`--esq-chapa-max`, par novo, mínimo 3) [E22];
  - o `HERO.texto` fica sobre o inox, medido no ponto mais escuro (par existente `esq-tinta`/`esq-inox-escuro`);
  - o anel de foco do botão usa `--color-focus` = tinta, sobre o inox;
  - nenhum texto fica sobre a foto.
- **Comportamento:**
  - **1440 (`xl`):** a superfície tem duas colunas, `minmax(0,1fr)` e 27,5 rem; o `h1` fica centrado na vertical em relação ao lanche (440 px); padding de `--space-7` em cima e `--space-6` embaixo. Na frente, o texto (até 36 rem) à esquerda e o botão à direita, em linha. O hero tem cerca de 600 px, então a placa das comandas e o trilho aparecem acima da dobra de 900 [H2][H3].
  - **1024 (`lg`):** o mesmo, com o lanche em 23,75 rem (380 px).
  - **768 (`md`):** uma coluna; o lanche com 20 rem, centralizado, depois do `h1`; a frente ainda em linha.
  - **390:** uma coluna; o `h1` em 2 ou 3 linhas; o lanche com 15 rem (240 px), centralizado; na frente, o texto e embaixo o botão (largura automática). O hero tem cerca de 600 px, e o título "Hambúrgueres" e o trilho aparecem antes da dobra de 844.
- **Movimento:** nenhum próprio, sem entrada animada nem luz que segue o cursor (decisão: a ousadia está no cupom). O botão afunda só com `motion-ok`.
- **Reservas:**
  - **Cardápio editado:** não se aplica, porque a seção não mostra produto.
  - **Imagem do hero que falha:** o `alt` fica, e a sombra de contato e o calor continuam como decoração.
  - **`forced-colors`:** a superfície e a frente ficam `Canvas`, e a frente ganha uma borda superior de 3 px `CanvasText`.
  - **`prefers-contrast: more`:** sem `--esq-estampado` no `h1` e com a calha como borda sólida `--esq-tinta`.

### 5.2 `comandas` (os lanches no trilho)

- **Componente:** `secoes/EsqSecaoComandas.vue`. Raiz: `<section data-secao="comandas" aria-labelledby="esq-comandas-titulo" class="esq-comandas">`.
- **Objetivo:** mostrar todos os lanches como comandas de cozinha, com foto, as linhas do ticket (ingredientes), o preço e "Adicionar <nome>", que abre o Personalizar real. É a seção de produtos do contrato.
- **Nova em relação à v1:** não. É o "Mais pedidos" refeito, sem carrossel e com as linhas do ticket.
- **Conteúdo real:**

| Campo | Origem |
|---|---|
| Título (`h2`) | `dados.js` → `CATEGORIAS[0].rotulo` ("Hambúrgueres"; o mesmo rótulo de `MenuView.vue`) |
| Comandas | `useProductsStore().foods` (`src/json/products.json` → `menuItems.foods`, editável no painel): `id`, `name`, `ingredients[]` (ou `description`, se não houver ingredientes), `price` (via `useCartaoProduto` → `formatPrice`), `image` (via `responsiveImage`) e `category` |
| Rótulo da lista de linhas | "Ingredientes" (texto real, legenda do `ModalAdditional.vue`) |
| Botão | "Adicionar" (texto real do `ProductCard.vue`), com `v-bind="atributosAdicionar"` |
| Carimbo | "Adicionado" (texto real do `ProductCard.vue`) |
| Lista vazia | "Nada nesta categoria por enquanto" (texto real do `EmptyState` de `MenuView.vue`) |

- **Textos provisórios:** nenhum.
- **Estrutura:**
  - **Título:** o `h2#esq-comandas-titulo` gravado (mixin `titulo-gravado`), sozinho, sem etiqueta de categoria. O menor preço de `foods` é o da Batata Frita, e nenhum hambúrguer sai por ele; a contagem só repetiria a lista, que fica inteira à vista logo abaixo (seção 16).
  - **Lista:** `ul.esq-comandas__lista role="list"` em grade, com um `li` por produto (`:key="\`${produto.category}-${produto.id}\`"`) e uma `EsqComanda :produto="produto"` em cada.
  - **Trilho:** cada `li` desenha o próprio trecho num `::before` (`--esq-trilho`, 18 px de altura, `--esq-sombra-trilho`, `z-index: var(--esq-z-trilho)`), de `-12px` a `+12px` além da borda (meio vão de cada lado, com `column-gap` de 24 px). Os trechos vizinhos se juntam numa barra contínua por fileira, e uma fileira incompleta tem uma barra mais curta, como um trilho real de tamanho menor. Os trechos não têm raio, para as emendas não aparecerem. O `row-gap` é de `--space-7`.
- **Comportamento:**
  - **1440 (`xl` ou mais):** 3 colunas na coluna da linha (cerca de 240 px cada), com comanda em pé. Com o cardápio atual, as fileiras ficam com 3, 3 e 1.
  - **1024 (`lg`):** 2 colunas (cerca de 302 px), em pé.
  - **768 (`md`):** 2 colunas, com comanda deitada.
  - **390:** 1 coluna, deitada.
- **Interação e estados:** os do `EsqComanda` (seção 7). Sem setas, sem paginação, sem hover na comanda e sem avanço automático [H6][H8][E25].
- **Acessibilidade:**
  - região nomeada pelo `h2`;
  - lista de comandas, cada uma um `article` nomeado pelo `h3` do nome;
  - os ingredientes num `ul` com `aria-label="Ingredientes"`;
  - um botão por comanda, com o nome acessível "Adicionar <nome>";
  - o carimbo é `aria-hidden` (o modal real já anuncia a adição).
- **Movimento:** as comandas ficam giradas ±0,75° (ímpar −0,75°, par +0,75°) só com `motion-ok`, sem transição: é um giro estático, de papel pendurado. Com movimento reduzido, ficam retas (desvio já registrado na ficha). O carimbo segue a seção 7.
- **Reservas para cardápio editado:**
  - **produto sumido:** sai da lista sem buraco, porque a grade se refaz;
  - **lista vazia:** no lugar da `ul`, fica um `div.esq-comandas__vazio` com o trilho e uma comanda em branco (papel, sem foto nem botão) com o `p` "Nada nesta categoria por enquanto";
  - **imagem `data:`:** o `responsiveImage` devolve só o `src`, e o `<source>` não é renderizado;
  - **imagem que falha:** a reserva do `EsqFoto`, com o ícone `['fas','burger']`;
  - **produto criado no painel sem `ingredients`:** mostra a `description`; sem nenhum dos dois, só o nome e o preço;
  - **nome longo:** quebra com `overflow-wrap: anywhere`, sem corte.

### 5.3 `expositor` (bebidas e sobremesas) — nova

- **Componente:** `secoes/EsqSecaoExpositor.vue`. Raiz: `<section data-secao="expositor" aria-labelledby="esq-expositor-titulo" class="esq-expositor">`.
- **Objetivo:** pôr na Home os outros tipos do cardápio, com "Adicionar". Parte de quem não vê o tipo que procura supõe que a loja não vende [H21][H22], e o `/menu` abre sempre em Hambúrgueres (`MenuView.vue`, `currentCategory = ref("foods")`), então um atalho "Bebidas" não cumpriria o rótulo.
- **Metáfora:** o expositor refrigerado aberto do balcão de lanchonete, sem porta, sem vidro e sem puxador: nada translúcido [E6][E26], nada que prometa um gesto [E15], nenhuma taxa de abrir a porta [E1][E35].
- **Conteúdo real:**

| Campo | Origem |
|---|---|
| Título (`h2`) | `TEXTOS.expositor.titulo` "Bebidas e sobremesas" (provisório, montado com os rótulos reais de `CATEGORIAS`) |
| Prateleiras (`h3`) | `dados.js` → `CATEGORIAS[1].rotulo` ("Bebidas") e `CATEGORIAS[2].rotulo` ("Sobremesas") |
| Itens | `useProductsStore().drinks` (3) e `.desserts` (1) (`products.json` → `menuItems.drinks` e `menuItems.desserts`, editáveis no painel): `name`, `price` (via `useCartaoProduto`), `image` e `category` |
| Adicionais da sobremesa | Calculado: `useProductsStore().dessertAdditionals.length` (7), só nos itens de `desserts` |
| Botão e carimbo | "Adicionar" e "Adicionado" (`ProductCard.vue`) |
| Prateleira vazia | "Nada nesta categoria por enquanto" (`MenuView.vue`) |

- **Textos provisórios:** "Bebidas e sobremesas" e a função `TEXTOS.expositor.adicionais(n)`, que devolve "1 adicional" ou "N adicionais".
- **Estrutura:**
  - o `h2#esq-expositor-titulo` gravado no balcão;
  - **`div.esq-expositor__moldura`:** moldura de inox (`--esq-escovado`, 12 px, `--esq-bisel-inox`, borda de 3 px `--esq-inox-borda`);
  - **`div.esq-expositor__interior`:** interior escuro (`--esq-luz-fria` sobre `--esq-placa-escura`, com `--esq-sombra-janela` interna), com `--color-focus: var(--esq-letra)`;
  - **uma `div.esq-prateleira` por categoria** (`drinks`, `desserts`), com `:style="{ '--esq-itens': Math.max(lista.length, 1) }"`. Cada uma tem:
    - o `h3 :id="\`esq-prateleira-${chave}\`"` (Bebas 1,75 rem, `--esq-letra`, sem sombra);
    - a `ul role="list" :aria-labelledby` (a do `h3`), com um `li` por produto e um `EsqItemExpositor :produto :adicionais` em cada (`adicionais` vale `dessertAdditionals.length` quando `chave === "desserts"` e 0 nas bebidas).
- **Prateleira:** é a barra `--esq-trilho` de 8 px com `--esq-sombra-prateleira`, desenhada por cada item sob a foto e estendida até o meio do vão, como o trilho. Abaixo de `md`, a barra fica sob cada item, na largura toda.
- **Comportamento:**
  - **1440 (`xl` ou mais):**
    - as duas prateleiras lado a lado, com `display: flex`, cada uma com `flex: var(--esq-itens) 1 0` (3 por 1);
    - entre elas, a divisória vertical `--esq-divisoria` (6 px);
    - cada `ul` é uma grade com `repeat(var(--esq-itens), minmax(0,1fr))`;
    - itens em pé, com foto 1:1 de cerca de 160 px;
    - a altura do expositor fica em cerca de 470 px.
  - **1024 (`lg`):** as prateleiras empilhadas; Bebidas em 3 colunas (cerca de 190 px) e Sobremesas em 3 colunas com 1 item. A grade é sempre de 3 colunas a partir de `md`, para a sobremesa ter o mesmo tamanho das bebidas.
  - **768 (`md`):** empilhadas, 3 colunas.
  - **390:** empilhadas, 1 coluna, com o item deitado (foto de 88 px à esquerda e a etiqueta à direita).
- **Interação e estados:** os do `EsqItemExpositor` (seção 7).
- **Acessibilidade:**
  - região nomeada pelo `h2`;
  - cada prateleira tem um `h3`, e a lista é nomeada por ele;
  - cada item é um `article` nomeado pelo `h4` do nome (`h2` > `h3` > `h4`, sem salto);
  - o botão fica na etiqueta de papel (anel tinta sobre papel, e o aro escuro do botão contrasta com o papel);
  - o `h3` claro fica sobre o interior com a luz fria, medido no ponto mais claro da luz (`--esq-luz-fria-max`, par novo);
  - nenhum texto sobre foto.
- **Movimento:** nenhum próprio. Botão e carimbo como na seção 7.
- **Reservas para cardápio editado:**
  - **categoria vazia:** a prateleira continua, com o `h3` e um `p` "Nada nesta categoria por enquanto" numa etiqueta de gôndola sem botão; a prateleira não some, como pede a HIG para seção vazia [H16];
  - **as duas vazias:** as duas prateleiras com o aviso;
  - **produto sumido:** sai sem buraco;
  - **imagem `data:`, imagem que falha e nome longo:** como na seção 5.2; o ícone de reserva é `faGlassWater` nas bebidas e `faIceCream` na sobremesa. São ícones novos: o `EsqItemExpositor` os importa de `@fortawesome/free-solid-svg-icons` e passa o objeto na prop `icone` do `EsqFoto` (`:icone="faGlassWater"`), sem mexer no plugin;
  - **`dessertAdditionals` vazio:** a linha de adicionais some;
  - **`forced-colors`:** a moldura com borda de 3 px `CanvasText`, a etiqueta com 1 px e a prateleira como borda superior de 3 px;
  - **`prefers-contrast: more`:** o interior sem a luz fria (`background-image: none`).

### 5.4 `cupom` (a impressora que imprime o carrinho) — nova, e a ousadia

- **Componente:** `secoes/EsqSecaoCupom.vue`. Raiz: `<section data-secao="cupom" aria-labelledby="esq-cupom-titulo" class="esq-cupom">`.
- **Objetivo:** mostrar, no papel térmico, o pedido que a pessoa está montando: o que está no carrinho, as retiradas e os adicionais de cada linha, e o subtotal, além do caminho para o carrinho. O carrinho deve conter só o que a pessoa escolheu [E17]; o cupom só espelha.
- **Metáfora funcional:** o cupom é o carrinho [E1][E35], e o padrão é recorrente [E41][E43][E46]. Os adicionais e as retiradas entram recuados, como os modificadores e o separador ADD-ON do ticket [E31][E33].
- **Conteúdo real:**

| Campo | Origem |
|---|---|
| Cabeçalho do papel | `dados.js` → `MARCA` |
| Título (`h2`) | Vazio: "Seu carrinho está vazio" (`CartView.vue`, `EmptyState`). Com itens: "Seu carrinho" (`h1` de `CartView.vue`). Em `TEXTOS.cupom`, com a origem |
| Texto do vazio | "Escolha um burger no cardápio para começar." (`CartView.vue`) |
| Linhas | `useCartStore().items` (`src/stores/cart.js`, chave `smash-burger:cart:v1`): `quantity`, `name`, `unitPrice` (via `formatPrice`), `productId`, `category` |
| Detalhes da linha | `describeItem(item)` (`src/utils/formatters.js`): retiradas ("Sem tomate, sem cebola"), adicionais ("+2 bacon") e observação ("Obs.: …"), as mesmas strings do carrinho e do resumo |
| Linhas ocultas | Calculado: soma das quantidades das linhas fora da janela, via `formatItemCount` |
| Subtotal | "Subtotal" (`OrderSummary.vue`) e `useCartStore().subtotal` via `formatPrice` (o getter calcula; a seção só formata) |
| Rótulo da lista | "Itens do carrinho" (`aria-label` de `CartView.vue`) |
| Ação, vazio | `HERO.acao` "Ver cardápio" → `/menu` |
| Ação, com itens | "Ver carrinho" → `/cart` |

- **Textos provisórios:** "cada", "+ {itens} no carrinho" (`TEXTOS.cupom.ocultos(texto)`) e "Ver carrinho".
- **Estrutura** (o papel sai da fenda para cima, então o cabeçalho, impresso primeiro, fica no alto, e a linha mais nova fica junto da fenda):

```
<section data-secao="cupom" aria-labelledby="esq-cupom-titulo" class="esq-cupom">
  <EsqImpressora :aceso="!vazio" :impressao="impressao">
    <p class="esq-cupom__marca">{{ MARCA }}</p>
    <h2 id="esq-cupom-titulo" class="esq-cupom__titulo">{{ vazio ? TEXTOS.cupom.vazioTitulo : TEXTOS.cupom.titulo }}</h2>
    <p v-if="vazio" class="esq-cupom__vazio">{{ TEXTOS.cupom.vazioTexto }}</p>
    <template v-else>
      <p v-if="ocultos" class="esq-cupom__ocultos">{{ TEXTOS.cupom.ocultos(ocultos) }}</p>
      <TransitionGroup tag="ul" name="esq-imprime" class="esq-cupom__linhas" role="list" :aria-label="TEXTOS.cupom.listaRotulo">
        <li v-for="linha in linhas" :key="linha.chave" class="esq-cupom__linha">
          <p class="esq-cupom__item"><span class="tabular">{{ linha.quantidade }}×</span> {{ linha.nome }}</p>
          <p class="esq-cupom__unitario tabular">{{ linha.preco }}<template v-if="linha.cada"> {{ TEXTOS.cupom.cada }}</template></p>
          <p v-for="detalhe in linha.detalhes" :key="detalhe" class="esq-cupom__detalhe">{{ detalhe }}</p>
        </li>
      </TransitionGroup>
      <dl class="esq-cupom__total"><dt>{{ TEXTOS.cupom.subtotal }}</dt><dd class="tabular">{{ subtotal }}</dd></dl>
    </template>
    <template #acao>
      <EsqBotao :to="vazio ? '/menu' : '/cart'">{{ vazio ? HERO.acao : TEXTOS.cupom.acao }}</EsqBotao>
    </template>
  </EsqImpressora>
</section>
```

- **Lógica:** `useCupom()` (seção 9) devolve `vazio`, `linhas` (as **3 últimas** linhas do carrinho, as mais recentes), `ocultos` (texto ou `null`), `subtotal` (texto) e `impressao` (contador que sobe quando `items.length` cresce depois da montagem).
- **Papel:**
  - **tipografia:** Courier, `--esq-tinta`. A marca em 1,25 rem bold, centralizada, em caixa alta (impressão térmica). O `h2` em 1,0625 rem bold, centralizado, em caixa alta. O nome do item em caixa alta e bold. O preço unitário à direita, na linha de baixo;
  - **detalhes:** recuados em 1 ch, `--esq-tinta-clara`, cada um numa linha com reticências (`white-space: nowrap; overflow: hidden; text-overflow: ellipsis`). O leitor de tela lê o texto inteiro, e o carrinho mostra tudo;
  - **separadores:** linhas tracejadas (`border-bottom: 2px dashed var(--esq-tinta-clara)`) entre o cabeçalho, as linhas e o subtotal;
  - **subtotal:** `dl` em flex, com o `dt` à esquerda e o `dd` à direita, unidos por um pontilhado (`border-bottom: 2px dotted` num `::after` flexível do `dt`).
- **Comportamento:**
  - **1440 e 1024 (`lg` ou mais):**
    - a seção ocupa a coluna do passe (320 px em `xl`, 300 px em `lg`), com `align-self: start` e `position: sticky; top: calc(var(--esq-altura-coifa) + var(--space-5))`, mas só dentro de `@media (min-height: 45rem)`. Em janela baixa, fica no fluxo, para o botão nunca ser cortado;
    - a altura é limitada pela janela de 3 linhas, com os detalhes em uma linha cada: cerca de 560 px no máximo;
    - na primeira tela de 1440, o alto do papel já aparece ao lado do título "Hambúrgueres".
  - **768:** uma coluna, centralizada, com `max-width: 26rem`, depois do expositor.
  - **390:** o mesmo, na largura toda até 26 rem. O carrinho continua à mão pela linha fixa da coifa.
- **Interação e estados:**
  - **vazio:** LED apagado, papel curto com o título de vazio, o texto e o botão "Ver cardápio";
  - **com itens:** LED aceso, linhas, subtotal e botão "Ver carrinho";
  - **com mais de 3 linhas:** a linha "+ N itens no carrinho" acima das linhas;
  - **imprimindo**, logo depois de uma adição: a linha nova entra pela fenda e o LED pisca uma vez;
  - **carrinho alterado em outra tela:** o cupom reflete ao voltar, porque é reativo; sem animação na montagem.
- **Acessibilidade:**
  - região nomeada pelo `h2`, que muda com o estado;
  - lista nomeada "Itens do carrinho";
  - o "×" vem colado à quantidade, como no `OrderSummary` real;
  - o subtotal num `dl`;
  - o LED e a fenda são `aria-hidden`;
  - **sem `aria-live`:** o modal Personalizar real já anuncia a adição, e um segundo anúncio repetiria (decisão de implementação; o dossiê não tem fonte para o anúncio do cupom);
  - o botão fica na carcaça clara (anel tinta, par novo `esq-tinta`/`esq-impressora`, mínimo 3);
  - a cor do LED não é o único sinal do estado, porque o texto do papel diz se está vazio [E23].
- **Movimento** (o momento orquestrado da página, sempre em resposta a uma adição; detalhes no `EsqImpressora`, seção 7):
  - **com `motion-ok`:**
    - a linha nova entra com `transform: translateY(var(--space-4))` e `opacity: 0` até `none` e 1, em `--esq-dur-impressao`, com `--esq-ease-impressao` (`steps(…)`, o avanço do motor de passo);
    - as linhas que ficam sobem pelo `move` do `TransitionGroup`, com a mesma duração e os mesmos passos, e o papel parece avançar;
    - a linha que sai da janela de 3 some sem transição (`.esq-imprime-leave-active { transition: none }`);
    - o LED pisca uma vez.
  - **Com movimento reduzido:** a linha nova aparece por opacidade em `--dur-fast`, sem `move` e sem piscar; o LED só acende.
- **Reservas:**
  - **produto removido do cardápio:** o `afterHydrate` do carrinho já tira a linha (`syncWithCatalog`), e o cupom segue a store;
  - **nome do item:** vem do carrinho, que a conferência refaz pelo cardápio;
  - **sem imagens no cupom:** é papel térmico, então não há risco de `data:` aqui;
  - **observação longa (até 140 caracteres):** reticências na linha, com o texto inteiro para o leitor;
  - **`forced-colors`:** o papel com borda de 1 px `CanvasText` (a máscara do picote fica, por inferência ainda não testada [E19]) e a carcaça com borda de 2 px; o LED some (é decorativo);
  - **`prefers-contrast: more`:** o papel sem grão, com borda de 1 px `--esq-tinta`.

---

## 6. Rodapé: a placa de horário (`EsqRodape`, slot `#rodape`)

Não é seção, então não leva `data-secao`.

- **Raiz:** `<footer class="esq-rodape">`, com a parede de chapa (`--esq-chapa-tempera, --esq-chapa`) e `--color-focus: var(--esq-tinta)` dentro da placa.
- **Placa:** `div.esq-rodape__placa`, de inox escovado (`--esq-escovado`, `--esq-bisel-inox`, borda de 2 px `--esq-inox-borda`, `--radius-md`), com 4 rebites (`--esq-rebite`) nos cantos: dois em `::before` e `::after` da placa e dois num `span.esq-rodape__rebites` (`aria-hidden`). É a plaquinha de aço parafusada da galeria [G2] (conceito).
- **Conteúdo real:**

| Campo | Origem |
|---|---|
| Marca | `dados.js` → `MARCA` (Bebas 2,375 rem, gravado), num `p` |
| Descrição | `dados.js` → `DESCRICAO` |
| `h2` Horário | `dados.js` → `RODAPE.horario` e `HORARIO` |
| `h2` Endereço | `dados.js` → `RODAPE.endereco` e `CONTATOS` (endereço com o link do Maps, WhatsApp com `wa.me` e e-mail com `mailto:`), com o `NOVA_ABA` em `visually-hidden` nos externos (`target="_blank"`, `rel="noopener noreferrer"`) |
| Direitos | `dados.js` → `RODAPE.copyright`, na parede, fora da placa (`--esq-letra-suave` sobre `--esq-chapa`, par novo) |

- **Redes fora:** os links de `REDES` apontam para `facebook.com` e `instagram.com`, não para o perfil da loja [H25][H26].
- **Comportamento:**
  - **1440 e 1024:** a placa com até 60 rem, centralizada, em grade de 3 colunas (marca e descrição; horário; endereço e contatos);
  - **768:** 2 colunas, com a marca e a descrição em cima, na largura toda;
  - **390:** 1 coluna.
  - Os links têm `min-height: var(--target-min)` (44 px).
- **Estados dos links:** padrão (sublinhado de 1 px), hover (sublinhado de 2 px, só em `hover-capable`) e foco (anel tinta sobre o inox, par existente).
- **Acessibilidade:** `footer`; os `h2` são de seções da página (sem salto, porque o `h1` está no `main`); os ícones de contato são `aria-hidden`.
- **Movimento:** nenhum.
- **Reservas:** `forced-colors`, com a placa com borda de 2 px `CanvasText`; `prefers-contrast: more`, sem `text-shadow` gravado.

---

## 7. Inventário de componentes (9, fora as seções)

Em `src/direcoes/estilos/esqueumorfismo/componentes/`. Cada um faz `@use` da própria parcial em `scss/` dentro de `<style scoped lang="scss">`. O `EsqCoifa` está na seção 4 e o `EsqRodape` na seção 6.

### `EsqBotao`: o botão físico vermelho

- **Papel:** a única peça com relevo de botão, em todas as ações (Ver cardápio, Adicionar, Ver carrinho) [E15][E18][E9].
- **Props:**
  - `to: { type: [String, Object], default: null }`: com valor, renderiza `RouterLink`; sem valor, `<button type="button">`;
  - `tamanho: { type: String, default: "normal", validator: ["normal", "grande"] }`.
- **Slots:** `default` (o rótulo).
- **Emits:** nenhum declarado: os atributos e os ouvintes caem no elemento raiz (`inheritAttrs` padrão), e o `v-bind="atributosAdicionar"` e o `@click` passam direto.
- **Estados:**

| Estado | Tratamento |
|---|---|
| Padrão | Degradê `--esq-ketchup-claro` → `--esq-ketchup`, com `--esq-bisel`. Aro e lateral (`--esq-sombra-botao`) num `::before`. Bebas: 1,375 rem no normal e 1,75 rem no grande. `min-height`: `--target-min` no normal e 3,5 rem no grande. `--esq-raio-botao` |
| Hover | Só com `hover-capable`: fundo `--esq-ketchup-claro` chapado. Não reduz o contraste [E13] |
| Foco | `:focus-visible` com `outline: var(--focus-width) solid var(--color-focus)` e `outline-offset: var(--focus-offset)` (o `--color-focus` herda da superfície; tinta em todas as superfícies onde há botão) |
| Pressionado | `:active`: o `::before` some e o `::after` com `--esq-sombra-botao-apertado` aparece (troca por opacidade, em `--dur-instant`). Com `motion-ok`, também `translateY(3px)`. Obrigatório num botão personalizado [E18]; responde na hora [E16] |
| Desabilitado | Não se aplica: nenhuma ação da Home fica indisponível |
| Carregando | Não se aplica: o "Adicionar" abre o modal na hora, e os links navegam [E18] |
| `forced-colors` | Borda de 2 px `ButtonText` e sem sombra [E19] |
| `prefers-contrast: more` | Borda de 2 px `--esq-tinta` |

- **Tokens:** `--esq-ketchup`, `--esq-ketchup-claro`, `--esq-bisel`, `--esq-sombra-botao`, `--esq-sombra-botao-apertado`, `--esq-raio-botao`, `--esq-z-fundo`, `--esq-fonte-placa`, `--color-accent-ink`, `--color-focus`, `--focus-width`, `--focus-offset`, `--target-min`, `--dur-instant`, `--ease-out`, `--space-1`, `--space-5` e `--space-6`.
- **Origem:** [E15] (3D é sinal forte de clique; forma retangular de cantos arredondados), [E18] (estado pressionado, 44 pt), [E9], [E16], [E19] e [E20] (a sombra muda sem animação; só o `transform` anima).

### `EsqComanda`: a comanda do lanche

- **Papel:** o ticket pendurado no trilho, com os ingredientes como linhas, o preço e o "Adicionar".
- **Props:** `produto: { type: Object, required: true }` (`id`, `name`, `price`, `image`, `category`, `ingredients?` e `description?`).
- **Slots:** nenhum.
- **Emits:** nenhum: chama `personalizar(produto, contexto)` de `usePersonalizar()` com o `contexto` de `useCartaoProduto(() => props.produto, { sizes: "(min-width: 1280px) 240px, (min-width: 1024px) 300px, 96px" })`.
- **Marcação:** `article.esq-comanda` (com o filtro de sombra) > `div.esq-comanda__papel` (com a máscara do picote). Dentro do papel:
  - `h3.esq-comanda__nome` (o `id` é `esq-comanda-${category}-${id}`);
  - `EsqFoto`;
  - `ul.esq-comanda__linhas` (`role="list"`, `aria-label="Ingredientes"`, com o traço "-" em `::before` e recuo pendurado de 1,2 ch);
  - `div.esq-comanda__total`, com o `p.esq-comanda__preco.tabular` e o `EsqBotao`;
  - `EsqCarimbo`.
  - O prendedor de inox (`--esq-escovado`, `--esq-bisel-inox`, 3,5 por 1,25 rem) fica no `::before` do `article`, no alto e ao centro, sobre o trilho.
- **Disposição** (por mídia, sem prop):
  - **em pé, a partir de `lg`:** a coluna tem nome, foto 4:3, linhas e total;
  - **deitada, abaixo de `lg`:** áreas `"nome nome" / "foto linhas" / "total total"`, com a foto de 6 rem (96 px) 1:1.
- **Estados:**

| Estado | Tratamento |
|---|---|
| Padrão | Papel com grão (`--esq-grao, --esq-papel-curva, --esq-papel`), picote embaixo (`--esq-picote-baixo`), sombra que segue o picote (`--esq-filtro-comanda`) |
| Hover | Nenhum na comanda (só o botão) |
| Foco | Só o botão recebe foco |
| Adicionado | `adicionado` verdadeiro por `--dur-base` + `--dur-hold`: o `EsqCarimbo` aparece sobre as linhas, e o botão ganha `data-adicionado="true"` |
| Imagem carregando | O quadro tem a proporção reservada e o fundo `--esq-papel-dobra` |
| Imagem falhou | Ícone `['fas','burger']` centralizado, `--esq-tinta-clara` |
| Sem ingredientes | Mostra a `description`, ou nada |
| `forced-colors` | Borda de 1 px `CanvasText` no papel; o trilho vira uma borda superior de 3 px |

- **Tokens:** `--esq-grao`, `--esq-papel-curva`, `--esq-papel`, `--esq-picote-baixo`, `--esq-filtro-comanda`, `--esq-tinta`, `--esq-tinta-clara`, `--esq-fonte-impressa`, `--esq-escovado`, `--esq-bisel-inox` e `--color-border`.
- **Origem:** [E31] e [E33] (itens e modificadores do ticket), [E1] e [E35] (metáfora funcional), [E16] (retorno imediato), [E34] (picote por `mask`), [H20] (nome, foto, preço) e a comanda da v1.

### `EsqFoto`: a foto com reserva

- **Papel:** `picture` responsiva com o quadro de proporção fixa e a reserva por ícone; serve a `EsqComanda` e `EsqItemExpositor`.
- **Props:**
  - `imagem: { type: Object, required: true }` (`{ src, srcset, sizes }` de `responsiveImage`);
  - `alt: { type: String, required: true }` (o nome do produto, como na v1);
  - `proporcao: { type: String, default: "4 / 3" }`;
  - `largura: { type: Number, default: 960 }` e `altura: { type: Number, default: 720 }`;
  - `falhou: { type: Boolean, default: false }`;
  - `icone: { type: [Array, Object], default: () => ["fas", "burger"] }`.
- **Slots:** nenhum.
- **Emits:** `erro`. O pai põe `imagemFalhou.value = true`.
- **Marcação:** `<source>` só com `srcset` (assim a `data:` não ganha `<source>`); `<img>` com `width`, `height`, `alt`, `loading="lazy"` e `decoding="async"`; `object-fit: cover`.
- **Estados:** carregando (fundo `--esq-papel-dobra`), carregada, falhou (ícone, `aria-hidden`; o nome está no título ao lado) e `data:` (só `src`).
- **Tokens:** `--esq-papel-dobra`, `--color-border`, `--esq-tinta-clara` e `--radius-sm`.
- **Origem:** regras comuns (imagens) e [H20].

### `EsqCarimbo`: o carimbo "Adicionado"

- **Papel:** o retorno visual da adição, impresso no papel.
- **Props:**
  - `visivel: { type: Boolean, default: false }`;
  - `tamanho: { type: String, default: "normal", validator: ["normal", "pequeno"] }`: o normal tem 2,5 rem, e o pequeno 1,5 rem, que ainda é texto grande para o par de 3:1.
- **Slots e emits:** nenhum.
- **Marcação:** `<span class="esq-carimbo" aria-hidden="true">Adicionado</span>`, com posição absoluta, centralizado sobre a área de texto do papel e nunca sobre a foto, porque o vermelho sobre a foto não tem contraste garantido.
- **Estados:** oculto (`opacity: 0`) e visível (`opacity: 0.92`).
- **Tokens:** `--esq-carimbo`, `--esq-fonte-placa`, `--radius-md`, `--dur-fast`, `--esq-dur-carimbo` e `--esq-ease-carimbo`.
- **Movimento:**
  - **com `motion-ok`:** de `rotate(-8deg) scale(1.3)` a `rotate(-8deg) scale(1)` em `--esq-dur-carimbo`, com `--esq-ease-carimbo`;
  - **reduzido:** reto, só por opacidade em `--dur-fast`.
- **Origem:** [E16] e o carimbo de recibo funcional (padrão 4, a única exceção que o dossiê aceita) [E40].

### `EsqEtiqueta`: a etiqueta de gôndola, estática

- **Papel:** o papel que carrega um dado, sem relevo de botão [E15]: a etiqueta de prateleira do expositor, com o item ou com o aviso de prateleira vazia. Tem uma aparência só, sem prop de variante: a `categoria` (a etiqueta "a partir de" das comandas) e a `fita` (a das cubas) saíram na revisão do juiz (seção 16).
- **Props:** `tag: { type: String, default: "div" }`.
- **Slots:** `default`.
- **Emits:** nenhum.
- **Aparência:** papel com grão, com a dobra no alto (borda superior de 3 px `--esq-papel-dobra`), presa sob a prateleira.
- **Estados:** só o estático; `forced-colors` (borda de 1 px `CanvasText`) e `prefers-contrast: more` (sem grão, borda de 1 px `--esq-tinta`).
- **Tokens:** `--esq-papel`, `--esq-grao`, `--esq-papel-dobra`, `--esq-tinta` e `--esq-fonte-impressa`.
- **Origem:** [E15] (o que não se clica não ganha cara de botão) e as pistas da etiqueta de preço do catálogo do dossiê.

### `EsqItemExpositor`: o produto na prateleira

- **Papel:** a bebida ou a sobremesa no expositor, com a etiqueta de gôndola e o "Adicionar".
- **Props:**
  - `produto: { type: Object, required: true }`;
  - `adicionais: { type: Number, default: 0 }`.
- **Slots:** nenhum.
- **Emits:** nenhum: chama `personalizar(produto, contexto)` como a comanda, com `useCartaoProduto(() => props.produto, { sizes: "(min-width: 1280px) 170px, (min-width: 768px) 220px, 88px" })`.
- **Marcação:** `article` (nomeado pelo `h4`), com:
  - `EsqFoto` (`proporcao="1 / 1"`, `largura` 960, `altura` 960 e o ícone da categoria);
  - a prateleira (`::after` sob a foto);
  - a `EsqEtiqueta` com o `h4` do nome, o `p.tabular` do preço, o `p` dos adicionais (quando `adicionais > 0`), o `EsqBotao` e o `EsqCarimbo tamanho="pequeno"`.
- **Disposição:** em pé a partir de `md` (foto, prateleira, etiqueta); deitada abaixo de `md` (foto de 88 px à esquerda e etiqueta à direita).
- **Estados:** padrão; foco no botão; adicionado (carimbo pequeno na etiqueta e `data-adicionado`); imagem carregando, imagem que falhou e `data:` (pelo `EsqFoto`); nome longo (quebra); `forced-colors`.
- **Tokens:** `--esq-trilho`, `--esq-sombra-prateleira`, `--elev-2` (a sombra da foto), além dos de `EsqEtiqueta`, `EsqBotao`, `EsqFoto` e `EsqCarimbo`.
- **Origem:** [E15], [H20] e [H21].

### `EsqImpressora`: a impressora térmica (a ousadia)

- **Papel:** a carcaça com a fenda, o LED e o botão, e o papel que sai da fenda para cima. A seção põe o conteúdo do cupom.
- **Props:**
  - `aceso: { type: Boolean, default: false }`: o LED;
  - `impressao: { type: Number, default: 0 }`: cada mudança dispara a piscada.
- **Slots:** `default` (o conteúdo do papel) e `acao` (o botão na carcaça).
- **Emits:** nenhum.
- **Marcação:**
  - `div.esq-impressora` (em coluna), com:
    - **`div.esq-impressora__papel`:** `--esq-grao, --esq-papel`, máscara `--esq-picote-cima` em cima, `filter: var(--esq-filtro-comanda)` num invólucro, `z-index: var(--esq-z-papel)`, padding de `--space-5` e margens laterais de `--space-3` (o papel é mais estreito que a carcaça);
    - **`div.esq-impressora__corpo`:** `--esq-impressora`, `--esq-bisel-inox`, borda de 2 px `--esq-inox-borda`, `--radius-lg` e padding de `--space-4`, com:
      - o `span.esq-impressora__fenda` (`aria-hidden`), uma faixa escura de 10 px no alto com `--esq-fenda`, que passa por cima da ponta de baixo do papel (`z-index: var(--esq-z-fenda)`, com `margin-top` negativo);
      - o `span.esq-impressora__led` (`aria-hidden`, 1 rem, com o aro `--esq-led-aro`, apagado `--esq-led-apagado` e `--esq-sombra-led`; aceso, uma camada `::after` com `--esq-led` e `--esq-brilho-led` em opacidade 1);
      - o slot `acao`, à direita.
  - Sem movimento, o LED ganha a classe `is-piscando` por `readDurationToken("--esq-dur-led")` ms a cada mudança de `impressao` (`watch`), com o temporizador limpo no `onBeforeUnmount`.
- **Estados:**

| Estado | Tratamento |
|---|---|
| Vazia | LED apagado, papel curto |
| Com itens | LED aceso |
| Imprimindo | `is-piscando`: com `motion-ok`, `@keyframes` de opacidade 1 → 0,35 → 1 no `::after`, em `--esq-dur-led`; com movimento reduzido, nada pisca |
| Foco | No botão do slot (anel tinta sobre a carcaça clara, par novo) |
| `forced-colors` | Carcaça com borda de 2 px `CanvasText`, papel com borda de 1 px e LED invisível (decorativo) |
| `prefers-contrast: more` | Papel sem grão, bordas `--esq-tinta` |

- **Tokens:** `--esq-impressora`, `--esq-fenda`, `--esq-led`, `--esq-led-apagado`, `--esq-led-aro`, `--esq-brilho-led`, `--esq-sombra-led`, `--esq-picote-cima`, `--esq-grao`, `--esq-papel`, `--esq-filtro-comanda`, `--esq-bisel-inox`, `--esq-inox-borda`, `--esq-z-papel`, `--esq-z-fenda`, `--esq-dur-impressao`, `--esq-ease-impressao` e `--esq-dur-led`.
- **Origem:** padrão 1 [E41][E43][E46], [E1] e [E35] (função), [E34] (picote), [E19] (`forced-colors`), [E20] (só `transform` e `opacity`), [E16] (retorno) e [E23] (cor não é o único sinal).

### `EsqCoifa` e `EsqRodape`

Descritos nas seções 4 e 6. Origem: [E15], [H14], [H17] e [H35] (o carrinho no canto superior direito), mais o tambor da v1, no `EsqCoifa`; [G2] (a plaquinha de aço parafusada, conceito), [H29], [H30], [H25] e [H26] no `EsqRodape`.

### Matriz resumida

| Componente | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
|---|---|---|---|---|---|---|---|
| EsqCoifa (links, carrinho) | sim | sublinhado de 1 px | anel tinta | (link) | `aria-current` | não se aplica | não se aplica |
| EsqBotao | sim | ketchup claro | anel | afunda | não se aplica | não se aplica | não se aplica |
| EsqComanda | sim | não | no botão | no botão | "adicionado" (carimbo) | não se aplica | imagem |
| EsqFoto | sim | não | não | não | não se aplica | não se aplica | imagem |
| EsqCarimbo | oculto ou visível | não | não | não | não se aplica | não se aplica | não se aplica |
| EsqEtiqueta | estática | não | não | não | não se aplica | não se aplica | não se aplica |
| EsqItemExpositor | sim | não | no botão | no botão | "adicionado" | não se aplica | imagem |
| EsqImpressora | vazia ou com itens | não | no botão | no botão | não se aplica | não se aplica | "imprimindo" (LED) |
| EsqRodape (links) | sim | sublinhado de 2 px | anel tinta | não se aplica | não se aplica | não se aplica | não se aplica |

---

## 8. Home e arquivos

- **`HomeEsqueumorfismo.vue`** (só composição, 100 linhas ou menos):
  - `import "@fontsource/courier-prime/400.css"`, `import "@fontsource/courier-prime/700.css"` e `import "./_tokens.scss"`; a Bebas Neue já é global, em `main.js`;
  - `useEstiloAtivo("esqueumorfismo", { esquema: "light" })` como primeira chamada do setup;
  - `INICIO = "/direcoes/esqueumorfismo"`.

```
<MolduraDirecao estilo="esqueumorfismo">
  <template #topo><EsqCoifa :inicio="INICIO" /></template>
  <EsqSecaoChapa />
  <div class="esq-balcao">
    <div class="esq-balcao__grade container">
      <div class="esq-balcao__linha">
        <EsqSecaoComandas />
        <EsqSecaoExpositor />
      </div>
      <EsqSecaoCupom class="esq-balcao__cupom" />
    </div>
  </div>
  <template #rodape><EsqRodape /></template>
</MolduraDirecao>
```

  - **Balcão:** `--esq-escovado-claro`, com borda superior de 3 px `--esq-inox-borda` e `padding-block` de `--space-7` a `--space-8`.
  - **Grade:** uma coluna com `gap: var(--space-8)`. A partir de `lg`, `grid-template-columns: minmax(0,1fr) 18.75rem` e `column-gap: var(--space-6)`; a partir de `xl`, `20rem` e `var(--space-7)`.
  - **Linha:** a `__linha` empilha as duas seções com `gap: var(--space-8)`.
  - **Layout da moldura:** como na v1 (`.moldura` em flex e coluna).
- **Pasta:**
  - `secoes/`: `EsqSecaoChapa`, `EsqSecaoComandas`, `EsqSecaoExpositor` e `EsqSecaoCupom`;
  - `componentes/`: os 9;
  - lógica: `useCupom.js`;
  - estilos: `scss/_base.scss` (mixins `papel-termico`, `inox-escovado`, `titulo-gravado`, `anel-foco`, `camadas-de-sombra` para a troca por opacidade e `reserva-contraste` para `forced-colors` e `prefers-contrast`) e `scss/_<nome>.scss` (uma por componente e seção);
  - teste: `__tests__/HomeEsqueumorfismo.test.js`.
  - O `_home.scss` da v1 sai, e as peças dele vão para as parciais.
- **Teste sugerido:**
  - um `h1`;
  - botões "Adicionar <nome>" para os 7 lanches, as 3 bebidas e a sobremesa;
  - os `data-secao` na ordem `chapa`, `comandas`, `expositor` e `cupom`;
  - monta com o cardápio vazio (as três reservas aparecem: a comanda em branco e as duas prateleiras com o aviso);
  - nenhum texto "a partir de" na seção `comandas`;
  - cupom vazio com "Seu carrinho está vazio" e o link para `/menu`;
  - com 4 itens semeados: 3 linhas e a linha "+ 1 item no carrinho", e o link para `/cart`;
  - o carrinho da coifa com o nome acessível pela regex do contrato;
  - nenhum `button[aria-controls]` na coifa (sem menu escondido).

---

## 9. Lógica necessária

| Nome | O que faz | Outro estilo poderia usar? |
|---|---|---|
| `useCupom()` (`useCupom.js`) | Lê `useCartStore()` e devolve: `vazio`; `linhas` (as `LINHAS_VISIVEIS = 3` últimas, cada uma com `chave` igual a `` `${productId}-${category}-${índice absoluto}` ``, `quantidade`, `nome`, `preco` via `formatPrice(unitPrice)`, `cada` quando `quantity > 1`, e `detalhes` via `describeItem`); `ocultos` (`formatItemCount` da soma das quantidades fora da janela, ou `null`); `subtotal` (`formatPrice(cartStore.subtotal)`); e `impressao`, um `ref` que sobe num `watch` de `items.length` quando ele cresce, sem disparar na montagem. Não calcula preço, só formata | Sim: o resumo do carrinho serve a qualquer estilo. Fica na pasta do estilo, porque as regras não deixam mexer em `compartilhado/` |
| Piscada do LED (no `EsqImpressora`) | `watch` de `impressao`, que liga `is-piscando` por `readDurationToken("--esq-dur-led", …)` ms; o temporizador é limpo no `onBeforeUnmount` | Não |
| Prateleiras proporcionais | `--esq-itens` em `style` e `flex-grow` no CSS | Não |
| Coifa com a linha da marca que sai | Só CSS (`sticky` com `top` negativo abaixo de `md`) | Não |

---

## 10. Tokens, pares e dependências

### Tokens novos (os valores ficam para o construtor, em `_tokens.scss`, todos com `--esq-`)

| Token | Papel |
|---|---|
| `--esq-altura-coifa` | Altura da coifa a partir de `md`, também usada no `top` do cupom fixo |
| `--esq-coifa-marca` | Altura da linha da marca abaixo de `md`, que é o deslocamento negativo do `sticky` |
| `--esq-calha` | Calha de gordura na frente de inox da chapa (sombra interna escura) |
| `--esq-chapa-max` | O ponto mais claro da textura da chapa (rgba), só para o par de contraste do `h1` |
| `--esq-luz-fria` | Luz fria no alto do interior do expositor (degradê) |
| `--esq-luz-fria-max` | O ponto mais claro dessa luz (rgba), para o par de contraste |
| `--esq-sombra-prateleira` | Sombra sob a barra da prateleira |
| `--esq-divisoria` | Divisória vertical de inox entre as prateleiras (degradê de 90°) |
| `--esq-impressora` | Carcaça clara da impressora (degradê de plástico ou metal claro) |
| `--esq-fenda` | A fenda por onde sai o papel (sombra interna funda) |
| `--esq-dur-impressao` | Duração do avanço de uma linha |
| `--esq-ease-impressao` | Os passos do motor (`steps(n, end)`) |
| `--esq-dur-led` | Duração da piscada do LED |
| `--esq-z-papel` e `--esq-z-fenda` | Empilhamento do papel sob a borda da fenda |

### Pares de contraste novos (para `contraste.js`)

| Frente | Fundo | Mínimo | Onde |
|---|---|---|---|
| `esq-letra` | `esq-chapa-max` sobre `esq-chapa` | 3 | `h1` estampado no ponto mais claro da chapa (texto grande) |
| `esq-letra` | `esq-luz-fria-max` sobre `esq-placa-escura` | 3 | Títulos das prateleiras (texto grande) |
| `esq-tinta` | `esq-impressora` (o ponto mais escuro do degradê) | 3 | Anel de foco do botão na carcaça |
| `esq-letra-suave` | `esq-chapa` | 4,5 | Linha de direitos na parede do rodapé |

**Pares existentes usados de outro jeito** (confirmar que continuam no `contraste.js`):

- `esq-tinta`/`esq-inox-escuro`: o texto do hero, agora na frente de inox;
- `esq-tinta-clara`/`esq-grao-max` sobre `esq-papel`: os detalhes do cupom;
- `esq-carimbo`/`esq-papel`: o carimbo pequeno, em 1,5 rem, que ainda é texto grande;
- `esq-led`/`esq-led-apagado`: passa a `informativo`, porque o LED virou decoração e o estado está no texto.

### Dependências novas

Nenhuma. Continuam a Courier Prime (`@fontsource/courier-prime`, já usada na v1), a Bebas Neue (global) e o Font Awesome. Os ícones novos (`faGlassWater` e `faIceCream`) são importados no componente. O `vue3-carousel` sai da Home.

---

## 11. Textos

### Reais (sem `// provisório`)

- **`dados.js`:** `MARCA`, `DESCRICAO`, `HERO` (título, texto, ação e alt), `HORARIO`, `RODAPE` (horário, endereço e direitos), `CONTATOS`, `NOVA_ABA` e `CATEGORIAS` (Hambúrgueres, Bebidas e Sobremesas).
- **Componentes e telas:**
  - "Adicionar" e "Adicionado" (`ProductCard.vue`);
  - "Ingredientes" (`ModalAdditional.vue`);
  - "Seu carrinho", "Seu carrinho está vazio", "Escolha um burger no cardápio para começar." e "Itens do carrinho" (`CartView.vue`);
  - "Subtotal" (`OrderSummary.vue`);
  - "Nada nesta categoria por enquanto" (`MenuView.vue`).
- **Utilitários:** os detalhes da linha saem de `describeItem` e a contagem de `formatItemCount` (`src/utils/formatters.js`).

### Provisórios (em `textos.js`, cada um com `// provisório`, sem dígitos)

```js
export const TEXTOS = {
  expositor: {
    titulo: "Bebidas e sobremesas", // provisório (rótulos reais de CATEGORIAS)
    adicionais: (n) => (n === 1 ? `${n} adicional` : `${n} adicionais`), // provisório
  },
  cupom: {
    titulo: "Seu carrinho", // real: CartView.vue
    vazioTitulo: "Seu carrinho está vazio", // real: CartView.vue
    vazioTexto: "Escolha um burger no cardápio para começar.", // real: CartView.vue
    listaRotulo: "Itens do carrinho", // real: CartView.vue
    subtotal: "Subtotal", // real: OrderSummary.vue
    cada: "cada", // provisório
    ocultos: (itens) => `+ ${itens} no carrinho`, // provisório
    acao: "Ver carrinho", // provisório
  },
  vazio: "Nada nesta categoria por enquanto", // real: MenuView.vue
};
```

---

## 12. Movimento (resumo)

Nada se move sozinho: nada de autoplay, paralaxe, entrada com a rolagem ou luz que segue o cursor. Todo movimento responde a um gesto. As animações usam só `transform` e `opacity` [E20].

| Elemento | Com `motion-ok` | Com movimento reduzido |
|---|---|---|
| `EsqBotao` | Afunda 3 px (`translateY`, `--dur-instant`) e troca a sombra por opacidade | Só a troca de sombra |
| Tambor do carrinho | O dígito rola (`--dur-base`) | Troca por opacidade (`--dur-fast`) |
| Comandas | Giro estático de ±0,75°, sem transição | Retas |
| `EsqCarimbo` | Carimba: `rotate(-8deg)`, `scale` de 1,3 a 1 (`--esq-dur-carimbo`, `--esq-ease-carimbo`) | Reto, por opacidade (`--dur-fast`) |
| Linha nova do cupom (a ousadia) | Sobe da fenda em passos (`--esq-dur-impressao`, `--esq-ease-impressao`), e as outras avançam (`move`) | Aparece por opacidade (`--dur-fast`), sem `move` |
| LED da impressora | Pisca uma vez (`--esq-dur-led`) | Só acende |

---

## 13. Acessibilidade (resumo)

- **Landmarks:**
  - `header` com `nav` "Principal" (os três links e o `aria-current` no Início);
  - `main`, da moldura;
  - 4 `section` com `data-secao` e `aria-labelledby`;
  - `footer`.
  - O carrinho fica no `header`, com o nome acessível do contrato.
- **Títulos:** um `h1` (chapa); `h2` em cada seção e no rodapé; `h3` nos nomes das comandas e nas prateleiras; `h4` nos itens do expositor. Sem saltos.
- **Caminho para `/menu` dentro do `main`:** "Ver cardápio" no hero e no cupom vazio.
- **Alvos:** todos com 44 px ou mais: botões, links da coifa (`--target-min`), carrinho e links do rodapé.
- **Contraste:** texto nunca sobre foto. Sobre textura, medido no pior ponto (grão, chapa, luz fria e inox) [E22]. Os pares novos estão na seção 10.
- **Sombras e degradês:** todos têm reserva em `forced-colors` (borda real) [E19] e em `prefers-contrast: more` [E27]. A translucidez não aparece em lugar nenhum [E26].
- **Cor:** nenhum estado só por cor. O LED repete o que o texto do papel já diz [E23].
- **Anúncios:** só os do modal real. O cupom não usa `aria-live`.
- **Teclado:** não há widget composto (sem abas, barras nem carrossel), então não há tabindex móvel. A ordem de Tab segue o DOM: coifa, hero, comandas, expositor, cupom e rodapé.

---

## 14. Referências usadas

| Ref. | Tipo | Publicado ou conceito | Padrão abstraído e onde entra |
|---|---|---|---|
| [E1] NN/g, Skeuomorphism | Pesquisa | (artigo) | O objeto real serve de auxílio de aprendizado; o realismo sem função polui e pesa. Motivo para cortar adesivos, faixa e porta de geladeira |
| [E35] Nielsen, Metaphor in UX | Ensaio | (artigo) | A metáfora mapeia a função, não a aparência; a "taxa" das limitações físicas. Cupom = carrinho, comanda = item; sem abrir porta |
| [E15] NN/g, Clickable elements | Pesquisa | (artigo) | O 3D sinaliza clique; não dar cara de botão ao que não se clica. Só o botão vermelho e a placa da marca têm relevo de clique; títulos gravados; etiquetas planas |
| [E18] HIG, Buttons | Autor do estilo | (diretriz) | Estado pressionado obrigatório; 44 pt; um ou dois botões proeminentes por vista. No `EsqBotao`, um por objeto |
| [E16], [E9] NN/g | Pesquisa | (artigo) | Retorno imediato; sinais fortes de clique. Carimbo e botão que afunda |
| [E31] Square KDS | Documentação | Publicado (produto) | Ticket com itens e modificadores. Ingredientes como linhas da comanda; detalhes recuados no cupom |
| [E32] GoTab | Documentação | Publicado (produto) | Estado do ticket por cor. Não usado como cor; o dossiê pede outro meio [E23] |
| [E33] Bank of America KDS | Documentação | Publicado (produto) | Separador ADD-ON e itens marcados. Os adicionais e as retiradas recuados sob a linha do cupom |
| [E41] QR MenuSlip | Galeria | Conceito (template) | O resumo do pedido como recibo de borda rasgada. O cupom vivo |
| [E43] Marcy's | Galeria | Conceito (produto fictício declarado) | O recibo perfurado ao lado dos passos do pedido. A impressora fixa ao lado do balcão |
| [E46] Receiptify | Galeria | Publicado (site no ar) | Recibo gerado com os dados da própria pessoa. O cupom imprime o carrinho dela |
| [E40] GRIDDLE | Galeria | Conceito (template) | Contraexemplo: recibo com frases de marca e total figurativo. O cupom não faz isso |
| [E34] CSS-Tricks, masks | Praticante | (artigo) | Picote por `mask` com `conic-gradient`. Comanda e cupom (tokens da v1) |
| [E19] MDN, forced-colors | Referência técnica | (doc) | Sombra e degradê somem; a borda substitui. Reservas de todos os componentes |
| [E20] web.dev, compositor | Referência técnica | (doc) | Só `transform` e `opacity` animam. Botão, carimbo e linha do cupom |
| [E22] F83 | Referência técnica | (doc) | Contraste no pior ponto do fundo. Pares `-max` novos |
| [E24], [E25] WCAG | Referência técnica | (doc) | Movimento por interação desligável; pausa no que corre sozinho. Sem faixa rolante; versões reduzidas |
| [E6], [E26] | Pesquisa e doc | (artigo, doc) | Translúcido perde contraste; sem alternativa automática confiável. Expositor aberto e opaco |
| [E28] web.dev, LCP | Referência técnica | (doc) | A LCP descobrível, sem lazy, com `fetchpriority`. Imagem do hero |
| [E17] NN/g, Mental models | Pesquisa | (artigo) | O carrinho só com o que a pessoa escolheu. O cupom espelha, não acrescenta |
| [G2] Dribbble, upload de couro e aço escovado | Galeria (Chrome) | Conceito (shot) | Plaquinha de aço parafusada como suporte de texto. A placa do rodapé |
| [G3] Legacy iOS UI Kit | Galeria (Chrome) | Publicado (site no ar) | O site sóbrio que deixa o esqueumorfismo nos objetos. A gramática "um material por superfície" |
| [H1], [H2], [H3], [H4] | Pesquisa | (artigo) | Identidade, peso da tarefa, dobra e falso fim. Hero mais baixo, com a seção seguinte visível |
| [H6], [H8], [H9], [H10] | Pesquisa | (artigo) | Contra o carrossel (giro sozinho, passos demais, rolagem lateral). Trilho estático |
| [H14], [H17], [H35] | Pesquisa | (artigo) | Links visíveis; cabeçalho fixo baixo e opaco; carrinho no canto. A coifa nova |
| [H20], [H21], [H22] | Pesquisa | (artigo) | Mínimo do item; variedade de tipos. Expositor |
| [H25], [H26] | Pesquisa | (artigo) | Credibilidade: nada de afirmação sem dado nem de link que não leva ao prometido. Sem "Mais pedidos" e sem redes |
| [H29], [H32], [H33], [H34] | Pesquisa e doc | (artigo, doc) | Horário, endereço com mapa e contatos que abrem o app. Placa do rodapé |

---

## 15. Riscos e pendências para o construtor e o juiz

- **Ficha:**
  - a frase da `tese` menciona "o rodapé como o cupom" e precisa do ajuste da seção 1;
  - em `desvios`, convém registrar: "Títulos de seção gravados, sem placa: a placa fica só na marca, que é clicável [E15]";
  - o desvio atual do movimento reduzido cita "comandas, etiqueta e carimbo" e o giro de ±1°. A etiqueta com clipe da v1 não existe mais, e o giro das comandas passou a ±0,75°; o texto fica "comandas e carimbo", com ±0,75° e −8°.
- **Comprimento em 390:** a página fica em cerca de 4.850 px (estimativa), porque as 7 comandas deitadas somam uns 2.500 px. É o preço de mostrar todo o cardápio na Home sem carrossel [H9]. A primeira versão deste desenho tinha uns 5.500 px; a bancada (uns 575 px com o vão) e a etiqueta de categoria (uns 75 px) saíram na revisão do juiz. Se o juiz achar longo, a saída é limitar as comandas aos lanches e pôr a Batata Frita no expositor; isso pede decisão, porque a categoria real dela é `foods`.
- **"Entregue quente":** o `HERO.titulo` é real, mas promete sem detalhe de prazo ou taxa [H25]. A Home não acrescenta nenhuma promessa de entrega.
- **Máscara no `forced-colors`:** que o picote continue é inferência ainda não testada [E19][E34]. Confira no axe com `forced-colors`.
- **Peso de pintura:** o grão (`feTurbulence`) só entra em áreas de papel (comandas, etiquetas de gôndola e cupom), nunca do tamanho da tela [E29]. O `drop-shadow` fica nas 7 comandas e no cupom, como na v1. Meça com a CPU reduzida (risco da ficha).
- **`steps()` no `move`:** se o avanço em passos parecer engasgo no Firefox, troque o `--esq-ease-impressao` por `--ease-out`. O token existe para essa troca.

---

## 16. Revisão do juiz

O juiz de distinção apontou dois problemas, os dois de gravidade importante. Os dois foram resolvidos tirando peças, sem acrescentar nenhuma seção, componente ou texto da loja. Por isso a revisão não cria repetição nova com os outros seis desenhos, que foram relidos para conferir.

### 1. `bancada` repetia o `extras` do 3D (repetição): a seção saiu

- **O que o juiz viu:** a mesma forma do `extras` do 3D: o `h2` "Adicionais", a frase "Escolha ao…", os 5 `foodAdditionals` numa grade estática de 3 + 2 com o objeto ilustrado, o nome e "+ R$", sem foco, com a mesma justificativa [H23][H24]. E os adicionais com preço aparecem também no neumorfismo (a régua do painel), no flat (a seção `adicionais`) e no minimalismo (a nota dos adicionais).
- **O que mudou:** a bancada saiu, mesmo que o 3D troque a dele. Sem o 3D, ela ainda seria o quarto estilo com a mesma lista de preços, e a página em 390 tinha uns 5.500 px, comprimento que o juiz também apontou.
- **Por que não a outra saída** (os adicionais como linhas "ADD-ON" de cada comanda):
  - no [E33], o separador ADD-ON reúne os itens enviados depois, ou seja, o que foi acrescentado ao pedido, e não uma tabela do que se pode pedir;
  - repetir os 5 adicionais com preço nas 7 comandas daria 35 linhas iguais e faria do ticket uma tabela de preços, o uso decorativo que o dossiê recusa [E1][E35]; em 390, somaria uns 700 px;
  - a função que o ADD-ON mapeia já está no cupom: os adicionais escolhidos entram recuados sob a linha, por `describeItem` [E31][E33].
- **O que se perde:** o argumento de mostrar a personalização antes do item [H23][H24]. Os adicionais continuam no modal Personalizar real, e a etiqueta do sorvete continua com a contagem dos adicionais da sobremesa. As referências [H23] e [H24] saíram da tabela da seção 14.
- **Onde o documento mudou:**
  - resumo (4 seções, 2 novas, e 9 componentes), sugestão de `tese` e tabela "O que mudou da rodada 1" (a linha 7 saiu, e as seguintes foram renumeradas);
  - itens 3 e 5 da revisão da seção 2, com a nota de que a fita e as cubas saíram aqui;
  - composição, wireframes de 1440 e 390 e a lista de 1024;
  - a seção 5.3 saiu: o `expositor` passou a 5.3 e o `cupom` a 5.4;
  - o `EsqCuba` saiu, e a `EsqEtiqueta` perdeu a variante `fita`;
  - os tokens `--esq-fita`, `--esq-tampa` e `--esq-sombra-recorte`, os dois pares da fita, o `TEXTOS.bancada`, a linha das fitas na tabela de movimento e a linha da grade das cubas na seção 9;
  - acessibilidade (4 `section`, e a ordem de Tab sem a nota da bancada), referências [E15] e [E35] e riscos (o desvio das cubas não é mais necessário, e o comprimento estimado em 390 caiu para uns 4.850 px).
- **Escopo:** 4 seções (o hero conta, dentro de 4 a 6), 2 delas novas em relação à v1 (`expositor` e `cupom`, o mínimo) e 9 componentes (até 12). O `justificativaEscopo` continua `null`.
- **JSON:** `secoes` passou a `["chapa", "comandas", "expositor", "cupom"]`. O estado medido pelo axe (cupom com itens, a partir da primeira comanda) não muda.

### 2. A etiqueta "a partir de" das comandas usava o preço da Batata Frita (infiel): a etiqueta saiu

- **O que o juiz viu:** "7 itens / a partir de R$ 10,90" sob "Hambúrgueres". O menor preço de `foods` é o da Batata Frita, que está na categoria mas não é um hambúrguer, e nenhum hambúrguer sai por esse valor.
- **O que mudou:** a etiqueta saiu inteira, e o `h2` fica sozinho. Ficar só com a contagem foi descartado:
  - a contagem repetiria a lista, que fica inteira à vista logo abaixo (7 comandas, sem carrossel);
  - uma etiqueta pendurada só com um número é realismo com pouca função [E1];
  - o flat já usa a contagem por categoria nos ladrilhos.
- **Consequências:**
  - a `EsqEtiqueta` perdeu a variante `categoria` e, com a `fita` fora, ficou só com a aparência de gôndola, sem a prop `variante`;
  - o `derivados.js` (`menorPreco` e `resumoCategoria`) saiu da pasta, porque servia só a essa etiqueta. Se uma versão futura precisar desses derivados, o `useCardapio()` de `compartilhado/` já os exporta;
  - saíram o `TEXTOS.comandas.aPartirDe`, a linha da etiqueta na tabela de conteúdo, a quebra da etiqueta abaixo de `sm`, a nota de acessibilidade e a reserva "a etiqueta some";
  - o teste sugerido ganhou "nenhum texto 'a partir de' na seção `comandas`";
  - a referência [H20][H21][H22] deixou de citar a etiqueta.

### Fora da lista do juiz (registrado, sem mudança)

- O `h2` do expositor, "Bebidas e sobremesas", é o mesmo título composto da seção `bebidas-e-sobremesas` do material, porque os dois saem dos rótulos reais de `CATEGORIAS`. A forma é outra (expositor com prateleiras e etiquetas de gôndola, contra a lista segmentada do material), e o juiz não apontou. Fica a nota, caso ele queira um título diferente.
- Na ficha, o desvio do movimento reduzido ainda cita "comandas, etiqueta e carimbo" e o giro de ±1°. A etiqueta citada é a da v1, e o giro novo das comandas é de ±0,75° (seção 15). O ajuste fica para o construtor, que é quem edita a `ficha.js`.

## Notas da construção (W4, 21/11/2026)

A Home foi construída em 2 rodada(s) pelo W4 (construtor ou corretor, portões independentes e crítico). Soma das notas do crítico por rodada: 24, 25 (a v1 do piloto somava 16). Última avaliação: {"qualidade":4,"originalidade":4,"execucao":4,"funcionalidade":4,"estilo":5,"desenho":4}.

### Desvios do construtor em relação a este desenho

- (rodada 1) Hero (chapa) em lg ou mais: uma coluna, e não duas (minmax(0,1fr) e 27,5rem, com o lanche de 440 px à direita). O h1 fica numa linha só, de ponta a ponta, no alto da chapa, e o lanche fica no centro, apoiado na beira da frente de inox (23,75rem em xl e 21,25rem em lg; sizes da imagem: 380/340/320/240). Motivo: a fatia-1440-01 repetia o hero dividido da v1 (título à esquerda, foto à direita), a lição 1 do piloto. Em 390 nada mudou: h1, lanche de 240 px, frente. Altura do hero em 1440: 622 px, e o trilho e o alto do cupom aparecem na dobra de 900.
- (rodada 1) Token novo --esq-chapa-marcas: o mesmo desenho de --esq-chapa-riscos (as marcas da espátula), centrado no lanche (50% 80%) e não em 70% 60%. O --esq-chapa-riscos aprovado continua no _tokens.scss, mas não é mais usado.
- (rodada 1) Título do expositor: 'No expositor' (textos.js, provisório), e não 'Bebidas e sobremesas', que fica com o material pela decisão de 21/11/2026. A troca está registrada num comentário do textos.js. Os h3 das prateleiras continuam com os rótulos reais de CATEGORIAS.
- (rodada 1) Comprimento em 390: abaixo de md, as linhas do ticket de cada comanda deitada param na quarta, com reticências (-webkit-line-clamp: 4, na altura da foto de 96 px). O leitor de tela lê a lista inteira, e o Personalizar mostra todos os ingredientes. O row-gap das comandas abaixo de md caiu para --space-6. A página tem 5.159 px em 390 (5.228 em 360). O desenho estimava 4.850 com as linhas inteiras; sem o corte, a medida passava de 5.600.
- (rodada 1) Prendedor de inox no ::after do li (o gancho), e não no ::before do article: o article tem filter (drop-shadow), que cria um contexto de empilhamento, e o prendedor ficaria embaixo do trilho (z 2). Token novo --esq-z-prendedor (4).
- (rodada 1) textos.js: TEXTOS.cupom.ocultos é a string 'no carrinho' (a linha mostra '+ {formatItemCount} no carrinho'). Os adicionais são as duas palavras 'adicional' e 'adicionais', para o contar() do useCardapio. As funções do desenho ficaram de fora porque o P15 só lê strings. Os textos reais de outras telas ('Seu carrinho', 'Seu carrinho está vazio', o texto do vazio, 'Itens do carrinho', 'Subtotal', 'Ingredientes', 'Adicionar', 'Adicionado', 'Nada nesta categoria por enquanto') também estão no textos.js, com '// provisório (o mesmo do <arquivo>)', porque o P15 não lê CartView, OrderSummary, ModalAdditional, ProductCard nem MenuView.
- (rodada 1) Rodapé: rótulo e valor separados, sem o '·' de CONTATOS. 'WhatsApp' e 'E-mail' são rótulos provisórios do textos.js; os valores vêm de TELEFONE e EMAIL, e o link e o ícone, de CONTATOS. As colunas da placa em lg são 'minmax(0,1fr) auto minmax(0,1.25fr)', e não 3 colunas iguais, para o horário caber numa linha e o e-mail não quebrar no meio. O link tem 1rem e overflow-wrap: break-word.
- (rodada 1) EsqBotao: o anel de foco usa outline-offset de 2 × --focus-offset (6 px). Com 3 px, o anel cor de tinta encostava no aro escuro de 3 px do botão e não se distinguia dele (estado-cardapio-foco.png); agora uma fresta da superfície separa os dois.
- (rodada 1) Tokens além dos do desenho: --esq-impressora-escuro, a cor chapada do ponto mais escuro da carcaça, porque o P5 não mede degradê e o par de foco precisa dela; --esq-sombra-impressora; --esq-filtro-papel, uma sombra mais curta que a da comanda, para o papel junto da fenda; --esq-z-carimbo.
- (rodada 1) Carimbo e foto: o carimbo fica na mesma área de grade das linhas, sobreposto, sem transform para centrar, porque o P14 reprova transform com movimento reduzido. No item do expositor, o nome e o preço têm grid-row explícito, porque sem ele o carimbo invisível empurrava o texto para baixo. O EsqFoto passa a proporção numa propriedade --esq-foto-proporcao, e não no style aspect-ratio, para a comanda trocar por mídia: 1:1 deitada e 4:3 em pé.
- (rodada 1) ficha.js: editei só os `desvios`. O do movimento reduzido ficou 'comandas e carimbo', com ±0,75° e −8°, e entrou 'Títulos de seção gravados, sem placa: a placa fica só na marca, que é clicável [E15]'. A `tese` não mudou, porque o pacote só libera os desvios (ver pedidos).
- (rodada 2) Chapa (5.1): voltou às duas colunas do desenho a partir de lg. A grade é minmax(0,1fr) + 23,75rem (380 px) em lg e + 27,5rem (440 px) em xl, com column-gap --space-6/--space-7, align-items: center (o h1 fica centrado na altura do lanche) e padding --space-7/--space-6. O texto e o botão ficam na frente de inox. O comentário 'Sem o hero dividido da v1' saiu do SCSS. Medido: em 1440, h1 de 648 px em 2 linhas e lanche de 440x415; em 1024, h1 de 548 px em 2 linhas e lanche de 380 px; hero de 610 px em 1440, e o título 'Hambúrgueres' e o trilho continuam acima da dobra. O sizes da imagem passou a 440/380/320/240 px, como no desenho.
- (rodada 2) Chapa: a partir de lg, o fundo usa --esq-chapa-riscos (anéis em 70% 60%, em volta do lanche à direita), como lista o desenho. Abaixo de lg, fica o --esq-chapa-marcas (50% 80%), com o lanche centralizado e apoiado na beira da frente (margem negativa); a partir de lg, essa margem é 0, e o lanche fica sobre a chapa com a sombra de contato.
- (rodada 2) Cupom vazio (5.4 e seção 13 do desenho): a impressora parada fica sem botão. O 'Ver cardápio' repetia o CTA da chapa na mesma tela de 1440 (apontado pelo crítico), e as comandas já ficam ao lado. Agora o slot 'acao' só aparece com itens ('Ver carrinho' → /cart), e o EsqImpressora só renderiza .esq-impressora__acao quando o slot existe. O caminho para /menu dentro do main continua só pelo 'Ver cardápio' da chapa. O teste de contrato confere isso: um único main a[href="/menu"] e nenhum link no cupom vazio. Na seção 13, o desenho deve trocar 'no hero e no cupom vazio' por 'no hero'.
- (rodada 2) Capturas do cupom com itens: as fatias dos portões abrem com o carrinho vazio, e o estado-adicionado recorta a comanda. Por isso, um script próprio (scratchpad/r2/esq-cupom/capturar.mjs) grava em saida/esqueumorfismo/r2, logo depois de um 'Adicionar' pelo modal Personalizar real: estado-cupom-1-item-1440.png e estado-cupom-1-item-390.png (Cheese Bacon 'Sem tomate' e '+1 bacon', LED aceso, subtotal e 'Ver carrinho'); estado-cupom-4-itens-1440.png e estado-cupom-4-itens-390.png (4 linhas: '+ 1 item no carrinho', Smash Burger, '2× Coca Cola Lata' com 'cada' e Sorvete com '+1 calda de chocolate', subtotal); e estado-cupom-imprimindo-1440.png (o LED no meio da piscada). Em 1440, as capturas são da janela inteira, com o cupom fixo ao lado das comandas e, na de 4 itens, ao lado do expositor.

### O que o crítico deixou na última rodada

- (menor) rodada anterior, item 1 (cupom) / estado-cupom-1-item-1440, estado-cupom-4-itens-1440 e 390, estado-cupom-imprimindo-1440: Resolvido. O cupom aparece com 1 item (com retirada e adicional recuados) e com 4 linhas ("+ 1 item no carrinho", "cada", subtotal R$ 77,87 que fecha com os itens), o LED aceso e "Ver carrinho", em 1440 e em 390. No vazio, o segundo "Ver cardápio" saiu. Falta só uma coisa: essas 5 capturas estão na pasta mas não na lista do resultado.json nem no pedido. Inclua-as na lista de capturas, para a próxima rodada não as perder.
- (menor) rodada anterior, item 2 (hero) / fatia-1440-01, janela-1024: Resolvido. A chapa tem duas colunas em 1440 e em 1024, com o h1 centrado na vertical ao lado do lanche, e a frente de inox fica em linha. O título "Hambúrgueres" e o trilho aparecem antes da dobra em 1440 e em 390.
- (menor) cupom vazio e expositor / EsqSecaoCupom.vue, textos.js: Dois desvios do desenho ficaram registrados só em comentários do código, e não no desenho: o cupom vazio perdeu o botão "Ver cardápio" (o desenho, nas seções 5.4, 8 e 13, ainda o pede) e o título do expositor virou "No expositor". Os dois melhoram o resultado, mas é o mesmo defeito de registro apontado na rodada passada. Atualize o desenho (5.3, 5.4, teste sugerido e seção 13) com o motivo de cada um.
- (menor) expositor, carimbo / estado-cupom-4-itens-1440: Na etiqueta estreita do sorvete, o carimbo "Adicionado" cobre o nome e o preço ("R$ 12,90" fica ilegível sob o vermelho). Na comanda, ele cai sobre as linhas de ingredientes, que não fazem falta. Na etiqueta pequena, ancore o carimbo abaixo do preço ou sobre a área vazia da etiqueta.
- (menor) comandas em 390 / fatia-390-02 e 03: A lista de ingredientes é cortada em 4 linhas, com a reticência colada no último item ("Bacon…", "Alface…"). Isso parece palavra cortada e esconde 3 ou 4 ingredientes que em 1440 aparecem inteiros. Ponha a reticência numa linha própria ("- …") ou mostre a lista inteira.
- (menor) rodapé em 390 / fatia-390-06: Com a placa centralizada, o ícone de localização fica preso na borda esquerda, longe do endereço centralizado, enquanto os ícones de telefone e e-mail acompanham o texto. Centralize o ícone junto do endereço, como nos outros contatos.
