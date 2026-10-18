# Testes

O projeto tem duas camadas de verificação:

- **Testes unitários** em `src/__tests__/`, com Vitest, Vue Test Utils e jsdom. São 35 testes em 5 arquivos.
- **Verificação no navegador**, com os scripts Playwright + axe-core de `.claude/e2e/`: acessibilidade, fluxo de pedido, teclado e micro-interações. Eles rodam à mão contra o build e ainda não fazem parte do CI.

## Como rodar os testes unitários

```bash
yarn test:unit          # modo observação: roda de novo a cada alteração
yarn test:unit --run    # roda uma vez, como antes de abrir um pull request
yarn test:coverage      # roda uma vez e gera a cobertura em coverage/
```

O relatório HTML de cobertura fica em `coverage/index.html`, pasta ignorada pelo Git.

O `@vitest/coverage-v8` (3.0.5) está numa versão diferente do `vitest` (3.2.6). Por isso o comando de cobertura avisa "Running mixed versions is not supported", mas gera o relatório normalmente.

## O que está coberto

| Arquivo | Testes | O que verifica |
|---|---|---|
| `BaseButton.test.js` | 13 | Variantes; `type="submit"`; `loading` com `aria-busy`, spinner e clique bloqueado; `disabled` real; `aria-pressed`; botão só de ícone com `aria-label`; versão link (`to`); repasse de `class` e `data-*` |
| `AppToast.test.js` | 7 | `role="status"` ou `role="alert"` conforme a variante; fecha sozinho depois do tempo; pausa no hover e no foco; ação "Desfazer"; botão "Fechar aviso"; no máximo 3 avisos |
| `BannerComponent.test.js` | 5 | Título como único `h1`; variante `hero` com `<picture>`, carregamento imediato e `fetchpriority="high"`; variante `page` com imagem `lazy`; slot de ações; nenhum estilo inline na imagem |
| `cart.test.js` | 4 | Store do carrinho: total de itens e subtotal; campos padrão do item; quantidade nunca abaixo de 1; remover e "Desfazer" devolvendo o item à mesma posição |
| `auth.test.js` | 6 | Login com credenciais válidas e inválidas; sair e entrar de novo; migração do cadastro antigo para a chave nova; numeração dos pedidos a partir de 1001 |

### Cobertura (outubro de 2026)

No total, a cobertura é de 8% das linhas. Os testes se concentram nos arquivos abaixo:

| Arquivo | Linhas cobertas |
|---|---|
| `components/BannerComponent.vue` | 98% |
| `stores/toast.js` | 98% |
| `components/ui/AppToast.vue` | 98% |
| `composables/useResponsiveImage.js` | 97% |
| `stores/cart.js` | 93% |
| `stores/userStore.js` | 88% |
| `components/ui/BaseButton.vue` | 86% |
| `services/authServices.js` | 66% |

As telas, o roteador, os utilitários (`formatters`, `validators`, `masks`) e o modal de personalização ainda não têm testes.

## Verificação no navegador

Os scripts de [`.claude/e2e/`](./.claude/e2e/README.md) abrem o build num Chromium real. O README da pasta explica como preparar e rodar.

| Script | Verifica |
|---|---|
| `axe-scan.mjs` | Regras WCAG 2.2 AA (axe-core), rolagem horizontal, alvos de toque, fontes e título em 20 telas e estados, em 1440 e 390 px, com e sem movimento reduzido |
| `flow.mjs` | Pedido completo: cadastro com CEP, personalização, carrinho, login (com senha errada e certa), pagamento e confirmação. Também sair e entrar de novo, "Desfazer" no carrinho, guards das rotas e volta ao topo ao trocar de página |
| `keyboard.mjs` | Navegação só por teclado: skip link, anel de foco, foco preso no modal, setas no pagamento e menus |
| `micro-final.mjs` | Flip do botão, contador do carrinho, inclinação do card e montador do burger, com e sem movimento reduzido |
| `check-admin.mjs` | Login do painel, sidebar e gaveta, menu de perfil e telas do admin |

Na entrega do redesign (outubro de 2026), todos passaram, e o axe não encontrou violações.

## Escrevendo novos testes

- **Onde ficam:** em `src/__tests__/` com o sufixo `.test.js`. É nessa pasta que o ESLint aplica as regras do plugin do Vitest.
- **Componentes:** monte com o `mount` do Vue Test Utils.
- **Stores:**
  - crie uma Pinia nova a cada teste, com `setActivePinia(createPinia())` no `beforeEach`;
  - limpe o `localStorage` antes, porque as stores persistidas leem dali.
- **Tempo:** use `vi.useFakeTimers()` e avance com `vi.advanceTimersByTime()`, como em `AppToast.test.js` e `auth.test.js`.
- **Antes de abrir um pull request:** rode `yarn lint`, `yarn test:unit --run` e `yarn build`.

## Próximos passos

- Testar os utilitários (`formatters`, `validators`, `masks`), as guards do roteador e o modal de personalização.
- Rodar lint, testes e build também nos pull requests; hoje só existe o workflow de deploy.
- Levar a verificação no navegador para o CI.
