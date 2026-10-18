import { defineStore } from 'pinia';

/**
 * Item do carrinho:
 * { productId, category, name, image, unitPrice, quantity,
 *   removedIngredients: string[], additionals: { name, price, quantity }[], observation }
 * `unitPrice` = preço do produto + adicionais; o total da linha é unitPrice × quantity.
 */
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    // Soma das quantidades (contador da navbar)
    itemCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state) =>
      state.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0),
  },
  actions: {
    addItem(item) {
      this.items.push({
        removedIngredients: [],
        additionals: [],
        observation: '',
        quantity: 1,
        ...item,
      });
    },
    updateQuantity(index, quantity) {
      const item = this.items[index];
      if (item) item.quantity = Math.max(1, quantity);
    },
    // Devolve o item removido para o "Desfazer"
    removeItem(index) {
      const [removed] = this.items.splice(index, 1);
      return removed;
    },
    restoreItem(item, index) {
      this.items.splice(Math.min(index, this.items.length), 0, item);
    },
    clearCart() {
      this.items = [];
    },
  },
  // Versão na chave: uma mudança futura no modelo do item não tenta ler dados antigos
  persist: { key: 'smash-burger:cart:v1' },
});
