<template>
  <section class="product-management">
    <div class="admin-page__header">
      <h1 class="admin-page__title">Produtos</h1>
      <BaseButton icon-start="plus" @click="openAddModal">Novo produto</BaseButton>
    </div>

    <!-- Seletor para escolher a categoria -->
    <FormGroup
      id="categorySelect"
      v-model="selectedCategory"
      class="admin-page__filter"
      label="Categoria"
      type="select"
      :options="CATEGORY_FILTERS"
    />

    <ul class="products-list" role="list">
      <li v-for="product in filteredProducts" :key="`${product.category}-${product.id}`">
        <ProductCard :product="product" variant="admin" :heading-level="2">
          <template #actions>
            <BaseButton variant="secondary" size="sm" @click="openEditModal(product)">
              Editar
            </BaseButton>
            <BaseButton
              variant="danger"
              size="sm"
              icon-start="trash-can"
              @click="deleteProduct(product.id)"
            >
              Excluir
            </BaseButton>
          </template>
        </ProductCard>
      </li>
    </ul>

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
import { ref, computed } from "vue";
import { useProductsStore } from "@/stores/products.js";
import BaseButton from "@/components/ui/BaseButton.vue";
import FormGroup from "@/components/FormGroup.vue";
import ProductCard from "@/components/ProductCard.vue";
import ModalProducts from "@/components/admin/ModalProducts.vue";

const CATEGORY_FILTERS = [
  { value: "", label: "Destaques" },
  { value: "foods", label: "Hambúrgueres" },
  { value: "drinks", label: "Bebidas" },
  { value: "desserts", label: "Sobremesas" },
];

const productsStore = useProductsStore();

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

// Computa a lista de produtos a serem renderizados
const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    // Destaques: 4 produtos aleatórios da categoria "foods", quando abre a página
    return getRandomProducts(productsStore.foods, 4);
  }
  return productsStore[selectedCategory.value] ?? [];
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
};

// Adiciona o novo produto via store
const onAddSubmit = (newProduct) => {
  productsStore.addProduct(newProduct);
  showAddModal.value = false;
};

// Excluir continua sem efeito real (FLX-09, fora do escopo)
const deleteProduct = (productId) => {
  console.log("Produto excluído", productId);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/product-management';
</style>
