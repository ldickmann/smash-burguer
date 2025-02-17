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
