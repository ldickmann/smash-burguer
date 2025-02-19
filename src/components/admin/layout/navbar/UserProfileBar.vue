<template>
  <div class="navbar-profile">
    <div class="profile-avatar" @click="toggleMenu">
      <img v-if="avatar" :src="avatar" :alt="userName" @error="handleImageError" />
      <span v-else>{{ userInitials }}</span>
    </div>

    <div v-if="showMenu" class="profile-dropdown">
      <div class="dropdown-section">
        <h3>{{ userName }}</h3>
      </div>

      <div class="dropdown-section">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="dropdown-item"
          @click="handleMenuSelect(item)"
        >
          <font-awesome-icon :icon="item.icon" />
          <span>{{ item.label }}</span>
        </div>
      </div>

      <div class="dropdown-item logout" @click="handleLogout">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        <span>Sair</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const avatar = ref("https://github.com/ldickmann.png");

const props = defineProps({
  userName: {
    type: String,
    default: "Lucas Dickmann",
  },
  avatar: {
    type: String,
  },
});

const emit = defineEmits(["menu-select", "logout"]);

// Controla o estado do menu
const showMenu = ref(false);

// Menu items
const menuItems = [
  {
    id: 1,
    label: "Meu Perfil",
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

// Computed para as iniciais do usuário
const userInitials = computed(() => {
  if (!props.userName) return "A";
  return props.userName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

// Métodos
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const handleImageError = (event) => {
  event.target.remove();
};

const handleMenuSelect = (item) => {
  emit("menu-select", item.action);
  showMenu.value = false;
};

const handleLogout = () => {
  emit("logout");
  showMenu.value = false;
};

const handleClickOutside = (event) => {
  if (!profile && showMenu.value) {
    showMenu.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/navbar/user-profile-bar";
</style>
