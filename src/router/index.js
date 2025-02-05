import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookingsPage from '../views/BookingsPage.vue'
import PaymentPage from '../views/PaymentPage.vue'
import ConfirmationPage from '../views/ConfirmationPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: BookingsPage,
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
})

export default router
