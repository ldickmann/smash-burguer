# Smash Burger Delivery 🍔

Um aplicativo web em Vue.js para delivery de hambúrgueres artesanais, permitindo aos clientes navegar pelo cardápio, fazer pedidos e realizar pagamentos online.

## 🚀 Funcionalidades Implementadas

- ✅ Autenticação completa de usuários (login/registro)
- ✅ Perfil de usuário com gestão de dados
- ✅ Cardápio interativo com carrossel de produtos
- ✅ Carrinho de compras com gestão de itens
- ✅ Personalização de pedidos
- ✅ Histórico de pedidos
- ✅ Gerenciamento de endereços com API ViaCEP
- ✅ Design responsivo
- ✅ Cálculos de preço em tempo real

## 🛠 Tecnologias Utilizadas

- [Vue.js 3](https://vuejs.org/) - Framework JavaScript Progressivo
- [Pinia](https://pinia.vuejs.org/) - Gerenciamento de Estado
- [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) - Plugin de Persistência para Pinia
- [Vue Router](https://router.vuejs.org/) - Roteador Oficial
- [SASS](https://sass-lang.com/) - Pré-processador CSS
- [Vite](https://vitejs.dev/) - Ferramenta de Build
- [Vitest](https://vitest.dev/) - Framework de Testes Unitários
- [Vue Test Utils](https://test-utils.vuejs.org/) - Utilitários de Teste para Vue.js
- [Vue 3 Carousel](https://ismail9k.github.io/vue3-carousel/) - Componente de Carrossel
- [Font Awesome](https://fontawesome.com/) - Ícones vetoriais
- [ESLint](https://eslint.org/) - Linter de JavaScript
- [Prettier](https://prettier.io/) - Formatador de código
- [jsdom](https://github.com/jsdom/jsdom) - Implementação JavaScript de DOM e HTML
- [ViaCEP API](https://viacep.com.br/) - API de CEP e Endereços
- [@testing-library/vue](https://testing-library.com/docs/vue-testing-library/intro/) - Utilitários de Teste para Vue

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/ldickmann/smash-burger.git
cd smash-burger
```

1. Instale as dependências:

```bash
yarn install
```

1. Inicie o servidor de desenvolvimento:

```bash
yarn dev
```

1. Acesse no navegador:

```bash
http://localhost:5173
```

## 🔧 Scripts Disponíveis

- `yarn dev` - Inicia o servidor de desenvolvimento
- `yarn lint` - Executa o ESLint
- `yarn format` - Formata o código com Prettier

## 🌐 Estrutura do Projeto

```plaintext
src/
├── assets/         # Recursos estáticos e estilos globais
│   ├── icons/       # Ícones da aplicação
│   ├── styles/      # Arquivos SCSS
│   └── main.scss    # Arquivo principal de estilos
├── components/     # Componentes Vue reutilizáveis
├── handlers/       # Manipuladores de eventos e lógica de negócios
├── layouts/        # Componentes de layout
├── plugins/        # Arquivos plugins para biblioteca(s) de icons
├── router/         # Configuração do Vue Router
├── services/       # Services paracomunicação com APIs
├── stores/         # Novo diretório para stores Pinia
├── plugins/        # Plugins e configurações
├── utils/          # Funções utilitárias
└── views/          # Componentes de página
```

## 🔜 Em Desenvolvimento

Este projeto está em desenvolvimento ativo. Próximas funcionalidades:

- [x] Autenticação de usuários
  - [x] Login
  - [x] Registro
  - [x] Perfil do usuário
- [x] Histórico de pedidos
- [x] Gerenciamento de endereços
  - [x] Integração com API ViaCEP
  - [x] Validação de endereço
- [ ] Integração com API de pagamento
- [ ] Painel administrativo
  - [ ] Gestão de produtos
  - [ ] Gestão de pedidos
  - [ ] Relatórios de vendas
- [ ] Notificações em tempo real

## 🧪 Testes

> 🌱 **Nota do Desenvolvedor:** Este projeto marca meu início na jornada de testes automatizados! Utilizando Vitest, consegui atingir 100% de cobertura no ButtonComponent, que serviu como meu primeiro componente totalmente testado. É um trabalho em progresso, onde cada teste representa um novo aprendizado.

Para mais detalhes sobre a implementação e cobertura dos testes, consulte nossa [documentação de testes](./TESTING.md).

## 📝 Como Contribuir

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 👤 Autor | Desenvolvedor

Lucas Elias Dickmann

💼 [LinkedIn](https://www.linkedin.com/in/lucas-dickmann) | 📂 [GitHub](https://github.com/ldickmann)
