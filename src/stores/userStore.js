import { defineStore } from 'pinia';
import { authService } from '@/services/authServices';

const FIRST_ORDER_ID = 1001;

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    orderHistory: [],
    lastOrderId: null,
    // Número sequencial dos pedidos; persiste na sessão
    nextOrderId: FIRST_ORDER_ID,
  }),

  actions: {
    async login(credentials) {
      const { user } = await authService.login(credentials);
      this.setUser(user);
    },

    async register(userData) {
      await authService.register(userData);
      return true;
    },

    async updateProfile(userData) {
      const { user } = await authService.updateProfile(userData);
      this.setUser(user);
    },

    setUser(userData) {
      this.user = userData;
      this.isAuthenticated = true;
    },

    /**
     * Registra o pedido no histórico (mais recente primeiro) e guarda o último id.
     * @returns {object} o pedido criado
     */
    placeOrder({ items, total, paymentMethod, address }) {
      const order = {
        id: this.nextOrderId,
        date: new Date().toISOString(),
        status: 'Recebido',
        items,
        total,
        paymentMethod,
        address,
      };
      this.nextOrderId += 1;
      this.orderHistory.unshift(order);
      this.lastOrderId = order.id;
      return order;
    },

    logout() {
      authService.logout();
      this.user = null;
      this.isAuthenticated = false;
      this.orderHistory = [];
      this.lastOrderId = null;
    },
  },

  persist: { key: 'smash-burger:session' },
});
