<template>
  <section class="admin-layout">
    <SidebarAdmin />
    <div class="admin-content">
      <header class="admin-header">
        <TheNavbarAdmin />
      </header>
      <main class="admin-main">
        <RouterView />
      </main>
      <footer class="footer-admin__layout">
        <TheFooterAdmin />
      </footer>
    </div>
  </section>
</template>

<script setup>
import SidebarAdmin from "@/components/admin/SidebarAdmin.vue";
import TheFooterAdmin from "@/components/admin/TheFooterAdmin.vue";
import TheNavbarAdmin from "@/components/admin/TheNavbarAdmin.vue";
</script>

<style scoped lang="scss">
@use "@/assets/styles/layouts/admin-layout";
</style>
