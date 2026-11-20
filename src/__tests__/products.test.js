import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useProductsStore } from '../stores/products';
import productsData from '../json/products.json';

const DRINK = { category: 'drinks', name: 'Mate', price: 6.5, description: 'Gelado', image: 'data:image/png;base64,AA==' };

describe('store de produtos', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('cria produto numa categoria que ainda não foi aberta, sem erro e sem perder as do cardápio', () => {
    const store = useProductsStore();
    expect(store.menuItems.drinks).toBeUndefined();

    const created = store.addProduct(DRINK);

    expect(created).toMatchObject({ ...DRINK, id: productsData.menuItems.drinks.length + 1 });
    expect(store.drinks.map((p) => p.name)).toEqual([
      ...productsData.menuItems.drinks.map((p) => p.name),
      'Mate',
    ]);
  });

  it('recusa categoria que não existe', () => {
    const store = useProductsStore();

    expect(store.addProduct({ ...DRINK, category: 'combos' })).toBeNull();
    expect(store.updateProduct('combos', 1, { name: 'X' })).toBeNull();
    expect(store.removeProduct('combos', 1)).toBe(false);
    expect(store.updateProduct('foods', 2, { category: 'combos' })).toBeNull();
    expect(store.foods.find((p) => p.id === 2).category).toBe('foods');
  });

  it('edita na mesma categoria mantendo o id e a posição', () => {
    const store = useProductsStore();

    const updated = store.updateProduct('foods', 2, { name: 'Smash Duplo', price: 27.9 });

    expect(updated).toMatchObject({ id: 2, category: 'foods', name: 'Smash Duplo', price: 27.9 });
    expect(store.foods[1]).toEqual(updated);
    expect(store.foods).toHaveLength(productsData.menuItems.foods.length);
  });

  it('trocar a categoria move o produto, com id novo, sem substituir o produto de mesmo id da categoria nova', () => {
    const store = useProductsStore();
    const drinksBefore = store.drinks.map((p) => ({ ...p }));

    const moved = store.updateProduct('foods', 2, { category: 'drinks' });

    expect(moved).toMatchObject({ name: 'Smash Burger', category: 'drinks', id: drinksBefore.length + 1 });
    expect(store.foods.some((p) => p.name === 'Smash Burger')).toBe(false);
    expect(store.drinks.slice(0, drinksBefore.length)).toEqual(drinksBefore);
    expect(store.drinks.at(-1)).toEqual(moved);
  });

  it('não acha o produto: nada muda', () => {
    const store = useProductsStore();
    const before = store.foods.map((p) => ({ ...p }));

    expect(store.updateProduct('foods', 99, { name: 'X' })).toBeNull();
    expect(store.removeProduct('foods', 99)).toBe(false);
    expect(store.foods).toEqual(before);
  });

  it('um id que saiu da categoria não volta para outro produto', () => {
    const store = useProductsStore();
    const lastFoodId = productsData.menuItems.foods.at(-1).id;

    expect(store.removeProduct('foods', lastFoodId)).toBe(true);
    expect(store.addProduct({ ...DRINK, category: 'foods' }).id).toBe(lastFoodId + 1);

    store.updateProduct('foods', lastFoodId + 1, { category: 'desserts' });
    expect(store.addProduct({ ...DRINK, category: 'foods' }).id).toBe(lastFoodId + 2);
  });
});
