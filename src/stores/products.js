// Código para gerenciar os dados dos produto. Contendo os itens do menu, adicionais de comidas e adicionais de sobremesas.
// As imagens ficam como caminho-base; quem exibe monta src/srcset com useResponsiveImage.
// Os adicionais daqui são só o catálogo: o modal de personalização trabalha numa cópia.

import { defineStore } from "pinia";
import productsData from "../json/products.json";

const copy = (value) => JSON.parse(JSON.stringify(value));

export const useProductsStore = defineStore("products", {
  state: () => ({
    foodAdditionals: copy(productsData.foodAdditionals),
    dessertAdditionals: copy(productsData.dessertAdditionals),
    menuItems: {},
    loadedCategories: []
  }),

  getters: {
    foods: (state) => {
      if (!state.menuItems.foods) {
        state.menuItems.foods = copy(productsData.menuItems.foods);
        state.loadedCategories.push('foods');
      }
      return state.menuItems.foods;
    },
    drinks: (state) => {
      if (!state.menuItems.drinks) {
        state.menuItems.drinks = copy(productsData.menuItems.drinks);
        state.loadedCategories.push('drinks');
      }
      return state.menuItems.drinks;
    },
    desserts: (state) => {
      if (!state.menuItems.desserts) {
        state.menuItems.desserts = copy(productsData.menuItems.desserts);
        state.loadedCategories.push('desserts');
      }
      return state.menuItems.desserts;
    }
  },

  actions: {
    addProduct(newProduct) {
      if (newProduct.category === "foods") {
        this.menuItems.foods.push({
          id: this.menuItems.foods.length + 1,
          ...newProduct
        });
      } else if (newProduct.category === "drinks") {
        this.menuItems.drinks.push({
          id: this.menuItems.drinks.length + 1,
          ...newProduct
        });
      } else if (newProduct.category === "desserts") {
        this.menuItems.desserts.push({
          id: this.menuItems.desserts.length + 1,
          ...newProduct
        });
      }
    }
  }
});
