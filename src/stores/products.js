// Código para gerenciar os dados dos produto. Contendo os itens do menu, adicionais de comidas e adicionais de sobremesas.
// As imagens ficam como caminho-base; quem exibe monta src/srcset com useResponsiveImage.
// Os adicionais daqui são só o catálogo: o modal de personalização trabalha numa cópia.
// O que o painel cria, edita ou exclui fica salvo neste navegador (`smash-burger:catalog`);
// quando o cardápio publicado muda, a cópia salva dá lugar ao cardápio novo.

import { defineStore } from "pinia";
import productsData from "../json/products.json";
import { isCatalogProduct, isPlainObject } from "@/utils/storedState";

export const CATEGORIES = ["foods", "drinks", "desserts"];

// Espaço para as imagens enviadas pelo painel (data URLs), em caracteres. A cota do
// localStorage costuma ser de 5 MB por site, dividida com a conta, o carrinho e os pedidos
export const UPLOAD_BUDGET = 2_000_000;

const copy = (value) => JSON.parse(JSON.stringify(value));

// Versão do cardápio publicado: um hash simples do JSON. Se ela mudar, as alterações
// salvas do painel são descartadas, para o cardápio novo aparecer
const versionOf = (text) => {
  let hash = 5381;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 33 + text.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
};
export const CATALOG_VERSION = versionOf(JSON.stringify(productsData.menuItems));

// Cada categoria sai do JSON na primeira leitura
const loadCategory = (state, category) => {
  if (!state.menuItems[category]) {
    state.menuItems[category] = copy(productsData.menuItems[category]);
    state.loadedCategories.push(category);
  }
  return state.menuItems[category];
};

const uploadedChars = (product) =>
  typeof product?.image === "string" && product.image.startsWith("data:") ? product.image.length : 0;

/**
 * Confere o cardápio lido do localStorage: versão, categorias, produtos (com o preço que o
 * carrinho e o pedido vão usar) e ids. Devolve true se algo mudou.
 */
const normalizeCatalog = (store) => {
  const before = JSON.stringify(store.$state);

  // Os últimos ids continuam: um id do painel não volta para outro produto
  if (store.catalogVersion !== CATALOG_VERSION || !isPlainObject(store.menuItems)) {
    store.menuItems = {};
    store.catalogVersion = CATALOG_VERSION;
  }

  const menuItems = {};
  for (const category of CATEGORIES) {
    const list = store.menuItems[category];
    if (!Array.isArray(list)) continue;
    const ids = new Set();
    menuItems[category] = list.filter((product) => {
      if (!isCatalogProduct(product, category) || ids.has(product.id)) return false;
      ids.add(product.id);
      return true;
    });
  }
  store.menuItems = menuItems;
  store.loadedCategories = Object.keys(menuItems);

  const lastIds = isPlainObject(store.lastIds) ? store.lastIds : {};
  store.lastIds = Object.fromEntries(
    CATEGORIES.filter((category) => Number.isSafeInteger(lastIds[category]) && lastIds[category] >= 0).map(
      (category) => [category, lastIds[category]]
    )
  );

  return JSON.stringify(store.$state) !== before;
};

export const useProductsStore = defineStore("products", {
  state: () => ({
    foodAdditionals: copy(productsData.foodAdditionals),
    dessertAdditionals: copy(productsData.dessertAdditionals),
    menuItems: {},
    loadedCategories: [],
    // Último id dado em cada categoria: um id excluído não volta a ser usado, para uma
    // linha antiga do carrinho não apontar para outro produto
    lastIds: {},
    catalogVersion: CATALOG_VERSION,
  }),

  getters: {
    foods: (state) => loadCategory(state, "foods"),
    drinks: (state) => loadCategory(state, "drinks"),
    desserts: (state) => loadCategory(state, "desserts"),
    // Caracteres das imagens enviadas pelo painel, somadas
    uploadedImageChars: (state) =>
      Object.values(state.menuItems)
        .flat()
        .reduce((total, product) => total + uploadedChars(product), 0),
  },

  actions: {
    // Um id que sai da categoria (exclusão ou troca de categoria) não é dado de novo
    retireId(category, id) {
      this.lastIds[category] = Math.max(this.lastIds[category] ?? 0, id);
    },

    /**
     * A imagem nova cabe no espaço das imagens enviadas? `replaced` é o produto que ela
     * substitui (na edição), cuja imagem sai da conta.
     */
    fitsUploadBudget(image, replaced = null) {
      return (
        this.uploadedImageChars - uploadedChars(replaced) + uploadedChars({ image }) <= UPLOAD_BUDGET
      );
    },

    /**
     * Cria um produto na categoria dele, com o próximo id da categoria.
     * @returns {object|null} o produto criado, ou `null` se a categoria não existe
     */
    addProduct(newProduct) {
      const { category } = newProduct;
      if (!CATEGORIES.includes(category)) return null;

      const list = loadCategory(this, category);
      const id = Math.max(this.lastIds[category] ?? 0, ...list.map((product) => product.id)) + 1;
      this.lastIds[category] = id;

      const product = { ...newProduct, id, category };
      list.push(product);
      return product;
    },

    /**
     * Atualiza o produto `id` da categoria `category`. Os ids só se repetem entre
     * categorias, então trocar a categoria tira o produto da antiga e o cria na nova,
     * com outro id.
     * @returns {object|null} o produto atualizado, ou `null` se ele não existe
     */
    updateProduct(category, id, changes) {
      if (!CATEGORIES.includes(category)) return null;
      const list = loadCategory(this, category);
      const index = list.findIndex((product) => product.id === id);
      if (index === -1) return null;

      const updated = { ...list[index], ...changes };
      if (updated.category === category) {
        list.splice(index, 1, { ...updated, id });
        return list[index];
      }
      if (!CATEGORIES.includes(updated.category)) return null;

      this.retireId(category, id);
      list.splice(index, 1);
      return this.addProduct(updated);
    },

    /**
     * Exclui o produto `id` da categoria `category`.
     * @returns {boolean} se algum produto saiu
     */
    removeProduct(category, id) {
      if (!CATEGORIES.includes(category)) return false;
      const list = loadCategory(this, category);
      const index = list.findIndex((product) => product.id === id);
      if (index === -1) return false;

      this.retireId(category, id);
      list.splice(index, 1);
      return true;
    },

    // Volta ao cardápio publicado, sem as alterações do painel. Os últimos ids continuam,
    // para uma linha antiga do carrinho não apontar para um produto criado depois
    resetCatalog() {
      for (const [category, list] of Object.entries(this.menuItems)) {
        for (const product of list) this.retireId(category, product.id);
      }
      this.menuItems = {};
      this.loadedCategories = [];
      this.catalogVersion = CATALOG_VERSION;
    },
  },

  persist: {
    key: "smash-burger:catalog",
    pick: ["menuItems", "lastIds", "catalogVersion"],
    // O cardápio salvo é editável no navegador: produto fora do formato, com preço
    // inválido ou imagem de outro tipo sai, e o que mudar na conferência é regravado
    afterHydrate: ({ store }) => {
      if (normalizeCatalog(store)) store.$persist();
    },
  },
});
