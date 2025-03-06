<template>
  <section class="admin-layout">
    <header class="admin-header">
      <TheNavbarAdmin />
    </header>
    <SidebarAdmin
      :isCollapsed="isSidebarCollapsed"
      @update:isCollapsed="isSidebarCollapsed = $event"
    />
    <div class="admin-content">
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
import { ref, provide } from "vue";

import SidebarAdmin from "@/components/admin/layout/SidebarAdmin.vue";
import TheFooterAdmin from "@/components/admin/layout/TheFooterAdmin.vue";
import TheNavbarAdmin from "@/components/admin/layout/TheNavbarAdmin.vue";

const isSidebarCollapsed = ref(true);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

provide("toggleSidebar", toggleSidebar);
</script>

<style scoped lang="scss">
@use "@/assets/styles/layouts/admin-layout";
</style>
