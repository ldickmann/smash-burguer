# Desenho do painel admin: Material 3 Expressive (etapa 9)

24/11/2026. Desenho do painel administrativo: a moldura (`AdminLayout`, o cabeçalho, a navegação lateral e a gaveta), as seis telas (Painel, Produtos, Pedidos, Relatórios, Meu perfil e Configurações), o `AdminCard`, o `ModalProducts`, o card de produto do admin, que substitui o `ProductCard variant="admin"`, o rótulo de status e o login do admin. A loja inteira já está no M3 (etapas 1 a 8).

Fontes: `docs/direcoes/SPEC-material.md` (SPEC-M); `SPEC.md` (a Brasa, para o fluxo e os textos); `docs/direcoes/desenho/conta.md` (etapa 8, modelo deste); `docs/direcoes/desenho/carrinho-pagamento.md` (etapa 7); `docs/direcoes/desenho/cardapio.md` (etapa 6); `docs/direcoes/desenho/material.md` (a Home); `docs/direcoes/pesquisa/material.md`, com a seção "Etapa 9: navegação do painel" ([160] a [214]) e as das etapas 6 e 8; `docs/direcoes/PESQUISA.md` ([1] a [36]); o código de hoje e as capturas `capturas\e08\admin\` da pasta de estado do plano. Nenhuma pesquisa nova: onde falta fonte, está escrito "não encontrei". Pares medidos com `lerTokens` e `medirPar` de `src/utils/contraste.js`, sobre o `base/_tokens.scss`, em duas casas, para baixo, como o `contraste.test.js`.

**Resumo:**

- **Navegação por largura (pesquisa da etapa 9):** a partir de `lg`, uma coluna fixa de 240 px com os rótulos sempre à vista, na superfície da página: a gaveta standard, que o Expressive passa a chamar de rail expandido ([161], [170], [186]). Abaixo de `lg`, a mesma lista numa gaveta modal sobre o `scrim`, fechada por padrão, como hoje (`SPEC.md` §5.11; SPEC-M §13.8). Itens de 56 px nas duas ([164], [176]). O item atual é a pílula `secondary-container` da loja, na largura do item, com o rótulo em 700: a troca de fundo sozinha não passa na 1.4.1 ([98], [99]), e a G182 lista o negrito entre as pistas além da cor [215] (escrita para texto colorido; aplicá-la ao fundo é inferência).
- **A gaveta passa a ser modal de fato:** o contêiner deixa de ser `aside` e vira `div`, com `role="dialog"` e `aria-modal` abaixo de `lg`; o resto da página fica `inert` enquanto ela está aberta (o efeito que a H102 descreve para o `<dialog>` [200]), menos a região dos avisos. Ao fechar, o foco volta ao "Alternar menu" depois do `nextTick`, quando o `inert` já saiu ([199], [202]).
- **Uma superfície só na moldura:** cabeçalho, coluna e página em `surface` ([196], [164], [174]); o cabeçalho fica grudado em todas as larguras; a marca fica num lugar só, a cabeça da coluna e da gaveta ([179], [184]). A busca vira um campo outlined de 48 px, a linguagem do `FormGroup`, e não a search bar em pílula [62].
- **Cards:** filled, canto 12, sem sombra, em `surface-container-high`, e não no `highest` da recomendação: o "Detalhes" (texto) pressionado dá 4,38 no `highest` e 4,59 no `high` (medidos). KPIs com o valor em headline-m tabular. Os pedidos ficam em cards; o card de produto vira `M3CartaoProduto`, com o `M3Foto` da loja, o `responsiveImage` e o `formatPrice` (sem o estado "Adicionado" do fluxo de compra), na horizontal em 390.
- **Rótulo de status vira componente** (`M3RotuloStatus`, decisão j): "Pendente" em `aviso`, "Em preparo" e "A caminho" em `info`, "Concluído" em `sucesso`, todos com 5,00 a 5,03. O "Recebido" do perfil passa a usá-lo (uma linha).
- **Atalhos:** o selo vira o badge do M3, em `error` ([35], [212]), com o "9+" de hoje. **Toasts no pé** em todas as larguras do painel: no topo, o aviso "Produto criado." cobriria inteiro o "Novo produto" focado em 1024.
- **Login do admin:** o `scrim` de 32% sobre a ilustração; o banner junto do botão, numa região `role="alert"` sempre no DOM (o invólucro da loja); "Voltar à loja" vira text button.
- **Um token novo** (`--m3-navegacao-largura`), 9 pares novos medidos, nenhuma dependência, nenhum ícone novo, nenhum texto novo. Três pontos vão ao usuário (§12): o preço da linha no card do pedido ("R$ 25,90 cada", recomendado), os rótulos da navegação e a categoria vazia em Produtos.
- **Ficam para a etapa 10:** os botões de ícone (`iconOnly`, com a forma da Brasa até lá), o `danger`, o `loading`, o desabilitado, o `BaseDialog`, o `EmptyState` e o `AppToast`. **Para a 11:** o `ProductCard`, o `_product-card.scss`, o `useTilt` e sete apelidos que ficam sem uso.

---

## 1. Tese

**A tese do SPEC-M vale como está:** a ousadia fica no hero da Home; o resto é quieto (SPEC-M §0, "Tese"). No painel:

- **O painel é ferramenta de trabalho.** Superfícies tonais, cards sem sombra, texto em body-m, nada que se mova sozinho. O que muda de cor muda por um estado real: o item atual, o status do pedido, o contador.
- **A coisa memorável é a navegação, e ela é a da loja.** A pílula `secondary-container` do item atual, que na loja fica na horizontal, aqui desce para a coluna, na largura do item, com o rótulo em 700. Quem passa da loja para o painel reconhece o mesmo sinal.
- **Uma superfície só na moldura.** Cabeçalho, coluna e página em `surface`, como a top app bar pequena e a gaveta standard do M3 ([196], [164]). Quem separa as coisas são os cards (`surface-container-high`), e não faixas, bordas ou sombras.
- **Sem:** hero, prensa, faixa `primary-container`, pílula flutuante, gráfico decorativo, seta de tendência, rótulo em caixa alta, hover em card, entrada animada de seção, foto de avatar.

### O que muda da Brasa

| Na Brasa (capturas `admin-*` da etapa 8) | No M3 | Por quê |
|---|---|---|
| Sidebar `aside` `surface-container-low` com borda à direita; marca "SMASH BURGER" em caixa alta; itens de 44 px | Coluna `div` em `surface`, sem borda, com a `nav` como landmark; "Smash Burger" em title-l 500 na cabeça da coluna; itens de 56 px | A gaveta standard e o rail expandido ficam em Surface, Level0 ([164], [174], [181]); o complementary é para conteúdo de apoio [210]; a marca no cabeçalho do rail [179]; o indicador de 56 dp ([164], [176]); a grafia da marca (CLAUDE.md; SPEC-M §0) |
| Item atual em `primary-container`, com a barra de 3 px à esquerda | Pílula `secondary-container` na largura do item, rótulo `on-secondary-container` em 700, `aria-current` | Indicador ativo em SecondaryContainer ([164], [161], [178]); o negrito no ativo, padrão do MDC [161], como pista além da cor pela G182 [215] (inferência: ela trata de texto colorido); o item atual da pílula da loja (SPEC-M §5.11) |
| Cabeçalho fixo `surface-container-low` com borda embaixo | Cabeçalho grudado (`sticky`) em `surface`, sem borda, 64 px | Top app bar pequena: 64 dp [195], Surface, Level0 [196]; a linguagem do cabeçalho da loja (SPEC-M §5.11) |
| Busca: campo cinza (`--color-input`) de canto 8 | Campo outlined de 48 px, sem fundo, contorno `outline`, canto 12, lupa no início | O campo do sistema (etapa 8) na medida densa do Compose [119]; não é a search bar em pílula [62] |
| Selo verde-escuro (`primary`), canto 8 | Badge do M3: `error` / `on-error`, label-s, 16 px, canto `full`; "9+" | Badge de número de pendências [212], na cor do badge do M3 [35]; o mesmo badge do FAB da loja |
| Avatar: círculo cinza de 44 px | Círculo `secondary-container` de 32 px com as iniciais, num alvo de 44 | Avatar de 32 dp [196]; o alvo maior que o desenho (inferência da pesquisa, com [196] e [78]) |
| Página `surface-container`; cards `surface-container` com sombra e canto 12 | Página `surface`; filled card `surface-container-high`, canto 12, sem sombra | Elevação tonal ([1], [13]); filled card [63]; `high` pelo contraste do text button (medido, 5.4) |
| "CLIENTE" e "ITENS" em caixa alta; dois divisores no card | `h3` "Cliente" e "Itens" em title-s; um divisor só, acima do Total | O padrão genérico "rótulo em caixa alta acima do título" sai (pacote, item 11) |
| Chip de status `text-xs` 700 com as cores pelos apelidos | `M3RotuloStatus`: label-l 500, `forma-s`, o "on" do papel sobre o contêiner dele | O rótulo de status do perfil (etapa 8), agora componente; chips em small [7] |
| Card de produto da Brasa: foto de ponta a ponta, sombra, preço e botões empilhados | `M3CartaoProduto`: foto 4:3 recuada, nome, descrição, preço e a fileira "Editar" … "Excluir"; na horizontal em 390 | A anatomia do card da loja ([63], SPEC-M §4.1) sem o split; densidade do painel |
| Toasts no topo à direita a partir de `md` | Toasts no pé, em todas as larguras do painel | O topo do painel tem as ações das páginas (seção 4) |
| Login: camada `--color-overlay`; banner no topo do painel; "Voltar à loja" como link na frase | `--m3-scrim` direto; banner junto do botão, região sempre no DOM; "Voltar à loja" como text button | SPEC-M §5.11; o login da loja (etapa 8); link solto não tem a exceção de alvo da 2.5.8 [78] |

---

## 2. Processo: plano, revisão contra o pacote e desenho final

### Sistema (dentro da identidade aprovada; nenhuma cor nova)

- **Cores, por papel:**
  - moldura e página (`surface`) #f7fbf1;
  - cards e menu (`surface-container-high`) #e6e9e0;
  - item atual e avatar (`secondary-container`) #d5e8cf, com a tinta `on-secondary-container` #3b4b39;
  - texto (`on-surface`) #181d17; ícones e rótulos inativos (`on-surface-variant`) #424940;
  - campos (`outline`) #72796f; foco (`primary`) #3a693b com o anel (`secondary`) #52634f;
  - selo (`error`) #ba1a1a; status em `aviso` #7d5700, `info` #00639a e `sucesso` #196d25 sobre os contêineres deles.
- **Tipo:** Roboto, uma família. `h1` pela regra global (`--text-page`, de 36 a 45 px, 500); título de card em title-m 500; subtítulo (`h3`) em title-s (label-l 500); texto do painel em body-m; valor de KPI em headline-m 400, tabular; navegação em label-l 500 (700 no item atual).
- **Layout:** grade de duas colunas a partir de `lg` (a coluna de 240 px e o trabalho); uma coluna abaixo, com a gaveta. Tudo alinhado ao início. O conteúdo vai até `--container-max`.
- **Princípio:** o painel não tem momento expressivo. A única cor viva fora de ação é a do estado: o item atual, o status, o selo.

### Plano (primeira passada)

1. Navigation rail recolhido (96 px, ícone sobre o rótulo) a partir de `md`, e navigation bar embaixo em 390.
2. Cabeçalho com a search bar em pílula do M3 no centro, a marca à esquerda e o avatar dentro da barra.
3. KPIs em `primary-container`, com o valor em display-s.
4. Pedidos numa tabela de dados (número, cliente, itens, total, status, ações).
5. Status com ícone (relógio, chama, moto, check).
6. O card de produto do admin como uma variante do `M3CartaoLanche`.
7. A gaveta como `<dialog>` aberto com `showModal()`.
8. Cards em `surface-container-highest` (SPEC-M §5.11).
9. O selo de "Notificações" em `aviso`, a cor do "Pendente".
10. Toasts no topo à direita, como hoje.
11. Login do admin em duas colunas, com a marca grande à esquerda.

### Revisão contra o pacote (o que saiu genérico, repetido, inventado, infiel ou inviável, e o que entrou)

- **Rail recolhido e navigation bar: trocados (infiel e acessibilidade).**
  - Os rótulos têm até 20 caracteres ("Relatórios de Vendas"): no rail de 96 dp, em label-m sob o ícone ([173], [175]), eles quebram em duas linhas; o modo AUTO do MDC esconde o rótulo dos não selecionados com 4 itens ou mais [170], e tirar rótulos é proibido na direção [26].
  - A navigation bar embaixo serve de 3 a 5 destinos [61] e é a escolha recomendada na janela compacta ([187], [179]), mas quebra o fluxo da gaveta (`SPEC.md` §5.11; SPEC-M §13.8, "a gaveta fechada em 390"), não tem lugar para o "Sair" e repetiria a pílula embaixo da loja sem a função dela (pacote, item 7).
  - Entrou: a coluna com rótulos a partir de `lg` e a gaveta modal abaixo (seção 4).
- **Search bar em pílula: saiu (proibido e genérico).** A busca no topo [62] é proibida na direção, e a pílula é o traço mais "Google" do catálogo (desenho da Home, §11). Entrou o campo outlined do sistema, na medida densa [119] (5.2).
- **KPIs em `primary-container`: saíram (repetição).** Seriam a faixa da confirmação e o contêiner do hero da Home, e `primary` só marca ação (SPEC-M §2.2). Entrou o filled card com o valor em headline-m.
- **Tabela de dados: saiu (inviável e fora do pacote).** Em 390, ela pediria rolagem horizontal ou viraria cards de qualquer jeito; uma tabela convida a ordenar por coluna, que não existe (pacote, item 3). Entrou o card por pedido (5.6).
- **Ícones de status: saíram (inventado).** Chama e moto dariam ao status um sentido que o texto não tem, e o check lembra o filter chip marcado [60]. Entrou o rótulo só com texto (5.5).
- **Variante do `M3CartaoLanche`: trocada (inviável).** O card da Home depende do `usePersonalizar` e do split; uma prop de admin misturaria a compra e a gestão no mesmo componente. Entrou o `M3CartaoProduto`, que reaproveita o `M3Foto` (5.7).
- **Gaveta como `<dialog>`: trocada (inviável).** O mesmo contêiner é a coluna fixa a partir de `lg`; trocar o elemento por largura pediria dois componentes ou mover a `nav` de lugar. Entrou o `inert` no resto da página, o mesmo efeito que a H102 descreve para o diálogo modal [200], sem trocar o elemento; o papel de diálogo vai por atributo, só abaixo de `lg` (5.1, volta 1).
- **Cards em `highest`: trocados (acessibilidade, medido).** O "Detalhes" é text button sobre o card: pressionado, dá 4,38 no `highest` e 4,59 no `high`; no hover, 4,50 e 4,71 (medidos; mínimo 4,5). Entrou o `surface-container-high` (5.4).
- **Selo em `aviso`: trocado.** O badge do M3 é de erro [35], e o do FAB da loja também; o selo é uma contagem, e não um status. O `aviso` fica no rótulo "Pendente" (5.2).
- **Toasts no topo: trocados (acessibilidade).** Em 1024, o aviso vai de x 576 a 992, na altura do cabeçalho da página; depois de criar um produto pelo teclado, o foco volta ao "Novo produto" (x de cerca de 856 a 992), que fica inteiro sob o aviso (2.4.11 [76]). Entrou o aviso no pé, com a reserva no `scroll-padding` (seção 4).
- **Login em duas colunas: saiu (repetição).** A ilustração fica atrás do painel (SPEC-M §5.11), e a coluna de marca já saiu do login da loja (desenho da Conta, §2).
- **Marca no cabeçalho (SPEC-M §5.11): movida, por escolha.** A marca fica num lugar só, a cabeça da coluna e da gaveta, onde o rail põe o logo ([179], [184]). A partir de `lg`, essa cabeça fica na mesma faixa de 64 px do cabeçalho, e a linha de cima se lê como uma barra só. (Abaixo de `md`, o cabeçalho também não teria lugar para ela; de `md` a `lg` teria, e a escolha é não repetir a marca fora da gaveta.)

### Desenho final

As seções 3 a 12 abaixo. As decisões do item 6 do pacote estão em 4.1 e 5.1 (a, b, c, d), 5.2 (e, f, g), 5.3 (h, p, r), 5.4 (i), 5.6 (j, n), 5.5 (k), 5.7 (l, n), 5.8 (m), 5.9 e 5.10 (o, n), 5.11 (q), 4.6 (s) e na seção 6 (t), e numa linha cada na seção 12.

**Volta 1 do revisor aplicada** (24/11/2026): os 16 achados e as decisões da sessão principal (`correcoes-admin-volta-1.md`, na pasta de estado do plano).

---

## 3. Composição

### Moldura (`AdminLayout`), em todas as rotas do painel menos o login

1. Skip link "Pular para o conteúdo" (hoje).
2. `header.admin-header` → `nav` "Ferramentas do painel": "Alternar menu" (só abaixo de `lg`), a busca, "Notificações", "Tarefas" e o avatar com o menu.
3. `div.admin-overlay` (o `scrim`, só com a gaveta aberta).
4. `div#admin-sidebar` (era `aside`; abaixo de `lg`, `role="dialog"` com `aria-modal` e o nome "Menu do painel") → `nav` "Seções do painel", com a coluna inteira dentro: a marca (e o "Fechar", na gaveta), os quatro destinos e o "Sair" no pé.
5. `main#conteudo` com a tela.
6. Fora do `AdminLayout`, no `App.vue`: a região dos avisos (`AppToast`), que não entra no `inert` (5.1).

A partir de `lg`, uma grade: a coluna de `--m3-navegacao-largura` à esquerda, ocupando a altura toda, e, à direita, o cabeçalho em cima e o `main` embaixo. A ordem do DOM não muda.

### Telas (dentro do `main`)

| Tela | Blocos, nesta ordem |
|---|---|
| Painel (`/admin`) | `h1` "Painel"; os 4 KPIs (`ul`); a seção "Gráfico de vendas" com o `EmptyState` num card |
| Produtos (`/admin/products`) | cabeçalho da página (`h1` "Produtos" e o filled "Novo produto"); o filtro "Categoria"; a linha do resultado da busca; a grade de cards (ou o `EmptyState`); os diálogos |
| Pedidos (`/admin/orders`) | `h1` "Pedidos"; o filtro "Status"; a linha do resultado da busca; a grade de cards de pedido (ou o `EmptyState`); o diálogo "Detalhes" |
| Relatórios (`/admin/reports`) | `h1` "Relatórios"; os 3 KPIs (`ul`); o card "Produtos mais vendidos" |
| Meu perfil (`/admin/profile`) | `h1` "Meu perfil"; o card "Administrador" |
| Configurações (`/admin/settings`) | `h1` "Configurações"; o card "Dados do painel"; o diálogo de restaurar |
| Login (`/admin/login`) | `main` próprio: a ilustração com o `scrim` e o painel de login |

**Ritmo vertical (todas as telas do painel):** o `main` começa a `--space-5` do cabeçalho; `--space-5` entre o `h1` (ou o cabeçalho da página), o filtro e a grade; `--space-4` entre a linha da busca e a grade; `--space-4` entre os cards; a página termina com `--space-8`. É o ritmo de hoje (`_admin-page.scss`), sem o `padding-top` do cabeçalho fixo.

As medidas abaixo são estimativas pelo CSS e pelas capturas de hoje; a sessão C mede.

### Wireframe da moldura com Pedidos em 1440

```
┌─────────────────────────┬────────────────────────────────────────────────────────────────────────────┐
│ Smash Burger            │ ╭─────────────────────────────────╮                [🔔¹]  [☑¹]  (AU)      │ 64 px, tudo em surface;
│ title-l 500, x 28       │ │ ⌕  Buscar…                      │ 48 px, até 22rem   iconOnly 44   alvo 44 │ cabeçalho sticky, sem borda
│                         │ ╰─────────────────────────────────╯ contorno outline                       │
│   ◫ Painel              │                                                              ↕ --space-5  │
│   ⑂ Gestão de Produtos  │  Pedidos                         h1, --text-page (45/50), 500              │
│ (▣ Gestão de Pedidos   )│                                                              ↕ --space-5  │
│   ↗ Relatórios de Vendas│  Status                          label-l 500                              │
│                         │  ╭──────────────────────────╮                                             │
│  itens de 56 px,        │  │ Todos                  ⌄ │  FormGroup select, 56 px, até 16rem         │
│  margem de 12,          │  ╰──────────────────────────╯                                             │
│  vão de 4 (y 72 a 308)  │                                                              ↕ --space-5  │
│                         │  ╭ card high, canto 12, pad. 16 ─────╮ ╭ card ──────────────────────────╮  │
│                         │  │ Pedido #1             ( Pendente )│ │ Pedido #2          ( Em preparo )│  │
│                         │  │ title-m 500    M3RotuloStatus     │ │                    info          │  │
│                         │  │ Cliente          title-s          │ │ Cliente                          │  │
│                         │  │ João da Silva    body-m           │ │ Maria de Souza                   │  │
│                         │  │ Rua dos Bobos, 0 on-surface-var.  │ │ Av. Paulista, 123                │  │
│                         │  │ (11) 99999-9999  tabular          │ │ (11) 98888-8888                  │  │
│                         │  │ Itens                             │ │ Itens                            │  │
│                         │  │ 2× Smash Burger        R$ 25,90 * │ │ 1× Veggie Burger       R$ 22,90  │  │
│                         │  │ 1× Coca-Cola            R$ 8,00   │ │ 1× Suco de Abacaxi      R$ 6,00  │  │
│                         │  │ ───────────────── outline-variant │ │ ──────────────────────────────── │  │
│                         │  │ Total                  R$ 59,80   │ │ Total                  R$ 28,90  │  │
│                         │  │ (Atualizar status)  Detalhes      │ │ (Atualizar status)  Detalhes     │  │
│                         │  │  tonal sm            texto sm     │ │                                  │  │
│ ─────────────────────── │  ╰───────────────────────────────────╯ ╰──────────────────────────────────╯  │
│   ↦ Sair                │   368 px cada (3 colunas a partir de xl; a 3ª fica vazia com 2 pedidos)    │
└─────────────────────────┴────────────────────────────────────────────────────────────────────────────┘
  coluna de 240 (surface,     conteúdo de x 272 a 1408 (1136 px)
  sticky, 100dvh)
```

Legenda: `( … )` na coluna é a pílula `secondary-container` do item atual, com o rótulo em 700; `◫ ⑂ ▣ ↗ ↦` são os ícones de hoje (`tachometer-alt`, `utensils`, `shopping-cart`, `chart-line`, `sign-out-alt`); `[🔔¹]` é o botão de ícone com o selo; `(AU)` é o avatar. `*` marca o preço da linha, que é o preço unitário (pergunta 1 da §12; com a recomendação, "R$ 25,90 cada"). Com itens de 56 px, os quatro destinos vão de y 72 a 308 (cabeça de 64, 8 de recuo, 4 × 56 e 3 vãos de 4); o "Sair" fica no pé da janela.

### Wireframe da moldura com Pedidos em 390

```
┌──────────────────────────────────┐
│[☰] ╭ ⌕ Buscar…   ╮ [🔔¹][☑¹](AU) │ 64 px, sticky; busca de cerca de 166 px
│    ╰─────────────╯               │
│                       ↕ --space-5│
│ Pedidos                          │ h1, 36/40
│ Status                           │
│ ╭────────────────────────╮       │ 56 px, até 16rem
│ │ Todos                ⌄ │       │
│ ╰────────────────────────╯       │
│╭ card high, pad. 16 ────────────╮│ 358 px
││ Pedido #1          ( Pendente )││
││ Cliente                        ││
││ João da Silva                  ││
││ Rua dos Bobos, 0               ││
││ (11) 99999-9999                ││
││ Itens                          ││
││ 2× Smash Burger       R$ 25,90 ││
││ 1× Coca-Cola           R$ 8,00 ││
││ ────────────────────────────── ││
││ Total                 R$ 59,80 ││
││ (Atualizar status)  Detalhes   ││
│╰────────────────────────────────╯│
│                       ↕ --space-4│
│╭ Pedido #2 … ───────────────────╮│
│                                  │
│ ╭ aviso (toast) no pé, 16 px ──╮ │ só depois de uma ação
└──────────────────────────────────┘
```

### Wireframe da gaveta aberta em 390

```
┌──────────────────────────────────┐
│╭ gaveta, surface-container-low ─╮░│ 240 px; canto 16 no lado de dentro;
││ Smash Burger              [✕]  │░│ elevacao-1; acima do scrim (32%)
││ title-l 500          "Fechar"  │░│ cabeça de 64 px
││                                │░│
││ ◫ Painel                       │░│ itens de 56 px, como na coluna
││ ⑂ Gestão de Produtos           │░│ (o foco vai ao 1º)
││(▣ Gestão de Pedidos           )│░│ item atual: pílula, rótulo 700
││ ↗ Relatórios de Vendas         │░│
││                                │░│ ░ = scrim sobre a página;
││                                │░│ o skip link, o cabeçalho e o main
││                                │░│ ficam inert (o aviso, não)
││ ────────────────────────────── │░│
││ ↦ Sair                         │░│
│╰────────────────────────────────╯░│
└──────────────────────────────────┘
```

Fecha com Esc, com o "Fechar", com o clique no `scrim` e ao trocar de rota. Nos três primeiros, o foco volta ao "Alternar menu" depois do `nextTick` (quando o `inert` já saiu do cabeçalho); na troca de rota, vai ao `main`, também quando só a query muda (5.1). Em 390 × 844, os destinos vão de y 72 a 308, e o "Sair" fica no pé (cerca de y 772 a 828, com o divisor acima; estimativa).

### Wireframe de Produtos em 1440 (Destaques)

```
│ coluna  │  Produtos                                                          (+ Novo produto)  │
│ Gestão  │  h1                                                                filled md, 44     │
│ de Prod.│  Categoria                                                                           │
│ atual   │  ╭ Destaques            ⌄ ╮                                                          │
│         │  ╰────────────────────────╯                                                          │
│         │  ╭ card high, pad. 8 ───╮ ╭──────────────────────╮ ╭────────────────╮ ╭──────────────╮ │
│         │  │╭ M3Foto 4:3, c. 28 ─╮│ │╭────────────────────╮│ │                │ │              │ │
│         │  ││  foto do produto   ││ ││                    ││ │                │ │              │ │
│         │  │╰────────────────────╯│ │╰────────────────────╯│ │                │ │              │ │
│         │  │ Cheese Bacon         │ │ Smash Burger         │ │ Veggie Burger  │ │ Chicken Burg.│ │
│         │  │ title-m 500, h2      │ │                      │ │                │ │              │ │
│         │  │ Hambúrguer artesanal │ │ descrição, 2 linhas  │ │                │ │              │ │
│         │  │ com queijo e bacon…  │ │ body-m               │ │                │ │              │ │
│         │  │ R$ 25,99  title-m 500│ │ R$ 22,50             │ │ R$ 24,90       │ │ R$ 23,90     │ │
│         │  │ (Editar)  🗑 Excluir │ │ (Editar)  🗑 Excluir │ │ (Editar) …     │ │ (Editar) …   │ │
│         │  ╰──────────────────────╯ ╰──────────────────────╯ ╰────────────────╯ ╰──────────────╯ │
│         │   272 px cada (os 4 cards são iguais; os dois últimos aparecem recortados aqui);       │
│         │   4 colunas a partir de xl; "Editar" no início, "Excluir" no fim                       │
```

Com a busca (`?q=`), entre o filtro e a grade: "{n} produto(s) para “{q}”." (`role="status"`) e o text button "Limpar busca" ao lado.

### Wireframe de Produtos em 390, com a busca

```
┌──────────────────────────────────┐
│[☰] ╭ ⌕ bacon     ╮ [🔔¹][☑¹](AU) │
│ Produtos         (+ Novo produto)│ h1 e filled md na mesma linha
│ Categoria                        │
│ ╭ Destaques          ⌄ ╮         │
│ ╰──────────────────────╯         │
│ {n} produto(s) para “bacon”.     │ role="status", body-m
│ (Limpar busca)                   │ text button sm; na mesma linha quando cabe
│╭ card high, pad. 8 ─────────────╮│ 358 px, na horizontal abaixo de sm
││╭ foto ──╮ Cheese Bacon         ││ foto 112 × 84, canto 16
│││ 4:3    │ title-m 500, 2 linhas││
││╰────────╯ Hambúrguer artesanal ││ descrição, 2 linhas
││           com queijo e bacon…  ││
││           R$ 25,99             ││
││ (Editar)              🗑 Excluir││ fileira na largura do card
│╰────────────────────────────────╯│ cerca de 184 px de altura
│╭ Smash Burger … ────────────────╮│
```

### Wireframe do Painel em 1440 e 390

```
1440                                                                      390
│ Painel                                    h1                        │   │ Painel                        │
│ ╭ card ──────────╮ ╭ card ─────────╮ ╭ card ────────╮ ╭ card ───────╮│   │╭ card high ──────────────────╮│
│ │ Vendas totais  │ │ Total de ped. │ │ Ticket médio │ │ Mais vendido││   ││ Vendas totais  label-l 500  ││
│ │ label-l 500 h2 │ │               │ │              │ │             ││   ││ R$ 12.450,00   headline-m   ││
│ │ R$ 12.450,00   │ │ 324           │ │ R$ 38,42     │ │ 234 un.     ││   ││ Últimos 30 dias  body-m     ││
│ │ headline-m tab.│ │               │ │              │ │             ││   │╰─────────────────────────────╯│
│ │ Últimos 30 dias│ │ Pedidos real. │ │ Por pedido   │ │ Coca-Cola   ││   │ … os outros 3, empilhados     │
│ ╰────────────────╯ ╰───────────────╯ ╰──────────────╯ ╰─────────────╯│   │╭ card high (Gráfico) ────────╮│
│ ╭ card high, pad. 24 (section "Gráfico de vendas") ────────────────╮│   ││        EmptyState          ││
│ │              EmptyState (etapa 10): ícone chart-line,           ││   ││ Gráfico de vendas          ││
│ │      "Gráfico de vendas indisponível nesta versão"              ││   ││ indisponível nesta versão  ││
│ │      "Os números acima trazem o resumo dos últimos 30 dias."    ││   │╰─────────────────────────────╯│
│ ╰─────────────────────────────────────────────────────────────────╯│
  KPIs de 272 px (4 colunas a partir de xl)                               1 coluna abaixo de sm; 2 de sm a xl
```

### Wireframe dos Relatórios em 1440 e 390

```
1440                                                                      390
│ Relatórios                                                         │   │ Relatórios                    │
│ ╭ card ─────────────────╮ ╭ card ────────────────╮ ╭ card ─────────╮│   │╭ Vendas totais … ────────────╮│
│ │ Vendas totais          │ │ Total de pedidos     │ │ Ticket médio  ││   │╭ Total de pedidos … ─────────╮│
│ │ R$ 12.450,00           │ │ 324                  │ │ R$ 38,42      ││   │╭ Ticket médio … ─────────────╮│
│ │ Últimos 30 dias        │ │ Pedidos realizados   │ │ Por pedido    ││   │╭ Produtos mais vendidos ─────╮│
│ ╰────────────────────────╯ ╰──────────────────────╯ ╰───────────────╯│   ││ 1. Coca-Cola        234 un. ││
│ ╭ Produtos mais vendidos (até 40rem) ─────────╮                      │   ││ 2. Smash Burger     156 un. ││
│ │ 1.  Coca-Cola                     234 un.   │  ol; marcador e      │   ││ 3. Double Smash      98 un. ││
│ │ ─────────────────────────────────────────── │  quantidade          │   ││ 4. Chicken Burger    87 un. ││
│ │ 2.  Smash Burger                  156 un.   │  tabulares           │   │╰─────────────────────────────╯│
│ │ 3.  Double Smash                   98 un.   │                      │
│ │ 4.  Chicken Burger                 87 un.   │                      │
│ ╰─────────────────────────────────────────────╯                      │
  KPIs em 3 colunas a partir de md (368 px em 1440)
```

### Wireframe de Meu perfil e de Configurações em 1440 (390: os mesmos cards, na largura toda)

```
│ Meu perfil                                      │ │ Configurações                                     │
│ ╭ card high, até 40rem, pad. 16 ─────────────╮  │ │ ╭ card high, até 40rem ─────────────────────────╮ │
│ │ Administrador                 title-m 500  │  │ │ │ Dados do painel                               │ │
│ │ Nome            E-mail        Função       │  │ │ │ Os produtos criados, editados ou excluídos e  │ │
│ │ Admin User      admin@        Administrador│  │
│ │                 example.com   (quebra; sem │  │
│ │                               reticências) │  │ │ │ o status dos pedidos ficam salvos neste       │ │
│ │ dt body-m var.  dd body-l on-surface       │  │ │ │ navegador. Restaurar volta aos dados          │ │
│ │ Os dados do administrador ficam neste      │  │ │ │ publicados com o site.     body-m             │ │
│ │ navegador. Para trocar o nome, o e-mail …  │  │ │ │ (↺ Restaurar cardápio original)               │ │
│ │ (↦ Sair)   tonal md                        │  │ │ │ (↺ Restaurar pedidos de exemplo)  tonais md   │ │
│ ╰────────────────────────────────────────────╯  │ │ ╰───────────────────────────────────────────────╯ │

Diálogo de Configurações (BaseDialog, etapa 10; até 480 px; sheet em 390):
┌──────────── Restaurar o cardápio original?  [✕] ─┐
│ Os produtos criados no painel saem, e os editados│
│ ou excluídos voltam como eram. Não é possível    │
│ desfazer.                                        │
│                       (Cancelar) (↺ Restaurar)   │  o seguro antes, o destrutivo (danger) no fim
└──────────────────────────────────────────────────┘
```

Em 390, a `dl` do perfil fica numa coluna, e os dois "Restaurar…" quebram um por linha (`flex-wrap`).

### Wireframe do `ModalProducts` em 1440 e 390, com erro na imagem

```
1440: BaseDialog centrado, até 560 px                       390: sheet (etapa 10)
┌──── Novo produto ───────────────────────── [✕] ─┐         ┌──── Novo produto ─────────── [✕] ┐
│ Categoria                                       │         │ Categoria                        │
│ ╭ Hambúrguer                                 ⌄ ╮│         │ ╭ Hambúrguer                  ⌄ ╮│
│ Nome do produto                                 │         │ Nome do produto                  │
│ ╭ Informe o nome                               ╮│         │ ╭ Informe o nome                ╮│
│ Preço                    Quantidade             │         │ Preço                            │
│ ╭ Ex.: 25,90          ╮  ╭ Opcional            ╮│         │ ╭ Ex.: 25,90                    ╮│
│   lado a lado a partir de sm, align-items: start│         │ Quantidade                       │
│ Descrição                                       │         │ ╭ Opcional                      ╮│
│ ╭ Descrição do produto                         ╮│         │ Descrição …                      │
│ Imagem                   rótulo em error        │         │ Imagem                           │
│ ╭ contorno error, 56 px, canto 12 ─────────────╮│         │ ╭─────────────────────────────╮  │
│ │ (Escolher imagem)  Nenhuma imagem escolhida  ││         │ │ (Escolher imagem)            │ │
│ ╰──────────────────────────────────────────────╯│         │ │ Nenhuma imagem escolhida     │ │
│   ● Escolha uma imagem para o produto.          │         │ ╰─────────────────────────────╯  │
│     body-m error, recuo 16 (no lugar da ajuda)  │         │   ● Escolha uma imagem para o    │
├─────────────────────────────────────────────────┤         │     produto.                     │
│                          (Cancelar) (Salvar)    │         ├──────────────────────────────────┤
└─────────────────────────────────────────────────┘         │          (Cancelar) (Salvar)     │
                                                            └──────────────────────────────────┘
```

Sem erro, no lugar da mensagem: "PNG, JPEG ou WebP, com até 300 kB." (`IMAGE_HELP`), em `on-surface-variant`, com o mesmo recuo.

### Wireframe dos Detalhes do pedido em 1440 (390: sheet, uma coluna)

```
┌──── Pedido #1 ───────────────────────────── [✕] ─┐  BaseDialog, até 520 px
│ Status                 Cliente                   │  dl em 2 colunas a partir de sm
│ ( Pendente )           João da Silva             │  dt body-m on-surface-variant
│ Endereço               Telefone                  │  dd body-l on-surface
│ Rua dos Bobos, 0       (11) 99999-9999           │
│ Itens                  title-s (h3)              │
│ 2× Smash Burger      R$ 25,90 cada    R$ 51,80   │  nome │ unitário │ total da linha
│ 1× Coca-Cola          R$ 8,00 cada     R$ 8,00   │  (em 390: o unitário desce)
│ ──────────────────────────────────────────────── │
│ Total                                 R$ 59,80   │  title-m 500, tabular
├──────────────────────────────────────────────────┤
│                                        (Fechar)  │  tonal md
└──────────────────────────────────────────────────┘
```

### Wireframe do menu do perfil aberto (recorte em 1440 e em 390)

```
1440 (canto superior direito)                     390
             [🔔¹]  [☑¹]  (AU)                    [☰] ╭ ⌕ Busc… ╮ [🔔¹][☑¹](AU)
              ╭ menu, surface-container ──╮         ╭ menu, até a largura útil ──╮
              │ Admin User   title-s       │         │ Admin User                 │
              │ ────────────────────────── │         │ ─────────────────────────  │
              │ (👤 Meu perfil           ) │ foco    │ 👤 Meu perfil              │
              │  ⚙ Configurações           │         │ ⚙ Configurações            │
              │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │         │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─    │
              │  ↦ Sair                    │         │ ↦ Sair                     │
              ╰────────────────────────────╯         ╰────────────────────────────╯
              canto 16; itens de 44 px;              alinhado ao fim do avatar
              elevacao-2; mín. 13rem;
              a linha antes do "Sair" é CSS (::after), sem filho no DOM
```

### Wireframe do login do admin com erro em 1440 e 390

```
1440                                                          390
░░░░░░░░░ ilustração de giz + scrim 32% ░░░░░░░░░░░░░░░░       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░╭ painel low, canto 28, pad. 32, 440 px ╮░░░░░░       ░╭ painel, margem de 16 ────────╮░
░░░░░░░░│ Painel                                │░░░░░░       ░│ Painel                        │░
░░░░░░░░│ administrativo      h1, 2 linhas      │░░░░░░       ░│ administrativo                │░
░░░░░░░░│ E-mail                                │░░░░░░       ░│ E-mail  ╭────────────────╮    │░
░░░░░░░░│ ╭───────────────────────────────────╮ │░░░░░░       ░│ Senha   ╭──────────── 👁 ╮    │░
░░░░░░░░│ Senha                                 │░░░░░░       ░│╭ error-container, c. 16 ─────╮│░
░░░░░░░░│ ╭─────────────────────────────── 👁 ╮ │░░░░░░       ░││ ● E-mail ou senha            ││░
░░░░░░░░│ ╭ error-container, canto 16 ──────────╮│░░░░░░       ░││   incorretos.                ││░
░░░░░░░░│ │ ● E-mail ou senha incorretos.       ││░░░░░░       ░│╰──────────────────────────────╯│░
░░░░░░░░│ ╰─────────────────────────────────────╯│░░░░░░       ░│(            Entrar           )│░
░░░░░░░░│ (              Entrar               ) │░░░░░░       ░│ Voltar à loja   text button   │░
░░░░░░░░│ Voltar à loja      text button, 44 px │░░░░░░       ░╰───────────────────────────────╯░
░░░░░░░░╰───────────────────────────────────────╯░░░░░░       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

No `yarn dev`, entre o formulário e o "Voltar à loja": a linha tracejada em `outline-variant`, "Desenvolvimento: o admin de teste entra sem cadastro." e o tonal `sm` "Usar admin de teste".

### As telas em 1024 (o limite `lg`)

- **Moldura:** a coluna fixa de 240 px aparece; o "Alternar menu" some; o cabeçalho vai de x 240 a 1024, com a busca de 352 px a partir de x 272; o conteúdo vai de x 272 a 992 (720 px).
- **Pedidos:** 2 colunas de 352 px. **Produtos:** 3 colunas de cerca de 229 px (foto de 213 × 160; a fileira "Editar" … "Excluir" de cerca de 184 px cabe). **Painel:** KPIs em 2 × 2 de 352 px. **Relatórios:** 3 KPIs de cerca de 229 px; o valor "R$ 12.450,00" em headline-m tem cerca de 165 px (estimativa) e cabe nos 197 úteis. **Perfil e Configurações:** os cards de 40rem (640 px).
- **Aviso (toast):** no pé, à direita, de x 576 a 992.
- **De `md` a `lg` (768 a 1023):** sem coluna; o cabeçalho com o "Alternar menu" e a gaveta; Pedidos em 2 colunas, Produtos em 3, KPIs em 2.

---

## 4. Navegação

### 4.1 A forma por largura (decisão a)

**O que a pesquisa diz (seção "Etapa 9"):** a gaveta está em descontinuação no Expressive, e o rail expandido a substitui, com quase a mesma função [161] [170] [186]. A escolha recomendada do Compose dá a navigation bar curta na janela compacta e o rail largo recolhido no resto, sem nunca dar o rail expandido [187]; as demos do rail largo mandam usar a navigation bar em qualquer dimensão compacta [179]; o exemplo próprio do `NavigationSuiteScaffold` põe o rail recolhido nas larguras compacta e média e o expandido na expandida [188]; a página do rail sugere o expandido modal com mais de quatro destinos [169]. As fontes divergem na janela compacta ("Riscos da etapa 9").

| Forma | Largura | Prós | Contras | Fica? |
|---|---|---|---|---|
| Coluna fixa com rótulos (gaveta standard [164]; rail expandido [174]) | 240 px (`--m3-navegacao-largura`): o mínimo da folha da gaveta [165] e dentro dos 220 a 360 do rail expandido [174] | Rótulos ao lado do ícone, numa linha ([182], [26]); "Relatórios de Vendas" cabe (estimativa abaixo); o comportamento de hoje (`SPEC.md` §5.11) | Ocupa 240 px; a partir de 1024, sobram 720 | **Sim, a partir de `lg`** |
| Rail recolhido | 96 px [173] | Pouco espaço | Rótulos de até 20 caracteres em label-m quebram [175]; o modo AUTO esconde rótulos com 4 itens [170] | Não |
| Gaveta modal | 240 px, sobre o `scrim` | Fechada por padrão; o fluxo de hoje; §13.8 ("a gaveta fechada em 390"); sobretudo para celular ([160], [161]) | Em descontinuação no MDC [161] | **Sim, abaixo de `lg`** |
| Rail expandido modal dispensável (`hideOnCollapse`) | 220 a 360 [174] | O substituto Expressive da gaveta modal [180] | Descrito para tablet e desktop ([169], [180]); a diferença visual para a gaveta é pequena (abaixo) | Fica a anatomia da gaveta |
| Navigation bar embaixo | Largura toda | 3 a 5 destinos [61]; a escolha recomendada no compacto ([187], [179]) | Muda o fluxo da gaveta (`SPEC.md`; §13.8); o "Sair" fica sem lugar; repetiria a pílula de baixo da loja; pede reserva no pé (2.4.11 [76]) | Não |

**Decisão:** uma lista só, com dois contêineres.

- **A partir de `lg`:** a coluna fixa em `surface`, sem canto, sem sombra e sem borda. A gaveta standard e o rail expandido standard têm o mesmo contêiner (Surface, Level0 [164]; Surface, `CornerNone`, Level0 [174], [181]): as duas fontes dão o mesmo desenho.
- **Abaixo de `lg`:** a gaveta modal, com a anatomia da `ModalDrawerSheet` ([164], [165]), e não a do rail largo modal (SurfaceContainer, Level2, `CornerLarge` [174]). **Motivo:** a da gaveta está documentada em detalhe (tokens e código), e a diferença é pequena sobre o `scrim`; nada disso existe pronto para a web ([190] a [193]).
- **O corte fica em 1024 (`lg`), e não em 840:** a classe expandida começa em 840 dp [189], e a pesquisa registra que manter 1024 é decisão do projeto. Os breakpoints não mudam (SPEC-M §2.9), e o `AdminLayout` já usa `lg` (`DESKTOP_QUERY`).
- **Uma altura de item nos dois contêineres: 56 px,** o indicador da gaveta [164] e do rail expandido [176]. É desvio da SPEC-M §5.11, que dizia 44 sem fonte (os dossiês não cobriam a navegação); a decisão é da sessão principal (volta 1). As classes de largura valem pela janela, e não pelo aparelho [189]: a altura não muda com o tipo de entrada.
- **Largura é token:** `--m3-navegacao-largura: 15rem` (hoje `240px` escrito direto em `_admin-layout.scss` e em `_sidebar-admin.scss`). A mesma largura nos dois contêineres; na gaveta, com `max-width: 85vw` (hoje), sobra área do `scrim` para tocar e fechar em 320 px.
- **"Relatórios de Vendas" numa linha em 240 (estimativa):** o rótulo em label-l 500 tem cerca de 138 px; com o recuo de 16, o ícone de 20, o vão de 8 e o recuo de 24 no fim ([165], [176]), o item tem cerca de 206 px; com a margem de 12 dos dois lados ([165], [168]), 230 dos 240. Com zoom, o rótulo quebra, e o item cresce (`min-height`). A sessão C mede; se não couber, o token vai a 16rem, dentro dos 220 a 360 [174].

### 4.2 A gaveta (decisão c; o detalhe em 5.1)

- **Abre** pelo "Alternar menu"; o foco vai ao primeiro link (hoje).
- **Fecha** com Esc, com o "Fechar", com o clique no `scrim` e ao trocar de rota (hoje).
- **Modal de fato (novo):** o skip link, o cabeçalho e o `main` ganham `inert` enquanto ela está aberta abaixo de `lg`. O APG pede o que está fora do modal inerte e escurecido [199]; com o `inert`, o Tab e o leitor de tela ficam na gaveta e na interface do navegador, como no `<dialog>` modal [200]. **O contêiner deixa de ser `aside` (decisão da sessão principal, volta 1):** vira `div#admin-sidebar`, e, só abaixo de `lg`, recebe `role="dialog"`, `aria-modal="true"` e `aria-label="Menu do painel"` (o papel, o estado e o nome que o APG pede [199]; o `aria-modal` vale porque o resto está bloqueado de fato). A partir de `lg`, o `div` fica sem papel e sem nome, e o landmark é a `nav` "Seções do painel", que passa a envolver a coluna inteira (a marca, os destinos e o "Sair"), para nada da coluna ficar fora de um landmark [210]. A pesquisa não achou fonte do W3C que decida entre diálogo e disclosure para a gaveta [199] [203]; a decisão é do projeto: a gaveta encobre a página com o `scrim`, e um foco atrás dela ficaria sob o fundo escuro.
- **A exceção do `inert`: a região dos avisos.** O `AppToast` fica no `App.vue`, fora do `AdminLayout` e do conjunto `inert`. Fica de fora de propósito (aceito pela sessão principal): com `inert`, a região viva sairia da árvore de acessibilidade, e um aviso dado com a gaveta aberta não seria anunciado. O custo é o botão "Fechar aviso" alcançável pelo Tab com a gaveta aberta, se houver aviso na tela.
- **A volta do foco (corrigida na volta 1):** o `focus()` num elemento ainda `inert` não faz nada (o revisor testou no Chromium). Ao fechar com `returnFocus` (Esc, "Fechar" e clique no fundo), a ordem é: `isSidebarOpen = false` (e o `unlock()`), depois `await nextTick()` (o Vue tira o `inert` do cabeçalho no flush) e só então `toggleButton?.focus()`. Hoje o Esc e o "Fechar" devolvem o foco ao botão (sem `inert`); o clique no `scrim` passa a devolver também. A F85 reprova o foco que não volta ao gatilho [202]; o exemplo do Compose devolve o foco ao botão [167]. **O jsdom não pega a falha** (não implementa o `inert`): a prova é no Chromium (seção 9).
- **Troca de rota:** o foco vai ao `main`, o destino mais lógico que o APG aceita [199]. Pelo `afterEach` do router quando o caminho muda (hoje); **quando só a query muda** (por exemplo, "Gestão de Pedidos" em `/admin/orders?status=pending`), o `afterEach` sai cedo (`to.path === from.path`) e o foco cairia no `body`. Por isso, no `watch` da rota do `AdminLayout`: se o foco estava dentro da gaveta quando ela fechou, depois do `nextTick` ele vai ao `main` (`mainRef.value?.focus({ preventScroll: true })`).

### 4.3 O item atual por rota (decisões b e r; §13.8)

| Rota | Item com `aria-current="page"` | Por quê |
|---|---|---|
| `/admin` | "Painel" | Correspondência exata (hoje) |
| `/admin/products` (com ou sem `?q=`) | "Gestão de Produtos" | O `RouterLink` compara a rota e os parâmetros, e não a query (conferido no `useLink` do vue-router instalado) |
| `/admin/orders` (com ou sem `?status=` e `?q=`) | "Gestão de Pedidos" | Idem |
| `/admin/reports` | "Relatórios de Vendas" | Idem |
| `/admin/profile` | nenhum | A rota vem do menu do avatar; o `h1` "Meu perfil" e o título da aba dizem onde se está, como o `/register` na loja (desenho da Conta, §4) |
| `/admin/settings` | nenhum | Idem |

- **"Um item ativo por rota" (§13.8): decisão da sessão principal (volta 1).** A §13.8 se lê como "nunca dois itens ativos" (o `SPEC.md` §5.11 diz "para nunca haver dois itens ativos"). Em Meu perfil e Configurações, que não estão na navegação, nenhum item fica ativo: o `aria-current` só marca a página que está no conjunto [207]. O `check-admin.mjs` confere um nas quatro primeiras rotas e nenhum nas duas do menu.
- **Achado (atalhos):** pelo mesmo motivo da query, em `/admin/orders` os dois atalhos do cabeçalho ("Notificações" e "Tarefas", links para `/admin/orders?status=…`) também recebem `aria-current="page"` do `RouterLink` hoje; em `?status=preparing`, o "Notificações" (`?status=pending`) também sai marcado (o revisor conferiu no vue-router 4.6.4: o `isExactActive` não olha a query). Os atalhos passam `aria-current="false"` pelo `BaseButton` ("false" é valor válido [207]); o revisor conferiu que o atributo repassado vence o do `RouterLink`. **Alternativa:** a prop `aria-current-value="false"` do `RouterLink`, se o `BaseButton` a repassar. Aceito pela sessão principal. O item atual é um só, o da coluna.

### 4.4 O cabeçalho (decisão d; o detalhe em 5.1)

- `surface`, 64 px (`--navbar-h`; 64 dp [195]), sem borda e sem mudar ao rolar, como o cabeçalho da loja (SPEC-M §4.1; [H17]). O M3 troca a cor ao rolar ([196], [197]), o que pediria script de rolagem ou animar cor; fica de fora.
- **Grudado (`sticky`) em todas as larguras,** e não só a partir de `lg` como na loja: no painel, a busca, os atalhos, o avatar e o "Alternar menu" moram nele; na loja, a navegação mora na pílula de baixo. Hoje ele é `fixed` com `padding-top` no `main`; passa a `sticky`, no fluxo.
- **"Alternar menu" só abaixo de `lg`:** a partir de `lg`, ele já fica com `display: none` (fora do Tab e da árvore de acessibilidade), e o `toggleSidebar` o ignora. Recolher a coluna seria função nova.

### 4.5 Ordem do Tab

- **A partir de `lg`:** skip link → busca → "Notificações" → "Tarefas" → avatar → "Painel", "Gestão de Produtos", "Gestão de Pedidos", "Relatórios de Vendas" → "Sair" → `main`. É a ordem do DOM de hoje, que segue a leitura da faixa de cima (a marca não recebe foco) e depois a coluna.
- **Abaixo de `lg`:** skip link → "Alternar menu" → busca → "Notificações" → "Tarefas" → avatar → `main`. Com a gaveta aberta: o foco começa em "Painel"; Tab e Shift+Tab andam entre "Fechar", os quatro links e "Sair" (o skip link, o cabeçalho e o `main` estão `inert`); a exceção é a região dos avisos, fora do `inert` (4.2): com um aviso na tela, o "Fechar aviso" também entra no Tab.
- **Menu do avatar aberto:** as setas andam entre os itens; Tab fecha o menu (hoje).

### 4.6 Foco não coberto (2.4.11 [76]; decisão s)

- **O cabeçalho grudado:** o `scroll-padding-top` global (`calc(var(--navbar-h) + var(--space-4))`, `_reset.scss`) já cobre os 64 px em todas as larguras. Com Shift+Tab, o elemento focado para 16 px abaixo do cabeçalho.
- **A gaveta:** é modal (4.2): o foco não sai dela, e nada da página fica focável debaixo do `scrim`.
- **O aviso (toast) no pé (decisão desta etapa; 5.3):**
  - **por que no pé:** no topo, a partir de `md`, o aviso fica a `calc(var(--navbar-h) + var(--space-3))` do topo, alinhado à direita (`_app-toast.scss`); em 1024 ele vai de x 576 a 992, e o "Novo produto" (de cerca de 856 a 992, a cerca de 90 px do topo) fica inteiro sob ele depois de criar um produto pelo teclado, quando o foco volta ao botão. Com a página no topo, não há como rolar o botão para baixo do aviso. Em 1440, o aviso (x 872 a 1288) cobre só a ponta do botão (x 1270 a 1408);
  - **a regra que move o aviso (volta 1):** em `layouts/_admin-layout.scss`, `:global(html:has(.admin-layout) .toast-region) { top: auto; bottom: calc(var(--space-4) + env(safe-area-inset-bottom)); }`, em todas as larguras, sem mexer no `right` e na `width` da parcial do aviso. **Especificidade:** a regra do `.toast-region` com escopo, a partir de `md`, é uma classe mais o atributo do escopo (0,2,0); a do painel é `html` (0,0,1), o `:has(.admin-layout)` (0,1,0) e a classe (0,1,0): 0,2,1, e vence sem `!important`. **Dois registros:** a entrada do aviso continua com o `translateY(-8px)` de hoje (ele desce de cima também no pé) até a etapa 10; e mover o aviso por fora da parcial dele é novo (o precedente do carrinho e do perfil só mexe no `scroll-padding`). A etapa 10 herda ou absorve a regra;
  - **a reserva:** enquanto há aviso, `html:has(.admin-layout):has(.toast-region .toast)` soma `calc(var(--m3-toast-reserva) + var(--space-4))` (120 px) ao `scroll-padding-bottom`, em todas as larguras: o aviso de uma linha tem 60 px, e o de três, cerca de 92, a 16 px do pé (C43 [76]; a regra da etapa 7). Sem aviso, o painel zera o `--m3-barra-reserva` da loja abaixo de `lg` (não há toolbar no painel);
  - **o "Atualizar status":** o foco fica no botão depois do aviso, e o `scroll-padding` sozinho não rola nada. A `OrderManagement` faz `await nextTick()` e `document.activeElement?.scrollIntoView?.({ block: "nearest" })` depois do `toast.show`, **só quando a última entrada foi de teclado** (o precedente do `CartView`, etapa 7, e do `ProfileView`, etapa 8). Em 390, com o card de baixo encostado no pé, o botão sobe para cima do aviso;
  - **os diálogos (editar, criar, excluir, restaurar):** ao fechar, o `BaseDialog` devolve o foco a quem abriu com `focus()`, que respeita o `scroll-padding` (o Chromium centraliza na área útil o elemento inteiro dentro da reserva; construção da etapa 7). Se o aviso nascer depois do `focus()`, a reserva não vale para ele: a sessão C mede no `keyboard.mjs` e, se o botão ficar coberto, usa a mesma rolagem só pelo teclado na view (seção 9);
  - **o custo:** pelo mouse, com aviso na tela, o `focus()` de volta ao botão de um card no pé pode rolar a página uns 120 px (a lição do carrinho em `xl`, desenho do Carrinho, §13). Aceito: só acontece com o botão nos 120 px de baixo da janela.

---

## 5. Blocos

### 5.1 Moldura: layout, cabeçalho, coluna e gaveta (decisões a, b, c, d)

- **Arquivos e raiz:** `src/layouts/AdminLayout.vue` (`div.admin-layout`) e `layouts/_admin-layout.scss`; `src/components/admin/layout/SidebarAdmin.vue` (`div#admin-sidebar.admin-sidebar`, que era `aside`) e `components/admin/_sidebar-admin.scss`; `TheNavbarAdmin.vue` (`nav.navbar-admin`) e `components/admin/_navbar-admin.scss`.
- **Objetivo:** chegar a qualquer seção e às ferramentas em um toque, saber sempre onde se está, e deixar a largura para o trabalho.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Marca | "Smash Burger" (`SidebarAdmin.vue`, `p.admin-sidebar__brand`); sai o `text-transform: uppercase` |
| Destinos | `menuItems` do `SidebarAdmin.vue`: "Painel" (`tachometer-alt`), "Gestão de Produtos" (`utensils`), "Gestão de Pedidos" (`shopping-cart`), "Relatórios de Vendas" (`chart-line`) |
| "Sair" | `button` com `sign-out-alt`, `useAdminLogout()` |
| "Fechar" | `BaseButton variant="ghost" icon-only icon-start="xmark" label="Fechar"`, só com `closable` |
| "Alternar menu" | `BaseButton variant="ghost" icon-only icon-start="bars"`, `aria-controls="admin-sidebar"`, `aria-expanded` |
| Nomes | `nav aria-label="Seções do painel"` e `nav aria-label="Ferramentas do painel"` (hoje); "Menu do painel" passa do `aria-label` do `aside` ao do diálogo, só abaixo de `lg` |

**Estrutura da coluna (muda na volta 1; decisão da sessão principal: o `aside` vira `div`):**

- `div#admin-sidebar.admin-sidebar(.is-drawer)` → `nav.admin-sidebar__nav[aria-label="Seções do painel"]` (o `ref` do `focusFirst`, hoje) → `div.admin-sidebar__head` (a marca e, na gaveta, o "Fechar") → `div.admin-sidebar__lista` (os quatro `RouterLink`) → `div.admin-sidebar__footer` (o "Sair").
- **Abaixo de `lg` (`closable`):** o `div` recebe `role="dialog"`, `aria-modal="true"` e `aria-label="Menu do painel"` (por `v-bind` condicional); a partir de `lg`, nenhum dos três (um `div` sem papel não leva nome).
- **Por que a `nav` envolve a coluna inteira:** sem o `aside`, a marca e o "Sair" ficariam fora de qualquer landmark a partir de `lg`, e o APG pede todo o conteúdo dentro de algum [210]. Quem entra na `nav` ouve a marca, os destinos e o "Sair"; o "Fechar" só existe na gaveta, que já é o diálogo. O `focusFirst` de hoje (`querySelector("a")`) continua achando "Painel": a marca é `p`, e o "Fechar", `button`.

**Layout (`_admin-layout.scss`):**

- `div.admin-layout`: `min-height: 100dvh`, fundo `--m3-surface` (sai o `--color-surface-sunken`).
- **Abaixo de `lg`:** bloco; `header.admin-header` `position: sticky; top: 0; z-index: var(--z-navbar); height: var(--navbar-h); background: var(--m3-surface)`; o `main` no fluxo.
- **A partir de `lg`:** `display: grid; grid-template-columns: var(--m3-navegacao-largura) minmax(0, 1fr); grid-template-rows: auto 1fr`. O `div#admin-sidebar` na coluna 1, linhas 1 a −1, `position: sticky; top: 0; height: 100dvh; overflow-y: auto`; o cabeçalho na coluna 2, linha 1, grudado; o `main` na coluna 2, linha 2. Saem o `left: 240px` do cabeçalho e o `margin-left: 240px` do `main`.
- `main.admin-main`: `padding: var(--space-5) var(--gutter) var(--space-8)`; `max-width: calc(var(--container-max) + 2 * var(--gutter))`; `min-width: 0`; texto base em body-m (`tipo(body-m)` com o tracking do papel): a densidade do `SPEC.md` §5.11 ("texto de tabelas e cards `--text-sm`"), que já é o de hoje.

**Cabeçalho (`_navbar-admin.scss`):**

- `nav.navbar-admin`: flex, `align-items: center`, `gap: var(--space-2)`, altura toda; `padding-inline: var(--space-2) var(--gutter)` abaixo de `lg` (o ☰ fica a 8 px da borda) e `var(--gutter)` a partir dele (a busca alinha com o `h1`, em x 272 em 1440).
- Esquerda: "Alternar menu" e a busca (`flex: 1`). Direita: os atalhos e o avatar, `gap: var(--space-1)` (os botões de ícone ficam encostados no M3 [196]; 4 px separam os alvos de 44).
- **Botões de ícone até a etapa 10:** o "Alternar menu", o "Fechar" e os dois atalhos continuam com o `BaseButton iconOnly` de hoje (o ghost da Brasa, `.btn--legado`: 44 × 44, transparente em repouso, canto 8 e camada no hover). **Por quê:** a etapa 10 desenha o `iconOnly` de uma vez (o "Fechar" do diálogo e do aviso, o stepper, o painel); uma peça própria da moldura agora seria um segundo botão de ícone para ela fundir. Em repouso, o ghost é só o ícone, e a moldura já se lê M3; a forma da Brasa aparece só no hover e no pressionado, como no "Remover" do carrinho e no "Excluir conta" (etapas 7 e 8). Os ícones ficam em `on-surface-variant` (8,86 sobre a `surface`), a cor das ações da top app bar [196]; o ícone de navegação seria `on-surface` [196], mas pintar o ghost por fora pediria uma regra sobre a raiz do `BaseButton` que a etapa 10 desfaria (desenho da Conta, 5.7).
- **Os atalhos são ações da barra, não navegação principal:** a top app bar põe ações como botões de ícone no fim [194], com descrição para o leitor de tela [197]. Os rótulos de texto da navegação, que a direção não deixa tirar [26], ficam na coluna.

**Coluna e gaveta (`_sidebar-admin.scss`):**

| Peça | A partir de `lg` (coluna fixa) | Abaixo de `lg` (gaveta, `.is-drawer`) | Fonte |
|---|---|---|---|
| Contêiner | `--m3-surface`, sem canto, sem sombra, sem borda | `--m3-surface-container-low`; cantos de 16 (`--m3-forma-l`) só no lado de dentro (`border-start-end-radius` e `border-end-end-radius`); `--m3-elevacao-1`; `reserva-de-sombra` | [164], [174], [181]; [164], [161] |
| Posição | `sticky`, altura da janela | `position: fixed; inset-block: 0; inset-inline-start: 0`; `z-index: var(--z-sidebar)`, acima do `scrim` (`--z-overlay`) e do cabeçalho (`--z-navbar`) | hoje |
| Largura | `--m3-navegacao-largura` | a mesma, com `max-width: 85vw` | [165], [174] |
| Cabeça | 64 px (`--navbar-h`), na faixa do cabeçalho; a marca em title-l 500, `on-surface`, a `calc(var(--space-3) + var(--space-4))` da borda (28 px, alinhada aos ícones dos itens) | a mesma, com o "Fechar" no fim, a 8 px da borda | [179], [184] |
| Lista | `div.admin-sidebar__lista`: `padding-block: var(--space-2)`; itens com `gap: var(--space-1)`; `flex: 1` (empurra o pé para baixo) | igual | [173] |
| Item | 56 px (`min-height: 3.5rem`) | 56 px | [164], [176]; desvio da SPEC-M §5.11 (44) |
| Pé | divisor de 1 px `--m3-outline-variant` (decorativo), recuado 12 px dos lados; "Sair" com a anatomia do item, a `--space-2` do pé | igual | [160] (divisor entre seções) |

- **Sem divisor sob a cabeça** (hoje há): a lista começa logo abaixo da marca, como no exemplo da gaveta [160].
- **Uma altura só (volta 1):** 56 px na coluna e na gaveta, o indicador da gaveta [164] e do rail expandido [176]. A SPEC-M §5.11 dizia 44 sem fonte (os dossiês não cobriam a navegação): é o quarto desvio da §5.11, aceito pela sessão principal. Sai o motivo "toque na gaveta, ponteiro na coluna": as classes de largura valem pela janela, e não pelo aparelho [189].
- **Contas com 56 (estimativas):** na coluna e na gaveta, a cabeça de 64 e o recuo de 8 põem os destinos de y 72 a 308 (4 × 56 e 3 vãos de 4); o pé (divisor, 8 e o "Sair" de 56) ocupa cerca de 73 px no fim. Com 900 de altura (1440 × 900), sobram cerca de 520 px entre a lista e o pé; com 768 (1024 × 768) e 844 (390 × 844), 380 e cerca de 460. A coluna só rola por dentro abaixo de cerca de 400 px de altura.

**O item da navegação (decisão b):**

- `RouterLink.admin-sidebar__item` (e o `button` do "Sair"): flex, `align-items: center`, `gap: var(--space-2)` (8 [176]), `margin-inline: var(--space-3)` (12 [165], [168]), `padding-inline: var(--space-4) var(--space-5)` (16 e 24 [165]), canto `--m3-forma-full` [164], `min-height` pela tabela acima.
- **Ícone:** 20 px (`font-size: 1.25rem`, caixa de largura fixa para alinhar), `aria-hidden`. O M3 usa 24 dp [164]; aqui 20, o tamanho dos ícones de apoio do sistema (a seta do `select`, o aviso, a pílula de `md` a `lg`), porque o ícone é do Font Awesome (decisão c), como no `FormGroup` (desenho da Conta, 5.1).
- **Rótulo:** label-l 500 (14/20, tracking do papel) [164], `white-space: normal`.
- **Inativo:** `on-surface-variant` (8,86 na coluna; 8,41 na gaveta) [164], [178].
- **Atual (`[aria-current="page"]`):** fundo `--m3-secondary-container`, ícone e rótulo `--m3-on-secondary-container` (7,22), **rótulo em 700**. O indicador e as cores são os da gaveta e do rail ([164], [161], [178]); o rótulo em `on-secondary-container` é o da gaveta ([164], [161]); o rail usa `Secondary` [178], e fica o da gaveta e da pílula da loja.
  - **Por que o 700 (refeito na volta 1):** o indicador contra a coluna dá 1,23 (1,16 na gaveta; medidos), e a cor do rótulo quase não muda (cerca de 1,05, medida do revisor). A troca de fundo dentro do componente fica fora da 1.4.11 e, sozinha, não passa na 1.4.1 ([98], [99]). A 1.4.1 pede informação além da cor, "such as shape or text" [99]; a G182, técnica suficiente dela, lista o negrito entre as pistas visuais além da cor e pede a informação também por programa (1.3.1) [215]. **É inferência:** a G182 foi escrita para **texto** colorido, e aqui a cor está no **fundo**; o dossiê não tem técnica nem falha da W3C sobre o item atual de uma navegação marcado só pelo fundo (pesquisa, "Achado da sessão principal"). A informação por programa é o `aria-current="page"` [207]. O desenho do item (o negrito no ativo) vem do padrão da gaveta do MDC [161], que não é fonte da WCAG; a ênfase do sistema vem "dos pares de cor e do peso" (SPEC-M §0). A medida do revisor: "Relatórios de Vendas" tem 134,6 px em 500 e 135,3 em 700, sem pulo de layout.
  - **A pílula sai da barra de 3 px da Brasa** e do `primary-container` (o par "item selecionado", 13,24, sai do `contraste.js`).
- **Hover e pressionado:** a camada de estado (`camada-de-estado`: `currentColor` a 8% e 10% [12]). O M3 escurece o rótulo inativo para `on-surface` no hover [164]; fica só a camada, como na pílula da loja.
- **Foco:** anel interno (`anel-interno`, SPEC-M §6): com 4 px entre os itens, o anel de fora (2 + 3 px) invadiria o vizinho. Com 56 px, o anel interno contorna o item de 56 por dentro e não muda a conta. Pares: 6,14 na coluna e 5,83 na gaveta; 4,99 no item atual; pressionado, 5,03 e 4,78 (medidos).
- **"Sair":** a mesma anatomia (56 px), sem estado atual, dentro da `nav`, depois do divisor. O `aria-label="Sair"` de hoje repete o texto visível e fica (o nome contém o rótulo visível [214]).

**A gaveta (decisão c):**

- **`scrim`:** `div.admin-overlay`, `position: fixed; inset: 0`, fundo `--m3-scrim` (32% de preto: o papel scrim a 0,32 [165], [166]; o MDC usa 60% [161], e fica o token do projeto), `z-index: var(--z-overlay)`. Sai o apelido `--color-overlay`. Nada é texto sobre ele: ele só escurece a página, que está `inert`.
- **Abrir (`motion-ok`):** a gaveta entra de `transform: translateX(-100%)` para `none`, com a opacidade, em `--dur-base` e `--m3-ease-emphasized-decelerate` (o movimento de hoje, `SPEC.md` §7.5; SPEC-M §7.7 manda seguir a Brasa com as curvas novas). A tabela da SPEC-M §2.8 lista a gaveta em `--dur-slow`; fica o `--dur-base` da §7.7 e do código. O `scrim` entra por opacidade em `--dur-base`.
- **Reduzido:** só opacidade, em `--dur-fast`, na gaveta e no `scrim` (hoje). A classe `.admin-sidebar` entra na lista de `transform: none` do `_motion.scss`, como rede de segurança: o `@keyframes` com `transform` só roda dentro de `motion-ok`.
- **Fechar:** some na hora (hoje), nos três modos. Uma saída animada deixaria a gaveta à vista com o foco já de volta ao botão.
- **`inert` (lógica de apresentação, `AdminLayout.vue`):** um `computed` `gavetaAberta = isSidebarOpen && !isDesktop`; o skip link, o `header` e o `main` recebem `:inert="gavetaAberta || undefined"` (o `undefined` tira o atributo). Ao cruzar `lg` com a gaveta aberta, o `handleMediaChange` de hoje já fecha a trava, e o `inert` sai junto. **Fica de fora a região dos avisos** (`AppToast`, no `App.vue`): com `inert`, a região viva sairia da árvore de acessibilidade e não anunciaria (aceito pela sessão principal; 4.2).
- **A volta do foco (bloqueante da volta 1):** o `closeSidebar({ returnFocus })` passa a ser assíncrono: `isSidebarOpen.value = false`, `unlock()`, e, com `returnFocus`, `await nextTick()` antes de `toggleButton?.focus()`. O `focus()` num elemento ainda `inert` não faz nada (testado pelo revisor no Chromium): sem o `nextTick`, o Esc, o "Fechar" e o fundo perderiam o foco (regressão do Esc e do "Fechar", que hoje funcionam).
- **Clique no fundo:** `@click="closeSidebar({ returnFocus: true })"` (hoje sem `returnFocus`).
- **Troca de rota com a gaveta aberta:** no `watch` de `route.fullPath`, antes de fechar, guardar se o foco estava dentro do `div#admin-sidebar` (`sidebarRef.value?.$el.contains(document.activeElement)`); fechar; e, se estava, `await nextTick()` e `mainRef.value?.focus({ preventScroll: true })`. Cobre a troca só de query, em que o `afterEach` do router não move o foco (4.2). Quando o caminho muda, o `afterEach` também leva o foco ao `main`; os dois chegam ao mesmo lugar.
- **Item da rota atual:** clicar em "Gestão de Pedidos" estando em `/admin/orders` exatamente não navega (o router não troca a rota), e a gaveta continua aberta, com o foco no link (hoje).
- **Trava de rolagem:** a de hoje (`useScrollLock`).
- **O que o leitor de tela ouve:** ao abrir, o diálogo "Menu do painel" e o foco em "Painel" (link; "página atual" se for a rota), dentro de "Seções do painel" (navegação); a página atrás não existe para ele (`inert`). Ao fechar, "Alternar menu", botão, recolhido.

**Acessibilidade (resumo):** dois `nav` com nomes distintos, sem a palavra "navegação" ([210], [211]); o `aside` sai, porque o complementary é para conteúdo de apoio [210], e a `nav` envolve a coluna inteira; abaixo de `lg`, o contêiner é o diálogo modal [199]; `aria-current` só no item exato [207]; os links da coluna não viram `menu` nem `menubar` ([203], [204]); o "Alternar menu" com nome fixo e `aria-expanded` (um nome que muda com o estado repetiria a informação; inferência da pesquisa a partir de [179], [180] e [159]).

**Comportamento:** 1440 e 1024, a coluna fixa; abaixo de 1024, a gaveta, fechada ao carregar; 390, a gaveta de 240 sobre uma faixa de 150 px de `scrim`.

**Reservas:** rótulo que quebra com zoom (o item cresce); janela baixa (a coluna rola por dentro, `overflow-y: auto`); nome do admin longo não aparece aqui (só no menu do avatar).

### 5.2 Busca, atalhos e menu do perfil (decisões e, f, g)

#### A busca (e)

- **Arquivo:** `navbar/SearchBar.vue` (`div.navbar-search[role=search]`) e `navbar/_search-bar.scss`. A API fica (`placeholder`, `modelValue`; emite `search` e `submit`).

| Campo | Origem |
|---|---|
| Rótulo escondido | "Buscar produtos e pedidos" (`label.visually-hidden`) |
| Placeholder | "Buscar…" |
| Ícone | `magnifying-glass` |
| Comportamento | Em Produtos e Pedidos, filtra a cada digitação (`?q=`); nas outras telas, Enter leva a Produtos (hoje) |

- **Forma: o campo outlined do sistema, na medida densa.** Sem fundo (toma a `surface` do cabeçalho), contorno de 1 px `--m3-outline` (4,27; mínimo 3), canto 12 (`--m3-forma-m`), como o `FormGroup` (etapa 8). Altura mínima de 48 px (`3rem`): o exemplo de campo denso do Compose [119]; os 56 do campo padrão [125] deixariam 4 px na barra de 64.
- **Por que não a search bar do M3 [62]:** ela é o "busca no topo" proibido na direção: um campo em pílula que toma o lugar do título e se expande com sugestões, recomendado quando a busca é o foco do app [62]. Aqui a busca é uma ferramenta entre outras, que a §5.11 mantém; ela não se expande, não sugere e tem a cara de campo de formulário. A pílula também ecoaria a pílula da loja.
- **Medidas:** lupa de 20 px em `on-surface-variant` (8,86), a 12 px do início, centrada na altura **sem `translate`** (hoje `translate: 0 -50%`; o projeto só aceita transformação dentro de `motion-ok`): `position: absolute; inset-block: 0; display: flex; align-items: center`. O texto começa a `calc(var(--space-3) + 1.25rem + var(--space-4))` (48 px: 12 da ponta, o ícone, 16 até o texto [136], [137]); `padding-inline-end: var(--space-4)`. Valor em body-l 16/24 (sem o zoom do iOS), `on-surface`; placeholder em `on-surface-variant`.
- **Estados:** hover (`hover-capable`, fora do foco) com o contorno `on-surface` [135]; foco com o contorno `primary` (6,13) e o anel de 3 px encostado (a regra de `input` do `_a11y.scss`) [135]. O botão nativo de limpar do `type="search"` fica como o navegador desenha.
- **Largura:** `flex: 1`, até 22rem (352 px, hoje). Em 390, cerca de 166 px (os 390 menos o ☰, os atalhos, o avatar, os vãos e as bordas: cerca de 224), com 106 px de texto: "Buscar…" cabe; o texto digitado rola dentro.
- **Modos de contraste:** `forced-colors`, contorno `CanvasText`; `prefers-contrast: more`, contorno `on-surface-variant` (8,86), como o `FormGroup`.
- **Sai o `--color-input`.**

#### Os atalhos com contador (f)

- **Arquivo:** `navbar/NotificationBar.vue` e `navbar/_notification-bar.scss`. A API fica (`notifications`: `type`, `label`, `icon`, `count`, `to`).

| Campo | Origem |
|---|---|
| "Notificações, {n} pedido(s) pendente(s)" / "nenhum pedido pendente" | `TheNavbarAdmin.vue` (`countLabel`), `countByStatus("pending")`; ícone `bell`; destino `/admin/orders?status=pending` |
| "Tarefas, {n} pedido(s) em preparo" | `countByStatus("preparing")`; ícone `tasks`; destino `?status=preparing` |
| Selo | `item.count`, `aria-hidden`; some no 0; "9+" acima de 9 |

- **O selo é o badge do M3, e não um status:** fundo `--m3-error`, texto `--m3-on-error` (6,46), label-s 500 (11/16), tabular, `min-width` e altura de 1rem (16 px), `padding-inline: var(--space-1)`, canto `full`, `top` e `right` de `var(--space-1)` sobre o botão de 44, `pointer-events: none`. São as medidas e as cores do `.m3-badge` do FAB da loja (SPEC-M §4.1), escritas na parcial do painel (a parcial da loja não muda).
- **Por que `error`, e não `aviso`:** o badge do M3 é de erro [35], e o exemplo do `BadgedBox` é justamente um número de pendências numa barra [212]. O `aviso` é a cor do rótulo "Pendente", que classifica um pedido; o selo conta pedidos sobre um ícone. São papéis diferentes, e não há conflito: o "Tarefas" (pedidos em preparo, `info` no rótulo) também leva o selo em `error`. A regra da SPEC-M §2.2 ("`error` só para erro, ação destrutiva e o badge do carrinho") passa a dizer "os badges (o do carrinho e os dos atalhos do painel)" (seção 12).
- **"9+" fica** (texto do `SPEC.md` §5.11). O selo fica sobre um botão de 44, e "99+" teria cerca de 24 px de largura (estimativa); o número exato está no nome do link. O `.m3-badge` da loja mostra "99+" de 100 em diante; os dois limites ficam diferentes, cada um no texto da sua tela.
- **Sem animação:** o número muda quando um pedido muda de status, por uma ação feita em outro lugar da tela; o selo troca direto.
- **`aria-current`:** os dois links passam `aria-current="false"` (4.3).
- **Modos de contraste:** `forced-colors`, borda de 1 px `CanvasText` no selo (o fundo some; o número fica numa caixa); `prefers-contrast: more`, borda `outline`.
- **Os botões:** `BaseButton iconOnly` com `to` (hoje), até a etapa 10 (5.1).

#### O avatar e o menu do perfil (g)

- **Arquivo:** `navbar/UserProfileBar.vue` e `navbar/_user-profile-bar.scss`. A API fica (`userName`; emite `menu-select` e `logout`).

| Campo | Origem |
|---|---|
| Iniciais | `userInitials` (até 2, maiúsculas, `aria-hidden`) |
| Nome do botão | "Menu de {nome}" (`aria-haspopup="menu"`, `aria-expanded`, `aria-controls="menu-perfil-admin"`) |
| Cabeça do menu | `userName` (`p.navbar-profile__name`, fora do `role="menu"`) |
| Itens | "Meu perfil" (`user`), "Configurações" (`cog`), "Sair" (`sign-out-alt`) |

- **Avatar:** o `button.navbar-profile__avatar` fica com o alvo de 44 × 44, canto `full`, com a camada de estado (`on-surface-variant` a 8% e 10%) e o anel; dentro dele, um `span` de 32 px (`2rem`), canto `full`, fundo `--m3-secondary-container` e as iniciais em label-l 500 `--m3-on-secondary-container` (7,22). O avatar da top app bar tem 32 dp [196], e o alvo precisa ser maior que o desenho (inferência da pesquisa, com [196] e [78]; o projeto pede 44, SPEC-M §1.1). **Por que `secondary-container`:** o avatar é um controle (abre o menu), e a regra do sistema põe `secondary-container` nos círculos que agem e `tertiary-container` nos que informam (SPEC-M §2.2); o `primary-container` é do FAB e do hero. Contra a `surface`, o círculo dá 1,23: um controle com texto dispensa borda [98]. Sai o `--radius-round` (o `full` faz o círculo; o apelido fica para o acervo, decisão a).
- **Menu (cor trocada na volta 1):** `div.navbar-profile__menu` em `--m3-surface-container`, canto 16 (`--m3-forma-l`), `--m3-elevacao-2`, `padding: var(--space-2)`, `min-width: 13rem` (hoje) e `max-width: min(20rem, calc(100vw - 2 * var(--gutter)))`, alinhado ao fim do avatar, `reserva-de-sombra`. **Não encontrei** a cor do contêiner do menu no dossiê (a pesquisa cobre o teclado [205] e o menu preso a campo [130]). A escolha é pela diferença das superfícies vizinhas: o menu abre sobre a página (`surface`) e, abaixo do cabeçalho, sobre os cards (`surface-container-high`); no `high`, ele teria a cor do card sobre o qual abre. O `surface-container` não é nenhum dos dois (1,11 contra a página e 1,05 contra o card, medidos; a separação vem também da sombra).
- **Cabeça:** o nome em title-s (label-l 500), `on-surface` (14,68 sobre o `surface-container`), `overflow-wrap: anywhere`, com um divisor `outline-variant` embaixo (hoje).
- **Itens:** a anatomia do item da navegação (pílula `full` na largura do menu, ícone e rótulo), com 44 px, o alvo do projeto (não encontrei a altura do item de menu no dossiê): ícone de 20 px em `on-surface-variant` (7,97), rótulo label-l 500 em `on-surface` (14,68), camada de estado (hover 12,56, pressionado 12,06; ícone pressionado 6,55), anel interno (5,53; pressionado 4,54). Todos medidos sobre o `surface-container`.
- **O "Sair" separado por CSS (volta 1):** o `button` do "Sair" ganha `margin-block-start: var(--space-2)` e uma linha de 1 px `--m3-outline-variant` desenhada pelo `::after` (a camada de estado usa o `::before`), recuada 12 px dos lados, no vão acima dele. A linha não cria filho no DOM: o `role="menu"` continua só com os `menuitem` [205]. É a mesma separação do "Sair" na coluna: os dois primeiros itens levam a uma tela, o último sai do painel.
- **`role="menu"` fica:** o menu button com `role="menu"` e `menuitem` é o padrão do APG [79], [205], também com itens que navegam [206]; o aviso contra o `menu` vale para a navegação típica do site ([203], [204]), que é a coluna. O teclado de hoje fica: Enter e Espaço abrem e focam o primeiro item [79]; setas com volta nas pontas, Home e End, Esc fecha e devolve o foco, Tab fecha [205]; o clique fora fecha. As setas no botão e a busca por letra são opcionais ([79], [205]) e não entram.
- **Movimento:** o menu aparece por opacidade em `--m3-dur-mola-efeitos-rapida` com `--m3-mola-efeitos-rapida` (um `<Transition>` em volta do `v-show`), igual com e sem movimento reduzido (opacidade não conta como movimento [77]); sem `transform`, sem classe nova no `_motion.scss`.
- **Reservas:** nome longo quebra na cabeça; só "Administrador" quando o admin não tem nome (`TheNavbarAdmin`, hoje); as iniciais são duas no máximo.

### 5.3 Página, títulos e densidade (decisões h, p, r)

- **Arquivo:** `pages/admin/_admin-page.scss` (peças comuns), usado pelas parciais das telas. Sai o comentário com "Archivo" (`// KPI: ... valor Archivo 700 text-2xl`).
- **Fundo: `surface`** (sai o `surface-container` de hoje, que era o apelido `--color-surface-sunken` da Brasa, e não uma decisão). Os pares do filtro mudam de fundo: o contorno dá 4,27 sobre a `surface` (era 3,85), o placeholder e a seta 8,86, o foco 6,13 e o anel 6,14 (medidos; todos já no `contraste.js`).
- **`h1`: a regra global** (`--text-page`, de 36 a 45 px, 500, `on-surface`), como no carrinho, no perfil e no cardápio. **Por que não um título menor:** o valor dos KPIs fica em headline-m (28 px), e um `h1` do mesmo tamanho perderia a hierarquia da página; uma escala de título só no app. A densidade do painel vem do texto dos cards em body-m e dos paddings, e não do título.
- **Cabeçalho da página (Produtos):** `div.admin-page__header`, flex com quebra, `align-items: center`, `justify-content: space-between`, `gap: var(--space-3)`, `margin-bottom: var(--space-5)` (hoje): o `h1` e o filled "Novo produto" (`md`, 44 px, `plus`), o único filled da região (SPEC-M §2.2). Em 390, cabem na mesma linha ("Produtos" em 36 px tem cerca de 160 px; o botão, cerca de 150).
- **Filtros: 56 px, sem prop densa.** O `FormGroup` `select` de hoje, até 16rem. **Por que não o campo de 48:** é um campo por tela, sobre a lista; o denso de 48 é um exemplo do Compose [119], e não um token do M3; os campos do `ModalProducts`, na mesma tarefa, têm 56. A busca tem 48 porque mora na barra de 64 (5.2). Nenhuma prop nova no `FormGroup`.
- **Densidade:** o texto do `main` em body-m 14/20 (hoje `--text-sm`); cards com padding 16 (o de hoje) e 8 no card de produto (o do card da loja); grades com `gap: var(--space-4)`.

#### A linha do resultado da busca (p)

| Campo | Origem |
|---|---|
| Texto | "{n} produto(s) para “{q}”." (`ProductManagement`) e "{n} pedido(s) para “{q}”." (`OrderManagement`) |
| Ação | "Limpar busca" |

- **Estrutura (muda):** `div.admin-page__busca` (flex com quebra, `align-items: center`, `gap: var(--space-2)`, `margin-bottom: var(--space-4)`) → `p.admin-page__search-result[role=status][aria-atomic=true]`, **sempre no DOM** (vazio sem busca), e o "Limpar busca" ao lado, **fora da região**, só com busca. **Por quê:** o papel `status` precisa existir antes de a mensagem aparecer, e o `aria-atomic` explícito é aconselhado [153]; hoje o parágrafo nasce com a primeira letra, e o botão fica dentro da região, que o lê junto com o resultado.
- **"Limpar busca" vira text button** (`BaseButton variant="ghost" size="sm"`: 40 px com alvo de 44, tinta `primary`, 6,13 sobre a `surface`; pressionado 5,33). **Por quê:** ele vem depois da frase, solto, e não dentro dela; a exceção de alvo da 2.5.8 é para o link em texto corrido [78], e o "Alterar no perfil" da etapa 7 foi pelo mesmo caminho. Botão (e não link), porque ele muda a query da própria tela (hoje).
- **Texto:** body-m `on-surface-variant` (8,86).
- **Risco:** a busca filtra a cada letra, e a região anuncia a cada mudança; o `polite` não interrompe [153], mas a 4.1.3 alerta para a interface tagarela [151] (seção 11).

#### Títulos e landmarks (r)

| Tela | Hierarquia |
|---|---|
| Painel | `h1` "Painel" → 4 `h2` (os rótulos dos KPIs) → a `section` "Gráfico de vendas" (`aria-label`) |
| Produtos | `h1` "Produtos" → um `h2` por card (o nome) → os diálogos (`h2` na top layer) |
| Pedidos | `h1` "Pedidos" → `h2` "Pedido #{id}" → `h3` "Cliente" e "Itens"; o diálogo "Detalhes" (`h2`) → `h3` "Itens" |
| Relatórios | `h1` "Relatórios" → 3 `h2` (KPIs) e o `h2` "Produtos mais vendidos" |
| Meu perfil | `h1` "Meu perfil" → `h2` "Administrador" |
| Configurações | `h1` "Configurações" → `h2` "Dados do painel"; o diálogo (`h2`) |
| Login | `h1` "Painel administrativo" |

- Um `h1` por tela; sem salto de nível.
- **Landmarks:** `header` (banner, um só, no topo [210]); `nav` "Ferramentas do painel" com o `role="search"` dentro; a `nav` "Seções do painel", com a coluna inteira dentro (o `aside` sai, volta 1; abaixo de `lg`, dentro do diálogo "Menu do painel"); `main#conteudo` com `tabindex="-1"`; o skip link. Cada `AdminCard` é uma `region` nomeada pelo título (hoje, `SPEC.md` §5.11): os nomes repetidos são únicos ("Pedido #1", "Pedido #2", os quatro KPIs), como pedem [210] e [211].

### 5.4 `AdminCard` e KPIs (decisão i)

- **Arquivo e raiz:** `src/components/admin/AdminCard.vue` (`article.admin-card[role=region][aria-labelledby]`) e `components/admin/_admin-card.scss`. **A API fica:** `title` (obrigatório), `loading` (`false`), `headingLevel` (2), `variant` (`default` | `kpi`); slots `header-actions`, padrão e `footer`.
- **Objetivo:** agrupar um assunto (um pedido, um KPI, o perfil) sem competir com o conteúdo.

**Visual (filled card [63]):**

- Fundo `--m3-surface-container-high`, canto 12 (`--m3-forma-m`), **sem sombra** (sai o `--elev-1`), `padding: var(--space-4)`, coluna com `gap: var(--space-3)`, `reserva-de-sombra`.
- **`height: 100%` no `.admin-card` (volta 1):** nas grades, o `li` estica até a altura da linha (`align-items: stretch`), e o card precisa preenchê-lo para o rodapé (`margin-top: auto`) alinhar as ações entre os cards. Fica o `height: 100%` no card, e não o `li` flex: a regra mora no componente, e vale para todas as grades (pedidos e KPIs) sem regra nas views. Fora de grade (Meu perfil, Configurações), o pai tem altura automática, e o `100%` não muda nada.
- **Por que `high`, e não o `highest` da SPEC-M §5.11 (desvio, medido):** o "Detalhes" do card de pedido é text button em `primary`. Sobre o `highest`, dá 4,99 em repouso, 4,50 no hover e **4,38 pressionado**, abaixo do 4,5 de texto; sobre o `high`, 5,23, 4,71 e 4,59. A cor do filled card não está nas fontes do dossiê ([63] não a traz); o `highest` veio do card do feed da Home, que não tem text button. O card de produto segue o mesmo fundo (5.7), para o painel ter um card só.
- **Contra a página:** o `high` dá 1,17 sobre a `surface` (medido). **A 1.4.11 não se aplica:** o card não é componente de interface nem gráfico necessário para entender o conteúdo; o título e o texto o identificam [98]. Nos modos de contraste, a borda da `reserva-de-sombra` o desenha.
- **Sem hover, sem foco, sem cursor:** só os botões reagem (SPEC-M §0).

**Peças:**

| Peça | Estilo | Par |
|---|---|---|
| `header.admin-card__header` | flex, `align-items: center`, `justify-content: space-between`, `gap: var(--space-3)`, com quebra | — |
| Título (`default`) | title-m 500 (16/24), `on-surface` | 13,93 |
| Título (`kpi`) | label-l 500 (14/20), `on-surface-variant`: o rótulo do número | 7,56 |
| Conteúdo | `flex: 1` | — |
| `footer.admin-card__footer` | `margin-top: auto`; flex com quebra, `gap: var(--space-2)`, alinhado ao início; **sai o divisor de cima** (no card de pedido ele dobrava o divisor do Total) | — |

- **`loading`:** o `aria-busy` fica; **sai a opacidade de 0,6.** A opacidade como ênfase é proibida na direção (SPEC-M §0), e nenhuma tela usa a prop hoje; um indicador só entra com espera real [58] (o plano da API decide).
- **O valor do KPI** (slot padrão, `.kpi__value` e `.kpi__note` em `_admin-page.scss`): o valor em headline-m 400 (28/36) [1], `on-surface` (13,93), `.tabular`; a nota em body-m `on-surface-variant` (7,56), a `--space-1` do valor. Sai o `--text-2xl` (o único uso). Sem seta, tendência ou comparação (pacote, item 3).
- **Grade dos KPIs (Painel, `ul.dashboard__kpis[role=list]`):** 1 coluna abaixo de `sm`, 2 de `sm` a `xl`, 4 a partir de `xl` (hoje), `gap: var(--space-4)`, `align-items: stretch`.
  - **Contas (estimativa):** "R$ 12.450,00" em headline-m tem cerca de 165 px. Em `sm` (480), dois cards de cerca de 212 px, com 180 úteis; em 1024, 352; em 1440, 272. Cabe em todas.
- **Comportamento:** 1440, 272 px (KPI) e 368 (pedido); 1024, 352; 390, 358.
- **Movimento:** nenhum.
- **Reservas:** título longo quebra (`flex-wrap` no cabeçalho, o rótulo de status vai para a linha de baixo); valor longo ("R$ 1.948,00") cabe nas larguras acima.

### 5.5 Rótulo de status (decisão k)

- **Componente novo: `M3RotuloStatus`** (`src/components/ui/M3RotuloStatus.vue`, parcial `components/ui/_m3-rotulo-status.scss`). Peça M3 sem par, com o nome `M3*` (decisão j). O desenho da Home previu: "se o perfil ou o admin usarem chips de status estáticos, o chip pode virar componente então" (§7).
- **Por que componente:** cinco usos em três telas (o card e o diálogo de Pedidos, o histórico do perfil) e três tons; um lugar só para o visual, os pares e os modos de contraste.

| Prop | Tipo e padrão | O que faz |
|---|---|---|
| `tom` | `String`, `"info"`; validador `["info", "aviso", "sucesso"]` | Escolhe o par: `--m3-{tom}` sobre `--m3-{tom}-container` |

- **Slot padrão:** o texto. Nenhum emit.
- **Estrutura:** `p.m3-status.m3-status--{tom}` com o slot. **Raiz `p`:** é o elemento do perfil hoje (o `ProfileView.test.js` confere), e cabe no `header` do card e no `dd` do diálogo.
- **Visual:** label-l 500 (14/20), `letter-spacing: var(--m3-label-l-tracking)` (o do `.profile-order__status` de hoje, `_profile.scss` L183, para o "Recebido" ficar igual ao que a etapa 8 aprovou), `padding: var(--space-1) var(--space-2)` (28 px de altura), canto `--m3-forma-s` (8; chips em small [7]), `flex-shrink: 0`, `white-space: nowrap`, `reserva-de-sombra`. **Sem** camada, cursor, foco, papel ARIA ou ícone: não é chip, porque o chip do M3 é interativo [60] [141] (desenho da Conta, 5.8).
- **Mapa do painel** (apresentação, na `OrderManagement`; nenhuma store muda):

| `status` | Texto (`STATUS_LABELS`) | `tom` | Par (medido) |
|---|---|---|---|
| `pending` | "Pendente" | `aviso` | 5,03 |
| `preparing` | "Em preparo" | `info` | 5,00 |
| `delivery` | "A caminho" | `info` | 5,00 |
| `completed` | "Concluído" | `sucesso` | 5,01 |

- **"Em preparo" e "A caminho" no mesmo `info`:** o texto distingue; a cor é sinal a mais, e não o único (1.4.1 [99]).
- **O contêiner contra o card:** 1,04 a 1,05 sobre o `high` (1,10 sobre o `surface-container` do diálogo; medidos). **A 1.4.11 não se aplica:** o rótulo não é controle, e o texto (5,00 a 5,03 sobre o contêiner) leva o estado [98]. Nos modos de contraste, a borda da `reserva-de-sombra` desenha a caixa, e o texto fica.
- **O perfil passa a usá-lo nesta etapa:** no `ProfileView.vue`, `<p class="profile-order__status">{{ order.status }}</p>` vira `<M3RotuloStatus class="profile-order__status" tom="info">{{ order.status }}</M3RotuloStatus>` (uma linha e o import). Em `_profile.scss`, a regra `.profile-order__status` fica só com o `margin-inline-start: auto` (o resto, inclusive o `letter-spacing`, vai para o componente). O `ProfileView.test.js` continua valendo: um `p`, sem papel, sem `tabindex`, sem ser botão. **O `conta-estilo.test.js` muda (volta 1):** as asserções do `.profile-order__status` sobre cor, fundo, canto, padding, tipo, peso, a falta de cursor e de camada e a borda de `forced-colors` (L406–418) passam para o teste de estilo do componente (seção 9); no `conta-estilo.test.js` fica só a margem (L404).
- **Movimento:** nenhum; o texto troca direto quando o status muda.
- **Reserva:** status desconhecido não chega à tela (o `afterHydrate` da store tira o pedido fora do formato; hoje); o texto `?? order.status` de hoje fica, com `tom="info"`.

### 5.6 Pedidos: o card e os Detalhes (decisões j e n)

- **Arquivos:** `src/views/admin/OrderManagement.vue` (`section.order-management`) e `pages/admin/_order-management.scss`.
- **Objetivo:** ver os pedidos de um status, levar um pedido ao próximo e conferir o que foi pedido e para onde vai.

**Conteúdo:**

| Campo | Origem |
|---|---|
| `h1` | "Pedidos" (`tabindex="-1"`, recebe o foco quando o botão some ou desabilita; hoje) |
| Filtro | `FormGroup` "Status": "Todos", "Pendente", "Em preparo", "A caminho", "Concluído" (`?status=`) |
| Busca | a linha de 5.3 |
| Cards | `ordersStore.orders`, filtrados (hoje) |
| Título do card | "Pedido #{id}" (`AdminCard :title`) |
| Status | `M3RotuloStatus` no slot `header-actions` |
| "Cliente" | `h3`; `customerName`; `address`; `phone` (tabular) |
| "Itens" | `h3`; `ul` com "{quantity}× {name}" e `formatPrice(item.price)` |
| "Total" | `formatPrice(order.total)` |
| Ações | "Atualizar status" (`secondary`, `sm`; `disabled` em "Concluído") e "Detalhes" (`ghost`, `sm`) |
| Vazio | `EmptyState` "Nenhum pedido encontrado" / "Confira o texto da busca ou escolha outro status." ou "Nenhum pedido com esse status" / "Escolha outro status no filtro." |
| Aviso | "Pedido #{id}: {status}." (`toast.show`) |

**Cards separados, e não lista segmentada (j):**

- Cada pedido tem cliente, itens, total e duas ações: de 8 a 12 linhas e um conteúdo coerente com ações próprias, o caso do card [63]. Numa lista segmentada, com vãos de 2 px e cantos de 4 por dentro [8], pedidos diferentes de 300 px de altura se leriam como um bloco só; a lista segmentada serve a linhas curtas do mesmo tipo (o histórico do perfil, o carrinho).
- **Contra os "cards SaaS iguais":** sem sombra, sem hover, sem enfeite; o único fundo de cor é o do status; o conteúdo de cada card é diferente.
- **Grade:** `ul.orders-list[role=list]`, 1 coluna abaixo de `md`, 2 de `md` a `xl`, 3 a partir de `xl` (hoje), `gap: var(--space-4)`, `align-items: stretch`; o `li` estica, o `AdminCard` o preenche (`height: 100%`, 5.4), e o rodapé com `margin-top: auto` alinha as ações na linha.

**Hierarquia dentro do card:**

- `h2` "Pedido #1" em title-m 500 (o título do `AdminCard`), com o `#1` tabular; o rótulo de status no fim da mesma linha.
- **`h3` "Cliente" e "Itens" em title-s** (label-l 500, `on-surface`, 13,93): saem a caixa alta, o espaçamento entre letras e o cinza (`.order-info__title` de hoje). São títulos de verdade, e não rótulos acima do conteúdo; a navegação por títulos passa por eles.
- **Bloco do cliente:** `div.order-info__block` (coluna, `gap: var(--space-1)`); o nome em body-m `on-surface`; o endereço e o telefone em body-m `on-surface-variant` (7,56), `overflow-wrap: anywhere`.
- **Itens:** cada linha é flex com `justify-content: space-between`, `gap: var(--space-3)`: "2× Smash Burger" (`2×` tabular) e o preço (tabular, `white-space: nowrap`), em body-m `on-surface`.
  - **O "×" fica:** a regra do "·" da etapa 7 (7.g) tira o separador que junta dados de tipos diferentes; o "×" é a notação de quantidade do resumo da loja ("{quantidade}× {nome}", `SPEC.md` §4.1), e não um separador.
  - **O preço da linha é o unitário** (`item.price`): "2× Smash Burger R$ 25,90" com o Total R$ 59,80. Pergunta 1 da §12; a recomendação é "R$ 25,90 cada", o texto do diálogo "Detalhes" ("{preço} cada"), sem conta nova na view. Com ela, o preço da linha fica em body-m `on-surface`, tabular, com o "cada" no mesmo texto.
- **Total:** `p.order-info__total`, flex entre "Total" (label-l 500) e o valor (title-m 500, tabular), com o divisor de 1 px `--m3-outline-variant` em cima e `padding-top: var(--space-2)`: o único divisor do card.
- **Ações (rodapé):** "Atualizar status" (tonal `sm`) e "Detalhes" (texto `sm`), nessa ordem, alinhados ao início. Texto do tonal 7,22; "Detalhes" 5,23 sobre o `high` (hover 4,71; pressionado 4,59; anel 5,25 e 4,60). O desabilitado do "Atualizar status" é da etapa 10 (hoje: `surface-container-highest` e `--color-ink-disabled`).

**Interação e estados:** os de hoje. "Atualizar status" leva ao próximo status e mostra o aviso; se o botão sai da lista filtrada ou desabilita, o foco vai ao `h1`; **novo:** se ele continua focado e a última entrada foi de teclado, a view rola o botão para cima do aviso (4.6). "Detalhes" abre o diálogo; ao fechar, o foco volta ao botão (`BaseDialog`, hoje).

**O diálogo "Detalhes" (n; o contêiner é da etapa 10):**

| Campo | Origem |
|---|---|
| Título | "Pedido #{id}" (`title-id="pedido-detalhes-titulo"`, até 520 px) |
| `dl` | "Status" (o `M3RotuloStatus`), "Cliente", "Endereço", "Telefone" (tabular) |
| "Itens" | `h3`; nome, "{preço} cada", total da linha (`formatPrice(item.price * item.quantity)`, hoje) |
| "Total" | `formatPrice(order.total)` |
| Ação | "Fechar" (`secondary`) |

- **`dl` (desta etapa):** grade de 2 colunas a partir de `sm` (hoje); `dt` em body-m `on-surface-variant` (7,97 sobre o `surface-container` do diálogo), **sem caixa alta**; `dd` em body-l `on-surface` (14,68), `overflow-wrap: anywhere`, a `--space-1` do `dt`.
- **Itens:** a grade de hoje (nome, unitário, linha; em 390, o unitário desce); nome e linha em body-l, unitário em body-m `on-surface-variant`; tabulares.
- **Total:** a linha do card (title-m 500), com o divisor.
- **Rodapé:** "Fechar" tonal, no fim. O foco inicial vai ao título (o corpo não tem nada focável; `BaseDialog` de hoje).
- **Da etapa 10:** o contêiner, o sheet em 390, o "Fechar" de ícone e o fundo.

**Comportamento:** 1440, 3 colunas de 368 (com os dois pedidos de exemplo, a terceira fica vazia); 1024, 2 de 352; 390, uma de 358.

**Movimento:** nenhum; o card troca o rótulo e o selo do cabeçalho troca o número, direto.

**Reservas:**

- **Pedido com muitos itens:** o card cresce; os outros da linha esticam, com as ações alinhadas no pé.
- **Endereço longo:** quebra (`overflow-wrap: anywhere`).
- **Nome de item longo:** quebra no nome; o preço fica na linha, sem quebra.
- **Nenhum pedido no filtro ou na busca:** o `EmptyState` (hoje; visual da etapa 10), sobre a `surface`, abaixo do filtro.
- **Todos concluídos:** os "Atualizar status" ficam desabilitados (etapa 10 desenha).

### 5.7 Produtos: o card novo e o diálogo de exclusão (decisões l e n)

- **Arquivos:** `src/views/admin/ProductManagement.vue` (`section.product-management`) e `pages/admin/_product-management.scss`; o componente novo `src/components/admin/M3CartaoProduto.vue` e `components/admin/_m3-cartao-produto.scss`.
- **Objetivo:** achar o produto pela foto e pelo nome, e editar ou excluir sem abrir nada antes.

**Conteúdo:**

| Campo | Origem |
|---|---|
| `h1` | "Produtos" (`tabindex="-1"`, recebe o foco depois de excluir; hoje) |
| Ação | "Novo produto" (filled `md`, `plus`) |
| Filtro | `FormGroup` "Categoria": "Destaques" (4 hambúrgueres sorteados ao abrir), "Hambúrgueres", "Bebidas", "Sobremesas" |
| Cards | `filteredProducts` (hoje); chave `` `${product.category}-${product.id}` `` |
| Foto | `product.image` por `responsiveImage` (`@/composables/useResponsiveImage`) |
| Nome | `product.name` (`h2`) |
| Descrição | `product.description` |
| Preço | `formatPrice(product.price)` (`@/utils/formatters`) |
| Ações | "Editar" (`secondary`, `sm`) e "Excluir" (`danger`, `sm`, `trash-can`) |
| Vazio da busca | `EmptyState` "Nenhum produto encontrado" / "Confira o texto da busca ou escolha outra categoria." (`magnifying-glass`) |
| Avisos | "Produto atualizado.", "Produto criado.", "Produto excluído." |

**`M3CartaoProduto` (l):**

| Prop | Tipo e padrão | O que faz |
|---|---|---|
| `produto` | `Object`, obrigatória | O produto (`name`, `description`, `price`, `image`) |
| `nivelTitulo` | `[Number, String]`, `2` | O nível do título (o `headingLevel` do `ProductCard`) |

- **Slot `acoes`:** os botões (o slot `actions` de hoje, com o nome em português das peças `M3*`). Nenhum emit.
- **Estrutura:** `article.m3-cartao-produto` → `M3Foto.m3-cartao-produto__foto` (`forma="cartao"`, 4:3, `:alt="produto.name"`, `:icone="['fas', 'utensils']"`, `:falhou`, `@erro`) → `div.m3-cartao-produto__corpo` → `h{n}.m3-cartao-produto__nome` → `p.m3-cartao-produto__descricao` (`v-if`) → `p.m3-cartao-produto__preco.tabular` → `div.m3-cartao-produto__acoes` (o slot).
- **Lógica (trocada na volta 1):** sem o `useCartaoProduto`, que traz o estado "Adicionado", o temporizador e o `atributosAdicionar` do fluxo de compra. O card usa direto um `computed` com `responsiveImage(props.produto.image, { sizes })`, um `computed` com `formatPrice(props.produto.price)` e um `ref(false)` para a imagem que falha, ligado ao `@erro` do `M3Foto`. `sizes`: `"(min-width: 1280px) 280px, (min-width: 768px) 30vw, (min-width: 480px) 45vw, 7rem"` (estimativa pela grade abaixo; a sessão C confere a imagem escolhida em 390 e 1440).
- **O que reaproveita do card da loja (`M3CartaoLanche`) e o que não:**
  - **reaproveita:** o filled card com padding de 8 e a foto recuada, com a forma `cartao` do `M3Foto` (canto 16 abaixo de `md`, 28 a partir dele) [63], [34]; o nome em title-m 500; a descrição em body-m com o corte de 2 linhas (`linhas(2)`); o preço em title-m 500 tabular; a reserva da foto;
  - **não reaproveita:** o split, a folha e o `usePersonalizar` (o admin não compra); o destaque (os itens são equivalentes [64]); o `highest` (fica o `high` do painel, 5.4); o título em title-l a partir de `md` (o painel é denso).
- **Visual:** `--m3-surface-container-high`, canto 12, `padding: var(--space-2)`, sem sombra, sem hover, `height: 100%`, `reserva-de-sombra`. Corpo com `gap: var(--space-1)` e `padding: var(--space-3) var(--space-1) var(--space-1)` (`var(--space-4) var(--space-2) var(--space-2)` a partir de `md`), como o card da loja.
- **Texto:** nome `on-surface` (13,93); descrição `on-surface-variant` (7,56); preço `on-surface`, com `margin-top: auto` (os preços e as ações alinham na linha da grade).
- **Ações:** `div.m3-cartao-produto__acoes`, flex com quebra, `justify-content: space-between`, `gap: var(--space-2)`, `padding-top: var(--space-2)`: "Editar" no início e "Excluir" no fim. Alvo apertado aumenta os toques errados [H19], e o "Excluir" abre a confirmação. "Editar" tonal `sm` (7,22); "Excluir" `danger` com a forma da Brasa até a etapa 10 (`error` sobre o `high`, 5,25; hover e pressionado `error` sobre `error-container`, 4,99).
- **Na horizontal abaixo de `sm` (390):** grade `grid-template-columns: 7rem minmax(0, 1fr)`, `column-gap: var(--space-3)`: a foto (112 × 84, 4:3) na primeira coluna, o nome, a descrição e o preço na segunda; a fileira de ações na largura toda, embaixo (`grid-column: 1 / -1`). O card tem cerca de 184 px de altura (era cerca de 470 na captura de hoje); os 7 hambúrgueres de "Hambúrgueres" somam cerca de 1400 px, e não cerca de 3400. **Por quê:** quem gerencia procura pelo nome e age; a foto grande de ponta a ponta servia à vitrine. A foto continua, menor, para reconhecer o produto.
- **A partir de `sm`:** vertical (a foto em cima), como o card da loja.
- **Grade (`ul.products-list[role=list]`):** 1 coluna abaixo de `sm`; 2 de `sm` a `md`; 3 de `md` a `xl` (a coluna fixa entra em `lg`, e o conteúdo de 1024, 720 px, é quase o de 768, 704); 4 a partir de `xl`. `gap: var(--space-4)`. Hoje: 2 a partir de `sm`, 3 a partir de `lg`, 4 a partir de `xl`.
  - **Contas (estimativa):** "Editar" (cerca de 74 px) e "Excluir" com o ícone (cerca de 102) somam 184 com o vão. Em 768, três cards de 224, com 200 úteis; em 480, dois de 212, com cerca de 189; em 1024, 229 e 205; em 1440, 272 e 248. Cabe em todas; se quebrar, o "Excluir" desce para a linha de baixo, no fim.
- **`alt`:** o nome do produto, como o card da loja e o `ProductCard` de hoje: a foto é a imagem salva do produto, e o admin a confere. O título vem logo depois; a repetição é a de hoje.
- **Acessibilidade:** `article` com o nome em `h2` (`nivelTitulo`); a lista é `ul[role=list]`; os botões com o texto visível ("Editar", "Excluir"), como hoje (o nome do produto não entra no nome dos botões: texto novo).
- **Movimento:** nenhum (sai o tilt do `ProductCard`).
- **Reservas:**
  - **nome longo:** 2 linhas com `line-clamp` (o `h2` tem o texto inteiro para o leitor de tela);
  - **descrição longa** (até 160 caracteres): 2 linhas; a inteira está no "Editar";
  - **sem descrição:** o `p` não existe; o preço sobe;
  - **imagem `data:`** (enviada no painel): sem `<source>` (o `M3Foto` já trata);
  - **imagem que falha:** o ícone `utensils` em `surface-container` (7,97), na mesma forma; a grade mistura as três categorias, e o `burger` de hoje ficaria errado numa bebida;
  - **categoria vazia sem busca:** a lista fica vazia, sem `EmptyState` (hoje). Pergunta 3 da §12.

**O diálogo "Excluir produto?" (n):**

| Campo | Origem |
|---|---|
| Título | "Excluir produto?" (`excluir-produto-titulo`, até 480 px) |
| Texto | "“{nome}” sai do cardápio salvo neste navegador. Para trazê-lo de volta, use Configurações › Restaurar cardápio original." |
| Botões | "Cancelar" (`secondary`) e "Excluir produto" (`danger`, `trash-can`) |

- **Desta etapa:** o texto (o de hoje; só existe por causa do `localStorage`, pacote, item 7), em body-l `on-surface`; a ordem dos botões, o seguro antes e o destrutivo por último, alinhados ao fim (`.product-delete__actions`, hoje; o padrão da etapa 8); o foco inicial no título (o corpo não tem nada focável). Depois de excluir, o foco vai ao `h1` (hoje).
- **Da etapa 10:** o contêiner, o sheet, o `danger`.

**Comportamento:** 1440, 4 colunas de 272; 1024, 3 de 229; 390, uma coluna de cards na horizontal.

### 5.8 `ModalProducts` (decisão m)

- **Arquivos:** `src/components/admin/ModalProducts.vue` (o `BaseDialog` com `form#produto-form.modal-product`) e `components/admin/_modal-products.scss`. **A API fica:** `open`, `mode`, `product`; emite `close`, `submit`, `cancel`.
- **Objetivo:** criar ou editar um produto num passo, com o erro dito no campo.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Título | "Novo produto" ou "Editar produto" (`produto-titulo`, até 560 px) |
| Categoria | `FormGroup` `select`: "Hambúrguer", "Sobremesa", "Bebida" |
| Nome do produto | "Informe o nome"; obrigatório; até 60 |
| Preço | "Ex.: 25,90"; obrigatório; `inputmode="decimal"`; até 7 |
| Quantidade | "Opcional"; `type="number"` |
| Descrição | "Descrição do produto"; até 160 |
| Imagem | rótulo "Imagem"; "Escolher imagem"; o nome do arquivo ou "Lendo a imagem…", "Imagem atual", "Nenhuma imagem escolhida"; ajuda `IMAGE_HELP` ("PNG, JPEG ou WebP, com até 300 kB."); os erros de `readProductImage`, "Escolha uma imagem para o produto." e o `NO_SPACE` |
| Botões | "Cancelar" (`secondary`) e "Salvar" (filled; `loading` enquanto lê a imagem) |

**Grade dos campos:** uma coluna, com uma mudança: **Preço e Quantidade lado a lado a partir de `sm`** (`div.modal-product__par`, `grid-template-columns: repeat(2, minmax(0, 1fr))`, `gap: var(--space-4)`, `align-items: start`). Os dois são curtos e numéricos; o diálogo perde uma linha de cerca de 100 px (rótulo, 8, campo de 56 e o vão de 16; estimativa). A ordem do DOM e do Tab não muda: Categoria, Nome, Preço, Quantidade, Descrição, Imagem, Cancelar, Salvar. Nome e Descrição ficam na largura toda (até 60 e 160 caracteres).

**O seletor de arquivo (`.file-picker`), alinhado ao `FormGroup`:**

- **O rótulo "Imagem"** (`span.file-picker__label`, sem `id`: nada o referencia; o nome do campo é o texto do `label` do botão): label-l 500 `on-surface`, a 8 px da caixa, como o rótulo do campo; `error` com erro.
- **A caixa (`div.file-picker__campo`, nova):** contorno de 1 px `--m3-outline` (3,85 sobre o `surface-container` do diálogo), canto 12, `min-height: 3.5rem`, `display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-3)`, `padding-inline: var(--space-2) var(--space-4)`. Com erro, o contorno passa a `--m3-error` (5,54). Sem hover na caixa: ela não é interativa (só o botão dentro). **Por quê:** os campos vizinhos se mostram pelo contorno; a caixa faz o seletor se ler como mais um campo do formulário, e não como um botão solto entre campos.
- **O botão (`label.file-picker__button[for=image]`, com o `input` escondido dentro, hoje):** a forma e as cores do tonal `md` do `BaseButton`: 44 px, `--m3-secondary-container` e `--m3-on-secondary-container` (7,22), label-l 500, `padding-inline: var(--space-5)`, a troca de forma (`troca-de-forma(var(--m3-forma-full), var(--m3-forma-s))`, com os três fundos em `--m3-botao-fundo`, como o tonal) e o anel no `:has(:focus-visible)` (3 px `secondary`, afastado 2 px; os 6 px entre o botão e o contorno comportam o anel). É `label`, e não `BaseButton`: o clique precisa cair no `input` de arquivo (hoje).
- **O nome do arquivo** (`span.file-picker__name`): body-m `on-surface-variant` (7,97), `overflow-wrap: anywhere`; quebra para baixo do botão, dentro da caixa, quando o nome é longo.
- **Ajuda e erro (como no `FormGroup`):** 4 px abaixo da caixa, com recuo de 16 dos dois lados ([138], [139]); body-m; o erro com o `circle-exclamation` num `span` da altura da linha (centrado na primeira linha), em `error` (5,54).
- **O erro toma o lugar da ajuda** (hoje os dois aparecem juntos): no DOM e no `aria-describedby` (`image-erro` com erro, `image-ajuda` sem), como nos campos do mesmo diálogo, em que o erro substitui o apoio [131] (desenho da Conta, 5.1). **Nada se perde:** os erros de tipo e de tamanho repetem a regra ("Escolha uma imagem PNG, JPEG ou WebP.", "A imagem precisa ter até 300 kB."); o de falta de imagem pede a escolha.
- **O que o leitor de tela ouve:** no foco, "Escolher imagem" (o texto do `label`), o tipo de arquivo, "inválido" com erro, e o erro ou a ajuda.

**Rodapé (da etapa 10 o contêiner):** "Cancelar" tonal e "Salvar" filled, nessa ordem, alinhados ao fim (hoje; o seguro antes, a ação principal por último). O "Salvar" em `loading` enquanto a imagem é lida é da etapa 10 (hoje: o spinner e o `aria-busy`).

**Comportamento:** 1440 e 1024, o diálogo de 560 px centrado; Preço e Quantidade com cerca de 248 px cada; 390, o sheet com uma coluna (a etapa 10 desenha o sheet).

**Movimento:** nenhum novo (o pressionado do botão de imagem troca de forma por opacidade, como os botões).

**Reservas:** nome de arquivo longo (quebra dentro da caixa); erro de três linhas (o `NO_SPACE` em 390; a caixa não muda, a mensagem cresce); a leitura que termina depois do "Salvar" (o envio espera; hoje).

### 5.9 Painel e Relatórios (decisão o)

#### Painel

- **Arquivos:** `src/views/admin/AdminDashboard.vue` (`div.dashboard`) e `pages/admin/_admin-dashboard.scss`.
- **Conteúdo:** `h1` "Painel"; `SALES_KPIS` ("Vendas totais" R$ 12.450,00 "Últimos 30 dias"; "Total de pedidos" 324 "Pedidos realizados"; "Ticket médio" R$ 38,42 "Por pedido"; "Mais vendido" 234 un. "Coca-Cola"), dados de exemplo (pacote, item 7); a `section` "Gráfico de vendas" com o `EmptyState` "Gráfico de vendas indisponível nesta versão" / "Os números acima trazem o resumo dos últimos 30 dias." (`chart-line`).
- **KPIs:** 5.4.
- **O `EmptyState` do gráfico:** dentro da `section.dashboard__chart`, que ganha o filled card do painel (`high`, canto 12, sem sombra, `padding: var(--space-5)`, `reserva-de-sombra`; sai o `--elev-1`). **Por que num card:** a seção ocupa o lugar do gráfico, ao lado dos KPIs, e o card diz que aquele é um espaço do painel; o vazio fica dentro dele, como o perfil sem pedidos fica dentro do contêiner (etapa 8). Os textos do `EmptyState` sobre o `high`: 13,93 e 7,56. O visual do `EmptyState` é da etapa 10.
- **Sem gráfico, tendência, comparação ou seta** (pacote, item 3).

#### Relatórios

- **Arquivos:** `src/views/admin/SalesReports.vue` (`div.sales-reports`) e `pages/admin/_sales-reports.scss`.
- **Conteúdo:** `h1` "Relatórios"; os 3 KPIs (`SALES_KPIS` sem "Mais vendido", que fica no Painel); o `AdminCard` "Produtos mais vendidos" com a `ol` de `TOP_PRODUCTS` (nome e "{q} un.").
- **KPIs numa `ul[role=list]`,** como no Painel (hoje são filhos soltos da grade): a mesma marcação para o mesmo conteúdo. Grade: 1 coluna abaixo de `md`, 3 a partir de `md` (hoje: 3 a partir de `sm`, onde três cards de cerca de 136 px não comportam "R$ 12.450,00" em headline-m, estimativa).
- **"Produtos mais vendidos":** o card fica até 40rem (`max-width: 40rem`; hoje ocupa a largura toda, e em 1440 o nome e a quantidade ficariam a cerca de 1000 px um do outro). A `ol` com o número nativo (a classificação é uma sequência de verdade): `::marker` em body-m `on-surface-variant`, tabular; o nome em body-m `on-surface`; a quantidade em label-l 500 `on-surface`, tabular, no fim. Linhas com `padding-block: var(--space-2)` e o divisor `outline-variant` entre elas (hoje; decorativo). **Por que não lista segmentada:** dentro do card, os blocos brancos seriam card dentro de card; quatro linhas curtas se leem com o divisor.
- **Comportamento:** 1440, KPIs de 368 e a lista de 640; 1024, KPIs de 229; 390, tudo empilhado.
- **Movimento:** nenhum. **Reserva:** nome de produto longo quebra na linha; a quantidade fica no fim, sem quebra.

### 5.10 Meu perfil e Configurações (decisões o e n)

#### Meu perfil

- **Arquivos:** `src/views/admin/AdminProfile.vue` e `pages/admin/_admin-profile.scss`.

| Campo | Origem |
|---|---|
| `h1` | "Meu perfil" |
| Card | `AdminCard` "Administrador" |
| `dl` | "Nome" (`fullName`, "Administrador" na falta), "E-mail" ("—" sem e-mail), "Função" ("Administrador") |
| Nota | "Os dados do administrador ficam neste navegador. Para trocar o nome, o e-mail ou a senha, crie o administrador de novo, como explica o README do projeto." |
| Ação | "Sair" (`secondary`, `sign-out-alt`), no rodapé |

- **O card fica até 40rem** (`max-width: 40rem`, a coluna da confirmação): a nota fica com linhas de até cerca de 75 caracteres em body-m, e não 150.
- **`dl`:** 3 colunas a partir de `md` (hoje), uma abaixo; `dt` em body-m `on-surface-variant` (7,56), **sem caixa alta**; `dd` em body-l `on-surface` (13,93), `overflow-wrap: anywhere`.
- **Nota:** body-m `on-surface-variant`, a `--space-4` da `dl`. Texto que só existe por causa do `localStorage` (pacote, item 7): fica.
- **"Sair":** tonal `md` no rodapé, alinhado ao início. O "Sair" da coluna e o do menu fazem o mesmo (hoje).
- **Reservas:** nome e e-mail longos quebram (`overflow-wrap`); sem e-mail, "—".

#### Configurações

- **Arquivos:** `src/views/admin/AdminSettings.vue` e `pages/admin/_admin-settings.scss`.

| Campo | Origem |
|---|---|
| `h1` | "Configurações" |
| Card | `AdminCard` "Dados do painel" |
| Texto | "Os produtos criados, editados ou excluídos e o status dos pedidos ficam salvos neste navegador. Restaurar volta aos dados publicados com o site." |
| Ações | "Restaurar cardápio original" e "Restaurar pedidos de exemplo" (`secondary`, `rotate-left`) |
| Diálogo | "Restaurar o cardápio original?" / "Restaurar os pedidos de exemplo?", o texto de `RESETS`, "Cancelar" (`secondary`) e "Restaurar" (`danger`, `rotate-left`) |
| Avisos | "Cardápio original restaurado." e "Pedidos de exemplo restaurados." |

- **O card até 40rem;** o texto em body-m `on-surface-variant`; as duas ações tonais `md` no rodapé, com quebra, **alinhadas ao início** (hoje ao fim): no painel, as ações dos cards ficam no início, sob o texto que elas executam.
- **O diálogo (desta etapa):** o texto de hoje em body-l `on-surface`; "Cancelar" antes e "Restaurar" por último, alinhados ao fim (hoje); o foco inicial no título. Estados que só existem por causa do `localStorage` (pacote, item 7): ficam, com os componentes genéricos.
- **Da etapa 10:** o contêiner e o `danger`.

### 5.11 Login do admin (decisão q)

- **Arquivos:** `src/views/admin/LoginAdminView.vue` (`main#conteudo.admin-login`) e `pages/admin/_login-admin.scss`, que usa o `_auth.scss` da etapa 8 (não muda).
- **Objetivo:** entrar no painel, ou ver em texto por que não deu.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Ilustração | `background-admin-login` (1440 e 1920, `alt=""`) |
| `h1` | "Painel administrativo" |
| Campos | E-mail e Senha (com o "Mostrar senha" da etapa 8) |
| Botão | "Entrar" / "Entrando…" (filled M, `block`) |
| Banner | "E-mail ou senha incorretos." ou a mensagem do WebCrypto (`NO_WEBCRYPTO_MESSAGE`) |
| Só no `yarn dev` | "Desenvolvimento: o admin de teste entra sem cadastro." e "Usar admin de teste" (`secondary`, `sm`) |
| Saída | "Voltar à loja" (`/`) |

- **Ilustração e `scrim`:** a `picture` cobre a tela (`object-fit: cover`, hoje); a camada `::after` passa a `--m3-scrim` direto (32%; hoje o apelido `--color-overlay`, que já aponta para ele). O painel fica por cima (`--z-raised`).
- **`alt=""` continua certo:** a ilustração é decorativa e não traz informação; ela mostra comida que a casa não vende (pretzel, pizza, baguete, croissant; desenho da Home, L856), e um `alt` descritivo anunciaria isso. Fica pela SPEC-M §5.11, sem papel na leitura.
- **O contraste continua certo:** todo texto fica no painel `surface-container-low` (`h1` e rótulos 15,49, placeholder e ajuda 8,41, contorno 4,06, botão 5,82, banner 7,23; pares da etapa 8). Nada é texto sobre o `scrim` (pacote, item 8).
- **Painel:** o da etapa 8 (440 px, `low`, canto 28, padding 16, 24 e 32), centrado (`place-items: center`), com `padding: var(--space-7) var(--gutter)` na página (hoje): em 390, a margem de 16 dos dois lados.
- **O banner junto do botão (a pendência da etapa 8):** o `LoginAdminView` passa ao invólucro do login da loja: `div.auth-form__envio` (com `ref`) → `div.auth-form__anuncio[role=alert][aria-atomic=true]`, **sempre no DOM** → `div.auth-alert` (`v-if`) com o ícone num `span.auth-alert__icon` → e o botão "Entrar". O contêiner do erro no DOM desde o carregamento e o `aria-atomic` são o que a ARIA19 pede [152].
  - **O ícone:** passa para dentro do `span` de 20 px, como na loja; hoje o próprio `svg` recebe a classe e fica com 24 px de altura (o `/code-review` da etapa 8).
  - **A rolagem:** depois de mostrar o banner, `envioRef.value?.scrollIntoView?.({ block: "nearest" })`, como na loja (desenho da Conta, 5.3): uma regra só nos dois logins. Aqui tudo cabe na tela em 390 × 844, e a rolagem quase nunca acontece.
  - **O foco fica onde estava** (o botão, ou o campo do Enter) [151].
- **O bloco "Usar admin de teste" (só no `yarn dev`):** entre o formulário e o "Voltar à loja" (`SPEC.md` §5.11); borda de cima tracejada de 1 px `--m3-outline-variant` (decorativa, 1,53; o texto e o botão identificam o bloco [98]), `padding-top: var(--space-4)`, coluna com `gap: var(--space-3)`, alinhado ao início; o texto em body-m `on-surface-variant` (8,41); o tonal `sm`. Sai o `--color-border` e o `--text-sm`.
- **"Voltar à loja" vira text button:** `BaseButton variant="ghost" to="/"` (`md`, 44 px, tinta `primary`, 5,82 sobre o painel; pressionado 5,07), alinhado ao início com `margin-inline-start: calc(-1 * var(--space-3))` para o texto alinhar com o `h1` e os rótulos (o "Alterar no perfil" da etapa 7). **Por quê:** o link está sozinho no rodapé, e não numa frase: a exceção de alvo da 2.5.8 é para o link em texto corrido [78]. Continua link (`RouterLink`), porque navega.
- **Ordem do Tab:** E-mail, Senha, "Mostrar senha", Entrar, ["Usar admin de teste"], "Voltar à loja".
- **Movimento:** nenhum.
- **Reservas:** a mensagem do WebCrypto em 3 linhas em 390 (cerca de 104 px de banner); o `h1` em duas linhas em 1440 e 390 (hoje).

---

## 6. Matriz de estados

Mesmo formato da §6 do SPEC-M. "Anel" é o contorno de 3 px em `--m3-secondary`, afastado 2 px [30]; "anel interno", `outline-offset: calc(-1 * var(--focus-width))`; "anel encostado", `outline-offset: 0`; "camada", o `currentColor` a 8% no hover (só `hover-capable`) e 10% no pressionado [12]. Os modos de contraste ficam na última linha de cada grupo.

| Componente | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
|---|---|---|---|---|---|---|---|
| Item da navegação (coluna, `lg`+) | sem fundo; ícone e rótulo `on-surface-variant` (8,86); label-l 500; 56 px, pílula na largura do item | camada 8% | anel interno (6,14) | camada 10% (7,26; anel 5,03) | `aria-current="page"`: `secondary-container` / `on-secondary-container` (7,22), rótulo em 700; anel 4,99 | — | — |
| Item da navegação (gaveta, abaixo de `lg`) | o mesmo sobre `surface-container-low` (8,41), 56 px | camada 8% | anel interno (5,83) | camada 10% (6,90; anel 4,78) | o mesmo da coluna | — | — |
| Item da navegação nos modos de contraste | `forced-colors`: texto do sistema | — | anel | — | `forced-colors`: borda de 2 px `Highlight` (o precedente da pílula da loja); `prefers-contrast: more`: borda de 1 px `outline` (4,27 e 4,06) | — | — |
| Coluna (`lg`+) | `surface`, sem canto, sem sombra, sem borda | — | — | — | — | — | — |
| Gaveta | `div` com `role="dialog"`, `aria-modal` e "Menu do painel"; `surface-container-low`, cantos de 16 no lado de dentro, `elevacao-1`, sobre o `scrim` (32%); o skip link, o cabeçalho e o `main` `inert` (o aviso, não) | — | o foco entra no 1º link; ao fechar, volta ao "Alternar menu" depois do `nextTick` | — | aberta: `aria-expanded="true"` no "Alternar menu" | — | — |
| Gaveta nos modos de contraste | borda de 1 px (`CanvasText`; `outline` com mais contraste) | — | — | — | — | — | — |
| "Alternar menu", "Fechar", atalhos (até a etapa 10) | ghost `iconOnly` da Brasa: 44 × 44, ícone `on-surface-variant` (8,86) | fundo `camada-hover`, ícone `on-surface` (13,92) | anel | fundo `surface-container-high` (13,93) | — | — | — |
| Selo do atalho | some no 0; com pedidos: `error` / `on-error` (6,46), label-s 500, mín. 16 px, `full`; "9+" acima de 9 | — | — (`aria-hidden`; o foco é do link) | — | — | — | — |
| Selo nos modos de contraste | borda de 1 px (`CanvasText`; `outline`) | — | — | — | — | — | — |
| Busca | sem fundo; contorno 1 px `outline` (4,27), canto 12, 48 px; lupa e placeholder `on-surface-variant` (8,86) | contorno `on-surface` | contorno `primary` (6,13) + anel encostado (6,14) | — | — | — | — |
| Busca nos modos de contraste | `forced-colors`: contorno `CanvasText`; mais contraste: contorno `on-surface-variant` (8,86) | — | anel | — | — | — | — |
| Avatar | alvo 44, círculo de 32 `secondary-container` com as iniciais `on-secondary-container` (7,22) | camada 8% no alvo | anel (6,14) | camada 10% | menu aberto: `aria-expanded="true"` | — | — |
| Menu do perfil | `surface-container`, canto 16, `elevacao-2`; nome em title-s `on-surface` (14,68); a linha antes do "Sair" por CSS (`::after`, `outline-variant`) | — | o foco vai ao 1º item | — | — | — | — |
| Item do menu | pílula de 44 px; ícone `on-surface-variant` (7,97), rótulo `on-surface` (14,68) | camada 8% (12,56) | anel interno (5,53) | camada 10% (12,06; ícone 6,55; anel 4,54) | — | — | — |
| `AdminCard` (`default` e `kpi`) | `surface-container-high`, canto 12, sem sombra; título title-m 500 (`kpi`: label-l 500 `on-surface-variant`) | — (sem hover) | — (só os botões) | — | — | — | `aria-busy` só (sem opacidade) |
| Card de produto (`M3CartaoProduto`) | `surface-container-high`, canto 12, padding 8, foto 4:3; nome title-m 500, descrição body-m, preço title-m 500 | — (sem hover) | — (só os botões) | — | — | — | foto: reserva `surface-container`; falha: ícone `utensils` |
| Cards nos modos de contraste | borda de 1 px (`CanvasText`; com mais contraste, `outline`, 4,27 contra a `surface`) | — | — | — | — | — | — |
| Rótulo de status (`M3RotuloStatus`) | `{tom}` sobre `{tom}-container` (5,00 a 5,03), `forma-s`, label-l 500, 28 px | — (sem camada nem cursor) | — (não recebe foco) | — | — | — | — |
| Rótulo de status nos modos de contraste | borda de 1 px (`CanvasText`; `outline`); o texto fica | — | — | — | — | — | — |
| "Detalhes" (texto `sm` no card) | tinta `primary` (5,23 sobre o `high`) | camada 8% (4,71) | anel (5,25) | camada 10% (4,59; anel 4,60) | — | — | — |
| "Limpar busca" (texto `sm`) | tinta `primary` (6,13 sobre a `surface`), 40 px com alvo de 44 | camada 8% (5,48) | anel (6,14) | camada 10% (5,33) | — | — | — |
| "Voltar à loja" (texto `md`) | tinta `primary` (5,82 sobre o painel), 44 px | camada 8% (5,22) | anel (5,83) | camada 10% (5,07) | — | — | — |
| Seletor de imagem: caixa | contorno 1 px `outline` (3,85 sobre o diálogo), canto 12, 56 px | — (a caixa não é interativa) | — | — | — | — | — |
| Seletor de imagem: botão | tonal `md`: `secondary-container` / `on-secondary-container` (7,22) | `secondary-container-hover` (6,39) | anel (`:has(:focus-visible)`) | `secondary-container-pressed` (6,21), cantos `forma-s` | — | — | "Lendo a imagem…" no nome; o "Salvar" em `loading` (etapa 10) |
| Seletor de imagem com erro | contorno e rótulo `error` (5,54); a mensagem no lugar da ajuda | — | anel | — | — | — | — |
| Linha do resultado da busca | `role="status"` sempre no DOM; body-m `on-surface-variant` (8,86) | — | — | — | — | — | — |

Os estados de vazio seguem a §6 do `SPEC.md`: Pedidos e Produtos (com busca) sem resultado mostram o `EmptyState`; o Painel mostra o do gráfico (etapa 10).

---

## 7. Inventário

**Contagem:** entram **2 componentes** (`M3CartaoProduto` e `M3RotuloStatus`); mudam **8** (`AdminLayout`, `SidebarAdmin`, `TheNavbarAdmin`, `SearchBar`, `NotificationBar`, `UserProfileBar`, `AdminCard` e `ModalProducts`, todos com o nome e a API de hoje) e **8 views** (`AdminDashboard`, `ProductManagement`, `OrderManagement`, `SalesReports`, `AdminProfile`, `AdminSettings`, `LoginAdminView` e, numa linha, `ProfileView`). Nada vem de `src/direcoes/`. Nenhuma prop nova nos componentes que mantêm o nome.

### 7.1 `M3CartaoProduto` (novo; `src/components/admin/`)

- **Props:** `produto: { type: Object, required: true }`; `nivelTitulo: { type: [Number, String], default: 2 }`.
- **Slots:** `acoes`. **Emits:** nenhum.
- **Estrutura:** `article.m3-cartao-produto` → `M3Foto.m3-cartao-produto__foto` → `div.m3-cartao-produto__corpo` (`h{n}.m3-cartao-produto__nome`, `p.m3-cartao-produto__descricao`, `p.m3-cartao-produto__preco.tabular`) → `div.m3-cartao-produto__acoes`.
- **Usa:** `M3Foto`, `responsiveImage` (`@/composables/useResponsiveImage`), `formatPrice` (`@/utils/formatters`) e um `ref(false)` para a imagem que falha; **não** usa o `useCartaoProduto` (o "Adicionado", o temporizador e o `atributosAdicionar` são do fluxo de compra; volta 1).
- **Tokens:** `--m3-surface-container-high`, `--m3-forma-m`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-title-m` (e a linha), `--m3-body-m` (e a linha e o tracking), `--space-1` a `--space-4`.
- **Mixins:** `tipo`, `linhas`, `reserva-de-sombra`, `up`.
- **Referências:** [63], [34], [64], [H19].

### 7.2 `M3RotuloStatus` (novo; `src/components/ui/`)

- **Props:** `tom: { type: String, default: "info", validator: (v) => ["info", "aviso", "sucesso"].includes(v) }`.
- **Slots:** padrão. **Emits:** nenhum.
- **Estrutura:** `p.m3-status.m3-status--{tom}`.
- **Tokens:** `--m3-info`, `--m3-info-container`, `--m3-aviso`, `--m3-aviso-container`, `--m3-sucesso`, `--m3-sucesso-container`, `--m3-forma-s`, `--m3-label-l` (a linha e o `--m3-label-l-tracking`), `--space-1`, `--space-2`.
- **Mixins:** `tipo`, `reserva-de-sombra`.
- **Referências:** [7], [60], [141], [98], [99].

### 7.3 `AdminLayout` (muda)

- **Estrutura:** a de hoje (skip link, `header.admin-header` com o `TheNavbarAdmin`, `div.admin-overlay`, `SidebarAdmin`, `main#conteudo.admin-main`).
- **Lógica de apresentação:** o `computed` `gavetaAberta`; `:inert="gavetaAberta || undefined"` no skip link, no `header` e no `main` (a região dos avisos, no `App.vue`, fica de fora); o `closeSidebar` assíncrono, com `await nextTick()` antes do `toggleButton?.focus()` (volta 1, bloqueante); `closeSidebar({ returnFocus: true })` no clique do `scrim`; no `watch` da rota, o foco ao `main` depois do `nextTick` quando ele estava na gaveta (a troca só de query).
- **Parcial:** a grade a partir de `lg`; o cabeçalho `sticky`; o `main` sem `padding-top`; o `scrim` em `--m3-scrim`; os `:global()` do aviso no pé (`html:has(.admin-layout) .toast-region`, 4.6) e da reserva; sem `240px` escrito.

### 7.4 `SidebarAdmin` (muda)

- **API:** `closable` (`Boolean`, `false`); emite `close`; expõe `focusFirst` (hoje).
- **Estrutura (muda na volta 1):** `div#admin-sidebar.admin-sidebar` no lugar do `aside`, com `role="dialog"`, `aria-modal="true"` e `aria-label="Menu do painel"` só com `closable`; a `nav` "Seções do painel" envolve a cabeça, a lista e o pé (5.1).
- **Parcial:** coluna e gaveta pela tabela de 5.1; o item de 56 px; a marca sem caixa alta; o divisor do pé; os `@keyframes` com `transform` só em `motion-ok`.

### 7.5 `TheNavbarAdmin`, `SearchBar`, `NotificationBar`, `UserProfileBar` (mudam)

- **`TheNavbarAdmin`:** API e lógica de hoje; a parcial muda os recuos (5.1).
- **`SearchBar`:** API de hoje; a parcial vira o campo outlined de 48 (5.2); a lupa sem `translate`.
- **`NotificationBar`:** API de hoje; `aria-current="false"` em cada `BaseButton`; o selo com o visual do badge (5.2).
- **`UserProfileBar`:** API e teclado de hoje; o `span` do círculo dentro do botão; o `<Transition>` de opacidade no menu; uma classe no `button` do "Sair" (para a linha por `::after`); a parcial, com o menu em `surface-container` (5.2).

### 7.6 `AdminCard` e `ModalProducts` (mudam)

- **`AdminCard`:** API de hoje; sai a opacidade do `.is-loading`; `height: 100%`; a parcial (5.4).
- **`ModalProducts`:** API de hoje; o `div.modal-product__par` em volta de Preço e Quantidade; o `div.file-picker__campo` em volta do botão e do nome; o rótulo "Imagem" sem `id`; a ajuda só sem erro; `imageDescribedBy` com um id só; o ícone do erro num `span` (5.8).

### 7.7 Views (mudam)

- **`OrderManagement`:** `M3RotuloStatus` com o mapa de tons (nos cards e no diálogo); a linha da busca (região sempre no DOM, "Limpar busca" fora dela); a última entrada (`pointerdown` e `keydown` na captura do `document`, tirados no `onBeforeUnmount`) e a rolagem só pelo teclado depois do aviso (4.6).
- **`ProductManagement`:** `M3CartaoProduto` no lugar do `ProductCard` (`:produto`, `:nivel-titulo="2"`, slot `#acoes`); a linha da busca.
- **`AdminDashboard`, `SalesReports`, `AdminProfile`, `AdminSettings`:** classes e marcação de 5.9 e 5.10 (a `ul` dos KPIs nos Relatórios).
- **`LoginAdminView`:** o invólucro do banner, a rolagem do grupo, o ícone no `span`, o "Voltar à loja" como `BaseButton` (5.11).
- **`ProfileView`:** o `M3RotuloStatus` no lugar do `p` do status (5.5).

### O que fica sem uso (para a etapa 11, salvo quando dito)

- **`ProductCard.vue`:** nada da produção o usa depois desta etapa. O único import que sobra é o do `CarouselBurguer.vue`, que já não é importado por ninguém e sai na etapa 11 (SPEC-M §4.4); ele fica, e a PR registra que a busca o acha. Com ele saem, na etapa 11, o `_product-card.scss`, o `useTilt.js` e, do `_motion.scss`, as classes `.add-btn__inner`, `.add-btn__face` e `.product-card`.
- **Comentários que citam o `ProductCard` (volta 1):** a sessão C reescreve o comentário da linha 1 do `pages/admin/_product-management.scss` (que passa a falar da grade do `M3CartaoProduto`) e pode trocar **só o comentário** do `src/components/M3CartaoLanche.vue` (L4) e do `src/composables/useCartaoProduto.js` (L2 e L9). **Resultado esperado da busca do plano por `ProductCard`** (fora de `src/direcoes/`): o `ProductCard.vue`, o `_product-card.scss` e o `CarouselBurguer.vue`, mais nada.
- **Apelidos que ficam sem uso em `src/`** (conferido com `grep`, fora de `src/direcoes/` e do `_tokens.scss`): `--color-accent-soft` (só a sidebar), `--color-warning`, `--color-warning-soft`, `--color-info-soft`, `--color-success-soft` (só os chips de hoje), `--color-input` (só a busca) e `--text-2xl` (só o KPI). Ficam com uso fora do painel: `--color-success` e `--color-info` (o aviso), `--color-overlay` e `--color-surface-2` (o `BaseDialog`, etapa 10), `--elev-1` e `--color-sheen` (só no `_product-card.scss`, que sai na 11), `--color-surface-sunken` e `--color-surface-1` (só no `_footer.scss` e no `_navbar.scss`, folhas da moldura da Brasa que saem na etapa 11, SPEC-M §4.4). Os testes que citam alguns desses nomes (`conta-estilo.test.js`) a sessão C confere. O `--radius-round` fica pela decisão (a) (o acervo).
- **Pares:** o "item atual da sidebar" (`PARES_TELAS_BRASA`) sai já na sessão C; os de `PARES_COMUNS` com o `--color-input` ficam sem nenhum uso e saem com os apelidos.
- **Ícones:** nenhum fica sem uso (o `burger` continua no `M3Foto` e no feed).

---

## 8. Tokens, pares, lógica, dependências e textos

### Tokens novos

| Token | Valor sugerido | Uso | Fonte |
|---|---|---|---|
| `--m3-navegacao-largura` | `15rem` (240 px; o valor final é do construtor) | Largura da coluna fixa e da gaveta | mín. 240 dp da folha [165]; de 220 a 360 no rail expandido [174]; o valor de hoje |

O resto usa o que existe: `--m3-forma-m`, `--m3-forma-l`, `--m3-forma-s`, `--m3-forma-full`, `--m3-elevacao-1`, `--m3-elevacao-2`, `--m3-scrim`, `--m3-toast-reserva`, `--navbar-h`, `--target-min`, `--container-max`, `--z-navbar`, `--z-overlay`, `--z-sidebar`, `--z-raised`, `--dur-fast`, `--dur-base`, `--m3-dur-mola-efeitos-rapida`, `--m3-ease-emphasized-decelerate`. As alturas de 56, 48 e 32 px são `3.5rem`, `3rem` e `2rem`, como o FAB, a pílula e o campo da loja. Nenhuma cor, duração ou `z-index` novo.

### Pares novos (para `src/utils/contraste.js`, num grupo `PARES_ADMIN`; medidos)

| Frente | Fundo | Mínimo | Medido | Onde |
|---|---|---|---|---|
| `m3-on-surface-variant` | `m3-camada-pressionada` sobre `m3-surface` | 4,5 | 7,26 | Item da navegação pressionado na coluna |
| `m3-on-surface-variant` | `m3-camada-pressionada` sobre `m3-surface-container-low` | 4,5 | 6,90 | Item da gaveta pressionado |
| `m3-secondary` | `m3-camada-pressionada` sobre `m3-surface` | 3 | 5,03 | Anel interno do item pressionado na coluna |
| `m3-secondary` | `m3-camada-pressionada` sobre `m3-surface-container-low` | 3 | 4,78 | Anel interno do item pressionado na gaveta |
| `m3-on-surface` | `m3-camada-pressionada` sobre `m3-surface-container` | 4,5 | 12,06 | Rótulo do item do menu do perfil pressionado (no hover, 12,56; volta 1, o menu passou a `surface-container`) |
| `m3-primary` | `m3-surface-container-high` | 4,5 | 5,23 | "Detalhes" (texto) no card do pedido |
| `m3-primary` | `m3-camada-primary-pressionada` sobre `m3-surface-container-high` | 4,5 | 4,59 | "Detalhes" pressionado (no hover, 4,71) |
| `m3-secondary` | `m3-camada-primary-pressionada` sobre `m3-surface-container-high` | 3 | 4,60 | Anel do "Detalhes" pressionado |
| `m3-error` | `m3-surface-container-high` | 4,5 | 5,25 | "Excluir" (`danger`) no card de produto |

### Pares que ganham uso, mudam de grupo ou saem

| Par | Medido | O que acontece |
|---|---|---|
| `m3-secondary` sobre `m3-surface-container-high` (`PARES_TELAS_BRASA`, "anel de foco no toast e nos menus") | 5,25 | Passa a `PARES_ADMIN`: anel nos cards e no aviso (o menu foi para o `surface-container`) |
| `m3-on-surface` / `m3-on-surface-variant` sobre `m3-surface-container-high` (`PARES_HOME`, folha) | 13,93 / 7,56 | O "onde" ganha: títulos, valores, textos, notas e `dt` dos cards; rótulos dos KPIs, endereço e telefone, descrição do produto |
| `m3-on-surface` / `m3-on-surface-variant` sobre `m3-surface-container` (`PARES_HOME`) | 14,68 / 7,97 | Ganham: cabeça e rótulos dos itens do menu do perfil / ícones do menu (volta 1) |
| `m3-secondary` sobre `m3-surface-container` (`PARES_HOME`, mín. 3) | 5,53 | Ganha: anel interno dos itens do menu |
| `m3-on-surface-variant` e `m3-secondary` sobre `m3-camada-pressionada` sobre `m3-surface-container` (`PARES_CARDAPIO`) | 6,55 / 4,54 | Ganham: ícone e anel interno do item do menu pressionado |
| `m3-on-surface-variant` sobre `m3-surface` | 8,86 | Ganha: itens da coluna, ícones da barra, lupa e placeholder da busca, seta dos filtros, linha da busca |
| `m3-on-surface-variant` sobre `m3-surface-container-low` | 8,41 | Ganha: itens da gaveta; texto do bloco do admin de teste |
| `m3-on-secondary-container` sobre `m3-secondary-container` | 7,22 | Ganha: item atual da navegação, avatar, botão de imagem |
| `m3-secondary` sobre `m3-secondary-container` | 4,99 | Ganha: anel interno no item atual |
| `m3-on-secondary-container` sobre `m3-secondary-container-pressed` | 6,21 | Ganha: item atual pressionado (a camada de 10% de `on-secondary-container` sobre o contêiner dá a mesma cor, #c6d8c0) |
| `m3-outline` sobre `m3-surface` (`PARES_HOME`, mín. 3) | 4,27 | Ganha: contorno da busca e dos filtros do painel; borda dos cards, da gaveta e do rótulo com `prefers-contrast: more` |
| `m3-outline` sobre `m3-surface-container` (`PARES_CONTA`, "filtros do admin") | 3,85 | O "onde" muda: os filtros vão para a `surface`; fica o diálogo (observação, campos do `ModalProducts`) e a caixa do seletor de imagem |
| `m3-primary` sobre `m3-surface` | 6,13 | Ganha: contorno e rótulo com foco da busca e dos filtros; "Novo produto"; "Limpar busca" |
| `m3-primary` sobre `m3-camada-primary-pressionada` sobre `m3-surface` (`PARES_CONTA`) | 5,33 | Ganha: "Limpar busca" pressionado |
| `m3-primary` sobre `m3-surface-container-low` / pressionado (`PARES_CARRINHO`) | 5,82 / 5,07 | Ganham: "Voltar à loja" |
| `m3-on-error` sobre `m3-error` | 6,46 | Ganha: selos dos atalhos do painel |
| `m3-aviso`, `m3-info`, `m3-sucesso` sobre os contêineres (`PARES_OUTRAS_TELAS`) | 5,03 / 5,00 / 5,01 | O "onde" troca "chip" por "rótulo de status (`M3RotuloStatus`)": "Pendente"; "Em preparo", "A caminho" e "Recebido"; "Concluído" |
| `m3-error` sobre `m3-surface-container` | 5,54 | Ganha: contorno, rótulo e mensagem do seletor de imagem com erro |
| `m3-on-surface` sobre `m3-primary-container` (`PARES_TELAS_BRASA`, "item atual da sidebar até a etapa 9") | 13,24 | **Sai** na sessão C |

### Medidos e descartados ou isentos

- `m3-secondary-container` contra `m3-surface` / `m3-surface-container-low`: 1,23 / 1,16. O indicador do item atual: troca de fundo dentro do componente, fora da 1.4.11 [98]; para a 1.4.1, o rótulo em 700, pela lista de pistas da G182 [215] (inferência: ela trata de texto colorido) e o "shape or text" da [99], e o `aria-current` por programa (5.1).
- `m3-surface-container` (menu do perfil) contra `m3-surface` e contra `m3-surface-container-high`: 1,11 e 1,05. Superfície flutuante, separada também pela `elevacao-2`; não é componente [98]; nos modos de contraste, a borda.
- `m3-surface-container-high` contra `m3-surface`: 1,17. O card contra a página: não é componente [98].
- `m3-surface-container-highest` contra `m3-surface`: 1,22; `m3-primary` sobre `m3-camada-primary-pressionada` sobre `m3-surface-container-highest`: 4,38 (hover 4,50). Por isso o card fica no `high` (5.4).
- `m3-aviso-container`, `m3-info-container`, `m3-sucesso-container` contra `m3-surface-container-high`: 1,05, 1,05 e 1,04 (1,10 contra o `surface-container` do diálogo). O texto leva o estado [98].
- `m3-secondary-container` contra `m3-surface` (avatar) e contra `m3-surface-container-high` (tonal no card): 1,23 e 1,05. Controle com texto dispensa borda [98].
- `m3-error-container` contra `m3-surface-container-high`: 1,05. Fundo do `danger` no hover; o texto `error` sobre ele dá 4,99.
- `m3-outline-variant` contra `m3-surface`, `m3-surface-container-low`, `m3-surface-container` e `m3-surface-container-high`: 1,61, 1,53, 1,45 e 1,38. Divisores decorativos (o do pé da coluna, o do Total, o da lista dos Relatórios, o do bloco do admin de teste) [98].

### Lógica (nenhuma mudança de fluxo, de serviço nem de store; só o que a apresentação pede)

| O que | Onde | Por quê |
|---|---|---|
| `inert` no skip link, no cabeçalho e no `main` com a gaveta aberta abaixo de `lg` (a região dos avisos fica de fora) | `AdminLayout` | Gaveta modal de fato ([199], [200]) |
| O contêiner da coluna vira `div`; abaixo de `lg`, `role="dialog"`, `aria-modal` e "Menu do painel"; a `nav` envolve a coluna inteira | `SidebarAdmin` | [199], [210] (decisão da sessão principal) |
| `closeSidebar` assíncrono: fecha, `await nextTick()`, e só então foca o "Alternar menu"; o clique no `scrim` também devolve o foco | `AdminLayout` | F85 [202]; [167]; o `focus()` em `inert` não faz nada (4.2) |
| Na troca de rota com a gaveta aberta e o foco dentro dela, o foco ao `main` depois do `nextTick` | `AdminLayout` | A troca só de query, em que o `afterEach` não move o foco (4.2) |
| `aria-current="false"` nos dois atalhos | `NotificationBar` | Um item atual por página [207] (4.3) |
| Região `role="status"` com `aria-atomic` sempre no DOM; "Limpar busca" fora dela | `ProductManagement`, `OrderManagement` | [153] (5.3) |
| Mapa `status` → `tom` | `OrderManagement` | O rótulo de status (5.5) |
| A última entrada e a rolagem só pelo teclado depois do aviso do "Atualizar status" | `OrderManagement` | 2.4.11 [76]; o precedente do `CartView` (4.6) |
| O aviso no pé (`:global(html:has(.admin-layout) .toast-region)`, `top: auto`, `bottom` com a área segura) e a reserva no `scroll-padding` enquanto há aviso | `_admin-layout.scss` | 4.6 |
| O erro do seletor de imagem no lugar da ajuda (DOM e `aria-describedby`) | `ModalProducts` | [131] (5.8) |
| O invólucro do banner com a região `role="alert"` e `aria-atomic` sempre no DOM, e a rolagem do grupo de envio | `LoginAdminView` | [152] (5.11) |
| O `<Transition>` de opacidade no menu | `UserProfileBar` | 5.2 |
| O `M3RotuloStatus` no lugar do `p` | `ProfileView` | 5.5 |

Nada muda em `src/services/`, nas stores (`adminOrders`, `products`, `adminStore`), nos dados de exemplo (`adminOrders.js`, `salesSample.js`), no `useAdminLogout`, no `search.js`, no `productForm.js`, nas esperas simuladas, no router nem no admin de teste (`devTestAdmin`, só no `yarn dev`).

### Dependências

Nenhuma. **Ícones:** nenhum novo; todos já estão no plugin (`bars`, `xmark`, `bell`, `tasks`, `user`, `cog`, `sign-out-alt`, `tachometer-alt`, `utensils`, `shopping-cart`, `chart-line`, `magnifying-glass`, `plus`, `trash-can`, `rotate-left`, `circle-exclamation`, `chevron-down`, `eye`, `eye-slash`).

### Textos

Todos reais. **Nenhuma palavra muda.** Mudam só apresentações:

| Texto | Antes | Depois | Motivo |
|---|---|---|---|
| "Smash Burger" na sidebar | caixa alta pelo CSS ("SMASH BURGER") | "Smash Burger" | A grafia da marca (CLAUDE.md; SPEC-M §0) |
| "Cliente", "Itens" (card e diálogo) e os `dt` ("Status", "Cliente", "Endereço", "Telefone", "Nome", "E-mail", "Função") | caixa alta pelo CSS | caixa normal | O padrão genérico do rótulo em caixa alta (pacote, item 11) |
| "Voltar à loja" | link na frase (`link-inline`) | text button (o mesmo link) | Link solto, sem a exceção de alvo [78] (5.11) |
| "Limpar busca" | `link-inline` dentro da região | text button fora da região | [78], [153] (5.3) |
| A ajuda do seletor de imagem | junto com o erro | some com o erro | [131] (5.8) |

Ficam como estão (todos os da tabela de conteúdo do pacote, §3): a navegação, "Alternar menu", "Fechar", "Sair", "Buscar…", "Buscar produtos e pedidos", os nomes dos atalhos com o número, "9+", "Menu de {nome}", "Meu perfil", "Configurações", os `h1`, os KPIs, o `EmptyState` do gráfico, os filtros e as opções, os textos dos cards, dos diálogos, do `ModalProducts`, do perfil, das Configurações e do login, os avisos.

**Perguntas de texto ao usuário:** seção 12 (o preço da linha no card do pedido; os rótulos da navegação; o texto da categoria vazia em Produtos).

---

## 9. Arquivos para o construtor (sessão C)

```
src/assets/styles/base/_tokens.scss                        --m3-navegacao-largura
src/assets/styles/base/_motion.scss                        .admin-sidebar na lista de transform: none
src/layouts/AdminLayout.vue                                inert, closeSidebar assíncrono (nextTick antes do
                                                           focus), foco de volta no clique do scrim, foco ao
                                                           main na troca de rota com a gaveta aberta
src/assets/styles/layouts/_admin-layout.scss               grade em lg, cabeçalho sticky, scrim, aviso no pé
                                                           e a reserva (:global)
src/components/admin/layout/SidebarAdmin.vue               div no lugar do aside; role="dialog", aria-modal e
                                                           o nome abaixo de lg; a nav envolve a coluna
src/assets/styles/components/admin/_sidebar-admin.scss     coluna, gaveta, item de 56, marca, pé
src/components/admin/layout/TheNavbarAdmin.vue             (marcação de hoje)
src/assets/styles/components/admin/_navbar-admin.scss      recuos e vãos
src/components/admin/layout/navbar/SearchBar.vue           (marcação de hoje)
src/assets/styles/components/admin/navbar/_search-bar.scss campo outlined de 48, lupa sem translate
src/components/admin/layout/navbar/NotificationBar.vue     aria-current="false"
src/assets/styles/components/admin/navbar/_notification-bar.scss  selo do M3
src/components/admin/layout/navbar/UserProfileBar.vue      círculo de 32, Transition de opacidade, classe do
                                                           "Sair"
src/assets/styles/components/admin/navbar/_user-profile-bar.scss  avatar, menu em surface-container, itens,
                                                           a linha antes do "Sair" (::after)
src/components/admin/AdminCard.vue                         (marcação de hoje)
src/assets/styles/components/admin/_admin-card.scss        filled card high, sem sombra, sem opacidade,
                                                           height: 100%
src/components/admin/ModalProducts.vue                     par Preço e Quantidade, caixa do seletor, rótulo
                                                           sem id, erro no lugar da ajuda
src/assets/styles/components/admin/_modal-products.scss    seletor alinhado ao FormGroup
src/components/admin/M3CartaoProduto.vue                   novo
src/assets/styles/components/admin/_m3-cartao-produto.scss novo
src/components/ui/M3RotuloStatus.vue                       novo
src/assets/styles/components/ui/_m3-rotulo-status.scss     novo
src/views/admin/AdminDashboard.vue                         (classes)
src/views/admin/ProductManagement.vue                      M3CartaoProduto, linha da busca
src/views/admin/OrderManagement.vue                        M3RotuloStatus, linha da busca, rolagem só pelo
                                                           teclado depois do aviso
src/views/admin/SalesReports.vue                           ul dos KPIs
src/views/admin/AdminProfile.vue                           (classes)
src/views/admin/AdminSettings.vue                          (classes)
src/views/admin/LoginAdminView.vue                         invólucro do banner, rolagem, ícone no span,
                                                           "Voltar à loja" como BaseButton
src/views/auth/ProfileView.vue                             M3RotuloStatus (uma linha)
src/assets/styles/pages/auth/_profile.scss                 .profile-order__status só com a margem
src/assets/styles/pages/admin/_admin-page.scss             cabeçalho, filtro, linha da busca, KPI; sai
                                                           o comentário com "Archivo"
src/assets/styles/pages/admin/_admin-dashboard.scss        card do gráfico
src/assets/styles/pages/admin/_product-management.scss     grade de 1, 2, 3 e 4 colunas; o comentário da L1
                                                           sem o ProductCard
src/components/M3CartaoLanche.vue                          só o comentário da L4 (cita o ProductCard)
src/composables/useCartaoProduto.js                        só os comentários da L2 e da L9 (citam o ProductCard)
src/assets/styles/pages/admin/_order-management.scss       card do pedido e diálogo, sem caixa alta
src/assets/styles/pages/admin/_sales-reports.scss          grade e lista
src/assets/styles/pages/admin/_admin-profile.scss          card de 40rem, dl
src/assets/styles/pages/admin/_admin-settings.scss         card de 40rem, ações ao início
src/assets/styles/pages/admin/_login-admin.scss            --m3-scrim, bloco do admin de teste
src/utils/contraste.js                                     PARES_ADMIN (9), os "onde" e as mudanças de grupo
                                                           da seção 8, e o par que sai
```

**Não mexer:** `BurgerStack.vue`, `AssinaturaEncaixe.vue`, `src/direcoes/`, `src/services/`, `src/stores/`, os dados de exemplo, `src/router/index.js`, `FormGroup.vue` e `_auth.scss` (etapa 8), `BaseButton`, `BaseDialog`, `EmptyState`, `AppToast` e as parciais deles (etapa 10), `M3BarraSuperior`, `M3BarraFerramentas` e as parciais (etapa 4), `M3Foto`, `ProductCard.vue`, `_product-card.scss`, `useTilt.js` e `CarouselBurguer.vue` (saem na 11), o plugin do Font Awesome (nenhum ícone novo). **Só o comentário:** `M3CartaoLanche.vue` (L4) e `useCartaoProduto.js` (L2 e L9); o código dos dois não muda.

**A busca do `ProductCard` (verificação do plano; volta 1):** depois desta etapa, a busca por `ProductCard` fora de `src/direcoes/` acha o `ProductCard.vue`, o `_product-card.scss` e o `CarouselBurguer.vue`, mais nada. A PR registra que o `CarouselBurguer.vue` fica (sem uso, sai na etapa 11).

**Testes:**

- `src/__tests__/M3RotuloStatus.test.js` (novo): raiz `p`, sem `role` nem `tabindex`; a classe do `tom` (`info` por padrão; `aviso`, `sucesso`); o validador recusa outro valor; o slot.
- **O estilo do `M3RotuloStatus`** (num `m3-rotulo-status-estilo.test.js` ou no `admin-estilo.test.js`, a critério da sessão C): recebe as asserções que hoje estão no `src/__tests__/conta-estilo.test.js` (L406–418) sobre o `.profile-order__status` (cor e fundo por tom, `--m3-forma-s`, `var(--space-1) var(--space-2)`, `--m3-label-l`, 500, sem `cursor`, sem `::before`, `1px solid CanvasText` em `forced-colors`), mais o `letter-spacing: var(--m3-label-l-tracking)`.
- `src/__tests__/conta-estilo.test.js`: o caso do rótulo de status sai; fica só a margem do `.profile-order__status` (L404).
- `src/__tests__/M3CartaoProduto.test.js` (novo): o nome em `h2` por padrão e em `h3` com `nivelTitulo`; a descrição só com texto; o preço por `formatPrice`; o slot `acoes`; a foto com `alt` igual ao nome; a imagem `data:` sem `<source>`; a falha com o ícone `utensils`; nenhum botão "Adicionar" nem `data-adicionado`.
- `src/__tests__/ProductManagement.test.js`: o stub do `ProductCard` vira o do `M3CartaoProduto` (prop `produto`, slot `acoes`); a região `role="status"` com `aria-atomic` existe vazia sem busca e tem o resultado com `?q=`; o "Limpar busca" fica fora da região.
- `src/__tests__/OrderManagement.test.js`: os rótulos em português com o tom certo ("Pendente" `m3-status--aviso`, "Em preparo" e "A caminho" `--info`, "Concluído" `--sucesso`), no card e no diálogo; os `h3` "Cliente" e "Itens"; a região da busca; com a última entrada de teclado, o `scrollIntoView` (espião) cai no "Atualizar status" depois do aviso; com a de ponteiro, não.
- `src/__tests__/ModalProducts.test.js`: com erro de imagem, `aria-describedby="image-erro"` e sem o `#image-ajuda`; sem erro, `image-ajuda`; o par Preço e Quantidade no mesmo `div.modal-product__par`; o `file-picker__campo` com `.has-error` no pai.
- `src/__tests__/adminPanel.test.js`: o stub do `ProductCard` troca pelo do `M3CartaoProduto`; os testes da busca seguem com a região sempre no DOM.
- `src/__tests__/AdminLayout.test.js` (novo, ou um bloco do `adminPanel.test.js`, a critério da sessão C): com `matchMedia` abaixo de `lg`, a gaveta abre, o `div#admin-sidebar` tem `role="dialog"`, `aria-modal="true"` e "Menu do painel", e o `header`, o `main` e o skip link ganham `inert`; Esc, "Fechar" e o clique no `scrim` tiram o `inert` **antes** do `focus()` (um espião no `focus` do botão confere que, quando ele é chamado, o `header` já não tem `inert`); a troca de rota fecha e tira o `inert`; a troca só de query, com o foco num link da gaveta, leva o foco ao `main`; a partir de `lg`, nenhum `inert`, nenhum `role` nem `aria-label` no `div`. **O jsdom não implementa o `inert`:** a prova de que o foco chega ao botão é a do Chromium (e2e, abaixo).
- `src/__tests__/LoginAdminView.test.js` (novo): a região `[role=alert][aria-atomic=true]` existe vazia na montagem; com a senha errada, "E-mail ou senha incorretos." dentro dela, logo antes do botão de envio; o ícone num `span.auth-alert__icon`; "Voltar à loja" é link para `/` com as classes do `BaseButton`; o bloco do admin de teste só com o `devTestAdmin()` (o `build-config.test.js` continua conferindo o build).
- `src/__tests__/ProfileView.test.js`: o `.profile-order__status` continua `p`, sem papel e sem `tabindex`, agora com `m3-status--info`.
- `src/__tests__/admin-estilo.test.js` (novo, no padrão do `conta-estilo.test.js`, com as parciais compiladas pelo `sass-embedded` e pelo `<style scoped>`): nenhum `--color-*`, `--text-2xl`, `--elev-*`, `--radius-sm` nem `--radius-round` nas parciais do painel; nenhum `text-transform: uppercase`; nenhum `240px`; o item com `min-height: 3.5rem` na coluna e na gaveta; o item atual com `--m3-secondary-container`, `--m3-on-secondary-container` e `font-weight: 700`; o anel interno no item; o menu do perfil em `--m3-surface-container`, com a linha do "Sair" no `::after`; o `.admin-card` com `height: 100%`; a regra `html:has(.admin-layout) .toast-region` com `top: auto`; o `transform` da gaveta só dentro de `prefers-reduced-motion: no-preference`; o `.admin-sidebar` no `_motion.scss`; o card em `--m3-surface-container-high` sem `box-shadow`; o selo em `--m3-error`; a busca com `min-height: 3rem` e contorno `--m3-outline`, sem `translate`; as regras de `forced-colors` (item atual com `Highlight`, selo, rótulo, cards, gaveta); os `:global()` do aviso no pé e da reserva; e todos os pares de `PARES_ADMIN` acima do mínimo.

**e2e (`.claude/e2e/`):**

- `check-admin.mjs`:
  - um único `.admin-sidebar__item[aria-current="page"]` nas quatro rotas da coluna, **nenhum em `#/admin/profile` e `#/admin/settings`**, e um só `[aria-current="page"]` na página inteira em `#/admin/orders?status=pending`;
  - a marca com `text-transform: none` e o texto "Smash Burger";
  - em 390: a gaveta fechada ao carregar; aberta, o `#admin-sidebar` com `role="dialog"` e `aria-modal`, o `main` e o `header` com `inert`, o foco em "Painel";
  - **a volta do foco, no Chromium (bloqueante da volta 1):** abrir a gaveta em 390 e fechá-la pelo Esc, pelo "Fechar" e pelo clique no `scrim`, e conferir, nas três, que o `document.activeElement` é o "Alternar menu". Mutação: com o `focus()` antes do `nextTick`, o foco fica no `body`. O jsdom não pega isso (não implementa o `inert`);
  - **a troca de rota:** pelo link "Gestão de Produtos", o foco vai ao `main`; **e a troca só de query:** em `#/admin/orders?status=pending`, abrir a gaveta e clicar (ou Enter) em "Gestão de Pedidos": a gaveta fecha, a rota passa a `#/admin/orders`, e o `document.activeElement` é o `main#conteudo` (sem a correção, é o `body`);
  - em 1440: o `#admin-sidebar` sem `role`, e a `nav` "Seções do painel" contém a marca e o "Sair";
  - os status: `.m3-status` (no lugar do `.status-chip`) com "Pendente,Em preparo";
  - os seletores de hoje que ficam: `.admin-sidebar`, `.admin-sidebar__item`, `.admin-overlay`, `.navbar-profile__avatar`, `.navbar-profile__menu`, `.kpi__value`, `.order-info__total`, `#statusFilter`.
- **Quem procura `aside` ou `.admin-sidebar` (o `aside` vira `div`; a sessão C confere):** o `check-admin.mjs` (L35, L41, L52, L57, L63 e L68: `.admin-sidebar` e `.admin-sidebar__item`, pela classe, que fica) e o `lacunas.mjs` (L110, L114 e L119, idem). Nenhum teste de `src/__tests__/` procura `aside` nem "Menu do painel" hoje (conferido com `grep`); o `axe-scan.mjs` passa a medir o diálogo da gaveta.
- `keyboard.mjs`:
  - no bloco do admin, o seletor do avatar continua `.navbar-profile__avatar`;
  - **a gaveta em 390:** aberta pelo teclado, Tab a partir do "Sair" não cai no `header` nem no `main` (estão `inert`), e Shift+Tab a partir de "Painel" vai ao "Fechar"; o Esc devolve o foco ao "Alternar menu" (a mesma prova do `check-admin.mjs`, pelo teclado);
  - **o aviso sobre o "Atualizar status":** em 390 × 844 e 800, com o card de baixo encostado no pé, chegar ao botão pelo Tab, apertar Enter e conferir que o retângulo do botão com o anel não fica inteiro dentro do `.toast`. Mutação: sem a rolagem da view, fica coberto. Pelo ponteiro, a página não pula;
  - **o "Novo produto" depois de criar,** em 1024 × 768 e 1440 × 900, pelo teclado: o foco volta ao botão, e ele não fica sob o aviso (que agora está no pé). E os diálogos de editar e de restaurar com o botão de origem no pé, em 390: se o foco voltar coberto, a view ganha a mesma rolagem do "Atualizar status" (4.6);
  - o `focusNotCovered` nas seis rotas do painel em 1440 e 390.
- `axe-scan.mjs`: os estados abaixo, no grupo `admin`, com a sessão semeada como diz o `.claude/e2e/README.md` (`smash-burger:admin-session` com `{ admin, isAuthenticated }`; para o login, o cadastro na chave `admin`).
- `flow.mjs`, `lacunas.mjs`: sem mudança (o `lacunas.mjs` confere o guard do painel).

**Estados para o axe** (em 1440 e 390, com e sem movimento reduzido):

| Nome | Passos | Seletor estável |
|---|---|---|
| Painel | `#/admin` com a sessão | `.dashboard__kpis .admin-card--kpi` |
| Produtos | `#/admin/products` | `.products-list .m3-cartao-produto` |
| Produtos com busca sem resultado | `#/admin/products?q=zzz` | `.product-management .empty-state` |
| Pedidos | `#/admin/orders` | `.orders-list .m3-status` |
| Pedidos com filtro | `#/admin/orders?status=pending` | `#statusFilter` com o valor `pending` |
| Detalhes do pedido | `#/admin/orders` → o primeiro "Detalhes" | `dialog[open] #pedido-detalhes-titulo` |
| Excluir produto | `#/admin/products` → o primeiro "Excluir" | `dialog[open] #excluir-produto-titulo` |
| `ModalProducts` novo | `#/admin/products` → "Novo produto" | `dialog[open] #produto-titulo` |
| `ModalProducts` com erro | o anterior → "Salvar" com tudo vazio | `#name[aria-invalid="true"]` e `#image-erro` |
| Relatórios | `#/admin/reports` | `.top-products` |
| Meu perfil | `#/admin/profile` | `.admin-profile__info` |
| Configurações com o diálogo | `#/admin/settings` → "Restaurar cardápio original" | `dialog[open] #restaurar-titulo` |
| Gaveta aberta (390) | `#/admin/orders` em 390 → "Alternar menu" | `#admin-sidebar[role="dialog"]` visível e `main[inert]` |
| Menu do perfil aberto | `#/admin/orders` → `.navbar-profile__avatar` | `#menu-perfil-admin` visível |
| Login do admin com erro | `#/admin/login` com o cadastro na chave `admin` → e-mail certo, senha errada → "Entrar" → esperar a mensagem | `.admin-login .auth-form__anuncio .auth-alert` |

**SPEC-M (no mesmo PR):** a linha "Admin" da §4.2 (desenhado: a coluna, a gaveta, o `AdminCard` em `high`) e a do `ProductCard` (`admin`) → `M3CartaoProduto`; a §5.11 ("a desenhar" → desenhado, com os quatro desvios aceitos pela sessão principal: o card em `high`, a gaveta em `elevacao-1`, a marca na coluna e o item de 56 px; e o `aside` que vira `div`); a §6 (a linha "Item da sidebar admin"); a §2.2 (a regra do `error` passa a dizer "badges do carrinho e do painel"; "chip" → "rótulo de status" nos usos); a §4.4 (o `ProductCard` sem o admin). **CLAUDE.md:** a lista dos componentes base ganha o `M3RotuloStatus` (a sessão C confere). **README e TESTING:** os testes novos e a contagem.

---

## 10. Referências usadas

| Ref. | Publicado ou conceito | Padrão abstraído | Onde entra |
|---|---|---|---|
| [160], [161], [164], [165], [167], [168] Gaveta (Compose e MDC) | conceito (documentação e código) | Standard e modal; Surface, Level0 e SurfaceContainerLow, Level1; `CornerLargeEnd`; indicador `CornerFull` em SecondaryContainer; padding 16 e 24, margem de 12; 56 dp; LabelLarge e negrito no ativo; scrim; Esc; foco de volta ao botão; descontinuação no Expressive | Coluna, gaveta, item |
| [169], [170], [173] a [184] Rail e rail largo (Compose e MDC) | conceito (documentação e tokens) | O rail expandido no lugar da gaveta; 220 a 360; 96 recolhido; rótulo sempre visível; o modo AUTO que esconde rótulos; cabeçalho com logo | Forma por largura, largura, marca na coluna |
| [185] a [189] Navegação adaptativa | conceito (documentação e código) | Classes de largura; a escolha recomendada e a antiga; o exemplo próprio | Forma por largura, corte em `lg` |
| [190] a [193] material-web | conceito (código e roadmap) | Nada de rail nem top app bar prontos para a web; o drawer experimental sem controle de foco | Feito à mão; foco no projeto |
| [194] a [198] Top app bar e elevação | conceito (documentação e tokens) | 64 dp; TitleLarge; Surface, Level0; ícone de navegação no início e ações no fim; avatar de 32; níveis em dp | Cabeçalho, avatar, botões de ícone |
| [199] a [202] Diálogo modal, H102, 2.4.3, F85 (W3C) | referência técnica | Fundo inerte; foco ao abrir e ao fechar; a falha do foco que não volta | Gaveta modal (`inert`, foco) |
| [203] a [209] Disclosure, menubar, menu, menu button, `aria-current`, Menu Structure, G128 (W3C) | referência técnica | Navegação sem `menu`; o menu button do perfil; um item atual | Coluna, menu do perfil, item atual |
| [210], [211] Landmarks (W3C) | referência técnica | Nomes únicos nos repetidos, sem o nome do papel; o complementary é para conteúdo de apoio; todo conteúdo num landmark | Os dois `nav`, o `aside` que vira `div`, as regiões dos cards |
| [215] G182 (W3C; achado da sessão principal) | referência técnica | Técnica suficiente da 1.4.1: o negrito entre as pistas visuais além da cor do texto, com a informação também por programa | O rótulo em 700 no item atual (aplicada a fundo colorido: inferência) |
| [212], [213], [214] Badge e 2.5.3 | conceito e referência técnica | Badge de pendências; descrição pelo número; o texto visível no nome | Selo e nome dos atalhos |
| [26] Pesquisa do Expressive (Google) | relato do autor | Tirar rótulos de texto piora | Rótulos sempre na coluna |
| [61] Navigation bar | conceito | 3 a 5 destinos | Alternativa descartada |
| [62] Search bar | conceito | A busca como foco do app | O que a busca do painel não é |
| [63], [64], [34] Cards, feed, carrossel | conceito | Filled card com um conteúdo coerente; itens equivalentes; foto em canto grande | `AdminCard`, card de produto |
| [7], [12], [30], [1], [13] (rodada 1) | documentação oficial | Chips em small; camadas; anel; escala de tipo; elevação tonal | Rótulo, estados, tipografia |
| [35] Badges | conceito | Badge em erro | Selo |
| [60], [141] Chips | conceito | O chip é interativo | Rótulo de status sem cara de chip |
| [119], [125], [131], [135] a [139] Campo de texto | conceito (documentação e tokens) | Denso de 48; 56 padrão; erro no lugar do apoio; contorno por estado; recuo de 16 | Busca, filtros, seletor de imagem |
| [151], [152], [153] 4.1.3, ARIA19, ARIA22 (W3C) | referência técnica | Região viva desde o carregamento; `aria-atomic`; tagarelice | Linha da busca, banner do login |
| [76], [77], [78] 2.4.11, 2.3.3, 2.5.8 (W3C) | referência técnica | Foco não coberto (C43); opacidade não é movimento; link inline isento | Aviso no pé, menu, text buttons |
| [96], [98], [99] 4.1.2, 1.4.11, 1.4.1 (W3C) | referência técnica | Troca de fundo fora da 1.4.11 e insuficiente na 1.4.1; informação além da cor, "such as shape or text"; contêiner e controle com texto | Item atual em 700, cards, rótulo |
| [H19] | pesquisa | Alvo apertado aumenta os toques errados | "Excluir" longe do "Editar" |
| [8], [66], [81] | conceito e imprensa | Cantos 20/4; listas agrupadas | Por que os pedidos não são lista segmentada |

**Recorrência:** nenhum padrão desta etapa tem 3 exemplos publicados novos. A navegação vem da documentação e do código do M3; a pesquisa da etapa não abriu apps de painel publicados.

---

## 11. Riscos e como o desenho responde

| Risco | Resposta |
|---|---|
| A gaveta seguir um componente em descontinuação no Expressive [161] | É a mesma lista nos dois contêineres; a diferença para o rail largo modal (SurfaceContainer, Level2, `CornerLarge` [174]) é pequena sobre o `scrim`, e a troca é só de tokens. O guia que ainda mostra a gaveta permanente está desatualizado [185]; a coluna fixa tem o contêiner que as duas fontes dão (Surface, Level0) |
| As fontes divergirem na janela compacta (navigation bar [187] [179], rail recolhido [188], expandido modal [169]) | Decisão do projeto, registrada (4.1): o fluxo do `SPEC.md` e a §13.8 pedem a gaveta; a bar mudaria o fluxo e repetiria a pílula da loja |
| A gaveta modal sem fonte do W3C que a classifique | Não encontrei fonte do W3C que decida entre diálogo e disclosure para a gaveta [199] [203]. Abaixo de `lg`, o `div` tem `role="dialog"`, `aria-modal` e nome [199], e o `inert` dá o fundo inerte e o foco preso, como a H102 descreve para o `<dialog>` [200]; o `aria-modal` só vale porque o bloqueio é real [199] |
| O `focus()` no "Alternar menu" ainda `inert` não fazer nada (bloqueante da volta 1) | O `closeSidebar` espera o `nextTick` (o `inert` sai no flush) antes do `focus()`; a prova é no Chromium (`check-admin.mjs`), porque o jsdom não implementa o `inert` (4.2, 5.1, 9) |
| O foco cair no `body` na troca só de query (o `afterEach` sai cedo com o mesmo caminho) | O `watch` da rota do `AdminLayout` leva o foco ao `main` depois do `nextTick` quando ele estava na gaveta; o `check-admin.mjs` confere o caso "Gestão de Pedidos" a partir de `?status=pending` (4.2) |
| A região dos avisos fora do `inert` com a gaveta aberta | Aceito: com `inert`, a região viva não anunciaria; o custo é o "Fechar aviso" no Tab, se houver aviso (4.2) |
| O item atual só pela cor (1,23 contra a coluna) | O rótulo em 700, pela lista de pistas da G182 [215] e o "shape or text" da [99], e o `aria-current` por programa [207]; nos modos de contraste, a borda (5.1). **Inferência registrada:** a G182 trata de texto colorido, e aqui a cor está no fundo; não encontrei técnica nem falha da W3C sobre o item atual marcado só pelo fundo. **A pílula da loja tem o mesmo ponto:** fica para a etapa 12 (§12) |
| O `aside` como complementary em volta da navegação [210] | Resolvido pela sessão principal: vira `div`, e a `nav` envolve a coluna inteira, para a marca e o "Sair" ficarem num landmark [210] (5.1) |
| O item de 56 px desviar da SPEC-M §5.11 (44) | Desvio aceito pela sessão principal, com fonte ([164], [176]); a SPEC-M dizia 44 sem fonte. A coluna cabe com folga em 768 de altura (5.1) |
| Os botões de ícone com a forma da Brasa ao lado do avatar M3 | Até a etapa 10, como o "Remover" e o "Excluir conta"; em repouso, o ghost é só o ícone |
| Os atalhos sem rótulo de texto visível | São ações da barra [194] [197], com o número no nome [212]; os rótulos da navegação ficam na coluna [26]. Não encontrei orientação do W3C sobre anunciar o número de um badge [214] |
| Três "página atual" em `/admin/orders` (o `RouterLink` ignora a query; em `?status=preparing`, também o "Notificações") | Os atalhos passam `aria-current="false"` (o revisor conferiu que vence no vue-router 4.6.4); a alternativa é a prop `aria-current-value`; o `check-admin.mjs` conta um só na página (4.3) |
| O card em `high`, e não no `highest` da SPEC-M e do feed da loja | Medido: o "Detalhes" pressionado dá 4,38 no `highest`. Desvio aceito pela sessão principal; o card de produto do painel acompanha |
| O menu do perfil abrir sobre um card da mesma cor | O menu passou a `surface-container` (1,11 contra a página e 1,05 contra o card), com a `elevacao-2`; não encontrei a cor do menu no dossiê (5.2) |
| O card de produto na horizontal em 390 se afastar do card da loja | A foto, o nome, a descrição e o preço são os mesmos; só a disposição muda, para a tarefa de gerenciar. A partir de `sm`, ele é vertical como o da loja |
| A região `role="status"` da busca anunciar a cada letra | `polite` [153]; é o comportamento de hoje (a região existia durante a digitação). A 4.1.3 alerta para a tagarelice [151]; a sessão C ouve com um leitor de tela; se incomodar, a saída é anunciar só depois de uma pausa (lógica nova; vira pergunta) |
| O aviso no pé cobrir o botão de origem de um diálogo | A reserva no `scroll-padding` vale para o `focus()` do `BaseDialog` se o aviso já estiver na tela; a sessão C mede e, se faltar, a view rola só pelo teclado (4.6) |
| A reserva rolar a página para quem usa o mouse | Só com o botão nos 120 px de baixo e aviso na tela; aceito (4.6) |
| O selo em `error` ler como erro | É o badge do M3 [35], com o exemplo de pendências [212]; o mesmo badge do carrinho. O nome diz "pedidos pendentes" |
| O `EmptyState` do gráfico parecer um gráfico quebrado | O texto é o de hoje ("indisponível nesta versão"); o visual é da etapa 10 |
| "Relatórios de Vendas" não caber em 240 | Estimativa de 230 com as margens (4.1); a sessão C mede; o token sobe para 16rem se preciso |
| O preço unitário na linha do card ler como total da linha | Pergunta 1 ao usuário (§12), com a recomendação "R$ 25,90 cada": o total da linha faria a view calcular preço, contra a regra "nenhuma tela calcula preço por conta própria" |
| A categoria esvaziada no painel ficar sem aviso em Produtos | Pergunta 3 ao usuário (§12) |
| Os `role="region"` dos cards (um por pedido e por KPI) encherem a lista de landmarks | É o comportamento de hoje (`SPEC.md` §5.11), com nomes únicos [211]; não encontrei no dossiê um limite de regiões |
| A ilustração do login mostrar comida que a casa não vende | Fica pela SPEC-M §5.11, com `alt=""` e atrás do `scrim` (5.11) |
| A busca de 166 px em 390 | "Buscar…" cabe; o texto digitado rola dentro do campo; em Produtos e Pedidos o resultado aparece logo abaixo |

---

## 12. Decidido e fora

**Decidido (item 6 do pacote):**

- **a.** Uma lista só: a partir de `lg`, a coluna fixa de 240 px em `surface`, sem canto, sombra nem borda (gaveta standard e rail expandido [164] [174]); abaixo de `lg`, a gaveta modal da anatomia da `ModalDrawerSheet` [164] [165], fechada por padrão; o corte fica em 1024; a largura vira o token `--m3-navegacao-largura` (15rem).
- **b.** Item em pílula (`full`) na largura do item, com margem de 12 e padding de 16 e 24; **56 px na coluna e na gaveta** ([164], [176]; desvio aceito da SPEC-M §5.11); ícone de 20 e rótulo label-l 500 em `on-surface-variant`; o atual em `secondary-container` / `on-secondary-container` com o rótulo em 700 (a pista além da cor da G182 [215], aplicada a fundo por inferência, com o `aria-current` por programa); camada no hover e no pressionado; anel interno; `aria-current` só na rota exata; nenhum item atual em Meu perfil e Configurações (decisão da sessão principal); os atalhos com `aria-current="false"`; o "Sair" com a mesma anatomia, depois de um divisor `outline-variant`; sai a barra de 3 px.
- **c.** Gaveta `surface-container-low`, cantos de 16 no lado de dentro, `elevacao-1` (desvio aceito da SPEC-M, que sugeria `elevacao-3`: a fonte dá Level1 [164]), sobre o `--m3-scrim`; o contêiner vira `div`, com `role="dialog"`, `aria-modal` e "Menu do painel" abaixo de `lg`, e a `nav` envolve a coluna inteira; a marca e o "Fechar" na cabeça de 64 px; entra por `translateX` e opacidade em `motion-ok`, só opacidade no reduzido, some na hora ao fechar; `.admin-sidebar` no `_motion.scss`; o skip link, o cabeçalho e o `main` `inert` (a região dos avisos, não); o foco no primeiro link ao abrir e de volta ao "Alternar menu", depois do `nextTick`, no Esc, no "Fechar" e no clique no fundo (novo); no `main` ao trocar de rota, também quando só a query muda.
- **d.** Cabeçalho `surface`, 64 px, sem borda, grudado em todas as larguras, sem mudar ao rolar; a marca num lugar só, a cabeça da coluna e da gaveta, por escolha ([179], [184]; desvio aceito da SPEC-M §5.11); "Alternar menu" só abaixo de `lg`; Tab na ordem do DOM de hoje.
- **e.** Busca como campo outlined de 48 px (o denso [119]), sem fundo, contorno `outline`, canto 12, lupa de 20 sem `translate`, até 22rem (cerca de 166 px em 390); não é a search bar em pílula [62]; sai o `--color-input`.
- **f.** Selo como o badge do M3: `error` / `on-error` (6,46), 16 px, label-s, `full`; "9+" fica; sem animação; a regra do `error` na SPEC-M §2.2 passa a dizer "badges do carrinho e do painel" (aceito pela sessão principal); os botões de ícone ficam com o `BaseButton iconOnly` de hoje até a etapa 10.
- **g.** Avatar de 32 px em `secondary-container` num alvo de 44; menu em `surface-container`, canto 16, `elevacao-2` (não encontrei a cor do menu; escolhida pela diferença da página e dos cards); itens de 44 px na anatomia da navegação; o "Sair" separado por uma linha em CSS (`::after`), sem filho no DOM; `role="menu"` e o teclado de hoje ficam ([79], [205], [206]); o menu aparece por opacidade.
- **h.** Página em `surface`; o `h1` na regra global; o texto do painel em body-m; os filtros com 56 px, sem prop densa; o cabeçalho de Produtos com o `h1` e o filled "Novo produto".
- **i.** `AdminCard` filled em `surface-container-high` (desvio medido do `highest`, aceito pela sessão principal), canto 12, sem sombra, padding 16, `height: 100%` (o rodapé alinha na linha da grade); título title-m 500 (`kpi`: label-l 500 `on-surface-variant`); valor em headline-m tabular; o rodapé sem divisor; o `loading` sem opacidade; KPIs em 1, 2 e 4 colunas; a 1.4.11 não se aplica ao card.
- **j.** Pedidos em cards separados (não lista segmentada), em 1, 2 e 3 colunas; `h2` "Pedido #{id}"; `h3` "Cliente" e "Itens" em title-s, sem caixa alta; o "×" fica; um divisor só, acima do Total; "Atualizar status" tonal e "Detalhes" texto, ao início.
- **k.** O rótulo de status vira `M3RotuloStatus` (`tom`: `info`, `aviso`, `sucesso`), raiz `p`, com o `letter-spacing` do label-l, sem camada, foco, ícone nem papel; os quatro status com o par de cada um (5,00 a 5,03); o perfil passa a usá-lo nesta etapa (uma linha), e as asserções de estilo do "Recebido" vão do `conta-estilo.test.js` para o teste do componente.
- **l.** `M3CartaoProduto` (`produto`, `nivelTitulo`, slot `acoes`), com o `M3Foto`, o `responsiveImage`, o `formatPrice` e um `ref(false)` para a falha, sem o `useCartaoProduto`; filled `high`, padding 8, foto 4:3; nome, descrição em 2 linhas, preço; "Editar" no início e "Excluir" no fim; na horizontal abaixo de `sm`; grade de 1, 2, 3 e 4 colunas; falha com `utensils`. Nada mais usa o `ProductCard`; a busca por ele acha só o `ProductCard.vue`, o `_product-card.scss` e o `CarouselBurguer.vue` (sem uso, sai na 11), depois de a sessão C reescrever o comentário do `_product-management.scss` e trocar só os comentários do `M3CartaoLanche.vue` e do `useCartaoProduto.js`.
- **m.** `ModalProducts` numa coluna, com Preço e Quantidade lado a lado a partir de `sm`; o seletor de imagem numa caixa com o contorno do campo e o botão tonal dentro; o rótulo "Imagem" sem `id`; ajuda e erro com o recuo de 16; o erro no lugar da ajuda; "Cancelar" tonal e "Salvar" filled, ao fim.
- **n.** "Detalhes" com a `dl` sem caixa alta, os itens com o unitário e a linha, o Total e o "Fechar" tonal; "Excluir produto?" e "Restaurar…?" com o seguro antes e o destrutivo por último, o foco no título; os avisos no pé, em todas as larguras do painel.
- **o.** Painel com o `EmptyState` num card; Relatórios com os KPIs numa `ul` em 3 colunas a partir de `md` e a lista numerada num card de até 40rem; Meu perfil e Configurações em cards de até 40rem, com as ações ao início.
- **p.** A região `role="status"` da busca sempre no DOM, com `aria-atomic`; "Limpar busca" como text button `sm`, fora da região.
- **q.** Login com o `--m3-scrim` direto e `alt=""`; o painel da etapa 8; o banner junto do botão no invólucro da loja, com a região sempre no DOM, o ícone no `span` de 20 e a rolagem do grupo; o bloco do admin de teste com o tracejado `outline-variant`; "Voltar à loja" como text button alinhado ao início.
- **r.** Um `h1` por tela, `h2` nos cards e nos diálogos, `h3` no pedido; sem salto; os dois `nav` com nomes distintos; o `aside` vira `div` (a `nav` "Seções do painel" é o landmark da coluna; abaixo de `lg`, o diálogo); o `main#conteudo` com o skip link.
- **s.** O `scroll-padding-top` global cobre o cabeçalho; a gaveta é modal; o aviso vai para o pé, pela regra `:global(html:has(.admin-layout) .toast-region)` em `_admin-layout.scss` (vence o escopo sem `!important`; a entrada continua `translateY(-8px)` até a etapa 10), com a reserva de `--m3-toast-reserva` mais 16 px enquanto há aviso e a rolagem só pelo teclado depois do "Atualizar status".
- **t.** `forced-colors`: o item atual com `Highlight`; bordas de `CanvasText` nos cards, na gaveta, no menu, no rótulo e no selo; o contorno da busca em `CanvasText`. `prefers-contrast: more`: bordas em `outline` e o contorno da busca em `on-surface-variant`.

**Decidido pela sessão principal (volta 1, 24/11/2026; `correcoes-admin-volta-1.md`):**

1. **Os quatro desvios da SPEC-M §5.11, aceitos:** o `AdminCard` em `surface-container-high` (pelos pares do "Detalhes"); a gaveta em `elevacao-1` (pela fonte [164]); a marca na coluna, como escolha ([179], [184]); e o item de 56 px na coluna e na gaveta ([164], [176]; a SPEC-M dizia 44 sem fonte). A sessão C atualiza a §5.11 do SPEC-M com os quatro.
2. **A regra do `error` na §2.2, aceita:** os selos de contagem do painel são badges, como o do carrinho [35]; a §2.2 passa a dizer "badges do carrinho e do painel". O rótulo "Pendente" continua em `aviso`: o selo conta, o rótulo diz o estado.
3. **O `aside` vira `div`:** o complementary é para conteúdo de apoio [210]; a `nav` "Seções do painel" basta como landmark (e envolve a coluna inteira, 5.1), e abaixo de `lg` o contêiner é o diálogo. A §9 lista os scripts que procuram `.admin-sidebar`.
4. **O `aria-current="false"` nos atalhos, aceito:** o revisor conferiu no vue-router 4.6.4 que o atributo repassado vence; a alternativa é a prop `aria-current-value` do `RouterLink`, se o `BaseButton` a repassar.
5. **"Um item ativo por rota" (§13.8):** "nunca dois itens ativos"; em Meu perfil e Configurações, que não estão na navegação, nenhum item fica ativo [207].
6. **O peso 700 fica,** com a [215] G182 e a [99] como fonte, e a aplicação a fundo colorido registrada como inferência (5.1).

**Perguntas ao usuário (textos e o que só ele decide):**

1. **O preço da linha no card do pedido.** Hoje, "2× Smash Burger" mostra "R$ 25,90", o preço de uma unidade, e o Total é R$ 59,80: quem soma as linhas (25,90 + 8,00) não chega ao total. Opções:
   - (a) deixar como está;
   - (b) mostrar o total da linha, "R$ 51,80": a view passaria a calcular preço (`price × quantity`), contra a regra "nenhuma tela calcula preço por conta própria". O diálogo "Detalhes" já faz essa conta hoje, mas é uma exceção que já existia, e não licença para outra;
   - (c) mostrar "R$ 25,90 cada", o texto que o diálogo "Detalhes" já usa ("{preço} cada"): tira a ambiguidade sem conta nova.
   
   **Recomendo (c).**
2. **Os rótulos da navegação iguais ao `h1`.** A coluna diz "Gestão de Produtos", "Gestão de Pedidos" e "Relatórios de Vendas", e a tela que abre diz "Produtos", "Pedidos" e "Relatórios" (no `h1` e no título da aba). Usar o mesmo nome nos dois lugares ("Painel", "Produtos", "Pedidos", "Relatórios") ajuda a se achar, e os rótulos curtos cabem com folga em 240 px e com zoom. **Recomendo usar o mesmo nome;** o desenho funciona com os dois.
3. **O aviso de vazio na categoria esvaziada de Produtos.** Se o painel excluir todos os produtos de uma categoria, a tela mostra o filtro e mais nada (hoje o `EmptyState` só aparece com busca). Mostrar o `EmptyState` também aí, com o texto do Cardápio ("Nada nesta categoria por enquanto", `src/utils/textosLoja.js`). **Recomendo mostrar;** sem resposta, fica como hoje.

**Fora:**

- gráfico, tendência ("+12%"), comparação com o mês anterior, filtro por data, ordenação, paginação, tabela de dados, ações em massa;
- outros status, atribuição de entregador, mensagens (o atalho "Mensagens" saiu antes desta etapa);
- avatar com foto, modo escuro, "esqueci a senha";
- recolher a coluna em `lg` (função nova); dica (tooltip) nos botões de ícone (o Compose marca como bug a dica não anunciada [179] [194]);
- ícones nos rótulos de status; animação do selo, da troca de status, dos cards ou de entrada das telas;
- a search bar em pílula, sugestões de busca, busca expandida.

**Para outras etapas:**

- **Etapa 10:** o `iconOnly` ("Alternar menu", "Fechar" da gaveta e dos diálogos, os atalhos), o `danger` ("Excluir", "Excluir produto", "Restaurar"), o `loading` ("Entrando…", o "Salvar" que espera a imagem) e o desabilitado ("Atualizar status" em "Concluído") do `BaseButton`; o `BaseDialog` (o contêiner e o sheet dos diálogos do painel e do `ModalProducts`); o `EmptyState` (o gráfico, Pedidos e Produtos sem resultado); o `AppToast`, que herda ou absorve o aviso no pé do painel e a reserva desta etapa (`:global` em `_admin-layout.scss`), acerta a entrada (hoje `translateY(-8px)`, de cima, também no pé) e decide o botão de imagem como `BaseButton`, se fizer sentido.
- **Etapa 11:** apagar o `ProductCard.vue`, o `_product-card.scss`, o `useTilt.js`, o `CarouselBurguer.vue` e as classes do `_motion.scss` que eram deles; os apelidos que ficaram sem uso (seção 7); os pares de `PARES_COMUNS` sobre o `--color-input`.
- **Etapa 12 (pendência registrada pela sessão principal; a decisão é do usuário):** conferir o item atual da pílula da `M3BarraFerramentas` contra a 1.4.1, com a G182 [215]. Lá ele também é marcado só pelo fundo (`secondary-container` contra o `surface-container` da pílula), sem troca de peso.

---

## 13. Revisão

Escrita pela sessão principal em 24/11/2026.

### Método

- **Revisor, volta 1:** o prompt `revisor-admin.md` (tipos do juiz da rodada 2) e oito pontos de atenção da sessão principal: os três desvios da SPEC-M §5.11, o peso 700 e as duas alturas do item, os avisos no pé, o `inert` e o foco, o `useCartaoProduto` e a busca do `ProductCard`, o `aria-current` dos atalhos, as perguntas ao usuário e o "Recebido" do perfil. O revisor conferiu o desenho contra o pacote, o plano, o `CLAUDE.md`, o SPEC-M, o `SPEC.md` §5.11, o desenho da Conta, a seção "Etapa 9" do dossiê e o código. Mediu os pares com o `src/utils/contraste.js`. No Chromium headless de uma página local, testou três coisas: o cabeçalho sticky, o `focus()` dentro de `inert` e a largura dos rótulos na Roboto Variable. Também conferiu o `isExactActive` no vue-router 4.6.4 instalado.
- **Resultado da volta 1:** "aprovado: não", com 1 bloqueante, 6 importantes e 9 menores. Os pares novos e os da matriz bateram com a medição.
- **Fonte nova:** para decidir o achado 2, a sessão principal abriu a G182 e o Understanding da 1.4.1. A G182 entrou no dossiê como [215], em "Achado da sessão principal (etapa 9)".
- **Correções:** o designer aplicou os 16 achados e as decisões da sessão principal (`correcoes-admin-volta-1.md`), só neste arquivo. A volta 2 do revisor não rodou, porque as correções seguiram a lista. A sessão principal conferiu no texto o bloqueante (4.2), o achado 7 (4.2), o item atual por rota (4.3) e a §12.

### Achados e o que mudou

| # | Achado (gravidade) | Resposta |
|---|---|---|
| 1 | O `focus()` no "Alternar menu" rodava antes de o Vue tirar o `inert` do cabeçalho: o Esc, o "Fechar" e o clique no fundo perdiam o foco (bloqueante) | `await nextTick()` antes do `focus()` (4.2, 5.1, 7.3); prova no Chromium pelo `check-admin.mjs`, com mutação (seção 9) |
| 2 | "O 700 basta para a 1.4.1" sem fonte (importante) | O 700 fica, com a [215] G182 e a [99]; a aplicação a fundo colorido fica registrada como inferência; o [161] fica só como fonte do desenho do item |
| 3 | 44 px na coluna e 56 na gaveta, justificados por "toque × ponteiro", que o [189] desaconselha (importante) | 56 px nas duas formas ([164], [176]); quarto desvio da §5.11 |
| 4 | A busca `ProductCard` da verificação do plano não passava (importante) | A sessão C reescreve o comentário do `_product-management.scss` e troca só o comentário do `M3CartaoLanche.vue` e do `useCartaoProduto.js`; a busca acha o `ProductCard.vue`, o `_product-card.scss` e o `CarouselBurguer.vue` (sem uso, sai na etapa 11) |
| 5 | O "Recebido" perdia o espaçamento, e o `conta-estilo.test.js` quebrava (importante) | O `M3RotuloStatus` leva o `letter-spacing` do label-l; as asserções L406–418 vão para o teste do componente |
| 6 | A pergunta do preço recomendava uma conta na view (importante) | A recomendação passa a ser "R$ 25,90 cada" (c) |
| 7 | Na troca só de query, o foco caía no `body` (importante) | No `watch` da rota, o foco vai ao `main` depois do `nextTick` se estava na gaveta; o caso entra no `check-admin.mjs` |
| 8 a 16 | O aviso fora do `inert`; a regra do aviso no pé; o card que não preenche o `li`; o menu da mesma cor dos cards; o motivo da marca; "um item ativo por rota"; o divisor do "Sair"; o `useCartaoProduto` no card do admin; o `id` solto (menores) | Aviso fora do `inert` aceito (o anúncio continua); regra escrita em `_admin-layout.scss`; `height: 100%`; menu em `surface-container`, com os pares medidos; marca como escolha; "nunca dois"; linha por CSS; card sem o composable; sem o `id` |

### Decisões da sessão principal

- Os quatro desvios da §5.11 aceitos (12, "Decidido pela sessão principal", item 1).
- A §2.2 diz "badges do carrinho e do painel".
- O `aside` vira `div`.
- O `aria-current="false"` nos atalhos.
- "Nunca dois itens ativos".
- O peso 700 com a G182.
- Ruling: o designer pôs a `nav` "Seções do painel" em volta da coluna inteira (a marca, o "Fechar" e o "Sair"). Sem o `aside`, a marca e o "Sair" ficariam fora de um landmark a partir de `lg` [210]. A sessão principal aceita. Custo se estiver errado: o "Fechar" e a marca ficam dentro do landmark de navegação, sem efeito no teclado.
- Ruling: a pílula da loja com o item atual marcado só pelo fundo fica como pendência da etapa 12, e a decisão é do usuário. Custo se estiver errado: a loja continua como está até lá.

### O que fica para o usuário

As três perguntas da §12: o preço da linha no card do pedido (recomendada a opção c), os rótulos da navegação iguais ao `h1` e o aviso de vazio na categoria esvaziada de Produtos.

### O que a sessão C mede (o desenho estimou pelo CSS)

- "Relatórios de Vendas" numa linha na coluna de 240 px, também com zoom de 200%.
- O foco devolvido pelos diálogos fora do aviso no pé.
- O foco no `main` depois da troca de rota com a gaveta `inert`, inclusive na troca só de query.
- Os três fechamentos da gaveta no Chromium (Esc, "Fechar" e fundo) e a mutação que reprova sem o `nextTick`.
- A gaveta fechada em 390 e um item ativo por rota, nunca dois (§13.8).
- O contraste dos rótulos de status e do selo no navegador.
- O `forced-colors` e o `prefers-contrast: more` do item atual, dos cards e do rótulo.
