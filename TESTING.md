# Documentação de Testes 🧪

## Testes Unitários

Implementei testes unitários para validar o funcionamento isolado de componentes e funções:

### Componentes Testados

- ✓ Buttons
  - Verificação de cliques
  - Validação de estados (disabled)
  - Teste de diferentes variantes de estilo
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

## Como Executar os Testes

```bash
# Executa os testes da aplicação
yarn test

# Executa testes com relatório de cobertura
yarn test:coverage
```
