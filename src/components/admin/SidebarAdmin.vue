<template>
  <aside
    class="admin-sidebar"
    :class="{ 'sidebar-collapsed': isCollapsed }"
    ref="sidebarRef"
  >
    <div class="sidebar-container">
      <button class="toggle-button" @click="toggleSidebar" aria-label="Toggle Sidebar">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
      <div class="logo">
        <font-awesome-icon :icon="['fas', 'burger']" class="burger-icon" />
        <h2>Smash Burger</h2>
      </div>
    </div>

    <nav class="sidebar-nav">
      <router-link to="/admin" class="nav-item" :title="isCollapsed ? 'Dashboard' : ''">
        <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
        <span>Dashboard</span>
      </router-link>
      <router-link
        to="/admin/products"
        class="nav-item"
        :title="isCollapsed ? 'Gestão de Produtos' : ''"
      >
        <font-awesome-icon :icon="['fas', 'utensils']" />
        <span>Gestão de Produtos</span>
      </router-link>
      <router-link
        to="/admin/orders"
        class="nav-item"
        :title="isCollapsed ? 'Gestão de Pedidos' : ''"
      >
        <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        <span>Gestão de Pedidos</span>
      </router-link>
      <router-link
        to="/admin/reports"
        class="nav-item"
        :title="isCollapsed ? 'Relatórios de Vendas' : ''"
      >
        <font-awesome-icon :icon="['fas', 'chart-line']" />
        <span>Relatórios de Vendas</span>
      </router-link>
    </nav>

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

const router = useRouter();
const adminStore = useAdminStore();
const isCollapsed = ref(false);
const sidebarRef = ref(null);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};

// Função para fechar a sidebar ao clicar fora dela ou em um link
const handleClickOutside = (event) => {
  if (
    window.innerWidth <= 576 &&
    !isCollapsed.value &&
    sidebarRef.value &&
    !sidebarRef.value.contains(event.target)
  ) {
    isCollapsed.value = true;
  }
};

// Adiciona o evento de click que fecha a sidebar quando clicar em uma rota (link)
router.afterEach(() => {
  if (window.innerWidth <= 576) {
    isCollapsed.value = true;
  }
});

onMounted(() => {
  const checkWindowSize = () => {
    if (window.innerWidth <= 576) {
      isCollapsed.value = true;
    }
  };

  checkWindowSize();
  window.addEventListener("resize", checkWindowSize);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkWindowSize);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/admin/sidebar-admin';
</style>
