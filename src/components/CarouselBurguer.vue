<template>
  <Carousel v-bind="carouselConfig" class="custom-carousel">
    <Slide v-for="burger in burgers" :key="burger.id" class="custom-slide">
      <div class="carousel-item">
        <img :src="burger.image" :alt="burger.name" class="carousel-image" />
        <div class="carousel-content">
          <h3>{{ burger.name }}</h3>
          <p>{{ burger.description }}</p>
          <p class="price">R$ {{ burger.price.toFixed(2) }}</p>
          <button @click="addToCart(burger)" class="carousel-button">
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

<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { computed } from "vue";

const props = defineProps({
  burgers: {
    Array,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);

const carouselConfig = computed(() => ({
  height: 550,
  itemsToShow: 3,
  snapAlign: "center",
  breakpoints: {
    425: {
      itemsToShow: 2,
    },
    768: {
      itemsToShow: 2,
    },
    1024: {
      itemsToShow: 3,
    },
  },
}));

const addToCart = (burger) => {
  emit("add-to-cart", burger);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/carousel';
</style>
