<template>
  <!-- Component Separator -->
  <section
    ref="separator"
    :aria-orientation="orientation"
    class="separator"
    :class="separatorClass"
    :style="containerStyle"
  >
    <hr class="separator__line" :style="lineStyle" />
    <slot />
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const separator = ref(null);

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
  marginTop: {
    type: [Number, String],
    default: 0,
  },
  marginBottom: {
    type: [Number, String],
    default: 0,
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

// Propriedade computada para estilizar o container
const containerStyle = computed(() => ({
  marginTop:
    typeof props.marginTop === "number" ? `${props.marginTop}px` : props.marginTop,
  marginBottom:
    typeof props.marginBottom === "number"
      ? `${props.marginBottom}px`
      : props.marginBottom,
}));
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/separator';
</style>
