<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <header>
    <div class="header-container">
      <h1>{{ title }}</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/menu">Cardápio</router-link>
        <router-link to="/cart">Carrinho</router-link>
        <router-link to="/payment">Pagamento</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/navbar';
</style>
