<template>
  <div class="not-found container">
    <p class="not-found__code" aria-hidden="true">404</p>
    <h1 class="not-found__title">Página não encontrada</h1>
    <p class="not-found__text">Desculpe, a página que você está procurando não existe.</p>
    <BaseButton to="/">Voltar para o início</BaseButton>
  </div>
</template>

<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/not-found';
</style>
