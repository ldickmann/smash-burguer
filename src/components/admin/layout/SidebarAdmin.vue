<template>
  <aside id="admin-sidebar" class="admin-sidebar" :class="{ 'is-drawer': closable }" aria-label="Menu do painel">
    <div class="admin-sidebar__head">
      <p class="admin-sidebar__brand">Smash Burger</p>
      <BaseButton
        v-if="closable"
        variant="ghost"
        icon-only
        icon-start="xmark"
        label="Fechar"
        @click="$emit('close')"
      />
    </div>

    <nav ref="navRef" class="admin-sidebar__nav" aria-label="Seções do painel">
      <!-- Correspondência exata: o RouterLink só marca aria-current na rota exata -->
      <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" class="admin-sidebar__item">
        <font-awesome-icon :icon="item.icon" class="admin-sidebar__icon" aria-hidden="true" />
        <span>{{ item.title }}</span>
      </RouterLink>
    </nav>

    <div class="admin-sidebar__footer">
      <button type="button" class="admin-sidebar__item admin-sidebar__logout" aria-label="Sair" @click="handleLogout">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="admin-sidebar__icon" aria-hidden="true" />
        <span>Sair</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps({
  // Abaixo de lg a sidebar é uma gaveta com botão de fechar
  closable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);

const navRef = ref(null);

const menuItems = [
  {
    path: "/admin",
    icon: ["fas", "tachometer-alt"],
    title: "Painel",
  },
  {
    path: "/admin/products",
    icon: ["fas", "utensils"],
    title: "Gestão de Produtos",
  },
  {
    path: "/admin/orders",
    icon: ["fas", "shopping-cart"],
    title: "Gestão de Pedidos",
  },
  {
    path: "/admin/reports",
    icon: ["fas", "chart-line"],
    title: "Relatórios de Vendas",
  },
];

// Composables
const router = useRouter();
const adminStore = useAdminStore();

const handleLogout = () => {
  adminStore.logout();
  router.push("/admin/login");
};

defineExpose({
  focusFirst: () => navRef.value?.querySelector("a")?.focus(),
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/admin/sidebar-admin';
</style>
