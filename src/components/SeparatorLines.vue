<template>
  <div class="separator-container" :class="{ vertical: isVertical }">
    <div class="separator-line" :style="separatorStyle"></div>
    <slot></slot>
    <div class="separator-line" :style="separatorStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#38184c',
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value),
  },
  thickness: {
    type: Number,
    default: 2,
  },
})

const isVertical = computed(() => props.orientation === 'vertical')

const separatorStyle = computed(() => ({
  backgroundColor: props.color,
  [isVertical.value ? 'width' : 'height']: `${props.thickness}px`,
}))
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/separator';
</style>
