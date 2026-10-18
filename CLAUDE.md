# Smash Burger — guia para o Claude

Converse com o usuário em português. Commits também em português, no formato `tipo(escopo): descrição`.

## Projeto

- Vue 3.5, Vite 6, Pinia 3 com `pinia-plugin-persistedstate`, vue-router 4 com hash history e base `/smash-burguer/`, SCSS (Sass) e Vitest 4.
- Publicado no GitHub Pages em `https://ldickmann.github.io/smash-burguer/`, o endereço que o job de deploy informa. O workflow `.github/workflows/deploy.yml` roda a cada push na `main`.
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

- **Preview:** o servidor cai quando o container hiberna; suba de novo antes de testes no navegador.
- **Rede:** o container não acessa `*.github.io`. Para ver o deploy, use a API ou as ferramentas do GitHub (Actions).

## Git e deploy

- **Fluxo:** branch de trabalho → PR para `develop` → PR `develop` → `main`.
- **Merge:** use sempre "Create a merge commit", sem squash nem rebase.
- **`develop` em dia:** antes, confirme que a `develop` contém a `main` com `git merge-base --is-ancestor origin/main origin/develop`. Se não contiver, abra primeiro uma PR `main` → `develop`.
- **Deploy:** o merge na `main` publica o site. Ele instala com `corepack yarn@3.8.7 install --immutable` no Node 22; se mudar dependências, commite o `yarn.lock` e o `.yarn/cache` juntos.
- **Merges e PRs:** só com pedido explícito do usuário.
- **Actions:** o workflow usa os majors que rodam em Node 24: `checkout@v7`, `setup-node@v7`, `configure-pages@v6`, `upload-pages-artifact@v5` e `deploy-pages@v5`.

## Dependências

- **Não são "sem uso":**
  - `typescript` é peer do `@typescript-eslint/utils`, exigido pelo `@vitest/eslint-plugin`; sem ele, o `eslint .` quebra.
  - `vue-eslint-parser` é peer do `eslint-plugin-vue` 10.
  - `globals` fornece o `globals.browser` do `eslint.config.js`, que o `eslint-plugin-vue` deixou de declarar na v10.
- **Vitest:** `vitest` e `@vitest/coverage-v8` andam sempre na mesma versão.
- **`.yarnrc.yml`:** um `packageExtensions` declara o peer `vue` que falta no `vite-plugin-vue-devtools`.
- **`resolutions`:** só pisos dentro da faixa que os pacotes pedem (hoje, só o `rollup`). Forçar outro major, como o `tar` 6 que existia, bloqueia as correções de segurança.
- **Alertas do Dependabot:**
  - para conferir, rode `corepack yarn@3.8.7 npm audit --all --recursive` e também `python3 -I .claude/lockfile-audit.py`, porque o primeiro deixa passar versões fixadas por transitivas;
  - para corrigir uma transitiva, use `corepack yarn@3.8.7 up -R <pacote>`.

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
