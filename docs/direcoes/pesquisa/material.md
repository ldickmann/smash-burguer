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
