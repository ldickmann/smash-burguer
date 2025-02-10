<template>
  <div :class="classBanner">
    <div class="content-wrapper">
      <h1>{{ title }}</h1>
      <SeparatorLines />
      <p>{{ paragraph }}</p>
    </div>
    <div class="image-wrapper">
      <img :src="image" :alt="alt" />
    </div>
  </div>
</template>

<script setup>
import SeparatorLines from "@/components/SeparatorLines.vue";

const props = defineProps({
  classBanner: String,
  title: String,
  paragraph: String,
  image: String,
  alt: String,
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/banner";
</style>
