<template>
  <BannerComponent
    variant="page"
    title="Cardápio"
    text="Escolha, personalize e peça."
    image="/images/fundos/banner-burger-black"
    alt=""
    :image-width="1920"
    :image-height="1280"
  />

  <CategoryTabs v-model="currentCategory" :options="categories" />

  <div class="menu-page container">
    <ul v-if="products.length" class="menu-page__grid" role="list">
      <li v-for="product in products" :key="`${product.category}-${product.id}`">
        <ProductCard :product="product" variant="menu" :heading-level="2" @add="openModal" />
      </li>
    </ul>

    <EmptyState
      v-else
      icon="utensils"
      title="Nada nesta categoria por enquanto"
      text="Dê uma olhada nas outras categorias."
    />
  </div>

  <ModalAdditional :open="isOpen" :product="product" @close="closeModal" @confirm="confirm" />
</template>

<script setup>
import { computed, ref } from "vue";
import { useProductsStore } from "@/stores/products";
import { useProductModal } from "@/composables/useProductModal";
import BannerComponent from "@/components/BannerComponent.vue";
import CategoryTabs from "@/components/ui/CategoryTabs.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import ProductCard from "@/components/ProductCard.vue";
import ModalAdditional from "@/components/ModalAdditional.vue";

const productsStore = useProductsStore();
const { isOpen, product, openModal, closeModal, confirm } = useProductModal();

const categories = [
  { value: "foods", label: "Hambúrgueres" },
  { value: "drinks", label: "Bebidas" },
  { value: "desserts", label: "Sobremesas" },
];

// Cada categoria mostra todos os itens: sem paginação
const currentCategory = ref("foods");
const products = computed(() => productsStore[currentCategory.value] ?? []);
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/menu-page";
</style>
