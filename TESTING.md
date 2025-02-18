# Documentação de Testes 🧪

> 📝 **Nota:** Este projeto representa meus primeiros passos com testes automatizados utilizando Vitest no Vue.js. Como iniciante em testes, estou focando em aprender e implementar boas práticas gradualmente.

## Testes Unitários

Implementei testes unitários para validar o funcionamento isolado de componentes e funções:

### Componentes Testados

- ✓ Buttons (ButtonComponent) - 100% cobertura
  - Verificação de cliques e eventos
    - Emissão de evento click
    - Emissão de evento category-selected
  - Renderização de múltiplos botões
  - Aplicação de estilos personalizados
    - Cores (background e fonte)
    - Tamanho da fonte
    - Padding e border-radius
- ✓ AlertComponent - 100% cobertura
  - Renderização inicial com mensagem
  - Visibilidade inicial do alerta
  - Ocultação automática após 3 segundos
  - Reset do timer ao mudar a mensagem
- ✓ BannerComponent - 100% cobertura
  - Renderização com props padrão
  - Altura da imagem com overlay
  - Altura personalizada sem overlay
  - Aplicação da classe overlay

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

## Resultados de Cobertura

### ButtonComponent

```bash
✓ deve renderizar botões corretamente
✓ deve emitir evento click com o botão clicado
✓ deve emitir category-selected quando botão tem categoria
✓ deve aplicar estilos personalizados

Cobertura:
- Statements: 100%
- Branches: 75%
- Functions: 100%
- Lines: 100%
```

### AlertComponent

```bash
✓ deve renderizar componente com mensagem
✓ deve mostrar alerta inicialmente
✓ deve ocultar alerta após 3 segundos
✓ deve resetar timer quando mensagem muda

Cobertura:
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%
```

### BannerComponent

```bash
✓ deve renderizar propriamente com props padrão
✓ deve computar altura correta da imagem com overlay
✓ deve aplicar altura personalizada quando overlay é false
✓ deve adicionar classe overlay quando prop overlay é true

Cobertura:
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%
```

## Como Executar os Testes

```bash
# Instalar dependência de cobertura
yarn add -D @vitest/coverage-v8

# Executar testes com cobertura
yarn test:coverage ButtonComponent

# Executar todos os testes
yarn test:unit
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

## Próximos Passos

Com base no relatório de cobertura, planejo:

1. Expandir testes para outros componentes:

   - FormGroup
   - BurguerCard
   - CarouselBurguer

2. Implementar testes para:

   - Stores (userStore, cart)
   - Services (authServices)
   - Utils (formatters, masks, validators)

3. Melhorar a cobertura de branches no ButtonComponent (atual: 75%)
