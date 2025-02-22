<template>
  <ul class="additionals-list">
    <li v-for="additional in additionals" :key="additional.id" class="additional-item">
      <div class="additional-info">
        <span class="additional-name">{{ additional.name }}</span>
        <span class="additional-price">{{ formatPrice(additional.price) }}</span>
      </div>

      <div class="quantity-controls">
        <button
          type="button"
          @click="updateQuantity(additional, additional.quantity - 1)"
          :disabled="additional.quantity <= 0"
          aria-label="Remover adicional"
        >
          <font-awesome-icon :icon="['fas', 'circle-minus']" class="minus-icon" />
        </button>

        <span class="quantity">{{ additional.quantity }}</span>

        <button
          type="button"
          @click="updateQuantity(additional, additional.quantity + 1)"
          :disabled="additional.quantity >= 5"
          aria-label="Adicionar adicional"
        >
          <font-awesome-icon :icon="['fas', 'circle-plus']" class="plus-icon" />
        </button>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { formatPrice } from "@/utils/formatters";

const props = defineProps({
  additionals: {
    type: Array,
    required: true,
    validator(value) {
      return value.every(
        (additional) =>
          "id" in additional &&
          "name" in additional &&
          "price" in additional &&
          "quantity" in additional
      );
    },
  },
});

const emit = defineEmits(["update:quantity"]);

const updateQuantity = (additional, newQuantity) => {
  if (newQuantity >= 0 && newQuantity <= 5) {
    emit("update:quantity", additional, newQuantity);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/additionals-list";
</style>
