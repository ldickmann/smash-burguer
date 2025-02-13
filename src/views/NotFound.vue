<template>
  <div class="not-found">
    <div class="not-found__container">
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <router-link to="/" class="not-found__button"> Voltar para Home </router-link>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/pages/not-found';
</style>
