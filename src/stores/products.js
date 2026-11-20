// Código para gerenciar os dados dos produto. Contendo os itens do menu, adicionais de comidas e adicionais de sobremesas.
// As imagens ficam como caminho-base; quem exibe monta src/srcset com useResponsiveImage.
// Os adicionais daqui são só o catálogo: o modal de personalização trabalha numa cópia.
// O que o admin cria, edita ou exclui vale só na memória da aba: nada aqui é salvo.

import { defineStore } from "pinia";
import productsData from "../json/products.json";

export const CATEGORIES = ["foods", "drinks", "desserts"];

const copy = (value) => JSON.parse(JSON.stringify(value));

// Cada categoria sai do JSON na primeira leitura
const loadCategory = (state, category) => {
  if (!state.menuItems[category]) {
    state.menuItems[category] = copy(productsData.menuItems[category]);
    state.loadedCategories.push(category);
  }
  return state.menuItems[category];
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
  }),

  getters: {
    foods: (state) => loadCategory(state, "foods"),
    drinks: (state) => loadCategory(state, "drinks"),
    desserts: (state) => loadCategory(state, "desserts"),
  },

  actions: {
    // Um id que sai da categoria (exclusão ou troca de categoria) não é dado de novo
    retireId(category, id) {
      this.lastIds[category] = Math.max(this.lastIds[category] ?? 0, id);
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
  },
});
