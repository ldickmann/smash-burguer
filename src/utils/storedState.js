// Conferências de formato para o que as stores leem do localStorage. O plugin de
// persistência põe no estado qualquer JSON válido, sem olhar os tipos; um campo trocado
// (um histórico que não é lista, uma quantidade em texto) quebraria as telas que o usam.

const isText = (value) => typeof value === 'string';

/** Objeto comum: nem `null`, nem lista. */
export const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

// Campo opcional: ausente ou uma lista em que todos passam na conferência
const isOptionalList = (value, check) =>
  value === undefined || (Array.isArray(value) && value.every(check));

const isAdditional = (additional) =>
  isPlainObject(additional) && isText(additional.name) && Number.isFinite(additional.quantity);

/**
 * Linha de um pedido do histórico, com os campos que o resumo do pedido mostra.
 * @param {unknown} item
 * @returns {boolean}
 */
export const isOrderLine = (item) =>
  isPlainObject(item) &&
  isText(item.name) &&
  Number.isInteger(item.quantity) &&
  item.quantity >= 1 &&
  Number.isFinite(item.unitPrice) &&
  isOptionalList(item.removedIngredients, isText) &&
  isOptionalList(item.additionals, isAdditional) &&
  (item.observation === undefined || isText(item.observation));

/**
 * Pedido do histórico, com os campos que o perfil e a confirmação mostram.
 * @param {unknown} order
 * @returns {boolean}
 */
export const isOrder = (order) =>
  isPlainObject(order) &&
  Number.isSafeInteger(order.id) &&
  isText(order.date) &&
  !Number.isNaN(Date.parse(order.date)) &&
  isText(order.status) &&
  Number.isFinite(order.total) &&
  isText(order.paymentMethod) &&
  Array.isArray(order.items) &&
  order.items.every(isOrderLine);
