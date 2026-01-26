import { useUserStore } from '@/stores/userStore';
import { useAdminStore } from '@/stores/adminStore';
import { createRouter, createWebHashHistory } from 'vue-router';

// Layouts imports
import MainLayout from '@/layouts/MainLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

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
        },
        {
          path: 'menu',
          name: 'menu',
          component: () => import('../views/MenuView.vue'),
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('../views/CartView.vue'),
        },
        {
          path: 'payment',
          name: 'payment',
          component: () => import('../views/PaymentView.vue'),
        },
        {
          path: 'confirmation',
          name: 'confirmation',
          component: () => import('../views/ConfirmationView.vue'),
        },

        // Registro e login
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/auth/ProfileView.vue'),
          meta: { requiresAuth: true },
        },

        // Página para testes
        {
          path: 'playground',
          name: 'playground',
          component: () => import('../views/Playground.vue'),
        }
      ],
    },

    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginAdminView.vue'),
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
          meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
          path: 'products',
          name: 'product-management',
          component: () => import('../views/admin/ProductManagement.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
          path: 'orders',
          name: 'order-management',
          component: () => import('../views/admin/OrderManagement.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
          path: 'reports',
          name: 'sales-reports',
          component: () => import('../views/admin/SalesReports.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        },
      ],
    },

    // Rota 404 - Page Not Found - lazy loading
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    }
  ],
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

  // Verifica rotar de usuários normais
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login');
    return;
  }

  // Rota pública
  next();
});

export default router;
