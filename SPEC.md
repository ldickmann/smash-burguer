# SPEC: repaginação "Brasa" do Smash Burger

Especificação autocontida para implementar a nova UI/UX da loja e do painel admin.
- **Diagnóstico:** `AUDIT.md`, commit `b7e3be9`. Os IDs entre colchetes, como [COR-02], apontam para os achados de lá.
- **Ponto de partida:** o código em `bd89c41`.

---

## 0. Decisões que este SPEC assume

| Tema | Decisão |
|---|---|
| Direção visual | **Brasa**: fundo carvão `#15110E`, acento laranja-brasa `#FF5B1A`, Bebas Neue (display) + Archivo (texto). |
| Contexto | Portfólio pessoal. A meta é mostrar um sistema coerente de ponta a ponta. |
| Identidade | Nada precisa ser mantido. O wordmark continua em Bebas Neue por escolha da direção, não por restrição. |
| Nome da marca | **Smash Burger** em todo o projeto. O wordmark é "SMASH BURGER". |
| Admin | Entra, com os **mesmos tokens** e densidade maior. Tema único escuro. |
| Estrutura | Muda **onde a auditoria pede**: CTA no hero, contador do carrinho na navbar, categorias como controle segmentado, card de produto único, pagamento com resumo, confirmação de verdade. O carrossel da Home fica, reestilizado. |
| Defeitos de fluxo | Entram **só os que a nova UI expõe**: [EST-13], [FLX-01] a [FLX-05], [FLX-07] e [FLX-08], mais [FLX-06] (justificativa na §10). Os defeitos de admin ([FLX-09]) e de rotas públicas ([FLX-10]) ficam fora. |
| Micro-interações 3D | Quatro: **flip "Adicionado ✓"**, **odômetro do carrinho**, **tilt nos cards do cardápio** e **montador do burger** no modal. |
| Fontes | **Self-hosting** com `@fontsource-variable/archivo` (decisão delegada; justificativa na §2.3). É a **única dependência nova** do projeto. |
| Imagens | **Otimizar os arquivos uma vez, fora do build**, e servir com `srcset`/`sizes` + `lazy`. Nenhuma dependência nova no app. |
| Stack | **Não atualizar nada agora.** Todas as versões do `yarn.lock` ficam como estão (custos na seção 4 do AUDIT). |
| Tema claro | Fora do escopo. Os tokens ficam em CSS custom properties para permitir um tema claro no futuro. |

**Proibido nesta direção:**
- fundo creme ou off-white;
- palavra em itálico como destaque em títulos;
- rótulos numerados no estilo "01 / 02 / 03";
- rótulos em fonte monoespaçada;
- botões em formato de pílula (o raio de botão é sempre 4px).

---

## 1. Objetivo e critérios de aceite

Repaginar tipografia, cor, bordas, sombras, espaçamento e estados de interação, e adicionar micro-interações 3D que deem retorno ou orientação ao usuário (§7).

### 1.1 Critérios mensuráveis

Todos são conferidos no passo final (§13).

#### Acessibilidade

1. **axe-core (WCAG 2.2 A/AA):** 0 violações em todas as rotas da §13.3, nas viewports 1440 e 390. O modal aberto e os estados de erro também são medidos.
2. **Contraste:**
   - texto ≥ 4,5:1 (≥ 3:1 se tiver ≥ 24px, ou ≥ 18,66px em negrito);
   - borda de campo e anel de foco ≥ 3:1 contra o que estiver ao lado.
3. **Alvos de toque:**
   - botões e links têm ≥ 44×44 px;
   - checkbox e rádio têm ≥ 24×24 px, dentro de um `<label>` clicável com ≥ 44 px de altura;
   - um input escondido visualmente (cards de pagamento) é medido pelo seu `<label>`;
   - exceção documentada: link inline dentro de texto corrido, com ≥ 24 px de altura.
4. **Foco:** todo elemento focável mostra foco visível com `:focus-visible`.

#### Código e performance

5. **Tokens:**
   - nenhuma cor, raio, sombra, duração, curva ou z-index escrito direto fora de `src/assets/styles/base/_tokens.scss`;
   - exceções: as cores e formas ilustrativas do `BurgerStack` (§7.4) e `transparent`/`currentColor`.
6. **Padrões banidos:** 0 `!important`, 0 `outline: none` (o foco usa `outline` visível, §3), 0 `transition: all`, 0 `@include respond-to` (a migração é para mobile-first).
7. **Peso da Home:** em 390px, ≤ 1,5 MB transferidos no carregamento inicial, sem rolar a página. Hoje são 54,3 MB.
8. **Movimento reduzido:** com `prefers-reduced-motion: reduce`, nenhuma das 4 micro-interações usa `rotate`, `translate` ou `scale`.

#### Integridade do fluxo e da marca

9. **Fluxo do pedido de ponta a ponta:**
   - personalização preservada;
   - carrinho persistido;
   - resumo no pagamento;
   - confirmação com número do pedido;
   - histórico no perfil;
   - sair e entrar de novo funciona.
10. **Marca e idioma:**
    - "Smash Burger" é a única grafia;
    - nenhum texto em inglês na interface (inclusive rótulos ARIA do carrossel);
    - preços sempre no formato `R$ 25,99`.

---

## 2. Tokens

### 2.1 Mecanismo

- **Novo arquivo** `src/assets/styles/base/_tokens.scss`, com os tokens como **CSS custom properties** em `:root` e uso via `var(--…)`.
- **Novo arquivo** `src/assets/styles/base/_breakpoints.scss`. Breakpoints não podem ser custom properties dentro de `@media`, então ficam como mapa SCSS, com os mixins `up($bp)` e `hover-capable`.
- **`_variables.scss` é removido** ao fim da migração (§12, fase 8). Até lá, nenhuma folha nova o importa.
- **`src/assets/main.scss` passa a importar só a base:** tokens, fontes, reset, tipografia, utilitários, acessibilidade e movimento.

### 2.2 Cor

#### Superfícies

| Token | Valor | Uso | Contraste relevante |
|---|---|---|---|
| `--color-bg` | `#15110E` | Fundo da página, navbar | — |
| `--color-surface-sunken` | `#100D0B` | Rodapé, fundo do admin atrás da sidebar | ink 16,85:1; ink-muted 8,81:1 |
| `--color-surface-1` | `#1C1713` | Sidebar e header do admin, faixas | ink 15,47:1 |
| `--color-surface-2` | `#221B17` | Cards, painéis, diálogos | ink 14,77:1 |
| `--color-surface-3` | `#2E2520` | Hover de superfícies, toast, menus | ink 13,04:1 |
| `--color-surface-4` | `#3A302A` | Pressionado, fundo de desabilitado | — |
| `--color-input` | `#1B1512` | Fundo de campos | — |
| `--color-overlay` | `rgba(10, 8, 6, 0.72)` | Fundo de diálogo e da sidebar mobile | — |

#### Texto

| Token | Valor | Uso | Contraste relevante |
|---|---|---|---|
| `--color-ink` | `#F5EEE8` | Texto principal, preços | 16,34:1 no bg |
| `--color-ink-muted` | `#B8ADA4` | Texto secundário, descrições, links inativos | 8,54:1 no bg; 7,72:1 em surface-2 |
| `--color-ink-subtle` | `#9A8D83` | Placeholder, metadados | 5,26:1 em surface-2 |
| `--color-ink-disabled` | `#8A7E75` | Texto desabilitado (isento de contraste) | 3,25:1 em surface-4 |

#### Bordas

| Token | Valor | Uso | Contraste relevante |
|---|---|---|---|
| `--color-border-strong` | `#7A6A5E` | Borda de campos, checkbox, botão secundário | 3,27:1 em surface-2; 3,62:1 no bg |
| `--color-border` | `#4A3E36` | Divisores, borda de card (decorativa) | — |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.06)` | Contorno interno de cards | — |

#### Acento (ação)

| Token | Valor | Uso | Contraste relevante |
|---|---|---|---|
| `--color-accent` | `#FF5B1A` | **Só ação:** botão primário, aba selecionada, anel de foco, badge do carrinho | 6,05:1 no bg |
| `--color-accent-hover` | `#FF7036` | Hover do primário | texto 6,82:1 |
| `--color-accent-pressed` | `#E64A0D` | Primário pressionado | texto 4,78:1 |
| `--color-accent-ink` | `#15110E` | Texto e ícone sobre o acento (**nunca branco**: branco dá 3,10:1) | 6,05:1 |
| `--color-accent-soft` | `rgba(255, 91, 26, 0.14)` | Fundo de item selecionado (sidebar, opção de pagamento) | ink 12,27:1 sobre surface-2 |
| `--color-focus` | `var(--color-accent)` | Contorno de foco (`outline`) | 6,05:1 no bg; 4,83:1 em surface-3 |

#### Estados

| Token | Valor | Uso | Contraste relevante |
|---|---|---|---|
| `--color-success` | `#5BD69A` | Texto e ícone de sucesso; face "Adicionado ✓" (com accent-ink) | 10,31:1 |
| `--color-danger` | `#FF8A80` | Texto de erro, borda de campo inválido, "Remover" | 8,23:1 no bg; 7,91:1 no input |
| `--color-danger-solid` | `#D9363E` | Fundo de ação destrutiva de confirmação (texto `#FFFFFF`) | 4,62:1 |
| `--color-warning` | `#F5B940` | Status "Pendente" | 10,64:1 |
| `--color-info` | `#7CC4FA` | Status "Em preparo", toast informativo | 9,95:1 |

#### Translúcidos e gradientes

Também são tokens. Nenhuma folha escreve `rgba()` ou gradiente direto.

| Token | Valor | Uso | Contraste relevante (sobre surface-2) |
|---|---|---|---|
| `--color-danger-soft` | `rgba(255, 138, 128, 0.10)` | Banner de erro, hover do botão `danger` | ink 12,45:1; danger 6,26:1 |
| `--color-warning-soft` | `rgba(245, 185, 64, 0.14)` | Chip "Pendente" | texto warning 7,10:1 |
| `--color-info-soft` | `rgba(124, 196, 250, 0.14)` | Chip "Em preparo" / "Recebido" | texto info 6,75:1 |
| `--color-success-soft` | `rgba(91, 214, 154, 0.14)` | Chip "Concluído" | texto success 7,03:1 |
| `--color-hover-ghost` | `rgba(255, 255, 255, 0.04)` | Hover do botão `ghost` | ink 13,28:1 |
| `--color-sheen` | `rgba(255, 255, 255, 0.10)` | Reflexo do tilt (§7.3) | — |
| `--gradient-scrim` | `linear-gradient(to bottom, rgba(21,17,14,0.15), rgba(21,17,14,0.92))` | Banner do Cardápio | ink ≥ 13,39:1 e ink-muted ≥ 7,00:1 onde a opacidade é ≥ 0,92, mesmo sobre pixel branco; ink ≥ 6,14:1 a partir de 0,70 |
| `--glow-hero` | `radial-gradient(closest-side, rgba(255,91,26,0.18), transparent)` | Brilho atrás da foto do hero (decorativo) | — |

#### Foco

| Token | Valor |
|---|---|
| `--focus-width` | `2px` |
| `--focus-offset` | `2px` (0 nos campos) |

#### Regras de uso

- **O acento só marca o que é ação ou seleção.** Preço, título e decoração nunca são laranja.
- **O preço usa `--color-ink`** em peso 700 com algarismos tabulares.
- **Um primário por região:** no máximo um botão primário por bloco de conteúdo. As outras ações são secundárias ou ghost.

### 2.3 Tipografia

**Carregamento** (decisão delegada, seguindo boas práticas):
- **Archivo:** `@fontsource-variable/archivo`, versão 5.3.0, eixo `wght`, subconjuntos `latin` e `latin-ext`.
  - É self-hosted: sem requisição a terceiros, sem dependência de CDN e sem enviar o IP do visitante ao Google.
  - Vem em WOFF2 com hash do Vite, o que dá cache longo.
  - É uma fonte variável: um arquivo por subconjunto cobre todos os pesos.
  - Usa `font-display: swap`.
  - É o mesmo mecanismo que já carrega a Bebas.
- **Bebas Neue:** continua via `@fontsource/bebas-neue` 5.2.7, sem mudar de versão. Só existe o peso 400.
- **Importação:** as duas fontes são importadas **uma única vez, em `src/main.js`**: `import '@fontsource/bebas-neue/400.css'` e `import '@fontsource-variable/archivo'`.
  - Hoje o `@use "@fontsource/bebas-neue"` dentro de `_typography.scss` replica o `@font-face` em cada parcial que importa a tipografia: são 12 cópias no CSS de entrada [DEB-13].
  - O `unicode-range` do Fontsource faz o navegador baixar só os subconjuntos que a página usa (latin e, se houver caractere, latin-ext).
- **Material Icons:** sai o `<link>` de `index.html:7`, que não é usado [DEB-09].

**Famílias:**

| Token | Valor |
|---|---|
| `--font-display` | `"Bebas Neue", "Arial Narrow", sans-serif` |
| `--font-text` | `"Archivo Variable", "Archivo", system-ui, -apple-system, "Segoe UI", sans-serif` |

**Regras:**
- **Bebas Neue:**
  - só em títulos de **28px ou mais**, sempre em caixa alta (o desenho já é maiúsculo), `letter-spacing: 0.01em`;
  - **sempre em `font-weight: 400`**, com `font-synthesis: none` para não haver negrito sintético [TIP-07].
- **Archivo:** todo o resto. O `body` usa 16px, `line-height` 1,5 e peso 400.
- **Algarismos tabulares** (`font-variant-numeric: tabular-nums`) em preço, total, quantidade, contador e KPI.
- **Controles** (`button, input, select, textarea`) herdam a fonte com `font: inherit` [TIP-03].

**Escala** (razão 1,333, base 16):

| Token | rem | px | Uso |
|---|---|---|---|
| `--text-xs` | 0.75 | 12 | Badge do carrinho, status, legenda |
| `--text-sm` | 0.875 | 14 | Texto auxiliar, ajuda de campo, erro, admin denso |
| `--text-md` | 1 | 16 | Corpo, botões, campos |
| `--text-lg` | 1.3125 | 21 | Nome do produto, título de painel (Archivo 700) |
| `--text-xl` | 1.75 | 28 | Total do pedido (Archivo 700), título de seção pequeno (Bebas) |
| `--text-2xl` | 2.375 | 38 | Título de seção (Bebas), KPI (Archivo 700) |
| `--text-3xl` | 3.125 | 50 | Título de página (Bebas) |
| `--text-4xl` | 4.1875 | 67 | Título do hero (Bebas) |

**Tamanhos fluidos** (os únicos):

| Token | Valor | Faixa |
|---|---|---|
| `--text-hero` | `clamp(2.375rem, 1.6rem + 3.2vw, 4.1875rem)` | 38 → 67 |
| `--text-page` | `clamp(2.375rem, 1.9rem + 1.6vw, 3.125rem)` | 38 → 50 |

**Pesos da Archivo:** 400 (texto), 500 (rótulos), 600 (botões e links de navegação), 700 (nomes de produto, preços, títulos de painel). Nada acima de 700.

**Altura de linha:**

| Token | Valor | Uso |
|---|---|---|
| `--leading-display` | 0.95 | Bebas |
| `--leading-tight` | 1.2 | Títulos em Archivo |
| `--leading-body` | 1.5 | Corpo |
| `--leading-compact` | 1.35 | Texto de 14px e menor |

### 2.4 Espaçamento e layout

| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | 0.25rem (4) | Ícone ↔ texto |
| `--space-2` | 0.5rem (8) | Dentro de grupos compactos |
| `--space-3` | 0.75rem (12) | Rótulo ↔ campo |
| `--space-4` | 1rem (16) | Padding de card no mobile; gap de formulário |
| `--space-5` | 1.5rem (24) | Padding de card no desktop; gap de grade |
| `--space-6` | 2rem (32) | Entre blocos de uma seção |
| `--space-7` | 3rem (48) | Entre seções no mobile |
| `--space-8` | 4rem (64) | Entre seções no desktop |
| `--space-9` | 6rem (96) | Respiro do hero no desktop |
| `--container-max` | 75rem (1200) | Largura máxima do conteúdo |
| `--gutter` | `clamp(1rem, 4vw, 2rem)` | Margem lateral: 16px em 390 e 32px a partir de 800 |
| `--navbar-h` | 4rem (64) | Altura da navbar; usado em `scroll-padding-top` e no `top` dos elementos sticky |
| `--target-min` | 2.75rem (44) | Alvo mínimo de toque |

- **Uma única classe** `.container` (`max-width: var(--container-max); margin-inline: auto; padding-inline: var(--gutter)`) substitui as 8 cópias de `max-width: 1200px; margin: 0 auto` [ESP-01].
- **O `<main>` reserva o espaço da navbar fixa** com `padding-top: var(--navbar-h)`. Nenhuma tela compensa sozinha [ESP-02].

### 2.5 Raios

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 4px | Botões, campos, checkbox, abas, badges, chips de status, miniaturas |
| `--radius-md` | 10px | Cards, painéis, toast, menus |
| `--radius-lg` | 16px | Diálogos (no mobile, só nos cantos de cima) |
| `--radius-round` | 50% | Só o avatar do admin, que é circular e não tem formato de pílula |

Nenhum outro valor de raio é permitido [RAI-01].

### 2.6 Sombras e elevação

No tema escuro, a elevação vem principalmente da **luminosidade da superfície**. A sombra só reforça.

| Token | Valor | Superfície | Uso |
|---|---|---|---|
| `--elev-0` | `none` | `--color-bg` | Página |
| `--elev-1` | `inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.40)` | surface-2 | Card em repouso, painel |
| `--elev-2` | `inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.45)` | surface-3 | Card em hover, toast, menu suspenso |
| `--elev-3` | `inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 64px rgba(0,0,0,0.55)` | surface-2 | Diálogo, sidebar mobile aberta |
| `--glow-accent` | `0 0 0 1px rgba(255,91,26,0.40), 0 6px 18px rgba(255,91,26,0.28)` | — | Hover do botão primário |

- São só essas quatro sombras [SOM-01].
- O foco **não** usa sombra: usa `outline`, que continua visível no modo de alto contraste do Windows (§3, item 5).

### 2.7 Camadas (z-index)

| Token | Valor | Uso |
|---|---|---|
| `--z-raised` | 1 | Conteúdo sobre imagem (texto do banner) |
| `--z-sticky` | 100 | Abas de categoria fixas no topo |
| `--z-navbar` | 200 | Navbar da loja, header do admin |
| `--z-overlay` | 300 | Fundo escurecido da sidebar mobile |
| `--z-sidebar` | 400 | Sidebar do admin no mobile (acima do próprio fundo escurecido) |
| `--z-toast` | 600 | Toasts (**acima da navbar**) [SOM-02] |

Os diálogos usam `showModal()` e entram na *top layer* do navegador, então não precisam de z-index.

### 2.8 Movimento

| Token | Valor | Uso |
|---|---|---|
| `--dur-instant` | 80ms | Pressionar |
| `--dur-fast` | 150ms | Cor e fundo no hover, troca de opacidade |
| `--dur-base` | 240ms | Flip, odômetro, entrada de diálogo no desktop |
| `--dur-slow` | 400ms | Camada do montador, sheet mobile, volta do tilt |
| `--dur-hold` | 1200ms | Tempo que "Adicionado ✓" fica visível (o JS lê o mesmo valor por `getComputedStyle`) |
| `--dur-stagger` | 40ms | Intervalo entre os dígitos do odômetro |
| `--dur-spin` | 800ms | Uma volta do spinner de `loading` |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Entradas |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Flip, odômetro |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Camada que entra no montador |

- **Proibido `transition: all`.** Liste as propriedades. Anime só `transform` e `opacity`, salvo mudança de cor e fundo [DEB-12].
- **Regra global de movimento reduzido** em `base/_motion.scss`:
  - dentro de `@media (prefers-reduced-motion: reduce)`, zera `transform` nas classes de animação das §7.1–7.4;
  - limita as transições a `opacity`, `color` e `background-color`, com duração máxima de `--dur-fast`.

### 2.9 Breakpoints (mobile-first)

| Nome | min-width | Muda |
|---|---|---|
| (base) | 0 | 1 coluna, menu em painel, abas com rolagem horizontal |
| `sm` | 480px | Grade de produtos com 2 colunas; Nome e Sobrenome lado a lado |
| `md` | 768px | Navbar horizontal completa; modal centralizado em vez de sheet |
| `lg` | 1024px | Hero em 2 colunas, grade com 3 colunas, carrinho e pagamento em 2 colunas, sidebar do admin fixa |
| `xl` | 1280px | Grade com 4 colunas |

- **Mixins:**
  - `@include up(md) { … }` gera `@media (min-width: 768px)`;
  - `@include hover-capable { … }` gera `@media (hover: hover) and (pointer: fine)`.
- **O carrossel usa as mesmas larguras** nas chaves de `breakpoints` (`480`, `768`, `1024`, `1280`); hoje são `425/768/1024/1440` [DEB-15].

---

## 3. Arquitetura de CSS (mudanças transversais)

1. **Fim da compilação dupla** [DEB-01]. O `main.scss` deixa de importar parciais de componentes e de páginas. Cada componente importa só a própria folha, no `<style scoped lang="scss">`.
2. **Estilos que dependiam da cópia global** [DEB-14] vão para dentro do componente filho:
   - o botão "Remover", que vai para o `CartItem.vue`;
   - o hover do toggle do admin, que vai para o `TheNavbarAdmin.vue`;
   - as ações dos pedidos, que vão para o `OrderManagement.vue`.
   - Nada de `:deep()` + `!important`.
3. **Fim do seletor de elemento global** `footer {}` [DEB-02]. O rodapé usa `.site-footer`, e nenhuma folha estiliza elementos HTML fora de `base/`.
4. **Reset novo** (`base/_reset.scss`):
   - `body` com `background: var(--color-bg)`, `color: var(--color-ink)`, `font: 400 var(--text-md)/var(--leading-body) var(--font-text)`;
   - `text-rendering: optimizeLegibility`;
   - `font: inherit; color: inherit` nos controles;
   - `img { display: block; max-width: 100%; height: auto }`;
   - `html { scroll-padding-top: calc(var(--navbar-h) + var(--space-4)); color-scheme: dark }`.
5. **Foco global** em `base/_a11y.scss`:
   - `:focus-visible { outline: var(--focus-width) solid var(--color-focus); outline-offset: var(--focus-offset); }`.
     - O contorno tem 2px e contraste de 6,05:1 sobre o fundo.
     - Nenhum lugar do projeto usa `outline: none` [EST-03].
   - Nos campos, `outline-offset: 0` e a borda também muda para `--color-accent`.
   - Helpers `.visually-hidden` e `.skip-link`.
6. **Links:**
   - dentro de texto corrido (`.prose a`, ajudas de formulário), `text-decoration: underline; text-underline-offset: 3px`, cor `--color-ink` [COR-06];
   - na navegação, sem sublinhado e com estado ativo explícito.
7. **Convenção de nomes:** BEM dentro de cada componente (`.product-card__price`). Sem classes genéricas globais (`.price`, `.description`, `.button`, `.product-details`) [DEB-06, DEB-10]. Sem `@extend`.
8. **CSS morto** listado em [DEB-07] é apagado junto com os componentes que somem.

---

## 4. Componentes e arquivos que mudam

### 4.1 Componentes novos

Os componentes de base ficam em `src/components/ui/`.

#### `ui/BaseButton.vue`

Substitui o `ButtonComponent.vue` [DEB-03, CON-01, EST-01, EST-04].

**Props:**

| Prop | Valores | Padrão | Notas |
|---|---|---|---|
| `variant` | `primary` \| `secondary` \| `ghost` \| `danger` | `primary` | — |
| `size` | `sm` (40px; alvo estendido a 44px com `::after`) \| `md` (44px) \| `lg` (52px) | `md` | — |
| `block` | booleano | — | — |
| `loading` | booleano | — | Spinner em CSS, `aria-busy="true"`; o clique fica bloqueado e a largura é preservada |
| `disabled` | booleano | — | — |
| `type` | `button` \| `submit` | `button` | — |
| `pressed` | booleano | — | Vira `aria-pressed`, para botões alternáveis |
| `iconStart` / `iconEnd` | nome de ícone FA | — | — |
| `iconOnly` + `label` | — | — | Botão quadrado de 44px com `aria-label` obrigatório |
| `to` | rota | — | Renderiza `RouterLink` com a mesma aparência |
| `href` | URL | — | Renderiza `<a>` com a mesma aparência |

**Regras:**
- Atributos extras (`class`, `data-*`, `aria-*`) vão para o elemento interativo (`inheritAttrs: false` + `v-bind="$attrs"` no botão/link).
- O componente **não navega nem chama handler global**; quem usa decide.
- Texto em Archivo 600, `--text-md` (14px no `sm`), `--radius-sm`.

**Estados por variante:**

| Variante | Padrão | Hover | Pressionado (`:active`) | Desabilitado |
|---|---|---|---|---|
| `primary` | fundo `--color-accent`, texto `--color-accent-ink` | `--color-accent-hover` + `--glow-accent` | `--color-accent-pressed` + `transform: translateY(1px) scale(0.98)` em `--dur-instant` | fundo `--color-surface-4`, texto `--color-ink-disabled`, sem sombra, `cursor: not-allowed` |
| `secondary` | transparente, borda 1px `--color-border-strong`, texto `--color-ink` | fundo `--color-surface-3` | fundo `--color-surface-4` + mesma transformação | mesmo do primário |
| `ghost` | sem borda, texto `--color-ink-muted` | texto `--color-ink`, fundo `--color-hover-ghost` | fundo `--color-surface-3` | mesmo do primário |
| `danger` | ghost com texto `--color-danger` | fundo `--color-danger-soft` | — | mesmo do primário |

**Foco:** contorno de foco global (§3, item 5) em todas as variantes.

#### `ui/BaseDialog.vue`

`<dialog>` aberto com `showModal()` [A11Y-02, A11Y-03, RAI-03].

**Comportamento:**
- **Fechar:** Esc (evento `cancel`), clique no fundo e botão de fechar (`iconOnly`, `label="Fechar"`).
- **Foco:** vai para o primeiro elemento focável, ou para o título com `tabindex="-1"`. Ao fechar, **volta para quem abriu**.
- **Rolagem:** o `<body>` fica com `overflow: hidden` enquanto o diálogo está aberto.
- **Rótulo:** `aria-labelledby` aponta para o título.

**Estrutura:**
- slots `header`, `default` (corpo com rolagem própria) e `footer` (fixo no fim);
- o corpo **não** usa `<main>`.

**Aparência:**
- **Desktop (≥ md):** centralizado, `max-width` vem por prop (padrão 880px), `--radius-lg`, `--elev-3`, fundo `--color-surface-2`.
- **Mobile (< md):** *sheet* que sobe da base, com altura `calc(100dvh - var(--space-6))` e só os cantos de cima arredondados.
- **Fundo:** `::backdrop` com `--color-overlay`, cobrindo também a navbar.
- **Bordas:** zera a borda e o padding padrão do `<dialog>`.

#### `ui/QuantityStepper.vue`

Substitui o `QuantityControl.vue` e o contador interno do `AdditionalsList` [CON-03, EST-07].

- **Props:** `modelValue`, `min`, `max`, `label` (nome do item, usado nos rótulos acessíveis).
- **Estrutura:** `role="group"` com `aria-label="Quantidade de {label}"`.
  - Botões `−`/`+` são `BaseButton` secundários `iconOnly` de 44px, com rótulos "Diminuir {label}" e "Aumentar {label}".
  - O valor fica num `<output aria-live="polite">` de 2ch, com algarismos tabulares.
- **Limites:** no mínimo ou no máximo, o botão recebe `disabled` **de verdade** e mostra o estilo de desabilitado.
- **Movimento:** o número rola, ver §7.5. Não é uma micro-interação 3D.

#### `ui/CategoryTabs.vue`

Controle segmentado das categorias [EST-05, RES-03].

- **Estrutura:** `role="group"` com `aria-label="Categorias"`, contendo `BaseButton` com `pressed`.
- **Estados:** a selecionada usa o estilo primário. As outras usam fundo `--color-surface-2`, texto `--color-ink-muted` e, no hover, texto `--color-ink`.
- **Mobile:** uma linha só, com rolagem horizontal e `scroll-snap-type: x mandatory`. Nunca empilha.
- **Posição:** fixa no topo, logo abaixo da navbar (`position: sticky; top: var(--navbar-h); z-index: var(--z-sticky)`), com fundo `--color-bg` e borda inferior `--color-border` quando está grudada.

#### `ProductCard.vue`

Card único de produto: substitui o `BurguerCard.vue` e o markup do slide em `CarouselBurguer.vue` [CON-02, HIE-05].

- **Props:** `product` e `variant`.
  - `menu`: usado na grade.
  - `compact`: usado no carrossel, sem tilt.
  - `admin`: tem o slot `actions` e nenhum botão "Adicionar".
- **Conteúdo:**
  - foto 4:3 com `<picture>` responsivo (§9);
  - nome (`--text-lg`, 700);
  - descrição (`--color-ink-muted`, `--text-sm`, até 2 linhas com `line-clamp`);
  - preço com `formatPrice` (700, tabular);
  - botão "Adicionar" primário `md`, com `aria-label="Adicionar {nome}"`.
- **Card inteiro clicável:** o `::after` do botão "Adicionar" cobre o card (*stretched button*), então o card inteiro é um alvo só, sem botão dentro de botão.
- **Estados:**
  - hover: `--elev-2` mais o tilt (§7.3);
  - foco do botão: contorno de foco no botão, e o card sobe 2px com `--elev-2`;
  - imagem com erro: fundo `--color-surface-3` com o ícone `faBurger` em `--color-ink-subtle`.
- **Micro-interação:** o botão abriga o flip "Adicionado ✓" (§7.1).

#### `CartBadge.vue`

Link do carrinho na navbar, com o odômetro (§7.2) [HIE-06, EST-16].

- **Alvo:** quadrado de 44×44 px com o ícone `faShoppingCart` de 24px.
- **Rótulo dinâmico:** `aria-label="Carrinho, N itens"`. Com o carrinho vazio, o rótulo é "Carrinho, vazio".
- **Badge:**
  - posição: canto superior direito;
  - tamanho: largura mínima de 20px e altura de 20px, `--radius-sm`;
  - cores: fundo `--color-accent`, texto `--color-accent-ink`;
  - texto: `--text-xs` 700, tabular;
  - de 100 itens em diante, mostra "99+";
  - com zero itens, fica escondido.

#### `BurgerStack.vue`

Montador do burger (§7.4).

#### `ui/AppToast.vue` + `stores/toast.js`

Substituem o `AlertComponent.vue` e o `_alert.scss` [EST-16, A11Y-10, CON-06].

**API:**
- `toast.show({ message, variant: 'success' | 'error' | 'info', action?: { label, onClick }, duration = 4000 })`.
- No máximo 3 toasts ao mesmo tempo.
- **Pausa** no hover e no foco.
- Botão de fechar `iconOnly` "Fechar aviso".

**Acessibilidade:** o contêiner é renderizado uma vez no `App.vue`. Sucesso e info usam `role="status"`; erro usa `role="alert"`.

**Aparência:**
- **Posição:**
  - desktop: `top: calc(var(--navbar-h) + var(--space-3))`, alinhado à direita do container;
  - mobile: `bottom: calc(var(--space-4) + env(safe-area-inset-bottom))`, centralizado;
  - sempre com `z-index: var(--z-toast)`.
- **Visual:**
  - fundo `--color-surface-3`, sombra `--elev-2`, `--radius-md`;
  - borda esquerda de 3px na cor do estado;
  - ícone `faCircleCheck`, `faCircleExclamation` ou `faCircleInfo`.

#### `composables/useAnnouncer.js`

Região viva invisível (`aria-live="polite"`) no `App.vue`, usada para anunciar "adicionado ao carrinho" sem mostrar um toast.

#### `OrderSummary.vue`

Resumo usado no carrinho (versão completa), no pagamento (versão compacta) e na confirmação.

- **Itens:** `{quantidade}× {nome}`, depois os detalhes ("Sem tomate", "+2 bacon", "Obs.: …"), depois o total da linha.
- **Rodapé:** divisor, Subtotal e **Total** (`--text-xl`, 700, tabular), e um slot `cta`.

#### `PaymentMethodPicker.vue`

`<fieldset>` com `<legend>Forma de pagamento</legend>`, com 4 rádios no mesmo `name="payment-method"` [A11Y-09].

- Cada rádio é visualmente escondido e o `<label>` vira um card de 64px de altura: ícone + nome + descrição curta.
- **Opções:**

  | Opção | Ícone | Descrição |
  |---|---|---|
  | Cartão de crédito | `faCreditCard` | "na entrega" |
  | Cartão de débito | `faCreditCard` | "na entrega" |
  | PIX | `faQrcode` | "aprovação na hora" |
  | Dinheiro | `faMoneyBill` | "na entrega" |

- **Estados:**
  - não marcado: borda `--color-border`;
  - hover: borda `--color-border-strong`;
  - marcado: borda 2px `--color-accent`, fundo `--color-accent-soft` e ícone `faCircleCheck` em `--color-accent`;
  - foco: contorno de foco no card (`:has(:focus-visible)`).
- **Teclado:** as setas trocam a opção (comportamento nativo do grupo de rádios).

#### `ui/EmptyState.vue`

Ícone (32px, `--color-ink-subtle`), título (`--text-lg`, 700), texto (`--color-ink-muted`) e slot `action`. Usado em carrinho vazio, "nenhum pedido", categoria vazia, filtro de pedidos sem resultado e gráfico do dashboard [EST-10, EST-11, EST-12].

#### `composables/useTilt.js`

Tilt dos cards (§7.3).

#### `composables/useResponsiveImage.js`

Monta `srcset` e `sizes` a partir do caminho-base da imagem (§9). Substitui o `useImagePath.js`, que é removido, e a cópia do mesmo helper em `stores/products.js` (`products.js:7-12`).

### 4.2 Arquivos alterados

#### Base e configuração

| Arquivo | Mudança | Resolve |
|---|---|---|
| `src/assets/main.scss` | Importa só a base: tokens, breakpoints, fontes, reset, tipografia, utilitários, a11y e motion. | DEB-01 |
| `src/main.js` | Importa as fontes uma única vez: `@fontsource/bebas-neue/400.css` e `@fontsource-variable/archivo`. | TIP-01, DEB-13 |
| `src/assets/styles/base/_typography.scss` | Sem `@use` de fonte. Classe `.display` (Bebas 400, `font-synthesis: none`, caixa alta) e estilos de `h1`–`h3` a partir dos tokens. | TIP-02, TIP-07 |
| `src/assets/styles/base/_reset.scss` | Reset novo (§3, item 4). | TIP-03 |
| `src/assets/styles/base/_utilities.scss` | `.container` com tokens; `.display`; `.tabular`. | ESP-01 |
| `src/assets/styles/base/_mixins.scss` | `respond-to` removido no fim; `flex-center` mantido. | DEB-15 |
| `index.html` | Título "Smash Burger · Delivery"; sai o Material Icons; corrige os `rel` inválidos (ficam só `icon`, `apple-touch-icon` e `manifest`); `<meta name="theme-color" content="#15110E">`. | CON-04, DEB-09 |
| `public/images/site.webmanifest` | `name` e `short_name` "Smash Burger"; ícones com caminho relativo (`android-chrome-192x192.png`, que fica na mesma pasta do manifest); `theme_color`/`background_color` `#15110E`. | CON-04, DEB-09 |
| `package.json` / `yarn.lock` | Adiciona `@fontsource-variable/archivo@^5.3.0`, a única dependência nova. Instalar com `corepack yarn@3.8.7 add`. | — |
| `src/plugins/fontawesome.js` | Registra `faCheck`, `faXmark`, `faMinus`, `faPlus`, `faTrashCan`, `faRotateLeft`, `faCircleCheck`, `faCircleExclamation`, `faCircleInfo`, `faCreditCard`, `faQrcode`, `faMoneyBill`, `faArrowRight`. Remove os 4 sem uso (`faClipboardList`, `faChartBar`, `faGithub`, `faLinkedin`) e `faTwitter`. Font Awesome continua na 6.7.2. | DEB-09 |

#### Layout

| Arquivo | Mudança | Resolve |
|---|---|---|
| `src/App.vue` | Renderiza o contêiner de toasts e a região viva do announcer. | A11Y-10 |
| `src/layouts/MainLayout.vue` | Skip link "Pular para o conteúdo"; `<main id="conteudo" tabindex="-1">` com `padding-top: var(--navbar-h)`; layout em grid `min-height: 100dvh` para o rodapé ficar no fim. | ESP-02, ESP-08, A11Y-15 |
| `src/components/layout/TheNavbar.vue` + `_navbar.scss` | Ver §5.1. | COR-01, A11Y-04, A11Y-08, HIE-06 |
| `TheFooter.vue`, `TheFooterContactInfo.vue`, `TheFooterSocialMediaLinks.vue` + `_footer.scss` | Ver §5.10. | DEB-02, CON-05, CON-11, A11Y-05 |

#### Componentes da loja

| Arquivo | Mudança | Resolve |
|---|---|---|
| `src/components/CarouselBurguer.vue` + `_carousel.scss` | Slides com `ProductCard variant="compact"`; `i18n` em português; setas de 44px; pontos com área de toque de 24×24 e indicador visível de 16×4; breakpoints alinhados (§2.9); sem `!important`; corrige `pauseAutoplayOnHover`. | A11Y-04, A11Y-13, DEB-11, RES-06 |
| `src/components/ModalAdditional.vue` + `_modal.scss` | Usa `BaseDialog`; layout da §5.4; estado **local** de ingredientes e adicionais; CTA com preço. | A11Y-02, DEB-02, FLX-02, FLX-03 |
| `src/components/IngredientsList.vue` + `ingredients-list.scss` | Checkbox **marcado = incluído** (vem marcado), com `v-model` como fonte única de verdade (o handler que invertia o valor sai). Checkbox customizado de 24px dentro de um `<label>` de 44px. | FLX-02, A11Y-04 |
| `src/components/AdditionalsList.vue` + `additionals-list.scss` | Linhas com nome, "+ R$ 3,50" e `QuantityStepper` (0–5). | CON-03, EST-07 |
| `src/components/CartItem.vue` + `cart-item.scss` | Ver §5.5. | FLX-08, HIE-03, DEB-14 |
| `src/components/FormGroup.vue` + `_form-group.scss` | Ver §5.8. | A11Y-09, EST-15, COR-09 |
| `src/components/BannerComponent.vue` + `_banner.scss` | Duas variantes, `hero` (Home) e `page` (Cardápio). Sem hover na imagem. O título é o único `h1` da página. Imagem com `<picture>`. Slot `actions`. Sai o `SeparatorLines` roxo. | SOM-04, A11Y-08, HIE-01 |

#### Views da loja

| Arquivo | Mudança | Resolve |
|---|---|---|
| `src/views/HomeView.vue` + `_home.scss` | Ver §5.2. | HIE-01, RES-04, RES-07 |
| `src/views/MenuView.vue` + `_menu-page.scss` | Ver §5.3. | EST-05, EST-06, RES-03, ESP-03 |
| `src/views/CartView.vue` + `_cart-page.scss` | Ver §5.5. | FLX-01, HIE-03, HIE-04, EST-11 |
| `src/views/PaymentView.vue` + `_payment.scss` | Ver §5.6. | HIE-02, FLX-04, EST-08 |
| `src/views/ConfirmationView.vue` + `pages/_confirmation.scss` (novo) | Ver §5.7. | EST-17, FLX-05 |
| `src/views/auth/LoginView.vue`, `RegisterView.vue`, `ProfileView.vue` + folhas | Ver §5.8 e §5.9. | EST-09, EST-13, EST-14, CON-11, ESP-06 |
| `src/views/NotFound.vue` + `_not-found.scss` | Entra no `MainLayout` (rota filha) e usa os tokens. | CON-10, COR-12 |
| `src/views/Playground.vue` | Mínimo: troca `ButtonComponent` por `BaseButton` e nada mais. A rota pública é [FLX-10], fora do escopo. | — |

#### Admin

| Arquivo | Mudança | Resolve |
|---|---|---|
| `src/layouts/AdminLayout.vue` + `_admin-layout.scss` | Ver §5.11. Sidebar fechada por padrão abaixo de `lg`, com fundo escurecido. | RES-02 |
| Componentes admin (`SidebarAdmin`, `TheNavbarAdmin`, `navbar/SearchBar`, `navbar/NotificationBar`, `navbar/UserProfileBar`, `AdminCard`, `ModalProducts`) | Ver §5.11. | A11Y-06, A11Y-07, EST-03, CON-07, CON-12 |
| `src/views/admin/*` | Ver §5.11. | EST-10, HIE-07, CON-05, CON-08 |

#### Estado, rotas e dados

| Arquivo | Mudança | Resolve |
|---|---|---|
| `src/stores/cart.js` | Ver §10. `persist`, `updateQuantity`, getters `itemCount`/`subtotal`, `removeItem` com desfazer, modelo de item com `unitPrice`. | FLX-07, FLX-08 |
| `src/stores/userStore.js`, `src/services/authServices.js`, `src/handlers/authHandlers.js` | Ver §10. Chaves separadas, rejeição correta, `redirect`, `placeOrder`. | EST-13, FLX-01, FLX-05, FLX-06 |
| `src/stores/products.js` | Não guarda mais as quantidades escolhidas nos adicionais: o modal trabalha numa cópia. Usa `useResponsiveImage`. | FLX-03 |
| `src/router/index.js` | Ver §10.6. `scrollBehavior`, título e foco por rota, guards de pagamento e confirmação, 404 dentro do layout, `?redirect=`. | A11Y-11, FLX-04, CON-10 |
| `src/utils/buttonHandlers.js` | Ficam só `handleImageUpload` e `handleFormReset` (admin). Saem os handlers de navegação que o `ButtonComponent` chamava. | DEB-03, FLX-04 |
| `src/utils/formatters.js` | `formatPrice` é a única forma de exibir preço; o `toFixed` sai de cards, admin e pedidos. | TIP-04 |
| `src/json/products.json` | Campo `image` passa a ser o caminho-base sem extensão (§9). Corrige "Queijo Cheddar" e "hambúrguer de soja". | CON-11, RES-01 |

#### Testes

| Arquivo | Mudança | Resolve |
|---|---|---|
| `src/__tests__/*` | `ButtonComponent.test.js` → `BaseButton.test.js` (variantes, `loading`, `disabled`, `pressed`, `iconOnly` com rótulo). `AlertComponent.test.js` → `AppToast.test.js` (role por variante, pausa, desfazer). `BannerComponent.test.js` atualizado para as variantes. | — |

### 4.3 Arquivos removidos

Removidos no fim (fase 8), depois de não haver mais referências:
- **Componentes e folhas substituídos:**
  - `src/components/ButtonComponent.vue` e `_buttons.scss`;
  - `BurguerCard.vue` e `_burger-card.scss`;
  - `QuantityControl.vue` e `quantity-control.scss`;
  - `AlertComponent.vue` e `_alert.scss`;
  - `PaginationComponent.vue` e `_pagination-component.scss`, porque o cardápio mostra a categoria inteira, com 7 itens no máximo [EST-06];
  - `SeparatorLines.vue` e `_separator.scss` [A11Y-12]: onde houver quebra temática real (rodapé), usa `<hr class="divider">`; nos demais lugares, a separação vira borda em CSS.
- **Admin:** `ChartDashboard.vue`, porque o gráfico está comentado e incompatível. A dependência `vue-chart-3` continua instalada, já que a stack não muda.
- **Utilitários:** `src/composables/useImagePath.js`.
- **Tokens antigos:** `src/assets/styles/base/_variables.scss`.
- **Imagens:**
  - `public/images/fundos/background-section-dark.jpg`, que deixa de ser usada (§5.2);
  - os originais de câmera em `public/images/**`, trocados pelas versões otimizadas (§9). Continuam no histórico do git.

---

## 5. Telas

Valores em tokens. O "mobile" é a base (390px), e o desktop é descrito como acréscimo a partir do breakpoint indicado.

### 5.1 Navbar da loja

**Base (mobile):**
- **Barra:**
  - fixa no topo, com altura `--navbar-h`, fundo `--color-bg` e borda inferior 1px `--color-border`;
  - `z-index: var(--z-navbar)`.
- **Esquerda:** o wordmark **SMASH BURGER**.
  - É um `<a>` para `/`, **não** um `h1` [A11Y-08].
  - Bebas 400, `--text-xl`, `--color-ink`, `letter-spacing: 0.02em`.
- **Direita:** o `CartBadge` e o botão de menu.
  - O botão é `iconOnly` de 44px, com `aria-controls="menu-principal"` e `aria-expanded`.
  - O ícone alterna entre `faBars` e `faXmark`, trocando o componente em vez de animar por CSS (que hoje está quebrado).
- **Menu aberto:** painel abaixo da barra, com fundo `--color-surface-1` e `--elev-2`.
  - Os links têm 48px de altura.
  - O foco vai para o primeiro link. Esc fecha o menu e devolve o foco ao botão. Clicar fora também fecha.
  - Enquanto o menu está aberto, a rolagem do body fica travada.

**Links:**
- **Itens:** Início, Cardápio e um terceiro que depende da sessão: **Entrar** (deslogado, vai para `/login`) ou **Perfil** (logado).
- **Padrão:** Archivo 600, `--text-md`, `--color-ink-muted`.
- **Hover:** `--color-ink`.
- **Ativo:**
  - `--color-ink` com sublinhado de 2px `--color-accent` desenhado por `box-shadow: inset 0 -2px`;
  - 6px de respiro entre texto e sublinhado;
  - `aria-current="page"`, que o RouterLink já põe.
- **Contraste:** substitui o roxo de 1,36:1 [COR-01].

**A partir de `md`:** links em linha, sem botão de menu. O `CartBadge` fica à direita dos links.

### 5.2 Home

**Hero** (`BannerComponent variant="hero"`):

| | Mobile | A partir de `lg` |
|---|---|---|
| **Layout** | Ordem: título → texto → CTA → foto | 2 colunas 6/6; texto à esquerda, foto à direita |
| **Título** (`h1`) | "Smash na chapa, entregue quente" em Bebas `--text-hero`, `--leading-display` | igual |
| **Texto** | "Hambúrgueres artesanais prensados na hora. De terça a sexta, das 13h à 01h." em `--color-ink-muted`, `--text-md` | igual |
| **CTA** | `BaseButton` primário `lg` "Ver cardápio" (`to="/menu"`, `iconEnd="arrow-right"`) | igual |
| **Foto** | Hambúrguer recortado (`banner-burger-bg`) com `max-height: 280px`, `loading="eager"` e `fetchpriority="high"`. Atrás dele, brilho de brasa decorativo em CSS: `background: var(--glow-hero)` | `max-height: 520px` |
| **Padding vertical** | `--space-7` | `--space-9` |

O título e o CTA aparecem na primeira dobra nas duas viewports [HIE-01, RES-04].

**Seção "Mais pedidos"** (substitui "🍔 Nossos Hambúrgueres 🍔", que incluía batata frita) [TIP-05]:
- **Título:** `h2` em Bebas `--text-2xl`.
- **Fundo:** `--color-bg` liso. Sai a foto com `background-attachment: fixed` [RES-07].
- **Carrossel:**
  - slides com `ProductCard compact`;
  - 1, 2 ou 3 itens visíveis a partir de base, `sm` e `lg`;
  - setas `BaseButton` secundárias `iconOnly` ("Anterior", "Próximo");
  - pontos de paginação de 24×24 com o indicador de 16×4 centrado. O ponto ativo usa `--color-accent`; os outros, `--color-border-strong`.
- **Alerta:** sai o `AlertComponent`. O retorno de adição vem das §7.1, §7.2 e do announcer.

### 5.3 Cardápio

- **Banner** (`variant="page"`):
  - altura `clamp(220px, 30vw, 340px)`;
  - foto `banner-burger-black` com `--gradient-scrim` por cima;
  - título "Cardápio" (Bebas `--text-page`) e texto "Escolha, personalize e peça." (`--color-ink-muted`), alinhados à esquerda no rodapé do banner, sobre a faixa em que o scrim tem opacidade ≥ 0,70.
  - **Aceite:** amostrar o fundo atrás do texto e confirmar ≥ 4,5:1. O cálculo dá ≥ 6,14:1 mesmo com pixel branco por baixo.
- **CategoryTabs:** fixas abaixo da navbar, logo depois do banner, com 24px acima e abaixo e sem o vão de 150px de hoje [ESP-03].
- **Grade:**
  - 1, 2, 3 ou 4 colunas a partir de base, `sm`, `lg` e `xl`;
  - gap `--space-5`;
  - `ProductCard variant="menu"` com tilt (§7.3).
- **Paginação:** sai. Cada categoria mostra todos os itens (7, 3 e 1) [EST-06].
- **Categoria vazia:** `EmptyState` "Nada nesta categoria por enquanto".
- **"Ver carrinho":** sai o botão azul do fim da página. O acesso ao carrinho é o `CartBadge`.

### 5.4 Modal "Personalizar" (`BaseDialog`)

**Cabeçalho:** `h2` com o nome do produto (Archivo 700, `--text-lg`) e o botão Fechar.

**Corpo:**

| | Desktop (≥ md) | Mobile (sheet) |
|---|---|---|
| **Coluna visual** | Esquerda, 40%: `BurgerStack` quando o produto é um hambúrguer (§7.4); a foto quando não é | No topo: `BurgerStack` de 160px, ou a foto 16:9 |
| **Opções** | Direita, 60% | Abaixo do visual |

As opções, de cima para baixo:
1. **Descrição** (`--color-ink-muted`).
2. **Ingredientes**, para hambúrgueres e sobremesas.
   - Título "Ingredientes" e ajuda "Desmarque o que quiser tirar".
   - Checkboxes vêm **marcados** (incluídos).
   - Um item desmarcado fica com o texto riscado em `--color-ink-subtle` e a marcação visualmente escondida "(removido)".
3. **Adicionais**, para hambúrgueres e sobremesas: linhas do `AdditionalsList`.
4. **Quantidade**, só para bebidas: `QuantityStepper` de 1 a 10.
5. **Observação:** textarea de 3 linhas, `maxlength="140"`, contador "0/140" em `--text-sm`, placeholder "Ex.: ponto da carne, sem sal…".

**Rodapé fixo:**
- `BaseButton` primário `lg block` com o texto "Adicionar · R$ 29,49".
- O preço é recalculado ao vivo e usa algarismos tabulares.
- Não há botão "Cancelar": fechar já cancela.

**Ao confirmar:**
1. Adiciona o item ao carrinho (modelo da §10.1).
2. Fecha o diálogo.
3. O foco **volta para o botão "Adicionar" do card**, que faz o flip (§7.1).
4. O odômetro do `CartBadge` gira (§7.2).
5. O announcer diz "{nome} adicionado ao carrinho. {n} itens no carrinho."

**Fundo:** o rodapé do modal não herda mais o preto do rodapé global [DEB-02].

### 5.5 Carrinho

- **Título:** `h1` "Seu carrinho" (Bebas `--text-page`).
- **Layout:**
  - mobile: lista e resumo empilhados;
  - a partir de `lg`: lista à esquerda (8/12) e `OrderSummary` à direita (4/12), fixo no topo com `top: calc(var(--navbar-h) + var(--space-5))`.
- **Painéis:** sai o painel marrom com caixas aninhadas [ESP-05]. Lista e resumo são cards `--color-surface-2` com `--elev-1`.

**`CartItem`** (uma linha de lista; separador `--color-border` entre itens):
- **Linha superior:** miniatura de 64×64 (`--radius-sm`), nome (700), detalhes e o total da linha à direita.
  - Os detalhes ficam em `--text-sm` `--color-ink-muted`: "Sem tomate, sem cebola", "+2 bacon", "Obs.: bem passado". Hoje eles faltam [FLX-08].
  - O total da linha é `formatPrice(unitPrice × quantity)`, em 700 e tabular.
- **Linha inferior:** `QuantityStepper` de 1 a 10 e o botão "Remover" (`danger`, `iconStart="trash-can"`, `aria-label="Remover {nome}"`).
- **Remover:**
  - tira o item na hora e mostra um toast info "{nome} removido." com a ação **Desfazer** (`faRotateLeft`), por 5 s;
  - Desfazer devolve o item à mesma posição.
  - Isso substitui a ausência de confirmação [HIE-03].

**`OrderSummary`:** Subtotal, Total e o CTA, que depende da sessão.
- **Logado:**
  - primário `lg block` "Finalizar pedido" para `/payment`;
  - abaixo, ghost "Continuar comprando" para `/menu`.
- **Visitante** [FLX-01, HIE-04]:
  - texto "Entre para finalizar seu pedido.";
  - primário `lg block` "Entrar e finalizar", que vai para `/login?redirect=/payment`;
  - link secundário "Criar conta", que vai para `/register?redirect=/payment`.
  - Nenhum handler de autenticação é chamado a partir do carrinho.

**Vazio:** `EmptyState` com ícone `faShoppingCart`, título "Seu carrinho está vazio", texto "Escolha um burger no cardápio para começar." e ação primária "Ver cardápio" [EST-11].

### 5.6 Pagamento

- **Guard** (§10.6): exige sessão e carrinho com itens.
  - Sem sessão: vai para `/login?redirect=/payment`.
  - Carrinho vazio: vai para `/cart`, com o toast info "Seu carrinho está vazio."
- **Título:** `h1` "Finalizar pedido".
- **Layout:**
  - mobile: as seções empilhadas;
  - a partir de `lg`: as seções à esquerda (8/12) e o `OrderSummary` compacto à direita (4/12), fixo no topo.

**Seções** (cards `--color-surface-2`):
1. **Entrega.**
   - Com endereço salvo: mostra o endereço de `userStore.user.address` (rua, bairro, cidade/UF e CEP) e um link "Alterar no perfil".
   - Sem endereço: aviso `--color-warning` "Cadastre um endereço para receber o pedido." com o link "Adicionar endereço" para `/profile`. Nesse caso o CTA fica desabilitado.
2. **Forma de pagamento:** `PaymentMethodPicker`.

**CTA:** primário `lg block` "Confirmar pedido · R$ 31,98".
- Fica **desabilitado** até haver forma de pagamento e endereço, com a ajuda "Escolha uma forma de pagamento" ligada por `aria-describedby` [EST-08, FLX-04].
- Ao clicar, entra em `loading` ("Enviando pedido…") por 800ms (espera simulada, igual à da autenticação).
- Depois chama `userStore.placeOrder(...)` (§10.4), limpa o carrinho e vai para `/confirmation`.

Resolve [HIE-02].

### 5.7 Confirmação

- **Guard:** exige um `lastOrderId` válido; sem ele, vai para `/menu`.
- **Card central:** `max-width: 560px`, fundo `--color-surface-2`, `--elev-1`, padding `--space-6`.
  - Ícone `faCircleCheck` de 40px em `--color-success`.
  - `h1` "Pedido recebido" (Bebas `--text-page`), que **recebe o foco** ao montar.
  - Linha "Pedido #1001 · PIX" em `--color-ink-muted`.
  - `OrderSummary` somente leitura.
  - Ações: primária "Voltar ao cardápio" e secundária "Ver meus pedidos" (`/profile`).
- **Navbar:** o conteúdo começa abaixo dela [EST-17].
- **O que não entra:** previsão de entrega e rastreio. Não há fonte de dados, e as placas de status foram descartadas.

### 5.8 Login e cadastro

**Layout:**
- painel central de `max-width: 440px` (cadastro: 560px);
- fundo `--color-surface-2`, `--elev-1`, `--radius-md`;
- padding `--space-5` no mobile e `--space-6` no desktop.

**Título:** `h1` "Entrar" ou "Criar conta" (Bebas `--text-page`).

**`FormGroup`** [A11Y-09, EST-15, COR-09]:
- **Rótulo:** Archivo 500, `--text-sm`, `--color-ink`.
- **Campo:**
  - 48px de altura, fundo `--color-input`;
  - borda 1px `--color-border-strong`, `--radius-sm`;
  - texto `--text-md` (16px evita o zoom do iOS);
  - placeholder `--color-ink-subtle`.
- **Estados do campo:**

  | Estado | Aparência |
  |---|---|
  | Hover | Borda `--color-ink-muted` |
  | Foco | Borda `--color-accent` + contorno de foco com `outline-offset: 0` |
  | Erro | Borda `--color-danger`. Mensagem `--text-sm` `--color-danger` com o ícone `faCircleExclamation` e `id` próprio. No campo, `aria-invalid="true"` e `aria-describedby` apontando para a mensagem. O erro some **assim que o valor fica válido**, com validação no `input` depois do primeiro `blur` |
  | Desabilitado / somente leitura | Nova prop `disabled`/`readonly` repassada ao `<input>`. Fundo `--color-surface-2`, borda tracejada `--color-border`, texto `--color-ink-muted` |
  | Ajuda | Prop `helper`, também ligada por `aria-describedby` |

- **`autocomplete` correto por campo:** `email`, `current-password`, `new-password`, `given-name`, `family-name`, `bday`, `tel-national`, `postal-code`. Sai o padrão `off`.
- **Botão de envio:** `type="submit"` com **um único handler** no `@submit.prevent`. Sai o `@click` duplicado [EST-09].
  - Entrar: primário `lg block` "Entrar"; em `loading`, "Entrando…".
  - Cadastro: "Criar conta"; em `loading`, "Criando conta…".

**Erro de autenticação** [EST-13, EST-14]:
- Banner no topo do formulário com `role="alert"`, fundo `--color-danger-soft`, borda esquerda 3px `--color-danger`, ícone `faCircleExclamation` em `--color-danger` e o texto "E-mail ou senha incorretos." em `--color-ink`.
- Sai o `alert()` nativo.

**Cadastro:**
- **Nome e Sobrenome:** 1 coluna na base e 2 a partir de `sm` [RES-08].
- **Placeholders em português**, sem dado pessoal real [CON-11]:

  | Campo | Placeholder |
  |---|---|
  | Nome | "Seu nome" |
  | Sobrenome | "Sobrenome" |
  | E-mail | "voce@exemplo.com" |
  | Senha | "Mínimo de 6 caracteres, com letra e número" |
  | Celular | "(47) 99999-9999" |
  | CEP | "00000-000" |

- **CEP:**
  - durante a consulta, o campo mostra a ajuda "Buscando endereço…" com spinner;
  - a mensagem de erro distingue "CEP não encontrado." de "Não foi possível consultar o CEP agora. Tente de novo."

**Depois do sucesso:**
- Login: vai para o `redirect` da URL, ou para `/`.
- Cadastro: vai para `/login?redirect=…` (mantendo o destino) com o toast "Conta criada. Entre para continuar."

**Rodapé do painel:** "Não tem conta? **Criar conta**" e "Já tem conta? **Entrar**", como links sublinhados em `--color-ink`.

### 5.9 Perfil

- **Cabeçalho:** `h1` "Sua conta" e, à direita, o botão ghost "Sair" (`iconStart="sign-out-alt"`). Não é mais vermelho [COR-11, ESP-06].
- **Layout:** 1 coluna na base; a partir de `lg`, 2 colunas: "Seus dados" (5/12) e "Seus pedidos" (7/12).
- **Seus dados:** formulário com `FormGroup`.
  - Rua, bairro, cidade e UF são `readonly` de verdade, preenchidos pelo CEP.
  - Botão "Salvar alterações" secundário, com `loading` e toast de sucesso ou erro.
- **Seus pedidos:** lista de cards, com o pedido mais recente primeiro. Cada card mostra:
  - "Pedido #1001";
  - a data (`dd/mm/aaaa, hh:mm`);
  - o chip de status "Recebido" (texto `--color-info` sobre `--color-info-soft`);
  - "3 itens" e o total;
  - quando há pedidos, um `<details>` "Ver itens" com o `OrderSummary` somente leitura.
- **Sem pedidos:** `EmptyState` "Você ainda não fez pedidos" com a ação "Ver cardápio".

### 5.10 Rodapé (`.site-footer`)

- **Fundo e texto:** fundo `--color-surface-sunken`, texto `--color-ink-muted`, `--text-sm`.
- **Layout:** 1 coluna na base, 2 a partir de `md` e 4 a partir de `lg`. Padding vertical `--space-8`.
- **Wordmark:** "SMASH BURGER" (Bebas `--text-xl`, `--color-ink`) como `<p>`, não `h1`. Embaixo, a frase "Sabor irresistível em cada mordida. Burgers suculentos, ingredientes frescos e um toque especial."
- **Colunas** (títulos `h2` em Archivo 700, `--text-md`, `--color-ink`) [CON-05]:
  - "Endereço";
  - "Horário" ("Terça a sexta, das 13h à 01h");
  - "Redes sociais".
- **Contatos:** links com o ícone decorativo `aria-hidden`.
  - Os que abrem em nova aba levam o texto visualmente escondido "(abre em nova aba)".
  - O telefone mantém `wa.me`, com o rótulo visível "WhatsApp".
- **Redes sociais** [A11Y-05, CON-11]:
  - Facebook, Instagram e X; sai o Twitter duplicado;
  - o X aponta para `https://x.com`;
  - cada link tem 44×44 px e `aria-label="Smash Burger no Instagram (abre em nova aba)"`.
- **Rodapé:** um `<hr class="divider">` e a linha "© 2026 Smash Burger · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann".

### 5.11 Admin

O admin usa os mesmos tokens, com densidade maior: o texto de tabelas e cards é `--text-sm` e os paddings são um degrau menores.

#### Login admin (`/admin/login`)

- Mesmo painel da §5.8, com `h1` "Painel administrativo" [A11Y-14].
- O fundo de ilustração em giz continua, otimizado (§9), com uma camada `--color-overlay` por cima.
- O botão "Entrar" é `block`.
- O painel tem margem lateral `--gutter` no mobile [ESP-07].
- Link "Voltar à loja".
- A rota passa a ter `<main>`.

#### AdminLayout

| Parte | Especificação |
|---|---|
| Header | `--navbar-h`, `--color-surface-1`, borda inferior `--color-border`, `--z-navbar` |
| Sidebar | 240px, `--color-surface-1` |
| A partir de `lg` | Sidebar fixa à esquerda e conteúdo com `margin-left` |
| Abaixo de `lg` | Sidebar **fechada por padrão**. Abre como gaveta (`--elev-3`, `--z-sidebar`) sobre um fundo `--color-overlay` (`--z-overlay`). Fecha com Esc, com clique no fundo ou ao trocar de rota [RES-02] |

#### SidebarAdmin

- Itens com 44px de altura, ícone e texto `--color-ink-muted`.
- **Ativo:** fundo `--color-accent-soft`, texto `--color-ink` e barra de 3px `--color-accent` à esquerda.
- O "Dashboard" usa **correspondência exata**, para nunca haver dois itens ativos.
- "Fechar" e "Sair" têm `aria-label` [A11Y-06].
- A marca é "SMASH BURGER" em Bebas [CON-04].

#### TheNavbarAdmin

- **Alternar menu:** `BaseButton iconOnly` com `label="Alternar menu"` e `aria-expanded`.
- **SearchBar:**
  - rótulo visualmente escondido "Buscar";
  - placeholder "Buscar…";
  - foco com o contorno global; sai o `outline: none` [EST-03];
  - a borda dourada sai.
- **NotificationBar:** vira `BaseButton iconOnly`, com os rótulos "Mensagens", "Notificações" e "Tarefas" [A11Y-07]. O comportamento continua: só `console.log`, ver [FLX-09].
- **UserProfileBar:**
  - o avatar vira `<button aria-haspopup="menu" aria-expanded>`;
  - mostra as **iniciais** do admin em um círculo `--color-surface-3` com `--radius-round`. Sai o avatar fixo do GitHub [CON-12];
  - o menu usa `role="menu"` com itens `role="menuitem"`, fecha com Esc e com clique fora.

#### Telas do admin

| Tela | Especificação |
|---|---|
| **Dashboard** | `h1` "Painel". Quatro cards de KPI com os mesmos dados de exemplo dos Relatórios: rótulo `--color-ink-muted` `--text-sm` e valor em Archivo 700 `--text-2xl`, tabular. No lugar do gráfico, `EmptyState` "Gráfico de vendas indisponível nesta versão" [EST-10, HIE-07]. |
| **Produtos** | `h1` "Produtos" (era `h2`) e primário "Novo produto". O select ganha rótulo "Categoria" e opções em português ("Destaques", "Hambúrgueres", "Bebidas", "Sobremesas") [CON-05]. A grade usa `ProductCard variant="admin"`, com as ações "Editar" (secundário `sm`) e "Excluir" (danger `sm`) [CON-08]. Preço com `formatPrice`. O comportamento de excluir não muda ([FLX-09], fora). |
| **Pedidos** | `h1` "Pedidos" e filtro com rótulo "Status" [A11Y-09]. Os cards mostram o chip de status em português: "Pendente" (texto `--color-warning` sobre `--color-warning-soft`), "Em preparo" e "A caminho" (texto `--color-info` sobre `--color-info-soft`), "Concluído" (texto `--color-success` sobre `--color-success-soft`). Chip com `--radius-sm` e `--text-xs` 700 [CON-05]. Ações: secundário "Atualizar status" e ghost "Detalhes" (comportamento não muda). Filtro sem resultado: `EmptyState`. |
| **Relatórios** | `h1` "Relatórios". O conteúdo dos cards passa para o slot padrão do `AdminCard` (hoje está em `#content`, que não existe), e os valores de exemplo aparecem [EST-10]. "Produtos mais vendidos" vira uma lista ordenada com o nome e a quantidade (tabular). |
| **ModalProducts** | Usa o `BaseDialog`. Botões "Salvar" (primário) e "Cancelar" (secundário, **não vermelho**) [CON-08]. O seletor de arquivo vira um `<label>` estilizado como botão secundário com o nome do arquivo escolhido; sai o "Choose File" do navegador. O preço usa `inputmode="decimal"`. |
| **AdminCard** | `--color-surface-2`, `--elev-1`, `--radius-md`. Slot padrão de conteúdo. O `role="region"` só aparece com `aria-labelledby` apontando para o título. |

---

## 6. Matriz de estados

Todo componente interativo tem os estados abaixo.
- **"—"** significa que o estado não se aplica.
- **"Anel"** é o contorno de foco global (§3, item 5): `outline` de 2px em `--color-focus` com afastamento de 2px.

| Componente | Hover | Foco (`:focus-visible`) | Pressionado | Selecionado | Desabilitado | Carregando | Vazio | Erro |
|---|---|---|---|---|---|---|---|---|
| BaseButton (primário) | `accent-hover` + glow | contorno `--color-focus` | `accent-pressed`, desce 1px e reduz para 98% | `pressed` = estilo primário | `surface-4` / `ink-disabled` | spinner + `aria-busy` | — | — |
| BaseButton (secundário, ghost, danger) | fundo `surface-3` ou realce | anel | fundo `surface-4` | — | idem | spinner | — | — |
| Link de navegação | `ink` | anel | — | ativo com sublinhado de brasa + `aria-current` | — | — | — | — |
| CategoryTabs | texto `ink` | anel | desce 1px | primário + `aria-pressed` | — | — | `EmptyState` | — |
| ProductCard | `elev-2` + tilt | sobe 2px + `elev-2` + anel no botão | — | — | — | — | — | imagem: ícone de fallback |
| FormGroup | borda `ink-muted` | borda acento + anel | — | — | prop `disabled`/`readonly` | ajuda com spinner (CEP) | — | borda e mensagem `danger` + ARIA |
| Checkbox (ingrediente) | borda `ink-muted` | anel | — | marcado: fundo acento + check | — | — | — | — |
| PaymentMethodPicker | borda `border-strong` | anel no card | — | borda acento + `accent-soft` + check | — | — | — | ajuda "Escolha uma forma…" |
| QuantityStepper | via BaseButton | via BaseButton | via BaseButton | — | no limite: `disabled` real | — | — | — |
| CartBadge | ícone `ink` | anel | — | — | — | — | badge escondido | — |
| AppToast | pausa o tempo | anel no botão de fechar | — | — | — | — | — | variante de erro com `role="alert"` |
| Item da sidebar admin | fundo `surface-3` | anel | — | `accent-soft` + barra | — | — | — | — |
| Telas de lista (carrinho, pedidos, cardápio, relatórios) | — | — | — | — | — | — | `EmptyState` | toast ou banner |
| Login, cadastro, pagamento | — | — | — | — | CTA desabilitado até ser válido | `loading` no CTA | — | banner `role="alert"` |

---

## 7. Micro-interações

As quatro micro-interações 3D foram escolhidas porque **dão retorno ou orientação**. Regras para todas:
- só animam `transform` e `opacity`;
- respeitam `prefers-reduced-motion`;
- não mudam o layout (sem *reflow*);
- não carregam informação que exista **só** na animação, porque a informação também chega por texto ou ARIA.

### 7.1 Flip "Adicionado ✓"

- **Para que serve:** confirma a adição **no ponto onde o usuário agiu**. Substitui o alerta que hoje fica atrás da navbar [EST-16].
- **Onde:** o botão "Adicionar" do `ProductCard`, nas variantes `menu` e `compact`.
- **Gatilho:** o modal confirma, fecha e devolve o foco ao botão; aí o botão recebe a classe `is-added` por `--dur-hold`.

**Estrutura:**
```html
<button class="add-btn" :class="{ 'is-added': added }" :aria-label="`Adicionar ${product.name}`">
  <span class="add-btn__inner">
    <span class="add-btn__face add-btn__face--front">Adicionar</span>
    <span class="add-btn__face add-btn__face--back" aria-hidden="true">
      <font-awesome-icon icon="check" /> Adicionado
    </span>
  </span>
</button>
```

**CSS (essência):**
```scss
.add-btn { perspective: 600px; }
.add-btn__inner {
  display: grid;
  transform-style: preserve-3d;
  transition: transform var(--dur-base) var(--ease-in-out);
}
.add-btn__face { grid-area: 1 / 1; backface-visibility: hidden; }
.add-btn__face--back {
  transform: rotateX(180deg);
  background: var(--color-success);
  color: var(--color-accent-ink);
}
.add-btn.is-added .add-btn__inner { transform: rotateX(180deg); }
```

**Tempo:** 240ms para virar, 1200ms parado e 240ms para voltar.
- Se o usuário adicionar de novo durante esse intervalo, o tempo reinicia.
- O botão continua clicável o tempo todo.

**Acessibilidade:** o nome acessível não muda. O anúncio vem do announcer (§5.4).

**Movimento reduzido:** sem `rotateX`. As faces trocam por `opacity` em `--dur-fast`.

**Aceite:**
- a 120ms do início, o `transform` computado do `__inner` está entre 0 e 180°;
- a face de trás tem contraste ≥ 4,5:1 (é 10,31:1);
- com movimento reduzido, `transform: none`.

### 7.2 Odômetro do carrinho

- **Para que serve:** mostra **para onde o item foi** e a quantidade nova.
- **Onde:** o badge do `CartBadge`, na navbar da loja.
- **Gatilho:** qualquer mudança em `cart.itemCount`, que é a soma das quantidades.

**Estrutura:** cada dígito fica numa janela de `1em` de altura (`overflow: hidden; perspective: 120px`) com um `<Transition>` por dígito, usando `key` = valor do dígito.

**CSS (essência):**
```scss
.odo-up-enter-from   { transform: rotateX(-90deg) translateZ(0.5em); opacity: 0; }
.odo-up-leave-to     { transform: rotateX(90deg)  translateZ(0.5em); opacity: 0; }
.odo-down-enter-from { transform: rotateX(90deg)  translateZ(0.5em); opacity: 0; }
.odo-down-leave-to   { transform: rotateX(-90deg) translateZ(0.5em); opacity: 0; }
.odo-up-enter-active, .odo-up-leave-active,
.odo-down-enter-active, .odo-down-leave-active {
  transition: transform var(--dur-base) var(--ease-in-out), opacity var(--dur-base);
}
```
- A direção (`up` ou `down`) vem da comparação com o valor anterior.
- Quando muda mais de um dígito, os da direita giram primeiro, com `--dur-stagger` de intervalo entre eles.
- O badge aparece na primeira adição (de 0 para 1) com uma entrada só de opacidade.

**Acessibilidade:** o badge é `aria-hidden`. O link tem `aria-label="Carrinho, N itens"`. O anúncio de adição já vem do announcer, então não há anúncio duplicado.

**Movimento reduzido:** o número troca com *crossfade* de `--dur-fast`, sem rotação.

**Aceite:** ao ir de 9 para 10 itens, dois dígitos animam, e o texto final do link é "Carrinho, 10 itens".

### 7.3 Tilt nos cards do cardápio

- **Para que serve:** sinaliza que **o card inteiro** é clicável, já que o botão estendido cobre o card (§4.1).
- **Onde:** só no `ProductCard variant="menu"`, na grade do Cardápio.
  - Não no carrossel, que tem arraste.
  - Não no admin.
- **Condições:** `matchMedia('(hover: hover) and (pointer: fine)')` **e** sem movimento reduzido. Fora disso, o composable não registra nenhum listener.

**Técnica** (`useTilt(el, { max: 4 })`):
- **`pointermove`, em `requestAnimationFrame`:**
  - calcula `x` e `y` normalizados de −0,5 a 0,5 dentro do retângulo do card;
  - define `--rx = (-y * 2 * max)deg`, `--ry = (x * 2 * max)deg`, `--mx = (x + 0.5) * 100%` e `--my = (y + 0.5) * 100%`.
- **`pointerleave`:** zera as variáveis com transição de `--dur-slow` `--ease-out`.

**CSS (essência):**
```scss
.product-card {
  transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform var(--dur-fast) linear, box-shadow var(--dur-fast);
}
.product-card::before { /* reflexo */
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), var(--color-sheen), transparent 45%);
  opacity: 0;
  transition: opacity var(--dur-fast);
}
.product-card:hover::before { opacity: 1; }
```

- **Limite:** 4° em cada eixo. A foto e o texto inclinam juntos; sem paralaxe interna.
- **Teclado:** no `:focus-visible` do botão, o card **não** inclina; só sobe 2px e ganha `--elev-2`.

**Aceite:**
- o ângulo computado nunca passa de 4°;
- com toque ou movimento reduzido, `transform` fica `none` e não há listener registrado.

### 7.4 Montador do burger

- **Para que serve:** o cliente **vê o que está tirando ou acrescentando**. Hoje a escolha nem é gravada [FLX-02].
- **Onde:** no `ModalAdditional`, para hambúrgueres: os produtos de `foods` cujos ingredientes estão no mapa abaixo. Não aparece em Batata Frita, sobremesas nem bebidas.

**Mapa de camadas** (`BurgerStack.vue`). As cores são **ilustração**, não tokens de UI, e são a única exceção ao critério 5 da §1.1.

| Ingrediente (nome exato) | Camada | Cor | Ordem (de baixo para cima) |
|---|---|---|---|
| Pão de hambúrguer | pão de baixo + pão de cima (domo) | `#D9A05B` / `#E8B46A` | 1 e último |
| Maionese | molho | `#F1E6C8` | 2 |
| Hambúrguer artesanal / de picanha | carne | `#5A2E1A` | 3 |
| Hambúrguer de frango | frango empanado | `#C98A4B` | 3 |
| Hambúrguer de soja | soja | `#7A5B3A` | 3 |
| Queijo | fatia de canto caído | `#F2B705` | 4 |
| Bacon | fita ondulada | `#B5452C` | 5 |
| Cebola / Cebola caramelizada | anéis / tiras | `#C9A3C8` / `#C47A3D` | 6 |
| Pepino / Pickles | rodelas | `#8DB255` | 7 |
| Tomate | disco | `#E5383B` | 8 |
| Alface | folha ondulada | `#5DBB63` | 9 |
| Ketchup | molho | `#C1272D` | 10 |

**Adicionais:** cada unidade acrescenta uma camada, até 5 por tipo.

| Adicional | Camada |
|---|---|
| Bacon | bacon |
| Queijo | queijo |
| Queijo Cheddar | `#E8891B` |
| Cebola Caramelizada | cebola caramelizada |
| Ovo | clara `#FFF6E5` com gema `#F6B21B`, logo acima da carne |

**Técnica:**
```scss
.stack { perspective: 900px; width: 220px; aspect-ratio: 1; }       /* 160px no mobile */
.stack__scene { transform-style: preserve-3d; transform: rotateX(58deg) rotateZ(-28deg); }
.layer { position: absolute; inset: 0; transform: translateZ(calc(var(--i) * var(--gap, 9px))); }
```
- Cada camada é um `div` com forma feita em CSS: `border-radius`, gradiente e um `box-shadow` empilhado para simular espessura.
- Vem de um `<TransitionGroup>` com `key` estável (tipo + índice).
- **Sair** (desmarcou ou zerou): `translateZ(+60px) translateX(40px)` e `opacity: 0` em `--dur-slow` `--ease-out`. As outras camadas reajustam `--i` em `--dur-base`.
- **Entrar** (marcou ou somou): parte de `translateZ(+80px)` com `opacity: 0` e chega à posição final em `--dur-slow` `--ease-spring`.

**Acessibilidade:**
- a pilha é `aria-hidden="true"`; os controles acessíveis são os checkboxes e os steppers;
- abaixo da pilha fica uma legenda visível em `--text-sm` `--color-ink-muted`, como "Sem tomate · +1 bacon" ou "Do jeito da casa".

**Movimento reduzido:** a vista isométrica estática continua, porque não é movimento. As camadas entram e saem só por `opacity` em `--dur-fast`, sem `translate`.

**Performance:** no máximo 16 camadas e só `transform`/`opacity`. Medido no Chromium com 4× de redução de CPU, sem *long task* acima de 50ms ao alternar uma camada.

**Aceite:** desmarcar "Tomate" remove a camada vermelha e muda a legenda. O item no carrinho fica com `removedIngredients: ["Tomate"]`.

### 7.5 Movimentos de apoio (não 3D)

| Elemento | Movimento | Com movimento reduzido |
|---|---|---|
| Botões (`:active`) | `translateY(1px) scale(0.98)` em `--dur-instant` | Só escurece o fundo |
| Diálogo no desktop | `opacity` 0 → 1 + `translateY(8px)` → 0 + `scale(0.98)` → 1, em `--dur-base` `--ease-out` | Só `opacity` |
| Sheet no mobile | `translateY(100%)` → 0 em `--dur-slow` | Só `opacity` |
| Toast | `opacity` + `translateY(-8px)` → 0 em `--dur-fast` | Só `opacity` |
| `QuantityStepper` | O número sai e entra na vertical (`translateY(±40%)` + `opacity`) em `--dur-fast` | Troca direta |
| Menu mobile e gaveta do admin | `translateY(-8px)` (menu) e `translateX(-100%)` (gaveta) → 0, com `opacity`, em `--dur-base` | Só `opacity` |
| Spinner de `loading` | Rotação contínua de `--dur-spin` | Spinner parado + texto "…carregando" |

---

## 8. Conteúdo e textos

- **Marca:** "Smash Burger" em todo lugar.
  - `index.html`, manifest, navbar, rodapé, sidebar e títulos de página.
  - O e-mail de exemplo vira "contato@smashburger.com.br" [CON-04].
- **Idioma:** tudo em português [CON-05, A11Y-13].
  - Rodapé: "Endereço", "Horário", "Redes sociais".
  - Placeholders (§5.8).
  - Busca do admin: "Buscar…".
  - Opções e status do admin.
  - Carrossel com `i18n`:

    | Chave | Texto |
    |---|---|
    | `ariaNextSlide` | "Próximo" |
    | `ariaPreviousSlide` | "Anterior" |
    | `ariaNavigateToSlide` | "Ir para o item {slideNumber}" |
    | `ariaGallery` | "Mais pedidos" |
    | `itemXofY` | "Item {currentSlide} de {slidesCount}" |

- **Correções de texto:**
  - "ingredientes fresco" → "ingredientes frescos";
  - "Queijo Cheedar" → "Queijo Cheddar";
  - "hamburguer de soja" → "hambúrguer de soja".
  - Sai o e-mail pessoal do placeholder do cadastro [CON-11].
- **Rótulos padronizados** [CON-09]:
  - "Adicionar" no card;
  - "Adicionar · R$ x" no modal;
  - "E-mail" em todos os formulários;
  - "Remover" no carrinho e "Excluir" no admin, ambos com ícone de lixeira e a variante `danger`.
- **Emojis saem dos títulos** [TIP-05]: "Seu carrinho", "Pedido recebido", "Mais pedidos".
- **Preços:** sempre com `formatPrice` → `R$ 25,99`, com algarismos tabulares [TIP-04].

---

## 9. Imagens

Os arquivos são gerados **uma vez, fora do build e fora do `package.json`** e versionados prontos. Vale qualquer ferramenta de uso único, como `cwebp` + ImageMagick, Squoosh CLI ou `sharp-cli` via `npx`.

### 9.1 Saídas

**Produtos** (`public/images/{foods,drinks,desserts}/`):

| Larguras | Formatos | Qualidade |
|---|---|---|
| 480, 960, 1440 | WebP | 75 |
| 960 | JPEG (fallback) | 78 |

- Sem metadados e sem upscale (se o original for menor, fica no tamanho original).
- Nomes no formato `{nome}-{largura}.{ext}`, como `cheese-bacon-960.webp`.
- **Orçamento:** ≤ 120 KB por WebP de 960px.

**Fundos e hero:**

| Arquivo | Saídas |
|---|---|
| `banner-burger-black` (Cardápio) | 960, 1440 e 1920 em WebP + JPEG 1440 |
| `background-admin-login` | 1440 e 1920 em WebP + JPEG 1440 |
| `banner-burger-bg.png` (recorte com transparência) | WebP com alfa em 480 e 960 + PNG 960 otimizado |
| `background-section-dark.jpg` | Removido (§5.2) |

### 9.2 Dados, markup e limpeza

- **Dados:** em `src/json/products.json`, `image` passa a ser o caminho-base, como `"/images/foods/cheese-bacon"`. O `useResponsiveImage(base, { widths, sizes })` monta `srcset` e `sizes` já com o `BASE_URL`.
- **Markup:**
  ```html
  <picture>
    <source type="image/webp" :srcset="srcsetWebp" :sizes="sizes" />
    <img :src="fallbackJpg" :alt="product.name" width="960" height="720" loading="lazy" decoding="async" />
  </picture>
  ```
  - O `sizes` da grade do cardápio é `(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 480px) 45vw, 92vw`.
  - **Só a foto do hero** usa `loading="eager"` e `fetchpriority="high"`.
  - `width` e `height` sempre presentes, para não haver salto de layout.
- **Originais:** saem de `public/` e continuam só no histórico do git.
- **Meta:** a Home em 390px transfere **≤ 1,5 MB** no carregamento inicial [RES-01].

---

## 10. Correções de fluxo incluídas

Entram porque a nova UI as expõe. Sem elas, os estados novos mostrariam informação errada.

### 10.1 Carrinho [FLX-07, FLX-08]

- **Store `cart`:**
  - `persist: { key: 'smash-burger:cart:v1' }`, com versão na chave, para que uma mudança futura no modelo do item não tente ler dados antigos;
  - actions `updateQuantity(index, qty)`, `removeItem(index)` (devolve o item removido para o "Desfazer") e `restoreItem(item, index)`;
  - getters `itemCount` (soma das quantidades) e `subtotal`.
- **Modelo do item:**
  ```js
  { productId, category, name, image, unitPrice, quantity,
    removedIngredients: string[],
    additionals: { name, price, quantity }[],
    observation }
  ```
  - `unitPrice` = preço + adicionais.
  - O total da linha é `unitPrice × quantity`.
  - Sai o `finalPrice`.
- **Chave do item** na lista: `${productId}-${category}-${index}`. Hoje há chave duplicada.

### 10.2 Personalização [FLX-02, FLX-03]

- Os ingredientes começam com `included: true`.
- `removedIngredients` é `ingredients.filter(i => !i.included).map(i => i.name)`.
- O `v-model` do checkbox é a única escrita (sai o `updateIngredient`).
- Ao abrir, o modal cria **cópias locais** dos adicionais com `quantity: 0`. A store de produtos não é mais alterada.

### 10.3 Login e sessão [EST-13, FLX-06]

**Correção do login:** o `authService.login` passa a **rejeitar a promise** com credenciais inválidas. O `reject` fica dentro do `setTimeout`; o `throw` sai.

**Chaves separadas:**

| Chave | O que guarda |
|---|---|
| `smash-burger:account` | O "cadastro" do cliente (era `user`) |
| `smash-burger:session` | O estado persistido da `userStore` (`persist: { key }`) |

**Por que o FLX-06 entra:** com o erro de login visível, a colisão de chaves de hoje faria quem sai e entra de novo ver "E-mail ou senha incorretos" com a senha certa.

**Migração:** na carga, se `localStorage.user` tiver o formato de cadastro (com `email` e `password` na raiz), copiar para `smash-burger:account` e apagar `user`.

**Admin:** a chave `admin` **não muda**. É defeito de admin, fora do escopo.

### 10.4 Pedido [FLX-04, FLX-05]

- **Nova action** `userStore.placeOrder({ items, total, paymentMethod, address })`:
  - cria `{ id, date: new Date().toISOString(), status: 'Recebido', items, total, paymentMethod, address }`;
  - o `id` é sequencial a partir de 1001 e persiste na sessão;
  - insere o pedido no início do `orderHistory` e guarda `lastOrderId`.
- **Depois do sucesso:** o `PaymentView` chama `cart.clearCart()`.
- O `ButtonComponent` deixa de navegar sozinho, e a forma de pagamento escolhida vai para o pedido. Isso resolve a confirmação sem forma escolhida.

### 10.5 Visitante no carrinho [FLX-01]

Os botões viram **links** para `/login?redirect=/payment` e `/register?redirect=/payment` (§5.5).

### 10.6 Rotas

| Item | Comportamento |
|---|---|
| `scrollBehavior` | Volta ao topo em rota nova, restaura a posição no voltar/avançar e respeita `#âncora` [A11Y-11] |
| `afterEach` | Define `document.title` como "{Título da rota} · Smash Burger" (via `meta.title`) e move o foco para `#conteudo` (`main`, `tabindex="-1"`) |
| `beforeEach` | `/payment` exige sessão e carrinho com itens; `/confirmation` exige `lastOrderId` (§5.6, §5.7). Login e cadastro respeitam `?redirect=` (só caminhos internos começando com `/`) |
| 404 | Vira filha do `MainLayout` |

---

## 11. Fora do escopo

### 11.1 Stack

- Nenhuma atualização das versões listadas na seção 4 do AUDIT: Font Awesome 7, vue3-carousel 0.19, Pinia 3/4, vue-router 5, Vite 7/8, Vitest 5, ESLint 10, Node do CI.
- Nenhuma remoção de pacote instalado e sem uso (`vue-chart-3`, `happy-dom`, `vite-svg-loader` etc.).

### 11.2 Funcionalidades

- **Tema claro** e `prefers-color-scheme`.
- **Defeitos do admin [FLX-09]:** excluir, atualizar status, detalhes, busca, notificações e itens do menu de perfil continuam sem efeito real. Também ficam a chave `admin` compartilhada e o preço salvo como texto no modal de produto (a exibição já fica correta com `formatPrice`).
- **Rotas públicas [FLX-10]:** `/playground` continua pública.
- **Funcionalidades que não existem hoje:** backend, pagamento real, taxa de entrega, rastreio de status, previsão de entrega, minicarrinho em gaveta, placas de status.
- **Gráfico do dashboard:** a dependência atual é incompatível com o Chart.js 4. Fica o estado vazio.

### 11.3 Segurança, marca e documentação

- **Segurança** (seção 5 do AUDIT): autenticação só no cliente, senha em texto puro e `createAdmin.html` versionado.
- **Identidade:** logotipo novo e ilustrações. A marca continua sendo só o wordmark.
- **Documentação e CI:** `README.md` e `TESTING.md`; CI com lint e testes.

---

## 12. Ordem de execução

Cada fase termina com `yarn build` sem avisos e uma conferência visual rápida em 1440 e 390.

1. **Fundação:**
   - `_tokens.scss`, `_breakpoints.scss`, `_motion.scss` e `_a11y.scss`;
   - o reset novo e as fontes (instalar `@fontsource-variable/archivo`);
   - o `main.scss` só com a base;
   - `index.html` e manifest.
2. **Primitivos:** `BaseButton`, `FormGroup` (refatorado), `BaseDialog`, `QuantityStepper`, `CategoryTabs`, `AppToast` + store, `EmptyState`, `useAnnouncer`, `useResponsiveImage`, `useTilt`.
3. **Moldura:** `MainLayout` (skip link e `main`), navbar com `CartBadge`, rodapé e rotas (scroll, título, foco, 404).
4. **Loja:**
   - Home, Cardápio (`ProductCard`, abas, tilt) e modal (`BurgerStack`, flip);
   - Carrinho, Pagamento e Confirmação;
   - Login, Cadastro e Perfil.
5. **Fluxos da §10:** carrinho, personalização, sessão, pedido e guards. Junto, atualizar os testes de `cart` e de auth, se forem criados.
6. **Admin:** layout, sidebar, navbar e as quatro telas.
7. **Imagens:** gerar as versões, atualizar `products.json`, aplicar o `<picture>` e remover os originais.
8. **Limpeza:** apagar os arquivos da §4.3 e o `_variables.scss`, migrar os últimos `respond-to` e rodar as buscas da §13.2.
9. **Verificação ponta a ponta (§13).**

---

## 13. Verificação ponta a ponta

É o passo final, obrigatório e repetível.
- Os scripts rodam com Playwright e axe-core instalados **numa pasta temporária fora do projeto**, sem adicionar nada ao `package.json`.
- O servidor é o build de produção.

### 13.1 Build, testes e lint

```bash
corepack yarn@3.8.7 install --immutable
corepack yarn@3.8.7 build            # esperado: termina sem avisos
npx vitest run                       # esperado: todos os testes passam
npx eslint .                         # sem --fix; esperado: 0 erros
corepack yarn@3.8.7 preview --port 4173 --strictPort &   # http://localhost:4173/smash-burguer/
```

### 13.2 Buscas no código

Cada comando abaixo deve retornar **zero** linhas:

```bash
# Cores, gradientes, sombras, durações e camadas só nos tokens (a paleta ilustrativa do BurgerStack é a exceção)
rg -n "#[0-9a-fA-F]{3,8}\b" src --glob '!**/base/_tokens.scss' --glob '!**/BurgerStack.vue' --glob '!**/*.json'
rg -n "rgba?\(|hsla?\(" src --glob '!**/base/_tokens.scss' --glob '!**/BurgerStack.vue'
rg -n "z-index:\s*-?[0-9]" src
rg -n "(transition|animation)[^;]*[0-9]+m?s" src --glob '!**/base/_tokens.scss'

# Padrões banidos
rg -n "!important|outline:\s*none|transition:\s*all|respond-to\(" src

# Arquivos removidos sem referência
rg -n "ButtonComponent|BurguerCard|QuantityControl|AlertComponent|PaginationComponent|SeparatorLines|useImagePath|_variables" src

# Preço só com formatPrice
rg -n "toFixed\(" src

# Uma só grafia da marca
rg -n -i "smash burgers|smash burguer|smashburguer" src index.html public

# Nenhum texto em inglês que existia na interface
rg -n "Address|Working Hours|Follow Us|Search\.\.\.|First Name|Last Name|\"Password\"|Status: pending" src
```

### 13.3 Varredura visual e de acessibilidade

Rodar em **1440×900** e **390×844**.

**Rotas:**
- Loja: `#/`, `#/menu`, `#/cart` (vazio e com itens), `#/payment`, `#/confirmation`, `#/login`, `#/register`, `#/profile` e `#/rota-inexistente`.
- Admin: `#/admin/login`, `#/admin`, `#/admin/products`, `#/admin/orders` e `#/admin/reports`.
- Estados: modal "Personalizar" aberto, com hambúrguer e com bebida; cadastro enviado vazio; login com senha errada.

**Para cada combinação:**
1. Screenshot de página inteira e da viewport.
   - Antes do screenshot de página inteira, rolar até o fim e voltar ao topo, para carregar o `lazy`.
   - Conferir contra o quadro da direção Brasa: fundo carvão, acento só em ações, Bebas só nos títulos grandes.
2. axe-core com as tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa` e `wcag22aa`: **0 violações**.
3. Sem rolagem horizontal: `document.documentElement.scrollWidth === innerWidth`.
4. **Alvos de toque**, conforme o critério 3 da §1.1:
   - todo `a[href]`, `button` e `[tabindex]` visível tem caixa de ≥ 44×44, salvo os links inline da exceção;
   - checkbox e rádio têm ≥ 24×24, com o `<label>` de ≥ 44 px de altura;
   - inputs escondidos visualmente são medidos pelo `<label>`.
5. No `body`, `getComputedStyle(...).fontFamily` começa com `"Archivo Variable"`. Os títulos em Bebas têm `font-weight: 400`.
6. Com movimento reduzido emulado (`page.emulateMedia({ reducedMotion: 'reduce' })`), repetir os itens 1 e 2.

### 13.4 Fluxo do pedido de ponta a ponta

Com o ViaCEP simulado por `page.route` e o `localStorage` limpo, sempre em 390 e repetindo em 1440:

**Preparação (criar a conta):**
1. Em `#/register`, preencher todos os campos com dados válidos.
   - O CEP simulado devolve rua, bairro, cidade e UF, que ficam guardados como endereço.
   - O botão entra em `loading` ("Criando conta…").
2. Confirmar que a tela vai para `#/login` com o toast "Conta criada. Entre para continuar."
3. Não entrar ainda: o pedido começa como visitante.

**Pedido como visitante:**
1. Abrir `#/menu`, clicar em "Adicionar" no Cheese Bacon e confirmar que o diálogo abre com `:modal === true`.
2. Desmarcar "Tomate" e somar +1 Bacon.
   - A camada vermelha some da pilha.
   - A legenda mostra "Sem tomate · +1 bacon".
   - O CTA mostra "Adicionar · R$ 29,49".
3. Apertar Esc e confirmar que o diálogo fecha e o foco volta ao botão.
4. Abrir de novo, repetir as escolhas e confirmar.
   - O diálogo fecha e o foco está no botão "Adicionar" do card.
   - O botão tem a classe `is-added`; em 120ms a rotação está entre 0 e 180°.
   - O badge mostra "1".
   - A região viva contém "Cheese Bacon adicionado ao carrinho".
5. Abrir o Smash Burger e confirmar que **nenhum** adicional vem marcado e que o preço mostra R$ 22,50.
6. Recarregar a página e conferir que o carrinho mantém 1 item.

**Carrinho:**
1. Em `#/cart`, o item mostra "Sem tomate" e "+1 bacon", o total é R$ 29,49 e o resumo diz "Entre para finalizar seu pedido."
2. "Entrar e finalizar" leva a `#/login?redirect=/payment`.

**Login:**
1. Com uma senha errada: em até 1,5 s, o banner `role="alert"` mostra "E-mail ou senha incorretos." e o botão sai do `loading`.
2. Com a senha correta, vai para `#/payment`.

**Pagamento:**
1. O resumo mostra o item e o total.
2. O CTA fica desabilitado até escolher "PIX".
3. Ao confirmar, o botão entra em `loading` e a tela vai para `#/confirmation`.

**Confirmação:**
1. O foco está no `h1` "Pedido recebido".
2. Aparece "Pedido #1001 · PIX".
3. O badge some, porque o carrinho foi esvaziado.

**Conta:**
1. Em `#/profile`, "Seus pedidos" lista o pedido #1001 com o total certo.
2. Clicar em "Sair" e entrar de novo com a mesma conta tem que funcionar [FLX-06].

**Quantidade e remoção:**
1. Adicionar uma bebida com quantidade 3: o badge mostra "3" e o link diz "Carrinho, 3 itens".
2. No carrinho, mudar a quantidade para 2: o total da linha é recalculado.
3. Remover o item: aparece o toast com "Desfazer"; desfazer devolve o item.

**Rotas:**
1. Abrir `#/payment` sem sessão leva a `#/login?redirect=/payment`.
2. Abrir `#/confirmation` sem pedido leva a `#/menu`.
3. Navegar de `#/menu` rolado até o fim para `#/cart` abre com `scrollY === 0`.

### 13.5 Teclado

Só com Tab, Shift+Tab, Enter, Espaço, setas e Esc:
- o primeiro Tab mostra o skip link;
- todos os controles mostram o anel de foco;
- no modal, o foco fica preso dentro dele;
- as setas trocam a forma de pagamento;
- o menu mobile e a gaveta do admin fecham com Esc e devolvem o foco;
- o menu de perfil do admin abre com Enter e fecha com Esc.

### 13.6 Micro-interações

| Interação | Conferência |
|---|---|
| Flip | `transform` intermediário durante o giro e volta a `none` depois de ~1,7 s |
| Odômetro | Ao ir de 9 para 10 itens, dois dígitos animam |
| Tilt | Ponteiro no canto do card: ângulo ≤ 4° em cada eixo. Com toque emulado (`hasTouch: true`, `isMobile: true`), nenhum `transform` |
| Montador | Contagem de camadas = ingredientes incluídos + adicionais |
| Movimento reduzido (as quatro) | `transform` computado `none`. O conteúdo e o resultado (texto, contagem, legenda) são os mesmos |

### 13.7 Performance e contraste

- **Peso:** a Home em 390 transfere ≤ 1,5 MB até `networkidle` sem rolar. As imagens servidas são WebP e têm `width` e `height`.
- **Imagem principal:** a foto do hero (`fetchpriority="high"`) é o elemento de maior pintura (LCP) da Home.
- **Contraste:** um script calcula todos os pares de `_tokens.scss` usados como texto e fundo (§2.2): todos ≥ 4,5:1 (ou ≥ 3:1 para borda, anel e texto grande).

### 13.8 Admin

Com o admin semeado pelo `createAdmin.html`, rodar §13.3 nas rotas de admin e conferir:
- **Sidebar:** um único item ativo por rota. Em 390 começa fechada e "Novo produto" fica clicável sem fechar nada.
- **Telas:** relatórios mostram os valores, o filtro de pedidos tem rótulo e o status aparece em português.

### 13.9 Entrega

- Os screenshots finais (1440 e 390, todas as rotas) vão para o PR junto com a tabela "achado do AUDIT → resolvido em".
- Um achado só conta como resolvido quando a verificação correspondente desta seção passa.
