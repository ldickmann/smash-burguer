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

## Etapa 8: campos de texto e formulários (23/11/2026)

Feita em 23/11/2026, com a verificação no mesmo dia. Um pesquisador abriu as páginas com WebFetch e devolveu 49 afirmações. Depois, um verificador reabriu cada URL e tentou derrubar cada uma, conferindo se a página diz aquilo, com a medida ou o comportamento citado, e se a fonte é da classe declarada. A seção responde às perguntas do desenho da etapa 8 (login, cadastro, perfil e o `FormGroup`): quando usar o campo filled ou o outlined do M3, com que medidas, cores e estados; o que a WCAG e o WAI Forms Tutorial pedem do rótulo, do erro e do anúncio; e como tratar o rótulo de status ("Recebido") e o "Ver itens" do histórico de pedidos. Ela completa a linha `FormGroup` da §4.2 do SPEC-M (`docs/direcoes/SPEC-material.md`), que dizia "Não encontrei fonte de text field nos dossiês". Das 49 afirmações, 43 ficaram inteiras, 6 ficaram em parte e nenhuma caiu inteira. Da síntese do pesquisador, um trecho caiu e dois ficaram em parte. Tudo isso está em "Refutadas na verificação (etapa 8)". O que a verificação achou e o pesquisador não trouxe está marcado "achado na verificação". As fontes que já tinham número mantêm o número ([8], [11], [29], [35], [60] e [98]), e as novas vão de [118] a [159].

### Fontes da etapa 8

| Nº | Tipo | Título | URL | O que sustenta |
|---|---|---|---|---|
| [118] | documentação oficial | Configure text fields (Jetpack Compose) | https://developer.android.com/develop/ui/compose/text/user-input | O filled como padrão e o outlined como variante, a escolha entre `TextField` e `BasicTextField`, os limites de linha, os modos de ocultar a senha e a atualização Expressive. |
| [119] | documentação oficial | TextField (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/TextField.composable | A ênfase do filled; `enabled`, `readOnly`, `isError`, `label` e `placeholder`; os exemplos de erro, de placeholder e de campo denso. |
| [120] | documentação oficial | OutlinedTextField (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/OutlinedTextField.composable | A ênfase menor do outlined em formulários com muitos campos e o rótulo `Cutout` como padrão. |
| [121] | documentação oficial | TextFieldLabelPosition (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/TextFieldLabelPosition | As posições `Above`, `Cutout` e `Inside` do rótulo e o `Attached` obsoleto. |
| [122] | documentação oficial | TextFieldLabelPosition.Above (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/TextFieldLabelPosition.Above | O rótulo acima e fora do contêiner, sempre minimizado. |
| [123] | documentação oficial | TextFieldDefaults (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/TextFieldDefaults | As constantes sem valor escrito, o padding com rótulo, o `roundedShape`, o `tonalColors()` e os parâmetros de cor por estado. |
| [124] | documentação oficial | OutlinedTextFieldDefaults (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/OutlinedTextFieldDefaults | A borda, o contêiner transparente, o recorte feito pelo framework e as versões Expressive. |
| [125] | documentação oficial | TextFieldDefaults.kt (código-fonte do AndroidX, espelho no GitHub) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/TextFieldDefaults.kt | Os valores de altura, largura e espessura, as formas e as cores tonais do filled e do outlined. |
| [126] | documentação oficial | SecureTextField (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/SecureTextField.composable | O campo de senha: uma linha, ações de menu desativadas, teclado padrão e o exemplo de mostrar a senha. |
| [127] | documentação oficial | Show or hide password based on a user toggle (quick guide do Compose) | https://developer.android.com/develop/ui/compose/quick-guides/content/show-hide-password | O ícone de 48 dp no fim do campo que alterna a senha visível. |
| [128] | documentação oficial | Validate input as the user types (quick guide do Compose) | https://developer.android.com/develop/ui/compose/quick-guides/content/validate-input | A validação durante a digitação, com o campo vazio fora do erro. |
| [129] | documentação oficial | ExposedDropdownMenuBox (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ExposedDropdownMenuBox.composable | O exposed dropdown só leitura e editável e o ícone final como âncora para a acessibilidade. |
| [130] | documentação oficial | Menus (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/menu | O `ExposedDropdownMenuBox` como menu preso a um campo de texto. |
| [131] | documentação oficial | Text field (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/text-field.md | Filled e outlined idênticos no funcionamento, a anatomia, os tipos aceitos, a validação e a nota do `aria-labelledby`. |
| [132] | documentação oficial | text-field.ts (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/textfield/internal/text-field.ts | O `aria-invalid`, o `aria-describedby` e o `aria-label` do input interno. |
| [133] | documentação oficial | field.ts (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/field/internal/field.ts | O `role="alert"` do texto de erro, o `reannounceError()`, o rótulo que flutua e a cópia do texto para a descrição. |
| [134] | documentação oficial | _md-comp-filled-text-field.scss (tokens v0_192 do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-filled-text-field.scss | As cores por papel, as espessuras, a forma e a tipografia do filled em cada estado. |
| [135] | documentação oficial | _md-comp-outlined-text-field.scss (tokens v0_192 do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-outlined-text-field.scss | As cores por papel, as espessuras e a forma do outlined em cada estado. |
| [136] | documentação oficial | _md-comp-filled-text-field.scss (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-filled-text-field.scss | O foco sobrescrito para 3 px e os espaços internos do filled. |
| [137] | documentação oficial | _md-comp-outlined-text-field.scss (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-outlined-text-field.scss | O foco sobrescrito para 3 px e os espaços internos do outlined. |
| [138] | documentação oficial | _md-comp-filled-field.scss (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-filled-field.scss | Os espaços do filled com e sem rótulo e a posição do texto de apoio. |
| [139] | documentação oficial | _md-comp-outlined-field.scss (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/_md-comp-outlined-field.scss | Os espaços do outlined, a folga do rótulo no recorte e a posição do texto de apoio. |
| [140] | documentação oficial | Select (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/select.md | O select filled e outlined, com a mesma anatomia e o mesmo erro do campo. |
| [141] | documentação oficial | Chips (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/chip.md | Os chip sets como toolbars, o rótulo do conjunto e o foco do chip desabilitado. |
| [142] | referência técnica | Understanding SC 3.3.1 Error Identification (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html | O erro identificado e descrito em texto, as técnicas e os limites da validação nativa. |
| [143] | referência técnica | ARIA21: Using aria-invalid to Indicate An Error Field (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA21 | Quando marcar `aria-invalid` e o teste do texto do erro. |
| [144] | referência técnica | Understanding SC 3.3.2 Labels or Instructions (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html | O rótulo sempre disponível, as técnicas e a única menção ao placeholder. |
| [145] | referência técnica | H44: Using label elements to associate text labels with form controls (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/html/H44 | O `label` com `for` e `id`, visível e antes do campo. |
| [146] | referência técnica | ARIA1: Using the aria-describedby property to provide a descriptive label for user interface controls (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA1 | A descrição programática ligada ao campo. |
| [147] | referência técnica | G83: Providing text descriptions to identify required fields that were not completed (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/general/G83 | O erro do obrigatório em texto e no título da página, e os dados mantidos depois do erro. |
| [148] | referência técnica | Understanding SC 3.3.3 Error Suggestion (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html | A sugestão de correção e as técnicas. |
| [149] | referência técnica | Understanding SC 1.3.5 Identify Input Purpose (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html | O propósito do campo pelo `autocomplete`. |
| [150] | referência técnica | Understanding SC 3.3.8 Accessible Authentication (Minimum) (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html | A senha como teste cognitivo, o colar e o preenchimento automático. |
| [151] | referência técnica | Understanding SC 4.1.3 Status Messages (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html | O que é mensagem de status, os papéis `status` e `alert` e o excesso de anúncios. |
| [152] | referência técnica | ARIA19: Using ARIA role=alert or Live Regions to Identify Errors (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA19 | O contêiner do erro presente desde o carregamento e o `aria-atomic`. |
| [153] | referência técnica | ARIA22: Using role=status to present status messages (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22 | O `role="status"` com `aria-atomic` explícito e o papel antes da mensagem. |
| [154] | referência técnica | Forms Tutorial (W3C WAI) | https://www.w3.org/WAI/tutorials/forms/ | Formulários só com o necessário e as sete partes do tutorial. |
| [155] | referência técnica | Labeling Controls (WAI Forms Tutorial) | https://www.w3.org/WAI/tutorials/forms/labels/ | O rótulo explícito, a posição e o rótulo oculto. |
| [156] | referência técnica | Form Instructions (WAI Forms Tutorial) | https://www.w3.org/WAI/tutorials/forms/instructions/ | O placeholder que não substitui o rótulo e o lugar das instruções. |
| [157] | referência técnica | Validating Input (WAI Forms Tutorial) | https://www.w3.org/WAI/tutorials/forms/validation/ | O obrigatório no rótulo e a validação também no servidor. |
| [158] | referência técnica | User Notifications (WAI Forms Tutorial) | https://www.w3.org/WAI/tutorials/forms/notifications/ | A lista de erros no topo, o foco no primeiro erro e os anúncios ao digitar e ao sair do campo. |
| [159] | referência técnica | Disclosure (Show/Hide) Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ | O botão com `aria-expanded`, o teclado e a seta. |
| [8] | documentação oficial | _md-sys-shape.scss (tokens v0_192 do material-web; rodada 1) | https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-shape.scss | Nesta etapa, aberto pelo endereço raw (https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-shape.scss): os raios de corner-extra-small, corner-extra-small-top e corner-medium. |
| [11] | documentação oficial | _md-sys-state.scss (tokens v0_192 do material-web; rodada 1) | https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-state.scss | Nesta etapa, aberto pelo endereço raw (https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-state.scss): as opacidades da camada de estado. |
| [29] | documentação oficial | material-components/material-web (GitHub; rodada 1) | https://github.com/material-components/material-web | Nesta etapa, a listagem da pasta `docs/components` (https://github.com/material-components/material-web/tree/main/docs/components), sem badge. |
| [35] | documentação oficial | Badges (Jetpack Compose; rodada 1) | https://developer.android.com/develop/ui/compose/components/badges | Nesta etapa: o badge que indica status sobre outro composable. |
| [60] | documentação oficial | Chips (Jetpack Compose; já citada) | https://developer.android.com/develop/ui/compose/components/chip | Nesta etapa: o chip como elemento interativo, com `onClick` nos quatro tipos. |
| [98] | referência técnica | Understanding SC 1.4.11 Non-text Contrast (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | Nesta etapa: o contraste da borda, da linha ou do fundo do campo e o cursor como indicador de foco. |

### Campo de texto do M3: filled e outlined

**Quando usar.** Os campos de texto aparecem em geral em formulários e diálogos. O filled tem mais ênfase visual e se destaca no meio de outros conteúdos e componentes [119]. O outlined tem menos ênfase, e, onde muitos campos ficam juntos, como num formulário, essa ênfase menor simplifica o layout [120]. No Compose, o `TextField` é o filled e o `OutlinedTextField`, o outlined. O guia recomenda o `TextField` do Material quando o desenho pede o campo do Material, e o `BasicTextField` quando o desenho dispensa as decorações [118]. O material-web diz que os dois são funcionalmente idênticos e manda às diretrizes do Material para escolher [131]. Nenhuma página aberta diz para não misturar os dois na mesma tela.

**Anatomia.**

- Contêiner, rótulo, placeholder, texto de apoio abaixo do campo, ícones de início e de fim, prefixo e sufixo [119]. No material-web, os ícones ficam em slots e servem para indicar o modo de entrada (como a busca), dar uma função a mais (como limpar) ou sinalizar erro. Há também o contador, quando o campo tem `maxlength`, e o asterisco no rótulo com `required`, que o `no-asterisk` esconde [131].
- O rótulo pode ser um `label` flutuante, um placeholder ou um rótulo externo [131]. Ele flutua quando o campo está com foco ou preenchido, e a cópia que não aparece fica com `aria-hidden` [133].
- Tipografia: no Compose, o rótulo usa bodySmall minimizado e bodyLarge expandido, e o placeholder usa bodyLarge [119]. Nos tokens do material-web, o rótulo e o texto digitado usam body-large, e o rótulo preenchido e o apoio usam body-small [134].
- Placeholder: no overload novo do Compose, aparece com o campo vazio; nos antigos, com o campo vazio e com foco. O exemplo usa `TextFieldLabelPosition.Inside(isAlwaysMinimized = …)` para mostrá-lo também sem foco [119]. No material-web, ele some quando há valor e não flutua [131].
- O texto de erro substitui o de apoio; com `error-text` vazio, o apoio continua [131].

**Posição do rótulo no Compose.**

| Posição | Onde fica | Padrão de |
|---|---|---|
| `Above` | Acima e fora do contêiner, por isso sempre minimizado; alinhado no início por padrão [122]. | nenhum componente aberto |
| `Inside` | Dentro do contêiner [121]. | `TextField` no overload novo [119] e `SecureTextField` [126] |
| `Cutout` | Dentro do contêiner quando expandido; minimizado, corta a borda [121]. | `OutlinedTextField` no overload novo [120] |
| `Attached` | Obsoleto: a página manda usar `Inside` no filled e `Cutout` no outlined [121]. | — |

**Medidas.**

| Medida | Compose | material-web |
|---|---|---|
| Altura mínima | 56 dp (`MinHeight`) [125], que se troca com `Modifier.heightIn` [123]. O exemplo de campo denso usa mínimo de 48 dp, padding de 4 dp em cima e embaixo e de 12 dp nas pontas [119]. | Não há token de altura nem de padding nos tokens v0_192 [134]. |
| Largura mínima | 280 dp (`MinWidth`) [125] | não encontrei |
| Linha do filled | 1 dp sem foco e 2 dp com foco [125] | 1 px em repouso e no hover e 2 px com foco nos tokens v0_192 [134]. O arquivo do componente sobrescreve o foco para 3 px, com um TODO para quando os tokens de foco chegarem a 3 px ([136], [138]). |
| Borda do outlined | 1 dp sem foco e 2 dp com foco [125] | 1 px em repouso e no hover e 2 px com foco [135]; 3 px pelo mesmo TODO ([137], [139]). |
| Cantos | Filled: `FilledTextFieldTokens.ContainerShape`; outlined: `OutlinedTextFieldTokens.ContainerShape`, os dois sem valor no arquivo. Expressive, nos dois: `ShapeKeyTokens.CornerMedium` [125]. | Filled: corner-extra-small-top, 4 px 4 px 0 0, só os cantos de cima ([134], [8]); o doc do componente dá corner-extra-small como padrão do filled [131]. Outlined: corner-extra-small, 4 px ([135], [8]). O corner-medium vale 12 px [8]. |
| Espaços internos | `TextFieldPadding` e `TextFieldWithLabelVerticalPadding`, sem valor na referência. Com rótulo interno, o padding de cima é o espaço acima do rótulo no estado com foco, e o texto fica logo abaixo do rótulo [123]. | 16 px em cima, embaixo e nas pontas; 12 px na ponta que tem ícone; 16 px entre o ícone e o texto; 2 px entre o prefixo ou o sufixo e o texto ([136], [137]). Filled com rótulo interno: 8 px em cima e 8 px embaixo [138]. Outlined: `outline-label-padding` de 4 px e `label-text-padding-bottom` de 8 px [139]. |
| Texto de apoio | Abaixo do campo [119]. | 4 px abaixo do campo, com 16 px de recuo dos dois lados ([138], [139]). |
| Ícones | não encontrei | 24 px ([134], [135]) |
| Camada de estado | — | 0,08 no hover, 0,12 no foco e 0,12 no pressionado [11]. O filled usa on-surface no hover [134]; o outlined não tem token de camada de hover [135]. |

**Cores por papel e estado (tokens v0_192 do material-web [134][135]).**

| Estado | Filled | Outlined |
|---|---|---|
| Repouso | Contêiner surface-container-highest; linha on-surface-variant de 1 px; texto on-surface; rótulo, placeholder, apoio e ícones on-surface-variant; cursor primary | Sem token de cor de contêiner; contorno outline de 1 px; texto on-surface; rótulo, placeholder, apoio e ícones on-surface-variant; cursor primary |
| Hover | Linha on-surface de 1 px; camada on-surface com a opacidade de hover | Contorno on-surface de 1 px; rótulo on-surface |
| Foco | Linha primary de 2 px (3 px no arquivo do componente [136]); rótulo primary | Contorno primary de 2 px (3 px [137]); rótulo primary |
| Erro | Linha, rótulo, apoio e ícone final em error | Contorno, rótulo, apoio e ícone final em error; ícone inicial on-surface-variant |
| Erro com hover | Linha, rótulo e ícone final on-error-container; apoio error; texto on-surface; ícone inicial on-surface-variant | Contorno, rótulo e ícone final on-error-container; apoio error |
| Erro com foco | Linha, rótulo, apoio, ícone final e cursor em error; texto on-surface; ícone inicial on-surface-variant | Contorno, rótulo, apoio, ícone final e cursor em error; ícone inicial on-surface-variant |
| Desabilitado | Contêiner on-surface a 0,04; linha on-surface a 0,38; texto, rótulo e ícones on-surface a 0,38; apoio a 0,38 | Contorno on-surface a 0,12; texto, rótulo, apoio e ícones a 0,38 |
| Somente leitura | Não há token. | Não há token. |

No Compose, `TextFieldDefaults.colors()` só tem parâmetros de foco, sem foco, desabilitado e erro (texto, contêiner, cursor, linha, ícones, rótulo, placeholder, apoio, prefixo e sufixo), todos com `Color.Unspecified` na assinatura: não há cor de hover nem de somente leitura [123]. No contêiner do outlined padrão, as quatro cores são transparentes [125]. Nos overloads antigos, o `isError` pinta o rótulo, a linha e o ícone final na cor de erro [119].

**Expressive.** A versão Expressive do campo funciona igual à padrão e muda o visual, com cantos mais redondos e cores mais tonais. No outlined Expressive, o rótulo fica dentro do contêiner, e não num recorte da borda de cima. O filled pede `TextFieldDefaults.roundedShape` e `TextFieldDefaults.tonalColors()`; o outlined pede os mesmos de `OutlinedTextFieldDefaults` e `labelPosition = TextFieldLabelPosition.Inside()` [118]. A referência descreve o `roundedShape` como a forma recomendada pelo estilo Expressive e pede o `tonalColors()` junto com o rótulo `Inside` ([123], [124]). Os dois `roundedShape` são `CornerMedium` [125], que vale 12 px no material-web [8].

Cores tonais no código-fonte [125] (a coluna do outlined é achado na verificação):

| Papel | Filled tonal | Outlined tonal |
|---|---|---|
| Contêiner | SurfaceContainer com e sem foco; ErrorContainer no erro; desabilitado, SurfaceContainer com alpha | Transparente em todos os estados |
| Linha ou borda | Transparente em todos os estados | OutlineVariant em repouso, com foco e desabilitado; Error no erro |
| Rótulo | OnSurfaceVariant com e sem foco; Error no erro; desabilitado, OnSurfaceVariant com alpha | OnSurfaceVariant com e sem foco; Error no erro; desabilitado, OnSurfaceVariant com alpha |
| Texto desabilitado | OnSurface com alpha | OnSurface com alpha |
| Cursor | não conferido | Primary; Error no erro |

Nas duas versões tonais, o contêiner, a linha ou a borda e o rótulo têm a mesma cor com e sem foco. A função do outlined tonal traz um TODO para trocar os valores pelo token real quando ele existir [125].

**Desabilitado e somente leitura.** No Compose, com `enabled=false`, o campo não responde, aparece desabilitado e fica desabilitado também para os serviços de acessibilidade. Com `readOnly=true`, o texto não pode ser alterado, mas o campo recebe foco e permite copiar; a página diz que o somente leitura costuma servir a formulários pré-preenchidos que o usuário não edita [119]. No material-web, `disabled` e `readonly` só aparecem nas tabelas da API, e campos desabilitados ou somente leitura não validam [131]. Achado na verificação: no `text-field.ts`, o `disabled` tira só a classe visual de erro; o `aria-invalid` continua seguindo o erro [132].

**Senha.**

- O `SecureTextField` é feito para senha. Tem uma linha só, vem com padrões para conteúdo seguro e desativa recortar, copiar e arrastar no menu de contexto. A página não fala de colar nem de preenchimento automático. O teclado padrão não tem autocorreção e usa `KeyboardType.Password`, e a obfuscação padrão é `System`. O exemplo põe no ícone final um `IconButton` que mostra ou esconde a senha, com a descrição "Show password" ou "Hide password" e uma dica (tooltip), e troca o teclado para `PasswordVisible` quando a senha aparece [126].
- A página Configure text fields recomenda o `SecureTextField` para senha e lista os modos `Hidden` (padrão no desktop), `Visible` e `RevealLastTyped` (padrão no celular) [118].
- O quick guide usa o `BasicSecureTextField` e um ícone clicável de 48 dp (`requiredSize(48.dp)`) no fim do campo, com a descrição fixa "Toggle password visibility", alternando entre `Visible` e `RevealLastTyped` [127].
- O material-web aceita o tipo `password` [131]; o doc não fala de botão de mostrar a senha.

**Seleção e várias linhas.**

- O exposed dropdown, também chamado de "spinner" ou "combo box", mostra o item escolhido num campo de texto ao qual o menu se prende. A versão só leitura é um `TextField` com `readOnly=true`, `menuAnchor(ExposedDropdownMenuAnchorType.PrimaryNotEditable)` e `ExposedDropdownMenuDefaults.TrailingIcon`. A editável serve de autocomplete, e o exemplo recomenda fazer do ícone final um `menuAnchor` do tipo `SecondaryEditable`, para que certos serviços de acessibilidade escolham uma opção sem digitar [129]. A página de menus confirma que o `ExposedDropdownMenuBox` cria um menu preso a um campo de texto [130].
- No material-web, o select tem as versões `md-filled-select` e `md-outlined-select`, e o doc o compara ao `<select>` nativo. Tem `label`, `supportingText`, `error`, `errorText` (que substitui o apoio), `required` e `noAsterisk`. O contêiner do filled é surface-container-highest, e o contorno do outlined é outline (tokens `--md-filled-select-text-field-*` e `--md-outlined-select-text-field-*`). A seção de acessibilidade está comentada, só com o texto-modelo [140].
- O campo do material-web aceita text, textarea, email, number, password, search, tel e url; o select não está na lista. O textarea vem com `rows` 2 e `cols` 20 e cresce com `field-sizing: content` nos navegadores que suportam [131].
- No Compose, o `TextFieldLineLimits.MultiLine(min, max)` cresce até o máximo de linhas e depois rola na vertical; o `SingleLine` tem altura fixa e rola na horizontal [118].

**Erro e anúncio no M3.**

- No overload novo do Compose, o `isError` pinta as partes do campo na cor de erro e anuncia um erro aos serviços de acessibilidade. O exemplo de erro usa `semantics { error(mensagem) }`, o `maxTextLength`, um contador "Limit: n/10" no apoio e um asterisco no rótulo durante o erro [119].
- O quick guide valida enquanto a pessoa digita: o campo vazio não conta como erro, e o e-mail fica com erro até casar com o padrão inteiro. O exemplo usa `OutlinedTextField` com `isError` e o apoio "Incorrect email format." [128].
- No material-web, o campo dentro de um `<form>` valida no envio ou no `reportValidity()`, que mostra o erro no texto de apoio; na validação manual, define-se `error` e `error-text` [131]. O input interno recebe `aria-invalid` (de `error` ou do erro nativo), `aria-describedby="description"` e `aria-label` (o `ariaLabel` ou, na falta dele, o `label`) [132]. Achado na verificação: o `field.ts` copia o texto de apoio ou de erro, com o contador, para esse elemento de descrição e o deixa escondido [133].
- O texto de apoio visível ganha `role="alert"` só quando há `error` e `errorText`. Para anunciar de novo o mesmo erro, o `reannounceError()` tira o papel e o devolve no frame seguinte. O `aria-live` não aparece no arquivo [133].
- Um campo com rótulo externo precisa de `aria-label`, porque hoje o componente não aceita `aria-labelledby` (bug b/276484803) [131].

**Leitura da verificação (inferência).** Para formulários com muitos campos, como o cadastro e o perfil, o caso documentado é o outlined, de ênfase menor [120]. O `FormGroup` de hoje já tem contorno e rótulo acima e fora, o que corresponde ao outlined com o rótulo `Above` ([121], [122]). Se o desenho seguir o Expressive, os cantos sobem para corner-medium, 12 px ([125], [8]), e, no outlined tonal, a borda é OutlineVariant e não muda de cor no foco [125]: o 3:1 e o indicador de foco precisam ser medidos nos tokens do projeto [98]. O somente leitura do Compose continua focável e copiável e não tem cor própria ([119], [123]); no `src/assets/styles/components/_form-group.scss` de hoje, `[readonly]` divide a regra com `:disabled`. A escolha fica com o desenho.

### Rótulo, instruções, erro e propósito do campo (WCAG e W3C)

| Critério | Nível | O que pede | Técnicas | Fonte |
|---|---|---|---|---|
| 3.3.1 Error Identification | A | O item com erro é identificado e o erro é descrito em texto. Reexibir o formulário sem nenhum aviso de falha não basta. Sinais visuais podem vir junto do texto. Um dado obrigatório omitido conta como erro de entrada. O critério não impõe o jeito de mostrar: lista no início do formulário, erro junto ao campo, alerta ou diálogo. | Suficientes: G83 e SCR18 (campos obrigatórios); ARIA18, G84, G85, SCR18 e SCR32 (formato ou valores permitidos). De apoio: G139 e G199. | [142] |
| 3.3.2 Labels or Instructions | A | Vale para todos os campos, obrigatórios ou opcionais. Rótulos e instruções precisam ficar sempre disponíveis; em muitos casos, o melhor é deixá-los visíveis na interface, e às vezes cabem sob pedido. | Suficientes: G131 com ARIA1, ARIA9, ARIA17, G89, G184, G162, G83 ou H90; H44, H71 e G167 (último recurso). De apoio: G13 e ARIA2 (`aria-required`). Falha: F82. | [144] |
| 3.3.3 Error Suggestion | AA | Quando o erro é detectado e a correção é conhecida, a sugestão aparece, salvo se comprometer a segurança ou o propósito do conteúdo. | Suficientes: ARIA18, G85 e G177 (formato); ARIA18, G84 e G177 (conjunto de valores). De apoio: G139, G199, SCR18 e SCR32. | [148] |
| 1.3.5 Identify Input Purpose | AA | Nos campos que coletam dados do próprio usuário, o propósito precisa ser determinável por programa; com o `autocomplete`, o navegador pode preencher. Exemplos: `given-name` e `family-name`. O `type` descreve o tipo do campo, não necessariamente o propósito, e a heurística do navegador não basta. | Suficiente: H98. Falha: F107 (valor de `autocomplete` errado). | [149] |
| 3.3.8 Accessible Authentication (Minimum) | AA | Lembrar a senha do site é teste cognitivo: precisa de outro método sem teste ou de um mecanismo de ajuda, como o gerenciador de senhas ou o copiar e colar. Bloquear o preenchimento automático ou o colar reprova, salvo com alternativa. Com a 1.3.5 e o nome acessível da 4.1.2, o gerenciador reconhece e preenche os campos. Mostrar a senha, como opção, melhora a chance de sucesso de algumas pessoas; não é exigência. | Suficientes: G218 (link por e-mail) e H100 (e-mail e senha bem marcados). Falha: F109 (impedir que a senha ou o código seja inserido de novo no mesmo formato). | [150] |

**Técnicas de campo.**

- **H44 [145]:** o `label` se liga ao campo pelo `for` igual ao `id`. Em texto, `select` e `textarea`, o rótulo vem antes do campo; em checkbox e rádio, depois. Para a 3.3.2, o `label` precisa estar visível. Clicar no rótulo ativa o campo, o que aumenta a área de clique.
- **ARIA1 [146]:** o `aria-describedby` dá ao controle uma informação descritiva determinável por programa e precisa apontar para um elemento do mesmo documento. É suficiente para a 3.3.2 com a G131 e de apoio para a 1.3.1.
- **ARIA21 [143]:** o `aria-invalid` marca o campo que falhou na validação e não deve ser "true" antes de a validação rodar; "false" equivale a não ter o atributo. A página diz que nenhum documento Understanding cita a técnica. O teste confere se o rótulo ou a instrução associados explicam o erro.
- **G83 [147]:** é suficiente para a 3.3.1, para a 3.3.2 com a G131 e para a 4.1.3 com a ARIA19. Também ajuda pôr o aviso de erro no título da página. No exemplo em que um script muda o rótulo ao sair do campo vazio, a página avisa que alguns leitores de tela podem não notar a mudança. O teste pede que os dados já digitados voltem preenchidos, salvo os de segurança, como a senha.

**Placeholder.** O Form Instructions diz que o placeholder costuma ter contraste menor que o texto digitado, some quando a pessoa começa a digitar e não é tratado como rótulo pelos leitores de tela; para a página, ele não substitui o rótulo [156]. A 3.3.2 só cita o placeholder num exemplo de chat, como reforço quando visível [144]. A H44 [145], o Labeling Controls [155] e a 1.4.11 [98] não falam dele.

**1.4.11 no campo [98].** Quando a borda, a linha inferior ou o fundo é o que mostra o campo, essa marca precisa de 3:1 contra a cor vizinha. Passam uma linha inferior #767676 e um campo só de fundo com 3:1 contra o fundo ao lado. Reprova uma borda #AAA sobre branco, abaixo de 3:1, num campo sem rótulo. O indicador de foco é obrigatório: o cursor de texto padrão pode bastar, mas um cursor próprio abaixo de 3:1 reprova. Componentes inativos, como um controle HTML desabilitado, ficam isentos. A página não fala de campo de texto desabilitado, de somente leitura nem de placeholder.

**Mensagens de status (4.1.3, nível AA).**

- Mensagem de status é a mudança de conteúdo que informa resultado, espera, progresso ou erro sem levar o foco até ela; o que muda de contexto, como mover o foco, fica fora do critério. Exemplos da página: "5 errors on page" depois de um envio que falhou, "Invalid entry" acima do campo, "Saved in 'Wedding' album" e um indicador de ocupado [151].
- O `role="status"` serve a sucesso e resultado (ARIA22); para progresso, a página lista ARIA23, ARIA25, ARIA22 com G193 e ARIA27. O `role="alert"` serve a sugestão, aviso ou erro (ARIA19), só quando não há mudança de contexto. O erro num diálogo que recebe o foco não é mensagem de status. Acordeão e disclosure já ficam com a 4.1.2, que cobre o anúncio de expandido e recolhido [151].
- A página alerta para a interface "tagarela" para quem usa leitor de tela e pede teste com usuários. As falhas são a F103 e, ainda sem número, o `role="alert"` ou o `aria-live="assertive"` em conteúdo que não é importante nem urgente [151].
- ARIA19: o contêiner do erro precisa estar no DOM desde o carregamento para a maioria dos leitores de tela o anunciar, e o `aria-atomic="true"` é necessário para o VoiceOver do iOS ler o erro depois de mais de um envio inválido [152].
- ARIA22: o `role="status"` tem `aria-live` polite e `aria-atomic` true implícitos, mas a página aconselha declarar o `aria-atomic="true"`, porque alguns ambientes não o tratam como atômico. O teste confere se o contêiner tem o papel antes de a mensagem aparecer. Os exemplos são uma contagem de resultados de busca e o status de um carrinho [153].

**WAI Forms Tutorial.**

- **Geral [154]:** pedir só o necessário para concluir a tarefa. As partes são rótulos, agrupamento, instruções, validação, notificações, formulários de várias páginas e controles próprios.
- **Rótulos [155]:** a ligação explícita é a mais bem suportada pelas tecnologias assistivas. Nos campos de texto, o rótulo fica à esquerda ou logo acima, e acima reduz a rolagem horizontal para quem tem baixa visão e no celular. Em alguns casos, o contexto visual deixa o propósito claro e o rótulo pode ser escondido só visualmente. O `title` é menos confiável e não é recomendado.
- **Instruções [156]:** as instruções gerais vêm antes do `<form>`, para o leitor de tela as ler antes do modo de formulário. O que o `aria-describedby` aponta é lido depois do rótulo. Obrigatórios e formatos podem ir no texto do rótulo.
- **Validação [157]:** o `required` com "(required)" no rótulo e o `aria-required` redundante, para navegadores que não repassam o `required`. A validação no cliente não garante segurança, e o servidor tem de validar de novo. A página não fala do momento da validação nem do `aria-invalid`.
- **Notificações [158]:** a lista de erros vai no topo, antes do formulário, com um título que se distinga. Cada item cita o rótulo do campo, descreve o erro, ensina a corrigir e tem link para o campo. Quando a lista aparece sem recarregar a página, o contêiner leva `role="alert"`. O campo pode se ligar à mensagem por `aria-describedby`. Depois do envio, é conveniente levar o foco ao primeiro campo com erro; a página não fala de levar o foco ao resumo. Ao digitar, o exemplo usa `aria-live="polite"`, lido uma vez quando a pessoa para de digitar; ao sair do campo, `aria-live="assertive"`, que interrompe o leitor. Ao voltar à página com erros, a palavra "erro" e o número de erros no título ajudam (o exemplo é "3 Errors – Billing Address").

### Rótulo de status e "Ver itens"

**Chips.** O chip é um elemento compacto e interativo, que pode ser marcável, dispensável ou clicável. Os quatro composables (assist, filter, input e suggestion) recebem `onClick`. O suggestion chip é informativo, mas ainda recebe `onClick`. No Expressive, o assist e o suggestion foram fundidos aos botões [60]. No material-web, os chip sets são toolbars e levam `aria-label` ou `aria-labelledby`; o chip desabilitado não recebe foco pelo teclado, e o soft-disabled recebe. O doc só trata dos quatro tipos interativos, sem chip estático, rótulo de status ou badge [141].

**Badge.** O badge é um pequeno elemento visual que indica status ou um número sobre outro composable. Um dos usos citados é o status de uma tarefa ("complete", "in progress", "failed"). O `BadgedBox` sobrepõe o badge a um conteúdo, em geral um `Icon`, e o `Badge` sem conteúdo é um pequeno círculo vermelho [35]. Nenhuma página aberta traz um rótulo de status solto, fora de outro elemento. A listagem de `docs/components` do material-web não mostra badge, mas termina em "View all files" [29].

**Disclosure.** O elemento que mostra e esconde o conteúdo tem o papel `button`, com `aria-expanded` true quando o conteúdo aparece e false quando some; o `aria-controls` é opcional. Com o foco no botão, Enter e Espaço alternam o conteúdo. A seta costuma apontar para a direita com o conteúdo fechado e para baixo com ele aberto, como orientação de estilo. A página não fala de `details` nem de `summary` [159]. A 4.1.3 manda o acordeão e o disclosure para a 4.1.2 [151].

**Leitura da verificação (inferência).** "Recebido" é texto de estado sem ação. O caso documentado mais perto é o badge de status, mas ele fica sobre outro elemento [35], e o chip promete interação ([60], [141]); um rótulo estático, sem papel interativo nem foco, em que o texto carrega o estado, evita os dois. Para o "Ver itens", a APG não cita o `details` [159]; o que fica é a 4.1.2 [151], e a etapa 6 registrou que os controles HTML padrão já a cumprem quando usados conforme a especificação [96]. Como o `details`/`summary` é anunciado em cada leitor de tela não foi conferido.

### Riscos da etapa 8

- **Rótulo que some:** o placeholder não substitui o rótulo, tem contraste menor, some ao digitar e não é tratado como rótulo [156]. A 3.3.2 pede rótulos sempre disponíveis, em geral visíveis [144], e a H44 pede o `label` visível [145]. No Compose, com o rótulo `Inside`, o placeholder só aparece com o rótulo minimizado, salvo com `isAlwaysMinimized` [119].
- **Rótulo externo no material-web:** o componente não aceita `aria-labelledby` e pede `aria-label` [131]. Com um `<input>` nativo, vale o `label` com `for` e `id` ([145], [155]).
- **Erro só pela cor:** no visual, o `isError` e os tokens de erro só trocam cores ([119], [134], [135]). A 3.3.1 exige o erro em texto, com os sinais visuais junto [142]. O `isError` do overload novo do Compose também anuncia o erro [119].
- **Contraste da marca do campo:** a borda, a linha ou o fundo que mostram o campo precisam de 3:1 contra a cor vizinha; a borda #AAA sobre branco reprova [98]. No filled, a marca é a linha on-surface-variant ou o contêiner contra a página [134]; no outlined, o outline [135]; no outlined tonal, o OutlineVariant [125]. Componentes inativos ficam isentos [98].
- **Foco nas cores tonais:** o indicador de foco é obrigatório; o cursor padrão pode bastar, mas um cursor próprio abaixo de 3:1 como único sinal reprova [98]. Nas cores tonais, o contêiner, a borda e o rótulo não mudam com o foco [125]. Nas cores padrão, o foco é de 2 dp no Compose [125] e de 3 px no material-web ([136], [137]).
- **Erro anunciado cedo demais:** o `aria-invalid` não deve ser "true" antes de a validação rodar [143]. O quick guide valida ao digitar e deixa o e-mail com erro até casar com o padrão completo [128]. O tutorial anuncia o erro da digitação com `aria-live="polite"`, lido quando a pessoa para de digitar [158].
- **Erro anunciado tarde ou nunca:** o contêiner do erro tem de estar no DOM desde o carregamento para a maioria dos leitores o anunciar [152]. A mudança do rótulo ao sair do campo pode não ser notada por alguns leitores [147]. As mensagens da validação nativa podem não ser permanentes, não acompanham o zoom, são genéricas e mostram só o primeiro erro [142].
- **Anúncios em excesso:** a 4.1.3 alerta para a interface tagarela e lista como falha o `alert` ou o `assertive` em conteúdo que não é importante nem urgente [151]. Inferência: o banner com `role="alert"` e a mensagem do campo focado podem ser lidos duas vezes.
- **Foco perdido:** depois do envio, o tutorial leva o foco ao primeiro campo com erro, não ao resumo [158]. O campo desabilitado fica desabilitado também para a acessibilidade, e o somente leitura continua focável [119]. O chip desabilitado sai do Tab, e o soft-disabled continua nele [141].
- **`aria-invalid` no campo desabilitado:** no material-web, o `disabled` tira só a classe visual de erro, e o `aria-invalid` continua [132] (achado na verificação).
- **Login (3.3.8):** bloquear o colar ou o preenchimento automático reprova, salvo com alternativa; campos bem marcados pela 1.3.5 e com nome pela 4.1.2 deixam o gerenciador de senhas preencher [150], e o `autocomplete` é a técnica da 1.3.5 [149]. O `SecureTextField` desativa recortar, copiar e arrastar e não diz nada do colar [126].
- **Nome do botão de mostrar a senha:** o exemplo do `SecureTextField` troca a descrição entre "Show password" e "Hide password" [126]; o quick guide usa uma descrição fixa [127]. A APG chama de crítico que o rótulo de um toggle com `aria-pressed` não mude com o estado [90]. Inferência: ou o nome muda e o botão não usa `aria-pressed`, ou o nome fica fixo e o estado vai no `aria-pressed`.
- **Chip como status:** o chip é interativo, com `onClick` nos quatro tipos [60], e o chip set é uma toolbar [141]. Inferência: "Recebido" em forma de chip promete uma ação que não existe.
- **Spinner do CEP:** o contêiner com `role="status"` precisa ter o papel antes de a mensagem aparecer [153]. Inferência: hoje o parágrafo de ajuda só existe com `helper` ou `loading` (`src/components/FormGroup.vue`), então um papel posto nele nasceria junto com a mensagem.
- **Divergência no material-web:** o doc do campo dá corner-extra-small como forma do filled [131], e o token v0_192 dá corner-extra-small-top [134].
- **Medidas de antes do Expressive:** as medidas e as cores dos tokens v0_192 são do material-web, que está em manutenção e não cita o Expressive [29]. Para o Expressive, só há fonte da forma e das cores tonais ([118], [125]). Inferência: as medidas são do M3, não necessariamente do Expressive.

### Não encontrei (etapa 8)

- Recomendação do M3 de não misturar filled e outlined na mesma tela; o material-web diz só que são funcionalmente idênticos [131].
- Altura do contêiner e padding no material-web [134]; os valores de `TextFieldPadding` e `TextFieldWithLabelVerticalPadding` [123]; a forma padrão do filled e do outlined do Compose em dp [125]; a largura mínima no material-web.
- Cores ou estilo de somente leitura no Compose e no material-web; cor de hover no Compose ([123], [134], [135]).
- A cor do cursor no filled tonal: não foi conferida [125].
- Fala sobre placeholder na H44, em Labeling Controls e na 1.4.11, e na 3.3.2 além do exemplo de chat; só o Form Instructions trata do assunto ([145], [155], [98], [144], [156]).
- A ARIA21 como técnica de algum Understanding: a própria página diz que nenhum a cita [143].
- Exemplo de campo de texto desabilitado, somente leitura ou com placeholder na 1.4.11 [98].
- O momento da validação em Validating Input [157]; ele aparece em User Notifications [158].
- O que o `SecureTextField` faz com o colar e o preenchimento automático [126].
- Exemplo de e-mail ou de data na 3.3.3: o exemplo é de nome de mês [148]. Exemplo de "salvo" na ARIA22 [153].
- Botão de mostrar a senha no material-web [131].
- Orientação de acessibilidade publicada no doc do select do material-web: a seção está comentada [140].
- Componente M3 não interativo para rótulo de status solto, além do badge sobre outro elemento [35]; badge no material-web, na parte visível da listagem [29].
- `details` e `summary` na APG Disclosure [159].

### Não abriu (etapa 8)

| URL | Motivo |
|---|---|
| https://m3.material.io/components/text-fields/overview (e as páginas de chips, badges e menus) | Só funciona com JavaScript; não foi tentado. |
| Links "View Source" do cs.android.com (TextField.kt, SecureTextField.kt, ExposedDropdownMenu.kt) | Não foram abertos; os valores vieram do espelho no GitHub [125]. |
| https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/TextFieldDefaults.kt | O WebFetch corta em 100 000 dos 128 924 caracteres. A pesquisa leu só a primeira parte; a verificação leu as duas, e as funções tonais estão na primeira. |
| Arquivos com os valores de `TextFieldPadding`, `TextFieldWithLabelVerticalPadding`, `FilledTextFieldTokens` e `OutlinedTextFieldTokens` | Não foram abertos. |
| https://developer.android.com/reference/kotlin/androidx/compose/material3/OutlinedSecureTextField.composable | Citada em [120] e [126]; não foi aberta. |
| https://developer.android.com/reference/kotlin/androidx/compose/foundation/text/BasicSecureTextField.composable | Citada em [127]; não foi aberta. |
| Iframes de dependências das quick guides [127] e [128] | Não foram abertos. |
| https://github.com/material-components/material-web/tree/main/docs/components | Abriu em parte: a listagem termina em "View all files" [29]. |
| Bug b/276484803 | Citado em [131]; não foi aberto. |

### Refutadas na verificação (etapa 8)

1. **A11:** os ícones servem para "dar uma ação (limpar, mostrar a senha)". [131] dá o ícone de limpar como exemplo e não fala de mostrar a senha. O "5 / 10" do contador está só no texto alternativo de uma figura.
2. **A15:** "com foco, tudo fica em error, inclusive o cursor". No erro com foco, o texto digitado fica on-surface e o ícone inicial, on-surface-variant; ficam em error a linha, o rótulo, o apoio, o ícone final e o cursor [134].
3. **A31:** as mensagens da validação nativa "podem sumir rápido". [142] diz que podem não ser permanentes nem rolar com a página.
4. **A32:** "o exemplo liga cada mensagem ao campo por `aria-describedby`". Em [143], só o exemplo 2 liga uma mensagem (a do PIN) por `aria-describedby`; o exemplo 1 usa um resumo com `aria-live="assertive"`.
5. **A40:** o `role="status"` "serve a ... progresso", e o `alert` ou `assertive` em conteúdo não urgente "também é falha", sem ressalva. Para progresso, [151] lista ARIA23, ARIA25, ARIA22 com G193 e ARIA27; a falha do `alert` está na lista, mas ainda sem número.
6. **A41:** "muitos leitores de tela" e "a cada envio que falha". [152] diz "a maioria" dos leitores e "depois de mais de um envio inválido".
7. **Síntese (componentes):** "material-web `type=password` e ícone final" para a senha. [131] aceita o tipo password, mas não fala de ícone de mostrar a senha.
8. **Síntese (riscos), em parte:** "`isError` e tokens só recolorem". No overload novo do Compose, o `isError` também anuncia o erro aos serviços de acessibilidade [119]; o "só recolorem" vale para o visual.
9. **Síntese (recomendação), em parte:** o nome "Mostrar senha"/"Ocultar senha" apoiado em A22 e A23. Só [126] troca o nome; [127] usa um nome fixo.

Ajustes de redação, sem derrubada: A8 (o padding de cima é o espaço acima do rótulo no estado com foco, e não um espaço contado a partir do rótulo), A26 (a comparação com o `<select>` nativo é dita do componente em geral, e o prefixo dos tokens é `--md-filled-select-text-field-` ou `--md-outlined-select-text-field-`), A33 ([144] admite rótulos e instruções disponíveis sob pedido em alguns casos), A38 ([149] diz que o `type` descreve o tipo do campo, não necessariamente o propósito) e A45 ([155] diz que, em alguns casos, o contexto visual basta, sem dizer "apenas").

## Etapa 9: navegação do painel (24/11/2026)

Feita em 24/11/2026, com a verificação no mesmo dia. Um pesquisador abriu as páginas com WebFetch e devolveu 58 afirmações, com uma síntese de componentes, riscos e recomendação. Depois, um verificador reabriu cada URL e tentou derrubar cada afirmação, conferindo se a página diz aquilo, com a medida ou o comportamento citado, e se a fonte é da classe declarada. A seção responde às perguntas do desenho da etapa 9 (o painel admin): quando usar a navigation drawer, o navigation rail ou o rail largo do M3 Expressive, por largura de janela, e como desenhar o item ativo; como a top app bar pequena recebe o botão de menu; e o que a APG e a WCAG pedem da gaveta modal, do menu do perfil, do item atual, dos landmarks e do contador. Ela completa as linhas "Admin" da §4.2 e da §5.11 do SPEC-M (`docs/direcoes/SPEC-material.md`), que diziam que os dossiês não cobrem navigation drawer nem rail. Das 58 afirmações, 56 ficaram inteiras (8 delas com ajuste de redação), 2 ficaram em parte e nenhuma caiu inteira. Da síntese do pesquisador, três trechos caíram em parte. Tudo isso está em "Refutadas na verificação (etapa 9)". O que a verificação achou e o pesquisador não trouxe está marcado "achado na verificação". As fontes que já tinham número mantêm o número ([26], [61], [78], [79], [90], [98] e [159]), e as novas vão de [160] a [214].

### Fontes da etapa 9

| Nº | Tipo | Título | URL | O que sustenta |
|---|---|---|---|---|
| [160] | documentação oficial | Navigation drawer (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/drawer | Os dois tipos, os usos, a abertura por gesto ou pelo ícone de menu, o `gesturesEnabled` e o exemplo com seções, divisor e badge. |
| [161] | documentação oficial | Navigation drawer (docs do Material Components for Android) | https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/NavigationDrawer.md | A nota de descontinuação no Expressive, o standard e o modal, as medidas, as cores, o scrim e a acessibilidade da gaveta em Views. |
| [162] | documentação oficial | Commit ee334daeca (diff, material-components-android) | https://github.com/material-components/material-components-android/commit/ee334daeca.diff | A nota de descontinuação e a seção "M3 Expressive update" como linhas novas. |
| [163] | documentação oficial | Histórico de commits de NavigationDrawer.md (API do GitHub) | https://api.github.com/repos/material-components/material-components-android/commits?path=docs/components/NavigationDrawer.md&per_page=30 | As datas do commit ee334daeca e do commit que pôs o Esc no doc. |
| [164] | documentação oficial | NavigationDrawerTokens.kt (AndroidX, VERSION v0_210) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationDrawerTokens.kt | Largura, indicador, cores por estado, tipografia, forma e elevação da gaveta. |
| [165] | documentação oficial | NavigationDrawer.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/NavigationDrawer.kt | A largura mínima da folha, o padding do item, o `Role.Tab`, o scrim, o `paneTitle`, o `dismiss`, o Esc e o voltar preditivo. |
| [166] | documentação oficial | ScrimTokens.kt (AndroidX, VERSION v0_117) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ScrimTokens.kt | O papel scrim e a opacidade de 0,32. |
| [167] | documentação oficial | ModalNavigationDrawer (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ModalNavigationDrawer.composable | O modal sobre o conteúdo e o exemplo que fecha no item e devolve o foco ao botão. |
| [168] | documentação oficial | NavigationDrawerItem (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/NavigationDrawerItem.composable | O item nas três gavetas, o badge no fim, a forma do indicador e o `ItemPadding`. |
| [169] | documentação oficial | Navigation rail (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/navigation-rail | Quando usar o rail, a atualização Expressive (rail largo, modal e dispensável) e a nota dos mais de quatro destinos. |
| [170] | documentação oficial | Navigation rail (docs do Material Components for Android) | https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/NavigationRail.md | O rail expandido no lugar da gaveta, as medidas do Expressive, o indicador, os modos de rótulo e o `android:title`. |
| [171] | documentação oficial | Commit 2921b9c311 (diff, material-components-android) | https://github.com/material-components/material-components-android/commit/2921b9c311.diff | A frase do rail expandido que substitui a gaveta, como linha nova. |
| [172] | documentação oficial | Histórico de commits de NavigationRail.md (API do GitHub) | https://api.github.com/repos/material-components/material-components-android/commits?path=docs/components/NavigationRail.md&per_page=15 | A data do commit 2921b9c311. |
| [173] | documentação oficial | NavigationRailCollapsedTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailCollapsedTokens.kt | Largura, espaços, cor, forma e elevação do rail recolhido. |
| [174] | documentação oficial | NavigationRailExpandedTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailExpandedTokens.kt | Largura, forma e elevação do rail expandido e do modal. |
| [175] | documentação oficial | NavigationRailVerticalItemTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailVerticalItemTokens.kt | O item com o ícone em cima: indicador, espaço e rótulo. |
| [176] | documentação oficial | NavigationRailHorizontalItemTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailHorizontalItemTokens.kt | O item com o ícone no início: indicador, espaços e rótulo. |
| [177] | documentação oficial | NavigationRailBaselineItemTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailBaselineItemTokens.kt | A altura do item, a forma do indicador, o ícone e o espaço do cabeçalho. |
| [178] | documentação oficial | NavigationRailColorTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/NavigationRailColorTokens.kt | As cores do item do rail e das camadas de estado. |
| [179] | documentação oficial | WideNavigationRail (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/WideNavigationRail.composable | O rail largo, o cabeçalho, o número de itens por estado e o botão de menu com dica e estado anunciado. |
| [180] | documentação oficial | ModalWideNavigationRail (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/ModalWideNavigationRail.composable | O modal expandido com scrim, o `hideOnCollapse` e o `expandedHeaderTopPadding`. |
| [181] | documentação oficial | WideNavigationRail.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/WideNavigationRail.kt | O scrim, o `paneTitle`, o Esc, o voltar, a falta de controle de foco, o `selectableGroup()`, o padding e a altura do item e as cores padrão. |
| [182] | documentação oficial | WideNavigationRailItem (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/WideNavigationRailItem.composable | O rótulo sempre visível e a posição do ícone em cada estado. |
| [183] | documentação oficial | NavigationRailItem (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/NavigationRailItem.composable | O rótulo do rail clássico e o `alwaysShowLabel`. |
| [184] | documentação oficial | NavigationRail (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/NavigationRail.composable | De três a sete destinos, o cabeçalho com FAB ou logo e o uso em tablet e desktop. |
| [185] | documentação oficial | Build adaptive navigation (Android Developers) | https://developer.android.com/develop/ui/compose/layouts/adaptive/build-adaptive-navigation | A escolha padrão do `NavigationSuiteScaffold` e o exemplo de gaveta permanente em janela expandida. |
| [186] | documentação oficial | NavigationSuiteType (androidx.compose.material3.adaptive.navigationsuite) | https://developer.android.com/reference/kotlin/androidx/compose/material3/adaptive/navigationsuite/NavigationSuiteType | Os tipos de navegação e as recomendações de troca. |
| [187] | documentação oficial | NavigationSuiteScaffold.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3-adaptive-navigation-suite/src/commonMain/kotlin/androidx/compose/material3/adaptive/navigationsuite/NavigationSuiteScaffold.kt | A escolha recomendada e a antiga do tipo de navegação por janela. |
| [188] | documentação oficial | NavigationSuiteScaffold (androidx.compose.material3.adaptive.navigationsuite) | https://developer.android.com/reference/kotlin/androidx/compose/material3/adaptive/navigationsuite/NavigationSuiteScaffold.composable | O exemplo de escolha própria por largura e o `primaryActionContent`. |
| [189] | documentação oficial | Use window size classes (Android Developers) | https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes | Os limites das classes de largura e de altura e o aviso contra a lógica de "isTablet". |
| [190] | documentação oficial | material-web, pasta `labs` (API do GitHub) | https://api.github.com/repos/material-components/material-web/contents/labs | O drawer, a bar e a tab experimentais, sem rail. |
| [191] | documentação oficial | README da pasta `labs` (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/labs/README.md | Recursos experimentais, fora da produção e sem garantia de versão. |
| [192] | documentação oficial | navigation-drawer-modal.ts (material-web labs) | https://raw.githubusercontent.com/material-components/material-web/main/labs/navigationdrawer/internal/navigation-drawer-modal.ts | O `role="dialog"`, os atributos opcionais, o Esc, o scrim e a falta de controle de foco. |
| [193] | documentação oficial | Roadmap do material-web | https://raw.githubusercontent.com/material-components/material-web/main/docs/roadmap.md | Drawer, rail, bar e top app bar não feitos, e nenhum trabalho previsto na manutenção. |
| [194] | documentação oficial | TopAppBar (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/TopAppBar.composable | As peças da barra pequena, a rolagem, o título e os exemplos com o botão de menu. |
| [195] | documentação oficial | AppBarSmallTokens.kt (AndroidX, VERSION 14_0_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/AppBarSmallTokens.kt | A altura e a tipografia da barra pequena. |
| [196] | documentação oficial | AppBarTokens.kt (AndroidX, VERSION 14_0_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/AppBarTokens.kt | Cores, elevação, forma, ícones, avatar e espaços da barra. |
| [197] | documentação oficial | Top app bar (docs do Material Components for Android) | https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/TopAppBar.md | A atualização Expressive da barra, o lift on scroll e as descrições para o TalkBack. |
| [198] | documentação oficial | ElevationTokens.kt (AndroidX, VERSION v0_103) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ElevationTokens.kt | Os níveis de elevação em dp (achado na verificação). |
| [199] | referência técnica | Dialog (Modal) Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ | O fundo inerte, o teclado, o foco ao abrir e ao fechar, os papéis e quando marcar como modal. |
| [200] | referência técnica | H102: Creating modal dialogs with the HTML dialog element (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/html/H102 | O que o navegador faz com o `<dialog>` modal: foco, inércia, Esc e volta do foco. |
| [201] | referência técnica | Understanding SC 2.4.3 Focus Order (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html | O foco no diálogo modal e no não modal, as técnicas e as falhas. |
| [202] | referência técnica | F85: Failure of SC 2.4.3 due to using dialogs or menus that are not adjacent to their trigger control (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/failures/F85 | Quando o foco de um diálogo ou menu reprova, na abertura e no fechamento. |
| [203] | referência técnica | Example Disclosure Navigation Menu (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/ | A navegação sem o papel `menu`, o `aria-current`, o Esc e as teclas opcionais. |
| [204] | referência técnica | Navigation Menubar Example (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/ | O aviso contra o menubar na navegação típica e o `aria-current`. |
| [205] | referência técnica | Menu and Menubar Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/menubar/ | O teclado dentro do menu, os papéis, o rótulo e o foco. |
| [206] | referência técnica | Navigation Menu Button Example (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/ | O menu button com itens que são links. |
| [207] | referência técnica | Accessible Rich Internet Applications (WAI-ARIA) 1.2 (W3C) | https://www.w3.org/TR/wai-aria-1.2/ | A definição do `aria-current`. |
| [208] | referência técnica | Menu Structure (WAI Tutorials, atualizado em 13/05/2024) | https://www.w3.org/WAI/tutorials/menus/structure/ | O item atual e o rótulo do menu. |
| [209] | referência técnica | G128: Indicating current location within navigation bars (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/general/G128 | Os sinais da posição atual e os dois exemplos. |
| [210] | referência técnica | Landmark Regions (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/ | Os landmarks repetidos, os rótulos, o `nav`, o `aside`, o banner e o main. |
| [211] | referência técnica | ARIA11: Using ARIA landmarks to identify regions of a page (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11 | Os nomes dos landmarks repetidos e o teste. |
| [212] | documentação oficial | BadgedBox (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/BadgedBox.composable | O badge de informação dinâmica e as descrições do exemplo. |
| [213] | documentação oficial | BadgeDrawable (docs do Material Components for Android) | https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/BadgeDrawable.md | A descrição do badge para o TalkBack e os limites de texto e de número. |
| [214] | referência técnica | Understanding SC 2.5.3 Label in Name (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html | O texto visível dentro do nome acessível. |
| [79] | referência técnica | Menu Button Pattern (WAI-ARIA APG; já citada) | https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ | Nesta etapa, reaberta: o teclado do botão, os papéis e a falta de aviso sobre navegação. |
| [26] | autor do estilo | Expressive Material Design: Google research (Google Design; rodada 1) | https://design.google/library/expressive-material-design-google-research | Nesta etapa, pelo que o dossiê já registra (não reaberta): tirar rótulos de texto piorou a usabilidade. |
| [61] | documentação oficial | Navigation bar (Jetpack Compose; já citada) | https://developer.android.com/develop/ui/compose/components/navigation-bar | Nesta etapa, pelo que o dossiê já registra (não reaberta): a barra para três a cinco destinos. |
| [78] | referência técnica | Understanding SC 2.5.8 Target Size (Minimum) (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | Nesta etapa, pelo que o dossiê já registra (não reaberta): o alvo de 24×24 px CSS. |
| [90] | referência técnica | Button Pattern (WAI-ARIA APG; já citada) | https://www.w3.org/WAI/ARIA/apg/patterns/button/ | Nesta etapa, pelo que o dossiê já registra (não reaberta): o rótulo do toggle com `aria-pressed` que não muda com o estado. |
| [98] | referência técnica | Understanding SC 1.4.11 Non-text Contrast (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | Nesta etapa, pelo que o dossiê já registra (não reaberta): o 3:1 de componentes e estados. |
| [159] | referência técnica | Disclosure (Show/Hide) Pattern (WAI-ARIA APG; já citada) | https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ | Nesta etapa, pelo que o dossiê já registra (não reaberta): o botão com `aria-expanded` e o `aria-controls` opcional. |

### Drawer, rail e rail largo do Expressive

**O que o Expressive muda.**

- Uma nota no topo do doc da gaveta no Material Components for Android diz que ela "is being deprecated in the Material 3 expressive update". Para quem já atualizou, a nota manda usar o rail expandido, que tem quase a mesma função e se adapta melhor às classes de largura. A seção "M3 Expressive update" repete a orientação [161].
- A nota entrou como linhas novas no commit ee334daeca [162], de 26/06/2025 (data do autor; integrado em 27/06) [163]. A página não traz data própria. Achado na verificação: o commit 1f10e0bbb9, de 08/07/2025, mandou as demos fecharem a gaveta com o Esc e pôs essa orientação no doc [163].
- O doc do rail diz que o rail expandido "is meant to replace the navigation drawer" [170]. A frase entrou no commit 2921b9c311 [171], de 29/07/2025 [172]. O rail original passa a se chamar rail recolhido, que é o estado padrão; expandido, ele funciona como uma gaveta. Na modalidade do expandido, a página registra "Non-modal", com transição para o rail recolhido [170].
- No Compose, o Expressive traz o `WideNavigationRail` e o `ModalWideNavigationRail`, com os estados recolhido e expandido, ao lado do `NavigationRail` padrão. Um estado vira o outro quando o usuário aciona o botão de menu [169]. As referências dos dois e do `WideNavigationRailItem` dizem "Added in 1.5.0" ([179], [180], [182]).
- O `NavigationSuiteType` recomenda o `WideNavigationRailExpanded` no lugar do tipo `NavigationDrawer` (uma `PermanentDrawerSheet`), o `WideNavigationRailCollapsed` no lugar do `NavigationRail` e o `ShortNavigationBarCompact` no lugar da `NavigationBar` [186].

**Quando usar cada um.**

| Componente | Quando usar | Fonte |
|---|---|---|
| Gaveta standard | Divide a tela com o conteúdo, e a pessoa mexe nos dois ao mesmo tempo. Serve a tablet e desktop; o MDC diz que não serve ao celular, pela tela pequena. | [160], [161] |
| Gaveta modal | Fica sobre o conteúdo, bloqueia o resto do app com um scrim, fica elevada e não altera o grid. É sobretudo para celular e pode dar lugar à standard no tablet e no desktop. | [160], [161], [167] |
| Rail clássico (`NavigationRail`) | De três a sete destinos, com FAB ou logo opcional no cabeçalho, em telas de tablet e desktop. | [184] |
| Rail no Compose (guia) | Destinos de topo que precisam estar acessíveis em qualquer lugar do app, de três a sete, em layouts de tablet ou desktop. | [169] |
| Rail largo (`WideNavigationRail`) | Destinos primários em tablet e desktop. Cabeçalho opcional com botão de menu, FAB e/ou logo, sempre no topo; itens arrumados no topo por padrão. Começa recolhido. Recolhido, deve mostrar de três a sete itens; expandido, pelo menos três. | [179] |
| Rail largo modal (`ModalWideNavigationRail`) | Recolhido, funciona como o rail largo recolhido. Expandido, bloqueia o resto do app com um scrim, fica elevado e não altera o grid. Com `hideOnCollapse`, sai da tela ao recolher e entra pela borda, em vez de virar o rail recolhido. | [180] |

- A página do rail no Compose diz que o rail expandido pode ser standard ou modal, e que o modal fica sobre o conteúdo e abre por um ícone de menu. Uma nota sugere o rail expandido modal quando há mais de quatro destinos. A versão dispensável (`hideOnCollapse = true`) responde ao voltar preditivo [169].
- Os usos citados da gaveta são organizar conteúdo, gerenciar a conta e descobrir recursos [160].
- Achado na verificação: o texto das demos do rail largo e do modal diz que, em qualquer dimensão compacta, se usa a navigation bar ([179], [180]).

**Navegação adaptativa por largura de janela.**

| Classe | Largura | Altura |
|---|---|---|
| Compacta | menos de 600 dp | menos de 480 dp |
| Média | de 600 dp a menos de 840 dp | de 480 dp a menos de 900 dp |
| Expandida | de 840 dp a menos de 1200 dp | 900 dp ou mais |
| Grande | de 1200 dp a menos de 1600 dp | — |
| Extragrande | 1600 dp ou mais (telas de desktop) | — |

As classes valem pela janela disponível ao app, não pelo aparelho, e a página diz que não servem para a lógica de "isTablet". A largura costuma pesar mais que a altura. As classes compacta, média e expandida correspondem às do Material; a grande e a extragrande foram acrescentadas para desktop e telas conectadas. A página não liga as classes a componentes de navegação [189].

| Escolha automática | Largura compacta | Tabletop ou altura compacta | Outros casos | Fonte |
|---|---|---|---|---|
| `navigationSuiteType` (a recomendada) | `ShortNavigationBarCompact` | `ShortNavigationBarMedium` | `WideNavigationRailCollapsed` | [187] |
| `calculateFromAdaptiveInfo` (a antiga) | `NavigationBar` | `NavigationBar` | `NavigationRail` | [185], [187] |

- A escolha recomendada nunca dá o rail expandido. O comentário da função antiga manda usar a nova, mas ela não está marcada como obsoleta [187].
- O guia "Build adaptive navigation" ainda descreve a escolha antiga (navigation bar com largura ou altura compacta ou em tabletop, rail no resto) e mostra uma gaveta permanente nas janelas expandidas, para um app com um único painel grande de feed [185].
- O exemplo de escolha própria do `NavigationSuiteScaffold` usa o rail largo recolhido nas larguras compacta e média, a `ShortNavigationBarMedium` com altura compacta e o rail largo expandido na largura expandida. O `primaryActionContent`, em geral um FAB, entra no cabeçalho dos componentes verticais e acima dos horizontais [188].

**Anatomia e medidas da gaveta.**

| Peça | Compose | Material Components for Android (Views) |
|---|---|---|
| Largura | Folha de 240 dp no mínimo [165] a 360 dp no máximo (`ContainerWidth`) ([164], [165]) | 280 dp no máximo [161] |
| Contêiner | Modal: SurfaceContainerLow, Level1. Standard: Surface, Level0. Forma `CornerLargeEnd`, só o lado final arredondado [164] | colorSurfaceContainerLow; canto de 16 dp [161] |
| Item | Indicador de 336×56 dp, `CornerFull` [164]; altura mínima igual à do indicador; padding interno de 16 dp no início e 24 dp no fim [165]; recuo externo de 12 dp na horizontal (`ItemPadding`), que os exemplos aplicam por fora ([165], [168]) | Forma `Corner.Full`; recuo de 12 dp no início e no fim [161] |
| Ícone | 24 dp [164] | não encontrei |
| Rótulo | LabelLarge [164] | textAppearanceLabelLarge, com negrito no ativo ligado por padrão [161] |
| Título de seção | TitleSmall em OnSurfaceVariant [164]; o exemplo do guia usa titleLarge no título da gaveta, titleMedium nas seções e `HorizontalDivider` entre elas [160] | textAppearanceTitleSmall [161] |
| Badge | No lado final do item [168]; rótulo do badge grande em OnSurfaceVariant e LabelLarge [164]; o exemplo usa um badge de texto ("20") [160] | não encontrei |
| Semântica | Item com `Role.Tab` [165] | — |

**Anatomia e medidas do rail.**

| Peça | Recolhido | Expandido |
|---|---|---|
| Largura | 96 dp; versão estreita de 80 dp [173]. No MDC, o Expressive levou a largura de 80 para 96 dp [170] | De 220 a 360 dp [174]; indicador com largura que abraça o conteúdo ("HUG") [170] |
| Contêiner | Surface, `CornerNone`, Level0 [173] | Standard: `CornerNone`, Level0 [174], com a mesma cor padrão do recolhido [181]. Modal: SurfaceContainer, Level2, `CornerLarge` [174] |
| Espaços | 4 dp entre itens; 44 dp no topo (`TopSpace`) [173]; mínimo de 40 dp no cabeçalho [177] | 44 dp no topo [174] |
| Item | Altura de 64 dp [177]; no MDC, a altura mínima foi de 60 para 64 dp [170]. Ícone acima do rótulo ([175], [182]) | Altura mínima pelo tamanho mínimo de acessibilidade, sem valor no arquivo; padding horizontal de 20 dp [181]. Ícone no início do rótulo [182] |
| Indicador | 56×32 dp ([170], [175]); `CornerFull` [177] | 56 dp de altura ([170], [176]); margem horizontal de 20 dp e padding de 16 dp nos quatro lados no MDC [170]; 16 dp no início e 8 dp entre ícone e rótulo nos tokens [176] |
| Ícone e rótulo | Ícone de 24 dp [177]; 4 dp entre ícone e rótulo; rótulo em LabelMedium [175] | 8 dp entre ícone e rótulo; rótulo em LabelLarge [176] |
| Semântica | O rail aplica `selectableGroup()` [181] | o mesmo [181] |

Achado na verificação: no ElevationTokens.kt, o Level0 vale 0 dp, o Level1, 1 dp, e o Level2, 3 dp [198].

**Item ativo e cores.**

| Papel | Gaveta (Compose) [164] | Gaveta (MDC) [161] | Rail [178] |
|---|---|---|---|
| Indicador ativo | SecondaryContainer | colorSecondaryContainer | SecondaryContainer |
| Ícone ativo | OnSecondaryContainer | colorOnSecondaryContainer | OnSecondaryContainer |
| Rótulo ativo | OnSecondaryContainer | colorOnSecondaryContainer | Secondary |
| Ícone e rótulo inativos | OnSurfaceVariant; OnSurface no hover, no foco e no pressionado | colorOnSurfaceVariant | OnSurfaceVariant |
| Camada de estado | não encontrei | não encontrei | OnSecondaryContainer no hover, no foco e no pressionado, ativo ou não |
| Indicador de foco | Secondary | não encontrei | não encontrei |

- Nos exemplos do rail, o item selecionado usa o ícone preenchido, e os outros, o contornado ([169], [179], [184]).
- O `WideNavigationRailItem` recomenda que todo item tenha rótulo de texto e mostra o rótulo selecionado ou não [182].
- No rail clássico, o item selecionado sempre mostra o rótulo, e os outros dependem do `alwaysShowLabel`; com false, só o selecionado mostra [183].
- No MDC, o modo AUTO, que é o padrão, mostra todos os rótulos com até 3 itens e só o do selecionado com 4 ou mais; há também SELECTED, LABELED e UNLABELED. A página pede um `android:title` em cada item, para o TalkBack anunciar o destino [170].

**O modal: scrim, abertura e fechamento.**

| Ponto | Gaveta modal (Compose) | Gaveta (MDC) | Rail largo modal (Compose) |
|---|---|---|---|
| Scrim | Papel scrim com opacidade de 0,32 ([165], [166]); tem descrição (`Strings.CloseDrawer`) e fecha no clique, só com a gaveta aberta [165] | Preto a 60% [161] | Papel scrim com opacidade de 0,32 ([166], [181]); tem descrição (`Strings.CloseRail`) e o clique recolhe o rail [181] |
| Abrir | Gesto a partir da borda ou toque no ícone de menu; o `gesturesEnabled` liga ou desliga o arrasto; no exemplo, o `navigationIcon` da `TopAppBar` abre e fecha pelo `DrawerState` [160] | — | Botão de menu do cabeçalho ([169], [179]); com `hideOnCollapse`, entra pela borda [180] |
| Fechar | Esc ao soltar a tecla; ação semântica `dismiss` com a gaveta aberta [165]; no exemplo, o clique no item fecha [167] | Esc pelo teclado; toque num item ou no scrim [161] | Esc ao soltar a tecla; o voltar chama o `onDismissRequest`, que recolhe [181] |
| Voltar preditivo | Só nas folhas que recebem o `drawerState` (`ModalDrawerSheet` e `DismissibleDrawerSheet`) [165] | Vem pronto dentro do `DrawerLayout` [161] | Sim ([169], [181]) |
| Nome do painel | `paneTitle` com `Strings.NavigationMenu` [165] | — | `paneTitle` com `Strings.WideNavigationRailPaneTitle` [181] |
| Foco | O exemplo devolve o foco ao botão que abriu quando a gaveta fecha [167] | Os controles que abrem a gaveta precisam de alvo mínimo de 48 dp e de rótulo [161] | O arquivo não tem nenhum controle de foco [181] |
| Cabeçalho | — | — | O `expandedHeaderTopPadding` alinha o conteúdo entre os dois estados [180] |

**Na web.** O material-web não tem rail: a pasta `labs` tem só `navigationdrawer`, `navigationbar` e `navigationtab` [190], e o README da pasta diz que ali ficam recursos experimentais, não recomendados para produção, que podem quebrar sem mudar a versão major [191]. O roadmap põe navigation drawer, navigation rail, navigation bar e top app bar entre os componentes não feitos, e diz que não há trabalho previsto enquanto a biblioteca estiver em manutenção [193].

**Leitura da verificação (inferência).** O painel tem 4 destinos (`src/components/admin/layout/SidebarAdmin.vue`). As fontes divergem na janela compacta: a escolha recomendada do Compose dá a navigation bar curta [187], e as demos do rail largo mandam usar a navigation bar [179]; o exemplo próprio do `NavigationSuiteScaffold` põe o rail recolhido também ali [188]; e a página do rail sugere o expandido modal com mais de quatro destinos [169]. A navigation bar serve de três a cinco destinos [61], o que cobre os 4 do painel. O MDC diz que a gaveta modal é sobretudo para celular, mas a marca como em descontinuação [161]. Na largura média, o padrão é o rail recolhido [187]; na expandida, o rail expandido entra só por escolha própria [188] e é o substituto recomendado da gaveta permanente [186]. O corte de hoje, 1024 px (`src/layouts/AdminLayout.vue`), cai dentro da classe expandida, de 840 a 1200 [189], lendo dp como px CSS. Usar 840 segue a fonte; manter 1024 é decisão do projeto. No item ativo, a pílula em secondary-container e o ícone em on-secondary-container valem para a gaveta e para o rail, mas o rótulo ativo diverge ([164], [178]).

### Barra superior com o botão de menu

- **Peças.** A top app bar pequena tem título, subtítulo opcional, ícone de navegação e ações. O ícone de navegação fica no início e em geral é um `IconButton` ou um `IconToggleButton`; as ações ficam no fim, em geral `IconButton`s, numa `Row`. O título fica no início por padrão ou no centro, pelo `titleHorizontalAlignment` [194].
- **Botão de menu.** Nos exemplos, o ícone de menu tem a descrição "Menu" e uma dica (tooltip) [194]. No exemplo da gaveta, o `navigationIcon` da barra abre e fecha a gaveta [160]. Achado na verificação: os exemplos da barra e do rail largo trazem um TODO sobre um bug em que o texto da dica não é anunciado pelos leitores de tela ([179], [194]).
- **Rolagem.** Com o `PinnedScrollBehavior`, a cor do contêiner muda quando o conteúdo rola por baixo; com o `enterAlways`, a barra recolhe e volta com a rolagem [194]. No MDC, o lift on scroll vem ligado por padrão, com a cor colorSurfaceContainer [197].
- **Expressive.** No MDC, a nova search app bar aceita ícones dentro e fora do campo e texto centralizado, e abre a search view quando selecionada. As versões flexíveis substituem a medium e a large, que estão em descontinuação, e a small ganha as mesmas melhorias [197].
- **Acessibilidade.** O MDC pede descrição para o ícone de navegação e para as ações, para o TalkBack anunciar o propósito; diz que o uso é opcional, mas muito encorajado [197]. A página não diz quantas ações cabem antes do menu de estouro; os exemplos usam `showAsAction="ifRoom"` [197].

| Medida ou papel | Valor | Fonte |
|---|---|---|
| Altura | 64 dp | [195] |
| Título | TitleLarge, em OnSurface | [195], [196] |
| Subtítulo | LabelMedium, em OnSurfaceVariant | [195], [196] |
| Contêiner | Surface, Level0, `CornerNone`; ao rolar, SurfaceContainer com Level2 | [196] |
| Ícone inicial (navegação) | OnSurface | [196] |
| Ícones finais (ações) | OnSurfaceVariant | [196] |
| Ícone e avatar | 24 dp e 32 dp | [196] |
| Espaços | 4 dp no início e no fim; 0 dp entre os botões de ícone | [196] |

**Leitura da verificação (inferência).** Hoje a barra do painel é um `nav` "Ferramentas do painel" dentro do `header`, com a busca (`role="search"`), os contadores e o menu do perfil (`TheNavbarAdmin.vue`, `navbar/SearchBar.vue`). Os 32 dp do avatar são a medida do desenho [196]; o alvo precisa de pelo menos 24 px CSS [78], e o MDC pede 48 dp nos controles que abrem a gaveta [161].

### Gaveta modal, menu do perfil e item atual (W3C)

**Diálogo modal.**

| Ponto | O que pedem | Fonte |
|---|---|---|
| Fundo | O que fica fora do diálogo é inerte e costuma ficar escurecido ou encoberto. | [199] |
| Quando marcar como modal | Só quando o código impede qualquer interação fora dele e o visual encobre o resto. O `aria-modal` pode impedir que pessoas com algumas tecnologias assistivas percebam o conteúdo de fora. | [199] |
| Papéis | `role="dialog"`, `aria-modal="true"` e `aria-labelledby` apontando para um título visível, ou `aria-label`; `aria-describedby` opcional. | [199] |
| Foco ao abrir | Em geral, no primeiro elemento focável; com conteúdo grande, num elemento estático do topo com `tabindex="-1"`. No `<dialog>` modal, o navegador põe o foco no primeiro focável do DOM. | [199], [200] |
| Teclado | Tab e Shift+Tab dão a volta nas pontas sem sair do diálogo; o Esc fecha. No `<dialog>` modal, o navegador limita o foco ao diálogo e à interface do próprio navegador, deixa o resto inerte e escondido das tecnologias assistivas e fecha com o Esc. | [199], [200] |
| Foco ao fechar | Volta a quem abriu, salvo se esse elemento sumiu ou se o fluxo tornar outro destino mais lógico. Na H102, volta a quem abriu se ele ainda estiver na página. Na 2.4.3, volta ao botão ou ao elemento logo depois dele. | [199], [200], [201] |
| Falha F85 | Reprova se o foco não vai ao diálogo ou menu (ou a um descendente focável lógico) e ele também não é o próximo na ordem do Tab. Reprova se, ao fechar, o foco não volta ao gatilho; se o gatilho sumiu, conta o elemento interativo logo antes ou logo depois dele. Levar o foco a outro controle lógico não é falha. | [202] |
| Clique no fundo | A H102 não fala de fechar pelo clique no fundo. | [200] |

- A 2.4.3 é de nível A. No não modal, os controles entram na ordem logo depois do botão. Entre as técnicas suficientes estão a H102, a SCR26 e a C27; as falhas são a F44 e a F85 [201].
- O drawer modal experimental do material-web usa `role="dialog"`, mas o `aria-modal` e o `aria-label` só aparecem se o desenvolvedor os definir. O Esc fecha só com o foco dentro da gaveta, e o clique no scrim alterna o estado. O arquivo não move, não prende e não devolve o foco [192].
- **Gaveta como diálogo ou como disclosure.** A APG do diálogo não cita gaveta, painel lateral nem "hamburger" [199]. O exemplo de disclosure cobre listas de links que abrem numa barra [203]. Não encontrei fonte do W3C que decida entre os dois para a gaveta.

**Navegação, menu button e menu.**

- **Disclosure de navegação [203]:** o exemplo não usa o papel `menu`, porque a navegação típica de site não precisa de todo o teclado do menu e do menubar. O link da página exibida leva `aria-current="page"`. Os botões usam `aria-expanded` e `aria-controls`. O Esc fecha a lista aberta e põe o foco no botão dela. As setas, o Home e o End são opcionais e complementam o Tab, sem substituí-lo. A lista fica num landmark de navegação com nome.
- **Menubar de navegação [204]:** a página avisa que o menubar exige uma funcionalidade complexa, desnecessária na navegação típica de site, e indica o disclosure para a maioria dos sites. O `aria-current="page"` fica no link cuja URL é a da página, e sai dos outros.
- **Menu button [79]:** Enter e Espaço abrem o menu e focam o primeiro item; a seta para baixo (opcional) abre e foca o primeiro, e a seta para cima (opcional), o último. O botão tem papel `button`, `aria-haspopup` igual a `menu` ou `true` e `aria-expanded` `true` ou `false`; o `aria-controls` é opcional. O contêiner tem `role="menu"`. O padrão não traz aviso sobre navegação.
- **Menu [205]:** o Enter ativa o item e fecha o menu; o Esc fecha e devolve o foco a quem abriu. As setas movem o foco, com volta opcional nas pontas; o Home e o End vão ao primeiro e ao último item quando as setas não dão a volta. A busca por letra é opcional. O Tab sai do menu e fecha todos os menus. Ao abrir, o foco vai ao primeiro item. Papéis: `menu`, com `menuitem`, `menuitemcheckbox` ou `menuitemradio`. O `aria-labelledby` do menu aponta para o botão ou item que o controla, ou o menu leva `aria-label`. O foco usa `tabindex="-1"` nos itens ou `aria-activedescendant`. A página não proíbe o padrão na navegação; desaconselha só o item que executa uma função e abre submenu.
- **Menu button com links [206]:** os itens são links, mantêm o comportamento de link e levam `role="menuitem"` e `tabindex="-1"`. O Esc fecha e devolve o foco ao botão; o Home, o End e a busca por letra funcionam. A página diz que o código não é para produção, e a lista de teclas não cita o Tab.

**Item atual.**

- **`aria-current` [207]:** indica o item atual num contêiner ou conjunto de elementos relacionados; o valor `page` marca a página atual num conjunto de páginas. Só um elemento do conjunto deve ser marcado. Ele não deve substituir o `aria-selected` nos widgets em que este tem o mesmo sentido. Ausente ou vazio, vale false, e o estado não deve ser exposto.
- **Menu Structure [208]:** o item atual se marca com texto oculto, lido pelo leitor de tela, ou com `aria-current="page"`. O tutorial sugere tirar o `<a>` do item atual quando der, e manter o link com `aria-current` quando não der. O menu se rotula com um título, `aria-label` ou `aria-labelledby`, como no exemplo `<nav aria-labelledby>`.
- **G128 [209]:** técnica ligada à 2.4.8 Location. A posição atual se indica com um ícone, com texto ou com a mudança de estado do item. No exemplo de lista, o link atual fica desativado; no de abas, além da cor de fundo, aparece um ícone de check com texto alternativo.

**Landmarks.**

- **APG [210]:** todo o conteúdo perceptível fica em algum landmark. Um papel repetido precisa de rótulo único em cada instância. O nome do papel não entra no rótulo: um `nav` chamado "Site Navigation" é lido "Site Navigation Navigation", e o rótulo certo é "Site". Com título no começo da área, rotule por `aria-labelledby`; sem título, por `aria-label`. A navegação usa o `nav`. O complementary (`aside`) é uma seção de apoio ao conteúdo principal e fica no nível de topo. O banner (no máximo um por página) e o main (um por página) também ficam no topo.
- **ARIA11 [211]:** serve à 1.3.1, à 1.3.6 e à 2.4.1. Papéis iguais repetidos devem ter nome. Nos exemplos, duas navegações se chamam "Site" e "Related Topics" (por `aria-labelledby`) ou "Site" e "Tags" (por `aria-label`). O teste confere se cada landmark repetido tem um nome único e com sentido.

**Contador no nome do botão.**

- **BadgedBox [212]:** o badge mostra informação dinâmica, como o número de solicitações pendentes numa navigation bar, e pode ser só ícone ou ter texto curto. No exemplo, o badge numérico recebe a descrição "$badgeNumber new notifications", também com "999+", e o badge sem número, "New notification"; o ícone âncora mantém a própria descrição ("Favorite").
- **BadgeDrawable [213]:** a descrição do badge vem do número ou do texto exibido. A página lista métodos para trocá-la (para texto, plural por quantidade, número acima do máximo e badge sem número), sem explicar cada um. Os limites são o `maxCharacterCount` e o `maxNumber`. A página não fala da descrição do elemento âncora.
- **2.5.3 Label in Name [214]:** nível A. Quando o controle tem rótulo de texto visível, o nome acessível contém esse texto, e a boa prática é pô-lo no início do nome. Texto usado como símbolo não conta como rótulo. Sem rótulo de texto visível, o critério não se aplica. A página não fala de contadores nem de badges.

**Leitura da verificação (inferência).**

- **Gaveta de hoje (`src/layouts/AdminLayout.vue`):** o Esc e o botão "Fechar" devolvem o foco ao botão de menu; o clique no fundo e a troca de rota chamam `closeSidebar()` sem devolver o foco, e o link focado some com o `v-show`. Não há `inert`, `aria-modal` nem `role="dialog"`: a gaveta é um `aside` "Menu do painel" com um `nav` "Seções do painel" (`SidebarAdmin.vue`). Para marcar como modal, o resto precisa ficar inerte de fato [199], e o `<dialog>` modal faz isso pelo navegador [200]. Na troca de rota, a APG aceita outro destino quando o fluxo o torna mais lógico [199]; o `main` é um candidato.
- **Menu do perfil (`navbar/UserProfileBar.vue`):** já tem `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`, `role="menu"` e `menuitem`, setas com volta nas pontas, Home e End, Esc que devolve o foco e Tab que fecha, como pedem [79] e [205]. Achado na verificação: o botão abre só pelo clique (Enter e Espaço); a seta para baixo e a seta para cima no botão, opcionais em [79], não estão no código, nem a busca por letra, opcional em [205].
- **Navegação da gaveta:** os links não devem virar `menu` nem `menubar` ([203], [204]). O comentário do `SidebarAdmin.vue` diz que o `RouterLink` marca `aria-current` só na rota exata, o que bate com um único item atual [207].
- **Landmarks:** os dois `nav` do painel ("Seções do painel" e "Ferramentas do painel") já têm nomes distintos e sem a palavra "navegação" ([210], [211]). O `aside` em volta do `nav` cria um complementary, que a APG descreve como apoio ao conteúdo principal [210].
- **Contador:** o nome "Notificações, N pedidos pendentes", com o número visual em `aria-hidden` (`TheNavbarAdmin.vue`, `navbar/NotificationBar.vue`), segue o exemplo do Compose, que descreve o número e a unidade [212]. Nenhuma fonte do W3C aberta trata disso [214].

### Riscos da etapa 9

- **Rótulo que some:** no rail clássico com `alwaysShowLabel=false` [183] e no modo AUTO do MDC com 4 itens ou mais [170], só o selecionado mostra o rótulo. O painel tem 4 destinos. O `WideNavigationRailItem` mostra sempre [182], e tirar rótulos de texto piorou a usabilidade na pesquisa do Google [26].
- **Foco perdido ao fechar:** a APG, a H102, a 2.4.3 e a F85 pedem a volta do foco ao gatilho ou, se ele sumiu, a um vizinho ([199], [200], [201], [202]). O exemplo do Compose faz isso [167], mas o `WideNavigationRail.kt` não tem controle de foco [181], nem o drawer do material-web [192]. Inferência: no painel, o clique no fundo e a troca de rota não devolvem o foco.
- **Fundo que não fica inerte:** o modal exige o resto inerte e o Tab preso ([199], [200]). Sem bloqueio real, o `aria-modal` pode esconder o conteúdo de fora de algumas tecnologias assistivas [199].
- **`menu` na navegação:** a navegação típica não precisa do padrão menu, e a APG indica o disclosure ([203], [204]). O menu do perfil é um menu button, que a APG cobre, inclusive com itens que são links ([79], [206]), desde que tenha o teclado do menu [205].
- **Contador só visual:** o exemplo do Compose descreve o número e a unidade [212], e o MDC deriva a descrição do número [213]. A 2.5.3 não trata de contadores [214].
- **Scrim:** 0,32 no Compose ([166], [181]) e 60% de preto no MDC [161]. A APG só pede o fundo escurecido ou encoberto [199]. Não encontrei regra de contraste para o scrim. Inferência: a borda da folha e o indicador seguem a 1.4.11 [98].
- **Alvo pequeno:** os controles que abrem a gaveta precisam de 48 dp no MDC [161], e a WCAG pede 24 px CSS [78]. O avatar da barra tem 32 dp de desenho [196]; inferência: o alvo precisa ser maior que o desenho.
- **Fonte desatualizada:** o guia "Build adaptive navigation" ainda mostra a gaveta permanente nas janelas expandidas [185], enquanto a referência e o MDC recomendam o rail expandido ([161], [170], [186]).
- **Fontes divergentes na janela compacta:** navigation bar na escolha recomendada [187] e nas demos do rail largo [179]; rail recolhido no exemplo próprio [188]; rail expandido modal com mais de quatro destinos [169].
- **Rótulo ativo com duas cores:** Secondary no rail [178] e OnSecondaryContainer na gaveta ([161], [164]).
- **Nada pronto para a web:** o drawer do material-web é experimental e não cuida do foco, e o rail, a bar e a top app bar não existem ([190], [191], [192], [193]).
- **Dica que não é anunciada:** os exemplos do Compose marcam como bug o texto da dica que os leitores de tela não anunciam ([179], [194]).
- **Nome que muda junto com o estado:** o Compose troca "Expand rail" por "Collapse rail" e ainda anuncia o estado ([179], [180]). A APG pede que o rótulo de um toggle com `aria-pressed` não mude com o estado [90]. Inferência: na web, com `aria-expanded` [159], um nome que também muda repete a informação.
- **Datas:** as datas da descontinuação são de commits do doc do MDC ([163], [172]), não de um anúncio do M3.

### Não encontrei (etapa 9)

- Fonte do W3C (APG, WCAG ou tutoriais) que trate a gaveta de navegação ou o "hamburger" como diálogo modal ou como disclosure ([199], [203]).
- Quantas ações cabem na top app bar pequena antes do menu de estouro [197].
- Data nas páginas do Compose e nas referências Kotlin; elas só dizem em que versão a API entrou. As datas desta seção são de commits do MDC ([163], [172]).
- A altura mínima do item no rail expandido em dp: o arquivo só cita o tamanho mínimo de acessibilidade pelo nome [181].
- Os textos de `Strings.CloseDrawer`, `Strings.NavigationMenu`, `Strings.CloseRail` e `Strings.WideNavigationRailPaneTitle` ([165], [181]).
- Regra de contraste ou de opacidade mínima para o scrim.
- Scrim e elevação do rail expandido modal no MDC, que só traz o expandido não modal [170].
- Camada de estado e cor do foco na gaveta do MDC; cor do indicador de foco no rail ([161], [178]).
- Medidas do badge dentro do item da gaveta e do rail.
- Orientação do W3C sobre anunciar o número de um badge ou contador [214].
- Implementação oficial de rail ou de top app bar para a web [193].
- Indicação de API experimental nas páginas do `WideNavigationRail` e do `ModalWideNavigationRail`, que só dizem "Added in 1.5.0" ([179], [180]).

### Não abriu (etapa 9)

| URL | Motivo |
|---|---|
| https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TopAppBarSmallTokens.kt | HTTP 404, na pesquisa e na verificação; o arquivo certo é o AppBarSmallTokens.kt [195]. |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/Badge.md | HTTP 404, na pesquisa e na verificação; o doc certo é o BadgeDrawable.md [213]. |
| https://www.w3.org/TR/wai-aria-1.2/ | Abriu em parte: página grande, lida em trechos. A pesquisa não leu de 100 000 a 270 000; a verificação leu a partir do 360 000, onde está o `aria-current` [207]. |
| https://api.github.com/repos/androidx/androidx/contents/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens | Lida só até o caractere 100 000 na pesquisa, para achar os nomes dos arquivos de token; não foi reaberta. |
| https://github.com/material-components/material-components-android/commit/fca1418bf4.diff | Abriu na pesquisa, mas só renomeia imagens; não foi reaberto. |
| Strings.kt do Material 3 (textos das strings da gaveta e do rail) | Não foi aberto. |
| m3.material.io (navigation drawer, navigation rail, top app bar, window size classes) | Só funciona com JavaScript; não foi tentado. |

### Refutadas na verificação (etapa 9)

1. **A10:** "o voltar preditivo só existe na versão `ModalDrawerSheet(drawerState, …)`". [165] dá o mesmo tratamento à `DismissibleDrawerSheet(drawerState, …)`; só as versões sem o `drawerState` não tratam o voltar.
2. **A53:** "no exemplo de lista, o link atual fica desativado e muda de fundo". Em [209], a mudança de fundo desse exemplo é estilo de hover e de foco; o sinal da posição é o link desativado.
3. **Síntese (componentes), em parte:** a gaveta "foi marcada como em descontinuação pelo Expressive em 26/06/2025". A data é a do commit que pôs a nota no doc do MDC ([162], [163]); a página não tem data própria, e nenhuma fonte aberta data a decisão do M3.
4. **Síntese (riscos e recomendação), em parte:** "o [90] e o [159] mantêm o rótulo fixo". O dossiê registra a regra do rótulo fixo só para o toggle com `aria-pressed` [90]; o [159] trata do `aria-expanded` e não fala do rótulo.
5. **Síntese (recomendação), em parte:** abaixo de 600 px, "uma gaveta modal dispensável ... no formato do rail expandido modal com `hideOnCollapse` (A14, A25)". As duas páginas citadas descrevem o rail largo para tablet e desktop ([169], [180]), e a escolha recomendada e as demos dão a navigation bar na janela compacta ([179], [187]). Fica como inferência e decisão do projeto, com as fontes divergentes em "Riscos da etapa 9".

Ajustes de redação, sem derrubada: A2 (a página não traz medidas da especificação, mas o código tem paddings de 16 dp e 12 dp), A14 (a página do rail não diz que o modal dispensável sai da tela; isso está em [180]), A41 (a search app bar abre a search view "quando selecionada", e a página chama as descrições de opcionais e muito encorajadas), A43 (a H102 descreve o foco limitado ao diálogo e à interface do navegador e o resto inerte e escondido das tecnologias assistivas, sem dizer "inoperável"), A44 (as técnicas suficientes incluem também a G59, a SCR27 e a PDF3), A45 (com o gatilho removido, conta o elemento interativo logo antes ou logo depois dele, e o foco em outro controle lógico não é falha), A56 (a página fala de solicitações pendentes numa navigation bar, não de pedidos), A57 (a página só lista os métodos, e os limites estão na tabela de propriedades) e a síntese sobre a barra superior (ela já fica dentro do `header` e já tem nome distinto).

### Achado da sessão principal (etapa 9)

Na revisão do desenho do painel (24/11/2026), a sessão principal abriu duas páginas da W3C para decidir se o peso do rótulo serve de sinal além da cor no item atual da navegação. A [99] já estava no dossiê; a [215] é nova.

| Nº | Tipo | Título | URL | O que sustenta |
|---|---|---|---|---|
| [215] | referência técnica | G182: Ensuring that additional visual cues are available when text color differences are used to convey information (W3C) | https://www.w3.org/WAI/WCAG22/Techniques/general/G182 | Técnica suficiente da 1.4.1: quando a cor do texto transmite informação, pistas visuais como negrito, sublinhado, itálico e mudança de estilo ou de tamanho da fonte contam como distinção além da cor; a informação também precisa estar disponível por programa (1.3.1). |
| [99] | referência técnica | Understanding SC 1.4.1 Use of Color (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | Nesta etapa: a página pede informação além da cor, "such as shape or text", e lista como técnicas suficientes a G14, a G205, a G182 e a G183, e como falhas a F13, a F73 e a F81. Nenhuma trata de fundo colorido indicando seleção numa navegação. |

- A G182 trata de **texto** colorido; o item atual do painel muda o **fundo** (a pílula, 1,23 contra a coluna) e quase não muda a cor do rótulo (cerca de 1,05). Ler o negrito como sinal suficiente para um fundo colorido é inferência, apoiada na lista de pistas da G182 e no "shape or text" da [99].
- Não encontrei técnica nem falha da W3C sobre o item atual ou selecionado de uma navegação marcado só pelo fundo.

## Etapa 10: componentes base (24/11/2026)

Feita em 24/11/2026, com a verificação no mesmo dia. Um pesquisador abriu as páginas e devolveu 85 afirmações, com uma síntese de componentes, riscos e recomendação. Depois, um verificador reabriu cada URL e tentou derrubar cada afirmação, conferindo se a página diz aquilo, com a medida, a cor, o tempo ou o comportamento citado, e se a fonte é da classe declarada. A verificação baixou cada página e leu o trecho de cada afirmação no texto da página (nas páginas grandes, como o WAI-ARIA 1.2, o HTML Standard e as referências Kotlin, só as seções citadas); nos arquivos de código e de tokens do AndroidX e do material-web, conferiu o valor e a linha `VERSION`. As fontes [90] e [153] entram pelo que o dossiê já registra, sem reabertura. A seção responde às perguntas do desenho da etapa 10: o snackbar (cores, medidas, posição, tempo e fila), o diálogo e o modal bottom sheet, o estado vazio, o icon button do Expressive, o indicador de progresso e o botão carregando, o desabilitado e a ação destrutiva, e o seletor de quantidade. Ela completa as linhas `AppToast`, `BaseDialog`, `EmptyState` e `QuantityStepper` da §4.2 do SPEC-M (`docs/direcoes/SPEC-material.md`), as variantes "a desenhar" do `BaseButton` na §4.1 (`danger`, `iconOnly`, `loading` e `pressed`, mais o desabilitado) e as linhas "a desenhar" da §6, ligadas ao registro de que os dossiês não tinham fonte de snackbar, diálogo, estado vazio nem icon button. Das 85 afirmações, 82 ficaram inteiras (8 delas com ajuste de redação), 3 ficaram em parte e nenhuma caiu inteira. Da síntese do pesquisador, três trechos caíram em parte. Tudo isso está em "Refutadas na verificação (etapa 10)". O que a verificação achou e o pesquisador não trouxe está marcado "achado na verificação". As fontes que já tinham número mantêm o número ([58], [76], [90], [98], [151], [153], [166], [190], [193], [198], [199], [200] e [207]), e as novas vão de [216] a [275].

### Fontes da etapa 10

| Nº | Tipo | Título | URL | O que sustenta |
|---|---|---|---|---|
| [216] | documentação oficial | Snackbar (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/snackbar | O aviso breve no pé da tela, os três usos, o `SnackbarHost` no `Scaffold`, a ação, a duração e o resultado. |
| [217] | documentação oficial | SnackbarHostState (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/SnackbarHostState | Um por vez, a fila, a duração padrão com e sem ação, o `withDismissAction` e as amostras (fila com um pendente e cores próprias). |
| [218] | documentação oficial | SnackbarHost.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/SnackbarHost.kt | As durações em ms, o ajuste pela acessibilidade, a fila por Mutex, a entrada e a saída e a semântica. |
| [219] | documentação oficial | Snackbar.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/Snackbar.kt | O KDoc (uma ação, o que não expira, o foco que não conta como ação), a largura, os espaços, o fechar e a ação. |
| [220] | documentação oficial | SnackbarTokens.kt (AndroidX, VERSION v0_103) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/SnackbarTokens.kt | Cores, elevação, forma, tipografia, ícone e alturas do snackbar. |
| [221] | documentação oficial | ShapeTokens.kt (AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ShapeTokens.kt | Os raios dos cantos em dp. |
| [222] | documentação oficial | ComposeMaterial3Flags.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/ComposeMaterial3Flags.kt | A flag do layout novo do snackbar, desligada por padrão (achado na verificação). |
| [223] | documentação oficial | Scaffold.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/Scaffold.kt | A posição do snackbar e do FAB e o `FabSpacing`. |
| [224] | documentação oficial | Snackbar (docs do Material Components for Android) | https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/Snackbar.md | Anatomia, cores, forma, elevação, margem, âncora, durações, um por vez, animação e leitura pelo TalkBack. |
| [225] | documentação oficial | AccessibilityManager (referência da API do Android) | https://developer.android.com/reference/android/view/accessibility/AccessibilityManager#getRecommendedTimeoutMillis(int,%20int) | O tempo recomendado pela acessibilidade e as flags de conteúdo. |
| [226] | documentação oficial | Change time to take action (Ajuda de Acessibilidade do Android, Google) | https://support.google.com/accessibility/android/answer/9426889?hl=en | A opção "Time to take action" e os valores. |
| [227] | referência técnica | Understanding SC 2.2.1 Timing Adjustable (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html | O que é limite de tempo, o exemplo do toast de 5 s e as saídas. |
| [228] | documentação oficial | Dialogs (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/dialog | Usos, peças do `AlertDialog`, o `Dialog` com conteúdo próprio e o exemplo com cor, forma e ações. |
| [229] | documentação oficial | DialogTokens.kt (AndroidX, VERSION v0_210) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/DialogTokens.kt | Cores, elevação, forma, tipografia e ícone do diálogo. |
| [230] | documentação oficial | AlertDialog.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/AlertDialog.kt | Largura, padding, espaços, ordem das ações, alinhamento do título, elevação tonal e `paneTitle`. |
| [231] | documentação oficial | Dialogs (docs do Material Components for Android) | https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/Dialog.md | Básico e tela cheia, anatomia, cores, insets, scrim, alinhamento e acessibilidade. |
| [232] | documentação oficial | Dialog (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/dialog.md | O `md-dialog`, o `returnValue`, o rótulo, o `type="alert"`, o foco preso, o `cancel` e os tokens. |
| [233] | documentação oficial | _md-comp-dialog.scss (tokens v0_192 do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-comp-dialog.scss | Forma, elevação, ícone e ações do diálogo. |
| [234] | documentação oficial | dialog.ts (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/dialog/internal/dialog.ts | `showModal()`, papéis, foco ao abrir, divisores, rolagem e clique fora. |
| [235] | referência técnica | Alert and Message Dialogs Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/ | O alert dialog, os papéis e o teclado. |
| [236] | documentação oficial | Bottom sheets (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/bottom-sheets | O `ModalBottomSheet`, o `SheetState` e a saída da composição. |
| [237] | documentação oficial | SheetBottomTokens.kt (AndroidX, VERSION v0_210) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/SheetBottomTokens.kt | Cor, forma, elevação, alça e foco da folha. |
| [238] | documentação oficial | SheetDefaults.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/SheetDefaults.kt | Largura máxima, scrim, alça e insets. |
| [239] | documentação oficial | ModalBottomSheet.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/ModalBottomSheet.kt | Uso, padrões, scrim, fechamento e voltar. |
| [240] | documentação oficial | BottomSheet.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/BottomSheet.kt | A alça clicável, as ações semânticas, o `paneTitle` e o foco do modal. |
| [241] | documentação oficial | Bottom sheets (docs do Material Components for Android) | https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/BottomSheet.md | Standard e modal, medidas, cores, fechamento, voltar e a alça acessível. |
| [242] | documentação oficial | Tile (empty) states (Wear OS) | https://developer.android.com/design/ui/wear/guides/surfaces/tiles/states | Tipos de estado vazio e a chamada à ação. É guia de relógio. |
| [243] | documentação oficial | Empty states, Patterns (Material 1, não mantido) | https://m1.material.io/patterns/empty-states.html | O estado vazio básico, a imagem, a frase e as alternativas. É do Material 1. |
| [244] | praticante | Designing Empty States in Complex Applications: 3 Guidelines (Nielsen Norman Group, Kate Kaplan, 19/09/2021) | https://www.nngroup.com/articles/empty-state-interface-design/ | O vazio depois de filtrar, a mensagem de status, as pistas e os caminhos diretos. |
| [245] | documentação oficial | Icon buttons (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/icon-button | Tipos, APIs, o toggle, o contador de dois botões e a atualização Expressive. |
| [246] | documentação oficial | IconButtonDefaults (androidx.compose.material3) | https://developer.android.com/reference/kotlin/androidx/compose/material3/IconButtonDefaults | Tamanhos, formas, versão das APIs e cores padrão e vibrant. |
| [247] | documentação oficial | IconButtonDefaults.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/IconButtonDefaults.kt | A largura como ícone mais os dois espaços (achado na verificação). |
| [248] | documentação oficial | XSmallIconButtonTokens.kt (AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/XSmallIconButtonTokens.kt | Altura, ícone, espaços, contorno e formas do XS. |
| [249] | documentação oficial | SmallIconButtonTokens.kt (AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/SmallIconButtonTokens.kt | Altura, ícone, espaços, contorno e formas do S. |
| [250] | documentação oficial | MediumIconButtonTokens.kt (AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/MediumIconButtonTokens.kt | Altura, ícone, espaços, contorno e formas do M. |
| [251] | documentação oficial | LargeIconButtonTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/LargeIconButtonTokens.kt | Altura, ícone, espaços, contorno e formas do L. |
| [252] | documentação oficial | XLargeIconButtonTokens.kt (AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/XLargeIconButtonTokens.kt | Altura, ícone, espaços, contorno e formas do XL. |
| [253] | documentação oficial | IconButtonTokens.kt (`StandardIconButtonTokens`, AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/IconButtonTokens.kt | Cores do icon button padrão e do toggle. |
| [254] | documentação oficial | FilledIconButtonTokens.kt (AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FilledIconButtonTokens.kt | Cores do filled. |
| [255] | documentação oficial | FilledTonalIconButtonTokens.kt (AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FilledTonalIconButtonTokens.kt | Cores do tonal. |
| [256] | documentação oficial | OutlinedIconButtonTokens.kt (AndroidX, VERSION 14_1_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/OutlinedIconButtonTokens.kt | Cores e contorno do outlined. |
| [257] | documentação oficial | Icon button (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/icon-button.md | Ênfase, toggle, nome, `soft-disabled` e tokens. |
| [258] | documentação oficial | icon-button.ts (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/iconbutton/internal/icon-button.ts | `aria-pressed`, troca do nome, `disabled` e `soft-disabled`. |
| [259] | documentação oficial | Icon button (docs do Material Components for Android) | https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/IconButton.md | Expressive, tipos, estilos por ênfase, ícones do toggle, tamanho padrão, alvo de 48 dp e descrição. |
| [260] | documentação oficial | Progress indicators (Jetpack Compose) | https://developer.android.com/develop/ui/compose/components/progress | Tipos, o wavy, o circular centrado no que carrega e o exemplo do botão. |
| [261] | documentação oficial | Progress (docs do material-web) | https://raw.githubusercontent.com/material-components/material-web/main/docs/components/progress.md | Atributos, rótulo e tokens. |
| [262] | documentação oficial | progress.ts (material-web) | https://raw.githubusercontent.com/material-components/material-web/main/progress/internal/progress.ts | Papel e atributos ARIA do indicador. |
| [263] | referência técnica | ARIA: aria-busy attribute (MDN) | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-busy | O `aria-busy` em live regions, widgets e feeds. |
| [264] | documentação oficial | FilledButtonTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FilledButtonTokens.kt | Desabilitado e toggle do botão filled. |
| [265] | documentação oficial | FilledTonalButtonTokens.kt (AndroidX, VERSION v0_103) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/FilledTonalButtonTokens.kt | Cores, desabilitado, altura, forma e ícone do tonal. |
| [266] | documentação oficial | TextButtonTokens.kt (AndroidX, VERSION v0_11_0) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/TextButtonTokens.kt | Rótulo e desabilitado do botão de texto. |
| [267] | documentação oficial | Button.kt (código-fonte do AndroidX) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/Button.kt | As cores padrão, o TODO do texto, o KDoc e a largura mínima. |
| [268] | documentação oficial | Material Design 3 in Compose | https://developer.android.com/develop/ui/compose/designsystems/material3 | O "on-x" com alpha no desabilitado e os pares de contraste. |
| [269] | referência técnica | Understanding SC 1.4.3 Contrast (Minimum) (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html | O componente inativo. |
| [270] | referência técnica | Developing a Keyboard Interface (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/ | O foco em controles desabilitados e a persistência do foco. |
| [271] | referência técnica | ARIA: aria-disabled attribute (MDN) | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-disabled | O que o `aria-disabled` faz e não faz, o estilo e o aviso ao reativar. |
| [272] | referência técnica | disabled HTML attribute (MDN) | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/disabled | Foco, eventos, envio e `:disabled`. |
| [273] | referência técnica | HTML Standard, 8.1.7.3 Processing model (WHATWG) | https://html.spec.whatwg.org/multipage/webappapis.html#focus-fixup-rule | O foco quando o elemento focado deixa de ser focável ou é removido. |
| [274] | referência técnica | Spinbutton Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/ | Peças, teclado, papéis e propriedades do spinbutton. |
| [275] | referência técnica | Quantity Spin Button Example (WAI-ARIA APG, atualizado em 28/10/2025) | https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/examples/quantity-spinbutton/ | Botões fora do Tab, `aria-disabled` no limite, o `output` e o aviso de suporte. |
| [58] | documentação oficial | Loading indicators (Jetpack Compose; já citada) | https://developer.android.com/develop/ui/compose/components/loading-indicator | Nesta etapa: pull-to-refresh, progresso não mensurável e o contido; nada sobre botão. |
| [76] | referência técnica | Understanding SC 2.4.11 Focus Not Obscured (Minimum) (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html | Nesta etapa: a notificação fixa, o conteúdo que aparece sem iniciativa do usuário e o toast que desliza para um espaço vazio. |
| [90] | referência técnica | Button Pattern (WAI-ARIA APG; já citada) | https://www.w3.org/WAI/ARIA/apg/patterns/button/ | Nesta etapa, pelo que o dossiê já registra (não reaberta): o rótulo fixo do toggle com `aria-pressed`. |
| [98] | referência técnica | Understanding SC 1.4.11 Non-text Contrast (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | Nesta etapa: por que os inativos ficam isentos, o ícone com contraste no lugar da borda e o contorno encorajado. |
| [151] | referência técnica | Understanding SC 4.1.3 Status Messages (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html | Nesta etapa: o texto sobre a busca como mensagem de status, o "ocupado" e o "system available". |
| [153] | referência técnica | ARIA22: Using role=status to present status messages (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22 | Nesta etapa, pelo que o dossiê já registra (não reaberta): o `role="status"` presente antes da mensagem. |
| [166] | documentação oficial | ScrimTokens.kt (AndroidX, VERSION v0_117; já citada) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ScrimTokens.kt | Nesta etapa, reaberta na verificação: a opacidade de 0,32 que a folha usa. |
| [190] | documentação oficial | material-web, pasta `labs` (API do GitHub; já citada) | https://api.github.com/repos/material-components/material-web/contents/labs | Nesta etapa: não há snackbar, nem experimental. |
| [193] | documentação oficial | Roadmap do material-web (já citada) | https://raw.githubusercontent.com/material-components/material-web/main/docs/roadmap.md | Nesta etapa: Snackbar e Bottom sheet não feitos; Dialog, Icon button e Progress indicators feitos no Material 1.0. |
| [198] | documentação oficial | ElevationTokens.kt (AndroidX, VERSION v0_103; já citada) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ElevationTokens.kt | Nesta etapa: Level3 de 6 dp, Level4 de 8 dp e Level5 de 12 dp. |
| [199] | referência técnica | Dialog (Modal) Pattern (WAI-ARIA APG; já citada) | https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ | Nesta etapa: o foco inicial num passo difícil de desfazer e o botão visível de fechar. |
| [200] | referência técnica | H102: Creating modal dialogs with the HTML dialog element (W3C; já citada) | https://www.w3.org/WAI/WCAG22/Techniques/html/H102 | Nesta etapa, reaberta na verificação: o foco volta a quem abriu, se ele ainda estiver na página. |
| [207] | referência técnica | Accessible Rich Internet Applications (WAI-ARIA) 1.2 (W3C; já citada) | https://www.w3.org/TR/wai-aria-1.2/ | Nesta etapa: `aria-busy`, `progressbar`, `aria-disabled` e `spinbutton`. |

### Snackbar

**Anatomia e medidas.**

| Peça | Compose | Material Components for Android (Views) |
|---|---|---|
| Contêiner | `InverseSurface`, `Level3` (6 dp), `CornerExtraSmall` (4 dp) ([220], [198], [221]) | `colorSurfaceInverse`, elevação de 6 dp, `shapeAppearanceCornerExtraSmall` [224] |
| Texto | `InverseOnSurface`, `BodyMedium` [220] | `colorOnSurfaceInverse`, `textAppearanceBodyMedium` [224] |
| Ação | `InversePrimary`, `LabelLarge`, com a mesma cor no hover, no foco e no pressionado [220]; é um `TextButton` [219] | `colorPrimaryInverse` [224] |
| Fechar | Ícone `InverseOnSurface` de 24 dp [220]; um `IconButton` com o ícone Close, a descrição da string `SnackbarDismiss` e uma dica (tooltip) acima [219] | `colorOnSurfaceInverse` [224] |
| Altura | 48 dp com uma linha e 68 dp com duas [220] | não encontrei |
| Largura | Até 600 dp, sem mínimo próprio [219] | não encontrei |
| Espaços | 16 dp no início; no fim, 8 dp sem o fechar e 0 com ele; 12 dp de margem por fora na sobrecarga com `SnackbarData` [219] | Margem externa de 8 dp [224] |
| Peças | No máximo uma ação; fechar ou cancelar é opcional [219] | Contêiner, texto, ação opcional e fechar opcional [224] |

- O texto quebra linha. Com `actionOnNewLine`, a ação desce para uma linha própria, alinhada ao fim [219].
- Achado na verificação: o Snackbar.kt tem dois layouts. O padrão (o legado) põe 6 dp em volta do texto e, com duas linhas, a primeira linha de base a 30 dp do topo, com os 68 dp de altura mínima. O novo põe 14 dp em volta do texto e usa só os 48 dp de mínimo, mas só vale com a flag `isSnackbarStylingFixEnabled`, que vem `false` e corrige o alinhamento vertical do texto de várias linhas ([219], [222]).
- O doc do MDC não traz nota do Expressive, largura nem padding interno [224].
- Raios do ShapeTokens.kt: ExtraSmall 4, Small 8, Medium 12, Large 16, LargeIncreased 20, ExtraLarge 28 (ExtraLargeTop: 28 só nos cantos de cima), ExtraLargeIncreased 32 e ExtraExtraLarge 48 dp; Full é círculo [221]. Elevação: Level3 de 6 dp, Level4 de 8 dp e Level5 de 12 dp [198].

**Posição.**

- O guia do Compose descreve o snackbar como aviso breve no pé da tela, que dá retorno sem interromper e some depois de alguns segundos. Os usos são confirmar uma ação com "Undo" depois de apagar um e-mail ou mensagem, avisar que o app ficou offline e confirmar que um formulário ou ajuste foi salvo [216]. O KDoc diz que ele aparece por pouco tempo, perto do pé da tela, não deve interromper e não exige ação para sumir [219].
- No `Scaffold`, o snackbar fica centralizado na horizontal, descontados os insets laterais. Na vertical, fica logo acima do FAB, quando há FAB; sem FAB, logo acima da bottom bar; sem as duas, acima do inset de baixo. Os 16 dp do `FabSpacing` separam o FAB da barra ou da borda; entre o snackbar e o FAB, a folga é a margem de 12 dp do próprio snackbar ([223], [219]).
- No MDC, o snackbar fica preso à borda de baixo do pai. O `setAnchorView` o põe acima de uma view, como um FAB, uma BottomAppBar ou uma BottomNavigationView [224].
- Nenhuma das duas fontes fala de snackbar no topo nem de alinhar ao início em telas largas.

**Tempo.**

| Duração | Compose | MDC |
|---|---|---|
| Curta | `Short`: 4000 ms [218] | `LENGTH_SHORT`, sem ms no doc [224] |
| Longa | `Long`: 10000 ms [218] | `LENGTH_LONG`, sem ms no doc [224] |
| Indefinida | `Indefinite` (`Long.MAX_VALUE`): fica até a pessoa ou o programa dispensar ([218], [216]) | `LENGTH_INDEFINITE`: até ser dispensado ou até outro aparecer [224] |
| Padrão | `Short` sem ação e `Indefinite` com ação ([217], [218]) | — |

- O KDoc diz que um snackbar com ação não deve expirar nem sumir sozinho até a pessoa fazer outra ação. Achado na verificação: o mesmo trecho diz que mover o foco do teclado pelos elementos da página não conta como ação [219].
- O `withDismissAction` vem `false`. A referência recomenda `true` com `Indefinite`, "for better accessibility" [217].
- Antes de valer, o tempo passa pelo `calculateRecommendedTimeoutMillis` do gerenciador de acessibilidade, quando ele existe, com ícones e texto sempre marcados e controles só quando há ação. O código tem um TODO sobre ajustar esses números [218].
- No Android, o `getRecommendedTimeoutMillis` (API 29) devolve o tempo recomendado para o usuário atual. Os controles devem ficar na tela pelo menos esse tempo, porque algumas pessoas precisam de mais tempo para revisar, alcançar ou acionar os controles com tecnologia assistiva. As flags são `FLAG_CONTENT_ICONS` (1), `FLAG_CONTENT_TEXT` (2) e `FLAG_CONTENT_CONTROLS` (4) [225].
- A opção "Time to take action (Accessibility timeout)", do Android 10 em diante, escolhe por quanto tempo ficam na tela as mensagens temporárias que pedem ação: Padrão, 10 s, 30 s, 1 min ou 2 min. Nem todo app a respeita [226].
- No MDC, o snackbar some por tempo, por uma interação em outro ponto da tela ou por arraste [224].
- O `showSnackbar()` devolve `ActionPerformed` (a pessoa tocou a ação) ou `Dismissed` (dispensou sem a ação) [216]. Achado na verificação: no exemplo do guia, um comentário diz que a duração padrão é `Short` numa chamada com ação, mas a referência e o código dão `Indefinite` nesse caso ([216], [217], [218]).
- 2.2.1 [227]: todo processo que ocorre sem iniciativa do usuário depois de um tempo é limite de tempo. No exemplo da página, um toast de 5 s num cliente de e-mail não impõe limite, porque a mesma informação está na caixa de entrada. Sem outro meio de achar a informação, cada mensagem tem de cumprir a 2.2.1: desligar, ajustar até dez vezes o padrão, estender com aviso de 20 s, ou cair numa exceção. Desligar o limite é melhor que ajustá-lo.

**Fila.**

- Compose: no máximo um snackbar por vez. Um pedido feito com outro visível fica suspenso até o atual ser mostrado e resolvido; se quem pediu é cancelado, o aviso sai da tela ou da fila ([217], [218]). O código usa um Mutex, que o comentário chama de fila justa: o segundo pedido espera o atual ser dispensado, acionado ou cancelado [218].
- Uma amostra da referência deixa só um snackbar na fila, com um canal `CONFLATED` [217].
- MDC: só um aparece por vez, e mostrar um novo dispensa os anteriores [224].

**Movimento.** No Compose, a entrada leva a opacidade de 0 a 1 com o `FastEffects` e a escala de 0,8 a 1 com o `FastSpatial`, os dois do esquema de movimento; a saída faz o inverso, e o item sai da lista quando a opacidade termina. O arquivo não traz milissegundos nem curva [218]. No MDC, a animação padrão é `fade` [224].

**Semântica e acessibilidade.**

- Compose: o snackbar visível é uma live region `Polite`, tem `paneTitle` (string `SnackbarPaneTitle`) e uma ação semântica `dismiss`, para a tecnologia assistiva dispensá-lo [218].
- MDC: o texto vai sozinho aos serviços de acessibilidade, e leitores como o TalkBack o leem. O doc não trata de tempo para quem usa serviço de acessibilidade [224].
- 2.4.11 [76], nesta etapa: uma notificação fixa, como um banner de cookies, falha se esconder inteiro o componente focado. Passam o banner modal, o scroll padding e, para notificações que não pedem ação, fechar quando perdem o foco. Conteúdo que aparece sem iniciativa do usuário, como avisos do sistema, não pode impedir o item focado de ficar visível. Entre os desenhos que passam, a página cita toasts que deslizam para um espaço vazio da página.

**Na web.** O material-web não tem snackbar. O roadmap o põe em "New components", entre os que a equipe não construiu [193], e a pasta `labs` não tem nada parecido [190].

**Amostra de personalização (não é diretriz).** Uma amostra da referência faz um snackbar próprio, com a ação em `inversePrimary` e, na variante de erro, o botão da ação em `errorContainer` com texto `error` [217].

**Leitura da verificação (inferência).** A ação pede `inverse-primary` ([220], [224]), e a §2.2 do SPEC-M tem `inverse-surface` e `inverse-on-surface`, mas não `inverse-primary`. O `AppToast` de hoje já pausa o tempo no hover e no foco; a pausa no foco combina com o KDoc, para o qual navegar com o foco não é ação [219].

### Diálogo e bottom sheet

**Diálogo básico.**

| Ponto | Compose | MDC (Views) | material-web |
|---|---|---|---|
| Contêiner | `SurfaceContainerHigh`, `Level3`, `CornerExtraLarge` [229]; elevação tonal 0 [230] | `colorSurfaceContainerHigh`, `shapeAppearanceCornerExtraLarge` [231] | `surface-container-high`, `level3`, `corner-extra-large` ([232], [233]) |
| Largura | De 280 a 560 dp [230] | Inset de 24 dp nas laterais e de 80 dp em cima e embaixo [231] | não encontrei |
| Padding | 24 dp (20 com ponteiro de precisão) [230] | não encontrei | não encontrei |
| Ícone | Opcional; `Secondary`, 24 dp [229]; 16 dp abaixo dele [230] | `colorSecondary`; precisa de descrição [231] | `secondary`, 24 px [233] |
| Título | `HeadlineSmall` em `OnSurface` [229]; 16 dp abaixo; centralizado quando há ícone, no início quando não há [230] | `colorOnSurface`, `textAppearanceHeadlineSmall`; o overlay padrão alinha ícone e título ao início, e o "Centered" os centraliza [231] | `on-surface`, headline-small [232] |
| Texto | `BodyMedium` em `OnSurfaceVariant` [229]; 24 dp abaixo (16 com ponteiro de precisão) [230] | `colorOnSurfaceVariant`, `textAppearanceBodyMedium` [231] | `on-surface-variant`, body-medium [232] |
| Ações | `Primary`, `LabelLarge` [229]; numa FlowRow alinhada ao fim, 8 dp entre os botões; lado a lado, o confirmar fica depois do dispensar; empilhados, o confirmar vem primeiro [230] | Botões de texto alinhados ao fim [231] | `primary`, label-large, camada de estado `primary` no hover, no foco e no pressionado [233] |
| Divisor | — | Opcional [231] | Em cima e embaixo, quando o conteúdo rola e não está no topo ou no fim [234] |
| Scrim | O conteúdo de baixo aparece escurecido [228]; sem valor na página | 32% (`backgroundDimAmount`) [231] | — |
| Rolagem | O texto ocupa só o espaço que sobra; o arquivo não implementa rolagem [230] | não encontrei | Volta ao topo ao abrir [234] |
| Nome do painel | `paneTitle` com a string `Dialog` [230] | — | — |

- Usos (Compose): o diálogo mostra mensagens ou pede entrada numa camada acima do app, de forma interruptiva. Os exemplos são confirmar uma ação (como apagar um arquivo), pedir entrada e escolher numa lista. O `AlertDialog` tem `icon`, `title`, `text`, `onDismissRequest` (chamado, por exemplo, ao tocar fora), `confirmButton` e `dismissButton`, e os exemplos usam `TextButton` nos dois. Para formulário e vários botões, a página manda usar o `Dialog` com conteúdo próprio [228].
- No exemplo de `Dialog` com imagem, o card usa `surfaceContainerHigh` e `shapes.extraLarge`, o texto é bodyMedium em `onSurfaceVariant`, e as ações ficam no fim, 8 dp uma da outra, com 24 dp de padding; o comentário diz que os diálogos do Material alinham as ações ao fim [228].
- O KDoc diz que os diálogos trazem prompts importantes num fluxo e podem exigir uma ação, comunicar informação ou ajudar a concluir uma tarefa [230]. O MDC diz que o básico interrompe com informação, detalhes ou ações urgentes (alertas, seleção rápida, confirmação), que o diálogo desativa o app enquanto está aberto e que, interruptivo de propósito, deve ser usado com moderação [231].
- Achado na verificação: o alinhamento do título diverge. O Compose centraliza ícone e título quando há ícone [230]; o overlay padrão do MDC os alinha ao início [231].

**Tela cheia.** No MDC, o diálogo de tela cheia ocupa a tela com ações que pedem uma série de tarefas, como criar um evento de calendário, e é o único sobre o qual outro diálogo pode abrir. Não há implementação própria: usa-se o `DialogFragment`. A anatomia é contêiner, cabeçalho, ícone de fechar, botão de texto e divisor opcional [231].

**Comportamento na web (material-web).**

- O `md-dialog` se comporta como o `<dialog>` nativo e fecha por `<form method="dialog">`; o `value` do botão vira o `returnValue`. O diálogo é rotulado pelo título, ou por `aria-label` quando não tem título [232].
- Abre com `showModal()`; põe `role="alertdialog"` só com `type="alert"`, não usa `aria-modal`, e o `aria-labelledby` aponta para o título [234].
- Foco ao abrir: o filho com `autofocus`; senão, o primeiro focável, pelo comportamento nativo; sem filhos focáveis, o próprio diálogo [234]. O foco fica preso por padrão, e o `no-focus-trap` só deve ser usado se o diálogo ficar mais acessível sem a armadilha [232]. Ao fechar, o código não devolve o foco por conta própria [234]; quem devolve é o `<dialog>` nativo, a quem abriu, se ele ainda estiver na página [200].
- O clique fora do conteúdo dispara `cancel` e fecha; o comentário do código diz que o `<dialog>` nativo não faz isso [234]. O evento `cancel` vem do clique no scrim ou do Esc [232].
- O `type="alert"` serve a mensagens importantes que exigem resposta, como confirmações de erro e de ação. Achado na verificação: o exemplo da página é uma confirmação de exclusão com "Cancel" antes de "Delete", os dois como text buttons, sem cor própria no "Delete" [232].

**APG: o que é novo em relação a [199] e [200].**

- [199], nesta etapa: num passo final difícil de desfazer, como apagar dados ou concluir uma transação, pode ser melhor pôr o foco inicial na ação menos destrutiva, e o padrão de alert dialog costuma ser usado nesses casos. Num diálogo que só informa ou continua um processo, o foco pode ir ao elemento mais usado, como OK ou Continuar. A página recomenda fortemente que o Tab passe por um elemento visível com papel `button` que feche o diálogo, como um ícone de fechar ou um Cancelar.
- [235]: o alert dialog é um diálogo modal que interrompe para comunicar uma mensagem importante e obter resposta; os exemplos são prompts de confirmação de ação e de erro. Papel `alertdialog` no elemento que contém a mensagem e os botões; `aria-modal="true"`, só se o resto ficar bloqueado e encoberto de fato; nome por `aria-labelledby` (título visível) ou `aria-label`; `aria-describedby` apontando para a mensagem. O papel permite tratamento especial, como um som de alerta. O teclado é o do diálogo modal.
- [200], nesta etapa: com o `<dialog>` modal, o navegador devolve o foco a quem abriu, se ele ainda estiver na página.

**Modal bottom sheet.**

| Ponto | Compose | MDC (Views) |
|---|---|---|
| Contêiner | `SurfaceContainerLow`, `CornerExtraLargeTop` (28 dp só em cima), `Level1` no modal e no standard [237]; elevação tonal 0 [239] | `colorSurfaceContainerLow`, `shapeAppearanceCornerExtraLarge`, elevação de 1 dp [241] |
| Largura máxima | 640 dp ([238], [239]) | 640 dp [241] |
| Alça | 32 × 4 dp em `OnSurfaceVariant` [237]; 22 dp de padding vertical, forma extraLarge, sem alpha, descrição da string `BottomSheetDragHandleDescription` e dica acima [238]; vem por padrão, mas o parâmetro aceita `null` [239] | Opcional na anatomia; a `BottomSheetDragHandleView` tem mínimo de 48 dp de largura e altura, e é preciso reservar 48 dp no topo da folha [241] |
| Foco | Indicador de foco `Secondary` [237] | — |
| Scrim | Cor do scrim com opacidade de 0,32 ([238], [166]); tem descrição (`Strings.CloseSheet`) [239] | Sobre um scrim, sem valor no doc [241] |
| Fechar | Toque no scrim, com `shouldDismissOnClickOutside` (padrão true); voltar, com `shouldDismissOnBackPress` (padrão true) e voltar preditivo [239] | Toque fora, arraste até o fim e voltar preditivo automático nos componentes modais [241] |
| Insets | O modal respeita os insets seguros de cima e de baixo [238] | — |

- O KDoc do `ModalBottomSheet` diz que a folha modal é alternativa a menus inline e a diálogos simples no celular, sobretudo para listas longas de ações ou itens com descrições e ícones. Como os diálogos, ela fica na frente do app, desativa o resto e fica até ser confirmada, dispensada ou até uma ação exigida ser feita ([239], [240]). No MDC, a modal bloqueia o resto, e a standard convive com o conteúdo [241].
- A alça é clicável: expandida, dispensa a folha; parcialmente expandida, expande. Com os gestos ligados, ganha ações semânticas: dispensar sempre, expandir quando está parcial e recolher quando há estado parcial. A folha tem `paneTitle` (`BottomSheetPaneTitle`) [240].
- No MDC, a `BottomSheetDragHandleView` recebe comandos de acessibilidade para expandir e recolher (TalkBack, Voice Access, Switch Access): um toque alterna entre expandida e recolhida, e o toque duplo esconde a folha. O doc não diz se a folha precisa de um botão de fechar à parte [241].
- Achado na verificação: o KDoc do `BottomSheet.kt` diz que o `ModalBottomSheet` cuida sozinho da janela de diálogo, do scrim e da gestão de foco [240]. O `ModalBottomSheet` é marcado `@ExperimentalMaterial3Api` [239].
- O guia do Compose mostra o `ModalBottomSheet` com o conteúdo em coluna e o `SheetState` com `show()` e `hide()`, e pede tirar a folha da composição quando ela esconde. A página não traz medidas nem orientação de acessibilidade [236].
- Soma da verificação: a alça de 4 dp com 22 dp em cima e embaixo ocupa 48 dp de altura [238].

**Leitura da verificação (inferência).** A §4.2 do SPEC-M põe o `BaseDialog` em `surface-container`; as três fontes dão `surface-container-high` ao diálogo ([229], [231], [232]) e `surface-container-low` à folha ([237], [241]). O `BaseDialog` de hoje já abre com `showModal()`, fecha no clique fora, como o material-web [234], e devolve o foco a quem abriu, como pede a H102 [200].

### Estado vazio

- Não encontrei componente nem diretriz de estado vazio no M3 (Compose, MDC ou material-web). A página do M2 não abriu.
- Wear OS [242], guia de tile de relógio: estado vazio nem sempre é erro ou falta de dado; pode ser uma sessão encerrada ou uma mensagem positiva. Todo estado vazio deve ter uma chamada clara à ação, para a pessoa saber como resolver ou saber mais. O "sem dados" deve dizer a causa e como corrigir. Quando o vazio é o estado mais comum, uma imagem pode deixá-lo com cara de completo.
- Material 1 [243], que a própria página diz não ser mais mantido (ela manda usar o M3): o estado vazio surge quando o conteúdo não pode ser mostrado, como uma lista sem itens ou uma busca sem resultado; falha do sistema é erro, não estado vazio. O básico é uma imagem não interativa com uma frase: imagem sutil e neutra em relação ao fundo; frase de tom positivo, coerente com a marca e sem parecer acionável. No "não faça", a imagem é viva e a frase parece uma chamada à ação. As alternativas são conteúdo inicial, conteúdo educativo e, na busca sem resultado exato, os resultados mais próximos, sob um título que deixe claro que não são exatos.
- NN/g [244], praticante: um painel em branco depois de filtrar deixa a pessoa sem saber se ainda carrega, se falhou ou se o filtro estava errado. Terminado o processamento, uma mensagem curta de que não há dados para aquele filtro resolve; mostrar "No records" durante o carregamento engana. O vazio serve a pistas de aprendizado e a caminhos diretos (links) para a tarefa que o preenche; enquanto processa, um indicador de progresso.
- 4.1.3 [151], nesta etapa: a lista de resultados não é mensagem de status, mas um texto breve sobre a busca, como "Searching...", "18 results returned" ou "No results returned", é, quando não leva o foco nem recarrega a página. A página não fala de filtro. Quando uma mensagem de "ocupado" some, um status não visível, como "system available", pode comunicar a mudança.
- As fontes divergem na ação: o Wear OS pede uma chamada clara à ação em todo estado vazio [242], a NN/g pede caminhos diretos para a tarefa [244], e o Material 1 pede uma frase que não pareça acionável [243].

**Leitura da verificação (inferência).** Nenhuma fonte dá medidas. Na categoria vazia do cardápio, a frase que aparece depois do filtro é texto sobre o resultado, o caso da [151], e cabe numa região `role="status"` presente antes da mensagem [153].

### Icon button

**Tipos e estilos.**

- Compose [245]: os botões de ícone mostram ações comuns e precisam de um ícone de sentido claro. Há dois tipos: o padrão, que abre outro elemento, como menu ou busca, e o toggle, para ações binárias, como favoritar. As APIs são `IconButton`, `FilledIconButton`, `FilledTonalIconButton` e `OutlinedIconButton`, e as versões toggle.
- MDC [259]: quatro estilos, em ordem de ênfase: filled, tonal, outlined e standard. O toggle usa o ícone contornado desmarcado e o preenchido marcado.
- material-web [257]: o padrão não tem fundo nem contorno e é o de menor ênfase; o filled tem o maior impacto; o tonal fica no meio, bom para uma ação secundária ao lado de uma de ênfase alta; o outlined é de ênfase média.

**Cores (Compose, tokens 14_1_0).**

| Estilo | Contêiner | Ícone | Toggle desmarcado | Toggle marcado | Desabilitado |
|---|---|---|---|---|---|
| Padrão [253] | — | `OnSurfaceVariant` | Ícone `OnSurfaceVariant` | Ícone `Primary` | Ícone `OnSurface` a 0,38 |
| Filled [254] | `Primary` | `OnPrimary` | `SurfaceContainer` com `OnSurfaceVariant` | `Primary` com `OnPrimary` | Contêiner `OnSurface` a 0,1; ícone `OnSurface` a 0,38 |
| Tonal [255] | `SecondaryContainer` | `OnSecondaryContainer`, também no hover, no foco e no pressionado | Igual ao padrão | `Secondary` com `OnSecondary` | Contêiner `OnSurface` a 0,1; ícone `OnSurface` a 0,38 |
| Outlined [256] | Contorno `OutlineVariant` | `OnSurfaceVariant` | Contorno `OutlineVariant` | `InverseSurface` com `InverseOnSurface` | Ícone `OnSurface` a 0,38, contorno `OutlineVariant`; marcado e desabilitado, contêiner `OnSurface` a 0,1 |

- material-web [257]: contêiner de 40 × 40 px, ícone de 24 px e forma `corner-full`; o outlined tem contorno `outline` de 1 px; o marcado do filled fica em `primary`, e o do tonal, em `secondary-container`.
- Referência [246]: o `iconButtonColors()` usa o `LocalContentColor`, e o desabilitado é esse conteúdo com o alpha `DisabledOpacity`; o `iconButtonVibrantColors()` traz as "recommended high contrast colors". A borda do `outlinedIconButtonBorder` usa o `LocalContentColor`; a versão vibrant usa a cor da especificação.

**Tamanhos, larguras e formas do Expressive (dp).**

| Tamanho | Altura | Ícone | Espaço de cada lado (narrow / uniform / wide) | Largura (narrow / uniform / wide) | Contorno do outlined | Quadrado | Pressionado | Marcado, redondo | Marcado, quadrado |
|---|---|---|---|---|---|---|---|---|---|
| XS [248] | 32 | 20 | 4 / 6 / 10 | 28 / 32 / 40 | 1 | Medium (12) | Small (8) | Medium (12) | Full |
| S [249] | 40 | 24 | 4 / 8 / 14 | 32 / 40 / 52 | 1 | Medium (12) | Small (8) | Medium (12) | Full |
| M [250] | 56 | 24 | 12 / 16 / 24 | 48 / 56 / 72 | 1 | Large (16) | Medium (12) | Large (16) | Full |
| L [251] | 96 | 32 | 16 / 32 / 48 | 64 / 96 / 128 | 2 | ExtraLarge (28) | Large (16) | ExtraLarge (28) | Full |
| XL [252] | 136 | 40 | 32 / 48 / 72 | 104 / 136 / 184 | 3 | ExtraLarge (28) | Large (16) | ExtraLarge (28) | Full |

- O redondo é `CornerFull` em todos os tamanhos; os raios em dp vêm de [221]. A largura é o ícone mais os dois espaços, como o `IconButtonDefaults.kt` calcula; a soma é da verificação [247].
- Compose [245]: cinco tamanhos, três larguras (uniform, a padrão, narrow e wide), cantos redondos ou quadrados. O botão troca de forma ao pressionar (`IconButtonDefaults.shapes()`) e o toggle, também ao marcar (`toggleableShapes()`). Num button group padrão, o botão pressionado interage com os vizinhos.
- Referência [246]: os tamanhos por `IconButtonWidthOption` (padrão `Uniform`), o `shapes()` e o `toggleableShapes()` dizem "Added in 1.5.0", sem marca de experimental na página. Há forma redonda, quadrada, pressionada e marcada (redonda e quadrada) para cada tamanho.
- MDC [259]: no Expressive, os botões de ícone ganharam formas e tamanhos e trocam de forma ao pressionar e ao marcar; o small é o tamanho padrão; as medidas padrão dão alvo de toque de 48 dp.

**Nome acessível e toggle.**

- MDC [259]: botão só de ícone sempre precisa de `contentDescription`, para o leitor de tela.
- material-web [257]: nome por `aria-label`. O toggle usa `toggle`, `selected` e um segundo ícone em `slot="selected"`; o `aria-label-selected` dá um rótulo mais descritivo quando marcado. O `disabled` não é focável; o `soft-disabled` fica desabilitado e focável, recomendado em toolbars para a descoberta, com link para a APG.
- material-web [258]: com `toggle`, o `<button>` interno recebe `aria-pressed` true ou false; quando `aria-label` e `aria-label-selected` existem, o nome passa ao segundo com o botão marcado. O `disabled` vira o atributo nativo; o `soft-disabled` vira `aria-disabled`, sem `disabled`, mantém o foco e bloqueia o clique na fase de captura.
- Compose [245]: o exemplo de toggle troca o ícone contornado pelo preenchido e troca também a `contentDescription` ("Selected icon button" e "Unselected icon button."), num `IconButton` comum.
- [90], pelo que o dossiê já registra: a APG pede que o rótulo de um toggle com `aria-pressed` não mude com o estado.

**Leitura da verificação (inferência).** O `iconOnly` da §4.1 do SPEC-M tem 44 px; o S do Compose tem 40 dp de contêiner [249], e o MDC pede alvo de 48 dp [259].

### Indicador de progresso e botão carregando

- Compose [260]: determinado ou indeterminado, linear ou circular. O Expressive acrescenta o `LinearWavyProgressIndicator` e o `CircularWavyProgressIndicator` ao lado dos flat, com estilo arredondado, altura de trilho variável e forma de onda. O wavy aumenta a altura do componente, pode ficar menos visível em tamanhos muito pequenos e serve a processos mais longos, quando cabe um estilo mais expressivo. Mesmo no determinado, a onda anda sozinha; `waveSpeed = 0.dp` a para.
- Compose [260]: o indicador circular deve ficar centrado no contêiner ou na página que carrega, "such as a button or card". No exemplo, o botão "Start loading" é trocado por um indicador linear enquanto carrega.
- [58], nesta etapa: o loading indicator serve também ao pull-to-refresh e cabe quando o progresso não é mensurável ou não precisa ser mostrado; a versão contida dá contraste extra sobre o conteúdo. A página não fala de botão.
- material-web [261]: `md-circular-progress` e `md-linear-progress`; `indeterminate`; `value` de 0 a `max` (padrão 1); `four-color` só no indeterminado. A página pede um `aria-label` descritivo, como "Page refresh progress" ou "Download progress". Tokens: o circular tem 48 px, traço de 8,3333% do tamanho e cor `primary`; o linear tem trilho `surface-container-highest` de 4 px. Nada sobre indicador dentro de botão.
- material-web [262]: o componente põe `role="progressbar"` fixo, o `aria-label`, `aria-valuemin="0"` e `aria-valuemax` igual ao `max`, e omite o `aria-valuenow` no indeterminado.
- `aria-busy` [207], nesta etapa: indica que o elemento está sendo modificado e que a tecnologia assistiva pode esperar o fim antes de expor as mudanças. O padrão é false, e ele vale em todos os elementos. Com true, a tecnologia assistiva pode ignorar as mudanças e tratá-las como uma atualização única quando ele volta a false. Os usos descritos são um lote de mudanças numa live region e um widget que ficaria sem os filhos obrigatórios durante a atualização.
- `progressbar` [207], nesta etapa: mostra o progresso de tarefas demoradas. O `aria-valuenow` deve existir e deve ser omitido quando o progresso é indeterminado; sem valores, o mínimo é 0 e o máximo, 100. Ao carregar uma região, o autor aponta o `aria-describedby` dela para o indicador e põe `aria-busy="true"` na região até terminar. O valor é sempre só leitura, e o nome acessível é obrigatório.
- MDN [263]: o `aria-busy` atrasa os anúncios de live regions e também sinaliza mudanças em widgets e feeds. A página não diz que o leitor de tela anuncia "ocupado" e não trata de botões.
- [151], nesta etapa: entre os exemplos de mensagem de status estão um ícone de "ocupado" que aparece depois que a pessoa aciona um processo, anunciado como "application busy", e uma barra de progresso com anúncios de tempos em tempos.
- Não encontrei orientação do M3 para progresso dentro de um botão além da frase do circular centrado no que carrega [260].

### Desabilitado e ação destrutiva

**Cores e opacidades do desabilitado.**

| Variante | Contêiner | Rótulo e ícone | Fonte |
|---|---|---|---|
| Filled | `OnSurface` a 0,1; elevação `Level0` | `OnSurfaceVariant` a 0,38 | [264] (v0_11_0) |
| Tonal | `OnSurface` a 0,12 | `OnSurface` a 0,38 | [265] (v0_103) |
| Texto | Transparente no `textButtonColors()` [267]; o arquivo de tokens tem `OnSurface` a 0,1 | `OnSurfaceVariant` a 0,38 | [266] (v0_11_0), [267] |
| Icon button filled e tonal | `OnSurface` a 0,1 | `OnSurface` a 0,38 | [254], [255] (14_1_0) |
| Icon button padrão | — | `OnSurface` a 0,38 nos tokens; no `iconButtonColors()`, o `LocalContentColor` com a mesma opacidade | [253], [246] |
| Icon button outlined | — (marcado: `OnSurface` a 0,1) | `OnSurface` a 0,38; contorno `OutlineVariant` | [256] |

- Button.kt [267]: o `buttonColors()` lê o FilledButtonTokens, e o `filledTonalButtonColors()`, o FilledTonalButtonTokens (com 0,12). O `textButtonColors()` usa contêiner transparente nos dois estados e conteúdo `Primary`, com o comentário "TODO replace with the token value once it's corrected"; o token do rótulo habilitado diz `OnSurfaceVariant` [266]. O `MinWidth` é 58 dp.
- O KDoc do Button.kt diz que o filled serve a ações importantes e finais que completam um fluxo ("Save", "Join now", "Confirm") e que o de texto serve a ações menos destacadas, inclusive em diálogos e cards [267].
- O tonal tem 40 dp de altura, `CornerFull` e ícone de 18 dp [265]. O filled como toggle: desmarcado `SurfaceContainer` com `OnSurfaceVariant`, marcado `Primary` com `OnPrimary` [264].
- Material 3 in Compose [268]: uma nota diz que, nos estados desabilitados do M3, continua aceitável usar as cores "on-x" com alpha. A página pede on-primary sobre primary, e o mesmo nos outros pares, para dar contraste.

**Ação destrutiva.** Não encontrei botão destrutivo nem orientação de ação destrutiva no M3. O Button.kt não contém "error", "destructive" nem "delete" [267]; o doc de diálogo do MDC não trata disso [231]; a página de tema do Compose não fala do papel error [268]. O mais perto é o `type="alert"` do material-web, cujo exemplo de exclusão usa dois text buttons sem cor própria [232], e a amostra de snackbar com a ação em `errorContainer` e `error` [217].

**W3C e MDN.**

- 1.4.3 [269]: o texto de um componente inativo não tem requisito de contraste. Inativo é o componente visível mas não operável no momento; os exemplos são um controle `disabled` do HTML e um botão de envio que só ativa depois dos campos obrigatórios.
- 1.4.11 [98], nesta etapa: os inativos ficam isentos porque uma solução única tem sido difícil, embora distingui-los fosse bom para algumas pessoas; a página espera, no futuro, variar a apresentação dos desabilitados pela preferência da pessoa, como com um ícone. Um controle com conteúdo visível (texto ou um ícone com contraste suficiente) dispensa borda, e num ícone de uma cor a imagem inteira é o objeto gráfico. Contornar os controles é encorajado, sem ser exigido.
- APG [270]: os navegadores tiram do Tab os inputs com `disabled`. Em alguns contextos, sobretudo dentro de widgets compostos, é melhor manter o elemento focável com `aria-disabled="true"`, porque quem usa leitor de tela descobre muito menos o que não recebe foco. Na convenção dos exemplos, o `disabled` cabe quando o estado pode ser inferido pelos vizinhos (o "Previous" na primeira página; o "Up" desabilitado no primeiro item, com o "Down" ao lado), e o `aria-disabled` quando o elemento precisa continuar descobrível (Copiar, Recortar e Colar numa toolbar; opções, itens de menu, abas e itens de árvore).
- MDN [271]: o `aria-disabled="true"` só expõe o estado. Não muda o foco, não aplica o `:disabled` nem o estilo do navegador e não bloqueia a função, que precisa de JavaScript; o `pointer-events: none` não impede o teclado. Um uso é o envio de formulário indisponível que deve ficar no Tab. Estiliza-se por `[aria-disabled="true"]`, com contraste quando o conteúdo for importante, e em `forced-colors` com `GrayText`; ao reativar, avisa-se a pessoa.
- MDN [272]: o controle com `disabled` não recebe foco nem eventos de navegação (cliques e os de foco), não vai no envio do formulário e casa com `:disabled`. O Firefox, ao contrário dos outros, mantém entre recargas o estado desabilitado dinâmico de um `<button>`, e o `autocomplete` controla isso. A página não fala de desabilitar um controle que está com o foco.
- `aria-disabled` [207], nesta etapa: marca o elemento como perceptível mas não operável e vale para ele e para os descendentes focáveis. Elementos desabilitados podem ficar fora do Tab, e o autor deve mudar também a aparência. O estado está sendo descontinuado como global, e o autor não deve usá-lo em elementos que a linguagem de base não consegue desabilitar sozinha; `button` está entre os papéis que o aceitam.
- HTML Standard [273]: a cada atualização da renderização, se a área focada não é mais focável, o navegador roda os passos de foco do viewport. Os exemplos são um elemento que ganha `hidden` e um `input` que fica desabilitado; em geral isso dispara `blur` e talvez `change`. Se o elemento focado é removido, há uma correção síncrona, sem `blur` nem `change`.
- APG [270], persistência do foco: se o elemento ativo some, como num diálogo que fecha ou num item apagado, e o foco não é gerido, o navegador leva o foco ao `body`, o que na prática é perder o foco. A página pede pôr o foco no botão que abriu o diálogo ou no item seguinte ao apagado.

### Seletor de quantidade

- Spinbutton [274]: restringe o valor a um conjunto ou faixa de valores discretos. Costuma ter três peças: um campo com o valor, um botão de aumentar e um de diminuir. O campo costuma ser o único focável, porque as setas fazem o papel dos botões, e em geral deixa editar o valor. Teclado: cima e baixo mudam o valor; Home e End vão ao mínimo e ao máximo, se existirem; Page Up e Page Down são opcionais; digitar vale se o campo for editável; o foco fica no campo. Papéis: `spinbutton` no elemento focável, `aria-valuenow`, `aria-valuemin` e `aria-valuemax` quando conhecidos, `aria-valuetext` quando o número não é amigável, nome por `aria-labelledby` (rótulo visível) ou `aria-label`, e `aria-invalid` fora da faixa.
- Exemplo de quantidade [275]: cada quantidade é um `input type="text"` com `role="spinbutton"`, e o campo e os botões aparecem como um só campo, com um único indicador de foco. Os botões têm nome pelo `title` ("Remove adult", "Add adult"), o sinal visual em `aria-hidden`, `aria-controls` para o campo e `tabindex="-1"`: ficam fora do Tab, mas acessíveis por toque e por voz. No limite, o botão ganha `aria-disabled="true"`. Um `output` (status, polite) anuncia o valor quando um botão é usado e depois se esvazia (3 s num trecho, 2000 ms na tabela). A faixa vai por `aria-valuemin` e `aria-valuemax`, sem ligar o texto de ajuda por `aria-describedby`. A animação do foco só roda sem movimento reduzido. A página avisa de falhas de suporte, sobretudo no celular e no toque, e diz que o código não é para produção.
- `spinbutton` [207], nesta etapa: uma faixa de escolhas discretas. Os filhos se limitam a um textbox e/ou dois botões, ou o papel vai no próprio input, com os botões ao lado. Achado na verificação: o foco vai ao textbox, as setas aumentam e diminuem, e os botões de aumentar e diminuir não devem entrar no Tab. O nome é obrigatório, e o `aria-valuenow` vale 0 por padrão, sem mínimo nem máximo.
- Achado na verificação: o guia de icon buttons do Compose tem um contador com dois botões de ícone ("Decrease count button" e "Increase count button") e um texto no meio; segurar um botão repete a ação a cada 100 ms. A página não trata do anúncio do valor nem do limite [245].

**Foco no limite.**

- Um botão focado que recebe `disabled` deixa de ser focável, e o navegador leva o foco ao viewport, com `blur` [273]; a APG chama o foco no `body` de perda de foco [270].
- A convenção da APG aceita o `disabled` quando o estado é inferível pelo vizinho, como o "Up" com o "Down" ao lado [270]; o exemplo de quantidade usa `aria-disabled` no limite [275].

**Leitura da verificação (inferência).** O `QuantityStepper` de hoje é um `role="group"` com dois botões e um `output` `aria-live="polite"`, e a §6 do SPEC-M diz "no limite: `disabled` real". Se o foco está no "−" quando a quantidade chega ao mínimo, o `disabled` leva o foco ao viewport [273]. A convenção da APG sobre vizinhos [270] não trata desse caso; o `aria-disabled` com o bloqueio por código [271], como no exemplo [275], evita a perda.

### Riscos da etapa 10

- **Aviso que some antes de ser lido:** o curto do Compose dura 4 s [218], e o Android estica o tempo pela configuração de acessibilidade ([225], [226]); não encontrei equivalente na web. A 2.2.1 só dispensa o toast quando a informação está em outro lugar [227].
- **"Desfazer" que expira:** o KDoc pede que snackbar com ação não expire, e mover o foco não conta como ação [219]; o Compose usa `Indefinite` com ação e recomenda o botão de fechar [217]. O comentário do guia que dá `Short` como padrão nesse caso diverge da referência ([216], [217]).
- **Aviso que cobre o foco:** uma notificação fixa que esconde inteiro o item focado falha na 2.4.11 [76]; o snackbar fica no pé, logo acima do FAB ou da barra [223].
- **Fila divergente:** o Compose enfileira todos ([217], [218]), a amostra deixa um pendente [217], e o MDC troca o anterior pelo novo [224].
- **Movimento:** a entrada do snackbar usa escala [218], e a onda do wavy anda sem parar, mesmo no determinado [260].
- **Foco perdido ao fechar:** o `<dialog>` nativo devolve o foco a quem abriu, se ele ainda estiver na página [200]; se o gatilho sumiu, o navegador leva o foco ao `body` [270]. O `dialog.ts` não guarda o gatilho [234].
- **Clique no scrim:** o diálogo do material-web fecha no clique fora, e o `<dialog>` nativo não [234]; a folha do Compose fecha no toque no scrim [239].
- **Alça sem alternativa:** no Android, a alça tem ações semânticas e alvo de 48 dp ([240], [241]); a alça é opcional [241], e a APG recomenda fortemente um botão visível de fechar [199].
- **Confirmação destrutiva com foco no botão perigoso:** a APG sugere o foco na ação menos destrutiva [199]; o `md-dialog` foca o primeiro focável quando não há `autofocus` [234].
- **Spinner sem nome:** o `progressbar` exige nome [207], e o material-web pede `aria-label` ([261], [262]); o `aria-busy` atrasa anúncios, e nenhuma fonte diz que o leitor de tela o anuncia num botão ([207], [263]).
- **Botão trocado pelo indicador:** no exemplo do Compose, o botão some e o indicador entra no lugar [260]; o elemento focado que some leva o foco ao `body` ([270], [273]).
- **Desabilitado sem contraste:** a WCAG isenta o componente inativo ([269], [98]), mas a 1.4.11 diz que distingui-lo ajudaria algumas pessoas [98]; o MDN pede contraste quando o controle com `aria-disabled` segue focável e tem conteúdo importante [271].
- **Botão que perde o foco:** desabilitar o botão focado leva o foco ao viewport [273]. Vale para o "−" e o "+" no limite e para o botão de envio que vira "carregando".
- **Desabilitado fora do Tab:** quem usa leitor de tela descobre menos o que não recebe foco [270].
- **Ícone sem nome:** todo botão só de ícone precisa de nome ([257], [259]).
- **Nome que muda com o estado:** o exemplo do Compose troca a `contentDescription` do toggle [245], e o material-web troca o `aria-label` junto com o `aria-pressed` [258]; a APG pede rótulo fixo [90].
- **Cores do toggle e do contorno divergem:** o tonal marcado é `Secondary` no Compose [255] e `secondary-container` no material-web [257]; o contorno do outlined é `OutlineVariant` no Compose [256] e `outline` no material-web [257]. A 1.4.11 aceita o ícone com contraste no lugar da borda [98].
- **Tokens de versões diferentes:** o tonal desabilitado usa 0,12 e `OnSurface` (v0_103), e o filled e o texto usam 0,1 e `OnSurfaceVariant` (v0_11_0) ([264], [265], [266]); o rótulo do text button tem um TODO no código [267].
- **Layout do snackbar em transição:** o padding vertical muda de 6 para 14 dp quando a flag nova for ligada ([219], [222]).
- **Estado vazio precoce:** "No records" mostrado durante o carregamento engana [244].
- **Spinbutton no toque:** a APG avisa de falhas de suporte no celular e no toque [275].
- **APIs experimentais:** o `ModalBottomSheet` é `@ExperimentalMaterial3Api` [239].

### Não encontrei (etapa 10)

- Snackbar no topo da tela ou alinhado ao início em telas largas ([223], [224]).
- Os milissegundos do `LENGTH_SHORT` e do `LENGTH_LONG` no doc do MDC [224]; a duração e a curva da entrada do snackbar no Compose, que vêm do esquema de movimento [218].
- Snackbar no material-web, nem em `labs` ([190], [193]).
- Equivalente web do "Time to take action" do Android ([225], [226]).
- Orientação do M3 para ação destrutiva: texto ou cor do botão de confirmar, botão em `error` ([231], [267], [268]).
- Componente ou diretriz de estado vazio no M3, no developer.android.com (fora o tile do Wear OS [242]) e no material-web; medidas de estado vazio em qualquer fonte.
- Orientação do M3 para progresso dentro de um botão, além do circular centrado no que carrega [260].
- Rolagem do texto longo no `AlertDialog` do Compose [230] e no doc do MDC [231]; o valor do scrim do diálogo no Compose [228].
- A barra do diálogo de tela cheia no Compose; o MDC só lista as peças [231].
- O valor do scrim no doc da folha do MDC [241].
- Se o leitor de tela anuncia o `aria-busy` num botão ([207], [263]).
- Página do W3C ou do MDN que diga o que acontece com o foco quando um `<button>` focado fica `disabled` ([270], [272]); a regra está no HTML Standard [273].
- Um seletor de quantidade com esse nome no M3; o mais perto é o contador do Compose [245].
- Os textos das strings `SnackbarDismiss`, `SnackbarPaneTitle`, `CloseSheet`, `BottomSheetDragHandleDescription` e `Dialog`.

### Não abriu (etapa 10)

| URL | Motivo |
|---|---|
| https://m2.material.io/design/communication/empty-states.html | Na pesquisa, devolveu só o título "Material Design" (página feita com JavaScript); usou-se a do Material 1 [243]. |
| https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/internal/BottomSheet.kt | HTTP 404 na pesquisa; o arquivo certo está fora de `internal` [240]. |
| https://api.github.com/search/code?q=BottomSheetPartialExpandDescription+repo:androidx/androidx | HTTP 401 na pesquisa; nada foi tirado dali. |
| https://developer.android.com/develop/ui/compose/quick-guides/content/create-progress-indicator | Abriu na pesquisa, mas o código está em iframes; nada dela foi usado. |
| https://raw.githubusercontent.com/material-components/material-components-android/master/docs/components/Button.md | Abriu na pesquisa; só introduz os botões e liga para o IconButton.md [259]. Nada dela foi usado. |
| https://html.spec.whatwg.org/multipage/interaction.html#focus-fixup-rule | Abriu na pesquisa; a regra não está nessa página, e sim em webappapis.html [273]. |
| MotionScheme e MotionSchemeKeyTokens.kt (valores do `FastEffects` e do `FastSpatial`) | Não abertos. |
| Strings.kt do Material 3 | Não aberto. |
| m3.material.io (snackbar, dialogs, bottom sheets, icon buttons, progress indicators, buttons) | Só funciona com JavaScript; não foi tentado. |

### Refutadas na verificação (etapa 10)

1. **A7, em parte:** "vêm do esquema de movimento (molas)". O arquivo cita só os tokens `FastEffects` e `FastSpatial` do esquema de movimento; não diz que são molas [218], e os valores não foram abertos.
2. **A12, em parte:** "14 dp de padding vertical em volta do texto". Os 14 dp só valem com a flag `isSnackbarStylingFixEnabled`, que vem `false`; no layout padrão, o texto tem 6 dp em cima e embaixo e, com duas linhas, a primeira linha de base fica a 30 dp do topo ([219], [222]). O resto (600 dp, 16 dp no início, 8 ou 0 dp no fim, 12 dp por fora, `actionOnNewLine`) ficou.
3. **A39, em parte:** "o arquivo não faz gestão de foco". O ModalBottomSheet.kt não tem código de foco, mas o KDoc do BottomSheet.kt diz que o `ModalBottomSheet` cuida sozinho da janela de diálogo, do scrim e da gestão de foco [240]. Cai junto o risco da síntese que dizia que o `ModalBottomSheet.kt` não gere o foco.
4. **Síntese (componentes e recomendação), em parte:** o snackbar "acima do FAB (16 dp)" e "com 16 px de folga". No Scaffold.kt, os 16 dp separam o FAB da barra ou da borda; o snackbar começa logo acima do FAB, e a folga vem dos 12 dp de margem da sobrecarga com `SnackbarData` ([223], [219]).
5. **Síntese (riscos), em parte:** "o `dialog.ts` não devolve o foco (A33)" como causa de foco perdido ao fechar o diálogo. O código não devolve, mas usa o `<dialog>` nativo com `showModal()`, e a H102 diz que o navegador devolve o foco a quem abriu, se ele ainda estiver na página [200]. O risco fica para o gatilho que sumiu [270].
6. **Síntese (não encontrei), em parte:** "fonte que trate a alternativa de dois botões e um número como seletor de quantidade". O guia de icon buttons do Compose tem esse desenho num contador, sem o nome de seletor de quantidade [245], e o ARIA 1.2 aceita o papel `spinbutton` no input com dois botões ao lado [207].

Ajustes de redação, sem derrubada: A4 (a amostra só diz que deixa um snackbar na fila, com o canal `CONFLATED`; não diz qual pedido fica), A21 (o toast que desliza aparece entre os desenhos de conteúdo aberto pelo usuário que passam), A33 (o foco no próprio diálogo vem do tratamento da armadilha de foco, quando não há filhos focáveis), A41 (o doc diz que os componentes modais têm voltar preditivo automático, sem descrever o fechamento pelo voltar), A60 (o nome só troca quando `aria-label` e `aria-label-selected` existem), A62 (a página diz que a onda pode ficar menos visível em tamanhos muito pequenos, não que some), A63 (no exemplo, o botão é trocado por um indicador linear) e A83 (a página diz que o spinbutton costuma ter três peças; não diz que os botões são opcionais).
