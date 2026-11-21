# Pesquisa da rodada 2: Neumorfismo

Dossiê de 20/11/2026 para a Home própria do neumorfismo na rodada 2. Um pesquisador levantou 49 afirmações e seis padrões de página. Depois, um verificador reabriu cada URL com o WebFetch no mesmo dia e tentou derrubar cada afirmação e cada exemplo. Ficou aqui só o que sobreviveu; os trechos derrubados estão no fim. O dossiê complementa a seção "Neumorfismo" da rodada 1 (`docs/direcoes/PESQUISA.md`, linhas 130 a 149), cujas fontes [N1] a [N10] continuam valendo. A numeração segue a partir de [N11], e a tabela indica quando um endereço já era fonte da rodada 1. O conteúdo da loja citado nas seções vem do inventário da rodada 2 e foi conferido no repositório. Os textos estão em `src/direcoes/compartilhado/dados.js`, embora o inventário ainda chame esse arquivo de `conteudo.js`.

- **Resultado da verificação:** 45 afirmações confirmadas (algumas com ajuste de redação), 4 com trecho derrubado e nenhuma sem reabrir.
- **Regras:** tudo é paráfrase, com uma única citação curta. Nenhuma imagem, ícone ou layout foi baixado ou copiado. Galeria, kit, template e demo servem só como exemplo de um padrão abstrato, e todos os exemplos abertos são conceito.

## Fontes

| nº | Tipo | Título | URL | O que sustenta |
|---|---|---|---|---|
| N11 | Autor do estilo | Neumorphism in user interfaces (Michał Malewicz, Hype4) | https://hype4.academy/articles/design/neumorphism-in-user-interfaces | O cartão é o uso principal: ele parece extrudado do fundo, sem flutuar, e o baixo contraste é aceitável porque o cartão não é elemento ativo. O botão funciona se o ícone contrastar com o fundo. O pressionado por sombra invertida tem contraste baixo demais para sinalizar a mudança; as saídas propostas são ícone contornado/preenchido, sublinhado ou preenchimento com cor. Na atualização de 2021, o estilo não virou tendência própria; uma instituição financeira sem nome o usou com pouco sucesso, com resultado acessível, mas sem graça e focado demais num efeito só; os designers copiaram só o relevo e deixaram de lado os controles esqueumórficos do shot original; o legado foi a volta da sombra interna. (= [N1]) |
| N12 | Autor do estilo | Claymorphism in user interfaces (Michał Malewicz, Hype4) | https://hype4.academy/articles/design/claymorphism-in-user-interfaces | O problema maior do neumorfismo foi a monotonia visual na maioria dos exemplos, junto com a alta fidelidade quase impossível de levar ao front-end. A acessibilidade, para ele, se resolvia com poucos ajustes. (= [D3] da rodada 1) |
| N13 | Pesquisa | Skeuomorphism (NN/g, Megan Chan, 15/03/2024) | https://www.nngroup.com/articles/skeuomorphism/ | O neumorfismo não chegou ao mainstream por dois problemas: o baixo contraste não dá peso visual e tira a acessibilidade, e o uso inconsistente em elementos clicáveis e não clicáveis torna difícil saber o que é clicável. (= [N2]) |
| N14 | Pesquisa | Shadows & Outlines: Accessibility of component styling (Google Material e Core Accessibility) | https://docs.google.com/presentation/d/1CFNxozlyO1lmiyRVCFuhQ_0t2c5QTLskY03CCeTpUuA/htmlpresent | O estudo teve 15 participantes de baixa visão (18 recrutados, 3 desistiram) e 36 entrevistas, entre o 4º tri de 2018 e o 1º tri de 2019. Comparou botões e chips com contorno ou sombra em três níveis de contraste (nenhum, padrão e alto), em desktop e celular e nos modos claro e escuro. Todos acabaram achando os controles com tempo ou ampliação. Os participantes preferiram o contorno padrão ou alto a nenhum. No escuro, a sombra se destacou menos que o contorno. Sem borda, ficava difícil saber onde o alvo começa e termina. A amostra é pequena, os resultados são ilustrativos, e a preferência nem sempre coincidiu com o desempenho. Não fala de neumorfismo. (= [N5]) |
| N15 | Pesquisa | Input Steppers (NN/g, Tammy Zhou, 11/11/2018) | https://www.nngroup.com/articles/input-steppers/ | O stepper serve para valores com um padrão claro e desvios pequenos. Os alvos devem ser grandes, de preferência na horizontal e com mais e menos. A variante com campo de texto aceita digitação. Os limites e o passo devem ser indicados, e o segmento esmaece ao chegar no limite (o exemplo é o da Expedia). |
| N16 | Referência técnica | Understanding SC 1.4.11 Non-text Contrast (W3C) | https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast | Pede 3:1 contra as cores vizinhas para o que identifica um controle e o estado dele. Uma sombra 3D ou uma linha escura de borda conta como parte da cor vizinha de brilho mais próximo. O indicador de estado pode ter como vizinha outra parte do mesmo componente (exemplo do toggle). O hover do autor é suplementar e não pode reduzir o contraste. Componente inativo é isento. O indicador de foco precisa de 3:1 contra as cores vizinhas; dentro do componente, contra as cores internas. O foco padrão do navegador, se não alterado pelo autor, é isento, mas precisa continuar visível. (= [N6]) |
| N17 | Referência técnica | Understanding SC 2.4.13 Focus Appearance (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html | É nível AAA. Pede uma área de foco pelo menos igual a um perímetro de 2 px CSS do componente e 3:1 entre focado e não focado. Sombra e brilho fora do conteúdo não entram na apresentação do componente. Um indicador recuado para dentro de 2 px precisaria ter pelo menos 3 px. |
| N18 | Referência técnica | Understanding SC 2.5.8 Target Size (Minimum) (W3C) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | É nível AA e pede alvos de 24 × 24 px CSS. Pela exceção de espaçamento, um círculo de 24 px centrado no alvo pequeno não pode cruzar outro alvo nem o círculo de outro alvo pequeno. Alvos dentro de frases ficam isentos. (= [N10]) |
| N19 | Referência técnica | Understanding SC 1.4.3 Contrast (Minimum) (W3C) | https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum | Pede 4,5:1 para texto e 3:1 para texto grande, sem arredondar (4,499:1 reprova). Ficam isentos o componente inativo, a decoração pura, o texto incidental e o logotipo. (= [N7]) |
| N20 | Referência técnica | forced-colors (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors | Em cores forçadas, o navegador impõe cores do sistema às propriedades listadas e força `box-shadow` e `text-shadow` a `none`; o `background-image` que não é `url()` também vira `none`. O exemplo da página põe uma borda de 2 px em `ButtonText` no lugar do `box-shadow` que some. (= [N8]) |
| N21 | Referência técnica | prefers-contrast (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast | Os valores são `no-preference`, `more`, `less` e `custom`. O `custom` corresponde à paleta escolhida por quem usa `forced-colors: active`. (= [N9]) |
| N22 | Referência técnica | box-shadow (MDN) | https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow | Aceita várias sombras separadas por vírgula. A sombra inset fica recortada na caixa de padding, por dentro da borda, e a sombra não muda as dimensões da caixa. Na animação, as sombras são pareadas em ordem; se num par uma tem `inset` e a outra não, a lista inteira não interpola e muda de uma vez. (= [N4]) |
| N23 | Documentação oficial | Switch Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/switch/ | O switch tem dois valores, ligado e desligado: `role="switch"` com `aria-checked`, ou o `checked` de um checkbox nativo. Espaço alterna, e Enter é opcional. O rótulo não muda com o estado. Um grupo com rótulo visível vai num `group` com `aria-labelledby` ou num `fieldset` com `legend`. |
| N24 | Documentação oficial | Button Pattern, toggle button (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/button/ | O botão alternável expõe o estado com `aria-pressed`, e o rótulo não muda com o estado. Se o rótulo trocar (Mudo/Com som), o `aria-pressed` não é necessário. Espaço e Enter ativam. |
| N25 | Documentação oficial | Spinbutton Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/ | Em geral só o campo de texto recebe foco. As setas sobem e descem um passo, Home e End vão ao mínimo e ao máximo quando eles existem, e Page Up/Down é opcional. Usa `role="spinbutton"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` e `aria-valuetext` quando o número sozinho não é amigável. |
| N26 | Documentação oficial | Slider Pattern (WAI-ARIA APG) | https://www.w3.org/WAI/ARIA/apg/patterns/slider/ | Cobre as orientações horizontal e vertical, com `role="slider"`, `aria-valuenow/min/max`, setas, Home e End. Não fala de mostrador giratório. Avisa que as tecnologias assistivas de toque podem ter dificuldade com o padrão e pede teste em aparelhos de toque. |
| N27 | Referência técnica | How to create high-performance CSS animations (web.dev, Kayce Basques e Rachel Andrew) | https://web.dev/articles/animations-guide | Recomenda restringir as animações a `opacity` e `transform` e evitar o que dispara layout ou pintura. Tudo o que tem desfoque, como sombra, demora mais para pintar. |
| N28 | Referência técnica | CSS paint times and page render weight (web.dev, Colt McAnlis) | https://web.dev/articles/css-paint-times | A sombra projetada é uma operação de várias passadas. Combinações de propriedades (o exemplo é `box-shadow` com raio de borda) custam mais que a soma das partes, e o custo depende do valor, não só da propriedade. A página não tem data; cita o Chrome 27 beta. A medição foi feita com automação própria sobre Skia, e o Continuous Paint aparece só como sugestão ao leitor. |
| N29 | Praticante | How to animate box-shadow with silky smooth performance (Tobias Ahlin, 18/11/2015) | https://tobiasahlin.com/blog/how-to-animate-box-shadow/ | Animar `box-shadow` pesa no desempenho, sobretudo no celular. A técnica dele põe a sombra mais forte num `::after` com opacidade 0 e anima só a opacidade dele, junto com um `transform` no elemento. |
| N30 | Praticante | Neumorphism and CSS (CSS-Tricks, Adrian Bece, 20/03/2020) | https://css-tricks.com/neumorphism-and-css/ | O artigo demonstra botões e toggles; campos e barras de progresso aparecem só numa captura. O elemento ideal é o cartão e o contêiner estático, sem estados de interação ou validação. As restrições limitam a variação necessária para cada estado. Um botão de cor sólida se destaca menos que um de cor alternativa. O estilo deve ser usado com parcimônia, junto de outro sistema. Cada elemento tem uma sombra clara e uma escura; `inset` dá o pressionado, e o degradê dá o convexo. (= [N3]) |
| N31 | Praticante | Claymorphism: Will It Stick Around? (Smashing Magazine, Adrian Bece, 16/03/2022) | https://smashingmagazine.com/2022/03/claymorphism-css-ui-design-trend/ | A exigência da cor do fundo dificultou a hierarquia por cor e limitou a marca. Nos exemplos, tudo parecia botão, até os cartões. O flat seguiu melhor para chamadas para ação de destaque, e o neumorfismo serve só de complemento, para dar profundidade a cartões e contêineres não interativos. |
| N32 | Imprensa | Neumorphism Shows Accessibility Is Still a UI Afterthought for Some (Built In, Stephen Gossett, 03/03/2020) | https://builtin.com/design-ux/neumorphism-accessibility | Na entrevista, Malewicz recomenda o estilo em cartões e longe dos botões. Se a camada neumórfica puder sair e os limites do cartão continuarem claros, o estilo funciona. Ele diz que o usuário não distingue botão, texto, pressionado e ativo, porque tudo parece igual, e que as bordas muito claras de campo são difíceis de ver até para quem enxerga bem. |
| N33 | Praticante (biblioteca de terceiro) | flutter_neumorphic (pub.dev) | https://pub.dev/packages/flutter_neumorphic | Tem botão, rádio, checkbox, switch, toggle, slider, progresso, ícone, texto, app bar e fundo neumórficos. As formas são côncava, convexa e plana, e a profundidade vai de -20 a 20 (negativa dá o baixo-relevo). A fonte de luz é configurável. O checkbox marcado e o switch ligado ganham a cor de acento, e o botão responde ao toque mudando de profundidade. O estado desabilitado não é documentado. O repositório é Idean/Flutter-Neumorphic, mas o publicador aparece como não verificado. |
| N34 | Imprensa (enciclopédia) | Neumorphism (Wikipedia) | https://en.wikipedia.org/wiki/Neumorphism | O macOS Big Sur (12/11/2020) usou neumorfismo com destaque nos ícones de apps, sem adotar o estilo por inteiro. A interface HarmonyOS da TV Honor Vision (agosto de 2019) aparece como protoexemplo. A adesão dos designers caiu rápido até 2021, e o glassmorphism ganhou espaço. O termo é atribuído a "Jason Kelly", em 2019. |
| N35 | Praticante | How neumorphism UI design works and where it quietly fails (Setproduct, Roman Kamushken, 26/06/2026) | https://setproduct.com/blog/neumorphism-design-guide | O estilo serve a interfaces de um propósito só e poucos elementos: player de música, painel de casa inteligente, calculadora. Falha em painéis densos, leitura longa, e-commerce com muitas chamadas e formulários longos, onde os poços escondem o campo ativo. No pressionado, as mesmas sombras passam a `inset`. O foco é um anel ou uma borda visível via `:focus-visible`. A sombra sozinha não é estado: entram cor de acento, borda ou rótulo, e o ARIA correspondente. Na especificação para IA da página, o alvo é de 44 × 44 px, rotulado como WCAG 2.2. O menu do site leva a kits de design. |
| N36 | Praticante | Neumorphism, UI Design Styles (daisyUI) | https://trends.daisyui.com/trend/neumorphism/ | Pede poucos controles direto sobre uma base contínua, com espaços largos, densidade baixa e um grupo de controles por região, sem tabelas densas, formulários longos nem painéis aninhados. Prefere mostradores circulares, retângulos arredondados e pílulas largas, e pede para evitar rótulo cinza fino sobre a cor de base. Diz que "Jason Kelley" usou "Neuomorphism" em dezembro de 2019. Não diz se o texto foi gerado. |
| N37 | Praticante (fornecedor de ferramenta de IA) | Neumorphism style guide (Superdesign) | https://superdesign.dev/styles/neumorphism | Recomenda o estilo em superfícies fechadas, de baixo risco e com ar de hardware, e o desaconselha em checkout, preços e cadastro. A chamada para ação fica plana, preenchida em acento e de alto contraste. As sombras grandes vão em poucos contêineres, e não em centenas de itens de lista, pela rolagem em aparelhos fracos. No escuro, inverter não basta: as duas sombras precisam de ajuste próprio. A borda de sombra da receita da página (`#bec3c9` sobre `#e0e5ec`) dá cerca de 1,4:1; o cálculo foi refeito na verificação e dá 1,40:1. |
| N38 | Praticante | How to Keep Neumorphism Accessible in UI Design (Envato Tuts+, Brenda Barron, 27/09/2023) | https://webdesign.tutsplus.com/keep-neumorphism-accessible-in-ui-design--cms-107614a | Recomenda ícone ou texto além da sombra, uma cor de contraste maior para a chamada para ação e uma paleta de três tons de uma cor (sombra clara, base e sombra escura). Os exemplos são conceitos e kits: uma interface de casa inteligente do Envato Elements, os templates Osvaro e Purasa e cartões da Yandex no Dribbble. |
| N39 | Praticante | Neumorphism in UI Design (Toptal, Kayode Osinusi, atualizado em 18/09/2024) | https://www.toptal.com/designers/ui/neumorphic-ui-design | Cita interfaces de carro, entretenimento, saúde e finanças. Quatro exemplos vêm rotulados como conceito (Tesla, o rádio de Alexander Plyuto, um app de chaleira e um de banco); a calculadora, creditada à Justinmind, não traz essa indicação. |
| N40 | Praticante | How 'Soft' User Interface Designs Impact Accessibility (BOIA, 24/05/2023) | https://boia.org/blog/how-soft-user-interface-designs-impact-accessibility | A soft UI pode caber num jogo, e muito menos num app de banco. Não identifique controles só por cor e teste o foco de teclado, com estilo de foco de contraste adequado. Oferecer modo escuro não cumpre o WCAG: a interface padrão precisa ser acessível. |
| N41 | Imprensa (blog de empresa) | Neumorphism: Its Origin Story & Influence on the UI Design World (SVGator, 31/05/2023) | https://www.svgator.com/blog/neumorphism-ui-design | Recomenda o estilo em contêineres estáticos, que não mudam de estado. Cita o 1.4.11 e sugere uma borda sutil nos elementos clicáveis, rótulo nos ícones e estados de hover, toggle e validação fáceis de reconhecer. |
| N42 | Galeria (kit livre) | themesberg/neumorphism-ui-bootstrap, README (GitHub) | https://github.com/themesberg/neumorphism-ui-bootstrap | O kit é MIT, em Bootstrap, Sass e Gulp, com mais de 200 componentes e um complemento de sombra inset. O README fala em 5 páginas de exemplo e, adiante, em 13; a estrutura de arquivos lista 5. Não trata de acessibilidade nem de estados. |
| N43 | Galeria (kit pago) | Neumorphism UI PRO (Themesberg) | https://themesberg.com/product/ui-kits/neumorphism-ui-pro | Custa a partir de US$ 69 e tem mais de 25 seções e 13 páginas (Sobre, Preços, Perfil, Serviços, Blog, Post, Contato, Em breve, Manutenção, Entrar, Cadastrar, 404 e 500). Entre os componentes estão linha do tempo, cartão de perfil, cartão de preço e seção de chamada para ação. |
| N44 | Galeria (código do kit livre) | Neumorphism UI, `src/index.html` | https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/index.html | As seções ficam na superfície `bg-soft`, sem borda nem sombra. A ordem é: hero com h1, texto e botões; 3 caixas com círculo de ícone elevado; vitrine de 18 componentes; prévia das páginas; 9 recursos com círculo de ícone elevado; estrutura de pastas; esquema de cores WCAG, com 7 cartões elevados (`card shadow-soft border-light`); fluxo de trabalho; 2 cartões de preço elevados; rodapé incluído de um parcial. |
| N45 | Galeria (código do kit livre) | Neumorphism UI, `src/html/pages/about.html` | https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/html/pages/about.html | Os cartões de valores são elevados, com o ícone num círculo afundado (`shadow-inset`). Depois vêm um cartão de imagem com texto, uma faixa de três contadores (ícone elevado, rótulo e número grande abaixo) e cartões de equipe com foto em moldura afundada, cargo e redes. Os cartões usam `border-light`. |
| N46 | Galeria (código do kit livre) | Neumorphism UI, `src/html/pages/pricing.html` | https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/html/pages/pricing.html | Tem três planos com o contêiner afundado e o cabeçalho e o corpo elevados, cada um com o botão "Add to Cart", sem plano em destaque nem chave mensal/anual. Depois vêm seis cartões de clientes e um FAQ de quatro itens em acordeão, num contêiner elevado. |
| N47 | Galeria (código do kit livre) | Neumorphism UI, `src/html/pages/contact.html` | https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/html/pages/contact.html | O mapa (iframe) fica num poço afundado. Há três blocos de contato (visitar, ligar com horário, e-mail) com ícones elevados e `border-light`, e um formulário de nome, e-mail e mensagem num cartão elevado. |
| N48 | Galeria (código do kit livre) | Neumorphism UI, `_variables.scss` | https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/scss/neumorphism/_variables.scss | O fundo é `#e6e7ee`, e `$light` é `#D1D9E6`. A sombra elevada é de 6 px, `#b8b9be` de um lado e `#ffffff` do outro, e há uma sombra inset. A sombra do campo é a inset; o foco do campo zera sombra e largura; o foco do botão é a própria sombra inset. Pela fórmula do WCAG (cálculo da verificação), `#D1D9E6` dá 1,15:1 sobre o fundo, a sombra escura dá 1,59:1 e a clara, 1,23:1: todas abaixo de 3:1. |
| N49 | Galeria (código do kit livre) | Neumorphism UI, `mixins/_buttons.scss` | https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/scss/neumorphism/mixins/_buttons.scss | No hover, mudam a cor, o fundo e a borda, e entra a sombra inset. No foco, entra só a mesma sombra inset. No ativo, mudam a cor, o fundo e a borda, e o degradê sai. O desabilitado volta às cores de base. |
| N50 | Galeria (código do kit livre) | Neumorphism UI, `components/_custom-forms.scss` | https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/scss/neumorphism/components/_custom-forms.scss | O trilho do switch é afundado (sombra inset). Ao ligar, o polegar fica escuro e desliza para a direita, com transição de `transform`. Ligado e desabilitado, o polegar fica com 40% de opacidade. O arquivo não define foco para checkbox, rádio ou switch. |
| N51 | Galeria (código do kit livre) | Neumorphism UI, `components/_nav.scss` | https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/scss/neumorphism/components/_nav.scss | A pílula em repouso é elevada e tem borda, e o hover muda só a cor do texto. A ativa passa à sombra inset e troca também a cor do texto, o fundo e a cor da borda. |
| N52 | Galeria (demo) | A Neumorphism Demo (carlwebdev, GitHub Pages) | https://carlwebdev.github.io/a-neumorphism-demo/ | Página única de demonstração, que se descreve com cartões elevados, campos afundados e botões táteis. Tem cabeçalho com menu e um ícone de sol sem rótulo, hero com três botões e grade de três cartões: instantâneo de painel com quatro métricas; tocando agora com anterior, tocar e próximo; e central de controle com volume, campo de e-mail, toggle e botão de salvar. Seguem selos, pílulas de status, progresso, FAQ e diálogo. O FAQ recomenda contraste forte e foco visível. |
| N53 | Galeria (demo) | Soft UI Design Aesthetic (chrislemke, GitHub Pages) | https://chrislemke.github.io/website_designs/examples/Neumorphism.html | Vitrine do estilo. Tem hero com duas chamadas, uma fileira de números sobre o próprio estilo, quatro switches, quatro barras de progresso, dois botões rotulados (padrão e pílula ativa), três campos e uma demo de elevado, plano e pressionado. Diz que o pressionado e o ativo usam sombra inset e recomenda texto em 4,5:1 e um modo de alto contraste. |
| N54 | Galeria (template pago) | Neu Bento (SOSOTAR, Framer Marketplace) | https://www.framer.com/marketplace/templates/neu-bento/ | Template de portfólio de US$ 129 que junta neumorfismo arejado e grade bento, com superfícies elevadas e afundadas por sombras em camadas, efeitos de hover e pressionado e depoimentos que podem vir do CMS. |
| N55 | Galeria (lista) | An Introduction to Neumorphic Design (Mockplus, 11/03/2022) | https://mockplus.com/blog/post/neumorphic-design-examples-ui-kits | Lista 20 exemplos, quase todos shots do Dribbble e projetos do Behance: quatro players de música, pet shop, BMW, Adidas, casa inteligente, redesigns do Google e do Tinder e cinco kits. De comida, só um app de cafeteria e um template de café em XD; não há restaurante nem delivery. |
| N56 | Galeria (implementação de conceito) | KyleKun/coffee-shop (GitHub) | https://github.com/KyleKun/coffee-shop | Implementa em Flutter o design Neumorphic Coffee Shop, de Zhenya Karapetyan. O endereço do link do Dribbble indica um XD gratuito. Tem 1 commit e 4 estrelas e não é loja em operação. |

## Padrões de página

Um padrão só é "recorrente" com 3 exemplos independentes, de autores diferentes. Todos os exemplos abaixo são **conceito** (kit, template, demo ou implementação de shot). Não encontrei nenhuma Home publicada em neumorfismo.

### P1. Grade de cartões elevados para conteúdo estático (recorrente)

A página se organiza em cartões do mesmo material do fundo, elevados por duas sombras, às vezes com borda clara e com o ícone ou a foto num poço afundado. É o uso que o autor e os praticantes consideram seguro: o cartão não é elemento ativo, e a ação fica num botão dentro dele.

- **Exemplos:**
  - [N44] https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/index.html: 7 cartões de cor elevados em grade e 2 cartões de preço elevados, sobre seções sem borda. Conceito (kit livre); domínio: kit de UI e SaaS.
  - [N52] https://carlwebdev.github.io/a-neumorphism-demo/: grade de três cartões elevados (painel, tocando agora, central de controle). Conceito (demo); domínio genérico.
  - [N54] https://www.framer.com/marketplace/templates/neu-bento/: grade bento com superfícies elevadas e afundadas, pela descrição do marketplace. Conceito (template pago); domínio: portfólio.
  - [N45] https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/html/pages/about.html: cartões de valores, de imagem e de equipe elevados. É do mesmo kit de [N44] e não conta como independente.
- **Fontes:** [N11], [N30], [N31], [N32] e [N41].

### P2. Bloco de controles macios, como o painel de um aparelho (2 exemplos)

Um bloco que imita o painel de um aparelho, com switches, controles de mídia, volume e progresso. Os praticantes o indicam para interfaces de propósito único e baixa densidade. Não é recorrente pelo critério.

- **Exemplos:**
  - [N52] https://carlwebdev.github.io/a-neumorphism-demo/: central de controle com volume, campo, toggle e botão de salvar, e, ao lado, um cartão de mídia com anterior, tocar e próximo. Conceito (demo); domínio genérico.
  - [N53] https://chrislemke.github.io/website_designs/examples/Neumorphism.html: quatro switches e quatro barras de progresso. Conceito (demo); domínio genérico.
- **Citados sem que a tela tenha sido vista (não contam):** shots de casa inteligente, BMW e players listados por [N55]; os conceitos de Tesla, rádio e chaleira de [N39]; a casa inteligente do Envato Elements em [N38].
- **Fontes:** [N35] (propósito único), [N36] (poucos controles por região, mostradores circulares), [N37] (superfícies fechadas com ar de hardware) e [N39] (domínios).

### P3. Campos, trilhos e poços afundados (2 exemplos)

Campos de texto, trilhos de switch, moldura de mapa e poços de ícone ou foto entram na superfície por sombra interna. O que fica por cima (polegar, cartão) sai dela.

- **Exemplos:**
  - [N48], [N50], [N47] e [N45] (um só kit): campo com sombra inset, trilho do switch inset, mapa num poço inset, ícone de valor e foto de equipe em poço inset. Conceito (kit livre); domínio: kit de UI.
  - [N52] https://carlwebdev.github.io/a-neumorphism-demo/: a página põe os campos afundados entre os padrões dela. Conceito (demo); domínio genérico.
- **Fontes:** [N30] (`inset` dá o pressionado), [N33] (baixo-relevo por profundidade negativa, como forma genérica) e [N35] (em formulário longo, os poços escondem o campo ativo).

### P4. Selecionado afunda e muda de cor ou de posição (2 exemplos)

O selecionado não fica só na inversão da sombra. A pílula ativa afunda e troca fundo, texto e borda; o polegar do switch muda de cor e de lado; o checkbox marcado ganha a cor de acento.

- **Exemplos:**
  - [N51] https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/scss/neumorphism/components/_nav.scss: na pílula ativa, entram a sombra inset e as cores de fundo, texto e borda. Conceito (kit); domínio: kit de UI. No mesmo kit, [N50] escurece e desliza o polegar do switch ligado.
  - [N33] https://pub.dev/packages/flutter_neumorphic: o checkbox marcado e o switch ligado ganham a cor de acento, e o botão muda de profundidade ao toque. Conceito (documentação de biblioteca, sem produto que a use); domínio: componentes Flutter.
- **Fontes:** [N11] (estado comunicado por ícone, sublinhado ou cor), [N16] (3:1 para o indicador de estado) e [N35] (a sombra sozinha não é estado).

### P5. Faixa de números (recorrente)

Uma fileira de números grandes resume o produto, em caixas com ícone ou num cartão de painel. Nenhuma fonte de pesquisa ou praticante avalia o padrão; só os exemplos o mostram. Na loja, só serve com números derivados do cardápio.

- **Exemplos:**
  - [N45] https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/html/pages/about.html: três contadores, cada um com ícone elevado, rótulo e número grande. Conceito (kit); domínio institucional.
  - [N53] https://chrislemke.github.io/website_designs/examples/Neumorphism.html: fileira de cinco números sobre o próprio estilo, no começo da página. Conceito (demo); domínio genérico.
  - [N52] https://carlwebdev.github.io/a-neumorphism-demo/: cartão de painel com quatro métricas. Conceito (demo); domínio genérico.
- **Fontes:** só os exemplos.

### P6. Seções de venda: planos, clientes, depoimentos e FAQ (2 exemplos)

Os kits e templates trazem planos em cartões afundados, logos de clientes, depoimentos e FAQ em acordeão. Na loja, nenhuma dessas seções tem conteúdo real.

- **Exemplos:**
  - [N46] https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/html/pages/pricing.html: três planos afundados, seis clientes e FAQ em acordeão. Conceito (kit); domínio: SaaS. Do mesmo fornecedor, [N43] anuncia páginas de Preços, Perfil, Serviços e Blog.
  - [N54] https://www.framer.com/marketplace/templates/neu-bento/: depoimentos que podem vir do CMS. Conceito (template); domínio: portfólio.
- **Fontes:** só os exemplos.

## Catálogo de seções candidatas

Os números e listas do cardápio vêm da store de produtos (`src/stores/products.js`), que carrega `src/json/products.json` e o cardápio editado no painel. Por isso, toda contagem é calculada, nunca escrita à mão.

| Seção | O que faz | Origem | Conteúdo real exigido (arquivo e campo) | Viável sem inventar? |
|---|---|---|---|---|
| Navegação em pílulas | Marca e pílulas Início, Cardápio e Entrar/Perfil elevadas. A página atual afunda e troca fundo, texto e borda, e o foco não é sombra. O carrinho é um botão redondo elevado com selo. | P4, [N51], [N11], [N16] | `dados.js`: `MARCA`. `useLinksPrincipais.js`: `rotulo` (Início, Cardápio, Entrar ou Perfil). `useContadorCarrinho.js`: `quantidade` e `rotulo`. | Sim |
| Hero na mesma superfície | Título e texto direto na superfície, como o hero do kit, sem sombra nem borda. O recorte fica num disco elevado. "Ver cardápio" é plano, em acento e fora do relevo. | [N44], [N31], [N37], [N38] | `dados.js`: `HERO.titulo`, `HERO.texto`, `HERO.acao`, `HERO.imagem`, `HERO.alt` e `IMAGEM_HERO` (WebP com alfa em 480 e 960, PNG 960). | Sim |
| Faixa de mostradores | De três a cinco números derivados em caixas elevadas, com rótulo em texto de 4,5:1 e sem animação de contagem. | P5 | `products.json`: `menuItems.foods.length` (7), `drinks.length` (3) e `desserts.length` (1); menor `price`, com `formatPrice` (hoje R$ 4,99 no geral e R$ 10,90 entre os lanches); `foodAdditionals.length` (5) e `dessertAdditionals.length` (7). | Sim, só com derivados |
| Segmentado de categorias | Três segmentos num trilho afundado. O selecionado muda de cor e ganha ícone, além da sombra, e filtra a grade, com `aria-pressed` ou rádio e foco visível. | P4, [N51], [N24], [N11], [N16] | `dados.js`: `CATEGORIAS` (`chave` e `rotulo`). `products.json`: `menuItems.foods`, `drinks` e `desserts`. | Sim |
| Grade "Mais pedidos" | Um cartão elevado e não interativo por lanche: foto num poço, nome, descrição e preço. O botão "Adicionar <nome>", em acento, abre o modal Personalizar real. | P1, [N11], [N32], [N31] | `dados.js`: `SECAO.titulo` (e `anterior`/`proximo`, se houver setas). `menuItems.foods`: `name`, `description`, `price` e `image` (480, 960 e 1440, WebP e JPG). Fluxo de `usePersonalizar.js`. | Sim |
| Painel do lanche | Bloco de baixa densidade: um grupo de rádio escolhe um dos 7 lanches, e um mostrador exibe ingredientes, preço e número de adicionais. O único botão que age é "Personalizar". Os adicionais aparecem como lista, sem switches que não fazem nada. | P2, [N35], [N36], [N13] | `menuItems.foods[]`: `name`, `ingredients` e `price`. `foodAdditionals` (`name` e `price`); o modal só oferece esses adicionais à categoria `foods` (`ModalAdditional.vue`). Os rótulos do seletor e do mostrador são microcopy provisória. | Sim |
| Bebidas e sobremesa | Uma fileira de cartões elevados menores, com o mesmo botão de adicionar. A sobremesa mostra o número de adicionais dela. | P1 | `menuItems.drinks` (3, sem `ingredients` e sem adicionais), `menuItems.desserts` (1) e `dessertAdditionals.length`. | Sim |
| Horário, endereço e contato | Três blocos elevados com ícone: elevado, como na página de contato do kit, ou num poço, como nos valores da página Sobre. Sem mapa embutido. | [N47], [N45] | `dados.js`: `HORARIO`, `CONTATOS` (endereço com link do Google Maps, WhatsApp e e-mail) e `RODAPE.endereco`/`RODAPE.horario`. Um iframe de mapa de outra origem exigiria mexer na CSP. | Sim |
| Switch de tema claro/escuro | Um switch real (`role="switch"`, `aria-checked`) alterna entre a superfície clara e uma escura com sombras próprias. O polegar muda de lado e de cor. | [N52], [N53], [N37], [N23], [N50] | Não usa texto da loja; o rótulo é microcopy provisória. Custa um segundo conjunto de sombras, e lembrar a escolha exigiria uma chave nova de localStorage. | Sim, com custo |
| Rodapé elevado | Um cartão de rodapé com marca, descrição, redes em botões redondos elevados e a linha de direitos. | P1 (o rodapé do kit é um parcial que não foi lido) | `dados.js`: `MARCA`, `DESCRICAO`, `REDES` (`nome`, `url` e `rotulo`) e `RODAPE.copyright`. | Sim |
| Indicador "aberto agora" | Luz ou selo de status que acende no horário de funcionamento. | [N52] (pílulas de status) | Exigiria uma regra de horário, fuso e feriados que o inventário não lista entre os derivados. | Não |
| Planos ou combos | Cartões de plano afundados com botão de compra. | [N46], [N43] | Não há combos, promoções nem cupons. | Não |
| Clientes, depoimentos e avaliações | Cartões de clientes e blocos de depoimento. | [N46], [N54] | Não há avaliações, notas, depoimentos, imprensa nem prêmios. | Não |
| Sobre, equipe e contadores institucionais | História, equipe e números da empresa. | [N45] | Não há história da casa, fotos do local ou da equipe, nem número de pedidos. | Não |
| FAQ em acordeão | Perguntas frequentes num contêiner elevado. | [N46], [N52] | As respostas típicas (prazo, taxa e raio de entrega, alergênicos) não existem. | Não |
| Formulário de contato | Nome, e-mail e mensagem em campos afundados. | [N47] | Sem back-end, o envio seria falso. O contato real é o WhatsApp e o e-mail de `CONTATOS`. | Não |

## Componentes típicos e estados

- **Botão elevado secundário (Anterior/Próximo, redes):**
  - repouso elevado, com limite de 3:1 (borda ou contorno) [N16];
  - hover suplementar, que não reduz o contraste [N16];
  - foco por anel ou borda de 3:1 [N16]: no kit, o foco é a mesma sombra inset do hover e não tem sinal próprio [N49], e sombra fora do componente não entra no perímetro do 2.4.13 [N17];
  - pressionado que afunda e muda de cor ou de ícone [N11], sabendo que a troca de elevado para inset não anima [N22];
  - desabilitado isento de contraste, mas reconhecível [N16][N19].
- **Botão de ação em acento ("Adicionar <nome>", "Ver cardápio"):**
  - plano, preenchido em acento, com texto em 4,5:1 [N31][N37][N38][N30][N19];
  - foco visível de 3:1 [N16];
  - pressionado só por `transform` ou `opacity` [N27].
- **Switch (tema):**
  - desligado com trilho afundado [N50];
  - ligado com o polegar do outro lado e de outra cor [N50][N33]: o fundo interno contrasta 3:1 com o externo, e o polegar, com o interno [N16];
  - foco visível, que o kit não define [N50];
  - desabilitado com o polegar translúcido [N50];
  - `role="switch"` com `aria-checked`, Espaço alterna e o rótulo é fixo [N23].
- **Segmento ou pílula alternável (categorias, navegação):**
  - não selecionado, elevado e com borda; hover que muda só a cor do texto [N51];
  - selecionado, que afunda e troca fundo, texto e borda [N51], com `aria-pressed` [N24] ou rádio;
  - foco visível [N16].
- **Stepper de quantidade (QuantityStepper do modal):**
  - o campo é o único que recebe foco, com setas, Home e End [N25];
  - no limite, o botão correspondente fica visualmente desabilitado [N15];
  - botões de mais e menos grandes, na horizontal, com alvo de 24 px ou mais [N15][N18].
  - Não encontrei exemplo de stepper neumórfico.
- **Campo afundado (observação no modal):**
  - repouso inset com borda de 3:1 [N48][N16];
  - foco com borda ou anel de 3:1, porque o kit zera o foco do campo [N48][N16];
  - erro com cor mais texto [N40][N41];
  - borda de reserva em cores forçadas [N20].
- **Cartão elevado estático (produto, bebida, contato):** elevado e não interativo, com a ação num botão interno [N11][N32]. Em cores forçadas, precisa de borda, porque a sombra some [N20].
- **Poço afundado de ícone ou foto:** decorativo; a foto tem `alt` e o ícone, `aria-hidden` [N45][N47].
- **Mostrador numérico:** estático, com rótulo em texto de 4,5:1 [N19] e sem animar a contagem [N27].
- **Slider com trilho afundado:** usa `aria-valuenow/min/max`, foco no polegar, setas, Home e End [N26]. O APG não tem padrão de mostrador giratório [N26], e o daisyUI só o cita, sem exemplo [N36].
- **Checkbox ou rádio de adicionais (modal):** marcado com cor de acento [N33] e marca de 3:1 [N16]; foco visível.
- **Botão do carrinho com selo:** vazio ou com o número; alvo de 24 px ou mais [N18]; foco visível [N16].

## Riscos de acessibilidade e desempenho

- **Limite abaixo de 3:1 (1.4.11):** no kit de referência, a cor clara de borda dá 1,15:1 sobre o fundo, e a sombra escura, 1,59:1 (cálculo da verificação) [N48][N16]. A receita do Superdesign dá 1,40:1 [N37]. O relevo típico não identifica o controle sozinho.
- **Estado só pela sombra:** o pressionado invertido não sinaliza a mudança [N11], e o usuário não distingue repouso, pressionado e ativo [N32].
- **Foco confundido com hover:** no kit, o foco do botão é a mesma sombra inset do hover, o foco do campo é zerado, e o arquivo de formulários não define foco para switch e checkbox [N49][N48][N50]. Sombra e brilho fora do componente não entram no perímetro do 2.4.13 [N17].
- **Cores forçadas:** `box-shadow` vira `none`, e cartão, poço, trilho e botão perdem o limite sem uma borda de reserva [N20]. O `prefers-contrast: more` permite reforçar a borda [N21].
- **Clicável parecido com não clicável:** o mesmo material em cartões e botões confunde [N13][N31]. Um painel que imita aparelho com controles que não agem piora isso.
- **Hierarquia achatada e marca apagada:** a chamada para ação perde destaque com a cor do fundo [N31]. Os praticantes desaconselham o estilo em fluxos de compra e em e-commerce com muitas chamadas [N35][N37].
- **Texto cinza fino sobre a base:** reprova o 1.4.3 (4,5:1, sem arredondar) [N19][N36].
- **Baixa visão:** sem borda visível, não se sabe onde o alvo começa e termina; no escuro, a sombra se destaca menos que o contorno [N14].
- **Alvos pequenos:** pílulas, botões redondos e os mais e menos do stepper precisam de 24 × 24 px ou da exceção de espaçamento [N18][N15]. O alvo de 44 × 44 px do Setproduct [N35] vai além do mínimo AA de 24 px [N18].
- **Formulário longo:** os poços escondem o campo ativo [N35]; a densidade deve ser baixa [N36].
- **Animação de sombra:** a troca elevado → inset não interpola [N22], e animar `box-shadow` pesa no desempenho, sobretudo no celular [N29]. A técnica segura põe a sombra num pseudo-elemento e anima só a opacidade [N29], o que respeita a regra do projeto de animar só `transform` e `opacity` [N27].
- **Pintura:** sombra com desfoque demora mais para pintar [N27]; certas combinações custam mais que a soma das partes [N28]; e sombras grandes devem ficar em poucos contêineres, não em centenas de itens [N37]. As fontes são antigas (Chrome 27 beta, 2015) ou de fornecedor: meça com o DevTools.
- **Modo escuro:** pede sombras próprias, porque inverter não basta [N37], e um modo alternativo não substitui a acessibilidade da interface padrão [N40].
- **Toque:** as tecnologias assistivas de toque podem ter dificuldade com o padrão de slider [N26].

## Não encontrei

- **Site ou app publicado de comida, restaurante ou delivery em neumorfismo:** não encontrei. De comida, só há conceitos de cafeteria: um shot e um template em XD listados por [N55] e a implementação em Flutter de [N56].
- **Home ou landing publicada em neumorfismo:** não encontrei. Os produtos reais citados são os ícones do macOS Big Sur e a TV Honor Vision [N34], além da instituição financeira sem nome de [N11]. Todos os exemplos de página inteira são kits, templates ou demos.
- **Estudo controlado de desempenho de tarefa com neumorfismo:** não encontrei. O estudo do Google trata de contorno e sombra [N14].
- **Painel de controles macios publicado:** não encontrei. Os dois exemplos abertos são demos, e os shots de [N55], [N39] e [N38] foram só citados, sem a tela vista.
- **Stepper neumórfico:** não encontrei exemplo. **Mostrador giratório:** só citado pelo daisyUI [N36], sem exemplo, e sem padrão no APG [N26].
- **Segmentado afundado:** só nas pílulas do kit Themesberg [N51].
- **Medição recente de `box-shadow` no celular:** não encontrei; só fontes antigas [N28][N29] e a afirmação de um fornecedor [N37].
- **Foco de switch, checkbox e rádio no kit Themesberg:** não está em `_custom-forms.scss` [N50]; os outros arquivos não foram abertos.
- **Quem cunhou o termo:** a Wikipedia escreve "Jason Kelly" [N34], e o daisyUI, "Jason Kelley" [N36]. Não conferi na fonte primária.
- **Fornecedores:** os textos do daisyUI e do Superdesign vêm de fornecedores de ferramentas; nenhum diz se o texto foi gerado.

## Não abriu

O verificador não tentou de novo estes endereços; os motivos são os do pesquisador.

| URL | Motivo |
|---|---|
| https://demo.themesberg.com/neumorphism-ui-pro/html/sections/features.html | HTTP 429; foi lido o código-fonte do kit livre no GitHub |
| https://demo.themesberg.com/neumorphism-ui-pro | HTTP 429 |
| https://demo.themesberg.com/neumorphism-ui/ | HTTP 429 |
| https://demo.themesberg.com/neumorphism-ui/html/pages/about.html | HTTP 429 |
| https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/index.html | 404 (caminho errado; os arquivos estão em `src/`) |
| https://raw.githubusercontent.com/themesberg/neumorphism-ui-bootstrap/master/src/html/components/cards.html | Só a casca da página; os cartões vêm de um parcial que não foi lido |
| https://blog.logrocket.com/ux-design/neumorphism-ui-design | HTTP 403 |
| https://www.researchgate.net/publication/394674856_UI_flat_design_and_skeuomorphism_mediation_with_neumorphism_material_design | HTTP 403 |
| https://etd.repository.ugm.ac.id/home/detail_pencarian_downloadfiles/1016529 | PDF binário, ilegível pela ferramenta (nada foi instalado) |
| https://stock.adobe.com/images/neumorphic-food-order-and-delivery-application-interface-vector-ui-ux-or-gui-of-mobile-app-touch-screen-of-fast-food-restaurant-or-cafe-online-order-service-registration-search-menu-page/478231255 | HTTP 403 |
| https://kombai.com/examples/templates/mapleridge | HTTP 404 |
| https://mycodelesswebsite.com/neumorphism-websites/ | Página de verificação anti-robô |
| https://www.designrush.com/best-designs/websites/trends/neumorphism-website | Só a listagem de artigos, sem o texto |
| https://neu-bento.framer.website | Só o texto, sem informação de relevo nem de seção; foi usada a página do marketplace |
| https://pub.dev/documentation/flutter_neumorphic_studio/0.1.1/components_neumorphic_controls_controls | Abriu, mas sem estados; não foi usada |
| https://webflow.com/made-in-webflow/website/Nicecard-Neumorphic-Template | Não tentado: bloqueio conhecido do webflow.com (vale também para webflow.com/blog/neumorphism e made-in-webflow/neumorphism) |
| https://medium.com/@xurxe/accessible-neumorphism-soft-ui-992286900bfa | Não tentado: bloqueio conhecido do medium.com e do uxdesign.cc |
| https://axesslab.com/neumorphism/ | Não tentado: 403 conhecido |
| https://dribbble.com/shots/11021574-Coffee-Shop-App-Neumorphism | Não tentado: o Dribbble devolve páginas vazias; o exemplo vem da lista da Mockplus |
| https://www.behance.net/gallery/92459571/Free-XD-neumorphic-app-template | Não tentado: 403 conhecido do Behance; o exemplo vem da lista da Mockplus |

## Refutadas na verificação

**Trechos derrubados (afirmações contadas como refutadas):**

- **A21 (web.dev, paint times):** a medição não foi feita com o Continuous Paint do DevTools; foi uma automação própria sobre Skia, e o Continuous Paint aparece só como sugestão. "Só no Chrome de desktop" e "por volta de 2013" também caem, porque a página não diz a plataforma nem a data (só cita o Chrome 27 beta). O resto sobreviveu em [N28].
- **A32 (Toptal):** a frase de que todos os exemplos são conceitos cai. Só quatro vêm rotulados como conceito, e a calculadora da Justinmind não traz essa indicação.
- **A42 (mixin de botão):** a frase de que foco, hover e pressionado ficam visualmente parecidos é inferência, não está no código. O código só mostra que o foco usa a mesma sombra inset do hover.
- **A43 (switch do kit):** a frase de que, ligado e desabilitado, o trilho fica esmaecido cai, porque a cor vem de uma variável que o arquivo não define. Só a opacidade de 40% do polegar se confirmou.

**Exemplos derrubados ou corrigidos:**

- **P1, exemplo de `index.html`:** as "3 caixas de ícone e 9 caixas de recursos elevadas" não são cartões elevados; elevados são só os círculos de ícone. O exemplo ficou com os 7 cartões de cor e os 2 de preço, que são elevados.
- **P2, exemplos da Mockplus, da Toptal e da Tuts+:** as páginas só citam títulos de shots e conceitos, e a tela não foi vista. Não contam como exemplo do padrão.
- **P3, exemplo do flutter_neumorphic:** a página documenta o baixo-relevo como forma genérica de contêiner, sem dizer que campo, trilho ou progresso são afundados. O exemplo saiu, e o P3 ficou com 2 exemplos, deixando de ser recorrente.
- **Seção "Horário, endereço e contato":** a ideia de ícone num poço afundado "como na página de contato do kit" cai. Lá os ícones são elevados; o poço de ícone está nos cartões de valores da página Sobre.
- **P4, fonte A30 (Superdesign):** a página não fala de estado selecionado e saiu das fontes do padrão.
- **Classe de A26 (flutter_neumorphic):** foi declarada referência técnica, mas é biblioteca de terceiro, com publicador não verificado. Foi reclassificada como praticante.

**Ajustes de redação (a afirmação sobreviveu):**

- **A1:** o autor aponta como grande problema o estado pressionado, não os componentes interativos em geral. Ele próprio diz que o botão funciona se o ícone contrastar.
- **A2:** confirmada. Na página, "active elements need to communicate their state at all times" (Malewicz, [N11]).
- **A5:** a NN/g diz que fica difícil saber o que é clicável. A ideia de "não saber onde clicar" é dedução.
- **A23:** campos e barras de progresso aparecem só numa captura; a demonstração em código é de botões e toggles.
- **A25:** a página diz que os estados parecem iguais, não quase iguais, e não fala em "controles essenciais", só em botões.
- **A28:** os 44 × 44 px estão na especificação para IA da página, rotulados como WCAG 2.2. A venda de kits aparece só nos links do menu.
- **A35:** o README fala em 5 e também em 13 páginas de exemplo.
- **A38:** o número do contador fica abaixo do círculo do ícone, não dentro dele.
- **A46:** a página mostra só dois botões rotulados (padrão e pílula ativa).
- **A49:** o XD gratuito é inferido pelo endereço do link do Dribbble.

## Referências visuais (galerias)

Coletadas no Chrome em 20 e 21/11/2026, numa aba própria, recusando os cookies não essenciais. Só as páginas que abriram; 7 exemplos. Servem só de exemplo do padrão abstrato: nenhuma imagem, layout ou código foi copiado. As descrições são paráfrases.

| URL | Galeria | Publicado ou conceito | Domínio | Padrões vistos |
|---|---|---|---|---|
| https://dribbble.com/shots/14238057-Neumorphism-Food-App-Design | Dribbble | Conceito (shot) | Comida: app de pedidos (burger, pizza, bebida) | Fundo e superfícies na mesma cor fria e clara; cartões e botões "saindo" do fundo, com sombra dupla (clara em cima, escura embaixo); categorias como ladrilhos quadrados em relevo, e o ativo afundado; quantidade em… |
| https://dribbble.com/shots/9934278-Neumorphism-Style-Food-Ordering-UI | Dribbble | Conceito (shot) | Comida: pedido de pratos (salada, carne) | Prato fotografado de cima dentro de uma "cuba" circular afundada; vagas de complemento como quadrados rebaixados com "+"; paleta cinza-azulada quase monocromática; cor de destaque só no preço e no CTA (verde forte);… |
| https://dribbble.com/shots/14444054-Digital-Menu-App-Neumorphic | Dribbble | Conceito (shot) | Restaurante: cardápio digital (hambúrguer, pizza, drinques) | Categorias como pílulas verticais em relevo, com ícone de traço fino e contador; a ativa preenchida com um tom quente de caramelo, a única cor da tela; preço dentro de uma pílula rebaixada no cartão; cartões em relevo… |
| https://dribbble.com/shots/10085875-Neumorphism-Dashboard | Dribbble | Conceito (shot) | Painel de análise (fãs e receita) | Item ativo do menu como pílula em relevo; indicadores com ícone em botão redondo saliente; barras do gráfico como trilhos rebaixados com o valor preenchido em escuro; rosca dentro de um anel em relevo; quase sem cor,… |
| https://www.uistore.design/items/neumorphic-ui-elements-for-sketch/ | UI Store Design | Conceito (kit de componentes gratuito, de 2020) | Biblioteca de componentes de interface | Par "em relevo × afundado" como linguagem de estado: botão saliente, campo de texto rebaixado; rádio como poço com ponto; alternador com trilho azul e botão claro saliente; controles deslizantes como canaletas fundas… |
| https://dribbble.com/shots/10124514-Luminarious-molecular-cuisine-dashboard-neomorphism | Dribbble | Conceito (shot) | Comida: painel de cozinha e plano de refeições | Neumorfismo misturado com outros recursos: cartões de prato em relevo leve com foto de prato em círculo; atalhos como quadrados arredondados em relevo com ícone colorido; vagas vazias tracejadas para "adicionar"; aba… |
| https://dribbble.com/shots/27120014-Neumorphism-Design-Agency-Website-Website-UI-UX-design | Dribbble | Conceito (shot) | Site de agência de design (landing page) | Menu como pílula flutuante em relevo, centralizada; título que mistura sans-serif e serifa itálica; botão principal claro em relevo e secundário com contorno fino; cartão grande de projetos em relevo suave; lista de… |
