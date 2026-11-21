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

// Imagem de produto: o caminho-base das fotos do cardápio ou a imagem enviada pelo painel
const IMAGE_PATH = /^\/images\/(foods|drinks|desserts)\/[a-z0-9-]+$/;
const DATA_IMAGE = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/;

const isTextUpTo = (value, max, min = 0) => isText(value) && value.length >= min && value.length <= max;

/**
 * Produto do cardápio salvo pelo painel. O preço vale para o carrinho e o pedido, então só
 * entra um produto inteiro e no formato que o formulário do painel produz.
 * @param {unknown} product
 * @param {string} category - a categoria em que ele está guardado
 * @returns {boolean}
 */
export const isCatalogProduct = (product, category) =>
  isPlainObject(product) &&
  Number.isSafeInteger(product.id) &&
  product.id >= 1 &&
  product.category === category &&
  isTextUpTo(product.name?.trim?.(), 60, 1) &&
  Number.isFinite(product.price) &&
  product.price > 0 &&
  product.price < 10000 &&
  (product.description === undefined || isTextUpTo(product.description, 160)) &&
  isText(product.image) &&
  (IMAGE_PATH.test(product.image) || DATA_IMAGE.test(product.image)) &&
  isOptionalList(product.ingredients, isText) &&
  (product.quantity === undefined ||
    product.quantity === null ||
    (Number.isInteger(product.quantity) && product.quantity >= 0 && product.quantity <= 9999));

const isAdminOrderItem = (item) =>
  isPlainObject(item) &&
  isText(item.name) &&
  Number.isInteger(item.quantity) &&
  item.quantity >= 1 &&
  Number.isFinite(item.price) &&
  item.price >= 0;

/**
 * Pedido do painel salvo no navegador, com os campos que a tela Pedidos mostra.
 * @param {unknown} order
 * @param {string[]} statuses - os status aceitos
 * @returns {boolean}
 */
export const isAdminOrder = (order, statuses) =>
  isPlainObject(order) &&
  Number.isSafeInteger(order.id) &&
  isText(order.customerName) &&
  isText(order.address) &&
  isText(order.phone) &&
  Array.isArray(order.items) &&
  order.items.every(isAdminOrderItem) &&
  Number.isFinite(order.total) &&
  statuses.includes(order.status);

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
