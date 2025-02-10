<template>
  <section class="banner-section">
    <div class="container-utilities">
      <BannerComponent
        classBanner="banner"
        title="Bem-vindo ao Smash Burger"
        paragraph="Descubra o verdadeiro sabor dos Hambúrgueres artesanais"
        image="/images/banner-burger-bg.png"
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
</template>

<script setup>
import { useCartStore } from "@/store/cart";
import CarouselBurguer from "@/components/CarouselBurguer.vue";
import BannerComponent from "@/components/BannerComponent.vue";

const cartStore = useCartStore();

const burgers = [
  {
    id: 1,
    name: "Cheese Bacon",
    description: "Pão brioche, carne angus, cheddar e bacon crocante.",
    price: 25.99,
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
  {
    id: 4,
    name: "Batata Frita",
    description: "Batata frita crocante e sequinha.",
    price: 12.9,
    image: "/images/foods/batata-frita.jpg",
  },
  {
    id: 5,
    name: "X-Salada",
    description: "Pão brioche, pepino, tomate, alface, carne angus e queijo prato.",
    price: 20.9,
    image: "/images/foods/x-salada.jpg",
  },
];

const addToCart = (burger) => {
  cartStore.addItem(burger);
  alert(`${burger.name} foi adicionado ao carrinho!`);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/home";
</style>
