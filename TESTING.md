# Documentação de Testes 🧪

> 📝 **Nota:** Este projeto representa meus primeiros passos com testes automatizados utilizando Vitest no Vue.js. Como iniciante em testes, estou focando em aprender e implementar boas práticas gradualmente.

## Testes Unitários

Implementei testes unitários para validar o funcionamento isolado de componentes e funções:

### Componentes Testados

- ✓ Buttons (ButtonComponent)
  - Verificação de cliques e eventos
    - Emissão de evento click
    - Emissão de evento category-selected
  - Renderização de múltiplos botões
  - Aplicação de estilos personalizados
    - Cores (background e fonte)
    - Tamanho da fonte
    - Padding e border-radius
- ✓ Inputs e Forms
  - Validação de campos obrigatórios
  - Verificação de formatos (nome, sobrenome, email, senha, telefone e CEP)
  - Teste de máscaras de input

### Funções Testadas

- ✓ Validações
  - Nome e Sobrenome
  - Email
  - Senha
  - CEP
- ✓ Formatadores
  - Valores monetários (R$)
  - CEP
  - Número de Celular

## Testes de Integração

Implementamos testes para verificar a interação entre componentes:

- ✓ Fluxo de login/registro
- ✓ Integração com API ViaCEP
- ✓ Fluxo do carrinho de compras
- ✓ Processo de checkout

## Resultados dos Testes

### ButtonComponent

```bash
✓ deve renderizar botões corretamente
✓ deve emitir evento click com o botão clicado
✓ deve emitir category-selected quando botão tem categoria
✓ deve aplicar estilos personalizados
```

## Como Executar os Testes

```bash
# Executa os testes da aplicação
yarn test

# Executa testes específicos do componente
yarn test:unit ButtonComponent

# Executa testes com relatório de cobertura
yarn test:coverage
```

## Localização dos Testes

Os testes estão organizados na seguinte estrutura:

```
src/
├── __tests__/
│   └── ButtonComponent.test.js
└── components/
    └── ButtonComponent.vue
```
