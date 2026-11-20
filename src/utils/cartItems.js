// Itens do carrinho conferidos com o cardápio. O carrinho fica no localStorage, então
// ao carregar a página e ao fechar o pedido cada linha é refeita a partir do catálogo:
// preço, nome e imagem vêm dele, e a linha que não bate com ele sai do carrinho.
import { isPlainObject } from '@/utils/storedState';

// Os mesmos limites do modal de personalização e do carrinho
export const MAX_QUANTITY = 10;
export const MAX_ADDITIONAL_QUANTITY = 5;
export const OBSERVATION_MAX = 140;

const CATEGORIES = ['foods', 'drinks', 'desserts'];

/**
 * Preço de uma unidade: o produto mais os adicionais. O modal de personalização usa a
 * mesma conta, para o carrinho e o pedido darem o mesmo valor.
 * @param {number} price - preço do produto
 * @param {{ price: number, quantity: number }[]} additionals
 * @returns {number}
 */
export const unitPriceOf = (price, additionals) =>
  price + additionals.reduce((sum, additional) => sum + additional.price * additional.quantity, 0);

const isIntegerBetween = (value, min, max) =>
  Number.isInteger(value) && value >= min && value <= max;

const hasDuplicates = (list) => new Set(list).size !== list.length;

const catalogAdditionals = (catalog, category) => {
  if (category === 'foods') return catalog.foodAdditionals;
  if (category === 'desserts') return catalog.dessertAdditionals;
  return [];
};

/**
 * Refaz um item do carrinho a partir do catálogo.
 * @param {unknown} raw - o item como está no carrinho (ou como veio do localStorage)
 * @param {object} catalog - a store de produtos
 * @returns {object|null} o item no modelo do carrinho, ou `null` se ele não bate com o catálogo
 */
export const resolveCartItem = (raw, catalog) => {
  if (!isPlainObject(raw) || !CATEGORIES.includes(raw.category)) return null;

  const product = catalog[raw.category].find((entry) => entry.id === raw.productId);
  if (!product || !Number.isFinite(product.price)) return null;

  const { quantity, removedIngredients = [], additionals = [], observation = '' } = raw;
  if (!isIntegerBetween(quantity, 1, MAX_QUANTITY)) return null;
  if (typeof observation !== 'string' || observation.length > OBSERVATION_MAX) return null;

  // Ingredientes retirados: só os do produto, cada um uma vez
  const ingredients = product.ingredients ?? [];
  if (
    !Array.isArray(removedIngredients) ||
    !removedIngredients.every((name) => ingredients.includes(name)) ||
    hasDuplicates(removedIngredients)
  ) {
    return null;
  }

  // Adicionais: só os do catálogo da categoria, cada um uma vez, com o preço de lá
  if (!Array.isArray(additionals) || !additionals.every(isPlainObject)) return null;
  if (hasDuplicates(additionals.map((additional) => additional.name))) return null;
  const options = catalogAdditionals(catalog, raw.category);
  const chosen = [];
  for (const additional of additionals) {
    const option = options.find((entry) => entry.name === additional.name);
    if (!option || !Number.isFinite(option.price)) return null;
    if (!isIntegerBetween(additional.quantity, 1, MAX_ADDITIONAL_QUANTITY)) return null;
    chosen.push({ name: option.name, price: option.price, quantity: additional.quantity });
  }

  return {
    productId: product.id,
    category: raw.category,
    name: product.name,
    image: product.image,
    unitPrice: unitPriceOf(product.price, chosen),
    quantity,
    removedIngredients: [...removedIngredients],
    additionals: chosen,
    observation,
  };
};

/**
 * Refaz a lista do carrinho pelo catálogo; o que não é lista vira carrinho vazio.
 * @param {unknown} items
 * @param {object} catalog - a store de produtos
 * @returns {object[]}
 */
export const resolveCartItems = (items, catalog) =>
  Array.isArray(items)
    ? items.map((item) => resolveCartItem(item, catalog)).filter(Boolean)
    : [];
