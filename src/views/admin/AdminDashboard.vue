<template>
  <section class="admin-dashboard">
    <h1>Painel Administrativo</h1>
    <nav>
      <router-link to="/admin/products">Gestão de Produtos</router-link>
      <router-link to="/admin/orders">Gestão de Pedidos</router-link>
      <router-link to="/admin/reports">Relatórios de Vendas</router-link>
    </nav>
    <router-view />
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/admin-dashboard';
</style>
