<template>
  <nav class="navbar-admin">
    <div class="nav-left">
      <!-- Botão para togglar a sidebar -->
      <ButtonComponent
        :buttons="[toggleButton]"
        backgroundColor="transparent"
        fontColor="#ffffff"
        fontSize="1.2rem"
        buttonSize="0.5rem"
        borderRadius="4px"
        @click="handleToggleSidebar"
      >
        <template #toggle-sidebar>
          <div :class="{ active: isToggleActive }">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </div>
        </template>
      </ButtonComponent>
      <SearchBar @search="handleSearch" />
    </div>
    <section class="section-divider">
      <NotificationBar
        :notifications="notifications"
        @notification-click="handleNotification"
      />
      <SeparatorLines
        v-show="showSeparator"
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
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import SearchBar from "@/components/admin/layout/navbar/SearchBar.vue";
import NotificationBar from "@/components/admin/layout/navbar/NotificationBar.vue";
import UserProfileBar from "@/components/admin/layout/navbar/UserProfileBar.vue";
import SeparatorLines from "@/components/SeparatorLines.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const router = useRouter();
const adminStore = useAdminStore();

// Dados do administrador
const adminName = computed(() => adminStore.admin?.name || "Administrador");
const adminAvatar = computed(() => adminStore.admin?.avatar || "");

// Notificações (estado centralizado)
const notifications = ref([
  { id: 1, type: "messages", icon: ["far", "envelope"], count: 3 },
  { id: 2, type: "alerts", icon: ["fas", "bell"], count: 2 },
  { id: 3, type: "tasks", icon: ["fas", "tasks"], count: 1 },
]);

// Configuração do toggle button
const toggleButton = { id: "toggle-sidebar", label: "" };
const isToggleActive = ref(false);

// Injeção da função de toggle (fornecida pelo componente pai, ex: AdminLayout)
const toggleSidebar = inject("toggleSidebar", () => {
  console.warn("toggleSidebar não foi injetado");
});

const handleToggleSidebar = () => {
  isToggleActive.value = !isToggleActive.value;
  if (typeof toggleSidebar === "function") {
    toggleSidebar();
  }
};

// Defina a função para lidar com cliques fora da sidebar
const handleClickOutside = (event) => {
  if (isToggleActive.value && !event.target.closest(".sidebar-admin")) {
    isToggleActive.value = false;
  }
};

const handleSearch = (query) => console.log("Pesquisando:", query);
const handleNotification = (type) => console.log("Notificação clicada:", type);
const handleMenuSelect = (item) => console.log("Item do menu selecionado:", item);
const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};

// Exibe separador para telas maiores que 480px.
const showSeparator = computed(() => {
  return typeof window !== "undefined" ? window.innerWidth > 480 : true;
});

const updateSeparator = () => {
  showSeparator.value = window.innerWidth > 480;
};

onMounted(() => {
  window.addEventListener("resize", updateSeparator);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateSeparator);
});

defineEmits(["search", "notification-click", "menu-select"]);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/_navbar-admin";
</style>
