<template>
  <section class="admin-layout">
    <SidebarAdmin />
    <div class="admin-content">
      <header class="admin-header">
        <NavbarAdmin />
      </header>
      <main class="admin-main">
        <RouterView />
      </main>
      <!-- Codificar o Footer do AdminLayout.vue -->
      <footer class="admin-footer"></footer>
    </div>
  </section>
</template>

<script setup>
import NavbarAdmin from "@/components/admin/NavbarAdmin.vue";
import SidebarAdmin from "@/components/admin/SidebarAdmin.vue";
</script>

<style scoped lang="scss">
@use "@/assets/styles/layouts/admin-layout";
</style>
