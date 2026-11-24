# Desenho do Login, do Cadastro, do Perfil e do campo de formulário: Material 3 Expressive (etapa 8)

23/11/2026. Desenho das três telas da conta, o Login (`#/login`), o Cadastro (`#/register`) e o Perfil (`#/profile`), e do campo de formulário `FormGroup`, que elas usam e que aparece também no login do admin, nos filtros e no `ModalProducts` do painel e na observação do modal Personalizar. A Home (etapas 5 e 5a), a moldura (etapa 4), o Cardápio e o modal (etapa 6) e o Carrinho, o Pagamento e a Confirmação (etapa 7) já estão no M3.

Fontes: `docs/direcoes/SPEC-material.md` (SPEC-M); `SPEC.md` (a Brasa, para o fluxo e os textos); `docs/direcoes/desenho/carrinho-pagamento.md` (o desenho da etapa 7, modelo deste); `docs/direcoes/desenho/cardapio.md` (etapa 6); `docs/direcoes/desenho/material.md` (a Home); `docs/direcoes/pesquisa/material.md`, com a seção "Etapa 8: campos de texto e formulários" ([118] a [159]) e a da etapa 6 ([88] a [117]); `docs/direcoes/PESQUISA.md` ([1] a [36]); `docs/direcoes/pesquisa/home-delivery.md` ([H…]). Nenhuma pesquisa nova: onde falta fonte, está escrito "não encontrei". Pares medidos com `lerTokens` e `medirPar` de `src/utils/contraste.js`, sobre o `base/_tokens.scss`, em duas casas, para baixo, como o `contraste.test.js` (o SPEC-M arredonda alguns: 7,24 e 5,01 aqui são 7,23 e 5,00).

**Resumo:**

- **O campo vira o outlined do M3 com o rótulo acima** ([120], [122]): sem fundo, contorno `outline` de 1 px (4,06 no painel, 3,85 no diálogo e no admin), 56 px de altura e canto de 12 (a forma do Expressive, [125], [8]). Sai o fundo `surface-container-highest` da recomendação da SPEC-M §5.8: ele não identifica o campo (1,16 contra o painel) e não é variante do M3.
- **A matriz inteira tem fonte:** hover no contorno `on-surface` ([135]); foco com o contorno e o rótulo em `primary` ([135]) mais o anel de 3 px do projeto; erro em `error`; somente leitura tracejado em `outline` (3:1, texto inteiro), diferente do desabilitado (38%, isento [98]). Com erro, a mensagem toma o lugar da ajuda ([131]).
- **O CEP ganha região viva** (`role="status"`, prop nova `live` do `FormGroup`): "Buscando endereço…", o endereço e o erro da consulta passam a ser anunciados ([151], [153]).
- **Painel** `surface-container-low` de canto 28, sem sombra; o `h1` fica dentro, na regra global. **Banner** em `error-container`, com o texto em `on-error-container` (7,23), logo acima do botão de envio, numa região `role="alert"` que existe desde a montagem ([152]). **Aviso de conta salva** igual ao do pagamento, no topo do formulário.
- **Perfil:** os dois blocos em contêineres `low` (o padrão das seções do pagamento); o histórico em lista segmentada; "Recebido" vira rótulo de status, e não chip ([60], [141]); sai o "·" da linha do pedido (regra 7.g); "Ver itens" com chevron e cara de text button; "Excluir conta" passa à variante `danger` que já existe (SPEC-M §4.1).
- **Foco não coberto:** em 390, o aviso "Dados salvos." cobre inteiro o "Salvar alterações" focado pelo teclado. Resposta: a reserva do aviso da etapa 7 e a rolagem do foco depois do aviso, como no pagamento.
- **Ficam para outras etapas:** a 9 resolve a ilustração e o `scrim` do login do admin, a posição do banner lá, a densidade dos filtros e o seletor de arquivo do `ModalProducts`; a 10, o `loading`, o desabilitado e o `danger` do `BaseButton`, o `BaseDialog` (com o erro de exclusão que hoje fica atrás dele), o `EmptyState` e o `AppToast`; a 11, os pares e os apelidos que ficam sem uso.
- **Em aberto para o usuário:** o botão de mostrar a senha, a instrução da senha que hoje só existe no placeholder, a âncora de "Ver meus pedidos" e dois textos de validação (seção 12).

---

## 1. Tese

**A tese do SPEC-M vale como está:** a ousadia fica no hero da Home; o resto é quieto (SPEC-M §0, "Tese"). Nestas telas:

- **Login e cadastro:** são formulários. Um painel tonal e campos que se leem como campos. O traço próprio é o próprio campo: contorno fino, canto de 12, o rótulo que acende em `primary` com o foco ([135]). Nada se move sozinho.
- **Perfil:** é consulta e manutenção. Dois contêineres, a lista segmentada da Home no histórico ([66], [81]) e o somente leitura que se distingue do editável sem parecer apagado.
- **Sem:** ilustração decorativa no login, foto atrás de texto [H5], entrada animada de seção, sombra fora do que flutua ([1], [13]), hover em bloco que não é ação, `primary` fora de ação e de foco.

### O que muda da Brasa

| Na Brasa (capturas `login-*`, `register-*`, `profile-*` e `modal-bebida-*` da etapa 7) | No M3 | Por quê |
|---|---|---|
| Campo de 48 px com fundo `surface-container-highest`, borda de 1 px e canto 8 (pelos apelidos) | Outlined de 56 px, sem fundo, contorno `outline` de 1 px, canto 12 | Formulário com muitos campos pede o outlined, de ênfase menor [120]; 56 dp [125]; canto do Expressive [125], [8]; o fundo não identifica o campo (1,16, medido) |
| Rótulo em 500 acima, sempre igual | Rótulo acima (`Above` [122]), que acende em `primary` com o foco e fica `error` com erro | Cores do rótulo por estado [134], [135] |
| Hover: borda `on-surface-variant` | Hover: contorno `on-surface` | [135] |
| Somente leitura e desabilitado com a mesma regra: tracejado em `outline-variant` (1,53), fundo e texto apagados | Somente leitura: tracejado em `outline` (4,06), texto inteiro. Desabilitado: contorno `outline-variant` e texto a 38%, fora do Tab | O pacote pede os dois diferentes; o contorno de um campo focável precisa de 3:1 [98]; o desabilitado fica isento [98] |
| Ajuda e erro juntos, colados ao campo, sem recuo | O erro toma o lugar da ajuda, 4 px abaixo, com recuo de 16 | [131], [138], [139] |
| `select` com a seta nativa | `appearance: none` e o `chevron-down` do Font Awesome no fim | O mesmo desenho em todo navegador; ícone no fim do campo [134], [135] |
| Painel `surface-container` com sombra e canto 12 | `surface-container-low`, canto 28, sem sombra | SPEC-M §5.8; elevação tonal [1], [13] |
| Banner rosa com borda esquerda vermelha de 3 px, no topo do formulário, criado junto com a mensagem | `error-container`, canto 16, texto `on-error-container`, logo acima do botão; a região `role="alert"` existe desde a montagem | Contenção tonal, como o aviso do pagamento; [152]; o erro aparece onde a pessoa agiu (5.3) |
| Aviso de conta salva com borda esquerda | Bloco `aviso-container`, igual ao do pagamento | Item 7 do pacote; desenho do Carrinho, 5.6 |
| Perfil em dois cards com sombra | Dois contêineres `low` de canto 28 | Contenção [66], [26]; o padrão das seções do pagamento |
| Pedido num card com borda; chip "Recebido" com `text-xs` 700; "17/10/2026, 19:15 · 1 item · R$ 29,49"; "▶ Ver itens" nativo | Item de lista segmentada; rótulo de status em `forma-s`; o total na linha do número, a data e a contagem em parágrafos separados, sem "·"; "Ver itens" com chevron e cara de text button | [66], [81], [8]; [60], [141]; regra 7.g da etapa 7; [159] |
| "Excluir conta" ghost, em verde | `danger` (tinta `error`), com a forma da Brasa até a etapa 10 | SPEC-M §5.9 e §4.1 |

---

## 2. Processo: plano, revisão contra o pacote e desenho final

### Sistema (dentro da identidade aprovada; nenhuma cor nova)

- **Cores, por papel:**
  - página (`surface`) #f7fbf1;
  - painel e contêineres (`surface-container-low`) #f1f5ec;
  - itens do histórico (`surface-container-lowest`) #ffffff;
  - contorno do campo (`outline`) #72796f; foco (`primary`) #3a693b com o anel (`secondary`) #52634f;
  - erro (`error`) #ba1a1a; banner (`error-container`) #ffdad6 com a tinta (`on-error-container`) #93000a;
  - aviso (`aviso-container`) #ffdeaa com a tinta (`aviso`) #7d5700;
  - status (`info-container`) #cee5ff com a tinta (`info`) #00639a.
- **Tipo:** Roboto, uma família. `h1` pela regra global (`--text-page`, de display-s a display-m, 500). `h2` em headline-s. Valor do campo em body-l; rótulo em label-l 500; ajuda e erro em body-m.
- **Layout:** login e cadastro numa coluna central (o painel de 440 e de 560 px); perfil alinhado ao início no `.container`, uma coluna abaixo de `lg` e 5/12 e 7/12 a partir dele.
- **Princípio:** a coisa memorável é o campo, e ela é quieta. O contorno fino ganha cor só quando a pessoa age: o hover escurece, o foco acende o rótulo e o contorno em verde, o erro passa tudo a vermelho e diz o porquê em texto.

### Plano (primeira passada)

1. Campo filled do M3 (`surface-container-highest` com a linha embaixo), com o rótulo dentro, que flutua por `transform` (`Inside` [121]).
2. 48 px e canto 4, como hoje.
3. Ícone de erro dentro do campo, no fim (o ícone final [131]), além da mensagem.
4. Botão de mostrar a senha no fim do campo ([126], [127]).
5. Login em duas colunas a partir de `lg`: o painel à direita e, à esquerda, a marca grande sobre `primary-container`.
6. Banner com a borda esquerda de 3 px, no topo do painel, e o foco levado a ele.
7. Somente leitura apagado, com a mesma regra do desabilitado.
8. Perfil: cards com sombra; um `h3` por pedido; o chip "Recebido" com check; a linha "data · itens · total"; o "▶" nativo.
9. Aviso de conta salva junto do botão "Criar conta".
10. "Excluir conta" com a tinta `error` por uma regra da página sobre o ghost.
11. "Salvar alterações" filled.

### Revisão contra o pacote (o que saiu genérico, repetido, inventado, infiel ou inviável, e o que entrou)

- **Filled com rótulo dentro: trocado (infiel aos placeholders e arriscado).**
  - Com o rótulo dentro, o placeholder só aparece com o rótulo minimizado, salvo com `isAlwaysMinimized` [119]; no material-web, ele some com valor e não flutua [131]. Os placeholders do `SPEC.md` ficam, e "Mínimo de 6 caracteres, com letra e número" só apareceria com o foco.
  - O `date` nativo mostra "dd/mm/aaaa" sempre; o rótulo expandido ficaria por cima (inferência).
  - O autopreenchimento obriga o rótulo a perceber o valor que o navegador pôs (inferência).
  - Rótulo acima reduz a rolagem horizontal para quem usa zoom e no celular [155].
  - Flutuar pede `transform` só em `motion-ok`: movimento a mais numa tela quieta.
  - Entrou o rótulo `Above` [121], [122], que é a posição de hoje.
  - **Filled ou outlined:** formulário com muitos campos é o caso documentado do outlined [120]. As cores tonais do Expressive reprovam a 1.4.11 aqui: a borda `outline-variant` do outlined tonal dá 1,53 contra o painel, e o contêiner `surface-container` do filled tonal, 1,05 ([125], [98], medidos). Entrou o outlined nas cores do M3 padrão [135], com a forma do Expressive.
  - **O híbrido da SPEC-M §5.8 sai:** o fundo `highest` dá 1,16 contra o painel e 1,10 contra o diálogo (medidos); quem identifica o campo é o contorno.
- **48 px e canto 4: trocados.** 56 dp é a altura mínima do campo [125], e é o que o padding de 16 do material-web dá com a linha do body-l ([136], [137], [1]). O canto de 12 é o `roundedShape` do Expressive ([125], [8]).
- **Ícone de erro dentro do campo: saiu (repetido).** A mensagem já tem ícone e texto, que é o que a 3.3.1 pede [142]; um segundo ícone tira cerca de 40 px da área de texto em 390.
- **Mostrar a senha: saiu (inventado).** É texto e lógica novos, fora do pacote. Vira pergunta ao usuário, com as fontes ([150], [126], [127], [90]).
- **Login em duas colunas com a marca: saiu (repetição e genérico).** Abaixo de `md`, o hero da Home é um contêiner `primary-container` com o título grande, e a confirmação já tem uma faixa nessa cor; "ilustração decorativa no login" é padrão genérico (critérios do revisor). Entrou o painel único.
- **Borda de 3 px e foco no banner: trocados.** A borda é da Brasa; o aviso do pagamento já é só tonal. Levar o foco ao banner faria o leitor de tela ouvir a mensagem duas vezes, pelo `role="alert"` e pelo foco. O foco fica no botão, e a 4.1.3 cobre o anúncio sem foco [151]. O banner vai para junto do botão (5.3).
- **Somente leitura igual ao desabilitado: trocado (pacote e 1.4.11).** O somente leitura recebe foco [119]: o contorno precisa de 3:1 [98]. Entrou o tracejado em `outline` (4,06) com o texto inteiro.
- **Perfil: quatro trocas.**
  - A sombra sai (elevação tonal [1], [13]).
  - O `h3` por pedido vira `p`: o nome no item de lista não é título (SPEC-M §4.1, `M3ItemLista`).
  - O chip com check vira rótulo de status sem ícone: o chip promete interação ([60], [141]), e o check lembra o filter chip marcado [60].
  - O "·" sai pela regra da etapa 7 (7.g, confirmada pelo usuário em 22/11/2026). O "▶" nativo vira os chevrons do Font Awesome, trocados sem `transform` [159].
- **Aviso junto do botão: trocado.** As instruções gerais vêm antes do formulário [156]: quem tem conta salva sabe antes de preencher sete campos. A ligação com o botão por `aria-describedby` continua.
- **Regra local para o "Excluir conta": trocada.** A variante `danger` já existe, e a SPEC-M §4.1 a mapeia para "texto em `--m3-error`", que é o que a §5.9 cita. Sem `:deep()` e sem variante nova.
- **"Salvar alterações" filled: trocado.** O filled é de ênfase alta, para ações importantes ou finais; o tonal, de ênfase média [55]. Salvar o perfil é manutenção, e o `SPEC.md` o põe como secundário (§5.9).

### Desenho final

As seções 3 a 12 abaixo. As decisões do item 6 do pacote estão em 5.1 (a), 5.2 (b), 5.3 (c e d), 5.4 e 5.5 (e), 5.5 (f), 5.6 (g), 5.7 (h), 5.8 (i), 5.2 (j), 5.1 e 5.3 (k), 4 (l) e 5.9 (m), e numa linha cada na seção 12.

---

## 3. Composição

### Login (`#/login`)

1. **Painel** (`section.auth-panel[aria-labelledby="entrar-titulo"]`), numa coluna central de 440 px:
   1. `h1` "Entrar";
   2. formulário: E-mail, Senha; a região do banner e o "Entrar" (filled M, `block`);
   3. rodapé: "Não tem conta? Criar conta".

### Cadastro (`#/register`)

1. **Painel** de 560 px (`aria-labelledby="cadastro-titulo"`):
   1. `h1` "Criar conta";
   2. aviso de conta salva (só com conta no navegador);
   3. formulário: Nome e Sobrenome; E-mail; Senha; Data de nascimento; Celular; CEP (com a ajuda viva); "Rua e número" e "Bairro" (só com CEP único da cidade); a região do banner e o "Criar conta";
   4. rodapé: "Já tem conta? Entrar".

### Perfil (`#/profile`)

1. **Cabeçalho** (`header.profile-page__header`): `h1` "Sua conta" e "Sair".
2. **Grade:** "Seus dados" (`section`, 5/12 a partir de `lg`) e "Seus pedidos" (`section`, 7/12), nessa ordem também em 390 (5.6).
3. **Diálogo** "Excluir conta?" (`BaseDialog`, na top layer).

**Ritmo vertical (as três telas, como o Carrinho):** a página começa a `--space-5` do cabeçalho abaixo de `md` e a `--space-7` a partir dele (hoje o login e o cadastro usam `--space-7` sempre); no perfil, o `h1` fica a `--space-5` da grade abaixo de `md` e a `--space-6` a partir dele; dentro do painel, `--space-5` entre o `h1`, o aviso, o formulário e o rodapé; a página termina com `--space-8`.

As medidas abaixo são estimativas pelo CSS; a sessão C mede nas capturas.

### Wireframe do Login em 1440

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ header (sticky, 64 px, surface)                                                                │
│ Smash Burger                               ( ⌂ Início | ⑂ Cardápio | ◉ Entrar )  [🛒]          │
│                                              "Entrar" é o item atual: secondary-container      │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                              ↕ --space-7       │
│                      ╭ painel: surface-container-low, canto 28, padding 32 ──╮  440 px,        │
│                      │ Entrar                 h1, --text-page (45/52), 500   │  centrado       │
│                      │                                         ↕ --space-5   │                 │
│                      │ E-mail                 label-l 500, on-surface        │                 │
│                      │                                         ↕ 8 px        │                 │
│                      │ ╭───────────────────────────────────────────────────╮ │  376 × 56,      │
│                      │ │                                                   │ │  sem fundo,     │
│                      │ ╰───────────────────────────────────────────────────╯ │  outline 1 px,  │
│                      │                                         ↕ --space-4   │  canto 12       │
│                      │ Senha                                                 │                 │
│                      │ ╭───────────────────────────────────────────────────╮ │                 │
│                      │ │                                                   │ │                 │
│                      │ ╰───────────────────────────────────────────────────╯ │                 │
│                      │                                         ↕ --space-5   │                 │
│                      │ (                       Entrar                      ) │  filled M, 56   │
│                      │                                         ↕ --space-5   │                 │
│                      │ Não tem conta? Criar conta        body-l; link na frase│                 │
│                      ╰───────────────────────────────────────────────────────╯                 │
│                                                                              ↕ --space-8       │
│ ╭ rodapé (decisão g): marca, descrição, horário e contato, direitos ─────────────────────────╮ │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

Legenda: `◉` é o item atual da pílula. O rodapé do painel fica alinhado ao início, como o `h1` e os rótulos (5.2).

### Wireframe do Login em 390, com o erro

```
┌──────────────────────────────────┐
│ Smash Burger                     │  header estático, 64 px
│                       ↕ --space-5│
│╭ painel low, canto 28, pad. 16 ─╮│  358 px
││ Entrar                         ││  h1, display-s 36/44
││ E-mail                         ││
││╭──────────────────────────────╮││  326 × 56
│││ maria@example.com            │││
││╰──────────────────────────────╯││
││ Senha                          ││
││╭──────────────────────────────╮││
│││ •••••••••                    │││
││╰──────────────────────────────╯││
││╭ error-container, canto 16 ───╮││  região role="alert" (sempre no DOM)
│││ ● E-mail ou senha incorretos.│││  ícone error; texto on-error-container
││╰──────────────────────────────╯││
││(            Entrar            )││  filled M; o foco continua nele
││ Não tem conta? Criar conta     ││
│╰────────────────────────────────╯│
│ rodapé · assinatura              │
│         ╭⌂ ┃⑂ ┃◉ ╮ ╭──╮          │  toolbar flutuante; reserva de 6rem no pé
│         ╰───────────╯ ╰──╯       │
└──────────────────────────────────┘
```

Sem erro, o banner não existe e o botão sobe 72 px (o banner de uma linha, 56, mais o vão de 16). O conteúdo inteiro cabe acima da reserva da toolbar em 844 px de altura.

### Wireframe do Cadastro em 1440, vazio, depois de "Criar conta"

```
│                 ╭ painel low, canto 28, padding 32, 560 px ────────────────╮
│                 │ Criar conta                              h1              │
│                 │ Nome                        Sobrenome    rótulos em error │
│                 │ ╭───────────────────────╮   ╭───────────────────────╮    │  240 px cada;
│                 │ │ Seu nome              │   │ Sobrenome             │    │  contorno error;
│                 │ ╰───────────────────────╯   ╰───────────────────────╯    │  o 1º tem o foco
│                 │   ● O primeiro nome é         ● O sobrenome é            │  e o anel
│                 │     obrigatório                 obrigatório              │  body-m error, recuo 16
│                 │ E-mail                                                   │
│                 │ ╭────────────────────────────────────────────────────╮   │  496 px
│                 │ │ voce@exemplo.com                                   │   │  placeholder
│                 │ ╰────────────────────────────────────────────────────╯   │  on-surface-variant
│                 │   ● O email é obrigatório                                │
│                 │ Senha  [ Mínimo de 6 caracteres, com letra e número ]    │
│                 │   ● A senha é obrigatória                                │
│                 │ Data de nascimento  [ dd/mm/aaaa                   📅 ]  │  ícone nativo
│                 │   ● A data de nascimento é obrigatória                   │
│                 │ Celular  [ (47) 99999-9999 ]                             │
│                 │   ● O número é obrigatório                               │
│                 │ CEP                                                      │
│                 │ ╭────────────────────────────────────────────────────╮   │
│                 │ │ 00000-000                                          │   │
│                 │ ╰────────────────────────────────────────────────────╯   │
│                 │   ● O CEP é obrigatório        (o erro no lugar da ajuda)│
│                 │ (                     Criar conta                     )  │
│                 │ Já tem conta? Entrar                                     │
│                 ╰──────────────────────────────────────────────────────────╯
```

Legenda: `●` é o `circle-exclamation`, centrado na primeira linha. Os campos de uma linha só aparecem resumidos (`[ … ]`) para caber; todos têm a forma do E-mail. Sem erro, a ajuda do CEP diz "Consultamos o CEP no ViaCEP para preencher o endereço.".

### Wireframe do Cadastro em 390, com conta salva

```
┌──────────────────────────────────┐
│╭ painel low, pad. 16 ───────────╮│
││ Criar conta                    ││  h1, display-s
││╭ aviso-container, canto 16 ───╮││  326 px; padding 16
│││ ● Já existe uma conta salva  │││  ícone e texto em aviso (5,03), body-l
│││   neste navegador. Se você   │││  id="aviso-conta-salva"
│││   criar outra, a anterior    │││
│││   será apagada.              │││
││╰──────────────────────────────╯││
││ Nome                           ││  uma coluna abaixo de sm
││╭──────────────────────────────╮││
│││ Seu nome                     │││
││╰──────────────────────────────╯││
││ Sobrenome … E-mail … Senha …   ││
││ Data de nascimento … Celular … ││
││ CEP                            ││
││╭──────────────────────────────╮││
│││ 00000-000                    │││
││╰──────────────────────────────╯││
││   Consultamos o CEP no ViaCEP  ││  ajuda viva, body-m
││   para preencher o endereço.   ││
││(         Criar conta          )││  aria-describedby="aviso-conta-salva"
││ Já tem conta? Entrar           ││
│╰────────────────────────────────╯│
│ rodapé · toolbar                 │
└──────────────────────────────────┘
```

### Wireframe do Cadastro em 390: CEP buscando e CEP único da cidade

```
Buscando                              CEP único da cidade
││ CEP                            ││  ││ CEP                            ││
││╭──────────────────────────────╮││  ││╭──────────────────────────────╮││
│││ 88370-000                    │││  │││ 88370-000                    │││
││╰──────────────────────────────╯││  ││╰──────────────────────────────╯││
││   ◌ Buscando endereço…         ││  ││   {Cidade}/{UF}. Este CEP vale ││  a mesma região
││                                ││  ││   para a cidade toda: informe  ││  role="status"
││(         Criar conta          )││  ││   a rua.                       ││
                                       ││ Rua e número                   ││  obrigatória
                                       ││╭──────────────────────────────╮││
                                       │││                              │││
                                       ││╰──────────────────────────────╯││
                                       ││ Bairro                         ││  opcional
                                       ││╭──────────────────────────────╮││
                                       │││                              │││
                                       ││╰──────────────────────────────╯││
                                       ││(         Criar conta          )││
```

Legenda: `◌` é o arco do spinner, que gira só em `motion-ok`. `{Cidade}/{UF}` vem da consulta (`cepHelper` de hoje).

### Wireframe do Perfil em 1440, com um pedido e "Ver itens" aberto

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│ header (sticky)  Smash Burger                    ( ⌂ Início | ⑂ Cardápio | ◉ Perfil )  [🛒 1]  │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                              ↕ --space-7       │
│ Sua conta                  h1, --text-page                                      (↦ Sair)       │
│                                                                    text button, 44 px          │
│                                                                              ↕ --space-6       │
│ ╭ Seus dados: low, canto 28, pad. 24 ───╮  ╭ Seus pedidos: low, canto 28, pad. 24 ──────────╮ │
│ │ Seus dados              h2 headline-s │  │ Seus pedidos                        h2          │ │
│ │ Nome                                  │  │╭ lowest, cantos 20 (um só item), pad. 16 ─────╮│ │
│ │ ╭───────────────────────────────────╮ │  ││ Pedido #1001                      R$ 29,49   ││ │
│ │ │ Maria                             │ │  ││ title-m 500              title-m 500 tabular ││ │
│ │ ╰───────────────────────────────────╯ │  ││ 17/10/2026, 19:15   1 item       ( Recebido )││ │
│ │ Sobrenome  [ Silva ]                  │  ││ body-m on-surface-variant   info, forma-s    ││ │
│ │ E-mail     [ maria@example.com ]      │  ││ (⌄ Ver itens)              text button, aberto││ │
│ │ Celular    [ (47) 99999-9999 ]        │  ││ 1× Cheese Bacon                   R$ 29,49   ││ │
│ │ CEP                                   │  ││ Sem tomate                    body-m         ││ │
│ │ ╭───────────────────────────────────╮ │  ││ +1 bacon                                     ││ │
│ │ │ 88370-000                         │ │  ││ ─────────────────────────── outline-variant  ││ │
│ │ ╰───────────────────────────────────╯ │  ││ Subtotal                          R$ 29,49   ││ │
│ │   Consultamos o CEP no ViaCEP para    │  ││ Total                             R$ 29,49   ││ │
│ │   preencher rua, bairro, cidade e UF. │  │╰──────────────────────────────────────────────╯│ │
│ │ Rua                                   │  ╰────────────────────────────────────────────────╯ │
│ │ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐ │   7/12                                            │
│ │ ╎ Rua Beira da Praia                ╎ │   somente leitura: tracejado outline, texto       │
│ │ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘ │   on-surface inteiro                              │
│ │ Bairro     ╎ Centro ╎                 │                                                    │
│ │ Cidade                     UF         │                                                    │
│ │ ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐ ┌╌╌╌╌╌╌╌╌┐   │                                                    │
│ │ ╎ Navegantes             ╎ ╎ SC     ╎   │                                                    │
│ │ └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘ └╌╌╌╌╌╌╌╌┘   │                                                    │
│ │ (        Salvar alterações         )  │  tonal, 44 px, block                               │
│ │                         ↕ --space-6   │                                                    │
│ │ ───────────────────── outline-variant │                                                    │
│ │ Excluir a conta apaga deste navegador │  body-m, on-surface-variant                        │
│ │ seus dados, o histórico de pedidos e  │                                                    │
│ │ o carrinho.                           │                                                    │
│ │ 🗑 Excluir conta                      │  danger: tinta error (forma da Brasa até a 10)     │
│ ╰───────────────────────────────────────╯                                                    │
│   5/12                                                                                         │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

Legenda: `┌╌┐` é o contorno tracejado. Os dados são os da sessão semeada das capturas (`LOGGED` do e2e). Fechado, o "Ver itens" mostra `›` e esconde o resumo.

### Wireframe do Perfil em 390, com pedidos

```
┌──────────────────────────────────┐
│ Smash Burger                     │
│                       ↕ --space-5│
│ Sua conta              (↦ Sair)  │  h1 display-s; text button, 44 px
│                       ↕ --space-5│
│╭ Seus dados: low, pad. 16 ──────╮│
││ Seus dados                     ││  h2
││ Nome … Sobrenome … E-mail …    ││  campos de 326 × 56
││ Celular … CEP + ajuda          ││
││ Rua ╎…╎ Bairro ╎…╎             ││  tracejados
││ Cidade ╎ Navegantes ╎ UF ╎ SC ╎││  3fr e 1fr
││(       Salvar alterações      )││  tonal, block
││ ────────────────────────────── ││
││ Excluir a conta apaga deste    ││
││ navegador seus dados, …        ││
││ 🗑 Excluir conta               ││
│╰────────────────────────────────╯│  "Seus pedidos" começa a cerca de 1300 px
│                       ↕ --space-5│
│╭ Seus pedidos: low, pad. 16 ────╮│
││ Seus pedidos                   ││
││╭ lowest, cantos 20/20/4/4 ────╮││  326 px; padding 16
│││ Pedido #1001        R$ 29,49 │││
│││ 17/10/2026, 19:15  1 item    │││
│││                 ( Recebido ) │││  quebra para a linha de baixo se não couber
│││ (› Ver itens)                │││
││╰──────────────────────────────╯││
││┃ vão de 2 px                   ││
││╭ lowest, cantos 4/4/20/20 ────╮││
│││ Pedido #1000 …               │││
││╰──────────────────────────────╯││
│╰────────────────────────────────╯│
│ rodapé · assinatura · toolbar    │
└──────────────────────────────────┘
```

### Wireframe do Perfil sem pedidos (1440 e 390)

```
1440 (coluna 7/12)                                        390
╭ Seus pedidos: low, canto 28 ───────────────────╮        ╭ Seus pedidos: low ─────────────╮
│ Seus pedidos                                   │        │ Seus pedidos                   │
│                      🍔                         │        │              🍔                │
│          Você ainda não fez pedidos            │        │  Você ainda não fez pedidos    │
│               ( Ver cardápio )                 │        │       ( Ver cardápio )         │
│  EmptyState dentro do contêiner (etapa 10)     │        │                                │
╰────────────────────────────────────────────────╯        ╰────────────────────────────────╯
```

### Wireframe do diálogo "Excluir conta?" (1440 e 390)

```
1440: centrado, até 480 px (prop de hoje)             390: sheet (etapa 10)
┌───────────── BaseDialog (etapa 10) ─────────────┐   ┌──────────────────────────────────┐
│ Excluir conta?                             [✕]  │   │ Excluir conta?               [✕] │  h2; recebe o foco
├─────────────────────────────────────────────────┤   ├──────────────────────────────────┤
│ Seus dados, o histórico de pedidos e o carrinho │   │ Seus dados, o histórico de       │
│ serão apagados deste navegador. Não é possível  │   │ pedidos e o carrinho serão       │
│ desfazer.                                       │   │ apagados deste navegador. Não é  │
├─────────────────────────────────────────────────┤   │ possível desfazer.               │
│                   ( Cancelar ) ( Excluir conta )│   │ … (o sheet de hoje tem a altura  │
└─────────────────────────────────────────────────┘   │    da tela; etapa 10)            │
                                                      ├──────────────────────────────────┤
                                                      │      ( Cancelar ) ( Excluir conta )│
                                                      └──────────────────────────────────┘
```

Esta etapa fixa o texto, a ordem dos botões (o seguro antes, o destrutivo por último, à direita) e o foco inicial no título. O resto é da etapa 10 (5.7).

### As três telas em 1024

- **Cabeçalho do site:** sticky, com a pílula ancorada (a partir de `lg`).
- **Login e cadastro:** o mesmo painel de 1440 (440 e 560 px), centrado; `h1` em 45 px (o limite do `--text-page`). O cadastro mostra Nome e Sobrenome lado a lado, com 240 px cada.
- **Perfil:** duas colunas, 5/12 e 7/12: "Seus dados" com cerca de 390 px (campos de 342) e "Seus pedidos" com cerca de 546.
- **De `md` a `lg` (768 a 1023):** uma coluna só, como em 390, com o ritmo de `md`; o cabeçalho rola e a toolbar flutua embaixo; o aviso (toast) aparece no topo à direita (`AppToast`).

---

## 4. Navegação (a moldura nestas rotas)

- **Sem mudança na moldura:** `M3BarraSuperior` e `M3BarraFerramentas` como na etapa 4.
- **Item atual da pílula:** em `/login`, "Entrar" (`aria-current="page"`, em `secondary-container`); em `/register`, nenhum, porque "Entrar" leva a `/login` e o `h1` já diz onde se está; em `/profile`, "Perfil".
- **O FAB:** leva ao carrinho, com o nome "Carrinho, N itens", como em toda rota.
- **Troca de rota:** o foco vai ao `main` (`#conteudo`, com `preventScroll`), como hoje (`SPEC.md` §10.6). Depois do "Sair", do cadastro e da exclusão, a rota troca e o foco vai ao `main` da tela nova.
- **Ordem do Tab:** a da moldura (skip link, marca, três links, carrinho, `main`) e, dentro do `main`, a ordem do DOM (seções 5.4, 5.5 e 5.6).
- **Foco não coberto (2.4.11 [76]; decisão l):**
  - **A toolbar, abaixo de `lg`:** o `scroll-padding-bottom: var(--m3-barra-reserva)` e a reserva do layout, de hoje, cobrem todos os focos destas telas: os campos (56 px mais o anel), o "Entrar", o "Criar conta", o "Salvar alterações", o "Excluir conta", cada "Ver itens", os links do rodapé do painel e o "Sair". O `keyboard.mjs` já percorre `#/login`, `#/register` e `#/profile` em 390 com o `focusNotCovered`; entram também as alturas de 800 px.
  - **O aviso "Dados salvos." sobre o "Salvar alterações", abaixo de `md`:** a conta, em 390 × 844.
    - O aviso tem 60 px (o botão de fechar de 44 mais 8 em cima e embaixo, `_app-toast.scss`) e fica com a base a `--m3-barra-reserva` (96 px) do pé: ocupa de 688 a 748 px, com 358 de largura.
    - Pelo teclado, o Tab rola o "Salvar alterações" até a base dele encostar na reserva: o botão (44 px) fica de 704 a 748, na largura do contêiner (de 32 a 358).
    - A pessoa aperta Enter, e o aviso cobre o botão focado inteiro. O foco não se move, então o `scroll-padding` sozinho não rola nada. Em 390 × 800, o mesmo, 44 px acima.
  - **A resposta (a regra da etapa 7 vale, com a rolagem do pagamento):**
    - enquanto há aviso, o `scroll-padding` da rota soma `--m3-toast-reserva` (6,5rem): no pé abaixo de `md` e no topo de `md` a `lg`, por `:global(html:has(.profile-page):has(.toast-region .toast))`, a técnica C43 [76], como no carrinho e no pagamento;
    - depois do `toastStore.show` do "Salvar alterações" (sucesso ou erro), a `ProfileView` faz `await nextTick()` e `document.activeElement?.scrollIntoView?.({ block: "nearest" })`, como a `PaymentView` depois da conferência (desenho do Carrinho, 5.8). Com a reserva somada, o botão sobe para cima do aviso (a base vai a 644 px; sobra um vão de 44);
    - **por que o topo só até `lg`:** a partir de `lg`, "Seus dados" fica na coluna da esquerda, e o aviso, no topo à direita, nunca a cruza. Em 1440, a coluna vai de x 152 a 615 e o aviso de 872 a 1288; em 1024, de 32 a 422 contra 576 a 992. Sem a soma ali, a página não pula sem motivo (a lição do carrinho em `xl`, desenho do Carrinho, §13);
    - **o que não cobre:** no Safari e no Firefox do macOS, o clique não põe o foco no botão, e nada rola. Sem foco no botão, não há foco a cobrir [76]; pelo teclado, a rolagem vale.
  - **O banner que aparece acima do botão de envio (5.3):** ele empurra o botão focado em 72 a 120 px (uma a três linhas). No cadastro em 390, o botão pode descer para a faixa da toolbar. Depois de mostrar o banner, a view faz a mesma rolagem do foco (`block: "nearest"`): o botão volta para cima da reserva, e o banner fica logo acima dele, à vista.
  - **O aviso "Conta criada. Entre para continuar."** aparece em `/login`, com o foco no `main`; o primeiro Tab vai ao E-mail, no alto da tela, longe do aviso (no pé em 390; no topo à direita a partir de `md`, acima da altura do campo).
  - **O diálogo:** fica na top layer (`showModal()`), e a página fica inerte (SPEC-M §2.7; desenho do Cardápio, 5.5.6). Ao fechar, o foco volta ao "Excluir conta", que não se moveu (a rolagem fica travada).

---

## 5. Blocos

### 5.1 O campo (`FormGroup`; decisões a e k)

- **Arquivos e raiz:** `src/components/FormGroup.vue` e `components/_form-group.scss`. Raiz `div.form-group`, com `.has-error` (hoje), `.is-readonly` (só o somente leitura) e `.is-disabled` (novo; hoje os dois dividem o `.is-readonly`).
- **Objetivo:** um campo que se identifica sozinho em qualquer superfície da loja e do painel, com o rótulo sempre à vista, e que diz o erro em texto, junto dele.

**API (decisão j):** as props de hoje continuam, com os mesmos padrões: `id`, `label`, `modelValue`, `type`, `name`, `mask`, `required`, `placeholder`, `error`, `helper`, `loading`, `autocomplete`, `inputmode`, `maxlength`, `rows`, `options`, `disabled` e `readonly`. Emite `update:modelValue` e `blur`. Entra uma prop só:

| Prop | Tipo e padrão | O que faz | Quem usa |
|---|---|---|---|
| `live` | `Boolean`, `false` | As mensagens do campo (ajuda e erro) ficam dentro de `div.form-group__mensagens[role="status"][aria-atomic="true"]`, renderizada desde a montagem | O CEP do cadastro e do perfil |

Sem `live`, nada muda para quem usa o componente.

**Estrutura:**

- `label.form-group__label[for]` → o controle → `div.form-group__mensagens` (com `live`, ou quando há ajuda, erro ou carregando).
- **Controle:** `input.form-group__field` (texto, e-mail, senha, tel, data, número), `textarea.form-group__field--textarea` ou, no `select`, `span.form-group__select` (posição relativa) → `select.form-group__field--select` e o `font-awesome-icon` `['fas', 'chevron-down']` `.form-group__seta` (`aria-hidden`, `pointer-events: none`).
- **Mensagens:** `p#{id}-erro.form-group__error` quando há erro; senão, `p#{id}-ajuda.form-group__help` quando há ajuda ou carregando. **O erro toma o lugar da ajuda**, no DOM e no `aria-describedby`, como no campo do material-web, em que o texto de erro substitui o de apoio [131].

**Filled ou outlined (6.a): outlined, nas cores do M3 padrão, com a forma do Expressive.**

- **Por que outlined:** o outlined tem menos ênfase, e, onde muitos campos ficam juntos, como num formulário, ela simplifica o layout [120]; o filled se destaca no meio de outros conteúdos [119]. O cadastro tem de 7 a 9 campos, e o perfil, 9. O material-web diz que os dois funcionam igual [131]; não encontrei recomendação de não misturar os dois.
- **Por que não as cores tonais do Expressive:** no outlined tonal, a borda é `OutlineVariant` e não muda no foco; no filled tonal, a linha é transparente e o contêiner é `SurfaceContainer` [125]. Medidos: `outline-variant` contra o painel dá 1,53 (1,45 no diálogo), e `surface-container` contra o painel, 1,05. A marca que mostra o campo precisa de 3:1 contra a cor vizinha [98]. Ficam as cores dos tokens v0_192 [135].
- **Por que a forma do Expressive:** o `roundedShape` é a forma recomendada pelo estilo Expressive ([118], [123]), `CornerMedium` [125], 12 px [8]. A referência pede o `roundedShape` junto com as cores tonais e o rótulo `Inside` ([123], [124]); aqui ele vem com as cores padrão e o rótulo acima: desvio registrado, pelo contraste e pelo rótulo.
- **O híbrido da SPEC-M §5.8 (fundo `surface-container-highest` com borda `outline`) sai.** O fundo dá 1,16 contra o painel e 1,10 contra o diálogo (medidos): não identifica o campo; o contorno sozinho dá 4,06 e 3,85. Sem fundo, o campo toma a cor da superfície em que está, e o mesmo contorno serve a todas.
- As medidas e as cores dos tokens v0_192 são do M3, não necessariamente do Expressive [29] (dossiê, "Riscos da etapa 8").

**O rótulo (6.a): acima, fora do contorno, sempre à vista (`TextFieldLabelPosition.Above` [121], [122]).**

| Argumento | Rótulo acima | Rótulo que flutua dentro | Fonte |
|---|---|---|---|
| 3.3.2 | Sempre visível e legível | Disponível, mas minimizado sobre o contorno | [144], [145] |
| Placeholders do `SPEC.md` | Aparecem com o campo vazio | Só com o rótulo minimizado (no foco), salvo `isAlwaysMinimized` | [119], [131] |
| `date` | O "dd/mm/aaaa" nativo fica livre | O rótulo expandido cairia sobre ele | inferência |
| Zoom | O rótulo quebra linha à vontade | O rótulo longo ("Data de nascimento") disputa os 56 px | [155]; inferência |
| Autopreenchimento | Nada a perceber | O rótulo precisa saber que o navegador pôs um valor | inferência |
| Movimento | Nenhum | Flutuar é `transform`, só em `motion-ok` | regra do projeto |

O rótulo é `label` com `for` igual ao `id`, antes do campo; clicar nele leva o foco ao campo [145]. É a posição de hoje.

**Medidas e formas (6.a):**

| Medida | Valor | Fonte |
|---|---|---|
| Altura mínima | 56 px (`min-height: 3.5rem`, como o `.btn--lg`) | `MinHeight` de 56 dp [125]; padding de 16 do material-web ([136], [137]) com a linha do body-l (24 [1]). O campo denso de 48 dp é um exemplo do Compose [119], e hoje é o tamanho da loja |
| Largura | A da coluna; sem mínimo | O `MinWidth` de 280 dp [125] não entra: o UF tem cerca de 77 px em 390 e "SC" cabe |
| Cantos | 12 px (`--m3-forma-m`) | [125], [8]; o outlined padrão tem 4 ([135], [8]) |
| Contorno | 1 px em repouso, no hover e no foco | 1 dp sem foco e 2 dp com foco no Compose [125]; 3 px com foco no material-web ([136], [137]). Aqui o contorno fica com 1 px e só troca a cor; a espessura do foco vem do anel de 3 px do projeto [30], por fora, sem mexer no layout |
| Padding | 16 px nas pontas (`--space-4`); o texto centrado nos 56 | 16 px em cima, embaixo e nas pontas ([136], [137]) |
| `select`, ponta do ícone | 12 px da borda, ícone de 20 px, 16 até o texto: `padding-inline-end: calc(var(--space-3) + 1.25rem + var(--space-4))` | 12 px na ponta com ícone e 16 entre o ícone e o texto ([136], [137]). O ícone do M3 tem 24 px ([134], [135]); aqui 20, o tamanho dos ícones da lista do pagamento e do aviso (etapa 7), porque o ícone é do Font Awesome (decisão c) |
| Rótulo → campo | 8 px (`--space-2`, hoje) | Não encontrei a distância na posição `Above` [122] |
| Campo → ajuda ou erro | 4 px (`--space-1`), com recuo de 16 dos dois lados | ([138], [139]) |
| Entre campos | 16 px (`--space-4`, hoje) | Sistema de hoje. O erro fica a 4 px do próprio campo e a 16 do rótulo seguinte: a proximidade diz de quem ele é |
| Camada de estado | Nenhuma | O outlined não tem token de camada de hover [135]; o hover troca a cor do contorno |

**Tipografia por papel:**

| Papel | Estilo | Cor | Fonte |
|---|---|---|---|
| Valor digitado | body-l 16/24 | `on-surface` | body-large [134]; 16 px evita o zoom do iOS (`SPEC.md` §5.8) |
| Placeholder | body-l 16/24 | `on-surface-variant` | bodyLarge [119], [134] |
| Rótulo | label-l 14/20, 500 | `on-surface`; por estado, abaixo | **Desvio:** o rótulo minimizado do M3 é body-small 12/16 ([119], [134]), o tamanho de quando ele divide o espaço com o contorno. Fora do contorno, ele é o título do campo: fica o tamanho de hoje (14 px, 500, `SPEC.md` §5.8), o title-s que o projeto faz com label-l em 500 (SPEC-M §2.3) |
| Ajuda e erro | body-m 14/20 | ajuda `on-surface-variant`; erro `error` | **Desvio:** o apoio do M3 é body-small [134]. Fica body-m, o papel da ajuda no resto do sistema (a ajuda do CTA do pagamento, etapa 7, 5.8) e o tamanho de hoje; as mensagens do app chegam a 73 caracteres ("Sobrenome inválido. Devem conter no mínimo 2 letras e não conter números") |
| Contador "0/140" | o da ajuda, com algarismos tabulares | `on-surface-variant` | Contador tabular (SPEC-M §2.3); o Compose põe o contador no texto de apoio [119] |

**Estados (a matriz inteira está na seção 6):**

| Estado | Contorno | Rótulo | Outros |
|---|---|---|---|
| Repouso | `outline`, 1 px | `on-surface` | cursor do texto em `primary` (`caret-color`) [134], [135] |
| Hover (`hover-capable`; não no foco, no desabilitado nem no somente leitura) | `on-surface` [135] | igual | — |
| Foco | `primary` (no `:focus`, também com o mouse) [135] | `primary` (`:focus-within` do grupo) [135] | anel de 3 px em `secondary`, `outline-offset: 0`, no `:focus-visible` (a regra de hoje em `_a11y.scss`, SPEC-M §6) |
| Erro | `error` [135] | `error` [134], [135] | mensagem com ícone; `aria-invalid="true"`; cursor `error` [134] |
| Erro com hover | `on-error-container` [135] | `on-error-container` [134], [135] | — |
| Erro com foco | `error` [134], [135] | `error` | o anel continua `secondary`: a cor do foco é uma só no projeto (SPEC-M §1.1, item 4); o erro segue no contorno, no rótulo e no texto |
| Desabilitado (prop sem uso hoje) | `outline-variant` (o M3 usa `on-surface` a 12% [135], sem token aqui; isento [98]) | `--color-ink-disabled` | valor, placeholder e ajuda em `--color-ink-disabled` (`on-surface` a 38%, já composto, SPEC-M §2.2; [134], [135]); `disabled` nativo, fora do Tab e da acessibilidade [119]; `cursor: not-allowed`; sem hover |
| Somente leitura (Rua, Bairro, Cidade e UF) | `outline`, 1 px, **tracejado** | `on-surface` | valor em `on-surface`, inteiro; `readonly` nativo, recebe foco e deixa copiar [119]; sem hover; `cursor: default`; com foco, só o anel (o contorno não acende, para não sugerir edição) |
| Carregando (CEP) | o de repouso (o campo continua editável, como hoje) | igual | ajuda "Buscando endereço…" com o arco de 1em, em `currentColor` |

- **Somente leitura (6.a, 6.h): o tracejado fica, na cor que passa.** Não encontrei cor nem estilo de somente leitura no M3 ([123], [134], [135]); fica o tracejado de hoje (`SPEC.md` §5.8), que já é o sinal do sistema. Muda a cor: de `outline-variant` (1,53, abaixo do 3:1 de um controle focável [98]) para `outline` (4,06 no perfil). Saem o fundo e o texto apagado de hoje, que o faziam parecer desabilitado. **Como se distingue:** do editável, pelo traço; do desabilitado, pelo texto inteiro (15,49 contra 2,22) e pelo contorno de 3:1. O leitor de tela diz "somente leitura" pelo atributo nativo [96]. Os campos somente leitura não validam [131].
- **Hover (o "a desenhar" da SPEC-M §6):** o contorno passa de `outline` (#72796f) a `on-surface` (#181d17) [135], sem camada e sem mudar a espessura.
- **Foco:** o M3 engrossa o contorno para 2 ou 3 px ([125], [136], [137]). Aqui o contorno fica com 1 px, troca para `primary`, e o anel de 3 px em `secondary`, encostado (`outline-offset: 0`), dá a espessura. O anel é o `outline` do CSS: não desloca o texto. É a regra que o `_a11y.scss` já tem para `input`, `select` e `textarea`, e é o que o `keyboard.mjs` mede (`outline` de 3 px). O contorno em `primary` vale também no `:focus` do mouse, que nem sempre mostra o anel.
- **Duas sobrescritas na parcial:** a regra global do `_a11y.scss` acende o contorno de todo campo com foco visível; no somente leitura, a parcial a devolve ao `outline` tracejado (uma seleção com a classe, o atributo e o escopo vence o `:is()` global). O rótulo acende pelo `:focus-within` do grupo, fora do `.is-readonly`.

**Mensagens de erro e de ajuda (6.a):**

- **Posição:** 4 px abaixo do campo, com 16 px de recuo dos dois lados ([138], [139]): o texto da mensagem começa alinhado ao texto do campo.
- **Ícone:** o `circle-exclamation` de hoje, `aria-hidden`, em `error`, centrado na primeira linha (num `span` da altura da linha de body-m, como o ícone do aviso do pagamento na construção da etapa 7). O erro não depende só da cor: tem o ícone e o texto [99], [142].
- **Com erro, a ajuda sai** [131]. No CEP, "CEP não encontrado." toma o lugar de "Consultamos o CEP no ViaCEP para preencher o endereço.", e o leitor de tela ouve só o erro.
- **Cor por superfície:** ver a tabela "Superfícies", abaixo.
- **O que o leitor de tela ouve:** ao focar o campo, o rótulo, o tipo, "inválido" (com erro) e a descrição: o erro ou a ajuda, pelo `aria-describedby` ([146], [143]). O `aria-invalid` só aparece depois da validação (no `blur` ou no envio), como a ARIA21 pede [143], e continua no desabilitado, como no material-web [132].
- **Quando aparece e some (k, igual a hoje):** no primeiro `blur`; depois, a cada digitação, e some assim que o valor fica válido (`useFormValidation`). No envio inválido, o foco vai ao primeiro campo com erro, como no tutorial do W3C [158].
- **O erro do campo não é região viva (decisão desta etapa, com pergunta à sessão principal):**
  - **por quê:** com a revalidação a cada tecla, uma região viva anunciaria a cada digitação; no envio com sete campos vazios, seriam sete anúncios junto com o foco no primeiro. A 4.1.3 alerta para a interface tagarela [151]. No envio, o foco no primeiro erro já faz o leitor ler a mensagem pelo `aria-describedby` [158];
  - **o contra-argumento:** a 4.1.3 dá "Invalid entry" acima do campo como exemplo de mensagem de status [151], e o tutorial anuncia o erro ao sair do campo [158]. Hoje, quem sai de um campo com erro só ouve a mensagem ao voltar a ele ou no envio;
  - fica registrado na seção 11 e na lista do que ficou em aberto (seção 12).

**A região viva do CEP (k): `live` com `role="status"`.**

- **Por quê:** "Buscando endereço…" é uma espera, e o endereço encontrado ou "CEP não encontrado." é o resultado: mensagens de status sem foco [151]. A consulta termina quando a pessoa pode já estar no campo seguinte, e o `status` é educado (`polite`): não interrompe [153].
- **Como:** o contêiner `div.form-group__mensagens` recebe `role="status"` e `aria-atomic="true"` e existe desde a montagem, porque o papel precisa estar lá antes de a mensagem mudar [153] (hoje, a ajuda só existe com `helper` ou `loading`). Com `aria-atomic`, a região lê o conteúdo inteiro a cada troca [153]. Como o erro toma o lugar da ajuda, ela lê uma coisa só por vez.
- **Sequência no cadastro:** "Consultamos o CEP no ViaCEP para preencher o endereço." (já na página, não é anunciado) → oito dígitos → "Buscando endereço…" → "{rua}, {bairro} — {cidade}/{UF}", "{cidade}/{UF}. Este CEP vale para a cidade toda: informe a rua." ou o erro da consulta. Com menos de oito dígitos, depois do `blur`, "CEP inválido. Devem conter 8 dígitos" também passa pela região (um campo só).
- **No perfil,** a região anuncia "Buscando endereço…" e depois o texto fixo de lá ("Consultamos o CEP no ViaCEP para preencher rua, bairro, cidade e UF."), porque o endereço vai aos campos somente leitura e a ajuda não muda (texto de hoje; seção 11).
- **É apresentação, não lógica:** um atributo e um contêiner. O `useCepLookup` e o `useManualAddress` não mudam.

**Os tipos (6.a):**

- **Texto, e-mail, tel e número:** o campo acima. O `type`, o `inputmode`, a máscara e o `autocomplete` de hoje ficam: o `autocomplete` é a técnica da 1.3.5 [149], e não bloquear o colar nem o preenchimento automático é o que a 3.3.8 pede [150] (o filtro de teclas da máscara só vale para celular e CEP, e o colar passa pelo `handleInput`).
- **Senha:** o mesmo campo, `type="password"`, com o `autocomplete` de hoje (`current-password` no login, `new-password` no cadastro). **Sem botão de mostrar a senha nesta etapa:** é texto e lógica novos, fora do pacote. Se o usuário quiser: a 3.3.8 diz que mostrar a senha, como opção, ajuda algumas pessoas e não é exigência [150]; o Compose põe um botão de ícone no fim do campo ([126], [127]); o nome do botão ou muda com o estado e não usa `aria-pressed`, ou fica fixo e o estado vai no `aria-pressed` ([126], [127], [90]). Fica como pergunta (seção 12).
- **Data:** o `date` nativo, com o ícone de calendário do navegador no fim (o `::-webkit-calendar-picker-indicator` continua com `cursor: pointer`). Não se troca: abrir o seletor por outro ícone pediria script. Com `color-scheme: light` (reset), o ícone nativo é escuro.
- **`select`:** `appearance: none` e o `chevron-down` do Font Awesome (registrado no plugin), 20 px, em `on-surface-variant` (8,41 no painel, 7,97 no admin; o contorno é o que identifica o campo), a 12 px da borda. A lista de opções continua a nativa. O M3 tem o select filled e outlined com a mesma anatomia e o mesmo erro do campo [140], e o exposed dropdown só leitura usa um ícone final [129]. A seta não gira (o estado aberto da lista nativa não chega à página).
- **`textarea` (a observação do modal):** o mesmo contorno, padding de 16 em todos os lados, `rows` de hoje (3: 72 px de texto, 104 de caixa) e `resize: vertical` de hoje. Passando de 3 linhas, o texto rola dentro, como o `MultiLine` do Compose depois do máximo [118]. O `field-sizing: content`, que faz o textarea crescer no material-web, fica de fora: só vale em alguns navegadores [131], e 140 caracteres dão cerca de 4 linhas em 390 (estimativa). O contador "0/140" continua sendo a ajuda (o Compose o põe no apoio [119]), no começo da linha, com algarismos tabulares, lido no foco pelo `aria-describedby` e sem região viva (anunciar a cada tecla seria tagarela [151]).

**Superfícies em que o campo aparece (6.a; medidos):**

| Superfície | Onde | Contorno `outline` | Erro `error` (texto e contorno) | Placeholder, ajuda, seta | Foco `primary` / anel `secondary` |
|---|---|---|---|---|---|
| `surface-container-low` | painel do login, do cadastro e do login do admin; contêiner "Seus dados" | 4,06 | 5,84 | 8,41 | 5,82 / 5,83 |
| `surface-container` | diálogo (observação, `ModalProducts`) e páginas do admin (filtros) | 3,85 | 5,54 | 7,97 | 5,52 / 5,53 |

Todos passam de 3 (contorno, anel) e de 4,5 (texto). O contorno com hover (`on-surface`) dá 15,49 e 14,68; o do erro com hover (`on-error-container`), 8,46 e 8,02.

**Modos de contraste:**

- **`forced-colors: active`:** as cores do autor dão lugar às do sistema. Ficam os sinais que não são cor: o traço do somente leitura, a mensagem com ícone no erro, o anel no foco, a seta do `select` (`currentColor`).
- **`prefers-contrast: more`:** o contorno passa de `outline` a `on-surface-variant` (8,41 no painel, 7,97 no diálogo); o somente leitura continua tracejado, na mesma cor.

**Acessibilidade (resumo):** `label` com `for` [145]; `aria-describedby` com o erro ou a ajuda [146]; `aria-invalid` só depois da validação [143]; `required` nativo; o somente leitura e o desabilitado nativos [96]; a região viva só no CEP [153]; o anel de 3 px em todo foco (SPEC-M §1.1, item 4).

**Comportamento:** igual nas três larguras; o campo ocupa a coluna. Larguras: 376 px no login em 1440, 496 no cadastro (240 lado a lado), 415 no perfil em 1440, 342 em 1024, 326 em 390.

**Movimento:** nenhum no campo: contorno e rótulo trocam de cor direto. O arco da ajuda gira com `--dur-spin` só em `motion-ok` (hoje); com movimento reduzido, fica parado, e o texto "Buscando endereço…" diz o estado (SPEC-M §7.7). Nenhuma classe nova no `_motion.scss`.

**Reservas:**

- **Nome e e-mail longos:** o `input` rola o texto dentro dele, como hoje; nada quebra a coluna.
- **Erro de duas ou mais linhas:** quebra dentro da coluna, com o ícone na primeira linha. Nome e Sobrenome lado a lado: "O primeiro nome é obrigatório" ocupa 2 linhas em 240 px; as mensagens de formato (68 a 73 caracteres) ocupam 3 linhas em 1440 e até 4 perto de 480 px (estimativa). A linha da grade cresce, com `align-items: start`.
- **Autopreenchimento:** o navegador pinta o fundo com a cor dele; o texto e o contorno continuam. Sem truque para trocar essa cor (ela diz que o valor veio do navegador, e a 3.3.8 pede o preenchimento livre [150]). A sessão C confere o contorno na captura.
- **Placeholder longo:** "Mínimo de 6 caracteres, com letra e número" não cabe em 390 (292 px de texto; a captura `register-390-full.png` já o mostra cortado). Ver a seção 12 (pergunta ao usuário).

### 5.2 O painel e os títulos (decisões b e j)

- **Arquivos:** `pages/auth/_auth.scss` (o painel, o banner, o aviso e o rodapé), usado também pelo `_login-admin.scss`; `_login.scss` e `_register.scss` (largura e grade).
- **Objetivo:** um lugar só para a tarefa, centrado, sem nada em volta que dispute a atenção.

**Painel:**

- `section.auth-panel` em `--m3-surface-container-low`, canto `--m3-forma-xl` (28), **sem sombra** (sai o `--elev-1`): o contêiner é tonal (SPEC-M §5.8; [1], [13]).
- **Largura:** 440 px no login e 560 no cadastro (`SPEC.md` §5.8, hoje).
- **Padding:** `--space-4` (16) abaixo de `sm`, como os contêineres do carrinho e do pagamento; `--space-5` (24) de `sm` a `md`; `--space-6` (32) a partir de `md`, como hoje.
- **Por dentro:** coluna com `gap: var(--space-5)` entre o `h1`, o aviso, o formulário e o rodapé; formulário com `gap: var(--space-4)`.
- **Modos de contraste:** o mixin `reserva-de-sombra` (borda de 1 px em `CanvasText`; em `outline` com `prefers-contrast: more`, 4,27 sobre a `surface`). O painel contra a página dá 1,05 e some nesses modos sem a borda.
- **A página em volta:** `surface`, sem ilustração, sem foto e sem cor. A coluna fica no alto, a `--space-5` do cabeçalho abaixo de `md` e a `--space-7` a partir dele, como o carrinho.
- **Em 390:** o painel ocupa a largura do `.container` (358 px). Fica, e não some: o `h1`, o formulário e o rodapé são uma unidade, como a bandeja do carrinho e as seções do pagamento, e o login do admin precisa dele sobre a ilustração. Tirá-lo daria 32 px a mais aos campos; o placeholder da senha (cerca de 320 px de texto, estimativa) passaria a caber no limite, sem folga para o zoom. A saída para ele é outra (seção 12, item 2).
- **Não repete o hero nem a confirmação:** neutro (`low`), sem `primary-container`, sem display dentro de contêiner verde, sem disco e sem foto.

**Títulos:**

| Campo | Origem |
|---|---|
| "Entrar" | `LoginView.vue` (`h1#entrar-titulo`) |
| "Criar conta" | `RegisterView.vue` (`h1#cadastro-titulo`) |
| "Sua conta" | `ProfileView.vue` |
| "Seus dados", "Seus pedidos" | `ProfileView.vue` (`h2`) |
| "Excluir conta?" | `ProfileView.vue` → `BaseDialog` (`h2`) |

- **`h1` (j): a regra global** (`--text-page`, de display-s 36/44 a display-m 45/52 [1], 500, `on-surface`), como no carrinho e no pagamento. No login e no cadastro, dentro do painel: o painel é a página inteira, e o login do admin precisa do título dentro dele (a ilustração fica atrás). Um título menor dentro do painel faria o login destoar das outras telas; o display no `low` não repete o hero, que é display num `primary-container`.
- **`h2`:** a regra global (headline-s 24/32 [1]). Um `h1` por tela; `h1` → `h2`, sem salto. O `h2` do diálogo fica na top layer, depois do `h1`.
- **Pares:** `on-surface` sobre o `low` (15,49) e sobre a `surface` (16,31, SPEC-M §2.2).

**Rodapé do painel:**

| Campo | Origem |
|---|---|
| "Não tem conta? Criar conta" | `LoginView.vue`; destino `/register` com o `?redirect=` |
| "Já tem conta? Entrar" | `RegisterView.vue`; destino `/login` com o `?redirect=` |

- **Link na frase (`link-inline`), e não text button:** o link está dentro de uma frase, e o link em texto corrido é a exceção de alvo da 2.5.8 [78], com os 24 px de altura do `.link-inline` (SPEC-M §1.1, item 3). Na etapa 7, o "Alterar no perfil" virou text button porque estava solto, fora de frase.
- **Tipografia:** body-l; a frase em `on-surface-variant` (8,41) e o link em `on-surface` (15,49), sublinhado, em **500** (sai o 700 da Brasa: o M3 dá Medium ao que se destaca [1]).
- **Alinhamento ao início**, como o `h1` e os rótulos: uma borda só no painel (hoje é centrado).

**Movimento:** nenhum. **Reserva:** nenhuma (textos fixos).

### 5.3 O banner de erro e o aviso de conta salva (decisões c, d e k)

#### Banner de erro (c)

| Campo | Origem |
|---|---|
| "E-mail ou senha incorretos." | `authHandlers.js` (`handleLogin`) |
| "Não foi possível criar a conta. Tente de novo." | `authHandlers.js` (`handleRegister`) |
| "Abra o site por HTTPS (ou em localhost): neste endereço o navegador não protege a senha." | `NO_WEBCRYPTO_MESSAGE` (`authHandlers.js`) |
| Ícone | `circle-exclamation` |

**Visual:**

- `div.auth-alert` em `--m3-error-container`, canto `--m3-forma-l` (16), `padding: var(--space-4)`: a forma e o padding do aviso do pagamento (desenho do Carrinho, 5.6), para os dois blocos de estado da loja terem a mesma cara.
- **Texto:** body-l em `--m3-on-error-container` (7,23). A SPEC-M §5.8 sugeria `on-surface` (13,24). Fica o `on-error-container` porque os papéis do M3 vêm em pares, o "on" sobre o contêiner dele ([1], [2], [5]), e porque o aviso da mesma tela usa a tinta do próprio papel (`aviso`); 7,23 passa com folga de 4,5.
- **Ícone:** 20 px, `aria-hidden`, em `--m3-error` (4,99 sobre o contêiner; mínimo 3), centrado na primeira linha.
- **A borda esquerda de 3 px sai:** é da Brasa; a contenção tonal basta [66], [26].
- **Modos de contraste:** `reserva-de-sombra` (o fundo some nas cores forçadas; o texto e o ícone ficam).

**Posição: logo acima do botão de envio, dentro do formulário (desvio registrado do `SPEC.md` §5.8, que o punha no topo).**

- O banner só aparece depois do envio, por uma falha que nenhum campo explica (credencial, falha genérica, WebCrypto). No cadastro em 390, o topo do formulário fica cerca de 740 px acima do botão (cerca de 870 com o aviso de conta salva; estimativa): a pessoa que apertou "Criar conta" não veria nada mudar além do botão voltando de "Criando conta…".
- Junto do botão, a mensagem aparece onde a pessoa agiu. A lista de erros de campo do tutorial vai no topo [158], mas aqui os erros de campo ficam nos campos, e o envio leva o foco ao primeiro; o banner é outra coisa.
- O mesmo lugar no login, onde tudo cabe na tela de qualquer jeito: uma regra só.

**Estrutura e anúncio (k):**

- `div.auth-form__envio` (coluna, sem `gap`, `margin-block-start: var(--space-2)`, como o `margin-top` de hoje no botão) → `div.auth-form__anuncio[role="alert"][aria-atomic="true"]`, **sempre no DOM, vazio sem erro, sem caixa** → `div.auth-alert` (`v-if`, com `margin-block-end: var(--space-4)`) → e então o `BaseButton` de envio.
- **Por quê:** o contêiner do erro precisa estar no DOM desde o carregamento para a maioria dos leitores de tela o anunciar, e o `aria-atomic="true"` é preciso para o VoiceOver do iOS ler o erro depois de mais de um envio inválido [152]. Hoje o `role="alert"` nasce junto com a mensagem (`v-if`).
- **O foco fica no botão:** é mensagem de erro sem mudança de contexto, o caso do `role="alert"` [151]. Levar o foco ao banner faria o leitor ouvir a mensagem pelo alerta e pelo foco (anúncio duplicado).
- **Um segundo envio com o mesmo erro:** o handler zera a mensagem antes de tentar de novo (hoje), a caixa sai e volta, o conteúdo da região muda, e o alerta repete.
- **Depois de mostrar o banner:** `await nextTick()` e `document.activeElement?.scrollIntoView?.({ block: "nearest" })` (seção 4). O jsdom não tem `scrollIntoView`: a chamada é opcional (`?.`).
- **Sem a caixa vazia no layout:** a região vazia tem altura 0 e fica no mesmo grupo do botão, sem `gap`; o formulário não ganha um vão a mais.

**Com uma API (item 7 do pacote):** o banner comporta qualquer mensagem de uma a três linhas. O cadastro já tem a falha genérica ("Tente de novo"). O login trata toda falha como credencial errada (`handleLogin`): uma falha de rede pediria um texto que hoje não existe; fica para o plano da API. "E-mail já cadastrado" seria erro do campo E-mail (`aria-invalid`, foco nele), que o `FormGroup` já comporta; o texto também não existe hoje.

**O login do admin:** recebe já o visual da caixa (o `_login-admin.scss` usa o `_auth.scss`), no topo do painel, com o `role="alert"` na própria caixa, como hoje. A posição junto do botão e a região sempre no DOM ficam para a etapa 9, que é dona do `LoginAdminView.vue` (5.9).

#### Aviso de conta salva (d)

| Campo | Origem |
|---|---|
| "Já existe uma conta salva neste navegador. Se você criar outra, a anterior será apagada." | `RegisterView.vue` |
| Condição | `hasSavedAccount()` (hoje) |
| Ícone | `circle-exclamation` |

- **Visual:** o aviso do pagamento sem o botão: `div#aviso-conta-salva.auth-alert.auth-alert--warning` em `--m3-aviso-container`, canto 16, padding 16; ícone de 20 px e texto body-l em `--m3-aviso` (5,03); `reserva-de-sombra`. Sem peça própria (item 7 do pacote).
- **Posição: no topo, entre o `h1` e o formulário.** As instruções gerais vêm antes do `<form>`, para o leitor de tela as ler antes do modo de formulário [156], e quem vê sabe antes de preencher sete campos (o rodapé oferece "Entrar").
- **Ligação com o botão:** `aria-describedby="aviso-conta-salva"` no "Criar conta" (hoje): na hora de agir, o leitor de tela repete a consequência.
- **Sem papel ARIA:** está na página ao carregar; não é mudança ao vivo (como o aviso do pagamento).
- **Texto e existência:** só existem por causa do `localStorage` (item 7 do pacote); ficam como estão.

**Comportamento (os dois):** a largura do formulário; em 390, o banner de uma linha tem 56 px; a mensagem do WebCrypto, 3 linhas (104 px); o aviso de conta salva, 4 linhas (128 px) (estimativas).

**Movimento:** nenhum. Aparecem e somem direto.

### 5.4 Login (decisão e)

- **Arquivos:** `src/views/auth/LoginView.vue` e `pages/auth/_login.scss` (só o `@use` do `_auth.scss`).
- **Objetivo:** entrar e seguir para o `redirect`, ou ver em texto por que não deu.

| Campo | Origem |
|---|---|
| E-mail | `FormGroup id="email"`, `type="email"`, `autocomplete="email"`, sem placeholder |
| Senha | `FormGroup id="password"`, `type="password"`, `autocomplete="current-password"`, sem placeholder |
| Botão | "Entrar"; "Entrando…" durante a espera; `BaseButton type="submit" size="lg" block` |
| Rodapé | "Não tem conta? Criar conta" (com o `?redirect=`) |

- **Botão de envio (e):** filled M (56 px [17], [18], [19]), `block`, o único filled da tela (um filled por região, SPEC-M §2.2). Contêiner contra o painel: 5,82. O `loading` é da etapa 10: até lá, o spinner de hoje, `aria-busy` e o texto "Entrando…"; com movimento reduzido, o arco parado.
- **Fluxo (igual):** um handler no `submit`; inválido, o foco no primeiro campo com erro; válido, a espera, e o sucesso vai ao `redirect` ou a `/`; a falha mostra o banner (5.3).
- **Os dados ficam depois do erro:** o e-mail e a senha continuam preenchidos (hoje); a G83 aceita não devolver os dados de segurança, e não pede apagá-los [147].
- **Ordem do Tab:** E-mail, Senha, Entrar, Criar conta.
- **Comportamento:** 1440 e 1024, o painel de 440 centrado; 390, o painel na largura toda; tudo cabe acima da reserva da toolbar, com ou sem banner (seção 3).
- **Reservas:** a mensagem do WebCrypto em 3 linhas; o e-mail longo rola dentro do campo.

### 5.5 Cadastro (decisões e e f)

- **Arquivos:** `src/views/auth/RegisterView.vue` e `pages/auth/_register.scss`.
- **Objetivo:** criar a conta numa passada, com o endereço vindo do CEP.

| Campo | Origem |
|---|---|
| Nome, Sobrenome | `given-name`, `family-name`; placeholders "Seu nome" e "Sobrenome" |
| E-mail | `email`; "voce@exemplo.com" |
| Senha | `new-password`; "Mínimo de 6 caracteres, com letra e número" |
| Data de nascimento | `date`, `bday`, sem placeholder |
| Celular | `tel`, máscara `phone`, `inputmode="tel"`, `tel-national`; "(47) 99999-9999" |
| CEP | máscara `cep`, `inputmode="numeric"`, `postal-code`; "00000-000"; ajuda, spinner e erros (5.1); **`live`** |
| Rua e número, Bairro | só com CEP único da cidade (`manual`); `address-line1` (obrigatória, "Informe a rua e o número.") e `address-level3` |
| Aviso | 5.3 |
| Botão | "Criar conta"; "Criando conta…"; filled M `block`; `aria-describedby` do aviso |
| Depois do sucesso | toast "Conta criada. Entre para continuar." e `/login` com o `?redirect=` (hoje) |

**Grade (f):**

- **Nome e Sobrenome:** uma coluna abaixo de `sm`; lado a lado a partir de `sm` (`SPEC.md` §5.8, [RES-08]), com `align-items: start`, para o campo sem erro não esticar quando o vizinho tem erro.
- **O resto, uma coluna:** E-mail, Senha, Data, Celular, CEP.
- **Rua e número e Bairro:** logo depois do CEP, cada um numa linha, quando a consulta não traz rua nem bairro (hoje). Aparecem sem animação; o resto desce.
- **Ritmo:** 16 px entre os grupos; o erro fica a 4 px do próprio campo. **O erro empurra o resto para baixo:** nenhuma linha reservada embaixo de cada campo. Reservar uma linha em nove campos somaria cerca de 216 px a um formulário que já tem cerca de 1000 em 390 (estimativa). O caso em que o empurrão atrapalha (o erro do `blur` mudar o botão de lugar no meio do clique) já tem resposta no código: o erro da rua some durante a digitação (`useManualAddress`), e os outros também (`useFormValidation`).
- **Ordem do Tab (a do DOM):** Nome, Sobrenome, E-mail, Senha, Data de nascimento, Celular, CEP, [Rua e número, Bairro], Criar conta, Entrar. O `keyboard.mjs` confere em 390 (seção 9).

**Botão de envio (e):** o do login. Espera a consulta do CEP em andamento (hoje).

**Comportamento:** 1440 e 1024, o painel de 560 (496 px de campo; 240 lado a lado); de `sm` a `md`, o painel na largura do `.container`, com os nomes lado a lado; 390, uma coluna de 326 px.

**Reservas:**

- **CEP único da cidade:** a ajuda diz "{cidade}/{UF}. Este CEP vale para a cidade toda: informe a rua." e aparecem os dois campos (wireframe na seção 3).
- **CEP trocado durante a consulta:** o endereço do anterior sai na hora, e a região anuncia a consulta nova (hoje, mais o anúncio).
- **Falha da consulta:** "Não foi possível consultar o CEP agora. Tente de novo." no lugar da ajuda, anunciada pela região.
- **Erro de envio:** o banner acima do botão (5.3).

### 5.6 Perfil: cabeçalho e layout (decisão g)

- **Arquivos:** `src/views/auth/ProfileView.vue` e `pages/auth/_profile.scss`.
- **Objetivo:** ver os pedidos feitos e manter os dados de entrega, com sair e excluir à mão, mas fora do caminho.

**Cabeçalho:**

- `header.profile-page__header`: `h1` "Sua conta" no início e "Sair" no fim, na mesma linha, `align-items: center`.
- **"Sair":** `BaseButton variant="ghost" icon-start="sign-out-alt"` (text button, 44 px, tinta `primary`, hoje), que leva a `/login` (`handleLogout`, hoje). Pares sobre a `surface`: 6,13 em repouso, 5,48 no hover e 5,33 pressionado (medidos; mínimo 4,5); anel 6,15 (SPEC-M §2.2) e 5,34 pressionado.
- **Em 390:** "Sua conta" em display-s (cerca de 170 px) e o "Sair" (cerca de 90) cabem na linha de 358. Se o `h1` crescer (zoom), o cabeçalho quebra com `flex-wrap`, e o "Sair" vai para a linha de baixo, alinhado ao início.

**Colunas:**

- **A partir de `lg`:** `grid-template-columns: 5fr 7fr` (hoje, `SPEC.md` §5.9), `gap: var(--space-5)`, `align-items: start`: "Seus dados" à esquerda, "Seus pedidos" à direita.
- **Abaixo de `lg`:** uma coluna, "Seus dados" e depois "Seus pedidos" (a ordem do DOM e do `SPEC.md`).
- **Por que essa ordem, também em 390:**
  - a mesma ordem do DOM em todas as larguras: a ordem visual e a do Tab nunca se separam;
  - a partir de `lg`, o aviso "Dados salvos." (no topo à direita) nunca cruza a coluna de "Seus dados" (seção 4); com os pedidos à esquerda, ele cobriria quase toda a largura do "Salvar alterações" na coluna da direita (de x 848 a 1264, contra o aviso de 872 a 1288, em 1440);
  - **o custo:** em 390, "Seus pedidos" começa a cerca de 1300 px do topo, e o "Ver meus pedidos" da confirmação chega ao topo da página. A alternativa sem mudar a ordem é a âncora `/profile#seus-pedidos` no botão da confirmação (o `scrollBehavior` da SPEC-M §10.1 já respeita a âncora com a reserva do topo, e o foco vai ao `main` com `preventScroll`); o arquivo é da etapa 7. Fica como pergunta ao usuário (seção 12).

**Contêineres (g):**

- `section.profile-page__secao` (nomeada pelo `h2`, hoje com `aria-labelledby`) em `--m3-surface-container-low`, canto 28, **sem sombra**, `padding: var(--space-4)` abaixo de `sm` e `var(--space-5)` a partir dele; `--space-3` entre o `h2` e o conteúdo; `reserva-de-sombra`.
- **Por que esse contêiner:** é o das seções do pagamento (título dentro, conteúdo, lista segmentada dentro na "Forma de pagamento"; desenho do Carrinho, 5.6 e 5.7). A bandeja de padding 8 do carrinho tem o `h2` escondido; aqui os títulos são visíveis.
- **Os campos dentro:** sem fundo, tomam o `low`; contorno 4,06.

**Comportamento:** 1440, 463 e 649 px; 1024, 390 e 546; 390, 358 cada, empilhados com `--space-5` entre eles.

**Movimento:** nenhum.

### 5.7 "Seus dados" (decisão h)

| Campo | Origem |
|---|---|
| Nome, Sobrenome, E-mail, Celular | `ProfileView.vue`, mesmas validações do cadastro |
| CEP | ajuda "Consultamos o CEP no ViaCEP para preencher rua, bairro, cidade e UF." ou "Buscando endereço…"; **`live`** |
| Rua / Rua e número, Bairro | somente leitura, ou editáveis com CEP único da cidade (`manual`) |
| Cidade, UF | somente leitura; linha `3fr` e `1fr` (hoje) |
| "Salvar alterações" | `BaseButton variant="secondary" block`; "Salvando…"; toasts "Dados salvos." e "Não foi possível salvar. Tente de novo." |
| Texto de exclusão | "Excluir a conta apaga deste navegador seus dados, o histórico de pedidos e o carrinho." |
| "Excluir conta" | `BaseButton variant="danger" icon-start="trash-can"` (era `ghost`) |

**Somente leitura:** 5.1. Rua e Bairro passam de somente leitura a editáveis (traço → contorno contínuo) quando o CEP é único da cidade, e voltam quando o CEP muda (hoje). O rótulo da rua troca entre "Rua" e "Rua e número" (hoje).

**"Salvar alterações" (e, h): tonal, `block`, 44 px.**

- O filled é de ênfase alta, para ações importantes ou finais; o tonal, de ênfase média [55]. O filled fica com as ações que levam o fluxo adiante (Entrar, Criar conta, Finalizar pedido); salvar o perfil é manutenção, e o `SPEC.md` o põe como secundário (§5.9).
- Nenhum outro filled na região: o "Ver cardápio" do `EmptyState` fica em "Seus pedidos", outra região.
- `block` na largura do formulário (hoje ele estica pelo flex; o `block` deixa isso explícito). O contêiner tonal contra o `low` dá 1,16: isento, porque um controle com texto dispensa borda [98] (o precedente do "Criar conta" do carrinho); o rótulo dá 7,22 (SPEC-M §2.2).
- O `loading` ("Salvando…") é da etapa 10.

**Bloco de excluir:**

- Divisor de 1 px em `outline-variant` (decorativo, 1,53; o texto e o botão o identificam [98]), a `--space-6` do formulário, com `--space-5` até o texto (hoje).
- Texto em body-m, `on-surface-variant` (8,41).
- O botão fica longe do "Salvar alterações" (o divisor e 56 px entre os dois): alvo apertado aumenta os toques errados [H19], e o "Excluir conta" abre a confirmação.

**"Excluir conta" com a tinta `error` (h): é a variante `danger` que já existe, e não variante nova nem regra da página.**

- A §5.9 da SPEC-M pede a tinta `error` e cita a §4.1, onde a linha do `danger` diz "texto em `--m3-error`" e recomenda o text button com a tinta `error` e a camada de estado. Trocar `variant="ghost"` por `variant="danger"` na `ProfileView` é a §5.9 cumprida com o componente de hoje.
- **Até a etapa 10, a forma da Brasa** (`.btn--legado`: canto 8, borda transparente de 1 px, fundo `error-container` no hover e no pressionado), como o "Remover" do carrinho. A etapa 10 desenha o `danger` e leva os dois juntos.
- **Por que não uma regra da página:** pintar o text button de fora pediria especificidade sobre a raiz do `BaseButton` só para a cor, e a etapa 10 teria de desfazê-la; o `danger` já é o nome da ação destrutiva no projeto (`SPEC.md` §8, [CON-09]).
- **Pares (medidos):** `error` sobre o `low`, 5,84 (mínimo 4,5); no hover e no pressionado, `error` sobre `error-container`, 4,99 (par de hoje); anel sobre o `low`, 5,83.
- O "Excluir conta" do diálogo também é `danger` (hoje). Os dois têm o mesmo nome e a mesma forma, mas o diálogo é modal: não há como confundir um com o outro na mesma tela.

**O diálogo "Excluir conta?" (h):**

| Campo | Origem |
|---|---|
| Título | "Excluir conta?" (`title-id="excluir-conta-titulo"`, `max-width="480px"`) |
| Texto | "Seus dados, o histórico de pedidos e o carrinho serão apagados deste navegador. Não é possível desfazer." |
| Botões | "Cancelar" (`secondary`, `disabled` durante a exclusão) e "Excluir conta" (`danger`, "Excluindo…") |

- **Desta etapa:** o texto (o de hoje, que só existe por causa do `localStorage`, item 7 do pacote); a ordem dos botões, o seguro antes e o destrutivo por último, alinhados ao fim (hoje); o foco inicial no título: o corpo não tem nada focável, e o `BaseDialog` o põe no `h2` (hoje), longe do botão destrutivo.
- **Da etapa 10:** o contêiner, o sheet, o fundo, o botão de fechar, o `danger` e o `loading`. Pontos para ela:
  - em 390, o sheet de hoje tem a altura da tela para duas linhas de texto (captura `profile-excluir-390-viewport.png`);
  - se a exclusão falhar, o erro vai para o toast, mas o diálogo continua aberto na top layer, com a página inerte (SPEC-M §2.7; desenho do Cardápio, 5.5.6): o aviso fica atrás do fundo do diálogo. Com uma API, a falha é possível; a etapa 10 decide onde o erro aparece com o diálogo aberto (seção 11).
- **Ao confirmar:** apaga e vai a `/` com o toast "Conta excluída." (hoje).

**Comportamento:** 1440, a coluna de 463 (campos de 415); 1024, 390 (campos de 342); 390, 358 (campos de 326).

**Reservas:** CEP único da cidade (rua obrigatória, "Informe a rua e o número."); CEP trocado (o endereço some até a consulta responder, hoje); o envio espera a consulta (hoje).

### 5.8 "Seus pedidos" (decisão i)

| Campo | Origem |
|---|---|
| Lista | `userStore.orderHistory`, do mais recente ao mais antigo (`orders`, hoje) |
| "Pedido #1001" | "Pedido " e `order.id` em `span.tabular` |
| Total | `formatPrice(order.total)` |
| Data | `formatDate(order.date)` ("17/10/2026, 19:15"), em `time[datetime]` |
| Contagem | `formatItemCount(countItems(order))` ("1 item", "3 itens") |
| Status | `order.status`: sempre "Recebido" (`placeOrder`) |
| "Ver itens" | `details`/`summary` com o `OrderSummary variant="readonly" :show-title="false"` |
| Vazio | `EmptyState` "Você ainda não fez pedidos", ação "Ver cardápio" (`/menu`) |

**O item (i): lista segmentada, e não cards separados.**

- `ul.profile-orders[role=list]` com `gap: var(--m3-vao-segmento)` (2 px) → `li.profile-order` em `--m3-surface-container-lowest`, cantos pelas variáveis do `M3ItemLista` (`--m3-item-canto-cima` e `--m3-item-canto-baixo`): 20 por fora e 4 por dentro, pela posição; um só item, 20 nos quatro ([66], [81], [8]). `padding: var(--space-4)`; `reserva-de-sombra` em cada item (o fundo e o vão somem nas cores forçadas, a lição da construção do carrinho).
- **Por quê:** os pedidos são uma lista de coisas do mesmo tipo, e a lista segmentada é o padrão da Home, do carrinho e do pagamento. Cards com borda dariam "cards SaaS iguais", e cards com sombra contrariam a elevação tonal ([1], [13]).
- **Não é ação:** o item não tem hover nem foco; o foco fica no "Ver itens".

**Hierarquia e disposição:**

- **Linha 1:** `div.profile-order__head` → `p.profile-order__number` ("Pedido #1001", title-m 16/24, 500, `on-surface`) no início e `p.profile-order__total.tabular` (title-m 500, `on-surface`) no fim, como o nome e o total do item do carrinho.
- **"Pedido #1001" é `p`, e não `h3`:** é o nome do item de lista, como no `M3ItemLista` e no `CartItem` (SPEC-M §4.1). A lista já diz "item 1 de 3", e dez `h3` encheriam a navegação por títulos. Sem salto: `h1` → `h2` "Seus pedidos" → lista.
- **Linha 2:** `div.profile-order__meta` (flex, com quebra, `gap: var(--space-3)`, `align-items: center`) → `p` com o `time`, `p` com a contagem (body-m, `on-surface-variant`, 9,29) e `p.profile-order__status`, empurrado para o fim (`margin-inline-start: auto`), alinhado com o total de cima.
- **Linha 3:** o "Ver itens".

**O "·" (i): sai, pela regra 7.g** (desenho do Carrinho, §12; confirmada pelo usuário em 22/11/2026).

- "17/10/2026, 19:15 · 1 item · R$ 29,49" junta três dados de tipos diferentes. O total vai para a linha 1, no lugar do total da linha do carrinho; a data e a contagem viram dois parágrafos lado a lado, separados por espaço.
- **Nome acessível:** cada dado é um parágrafo próprio; a leitura linear fica "Pedido #1001", "R$ 29,49", "17/10/2026, 19:15", "1 item", "Recebido", "Ver itens". Parágrafos separados dão a pausa que o "·" não dava (inferência: como cada leitor separa parágrafos não está no dossiê). Nenhum rótulo novo ("Data", "Itens") entra: seriam textos que o app não tem.
- **Por que o total na linha 1, e o status na 2:** com o status logo antes do total, a leitura seria "Recebido R$ 29,49", que soa como valor recebido.

**O status "Recebido" (i): rótulo de status, e não chip.**

- **O que a pesquisa diz:** o chip é um elemento compacto e interativo; os quatro tipos recebem `onClick` [60]; no material-web, os conjuntos de chips são toolbars [141]. O badge indica status, mas fica sobre outro elemento [35]. Não encontrei componente M3 não interativo para status solto.
- **Decisão:** um texto num contêiner tonal, que não se parece com controle:
  - `p.profile-order__status`: label-l 14/20, 500, em `--m3-info` sobre `--m3-info-container` (5,00), canto `--m3-forma-s` (8; chips em small [7]), `padding: var(--space-1) var(--space-2)` (28 px de altura);
  - sem hover, sem camada, sem foco, sem `cursor: pointer`, sem ícone (o check lembraria o filter chip marcado [60]), sem papel ARIA: o texto carrega o estado;
  - `reserva-de-sombra` (a forma continua nas cores forçadas).
- **O nome "chip" sai dos documentos desta etapa:** a classe fica (`.profile-order__status`), e o texto diz "rótulo de status". A SPEC-M §5.9 e o plano dizem "chip"; a sessão C ajusta a §5.9.
- **Fica na página, sem componente:** só o perfil o usa nesta etapa. A etapa 9 tem os quatro status do painel e decide se o rótulo vira componente (`M3*`, decisão j), como o desenho da Home previu para o "12º" (desenho da Home, §7).
- **O que não existe e não aparece:** outro status, rastreio, previsão.

**"Ver itens" (i): `details`/`summary` nativo, com cara de text button.**

- **Semântica:** o nativo. O padrão Disclosure da APG usa um botão com `aria-expanded` e Enter e Espaço para alternar [159]; a 4.1.3 manda o disclosure para a 4.1.2 [151], e os controles HTML padrão a cumprem quando usados conforme a especificação [96]. A APG não fala de `details` [159]; como cada leitor anuncia o `summary` não foi conferido (dossiê): o `axe-scan.mjs` mede, e nenhum ARIA entra por cima do nativo.
- **Marcador:** sai o triângulo nativo (`list-style: none` e o `::-webkit-details-marker`); entram dois ícones do Font Awesome, `chevron-right` fechado e `chevron-down` aberto, trocados por `details[open]`, como a seta que a APG descreve (para a direita fechado, para baixo aberto [159]). **Sem `transform`:** a troca é de ícone, igual com e sem movimento reduzido (giro estático também só valeria em `motion-ok`).
- **O `summary`:** `display: inline-flex`, `min-height: var(--target-min)` (44 px), `padding-inline: var(--space-3)`, `gap: var(--space-2)`, canto `full`, label-l 500 em `--m3-primary`, com a camada de estado (8% e 10% de `primary`) [12]: a forma e a tinta do text button da loja. Alinhado ao texto de cima por `margin-inline-start: calc(-1 * var(--space-3))`, como o "Alterar no perfil" (desenho do Carrinho, 5.6).
- **Foco:** anel por dentro (`anel-interno`): com o recuo de −12, sobram 4 px até a borda do item, e o anel de fora (2 + 3 px) passaria dela. Anel 6,44 sobre o item e 5,59 com o pressionado (medidos).
- **Pares (medidos; mínimo 4,5 no texto):** `primary` sobre o item, 6,43; com a camada de hover, 5,74; pressionado, 5,57. O chevron é `currentColor`.
- **Aberto:** o `OrderSummary` somente leitura aparece abaixo, a `--space-2`, **só com a tipografia, sem caixa** (SPEC-M §4.2; desenho do Carrinho, 5.3): linhas em body-l, detalhes em body-m `on-surface-variant` (9,29), divisor `outline-variant` e o Total em headline-s 500. O `overflow-wrap: anywhere` da etapa 7 segura a observação sem espaço.
- **Sem animação:** o conteúdo aparece e some direto.

**Sem pedidos (i):** o `EmptyState` de hoje dentro do contêiner, abaixo do `h2`, com a ação "Ver cardápio" (filled; 5,82 contra o `low`). O visual é da etapa 10, que desenha o `EmptyState` do carrinho, do Cardápio e do perfil de uma vez; os pares de texto sobre o `low` já existem (15,49 e 8,41).

**Comportamento:** 1440, itens de 601 px; 1024, 498; 390, 326, com a linha 2 quebrando para o rótulo de status quando não cabe (a data e a contagem somam cerca de 180 px, e o rótulo, cerca de 80, em 294 de conteúdo: cabe; o total "R$ 1.948,00" ainda cabe na linha 1).

**Reservas:**

- **Dez pedidos:** a lista cresce; sem paginação (hoje). Cada item fechado tem cerca de 140 px.
- **Pedido com muitos itens:** o `details` aberto cresce; os outros itens descem.
- **Observação de 140 caracteres sem espaço:** quebra (`overflow-wrap`, etapa 7).
- **Pedido fora do formato:** sai do histórico na carga (`SPEC.md` §10.3, hoje).

### 5.9 O que o admin e o modal recebem nesta etapa (decisão m)

Sem desenhar o admin (etapa 9):

| Onde | O que chega já | Fica bom? | O que a etapa 9 (ou a 10) resolve |
|---|---|---|---|
| Login do admin (`LoginAdminView.vue`) | O painel `low` de canto 28 sem sombra, os campos outlined e o banner novo, no topo (o `_login-admin.scss` usa o `_auth.scss`) | Sim, sobre a ilustração escura com a camada de hoje: o texto mede sobre o painel, não sobre a ilustração (SPEC-M §5.11) | A ilustração e o `scrim` (32%); o banner junto do botão e a região `role="alert"` sempre no DOM (o mesmo invólucro do 5.3, no arquivo dela); o bloco "Usar admin de teste", com borda tracejada em `outline-variant`; o "Voltar à loja" (link solto, não frase: text button?) |
| Filtros `select` de Pedidos e Produtos | O campo outlined de 56 px com a seta do Font Awesome, sobre o `surface-container` da página (3,85) | Sim, na largura de hoje (até 16rem) | A densidade do painel (`SPEC.md` §5.11): se pedir campo denso, o de 48 dp do exemplo do Compose [119] entra como prop então |
| Campos do `ModalProducts` | Os campos outlined sobre o `surface-container` do diálogo (3,85), com o select | Sim | O seletor de arquivo (`.file-picker`), que imita a ajuda e o erro do `FormGroup` com classes próprias: alinhar ao recuo de 16 e ao ícone na primeira linha. O `BaseDialog` é da etapa 10 |
| Observação do modal Personalizar | O `textarea` outlined sobre o `surface-container` do diálogo (3,85), placeholder 7,97, contador tabular | Sim | O rótulo "Observação" fica em label-l 500, abaixo dos `h3` vizinhos em title-m 500: é o rótulo do campo, não título de seção. Se a superfície do diálogo mudar na etapa 10, os pares se medem de novo |
| Homes do acervo | O modal real mostra o campo novo | — | Efeito aceito (SPEC-M §11.4) |

O `SearchBar` do painel não usa o `FormGroup` e continua com o `--color-input` (etapa 9).

---

## 6. Matriz de estados

Mesmo formato da §6 do SPEC-M, com a coluna de erro para o campo. "Anel" é o contorno de 3 px em `--m3-secondary` [30], afastado 2 px; "anel encostado", `outline-offset: 0`; "anel interno", `outline-offset: calc(-1 * var(--focus-width))`; "camada", o `currentColor` a 8% no hover (só `hover-capable`) e 10% no pressionado [12].

| Componente | Padrão | Hover | Foco | Pressionado | Selecionado | Desabilitado | Carregando | Erro |
|---|---|---|---|---|---|---|---|---|
| `FormGroup`: texto, e-mail, senha, tel, número, data | sem fundo; contorno 1 px `outline` (4,06 no `low`, 3,85 no `surface-container`); canto 12; 56 px; rótulo label-l 500 `on-surface`; valor body-l `on-surface`; placeholder `on-surface-variant` | contorno `on-surface` [135] | contorno e rótulo `primary` [135]; anel encostado | — | — | contorno `outline-variant`; textos em `--color-ink-disabled`; fora do Tab (isento [98]) | — | contorno, rótulo e cursor `error`; mensagem body-m `error` com ícone, no lugar da ajuda; `aria-invalid`; com hover, contorno e rótulo `on-error-container`; com foco, `error` e o anel |
| `FormGroup`: `select` | o do texto, com `appearance: none` e o `chevron-down` de 20 px em `on-surface-variant` no fim | idem | idem | — | opção nativa | idem | — | idem |
| `FormGroup`: `textarea` | o do texto; 3 linhas (104 px); `resize: vertical`; contador "0/140" na ajuda, tabular | idem | idem | — | — | idem | — | idem |
| `FormGroup`: somente leitura | contorno 1 px **tracejado** `outline`; valor e rótulo `on-surface` inteiros; `cursor: default` | — (sem hover) | só o anel encostado; o contorno não acende | — | — | — | — | — (não valida [131]) |
| Ajuda do CEP (`live`) | texto body-m `on-surface-variant`, recuo 16; região `role="status"` desde a montagem | — | — | — | — | — | arco de 1em girando em `--dur-spin` (`motion-ok`); parado com movimento reduzido; "Buscando endereço…" | o erro da consulta no lugar da ajuda, anunciado |
| `FormGroup` em `forced-colors` e `prefers-contrast: more` | cores do sistema; mais contraste: contorno `on-surface-variant` (8,41 e 7,97) | — | anel | — | — | — | — | ícone e texto ficam |
| Painel (`auth-panel`) | `surface-container-low`, canto 28, sem sombra; borda nos modos de contraste | — | — | — | — | — | — | — |
| Banner de erro | `error-container`, canto 16; texto `on-error-container` (7,23); ícone `error` (4,99); acima do botão; região `role="alert"` sempre no DOM | — | não recebe foco (o foco fica no botão) | — | — | — | — | — |
| Aviso de conta salva | `aviso-container`, canto 16; texto e ícone `aviso` (5,03); no topo; ligado ao botão por `aria-describedby` | — | — | — | — | — | — | — |
| Banner e aviso em `forced-colors` e `prefers-contrast: more` | borda de 1 px (`CanvasText`; `outline` com mais contraste, 4,06 contra o painel) | — | — | — | — | — | — | — |
| Botão de envio (Entrar, Criar conta) | filled M, `block` (5,82 contra o painel) | `primary-hover` | anel (5,83) | `primary-pressed`, cantos `forma-l` | — | hoje: `surface-container-highest` e `ink-disabled` (etapa 10) | "Entrando…", "Criando conta…", spinner e `aria-busy` (etapa 10) | — |
| Link do rodapé do painel | `link-inline`: `on-surface` (15,49), sublinhado, 500; frase em `on-surface-variant` (8,41); 24 px de alvo | — | anel (5,83) | — | — | — | — | — |
| "Sair" | text button, tinta `primary` (6,13 sobre a `surface`) | camada 8% (5,48) | anel (6,15) | camada 10% (5,33; anel 5,34) | — | — | — | — |
| "Salvar alterações" | tonal, 44 px, `block`; contêiner 1,16 contra o `low` (isento [98]); rótulo 7,22 | `secondary-container-hover` | anel (5,83) | `secondary-container-pressed`, cantos `forma-s` | — | — | "Salvando…" (etapa 10) | — |
| "Excluir conta" (forma da Brasa até a etapa 10) | `danger`: tinta `error` (5,84 sobre o `low`), canto 8 | `error-container` (4,99) | anel (5,83) | `error-container` | — | — | — (o do diálogo, "Excluindo…", é da etapa 10) | — |
| Contêiner do perfil | `surface-container-low`, canto 28, sem sombra; borda nos modos de contraste | — | — (não é interativo) | — | — | — | — | — |
| Item do histórico | `surface-container-lowest`, cantos 20/4, vão de 2 px; borda nos modos de contraste | — (não é ação) | no "Ver itens" | — | — | — | — | — |
| Rótulo de status | `info` sobre `info-container` (5,00), `forma-s`, label-l 500, 28 px | — (sem camada nem cursor) | — (não recebe foco) | — | — | — | — | — |
| "Ver itens" | text button: tinta `primary` (6,43 sobre o item), 44 px, canto `full`, `chevron-right` | camada 8% (5,74) | anel interno (6,44) | camada 10% (5,57; anel 5,59) | aberto (`details[open]`): `chevron-down` e o resumo abaixo | — | — | — |

Os estados de vazio seguem a §6 do `SPEC.md`: o perfil sem pedidos tem o `EmptyState` (5.8).

---

## 7. Inventário

**Contagem:** nenhum componente novo. Muda **1 componente**, o `FormGroup` (estrutura, parcial e a prop `live`), e mudam **3 views** (`LoginView`, `RegisterView` e `ProfileView`), com as parciais de `pages/auth/`. O painel, o banner, o aviso, os contêineres, o item do histórico, o rótulo de status e o "Ver itens" ficam nas views e nas parciais, sem `M3*` novo. O `BaseButton`, o `OrderSummary`, o `BaseDialog`, o `EmptyState` e o `AppToast` não mudam. Nada vem de `src/direcoes/`.

### 7.1 `FormGroup` (muda)

- **Props:** as de hoje, com os mesmos tipos e padrões (5.1), e `live: { type: Boolean, default: false }`.
- **Emits:** `update:modelValue` e `blur` (hoje). **Slots:** nenhum.
- **Estrutura:** `div.form-group(.has-error)(.is-readonly)(.is-disabled)` → `label.form-group__label` → `input.form-group__field` | `textarea.form-group__field.form-group__field--textarea` | `span.form-group__select` (`select.form-group__field.form-group__field--select` e `.form-group__seta`) → `div.form-group__mensagens` (`role="status"` e `aria-atomic="true"` com `live`; renderizada com `live`, ou com erro, ajuda ou carregando) → `p.form-group__error` (`span.form-group__icone` com o ícone e o texto) ou `p.form-group__help` (o spinner e o texto).
- **Lógica de apresentação:**
  - `describedBy`: o id do erro, se houver; senão, o da ajuda (hoje vão os dois);
  - a ajuda só renderiza sem erro;
  - `.is-readonly` só com `readonly`; `.is-disabled` com `disabled`.
- **Espaçamento sem `gap` no grupo:** o rótulo leva `margin-block-end: var(--space-2)`, e as mensagens, `margin-block-start: var(--space-1)`. Assim, a região viva vazia do CEP não soma vão.
- **Classes que ficam:** `.form-group`, `.has-error`, `.form-group__label`, `.form-group__field`, `.form-group__field--select`, `.form-group__field--textarea`, `.form-group__help`, `.form-group__error`, `.form-group__spinner`; os ids `{id}-erro` e `{id}-ajuda` (os testes leem os dois).
- **Tokens:** `--m3-outline`, `--m3-on-surface`, `--m3-on-surface-variant`, `--m3-primary`, `--m3-error`, `--m3-on-error-container`, `--m3-outline-variant`, `--color-ink-disabled`, `--m3-forma-m`, `--m3-body-l`, `--m3-body-m`, `--m3-label-l` (com as linhas), `--space-1` a `--space-4`, `--dur-spin`.
- **Mixins:** `tipo`, `hover-capable`, `motion-ok`.
- **Referências:** [118] a [125], [131] a [140], [142] a [146], [149] a [153], [158], [8], [30], [98], [99].

### 7.2 `LoginView` (muda)

- **Estrutura:** `div.auth-page.container` → `section.auth-panel` → `h1` → `form.auth-form` (E-mail, Senha, `div.auth-form__envio` com `div.auth-form__anuncio[role=alert][aria-atomic=true]` → `div.auth-alert` e o botão) → `p.auth-panel__footer`.
- **Lógica:** a de hoje, mais a rolagem do foco depois de mostrar o banner (seção 8).

### 7.3 `RegisterView` (muda)

- **Estrutura:** a do login, com o aviso `#aviso-conta-salva.auth-alert.auth-alert--warning` entre o `h1` e o formulário, a grade dos nomes e o CEP com `live`.
- **Lógica:** a de hoje, mais a rolagem do foco depois do banner.

### 7.4 `ProfileView` (muda)

- **Estrutura:** `div.profile-page.container` → `header.profile-page__header` (`h1`, "Sair") → `div.profile-page__layout` → `section.profile-page__secao` "Seus dados" (formulário, CEP com `live`, "Salvar alterações" `block`, `div.profile-delete` com o `danger`) e `section.profile-page__secao` "Seus pedidos" (`ul.profile-orders` → `li.profile-order` → `div.profile-order__head`, `div.profile-order__meta`, `details.profile-order__details` → `summary.profile-order__summary` com os dois chevrons e o `OrderSummary`; ou o `EmptyState`) → `BaseDialog`.
- **Classes:** sai `.profile-page__card` (vira `.profile-page__secao`); entram `.profile-order__total`, `.profile-order__chevron`; ficam `.profile-order`, `.profile-order__number`, `.profile-order__meta`, `.profile-order__status`, `.profile-order__details`, `.profile-order__summary` (o `flow.mjs` lê o número e a linha; ver a seção 9).
- **Lógica:** a de hoje, mais a rolagem do foco depois do aviso de "Salvar alterações" (seção 8).

### 7.5 Parciais

- `pages/auth/_auth.scss`: o painel, o banner (`.auth-alert`), o aviso (`.auth-alert--warning`), o grupo de envio, o rodapé (500, ao início). Sai o `font-weight: 700` do link.
- `pages/auth/_register.scss`: largura de 560 e a grade dos nomes com `align-items: start`.
- `pages/auth/_profile.scss`: cabeçalho, grade, contêineres, item, rótulo de status, "Ver itens" e o `:global()` do `scroll-padding` com o aviso.

### O que fica sem uso (para a etapa 11, salvo quando dito)

- **Pares** (seção 8): três saem já na sessão C; os de `PARES_COMUNS` com o `--color-input` perdem o uso no campo e saem com os apelidos.
- **Apelidos:** o `--color-input` fica só no `SearchBar` do admin (etapa 9); o `--color-ink-disabled` passa a servir ao campo desabilitado, além do botão: a etapa 10 ou a 11 dá a ele um nome M3, para os dois juntos (ele não está entre os seis apelidos que ficam, SPEC-M §0.1, decisão a).
- **Ícones:** nenhum fica sem uso; `chevron-down` e `chevron-right` já estão no plugin.

---

## 8. Tokens, pares, lógica, dependências e textos

### Tokens novos

**Nenhum.** A altura do campo é `3.5rem` (como o `.btn--lg`), a ponta do `select` sai de `--space-3`, do ícone de 20 px e de `--space-4`, e o resto usa os tokens que existem: `--m3-forma-m`, `--m3-forma-xl`, `--m3-forma-l`, `--m3-forma-s`, `--m3-vao-segmento`, `--m3-toast-reserva` (etapa 7), `--m3-barra-reserva`. Nenhuma cor, duração ou z-index novo.

### Pares novos (para `src/utils/contraste.js`, num grupo `PARES_CONTA`)

| Frente | Fundo | Mínimo | Medido | Onde |
|---|---|---|---|---|
| `m3-outline` | `m3-surface-container` | 3 | 3,85 | Contorno do campo no diálogo (observação, `ModalProducts`) e nas páginas do admin (filtros) |
| `m3-error` | `m3-surface-container-low` | 4,5 | 5,84 | Erro, rótulo e contorno do campo com erro no painel e no perfil; "Excluir conta" |
| `m3-error` | `m3-surface-container` | 4,5 | 5,54 | Os mesmos no diálogo e no admin (é o `color-danger` sobre `color-surface-2` de `PARES_COMUNS`, com os nomes M3) |
| `m3-on-error-container` | `m3-surface-container-low` | 4,5 | 8,46 | Contorno e rótulo do campo com erro no hover (painel e perfil) |
| `m3-on-error-container` | `m3-surface-container` | 4,5 | 8,02 | Os mesmos no diálogo e no admin |
| `m3-primary` | `m3-camada-primary-pressionada` sobre `m3-surface` | 4,5 | 5,33 | "Sair" pressionado (hover: 5,48); também os text buttons da Home pressionados sobre a superfície |
| `m3-secondary` | `m3-camada-primary-pressionada` sobre `m3-surface` | 3 | 5,34 | Anel do "Sair" pressionado |
| `m3-primary` | `m3-camada-primary-pressionada` sobre `m3-surface-container-lowest` | 4,5 | 5,57 | "Ver itens" pressionado (hover: 5,74) |
| `m3-secondary` | `m3-camada-primary-pressionada` sobre `m3-surface-container-lowest` | 3 | 5,59 | Anel interno do "Ver itens" pressionado |

### Pares que ganham uso (o "onde" muda)

| Frente | Fundo | Medido | Novo uso |
|---|---|---|---|
| `m3-outline` | `m3-surface-container-low` | 4,06 | Contorno do campo no painel e no perfil; tracejado do somente leitura; borda do banner e do aviso com `prefers-contrast: more` |
| `m3-on-surface` | `m3-surface-container-low` | 15,49 | Valor e rótulo do campo; contorno no hover; `h1` do painel, `h2` do perfil; link do rodapé do painel |
| `m3-on-surface` | `m3-surface-container` | 14,68 | Valor e rótulo do campo no diálogo e no admin; contorno no hover |
| `m3-on-surface-variant` | `m3-surface-container-low` | 8,41 | Placeholder, ajuda e seta do `select`; frase do rodapé do painel; texto de exclusão; contorno com `prefers-contrast: more` |
| `m3-on-surface-variant` | `m3-surface-container` | 7,97 | Placeholder, ajuda e contador no diálogo; seta dos filtros; contorno com `prefers-contrast: more` |
| `m3-primary` | `m3-surface-container-low` | 5,82 | Contorno, rótulo e cursor do campo com foco; filled contra o painel; "Ver cardápio" do `EmptyState` |
| `m3-primary` | `m3-surface-container` | 5,52 | Contorno e rótulo do campo com foco no diálogo e no admin. **O mínimo de hoje (3, em `PARES_CARDAPIO`) sobe para 4,5**: o rótulo é texto |
| `m3-primary` | `m3-surface-container-lowest` | 6,43 | Texto e chevron do "Ver itens". **O mínimo de hoje (3) sobe para 4,5** |
| `m3-secondary` | `m3-surface-container-low` / `m3-surface-container` | 5,83 / 5,53 | Anel dos campos, do botão de envio, do link do rodapé, do "Salvar" e do "Excluir conta" |
| `m3-secondary` | `m3-surface-container-lowest` | 6,44 | Anel interno do "Ver itens" |
| `m3-on-surface` / `m3-on-surface-variant` | `m3-surface-container-lowest` | 17,11 / 9,29 | Número, total e resumo do pedido / data, contagem e detalhes |
| `m3-on-error-container` | `m3-error-container` | 7,23 | Texto do banner de erro (`PARES_OUTRAS_TELAS`, "texto sobre o banner de erro") |
| `m3-error` | `m3-error-container` | 4,99 | Ícone do banner; "Excluir conta" no hover e pressionado |
| `m3-aviso` | `m3-aviso-container` | 5,03 | Texto e ícone do aviso de conta salva |
| `m3-info` | `m3-info-container` | 5,00 | Rótulo de status "Recebido" |
| `m3-primary` / `m3-secondary` | `m3-surface` | 6,13 / 6,15 | "Sair" e o anel dele (SPEC-M §2.2) |
| `m3-outline` | `m3-surface` | 4,27 | Borda do painel e dos contêineres do perfil com `prefers-contrast: more` (o SPEC-M arredonda para 4,28) |

### Medidos e descartados ou isentos

- `m3-outline-variant` sobre `m3-surface-container-low` / `m3-surface-container`: 1,53 / 1,45. A borda do outlined tonal do Expressive [125] reprova a 1.4.11 [98]: por isso as cores padrão. Fica no contorno do desabilitado (isento [98]) e no divisor de exclusão (decorativo).
- `m3-surface-container` contra `m3-surface-container-low`: 1,05. O contêiner do filled tonal [125] não identifica o campo.
- `m3-surface-container-highest` contra `m3-surface-container-low` / `m3-surface-container`: 1,16 / 1,10. O fundo do híbrido da SPEC-M §5.8 não identifica o campo: sai.
- `--color-ink-disabled` sobre `m3-surface-container-low`: 2,22. Desabilitado, isento [98].
- `m3-info-container` contra `m3-surface-container-lowest`: 1,29. O fundo do rótulo de status não é controle; o texto (5,00) leva o estado.
- `m3-error-container` e `m3-aviso-container` contra `m3-surface-container-low`: 1,16. Fundos do banner e do aviso; o texto os identifica; a borda entra nos modos de contraste.
- `m3-outline` contra `m3-error-container` e `m3-aviso-container`: 3,47. A borda de mais contraste também passa contra o próprio fundo.
- `m3-on-surface` sobre `m3-error-container`: 13,24. A sugestão da SPEC-M §5.8 para o texto do banner; trocada pelo `on-error-container` (7,23).
- `m3-error` sobre `m3-camada-pressionada` sobre `m3-surface-container-low`: 4,79. Sem uso: o `danger` de hoje usa o fundo `error-container`; a etapa 10 mede o text button `danger` com a camada.

### Pares de hoje que mudam

| Par | O que acontece |
|---|---|
| `PARES_OUTRAS_TELAS`, "borda de campo": `m3-outline` sobre `m3-surface-container-highest` (3,48) | Perde o uso: o campo não tem mais fundo. Sai na sessão C; o contorno passa a medir contra o painel (4,06) e contra o diálogo (3,85) |
| `PARES_TELAS_BRASA`, "erro sobre o campo": `m3-error` sobre `m3-surface-container-highest` | Sai: a mensagem fica sobre o contêiner (5,84 e 5,54) |
| `PARES_TELAS_BRASA`, "texto do banner de erro": `m3-on-surface` sobre `m3-error-container` | Sai: o texto passa a `on-error-container` (7,23) |
| `PARES_COMUNS`, "texto do campo", "placeholder da observação" e "borda do campo" (sobre `color-input`) | Perdem o uso no campo; o "onde" muda (o `--color-input` fica no `SearchBar` do admin, etapa 9); saem com os apelidos na etapa 11 |
| `PARES_CARDAPIO`: `m3-primary` sobre `m3-surface-container` e sobre `m3-surface-container-lowest` | O mínimo sobe de 3 para 4,5 (ganham uso de texto) |

### Lógica (nenhuma mudança de fluxo, de serviço nem de store; só o que a apresentação pede)

| O que | Onde | Por quê |
|---|---|---|
| Prop `live`: `role="status"` e `aria-atomic="true"` num contêiner das mensagens que existe desde a montagem | `FormGroup` | Anúncio da consulta do CEP [151], [153] (5.1) |
| O erro toma o lugar da ajuda (no DOM e no `aria-describedby`) | `FormGroup` | [131] (5.1) |
| `span` com a seta no `select`; `.is-readonly` e `.is-disabled` separados | `FormGroup` | 5.1 |
| `live` no CEP | `RegisterView`, `ProfileView` | 5.1 |
| Região `role="alert"` com `aria-atomic` sempre no DOM, com a caixa por `v-if`, junto do botão | `LoginView`, `RegisterView` | [152] (5.3) |
| Depois de mostrar o banner: `await nextTick()` e `document.activeElement?.scrollIntoView?.({ block: "nearest" })` | `LoginView`, `RegisterView` | O botão empurrado não fica sob a toolbar (seção 4) |
| Depois do `toastStore.show` do "Salvar alterações": a mesma rolagem | `ProfileView` | O aviso não cobre o botão focado em 390 (seção 4); a `PaymentView` faz o mesmo (etapa 7) |
| `:global(html:has(.profile-page):has(.toast-region .toast))`: `scroll-padding-bottom` somando `--m3-toast-reserva` abaixo de `md`, e o `scroll-padding-top` de `md` a `lg` | `_profile.scss` | C43 [76] (seção 4) |
| `variant="danger"` no "Excluir conta" da tela (era `ghost`) e `block` no "Salvar alterações" | `ProfileView` | 5.7 |
| Linha do pedido sem "·": o total na linha 1; a data, a contagem e o status em parágrafos | `ProfileView` | 7.g (5.8) |
| Os dois chevrons do "Ver itens", trocados por `details[open]` | `ProfileView`, `_profile.scss` | [159] (5.8) |

Nada muda em `src/services/`, nas stores, no `useFormValidation`, no `useCepLookup`, no `useManualAddress`, nos validadores, nas máscaras, nos handlers, no `toast.js`, nos guards, no `?redirect=` nem nas esperas simuladas.

### Dependências

Nenhuma. Ícones: `circle-exclamation`, `chevron-down`, `chevron-right`, `sign-out-alt`, `trash-can`, `burger` e `xmark`, todos já registrados no plugin.

### Textos

Todos reais. **Nenhuma palavra muda.** Mudam três apresentações:

| Texto | Antes | Depois | Motivo |
|---|---|---|---|
| "17/10/2026, 19:15 · 1 item · R$ 29,49" | uma linha com dois "·" | o total na linha do número; a data e a contagem em parágrafos lado a lado | A regra 7.g da etapa 7, confirmada pelo usuário (5.8) |
| Banner de erro | no topo do formulário | logo acima do botão de envio | O erro aparece onde a pessoa agiu (5.3); desvio registrado do `SPEC.md` §5.8 |
| "Criar conta" e "Entrar" do rodapé do painel | em 700, centrados | em 500, alinhados ao início | O M3 dá Medium ao destaque [1]; uma borda só no painel (5.2) |

Ficam como estão:

| Texto | Origem | Onde |
|---|---|---|
| "Entrar", "Criar conta", "Sua conta", "Seus dados", "Seus pedidos" | views | `h1` e `h2` |
| "E-mail", "Senha", "Nome", "Sobrenome", "Data de nascimento", "Celular", "CEP", "Rua", "Rua e número", "Bairro", "Cidade", "UF" | views | rótulos |
| "Seu nome", "Sobrenome", "voce@exemplo.com", "Mínimo de 6 caracteres, com letra e número", "(47) 99999-9999", "00000-000" | `SPEC.md` §5.8 | placeholders |
| As mensagens dos validadores e "Informe a rua e o número." | `validators.js`, `useManualAddress.js` | erros dos campos |
| "Consultamos o CEP no ViaCEP para preencher o endereço.", "Consultamos o CEP no ViaCEP para preencher rua, bairro, cidade e UF.", "Buscando endereço…", "{cidade}/{UF}. Este CEP vale para a cidade toda: informe a rua.", "CEP não encontrado.", "Não foi possível consultar o CEP agora. Tente de novo." | views, `validators.js` | ajuda e erro do CEP |
| "E-mail ou senha incorretos.", "Não foi possível criar a conta. Tente de novo.", a do WebCrypto | `authHandlers.js` | banner |
| "Já existe uma conta salva neste navegador. Se você criar outra, a anterior será apagada." | `RegisterView.vue` | aviso |
| "Entrando…", "Criando conta…", "Salvar alterações", "Salvando…", "Sair", "Excluir conta", "Excluindo…", "Cancelar" | views | botões |
| "Não tem conta?", "Já tem conta?" | views | rodapé do painel |
| "Excluir a conta apaga deste navegador seus dados, o histórico de pedidos e o carrinho." | `ProfileView.vue` | bloco de excluir |
| "Excluir conta?", "Seus dados, o histórico de pedidos e o carrinho serão apagados deste navegador. Não é possível desfazer." | `ProfileView.vue` | diálogo |
| "Pedido #{n}", "Recebido", "{n} item/itens", a data, "Ver itens", "Você ainda não fez pedidos", "Ver cardápio" | `ProfileView.vue`, `userStore`, `formatters` | histórico |
| "Dados salvos.", "Não foi possível salvar. Tente de novo.", "Conta criada. Entre para continuar.", "Conta excluída.", "Não foi possível excluir a conta. Tente de novo." | `ProfileView.vue`, `authHandlers.js` | toasts |
| "Observação", "Ex.: ponto da carne, sem sal…", "0/140" | `ModalAdditional.vue` | modal |

**Observado, sem mudar (pergunta ao usuário, seção 12):** as mensagens "O email é obrigatório" e "Email inválido" escrevem "email", e o `SPEC.md` padroniza "E-mail" nos formulários (§8, [CON-09]); "Email inválido" não sugere a correção, que a 3.3.3 pede quando ela é conhecida [148].

---

## 9. Arquivos para o construtor (sessão C)

```
src/components/FormGroup.vue                 seta do select, mensagens (erro no lugar da ajuda), prop live,
                                             classes is-readonly e is-disabled
src/assets/styles/components/_form-group.scss   outlined de 56 px, canto 12, estados (5.1), somente leitura
                                             tracejado, desabilitado, select, textarea, modos de contraste
src/views/auth/LoginView.vue                 região do banner junto do botão, rolagem do foco
src/views/auth/RegisterView.vue              idem; aviso no topo; CEP com live
src/views/auth/ProfileView.vue               seções, danger, Salvar block, CEP com live, linha do pedido,
                                             Ver itens com chevrons, rolagem depois do aviso
src/assets/styles/pages/auth/_auth.scss      painel, banner, aviso, grupo de envio, rodapé
src/assets/styles/pages/auth/_register.scss  grade dos nomes com align-items: start
src/assets/styles/pages/auth/_profile.scss   cabeçalho, grade, seções, item, rótulo de status, Ver itens,
                                             scroll-padding com o aviso
src/utils/contraste.js                       PARES_CONTA (9 pares), os "onde" e os mínimos da seção 8,
                                             e os 3 pares que saem
```

**Não mexer:** `BurgerStack.vue`, `AssinaturaEncaixe.vue`, `src/direcoes/`, `src/services/`, `src/stores/`, os composables de validação e de CEP, os handlers, `BaseButton`, `BaseDialog`, `EmptyState`, `AppToast` e `toast.js` (etapa 10), `OrderSummary` (só a tipografia da etapa 7), `ModalAdditional` (recebe o campo sem mudar), `LoginAdminView`, `ModalProducts`, `OrderManagement` e `ProductManagement` (etapa 9), `_motion.scss` (nenhuma classe animada nova).

**Testes:**

- `src/__tests__/FormGroup.test.js` (novo):
  - com `error`: `aria-invalid="true"`, `aria-describedby="{id}-erro"`, o texto no `p#{id}-erro` com o ícone `aria-hidden`; sem erro, nenhum `aria-invalid`;
  - com `helper` e sem erro: `aria-describedby="{id}-ajuda"`; com os dois, só o erro (a ajuda sai);
  - `disabled` e `readonly` chegam ao controle; `.is-disabled` e `.is-readonly` separados;
  - `type="select"`: as opções e a seta com `aria-hidden`;
  - `type="textarea"`: `rows`, `maxlength` e o contador como ajuda;
  - `live`: o contêiner com `role="status"` e `aria-atomic="true"` existe na montagem, mesmo sem ajuda; sem `live`, nenhum `role`;
  - as máscaras de hoje (celular e CEP) continuam.
- `src/__tests__/auth.test.js` (o caso do `LoginView` montado, como o plano pede, ou um `LoginView.test.js`, a critério da sessão C):
  - a região `[role="alert"][aria-atomic="true"]` existe vazia na montagem; depois da senha errada, contém "E-mail ou senha incorretos.", logo antes do botão de envio no DOM;
  - o e-mail continua preenchido; a chamada a `scrollIntoView` não quebra no jsdom.
- `src/__tests__/RegisterView.test.js`: os de hoje ficam. Entram:
  - o aviso `#aviso-conta-salva` antes do `form` no DOM;
  - o CEP com `role="status"` na montagem, contendo a ajuda;
  - no envio vazio, `aria-invalid` e `aria-describedby` com os ids de erro, e o erro do CEP no lugar da ajuda;
  - com a falha do cadastro, a região `role="alert"` com "Não foi possível criar a conta. Tente de novo.".
- `src/__tests__/ProfileView.test.js`: os de hoje ficam. Entram:
  - o rótulo de status "Recebido" é um `p`, sem `role`, sem `tabindex` e sem ser botão;
  - a linha do pedido não tem "·", e o total está em `.profile-order__total`;
  - o "Ver itens" é `summary` dentro de `details`;
  - o "Excluir conta" da tela tem `.btn--danger`;
  - "Rua", "Bairro", "Cidade" e "UF" com `readonly` e `.is-readonly`;
  - o CEP com `role="status"`.

**e2e (`.claude/e2e/`):**

- `flow.mjs`:
  - o login com a senha errada e depois a certa (hoje): o `role="alert"` passa da `.auth-alert` à `.auth-form__anuncio` (o `querySelector` da linha 189 muda), e a espera pelo `[role=alert]` com o texto continua;
  - em "Conta", o total sai da `.profile-order__meta` para a `.profile-order__total`.
- `keyboard.mjs`:
  - a ordem do Tab no cadastro em 390 (seção 5.5), com e sem CEP único da cidade (com a resposta do ViaCEP simulada por `page.route`);
  - o `focusNotCovered` em `#/login`, `#/register` e `#/profile` também com `KB_ALTURA=800`;
  - **o aviso sobre o "Salvar alterações":** em 390 (844 e 800), chegar ao botão pelo Tab, apertar Enter e conferir que o retângulo do botão com o anel não fica inteiro dentro do retângulo do `.toast` (nem cruza a toolbar). Mutação: sem a rolagem da `ProfileView`, o botão fica coberto;
  - **o banner no cadastro em 390:** com a falha simulada, o botão focado não fica sob a toolbar, e o banner está à vista;
  - o anel interno do "Ver itens" (o `ringOf` aceita o `outline-offset` negativo, como nos itens encostados);
  - o `keyboard.mjs` roda no Chromium: as provas valem para ele.
- `axe-scan.mjs`: os estados abaixo.
- `lacunas.mjs`: sem mudança (o guard de `/profile`).

**SPEC-M (no mesmo PR):** a linha `FormGroup` da §4.2 (outlined, rótulo acima, sem o fundo do híbrido) e a do `OrderSummary` (o perfil); as §5.8 e §5.9 ("a desenhar" → desenhado; "chip" → rótulo de status; o banner junto do botão; o texto do banner em `on-error-container`); a linha `FormGroup` da §6 (o hover); a lista "Pares que entram com as outras telas" da §2.2 (a borda de campo passa a 4,06 e 3,85). **CLAUDE.md:** nada desta etapa o desatualiza (a sessão C confere a lista dos componentes base). **README e TESTING:** o `FormGroup.test.js` e a contagem.

**Estados para o axe** (em 1440 e 390, com e sem movimento reduzido):

| Nome | Passos | Seletor estável |
|---|---|---|
| Login | `#/login` | `.auth-panel #entrar-titulo` |
| Login com erro | `#/login` com `USER` na conta → e-mail certo, senha errada → "Entrar" → esperar a mensagem | `.auth-form__anuncio .auth-alert` |
| Cadastro vazio com erros | `#/register` → "Criar conta" | `#firstName[aria-invalid="true"]` |
| Cadastro com conta salva | `#/register` com `USER` | `#aviso-conta-salva` |
| Cadastro buscando o CEP | `#/register` → `page.route` do ViaCEP segurando a resposta → digitar oito dígitos no CEP | `#CEP-ajuda .form-group__spinner` |
| Cadastro com CEP único | `#/register` → `page.route` com rua e bairro vazios → digitar o CEP | `#street` e `#CEP-ajuda` com "vale para a cidade toda" |
| Perfil com pedidos e "Ver itens" aberto | `#/profile` com `LOGGED` → clicar em "Ver itens" | `.profile-order__details[open]` |
| Perfil sem pedidos | `#/profile` com a sessão sem `orderHistory` | `.profile-page .empty-state` |
| Aviso "Dados salvos." | `#/profile` com `LOGGED` → "Salvar alterações" → medir em até 4 s | `.toast` com "Dados salvos." |
| Diálogo de exclusão | `#/profile` com `LOGGED` → "Excluir conta" | `dialog[open] #excluir-conta-titulo` |
| Login do admin | `#/admin/login` | `.admin-login .auth-panel` |
| Filtro do admin | `#/admin/orders` com a sessão do painel | `#statusFilter` |
| Modal com a observação | `#/menu` → "Adicionar Cheese Bacon" → digitar na observação | `dialog[open] #observacao` |

---

## 10. Referências usadas

| Ref. | Publicado ou conceito | Padrão abstraído | Onde entra |
|---|---|---|---|
| [118], [119], [120] Text fields (Compose) | conceito (documentação) | O filled se destaca; o outlined, de ênfase menor, simplifica formulários com muitos campos; somente leitura focável e copiável; o campo denso de 48; o contador no apoio; `MultiLine` que rola depois do máximo | Escolha do outlined, somente leitura, altura, textarea |
| [121], [122] `TextFieldLabelPosition` | conceito | O rótulo `Above`, fora do contêiner e sempre minimizado | Rótulo acima |
| [123], [124], [125] Defaults e código do campo | conceito (código de componente) | 56 dp, 1 e 2 dp, `roundedShape` em `CornerMedium`, cores tonais, nenhuma cor de hover ou somente leitura | Medidas, forma, cores descartadas |
| [126], [127] Senha (Compose) | conceito | Botão de mostrar a senha no fim, com nome que muda ou fixo | Pergunta ao usuário |
| [129], [140] Exposed dropdown e select | conceito | Seleção num campo, ícone final, mesmo erro do campo | `select` |
| [131], [132], [133] Text field (material-web) | conceito (documentação e código) | Erro no lugar do apoio; `aria-invalid` e `aria-describedby`; o desabilitado e o somente leitura não validam; o textarea com `field-sizing` | Mensagens, `aria-*`, textarea |
| [134], [135], [136], [137], [138], [139] Tokens do campo (material-web) | conceito (tokens) | Cores por estado; foco de 3 px; padding de 16; apoio 4 px abaixo com recuo de 16; ícones de 24 | Matriz, medidas |
| [8] Formas (material-web) | conceito (tokens) | `corner-medium` 12, `corner-extra-small` 4 | Canto do campo |
| [142], [143], [144], [145], [146], [147], [148] WCAG 3.3.1, 3.3.2, 3.3.3 e técnicas (W3C) | referência técnica | Erro em texto; `aria-invalid` depois da validação; rótulo visível antes do campo; descrição por `aria-describedby`; dados mantidos; sugestão de correção | Campo, mensagens, observações de texto |
| [149], [150] 1.3.5 e 3.3.8 (W3C) | referência técnica | `autocomplete`; não bloquear colar nem preencher; mostrar a senha é opção | Tipos, senha, autopreenchimento |
| [151], [152], [153] 4.1.3, ARIA19, ARIA22 (W3C) | referência técnica | Mensagem de status sem foco; `alert` para erro; contêiner no DOM desde o carregamento; `aria-atomic`; interface tagarela | Banner, região do CEP, erro do campo sem região viva |
| [154], [155], [156], [157], [158] WAI Forms Tutorial | referência técnica | Rótulo acima; instruções antes do formulário; placeholder não é rótulo nem instrução; foco no primeiro erro | Rótulo, aviso no topo, placeholder da senha |
| [159] Disclosure (APG) | referência técnica | Botão que mostra e esconde; seta para a direita fechado e para baixo aberto | "Ver itens" |
| [60], [141], [35] Chips e badge | conceito | O chip é interativo; o badge fica sobre outro elemento | Rótulo de status |
| [66], [81], [8] Listas agrupadas | conceito e publicado | Blocos com vão de 2 px e cantos 20/4 num contêiner | Histórico |
| [66], [26] Contenção | conceito | Contêineres que dividem o espaço | Painel, seções do perfil |
| [96], [98], [99] 4.1.2, 1.4.11, 1.4.1 (W3C) | referência técnica | Controles nativos cumprem; 3:1 no contorno e no foco; desabilitado isento; a cor não é o único sinal | Contorno, somente leitura, erro |
| [76], [78] 2.4.11, 2.5.8 (W3C) | referência técnica | Foco não coberto (C43); link em texto corrido isento do alvo | Aviso, banner, rodapé do painel |
| [1], [7], [12], [13], [17]-[19], [30] (rodada 1) | documentação oficial | Escala de tipo; chips em small; camadas; elevação tonal; botões; anel | Tipografia, rótulo de status, estados |
| [55] Split button (Compose) | conceito | Filled de ênfase alta, tonal de ênfase média | Botões de envio e "Salvar alterações" |
| [H19] | pesquisa | Alvo apertado aumenta os toques errados | "Excluir conta" longe do "Salvar" |

**Recorrência:** nenhum padrão desta etapa tem 3 exemplos publicados novos. O campo vem da documentação e do código do M3; a lista agrupada já é recorrente pela contagem de produtos, com uma fonte de imprensa [81].

---

## 11. Riscos e como o desenho responde

| Risco | Resposta |
|---|---|
| O campo misturar a forma do Expressive com as cores do M3 padrão | As cores tonais reprovam a 1.4.11 nos tokens do projeto (1,53 e 1,05, medidos); a forma de 12 é a do Expressive [125]. Desvio registrado em 5.1. As medidas são do M3, não necessariamente do Expressive [29] |
| O rótulo em label-l e a ajuda em body-m divergirem do body-small do M3 ([119], [134]) | Desvios registrados, com motivo (5.1): fora do contorno, o rótulo é título do campo; a ajuda segue o papel da ajuda no sistema e as mensagens longas do app |
| O erro do campo que aparece no `blur` não ser anunciado na hora | Decisão desta etapa, contra a tagarelice [151]: no envio, o foco vai ao primeiro erro, lido pelo `aria-describedby` [158]. O exemplo "Invalid entry" da 4.1.3 [151] pesa contra; a sessão principal decide (seção 12) |
| A instrução da senha só existir no placeholder, que some ao digitar e é cortado em 390 | O placeholder não substitui a instrução [156]; a captura `register-390-full.png` já o mostra cortado. O erro repete a regra no `blur`. Pergunta ao usuário (seção 12) |
| O aviso "Dados salvos." cobrir inteiro o "Salvar alterações" focado em 390 | A reserva do aviso no `scroll-padding` e a rolagem do foco depois do aviso (seção 4); o `keyboard.mjs` mede, com mutação |
| O banner empurrar o botão focado para baixo da toolbar | A rolagem do foco depois do banner (seção 4) |
| A rolagem do foco não acontecer no clique do Safari e do Firefox do macOS | O `activeElement` é o `body`: nada rola, e não há foco a cobrir [76]. Pelo teclado, vale (como na etapa 7) |
| A região `role="alert"` vazia na página | Vazia, ela não tem o que anunciar; é o que a ARIA19 pede [152]. O teste confere que ela existe vazia na montagem |
| A região do CEP anunciar junto com o foco no primeiro erro, no envio vazio | Um anúncio a mais, educado ("O CEP é obrigatório"); aceito |
| No perfil, a região do CEP anunciar o texto fixo depois da consulta, e não o endereço | Os textos não mudam (§8.1 do SPEC-M); o endereço vai aos campos somente leitura logo abaixo |
| O somente leitura tracejado não ter fonte no M3 | Não encontrei estilo de somente leitura ([123], [134], [135]); fica o sinal do sistema, na cor que passa 3:1, e ele sobrevive às cores forçadas (o traço não é cor) |
| `appearance: none` no `select` | A lista de opções continua nativa; a seta é `currentColor`, visível nas cores forçadas |
| O ícone de calendário do `date` variar entre navegadores | É o controle nativo; não se troca (5.1) |
| O autopreenchimento pintar o fundo do campo | A cor é do navegador; texto e contorno continuam; a sessão C confere na captura |
| O "Excluir conta" com a forma da Brasa ao lado do "Sair" M3 | Até a etapa 10, como o "Remover" do carrinho; a etapa 10 desenha o `danger` |
| O erro de exclusão ficar atrás do diálogo aberto | Com o `showModal()`, a página fica inerte e o aviso fica sob o fundo do diálogo (5.7). Raro com o `localStorage`, possível com uma API: fica para a etapa 10 |
| Com uma API, o login mostrar "E-mail ou senha incorretos." numa falha de rede | O handler de hoje trata toda falha como credencial; o banner comporta outra mensagem, mas o texto não existe (5.3). Fica para o plano da API |
| "Ver meus pedidos" (confirmação) chegar ao topo do perfil, com os pedidos a cerca de 1300 px em 390 | A ordem fica a do `SPEC.md` (5.6); a âncora `#seus-pedidos` é pergunta ao usuário (seção 12) |
| "Recebido" parecer clicável | Sem camada, cursor, foco, ícone nem forma de pílula; o canto de 8 é o dos chips [7], mas a altura de 28 e o lugar ao lado de texto o leem como etiqueta. O crítico olha a captura parada em 390 |
| "Recebido R$ 29,49" lido como valor recebido | O total fica na linha do número; o status vem depois da data e da contagem (5.8) |
| O "Ver itens" nativo anunciado de forma diferente em cada leitor | Inferência registrada no dossiê ([159], [96]); sem ARIA por cima; o axe mede o estado aberto |
| Nome e Sobrenome com erros de 3 ou 4 linhas perto de 480 px | A linha da grade cresce com `align-items: start`; os dois campos continuam alinhados no topo |
| O painel do login do admin com o banner no topo e o da loja junto do botão, até a etapa 9 | O arquivo é da etapa 9 (5.9); o visual já é o mesmo |
| Os filtros do admin com 56 px num painel mais denso | A etapa 9 decide; o campo denso de 48 [119] entra como prop se ela pedir |
| O rótulo "Observação" menor que os títulos vizinhos no modal | É o rótulo do campo; os vizinhos são seções com `h3` (5.9) |
| Parecer kit de formulário genérico | Nada de ilustração, de coluna de marca nem de "esqueci a senha"; o campo é o do M3 com a forma da casa, e o único gesto é a cor que muda com a ação |
| O acervo mostrar o campo novo no modal real | Efeito aceito (SPEC-M §11.4) |

---

## 12. Decidido e fora

**Decidido (item 6 do pacote):**

- **a.** `FormGroup` outlined nas cores do M3 padrão, com a forma do Expressive: sem fundo, contorno `outline` de 1 px (4,06 e 3,85), canto 12, 56 px, padding 16; rótulo acima (`Above`), label-l 500 (desvio), em `primary` no foco e `error` no erro; valor e placeholder em body-l; ajuda e erro em body-m (desvio), 4 px abaixo, recuo de 16, o erro no lugar da ajuda, com ícone; hover `on-surface`; foco `primary` mais o anel encostado; somente leitura tracejado em `outline`, texto inteiro; desabilitado em `outline-variant` e 38%; `select` com `appearance: none` e chevron; `date` nativo; `textarea` de 3 linhas com o contador na ajuda; sem botão de mostrar a senha; a prop `live` no CEP. Sai o fundo `surface-container-highest` da SPEC-M §5.8.
- **b.** Painel `surface-container-low`, canto 28, sem sombra, 440 e 560 px, padding 16, 24 e 32; o `h1` na regra global, dentro do painel; página `surface` sem nada em volta; em 390, o painel na largura toda; rodapé com o link na frase (`link-inline`, exceção da 2.5.8), em 500, alinhado ao início.
- **c.** Banner `error-container`, canto 16, texto `on-error-container` (7,23), ícone `error`, sem a borda esquerda; logo acima do botão (desvio do `SPEC.md` §5.8); região `role="alert"` com `aria-atomic` sempre no DOM; o foco fica no botão, e a view rola o foco para a vista; o admin recebe o visual agora e a posição na etapa 9.
- **d.** Aviso de conta salva igual ao do pagamento, sem botão, no topo antes do formulário, ligado ao botão por `aria-describedby`.
- **e.** "Entrar" e "Criar conta" filled M `block`, com o `loading` de hoje até a etapa 10; "Salvar alterações" tonal 44 px `block`.
- **f.** Nome e Sobrenome lado a lado a partir de `sm`, com `align-items: start`; o resto numa coluna; rua e bairro manuais depois do CEP; 16 px entre os grupos; o erro empurra o resto; Tab na ordem do DOM.
- **g.** Cabeçalho com o `h1` e o "Sair" na mesma linha; 5/12 e 7/12 a partir de `lg`; "Seus dados" primeiro em todas as larguras; os dois em contêineres `low` de canto 28, padding 16 e 24 (o padrão das seções do pagamento); os campos tomam o `low`.
- **h.** Somente leitura tracejado; "Salvar alterações" tonal; bloco de excluir com divisor, texto body-m e o "Excluir conta" na variante `danger` que já existe (SPEC-M §4.1), com a forma da Brasa até a etapa 10 (`error` sobre o `low`, 5,84); diálogo com os textos e a ordem de hoje e o foco no título.
- **i.** Histórico em lista segmentada (`lowest`, 20/4, vão de 2); "Pedido #1001" como `p` em title-m 500, com o total na mesma linha; data e contagem em parágrafos, sem "·"; "Recebido" como rótulo de status (não chip), `info` sobre `info-container`, `forma-s`; "Ver itens" nativo, com os chevrons trocados por `details[open]` e cara de text button; o `OrderSummary` só com a tipografia; sem pedidos, o `EmptyState` no contêiner.
- **j.** Um `h1` por tela; `h2` nos contêineres do perfil; o ritmo do carrinho.
- **k.** Erro no `blur` e a cada digitação depois dele; foco no primeiro erro; banner `role="alert"`; o CEP com `role="status"` (apresentação); o erro do campo sem região viva.
- **l.** A reserva de hoje cobre a toolbar; o aviso "Dados salvos." pede a reserva da etapa 7 e a rolagem do foco; o banner pede a mesma rolagem; o `keyboard.mjs` mede em 844 e 800.
- **m.** O login do admin, os filtros, o `ModalProducts` e a observação recebem o campo e o painel agora (tabela de 5.9).

**Em aberto, para o usuário (ou a sessão principal):**

1. **Botão de mostrar a senha:** não entra (é texto e lógica novos). Se o usuário quiser, as fontes estão em 5.1 ([150], [126], [127], [90]).
2. **A instrução da senha:** "Mínimo de 6 caracteres, com letra e número" está só no placeholder, que some ao digitar [156] e é cortado em 390. Recomendação: o mesmo texto passa a ser a ajuda do campo (`helper`), visível sempre; o placeholder sai ou fica. Muda a apresentação de um texto que o `SPEC.md` define como placeholder: decisão do usuário.
3. **O anúncio do erro do campo no `blur`** (sessão principal): sem região viva (recomendação desta etapa, 5.1) ou anunciado.
4. **"Ver meus pedidos" com âncora:** `/profile#seus-pedidos` no botão da confirmação (arquivo da etapa 7), para quem chega em 390 cair nos pedidos (5.6).
5. **Dois textos de validação:** "O email é obrigatório" e "Email inválido" escrevem "email", contra o "E-mail" padronizado do `SPEC.md` (§8, [CON-09]), e "Email inválido" não sugere a correção [148].
6. **Desvios a confirmar:** o banner junto do botão (do `SPEC.md` §5.8); o rótulo em label-l e a ajuda em body-m (do M3); o texto do banner em `on-error-container` (da sugestão da SPEC-M §5.8).

**Fora:**

- "esqueci a senha", login social, verificação de e-mail, força da senha, "lembrar de mim", foto de perfil, endereços múltiplos, cartões salvos, "peça de novo";
- outro status de pedido, rastreio, previsão;
- ilustração, coluna de marca ou hero no login e no cadastro;
- marca de obrigatório nos rótulos (seria texto novo [157]; quase todos os campos são obrigatórios, e o erro diz);
- rótulo que flutua, linha reservada para o erro, ícone de erro dentro do campo;
- animação de entrada, do "Ver itens" ou do banner.

**Para outras etapas:**

- **Etapa 9:** no `LoginAdminView`, a ilustração e o `scrim`, o banner junto do botão com a região sempre no DOM, o bloco do admin de teste e o "Voltar à loja"; a densidade dos filtros (campo de 48 como prop, se pedir); o seletor de arquivo do `ModalProducts` alinhado à ajuda e ao erro do campo; os chips de status do painel e se o rótulo de status vira componente `M3*`; o `SearchBar` com o `--color-input`.
- **Etapa 10:** o `danger` (os dois "Excluir conta"), o `loading` ("Entrando…", "Criando conta…", "Salvando…", "Excluindo…") e o desabilitado do `BaseButton`, com o nome M3 do `--color-ink-disabled` para o botão e o campo; o `BaseDialog` (o sheet de altura inteira para duas linhas; o erro de exclusão que fica atrás dele); o `EmptyState` dentro do contêiner; o `AppToast`, que herda ou absorve a reserva do aviso também no perfil.
- **Etapa 11:** os pares de `PARES_COMUNS` sobre o `--color-input` e os apelidos.

---

## 13. Revisão

A preencher pela sessão principal.
