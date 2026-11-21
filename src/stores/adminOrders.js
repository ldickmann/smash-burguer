// Pedidos do painel administrativo. Começam com dados de exemplo e ficam salvos neste
// navegador (`smash-burger:admin-orders`), com o status de cada um. A tela Pedidos e os
// contadores da barra do painel leem daqui; Configurações restaura os de exemplo.
import { defineStore } from "pinia";
import { isAdminOrder } from "@/utils/storedState";

// Ordem do andamento de um pedido; "completed" é o último
export const ORDER_STATUSES = ["pending", "preparing", "delivery", "completed"];

export const STATUS_LABELS = {
  pending: "Pendente",
  preparing: "Em preparo",
  delivery: "A caminho",
  completed: "Concluído",
};

const sampleOrders = () => [
  {
    id: 1,
    customerName: "João da Silva",
    address: "Rua dos Bobos, 0",
    phone: "(11) 99999-9999",
    items: [
      { id: 1, name: "Smash Burger", quantity: 2, price: 25.9 },
      { id: 2, name: "Coca-Cola", quantity: 1, price: 8.0 },
    ],
    total: 59.8,
    status: "pending",
  },
  {
    id: 2,
    customerName: "Maria de Souza",
    address: "Av. Paulista, 123",
    phone: "(11) 98888-8888",
    items: [
      { id: 3, name: "Veggie Burger", quantity: 1, price: 22.9 },
      { id: 4, name: "Suco de Abacaxi", quantity: 1, price: 6.0 },
    ],
    total: 28.9,
    status: "preparing",
  },
];

export const useAdminOrdersStore = defineStore("adminOrders", {
  state: () => ({
    orders: sampleOrders(),
  }),

  getters: {
    countByStatus: (state) => (status) =>
      state.orders.filter((order) => order.status === status).length,
  },

  actions: {
    /**
     * Leva o pedido ao próximo status.
     * @returns {string|null} o status novo, ou `null` se o pedido não existe ou já foi concluído
     */
    advanceStatus(id) {
      const order = this.orders.find((entry) => entry.id === id);
      if (!order) return null;

      const index = ORDER_STATUSES.indexOf(order.status);
      if (index === -1 || index === ORDER_STATUSES.length - 1) return null;

      order.status = ORDER_STATUSES[index + 1];
      return order.status;
    },

    // Volta aos pedidos de exemplo, com os status do começo
    resetOrders() {
      this.orders = sampleOrders();
    },
  },

  persist: {
    key: "smash-burger:admin-orders",
    // Os pedidos salvos são editáveis no navegador: o que não é lista volta aos de exemplo,
    // e o pedido fora do formato (ou com um status desconhecido) sai
    afterHydrate: ({ store }) => {
      const saved = JSON.stringify(store.orders);
      store.orders = Array.isArray(store.orders)
        ? store.orders.filter((order) => isAdminOrder(order, ORDER_STATUSES))
        : sampleOrders();
      if (JSON.stringify(store.orders) !== saved) store.$persist();
    },
  },
});
