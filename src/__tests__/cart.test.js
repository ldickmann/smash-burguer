import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '../stores/cart';

const burger = {
  productId: 1,
  category: 'foods',
  name: 'Cheese Bacon',
  image: '/images/foods/cheese-bacon',
  unitPrice: 29.49,
  quantity: 1,
  removedIngredients: ['Tomate'],
  additionals: [{ name: 'Bacon', price: 3.5, quantity: 1 }],
  observation: '',
};
const drink = { productId: 2, category: 'drinks', name: 'Coca Cola Lata', image: '', unitPrice: 4.99, quantity: 3 };

describe('store do carrinho', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('itemCount soma as quantidades e subtotal soma unitPrice × quantity', () => {
    const cart = useCartStore();
    cart.addItem(burger);
    cart.addItem(drink);

    expect(cart.itemCount).toBe(4);
    expect(cart.subtotal).toBeCloseTo(29.49 + 4.99 * 3);
  });

  it('preenche os campos opcionais do item', () => {
    const cart = useCartStore();
    cart.addItem(drink);

    expect(cart.items[0]).toMatchObject({ removedIngredients: [], additionals: [], observation: '' });
  });

  it('updateQuantity muda a quantidade e nunca deixa abaixo de 1', () => {
    const cart = useCartStore();
    cart.addItem(drink);

    cart.updateQuantity(0, 2);
    expect(cart.items[0].quantity).toBe(2);
    cart.updateQuantity(0, 0);
    expect(cart.items[0].quantity).toBe(1);
  });

  it('removeItem devolve o item e restoreItem o põe de volta na mesma posição', () => {
    const cart = useCartStore();
    cart.addItem(burger);
    cart.addItem(drink);
    cart.addItem({ ...drink, name: 'Suco de Abacaxi' });

    const removed = cart.removeItem(1);
    expect(removed.name).toBe('Coca Cola Lata');
    expect(cart.items.map((i) => i.name)).toEqual(['Cheese Bacon', 'Suco de Abacaxi']);

    cart.restoreItem(removed, 1);
    expect(cart.items.map((i) => i.name)).toEqual(['Cheese Bacon', 'Coca Cola Lata', 'Suco de Abacaxi']);
  });
});
