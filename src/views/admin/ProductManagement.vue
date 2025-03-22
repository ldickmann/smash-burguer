<template>
  <section class="product-management">
    <div class="management-container">
      <div class="page-header">
        <h2>Gestão de Produtos</h2>
        <ButtonComponent
          :buttons="[{ label: 'Novo Produto', id: 'add' }]"
          backgroundColor="#42b983"
          @click="openAddModal"
        />
      </div>
    </div>

    <!-- Seletor para escolher a categoria -->
    <div class="category-selection">
      <label for="categorySelect">Selecione uma categoria:</label>
      <select id="categorySelect" v-model="selectedCategory">
        <option value="">Exibir alguns produtos</option>
        <option value="foods">Foods</option>
        <option value="drinks">Drinks</option>
        <option value="desserts">Desserts</option>
      </select>
    </div>

    <div class="products-list">
      <AdminCard
        v-for="product in filteredProducts"
        :key="product.id"
        :title="product.name"
        :loading="loading"
      >
        <template #header-actions>
          <div class="product-actions">
            <ButtonComponent
              :buttons="[{ label: 'Editar', id: 'edit' }]"
              @click="openEditModal(product)"
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

    <!-- Modal para editar produto -->
    <ModalProducts
      v-if="showEditModal"
      mode="edit"
      :product="selectedProduct"
      @close="showEditModal = false"
      @submit="onEditSubmit"
      @cancel="showEditModal = false"
    />

    <!-- Modal para adicionar novo produto -->
    <ModalProducts
      v-if="showAddModal"
      mode="add"
      @close="showAddModal = false"
      @submit="onAddSubmit"
      @cancel="showAddModal = false"
    />
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductsStore } from "@/stores/products.js";
import { useButtonHandlers } from "@/utils/buttonHandlers.js";
import AdminCard from "@/components/admin/AdminCard.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ModalProducts from "@/components/admin/ModalProducts.vue";

const { handleDeleteProduct } = useButtonHandlers();
const productsStore = useProductsStore();

// const products = ref([]);
const loading = ref(true);
const showAddModal = ref(false);
const showEditModal = ref(false);
const selectedProduct = ref({});
const selectedCategory = ref("");

// Função para retornar N produtos aleatórios a partir de um array
const getRandomProducts = (arr, count) => {
  if (!arr || arr.length === 0) return [];
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Busca os produtos do JSON e os mantém no store (menuItems)
const fetchProducts = async () => {
  try {
    loading.value = true;
    // Neste exemplo, os produtos são obtidos do JSON simulado no store
    // Não é necessário popular uma lista única porque usaremos o menuItems
  } catch (error) {
    console.error("Error ao buscar produtos:", error);
  } finally {
    loading.value = false;
  }
};

// Computa a lista de produtos a serem renderizados
const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    // Exibe 4 produtos aleatórios da categoria "foods", quando abre a página
    return getRandomProducts(productsStore.foods, 4);
  }
  if (selectedCategory.value === "foods") {
    return productsStore.foods;
  }
  if (selectedCategory.value === "drinks") {
    return productsStore.drinks;
  }
  if (selectedCategory.value === "desserts") {
    return productsStore.desserts;
  }
  return [];
});

// Abre o modal de adicionar produto
const openAddModal = () => {
  selectedProduct.value = {
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
    category: "foods",
  };
  showAddModal.value = true;
};

// Abre o modal de editar produto
const openEditModal = (product) => {
  selectedProduct.value = { ...product };
  showEditModal.value = true;
};

// Realiza a edição do produto
const onEditSubmit = (updatedProduct) => {
  const category = updatedProduct.category;
  const index = productsStore.menuItems[category]?.findIndex(
    (p) => p.id === updatedProduct.id
  );
  if (index !== -1) {
    productsStore.menuItems[category].splice(index, 1, updatedProduct);
  }
  showEditModal.value = false;
  fetchProducts();
};

// Adiciona o novo produto via store
const onAddSubmit = (newProduct) => {
  productsStore.addProduct(newProduct);
  showAddModal.value = false;
  fetchProducts();
};

// Deleta o produto via store
const deleteProduct = (productId) => {
  handleDeleteProduct(productId);
  fetchProducts();
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/product-management';
</style>
