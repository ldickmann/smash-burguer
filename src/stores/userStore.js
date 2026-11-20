import { defineStore } from 'pinia';
import { authService, pickProfile } from '@/services/authServices';
import { useCartStore } from '@/stores/cart';

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
      // Outra conta entrando: o histórico da sessão anterior não passa para ela
      if (this.user?.email !== user.email) this.clearOrders();
      this.setUser(user);
    },

    async register(userData) {
      await authService.register(userData);
      return true;
    },

    async updateProfile(userData) {
      const { user } = await authService.updateProfile(userData, this.user?.email);
      this.setUser(user);
    },

    // Apaga o cadastro e tudo o que a sessão guardava, inclusive o carrinho
    async deleteAccount() {
      await authService.deleteAccount(this.user?.email);
      this.logout();
      this.nextOrderId = FIRST_ORDER_ID;
    },

    // A sessão guarda só os campos do perfil, numa cópia própria (sem a senha)
    setUser(userData) {
      this.user = pickProfile(userData);
      this.isAuthenticated = true;
    },

    clearOrders() {
      this.orderHistory = [];
      this.lastOrderId = null;
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
      this.clearOrders();
      // O carrinho, com as observações, não fica para quem usar o navegador depois
      useCartStore().clearCart();
    },
  },

  persist: {
    key: 'smash-burger:session',
    // Sessões gravadas antes guardavam o cadastro inteiro, com a senha: ficam só os campos do perfil
    afterHydrate: ({ store }) => {
      if (!store.user) return;
      store.user = pickProfile(store.user);
      store.$persist();
    },
  },
});
