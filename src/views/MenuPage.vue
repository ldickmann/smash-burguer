<template>
  <div>
    <h1>Escolha seu Hambúrguer 🍔</h1>
    <div class="menu">
      <BurgerCard
        v-for="burger in burgers"
        :key="burger.id"
        :burger="burger"
        @add-to-cart="addToCart"
      />
    </div>
    <router-link to="/cart">Ir para o Carrinho</router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "../store/cart";
import BurgerCard from "../components/BurguerCard.vue";

const cartStore = useCartStore();

const burgers = ref([
  { id: 1, name: "Cheeseburger", price: 15.99, image: "/cheeseburger.jpg" },
  { id: 2, name: "Smash Burger", price: 17.99, image: "/smashburger.jpg" },
  { id: 3, name: "Veggie Burger", price: 14.99, image: "/veggieburger.jpg" },
]);

const addToCart = (burger) => {
  cartStore.addItem(burger);
};
</script>

<style scoped>
.menu {
  display: flex;
  gap: 20px;
}
</style>
