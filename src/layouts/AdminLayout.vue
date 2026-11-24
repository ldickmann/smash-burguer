<template>
  <div class="admin-layout" :class="{ 'is-sidebar-open': isSidebarOpen, 'is-desktop': isDesktop }">
    <!-- Com a gaveta aberta, o resto da página fica inert (desenho do admin, §4.2). A região dos
         avisos fica no App.vue, fora daqui: inert, ela sairia da árvore e não anunciaria -->
    <a href="#conteudo" class="skip-link" :inert="gavetaAberta || undefined" @click.prevent="focusMain">
      Pular para o conteúdo
    </a>

    <header class="admin-header" :inert="gavetaAberta || undefined">
      <TheNavbarAdmin :sidebar-open="isSidebarOpen" />
    </header>

    <!-- Abaixo de lg: fundo escurecido atrás da gaveta -->
    <div v-if="gavetaAberta" class="admin-overlay" @click="closeSidebar({ returnFocus: true })"></div>

    <SidebarAdmin
      v-show="isSidebarOpen"
      ref="sidebarRef"
      :closable="!isDesktop"
      @close="closeSidebar({ returnFocus: true })"
    />

    <main id="conteudo" ref="mainRef" class="admin-main" tabindex="-1" :inert="gavetaAberta || undefined">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from "vue";
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

// A gaveta modal só existe abaixo de lg; a coluna fixa não bloqueia nada
const gavetaAberta = computed(() => isSidebarOpen.value && !isDesktop.value);

const openSidebar = async () => {
  isSidebarOpen.value = true;
  if (isDesktop.value) return;
  lock();
  await nextTick();
  sidebarRef.value?.focusFirst();
};

// O focus() num elemento ainda inert não faz nada: o foco volta ao botão só depois do flush do Vue,
// que tira o inert do cabeçalho
const closeSidebar = async ({ returnFocus = false } = {}) => {
  if (!isSidebarOpen.value) return;
  isSidebarOpen.value = false;
  unlock();
  if (!returnFocus) return;
  await nextTick();
  toggleButton?.focus();
};

// A partir de lg a sidebar é fixa: o botão só abre e fecha a gaveta
const toggleSidebar = (button) => {
  toggleButton = button ?? toggleButton;
  if (isDesktop.value) return;
  if (isSidebarOpen.value) closeSidebar();
  else openSidebar();
};

provide("toggleSidebar", toggleSidebar);

const focusMain = () => mainRef.value?.focus();

const handleKeydown = (event) => {
  if (event.key === "Escape" && gavetaAberta.value) {
    closeSidebar({ returnFocus: true });
  }
};

const handleMediaChange = (event) => {
  isDesktop.value = event.matches;
  unlock();
  isSidebarOpen.value = event.matches;
};

// A gaveta fecha ao trocar de rota. Se o foco estava nela, ele vai ao main depois do flush (com o
// inert já fora): na troca só de query, o afterEach do router não move o foco, e ele cairia no body
watch(
  () => route.fullPath,
  async () => {
    if (!gavetaAberta.value) return;
    const focoNaGaveta = sidebarRef.value?.$el?.contains(document.activeElement) ?? false;
    closeSidebar();
    if (!focoNaGaveta) return;
    await nextTick();
    mainRef.value?.focus({ preventScroll: true });
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
