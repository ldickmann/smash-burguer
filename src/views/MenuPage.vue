<template>
  <div class="menu-page">
    <h1>Cardápio com os melhores Hambúrgueres 🍔</h1>
    <div class="menu">
      <BurguerCard v-for="burger in burgers" :key="burger.id" :burger="burger" @add-to-cart="addToCart" />
    </div>

    <button class="button-cart">
      <router-link to="/cart">Ir para o Carrinho</router-link>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../store/cart";
import BurguerCard from "../components/BurguerCard.vue";

const cartStore = useCartStore();

const burgers = ref([
  { id: 1, name: "Cheese Bacon", price: 25.99, image: "./images/foods/cheese-bacon.jpg" },
  { id: 2, name: "Smash Burger", price: 22.5, image: "./images/foods/smash-burger.jpg" },
  {
    id: 3,
    name: "Veggie Burger",
    price: 24.9,
    image: "./images/foods/veggie-burger.jpg",
  },
  { id: 4, name: "X-Salada", price: 20.9, image: "./images/foods/x-salada.jpg" },
]);

const addToCart = (burger) => {
  cartStore.addItem(burger);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/menu-page";
</style>
