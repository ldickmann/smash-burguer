# Smash Burger — guia para o Claude

Converse com o usuário em português. Commits também em português, no formato `tipo(escopo): descrição`.

## Projeto

- Vue 3.5, Vite 6, Pinia 3 com `pinia-plugin-persistedstate`, vue-router 4 com hash history e base `/smash-burguer/`, SCSS (Sass) e Vitest 4.
- Publicado no GitHub Pages em `https://ldickmann.github.io/smash-burguer/`, o endereço que o job de deploy informa. O workflow `.github/workflows/deploy.yml` roda a cada push na `main`.
- Repaginação "Brasa" (out/2026, PRs #21 e #22):
  - `SPEC.md` é a especificação;
  - `AUDIT.md` traz os achados, com IDs como `[FLX-09]`.

## Comandos no ambiente cloud

O projeto usa Yarn 3.8.7, fixado com o hash sha512 em `packageManager` no `package.json`; o `yarn.lock` está no formato do Yarn 3 e o `.yarn/cache` é versionado. O `repo.yarnpkg.com` é bloqueado no container, então:

```bash
export COREPACK_NPM_REGISTRY=https://registry.npmjs.org
corepack yarn@3.8.7 install --immutable
corepack yarn@3.8.7 build
npx vitest run                             # 120 testes
npx eslint .                               # deve dar 0 erros
corepack yarn@3.8.7 preview --port 4173 --strictPort   # http://localhost:4173/smash-burguer/ (em background)
```

- **Preview:** o servidor cai quando o container hiberna; suba de novo antes de testes no navegador.
- **Rede:** o container não acessa `*.github.io`. Para ver o deploy, use a API ou as ferramentas do GitHub (Actions).

## Git e deploy

- **Fluxo:** branch de trabalho → PR para `develop` → PR `develop` → `main`.
- **Merge:** use sempre "Create a merge commit", sem squash nem rebase.
- **`develop` em dia:** antes, confirme que a `develop` contém a `main` com `git merge-base --is-ancestor origin/main origin/develop`. Se não contiver, abra primeiro uma PR `main` → `develop`.
- **Deploy:** o merge na `main` publica o site. Se mudar dependências, commite o `yarn.lock` e o `.yarn/cache` juntos.
  - O CI instala com `corepack yarn install --immutable --check-cache` no Node 22. A versão fica fora da linha de comando para o Corepack conferir o hash do `packageManager`; com `yarn@3.8.7` explícito, ele não confere.
  - O `--check-cache` baixa de novo cada pacote e compara com o zip do `.yarn/cache`. É a única conferência dos binários de plataforma (`@esbuild/linux-x64` e outros), que não têm checksum no `yarn.lock`. Ao revisar uma PR que mexe no `.yarn/cache`, rode o mesmo install no container, que é Linux.
  - Com isso, o deploy depende do registro do npm. Se ele estiver fora do ar, rode o workflow de novo mais tarde; se uma versão do `yarn.lock` for retirada do registro, o deploy falha até a dependência ser atualizada.
  - Só o job `deploy` tem permissão de escrita (`pages: write` e `id-token: write`). O `build`, que roda código das dependências, só lê e não guarda o token no `.git/config`.
- **Merges e PRs:** só com pedido explícito do usuário.
- **Actions:** fixadas pelo SHA completo do commit, com a versão em comentário: `checkout` v7.0.1, `setup-node` v7.1.0, `configure-pages` v6.0.0, `upload-pages-artifact` v5.0.0 e `deploy-pages` v5.0.1, todas em Node 24.
  - O Dependabot (`.github/dependabot.yml`) abre uma PR por mês para a `develop`, trocando o SHA e o comentário juntos. Os commits dele saem em inglês (`ci(deps): bump …`): é a exceção à regra de commits em português.
  - Para trocar à mão, pegue o SHA do commit com `gh api repos/actions/<nome>/commits/<versão> --jq .sha`, que resolve também tag anotada, e mude SHA e comentário juntos. Não volte a usar só a tag.

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
  - no script, a marca "versão não identificada" indica um advisory que ele não ligou a nenhuma versão do lockfile (a faixa não casou ou está num formato que ele não entende, como `^`, `~` ou hífen): confira à mão;
  - para corrigir uma transitiva, use `corepack yarn@3.8.7 up -R <pacote>`.

## Convenções do código (SPEC)

- **Tokens:** cores, espaços, raios, sombras, z-index e durações saem só dos tokens de `src/assets/styles/base/_tokens.scss`. Exceções: as cores das camadas em `BurgerStack.vue`, a assinatura de autoria e os `_tokens.scss` das direções visuais (seções abaixo).
- **Breakpoints e mixins:** mobile-first, em `base/_breakpoints.scss` (`up()`, `below()`, `hover-capable`, `motion-ok`, `motion-reduced`).
- **Estilos:** cada componente faz `@use` da própria parcial dentro de `<style scoped>`. O `main.scss` importa só a base.
- **Animações:**
  - só `transform` e `opacity`;
  - `transform` e durações acima de `--dur-fast` ficam só dentro de `motion-ok`;
  - a regra global de movimento reduzido fica em `base/_motion.scss`.
- **CSP:** fica numa `<meta>` do `index.html`, porque o GitHub Pages não aceita cabeçalhos. Recurso novo de outra origem (script, `fetch`, imagem ou fonte) precisa entrar nela. O `'unsafe-inline'` de `style-src` fica: o Font Awesome e o servidor de desenvolvimento do Vite injetam `<style>`. No `yarn dev`, o Vite e o devtools põem scripts antes da `<meta>`; a ordem que vale é a do `dist/index.html`.
- **`console.log`:** o build descarta as chamadas cujo valor não é usado (`esbuild.pure` no `vite.config.js`). Numa arrow function de expressão, como `(x) => console.log(x)`, use chaves; o `eslint .` acusa esse caso (`no-restricted-syntax`).
- **Proibidos:** `!important`, `outline: none`, `transition: all`, hex ou rgba fora dos tokens, e `toFixed`. Preço sempre via `formatPrice`. As buscas da §13.2 do SPEC devem continuar com 0 resultados.
- **Componentes base:** ficam em `src/components/ui/` (`BaseButton`, `BaseDialog`, `QuantityStepper`, `CategoryTabs`, `AppToast`, `EmptyState`).
- **Assinatura de autoria:** `src/components/AssinaturaEncaixe.vue`, no `MainLayout`, logo depois do `<TheFooter>`, com `tom="escuro"`.
  - É cópia exata de um bloco com sha256 `3a9f9cc494d415f3a30c34519336b53b1db8c16955b89d09ddd22043543749fd`: não edite nem formate o arquivo. Se o CSS do projeto vazar para a faixa, corrija a regra do projeto.
  - Fica fora das convenções acima (`<style>` global, cores em hex, `!important`, animação própria e link de 40 px de altura). A §1.1 e a §13.2 do SPEC e o `axe-scan.mjs` já a excluem.
- **Textos:** em português. A marca se escreve sempre "Smash Burger".
- **Chaves de localStorage:** `smash-burger:cart:v1`, `smash-burger:session` e `smash-burger:account`. O admin continua em `admin`.
- **Dependências novas:** pergunte ao usuário antes de adicionar.

## Direções visuais (exploração, só no `yarn dev`)

- **Onde:** `#/direcoes` (índice com uma ficha por estilo) e `#/direcoes/<estilo>` (`brasa`, `material`, `esqueumorfismo`, `neumorfismo`, `3d`, `flat`, `minimalismo`, `escuro`). Código em `src/direcoes/`; pesquisa em `docs/direcoes/PESQUISA.md`.
- **Fora do build:** as rotas ficam dentro do ramo `import.meta.env.DEV` de `src/direcoes/rotas.js`; com a lista fora do ramo, o build gerava os chunks. Depois de mexer nelas, rode o build e confira que o `dist/` não tem `direcoes` nem as fontes novas.
- **Tokens:** cada estilo redefine todos os tokens do projeto em `:root[data-direcao="<estilo>"]` (o modal Personalizar e o aviso continuam os reais) e tem os próprios, com prefixo (`--m3-*`, `--esq-*`, `--neu-*`, `--3d-*`, `--flat-*`, `--min-*`, `--esc-*`).
  - Os `_tokens.scss` são importados pelo `<script>`, não no `<style scoped>`, que reescreveria o `:root`.
  - São os únicos arquivos da exploração com hex, rgba e durações (exceção na §13.2 do SPEC).
- **Fontes:** Roboto, Open Sans, Courier Prime, Nunito e Fredoka são `devDependencies`, só das direções. A do estilo escolhido passa a `dependencies` quando ele for levado ao sistema; as outras saem.
- **Capturas:** `?captura=1` esconde o alternador. O botão do Vue DevTools aparece no `yarn dev`; remova-o antes de capturar.

## Verificação

Rode build, lint e testes. Para mudanças visuais ou de dependências, use também os scripts Playwright + axe de `.claude/e2e/`; o modo de usar está em `.claude/e2e/README.md`.

## Documentação

O `README.md` (instalação, scripts, estrutura, dados no navegador, deploy, limitações) e o `TESTING.md` descrevem o estado atual. Ao mudar dependências, scripts, testes, rotas ou o deploy, atualize os dois no mesmo PR.

## Problemas conhecidos (fora do escopo do redesign)

- "Atualizar status" no admin lança TypeError (`[FLX-09]`).
- No admin, "Excluir" só faz `console.log`, e produtos criados ou editados não são persistidos.
- O cadastro do cliente guarda a senha em texto puro no localStorage (a sessão não guarda mais). O `createAdmin.html`, versionado, cria um admin com credenciais fictícias e públicas (AUDIT §11.3).
- O `createAdmin.html` grava o admin na chave `admin`, a mesma que o `adminStore` persiste. Depois do primeiro login, entrar de novo exige rodar o `createAdmin.html` outra vez. O link que a página mostra (`/admin/login`) também está errado; o certo é `/smash-burguer/#/admin/login`.
- Sair da conta apaga o histórico de pedidos.
- O `.prettierrc.json` (sem ponto e vírgula, aspas simples) não bate com 120 dos 132 arquivos de `src/`. Não rode `yarn format` misturado com outras mudanças.
