# Pesquisa da rodada 2: Esqueumorfismo

Pesquisa feita em 20/11/2026 para a Home nova do esqueumorfismo. Um pesquisador levantou 31 afirmações, 7 padrões de página e um catálogo de seções. Depois, um verificador reabriu cada URL com WebFetch e tentou derrubar cada afirmação e cada exemplo, e este dossiê guarda só o que sobreviveu. As correções de detalhe e o que caiu estão em "Refutadas na verificação". O dossiê continua a seção "Esqueumorfismo" da rodada 1 (`docs/direcoes/PESQUISA.md`, linhas 105 a 129), que usou as fontes [E1] a [E14]. A numeração segue a partir de [E15]. As fontes [E1], [E6], [E9] e [E13] da rodada 1 foram reabertas nesta verificação e mantêm o número. Como na rodada 1, galeria, template e site de exemplo servem só para ilustrar um padrão abstrato. Nenhuma imagem, ícone ou layout foi baixado nem copiado. Os textos da loja citados no catálogo estão em `src/direcoes/compartilhado/dados.js`, que na árvore de trabalho atual substitui o `conteudo.js` citado no inventário.

## Fontes

| nº | tipo | título | URL | o que sustenta |
|---|---|---|---|---|
| [E1] | pesquisa | Skeuomorphism (NN/g, Megan Chan, 15/03/2024), rodada 1, reaberta | https://www.nngroup.com/articles/skeuomorphism/ | Separa dois sentidos do termo: o auxílio de aprendizado (elemento ou fluxo modelado num objeto real) e a tendência visual de realismo desnecessário. Lista como contras a poluição visual, o carregamento mais lento (texturas e sombras pedem mais processamento gráfico), interações desajeitadas no digital e o visual que envelhece. Caso da Pizza Hut: o app pedia para inclinar o celular para espalhar as coberturas, e as pessoas não ligavam o gesto à escolha. O artigo diz que o estilo reduz a curva de aprendizado de interações novas, mas não diz quando usá-lo hoje. |
| [E6] | pesquisa | Liquid Glass Is Cracked, and Usability Suffers in iOS 26 (NN/g, Raluca Budiu, 10/10/2025), rodada 1, reaberta | https://www.nngroup.com/articles/liquid-glass/ | Texto sobre foto perde contraste. Controles translúcidos se misturam ao conteúdo e passam despercebidos (ícones do Maps sobre fotos de comida, barra de busca pálida). A animação constante (botões que pulsam, abas que se mexem) vira distração com o uso repetido. |
| [E9] | pesquisa | Flat UI Elements Attract Less Attention and Cause Uncertainty (NN/g, Kate Moran, 03/09/2017), rodada 1, reaberta | https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/ | Eyetracking com 71 usuários, em 9 páginas reais de 6 domínios, cada uma em duas versões quase idênticas. Com sinais fracos, as pessoas levaram 22% mais tempo e fizeram 25% mais fixações, e as duas diferenças foram significativas. O flat funcionou com pouca densidade de informação, layout tradicional e alvos de alto contraste. |
| [E13] | referência técnica | WCAG 2.1, Understanding 1.4.11 Non-text Contrast, rodada 1, reaberta | https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast | Pede 3:1 (AA) para o que identifica um componente e o estado dele, e isso inclui o indicador de foco; o componente inativo fica isento. O hover acrescentado pelo autor não precisa de 3:1, mas não pode reduzir o contraste. O botão só de texto não precisa de borda. |
| [E15] | pesquisa | Beyond Blue Links: Making Clickable Elements Recognizable (NN/g, Hoa Loranger, 08/03/2015) | https://www.nngroup.com/articles/clickable-elements/ | O efeito 3D está entre os sinais de clique mais fortes. O botão mantém a forma retangular, de preferência com cantos arredondados, e uma borda fina também indica clique. Não se dá cara de botão ao que não se clica (títulos com fundo colorido, no exemplo da GNC), e elementos semelhantes recebem o mesmo tratamento. Num estudo antigo (teste de usabilidade da Sun, 1995), os cliques subiram 416% com botões 3D no lugar dos planos; o artigo diz que hoje o efeito é menor, mas ainda grande. |
| [E16] | pesquisa | Long-Term Exposure to Flat Design (NN/g, Kate Moran, 08/11/2015) | https://www.nngroup.com/articles/flat-design-long-exposure/ | Nas funções principais, o hover não deve ser o único jeito de revelar o sinal de clique. Quando a estética tira os sinais, o retorno precisa ser forte e imediato. Cita 0,1 s como o limite para a resposta ao clique parecer instantânea. |
| [E17] | pesquisa | Mental Models and User Experience Design (NN/g, Megan Chan, 26/01/2024, revisto em 01/09/2026) | https://www.nngroup.com/articles/mental-models/ | Lei de Jakob: as expectativas vêm dos outros sites. O carrinho deve ter só o que a pessoa escolheu (o exemplo é um seguro de envio incluído sozinho). Um padrão novo só vale se for claramente melhor. O esqueumorfismo aparece como um jeito de ajudar o usuário a se acostumar com estilos de interação novos. |
| [E18] | autor do estilo | Apple HIG, Buttons (mudança mais recente em 16/12/2025) | https://developer.apple.com/design/human-interface-guidelines/buttons.md | Região de toque de pelo menos 44×44 pt. Todo botão personalizado tem estado pressionado; sem ele, o botão parece não responder. Um ou dois botões proeminentes por vista, e a opção preferida se distingue pelo estilo, não pelo tamanho. No iOS e no iPadOS, a ação que não termina na hora mostra um indicador de atividade dentro do botão. |
| [E19] | referência técnica | MDN, forced-colors | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors | Com `forced-colors: active`, `box-shadow` e `text-shadow` viram `none`, e `background-image` vira `none` quando não vem de `url()`. Disso se deduz que os degradês somem, embora a página não os cite. As cores passam a ser as do sistema (`ButtonText` num `button`). A página troca a sombra por uma borda (`2px ButtonText solid`, no exemplo) e desaconselha um design paralelo. `forced-color-adjust: none` desliga as cores forçadas e a placa de fundo do texto. A lista de propriedades forçadas não inclui `mask`. |
| [E20] | referência técnica | Stick to Compositor-Only Properties and Manage Layer Count (web.dev, Paul Lewis) | https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count | Só `transform` e `opacity` evitam layout e pintura. As animações fora do compositor dão mais trabalho e podem engasgar em celular fraco ou com o thread principal ocupado. Cada camada custa memória, e as texturas das camadas disputam a banda entre CPU e GPU. |
| [E21] | referência técnica | WCAG 2.2, Understanding 2.5.8 Target Size (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | Pede alvos de pelo menos 24×24 px CSS (AA), com exceção por espaçamento e para links dentro de frases. Define o alvo como a região que aceita a ação do ponteiro. Não fala de sombra nem de chanfro decorativo. |
| [E22] | referência técnica | WCAG, F83 (texto sobre imagem de fundo) | https://www.w3.org/WAI/WCAG21/Techniques/failures/F83 | É uma falha de 1.4.3 e 1.4.6. O teste rápido compara o texto escuro com a parte mais escura do fundo, ou o claro com a mais clara. Se esse teste falhar, confere-se o fundo de cada letra. |
| [E23] | referência técnica | WCAG 2.2, Understanding 1.4.1 Use of Color | https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | Nível A: a cor não pode ser o único meio visual de passar uma informação ou um estado, como no caso do verde válido e do vermelho inválido. Outros meios: texto, forma, ícone, padrão. |
| [E24] | referência técnica | WCAG 2.2, Understanding 2.3.3 Animation from Interactions | https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html | Nível AAA: o movimento disparado pela interação deve poder ser desligado, salvo se for essencial. Cita a rolagem e a paralaxe como exemplos. Técnica C39 (`prefers-reduced-motion`). |
| [E25] | referência técnica | WCAG 2.2, Understanding 2.2.2 Pause, Stop, Hide | https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html | Nível A: o conteúdo que se move sozinho por mais de 5 s ao lado de outro conteúdo, como um ticker, precisa de pausa, parada ou ocultação. Parar só enquanto o foco ou o mouse está nele não basta. Um controle único para tudo o que se move é recomendado, não exigido. |
| [E26] | referência técnica | MDN, prefers-reduced-transparency | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency | Detecta o pedido do sistema para reduzir efeitos translúcidos. A página o marca como experimental e fora do Baseline. |
| [E27] | referência técnica | MDN, prefers-contrast | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast | Aceita `more`, `less`, `custom` (que corresponde à paleta do `forced-colors: active`) e `no-preference`. Está amplamente disponível desde maio de 2022. |
| [E28] | referência técnica | Optimize Largest Contentful Paint (web.dev, Philip Walton e Barry Pollard, 30/04/2020, atualizado em 31/03/2025) | https://web.dev/articles/optimize-lcp | A imagem da LCP precisa ser descobrível no HTML. O `fetchpriority="high"` vai em uma ou duas imagens, no máximo, e a imagem da LCP nunca recebe lazy-load. Pede formatos modernos no tamanho certo. A meta é LCP de até 2,5 s em pelo menos 75% das visitas. |
| [E29] | praticante | Mozilla Bugzilla 1879590 (relato de usuário, UNCONFIRMED) | https://bugzilla.mozilla.org/show_bug.cgi?id=1879590 | Um usuário relata que, no Firefox 122 com Fedora Linux, a rolagem fica muito lenta com um filtro SVG `feDisplacementMap` sobre uma `div` do tamanho da viewport, com quase todo o custo em repintura. No Chromium, a mesma página roda liso. É um relato isolado, não uma medida. A descrição não fala do `feTurbulence`, mas um comentário posterior liga uma discussão externa sobre ele, que não foi aberta. |
| [E30] | referência técnica | MDN, Autoplay guide for media and Web Audio APIs | https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay | O áudio iniciado por código numa aba sem interação do usuário costuma ser bloqueado; a interação com o site (clique, toque, tecla) está entre as condições que liberam o som. O `play()` devolve uma promessa que, recusada com `NotAllowedError`, deve levar a uma interface para a pessoa iniciar o som. |
| [E31] | documentação oficial | Square, Get started with Square KDS (Android) | https://squareup.com/help/us/en/article/7944-get-started-with-square-kds-android | O ticket tem itens e modificadores, e cada opção de modificador pode ter cor de texto própria. Os cronômetros amarelo e vermelho entram depois de minutos configurados. Dá para concluir ou chamar de volta (recall) um ticket ou um item. A tela aceita de 4 a 10 colunas e tamanho de texto ajustável. |
| [E32] | documentação oficial | GoTab, KDS Ticket Timer | https://docs.gotab.io/operator/kds-printers-additional-display-setup/kds-ticket-timer/ | Cores do cronômetro: cinza para o pedido recém-feito, amarelo para o que está perto do prazo, vermelho para o atrasado e verde para o concluído e despachado. O amarelo foi ajustado para ganhar contraste. A página não diz se o tempo aparece também em número. |
| [E33] | documentação oficial | Bank of America Merchant Services, Kitchen Display Order Management | https://merchanthelp.bankofamerica.com/Kitchen-Display-Order-Management | O ticket chega azul e fica amarelo e depois vermelho ao passar dos limites. Mostra o tipo de pedido (Delivery entre as opções), a marca "Not Paid" nos pedidos on-line não pagos e o número usado para chamar o cliente no balcão. Os itens enviados depois vêm sob um separador ADD-ON. A cozinha marca cada item, e o ticket sai da tela quando todos estão marcados; um ticket que saiu por engano volta pela aba Bumped. |
| [E34] | praticante | Fancy CSS Borders Using Masks (CSS-Tricks, Temani Afif, 26/01/2022) | https://css-tricks.com/css-borders-using-masks/ | A borda serrilhada sai de uma `mask` com `conic-gradient` repetido ao longo do lado, sem elementos extras. O autor avisa que degradês têm serrilhado de anti-aliasing (sobretudo no Chrome) e suaviza a parada de cor com 1deg. O artigo não fala de desempenho nem de acessibilidade. |
| [E35] | praticante | Metaphor in UX Design (Jakob Nielsen, Substack, 14/08/2025) | https://jakobnielsenphd.substack.com/p/metaphor | A metáfora útil mapeia relações de função, não a aparência; um só ponto de comparação não basta. A estante de madeira gastava espaço com ornamento. A metáfora que importa as limitações físicas cobra uma "taxa" do usuário. Recomenda ajudar o iniciante e deixar a metáfora recuar, com atalhos e uma saída para controles neutros. É um ensaio, sem dados novos. |
| [E36] | imprensa | Domino's iPad Ordering App (Communication Arts; CP+B com a Detroit Labs; lançamento em abril de 2014) | https://www.commarts.com/project/22935/domino-s-ipad-ordering-app | A equipe queria uma pizza 3D apetitosa, sem cara de desenho nem de borracha, e se dividiu entre foto e 3D. O melhor resultado veio de fotos simples usadas como mapa de textura dos modelos 3D, e foi preciso equilibrar o tempo de carga com a potência dos vários iPads. |
| [E37] | imprensa | Domino's launches its iPad pizza ordering app (TechCrunch, Frederic Lardinois, 24/04/2014) | https://techcrunch.com/2014/04/24/dominos-launches-its-ipad-pizza-ordering-app-with-3d-custom-pizza-builder | O construtor usava OpenGL para uma prévia mais realista. O texto avisa que, como em toda foto de comida, a pizza entregue fica bem diferente da prévia. O app tinha cupons e rastreio do pedido. |
| [E38] | imprensa | This unreal website embraces the most notorious UX design trend (Fast Company Middle East, Elissaveta M. Brandon, 12/10/2022) | https://fastcompanyme.com/?p=9768 | A landing da The Last Agency era uma imagem de aço arranhado e escovado em tela cheia: a luz deslizava no metal com o cursor, e a tipografia reagia à mesma luz. A designer, Talia Cotton, defende que o realismo transmite confiança a uma marca nova e que o comportamento deve acompanhar o visual. Para ela, o efeito perde sentido fora da tela. |
| [E39] | galeria | Framer Marketplace, GRIDDLE | https://www.framer.com/marketplace/templates/griddle/ | Template gratuito de hamburgueria e diner. Tem um hero com título alto e estreito, recorte de hambúrguer, adesivos que se movem com o mouse e faixa móvel. O ORDER NOW abre um painel com apps de entrega, ligação e rota, que no celular vira bottom sheet. O cardápio tem filtros de categoria fixos. Um bloco de recibo aparece com a rolagem, com data e hora, código de barras e carimbo de pago. Há uma pilha de fotos clicável, e o template respeita o movimento reduzido. |
| [E40] | galeria | GRIDDLE, prévia | https://gribble.framer.website/ | No recibo: mesa e garçom, itens que são frases de marca, total figurativo, carimbo PAID e um botão para imprimir de novo; a data aparece como espaço reservado no texto. No hero, uma faixa de itens do cardápio separados por estrelas. Há frases curtas em tom de adesivo, sem autoria. O manifesto é um parágrafo curto, e a pilha de fotos não aparece no texto. |
| [E41] | galeria | Framer Marketplace, QR MenuSlip | https://www.framer.com/marketplace/templates/qr-menuslip/ | Template pago (US$ 39) de cardápio digital aberto por QR. O "(+)" nos pratos põe o item no carrinho, e o total corrente aparece na barra do pedido; a página não diz se a barra é fixa. O resumo do pedido pode ser baixado como PNG em forma de recibo de borda rasgada. O autor não é nomeado de forma explícita. |
| [E42] | galeria | QR MenuSlip, prévia | https://qrmenuslip.framer.website/ | O texto mostra o título, as categorias e as seções de sopas e saladas. A barra do pedido e o recibo não aparecem no texto. |
| [E43] | galeria | Kombai Gallery, Marcy's | https://kombai.com/gallery/inspirations/marcy-s/ | Produto declarado fictício. O cardápio tem linha pontilhada e chip de preço. O pedido mostra os passos ao lado de um recibo perfurado em cima e embaixo, com uma etiqueta "ding!" girada. Há uma doca fixa com sacola, contagem, total corrente e botão de pedir. O fundo é papel claro com grão em sobreposição, com bordas de 2 px quase pretas e sombra dura deslocada no hover. Uma faixa de largura total anda sem parar e acelera com a rolagem. A página chama o recibo de "vivo" sem explicar como ele se atualiza. |
| [E44] | galeria | One Page Love, tag Skeuomorphism | https://onepagelove.com/tag/skeuomorphism | Anuncia 21 exemplos e mostra 8 na primeira página (Sunstill, Txt Text Editor, Postaway, Allagi, Victoria Lavine, Artem Astakhov, Arrow Dynamics, AuthKit). Nenhum tem a etiqueta Restaurante. |
| [E45] | galeria | One Page Love, estilo Skeuomorphism, página 2 | https://onepagelove.com/style/skeuomorphism/page/2 | Mostra outros 8 sites, diferentes dos da primeira página. Nenhum nome sugere comida, e as etiquetas não foram conferidas. |
| [E46] | galeria | Receiptify (site no ar, só como exemplo) | https://receiptify.herokuapp.com/ | Gera um recibo com o que a pessoa mais ouve (faixas, artistas, gêneros) e deixa escolher o período, o tamanho da lista (10 ou 50) e a fonte. |
| [E47] | galeria | One Page Love, Postaway | https://onepagelove.com/postaway | Descreve uma landing com cartões postais e selos arrastáveis, num clima de mesa de colecionador. |
| [E48] | galeria | Postaway (site no ar, só como exemplo) | https://www.postaway.space | Só devolveu o título (envio de cartão postal antigo pela internet). |
| [E49] | galeria | Victoria Lavine (site no ar, só como exemplo) | https://www.victorialavine.com | Site de uma autora de romances com imagens de fita washi e adesivos decorativos, uma faixa repetida de elogios e outra de palavras separadas por estrelas. O texto não mostra se as faixas andam. |
| [E50] | galeria | One Page Love, Victoria Lavine | https://onepagelove.com/victoria-lavine | Estilos Fun, Illustrative e Skeuomorphism; etiquetas Torn Paper e Draggable; seção Marquee; fontes Courier Prime, Moontime e New Kansas. |
| [E51] | galeria | One Page Love, Sunstill | https://onepagelove.com/sunstill | Papel de parede ao vivo, com a luz do sol numa parede seguindo o sol real. A página tem persianas para escolher a luz e um painel translúcido, nos estilos Glassmorphism e Skeuomorphism. |
| [E52] | galeria | Sunstill (site no ar, só como exemplo) | https://sunstill.app/ | Página de app de Mac com compra e download. A luz do sol na parede acompanha o sol do lugar, do amanhecer à noite, e há uma prévia rotulada "Blinds". |
| [E53] | galeria | One Page Love, Txt Text Editor | https://onepagelove.com/txt-text-editor | A landing recria um desktop de Mac, com controles de janela e barras de ferramentas translúcidas, nos estilos Minimal e Skeuomorphism. O app está marcado como "em breve". |
| [E54] | galeria | Txt (site no ar, só como exemplo) | https://adrien.website/txt/ | O texto mostra só o nome, a frase de descrição e o aviso de lançamento em breve; o resto é uma imagem embutida. |
| [E55] | galeria | Legacy iOS UI Kit | https://legacy-ios-ui-kit.vercel.app/ | Kit gratuito do Figma que recria o iOS 6, com 153 telas, 19 elementos de sistema, 12 texturas de material e 15 apps de sistema. |
| [E56] | galeria | The Last Agency (site atual, só como exemplo) | https://thelast.agency/ | O texto mostra uma grade de imagens, os serviços e os clientes de uma agência de marca e RP em Nova York e Paris. Não descreve efeitos visuais. |
| [E57] | galeria | Teenage Engineering, OP-1 field | https://teenage.engineering/products/op-1 | Página de loja de um sintetizador. Os botões e os knobs descritos são do aparelho; no texto, a página não tem controle esqueumórfico na web. |

## Padrões de página

### 1. Recibo ou cupom de papel como bloco da página (recorrente, com 4 exemplos independentes)

- **Descrição:** um recibo térmico, ou um papel de borda rasgada ou perfurada, resume algo na página. Pode resumir o pedido, como peça funcional, ou a marca, como decoração.
- **Exemplos:** três são templates de comida; o único publicado é de música.
- **Qual uso se sustenta:** pela NN/g [E1] e pelo ensaio de Nielsen [E35], só o uso funcional, porque a metáfora útil mapeia função e não só aparência. No GRIDDLE, os itens do recibo são frases de marca e o total é figurativo [E40]. No QR MenuSlip, o recibo é o resumo do pedido de verdade [E41].
- **Técnica:** a borda serrilhada sai de uma `mask` com `conic-gradient` [E34]. A lista de propriedades que o `forced-colors` força não inclui `mask` [E19], então, pela página, o recorte fica. Isso é inferência e não foi testado. A sombra, essa sim, some [E19].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://gribble.framer.website/ | Recibo com mesa, garçom, frases de marca no lugar dos itens, total figurativo, carimbo PAID e botão para imprimir de novo [E40]. Pelo marketplace, o bloco aparece com a rolagem, com data e hora e código de barras [E39]. | Conceito (template gratuito) | Comida (hamburgueria e diner) |
| https://www.framer.com/marketplace/templates/qr-menuslip/ | Resumo do pedido baixado como PNG em forma de recibo de borda rasgada (descrição do marketplace; a prévia não mostrou, no texto) [E41][E42] | Conceito (template pago) | Comida (cardápio por QR) |
| https://kombai.com/gallery/inspirations/marcy-s/ | Recibo perfurado em cima e embaixo, ao lado dos passos do pedido, com etiqueta "ding!" girada [E43] | Conceito (produto fictício declarado) | Comida (diner) |
| https://receiptify.herokuapp.com/ | Recibo gerado com as músicas mais ouvidas, com escolha de métrica, período, tamanho da lista e fonte [E46] | Publicado (site no ar) | Música (fora de comida) |

- **Fontes:** [E1][E19][E34][E35][E39][E40][E41][E42][E43][E46].

### 2. Barra do pedido com o total corrente (2 exemplos; não é recorrente)

- **Descrição:** uma barra acompanha a pessoa com o total do pedido e leva a ele. Os dois exemplos são templates de comida, e nenhum é publicado.
- **Fixa:** só o Marcy's diz que a barra é fixa.
- **Relação com o estilo:** o padrão em si não é esqueumórfico, mas é o par funcional do recibo, porque o carrinho deve conter só o que a pessoa escolheu [E17].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://www.framer.com/marketplace/templates/qr-menuslip/ | O "(+)" põe o prato no carrinho, e o total corrente aparece na barra do pedido; a página não diz se ela é fixa [E41] | Conceito (template) | Comida |
| https://kombai.com/gallery/inspirations/marcy-s/ | Doca fixa em pílula, com sacola, contagem, total corrente e botão de pedir [E43] | Conceito (fictício) | Comida |

- **Fontes:** [E17][E41][E43].

### 3. Comanda de cozinha (ticket do KDS) com itens, modificadores e estado (recorrente, com 3 produtos publicados)

- **Descrição:** nos sistemas reais de cozinha, a comanda lista os itens e os modificadores, tem número e muda de cor com o tempo, passando pelos estados novo, perto do prazo, atrasado e concluído.
- **Exemplos:** os três são produtos reais de operação de cozinha, documentados pelos fornecedores. Nenhum é uma Home de cliente.
- **O que sustenta:** a comanda como metáfora funcional [E1][E35]. Os ingredientes e os adicionais do lanche fazem o papel dos itens e dos modificadores.
- **O que a loja não tem:** os dados do cronômetro e do número do pedido (inventário).
- **Cor:** os três usam a cor como sinal do tempo, e o 1.4.1 pede outro meio ao lado dela [E23].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://squareup.com/help/us/en/article/7944-get-started-with-square-kds-android | Itens e modificadores no ticket, com cor de texto por modificador; cronômetros amarelo e vermelho configuráveis; concluir ou chamar de volta ticket ou item; 4 a 10 colunas [E31] | Publicado (produto) | Restaurante, tela da cozinha |
| https://docs.gotab.io/operator/kds-printers-additional-display-setup/kds-ticket-timer/ | Cinza, amarelo, vermelho e verde para novo, perto do prazo, atrasado e concluído; o amarelo foi ajustado para dar contraste [E32] | Publicado (produto) | Restaurante, tela da cozinha |
| https://merchanthelp.bankofamerica.com/Kitchen-Display-Order-Management | Tipo de pedido, "Not Paid" no pedido on-line não pago, número para chamar no balcão, separador ADD-ON, item marcado e ticket que sai da tela quando todos estão marcados [E33] | Publicado (produto) | Restaurante, tela da cozinha |

- **Fontes:** [E1][E23][E31][E32][E33][E35].

### 4. Papel colado e objetos de mesa (adesivo, fita, carimbo, selo, foto) (recorrente, com 3 exemplos independentes)

- **Descrição:** a página parece uma mesa com papéis: adesivos, fita adesiva, carimbos, selos e cartões, às vezes arrastáveis.
- **Exemplos:** dois publicados, fora de comida, e um template de comida.
- **Crítica:** fora o carimbo de um recibo funcional, é o realismo decorativo que a NN/g põe entre os contras e que Nielsen trata como carga sem função [E1][E35].
- **Fonte tipográfica:** a Courier Prime, listada no site da Victoria Lavine [E50], é a mesma da rodada 1 (`PESQUISA.md`, linha 113).

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://onepagelove.com/postaway | Cartões postais e selos arrastáveis, num clima de mesa de colecionador, segundo a galeria [E47]; o site no ar só devolveu o título [E48] | Publicado (o que se vê vem da descrição da galeria) | Cartões postais (fora de comida) |
| https://www.victorialavine.com | Imagens de fita washi e adesivos decorativos no site no ar [E49]; na galeria, etiquetas Torn Paper e Draggable [E50] | Publicado | Livros, site de autora (fora de comida) |
| https://gribble.framer.website/ | Adesivos que se movem com o mouse, segundo o marketplace [E39]; frases curtas em tom de adesivo e carimbo PAID na prévia [E40]; a pilha de fotos do marketplace não apareceu na prévia | Conceito (template) | Comida |

- **Fontes:** [E1][E35][E39][E40][E47][E48][E49][E50].

### 5. Faixa rolante (ticker ou letreiro) (recorrente, com 3 exemplos independentes)

- **Descrição:** uma faixa de texto corre sozinha, às vezes acelerada pela rolagem.
- **Pausa:** pela 2.2.2 (nível A), a faixa que corre por mais de 5 s ao lado de outro conteúdo precisa de pausa, e parar só no foco ou no hover não conta [E25].
- **Rolagem:** a aceleração pela rolagem é movimento disparado por interação e cai na 2.3.3 (AAA) [E24].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://gribble.framer.website/ | Faixa móvel no hero, segundo o marketplace [E39]; na prévia, itens do cardápio separados por estrelas [E40] | Conceito (template) | Comida |
| https://kombai.com/gallery/inspirations/marcy-s/ | Faixa de largura total em laço contínuo, que acelera com a velocidade da rolagem, com teto [E43] | Conceito (fictício) | Comida |
| https://onepagelove.com/victoria-lavine | Seção Marquee na lista de seções [E50]; no site, uma faixa repetida de elogios, sem prova no texto de que ela anda [E49] | Publicado | Livros (fora de comida) |

- **Fontes:** [E24][E25][E39][E40][E43][E49][E50].

### 6. Superfície de material que reage à luz (2 exemplos; não é recorrente)

- **Descrição:** o fundo é um material, como aço ou uma parede iluminada, cuja luz muda com o cursor ou com o sol.
- **Uso na Home:** combina com a chapa do hero.
- **Movimento:** a luz que segue o cursor é movimento disparado por interação [E24], então só com `motion-ok` e hover.
- **Contraste:** o texto sobre o material segue a F83 [E22].

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://fastcompanyme.com/?p=9768 | Aço arranhado em tela cheia, com a luz e a tipografia seguindo o cursor [E38]. O texto do site atual não permite confirmar se o efeito continua [E56] | Publicado em 2022, segundo a imprensa; estado atual não confirmado | Agência de RP (fora de comida) |
| https://onepagelove.com/sunstill | Luz do sol numa parede que segue o sol real, com persianas para escolher a luz [E51][E52] | Publicado (página de produto com compra) | App de macOS (fora de comida) |

- **Fontes:** [E22][E24][E38][E51][E52][E56].

### 7. Janela ou aparelho realista como vitrine do produto (2 exemplos; não é recorrente)

- **Descrição:** a dobra recria uma janela ou um aparelho com os controles realistas.
- **Por que fica de fora:** nenhum dos dois exemplos é de comida, e o padrão tem pouco a ver com uma loja de lanches. Fica registrado para descarte.

| Exemplo | O que se vê | Publicado ou conceito | Domínio |
|---|---|---|---|
| https://onepagelove.com/txt-text-editor | Desktop de Mac recriado, com controles de janela e barras translúcidas, segundo a galeria [E53]; o texto do site no ar mostra só o nome e o aviso de lançamento em breve [E54] | Publicado (landing no ar de um app ainda não lançado) | App de macOS (fora de comida) |
| https://legacy-ios-ui-kit.vercel.app/ | Kit que recria o iOS 6, com 153 telas e 12 texturas de material [E55] | Conceito (kit) | Kit de UI (fora de comida) |

- **Fontes:** [E53][E54][E55].

## Catálogo de seções candidatas

A metáfora aprovada no plano é o caminho do pedido na cozinha (coifa, chapa, comandas no trilho e cupom). As pistas eram a bancada com cubas, a etiqueta de preço, a geladeira de bebidas, a campainha de balcão e a placa de horário. Nenhuma pista apareceu em site ou template aberto; a viabilidade foi julgada só pelo inventário.

| Seção | O que faz | Origem | Conteúdo real exigido (arquivo e campo) | Viável sem inventar? |
|---|---|---|---|---|
| Coifa (navbar) | O topo fixo vira a coifa, com a marca, os links e o carrinho. A coifa é só superfície e não dá cara de botão ao que não se clica [E15]. Os alvos têm 24 px CSS no WCAG e 44 pt na HIG [E21][E18]. Se houver translucidez, a versão opaca é a padrão, porque o `prefers-reduced-transparency` não é Baseline [E26]. | Metáfora aprovada (coifa); [E15][E18][E21][E26] | `src/direcoes/compartilhado/dados.js`: `MARCA`. `src/direcoes/compartilhado/useLinksPrincipais.js`: Início, Cardápio, Entrar ou Perfil. `src/stores/cart.js`: getter `itemCount` | Sim |
| Chapa (hero) | Chapa de aço com marcas e brilho, com o recorte do hambúrguer, o título e a ação. O brilho que segue o cursor só com `motion-ok` e hover [E24]. A imagem é a LCP: descobrível no HTML, com `fetchpriority` alto e sem lazy-load [E28]. O contraste do texto se mede no ponto mais escuro do aço [E22]. | Padrão 6; [E22][E24][E28][E38] | `dados.js`: `HERO.titulo`, `HERO.texto`, `HERO.acao`, `HERO.imagem`, `HERO.alt` e `IMAGEM_HERO` (WebP 480 e 960, PNG 960, em `public/images/fundos/banner-burger-bg`) | Sim |
| Trilho de comandas ("Mais pedidos") | Os lanches viram comandas penduradas, com os ingredientes no lugar dos itens do ticket. "Adicionar <nome>" abre o Personalizar real. A navegação é por Anterior e Próximo, sem avanço automático, que cairia na 2.2.2 [E25]. | Padrão 3; [E1][E31][E33][E35] | `src/json/products.json`, `menuItems.foods[]` (7 itens, com a Batata Frita): `name`, `ingredients`, `price`, `image`, `description`. `dados.js`: `SECAO` | Sim |
| Comanda com estado e cronômetro (acompanhar o pedido) | Comanda que muda de cor (novo, em preparo, pronto) e mostra o tempo ou o número do pedido, como no KDS [E32][E33] | Padrão 3; [E23][E32][E33] | Não existe: o rastreio, o prazo de entrega e o número de pedidos estão fora do inventário | Não |
| Bancada de inox com cubas (adicionais) | As cubas mostram os adicionais com o preço, como os modificadores da comanda [E31]. O adicional só se escolhe no Personalizar de um lanche, então a cuba informa e leva ao cardápio. Arrastar o adicional até a cuba cobraria a "taxa" da metáfora [E35]. | Pista (bancada com cubas); padrão 3; [E31][E35] | `products.json`, `foodAdditionals[]` (5): `name`, `price`. Opcional: `dessertAdditionals[]` (7). Calculado: número de adicionais | Sim, como vitrine informativa |
| Geladeira de bebidas (e a sobremesa) | As bebidas e o Sorvete de Pote numa porta de vidro, sempre aberta: esconder o conteúdo atrás de um gesto repetiria o erro da Pizza Hut [E1]. O texto sobre vidro e reflexo segue a F83 [E22]; o translúcido perde contraste [E6]. | Pista (geladeira); [E1][E6][E22] | `products.json`, `menuItems.drinks[]` (3) e `menuItems.desserts[]` (1): `name`, `price`, `image`, `description`. `dados.js`: `CATEGORIAS` (rótulos Bebidas e Sobremesas) | Sim |
| Etiqueta de preço e "a partir de" | Etiqueta de papel com o preço de cada item, e uma por categoria com o menor preço e a contagem. É estática e não tem relevo de botão [E15]. | Pista (etiqueta); [E15] | `products.json`: `price` de cada item, sempre por `formatPrice`. Calculados: menor preço e contagem por categoria | Sim |
| Cupom (resumo do carrinho) | Cupom não fiscal, de borda serrilhada, que espelha o carrinho real (itens, adicionais, quantidades e subtotal) e leva ao carrinho. Com o carrinho vazio, mostra o estado vazio. No `forced-colors` a sombra some e entra uma borda [E19]. | Metáfora aprovada (cupom); padrões 1 e 2; [E17][E19][E34] | `src/stores/cart.js`: `items[]` (`name`, `quantity`, `additionals`, `unitPrice`) e getter `subtotal`, por `formatPrice` (chave `smash-burger:cart:v1`). `dados.js`: `FRASE_CARDAPIO`. Sem taxa de entrega, que não existe | Sim |
| Cupom de desconto ou promoção | "Cupom" no sentido de desconto, como o do app da Domino's [E37] | Sentido ambíguo da pista "cupom"; [E37] | Não existe: promoções e cupons estão fora do inventário | Não |
| Placa de horário e balcão (endereço e contatos) | Placa com o horário e balcão com o endereço, o WhatsApp, o e-mail e as redes. É estática, sem relevo de botão. Os links têm sinal de clique claro [E15] e alvo de pelo menos 24 px [E21]. | Pista (placa de horário); [E15][E21] | `dados.js`: `HORARIO`, `CONTATOS` (endereço com link do Google Maps, WhatsApp, e-mail) e `REDES` (Facebook e Instagram) | Sim |
| Placa "Aberto agora / Fechado" | Placa que vira conforme a hora atual | Pista (placa de horário) | Não está entre os derivados do inventário. A loja não tem dados de feriados, exceções nem fuso, então o estado poderia ser falso | Não, salvo decisão do usuário |
| Campainha de balcão (chamada final) | O fecho da página, com a campainha como botão principal "Ver cardápio". Tem estado pressionado [E18] e retorno imediato [E16]. O som só toca depois de um gesto, tratando a recusa do navegador [E30], e fica desligado por padrão (decisão de projeto, sem fonte). Não há número de pedido para chamar no balcão [E33]. | Pista (campainha); a etiqueta "ding!" do Marcy's [E43]; [E16][E18][E30] | `dados.js`: `FRASE_CARDAPIO` e `HERO.acao`. O anúncio de item adicionado vem do modal Personalizar real | Sim, sem número de pedido |
| Faixa de pedidos (ticker com os nomes do cardápio) | Uma faixa corre com os nomes dos lanches. Tem botão de pausa e fica parada com movimento reduzido [E24][E25]. | Padrão 5; [E24][E25] | `products.json`, `menuItems.foods[].name` | Sim, com pausa |
| Mural de clientes, avaliações e história | Adesivos com frases, fotos da casa e a história. O GRIDDLE tem frases curtas sem autoria, uma pilha de fotos e um link para a história [E39][E40] | Padrão 4; [E39][E40] | Não existe: avaliações, depoimentos, história e fotos do local estão fora do inventário | Não |
| Rodapé como fim de cupom | O rodapé fecha a página como o fim de um cupom, com a linha de direitos e os contatos, sem código de barras nem carimbo inventado | Padrão 1 | `dados.js`: `RODAPE.copyright`, `CONTATOS` e `REDES` | Sim |

## Componentes típicos e estados

- **Botão físico ("Adicionar", "Ver cardápio", campainha):**
  - repouso: relevo e sombra, sobre uma borda real que continua no `forced-colors` [E19], com forma retangular de cantos arredondados [E15];
  - hover: só em dispositivo com hover; não precisa de 3:1, mas não pode reduzir o contraste [E13];
  - foco visível: indicador com contraste suficiente com o fundo vizinho [E13]; no `forced-colors`, a cor do contorno passa a ser a do sistema [E19];
  - pressionado: obrigatório num botão personalizado [E18]; o deslocamento (`transform`) só com `motion-ok`; a sombra muda sem animação, porque animá-la sai do compositor [E20];
  - carregando: indicador de atividade dentro do botão, quando a ação demora [E18];
  - desabilitado: fica fora do 3:1 do 1.4.11 [E13];
  - `forced-colors`: sem sombra e sem degradê, só a borda [E19];
  - área de clique: pelo menos 24×24 px CSS [E21] (a HIG pede 44×44 pt [E18]).
- **Comanda (card de lanche no trilho):**
  - repouso: papel, reto com movimento reduzido [E24];
  - hover ou foco dentro: a comanda se destaca, mas o hover não é o único sinal de que o "Adicionar" existe [E16];
  - item adicionado: retorno em até 0,1 s [E16], com o anúncio do modal Personalizar real;
  - produto removido no painel: some do trilho sem deixar buraco (o inventário avisa que um produto pode sumir);
  - imagem lenta ou ausente: espaço reservado e texto alternativo.
  - Fontes: [E16][E24][E31][E33].
- **Trilho (carrossel de comandas):**
  - estados: início (Anterior desabilitado), meio e fim (Próximo desabilitado);
  - avanço: sem avanço automático; se houver, com pausa [E25];
  - movimento reduzido: rolagem sem animação [E24];
  - deslizamento: só por `transform` [E20].
- **Cuba de adicional:**
  - repouso: nome e preço;
  - foco ou hover: leva ao cardápio ou ao Personalizar;
  - seleção: não tem estado de selecionado próprio, porque o adicional só se escolhe dentro de um lanche.
  - Fontes: [E31][E35].
- **Cupom (resumo do carrinho):**
  - vazio: estado vazio com a ação para o cardápio;
  - com itens: linhas, adicionais e subtotal por `formatPrice`;
  - atualizado: anúncio educado quando o carrinho muda (decisão de implementação, sem fonte nesta rodada);
  - `forced-colors`: a sombra sai e entra uma borda [E19]; o recorte da `mask` [E34] deve continuar, mas isso é inferência a testar.
- **Etiqueta de preço:**
  - estática, com o preço do item;
  - "a partir de", com o menor preço da categoria, calculado;
  - sem relevo de botão, porque não é clicável [E15].
- **Faixa rolante:**
  - rodando;
  - pausada pelo botão, de preferência um controle para tudo o que se move [E25];
  - parada com movimento reduzido [E24].
- **Campainha com som:**
  - mudo (o padrão);
  - tocada: retorno visual imediato [E16] e estado pressionado [E18];
  - som ligado: toca só depois de um gesto e trata a promessa recusada (`NotAllowedError`) [E30].

## Riscos de acessibilidade e desempenho

- **Relevo que some:** no `forced-colors`, a sombra, a sombra do texto e os degradês viram `none`. Botão ou comanda que se distingue só pelo relevo desaparece e precisa de borda real [E19].
- **Contraste sobre textura:** texto sobre o aço da chapa, o grão do papel, o vidro da geladeira ou uma foto se mede no ponto mais escuro ou mais claro do fundo, conforme o texto (F83, falha de 1.4.3) [E22]. Translúcido sobre foto perde contraste [E6].
- **Estado só por cor:** a comanda que avisa o estado só pela cor (amarelo ou vermelho, como no KDS) falha no 1.4.1 [E23]. Um fornecedor de KDS ajustou o próprio amarelo para dar contraste [E32].
- **Movimento:** ticker ou letreiro que corre por mais de 5 s precisa de pausa (2.2.2, nível A) [E25]. O recibo que aparece animado com a rolagem e a luz que segue o cursor são movimento disparado por interação (2.3.3) e ficam só com `motion-ok` [E24]. A animação constante vira distração [E6].
- **Compositor:** animar sombra, degradê ou filtro (o botão que afunda, a luz na chapa) sai do compositor e pode engasgar em celular fraco ou com o thread principal ocupado; só `transform` e `opacity` ficam no compositor [E20].
- **Filtro SVG grande:**
  - um usuário relatou rolagem lenta no Firefox, por repintura, com um filtro `feDisplacementMap` do tamanho da tela, no Fedora Linux [E29];
  - é um relato não confirmado, não uma medida, e não trata do `feTurbulence` usado no grão da rodada 1;
  - gerar o grão uma vez como imagem, ou limitá-lo a uma área pequena, é hipótese de mitigação, sem fonte.
- **Peso:** a NN/g lista o carregamento mais lento entre os contras [E1], e a equipe da Domino's teve de equilibrar o realismo com o tempo de carga em iPads diferentes [E36]. A imagem do hero é a LCP: até 2,5 s em 75% das visitas, sem lazy-load, com `fetchpriority` alto em uma ou duas imagens e formato moderno [E28].
- **Taxa da metáfora:** a metáfora que importa as limitações do objeto físico cobra uma "taxa" [E35]. Exemplos seriam abrir a porta da geladeira, arrastar o adicional até a cuba ou inclinar o celular, como no caso da Pizza Hut [E1].
- **Falso botão:** dar relevo de botão à etiqueta de preço ou à placa de horário faz parecer clicável o que não é [E15].
- **Alvo menor que o desenho:** o chanfro ou a sombra decorativa pode aumentar o botão na tela sem aumentar a região que aceita o ponteiro. O alvo precisa de 24 px CSS no mínimo, e o WCAG não diz se a decoração conta [E21]; a HIG pede 44 pt [E18].
- **Som:** o som da campainha não toca sem interação do usuário com o site, e a recusa precisa de tratamento [E30]. O retorno visual não pode depender do som.
- **Translucidez:** a translucidez da coifa e da geladeira não tem alternativa automática confiável, porque o `prefers-reduced-transparency` é experimental e fora do Baseline [E26]. A versão opaca deve ser a padrão, ou vir pelo `prefers-contrast`, que é Baseline desde maio de 2022 [E27].

## Não encontrei

- **Home publicada de comida:** não encontrei uma Home de comida, restaurante ou delivery em estilo esqueumórfico. Os três exemplos de comida (GRIDDLE, QR MenuSlip e Marcy's) são templates. O único produto de comida é o construtor 3D da Domino's, um app de iPad de 2014 que não é Home [E36][E37], e não confirmei que ele ainda exista.
- **Pesquisa com usuários:** não encontrei estudo com usuários sobre recibo, cupom ou comanda como interface de pedido. Esses padrões se apoiam em templates e na documentação de KDS, que é de cozinha, não de cliente.
- **Pistas do plano:** a coifa, a bancada com cubas, a geladeira de bebidas, a campainha de balcão e a placa de horário não apareceram em nenhum site ou template aberto; o mais perto foi a etiqueta "ding!" do Marcy's [E43]. Continuam hipóteses de metáfora.
- **Custo do `feTurbulence`:** não encontrei medida. O relato do Firefox trata do `feDisplacementMap` [E29].
- **Victoria Lavine:** a galeria marca Torn Paper e Draggable [E50], mas o texto do site não mostra o que se arrasta [E49].
- **GRIDDLE:** a pilha de fotos listada no marketplace [E39] não apareceu na prévia [E40].
- **Marcy's:** a página chama o recibo de "vivo", mas não explica como ele se atualiza [E43].
- **QR MenuSlip:** a prévia não mostrou, no texto, nem a barra do pedido nem o recibo [E42], e o marketplace não nomeia o autor de forma explícita [E41].
- **The Last Agency:** não deu para confirmar, pelo texto do site atual, se a superfície de aço de 2022 continua [E56]. O exemplo vale pela imprensa [E38].
- **Teenage Engineering:** a página do OP-1 abriu, mas, no texto, não tem controles esqueumórficos na web [E57]. Fica descartada a ideia de que marcas de hardware usam esse tipo de interface nas páginas de produto.
- **One Page Love:** a tag anuncia 21 exemplos. As duas páginas abertas mostraram 16 sites diferentes, 8 em cada uma [E44][E45]. Os outros 5 não foram vistos, e as etiquetas da página 2 não foram conferidas.
- **Alvo e decoração:** o 2.5.8 não diz se a sombra ou o chanfro decorativo contam na área do alvo [E21].
- **Anúncio do carrinho:** não encontrei, nesta rodada, uma fonte para o anúncio educado (`aria-live`) do cupom; fica como decisão de implementação.
- **"Cupom":** a palavra é ambígua. Como cupom não fiscal (resumo do carrinho), é viável; como cupom de desconto, não existe no inventário.
- **"Aberto agora":** depende de uma regra que não está entre os derivados do inventário (feriados, fuso) e fica como decisão do usuário.
- **Ferramentas não usadas:** Dribbble, Behance, Figma Community, Mobbin e o Chrome não foram usados, conforme as regras desta execução.

## Não abriu

| URL | Motivo |
|---|---|
| https://speckyboy.com/interactive-skeuomorphic-design-elements.md | HTTP 403 (relato do pesquisador; não tentado de novo) |
| https://onextrapixel.com/?p=42734 | HTTP 403 (relato do pesquisador; artigo sobre esqueumorfismo em sites de comida) |
| https://www.fastcompany.com/91000000 | HTTP 403 (relato do pesquisador). Era um endereço tentado sem confirmação e não foi usado; a matéria foi lida no espelho fastcompanyme.com [E38] |
| https://frontendmasters.com/blog/grainy-gradients/ | Redirecionamento 301 para master.dev, que não foi seguido (relato do pesquisador) |
| https://poolsuite.net/ | Só o nome e a imagem de abertura, nada sobre a interface; descartado (relato do pesquisador) |
| https://www.postaway.space | Abriu só com o título, nesta verificação também [E48]. O arrastar dos cartões vem da descrição da galeria [E47] |
| https://adrien.website/txt/ | O texto mostra só o nome, a frase e o aviso de lançamento; o resto é imagem embutida [E54] |
| https://qrmenuslip.framer.website/ | O texto não mostra a barra do pedido nem o recibo; o conteúdo dinâmico não aparece [E42] |
| https://thelast.agency/ | O texto não descreve efeitos visuais [E56] |
| Figma Community, Behance, lapa.ninja, uxdesign.cc, medium.com, axesslab.com, Dribbble, webflow.com e m3.material.io | Já sabidos bloqueados (403, páginas vazias, erro de leitura ou só com JavaScript); não foram tentados |

## Refutadas na verificação

- **[A31] One Page Love (afirmação inteira derrubada):** o pesquisador disse que as duas páginas da tag mostraram os mesmos 8 sites. A página 2 (`/style/skeuomorphism/page/2`), para onde aponta o "Next" da primeira, mostra 8 sites diferentes [E45], então foram vistos 16 dos 21.
- **[A8] web.dev (parcial):** a página não diz que animar outras propriedades obriga a pintar de novo "a cada quadro". Diz que o melhor caminho evita layout e pintura e que as animações fora do compositor dão mais trabalho e podem engasgar [E20].
- **[A17] Bugzilla (parcial):**
  - a fonte é relato de um usuário, num bug não confirmado, e foi reclassificada de técnica para praticante;
  - o relato é só no Fedora Linux;
  - "não trata do `feTurbulence`" vale para a descrição, mas um comentário posterior liga uma discussão externa sobre o `feTurbulence`, que não foi aberta [E29].
- **[A18] MDN Autoplay (parcial):** a página não chama o tratador do gesto de "caminho mais confiável". Ela põe a interação do usuário com o site entre as condições que liberam o som [E30].
- **[A21] Bank of America (parcial):** "se está pago" vale só para os pedidos on-line, que mostram "Not Paid" quando não pagos; os pedidos feitos no ponto de venda não mostram status [E33].
- **[A27] Fast Company (parcial):** "o site atual não mostra mais o aço" não se confirma pelo texto do site [E56]. O exemplo passou de conceito para publicado em 2022, com o estado atual não confirmado.
- **[A29] QR MenuSlip (parcial):**
  - "barra de pedido fixa": a página fala da barra do pedido com o total corrente, sem dizer que é fixa;
  - "(DeafBuild)": o autor não é nomeado de forma explícita [E41];
  - a prévia não mostrou, no texto, a barra nem o recibo [E42].
- **Exemplo do GRIDDLE no padrão do papel colado (parcial):** a afirmação de que os adesivos trazem "frases de clientes" não se sustenta, porque a prévia traz frases curtas sem autoria [E40].
- **Exemplo do GRIDDLE no padrão da barra do pedido (derrubado):** o ORDER NOW abre um painel com apps de entrega, ligação e rota, não uma barra com contagem e total [E39]. Com isso, o padrão "doca fixa" fica com 2 exemplos e deixa de ser recorrente.
- **Exemplo do GRIDDLE com "letreiro conduzido pela rolagem no manifesto" (derrubado):** na prévia, o manifesto é um parágrafo curto com link para a história [E40]. A faixa do hero continua, pelo marketplace [E39].
- **Exemplo da Victoria Lavine, "faixa de elogios que gira" (parcial):** o site tem a faixa repetida, mas o texto não confirma que ela anda [E49]; a seção Marquee vem da galeria [E50].
