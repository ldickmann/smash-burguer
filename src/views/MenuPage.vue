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

    <ButtonsComponents
      :buttons="[{ label: 'Ver Carrinho', id: 'cart-button' }]"
      backgroundColor="#3498db"
      fontSize="18px"
      buttonSize="16px 32px"
      borderRadius="8px"
      :gap="16"
      @click="handleButtonClick"
    />
  </div>
  <AlertComponent v-if="showAlert" :message="alertMessage" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import router from "@/router";
import { useCartStore } from "@/store/cart";
import BurguerCard from "@/components/BurguerCard.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import ButtonsComponents from "@/components/ButtonComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

const cartStore = useCartStore();
const showAlert = ref(false);
const alertMessage = ref("");

const foods = ref([
  {
    id: 1,
    name: "Cheese Bacon",
    description:
      "Hambúrguer artesanal com queijo e bacon crocante, alface, tomate e maionese",
    price: 25.99,
    image: "./images/foods/cheese-bacon.jpg",
    category: "foods",
  },
  {
    id: 2,
    name: "Smash Burger",
    description:
      "Hambúrguer artesanal com queijo, cebola caramelizada, alface, tomate e maionese",
    price: 22.5,
    image: "./images/foods/smash-burger.jpg",
    category: "foods",
  },
  {
    id: 3,
    name: "Veggie Burger",
    description:
      "Hambúrguer artesanal vegetariano com queijo, alface, tomate, hamburguer de soja e maionese",
    price: 24.9,
    image: "./images/foods/veggie-burger.jpg",
    category: "foods",
  },
  {
    id: 4,
    name: "X-Salada",
    description:
      "Hambúrguer artesanal com queijo, alface, tomate, cebola, maionese e ketchup",
    price: 20.9,
    image: "./images/foods/x-salada.jpg",
    category: "foods",
  },
  {
    id: 5,
    name: "Chicken Burger",
    description:
      "Hambúrguer artesanal de frango com queijo, alface, tomate, pepino e maionese",
    price: 23.9,
    image: "./images/foods/chicken-burger.jpg",
    category: "foods",
  },
  {
    id: 6,
    name: "Burger Picanha",
    description:
      "Hambúrguer artesanal de picanha com queijo, alface, tomate, cebola, pickles e maionese",
    price: 29.9,
    image: "./images/foods/burger-picanha.jpg",
    category: "foods",
  },
  {
    id: 7,
    name: "Batata Frita",
    description: "Porção de batata frita crocante",
    price: 10.9,
    image: "./images/foods/batata-frita.jpg",
    category: "foods",
  },
]);

const drinks = ref([
  {
    id: 8,
    name: "Refrigerante Copo",
    price: 5.99,
    image: "./images/drinks/refrigerante.jpg",
    category: "drinks",
  },
  {
    id: 9,
    name: "Coca Cola Lata",
    price: 4.99,
    image: "./images/drinks/coca-cola-lata.jpg",
    category: "drinks",
  },
  {
    id: 10,
    name: "Suco de Abacaxi",
    price: 6.99,
    image: "./images/drinks/suco-abacaxi.jpg",
    category: "drinks",
  },
]);

const desserts = ref([
  {
    id: 11,
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
  alertMessage.value = `${burger.name} adicionado ao carrinho!`;
  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
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

const handleButtonClick = (button) => {
  if (button.id === "cart-button") {
    router.push("/cart");
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/menu-page";
</style>
