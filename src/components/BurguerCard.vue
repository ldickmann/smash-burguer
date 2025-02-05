<template>
  <div class="burger-card">
    <img :src="burger.image" :alt="burger.name" />
    <h3>{{ burger.name }}</h3>
    <p>R$ {{ burger.price.toFixed(2) }}</p>
    <button @click="$emit('add-to-cart', burger)">Adicionar ao Carrinho</button>
  </div>
</template>

<script setup>
defineProps(['burger'])
</script>

<style scoped>
.burger-card {
  border: 1px solid #ccc;
  padding: 15px;
  text-align: center;
}
</style>
