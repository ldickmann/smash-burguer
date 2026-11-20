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
      <SearchBar :model-value="searchQuery" @search="handleSearch" @submit="handleSearchSubmit" />
    </div>
    <div class="navbar-admin__right">
      <NotificationBar :notifications="notifications" />
      <UserProfileBar :user-name="adminName" @menu-select="handleMenuSelect" @logout="handleLogout" />
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import { useAdminOrdersStore } from "@/stores/adminOrders";
import { useAdminLogout } from "@/composables/useAdminLogout";
import { searchQueryOf } from "@/utils/search";
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

const route = useRoute();
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

// Busca (?q=): em Produtos e em Pedidos, filtra a própria tela a cada digitação; nas outras,
// o Enter leva a Produtos (trocar de página a cada letra tiraria o foco do campo)
const SEARCHABLE = ["/admin/products", "/admin/orders"];
const searchQuery = computed(() => searchQueryOf(route.query.q));
const handleSearch = (text) => {
  if (!SEARCHABLE.includes(route.path)) return;
  router.replace({ query: { ...route.query, q: text.trim() || undefined } });
};
const handleSearchSubmit = (text) => {
  const q = text.trim();
  if (q && !SEARCHABLE.includes(route.path)) router.push({ path: "/admin/products", query: { q } });
};

// Itens do menu de perfil
const MENU_ROUTES = { profile: "/admin/profile", settings: "/admin/settings" };
const handleMenuSelect = (action) => {
  if (MENU_ROUTES[action]) router.push(MENU_ROUTES[action]);
};

const handleLogout = useAdminLogout();
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_navbar-admin";
</style>
