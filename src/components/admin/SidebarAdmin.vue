<template>
  <aside
    class="admin-sidebar"
    :class="{ 'sidebar-collapsed': isCollapsed }"
    ref="sidebarRef"
  >
    <!-- Header Section da Sidebar -->
    <div class="sidebar-container">
      <button class="toggle-button" @click="toggleSidebar" aria-label="Toggle Sidebar">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
      <div class="logo">
        <font-awesome-icon :icon="['fas', 'burger']" class="burger-icon" />
        <h2>Smash Burger</h2>
      </div>
    </div>

    <!-- Navegação Section da Sidebar -->
    <nav class="sidebar-nav">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :title="isCollapsed ? item.title : ''"
      >
        <font-awesome-icon :icon="item.icon" />
        <span>{{ item.title }}</span>
      </router-link>
    </nav>

    <!-- Footer Section da Sidebar -->
    <div class="sidebar-footer">
      <button
        class="logout-button"
        :title="isCollapsed ? 'Sair' : ''"
        @click="handleLogout"
      >
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        <span>Sair</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";

// Constantes e configurações
const MOBILE_BREAKPOINT = 576;
const menuItems = [
  {
    path: "/admin",
    icon: ["fas", "tachometer-alt"],
    title: "Dashboard",
  },
  {
    path: "/admin/products",
    icon: ["fas", "utensils"],
    title: "Gestão de Produtos",
  },
  {
    path: "/admin/orders",
    icon: ["fas", "shopping-cart"],
    title: "Gestão de Pedidos",
  },
  {
    path: "/admin/reports",
    icon: ["fas", "chart-line"],
    title: "Relatórios de Vendas",
  },
];

// Composables
const router = useRouter();
const adminStore = useAdminStore();

// Variáveis de Estado
const isCollapsed = ref(false);
const sidebarRef = ref(null);

// Métodos
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};

const isMobileView = () => window.innerWidth <= MOBILE_BREAKPOINT;

const collapseSidebarOnMobile = () => {
  if (isMobileView()) {
    isCollapsed.value = true;
  }
};

// Função para fechar a sidebar ao clicar fora dela ou em um link
const handleClickOutside = (event) => {
  if (
    isMobileView() &&
    !isCollapsed.value &&
    sidebarRef.value &&
    !sidebarRef.value.contains(event.target)
  ) {
    isCollapsed.value = true;
  }
};

// Lifecycle hooks e event handlers
router.afterEach(collapseSidebarOnMobile);

onMounted(() => {
  collapseSidebarOnMobile();
  window.addEventListener("resize", collapseSidebarOnMobile);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", collapseSidebarOnMobile);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/admin/sidebar-admin';
</style>
