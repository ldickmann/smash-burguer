<template>
  <section class="admin-dashboard">
    <div class="dashboard-container">
      <h1 class="dashboard-title">
        <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
        Painel Administrativo
      </h1>

      <nav class="dashboard-navbar">
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

      <router-view />
    </div>
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/admin-dashboard';
</style>
