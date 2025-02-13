<template>
  <div class="container-buttons" :style="{ gap: `${gap}px` }">
    <button
      v-for="button in buttons"
      :key="button.id || button.category"
      class="button"
      :style="customStyle"
      @click="handleClick(button)"
    >
      {{ button.label }}
      <slot :name="button.id || button.category" />
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  buttons: {
    type: Array,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: "#3498db",
  },
  fontColor: {
    type: String,
    default: "#fff",
  },
  fontSize: {
    type: String,
    default: "16px",
  },
  buttonSize: {
    type: String,
    default: "12px 24px",
  },
  borderRadius: {
    type: String,
    default: "4px",
  },
  gap: {
    type: Number,
    default: 8,
  },
});

const emit = defineEmits(["category-selected", "click"]);

const handleClick = (button) => {
  if (button.category) {
    emit("category-selected", button.category);
  }
  emit("click", button);
};

const customStyle = computed(() => ({
  backgroundColor: props.backgroundColor,
  color: props.fontColor,
  fontSize: props.fontSize,
  padding: props.buttonSize,
  borderRadius: props.borderRadius,
}));
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/buttons";
</style>
