import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
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
