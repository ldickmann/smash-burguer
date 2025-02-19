<template>
  <div class="demo-container">
    <AdminCard title="Card de Demonstração" :loading="isLoading">
      <template #header-actions>
        <button @click="toggleLoading" class="demo-button">
          {{ isLoading ? "Parar Loading" : "Iniciar Loading" }}
        </button>
      </template>

      <div class="demo-content">
        <p>Conteúdo do card para demonstração do loading</p>
        <p>Clique no botão acima para ver o efeito do loading</p>
      </div>

      <template #footer>
        <span>Footer do card</span>
      </template>
    </AdminCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AdminCard from "@/components/admin/AdminCard.vue";

const isLoading = ref(false);

const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};
</script>

<style scoped lang="scss">
.demo-container {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.demo-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}

.demo-content {
  padding: 1rem;
  text-align: center;
}
</style>
