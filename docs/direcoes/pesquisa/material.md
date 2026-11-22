# Pesquisa da rodada 2: Material 3 Expressive

Feita em 20/11/2026. Um pesquisador abriu as páginas e devolveu 38 afirmações, 7 padrões de página, 15 seções candidatas, 14 componentes e 14 riscos. Depois, um verificador reabriu cada URL com WebFetch no mesmo dia e tentou derrubar cada afirmação e cada exemplo, conferindo se a página diz aquilo, se a fonte é da classe declarada e se o exemplo é publicado ou conceito. Este dossiê traz só o que sobreviveu: das 38 afirmações, 33 ficaram inteiras e 5 ficaram em parte, e 13 trechos ou exemplos caíram (estão em "Refutadas na verificação"). O dossiê completa a seção "Material 3 e M3 Expressive" do `PESQUISA.md` (linhas 42 a 104), que trata dos tokens (cor, forma, elevação, tipografia, botões e movimento) com as fontes [1] a [36]. Esta rodada trata da página: padrões de Home, seções e componentes do Expressive. As fontes que já tinham número na rodada 1 mantêm o número ([25], [26], [29], [34] e [36]), e as novas começam em [53].

## Fontes

| nº | tipo | título | URL | o que sustenta |
|---|---|---|---|---|
| [25] | autor do estilo | Material 3 Expressive no Android 16 e no Wear OS 6 (blog do Google, 13/05/2025; rodada 1) | https://blog.google/products/android/material-3-expressive-android-wearos-launch | O plano de levar o Expressive ao Google Photos, ao Fitbit e ao Gmail; a cortina de notificações com fundo desfocado e animações com mola; os Live Updates de apps de entrega, transporte e navegação. |
| [26] | autor do estilo | Expressive Material Design: Google research (Google Design; rodada 1) | https://design.google/library/expressive-material-design-google-research | Os elementos do expressivo, o eye-tracking em 10 apps, os protótipos testados e os limites que o próprio Google declara. A página não traz autor nem data. |
| [29] | documentação oficial | material-components/material-web (GitHub; rodada 1) | https://github.com/material-components/material-web | A biblioteca web oficial está em manutenção, à espera de novos mantenedores; fala do Material 3 e não cita o Expressive. |
| [34] | documentação oficial | Carousel (Jetpack Compose; rodada 1) | https://developer.android.com/develop/ui/compose/components/carousel | Os quatro layouts de carrossel, com código só de dois; as imagens recortadas com a forma extraLarge. |
| [36] | documentação oficial | Jetsnack (android/compose-samples; rodada 1) | https://github.com/android/compose-samples/tree/main/Jetsnack | Um app de exemplo de pedido de lanches com sistema de design próprio, fora do tema de cor do Material. |
| [53] | documentação oficial | Components (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components | As páginas próprias de button groups, FAB menu, split button, floating toolbar e loading indicator; não há página só de "toolbar". |
| [54] | documentação oficial | Button groups (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/button-group | O grupo padrão e o conectado, com troca de forma, tamanhos XS a XL e seleção única, múltipla ou obrigatória. |
| [55] | documentação oficial | Split button (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/split-button | Os dois botões, o giro do ícone e a troca de forma, as versões filled e tonal e o estado lido do botão de trás. |
| [56] | documentação oficial | FAB menu (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/fab-menu | De duas a seis ações a partir de um FAB, as cores e o estado expandido ou recolhido. |
| [57] | documentação oficial | Floating toolbar (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/floating-toolbar | O uso para ações da página e para navegar entre páginas relacionadas, o FAB ao lado e o comportamento ao rolar. |
| [58] | documentação oficial | Loading indicators (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/loading-indicator | Esperas curtas, as versões padrão e contida, nunca decorativo, APIs experimentais. |
| [59] | documentação oficial | App bars (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/app-bars | As app bars medium e large flexible, a rolagem e o docked toolbar (FlexibleBottomAppBar). |
| [60] | documentação oficial | Chips (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/chip | A troca de canto de 12 dp para totalmente redondo e os assist e suggestion chips fundidos aos botões. |
| [61] | documentação oficial | Navigation bar (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/navigation-bar | De três a cinco destinos e a ShortNavigationBar. |
| [62] | documentação oficial | Search bar (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/search-bar | O campo de busca persistente, os estados recolhido e expandido, a API experimental e a ordem do TalkBack. |
| [63] | documentação oficial | Cards (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/card | Um conteúdo coerente por card, as versões filled, elevated e outlined, o clique e o estado desabilitado. |
| [64] | documentação oficial | Canonical layouts (Android) | https://developer.android.com/develop/ui/compose/layouts/adaptive/canonical-layouts | O layout feed: a grade, os grupos por tamanho e posição e o destaque pelo tamanho. |
| [65] | documentação oficial | Levels of expression (Wear OS) | https://developer.android.com/design/ui/wear/guides/get-started/levels-expression | Os três níveis de expressão e o que o excelente e o transformador pedem. É guia de relógio. |
| [66] | documentação oficial | Material 3 Expressive design language (Wear OS) | https://developer.android.com/design/ui/wear/guides/get-started/design-language | Os contêineres agrupados, o uso das formas e os eixos de fonte variável. É guia de relógio. |
| [67] | autor do estilo | Androidify: building delightful UI with Compose (Android Developers Blog, 20/05/2025, Rebecca Franks) | https://android-developers.googleblog.com/2025/05/androidify-building-delightful-ui-with-compose.html | O tema expressivo, o botão em forma de biscoito, a floating toolbar e as transições com troca de forma num app real. |
| [68] | documentação oficial | android/androidify (GitHub) | https://github.com/android/androidify | O app é um exemplo de código aberto; o README não cita o Expressive; a seção About liga para a Google Play. |
| [69] | autor do estilo | Androidify na Google Play | https://play.google.com/store/apps/details?id=com.android.developers.androidify | Só que a listagem existe: abriu apenas o título. |
| [70] | autor do estilo | Introducing Material 3 Expressive for Wear OS (Android Developers Blog, 25/08/2025) | https://android-developers.googleblog.com/2025/08/introducing-material-3-expressive-for-wear-os.html | Os botões que mudam de tamanho e de forma com mola para separar estados; o pedido de respeitar o desempenho e a bateria do relógio. |
| [71] | documentação oficial | Material Symbols guide (Google Fonts) | https://developers.google.com/fonts/docs/material_symbols | O peso da fonte por configuração e o parâmetro `display=block`. |
| [72] | referência técnica | How to create high-performance CSS animations (web.dev) | https://web.dev/articles/animations-guide | O `transform` e o `opacity` na composição, o custo do desfoque, o Paint Flashing e o `will-change` com moderação. |
| [73] | referência técnica | Understanding SC 2.2.2 Pause, Stop, Hide (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | A regra dos cinco segundos para o que se move sozinho. |
| [74] | referência técnica | Carousel Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ | Os controles, a rotação e os papéis e estados do carrossel. |
| [75] | pesquisa | Carousel Usability (Nielsen Norman Group, Kara Pernice, 14/09/2013, revista em 07/08/2026) | https://www.nngroup.com/articles/designing-effective-carousels/ | Até cinco quadros, sem avanço automático no celular, a espiada do próximo e o hero estático como alternativa. |
| [76] | referência técnica | Understanding SC 2.4.11 Focus Not Obscured (Minimum) (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html | O foco não pode ficar inteiro escondido; a falha F110 e a técnica C43. |
| [77] | referência técnica | Understanding SC 2.3.3 Animation from Interactions (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html | O movimento disparado por interação, o desfoque pela errata e a técnica C39. |
| [78] | referência técnica | Understanding SC 2.5.8 Target Size (Minimum) (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | O alvo de 24×24 px CSS e as exceções. |
| [79] | referência técnica | Menu Button Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ | O `aria-haspopup`, o `aria-expanded` e o teclado do botão que abre menu. |
| [80] | referência técnica | backdrop-filter (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter | O suporte (Baseline 2024) e o backdrop root que corta o desfoque. |
| [81] | imprensa | What Google Material 3 Expressive redesigns are rolling out (9to5Google, Abner Li, 17/11/2025) | https://9to5google.com/2025/11/17/google-material-3-expressive-redesign/ | Os apps do Google publicados com floating toolbar, search app bar, contêineres, button groups, split buttons e novas formas. |
| [82] | imprensa | Material 3 Expressive em apps do Google, prévia (9to5Google, Abner Li, 13/05/2025) | https://9to5google.com/2025/05/13/material-3-expressive-google-apps/ | As prévias do Fitbit, do Gmail e do Google Photos. |
| [83] | imprensa | Floating toolbar do Google Photos (9to5Google, Abner Li, 12/02/2026) | https://9to5google.com/2026/02/12/google-photos-floating-toolbar/ | A toolbar em pílula do Photos para iOS e a disputa sobre o uso dela como navegação. |
| [84] | praticante | @m3e/web, README 2.5.12 (jsDelivr) | https://cdn.jsdelivr.net/npm/@m3e/web@2.5.12/README.md | Uma implementação de terceiros em Web Components, com os componentes do Expressive e sem carrossel. |
| [85] | praticante | material-esm/material (GitHub) | https://github.com/material-esm/material | Um fork de terceiros do material-web que chama o original de parado e aponta para uma demo do Expressive. |
| [86] | praticante | davidmarinangeli/Foodie (GitHub) | https://github.com/davidmarinangeli/Foodie | Um app de receitas em Material 3 anterior ao Expressive. |
| [87] | galeria | Tópico material-3-expressive (GitHub) | https://github.com/topics/material-3-expressive | Há 150 repositórios, e nenhum dos 20 primeiros é de comida. |

## Padrões de página

O que a documentação e o autor dizem sobre a página como um todo:

- **Níveis de expressão** [65]: o fundacional, o excelente e o transformador, e o guia pede mirar no excelente ou no transformador. O excelente pede vários componentes expressivos, algum uso da biblioteca de formas e de contenção, movimento com morph e mola e momentos expressivos próprios do produto (os hero moments). O transformador acrescenta contenção expressiva, hierarquia dramática, personalização e combinações de cor inesperadas. O domínio é o relógio, não a web.
- **Elementos** [26]: cor, forma, tamanho, movimento e contenção, usados para destacar as ações-chave e agrupar o que é parecido. A pesquisa usou óculos de eye-tracking em 10 apps, e os elementos-chave foram achados até quatro vezes mais rápido. O tempo para tocar as ações-chave caiu alguns segundos nos designs expressivos testados. É relato do autor, sem replicação independente.
- **Linguagem** [66]: os contêineres agrupados dividem o espaço por igual, para dar simetria, ou de forma estratégica, para criar hierarquia e destacar o importante. Os cantos e as formas servem a animações de carregamento, layouts, botões que mudam de forma e grupos de botões adaptáveis. Os eixos de peso e largura das fontes variáveis, como a Roboto Flex, dão o retorno de movimento das interações.
- **Layout feed** [64]: uma grade configurável de elementos equivalentes. Os grupos nascem do mesmo tamanho e da mesma posição, e a atenção vai para o elemento maior que os vizinhos. Cards e listas são comuns, a grade vai de uma coluna a várias, e os cabeçalhos de seção ocupam a largura toda.
- **Limites** [26]: o expressivo não serve a todo produto (o texto dá como exemplo uma interface de banco e pede respeitar os padrões consagrados). Trocar a lista de músicas por capas espalhadas e tirar os rótulos de texto das ações de e-mail pioraram a usabilidade, e uma minoria forte preferiu versões mais calmas.

### 1. Toolbar flutuante em pílula (recorrente)

Ações da página, ou abas entre páginas relacionadas, ficam num contêiner em pílula que flutua sobre o conteúdo, em geral perto da base. Às vezes há um FAB ao lado para a ação de maior prioridade. Ao rolar, a toolbar recolhe as ações das pontas ou sai inteira da tela [57]. A pesquisa do Google testou uma floating toolbar [26]. Usá-la como navegação principal é uma questão disputada: a página do Compose diz que ela pode navegar entre páginas relacionadas [57]; o autor de [83] lê a diretriz no sentido contrário, como componente que não substitui a barra de baixo, e o comentário mais curtido da mesma página discorda dele citando a diretriz.

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| [83] | Google Photos para iOS (versão 7.63): a barra de baixo vira uma pílula com Fotos, Coleções e Criar, a aba ativa é marcada por uma pílula, e um FAB à direita serve para buscar ou perguntar. A toolbar não some ao rolar. | publicado | galeria de fotos |
| [81] | Files by Google: uma pílula na página inicial com Quick Share e digitalizar. Google Chat: a pílula marca a aba atual (segundo [83], o Chat a usa para navegar desde 2024). | publicado | arquivos e mensagens |
| [67] | Androidify: uma HorizontalFloatingToolbar para escolher o tipo de prompt. O repositório [68] liga para a listagem [69], da qual abriu só o título. | publicado | criador de avatar |
| [82] | Fitbit: as abas Dia, Semana, Mês e Ano descem do topo para uma pílula flutuante embaixo, ao alcance de uma mão. Em [81], esse app ainda não tinha saído. | conceito (prévia) | saúde |
| [57] | O exemplo da documentação: editar, favoritar, adicionar (botão preenchido) e compartilhar, com as pontas recolhendo ao rolar; há uma versão vertical presa à lateral. | conceito | documentação |

O padrão é recorrente: o Photos, o Files, o Chat e o Androidify são produtos distintos e publicados. Todos são do Google, o autor do estilo, e três dos quatro vêm da mesma revista. Fontes: [57], [26], [81], [83], [67].

### 2. Contenção: conteúdo em contêineres arredondados sobre uma superfície que contrasta (recorrente pela contagem de produtos, com uma só fonte publicada)

Listas e blocos ficam dentro de contêineres de canto grande que se destacam do fundo, e a busca e as ações às vezes ficam numa camada de cor à parte. O espaço é dividido por igual ou de forma a criar hierarquia [66]. O Google diz que botões maiores e contenção de alto contraste tornam a interface mais usável para todos [26].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| [81] | Contêineres no Gmail (lista e mensagem), na Agenda (horários), no Chat, nos Contatos, no Drive, no Keep, no Maps, no Meet (cards de chamada), no Mensagens, no One, na Wallet, no Telefone e em outros apps do Google. | publicado | apps do Google |
| [82] | Gmail: a lista de mensagens fica num card com os cantos de cima arredondados; a busca, o menu e a troca de conta ficam numa camada de cor mais viva. É o mesmo produto do exemplo anterior e não conta como independente. | conceito (prévia) | e-mail |
| [66] | Uma ilustração de contêineres agrupados que dividem o espaço para criar hierarquia. | conceito | documentação (relógio) |
| [26] | A contenção de alto contraste nos protótipos da pesquisa. | conceito | protótipos de pesquisa |

O padrão é recorrente pela contagem de produtos, mas todos os produtos publicados vêm de uma só fonte de imprensa [81], sem confirmação nas notas oficiais de cada app. Fontes: [66], [26], [81].

### 3. Formas do catálogo e troca de forma como ênfase (recorrente)

Botões e elementos de destaque usam formas que fogem do retângulo (biscoito de lobos, pílula, quadrado arredondado) e trocam de forma ao interagir ou na transição [66][54]. No Wear OS, os botões mudam de tamanho e de forma com mola para separar estados, como tocar e pausar, e para guiar a atenção [70].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| [67] | Androidify: o botão da câmera tem a forma MaterialShapes.Cookie9Sided, e as transições entre telas trocam de forma. | publicado | criador de avatar |
| [81] | Google TV: um split button no topo que muda de forma. Google Meet: na tela antes da chamada, os botões passam de círculo a quadrado arredondado. Relógio e Pixel Screenshots: FAB em quadrado arredondado. Docs, Sheets e Slides: botões em pílula no editor. | publicado | TV, videochamada, relógio, documentos |
| [58] | Polígonos que se transformam sem parar como indicador de espera, soltos ou dentro de um círculo. | conceito | documentação |
| [84] | Um componente de forma com morph embutido, em Web Components. | conceito (biblioteca de terceiros) | biblioteca web |

O padrão é recorrente: o Androidify, o Google TV e o Meet são produtos independentes e publicados. Fontes: [66], [70], [54], [67], [81].

### 4. Ação-chave maior e mais destacada (não recorrente)

A ação principal da tela cresce, ganha cor de destaque e desce para perto do polegar [26]. O nível excelente pede momentos expressivos próprios do produto [65], e a toolbar flutuante aceita um FAB para a ação de maior prioridade [57].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| [26] | Um protótipo de e-mail com o botão Enviar maior, logo acima do teclado e em cor secundária, contra a versão pequena na barra de cima, junto de outros controles. | conceito (protótipo de pesquisa) | e-mail |
| [82] | Gmail: o botão Escrever fica bem mais forte que antes. | conceito (prévia) | e-mail |
| [81] | As páginas iniciais do Docs, do Sheets e do Slides, com search app bar e um FAB grande. Achado na verificação. | publicado | documentos |

O padrão não é recorrente: o protótipo e o Gmail são do mesmo domínio e podem estar ligados, e sobram dois produtos independentes (Gmail e Docs). O Androidify saiu deste padrão (ver "Refutadas na verificação"). Fontes: [26], [65], [57].

### 5. Busca no topo como app bar (recorrente pela contagem de produtos, com uma só fonte publicada)

A tela abre com um campo de busca em pílula no topo, com o menu e o perfil fora dele. Ao tocar, o campo se expande com sugestões ou uma lista filtrada [62].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| [81] | Gmail e Keep, com o menu e o perfil fora do campo; Drive; Gerenciador de Senhas, com o nome do app no canto; páginas iniciais do Docs, do Sheets e do Slides. | publicado | apps do Google |
| [82] | Gmail: a busca, o menu e a conta numa camada de cor mais viva acima da lista. É o mesmo produto do exemplo anterior. | conceito (prévia) | e-mail |
| [62] | A search bar recolhida e expandida, com sugestões e uma lista filtrada de nomes de doces do Android. | conceito | documentação |

O padrão é recorrente pela contagem de produtos (Gmail, Keep, Drive, Docs), mas com uma só fonte de imprensa. A documentação recomenda a search bar quando a busca é o foco principal do app [62]. Fontes: [62], [81].

### 6. Seleção com grupo conectado ou chips que mudam de canto (não recorrente)

Opções que se excluem, ou de filtro, ficam em botões encostados, com formas de início, meio e fim, ou em chips cujo canto arredonda ao selecionar [54][60].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| [54] | Um grupo conectado de seleção única com Trabalho, Restaurante, Café, Busca e Casa, cada um com ícone e com o papel de rádio; o selecionado troca de forma. | conceito | documentação |
| [60] | Um filter chip com canto de 12 dp que fica totalmente redondo e ganha um check ao ser selecionado. | conceito | documentação |

Não encontrei uso publicado: [81] cita button groups no Drive, mas não diz se são conectados nem se servem para escolher opção. Fontes: [54], [60].

### 7. Carrossel com tamanhos variados e espiada do próximo (não recorrente)

Uma fileira horizontal de imagens com canto extra-grande, em que os itens mudam de largura (multi-browse) ou o último passa da borda (uncontained), sinalizando que há mais [34]. A NN/g recomenda mostrar parte do próximo quadro [75].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| [34] | Multi-browse com fotos de doces: dois itens grandes, um médio e um estreito cortado no fim. | conceito | documentação |
| [34] | Uncontained: itens da mesma largura, e o último passa inteiro da borda. | conceito | documentação |

Os dois exemplos vêm da mesma página, e não encontrei produto publicado. Fontes: [34], [75].

## Catálogo de seções candidatas

Os textos da loja estão hoje em `src/direcoes/compartilhado/dados.js` (o inventário ainda chama o arquivo de `conteudo.js`). Os links da navegação ficam em `useLinksPrincipais.js`, e a contagem do carrinho, em `useContadorCarrinho.js`, na mesma pasta.

| Seção | O que faz | Origem | Conteúdo real exigido (arquivo e campo) | Viável sem inventar? |
|---|---|---|---|---|
| App bar de busca no topo | A marca à esquerda, a busca em pílula, e o carrinho e o Entrar fora do campo. Ao focar, o campo sugere nomes do cardápio. | [81], [62] | `products.json`: `menuItems.foods[].name`, `drinks[].name`, `desserts[].name`; `dados.js`: `MARCA`; `useLinksPrincipais.js`; `useContadorCarrinho.js`; placeholder provisório | Sim. Ressalva: a busca é uma função nova, e [62] a recomenda quando a busca é o foco do app, o que não vale para uma loja com 11 itens. |
| Hero flexível com ação-chave grande | Título em display, texto de várias linhas, botão L ou XL "Ver cardápio" e o recorte do hambúrguer dentro de uma forma do catálogo; é o hero moment do nível excelente. | [59], [26], [65] | `dados.js`: `HERO.titulo`, `HERO.texto`, `HERO.acao`, `HERO.imagem` (`fundos/banner-burger-bg`), `IMAGEM_HERO` (WebP com alfa 480/960, PNG 960) | Sim. É adaptação: a app bar flexível é barra de app, não hero de página. |
| Carrossel multi-browse "Mais pedidos" | Fotos com canto extra-grande e larguras variadas, a espiada do próximo, os botões Anterior e Próximo e o nome e o preço em cada item; sem rotação automática; na ordem do JSON. | [34], [75], [74] | `products.json`: `menuItems.foods[]` (`name`, `image`, `price`), 7 itens; `dados.js`: `SECAO` (`titulo`, `anterior`, `proximo`); `public/images` em 480, 960 e 1440; preço via `formatPrice` | Sim. Ressalva: os 7 itens passam dos cinco quadros que a NN/g recomenda [75], e não há dado de pedidos por trás do título. |
| Filtro de categorias em grupo conectado | Seleção única entre Hambúrgueres, Bebidas e Sobremesas, com a contagem calculada, trocando a grade logo abaixo; na web, a semântica é de grupo de rádio. | [54], [60] | `dados.js`: `CATEGORIAS[].rotulo`; contagem derivada de `menuItems.foods`, `drinks` e `desserts` | Sim. Ressalva: Sobremesas tem um item só. |
| Grade (feed) de cards com destaque por tamanho | Uma grade adaptativa de cards filled. Um card ocupa mais colunas por critério neutro (o primeiro do JSON), sem alegar "mais vendido". Cada card traz foto, nome, descrição, preço e "Adicionar". | [64], [63] | `products.json`: `menuItems.foods[]` (`name`, `description`, `ingredients`, `price`, `image`); menor preço derivado; título de seção provisório | Sim. |
| Card com split button "Adicionar" | O botão da frente, "Adicionar <nome>", abre o modal Personalizar real. O de trás gira a seta e abre um menu com os adicionais e os preços, e cada item leva ao mesmo modal. | [55], [79] | `products.json`: `foodAdditionals[]` (5, com preço); modal real via `usePersonalizar.js` | Sim. Ressalva: o menu só repete o caminho do modal e precisa da semântica de menu button [79]. |
| Toolbar flutuante inferior | Uma pílula com Início, Cardápio e Entrar ou Perfil, e um FAB ao lado com o carrinho e a contagem, que recolhe as pontas ao rolar. | [57], [83], [81], [67] | `useLinksPrincipais.js` (Início, Cardápio, Entrar ou Perfil); `useContadorCarrinho.js` | Sim. Ressalvas: o uso como navegação é disputado [83], a página precisa de `scroll-padding` [76] e os rótulos precisam ficar visíveis [26]. |
| FAB menu de contato | Um FAB que se abre em cinco ações: WhatsApp, e-mail, ver no mapa, Instagram e Facebook (a página aceita de duas a seis). O ícone passa de + para fechar. | [56] | `dados.js`: `CONTATOS` (endereço com link do Google Maps, WhatsApp, e-mail), `REDES` (Facebook e Instagram) | Sim. Ressalva: os links das redes são genéricos (`facebook.com`, `instagram.com`). |
| Contêineres agrupados de horário e endereço | Dois contêineres de canto grande sobre o surface-container, lado a lado no desktop e empilhados no celular. | [66], [81], [26] | `dados.js`: `HORARIO`, `CONTATOS` (endereço e link do mapa), `RODAPE.horario` e `RODAPE.endereco` (rótulos) | Sim. |
| "Monte o seu": adicionais em chips | Uma fileira de chips só de exibição com os adicionais de lanche e de sobremesa e os preços, mais a contagem calculada, levando ao cardápio. | [60] | `products.json`: `foodAdditionals[]` (5) e `dessertAdditionals[]` (7), com preço; contagem derivada; título provisório | Sim, mas fora do papel documentado: o filter chip existe para filtrar, e os chips de ação viraram botões [60]. |
| Rodapé em docked toolbar | Uma faixa baixa no fim da página com os links e o excesso num menu (AppBarRow), seguida da `AssinaturaEncaixe`, intocada. | [59] | `dados.js`: `RODAPE.copyright`, `REDES`, `CONTATOS` | Sim. É adaptação: o docked toolbar é a barra de ações de um app, não um rodapé. |
| Acompanhamento do pedido (Live Update) | Um cartão com o progresso da entrega, no estilo dos Live Updates. | [25] | Não existe: o rastreio e o prazo de entrega estão na lista do que não existe. | Não. |
| Promoções e combos em carrossel hero | Uma imagem grande de promoção e a espiada da próxima. | [34] | Não existe: promoções, combos e cupons estão na lista do que não existe. | Não. |
| Indicador de carregamento do cardápio | Um LoadingIndicator enquanto a vitrine "carrega". | [58] | Não há espera real: o cardápio vem do `products.json` ou do localStorage. Seria enfeite, e [58] diz que o indicador nunca é decorativo. | Não. |
| Avaliações e depoimentos em formas expressivas | Notas e citações de clientes em contêineres com formas do catálogo. | [66] | Não existe: avaliações, notas, depoimentos e citações estão na lista do que não existe. | Não. |

## Componentes típicos e estados

O índice do Compose [53] tem páginas próprias para button groups, FAB menu, split button, floating toolbar e loading indicator, este separado de progress indicators. Não há página só de "toolbar": o docked toolbar está na página de app bars [59]. Entre as páginas abertas, só a do loading indicator marca os exemplos como experimentais (`@ExperimentalMaterial3ExpressiveApi`) [58], e a search bar é experimental [62]. As de button group, split button, FAB menu e floating toolbar não dizem nada sobre isso.

| Componente | Estados e regras | Fontes |
|---|---|---|
| Botão (XS, S, M, L, XL) | Habilitado; pressionado, com troca de forma; toggle marcado ou desmarcado. As camadas de hover, foco e pressionado e o anel de foco vêm da rodada 1 ([11], [12], [30]), e as versões redonda e quadrada também ([17] a [19]). | [54], [55] |
| Button group padrão | Em repouso; o item pressionado se expande e os vizinhos se comprimem; o que não cabe vai para um menu de estouro; o grupo fica numa linha só; grupos empilhados não interagem na vertical. | [54] |
| Button group conectado | Toggle buttons marcados ou desmarcados; seleção única (com o papel de rádio no exemplo), múltipla ou obrigatória; formas de início, meio e fim; substitui os segmented buttons; não se usa quando nenhum botão alterna. | [54] |
| Split button (filled e tonal) | O botão da frente faz a ação principal. O de trás fica recolhido ou expandido, com o estado lido pelo leitor de tela, o ícone girando 180° e a forma mudando. Em geral abre um menu, mas pode abrir outro componente, como um card. O filled é de ênfase alta, para ações importantes ou finais; o tonal, de ênfase média; os dois vêm nos cinco tamanhos. | [55] |
| FAB menu | Recolhido ou expandido, com duas a seis ações; um só tamanho de menu; não se usa com extended FAB; cores primary, secondary e tertiary. No exemplo, o ícone passa de + para fechar, o FAB some ao rolar a lista, e o botão tem o estado lido e vem antes do conteúdo na ordem de leitura. Substitui o speed dial e os FABs pequenos empilhados. | [56] |
| Floating toolbar | Horizontal ou vertical; standard ou vibrant; com ou sem FAB; expandida ou recolhida (as ações das pontas somem ao descer e voltam ao subir); fora da tela com `exitAlwaysScrollBehavior`. O contêiner fica inteiro na tela, e o excesso vai para um menu. | [57] |
| Docked toolbar (FlexibleBottomAppBar) | Mais baixa que a bottom app bar, com arranjo horizontal mais flexível; o AppBarRow manda o excesso para um menu. | [59] |
| Top app bar (small, medium flexible, large flexible) | Altura flexível, várias linhas, título no início ou no centro, subtítulo, imagens; rolagem pinned, enterAlways ou exitUntilCollapsed. A medium e a large flexible são recomendadas no lugar da medium e da large. | [59] |
| Search bar | Recolhida ou expandida, com sugestões ou lista filtrada; consulta vazia ou preenchida; o exemplo ajusta a ordem de leitura do TalkBack. | [62] |
| Carrossel | Multi-browse (itens grande, médio e pequeno, com o último cortado), uncontained (mesma largura, passando da borda), hero e full-screen (um item de borda a borda, com rolagem vertical); a página só tem código dos dois primeiros. Controles de anterior e próximo; controle de rotação só se girar sozinho. | [34], [74] |
| Filter chip, elevated filter chip e input chip | Sem seleção, com canto de 12 dp; com seleção, totalmente redondo e com mola; o filter chip pode mostrar um check quando selecionado. Os assist e suggestion chips foram fundidos aos botões expressivos. | [60] |
| Card (filled, elevated, outlined) | Mostra um único conteúdo coerente (por exemplo, um produto num app de compras); habilitado ou desabilitado; só responde a toque na variante com `onClick`. | [63] |
| Navigation bar e ShortNavigationBar | De três a cinco destinos de igual importância, em janelas compactas, iguais em todas as telas; item selecionado ou não. A ShortNavigationBar é mais baixa, com itens verticais no compacto e horizontais no médio. | [61] |
| Loading indicator | Padrão (formas soltas) ou contido (dentro de um círculo, para contrastar com o conteúdo); indeterminado ou determinado (de 0 a 1). Serve a esperas curtas, em geral abaixo de cinco segundos, é recomendado no lugar da maioria dos indicadores circulares indeterminados e sempre indica um processo real. | [58] |

## Riscos de acessibilidade e desempenho

- **Carrossel que gira sozinho:** o que se move sozinho por mais de cinco segundos ao lado de outro conteúdo precisa de um jeito de pausar, parar ou ocultar (2.2.2, nível A), e o que se atualiza sozinho nem tem a exceção dos cinco segundos [73]. A APG pede um controle de rotação como primeiro item do Tab dentro do carrossel e a parada da rotação com o foco e com o mouse por cima [74]. A saída mais simples na Home é não girar.
- **Carrossel que esconde conteúdo:** muita gente rola e passa direto, os pontos são pistas fracas e mais de cinco quadros afastam o uso; os controles devem ser grandes e ficar dentro do carrossel [75]. Os lanches do carrossel precisam aparecer também na grade ou no cardápio.
- **Foco coberto:** uma floating toolbar, um FAB ou um FAB menu fixos falham na 2.4.11 (AA) se cobrirem inteiro o elemento focado; a falha típica é a do cabeçalho ou rodapé fixo (F110), e a técnica é o `scroll-padding` (C43). Uma sobreposição translúcida ou desfocada pode não esconder o foco, mas o indicador ainda precisa do contraste da 1.4.11 [76].
- **Movimento disparado por interação:** as molas, a troca de forma e a mudança de tamanho contam como movimento na 2.3.3 (AAA), e, pela errata, o desfoque também conta; só mudar cor ou opacidade não conta. A técnica é o `prefers-reduced-motion` (C39) [77]. No projeto, tudo isso fica dentro de `motion-ok`.
- **Custo do morph:** o web.dev pede restringir as animações a `transform` e `opacity`, evitar o que dispara layout ou pintura e lembra que o desfoque pinta mais devagar; não fala de `border-radius`, `clip-path` nem `filter`. Para medir, indica o Paint Flashing e o painel Performance, e pede `will-change` só com moderação [72]. A regra do projeto também só aceita animar `transform` e `opacity`, então o morph teria de ser aproximado com escala ou com troca de opacidade entre duas formas.
- **Material Symbols:** a fonte com todos os eixos pesa cerca de 7,9 MB, e o conjunto completo, cerca de 295 KB; um subconjunto de três ícones pedido com `icon_names` cai para cerca de 1,7 KB, e o `display=block` evita mostrar o nome do ícone como texto antes de a fonte carregar [71]. Uma nova origem de fonte teria de entrar na CSP do `index.html`.
- **Rótulos:** tirar os rótulos de texto das ações de e-mail piorou a usabilidade na pesquisa do próprio Google [26]. A toolbar flutuante e os botões só de ícone precisam de rótulo visível ou, no mínimo, de nome acessível.
- **Semântica dos componentes novos:** o Compose marca o papel de rádio no grupo conectado de seleção única [54] e o estado expandido ou recolhido no split button [55] e no FAB menu [56]. Para o botão que abre menu, a APG pede `aria-haspopup` (menu ou true) e `aria-expanded`; o Enter e o Espaço abrem o menu e levam o foco ao primeiro item, e as setas fazem isso como opção [79]. O equivalente web do grupo de rádio é o padrão de rádio da APG, que não foi aberto nesta execução.
- **Alvo comprimido:** o grupo padrão comprime os vizinhos do botão pressionado [54], e a 2.5.8 (AA) pede alvo de 24×24 px CSS, salvo quando um círculo de 24 px centrado no alvo não toca outro alvo [78]. A ligação entre os dois é inferência da verificação: a página do Compose não fala de tamanho de alvo.
- **Desfoque de fundo:** o `backdrop-filter` é Baseline 2024, "newly available", e pode não funcionar em aparelhos antigos. Um ancestral com `opacity` abaixo de 1, `filter`, `mask` ou `clip-path` vira backdrop root, e o desfoque deixa de alcançar a página [80]. É preciso um fundo opaco de reserva, com contraste medido.
- **Sem implementação oficial na web:** o @material/web está em manutenção e não cita o Expressive [29]. As alternativas são de terceiros (o @m3e/web [84] e o fork material-esm [85]), e dependência nova exige perguntar ao usuário; o caminho é implementar à mão.
- **Indicador sem espera:** o loading indicator serve a esperas curtas, nunca é decorativo, e as APIs são experimentais [58]. A Home não tem espera real.
- **Expressivo onde não cabe:** quebrar padrões conhecidos (como trocar a lista de músicas por capas espalhadas) piorou a usabilidade, e uma minoria forte prefere versões calmas [26]. O caminho do pedido (cards, Adicionar, carrinho) fica nos padrões conhecidos, e a expressão vai para o hero e os destaques.
- **Toolbar como navegação:** o uso é disputado ([57] contra a leitura de [83]), e a diretriz completa fica em m3.material.io, que não abre por fetch.

## Não encontrei

- Site ou landing page publicado em M3 Expressive, de comida ou de qualquer domínio.
- App de comida, restaurante ou entrega publicado em M3 Expressive. O Jetsnack tem sistema de design próprio, com paleta própria, forma e tipografia do Material e muitos degradês; o README cita só de passagem a navegação inferior e as categorias da busca e diz que algumas telas não foram implementadas [36]. O Foodie é um app de receitas que usa o Material3 1.0.0-alpha06, anterior ao Expressive, com cor dinâmica do papel de parede e uma paleta de reserva do Theme Builder, e o README não descreve a Home [86]. Nenhum dos 20 primeiros dos 150 repositórios do tópico material-3-expressive é de comida [87].
- Template de restaurante em Material 3 ou Material You.
- Diretriz oficial de página inteira (Home ou landing) para a web no M3. O mais perto são o layout feed [64] e os hero moments do guia de níveis, que é de relógio [65].
- Pesquisa independente (fora do Google) sobre o M3 Expressive. Os números vêm do próprio Google [26], e a página da pesquisa não traz autor nem data.
- Indicação de API experimental nas páginas de button group, split button, FAB menu e floating toolbar, lidas por inteiro.
- Como implementar o carrossel hero no Compose: a página só mostra o multi-browse e o uncontained [34].
- Produto publicado com carrossel multi-browse ou hero.
- Confirmação oficial, app por app, das search app bars e dos contêineres: vêm todos de [81].
- Medida de custo para animar `border-radius` ou `clip-path` no navegador.
- Versão Android da toolbar flutuante do Google Photos, na página aberta [83].
- Dados da listagem do Androidify além do título (desenvolvedor, descrição, instalações) [69].
- Galerias (Dribbble, Behance, Figma, Mobbin): não foram consultadas nesta execução; ficam com outro agente.

## Não abriu

| URL | Motivo |
|---|---|
| https://developer.android.com/develop/ui/compose/components/button-groups | 404, segundo o pesquisador; o endereço certo é `.../button-group`, que abriu. |
| https://developer.android.com/develop/ui/compose/components/toolbar | 404, segundo o pesquisador; não existe página só de toolbar, e o índice [53] confirma isso. |
| https://codelabs.developers.google.com/codelabs/mdc-102-objc | 301 para material.io, não seguido; nada dele foi usado. |
| https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter | Lida só até o caractere 100 000 de 144 577, na pesquisa e na verificação; o resto ficou sem ler. |
| https://m3.material.io/components/carousel/overview | O m3.material.io só funciona com JavaScript. Vale o mesmo para os links de app bars, toolbars, chips, navigation bar, search e canonical layouts a que as páginas do Compose remetem. |
| https://developer.android.com/reference/kotlin/androidx/wear/compose/material3/ButtonGroup.composable | Não foi aberta, e nada dela foi usado. |
| https://themeforest.net/search/food%20material | Não foi aberta: é a listagem de uma loja de templates. |
| https://composables.com/material-3-expressive | Não foi aberta; os nomes de componentes foram conferidos nas páginas oficiais do Compose. |
| https://developer.android.com/design/ui/wear/guides/get-started/apply | Abriu, mas devolveu o mesmo conteúdo da página design-language; só a design-language [66] foi citada. |
| https://play.google.com/store/apps/details?id=com.android.developers.androidify | Abriu em parte, na verificação: veio só o título da listagem [69]. |

## Refutadas na verificação

1. **A14:** o corte de "segundos" no tempo para tocar como efeito dos botões maiores. [26] diz que o tempo para tocar as ações-chave caiu em segundos nos designs expressivos testados, sem atribuir isso a um fator.
2. **A15:** "quem tinha menos familiaridade gostou menos". [26] diz que o resultado foi afetado pela falta de familiaridade com o estilo e espera que ela cresça, mas não compara grupos.
3. **A18:** "o Expressive chega ao Google Photos, ao Fitbit e ao Gmail", como fato. [25] fala de um plano: o Google diz que trabalha para levar o estilo a esses apps.
4. **A18:** a tipografia enfatizada na cortina de notificações. [25] cita a tipografia entre as mudanças do Android, sem ligá-la à cortina.
5. **A19:** "a tela mostrada tem título central e o botão 'Let's Go' embaixo, no centro". O post não descreve essa tela: só o código põe o botão em `BottomCenter`, e o texto centralizado aparece em outro trecho.
6. **A19:** "o README aponta para a listagem na Google Play". O link está na seção About do repositório [68], não no corpo do README.
7. **A26:** a rotação parada pelo mouse "só volta por pedido do usuário". [74] diz isso do foco; para o mouse, não diz como a rotação volta.
8. **A33:** o Google Photos na lista dos apps com contêineres. [81] cita o Photos só pelo novo indicador de backup.
9. **A33:** botões em pílula no app Telefone. [81] cita o Telefone só pelos contêineres.
10. **A33:** search app bar "quase sempre com menu e perfil fora do campo". [81] diz isso do Gmail e do Keep; do Gerenciador de Senhas, diz só que o nome do app fica no canto.
11. **A35:** a versão Android da toolbar do Photos (texto de 17/07/2026, noticiado em 08/07, com a data numa segunda pílula). Nada disso está em [83].
12. **Padrão "Ação-chave maior":** o Androidify como exemplo. [67] não fala de tamanho nem de destaque do botão "Let's Go", só da posição dele no código e da transição de cor que ele dispara.
13. **Padrão "Seleção com grupo conectado":** o Drive como uso publicado. [81] cita button groups no Drive sem dizer se são conectados ou de seleção. Os split buttons do Google TV e do Docs são outro componente e saíram do padrão.

Ajustes de redação, sem derrubada: A2 (o README do Jetsnack cita também as categorias da busca), A17 ("como resposta ao toque" virou "retorno de movimento das interações"), A36 (o fork material-esm "aponta para" a demo, em vez de recomendá-la; a afirmação foi conferida em [85], e não no README de [84]) e o exemplo do Photos no padrão 1 (saiu o "alta na tela").

## Referências visuais (galerias)

Coletadas no Chrome em 20 e 21/11/2026, numa aba própria, recusando os cookies não essenciais. Só as páginas que abriram; 8 exemplos. Servem só de exemplo do padrão abstrato: nenhuma imagem, layout ou código foi copiado. As descrições são paráfrases.

| URL | Galeria | Publicado ou conceito | Domínio | Padrões vistos |
|---|---|---|---|---|
| https://dribbble.com/shots/25913303-Mobile-App-Concept-Reservations-Material-3-Expressive | Dribbble | Conceito (shot) | Comida: reserva de mesa em cafeteria ou restaurante | Folha inferior num container tonal verde-sálvia com cantos bem arredondados e a foto aninhada com raio grande; horários como chips em pílula num tom vivo de lima, com botão redondo de seta para "ver mais"; indicador em… |
| https://dribbble.com/shots/22405764-Food-Delivery-Material-You-m3-Design-system | Dribbble (Setproduct, kit Material Me) | Conceito (tela de um kit de UI à venda) | Comida: delivery | Botão segmentado em pílula; busca em pílula com fundo tonal; categorias como miniaturas de foto em formato de estádio com legenda, a escolhida com contorno; chips de filtro com check no estado ativo; containers tonais… |
| https://www.figma.com/community/file/1695747533279107617/google-material-3-expressive-design-system-unofficial | Figma Community | Conceito (kit não oficial) | Design system | Formas recortadas (biscoito, flor, onda, blob) usadas como fundo decorativo; dois níveis de tipografia, com a variante enfatizada (mais pesada) nos títulos; botões que trocam de forma ao toque (redondo vira quadrado… |
| https://www.framer.com/marketplace/templates/slurp-ramen/ | Framer Marketplace | Conceito (template pago) | Restaurante: casa de lámen | O estilo é retrô dos anos 70, não Material: parentesco parcial. Em comum com o M3E: botões e chips em pílula de contorno grosso; foto recortada em arco; selo redondo e etiqueta inclinada flutuando sobre a foto (aviso… |
| https://dribbble.com/shots/27570405-Plant-Care-Tracker-App | Dribbble | Conceito (shot) | App de cuidado com plantas | Cada grupo com seu container pastel (verde, azul, amarelo); foto circular dentro de card quadrado-arredondado (contraste de formas); card de topo com os cantos de baixo muito arredondados; contador em pílula ao lado do… |
| https://land-book.com/websites/52325-android-do-more-with-google-on-android-phones-and-devices | Land-book | Publicado (android.com) | Sistema operacional e aparelhos (Google) | Cards de foto com raio grande; botão redondo de "+" para abrir o card; botões em pílula translúcidos sobre foto; containers pastel (menta, lavanda) para cada aparelho; títulos sans grandes e diretos. É a fase Android… |
| https://dribbble.com/shots/27446051-Food-Bank-app | Dribbble | Conceito (shot de um case; não confirmei que o app está no ar) | Comida: resgate e retirada de pacotes de alimentos | Componentes M3 adaptados a uma identidade de fora (azul-marinho e amarelo); blocos de informação empilhados no canto da foto (dia, quantos restam, novo); chips de status com ícone (disponível, vence hoje); confirmação… |
| https://www.figma.com/community/file/1559643321874678939/instagram-material-3-expressive | Figma Community | Conceito (releitura de um app real) | Rede social | Barra de navegação flutuante, solta da borda, em pílula de tom claro, com o item ativo dentro de um quadrado-arredondado tonal; listas agrupadas em blocos arredondados com pequenos vãos entre os itens; ícones coloridos… |

## Etapa 6: grupo de categorias e checkbox (21/11/2026)

Feita em 21/11/2026, com a verificação concluída em 22/11. Um pesquisador abriu as páginas com WebFetch e devolveu 37 afirmações. Depois, um verificador reabriu cada URL e tentou derrubar cada uma, conferindo se a página diz aquilo, com a medida ou o comportamento citado, e se a fonte é da classe declarada. A seção responde a duas perguntas do desenho da etapa 6 (Cardápio e modal Personalizar): qual a semântica web do grupo de categorias, com três opções que se excluem e trocam a grade logo abaixo, na mesma página; e como o M3 desenha o checkbox e a linha de lista com seleção, para os ingredientes do modal. Ela completa a linha "Semântica dos componentes novos" de "Riscos de acessibilidade e desempenho", que dizia que o padrão de rádio da APG não tinha sido aberto: agora foi, junto com os de botão, abas e toolbar. Também detalha o padrão 6 e a linha "Button group conectado" de "Componentes típicos e estados". Das 37 afirmações, 30 ficaram inteiras, 7 ficaram em parte e nenhuma caiu inteira. Da síntese do pesquisador, dois trechos caíram e dois viraram inferência. Tudo isso está em "Refutadas na verificação (etapa 6)". As fontes que já tinham número mantêm o número ([29], [54] e [78]), e as novas vão de [88] a [117].

### Fontes da etapa 6

| Nº | Tipo | Título | URL | O que sustenta |
|---|---|---|---|---|
| [88] | referência técnica | Radio Group Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/radio/ | O que é o grupo de rádio, o teclado dentro e fora de toolbar, os papéis e estados e a diferença do rádio nativo no Shift+Tab. |
| [89] | referência técnica | Radio Group Example Using Roving tabindex (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio/ | O foco itinerante, o foco que envolve rádio e rótulo, o `::before` e o `forced-color-adjust`. |
| [90] | referência técnica | Button Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/button/ | O toggle com `aria-pressed`, o rótulo que não muda com o estado, o teclado e o foco depois da ação. |
| [91] | referência técnica | Tabs Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ | Os papéis, o `aria-controls`, a ativação automática ou manual e o teclado das abas. |
| [92] | referência técnica | Read Me First (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/ | O papel ARIA como promessa de teclado e o suporte incompleto no celular. |
| [93] | referência técnica | Toolbar Example (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/ | O alinhamento de texto como `radiogroup` com cara de toggle, e o negrito, o itálico e o sublinhado como toggles. |
| [94] | referência técnica | Toolbar Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/ | O papel `toolbar` só com três controles ou mais, uma parada no Tab e as setas com foco itinerante. |
| [95] | referência técnica | H71: Providing a description for groups of form controls using fieldset and legend elements (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/html/H71 | O `fieldset` com `legend` para rádios e checkboxes, suficiente para a 1.3.1 e a 3.3.2. |
| [96] | referência técnica | Understanding SC 4.1.2 Name, Role, Value (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html | Nome, papel e estado; o selecionado do checkbox e do rádio como estado; os controles HTML padrão já cumprem. |
| [97] | referência técnica | Understanding SC 3.2.2 On Input (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/on-input.html | A mudança de conteúdo que não é mudança de contexto e a falha F37. |
| [98] | referência técnica | Understanding SC 1.4.11 Non-text Contrast (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | O 3:1 de componentes, estados, check e foco; o checkbox reprovado; a troca de fundo e a 1.4.1. |
| [99] | referência técnica | Understanding SC 1.4.1 Use of Color (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | A cor que não pode ser o único sinal e a diferença de luminância de 3:1 como sinal extra. |
| [54] | documentação oficial | Button groups (Jetpack Compose; já citada) | https://developer.android.com/develop/ui/compose/components/button-group | Nesta etapa: o código de seleção única com `Role.RadioButton`, o FlexBox com quebra e os ícones que não trocam. |
| [78] | referência técnica | Understanding SC 2.5.8 Target Size (Minimum) (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | Nesta etapa: as fileiras com 1 px de folga e a exceção do controle do agente do usuário. |
| [100] | documentação oficial | ButtonGroup (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ButtonGroup.composable | As amostras do grupo conectado, horizontal e vertical, com `Role.RadioButton` e sem `selectableGroup()`. |
| [101] | documentação oficial | SingleChoiceSegmentedButtonRow (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/SingleChoiceSegmentedButtonRow.composable | A linha de seleção única existe para dar a semântica certa. |
| [102] | documentação oficial | Segmented button (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/segmented-button | A seleção única e a múltipla, o limite de 2 a 5 itens e o check no selecionado. |
| [103] | documentação oficial | ToggleButton (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ToggleButton.composable | A troca entre as cores primary e tonal, a troca de forma e o tamanho small padrão. |
| [104] | documentação oficial | ToggleButtonDefaults (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ToggleButtonDefaults | As cores, as formas e as medidas padrão, todas sem valor escrito. |
| [105] | documentação oficial | ButtonGroupDefaults (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ButtonGroupDefaults | As formas de início, meio e fim, o marcado único, o `ConnectedSpaceBetween` e o `ExpandedRatio`. |
| [106] | documentação oficial | ShapeDefaults (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ShapeDefaults | O `Small` sem medida. |
| [107] | documentação oficial | ListItem (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ListItem.composable | As linhas de seleção única e múltipla, com o controle filho sem callback. |
| [108] | documentação oficial | Checkbox (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/checkbox | A anatomia, os três estados e o `TriStateCheckbox`. |
| [109] | documentação oficial | Checkbox (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/Checkbox.composable | O checkbox sem callback e a amostra da linha com texto, de 56 dp. |
| [110] | documentação oficial | CheckboxDefaults (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/CheckboxDefaults | As cores do checkbox, sem papéis, e o `StrokeWidth`. |
| [111] | documentação oficial | API defaults (acessibilidade no Jetpack Compose) | https://developer.android.com/develop/ui/compose/accessibility/api-defaults | O alvo de 48 dp, o clique levado à linha, a fusão da semântica e o `minimumInteractiveComponentSize`. |
| [112] | documentação oficial | Checkbox (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/checkbox.md | Os tokens principais, o rótulo e a nota de rótulo do `md-checkbox`. |
| [113] | documentação oficial | _md-comp-checkbox.scss (tokens v0_192 do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-checkbox.scss | As medidas e as cores por papel de cada estado do checkbox. |
| [114] | documentação oficial | _checkbox.scss (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/checkbox/internal/_checkbox.scss | O alvo de 48 px, o anel de foco, o traço do indeterminado, as cores forçadas e o movimento. |
| [115] | documentação oficial | checkbox.ts (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/checkbox/internal/checkbox.ts | O input nativo dentro do shadow root e o `aria-checked="mixed"`. |
| [116] | documentação oficial | Lists (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/list.md | Os tipos de item, os papéis e as cores da lista, sem exemplo com checkbox. |
| [117] | documentação oficial | Radio button (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/radio.md | O grupo pelo `name` dentro de um `radiogroup` com rótulo e os tokens do rádio. |

### Grupo de seleção única: rádio, toggle e abas (APG)

**Rádio [88][89].** Um grupo de rádio é um conjunto de botões marcáveis em que no máximo um fica marcado. Algumas implementações começam sem nenhum marcado, para obrigar a escolha [88].

- Papéis: o `radiogroup` contém os `radio`, cada um com `aria-checked` true ou false. Cada rádio tira o nome do conteúdo, de `aria-labelledby` ou de `aria-label`. O grupo tem rótulo por `aria-labelledby` (rótulo visível) ou por `aria-label`, e o `aria-describedby` entra se houver descrição [88].
- Teclado fora de toolbar: Tab e Shift+Tab entram e saem do grupo. Ao entrar, o foco vai ao rádio marcado ou, sem marcado, ao primeiro. Espaço marca o focado. Seta direita ou baixo leva ao próximo, desmarca o anterior e marca o novo, voltando do último ao primeiro; esquerda ou cima faz o inverso [88].
- Rádio nativo: quando nenhum está marcado, alguns navegadores põem o foco no último rádio com Shift+Tab, em vez do primeiro [88]. A página do padrão não fala de `<input type="radio">` nem de `<fieldset>`; o foco itinerante e o `aria-activedescendant` aparecem só nos títulos dos exemplos [88].
- No exemplo com foco itinerante, só um rádio tem `tabindex="0"`: o primeiro ao carregar, depois o último focado; os outros têm −1. O visual segue o `aria-checked` por seletor de atributo. O indicador de foco envolve o rádio e o rótulo. O marcado é desenhado com `::before`, e os SVG têm `forced-color-adjust: auto` [89].

**Rádio dentro de toolbar [88][94].** As setas movem o foco sem mudar o marcado. Espaço marca, e Enter também, como opção. A página nota que esses rádios costumam ter cara de toggle [88]. O papel `toolbar` só vale para grupos de 3 controles ou mais; a toolbar é uma parada só no Tab, e as setas movem o foco, com foco itinerante no exemplo [94].

**Toggle [90].** É um botão de dois estados, com `aria-pressed` true ou false. A página chama de crítico que o rótulo não mude quando o estado muda. Espaço e Enter ativam. Numa ação que não fecha o contexto, o foco em geral fica no botão. A página não trata vários toggles como seleção única nem compara o toggle com o rádio ou com as abas.

**Abas [91].** São seções de conteúdo em camadas, com um painel visível por vez.

- Papéis: `tablist` com rótulo; cada `tab` com `aria-controls` para o painel e `aria-selected` true ou false; cada `tabpanel` com `aria-labelledby` para a aba e `tabindex="0"` se não começar com algo focável.
- Ativação: a automática, no foco, é a recomendada quando o painel aparece sem atraso perceptível, o que em geral pede conteúdo pré-carregado; sem isso, ela deixa o foco lento. Na manual, Espaço ou Enter ativam a aba.
- Teclado: Tab entra na aba ativa e sai para o painel. Esquerda e direita circulam entre as abas, com volta; Home e End são opcionais. Numa lista horizontal, cima e baixo ficam para a rolagem.
- A página não compara abas com rádio nem com toggles.

**Como a APG escolhe.** Nenhuma das páginas abertas traz um critério geral. A Read Me First não trata disso: diz que é melhor não usar ARIA do que usar ARIA errado, que um papel ARIA não traz teclado nem estilo do navegador (ao contrário dos inputs HTML) e é uma promessa que o autor tem de cumprir com JavaScript, e que alguns recursos ARIA não funcionam em nenhum navegador móvel, sem abordagem padrão para toque [92]. A única justificativa achada está no exemplo da toolbar: os botões de alinhamento (esquerda, centro, direita) têm cara de toggle, mas são um `radiogroup` com `aria-label="Text Alignment"`, `role="radio"` e `aria-checked`, porque só um vale por vez e o ARIA descreve semântica, não estilo. Negrito, itálico e sublinhado, que são independentes, são toggles com `aria-pressed`. Ali, mover o foco não muda o marcado [93].

**O que a WCAG acrescenta.**

- O `fieldset` com `legend` agrupa rádios e checkboxes, e os agentes do usuário muitas vezes apresentam a legenda antes do rótulo de cada controle. É técnica suficiente para a 1.3.1 e a 3.3.2. Não se deve aninhar fieldsets à toa, e eles são dispensáveis quando o grupo já tem instruções claras e opções distintas (H44). A página não fala de `role="group"` nem de `role="radiogroup"` [95].
- Os controles HTML padrão já cumprem a 4.1.2 quando usados conforme a especificação. Se um checkbox ou rádio está selecionado é um estado da interface. Os widgets próprios, entre eles os toggle buttons, pedem medidas extras (ARIA5) [96].
- Mudança de conteúdo nem sempre é mudança de contexto: a definição cita menus dinâmicos e abas, e um exemplo com select que mostra campos novos na mesma página mantém o contexto básico. A F37 é abrir janela nova sem aviso ao mudar rádio, checkbox ou select [97].

| | Rádio | Toggle | Abas |
|---|---|---|---|
| Papéis | `radiogroup` com rótulo; `radio` | botão com `aria-pressed` | `tablist` com rótulo; `tab`; `tabpanel` |
| Estado | `aria-checked`, no máximo um marcado | `aria-pressed`, um por botão | `aria-selected`; `aria-controls` aponta o painel |
| Tab | uma parada; cai no marcado ou no primeiro | a página não trata de grupo | entra na aba ativa e sai para o painel |
| Setas | movem e marcam, com volta; em toolbar, só movem | não há | movem, com volta; ativam no modo automático |
| Espaço e Enter | Espaço marca; Enter é opcional em toolbar | ativam | ativam no modo manual |
| Escolha exclusiva na APG | o alinhamento de texto [93] | não tratada | não comparada |
| Fontes | [88], [89], [93] | [90] | [91] |

**Leitura da verificação (inferência).** Para três opções que se excluem e trocam a grade na mesma página, o caso documentado mais próximo é o rádio: a APG o usa na escolha exclusiva com cara de toggle [93], e o Compose marca o grupo conectado de seleção única com papel de rádio ([54], [100]). O `aria-pressed` de hoje (`src/components/ui/CategoryTabs.vue`) é o caso que a APG não cobre [90]. Com rádio nativo dentro de `fieldset` e `legend`, o teclado e o estado vêm do navegador ([92], [96]), e a legenda dá o contexto do grupo [95]; com `role="radiogroup"` à mão, o teclado e o foco itinerante ficam por conta do código ([88], [89], [92]). As abas também serviriam, mas pedem `aria-controls` e fazem da grade um `tabpanel` [91]. Trocar a grade com as setas é mudança de conteúdo [97], e a grade já está carregada, como pede a ativação automática das abas [91]. A escolha fica com o desenho.

### Grupo conectado no Compose

| Tema | O que as páginas dizem | Fontes |
|---|---|---|
| Uso | O grupo conectado reúne toggle buttons para escolher opções, trocar de vista ou ordenar, e substitui os segmented buttons. Não se usa quando nenhum botão alterna. Na referência, os botões de início e de fim têm forma assimétrica e servem para fazer uma seleção. | [54], [100] |
| Semântica | Na seleção única, cada `ToggleButton` recebe `Modifier.semantics { role = Role.RadioButton }`; no multi-select, nenhum papel é definido. Nenhuma amostra do grupo conectado põe `selectableGroup()` no contêiner. A amostra de seleção única do `ListItem` põe `selectableGroup()` na `Column`. A `SingleChoiceSegmentedButtonRow` serve quando só um valor vale, "for correct semantics"; nela o item usa `selected` e `onClick`, e no multi-select, `checked` e `onCheckedChange`. | [54], [100], [107], [101], [102] |
| Cores | O `ToggleButton` é um botão filled que troca entre as cores primary e tonal conforme o `checked`; a página não diz qual cor vai em qual estado. Em `ToggleButtonDefaults.colors()`, os seis parâmetros (contêiner e conteúdo, em habilitado, desabilitado e marcado) têm padrão `Color.Unspecified`, sem papel de cor citado. A elevação padrão vem de `FilledButtonTokens`. | [103], [104] |
| Formas | O `ToggleButton` troca entre as três formas de `ToggleButtonShapes` (desmarcada, pressionada e marcada) desde que sejam `CornerBasedShape`; o tamanho padrão é o small. Em `ButtonGroupDefaults`, cada posição (início, meio e fim) tem forma própria em repouso e pressionada; a do meio usa `ShapeDefaults.Small` em repouso; o marcado é um só `connectedButtonCheckedShape`, um `RoundedCornerShape`, nas três posições. `shapesFor(altura)` escolhe o balde de forma (XS a XL) pela altura padrão mais próxima. Nenhuma dessas formas tem dp escrito. | [103], [105], [104], [106] |
| Espaços | `ConnectedSpaceBetween` é o espaço padrão entre os botões do grupo conectado, sem valor na página. Os exemplos quebram linha: o guia usa FlexBox com `wrap`, `columnGap(ButtonGroupDefaults.ConnectedSpaceBetween)` e `rowGap(2.dp)`; a referência usa FlowRow com os mesmos valores. O grupo padrão, ao contrário, fica numa linha só. A amostra vertical empilha os botões com `spacedBy((-6).dp)`, parte da forma do meio, põe `CornerSize(100)` no topo do primeiro e no pé do último e usa o `pressedShape` e o `connectedButtonCheckedShape` padrão. | [105], [54], [100] |
| Sinal do selecionado | Nenhum exemplo do grupo conectado mostra check. As amostras da referência com ícone trocam o Outlined pelo Filled ao marcar. No código do guia, Restaurant e Search usam o mesmo ícone nos dois estados, e nesses dois o estado aparece só pela cor e pela forma. O segmented button de seleção única mostra um check no selecionado, pelo texto alternativo da figura; o multi-select vai de 2 a 5 itens, e acima disso se usam chips. | [100], [103], [54], [102] |
| Versão | `ToggleButtonDefaults` e `ButtonGroupDefaults` entraram na 1.5.0, sem anotação de experimental no texto aberto. No grupo padrão, o botão pressionado cresce 15% da largura (`ExpandedRatio`). | [104], [105] |

### Checkbox e linhas de lista com seleção (M3)

**Anatomia e estados [108].** O checkbox tem caixa, check e rótulo. Há três estados: não selecionado (caixa vazia), indeterminado (um traço) e selecionado (um check). O indeterminado exige o `TriStateCheckbox`. O guia pede checkbox em vez de switch ou rádio quando dá para marcar várias opções.

**Medidas (material-web).** A caixa e o ícone têm 18 px, e o canto, 2 px; a camada de estado tem 40 px, com forma corner-full [113]. O doc do componente repete o canto de 2 px [112]. O alvo é um input nativo invisível (opacidade 0) de 48×48 px; com `touch-target="wrapper"`, o host ganha uma margem de (48 px menos o tamanho da caixa) dividido por 2. O anel de foco mede 44×44 px, e o traço do indeterminado, 10×2 px [114]. No Compose, as páginas não escrevem a medida da caixa, do canto nem do `StrokeWidth` ([109], [110]).

**Cores por papel e estados (tokens v0_192 do material-web [113]).**

| Estado | Contorno | Contêiner | Ícone | Camada de estado |
|---|---|---|---|---|
| Desmarcado | 2 px, on-surface-variant | não há token de cor | não se aplica | on-surface no hover e no foco; primary no pressionado |
| Desmarcado com hover, foco ou pressionado | 2 px, on-surface | não há token de cor | não se aplica | como acima |
| Marcado | 0 px | primary | on-primary | primary no hover e no foco; on-surface no pressionado |
| Erro, desmarcado | error, também no hover, no foco e no pressionado | não há token de cor | não se aplica | só as opacidades, de md-sys-state |
| Erro, marcado | não há token | error | on-error | só as opacidades, de md-sys-state |
| Desabilitado, desmarcado | 2 px, on-surface | opacidade 0,38 | não se aplica | não há token |
| Desabilitado, marcado | 0 px | on-surface, opacidade 0,38 | surface | não há token |
| Indeterminado | traço de 10×2 px [114] | não encontrei token próprio | não encontrei token próprio | não encontrei token próprio |

As opacidades da camada de estado vêm de md-sys-state, sem número no arquivo [113]. No Compose, `CheckboxDefaults.colors()` cobre check, caixa e borda, nos estados marcado, desmarcado, desabilitado e indeterminado desabilitado; todos os padrões são `Color.Unspecified`, sem papel citado. Por padrão, a caixa desmarcada é transparente, e as cores animam entre os estados. Um só `StrokeWidth` serve ao check (marcado e indeterminado) e ao contorno (desmarcado). O checkbox do Compose não tem estado de erro [110].

**Cores forçadas e movimento [114].** Em `forced-colors`, o fundo e o contorno ficam CanvasText, o ícone fica Canvas e o desabilitado fica GrayText. Marcar leva 350 ms com emphasized-decelerate, e desmarcar, 150 ms com emphasized-accelerate; o fundo e o ícone têm ainda uma transição linear de 50 ms. Um keyframe anima o `width` do traço longo do check a partir de 0.

**Semântica web.** O componente do material-web desenha um `<input type="checkbox">` nativo dentro do shadow root, sem `role` explícito. O `aria-checked="mixed"` só aparece no indeterminado, o SVG fica `aria-hidden`, e o `aria-label` do host passa para o input [115]. O doc manda associar o rótulo com `<label>`, em volta ou por for e id, mas avisa que o checkbox não é rotulado automaticamente pelo `<label>` e sempre precisa de `aria-label` (b/294081528). Os exemplos usam `touch-target="wrapper"` sem explicar. O doc não descreve estado de erro visual; traz o `required` e a validação de formulário [112]. O rádio do material-web tem a mesma nota de rótulo; o grupo se forma pelo `name` e fica num `role="radiogroup"` com rótulo, sem falar de fieldset nem de setas; os tokens são ícone on-surface-variant, selecionado primary e 20 px [117].

**A linha inteira como alvo.**

- No Compose, o normal nos controles de seleção é deixar o callback do controle `null` e pôr `toggleable` ou `selectable` no pai. No exemplo CheckableRow, a Row tem `toggleable(role = Role.Checkbox)` e padding de 16 dp, o texto tem `weight(1f)` e o checkbox fica no fim, com `onCheckedChange = null`. `clickable` e `toggleable` fundem a semântica dos filhos numa entidade só [111].
- O alvo mínimo é de 48 dp, pelas diretrizes de acessibilidade do Material. O `Checkbox` com callback ganha padding até 48 dp; com `null`, não. O `minimumInteractiveComponentSize` reserva 48 dp de layout em cada dimensão e centraliza o elemento, sem aumentar o alvo em si; o Compose ainda estende o alvo de um clicável pequeno para fora das bordas dele [111].
- Com `onCheckedChange = null`, o checkbox não é interagível, salvo se outro elemento tratar a entrada. Na amostra da linha com texto, a Row tem largura total, 56 dp de altura, `toggleable(role = Role.Checkbox, indication = null)` com o mesmo `interactionSource` do checkbox e padding horizontal de 16 dp; o checkbox vem no início, com o próprio callback, e o texto em bodyLarge tem 16 dp à esquerda [109].
- O `ListItem` com `checked` e `onCheckedChange` é a linha de seleção múltipla, análoga a um checkbox; a amostra põe `Checkbox(onCheckedChange = null)` no `leadingContent`. O com `selected` e `onClick` é a de seleção única, análoga a um rádio, com `RadioButton(onClick = null)` no início e `selectableGroup()` na coluna. O `trailingContent` aceita, por exemplo, checkbox, switch ou ícone. As `ListItemShapes` mudam de forma conforme a interação [107].
- Achado na verificação: os exemplos do guia de checkbox põem texto e checkbox lado a lado numa Row, com o callback no próprio checkbox. Ali, a linha não é o alvo [108].
- No material-web, os itens interativos usam `type` button ou link (o padrão é text), com os slots start, end, headline, supporting-text e trailing-supporting-text. A lista tem `role="list"` (tabindex −1), e cada item, `role="listitem"` (tabindex 0). As cores são contêiner surface, rótulo on-surface e texto de apoio on-surface-variant. Não há exemplo com checkbox, rádio ou switch, nem altura ou padding de linha [116].
- O controle aparece no início ([107], [109]) e no fim [111].

**WCAG para o checkbox e a linha.**

- Componentes e estados precisam de 3:1 contra as cores vizinhas. O exemplo reprovado é um checkbox com borda cinza (#9D9D9D) a 2,7:1 no branco. O check também precisa de contraste (o exemplo aprovado tem um check cinza-claro a 5,6:1 na caixa roxa). Os indicadores de selecionado e de foco precisam de 3:1 [98].
- A troca de cor entre estados não precisa de 3:1 entre eles, mas a troca só de matiz tende a falhar a 1.4.1, e a troca de fundo dentro do componente fica fora da 1.4.11 e não passaria na 1.4.1. Os componentes desabilitados ficam isentos. Um controle com texto dispensa borda, mas o foco precisa de contraste; o hover é suplementar [98].
- A cor não pode ser o único meio visual. Uma diferença de cor conta como sinal extra quando a diferença de luminância dá 3:1 ou mais, mas o conteúdo que depende de perceber uma cor específica ainda pede outro sinal. A página não fala de abas, toggles, checkboxes nem rádios [99].
- A 2.5.8 não fala de checkbox nem do rótulo como parte do alvo. Duas fileiras de botões de 16 px com 1 px de folga falham, porque os círculos de 24 px invadem a outra fileira. A exceção do controle do agente do usuário só vale se o autor não mexeu no tamanho padrão [78].

### Riscos da etapa 6

- **Papel ARIA sem o teclado prometido:** um papel não traz teclado do navegador, e errar é pior que não usar ARIA; o suporte no celular é incompleto [92]. Um `radiogroup` à mão precisa do Tab no marcado, das setas com volta e do foco itinerante ([88], [89]); abas à mão precisam das setas e do Tab para o painel [91].
- **Toggles para escolha exclusiva:** a APG não trata vários toggles como seleção única [90] e, no exemplo equivalente, usa rádio [93]. Inferência: com `aria-pressed`, o leitor de tela anuncia cada botão como pressionado ou não, e nada diz que só um vale.
- **Setas que trocam a grade:** fora de toolbar, cada seta marca o rádio seguinte [88], então a grade troca a cada seta. É mudança de conteúdo, que não é necessariamente mudança de contexto [97]; nas abas, a ativação no foco só é recomendada sem atraso perceptível [91]. Inferência: o foco tem de continuar no grupo quando a grade troca.
- **Shift+Tab no rádio nativo:** sem nenhum marcado, alguns navegadores põem o foco no último rádio [88]. Inferência: o grupo de categorias sempre tem uma opção marcada, o que evita o caso.
- **Cor como único sinal:** a troca de fundo sozinha não passa na 1.4.1 ([98], [99]). O código do guia do Compose deixa dois itens só com cor e forma [54]. Os sinais documentados a mais são o check do segmented [102] e a troca do ícone Outlined pelo Filled ([100], [103]).
- **Contorno e check do checkbox:** o contorno desmarcado e o check precisam de 3:1 [98]. No M3, o contorno é on-surface-variant [113]; é preciso medir nos tokens do projeto (hoje, `--color-border-strong` em `src/assets/styles/components/ingredients-list.scss`).
- **Foco:** o indicador de foco precisa de 3:1 [98]. O exemplo da APG envolve rádio e rótulo [89], e o anel do checkbox M3 tem 44 px [114]. Inferência: com o input desenhado por `appearance: none`, o anel tem de aparecer no lugar certo.
- **Alto contraste:** o material-web tem regras próprias de `forced-colors` [114], e a APG usa `forced-color-adjust: auto` nos SVG [89]. Inferência: um checkbox com `appearance: none` precisa das suas.
- **Movimento:** o check do material-web anima `width` e leva 350 ms [114]. Isso fere a regra do projeto (só `transform` e `opacity`, e durações acima de `--dur-fast` só dentro de `motion-ok`): um check copiado tem de ser refeito.
- **Alvo:** a 2.5.8 pede 24×24 px CSS [78]; o Compose pede 48 dp [111], e o material-web usa um input de 48 px [114]. A linha de ingrediente do modal tem altura mínima de 44 px e checkbox de 24 px (`ingredients-list.scss`): passa na WCAG e fica abaixo dos 48 do M3. A folga entre as linhas só pesa se o alvo for menor que 24 px, como a caixa de 18 px do M3 sozinha ([78], [113]). Inferência: um checkbox com `appearance: none` e tamanho mudado perde a exceção do controle do agente do usuário [78].
- **Alvo duplo na linha:** o Compose leva o clique para a linha e deixa o controle sem callback ([111], [107]), mas a amostra de [109] mantém o callback do checkbox e compartilha o `interactionSource` com a linha. Inferência: na web, um controle clicável dentro de uma linha clicável pode marcar duas vezes ou ser lido duas vezes; um input nativo dentro de `<label>` dá um alvo só.
- **Rótulo:** a nota de rótulo do `md-checkbox` e do `md-radio` ([112], [117]) é do web component, que põe o input dentro do shadow root [115]. Inferência: um input nativo dentro de `<label>`, fora de shadow DOM, é rotulado, e os controles HTML padrão cumprem a 4.1.2 [96].
- **Rótulo fixo:** o rótulo de um toggle não pode mudar com o estado [90].
- **Medidas de antes do Expressive:** as medidas do checkbox vêm do material-web, que está em manutenção e não cita o Expressive [29]; as páginas do Compose não dão dp ([104], [105], [110]). Inferência: são medidas do M3, não necessariamente do Expressive.

### Não encontrei (etapa 6)

- Um critério geral da APG para escolher entre rádio, abas e toggle. Só há a justificativa do exemplo da toolbar [93]; nem a Read Me First [92] nem as páginas dos três padrões ([88], [90], [91]) tratam disso.
- Numa página do W3C aberta, o teclado do rádio nativo além da nota do Shift+Tab [88]. A página do padrão de rádio não fala de `fieldset`, e a H71 não fala de `radiogroup` [95].
- Os valores em dp do grupo conectado: `ConnectedSpaceBetween`, `ShapeDefaults.Small`, os cantos de início, fim, pressionado e marcado, `MinHeight`, `IconSize` e `IconSpacing` ([104], [105], [106]).
- Os papéis de cor do `ToggleButton` além de "primary e tonal", e qual vai no marcado ([103], [104]).
- O papel padrão do `ToggleButton` sem o modificador de semântica [103].
- Anotação de API experimental no `ToggleButton`, no `ToggleButtonDefaults` e no `ButtonGroupDefaults` ([103], [104], [105]).
- No Compose, a medida da caixa e do canto do checkbox e o valor do `StrokeWidth` ([109], [110]), e um estado de erro do checkbox [110].
- No material-web, as cores do indeterminado e a cor da camada de estado de erro: os tokens abertos trazem só as opacidades de erro [113].
- Orientação de erro no doc do checkbox do material-web, que traz só os tokens, o `required` e a validação [112].
- Exemplo de lista com checkbox no material-web, e altura ou padding de linha [116]. Os valores de `ListItemDefaults` (página não aberta).
- Os estados de que as `ListItemShapes` mudam de forma [107].
- Na 2.5.8, algo sobre checkbox ou sobre o rótulo como parte do alvo [78]. Na 1.4.1, algo sobre abas, toggles, checkboxes ou rádios [99].

### Não abriu (etapa 6)

| URL | Motivo |
|---|---|
| https://developer.android.com/reference/kotlin/androidx/compose/material3/TonalToggleButton.composable | HTTP 404, na pesquisa e na verificação. |
| https://m3.material.io/ (checkbox, segmented buttons, lists, toggle button) | Só funciona com JavaScript; não foi tentado. |
| Links "View Source" do cs.android.com (ToggleButton.kt, ButtonGroup.kt, Checkbox.kt, ListItem.kt) | Não foram abertos. É onde estariam os valores em dp e os papéis de cor. |
| https://developer.android.com/develop/ui/compose/accessibility/merging-clearing | Apareceu na busca e não foi aberta; a [111] bastou. |
| https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-activedescendant/ | Não foi aberta; a página do padrão [88] e o exemplo [89] bastaram. |
| Exemplos de abas automáticas e manuais da APG e https://www.w3.org/WAI/ARIA/apg/patterns/button/examples/button/ | Não foram abertos. |
| Página de referência do OutlinedToggleButton | O pesquisador a citou sem URL; não foi reaberta (ver abaixo). |
| Referências de `ListItemDefaults` e `ListItemShapes` | Não foram abertas na verificação; o pesquisador cita `ListItemDefaults` sem URL. |

### Refutadas na verificação (etapa 6)

1. **A2:** a nota do rádio nativo sem a condição. [88] diz que o Shift+Tab põe o foco no último rádio só quando nenhum está marcado.
2. **A10:** "é a única passagem da APG que justifica a escolha entre rádio e toggle". A verificação só sustenta que é a única entre as páginas abertas.
3. **A12:** "o agente do usuário apresenta a legenda antes do rótulo de cada controle", como regra. [95] diz que isso acontece muitas vezes. E o fieldset é dispensável quando o grupo tem instruções claras e opções distintas, não só "quando cada rótulo já é claro".
4. **A14:** "um select que mostra campos novos na mesma página não é falha". [97] dá esse caso como exemplo em que o contexto básico se mantém, sem chamá-lo de "não falha".
5. **A16:** "(percentual)" depois de `CornerSize(100)`. [100] escreve só o valor, sem dizer a unidade.
6. **A19:** a lista de estados das `ListItemShapes` (selected, pressed, focused, hovered, dragged). [107] diz só que as formas mudam conforme a interação.
7. **A20:** "a página do OutlinedToggleButton repete a mesma frase das cores". A página não tem URL nos dados e não foi reaberta; [103] traz só o `ToggleButton`.
8. **Síntese (componentes e riscos):** "no Compose, o controle filho fica sem callback (A26, A28)". Vale para [111] e [107], mas a amostra de [109] mantém o callback do checkbox e compartilha o `interactionSource` com a linha.
9. **Síntese (riscos):** "linhas empilhadas sem folga falham se o alvo for só a caixa". Pela [78], a folga só pesa se o alvo for menor que 24 px; uma caixa de 24 px passa pelo tamanho.
10. **Síntese (riscos), rebaixada a inferência:** o leitor de tela "anuncia cada botão como pressionado ou não, sem dizer que só um vale". Nenhuma página aberta diz isso.
11. **Síntese (recomendação), rebaixada a inferência:** "o nativo vale no celular (A9)". [92] diz que alguns recursos ARIA não funcionam no celular; não fala do rádio nativo.

Ajustes de redação, sem derrubada: A6 (o foco fica no botão "em geral"), A8 ([91] não diz que a ativação manual serve ao painel que demora; diz que, sem conteúdo pré-carregado, a automática deixa o foco lento), A17 (o `checked` e o `onCheckedChange` do multi-select foram conferidos em [102]) e A23 (na referência, trocam de ícone as amostras que têm ícone; a vertical só tem texto).
