<template>
  <TheHeader title="Smash Burgers" />
  <BannerImage
    classBanner="banner"
    image="/images/banner-burguer.jpg"
    alt="Hambúrgueres"
  />
  <section class="section-card">
    <h1>🍔 Nossos Hambúrgueres</h1>
    <div class="container">
      <CarouselBurguer :burgers="burgers" />
    </div>
  </section>
  <div class="container-card">
    <BurguerCard
      v-for="burger in burgers"
      :key="burger.id"
      :burger="burger"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "@/store/cart";
import TheHeader from "@/components/layout/TheHeader.vue";
import BannerImage from "@/components/BannerImage.vue";
import CarouselBurguer from "@/components/CarouselBurguer.vue";
import BurguerCard from "@/components/BurguerCard.vue";

const cartStore = useCartStore();

const burgers = ref([
  {
    id: 1,
    name: "Cheese Bacon",
    description: "Pão brioche, carne angus, cheddar e bacon crocante.",
    price: 25.9,
    image: "/images/foods/cheese-bacon.jpg",
  },
  {
    id: 2,
    name: "Smash Burger",
    description: "Dois smash burgers com queijo prato e cebola caramelizada.",
    price: 22.5,
    image: "/images/foods/smash-burger.jpg",
  },
  {
    id: 3,
    name: "Veggie Burger",
    description: "Hambúrguer de grão de bico com maionese vegana.",
    price: 24.9,
    image: "/images/foods/veggie-burger.jpg",
  },
]);

const addToCart = (burger) => {
  cartStore.addItem(burger);
  alert(`${burger.name} foi adicionado ao carrinho!`);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/home";
</style>
