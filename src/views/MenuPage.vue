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
      class="buttons-component"
      :buttons="[
        { label: 'Hambúrgueres', category: 'foods' },
        { label: 'Bebidas', category: 'drinks' },
        { label: 'Sobremesas', category: 'desserts' },
      ]"
      backgroundColor="#3aa876"
      fontColor="#fff"
      fontSize="18px"
      buttonSize="14px 28px"
      borderRadius="8px"
      :gap="20"
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
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "../store/cart";
import BurguerCard from "../components/BurguerCard.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import ButtonsComponents from "@/components/ButtonsComponents.vue";

const cartStore = useCartStore();

const foods = ref([
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
  {
    id: 5,
    name: "Chicken Burger",
    price: 23.9,
    image: "./images/foods/chicken-burger.jpg",
    category: "foods",
  },
  {
    id: 6,
    name: "Burger Picanha",
    price: 29.9,
    image: "./images/foods/burger-picanha.jpg",
    category: "foods",
  },
  {
    id: 7,
    name: "Batata Frita",
    price: 10.9,
    image: "./images/foods/batata-frita.jpg",
    category: "foods",
  },
]);

const drinks = ref([
  {
    id: 8,
    name: "Refrigerante",
    price: 5.99,
    image: "./images/drinks/refrigerante.jpg",
    category: "drinks",
  },
]);

const desserts = ref([
  {
    id: 9,
    name: "Sorvete de Pote",
    price: 7.99,
    image: "./images/desserts/sorvete-pote.jpg",
    category: "desserts",
  },
]);

const allItems = computed(() => [...foods.value, ...drinks.value, ...desserts.value]);

const filteredBurgers = ref([...allItems.value]);

const addToCart = (burger) => {
  cartStore.addItem(burger);
};

const filterByCategory = (category) => {
  if (category === "all") {
    filteredBurgers.value = [...allItems.value];
  } else {
    filteredBurgers.value = allItems.value.filter((item) => item.category === category);
  }
};

onMounted(() => {
  filterByCategory("foods");
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/menu-page";
</style>
