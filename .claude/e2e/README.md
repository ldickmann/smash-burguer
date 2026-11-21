# Verificação no navegador (Playwright + axe)

Estes scripts fizeram a verificação ponta a ponta da repaginação "Brasa" (SPEC §13). Eles rodam contra o preview em `http://localhost:4173/smash-burguer/` e ficam fora das dependências do projeto.

## Preparar (uma vez por container)

O Chromium já vem em `/opt/pw-browsers`; não rode `playwright install`.

```bash
export COREPACK_NPM_REGISTRY=https://registry.npmjs.org
cd /home/user/smash-burguer && corepack yarn@3.8.7 build
nohup corepack yarn@3.8.7 preview --port 4173 --strictPort > /tmp/preview.log 2>&1 &

E2E=/tmp/e2e   # ou uma pasta no scratchpad da sessão
export REPO=/home/user/smash-burguer   # o tokens-contrast.mjs lê o repositório daqui
mkdir -p $E2E/shots/final $E2E/shots/lacunas $E2E/video
cp /home/user/smash-burguer/.claude/e2e/*.mjs $E2E/ && cd $E2E
npm init -y >/dev/null && npm i playwright@1.56.1 axe-core@4.10.3
```

## Preparar numa máquina Windows (sem Corepack)

O Node 26 não traz o Corepack, e o Yarn não fica no PATH. O Vite roda direto do `node_modules`, e o Playwright usa o Chromium que já estiver em `%LOCALAPPDATA%\ms-playwright` (a versão 1.65.0 usa o `chromium-1254`).

```bash
node node_modules/vite/bin/vite.js build
node node_modules/vite/bin/vite.js preview --port 4173 --strictPort   # em segundo plano

E2E=<pasta no scratchpad da sessão>
export REPO="$PWD"   # a raiz do repositório, para o tokens-contrast.mjs
mkdir -p $E2E/shots/final $E2E/shots/lacunas $E2E/shots/fase6 $E2E/video
cp .claude/e2e/*.mjs $E2E/ && cd $E2E
npm init -y >/dev/null && npm i --ignore-scripts playwright@1.65.0 axe-core@4.10.3
```

- **Vitest no Node 26:** os testes com `localStorage` precisam de `NODE_OPTIONS=--no-experimental-webstorage`.
- **Porta 5173 ocupada** (servidor de desenvolvimento de outra sessão): para conferir algo no `yarn dev`, suba o Vite com `--port <outra> --strictPort`.

## Dados que os scripts semeiam

- **Cliente:** `smash-burger:account` (cadastro; a senha em texto puro é aceita e vira hash no primeiro login), `smash-burger:session` e `smash-burger:cart:v1`.
- **Painel:** a sessão fica em `smash-burger:admin-session` (`{ admin, isAuthenticated }`); o cadastro do admin, para o login pela tela, fica em `admin`.

## Scripts

| Script | O que verifica |
|---|---|
| `axe-scan.mjs <loja\|admin\|todos> [1440,390] [reduce]` | axe WCAG 2.2 AA, rolagem horizontal, alvos de toque, fontes (reprova o `body` fora da Roboto Variable e o `h1` fora do peso 500), título e violações da CSP em 22 telas. Com `SCAN_OUT=pasta`, salva screenshots. |
| `flow.mjs` | Fluxo de pedido completo, guards e restauração de rolagem (§13.4). |
| `keyboard.mjs` | Teclado: skip link, anel de foco, foco preso no modal, setas no pagamento, menus (§13.5). |
| `micro-final.mjs` | Flip, odômetro, tilt e montador do burger, com movimento normal e reduzido (§13.6). |
| `check-admin.mjs` | Login admin, sidebar e gaveta, menu de perfil e telas (§13.8). |
| `lacunas.mjs` | Correções da revisão contra o SPEC: movimento reduzido, modal, spinner, guards (inclusive o `redirect` de volta ao perfil) e admin. |
| `perf.mjs` | Peso da Home em 390 px e LCP (§13.7). |
| `tokens-contrast.mjs` | Contraste dos pares de `src/utils/contraste.js` sobre `src/assets/styles/base/_tokens.scss` (não precisa do navegador). A raiz do repositório vem de `REPO=<pasta>`; sem ela, o script usa a pasta atual. |
| `video-tour.mjs <celular\|desktop>` | Grava um passeio pelo site em MP4, para mostrar ao usuário (usa `ffmpeg`). |

Todos imprimem `✓`/`✗` por checagem e terminam com `OK` ou `FALHAS: n`.

Ao terminar, mande o MP4 para o usuário com `SendUserFile`.
