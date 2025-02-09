<template>
  <Carousel v-bind="config" class="custom-carousel">
    <Slide v-for="burguer in burgers" :key="burguer.id" class="custom-slide">
      <div class="carousel-item">
        <img :src="burguer.image" :alt="burguer.name" class="carousel-image" />
        <div class="carousel-content">
          <h3>{{ burgers.name }}</h3>
          <p>{{ burguer.description }}</p>
          <p class="price">R$ {{ burguer.price.toFixed(2) }}</p>
          <button class="carousel-button">Adicionar ao Carrinho</button>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const burgers = [
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
  {
    id: 4,
    name: "Batata Frita",
    description: "Batata frita crocante e sequinha.",
    price: 12.9,
    image: "/images/foods/batata-frita.jpg",
  },
  {
    id: 5,
    name: "x-salada",
    description: "Pão brioche, pepino, tomate, alface, carne angus e queijo prato.",
    price: 20.9,
    image: "/images/foods/x-salada.jpg",
  },
];

const config = {
  height: 550,
  itemsToShow: 3,
  snapAlign: "center",
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/carousel";
</style>
