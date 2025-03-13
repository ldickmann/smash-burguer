// Código para gerenciar os dados dos produto. Contendo os itens do menu, adicionais de comidas e adicionais de sobremesas.

import { defineStore } from "pinia";
import productsData from "../json/products.json";

export const useProductsStore = defineStore("products", {
  state: () => ({
    foodAdditionals: [],
    dessertAdditionals: [],
    menuItems: {},
    loadedCategories: []
  }),

  getters: {
    foods: (state) => {
      if (!state.menuItems.foods) {
        state.menuItems.foods = JSON.parse(JSON.stringify(productsData.menuItems.foods));
        state.loadedCategories.push('foods');
      }
      return state.menuItems.foods;
    },
    drinks: (state) => {
      if (!state.menuItems.drinks) {
        state.menuItems.drinks = JSON.parse(JSON.stringify(productsData.menuItems.drinks));
        state.loadedCategories.push('drinks');
      }
      return state.menuItems.drinks;
    },
    desserts: (state) => {
      if (!state.menuItems.desserts) {
        state.menuItems.desserts = JSON.parse(JSON.stringify(productsData.menuItems.desserts));
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
