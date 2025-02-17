/**
 * Aplica máscara para número de telefone
 * @param {string} value - Valor a ser mascarado
 * @returns {string} - Valor com máscara
 */
export const maskPhone = (value) => {
  if (!value) return "";

  // Remove caracteres não numéricos
  value = value.replace(/\D/g, "");

  // Aplica limite de 11 caracteres
  value = value.slice(0, 11);

  // Aplica máscara
  value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

  return value;
};

/**
 * Aplica máscara para CEP
 * @param {string} value - Valor a ser mascarado
 * @returns {string} - Valor com máscara
 */
export const maskCEP = (value) => {
  if (!value) return "";

  // Remove caracteres não numéricos
  value = value.replace(/\D/g, "");

  // Aplica limite de 8 caracteres
  value = value.slice(0, 8);

  // Aplica a máscara 00000-000
  value = value.replace(/^(\d{5})(\d{3})/, '$1-$2');

  return value;
};
