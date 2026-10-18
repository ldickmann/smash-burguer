<template>
  <nav class="navbar-admin" aria-label="Ferramentas do painel">
    <div class="navbar-admin__left">
      <!-- Botão para alternar a sidebar -->
      <BaseButton
        ref="toggleRef"
        class="navbar-admin__toggle"
        variant="ghost"
        icon-only
        icon-start="bars"
        label="Alternar menu"
        aria-controls="admin-sidebar"
        :aria-expanded="String(sidebarOpen)"
        @click="handleToggleSidebar"
      />
      <SearchBar @search="handleSearch" />
    </div>
    <div class="navbar-admin__right">
      <NotificationBar :notifications="notifications" @notification-click="handleNotification" />
      <UserProfileBar :user-name="adminName" @menu-select="handleMenuSelect" @logout="handleLogout" />
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import BaseButton from "@/components/ui/BaseButton.vue";
import SearchBar from "@/components/admin/layout/navbar/SearchBar.vue";
import NotificationBar from "@/components/admin/layout/navbar/NotificationBar.vue";
import UserProfileBar from "@/components/admin/layout/navbar/UserProfileBar.vue";

defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const adminStore = useAdminStore();
const toggleRef = ref(null);

// Nome do administrador logado (as iniciais saem daqui)
const adminName = computed(() => {
  const admin = adminStore.admin ?? {};
  const fullName = admin.name || [admin.firstName, admin.lastName].filter(Boolean).join(" ");
  return fullName || "Administrador";
});

// Notificações (estado centralizado)
const notifications = ref([
  { id: 1, type: "messages", label: "Mensagens", icon: ["far", "envelope"], count: 3 },
  { id: 2, type: "alerts", label: "Notificações", icon: ["fas", "bell"], count: 2 },
  { id: 3, type: "tasks", label: "Tarefas", icon: ["fas", "tasks"], count: 1 },
]);

// Injeção da função de toggle (fornecida pelo AdminLayout)
const toggleSidebar = inject("toggleSidebar", () => {
  console.warn("toggleSidebar não foi injetado");
});

const handleToggleSidebar = () => toggleSidebar(toggleRef.value);

const handleSearch = (query) => console.log("Pesquisando:", query);
const handleNotification = (type) => console.log("Notificação clicada:", type);
const handleMenuSelect = (item) => console.log("Item do menu selecionado:", item);
const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_navbar-admin";
</style>
