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

- **Vitest no Node 26:** o `vitest.config.js` já passa `--no-experimental-webstorage` aos workers (`execArgv`), então os testes com `localStorage` não precisam mais do `NODE_OPTIONS`.
- **Porta 5173 ocupada** (servidor de desenvolvimento de outra sessão): para conferir algo no `yarn dev`, suba o Vite com `--port <outra> --strictPort`.

## Dados que os scripts semeiam

- **Cliente:** `smash-burger:account` (cadastro; a senha em texto puro é aceita e vira hash no primeiro login), `smash-burger:session` e `smash-burger:cart:v1`.
- **Painel:** a sessão fica em `smash-burger:admin-session` (`{ admin, isAuthenticated }`); o cadastro do admin, para o login pela tela, fica em `admin`.

## Scripts

| Script | O que verifica |
|---|---|
| `axe-scan.mjs <loja\|admin\|todos> [1440,390] [reduce]` | axe WCAG 2.2 AA, rolagem horizontal, alvos de toque, fontes (reprova o `body` fora da Roboto Variable e o `h1` fora do peso 500), título e violações da CSP em 42 telas e estados (a Home também com a folha de ingredientes aberta e com o cardápio vazio; o Cardápio em Bebidas, com a categoria vazia e com a folha aberta; o modal de hambúrguer, de bebida e de sobremesa, com um ingrediente desmarcado e com um adicional somado; o carrinho logado, do visitante, vazio e com o aviso "Desfazer"; o pagamento com e sem endereço, com a forma marcada e enviando, que estica só ali a espera simulada de 800 ms; o login com erro e com a senha visível; o cadastro vazio, com conta salva, buscando o CEP (a resposta do ViaCEP presa por `page.route`) e com o CEP único da cidade; o perfil com os itens abertos, sem pedidos, com o aviso "Dados salvos." e com o diálogo de exclusão; e a observação do modal; cada estado conferido antes do axe). As categorias são rádios escondidos sob o rótulo: os scripts as marcam com `getByRole('radio', { name }).check({ force: true })`. Com `SCAN_OUT=pasta`, salva screenshots. |
| `flow.mjs` | Fluxo de pedido completo, pela pílula da toolbar e pelo FAB do carrinho, guards e restauração de rolagem (§13.4). O Cheese Bacon entra primeiro pelo Cardápio, com o foco de volta à frente do split do card de origem e o anúncio, e o carrinho volta a zero. O lanche e a bebida entram pela Home: folha de ingredientes pelo split e retorno "Adicionado" (SPEC-material §13.4). Na confirmação, o número e a forma do pedido na `dl` da faixa, sem "·"; no carrinho, o "Desfazer" devolve o foco ao "Remover" do item. No login com a senha errada, o banner na região `role="alert"`, junto do botão e à vista; "Ver meus pedidos" chega a "Seus pedidos" pela âncora (desenho da Conta, §13), e a linha do pedido não tem "·". |
| `keyboard.mjs` | Teclado: skip link, ordem do Tab no topo, anel de foco de 3 px (o link da assinatura tem o próprio, de 2 px), foco preso no modal, Enter, Espaço e Esc no split da Home, o grupo de categorias do Cardápio (uma parada no Tab, setas que marcam e trocam a grade, volta do último ao primeiro), setas no pagamento e menus do painel (§13.5). No Cardápio, em 1440, 390 e 360 px, o foco que volta pela grade com Shift+Tab não fica sob o grupo grudado nem sob o cabeçalho; em 360 px, o grupo cabe numa linha. Em 390 px, em todas as rotas da loja, o foco (com o anel, e o card no lugar do rádio escondido) não fica coberto pela toolbar flutuante nem encosta nela (SPEC-material §13.3, item 6). A altura dessas telas vem de `KB_ALTURA` (padrão 844). No carrinho e no pagamento (desenho do Carrinho, §9), em 390 px com a mesma altura: as setas do pagamento até o Dinheiro e de volta ao primeiro, sem a opção focada cruzar a toolbar; o Shift+Tab sem forma marcada (o script descobre qual rádio o navegador escolhe e põe essa opção em parte sob a toolbar antes); o carrinho do visitante e o pagamento sem endereço; e o "Remover" vizinho depois de uma remoção, fora do aviso e da toolbar, perto do pé em 390 e perto do topo em 1024 (em 1440, sem pulo da página); pelo mouse, o foco vai ao vizinho sem rolar a página. Na conta (desenho da Conta, §9), em 390 px com a mesma altura e o ViaCEP simulado: a ordem do Tab no cadastro, com e sem CEP único da cidade; "Enter no CEP" com a falha do WebCrypto (o `crypto.subtle` escondido por `addInitScript`), com o banner e o botão à vista; o aviso "Dados salvos." sem cobrir o "Salvar alterações" focado pelo Tab; pelo mouse, salvar sem rolar; e o anel interno do "Ver itens". As duas rolagens têm mutação (o `scrollIntoView` desligado reprova). O campo de data recebe um Tab por parte: a volta do `focusNotCovered` não para na repetição. Rode com `KB_ALTURA=844`, `830` e `800`. |
| `micro-final.mjs` | Na Home: prensa, troca de forma, chevron, folha e retorno "Adicionado" (SPEC-material §13.6). No Cardápio: o card sem tilt, o check do checkbox dos ingredientes (escala só com movimento), o montador do burger, o retorno "Adicionado" no card de origem e o badge do FAB. Com movimento normal e reduzido. |
| `check-admin.mjs` | Login admin, sidebar e gaveta, menu de perfil e telas (§13.8). |
| `lacunas.mjs` | Correções da revisão contra o SPEC: movimento reduzido, modal, spinner, guards (inclusive o `redirect` de volta ao perfil) e admin. |
| `perf.mjs` | Peso da Home em 390 px (até 1,5 MB, com a Roboto), a foto do hero como LCP, imagens WebP e com `width` e `height` (§13.7). |
| `tokens-contrast.mjs` | Contraste dos pares de `src/utils/contraste.js` sobre `src/assets/styles/base/_tokens.scss` (não precisa do navegador). A raiz do repositório vem de `REPO=<pasta>`; sem ela, o script usa a pasta atual. |
| `video-tour.mjs <celular\|desktop>` | Grava um passeio pelo site em MP4, para mostrar ao usuário (usa `ffmpeg`). Ainda usa o menu mobile e o badge da Brasa, que saíram na etapa 4 do Material 3: é atualizado na etapa 12. As categorias do Cardápio já são tocadas pelo rótulo do rádio, e o card é o `.m3-cartao` (etapa 6). |

Todos imprimem `✓`/`✗` por checagem e terminam com `OK` ou `FALHAS: n`.

Ao terminar, mande o MP4 para o usuário com `SendUserFile`.
