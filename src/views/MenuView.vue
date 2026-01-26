<template>
  <BannerComponent
    title="Cardápio"
    paragraph="Cardápio com os melhores Hambúrgueres"
    :image="getImagePath('images/fundos/banner-burger-black.jpg')"
    alt="Background de hambúrgueres e batatas fritas"
    :overlay="true"
  />

  <div class="menu-page">
    <ButtonsComponents
      class="buttons-component"
      :buttons="[
        { label: 'Hambúrgueres', category: 'foods' },
        { label: 'Bebidas', category: 'drinks' },
        { label: 'Sobremesas', category: 'desserts' },
      ]"
      backgroundColor="#3aa876"
      fontColor="#fff"
      fontSize="18px"
      buttonSize="14px 28px"
      borderRadius="8px"
      :gap="20"
      @category-selected="filterByCategory"
    />

    <div class="menu">
      <BurguerCard
        v-for="burger in filteredBurgers"
        :key="burger.id"
        :burger="burger"
        @add-to-cart="addToCart"
      />
    </div>

    <!-- Paginação -->
    <PaginationComponent
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :maxVisibleButtons="5"
      @update:page="changePage"
    />

    <ButtonsComponents
      :buttons="[{ label: 'Ver Carrinho', id: 'cart-button' }]"
      backgroundColor="#3498db"
      fontSize="18px"
      buttonSize="16px 32px"
      borderRadius="8px"
      :gap="16"
      @click="handleButtonClick"
    />
  </div>
  <AlertComponent v-if="showAlert" :message="alertMessage" />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useProductsStore } from "@/stores/products";
import { useButtonHandlers } from "@/utils/buttonHandlers";
import { useImagePath } from "@/composables/useImagePath";
import BurguerCard from "@/components/BurguerCard.vue";
import BannerComponent from "@/components/BannerComponent.vue";
import ButtonsComponents from "@/components/ButtonComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";
import PaginationComponent from "@/components/PaginationComponent.vue";

const cartStore = useCartStore();
const productsStore = useProductsStore();
const showAlert = ref(false);
const alertMessage = ref("");
const { getImagePath } = useImagePath();
const { handleButtonClick } = useButtonHandlers();

// Estado para controlar a categoria atual
const currentCategory = ref("foods");

// Estado para paginação
const currentPage = ref(1);
const itemsPerPage = 4;
const filteredBurgers = ref([]);

// Adiciona um item ao carrinho
const addToCart = (burger) => {
  cartStore.addItem(burger);
  alertMessage.value = `${burger.name} adicionado ao carrinho!`;
  showAlert.value = true;
};

// Função para filtrar os produtos por categoria
const filterByCategory = (category) => {
  currentCategory.value = category;
  currentPage.value = 1; // Resetar para a primeira página ao mudar de categoria
  loadCategoryItems();
};

// Função para carregar itens da categoria atual com paginação
const loadCategoryItems = () => {
  let allCategoryItems = [];
  if (currentCategory.value === "foods") {
    allCategoryItems = productsStore.foods;
  } else if (currentCategory.value === "drinks") {
    allCategoryItems = productsStore.drinks;
  } else if (currentCategory.value === "desserts") {
    allCategoryItems = productsStore.desserts;
  }

  // Aplicar paginação
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  filteredBurgers.value = allCategoryItems.slice(startIndex, startIndex + itemsPerPage);
};

// Propriedade computada para o total de páginas
const totalPages = computed(() => {
  let totalItems = 0;
  if (currentCategory.value === "foods") {
    totalItems = productsStore.foods.length;
  } else if (currentCategory.value === "drinks") {
    totalItems = productsStore.drinks.length;
  } else if (currentCategory.value === "desserts") {
    totalItems = productsStore.desserts.length;
  }
  return Math.ceil(totalItems / itemsPerPage);
});

// Função para mudar de página
const changePage = (page) => {
  currentPage.value = page;
  loadCategoryItems();
};

// Inicializar carregando os produtos
onMounted(() => {
  filterByCategory("foods");
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/menu-page";
</style>
