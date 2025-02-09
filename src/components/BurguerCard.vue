<template>
  <div class="burger-card">
    <img :src="burger.image" :alt="burger.name" />
    <h3>{{ burger.name }}</h3>
    <p>R$ {{ burger.price.toFixed(2) }}</p>
    <button @click="$emit('add-to-cart', burger)">Adicionar ao Carrinho</button>
  </div>
</template>

<script setup>
const props = defineProps({
  burger: Object,
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/burger-card";
</style>
