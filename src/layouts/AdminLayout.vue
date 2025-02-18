<template>
  <div class="admin-layout">
    <SidebarAdmin />
    <main class="admin-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import SidebarAdmin from "@/components/admin/SidebarAdmin.vue";
</script>

<style scoped lang="scss">
@use "@/assets/styles/layouts/admin-layout";
</style>
