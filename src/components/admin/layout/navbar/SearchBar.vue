<template>
  <div class="navbar-search">
    <div class="search-wrapper">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      <input
        type="text"
        :placeholder="placeholder"
        v-model="searchQuery"
        @input="handleSearch"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Search...",
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
