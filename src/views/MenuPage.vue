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
import productsData from "../json/products.json";
import BurguerCard from "@/components/BurguerCard.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import ButtonsComponents from "@/components/ButtonComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

const cartStore = useCartStore();
const showAlert = ref(false);
const alertMessage = ref("");

// Define as comidas, bebidas e sobremesas disponíveis através do JSON
const foods = ref(productsData.menuItems.foods);
const drinks = ref(productsData.menuItems.drinks);
const desserts = ref(productsData.menuItems.desserts);

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
