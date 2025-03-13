<template>
  <section class="product-management">
    <div class="management-container">
      <div class="page-header">
        <h2>Gestão de Produtos</h2>
        <ButtonComponent
          :buttons="[{ label: 'Novo Produto', id: 'add' }]"
          backgroundColor="#42b983"
          @click="showAddModal = true"
        />
      </div>
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

    <!-- Modal para adicionar novo produto -->
    <ModalAddProducts
      v-if="showAddModal"
      @close="showAddModal = false"
      @product-added="onProductAdded"
    />
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductsStore } from "@/stores/products.js";
import { useButtonHandlers } from "@/utils/buttonHandlers.js";
import AdminCard from "@/components/admin/AdminCard.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ModalAddProducts from "@/components/admin/ModalAddProducts.vue";

const { handleEditProduct, handleDeleteProduct } = useButtonHandlers();

const productsStore = useProductsStore();
const products = ref([]);
const loading = ref(true);
const showAddModal = ref(false);

const fetchProducts = async () => {
  try {
    loading.value = true;
    // Adicionar a chamada para a API aqui
    // Utiliza o JSON simulado de produtos definido no store
    products.value = productsStore.foods;
  } catch (error) {
    console.error("Error ao buscar produtos:", error);
  } finally {
    loading.value = false;
  }
};

// Métodos para editar o produto
const editProduct = (product) => {
  handleEditProduct(product);
};

// Método para deletar o produto
const deleteProduct = (productId) => {
  handleDeleteProduct(productId);
};

// Define a função para lidar com o evento emitido pelo ModalAddProducts
const onProductAdded = () => {
  showAddModal.value = false;
  fetchProducts(); // Atualiza a lista de produtos
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/product-management';
</style>
