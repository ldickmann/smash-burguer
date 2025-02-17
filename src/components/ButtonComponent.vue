<template>
  <!-- Component Buttons -->
  <div
    class="container-buttons"
    :style="{
      gap: `${gap}px`,
      '--mobile-font-size': mobileFontSize,
      '--mobile-button-size': mobileButtonSize,
    }"
  >
    <!-- Itera sobre a lista de botões e cria um botão para cada item -->
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
  // Responsividade para dispositivos móveis
  mobileFontSize: {
    type: String,
    default: "10px",
  },
  mobileButtonSize: {
    type: String,
    default: "8px 16px",
  },
});

// Define eventos emitidos pelo componente
const emit = defineEmits(["category-selected", "click"]);

/**
 * Função que lida com o clique em um botão.
 * Emite o evento "category-selected" se o botão tiver uma categoria.
 * Emite o evento "click" com o botão clicado.
 *
 * @param {Object} button O botão clicado.
 */
const handleClick = (button) => {
  if (button.category) {
    emit("category-selected", button.category);
  }
  emit("click", button);
};

/**
 * Estilo personalizado para o(s) botão(ões) baseado nas propriedades recebidas.
 */
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
