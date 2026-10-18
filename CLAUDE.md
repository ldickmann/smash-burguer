# Smash Burger — guia para o Claude

Converse com o usuário em português. Commits também em português, no formato `tipo(escopo): descrição`.

## Projeto

- Vue 3.5, Vite 6, Pinia 2 com `pinia-plugin-persistedstate`, vue-router 4 com hash history e base `/smash-burguer/`, SCSS (Sass) e Vitest.
- Publicado no GitHub Pages, provavelmente em `https://ldickmann.github.io/smash-burguer/` (endereço não confirmado). O workflow `.github/workflows/deploy.yml` roda a cada push na `main`.
- Repaginação "Brasa" (out/2026, PRs #21 e #22):
  - `SPEC.md` é a especificação;
  - `AUDIT.md` traz os achados, com IDs como `[FLX-09]`.

## Comandos no ambiente cloud

O projeto usa Yarn 3.8.7, fixado em `packageManager` no `package.json`; o `yarn.lock` está no formato do Yarn 3 e o `.yarn/cache` é versionado. O `repo.yarnpkg.com` é bloqueado no container, então:

```bash
export COREPACK_NPM_REGISTRY=https://registry.npmjs.org
corepack yarn@3.8.7 install --immutable   # altera .yarn/install-state.gz; não commite só isso
corepack yarn@3.8.7 build
npx vitest run                             # 35 testes
npx eslint .                               # deve dar 0 erros
corepack yarn@3.8.7 preview --port 4173 --strictPort   # http://localhost:4173/smash-burguer/ (em background)
```

- **ESLint:** o `@typescript-eslint` precisa de `typescript`, que não está no `package.json`. Se o lint reclamar, instale fora do repo: `npm i typescript@5.8.3 --prefix /home/user`.
- **Preview:** o servidor cai quando o container hiberna; suba de novo antes de testes no navegador.
- **Rede:** o container não acessa `*.github.io`. Para ver o deploy, use a API ou as ferramentas do GitHub (Actions).

## Git e deploy

- **Fluxo:** branch de trabalho → PR para `develop` → PR `develop` → `main`.
- **Merge:** use sempre "Create a merge commit", sem squash nem rebase.
- **`develop` em dia:** antes, confirme que a `develop` contém a `main` com `git merge-base --is-ancestor origin/main origin/develop`. Se não contiver, abra primeiro uma PR `main` → `develop`.
- **Deploy:** o merge na `main` publica o site. Ele instala com `corepack yarn@3.8.7 install --immutable` no Node 22; se mudar dependências, commite o `yarn.lock` e o `.yarn/cache` juntos.
- **Merges e PRs:** só com pedido explícito do usuário.

## Convenções do código (SPEC)

- **Tokens:** cores, espaços, raios, sombras, z-index e durações saem só dos tokens de `src/assets/styles/base/_tokens.scss`. Única exceção: as cores das camadas em `BurgerStack.vue`.
- **Breakpoints e mixins:** mobile-first, em `base/_breakpoints.scss` (`up()`, `below()`, `hover-capable`, `motion-ok`, `motion-reduced`).
- **Estilos:** cada componente faz `@use` da própria parcial dentro de `<style scoped>`. O `main.scss` importa só a base.
- **Animações:**
  - só `transform` e `opacity`;
  - `transform` e durações acima de `--dur-fast` ficam só dentro de `motion-ok`;
  - a regra global de movimento reduzido fica em `base/_motion.scss`.
- **Proibidos:** `!important`, `outline: none`, `transition: all`, hex ou rgba fora dos tokens, e `toFixed`. Preço sempre via `formatPrice`. As buscas da §13.2 do SPEC devem continuar com 0 resultados.
- **Componentes base:** ficam em `src/components/ui/` (`BaseButton`, `BaseDialog`, `QuantityStepper`, `CategoryTabs`, `AppToast`, `EmptyState`).
- **Textos:** em português. A marca se escreve sempre "Smash Burger".
- **Chaves de localStorage:** `smash-burger:cart:v1`, `smash-burger:session` e `smash-burger:account`. O admin continua em `admin`.
- **Dependências novas:** pergunte ao usuário antes de adicionar.

## Verificação

Rode build, lint e testes. Para mudanças visuais ou de dependências, use também os scripts Playwright + axe de `.claude/e2e/`; o modo de usar está em `.claude/e2e/README.md`.

## Documentação

O `README.md` (instalação, scripts, estrutura, dados no navegador, deploy, limitações) e o `TESTING.md` descrevem o estado atual. Ao mudar dependências, scripts, testes, rotas ou o deploy, atualize os dois no mesmo PR.

## Problemas conhecidos (fora do escopo do redesign)

- "Atualizar status" no admin lança TypeError (`[FLX-09]`).
- No admin, "Excluir" só faz `console.log`, e produtos criados ou editados não são persistidos.
- A sessão guarda a senha no localStorage, e o `createAdmin.html` está versionado com credenciais (AUDIT §11.3).
- O `createAdmin.html` grava o admin na chave `admin`, a mesma que o `adminStore` persiste. Depois do primeiro login, entrar de novo exige rodar o `createAdmin.html` outra vez. O link que a página mostra (`/admin/login`) também está errado; o certo é `/smash-burguer/#/admin/login`.
- Sair da conta apaga o histórico de pedidos.
- O `.prettierrc.json` (sem ponto e vírgula, aspas simples) não bate com 120 dos 132 arquivos de `src/`. Não rode `yarn format` misturado com outras mudanças.

## Próxima tarefa — handoff de 18/10/2026 (apague esta seção ao concluir)

O usuário pediu para corrigir os avisos do workflow de deploy e os alertas do Dependabot.

### 1. Avisos do deploy

Referência: [run 24](https://github.com/ldickmann/smash-burguer/actions/runs/39094392238).

- **Actions em versões para Node 20:** o GitHub avisa "Node.js 20 is deprecated" para estas actions:
  - `actions/checkout@v4`
  - `actions/setup-node@v4`
  - `actions/configure-pages@v4`
  - `actions/upload-artifact@v4`, que vem de dentro do `actions/upload-pages-artifact@v3`

  Atualize também o `actions/deploy-pages@v4`. Confirme nos repositórios oficiais quais majors atuais rodam em Node 24.
- **`DeprecationWarning` de `punycode` e `url.parse()`:** vêm de dentro das actions e devem sumir com as versões novas.
- **Avisos de peer dependency no `install`:**
  - `pinia-plugin-persistedstate` pede outra versão de `pinia` (o projeto usa 2.3.1);
  - `@vitest/coverage-v8` pede outra versão de `vitest` (3.2.6);
  - `@typescript-eslint/parser` e `@typescript-eslint/utils` pedem `typescript`, que não está instalado;
  - `vite-hot-client` e `@vue/devtools-core` pedem `vite`/`vue` (vêm do `vite-plugin-vue-devtools`).

### 2. Dependabot

Confira a lista real em GitHub → Security → Dependabot. Em 18/10, `corepack yarn@3.8.7 npm audit --all --recursive` encontrou 28 alertas: 1 crítico, 17 altos, 9 moderados e 1 baixo. Entre parênteses, o pacote do projeto que traz cada um:

- **Crítico:** `tinypool` (vitest). Corrige com `vitest` + `@vitest/coverage-v8` ≥ 4.1.11, um major que também resolve `@vitest/mocker`.
- **Altos:**
  - `@vue/server-renderer` < 3.5.42 (vue);
  - `postcss` < 8.5.18, `nanoid` < 5.1.11 e `source-map-js` (vue e vite);
  - `vite` 7.3.1 < 7.3.5 (vite-plugin-vue-devtools);
  - `tar`, `http-cache-semantics`, `picomatch`, `minimatch` e `brace-expansion` (vite e vitest);
  - `happy-dom` < 20.8.8 e `ws` < 8.21;
  - `defu` (pinia-plugin-persistedstate);
  - `immutable` (sass-embedded);
  - `flatted` e `js-yaml` (eslint);
  - `browserslist` (vite-plugin-vue-devtools).
- **Moderados e baixo:**
  - `ip-address` (vite e vitest);
  - `ajv` e `@humanfs/node` (eslint);
  - `lodash-es` (vue-chart-3);
  - `postcss-selector-parser` (eslint-plugin-vue);
  - `svgo` (vite-svg-loader);
  - `baseline-browser-mapping` e `@babel/core` (vite-plugin-vue-devtools).

Dependências sem uso: removê-las já fecha alguns alertas. Confirme com o usuário antes.

- `chart.js` e `vue-chart-3`: o gráfico foi trocado por um `EmptyState`. Remover o `vue-chart-3` também elimina o alerta do `lodash-es`.
- `happy-dom`: os testes usam `jsdom`. Remover elimina os alertas de `happy-dom` e `ws`.
- `vite-svg-loader`: está no `vite.config.js`, mas nenhum arquivo importa SVG. Remover elimina o alerta do `svgo`.

`@vitest/coverage-v8` está fixo em 3.0.5, e o `vitest` está na 3.2.6. O `yarn test:coverage` avisa "Running mixed versions". Alinhe os dois e atualize a nota no `TESTING.md`.

Como fazer:

- Atualize com `corepack yarn@3.8.7 up <pacote>`; para dependências transitivas, use `up -R <pacote>`.
- Para majors (vitest 4, talvez pinia 3), leia o changelog antes.
- Depois de cada lote, rode build, lint, testes e os scripts de `.claude/e2e`.
