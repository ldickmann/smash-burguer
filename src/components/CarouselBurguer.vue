<template>
  <!-- Component Carousel -->
  <Carousel v-bind="carouselConfig" class="custom-carousel">
    <!-- Para cada item de burgers, renderiza um slide no carousel -->
    <Slide v-for="burger in burgers" :key="burger.id" class="custom-slide">
      <div class="carousel-item">
        <img :src="burger.image" :alt="burger.name" class="carousel-image" />
        <div class="carousel-content">
          <h3>{{ burger.name }}</h3>
          <p>{{ burger.description }}</p>
          <p class="price">R$ {{ burger.price.toFixed(2) }}</p>
          <ButtonComponent
            class="carousel-button"
            @click="() => addToCart(burger)"
            :buttons="[{ label: 'Adicionar ao carrinho', id: 'add-to-cart' }]"
            backgroundColor="#42b983"
            fontSize="16px"
            buttonSize="12px 24px"
            borderRadius="4px"
            :mobileFontSize="'15px'"
            :mobileButtonSize="'6px 12px'"
          />
        </div>
      </div>
    </Slide>

    <!-- Adiciona os componentes de navegação e paginação -->
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
import ButtonComponent from "@/components/ButtonComponent.vue";

const props = defineProps({
  burgers: {
    Array,
    required: true,
  },
});

// Define eventos emitidos pelo componente
const emit = defineEmits(["add-to-cart"]);

// Configurações computadas do carousel com base nos "breakpoints"
const carouselConfig = computed(() => ({
  height: 550,
  itemsToShow: 3,
  snapAlign: "center",
  wrapAround: true,
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

// Função para adicionar um burger ao carrinho, emitindo o evento "add-to-cart"
const addToCart = (burger) => {
  emit("add-to-cart", burger);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/carousel';
</style>
