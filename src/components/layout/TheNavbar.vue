<template>
  <!-- Component Navbar -->
  <header class="main-header">
    <div class="header-container">
      <!-- Link para a página home -->
      <router-link to="/">
        <h1>{{ title }}</h1>
      </router-link>
      <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Navegação com classes dinâmicas para exibição do menu -->
      <nav class="navbar-main" :class="{ active: isMenuOpen }">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link to="/menu" @click="closeMenu">Cardápio</router-link>
        <router-link to="/cart" @click="closeMenu">Carrinho</router-link>
        <router-link to="/profile" @click="closeMenu">Perfil</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: String,
});

// Estado reativo que controla a exibição do menu
const isMenuOpen = ref(false);

// Altera o estado do menu de navegação
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Fecha o menu de navegação quando um link é clicado
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/navbar';
</style>
