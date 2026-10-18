<template>
  <div class="navbar-search" role="search">
    <label for="busca-admin" class="visually-hidden">Buscar</label>
    <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="navbar-search__icon" aria-hidden="true" />
    <input
      id="busca-admin"
      v-model="searchQuery"
      class="navbar-search__input"
      type="search"
      :placeholder="placeholder"
      @input="handleSearch"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  placeholder: {
    type: String,
    default: "Buscar…",
  },
});

const emit = defineEmits(["search"]);
const searchQuery = ref("");

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit("search", searchQuery.value);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/navbar/search-bar";
</style>
