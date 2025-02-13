<template>
  <div class="burger-card">
    <img :src="burger.image" :alt="burger.name" class="burguer-image" />
    <h3>{{ burger.name }}</h3>
    <p>R$ {{ formattedPrice }}</p>
    <button @click="emitAddToCart" class="burger-button">Adicionar ao Carrinho</button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  burger: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);

/**
 * Computes the formatted price of the burger.
 * If the price is available, it formats it to two decimal places.
 * If the price is not available, it defaults to "0.00".
 *
 * @computed
 * @returns {string} The formatted price of the burger.
 */
const formattedPrice = computed(() =>
  props.burger.price ? props.burger.price.toFixed(2) : "0.00"
);

/**
 * Emits an event to add the current burger to the cart.
 * The event name is "add-to-cart" and it passes the burger object as a parameter.
 */
const emitAddToCart = () => {
  emit("add-to-cart", props.burger);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/burger-card";
</style>
