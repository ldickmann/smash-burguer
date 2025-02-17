<template>
  <!-- Banner component | Tendo imagem, titulo e parágrafo -->
  <div :class="['banner', { overlay: overlay }]">
    <div class="content-wrapper">
      <h1>{{ title }}</h1>
      <SeparatorLines />
      <p>{{ paragraph }}</p>
    </div>
    <div class="image-wrapper">
      <!-- Exibe a imagem do banner, src e alt e estilo dinâmico de altura -->
      <img :src="image" :alt="alt" :style="{ height: imageHeight }" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import SeparatorLines from "@/components/SeparatorLines.vue";

const props = defineProps({
  title: {
    type: String,
  },
  paragraph: {
    type: String,
  },
  image: {
    String,
  },
  alt: {
    String,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "auto",
  },
});

/**
 * Computa a altura da imagem com base na presença do overlay.
 * Se o 'overlay' for true, a altura será "550px".
 * Caso contrário, a altura será definida pelo valor da propriedade 'height'.
 *
 * @returns {string} A altura computada da imagem.
 */
const imageHeight = computed(() => (props.overlay ? "550px" : props.height));
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/banner';
</style>
