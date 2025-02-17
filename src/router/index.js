import { useUserStore } from '@/stores/userStore';
import { useAdminStore } from '@/stores/adminStore';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuPage.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartPage.vue'),
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/PaymentPage.vue'),
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('../views/ConfirmationPage.vue'),
    },

    // Registro e login
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/RegisterPage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginPage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/auth/ProfilePage.vue'),
      meta: { requiresAuth: true },
    },

    // Painel Administrativo
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/LoginAdminPage.vue'),
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('../views/admin/AdminDashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: 'products',
          name: 'product-management',
          component: () => import('../views/admin/ProductManagement.vue'),
        },
        {
          path: 'orders',
          name: 'order-management',
          component: () => import('../views/admin/OrderManagement.vue'),
        },
        {
          path: 'reports',
          name: 'sales-reports',
          component: () => import('../views/admin/SalesReports.vue'),
        }
      ],
    },

    // Rota 404 - lazy loading
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
