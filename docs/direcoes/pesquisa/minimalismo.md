# Pesquisa da rodada 2: Minimalismo

Pesquisa feita em 20/11/2026 para a Home nova do minimalismo. Um pesquisador levantou 37 afirmações, 6 padrões de página e um catálogo de seções. Depois, um verificador reabriu cada URL com WebFetch e tentou derrubar cada afirmação e cada exemplo. Este dossiê guarda só o que sobreviveu, e as correções e o que caiu estão em "Refutadas na verificação". Das 37 afirmações, todas se mantêm no essencial, mas caíram 4 trechos delas e 9 itens de padrão, exemplo, seção ou componente: 37 confirmadas contra 13 derrubadas, ou 74%. O dossiê continua a seção "Minimalismo" da rodada 1 (`docs/direcoes/PESQUISA.md`, linhas 204 a 223), que usou as fontes [M1] a [M16]. As fontes [M1], [M2], [M3], [M7], [M8] e [M9] da rodada 1 foram reabertas e mantêm o número. As páginas do W3C ganharam número novo, porque a rodada 1 não diz qual das [M10] a [M16] cabe a cada endereço. A numeração nova começa em [M17]. Como na rodada 1, galeria, template e site de exemplo servem só para ilustrar um padrão abstrato. Nenhuma imagem, ícone ou layout foi baixado nem copiado, e nada visual (cor, tamanho de fonte, espaço) foi conferido, porque o fetch lê só o texto e a marcação. Os textos da loja citados no catálogo estão em `src/direcoes/compartilhado/dados.js`, que na árvore de trabalho atual substitui o `conteudo.js` citado no inventário.

## Fontes

| nº | tipo | título | URL | o que sustenta |
|---|---|---|---|---|
| [M1] | pesquisa | The Characteristics of Minimalism in Web Design (NN/g, Kate Moran, 12/07/2015), rodada 1, reaberta | https://www.nngroup.com/articles/characteristics-minimalism/ | Análise de 112 sites minimalistas, indicados por um especialista ou por uma galeria. Na cor, 49% (55 sites) eram monocromáticos, 51 deles em cinza, e 46% (52) usavam uma ou duas cores de destaque sobre base monocromática. A imagem ou vídeo grande de fundo apareceu em 57% e o grid em 43%. Recomendações: pesar o espaço negativo na hierarquia, na dobra, no custo de interação e no layout entre resoluções. Imagem de fundo só com propósito, testando a legibilidade sobre cada imagem ou quadro, com carregamento adaptado aos dados móveis e sem vídeo automático. O grid organiza conteúdo uniforme e ajuda o responsivo, mas não é essencial. Na tipografia, destacar só o texto que importa: texto em imagem pesa e prejudica a acessibilidade, e a tipografia rebuscada parece anúncio. A cor de destaque vai, de forma deliberada e consistente, na informação-chave e nas ações principais, com contraste para baixa visão e daltonismo. O botão vazado pode ficar ilegível e quebra a convenção de botão, e o hover ajuda a sinalizar o clique. Esconder a navegação no desktop sinaliza minimalismo excessivo. |
| [M2] | pesquisa | The Roots of Minimalism in Web Design (NN/g, Kate Moran, 28/06/2015), rodada 1, reaberta | https://www.nngroup.com/articles/roots-minimalism-web-design/ | Liga o minimalismo web à Bauhaus, ao "menos é mais" de Mies, a Rams (o rádio RT 20 da Braun, de 1961, aparece numa legenda) e à razão dado–tinta de Tufte (1983). Essa razão vira a razão conteúdo–elemento da interface. Müller-Brockmann só aparece numa lista. Não trata do Estilo Tipográfico Internacional, do grid, da assimetria nem da fonte sem serifa. Avisa que o minimalismo rígido baixa demais a densidade de informação e prejudica a encontrabilidade. |
| [M3] | pesquisa | Aesthetic and Minimalist Design (NN/g, Therese Fessenden, 24/01/2021), rodada 1, reaberta | https://www.nngroup.com/articles/aesthetic-minimalist-design/ | A heurística 8 não se refere à moda do minimalismo. O visual minimalista não a cumpre por si só e muitas vezes tira o necessário. Exemplo negativo: a Home do HelloBar, minimalista no visual, quase não diz o que a empresa faz. Exemplo positivo: o modo zen de um app de contagem regressiva mostra só o tempo restante no repouso e todos os controles no hover. |
| [M7] | autor do estilo | Dieter Rams: ten principles for good design (Vitsœ), rodada 1, reaberta | https://www.vitsoe.com/us/about/good-design | Os dez princípios. Entre eles estão: útil; compreensível (no melhor caso, se explica sozinho); discreto (neutro e contido, para deixar espaço à expressão do usuário); honesto (não promete o que não cumpre); minucioso até o último detalhe; e o mínimo de design possível, resumido em "Less, but better". A página conta que, no fim dos anos 1970, Rams passou a se perguntar se o seu design era bom, e a resposta são os princípios. Não traz data de publicação. |
| [M8] | pesquisa | How to Make Navigation (Even a Hamburger) Discoverable on Mobile (NN/g, Kara Pernice e Raluca Budiu, 24/07/2016), rodada 1, reaberta | https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/ | Foram 179 usuários em seis sites. No celular, o maior uso (89%) foi o do Supermarket HQ, com um botão visível no topo e a navegação repetida em ícones no fim da página. O menor (44%, com 33 s até o primeiro uso) foi o do Bloomberg, com o ícone colado ao logotipo. Recomenda navegação visível quando há só 4 ou 5 opções de primeiro nível, ou uma combinação de opções expostas e recolhidas, com área maior e talvez fixa. Se a navegação for escondida, o menu deve ser forte, separado do logotipo, com sinal de toque e rótulo legível de alto contraste. |
| [M9] | pesquisa | Carousel Usability (NN/g, Kara Pernice, 14/09/2013, revisto em 07/08/2026), rodada 1, reaberta | https://www.nngroup.com/articles/designing-effective-carousels/ | Cinco quadros ou menos. Os controles ficam dentro do carrossel, grandes e com contraste. Os pontos são sinal fraco, sobretudo no celular. Mostrar quantos quadros há e qual está ativo, deixar à vista uma fatia do próximo e não avançar sozinho no celular. Uma imagem estática forte no hero pode funcionar melhor, e a mensagem-chave de um quadro deve aparecer também em outro lugar da página. |
| [M17] | pesquisa | Scrolling and Attention (NN/g, Therese Fessenden, 15/04/2018) | https://www.nngroup.com/articles/scrolling-and-attention/ | Eyetracking com 120 participantes e mais de 130 mil fixações, numa tela de 1920×1080. Cerca de 57% do tempo ficou acima da dobra e 74% nas duas primeiras telas. Recomenda pôr o conteúdo prioritário e as chamadas principais no alto e evitar o fundo falso com sinais de que há mais conteúdo abaixo. Liga o design minimalista à ilusão de página completa e diz que as páginas tendem a ficar esparsas demais. |
| [M18] | pesquisa | Top 10 Guidelines for Homepage Usability (NN/g, Jakob Nielsen, 11/05/2002) | https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/ | São diretrizes, e o texto cita estudos só de passagem. Pede um slogan de uma frase que diga o que o site faz e pontos de partida claros para as 1 a 4 tarefas principais. Pede também exemplos de conteúdo real em vez de descrições, porque o específico vence o abstrato. Não se deve enfeitar o conteúdo-chave com gráfico pesado, que o usuário toma por anúncio, e as imagens devem ter significado, não ser decoração. |
| [M19] | pesquisa | 3 High-Level UX Takeaways from 1100+ Hours of Testing Leading Food Delivery and Takeout Sites (Baymard, Edward Scott, 29/03/2022) | https://baymard.com/research-articles/food-delivery-takeout-launch | Mais de 90 sessões qualitativas, moderadas a distância e com think-aloud, em sites e apps de restaurante (Starbucks, Chipotle, Domino's, Panera) e em plataformas (DoorDash, Uber Eats). Saíram mais de 600 problemas médios a graves e mais de 320 diretrizes, que ficam no acesso Premium. Casos abertos: no site móvel da Panera, um usuário teve dificuldade de chegar ao cardápio porque o banner de instalar o app ocupava a tela. Na Domino's, o Voltar apagou o pedido do carrinho. No DoorDash móvel, não dava para editar a personalização de um item já no carrinho. |
| [M20] | imprensa | Diners spend more when menus don't use dollar signs (Cornell Chronicle, Susan S. Lang, 09/12/2009) | https://news.cornell.edu/node/273666 | É uma notícia sobre o estudo de Yang, Kimes (Cornell) e Sessarego (Culinary Institute of America), publicado em 2009 no International Journal of Hospitality Management. Os 201 clientes de um restaurante "upscale casual" (o estudo fala de um café do CIA) receberam um de três cardápios: numeral com cifrão, numeral sem cifrão ou preço por extenso. Sem o cifrão, gastaram cerca de US$ 5,55 a mais (perto de 8%), e o preço por extenso não diferiu do cifrão. A explicação sugerida é a "dor de pagar". É um restaurante com serviço à mesa, não delivery. |
| [M21] | praticante | Using Grids in Interface Designs (NN/g, Kelley Gordon, 17/07/2022) | https://www.nngroup.com/articles/using-grids-in-interface-designs/ | Há o grid de colunas, o modular (com linhas que se repetem, para listas de produto) e o hierárquico (o item mais importante sempre ganha mais espaço). Sugere 12 colunas no desktop e cerca de 4 no celular, conteúdo dentro das colunas e nunca nas calhas, e grid de 8 px. Quebrar o grid só com motivo, porque a quebra deixa a navegação caótica. É um guia, sem estudo com usuários. |
| [M22] | praticante | Low-Contrast Text Is Not the Answer (NN/g, Katie Sherwin, 07/06/2015) | https://www.nngroup.com/articles/low-contrast/ | Texto de baixo contraste cansa a vista, passa despercebido e pesa mais para quem tem baixa visão. Na navegação, faz parecer que há menos opções ou que não se sabe onde se está, e o esmaecido parece desabilitado. Quando a página tem muito conteúdo essencial, baixar o contraste para manter a cara minimalista é um mau acordo. Alternativas: reduzir a densidade, variar o tamanho e a posição, conferir o contraste e usar acordeões para o conteúdo secundário. |
| [M23] | imprensa | The Swiss Grid (Poster House, exposição aberta em 26/02/2020) | https://swissgrid.posterhouse.org/ | Texto curatorial de museu, que serve de contexto. O grid suíço surge nos anos 1950, nas escolas de Zurique e de Basileia. Müller-Brockmann firmou o modo como o mundo via o grid do estilo suíço. Zurique segue o grid à risca, e Basileia é mais solta e prefere a foto de alto contraste. Fontes: Akzidenz-Grotesk (c. 1890), Univers (1957) e Helvetica (1957). Müller-Brockmann deixou a foto no início dos anos 1960. A página não trata de alinhamento à esquerda nem de espaço em branco como princípio. |
| [M24] | imprensa | A Harmony of Contrasts (Cooper Hewitt, Carey Gibbons, 05/08/2018) | https://www.cooperhewitt.org/2018/08/05/aharmonyofcontrasts/ | Blog de museu. O Estilo Tipográfico Internacional nasce na Suíça nos anos 1940 e 1950, com tipografia sobretudo sem serifa, layout em grid, assimetria e foto no lugar de ilustração. O texto parte do cartaz de Giselle, de Armin Hofmann (1959). |
| [M25] | referência técnica | Dot leaders (W3C, Chris Lilley, criado em 27/03/2011, atualizado em 02/10/2025) | https://www.w3.org/Style/Examples/007/leaders.en.html | O exemplo é um cardápio de restaurante numa `ul`, porque um cardápio é uma lista, com nome e preço em `span`s. Os pontos saem de um `:before` no `li`, o fundo dos `span`s os cobre e o `overflow-x: hidden` da lista os contém. Com nome que quebra linha, troca-se para `:after`, com `position: relative` e `z-index` no preço, e só em casos simples. Em novembro de 2014, só o Prince e o PDFReactor tinham suporte experimental a `leader()`. Não trata de acessibilidade. |
| [M26] | praticante | WebAIM E-mail List, Dot Leaders Should Be Seen, but Not heard (abril de 2021) | https://webaim.org/discussion/mail_message?id=46014 | Um engenheiro de acessibilidade (JP Jamous) sugere pôr só os pontos num `span` filho com `aria-hidden="true"`, para o leitor de tela ler só o texto dos dois lados. O autor da mensagem, Daniel P. Swift, propõe trocar os pontos por uma `border-bottom` pontilhada. É conselho de praticante, sem teste publicado, e não diz como o JAWS e o NVDA leem uma sequência de pontos. |
| [M27] | referência técnica | Price vocalization (Orange Digital Accessibility Guidelines, 04/05/2026, atualização do artigo de 14/01/2018) | https://a11y-guidelines.orange.com/en/articles/price-vocalization/ | O preço dividido em elementos é lido em pedaços. No exemplo, um preço mensal sai em três partes, e não se sabe qual é o valor. Soluções: `aria-hidden` em caracteres decorativos (como "/" e "*"), texto visualmente oculto para o sentido que o layout omite (como "por mês") e `<s>` ou `<del>` no preço riscado. O suporte a essas duas tags ainda é incompleto. |
| [M28] | referência técnica | WCAG, F94 (unidades de viewport e Resize Text) | https://www.w3.org/WAI/WCAG21/Techniques/failures/F94 | O texto em unidades de viewport não cresce com o zoom nem com o ajuste de texto. Se elas forem o meio principal de definir o tamanho, tendem a reprovar o 1.4.4. Media queries que mudam o tamanho conforme a tela podem não reprovar. |
| [M29] | referência técnica | WCAG 2.1, Understanding 1.4.10 Reflow | https://www.w3.org/WAI/WCAG21/Understanding/reflow.html | Nível AA: caber em 320 px CSS de largura sem rolagem nos dois eixos, o equivalente a 1280 px com zoom de 400%. Uma Home com chamadas em grid pode empilhar numa coluna. Um carrossel passa se cada painel couber em 320 px. A exceção da rolagem bidimensional vale só para aquela seção. |
| [M30] | referência técnica | WCAG 2.1, Understanding 1.4.8 Visual Presentation | https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html | Nível AAA, para blocos de texto: até 80 caracteres por linha, sem justificar (o justificado cria rios de branco e aperta as palavras), entrelinha de 1,5 ou mais e espaço entre parágrafos de 1,5 vez a entrelinha. Ampliar a 200% sem rolagem horizontal. |
| [M31] | referência técnica | Optimize Largest Contentful Paint (web.dev, Philip Walton e Barry Pollard, atualizado em 31/03/2025) | https://web.dev/articles/optimize-lcp | Bom é até 2,5 s em pelo menos 75% das visitas. A imagem da LCP vai no HTML (`src` ou `srcset`), com `fetchpriority="high"` em no máximo uma ou duas imagens, e nunca com lazy-load. As imagens de carrossel que não aparecem no início podem levar `fetchpriority="low"`. Se a LCP for texto com web font, pré-carregar a fonte e usar `font-display` diferente de `auto` e `block`. |
| [M32] | referência técnica | Best practices for fonts (web.dev, Katie Hempenius e Barry Pollard; sem data na página) | https://web.dev/articles/font-best-practices | A fonte variável costuma pesar mais que um estilo estático e compensa quando a página usa vários pesos e estilos. Usar WOFF2, subconjunto de glifos e `unicode-range`. O `optional` evita a troca com salto, mas pode deixar de usar a fonte que chega tarde; o `swap` mostra o texto na hora e troca com salto. O `size-adjust` reduz a diferença entre a fonte de reserva e a web font. |
| [M33] | referência técnica | Optimize Cumulative Layout Shift (web.dev, Addy Osmani e Barry Pollard, atualizado em 07/02/2025) | https://web.dev/articles/optimize-cls | Bom é até 0,1 em pelo menos 75% das visitas. Nas imagens, `width` e `height` ou `aspect-ratio`. Nas fontes, `font-display: optional`, `size-adjust` e preload da fonte crítica. Animar com `transform`, e não com `top`, `left` ou `box-shadow`. |
| [M34] | referência técnica | MDN, text-wrap | https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap | O `balance` equilibra os caracteres por linha e serve a textos de poucas linhas, como títulos. Só vale para blocos de até 6 linhas no Chromium e 10 no Firefox. A página marca a propriedade como Baseline amplamente disponível, em todos os navegadores desde março de 2024, com a ressalva de que algumas partes têm suporte variado. |
| [M35] | referência técnica | MDN, Subgrid | https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid | Com `subgrid`, o grid aninhado usa as trilhas do pai, e os itens internos se alinham às colunas de fora. O subgrid herda o `gap` do pai, que pode ser trocado, e não cria trilhas implícitas na dimensão em subgrid. É Baseline amplamente disponível, em todos os navegadores desde setembro de 2023. |
| [M36] | referência técnica | WCAG 2.2, Understanding 2.5.8 Target Size (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | Nível AA: alvos de 24×24 px CSS, ou espaçados de modo que um círculo de 24 px centrado em cada um não toque outro alvo nem outro círculo. A exceção vale para alvos dentro de frases. No exemplo do menu suspenso, itens com 18 px de altura reprovam. Para links e controles importantes, sugere mirar os 44×44 do 2.5.5. |
| [M37] | referência técnica | WCAG 2.1, Understanding 1.4.1 Use of Color | https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html | A cor não pode ser o único meio visual de passar informação. Para o link distinguido do texto só pela cor, a técnica suficiente G183 pede 3:1 contra o texto ao redor. Uma diferença grande de luminosidade conta como distinção adicional. Se a pessoa precisa perceber uma cor específica, é preciso outro indicador. |
| [M38] | referência técnica | WCAG 2.1, Understanding 1.4.3 Contrast (Minimum) | https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html | Pede 4,5:1 para texto e 3:1 para texto grande (18 pt, ou 14 pt em negrito; 1 pt = 1,333 px). Não se arredonda: 4,499:1 reprova. O logotipo e o texto de componente inativo, como um botão desabilitado, ficam isentos. |
| [M39] | referência técnica | WCAG, F83 (texto sobre imagem de fundo) | https://www.w3.org/WAI/WCAG21/Techniques/failures/F83 | O texto sobre imagem de fundo reprova o 1.4.3 e o 1.4.6 quando falta contraste. O teste rápido compara o texto escuro com a parte mais escura da imagem, ou o claro com a mais clara. Se falhar, confere-se o fundo de cada letra. |
| [M40] | referência técnica | WCAG 2.1, Understanding 1.4.11 Non-text Contrast | https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html | Nível AA: 3:1 contra as cores vizinhas para o que identifica componentes e estados, incluindo o indicador de foco. Um botão identificado pelo próprio texto não precisa de borda. O hover acrescentado é suplementar e não precisa de 3:1, mas não pode reduzir o contraste. Componente inativo fica isento. |
| [M41] | referência técnica | WCAG 2.1, Understanding 2.4.7 Focus Visible | https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html | Nível AA: todo componente operável por teclado tem um modo com o foco visível, e o foco não some com o tempo. A F78 é a falha de estilizar o contorno até ele sumir. G165 (foco padrão da plataforma) e C45 (`:focus-visible`) são técnicas suficientes. |
| [M42] | referência técnica | WCAG 2.1, Understanding 4.1.3 Status Messages | https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html | Nível AA: o resultado de uma ação é anunciado sem receber o foco. No exemplo do carrinho, ao adicionar um produto aparece a contagem junto ao ícone e o leitor a anuncia. Se só o número for o trecho atualizado, a pessoa pode ouvir só o número; marcar a frase inteira normalmente é melhor. A ARIA22 (`role="status"`) é técnica suficiente para mensagens de resultado de ação. |
| [M43] | referência técnica | MDN, aria-current | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current | O valor `page` marca a página atual num conjunto (o exemplo é uma trilha de navegação), e só um elemento do conjunto leva o atributo. Em abas, usa-se `aria-selected`. |
| [M44] | referência técnica | WAI-ARIA APG, Disclosure (Show/Hide) Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ | Um botão mostra ou esconde um conteúdo. Ele leva `aria-expanded` (`true` aberto, `false` fechado) e, se quiser, `aria-controls`; Enter e Espaço alternam. Exemplos: descrição de imagem, perguntas frequentes, menus de navegação e um card. |
| [M45] | galeria | Framer Marketplace, Kalk | https://www.framer.com/marketplace/templates/kalk/ | Template gratuito de restaurante, com o subtítulo Minimal Restaurant Template. Diz-se inspirado no minimalismo escandinavo e na estética editorial suíça. O autor não é nomeado. |
| [M46] | galeria | Kalk, prévia | https://kalk.framer.website/ | Endereço, horário e telefone no topo, e um título curto com Explore menu e Book now. A lista Daily catch tem seis itens, com nome, descrição e preço e sem `img` na seção. Depois vêm um diário com três posts e a navegação repetida no fim. É prévia de template, com o link Get this template e dados de exemplo. |
| [M47] | galeria | minimal.gallery, tag Food & drink | https://minimal.gallery/tag/food-drink/ | Curadoria desde 2013. A tag conta 40 sites, com 24 na primeira página, um deles patrocinado. Quase todos são marcas de produto. Entre os de restaurante ou loja de comida estão Union Boulangerie (há 2 meses), Cabalar Meat Co. (há 2 anos), Hungry Tiger e SEATED (há 1 ano). A listagem mostra só a idade relativa das entradas. |
| [M48] | galeria | minimal.gallery, tag Food & drink, página 2 | https://minimal.gallery/tag/food-drink/page/2/ | Mais 18 entradas, entre elas Limon (há 6 anos), Moon Delivers Cakes, Common Good Cocktail House (há 8 anos) e CARNE (há 10 anos). |
| [M49] | galeria | Patty, prévia (Toni Järvinen) | https://patty.framer.website/ | Template de hamburgueria com dados de exemplo. A nota do Uber Eats (4.9) vem antes do título, e o título curto traz Book table e Explore menu. O cardápio tem Burgers, Sides, Desserts e Drinks, e cada item mostra preço, nome e descrição, sem `img` nos itens; as imagens ficam no bloco de notícias. O texto de exemplo tem itens duplicados e descrições trocadas. O rodapé dá o crédito a Toni Järvinen. |
| [M50] | galeria | One Page Love, Restaurant | https://onepagelove.com/inspiration/restaurant | Anuncia 152 sites de restaurante e mostra 8 na primeira página, entre eles Madie e TAB Kitchen & Bakery. As entradas levam só o gênero Restaurant. Minimal existe como filtro, mas não aparece nessas entradas. |
| [M51] | galeria | Cabalar Meat Co. (site no ar, só como exemplo) | https://eatcabalar.com | Hamburgueria e açougue com bar, em Lancaster. No topo, Explore, Order Online (como botão) e Contact, e os links About, Farms & Friends, Menu, Food Truck, Private Events e FAQs. O horário de funcionamento vem logo depois da introdução. Depois vêm uma galeria de fotos, a história do fundador, o food truck, os fornecedores e uma grade do Instagram. Não há cardápio na Home. O rodapé repete os links e traz Gift Card, Order Online e Directions; o texto não mostra telefone nem endereço. |
| [M52] | galeria | Limón (site no ar, só como exemplo) | https://www.limon.no/ | Fast food saudável para viagem e catering, em Oslo. Links Home, Menu, About us, FAQ, Contact e Privacy policy, mais um botão Order. O hero tem um slogan curto, uma introdução, as ações See our menu e Order here e a foto de um ceviche. A Home mostra três pratos (dois com foto própria), o horário de cada unidade, os endereços, os telefones e os e-mails. |
| [M53] | galeria | Common Good Cocktail House (site no ar, só como exemplo) | https://www.commongoodcocktailhouse.com/ | Bar de coquetéis que serve café de manhã, em Glen Ellyn (EUA). Links About, Events, Menu, Club, Shop, Coffee e More. Horários separados para o café e para os coquetéis, na Home. O rodapé repete a navegação e traz telefone, e-mail (ofuscado no texto), endereço e Instagram. |
| [M54] | galeria | CARNE (site no ar, só como exemplo) | https://www.carnehamburguesas.com/en | Rede de hamburguerias. Links Home, Experience, About Us, Mauro, Carne Lab e Contact, repetidos no rodapé. O hero tem uma imagem e um manifesto em três linhas sobre mudar a indústria, com Read more. Não há cardápio nem pedido na Home. |
| [M55] | galeria | Madie (site no ar, só como exemplo) | https://madie.es | Café de madeleines no bairro de Chamberí, em Madri. Links Carta, Catering e Visítanos, com seletor ES, EN e FR. O título nomeia o produto e vem com um slogan curto e duas ações (ver o cardápio e conhecer o café). Uma nota de 4,9 com 102 avaliações aparece perto do topo. Todos os produtos têm foto. A seção de visita tem mapa, endereço e horário, e há uma grade do Instagram. |
| [M56] | galeria | TAB Kitchen/Bakery (site no ar, só como exemplo) | https://tabkitchenbakery.com | Café e padaria em Bengaluru. O texto não mostra menu de navegação. O título vem empilhado em três linhas. O cardápio é numerado de 01 a 06, com pontilhado e só os nomes, sem preço nem foto. Depois vêm a história, a decoração, a padaria e a equipe. Não se diz minimalista: descreve um espaço cheio de antiguidades. |
| [M57] | galeria | Union Boulangerie (site no ar, só como exemplo) | https://unionboulangerie.com/en/ | Padaria em Paris. Âncoras About, Find Us e Contact Us, com FR e EN. O hero é um carrossel com uma ação Let's go! para cada loja. Depois vêm a história e os valores, o método e cartões de ingredientes. A seção Visit Us tem dois cartões de loja, com endereço, horário e Let's Go! para o Google Maps. No fim, formulário de contato e newsletter, sem desconto; o pop-up oferece uma receita. |
| [M58] | galeria | Hungry Tiger (site no ar, só como exemplo) | https://eathungrytiger.com | Marca de molhos indianos. A seção Tradition & Creation tem três passos numerados com algarismos devanágaris. A newsletter dá 10% no primeiro pote. O rodapé tem os links, onde comprar, endereço, e-mail e Instagram. |
| [M59] | galeria | SEATED (site no ar, só como exemplo) | https://seated.nyc | Empresa de experiências culinárias. Lista numerada de 14 projetos (de 1/14 a 14/14), cada um com título, lugar, ano e imagem. Depois vêm depoimentos, um formulário e o rodapé com Instagram e e-mail. |

## Padrões de página

### 1. Navegação curta em links de texto no topo (recorrente, com 5 exemplos publicados)

Poucos links de texto (de 3 a 7) ficam no topo, ao lado da marca. Pela estrutura, isso confirma a pista da navegação visível [M8]. A leitura por fetch não mostra se a navegação continua à vista no celular, então essa parte não foi conferida.

- https://eatcabalar.com: links About, Farms & Friends, Menu, Food Truck, Private Events e FAQs, mais Explore e Contact. Publicado; comida (hamburgueria e açougue, na Food & drink do minimal.gallery) [M51][M47].
- https://www.limon.no/: links Home, Menu, About us, FAQ, Contact e Privacy policy. Publicado; comida (fast food para viagem, na Food & drink do minimal.gallery) [M52][M48].
- https://www.commongoodcocktailhouse.com/: links About, Events, Menu, Club, Shop e Coffee, mais um More. Publicado; bar e café (minimal.gallery) [M53][M48].
- https://www.carnehamburguesas.com/en: links Home, Experience, About Us, Mauro, Carne Lab e Contact. Publicado; comida (hamburgueria, minimal.gallery) [M54][M48].
- https://madie.es: três links (Carta, Catering e Visítanos) e o seletor de idioma. Publicado; comida (café; One Page Love, sem rótulo minimalista) [M55][M50].

Fontes: [M8] (navegação visível com 4 ou 5 opções), [M1] (esconder a navegação no desktop é excesso).

### 2. Pedido como ação destacada no topo (2 exemplos; não é recorrente)

Quando há pedido on-line, ele aparece no topo como botão, separado dos links de texto.

- https://eatcabalar.com: Order Online como botão no topo e de novo no rodapé, ao lado de Directions. Publicado; comida [M51].
- https://www.limon.no/: botão Order no topo e Order here no hero. O rodapé não repete o pedido. Publicado; comida [M52].

CARNE, Common Good e Madie, os outros sites do padrão 1, não têm pedido on-line na Home [M53][M54][M55].

Fontes: [M1] (cor de destaque nas ações principais), [M18] (pontos de partida para as tarefas principais).

### 3. Hero de uma frase, com uma ou duas ações (recorrente, com 3 exemplos publicados e 2 templates)

O topo é uma frase curta, seguida de uma ou duas ações: ver o cardápio, pedir ou reservar. Não foi conferido se o hero é "tipográfico" (tamanho, peso, ausência de imagem). Dois dos publicados têm imagem no hero (Limón e CARNE). A frase da CARNE é um manifesto que não diz que a casa é uma hamburgueria, o contrário do que pede [M18].

- https://www.limon.no/: slogan de fast food saudável para viagem, uma introdução, See our menu e Order here, e a foto de um ceviche. Publicado; comida [M52].
- https://madie.es: título com o produto, um slogan curto e duas ações. Publicado; comida [M55].
- https://www.carnehamburguesas.com/en: manifesto em três linhas sobre uma imagem e um botão Read more. Publicado; comida [M54].
- https://kalk.framer.website/: título curto com Explore menu e Book now, e endereço, horário e telefone acima. Conceito (template); comida [M46].
- https://patty.framer.website/: título curto com Book table e Explore menu, e uma nota do Uber Eats antes dele. Conceito (template); comida [M49].

Fontes: [M18] (slogan de uma frase que diga o que o site faz; 1 a 4 tarefas principais), [M1] (destacar só o texto que importa), [M9] (imagem estática forte no lugar do carrossel).

### 4. Cardápio em lista de texto: nome, descrição curta e preço, sem foto por item (3 exemplos independentes, só 1 publicado e sem preço)

Os itens vêm numa lista vertical de texto, às vezes numerada ou com pontilhado, sem foto por item. Pela regra, é recorrente, porque o TAB, o Patty e a demonstração do W3C são independentes entre si. Mas só um exemplo é site no ar, e esse não mostra preço nem se diz minimalista. Como nenhuma das duas páginas do Kalk nomeia o autor, não se sabe se ele e o Patty são independentes. Contraexemplos publicados: na Limón, dois dos três pratos da Home têm foto própria [M52], e na Madie todos os produtos têm foto [M55].

- https://kalk.framer.website/: lista Daily catch com seis itens (nome, descrição e preço), sem `img` na seção. Conceito (template); comida [M46].
- https://patty.framer.website/: categorias Burgers, Sides, Desserts e Drinks, e cada item com preço, nome e descrição, sem `img`. O texto de exemplo tem duplicatas e descrições trocadas. Conceito (template); comida [M49].
- https://tabkitchenbakery.com: cardápio numerado de 01 a 06, com pontilhado, só com os nomes. Publicado; comida (café e padaria; One Page Love, sem rótulo minimalista) [M56][M50].
- https://www.w3.org/Style/Examples/007/leaders.en.html: demonstração de cardápio numa `ul`, com pontilhado entre o nome e o preço. Conceito (demonstração técnica) [M25].

Fontes: [M25] (lista e pontilhado), [M26] (pontilhado fora do leitor de tela), [M27] (preço lido de uma vez), [M21] (grid modular para listas que se repetem), [M35] (subgrid para alinhar colunas).

### 5. Horário, endereço e rota como bloco próprio da Home (recorrente, com 5 exemplos publicados e 1 template)

O serviço (quando abre, onde fica e como chegar) aparece na Home como bloco próprio, ou no topo, e não só no rodapé.

- https://www.limon.no/: horário de cada unidade e, depois, endereços, telefones e e-mails das duas lojas. Publicado; comida [M52].
- https://eatcabalar.com: horário de funcionamento logo depois da introdução, com os dias abertos e os fechados. Publicado; comida [M51].
- https://www.commongoodcocktailhouse.com/: horários separados para o café e para os coquetéis, com o endereço no rodapé. Publicado; bar e café [M53].
- https://unionboulangerie.com/en/: dois cartões de loja com endereço, horário e um Let's Go! para o Google Maps. Publicado; comida (padaria, minimal.gallery) [M57][M47].
- https://madie.es: seção de visita com mapa, endereço e horário. Publicado; comida [M55].
- https://kalk.framer.website/: endereço, horário e telefone acima do hero. Conceito (template); comida [M46].

Fontes: não encontrei pesquisa que meça este padrão.

### 6. Listas numeradas como recurso tipográfico (recorrente, com 3 exemplos publicados)

Itens ou etapas recebem números em sequência, que fazem a hierarquia sem ícone nem enfeite. O formato varia: 01 a 06, algarismos devanágaris, 1/14 a 14/14. Nenhum exemplo é de delivery.

- https://tabkitchenbakery.com: cardápio numerado de 01 a 06. Publicado; comida [M56].
- https://eathungrytiger.com: seção Tradition & Creation em três passos numerados com algarismos devanágaris. Publicado; marca de molho (minimal.gallery) [M58][M47].
- https://seated.nyc: lista numerada de 14 projetos, cada um com imagem. Publicado; experiências culinárias (minimal.gallery) [M59][M47].

Fontes: não encontrei fonte que ligue a numeração ao minimalismo ou ao estilo suíço.

### 7. Rodapé que repete a navegação e junta os contatos (recorrente, com 3 exemplos publicados)

O rodapé repete os links principais e junta telefone, e-mail, endereço ou rota e as redes.

- https://www.commongoodcocktailhouse.com/: navegação repetida, telefone, e-mail, endereço e Instagram. Publicado; bar e café [M53].
- https://eatcabalar.com: links repetidos, Gift Card, Order Online e Directions, sem telefone nem endereço no texto. Publicado; comida [M51].
- https://eathungrytiger.com: links do site, onde comprar, endereço, e-mail e Instagram. Publicado; marca de molho [M58].

A CARNE também repete a navegação no rodapé [M54].

Fontes: [M8] (no Supermarket HQ, o site de maior uso no estudo, a navegação se repetia no fim da página).

## Catálogo de seções candidatas

| seção | o que faz | origem | conteúdo real exigido (arquivo e campo) | viável sem inventar? |
|---|---|---|---|---|
| Barra de navegação em texto, visível em todas as larguras | Marca, Início, Cardápio e Entrar ou Perfil como links de texto, e o carrinho com a contagem dita por extenso. Sem menu escondido no celular. Os links têm alvo de 24 px ou mais, e o atual leva `aria-current="page"`. | Padrão 1; [M8][M36][M43] | `src/direcoes/compartilhado/dados.js`: `MARCA`. `src/direcoes/compartilhado/useLinksPrincipais.js`: Início, Cardápio, Entrar ou Perfil. `src/direcoes/compartilhado/useContadorCarrinho.js`: `quantidade` e `rotulo` (do getter `itemCount` de `src/stores/cart.js`) | Sim |
| Hero de uma frase | Título grande, uma linha de apoio e uma só ação na cor de destaque. A foto do lanche é opcional; se entrar, é a imagem da LCP, no HTML, com `fetchpriority` alto e dimensões declaradas. O título usa `rem` e reflui em 320 px. | Padrão 3; [M1][M18][M28][M29][M31] | `dados.js`: `HERO.titulo`, `HERO.texto`, `HERO.acao`; imagem opcional em `HERO.imagem`, `HERO.alt`, `HERO.largura` e `HERO.altura` (960×906) e `IMAGEM_HERO` (WebP 480 e 960, PNG 960) | Sim |
| Cardápio em lista (Hambúrgueres) | Os 7 itens de `foods` em lista: nome, descrição e preço alinhados por subgrid, com pontilhado opcional e `aria-hidden`. O preço é lido inteiro, num único texto. Cada linha tem "Adicionar <nome>", que abre o modal Personalizar real. Substitui o carrossel, que passaria dos 5 quadros. | Padrão 4; [M9][M25][M26][M27][M35] | `src/json/products.json`, `menuItems.foods[]`: `name`, `description`, `price` (sempre por `formatPrice`) e `image` (opcional). `dados.js`: `CATEGORIAS` (`foods` → Hambúrgueres). A Batata Frita tem `category` `foods` e entra nesse rótulo | Sim |
| Bebidas e sobremesa em lista curta | A mesma lista de texto para as outras categorias, sem foto. | Padrão 4; [M18] | `products.json`: `menuItems.drinks[]` (3 itens, com `name`, `description` e `price`, sem `ingredients`) e `menuItems.desserts[]` (1, o Sorvete de Pote). `dados.js`: `CATEGORIAS` (Bebidas e Sobremesas) | Sim |
| Índice do cardápio com contagem e "a partir de" | Uma linha por categoria, com a contagem e o menor preço, ligando às seções da lista ou a `/menu`. Mostra o conteúdo real em vez de descrevê-lo. | [M18] | Derivados permitidos pelo inventário: contagem por categoria (7, 3 e 1) e menor preço, calculados de `products.json` (`menuItems.*[].price`) e formatados por `formatPrice`. Rótulos de `CATEGORIAS` | Sim |
| Ingredientes sob demanda (disclosure) | Os ingredientes ficam recolhidos sob a descrição de cada lanche e abrem num botão com `aria-expanded`. A lista fica enxuta sem perder a informação. | [M3][M22][M44] | `products.json`: `menuItems.foods[].ingredients` (de 2 a 8 itens) e `menuItems.desserts[].ingredients` (3). As bebidas não têm o campo e ficam sem o botão | Sim |
| Adicionais em lista | Lista de texto dos adicionais com preço, como prévia do que o modal Personalizar oferece. O título é provisório. | Padrão 4; [M18] | `products.json`: `foodAdditionals[]` (5) e `dessertAdditionals[]` (7), com `name` e `price`. O número de adicionais é derivado permitido | Sim |
| Produto em foco, um por vez | Um lanche por vez, com foto grande, nome, preço e "Adicionar", Anterior e Próximo visíveis, a posição "n de 7" e nada de avanço automático. O NN/g recomenda até 5 quadros, e são 7 lanches. | [M3][M9][M31] | `dados.js`: `SECAO` (título Mais pedidos, Anterior e Próximo). `products.json`, `menuItems.foods[]`: `name`, `price` e `image` (fotos em 480, 960 e 1440, WebP e JPG). Não há dado de pedidos, e nada além do título existente pode sugerir ranking | Sim |
| Serviço: horário, endereço e contato | Bloco próprio na Home, e não só no rodapé, com o horário, o endereço com link de mapa, o WhatsApp e o e-mail. | Padrão 5; [M36][M37] | `dados.js`: `HORARIO`; `CONTATOS` (endereço com link do Google Maps, WhatsApp e e-mail); `RODAPE.horario` e `RODAPE.endereco`; `NOVA_ABA` nos links externos | Sim |
| Rodapé com a navegação repetida | Repete os links principais, os contatos e as redes, e leva o crédito. | Padrão 7; [M8] | `useLinksPrincipais.js`; `dados.js`: `CONTATOS`, `REDES` (Facebook e Instagram, links genéricos com `rotulo`), `RODAPE.copyright` e `DESCRICAO` | Sim |
| Faixa de avaliações e notas | Nota de plataforma ou de avaliações perto do topo, como no Patty e na Madie. | [M49][M55] | Não existe: avaliações, notas e depoimentos estão na lista do que não inventar | Não |
| História da casa | Bloco de origem e valores, como na Union Boulangerie e na Cabalar. | [M51][M57] | Não existe: a história da casa está na lista do que não inventar, e a `DESCRICAO` é só um slogan | Não |
| Galeria de fotos do local ou grade do Instagram | Fotos da casa e da equipe, ou a grade do Instagram, como na Cabalar e na Madie. | [M51][M55] | Não existe: não há fotos do local nem da equipe, e as `REDES` são links genéricos, sem perfil real | Não |
| Newsletter com oferta | Cadastro de e-mail, às vezes com vantagem: 10% no primeiro pedido na Hungry Tiger, uma receita na Union Boulangerie. | [M57][M58] | Não existe: não há newsletter, promoção nem cupom no inventário | Não |
| Reserva de mesa | Ação de reservar e formulário de reserva, como nos templates Kalk e Patty. | [M46][M49] | Não existe: a loja é de delivery, e o fluxo real é cardápio, modal Personalizar e carrinho | Não |
| Prazo e taxa de entrega no topo | Linha de serviço com o tempo estimado e a taxa. | Nenhuma fonte aberta a descreve | Não existe: prazo, taxa e raio de entrega estão na lista do que não inventar | Não |

## Componentes típicos e estados

- **Link de navegação em texto:**
  - padrão: texto com 4,5:1, nunca cinza claro [M22][M38];
  - hover: sublinhado ou outra mudança suplementar, que não precisa de 3:1 mas não pode reduzir o contraste [M40];
  - foco visível: indicador de 3:1 contra o fundo, sem remover o contorno sem pôr outro no lugar [M40][M41];
  - atual: `aria-current="page"` num só link do conjunto, e uma marca visual que não seja só a cor [M43][M37];
  - alvo: 24×24 px CSS ou espaçamento equivalente; links soltos não têm a exceção das frases [M36].
- **Contador do carrinho:**
  - vazio: o rótulo do carrinho é lido como frase, sem número solto (o `rotulo` de `useContadorCarrinho.js` já diz "Carrinho, vazio");
  - com itens: o número fica visível junto ao rótulo, como no exemplo do carrinho do W3C [M42];
  - mudança: anunciada por `role="status"`, com a frase inteira (por exemplo, "N itens no carrinho") e sem mover o foco [M42];
  - foco visível no link do carrinho [M41].
- **Botão principal na única cor de destaque:**
  - padrão: preenchido, nunca vazado, na cor de destaque reservada às ações principais [M1];
  - hover: muda sem perder o contraste do texto [M38][M40];
  - foco visível com 3:1 contra o fundo [M40][M41];
  - desabilitado: isento de contraste [M38][M40].
- **Linha do cardápio:**
  - padrão: nome, descrição curta e preço como texto real, com o preço lido de uma vez [M27];
  - pontilhado: gerado por CSS ou por borda pontilhada, fora do leitor de tela (`aria-hidden` só no pontilhado) [M25][M26];
  - nome longo: quebra de linha sem tirar o preço do alinhamento (`:after` no exemplo do W3C, ou subgrid) [M25][M35];
  - foco no botão "Adicionar <nome>" [M41];
  - adicionado: o modal real anuncia, e o contador do carrinho muda [M42];
  - produto removido no painel: a linha some e a lista continua coerente (o inventário diz que o painel pode tirar produtos).
- **Botão de ingredientes (disclosure):**
  - recolhido: `aria-expanded="false"`;
  - expandido: `aria-expanded="true"`, com a lista visível;
  - foco visível, e Enter e Espaço alternam [M44][M41];
  - ausente nas bebidas, que não têm o campo `ingredients`.
- **Link de texto dentro de frase (endereço, WhatsApp, e-mail):**
  - padrão: sublinhado, ou 3:1 contra o texto ao redor se for distinguido só pela cor (G183) [M37];
  - hover e foco visíveis [M40][M41];
  - externo: rótulo com o `NOVA_ABA` de `dados.js`;
  - alvo: isento do 2.5.8 só se estiver dentro de uma frase [M36].
- **Navegação do produto em foco (Anterior e Próximo):**
  - setas grandes, visíveis e com contraste, dentro do componente [M9];
  - posição atual explícita ("n de 7"), em vez de só pontos [M9];
  - sem avanço automático [M9];
  - uma fatia do próximo item à vista, quando houver espaço [M9];
  - cada painel cabe em 320 px [M29].
- **Título do hero:**
  - tamanho em `rem`, ou em `clamp()` com `rem`, nunca só em `vw`, para crescer com o zoom [M28];
  - quebra equilibrada com `text-wrap: balance` (até 6 linhas no Chromium) [M34];
  - sem rolagem horizontal em 320 px CSS [M29];
  - fonte carregada sem salto, com preload, `font-display` e `size-adjust` [M32][M33].
- **Imagem de produto:**
  - `width` e `height`, ou `aspect-ratio`, para não deslocar o layout [M33];
  - lazy-load fora da primeira tela; a do hero nunca é lazy e leva `fetchpriority` alto [M31];
  - `srcset` com 480, 960 e 1440 em WebP e JPG de reserva (os arquivos do inventário).

## Riscos de acessibilidade e desempenho

- **Fundo falso:** espaço negativo demais faz a primeira tela parecer a página inteira, e o cardápio abaixo não é visto; cerca de 57% do tempo de leitura fica acima da dobra [M17].
- **Cortar o necessário em nome da limpeza:** some a explicação do que a loja faz, ou o caminho até o cardápio [M3][M18].
- **Texto e links em cinza claro para parecer leve:** a leitura cansa, a navegação parece ter menos opções e o esmaecido parece desabilitado [M22].
- **Contraste abaixo do mínimo:** 4,5:1 para texto e 3:1 só para texto grande, sem arredondar [M38].
- **Botão vazado na ação principal:** pode ficar ilegível e quebra a convenção de botão [M1].
- **Navegação atrás de um ícone pequeno:** no estudo, o site com o ícone colado ao logotipo teve o menor uso (44%) e o primeiro uso mais lento (33 s) [M8].
- **Link do cardápio pouco visível:** no site móvel da Panera, um usuário teve dificuldade de chegar ao cardápio porque o banner de instalar o app ocupava a tela [M19].
- **Texto sobre foto de fundo:** medir contra o ponto mais escuro ou mais claro da imagem e, se falhar, letra por letra [M39].
- **Foto do hero como LCP:** lazy-load ou imagem só no CSS atrasam a LCP, cuja meta é 2,5 s [M31].
- **Título dramático em `vw`:** não cresce com o zoom e tende a reprovar o 1.4.4 [M28].
- **Título enorme ou grid de várias colunas que não reflui em 320 px CSS:** gera rolagem horizontal [M29].
- **Fonte variável com eixo de largura:** o arquivo costuma pesar mais que um estilo estático e só compensa com vários pesos ou estilos [M32].
- **Troca de fonte e imagens sem dimensões:** deslocam o layout, e a meta do CLS é 0,1 [M33].
- **Paleta monocromática com link distinguido só pela cor:** precisa de 3:1 contra o texto ao redor ou de outra marca, como o sublinhado [M37].
- **Remover o contorno de foco para limpar o visual, sem substituto:** é a falha F78 [M41].
- **Links de navegação pequenos e juntos:** sem a exceção das frases, precisam de 24 px ou de espaçamento [M36].
- **Pontilhado do cardápio dentro da árvore de acessibilidade:** a discussão da WebAIM parte de tirar os pontos do leitor de tela, mas não diz como cada leitor os lê [M26].
- **Preço partido em elementos (R$, inteiro e centavos em `span`s):** é lido em pedaços [M27].
- **Contador do carrinho que muda em silêncio para o leitor de tela** [M42].
- **Linhas longas em layout largo e descrição justificada:** dificultam a leitura; o critério AAA pede até 80 caracteres e texto sem justificar [M30].
- **Carrossel com os 7 lanches:** passa dos 5 quadros recomendados, e os pontos são sinal fraco [M9].
- **Tirar o "R$" para o preço parecer mais limpo:** num estudo com restaurante à mesa, o preço sem símbolo aumentou o gasto em cerca de 8% [M20]. Além da questão ética, contraria a regra do projeto de mostrar o preço sempre por `formatPrice` (CLAUDE.md).
- **Tipografia rebuscada ou blocos muito formatados:** passam por anúncio e são ignorados [M1][M18].

## Não encontrei

- **Situação das pistas da rodada 1:**
  - cardápio tipográfico em lista: aparece em dois templates, numa demonstração do W3C e num site publicado (TAB), que não mostra preço nem se diz minimalista [M46][M49][M25][M56]; não encontrei delivery publicado assim;
  - grid suíço: não se confirma como traço do minimalismo web. O grid aparece em 43% dos sites [M1], o artigo das raízes não trata do estilo suíço [M2], e o grid surge só como raiz histórica nos museus [M23][M24] e na autodescrição do Kalk [M45];
  - uma ação por vez: não encontrei fonte que peça uma só ação por tela. O que existe é a cor de destaque consistente nas ações principais [M1], os pontos de partida para 1 a 4 tarefas na Home [M18] e o modo zen da heurística 8 [M3];
  - navegação visível: a pesquisa a sustenta [M8], e os 5 sites do padrão 1 têm links de texto no topo, mas não conferi se a navegação fica à vista no celular.
- Pesquisa com usuários que compare, em delivery, o cardápio em lista sem foto e o cardápio com foto. As diretrizes do Baymard sobre imagem e descrição de item ficam no Premium [M19].
- Site publicado de hamburgueria ou delivery, rotulado minimalista, com o cardápio em lista e com preço na Home. A CARNE e a Cabalar levam o cardápio para outra página [M54][M51]; a Limón e a Madie mostram foto por item [M52][M55].
- Restaurantes na tag Food & drink do minimal.gallery: são poucos, porque a tag é quase toda de marcas de produto [M47][M48].
- Nada visual dos exemplos (cores, tamanho de fonte, grid, espaço negativo): o fetch lê só o texto e a marcação, e o Chrome fica com outro agente. Os padrões descrevem estrutura e textos, não aparência.
- O estado dos sites na época da curadoria: as entradas da CARNE (há 10 anos), da Common Good (há 8) e da Limón (há 6) são antigas, e os sites podem ter mudado desde então [M48].
- O autor do Kalk: nem a prévia nem a página do marketplace o nomeiam [M45][M46], então não se sabe se ele e o Patty são independentes.
- Replicação do estudo do cifrão: ele é um só (201 clientes, restaurante à mesa nos EUA, 2009), e não encontrei estudo em delivery nem com preço em real [M20].
- O artigo da NN/g sobre espaço em branco: o pesquisador não o encontrou, e a busca trouxe só terceiros, que não foram usados.
- A data de publicação da página dos princípios de Rams [M7].
- Como o JAWS e o NVDA leem uma sequência de pontos: a conversa da WebAIM não diz [M26].
- Pesquisa que meça o efeito de mostrar horário e endereço na Home: o padrão 5 se apoia só em exemplos.
- Fonte que ligue as listas numeradas ao minimalismo ou ao estilo suíço (padrão 6).

## Não abriu

- https://www.nb.admin.ch/snl/en/home/publications-research/dossiers/swiss-poster/international-style.html: HTTP 404, de novo na verificação. Era o dossiê da Biblioteca Nacional Suíça sobre o International Style; [M23] e [M24] ficaram no lugar.
- https://moondeliverscakes.com/: HTTP 525, de novo na verificação. É o site de entrega de bolos listado no minimal.gallery [M48].
- https://her.melbourne: de novo, só a navegação e os ícones sociais; hero, cardápio e rodapé não vieram no texto (provavelmente montados por JavaScript).
- https://onepagelove.com/inspiration/restaurant/page/2: devolve os mesmos 8 sites da primeira página, de novo na verificação. O "Next" dessa página aponta para https://onepagelove.com/genre/restaurant/page/2, que não foi aberto. Das 152 entradas, foram vistas 8.
- https://baymard.com/industries/food-delivery-and-takeout-ux: abre, mas só descreve os temas (imagem e descrição de item, tamanhos, extras) e leva à página da pesquisa. Ela não diz o que é pago; segundo [M19], as diretrizes ficam no Premium.
- Listagem Minimal do siteinspire: o pesquisador não deu a URL. Na verificação, https://www.siteinspire.com/websites?categories=19 abriu a categoria Portfolio, sem a Union Boulangerie.
- Nowa (citada pelo pesquisador como exemplo de newsletter com oferta): sem URL, não foi aberta.

## Refutadas na verificação

- **[A28] Use of Color (parcial):** cai a conclusão de que "um esquema monocromático pode passar só pela luminosidade". A página não diz isso: os exemplos dela combinam matiz e luminosidade, e ela pede outro indicador quando a pessoa precisa perceber uma cor específica [M37].
- **[A37] minimal.gallery (parcial):** caem as datas exatas das entradas (19/07/2016, 14/05/2021, 20/11/2018 e 29/09/2026). As duas páginas da tag mostram só a idade relativa, compatível com os anos [M47][M48].
- **[A10] Cornell (classe):** a fonte passou de pesquisa para imprensa. É uma notícia da universidade sobre o estudo, e não o artigo nem o resumo dele [M20].
- **[A35] Disclosure (parcial):** cai o "card com detalhes extras". A APG lista um exemplo de card sem descrever o que ele mostra, e lista também menus de navegação [M44].
- **Padrão "Navegação visível em texto, com o pedido como único botão" (parcial):** só a Cabalar e a Limón têm pedido on-line no topo, e só a Cabalar o repete no rodapé. CARNE, Common Good e Madie não têm pedido na Home [M51][M52][M53][M54][M55]. O padrão virou dois, o 1 (recorrente) e o 2 (com 2 exemplos). O "sempre à vista" não se confere por fetch.
- **Exemplo da Common Good, "sem botão de destaque" (derrubado):** o texto não mostra o estilo dos links, e há também um item More [M53].
- **Exemplo da Union Boulangerie, "siteinspire Minimal" (derrubado):** não foi reconfirmado (ver "Não abriu"); a entrada no minimal.gallery continua [M47].
- **Risco "usuários reais tiveram dificuldade de achar o link do cardápio" (parcial):** foi um usuário, no site móvel da Panera, por causa do banner de instalar o app [M19].
- **Lacuna "navegação visível confirmada por pesquisa [A6][A9]" (parcial):** o Baymard não trata de navegação visível. Fica só a NN/g [M8].
- **Seção "Newsletter com oferta, como em Hungry Tiger, Union Boulangerie e Nowa" (parcial):** a Nowa não foi aberta, e a newsletter da Union Boulangerie não tem desconto [M57].
- **Seção "História da casa, como em Union Boulangerie, Madie e Cabalar" (parcial):** a leitura da Madie não mostrou bloco de história [M55]. Ficam a Union Boulangerie e a Cabalar [M51][M57].
- **Seção "Prazo e taxa de entrega no topo, comum em delivery", com origem no Baymard (derrubada a origem):** o artigo não fala de prazo nem de taxa [M19].
- **Componente "botão pressionado: mudança visível além da sombra" (derrubado):** nenhuma fonte aberta sustenta o estado.

Ajustes de redação, sem derrubar a afirmação:

- [A4]: o exemplo é um app de contagem regressiva, e não um cronômetro [M3].
- [A9]: a dificuldade com o link do cardápio da Panera veio do banner de instalar o app [M19].
- [A10]: o Chronicle chama o lugar de restaurante "upscale casual", e o estudo fala de um café do CIA [M20].
- [A13]: a página não dá a data da formulação; conta que Rams começou a se perguntar sobre o próprio design no fim dos anos 1970 [M7].
- [A14]: a página diz que Müller-Brockmann firmou o modo como o mundo via o grid do estilo suíço [M23].
- [A25]: "em todos os navegadores desde março de 2024" é a data que a MDN dá para a disponibilidade, com a ressalva de suporte variado em algumas partes [M34].
- [A26]: o alinhamento de nome e preço é uma aplicação ao cardápio, e não um exemplo da MDN [M35].
- [A27]: a página não fala de navegação. A conclusão vem do alcance da exceção (alvos dentro de frases) e do exemplo do menu suspenso que reprova [M36].
- [A33]: marcar a frase inteira "normalmente é melhor", e não uma exigência [M42].
- [A36]: a descrição Minimal Restaurant Template e a inspiração escandinava e suíça estão na página do marketplace [M45], e não na prévia [M46].
- Exemplo da Hungry Tiger: os passos são numerados com algarismos devanágaris, e não com 01 a 03 [M58].
- Exemplo do Patty: as descrições nem sempre cabem em uma linha, e algumas estão trocadas no texto de exemplo [M49].
- Padrão do hero: o "tipográfico" não foi conferido, e dois dos exemplos publicados têm imagem no hero [M52][M54].

## Referências visuais (galerias)

Coletadas no Chrome em 20 e 21/11/2026, numa aba própria, recusando os cookies não essenciais. Só as páginas que abriram; 10 exemplos. Servem só de exemplo do padrão abstrato: nenhuma imagem, layout ou código foi copiado. As descrições são paráfrases.

| URL | Galeria | Publicado ou conceito | Domínio | Padrões vistos |
|---|---|---|---|---|
| https://www.eatcabalar.com/ | minimal.gallery (tag Food & drink) | publicado | restaurante: hambúrguer smash, açougue e bar (Lancaster, EUA) | uma só cor de marca (verde-escuro) sobre branco; o parágrafo de apresentação em corpo grande faz o papel de título; só um botão preenchido, os outros em contorno (hierarquia pelo preenchimento, não por cores novas);… |
| https://www.dashburger.ie/ | siteinspire (categoria Food & Drink) | publicado | restaurante: hambúrguer smash com click & collect e delivery (Dublin) | paleta de 3 (rosa-claro, verde-escuro, preto) e um degradê suave de rosa para branco como fundo; títulos com uma palavra por linha; CTAs como link de texto sublinhado, não como botão; muito vazio entre os blocos; a… |
| https://www.doubledimanche.fr/ | siteinspire (categoria Food & Drink) | publicado | grupo de restaurantes (Hossegor, França) | fundo off-white quente; grotesca ultranegrita como único elemento gráfico; a lista de nomes é a navegação, sem cards nem miniaturas; a imagem cresce em escala ao rolar; só 2 CTAs, pequenos e em contorno |
| https://unionboulangerie.com/en/ | minimal.gallery (tag Food & drink); também aparece no siteinspire | publicado | padaria de bairro (Paris, 2 lojas) | fundo claro e títulos em caixa-alta pequena e espaçada; texto que entra letra a letra; cor só na nav; horários em tabela simples; imagens do processo (massa, balança) em vez de pratos montados |
| https://onepagelove.com/nowa | onepagelove (busca "restaurant", estilo Minimal) | publicado (página de pré-abertura) | restaurante (Allentown, EUA) | one-pager; moldura off-white em volta da imagem (borda de página); foto dessaturada como fundo; um só bloco de texto; tipografia geométrica leve. A galeria marca Big Images, Whitespace e Moving Background |
| https://www.framer.com/marketplace/templates/kalk/ | framer.com/marketplace | conceito (template) | restaurante (frutos do mar, bistrô, bar de vinhos) | o autor declara a inspiração no minimalismo escandinavo e no editorial suíço; creme + preto, com a ilustração como única cor; cardápio como lista tipográfica com divisórias, sem foto por prato; preço alinhado à… |
| https://www.careofchan.com/ | minimal.gallery (tag Food & drink) | publicado | agência de hospitalidade e jantares para marcas | site de uma tela; o logotipo manuscrito é o único elemento gráfico; a foto de mesa compartilhada dá o clima; texto corrido, sem títulos, cards ou botões |
| https://land-book.com/websites/35566-delice-webflow-html-website-template | land-book (Food & Drinks + Light Colors) | conceito (template Webflow) | restaurante francês | fundo creme com a serifa de display como identidade; imagens em pílula intercaladas no texto; um ornamento pequeno (estrela) como divisor; seções alternando creme e preto; um único CTA repetido |
| https://land-book.com/websites/35705-red-rooster-coffee | land-book (Food & Drinks + Light Colors) | publicado | torrefação de café com loja online | fundo bege neutro; uma cor de destaque (vinho) só no CTA principal; cards de produto cinza-claro sem sombra; etiquetas com contorno fino; a frase de missão serve de pausa entre o hero e a grade |
| https://www.eathungrytiger.com/ | minimal.gallery (tag Food & drink) | publicado | molho pronto (produto alimentício) | contraexemplo: está na galeria, mas o visual é expressivo (caixa-alta em tudo, título enorme, textura). Para o minimalismo, aproveitam-se só a paleta de 2 cores e os passos numerados simples |
