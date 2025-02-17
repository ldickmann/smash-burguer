<template>
  <header>
    <div class="header-container">
      <router-link to="/">
        <h1>{{ title }}</h1>
      </router-link>
      <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav :class="{ active: isMenuOpen }">
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

const isMenuOpen = ref(false);

/**
 * Toggles the state of the menu.
 * If the menu is currently open, it will be closed, and vice versa.
 */
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

/**
 * This function is typically used to handle the closing of a navigation menu.
 */
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/navbar';
</style>
