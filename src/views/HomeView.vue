<template>
  <section class="banner-section">
    <div class="container-utilities">
      <BannerComponent
        title="Bem-vindo ao Smash Burger"
        paragraph="Descubra o verdadeiro sabor dos Hambúrgueres artesanais"
        image="/images/fundos/banner-burger-bg.png"
        alt="Hambúrgueres"
      />
    </div>
  </section>
  <section class="section-carousel">
    <div class="container-utilities">
      <h1>🍔 Nossos Hambúrgueres 🍔</h1>
      <div class="container-carousel">
        <CarouselBurguer :burgers="burgers" @add-to-cart="addToCart" />
      </div>
    </div>
  </section>
  <AlertComponent v-if="showAlert" :message="alertMessage" />
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "@/store/cart";
import productsData from "../json/products.json";
import CarouselBurguer from "@/components/CarouselBurguer.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

const cartStore = useCartStore();
const showAlert = ref(false);
const alertMessage = ref("");

// Define os hambúrgueres disponíveis através do JSON
const burgers = productsData.menuItems.foods;

const addToCart = (burger) => {
  cartStore.addItem(burger);
  alertMessage.value = `${burger.name} adicionado ao carrinho!`;
  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/home";
</style>
