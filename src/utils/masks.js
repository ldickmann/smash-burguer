/**
 * Aplica máscara para número de telefone
 * @param {string} value - Valor a ser mascarado
 * @returns {string} - Valor com máscara
 */
export const maskPhone = (value) => {
  if (!value) return "";

  // Remove caracteres não numéricos
  const numbers = value.replace(/\D/g, "");

  // Aplica limite de 11 caracteres
  const cleaned = numbers.slice(0, 11);

  // Aplica máscara
  if (cleaned.length > 6) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (cleaned.length > 2) {
    return cleaned.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  } else if (cleaned.length > 0) {
    return cleaned.replace(/^(\d{2})/, "($1");
  }
  return cleaned;
};

/**
 * Aplica máscara para CEP
 * @param {string} value - Valor a ser mascarado
 * @returns {string} - Valor com máscara
 */
export const maskCEP = (value) => {
  if (!value) return "";

  // Remove caracteres não numéricos
  const numbers = value.replace(/\D/g, "");

  // Aplica limite de 8 caracteres
  const cleaned = numbers.slice(0, 8);

  // Aplica a máscara no formato '00000-000'
  if (cleaned.length > 6) {
    return cleaned.replace(/^(\d{5})(\d{3})/, "$1-$2");
  }
  return cleaned;
};
