<template>
  <header class="navbar-main" ref="headerRef">
    <div class="navbar-main__container">
      <router-link to="/" class="navbar-main__brand" @click="closeMenu">
        <h1>{{ title }}</h1>
      </router-link>

      <button
        class="navbar-main__toggle"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        ref="toggleRef"
        aria-label="Menu principal"
      >
        <span class="navbar-main__toggle-bar"></span>
        <span class="navbar-main__toggle-bar"></span>
        <span class="navbar-main__toggle-bar"></span>
      </button>

      <nav class="navbar-main__menu" ref="menuRef" :class="{ 'is-open': isMenuOpen }">
        <ul class="navbar-main__list">
          <li v-for="link in navLinks" :key="link.path" class="navbar-main__item">
            <router-link
              :to="link.path"
              class="navbar-main__link"
              :class="{ 'is-active': route.path === link.path }"
              @click="closeMenu"
            >
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Renderiza Login ou Logout conforme a autenticação do usuário -->
      <ButtonComponent
        v-if="!userStore.isAuthenticated"
        :buttons="[{ label: 'Login', id: 'login' }]"
        backgroundColor="#42b983"
        fontColor="#ffffff"
        fontSize="16px"
        buttonSize="0.75rem 1.5rem"
        borderRadius="6px"
        @click="LoginPage"
      />
      <ButtonComponent
        v-else
        :buttons="[{ label: 'Logout', id: 'logout' }]"
        backgroundColor="#3498db"
        fontColor="#ffffff"
        fontSize="16px"
        buttonSize="0.75rem 1.5rem"
        borderRadius="6px"
        @click="Logout"
      />
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useButtonHandlers } from "@/utils/buttonHandlers";
import ButtonComponent from "../ButtonComponent.vue";

const { handleLoginPage, handleLogout } = useButtonHandlers();

const route = useRoute();
const headerRef = ref(null);
const menuRef = ref(null);
const toggleRef = ref(null);
const isMenuOpen = ref(false);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

// Verifica se o usuário está logado
const userStore = useUserStore();

const navLinks = computed(() => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Cardápio" },
    { path: "/cart", label: "Carrinho" },
  ];
  if (userStore.isAuthenticated) {
    links.push({ path: "/profile", label: "Perfil" });
  }
  return links;
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};

const handleClickOutside = (event) => {
  if (
    isMenuOpen.value &&
    !menuRef.value?.contains(event.target) &&
    !toggleRef.value?.contains(event.target)
  ) {
    closeMenu();
  }
};

const LoginPage = () => {
  handleLoginPage();
};

const Logout = () => {
  handleLogout();
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/navbar";
</style>
