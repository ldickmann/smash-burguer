<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "#38184c",
  },
  orientation: {
    type: String,
    default: "horizontal",
    validator: (value) => ["horizontal", "vertical"].includes(value),
  },
  thickness: {
    type: Number,
    default: 2,
  },
});
</script>

<template>
  <div class="separator-container" :class="{ vertical: orientation === 'vertical' }">
    <div class="separator-line" :style="{
      backgroundColor: color,
      [orientation === 'vertical' ? 'width' : 'height']: `${thickness}px`,
    }"></div>
    <slot></slot>
    <div class="separator-line" :style="{
      backgroundColor: color,
      [orientation === 'vertical' ? 'width' : 'height']: `${thickness}px`,
    }"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/separator';
</style>
