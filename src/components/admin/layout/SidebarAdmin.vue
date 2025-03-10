<template>
  <aside
    class="admin-sidebar"
    :class="{ 'sidebar-collapsed': isCollapsed }"
    ref="sidebarRef"
  >
    <!-- Header Section da Sidebar -->
    <div class="sidebar-container">
      <div class="logo">
        <font-awesome-icon :icon="['fas', 'burger']" class="burger-icon" />
        <h2>Smash Burger</h2>
      </div>

      <button v-if="!isCollapsed" class="close-button" @click="handleCloseSidebar">
        <font-awesome-icon :icon="['fas', 'square-xmark']" />
      </button>
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
      <button class="logout-button" @click="handleLogout">
        <font-awesome-icon :icon="['fas', 'tent-arrow-turn-left']" />
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:isCollapsed"]);

const sidebarRef = ref(null);

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

const handleCloseSidebar = () => {
  emit("update:isCollapsed", true);
};

const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/admin/sidebar-admin';
</style>
