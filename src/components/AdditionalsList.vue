<template>
  <ul class="additionals-list" role="list">
    <li v-for="(additional, index) in model" :key="additional.id" class="additionals-list__item">
      <div class="additionals-list__info">
        <span class="additionals-list__name">{{ additional.name }}</span>
        <span class="additionals-list__price tabular">+ {{ formatPrice(additional.price) }}</span>
      </div>

      <QuantityStepper
        :model-value="additional.quantity"
        :min="0"
        :max="5"
        :label="additional.name"
        @update:model-value="setQuantity(index, $event)"
      />
    </li>
  </ul>
</template>

<script setup>
import { formatPrice } from "@/utils/formatters";
import QuantityStepper from "@/components/ui/QuantityStepper.vue";

// Lista de { id, name, price, quantity } controlada pelo pai com v-model
const model = defineModel({
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
});

const setQuantity = (index, quantity) => {
  model.value = model.value.map((additional, i) =>
    i === index ? { ...additional, quantity } : additional
  );
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/additionals-list";
</style>
