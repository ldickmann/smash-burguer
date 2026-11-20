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
      <NotificationBar :notifications="notifications" />
      <UserProfileBar :user-name="adminName" @menu-select="handleMenuSelect" @logout="handleLogout" />
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminOrdersStore } from "@/stores/adminOrders";
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

// Nome do administrador logado (as iniciais saem daqui). O admin vem do localStorage:
// campo que não é texto fica de fora
const text = (value) => (typeof value === "string" ? value : "");
const adminName = computed(() => {
  const admin = adminStore.admin ?? {};
  const fullName =
    text(admin.name) || [text(admin.firstName), text(admin.lastName)].filter(Boolean).join(" ");
  return fullName || "Administrador";
});

// Contadores da barra: pedidos pendentes (notificações) e em preparo (tarefas). Cada um
// leva à tela Pedidos com o filtro do status
const ordersStore = useAdminOrdersStore();

const countLabel = (count, singular, plural) => {
  if (count === 0) return `nenhum ${singular}`;
  return `${count} ${count === 1 ? singular : plural}`;
};

const notifications = computed(() => {
  const pending = ordersStore.countByStatus("pending");
  const preparing = ordersStore.countByStatus("preparing");
  return [
    {
      type: "alerts",
      label: `Notificações, ${countLabel(pending, "pedido pendente", "pedidos pendentes")}`,
      icon: ["fas", "bell"],
      count: pending,
      to: { path: "/admin/orders", query: { status: "pending" } },
    },
    {
      type: "tasks",
      label: `Tarefas, ${countLabel(preparing, "pedido em preparo", "pedidos em preparo")}`,
      icon: ["fas", "tasks"],
      count: preparing,
      to: { path: "/admin/orders", query: { status: "preparing" } },
    },
  ];
});

// Injeção da função de toggle (fornecida pelo AdminLayout)
const toggleSidebar = inject("toggleSidebar", () => {
  console.warn("toggleSidebar não foi injetado");
});

const handleToggleSidebar = () => toggleSidebar(toggleRef.value);

// Com chaves: o build só descarta console.log cujo valor não é usado (vite.config.js)
const handleSearch = (query) => {
  console.log("Pesquisando:", query);
};
const handleMenuSelect = (item) => {
  console.log("Item do menu selecionado:", item);
};
const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_navbar-admin";
</style>
