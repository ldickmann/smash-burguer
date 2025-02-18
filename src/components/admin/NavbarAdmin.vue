<template>
  <nav class="navbar-admin">
    <!-- Search -->
    <div class="navbar-search">
      <div class="search-wrapper">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          @input="handleSearch"
        />
      </div>
    </div>

    <section class="section-divider">
      <!-- Notification Icons -->
      <div class="navbar-notifications">
        <div class="notification-item" @click="toggleMessages">
          <font-awesome-icon :icon="['far', 'envelope']" />
          <span v-if="messageCount" class="notification-dot"></span>
        </div>
        <div class="notification-item" @click="toggleAlerts">
          <font-awesome-icon :icon="['fas', 'bell']" />
          <span v-if="alertCount" class="notification-dot"></span>
        </div>
        <div class="notification-item" @click="toggleTasks">
          <font-awesome-icon :icon="['fas', 'tasks']" />
          <span v-if="taskCount" class="notification-dot"></span>
        </div>
      </div>

      <SeparatorLines orientation="vertical" color="#ffffff" :thickness="1" />

      <!-- User Profile -->
      <div class="navbar-profile" @click="toggleUserMenu">
        <div class="profile-avatar">
          <img v-if="userAvatar" :src="userAvatar" :alt="userName" />
          <span v-else>{{ userInitials }}</span>
        </div>

        <!-- Dropdown Menu -->
        <div v-show="showUserMenu" class="profile-dropdown">
          <div class="dropdown-section">
            <h3>Account</h3>
            <div class="dropdown-item">
              <i class="fas fa-envelope"></i>
              <span>Messages</span>
            </div>
            <div class="dropdown-item">
              <i class="fas fa-bell"></i>
              <span>Updates</span>
            </div>
          </div>

          <div class="dropdown-section">
            <h3>Settings</h3>
            <div class="dropdown-item">
              <i class="fas fa-user"></i>
              <span>Profile</span>
            </div>
            <div class="dropdown-item">
              <i class="fas fa-cog"></i>
              <span>Settings</span>
            </div>
          </div>

          <div class="dropdown-item logout" @click="handleLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </div>
        </div>
      </div>
    </section>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import SeparatorLines from "../SeparatorLines.vue";

const searchQuery = ref("");
const showUserMenu = ref(false);
const userAvatar = ref("https://github.com/ldickmann.png");
const userName = ref("Lucas Dickmann");

// Notification counters
const messageCount = ref(3);
const alertCount = ref(2);
const taskCount = ref(1);

/**
 * Calcula as iniciais do nome do usuário.
 *
 * Esta propriedade computada pega o nome completo do usuário da variável reativa `userName`,
 * divide-o em palavras individuais, extrai a primeira letra de cada palavra, junta essas letras
 * e converte o resultado para maiúsculas.
 *
 * @returns {string} As iniciais do nome do usuário em maiúsculas.
 */
const userInitials = computed(() => {
  return userName.value
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
});

const handleSearch = () => {
  console.log("Searching:", searchQuery.value);
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const toggleMessages = () => {
  console.log("Toggle messages");
};

const toggleAlerts = () => {
  console.log("Toggle alerts");
};

const toggleTasks = () => {
  console.log("Toggle tasks");
};

const handleLogout = () => {
  console.log("Logout");
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/navbar-admin";
</style>
