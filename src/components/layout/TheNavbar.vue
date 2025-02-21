<template>
  <header class="main-header" aria-label="Navegação principal">
    <div class="header-container">
      <!-- Logo e Home Link -->
      <router-link to="/" class="header-logo">
        <h1>{{ title }}</h1>
      </router-link>

      <!-- Menu Hambúrguer para dispositivos móveis -->
      <button
        class="button-hamburger"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-controls="main-nav"
        aria-label="Menu principal"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navegação Principal -->
      <nav id="main-nav" class="navbar-main" :class="{ 'is-open': isMenuOpen }">
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.path">
            <router-link
              :to="link.path"
              @click="closeMenu"
              :aria-current="$route.path === link.path ? 'page' : null"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- <div class="hamburger" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div> -->

      <!-- Navegação com classes dinâmicas para exibição do menu -->
      <!-- <nav class="navbar-main" :class="{ active: isMenuOpen }">
        <router-link to="/" @click="closeMenu">Home</router-link>
        <router-link to="/menu" @click="closeMenu">Cardápio</router-link>
        <router-link to="/cart" @click="closeMenu">Carrinho</router-link>
        <router-link to="/profile" @click="closeMenu">Perfil</router-link>
      </nav> -->
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

// Links de navegação
const navLinks = [
  { path: "/", label: "Home" },
  { path: "/menu", label: "Cardápio" },
  { path: "/cart", label: "Carrinho" },
  { path: "/profile", label: "Perfil" },
];

// Estado reativo que controla a exibição do menu
const isMenuOpen = ref(false);

// Altera o estado do menu de navegação
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

// Fecha o menu de navegação quando um link é clicado
const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/navbar';
</style>
