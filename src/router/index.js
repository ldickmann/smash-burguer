import { useUserStore } from '@/stores/userStore';
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
      meta: { requiresAuth: true },
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

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
