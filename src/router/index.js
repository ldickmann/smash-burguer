import { nextTick } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useAdminStore } from '@/stores/adminStore';
import { useCartStore } from '@/stores/cart';
import { useToastStore } from '@/stores/toast';
import { createRouter, createWebHashHistory } from 'vue-router';

// Layouts imports
import MainLayout from '@/layouts/MainLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

const BRAND = 'Smash Burger';

// Rotas do app
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          meta: { title: 'Início' },
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('../views/MenuView.vue'),
          meta: { title: 'Cardápio' },
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
          meta: { title: 'Seu carrinho' },
        },
        {
          path: 'payment',
          name: 'payment',
          component: () => import('../views/PaymentView.vue'),
          meta: { title: 'Finalizar pedido' },
        },
        {
          path: 'confirmation',
          name: 'confirmation',
          component: () => import('../views/ConfirmationView.vue'),
          meta: { title: 'Pedido recebido' },
        },

        // Registro e login
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
          meta: { title: 'Criar conta' },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
          meta: { title: 'Entrar' },
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/auth/ProfileView.vue'),
          meta: { requiresAuth: true, title: 'Sua conta' },
        },

        // Página para testes
        {
          path: 'playground',
          name: 'playground',
          component: () => import('../views/Playground.vue'),
          meta: { title: 'Playground' },
        },

        // Rota 404 - Page Not Found - lazy loading, dentro do layout da loja
        {
          path: ':catchAll(.*)*',
          name: 'NotFound',
          component: () => import('../views/NotFound.vue'),
          meta: { title: 'Página não encontrada' },
        },
      ],
    },

    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginAdminView.vue'),
      meta: { title: 'Painel administrativo' },
    },

    // Rotas admin
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('../views/admin/AdminDashboard.vue'),
          meta: { requiresAuth: true, requiresAdmin: true, title: 'Painel' },
        },
        {
          path: 'products',
          name: 'product-management',
          component: () => import('../views/admin/ProductManagement.vue'),
          meta: { requiresAuth: true, requiresAdmin: true, title: 'Produtos' },
        },
        {
          path: 'orders',
          name: 'order-management',
          component: () => import('../views/admin/OrderManagement.vue'),
          meta: { requiresAuth: true, requiresAdmin: true, title: 'Pedidos' },
        },
        {
          path: 'reports',
          name: 'sales-reports',
          component: () => import('../views/admin/SalesReports.vue'),
          meta: { requiresAuth: true, requiresAdmin: true, title: 'Relatórios' },
        },
      ],
    },
  ],

  // Topo em rota nova, posição salva no voltar/avançar, âncora quando houver
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash };
    return { top: 0 };
  },
});

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const adminStore = useAdminStore();

  // Verificar rotas admin
  if (to.meta.requiresAdmin) {
    if (!adminStore.isAuthenticated || !adminStore.isAdmin) {
      next('/admin/login');
      return;
    }
    next();
    return;
  }

  // Pagamento: exige sessão e carrinho com itens (§5.6)
  if (to.name === 'payment') {
    if (!userStore.isAuthenticated) {
      next({ path: '/login', query: { redirect: '/payment' } });
      return;
    }
    if (useCartStore().itemCount === 0) {
      useToastStore().show({ message: 'Seu carrinho está vazio.', variant: 'info' });
      next('/cart');
      return;
    }
  }

  // Confirmação: exige um pedido feito (§5.7)
  if (to.name === 'confirmation') {
    const hasOrder = userStore.orderHistory.some((order) => order.id === userStore.lastOrderId);
    if (!hasOrder) {
      next('/menu');
      return;
    }
  }

  // Verifica rotas de usuários normais
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login');
    return;
  }

  // Rota pública
  next();
});

// Título da aba e foco no conteúdo a cada troca de rota
router.afterEach((to, from, failure) => {
  if (failure) return;

  document.title = to.meta.title ? `${to.meta.title} · ${BRAND}` : `${BRAND} · Delivery`;

  // Na primeira carga o foco fica onde o navegador deixou
  if (!from.matched.length) return;

  nextTick(() => {
    const main = document.getElementById('conteudo');
    // Uma tela que já pôs o foco num elemento próprio (ex.: o h1 da confirmação) é respeitada
    if (main && !main.contains(document.activeElement)) {
      main.focus({ preventScroll: true });
    }
  });
});

export default router;
