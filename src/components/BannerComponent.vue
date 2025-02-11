<template>
  <div :class="['banner', { overlay: overlay }]">
    <div class="content-wrapper">
      <h1>{{ title }}</h1>
      <SeparatorLines />
      <p>{{ paragraph }}</p>
    </div>
    <div class="image-wrapper">
      <img :src="image" :alt="alt" :style="{ height: imageHeight }" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import SeparatorLines from "@/components/SeparatorLines.vue";

const props = defineProps({
  title: String,
  paragraph: String,
  image: String,
  alt: String,
  overlay: {
    type: Boolean,
    default: false,
  },
  height: {
    type: String,
    default: "auto",
  },
});

const imageHeight = computed(() => (props.overlay ? "550px" : props.height));
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/banner';
</style>
