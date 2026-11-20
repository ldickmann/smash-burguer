import { defineStore } from 'pinia';
import { useProductsStore } from '@/stores/products';
import { resolveCartItems } from '@/utils/cartItems';

// Os preços são comparados em centavos, sem a imprecisão da soma em ponto flutuante
const cents = (value) => Math.round(value * 100);

/**
 * Item do carrinho:
 * { productId, category, name, image, unitPrice, quantity,
 *   removedIngredients: string[], additionals: { name, price, quantity }[], observation }
 * `unitPrice` = preço do produto + adicionais; o total da linha é unitPrice × quantity.
 * O que vem do localStorage passa pelo cardápio (ver syncWithCatalog).
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
    /**
     * Refaz cada linha pelo cardápio: preço, nome e imagem vêm do catálogo, e a linha que
     * não bate com ele (produto, adicional ou quantidade fora do que a loja oferece) sai.
     * @returns {boolean} true se alguma linha saiu ou mudou de preço
     */
    syncWithCatalog() {
      const previous = Array.isArray(this.items) ? this.items : null;
      const items = resolveCartItems(previous, useProductsStore());
      const changed =
        !previous ||
        items.length !== previous.length ||
        items.some((item, index) => cents(item.unitPrice) !== cents(previous[index].unitPrice));
      this.items = items;
      return changed;
    },
  },
  persist: {
    // Versão na chave: uma mudança futura no modelo do item não tenta ler dados antigos
    key: 'smash-burger:cart:v1',
    // O carrinho salvo é editável no navegador: formato trocado ou preço alterado não entram
    afterHydrate: ({ store }) => {
      if (store.syncWithCatalog()) store.$persist();
    },
  },
});
