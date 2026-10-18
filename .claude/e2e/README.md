# Verificação no navegador (Playwright + axe)

Estes scripts fizeram a verificação ponta a ponta da repaginação "Brasa" (SPEC §13). Eles rodam contra o preview em `http://localhost:4173/smash-burguer/` e ficam fora das dependências do projeto.

## Preparar (uma vez por container)

O Chromium já vem em `/opt/pw-browsers`; não rode `playwright install`.

```bash
export COREPACK_NPM_REGISTRY=https://registry.npmjs.org
cd /home/user/smash-burguer && corepack yarn@3.8.7 build
nohup corepack yarn@3.8.7 preview --port 4173 --strictPort > /tmp/preview.log 2>&1 &

E2E=/tmp/e2e   # ou uma pasta no scratchpad da sessão
mkdir -p $E2E/shots/final $E2E/shots/lacunas $E2E/video
cp /home/user/smash-burguer/.claude/e2e/*.mjs $E2E/ && cd $E2E
npm init -y >/dev/null && npm i playwright@1.56.1 axe-core@4.10.3
```

## Scripts

| Script | O que verifica |
|---|---|
| `axe-scan.mjs <loja\|admin\|todos> [1440,390] [reduce]` | axe WCAG 2.2 AA, rolagem horizontal, alvos de toque, fontes e título em 20 telas. Com `SCAN_OUT=pasta`, salva screenshots. |
| `flow.mjs` | Fluxo de pedido completo, guards e restauração de rolagem (§13.4). |
| `keyboard.mjs` | Teclado: skip link, anel de foco, foco preso no modal, setas no pagamento, menus (§13.5). |
| `micro-final.mjs` | Flip, odômetro, tilt e montador do burger, com movimento normal e reduzido (§13.6). |
| `check-admin.mjs` | Login admin, sidebar e gaveta, menu de perfil e telas (§13.8). |
| `lacunas.mjs` | Correções da revisão contra o SPEC: movimento reduzido, modal, spinner, guards e admin. |
| `perf.mjs` | Peso da Home em 390 px e LCP (§13.7). |
| `tokens-contrast.mjs` | Contraste dos pares de tokens (lê `_tokens.scss`; não precisa do navegador). |
| `video-tour.mjs <celular\|desktop>` | Grava um passeio pelo site em MP4, para mostrar ao usuário (usa `ffmpeg`). |

Todos imprimem `✓`/`✗` por checagem e terminam com `OK` ou `FALHAS: n`.

Ao terminar, mande o MP4 para o usuário com `SendUserFile`.
