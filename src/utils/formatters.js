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

/**
 * Formats a credit card number by removing all non-digit characters
 * and inserting a space after every 4 digits.
 *
 * @param {string} value - The credit card number to format.
 * @returns {string} - The formatted credit card number.
 */
export const formatCardNumber = (value) => {
  value = value.replace(/\D/g, '');
  return value.replace(/(\d{4})(?=\d)/g, "$1 ");
};

export const formatExpiryDate = (value) => {
  value = value.replace(/\D/g, '');
  if (value.length >= 2) {
    return value.substring(0, 2) + '/' + value.substring(2);
  }
  return value;
};
