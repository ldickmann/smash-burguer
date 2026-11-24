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

    <!-- Busca da barra do painel (?q=): a região existe antes da mensagem (vazia sem busca), para o
         leitor de tela anunciar o resultado; o "Limpar busca" fica fora dela -->
    <div class="admin-page__busca">
      <p class="admin-page__search-result" role="status" aria-atomic="true">{{ query ? searchSummary : "" }}</p>
      <BaseButton v-if="query" variant="ghost" size="sm" @click="clearSearch">Limpar busca</BaseButton>
    </div>

    <EmptyState
      v-if="query && !filteredProducts.length"
      icon="magnifying-glass"
      title="Nenhum produto encontrado"
      text="Confira o texto da busca ou escolha outra categoria."
    />

    <!-- Categoria esvaziada pelo painel, sem busca: o aviso de vazio do Cardápio -->
    <EmptyState v-else-if="!filteredProducts.length" icon="utensils" :title="TEXTOS.vazio" />

    <ul v-else class="products-list" role="list">
      <li v-for="product in filteredProducts" :key="`${product.category}-${product.id}`">
        <M3CartaoProduto :produto="product" :nivel-titulo="2">
          <template #acoes>
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
        </M3CartaoProduto>
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
      <p class="product-delete__text">
        “{{ productToDelete?.name }}” sai do cardápio salvo neste navegador. Para trazê-lo de
        volta, use Configurações › Restaurar cardápio original.
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
import { useRoute, useRouter } from "vue-router";
import { CATEGORIES, useProductsStore } from "@/stores/products.js";
import { useToastStore } from "@/stores/toast";
import { matchesSearch, searchQueryOf } from "@/utils/search";
import { TEXTOS } from "@/utils/textosLoja";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseDialog from "@/components/ui/BaseDialog.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import FormGroup from "@/components/FormGroup.vue";
import M3CartaoProduto from "@/components/admin/M3CartaoProduto.vue";
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
const route = useRoute();
const router = useRouter();

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

// Busca pelo nome e pela descrição. Em "Destaques", ela olha o cardápio inteiro
const query = computed(() => searchQueryOf(route.query.q));

const filteredProducts = computed(() => {
  if (query.value) {
    const base = selectedCategory.value
      ? productsStore[selectedCategory.value] ?? []
      : CATEGORIES.flatMap((category) => productsStore[category]);
    return base.filter((product) => matchesSearch(query.value, product.name, product.description));
  }
  if (!selectedCategory.value) {
    return highlightIds
      .map((id) => productsStore.foods.find((product) => product.id === id))
      .filter(Boolean);
  }
  return productsStore[selectedCategory.value] ?? [];
});

const searchSummary = computed(() => {
  const count = filteredProducts.value.length;
  const found = count === 1 ? "1 produto" : `${count} produtos`;
  return `${found} para “${query.value}”.`;
});

const clearSearch = () => {
  router.replace({ query: { ...route.query, q: undefined } });
};

// Abre o modal de adicionar produto
const openAddModal = () => {
  showAddModal.value = true;
};

// Abre o modal de editar produto
const openEditModal = (product) => {
  selectedProduct.value = { ...product };
  showEditModal.value = true;
};

// Se o botão que abriu o modal saiu da tela (o produto mudou de categoria com a lista
// filtrada), o foco ficaria no <body> ou num <dialog> já fechado: vai para o título da página
const focusTitleIfLost = async () => {
  await nextTick();
  const active = document.activeElement;
  if (!active || active === document.body || active.closest("dialog:not([open])")) {
    titleRef.value?.focus();
  }
};

// O produto é procurado na categoria de origem: o formulário pode ter trocado a categoria.
// O espaço da imagem já foi conferido no modal
const onEditSubmit = (changes) => {
  const { category, id } = selectedProduct.value;
  const updated = productsStore.updateProduct(category, id, changes);
  showEditModal.value = false;
  if (updated) toast.show({ message: "Produto atualizado." });
  focusTitleIfLost();
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
