<template>
  <nav class="navbar-admin">
    <SearchBar @search="handleSearch" />

    <section class="section-divider">
      <NotificationBar
        :notifications="notifications"
        @notification-click="handleNotification"
      />

      <SeparatorLines
        orientation="vertical"
        color="#ffffff"
        :thickness="1"
        style="height: 24px"
      />

      <UserProfileBar
        :user-name="adminName"
        :avatar="adminAvatar"
        @menu-select="handleMenuSelect"
        @logout="handleLogout"
      />
    </section>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import SearchBar from "@/components/admin/layout/navbar/SearchBar.vue";
import NotificationBar from "@/components//admin/layout/navbar/NotificationBar.vue";
import UserProfileBar from "@/components/admin/layout/navbar/UserProfileBar.vue";
import SeparatorLines from "@/components/SeparatorLines.vue";

const router = useRouter();
const adminStore = useAdminStore();

// Computed properties para dados do admin
const adminName = computed(() => adminStore.admin?.name || "Administrador");
const adminAvatar = computed(() => adminStore.admin?.avatar || "");

// Estado centralizado
const notifications = ref([
  {
    id: 1,
    type: "messages",
    icon: ["far", "envelope"],
    count: 3,
  },
  {
    id: 2,
    type: "alerts",
    icon: ["fas", "bell"],
    count: 2,
  },
  {
    id: 3,
    type: "tasks",
    icon: ["fas", "tasks"],
    count: 1,
  },
]);

// Handlers
const handleSearch = (query) => {
  console.log("Pesquisando:", query);
};

const handleNotification = (type) => {
  console.log("Notificação clicada:", type);
};

const handleMenuSelect = (item) => {
  console.log("Item do menu selecionado:", item);
};

const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};

defineEmits(["search", "notification-click", "menu-select"]);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/navbar-admin";
</style>
