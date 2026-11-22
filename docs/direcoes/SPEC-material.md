# SPEC: Material 3 Expressive ("Alface") no Smash Burger

Especificação para levar a direção visual **Material 3 Expressive** à loja e ao painel. O usuário escolheu este estilo em 21/11/2026, entre as três Homes exploradas (Material 3 Expressive, esqueumorfismo e neumorfismo).

- **Ponto de partida:** o código em `88bda1a` (branch `feature/direcoes-homes`).
- **Referência viva:** a Home de `#/direcoes/material` (só no `yarn dev`), em `src/direcoes/estilos/material/`. O crítico a aprovou na rodada 3, com notas 4, 4, 4, 4, 5 e 4 (soma 25; a v1 somava 16) (`docs/direcoes/desenho/material.md`, §14).
- **Desenho:** `docs/direcoes/desenho/material.md`. As referências a ele aparecem como "desenho, §n".
- **Fontes:** os rótulos entre colchetes são os dos dossiês: [1] a [36] em `docs/direcoes/PESQUISA.md` (seção "Material 3 e M3 Expressive"), [53] a [87] em `docs/direcoes/pesquisa/material.md` e [H1] a [H45] em `docs/direcoes/pesquisa/home-delivery.md`.
- **SPEC atual:** `SPEC.md` (a "Brasa") continua valendo para tudo o que este documento não troca: fluxos (§10 de lá), rotas, guards, dados, sessão, senhas e imagens. Os IDs como [FLX-02] apontam para o `AUDIT.md`.

---

## 0. Decisões que este SPEC assume

| Tema | Decisão |
|---|---|
| Direção visual | **Material 3 Expressive "Alface"**: esquema TonalSpot claro gerado pelo `@material/material-color-utilities` 0.4.0 (spec 2021) a partir da semente `#5DBB63`, a alface do `BurgerStack` (comentário do `_tokens.scss` do material). Roboto Variable na escala do M3 [1], forma cookie de 12 lobos (geometria própria) e molas do Expressive [23]. |
| Tese | A marca vira sistema: a semente gera os papéis de cor em pares [1][5]. O Expressive soma molas, troca de forma e tipografia enfatizada [25]. A ousadia fica num lugar só, o hero (o hero moment do nível excelente [65]); o resto é quieto: superfícies tonais, listas segmentadas e cards sem sombra (desenho, §1). |
| Contexto | Portfólio pessoal. A meta continua sendo um sistema coerente de ponta a ponta. |
| Nome da marca | **Smash Burger** em todo o projeto. O wordmark deixa de ser "SMASH BURGER" em Bebas: é `MARCA` ("Smash Burger") em title-l 22/28, peso 500 (`M3BarraSuperior`). |
| Escopo | Loja e painel admin, com os mesmos tokens. |
| Estrutura | A Home é a do desenho, já construída. As outras telas mantêm a estrutura, os fluxos e os textos do `SPEC.md` (§5 e §10 de lá) e trocam a pele pelos componentes M3. O que o desenho não cobre fica marcado **"a desenhar"**, com uma recomendação. |
| Componentes | Feitos à mão, como na Home. O `@material/web` está em manutenção e não tem top app bar, badge nem carrossel [29]; fica fora (§11). |
| Movimento | Só `transform` e `opacity`, como manda o projeto. A troca de forma é feita por opacidade entre duas camadas, e as molas viraram curvas `linear()` por script, que é uma aproximação (desvios da ficha). |
| Defeitos de fluxo | Entram só os três conhecidos da construção (§10). |
| Stack | Nenhuma atualização. A única mudança de dependência é a das fontes (b). |
| Fontes (decisão do usuário, 21/11/2026) | Só a Roboto Variable passa a `dependencies`. Courier Prime e Nunito continuam como `devDependencies`, porque o acervo usa as duas. Archivo e Bebas Neue saem quando a produção não as usar mais (b). |
| Acervo (decisão do usuário, 21/11/2026) | A exploração continua só no `yarn dev`, fora do build, como acervo de ideias de UI/UX: `#/direcoes/esqueumorfismo` e `#/direcoes/neumorfismo` ficam, com fichas, desenhos e dossiês. A migração não mexe nessas Homes. `src/direcoes/estilos/material/` serve de referência durante a migração; depois da migração, ela fica congelada no acervo (decisão e). |
| Contraste | Todo par de papéis usado como texto, borda ou foco tem mínimo declarado e medido (§1.1, item 2; §2.2). |

**Desvios do M3 que ficam** (ficha do material, `desvios`):
- ícones do Font Awesome no lugar dos Material Symbols [71] (decisão c: fica o Font Awesome);
- molas do Expressive [23] convertidas em `linear()`: é uma aproximação da física do Compose;
- sem morph de forma: a prensa usa escala, giro e opacidade, e os botões trocam de forma por opacidade entre duas camadas, pela regra de animar só `transform` e `opacity` [72];
- os guias de níveis de expressão e de linguagem do Expressive são do Wear OS [65][66]: na web, servem só de intenção;
- botão S de 40 dp com 44 px de altura [19], pela regra de alvo de toque do projeto;
- sem ripple: só as camadas de estado [12];
- sombras de elevação aproximadas, nos níveis do M3 [10].

**Proibido nesta direção** (desenho, §11 e §12):
- hover em todo card: o card não reage ao ponteiro, só os botões;
- busca no topo [62], FAB menu [56] e indicador de carregamento sem espera real [58] (o carrossel saiu desta lista em 21/11/2026: só na seção nova da §0.2, nas condições dela);
- cor fora dos papéis: nenhuma cor nova sai de outro lugar que não a semente;
- tirar rótulos de texto da navegação: na pesquisa do Google, tirar rótulos piorou a usabilidade [26];
- opacidade como ênfase: a ênfase vem dos pares de cor e do peso, e a opacidade fica só no desabilitado [1] (as camadas de estado são a exceção documentada [12]);
- selo "aberto agora", "mais pedidos" ou "a partir de R$" sem dado por trás (desenho, §12 e §13);
- qualquer número, prazo, taxa, avaliação ou promoção inventados;
- redes sociais com links genéricos (`facebook.com`, `instagram.com`) [H25][H26];
- animar `border-radius`, `clip-path`, largura, altura ou posição.

**O que cai do SPEC da Brasa:** as proibições da §0 de lá (o fundo off-white, já que a `--m3-surface` é `#f7fbf1`, e o botão em pílula, já que no M3 os botões são `full` [7], passam a ser a regra); as quatro micro-interações 3D (§7.8); o tema único escuro (decisão d: só o esquema claro); Bebas Neue e Archivo na produção (b).

**O que o acervo usa da produção** (conferido no código de `src/direcoes/`). A migração mantém isto, para as Homes do acervo continuarem como estão:
- **módulos:** `AssinaturaEncaixe.vue`, `ModalAdditional.vue`, `useProductModal`, `useResponsiveImage`, `useScrollLock`, as stores `cart`, `products` e `userStore` e os utilitários `formatters` e `tokens`, com a mesma API;
- **tokens da base:** as Homes de esqueumorfismo e neumorfismo leem só o `--radius-round` (os outros vêm dos próprios `_tokens.scss`); o índice e a ficha (`DirecoesIndice.vue`, `FichaDirecao.vue`, `SeletorDirecao.vue`) leem `--color-bg`, `--color-border-strong`, `--color-ink`, `--color-ink-muted`, `--font-display` e `--font-text` (decisão a);
- **fontes globais:** o `--esq-fonte-placa` do esqueumorfismo usa a Bebas Neue, e o `--dir-fonte` do índice usa a Archivo, as duas carregadas hoje pelo `src/main.js` (b);
- **estilos globais da base:** o reset, os `h1`–`h3` de `_typography.scss` e os utilitários (`.container`, `.tabular`, `.visually-hidden`, `.skip-link`) valem também no acervo, onde ele não os sobrescreve;
- **componentes reais nas Homes:** o modal Personalizar e o toast são os reais. Os `_tokens.scss` do acervo remapeiam os `--color-*` (33 linhas em cada) para pintá-los; quando esses componentes passarem a ler os `--m3-*` (decisão a), eles aparecem em M3 dentro das Homes do acervo. Este SPEC aceita o efeito: na exploração, só a lógica e o modal são reaproveitados (PESQUISA, "Decisões do usuário").

### 0.1 Decisões (respondidas pelo usuário em 21/11/2026)

Todas foram respondidas; em todas, o usuário seguiu a recomendação deste SPEC, salvo a (i), que ficou ligada às seções novas da §0.2. O texto de cada uma, abaixo, guarda as opções e o motivo.

| Decisão | Resposta |
|---|---|
| (a) Tokens | Os papéis do M3 viram os tokens de base; os nomes atuais ficam como apelidos temporários e saem no fim (ficam só os seis que o índice do acervo lê). |
| (b) Fontes | Só a Roboto Variable vai para `dependencies`. Courier Prime e Nunito ficam em `devDependencies`. Bebas Neue e Archivo saem da produção e passam a `devDependencies`, importadas onde o acervo as usa (`HomeEsqueumorfismo.vue` e `DirecoesIndice.vue`). |
| (c) Ícones | Font Awesome. |
| (d) Tema | Só o esquema claro, na loja e no painel. |
| (e) Pasta do material | Depois da migração, `#/direcoes/material` fica congelada no acervo, sem sincronizar com a produção. |
| (f) Modal | O `BurgerStack` fica, e o modal Personalizar ganha um desenho M3 antes de ser construído. |
| (g) Rodapé | Fora da Home, o rodapé mostra também a lista de horário e contato; na Home, ela não se repete. |
| (h) Assinatura | Fica `tom="escuro"`. |
| (i) Pacotes sem uso | O `vue3-carousel` se decide junto com as seções novas (§0.2): fica se o carrossel novo usar o pacote; senão, sai na limpeza. **Resultado (etapa 5a):** o carrossel não entrou na Home, e o pacote sai na limpeza. |
| (j) Nomes | Os componentes que substituem um base mantêm nome e API (`BaseButton`, `BaseDialog`…); os M3 sem par entram com o nome `M3*`. |

**Decisão (a): papéis de cor como tokens de base.**
- **Proposta:** os papéis do M3 (`--m3-primary`, `--m3-on-primary`, `--m3-surface-container`…) passam a ser os tokens de base em `:root`. Os nomes atuais (`--color-bg`, `--color-accent`…) viram apelidos durante a migração e saem no fim. A tabela de migração é o mapa que o `_tokens.scss` do material já faz em `:root[data-direcao="material"]` (§2.2, "Mapa dos tokens atuais"). O mesmo vale para os apelidos de tipografia (`--text-*`, `--font-*`, `--leading-*`), raios (`--radius-*`), elevação (`--elev-*`) e curvas (`--ease-*`).
- **No fim, ficam definidos** em `base/_tokens.scss` só os seis apelidos que o índice do acervo lê (`--color-bg`, `--color-border-strong`, `--color-ink`, `--color-ink-muted`, `--font-display` e `--font-text`), apontando para os papéis, e nenhum arquivo de produção os usa (busca da §13.2). Já na etapa 1, o índice passa a mostrar essas cores e a fonte do M3.
- **Recomendação:** aceitar. **Motivo:** com os apelidos, o app inteiro troca de pele na primeira etapa, sem mexer em componente; a Home mostrou isso no modal Personalizar e no toast reais, que já aparecem em M3 pelos apelidos. No fim, um nome só por papel evita dois vocabulários (o `--color-accent` da Brasa era "só ação", e o `primary` do M3 também pinta o disco do hero).

**Decisão (b): fontes (decidida pelo usuário em 21/11/2026, inclusive o ponto que estava em aberto).**
- **Decidido:** a `@fontsource-variable/roboto` 5.3.0 (hoje em `devDependencies`, importada só pelas rotas de `#/direcoes`) passa a `dependencies` e é importada uma vez, em `src/main.js`. Courier Prime e Nunito (`@fontsource/courier-prime` e `@fontsource-variable/nunito`) continuam como `devDependencies`, porque o acervo usa as duas. `@fontsource-variable/archivo` e `@fontsource/bebas-neue` saem quando a produção não as usar mais (com os apelidos de fonte, já na etapa 1).
- **Execução:** mover a Roboto não é dependência nova (o `yarn.lock` e o `.yarn/cache` já a têm), mas muda o `package.json`: commitar `yarn.lock` e `.yarn/cache` juntos e atualizar README e TESTING (CLAUDE.md). A ficha mede 43 KB em woff2 no arquivo latino.
- **Ponto que estava em aberto (respondido: ver a tabela):** o acervo também usa a Bebas Neue (`--esq-fonte-placa`, no esqueumorfismo) e a Archivo (`--dir-fonte`, no índice), que hoje chegam pelo `src/main.js` da produção. Tirar os imports do `main.js` faz o esqueumorfismo cair para "Arial Narrow" e o índice para `system-ui`.
- **Recomendação:** as duas saem de `dependencies` e entram como `devDependencies`, importadas onde o acervo as usa (`HomeEsqueumorfismo.vue` para a Bebas, `DirecoesIndice.vue` para a Archivo), como já é com Courier Prime e Nunito. **Motivo:** é a única mudança no acervo que a migração exige, e ela mantém os mockups como foram aprovados; a alternativa, aceitar as fontes de reserva, muda a cara do esqueumorfismo.

**Decisão (c): ícones.**
- **Opções:** manter o Font Awesome 6.7.2 (desvio já registrado na ficha) ou adotar os Material Symbols [71].
- **Custo dos Material Symbols, pelo dossiê [71]:** a fonte com todos os eixos pesa cerca de 7,9 MB e o conjunto completo, cerca de 295 KB; um subconjunto de três ícones pedido com `icon_names` cai para cerca de 1,7 KB, e o `display=block` evita mostrar o nome do ícone como texto antes de a fonte carregar. Servidos pelo Google Fonts, entram na CSP do `index.html` (`font-src` e `style-src`); servidos por pacote, são dependência nova, e o CLAUDE.md manda perguntar.
- **Recomendação:** manter o Font Awesome. **Motivo:** a Home foi aprovada com ele, o plugin já registra os ícones da loja, a CSP não muda e não entra dependência. Os ícones novos da Home (`faHouse`, `faChevronDown`, `faChevronUp`, `faArrowUpRightFromSquare` e o `faClock` regular) passam a ser registrados em `src/plugins/fontawesome.js`.

**Decisão (d): tema claro, escuro ou os dois.**
- **Situação:** a Brasa era só escura, e o painel era "tema único escuro" (`SPEC.md`, §0). A Home M3 é clara. O M3 tem esquema escuro com outros tons (primary 80, on-primary 20, primary-container 30, surface N6, containers 4/10/12/17/22, on-surface 90 [4]), mas os valores para a semente `#5DBB63` **não existem** no projeto.
- **Opções:** (1) loja e painel no esquema claro; (2) o painel ganha um esquema escuro gerado da mesma semente; (3) os dois esquemas na loja e no painel, com `prefers-color-scheme`.
- **Recomendação:** (1) agora. Um esquema escuro, se vier, fica para depois e sai do mesmo gerador (`@material/material-color-utilities` 0.4.0, TonalSpot, spec 2021, semente `#5DBB63`), rodado fora do projeto como foi o claro, com os pares da §2.2 medidos de novo. Nenhum valor escuro pode ser escrito à mão. **Motivo:** o esquema claro é o único medido (§2.2) e aprovado. Gerar o escuro só para o painel daria dois sistemas visuais a manter no mesmo app.

**Decisão (e): a pasta do material depois da migração.**
- **Já decidido (usuário, 21/11/2026):** o acervo fica (§0, "Acervo"), e `src/direcoes/estilos/material/` serve de referência durante a migração.
- **Opções para depois:** (1) manter `#/direcoes/material` no acervo, congelada como o mockup aprovado; (2) apagá-la quando a produção tiver o M3, tirando também a entrada do material do índice (`direcoes.js`, `fichas.js`, `contraste.js` e `rotas.js` de `src/direcoes/`) e os testes da pasta.
- **Recomendação:** (1), sem sincronizar com a produção. **Motivo:** a produção recebe cópias (§4.1) e não depende da pasta; o índice continua comparando os três estilos sem ser editado; a Home de lá segue como referência das capturas da §13.9; o custo é só o `_tokens.scss` do material repetir a base, fora do build. Apagar mexeria no índice do acervo.

**Decisão (f): montador do burger e modal Personalizar.**
- **Situação:** o desenho não cobre o modal. Na Home M3, ele é o real (`ModalAdditional`), com o layout da Brasa e as cores M3 pelos apelidos, inclusive o `BurgerStack`, a vista isométrica 3D da Brasa.
- **Recomendação:** manter o `BurgerStack` e o fluxo do modal (o montador dá retorno real: mostra o que se tira e o que se acrescenta [FLX-02]) e desenhar o modal antes de construí-lo (§5.4). As cores das camadas continuam ilustração, fora dos tokens. **Motivo:** tirar o montador apagaria o único retorno visual da personalização. Redesenhá-lo à moda M3 é trabalho de desenho, não de migração.

**Decisão (g): rodapé fora da Home.**
- **Situação:** o `M3Rodape` ficou com a marca, a descrição e os direitos, porque na Home os contatos estão na seção `onde`, logo acima (desenho, §6). Nas outras telas, o rodapé ficaria sem endereço, horário e contato.
- **Recomendação:** nas outras rotas da loja, o rodapé mostra também a lista agrupada de horário e contato (`M3ItemSegmentado`, os mesmos itens de `itensOnde`). Na Home, ela não se repete. A pesquisa transversal pede contato e horário no rodapé [H30][H29][H26]. Marcar "a desenhar" até a captura. **Motivo:** o usuário vai ao fim da página procurar o contato [H30]; só a Home tem a seção `onde`.

**Decisão (h): tom da assinatura de autoria.**
- **Situação:** o CLAUDE.md fixa `<AssinaturaEncaixe tom="escuro" />` no `MainLayout`, e a Home M3 foi aprovada assim (a `MolduraDirecao` usa `tom="escuro"`). O comentário do próprio componente diz `'claro'` sob rodapé claro e `'escuro'` sob rodapé escuro ou colorido; o `M3Rodape` é `surface-container`, claro.
- **Recomendação:** manter `tom="escuro"`. **Motivo:** a faixa escura fecha a página e já passou pelos portões. O arquivo não pode ser editado (CLAUDE.md), e trocar o tom pede uma instrução do usuário que mude o CLAUDE.md.

**Decisão (i): pacotes que ficam sem uso.**
- **Situação:** sem carrossel na Home, o `vue3-carousel` fica sem uso. A §11.1 do `SPEC.md` mantinha pacotes sem uso instalados.
- **Recomendação:** remover o `vue3-carousel` na limpeza (§12, etapa 11), com pedido explícito do usuário, commitando `yarn.lock` e `.yarn/cache` juntos. **Motivo:** dependência sem uso só soma alertas e peso no cache.

**Decisão (j): nomes dos componentes.**
- **Opções:** (1) os componentes que substituem um base atual mantêm o nome e a API dele (`BaseButton`, `BaseDialog`…) e ganham o visual M3; os componentes M3 sem par (`M3BotaoDividido`, `M3FolhaIngredientes`…) entram com o nome que têm; (2) traduzir todos para o padrão em inglês; (3) renomear todos para `M3*`.
- **Recomendação:** (1). **Motivo:** o `BaseButton` é usado em 25 arquivos, e trocar a API não muda nada para quem usa a loja. Os componentes M3 já têm testes e passaram pelos portões com estes nomes.


### 0.2 Pedidos novos e execução (usuário, 21/11/2026)

**Duas seções novas na Home do Material.** Só nela: o acervo (esqueumorfismo e neumorfismo) não muda.
- **O quê:** a Home passa de 4 para 6 seções de conteúdo (o teto do escopo da rodada 2), cada uma com desenho ou componentes diferentes do que a Home já tem, no estilo M3 Expressive.
- **Preferência do usuário:** "Adicionais em chips" ("Monte o seu": os adicionais de lanche e de sobremesa com o preço, em chips [60], levando ao cardápio) e o carrossel multi-browse do M3 [34]. As duas estão no catálogo de seções candidatas de `docs/direcoes/pesquisa/material.md` como viáveis sem inventar.
- **Quem confirma:** a sessão de desenho confirma as duas pelo dossiê e pelo juiz de distinção. Se uma não passar, troca por outra candidata viável do mesmo catálogo e registra o motivo no desenho.
- **Condições do carrossel:** sem rotação automática, com Anterior e Próximo visíveis, a espiada do próximo item e os itens na ordem do `products.json` [34]. Não repete o que o feed de Hambúrgueres e a lista de bebidas e sobremesas já mostram; o desenho define o conteúdo. Ele passa pelos riscos de carrossel do dossiê transversal (`docs/direcoes/pesquisa/home-delivery.md`). Fora dessa seção, o carrossel continua proibido nesta direção.
- **Conteúdo:** só o real, como no resto da Home; contagens e preços calculados (`useCardapio`, `formatPrice`).
- **Quando:** nas sessões de implementação, na etapa 5a da §12.
- **Resultado do desenho (decisão do usuário, 21/11/2026, etapa 5a):** entrou só a seção `monte-o-seu` (desenho, §5.5).
  - Nenhum conteúdo real passou no teste do carrossel: as 11 fotos de produto já estão na Home (desenho, §5.6).
  - Nenhuma outra candidata viável do catálogo é nova na Home.
  - O usuário escolheu ficar com **5 seções**. O carrossel volta só quando houver fotos reais que não sejam de produto, com a técnica da §5.6 do desenho, feita à mão.
- **Resultado da construção (etapa 5a, sessão C, 21/11/2026):**
  - o chip usa a reserva neutra do desenho (`surface-container-high`, nome em `on-surface`, acréscimo em `on-surface-variant`). Em `tertiary-container`, ele parecia um filter chip selecionado na captura parada em 390 (crítico, rodada 1);
  - o `h2` da produção é "Adicionais", o título da seção do modal onde esses itens se escolhem (UX copy, §8.2; escolha do usuário). A referência fica com "Monte o seu", provisório.

**Git.**
- A `feature/direcoes-homes` vai para a `develop` por PR antes da implementação, com a `origin/develop` mergeada de novo antes.
- Cada etapa da §12 sai de uma branch nova a partir da `develop`, com PR própria.
- A PR main → develop só se confere e se abre quando for abrir a primeira PR (`git merge-base --is-ancestor origin/main origin/develop`).
- Push, PR e merge só com o pedido do usuário (CLAUDE.md).

**Execução.** O plano de execução é escrito numa sessão nova do Claude Code, em modo plan, a partir deste SPEC e do CLAUDE.md. Cada etapa da §12 é executada numa sessão própria, que termina com o build, o lint e os testes verdes, a conferência visual e o commit.

---

## 1. Objetivo e critérios de aceite

Trocar cor, tipografia, forma, elevação, estados e movimento da loja e do painel pelo sistema M3 da Home aprovada, sem mudar os fluxos, e manter a Home de `#/` idêntica à de `#/direcoes/material`.

### 1.1 Critérios mensuráveis

Todos são conferidos no passo final (§13). A assinatura de autoria (`src/components/AssinaturaEncaixe.vue`) continua fora destes critérios, como no `SPEC.md` (§1.1 de lá).

#### Acessibilidade

1. **axe-core (WCAG 2.2 A/AA):** 0 violações em todas as rotas da §13.3, em 1440 e 390, com e sem movimento reduzido. O modal aberto, a folha de ingredientes aberta, os estados de erro e o menu de perfil do admin também são medidos.
2. **Contraste:**
   - texto ≥ 4,5:1 (≥ 3:1 se tiver ≥ 24 px, ou ≥ 18,66 px em negrito);
   - borda de campo, contêiner de botão contra o fundo e anel de foco ≥ 3:1 contra o que estiver ao lado;
   - **por papel:** todo par frente/fundo usado na interface está na tabela de pares (§2.2) com o mínimo declarado, e o script da §13.7 mede todos. Um papel novo usado como texto ou borda sem par reprova.
3. **Alvos de toque:** botões e links com ≥ 44 × 44 px, inclusive cada metade do split button; checkbox e rádio com ≥ 24 × 24 px, dentro de um `<label>` clicável com ≥ 44 px de altura; exceção documentada: link inline em texto corrido, com ≥ 24 px de altura [78].
4. **Foco visível:** todo elemento focável mostra o anel de 3 px em `--m3-secondary` [30] com `:focus-visible`. Nos itens encostados (vão de 2 px), o anel fica por dentro (`anel-interno`). No `:active`, o anel acompanha a forma apertada (desenho, §14).
5. **Foco não coberto:** abaixo de `lg`, a toolbar flutuante nunca cobre inteiro o elemento focado (2.4.11 [76]), com a reserva de `--m3-barra-reserva` no pé e no `scroll-padding-bottom` (técnica C43 [76]).

#### Código e performance

6. **Tokens:**
   - nenhuma cor, raio, sombra, duração, curva ou z-index escrito direto fora de `src/assets/styles/base/_tokens.scss`;
   - exceções: as cores ilustrativas do `BurgerStack`, a assinatura de autoria, `transparent`, `currentColor` e as cores de sistema dos modos de contraste (`CanvasText`, `Highlight`, `ButtonText`), que a `reserva-de-sombra` e os botões usam em `forced-colors`;
   - as propriedades locais de componente seguem o prefixo `--m3-<componente>-` (`botao`, `hero`, `item`, `prensa`) e nunca recebem valor literal de cor.
7. **Padrões banidos:** 0 `!important`, 0 `outline: none`, 0 `transition: all`, 0 `@include respond-to`, 0 `toFixed`.
8. **Troca de forma só com `transform` e `opacity`:** nenhuma `transition` ou `@keyframes` anima `border-radius`, `clip-path`, `inset`, largura, altura, margem ou padding. A troca de forma é a opacidade entre o `::before` (repouso) e o `::after` (pressionado) do mixin `troca-de-forma`. Cor e fundo podem trocar, como na Brasa.
9. **Peso da Home:** em 390 px, ≤ 1,5 MB transferidos no carregamento inicial, sem rolar a página, com a Roboto incluída.
10. **Movimento reduzido:** com `prefers-reduced-motion: reduce`, nenhum elemento das micro-interações (§7) tem `transform` computado diferente de `none`; a bola da prensa não aparece (`display: none`); as trocas ficam só por opacidade, em até `--dur-fast`.

#### Integridade do fluxo e da marca

11. **Fluxo do pedido de ponta a ponta:** o mesmo do `SPEC.md` (§1.1, item 9): personalização preservada, carrinho persistido, resumo no pagamento, confirmação com número, histórico no perfil e sair e entrar de novo.
12. **Marca e idioma:**
    - "Smash Burger" é a única grafia;
    - nenhum texto em inglês na interface;
    - preços sempre por `formatPrice` (`R$ 25,99`), com algarismos tabulares;
    - nenhum texto marcado `// provisório` chega ao build (§8.2).
13. **Fidelidade à Home aprovada:** em 1440, 1024 e 390, a Home de `#/` mostra as quatro seções do `docs/direcoes/desenho/material.json`, na ordem, com o mesmo layout da referência viva (comparação de capturas).

---

## 2. Tokens

### 2.1 Mecanismo

- **`src/assets/styles/base/_tokens.scss`** recebe, em `:root`, os tokens `--m3-*` copiados de `src/direcoes/estilos/material/_tokens.scss` (seções "Papéis de cor", "Forma", "Elevação", "Tipografia", "Movimento" e "Layout"), no lugar dos valores da Brasa.
- **Apelidos:** os nomes atuais passam a apontar para os papéis, com o mapa da seção "Tokens do projeto, remapeados" do mesmo arquivo (tabela abaixo). Saem no fim, pela decisão (a).
- **Ficam como estão:** espaçamento, layout, camadas, foco (com os valores novos) e as durações `--dur-*`, que o JS lê por `getComputedStyle` (`readDurationToken` em `src/utils/tokens.js`).
- **`_breakpoints.scss`:** não muda.
- **`main.scss`:** continua importando só a base.
- **O seletor `[data-direcao="material"]` não vai para a base:** em produção, os tokens valem em `:root`. O `_tokens.scss` do material continua no acervo, com o próprio seletor (decisão e).

### 2.2 Cor

Esquema claro, TonalSpot, semente `#5DBB63` (comentário do `_tokens.scss` do material). Os papéis seguem o M3: primary, secondary, tertiary e error com container e on-*; surface e surface-container de lowest a highest; outline (borda funcional) e outline-variant (decorativo); inverse e scrim [1][2][5]. No esquema claro, primary é o tom 40, on-primary 100, primary-container 90, surface N98 e on-surface 10 [3].

O contraste da última coluna foi calculado com a fórmula de `src/direcoes/contraste.js` (WCAG 2.x).

#### Primary, secondary e tertiary

| Token | Valor | Uso | Contraste relevante |
|---|---|---|---|
| `--m3-primary` | `#3a693b` | Botão filled, split button, disco do hero, text button | on-primary 6,43:1; sobre surface 6,14:1 |
| `--m3-on-primary` | `#ffffff` | Texto sobre primary; texto e anel dentro do disco do hero a partir de `md` | — |
| `--m3-primary-hover` | `#4a754b` | Filled no hover (camada de 8% já composta) | on-primary 5,33:1 |
| `--m3-primary-pressed` | `#4e784f` | Filled pressionado (camada de 10% já composta) | on-primary 5,09:1 |
| `--m3-primary-container` | `#bbf0b6` | Contêiner do hero, FAB, retorno "Adicionado" | primary 4,98:1 (contêiner) |
| `--m3-on-primary-container` | `#225025` | Texto do hero abaixo de `md`, ícone do FAB, face "Adicionado" | 7,25:1 |
| `--m3-secondary` | `#52634f` | **Anel de foco** [30] | sobre surface 6,15:1; sobre primary-container 4,99:1 |
| `--m3-on-secondary` | `#ffffff` | Sem uso direto na Home | — |
| `--m3-secondary-container` | `#d5e8cf` | Botão tonal, item atual da pílula, círculo dos ícones com link | contra primary 4,99:1 |
| `--m3-secondary-container-hover` | `#c9dbc3` | Tonal no hover | on-secondary-container 6,40:1 |
| `--m3-secondary-container-pressed` | `#c6d8c0` | Tonal pressionado | on-secondary-container 6,21:1 |
| `--m3-on-secondary-container` | `#3b4b39` | Texto do tonal e do item atual | 7,23:1 |
| `--m3-tertiary` | `#39656b` | Sem uso direto na Home | — |
| `--m3-tertiary-container` | `#bcebf1` | Círculo do ícone de informação (horário) | — |
| `--m3-on-tertiary-container` | `#1f4d53` | Ícone de informação | 7,26:1 |

#### Error e cores personalizadas

O arquivo chama `sucesso`, `aviso` e `info` de "cores personalizadas harmonizadas com a semente". Não são papéis do M3; são os estados que a loja e o painel precisam.

| Token | Valor | Uso | Contraste relevante |
|---|---|---|---|
| `--m3-error` | `#ba1a1a` | Badge do carrinho, texto de erro, ação destrutiva | on-error 6,46:1; sobre surface 6,16:1 |
| `--m3-on-error` | `#ffffff` | Texto do badge e da ação destrutiva sólida | — |
| `--m3-error-container` | `#ffdad6` | Banner de erro (apelido `--color-danger-soft`) | on-surface 13,25:1; error 5,00:1 |
| `--m3-on-error-container` | `#93000a` | Texto sobre error-container | 7,24:1 |
| `--m3-sucesso` | `#196d25` | Texto e ícone de sucesso | sobre surface 6,15:1 |
| `--m3-sucesso-container` | `#a2f79d` | Chip "Concluído" | sucesso 5,02:1 |
| `--m3-aviso` | `#7d5700` | Status "Pendente", aviso de conta salva | sobre surface 6,19:1 |
| `--m3-aviso-container` | `#ffdeaa` | Chip "Pendente" | aviso 5,03:1 |
| `--m3-info` | `#00639a` | Status "Em preparo", "Recebido" | sobre surface 6,16:1 |
| `--m3-info-container` | `#cee5ff` | Chip de status informativo | info 5,01:1 |

#### Superfícies, contorno, inverso e scrim

| Token | Valor | Uso | Contraste relevante |
|---|---|---|---|
| `--m3-surface` | `#f7fbf1` | Fundo da página, cabeçalho | on-surface 16,32:1; on-surface-variant 8,87:1 |
| `--m3-surface-container-lowest` | `#ffffff` | Itens das listas segmentadas | on-surface 17,12:1; on-surface-variant 9,30:1 |
| `--m3-surface-container-low` | `#f1f5ec` | Contêineres das listas da Home | on-surface 15,50:1; on-surface-variant 8,42:1 |
| `--m3-surface-container` | `#ebefe6` | Pílula da toolbar, rodapé, reserva de foto | on-surface 14,69:1; on-surface-variant 7,98:1 |
| `--m3-surface-container-high` | `#e6e9e0` | Folha de ingredientes; chips dos adicionais (etapa 5a) | on-surface 13,93:1; on-surface-variant 7,57:1 |
| `--m3-surface-container-highest` | `#e0e4db` | Card do feed; fundo de campo (apelido `--color-input`) | on-surface 13,28:1; on-surface-variant 7,21:1 |
| `--m3-on-surface` | `#181d17` | Texto principal, títulos, preços | — |
| `--m3-on-surface-variant` | `#424940` | Texto secundário, descrições, rótulos da pílula | — |
| `--m3-outline` | `#72796f` | Borda funcional: campos; borda em `prefers-contrast: more` | sobre surface 4,28:1; sobre surface-container-highest 3,48:1 |
| `--m3-outline-variant` | `#c2c9bd` | Divisores decorativos (linha de direitos) | — |
| `--m3-inverse-surface` | `#2d322c` | Sem uso direto na Home (candidato ao toast, §4.2) | inverse-on-surface 11,54:1 |
| `--m3-inverse-on-surface` | `#eef2e9` | Texto sobre inverse-surface | — |
| `--m3-scrim` | `rgba(0, 0, 0, 0.32)` | Fundo de diálogo e da gaveta do admin | — |

#### Camadas de estado

A camada é a cor "on" com 8% no hover e 10% no pressionado [12]. O mixin `camada-de-estado` desenha o `::before` com `currentColor`; os tokens abaixo servem a quem precisa da cor pronta.

| Token | Valor | Uso |
|---|---|---|
| `--m3-camada-hover` | `rgba(24, 29, 23, 0.08)` | Hover de superfície (apelido `--color-hover-ghost`) |
| `--m3-camada-pressionada` | `rgba(24, 29, 23, 0.1)` | Pressionado de superfície |
| `--m3-camada-primary-hover` | `rgba(58, 105, 59, 0.08)` | Sem uso na Home |
| `--m3-camada-primary-pressionada` | `rgba(58, 105, 59, 0.1)` | Sem uso na Home |

#### Pares de contraste

A tabela completa é a de `src/direcoes/estilos/material/contraste.js` (34 pares, com o lugar de cada um), que muda para `src/assets/styles/base/` ou `src/utils/` junto com o script da §13.7. Os mínimos: 4,5 para texto, 3 para contêiner, borda e foco. Os pares de menor folga, que pedem cuidado ao mexer nos tokens:

| Frente | Fundo | Mínimo | Medido | Onde |
|---|---|---|---|---|
| `m3-on-primary` | `m3-primary-pressed` | 4,5 | 5,09 | "Adicionar" pressionado |
| `m3-on-primary` | `m3-primary-hover` | 4,5 | 5,33 | "Adicionar" no hover |
| `m3-primary` | `m3-primary-container` | 3 | 4,98 | Borda do disco; "Ver cardápio" filled no hero (abaixo de `md`) |
| `m3-secondary` | `m3-primary-container` | 3 | 4,99 | Anel no FAB e no hero |
| `m3-secondary-container` | `m3-primary` | 3 | 4,99 | "Ver cardápio" tonal dentro do disco |
| `m3-primary` | `m3-surface-container-highest` | 3 | 4,99 | Split button contra o card |
| `m3-secondary` | `m3-secondary-container` | 3 | 5,00 | Anel no item atual da pílula |
| `m3-outline` | `m3-surface` | 3 | 4,28 | Borda com `prefers-contrast: more` |

Pares que entram com as outras telas (medidos agora, ainda fora do `contraste.js`): `m3-outline` sobre `m3-surface-container-highest` (borda de campo, 3,48), `m3-error` sobre `m3-surface` (texto de erro, 6,16), `m3-on-error-container` sobre `m3-error-container` (7,24), os três estados sobre os próprios containers (5,01 a 5,03) e `m3-inverse-on-surface` sobre `m3-inverse-surface` (11,54).

#### Regras de uso

- **Primary marca ação e o momento do hero.** Preço e título ficam em `on-surface`.
- **Um filled por região.** O "Ver cardápio" M (56 px) é o maior controle da página (desenho, §1); no feed, cada card tem o seu split.
- **Secondary é o anel de foco** [30]. Dentro do disco do hero, o anel vira `on-primary` (6,43:1), pela propriedade local `--m3-prensa-foco`.
- **A cor do círculo separa informação de ação:** `secondary-container` nos itens com link, `tertiary-container` no horário (desenho, §5.4).
- **Error só para erro, ação destrutiva e o badge do carrinho** (o badge de carrinho é uso típico citado pelo Compose [35]).
- **Desabilitado:** `--color-ink-disabled` (`#a2a79e`, on-surface a 38% sobre surface, já composto; isento de contraste). O fundo do botão desabilitado não tem token M3 ainda (§6).

#### Mapa dos tokens atuais (tabela de migração)

Copiado do `_tokens.scss` do material. A coluna "Brasa" é o valor de hoje em `base/_tokens.scss`.

| Token atual | Brasa (hoje) | Passa a |
|---|---|---|
| `--color-bg` | `#15110e` | `var(--m3-surface)` |
| `--color-surface-sunken` | `#100d0b` | `var(--m3-surface-container)` |
| `--color-surface-1` | `#1c1713` | `var(--m3-surface-container-low)` |
| `--color-surface-2` | `#221b17` | `var(--m3-surface-container)` |
| `--color-surface-3` | `#2e2520` | `var(--m3-surface-container-high)` |
| `--color-surface-4` | `#3a302a` | `var(--m3-surface-container-highest)` |
| `--color-input` | `#1b1512` | `var(--m3-surface-container-highest)` |
| `--color-overlay` | `rgba(10, 8, 6, 0.72)` | `var(--m3-scrim)` |
| `--color-ink` | `#f5eee8` | `var(--m3-on-surface)` |
| `--color-ink-muted` | `#b8ada4` | `var(--m3-on-surface-variant)` |
| `--color-ink-subtle` | `#9a8d83` | `var(--m3-on-surface-variant)` |
| `--color-ink-disabled` | `#8a7e75` | `#a2a79e` |
| `--color-border-strong` | `#7a6a5e` | `var(--m3-outline)` |
| `--color-border` | `#4a3e36` | `var(--m3-outline-variant)` |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.06)` | `var(--m3-outline-variant)` |
| `--color-accent` | `#ff5b1a` | `var(--m3-primary)` |
| `--color-accent-hover` | `#ff7036` | `var(--m3-primary-hover)` |
| `--color-accent-pressed` | `#e64a0d` | `var(--m3-primary-pressed)` |
| `--color-accent-ink` | `#15110e` | `var(--m3-on-primary)` |
| `--color-accent-soft` | `rgba(255, 91, 26, 0.14)` | `var(--m3-primary-container)` |
| `--color-focus` | `var(--color-accent)` | `var(--m3-secondary)` |
| `--color-success` | `#5bd69a` | `var(--m3-sucesso)` |
| `--color-danger` | `#ff8a80` | `var(--m3-error)` |
| `--color-danger-solid` | `#d9363e` | `var(--m3-error)` |
| `--color-danger-solid-ink` | `#ffffff` | `var(--m3-on-error)` |
| `--color-warning` | `#f5b940` | `var(--m3-aviso)` |
| `--color-info` | `#7cc4fa` | `var(--m3-info)` |
| `--color-danger-soft` | `rgba(255, 138, 128, 0.1)` | `var(--m3-error-container)` |
| `--color-warning-soft` | `rgba(245, 185, 64, 0.14)` | `var(--m3-aviso-container)` |
| `--color-info-soft` | `rgba(124, 196, 250, 0.14)` | `var(--m3-info-container)` |
| `--color-success-soft` | `rgba(91, 214, 154, 0.14)` | `var(--m3-sucesso-container)` |
| `--color-hover-ghost` | `rgba(255, 255, 255, 0.04)` | `var(--m3-camada-hover)` |
| `--color-sheen` | `rgba(255, 255, 255, 0.1)` | `rgba(255, 255, 255, 0.16)` (sai com o tilt, §7.8) |
| `--gradient-scrim` | `linear-gradient(to bottom, rgba(21, 17, 14, 0.15), rgba(21, 17, 14, 0.92))` | `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6))` (sai com o banner do Cardápio, se o desenho da §5.3 o tirar) |
| `--glow-hero` | `radial-gradient(…)` | `none` (sai) |
| `--glow-accent` | `0 0 0 1px …, 0 6px 18px …` | `none` (sai) |
| `--underline-active` | `inset 0 -2px 0 var(--color-accent)` | `inset 0 -3px 0 var(--m3-primary)` (sai com a navbar, §4.3) |
| `--focus-width` | `2px` | `3px` (fica, com o valor novo) |
| `--focus-offset` | `2px` | `2px` (fica) |

Tipografia, raios, elevação e curvas estão nas próximas seções.

### 2.3 Tipografia

**Carregamento:**
- **Roboto Variable:** `@fontsource-variable/roboto` 5.3.0, importada uma vez em `src/main.js` (`import '@fontsource-variable/roboto'`), como a Home faz hoje. É self-hosted: a CSP (`font-src 'self'`) não muda. O `unicode-range` do Fontsource faz o navegador baixar só os subconjuntos usados.
- **Saem:** os imports de Bebas Neue e Archivo do `main.js` e as dependências (decisão b).
- **Roboto é a fonte padrão do M3** [1][14]; o M3 separa tokens de fonte de marca e de texto [14], mas aqui as duas são a mesma.

**Família:**

| Token | Valor |
|---|---|
| `--m3-fonte` | `"Roboto Variable", "Roboto", system-ui, sans-serif` |
| `--font-display` (apelido) | `var(--m3-fonte)` |
| `--font-text` (apelido) | `var(--m3-fonte)` |

**Escala do M3** (tamanho/entrelinha [1]; title e label em Medium [1]):

| Papel | Tokens | Tamanho | Entrelinha | Peso | Uso na Home |
|---|---|---|---|---|---|
| display-l | `--m3-display-l`, `-linha` | 3.5625rem (57) | 4rem (64) | 500 | `h1` do hero a partir de `xl`, `letter-spacing: -0.015625rem` |
| display-m | `--m3-display-m`, `-linha` | 2.8125rem (45) | 3.25rem (52) | 500 | `h1` do hero em `lg` |
| display-s | `--m3-display-s`, `-linha` | 2.25rem (36) | 2.75rem (44) | 500 | `h1` do hero abaixo de `lg` |
| headline-m | `--m3-headline-m`, `-linha` | 1.75rem (28) | 2.25rem (36) | 400 | `h2` "Hambúrgueres" a partir de `md`; nome do destaque em `xl` (500) |
| headline-s | `--m3-headline-s`, `-linha` | 1.5rem (24) | 2rem (32) | 400 | `h2` das listas; `h2` do feed no celular; nome do destaque (500) |
| title-l | `--m3-title-l`, `-linha` | 1.375rem (22) | 1.75rem (28) | 500 | Marca no cabeçalho e no rodapé; preço do destaque |
| title-m | `--m3-title-m`, `-linha` | 1rem (16) | 1.5rem (24) | 500 | Preço, botão M, `h3` dos grupos |
| body-l | `--m3-body-l`, `-linha` | 1rem (16) | 1.5rem (24) | 400 | Texto do hero, nome dos itens das listas |
| body-m | `--m3-body-m`, `-linha` | 0.875rem (14) | 1.25rem (20) | 400 | Descrições, ingredientes, descrição do rodapé |
| body-s | `--m3-body-s`, `-linha` | 0.75rem (12) | 1rem (16) | 400 | Linha de direitos |
| label-l | `--m3-label-l`, `-linha` | 0.875rem (14) | 1.25rem (20) | 500 | Botão S, título da folha, pílula a partir de `md` |
| label-m | `--m3-label-m`, `-linha` | 0.75rem (12) | 1rem (16) | 500 | Rótulos da pílula abaixo de `md` |
| label-s | `--m3-label-s`, `-linha` | 0.6875rem (11) | 1rem (16) | 500 | Badge do carrinho |

**Regras:**
- **O mixin `tipo($papel, $peso: 400)`** aplica família, tamanho, entrelinha e peso de um papel. Nenhuma folha escreve tamanho de fonte fora da escala.
- **O peso 500 do display é escolha da Home** (ficha, tipografia); os estilos enfatizados do Expressive [15] não viraram tokens.
- **O nome do card comum** ficou em `title-m`/`title-l` com peso 400 no código (`tipo(title-m)`), e o M3 dá title em Medium [1]: conferir na revisão visual da etapa 6 (§12).
- **Papéis sem token:** headline-l 32/40 [1] existe só como `--text-2xl: 2rem`; title-s 14/20 [1] é feito com label-l em 500 (título da folha).
- **Espaçamento entre letras** (hoje escrito nas parciais): `0.00625rem` nos botões e na pílula a partir de `md`; `0.03125rem` no body-l do hero e no label-m da pílula; `0.015625rem` na descrição do card; `-0.015625rem` no display-l; `0` nos outros displays. Recomendação: virar tokens `--m3-<papel>-tracking` na etapa 2, com os mesmos valores.
- **Algarismos tabulares** (`.tabular`) em preço, total, quantidade, contador e badge; `font-synthesis: none` no título do hero; os controles herdam a fonte (`font: inherit`), como no reset atual.

**Apelidos de tipografia** (copiados do mapa do material):

| Token atual | Brasa | Passa a |
|---|---|---|
| `--text-xs` | 0.75rem | `var(--m3-body-s)` |
| `--text-sm` | 0.875rem | `var(--m3-body-m)` |
| `--text-md` | 1rem | `var(--m3-body-l)` |
| `--text-lg` | 1.3125rem | `var(--m3-title-l)` |
| `--text-xl` | 1.75rem | `var(--m3-headline-m)` |
| `--text-2xl` | 2.375rem | `2rem` |
| `--text-3xl` | 3.125rem | `var(--m3-display-m)` |
| `--text-4xl` | 4.1875rem | `var(--m3-display-l)` |
| `--text-hero` | `clamp(2.375rem, 1.6rem + 3.2vw, 4.1875rem)` | `clamp(2.25rem, 1.4rem + 3.4vw, 3.5625rem)` |
| `--text-page` | `clamp(2.375rem, 1.9rem + 1.6vw, 3.125rem)` | `clamp(2.25rem, 1.8rem + 1.6vw, 2.8125rem)` |
| `--leading-display` | 0.95 | 1.12 |
| `--leading-tight` | 1.2 | 1.27 |
| `--leading-body` | 1.5 | 1.5 |
| `--leading-compact` | 1.35 | 1.43 |

### 2.4 Espaçamento e layout

**Fica tudo do sistema atual:** `--space-1` a `--space-9`, `--container-max` (75rem), `--gutter` (`clamp(1rem, 4vw, 2rem)`), `--navbar-h` (4rem) e `--target-min` (2.75rem). A Home usa só esses.

**Tokens novos do M3:**

| Token | Valor | Uso |
|---|---|---|
| `--m3-vao-segmento` | `2px` | Vão entre os itens das listas segmentadas, entre as metades do split e entre os itens da pílula |
| `--m3-barra-reserva` | `6rem` | Pé da página abaixo de `lg`: a pílula de 64 px mais dois afastamentos de 16 px (`padding-bottom` do layout e `scroll-padding-bottom`) |

**Mudanças de layout:**
- **`--navbar-h`** passa a ser a altura do cabeçalho, que só é fixo (sticky) a partir de `lg`. Abaixo de `lg`, o cabeçalho rola com a página (desenho, §4).
- **O `<main>` deixa de reservar `padding-top: var(--navbar-h)`** (`_main-layout.scss`): o cabeçalho sticky ocupa espaço no fluxo.
- **`scroll-padding-top`** continua `calc(var(--navbar-h) + var(--space-4))`; abaixo de `lg`, o `html` ganha `scroll-padding-bottom: var(--m3-barra-reserva)` (hoje é `:global(:root[data-direcao="material"])` na `HomeMaterial.vue`).
- **O ritmo vertical** da Home é `--space-7` entre seções e `--space-8` a partir de `lg`; o `.container` não muda.

### 2.5 Formas (raios)

Escala do M3: none 0, extra-small 4, small 8, medium 12, large 16, large-increased 20, extra-large 28, extra-large-increased 32, extra-extra-large 48 e full [6][7][8]. Botões em full, cards em medium, chips em small e FAB em large [7].

| Token | Valor | Uso |
|---|---|---|
| `--m3-forma-xs` | `4px` | Cantos de dentro das listas segmentadas e do split |
| `--m3-forma-s` | `8px` | Marca no cabeçalho; tonal pressionado; chips de status (§5.9) |
| `--m3-forma-m` | `12px` | Card do feed; filled S pressionado; FAB a partir de `lg` |
| `--m3-forma-l` | `16px` | Folha de ingredientes; FAB abaixo de `lg`; foto do card abaixo de `md`; filled M pressionado |
| `--m3-forma-l-aumentada` | `20px` | Cantos de fora das listas segmentadas |
| `--m3-forma-xl` | `28px` | Foto do card a partir de `md`; contêineres das listas; hero abaixo de `md`; cantos de cima do rodapé |
| `--m3-forma-xxl` | `48px` | Contêiner do hero a partir de `md` |
| `--m3-forma-full` | `999px` | Botões, pílula, badge, círculos |
| `--m3-forma-cookie` | `polygon(…)` (120 pontos) | Disco do hero; foto do destaque. Geometria própria: r(θ) = 0,465 + 0,035·cos(12θ) |
| `--m3-forma-flor` | `polygon(…)` (96 pontos) | Miniatura da sobremesa. Geometria própria: r(θ) = 0,44 + 0,06·cos(8θ) |

- O Expressive tem 35 polígonos, entre eles Cookie, com morph experimental [9]. O cookie e a flor daqui são geometria própria, gerada por script, e só recortam (`clip-path`); nunca animam (§1.1, item 8).
- **Sem token:** none 0 e extra-large-increased 32 [6][7][8], que a Home não usa.
- **Apelidos:** `--radius-sm` → `var(--m3-forma-s)`, `--radius-md` → `var(--m3-forma-m)`, `--radius-lg` → `var(--m3-forma-xl)`. O `--radius-round` (50%, avatar do admin) fica.

### 2.6 Sombras e elevação

A elevação do M3 é principalmente tonal [1][13][32]: a superfície muda de container, e a sombra só aparece no que flutua. Os níveis do M3 são 0/1/3/6/8/12 dp [10]; os tokens abaixo são aproximações (desvio da ficha).

| Token | Valor | Uso |
|---|---|---|
| `--m3-elevacao-1` | `0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)` | Sem uso na Home (apelido `--elev-1`) |
| `--m3-elevacao-2` | `0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15)` | Folha de ingredientes (apelido `--elev-2`) |
| `--m3-elevacao-3` | `0 1px 3px rgba(0, 0, 0, 0.3), 0 4px 8px 3px rgba(0, 0, 0, 0.15)` | Pílula e FAB flutuando abaixo de `lg` (apelido `--elev-3`) |

- **Cards sem sombra:** o card do feed é filled [63], em `surface-container-highest`. O `--elev-0` fica `none`, e o `--glow-accent` sai (§2.2).
- **`reserva-de-sombra`:** toda superfície que depende de sombra ou de fundo ganha borda de 1 px em `CanvasText` com `forced-colors: active` e em `--m3-outline` com `prefers-contrast: more`.
- **O foco nunca usa sombra:** usa `outline`, como na Brasa.

### 2.7 Camadas (z-index)

**Ficam:** `--z-raised` (1), `--z-sticky` (100), `--z-navbar` (200), `--z-overlay` (300), `--z-sidebar` (400) e `--z-toast` (600). Os diálogos continuam na *top layer* (`showModal()`).

| Token novo | Valor | Uso |
|---|---|---|
| `--m3-z-fundo` | `-1` | Camadas de fundo (contêiner, camada de estado e sombra) atrás do conteúdo do botão, sempre dentro de um `isolation: isolate` |

Usos na Home: o cabeçalho sticky e a toolbar flutuante em `--z-navbar`; o card com a folha aberta e o lanche do hero em `--z-raised`.

### 2.8 Movimento

**Curvas** (o M3 tem standard (0.2, 0, 0, 1), standard-decelerate (0, 0, 0, 1), emphasized-decelerate (0.05, 0.7, 0.1, 1) e emphasized-accelerate (0.3, 0, 0.8, 0.15), com durações de 50 a 1000 ms [20][21]):

| Token | Valor |
|---|---|
| `--m3-ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--m3-ease-emphasized-decelerate` | `cubic-bezier(0.05, 0.7, 0.1, 1)` |

**Molas do Expressive** (amortecimento e rigidez [23], convertidos em `linear()` por script; a duração vai até 0,1% do alvo). O Expressive vai nos destaques e o fast nos botões [21][22]. Não confirmei qual par de amortecimento e rigidez gerou cada curva: o comentário do arquivo diz só "amortecimento / rigidez".

| Token da curva | Duração | Pico | Uso |
|---|---|---|---|
| `--m3-mola-espacial-rapida` | `--m3-dur-mola-espacial-rapida`: 360ms | 1,094 (9,4% além do alvo) | Chevron, folha, check, badge; achatamento da bola (com a curva standard) |
| `--m3-mola-espacial` | `--m3-dur-mola-espacial`: 440ms | 1,015 | Sem uso na Home |
| `--m3-mola-espacial-lenta` | `--m3-dur-mola-espacial-lenta`: 600ms | 1,015 | Disco da prensa |
| `--m3-mola-efeitos-rapida` | `--m3-dur-mola-efeitos-rapida`: 150ms | sem overshoot | Opacidade: troca de forma, faces, camadas de estado |
| `--m3-atraso-prensa` | 120ms | — | Atraso do disco depois da bola |

Os valores das curvas `linear()` são copiados inteiros do `_tokens.scss` do material (33 pontos nas espaciais, 13 na de efeitos).

**Durações do projeto** (ficam, com os valores do material):

| Token | Brasa | Material | Uso que fica |
|---|---|---|---|
| `--dur-instant` | 80ms | 50ms | Pressionar |
| `--dur-fast` | 150ms | 150ms | Teto do movimento reduzido; hover |
| `--dur-base` | 240ms | 250ms | Diálogo; parte do tempo do retorno "Adicionado" |
| `--dur-slow` | 400ms | 400ms | Sheet mobile, gaveta do admin |
| `--dur-hold` | 1200ms | 1200ms | Tempo do retorno "Adicionado" (o JS lê) |
| `--dur-stagger` | 40ms | 40ms | Sai com o odômetro (§7.8) |
| `--dur-spin` | 800ms | 800ms | Spinner de `loading` |

**Apelidos:** `--ease-out` → `var(--m3-ease-emphasized-decelerate)`, `--ease-in-out` → `var(--m3-ease-standard)`, `--ease-spring` → `var(--m3-mola-espacial-rapida)`.

**Regras:**
- só `transform` e `opacity` (cor e fundo podem trocar); proibido `transition: all`;
- `transform` e durações acima de `--dur-fast` só dentro de `motion-ok`;
- a mola com overshoot só roda com movimento liberado: as molas, a troca de forma e a mudança de tamanho contam como movimento na 2.3.3 [77].

### 2.9 Breakpoints

Não mudam: `sm` 480, `md` 768, `lg` 1024 e `xl` 1280, com os mixins `up()`, `below()`, `hover-capable`, `motion-ok` e `motion-reduced`.

| Nome | O que muda no M3 |
|---|---|
| (base) | Toolbar flutuante embaixo à direita, com ícone sobre o rótulo; hero em uma coluna; feed em 2 colunas |
| `md` | Pílula com ícone ao lado do rótulo; hero em 2 colunas com o texto dentro do disco; canto 48 no hero; descrição no card; destaque na horizontal |
| `lg` | Cabeçalho sticky com a pílula e o FAB ancorados à direita, sem elevação; feed em 3 colunas; faixa 7/5 de bebidas e `onde`; fim da reserva da barra |
| `xl` | Feed em 4 colunas, com o destaque em 2 |

---

## 3. Arquitetura de CSS

1. **Tokens:** os `--m3-*` vão para `src/assets/styles/base/_tokens.scss` (§2.1). O seletor `:root[data-direcao="material"]` não vai.
2. **Mixins:** `scss/_base.scss` do material é copiado para `src/assets/styles/base/_m3.scss` (novo; nome sugerido), com `camada-de-estado`, `anel-interno`, `troca-de-forma($repouso, $pressionado)`, `reserva-de-sombra`, `tipo($papel, $peso)` e `linhas($n)`. Como o `_breakpoints.scss`, não gera CSS: cada parcial faz `@use "@/assets/styles/base/m3" as *;`.
3. **Componentes:** os base vão para `src/components/ui/` (CLAUDE.md); os de moldura, para `src/components/layout/`; os da loja, para `src/components/`; as seções da Home, para `src/components/home/` (novo). Destinos na §4.
4. **Parcial por componente:** cada componente continua fazendo `@use` da própria parcial dentro de `<style scoped>`. As parciais são copiadas de `scss/` para `src/assets/styles/components/ui/`, `components/` e `pages/home/` (novo), no lugar das folhas que substituem; as originais ficam no acervo.
5. **Mobile-first e movimento:** as parciais já são mobile-first (`up()`) e põem todo `transform` dentro de `motion-ok`. Nada muda na mudança de pasta.
6. **Regra global de movimento reduzido** (`base/_motion.scss`): a lista de classes troca as da Brasa (`.add-btn__*`, `.odo__digit`, `.product-card`, `.burger-stack__*`) pelas do M3 (`.m3-prensa__disco`, `.m3-dividido__seta--baixo`, `.m3-folha`, `.m3-botao__check`, `.m3-dividido__check`, `.m3-badge`). As do `BurgerStack` ficam se a decisão (f) o mantiver.
7. **Reset** (`base/_reset.scss`): `color-scheme: light`; o `body` em `--m3-surface` e `--m3-on-surface`, com a fonte body-l; `scroll-padding-bottom: var(--m3-barra-reserva)` abaixo de `lg`.
8. **Foco global** (`base/_a11y.scss`): o mesmo código, com os tokens novos (3 px em `--m3-secondary`). O skip link continua, em `primary` e `on-primary` pelos apelidos.
9. **Tipografia** (`base/_typography.scss`): a classe `.display` (Bebas, caixa alta) sai (o acervo não a usa); `h1` a `h3` passam a usar os papéis (display, headline e title). Os seletores de elemento também alcançam as Homes do acervo onde elas não sobrescrevem: conferir as capturas delas antes e depois (§13.10).
10. **Propriedades locais:** os componentes repintam a si mesmos por propriedades locais (`--m3-botao-fundo`, `--m3-prensa-disco`, `--m3-hero-disco`, `--m3-item-canto-cima`…), sem `:deep()`. O hero repinta o botão abaixo de `md` trocando os três fundos (`--m3-botao-fundo-repouso`, `-hover` e `-pressionado`).
11. **Sem `data-direcao` e sem `useEstiloAtivo`:** os tokens valem em `:root`, e o `color-scheme` fica no reset.
12. **Convenção de nomes:** BEM com o prefixo `m3-` nas classes dos componentes M3 (`.m3-cartao__preco`). As classes dos componentes base mantidos ficam como estão (`.btn--primary`) até a etapa de cada um.

---

## 4. Componentes e arquivos

### 4.1 Componentes que vêm da Home

Props copiadas do código. A produção recebe **cópias** dos componentes, das parciais e da lógica; os originais ficam no acervo, sem mudança (decisão e). "Na produção" lista o que muda na cópia.

#### `M3BarraSuperior` → `src/components/layout/M3BarraSuperior.vue`

- **Substitui:** `TheNavbar.vue` (com o `_navbar.scss`).
- **Props:** `inicio: { type: String, default: "/direcoes/material" }`. Na produção, o padrão passa a `"/"`.
- **Estrutura:** `<header class="m3-cabecalho">` → `RouterLink.m3-marca` (marca, `MARCA`) e `M3BarraFerramentas`.
- **Estados:** marca com camada de 8% e 10% [12] e anel; cabeçalho estático abaixo de `lg`, sticky e opaco (`--m3-surface`) a partir de `lg`, sem mudar ao rolar [H17].
- **Acessibilidade:** a marca é link, não `h1`; altura mínima de 48 px.

#### `M3BarraFerramentas` → `src/components/layout/M3BarraFerramentas.vue`

- **Substitui:** o menu do `TheNavbar` (botão de menu e painel) e o `CartBadge.vue`.
- **Props:** `inicio: { type: String, required: true }`. Usa `useLinksPrincipais(inicio)` e `useContadorCarrinho()`.
- **Estrutura:** `div.m3-ferramentas` → `nav[aria-label="Principal"]` com `ul.m3-pilula[role=list]` (Início, Cardápio, Entrar ou Perfil, cada um com ícone e rótulo) e `RouterLink.m3-fab[to="/cart"]` com `span.m3-badge[aria-hidden]`.
- **Padrão:** toolbar flutuante com FAB [57], recorrente em apps publicados do Google [83][81][67]. O uso como navegação é disputado [83]: os rótulos ficam sempre à vista [26], e a pílula se ancora no topo a partir de `lg`.
- **Medidas:** abaixo de `md`, pílula de 64 px com itens de 56 px de altura (ícone de 24 px sobre o rótulo label-m) e FAB de 56 px em `--m3-forma-l`; de `md` a `lg`, itens de 48 px com ícone de 20 px ao lado do rótulo label-l; a partir de `lg`, itens de 44 px, pílula ancorada e FAB de 48 px em `--m3-forma-m`, sem elevação.
- **Estados:** §6. O item atual (`aria-current="page"`) fica em `secondary-container` [83].
- **Acessibilidade:** o FAB tem o nome do contador ("Carrinho, vazio" ou "Carrinho, 2 itens"); o badge é `aria-hidden`; a ordem do Tab é marca, três links, carrinho e `main`.
- **Na produção:** fixa embaixo à direita abaixo de `lg` em **todas** as rotas da loja, com a reserva de `--m3-barra-reserva`.

#### `M3Botao` → absorvido pelo `BaseButton` (`src/components/ui/BaseButton.vue`)

- **Props hoje:** `variante` (`filled` | `tonal` | `texto`, padrão `filled`), `tamanho` (`s` | `m`, padrão `s`), `para` (vira `RouterLink`), `retorno` (face "Adicionado" com check). Slot `default`; emite `click`; os atributos vão para a raiz.
- **Proposta pela decisão (j):** o `BaseButton` mantém a API e passa a desenhar o M3. Mapa das variantes e tamanhos:

  | `BaseButton` | Vira | Observação |
  |---|---|---|
  | `variant="primary"` | filled | `primary` e `on-primary`; pressionado em `forma-m` (S) ou `forma-l` (M) |
  | `variant="secondary"` | tonal | `secondary-container` e `on-secondary-container`; pressionado em `forma-s` |
  | `variant="ghost"` | texto | tinta `primary` com camada de estado |
  | `variant="danger"` | texto em `--m3-error` | **a desenhar**: os dossiês não trazem variante de perigo; a recomendação é o text button com a tinta `error` (6,16:1 sobre surface) e a camada de estado |
  | `size="sm"` | S de 40 px com alvo de 44 px por `::after` | Como o `sm` atual |
  | `size="md"` | S de 44 px | Desvio da ficha [19] |
  | `size="lg"` | M de 56 px | Tamanhos do Expressive: XS 32, S 40, M 56, L 96 e XL 136 dp [17][18][19] |
  | `retorno` (novo) | face "Adicionado" | Vem do `M3Botao` |
  | `iconOnly` | botão de ícone redondo de 44 px | **a desenhar** (sem fonte de icon button nos dossiês) |
  | `loading` | spinner atual, na forma M3 | **a desenhar** (§6) |
  | `pressed` | toggle | O grupo conectado troca a forma do selecionado [54] |

- **Troca de forma:** ao pressionar, o canto diminui [17][18][19][54], por opacidade entre camadas (`troca-de-forma`).

#### `M3BotaoDividido` → `src/components/ui/M3BotaoDividido.vue`

- **Substitui:** o botão "Adicionar" (`add-btn`) do `ProductCard`.
- **Props:** `rotuloMenu` (String, `""`: sem a metade de trás), `controla` (String), `expandido` (Boolean), `adicionado` (Boolean), `atributosAcao` (Object), `tamanho` (`s` | `m`). Emite `acao` (frente) e `alternar` (trás, com o elemento do botão, para o foco voltar no Esc).
- **Padrão:** split button [55]: a frente faz a ação principal; a de trás fica recolhida ou expandida, com o estado lido pelo leitor de tela, o ícone girando 180° e a forma mudando, e pode abrir outro componente, como um card. O filled é de ênfase alta [55].
- **Acessibilidade:** frente com `v-bind="atributosAcao"` (`aria-label="Adicionar <nome>"`, `data-adicionado`); trás com `aria-label` = `rotuloMenu`, `aria-expanded` e `aria-controls` [79]; ícones `aria-hidden`; as duas metades com ≥ 44 × 44.

#### `M3FolhaIngredientes` → `src/components/ui/M3FolhaIngredientes.vue`

- **Novo** (não há par na Brasa). **Props:** `id` (obrigatório), `itens` (Array), `aberto` (Boolean), `titulo` (padrão `TEXTOS.ingredientes`).
- **Estrutura:** `div.m3-folha[:id]` com `v-show` dentro de `<Transition name="m3-folha">`; `p.m3-folha__titulo` e `ul[role=list][aria-labelledby]`. Fica no DOM, para o `aria-controls` apontar sempre para um id que existe.
- **Visual:** `surface-container-high`, `forma-l`, `elevacao-2`, logo abaixo da fileira de botões do card.
- **Comportamento** (`useFolhaUnica`, que vai para `src/composables/`): uma folha aberta por vez; Esc fecha e devolve o foco à metade de trás; o `pointerdown` fora do card fecha sem mover o foco.

#### `M3CartaoLanche` → `src/components/M3CartaoLanche.vue`

- **Substitui:** o `ProductCard.vue` nas variantes `menu` e `compact`. A variante `admin` fica no `ProductCard` até a §5.11 ser desenhada.
- **Props:** `produto` (obrigatório), `destaque` (Boolean), `aberto` (Boolean). Emite `alternar` (id do produto e o botão de trás). Usa `useCartaoProduto` (imagem, preço, `imagemFalhou`, `adicionado`, `contexto` e `atributosAdicionar`) e `usePersonalizar`.
- **Padrão:** filled card, com um conteúdo coerente por card [63]; no feed, o item maior recebe a atenção [64].
- **Visual:** `surface-container-highest`, `forma-m`, `padding: var(--space-2)`, sem sombra e sem hover. Comum: foto 4:3 em `forma-xl` (`forma-l` abaixo de `md`) [34]; destaque: foto quadrada no cookie, na horizontal a partir de `md`.
- **Reservas:** sem `ingredients`, o split fica com uma metade só; nome longo em 2 linhas (`line-clamp`) no comum; imagem que falha mostra o ícone `burger`.

#### `M3FormaPrensa` → `src/components/M3FormaPrensa.vue`

- **Substitui:** o `BannerComponent variant="hero"` na Home. Sem props nem emits; slot `default` (o conteúdo do hero).
- **Estrutura:** `div.m3-prensa` → `div.m3-prensa__disco[aria-hidden]` (cookie em `primary`), `div.m3-prensa__bola[aria-hidden]` (círculo, só na animação) e o conteúdo por cima. Tudo posicionado por `inset` e `margin`, sem `transform`.
- **Propriedades locais:** `--m3-prensa-disco` (tamanho), `--m3-prensa-centro-x` e `-y`, `--m3-prensa-fundo`, `--m3-prensa-tinta` e `--m3-prensa-foco` (o hero as usa abaixo de `md`).
- **Padrão:** formas do catálogo e troca de forma como ênfase [66][67][70], no hero moment [65].

#### `M3Foto` → `src/components/ui/M3Foto.vue`

- **Novo** (a lógica de `<picture>` estava dentro do `ProductCard`). **Props:** `imagem` (`{ src, srcset, sizes }`, obrigatório), `alt`, `forma` (`cartao` | `cookie` | `circulo` | `flor`), `proporcao` (padrão `"4 / 3"`), `falhou`, `icone` (padrão `["fas", "burger"]`), `largura` (960), `altura` (720). Emite `erro`.
- **Regras:** o `<source type="image/webp">` só entra com `srcset` (imagem `data:` do painel vai sem ele); cookie, círculo e flor são sempre quadrados; `loading="lazy"`, `decoding="async"`, `width` e `height` sempre.

#### `M3ItemLista` → `src/components/ui/M3ItemLista.vue`

- **Novo:** item de lista segmentada com produto e "Adicionar" tonal. **Props:** `produto` (obrigatório), `forma` (padrão `"circulo"`), `apoio` (String).
- **Padrão:** listas agrupadas em blocos arredondados com vãos pequenos, dentro de um contêiner [66][81]; cantos de 20 por fora e 4 por dentro [8].
- **Cantos:** `:first-child` (20 em cima), `:last-child` (20 embaixo), `:only-child` (20 nos quatro), meio em 4.
- **Acessibilidade:** o nome do produto é `<p>` (item de lista, não título); o botão leva `atributosAdicionar`.

#### `M3ItemSegmentado` → `src/components/ui/M3ItemSegmentado.vue`

- **Substitui:** `TheFooterContactInfo.vue` (os contatos viram itens).
- **Props:** `titulo` (obrigatório), `apoio`, `href`, `externo` (Boolean), `icone` (obrigatório).
- **Com `href`:** a linha inteira é o `<a>`, com camada de estado e anel por dentro; os externos têm `target="_blank"`, `rel="noopener noreferrer"`, o `NOVA_ABA` em `.visually-hidden` e o ícone `faArrowUpRightFromSquare`.
- **Sem `href`:** `div` estático, com o ícone em `tertiary-container`. Alvo: `min-height: 4.5rem`.

#### `M3Rodape` → `src/components/layout/M3Rodape.vue`

- **Substitui:** `TheFooter.vue` e `TheFooterSocialMediaLinks.vue` (as redes saem [H25][H26]).
- **Conteúdo** (sem props, slots nem emits): `MARCA` (title-l 500), `DESCRICAO` (body-m, máx. 40ch) e `RODAPE.copyright` (body-s, separado por 1 px de `outline-variant`).
- **Visual:** `surface-container`, cantos de cima em `forma-xl`.
- **Fora da Home:** decisão (g): o rodapé mostra também a lista de horário e contato. A linha de direitos muda pela §10.2.

#### Lógica que vem junto

| Original (fica no acervo) | Cópia na produção (sugerida) | Observação |
|---|---|---|
| `compartilhado/useCartaoProduto.js` | `src/composables/useCartaoProduto.js` | A mesma lógica do `ProductCard`; o retorno dura `--dur-base` + `--dur-hold` |
| `compartilhado/useContadorCarrinho.js` | `src/composables/useContadorCarrinho.js` | A mesma lógica do `CartBadge`; na cópia, `digitos` e `sentido` saem com o odômetro |
| `compartilhado/useLinksPrincipais.js` | `src/composables/useLinksPrincipais.js` | Início, Cardápio, Entrar ou Perfil |
| `compartilhado/usePersonalizar.js` | `src/composables/usePersonalizar.js` | Na produção, o `provide` fica nas views que renderizam o `ModalAdditional` (Home e Cardápio), e não na `MolduraDirecao` |
| `compartilhado/useCardapio.js` | `src/composables/useCardapio.js` | Só `useCardapio` e `contar` são usados pelo material |
| `compartilhado/dados.js` | `src/utils/` (nome a decidir) | A cópia passa a ser a fonte única dos textos da loja; o original do acervo continua sendo uma cópia |
| `material/useFolhaUnica.js` | `src/composables/useFolhaUnica.js` | — |
| `material/cardapio.js` | `src/utils/cardapio.js` | `separarDestaque` |
| `material/contatos.js` | `src/utils/contatos.js` | `itensOnde` |
| `material/textos.js` | junto do `dados.js` | Depois da revisão da §8.2 |
| `material/contraste.js` | junto do script da §13.7 | — |

### 4.2 Componentes base que a Home não usou

Os dossiês não cobrem todos os componentes do M3. Onde não há fonte, a forma fica **"a desenhar"**, e o componente continua com a API e o comportamento de hoje, com a pele M3 pelos apelidos.

| Componente atual | Forma M3 correspondente | Fonte | Estado |
|---|---|---|---|
| `ui/QuantityStepper.vue` | Dois botões de ícone tonal redondos de 44 px e o número em title-m tabular. Sem o button group padrão, que comprime os vizinhos do botão pressionado [54] e arrisca o alvo mínimo [78] | [54], [78] | **a desenhar** |
| `ui/CategoryTabs.vue` | Button group conectado: substitui os segmented buttons, com seleção única (papel de rádio no exemplo do Compose), formas de início, meio e fim e troca de forma no selecionado [54] | [54], [60] | **a desenhar**. O padrão de rádio da APG não foi aberto na pesquisa (dossiê, "Riscos"): fica o `aria-pressed` de hoje até lá |
| `ui/AppToast.vue` | A ficha o chama de snackbar, mas **não encontrei** fonte de snackbar nos dossiês. Recomendação: `inverse-surface` com `inverse-on-surface` (11,54:1), sem a borda colorida da Brasa | — | **a desenhar** (pesquisa antes) |
| `ui/EmptyState.vue` | **Não encontrei** componente de estado vazio nos dossiês. Recomendação: ícone em `on-surface-variant`, título title-l 500, texto body-m `on-surface-variant` e a ação como botão filled M | — | **a desenhar** |
| `ui/BaseDialog.vue` | **Não encontrei** fonte de diálogo nos dossiês. Pelos apelidos, já fica `surface-container`, `forma-xl` (28), `elevacao-3` e `scrim` | — | **a desenhar** (pesquisa antes); comportamento igual (`showModal()`, foco, Esc) |
| `FormGroup.vue` | **Não encontrei** fonte de text field nos dossiês. Pelos apelidos: fundo `surface-container-highest`, borda `outline` (3,48:1) e erro em `error` | — | **a desenhar** (pesquisa antes) |
| `PaymentMethodPicker.vue` | Recomendação: lista segmentada de rádios (cantos 20/4, vão de 2 px), com o marcado em `secondary-container`, como o item atual da pílula | [66], [81] | **a desenhar** |
| `CartItem.vue` | Recomendação: item de lista segmentada, como o `M3ItemLista`, com o `QuantityStepper` e o "Remover" | [66], [81] | **a desenhar** |
| `OrderSummary.vue` | Recomendação: contêiner `surface-container-low` de canto 28, como as listas da Home | [66], [26] | **a desenhar** |
| `CartBadge.vue` | Badge do FAB da `M3BarraFerramentas`: badge grande do M3 [35], 16 px, cor de erro | [35] | Pronto (vem da Home) |
| `ProductCard.vue` (`admin`) | Filled card [63] com o slot de ações | [63] | **a desenhar** com o admin |
| `IngredientsList.vue`, `AdditionalsList.vue` | Checkbox e linhas do modal. **Não encontrei** fonte de checkbox nos dossiês | — | **a desenhar** com o modal (§5.4) |
| `BannerComponent.vue` (`page`) | Recomendação: título e frase sem foto atrás, porque o texto nunca fica sobre a foto na Home [H5] | [H5] | **a desenhar** com o Cardápio |
| Admin (`SidebarAdmin`, `TheNavbarAdmin`, `AdminCard`, `ModalProducts`) | **Não encontrei** navigation drawer nem rail nos dossiês; a navigation bar serve de três a cinco destinos em janelas compactas [61]. `AdminCard` vira filled card [63] | [61], [63] | **a desenhar** |

### 4.3 Arquivos alterados

#### Base e configuração

| Arquivo | Mudança |
|---|---|
| `src/assets/styles/base/_tokens.scss` | Papéis, formas, elevação, tipografia, molas e layout do M3 (§2), com os apelidos |
| `src/assets/styles/base/_m3.scss` (novo) | Mixins de `scss/_base.scss` (§3, item 2) |
| `src/assets/styles/base/_reset.scss` | `color-scheme: light`; `scroll-padding-bottom` abaixo de `lg` (§3, item 7) |
| `src/assets/styles/base/_typography.scss` | Sai a `.display`; `h1`–`h3` nos papéis |
| `src/assets/styles/base/_motion.scss` | Lista de classes do movimento reduzido (§3, item 6) |
| `src/main.js` | Importa `@fontsource-variable/roboto`; saem Bebas Neue e Archivo |
| `package.json`, `yarn.lock`, `.yarn/cache` | Roboto para `dependencies`; saem Archivo e Bebas (decisão b); `vue3-carousel` pela decisão (i) |
| `index.html` | `<meta name="theme-color">` com o valor de `--m3-surface` (`#f7fbf1`). A CSP não muda (Roboto self-hosted; Font Awesome pela decisão c) |
| `public/images/site.webmanifest` | `theme_color` e `background_color` com `#f7fbf1` |
| `src/plugins/fontawesome.js` | Registra `faHouse`, `faChevronDown`, `faChevronUp`, `faArrowUpRightFromSquare` e o `faClock` regular; os que ficarem sem uso (`faFacebookF`, `faInstagram`, `faBars` e outros) saem depois de uma busca em todo o `src/`, acervo incluído |

#### Layout, telas e rotas

| Arquivo | Mudança |
|---|---|
| `src/layouts/MainLayout.vue` + `_main-layout.scss` | `M3BarraSuperior` no lugar do `TheNavbar`; `M3Rodape` no lugar do `TheFooter`; o `<main>` perde o `padding-top`; o layout ganha `padding-bottom: var(--m3-barra-reserva)` abaixo de `lg`. Skip link e `AssinaturaEncaixe` ficam |
| `src/views/HomeView.vue` + `pages/_home.scss` | A composição da `HomeMaterial.vue` (§5.2) |
| `src/views/MenuView.vue` e as outras views | §5 |
| `src/assets/styles/components/ui/_category-tabs.scss` | `top: 0` abaixo de `lg` (o cabeçalho não é fixo ali) e `top: var(--navbar-h)` a partir de `lg`; o `IntersectionObserver` do `CategoryTabs.vue` passa a ler a mesma regra |
| `src/router/index.js` | `scrollBehavior` com âncora (§10.1) |

#### Testes, scripts e documentação

| Arquivo | Mudança |
|---|---|
| Testes novos da produção | Cópias de `HomeMaterial.test.js` (vira o teste da `HomeView`), `cardapio.test.js` e `contatos.test.js`, e dos casos de `useCartaoProduto`, `useCardapio` e `dados.js` de `compartilhado/__tests__/`, junto das cópias dos módulos |
| `src/__tests__/BaseButton.test.js` | Variantes no mapa M3, `retorno`, troca de forma |
| `.claude/e2e/axe-scan.mjs` | Fonte `"Roboto Variable"` e peso 500 nos títulos display, no lugar de Archivo e Bebas |
| `.claude/e2e/flow.mjs` | `data-adicionado` e a face "Adicionado" no lugar de `is-added` e da rotação |
| `.claude/e2e/micro-final.mjs` | As micro-interações da §7 no lugar de flip, odômetro e tilt |
| `.claude/e2e/tokens-contrast.mjs` | Os pares por papel da §2.2 |
| `README.md`, `TESTING.md` | Dependências, fontes, testes e a Home (CLAUDE.md: no mesmo PR) |

O CLAUDE.md descreve a Brasa (`SPEC.md`, tokens, assinatura, chaves). Atualizá-lo depende de pedido do usuário.

### 4.4 Arquivos removidos

Removidos no fim (§12, etapa 11), depois de não haver mais referências:
- **Moldura da Brasa:** `src/components/layout/TheNavbar.vue`, `TheFooter.vue`, `TheFooterContactInfo.vue`, `TheFooterSocialMediaLinks.vue` e as folhas `_navbar.scss`, `_footer.scss`, `_footer-contact.scss` e `_footer-social.scss`.
- **Carrinho na navbar:** `src/components/CartBadge.vue` e `_cart-badge.scss`.
- **Home da Brasa:** `src/components/CarouselBurguer.vue` e `_carousel.scss`. O `BannerComponent.vue` e o `_banner.scss` só saem se o desenho do Cardápio (§5.3) tirar o banner; senão, sai só a variante `hero` (e o `BannerComponent.test.js` muda).
- **Card da Brasa:** `src/components/ProductCard.vue` e `_product-card.scss`, depois do admin; `src/composables/useTilt.js`.
- **Montador:** `src/components/BurgerStack.vue`, só se a decisão (f) o tirar.
- **Tokens sem uso:** `--color-sheen`, `--glow-hero`, `--glow-accent`, `--underline-active`, `--dur-stagger` e, se o banner sair, `--gradient-scrim`; os apelidos pela decisão (a).
- **Exploração:** nada do acervo sai. Só `src/direcoes/estilos/material/`, se a decisão (e) for apagá-la.

---

## 5. Telas

Valores em tokens. A base é 390 px; o resto é acréscimo a partir do breakpoint.

### 5.1 Navegação da loja

- **Componentes:** `M3BarraSuperior` com a `M3BarraFerramentas`, em todas as rotas do `MainLayout`, com `inicio="/"`.
- **Abaixo de `lg`:** cabeçalho de 64 px só com a marca, que rola com a página; a toolbar fica `position: fixed` embaixo à direita (`bottom: calc(var(--space-4) + env(safe-area-inset-bottom))`, `right: var(--gutter)`, `z-index: var(--z-navbar)`). O FAB fica no canto do polegar.
- **A partir de `lg`:** cabeçalho sticky, opaco, com `--navbar-h`, a pílula e o FAB à direita, estáticos e sem elevação.
- **Sem animação:** a barra não entra animada nem some ao rolar. O Photos para iOS também não esconde a dele [83].
- **O que sai:** o botão de menu, o painel do menu mobile e a trava de rolagem do menu. Com três links, todos ficam visíveis [H14].
- **Elementos fixos das outras telas:** as `CategoryTabs` grudam em `top: 0` abaixo de `lg` (§4.3); o `OrderSummary` sticky do carrinho e do pagamento (a partir de `lg`) continua com `top: calc(var(--navbar-h) + var(--space-5))`.

### 5.2 Home

A Home é a de `#/direcoes/material`, inteira. O desenho (§3 a §7 e §14) é a especificação; aqui ficam só a ordem e o que muda na produção.

| Bloco | Componentes | Conteúdo real |
|---|---|---|
| Cabeçalho | `M3BarraSuperior`, `M3BarraFerramentas` | `MARCA`, `useLinksPrincipais`, `useContadorCarrinho` |
| `hero` (a prensa) | `M3SecaoHero` → `M3FormaPrensa`, `BaseButton` tonal M (filled abaixo de `md`) | `HERO.titulo`, `HERO.texto`, `HERO.acao` ("Ver cardápio", para `/menu`), `HERO.imagem` com `IMAGEM_HERO` |
| `lanches` (feed "Hambúrgueres") | `M3SecaoLanches` → `M3CartaoLanche`, `M3BotaoDividido`, `M3FolhaIngredientes`, `M3Foto`, text button "Ver cardápio" | `CATEGORIAS` ("Hambúrgueres"), `useProductsStore().foods`; destaque por `separarDestaque(foods, MARCA)` |
| `bebidas-e-sobremesas` | `M3SecaoBebidasSobremesas` → `M3ItemLista` (círculo nas bebidas, flor na sobremesa) | `drinks`, `desserts`, contagem de `dessertAdditionals` |
| `onde` | `M3SecaoOnde` → `M3ItemSegmentado` | `itensOnde` (horário, endereço, WhatsApp e e-mail) |
| Rodapé | `M3Rodape`, `AssinaturaEncaixe` | `MARCA`, `DESCRICAO`, `RODAPE.copyright` |

- **Layout:** `bebidas-e-sobremesas` e `onde` ficam numa faixa 7/5 a partir de `lg` (`align-items: start`), empilhadas abaixo.
- **Fold:** em 1440, o hero termina antes da dobra de 900 px e o cabeçalho do feed aparece acima dela [H2][H3]; em 390, o cabeçalho do feed aparece acima da dobra de 844 px.
- **Modal:** a `HomeView` mantém o `useProductModal` e o `ModalAdditional` e faz o `provide` do `personalizar` para as seções. Nenhuma seção chama o `cartStore` nem calcula preço (contrato da Home).
- **Reservas** (desenho, §5): cardápio vazio, produto sem ingredientes, imagem `data:`, imagem que falha e nome longo, como na Home.

### 5.3 Cardápio — a desenhar

- **Recomendação:**
  - título "Cardápio" e a frase "Escolha, personalize e peça." sem foto atrás (o texto nunca fica sobre a foto [H5]);
  - `CategoryTabs` como grupo conectado [54] (§4.2);
  - a grade em `M3CartaoLanche` comum, com o split e a folha de ingredientes, em 2, 3 e 4 colunas como o feed; sem destaque, porque no cardápio os itens são equivalentes [64];
  - categoria vazia com `EmptyState` "Nada nesta categoria por enquanto".
- **Fica do `SPEC.md`:** a categoria inteira à vista, sem paginação, e o acesso ao carrinho pelo FAB.

### 5.4 Modal "Personalizar" — a desenhar

- **Hoje, em M3:** o layout da Brasa (`BaseDialog`, `BurgerStack`, ingredientes, adicionais, observação, CTA "Adicionar · R$ x"), com as cores M3 pelos apelidos. É assim que ele aparece na Home aprovada.
- **Recomendação:** desenhar o modal pela decisão (f), mantendo o fluxo e os textos da §5.4 do `SPEC.md`. O CTA vira filled M (`size="lg"`). Ao confirmar, o foco volta para a frente do split que abriu o modal, que mostra o retorno "Adicionado" (§7.6).

### 5.5 Carrinho — a desenhar

- **Recomendação:** `h1` "Seu carrinho" em display-s; itens numa lista segmentada (§4.2), com miniatura em `M3Foto` de 64 px, nome, detalhes, total da linha, `QuantityStepper` e "Remover"; `OrderSummary` num contêiner `surface-container-low` de canto 28; CTA filled M "Finalizar pedido" (logado) ou "Entrar e finalizar" (visitante), como no `SPEC.md`.
- **Fica do `SPEC.md`:** remover com "Desfazer" no toast, carrinho vazio com `EmptyState`, links do visitante.

### 5.6 Pagamento — a desenhar

- **Recomendação:** seções "Entrega" e "Forma de pagamento" em contêineres `surface-container-low`; `PaymentMethodPicker` como lista segmentada de rádios (§4.2); aviso de endereço em `aviso` sobre `aviso-container` (5,03:1); CTA filled M "Confirmar pedido · R$ x", desabilitado até ser válido.
- **Fica do `SPEC.md`:** guards, `loading` "Enviando pedido…", conferência com o cardápio e o pedido.

### 5.7 Confirmação — a desenhar

- **Recomendação:** um contêiner `primary-container` com o `h1` "Pedido recebido" (que recebe o foco) e o ícone de check em `on-primary-container` (7,25:1); a linha "Pedido #1001 · PIX" e o `OrderSummary` somente leitura abaixo. Sem prensa: o momento expressivo da loja é um só, o do hero (desenho, resumo).
- **Ações:** filled "Voltar ao cardápio" e tonal "Ver meus pedidos".

### 5.8 Login e cadastro — a desenhar

- **Pesquisa antes:** os dossiês não cobrem text field (§4.2).
- **Recomendação enquanto isso:** painel `surface-container-low` de canto 28; `FormGroup` com os apelidos (fundo `surface-container-highest`, borda `outline`, foco com o anel de 3 px); banner de erro em `error-container` com o texto em `on-surface` (13,25:1) e o ícone em `error`; aviso de conta salva em `aviso-container`; botão filled M `block`.
- **Fica do `SPEC.md`:** validação, máscaras, ViaCEP, `autocomplete`, `?redirect=`, textos e placeholders.

### 5.9 Perfil — a desenhar

- **Recomendação:** "Seus dados" e "Seus pedidos" em contêineres; "Sair" e "Excluir conta" como text buttons (o de excluir com a tinta `error`, §4.1); o chip de status "Recebido" em `info` sobre `info-container` (5,01:1), com `forma-s` (chips em small [7]); "Ver itens" com o `OrderSummary`.

### 5.10 Rodapé

- **Na Home:** o `M3Rodape` do desenho (§4.1).
- **Nas outras rotas:** pela decisão (g).
- **Linha de direitos:** pela §10.2.
- **Redes sociais:** saem; voltam só com o perfil real da loja [H25][H26].

### 5.11 Admin — a desenhar

- **Tema:** pela decisão (d), claro, com os mesmos tokens.
- **Recomendação:**
  - **header:** a mesma linguagem do cabeçalho da loja (`surface`, marca em title-l), com o botão de alternar menu como botão de ícone;
  - **sidebar:** itens de 44 px, com o atual em `secondary-container`, como o item atual da pílula; gaveta abaixo de `lg` sobre o `scrim`, com `elevacao-3`. Os dossiês não cobrem navigation drawer nem rail;
  - **cards e KPIs:** filled card [63] em `surface-container-highest`, canto 12, sem sombra; valores em headline, tabulares;
  - **status dos pedidos:** chips em `forma-s` [7], com "Pendente" em `aviso`/`aviso-container`, "Em preparo" e "A caminho" em `info`/`info-container` e "Concluído" em `sucesso`/`sucesso-container`;
  - **diálogos e `ModalProducts`:** pelo `BaseDialog` (§4.2).
- **Login admin:** o painel da §5.8 sobre a ilustração de giz com o `scrim` (32%); medir o contraste do texto sobre o painel, não sobre a ilustração.
- **Fica do `SPEC.md`:** o comportamento das telas, a busca, os filtros no endereço, as notificações e o admin de teste só no `yarn dev`.

---

## 6. Matriz de estados

- **"Anel"** é o contorno de 3 px em `--m3-secondary`, afastado 2 px [30]. **"Anel interno"** usa `outline-offset: calc(-1 * var(--focus-width))`.
- **"Camada"** é o `::before` em `currentColor` a 8% no hover e 10% no pressionado [12]; no hover, só com `hover-capable`.
- **"—"** significa que o estado não se aplica.

| Componente | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
|---|---|---|---|---|---|---|---|
| Botão filled | `primary` / `on-primary`, cantos `full` | `primary-hover` | anel | `primary-pressed`; cantos `forma-m` (S) ou `forma-l` (M) | — | **a desenhar**: hoje `--color-surface-4` e `--color-ink-disabled`, sem camada | **a desenhar**: spinner atual + `aria-busy` |
| Botão tonal | `secondary-container` / `on-secondary-container` | `secondary-container-hover` | anel | `secondary-container-pressed`; cantos `forma-s` | `pressed`: **a desenhar** [54] | idem | idem |
| Botão de texto | tinta `primary`, sem fundo | camada 8% | anel | camada 10% | — | idem | — |
| Retorno "Adicionado" (filled e tonal) | `primary-container` / `on-primary-container`, check e "Adicionado" | igual | anel | igual | — | — | — |
| Split, frente | cantos de fora `full`, de dentro `forma-xs` | `primary-hover` | anel | `primary-pressed`; cantos de fora `forma-m` | — | — | — |
| Split, trás | 44 × 44, canto de dentro `forma-xs`, chevron para baixo | `primary-hover` | anel | `primary-pressed` | expandido: pílula inteira, chevron para cima, `aria-expanded="true"` [55] | — | — |
| Folha de ingredientes | `surface-container-high`, `elevacao-2` | — | — (não é interativa) | — | aberta (`v-show`) | — | — |
| Card do feed | `surface-container-highest`, sem sombra | — (sem hover) | só nos botões | — | folha aberta: `z-index: var(--z-raised)` | — | imagem: caixa em `surface-container`; falha: ícone `burger` |
| Item da pílula | `on-surface-variant` sobre `surface-container` | camada 8% | anel interno | camada 10% | `aria-current="page"`: `secondary-container` / `on-secondary-container` | — | — |
| FAB do carrinho | `primary-container` / `on-primary-container`; `elevacao-3` flutuando | camada 8% | anel | camada 10% | — | — | — |
| Badge | some com o carrinho vazio | — | — | — | com itens: `error` / `on-error`, label-s, mín. 16 px; "99+" de 100 em diante | — | — |
| Marca | `on-surface` | camada 8% | anel | camada 10% | — | — | — |
| Item segmentado (link) | `surface-container-lowest`; ícone em `secondary-container` | camada 8% | anel interno | camada 10% | — | — | — |
| Item segmentado (informação) | igual, ícone em `tertiary-container` | — | não recebe foco | — | — | — | — |
| Item de lista (produto) | `surface-container-lowest`, sem hover próprio | — | no botão | — | — | — | imagem que falha: ícone `utensils` |
| `CategoryTabs` | **a desenhar** (grupo conectado [54]) | camada | anel | troca de forma [54] | `aria-pressed` | — | — |
| `QuantityStepper` | **a desenhar** | via botão | via botão | via botão | — | no limite: `disabled` real | — |
| `FormGroup` | fundo `surface-container-highest`, borda `outline` | **a desenhar** | borda `primary` + anel com `outline-offset: 0` | — | — | prop `disabled`/`readonly` | ajuda com spinner (CEP) |
| `PaymentMethodPicker` | **a desenhar** | camada | anel no item (`:has(:focus-visible)`) | camada 10% | `secondary-container` + check | — | — |
| `AppToast` | **a desenhar** (`inverse-surface`) | pausa o tempo | anel no fechar | — | — | — | — |
| Item da sidebar admin | **a desenhar** | camada | anel interno | camada 10% | `secondary-container` | — | — |

Os estados de vazio e erro das telas (carrinho vazio, filtro sem resultado, banner `role="alert"`) seguem a §6 do `SPEC.md`, com os componentes da §4.2.

---

## 7. Micro-interações

Regras para todas:
- só `transform` e `opacity`; cor e fundo podem trocar;
- `transform` só em `motion-ok`; com movimento reduzido, a troca fica por opacidade em até `--dur-fast`;
- nenhuma muda o layout;
- nenhuma carrega informação que exista só na animação: o estado chega por texto ou ARIA (`aria-expanded`, `data-adicionado`, o nome do FAB).

### 7.1 A prensa do hero

- **Para que serve:** é o único momento expressivo da página [65]: a bola de carne é achatada e vira o disco de 12 lobos. É também o único movimento que não responde a uma ação.
- **Quando:** uma vez, ao montar, em CSS puro, só em `motion-ok`. A foto do lanche (a LCP) nunca anima.
- **A bola** (`.m3-prensa__bola`, círculo `primary` com 86% do diâmetro do disco, mesmo centro): de `transform: none` e opacidade 1 até `scale(1.12, 0.5)` e opacidade 0 (opacidade mantida até 70%), em `--m3-dur-mola-espacial-rapida` (360ms) com `--m3-ease-standard`.
- **O disco** (`.m3-prensa__disco`, `clip-path: var(--m3-forma-cookie)`): surge por opacidade em `--m3-dur-mola-efeitos-rapida` (150ms) e assenta de `scale(0.82, 0.62) rotate(-12deg)` até `none` em `--m3-dur-mola-espacial-lenta` (600ms) com `--m3-mola-espacial-lenta`, os dois com `--m3-atraso-prensa` (120ms) e `fill-mode: both`.
- **Reduzido:** a bola tem `display: none`, e o disco fica estático, com opacidade 1.
- **Sem morph:** a troca de forma é sugerida por escala, giro e opacidade (desvio da ficha); o morph de polígonos do Expressive é experimental [9].
- **Aceite:** com movimento reduzido, `getComputedStyle(disco).transform === "none"` e a bola não tem caixa; com movimento, o disco termina em `none`.

### 7.2 Troca de forma no pressionado

- **Para que serve:** separa o estado pressionado pela forma, como os botões do Expressive [54][70].
- **Técnica** (`troca-de-forma($repouso, $pressionado)`): o `::before` tem a forma de repouso e o `::after` a do pressionado; no `:active`, o `::before` vai a opacidade 0 e o `::after` a 1, em `--m3-dur-mola-efeitos-rapida`. O fundo das duas camadas vem de `--m3-botao-fundo`, que o hover e o pressionado trocam.
- **O anel acompanha:** no `:active`, o próprio botão passa ao `border-radius` apertado, e o anel de foco contorna os cantos menores (desenho, §14). A forma de repouso, mais redonda, cabe dentro da apertada, e a troca não vaza.
- **Reduzido:** a mesma troca, porque é só opacidade, que não conta como movimento [77].
- **Aceite:** no `:active`, o `::after` tem opacidade 1 e o `border-radius` computado do botão é o da forma apertada; nenhuma transição lista `border-radius`.

### 7.3 Chevron e metade de trás do split button

- **Para que serve:** mostra que a metade de trás abriu ou fechou a folha [55].
- **Com movimento:** um chevron só (`faChevronDown`) gira 180° em `--m3-dur-mola-espacial-rapida` com `--m3-mola-espacial-rapida`.
- **Reduzido:** dois ícones (`faChevronDown` e `faChevronUp`) sobrepostos trocam por opacidade conforme `aria-expanded`.
- **Forma:** expandida, a metade de trás vira pílula inteira (`border-radius: full`, `::after` visível), por opacidade.

### 7.4 Folha de ingredientes

- **Entrada com movimento:** opacidade de 0 a 1 em 150ms e `scale(0.94)` → `none` a partir do topo (`transform-origin: top`), em `--m3-dur-mola-espacial-rapida` com a mola espacial rápida.
- **Saída e movimento reduzido:** só por opacidade.
- **Teclado:** Esc fecha e devolve o foco à metade de trás; o clique fora fecha sem mover o foco.

### 7.5 Badge do carrinho

- **Entrada (de 0 para 1):** `scale(0)` → `none` em `--m3-dur-mola-espacial-rapida` e opacidade em 150ms, só com movimento; reduzido, só opacidade.
- **Mudança de número:** troca direta. O badge é `aria-hidden`; o FAB diz "Carrinho, N itens", e o announcer do modal continua dizendo "{nome} adicionado ao carrinho. {n} itens no carrinho." (`SPEC.md`, §5.4).

### 7.6 Retorno "Adicionado"

- **Para que serve:** confirma a adição no ponto onde a pessoa agiu, como o flip fazia.
- **Gatilho:** o modal confirma e chama `contexto.markAdded` (`useCartaoProduto`), que liga `adicionado` por `--dur-base` + `--dur-hold` (250 + 1200 = 1450ms com os tokens do material) e reinicia a cada adição.
- **Visual:** as duas metades do split (ou o botão tonal da lista) vão para `primary-container`, e a face troca de "Adicionar" para o check e "Adicionado", por opacidade. O check entra com `scale(0)` → `none` (mola espacial rápida), só com movimento.
- **Acessibilidade:** o nome acessível não muda ("Adicionar <nome>"); o `data-adicionado="true"` existe só durante o retorno, para os testes.
- **Aceite:** depois de confirmar, o botão tem `data-adicionado="true"` e a face "Adicionado" com opacidade 1; o atributo some depois de ~1,45 s.

### 7.7 Movimentos de apoio

| Elemento | Movimento | Com movimento reduzido |
|---|---|---|
| Camadas de estado | Opacidade em `--m3-dur-mola-efeitos-rapida` | Igual |
| Diálogo, sheet, toast, gaveta do admin | Os da §7.5 do `SPEC.md`, com `--ease-out` → emphasized-decelerate e `--ease-in-out` → standard (apelidos) | Só `opacity` |
| `QuantityStepper` | O da §7.5 do `SPEC.md` até o desenho (§4.2) | Troca direta |
| Spinner de `loading` | Rotação contínua de `--dur-spin` | Parado + texto |

### 7.8 O que sai do SPEC da Brasa

| Micro-interação da Brasa | O que acontece | Por quê |
|---|---|---|
| Flip "Adicionado ✓" (§7.1 de lá) | Sai. O retorno "Adicionado" (§7.6) faz o mesmo papel, por opacidade e com o check em escala | O flip é giro 3D da Brasa; no M3 o retorno é a troca de contêiner e de face |
| Odômetro do carrinho (§7.2 de lá) | Sai. O badge entra com escala, e o número troca direto (§7.5) | A Home aprovada não tem odômetro; o `digitos` e o `sentido` do `useContadorCarrinho` perdem o uso |
| Tilt nos cards (§7.3 de lá) | Sai, com o `useTilt.js` e o `--color-sheen` | O card do M3 não reage ao hover ("hover em todo card" é padrão genérico, desenho, §1) |
| Montador do burger (§7.4 de lá) | Fica no modal até o desenho, pela decisão (f) | É retorno funcional da personalização [FLX-02] |

---

## 8. Conteúdo e textos

### 8.1 Textos reais

- **Fonte:** os textos da Home saem do `dados.js` (cópia dos componentes de produção, com a origem anotada) e do `products.json`. Nenhum texto de loja novo.
- **Marca:** "Smash Burger" em todo lugar, em caixa normal (o wordmark em caixa alta da Brasa sai).
- **Títulos compostos dos rótulos reais:** "Bebidas e sobremesas" sai de `CATEGORIAS` ("Bebidas" e "Sobremesas" em minúsculas).
- **Contatos sem "·":** o WhatsApp mostra o rótulo e o `TELEFONE` separados; o `dados.js` já exporta `ENDERECO`, `TELEFONE` e `EMAIL` (desenho, §14).
- **"Hambúrgueres"** é o rótulo real de `foods` no `MenuView` e inclui a Batata Frita. Sem "a partir de" nem contagem (desenho, §13).
- **Preços:** sempre `formatPrice`, tabulares.
- **Idioma:** tudo em português, inclusive os rótulos ARIA ("Principal", "Ingredientes de <nome>", "Carrinho, vazio").
- **Telas fora da Home:** os textos da §8 do `SPEC.md` não mudam.

### 8.2 Microcopy provisória a revisar

O `src/direcoes/estilos/material/textos.js` marca cada texto com `// provisório`. Revisar com UX copy antes da etapa 5 (§12); nenhum `provisório` vai para o build.

| Chave | Texto | Onde | Recomendação |
|---|---|---|---|
| `ingredientes` | "Ingredientes" | Título da folha; começo de "Ingredientes de <nome>" | Tirar a marca: já é o título da seção do modal (`ModalAdditional.vue`) |
| `vazio` | "Nada nesta categoria por enquanto" | Feed e listas vazias | Tirar a marca: é o título do `EmptyState` do `MenuView` |
| `adicional` / `adicionais` | "adicional" / "adicionais" | "7 adicionais" na sobremesa (contagem calculada) | Saíram na etapa 5a: a linha repetia os chips de `monte-o-seu`, logo acima |
| `ondeTitulo` | "Onde e quando" | `h2` da seção `onde` | Revisar: texto novo |
| `email` | "E-mail" | Título do item de contato | Tirar a marca: é o rótulo de todos os formulários |
| `whatsapp` | "WhatsApp" | Título do item de contato | Tirar a marca: é o `CONTATOS[whatsapp].rotulo` e o rótulo visível do rodapé atual |
| `monteTitulo` (5a) | "Monte o seu" | `h2` de `monte-o-seu` | Na produção, "Adicionais": o título da seção do modal onde esses itens se escolhem; "Monte o seu" prometia montar o lanche do zero (escolha do usuário, 21/11/2026) |
| `monteLanche` (5a) | "No hambúrguer" | `h3` dos adicionais de lanche | Tirar a marca: o rótulo "Hambúrgueres" incluiria a Batata Frita, sem adicionais |
| `monteSobremesa` (5a) | "Na sobremesa" | `h3` dos adicionais de sobremesa | Tirar a marca |

### 8.3 Proibidos

Nenhum número, prazo, taxa, preço fora do `formatPrice`, nota, avaliação, depoimento, promessa ou promoção (cabeçalho do `textos.js`); nenhum "mais pedidos" sem dado; nenhum selo "aberto agora" (o horário passa da meia-noite, sem fuso nem feriados [H31]).

---

## 9. Imagens

Os arquivos otimizados da §9 do `SPEC.md` ficam como estão: nenhuma imagem nova entra.

- **`responsiveImage`** (`src/composables/useResponsiveImage.js`) monta `src`, `srcset` e `sizes` a partir do caminho-base, já com o `BASE_URL`. Caminho completo, `data:` ou URL externa saem sem variantes, e a `M3Foto` não põe o `<source>`.
- **`sizes` por uso** (copiados do código):

  | Uso | `sizes` |
  |---|---|
  | Foto do hero | `(min-width: 1280px) 544px, (min-width: 1024px) 448px, (min-width: 768px) 320px, 240px` |
  | Destaque do feed | `(min-width: 1280px) 520px, (min-width: 768px) 40vw, 60vw` |
  | Card comum | `(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 45vw` |
  | Miniatura das listas | `56px` |

- **Formas:** cartão (canto `forma-xl`; `forma-l` abaixo de `md`), cookie (destaque e disco), círculo (bebidas: o copo ou a lata vistos de cima) e flor (sobremesa: a bola de sorvete) (desenho, §5.3). Cookie, círculo e flor são sempre quadrados, para os lobos não deformarem.
- **O recorte do hero** (`banner-burger-bg`, WebP com alfa em 480 e 960 e PNG 960, 960 × 906) fica fora do disco a partir de `md` e quebra a borda de baixo do contêiner; abaixo de `md`, fica sobre o disco e vaza pela borda. A seção reserva o que vaza (`--m3-hero-vazamento`, calculado pela proporção real da imagem).
- **Carregamento:** só a foto do hero usa `loading="eager"` e `fetchpriority="high"`; o resto é `lazy`. `width` e `height` sempre.
- **Reserva:** a foto que falha mostra o ícone (`burger` nos cards, `utensils` nas listas) em `surface-container`, na mesma proporção e na mesma forma; o `alt` continua com o nome do produto.
- **Meta:** a Home em 390 transfere ≤ 1,5 MB no carregamento inicial (§1.1, item 9).

---

## 10. Correções de fluxo

Os fluxos da §10 do `SPEC.md` continuam valendo sem mudança. Entram só os três defeitos conhecidos da construção.

### 10.1 `scrollBehavior` ignora o `scroll-padding` ao pular para uma seção

- **Defeito:** o `scrollBehavior` do router devolve `{ el: to.hash }`. O vue-router calcula a posição do elemento e rola com `window.scrollTo`, que não aplica o `scroll-padding-top` do `html`. A partir de `lg`, a seção para debaixo do cabeçalho sticky.
- **Correção:** para âncoras, devolver também o deslocamento (`{ el: to.hash, top: <px> }`), lido do `scroll-padding-top` computado do `html` (que já é `calc(var(--navbar-h) + var(--space-4))`), para não repetir o valor no JS. Rota nova e voltar/avançar não mudam.
- **Aceite:** navegar para uma rota com âncora em 1440 deixa o topo da seção a pelo menos `--navbar-h` do topo da janela; o teste do router cobre o caso com e sem âncora.

### 10.2 O "·" da linha de direitos

- **Defeito:** o `RODAPE.copyright` ("© 2026 Smash Burger · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann") ainda junta textos com "·", o padrão genérico que a Home tirou dos contatos (desenho, §5.4 e §14).
- **Correção:** o `dados.js` passa a exportar as três partes do texto real separadas, como fez com `ENDERECO`, `TELEFONE` e `EMAIL`, e o `M3Rodape` as mostra em itens próprios (lado a lado a partir de `md`, empilhados abaixo), sem "·" e sem texto novo.
- **Aceite:** o rodapé não tem "·"; as três partes continuam com o texto de hoje.

### 10.3 Prato claro no cookie do destaque

- **Defeito:** no cookie do destaque, o prato claro da foto encosta no fundo do card (`surface-container-highest`) nos lobos de baixo, e a forma some ali (desenho, §14).
- **Correção recomendada:** atrás da `M3Foto` do destaque, uma camada com o mesmo `--m3-forma-cookie`, um pouco maior por `inset` negativo (sem `transform`), em `--m3-primary`, para os lobos ficarem visíveis seja qual for a foto. Alternativa: `object-position` para tirar o prato da borda.
- **Aceite:** na captura de 1440 e de 390, os 12 lobos do destaque aparecem inteiros; a camada é decorativa (`aria-hidden`) e não entra nos pares de texto.

---

## 11. Fora do escopo

### 11.1 Stack e bibliotecas

- **`@material/web`:** está em manutenção, à espera de novos mantenedores, e não cita o Expressive [29]; também não tem top app bar, badge nem carrossel [29].
- **Implementações de terceiros** (`@m3e/web` [84], o fork `material-esm` [85]): seriam dependência nova.
- **`@material/material-color-utilities` como dependência:** o esquema é gerado uma vez, fora do projeto [33]; o repositório do Theme Builder foi arquivado em 23/07/2026 [32].
- **Material Symbols:** pela decisão (c).
- **Morph de forma** (`MaterialShapes` [9]) e ripple [31]: fora pela regra de `transform` e `opacity` (desvios da ficha).
- **Atualização de versões:** nenhuma, como no `SPEC.md` (§11.1 de lá).

### 11.2 Funcionalidades

- **Esquema escuro:** pela decisão (d). Também fica fora a cor dinâmica do M3 [1]: a semente é fixa.
- **Componentes que a Home tirou** (desenho, §2 e §12): search bar [62], FAB menu [56], loading indicator [58] (não há espera real) e docked toolbar [59]. Os chips de adicionais [60] voltam como seção nova da Home (§0.2). O carrossel [34][75] fica de fora até haver fotos reais que não sejam de produto (§0.2, "Resultado do desenho").
- **Live Updates** de entrega [25]: rastreio e prazo não existem.
- **O que já estava fora no `SPEC.md`** (§11.2 de lá): backend, pagamento real, taxa de entrega, rastreio, previsão de entrega, minicarrinho em gaveta e o gráfico do dashboard.

### 11.3 Segurança e documentação

As regras de senha, sessão, chaves de `localStorage` e CSP do CLAUDE.md não mudam.

### 11.4 Acervo de ideias

- **A migração não mexe nas Homes do acervo** (`#/direcoes/esqueumorfismo` e `#/direcoes/neumorfismo`), nas fichas, nos desenhos nem nos dossiês. Elas seguem só no `yarn dev`, fora do build, com os portões delas e o teste de isolamento (`src/__tests__/direcoes-isolamento.test.js`).
- **A única exceção prevista** é o import da Bebas Neue e da Archivo nas páginas do acervo que as usam, como decidido em (b).
- **`src/direcoes/compartilhado/`** fica como está: a produção recebe cópias (§4.1).
- **Efeitos aceitos** (§0, "O que o acervo usa da produção"): o modal e o toast reais em M3 dentro das Homes do acervo, e o índice com as cores e a fonte do M3.

---

## 12. Ordem de execução

Cada etapa termina com `build`, `eslint .` e `vitest run` sem erros e uma conferência visual em 1440, 1024 e 390, comparando com `#/direcoes/material` enquanto ela existir. As telas "a desenhar" passam por desenho (como os de `docs/direcoes/desenho/`) antes da etapa delas.

0. **Decisões:** respondidas em 21/11/2026 (§0.1 e §0.2). O plano de execução por sessão sai desta ordem (§0.2, "Execução").
1. **Tokens e fontes:** os `--m3-*` e os apelidos em `base/_tokens.scss`; `color-scheme: light` no reset; `theme-color` e manifest; Roboto em `dependencies` e no `main.js`; Archivo e Bebas saem do `main.js` e de `dependencies` e passam a `devDependencies`, importadas no `HomeEsqueumorfismo.vue` e no `DirecoesIndice.vue` (decisão b; o acervo usa as duas).
   - **Resultado esperado:** o app inteiro em M3 com a estrutura da Brasa, como o modal aparece na Home aprovada. Rodar o axe da §13.3: contraste e foco já valem aqui.
2. **Base de estilo:** `base/_m3.scss` com os mixins; `_typography.scss` sem a `.display`; `_motion.scss` com a lista nova; anel de 3 px.
3. **Primitivos:** `BaseButton` com o visual M3 (§4.1) e o teste; `M3Foto`, `M3BotaoDividido`, `M3FolhaIngredientes`, `M3ItemLista`, `M3ItemSegmentado`; composables e utilitários da §4.1.
4. **Moldura:** `M3BarraSuperior`, `M3BarraFerramentas` e `M3Rodape` no `MainLayout`; `<main>` sem `padding-top`; reserva da barra; `CategoryTabs` com o `top` novo; `scrollBehavior` (§10.1); linha de direitos (§10.2).
5. **Home:** as quatro seções em `src/components/home/`, a `M3FormaPrensa` e o `M3CartaoLanche`; a `HomeView` com o `provide`; o teste da Home; a microcopy revisada (§8.2); o prato do cookie (§10.3).
5a. **Duas seções novas da Home** (§0.2): primeiro o desenho, no formato de `docs/direcoes/desenho/` e com o juiz de distinção; depois a construção, com o teste de contrato atualizado, os portões e o crítico. Decidido no desenho: 5 seções, só a `monte-o-seu` entra (§0.2), e o `vue3-carousel` sai na limpeza (decisão i).
6. **Cardápio e modal** (depois do desenho): §5.3 e §5.4.
7. **Carrinho, pagamento e confirmação** (depois do desenho): §5.5 a §5.7.
8. **Login, cadastro e perfil** (depois da pesquisa de campos e do desenho): §5.8 e §5.9.
9. **Admin** (depois do desenho): §5.11.
10. **Componentes base restantes** (depois da pesquisa e do desenho): `AppToast`, `BaseDialog`, `EmptyState`, `QuantityStepper`.
11. **Limpeza:** apagar os arquivos da §4.4 e os apelidos (decisão a); acertar os ícones do plugin; `vue3-carousel` (decisão i: sai, porque a Home ficou sem carrossel na etapa 5a) e a pasta do material (decisão e), com o acervo ficando; README e TESTING; as buscas da §13.2.
12. **Verificação ponta a ponta (§13).**

---

## 13. Verificação ponta a ponta

É o passo final, obrigatório e repetível.
- Os scripts de `.claude/e2e/` rodam com Playwright e axe-core numa pasta fora do projeto, sem entrar no `package.json` (`.claude/e2e/README.md`), atualizados pela §4.3.
- O servidor é o build de produção. O acervo (§13.10) é conferido no `yarn dev`.

### 13.1 Build, testes e lint

```bash
export COREPACK_NPM_REGISTRY=https://registry.npmjs.org
corepack yarn@3.8.7 install --immutable
corepack yarn@3.8.7 build            # esperado: termina sem avisos
npx vitest run                       # esperado: todos os testes passam
npx eslint .                         # sem --fix; esperado: 0 erros
corepack yarn@3.8.7 preview --port 4173 --strictPort   # em background; http://localhost:4173/smash-burguer/
```

O `vitest run` inclui os testes do acervo (`src/direcoes/**/__tests__/`) e o `direcoes-isolamento.test.js`, que continuam passando sem mudança. Se o `package.json` mudou (decisões b e i), rodar também `corepack yarn install --immutable --check-cache` no container Linux, como o CI (CLAUDE.md).

### 13.2 Buscas no código

Cada comando abaixo deve retornar **zero** linhas. A exceção da §13.2 do `SPEC.md` para os `_tokens.scss` de `src/direcoes/` continua, por causa do acervo.

```bash
# Cores, gradientes, sombras, durações e camadas só nos tokens (exceções: BurgerStack, assinatura de autoria e os tokens das direções)
rg -n "#[0-9a-fA-F]{3,8}\b" src --glob '!**/base/_tokens.scss' --glob '!**/BurgerStack.vue' --glob '!**/AssinaturaEncaixe.vue' --glob '!**/*.json' --glob '!**/direcoes/**/_tokens.scss'
rg -n "rgba?\(|hsla?\(" src --glob '!**/base/_tokens.scss' --glob '!**/BurgerStack.vue' --glob '!**/direcoes/**/_tokens.scss'
rg -n "z-index:\s*-?[0-9]" src
rg -n "(transition|animation)[^;]*[0-9]+m?s" src --glob '!**/base/_tokens.scss' --glob '!**/direcoes/**/_tokens.scss'

# Padrões banidos (fora da assinatura de autoria)
rg -n "!important|outline:\s*none|transition:\s*all|respond-to\(" src --glob '!**/AssinaturaEncaixe.vue'

# Troca de forma só por transform e opacidade: nenhuma transição de forma, tamanho ou posição
rg -n "(transition|transition-property)[^;]*(border-radius|clip-path|inset|width|height|margin|padding|top|left)" src --glob '!**/AssinaturaEncaixe.vue'

# Papéis do M3 definidos só nos tokens (as propriedades locais usam --m3-botao-, --m3-hero-, --m3-item- e --m3-prensa-)
rg -n -- "--m3-[a-z0-9-]+\s*:" src --glob '!**/base/_tokens.scss' --glob '!**/direcoes/**' | rg -v -- "--m3-(botao|hero|item|prensa)-"

# Fontes da Brasa fora da produção (o acervo pode usá-las)
rg -n -i "bebas|archivo" src index.html --glob '!**/direcoes/**'

# Apelidos da migração (só depois da etapa 11, se a decisão a for aceita; o --radius-round fica)
rg -n -- "var\(--(color|text|font|leading|elev|ease)-|var\(--radius-(sm|md|lg)\)" src --glob '!**/direcoes/**' --glob '!**/AssinaturaEncaixe.vue'

# Arquivos removidos sem referência
rg -n "TheNavbar|TheFooter|CartBadge|CarouselBurguer|useTilt|ProductCard|MolduraDirecao|useEstiloAtivo" src --glob '!**/direcoes/**'

# Microcopy provisória fora da exploração
rg -n "provisório" src --glob '!**/direcoes/**'

# Preço só com formatPrice
rg -n "toFixed\(" src

# Uma só grafia da marca
rg -n -i "smash burgers|smash burguer|smashburguer" src index.html public

# Nenhum texto em inglês que existia na interface
rg -n "Address|Working Hours|Follow Us|Search\.\.\.|First Name|Last Name|\"Password\"|Status: pending" src
```

**Build:** a busca de `TESTING.md` no `dist/` (por `direcoes`, `data-direcao`, "Direções visuais", "provisório", os prefixos de token dos estilos e os nomes das fontes novas) muda: o prefixo `--m3-` e "Roboto" passam a existir no build. Continuam proibidos `direcoes`, `data-direcao`, "Direções visuais", "provisório", os prefixos de token do esqueumorfismo e do neumorfismo e "Courier Prime" e "Nunito" (e "Archivo" e "Bebas", se elas passarem ao acervo pela decisão b).

### 13.3 Varredura visual e de acessibilidade

Rodar em **1440×900**, **1024×768** (layout) e **390×844**.

**Rotas:** as da §13.3 do `SPEC.md` (loja, admin e estados), mais: Home com a folha de ingredientes aberta; Home com o cardápio esvaziado no painel.

**Para cada combinação:**
1. Screenshot de página inteira e da viewport, depois de rolar até o fim e voltar ao topo. Conferir contra a referência: superfícies tonais, primary só em ação e no hero, cards sem sombra, toolbar flutuante abaixo de `lg`.
2. axe-core com `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` e `wcag22aa`: **0 violações**.
3. Sem rolagem horizontal: `document.documentElement.scrollWidth === innerWidth`.
4. **Alvos:** como o critério 3 da §1.1, incluindo as duas metades de cada split.
5. **Fonte:** no `body`, `getComputedStyle(...).fontFamily` começa com `"Roboto Variable"`; o `h1` do hero tem `font-weight: 500`.
6. **Foco não coberto (abaixo de `lg`):** com Tab por toda a página, o retângulo do elemento focado nunca fica inteiro dentro do retângulo da `.m3-ferramentas` [76].
7. Com movimento reduzido emulado (`page.emulateMedia({ reducedMotion: 'reduce' })`), repetir os itens 1 e 2.

### 13.4 Fluxo do pedido de ponta a ponta

O roteiro da §13.4 do `SPEC.md`, em 390 e repetindo em 1440, com estas trocas:
- **Adicionar pela Home:** clicar na metade de trás do split do Cheese Bacon abre a folha com os ingredientes reais (`aria-expanded="true"`); Esc fecha e devolve o foco à metade de trás. Clicar em "Adicionar Cheese Bacon" abre o modal com `:modal === true`.
- **Retorno:** ao confirmar, o foco está na frente do split, que tem `data-adicionado="true"` e a face "Adicionado"; o badge do FAB mostra "1"; o FAB se chama "Carrinho, 1 item"; a região viva contém "Cheese Bacon adicionado ao carrinho".
- **Bebida pela lista:** na etapa "Quantidade e remoção", a bebida entra pela lista segmentada da Home ("Adicionar Coca Cola Lata"), e não pelo cardápio.
- **Navegação:** Início, Cardápio e Entrar/Perfil pela pílula; o carrinho pelo FAB. Em 390, a pílula fica visível o tempo todo.
- **O resto** (carrinho, login com senha errada e certa, pagamento, confirmação, perfil, sair e entrar, quantidade, remoção com "Desfazer" e rotas protegidas) segue o roteiro de lá.

### 13.5 Teclado

O roteiro da §13.5 do `SPEC.md`, com estas trocas:
- a ordem do Tab no topo é skip link, marca, Início, Cardápio, Entrar ou Perfil, carrinho e `main`, nas duas larguras;
- todo controle mostra o anel de 3 px; nos itens encostados, por dentro;
- Enter e Espaço na metade de trás abrem e fecham a folha; Esc fecha e devolve o foco;
- sai o menu mobile (não existe mais).

### 13.6 Micro-interações

| Interação | Conferência |
|---|---|
| Prensa | Com movimento: a bola anima e some, e o disco termina com `transform: none`. Reduzido: a bola sem caixa, o disco com `transform: none` e opacidade 1 desde o início |
| Troca de forma | No `:active` de um filled, o `::after` tem opacidade 1 e o `border-radius` do botão é o apertado; nenhuma transição de `border-radius` |
| Chevron | Com movimento: rotação de 180° com `aria-expanded="true"`. Reduzido: `transform: none`, e o `faChevronUp` com opacidade 1 |
| Folha | Com movimento: `transform` intermediário na entrada. Reduzido: só opacidade |
| Badge | De 0 para 1: escala na entrada com movimento; `transform: none` reduzido |
| Retorno "Adicionado" | `data-adicionado` presente logo após confirmar e ausente depois de ~1,45 s |
| Movimento reduzido (todas) | `transform` computado `none` em todos os elementos acima; o conteúdo e o resultado são os mesmos |

### 13.7 Performance e contraste

- **Peso:** a Home em 390 transfere ≤ 1,5 MB até `networkidle` sem rolar, com a Roboto. As imagens servidas são WebP (o recorte do hero, WebP com alfa) e têm `width` e `height`.
- **Imagem principal:** a foto do hero (`fetchpriority="high"`) é a LCP da Home.
- **Contraste:** o `tokens-contrast.mjs`, atualizado, lê os `--m3-*` de `base/_tokens.scss` e calcula todos os pares da tabela por papel (§2.2): cada um acima do mínimo declarado (4,5 para texto; 3 para contêiner, borda e foco).

### 13.8 Admin

Com o admin criado à mão na chave `admin` (ou, no `yarn dev`, o admin de teste), rodar a §13.3 nas rotas do admin e conferir: um item ativo por rota na sidebar, a gaveta fechada em 390, os status em português com os chips da §5.11 e o contraste dos chips medido.

### 13.9 Entrega

- Os screenshots finais (1440, 1024 e 390, todas as rotas) vão para o PR, ao lado das capturas de `#/direcoes/material` da Home.
- Uma decisão em aberto só conta como resolvida quando o usuário respondeu; uma tela "a desenhar" só conta como feita quando passou pelo desenho e pela verificação desta seção.

### 13.10 Acervo

No `yarn dev`, antes da etapa 1 e depois das etapas 1, 2, 4 e 11:
- `#/direcoes`, `#/direcoes/esqueumorfismo` e `#/direcoes/neumorfismo` (e `#/direcoes/material`, pela decisão e) abrem sem erro no console;
- capturas de 1440 e 390 de cada Home do acervo, comparadas com as de antes: mudam só os efeitos aceitos da §11.4 (modal, toast e índice);
- as fontes das Homes do acervo continuam as do desenho de cada uma (`getComputedStyle` dos títulos), inclusive a Bebas Neue do esqueumorfismo;
- os portões do acervo, se forem rodados de novo, passam como antes.
