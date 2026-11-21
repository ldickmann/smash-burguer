import { defineStore } from 'pinia';
import { authService, pickProfile } from '@/services/authServices';
import { useCartStore } from '@/stores/cart';
import { isOrder, isPlainObject } from '@/utils/storedState';

const FIRST_ORDER_ID = 1001;

/**
 * Confere a sessão lida do localStorage, campo a campo. O perfil fica só com os campos
 * do perfil (sessões gravadas antes guardavam o cadastro inteiro, com a senha); pedido
 * fora do formato sai do histórico; e o próximo número de pedido nunca repete um que já existe.
 */
const normalizeSession = (store) => {
  const user = isPlainObject(store.user) ? pickProfile(store.user) : null;
  const isAuthenticated = store.isAuthenticated === true && user !== null;
  const orderHistory = Array.isArray(store.orderHistory) ? store.orderHistory.filter(isOrder) : [];
  const nextOrderId =
    Number.isSafeInteger(store.nextOrderId) && store.nextOrderId >= FIRST_ORDER_ID
      ? store.nextOrderId
      : FIRST_ORDER_ID;

  store.user = isAuthenticated ? user : null;
  store.isAuthenticated = isAuthenticated;
  store.orderHistory = orderHistory;
  store.lastOrderId = Number.isSafeInteger(store.lastOrderId) ? store.lastOrderId : null;
  store.nextOrderId = Math.max(nextOrderId, ...orderHistory.map((order) => order.id + 1));
};

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
    /**
     * Entra e traz o histórico guardado no cadastro. Se a mesma conta já estava com a sessão
     * aberta, os pedidos dela que ainda não estavam no cadastro continuam.
     */
    async login(credentials) {
      const { user, orderHistory, nextOrderId } = await authService.login(credentials);
      const sameAccount = this.user?.email === user.email;
      const known = new Set(orderHistory.map((order) => order.id));
      const history = sameAccount
        ? [...orderHistory, ...this.orderHistory.filter((order) => !known.has(order.id))]
        : orderHistory;

      this.setUser(user);
      this.orderHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
      this.lastOrderId = sameAccount ? this.lastOrderId : null;
      this.nextOrderId = Math.max(
        FIRST_ORDER_ID,
        nextOrderId ?? 0,
        ...history.map((order) => order.id + 1)
      );
      this.saveOrders();
    },

    // O cadastro guarda o histórico, para ele sobreviver ao "Sair"
    saveOrders() {
      if (!this.user) return;
      authService.saveOrders(this.user.email, {
        orderHistory: this.orderHistory,
        nextOrderId: this.nextOrderId,
      });
    },

    async register(userData) {
      await authService.register(userData);
      return true;
    },

    async updateProfile(userData) {
      const { user } = await authService.updateProfile(userData, this.user?.email);
      this.setUser(user);
    },

    // Apaga o cadastro (com o histórico) e tudo o que a sessão guardava, inclusive o carrinho.
    // Sem o cadastro, o `saveOrders` do logout não tem onde gravar
    async deleteAccount() {
      await authService.deleteAccount(this.user?.email);
      this.logout();
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
      this.saveOrders();
      return order;
    },

    // A sessão sai da tela, mas o histórico fica no cadastro e volta no próximo login
    logout() {
      this.saveOrders();
      authService.logout();
      this.user = null;
      this.isAuthenticated = false;
      this.clearOrders();
      this.nextOrderId = FIRST_ORDER_ID;
      // O carrinho, com as observações, não fica para quem usar o navegador depois
      useCartStore().clearCart();
    },
  },

  persist: {
    key: 'smash-burger:session',
    // A sessão salva é editável no navegador: o que mudar na conferência é regravado na hora
    afterHydrate: ({ store }) => {
      const saved = JSON.stringify(store.$state);
      normalizeSession(store);
      if (JSON.stringify(store.$state) !== saved) store.$persist();
    },
  },
});
