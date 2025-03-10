<template>
  <section class="admin-layout" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
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
    </div>
  </section>
</template>

<script setup>
import { ref, provide } from "vue";

import SidebarAdmin from "@/components/admin/layout/SidebarAdmin.vue";
import TheNavbarAdmin from "@/components/admin/layout/TheNavbarAdmin.vue";

const isSidebarCollapsed = ref(false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

provide("toggleSidebar", toggleSidebar);
</script>

<style scoped lang="scss">
@use "@/assets/styles/layouts/admin-layout";
</style>
