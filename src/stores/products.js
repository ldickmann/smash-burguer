// Código para gerenciar os dados dos produto. Contendo os itens do menu, adicionais de comidas e adicionais de sobremesas.

import { defineStore } from "pinia";
import productsData from "../json/products.json";

export const useProductsStore = defineStore("products", {
  state: () => ({
    foodAdditionals: JSON.parse(JSON.stringify(productsData.foodAdditionals)),
    dessertAdditionals: JSON.parse(JSON.stringify(productsData.dessertAdditionals)),
    menuItems: JSON.parse(JSON.stringify(productsData.menuItems)),
  }),

  getters: {
    foods: (state) => state.menuItems.foods,
    drinks: (state) => state.menuItems.drinks,
    desserts: (state) => state.menuItems.desserts,
    allProducts: (state) => ({
      ...state.menuItems,
      foodAdditionals: state.foodAdditionals,
      dessertAdditionals: state.dessertAdditionals,
    })
  },

  actions: {
    resetAdditionals() {
      this.foodAdditionals = JSON.parse(JSON.stringify(productsData.foodAdditionals));
      this.dessertAdditionals = JSON.parse(JSON.stringify(productsData.dessertAdditionals));
    },

    updateProduct(category, productId, updatedData) {
      const product = this.menuItems[category].find(p => p.id === productId);
      if (product) {
        Object.assign(product, updatedData);
      }
    }
  }
});
