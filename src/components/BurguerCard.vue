<script setup>
const props = defineProps({
  burger: Object,
});
</script>

<template>
  <div class="burger-card">
    <img :src="burger.image" :alt="burger.name" />
    <h3>{{ burger.name }}</h3>
    <p>R$ {{ burger.price.toFixed(2) }}</p>
    <button @click="$emit('add-to-cart', burger)">Adicionar ao Carrinho</button>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/components/burger-card";
</style>
