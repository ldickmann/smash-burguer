<template>
  <div :class="classBanner">
    <img :src="image" :alt="alt" />
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  classBanner: String,
  image: String,
  alt: String,
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/banner";
</style>
