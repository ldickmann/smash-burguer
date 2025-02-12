<template>
  <BannerComponent
    title="Cardápio"
    paragraph="Cardápio com os melhores Hambúrgueres"
    image="/images/fundos/banner-burger-black.jpg"
    alt="Background de hambúrgueres e batatas fritas"
    :overlay="true"
  />

  <div class="menu-page">
    <ButtonsComponents
      :buttons="[
        { label: 'Foods', category: 'foods' },
        { label: 'Drinks', category: 'drinks' },
        { label: 'Desserts', category: 'desserts' },
      ]"
      backgroundColor="#e74c3c"
      fontColor="#fff"
      fontSize="18px"
      buttonSize="14px 28px"
      borderRadius="8px"
      :gap="18"
      @category-selected="filterByCategory"
    />

    <div class="menu">
      <BurguerCard
        v-for="burger in filteredBurgers"
        :key="burger.id"
        :burger="burger"
        @add-to-cart="addToCart"
      />
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
import BannerComponent from "@/components/BannerComponent.vue";
import ButtonsComponents from "@/components/ButtonsComponents.vue";

const cartStore = useCartStore();

const allBurgers = ref([
  {
    id: 1,
    name: "Cheese Bacon",
    price: 25.99,
    image: "./images/foods/cheese-bacon.jpg",
    category: "foods",
  },
  {
    id: 2,
    name: "Smash Burger",
    price: 22.5,
    image: "./images/foods/smash-burger.jpg",
    category: "foods",
  },
  {
    id: 3,
    name: "Veggie Burger",
    price: 24.9,
    image: "./images/foods/veggie-burger.jpg",
    category: "foods",
  },
  {
    id: 4,
    name: "X-Salada",
    price: 20.9,
    image: "./images/foods/x-salada.jpg",
    category: "foods",
  },
]);

const filteredBurgers = ref([...allBurgers.value]);

const addToCart = (burger) => {
  cartStore.addItem(burger);
};

const filterByCategory = (category) => {
  if (category === "all") {
    filteredBurgers.value = [...allBurgers.value];
  } else {
    filteredBurgers.value = allBurgers.value.filter(
      (burger) => burger.category === category
    );
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/menu-page";
</style>
