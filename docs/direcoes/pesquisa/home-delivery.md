# Pesquisa da rodada 2: Home de restaurante e delivery (transversal)

Pesquisa feita em 20/11/2026. Um pesquisador levantou as fontes e os exemplos por fetch. Depois, um verificador reabriu cada URL com WebFetch no mesmo dia, tentou derrubar cada afirmação e cada exemplo e deixou neste arquivo só o que sobreviveu. As 37 afirmações foram reabertas e o núcleo de todas se manteve, mas 7 delas perderam trechos (8 ao todo). No total caíram 15 itens: 8 trechos de afirmação, 4 de exemplos, 1 lacuna e 2 riscos, listados em "Refutadas na verificação". O vínculo com a rodada 1 está em `docs/direcoes/PESQUISA.md`, nas linhas 1 a 41: classificação das fontes, decisões do usuário e suposições. A rodada 1 não tem seção própria sobre Home de restaurante e delivery. Os campos de conteúdo citados vêm do inventário da rodada 2. Neste worktree, os textos da loja ficam em `src/direcoes/compartilhado/dados.js` (o inventário chama o arquivo de `conteudo.js`), e os links principais ficam em `src/direcoes/compartilhado/useLinksPrincipais.js`. Os exemplos são sites publicados lidos por fetch, que entrega o texto e não o visual. Por isso não foram vistos tamanhos, cores, a posição da dobra nem o comportamento no celular. Todo o texto é paráfrase, e nenhuma imagem, ícone ou layout foi copiado.

## Fontes

| nº | Tipo | Título | URL | O que sustenta |
|---|---|---|---|---|
| H1 | pesquisa | Homepage Design: 5 Fundamental Principles (NN/g; Huei-Hsin Wang, 15/03/2024) | https://www.nngroup.com/articles/homepage-design-principles/ | **Identidade:** a Home diz quem é a casa e o que ela faz, com um slogan curto quando o nome não basta. **Conteúdo:** mostra exemplos concretos do que o site oferece, com o essencial acima da dobra, e dá mais peso visual às tarefas prioritárias. **Rótulos:** específicos, com bom faro de informação; "Clique aqui", "Explore" e "Saiba mais" não servem. **Marca:** nome e logo no canto superior esquerdo, com link para a Home. **Movimento:** mínimo e sob controle do usuário; o parallax, o carrossel que avança sozinho e o scrolljacking desorientam. **Evitar:** vídeo que toca sozinho e pop-ups, salvo os exigidos por lei (consentimento, idade). **Carrossel:** o artigo não o proíbe; critica o que avança sozinho e o que não mostra a oferta real. |
| H2 | pesquisa | Scrolling and Attention (NN/g; Therese Fessenden, 15/04/2018) | https://www.nngroup.com/articles/scrolling-and-attention/ | **Amostra:** mais de 130 mil fixações de 120 participantes, em telas de 1920x1080. **Resultado:** cerca de 57% do tempo de visualização ficou acima da dobra e 74% nas duas primeiras telas (até 2160 px); a atenção cai bruscamente depois da dobra. **Recomendação:** conteúdo prioritário e chamadas no topo, cuidado com o falso fim e um sinal de que há mais abaixo. |
| H3 | pesquisa | The Illusion of Completeness (NN/g; Kim Flaherty, 17/01/2016) | https://www.nngroup.com/articles/illusion-of-completeness/ | **Problema:** hero de tela cheia, linhas horizontais de ponta a ponta e grandes espaços vazios criam um falso fim de página. **Solução:** parte da seção seguinte aparece acima da dobra. **Carrossel:** o conteúdo seguinte sangra pela borda, com setas evidentes e contagem de slides. |
| H4 | pesquisa | Image-Focused Design: Is Bigger Better? (NN/g; Kathryn Whitenton, 28/09/2014) | https://www.nngroup.com/articles/image-focused-design/ | **Problema:** uma imagem dominante faz o usuário notar menos o resto; na Southwest, a busca de voos foi empurrada para baixo. **Recomendação:** equilíbrio, com imagens que apoiam a marca sem esconder o conteúdo importante, e peso visual de cada elemento conforme a importância do objetivo dele. |
| H5 | pesquisa | Ensure High Contrast for Text Over Images (NN/g; Aurora Harley, 18/10/2015, revisto em 13/01/2026) | https://www.nngroup.com/articles/text-over-images/ | **Contraste:** texto sobre foto pede 4,5:1, ou 3:1 para texto grande, medido no pior caso de imagem e posição. **Técnicas:** sobreposição semiopaca, degradê no pé da imagem, caixa semiopaca atrás do texto, desfoque de parte da foto, escurecer a imagem, degradê radial e sombra ou contorno no texto. |
| H6 | pesquisa | Homepage Carousel UX (Baymard; Edward Scott, 30/04/2019, atualizado em 03/04/2025) | https://baymard.com/blog/homepage-carousel | **Números:** pelos testes em larga escala do Baymard, 46% dos carrosséis de Home têm problemas de UX. **Rotação:** no celular, não girar sozinho, porque não há hover para pausar; depois de uma interação ativa, a rotação para, mesmo sem o mouse em cima. **Conteúdo:** recurso vital nunca só num slide, e texto do slide em HTML, não dentro da imagem. **Alternativa:** seções estáticas de conteúdo, mais simples e com bom desempenho. |
| H7 | pesquisa | Carousel Usability: Designing an Effective UI for Websites with Content Overload (NN/g; Kara Pernice, 14/09/2013, revisto em 07/08/2026) | https://www.nngroup.com/articles/designing-effective-carousels/ | **Regras:** não avançar sozinho no celular e ter 5 quadros ou menos. **Indicadores:** os pontos são pista fraca, sobretudo no celular, e o quadro atual precisa parecer selecionado. **Arquitetura:** o conteúdo importante também fica na arquitetura do site. **Alternativa:** considerar um carrossel parado ou um hero estático. |
| H8 | pesquisa | Auto-Forwarding Carousels and Accordions Annoy Users and Reduce Visibility (NN/g; Jakob Nielsen, 19/01/2013) | https://www.nngroup.com/articles/auto-forwarding/ | **Regra:** carrossel e acordeão só trocam de painel quando o usuário pede. **Teste:** no exemplo da Siemens, a oferta ficava visível só 20% do tempo, e a participante concluiu que não havia ofertas. **Motivos:** o movimento parece anúncio, quem lê devagar ou em segunda língua não acompanha, e quem tem dificuldade motora não clica a tempo. |
| H9 | pesquisa | Carousels on Mobile Devices (NN/g; Raluca Budiu, 19/08/2018) | https://www.nngroup.com/articles/mobile-carousels/ | **Pista:** mostrar parte do item seguinte, que é uma pista forte. **Tamanho:** chegar ao último item em 3 a 4 toques ou deslizes, e aceitar o deslize. **Ordem:** os itens mais interessantes primeiro; com muitos itens, lista. **Alternativa:** outro caminho para o conteúdo crítico. |
| H10 | pesquisa | Beware Horizontal Scrolling and Mimicking Swipe on Desktop (NN/g; Katie Sherwin, 27/04/2014) | https://www.nngroup.com/articles/horizontal-scrolling/ | **Problema:** no desktop, os usuários não adotaram a rolagem lateral; até setas fortes passam despercebidas, e setas que só aparecem no hover escondem que há mais. **Recomendação:** alvos visíveis para avançar, avanço por clique e teclado, barra ou paginação que mostre quanto falta, avanço do conjunto inteiro e nada essencial atrás de rolagem lateral. |
| H11 | referência técnica | Carousel (Slide Show or Image Rotator) Pattern (W3C WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ | **Botões:** anterior e próximo não movem o foco. **Rotação automática:** exige botão de parar e retomar, que é o primeiro item da ordem de Tab dentro do carrossel; a rotação para quando o foco do teclado entra e enquanto o mouse está em cima. **Papéis:** contêiner com `aria-roledescription="carousel"` e slides `role="group"` com `aria-roledescription="slide"`. **Posição:** "3 de 10" serve de rótulo quando o slide não tem nome. **Região viva (opcional):** `off` durante a rotação e `polite` com ela parada. |
| H12 | referência técnica | Understanding SC 2.2.2: Pause, Stop, Hide (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | **Critério:** 2.2.2, nível A. Conteúdo que se move, pisca ou rola, começa sozinho, dura mais de 5 s e aparece junto de outro conteúdo precisa de um meio de pausar, parar ou esconder. **Atualização automática:** não tem a exceção dos 5 s. **Exemplo citado:** apresentações que avançam sozinhas. |
| H13 | referência técnica | Carousels Tutorial (W3C WAI; atualizado em 13/04/2017) | https://www.w3.org/WAI/tutorials/carousels/ | **Requisitos:** pausar o movimento, operar tudo pelo teclado, comunicar as mudanças a todos (leitor de tela incluído) e gerenciar o foco de forma compreensível. **Critérios:** 1.3.1, 2.1.1, 2.2.2 e 4.1.2. |
| H14 | pesquisa | Hamburger Menus and Hidden Navigation Hurt UX Metrics (NN/g; Kara Pernice e Raluca Budiu, 26/06/2016) | https://www.nngroup.com/articles/hamburger-menus/ | **Amostra:** 179 participantes, 6 sites, celular e desktop. **Uso:** no celular, a navegação escondida foi usada em 57% dos casos e a combinada em 86%. **Descoberta:** caiu mais de 20% com a navegação escondida, nos dois aparelhos juntos. **Tempo:** no celular, as tarefas foram 15% mais lentas com o menu escondido do que com o combinado; no desktop, pelo menos 39%. **Recomendação:** com 4 links de topo ou menos, mostrá-los visíveis. |
| H15 | pesquisa | Basic Patterns for Mobile Navigation: A Primer (NN/g; Raluca Budiu, 15/11/2015) | https://www.nngroup.com/articles/mobile-navigation-patterns/ | **Barra de abas:** persiste na rolagem, ao contrário da barra de navegação comum; cabem de 4 a 5 opções, e além de 5 fica difícil manter o alvo de toque. **Menu escondido:** é o padrão menos fácil de descobrir. **Escolha:** todo padrão tem custo; escolhe-se o que menos atrapalha as tarefas prováveis. |
| H16 | documentação oficial | Tab bars (Apple Human Interface Guidelines; registro de mudanças de 08/06/2026) | https://developer.apple.com/design/human-interface-guidelines/tab-bars.md | **Função:** a barra serve para navegar, não para ações, e fica visível ao trocar de seção. **Abas:** menos abas navegam melhor, e a aba de transbordo deve ser evitada. **Rótulos:** de preferência com uma palavra. **Selo:** só para informação crítica. **Seção vazia:** a aba não é escondida nem desabilitada; explica-se o motivo. **No iOS:** a barra flutua sobre um fundo Liquid Glass que deixa ver o conteúdo, uma diretriz de app nativo. |
| H17 | pesquisa | Sticky Headers: 5 Ways to Make Them Better (NN/g; Page Laubheimer, 04/04/2021) | https://www.nngroup.com/articles/sticky-headers/ | **Quando usar:** só se de fato servir ao usuário; vale perguntar se os elementos do cabeçalho são necessários com frequência ou em algum momento da sessão. **Tamanho:** o menor razoável, com alvos de 1 cm no toque e texto de cerca de 16 pt. **Fundo:** opaco, porque o translúcido atrapalha a leitura. **Animação:** de preferência nenhuma; no cabeçalho que reaparece, a entrada dura cerca de 300 a 400 ms. |
| H18 | referência técnica | Understanding SC 2.5.8: Target Size (Minimum) (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | **Critério:** 2.5.8, nível AA, com alvo de pelo menos 24x24 px CSS. **Exceções:** espaçamento (círculo de 24 px sem tocar outro alvo), equivalente, alvo dentro do texto, controle do navegador e essencial. **Recomendação, não norma:** mirar o 2.5.5 reforçado (44x44) nos links e controles importantes. |
| H19 | pesquisa | Touch Targets on Touchscreens (NN/g; Aurora Harley, 05/05/2019) | https://www.nngroup.com/articles/touch-target-size/ | **Tamanho:** alvo mínimo de 1 cm x 1 cm, em medida física, com espaço entre vizinhos. **Ação principal:** pede alvo maior. **Efeito:** alvo pequeno ou apertado aumenta o tempo (lei de Fitts) e os toques errados. |
| H20 | pesquisa | UX Guidelines for Ecommerce Homepages, Category Pages, and Product Listing Pages (NN/g; Aurora Harley, 12/08/2018) | https://www.nngroup.com/articles/ecommerce-homepages-listing-pages/ | **Amostra:** 49 sites de comércio eletrônico. **Home:** expõe a oferta principal e deixa começar a comprar; como numa vitrine, quanto mais itens amontoados, menor o valor percebido. **Listagem:** o mínimo por item é nome conciso, foto grande o bastante para reconhecer o item, indicação de outras opções e preço. |
| H21 | pesquisa | Homepage UX: Featuring Product Breadth (Baymard; Edward Scott, 04/02/2014, atualizado em 10/04/2025) | https://baymard.com/blog/inferring-product-catalog-from-homepage | **Variedade:** mostrar pelo menos 40% dos tipos de produto (40% a 50% nos destaques do artigo). **Comportamento:** parte de quem não vê o tipo que procura supõe que o site não vende, e alguns vão embora. **Números:** 22% dos sites mostram variedade insuficiente. **Carrossel:** não basta sozinho para mostrar a variedade, porque a maioria não vê todos os slides. |
| H22 | pesquisa | 42% of Mobile Homepages Risk Setting Wrong Expectations for Their Users (Baymard; Christian Holst, 17/02/2016) | https://baymard.com/research-articles/mobile-homepage-usability | **Comportamento:** 70% rolaram a Home para ter uma visão geral. **Números:** 42% das Homes móveis não deixavam deduzir que tipo de site era; no desktop, 28% dos 50 maiores sites americanos. **Celular:** links de texto variados para as categorias resolveram o problema. **Evitar:** recolher as categorias atrás de um link "departamentos". |
| H23 | pesquisa | 3 High-Level UX Takeaways from 1100+ Hours of Testing Leading Food Delivery and Takeout Sites (Baymard; Edward Scott, 29/03/2022) | https://baymard.com/blog/food-delivery-takeout-launch | **Método:** mais de 1.100 horas e mais de 90 sessões qualitativas moderadas. **Sites:** Starbucks, Chipotle, Domino's e Panera Bread, e os agregadores DoorDash e Uber Eats. **Home:** algumas privilegiavam destaques e conteúdo com cara de anúncio em vez de ajudar a repetir pedidos. **Carrinho:** sem edição da personalização, muitos supunham que precisavam apagar o item e recomeçar. |
| H24 | pesquisa | Food Delivery & Takeout UX Benchmark 2026 (Baymard; Anders Nielsen, 13/08/2026) | https://baymard.com/blog/food-delivery-and-takeout-ux-benchmark-2026 | **Amostra:** 8 sites e apps (Just Eat, KFC, Uber Eats, Domino's, DoorDash, McDonald's, Deliveroo, Burger King), com mais de 390 parâmetros; nenhum chegou a "decente". **Problemas:** não há caminho da Home para os pedidos anteriores; a personalização não é descrita na página do item; orientação e caminho de volta falham em todas as etapas. **Recursos de delivery:** quase tudo o que é próprio do setor falta, com fluxos emprestados do varejo em geral. |
| H25 | pesquisa | Trustworthiness in Web Design: 4 Credibility Factors (NN/g; Aurora Harley, 08/05/2016) | https://www.nngroup.com/articles/trustworthy-design/ | **Estudo:** qualitativo e pequeno, em Singapura; confirma os 4 fatores de Nielsen (1999). **Qualidade do design:** sem erros de digitação nem links quebrados. **Transparência antecipada:** contato visível, custos básicos, taxas e políticas. **Conteúdo:** completo, correto e atual. **Ligação com o resto da web.** **Depoimentos:** os publicados pelo próprio site são lidos com ceticismo. |
| H26 | pesquisa | Stanford Guidelines for Web Credibility (B.J. Fogg, Stanford Persuasive Technology Lab, maio de 2002) | https://credibility.stanford.edu/guidelines/index.html | **Verificação:** facilitar a conferência das informações (diretriz 1). **Organização real:** mostrar que há uma por trás do site, e o endereço físico é o jeito mais simples (2). **Contato:** telefone, endereço e e-mail (5). **Atualização:** mostrar que o conteúdo é atualizado ou foi revisto (8). **Promoção:** contenção (9). **Erros:** evitar todos, inclusive de digitação e links quebrados (10). |
| H27 | pesquisa | Photos as Web Content (NN/g; Jakob Nielsen, 31/10/2010, revisto em 13/08/2026) | https://www.nngroup.com/articles/photos-as-web-content/ | **Eyetracking:** os usuários olham as fotos que trazem informação, como produtos detalhados e pessoas reais da empresa, e ignoram as genéricas e decorativas. **Ressalva:** os exemplos não trazem tamanho de amostra. |
| H28 | pesquisa | Banner Blindness Revisited: Users Dodge Ads on Mobile and Desktop (NN/g; Kara Pernice, 22/04/2018) | https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/ | **O que é pulado:** o que parece anúncio (animação, fundo colorido, formatação chamativa, texto dentro da imagem) e os lugares típicos de anúncio (topo e coluna da direita). **Celular:** uma seção com cara de anúncio foi pulada mesmo com informação útil. **Recomendação:** não fazer conteúdo parecer anúncio. |
| H29 | pesquisa | 'Contact Us' Page Guidelines (NN/g; Anna Kaley, 18/08/2019) | https://www.nngroup.com/articles/contact-us-pages/ | **Horário:** informar com o fuso. **Endereço:** com link que abre o mapa. **Link "Contato":** na navegação principal ou utilitária e no rodapé; os usuários olham o canto superior direito ou vão ao rodapé. **Prazos:** cumprir os prazos de resposta declarados. **Chat:** nunca o único canal, e dizendo se é robô. **Redes:** só com equipe que responda a tempo. |
| H30 | pesquisa | Footer Design Patterns (NN/g; Therese Fessenden, 24/02/2019) | https://www.nngroup.com/articles/footers/ | **Uso:** os usuários vão direto ao rodapé procurar o contato, e o rodapé é o último recurso para o que não acham. **Padrões:** links utilitários, navegação repetida, redes e dados da empresa. **Regra:** não esconder nem recolher o rodapé. **Rótulos vagos:** como "Recursos", podem confundir (o artigo não traz dado de teste). |
| H31 | documentação oficial | Local Business Structured Data (Google Search Central) | https://developers.google.com/search/docs/appearance/structured-data/local-business | **Obrigatórios:** `name` e `address`. **Recomendados:** `geo`, `menu` (URL do cardápio, para comida), `openingHoursSpecification`, `priceRange`, `servesCuisine`, `telephone` e `url`. **Meia-noite:** horário que a passa vai numa única especificação. **Sazonais e feriados:** horários sazonais e fechamentos usam `validFrom` e `validThrough`. |
| H32 | documentação oficial | Get Started with Maps URLs (Google for Developers) | https://developers.google.com/maps/documentation/urls/get-started | **Sintaxe:** a mesma em qualquer plataforma, sem chave de API. **Abertura:** no Android e no iOS, abre o app do Google Maps se instalado; senão, o navegador. **Parâmetros:** `api=1` em todo pedido e `query` na busca. |
| H33 | documentação oficial | Como usar o recurso de conversa por link (Central de Ajuda do WhatsApp) | https://faq.whatsapp.com/5913398998672934 | **Formato:** `https://wa.me/<número>`, com o número internacional completo, sem zeros, parênteses nem traços. **Exemplo errado da página:** traz "+", parênteses e traços. |
| H34 | referência técnica | `<a>`: The Anchor element (MDN) | https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a | **`tel:`:** varia com o aparelho; o celular disca, e outros sistemas usam um programa de chamadas, salvam o contato ou mandam o número para outro aparelho. **`mailto:`:** abre o programa de e-mail. **Nova aba:** link com `target="_blank"` deve avisar que abre uma, por exemplo "(abre em nova aba)". |
| H35 | pesquisa | 35 Data-Driven Ecommerce Best Practices (Baymard; Christian Holst, 09/12/2021, atualizado em 11/06/2026) | https://baymard.com/blog/ecommerce-ux-best-practices | **Carrinho:** no canto superior direito, com ícone ou botão contrastante e folga em volta, nunca só texto (diretriz 607). **Carrossel:** evitar o que gira sozinho na Home móvel; 52% dos sites e apps móveis fazem isso (957). **Chat:** cautela com chat fixo no celular, que costuma cobrir conteúdo (940). |
| H36 | praticante | The 13 Best Restaurant Websites You Can Learn From (Owner; Hengameh Stanfield; data visível 04/04/2026, publicação original de 2024 pelos metadados) | https://owner.com/blog/best-restaurant-websites | **Autor:** blog de quem vende sites para restaurantes, com interesse comercial. **Recomendações:** cardápio em texto rastreável, em vez de PDF ou imagem; botões de pedido sempre à mão; boas fotos de comida (pesquisa da própria empresa); notas ou depoimentos na Home. **Peso:** não sustenta afirmação sozinho. |
| H37 | pesquisa (página de apresentação) | Food Delivery & Takeout UX (Baymard) | https://baymard.com/industries/food-delivery-and-takeout-ux | **Conteúdo:** anuncia mais de 330 diretrizes de delivery, mais de 3.100 notas de desempenho e mais de 1.900 exemplos, sem reproduzir as diretrizes; tem links de login premium e de preços. **Uso:** serve só para a lacuna. |
| H38 | exemplo publicado | Five Guys | https://www.fiveguys.com/ | Exemplo dos padrões 1, 2, 3, 4 e 7. |
| H39 | exemplo publicado | Smashburger (rede americana homônima, sem relação com o projeto) | https://smashburger.com/ | Exemplo dos padrões 1, 2, 3, 4 e 7. |
| H40 | exemplo publicado | Bullguer | https://www.bullguer.com/ | Exemplo dos padrões 1, 2, 3 e 4. |
| H41 | exemplo publicado | Gott's Roadside | https://www.gotts.com/ | Exemplo dos padrões 1, 2 e 7. |
| H42 | exemplo publicado | Jeronimo Burger | https://www.jeronimoburger.com.br/ | Exemplo dos padrões 1, 3 e 7. |
| H43 | exemplo publicado | Z Deli | https://www.zdeli.com.br/ | Exemplo dos padrões 1, 5 e 6 e contraexemplo do 2. |
| H44 | exemplo publicado | Lanchonete da Cidade | https://www.lanchonetedacidade.com.br/ | Exemplo dos padrões 6 e 7. |
| H45 | exemplo publicado | Burger Joint (Nova York) | https://www.burgerjointny.com/ | Exemplo do padrão 5. |

## Padrões de página

Os exemplos são todos sites publicados (produtos no ar), de empresas diferentes. Nenhum é galeria, template ou mockup. "Estático" e "no cabeçalho" refletem o texto da página no fetch, e o comportamento visual não foi visto.

### 1. Ação de pedido no cabeçalho (recorrente: 6 exemplos)

Um botão ou link de pedido fica no cabeçalho, ao lado de poucos links (cardápio, lojas). Pelo fetch não dá para saber se o cabeçalho fica fixo durante a rolagem. No Smash Burger não há texto real de "Pedir agora": o equivalente é o link "Cardápio" e o carrinho com a contagem.

| URL | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://www.fiveguys.com/ | "Order Now" no cabeçalho, com The Menu e Locations na navegação | publicado | fiveguys.com |
| https://smashburger.com/ | botão "Order Now" à direita, junto de Sign In e Cart | publicado | smashburger.com |
| https://www.bullguer.com/ | botão "Pedir agora" para /delivery, ao lado de Cardápio e Lojas | publicado | bullguer.com |
| https://www.gotts.com/ | "Order Now" como último item do menu | publicado | gotts.com |
| https://www.jeronimoburger.com.br/ | "Peça Aqui Seu Delivery" no menu, com Cardápio e Restaurantes | publicado | jeronimoburger.com.br |
| https://www.zdeli.com.br/ | botões de iFood e WhatsApp na barra do topo | publicado | zdeli.com.br |

Fontes: [H14] (links visíveis), [H15] (barra persistente), [H35] (carrinho no canto superior direito), [H1] (peso visual das tarefas prioritárias).

### 2. Hero estático com uma ou duas ações (recorrente: 4 exemplos e 1 contraexemplo)

Uma imagem só, sem carrossel, com título e uma ou duas chamadas. É a alternativa que o Baymard e o NN/g recomendam no lugar do carrossel.

| URL | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://www.fiveguys.com/ | imagem fixa, com versões para desktop e celular, título curto e "Start Your Order" | publicado | fiveguys.com |
| https://smashburger.com/ | uma imagem, sem controles de carrossel no texto, e um botão para a novidade; acima, uma faixa de promoção que pode ser dispensada | publicado | smashburger.com |
| https://www.bullguer.com/ | título e duas chamadas (cardápio e lojas), sem controles de carrossel no texto | publicado | bullguer.com |
| https://www.gotts.com/ | uma imagem fixa, título e link "Our Story" | publicado | gotts.com |
| https://www.zdeli.com.br/ | contraexemplo: carrossel de 10 imagens, sem texto nem chamada nos slides | publicado | zdeli.com.br |

Fontes: [H6], [H7], [H8], [H4], [H1].

### 3. Atalhos para as categorias do cardápio (recorrente: 4 exemplos)

Uma grade ou faixa com as categorias, cada uma levando ao cardápio. Mostra a variedade da casa, como pedem o Baymard (pelo menos 40% dos tipos de produto) e o NN/g (exemplos concretos).

| URL | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://www.fiveguys.com/ | seção "The Food" com 7 categorias (Burgers, Fries, Shakes e outras) e link para o cardápio completo | publicado | fiveguys.com |
| https://smashburger.com/ | seção de cardápio com 9 categorias na Home (o menu do cabeçalho lista 11) | publicado | smashburger.com |
| https://www.jeronimoburger.com.br/ | três blocos (Burgers, Sobremesas, Bebidas), cada um com "Ver Cardápio" | publicado | jeronimoburger.com.br |
| https://www.bullguer.com/ | links para Burgers, Batatas, Sobremesas e Bebidas, abaixo dos destaques (exemplo visto na verificação) | publicado | bullguer.com |

Fontes: [H21], [H22], [H1].

### 4. Destaques do cardápio sem preço (recorrente: 3 exemplos; em tensão com a pesquisa)

Os sites destacam alguns itens sem mostrar o preço na Home. A pesquisa do NN/g põe o preço no mínimo de cada item de listagem [H20]. O Smash Burger tem o preço real de cada produto e pode mostrá-lo via `formatPrice`. Não encontrei pesquisa aberta sobre o preço nos destaques da Home de restaurante.

| URL | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://www.bullguer.com/ | três burgers em destaque, com ingredientes e uma frase curta, sem preço | publicado | bullguer.com |
| https://www.fiveguys.com/ | um milkshake em destaque com "Order Now", sem preço | publicado | fiveguys.com |
| https://smashburger.com/ | o hero destaca uma novidade sem preço; o corpo da Home não tem preço, e o único está no título da página ("a partir de" US$ 4,99) | publicado | smashburger.com |

Fontes: [H20], [H27], [H1].

### 5. Endereço, horário e contato na Home (2 exemplos; não é recorrente)

O endereço, com link de mapa, o horário ou o telefone aparecem na própria Home. Five Guys, Smashburger, Gott's e Bullguer não mostram horário nem endereço na Home, só o link para as lojas. Para uma casa de endereço único, a pesquisa de contato e de credibilidade favorece mostrar.

| URL | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://www.zdeli.com.br/ | cada unidade com endereço ligado ao Google Maps, horário e link "CARDÁPIO" (a padaria aparece sem horário) | publicado | zdeli.com.br |
| https://www.burgerjointny.com/ | endereço e telefone das 3 unidades no cabeçalho, cada uma com link de cardápio; sem horário | publicado | burgerjointny.com |

Fontes: [H29], [H26], [H25], [H32].

### 6. WhatsApp como canal de contato ou pedido (2 exemplos; não é recorrente)

Nos sites brasileiros lidos, o WhatsApp aparece como canal direto. O Baymard pede cautela com chat fixo na tela do celular [H35].

| URL | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://www.zdeli.com.br/ | botão de WhatsApp na barra do topo e encomenda de pão pelo WhatsApp | publicado | zdeli.com.br |
| https://www.lanchonetedacidade.com.br/ | link de WhatsApp perto do fim do conteúdo (o fetch não mostra se ele é flutuante) | publicado | lanchonetedacidade.com.br |

Fontes: [H33], [H35].

### 7. Rodapé com redes, links institucionais e legais (recorrente: 5 exemplos)

O rodapé repete a navegação e reúne as redes, os links legais e, às vezes, dados da empresa. O contato completo quase nunca aparece: o comum é só um link "Contato".

| URL | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://www.fiveguys.com/ | link "Contact Us", 7 redes, links legais, selos de app e copyright de 2026 | publicado | fiveguys.com |
| https://smashburger.com/ | três grupos de links, 5 redes, links legais e de acessibilidade; contato só como link | publicado | smashburger.com |
| https://www.gotts.com/ | 3 redes, navegação com Contact e FAQ, cadastro de e-mail | publicado | gotts.com |
| https://www.jeronimoburger.com.br/ | navegação secundária, links legais, CNPJ e dois endereços (cozinha central e sede) | publicado | jeronimoburger.com.br |
| https://www.lanchonetedacidade.com.br/ | unidades, links institucionais, 3 redes, meios de pagamento aceitos e política de privacidade | publicado | lanchonetedacidade.com.br |

Fontes: [H30], [H29], [H26].

## Catálogo de seções candidatas

"`dados.js`" é `src/direcoes/compartilhado/dados.js` (o `conteudo.js` do inventário). Contagens e menores preços são derivados que o inventário permite e sempre calculados.

| Seção | O que faz | Origem | Conteúdo real exigido (arquivo e campo) | Viável sem inventar? |
|---|---|---|---|---|
| Cabeçalho com marca, 3 links visíveis e carrinho | Marca à esquerda, com link para a Home; os três links visíveis também no celular (menos de 5, sem hambúrguer); carrinho com a contagem no canto superior direito. Se for fixo, opaco, baixo e sem animação. | [H14] [H15] [H35] [H17] [H1]; padrão 1 | `dados.js`: `MARCA`; `useLinksPrincipais.js`: Início, Cardápio, Entrar ou Perfil; `useContadorCarrinho.js`: contagem. Não há texto real de "Pedir agora"; o mais perto é `HERO.acao` ("Ver cardápio"). | Sim |
| Hero estático, sem ocupar a tela toda | Imagem fixa com título, texto (que já traz o horário) e uma ação. A altura deixa a seção seguinte aparecer acima da dobra, e o texto tem contraste no pior ponto da foto. | [H1] [H2] [H3] [H4] [H5] [H6] [H7]; padrão 2 | `dados.js`: `HERO.titulo`, `HERO.texto`, `HERO.acao`, `HERO.imagem`, `HERO.alt`, `IMAGEM_HERO` (WebP com alfa 480 e 960, PNG 960); `public/images`: `fundos/banner-burger-bg` e `banner-burger-black`. | Sim |
| Atalhos de categoria com contagem e "a partir de" | Três blocos ou links (Hambúrgueres, Bebidas, Sobremesas), cada um com a contagem e o menor preço calculados. | [H21] [H22] [H1]; padrão 3 | `dados.js`: `CATEGORIAS` (ou `categories` de `src/views/MenuView.vue`); `src/json/products.json`: `menuItems.foods`, `drinks` e `desserts`, campo `price` via `formatPrice`. Atenção: o `/menu` abre sempre em Hambúrgueres (`MenuView.vue`: `currentCategory = ref("foods")`, sem categoria na URL). | Sim, com ressalva: o atalho "Bebidas" não chega à aba de bebidas sem mudar o `MenuView`. A alternativa é mostrar os itens na própria Home. |
| Destaques do cardápio em grade ou faixa manual | Cards com foto, nome, descrição curta, preço e "Adicionar <nome>". Grade estática, ou faixa que não gira sozinha, com o item seguinte aparecendo, setas visíveis, teclado e no máximo 3 a 4 passos até o fim. | [H20] [H27] [H9] [H10] [H6] [H7] [H8] [H11] [H12]; padrão 4 | `products.json`: `menuItems.foods` (7 itens: `name`, `description`, `price`, `image`, `ingredients`); `dados.js`: `SECAO.anterior`, `SECAO.proximo`. "Adicionar <nome>" abre o Personalizar real. O título `SECAO.titulo` ("Mais pedidos") afirma uma popularidade sem dado; o rótulo real "Hambúrgueres" é neutro. | Sim |
| Como pedir em três passos | Faixa curta com o caminho real: escolher no cardápio, personalizar (adicionais, observação, quantidade) e pedir pelo carrinho. Dá a orientação que o Baymard viu faltar. | [H1] [H23] [H24] | `dados.js`: `FRASE_CARDAPIO` ("Escolha, personalize e peça."); o fluxo real do modal Personalizar, do carrinho e do `/menu`. A descrição de cada passo seria microcopy marcada `// provisório`. | Sim |
| Monte do seu jeito: adicionais com preço | Lista dos adicionais com preço, mostrando de antemão o que se pode personalizar, que o Baymard viu sem descrição nos sites de delivery. | [H24] [H23] | `products.json`: `foodAdditionals` (5: `name`, `price`) e `dessertAdditionals` (7); número de adicionais como derivado. | Sim |
| Um lanche em foco com os ingredientes | Um produto com foto grande, nome, preço e ingredientes; a foto real é conteúdo, não decoração. O título não sugere "o melhor" nem "o mais vendido". | [H27] [H1] [H20] | `products.json`: `menuItems.foods[n]`, com `name`, `price`, `image` (480, 960 e 1440, WebP e JPG) e `ingredients`. Título neutro e provisório. | Sim |
| Horário, endereço e contato | Bloco antes do rodapé com o horário em texto, o endereço com link para o Maps, o WhatsApp e o e-mail como links reais, e aviso de nova aba nos externos. | [H29] [H26] [H25] [H32] [H33] [H34] [H31]; padrões 5 e 6 | `dados.js`: `HORARIO`; `CONTATOS` (`endereco` com Maps `search` e `api=1`; `whatsapp` com `wa.me/` e só os dígitos do telefone; `email` com `mailto:`); `RODAPE.endereco` e `RODAPE.horario` como rótulos; `NOVA_ABA`. | Sim |
| Rodapé com contato, navegação repetida e redes | Repete os links principais, o contato e o horário, a descrição e o copyright, sem recolher. As redes só entram com o perfil real da loja. | [H30] [H29] [H26]; padrão 7 | `dados.js`: `DESCRICAO`, `RODAPE` (rótulos e copyright), `CONTATOS`, `HORARIO` e `REDES`. Os links de `REDES` são genéricos (`https://facebook.com` e `https://instagram.com`). | Sim, com as redes de fora até haver perfil real |
| Barra de navegação inferior no celular | Barra fixa com Início, Cardápio, carrinho com selo e Entrar ou Perfil, opaca e baixa, só para navegar. Escolher entre ela e o cabeçalho fixo, sem somar os dois. | [H15] [H16] [H17] [H18] [H19] | `useLinksPrincipais.js` e a contagem do carrinho; não precisa de texto novo. A diretriz da Apple é para app nativo. | Sim |
| Selo "Aberto agora" ou "Fechado" | Status calculado pelo relógio do aparelho. | [H31] [H26] [H25] | Só existe `HORARIO` em texto. Faltam feriados, exceções e o fuso da loja, e o horário passa da meia-noite (13h à 01h). O inventário não lista o status entre os derivados. | Não |
| Avaliações, notas e depoimentos | Prova social. | [H25] [H36] | Não existe (inventário, "O que NÃO existe"). O NN/g relata ceticismo com depoimentos publicados pelo próprio site. | Não |
| Informações de entrega (prazo, taxa, raio) | A transparência antecipada que o NN/g descreve. | [H25] [H24] | Não existe (inventário). | Não |
| Faixa de promoções, combos ou cupom | Banner de oferta. | [H28] [H26] [H8] | Não existe (inventário). | Não |
| Pedir de novo (últimos pedidos) | Atalho para os pedidos anteriores, cuja falta o Baymard aponta nos sites de delivery. | [H23] [H24] | Não está no inventário. O código tem `userStore.orderHistory` (lido em `src/views/auth/ProfileView.vue`, seção "Seus pedidos"), mas "pedir de novo" seria lógica nova, e o visitante novo não tem histórico. Fica para o orquestrador decidir. | Não, por ora |
| História da casa, equipe ou fotos do local | Seção de confiança. | [H27] [H26] | Não existe (inventário). | Não |
| Meios de pagamento aceitos | Faixa com bandeiras e Pix, como no rodapé de um dos exemplos. | padrão 7 ([H44]) | Não encontrei no inventário. | Não |

## Componentes típicos e estados

| Componente | Estados | Fontes |
|---|---|---|
| Botão de ação principal ("Ver cardápio", "Adicionar <nome>") | padrão; hover (só em `hover-capable`); foco visível com 3:1 contra o fundo; pressionado; alvo de pelo menos 24x24 px CSS, de preferência 44x44 nas ações principais; com movimento reduzido, sem `transform` | [H18] [H19] [H1] |
| Link de navegação do cabeçalho | padrão; hover; foco visível; página atual (`aria-current`); "Entrar" ou "Perfil" conforme a sessão | [H14] [H15] [H1] |
| Carrinho com contagem | vazio; com itens (número no selo); contagem atualizada depois do modal (que já anuncia); foco visível; nome acessível com a contagem | [H35] [H16] |
| Faixa ou carrossel manual de destaques | início (Anterior inativo, com `aria-disabled`); meio; fim (Próximo inativo, ou aviso de que volta ao início); item seguinte aparecendo na borda; botões que não movem o foco; rótulo de posição ("3 de 7"); sem rotação automática; com movimento reduzido, sem rolagem suave; deslize no toque, clique e teclado no desktop | [H9] [H10] [H11] [H12] [H13] [H6] [H7] |
| Card de produto | padrão; hover (só em `hover-capable`); foco no "Adicionar"; imagem carregando (espaço reservado na proporção); imagem que falha (o `alt` continua); nome ou descrição longos (corte em linhas); produto alterado ou removido no painel | [H20] [H27] |
| Atalho de categoria | padrão; hover; foco visível; contagem e "a partir de" calculados; categoria vazia depois de edição no painel (esconder o atalho, ou usar o texto real do `MenuView`, "Nada nesta categoria por enquanto") | [H21] [H22] |
| Link de contato (Maps, WhatsApp, e-mail) | padrão; foco visível; externo com "(abre em nova aba)" no nome acessível; no celular abre o app (Maps, WhatsApp), no desktop a versão web ou o programa de e-mail; alvo de pelo menos 24 px, mesmo em lista | [H32] [H33] [H34] [H29] [H18] |
| Barra de navegação inferior (celular) | item atual; demais itens; selo do carrinho; foco visível; teclado virtual aberto (não cobrir campos); área segura do aparelho; opaca, sem animação de entrada (ou até 300 a 400 ms, só em `motion-ok`). A Apple usa barra translúcida (Liquid Glass) no iOS nativo, e o NN/g pede cabeçalho fixo opaco na web: aqui vale a opacidade. | [H16] [H17] [H15] [H19] |
| Cabeçalho fixo | no topo; rolado (opaco, sem translucidez); reaparece ao rolar para cima (opcional, de 300 a 400 ms, só em `motion-ok`); baixo, com alvos de 1 cm | [H17] |
| Hero | imagem carregando; pior caso de contraste do texto sobre a foto; tela estreita (texto fora da foto, ou com sobreposição); seção seguinte visível acima da dobra; com movimento reduzido, sem animação de entrada | [H5] [H3] [H4] [H2] |

## Riscos de acessibilidade e desempenho

- **"Mais pedidos" sem dado:** o título real afirma uma popularidade que o inventário diz não existir (número de pedidos). A pesquisa de credibilidade pede conteúdo correto e fácil de conferir [H25] [H26]. O rótulo real "Hambúrgueres" é uma alternativa neutra.
- **Redes genéricas:** `REDES` aponta para `https://facebook.com` e `https://instagram.com`, e não para o perfil da loja. Na prática é um link que não leva aonde promete, e erros desse tipo minam a credibilidade [H26] [H25]. Mostre as redes só com o perfil real, ou deixe-as de fora.
- **Carrossel que gira sozinho:** no celular não há hover para pausar [H6] [H35], a oferta fica visível só parte do tempo e parece anúncio [H8]. Sem controle de pausa, falha no 2.2.2, de nível A [H12].
- **Passos demais:** os 7 lanches num carrossel de um item por vez dão 6 deslizes até o fim, acima dos 3 a 4 recomendados [H9]. Use 2 por vez no celular, uma grade ou uma lista.
- **Hero de tela cheia:** empurra o cardápio para baixo da dobra e cria um falso fim de página [H3]; a atenção cai bruscamente depois da primeira tela [H2], e a imagem dominante esconde os pontos de partida [H4].
- **Contraste sobre a foto:** o texto do hero pode perder contraste no ponto mais claro do hambúrguer. Meça no pior caso e use sobreposição ou fundo atrás do texto [H5].
- **Selo "aberto agora":** um selo calculado pode mentir. O horário passa da meia-noite (13h à 01h), não há dado de feriado nem de exceção, e o relógio e o fuso são os do visitante. O Google trata o horário depois da meia-noite e o fechamento sazonal como casos à parte [H31].
- **Contatos não conferidos:** os links executam uma ação real. O `wa.me` abre conversa com quem tiver aquele número [H33], e o `mailto:` abre o e-mail [H34]. O projeto não tem link `tel:` (se ganhar um, o celular disca [H34]). Não conferi se o número e o e-mail do inventário existem nem a quem pertencem; um contato inexistente ou de terceiros leva o cliente a lugar errado.
- **Atalho que não cumpre o rótulo:** um atalho "Bebidas" que cai em Hambúrgueres quebra a expectativa que o rótulo cria [H1]. O `/menu` abre sempre em `foods`, e a categoria não vai na URL.
- **Cardápio editável:** no painel, nome, preço e imagem mudam, e um produto pode sumir. Contagens, "a partir de" e destaques escritos à mão ficam errados; tudo precisa sair do catálogo, e uma categoria pode ficar vazia [H25] [H26].
- **Duas barras fixas:** cabeçalho e barra inferior fixos juntos tomam tela no celular. O cabeçalho fixo só se justifica se servir ao usuário, e deve ser opaco e baixo [H17].
- **Botão flutuante de WhatsApp:** pode cobrir conteúdo e alvos no celular; o Baymard pede cautela com chat fixo na tela [H35].
- **Cara de anúncio:** seções com animação, fundo muito colorido ou texto dentro de imagem passam por anúncio e são puladas, inclusive no celular [H28] [H1].
- **Promessa sem detalhe:** o hero diz "entregue quente", mas não há prazo, taxa nem raio de entrega para informar. O usuário valoriza custos e condições de antemão [H25]. Não os invente: a Home pode deixar de prometer o que não detalha.
- **Desempenho:** não abri nesta execução nenhuma fonte de desempenho (LCP do hero, peso de imagem). Os riscos de desempenho ficam sem fonte (ver "Não encontrei").

## Não encontrei

- **Home de endereço único:** pesquisa aberta do NN/g ou do Baymard específica sobre a Home de restaurante de um endereço só. A página do setor no Baymard [H37] anuncia mais de 330 diretrizes de delivery, mas não as reproduz e não diz quais são pagas. Usei como aproximação as diretrizes de Home de comércio eletrônico, de contato e de confiança.
- **Horário e endereço:** estudo sobre onde o cliente de delivery procura essas informações na Home, ou sobre o efeito de um selo "aberto agora".
- **Telefone clicável:** recomendação do NN/g sobre o `tel:`; só a MDN descreve o comportamento [H34].
- **Barra inferior em site:** pesquisa sobre a barra inferior na web. A diretriz da Apple [H16] é para apps nativos, e a do Material 3 (m3.material.io) não foi tentada, porque só abre com JavaScript.
- **Contato e confiança:** estudo que meça o efeito isolado de mostrar endereço, horário ou contato em sites de restaurante. As fontes de confiança são gerais (Stanford, 2002; NN/g, 2016).
- **Preço nos destaques:** pesquisa aberta sobre mostrar ou não o preço nos destaques da Home de restaurante. Os sites lidos o omitem, e o NN/g o põe no mínimo da listagem [H20].
- **Desempenho:** fonte sobre o peso da imagem do hero, o LCP e o carregamento de fotos na Home de restaurante.
- **Visual dos exemplos:** os exemplos foram lidos por fetch, que entrega o texto e não o visual; os de galeria ficaram com o agente do Chrome.
- **Fornecedores:** os resumos de busca de blogs de fornecedores (Toast, Square, ChowNow, Popmenu) não foram abertos e não sustentam nada aqui.
- **Contatos do inventário:** se o número de WhatsApp e o e-mail existem ou a quem pertencem.

## Não abriu

| URL | Motivo |
|---|---|
| https://shakeshack.com/ | HTTP 403 (reaberto na verificação, de novo 403) |
| https://www.burgerking.com.br/ | HTTP 403 (reaberto na verificação, de novo 403) |
| https://www.themonstervegan.com/ | HTTP 403, segundo o pesquisador (não reaberto) |
| https://www.quevidatacos.com/ | HTTP 403, segundo o pesquisador (não reaberto) |
| https://www.in-n-out.com/ | conteúdo vazio, página em JavaScript (reaberto, de novo vazio) |
| https://www.madero.com.br/ | erro de DNS, EAI_AGAIN (reaberto, mesmo erro) |
| https://www.auchevalchicago.com/ | erro de DNS, ENOTFOUND, segundo o pesquisador (não reaberto) |
| https://hodadies.com/ | abre, mas é um aviso de mudança de site, sem cardápio, horário nem endereço; não usado |
| https://www.talatmarketatl.com/ | abre, mas sem horário nem endereço (o contato está marcado como em breve), ao contrário do que o blog [H36] dá a entender; não usado |
| Figma Community, Behance, lapa.ninja, uxdesign.cc, medium.com, axesslab.com, Dribbble, webflow.com, m3.material.io | bloqueados ou só com JavaScript, conforme a lista prévia; não tentados |

## Refutadas na verificação

- **A7 (46%, Baymard, [H6]):** a fonte do número não é a "análise comparativa"; a página o atribui aos testes em larga escala, e o benchmark só sustenta os 33% de sites com carrossel.
- **A7 (rotação, [H6]):** "a rotação para de vez" foi derrubado; a página diz que ela para depois da interação, mesmo sem hover, sem dizer que para para sempre.
- **A11 ([H10]):** "quase ninguém usa a rolagem lateral" foi derrubado; a página diz que os usuários não a adotaram, sem esse quantificador.
- **A15 ([H14]):** a atribuição dos números estava errada. Os 15% a mais de tempo valem só no celular e em comparação com a navegação combinada (no desktop, pelo menos 39%), e a queda de mais de 20% na descoberta vale para os dois aparelhos, não só para o celular.
- **A18 ([H17]):** "só vale se o usuário precisar dele com frequência" é mais estreito que o artigo, que pede que o cabeçalho sirva a um propósito e pergunta se os elementos são necessários com frequência ou em algum momento da sessão.
- **A21 ([H20]):** "foto grande" foi derrubado; o mínimo é uma foto grande o bastante para reconhecer o item, e a lista também inclui a indicação de outras opções.
- **A22 ([H21]):** "e vai embora" exagera; a página diz que alguns saem e muitos continuam pela navegação ou pela busca.
- **A28 ([H27]):** "para listagem, a recomendação são fotos específicas de cada produto" foi derrubado; o artigo não traz essa recomendação explícita.
- **Exemplo smashburger.com, padrão 3:** "11 categorias" foi corrigido; a Home mostra 9, e 11 é a lista do menu do cabeçalho.
- **Exemplo lanchonetedacidade.com.br, padrão 4:** saiu do padrão; a seção "Destaques do cardápio" é um texto com um botão "Saiba mais" para um cardápio externo e não mostra itens com foto e nome.
- **Exemplo lanchonetedacidade.com.br, padrão 2:** saiu do padrão; o texto da página não permite confirmar que o banner é estático.
- **Exemplo lanchonetedacidade.com.br, padrão 6:** "botão flutuante" foi derrubado; há um link de WhatsApp perto do fim, mas o fetch não mostra se ele flutua.
- **Lacuna sobre o Baymard ([H37]):** "as diretrizes são pagas; a página só lista os temas" foi derrubado. A página não diz o que é pago (só tem links de login premium e de preços) e traz mais que uma lista de temas.
- **Risco do WhatsApp flutuante:** "como o de um dos exemplos" saiu, porque o exemplo não se confirmou como flutuante.
- **Risco dos contatos:** "no celular, o tel: disca" não se aplica ao projeto, que não tem link `tel:`; os contatos são `wa.me` e `mailto:`.
