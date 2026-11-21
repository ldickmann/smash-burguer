# Pesquisa: os sete estilos de UI/UX aplicados à Home do Smash Burger

Base das oito Homes da exploração de direções visuais: os sete estilos e a Brasa como linha de base. Elas ficam em `#/direcoes`, só no `yarn dev`, e cada ficha do índice resume a pesquisa de um estilo.

- **Quando:** a pesquisa foi feita em 20/11/2026, por três pesquisadores, na sessão de planejamento. As conferências do fim deste documento foram feitas na sessão de execução, no mesmo dia.
- **Regra:** cada afirmação sobre um estilo cita uma fonte aberta. Galeria e blog de tendência servem só como exemplo visual. O que faltou está escrito como "não encontrei".
- **Nota de 20/11/2026 (rodada 2):** a Brasa saiu da exploração: rota, base, ficha, pares, alternador e textos. A Home de produção não muda e continua em `#/`. O Dark mode segue comparado a ela. O texto abaixo é o da rodada 1, sem reescrita.
- **Nota de 21/11/2026 (rodada 2):** o usuário seguiu só com três estilos: Material 3 Expressive, esqueumorfismo e neumorfismo. As Homes, os desenhos e os dossiês da rodada 2 de 3D e gradientes suaves, flat, minimalismo e dark mode foram apagados (ficam no histórico do Git), junto com as fontes Fredoka e Open Sans. As seções deles abaixo são a pesquisa da rodada 1, sem reescrita.
- **Conteúdo da loja:** as Homes usam só os textos que já existem no app (`src/direcoes/compartilhado/conteudo.js` anota a origem de cada um), o `products.json` e as imagens de `public/images`. Nenhum texto de loja novo foi criado, e nenhuma imagem, ícone ou layout de terceiros foi copiado.

## Como as fontes estão classificadas

| Tipo | Exemplos | Peso na decisão |
|---|---|---|
| Pesquisa | NN/g (eyetracking, estudos com usuários), resumos de artigos acadêmicos | Evidência sobre o uso |
| Autor do estilo | Google (Material 3), Apple (HIG), Microsoft (Metro), Michał Malewicz (neumorfismo e claymorphism) | Define o estilo; a pesquisa do próprio autor vale como relato, não como prova independente |
| Referência técnica | W3C (WCAG), MDN, web.dev, repositórios oficiais | Como implementar e medir |
| Praticante | CSS-Tricks, anúncio da Airbnb | Técnica ou intenção declarada |
| Imprensa e blog | Northeastern, Webdesigner Depot, Dribbble Stories | Contexto; não sustenta afirmação sozinho |
| Galeria | Framer, Freebiesbug, UI Store, Dribbble, Contra, Awwwards | Só exemplo visual; nenhum foi copiado |

## Decisões do usuário

| Tema | Decisão |
|---|---|
| Onde moram | Rotas só de desenvolvimento (`import.meta.env.DEV`), fora do build, provado com o build e uma busca no `dist/`. |
| Construção | Tudo próprio por estilo: navbar, hero, cards, carrossel e rodapé. Reaproveitada só a lógica: stores, modal Personalizar, dados e utilitários. A marca é "Smash Burger" em todas. |
| Dark mode | Evolução da Brasa pelas diretrizes de tema escuro do Material 3 e da Apple, com diferenças explícitas da Brasa. |
| SPEC §0 | Liberado nesta exploração; o traço proibido entra só quando define o estilo. |
| Tipografia | Fonte típica de cada estilo, aceitando dependência nova (só como `devDependencies`). |
| Tokens e §13.2 | Os `_tokens.scss` de `src/direcoes/` são os únicos arquivos da exploração com hex, rgba e durações; a §13.2 do SPEC ganha uma exclusão só para eles. |
| Ambiente | Playwright 1.65.0 e axe-core 4.10.3 numa pasta do scratchpad, com o Chromium 1254 já instalado. |
| Conferência do cache | Sem Docker: a conferência `--check-cache` no Linux fica para o CI. |

## Suposições

- **Conteúdo:** o mesmo da Home atual, copiado de `HomeView.vue`, `MainLayout.vue`, `TheNavbar.vue`, `TheFooter*.vue` e `CarouselBurguer.vue`. O carrossel usa `productsStore.foods` (7 itens, com a Batata Frita), como a Home real.
- **Links:** a marca e "Início" levam à Home do próprio estilo; Cardápio, Entrar/Perfil, carrinho e "Ver cardápio" abrem as telas reais, na Brasa.
- **Fontes novas como `devDependencies`:** só as rotas de desenvolvimento as importam. A do estilo escolhido passa a `dependencies` na próxima fase; as outras saem.
- **Cores do M3 e do Dark mode:** geradas com o `@material/material-color-utilities` 0.4.0 no scratchpad, fora do projeto. As molas do M3 viraram curvas `linear()` por um script; é uma aproximação.
- **Ícones:** os do Font Awesome já usados no app. Ícone novo (as setas do minimalismo) é importado direto na página, sem mexer em `src/plugins/fontawesome.js`. O M3 usaria Material Symbols; ficou como desvio registrado.
- **Transform só com movimento:** a regra do projeto vale também para os giros estáticos (comandas a ±1°, carimbo a −8°, etiqueta a −1,5°). Com movimento reduzido, eles ficam retos.

## Material 3 e M3 Expressive

- **Contexto:** o Material You foi apresentado em 18/05/2021, com o Android 12 [28]; "Material 3" e "M3" são sinônimos, com a cor dinâmica no centro [1]. O M3 Expressive foi anunciado em 13/05/2025 (Android 16, Wear OS 6): molas, desfoque de fundo, tipografia enfatizada e troca de forma [25]. No Compose, as APIs são da versão 1.5.0 [7][9][15][22].
- **Pesquisa do Google** (autor do estilo, sem replicação independente): 46 estudos com mais de 18 mil participantes; elementos-chave achados até 4 vezes mais rápido; preferência maior em todas as idades. Limites que a própria fonte declara: não serve a todo produto, tirar rótulos piorou a usabilidade, e uma minoria preferiu as versões calmas [26][27].
- **Cor:** cinco cores-chave com paletas tonais de 13 tons; papéis primary, secondary, tertiary e error com container e on-*, surface e surface-container (lowest a highest), outline (borda funcional) e outline-variant (decorativo), inverse e scrim [1][2][5].
  - claro [3]: primary 40, on-primary 100, primary-container 90, surface N98, containers 100/96/94/92/90, on-surface 10;
  - escuro [4]: primary 80, on-primary 20, primary-container 30, surface N6, containers 4/10/12/17/22, on-surface 90;
  - a ênfase vem dos pares de cor e do peso; opacidade só no desabilitado [1].
- **Forma:** none 0, extra-small 4, small 8, medium 12, large 16, large-increased 20, extra-large 28, extra-large-increased 32, extra-extra-large 48 e full [6][7][8]. Botões em full, cards em medium, chips em small, FAB em large [7]. O Expressive tem 35 polígonos, entre eles Bun, Cookie, Sunny e Clover, com morph experimental [9].
- **Elevação e estados:** níveis 0/1/3/6/8/12 dp [10]; elevação principalmente tonal [1][13][32]. Camadas de estado no Compose: hover 0,08, foco 0,10, pressionado 0,10, arrasto 0,16 [12]; o material-web ainda usa 0,12 [11]. Anel de foco de 3 px, em secondary, com forma full [30].
- **Tipografia:** Roboto por padrão [1][14], com tokens separados para fonte de marca e de texto [14]. Escala em tamanho/entrelinha, com title e label em Medium [1]; o Expressive tem estilos enfatizados [15].

  | Papel | Grande | Médio | Pequeno |
  |---|---|---|---|
  | display | 57/64 | 45/52 | 36/44 |
  | headline | 32/40 | 28/36 | 24/32 |
  | title | 22/28 | 16/24 | 14/20 |
  | body | 16/24 | 14/20 | 12/16 |
  | label | 14/20 | 12/16 | 11/16 |

- **Botões:** elevated, filled, filled tonal, outlined e text; forma full e rótulo em label-large [16]. Tamanhos do Expressive: XS 32, S 40, M 56, L 96 e XL 136 dp, em versão redonda e quadrada; ao pressionar, o canto diminui [17][18][19].
- **Movimento:** curvas standard (0.2, 0, 0, 1), standard-decelerate (0, 0, 0, 1), emphasized-decelerate (0.05, 0.7, 0.1, 1) e emphasized-accelerate (0.3, 0, 0.8, 0.15), com durações de 50 a 1000 ms [20][21]. Molas do Expressive: spatial 0,6/800, 0,8/380 e 0,8/200; effects 1,0 com 3800/1600/800 [23]. Molas do standard: spatial 0,9 com 1400/700/300 [24]. Expressive nos destaques; fast nos botões [21][22].
- **Web:** o @material/web está em manutenção, sem top app bar, badge nem carrossel [29]; o repositório do Theme Builder foi arquivado em 23/07/2026 [32]; o material-color-utilities gera esquemas a partir de uma cor [33]. O badge de carrinho é uso típico citado pelo Compose [35]; o carrossel oficial usa o canto extra-grande nos itens [34].
- **Na Home ("Alface"):** semente `#5DBB63`, a alface do `BurgerStack`, porque a semente laranja da Brasa gerava superfícies creme e primary terracota, e o roxo de base do M3 seria o M3 de fábrica. Top app bar com primary tabs, hero com display-large 57/64 em peso 500, botão L, forma cookie de 12 lobos (geometria própria), cards filled com a foto em extra-large e "Adicionar" filled que troca de forma (era filled tonal; a revisão independente mostrou que a ação de compra ficava a mais fraca do card).
- **Fontes:**
  - [1] https://developer.android.com/develop/ui/compose/designsystems/material3
  - [2] https://developer.android.com/reference/kotlin/androidx/compose/material3/ColorScheme
  - [3] https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ColorLightTokens.kt
  - [4] https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ColorDarkTokens.kt
  - [5] https://github.com/material-components/material-web/blob/main/docs/theming/color.md
  - [6] https://github.com/material-components/material-components-android/blob/master/docs/theming/Shape.md
  - [7] https://developer.android.com/reference/kotlin/androidx/compose/material3/Shapes
  - [8] https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-shape.scss
  - [9] https://developer.android.com/reference/kotlin/androidx/compose/material3/MaterialShapes
  - [10] https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-elevation.scss
  - [11] https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-state.scss
  - [12] https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StateTokens.kt
  - [13] https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md
  - [14] https://github.com/material-components/material-web/blob/main/docs/theming/typography.md
  - [15] https://developer.android.com/reference/kotlin/androidx/compose/material3/Typography
  - [16] https://github.com/material-components/material-web/blob/main/docs/components/button.md
  - [17] https://github.com/material-components/material-components-android/blob/master/docs/components/CommonButton.md
  - [18] https://developer.android.com/reference/kotlin/androidx/compose/material3/ButtonDefaults
  - [19] tokens ButtonXSmall, Small, Medium, Large e XLarge do Compose; exemplo: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ButtonSmallTokens.kt
  - [20] https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-motion.scss
  - [21] https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md
  - [22] https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme
  - [23] https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt
  - [24] https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StandardMotionTokens.kt
  - [25] https://blog.google/products/android/material-3-expressive-android-wearos-launch
  - [26] https://design.google/library/expressive-material-design-google-research
  - [27] https://developer.android.com/design/ui/wear/guides/get-started/benefits
  - [28] https://android-developers.googleblog.com/2021/05/whats-new-in-android-12-beta.html
  - [29] https://github.com/material-components/material-web
  - [30] https://github.com/material-components/material-web/blob/main/docs/components/focus-ring.md
  - [31] https://github.com/material-components/material-web/blob/main/docs/components/ripple.md
  - [32] https://github.com/material-foundation/material-theme-builder
  - [33] https://github.com/material-foundation/material-color-utilities
  - [34] https://developer.android.com/develop/ui/compose/components/carousel
  - [35] https://developer.android.com/develop/ui/compose/components/badges
  - [36] https://github.com/android/compose-samples/tree/main/Jetsnack
- **Exemplo (galeria):** dribbble.com/felixco, só o título e as tags de um shot "Food Delivery • Material You (m3)".

## Esqueumorfismo

- **Definição:** trazer elementos do mundo real para a interface. A NN/g separa o auxílio de aprendizado (lixeira, pasta) da tendência de realismo desnecessário (estantes de madeira, couro, papel rasgado) [E1]. O auge foi no início e em meados dos anos 2010; o flat veio como reação, e o iOS 7 (2013) abandonou o visual [E1][E2][E3].
- **Hoje:** a HIG define material como efeito que cria profundidade e hierarquia, e o Liquid Glass é o material dinâmico da camada de controles [E4][E5]. Nos ícones, a Apple pede não embutir realces nem chanfros, porque o sistema os aplica [E14]. Nenhuma página oficial usa "esqueumorfismo", e a NN/g chama o Liquid Glass de glassmórfico [E6]; a ligação com o esqueumorfismo vem da imprensa e de blog [E7][E8].
- **Traços:** textura, sombra e gradiente realistas [E1]; botão 3D com brilho como sinal de clique [E9][E3]; movimento realista, coerente com o gesto [E10]. As fontes não orientam tipografia nem raio.
- **Prós e contras:** reduz a curva de aprendizado [E1]; sinais fortes ajudam a achar o alvo [E9]. Quem tem 35 anos ou mais deu ao flat 0,53 ponto a menos numa escala de 1 a 7, e o design "com algum esqueumorfismo" teve notas iguais nas duas faixas [E11]. Contra: poluição visual, carregamento mais lento, metáfora física que confunde e visual que envelhece [E1].
- **Acessibilidade:** contraste contra o fundo realmente renderizado (F83) [E12]; 1.4.11 em controles e foco [E13]; texto sobre imagem e translucidez perdem legibilidade [E4][E6].
- **Na Home ("O passe da cozinha"):** o caminho do pedido numa cozinha de smash. A primeira ideia (azulejo de metrô, papel xadrez, letreiro de feltro) era o "diner" de qualquer hamburgueria; ficou a comanda, a chapa e o cupom, que são do delivery e do smash. Courier Prime na impressão, Bebas Neue nas placas; grão do papel gerado com feTurbulence; contraste medido no ponto mais escuro do grão.
- **Fontes:**
  - [E1] https://www.nngroup.com/articles/skeuomorphism/ (Megan Chan, 15/03/2024)
  - [E2] https://www.nngroup.com/articles/flat-design/
  - [E3] https://www.nngroup.com/articles/ios-7/
  - [E4] https://developer.apple.com/design/human-interface-guidelines/materials.md
  - [E5] https://developer.apple.com/documentation/technologyoverviews/liquid-glass.md
  - [E6] https://www.nngroup.com/articles/liquid-glass/ (10/10/2025)
  - [E7] https://news.northeastern.edu/2025/10/09/liquid-glass-texture-flat-design-apple-tech/
  - [E8] https://www.webdesignerdepot.com/how-apple-quietly-brought-skeuomorphism-back-to-life/
  - [E9] https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/
  - [E10] https://developer.apple.com/design/human-interface-guidelines/motion.md
  - [E11] https://www.nngroup.com/articles/young-adults-flat-design/
  - [E12] https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
  - [E13] https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast
  - [E14] https://developer.apple.com/design/human-interface-guidelines/app-icons.md
- **Exemplos (galeria):** https://legacy-ios-ui-kit.vercel.app/ · producthunt.com/products/legacy-ios-ui-kit · dribbble.com/tareqismail/collections/30457-skeuomorphic-icon-design · dribbble.com/barvian/collections/28725-Skeuomorphism. Template de delivery esqueumórfico: não encontrei.

## Neumorfismo

- **Definição e origem:** "new skeuomorphism" virou "Neumorphism" a partir de um shot de alexplyuto no Dribbble e do artigo de Michał Malewicz [N1]. Para a NN/g, é um relevo sutil de volta ao flat que nunca virou mainstream, por baixo contraste e pistas de clique inconsistentes [N2]. Balanço do próprio autor em 2021: o produto ficou acessível, mas sem graça [N1].
- **Receita:** o elemento é extrudado do mesmo material do fundo, com uma sombra clara e uma escura em lados opostos; a luz vem do canto superior esquerdo [N1][N3][N4]. O fundo precisa de um leve tom (nem preto nem branco puro), e qualquer matiz serve [N1]. `inset` dá o pressionado; um degradê no ângulo da luz dá o convexo [N3].
- **Contras:** o clicável se parece com o não clicável [N2]; o pressionado só por sombra invertida não comunica [N1]; aplicado em tudo, achata a hierarquia [N3]. O estudo qualitativo do Google com 15 pessoas de baixa visão não trata de neumorfismo, mas de contorno e sombra: ninguém preferiu controles sem os dois [N5].
- **Acessibilidade:** o 1.4.11 trata a sombra 3D como parte da cor vizinha mais clara [N6]; em cores forçadas o `box-shadow` vira `none`, então é preciso borda de reserva [N8]; `prefers-contrast: more` [N9].
- **Na Home ("Kraft prensado"):** o cinza-azulado claro é o neumorfismo de qualquer tutorial; ficou o kraft das embalagens de delivery. Todo controle tem borda de 3:1 (2 px com `prefers-contrast: more`), e o pressionado também muda de cor e ganha ícone.
- **Fontes:**
  - [N1] https://hype4.academy/articles/design/neumorphism-in-user-interfaces (a versão do próprio autor; a do uxdesign.cc não abriu, então não confirmei que são idênticas)
  - [N2] https://www.nngroup.com/articles/skeuomorphism/
  - [N3] https://css-tricks.com/neumorphism-and-css/
  - [N4] https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
  - [N5] https://docs.google.com/presentation/d/1CFNxozlyO1lmiyRVCFuhQ_0t2c5QTLskY03CCeTpUuA/htmlpresent
  - [N6] https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast
  - [N7] https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
  - [N8] https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
  - [N9] https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
  - [N10] https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- **Exemplos (galeria):** dribbble.com/NickelfoxStudio/collections/7668971-Nickelfox-Food-Delivery-App-Designs · dribbble.com/Galfaroth/collections/4992293-Neumorphism · dribbble.com/abinashmohanty/collections/1943023-Neomorphism · https://dribbble.com/stories/2020/03/05/neumorphism-ui-tips (blog).

## 3D e gradientes suaves

- **Definição:** não há definição canônica. Tratei como a família da profundidade: camadas, sombras suaves, objetos 3D e degradês (inferência). Antecedentes: o Flat 2.0 [D1], o neumorfismo [D2] e o claymorphism, 3D macio e inflado, com duas sombras internas e uma externa, cantos muito arredondados e tipografia mínima [D3]. Em 2025–26: ícones da HIG em camadas, com realce especular [D4]; a Airbnb anunciou uma interface "dimensional e animada", mas é intenção da empresa, não evidência [D5].
- **Técnica:** CSS Transforms 2 (Working Draft de 2021) [D6]; `perspective` cria contexto de empilhamento e prende os descendentes `fixed` [D8]; `preserve-3d` é achatado por overflow diferente de visible/clip, `opacity` menor que 1, `filter`, `clip-path` e `mix-blend-mode` [D9]; no degradê, `in oklab` [D7].
- **Movimento:** com propósito, breve e cancelável [D11]; de 100 a 500 ms, cerca de 100 ms para retorno simples e 200 a 300 ms para mudanças maiores [D12]; só `transform` e `opacity` [D13]. Animação decorativa frustra [D14], e o Liquid Glass cansou na repetição [D16].
- **Acessibilidade:** 2.3.3 e a técnica C39 [D18]; 2.2.2 [D19][D20]; paralaxe e autoplay causam tontura [D12][D21]; texto sobre degradê medido no ponto de menor contraste [D22][D23]; cores forçadas [D24].
- **Na Home ("Camadas"):** o degradê roxo-azulado com vidro é o 3D de qualquer landing page; ficaram as cores das camadas do lanche. "Tilt em tudo" virou paralaxe só no hero, com o `useTilt` que o projeto já tem, só com mouse e sem movimento reduzido. A Fredoka é escolha de projeto: o autor do claymorphism não cita fonte [D3].
- **Fontes:**
  - [D1] https://www.nngroup.com/articles/flat-design/
  - [D2] https://hype4.academy/articles/design/neumorphism-in-user-interfaces
  - [D3] https://hype4.academy/articles/design/claymorphism-in-user-interfaces
  - [D4] https://developer.apple.com/design/human-interface-guidelines/app-icons.md
  - [D5] https://news.airbnb.com/en-uk/2025-summer-release-now-you-can-airbnb-more-than-an-airbnb/
  - [D6] https://www.w3.org/TR/css-transforms-2/
  - [D7] https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient
  - [D8] https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
  - [D9] https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
  - [D10] https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
  - [D11] https://developer.apple.com/design/human-interface-guidelines/motion.md
  - [D12] https://www.nngroup.com/articles/animation-duration/
  - [D13] https://web.dev/articles/animations-guide
  - [D14] https://www.nngroup.com/articles/animation-purpose-ux/
  - [D15] https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/
  - [D16] https://www.nngroup.com/articles/liquid-glass/
  - [D17] https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover
  - [D18] https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions
  - [D19] https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide
  - [D20] https://www.w3.org/WAI/tutorials/carousels/animations/
  - [D21] https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
  - [D22] https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
  - [D23] https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast
  - [D24] https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
  - [D25] https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- **Exemplos (galeria):** https://www.framer.com/marketplace/templates/ligatra/ (demo de smash burger em 7 camadas que se monta com a rolagem) · https://contra.com/p/APgLZQXv-burgeon-burger-restaurant-ui-design · dribbble.com/UI8/tags/burger · https://www.awwwards.com/inspiration/3d-models-deleito-burger-bcn-santo-sabor.

## Flat

- **Definição:** sem efeitos brilhantes ou 3D; derivado do minimalismo e reação ao esqueumorfismo; popular por volta de 2012, com o Metro e o Windows 8 como marcos [F1]. Princípios do Metro (Microsoft, 2011): limpo e rápido, vivo em movimento, celebrar a tipografia, conteúdo em vez de enfeite, "autenticamente digital", sem brilho nem sombreado [F7]. A diretriz de 2012 pede um esquema de cor próprio da marca [F8].
- **Flat 2.0 (semiflat):** base plana com sombras sutis, realces e camadas que devolvem os significantes. A NN/g recomenda o semiflat para a maioria dos produtos e critica sombra puramente decorativa, como as "long shadows" [F1][F3].
- **Evidência:** eyetracking com 71 pessoas e 9 pares de páginas: com sinais fracos de clique, 22% mais tempo e 25% mais fixações, e o olhar mais espalhado em 6 dos 9 pares [F2]. O uso prolongado gera incerteza de clique [F4]. O ultraflat só serve a sites pequenos e pouco interativos [F3].
- **Traços:** cor chapada como sinal (faixa colorida sugere navegação, fundo colorido sugere botão) [F1]; tipografia protagonista [F7]; botões com forma de botão e cantos arredondados, mesmo sem 3D [F5]; sem textura nem degradê [F7][F2]; no Material v1, card a 2 dp que sobe a 8 dp [F12].
- **Para a Home:** flat 2.0, não ultraflat; CTA preenchido, nunca vazado [F3]; "Adicionar" como verbo, com retorno imediato [F1][F4]; setas grandes, sem autoplay, mostrando parte do próximo card; pontos de paginação são sinal fraco [F23].
- **Acessibilidade:** 1.4.11 para borda de campo, ícone necessário, foco e seleção; link só por cor precisa de 3:1 contra o texto ao redor (1.4.1, G183); 2.4.7; 2.5.8 [F15]–[F20].
- **Na Home ("Ladrilhos"):** vermelho e amarelo de fast food com o lanche ilustrado num círculo é o flat de qualquer hamburgueria; ficaram os ingredientes reais (cebola roxa, cheddar, alface) e a linguagem do Metro. Segoe UI no Windows e Open Sans nos outros sistemas (ver as conferências abaixo). A caixa baixa visual dos títulos é escolha de projeto: não encontrei fonte aberta que a descreva como traço do Metro.
- **Fontes:**
  - Pesquisa (NN/g): [F1] https://www.nngroup.com/articles/flat-design/ · [F2] https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/ · [F3] https://www.nngroup.com/articles/flat-design-best-practices/ · [F4] https://www.nngroup.com/articles/flat-design-long-exposure/ · [F5] https://www.nngroup.com/articles/clickable-elements/ · [F22] https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/ · [F23] https://www.nngroup.com/articles/designing-effective-carousels/
  - Microsoft: [F7] https://blogs.windows.com/windowsdeveloper/2011/02/17/from-transportation-to-pixels/ · [F8] https://learn.microsoft.com/en-us/previous-versions/visualstudio/hh202906(v=vs.105)
  - Apple: [F9] https://www.apple.com/newsroom/2013/06/10Apple-Unveils-iOS-7/ · [F10] developer.apple.com/library/archive/…/TransitionGuide (o caminho completo não ficou registrado no planejamento)
  - Google (Material v1): [F11] https://m1.material.io/material-design/introduction.html · [F12] https://m1.material.io/material-design/elevation-shadows.html
  - Artigos acadêmicos (só o resumo): [F13] https://publications.hse.ru/en/view/801080270 · [F14] https://api.crossref.org/works/10.3390/mti2020031
  - W3C: [F15] https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast · [F16] https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum · [F17] https://www.w3.org/WAI/WCAG21/Understanding/use-of-color · [F18] https://www.w3.org/WAI/WCAG21/Techniques/general/G183 · [F19] https://www.w3.org/WAI/WCAG21/Understanding/focus-visible · [F20] https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum · [F21] https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide
  - Conferidas nesta sessão: [MS1] https://learn.microsoft.com/en-us/typography/font-list/segoe-ui · [MS2] https://learn.microsoft.com/en-us/previous-versions/windows/apps/hh202920(v=vs.105) · [OS] https://github.com/googlefonts/opensans
- **Exemplos (galeria):** https://www.framer.com/community/marketplace/templates/freshbox/ · https://freebiesbug.com/figma-freebies/ui-food-delivery-app/ · https://freebiesbug.com/sketch-freebies/comida/. Nenhum se declara "flat".

## Minimalismo

- **Definição:** tirar o que não apoia a tarefa [M1]; reação ao maximalismo dos anos 2000, com raízes na Bauhaus, em Mies, Müller-Brockmann, Rams, Tufte e nas heurísticas de Nielsen [M2]. O flat trata de textura e ícone; o minimalismo, de conteúdo, função e layout [M1]. A heurística nº 8 manda manter o necessário [M3]. Rams: o mínimo de design possível [M7].
- **Traços medidos em 112 sites** (traço definidor = presente em pelo menos 75%) [M1]: textura plana (96%), paleta limitada ou monocromática com uma cor de destaque consistente para a ação principal (95%), funções reduzidas (87%), espaço negativo máximo (84%), tipografia dramática (75%); imagem grande de fundo (57%), grid (43%), círculos (16%), navegação oculta (13%).
- **Riscos:** cortar o necessário [M3]; navegação escondida (179 pessoas no celular: 89% de uso e 24 s com a navegação visível, contra 44% e 33 s com o ícone pequeno) [M8]; botão vazado e cinza claro ilegíveis [M1][M10].
- **Para a Home:** um só CTA na cor de destaque [M1]; links visíveis e carrinho com contador [M8]; setas visíveis e estado ativo óbvio na paginação [M9].
- **Na Home ("Só o que importa"):** branco com um único acento vermelho é o minimal de qualquer site; ficou o monocromático, com a cor vinda das fotos. Archivo, uma grotesca (ver as conferências), com o eixo de largura do pacote já instalado: o título em Archivo Expanded 800, em duas linhas nos dois terços da página a partir de 768 px. A navegação fica visível também no celular, sem menu escondido [M8].
- **Fontes:**
  - [M1] https://www.nngroup.com/articles/characteristics-minimalism/
  - [M2] https://www.nngroup.com/articles/roots-minimalism-web-design/
  - [M3] https://www.nngroup.com/articles/aesthetic-minimalist-design/
  - [M5] https://learn.microsoft.com/en-us/previous-versions/visualstudio/hh202906(v=vs.105)
  - [M6] https://www.apple.com/newsroom/2013/06/10Apple-Unveils-iOS-7/
  - [M7] https://www.vitsoe.com/us/about/good-design
  - [M8] https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/
  - [M9] https://www.nngroup.com/articles/designing-effective-carousels/
  - [M10]–[M16] W3C Understanding (contraste, contraste não textual, uso de cor, foco visível e tamanho de alvo), os mesmos endereços de [F15]–[F21]
  - Conferida nesta sessão: [AR] https://github.com/Omnibus-Type/Archivo
- **Exemplos (galeria):** https://www.framer.com/marketplace/templates/kalk/ · https://uistore.design/items/food-app-ui-kit-for-figma/ · uistore.design/items/food-app-landing-page-for-figma · uistore.design/items/food-delivery-free-ui-kit-for-figma · https://www.framer.com/marketplace/templates/pastora/.

## Dark mode

- **Contexto:** aparência do sistema com paleta escura, que muita gente escolhe como padrão [47]; polaridade negativa [45]. No Android desde o 10 [49]; na web, `prefers-color-scheme` desde jan/2020 e `color-scheme` desde jan/2022 [51][52].
- **Apple [47]:** cores semânticas; fundos base e elevated; mínimo de 4,5:1 e sugestão de 7:1 em cores próprias, sobretudo em texto pequeno; testar com Aumentar contraste e Reduzir transparência.
- **Material [13][48][4]:** cinza escuro em vez de preto (o codelab usa `#121212`); cores saturadas "vibram", então use tons mais claros; texto branco a 87/60/38%, sem branco puro; elevação por sobreposição clara no M2 ou por tons de surface-container no M3 (N4 a N22); primary no tom 80, com texto no tom 20.
- **NN/g:** em 2020 [45], com visão normal o claro rendeu mais, e a vantagem cresce com a fonte menor; quem tem catarata leu mais rápido no escuro; recomendação: não usar o escuro como padrão para o público geral e oferecer a escolha. Em 2023 [46], cerca de 1/3 usa escuro, 1/3 claro e 1/3 alterna; a economia de energia só existe em OLED. Armadilhas: fundo branco em imagens, sombra que parece brilho, divisores e cards que somem.
- **Web [50][52]:** tokens semânticos por esquema, `color-scheme` e meta no `<head>`, atributo no `<html>`, `light-dark()`; evitar branco puro no texto.
- **Na Home ("A Brasa pelas diretrizes"):** o esquema escuro gerado da semente da Brasa dava superfícies marrons quase iguais às da Brasa; os neutros passaram para croma 0. A ficha tem a tabela de diferenças da Brasa e os pares de 7:1 como informativos.
- **Fontes:**
  - [4] https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ColorDarkTokens.kt
  - [13] https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md
  - [45] https://www.nngroup.com/articles/dark-mode/ (2020)
  - [46] https://www.nngroup.com/articles/dark-mode-users-issues/ (2023)
  - [47] https://developer.apple.com/tutorials/data/design/human-interface-guidelines/dark-mode.json
  - [48] https://codelabs.developers.google.com/codelabs/design-material-darktheme
  - [49] https://developer.android.com/develop/ui/views/theming/darktheme
  - [50] https://web.dev/articles/prefers-color-scheme
  - [51] https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  - [52] https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
- **Exemplo (galeria):** https://contra.com/p/bUqEo2oU-ui-design-for-burger-shops-mobile-application (só texto descritivo).

## WCAG 1.4.3 e 1.4.11 (para todos)

- **1.4.3 (AA):** 4,5:1 para texto; 3:1 para texto grande (a partir de 24 px, ou 18,5 px em negrito). Não se arredonda. Exceções: texto incidental e logotipo. Vale para placeholder e para texto sobre imagem (F83).
- **1.4.11 (AA):** 3:1 para o que identifica componente e estado (foco, selecionado) e para partes necessárias de gráficos. Botão só de texto não precisa de borda; o hover não precisa de 3:1, mas não pode reduzir o contraste.
- **Como foi medido aqui:** `src/direcoes/contraste.js` tem a fórmula e os pares de cada direção. A ficha mede no navegador, com os valores que o CSS resolveu; o script de verificação mede lendo os `_tokens.scss`. Translúcidos são compostos sobre o fundo de baixo, e texto sobre textura ou degradê é medido no ponto mais escuro.

## Conferências feitas na execução (20/11/2026)

- **Revisão independente:** um subagente sem ferramentas de edição avaliou as oito capturas de 1440 px. Na rodada de correções, o "Adicionar" passou a ser o botão preenchido da ação principal no Material 3, no neumorfismo (ketchup) e no Dark mode (primary), como já era nos outros; a chapa do 3D ganhou aro e superfície; a chapa do esqueumorfismo ganhou marcas e brilho, e o cupom passou a duas colunas; o preço do flat foi a 600; e a descrição dos cards passou a caber em três linhas onde cortava. O defeito apontado na Brasa (fotos 3:2 que não cobrem a moldura 4:3 do card) é da Home em produção e ficou fora.

- **Segoe UI e Open Sans, mesmo desenhista:** a página da Microsoft diz que a Segoe "was designed by type designer Steve Matteson" (o campo formal de designers está "N/A") [MS1]; o README do googlefonts/opensans diz "Originally designed by Steve Matteson of Ascender" [OS]. Por isso a Open Sans ficou na lista de dependências.
- **Segoe UI no Windows:** a Segoe UI virou a fonte de interface padrão do Windows com o Vista, em 2007, e é a versão para tela da Segoe [MS1].
- **Segoe e Metro:** não encontrei uma página da Microsoft que chame a Segoe UI de "fonte do Metro". O que as páginas abertas sustentam: o sistema de design do Windows Phone tinha o codinome Metro [F8], e a fonte de interface do Windows Phone 8 era a Segoe WP, para as escritas latina, cirílica, grega, árabe e hebraica [MS2]. As páginas hh700394 e jj130676 (apps do Windows 8) deram 404.
- **Selawik:** a Microsoft a descreve como "an open source replacement for Segoe UI" (https://learn.microsoft.com/en-us/typography/font-list/selawik); não há pacote do Fontsource para ela.
- **Archivo:** o README a descreve como "a grotesque font reminiscent of late nineteenth century", com larguras de Extracondensed a Expanded [AR].
- **Links:** os 116 endereços completos das fichas e deste documento responderam HTTP 200 em 20/11/2026 (verificação com `curl`, seguindo redirecionamentos). Os endereços escritos sem `https://` são os do planejamento que não foram reabertos.
- **material-color-utilities 0.4.0:** o pacote importa `./dynamic_color` sem extensão em `color_spec_2025.js`, o que o Node não resolve em ESM; foi empacotado com o esbuild do projeto, no scratchpad, para gerar os esquemas (spec 2021).

## Não abriu

- **Pesquisador 1:** Figma Community (quatro kits, 403); Behance, lapa.ninja, mdpi.com e doaj.org (403); Dribbble (quatro páginas vazias); webflow.com (erro de leitura); m2.material.io/design/environment/elevation.html (só JavaScript); m1.material.io/what-is-material/elevation-shadows.html (404); dl.ifip.org (bloqueio anti-bot); link.springer.com e scilit.net (redirecionamento não seguido).
- **Pesquisador 2:** m3.material.io/styles/color/roles (só o título); m3.material.io/theme-builder (404); kit M3 no Figma (403); HIG de dark mode em HTML (só o título; foi lido o JSON da mesma página); m2.material.io/design/color/dark-theme (só o título); material-foundation.github.io/material-theme-builder (app em JavaScript); blog do material.io (só o título); web.archive.org (a ferramenta não acessa); Dribbble (2 vazias), contra.com (404) e Behance (403).
- **Pesquisador 3:** uxdesign.cc e medium.com (403); axesslab.com/neumorphism (403, não usado); HIG e Liquid Glass sem `.md` (só o título); techradar.com (o corpo do texto não carregou); bloomberg.com e mdpi.com (403); news.airbnb.com sem `en-uk` (404); ifip.hal.science (anti-robô); PDF de Burmistrov et al. (ilegível); m3.material.io/styles/elevation/overview e neumorphism.io (só o título); Figma (4 arquivos), Behance e designshack.net (403); Dribbble (3 páginas vazias).
- **Execução:** learn.microsoft.com/en-us/previous-versions/windows/apps/hh700394(v=win.10) e jj130676(v=win.10) (404).

## Rodada 2: uma Home nova por estilo (21/11/2026)

Na rodada 2, a Brasa saiu, e cada estilo ganhou uma Home nova, com as seções que o próprio estilo pede e componentes próprios. A pesquisa veio antes do desenho, e o desenho antes da construção.

### Método

- **Pesquisa em texto:** um pesquisador por estilo (WebSearch e WebFetch), partindo desta página, e um verificador que reabriu cada URL e tentou derrubar cada afirmação (na dúvida, derrubou). Cobertura exigida: 5 afirmações confirmadas de pesquisa, autor do estilo ou referência técnica, 3 padrões com 2 exemplos ou mais e 70% das afirmações reconfirmadas. Os oito dossiês fecharam a cobertura sem complemento.
- **Galerias:** um agente por estilo, em série, no Chrome, com até 15 páginas, recusando cookies não essenciais e desistindo em login, CAPTCHA ou anti-robô. Cada exemplo está marcado como publicado ou conceito; nada foi copiado.
- **Desenho:** um designer por estilo e um juiz de distinção que leu os sete juntos (repetição, padrão genérico, conteúdo inventado, infidelidade ao estilo, inviabilidade, contrato e acessibilidade). Na primeira leitura, 1 reprovado e 5 com ajustes; depois da revisão, os sete aprovados.
- **Construção:** um laço por estilo, com o construtor rodando os portões no próprio contexto, portões independentes (escopo, lint e testes, buscas, identidade, contraste, desenho, contrato, axe, layout, alvos, console, fluxo do Adicionar, teclado, movimento, conteúdo, peso e capturas) e um crítico novo a cada rodada, com rubrica calibrada na Home da rodada 1 do Material 3 (soma 16 de 30).

### Dossiês

No fim da rodada 2, o usuário seguiu só com Material 3 Expressive, esqueumorfismo e neumorfismo; as Homes, os desenhos e os dossiês dos outros quatro foram apagados (ficam no histórico do Git). Os sete desenhos passaram pelo juiz de distinção, e as sete Homes chegaram a ser construídas antes do corte.

| Estilo | Dossiê | Afirmações confirmadas / derrubadas | Exemplos de galeria |
|---|---|---|---|
| Material 3 Expressive | [pesquisa/material.md](./pesquisa/material.md) | 38 / 13 | 8 |
| Esqueumorfismo | [pesquisa/esqueumorfismo.md](./pesquisa/esqueumorfismo.md) | 30 / 1 | 8 |
| Neumorfismo | [pesquisa/neumorfismo.md](./pesquisa/neumorfismo.md) | 45 / 4 | 7 |
| Home de delivery (transversal) | [pesquisa/home-delivery.md](./pesquisa/home-delivery.md) | 37 / 15 | — |

Os desenhos das Homes novas, com a tese, os wireframes, as seções, os componentes e as notas da construção, estão em [desenho/](./desenho/).

### O que não abriu na rodada 2

- **Por fetch:** a lista de cada dossiê, na seção "Não abriu". Continuam bloqueados para leitura automática o Figma Community, a Behance, o Dribbble (página vazia ou 202), o m3.material.io e o medium.com.
- **No Chrome:** a busca global do CodePen (pede login); godly.website (redireciona para recent.design, fora das galerias liberadas); as buscas por URL do landingfolio.com (categoria restaurante vazia), do onepagelove.com (tag inexistente), do minimal.gallery e do siteinspire.com (parâmetro ignorado), substituídas pela navegação do próprio site.
