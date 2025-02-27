<template>
  <!-- Component Separator -->
  <section
    role="separator"
    :aria-orientation="orientation"
    class="separator"
    :class="separatorClass"
  >
    <hr class="separator__line" :style="lineStyle" />
    <slot />
  </section>
</template>

<script setup>
import { computed } from "vue";

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
    type: [Number, String],
    default: 2,
    validator: (value) => !isNaN(Number(value)) && Number(value) > 0,
  },
});

// Propriedade computada para as classes memoizadas
const separatorClass = computed(() => ({
  "separator--vertical": props.orientation === "vertical",
  "separator--horizontal": props.orientation === "horizontal",
}));

// Propriedade computada para estilizar a linha memoizada
const lineStyle = computed(() => ({
  backgroundColor: props.color,
  [props.orientation === "vertical" ? "width" : "height"]: `${props.thickness}px`,
}));
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/separator';
</style>
