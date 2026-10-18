<template>
  <div class="product-carousel">
    <div class="product-carousel__header">
      <slot name="title" />
      <div class="product-carousel__nav">
        <BaseButton
          variant="secondary"
          icon-only
          icon-start="chevron-left"
          label="Anterior"
          @click="carouselRef?.prev()"
        />
        <BaseButton
          variant="secondary"
          icon-only
          icon-start="chevron-right"
          label="Próximo"
          @click="carouselRef?.next()"
        />
      </div>
    </div>

    <Carousel ref="carouselRef" v-bind="carouselConfig" class="product-carousel__carousel">
      <Slide v-for="product in products" :key="product.id" class="product-carousel__slide">
        <ProductCard
          :product="product"
          variant="compact"
          :heading-level="3"
          @add="(item, context) => $emit('add', item, context)"
        />
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import { ref } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import ProductCard from "@/components/ProductCard.vue";
import { readDurationToken } from "@/utils/tokens";

defineProps({
  products: {
    type: Array,
    required: true,
  },
});

defineEmits(["add"]);

const carouselRef = ref(null);

// Duração do deslizamento lida do token --dur-base; zero com movimento reduzido
const slideDuration = () => {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return 0;
  return readDurationToken("--dur-base");
};

// Mesmas larguras de breakpoint do SCSS (§2.9): 1, 2 e 3 itens a partir de base, sm e lg
const carouselConfig = {
  snapAlign: "start",
  wrapAround: true,
  pauseAutoplayOnHover: true,
  // = --space-5
  gap: 24,
  transition: slideDuration(),
  itemsToShow: 1,
  breakpoints: {
    480: { itemsToShow: 2 },
    768: { itemsToShow: 2 },
    1024: { itemsToShow: 3 },
    1280: { itemsToShow: 3 },
  },
  i18n: {
    ariaNextSlide: "Próximo",
    ariaPreviousSlide: "Anterior",
    ariaNavigateToSlide: "Ir para o item {slideNumber}",
    ariaNavigateToPage: "Ir para a página {slideNumber}",
    ariaGallery: "Mais pedidos",
    itemXofY: "Item {currentSlide} de {slidesCount}",
    iconArrowUp: "Seta para cima",
    iconArrowDown: "Seta para baixo",
    iconArrowLeft: "Seta para a esquerda",
    iconArrowRight: "Seta para a direita",
  },
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/carousel';
</style>
