<template>
  <!-- Abaixo de lg, o contêiner é o diálogo modal da gaveta (o resto da página fica inert no
       AdminLayout); a partir de lg, um div sem papel, e o landmark é a nav -->
  <div id="admin-sidebar" class="admin-sidebar" :class="{ 'is-drawer': closable }" v-bind="atributosDialogo">
    <!-- A nav envolve a coluna inteira: sem o aside, a marca e o "Sair" ficariam fora de um landmark -->
    <nav ref="navRef" class="admin-sidebar__nav" aria-label="Seções do painel">
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

      <div class="admin-sidebar__lista">
        <!-- Correspondência exata: o RouterLink só marca aria-current na rota exata -->
        <RouterLink v-for="item in menuItems" :key="item.path" :to="item.path" class="admin-sidebar__item">
          <font-awesome-icon :icon="item.icon" class="admin-sidebar__icon" aria-hidden="true" />
          <span>{{ item.title }}</span>
        </RouterLink>
      </div>

      <div class="admin-sidebar__footer">
        <button type="button" class="admin-sidebar__item admin-sidebar__logout" aria-label="Sair" @click="handleLogout">
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" class="admin-sidebar__icon" aria-hidden="true" />
          <span>Sair</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAdminLogout } from "@/composables/useAdminLogout";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  // Abaixo de lg a sidebar é uma gaveta com botão de fechar
  closable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["close"]);

const navRef = ref(null);

// Papel, estado e nome do diálogo só na gaveta: um div sem papel não leva nome
const atributosDialogo = computed(() =>
  props.closable ? { role: "dialog", "aria-modal": "true", "aria-label": "Menu do painel" } : {}
);

// Os rótulos são os do h1 de cada tela (decisão do usuário, desenho do admin §12)
const menuItems = [
  {
    path: "/admin",
    icon: ["fas", "tachometer-alt"],
    title: "Painel",
  },
  {
    path: "/admin/products",
    icon: ["fas", "utensils"],
    title: "Produtos",
  },
  {
    path: "/admin/orders",
    icon: ["fas", "shopping-cart"],
    title: "Pedidos",
  },
  {
    path: "/admin/reports",
    icon: ["fas", "chart-line"],
    title: "Relatórios",
  },
];

const handleLogout = useAdminLogout();

defineExpose({
  // A marca é p e o "Fechar" é button: o primeiro link é "Painel"
  focusFirst: () => navRef.value?.querySelector("a")?.focus(),
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/sidebar-admin";
</style>
