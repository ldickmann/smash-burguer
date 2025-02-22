<template>
  <header class="main-header" aria-label="Navegação principal">
    <div class="header-container">
      <!-- Logo e Home Link -->
      <router-link to="/" class="header-logo">
        <h1>{{ title }}</h1>
      </router-link>

      <!-- Menu Hambúrguer para dispositivos móveis -->
      <button
        class="hamburger"
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
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

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

// Função para fechar menu quando clicar fora
const handleClickOutside = (event) => {
  const nav = document.getElementById("main-nav");
  const hamburger = event.target.closest(".hamburger");

  if (isMenuOpen.value && !nav.contains(event.target) && !hamburger) {
    closeMenu();
  }
};

// Adiciona o evento quando o componente é montado
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Remove o evento quando o componente é desmontado
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/navbar';
</style>
