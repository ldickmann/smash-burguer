import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useProductsStore } from '../stores/products';
import { resolveCartItem, resolveCartItems, unitPriceOf } from '../utils/cartItems';

let catalog;

// Cheese Bacon sem tomate, com 1 bacon, montado como o modal de personalização monta:
// o preço soma todos os adicionais do catálogo, os não escolhidos com quantidade 0
const burger = () => {
  const additionals = catalog.foodAdditionals.map(({ name, price }) => ({
    name,
    price,
    quantity: name === 'Bacon' ? 1 : 0,
  }));
  return {
    productId: 1,
    category: 'foods',
    name: 'Cheese Bacon',
    image: '/images/foods/cheese-bacon',
    unitPrice: unitPriceOf(25.99, additionals),
    quantity: 2,
    removedIngredients: ['Tomate'],
    additionals: additionals.filter((additional) => additional.quantity > 0),
    observation: 'bem passado',
  };
};

const soda = () => ({
  productId: 1,
  category: 'drinks',
  name: 'Copo de Refrigerante',
  image: '/images/drinks/copo-refrigerante',
  unitPrice: 5.99,
  quantity: 1,
  removedIngredients: [],
  additionals: [],
  observation: '',
});

describe('itens do carrinho conferidos com o cardápio', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    catalog = useProductsStore();
  });

  it('um item montado pelo modal passa igual, com o mesmo preço', () => {
    expect(resolveCartItem(burger(), catalog)).toEqual(burger());
    expect(resolveCartItem(soda(), catalog)).toEqual(soda());
  });

  it('preço, nome e imagem vêm do catálogo, e não do item salvo', () => {
    const edited = {
      ...burger(),
      unitPrice: -500,
      name: 'Grátis',
      image: 'https://example.com/foto.png',
      additionals: [{ name: 'Bacon', price: 0, quantity: 1 }],
    };

    expect(resolveCartItem(edited, catalog)).toEqual(burger());
  });

  it.each([
    ['não é objeto', 'x'],
    ['nulo', null],
    ['lista', []],
    ['produto que não existe', { productId: 99 }],
    ['produto com id em texto', { productId: '1' }],
    ['categoria fora do cardápio', { category: 'menuItems' }],
    ['categoria herdada do objeto', { category: 'constructor' }],
    ['quantidade zero', { quantity: 0 }],
    ['quantidade acima de 10', { quantity: 11 }],
    ['quantidade fracionada', { quantity: 1.5 }],
    ['quantidade em texto', { quantity: '2' }],
    ['ingredientes retirados que não são lista', { removedIngredients: null }],
    ['ingrediente que o produto não tem', { removedIngredients: ['Picles'] }],
    ['ingrediente repetido', { removedIngredients: ['Tomate', 'Tomate'] }],
    ['adicionais que não são lista', { additionals: 'Bacon' }],
    ['adicional fora do catálogo', { additionals: [{ name: 'Lagosta', price: 1, quantity: 1 }] }],
    ['adicional de sobremesa no hambúrguer', { additionals: [{ name: 'Nutella', price: 3, quantity: 1 }] }],
    ['adicional acima de 5', { additionals: [{ name: 'Bacon', price: 3.5, quantity: 6 }] }],
    ['adicional com quantidade zero', { additionals: [{ name: 'Bacon', price: 3.5, quantity: 0 }] }],
    [
      'adicional repetido',
      {
        additionals: [
          { name: 'Bacon', price: 3.5, quantity: 5 },
          { name: 'Bacon', price: 3.5, quantity: 5 },
        ],
      },
    ],
    ['observação que não é texto', { observation: 42 }],
  ])('recusa o item com %s', (_case, change) => {
    const item = typeof change === 'object' && change && !Array.isArray(change)
      ? { ...burger(), ...change }
      : change;

    expect(resolveCartItem(item, catalog)).toBeNull();
  });

  it('bebida não leva adicionais', () => {
    const item = { ...soda(), additionals: [{ name: 'Bacon', price: 3.5, quantity: 1 }] };

    expect(resolveCartItem(item, catalog)).toBeNull();
  });

  it('a lista fica só com os itens que batem; o que não é lista vira carrinho vazio', () => {
    expect(resolveCartItems([burger(), { productId: 99 }, soda()], catalog)).toEqual([burger(), soda()]);
    expect(resolveCartItems('x', catalog)).toEqual([]);
    expect(resolveCartItems({ 0: burger() }, catalog)).toEqual([]);
  });
});
