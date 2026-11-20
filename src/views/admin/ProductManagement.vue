<template>
  <section class="product-management">
    <div class="admin-page__header">
      <h1 ref="titleRef" class="admin-page__title" tabindex="-1">Produtos</h1>
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
              @click="productToDelete = product"
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

    <BaseDialog
      :open="Boolean(productToDelete)"
      title="Excluir produto?"
      title-id="excluir-produto-titulo"
      max-width="480px"
      @close="productToDelete = null"
    >
      <p>
        “{{ productToDelete?.name }}” sai do cardápio. Os produtos ainda não são salvos: ao
        recarregar a página, o cardápio volta ao original.
      </p>
      <template #footer>
        <div class="product-delete__actions">
          <BaseButton variant="secondary" @click="productToDelete = null">Cancelar</BaseButton>
          <BaseButton variant="danger" icon-start="trash-can" @click="confirmDelete">
            Excluir produto
          </BaseButton>
        </div>
      </template>
    </BaseDialog>
  </section>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useProductsStore } from "@/stores/products.js";
import { useToastStore } from "@/stores/toast";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import FormGroup from "@/components/FormGroup.vue";
import ProductCard from "@/components/ProductCard.vue";
import ModalProducts from "@/components/admin/ModalProducts.vue";

const CATEGORY_FILTERS = [
  { value: "", label: "Destaques" },
  { value: "foods", label: "Hambúrgueres" },
  { value: "drinks", label: "Bebidas" },
  { value: "desserts", label: "Sobremesas" },
];

const HIGHLIGHTS = 4;

const productsStore = useProductsStore();
const toast = useToastStore();

const showAddModal = ref(false);
const showEditModal = ref(false);
const selectedProduct = ref({});
const selectedCategory = ref("");
const productToDelete = ref(null);
const titleRef = ref(null);

// Destaques: 4 hambúrgueres sorteados uma vez, quando a página abre. A lista guarda só os
// ids, então trocar o filtro ou editar um produto não sorteia de novo
const highlightIds = [...productsStore.foods]
  .sort(() => 0.5 - Math.random())
  .slice(0, HIGHLIGHTS)
  .map((product) => product.id);

const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return highlightIds
      .map((id) => productsStore.foods.find((product) => product.id === id))
      .filter(Boolean);
  }
  return productsStore[selectedCategory.value] ?? [];
});

// Abre o modal de adicionar produto
const openAddModal = () => {
  showAddModal.value = true;
};

// Abre o modal de editar produto
const openEditModal = (product) => {
  selectedProduct.value = { ...product };
  showEditModal.value = true;
};

// O produto é procurado na categoria de origem: o formulário pode ter trocado a categoria
const onEditSubmit = (changes) => {
  const { category, id } = selectedProduct.value;
  const updated = productsStore.updateProduct(category, id, changes);
  showEditModal.value = false;
  if (updated) toast.show({ message: "Produto atualizado." });
};

// Depois de criar, o filtro mostra a categoria do produto novo
const onAddSubmit = (newProduct) => {
  const created = productsStore.addProduct(newProduct);
  showAddModal.value = false;
  if (!created) return;
  selectedCategory.value = created.category;
  toast.show({ message: "Produto criado." });
};

// O botão "Excluir" sai da tela com o produto: o foco vai para o título da página
const confirmDelete = async () => {
  const { category, id } = productToDelete.value;
  const removed = productsStore.removeProduct(category, id);
  productToDelete.value = null;
  if (!removed) return;
  toast.show({ message: "Produto excluído." });
  await nextTick();
  titleRef.value?.focus();
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/pages/admin/product-management';
</style>
