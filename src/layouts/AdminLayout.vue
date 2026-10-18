<template>
  <div class="admin-layout" :class="{ 'is-sidebar-open': isSidebarOpen, 'is-desktop': isDesktop }">
    <a href="#conteudo" class="skip-link" @click.prevent="focusMain">Pular para o conteúdo</a>

    <header class="admin-header">
      <TheNavbarAdmin :sidebar-open="isSidebarOpen" />
    </header>

    <!-- Abaixo de lg: fundo escurecido atrás da gaveta -->
    <div v-if="isSidebarOpen && !isDesktop" class="admin-overlay" @click="closeSidebar"></div>

    <SidebarAdmin
      v-show="isSidebarOpen"
      ref="sidebarRef"
      :closable="!isDesktop"
      @close="closeSidebar({ returnFocus: true })"
    />

    <main id="conteudo" ref="mainRef" class="admin-main" tabindex="-1">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useScrollLock } from "@/composables/useScrollLock";
import SidebarAdmin from "@/components/admin/layout/SidebarAdmin.vue";
import TheNavbarAdmin from "@/components/admin/layout/TheNavbarAdmin.vue";

// Mesmo valor do breakpoint lg do SCSS (§2.9)
const DESKTOP_QUERY = "(min-width: 1024px)";

const route = useRoute();
const { lock, unlock } = useScrollLock();

const mainRef = ref(null);
const sidebarRef = ref(null);
const desktopMedia = window.matchMedia(DESKTOP_QUERY);
const isDesktop = ref(desktopMedia.matches);
// Fechada por padrão abaixo de lg (RES-02); fixa e aberta a partir de lg
const isSidebarOpen = ref(isDesktop.value);
let toggleButton = null;

const openSidebar = async () => {
  isSidebarOpen.value = true;
  if (isDesktop.value) return;
  lock();
  await nextTick();
  sidebarRef.value?.focusFirst();
};

const closeSidebar = ({ returnFocus = false } = {}) => {
  if (!isSidebarOpen.value) return;
  isSidebarOpen.value = false;
  unlock();
  if (returnFocus) toggleButton?.focus();
};

const toggleSidebar = (button) => {
  toggleButton = button ?? toggleButton;
  if (isSidebarOpen.value) closeSidebar();
  else openSidebar();
};

provide("toggleSidebar", toggleSidebar);

const focusMain = () => mainRef.value?.focus();

const handleKeydown = (event) => {
  if (event.key === "Escape" && isSidebarOpen.value && !isDesktop.value) {
    closeSidebar({ returnFocus: true });
  }
};

const handleMediaChange = (event) => {
  isDesktop.value = event.matches;
  unlock();
  isSidebarOpen.value = event.matches;
};

// A gaveta fecha ao trocar de rota
watch(
  () => route.fullPath,
  () => {
    if (!isDesktop.value) closeSidebar();
  }
);

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  desktopMedia.addEventListener("change", handleMediaChange);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  desktopMedia.removeEventListener("change", handleMediaChange);
  unlock();
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/layouts/admin-layout";
</style>
