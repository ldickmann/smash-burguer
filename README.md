# Smash Burger

[![Deploy no GitHub Pages](https://github.com/ldickmann/smash-burguer/actions/workflows/deploy.yml/badge.svg)](https://github.com/ldickmann/smash-burguer/actions/workflows/deploy.yml)

Front-end de delivery de hambúrgueres artesanais feito em Vue 3, com:

- cardápio com personalização do lanche;
- carrinho e checkout;
- conta do cliente com histórico de pedidos;
- painel administrativo.

É um projeto de portfólio sem back-end. Contas, carrinho e pedidos ficam no `localStorage` do navegador, e login e pagamento são simulados.

**Demonstração:** [ldickmann.github.io/smash-burguer](https://ldickmann.github.io/smash-burguer/)

<p align="center">
  <img src="docs/screenshots/home-desktop.webp" alt="Home no desktop: chamada &quot;Smash na chapa, entregue quente&quot; ao lado da foto de um hambúrguer" width="100%">
</p>
<p align="center">
  <img src="docs/screenshots/personalizar-celular.webp" alt="Modal Personalizar no celular, com o hambúrguer montado em camadas e a lista de ingredientes" width="260">
  <img src="docs/screenshots/carrinho-celular.webp" alt="Carrinho no celular com dois itens, detalhes da personalização e resumo do pedido" width="260">
</p>

## Funcionalidades

### Loja

- **Cardápio** com abas Hambúrgueres, Bebidas e Sobremesas. Os produtos ficam em `src/json/products.json`, e a Home destaca os hambúrgueres no carrossel "Mais pedidos".
- **Personalizar** abre um modal antes de o item entrar no carrinho:
  - nos hambúrgueres e na sobremesa, dá para tirar ingredientes e somar adicionais (até 5 de cada), com o preço recalculado na hora;
  - nos hambúrgueres, um montador 3D mostra as camadas do lanche;
  - nas bebidas, escolhe-se a quantidade (1 a 10);
  - em todos, há um campo de observação de até 140 caracteres.
- **Carrinho:**
  - quantidade de 1 a 10 por item;
  - remover com a opção "Desfazer" por 5 segundos;
  - resumo com subtotal e total.
- **Conta:**
  - cadastro com o endereço preenchido a partir do CEP, pela [API ViaCEP](https://viacep.com.br/). Num CEP que vale para a cidade toda (sem rua), a pessoa informa a rua e o bairro;
  - celular e CEP com máscara durante a digitação, data de nascimento conferida no calendário (nada no futuro) e e-mail com `+` aceito;
  - a senha é guardada como hash PBKDF2, e não em texto;
  - login (quem entra pelo carrinho volta direto para o checkout, e quem abre o perfil sem sessão volta para ele);
  - perfil com edição dos dados (com as mesmas validações do cadastro), histórico de pedidos, que continua depois de sair, e exclusão da conta.
- **Checkout:**
  - usa o endereço da conta;
  - formas de pagamento: cartão de crédito ou débito na entrega, PIX ou dinheiro;
  - termina numa confirmação com o número do pedido.

### Painel administrativo (protótipo)

Fica em `#/admin/login` e tem estas telas:

- **Painel:** indicadores de venda.
- **Produtos:** criar, editar e excluir produtos (com confirmação). O formulário confere os campos e aceita só imagens PNG, JPEG e WebP de até 300 kB. O cardápio editado fica salvo neste navegador.
- **Pedidos:** lista com filtro por status, botão para avançar o status e "Detalhes" do pedido num diálogo. O status fica salvo neste navegador. A barra do painel conta os pedidos pendentes e em preparo e leva à lista já filtrada.
- **Relatórios.**
- **Busca** na barra do painel: filtra Produtos (nome e descrição) e Pedidos (número, cliente e itens), sem diferença de acento. Nas outras telas, o Enter leva a Produtos.
- **Meu perfil** e **Configurações**, no menu do avatar. Configurações restaura o cardápio original e os pedidos de exemplo.

Os indicadores, os relatórios e os pedidos iniciais são dados de exemplo; veja as [limitações conhecidas](#limitações-conhecidas).

<p align="center">
  <img src="docs/screenshots/admin-desktop.webp" alt="Painel administrativo no desktop: lista de pedidos com filtro por status" width="100%">
</p>

### Interface

- **Design system "Brasa":** tema escuro com tokens de cor, tipografia, espaçamento e movimento em SCSS, nas fontes Archivo e Bebas Neue. A especificação está em [SPEC.md](./SPEC.md).
- **Acessibilidade**, verificada com o axe-core (nenhuma violação WCAG 2.2 AA em 20 telas e estados, em 1440 e 390 px):
  - navegação completa por teclado, foco visível e link "Pular para o conteúdo";
  - diálogos que prendem e devolvem o foco;
  - avisos lidos por leitores de tela;
  - botões com área de toque de 44 px.
- **Micro-interações 3D só com CSS:** o botão "Adicionar" gira, o contador do carrinho anima e o card inclina com o mouse. Com `prefers-reduced-motion`, viram transições de opacidade.
- **Imagens:** WebP responsivas com `<picture>` e `srcset`. A Home carrega menos de 1 MB no celular.

## Tecnologias

| Tecnologia | Uso |
|---|---|
| [Vue 3](https://vuejs.org/) | Interface, com Composition API e `<script setup>` |
| [Vue Router 4](https://router.vuejs.org/) | Rotas com hash (`#/menu`), que funcionam no GitHub Pages |
| [Pinia 3](https://pinia.vuejs.org/) + [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) | Estado do carrinho, da sessão e do painel, salvo no `localStorage` |
| [Vite 6](https://vite.dev/) | Servidor de desenvolvimento e build |
| [Sass](https://sass-lang.com/) | Estilos, tokens de design e mixins |
| [vue3-carousel](https://github.com/ismail9k/vue3-carousel) | Carrossel da Home |
| [Font Awesome 6](https://fontawesome.com/) | Ícones |
| [Fontsource](https://fontsource.org/) | Fontes Archivo e Bebas Neue servidas pelo próprio site |
| [ViaCEP](https://viacep.com.br/) | Endereço a partir do CEP |
| [Vitest 4](https://vitest.dev/) + [Vue Test Utils](https://test-utils.vuejs.org/) + [jsdom](https://github.com/jsdom/jsdom) | Testes unitários |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | Lint e formatação |
| [GitHub Actions](https://docs.github.com/actions) + [GitHub Pages](https://pages.github.com/) | Deploy |

## Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 22, a mesma versão do deploy.
- Yarn 3.8.7, ativado pelo Corepack, que já vem com o Node. A versão está fixada no `package.json`. Não use o Yarn 1: o `yarn.lock` está no formato do Yarn 3.

### Passo a passo

```bash
git clone https://github.com/ldickmann/smash-burguer.git
cd smash-burguer
corepack enable       # passa a usar a versão do Yarn definida no projeto
yarn install
yarn dev
```

Abra <http://localhost:5173/smash-burguer/>. O caminho `/smash-burguer/` vem do `base` do `vite.config.js`.

### Acessar o painel administrativo

O login do painel compara o e-mail e a senha com o administrador salvo no `localStorage`, na chave `admin`. A sessão do painel fica em outra chave (`smash-burger:admin-session`), então sair e entrar de novo sempre funciona.

- **No `yarn dev`:** há também um administrador de teste, com credenciais fictícias e públicas, que dispensa o cadastro no navegador. Em <http://localhost:5173/smash-burguer/#/admin/login>, o botão "Usar admin de teste" preenche o formulário. Ele fica atrás de `import.meta.env.DEV` e não vai para o build.
- **No site publicado:** o painel só abre com um administrador criado à mão. Na página do site, rode no console do navegador o comando abaixo, com dados fictícios. A senha entra em texto, e o primeiro login a troca pelo hash:

  ```js
  localStorage.setItem('admin', JSON.stringify({ firstName: 'Admin', lastName: 'Teste', email: 'voce@example.com', password: 'troque123', role: 'admin' }))
  ```

O hash das senhas usa o WebCrypto, que o navegador só oferece em HTTPS e em `localhost`. Aberto por HTTP num IP da rede (por exemplo, `yarn dev --host` no celular), o cadastro e o login avisam que é preciso HTTPS.

## Scripts

| Comando | O que faz |
|---|---|
| `yarn dev` | Servidor de desenvolvimento em <http://localhost:5173/smash-burguer/>. O Vue DevTools fica em `/smash-burguer/__devtools__/`. |
| `yarn build` | Build de produção em `dist/` |
| `yarn preview` | Serve o build em <http://localhost:4173/smash-burguer/> |
| `yarn test:unit` | Vitest em modo observação. Para rodar uma vez: `yarn test:unit --run` |
| `yarn test:coverage` | Testes com relatório de cobertura em `coverage/` |
| `yarn lint` | ESLint, já corrigindo o que for automático (`--fix`) |
| `yarn format` | Prettier em `src/`. Boa parte do código ainda não segue o `.prettierrc.json`, então o comando reformata dezenas de arquivos. Se for rodar, faça isso num commit separado. |

## Estrutura do projeto

```text
.
├── .claude/
│   ├── e2e/              # verificação no navegador (Playwright + axe-core)
│   └── lockfile-audit.py # confere as versões do yarn.lock na base de advisories do npm
├── .github/
│   ├── workflows/        # deploy no GitHub Pages
│   └── dependabot.yml    # PR mensal com as versões novas das actions
├── docs/screenshots/     # imagens deste README
├── public/images/        # fotos do cardápio, fundos, ícones e manifest
├── src/
│   ├── __tests__/        # testes unitários (Vitest)
│   ├── assets/
│   │   ├── main.scss     # estilos globais: só a base
│   │   └── styles/       # base/ (tokens, breakpoints, movimento), components/, layouts/, pages/
│   ├── components/       # componentes da loja
│   │   ├── ui/           # componentes base (BaseButton, BaseDialog, AppToast…)
│   │   ├── layout/       # navbar e rodapé
│   │   └── admin/        # componentes do painel
│   ├── composables/      # lógica reutilizável (imagens, tilt, CEP, endereço sem rua, validação, saída do painel…)
│   ├── handlers/         # fluxo de login e cadastro
│   ├── json/             # cardápio (products.json)
│   ├── layouts/          # MainLayout (loja) e AdminLayout (painel)
│   ├── plugins/          # registro dos ícones do Font Awesome
│   ├── router/           # rotas, guards, título da página e foco
│   ├── services/         # autenticação simulada do cliente e do administrador
│   ├── stores/           # Pinia: carrinho, sessão, produtos, admin, pedidos do painel e avisos
│   ├── utils/            # preço, máscaras, validações, hash de senha, busca, formulário de produto e dados de exemplo do painel
│   └── views/            # páginas da loja, auth/ e admin/
├── AUDIT.md              # auditoria de UI/UX que deu origem ao redesign
├── SPEC.md               # especificação do redesign "Brasa"
├── TESTING.md            # testes
└── CLAUDE.md             # orientações para o Claude Code
```

## Dados no navegador

Sem back-end, o estado fica no `localStorage`, nestas chaves:

| Chave | Conteúdo |
|---|---|
| `smash-burger:cart:v1` | Itens do carrinho (sem as imagens enviadas pelo painel, que voltam do cardápio) |
| `smash-burger:session` | Sessão do cliente (só os dados do perfil, sem a senha), histórico de pedidos e número do próximo pedido |
| `smash-burger:account` | Cadastro do cliente, com a senha em hash e uma cópia do histórico de pedidos |
| `admin` | Administrador criado à mão (no site publicado), com a senha em hash depois do primeiro login |
| `smash-burger:admin-session` | Sessão do painel (sem a senha) |
| `smash-burger:catalog` | Cardápio editado no painel, com as imagens enviadas |
| `smash-burger:admin-orders` | Pedidos do painel e o status de cada um |

- **Sair:** apaga a sessão e o carrinho. O cadastro continua, com o histórico, que volta no próximo login.
- **Excluir conta** (no perfil): apaga também o cadastro e o histórico.
- **Uma conta por navegador:** criar outra apaga a anterior, e a tela de cadastro avisa quando já existe uma.
- **Cardápio publicado novo:** quando o `products.json` muda, as alterações do painel salvas neste navegador dão lugar a ele.
- **Dados editados à mão:** ao carregar, o carrinho é conferido com o cardápio (preço, nome e imagem vêm do catálogo, e o item que não bate com ele sai); a sessão, o painel, o cardápio salvo e os pedidos do painel são conferidos campo a campo, e o que não estiver no formato sai. Ao confirmar o pedido, o carrinho é conferido de novo: se algum preço mudou, o pedido espera uma nova confirmação.
- **Espaço:** as imagens enviadas pelo painel têm um limite no navegador; sem espaço, o modal pede uma imagem menor.

Para recomeçar do zero, apague os dados do site nas ferramentas do navegador.

## Testes

Há 239 testes unitários, em 25 arquivos, cobrindo `BaseButton`, `AppToast`, `BannerComponent`, o carrinho e a conferência dele com o cardápio, a conta (login, senha em hash, sessão, histórico, perfil e exclusão), as máscaras e as validações, o estado salvo no `localStorage`, as telas de cadastro, de perfil e de pagamento, o painel (login e admin de teste, produtos, formulário e imagem do produto, pedidos, contadores, busca, detalhes, perfil, configurações e dados salvos), a consulta de CEP, as rotas, o script de auditoria do lockfile, as proteções do CI e do repositório, a Content-Security-Policy e o que o build descarta (`console.log` e o admin de teste). O que cada um cobre, como rodar e a verificação no navegador estão em [TESTING.md](./TESTING.md).

## Deploy

Todo push na `main` dispara o workflow [`deploy.yml`](./.github/workflows/deploy.yml), que:

1. instala as dependências com `yarn install --immutable --check-cache` (Node 22), com o Yarn conferido pelo hash do `packageManager` e cada pacote do `.yarn/cache` comparado com o do registro do npm;
2. gera o build;
3. publica a pasta `dist/` no GitHub Pages.

O job que instala e gera o build só tem permissão de leitura; a escrita no Pages fica no job que publica. As actions são fixadas por SHA, e o Dependabot abre uma PR por mês para a `develop` com as versões novas.

Como cada pacote é baixado de novo, o deploy depende do registro do npm: se ele estiver fora do ar, rode o workflow de novo mais tarde.

O GitHub Pages não permite configurar cabeçalhos, então a Content-Security-Policy fica numa `<meta>` do `index.html`: scripts só do próprio site, e conexões só com ele e com o ViaCEP. Um recurso novo de outra origem (script, API, imagem ou fonte) precisa entrar nessa política. O build também descarta as chamadas de `console.log` cujo valor não é usado, e o ESLint recusa um `console.log` como corpo de arrow function sem chaves, caso que o build não alcança.

Para publicar um fork com outro nome de repositório, ajuste o `base` no `vite.config.js`.

## Documentação de design

- [AUDIT.md](./AUDIT.md): auditoria de UI/UX da versão anterior, com os achados numerados (ex.: `[FLX-09]`).
- [SPEC.md](./SPEC.md): especificação do redesign "Brasa": tokens, componentes, telas, micro-interações e critérios de aceite.

## Limitações conhecidas

- **Sem back-end:** contas, pedidos e cardápio existem só no navegador de cada pessoa. O login é conferido no próprio navegador, e quem mexe no `localStorage` consegue mudar a própria sessão.
- **Senhas:** guardadas como hash PBKDF2-SHA256 (WebCrypto, sal aleatório, 600 mil iterações), mas ainda no navegador. Use dados fictícios.
- **Pagamento simulado:** nenhuma cobrança é feita.
- **Painel administrativo:**
  - indicadores, relatórios e os pedidos iniciais são dados de exemplo;
  - o cardápio e os pedidos editados valem só no navegador onde foram editados.
- **CEP:** a busca depende da API pública ViaCEP, e a ajuda do campo avisa isso. O perfil consulta o CEP salvo ao abrir, para saber se a rua veio dele.
- **Embutir em `<iframe>`:** a diretiva `frame-ancestors` não vale em `<meta>`, e o GitHub Pages não deixa enviá-la por cabeçalho. Por isso, outro site pode exibir este dentro de um `<iframe>`.

## Próximos passos

- [ ] API e banco de dados para contas, pedidos e cardápio
- [ ] Integração com um gateway de pagamento
- [ ] Painel administrativo com dados reais, salvos no back-end
- [ ] Notificações do andamento do pedido em tempo real
- [ ] Mais testes (utilitários, rotas, telas) e verificação no navegador no CI

## Como contribuir

1. Crie um branch a partir da `develop` atualizada, por exemplo `feature/nome-da-mudanca` ou `fix/nome-do-problema`. Quem não é do projeto deve fazer um fork.
2. Escreva os commits em português, no padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/), por exemplo `feat(carrinho): ...`, `fix(fluxo): ...` ou `docs: ...`.
3. Antes do pull request, rode `yarn lint`, `yarn test:unit --run` e `yarn build`.
4. Abra o pull request para a `develop`. A `develop` vai para a `main` por outro pull request. Use "Create a merge commit" para os dois branches manterem os mesmos commits.

## Autor

**Lucas Elias Dickmann**: [LinkedIn](https://www.linkedin.com/in/lucas-dickmann) · [GitHub](https://github.com/ldickmann)
