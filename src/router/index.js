import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MenuPage from '../views/MenuPage.vue';
import CartPage from '../views/CartPage.vue';
import PaymentPage from '../views/PaymentPage.vue';
import ConfirmationPage from '../views/ConfirmationPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuPage,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentPage,
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmationPage,
    },
  ],
});

export default router;
