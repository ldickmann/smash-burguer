<template>
  <header>
    <h1>{{ title }}</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/menu">Cardápio</router-link>
      <router-link to="/cart">Carrinho</router-link>
      <router-link to="/payment">Pagamento</router-link>
    </nav>
  </header>
</template>

<script setup>
const props = defineProps({
  title: String,
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/header";
</style>
