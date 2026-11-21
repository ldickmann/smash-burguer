// Máscaras dos campos de celular e CEP. Elas são progressivas: a formatação acompanha a
// digitação desde os primeiros dígitos, sem sumir no meio do caminho.

/** Dígitos que cada máscara aceita: o campo não guarda mais do que mostra. */
export const MASK_DIGITS = { phone: 11, cep: 8 };

const digitsOf = (value, max) => String(value ?? "").replace(/\D/g, "").slice(0, max);

/**
 * Celular: "(11", "(11) 9999", "(11) 99999-9", "(11) 99999-9999".
 * @param {string} value - Valor a ser mascarado
 * @returns {string} - Valor com máscara
 */
export const maskPhone = (value) => {
  const digits = digitsOf(value, MASK_DIGITS.phone);
  if (!digits) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

/**
 * CEP: "01001", "01001-0", "01001-000".
 * @param {string} value - Valor a ser mascarado
 * @returns {string} - Valor com máscara
 */
export const maskCEP = (value) => {
  const digits = digitsOf(value, MASK_DIGITS.cep);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};
