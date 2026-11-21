// Lógica do feed deste estilo. Módulo puro.

/**
 * Separa o destaque do feed: o produto com `name === nome` (o lanche que leva o nome da casa) ou,
 * se ele sumiu ou foi renomeado no painel, o primeiro da lista. Os demais seguem a ordem do JSON.
 * @param {Array<{ name: string }>} lista
 * @param {string} nome
 * @returns {{ destaque: object | null, demais: object[] }}
 */
export function separarDestaque(lista = [], nome = "") {
  if (!Array.isArray(lista) || !lista.length) return { destaque: null, demais: [] };
  const achado = lista.findIndex((produto) => produto?.name === nome);
  const indice = achado < 0 ? 0 : achado;
  return { destaque: lista[indice], demais: lista.filter((_, i) => i !== indice) };
}
