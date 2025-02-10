<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const props = defineProps({
  burgers: Array,
  required: true,
});

const config = {
  height: 550,
  itemsToShow: 3,
  snapAlign: "center",
};
</script>

<template>
  <Carousel v-bind="config" class="custom-carousel">
    <Slide v-for="burguer in burgers" :key="burguer.id" class="custom-slide">
      <div class="carousel-item">
        <img :src="burguer.image" :alt="burguer.name" class="carousel-image" />
        <div class="carousel-content">
          <h3>{{ burguer.name }}</h3>
          <p>{{ burguer.description }}</p>
          <p class="price">R$ {{ burguer.price.toFixed(2) }}</p>
          <button @click="$emit('add-to-cart', burguer)" class="carousel-button">
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/carousel";
</style>
