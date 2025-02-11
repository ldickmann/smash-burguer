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

const formattedPrice = computed(() =>
  props.burger.price ? props.burger.price.toFixed(2) : "0.00"
);

const emitAddToCart = () => {
  emit("add-to-cart", props.burger);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/burger-card";
</style>
