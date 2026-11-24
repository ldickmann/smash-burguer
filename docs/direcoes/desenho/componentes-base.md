# Desenho dos componentes base: Material 3 Expressive (etapa 10)

24/11/2026. Desenho dos componentes base que ainda tinham a pele M3 só pelos apelidos: o aviso temporário `AppToast` (com o `src/stores/toast.js`), o diálogo `BaseDialog` (que vira sheet abaixo de `md`), o estado vazio `EmptyState`, o seletor de quantidade `QuantityStepper` e as variantes do `BaseButton` que a etapa 3 deixou com a forma da Brasa (`.btn--legado`): `danger`, `iconOnly`, `loading`, o desabilitado e o `pressed`. A loja e o painel já estão no M3 (etapas 1 a 9).

Fontes: `docs/direcoes/SPEC-material.md` (SPEC-M); `SPEC.md` (a Brasa, para o fluxo e os textos); os desenhos `docs/direcoes/desenho/admin.md` (modelo deste), `conta.md`, `carrinho-pagamento.md`, `cardapio.md` e `material.md`; `docs/direcoes/pesquisa/material.md`, com a seção "Etapa 10: componentes base" ([216] a [275]) e as das etapas 6, 8 e 9; `docs/direcoes/PESQUISA.md` ([1] a [36]); o código de hoje (os cinco componentes, o `toast.js`, as parciais e as telas que os usam) e as capturas `capturas\e08\` e `capturas\e09\` da pasta de estado do plano. Nenhuma pesquisa nova: onde falta fonte, está escrito "não encontrei". Pares medidos com `lerTokens`, `medirPar`, `compor` e `razao` de `src/utils/contraste.js`, sobre o `base/_tokens.scss`, num script só de leitura, em duas casas, para baixo, como o `contraste.test.js`.

**Resumo:**

- **Aviso (`AppToast`):** o snackbar do M3 [220] [224]: `inverse-surface` com o texto em `inverse-on-surface` (11,54), canto 4 (`forma-xs`), `elevacao-3`, body-m, sem borda colorida e sem ícone de sucesso; só o erro leva o `circle-exclamation`, na cor do texto. A ação ("Desfazer") vira text button em `primary-container` (10,13): o `inverse-primary` do M3 não existe nos tokens, e criá-lo é pergunta ao usuário (§12). O anel dentro do aviso passa a `inverse-on-surface`, por dentro (o `secondary` mede 2,02 ali).
- **Aviso, posição e tempo:** no pé em todas as larguras, na loja e no painel, centrado, acima da toolbar enquanto ela flutua (abaixo de `lg`, e não só de `md`) [223] [224]. O `AppToast` **absorve** as quatro regras `:global` das páginas numa regra só, que conta os avisos (até 3) [76]. Com ação ou de erro, o aviso **não some sozinho**: fica até a pessoa agir, fechar ou trocar de rota ([217], [219], [227]). Duas regiões vivas fixas (`status` e `alert`) passam a existir antes da mensagem [152] [153]. Um aviso que nasce com um diálogo aberto espera o diálogo fechar.
- **Diálogo (`BaseDialog`):** `surface-container-high`, canto 28, `elevacao-3` a partir de `md` [229] [231] [232]; abaixo de `md`, sheet em `surface-container-low`, cantos de 28 só em cima, `elevacao-1`, **na altura do conteúdo** (com teto) e sem alça [237] [241]. Título em headline-s 400 [229]; divisores só quando o corpo rola [234]. As confirmações destrutivas viram `alertdialog` com a descrição ligada [235]. O erro da exclusão da conta passa a aparecer dentro do diálogo.
- **Estado vazio:** alinhado ao início, como o resto do sistema; ícone de 32 px em `on-surface-variant`, título title-l 500 em `<p>`, texto body-m; sem círculo nem ilustração. Depois de um filtro, ele é anunciado numa região `role="status"` que já existe [151] [153].
- **Seletor de quantidade:** dois botões de ícone tonais redondos de 44 px [255] [249], o número em title-m 500 tabular, troca direta. **No limite, `aria-disabled` no lugar do `disabled`**: o botão focado que fica `disabled` leva o foco ao viewport [273] [270], e o exemplo de quantidade da APG usa `aria-disabled` [275]. A §6 do SPEC-M muda.
- **`BaseButton`:** `danger` vira text button em `error` que escurece para `on-error-container` no hover e no pressionado (no card `high`, o `error` pressionado daria 4,32); `iconOnly` vira o botão de ícone do Expressive (padrão, tonal ou filled pela `variant`); `loading` mantém o arco, as cores do repouso e anuncia o rótulo novo numa região viva (sai o `aria-busy`); o desabilitado usa `on-surface` a 10% e a 38% [264] [265] [253]; **a prop `pressed` sai** (sem uso desde a etapa 6). O `.btn--legado` sai inteiro.
- **Contagem:** nenhum componente novo; mudam 5 componentes, o `toast.js`, o `useAnnouncer.js` e 7 telas. **4 tokens novos** (`--m3-desabilitado-conteudo`, `--m3-desabilitado-container`, `--m3-camada-inversa-hover`, `--m3-camada-inversa-pressionada`), **10 pares novos** medidos, nenhuma dependência, nenhum ícone novo, **nenhum texto novo**.
- **Fica para a etapa 11:** os apelidos que perdem o último uso (`--color-surface-4`, `--color-danger-soft`, `--color-overlay`, `--elev-3`, `--radius-lg`, `--color-info`, `--color-danger`) e os pares de `PARES_COMUNS` do modal e do aviso. Pergunta ao usuário: o papel `inverse-primary` (§12).

---

## 1. Tese

**A tese do SPEC-M vale como está:** a ousadia fica no hero da Home; o resto é quieto (SPEC-M §0, "Tese"). Nos componentes base:

- **São a gramática das telas, e não momentos.** O mesmo aviso, o mesmo diálogo e o mesmo botão de ícone em todo lugar, da loja ao painel. Nenhum deles tem entrada decorativa, cor de estado ou forma própria.
- **A única superfície escura do sistema claro é o aviso.** O `inverse-surface` faz o aviso se ler como algo que passou por cima da página, e não como mais um card. É o traço que se reconhece destes componentes, e ele vem do papel do M3 [220] [224], sem cor nova.
- **O que flutua tem elevação; o resto é tonal.** Aviso, diálogo e sheet ficam acima da página (SPEC-M §2.6); botões, estado vazio e seletor ficam na superfície de quem os usa.
- **Sem:** borda colorida no aviso, ícone de sucesso, ilustração ou círculo no vazio, alça falsa no sheet, indicador que muda de forma, toggle sem uso, aperto por `translateY`.

### O que muda da Brasa

| Na Brasa (capturas `e08` e `e09`) | No M3 | Por quê |
|---|---|---|
| Aviso em `surface-container-high`, canto 12, borda esquerda de 3 px e ícone na cor do estado | `inverse-surface`, canto 4, `elevacao-3`, sem borda; ícone só no erro, na cor do texto | Contêiner, forma e elevação do snackbar ([220], [221], [198], [224]); a anatomia não tem ícone [219] [224]; a borda colorida é padrão genérico (pacote, item 11) |
| "Desfazer" tonal | Text button em `primary-container` | A ação do snackbar é um `TextButton` [219] em `inverse-primary` [220], papel que o projeto não tem (§8) |
| A partir de `md`, aviso no topo à direita na loja; desce 8 px de cima também no pé | No pé em todas as larguras, centrado; entra por escala e opacidade | O snackbar fica no pé, acima do FAB ou da barra [223] [224]; não encontrei snackbar no topo; a entrada do Compose é escala de 0,8 a 1 com opacidade [218] |
| 4 s para todos (5 s no "Desfazer") | 4 s sem ação; com ação ou de erro, até a pessoa agir, fechar ou sair | O snackbar com ação não expira [217] [219]; a 2.2.1 só dispensa o aviso cuja informação está em outro lugar [227] |
| Diálogo `surface-container`, título 700, divisores fixos; sheet da altura da tela até com duas linhas | `surface-container-high` (≥ `md`) e sheet `surface-container-low` (< `md`) na altura do conteúdo; título headline-s 400; divisores só com rolagem | [229], [231], [232]; [237], [241]; [234] |
| Estado vazio centrado, título 700 | Alinhado ao início, título title-l 500, texto body-m | SPEC-M §4.2; o sistema alinha ao início (admin, §2) |
| Stepper: dois quadrados contornados de canto 8, o número em 700 rolando na vertical; `disabled` no limite | Dois tonais redondos de 44 px, título title-m 500 tabular, troca direta; `aria-disabled` no limite | [255], [249]; o odômetro saiu do sistema (SPEC-M §7.8); [273], [275] |
| `danger`, `iconOnly` e `pressed` com canto 8, borda de 1 px e aperto por `translateY` | Text button `error`; botão de ícone redondo com troca de forma; sem `pressed` | [253], [255], [249]; SPEC-M §7.2 |
| Desabilitado em `surface-container-highest` com `#a2a79e` | Contêiner `on-surface` a 10% e conteúdo `on-surface` a 38% | [264], [265], [253], [268] |
| Carregando com `aria-busy` | O rótulo novo anunciado numa região viva; sem `aria-busy` | [151]; [207], [263] |

---

## 2. Processo: plano, revisão contra o pacote e desenho final

### Sistema (dentro da identidade aprovada; nenhuma cor nova)

- **Cores, por papel:**
  - aviso (`inverse-surface`) #2d322c, texto e ícones (`inverse-on-surface`) #eef2e9, ação (`primary-container`) #bbf0b6;
  - diálogo (`surface-container-high`) #e6e9e0; sheet (`surface-container-low`) #f1f5ec; fundo (`scrim`) preto a 32%;
  - botão de ícone padrão (`on-surface-variant`) #424940; tonal (`secondary-container`) #d5e8cf com `on-secondary-container` #3b4b39;
  - perigo (`error`) #ba1a1a, que escurece para `on-error-container` #93000a no hover e no pressionado;
  - desabilitado: `on-surface` #181d17 a 10% (contêiner) e a 38% (conteúdo).
- **Tipo:** Roboto, uma família. Aviso em body-m; título do diálogo em headline-s 400; título do vazio em title-l 500; texto do vazio em body-m; número do seletor em title-m 500 tabular; rótulos dos botões em label-l 500 (title-m no `lg`).
- **Layout:** o aviso no pé, centrado na área de conteúdo; o diálogo centrado a partir de `md` e preso ao pé abaixo dele; o vazio alinhado ao início, na coluna de quem o usa.
- **Princípio:** nenhum destes componentes chama atenção sozinho. O único contraste forte é o do aviso escuro, porque ele interrompe sem bloquear.

### Plano (primeira passada)

1. Aviso em `inverse-surface` com o ícone de cada variante colorido (`sucesso`, `info`, `error`) e a ação tonal, canto 12, no topo à direita a partir de `md`, 4 s para todos, o mais novo em cima, entrando de cima.
2. A ação do aviso num `--m3-inverse-primary` escrito à mão, um verde claro tirado do `primary`.
3. Diálogo em `surface-container`, título title-l 700, divisores fixos, sheet de altura inteira com uma alça decorativa de 32 × 4.
4. Estado vazio com o ícone num círculo `tertiary-container` de 64 px, centrado, título headline-s, ação filled M em todas as telas.
5. Seletor como button group conectado, com o número no segmento do meio.
6. `danger` como filled `error` nos diálogos e text button `error` nas telas.
7. Todos os botões de ícone tonais.
8. `loading` com o loading indicator do Expressive (formas que se transformam) no lugar do arco.
9. Desabilitado com uma cor composta por fundo (`--m3-desabilitado-sobre-low`, `-sobre-high`…).
10. `pressed` desenhado como o toggle filled do M3.
11. Limite do seletor com `disabled` real, como o `SPEC.md`.
12. O botão de imagem do `ModalProducts` como `BaseButton`.

### Revisão contra o pacote (o que saiu genérico, repetido, inventado, infiel ou inviável, e o que entrou)

- **Ícone colorido por variante e canto 12: saíram (genérico e infiel).** O toast com ícone e borda coloridos é padrão genérico (pacote, item 11); a anatomia do snackbar é contêiner, texto, ação e fechar [219] [224], com canto 4 [220] [221]. Entrou o aviso sem ícone de sucesso; o erro leva o `circle-exclamation` na cor do texto, como pista de forma, e não de cor [99] (5.1).
- **Topo à direita: trocado (inventado e acessibilidade).** Não encontrei snackbar no topo [223] [224]; no topo, o aviso cobria o "Novo produto" focado em 1024 (admin, §4.6). Entrou o pé em todas as larguras, acima da toolbar enquanto ela flutua (4.5).
- **4 s para todos: trocado (acessibilidade).** O "Desfazer" só existe no aviso; a 2.2.1 pede desligar o limite quando a informação não está em outro lugar [227], e o snackbar com ação não expira [217] [219]. Entrou a regra por tipo (4.3).
- **O mais novo em cima, entrando de cima: trocado (inviável no pé).** Ancorado no pé, o novo fica embaixo, perto da borda; a entrada passa à escala de 0,8 com opacidade [218] (4.4).
- **`--m3-inverse-primary` à mão: saiu (inventado).** Nenhuma cor sai de outro lugar que não a semente (SPEC-M §0). Entrou o `primary-container`, medido (10,13), e a pergunta ao usuário (§12).
- **Diálogo em `surface-container`, título 700, divisores fixos: trocados (infiel à pesquisa).** As três fontes dão `surface-container-high` ao diálogo [229] [231] [232] e headline-s ao título [229]; o divisor aparece só com rolagem [234]. Os pares das telas foram medidos de novo (§8).
- **Sheet de altura inteira com alça: trocado (pendência da etapa 8 e genérico).** Duas linhas não pedem a tela toda (captura `admin-excluir-390`); a alça sugere um gesto que o projeto não tem, e ela é opcional [241]. Entrou o sheet na altura do conteúdo, com teto, sem alça, com o "Fechar" visível [199].
- **Círculo de 64 px e título headline-s no vazio: saíram (genérico e infiel).** O círculo é ilustração decorativa (pacote, item 11), e no sistema o círculo separa informação de ação (SPEC-M §2.2); o SPEC-M recomenda title-l 500. Entrou o ícone solto de 32 px.
- **Vazio centrado com filled M em todo lugar: trocado (repetição e hierarquia).** O sistema alinha ao início; um filled M no perfil competiria com as ações da tela. Entrou o filled M só no carrinho vazio, onde ele é a única ação da página (5.3).
- **Button group no seletor: saiu (infiel).** O grupo padrão comprime os vizinhos do pressionado [54] e arrisca o alvo [78] (SPEC-M §4.2). Entraram dois botões de ícone separados, como o contador do Compose [245].
- **Filled `error` nos diálogos: saiu (inventado).** Não encontrei botão destrutivo no M3 [267] [231]; o exemplo de exclusão do material-web usa text buttons sem cor própria [232]. Entrou uma forma só, o text button `error`, que escurece no hover e no pressionado (medido, 5.5).
- **Todos os ícones tonais: trocado.** O padrão, sem contêiner, é o de menor ênfase [257] e o das ações de barra [196]; o tonal fica no seletor, ao lado de um número.
- **Loading indicator do Expressive: saiu (inviável).** A troca de forma por morph não cabe em `transform` e `opacity` (SPEC-M §0), as APIs são experimentais [58], e não encontrei orientação de indicador dentro de botão além do circular centrado [260]. Ficou o arco de hoje.
- **Cor composta por fundo: trocada.** Seriam quatro tokens para um papel; o M3 desenha o desabilitado como "on-x" com alfa [268], e o `rgba` se compõe com qualquer fundo, como as camadas `--m3-camada-*`. Entraram dois tokens (5.8).
- **`pressed` como toggle: saiu (inventado).** Não há uso desde a etapa 6 (desenho do Cardápio, L628); desenhar um estado sem caso real seria função que o projeto não tem (pacote, item 3). A prop sai, com o teste dela (5.9).
- **`disabled` real no limite: trocado (acessibilidade).** O botão focado que fica `disabled` leva o foco ao viewport [273], o que a APG chama de foco perdido [270]. Entrou o `aria-disabled` [275] (5.4).
- **Botão de imagem como `BaseButton`: saiu (inviável sem lógica nova).** O `input` de arquivo precisa continuar o controle focável (o `required`, o `aria-invalid` e o `aria-describedby` dele); um `button` pediria código para abrir o seletor e para levar esses estados (5.10).

### Desenho final

As seções 3 a 12 abaixo. As decisões do item 6 do pacote estão em 5.1 e 4.1 a 4.5 (a, b, c, d), 5.2 e 4.1 (e, f, g), 5.3 (h), 5.4 (i), 5.5 (j), 5.6 (k), 5.7 (l), 5.8 (m), 5.9 (n, o), 5.10 (p), 4.6 (q) e 4.5 (r), e numa linha cada na seção 12.

---

## 3. Composição

As medidas abaixo são estimativas pelo CSS proposto e pelas capturas de hoje; a sessão C mede. Legenda dos wireframes: `[✕]` é o botão de ícone padrão de 44 px; `(−)` e `(+)` são os tonais redondos de 44; `( Rótulo )` é botão em pílula (filled ou tonal); `Rótulo` sem parênteses ao lado de um ícone é text button; `↺` é o `rotate-left`, `🗑` o `trash-can` e `⚠` o `circle-exclamation`.

### 3.1 Aviso na loja em 390 (um aviso com "Desfazer"; o de erro; três empilhados)

```
Um aviso com ação                           O de erro (perfil, "Salvar alterações")
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│ … carrinho …                     │        │ … perfil …                       │
│                                  │        │                                  │
│┌ inverse-surface, canto 4 ──────┐│        │┌────────────────────────────────┐│
││ Cheese Bacon     ↺ Desfazer [✕]││ 72 px  ││ ⚠ Não foi possível     [✕]    ││ 72 px
││ removido.        primary-cont.  ││ 2 lin. ││   salvar. Tente de novo.      ││ role="alert"
│└────────────────────────────────┘│        │└────────────────────────────────┘│
│  x 16 a 374; y ≈ 676 a 748  ↕ 16 │        │                                  │
│          ╭ Início Cardápio Perfil╮(🛒)    │          ╭ Início Cardápio Perfil╮(🛒)
└──────────────────────────────────┘        └──────────────────────────────────┘
  pad. 16 no início, 8 no fim, 4 em cima      ícone de 20 px em inverse-on-surface
  e embaixo; texto body-m inverse-on-surface  (a pista de forma, e não de cor)

Três empilhados (três remoções seguidas; o mais antigo em cima, o mais novo perto da barra)
┌──────────────────────────────────┐
│┌────────────────────────────────┐│ y ≈ 516 a 588
││ Coca Cola Lata   ↺ Desfazer [✕]││
││ removido.                      ││
│└────────────────────────────────┘│ ↕ 8
│┌────────────────────────────────┐│ y ≈ 596 a 668
││ Suco de Abacaxi  ↺ Desfazer [✕]││
││ removido.                      ││
│└────────────────────────────────┘│ ↕ 8
│┌────────────────────────────────┐│ y ≈ 676 a 748
││ Cheese Bacon     ↺ Desfazer [✕]││
││ removido.                      ││
│└────────────────────────────────┘│
│          ╭ Início Cardápio Perfil╮(🛒)
└──────────────────────────────────┘
  scroll-padding-bottom: 96 + 3 × 104 = 408 px enquanto os três estão na tela (4.5)
```

Abaixo de `sm`, o aviso ocupa a largura da região (358 px em 390). O "Cheese Bacon removido." cabe em uma ou duas linhas ao lado do "Desfazer" de texto (o tonal de hoje, mais largo, o quebrava em duas); a sessão C mede. **O de sucesso** ("Dados salvos.", no perfil) é o de cima sem a ação e sem ícone: uma linha, 52 px, y ≈ 696 a 748. **No painel em 390**, sem toolbar, os mesmos avisos ficam a 16 px do pé (y ≈ 776 a 828 com uma linha).

### 3.2 Aviso na loja em 1440 e no painel em 1440

```
Loja, 1440 (sem toolbar no pé a partir de lg)
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Smash Burger                                          ╭ Início  Cardápio  Perfil ╮  (🛒)       │
│ Seu carrinho                                                                                  │
│ …                                                                                              │
│                          ┌ inverse-surface, canto 4, elevacao-3 ──────────┐                    │
│                          │ Cheese Bacon removido.     ↺ Desfazer   [✕]     │  52 px, 1 linha   │
│                          └────────────────────────────────────────────────┘  y ≈ 832 a 884    │
│                          centrado em x 720; largura do conteúdo, até 600 px; 16 px do pé      │
└────────────────────────────────────────────────────────────────────────────────────────────────┘

Painel, 1440 (a região começa depois da coluna de 240)
┌───────────────┬────────────────────────────────────────────────────────────────────────────────┐
│ Smash Burger  │ ╭ ⌕ Buscar… ╮                                          [🔔¹] [☑¹] (AU)        │
│  ( Pedidos  ) │ Pedidos                                                                        │
│               │ …                                                                              │
│               │                   ┌─────────────────────────────────┐                          │
│               │                   │ Pedido #1: Em preparo.     [✕]  │  centrado em x 840       │
│               │                   └─────────────────────────────────┘  (de 272 a 1408)        │
└───────────────┴────────────────────────────────────────────────────────────────────────────────┘
```

Em 1024, a loja já não tem toolbar no pé (`lg`): o aviso fica a 16 px do pé, centrado em x 512; no painel, centrado na área depois da coluna (de 272 a 992). Com dois avisos de tipos diferentes, o de erro fica embaixo (4.2).

### 3.3 Diálogo de confirmação ("Excluir conta?", "Excluir produto?", "Restaurar…?") em 1440 e 390

```
1440: centrado, até 480 px (prop de hoje)                390: sheet na altura do conteúdo
░░░░░░░░░░░░░░░░ scrim 32% ░░░░░░░░░░░░░░░░░░░         ░░░░░░░░░░ scrim ░░░░░░░░░░░░░░░░░░
░┌ surface-container-high, canto 28, elevacao-3 ┐░       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░│ Excluir conta?                          [✕]  │░       ┌ surface-container-low ──────────┐
░│ headline-s 400, recebe o foco (h2)           │░       │ cantos de 28 só em cima,        │
░│                                    ↕ 16      │░       │ elevacao-1, até 640 px          │
░│ Seus dados, o histórico de pedidos e o       │░       │ Excluir conta?              [✕] │
░│ carrinho serão apagados deste navegador.     │░       │ Seus dados, o histórico de      │
░│ Não é possível desfazer.                     │░       │ pedidos e o carrinho serão      │
░│                                    ↕ 24      │░       │ apagados deste navegador. Não é │
░│               ( Cancelar )   🗑 Excluir conta│░       │ possível desfazer.              │
░└──────────────────────────────────────────────┘░       │      ( Cancelar ) 🗑 Excluir conta│
   pad. 24 nos lados; tonal e perigo ao fim, 8            └─────────────────────────────────┘
   entre eles; sem divisores (o corpo não rola)             ≈ 260 px de altura (y ≈ 584 a 844),
   role="alertdialog", aria-describedby no texto            com a área segura no rodapé
```

**Com o erro da exclusão (perfil, 5.2):** o banner `error-container` (canto 16, `⚠` em `error`, texto `on-error-container`) aparece no corpo, logo abaixo do texto, dentro de uma região `role="alert"` que existe desde a abertura; o foco fica no "Excluir conta".

### 3.4 "Detalhes" do pedido, `ModalProducts` e Personalizar (só o que é do `BaseDialog`)

```
Detalhes, 1440 (até 520)                       ModalProducts, 390 (sheet com teto, corpo rola)
┌ high ─────────────────────────────── [✕] ┐   ┌ low, cantos de 28 em cima ───────────────┐
│ Pedido #1                                 │   │ Novo produto                       [✕]  │
│ (dl e itens da etapa 9)                   │   │──────────────── outline-variant ─────── │ ← divisor só
│ Total                       R$ 59,80      │   │ Categoria                               │   depois de rolar
├───────────────────────────────────────────┤   │ ╭ Hambúrguer                      ⌄ ╮   │
│                              ( Fechar )   │   │ …  (campos; corpo com scroll-padding    │
└───────────────────────────────────────────┘   │     de 16 em cima e embaixo)            │
  o divisor do rodapé só aparece se o corpo     │──────────────── outline-variant ─────── │ ← divisor enquanto
  tem mais conteúdo abaixo                      │              ( Cancelar ) ( Salvar )    │   há mais abaixo
                                                └─────────────────────────────────────────┘
                                                  teto: 100dvh − 32 px (o scrim aparece em cima)

Personalizar, 1440 (até 880) e 390 (sheet com teto): o conteúdo da etapa 6, sem mudança; o rodapé com
o CTA filled M "Adicionar · R$ 25,99" fica fora da área que rola; o título é o nome do produto em
headline-s 400; a superfície passa a high (≥ md) e low (< md), com os pares medidos de novo (§8).
```

Os "Detalhes" em 390 são o sheet `low` na altura do conteúdo (a `dl` numa coluna, etapa 9); o `ModalProducts` em 1440 é o diálogo `high` de 560 px, centrado, com o corpo rolando dentro do teto de `100dvh − 64 px` quando a janela é baixa. As bebidas no Personalizar em 390 cabem sem chegar ao teto (a captura `modal-bebida-390` mostra o conteúdo inteiro).

### 3.5 Estado vazio em três usos

```
Carrinho vazio, 1440 (na superfície, alinhado ao h1)      Perfil sem pedidos, 390 (dentro do contêiner low)
┌──────────────────────────────────────────────────┐      ┌──────────────────────────────────┐
│ Seu carrinho                h1, --text-page      │      │╭ Seus pedidos, low, canto 28 ───╮│
│                                    ↕ 20/32       │      ││ Seus pedidos        h2           ││
│ 🛒          ícone 32, on-surface-variant          │      ││ 🍔                               ││
│                                    ↕ 16          │      ││ Você ainda não fez pedidos       ││
│ Seu carrinho está vazio     title-l 500           │      ││ title-l 500 (15,49)              ││
│ Escolha um burger no cardápio para começar.      │      ││ ( Ver cardápio )  filled md, 44  ││
│ body-m on-surface-variant (8,86)   ↕ 20          │      │╰──────────────────────────────────╯│
│ ( Ver cardápio )   filled M, 56                  │      └──────────────────────────────────┘
└──────────────────────────────────────────────────┘

Gráfico do Painel, 1440 (dentro do card high)
┌ card high, canto 12, pad. 24 ─────────────────────────────────────────────────────────────┐
│ ↗  ícone 32                                                                                 │
│ Gráfico de vendas indisponível nesta versão     title-l 500 (13,93)                         │
│ Os números acima trazem o resumo dos últimos 30 dias.   body-m (7,56)                       │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

Cardápio (categoria vazia), Pedidos e Produtos (sem resultado) ficam como o carrinho, alinhados ao início, na superfície, sem ação; a categoria esvaziada de Produtos mostra só o ícone e o título.

### 3.6 Seletor de quantidade nos limites

```
Item do carrinho, 390 (sobre lowest)            Bebida no Personalizar, 390 (sobre o sheet low)
╭ Cheese Bacon               R$ 29,49 ╮         Quantidade                title-m 500
│ (−)  1  (+)            🗑 Remover     │         (−)  1  (+)
╰───────────────────────────────────────╯         └ no mínimo: aria-disabled, visual de desabilitado,
 (−) no mínimo: contêiner on-surface 10%,          continua focável
 ícone 38%; aria-disabled="true"
 44 + 8 + "1" (2ch) + 8 + 44 ≈ 122 px            No máximo (10): (+) com aria-disabled; "10" cabe nos 2ch
```

### 3.7 Botões lado a lado (repouso, sobre a `surface`)

```
( Entrar )        ( Salvar alterações )   Detalhes      🗑 Excluir      [✕]       (−)      (+)
filled md         tonal md                texto         perigo         padrão    tonal    tonal
primary/on-pr.    sec.-cont./on-sec.-c.   primary       error          on-surf.- 44, redondo
6,43              7,22                    6,13          6,16           var. 8,86

Carregando:  ( ◌ Entrando… )   ( ◌ Salvando… )   ◌ Excluindo…          — o arco à esquerda, as cores
             filled             tonal             perigo                  do repouso, largura travada
Desabilitado: ( Confirmar pedido · R$ 29,49 )  ( Atualizar status )  Remover   [✕]   (−)
             contêiner on-surface 10%, conteúdo 38%; texto e padrão sem contêiner
```

---

## 4. Comportamento comum

### 4.1 Foco

**Aviso (decisão c):**

- **Origem:** quando o foco entra no aviso vindo de fora (`focusin` com o `relatedTarget` fora da região), o `AppToast` guarda esse elemento como a origem.
- **"Fechar aviso" pelo teclado** (o `click` com `event.detail === 0`): o aviso sai, e o foco vai ao primeiro botão do aviso seguinte na pilha (o de baixo; sem ele, o de cima); sem outro aviso, à origem, se ela ainda está no documento; sem origem, ao `main#conteudo`. É o "item seguinte ao apagado" e o "botão que abriu" da APG [270], e evita o foco no `body` [273].
- **Pelo ponteiro** (`event.detail > 0`): o foco não se move: quem clica não vê o anel, e levar o foco a outro ponto rolaria a página (a lição do `CartView`, etapa 7). Não encontrei fonte sobre de onde o próximo Tab parte depois que o elemento focado some; a sessão C confere no Chromium.
- **"Desfazer":** a ação roda primeiro (o `CartView` continua levando o foco ao "Remover" do item devolvido, lógica da etapa 7, que fica na view porque só ela sabe onde o item voltou). Se, depois da ação, o foco ficou no `body` e a ativação foi pelo teclado, vale a mesma regra do "Fechar aviso". O `runAction` passa a receber o evento e a devolver o resultado do `onClick` (§8, "Lógica").
- **O aviso não toma o foco ao aparecer:** mensagem de status não move o foco [151], e o snackbar não deve interromper [219].

**Diálogo (decisão g):**

- **Foco inicial:** o de hoje: `[autofocus]`, senão o primeiro controle do corpo, senão o título (`tabindex="-1"`). Nas confirmações destrutivas, o corpo não tem controle, e o foco vai ao título: um elemento estático do topo, como a APG aceita [199], e não a ação destrutiva, que a APG desaconselha num passo difícil de desfazer [199]. As etapas 8 e 9 já fixaram o título.
- **Tab preso:** fica (o `trapFocus` de hoje). Ordem nas confirmações: título → "Fechar" → "Cancelar" → ação destrutiva → "Fechar"…
- **Esc e clique no fundo:** emitem `close` (hoje), como o material-web [234]; a H102 não fala do clique no fundo [200].
- **Devolução:** a quem abriu, se ele ainda está na página [200]; quando o gatilho some, a view decide o destino (o `h1` em Produtos e Pedidos, etapa 9), como pede a F85 [202].

**Seletor no limite (decisão i):** o botão que chega ao limite fica `aria-disabled="true"`, continua focável, e o foco não sai dele (5.4). O desabilitado real perderia o foco [273].

### 4.2 Anúncios

| O quê | O que o leitor de tela ouve | Como |
|---|---|---|
| Aviso de sucesso ou info | A mensagem, sem interromper ("Produto criado."); no de ação, também o rótulo da ação ("Cheese Bacon removido. Desfazer") | Lista `role="status"` com `aria-atomic="false"`, **fixa desde a montagem**: só o aviso novo é lido [153] [151] |
| Aviso de erro | A mensagem, interrompendo ("Não foi possível salvar. Tente de novo.") | Lista `role="alert"` com `aria-atomic="true"`, fixa desde a montagem [152] |
| Aviso que nasce com um diálogo aberto | Nada, até o diálogo fechar; então, a mensagem | O `AppToast` o retém (5.1): a página atrás do diálogo modal é inerte [200], e a região viva inerte não anuncia |
| Erro da exclusão da conta | A mensagem, com o diálogo aberto | Região `role="alert"` com `aria-atomic` dentro do corpo do diálogo, desde a abertura [152] |
| Botão que entra em `loading` com rótulo novo | "Enviando pedido…", "Entrando…", "Criando conta…", "Salvando…", "Excluindo…" | O rótulo novo vai à região viva mais próxima: a do diálogo, dentro dele, ou a do `App.vue` (o `useAnnouncer`) [151] (5.7) |
| Valor do seletor | O número novo ("2") | O `output` de hoje, `aria-live="polite"` |
| Seletor no limite | O número e o estado do botão ("indisponível", conforme o leitor) | `aria-disabled` [207] |
| Estado vazio depois de uma escolha (categoria do Cardápio, filtro de Pedidos e de Produtos sem busca) | O título e o texto do vazio | Uma região `role="status"` com `aria-atomic` fixa na view, com o `EmptyState` dentro [151] [153] (5.3) |
| Vazio com busca no painel | "0 pedidos para “x”." (a linha da busca, etapa 9) | O vazio da busca fica **fora** da região, para não anunciar duas vezes |
| Diálogo de confirmação | O nome ("Excluir conta?"), o papel de alerta e a descrição | `role="alertdialog"` e `aria-describedby` repassados ao `<dialog>` [235] |

A sessão C ouve num leitor de tela se o aviso de ação lê o rótulo "Desfazer" junto da mensagem (depende do leitor; o essencial é a mensagem).

### 4.3 Tempo (decisão c)

| Aviso | Tempo | Por quê |
|---|---|---|
| Sucesso e info, sem ação | 4000 ms (hoje), pausando com o ponteiro ou o foco dentro dele | O `Short` do Compose [218]; a informação está também na tela (tabela abaixo), o caso que a 2.2.1 dispensa [227] |
| Com ação ("Desfazer") | Não some sozinho: sai pela ação, pelo "Fechar aviso", pela troca de rota ou quando um quarto aviso empurra o mais antigo | O padrão do Compose com ação é `Indefinite` [217] [218]; o KDoc pede que não expire, e mover o foco não conta como ação [219]; desligar o limite é melhor que ajustá-lo [227] |
| Erro | Igual ao de ação | A falha não aparece em outro lugar da tela [227] |
| Info da conferência do pagamento ("O carrinho foi atualizado…") | Igual ao de ação (`duration: 0`, uma linha no `PaymentView`) | A instrução "Confira o pedido antes de confirmar" não está em outro lugar [227] |

**Onde a informação de cada aviso de 4 s também está:** "Conta criada. Entre para continuar." (a tela de login que abre); "Conta excluída." (a Home, com "Entrar" na pílula); "Produto atualizado.", "Produto criado.", "Produto excluído." (a grade de Produtos); "Pedido #{id}: {status}." (o rótulo de status do card); "Cardápio original restaurado.", "Pedidos de exemplo restaurados." (Produtos e Pedidos); "Dados salvos." (os campos, que mantêm os dados); "Seu carrinho está vazio." (o `EmptyState` do carrinho).

**Troca de rota:** os avisos que não expiram saem quando o caminho (`route.path`) muda; os de 4 s ficam até o tempo deles (o "Seu carrinho está vazio." nasce no guard e precisa sobreviver ao redirecionamento). Não encontrei o equivalente web do "Time to take action" do Android [225] [226].

**Fila:** até 3 na tela, o mais antigo sai quando chega o quarto (hoje; `SPEC.md` §4.1). Não entra a fila de um por vez do Compose [217] [218]: com o "Desfazer" sem prazo, o segundo aviso esperaria para sempre; nem a troca do MDC [224], que apagaria o "Desfazer" da remoção anterior.

### 4.4 Movimento (decisão d e §7.7 do SPEC-M)

| Peça | Com movimento (`motion-ok`) | Reduzido |
|---|---|---|
| Aviso, entrada | Opacidade de 0 a 1 em `--m3-dur-mola-efeitos-rapida` com `--m3-mola-efeitos-rapida`, e `scale(0.8)` → `none` em `--m3-dur-mola-espacial-rapida` com `--m3-mola-espacial-rapida`, a partir do centro de baixo ([218]: `FastEffects` na opacidade e `FastSpatial` na escala; os valores do Compose não foram abertos, e ficam os tokens do projeto) | Só a opacidade, em `--m3-dur-mola-efeitos-rapida` (150 ms) |
| Aviso, saída | O inverso [218]: opacidade e `scale(0.8)` em `--m3-dur-mola-efeitos-rapida`, com a curva de efeitos (sem overshoot) | Só a opacidade |
| Pilha de avisos | Troca direta: os outros avisos sobem ou descem sem animação (hoje) | Igual |
| Diálogo (≥ `md`) | O de hoje (`SPEC.md` §7.5): opacidade, `translateY(8px)` e `scale(0.98)` em `--dur-base` com `--ease-out` | Opacidade em `--dur-fast` |
| Sheet (< `md`) | `translateY(100%)` → 0 em `--dur-slow` com `--ease-out` (vale também com a altura automática: 100% é a altura do próprio sheet) | Opacidade em `--dur-fast` |
| Fundo (`::backdrop`) | Opacidade em `--dur-base` | Opacidade em `--dur-fast` |
| Seletor | **Troca direta do número** (sai o rolar na vertical) | Igual |
| Botões | A troca de forma por opacidade (SPEC-M §7.2), também nos de ícone tonais e filled; o perigo troca a cor sem transição | Igual (opacidade não é movimento [77]) |
| Spinner | Rotação contínua em `--dur-spin` | Parado, com o rótulo de quem usa |

- **O número do seletor troca direto:** o odômetro saiu do sistema (SPEC-M §7.8), e o número do badge também troca direto (§7.5); não encontrei movimento de número no contador do Compose [245]. O retorno do clique é a troca de forma do botão.
- **Classes no `_motion.scss`** (lista de `transform: none` com movimento reduzido): entram `.toast`, `.dialog` e `.btn__spinner`. Os `@keyframes` e as transições com `transform` já ficam só em `motion-ok`; a lista é a rede de segurança.
- **O que o `lacunas.mjs` espera** (L57, hoje "sheet em 400ms e fundo em 240ms"): o script lê `--dur-slow`, `--dur-base` e `--dur-fast` do `:root` e compara com a animação computada: sheet `dialog-sheet-in` em `--dur-slow` (0,4 s) e fundo `dialog-fade` em `--dur-base` (0,25 s); reduzido, os dois em `--dur-fast` (0,15 s). Os nomes dos `@keyframes` não mudam.

### 4.5 Posição do aviso e foco não coberto (decisões b e r; 2.4.11 [76])

**Onde o aviso fica:**

| Lugar | Pé do aviso (`bottom`) | Faixa horizontal |
|---|---|---|
| Loja, abaixo de `lg` (a toolbar flutua) | `calc(var(--m3-barra-reserva) + env(safe-area-inset-bottom))`: 16 px acima da pílula e do FAB, perto da margem de 12 dp do snackbar [219] [223] | de `--gutter` a `--gutter`, centrado |
| Loja a partir de `lg`; painel em todas as larguras; acervo | `calc(var(--space-4) + env(safe-area-inset-bottom))` | idem; no painel a partir de `lg`, começa depois da coluna (`inset-inline-start: calc(var(--m3-navegacao-largura) + var(--gutter))`), para o aviso centrar na área de trabalho, como o `Scaffold` centra no conteúdo [223] |

- **A seleção "a toolbar flutua"** é `body:has(.m3-ferramentas)` abaixo de `lg` (hoje só abaixo de `md`; entre 768 e 1023 o aviso ia para o topo, e a toolbar continua flutuando no pé).
- **Sem toolbar** (painel, login do admin, acervo sem `.m3-ferramentas`), o aviso fica a 16 px do pé.

**A reserva absorvida (uma regra, no `_app-toast.scss`, por `:global`):**

| Avisos na tela | Seletores (`html:has(…)`) | `scroll-padding-bottom` | `padding-bottom` do `body` |
|---|---|---|---|
| 1 ou mais | `.toast-region .toast` | B + 1 × R | `var(--space-4)` + 1 × R |
| 2 ou mais | `.toast-region .toast + .toast`; ou `.toast-region__list--status .toast` junto com `.toast-region__list--alert .toast` | B + 2 × R | `var(--space-4)` + 2 × R |
| 3 | `.toast + .toast + .toast` numa lista; ou 2 numa e 1 na outra (as duas combinações) | B + 3 × R | `var(--space-4)` + 3 × R |

- **B** é o pé do aviso: `var(--m3-barra-reserva)` na loja abaixo de `lg` (as mesmas regras com `html:has(.m3-ferramentas)` antes, dentro de `below(lg)`); `var(--space-4)` no resto. **R** é o `--m3-toast-reserva` (6,5rem, 104 px: um aviso de até 3 linhas, 92 px, mais o vão; etapa 7). Os seletores saem de um `@each` em Sass.
- **Por que o `body` ganha `padding-bottom`:** sem ele, o último controle da página (o link da assinatura, o "Sair" do painel numa página curta) não tem para onde subir, e o aviso o cobre. É a regra do `.admin-main` da etapa 9, levada a todas as rotas; o espaço entra embaixo, e nada acima se move. Abaixo de `lg`, na loja, o `.main-layout` já reserva a toolbar, e o `body` soma o aviso.
- **O foco que não se move:** depois de mostrar um aviso (também o retido, ao soltá-lo), se a última entrada foi de teclado e o elemento focado não está no aviso, o `AppToast` faz `document.activeElement.scrollIntoView({ block: "nearest" })`, que respeita a reserva. É o padrão que o `CartView`, o `ProfileView` e a `OrderManagement` já usam; nas três views a chamada fica (repetida, sem efeito).
- **Avisos empilhados** (o risco aceito na etapa 7): a reserva conta até 3, e o "Remover" vizinho focado depois de três remoções sobe acima da pilha (em 390, a área útil fica de 80 a 436 px, para elementos de 44 a 56 px).
- **Por largura, com um aviso (estimativas):**
  - **loja em 390 × 844:** o aviso de 72 px vai de 676 a 748; a área útil do foco vai de 80 a 644 (`scroll-padding-bottom` de 200);
  - **loja e painel em 1024 × 768:** o aviso de 52 px vai de 700 a 752; a área útil vai de 80 a 648 (120 de reserva). No painel, o aviso começa depois da coluna e não cruza o "Sair" (de x 12 a 228);
  - **loja e painel em 1440 × 900:** o aviso vai de 832 a 884; a área útil vai de 80 a 780. O "Novo produto" do painel, no topo, fica longe do aviso (o motivo da etapa 9 para o pé);
  - **painel em 390:** sem toolbar, o aviso fica a 16 px do pé, e a reserva é de 120.
- **O rodapé do diálogo sobre o campo focado:** o corpo é o contêiner de rolagem e termina acima do rodapé; `scroll-padding-block: var(--space-4)` no corpo dá a folga do anel (pendência da etapa 6). O CTA nunca cobre o campo.
- **A pílula sobre o aviso:** abaixo de `lg`, o aviso fica 16 px acima dela; a partir de `lg`, a pílula está no cabeçalho.
- **As regras que saem:** `_cart-page.scss` (L7–21), `_payment.scss` (L7–18), `_profile.scss` (L8–21) e, em `_admin-layout.scss`, as três regras do aviso (L75–95: a posição no pé, a reserva no `scroll-padding` e o `padding-bottom` do `.admin-main`). **Fica** no `_admin-layout.scss` o `--m3-barra-reserva: 0rem` (L70–73, sobre a toolbar, e não sobre o aviso) e **entra** a regra da coluna (acima). O `--m3-toast-reserva` fica, agora com um dono só.

### 4.6 Modos de contraste (decisão q)

| Peça | `forced-colors: active` | `prefers-contrast: more` |
|---|---|---|
| Aviso | Borda de 1 px `CanvasText` (`reserva-de-sombra`): o fundo escuro e a sombra somem; o texto e os ícones ficam `CanvasText`; os botões, com a borda `ButtonText` do `.m3-botao` | Borda de 1 px `outline` (4,27 contra a página; o aviso já tem 12,48 contra ela) |
| Diálogo e sheet | Borda `CanvasText` (`reserva-de-sombra`) | Borda `outline` (3,65 contra o `high`; 4,06 contra o `low`) |
| Botão tonal (também o do seletor) | Borda `ButtonText` (hoje, `.m3-botao`) | **Novo:** borda de 1 px `outline` (4,48 no `lowest`, 3,65 no `high`, 4,06 no `low`, 4,27 na `surface`); o contêiner tonal mede de 1,05 a 1,29 contra os fundos |
| Botão de ícone padrão | Borda `ButtonText` redonda (mostra o alvo sem o fundo) | Nada: o ícone já tem de 7,56 a 9,29 |
| Perigo | Borda `ButtonText`; a tinta vira `ButtonText` (o `trash-can` e o rótulo levam a informação) | Nada (de 5,25 a 6,46) |
| Desabilitado (todas as variantes) | `color: GrayText` e `border-color: GrayText` (o precedente do campo, etapa 8) | Nada (isento [269] [98]) |
| Estado vazio | Nada (texto e ícone viram `CanvasText`) | Nada |
| Banner de erro no diálogo | Borda `CanvasText` (o `.auth-alert`) | Borda `outline` |
| Botão de imagem do `ModalProducts` | Hoje | **Novo:** a mesma borda `outline` do tonal |

---

## 5. Blocos

### 5.1 `AppToast` e `toast.js` (decisões a, b, c, d)

- **Arquivos e raiz:** `src/components/ui/AppToast.vue` (`div.toast-region`), `src/assets/styles/components/ui/_app-toast.scss` e `src/stores/toast.js`. O `App.vue` continua montando o `AppToast` uma vez, depois do `RouterView` (as Homes do acervo também o mostram, SPEC-M §11.4).
- **Objetivo:** dizer o que aconteceu sem interromper, e dar tempo e caminho para desfazer.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Mensagem | `toast.message` (os textos de hoje: `authHandlers.js`, `router/index.js` L180, `CartView.vue` L104, `PaymentView.vue` L114, `ProfileView.vue` L316, `AdminSettings.vue` (`RESETS[*].done`), `OrderManagement.vue` L225, `ProductManagement.vue` L194, L204, L213) |
| Variante | `toast.variant`: `success`, `info`, `error` |
| Ação | `toast.action.label` ("Desfazer") e `toast.action.icon` (`rotate-left`), só no carrinho |
| Fechar | "Fechar aviso" (`xmark`), em todos |
| Ícone | `circle-exclamation` só no erro (já no plugin) |

**Estrutura:**

- `div.toast-region` (fixa, `z-index: var(--z-toast)`, `pointer-events: none`, `inset-inline: var(--gutter)`, pé pela tabela de 4.5; coluna, `align-items: center`, `gap: var(--space-2)`):
  - `TransitionGroup name="toast" tag="div"` → `div.toast-region__list.toast-region__list--status[role=status][aria-atomic=false]`, com os avisos de sucesso e info;
  - `TransitionGroup name="toast" tag="div"` → `div.toast-region__list.toast-region__list--alert[role=alert][aria-atomic=true]`, com os de erro (embaixo, perto da borda).
- Cada aviso: `div.toast.toast--{variant}` (sem `role`; a classe da variante fica como gancho de teste, sem CSS) → `font-awesome-icon.toast__icon` (só no erro, `aria-hidden`) → `p.toast__message` → `BaseButton.toast__action variant="ghost"` (com ação; era `secondary`) → `BaseButton.toast__close variant="ghost" icon-only icon-start="xmark" label="Fechar aviso"`. Os eventos de hoje ficam (`mouseenter`, `mouseleave`, `focusin`, `focusout`).
- **Por que duas listas fixas:** hoje cada aviso nasce com o próprio `role` e a mensagem juntos, e a ARIA22 confere se o papel existe antes da mensagem [153]; a ARIA19 pede o contêiner do erro desde o carregamento [152]. O `aria-atomic="false"` na lista de status faz o leitor ler só o aviso novo, e não a pilha toda; o `aria-atomic="true"` no erro é o que a ARIA19 pede para o VoiceOver do iOS [152].

**Visual do aviso (`.toast`):**

| Propriedade | Valor | Fonte |
|---|---|---|
| Fundo e texto | `--m3-inverse-surface` / `--m3-inverse-on-surface` (11,54) | [220], [224] |
| Forma | `--m3-forma-xs` (4 px) | `CornerExtraSmall` [220] [221] |
| Elevação | `--m3-elevacao-3` | `Level3` (6 dp) [220] [198]; o `--m3-elevacao-3` é a aproximação do nível 3 do projeto (SPEC-M §2.6) |
| Texto | `tipo(body-m)`, `letter-spacing: var(--m3-body-m-tracking)`; `p.toast__message` com `flex: 1` e `padding-block: var(--space-3)` | `BodyMedium` [220] [224] |
| Padding | `var(--space-1) var(--space-2) var(--space-1) var(--space-4)` (4 em cima e embaixo, 8 no fim, 16 no início) | 16 no início e 8 no fim [219]; os 4 de cima e de baixo são do projeto |
| Altura | 52 px com uma linha (44 do botão mais 4 e 4), 72 com duas, 92 com três | O M3 dá 48 e 68 dp [220]; a diferença é o alvo de 44 px do projeto [78] |
| Largura | abaixo de `sm`, a da região; a partir de `sm`, a do conteúdo, até `min(37.5rem, 100%)` | até 600 dp, sem mínimo [219] |
| Vãos | `display: flex; align-items: center; gap: var(--space-2)` | o de hoje (sem fonte no M3) |
| Ícone de erro | 20 px (`1.25rem`), `inverse-on-surface`, `flex-shrink: 0` | a pista de forma da 1.4.1 [99]; 20 px como os ícones de apoio do sistema (admin, 5.1) |
| Modos | `reserva-de-sombra` (4.6) | SPEC-M §2.6 |

**Os botões dentro do aviso (repintados pelo próprio aviso, com seletor de duas classes, o precedente do hero em `pages/home/_secao-hero.scss` L160):**

- `.toast .toast__action { color: var(--m3-primary-container); }`: o text button "Desfazer" em `primary-container` (10,13); a camada de estado é `currentColor` (8% no hover, 10% no pressionado [12]): 8,18 e 7,74 (medidos com a camada da própria cor; com a camada `inverse-on-surface`, mais clara, 8,03 e 7,56, o par que entra no `contraste.js`).
- `.toast .toast__close { color: var(--m3-inverse-on-surface); }`: o botão de ícone padrão (5.6) na cor do texto; hover 9,15; pressionado 8,61.
- `.toast :is(.toast__action, .toast__close):focus-visible { outline-color: var(--m3-inverse-on-surface); outline-offset: calc(-1 * var(--focus-width)); }`: o anel por dentro, em `inverse-on-surface` (11,54; sobre a camada pressionada, 8,61). **Por quê:** o `secondary` mede 2,02 sobre o `inverse-surface` (abaixo de 3 [98]); por fora, o anel (2 + 3 px) passaria 1 px da borda do aviso, com 4 px de padding em cima e embaixo, e encostaria na página clara.
- **Por que `primary-container` na ação:** é da mesma paleta primária do `inverse-primary` que o M3 usa [220]; mede 10,13; e a ação se distingue do texto pelo peso (label-l 500 contra body-m 400), pelo ícone, pela posição no fim e pela camada de estado, e não só pela cor (as duas cores medem 1,13 uma contra a outra). Não encontrei no dossiê o tom do `inverse-primary`; o valor dele teria de vir do gerador (§12).

**Interação e estados:**

- **Tempo, fila e troca de rota:** 4.3. **Pausa:** com o ponteiro ou o foco dentro, só nos avisos de 4 s (hoje).
- **Retenção com um diálogo aberto (lógica de apresentação, novo):** um `watch` com `flush: "sync"` sobre os ids da store vê cada aviso novo; se nesse instante existe um `dialog[open]` (todos os diálogos do projeto são o `BaseDialog`, aberto com `showModal()`), o aviso fica retido: não entra nas listas, o tempo dele fica pausado (`pause(id)`), e ele é solto no evento `close` desse `dialog` (`{ once: true }`) ou na troca de rota, quando ganha o `resume(id)`. **Por quê:** com o diálogo modal, a página atrás é inerte [200]: o aviso ficaria atrás do fundo e a região viva não anunciaria. Inferência pela ordem do agendador do Vue: hoje o "Conta excluída." nasce no handler com o diálogo ainda aberto (o `deleteOpen` só vira `false` depois do `await`), e por isso pode não ser lido; a sessão C confere num teste (o aviso é inserido só depois do `close`).
- **Foco:** 4.1. **Rolagem do foco:** 4.5.
- **Hover nos botões:** a camada; o aviso não reage ao ponteiro (só pausa o tempo).

**Acessibilidade:** as duas listas fixas e o que se ouve (4.2); "Fechar aviso" com o nome de hoje [257] [259]; a ação com o texto visível "Desfazer"; nenhum `aria-label` novo; o ícone do erro `aria-hidden`.

**Comportamento:** 1440, no pé, centrado, a largura do conteúdo até 600 (cerca de 346 px para o "Desfazer"); 1024, a 16 px do pé (loja) ou centrado depois da coluna (painel); 390, na largura da região (358), 16 px acima da toolbar na loja.

**Movimento:** 4.4.

**Reservas:**

- **Texto longo:** quebra em várias linhas; os botões ficam no fim da linha, centrados na altura. A mensagem real mais longa (a conferência do pagamento, 78 caracteres) dá 3 linhas em 390 (92 px, medido na etapa 7). Um nome de produto de até 60 caracteres (o limite do `ModalProducts`) com " removido." pode passar de 3 linhas em 390 e da reserva de um aviso (risco, §11).
- **Três avisos:** a pilha e a reserva por contagem (4.5); o quarto empurra o mais antigo.
- **Aviso com o carrinho esvaziado:** o "Desfazer" do último item aparece sobre o `EmptyState` (a captura `cart-desfazer-390`); ao desfazer, o item volta e o foco vai ao "Remover" dele (etapa 7).

**`toast.js` (estado de interface, não persistido; a mudança exata):**

```
show({ message, variant = "success", action = null, duration = 4000 })
  // expira só sem ação, fora do erro e com duração positiva
  const expira = !action && variant !== "error" && duration > 0;
  push { id, message, variant, action, duration, expira }
  enquanto houver mais de 3: dismiss(o mais antigo)      (hoje)
  se expira: timers.set(id, …) e resume(id)              (hoje, só para os que expiram)

runAction(id, event)
  const resultado = toast?.action?.onClick?.(event);    (o evento é novo e opcional)
  dismiss(id);
  return resultado;                                     (o AppToast espera a promessa para o foco)

pause(id), resume(id), dismiss(id): os de hoje (sem timer, não fazem nada)
```

O JSDoc do `show` passa a dizer: "com `action` ou `variant: 'error'`, o aviso não expira; `duration: 0` também não expira". O `CartView` deixa de passar `duration: 5000` (L107), que perde o efeito; o `PaymentView` passa `duration: 0` no aviso da conferência (L114).

### 5.2 `BaseDialog` e o sheet (decisões e, f, g)

- **Arquivos e raiz:** `src/components/ui/BaseDialog.vue` (`dialog.dialog`) e `components/ui/_base-dialog.scss`.
- **Objetivo:** pedir uma decisão ou mostrar um conteúdo por cima da página, com um jeito visível de sair, e devolver a pessoa ao ponto de onde veio.

**Conteúdo:**

| Campo | Origem |
|---|---|
| Título | `title` (prop) ou o slot `header`; `h2#{titleId}`, `tabindex="-1"` |
| Fechar | "Fechar" (`xmark`), botão de ícone padrão (5.6) |
| Corpo | slot padrão |
| Rodapé | slot `footer` |
| Usos (largura, `maxWidth`) | Personalizar (880 px, padrão), `ModalProducts` (560), "Detalhes" (520), "Excluir produto?", "Excluir conta?" e "Restaurar…?" (480): os de hoje |

**Contêiner (decisão e):**

| Peça | A partir de `md` (diálogo) | Abaixo de `md` (sheet) | Fonte |
|---|---|---|---|
| Superfície | `--m3-surface-container-high` | `--m3-surface-container-low` | [229] [231] [232]; [237] [241] |
| Forma | `--m3-forma-xl` (28) nos quatro cantos | 28 só nos cantos de cima | `CornerExtraLarge` [229] [233]; `CornerExtraLargeTop` [237] |
| Elevação | `--m3-elevacao-3` | `--m3-elevacao-1` | `Level3` [229]; `Level1` [237] |
| Largura | `calc(100% - 2 * var(--gutter))`, até `var(--dialog-max)` (a prop) | 100%, até `40rem` (640), centrado | 280 a 560 dp [230] (o Personalizar passa: é o diálogo com conteúdo próprio [228]); 640 dp [238] [241] |
| Altura | a do conteúdo, até `calc(100dvh - 2 * var(--space-6))` | **a do conteúdo**, até `calc(100dvh - var(--space-6))` | os insets seguros [238]; o teto deixa o `scrim` à vista em cima |
| Margem | `auto` (centrado) | `auto auto 0` (preso ao pé) | hoje |
| Fundo | `::backdrop` em `--m3-scrim` (32%) | igual | 32% [231] [166] |
| Modos | `reserva-de-sombra` | igual | SPEC-M §2.6 |

- **A superfície muda de `surface-container` (o apelido `--color-surface-2`) para `high` e `low`.** Os pares das telas dentro do diálogo foram medidos de novo nos dois fundos (§8): todos passam. O que precisou de resposta foi o perigo pressionado no `high` (4,32 com o `error`), resolvido pela tinta `on-error-container` (5.5).
- **Sem alça (decisão f):** o projeto não tem gesto de arrastar; a alça do Compose é clicável e tem ações semânticas [240], e uma alça só decorativa sugeriria um gesto que não existe. Ela é opcional no MDC [241]; a APG pede um botão visível de fechar [199], que o cabeçalho tem.
- **O sheet na altura do conteúdo:** "Excluir conta?" ocupa cerca de 260 px em 390 (e não 812); o Personalizar e o `ModalProducts` chegam ao teto e rolam por dentro. A pendência da etapa 8 (o sheet de altura inteira para duas linhas) se resolve aqui.

**Estrutura e espaços:**

- `dialog.dialog` → `div.dialog__panel` (coluna; recebe `is-rolado` e `tem-mais`) → `header.dialog__header` → `div.dialog__body` → `footer.dialog__footer` (`v-if`) → `p.visually-hidden[role=status][aria-atomic=true]` (a região de anúncio do diálogo, 5.7).
- **Cabeçalho:** flex, `align-items: center`, `gap: var(--space-3)`, `padding: var(--space-3) var(--space-3) var(--space-2) var(--space-5)`; o título em `tipo(headline-s)` (24/32, 400), `--m3-on-surface`, `flex: 1`, `overflow-wrap: anywhere`, no início (sem ícone, o título fica no início [230] [231]); o "Fechar" no fim, a 12 px da borda. Sai o `text-transform` e o peso 700.
- **Corpo:** `flex: 1 1 auto; min-height: 0; overflow-y: auto; overscroll-behavior: contain`, `padding: var(--space-2) var(--space-5)` (o título fica a 16 px do texto [230]); `scroll-padding-block: var(--space-4)` (a folga do anel, 4.5); sem rodapé, `padding-bottom: var(--space-5)`. O corpo não impõe o estilo do texto: os diálogos de confirmação mantêm o body-l `on-surface` que as etapas 8 e 9 fixaram (o M3 dá body-m `on-surface-variant` [229]; desvio registrado, porque o texto de consequência é lido inteiro).
- **Rodapé:** `flex-shrink: 0`, `padding: var(--space-4) var(--space-5) calc(var(--space-5) + env(safe-area-inset-bottom))`, sem fundo próprio. O texto e as ações ficam a 24 px [230]. As ações são de cada view (o seguro antes, a ação por último, ao fim, 8 px entre elas [230] [228]), como as etapas 8 e 9 fixaram.
- **Divisores (decisão e):** o cabeçalho e o rodapé têm `border-block-end` e `border-block-start` de 1 px **transparentes**; com `.is-rolado` (o corpo saiu do topo), o do cabeçalho fica `--m3-outline-variant`; com `.tem-mais` (há conteúdo abaixo), o do rodapé também. Nada se move: só a cor da borda troca. O material-web mostra os divisores só quando o conteúdo rola e não está no topo ou no fim [234]. **Lógica:** um ouvinte `scroll` (passivo) no corpo e um `ResizeObserver` nele calculam `rolado = scrollTop > 0` e `temMais = scrollTop + clientHeight < scrollHeight - 1`; zerados ao abrir; desligados ao fechar e no `onBeforeUnmount`.

**Interação e estados (decisão g):** 4.1. A API não muda: `open`, `title`, `titleId`, `maxWidth`; emite `close`; slots `header`, padrão e `footer`. Os atributos que a view passa (`role`, `aria-describedby`) caem no `<dialog>` pela herança de atributos (o componente não tem `inheritAttrs: false`).

**As confirmações viram `alertdialog`:** "Excluir conta?" (`ProfileView.vue` L146–164), "Excluir produto?" (`ProductManagement.vue` L74–92) e "Restaurar…?" (`AdminSettings.vue` L22–36) passam `role="alertdialog"` e `aria-describedby` apontando para o `p` do texto, que ganha um `id` (`excluir-conta-texto`, `excluir-produto-texto`, `restaurar-texto`). O alert dialog serve a prompts de confirmação, com a mensagem ligada por `aria-describedby` [235]; o `type="alert"` do material-web faz o mesmo [232] [234]. O `aria-modal` não entra: o `showModal()` já bloqueia o resto [235] [200].

**O erro com o diálogo aberto (pendência da etapa 8):** o `ProfileView` deixa de mandar o erro da exclusão ao aviso (L361). O corpo do diálogo ganha `div.profile-delete__anuncio[role=alert][aria-atomic=true]`, **sempre no DOM** [152], depois do texto, com o banner `p.profile-delete__erro` (`v-if`) no visual do `.auth-alert` da etapa 8: `error-container`, canto 16 (`--m3-forma-l`), padding 16, o `circle-exclamation` num `span` de 20 px em `error` (4,99), o texto em `on-error-container` (7,23), `reserva-de-sombra`. O texto é o `result.error` de hoje ("Não foi possível excluir a conta. Tente de novo."). Uma `ref` local (`erroExclusao`) guarda a mensagem; é limpa ao abrir, ao fechar e antes de tentar de novo. O foco fica no "Excluir conta" (o `loading` não o desabilita). O handler, a store e o serviço não mudam. **Por quê:** com o `showModal()`, a página atrás é inerte [200], e o aviso ficaria atrás do fundo; o erro num diálogo que tem o foco não é mensagem de status [151], e a região de alerta o anuncia mesmo assim.

**Comportamento:** 1440 e 1024, centrado, com a largura de cada uso; 390, o sheet (tabela).

**Movimento:** 4.4.

**Reservas:** diálogo mais alto que a tela (o corpo rola; o cabeçalho e o rodapé ficam; os divisores aparecem); título longo (quebra; o "Fechar" fica centrado na altura do cabeçalho); o teclado virtual no celular (o `dvh` nem sempre o desconta; fora do escopo, como hoje); o gatilho que sumiu (a view decide, 4.1).

### 5.3 `EmptyState` (decisão h)

- **Arquivos e raiz:** `src/components/ui/EmptyState.vue` (`div.empty-state`) e `components/ui/_empty-state.scss`.
- **Objetivo:** dizer que não há nada ali, por que, e o caminho quando existe um.
- **API:** a de hoje (`icon`, `title`, `text`; slot `action`). Nenhuma prop nova.

**Anatomia:**

| Peça | Visual | Fonte |
|---|---|---|
| Raiz | flex em coluna, `align-items: flex-start`, `gap: var(--space-2)`, `padding-block: var(--space-5)`, `text-align: start` | o sistema alinha ao início (admin, §2); não encontrei medida de estado vazio no M3 |
| Ícone | 32 px (`2rem`), `--m3-on-surface-variant`, `margin-block-end: var(--space-2)`, `aria-hidden`; solto, sem círculo | SPEC-M §4.2; a imagem sutil e neutra do Material 1 [243] |
| Título | `p.empty-state__title`, `tipo(title-l, 500)`, `--m3-on-surface` | SPEC-M §4.2 |
| Texto | `p.empty-state__text`, `tipo(body-m)` com o tracking, `--m3-on-surface-variant`, até `32rem` | SPEC-M §4.2 |
| Ação | slot `action`, `margin-block-start: var(--space-3)` | — |

- **O título continua `<p>`:** é uma mensagem sobre o estado, e não o título de uma seção; um `h2` ou `h3` mudaria de nível conforme a tela (o `h2` "Seus pedidos" no perfil já titula a seção) e criaria títulos que não titulam conteúdo.
- **Sem círculo nem ilustração:** a ilustração decorativa no vazio é padrão genérico (pacote, item 11), e no sistema o círculo separa informação de ação (SPEC-M §2.2).
- **A ação:** as fontes divergem (chamada à ação em todo vazio [242], caminhos diretos [244], frase que não parece acionável [243]); fica o que cada tela já tem.

**Cada uso (o par de cada fundo; todos já no `contraste.js`):**

| Uso | Fundo | Título / texto e ícone | Ação | Anúncio |
|---|---|---|---|---|
| Carrinho (`CartView.vue` L8) | `surface`, na largura do `.container`, sem bandeja (etapa 7) | 16,31 / 8,86 | "Ver cardápio" **filled M** (`size="lg"`, L15): a única ação da página, o caminho direto [244] | Nenhum: o "{nome} removido." e o foco no `h1` já contam (etapa 7) |
| Cardápio, categoria vazia (`MenuView.vue` L26) | `surface`, na região da grade | 16,31 / 8,86 | Nenhuma (o grupo de categorias, logo acima, é o caminho; etapa 6) | **Região `role="status"` com `aria-atomic`** fixa em volta do `EmptyState` (a inferência da pesquisa para esse caso [151] [153]) |
| Perfil sem pedidos (`ProfileView.vue` L138) | dentro do contêiner `low` de "Seus pedidos" | 15,49 / 8,41 | "Ver cardápio" filled `md` (hoje): no perfil, um M competiria com as ações da tela | Nenhum (estado de carregamento da página) |
| Pedidos sem resultado (`OrderManagement.vue` L72) | `surface` | 16,31 / 8,86 | Nenhuma | Sem busca ("Nenhum pedido com esse status"), dentro de uma região `role="status"` fixa; com busca ("Nenhum pedido encontrado"), fora dela: a linha da busca já diz "0 pedidos para “x”." |
| Produtos: busca sem resultado e categoria vazia (`ProductManagement.vue` L25 e L33) | `surface` | 16,31 / 8,86 | Nenhuma | A da categoria vazia (só o título) dentro da região; a da busca, fora |
| Gráfico do Painel (`AdminDashboard.vue` L16) | dentro do card `high` (etapa 9) | 13,93 / 7,56 | Nenhuma | Nenhum (estático) |

**A região do anúncio nas views:** um `div[role=status][aria-atomic=true]` sempre no DOM, vazio quando há itens, com o `EmptyState` dentro por `v-if`; a lista fica fora dele. Sem estilo próprio.

**Comportamento:** 1440, 1024 e 390: a mesma coluna, alinhada ao início do conteúdo de cada tela; o texto quebra em até 32rem.

**Movimento:** nenhum.

**Reservas:** título longo quebra; sem texto, ícone e título só (a categoria vazia de Produtos); sem ação, termina no texto.

### 5.4 `QuantityStepper` (decisão i)

- **Arquivos e raiz:** `src/components/ui/QuantityStepper.vue` (`div.stepper[role=group]`) e `components/ui/_quantity-stepper.scss`.
- **Objetivo:** mudar a quantidade de um em um, dentro dos limites, sem perder o lugar.
- **API:** a de hoje (`modelValue`, `min`, `max`, `label`; emite `update:modelValue`).

**Conteúdo:**

| Campo | Origem |
|---|---|
| Grupo | "Quantidade de {label}" (`aria-label`, hoje) |
| Botões | "Diminuir {label}" (`minus`) e "Aumentar {label}" (`plus`), hoje |
| Número | `modelValue` no `output.stepper__value.tabular[aria-live=polite]` (hoje) |
| Limites | 1 a 10 (bebida no Personalizar e item do carrinho: `ModalAdditional.vue` L49, `CartItem.vue` L31–32) e 0 a 5 (adicionais: `AdditionalsList.vue` L11–12) |

**Estrutura e visual:**

- `div.stepper[role=group]` → `BaseButton variant="secondary" icon-only` (−) → `output.stepper__value` → `BaseButton variant="secondary" icon-only` (+). Saem o `<Transition>`, o `span.stepper__digit` e as classes `stepper-up` e `stepper-down`: o número fica direto no `output`.
- **Os botões:** o botão de ícone tonal (5.6): 44 × 44, redondo, `secondary-container` com o ícone `on-secondary-container` (7,22), hover 6,39, pressionado 6,21 com o canto `forma-s` (troca de forma [249]). Sem o button group, que comprime os vizinhos [54] e arrisca o alvo [78] (SPEC-M §4.2); o desenho é o do contador de dois botões e um texto do Compose [245].
- **O número:** `tipo(title-m, 500)`, tabular, `min-width: 2ch`, centrado (o "10" cabe). `gap: var(--space-2)` entre as três peças: cerca de 122 px no total.
- **A 1.4.11 e o contêiner tonal:** o tonal mede 1,29 contra o `lowest` (linhas dos adicionais e item do carrinho), 1,05 contra o `high` e 1,16 contra o `low` (a quantidade da bebida no diálogo e no sheet). Não se aplica ao contêiner: um controle com conteúdo visível dispensa borda, e num ícone de uma cor a imagem inteira é o objeto gráfico [98]; o ícone mede 7,22 contra o contêiner. Com `prefers-contrast: more`, a borda `outline` (4.6; 4,48 no `lowest`, o par da etapa 6, que passa a esse uso).

**O limite (decisão i):**

- **`aria-disabled="true"` no limite, no lugar do `disabled`:** `:aria-disabled="modelValue <= min ? 'true' : undefined"` no (−) e o inverso no (+); sai o `:disabled`. O botão continua focável e com o visual de desabilitado (5.8); o clique não faz nada (o `BaseButton` bloqueia o `aria-disabled` repassado, 5.7, e o `change()` de hoje já não emite no limite).
- **Por quê:** quem aperta Enter no (−) até o mínimo tem o foco nele; com `disabled`, o botão deixa de ser focável e o navegador leva o foco ao viewport [273], o que a APG chama de perder o foco [270]. A convenção da APG aceita o `disabled` quando o estado se infere pelo vizinho [270], mas não trata desse caso; o exemplo de quantidade da APG usa `aria-disabled` no limite [275]; e o `soft-disabled` do material-web faz o mesmo nos botões de ícone [257] [258].
- **Sem spinbutton:** o padrão da APG põe o foco num campo editável e tira os botões do Tab [274] [275], e o próprio exemplo avisa de falhas de suporte no celular e no toque [275]. Fica o grupo de dois botões e o `output` do `SPEC.md`.
- **O que o leitor de tela ouve:** "Diminuir Coca Cola Lata, botão"; ao apertar, o `output` diz "1"; no limite, o botão passa a "indisponível" (conforme o leitor) e continua com o foco; apertar de novo não muda nada.
- **A §6 do SPEC-M muda:** a linha do `QuantityStepper` deixa "no limite: `disabled` real" e passa a "no limite: `aria-disabled`, focável, clique sem efeito" (a sessão C edita).
- **O que o teste confere** (`QuantityStepper.test.js`, §9): no mínimo, o (−) tem `aria-disabled="true"` e **não** tem `disabled`; com o foco nele e cliques até o mínimo, o `document.activeElement` continua o botão; o clique no limite não emite; os três rótulos.

**Comportamento:** igual em 1440, 1024 e 390; no item do carrinho, à esquerda do "Remover", com quebra (etapa 7).

**Movimento:** troca direta (4.4); a troca de forma dos botões por opacidade.

**Reservas:** nome de produto longo nos rótulos (só no `aria-label`; nada visual muda); dois dígitos ("10", nos 2ch); o seletor numa linha estreita (o item do carrinho quebra a segunda linha, etapa 7).

### 5.5 `BaseButton`: `danger` (decisão j)

- **Arquivo:** `src/components/ui/BaseButton.vue` e `components/ui/_base-button.scss`. **API:** `variant="danger"` (hoje), sem prop nova.
- **Uma forma só: text button na tinta `error`, com a camada de estado** (SPEC-M §4.1, recomendação), em todos os usos, dentro e fora dos diálogos. **Por quê:** não encontrei botão nem orientação destrutiva no M3 [267] [231] [268]; o exemplo de exclusão do material-web usa dois text buttons sem cor própria [232]; o `error` é o papel da ação destrutiva no sistema (SPEC-M §2.2); e uma forma só mantém a API (decisão j). O "Cancelar" tonal ao lado tem mais ênfase que a ação destrutiva, o que combina com começar pela ação menos destrutiva [199].
- **O hover e o pressionado escurecem a tinta para `on-error-container`**, com a camada (`currentColor` a 8% e 10% [12]). **Por quê (medido):** no `surface-container-high` (o card de produto do painel e o diálogo a partir de `md`), o `error` com a camada pressionada dá 4,32 (4,47 com a camada da própria cor), abaixo de 4,5. Com `on-error-container`, 6,26. O precedente é o campo com erro no hover, que já troca para `on-error-container` (etapa 8). A troca de cor é direta, sem transição.
- **Classe:** `m3-botao--perigo` (o mapa passa a `{ primary: "filled", secondary: "tonal", ghost: "texto", danger: "perigo" }`); sai a `.btn--legado`. `padding-inline: var(--space-3)`, como o text button.
- **Ícones:** `trash-can` ("Remover", "Excluir", "Excluir produto", "Excluir conta") e `rotate-left` ("Restaurar"), hoje, em `currentColor`.
- **Alvo:** `md` 44 px; `sm` 40 com alvo de 44 ("Excluir" no card de produto).

**Os pares, por fundo (o pressionado com o token `m3-camada-pressionada`, on-surface a 10%, que é o caso pior: a camada `error` real clareia o fundo e dá mais contraste):**

| Fundo | Onde | Repouso (`error`) | Hover (`on-error-container`) | Pressionado | Anel / anel pressionado |
|---|---|---|---|---|---|
| `surface-container-lowest` | "Remover" no item do carrinho | 6,46 | 7,97 | 7,65 | 6,44 / 5,27 |
| `surface-container-low` | "Excluir conta" na tela do perfil; as ações destrutivas no sheet | 5,84 | 7,23 | 6,94 | 5,83 / 4,78 |
| `surface-container-high` | "Excluir" no card de produto; as ações destrutivas no diálogo a partir de `md` | 5,25 | 6,52 | 6,26 | 5,25 / 4,32 |
| `surface` | sem uso hoje | 6,16 | 7,61 | 7,30 | 6,14 / 5,03 |

**Interação e estados:** `loading` ("Excluindo…") com a tinta `error` e o arco, sem hover nem pressionado (5.7); desabilitado com o conteúdo a 38%, sem contêiner (5.8). **Acessibilidade:** o nome é o texto visível (ou o `aria-label` de hoje, "Remover {nome}" no carrinho, que contém o texto visível [214]).

**Comportamento:** igual em 1440, 1024 e 390; no diálogo, o fundo é o `high` a partir de `md` e o `low` no sheet (a linha de cada um na tabela). **Movimento:** a camada por opacidade em `--m3-dur-mola-efeitos-rapida`; a troca de tinta é direta (sem `transition` de cor, o que o `lacunas.mjs` confere). **Reservas:** rótulo longo ("Restaurar cardápio original" não é perigo; os rótulos do perigo têm até 15 caracteres) quebra como os outros botões; o "Excluir" `sm` no card de produto de 390 fica no fim da fileira, longe do "Editar" [H19] (etapa 9).

### 5.6 `BaseButton`: `iconOnly` (decisão k)

- **API:** `iconOnly` e `label` (hoje); o `label` vira o `aria-label` (obrigatório, com o aviso de hoje no console). Nenhuma prop nova.
- **O botão de ícone do Expressive, pela `variant`:**

| `variant` | Vira | Contêiner / ícone | Fonte |
|---|---|---|---|
| `ghost` | padrão (sem contêiner) | — / `on-surface-variant` | [253], [257]; o de menor ênfase, o das ações de barra [196] |
| `secondary` | tonal | `secondary-container` / `on-secondary-container` | [255] |
| `primary` | filled (sem uso hoje) | `primary` / `on-primary` | [254] |
| `danger` | padrão na tinta `error` (sem uso hoje) | — / `error`, `on-error-container` no hover e no pressionado | 5.5 |

- **Tamanhos (`size`):** `sm` 40 × 40 com alvo de 44 (o `::after` da face com `inset: -2px` nos quatro lados), `md` 44 × 44, `lg` 56 × 56. O S do Expressive tem 40 dp e o M, 56 [249] [250]; o `md` de 44 é o alvo do projeto (desvio da ficha, como o botão S de 44 [19]).
- **Ícone:** 20 px (`1.25rem`) no `sm` e no `md`, 24 (`1.5rem`) no `lg`. O M3 usa 24 dp no S e no M [249] [250]; os 20 px são o tamanho dos ícones do Font Awesome no sistema (o "Mostrar senha" do campo, a navegação do painel) (decisão c).
- **Forma:** redonda (`--m3-forma-full`) [249]. **Troca de forma:** no tonal e no filled, pressionado em `forma-s` no `sm` e no `md` e em `forma-m` no `lg` [249] [250] (por opacidade, `troca-de-forma`). No padrão, sem contêiner, só a camada (como o text button; a troca de forma não se vê sem fundo).
- **Cores e anel:** o padrão em `on-surface-variant` no repouso e no hover (a camada de 8% e 10% [12]); o anel de 3 px em `secondary`, afastado 2 px (por dentro só no aviso, 5.1).

**Os usos de hoje:**

| Uso | Variante | Fundo | Ícone (repouso / pressionado) | Anel |
|---|---|---|---|---|
| "Fechar aviso" (`AppToast`) | padrão, repintado | `inverse-surface` | `inverse-on-surface` 11,54 / 8,61 | por dentro, `inverse-on-surface` |
| "Fechar" do diálogo | padrão | `high` (≥ `md`) / `low` (sheet) | 7,56 / 6,22; 8,41 / 6,90 | 5,25; 5,83 |
| "Fechar" da gaveta do painel (`SidebarAdmin.vue`) | padrão | `low` | 8,41 / 6,90 | 5,83 |
| "Alternar menu" (`TheNavbarAdmin.vue`) | padrão | `surface` | 8,86 / 7,26 | 6,14 |
| Atalhos com selo (`NotificationBar.vue`, com `to`) | padrão, link | `surface` | 8,86 / 7,26 | 6,14 |
| (−) e (+) do seletor | tonal | `lowest`, `high`, `low` | 7,22 / 6,21 | 6,44; 5,25; 5,83 |

- **O `iconOnly` com `to`:** o `RouterLink` com a mesma aparência (hoje). **O selo continua no lugar:** ele é posicionado pelo `span.navbar-notifications__item` em volta do botão (`top` e `right` de `--space-1`), e o botão continua com 44 × 44.
- **Os que saem na etapa 11** (`CarouselBurguer.vue`, `TheNavbar.vue`) ganham o visual novo sem uso.
- **Acessibilidade:** o nome é o `label` (`aria-label`), que todo botão só de ícone precisa [257] [259]; o ícone é `aria-hidden` (hoje). Sem dica (tooltip): o Compose a põe no "Fechar" do snackbar [219], mas marca como bug a dica não anunciada ([179], [194]; desenho do admin, §12, "Fora").
- **Comportamento:** igual em 1440, 1024 e 390 (44 × 44 em todas). **Movimento:** a camada e a troca de forma por opacidade. **Reservas:** nenhum texto visível para quebrar; com zoom, o círculo cresce com o `rem`.

### 5.7 `BaseButton`: `loading` (decisão l)

- **API:** `loading` (hoje). **Indicador:** o arco de hoje (SVG de 16, três quartos de círculo, traço 2, `currentColor`), `1em`, no lugar do ícone de início, antes do rótulo. É o indicador circular indeterminado do M3 [260], simplificado: o arco gira inteiro (só `transform`), sem mudar de comprimento. Não entra o loading indicator do Expressive: as formas se transformam (morph, fora da regra de `transform` e `opacity`), as APIs são experimentais [58], e não encontrei orientação do M3 para progresso dentro de um botão além do circular centrado no que carrega [260]. O rótulo fica, porque é ele que diz o que acontece; trocar o botão pelo indicador tiraria o elemento focado da página [260] [270].
- **Cores enquanto carrega:** as do repouso de cada variante, e não as do desabilitado. **Por quê:** a ação está em andamento, e não indisponível; o rótulo ("Enviando pedido…") é informação e precisa do contraste do repouso (o desabilitado é isento [269] e mede 2,3). O hover e o pressionado ficam neutros (os três fundos iguais ao repouso; no texto e no perigo, sem camada nem troca de tinta); `cursor: progress` (hoje).
- **O clique fica bloqueado e a largura travada** (hoje; a largura só cresce, nunca encolhe).
- **Sai o `aria-busy`.** O `aria-busy` serve a regiões vivas e a widgets que ficariam sem os filhos obrigatórios durante a atualização [207]; não encontrei fonte que diga que o leitor de tela o anuncia num botão [207] [263]; e ele pode fazer a tecnologia assistiva segurar as mudanças do elemento até voltar a `false` [207] [263], justo a troca do rótulo.
- **O anúncio (lógica de apresentação, novo):** quando `loading` vira `true`, o botão guarda o texto do `.btn__label`, espera o `nextTick` e, **se o rótulo mudou**, manda o texto novo à região viva mais próxima: a do `BaseDialog`, por `inject` (o diálogo fornece a dele, porque a página atrás é inerte [200]), ou a do `App.vue` (`useAnnouncer().announce`). É o indicador de "ocupado" que a 4.1.3 lista entre as mensagens de status [151]. O "Salvar" do `ModalProducts`, que não muda de rótulo enquanto lê a imagem, não anuncia nada (o nome do arquivo mostra "Lendo a imagem…", etapa 9).
- **A chave:** `src/composables/useAnnouncer.js` passa a exportar `CHAVE_ANUNCIADOR` (`Symbol`); o `BaseDialog` faz `provide(CHAVE_ANUNCIADOR, anunciar)`, e o `BaseButton`, `inject(CHAVE_ANUNCIADOR, null) ?? useAnnouncer().announce`.
- **Movimento reduzido:** o arco parado, com o rótulo (hoje; SPEC-M §7.7).

**Os usos:** "Entrando…" (`LoginView.vue` L41, `LoginAdminView.vue` L47), "Criando conta…" (`RegisterView.vue` L143), "Salvando…" (`ProfileView.vue` L88), "Excluindo…" (`ProfileView.vue` L160, dentro do diálogo), "Enviando pedido…" (`PaymentView.vue` L52) e o "Salvar" do `ModalProducts` (L101). O CEP do cadastro e do perfil é o `loading` do `FormGroup`, que não é botão.

**Comportamento:** igual em 1440, 1024 e 390; o CTA do pagamento é `block` em todas (etapa 7). **Reserva:** rótulo de carregamento mais longo que o de repouso ("Entrar" → "Entrando…"): o botão cresce (os dois logins são `block`, e nada muda); mais curto ("Confirmar pedido · R$ 1.948,00" → "Enviando pedido…"): a largura fica; o "Enviando pedido…" quebra linha como o rótulo de repouso (`white-space: normal` no CTA, etapa 7).

### 5.8 `BaseButton`: desabilitado (decisão m)

**As cores do M3 e as do projeto:**

| Variante | Contêiner | Conteúdo | Fonte |
|---|---|---|---|
| Filled, tonal, ícone filled e tonal | `--m3-desabilitado-container` (on-surface a 10%) | `--m3-desabilitado-conteudo` (on-surface a 38%) | [264] (filled 0,1), [254] e [255] (ícones 0,1); o tonal de texto usa 0,12 numa versão mais antiga dos tokens [265]: fica o 0,1 das versões novas |
| Texto, perigo, ícone padrão | transparente | `--m3-desabilitado-conteudo` | [267], [253] |

- **Os tokens novos (cor; o SPEC-M e a etapa 8 já os pedem):** `--m3-desabilitado-conteudo: rgba(24, 29, 23, 0.38)` e `--m3-desabilitado-container: rgba(24, 29, 23, 0.1)` (on-surface #181d17 com o alfa). **Por que `rgba`, e não a cor composta:** o M3 desenha o desabilitado como a cor "on" com alfa [268], e o botão desabilitado aparece em quatro fundos (`surface`, `low`, `lowest`, `high`); o `rgba` se compõe com cada um, como as camadas `--m3-camada-*`. Sobre a `surface`, o conteúdo composto dá exatamente o `#a2a79e` de hoje.
- **O nome M3 do `--color-ink-disabled` (pendência da etapa 8):** o apelido passa a `var(--m3-desabilitado-conteudo)`. O campo (`_form-group.scss`) continua escrevendo `var(--color-ink-disabled)` até a etapa 11, cujo script troca pelo papel; o botão já usa o token novo. Sobre o `low`, o texto do campo desabilitado passa de `#a2a79e` a `#9fa39b` (composto; isento).
- **A isenção:** o texto e o contorno de um componente inativo não têm requisito de contraste ([269], [98]). Medidos, para registro: o conteúdo sobre o contêiner dá de 2,21 a 2,28; sem contêiner, de 2,28 a 2,36.
- **Sem camada e sem troca de forma** (hoje), `cursor: not-allowed`; com `forced-colors`, `GrayText` (4.6).
- **`disabled` ou `aria-disabled` (regra do projeto, por [270] e [271]):**
  - **`aria-disabled`** quando o botão pode ficar indisponível com o foco nele e não há outro destino lógico (o seletor no limite, 5.4), ou quando ele precisa continuar descobrível com a explicação (o CTA do pagamento);
  - **`disabled`** nos outros casos: o "Atualizar status" em "Concluído", cuja view já leva o foco ao `h1` quando o botão desabilita (etapa 9), e o "Cancelar" durante a exclusão (o foco está no "Excluir conta").
- **O CTA do pagamento passa a `aria-disabled`** (`PaymentView.vue` L47: `:aria-disabled="canSubmit ? undefined : 'true'"` no lugar do `:disabled`). Ele continua no Tab, e a ajuda ("Escolha a forma de pagamento…", `aria-describedby`, hoje) é lida no foco. **Por quê:** o MDN cita o envio de formulário indisponível que deve ficar no Tab [271], e a APG manda manter descobrível o que precisa ser encontrado [270]; hoje, quem usa leitor de tela só acha o botão e a ajuda no modo de leitura. **É apresentação:** o `submit()` já sai cedo sem forma de pagamento ou endereço (L105), e o `BaseButton` passa a bloquear o clique com o `aria-disabled` repassado. O MDN pede avisar ao reativar [271]: o botão reativa pela escolha da própria pessoa no mesmo formulário, e o estado novo é lido quando o foco chega a ele.
- **O link desabilitado:** `aria-disabled` sem `href` (hoje), com o mesmo visual.
- **O que o leitor de tela ouve:** com `disabled`, o botão sai do Tab e é lido como indisponível no modo de leitura (hoje); com `aria-disabled`, ele fica no Tab, é lido como indisponível, e a descrição ligada é lida no foco.
- **Comportamento:** igual em 1440, 1024 e 390. **Movimento:** nenhum (sem camada, sem troca de forma). **Reservas:** o rótulo desabilitado quebra como o de repouso; nos modos de contraste, `GrayText` (4.6).

### 5.9 `pressed` e o fim do `.btn--legado` (decisões n e o)

**A prop `pressed` sai.**

- **Por quê:** sem uso desde a etapa 6, quando o grupo de categorias passou a rádios nativos (desenho do Cardápio, L628); desenhar o toggle sem nenhum caso real seria desenhar uma função que o projeto não tem (pacote, item 3); e o toggle do M3 troca o rótulo em alguns exemplos ([245], [258]) enquanto a APG pede o rótulo fixo [90], uma escolha que só um uso real decide. O único toggle do projeto, o "Mostrar senha" do campo, é um `button` próprio com `aria-pressed` (etapa 8) e não usa a prop.
- **API (decisão j):** a prop, o comentário dela e a linha `aria-pressed` saem do `BaseButton.vue`; o teste "pressed vira aria-pressed" sai do `BaseButton.test.js`. Quem precisar de toggle no futuro passa `aria-pressed` como atributo, que chega ao botão pela herança de hoje.

**O `.btn--legado` sai inteiro.** Com `danger`, `iconOnly` e `pressed` resolvidos, nenhum botão fica na forma da Brasa.

| Sai de `_base-button.scss` (linhas de hoje) | Entra |
|---|---|
| `.btn--legado` (L149–162): canto `--radius-sm`, borda de 1 px e o aperto `translateY(1px) scale(0.98)` | — (a troca de forma por opacidade, SPEC-M §7.2, já cobre o filled e o tonal; o padrão e o perigo têm a camada) |
| `.btn--icon-only` (L164–179), com o ícone de `1.125rem` | `.btn--icon-only` com os tamanhos, o ícone de 20 e 24 px, o alvo do `sm` e as formas pressionadas (5.6) |
| `:where(.btn--legado).btn--primary`, `--secondary`, `--ghost` (L181–229), com `--color-accent*`, `--glow-accent`, `--color-border-strong`, `--color-surface-3`, `--color-surface-4`, `--color-ink*`, `--color-hover-ghost` | `.m3-botao--texto.btn--icon-only { color: var(--m3-on-surface-variant) }` e as formas do tonal e do filled de ícone |
| `.btn--danger` (L231–244), com `--color-danger` e `--color-danger-soft` | `.m3-botao--perigo` (5.5) |
| O desabilitado comum (L246–259), com `--color-surface-4` e `--color-ink-disabled` | O desabilitado por variante (5.8), com os tokens novos e o `GrayText` |
| — | O `loading` com hover e pressionado neutros (5.7) |
| — | A borda `outline` do tonal com `prefers-contrast: more` (4.6) |

- **O alvo de 42 px do `sm` legado some:** a borda de 1 px do `.btn--legado` encolhia em 2 px a área do `::after` (40 − 2 + 4 = 42); sem borda, o `sm` volta aos 44 (40 + 4).
- **No `BaseButton.vue`:** saem o `legado` (`computed`) e a classe `btn--legado`; todo botão recebe `m3-botao` e `m3-botao--{filled|tonal|texto|perigo}`; o `iconOnly` soma `btn--icon-only`. O `handleClick` passa a tratar como inerte também o `aria-disabled="true"` repassado (como o `soft-disabled` do material-web [258]).

### 5.10 O botão de imagem do `ModalProducts` (decisão p)

- **Fica o `<label for="image">`**, com o visual do tonal `md` copiado em `_modal-products.scss` (etapa 9). **Por quê:** o `input` de arquivo, escondido dentro do `label`, é o controle focável e leva o `required`, o `aria-invalid` e o `aria-describedby` (a ajuda ou o erro); os controles HTML nativos já cumprem a 4.1.2 [96]. O `BaseButton` renderiza `button`, `a` ou `RouterLink`, e não `label`; um `button` pediria código para abrir o seletor de arquivo e para levar esses estados a ele, e o resto do `ModalProducts` mudaria.
- **Única mudança:** a borda `outline` do tonal com `prefers-contrast: more` (4.6), para a cópia acompanhar o tonal. O desabilitado e o `loading` não se aplicam (o "Salvar" é quem carrega).

### 5.11 O que muda em cada tela que usa estes componentes

| Tela ou arquivo | O que muda | Linha de hoje | Por quê |
|---|---|---|---|
| `CartView.vue` | "Ver cardápio" do vazio com `size="lg"`; sai o `duration: 5000` do aviso | L15; L107 | 5.3; 4.3 |
| `MenuView.vue` | O `EmptyState` dentro de um `div[role=status][aria-atomic=true]` fixo; a grade com `v-if` | L19–26 | 5.3 |
| `ProfileView.vue` | O diálogo de exclusão com `role="alertdialog"`, `aria-describedby="excluir-conta-texto"`, o `id` no texto e a região `role="alert"` com o banner; o `confirmDelete` guarda o erro na `ref`, e não no aviso | L146–164; L352–365 | 5.2 |
| `PaymentView.vue` | O CTA com `aria-disabled`; o aviso da conferência com `duration: 0` | L47; L114 | 5.8; 4.3 |
| `ProductManagement.vue` | "Excluir produto?" com `role="alertdialog"` e `aria-describedby`; o vazio da categoria dentro da região de status | L74–92; L33 | 5.2; 5.3 |
| `OrderManagement.vue` | O `EmptyState` em dois: sem busca, dentro da região de status; com busca, fora | L72–77 | 5.3 |
| `AdminSettings.vue` | "Restaurar…?" com `role="alertdialog"` e `aria-describedby` | L22–36 | 5.2 |
| `ModalAdditional.vue`, `ModalProducts.vue`, `AdditionalsList.vue`, `CartItem.vue`, `SidebarAdmin.vue`, `TheNavbarAdmin.vue`, `NotificationBar.vue`, `LoginView.vue`, `LoginAdminView.vue`, `RegisterView.vue`, `AdminDashboard.vue` | Nada no código: o visual vem dos componentes. Os pares do Personalizar e do `ModalProducts` foram medidos de novo na superfície nova (§8) | — | — |
| `_cart-page.scss`, `_payment.scss`, `_profile.scss` | Saem as regras do aviso | L7–21; L7–18; L8–21 | 4.5 |
| `_profile.scss` | Entram `.profile-delete__anuncio` e `.profile-delete__erro` (o visual do `.auth-alert`) | — | 5.2 |
| `_admin-layout.scss` | Saem as três regras do aviso; entra o início da região depois da coluna a partir de `lg` | L75–95 | 4.5 |
| `_modal-products.scss` | A borda do botão de imagem com `prefers-contrast: more` | — | 5.10 |

**Pares das telas dentro do diálogo, medidos de novo** (o desenho do Cardápio, L456 e L838, e o da Conta, L913, pediram): §8.

---

## 6. Matriz de estados

Mesmo formato da §6 do SPEC-M. "Anel" é o contorno de 3 px em `--m3-secondary`, afastado 2 px [30]; "anel interno", `outline-offset: calc(-1 * var(--focus-width))`; "camada", o `currentColor` a 8% no hover (só `hover-capable`) e 10% no pressionado [12]; "isento", sem requisito de contraste ([269], [98]).

| Componente | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando |
|---|---|---|---|---|---|---|---|
| Botão filled | `primary` / `on-primary` (6,43), cantos `full` | `primary-hover` | anel | `primary-pressed`; `forma-m` (S) ou `forma-l` (M) | — | contêiner `--m3-desabilitado-container`, rótulo `--m3-desabilitado-conteudo`, sem camada (isento) | cores do repouso, arco em `--dur-spin` (só `motion-ok`), rótulo de quem usa anunciado na região viva; hover e pressionado neutros; largura travada |
| Botão tonal | `secondary-container` / `on-secondary-container` (7,22) | `secondary-container-hover` (6,39) | anel | `secondary-container-pressed` (6,21); `forma-s` | — | idem | idem |
| Botão de texto | tinta `primary`, sem fundo | camada 8% | anel | camada 10% | — | sem contêiner, rótulo a 38% | idem, sem camada |
| Perigo (`danger`) | tinta `error` (6,46 / 5,84 / 5,25 no `lowest`, `low`, `high`) | tinta `on-error-container` + camada 8% (7,97 / 7,23 / 6,52) | anel | `on-error-container` + camada 10% (7,65 / 6,94 / 6,26; anel 5,27 / 4,78 / 4,32) | — | sem contêiner, rótulo a 38% | tinta `error`, arco, sem camada |
| Botão de ícone padrão (`ghost` + `iconOnly`) | 44 redondo; ícone 20 px `on-surface-variant` (8,86 / 8,41 / 7,56 na `surface`, `low`, `high`) | camada 8% | anel | camada 10% (7,26 / 6,90 / 6,22) | — | ícone a 38% | — |
| Botão de ícone tonal (`secondary` + `iconOnly`) | 44 redondo; `secondary-container` / `on-secondary-container` (7,22) | `-hover` (6,39) | anel | `-pressed` (6,21); `forma-s` | — | contêiner 10%, ícone 38% | — |
| Botão de ícone filled (`primary` + `iconOnly`; sem uso) | `primary` / `on-primary` (6,43) | `primary-hover` | anel | `primary-pressed`; `forma-s` (`lg`: `forma-m`) | — | contêiner 10%, ícone 38% | — |
| Botões nos modos de contraste | `forced-colors`: borda `ButtonText`; `prefers-contrast: more`: borda `outline` no tonal | — | anel | — | — | `GrayText` no texto e na borda | — |
| `QuantityStepper` | dois ícones tonais de 44; número title-m 500 tabular | via botão | via botão | via botão (troca de forma) | — | **no limite: `aria-disabled="true"`, focável, clique sem efeito**, visual de desabilitado | — |
| `AppToast` | `inverse-surface` / `inverse-on-surface` (11,54), canto 4, `elevacao-3`; ícone só no erro | pausa o tempo (só nos de 4 s) | anel interno `inverse-on-surface` nos botões (11,54) | — | — | — | — |
| Ação do aviso ("Desfazer") | text button em `primary-container` (10,13) | camada 8% (8,03) | anel interno `inverse-on-surface` | camada 10% (7,56) | — | — | — |
| "Fechar aviso" | ícone padrão em `inverse-on-surface` (11,54) | camada 8% (9,15) | anel interno | camada 10% (8,61) | — | — | — |
| Aviso nos modos de contraste | `forced-colors`: borda `CanvasText`; mais contraste: borda `outline` | — | anel | — | — | — | — |
| Diálogo (≥ `md`) | `surface-container-high`, canto 28, `elevacao-3`, sobre o `scrim`; divisores transparentes | — | o foco inicial pela regra de 4.1; Tab preso | — | — | — | — |
| Sheet (< `md`) | `surface-container-low`, cantos de 28 em cima, `elevacao-1`, altura do conteúdo até `100dvh − 32 px`; sem alça | — | idem | — | — | — | — |
| Divisores do diálogo | transparentes | — | — | — | corpo rolado: `outline-variant` em cima; mais conteúdo abaixo: em baixo | — | — |
| "Fechar" do diálogo | ícone padrão (7,56 no `high`; 8,41 no `low`) | camada 8% | anel (5,25; 5,83) | camada 10% (6,22; 6,90; anel 4,32; 4,78) | — | — | — |
| Diálogo nos modos de contraste | borda `CanvasText`; mais contraste: borda `outline` | — | — | — | — | — | — |
| Banner de erro no diálogo de exclusão | `error-container` / `on-error-container` (7,23); ícone `error` (4,99); região `role="alert"` | — | — (não recebe foco) | — | — | — | — |
| `EmptyState` | ícone 32 `on-surface-variant`; título title-l 500 `on-surface`; texto body-m `on-surface-variant`; alinhado ao início | — (não interativo) | — | — | — | — | — |

Os estados de vazio e erro das telas seguem a §6 do `SPEC.md`, com estes componentes.

---

## 7. Inventário

**Contagem:** nenhum componente novo. Mudam **5 componentes** (`AppToast`, `BaseDialog`, `EmptyState`, `QuantityStepper`, `BaseButton`), todos com o nome e a API de hoje, menos a prop `pressed`, que sai; a store de interface `toast.js`; o composable `useAnnouncer.js`; e **7 telas** (`CartView`, `MenuView`, `ProfileView`, `PaymentView`, `ProductManagement`, `OrderManagement`, `AdminSettings`). Nada vem de `src/direcoes/`.

### 7.1 `AppToast` (`src/components/ui/`) e `toast.js` (`src/stores/`)

- **Props, slots, emits:** nenhum (hoje).
- **Store:** `show({ message, variant = "success", action = null, duration = 4000 })`, com o aviso que expira só sem ação, fora do erro e com `duration > 0`; `dismiss(id)`, `pause(id)`, `resume(id)` (hoje); `runAction(id, event)`, com o evento opcional e o resultado do `onClick` devolvido. Até 3 avisos, o mais antigo sai (hoje).
- **Estrutura:** `div.toast-region` → `div.toast-region__list--status[role=status][aria-atomic=false]` e `div.toast-region__list--alert[role=alert][aria-atomic=true]` (os dois `TransitionGroup`) → `div.toast.toast--{variant}` → `font-awesome-icon.toast__icon` (erro) → `p.toast__message` → `BaseButton.toast__action` (`ghost`) → `BaseButton.toast__close` (`ghost`, `iconOnly`).
- **Lógica:** a retenção com um `dialog[open]` (`watch` com `flush: "sync"`, o evento `close`, a troca de rota); a saída dos avisos que não expiram na troca de `route.path` (`useRoute`); a origem do foco (`focusin`); o foco depois do "Fechar aviso" e da ação pelo teclado; a última entrada (`pointerdown` e `keydown` na captura do `document`, tirados no `onBeforeUnmount`) e a rolagem do foco depois de mostrar um aviso.
- **Tokens:** `--m3-inverse-surface`, `--m3-inverse-on-surface`, `--m3-primary-container`, `--m3-forma-xs`, `--m3-elevacao-3`, `--m3-body-m` (a linha e o tracking), `--m3-toast-reserva`, `--m3-barra-reserva`, `--m3-navegacao-largura` (na regra do painel), `--z-toast`, `--gutter`, `--space-1` a `--space-4`, `--focus-width`, `--m3-dur-mola-efeitos-rapida`, `--m3-mola-efeitos-rapida`, `--m3-dur-mola-espacial-rapida`, `--m3-mola-espacial-rapida`, `--m3-outline` (pela `reserva-de-sombra`).
- **Mixins:** `tipo`, `reserva-de-sombra`, `up`, `below`, `motion-ok`.
- **Referências:** [216] a [227], [151] a [153], [76], [99], [198], [200].

### 7.2 `BaseDialog` (`src/components/ui/`)

- **Props:** `open: { type: Boolean, default: false }`, `title: { type: String, default: "" }`, `titleId: { type: String, required: true }`, `maxWidth: { type: String, default: "880px" }` (hoje). **Emits:** `close`. **Slots:** `header`, padrão, `footer`. **Atributos:** caem no `<dialog>` (o `role` e o `aria-describedby` das confirmações).
- **Estrutura:** `dialog.dialog` → `div.dialog__panel(.is-rolado)(.tem-mais)` → `header.dialog__header` (`h2.dialog__title` e o `BaseButton.dialog__close`) → `div.dialog__body` → `footer.dialog__footer` → `p.visually-hidden[role=status][aria-atomic=true]`.
- **Lógica:** a de hoje (`showModal`, trava de rolagem, foco inicial, Tab preso, Esc, clique no fundo, devolução); os divisores (`scroll` e `ResizeObserver`); o `provide(CHAVE_ANUNCIADOR, …)`.
- **Tokens:** `--m3-surface-container-high`, `--m3-surface-container-low`, `--m3-on-surface`, `--m3-outline-variant`, `--m3-scrim`, `--m3-forma-xl`, `--m3-elevacao-3`, `--m3-elevacao-1`, `--m3-headline-s` (e a linha), `--space-2` a `--space-6`, `--gutter`, `--dur-fast`, `--dur-base`, `--dur-slow`, `--ease-out` (apelido, até a etapa 11).
- **Referências:** [228] a [241], [199], [200], [202], [166].

### 7.3 `EmptyState` (`src/components/ui/`)

- **Props:** `icon: { type: [String, Array], default: "burger" }`, `title: { type: String, required: true }`, `text: { type: String, default: "" }` (hoje). **Slots:** `action`. **Emits:** nenhum.
- **Estrutura:** `div.empty-state` → `font-awesome-icon.empty-state__icon` → `p.empty-state__title` → `p.empty-state__text` (`v-if`) → `div.empty-state__action` (`v-if`) (hoje).
- **Tokens:** `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-title-l` (e a linha), `--m3-body-m` (a linha e o tracking), `--space-2`, `--space-3`, `--space-5`.
- **Referências:** [242], [243], [244], [151], [153].

### 7.4 `QuantityStepper` (`src/components/ui/`)

- **Props:** `modelValue` (`Number`, obrigatória), `min` (`Number`, `0`), `max` (`Number`, `10`), `label` (`String`, obrigatória) (hoje). **Emits:** `update:modelValue`.
- **Estrutura:** `div.stepper[role=group]` → `BaseButton` (−, `aria-disabled` no mínimo) → `output.stepper__value.tabular[aria-live=polite]` → `BaseButton` (+, `aria-disabled` no máximo). Saem o `<Transition>` e o `span.stepper__digit`.
- **Tokens:** `--m3-title-m` (e a linha), `--space-2`.
- **Referências:** [245], [249], [255], [270], [273] a [275], [54], [78], [98].

### 7.5 `BaseButton` (`src/components/ui/`)

- **Props:** `variant` (`primary` | `secondary` | `ghost` | `danger`, `primary`), `size` (`sm` | `md` | `lg`, `md`), `block`, `loading`, `disabled`, `type` (`button` | `submit`, `button`), `retorno`, `iconStart`, `iconEnd`, `iconOnly`, `label`, `to`, `href` (hoje). **Sai:** `pressed`. **Slot:** padrão. **Emits:** o `click` repassado por `handleClick` (hoje).
- **Classes:** `btn`, `btn--{variant}`, `btn--{size}`, `m3-botao`, `m3-botao--{filled|tonal|texto|perigo}`, `btn--icon-only`, `btn--block`, `is-loading`, `is-retorno`.
- **Atributos de saída:** `type`, `disabled` (botão), `aria-disabled` (link desabilitado, hoje, ou repassado), `aria-label` (`iconOnly`); **sai** o `aria-busy`.
- **Lógica:** o `aria-disabled="true"` repassado bloqueia o clique; o anúncio do rótulo no `loading`.
- **Tokens novos usados:** `--m3-desabilitado-conteudo`, `--m3-desabilitado-container`; e `--m3-error`, `--m3-on-error-container`, `--m3-on-surface-variant`, `--m3-forma-s`, `--m3-forma-m`, `--m3-outline`.
- **Referências:** [249], [250], [253] a [259], [264] a [268], [260], [207], [263], [151], [199], [232].

### 7.6 `useAnnouncer.js` (`src/composables/`)

- Exporta também `CHAVE_ANUNCIADOR` (`Symbol("anunciador")`). O resto não muda.

### O que fica sem uso (para a etapa 11)

- **Apelidos sem nenhum uso em `src/`** (fora de `src/direcoes/` e do `_tokens.scss`; conferido com `grep` nas parciais de hoje): `--color-surface-4`, `--color-danger-soft` (só o `_base-button.scss`), `--color-overlay`, `--elev-3`, `--radius-lg` (só o `_base-dialog.scss`), `--color-info` e `--color-danger` (só o aviso e o botão).
- **Apelidos que ficam só em folhas que a etapa 11 apaga** (`_product-card.scss`, `_navbar.scss`, `_carousel.scss`, `_cart-badge.scss`, `_footer*.scss`, `_banner.scss`): `--color-surface-2`, `--color-surface-3`, `--color-success`, `--elev-2`, `--radius-md`, `--color-accent-hover`, `--color-accent-pressed`, `--glow-accent`, `--color-hover-ghost`, `--text-lg`, `--leading-tight`.
- **Token do projeto sem uso:** `--dur-instant` (só o aperto do `.btn--legado`); o SPEC-M §2.8 o lista como "Pressionar". A etapa 11 decide se sai.
- **`--color-ink-disabled`:** continua no `_form-group.scss`; a etapa 11 o troca por `--m3-desabilitado-conteudo`, e não por `#a2a79e` (o plano, etapa 11, lista o valor antigo).
- **Pares:** os de `PARES_COMUNS` do modal e do aviso (`color-ink`, `color-ink-muted`, `color-danger`, `color-border-strong`, `color-accent` e `color-focus` sobre `color-surface-2`; `color-ink` e `color-success` sobre `color-surface-3`) ficam sem uso na produção e saem com os apelidos.
- **Sai já na sessão C, nada para a 11:** o `.btn--legado`, a prop `pressed`, as classes `stepper-up`, `stepper-down` e `.stepper__digit`, as quatro regras do aviso nas páginas.
- **Ícones:** nenhum fica sem uso (o `circle-check` segue na confirmação; o `circle-info`, no rodapé e na seção "onde").

---

## 8. Tokens, pares, lógica, dependências e textos

### Tokens novos

| Token | Valor | Uso | Fonte |
|---|---|---|---|
| `--m3-desabilitado-conteudo` | `rgba(24, 29, 23, 0.38)` | Rótulo e ícone do botão desabilitado; o apelido `--color-ink-disabled` passa a apontar para ele | on-surface a 38% ([264], [265], [253], [268]) |
| `--m3-desabilitado-container` | `rgba(24, 29, 23, 0.1)` | Contêiner do filled, do tonal e dos ícones com contêiner desabilitados | on-surface a 10% ([264], [254], [255]) |
| `--m3-camada-inversa-hover` | `rgba(238, 242, 233, 0.08)` | Medida dos pares do aviso no hover (o CSS usa `currentColor`) | a camada de 8% [12] sobre o inverso; como as `--m3-camada-primary-*` |
| `--m3-camada-inversa-pressionada` | `rgba(238, 242, 233, 0.1)` | Medida dos pares do aviso no pressionado | a camada de 10% [12] |

O resto usa o que existe: `--m3-inverse-surface`, `--m3-inverse-on-surface`, `--m3-primary-container`, `--m3-forma-xs`, `--m3-forma-xl`, `--m3-elevacao-1`, `--m3-elevacao-3`, `--m3-scrim`, `--m3-toast-reserva` (6,5rem, agora só do aviso), `--m3-barra-reserva`, `--m3-navegacao-largura`, `--z-toast`, as durações e as molas. As medidas novas sem token são de layout e vêm da pesquisa: `37.5rem` (600 dp [219]) e `40rem` (640 dp [238] [241]). Nenhuma duração, curva ou `z-index` novo. As camadas inversas dão o caso pior para a ação: a `inverse-on-surface` é mais clara que o `primary-container` e clareia mais o fundo (7,56 contra 7,74 no pressionado).

### Pares novos (para `src/utils/contraste.js`, num grupo `PARES_COMPONENTES`; medidos)

| Frente | Fundo | Mínimo | Medido | Onde |
|---|---|---|---|---|
| `m3-primary-container` | `m3-inverse-surface` | 4,5 | 10,13 | Ação "Desfazer" do aviso |
| `m3-primary-container` | `m3-camada-inversa-pressionada` sobre `m3-inverse-surface` | 4,5 | 7,56 | "Desfazer" pressionado (no hover, 8,03) |
| `m3-inverse-on-surface` | `m3-camada-inversa-pressionada` sobre `m3-inverse-surface` | 4,5 | 8,61 | "Fechar aviso" pressionado, com o anel interno (no hover, 9,15) |
| `m3-on-error-container` | `m3-camada-pressionada` sobre `m3-surface-container-high` | 4,5 | 6,26 | Perigo pressionado no card de produto e no diálogo a partir de `md` (no hover, 6,52) |
| `m3-on-error-container` | `m3-camada-pressionada` sobre `m3-surface-container-low` | 4,5 | 6,94 | Perigo pressionado no perfil e no sheet (no hover, 7,23) |
| `m3-on-error-container` | `m3-camada-pressionada` sobre `m3-surface-container-lowest` | 4,5 | 7,65 | "Remover" pressionado (no hover, 7,97) |
| `m3-secondary` | `m3-camada-pressionada` sobre `m3-surface-container-high` | 3 | 4,32 | Anel do perigo e do "Fechar" pressionados no card e no diálogo |
| `m3-on-surface-variant` | `m3-camada-pressionada` sobre `m3-surface-container-high` | 3 | 6,22 | Ícone do "Fechar" do diálogo pressionado (objeto gráfico [98]; passa também de 4,5) |
| `m3-outline` | `m3-surface-container-high` | 3 | 3,65 | Contorno dos campos no diálogo a partir de `md` (observação, `ModalProducts`) e da caixa do seletor de imagem; borda do tonal com `prefers-contrast: more` no card |
| `m3-on-error-container` | `m3-surface-container-high` | 4,5 | 7,61 | Campo com erro no hover, no diálogo a partir de `md` |

### Pares que ganham uso, mudam de grupo ou saem

| Par | Medido | O que acontece |
|---|---|---|
| `m3-inverse-on-surface` sobre `m3-inverse-surface` (`PARES_OUTRAS_TELAS`) | 11,54 | Já está no `contraste.js` (o plano pedia que entrasse; entrou na etapa 1). O "onde" ganha: texto, ícone de erro e "Fechar aviso", e o anel interno dos botões do aviso |
| `m3-on-surface` / `m3-on-surface-variant` / `m3-secondary` sobre `m3-surface-container-high` (`PARES_HOME`, `PARES_ADMIN`) | 13,93 / 7,56 / 5,25 | Ganham o diálogo a partir de `md`: títulos, textos, `dt`, placeholder, ajuda, ícone do "Fechar" e anel. O "aviso (toast)" sai do "onde" do anel |
| `m3-primary` sobre `m3-surface-container-high` e o pressionado (`PARES_ADMIN`) | 5,23 / 4,59 | Ganham o diálogo: campo com foco, CTA filled contra o diálogo (contêiner ≥ 3) e os text buttons |
| `m3-error` sobre `m3-surface-container-high` (`PARES_ADMIN`) | 5,25 | Ganha: campo com erro e perigo no diálogo |
| `m3-on-surface`, `m3-on-surface-variant`, `m3-primary`, `m3-secondary`, `m3-outline`, `m3-error`, `m3-on-error-container` sobre `m3-surface-container-low` (`PARES_HOME`, `PARES_CARRINHO`, `PARES_CONTA`) | 15,49 / 8,41 / 5,82 / 5,83 / 4,06 / 5,84 / 8,46 | Ganham o sheet abaixo de `md` (o Personalizar, o `ModalProducts`, os "Detalhes" e as confirmações) |
| `m3-on-surface`, `m3-on-surface-variant`, `m3-secondary` e `m3-primary` sobre `m3-surface-container` (`PARES_HOME`, `PARES_CARDAPIO`) | 14,68 / 7,97 / 5,53 / 5,52 | O "onde" perde o modal e o diálogo; os outros usos (toolbar, rodapé, categorias, menu do perfil) ficam |
| `m3-outline`, `m3-error` e `m3-on-error-container` sobre `m3-surface-container` (`PARES_CONTA`) | 3,85 / 5,54 / 8,02 | Perdem o uso do diálogo; a sessão C confere com `grep` e, sem outro uso, eles saem |
| `m3-error` sobre `m3-surface-container-lowest` / `-low` (`PARES_CARRINHO`, `PARES_CONTA`) | 6,46 / 5,84 | O "Remover" e o "Excluir conta" em repouso (o mesmo uso) |
| `m3-error` sobre `m3-error-container` (`PARES_OUTRAS_TELAS`) | 4,99 | Perde "Remover do carrinho e Excluir conta no hover e pressionado"; ganha "ícone do erro no diálogo de exclusão" |
| `m3-on-error-container` sobre `m3-error-container` (`PARES_OUTRAS_TELAS`) | 7,23 | Ganha: texto do erro no diálogo de exclusão |
| `m3-on-surface-variant` e `m3-secondary` sobre `m3-camada-pressionada` sobre `m3-surface` e `-low` (`PARES_ADMIN`) | 7,26 / 6,90; 5,03 / 4,78 | Ganham: "Alternar menu" e atalhos pressionados; "Fechar" da gaveta e do sheet pressionado e o anel deles |
| `m3-on-secondary-container` sobre `m3-secondary-container` e as camadas (`PARES_HOME`) | 7,22 / 6,39 / 6,21 | Ganham: os botões do seletor e o "Cancelar" dos diálogos |
| `m3-outline` sobre `m3-surface-container-lowest` (`PARES_CARDAPIO`) | 4,48 | O "onde" muda: a borda do seletor some no modo normal e fica só com `prefers-contrast: more` (no lugar de "borda do QuantityStepper sobre as linhas…") |
| `m3-sucesso` sobre `m3-surface-container-high` (`PARES_TELAS_BRASA`, "ícone de sucesso no toast") | 5,02 | **Sai** na sessão C (o aviso perde o ícone de sucesso) |
| `m3-on-surface` sobre `m3-camada-hover` sobre `m3-surface-container` (`PARES_TELAS_BRASA`, "botão ghost no hover") | — | **Sai** na sessão C (o ghost legado some) |
| Os de `PARES_COMUNS` sobre `color-surface-2` e `color-surface-3` | — | Ficam sem uso na produção (o diálogo e o aviso deixam os apelidos); saem com eles na etapa 11 |

### Medidos e descartados ou isentos

- `m3-secondary` sobre `m3-inverse-surface`: **2,02**. Por isso o anel do aviso é `inverse-on-surface`, por dentro.
- `m3-primary` sobre `m3-inverse-surface`: 2,03. Por isso a ação não fica na tinta do text button comum.
- `m3-primary-container` contra `m3-inverse-on-surface` (ação contra texto): 1,13. A ação se distingue por peso, ícone, posição e camada, e não pela cor (5.1).
- `m3-secondary-container` e `m3-error-container` sobre `m3-inverse-surface`: 10,14 e 10,13. Alternativas possíveis para a ação; ficou o `primary-container`, da paleta do `inverse-primary`.
- `m3-inverse-surface` contra a `surface`, o `surface-container` e o `lowest`: 12,48, 11,23 e 13,09. O aviso se separa da página sem borda.
- `m3-error` sobre `m3-camada-pressionada` sobre `m3-surface-container-high`: **4,32** (4,47 com a camada `error`). Abaixo de 4,5: por isso o perigo escurece no pressionado. No hover, 4,50 (4,62). Nos outros fundos o `error` pressionado passaria (4,79 no `low`, o par da etapa 8; 5,28 no `lowest`; 5,04 na `surface`), mas a regra fica uma só para o perigo em todos os fundos.
- `m3-secondary-container` contra o `lowest`, o `high`, o `low`, o `surface-container` e a `surface`: 1,29, 1,05, 1,16, 1,10 e 1,23. Contêiner de controle com ícone: a 1.4.11 não se aplica [98].
- `m3-surface-container-high` e `-low` contra a `surface`: 1,17 e 1,05. Superfície flutuante, separada pelo `scrim` e pela elevação; não é componente [98].
- `m3-error-container` contra o `high` e o `low`: 1,05 e 1,16. O texto leva o estado [98].
- `m3-outline-variant` contra o `high` e o `low`: 1,38 e 1,53. Divisores decorativos do diálogo [98].
- `m3-outline` sobre `m3-inverse-surface`: 2,91. A borda com `prefers-contrast: more` é lida contra a página (4,27), do lado de fora.
- Desabilitado: o conteúdo sobre o contêiner, de 2,21 a 2,28; sem contêiner, de 2,28 a 2,36 (isento [269] [98]). Composto, o conteúdo dá `#a2a79e` na `surface`, `#9fa39b` no `low`, `#a7a9a7` no `lowest` e `#989b94` no `high`.

### Lógica (nenhuma mudança de fluxo, de serviço, de store persistida nem de handler; só o que a apresentação pede)

| O que | Onde | Por quê |
|---|---|---|
| O aviso expira só sem ação, fora do erro e com `duration > 0`; `runAction(id, event)` devolve o resultado do `onClick` | `src/stores/toast.js` (estado de interface, não persistido) | [217], [219], [227] (4.3) |
| Duas listas vivas fixas; a retenção com um `dialog[open]`; a saída dos que não expiram na troca de rota; a origem e o destino do foco; a última entrada e a rolagem do foco | `AppToast.vue` | [152], [153], [200], [270], [273], [76] (4.1, 4.2, 4.5) |
| Os divisores pela rolagem do corpo; a região de anúncio do diálogo e o `provide` | `BaseDialog.vue` | [234]; [200], [151] |
| A prop `pressed` sai; o `danger` e o `iconOnly` no mapa M3; o `aria-disabled` repassado bloqueia o clique; sai o `aria-busy`; o anúncio do rótulo no `loading` | `BaseButton.vue` | 5.5 a 5.9 |
| `aria-disabled` no limite; sai a transição do número | `QuantityStepper.vue` | [273], [275] |
| `CHAVE_ANUNCIADOR` | `useAnnouncer.js` | 5.7 |
| O erro da exclusão dentro do diálogo; o `alertdialog` | `ProfileView.vue` | [152], [200], [235] |
| O `alertdialog` e a descrição | `ProductManagement.vue`, `AdminSettings.vue` | [235] |
| A região `role="status"` em volta do vazio depois de uma escolha | `MenuView.vue`, `OrderManagement.vue`, `ProductManagement.vue` | [151], [153] |
| O CTA com `aria-disabled`; o aviso da conferência com `duration: 0` | `PaymentView.vue` | [270], [271]; [227] |
| Sai o `duration: 5000` | `CartView.vue` | 4.3 |

Nada muda em `src/services/`, nas stores persistidas (`products`, `adminOrders`, `userStore`, `adminStore`, `cart`), nos dados de exemplo, nas esperas simuladas, nos handlers (`authHandlers.js`), no `router/index.js`, no `useScrollLock`, no `FormGroup.vue` nem no `_auth.scss`. Os estados de envio e de erro valem também com uma API: o erro da exclusão (raro com o `localStorage`, possível com um servidor) aparece no diálogo.

### Dependências

Nenhuma. **Ícones:** nenhum novo; todos já estão no plugin (`xmark`, `minus`, `plus`, `rotate-left`, `trash-can`, `circle-exclamation`, `shopping-cart`, `utensils`, `burger`, `chart-line`, `magnifying-glass`).

### Textos

Todos reais. **Nenhuma palavra muda e nenhum texto entra** (nem `aria-label`). Mudam só apresentações:

| Texto | Antes | Depois | Motivo |
|---|---|---|---|
| "Não foi possível excluir a conta. Tente de novo." | No aviso, atrás do fundo do diálogo | No banner dentro do diálogo | 5.2 |
| "Desfazer" | Botão tonal, some em 5 s | Text button, fica até a pessoa agir, fechar ou sair do carrinho | 5.1, 4.3 |
| "O carrinho foi atualizado com o cardápio. Confira o pedido antes de confirmar." | Some em 4 s | Fica até a pessoa fechar ou sair | 4.3 |
| Títulos dos diálogos | title-l 700 | headline-s 400 | [229] |
| Títulos dos estados vazios | `--text-lg` 700, centrados | title-l 500, alinhados ao início | SPEC-M §4.2 |

**Perguntas de texto ao usuário:** nenhuma.

---

## 9. Arquivos para o construtor (sessão C)

```
src/assets/styles/base/_tokens.scss                        --m3-desabilitado-conteudo, --m3-desabilitado-container,
                                                           --m3-camada-inversa-hover, --m3-camada-inversa-pressionada;
                                                           --color-ink-disabled: var(--m3-desabilitado-conteudo)
src/assets/styles/base/_motion.scss                        .toast, .dialog e .btn__spinner na lista de transform: none
src/stores/toast.js                                        expira só sem ação, fora do erro e com duration > 0;
                                                           runAction(id, event) devolve o resultado
src/composables/useAnnouncer.js                            CHAVE_ANUNCIADOR
src/components/ui/AppToast.vue                             duas listas vivas fixas, retenção com dialog[open], saída
                                                           na troca de rota, foco pelo teclado, rolagem do foco,
                                                           ícone só no erro, ação ghost
src/assets/styles/components/ui/_app-toast.scss            inverse-surface, forma-xs, elevacao-3, body-m, padding,
                                                           largura; botões repintados e anel interno; posição no pé
                                                           (below(lg) com a toolbar); a reserva por contagem no html
                                                           e no body (:global, @each); entrada e saída
src/components/ui/BaseDialog.vue                           divisores pela rolagem, região de anúncio e provide
src/assets/styles/components/ui/_base-dialog.scss          high e low, formas, elevações, altura automática com
                                                           teto, 640 no sheet, headline-s, espaços, divisores
                                                           transparentes, scroll-padding-block, reserva-de-sombra
src/components/ui/EmptyState.vue                           (marcação de hoje)
src/assets/styles/components/ui/_empty-state.scss          início, ícone, title-l 500, body-m, espaços
src/components/ui/QuantityStepper.vue                      aria-disabled no limite; sem Transition
src/assets/styles/components/ui/_quantity-stepper.scss     title-m 500 tabular, 2ch, sem transição
src/components/ui/BaseButton.vue                           sem pressed e sem legado; perigo; aria-disabled
                                                           repassado bloqueia; sem aria-busy; anúncio do rótulo
src/assets/styles/components/ui/_base-button.scss          as linhas de 5.9 (sai o legado; entram perigo, ícone,
                                                           desabilitado, loading neutro, tonal com mais contraste)
src/views/CartView.vue                                     lg no "Ver cardápio" do vazio; sem duration
src/views/MenuView.vue                                     região de status em volta do vazio
src/views/PaymentView.vue                                  aria-disabled no CTA; duration: 0 na conferência
src/views/auth/ProfileView.vue                             alertdialog, id do texto, região de alerta e banner;
                                                           erro na ref, e não no aviso
src/views/admin/ProductManagement.vue                      alertdialog, id do texto; região de status no vazio
                                                           da categoria
src/views/admin/OrderManagement.vue                        EmptyState em dois (com e sem busca)
src/views/admin/AdminSettings.vue                          alertdialog, id do texto
src/assets/styles/pages/_cart-page.scss                    sai a regra do aviso (L7–21)
src/assets/styles/pages/_payment.scss                      sai a regra do aviso (L7–18)
src/assets/styles/pages/auth/_profile.scss                 sai a regra do aviso (L8–21); entram o anúncio e o
                                                           banner do diálogo
src/assets/styles/layouts/_admin-layout.scss               saem as três regras do aviso (L75–95); entra o início
                                                           da região depois da coluna a partir de lg
src/assets/styles/components/admin/_modal-products.scss    borda do botão de imagem com prefers-contrast: more
src/utils/contraste.js                                     PARES_COMPONENTES (10), os "onde" e as saídas da §8
```

**Não mexer:** `BurgerStack.vue`, `AssinaturaEncaixe.vue`, `src/direcoes/`, `src/services/`, as stores persistidas, os dados de exemplo, os handlers, `src/router/index.js`, `App.vue`, `FormGroup.vue`, `_auth.scss`, `_form-group.scss`, `ModalAdditional.vue`, `ModalProducts.vue` (só a parcial), `CartItem.vue`, `AdditionalsList.vue`, os arquivos do painel fora dos listados e o plugin do Font Awesome.

**Testes:**

- `src/__tests__/AppToast.test.js` (atualizado; montado com um router de teste, por causa do `useRoute`):
  - as duas listas existem vazias na montagem: `[role=status][aria-atomic=false]` e `[role=alert][aria-atomic=true]`, e o aviso nasce dentro da lista do seu tipo, sem `role` próprio;
  - o de sucesso some em 4000 ms (fake timers) e pausa no hover e no foco (hoje);
  - **o de ação e o de erro não somem** depois de 10 s; o de `duration: 0` também não;
  - a troca de rota tira os que não expiram e mantém os de 4 s;
  - o "Fechar aviso" pelo teclado (`click` com `detail: 0`) põe o foco no botão do aviso seguinte; sem outro, na origem; sem origem, no `#conteudo`; pelo ponteiro (`detail: 1`), não move o foco;
  - a ação recebe o evento; com o foco perdido depois dela, vale a mesma regra;
  - **a retenção:** com um `dialog[open]` no documento, o aviso novo não é renderizado e não corre o tempo; depois do evento `close` desse `dialog`, ele aparece e o tempo começa;
  - só o erro tem o `.toast__icon`; a ação é `ghost` (`m3-botao--texto`); no máximo 3 (hoje).
- `src/__tests__/BaseDialog.test.js` (novo): o `showModal` é chamado ao abrir (simulado no jsdom); o foco inicial no `[autofocus]`, senão no primeiro controle do corpo, senão no título; o Tab do último volta ao primeiro e o Shift+Tab do primeiro vai ao último; o `cancel` (Esc) emite `close`; o clique que começa e termina no `<dialog>` emite `close`, e o que começa no painel não; ao fechar, o foco volta a quem abriu, se ele ainda está no documento; `role` e `aria-describedby` repassados chegam ao `<dialog>`; as classes `is-rolado` e `tem-mais` com o `scrollTop`, o `clientHeight` e o `scrollHeight` simulados; a região `role="status"` existe vazia.
- `src/__tests__/QuantityStepper.test.js` (novo): `role="group"` com "Quantidade de {label}"; "Diminuir {label}" e "Aumentar {label}"; no mínimo, o (−) tem `aria-disabled="true"` e não tem `disabled`; no máximo, o (+); com o foco no (−) e cliques até o mínimo, o `document.activeElement` continua o (−); o clique no limite não emite; o `output` com `aria-live="polite"` mostra o valor; nenhum `<Transition>`.
- `src/__tests__/EmptyState.test.js` (novo): raiz `div.empty-state` sem `role`; ícone `aria-hidden`; título em `p` e nenhum `h1` a `h6`; o texto só com a prop; o slot `action`.
- `src/__tests__/BaseButton.test.js`: sai "pressed vira aria-pressed"; "em loading marca aria-busy…" vira "em loading mostra o spinner, bloqueia o clique, trava a largura e não põe `aria-busy`"; entram: `danger` → `m3-botao--perigo` sem `btn--legado`; `iconOnly` → `m3-botao`, a variante e `btn--icon-only`; o `aria-disabled="true"` repassado bloqueia o handler e não põe `disabled`; o anúncio do rótulo que muda (espião no `announce`) e nenhum anúncio quando ele não muda; dentro de um `BaseDialog`, o anúncio vai à região do diálogo. O caso "variantes geram as classes do mapa M3; danger, iconOnly e pressed ficam com a forma de hoje" troca a expectativa.
- `src/__tests__/componentes-estilo.test.js` (novo, no padrão do `admin-estilo.test.js` e do `conta-estilo.test.js`, com as parciais compiladas pelo `sass-embedded` e pelo `<style scoped>`):
  - aviso: `--m3-inverse-surface`, `--m3-inverse-on-surface`, `--m3-forma-xs`, `--m3-elevacao-3`, nenhum `border-left`; o `transform` da entrada só dentro de `prefers-reduced-motion: no-preference`; a posição com `.m3-ferramentas` dentro de `max-width` de `lg`; as regras de reserva para 1, 2 e 3 avisos, no `html` e no `body`; o anel por dentro em `--m3-inverse-on-surface`;
  - diálogo: `--m3-surface-container-high` a partir de `md` e `--m3-surface-container-low` abaixo; `max-width: 40rem` no sheet; nenhuma `height` fixa com `100dvh`; `scroll-padding-block`; título com `--m3-headline-s` e peso 400; divisores transparentes e `--m3-outline-variant` com `.is-rolado` e `.tem-mais`;
  - vazio: `align-items: flex-start`, `--m3-title-l` com 500, `--m3-body-m`;
  - seletor: nenhuma `transition` nem `transform`;
  - botão: nenhum `.btn--legado`; `.m3-botao--perigo` com `--m3-error` e `--m3-on-error-container` no hover e no `:active`; os tamanhos do `.btn--icon-only`; o desabilitado com os tokens novos e `GrayText`; o tonal com borda `--m3-outline` em `prefers-contrast: more`;
  - nenhum `--color-*`, `--elev-*`, `--radius-*` nem `--text-*` nas cinco parciais;
  - o `_motion.scss` com `.toast`, `.dialog` e `.btn__spinner`;
  - as quatro parciais das páginas sem `.toast-region`; o `_admin-layout.scss` com a regra da coluna;
  - todos os pares de `PARES_COMPONENTES` acima do mínimo.
- **Testes de hoje que mudam:**
  - `moldura-estilo.test.js` (L124–134): o aviso acima da toolbar abaixo de `lg` (e não de `md`); sem o `top` a partir de `md`;
  - `carrinho-estilo.test.js` (L112–140): o token `--m3-toast-reserva` fica (o caso da L112); as regras `html:has(.cart-page)…` e `.payment-page` saem, e o caso vai para o `componentes-estilo.test.js`;
  - `conta-estilo.test.js` (L335–343): sai o caso da reserva do perfil;
  - `admin-estilo.test.js` (L200–208): saem as três asserções do aviso; entra a da coluna;
  - `base-button-estilo.test.js` (L137–138 e os do legado): o desabilitado com os tokens novos; sem o legado;
  - `ProfileView.test.js`: o erro da exclusão aparece no banner do diálogo (`[role=alert]` dentro do `dialog`), e nenhum aviso nasce; o diálogo tem `role="alertdialog"` e `aria-describedby` com o texto;
  - `PaymentView.test.js`: o CTA tem `aria-disabled="true"` (e não `disabled`) até ser válido, e o clique não envia; o aviso da conferência não expira;
  - `MenuView.test.js`, `OrderManagement.test.js`, `ProductManagement.test.js`: a região de status em volta do vazio (vazia com itens; com o vazio dentro sem itens); com busca, o vazio fora dela;
  - `adminPanel.test.js` (se cobre as Configurações): o `alertdialog`;
  - `CartView.test.js`: sem mudança de expectativa (o `runAction` sem evento continua funcionando).

**e2e (`.claude/e2e/`):**

- `lacunas.mjs` (L57): as expectativas pelas durações lidas do `:root` (`--dur-slow` no sheet, `--dur-base` no fundo; `--dur-fast` nos dois com movimento reduzido), e o texto da checagem sem "240ms". A falha antiga (fundo em 250 ms) some.
- `keyboard.mjs`:
  - **foco preso nas confirmações:** em 1440 e em 390, "Excluir produto?" (painel) e "Excluir conta?" (perfil): o foco inicial no título; 12 Tabs e Shift+Tabs sem sair do `dialog`; a ordem título → "Fechar" → "Cancelar" → ação; o Esc devolve o foco ao botão de origem (o da etapa 9 e o do perfil);
  - **o seletor no limite:** no item do carrinho, foco no "Diminuir", Enter até 1: o `document.activeElement` é o mesmo botão, com `aria-disabled="true"`; Enter de novo não muda o número;
  - **o "Fechar aviso" pelo teclado:** depois de remover um item, Tab até o "Fechar aviso" e Enter: o foco não fica no `body` (vai à origem);
  - **o aviso com ação não some:** depois de 6 s, o "Desfazer" continua na tela e alcançável pelo Tab;
  - **três avisos:** três remoções seguidas pelo teclado em 390 × 844: o "Remover" focado não cruza nenhum `.toast` (o `cobertoPor` de hoje);
  - o `focusNotCovered` de hoje com o aviso no pé de 768 a 1023 na loja.
- `axe-scan.mjs`: o `payment-enviando` passa a exigir `.order-summary__cta .btn.is-loading` (L102, era `[aria-busy="true"]`); os estados abaixo.
- `flow.mjs`: L52, L199 e L223 conferem a classe `is-loading` e o texto, e não o `aria-busy`; L216–218, o CTA com `aria-disabled="true"`, e não `disabled`.
- `tokens-contrast.mjs` (L29–30): a linha informativa do desabilitado passa a medir `m3-desabilitado-conteudo` composto sobre `m3-desabilitado-container` sobre a `surface` (com `medirPar`), em vez do `color-ink-disabled` cru, que vira `rgba`.
- `check-admin.mjs`, `micro-final.mjs`: sem mudança (o `.stepper__value` continua).

**Estados para o axe** (em 1440 e 390, com e sem movimento reduzido):

| Nome | Passos | Seletor estável |
|---|---|---|
| Aviso de sucesso | `#/profile` com a sessão → "Salvar alterações" | `.toast-region__list--status .toast` com "Dados salvos." |
| Aviso de erro | `#/profile` → falha simulada no salvar (o teste de hoje que força o erro, ou um `localStorage` cheio) | `.toast-region__list--alert .toast .toast__icon` |
| Aviso com "Desfazer" | `#/cart` com itens → "Remover Cheese Bacon" | `.toast .toast__action` com "Desfazer" |
| Três avisos | `#/cart` com três itens → três "Remover" | `.toast-region .toast + .toast + .toast` |
| Aviso no painel | `#/admin/orders` → "Atualizar status" | `.toast-region .toast` com "Pedido #1" |
| Confirmação no perfil | `#/profile` → "Excluir conta" | `dialog[open][role="alertdialog"] #excluir-conta-titulo` |
| Erro no diálogo de exclusão | o anterior → exclusão com falha simulada | `dialog[open] .profile-delete__erro` |
| Excluir produto | `#/admin/products` → primeiro "Excluir" | `dialog[open][role="alertdialog"] #excluir-produto-titulo` |
| Restaurar | `#/admin/settings` → "Restaurar cardápio original" | `dialog[open][role="alertdialog"] #restaurar-titulo` |
| Detalhes do pedido | `#/admin/orders` → primeiro "Detalhes" | `dialog[open] #pedido-detalhes-titulo` |
| `ModalProducts` | `#/admin/products` → "Novo produto" | `dialog[open] #produto-titulo` |
| Personalizar | `#/menu` → "Adicionar Cheese Bacon" | `dialog[open] #personalizar-titulo` |
| Carrinho vazio | `#/cart` sem itens | `.cart-page .empty-state` |
| Cardápio vazio | categoria esvaziada pelo painel → `#/menu` nela | `.menu-page [role="status"] .empty-state` |
| Perfil sem pedidos | `#/profile` com a sessão sem pedidos | `.profile-page .empty-state` |
| Pedidos sem resultado | `#/admin/orders?status=…` sem pedidos; e `?q=zzz` | `.order-management .empty-state` |
| Produtos sem resultado | `#/admin/products?q=zzz` | `.product-management .empty-state` |
| Gráfico do Painel | `#/admin` | `.dashboard__chart .empty-state` |
| Seletor no mínimo | `#/cart` com um item de quantidade 1 | `.stepper button[aria-disabled="true"]` |
| Seletor no máximo | `#/menu` → bebida → "Aumentar" até 10 | `dialog[open] .stepper button[aria-disabled="true"]` |
| Pagamento enviando | `#/payment` válido → "Confirmar pedido" | `.order-summary__cta .btn.is-loading` |
| Pagamento sem forma | `#/payment` sem escolher | `.order-summary__cta .btn[aria-disabled="true"]` |
| "Atualizar status" desabilitado | `#/admin/orders?status=completed` | `.order-actions button:disabled` |

**Capturas do acervo (§11.4 do SPEC-M; o efeito aceito):** no `yarn dev`, em 1440 e 390, o Personalizar aberto e um aviso (o "Desfazer" depois de adicionar e remover pelo carrinho, ou um aviso forçado pela store no console) dentro de `#/direcoes/esqueumorfismo`, `#/direcoes/neumorfismo` e `#/direcoes/material`, comparados com `capturas\acervo-antes\`: mudam só o modal (agora `high`/`low`, título headline-s) e o aviso (agora `inverse-surface`, no pé).

**O que a sessão C mede (o desenho estimou pelo CSS):**

- a altura do aviso com uma, duas e três linhas (52, 72 e 92) e se o "Cheese Bacon removido." cabe numa linha com o "Desfazer" de texto em 390;
- a rolagem do corpo do diálogo com a altura automática (o painel estica na altura do `<dialog>` com `max-height`);
- o sheet de "Excluir conta?" em 390 (cerca de 260 px);
- a ordem do agendador no "Conta excluída." (a retenção o mostra depois do `close`);
- o anúncio do "Desfazer" e do `loading` num leitor de tela;
- o `forced-colors` e o `prefers-contrast: more` do aviso, do diálogo e do tonal.

**SPEC-M (no mesmo PR):** a §4.1 (as linhas `danger`, `iconOnly`, `loading` e `pressed` do mapa: desenhados; o `pressed` sai); a §4.2 (as linhas `QuantityStepper`, `AppToast`, `EmptyState` e `BaseDialog`: "desenhado e construído na etapa 10", com o resumo); a §6 (as linhas do filled, do tonal e do texto no desabilitado e no carregando, o `QuantityStepper` com `aria-disabled`, o `AppToast`); a §7.7 (o aviso com escala e opacidade; o seletor com troca direta); a §2.2 (a regra "Desabilitado" com os tokens novos; o `inverse-surface` em uso; o perigo que escurece para `on-error-container`); a §2.5 (`forma-xs` no aviso); a §2.6 (`elevacao-3` no aviso e no diálogo, `elevacao-1` no sheet); a §2.8 (o `--dur-instant` sem uso); a §5.5 (o "Desfazer" sem prazo, no lugar de "por 5 s" do `SPEC.md`); a §5.6 (o CTA com `aria-disabled`). **CLAUDE.md:** a linha dos componentes base (o `BaseButton` deixa de ter `danger`, `iconOnly` e `pressed` na forma da Brasa; sai o `.btn--legado`). **README e TESTING:** os testes novos e a contagem.

---

## 10. Referências usadas

| Ref. | Publicado ou conceito | Padrão abstraído | Onde entra |
|---|---|---|---|
| [216] a [219] Snackbar (Compose, KDoc, `SnackbarHost`) | conceito (documentação e código) | Aviso breve no pé; uma ação; com ação, não expira; mover o foco não é ação; `Short` de 4 s; fila de um por vez | Aviso, tempo, fila |
| [220], [221] `SnackbarTokens`, `ShapeTokens` | conceito (tokens) | `InverseSurface`, `InverseOnSurface`, `InversePrimary`; canto 4; `Level3`; 48 e 68 dp | Visual do aviso |
| [222], [223] Flags e `Scaffold` | conceito (código) | Centrado, acima do FAB ou da barra; o layout em transição | Posição |
| [224] Snackbar (MDC) | conceito (documentação) | Mesmas cores; preso ao pé; um por vez, o novo troca o velho | Posição, fila descartada |
| [225], [226] Tempo de acessibilidade (Android) | conceito | O tempo recomendado por pessoa; não há equivalente na web | Risco do tempo |
| [227] 2.2.1 (W3C) | referência técnica | O aviso é limite de tempo, salvo se a informação estiver em outro lugar; desligar é melhor | Tempo por tipo |
| [228] a [234] Diálogos (Compose, MDC, material-web) | conceito (documentação, tokens e código) | `SurfaceContainerHigh`, canto 28, `Level3`; 280 a 560; padding 24; headline-s; ações ao fim; divisores com rolagem; clique fora fecha | Contêiner do diálogo |
| [235] Alert dialog (APG) | referência técnica | Papel `alertdialog`, descrição ligada, para confirmações | Confirmações |
| [236] a [241] Bottom sheet (Compose, MDC) | conceito | `SurfaceContainerLow`, 28 em cima, `Level1`, 640, alça opcional com ações, scrim de 32% | Sheet |
| [242], [243], [244] Estado vazio (Wear OS, Material 1, NN/g) | conceito e praticante | Chamada à ação; imagem sutil; vazio depois do filtro como mensagem; caminhos diretos | Estado vazio |
| [245] a [259] Botões de ícone (Compose, tokens, material-web, MDC) | conceito | Padrão, tonal, filled; tamanhos XS a XL; redondo; troca de forma; desabilitado a 38%; `soft-disabled` | `iconOnly`, seletor |
| [260] a [263] Progresso e `aria-busy` | conceito e referência técnica | Circular centrado no que carrega; `aria-busy` para regiões e widgets | `loading` |
| [264] a [268] Botões e desabilitado (tokens, `Button.kt`, M3 no Compose) | conceito | Contêiner 10% e conteúdo 38%; "on-x" com alfa | Desabilitado |
| [269] 1.4.3 (W3C) | referência técnica | Componente inativo sem requisito de contraste | Isenção |
| [270], [271], [272], [273] Teclado (APG), `aria-disabled` e `disabled` (MDN), HTML Standard | referência técnica | Foco perdido; `aria-disabled` para manter descobrível; o foco vai ao viewport quando o focado fica `disabled` | Limite do seletor, CTA do pagamento |
| [274], [275] Spinbutton e exemplo de quantidade (APG) | referência técnica | `aria-disabled` no limite; botões fora do Tab; falhas no toque | Seletor |
| [199], [200], [202] Diálogo modal, H102, F85 (W3C) | referência técnica | Fundo inerte; foco inicial em passo difícil de desfazer; devolução | Diálogo, retenção do aviso |
| [151], [152], [153] 4.1.3, ARIA19, ARIA22 (W3C) | referência técnica | Região que existe antes da mensagem; `aria-atomic`; "ocupado" como status | Listas do aviso, vazio, `loading` |
| [76], [77], [78] 2.4.11, 2.3.3, 2.5.8 (W3C) | referência técnica | Foco não coberto (C43); opacidade não é movimento; alvo | Reserva, troca de forma, alvo |
| [96], [98], [99] 4.1.2, 1.4.11, 1.4.1 (W3C) | referência técnica | Controle nativo; contêiner com ícone dispensa borda; pista além da cor | Botão de imagem, tonal, ícone de erro |
| [90] Botão (APG) | referência técnica | Rótulo fixo no toggle | `pressed` |
| [54] Button groups (Compose) | conceito | O grupo padrão comprime os vizinhos | Seletor sem grupo |
| [58] Loading indicator (Compose) | conceito | Experimental, esperas curtas | O arco fica |
| [1], [7], [10], [12], [19], [30] (rodada 1) | documentação oficial | Opacidade só no desabilitado; formas; elevação; camadas; botão S de 44; anel | Sistema |
| [166], [198] Scrim e elevação (tokens) | conceito | 0,32; níveis em dp | Diálogo, aviso |

**Recorrência:** nenhum padrão desta etapa tem 3 exemplos publicados novos. As decisões vêm da documentação, dos tokens e do código do M3 e das referências do W3C; a pesquisa da etapa não abriu apps publicados.

---

## 11. Riscos e como o desenho responde

| Risco | Resposta |
|---|---|
| O aviso com ação ficar na tela para sempre | Sai pela ação, pelo "Fechar aviso", pela troca de rota e quando um quarto aviso o empurra (4.3). É o comportamento que o Compose dá ao aviso com ação [217] [218]; a reserva no pé (4.5) impede que ele cubra o foco |
| O "Desfazer" no fim da ordem do Tab | Sem prazo, ele fica alcançável; o leitor de tela ouve a mensagem e o rótulo pela lista viva (4.2). Montar o aviso noutro ponto do DOM tiraria o aviso das Homes do acervo (§11.4 do SPEC-M exige o real) |
| A mudança do "por 5 s" do `SPEC.md` | Decisão de tempo do aviso, que o pacote deixa ao desenho (item 6.c), com [217], [219] e [227]; a sessão C atualiza a §5.5 do SPEC-M |
| O `primary-container` na ação parecer verde claro demais ao lado do texto claro | A ação tem peso, ícone, posição e camada (1,13 de diferença de cor); a alternativa sourced é o `inverse-primary`, que depende do usuário (§12) |
| A reserva por contagem não cobrir um aviso de 4 linhas (nome de produto de 60 caracteres em 390) | Os nomes reais têm até 20 caracteres; um nome criado no painel com mais de cerca de 50 passa da reserva em cerca de 8 px; a rolagem do foco depois do aviso (4.5) ainda o tira de baixo quando a página tem para onde rolar. Risco aceito; a sessão C mede |
| Duas listas vivas separarem o erro dos outros avisos | O erro fica embaixo, perto da borda e mais visível; a ordem por tipo, e não por tempo, só aparece com erro e sucesso juntos, o que é raro |
| O leitor de tela não ler o "Desfazer" no anúncio | A mensagem é o essencial; o rótulo depende do leitor. A sessão C ouve (4.2) |
| A retenção atrasar um aviso legítimo | O aviso só espera enquanto um diálogo modal está aberto, quando ele não seria visto nem ouvido [200]; é solto no `close` ou na troca de rota |
| A inferência sobre o "Conta excluída." (o aviso nasce com o diálogo aberto) estar errada | A retenção resolve os dois casos (aberto ou já fechado); a sessão C confere num teste |
| O `dialog[open]` como sinal de modal | Todos os diálogos do projeto são o `BaseDialog` com `showModal()`; um `<dialog>` não modal no futuro pediria trocar por `:modal` |
| O perigo trocar de cor no hover parecer outro botão | A troca é para o `on-error-container`, da mesma família, e é a do campo com erro no hover (etapa 8); medida (5.5) |
| Os pares do diálogo mudarem de fundo | Medidos todos nos dois fundos (§8); o contorno do campo cai de 3,85 para 3,65 no `high`, ainda acima de 3 |
| O `outline` dos campos no `high` (3,65) ficar perto do limite | Acima de 3 [98]; o rótulo e a ajuda identificam o campo |
| O sheet de altura automática pular quando o conteúdo muda (o erro do `ModalProducts`) | Ele cresce até o teto, e o corpo rola depois; a sessão C mede no `ModalProducts` com erro em 390 |
| Sem alça no sheet | O "Fechar" fica no cabeçalho, o Esc e o fundo fecham [199]; a alça sem gesto seria uma promessa falsa |
| O `aria-disabled` no seletor ser lido de forma diferente pelos leitores | O estado vem do ARIA [207]; o foco não se perde, que é o problema maior [273] |
| Tirar o `aria-busy` quebrar quem o usa | Ninguém o lê fora dos testes e do e2e, que mudam (§9); o anúncio do rótulo cobre o "ocupado" [151] |
| O CTA do pagamento no Tab enquanto indisponível confundir | É o uso que o MDN dá ao `aria-disabled` [271]; a ajuda é lida no foco; o visual é o do desabilitado |
| A região de status do vazio anunciar a cada seta no Cardápio | Só anuncia quando a categoria fica vazia, o que só acontece se o painel esvaziar uma; nas categorias com itens, ela fica vazia |
| O ícone de 20 px no botão de ícone, contra os 24 do M3 | Desvio registrado (5.6), com o precedente do campo e do painel |
| O `EmptyState` alinhado ao início no card do gráfico deixar espaço vazio à direita | O card fica mais baixo (cerca de 150 px) e se lê como os KPIs acima, alinhados ao início |
| A troca direta do número parecer seca | O retorno é a troca de forma do botão; o odômetro saiu do sistema (SPEC-M §7.8) |
| O `body` com `padding-bottom` mostrar uma faixa clara depois da assinatura enquanto há aviso | Abaixo de `lg`, a loja já tem essa faixa (a reserva da toolbar); só aparece no fim da página e enquanto há aviso |

---

## 12. Decidido e fora

**Decidido (item 6 do pacote):**

- **a.** Aviso em `inverse-surface` / `inverse-on-surface` (11,54), `forma-xs`, `elevacao-3`, body-m, padding 4/8/4/16, 52/72/92 px com 1/2/3 linhas, largura do conteúdo até 600 (a da região abaixo de `sm`) [219] [220] [224]; sem ícone de sucesso nem de info; o erro com o `circle-exclamation` em `inverse-on-surface` [99]; a ação como text button em `primary-container` (10,13), com o `inverse-primary` como pergunta; o "Fechar aviso" como ícone padrão em `inverse-on-surface`; o anel dos dois por dentro, em `inverse-on-surface` (o `secondary` mede 2,02).
- **b.** No pé em todas as larguras, centrado na área de conteúdo, acima da toolbar abaixo de `lg` [223] [224]; no painel a partir de `lg`, depois da coluna. O `AppToast` absorve as quatro regras das páginas numa regra que conta até 3 avisos, no `scroll-padding-bottom` e no `padding-bottom` do `body` [76]; saem as regras de `_cart-page`, `_payment`, `_profile` e `_admin-layout`; o `--m3-toast-reserva` fica com o aviso.
- **c.** 4 s sem ação (o `Short` [218]); com ação, de erro ou com `duration: 0`, até a pessoa agir, fechar ou trocar de rota [217] [219] [227]; até 3 empilhados, o mais antigo sai; duas listas vivas fixas (`status` com `aria-atomic="false"` e `alert` com `aria-atomic="true"`) [152] [153]; o foco depois do "Fechar aviso" e da ação, pelo teclado, ao aviso seguinte, à origem ou ao `main` [270]; o "Desfazer" continua levando o foco ao "Remover" no `CartView`; o aviso que nasce com um diálogo aberto espera o `close` [200]; o erro da exclusão vai para dentro do diálogo; o `toast.js` muda como em 5.1.
- **d.** Entrada por opacidade e `scale(0.8)` a partir do pé, saída inversa [218], com os tokens de mola do projeto; reduzido, só opacidade; `.toast` no `_motion.scss`; nada de barra de tempo.
- **e.** Diálogo em `surface-container-high`, canto 28, `elevacao-3`, `scrim` [229] [231] [232]; título headline-s 400 no início [229] [230]; "Fechar" de ícone padrão; divisores só com rolagem [234]; corpo com padding 24 e `scroll-padding-block` de 16; rodapé com as ações ao fim, o seguro antes; a `maxWidth` e os valores de hoje; os pares das telas medidos de novo nos dois fundos.
- **f.** Abaixo de `md`, sheet em `surface-container-low`, 28 só em cima, `elevacao-1`, até 640 px, **na altura do conteúdo** até `100dvh − 32 px`, sem alça, rodapé fixo com a área segura [237] [238] [241].
- **g.** O foco inicial de hoje (nas confirmações, o título [199]); Tab preso; Esc e fundo emitem `close`; devolução a quem abriu [200]; as confirmações com `role="alertdialog"` e a descrição ligada [235]; os movimentos de hoje, com o `lacunas.mjs` lendo `--dur-slow` e `--dur-base` (0,4 s e 0,25 s).
- **h.** Vazio alinhado ao início; ícone de 32 px em `on-surface-variant`, solto; título `<p>` em title-l 500; texto body-m; ação de quem usa, com o "Ver cardápio" do carrinho em filled M; anúncio por uma região `role="status"` fixa só depois de uma escolha (Cardápio, Pedidos e Produtos sem busca) [151] [153]; com busca, fora da região.
- **i.** Dois botões de ícone tonais redondos de 44 px [255] [249] [245], 8 px de vão, número title-m 500 tabular em 2ch, troca direta; o tonal contra o fundo é isento [98]; **no limite, `aria-disabled`** [273] [270] [275]; sem spinbutton; a §6 do SPEC-M muda.
- **j.** `danger` com uma forma só: text button em `error` que vai a `on-error-container` com a camada no hover e no pressionado (no `high`, 4,32 viraria 6,26); sem filled `error` nos diálogos [232]; os pares por fundo em 5.5.
- **k.** `iconOnly` pelo Expressive: `ghost` → padrão em `on-surface-variant`, `secondary` → tonal, `primary` → filled, `danger` → padrão em `error`; `sm` 40 com alvo de 44, `md` 44, `lg` 56; redondo, pressionado em `forma-s` (`lg`: `forma-m`) no tonal e no filled [249] [250]; ícone de 20 px (24 no `lg`); o selo dos atalhos no lugar.
- **l.** O arco de hoje, `1em`, `currentColor`, antes do rótulo [260]; as cores do repouso, hover e pressionado neutros; sem `aria-busy` [207] [263]; o rótulo novo anunciado na região viva do diálogo ou do `App.vue` [151]; a largura travada; reduzido, o arco parado.
- **m.** Desabilitado com `--m3-desabilitado-container` (on-surface 10%) e `--m3-desabilitado-conteudo` (on-surface 38%), em `rgba` [264] [268]; o `--color-ink-disabled` aponta para o segundo; isento [269] [98]; `GrayText` nas cores forçadas; `aria-disabled` no seletor e no CTA do pagamento, `disabled` no resto [270] [271].
- **n.** A prop `pressed` sai, com o teste dela.
- **o.** O `.btn--legado` sai inteiro (a tabela de 5.9); o `sm` volta ao alvo de 44; sai o aperto por `translateY`.
- **p.** O botão de imagem do `ModalProducts` fica `<label>` [96]; só ganha a borda do tonal com mais contraste.
- **q.** Modos de contraste pela tabela de 4.6: bordas `CanvasText` nas superfícies que flutuam, `ButtonText` nos botões, `GrayText` no desabilitado, `outline` no tonal com mais contraste.
- **r.** Foco não coberto: a reserva por contagem no `scroll-padding` e no fim da página, a rolagem do foco depois de cada aviso, o corpo do diálogo como contêiner de rolagem com folga, e o aviso sempre acima da toolbar [76].

**Para a etapa 11:**

- apagar os apelidos que perdem o último uso nesta etapa (`--color-surface-4`, `--color-danger-soft`, `--color-overlay`, `--elev-3`, `--radius-lg`, `--color-info`, `--color-danger`) e os que ficam só nas folhas que ela apaga (seção 7);
- trocar `var(--color-ink-disabled)` por `var(--m3-desabilitado-conteudo)` no `_form-group.scss` (e não por `#a2a79e`);
- decidir o `--dur-instant`, sem uso;
- tirar os pares de `PARES_COMUNS` do modal e do aviso.

**Fora:**

- barra de tempo no aviso, aviso com título, mais de uma ação por aviso, deslizar para dispensar, atalho de teclado para o "Desfazer";
- alça e gesto de arrastar no sheet; estado parcialmente aberto;
- ilustração ou círculo no estado vazio; texto novo de vazio;
- spinbutton no seletor; segurar para repetir (o Compose repete a cada 100 ms [245], mas é função nova);
- o loading indicator do Expressive; progresso com porcentagem;
- o toggle (`pressed`); o botão de ícone outlined (sem uso);
- o filled `error` como botão destrutivo.

**Perguntas ao usuário (o que só ele decide):**

1. **O papel `inverse-primary` para a ação do aviso.** O M3 pinta a ação do snackbar em `inverse-primary` [220] [224], papel que os tokens do projeto não têm. Opções:
   - (a) usar o `primary-container`, que já existe, da mesma paleta primária, medido em 10,13 sobre o aviso (e 7,56 pressionado);
   - (b) gerar o `--m3-inverse-primary` com o mesmo gerador do esquema (`@material/material-color-utilities` 0.4.0, TonalSpot, semente `#5DBB63`, rodado fora do projeto, como o esquema claro foi), sem escrever o valor à mão, e medir de novo. Não encontrei no dossiê o tom que o gerador dá a esse papel.

   **Recomendo (a):** nenhuma cor nova, o par medido com folga, e a ação já se distingue do texto pelo peso, pelo ícone e pela posição. O desenho funciona com as duas; com (b), muda só o valor da `color` do `.toast__action` e os dois pares da ação.

---

## 13. Revisão

A preencher pela sessão principal.
