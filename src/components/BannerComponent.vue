<template>
  <!-- Banner: "hero" (Home) ou "page" (Cardápio). O título é o único h1 da página. -->
  <section :class="['banner', `banner--${variant}`]">
    <picture v-if="variant === 'page'" class="banner__bg">
      <source v-if="picture.srcset" type="image/webp" :srcset="picture.srcset" :sizes="picture.sizes" />
      <img
        class="banner__img"
        :src="picture.src"
        :alt="alt"
        :width="imageWidth"
        :height="imageHeight"
        loading="lazy"
        decoding="async"
      />
    </picture>

    <div class="banner__inner container">
      <div class="banner__content">
        <h1 class="banner__title">{{ title }}</h1>
        <p v-if="text" class="banner__text">{{ text }}</p>
        <div v-if="$slots.actions" class="banner__actions">
          <slot name="actions" />
        </div>
      </div>

      <div v-if="variant === 'hero'" class="banner__media">
        <picture>
          <source v-if="picture.srcset" type="image/webp" :srcset="picture.srcset" :sizes="picture.sizes" />
          <img
            class="banner__img"
            :src="picture.src"
            :alt="alt"
            :width="imageWidth"
            :height="imageHeight"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { responsiveImage } from "@/composables/useResponsiveImage";

const IMAGE_OPTIONS = {
  // Recorte com transparência: WebP com alfa em 480 e 960, PNG 960 de fallback
  hero: {
    widths: [480, 960],
    fallbackWidth: 960,
    fallbackExt: "png",
    sizes: "(min-width: 1024px) 560px, 300px",
  },
  page: {
    widths: [960, 1440, 1920],
    fallbackWidth: 1440,
    fallbackExt: "jpg",
    sizes: "100vw",
  },
};

const props = defineProps({
  variant: {
    type: String,
    default: "hero",
    validator: (value) => ["hero", "page"].includes(value),
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
  // Caminho-base da imagem (sem extensão) ou caminho completo
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
  imageWidth: {
    type: [Number, String],
    default: 960,
  },
  imageHeight: {
    type: [Number, String],
    default: 906,
  },
});

const picture = computed(() => responsiveImage(props.image, IMAGE_OPTIONS[props.variant]));
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/banner';
</style>
