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
import CarouselBurguer from "@/components/CarouselBurguer.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";

const cartStore = useCartStore();
const showAlert = ref(false);
const alertMessage = ref("");

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
  {
    id: 6,
    name: "Chicken Burger",
    description: "Pão brioche, frango empanado, alface e maionese.",
    price: 23.9,
    image: "/images/foods/chicken-burger.jpg",
  },
  {
    id: 7,
    name: "Burger Picanha",
    description: "Pão brioche, carne de picanha, queijo cheddar e molho especial.",
    price: 29.9,
    image: "/images/foods/burger-picanha.jpg",
  },
];

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
