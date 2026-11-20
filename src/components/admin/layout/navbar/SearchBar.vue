<template>
  <div class="navbar-search" role="search">
    <label for="busca-admin" class="visually-hidden">Buscar produtos e pedidos</label>
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
import { ref, watch } from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Buscar…",
  },
  // Texto da busca no endereço (?q=): o campo acompanha quando ele muda por fora,
  // como no "Limpar busca"
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["search"]);
const searchQuery = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    if (value !== searchQuery.value.trim()) searchQuery.value = value;
  }
);

// A cada digitação, inclusive quando o campo fica vazio (a busca sai)
const handleSearch = () => {
  emit("search", searchQuery.value);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/navbar/search-bar";
</style>
