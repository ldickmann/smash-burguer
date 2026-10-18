import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    // Soma das quantidades (contador da navbar)
    itemCount: (state) => state.items.reduce((total, item) => total + (item.quantity || 1), 0),
  },
  actions: {
    addItem(item) {
      const itemToAdd = {
        ...item,
        finalPrice: item.finalPrice || item.price,
      };
      this.items.push(itemToAdd);
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    clearCart() {
      this.items = [];
    },
  },
});
