# Auditoria de UI/UX: Smash Burger

Auditoria do estado atual da interface antes da repaginação. Cobre a loja (cliente) e o painel admin. Nada no código foi alterado: este arquivo e o `SPEC.md` são os únicos criados.

- **Código auditado:** commit `bd89c41` (idêntico a `main`).
- **Data:** 17/10/2026.

## Sumário

- [Como a auditoria foi feita](#como-a-auditoria-foi-feita)
- [Resumo](#resumo)
- [1. Mapa do projeto](#1-mapa-do-projeto)
- [2. Achados por categoria](#2-achados-por-categoria)
- [3. Defeitos de fluxo que afetam a experiência](#3-defeitos-de-fluxo-que-afetam-a-experiência)
- [4. Stack desatualizada e custo de atualizar](#4-stack-desatualizada-e-custo-de-atualizar)
- [5. Fora do escopo de UI, mas encontrado](#5-fora-do-escopo-de-ui-mas-encontrado)
- [6. O que já funciona](#6-o-que-já-funciona)
- [Apêndice A. Screenshots](#apêndice-a-screenshots)
- [Apêndice B. Resultado do axe por tela](#apêndice-b-resultado-do-axe-por-tela)

---

## Como a auditoria foi feita

### Execução

- **Build:** build de produção (`vite build` + `vite preview`), igual ao que vai para o GitHub Pages.
- **Instalação:** Yarn 3.8.7 com o `yarn.lock` do repositório, feita numa cópia fora do repo.
- **Navegador:** Chromium (Playwright 1.56) em duas viewports, 1440×900 e 390×844.

### Medições

- **Acessibilidade:** axe-core 4.10.3 (WCAG 2.0, 2.1 e 2.2 A/AA + boas práticas).
- **Contraste:** fórmula do WCAG.
- **Estilos:** valores computados com `getComputedStyle`.
- **Sobreposição:** `elementFromPoint`.
- **Alvos de toque:** `getBoundingClientRect`.
- **Peso das páginas:** bytes baixados por resposta de rede.

### Mapeamento do código

- Três subagentes trabalharam em paralelo: stack/CSS, inventário de telas e componentes, e fluxos.
- Conferi as afirmações deles no código.
- Todo defeito de fluxo da seção 3 foi **reproduzido no app rodando**.

### Contas de teste

- **Cliente:** fictício, gravado em `localStorage.user` no formato que o cadastro usa.
- **Admin:** os dados do `createAdmin.html`.

### Limitações

- **ViaCEP:** está bloqueado na rede deste ambiente. Nos testes de cadastro a resposta foi simulada (`page.route`), então o preenchimento real de endereço não foi visto.
- **Navegadores:** só Chromium. Safari/iOS e Firefox não foram testados.
- **Screenshots fora do repositório:** o pedido foi criar apenas `AUDIT.md` e `SPEC.md`, então as capturas ficaram fora do repo.
  - Os nomes citados (`01-home-1440.png` etc.) estão no scratchpad desta sessão.
  - Estão também nas três folhas de contato enviadas na conversa.
  - Se quiser versioná-las, é só dizer em qual pasta.
- **Carrossel da Home em página inteira:** a captura de página inteira deforma a faixa do carrossel por causa de `background-attachment: fixed`. Para essa seção, a evidência válida é `40-home-carrossel-viewport-*.png`, em que o título aparece normalmente.

### Escala de impacto

| Impacto | Critério |
|---|---|
| **Alto** | Impede ou engana o usuário numa tarefa principal (pedir, pagar, entrar), ou reprova WCAG AA num elemento de ação. |
| **Médio** | Atrapalha ou confunde, reprova AA em conteúdo secundário, ou cria inconsistência visível. |
| **Baixo** | Acabamento, dívida invisível para o usuário, ou risco não verificado. |

---

## Resumo

Os achados estão divididos em 11 categorias na seção 2, mais 10 defeitos de fluxo na seção 3. A contagem por impacto está no fim deste resumo.

### Os 12 problemas que mais pesam

1. **Sem retorno ao adicionar ao carrinho.** O único aviso de "adicionado" fica escondido atrás da navbar (`z-index` 999 contra 1000; medido em 1440 e 390), e não há contador no carrinho ([EST-16](#26-estados-de-interação)).
2. **Ação principal com contraste insuficiente.** Branco sobre o verde `#42b983` dá 2,47:1. O "Finalizar Pedido" laranja dá 2,94:1, e o link da página atual na navbar, 1,36:1 ([COR-01, 02, 04](#22-cor-e-contraste)).
3. **A ação principal muda de cor a cada tela.** São 6 cores: verde, verde-escuro, preto, azul, laranja e vermelho. A causa é o `ButtonComponent`, que recebe cor e tamanho crus por props e os aplica inline ([CON-01](#210-consistência-entre-componentes), [DEB-03](#211-dívida-de-css)).
4. **O pedido sai diferente do que o cliente escolheu.** Ingrediente marcado para remover não é removido, e os adicionais vazam para o próximo produto. Os dois foram reproduzidos ([FLX-02, 03](#3-defeitos-de-fluxo-que-afetam-a-experiência)).
5. **A confirmação do pedido fica escondida.** A página não tem estilo, e o título e o texto ficam sob a navbar fixa (medido: o h1 vai de y=0 a 38px) ([EST-17](#26-estados-de-interação)).
6. **O pagamento não mostra o que está sendo pago.** Não há itens, total nem endereço, e a tela confirma mesmo sem forma de pagamento escolhida ([HIE-02](#29-hierarquia-visual), [FLX-04](#3-defeitos-de-fluxo-que-afetam-a-experiência)).
7. **Login com senha errada não mostra nada.** A promise nunca termina ([EST-13](#26-estados-de-interação)).
8. **Imagens de câmera servidas sem tratamento.** A Home baixa 54,3 MB em 390px ([RES-01](#27-responsividade)).
9. **O modal de personalização não se comporta como modal.** Esc não fecha, o foco não entra nele e a página rola por trás. Além disso, o rodapé dele herda o preto do `footer` global ([A11Y-02](#28-acessibilidade), [DEB-02](#211-dívida-de-css)).
10. **Não há estado selecionado nem estado pressionado.** A categoria ativa do cardápio não aparece, e o projeto inteiro não tem `:focus-visible` nem `:active` ([EST-03, 04, 05](#26-estados-de-interação)).
11. **Visitante entra no carrinho sem senha.** Clicar em "Fazer Login" no carrinho autentica sem credenciais (reproduzido) ([FLX-01](#3-defeitos-de-fluxo-que-afetam-a-experiência)).
12. **Não existe sistema visual.** Os tokens são só de cor, com nomes ordinais (`$tertiary-color` … `$denary-color`). Não há tokens de tipografia, espaçamento, raio, sombra, z-index ou duração ([DEB-04](#211-dívida-de-css)). A fonte de texto declarada ("Roboto") nunca é carregada ([TIP-01](#21-tipografia)).

### Contagem por impacto

| Impacto | Seção 2 (categorias) | Seção 3 (fluxo) | Total |
|---|---|---|---|
| Alto | 18 | 7 | 25 |
| Médio | 54 | 3 | 57 |
| Baixo | 39 | 0 | 39 |
| **Total** | **111** | **10** | **121** |

Duas linhas da seção 2 só remetem a outro achado (EST-02 → COR-01; A11Y-01 → seção 2.2) e não entram na contagem.

---

## 1. Mapa do projeto

### 1.1 Stack e versões

Versões resolvidas no `yarn.lock`. A comparação com a última versão publicada e o custo de atualizar estão na [seção 4](#4-stack-desatualizada-e-custo-de-atualizar).

#### Base

| Item | Resolvido | Observação |
|---|---|---|
| Vue | 3.5.27 | SFC com `<script setup>` |
| vue-router | 4.6.4 | `createWebHashHistory`, base `/smash-burguer/` (`vite.config.js:22`) |
| Pinia | 2.3.1 | `persist: true` só em `user` e `admin`; `cart` e `products` não persistem |
| pinia-plugin-persistedstate | 4.7.1 | Pede `pinia >= 3.0.0`; o Yarn avisa que o peer não é atendido |
| Vite | 6.4.3 | `vite-plugin-vue-devtools` ligado também no build |
| Sass | sass-embedded 1.97.3 | Só `@use`, sem `@import`. **Nenhuma depreciação:** os 41 pontos de entrada compilam com 0 avisos no 1.97.3 e no 1.105.2 (o mais recente) |

#### Interface

| Item | Resolvido | Observação |
|---|---|---|
| Carrossel | vue3-carousel 0.14.0 | Rótulos ARIA da lib ficam em inglês (sem `i18n`) |
| Ícones | Font Awesome 6.7.2 + vue-fontawesome 3.1.3 | Material Icons é carregado em `index.html:7` e não é usado |
| Fontes | @fontsource/bebas-neue 5.2.7 | Só o peso 400. "Roboto" é declarada, mas não é carregada |
| Gráficos | chart.js 4.5.1 + vue-chart-3 3.1.8 | O único gráfico está comentado (`ChartDashboard.vue:3`) |
| SVG | vite-svg-loader 5.1.0 | O projeto não tem nenhum `.svg` |

#### Ferramentas

| Item | Resolvido | Observação |
|---|---|---|
| Testes | Vitest 3.2.6, @vitest/coverage-v8 3.0.5 | Fixado em 3.0.5, o coverage não atende o peer `vitest 3.0.5` |
| Lint | ESLint 9.39.2, eslint-plugin-vue 9.33.0, Prettier 3.8.1 | Nenhum lint de CSS |
| Gerenciador de pacotes | Yarn Berry (lockfile v6 = Yarn 3) | Sem `packageManager` no `package.json`; o CI roda `yarn install` com Node 20 (`.github/workflows/deploy.yml`) |

- **Framework de UI:** nenhum. Não há Bootstrap, Tailwind, Vuetify nem similares.

### 1.2 Organização do CSS

| Aspecto | Como está |
|---|---|
| **Pré-processador** | SCSS com `@use`. As parciais ficam em `src/assets/styles/{base,components,layouts,pages}`, e `_playground.scss` fica solta. |
| **Composição** | `src/assets/main.scss:1-57` faz `@use` de quase todas as parciais, **globalmente**. Os componentes fazem `@use` da mesma parcial de novo dentro de `<style scoped>` (ex.: `PaymentView.vue:58-60`, `AlertComponent.vue:41-43`). Resultado: cada regra existe duas vezes, uma global e uma com escopo. |
| **Tokens** | `base/_variables.scss` só tem cores: 42 tokens com nomes ordinais e uma seção "Teste de novas cores" (linha 10). Dez nunca são usados e cinco valores se repetem dentro do próprio arquivo. Não há tokens de espaçamento, tipografia, raio, sombra, z-index ou duração. **Não há CSS custom properties** no código do projeto. |
| **Mixins** | `base/_mixins.scss` tem `respond-to($size)`, desktop-first com `max-width` e 6 breakpoints de 320 a 1440 (linhas 4-22), e `flex-center` (25-30). |
| **Tipografia base** | `base/_typography.scss`: Bebas Neue via @fontsource (1), `$font-family-primary: "Roboto", sans-serif` (3). `base/_reset.scss` só aplica a fonte no `body` (12-14). Não define tamanho base, altura de linha nem `font: inherit` nos controles. |
| **Estilos fora das folhas** | O `ButtonComponent` recebe `backgroundColor`, `fontColor`, `fontSize`, `buttonSize` e `borderRadius` como strings e aplica tudo via `:style` inline (`ButtonComponent.vue:14, 27-56, 93-99`). O `ChartDashboard` tem CSS inline. A seção do carrossel recebe a imagem de fundo por `:style` (`HomeView.vue:14-16`). |

### 1.3 Telas

| Rota | View | Layout | Guard | Situação visual |
|---|---|---|---|---|
| `#/` | `HomeView.vue` | Main | — | Hero sem CTA + carrossel de 7 itens |
| `#/menu` | `MenuView.vue` | Main | — | Banner, filtros, grade de 4 itens, paginação, "Ver Carrinho" |
| `#/cart` | `CartView.vue` | Main | — | Painel marrom com lista e total; aviso de login para visitantes |
| `#/payment` | `PaymentView.vue` | Main | **nenhum** | 4 rádios e "Confirmar Pagamento"; sem resumo |
| `#/confirmation` | `ConfirmationView.vue` | Main | **nenhum** | Sem estilo e sob a navbar |
| `#/register` | `auth/RegisterView.vue` | Main | — | Formulário de 7 campos |
| `#/login` | `auth/LoginView.vue` | Main | — | Formulário de 2 campos |
| `#/profile` | `auth/ProfileView.vue` | Main | `requiresAuth` | Dados pessoais + histórico (sempre vazio) |
| `#/playground` | `Playground.vue` | Main | **nenhum** | Página de teste exposta |
| `#/admin/login` | `admin/LoginAdminView.vue` | nenhum | — | Card branco sobre ilustração em giz |
| `#/admin` | `admin/AdminDashboard.vue` | Admin | admin | Título + caixa vazia |
| `#/admin/products` | `admin/ProductManagement.vue` | Admin | admin | Grade de cards, modal de produto |
| `#/admin/orders` | `admin/OrderManagement.vue` | Admin | admin | 2 pedidos mock |
| `#/admin/reports` | `admin/SalesReports.vue` | Admin | admin | 4 cards só com título |
| `#/*` | `NotFound.vue` | nenhum | — | Fora do layout, com a paleta padrão do Vue |

Rotas definidas em `src/router/index.js:13-114`.

### 1.4 Componentes

São 27 arquivos em `src/components` e `src/layouts`, todos em uso.

| Componente | Usado em | Estados que existem | Estados que faltam |
|---|---|---|---|
| ButtonComponent | 16 pais | hover (`opacity .8`) | focus, active, disabled, loading, selecionado |
| BurguerCard | Cardápio | hover do botão | hover/focus do card, imagem quebrada |
| CarouselBurguer | Home | hover do card (sobe 3px, mas não é clicável) | foco próprio, vazio |
| ModalAdditional | BurguerCard, Carousel | aberto/fechado | Esc, prender foco, travar scroll |
| IngredientsList | ModalAdditional | checkbox nativo | foco próprio |
| AdditionalsList | ModalAdditional | hover | aparência de desabilitado, focus, active |
| QuantityControl | ModalAdditional | hover | aparência de desabilitado, focus |
| CartItem | Carrinho | hover do "Remover" | confirmação, focus |
| FormGroup | Login, Cadastro, Perfil, Login admin, Modal | foco fraco, erro | disabled, ligação ARIA do erro |
| AlertComponent | Home, Cardápio, Perfil | visível 3 s | `aria-live`, variante de erro, fechar |
| PaginationComponent | Cardápio | hover | página atual e disabled (o CSS existe e nunca é aplicado) |
| BannerComponent | Home, Cardápio | overlay, hover da imagem | — |
| SeparatorLines | Banner, Footer, NavbarAdmin | — | — |
| TheNavbar | MainLayout | hover, ativo, menu aberto | foco próprio, Esc, contador do carrinho |
| TheFooter, ContactInfo, SocialMediaLinks | MainLayout | — | hover/focus dos links, nome acessível |
| MainLayout | router | — | compensação da navbar, rodapé no fim da página, skip link |
| AdminLayout | router | sidebar colapsada | — |
| SidebarAdmin | AdminLayout | hover, ativo | focus, nome acessível; dois itens ativos ao mesmo tempo |
| TheNavbarAdmin, SearchBar, NotificationBar, UserProfileBar | AdminLayout | hover | focus (removido na busca), teclado nos `div @click` |
| AdminCard | Admin | hover, focus-within, loading | vazio, erro |
| ModalProducts | Produtos (admin) | aberto/fechado | Esc, clique fora, mensagens de erro |
| ChartDashboard | Dashboard | — | gráfico, vazio |

Sobreposições:
- **Cards de produto:** três (`BurguerCard`, o slide do carrossel e o card do admin).
- **Steppers:** dois (`QuantityControl` e o contador do `AdditionalsList`).
- **Modais:** dois (`ModalAdditional` e `ModalProducts`).
- **Formatos de preço:** dois (ver TIP-04).

### 1.5 Fluxos principais

| Fluxo | Caminho | Estado |
|---|---|---|
| Pedido | Home ou Cardápio → modal Personalizar → toast → Carrinho → Pagamento → Confirmação | Completa de ponta a ponta. Pelo caminho: a personalização se perde (FLX-02/03), o retorno de "adicionado" fica escondido (EST-16), o pagamento não mostra o pedido (HIE-02) e a confirmação fica sob a navbar (EST-17). O carrinho não é limpo e o pedido não vai para o histórico (FLX-05). |
| Conta | Perfil (sem login) → Login ↔ Cadastro → Perfil → Sair | Não há "Entrar" na navbar: o login só é alcançado pelo redirect de "Perfil". O cadastro passa pelo ViaCEP sem indicador de carregamento. Senha errada não dá retorno (EST-13). Depois de sair, a conta some e o novo login trava (FLX-06). |
| Visitante no carrinho | Carrinho → "Fazer Login" / "Criar Conta" | Quebrado: autentica sem credenciais ou grava lixo como conta (FLX-01). |
| Admin | Login admin → Dashboard → Produtos → Pedidos → Relatórios | Dashboard e Relatórios aparecem vazios (EST-10). Excluir, detalhes, busca, notificações e "Atualizar Status" não fazem nada (FLX-09). Em 390px a sidebar cobre o conteúdo (RES-02). |

---

## 2. Achados por categoria

Cada linha traz a tela ou o componente, o arquivo:linha, o problema, a evidência e o impacto. Os nomes de screenshot estão listados no [Apêndice A](#apêndice-a-screenshots). Todos os contrastes foram calculados ou medidos com axe sobre a cor computada.

### 2.1 Tipografia

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| TIP-01 | Global | `src/assets/styles/base/_typography.scss:3`; `base/_reset.scss:12-14` | A fonte de texto é "Roboto", mas nada a carrega (nem @fontsource, nem `@font-face`, nem `<link>`). Todo o texto cai no `sans-serif` do sistema, que muda por SO: Arial no Windows, Helvetica no Mac, Liberation Sans no Linux dos screenshots. | `$font-family-primary: "Roboto", sans-serif;` sem import correspondente. Nos screenshots o texto aparece em Liberation Sans. | Médio |
| TIP-02 | Títulos de página | `_login.scss`, `_register.scss`, `_profile.scss`, `_payment.scss`, `_cart-page.scss:37-42` | Há duas vozes e nenhuma escala. Bebas Neue só aparece na marca e nos banners; os títulos de página ("Login", "Criar Conta", "Meu Perfil", "Seu Carrinho", "Escolha a forma de Pagamento") são sans-serif do sistema em negrito, com tamanhos escolhidos tela a tela. São **21 tamanhos de fonte diferentes em 90 declarações**, de 0.8rem a 6rem, mais 14, 16 e 18px nas props de botão. `line-height` aparece só 5 vezes, e o `body` não define nenhum. | `06-login-1440`, `21-perfil-1440`, `23-cart-logado-1440`, `24-payment-com-pedido-1440`; contagem nas folhas | Médio |
| TIP-03 | Controles de formulário | `base/_reset.scss:1-30` | O reset não define `font: inherit` para input, textarea, select e button. O textarea "Observação" do modal sai em fonte monoespaçada (padrão do navegador). | `41-modal-bebida-viewport-1440.png`: placeholder "Alguma observação especial?" em mono | Baixo |
| TIP-04 | Preço nos cards (Home, Cardápio, Admin) | `BurguerCard.vue:6, 54-56`; `CarouselBurguer.vue:11`; `admin/ProductManagement.vue:48`; `admin/OrderManagement.vue:35, 41` | `R$ {{ price.toFixed(2) }}` mostra "R$ 25.99", com ponto decimal. Modal e carrinho usam `formatPrice` (Intl pt-BR) e mostram "R$ 25,99". Nenhum lugar usa algarismos tabulares, então colunas de preço não alinham. | `01-home-1440` (R$ 25.99) × `11-modal-personalizar-1440` (R$ 25,99); `utils/formatters.js:7-12` | Médio |
| TIP-05 | Títulos com emoji | `HomeView.vue:19`; `CartView.vue:94`; `ConfirmationView.vue:4` | "🍔 Nossos Hambúrgueres 🍔", "Seu Carrinho 🛒" e "Pedido Confirmado! 🎉": o emoji muda de desenho por SO e é lido em voz alta pelo leitor de tela. | `01-home-1440`, `23-cart-logado-1440` | Baixo |
| TIP-06 | Banner do Cardápio | `BannerComponent.vue:5-13`; `_banner.scss:47-82` | Subtítulo branco fino sobre a foto. O overlay é leve e o texto cruza o pão claro do hambúrguer. | `02-menu-1440` | Baixo |
| TIP-07 | Wordmark e títulos em Bebas Neue (navbar, hero, rodapé) | `base/_typography.scss:1`; `_banner.scss:20`; `_navbar.scss:26-29`; `_footer.scss:72` | Só o peso 400 da Bebas Neue é carregado, mas os títulos pedem 700 (o `.banner h1` explicitamente; os outros por herança, porque o reset não zera o peso dos títulos). O navegador desenha um negrito sintético, que engrossa e borra a marca. | medido: fontes carregadas = `Bebas Neue 400`; `font-weight` computado = 700 com `font-synthesis: weight` | Médio |

### 2.2 Cor e contraste

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| COR-01 | Navbar: link da página atual e hover | `_navbar.scss:111-114`; `_variables.scss:35` (`$color-text-quaternary: #210234`) | O link ativo e o link sob o mouse ficam roxo-escuro #210234 sobre o verde #063520, **1,36:1**. O "você está aqui" desaparece e o link some no hover. | axe em todas as telas do cliente (1,36:1). Hover medido: `color` branco → `rgb(33,2,52)`. `01-home-1440` (item "Home" ilegível) | Alto |
| COR-02 | Botões verdes de ação ("Entrar", "Confirmar Pagamento", "Voltar ao Menu", "Fazer Login", "Criar Conta", "Salvar Alterações", "Voltar para Home", "Novo Produto", item ativo da sidebar) | `_variables.scss:4` (`$tertiary-color: #42b983`); `#42b983` passado cru em `CartView.vue:44, 53` e `PaymentView.vue:36`, entre outros | Branco sobre #42b983 dá **2,47:1** (AA exige 4,5:1 para 16px). É o verde padrão do Vue. | axe: login, cart, payment, perfil, 404, admin-login, admin-produtos, admin-pedidos | Alto |
| COR-03 | Filtro de categorias (Cardápio) | `MenuView.vue:11-25` (`backgroundColor="#3aa876"`) | Branco sobre #3aa876 dá **2,98:1**, a 18px normal (ainda não é "texto grande"). | axe menu@1440 e menu@390 | Alto |
| COR-04 | "Finalizar Pedido" e preços em laranja | `_cart-page.scss:131-133` (`$quinary-color: #ff6600`); `_variables.scss:6` | "Finalizar Pedido" (branco sobre #ff6600) dá **2,94:1**: o botão que fecha a compra é o de menor contraste da tela. Preço do produto e dos adicionais no modal (#ff6600 sobre branco) dá **2,93:1**. | axe menu-modal (2,93:1); botão calculado a partir do estilo da linha 133; `23-cart-logado-1440` | Alto |
| COR-05 | Texto secundário: subtítulo da Home, carrinho vazio, "nenhum pedido", descrição no modal, dados do cliente no admin | `_variables.scss:33` (`$color-text-secondary: #a4a4a4`) | Cinza #a4a4a4 sobre #fff8e7, #f8f9fa e branco: **2,35 a 2,49:1**. | axe: home (2,35), cart-vazio (2,36), perfil (2,36), menu-modal (2,49), admin-pedidos (2,49) | Médio |
| COR-06 | Links de texto ("Criar conta", "Faça login", "Ver Cardápio") | `base/_reset.scss:27-30` (sublinhado removido); cor `$tertiary-color` | Verde #42b983 sobre branco ou #f8f9fa dá **2,34 a 2,47:1**, e sem sublinhado: o link só se distingue pela cor. | axe login (2,47), perfil (2,34). Hover medido: só no hover aparece o sublinhado. | Médio |
| COR-07 | Erros de formulário | `_variables.scss:39` (`#ff0000`); `_form-group.scss:54-59` | Vermelho puro sobre branco dá **3,99:1** a 14px. | axe register-erros (8 nós) | Médio |
| COR-08 | Botões azuis (paginação, "Ver Carrinho", CTA do modal, "Editar", "Excluir", "Confirmar", "Detalhes") | `ButtonComponent.vue:34` (padrão `#3498db`); `_pagination-component.scss:5-6` | Branco sobre #3498db dá **3,15:1**. Os números da paginação (#333 sobre #3498db) dão **4,01:1**. | axe menu, admin-produtos; cálculo | Médio |
| COR-09 | Bordas de campo | `_form-group.scss:21` (`$border-color: #ddd`) | Borda #ddd sobre branco dá **1,36:1**, abaixo dos 3:1 exigidos para limite de componente (WCAG 1.4.11). Campo vazio quase some no card branco. | cálculo; `06-login-1440` | Médio |
| COR-10 | Admin (paleta própria) | `_sidebar-admin.scss:5-16, 82-86` | O admin usa o #2c3e50 da documentação do Vue mais o verde #42b983. O item ativo da sidebar fica com branco sobre verde, **2,47:1**. | axe admin-produtos e admin-pedidos (15 nós cada) | Médio |
| COR-11 | "Sair" (Perfil) e "Abrir Modal" (Playground) | `ProfileView.vue:133-142` (`#ff0000`); `Playground.vue:4-9` | Branco sobre vermelho puro dá **4,00:1**. É vermelho de alarme numa ação comum, e é o elemento mais saturado do Perfil. | axe perfil; `21-perfil-1440` | Baixo |
| COR-12 | 404 | `src/assets/styles/pages/_not-found.scss` | Paleta sem relação com a marca. "404" verde sobre #f8f9fa dá **2,34:1**; texto #6c757d dá **4,44:1**. | axe 404; `08-404-1440` | Baixo |
| COR-13 | Paleta em uso | `_variables.scss:1-54` | A mesma função usa cores diferentes. Preço em 4 cores: verde (Home), preto (Cardápio), laranja (modal), vermelho #c04848 (carrinho). Superfícies em 6 tons de fundo claro e escuro sem papel definido: #fff8e7, #ffefd5, #fff3e0, #f8f9fa, #3e2723, #063520. Mais o roxo #38184c no alerta e na linha sob os títulos. | `01-home-1440`, `02-menu-1440`, `11-modal-personalizar-1440`, `23-cart-logado-1440` | Médio |

### 2.3 Espaçamento e layout

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| ESP-01 | Global | `_variables.scss` (não há tokens de espaço) | Sem escala de espaçamento: os valores são escolhidos regra a regra. O padding usa 112 valores em rem, mais px (`_menu-page.scss:35`) e % (`_banner.scss:87`); a margin usa 92 em rem e 4 em px. A prop `buttonSize` mistura `12px 24px`, `8px 16px`, `14px 28px`, `16px 32px`, `0.75rem 1.5rem`, `1rem 2rem` e `1rem 9rem`. O bloco `max-width: 1200px; margin: 0 auto` está copiado em 8 arquivos. | contagem nas folhas e nas props | Médio |
| ESP-02 | Compensação da navbar fixa | `layouts/MainLayout.vue:4-6`; `_navbar.scss:11, 20`; `_menu-page.scss:9` (9rem); `_cart-page.scss:5` (12rem); `_payment.scss:5`, `_login.scss:5`, `_register.scss:5`, `_profile.scss:5`, `_banner.scss:9` (8rem) | O `<main>` não reserva o espaço da navbar fixa de 64px. Cada tela compensa por conta própria, com 128 a 192px. O respiro do topo muda de tela para tela, e quem não compensa fica coberto (Confirmação, EST-17). | `03-cart-vazio-1440` (painel começa em 192px) × `06-login-1440` (128px) | Médio |
| ESP-03 | Cardápio | `_menu-page.scss:9` | Vão de cerca de 150px entre o banner e os filtros: o padding pensado para a navbar soma com o banner. | `02-menu-1440` | Baixo |
| ESP-04 | Home (hero) | `_banner.scss`; `HomeView.vue:2-11` | O hero ocupa 668px em 1440 e cerca de 775px em 390, com uns 130px vazios sob o texto e nenhuma ação. | `01-home-1440`, `01-home-390` | Médio |
| ESP-05 | Carrinho | `_cart-page.scss:4-56` | Caixas aninhadas (fundo #fff3e0 → painel marrom → painel claro → card do total) somam paddings. Em 390 a lista usa cerca de 310 dos 390px. | `23-cart-logado-390` | Baixo |
| ESP-06 | Perfil | `ProfileView.vue:133-142` | "Sair" vira o 3º item da grid de 2 colunas e fica solto sob a coluna da esquerda. | `21-perfil-1440` | Baixo |
| ESP-07 | Login admin em 390 | `_login-admin.scss:13-25` | O card encosta nas bordas da tela, sem margem lateral. | `09-admin-login-390` | Baixo |
| ESP-08 | Rodapé em páginas curtas | `layouts/MainLayout.vue:1-16` (sem altura mínima) | O rodapé sobe e sobra uma faixa branca abaixo dele. | `25-confirmation-apos-pagar-1440`, `10-playground-1440` | Baixo |
| ESP-09 | Playground | `_playground.scss:1-3` | Título colado na borda esquerda (x=0). | `10-playground-1440` | Baixo |

### 2.4 Bordas e raios

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| RAI-01 | Global | props de `ButtonComponent` em cada pai; `_form-group.scss:22`; `_modal.scss:17`; `_payment.scss:8-14`; `_admin-card.scss` | Sem tokens de raio: **13 valores em 46 declarações** (8px, 4px, 12px, 50%, 6px, 2rem, 10px, 0.5rem, `0 0 2rem 2rem`, 5px, 20px, 1rem, `0 0 8px 8px`), mais 4, 6 e 8px nas props de botão. Na tela: 4px nos botões padrão, 6px nos do carrinho, 8px nos campos, 12px no modal, 20px no pagamento e 2rem (32px) nos cards do admin. | contagem nas folhas; screenshots 06, 11, 24, 31 | Médio |
| RAI-02 | Cards do admin × cards da loja | `_admin-card.scss` × `_burger-card.scss:4-11` | Dois sistemas de forma: cantos muito arredondados no admin e quase retos na loja. | `31-admin-produtos-1440` × `02-menu-1440` | Baixo |
| RAI-03 | Modal Personalizar | `ModalAdditional.vue:3`; `_modal.scss:4-13` | O `<dialog>` mantém a borda padrão do navegador (computado: `solid 3px`), e o `margin-top: 1.5rem` desloca o escurecimento 24px para baixo. | estilo computado medido; `11-modal-personalizar-1440` | Baixo |
| RAI-04 | Modal de produto (admin) | `src/assets/styles/components/admin/_modal-products.scss` | Faixa verde só na borda esquerda do modal, sem equivalente em outro componente. | `32-admin-modal-produto-1440` | Baixo |

### 2.5 Sombras e profundidade

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| SOM-01 | Global | `_variables.scss:15` (`$shadow-color`); `_modal.scss:22`; `_alert.scss:12` | Não há escala de elevação: são **14 sombras diferentes em 26 declarações**, com deslocamento de 2 a 8px e desfoque de 4 a 24px escolhidos regra a regra. A mesma sombra (`0 4px 6px rgba(0,0,0,.1)`) serve alerta, modal, card do admin e card de pagamento. O modal, que fica acima de tudo, tem a mesma profundidade de um card. | `11-modal-personalizar-1440`; `31-admin-produtos-1440`; contagem nas folhas | Médio |
| SOM-02 | Empilhamento | `_navbar.scss:7` (1000); `_alert.scss:13` (999); `_modal.scss:11` (999); `layouts/_admin-layout.scss:45-51` (1200); `admin/_modal-products.scss:4-9` (1000); `admin/_sidebar-admin.scss:5-16` (999) | `z-index` soltos e sem escala: 7 valores (1, 2, 10, 999, 1000, 1200, 1300). A navbar (1000) fica acima do alerta e do fundo do modal (999): o alerta some atrás dela, e com o modal aberto a navbar continua clara e clicável. O header do admin (1200) também fica acima do modal de produto (1000). | `elementFromPoint` no centro do alerta retorna `navbar-main__link` (1440) e `navbar-main__container` (390); `11-modal-personalizar-1440` (navbar não escurecida) | Alto |
| SOM-03 | Cards | `_carousel.scss:23-42` × `_burger-card.scss` | O card do carrossel sobe 3px no hover sem ser clicável (cursor padrão), e o do cardápio não reage. A profundidade não comunica nada. | medição de hover: `transform` muda, `cursor: auto` | Baixo |
| SOM-04 | Banner | `_banner.scss:38-44` | A imagem do banner, que não é interativa, cresce e sobe no hover (`scale(1.05) translateY(-10px)`), sugerindo uma ação que não existe. | código | Baixo |

### 2.6 Estados de interação

#### Hover

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-01 | Todo botão do `ButtonComponent` | `_buttons.scss:17-19` | O hover é `opacity: .8`, igual para qualquer variante: o botão fica mais claro e perde ainda mais contraste (ver COR-02). A cor, por ser inline, não pode ser trocada pela folha de estilo. | medição: `opacity 1 → 0.8` em "Entrar", categoria, paginação, "Ver Carrinho", carrossel | Médio |
| EST-02 | Navbar | `_navbar.scss:111-114` | Ver COR-01: o link some no hover. | — | (contado em COR-01) |

#### Focus

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-03 | Global | `_form-group.scss:40-44`; `admin/navbar/_search-bar.scss:40-42`; `admin/_modal-products.scss:61, 82`; `admin/_order-management.scss:33` | **Não existe `:focus-visible` no projeto.** Botões e links dependem do anel padrão do navegador. Os campos trocam o `outline` por uma borda verde de 1px (2,47:1) com sombra de 10%. A busca do admin tira o foco sem substituto, então ele fica invisível. | `16-foco-teclado-navbar-1440` (anel padrão); busca por `focus-visible` sem resultado; `_search-bar.scss:41` (`outline: none`) | Alto |

#### Active (pressionado)

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-04 | Global | — | **Não existe `:active` no projeto.** No celular, onde não há hover, tocar num botão não dá nenhum retorno visual. | busca por `:active` sem resultado | Médio |

#### Selecionado

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-05 | Filtro de categorias | `MenuView.vue:11-25`; `ButtonComponent.vue:10-16` | A categoria escolhida não fica marcada: os três botões têm o mesmo fundo e não há `aria-pressed`. | medido depois de clicar "Bebidas": os 3 com `rgb(58,168,118)`, `aria-pressed` nulo; `14-menu-bebidas-1440` | Alto |
| EST-06 | Paginação | `PaginationComponent.vue:55-103`; `_pagination-component.scss:20-28`; `ButtonComponent.vue:10-16` | O componente calcula `active` e `disabled`, o CSS existe (com `!important`), mas o `ButtonComponent` ignora as duas flags. A página atual não aparece e "…" é um botão que não faz nada. | código; `02-menu-1440` (1, 2 e » iguais) | Médio |

#### Disabled

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-07 | Quantidade e adicionais | `AdditionalsList.vue:13, 24` × `additionals-list.scss:54-58`; `QuantityControl.vue:6, 17` × `quantity-control.scss:20-23` | O template usa o atributo `disabled` e o CSS mira a classe `.disabled`. No limite (0, 5 ou 10) o botão para de funcionar sem parecer desabilitado. | código | Baixo |
| EST-08 | "Finalizar Pedido" e "Confirmar Pagamento" | `_cart-page.scss:139-142`; `PaymentView.vue:34-42` | Não há desabilitado real. O `[disabled]` estilizado está num `<a>`, que não aceita o atributo. "Confirmar Pagamento" continua ativo sem forma escolhida e navega para a confirmação (ver FLX-04). | reprodução | Médio |

#### Loading

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-09 | Login, cadastro, perfil, login admin | `services/authServices.js:7-17, 28, 39`; `services/adminAuthServices.js:4-20`; `LoginView.vue:5, 24-33` | Esperas de 1 s (e a chamada ao ViaCEP no cadastro) sem indicador. O botão continua clicável, e o handler roda duas vezes por clique (`@click` + submit). | `20-login-carregando-1440` (só o hover muda o botão); código | Médio |

#### Vazio

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-10 | Dashboard e Relatórios (admin) | `ChartDashboard.vue:3`; `SalesReports.vue:14, 24, 34, 44` × `AdminCard.vue:10-19` | Áreas vazias sem mensagem. O gráfico está comentado e o conteúdo dos cards está num slot (`#content`) que o `AdminCard` não tem. | `30-admin-dashboard-1440`, `34-admin-relatorios-1440` | Médio |
| EST-11 | Carrinho vazio e "nenhum pedido" | `CartView.vue:9-14`; `ProfileView.vue:126-129` | Os dois existem, mas são texto cinza de 2,36:1 mais um botão, sem sugestão do que fazer em seguida. | `03-cart-vazio-1440`, `21-perfil-1440` | Baixo |
| EST-12 | Categoria sem itens, filtro de pedidos sem resultado | `MenuView.vue:27-34`; `admin/OrderManagement.vue:18-60` | A lista fica em branco, sem mensagem. | código | Baixo |

#### Erro

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-13 | Login do cliente | `services/authServices.js:7-17`; `LoginView.vue:93-99` | Senha errada não mostra nada. O `throw` acontece dentro do `setTimeout`, então a promise nunca termina e o `alert` previsto nunca roda. | reprodução: `18-login-erro-1440` sem mensagem; 2 `pageerror` "Credenciais inválidas" no console | Alto |
| EST-14 | Erro por `alert()` nativo | `LoginView.vue:96, 99`; `RegisterView.vue:181-192`; `admin/LoginAdminView.vue:84-86` | Quando o erro chega à tela, chega por `alert()` do navegador: fora da marca e bloqueante. No admin ele dispara duas vezes. | código | Médio |
| EST-15 | Erros de campo | `FormGroup.vue:34`; `_form-group.scss:30-38, 54-59` | O erro inline existe (cadastro), mas não tem `aria-invalid`/`aria-describedby`, usa vermelho de 3,99:1 e não some enquanto o usuário corrige. | `19-register-submit-vazio-1440` | Médio |

#### Sucesso e retorno

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| EST-16 | "Adicionado ao carrinho" | `_alert.scss:4-21`; `AlertComponent.vue:5, 24-36`; `HomeView.vue:25, 51-55`; `MenuView.vue:55, 86-90` | É o único retorno ao adicionar e fica **atrás da navbar** (`top: 20px`, `z-index` 999 < 1000). Some em 3 s, não reaparece quando o mesmo produto é adicionado de novo e não é anunciado (sem `role="status"`). Não há contador no ícone do carrinho. | medido: `elementFromPoint` no centro do alerta retorna a navbar; `12-apos-adicionar-1440` (roxo aparecendo sob a navbar) | Alto |
| EST-17 | Confirmação do pedido | `ConfirmationView.vue:1-8` | A página não tem estilo (o comentário diz "Código em desenvolvimento"). O título e o texto ficam **sob a navbar** (h1 de y=0 a 38px; navbar até 64px). Não há número nem resumo do pedido. | medido em 1440 e 390; `25-confirmation-apos-pagar-1440` e `-390` | Alto |

### 2.7 Responsividade

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| RES-01 | Imagens (Home, Cardápio, modal) | `src/json/products.json:94-233`; `CarouselBurguer.vue:7` (sem `loading="lazy"`) | Fotos originais de câmera, sem `srcset` nem `<picture>`. Têm até 8000px de largura, pesam de 2,9 a 20 MB cada e aparecem em cards de cerca de 370px. A Home baixa **54,3 MB** em 390px (54 MB em 9 imagens) e o Cardápio, **31,7 MB**. Em rede móvel, os cards ficam vazios por muito tempo. `public/images` soma 100 MB. | medição de rede; `suco-abacaxi.jpg` 20 MB (5333×7999), `batata-frita.jpg` 16 MB (6240×4160) | Alto |
| RES-02 | Admin em 390 | `layouts/AdminLayout.vue:24`; `admin/_sidebar-admin.scss:149-153` | A sidebar começa aberta, ocupa 250 dos 390px e não escurece o fundo. "Novo Produto" fica inalcançável até ela ser fechada: o clique falhou no teste. | `30-admin-dashboard-390`, `31-admin-produtos-390` | Médio |
| RES-03 | Filtro de categorias em 390 | `_menu-page.scss:15-17` (`flex-direction: column` em ≤480px) | Os três filtros empilham um por linha e empurram o primeiro produto cerca de 170px para baixo. | `02-menu-390` | Médio |
| RES-04 | Primeira dobra da Home em 390 | `_banner.scss` | Os primeiros 844px mostram só título, subtítulo e foto: nenhum produto e nenhuma ação. | `01-home-390` | Médio |
| RES-05 | Breakpoints | `base/_mixins.scss:4-22` | Desktop-first (`max-width`). O menu mobile só aparece até 480px; entre 481 e 1023px a navbar horizontal precisa caber. **Não verificado** nessa faixa (só 1440 e 390 foram capturados). | código | Baixo |
| RES-06 | Carrossel em 390 | `_carousel.scss:108-114` | Os pontos de paginação ficam sobre a borda inferior do card. | `40-home-carrossel-viewport-390` | Baixo |
| RES-07 | `background-attachment: fixed` | `_home.scss:18` | O Safari iOS não suporta essa propriedade (cai para `scroll`). O efeito real lá **não foi verificado**. | código | Baixo |
| RES-08 | Nome e Sobrenome no cadastro | `_register.scss:32-36` | Os dois campos ficam lado a lado sem breakpoint; em 390 cada um tem cerca de 130px. | `07-register-390` | Baixo |

Ponto positivo: nenhuma tela testada tem rolagem horizontal em 390px (`scrollWidth` = 390 em todas).

### 2.8 Acessibilidade

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| A11Y-01 | Contraste | ver 2.2 | 15 pares de cor de texto reprovam AA, mais a borda dos campos, que reprova o limite de componente (WCAG 1.4.11). Lista no [Apêndice B](#apêndice-b-resultado-do-axe-por-tela). | axe + cálculo | (contado em 2.2) |
| A11Y-02 | Modal Personalizar | `ModalAdditional.vue:3, 19`; `BurguerCard.vue:63-67` | Não é modal de verdade (`<dialog :open>` em vez de `showModal()`). Esc não fecha, o foco fica no botão de trás, a página rola por trás e o Tab sai do modal. O `<main>` interno cria um segundo landmark principal. | medido: `:modal` = false; depois do Esc, `open` = true; `activeElement` = botão do card; `overflow` do body = `visible`. axe: `landmark-no-duplicate-main` | Alto |
| A11Y-03 | Modal de produto (admin) | `admin/ModalProducts.vue:2` | É um `<section>` sem `role="dialog"`. Não fecha com Esc nem com clique fora, e não prende o foco. | código | Médio |
| A11Y-04 | Alvos de toque | `_navbar.scss:42-57`; `_carousel.scss:100-114`; `_modal.scss:48-58`; `_pagination-component.scss:13-17`; `quantity-control.scss` | Abaixo de 24×24px, o mínimo do WCAG 2.2 AA (2.5.8): pontos do carrossel (**16×4**), botão hambúrguer (**24×18**), × do modal (**14×28**). Abaixo de 44×44px: paginação (39×28), setas do carrossel (30×30), +/– (32×32). | medição em 390; axe `target-size` (home: 7 nós) | Alto |
| A11Y-05 | Links sociais do rodapé | `layout/TheFooterSocialMediaLinks.vue:5-13` | Quatro links que só têm ícone, sem nome acessível (o leitor diz só "link"). Abrem em nova aba sem aviso. | axe `link-name` em todas as telas do cliente | Médio |
| A11Y-06 | Botões só com ícone (admin) | `admin/layout/SidebarAdmin.vue:16-18, 37-39`; `admin/layout/TheNavbarAdmin.vue:5-19` | Fechar sidebar, sair e alternar sidebar não têm nome acessível. | axe `button-name` (admin) | Médio |
| A11Y-07 | Clicáveis que não recebem foco (admin) | `admin/layout/navbar/NotificationBar.vue:3-8`; `admin/layout/navbar/UserProfileBar.vue:3, 14-28` | Notificações e menu de perfil são `<div @click>`: inacessíveis por teclado. | código | Médio |
| A11Y-08 | Estrutura de títulos | `layout/TheNavbar.vue:5`; `layout/TheFooter.vue:6`; `BannerComponent.vue:5`; `HomeView.vue:19` | A marca é `<h1>` no header e no rodapé. A Home tem 4 `h1` e a Confirmação, 3. Os cards pulam de h1 para h3. | contagem medida (3 h1 na Confirmação); axe `heading-order` | Médio |
| A11Y-09 | Formulários | `FormGroup.vue:34, 75-78`; `PaymentView.vue:6-33`; `admin/layout/navbar/SearchBar.vue:5-10`; `admin/OrderManagement.vue:7-13` | Os erros não estão ligados ao campo, e há `autocomplete="off"` até em e-mail e senha. Os rádios de pagamento não têm `name`, então cada um vira um grupo (as setas não navegam e o `required` nativo trava). A busca e o filtro do admin não têm rótulo. | axe `select-name`; código | Médio |
| A11Y-10 | Retorno não anunciado | `AlertComponent.vue:5` | Não há `aria-live` nem `role="status"` em lugar nenhum do app. | busca sem resultado | Médio |
| A11Y-11 | Troca de rota | `src/router/index.js:10-115` | Não há `scrollBehavior`, foco no conteúdo nem `document.title` por rota. Clicar "Ver Carrinho" abre a nova tela já rolada, e o leitor de tela não percebe a troca. | medido: `scrollY` = 175px (1440) e 278px (390) depois de navegar | Médio |
| A11Y-12 | ARIA inválido | `SeparatorLines.vue:3-12` | `aria-orientation` num `<section>` sem `role="separator"`. O axe classifica como crítico; aparece em toda tela com banner, rodapé ou navbar admin. | axe `aria-allowed-attr` | Baixo |
| A11Y-13 | Idioma | `index.html:2` (`lang="pt-BR"`) | Textos em inglês dentro da página pt-BR são lidos com pronúncia portuguesa: "Address", "Working Hours", "Follow Us", "Search...", placeholders, status "pending", e os rótulos do carrossel "Navigate to slide N". | código; axe (rótulos do carrossel) | Baixo |
| A11Y-14 | 404 e login admin | `NotFound.vue:2-7`; `admin/LoginAdminView.vue:2-36` | Sem `<main>`; o login admin também não tem h1. | axe `landmark-one-main`, `page-has-heading-one` | Baixo |
| A11Y-15 | Movimento e skip link | — | Não existe `prefers-reduced-motion`, embora já haja animação (escala do banner, cards que sobem). Não há link "pular para o conteúdo". | busca sem resultado | Baixo |

### 2.9 Hierarquia visual

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| HIE-01 | Home | `HomeView.vue:2-11`; `BannerComponent.vue:1-19` | O hero não tem chamada para ação. A primeira dobra mostra boas-vindas, um subtítulo de 2,35:1 e uma foto; o caminho para pedir está só na navbar. | `01-home-1440`, `01-home-390` | Alto |
| HIE-02 | Pagamento | `PaymentView.vue:1-46` | O cliente confirma sem ver o que paga: faltam itens, total, endereço e prazo. | `24-payment-com-pedido-1440` | Alto |
| HIE-03 | Carrinho (logado) | `CartView.vue:33-35, 62-64`; `_cart-page.scss:116-143` | "Continuar Comprando" (verde) vem antes de "Finalizar Pedido" (laranja) e tem o mesmo tamanho: o fechamento disputa atenção com a ação secundária. Em 390, os "Remover" vermelhos de largura total são o elemento mais forte da lista. | `23-cart-logado-1440`, `23-cart-logado-390` | Médio |
| HIE-04 | Carrinho (visitante) | `CartView.vue:39-61` | "Fazer Login" e "Criar Conta" são idênticos e não indicam qual é o caminho principal. Os dois também estão quebrados (FLX-01). | `13-cart-com-item-anonimo-1440` | Médio |
| HIE-05 | Card do Cardápio | `BurguerCard.vue:1-18` | Sem descrição. O botão preto pesa mais que nome e preço, e o preço tem o mesmo peso do nome. | `02-menu-1440` | Médio |
| HIE-06 | Navbar | `layout/TheNavbar.vue:55-60` | Não há ícone nem contador do carrinho, nem "Entrar". O estado do pedido não aparece em lugar nenhum fora da página do carrinho. | screenshots do cliente | Médio |
| HIE-07 | Dashboard admin | `admin/AdminDashboard.vue:4-10` | A tela inicial do admin é um título sobre uma caixa vazia de 400px. | `30-admin-dashboard-1440` | Médio |
| HIE-08 | Título do carrinho | `_cart-page.scss:37-42` | "Seu Carrinho" em #a4a4a4 sobre marrom passa AA (5,55:1), mas é o elemento menos destacado do painel. | `23-cart-logado-1440` | Baixo |

### 2.10 Consistência entre componentes

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| CON-01 | Ação primária | props de `ButtonComponent` em `CarouselBurguer.vue:12-19`, `BurguerCard.vue:8-17`, `RegisterView.vue:79-87`, `CartView.vue:42-59`, `PaymentView.vue:34-42`, `ModalAdditional.vue:71, 127-137`; `_cart-page.scss:131-133` | A ação principal muda de cor por tela: verde #42b983 (Login, Pagamento, carrossel), verde-escuro #063520 (Cadastro), preto (card do Cardápio), azul #3498db (modal e "Ver Carrinho"), laranja #ff6600 ("Finalizar Pedido"), vermelho #ff0000 (Playground). Raio e padding também mudam por chamada. | `01-home-1440`, `02-menu-1440`, `06-login-1440`, `07-register-390`, `22-modal-bebida-1440`, `23-cart-logado-1440` | Alto |
| CON-02 | Cards de produto | `BurguerCard.vue`; `CarouselBurguer.vue:5-19`; `admin/ProductManagement.vue:25-51` | Três cards para o mesmo produto. **Carrossel:** descrição, preço verde e "Adicionar ao Pedido" verde. **Cardápio:** sem descrição, preço preto e "Adicionar ao pedido" preto. **Admin:** cantos de cerca de 30px e botões azuis. | `01-home-1440`, `02-menu-1440`, `31-admin-produtos-1440` | Médio |
| CON-03 | Steppers | `QuantityControl.vue`; `AdditionalsList.vue:12-27` | Dois controles de quantidade: quadrados pretos "−/+" (bebida) e círculos verdes com ícone (adicionais). As classes têm nomes quase iguais (`.quantity-control` e `.quantity-controls`). | `22-modal-bebida-1440` × `11-modal-personalizar-1440` | Baixo |
| CON-04 | Nome da marca | `layouts/MainLayout.vue:3`; `HomeView.vue:5`; `admin/layout/SidebarAdmin.vue:9-14`; `index.html:16`; `public/images/site.webmanifest:1` | A marca aparece de 5 jeitos: "Smash Burgers" (header e rodapé), "Smash Burger" (hero e admin), "Smash Burguer \| Delivery" (aba), vazio (manifest) e "smashBurguer@" (e-mail). | código | Médio |
| CON-05 | Idioma | `layout/TheFooter.vue:13`; `layout/TheFooterContactInfo.vue:3`; `layout/TheFooterSocialMediaLinks.vue:3`; `RegisterView.vue:13, 23, 44`; `admin/layout/navbar/SearchBar.vue:21`; `admin/ProductManagement.vue:15-23`; `admin/OrderManagement.vue:42` | Inglês misturado com português: "Address", "Working Hours", "Follow Us", "First Name", "Last Name", "Password", "Search...", "Foods/Drinks/Desserts", "Status: pending". | screenshots 01, 07, 31, 33 | Médio |
| CON-06 | Retorno ao usuário | `AlertComponent.vue`; `LoginView.vue:96-99`; `FormGroup.vue:34`; `services/authServices.js:7-17` | Quatro formas de retorno escolhidas tela a tela: toast, `alert()` nativo, erro inline e nada. | código | Médio |
| CON-07 | Admin × loja | `admin/_sidebar-admin.scss:5-16`; `admin/_admin-card.scss` | O admin tem paleta, formas e botões próprios (#2c3e50, raio de cerca de 30px, azul), sem ligação visual com a loja. | `30-admin-dashboard-1440` a `34-admin-relatorios-1440` | Médio |
| CON-08 | Cor de ações destrutivas | `admin/ProductManagement.vue:34-41`; `admin/ModalProducts.vue:77-91`; `CartItem.vue:17`; `ProfileView.vue:133-142` | "Excluir" usa o mesmo azul de "Editar", "Cancelar" usa vermelho de perigo, e "Remover" (carrinho) e "Sair" também são vermelhos. O vermelho não significa "destrutivo" de forma consistente. | `31-admin-produtos-1440`, `32-admin-modal-produto-1440`, `23-cart-logado-1440`, `21-perfil-1440` | Médio |
| CON-09 | Texto dos rótulos | `BurguerCard.vue:10` × `ModalAdditional.vue:128`; `LoginView.vue` × `admin/LoginAdminView.vue` | "Adicionar ao pedido" × "Adicionar ao Pedido"; "E-mail" × "Email"; "Remover" × "Excluir". | código | Baixo |
| CON-10 | 404 fora do layout | `src/router/index.js:109-113`; `NotFound.vue` | A 404 não tem navbar nem rodapé e usa a paleta padrão do Vue. | `08-404-1440` | Baixo |
| CON-11 | Conteúdo de exemplo e erros de texto | `RegisterView.vue:34`; `layouts/MainLayout.vue:9`; `src/json/products.json:24, 117`; `layout/TheFooterSocialMediaLinks.vue:19-40` | O placeholder do e-mail no cadastro é um e-mail pessoal real. Há erros de texto: "ingredientes fresco", "Queijo Cheedar", "hamburguer de soja". Twitter e X aparecem duplicados, com o domínio errado `x-twitter.com`. "Batata Frita" aparece em "Nossos Hambúrgueres". | `07-register-390`; código | Médio |
| CON-12 | Avatar do admin | `admin/layout/navbar/UserProfileBar.vue:37, 45-47` | O avatar é sempre `https://github.com/ldickmann.png`, qualquer que seja o admin logado: uma ref local sobrepõe a prop. | `30-admin-dashboard-1440` | Baixo |

### 2.11 Dívida de CSS

| ID | Tela / componente | Arquivo:linha | Problema | Evidência | Impacto |
|---|---|---|---|---|---|
| DEB-01 | Global | `src/assets/main.scss:1-57` + `<style scoped>` com `@use` da mesma parcial (ex.: `PaymentView.vue:58-60`, `AlertComponent.vue:41-43`) | Cada parcial é compilada duas vezes: global (vale para o app inteiro) e com escopo. O build gera 74,9 kB de CSS global mais chunks por view com as mesmas regras. No CSS global, `:deep()` vira seletor inválido e é descartado (`_carousel.scss:14, 92, 100-112`; `_pagination-component.scss:8, 13`). | saída do `vite build`: `index-*.css` com 74,91 kB | Médio |
| DEB-02 | Seletor de elemento global | `_footer.scss:7-14` | `footer { background: #000; color: #fff; padding: 4rem 0 2rem }` vale para **todo** `<footer>`. O `<footer class="modal-footer">` fica preto (fundo computado `rgb(0,0,0)`) e o CTA "Adicionar ao Pedido" parece flutuar fora do card. | medido; `41-modal-bebida-viewport-1440` | Alto |
| DEB-03 | `ButtonComponent` | `ButtonComponent.vue:14, 27-56, 65-68, 84-87, 93-99` | Cor, tamanho, padding e raio chegam como strings cruas e viram `style` inline. Não há variantes nem tema, e a folha não consegue dar hover/active por variante. Os atributos `type` e `class` caem no `div` raiz. O componente também executa navegação por um mapa interno de ids. É a causa de CON-01, EST-01, EST-05 e EST-06. | código | Alto |
| DEB-04 | Tokens | `base/_variables.scss:1-54` | Só há tokens de cor, com nomes ordinais e variáveis "de teste". Faltam espaçamento, tipografia, raio, sombra, z-index e duração, e não há CSS custom properties, então trocar tema em tempo de execução é impossível. | código | Médio |
| DEB-05 | Cores literais fora dos tokens | props de botão nas views e componentes; parciais SCSS (mais ocorrências em `admin/_modal-products.scss`: 6; `_home.scss`: 4; `CartView.vue`: 4; `ProfileView.vue`: 4) | **60 cores escritas direto**: 19 em SCSS e 41 em `.vue`, quase todas em props do `ButtonComponent`. São 22 valores únicos, e 12 deles já existem como token (ex.: `#42b983` digitado 11 vezes). Em sentido contrário, 10 dos 42 tokens nunca são usados (`$octonary-color`, `$denary-color`, `$color-black-background`, `$color-warm-gray-background`, `$color-danger-background` e 5 de borda). | contagem nas folhas e nos `.vue` | Médio |
| DEB-06 | Classes genéricas globais | `_carousel.scss:84-89` (`.price`); `.form-group`; `.product-details`; `.close-button` | Classes genéricas definidas globalmente são reaproveitadas com papéis diferentes e se sobrescrevem entre componentes. | código | Médio |
| DEB-07 | CSS morto | `_burger-card.scss:20-30`; `admin/_order-management.scss:46-52`; `_sales-reports.scss:44-96`; `cart-item.scss:42-57`; `additionals-list.scss:54-58`; `_pagination-component.scss:20-28`; `admin/_sidebar-admin.scss:139-142`; `admin/_modal-products.scss:93-109`; `_menu-page.scss:32-44` | Regras que nunca casam com o markup: `.burger-name`, `.burger-price`, `.order-card`, `.reports-grid`, `.metric-card`, `.cart-page__item-button--danger`, `.disabled`, `.active` da paginação, `.logout-button span`, `.btn-confirm`/`.btn-cancel` e `.button-cart`. | código | Baixo |
| DEB-08 | Pendências no código | `src/assets/main.scss:18` ("Conferir estes styles abaixo"); `_footer.scss:5` ("FAZER TRATAMENTO DA RESPONSIVIDADE..."); `_home.scss:15`; `ChartDashboard.vue:3`; `_variables.scss:10` | Código comentado e notas de pendência dentro dos estilos. | código | Baixo |
| DEB-09 | Recursos carregados à toa | `index.html:7` (Material Icons); `plugins/fontawesome.js:5-58` (4 ícones sem uso); `index.html:9-10` (`rel="android-chrome-…"` inválido); `public/images/site.webmanifest:1` | Requisições sem uso. O manifest aponta os ícones para `/android-chrome-*.png`, mas os arquivos estão em `/images/`, e `name`/`short_name` estão vazios. | conteúdo do manifest; código | Baixo |
| DEB-10 | Convenções misturadas | `_cart-page.scss:131-133` (`@extend`); classes BEM e genéricas no mesmo arquivo | BEM (`cart-page__button--primary`), classes soltas (`.button`, `.price`, `.description`) e `@extend` convivem sem convenção única. | código | Baixo |
| DEB-11 | `!important` | `_carousel.scss:94, 95`; `_pagination-component.scss:21, 22, 35` | 5 ocorrências. Todas existem para vencer o estilo inline do `ButtonComponent` por `:deep(.button)`. As linhas 21-22 da paginação nunca valem, porque a classe `.active` nunca é aplicada. | código | Baixo |
| DEB-12 | Movimento | `_buttons.scss:11`; `_alert.scss:25`; `admin/_admin-card.scss:9`; e mais 27 declarações | **20 transições diferentes em 30 declarações**, só com 0.2s e 0.3s, e 8 delas com `transition: all`. Não há token de duração nem de curva. As duas animações (`spin`, `dropdownFade`) e todos os `transform` no hover rodam sem alternativa para `prefers-reduced-motion`. | contagem nas folhas | Médio |
| DEB-13 | Blocos duplicados | `_cart-page.scss:78-100` e `:103-114`; `_login.scss:4-8` × `_register.scss:4-8`; `_login.scss:35-45` × `_register.scss:44-54`; `_modal.scss:4-13` × `admin/_modal-products.scss:4-9`; `_modal.scss:48-59` × `admin/_modal-products.scss:38-44` | Além da compilação dupla (DEB-01), há cópia e cola. O `.cart-page__total` é definido duas vezes no mesmo arquivo, com tamanhos de fonte diferentes. As seções e os links de login e cadastro são quase idênticos. Há dois overlays e dois botões de fechar com valores diferentes. Os dois steppers repetem as mesmas regras. No CSS de entrada do build, cerca de 39% dos bytes são blocos repetidos, e o `@font-face` da Bebas Neue aparece 12 vezes. | contagem no build | Médio |
| DEB-14 | Estilos que dependem da cópia global | `_cart-page.scss:116-154` (botão "Remover" do `CartItem.vue:17`); `admin/_navbar-admin.scss:17-29`; `admin/_order-management.scss:147-155` | Algumas regras só funcionam porque a parcial também entra como global. O seletor com escopo do pai não alcança o elemento dentro do componente filho. Tirar o `main.scss` global sem tratar esses casos quebra o botão "Remover" e hovers do admin. | código | Médio |
| DEB-15 | Breakpoints com sentidos opostos | `base/_mixins.scss:4-22`; `CarouselBurguer.vue:66-78`; `admin/layout/TheNavbarAdmin.vue:101, 105` | O SCSS usa `max-width`, ou seja, desktop-first: 90 usos, sendo 44 de `xs` (480px). O carrossel usa chaves de **largura mínima** (425, 768, 1024, 1440). O admin compara `480` direto no JS. Também não há `@media` fora do mixin para cuidar de `hover`/`pointer`. | código | Baixo |
| DEB-16 | CSS do admin no bundle público | `src/assets/main.scss:27-35, 48-52` | O `main.scss` global inclui as folhas do admin, então todo visitante da loja baixa o CSS do painel. | ordem medida no CSS de entrada do build | Baixo |

---

## 3. Defeitos de fluxo que afetam a experiência

Não são problemas de CSS, mas mudam o que o usuário vê e decide. Todos foram **reproduzidos no app rodando**, com a reprodução descrita na coluna de evidência.

| ID | Tela / componente | Arquivo:linha | Problema | Evidência (reprodução) | Impacto |
|---|---|---|---|---|---|
| FLX-01 | Carrinho (visitante) | `CartView.vue:42-59, 91`; `ButtonComponent.vue:81`; `handlers/authHandlers.js:10-39`; `services/authServices.js:9-12, 25-30` | Os dois botões passam o objeto do botão no lugar das credenciais. "Fazer Login" autentica sem credenciais. "Criar Conta" grava `{label, id}` como conta e leva ao login. | Visitante adiciona item → Carrinho → "Fazer Login": o estado vira `{"user":null,"isAuthenticated":true}` e redireciona para `#/` | Alto |
| FLX-02 | Modal: remover ingrediente | `IngredientsList.vue:5-10`; `ModalAdditional.vue:139-141, 180-184` | O `v-model` e o pai invertem o valor duas vezes, e o que o cliente marca para remover não é removido. | Marquei "Tomate": o checkbox aparece marcado, mas o item no carrinho tem `removedIngredients: []` | Alto |
| FLX-03 | Modal: adicionais | `ModalAdditional.vue:147-149, 164-177`; `stores/products.js:24-25` | As quantidades ficam na store e não são zeradas, então os adicionais vazam para o próximo produto. | +1 Bacon no Cheese Bacon → abrir Smash Burger: abre com Bacon = 1 e preço R$ 26,00 (22,50 + 3,50) | Alto |
| FLX-04 | Pagamento | `ButtonComponent.vue:65-68, 84-87`; `utils/buttonHandlers.js:15-19`; `PaymentView.vue:53`; `src/router/index.js:32-36` | Confirma sem forma de pagamento escolhida e descarta a escolhida. A rota abre sem login e com carrinho vazio. | "Confirmar Pagamento" sem marcar nada → `#/confirmation`. `04-payment-direto-1440` (aberto sem login) | Alto |
| FLX-05 | Depois do pedido | `utils/buttonHandlers.js:15-19`; `stores/cart.js:18-20`; `stores/userStore.js:8, 48` | Depois de "pagar", o carrinho continua cheio (`clearCart` nunca é chamado) e nada vai para o histórico: o Perfil sempre mostra "nenhum pedido". | código + fluxo completo até a confirmação | Alto |
| FLX-06 | Conta: sair e entrar de novo | `stores/userStore.js:52`; `services/authServices.js:9, 29, 50` | O estado da store e o "cadastro" usam a mesma chave `user`. No caminho normal, a conta é apagada ao sair e o novo login trava sem aviso. | cadastro → login → Sair: `localStorage.user` vira `{"user":null,...}` e o novo login fica em `#/login` com 3 erros não tratados | Alto |
| FLX-07 | Carrinho: persistência | `stores/cart.js:3-22` | Recarregar a página esvazia o carrinho. | item adicionado → recarregar → 0 itens | Alto |
| FLX-08 | Carrinho: detalhe do item | `CartItem.vue:4-15` | O item não mostra quantidade, ingredientes removidos nem foto. "Adicionais" só aparece quando há ingrediente removido (condição errada). Não dá para mudar a quantidade no carrinho. | código; `23-cart-logado-1440` | Médio |
| FLX-09 | Admin: ações | `utils/buttonHandlers.js:22-29`; `admin/OrderManagement.vue:109-118`; `admin/layout/navbar/SearchBar.vue:28-32`; `admin/layout/navbar/NotificationBar.vue:3-11` | Excluir, Detalhes, busca, notificações e itens do menu de perfil só fazem `console.log`. "Atualizar Status" lê `order.statuses`, que não existe, e não muda nada. | "Atualizar Status": antes e depois, "Status: pending" | Médio |
| FLX-10 | Rotas abertas | `src/router/index.js:32-41, 61-66` | `/payment`, `/confirmation` e `/playground` abrem direto pela URL para qualquer pessoa. | `04-payment-direto-1440`, `05-confirmation-direto-1440`, `10-playground-1440` | Médio |

---

## 4. Stack desatualizada e custo de atualizar

Esta seção só descreve o que está atrasado e quanto custa atualizar. Não há recomendação de trocar framework nem de adicionar dependência: essas decisões são suas.

### 4.1 Como ler esta seção

- **Fonte das versões:**
  - "Instalado" é a versão resolvida no `yarn.lock`.
  - "Última" é a do `npm view` em 17/10/2026.
- **O que foi conferido:** só o que dava para checar nos pacotes publicados (engines, peers, exports e CSS). O que não foi conferido está dito na própria linha.
- **Escala de custo** (estimativa para este código):

  | Custo | Significado |
  |---|---|
  | **P** | Menos de 1 hora; troca de versão e checagem rápida. |
  | **M** | Algumas horas; ajustes em poucos arquivos e revisão visual. |
  | **G** | Um dia ou mais; arrasta outras dependências, muda o ambiente ou exige regressão ampla. |

### 4.2 Pacotes com major atrasado

| Pacote | Instalado → última | O que muda (verificado nos pacotes) | Onde é usado | Custo |
|---|---|---|---|---|
| Font Awesome (svg-core + 3 pacotes de ícones) | 6.7.2 → 7.3.1 | Os 27 ícones importados existem na 7, inclusive pelos nomes antigos. **Mudança visual:** a 7 fixa `width: 1.25em` em todo `.svg-inline--fa`, e a 6 não define largura. O `vue-fontawesome` 3.1.3 já aceita a 7. | `src/plugins/fontawesome.js:3-58`; 17 `<font-awesome-icon>` em 10 arquivos (rodapé, adicionais, sidebar e navbar do admin) | M (revisão visual de todos os ícones) |
| Pinia | 2.3.1 → 4.1.0 | **Na 3:** sai o `defineStore({ id })` e o `vue-demi`. **Na 4:** só ESM e peer obrigatório `@vue/devtools-api ^8.2.1`. O projeto só usa `defineStore('id', {...})`, que continua válido. Ir para a 3 resolve o peer quebrado do persistedstate. **Não verificado:** o resto das mudanças da 3 para a 4. | `src/stores/*.js`; `src/main.js:2, 10, 15, 17` | P (para a 3) / M (para a 4) |
| vue-router | 4.6.4 → 5.4.0 | Continua exportando `createRouter`, `createWebHashHistory` e `useRoute`. Exige `vue ^3.5.34` (hoje 3.5.27) e embute dependências de roteamento por arquivos. **Não verificado:** outras quebras de API. | `src/router/index.js`; 8 componentes e views | M |
| vue-chart-3 | 3.1.8 → 4.0.1 | A 3.1.8 foi feita para Chart.js 3; o projeto tem `chart.js` 4.5.1. A 4 tem peer `chart.js ^4`, é só ESM e exige Node ≥20. Hoje o `<BarChart>` está comentado, mas o chunk do Dashboard pesa 227 kB (78 kB gzip). | `ChartDashboard.vue:3, 9-11` | P |
| vue3-carousel | 0.14.0 → 0.19.0 | Ainda é 0.x, então cada minor pode quebrar. O changelog não marca nada como breaking. Muda o limiar de arraste e os clones saem da ordem de tabulação. As classes sobrescritas em `_carousel.scss` continuam existindo. | `CarouselBurguer.vue`; `_carousel.scss:14, 92-114` | P–M |
| Vite | 6.4.3 → 8.3.4 | **Vite 7 e 8:** exigem Node `^20.19 \|\| >=22.12`. **Só no 8:** usa rolldown e lightningcss. **Arrasta junto:** `@vitejs/plugin-vue` 6 e, para o Vite 8, `vite-plugin-vue-devtools` 8. **Não verificado:** a lista completa de mudanças do Vite 7. | `vite.config.js`; `vitest.config.js:3` | G (cadeia de dependências + Node) |
| @vitejs/plugin-vue | 5.2.4 → 6.0.10 | A 5 só aceita Vite 5 e 6. A 6 é obrigatória para Vite 7 ou 8. | `vite.config.js:3, 10` | P (junto com o Vite) |
| vite-plugin-vue-devtools | 7.7.9 → 8.2.1 | A 7 só aceita Vite até o 7. Hoje está ligado também no build de produção. | `vite.config.js:4, 11` | P |
| Vitest + @vitest/coverage-v8 | 3.2.6 / 3.0.5 → 5.0.5 | O coverage precisa ter exatamente a mesma versão do vitest (hoje não tem: peer quebrado). A 5 exige Node `^22.12` e Vite 6.4, 7 ou 8. **Não verificado:** mudanças de config. | `vitest.config.js`; 3 arquivos de teste com asserts de estilo inline (`ButtonComponent.test.js:54-65`, `BannerComponent.test.js:45, 61`), que vão quebrar com qualquer refatoração de botão ou banner | M |
| jsdom | 26.1.0 → 30.1.3 | Exige Node ≥22.22. | `vitest.config.js:10` | P |
| happy-dom | 20.3.9 → 21.0.3 | **Não é usado:** o Vitest usa jsdom. | — | — |
| ESLint + @eslint/js | 9.39.2 → 10.x | Exige Node `^20.19 \|\| ^22.13 \|\| >=24`. O projeto já usa flat config. **Não verificado:** outras quebras. | `eslint.config.js` | P |
| eslint-plugin-vue | 9.33.0 → 10.11.1 | `configs['flat/essential']` continua existindo. O `vue-eslint-parser` vira peer obrigatório. | `eslint.config.js:2, 18` | P |

### 4.3 Atrasos menores e problemas de ambiente

- **Patches e minors** (custo P cada):
  - `vue` 3.5.27 → 3.5.44;
  - `sass-embedded` 1.97.3 → 1.105.2 (compila sem avisos nas duas);
  - `@fontsource/bebas-neue`, `@fortawesome/vue-fontawesome`, `prettier`, `@vue/test-utils`, `@typescript-eslint/*`, `vite-svg-loader`, `esbuild`.
- **Peers já quebrados no lockfile atual:**
  - `pinia-plugin-persistedstate` 4.7.1 exige `pinia >=3.0.0`, e o projeto usa 2.3.1;
  - `@vitest/coverage-v8` 3.0.5 exige `vitest 3.0.5`, e o projeto usa 3.2.6.
  - O build passa. Não verifiquei se o persistedstate tem algum comportamento errado em runtime por causa disso.
- **Node no CI:** o `deploy.yml` usa Node 20, que chegou ao fim de vida em 30/04/2026. Vite 7+, Vitest 5 e jsdom 30 exigem Node mais novo. Custo P na workflow; o que pesa é a cadeia acima. O CI só faz build: não roda lint nem testes.
- **Gerenciador de pacotes indefinido:**
  - O `package.json` não tem `packageManager` nem `engines`, e não existe `.yarn/releases`.
  - O histórico do lockfile mudou de formato: um commit do autor gravou o formato do Yarn 4 (`21b41d4`), e um commit do Dependabot (`c2ab9c7`) reescreveu para o formato do Yarn 3 e versionou `.yarn/cache` (477 zips, 67 MB).
  - Não dá para saber qual Yarn roda no CI. Fixar a versão custa P.
- **Instalado sem uso:**
  - `happy-dom`;
  - `vite-svg-loader` (não há nenhum `.svg`);
  - `@typescript-eslint/parser` (não aparece no `eslint.config.js`);
  - `esbuild` 0.28.1 direto (o Vite 6 usa o próprio 0.25.12).
  - Também ficam instalados dois Vites (6.4.3 direto e 7.3.1 via `vite-node`).

---

## 5. Fora do escopo de UI, mas encontrado

- **Autenticação só no cliente, com senha em texto puro.**
  - `services/authServices.js:29` e `createAdmin.html:37-38` guardam a senha em texto puro no `localStorage`.
  - `createAdmin.html` está versionado apesar de constar no `.gitignore:34`.
  - Ele faz `localStorage.clear()` (apaga a sessão do cliente) e tem um link quebrado para `/admin/login` (`createAdmin.html:56`).
- **Mesma chave para conta e sessão.** As chaves `user` e `admin` guardam ao mesmo tempo o "cadastro" e o estado persistido da store (`stores/userStore.js:52`, `stores/adminStore.js:36`). É a origem do FLX-06.
- **README e TESTING.md prometem o que o código não tem:**
  - pagamento online, histórico de pedidos e gerenciamento de endereços;
  - a pasta `src/assets/icons/`;
  - `@testing-library/vue`;
  - testes de integração (só existem 3 testes unitários).
- **Dependências e plugins:**
  - `vite-plugin-vue-devtools` está ligado também no build de produção (`vite.config.js:11`).
  - O `vue-chart-3` está instalado, mas o gráfico está comentado.
- **Carrossel com prop errada:** `CarouselBurguer.vue:64` usa `pauseAutoPlayOnHover`, mas a biblioteca espera `pauseAutoplayOnHover`. Como não há autoplay, hoje isso não tem efeito.
- **`.editorconfig` não cobre `.scss`**, e o projeto não tem nenhum lint de CSS (Stylelint ou similar).

---

## 6. O que já funciona

Pontos a preservar na repaginação:

- `lang="pt-BR"` declarado; labels com `for` nos formulários do cliente; `alt` com o nome do produto nas fotos.
- Nenhuma rolagem horizontal em 390px.
- O menu mobile tem `aria-label`, `aria-expanded` e trava a rolagem quando abre.
- O carrossel navega por teclado e tem região viva (vem da biblioteca, ainda em inglês).
- O cadastro já mostra erro inline por campo.
- Bebas Neue no wordmark tem personalidade e é reconhecível.
- As fotos de produto são boas e quase todas têm fundo escuro, o que ajuda qualquer direção que valorize a comida. O problema delas é só o peso.

---

## Apêndice A. Screenshots

Todas as capturas são do build de produção em Chromium, em 1440×900 e 390×844 (sufixos `-1440` e `-390`). Ficam no scratchpad da sessão e nas folhas de contato enviadas na conversa.

### Telas públicas (página inteira)

| Arquivo | O que mostra |
|---|---|
| `01-home` | Home |
| `02-menu` | Cardápio |
| `03-cart-vazio` | Carrinho vazio |
| `04-payment-direto` | Pagamento aberto direto pela URL |
| `05-confirmation-direto` | Confirmação aberta direto pela URL |
| `06-login` | Login |
| `07-register` | Cadastro |
| `08-404` | 404 |
| `09-admin-login` | Login admin |
| `10-playground` | Playground |

### Estados e interações

| Arquivo | O que mostra |
|---|---|
| `11-modal-personalizar` | Modal de personalização (hambúrguer) |
| `12-apos-adicionar` | Depois de adicionar ao carrinho (alerta sob a navbar) |
| `13-cart-com-item-anonimo` | Carrinho com item, visitante |
| `14-menu-bebidas` | Cardápio depois de clicar "Bebidas" |
| `15-nav-mobile-aberto` | Menu mobile aberto (só 390) |
| `16-foco-teclado-navbar` | Foco por teclado na navbar (só 1440) |
| `17-foco-teclado-login` | Foco por teclado no login (só 1440) |
| `18-login-erro` | Login com senha errada |
| `19-register-submit-vazio` | Cadastro enviado vazio |
| `20-login-carregando` | Login durante a espera |
| `22-modal-bebida` | Modal de personalização (bebida) |
| `40-home-carrossel-viewport` | Seção do carrossel na viewport real |
| `41-modal-bebida-viewport` | Modal de bebida na viewport real (só 1440) |

### Cliente logado

| Arquivo | O que mostra |
|---|---|
| `21-perfil` | Perfil |
| `23-cart-logado` | Carrinho com itens |
| `24-payment-com-pedido` | Pagamento com pedido |
| `25-confirmation-apos-pagar` | Confirmação depois de pagar |
| `26-relogin-apos-logout` | Novo login depois de sair |

### Admin

| Arquivo | O que mostra |
|---|---|
| `30-admin-dashboard` | Dashboard |
| `31-admin-produtos` | Gestão de produtos |
| `32-admin-modal-produto` | Modal de produto |
| `33-admin-pedidos` | Gestão de pedidos |
| `34-admin-relatorios` | Relatórios |

## Apêndice B. Resultado do axe por tela

Violações WCAG 2.x A/AA e boas práticas, por tela, contadas pelo axe-core 4.10.3.

| Tela | 1440 | 390 | Regras |
|---|---|---|---|
| Home | 5 | 5 | `aria-allowed-attr`, `color-contrast`, `heading-order`, `link-name`, `target-size` |
| Cardápio | 4 | 4 | `aria-allowed-attr`, `color-contrast`, `heading-order`, `link-name` |
| Modal Personalizar | 3 | 3 | `color-contrast`, `landmark-main-is-top-level`, `landmark-no-duplicate-main` |
| Carrinho (vazio / com itens) | 3 / 3 | 3 / 3 | `aria-allowed-attr`, `color-contrast`, `link-name` |
| Login | 3 | 3 | `aria-allowed-attr`, `color-contrast`, `link-name` |
| Cadastro com erros | 3 | 3 | `aria-allowed-attr`, `color-contrast`, `link-name` |
| Pagamento | 3 | 3 | `aria-allowed-attr`, `color-contrast`, `link-name` |
| Confirmação | 2 | 2 | `aria-allowed-attr`, `link-name` |
| 404 | 3 | 3 | `color-contrast`, `landmark-one-main`, `region` |
| Login admin | 4 | 4 | `color-contrast`, `landmark-one-main`, `page-has-heading-one`, `region` |
| Perfil | 3 | 3 | `aria-allowed-attr`, `color-contrast`, `link-name` |
| Admin: produtos | 6 | 4 | `aria-allowed-attr`, `button-name`, `color-contrast`, `landmark-unique`, `page-has-heading-one`, `region` |
| Admin: pedidos | 7 | 5 | o mesmo de produtos + `heading-order`, `select-name` |

### Pares de cor reprovados

Medidos pelo axe, mais três calculados a partir do CSS.

| Contraste | Par (texto sobre fundo) | Onde |
|---|---|---|
| 1,36:1 | #210234 sobre #063520 | link ativo e hover da navbar |
| 1,36:1 | #dddddd sobre #ffffff (borda) | campos de formulário (calculado) |
| 2,34:1 | #42b983 sobre #f8f9fa | "404", link "Ver Cardápio" |
| 2,35:1 | #a4a4a4 sobre #fff8e7 | subtítulo da Home |
| 2,36:1 | #a4a4a4 sobre #f8f9fa | carrinho vazio, "nenhum pedido" |
| 2,47:1 | #ffffff sobre #42b983 | botões verdes, item ativo do admin |
| 2,47:1 | #42b983 sobre #ffffff | links "Criar conta", preços verdes |
| 2,49:1 | #a4a4a4 sobre #ffffff | descrição no modal, dados do cliente no admin |
| 2,93:1 | #ff6600 sobre #ffffff | preço e adicionais no modal |
| 2,94:1 | #ffffff sobre #ff6600 | "Finalizar Pedido" (calculado) |
| 2,98:1 | #ffffff sobre #3aa876 | filtros de categoria |
| 3,15:1 | #ffffff sobre #3498db | botões azuis |
| 3,99:1 | #ff0000 sobre #ffffff | erros de formulário |
| 4,00:1 | #ffffff sobre #ff0000 | "Sair", "Abrir Modal" |
| 4,01:1 | #333333 sobre #3498db | números da paginação (calculado) |
| 4,44:1 | #6c757d sobre #f8f9fa | texto da 404 |
