<template>
  <section class="banner-section">
    <div class="container-utilities">
      <BannerComponent
        title="Bem-vindo ao Smash Burger"
        paragraph="Descubra o verdadeiro sabor dos Hambúrgueres artesanais"
        :image="getImagePath('images/fundos/banner-burger-bg.png')"
        alt="Hambúrgueres"
      />
    </div>
  </section>
  <section
    class="section-carousel"
    :style="{
      backgroundImage: `url(${getImagePath('images/fundos/background-section-dark.jpg')})`,
    }"
  >
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
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useImagePath } from "@/composables/useImagePath";
import productsData from "../json/products.json";
import CarouselBurguer from "@/components/CarouselBurguer.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

const cartStore = useCartStore();
const showAlert = ref(false);
const alertMessage = ref("");
const { getImagePath } = useImagePath();

// Processa os hambúrgueres para adicionar o baseUrl nas imagens
const burgers = computed(() => {
  return productsData.menuItems.foods.map(burger => ({
    ...burger,
    image: getImagePath(burger.image)
  }));
});

// Função para adicionar um item ao carrinho
const addToCart = (burger) => {
  cartStore.addItem(burger);
  alertMessage.value = `${burger.name} adicionado ao carrinho!`;
  showAlert.value = true;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/home";
</style>
