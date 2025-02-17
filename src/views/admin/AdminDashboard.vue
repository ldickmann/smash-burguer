<template>
  <section class="admin-dashboard">
    <SidebarAdmin />
    <main class="dashboard-main">
      <div class="dashboard-container">
        <h1 class="dashboard-title">
          <font-awesome-icon :icon="['fas', 'tachometer-alt']" />
          Painel Administrativo
        </h1>
      </div>
    </main>
  </section>
</template>

<script setup>
import SidebarAdmin from "@/components/admin/SidebarAdmin.vue";
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/admin-dashboard';
</style>
