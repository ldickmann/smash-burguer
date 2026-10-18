// Leitura de tokens de movimento no JS (SPEC §2.8: o JS lê o mesmo valor do CSS).
// O minificador de CSS pode reescrever "1200ms" como "1.2s": as duas unidades são aceitas.

/**
 * @param {string} name - nome do token, ex.: "--dur-hold"
 * @param {number} fallback - valor em ms se o token não existir
 * @returns {number} duração em milissegundos
 */
export const readDurationToken = (name, fallback = 0) => {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return fallback;
  return raw.endsWith("ms") ? value : value * 1000;
};
