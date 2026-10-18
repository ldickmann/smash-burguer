<template>
  <div ref="profileRef" class="navbar-profile">
    <button
      ref="triggerRef"
      type="button"
      class="navbar-profile__avatar"
      aria-haspopup="menu"
      aria-controls="menu-perfil-admin"
      :aria-expanded="String(showMenu)"
      :aria-label="`Menu de ${userName}`"
      @click="toggleMenu"
    >
      <span aria-hidden="true">{{ userInitials }}</span>
    </button>

    <div v-show="showMenu" class="navbar-profile__menu">
      <p class="navbar-profile__name">{{ userName }}</p>
      <div
        id="menu-perfil-admin"
        ref="menuRef"
        class="navbar-profile__items"
        role="menu"
        :aria-label="userName"
        @keydown="handleMenuKeydown"
      >
        <button
          v-for="item in menuItems"
          :key="item.id"
          type="button"
          class="navbar-profile__item"
          role="menuitem"
          tabindex="-1"
          @click="handleMenuSelect(item)"
        >
          <font-awesome-icon :icon="item.icon" aria-hidden="true" />
          <span>{{ item.label }}</span>
        </button>
        <button
          type="button"
          class="navbar-profile__item"
          role="menuitem"
          tabindex="-1"
          @click="handleLogout"
        >
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" aria-hidden="true" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from "vue";

const showMenu = ref(false);
const profileRef = ref(null);
const triggerRef = ref(null);
const menuRef = ref(null);

const props = defineProps({
  userName: {
    type: String,
    default: "Administrador",
  },
});

const emit = defineEmits(["menu-select", "logout"]);

// Menu items
const menuItems = [
  {
    id: 1,
    label: "Meu perfil",
    icon: ["fas", "user"],
    action: "profile",
  },
  {
    id: 2,
    label: "Configurações",
    icon: ["fas", "cog"],
    action: "settings",
  },
];

// Iniciais do admin logado (sem avatar fixo de terceiros)
const userInitials = computed(() => {
  if (!props.userName) return "A";
  return props.userName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const menuItemsEls = () => [...(menuRef.value?.querySelectorAll('[role="menuitem"]') ?? [])];

const openMenu = async () => {
  showMenu.value = true;
  await nextTick();
  menuItemsEls()[0]?.focus();
};

const closeMenu = ({ returnFocus = false } = {}) => {
  showMenu.value = false;
  if (returnFocus) triggerRef.value?.focus();
};

const toggleMenu = () => (showMenu.value ? closeMenu() : openMenu());

// Setas movem entre os itens; Esc fecha e devolve o foco
const handleMenuKeydown = (event) => {
  const items = menuItemsEls();
  const index = items.indexOf(document.activeElement);
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu({ returnFocus: true });
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    items[(index + 1) % items.length]?.focus();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    items[(index - 1 + items.length) % items.length]?.focus();
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    items[event.key === "Home" ? 0 : items.length - 1]?.focus();
  } else if (event.key === "Tab") {
    closeMenu();
  }
};

const handleMenuSelect = (item) => {
  emit("menu-select", item.action);
  closeMenu({ returnFocus: true });
};

const handleLogout = () => {
  emit("logout");
  closeMenu();
};

// Clique fora fecha
const handleClickOutside = (event) => {
  if (showMenu.value && !profileRef.value?.contains(event.target)) closeMenu();
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener("pointerdown", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", handleClickOutside);
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/navbar/user-profile-bar";
</style>
