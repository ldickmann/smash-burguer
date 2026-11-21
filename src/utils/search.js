// Busca do painel: sem diferença entre maiúsculas e minúsculas nem entre letras com e sem
// acento ("acai" acha "Açaí").

const normalize = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

/**
 * Algum dos campos contém o texto buscado?
 * @param {string} query - o texto da busca
 * @param {...unknown} fields - os textos onde procurar
 * @returns {boolean}
 */
export const matchesSearch = (query, ...fields) => {
  const needle = normalize(query);
  return !needle || fields.some((field) => normalize(field).includes(needle));
};

/**
 * O `?q=` do endereço, como texto (vazio se não houver).
 * @param {unknown} value
 * @returns {string}
 */
export const searchQueryOf = (value) => (typeof value === "string" ? value.trim() : "");
