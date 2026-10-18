<template>
  <header ref="headerRef" class="navbar">
    <div class="navbar__bar container">
      <RouterLink to="/" class="navbar__brand">{{ title }}</RouterLink>

      <nav
        id="menu-principal"
        ref="menuRef"
        class="navbar__menu"
        :class="{ 'is-open': isMenuOpen }"
        aria-label="Principal"
      >
        <ul class="navbar__list" role="list">
          <li v-for="link in navLinks" :key="link.path" class="navbar__item">
            <RouterLink :to="link.path" class="navbar__link">
              <span class="navbar__link-text">{{ link.label }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="navbar__actions">
        <CartBadge />
        <BaseButton
          ref="toggleRef"
          class="navbar__toggle"
          variant="ghost"
          icon-only
          :icon-start="isMenuOpen ? 'xmark' : 'bars'"
          label="Menu principal"
          aria-controls="menu-principal"
          :aria-expanded="String(isMenuOpen)"
          @click="toggleMenu"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { useScrollLock } from "@/composables/useScrollLock";
import BaseButton from "@/components/ui/BaseButton.vue";
import CartBadge from "@/components/CartBadge.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const route = useRoute();
const userStore = useUserStore();
const { lock, unlock } = useScrollLock();

const headerRef = ref(null);
const menuRef = ref(null);
const toggleRef = ref(null);
const isMenuOpen = ref(false);

// O terceiro link depende da sessão
const navLinks = computed(() => [
  { path: "/", label: "Início" },
  { path: "/menu", label: "Cardápio" },
  userStore.isAuthenticated
    ? { path: "/profile", label: "Perfil" }
    : { path: "/login", label: "Entrar" },
]);

const openMenu = async () => {
  isMenuOpen.value = true;
  lock();
  await nextTick();
  menuRef.value?.querySelector("a")?.focus();
};

const closeMenu = ({ returnFocus = false } = {}) => {
  if (!isMenuOpen.value) return;
  isMenuOpen.value = false;
  unlock();
  if (returnFocus) toggleRef.value?.focus();
};

const toggleMenu = () => (isMenuOpen.value ? closeMenu() : openMenu());

const handleKeydown = (event) => {
  if (event.key === "Escape" && isMenuOpen.value) closeMenu({ returnFocus: true });
};

const handlePointerDown = (event) => {
  if (isMenuOpen.value && !headerRef.value?.contains(event.target)) closeMenu();
};

// Fecha ao trocar de rota
watch(() => route.fullPath, () => closeMenu());

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("pointerdown", handlePointerDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("pointerdown", handlePointerDown);
  unlock();
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/navbar";
</style>
