# Testes

O projeto tem duas camadas de verificação:

- **Testes unitários** em `src/__tests__/`, com Vitest, Vue Test Utils e jsdom. São 239 testes em 25 arquivos.
- **Verificação no navegador**, com os scripts Playwright + axe-core de `.claude/e2e/`: acessibilidade, fluxo de pedido, teclado e micro-interações. Eles rodam à mão contra o build e ainda não fazem parte do CI.

## Como rodar os testes unitários

```bash
yarn test:unit          # modo observação: roda de novo a cada alteração
yarn test:unit --run    # roda uma vez, como antes de abrir um pull request
yarn test:coverage      # roda uma vez e gera a cobertura em coverage/
```

O relatório HTML de cobertura fica em `coverage/index.html`, pasta ignorada pelo Git.

O `vitest` e o `@vitest/coverage-v8` estão na mesma versão (4.1.12) e devem ser atualizados juntos, porque o pacote de cobertura exige exatamente a versão do `vitest`.

Desde o Vitest 4, o relatório só lista os arquivos que os testes importam, a menos que a config defina `coverage.include`. O `vitest.config.js` inclui `src/**/*.{js,vue}`, então os arquivos sem teste aparecem com 0%.

## O que está coberto

| Arquivo | Testes | O que verifica |
|---|---|---|
| `BaseButton.test.js` | 13 | Variantes; `type="submit"`; `loading` com `aria-busy`, spinner e clique bloqueado; `disabled` real; `aria-pressed`; botão só de ícone com `aria-label`; versão link (`to`); repasse de `class` e `data-*` |
| `AppToast.test.js` | 7 | `role="status"` ou `role="alert"` conforme a variante; fecha sozinho depois do tempo; pausa no hover e no foco; ação "Desfazer"; botão "Fechar aviso"; no máximo 3 avisos |
| `BannerComponent.test.js` | 5 | Título como único `h1`; variante `hero` com `<picture>`, carregamento imediato e `fetchpriority="high"`; variante `page` com imagem `lazy`; slot de ações; nenhum estilo inline na imagem |
| `cart.test.js` | 4 | Store do carrinho: total de itens e subtotal; campos padrão do item; quantidade nunca abaixo de 1; remover e "Desfazer" devolvendo o item à mesma posição |
| `cartItems.test.js` | 26 | Conferência de cada item do carrinho com o cardápio (`src/utils/cartItems.js`): o item montado pelo modal passa igual, com o mesmo preço, inclusive com a observação no limite de 140 caracteres; preço, nome, imagem e preço dos adicionais vêm do catálogo; recusa o item que não é objeto, de produto ou categoria fora do cardápio, com quantidade fora de 1 a 10, com ingrediente que o produto não tem ou repetido, com adicional fora do catálogo da categoria, acima de 5, zerado ou repetido, e com observação que não é texto ou passa de 140 caracteres; bebida não leva adicionais; a lista fica só com os itens que batem |
| `storedState.test.js` | 14 | Estado lido do `localStorage`, com o plugin de persistência ligado. Carrinho: a imagem enviada pelo painel (data URL) não é gravada em cada linha; `items` que não é lista vira carrinho vazio; preço editado volta ao do cardápio e a linha fora dele sai; nome e imagem editados voltam ao catálogo e são regravados; um carrinho certo não é regravado. Sessão: com o histórico em `null`, `/confirmation` volta ao cardápio sem erro; com o pedido salvo, abre; pedido fora do formato sai do histórico, e o próximo número não repete um existente; tipos trocados no perfil viram texto vazio, e a sessão sem perfil não vale; uma sessão certa não é regravada. Painel (`smash-burger:admin-session`): `admin` que não é objeto derruba a sessão; uma sessão gravada com a senha perde a senha e continua valendo; o cadastro do admin, em `admin`, não é lido como sessão nem regravado pela store; nome que não é texto não quebra a barra do painel |
| `PaymentView.test.js` | 5 | Pagamento: um carrinho que bate com o cardápio fecha o pedido na primeira confirmação; com o preço editado, o pedido não sai, o carrinho volta ao preço do cardápio com um aviso, e a segunda confirmação fecha com o total do cardápio; o pedido do histórico não guarda a imagem; quem sai da tela durante a espera desiste do pedido; sem nenhuma linha que bata, a tela volta ao carrinho |
| `adminAuth.test.js` | 8 | Login do painel: com o admin criado à mão na chave `admin`, entra, e a sessão fica sem a senha; o cadastro com a senha em texto passa a guardar o hash, perde os campos de sessão antigos, e "Sair" não o apaga; com JSON ilegível nessa chave, o login é recusado em vez de ficar pendente, e a tela mostra o erro e devolve o botão. Admin de teste do `yarn dev`: entra sem nada salvo e de novo depois de sair; fora do dev (`vi.stubEnv('DEV', false)`), não existe e as credenciais dele são recusadas; a tela preenche o formulário com ele e leva o foco ao "Entrar"; fora do dev, a tela não mostra o atalho |
| `products.test.js` | 7 | Store de produtos: criar numa categoria que ainda não foi aberta, sem erro e sem perder as do cardápio; categoria fora da lista é recusada; editar mantém o id e a posição; trocar a categoria move o produto com id novo, sem substituir o de mesmo id da categoria nova; a edição apaga a quantidade quando o formulário a manda vazia; produto inexistente não muda nada; um id que saiu da categoria (exclusão ou troca) não volta para outro produto |
| `ProductManagement.test.js` | 4 | Tela de produtos do painel, com o modal, o card e o `BaseDialog` em stub: os destaques não são sorteados de novo ao trocar o filtro; editar e trocar a categoria procura o produto na categoria de origem, e o foco vai para o título quando o "Editar" sai da lista; criar uma bebida antes de abrir o filtro de bebidas cria o produto e mostra a categoria dele; "Excluir" pede confirmação, cancelar mantém o produto e confirmar o tira da lista e da store, com o foco no título |
| `productForm.test.js` | 28 | Formulário de produto (`src/utils/productForm.js`): o preço com vírgula ou ponto vira número; texto, separador de milhar, três casas, negativo e zero são recusados com a mensagem certa; o preço do cardápio aparece no campo com vírgula e duas casas; nome obrigatório com até 60 caracteres, quantidade opcional e inteira de 0 a 9999, descrição com até 160; conversão para o modelo do cardápio, com a quantidade vazia como `null`. Imagem: aceita PNG, JPEG e WebP com o conteúdo do tipo; recusa HTML, SVG, GIF e arquivo sem tipo, acima de 300 kB (e aceita no limite) e arquivo com o tipo de imagem e outro conteúdo |
| `ModalProducts.test.js` | 7 | Modal de produto, com o `BaseDialog` em stub: com os campos vazios, não salva e mostra os erros, inclusive o da imagem; com o preço em texto, não salva; salva com o preço em número e a imagem lida, mesmo com o envio logo depois da escolha do arquivo, e deixa quem abriu fechar; recusa um arquivo que não é imagem, e o seletor volta ao estado em que o modal abriu; na edição, um arquivo recusado depois de outro aceito volta à imagem atual, que pode ser salva; na edição, mostra o preço com vírgula e salva sem trocar a imagem nem exigir quantidade; sem espaço no navegador para a imagem, não salva e mostra o erro no campo |
| `OrderManagement.test.js` | 7 | Pedidos do painel: "Atualizar status" leva o pedido de Pendente a Concluído, com aviso, e fica desabilitado no último; quando o botão sai da lista filtrada ou fica desabilitado, o foco vai para o título; o filtro fica no endereço (`?status=`), e o pedido atualizado segue o filtro; a tela abre já filtrada pelo endereço, e um status desconhecido vale como "Todos"; a store não avança pedido concluído nem inexistente. Contadores da barra: contam os pedidos pendentes e em preparo, com o número no rótulo acessível e o link para Pedidos filtrado, sem "Mensagens"; acompanham o "Atualizar status", e o selo some no 0 |
| `auth.test.js` | 19 | Login com credenciais válidas e inválidas; sair e entrar de novo; migração do cadastro antigo para a chave nova; numeração dos pedidos a partir de 1001. Dados da conta: a sessão guarda só os campos do perfil, sem a senha, e a sessão gravada no formato antigo é regravada ao carregar; sair esvazia o carrinho; entrar com outra conta zera o histórico; excluir a conta apaga cadastro, sessão e carrinho; uma sessão antiga não altera nem apaga o cadastro de outra pessoa; perfil e cadastro gravam uma cópia feita na hora do envio. Senha: o cadastro guarda o hash, e o login confere com ele; um cadastro de antes do hash entra com a senha antiga e passa a guardar o hash. Histórico: "Sair" não o apaga, e ele volta no próximo login, com a numeração continuando; com o `localStorage` cheio, sair, pedir e entrar continuam; o formato de sessão da versão antiga é migrado com o histórico |
| `ProfileView.test.js` | 7 | Perfil, com o ViaCEP simulado: avisa na ajuda do CEP que ele é consultado no ViaCEP; não salva com o e-mail vazio nem com o CEP incompleto, que também apaga o endereço da tela; com a consulta do CEP em andamento, espera a resposta e salva o endereço dela uma vez só, mesmo com dois envios; com CEP único da cidade (sem rua), a rua fica editável e é obrigatória; a rua digitada para esse CEP continua editável quando o perfil abre; "Excluir conta" com confirmação. O `BaseDialog` vira um stub, porque o jsdom não implementa o `<dialog>` modal |
| `RegisterView.test.js` | 4 | Cadastro: a ajuda do CEP avisa que ele é consultado no ViaCEP antes de qualquer consulta; aviso de conta salva, ligado ao botão por `aria-describedby`; com o CEP trocado antes da resposta da consulta, a conta é criada uma vez só, mesmo com dois envios, e leva o endereço do CEP novo; com CEP único da cidade (sem rua), pede a rua, cujo erro some durante a digitação, e só cria a conta com ela |
| `useCepLookup.test.js` | 5 | Consulta de CEP, com o ViaCEP simulado: a resposta não vai para o console; o endereço do CEP anterior não vale durante a consulta do novo; a consulta em andamento é reaproveitada; a resposta atrasada de um CEP antigo é descartada sem encerrar o carregamento do atual; um CEP incompleto descarta a consulta em andamento; com o mesmo CEP digitado de novo, a resposta da primeira consulta não encerra a segunda |
| `router.test.js` | 6 | Guard do cadastro: com sessão aberta, `/register` leva ao `?redirect=` interno ou a `/profile`; sem sessão, abre. Sem sessão, `/profile` leva ao login com o `redirect` de volta. O foco por rota age na troca de página, e não quando só a query muda. Painel: o `meta.requiresAdmin` fica no registro pai `/admin`, e cada rota do painel (inclusive Meu perfil e Configurações), sem sessão de admin, leva ao login do painel. A antiga página de testes `/playground` não existe e cai no 404 |
| `lockfile-audit.test.js` | 6 | Script `.claude/lockfile-audit.py`, com a consulta ao npm trocada por uma resposta fixa: faixas com espaço depois do operador, pré-lançamentos (incluídos nas faixas, como no `npm audit`), curingas e versões parciais; uma alternativa em formato desconhecido (`^`, `~`, hífen) só vira erro quando a resposta depende dela; advisory que não casa com nenhuma versão do lockfile entra como "versão não identificada", e o script sai com 1. Roda no ambiente `node` e chama o Python do sistema (`py -3`, `python3` ou `python`); sem Python 3, os testes são pulados |
| `repo-config.test.js` | 4 | Proteções do CI e do repositório, lidas dos próprios arquivos: actions do `deploy.yml` fixadas pelo SHA, com a versão em comentário; escrita (`pages: write` e `id-token: write`) só no job `deploy`, e o `build` sem guardar o token do checkout; `packageManager` com hash sha512 e nenhum `corepack yarn@x.y.z` no workflow; install com `--immutable --check-cache`; `.gitignore` ignorando `.env`, `.env.[modo]`, o `.yarn/install-state.gz` e a pasta `.vscode/`, sem casar com nenhum arquivo rastreado. O `.gitignore` é avaliado num repositório temporário que só tem ele, sem o `.git/info/exclude` nem o gitignore global da máquina. Roda no ambiente `node`; sem git, o teste do `.gitignore` é pulado |
| `build-config.test.js` | 5 | Content-Security-Policy do `index.html`: a `<meta>` fica no `<head>`, antes de qualquer script ou estilo; scripts só da própria origem, conexões só com a própria origem e o ViaCEP, `object-src 'none'`, `base-uri` e `form-action` restritos, sem `frame-ancestors` (ignorada em `<meta>`). Build: um `build()` do Vite com o `vite.config.js` do projeto, sobre uma entrada virtual, descarta `console.log` (inclusive dentro de uma arrow function com chaves) e mantém `console.warn` e `console.error`; as credenciais do admin de teste do `yarn dev` não vão para o build de produção, e um build fora da produção, como controle, as tem. O Vite decide o `import.meta.env.DEV` pelo `NODE_ENV`, que o teste troca com `vi.stubEnv`. Roda no ambiente `node` |
| `password.test.js` | 7 | Hash de senha (`src/utils/password.js`): PBKDF2-SHA256 com 600 mil iterações e sal diferente a cada vez; confere a senha certa e recusa a errada; senha em texto de antes do hash entra e pede a troca; hash editado, vazio ou que não é texto é recusado sem lançar; hash com menos iterações entra e pede a troca; hash com iterações demais é recusado sem ser calculado; sem WebCrypto (HTTP fora de localhost), avisa em vez de dizer que a senha está errada |
| `masks.test.js` | 17 | Máscaras de celular e CEP progressivas, sem sumir no meio da digitação; o campo com máscara não guarda um dígito a mais do que mostra e recusa letras no teclado, deixando passar teclas de controle |
| `validators.test.js` | 12 | E-mail aceita `+`, `%` e domínios de topo longos, e recusa formatos quebrados; data de nascimento aceita datas que existem de 1900 até hoje (inclusive 29/02 de ano bissexto) e recusa data no futuro, que não existe, antes de 1900 ou em outro formato, sem depender do fuso |
| `adminPanel.test.js` | 12 | Painel com o plugin de persistência ligado. Cardápio: o que o painel cria, edita e exclui volta ao recarregar; produto salvo fora do formato sai (preço inválido, imagem de outro tipo, `javascript:`, id repetido, outra categoria); com o cardápio publicado mudado, as alterações dão lugar a ele sem reaproveitar ids; restaurar volta ao publicado; o espaço das imagens enviadas tem limite. Pedidos: o status volta ao recarregar, e o que estiver fora do formato sai. Telas: a busca (`?q=`) acha produtos de qualquer categoria sem diferença de acento e é limpa por "Limpar busca"; em Pedidos, acha pelo cliente, pelo número e pelo item, e "Detalhes" mostra o pedido; a busca da barra leva a Produtos no Enter, não deixa texto ao trocar de página, e o menu de perfil abre Meu perfil e Configurações; Configurações restaura o cardápio e os pedidos depois da confirmação; Meu perfil mostra o admin e sai do painel |

### Cobertura (outubro de 2026)

No total, a cobertura é de 10% das linhas. Os testes se concentram nos arquivos abaixo:

| Arquivo | Linhas cobertas |
|---|---|
| `components/BannerComponent.vue` | 100% |
| `stores/toast.js` | 100% |
| `stores/cart.js` | 91% |
| `components/ui/AppToast.vue` | 87% |
| `stores/userStore.js` | 81% |
| `components/ui/BaseButton.vue` | 80% |
| `composables/useResponsiveImage.js` | 77% |
| `services/authServices.js` | 63% |

Os números mudaram com o Vitest 4, e não com os testes, que continuam os mesmos. O provider V8 agora remapeia a cobertura pela AST do código, um cálculo mais preciso, e deixa de contar linhas sem código executável.

As telas de cadastro, de perfil e de pagamento, o login do painel, as guards do cadastro, do perfil, do painel e da confirmação, a conferência do estado salvo, o hash de senha, as máscaras e as validações, e as telas do painel (produtos, pedidos, busca, detalhes, Meu perfil e Configurações, com o formulário de produto e os contadores da barra) ganharam testes em novembro de 2026, depois desta medição. As outras telas da loja, o utilitário `formatters` e o modal de personalização ainda não têm testes.

## Verificação no navegador

Os scripts de [`.claude/e2e/`](./.claude/e2e/README.md) abrem o build num Chromium real. O README da pasta explica como preparar e rodar.

| Script | Verifica |
|---|---|
| `axe-scan.mjs` | Regras WCAG 2.2 AA (axe-core), rolagem horizontal, alvos de toque, fontes, título e violações da Content-Security-Policy em 22 telas e estados, em 1440 e 390 px, com e sem movimento reduzido. O axe entra por `page.evaluate`, porque a CSP bloqueia `<script>` inline |
| `flow.mjs` | Pedido completo: cadastro com CEP, personalização, carrinho, login (com senha errada e certa), pagamento e confirmação. Também sair e entrar de novo, "Desfazer" no carrinho, guards das rotas e volta ao topo ao trocar de página |
| `keyboard.mjs` | Navegação só por teclado: skip link, anel de foco, foco preso no modal, setas no pagamento e menus |
| `micro-final.mjs` | Flip do botão, contador do carrinho, inclinação do card e montador do burger, com e sem movimento reduzido |
| `check-admin.mjs` | Login do painel, sidebar e gaveta, menu de perfil e telas do admin |
| `lacunas.mjs` | Correções da revisão contra o SPEC: movimento reduzido, modal, spinner, guards (inclusive o `redirect` de volta ao perfil) e admin |

Na entrega do redesign, na atualização de dependências (ambas em outubro de 2026), nas correções da conta e do perfil, na conferência do estado salvo e nas correções do painel e das pendências da revisão de segurança (novembro de 2026), todos passaram, e o axe não encontrou violações.

### Direções visuais

As Homes de `#/direcoes` existem só no `yarn dev` e foram verificadas contra o servidor de desenvolvimento (porta 5173), com Playwright e axe-core numa pasta fora do projeto, por scripts adaptados do `axe-scan.mjs` e do `tokens-contrast.mjs` (não versionados):

- **axe-core (WCAG 2.2 AA):** o índice e as três Homes, em 1440 e 390 px, com e sem movimento reduzido, e o modal Personalizar aberto em cada Home. Também mede rolagem horizontal e alvos de toque de 44 px.
- **Layout:** em 1440, 1024 e 390 px, captura de página inteira e checagem automática de rolagem horizontal, de controle coberto por outro e de texto cortado.
- **Fluxo do "Adicionar":** modal, confirmação, retorno visual, contador do carrinho, anúncio para leitor de tela e foco de volta no botão (pelo teclado).
- **Contraste:** os pares de `src/direcoes/contraste.js`, medidos também na ficha de cada estilo, no navegador.
- **Build:** a busca por `direcoes`, `data-direcao`, "Direções visuais" e pelos nomes das fontes novas no `dist/` tem de dar zero resultados.

## Escrevendo novos testes

- **Onde ficam:** em `src/__tests__/` com o sufixo `.test.js`. É nessa pasta que o ESLint aplica as regras do plugin do Vitest.
- **Componentes:** monte com o `mount` do Vue Test Utils.
- **Stores:**
  - crie uma Pinia nova a cada teste, com `setActivePinia(createPinia())` no `beforeEach`;
  - limpe o `localStorage` antes, porque as stores persistidas leem dali;
  - para testar a persistência, instale a Pinia num app, porque sem ele o plugin não roda: `const pinia = createPinia().use(piniaPersist); createApp({}).use(pinia); setActivePinia(pinia)`, como em `auth.test.js`.
- **Tempo:** use `vi.useFakeTimers()` e avance com `vi.advanceTimersByTime()`, como em `AppToast.test.js` e `auth.test.js`.
- **Antes de abrir um pull request:** rode `yarn lint`, `yarn test:unit --run` e `yarn build`.

## Próximos passos

- Testar os utilitários (`formatters`, `validators`, `masks`), as demais guards do roteador e o modal de personalização.
- Rodar lint, testes e build também nos pull requests; hoje só existe o workflow de deploy.
- Levar a verificação no navegador para o CI.
