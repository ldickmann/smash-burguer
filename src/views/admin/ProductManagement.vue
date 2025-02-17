<template>
  <section class="product-management">
    <div class="management-container">
      <header class="page-header">
        <h2>Gestão de Produtos</h2>
        <ButtonComponent
          :buttons="[{ label: 'Novo Produto', id: 'add' }]"
          backgroundColor="#42b983"
          @click="showAddModal = true"
        />
      </header>
    </div>

    <div class="products-list">
      <AdminCard
        v-for="product in products"
        :key="product.id"
        :title="product.name"
        :loading="loading"
      >
        <template #header-actions>
          <div class="product-actions">
            <ButtonComponent
              :buttons="[{ label: 'Editar', id: 'edit' }]"
              @click="editProduct(product)"
            />
            <ButtonComponent
              :buttons="[{ label: 'Excluir', id: 'delete' }]"
              @click="deleteProduct(product.id)"
            />
          </div>
        </template>

        <div class="product-details">
          <img :src="product.image" :alt="product.name" />
          <p>{{ product.description }}</p>
          <p class="price">R$ {{ product.price.toFixed(2) }}</p>
        </div>
      </AdminCard>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminCard from "@/components/admin/AdminCard.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const products = ref([]);
const loading = ref(true);
const showAddModal = ref(false);

const fetchProducts = async () => {
  try {
    loading.value = true;
    // Adicionar a chamada para a API aqui
    // Produtos simulados
    products.value = [
      {
        id: 1,
        name: "Smash Burger Classic",
        description: "Hambúrguer smash com queijo cheddar",
        price: 25.9,
        image: "https://example.com/burger-image.jpg",
      },
      // Add mais produtos aqui
    ];
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

const editProduct = (product) => {
  console.log("Editing product:", product);
};

const deleteProduct = (productId) => {
  console.log("Produto excluído:", productId);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/product-management';
</style>
