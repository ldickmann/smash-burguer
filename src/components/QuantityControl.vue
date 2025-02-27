<template>
  <div class="quantity-control">
    <button
      type="button"
      @click="updateQuantity('decrease')"
      :disabled="quantity.quantity <= 1"
      aria-label="Diminuir quantidade"
    >
      -
    </button>

    <span class="quantity-value">{{ quantity.quantity || 1 }}</span>

    <button
      type="button"
      @click="updateQuantity('increase')"
      :disabled="quantity.quantity >= 10"
      aria-label="Aumentar quantidade"
    >
      +
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  quantity: {
    type: Object,
    required: true,
    default: () => ({ quantity: 1 }),
  },
});

const emit = defineEmits(["update:quantity"]);

const updateQuantity = (action) => {
  const newQuantity = {
    quantity:
      action === "increase"
        ? (props.quantity.quantity || 1) + 1
        : (props.quantity.quantity || 1) - 1,
  };

  if (newQuantity.quantity >= 1 && newQuantity.quantity <= 10) {
    emit("update:quantity", newQuantity);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/quantity-control";
</style>
