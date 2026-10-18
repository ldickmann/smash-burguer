/**
 * Formats a number as a currency string in Brazilian Real (BRL).
 *
 * @param {number} price - The price to format.
 * @returns {string} The formatted price string.
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

/**
 * Formats a given CPF number.
 *
 * @param {string} value - The CPF number to format.
 * @returns {string} - The formatted CPF number in the format XXX.XXX.XXX-XX.
 */
export const formatCPF = (value) => {
  value = value.replace(/\D/g, '');
  if (value.length <= 11) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  return value;
};

// Format para numero de celular
// Format para endereço

/**
 * Ingredientes retirados em texto corrido: "Sem tomate, sem cebola".
 *
 * @param {string[]} names - Nomes dos ingredientes retirados.
 * @returns {string}
 */
export const formatRemovedIngredients = (names = []) =>
  names.map((name, index) => `${index === 0 ? 'Sem' : 'sem'} ${name.toLowerCase()}`).join(', ');

/**
 * Adicionais escolhidos em texto corrido: "+2 bacon, +1 ovo".
 *
 * @param {{ name: string, quantity: number }[]} additionals
 * @returns {string}
 */
export const formatAdditionals = (additionals = []) =>
  additionals
    .filter((additional) => additional.quantity > 0)
    .map((additional) => `+${additional.quantity} ${additional.name.toLowerCase()}`)
    .join(', ');

/**
 * Quantidade de itens com plural: "1 item", "3 itens".
 *
 * @param {number} count
 * @returns {string}
 */
export const formatItemCount = (count) => `${count} ${count === 1 ? 'item' : 'itens'}`;

/**
 * Detalhes de um item do pedido, na ordem em que aparecem no carrinho e no resumo:
 * ["Sem tomate, sem cebola", "+2 bacon", "Obs.: bem passado"].
 *
 * @param {{ removedIngredients?: string[], additionals?: object[], observation?: string }} item
 * @returns {string[]}
 */
export const describeItem = (item) =>
  [
    formatRemovedIngredients(item.removedIngredients),
    formatAdditionals(item.additionals),
    item.observation ? `Obs.: ${item.observation}` : '',
  ].filter(Boolean);
