# Desenho da Home: Material 3 Expressive, rodada 2 ("Alface")

A Home nova do estilo `material` (`#/direcoes/material`, só no `yarn dev`). O desenho parte da identidade aprovada na rodada 1 (`src/direcoes/estilos/material/ficha.js` e `_tokens.scss`), do dossiê `docs/direcoes/pesquisa/material.md` (fontes [25] a [87]), da seção do estilo em `docs/direcoes/PESQUISA.md` (fontes [1] a [36]), das galerias e da pesquisa transversal `docs/direcoes/pesquisa/home-delivery.md` (fontes [H1] a [H45]).

**Resumo:** cinco seções (`hero`, `lanches`, `monte-o-seu`, `bebidas-e-sobremesas`, `onde`), a navegação numa toolbar flutuante em pílula com o FAB do carrinho e 11 componentes próprios.

**Etapa 5a (21/11/2026):**

- entrou `monte-o-seu`: os adicionais de lanche e de sobremesa em chips estáticos, com o acréscimo e o caminho para o cardápio, sem componente novo (5.5);
- saiu a linha "7 adicionais" do Sorvete de Pote, em `bebidas-e-sobremesas`, que repetiria os 7 chips de sobremesa logo acima. É a única mudança numa seção que já existia (5.3);
- a sexta seção pedida, o carrossel multi-browse, fica **fora até haver fotos reais que não sejam de produto**. Toda imagem real que serviria já está na Home (as 11 fotos de produto e o recorte do hero) ou é um banner único (5.6);
- o usuário escolheu ficar com **5 seções** (SPEC-material §0.2, "Resultado do desenho");
- o `vue3-carousel` não serve ao carrossel, se ele voltar, e sai na limpeza (decisão i, 5.6).

**A ousadia fica num lugar só, o hero:**

- o disco de 12 lobos em `primary`, enorme e cortado pela borda de um contêiner `primary-container` de canto 48;
- na entrada, a prensa: um círculo é achatado e troca de forma para o disco, com mola, uma vez, só com o movimento liberado.

O resto é quieto: superfícies tonais, listas segmentadas e cards sem sombra.

---

## 1. Tese

**Mantida, com um acréscimo.**

- **A tese aprovada continua:**
  - a marca vira sistema: a semente alface gera os papéis de cor em pares [1][5];
  - o Expressive soma molas, troca de forma e tipografia enfatizada [25];
  - a forma de 12 lobos é a folha atrás do lanche.
- **O acréscimo:**
  - **A troca de forma conta a prensa do smash.** No catálogo do Expressive, cantos e formas servem a botões que mudam de forma e a momentos de destaque [66]. O Androidify, um app publicado, usa a forma de biscoito no botão principal e transições com troca de forma [67]. O hero passa a ser esse momento: o círculo (a bola de carne) é achatado e vira o disco de 12 lobos. O guia de níveis de expressão chama isso de hero moment do nível excelente [65]; é um guia de relógio, usado aqui como referência de intenção.
  - **A contenção organiza a página.** Os contêineres agrupados dividem o espaço para criar hierarquia [66], e o Google relata que a contenção de alto contraste ajuda o uso [26]. O padrão é recorrente nos apps do Google [81].
  - **A navegação vira a toolbar flutuante, recorrente no Expressive** [57][83][81][67]. O uso dela como navegação é disputado [83]. Por isso os rótulos ficam visíveis [26], e a toolbar se ancora no topo a partir de `lg`.
- **Identidade sem mudança:** cores, tipografia (Roboto na escala do M3), forma cookie e molas continuam. Nada entra em `desvios` da ficha. Os tokens novos são formas e medidas do próprio M3 ([6][7][8]) e de layout.

### O que mudou da rodada 1

| Na v1 | Na v2 | Por quê |
|---|---|---|
| Top app bar com primary tabs; no celular, menu escondido atrás de um botão | Toolbar flutuante em pílula com os três links sempre visíveis e o FAB do carrinho, presa embaixo à direita abaixo de `lg`. A partir de `lg`, a mesma pílula fica ancorada no topo, no cabeçalho fixo | Toolbar flutuante [57][83][81][67]. A navegação escondida piora a descoberta, e com 4 links ou menos o NN/g pede deixá-los visíveis [H14]. A barra persiste na rolagem [H15]. No desktop, o carrinho fica no canto superior direito [H35] |
| Hero sobre a superfície, disco claro (`primary-container`) de 32,5 rem, giro de entrada | Hero dentro de um contêiner `primary-container` de canto 48. O disco passa a `primary`, cresce e é cortado pela borda. Na entrada, a prensa (círculo → 12 lobos) | Hero moment [65], contenção [66][26], troca de forma [67][70] |
| Botão "Ver cardápio" L (96 px) no desktop | Botão M (56 px) em todas as larguras | O risco da ficha era o botão L "dominar o hero". Agora o momento expressivo é a forma, e o M continua o maior controle da página |
| Carrossel "Mais pedidos" (7 lanches, setas, pontos) | Feed "Hambúrgueres": os 7 à vista numa grade, com o lanche "Smash Burger" maior e o split button em cada card | Layout feed com destaque pelo tamanho [64]. O título "Mais pedidos" alega popularidade sem dado [H25]. Carrossel esconde conteúdo [H6][H9][H10][75] |
| "Adicionar" filled simples; o card ganhava elevação no hover | Split button: "Adicionar" e a metade de trás que abre os ingredientes. O card não reage ao hover | Split button [55]; "hover em todo card" é padrão genérico |
| Rodapé com endereço, contatos, horário e redes | Horário e contatos sobem para a seção `onde`. As redes saem. O rodapé fica com a marca, a descrição e os direitos | As redes apontam para links genéricos (`facebook.com`, `instagram.com`), o que mina a credibilidade [H25][H26] |
| Sem bebidas e sobremesas na Home | Seção `bebidas-e-sobremesas` em lista segmentada | Mostrar a variedade [H21][H22]. O `/menu` abre sempre em Hambúrgueres |
| `vue3-carousel` e a paginação em pílulas | Sem carrossel | Não há mais carrossel na Home |
| (5a) Sem os adicionais na Home: só a contagem "7 adicionais" sob o Sorvete de Pote | Seção `monte-o-seu`: os 5 adicionais de lanche e os 7 de sobremesa em chips estáticos, com o acréscimo ("+ R$ 3,50") e o "Ver cardápio". A linha "7 adicionais" sai da lista | Pedido do usuário (SPEC-material §0.2); a personalização descrita antes do item [H24][H23]; chips em canto small [7] |
| (5a) Sem carrossel (rodada 2) | Continua sem carrossel: fica fora até haver fotos reais que não sejam de produto (5.6). A técnica fica definida para quando houver. O usuário escolheu ficar com 5 seções (SPEC-material §0.2, "Resultado do desenho") | A §0.2 proíbe repetir o feed e a lista, e toda imagem real que serviria já está na Home (as 11 fotos de produto e o recorte do hero) ou é um banner único (seção 2, "Etapa 5a") |
| (5a) `vue3-carousel` instalado e sem uso | Um carrossel futuro é feito à mão (`scroll-snap` e dois botões); o pacote sai na limpeza (decisão i) | No efeito slide, o pacote move o trilho por `transform` mesmo com movimento reduzido e desabilita os botões das pontas com `disabled` (5.6) |

Seções que a v1 não tinha: `bebidas-e-sobremesas`, `onde` e, desde a etapa 5a, `monte-o-seu` (e `lanches` troca o carrossel por outro padrão).

---

## 2. Processo: plano e revisão

### Sistema (identidade aprovada, sem mudança)

- **Cores, em papéis do M3:**
  - Alface (`primary`) #3a693b;
  - Alface clara (`primary-container`) #bbf0b6;
  - Fundo (`surface`) #f7fbf1;
  - Contêiner (`surface-container`) #ebefe6;
  - Tinta (`on-surface`) #181d17;
  - Badge (`error`) #ba1a1a.
- **Tipo:** Roboto Variable, uma família só, na escala do M3:
  - display em peso 500, enfatizado;
  - headline e body em 400;
  - title e label em 500.
- **Layout:** texto sempre alinhado à esquerda; grade de 4, 3 e 2 colunas no feed; contêineres de canto grande sobre superfícies que contrastam.

### Plano (primeira passada)

1. Search app bar no topo, com sugestões do cardápio [62][81].
2. Hero como na v1, com o disco claro e o botão L.
3. Filtro de categorias em grupo conectado [54], trocando a grade.
4. Carrossel multi-browse [34] com os lanches.
5. Split button com um menu de adicionais e os preços [55].
6. FAB menu de contato (WhatsApp, e-mail, mapa) [56].
7. Rodapé com redes e contatos.

### Revisão contra o pedido (o que saiu genérico, repetido ou inviável, e foi trocado)

- **Search app bar: saiu.** A documentação recomenda a busca quando ela é o foco do app [62], o que não vale para uma loja de 11 itens. Seria também uma função nova.
- **Hero da v1: trocado.** Repetiria a composição da v1, e o botão L era o risco da ficha. Ganhou contêiner, disco em `primary` cortado pela borda e a prensa; a ação foi para M.
- **Grupo conectado de categorias: saiu.**
  - A troca de categoria por segmentos aparece no catálogo de outros estilos (segmentado do neumorfismo, pivot do flat) e seria repetição.
  - Esconder bebidas e sobremesas atrás de uma aba reduz a variedade à vista [H21].
  - No lugar dele, os lanches ficam no feed, e as bebidas e a sobremesa numa lista própria.
- **Carrossel multi-browse: saiu.** A v1 já era carrossel. Não há produto publicado com o multi-browse [34], e o carrossel esconde conteúdo [75][H6][H9]. Ficou o feed com destaque pelo tamanho [64].
- **Menu de adicionais no split button: trocado.** O menu enganaria: o modal Personalizar abre com os adicionais zerados, e a Batata Frita nem tem adicionais no modal (`isBurger` em `BurgerStack.vue`). A metade de trás passou a abrir o "card" de ingredientes do próprio produto, que a documentação aceita no lugar do menu [55].
- **FAB menu de contato: saiu.** Escondia os contatos atrás de um toque, e o Baymard pede cautela com elemento fixo no celular [H35]. Os contatos foram para uma lista agrupada sempre aberta.
- **Redes no rodapé: saíram** (links genéricos [H25][H26]).

### Etapa 5a (21/11/2026): duas seções novas

**O pedido** (SPEC-material §0.2):

- a Home passa de 4 para 6 seções;
- a preferência do usuário é o "Monte o seu" (os adicionais de lanche e de sobremesa com o preço, em chips [60], levando ao cardápio) e o carrossel multi-browse [34];
- o carrossel não gira sozinho, tem Anterior e Próximo, a espiada do próximo e os itens na ordem do `products.json`, e não repete o que o feed e a lista já mostram.

**Sistema da seção nova** (dentro da identidade aprovada; nenhuma cor nova):

- **Cores:**
  - Fundo (`surface`) #f7fbf1;
  - Tinta (`on-surface`) #181d17;
  - Apoio (`on-surface-variant`) #424940;
  - Chip (`tertiary-container`) #bcebf1;
  - Tinta do chip (`on-tertiary-container`) #1f4d53.
- **Tipo:** Roboto; `h2` em headline-m (headline-s no celular); `h3` em title-m 500; chip em label-l (nome em 500, acréscimo em 400, tabular).
- **Layout:** tudo alinhado à esquerda. A seção fica na superfície, sem contêiner, entre o feed e a faixa. Os dois grupos ficam lado a lado em 7/5 a partir de `lg`, alinhados com as colunas da faixa logo abaixo, e empilhados abaixo de `lg`.
- **Princípio:** o chip se lê como informação, e não como ação, por vários sinais juntos:
  - a cor: fora o círculo do ícone do horário (que também é informação, 5.4), é o único fundo `tertiary-container` da Home, e nenhuma ação usa essa cor;
  - a falta de camada de estado, de cursor de ação e de foco;
  - os 32 px de altura, abaixo dos 44 px de toda ação da página;
  - a marcação de lista e o acréscimo "+ R$", a notação do modal.
- **A forma não separa:** o canto small (8) também está na marca do cabeçalho, o FAB é um quadrado arredondado, e os links de `onde` são linhas de cantos 20/4. A volta 1 corrigiu a frase "toda ação é pílula", que era falsa.

#### Plano (primeira passada)

1. **Carrossel multi-browse** logo depois do feed, com as fotos em 1440 dos 7 lanches, o nome e o preço, no `vue3-carousel` com o `configCarrossel` do `compartilhado/`.
2. **"Monte o seu" com filter chips** [60]: os 12 adicionais; tocar num chip marcaria os lanches que o aceitam.
3. **Contêiner `surface-container-low`** de canto 28, com o `h2` e um "Ver cardápio" à direita, como no feed.
4. **Grupos com os rótulos reais** "Hambúrgueres" e "Sobremesas", cada um com a contagem ("5 adicionais", "7 adicionais").
5. **Preço no chip** como "R$ 3,50".

#### Revisão contra o pedido (o que saiu repetido, inventado ou inviável, e o que entrou)

- **Carrossel com os 7 lanches: saiu.** Repete o feed (as mesmas fotos, o nome e o preço) e a v1. Os outros conteúdos reais também não passam (tabela de 5.6). O usuário escolheu ficar com 5 seções.
- **`vue3-carousel`: trocado,** para quando houver carrossel, por `scroll-snap` e dois botões. O pacote move o trilho com `transform` mesmo com movimento reduzido e põe `disabled` nos botões das pontas (5.6).
- **Filter chips: trocados por chips estáticos.**
  - Filtrar não tem função real: os 5 adicionais de lanche valem para os mesmos 6 hambúrgueres, e o filtro daria sempre a mesma lista.
  - Um chip que se toca sugeriria que o adicional já fica escolhido, e o modal abre com os adicionais zerados.
- **Contêiner com o "Ver cardápio" à direita: trocado.** Repetiria o cabeçalho do feed, logo acima, e os dois contêineres da faixa, logo abaixo. A seção fica na superfície, e o link vai para o fim dela.
- **Rótulo "Hambúrgueres" no grupo: trocado.** O rótulo real inclui a Batata Frita, que não tem adicionais no modal (`isBurger` em `BurgerStack.vue`). Entram os rótulos provisórios "No hambúrguer" e "Na sobremesa".
- **Contagem nos grupos: saiu.** Os chips ficam todos à vista, e "5 adicionais" repetiria o que se conta na tela. O juiz tirou o "7 itens" do feed pelo mesmo motivo (seção 13).
- **"R$ 3,50" sozinho: trocado por "+ R$ 3,50".** O preço sozinho se lê como o preço de comprar o bacon. O "+" é a notação do próprio modal (`AdditionalsList.vue`).
- **O que entrou:** a `FRASE_CARDAPIO` ("Escolha, personalize e peça."), real, sob o `h2`. Ela diz quando os adicionais se escolhem, sem texto novo.

#### Volta 1 do revisor e do juiz (21/11/2026)

O revisor e o juiz de distinção aprovaram sem bloqueante; a sessão principal decidiu cada item. O que mudou:

- **Motivo do carrossel:** a regra 2 do teste passou a ser "o que for vital também aparece fora do carrossel". Quem barra é a §0.2 com a falta de imagens: toda imagem real que serviria já está na Home ou é um banner único (5.6). A tabela de 5.6 ganhou os conteúdos que o juiz testou.
- **Chip que pode parecer selecionável:** saíram as frases "na Home, toda ação é pílula" e "nada sugere escolha". A separação vem da cor, da falta de camada e de foco, da altura, da marcação de lista e do "+ R$". O risco fica aceito, com a conferência do crítico e uma reserva (seção 11).
- **Linha "7 adicionais":** sai de `bebidas-e-sobremesas` (5.3), porque repetiria os 7 chips de sobremesa logo acima.
- **Marcas dos grupos (o cookie e a flor):** saíram. Repetiam o esquema da lista vizinha (círculo e flor), espalhavam o cookie do hero e usariam o `--m3-tertiary`, que a Home não usa direto (SPEC-material §2.2).
- **Grade dos grupos:** passou de 5/7 a partir de `md` para 7/5 a partir de `lg`, com o vão da faixa (`--space-5`), e empilhada abaixo.
- **Canto do chip:** cita só o [7]; o 12 dp do filter chip do Expressive [60] ficou de fora de propósito.
- **Par de contraste:** em vez de um par novo, o par que já existe sobe de 3 para 4,5.
- **Terceiro "Ver cardápio":** fica pela §0.2; saiu o argumento da distância em 390, que ignorava o "Cardápio" da toolbar.
- **`carrossel.js`, técnica do carrossel e testes:** corrigidos em 5.6 e na seção 9.

#### As três objeções da rodada 2 ao carrossel

| Objeção | O que mudaria se o carrossel voltasse | O que fica |
|---|---|---|
| 1. A v1 já era carrossel ("Mais pedidos", 7 lanches, setas e pontos) | A forma e os controles: multi-browse, sem pontos [75], sem volta ao início, Anterior e Próximo com `aria-disabled`, rótulo "n de N" e título sem alegar popularidade [H25] | O conteúdo. As únicas imagens de conteúdo são as 11 fotos de produto, e um carrossel delas voltaria a mostrar os lanches da v1. **A objeção continua de pé** |
| 2. Não há produto publicado com o multi-browse [34] | Nada: continua sem exemplo publicado (dossiê, "Não encontrei") | Risco aceito pelo pedido do usuário, como o split button [55] e o feed [64], que também são só documentação (seção 10). Sozinha, ela não barra |
| 3. O carrossel esconde conteúdo [75][H6][H9] | Até 5 quadros [75], de 3 a 4 passos até o fim [H9], a espiada do próximo e os controles grandes dentro do carrossel; o que for vital (produto, preço, "Adicionar") também aparece fora dele [H6][H7] | **Resolve-se pela forma.** Quem barra o carrossel é a §0.2 (não repetir o feed nem a lista) com a falta de fotos reais que não sejam de produto (5.6) |

O §12 ("Fora") e a tabela "O que mudou da rodada 1" seguem esta resposta: o carrossel fica fora até haver fotos reais que não sejam de produto.

#### Desenho final da etapa

- **`monte-o-seu` (5.5): confirmada.** O dossiê a lista como viável sem inventar (catálogo de seções, "'Monte o seu': adicionais em chips"), e a pesquisa transversal também ("Monte do seu jeito", [H24][H23]).
- **Carrossel (5.6): não confirmado.** Pela §0.2, a troca seria outra candidata viável do catálogo do material, mas nenhuma das viáveis é nova na Home (5.6, "Troca").
- **Decisão do usuário (21/11/2026):** a Home fica com **5 seções** (saída 1 de 5.6; SPEC-material §0.2, "Resultado do desenho").

#### Distinção

| Comparação | Por que `monte-o-seu` não repete |
|---|---|
| `lanches` e `bebidas-e-sobremesas` | Não mostra produto, foto, preço de produto nem "Adicionar": mostra os acréscimos, que hoje só aparecem dentro do modal |
| A linha "7 adicionais" do Sorvete de Pote | Saiu na volta 1: com os 7 chips de sobremesa logo acima, a contagem repetiria o que a seção mostra (5.3) |
| `onde` | Não é lista segmentada nem link |
| Neumorfismo: a régua de adicionais do `painel` | É o parente mais próximo no acervo: os 5 adicionais de lanche com preço numa faixa afundada, dentro do aparelho. Aqui são os 12 (os 7 de sobremesa não aparecem no acervo), em chips separados, em dois grupos, numa seção própria que leva ao cardápio. O juiz aprovou na volta 1, com a nota de que o chip não pode virar texto solto numa faixa (5.5) |
| Esqueumorfismo | A bancada de adicionais saiu na revisão do juiz (desenho de lá, seção 16); o `expositor` mostra só a contagem na etiqueta do sorvete |

---

## 3. Composição

Ordem dos blocos:

1. **Cabeçalho** (`M3BarraSuperior`, slot `#topo`): a marca. Dentro dele vai a `M3BarraFerramentas`, flutuante embaixo abaixo de `lg` e ancorada à direita do cabeçalho a partir de `lg`.
2. **`hero`**, a ousadia: título, texto e "Ver cardápio" à esquerda; à direita, o disco de 12 lobos com o recorte do lanche, tudo num contêiner `primary-container`.
3. **`lanches`**: o feed "Hambúrgueres", com o link para o cardápio e os 7 cards. O "Smash Burger" ocupa duas colunas.
4. **`monte-o-seu`** (etapa 5a): os adicionais em chips, em dois grupos, e o "Ver cardápio". Fica entre o feed e a faixa: logo depois dos hambúrgueres que levam os adicionais de lanche. A partir de `lg`, os grupos (7/5) alinham com as colunas da faixa logo abaixo.
5. **`bebidas-e-sobremesas`**: lista segmentada num contêiner, com as bebidas e a sobremesa.
6. **`onde`**: lista agrupada com o horário, o endereço, o WhatsApp e o e-mail.
7. **Rodapé** (`M3Rodape`, slot `#rodape`): marca, descrição e direitos. Depois vem a `AssinaturaEncaixe` (da moldura).

As seções 5 e 6 ficam lado a lado a partir de `lg` (7 e 5 colunas de 12), dentro de um `div.m3-faixa` na `HomeMaterial.vue`; abaixo de `lg` ficam empilhadas.

**Sexta seção:** não há. O usuário escolheu ficar com 5 seções (SPEC-material §0.2, "Resultado do desenho"). Se um dia entrar um carrossel, com fotos reais que não sejam de produto (5.6), o lugar sugerido é entre `monte-o-seu` e a faixa: os adicionais de lanche continuam colados no feed, e `onde` continua sendo o último bloco antes do rodapé [H30].

**Ritmo vertical:** `--space-8` entre seções a partir de `lg` e `--space-7` abaixo. O hero termina antes da dobra de 900 px em 1440, e o cabeçalho do feed aparece acima dela [H2][H3].

### Wireframe em 1440

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ header (fixo, 64 px, surface opaca)                                                            │
│ Smash Burger                                   ( ⌂ Início | ⑂ Cardápio | ◯ Entrar )  [🛒 2]     │
│                                                  pílula surface-container, Início em            │
│                                                  secondary-container                FAB 48      │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│ [hero]  contêiner primary-container, canto 48, 75 rem                                           │
│ ╭─────────────────────────────────────────────────────────────────────────────────────────────╮ │
│ │                                                         ▄▄▄██████████████▄▄▄                │ │
│ │  Smash na chapa,              display-l 57/64, 500   ▄██▀  disco 12 lobos    ▀██▄▄          │ │
│ │  entregue quente                                    ██     (primary, 46 rem)      ██        │ │
│ │                                                    ██   ╭── recorte do lanche ──╮   █ ←borda│ │
│ │  Hambúrgueres artesanais prensados na hora.        ██   │       35 rem          │   █  corta│ │
│ │  De terça a sexta, das 13h à 01h.                   ██  ╰───────────────────────╯  █        │ │
│ │                                                      ▀██▄                        ▄█         │ │
│ │  ( Ver cardápio )   botão M filled, 56 px               ▀▀██▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄██▀▀  ← corta   │ │
│ ╰─────────────────────────────────────────────────────────────────────────────────────────────╯ │
│                                                                                                 │
│ [lanches]                                                                                       │
│ Hambúrgueres                    headline-m 28/36, sem texto de apoio          [ Ver cardápio ]  │
│ ┌──────────── Smash Burger (2 colunas) ─────────────┐ ┌──── card ───────┐ ┌──── card ───────┐   │
│ │  ✺✺✺✺✺✺✺✺       Smash Burger      headline-s       │ │ ╭ foto 4:3 ─╮   │ │ ╭ foto 4:3 ─╮   │   │
│ │ ✺ foto no  ✺    Hambúrguer artesanal com queijo,   │ │ ╰ canto 28 ─╯   │ │ ╰───────────╯   │   │
│ │ ✺ cookie,  ✺    cebola caramelizada, alface…       │ │ Cheese Bacon    │ │ Veggie Burger   │   │
│ │ ✺ quadrada ✺    R$ 22,50          title-l          │ │ descrição, 2 l. │ │ descrição, 2 l. │   │
│ │  ✺✺✺✺✺✺✺✺       (Adicionar ┃⌄)  split M, 56 px     │ │ R$ 25,99        │ │ R$ 24,90        │   │
│ └────────────────────────────────────────────────────┘ │ (Adicionar┃⌄)   │ │ (Adicionar┃⌄)   │   │
│                                                        └─────────────────┘ └─────────────────┘   │
│ ┌──── card ───────┐ ┌──── card ───────┐ ┌──── card ───────┐ ┌──── card ───────┐                 │
│ │ X-Salada        │ │ Chicken Burger  │ │ Burger Picanha  │ │ Batata Frita    │                 │
│ │ (Adicionar┃⌄)   │ │ (Adicionar┃⌄)   │ │ (Adicionar┃⌄)   │ │ (Adicionar┃⌄)   │                 │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘                 │
│                                                                                                 │
│ [bebidas-e-sobremesas] 7/12              │ [onde] 5/12                                          │
│ ╭ surface-container-low, canto 28 ─────╮ │ ╭ surface-container-low, canto 28 ──────────────╮    │
│ │ Bebidas e sobremesas   headline-s     │ │ │ Onde e quando        headline-s               │    │
│ │ Bebidas (h3)                          │ │ │ ╭ (◷) Horário                                 ╮│    │
│ │ ╭ ◯ Copo de Refrigerante  R$ 5,99 [Adicionar] ╮ │ │   Terça a sexta, das 13h à 01h          ││    │
│ │ │ ◯ Coca Cola Lata        R$ 4,99 [Adicionar] │ │ ├ (⌖) Endereço                        ↗  ┤│    │
│ │ ╰ ◯ Suco de Abacaxi       R$ 7,99 [Adicionar] ╯ │ │   Rua Beira da Praia - Navegantes, SC   ││    │
│ │ Sobremesas (h3)                       │ │ ├ (☏) WhatsApp                        ↗  ┤│    │
│ │ ╭ ✿ Sorvete de Pote                   │ │ │   +55 47 5 6355 3265                    ││    │
│ │ ╰               R$ 12,90 [Adicionar] ╯│ │ ╰ (✉) E-mail  contato@smashburger.com.br ╯│    │
│ ╰───────────────────────────────────────╯ │ ╰───────────────────────────────────────────────╯    │
│                                                                                                 │
│ ╭─ rodapé: surface-container, cantos de cima 28 ─────────────────────────────────────────────╮  │
│ │ Smash Burger                                                                               │  │
│ │ Sabor irresistível em cada mordida. Burgers suculentos, ingredientes frescos…              │  │
│ │ © 2026 Smash Burger · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann              │  │
│ ╰────────────────────────────────────────────────────────────────────────────────────────────╯  │
│ AssinaturaEncaixe (moldura)                                                                     │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

Legenda: `┃` é o vão de 2 px entre as metades do split button; `╭ ├ ╰` marcam os itens de uma lista segmentada (vãos de 2 px; cantos externos de 20, internos de 4). Desde a etapa 5a, o Sorvete de Pote não tem mais a linha "7 adicionais" (5.3), e `monte-o-seu` entra entre o feed e a faixa (trecho abaixo).

### Trecho novo em 1440 (etapa 5a)

O resto da página não muda. As posições vêm da captura `home-1440-full.png` da etapa 5; as quebras dos chips são estimativas pela largura do texto em label-l, e o construtor confere na captura.

```
  … [lanches] sem mudança: cabeçalho, destaque e 6 cards; o feed termina por volta de 1.675 px …
                                                                         ↕ --space-8
  [monte-o-seu]  na superfície, sem contêiner, largura do .container (75 rem); começa por volta de 1.740 px
  Monte o seu                                headline-m 28/36, on-surface
  Escolha, personalize e peça.               body-l, on-surface-variant (FRASE_CARDAPIO)
                                                                         ↕ --space-5
  No hambúrguer                       (7 de 12)                                 │ Na sobremesa       (5 de 12)
  ⟨Bacon + R$ 3,50⟩ ⟨Ovo + R$ 2,50⟩ ⟨Queijo + R$ 2,00⟩ ⟨Queijo Cheddar + R$ 3,00⟩ │ ⟨Calda de Chocolate + R$ 3,00⟩ ⟨Granulado + R$ 1,50⟩
  ⟨Cebola Caramelizada + R$ 2,50⟩                                                │ ⟨Leite Ninho + R$ 1,00⟩ ⟨Paçoca + R$ 1,50⟩ ⟨Nutella + R$ 3,00⟩
                                                                                 │ ⟨Morango + R$ 2,00⟩ ⟨Cereja + R$ 1,50⟩
                                                                         ↕ --space-5
  [ Ver cardápio ]   text button, no fim, alinhado ao início
                                                                         ↕ --space-8
  [bebidas-e-sobremesas] 7/12                                                    │ [onde] 5/12   … sem mudança; a faixa desce para cerca de 2.100 px
```

Grade dos grupos: `minmax(0, 7fr) minmax(0, 5fr)` com `--space-5` entre as colunas, a mesma da faixa (cerca de 690 e 490 px), e `align-items: start`. Os grupos alinham com as colunas da faixa logo abaixo. Estimativa: 2 linhas de chips no grupo de lanche e 3 no de sobremesa.

Legenda do trecho: `⟨ ⟩` é o chip estático (canto 8, `tertiary-container`, 32 px de altura); `│` marca só o vão entre as colunas, sem linha desenhada.

### Wireframe em 390

```
┌──────────────────────────────────┐
│ Smash Burger                     │  header estático, 64 px (só a marca)
├──────────────────────────────────┤
│ ╭ [hero] primary-container, 28 ╮ │
│ │ Smash na chapa,              │ │  display-s 36/44, 2 linhas
│ │ entregue quente              │ │
│ │ Hambúrgueres artesanais      │ │
│ │ prensados na hora. De terça… │ │
│ │ ( Ver cardápio )   M, 56 px  │ │
│ │       ▄▄██████████▄▄         │ │
│ │     ██ ╭ recorte ─╮  ██ ←corta│ │  disco 22 rem, cortado à direita e embaixo
│ │     ██ ╰ 17,5 rem ╯  ██      │ │
│ ╰──────────▀▀██████▀▀──────────╯ │
│ Hambúrgueres    [ Ver cardápio ] │  aparece acima da dobra
│ ┌ Smash Burger (2 colunas) ────┐ │
│ │       ✺ foto cookie ✺        │ │  quadrada, até 15 rem, centrada
│ │ Smash Burger                 │ │
│ │ descrição completa           │ │
│ │ R$ 22,50                     │ │
│ │ (Adicionar ┃⌄)   M           │ │
│ └──────────────────────────────┘ │
│ ┌ card ────────┐┌ card ────────┐ │  2 colunas; sem descrição
│ │ ╭ foto 4:3 ╮ ││ ╭ foto 4:3 ╮ │ │
│ │ Cheese Bacon ││ Veggie Burger│ │
│ │ R$ 25,99     ││ R$ 24,90     │ │
│ │(Adicionar┃⌄)││(Adicionar┃⌄)│ │
│ └──────────────┘└──────────────┘ │
│ … X-Salada, Chicken, Picanha, Batata
│ ╭ [bebidas-e-sobremesas] ──────╮ │
│ │ Bebidas e sobremesas         │ │
│ │ Bebidas                      │ │
│ │ ╭ ◯ Copo de      [Adicionar]╮│ │  preço sob o nome
│ │ │   Refrigerante            ││ │
│ │ │   R$ 5,99                 ││ │
│ │ ├ ◯ Coca Cola Lata …        ┤│ │
│ │ ╰ ◯ Suco de Abacaxi …       ╯│ │
│ │ Sobremesas                   │ │
│ │ ╭ ✿ Sorvete de Pote …       ╮│ │
│ ╰──────────────────────────────╯ │
│ ╭ [onde] ──────────────────────╮ │
│ │ Onde e quando                │ │
│ │ ╭ (◷) Horário / Terça a…    ╮│ │
│ │ ├ (⌖) Endereço / Rua…    ↗  ┤│ │
│ │ ├ (☏) WhatsApp / +55…    ↗  ┤│ │
│ │ ╰ (✉) E-mail / contato@…    ╯│ │
│ ╰──────────────────────────────╯ │
│ ╭ rodapé ──────────────────────╮ │
│ │ Smash Burger / descrição / © │ │
│ ╰──────────────────────────────╯ │
│ AssinaturaEncaixe                │
│ (reserva de 6 rem: a barra não   │
│  cobre a assinatura no fim)      │
│                                  │
│         ╭⌂ ┃⑂ ┃◯ ╮ ╭───╮         │  toolbar flutuante, fixa, à direita:
│         │Início Cardápio Entrar│ │🛒2│ │  pílula 64 px com ícone sobre rótulo,
│         ╰───────────────────╯ ╰───╯  │  FAB 56 px ao lado
└──────────────────────────────────┘
```

### Trecho novo em 390 (etapa 5a)

Posições da captura `home-390-full.png` da etapa 5; quebras estimadas nos 358 px úteis.

```
│ … Batata Frita: o feed termina por volta de 2.050 px
│                                    ↕ --space-7
│ [monte-o-seu]  sem contêiner, de gutter a gutter (cerca de 510 px)
│ Monte o seu                 headline-s 24/32
│ Escolha, personalize e peça.     body-l
│ No hambúrguer               title-m 500
│ ⟨Bacon + R$ 3,50⟩ ⟨Ovo + R$ 2,50⟩
│ ⟨Queijo + R$ 2,00⟩ ⟨Queijo Cheddar + R$ 3,00⟩
│ ⟨Cebola Caramelizada + R$ 2,50⟩
│                                    ↕ --space-5
│ Na sobremesa
│ ⟨Calda de Chocolate + R$ 3,00⟩
│ ⟨Granulado + R$ 1,50⟩ ⟨Leite Ninho + R$ 1,00⟩
│ ⟨Paçoca + R$ 1,50⟩ ⟨Nutella + R$ 3,00⟩
│ ⟨Morango + R$ 2,00⟩ ⟨Cereja + R$ 1,50⟩
│ [ Ver cardápio ]            o único alvo de foco da seção
│                                    ↕ --space-7
│ ╭ [bebidas-e-sobremesas] … começa por volta de 2.660 px; o Sorvete de Pote sem a linha "7 adicionais"
```

A toolbar flutuante continua embaixo à direita; a reserva da barra (`scroll-padding-bottom`) já cobre o "Ver cardápio" quando ele recebe foco.

### Em 1024

O layout é o de 1440, mais estreito:

- **Cabeçalho:** fixo, com a pílula ancorada (a partir de `lg`, 1024 inclusive).
- **Hero:** duas colunas, título em display-m 45/52 (até 3 linhas), disco de 36 rem e recorte de 27 rem.
- **Feed:** 3 colunas. O "Smash Burger" ocupa a linha inteira, na horizontal, e os outros 6 cards formam duas linhas de 3.
- **Monte o seu (5a):** os dois grupos em 7 e 5 colunas, alinhados com a faixa; estimativa de 2 linhas de chips no grupo de lanche e 4 no de sobremesa. A seção tem cerca de 340 px e começa por volta de 2.030 px (captura `home-1024-full.png` da etapa 5).
- **Faixa:** `bebidas-e-sobremesas` e `onde` lado a lado, em 7 e 5 colunas.

Entre `md` e `lg` (768 a 1023 px): a toolbar flutua embaixo, com ícone e rótulo lado a lado; o feed tem 2 colunas, e o destaque fica na linha inteira, na horizontal. Em `monte-o-seu`, os grupos ficam empilhados, como a faixa, com 2 linhas de chips em cada (estimativa).

---

## 4. Navegação (cabeçalho e toolbar, fora das seções)

### `M3BarraSuperior` (slot `#topo`)

- **Objetivo:** dizer onde se está (marca no canto superior esquerdo, com link para a Home [H1]) e dar os três destinos e o carrinho sem menu escondido [H14][H15].
- **Conteúdo:**

  | Campo | Origem |
  |---|---|
  | Marca | `dados.js` → `MARCA`; link para `/direcoes/material` |
  | Links | `useLinksPrincipais("/direcoes/material")` → Início, Cardápio, Entrar ou Perfil |
  | Carrinho | `useContadorCarrinho()` → `rotulo` (nome acessível), `texto` (badge), `quantidade` |

- **Estrutura:** `<header class="m3-cabecalho">` → `RouterLink.m3-marca` e `M3BarraFerramentas` (que contém `<nav aria-label="Principal">` e o FAB).
- **Comportamento:**
  - **abaixo de `lg`:** o cabeçalho é estático (rola com a página), com 64 px e só a marca. A toolbar fica `position: fixed` embaixo à direita (`bottom: calc(var(--space-4) + env(safe-area-inset-bottom))`, `right: var(--gutter)`, `z-index: var(--z-navbar)`). Ela encosta à direita: o FAB fica no canto do polegar, onde o M3 põe o FAB, e o canto esquerdo fica livre para o alternador das direções no `yarn dev`;
  - **a partir de `lg`:** o cabeçalho é `position: sticky; top: 0`, opaco (`--m3-surface`), com `--navbar-h` e sem mudar ao rolar [H17]. A pílula e o FAB ficam à direita, estáticos e sem elevação. O `scroll-padding-top` global do projeto já cobre a altura.
- **Reserva para a barra flutuante (abaixo de `lg`):**
  - o foco não pode ficar coberto [76]: a `HomeMaterial.vue` põe `scroll-padding-bottom: var(--m3-barra-reserva)` no `<html>` com `:global(:root[data-direcao="material"])`, dentro do próprio `<style scoped>` e só abaixo de `lg`. É a técnica C43;
  - a `.moldura` ganha `padding-bottom: var(--m3-barra-reserva)`, para a barra não cobrir a assinatura nem o fim do rodapé.
- **Movimento:**
  - a barra não tem animação de entrada, nem some ao rolar. O Photos para iOS também não esconde a dele [83], e o NN/g prefere nenhuma animação no cabeçalho fixo [H17];
  - o badge entra com a mola espacial rápida em `scale` (só `motion-ok`; reduzido: só opacidade);
  - as camadas de estado mudam por opacidade em 150 ms.

---

## 5. Seções

### 5.1 `hero`: a prensa (a ousadia)

- **Arquivo:** `secoes/M3SecaoHero.vue`, raiz `<section data-secao="hero" aria-labelledby="m3-hero-titulo" class="m3-hero">`.
- **Objetivo:**
  - dizer quem é a casa e o que ela faz, com a ação de pedir à vista [H1];
  - ser o único momento expressivo da página (hero moment [65]): a forma do catálogo como contêiner do lanche [66] e a troca de forma como ênfase [67][70].

**Conteúdo (tudo real):**

| Campo | Origem |
|---|---|
| `h1` | `dados.js` → `HERO.titulo` ("Smash na chapa, entregue quente") |
| Texto | `HERO.texto` (traz o horário) |
| Ação | `HERO.acao` ("Ver cardápio"), `RouterLink` para `/menu` |
| Imagem | `HERO.imagem` (`/images/fundos/banner-burger-bg`) com `IMAGEM_HERO` (WebP com alfa 480 e 960, PNG 960); `HERO.alt`, `HERO.largura` (960) e `HERO.altura` (906) |

Textos provisórios: nenhum.

**Componentes:**

- `M3FormaPrensa`: o disco, a bola e o slot da foto;
- `M3Botao` com `variante="filled"`, `tamanho="m"` e `para="/menu"`.

**Interação e estados:**

- **Botão:** padrão (cantos `full`), hover (fundo `--m3-primary-hover`), foco (anel de 3 px em `--m3-secondary`, afastado 2 px), pressionado (fundo `--m3-primary-pressed`, cantos trocam para `--m3-forma-l`).
- **Formas:** estáticas depois da entrada; não reagem a ponteiro.

**Acessibilidade:**

- **Estrutura:** landmark é a própria `section` (dentro do `main`), com o nome vindo do `h1` (o único da página).
- **Formas:** o disco e a bola são `div` com `aria-hidden="true"`.
- **Foto:** `<picture>` com `<source type="image/webp">`, e o `<img>` com o `alt` real, `loading="eager"`, `fetchpriority="high"`, `decoding="async"` e `width`/`height`.
- **Texto e foto:** o texto nunca fica sobre a foto (colunas próprias; no celular, a foto vem depois do botão) [H5].

**Comportamento:**

- **1440 (`xl`):**
  - **Contêiner:** largura do `.container` (75 rem), fundo `--m3-primary-container`, canto `--m3-forma-xxl` (48), `overflow: clip`, `min-height: 36rem`.
  - **Grade:** 2 colunas (`1fr 1fr`). O texto vem à esquerda, com `padding: var(--space-8)`, e a tinta é `--m3-on-primary-container`.
  - **Tipo e botão:** título display-l 57/64, peso 500, `letter-spacing: -0.015625rem`, até 2 linhas; texto body-l 16/24, máx. 36ch; botão M.
  - **Mídia:**
    - o disco tem 46 rem de diâmetro e fica com o centro deslocado para a direita e para baixo. Cerca de um quarto dele sai pela borda direita, e uma faixa sai por baixo; o contêiner corta;
    - o recorte do lanche tem 35 rem e fica inteiro dentro da parte visível.
  - **Posição:** só por `inset`, `margin` e grade, sem `transform` nem `translate`, porque o P14 reprova qualquer transform com movimento reduzido.
- **1024 (`lg`):**
  - mesmas 2 colunas, `padding: var(--space-7)`;
  - título display-m 45/52, até 3 linhas;
  - disco de 36 rem e recorte de 27 rem.
- **390:**
  - uma coluna; o contêiner vai de gutter a gutter, com canto `--m3-forma-xl` (28) e `padding: var(--space-5)`;
  - título display-s 36/44 (2 linhas medidas; teto de 3);
  - a mídia vem depois do botão, com 18 rem de altura: disco de 22 rem, cortado à direita e embaixo, e recorte de 17,5 rem, inteiro;
  - o cabeçalho do feed aparece acima da dobra de 844 px [H3].
- **`sizes` da foto:** `(min-width: 1280px) 560px, (min-width: 1024px) 432px, (min-width: 768px) 400px, 280px`.

**Movimento:**

- **`motion-ok`, uma vez, ao montar (CSS puro):**
  - **a bola** (`.m3-prensa__bola`, círculo `--m3-forma-full` em `--m3-primary`, com 55% do diâmetro do disco e o mesmo centro):
    - vai de `scale(0.55)` a `scale(1.1, 0.45)` e opacidade 0;
    - leva `--m3-dur-mola-espacial-rapida` com `--m3-ease-standard`: é achatada e some;
  - **o disco** (`.m3-prensa__disco`, `clip-path: var(--m3-forma-cookie)`):
    - vai de `opacity: 0; transform: scale(0.82, 0.62) rotate(-12deg)` a `opacity: 1; transform: none`;
    - leva `--m3-dur-mola-espacial-lenta` com `--m3-mola-espacial-lenta`, com atraso de 120 ms e `animation-fill-mode: both`;
  - a foto do lanche (a LCP) nunca anima. É o único movimento da página que não responde a uma ação;
  - o botão troca de forma por opacidade (`::before` redondo e `::after` com o canto menor), em `--m3-dur-mola-efeitos-rapida`.
- **Reduzido:**
  - a bola não aparece (`display: none` fora de `motion-ok`), e o disco fica estático, com opacidade 1;
  - a troca de forma do botão segue por opacidade em até `--dur-fast`;
  - nenhum `transform`.
- **Sem:** paralaxe, rolagem atrelada ou repetição.

**Reserva:**

- **Cardápio editado:** não afeta o hero, porque a imagem e os textos são fixos (`dados.js`).
- **Foto que falha:** o disco fica sozinho e o `alt` continua no `<img>`.
- **`forced-colors`:** o disco é decorativo e pode sumir no modo de cores forçadas, e o texto e o botão continuam.

### 5.2 `lanches`: o feed "Hambúrgueres"

- **Arquivo:** `secoes/M3SecaoLanches.vue`, raiz `<section data-secao="lanches" aria-labelledby="m3-lanches-titulo" class="m3-lanches">`.
- **Objetivo:**
  - mostrar os lanches reais com foto, nome, preço e "Adicionar" sem caçar [H20], todos à vista, sem carrossel [H6][H9][H10][75];
  - no layout feed do M3, a atenção vai para o item maior [64].

**Conteúdo:**

| Campo | Origem |
|---|---|
| `h2` | `dados.js` → `CATEGORIAS.find((c) => c.chave === "foods").rotulo` ("Hambúrgueres") |
| Link | `HERO.acao` ("Ver cardápio"), `RouterLink` para `/menu` |
| Cards | `useProductsStore().foods`: `name`, `description`, `price` (via `useCartaoProduto` → `preco`), `image` (via `useCartaoProduto` → `imagem`), `ingredients` (folha) |
| Destaque | `separarDestaque(foods, MARCA)`: o produto cujo `name` é igual a `MARCA` ("Smash Burger", o lanche que leva o nome da casa); se não houver, o primeiro da lista. Não leva selo nem texto de "mais vendido" |
| Ordem | O destaque primeiro; depois os outros, na ordem do JSON |

Textos provisórios (`textos.js`):

- `ingredientes: "Ingredientes"` (título da folha e começo do nome da metade de trás, "Ingredientes de <nome>");
- `vazio: "Nada nesta categoria por enquanto"` (o mesmo texto do `MenuView`).

**Componentes:**

- `M3CartaoLanche` (comum e `destaque`);
- `M3BotaoDividido`;
- `M3FolhaIngredientes`;
- `M3Foto`;
- `M3Botao` com `variante="texto"` (o "Ver cardápio" do cabeçalho);
- lógica: `useFolhaUnica` e `cardapio.js`.

**Interação e estados:**

- **"Adicionar" (frente do split):** chama `personalizar(produto, contexto)` (`usePersonalizar` e o `contexto` do `useCartaoProduto`), que abre o modal real. Nenhum preço é calculado aqui. Durante o retorno (`adicionado`), as duas metades vão para `--m3-primary-container`, e a face troca para o check e "Adicionado".
- **Metade de trás:** abre e fecha a `M3FolhaIngredientes` do card. Só uma folha fica aberta por vez (`useFolhaUnica`).
- **Fechar a folha:** Esc fecha e devolve o foco à metade de trás que a abriu; o clique fora fecha sem mover o foco; a própria metade de trás alterna; trocar de rota desmonta.
- **Card:** não reage a hover (sem "hover em todo card"). Quando a folha está aberta, o card sobe para `z-index: var(--z-raised)`, para a folha passar por cima da linha de baixo.

**Acessibilidade:**

- **Cabeçalho:** `h2#m3-lanches-titulo` e o "Ver cardápio", sem texto de apoio (ver "Revisão do juiz").
- **Lista e cards:** os cards ficam em `<ul role="list" class="m3-feed">` → `<li>` → `<article>`, com o nome em `h3`.
- **Metades do split:**
  - **frente:** `v-bind="atributosAdicionar"` (`aria-label="Adicionar <nome>"` e `data-adicionado`);
  - **trás:**
    - `aria-label="Ingredientes de <nome>"`;
    - `aria-expanded`;
    - `aria-controls="m3-ingredientes-<id>"`.
- **Folha:** fica no DOM logo depois do split (`v-show`, para o `aria-controls` apontar sempre para um id que existe). O título é um `<p id="m3-ingredientes-<id>-titulo">`, e a lista é um `<ul role="list" aria-labelledby>`.
- **Alvos:** todos com pelo menos 44 × 44.

**Comportamento:**

- **1440 (`xl`):**
  - **Cabeçalho:** `h2` em headline-m 28/36 e o "Ver cardápio" à direita, na mesma linha do título (`display: flex`, `align-items: baseline`, `justify-content: space-between`).
  - **Grade:** 4 colunas, `gap: var(--space-5)`, `align-items: stretch`.
  - **Destaque:**
    - ocupa 2 colunas, na horizontal: a foto quadrada no cookie (45% da largura do card) e o corpo à direita;
    - o corpo tem o nome em headline-s 24/32, peso 500, a descrição inteira em body-m, o preço em title-l e o split no tamanho M (56 px).
  - **Cards comuns:** foto 4:3 com canto `--m3-forma-xl` (28) e recuo de `--space-2`; nome em title-l 22/28 (até 2 linhas); descrição em body-m (2 linhas); preço em title-m e peso 500, tabular; split S (44 px) no pé.
  - **Encaixe:** 7 itens = 1 destaque (2 células) + 6 cards = 2 linhas cheias.
- **1024 (`lg`):** 3 colunas. O destaque ocupa a linha inteira (horizontal, foto de 18 rem), e os 6 cards formam 2 linhas de 3.
- **768 a 1023 (`md`):** 2 colunas, com o destaque na linha inteira, na horizontal.
- **390:**
  - **Cabeçalho:** `h2` em headline-s 24/32 e o "Ver cardápio" na mesma linha, à direita: os dois somam cerca de 270 px e cabem nos 358 px úteis. `flex-wrap: wrap` fica como reserva: se não couber, o botão passa para a linha de baixo.
  - **Grade:** 2 colunas, `gap: var(--space-3)`.
  - **Destaque:** na linha inteira, na vertical, com a foto quadrada no cookie (até 15 rem, centrada), a descrição inteira e o split M.
  - **Cards comuns:**
    - sem a descrição: abaixo de `md`, a folha de ingredientes faz esse papel;
    - nome em title-m 16/24 (até 2 linhas) e foto 4:3 com canto `--m3-forma-l`;
    - split S: "Adicionar" com cerca de 86 px, o vão de 2 px e a metade de trás com 44 px. Cabe nos 157 px úteis.
- **Folha (todas as larguras):** posição absoluta logo abaixo da fileira de botões, com `inset-inline: 0` do corpo do card e sem `min-width`, para não passar da janela em 390.
- **`sizes`:**
  - destaque: `(min-width: 1280px) 520px, (min-width: 768px) 40vw, 60vw`;
  - card comum: `(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 45vw`.
- **Carregamento:** as fotos levam `loading="lazy"`.

**Movimento:**

- **`motion-ok`:**
  - **Chevron:** o da metade de trás gira 180° ao expandir (`--m3-mola-espacial-rapida`, `--m3-dur-mola-espacial-rapida`).
  - **Forma da metade de trás:** troca do canto interno de 4 para totalmente redondo, por opacidade entre duas camadas, em 150 ms [55].
  - **Folha:**
    - entra com a opacidade de 0 a 1 (150 ms) e `scale(0.94)` → `none` a partir do topo (`transform-origin: top`, mola espacial rápida);
    - sai só por opacidade.
  - **Check do "Adicionado":** entra com `scale(0)` → `none` (mola espacial rápida).
- **Reduzido:**
  - os dois chevrons (`faChevronDown` e `faChevronUp`) ficam sobrepostos e trocam por opacidade conforme `aria-expanded`;
  - a folha só muda de opacidade, em até `--dur-fast`;
  - o check aparece sem escala;
  - nenhum `transform`.

**Reserva (cardápio editado):**

- **Produto sumido:**
  - se o "Smash Burger" for renomeado ou excluído, o primeiro da lista vira o destaque;
  - se a lista ficar vazia, somem o destaque e a grade. Ficam o `h2`, o texto `TEXTOS.vazio` e o "Ver cardápio", e a seção continua na página (P6).
- **Imagem `data:`:**
  - o `responsiveImage` devolve só o `src`, e a `M3Foto` não põe o `<source>`;
  - o cookie recorta a imagem enviada como qualquer outra.
- **Imagem que falha:** o ícone `burger` aparece em `--m3-surface-container`, na mesma proporção; o nome continua no `h3`.
- **Produto sem `ingredients` (ou com a lista vazia):** o split vira um botão só, "Adicionar", redondo nos quatro cantos, sem a metade de trás e sem folha.
- **Nome longo:** corte em 2 linhas no card comum (`line-clamp`, que o P9 aceita); o destaque mostra o nome inteiro.
- **Preço:** sempre de `formatPrice` (via `useCartaoProduto` → `preco`). A seção não mostra contagem nem menor preço. A última linha da grade pode ficar incompleta, alinhada ao início.

### 5.3 `bebidas-e-sobremesas`: lista segmentada

- **Arquivo:** `secoes/M3SecaoBebidasSobremesas.vue`, raiz `<section data-secao="bebidas-e-sobremesas" aria-labelledby="m3-bebidas-titulo" class="m3-acompanha">`.
- **Objetivo:**
  - mostrar a variedade da casa na própria Home [H21][H22], já que o `/menu` abre sempre em Hambúrgueres;
  - usar a forma mais característica do Expressive para listas, os itens em blocos arredondados com vãos pequenos, dentro de um contêiner [66][81] e da galeria (releitura do Instagram em M3E, conceito).

**Conteúdo:**

| Campo | Origem |
|---|---|
| `h2` | Composto dos rótulos reais: `${rotulo de "drinks"} e ${rotulo de "desserts" em minúsculas}` → "Bebidas e sobremesas" (`dados.js` → `CATEGORIAS`) |
| `h3` dos grupos | `CATEGORIAS` → "Bebidas" e "Sobremesas" |
| Itens | `useProductsStore().drinks` e `.desserts`: `name`, `description`, `price` (`formatPrice` via `useCartaoProduto`), `image` |

**Mudança da etapa 5a (volta 1):** saiu a linha extra da sobremesa ("7 adicionais", `contar(dessertAdditionals.length, [TEXTOS.adicional, TEXTOS.adicionais])`).

- **Motivo:** os 7 chips de sobremesa de `monte-o-seu`, logo acima, já mostram quais são os adicionais; a contagem repetiria o que se vê.
- **É a única mudança numa seção que já existia.** A sessão C a faz na referência (`M3SecaoBebidasSobremesas.vue`) e na produção (`src/components/home/M3SecaoBebidasSobremesas.vue`).
- **O que fica sem uso nesta seção:** o `contar`, o `adicionais` do `useCardapio` e os `TEXTOS.adicional` e `TEXTOS.adicionais` (seção 8, "Etapa 5a"). A prop `apoio` do `M3ItemLista` continua, com o padrão vazio.

Texto provisório: nenhum (o `adicionais` saiu com a linha).

**Componentes:**

- `M3ItemLista` (com `forma="circulo"` nas bebidas e `forma="flor"` na sobremesa);
- `M3Foto` de 56 px;
- `M3Botao` com `variante="tonal"`, `tamanho="s"` e `retorno`.

A forma da foto marca o grupo: o círculo é o copo ou a lata visto de cima; a flor de 8 lobos, a bola de sorvete. São formas do catálogo como ênfase [9][66].

**Interação e estados:**

- **"Adicionar":** abre o modal real (`personalizar(produto, contexto)`), com os estados do `M3Botao` tonal e o retorno ("Adicionado" com check, fundo `--m3-primary-container`).
- **Item:** não é link e não tem hover próprio.

**Acessibilidade:**

- **Títulos:** `h2#m3-bebidas-titulo`, e um `h3` por grupo.
- **Lista:** cada grupo é um `<ul role="list" aria-labelledby="<id do h3>">` com `<li>`.
- **Nome do produto:** em `<p class="m3-item__titulo">` (item de lista, não título).
- **Botão:** `v-bind="atributosAdicionar"`.
- **Foto:** `alt` com o nome do produto.

**Comportamento:**

- **1440 e 1024:**
  - **Coluna:** a esquerda da faixa (7 de 12).
  - **Contêiner:** `--m3-surface-container-low`, canto `--m3-forma-xl` (28), `padding: var(--space-6)` (`--space-5` em 1024).
  - **Item:**
    - grade `3.5rem 1fr auto auto` (foto, texto, preço, botão), `min-height: 5.5rem`, `padding: var(--space-3) var(--space-4)`;
    - fundo `--m3-surface-container-lowest`;
    - nome em body-l 16/24 (`--m3-on-surface`), descrição em body-m numa linha (`--m3-on-surface-variant`), preço em title-m, peso 500, tabular.
- **390:**
  - largura toda, depois do feed; `padding: var(--space-4)`;
  - grade `3.5rem 1fr auto` (foto, texto, botão); o preço desce para debaixo do nome, e a descrição fica em 2 linhas.
- **Lista segmentada:** vão de `--m3-vao-segmento` (2 px) entre itens.
  - Primeiro item: cantos de cima `--m3-forma-l-aumentada` (20) e de baixo `--m3-forma-xs` (4).
  - Do meio: 4.
  - Último: 4 em cima e 20 embaixo.
  - Item único: 20 nos quatro cantos.
- **`sizes` das miniaturas:** `56px`. As fotos levam `loading="lazy"`.

**Movimento:**

- **`motion-ok`:** só os do `M3Botao`: troca de forma por opacidade e o check com mola.
- **Reduzido:** só opacidade.
- **Sem:** entrada de seção.

**Reserva:**

- **Grupo vazio:** some, junto com o `h3`.
- **Os dois vazios:** fica o `h2` com `TEXTOS.vazio`.
- **Imagem `data:` ou que falha:** a imagem `data:` entra sem `<source>`; se falhar, entra o ícone `utensils` em `--m3-surface-container`, na forma do grupo.
- **Sem `description`:** a linha some.
- **Nome longo:** quebra em até 2 linhas.

### 5.4 `onde`: lista agrupada de horário e contato

- **Arquivo:** `secoes/M3SecaoOnde.vue`, raiz `<section data-secao="onde" aria-labelledby="m3-onde-titulo" class="m3-onde">`.
- **Objetivo:** horário, endereço com mapa e contatos fáceis de achar e de tocar [H29][H26][H32][H33][H34], no mesmo sistema de lista agrupada [66][81].

**Conteúdo:**

| Item | Título | Apoio | Link | Ícone |
|---|---|---|---|---|
| Horário | `RODAPE.horario` ("Horário") | `HORARIO` | nenhum (informação) | `faClock` (regular, importado no componente) |
| Endereço | `RODAPE.endereco` ("Endereço") | `CONTATOS[endereco].texto` | `CONTATOS[endereco].href` (Maps, `api=1`), externo | `CONTATOS[endereco].icone` (`location-dot`) |
| WhatsApp | `TEXTOS.whatsapp` ("WhatsApp") | o número, tirado de `CONTATOS[whatsapp].texto` (a parte depois de " · ", que é o literal `TELEFONE` de `dados.js`) | `CONTATOS[whatsapp].href` (`wa.me`), externo | `CONTATOS[whatsapp].icone` (`phone`) |
| E-mail | `TEXTOS.email` ("E-mail") | `CONTATOS[email].texto` | `CONTATOS[email].href` (`mailto:`) | `CONTATOS[email].icone` (`envelope`, regular) |

Os itens saem de `itensOnde()` (`contatos.js`): o texto real com "·" vira título e apoio, sem o ponto, que é padrão genérico.

Textos provisórios: `ondeTitulo: "Onde e quando"`, `whatsapp: "WhatsApp"` e `email: "E-mail"`.

Ícone final dos externos: `faArrowUpRightFromSquare` (importado no componente), com `aria-hidden`.

**Componentes:** `M3ItemSegmentado`.

**Interação e estados:**

- **Itens com link (endereço, WhatsApp e e-mail):**
  - a linha inteira é o `<a>`: padrão, hover (camada de 8% de `--m3-on-surface`), foco (anel de 3 px em `--m3-secondary` por dentro, `outline-offset: -3px`, para não invadir o vão de 2 px), pressionado (camada de 10%);
  - o ícone inicial fica num círculo de 40 px em `--m3-secondary-container`.
- **Horário:** é um `<div>` estático, sem camada nem ícone final, com o ícone num círculo `--m3-tertiary-container`. A cor do círculo separa informação de ação.

**Acessibilidade:**

- **Títulos e lista:** `h2#m3-onde-titulo` e `<ul role="list">`.
- **Nome dos links:** título e apoio, e nos externos também o `NOVA_ABA` em `.visually-hidden`, como em "Endereço Rua Beira da Praia - Navegantes, SC (abre em nova aba)".
- **Atributos dos externos:** `target="_blank"` e `rel="noopener noreferrer"`.
- **Alvo:** item com `min-height: 4.5rem`.

**Comportamento:**

- **1440 e 1024:** coluna direita da faixa (5 de 12), com contêiner `--m3-surface-container-low`, canto 28 e o mesmo `padding` da coluna vizinha. O endereço quebra em 2 linhas se precisar.
- **390:** largura toda, depois de `bebidas-e-sobremesas`.
- **Cantos e vãos:** os mesmos da lista segmentada (20 por fora, 4 por dentro, vão de 2 px).

**Movimento:**

- **`motion-ok` e reduzido:** a camada de estado muda só por opacidade, em até 150 ms, nos dois modos.
- **Sem:** `transform`.

**Reserva:**

- **Cardápio:** a seção não depende dele.
- **Contato sem " · ":** o apoio é o texto inteiro.
- **Chave desconhecida em `CONTATOS`:** o título é o texto e o apoio fica vazio.

### 5.5 `monte-o-seu`: os adicionais em chips (etapa 5a)

- **Arquivo:** `secoes/M3SecaoMonte.vue`, raiz `<section data-secao="monte-o-seu" aria-labelledby="m3-monte-titulo" class="m3-monte container">`. Na produção, `src/components/home/M3SecaoMonte.vue`.
- **Objetivo:**
  - mostrar de antemão o que se pode acrescentar e quanto custa: o Baymard viu a personalização sem descrição nos sites de delivery [H24][H23]. Hoje os adicionais só aparecem dentro do modal Personalizar;
  - levar ao cardápio, onde se escolhe o produto e se personaliza (§0.2);
  - ser quieta: sem contêiner, sem sombra, sem foto e sem movimento.

**Conteúdo (tudo real):**

| Campo | Origem |
|---|---|
| `h2` | `TEXTOS.monteTitulo` ("Monte o seu", provisório: o nome que o usuário deu à seção na SPEC-material §0.2) |
| Frase | `dados.js` → `FRASE_CARDAPIO` ("Escolha, personalize e peça.", a frase do `MenuView`); na produção, `textosLoja.js` |
| `h3` dos grupos | `TEXTOS.monteLanche` ("No hambúrguer") e `TEXTOS.monteSobremesa` ("Na sobremesa"), provisórios |
| Chips de lanche | `useCardapio().adicionais.value.lanche` (`products.json` → `foodAdditionals[]`): `name` e `precoTexto` (`formatPrice(price)`), na ordem do JSON: Bacon, Ovo, Queijo, Queijo Cheddar e Cebola Caramelizada |
| Chips de sobremesa | `adicionais.value.sobremesa` (`dessertAdditionals[]`): `name` e `precoTexto`, na ordem do JSON: Calda de Chocolate, Granulado, Leite Ninho, Paçoca, Nutella, Morango e Cereja |
| Sinal do acréscimo | "+ " antes do preço, como no `AdditionalsList.vue` do modal (`+ {{ formatPrice(additional.price) }}`): texto de tela real (lição 10 da rodada 2), escrito no template |
| Link | `HERO.acao` ("Ver cardápio"), `RouterLink` para `/menu` |
| Quando o grupo aparece | Com adicionais (`adicionais.value.<grupo>.length > 0`) e com a categoria dele (`foods` ou `desserts`) não vazia (`useCardapio().categoria(chave).value.vazia`) |

- **Contagem:** nenhuma visível (revisão do §2, "Etapa 5a"). O teste confere que o número de chips é o de `adicionais.value.lanche.length + adicionais.value.sobremesa.length`, calculado. A linha "7 adicionais" do Sorvete de Pote saiu (5.3), e o `contar()` e os `TEXTOS.adicional`/`adicionais` ficam sem uso na Home.
- **Preço:** só o `precoTexto` (`formatPrice`); a seção não soma nada.

Textos provisórios: `monteTitulo`, `monteLanche` e `monteSobremesa`.

**Componentes:**

- `M3Botao` com `variante="texto"` e `para="/menu"` (na produção, `BaseButton variant="ghost" to="/menu"`);
- o chip é marcação da própria seção (7.12), sem componente novo.

**Interação e estados:**

- **Chip: estático, com um estado só.**
  - Não é botão nem link: não recebe foco, não tem camada de estado nem cursor de ação, e o texto se seleciona como texto.
  - Não tem check nem estado selecionado, e o modal abre com os adicionais zerados.
  - **Mesmo assim, pode parecer selecionável.** O juiz lembrou que um chip cheio, tonal, lembra o filter chip selecionado [60]; o dossiê descreve o selecionado do [60] pela forma redonda e pelo check. Risco aceito, com a conferência do crítico e a reserva da seção 11.
- **Por que estático, e não interativo:**
  - o filter chip existe para filtrar, e os chips de ação e de sugestão viraram botões [60];
  - aqui não há o que filtrar: os 5 adicionais de lanche valem para todos os hambúrgueres, e os 7 de sobremesa para a sobremesa (`ModalAdditional.vue`, `catalogAdditionals`);
  - um chip que abrisse o modal com o adicional marcado seria função nova no modal, e a revisão da rodada 2 já tirou o menu de adicionais do split por enganar (seção 2).
- **Como o chip se separa de uma ação** (vários sinais juntos; a forma sozinha não separa, porque a marca do cabeçalho também tem `--m3-forma-s`, o FAB é um quadrado arredondado e os links de `onde` são linhas de cantos 20/4):
  - **cor:** fora o círculo do ícone do horário, que também é informação (5.4), o chip é o único fundo `tertiary-container` da Home, e nenhuma ação usa essa cor;
  - **sem camada de estado e sem foco:** nada muda no hover, no toque ou no Tab;
  - **tamanho:** 32 px de altura, abaixo dos 44 px de toda ação da página;
  - **marcação de lista** e o acréscimo "+ R$", a notação do modal.
- **Canto:** `--m3-forma-s` (8), o canto small dos chips [7]. O Expressive mostra o filter chip com 12 dp [60]; o 8 fica de propósito, para o chip não parecer filter chip.
- **"Ver cardápio":** os estados do `M3Botao` de texto (camada de 8% e 10%, anel de 3 px em `--m3-secondary`).

**Por que um terceiro "Ver cardápio"** (o hero e o cabeçalho do feed já têm um, e o "Cardápio" da toolbar fica sempre à vista):

- a §0.2 pede que a seção leve ao cardápio ("levando ao cardápio"); é o motivo que decide;
- o mesmo destino fica com o mesmo nome: um rótulo diferente para o mesmo lugar seria texto novo de loja e um segundo vocabulário;
- é a variante de menor ênfase (texto), no fim da seção, e não repete a forma do cabeçalho do feed (o `h2` com o link à direita);
- a alternativa, a `FRASE_CARDAPIO` como texto do link, não nomeia o destino [H1]. Ela fica como frase, sob o `h2`, e é a mesma que o `/menu` mostra na chegada.

**Acessibilidade:**

- **Títulos:** `h2#m3-monte-titulo` e um `h3` por grupo (`#m3-monte-lanche` e `#m3-monte-sobremesa`), sem salto de nível.
- **Listas:** cada grupo é um `<ul role="list" aria-labelledby="<id do h3>">`, com um `<li>` por chip. O leitor de tela diz o nome do grupo e quantos itens ele tem, sem contagem escrita.
- **Chip:** `<li class="m3-monte__chip">` com `<span class="m3-monte__nome">` e `<span class="m3-monte__preco tabular">`.
- **Foco:** só o "Ver cardápio" recebe foco. Abaixo de `lg`, a reserva da barra (`scroll-padding-bottom`) o mantém fora da toolbar flutuante (2.4.11 [76]).
- **Cor:** o chip não depende de cor para ser lido: o nome e o acréscimo são texto, com o par de texto medido (seção 8).

**Comportamento:**

- **1440 (`xl`):**
  - **Lugar:** depois do feed, na largura do `.container` (75 rem), sem contêiner e com o ritmo das outras seções (`--space-8`).
  - **Cabeçalho:** `h2` em headline-m 28/36 (`--m3-on-surface`) e, logo abaixo, a frase em body-l (`--m3-on-surface-variant`, máx. 40ch).
  - **Grupos:** a partir de `lg`, grade `minmax(0, 7fr) minmax(0, 5fr)` (lanche em 7, sobremesa em 5), `column-gap: var(--space-5)`, o vão da faixa, e `align-items: start`. As colunas alinham com as da faixa logo abaixo. Em cada grupo, o `h3` (title-m 500) e, embaixo, os chips em `flex-wrap`, com `gap: var(--space-2)`.
  - **Chip:** `min-height: 2rem`, `padding: var(--space-1) var(--space-3)`, `--m3-forma-s` e `--m3-tertiary-container`. O nome em label-l 500 e o acréscimo em label-l 400, tabular, os dois em `--m3-on-tertiary-container`, com `gap: var(--space-2)`.
  - **Encaixe estimado** (largura do texto em label-l; o construtor confere na captura): 2 linhas de chips no grupo de lanche e 3 no de sobremesa.
  - **Link:** "Ver cardápio" depois dos grupos, alinhado ao início (`margin-inline-start: calc(-1 * var(--space-3))`, para o texto alinhar com o `h2`).
  - **Altura estimada:** cerca de 300 px, de 1.740 px a 2.040 px na captura da etapa 5.
- **1024 (`lg`):** os mesmos 7/5; estimativa de 2 linhas no grupo de lanche e 4 no de sobremesa; a seção tem cerca de 340 px.
- **De 768 a 1023 (`md`):** os grupos empilhados, com `--space-5` entre eles, como a faixa; 2 linhas de chips em cada; cerca de 390 px.
- **390:**
  - `h2` em headline-s 24/32; a frase numa linha;
  - os grupos empilhados, com `--space-5` entre eles: 3 linhas de chips no de lanche e 4 no de sobremesa;
  - o "Ver cardápio" no fim, alinhado ao início;
  - a seção tem cerca de 510 px e começa por volta de 2.100 px, depois da Batata Frita.
- **Nome longo** (defesa: hoje os adicionais vêm só do `products.json`): o nome quebra dentro do chip (`max-width: 100%`), e o acréscimo não quebra (`white-space: nowrap`).

**Movimento:**

- **`motion-ok` e reduzido:** nada se move. O chip não tem transição; o "Ver cardápio" troca a camada de estado por opacidade em 150 ms, nos dois modos.
- **Sem:** entrada de seção, `transform` e hover no chip.

**Reserva (cardápio editado):**

- **Grupo sem adicionais** (`foodAdditionals` ou `dessertAdditionals` vazio): o grupo some, com o `h3`, e o outro ocupa a largura toda.
- **Categoria vazia** (sem lanches ou sem sobremesas): o grupo dela some, porque não há onde acrescentar.
- **Nenhum grupo:** ficam o `h2`, a frase e o "Ver cardápio". A seção continua na página, como as outras (o teste do cardápio vazio).
- **Adicional renomeado ou com outro preço:** o chip mostra o que o catálogo tiver, sempre por `formatPrice`. Hoje os adicionais vêm só do `products.json`: o painel não os edita, e a store não os guarda no `localStorage` (revisão final da sessão C).
- **Só itens sem adicionais em `foods`** (por exemplo, só a Batata Frita): o grupo de lanche continua, porque a seção não lê o `isBurger`. A referência não pode importar `@/components` (teste de isolamento), e a produção fica igual a ela. Risco aceito (seção 11).
- **`forced-colors`:** o chip perde o fundo e ganha borda de 1 px em `CanvasText`; com `prefers-contrast: more`, borda de 1 px em `--m3-outline` (mixin `reserva-de-sombra`, que serve às superfícies que dependem de fundo).

**Notas para a construção** (juiz, volta 1):

- **O chip continua um contêiner próprio.** Se os chips virarem texto solto numa faixa (nome e preço em sequência, sem contêiner), a seção vira a régua de adicionais do `painel` do neumorfismo (seção 2, "Distinção").
- **"Monte o seu" pode prometer montar do zero** (escolher pão e carne), e o modal só tira ingredientes e acrescenta adicionais a uma base fixa. O título vai para a revisão de UX copy (`design:ux-copy`) com essa ressalva.

### 5.6 Carrossel: fora até haver fotos reais que não sejam de produto (etapa 5a)

**Veredito:** o carrossel fica **fora até haver fotos reais que não sejam de produto**. Com o conteúdo real de hoje, nenhum carrossel cumpre as condições da §0.2. O usuário escolheu ficar com 5 seções (SPEC-material §0.2, "Resultado do desenho").

**O teste.** Um carrossel multi-browse é uma fileira de imagens [34]. O conteúdo dele precisa:

1. não repetir o que o feed de Hambúrgueres e a lista de bebidas e sobremesas já mostram (§0.2);
2. deixar fora do carrossel o que for vital (produto, preço, "Adicionar"), que também aparece em outro lugar, porque muita gente rola e passa direto pelos quadros [H6][H7][75];
3. ser imagem real (`public/images`), com os itens na ordem do `products.json`.

**Quem decide é a regra 1 com a regra 3.** Toda imagem real que serviria já está na Home (as 11 fotos de produto, em 480, 960 e 1440, e o recorte do hero) ou é um banner único (`banner-burger-black` e o fundo do login do painel). A regra 2 se cumpre pela forma e pelo conteúdo (a técnica, abaixo), e a objeção 3 também (seção 2).

| Conteúdo testado | Origem | 1. Não repete | 3. Imagem real que serve | Veredito |
|---|---|---|---|---|
| Os 7 lanches em 1440, com nome e preço | `foods[]`: `image`, `name`, `price` | Não: o feed mostra as mesmas fotos, o nome e o preço, e a v1 era isto | Sim | Não passa |
| Os 7 lanches com os ingredientes, para comparar | `foods[].ingredients` | Não: as fotos são as do feed, e os ingredientes são os da folha | Sim | Não passa |
| As 3 bebidas e a sobremesa em 1440 | `drinks[]`, `desserts[]` | Não: são os produtos da lista; só a foto grande é nova (lá ela tem 56 px) | Sim | Não passa: repete a lista |
| As 11 fotos, sem preço nem "Adicionar" (galeria) | `menuItems.*[].image` | Não: as 11 já estão na Home | Sim | Não passa; 11 quadros também passam dos 5 [75] |
| Uma foto por categoria, com a contagem e o menor preço | `useCardapio().categorias` | Não: as fotos repetem, e o "a partir de R$ 10,90" de Hambúrgueres saiu por infiel (seção 13) | Sim | Não passa; o `/menu` abre sempre em Hambúrgueres, e o atalho não cumpriria o rótulo |
| O `banner-burger-black` | `public/images/fundos` (banner do `MenuView`) | Sim | Não: é uma imagem só | Não passa |
| O fundo do login do painel (juiz) | `public/images/fundos/background-admin-login` | Sim | Não: é do painel e uma imagem só, uma ilustração de giz com comida que a casa não vende (pretzel, pizza, baguete, croissant; conferido no arquivo de 1440) | Não passa |
| A montagem do `BurgerStack` (juiz) | `src/components/BurgerStack.vue` | Sim | Não: é ilustração do modal, com as cores em hex fora dos tokens (a exceção vale só dentro do componente), e a referência não pode importar `@/components` (teste de isolamento); já aparece no modal | Não passa |
| O carrinho (juiz) | `useCartStore()` | Não: as fotos são as dos produtos | Não segue a ordem do `products.json` e vem vazio para quem chega | Não passa |
| Os pedidos anteriores (juiz) | `userStore.orderHistory` | Não: as fotos são as dos produtos | Só existe com sessão, e "pedir de novo" seria lógica nova (`home-delivery.md`, catálogo) | Não passa |
| Os 12 adicionais | `foodAdditionals`, `dessertAdditionals` | Sim | Não: não há foto de adicional | Não passa como carrossel; é o conteúdo de 5.5 |
| Os ingredientes da sobremesa | `desserts[].ingredients` | Sim | Não | Não passa |

**O que faria o carrossel passar:** fotos reais que não sejam dos 11 produtos, por exemplo do local, da chapa ou da montagem. Hoje elas não existem (inventário, "O que NÃO existe": fotos do local ou da equipe). Elas não seriam vitais, e o vital continuaria no feed e na lista (regra 2). Com elas, a técnica abaixo vale como está.

**Troca** (§0.2: "outra candidata viável do mesmo catálogo"). O catálogo de seções do dossiê do material não tem outra candidata viável que seja nova na Home:

- o hero, o feed com destaque, o split button, a toolbar flutuante e os contêineres de horário e endereço já estão nela;
- o filtro de categorias repetiria os produtos que a Home já mostra inteiros, e esconder as outras categorias atrás de uma aba reduz a variedade à vista [H21];
- a busca no topo e o FAB menu estão entre os proibidos da direção (SPEC-material §0, "Proibido nesta direção"), e o rodapé em docked toolbar não é seção de conteúdo;
- as promoções, o Live Update, o indicador de carregamento e as avaliações não têm conteúdo real.

As saídas que o desenho levou à sessão principal:

1. **Home com 5 seções** (dentro do escopo de 4 a 6 das regras comuns), até haver fotos que não sejam de produto. Era a recomendação do desenho: a única saída que não força conteúdo.
2. **Carrossel com as bebidas e a sobremesa em 1440,** aceitando a repetição dos produtos da lista como risco. Não recomendada: quebra a condição da §0.2.
3. **"Como pedir em três passos",** do catálogo transversal (`home-delivery.md`, a partir da `FRASE_CARDAPIO`). Não recomendada: a descrição de cada passo seria texto novo de loja, que a microcopy não permite, e o passo "personalize" repetiria `monte-o-seu`.

**Decisão do usuário (21/11/2026): a saída 1.** A Home fica com 5 seções, e o carrossel volta só quando houver fotos reais que não sejam de produto, com a técnica abaixo, feita à mão (SPEC-material §0.2, "Resultado do desenho").

**Decisão (i): o carrossel não usa o `vue3-carousel`.** Conferido no código do pacote (`node_modules/vue3-carousel/dist/carousel.mjs`, versão 0.14.0):

| Ponto | `vue3-carousel` 0.14.0 | Feito à mão (`scroll-snap` e dois botões) |
|---|---|---|
| Movimento | O trilho anda por `transform: translateX(…)` no estilo do `<ol>` (`trackTransform`), sempre no efeito slide (no efeito `fade`, o `trackTransform` é `undefined`, mas o fade não tem espiada). Com movimento reduzido, só a duração vai a zero (`configCarrossel`): o `transform` continua, e a §1.1 (item 10) e o P14 reprovam | O trilho rola (`scrollLeft`), sem nenhum `transform`. A rolagem suave fica só em `motion-ok`; com movimento reduzido, a troca é instantânea |
| Botões nas pontas | O `Navigation` põe `disabled` em Anterior e Próximo, e o foco cai no `body` | `aria-disabled="true"`: o botão continua focável, e o clique não faz nada |
| Volta ao início | `wrapAround: true` no `configCarrossel` (desligável) | Não existe |
| Marcação | Raiz `<section aria-label tabindex="0">`: uma segunda região dentro da seção e uma parada de Tab a mais, sem `aria-roledescription`. Slides em `<li>`, sem grupo nem rótulo "n de N"; a região viva é sempre `polite` | O padrão da APG [74], abaixo |
| Larguras | Iguais, por `itemsToShow` (ou a do próprio item, com `'auto'`); nada varia por posição | Fixas, na ordem, no CSS, sem animar largura (uncontained [34]) |
| Peso | `carousel.min.js` com 21 KB (7,5 KB em gzip) e `carousel.css` com 4,7 KB (1,2 KB em gzip), medidos no `node_modules`; o CSS entra global (`import "vue3-carousel/carousel.css"`) | Algumas dezenas de linhas na própria seção, com o CSS `scoped` |

- **Consequência:** sem carrossel na Home, o pacote fica sem uso e sai na limpeza (§12, etapa 11), com o pedido do usuário e o `yarn.lock` e o `.yarn/cache` juntos.
- **Quem o importa:** só o `src/components/CarouselBurguer.vue`, que sai pela §4.4.
- **O `src/direcoes/compartilhado/carrossel.js` não depende do pacote:** só importa o `readDurationToken` e monta um objeto de configuração. A saída do `vue3-carousel` não mexe no `compartilhado/`, e o `carrossel.js` fica como configuração sem uso no acervo (nenhuma Home do acervo o importa, busca no `src/`).

**Técnica, para quando houver fotos reais que não sejam de produto** (a construção desta etapa não faz nada disto). Com rolagem nativa e larguras fixas pela ordem, o resultado é o carrossel uncontained do M3 (itens de mesma largura, o último passando da borda [34]), e não o multi-browse: uma aproximação sem largura variável.

- **Estrutura** [74]:
  - a raiz `<section data-secao>` ganha `aria-roledescription="carrossel"`;
  - o trilho é um `div` com `overflow-x: auto`, `scroll-snap-type: x mandatory` e `scroll-padding-inline` igual ao gutter;
  - cada item é um `div` com `role="group"`, `aria-roledescription="item"`, `aria-label="n de N"` e `scroll-snap-align: start`. Não um `ul`: o `role="group"` tiraria o papel de item de lista dos filhos.
- **Controles:**
  - Anterior e Próximo (`SECAO.anterior` e `SECAO.proximo` do `dados.js`; na produção, eles voltam ao `textosLoja.js`), dois `<button type="button">` de 44 px com o rótulo visível, dentro da seção, ao lado do título, sempre à vista [75][H10];
  - cada clique rola um passo (`scrollBy`) e não move o foco [74][H11];
  - nas pontas, `aria-disabled="true"`, sem volta ao início.
- **Posição:** o texto "n de N" visível ao lado dos botões (os números calculados, a palavra "de" no `textos.js`), numa região viva `polite` que só muda depois de um clique nos botões [74][H11]. Sem pontos, que são pista fraca [75].
- **Rotação:** nenhuma, sem timer [73][74].
- **Uncontained, e não multi-browse (aproximação sem largura variável):**
  - no multi-browse do M3, os itens mudam de largura conforme passam pelas linhas-guia [34];
  - aqui os itens têm larguras fixas, na ordem, e o seguinte aparece cortado na borda (a espiada [75][H9]): é o uncontained [34];
  - variar o tamanho com a rolagem pediria animação atrelada à rolagem, que os dossiês não cobrem (não encontrei fonte de suporte) e que o desenho já proíbe no hero;
  - com movimento reduzido, nada muda.
- **Toque e teclado:** deslize nativo no toque. No desktop, os botões e o Tab: o foco num item fora da vista o traz à vista pela rolagem nativa, e o `scroll-padding-inline` evita que ele pare sob a espiada. Se nenhum item tiver elemento focável, o trilho ganha `tabindex="0"` e nome, para rolar pelo teclado.
- **Passos:** até 5 itens [75] e de 3 a 4 passos até o fim [H9]. Em 1440, cerca de 2 itens e meio por tela (2 passos); em 390, 1 e a espiada (até 4 passos).
- **Foco coberto:** os botões ficam no cabeçalho da seção, e a reserva da barra (`scroll-padding-bottom`) cobre o resto abaixo de `lg` (2.4.11 [76]).
- **Estado para o axe:** o carrossel depois de um Próximo, com o seletor do botão de rótulo "Próximo" dentro da seção.

---

## 6. Rodapé (`M3Rodape`, slot `#rodape`)

- **Conteúdo:**
  - `MARCA` em title-l 22/28, peso 500;
  - `DESCRICAO` em body-m, máx. 40ch;
  - `RODAPE.copyright` em body-s, com `--m3-on-surface-variant`.
- **Visual:** `<footer>` em `--m3-surface-container`, com os cantos de cima em `--m3-forma-xl` e `padding-block: var(--space-7) var(--space-5)`.
  - **1440:** a marca e a descrição à esquerda, e a linha de direitos embaixo, separada por uma borda de 1 px em `--m3-outline-variant`.
  - **390:** tudo empilhado.
- **O que sai do rodapé:**
  - **Redes:** os links são genéricos [H25][H26].
  - **Contatos:** ficam em `onde`, logo acima, para não repetir. A NN/g lembra que o usuário vai ao fim da página procurar o contato [H30], e a seção `onde` é o último bloco antes do rodapé.
- **Movimento:** nenhum.

---

## 7. Inventário de componentes (11, fora as seções)

Pastas: `componentes/` e uma parcial por componente em `scss/`. Mixins comuns em `scss/_base.scss`:

- `camada-de-estado`: `::before` com `currentColor`, a 8% no hover e 10% no pressionado [12];
- `anel-interno`: o `outline-offset` negativo;
- `troca-de-forma($repouso, $pressionado)`: duas camadas trocadas por opacidade;
- `reserva-de-sombra`: borda em `forced-colors` e em `prefers-contrast: more`.

| # | Componente | Papel | Ref. |
|---|---|---|---|
| 1 | `M3BarraSuperior` | O `<header>`: top app bar pequena com a marca; abriga a toolbar | [59], [H1], [H17] |
| 2 | `M3BarraFerramentas` | Toolbar flutuante com FAB: `<nav aria-label="Principal">` em pílula e o FAB do carrinho com badge | [57], [83], [81], [67], [35], [H14], [H15], [H35] |
| 3 | `M3Botao` | Botão filled, tonal ou de texto, S ou M, com troca de forma e a face "Adicionado" | [16]-[19], [54], [70], [12], [30] |
| 4 | `M3BotaoDividido` | Split button "Adicionar" com a metade que abre os ingredientes | [55], [19], [79] |
| 5 | `M3FolhaIngredientes` | O "card" que o split abre: superfície flutuante com os ingredientes | [55], [63], [10] |
| 6 | `M3CartaoLanche` | Filled card do feed, comum ou destaque | [63], [64], [34], [66] |
| 7 | `M3FormaPrensa` | A mídia do hero: disco de 12 lobos, bola prensada e o slot da foto | [66], [67], [70], [9], [23], [65] |
| 8 | `M3Foto` | Foto de produto com reserva e forma (cartão, cookie, círculo e flor) | [34], [9], [63] |
| 9 | `M3ItemLista` | Item de lista segmentada com produto e "Adicionar" | [66], [81], galeria (Instagram M3E), [63] |
| 10 | `M3ItemSegmentado` | Item de lista agrupada de horário e contato | [66], [81], galeria (Instagram M3E), [H29], [H32]-[H34] |
| 11 | `M3Rodape` | O `<footer>` | [H30] |

**Etapa 5a: nenhum componente novo; a contagem continua 11 (teto 12).**

- `monte-o-seu` reusa o `M3Botao` (texto).
- O chip fica na própria seção (7.12), porque só ela o usa.
- Se o perfil (SPEC-material §5.9) ou o admin (§5.11) usarem chips de status estáticos, o chip pode virar componente então, como o 12º.

### 7.1 `M3BarraSuperior`

- **Props:** `inicio: { type: String, default: "/direcoes/material" }`.
- **Slots e emits:** nenhum.
- **Usa:** `M3BarraFerramentas` (passa `inicio`).
- **Estados:**
  - **marca:** padrão, hover (camada 8%), foco (anel 3 px em `--m3-secondary`), pressionado (camada 10%);
  - **cabeçalho:** estático abaixo de `lg`; fixo e opaco a partir de `lg`.
- **Tokens:** `--m3-surface`, `--m3-on-surface`, `--m3-title-l`, `--m3-title-l-linha`, `--m3-forma-s`, `--navbar-h`, `--z-navbar`, `--gutter`.

### 7.2 `M3BarraFerramentas`

- **Props:** `inicio: { type: String, required: true }`.
- **Slots e emits:** nenhum.
- **Usa:** `useLinksPrincipais(inicio)` e `useContadorCarrinho()`.
- **Estrutura:** `div.m3-ferramentas` → `nav[aria-label="Principal"] > ul.m3-pilula[role=list] > li > RouterLink.m3-pilula__item` (ícone e rótulo) e `RouterLink.m3-fab[to="/cart"][:aria-label="rotulo"]` com `span.m3-badge[aria-hidden]`.
- **Ícones:**
  - Início: `faHouse` (importado);
  - Cardápio: `['fas', 'utensils']`;
  - Entrar e Perfil: `['fas', 'user']`;
  - FAB: `['fas', 'shopping-cart']`.
- **Medidas:**
  - **abaixo de `md`:** a pílula tem 64 px, com itens de 60 × 56 (ícone de 24 px sobre o rótulo em `--m3-label-m` 12/16) e FAB de 56 px com `--m3-forma-l`;
  - **de `md` a `lg`:** a pílula tem 56 px, com itens de 48 px de altura (ícone de 20 px ao lado do rótulo em label-l);
  - **a partir de `lg`:** a pílula tem 48 px, ancorada no cabeçalho, e o FAB tem 48 px com `--m3-forma-m`, sem elevação.
- **Matriz de estados:**

  | Peça | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
  |---|---|---|---|---|---|---|---|
  | Item da pílula | `--m3-on-surface-variant` sobre `--m3-surface-container` | camada 8% | anel 3 px `--m3-secondary`, por dentro | camada 10% | `aria-current="page"`: pílula `--m3-secondary-container`, tinta `--m3-on-secondary-container` | não há | não há |
  | FAB | `--m3-primary-container` e `--m3-on-primary-container`, elevação 3 quando flutua | camada 8% | anel 3 px, afastado 2 px | camada 10% | não há | não há | não há |
  | Badge | some com o carrinho vazio | não há | não há | não há | com itens: `--m3-error` e `--m3-on-error`, label-s, mín. 16 px | não há | não há |

- **A11y:**
  - **Links:** a `nav` "Principal" contém Início (com `aria-current`), Cardápio e Entrar ou Perfil, com rótulos sempre visíveis [26].
  - **FAB:** nome igual ao `rotulo` ("Carrinho, vazio" ou "Carrinho, 2 itens").
  - **Ordem do Tab:** a do DOM: marca, os três links, o carrinho e depois o `main`.
- **Movimento:**
  - **`motion-ok`:** o badge entra com `scale(0)` → `none` (mola espacial rápida) e a opacidade (150 ms).
  - **Reduzido:** só a opacidade.
  - **Sempre:** a barra não anima.
- **Reserva de sombra:**
  - **`forced-colors`:** pílula e FAB com borda de 1 px em `CanvasText`, e o item atual com borda de 2 px em `Highlight`;
  - **`prefers-contrast: more`:** borda de 1 px em `--m3-outline`.
- **Tokens:** `--m3-surface-container`, `--m3-elevacao-3`, `--m3-secondary-container`, `--m3-on-secondary-container`, `--m3-on-surface-variant`, `--m3-primary-container`, `--m3-on-primary-container`, `--m3-error`, `--m3-on-error`, `--m3-forma-full`, `--m3-forma-l`, `--m3-forma-m`, `--m3-label-l`, `--m3-label-m` (novo), `--m3-label-s`, `--m3-mola-espacial-rapida`, `--m3-mola-efeitos-rapida`, `--z-navbar` e `--m3-barra-reserva` (novo).

### 7.3 `M3Botao`

- **Props:**
  - `variante: { type: String, default: "filled", validator: ["filled", "tonal", "texto"] }`;
  - `tamanho: { type: String, default: "s", validator: ["s", "m"] }` (s: 44 px, label-l 14/20; m: 56 px, title-m 16/24);
  - `para: { type: [String, Object], default: null }` (com valor, vira `RouterLink`; sem valor, `<button type="button">`);
  - `retorno: { type: Boolean, default: false }` (mostra a face "Adicionado" com check).
- **Slots:** `default` (o rótulo).
- **Emits:** `click` (só no `<button>`).
- **Attrs:** os atributos vão para a raiz (é por aí que passa o `atributosAdicionar`).
- **Matriz de estados:**

  | Variante | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Retorno |
  |---|---|---|---|---|---|---|---|
  | filled | `--m3-primary` e `--m3-on-primary`, cantos `full` | `--m3-primary-hover` | anel 3 px `--m3-secondary`, afastado 2 px | `--m3-primary-pressed` e cantos `--m3-forma-m` (S) ou `--m3-forma-l` (M) | não há | `--color-ink-disabled`, sem camada (não usado na Home) | `--m3-primary-container` e `--m3-on-primary-container`, check e "Adicionado" |
  | tonal | `--m3-secondary-container` e `--m3-on-secondary-container` | `--m3-secondary-container-hover` | igual | `--m3-secondary-container-pressed` e cantos `--m3-forma-s` | não há | igual | igual ao filled |
  | texto | tinta `--m3-primary`, sem fundo | camada 8% | igual | camada 10% | não há | igual | não há |

- **Movimento:**
  - **`motion-ok`:** o check entra em `scale(0)` → `none` (mola espacial rápida).
  - **Sempre:** a troca de forma e de face é por opacidade (`--m3-dur-mola-efeitos-rapida`).
  - **Reduzido:** só a opacidade.
- **Tokens:** os da matriz, mais `--m3-forma-full`, `--m3-mola-efeitos-rapida`, `--m3-mola-espacial-rapida`, `--m3-label-l` e `--m3-title-m`.

### 7.4 `M3BotaoDividido`

- **Props:**
  - `rotuloMenu: { type: String, default: "" }` (vazio: sem a metade de trás);
  - `controla: { type: String, default: "" }`;
  - `expandido: { type: Boolean, default: false }`;
  - `adicionado: { type: Boolean, default: false }`;
  - `atributosAcao: { type: Object, default: () => ({}) }`;
  - `tamanho: { type: String, default: "s", validator: ["s", "m"] }`.
- **Emits:** `acao` (frente) e `alternar` (trás, com o elemento do botão, para o foco voltar no Esc).
- **Slots:** nenhum (as faces "Adicionar" e "Adicionado" são internas).
- **Estrutura:** `div.m3-dividido` com dois `<button type="button">` e o vão `--m3-vao-segmento` entre eles. As duas metades usam o fundo filled (`--m3-primary`).
- **Matriz de estados:**

  | Metade | Padrão | Hover | Foco | Pressionado | Selecionado (expandido) | Desabilitado | Retorno |
  |---|---|---|---|---|---|---|---|
  | Frente "Adicionar" | cantos externos `full` e internos `--m3-forma-xs` | `--m3-primary-hover` | anel 3 px, afastado 2 px | `--m3-primary-pressed`, e os cantos externos vão a `--m3-forma-m` | não há | não há | as duas metades em `--m3-primary-container`, face com check e "Adicionado" |
  | Trás (ícone) | 44 × 44, canto interno `--m3-forma-xs`, chevron para baixo | `--m3-primary-hover` | anel 3 px | `--m3-primary-pressed` | vira pílula inteira (cantos todos `full`) e o chevron aponta para cima [55] | não há | acompanha a frente |

  Sem `rotuloMenu`, sobra só a frente, redonda nos quatro cantos.

- **A11y:**
  - **frente:** `v-bind="atributosAcao"` (`aria-label="Adicionar <nome>"`, `data-adicionado`);
  - **trás:** `aria-label` igual a `rotuloMenu`, `aria-expanded` (string) e `aria-controls` igual a `controla`;
  - **ícones:** `aria-hidden`;
  - **alvos:** cada metade com pelo menos 44 × 44.
- **Movimento:**
  - **`motion-ok`:** o chevron gira 180° (`--m3-dur-mola-espacial-rapida`), e os cantos trocam por opacidade (150 ms).
  - **Reduzido:** dois ícones (`faChevronDown` e `faChevronUp`, importados) trocam por opacidade, sem giro.
- **Tokens:** `--m3-primary`, `--m3-primary-hover`, `--m3-primary-pressed`, `--m3-on-primary`, `--m3-primary-container`, `--m3-on-primary-container`, `--m3-forma-full`, `--m3-forma-xs`, `--m3-forma-m`, `--m3-vao-segmento` (novo), `--m3-mola-espacial-rapida`, `--m3-mola-efeitos-rapida` e `--m3-label-l`.

### 7.5 `M3FolhaIngredientes`

- **Props:**
  - `id: { type: String, required: true }`;
  - `itens: { type: Array, default: () => [] }`;
  - `aberto: { type: Boolean, default: false }`;
  - `titulo: { type: String, default: TEXTOS.ingredientes }`.
- **Slots e emits:** nenhum. O fechamento fica no `useFolhaUnica` da seção.
- **Estrutura:** `div.m3-folha[:id]` com `v-show="aberto"` dentro de `<Transition name="m3-folha">`; `p.m3-folha__titulo[:id="id + '-titulo'"]` e `ul[role=list][:aria-labelledby]`.
- **Visual:** `--m3-surface-container-high`, `--m3-forma-l`, `--m3-elevacao-2` e `padding: var(--space-3) var(--space-4)`; título em title-s (label-l, peso 500, `--m3-on-surface`), itens em body-m (`--m3-on-surface-variant`).
- **Estados:** fechada (`display: none`), aberta, entrando e saindo. Não tem hover, foco nem pressionado: não é interativa.
- **Movimento:**
  - **`motion-ok`:** entra com opacidade (150 ms) e `scale(0.94)` → `none` a partir do topo (mola espacial rápida); sai por opacidade.
  - **Reduzido:** só a opacidade, em até `--dur-fast`.
- **Reserva de sombra:** borda de 1 px (`CanvasText` em `forced-colors`; `--m3-outline` em `prefers-contrast: more`).
- **Tokens:** `--m3-surface-container-high`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-forma-l`, `--m3-elevacao-2`, `--m3-body-m`, `--m3-label-l`, `--m3-mola-espacial-rapida`, `--m3-mola-efeitos-rapida` e `--z-raised`.

### 7.6 `M3CartaoLanche`

- **Props:**
  - `produto: { type: Object, required: true }`;
  - `destaque: { type: Boolean, default: false }`;
  - `aberto: { type: Boolean, default: false }`.
- **Emits:** `alternar` (`id do produto` e o botão de trás).
- **Slots:** nenhum.
- **Usa:** `useCartaoProduto(() => produto, { sizes })` (imagem, preço, `imagemFalhou`, `adicionado`, `contexto` e `atributosAdicionar`) e `usePersonalizar()`.
- **Estrutura:** `article.m3-cartao` (`.m3-cartao--destaque`, `.is-aberto`) → `M3Foto` (`forma="cookie"` e proporção 1 no destaque; `forma="cartao"` e 4:3 no comum) → `div.m3-cartao__corpo`:
  - `h3`;
  - `p.descricao`;
  - `p.preco.tabular`;
  - `div.m3-cartao__acoes` (posição relativa) → `M3BotaoDividido` e `M3FolhaIngredientes`.
- **Visual:** filled card em `--m3-surface-container-highest`, canto `--m3-forma-m` (12), `padding: var(--space-2)`. Sem sombra e sem hover.
- **Estados:**
  - **padrão;**
  - **foco:** só nos botões;
  - **folha aberta:** `.is-aberto` e `z-index: var(--z-raised)`;
  - **adicionado:** pelo split;
  - **imagem:** carregando (caixa reservada em `--m3-surface-container`) ou que falha (ícone `burger`);
  - **conteúdo:** sem ingredientes (split de uma metade só) ou nome longo (corte em 2 linhas no comum);
  - **destaque:** horizontal a partir de `md`.
- **Tokens:** `--m3-surface-container-highest`, `--m3-surface-container`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-forma-m`, `--m3-forma-xl`, `--m3-forma-l`, `--m3-forma-cookie`, `--m3-title-l`, `--m3-title-m`, `--m3-headline-s`, `--m3-body-m` e `--z-raised`.

### 7.7 `M3FormaPrensa`

- **Props:** nenhuma.
- **Slots:** `default` (o `<picture>` do hero).
- **Emits:** nenhum.
- **Estrutura:** `div.m3-prensa` → `div.m3-prensa__disco[aria-hidden]`, `div.m3-prensa__bola[aria-hidden]` e o slot, por cima, em grade única (`grid-area: 1 / 1`), sem `transform` para posicionar.
- **Estados:** final (estático) e prensando (só `motion-ok`, uma vez ao montar).
- **Movimento:** descrito em 5.1.
- **Tokens:** `--m3-primary`, `--m3-forma-cookie`, `--m3-forma-full`, `--m3-mola-espacial-lenta`, `--m3-dur-mola-espacial-lenta`, `--m3-dur-mola-espacial-rapida` e `--m3-ease-standard`.

### 7.8 `M3Foto`

- **Props:**
  - `imagem: { type: Object, required: true }` (`{ src, srcset, sizes }`);
  - `alt: { type: String, default: "" }`;
  - `forma: { type: String, default: "cartao", validator: ["cartao", "cookie", "circulo", "flor"] }`;
  - `proporcao: { type: String, default: "4 / 3" }`;
  - `falhou: { type: Boolean, default: false }`;
  - `icone: { type: Array, default: () => ["fas", "burger"] }`;
  - `largura: { type: Number, default: 960 }`;
  - `altura: { type: Number, default: 720 }`.
- **Emits:** `erro`.
- **Estrutura:** `div.m3-foto` (`aspect-ratio`, fundo `--m3-surface-container`, recorte pela forma) → `picture` (com `<source type="image/webp">` só quando há `srcset`) → `img` com `loading="lazy"`, `decoding="async"`, `width`, `height`, `alt` e `object-fit: cover`. Quando falha, entra um `div` com o ícone `aria-hidden`.
- **Formas:**
  - `cartao`: `border-radius: var(--m3-forma-xl)`, ou `--m3-forma-l` abaixo de `md`;
  - `cookie`: `clip-path: var(--m3-forma-cookie)`, sempre com proporção 1, para os lobos não deformarem;
  - `circulo`: `--m3-forma-full`;
  - `flor`: `clip-path: var(--m3-forma-flor)`.
- **Estados:** carregando, carregada, falhou e `data:` (sem `<source>`).
- **Tokens:** `--m3-surface-container`, `--m3-on-surface-variant`, `--m3-forma-xl`, `--m3-forma-l`, `--m3-forma-full`, `--m3-forma-cookie` e `--m3-forma-flor` (novo).

### 7.9 `M3ItemLista`

- **Props:**
  - `produto: { type: Object, required: true }`;
  - `forma: { type: String, default: "circulo" }`;
  - `apoio: { type: String, default: "" }` (até a etapa 5a, a linha "7 adicionais" da sobremesa; desde a volta 1, sem uso na Home, com o padrão vazio).
- **Emits e slots:** nenhum.
- **Usa:** `useCartaoProduto(() => produto, { sizes: "56px" })`, `usePersonalizar()`, `M3Foto` e `M3Botao` (tonal, s, `:retorno="adicionado"`, `v-bind="atributosAdicionar"`).
- **Estrutura:** `li.m3-item` → `M3Foto` (56 px), `div.m3-item__texto` (`p.m3-item__titulo`, `p.m3-item__descricao`, `p.m3-item__apoio`), `p.m3-item__preco.tabular` e o botão.
- **Estados:** padrão (sem hover: o item não é ação); o "Adicionar" tem os estados do `M3Botao`; adicionado; imagem que falha; sem descrição.
- **Cantos por posição:** `:first-child`, `:last-child` e `:only-child`, conforme 5.3.
- **Tokens:** `--m3-surface-container-lowest`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-forma-xs`, `--m3-forma-l-aumentada` (novo), `--m3-vao-segmento` (novo), `--m3-body-l`, `--m3-body-m` e `--m3-title-m`.

### 7.10 `M3ItemSegmentado`

- **Props:**
  - `titulo: { type: String, required: true }`;
  - `apoio: { type: String, default: "" }`;
  - `href: { type: String, default: "" }`;
  - `externo: { type: Boolean, default: false }`;
  - `icone: { type: [Array, Object], required: true }`.
- **Emits e slots:** nenhum.
- **Estrutura:**
  - **com `href`:** `li > a.m3-segmento` (ícone, título, apoio, `NOVA_ABA` escondido nos externos, ícone final nos externos);
  - **sem `href`:** `li > div.m3-segmento.m3-segmento--info`.
- **Matriz de estados:**

  | Tipo | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
  |---|---|---|---|---|---|---|---|
  | Link | `--m3-surface-container-lowest`; ícone em círculo `--m3-secondary-container` | camada 8% | anel 3 px por dentro | camada 10% | não há | não há | não há |
  | Informação | igual, com o ícone em `--m3-tertiary-container` | sem camada | não recebe foco | não há | não há | não há | não há |

- **Tokens:** `--m3-surface-container-lowest`, `--m3-secondary-container`, `--m3-on-secondary-container`, `--m3-tertiary-container`, `--m3-on-tertiary-container`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-forma-xs`, `--m3-forma-l-aumentada`, `--m3-forma-full`, `--m3-vao-segmento`, `--m3-body-l` e `--m3-body-m`.

### 7.11 `M3Rodape`

- **Props, slots e emits:** nenhum.
- **Estados:** estático.
- **Tokens:** `--m3-surface-container`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-outline-variant`, `--m3-forma-xl`, `--m3-title-l`, `--m3-body-m` e `--m3-body-s`.

### 7.12 Peças da seção `monte-o-seu` (etapa 5a; não são componentes)

- **Chip estático:** `li.m3-monte__chip` → `span.m3-monte__nome` e `span.m3-monte__preco.tabular` ("+ " e o `precoTexto`).
- **Grupo:** `div.m3-monte__grupo` → o `h3` e `ul.m3-monte__chips[role=list][aria-labelledby]`.
- **Sem marca de grupo:** o cookie e a flor ao lado dos `h3` saíram na volta 1. Repetiam o esquema de formas da lista vizinha (círculo e flor), espalhavam o cookie do hero e usariam o `--m3-tertiary`, que a Home não usa direto (SPEC-material §2.2).
- **Matriz de estados:**

  | Peça | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
  |---|---|---|---|---|---|---|---|
  | Chip | `--m3-tertiary-container` e tinta `--m3-on-tertiary-container`, `--m3-forma-s`, 32 px de altura | não há: sem camada e sem cursor de ação | não recebe foco | não há | não há: não é filter chip [60] | não há | não há |
  | Chip, reserva (seção 11) | `--m3-surface-container-high`, nome em `--m3-on-surface` e acréscimo em `--m3-on-surface-variant` | não há | não recebe foco | não há | não há | não há | não há |

- **Reserva de fundo:** o chip usa o mixin `reserva-de-sombra` (borda de 1 px em `CanvasText` com `forced-colors`; em `--m3-outline` com `prefers-contrast: more`).
- **Tokens:** `--m3-tertiary-container`, `--m3-on-tertiary-container`, `--m3-forma-s`, `--m3-label-l`, `--m3-label-l-linha`, `--m3-title-m`, `--m3-title-m-linha` e `--m3-outline`; na reserva, `--m3-surface-container-high`, `--m3-on-surface` e `--m3-on-surface-variant`.
- **Referências:** [7] (canto small dos chips) e [60] (o filter chip do Expressive, com 12 dp, que o chip estático evita parecer).

---

## 8. Tokens, pares, lógica e dependências

### Tokens novos (em `_tokens.scss`, prefixo `--m3-`; o valor final é do construtor)

| Token | Papel | Referência de valor |
|---|---|---|
| `--m3-forma-xxl` | Canto do contêiner do hero a partir de `md` | extra-extra-large, 48 dp [6][7][8] |
| `--m3-forma-l-aumentada` | Cantos externos das listas segmentadas | large-increased, 20 dp [6][7][8] |
| `--m3-forma-flor` | Recorte da miniatura da sobremesa | Geometria própria, gerada por script como o cookie: r(θ) = 0,44 + 0,06·cos(8θ), 96 pontos |
| `--m3-vao-segmento` | Vão entre itens das listas segmentadas e entre as metades do split | 2 px |
| `--m3-label-m` e `--m3-label-m-linha` | Rótulos da pílula abaixo de `md` | label-medium 12/16 [1] |
| `--m3-barra-reserva` | Espaço reservado no pé da página abaixo de `lg` (`scroll-padding-bottom` e `padding-bottom` da moldura) | Altura da pílula (64 px), mais `--space-4` de afastamento e `--space-4` de respiro (cerca de 6 rem) |

Sem cor nova: tudo sai dos papéis aprovados. O z-index usa os tokens do projeto (`--z-navbar` e `--z-raised`).

### Pares de contraste novos (para `contraste.js`)

| Frente | Fundo | Mínimo | Onde |
|---|---|---|---|
| `m3-on-primary-container` | `m3-primary-container` | 4,5 | título e texto do hero; ícone do FAB (o par já existe para a face "Adicionado"; ganha estes usos) |
| `m3-primary` | `m3-primary-container` | 3 | contêiner do "Ver cardápio" contra o hero |
| `m3-secondary` | `m3-primary-container` | 3 | anel de foco no hero e no FAB |
| `m3-on-surface-variant` | `m3-surface-container` | 4,5 | rótulos da pílula |
| `m3-secondary` | `m3-surface-container` | 3 | anel de foco na pílula |
| `m3-primary` | `m3-surface` | 4,5 | text button "Ver cardápio" do feed (o par existente é de 3, para o indicador) |
| `m3-primary` | `m3-surface-container-highest` | 3 | contêiner do split contra o card |
| `m3-on-surface` | `m3-surface-container-high` | 4,5 | título da folha |
| `m3-on-surface-variant` | `m3-surface-container-high` | 4,5 | ingredientes na folha |
| `m3-on-surface` | `m3-surface-container-low` | 4,5 | `h2` e `h3` das duas listas |
| `m3-on-surface` | `m3-surface-container-lowest` | 4,5 | título dos itens das listas |
| `m3-on-surface-variant` | `m3-surface-container-lowest` | 4,5 | apoio, descrição e preço dos itens |
| `m3-secondary` | `m3-surface-container-lowest` | 3 | anel de foco interno nos itens |
| `m3-on-tertiary-container` | `m3-tertiary-container` | 3 | ícone do horário |
| `m3-on-secondary-container` | `m3-secondary-container` | 3 | ícones dos itens com link (o par de texto 4,5 já existe) |

Conta de cabeça (o P5 confere):

- `on-primary-container` sobre `primary-container`: cerca de 7,2;
- `primary` e `secondary` sobre `primary-container`: cerca de 5;
- `on-surface-variant` sobre `surface-container`: cerca de 8.

### Lógica necessária

| Nome | O que faz | Onde | Outro estilo poderia usar? |
|---|---|---|---|
| `separarDestaque(lista, nome)` | `{ destaque, demais }`: o produto com `name === nome`, ou o primeiro, e o resto na ordem | `cardapio.js` (puro) | Não, é do feed deste estilo |
| `useFolhaUnica()` | `{ aberta, alternar(id, botao), fechar({ devolverFoco }) }`: uma folha aberta por vez; Esc fecha e devolve o foco ao botão; o `pointerdown` fora do card aberto fecha; os listeners saem no `onBeforeUnmount` | `useFolhaUnica.js` | Sim: é um disclosure único, e serve a quem mostrar ingredientes sob demanda |
| `itensOnde(textos)` | Monta os 4 itens de `onde` a partir de `HORARIO`, `RODAPE` e `CONTATOS`, separando o "WhatsApp · número" em título e apoio, com as reservas de 5.4 | `contatos.js` (puro) | Sim: tira o "·" do texto real sem inventar nada |

Testes, em `__tests__/`:

- `HomeMaterial.test.js` (contrato: um `h1`, botões "Adicionar <nome>", monta com o cardápio vazio e mostra as 4 seções);
- `cardapio.test.js` (lista vazia, destaque ausente, ordem dos demais);
- `contatos.test.js` (separação, contato sem "·", chave desconhecida).

### Dependências novas

Nenhuma. A Roboto Variable já está no projeto.

Ícones novos, importados nos próprios componentes, sem mexer no plugin: `faHouse`, `faChevronDown`, `faChevronUp`, `faArrowUpRightFromSquare` (de `@fortawesome/free-solid-svg-icons`) e `faClock` (de `@fortawesome/free-regular-svg-icons`).

### `textos.js` (todos com `// provisório`, sem dígitos)

```js
export const TEXTOS = {
  ingredientes: "Ingredientes", // provisório
  vazio: "Nada nesta categoria por enquanto", // provisório (o mesmo texto do MenuView)
  adicionais: "adicionais", // provisório
  ondeTitulo: "Onde e quando", // provisório
  whatsapp: "WhatsApp", // provisório
  email: "E-mail", // provisório
};
```

### Etapa 5a

**Tokens novos:** nenhum. A seção usa papéis, formas e tipos que já existem (`--m3-tertiary-container`, `--m3-on-tertiary-container`, `--m3-forma-s`) e os espaços do projeto. Nenhuma duração nova: o chip não anima.

**Par de contraste: nenhum novo; um sobe de mínimo** (em `contraste.js` e em `src/utils/contraste.js`):

| Frente | Fundo | Mínimo | Onde |
|---|---|---|---|
| `m3-on-tertiary-container` | `m3-tertiary-container` | de 3 para 4,5 | Ícone do horário e, desde a etapa 5a, nome e acréscimo nos chips de `monte-o-seu` |

- Hoje o par está nos dois arquivos com mínimo 3, só para o ícone do horário. O uso como texto pede 4,5, e o "onde" ganha os chips; não entra um par duplicado.
- A SPEC-material (§2.2) traz 7,26:1, calculado com a fórmula do `contraste.js`; o P5 confere a medida.

**Pares que ganham uso** (a coluna "onde" muda; o mínimo não):

| Frente | Fundo | Novo uso |
|---|---|---|
| `m3-on-surface` | `m3-surface` | `h2` e `h3` de `monte-o-seu` |
| `m3-on-surface-variant` | `m3-surface` | A frase do cardápio sob o `h2` |
| `m3-primary` | `m3-surface` | O "Ver cardápio" de `monte-o-seu` |
| `m3-secondary` | `m3-surface` | O anel de foco desse link |
| `m3-outline` | `m3-surface` | A borda do chip com `prefers-contrast: more` |

- **Reserva do chip** (seção 11), se o crítico a pedir: os pares `m3-on-surface` e `m3-on-surface-variant` sobre `m3-surface-container-high` já estão no `contraste.js` (título e ingredientes da folha, mínimo 4,5). Com a reserva, eles ganham o uso dos chips, e o P5 mede de novo.

**Lógica:** nada novo.

- A seção lê `useCardapio()` → `adicionais` e `categoria(chave)` (o mesmo composable na referência e na produção).
- O `computed` dos grupos fica na própria seção: dois grupos fixos, cada um com a chave do adicional (`lanche` ou `sobremesa`), a categoria (`foods` ou `desserts`) e o título, filtrados pela regra de 5.5.
- Outro estilo poderia usar? Não: é a regra desta seção.
- **Fica sem uso na Home** (a linha "7 adicionais" saiu de `bebidas-e-sobremesas`, 5.3): o `contar` e os `TEXTOS.adicional` e `TEXTOS.adicionais`. Tirar as duas chaves do `textos.js` e do `textosLoja.js` fica com a sessão C.

**Testes** (`HomeMaterial.test.js` e `src/__tests__/HomeView.test.js`):

- as seções vêm do `material.json`, na ordem;
- o número de chips é o de `adicionais.value.lanche.length + adicionais.value.sobremesa.length`;
- cada chip mostra o `formatPrice` do próprio adicional;
- nenhum chip tem `a` nem `button`, e a seção tem um `a[href="/menu"]`;
- com o cardápio vazio, a seção fica com o `h2` e o link, sem chips;
- o caso "bebidas e sobremesas vêm em grupos, com a contagem calculada dos adicionais" perde a conferência da contagem (`HomeMaterial.test.js`, perto da linha 122; `HomeView.test.js`, perto da linha 213) e passa a conferir que a lista não mostra "adicionais".

**Dependências novas:** nenhuma. O `vue3-carousel` sai na limpeza (5.6, decisão i). Nenhum ícone novo.

**`textos.js`** (o arquivo de hoje, com as três chaves novas; todas com `// provisório`, sem dígitos):

```js
export const TEXTOS = {
  ingredientes: "Ingredientes", // provisório
  vazio: "Nada nesta categoria por enquanto", // provisório
  adicional: "adicional", // provisório (sem uso na Home desde a volta 1 da etapa 5a)
  adicionais: "adicionais", // provisório (sem uso na Home desde a volta 1 da etapa 5a)
  ondeTitulo: "Onde e quando", // provisório
  email: "E-mail", // provisório
  whatsapp: "WhatsApp", // provisório
  monteTitulo: "Monte o seu", // provisório (h2 de monte-o-seu: o nome que o usuário deu à seção, SPEC-material §0.2)
  monteLanche: "No hambúrguer", // provisório (h3 dos adicionais de lanche; não "Hambúrgueres", que inclui a Batata Frita)
  monteSobremesa: "Na sobremesa", // provisório (h3 dos adicionais de sobremesa)
};
```

Na produção, as três chaves entram no `TEXTOS` do `textosLoja.js` depois da revisão de UX copy, sem `// provisório`. O `monteTitulo` vai com a ressalva de 5.5 ("Monte o seu" pode prometer montar do zero).

---

## 9. Arquivos para o construtor

```
src/direcoes/estilos/material/
  HomeMaterial.vue            Roboto, tokens, useEstiloAtivo("material", { esquema: "light" }), Moldura,
                              M3BarraSuperior (#topo), as 4 seções (as 2 últimas em div.m3-faixa), M3Rodape (#rodape);
                              <style scoped>: layout da .moldura, reserva da barra abaixo de lg (padding-bottom
                              e :global(:root[data-direcao="material"]) { scroll-padding-bottom })
  _tokens.scss                identidade aprovada + os 6 tokens novos
  ficha.js · contraste.js · textos.js
  cardapio.js · contatos.js · useFolhaUnica.js
  secoes/M3SecaoHero.vue · M3SecaoLanches.vue · M3SecaoBebidasSobremesas.vue · M3SecaoOnde.vue
  componentes/M3BarraSuperior.vue · M3BarraFerramentas.vue · M3Botao.vue · M3BotaoDividido.vue ·
              M3FolhaIngredientes.vue · M3CartaoLanche.vue · M3FormaPrensa.vue · M3Foto.vue ·
              M3ItemLista.vue · M3ItemSegmentado.vue · M3Rodape.vue
  scss/_base.scss + uma parcial por componente e por seção (@use no próprio <style scoped>)
  __tests__/HomeMaterial.test.js · cardapio.test.js · contatos.test.js
```

- **Sai:** o `_home.scss` da v1 (o conteúdo útil vai para `scss/_base.scss` e para as parciais) e o `import "vue3-carousel/carousel.css"`.
- **Contrato:** nenhuma seção chama `cartStore.addItem` nem calcula preço.

**Etapa 5a: o `material.json` é o gabarito dos testes.**

- O `HomeMaterial.test.js` (referência) e o `src/__tests__/HomeView.test.js` (produção) comparam as `[data-secao]` da página com `desenho.secoes`.
- Desde o commit do desenho, com `monte-o-seu` no JSON, **os dois ficam vermelhos até a construção**.
- **O primeiro commit da sessão C** entra com a seção na referência, a cópia na produção (`M3SecaoMonte.vue` e `HomeView.vue`) e os testes, juntos, para a árvore voltar ao verde num commit só.

**Na referência:**

```
src/direcoes/estilos/material/
  HomeMaterial.vue            + <M3SecaoMonte /> entre M3SecaoLanches e a div.m3-faixa, e o import (92 de 100 linhas)
  secoes/M3SecaoMonte.vue     nova: raiz section[data-secao="monte-o-seu"], os grupos e o M3Botao de texto
  scss/_secao-monte.scss      nova (@use no <style scoped> da seção): grade 7/5 a partir de lg, grupo, chip
  secoes/M3SecaoBebidasSobremesas.vue   sem a linha "7 adicionais" (5.3): saem o contar e o adicionais
  textos.js                   + monteTitulo, monteLanche, monteSobremesa
  contraste.js                o par on-tertiary-container sobe de 3 para 4,5; a coluna "onde" dos pares da superfície
  ficha.js                    secoes: + monte-o-seu (id, nome e papel), na ordem da página
  __tests__/HomeMaterial.test.js   os casos de 8 ("Etapa 5a")
docs/direcoes/desenho/material.json   secoes com "monte-o-seu" (já no commit do desenho)
```

**Na produção** (cópia, no mesmo commit, depois dos portões e do crítico):

- `src/components/home/M3SecaoMonte.vue`, com `BaseButton variant="ghost" to="/menu"`, `useCardapio` de `@/composables/useCardapio` e os textos de `@/utils/textosLoja` (`FRASE_CARDAPIO`, `HERO`, `TEXTOS`);
- `src/assets/styles/pages/home/_secao-monte.scss`;
- `src/views/HomeView.vue`, com a seção entre `M3SecaoLanches` e a `div.m3-faixa`;
- `src/components/home/M3SecaoBebidasSobremesas.vue`, sem a linha "7 adicionais" (a mesma mudança da referência);
- `src/utils/textosLoja.js` (as três chaves sem `// provisório`) e `src/utils/contraste.js` (o mínimo de 3 para 4,5);
- `src/__tests__/HomeView.test.js`, com os casos de 8;
- nenhum token, ícone nem dependência.

**Documentação** (CLAUDE.md: mudou a Home e os testes):

- `README.md`, linha 159: a pasta `home/` passa a citar a seção "Monte o seu";
- `TESTING.md`: a linha do `HomeView.test.js` (contagem de casos, o "Monte o seu" e a lista de bebidas e sobremesas sem a contagem dos adicionais) e a do `HomeMaterial.test.js`, se ela citar as seções.

**Única mudança numa seção que já existia:** a linha "7 adicionais" de `bebidas-e-sobremesas` (5.3). As outras três seções não mudam.

---

## 10. Referências usadas

| Ref. | Publicado ou conceito | Padrão abstraído | Onde entra |
|---|---|---|---|
| [57] Floating toolbar (Compose) | conceito (documentação) | Ações ou abas numa pílula que flutua perto da base, com um FAB ao lado para a ação mais importante | `M3BarraFerramentas` |
| [83] Google Photos para iOS (9to5Google) | publicado | A barra de baixo vira pílula, a aba ativa é uma pílula interna, o FAB fica à direita e a barra não some ao rolar | Pílula com o item atual em `secondary-container`; barra sem esconder |
| [81] Apps do Google em M3E (9to5Google) | publicado | Pílula na página inicial (Files), pílula de navegação (Chat), contêineres em quase todos os apps e FAB em quadrado arredondado | Toolbar, contêineres das listas, FAB de canto 16 |
| [67] Androidify (Android Developers Blog) | publicado | Forma de biscoito no botão principal e transições com troca de forma | A prensa do hero e o cookie na foto do destaque |
| [66] Linguagem do M3E (Wear OS) | conceito (documentação de relógio) | Contêineres agrupados que dividem o espaço para criar hierarquia; formas a serviço de botões e momentos | Faixa 7/5, listas agrupadas, hero em contêiner |
| [65] Níveis de expressão (Wear OS) | conceito (documentação de relógio) | O nível excelente pede momentos expressivos próprios do produto | O hero como único momento |
| [70] M3E no Wear OS (blog) | autor do estilo (anúncio de sistema publicado) | Botões que mudam de forma com mola para separar estados | Troca de forma dos botões e do split |
| [64] Canonical layouts: feed | conceito (documentação) | Grade de itens equivalentes em que o maior recebe a atenção; cabeçalho de seção na largura toda | Feed com o destaque de 2 colunas |
| [63] Cards (Compose) | conceito (documentação) | Um conteúdo coerente por card; filled, elevated e outlined | `M3CartaoLanche` filled |
| [55] Split button (Compose) | conceito (documentação) | Ação principal na frente; a metade de trás expande, gira o ícone, muda de forma e pode abrir um card | `M3BotaoDividido` e `M3FolhaIngredientes` |
| [54] Button groups (Compose) | conceito (documentação) | O pressionado troca de forma | Troca de forma no `M3Botao` |
| [34] Carousel (Compose) | conceito (documentação) | Imagens com canto extra-grande | Canto 28 nas fotos dos cards (sem carrossel) |
| [26] Pesquisa do Expressive (Google) | relato do autor | Rótulos de texto ajudam; contenção de alto contraste; a ação-chave em destaque | Rótulos visíveis na pílula; contêineres; botão M |
| [76], [77], [78], [79] W3C | referência técnica | Foco não coberto (C43, `scroll-padding`); movimento com `prefers-reduced-motion`; alvo; `aria-expanded` | Reserva da barra, `motion-ok`, alvos de 44, metade de trás |
| [1], [6]-[10], [12], [16]-[19], [23], [30], [35] (rodada 1) | documentação oficial | Escala de tipo, formas 20 e 48, catálogo de formas, elevação, camadas de estado, tamanhos de botão, molas, anel de foco, badge | Tokens e estados |
| Galeria: releitura do Instagram em M3E (Figma Community) | conceito | Listas agrupadas em blocos arredondados com vãos pequenos; barra de navegação flutuante em pílula | `M3ItemLista`, `M3ItemSegmentado` e a pílula |
| Galeria: Plant Care Tracker (Dribbble) | conceito | Foto em forma diferente da do contêiner (círculo dentro de quadrado arredondado); FAB quadrado-arredondado | Miniaturas em círculo e flor; FAB |
| Galeria: kit M3E não oficial (Figma Community) | conceito | Formas recortadas como fundo; botões que trocam de forma com mola | Disco do hero; botões |
| Galeria: reservas em M3E (Dribbble) | conceito (comida) | Folha tonal com a foto aninhada em raio grande | Fotos com recuo e canto 28 nos cards |
| [H1], [H2], [H3], [H5], [H14], [H15], [H17], [H20], [H21], [H22], [H25], [H26], [H29], [H30], [H32]-[H35] | pesquisa e referência técnica | Identidade e tarefa no topo; seção seguinte acima da dobra; texto fora da foto; links visíveis; barra persistente; cabeçalho fixo opaco; nome, foto e preço; variedade; credibilidade; contato com mapa; carrinho no canto | Composição inteira |
| (5a) [60] Chips (Compose) | conceito (documentação) | O filter chip filtra, e os chips de ação e de sugestão viraram botões; o filter chip do Expressive tem canto de 12 dp | O chip estático de `monte-o-seu`, de propósito fora dos tipos interativos e fora dos 12 dp |
| (5a) [7] Formas (rodada 1) | documentação oficial | Chips em small (8) | Canto do chip |
| (5a) [H23], [H24] Baymard (delivery) | pesquisa | A personalização não aparece descrita antes do item | Objetivo de `monte-o-seu` |
| (5a) [34], [73], [74], [75], [76], [H6], [H7], [H9], [H10], [H11] | documentação, referência técnica e pesquisa | Multi-browse e uncontained; rotação e pausa; padrão de carrossel da APG; até 5 quadros e a espiada; foco não coberto; recurso vital fora do slide; de 3 a 4 passos; controles visíveis no desktop; botões que não movem o foco | O teste e a técnica do carrossel (5.6) |

**Recorrência:**

- **recorrentes** (3 ou mais produtos publicados): toolbar flutuante, contenção e formas com troca de forma;
- **não recorrentes, só documentação:** o split button [55] e o feed com destaque [64]. Entram como componentes do sistema, não como padrão de mercado.

Não encontrei site ou app de comida publicado em M3 Expressive (dossiê, "Não encontrei").

---

## 11. Riscos e como o desenho responde

| Risco | Resposta |
|---|---|
| Parecer um app genérico do Google (ficha) | A semente alface, o disco de 12 lobos e a prensa são da casa. Sem busca no topo, que é o traço mais "Google" do catálogo |
| Toolbar como navegação é disputada [83] | Rótulos sempre visíveis [26]; no desktop, ancorada no topo, onde o usuário procura [H35] |
| Barra fixa cobrindo o foco [76] | `scroll-padding-bottom` e reserva no fim da página abaixo de `lg`; a barra fica só embaixo à direita, sem cabeçalho fixo no celular [H17] |
| Mola com overshoot incomodar (ficha) | Só em `motion-ok`; a prensa roda uma vez; o resto é resposta a toque |
| Split button sem papel claro | A metade de trás mostra uma coisa só, real e do próprio produto (os ingredientes), e não um atalho para o mesmo modal |
| Muitos tokens (ficha) | 6 tokens novos, todos de forma, medida ou layout; nenhuma cor nova |
| Cards SaaS iguais | O destaque muda de tamanho e de forma de foto; as bebidas e os contatos não são cards, são listas segmentadas; sem sombra nem hover nos cards |
| (5a) Chip estático parecer clicável ou selecionável [60] | **Risco aceito.** Um chip cheio, tonal, lembra o filter chip selecionado (juiz). A separação vem de vários sinais juntos: a cor (fora o círculo do horário, o único fundo `tertiary-container` da Home, e nenhuma ação a usa), a falta de camada de estado, de cursor e de foco, os 32 px de altura, a marcação de lista e o "+ R$" do modal. A forma não separa: a marca do cabeçalho também tem canto 8, e o FAB e os links de `onde` não são pílulas. **Conferência:** o crítico olha a captura parada em 390 e pergunta "parece selecionável?". **Reserva,** se parecer: fundo neutro `--m3-surface-container-high`, nome em `--m3-on-surface` e acréscimo em `--m3-on-surface-variant` (pares já no `contraste.js`, a medir de novo nesse uso) |
| (5a) Chip sugerir que o adicional já fica escolhido | Sem check e sem estado selecionado; o acréscimo "+ R$" é a notação do modal; a frase "Escolha, personalize e peça." diz que a escolha vem depois, no modal |
| (5a) "No hambúrguer" e a Batata Frita | O rótulo fala dos hambúrgueres, e a Batata Frita não é um; o rótulo real "Hambúrgueres", que a inclui, ficou de fora. Se o painel deixar em `foods` só itens sem adicionais, o grupo continua, porque a seção não lê o `isBurger`: risco aceito |
| (5a) Os chips repetirem a régua de adicionais do neumorfismo | Os dois grupos (os 7 de sobremesa não aparecem no acervo), chips separados e uma seção própria que leva ao cardápio; o juiz aprovou na volta 1. Na construção, o chip não pode virar texto solto numa faixa (5.5, "Notas para a construção") |
| (5a) "Monte o seu" prometer montar do zero | O modal só tira ingredientes e acrescenta adicionais a uma base fixa; o título vai para a revisão de UX copy com essa ressalva (5.5) |
| (5a) A contagem "7 adicionais" repetir os chips | Saiu de `bebidas-e-sobremesas` (5.3), a única mudança numa seção que já existia |
| (5a) Terceiro "Ver cardápio" | Fica pela §0.2 ("levando ao cardápio"), com o mesmo nome para o mesmo destino e a variante de texto, no fim da seção (5.5). O "Cardápio" da toolbar também fica sempre à vista |
| (5a) A preferência do usuário pelo carrossel fica sem atender | O usuário escolheu ficar com 5 seções (SPEC-material §0.2, "Resultado do desenho"); o carrossel fica fora até haver fotos reais que não sejam de produto, com a técnica de 5.6 pronta |

---

## 12. Decidido e fora

- **Fora:**
  - busca;
  - filtro de categorias;
  - carrossel: fora até haver fotos reais que não sejam de produto (5.6); a técnica (uncontained, feita à mão) e a decisão (i) ficaram definidas na etapa 5a;
  - marcas de forma nos grupos de `monte-o-seu` (o cookie e a flor saíram na volta 1);
  - chips interativos (filtro, ação ou escolha de adicional): os de `monte-o-seu` são estáticos (5.5);
  - FAB menu;
  - indicador de carregamento (não há espera real [58]);
  - selo "aberto agora" (o horário passa da meia-noite e não há fuso nem feriados [H31]);
  - redes sociais;
  - qualquer número, prazo, taxa, avaliação ou promoção;
  - resumo do feed com contagem ou "a partir de" (ver "Revisão do juiz").
- **Decidido na etapa 5a:**
  - **5 seções** (decisão do usuário, 21/11/2026; SPEC-material §0.2, "Resultado do desenho"): entrou só `monte-o-seu`, com chips estáticos, entre o feed e a faixa;
  - a linha "7 adicionais" sai de `bebidas-e-sobremesas` (5.3);
  - decisão (i): um carrossel futuro é feito à mão, e o `vue3-carousel` sai na limpeza (etapa 11). A saída não mexe no `compartilhado/`: o `carrossel.js` não importa o pacote e fica como configuração sem uso no acervo (5.6).
- **Para a revisão de UX copy:** os rótulos provisórios "Monte o seu" (com a ressalva de que pode prometer montar do zero), "No hambúrguer" e "Na sobremesa".
- **`justificativaEscopo`:** não precisa (5 seções e 11 componentes).

---

## 13. Revisão do juiz

### Achado

- **Tipo e gravidade:** infiel, importante.
- **Onde:** seção `lanches`, no resumo do feed.
- **O problema:** o texto "7 itens, a partir de R$ 10,90", logo abaixo do `h2` "Hambúrgueres", anunciava um preço que nenhum hambúrguer tem.
  - O menor `price` de `foods` em `products.json` é o da Batata Frita (10.9).
  - O hambúrguer mais barato é o X-Salada (20.9).
- **Repetição:** o mesmo resumo, com contagem e "a partir de", também aparece em dois outros estilos:
  - no esqueumorfismo, na etiqueta de categoria;
  - no neumorfismo, na leitura do painel.

### O que mudou

- **O resumo saiu inteiro.** O juiz deu duas saídas: manter só a contagem ou tirar o resumo. O desenho tira, por dois motivos:
  - **A contagem não informa nada aqui.** O feed mostra todos os lanches à vista [64], então "7 itens" só repetiria o que a grade já mostra.
  - **Ela também é repetida.** A contagem por categoria é o traço dos ladrilhos do flat e está na etiqueta do esqueumorfismo. Ficar com ela trocaria uma repetição por outra.
- **O cabeçalho do feed** fica com o `h2` e o "Ver cardápio" na mesma linha, em todas as larguras. Em 390, o `flex-wrap: wrap` fica como reserva (5.2, "Comportamento").
- **O `h2` "Hambúrgueres" fica.** É o rótulo real de `foods` no `MenuView` (`CATEGORIAS`) e inclui a Batata Frita. Sem o "a partir de", ele não promete mais nenhum preço.
- **Saíram junto com o resumo:**
  - o texto provisório `TEXTOS.aPartirDe` (5.2 e o `textos.js` da seção 8);
  - a função `resumoCategoria` do `cardapio.js`, que fica só com o `separarDestaque`;
  - o caso "menor preço" do `cardapio.test.js`, trocado pela ordem dos demais;
  - o par de contraste `m3-on-surface-variant` sobre `m3-surface`, que só servia ao resumo e não existe no `contraste.js` atual.
- **Atualizados:**
  - os wireframes de 1440 e 390;
  - a tabela "O que mudou da rodada 1";
  - a composição (seção 3);
  - a acessibilidade, a reserva e o preço em 5.2.
- **O preço** aparece só em cada card, por `formatPrice` (via `useCartaoProduto` → `preco`).

### O que não mudou

- **Identidade:** a da ficha e dos tokens.
- **Contrato:** o mesmo.
- **Escopo:** as quatro seções e os 11 componentes.
- **Conteúdo:** nada novo; a revisão só tirou texto.
- **`material.json`:** sem mudança. As seções, os tetos do `h1` e o estado "ingredientes abertos" continuam os mesmos.

### Etapa 5a: revisor, juiz de distinção e decisões (21/11/2026)

**Decisão do usuário.** Ficar com 5 seções (saída 1 de 5.6). Nenhum conteúdo real fez o carrossel passar na §0.2, e nenhuma outra candidata viável do catálogo é nova na Home. O carrossel volta só quando houver fotos reais que não sejam de produto. Sem carrossel, o `vue3-carousel` sai na limpeza (decisão i). A SPEC-material §0.2 registra o mesmo, em "Resultado do desenho".

**Volta 1** (um revisor e um juiz de distinção, em paralelo). Os dois aprovaram, sem nenhum bloqueante. O revisor apontou 3 importantes e 10 menores; o juiz, 2 importantes e 5 menores, além da conferência do carrossel. A sessão principal juntou as duas listas em 13 correções, e todas entraram:

- **Motivo do carrossel:**
  - o que barra é a §0.2 junto com a falta de imagem: toda foto real que serviria já está na Home, ou é um banner único;
  - a objeção 3 (o carrossel esconde conteúdo) se resolve pela forma;
  - a tabela de 5.6 ganhou os conteúdos que o juiz testou a mais: o fundo do login do painel, a montagem do `BurgerStack`, o carrinho e o `orderHistory`.
- **Chip que pode parecer selecionável:**
  - o argumento "toda ação é pílula" era falso e saiu;
  - a separação entre chip e ação vem da cor, da falta de camada de estado e de foco, dos 32 px, da marcação de lista e do "+ R$";
  - o risco ficou aceito. O crítico confere a captura parada em 390, e a reserva é um fundo neutro.
- **Linha "7 adicionais":** saiu do Sorvete de Pote (5.3), porque repetia os 7 chips de sobremesa logo acima. É a única mudança numa seção que já existia, na referência e na produção.
- **Testes vermelhos até a construção:** o `material.json` é o gabarito do `HomeMaterial.test.js` e do `HomeView.test.js`, e desde o commit do desenho os dois ficam vermelhos. O primeiro commit da sessão C leva juntos a seção, a cópia na produção e os testes (§9).
- **Menores:**
  - sem as marcas dos grupos;
  - grupos em 7/5, lado a lado só a partir de `lg`;
  - canto 8 citando só o [7];
  - o par do chip sobe de 3 para 4,5, sem par duplicado;
  - o terceiro "Ver cardápio" fica pela §0.2, sem o argumento da distância;
  - o `carrossel.js` não depende do pacote;
  - a técnica é chamada de uncontained [34];
  - trechos desatualizados corrigidos.

**Ressalvas do designer, aceitas:**
- o círculo do horário também tem fundo `tertiary-container`, e o texto diz isso;
- o dossiê descreve o filter chip selecionado [60] pela forma e pelo check, e não pelo fundo cheio. A leitura do fundo cheio é do juiz.

**O que sobrou, para a sessão C:**
- conferir na captura parada em 390 se o chip parece selecionável;
- o chip não pode virar texto solto numa faixa, senão vira a régua do `painel` do neumorfismo;
- os rótulos provisórios passam pelo `design:ux-copy`, inclusive "Monte o seu", que pode prometer montar do zero;
- o grupo de lanche aparece mesmo que o painel deixe em `foods` só itens sem adicionais (risco aceito, §11).

## 14. Notas da construção (W4, 21/11/2026)

A Home foi aprovada pelo crítico na rodada 3 (notas 4, 4, 4, 4, 5 e 4; a v1 somava 16 e a Home nova soma 25). Os portões passaram em todas as rodadas. O que a construção mudou deste desenho, e por quê:

- **Hero parado (rodada 2):** na rodada 1 a prensa só existia na animação, e a tela parada repetia a composição da v1 (texto à esquerda, lanche à direita). A partir de md, o título, o texto e o "Ver cardápio" ficam **dentro do disco de 12 lobos**, que é grande, fica atrás do texto e é cortado pelo contêiner em cima, à esquerda e embaixo. O lanche fica fora do disco e quebra a borda de baixo. O "Ver cardápio" dentro do disco é tonal (o filled sumiria sobre o primary), e o anel de foco ali é on-primary (6,4:1).
- **Hero em 390 (rodada 3):** o texto sai do disco e fica no primary-container; o disco vem depois do botão, centrado, com 19 rem e cortado só embaixo, com cerca de dois terços da volta de lobos à mostra; o lanche (15 rem) fica sobre o disco e vaza pela borda. O "Ver cardápio" volta a filled.
- **Estado pressionado:** no `:active`, o próprio botão passa à forma apertada, e o anel de foco acompanha os cantos menores (antes o anel seguia a forma de repouso e os cantos vazavam).
- **Medidas:** a prensa e o recorte foram redimensionados por largura, olhando as capturas; o h1 tem `max-width` de 15ch para quebrar sempre em "Smash na chapa, / entregue quente"; no destaque em xl, a foto vai a 56% do card; a faixa de Bebidas e sobremesas e Onde e quando usa `align-items: start`.
- **Onde:** o WhatsApp mostra o rótulo e o `TELEFONE` separados, sem o "·" (o `dados.js` passou a exportar `ENDERECO`, `TELEFONE` e `EMAIL`); o ícone de link externo aparece em todas as larguras.
- **Tokens novos além dos previstos:** `--m3-atraso-prensa` (atraso do disco, porque nenhuma duração é escrita direto) e propriedades locais para repintar o conteúdo da prensa.
- **Menores que ficaram:** a linha de direitos do rodapé ainda junta textos com "·" (é o texto real do `RODAPE.copyright`); no cookie do destaque, o prato claro da foto encosta no fundo do card nos lobos de baixo.

### Etapa 5a: construção de `monte-o-seu` (sessão C, 21/11/2026)

A seção foi construída na referência, passou nos portões e no crítico e foi copiada para a produção (`src/components/home/M3SecaoMonte.vue`), com 0 px de diferença nos retângulos das 5 seções em 1440, 1024 e 390.

- **Portões:** `passou: true` nas duas rodadas (P1 a P17).
- **Crítico, rodada 1 (não aprovou):** notas 4, 4, 4, 3, 5 e 4 (soma 24).
  - **Importante:** na captura parada em 390, o chip em `tertiary-container` cheio parecia um filter chip selecionado: tinha a medida do chip interativo do M3 (32 px, canto 8), e o "+" se lia como "adicionar". Era também o bloco mais vistoso entre o feed e a faixa, mais forte que o "Ver cardápio", o único alvo da seção.
  - **Menor:** em 1440, os chips de lanche quebram em 4 + 1, a mesma quebra da régua do `painel` do neumorfismo. Quem separa as duas são os contêineres dos chips.
- **O que mudou:** entrou a reserva da seção 11 e da §7.12. O fundo passou a `--m3-surface-container-high`, o nome a `--m3-on-surface` e o acréscimo a `--m3-on-surface-variant`. A forma, a altura e a falta de estado continuam iguais.
  - Os pares do chip são os da folha de ingredientes (13,93:1 e 7,57:1).
  - O par `on-tertiary-container` sobre `tertiary-container` voltou a 3, só para o ícone do horário: a subida para 4,5 (seção 8, "Etapa 5a") servia ao texto do chip em `tertiary-container`, que não existe mais.
- **Crítico, rodada 2 (aprovou):** notas 4, 4, 4, 4, 5 e 4 (soma 25), sem bloqueante e sem importante. Os dois problemas da rodada 1 foram resolvidos. O chip neutro se lê como etiqueta de informação, continua um contêiner visível sobre a superfície e não parece um card do feed. O "Ver cardápio" passou a ser o único elemento com cor na seção.
- **Medidas** (dev, as mesmas nas duas rodadas): em 1440, a seção vai de 1.741 a 2.049 px, com 2 e 3 linhas de chips, e os grupos ficam em x 152 (649 px) e 825 (463 px), iguais às colunas da faixa; em 1024, 2 e 4 linhas; em 800, empilhados, com 2 e 2; em 390, empilhados, com 3 e 4, de 2.099 a 2.615 px. As estimativas da §3 e da §5.5 se confirmaram.
- **Textos (UX copy):** na produção, o `h2` é "Adicionais", o título da seção do modal onde esses itens se escolhem. "Monte o seu" prometia montar o lanche do zero, e o usuário escolheu a troca. "No hambúrguer" e "Na sobremesa" ficaram. A referência continua com os três provisórios, como o "Onde e quando".
- **Removido:** as chaves `adicional` e `adicionais` saíram do `textos.js` e do `textosLoja.js`, porque ficaram sem uso. O `contar` fica no `compartilhado/` (o esqueumorfismo usa) e no `useCardapio.js` da produção (cópia; a limpeza decide).
