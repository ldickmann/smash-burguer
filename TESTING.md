# Testes

O projeto tem duas camadas de verificação:

- **Testes unitários** em `src/__tests__/`, com Vitest, Vue Test Utils e jsdom. São 65 testes em 11 arquivos.
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
| `auth.test.js` | 14 | Login com credenciais válidas e inválidas; sair e entrar de novo; migração do cadastro antigo para a chave nova; numeração dos pedidos a partir de 1001. Dados da conta: a sessão guarda só os campos do perfil, sem a senha, e a sessão gravada no formato antigo é regravada ao carregar; sair esvazia o carrinho; entrar com outra conta zera o histórico; excluir a conta apaga cadastro, sessão e carrinho; uma sessão antiga não altera nem apaga o cadastro de outra pessoa; perfil e cadastro gravam uma cópia feita na hora do envio |
| `ProfileView.test.js` | 4 | Perfil: não salva com o e-mail vazio nem com o CEP incompleto, que também apaga o endereço da tela; com a consulta do CEP em andamento, espera a resposta e salva o endereço dela uma vez só, mesmo com dois envios; "Excluir conta" com confirmação. O `BaseDialog` vira um stub, porque o jsdom não implementa o `<dialog>` modal |
| `RegisterView.test.js` | 2 | Cadastro: aviso de conta salva, ligado ao botão por `aria-describedby`; com o CEP trocado antes da resposta da consulta, a conta é criada uma vez só, mesmo com dois envios, e leva o endereço do CEP novo |
| `useCepLookup.test.js` | 4 | Consulta de CEP, com o ViaCEP simulado: o endereço do CEP anterior não vale durante a consulta do novo; a consulta em andamento é reaproveitada; a resposta atrasada de um CEP antigo é descartada sem encerrar o carregamento do atual; um CEP incompleto descarta a consulta em andamento; com o mesmo CEP digitado de novo, a resposta da primeira consulta não encerra a segunda |
| `router.test.js` | 2 | Guard do cadastro: com sessão aberta, `/register` leva ao `?redirect=` interno ou a `/profile`; sem sessão, abre |
| `lockfile-audit.test.js` | 6 | Script `.claude/lockfile-audit.py`, com a consulta ao npm trocada por uma resposta fixa: faixas com espaço depois do operador, pré-lançamentos (incluídos nas faixas, como no `npm audit`), curingas e versões parciais; uma alternativa em formato desconhecido (`^`, `~`, hífen) só vira erro quando a resposta depende dela; advisory que não casa com nenhuma versão do lockfile entra como "versão não identificada", e o script sai com 1. Roda no ambiente `node` e chama o Python do sistema (`py -3`, `python3` ou `python`); sem Python 3, os testes são pulados |
| `repo-config.test.js` | 4 | Proteções do CI e do repositório, lidas dos próprios arquivos: actions do `deploy.yml` fixadas pelo SHA, com a versão em comentário; escrita (`pages: write` e `id-token: write`) só no job `deploy`, e o `build` sem guardar o token do checkout; `packageManager` com hash sha512 e nenhum `corepack yarn@x.y.z` no workflow; install com `--immutable --check-cache`; `.gitignore` ignorando `.env`, `.env.[modo]`, o `.yarn/install-state.gz` e a pasta `.vscode/`, sem casar com nenhum arquivo rastreado. O `.gitignore` é avaliado num repositório temporário que só tem ele, sem o `.git/info/exclude` nem o gitignore global da máquina. Roda no ambiente `node`; sem git, o teste do `.gitignore` é pulado |

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

As telas de cadastro e de perfil e a guard do cadastro ganharam testes em novembro de 2026, depois desta medição. As outras telas, as demais guards do roteador, os utilitários (`formatters`, `validators`, `masks`) e o modal de personalização ainda não têm testes.

## Verificação no navegador

Os scripts de [`.claude/e2e/`](./.claude/e2e/README.md) abrem o build num Chromium real. O README da pasta explica como preparar e rodar.

| Script | Verifica |
|---|---|
| `axe-scan.mjs` | Regras WCAG 2.2 AA (axe-core), rolagem horizontal, alvos de toque, fontes e título em 22 telas e estados, em 1440 e 390 px, com e sem movimento reduzido |
| `flow.mjs` | Pedido completo: cadastro com CEP, personalização, carrinho, login (com senha errada e certa), pagamento e confirmação. Também sair e entrar de novo, "Desfazer" no carrinho, guards das rotas e volta ao topo ao trocar de página |
| `keyboard.mjs` | Navegação só por teclado: skip link, anel de foco, foco preso no modal, setas no pagamento e menus |
| `micro-final.mjs` | Flip do botão, contador do carrinho, inclinação do card e montador do burger, com e sem movimento reduzido |
| `check-admin.mjs` | Login do painel, sidebar e gaveta, menu de perfil e telas do admin |

Na entrega do redesign, na atualização de dependências (ambas em outubro de 2026) e nas correções da conta e do perfil (novembro de 2026), todos passaram, e o axe não encontrou violações.

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
