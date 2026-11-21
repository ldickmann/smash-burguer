# Pesquisa da rodada 2: Dark mode

Feita em 20/11/2026. Um pesquisador abriu as páginas e devolveu 28 afirmações, 10 padrões de página (31 exemplos), 13 seções candidatas, 10 componentes e 16 riscos. Depois, um verificador reabriu cada URL com WebFetch no mesmo dia (e, para as cores do Allta e o estado HTTP de algumas páginas, com `curl`, só leitura) e tentou derrubar cada afirmação e cada exemplo, conferindo se a página diz aquilo, se a fonte é da classe declarada e se o exemplo é publicado ou conceito. Este dossiê traz só o que sobreviveu: das 28 afirmações, 25 ficaram inteiras e 3 ficaram em parte; dos 31 exemplos, 29 ficaram; 16 trechos ou exemplos caíram (estão em "Refutadas na verificação"). O dossiê completa a seção "Dark mode" do `PESQUISA.md` (linhas 224 a 244), que tratou dos tokens e das diretrizes (Apple, Material, NN/g e web) com as fontes [45] a [52], mais [4] e [13]. Esta rodada trata da página: padrões de Home escura, seções e componentes. As fontes que já tinham número na rodada 1 mantêm o número ([4], [13], [45] a [50]); a página de cards do Compose mantém o [63] do dossiê do Material; as novas começam em [80].

## Fontes

| nº | tipo | título | URL | o que sustenta |
|---|---|---|---|---|
| [4] | autor do estilo | ColorDarkTokens.kt (androidx, Compose Material 3; rodada 1) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ColorDarkTokens.kt | O esquema escuro do M3: background e surface em N6; containers de N4 a N22; surface-bright N24; on-surface N90; outline NV60 e outline-variant NV30; primary 80, on-primary 20, primary-container 30; inverse-surface N90 com inverse-on-surface N20; scrim N0. |
| [13] | autor do estilo | Dark theme (material-components-android; rodada 1) | https://github.com/material-components/material-components-android/blob/master/docs/theming/Dark.md | Cinza-escuro em vez de preto, para as sombras aparecerem e o texto claro cansar menos; as sobreposições de elevação (primary translúcido) foram substituídas pelas superfícies tonais. Não trata de bordas, imagens nem níveis de ênfase do texto. |
| [45] | pesquisa | Dark Mode vs. Light Mode: Which Is Better? (NN/g, Raluca Budiu, 02/02/2020; rodada 1) | https://www.nngroup.com/articles/dark-mode/ | Revisão de literatura (a NN/g não fez estudo próprio): o claro rende mais com visão normal, sobretudo com fonte pequena e à noite; leitores com meios oculares turvos leram mais rápido no escuro; não usar o escuro como padrão para o público geral e usar a API do sistema. |
| [46] | pesquisa | Dark Mode: How Users Think About It and Issues to Avoid (NN/g, Kohler e Zhang, ago/2023; rodada 1) | https://www.nngroup.com/articles/dark-mode-users-issues/ | 115 usuários de celular; um terço escuro, um terço claro, um terço alterna; o escuro como ajuste do sistema; as armadilhas (imagens, sombras, scrim, fontes, cores saturadas, cards, logotipos); escuro como "bom ter"; economia só em OLED. |
| [47] | autor do estilo | HIG: Dark Mode (Apple, JSON da página; rodada 1) | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/dark-mode.json | Não criar ajuste de aparência próprio; ficar bom nos dois modos e no Automático; só escuro em casos raros (mídia imersiva); 4,5:1 mínimo e 7:1 como meta; testes com Aumentar contraste e Reduzir transparência; imagens, ícones e ilustrações; fundos base e elevado. |
| [48] | autor do estilo | Design a dark theme with Material and Figma (Google Codelabs; rodada 1) | https://codelabs.developers.google.com/codelabs/design-material-darktheme | Fundo típico `#121212`; texto branco a 87%, 60% e 38%; branco puro "vibra" e vaza; tons mais claros da primária; snackbar com superfície mais clara. Sem tabela de sobreposição por dp, sem bordas e sem imagens. |
| [49] | documentação oficial | Dark theme (Android Developers; rodada 1) | https://developer.android.com/develop/ui/views/theming/darktheme | Tema escuro desde o Android 10 (API 29); opções Claro, Escuro e Padrão do sistema, este como padrão; evitar cores e ícones fixos; armadilhas em widgets e notificações próprias. |
| [50] | referência técnica | prefers-color-scheme (web.dev, Thomas Steiner; rodada 1) | https://web.dev/articles/prefers-color-scheme | CSS por esquema com `media` no `<link>` (o que não casa é baixado com prioridade mínima); `color-scheme: light dark`; branco um pouco escurecido; `grayscale(50%)` nas fotos só no escuro; `<picture>` por esquema; SVG inline com `currentColor`; transição de 0,5 s em `color` e `background-color`. |
| [63] | documentação oficial | Cards (Jetpack Compose; número do dossiê do Material) | https://developer.android.com/develop/ui/compose/components/card | As versões filled (cor do contêiner), elevated (sombra) e outlined (borda; o exemplo usa 1 dp); o estado desabilitado. |
| [80] | pesquisa | Dark mode may not save your phone's battery life as much as you think (Purdue University, 28/07/2021) | https://www.purdue.edu/newsroom/releases/2021/Q3/dark-mode-may-not-save-your-phones-battery-life-as-much-as-you-think,-but-there-are-a-few-silver-linings.html | Comunicado da universidade sobre o estudo de Pranab Dash e Y. Charlie Hu (MobiSys 2021): Pixel 2, Moto Z3, Pixel 4 e Pixel 5, seis apps do Google; economia média de 3% a 9% com brilho de 30% a 50% e de 39% a 47% com brilho de 100%. |
| [81] | autor do estilo | HIG: Color (Apple, JSON da página) | https://developer.apple.com/tutorials/data/design/human-interface-guidelines/color.json | Fundos primário, secundário e terciário; rótulos primário a quaternário; cor reservada para ênfase; cor no fundo da ação principal; não repetir a cor com outro significado; variantes clara, escura e de contraste aumentado; cores mais apagadas sob luz forte e mais saturadas no escuro. |
| [82] | autor do estilo | StateTokens.kt (androidx, Compose Material 3) | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StateTokens.kt | Camadas de estado: hover 0,08, foco 0,1, pressionado 0,1, arrasto 0,16. |
| [83] | autor do estilo | Into the Dark (Google Design; sem autor e data na página) | https://design.google/library/material-design-dark-theme | Google Fotos em cinza-escuro, não preto; Google Notícias no mesmo cinza para o texto claro vibrar menos; Google Agenda dessatura e ajusta o brilho das cores; gradações de cinza sugerem superfície elevada; Android Auto com menos camadas elevadas. |
| [84] | documentação oficial | Dark mode toggles (Chrome, Modern Web Guidance; sem autor e data) | https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/dark-mode-toggle.md.txt | Seguir o sistema; controle de três estados (Sistema, Claro, Escuro) em configurações, ou de dois estados no cabeçalho; sempre poder voltar ao Sistema; `localStorage`, evento `storage`, script inline logo após a meta `color-scheme`, `try/catch`; ícones dos dois estados com texto oculto; mídia em duas versões alternadas no HTML. |
| [85] | referência técnica | color-scheme (web.dev, Thomas Steiner) | https://web.dev/articles/color-scheme | A meta `color-scheme` deixa pintar o fundo certo antes do CSS; a propriedade CSS só vale depois do download; `color-scheme` define a aparência padrão e `prefers-color-scheme` a estilizável; o azul de link padrão do WebKit tem 2,23:1 sobre preto. |
| [86] | referência técnica | light-dark() (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark | Devolve o primeiro valor no claro e o segundo no escuro; precisa de `color-scheme: light dark`; Baseline amplamente disponível desde maio de 2024; aceita duas cores ou duas imagens. |
| [87] | documentação oficial | Elevation (Atlassian Design System) | https://atlassian.design/foundations/elevation | No escuro, quanto mais alta a superfície, mais clara; sunken, default, raised e overlay; card plano com borda; raised e overlay mantêm sombra; borda no limite do conteúdo rolado em cabeçalhos e rodapés fixos; hover e pressionado por superfície; conferir o contraste no overlay escuro. |
| [88] | referência técnica | Technique C40: two-color focus indicator (W3C) | https://www.w3.org/WAI/WCAG21/Techniques/css/C40 | Duas cores com 9:1 entre si garantem 3:1 de uma delas contra um fundo sólido; cada faixa com 2 px ou mais; exemplo com outline clara de 2 px e box-shadow escura de 4 px; outline transparente junto do box-shadow para cores forçadas; atende 1.4.11 e 2.4.7. |
| [89] | referência técnica | forced-colors (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors | Em cores forçadas, `color`, `background-color`, `border-color`, `outline-color` e outras viram cores do sistema; `box-shadow` e `text-shadow` viram `none`; `background-image` sem `url()` vira `none`; o exemplo troca a sombra por borda. |
| [90] | referência técnica | Understanding 2.2.2 Pause, Stop, Hide (W3C) | https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide | Movimento automático com mais de 5 s, junto de outro conteúdo, precisa de meio de pausar, parar ou esconder; pausa que depende do foco não vale. |
| [91] | referência técnica | Largest Contentful Paint (web.dev, Walton e Pollard, 08/08/2019, revisto em 04/09/2025) | https://web.dev/articles/lcp | Contam `img`, `image` em SVG, pôster de vídeo, `background-image` por `url()` (gradiente não) e blocos de texto; bom é 2,5 s ou menos no percentil 75. |
| [92] | pesquisa | Carousel Usability (NN/g, Kara Pernice, 14/09/2013, revisto em 07/08/2026) | https://www.nngroup.com/articles/designing-effective-carousels/ | Sem avanço automático no celular; controles grandes, visíveis e dentro do carrossel; pontos são sinal fraco e o selecionado precisa ser óbvio; prévia do próximo quadro; cinco quadros ou menos. |
| [93] | praticante | Inclusive Dark Mode (Smashing Magazine, Alex Williams, 15/04/2025) | https://smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/ | Astigmatismo e baixa sensibilidade a contraste (remete ao boia.org); cinzas como `#121212`; fontes maiores e mais pesadas, sem fontes finas; acentos claros com parcimônia; escolha do tema lembrada. Várias recomendações sem fonte. |
| [94] | praticante | Dark Mode Can Improve Text Readability — But Not for Everyone (Bureau of Internet Accessibility, 07/07/2021) | https://www.boia.org/blog/dark-mode-can-improve-text-readability-but-not-for-everyone | Halation atribuída a um especialista de UX (H. Locke); cerca de 47% com algum astigmatismo, sem fonte; links e foco podem sumir num escuro mal feito; escuro como opção; evitar preto e branco puros. |
| [95] | praticante | From Light to Dark (Uber Engineering, Humberto Castaneda, 05/10/2023) | https://www.uber.com/ca/en/blog/from-light-to-dark-the-story-behind-dark-mode/ | No app Android do Uber para passageiros: tokens de cor que trocam sozinhos; linter que avisa sobre hex novo; imagens que se misturavam ao fundo, ajustadas por designers; ícones da barra de status quase invisíveis como exemplo de problema; a migração como "uma espécie de redesenho". |
| [96] | galeria | The Good Burger (Awwwards, menção honrosa, 05/03/2019) | https://www.awwwards.com/sites/the-good-burger | Franquia espanhola com mais de 130 restaurantes; paleta `#000`, `#ffffff` e `#ECD06F`. |
| [97] | galeria | Vicio (Awwwards, site do dia, 18/08/2023) | https://www.awwwards.com/sites/vicio | Marca de delivery especializada em smash burger; paleta clara `#EDEDED` e `#FF0000`. |
| [98] | galeria | Crav Burgers (Awwwards, site do dia, 13/06/2026) | https://www.awwwards.com/sites/crav-burgers | Conceito de pedido de hambúrguer; paleta clara `#f5e3cd` e `#f91814`. |
| [99] | galeria (site publicado) | allta (restaurante em Dublin) | https://www.allta.ie/ | Variáveis `--pageColor` e `--darkbackground` `#151515` e `--textColor` `#fef1e8` no HTML; pilha de fotos de comida e do salão; horários, endereço com mapa, e-mail, telefone; selo e links de imprensa; rodapé. |
| [100] | galeria | allta (One Page Love, 14/10/2024) | https://onepagelove.com/allta | Marcado como escuro, com Big Images, Food-images, Scrolling Text e Stacked; categoria restaurante. |
| [101] | galeria | BITE CULT (Framer Marketplace, Noel Dario Andres) | https://www.framer.com/marketplace/templates/bite-cult/ | Template: base quase preta, um acento cor de brasa, títulos em Anton; formulários de reserva e newsletter com estados; pratos por curso com títulos fixos; gaveta no celular. |
| [102] | galeria | BITE CULT (demo do template) | https://bitecult.framer.website/ | Ticker com seis fatos depois do hero; seis pratos com preço; regras, história e números; imprensa; bloco de reservas; rodapé. |
| [103] | galeria | Tomahawk (Framer Marketplace) | https://www.framer.com/community/marketplace/templates/70888/ | Template de churrascaria com os esquemas Ivory & Gold e Dark & Gold, que trocam conforme o aparelho; marquee ticker; galeria com lightbox. |
| [104] | galeria | Tomahawk (demo do template) | https://tomahawk.framer.website/ | Hero com duas ações; quatro cortes com preço; cardápio por categorias; Bar & Wine; seção de galeria; Visit com endereço fictício, mapa, telefone e horário; rodapé. |
| [105] | galeria | Velvet Hour (Framer Marketplace) | https://www.framer.com/marketplace/templates/velvet-hour/ | Template escuro e "atmosférico" de restaurante e bar, com slideshows do salão e da comida. |
| [106] | galeria | STÄCK (Contra, Karol Liwinski) | https://contra.com/p/sgF6BMkM-stack-burger-joint-website | Peça de portfólio: paleta escura, imagens de ponta a ponta, fotos "cinematográficas"; hambúrguer que se desmonta em seis camadas ao rolar; três níveis de hambúrguer com preço; formulário de reserva. |
| [107] | galeria | Smash'd (GitHub, zidvsd) | https://github.com/zidvsd/smash-d | Página de hamburgueria em estilo quadrinho (React); seções Bestsellers e Featured; tema que segue o sistema, com botão manual e View Transition API. |
| [108] | galeria | Smash & Savor (Wix Marketplace, Social Reach) | https://www.wix.com/marketplace/template/2a9ce268-f1a5-49a3-89c7-b9ba39a97644 | Template "bold, dark" de restaurante, com Testimonials entre os recursos. |

## Padrões de página

Galeria, template e mockup são só exemplo do padrão abstrato; nada foi copiado. "Recorrente" exige 3 exemplos independentes (o template e a demo do mesmo template contam como um só).

### 1. Fundo quase preto e texto claro quebrado, sem preto nem branco puros (recorrente)

Base cinza-escura ou quase preta e texto off-white. O Google sustenta o fundo cinza [13][48][83] e o texto que não é branco puro (on-surface N90 [4]; texto a 87% e o branco que "vibra" [48]); o web.dev usa um branco escurecido [50]; a Smashing também recomenda `#121212` [93]. A Apple pede 7:1 em cores próprias e não fala de branco puro [47]. A Brasa de produção já faz isso (`--color-bg: #15110e` e `--color-ink: #f5eee8` em `src/assets/styles/base/_tokens.scss`), então o traço não a diferencia.

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://www.allta.ie/ [99] | O HTML declara `--pageColor` e `--darkbackground` `#151515` e `--textColor` `#fef1e8`; a One Page Love marca o site como escuro [100]. | publicado | restaurante (Dublin) |
| https://design.google/library/material-design-dark-theme [83] | Google Fotos e Google Notícias usam cinza-escuro em vez de preto, para as fotos e o texto claro lerem melhor. | publicado (apps) | fotos e notícias, fora de comida |
| https://www.framer.com/marketplace/templates/bite-cult/ [101] | Base quase preta (a ficha não diz a cor do texto). | conceito (template) | restaurante |

Fontes: [4], [13], [47], [48], [50], [83], [93].

### 2. Um só acento quente sobre o escuro (recorrente)

Uma única cor de destaque, brasa ou dourada, sobre a base escura, reservada para a ação e a ênfase. A Apple manda reservar a cor para o que precisa de ênfase e colorir o fundo da ação principal, não o texto [81]; o codelab pede tons mais claros da primária, porque as cores saturadas vibram [48].

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://www.framer.com/marketplace/templates/bite-cult/ [101] | Base quase preta, um acento cor de brasa e títulos grandes em Anton. | conceito (template) | restaurante |
| https://www.framer.com/community/marketplace/templates/70888/ [103] | Esquemas Dark & Gold e Ivory & Gold. | conceito (template) | churrascaria |
| https://www.awwwards.com/sites/the-good-burger [96] | Paleta `#000`, `#ffffff` e `#ECD06F` registrada em 2019 (a página também liga um `#FAD15F`). O thegoodburger.com responde (200, redireciona para `/es`), mas o visual atual não foi conferido. | publicado (registro de 2019) | hamburgueria (franquia) |

Fontes: [48], [81].

### 3. Foto de comida grande como protagonista (recorrente)

Imagens grandes, de ponta a ponta, com a comida iluminada como o ponto de luz da página. Riscos: o LCP [91] e os fundos claros nas fotos [46][47].

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://contra.com/p/sgF6BMkM-stack-burger-joint-website [106] | Paleta escura, imagens de ponta a ponta e fotos "cinematográficas"; um hambúrguer fotográfico se desmonta em seis camadas ao rolar. | conceito (portfólio; a página não diz se a marca é real) | hamburgueria |
| https://onepagelove.com/allta [100] | Marcações Big Images, Food-images e Stacked; no site [99], uma pilha ("shuffle stack") de cerca de oito fotos de comida e do salão. | publicado | restaurante |
| https://www.framer.com/marketplace/templates/velvet-hour/ [105] | Estética escura e "moody", com slideshows do salão, da pedra e da comida. | conceito (template) | restaurante e bar |

Fontes: [46], [47], [91].

### 4. Faixa de texto corrido, o ticker (recorrente)

Uma tira que passa fatos curtos da casa, logo depois do hero. Exige meio de pausar (2.2.2 [90]); no projeto, só `transform` e só dentro de `motion-ok`.

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://bitecult.framer.website/ [102] | Depois do hero, um ticker repete seis fatos (sem cardápio impresso, só fogo, quarenta lugares, vinho natural, aberto até tarde, entrada sem reserva depois das 22h). | conceito (demo de template) | restaurante |
| https://www.framer.com/community/marketplace/templates/70888/ [103] | A ficha do Tomahawk lista um marquee ticker entre os recursos (a leitura da demo [104] não o mostrou). | conceito (template) | churrascaria |
| https://onepagelove.com/allta [100] | A One Page Love marca o Allta com Scrolling Text (a leitura estática do site [99] não mostrou o texto corrido). | publicado | restaurante |

Fontes: [90].

### 5. Destaques do cardápio com preço (recorrente, todos conceito)

Uma grade curta de pratos-assinatura com nome e preço e um link para o cardápio completo. Não achei um exemplo publicado que tenha aberto.

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://bitecult.framer.website/ [102] | Seis pratos com preço e o botão "Full menu"; cada card também leva ao cardápio. | conceito (demo de template) | restaurante |
| https://tomahawk.framer.website/ [104] | Quatro cortes-assinatura com preço, seguidos do cardápio completo dividido por categorias. | conceito (demo de template) | churrascaria |
| https://contra.com/p/sgF6BMkM-stack-burger-joint-website [106] | Três níveis de hambúrguer com preço. | conceito (portfólio) | hamburgueria |

Fontes: [92] (se for carrossel).

### 6. Bloco de visita: horário, endereço com mapa e contato (recorrente)

Uma seção perto do fim com os dias e o horário, o endereço com link de mapa e o telefone ou e-mail, quase sempre com a ação de reservar.

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://tomahawk.framer.website/ [104] | Seção Visit com endereço fictício ligado a uma busca no Google Maps, telefone de reserva, horário e os links de rota e de ligar. | conceito (demo de template) | churrascaria |
| https://www.allta.ie/ [99] | Horários do bar e do restaurante, endereço com link de mapa, e-mail, telefone e botão de reserva. | publicado | restaurante |
| https://bitecult.framer.website/ [102] | Bloco de reservas com os dias de funcionamento (terça a sábado) e os botões de reservar e de ver o cardápio. | conceito (demo de template) | restaurante |

Fontes: os exemplos; para os links no escuro, [85] e [94].

### 7. Superfícies em tons: mais alto é mais claro (recorrente, sistemas publicados)

Hierarquia pelo tom da superfície, não pela sombra: base mais escura, cards e diálogos mais claros. Confirma a pista das superfícies tonais do M3 escuro [4][13]. A Brasa de produção já tem quatro níveis de superfície (`--color-surface-1` a `--color-surface-4`, de `#1c1713` a `#3a302a`).

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://atlassian.design/foundations/elevation [87] | Sunken, default, raised e overlay, cada vez mais claros no escuro; o card plano ganha borda; raised e overlay mantêm sombra. | publicado (sistema de design em uso) | software de trabalho, fora de comida |
| https://design.google/library/material-design-dark-theme [83] | Gradações de cinza dão a impressão de superfície elevada nos apps do Google. | publicado (apps) | apps do Google, fora de comida |
| https://developer.apple.com/tutorials/data/design/human-interface-guidelines/dark-mode.json [47] | No iOS, o fundo base recua e o elevado, mais claro, avança em popover e folha modal. | publicado (sistema operacional) | sistema operacional, fora de comida |

Fontes: [4], [13], [47], [81], [83], [87].

### 8. Seguir o tema do sistema, com troca opcional (2 exemplos, não recorrente)

A página adota o claro ou o escuro conforme o aparelho e, às vezes, oferece um botão. Só dois exemplos, ambos conceito; a pesquisa [45][46] e a documentação [47][49][84] recomendam seguir o sistema.

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://www.framer.com/community/marketplace/templates/70888/ [103] | Os esquemas trocam sozinhos para combinar com o aparelho de cada visitante. | conceito (template) | churrascaria |
| https://github.com/zidvsd/smash-d [107] | Segue a preferência do sistema, tem botão manual e anima a troca com a View Transition API (a demo só abriu o título). | conceito (projeto pessoal) | hamburgueria |

Fontes: [45], [46], [47], [49], [84].

### 9. Rodapé escuro que repete navegação, redes e contato (recorrente)

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://bitecult.framer.website/ [102] | Navegação repetida, Instagram, Substack, e-mail e crédito do autor. | conceito (demo de template) | restaurante |
| https://tomahawk.framer.website/ [104] | Links de navegação, telefone, endereço e créditos. | conceito (demo de template) | churrascaria |
| https://www.allta.ie/ [99] | Instagram, e-mail de reservas e copyright. | publicado | restaurante |

Fontes: os exemplos.

### 10. Prova social: imprensa e depoimentos (recorrente, não viável aqui)

Citação de crítico, links de imprensa, selo de prêmio ou depoimentos. O inventário não tem avaliações, depoimentos, prêmios nem imprensa: usar seria inventar.

| exemplo | o que se vê | publicado ou conceito | domínio |
|---|---|---|---|
| https://bitecult.framer.website/ [102] | Bloco "Written about in" com a citação atribuída a uma crítica de jornal (conteúdo de demo). | conceito (demo de template) | restaurante |
| https://www.allta.ie/ [99] | Selo de primeiro restaurante da Irlanda em 2026 no topo e links para resenhas e guias. | publicado | restaurante |
| https://www.wix.com/marketplace/template/2a9ce268-f1a5-49a3-89c7-b9ba39a97644 [108] | Template "bold, dark" com Testimonials entre os recursos. | conceito (template) | restaurante (o nome sugere hamburgueria) |

Fontes: os exemplos.

## Catálogo de seções candidatas

Os textos da loja estão em `src/direcoes/compartilhado/dados.js` (o inventário fala em `conteudo.js`, que não existe na worktree). Fotos de produto: WebP em 480, 960 e 1440 e JPG só em 960.

| seção | o que faz | origem | conteúdo real exigido (arquivo e campo) | viável sem inventar? |
|---|---|---|---|---|
| Barra de navegação escura e fixa | A marca, os links e o carrinho com a contagem; no topo, na cor da base; ao rolar, uma borda marca o limite do conteúdo; no celular, gaveta. | [87] (borda em cabeçalho fixo com conteúdo rolado), [101] (gaveta no celular), [102] (navegação repetida no rodapé) | `dados.js`: `MARCA`; navegação do inventário: Início, Cardápio, Entrar ou Perfil, carrinho com a contagem. | sim |
| Hero de foto escura com um acento | Foto ou recorte do lanche sobre o escuro, título grande, uma linha de apoio e uma única ação na cor de acento. O Tomahawk tem duas ações (cardápio e reserva); aqui só existe uma. | [104], [106], [102] | `dados.js`: hero `titulo` "Smash na chapa, entregue quente", texto com o horário e `acao` "Ver cardápio". Imagem: `public/images/fundos/banner-burger-bg` (WebP com alfa 480 e 960, PNG 960), `banner-burger-black` ou `foods/smash-burger` (fundo escuro, tábua de madeira clara embaixo). | sim |
| Faixa corrida de fatos da casa | Uma tira logo depois do hero, com botão de pausa e parada com movimento reduzido. Só frases que já existem: os fatos dos exemplos (lugares, fogo, vinho) não existem aqui. | [102], [103], [100]; [90] | `dados.js`: `HORARIO`, `ENDERECO`, `FRASE_CARDAPIO`; `src/json/products.json`: `menuItems.foods[].name`; rótulos de `src/views/MenuView.vue`. | sim |
| Mais pedidos: destaques com preço | Cards em superfície tonal com foto, nome, preço e "Adicionar" preenchido, que abre o modal Personalizar. Grade ou carrossel; no carrossel, sem avanço automático, setas grandes e prévia do próximo card. | [102], [104], [106], [107] (seção Bestsellers), [92] | `products.json`, `menuItems.foods` (7): `name`, `description`, `price` (via `formatPrice`), `image`. `dados.js`: `SECAO` ("Mais pedidos", "Anterior", "Próximo"). | sim |
| Cardápio por categoria | Hambúrgueres, Bebidas e Sobremesas, com a contagem e o menor preço como "a partir de", levando ao `/menu` real. | [101] (pratos por curso, títulos de categoria fixos), [104] (cardápio por categorias), [107] (categorias e filtro) | Rótulos de `MenuView.vue`; contagem por categoria (hoje 7, 3 e 1) e menor preço, sempre calculados de `products.json`. | sim |
| Bebidas e sobremesas | O equivalente ao bloco "Bar & Wine": as bebidas, a sobremesa e os adicionais de sobremesa. | [104] | `menuItems.drinks` (3), `menuItems.desserts` (1), `dessertAdditionals` (7, com `price`). As fotos `suco-abacaxi` (bancada cinza-clara) e `copo-refrigerante` (fundo claro desfocado) têm áreas claras. | sim |
| Ingredientes e adicionais | As camadas de um lanche pelos ingredientes reais e os adicionais com preço. O STÄCK mostra a procedência de cada camada; isso não existe aqui. | [106] | `menuItems.foods[].ingredients`, `foodAdditionals` (5, com `price`) e o número de adicionais (calculado). | sim, sem procedência |
| Visite: horário, endereço e contato | Horário, endereço com link do Google Maps, WhatsApp e e-mail, com links de cor própria e sublinhados. Sem reserva: é delivery. | [104], [99], [102]; [85], [94] | `dados.js`: `HORARIO`, `ENDERECO` (link do Maps), `TELEFONE` (WhatsApp) e `EMAIL`. | sim |
| Rodapé escuro | Navegação, redes, contatos e crédito; a `AssinaturaEncaixe` (tom escuro) vem logo depois, pela regra do projeto. | [102], [104], [99] | `dados.js`: descrição, redes Facebook e Instagram (links genéricos), contatos e `copyright`. | sim |
| História, regras e números | Regras da casa, história e números (lugares, cozinheiros). | [102] (três regras, história, 40 lugares, 9 cozinheiros), [104] (história sem números) | Exigiria história, equipe e números, que estão na lista do que não existe. | não |
| Imprensa e depoimentos | Citação de crítico, links de imprensa, selo ou depoimentos. | [102], [99], [108] | Exigiria avaliações, depoimentos, prêmios e imprensa, que não existem. | não |
| Galeria do salão e da cozinha | Slideshow ou galeria do ambiente. | [105], [104] (título de galeria; as fotos não apareceram na leitura) | Exigiria fotos do local ou da equipe, que não existem; só com as 11 fotos de produto, repetiria os destaques. | não |
| Reserva e newsletter | Formulário de reserva ou de newsletter, com estados de envio, sucesso e erro. | [101], [106] | Não há reserva nem newsletter no app; o fluxo real é carrinho e pedido. | não |

## Componentes típicos e estados

- **Botão preenchido da ação principal ("Ver cardápio", "Adicionar"):**
  - repouso: fundo primary 80 e texto on-primary 20 [4]; a cor vai no fundo, não no texto [81];
  - hover: camada de estado 0,08 [82] (no projeto, só com `hover-capable`);
  - foco visível: camada 0,1 [82] e anel em duas cores com 9:1 entre si, 2 px cada [88];
  - pressionado: camada 0,1 [82];
  - desabilitado: texto a 38% [48]; para o contêiner, não encontrei valor numa fonte aberta;
  - cores forçadas: o `box-shadow` vira `none` [89]; usar a outline transparente junto [88] ou uma borda, como no exemplo da MDN [89].
- **Card de produto:**
  - repouso: superfície tonal (surface-container N12 ou high N17) sobre a base N6 [4], sem depender de sombra [13][46];
  - card plano: borda [87]; o Compose tem as versões filled, elevated e outlined [63];
  - hover e pressionado: tokens próprios da superfície [87]; camadas 0,08 e 0,1 [82];
  - foco visível no botão "Adicionar" ou no card inteiro, com o anel em duas cores [88];
  - foto: sem fundo branco aparente; escurecer de leve as fotos com áreas claras [47] ou usar formatos com transparência [46];
  - cores forçadas: a borda continua e a sombra some [89].
- **Seletor de tema (se houver):**
  - três estados em configurações (Sistema, Claro, Escuro), com o Sistema mostrando o valor atual, ou dois estados no cabeçalho (Sistema e o oposto do atual) [84];
  - voltar ao Sistema sempre possível; escolha no `localStorage`, apagada ao voltar ao Sistema, sincronizada pelo evento `storage` e aplicada por script inline logo após a meta [84];
  - ícones dos dois estados no HTML, com texto oculto da ação [84];
  - tensão: a Apple pede para não criar ajuste próprio [47], e o Chrome diz que a maioria dos sites não precisa de botão fixo [84].
- **Barra de navegação fixa:** no topo, na cor da base; rolada, com borda inferior que marca o limite do conteúdo [87]; foco visível em cada link [88]; badge do carrinho com a contagem; no celular, gaveta [101].
- **Carrossel "Mais pedidos":** setas grandes, visíveis e dentro do carrossel; foco visível nas setas; sem avanço automático; prévia do próximo card; indicador de posição óbvio, se houver [92].
- **Faixa corrida (ticker):** rodando só com `motion-ok`; pausada por botão, sem depender de foco [90]; parada e legível com movimento reduzido (regra do projeto).
- **Aviso (AppToast):** superfície inversa clara (inverse-surface N90 com texto N20) [4], como o snackbar de superfície mais clara do codelab [48]; entrada e saída só com `opacity` e `transform` dentro de `motion-ok` (regra do projeto).
- **Diálogo Personalizar (BaseDialog):** fundo elevado, mais claro que a página [47]; o scrim (N0 no M3 [4]) quase some sobre o escuro [46], então a separação vem do tom do diálogo; conferir o contraste do conteúdo no overlay escuro [87].
- **Link de texto (endereço, WhatsApp, e-mail, redes):** cor própria, nunca o azul padrão, que tem 2,23:1 sobre preto [85]; distinto do texto, porque num escuro mal feito os links se confundem [94] (o sublinhado é inferência do verificador); foco visível [88].
- **Abas de categoria (CategoryTabs):** selecionada, não selecionada, hover (0,08) e foco (0,1 e anel) [82][88]; título de categoria fixo ao rolar, como no Bite Cult [101].

## Riscos de acessibilidade e desempenho

- **Só escuro prejudica a leitura:** com visão normal, o claro rende mais, sobretudo com fonte pequena e à noite; a recomendação é não usar o escuro como padrão para o público geral e deixar a pessoa escolher [45]. A Brasa de produção já é só escura (`color-scheme: dark` em `src/assets/styles/base/_reset.scss`), então uma evolução "só escura" herda o risco.
- **Só escuro é exceção:** a Apple diz "In rare cases, consider using only a dark appearance in the interface" e cita a mídia imersiva [47]; a NN/g diz que fazer o escuro primeiro "is an aesthetic choice; it does not improve usability" [46]. A Apple também pede cores clara e escura mesmo em app de um modo só, pela adaptação do Liquid Glass [81].
- **Halation e astigmatismo:** texto claro sobre fundo muito escuro pode borrar para quem tem astigmatismo [93][94]. A evidência aberta é só de praticantes; o número de 47% do boia.org não tem fonte [94]. Mitigação citada: evitar preto e branco puros e oferecer a escolha [94].
- **Pesos e cores:** fontes finas são "engolidas" e as negritas vazam; cores muito saturadas ficam pouco visíveis e parecem borrar [46]; o codelab pede tons mais claros da primária [48]. Pesos leves no corpo e acento saturado são arriscados.
- **Cards, sombras e scrim somem:** divisores finos e cards com contorno somem, a sombra escura sobre o escuro parece brilho e o scrim de modal quase desaparece [46]. Separar por tom de superfície [87][4] e usar borda no card plano [87].
- **Fotos com áreas claras brilham:** a Apple manda escurecer um pouco a imagem com fundo branco [47]; a NN/g, usar formatos com transparência [46]. No inventário, `suco-abacaxi` (bancada cinza-clara), `copo-refrigerante` (fundo claro desfocado) e `batata-frita` (papel branco) têm áreas claras; `smash-burger` tem fundo escuro. Observação feita olhando os JPG de 960 em `public/images`, sem medição; as outras fotos não foram conferidas.
- **Foco que some:** o foco pode sumir no escuro [94], e o `box-shadow` some em cores forçadas [89]: anel em duas cores com 9:1 entre si e outline transparente como reserva [88].
- **Links sem contraste:** o azul padrão do WebKit tem 2,23:1 sobre preto [85], e num escuro mal feito os links se confundem com o texto [94]: endereço, WhatsApp e e-mail precisam de cor própria.
- **Aumentar contraste:** no escuro, pode reduzir o contraste entre texto escuro e fundo escuro; testar com Aumentar contraste e Reduzir transparência, separados e juntos [47], e prever variantes de contraste aumentado [81].
- **Ticker:** uma faixa corrida que passe de 5 s sem meio de pausa falha o 2.2.2, e a pausa que só vale com foco não conta [90]. O projeto ainda limita a animação a `transform` e `opacity`, dentro de `motion-ok`.
- **Desempenho, troca de tema:** sem a meta `color-scheme`, o fundo só acerta depois do CSS [85]; sem o script inline logo após a meta, a página pode piscar no tema errado [84].
- **Desempenho, recursos duplicados:** CSS separado por esquema faz o arquivo que não casa ser baixado mesmo assim, com prioridade mínima [50]; a mídia por esquema no HTML pede as duas versões como elementos separados [84]. Que isso baixe imagens a mais é inferência, sem medição.
- **Desempenho, LCP:** um hero de foto tende a ser o elemento do LCP (`img` e `background-image` por `url()` contam); a meta é 2,5 s ou menos no percentil 75 [91].
- **Bateria não é argumento:** a economia só existe em OLED [46] e fica em 3% a 9% com brilho de 30% a 50% [80]; telas cheias de foto e vídeo têm o menor potencial de economia [46]. A NN/g cita o mesmo estudo com números diferentes do comunicado (67% com brilho de 100% e 14% com 30%) [46][80].
- **Transição de tema:** o web.dev anima `color` e `background-color` em 0,5 s na troca [50], o que conflita com a regra do projeto (só `transform` e `opacity`). A troca deve ser instantânea ou usar outro recurso.
- **Carrossel longo:** os 7 lanches passam dos cinco quadros que a NN/g recomenda, e os pontos de paginação são sinal fraco [92].

## Não encontrei

- App ou site de delivery de comida com modo escuro documentado que tenha aberto: o post da DoorDash deu 403; para o Uber Eats, nada (o post aberto é do app de passageiros [95]); do iFood, nenhum anúncio de tema escuro geral.
- Restaurante escuro publicado, com cor conferida, além do Allta [99]. Os outros exemplos escuros são templates ou portfólio (Bite Cult, Tomahawk, Velvet Hour, STÄCK, Smash & Savor, Smash'd), e o The Good Burger só tem a paleta de 2019 [96].
- Hamburgueria premiada escura além do The Good Burger: das três fichas reabertas no Awwwards, só ela é escura; Vicio, uma marca real de delivery de smash burger [97], e Crav Burgers, um conceito [98], têm paletas claras.
- Estudo revisado por pares sobre halation e astigmatismo: só fontes de praticantes [93][94].
- A tabela de sobreposição por dp do Material 2 (o codelab não a traz [48]) e o valor de desabilitado do contêiner de botão no M3.
- Orientação para a web na HIG de Dark Mode [47]; bordas, imagens e níveis de ênfase do texto no Dark.md [13].
- Pesquisa sobre o efeito do fundo escuro na percepção de comida ou na conversão.
- Exemplo publicado de "seguir o tema do sistema" num site de comida (o Services Australia, que não é de comida, não abriu).

## Não abriu

| URL | motivo |
|---|---|
| https://careersatdoordash.com/?p=3895 | HTTP 403 (pesquisador); post da DoorDash sobre o modo escuro do app do entregador, não citado. |
| https://careers.doordash.com/?p=3895 | HTTP 403 (pesquisador; mesmo post). |
| https://eng.uber.com/blog/from-light-to-dark-the-story-behind-dark-mode/ | HTTP 404 (pesquisador); a mesma matéria foi lida em uber.com/ca/en/blog [95]. |
| https://www.framer.com/marketplace/templates/69787/ | Smash & Greens: template indisponível (pesquisador); não usado. |
| https://www.servicesaustralia.gov.au/dark-mode-services-australia-website | Tempo esgotado duas vezes (pesquisador). |
| https://dgrees.studio/en/works/the-good-burger/ | HTTP 403 (pesquisador). |
| https://www.awwwards.com/websites/food-drink/%23000000/ | HTTP 404 (pesquisador). |
| https://onepagelove.com/tag/dark | HTTP 404 (pesquisador). |
| https://www.thegoodburger.com/ | Responde 200 e redireciona para `/es` (conferido pelo verificador), mas o HTML não traz cores legíveis; o visual atual não foi conferido. |
| https://www.blacktap.com/, https://meatliquor.com/, https://www.bleecker.co.uk/, https://www.burgerandlobster.com/, https://www.honestburgers.co.uk/ | Abriram sem cores legíveis no HTML (pesquisador); não usados. |
| https://www.ganasdevicio.com/ | Abriu sem cores legíveis no HTML (pesquisador); a ficha do Awwwards [97] dá a paleta clara. |
| https://smashburger.com/ | Só a meta `theme-color` `#090909`, que não prova página escura (pesquisador); não usado. |
| https://smash-d.vercel.app/ | Só o título (verificador; app em JavaScript). |
| https://www.awwwards.com/sites/deleito, https://www.awwwards.com/sites/deleito-burger, https://www.awwwards.com/sites/the-one-burger | HTTP 404 (verificador), na tentativa de reabrir as fichas do Deleito e do The One. |
| https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark | Abriu [86], mas só os primeiros 100 mil caracteres foram lidos; a tabela de compatibilidade por navegador ficou de fora. |

## Refutadas na verificação

- **A3, "pequenas diferenças de cor separam as seções":** a NN/g fala em diferenciar o card do fundo por uma leve mudança de cor, não as seções.
- **A21, "a borda é a reserva recomendada":** a MDN usa a borda no lugar da sombra só no exemplo e não a enuncia como regra geral; ainda pede que cores forçadas não virem um design à parte.
- **A27, ícones da barra de status "pediram decisão de design" e migração como "redesenho parcial":** a matéria só cita os ícones quase invisíveis como exemplo de problema, sem descrever a decisão, e chama a migração de "uma espécie de redesenho", sem "parcial".
- **A28, paletas do Deleito (`#2B7BDF`/`#F2F2F2`) e do The One (`#EE3205`/`#EFEFEF`):** vieram sem URL; as fichas prováveis do Awwwards deram 404, e `/sites/the-one` é a página de um cartão de crédito búlgaro. Com isso, "o escuro é minoria entre cinco" virou "um de três reabertos".
- **Q-Burger (Brasil, 2014) como escuro na One Page Love:** veio sem URL e não foi reaberto.
- **STÄCK como "marca fictícia":** a página não diz se a marca é real ou conceito; ficou "peça de portfólio".
- **Allta com "faixa rotativa de fotos":** a leitura mostra uma pilha de fotos ("shuffle stack") e a One Page Love marca Stacked; não há confirmação de que gire.
- **Tomahawk (demo) como exemplo de foto grande, "galeria de fotos da grelha e do salão":** a seção existe com título, mas as fotos não apareceram na leitura; o exemplo saiu do padrão 3.
- **Tomahawk (demo), "cardápio completo em abas":** a página mostra rótulos de categoria, mas não confirma que sejam abas; ficou "dividido por categorias".
- **Smash'd como exemplo de "destaques do cardápio com preço":** o README cita Bestsellers e Featured, mas não mostra preço, e a demo só abriu o título; o exemplo saiu do padrão 5.
- **Hero, "os exemplos têm duas ações (cardápio e reserva)":** só o Tomahawk tem as duas; o hero do Bite Cult traz o slogan e um convite para rolar, e o do STÄCK não foi descrito.
- **Card, "outline-variant NV30 é decorativa; só a outline NV60 tem função de borda":** o `ColorDarkTokens.kt` só atribui os tons; o papel de cada um não está em nenhuma página aberta.
- **Card, "hover: superfície um tom acima":** a Atlassian tem tokens de hover e pressionado por superfície, mas não diz "um tom acima".
- **Risco das fotos, "a maioria tem fundo escuro ou madeira (smash-burger, coca-cola-lata, sorvete-pote, x-salada, veggie-burger)":** o verificador conferiu só a `smash-burger`; as outras ficaram fora da afirmação.
- **Mais pedidos, "fotos 480/960/1440 em WebP e JPG":** em `public/images`, o JPG só existe em 960; o WebP tem as três larguras.
- **Conteúdo real em `src/direcoes/compartilhado/conteudo.js`:** o arquivo não existe na worktree; os textos estão em `src/direcoes/compartilhado/dados.js`.
