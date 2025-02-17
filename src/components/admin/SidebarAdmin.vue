<template>
  <aside class="admin-sidebar">
    <header class="sidebar-header">
      <h2>
        <font-awesome-icon :icon="['fas', 'burger']" />
        Smash Burger
      </h2>
    </header>

    <nav class="sidebar-nav">
      <router-link to="/admin" class="nav-item">
        <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
        <span>Dashboard</span>
      </router-link>
      <router-link to="/admin/products" class="nav-item">
        <font-awesome-icon :icon="['fas', 'utensils']" />
        <span>Gestão de Produtos</span>
      </router-link>
      <router-link to="/admin/orders" class="nav-item">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" />
        <span>Gestão de Pedidos</span>
      </router-link>
      <router-link to="/admin/reports" class="nav-item">
        <font-awesome-icon :icon="['fas', 'chart-line']" />
        <span>Relatórios de Vendas</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <ButtonComponent
        class="logout-button"
        :buttons="[{ label: 'Sair', id: 'logout' }]"
        backgroundColor="#f00"
        @click="handleLogout"
      >
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
      </ButtonComponent>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import ButtonComponent from "@/components/ButtonComponent.vue";

const router = useRouter();
const adminStore = useAdminStore();

const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/admin/sidebar-admin';
</style>
