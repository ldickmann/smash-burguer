<template>
  <!-- Component Carousel -->
  <Carousel v-bind="carouselConfig" class="custom-carousel">
    <!-- Para cada item de burgers, renderiza um slide no carousel -->
    <Slide v-for="burger in burgers" :key="burger.id" class="custom-slide">
      <div class="carousel-item">
        <img :src="burger.image" :alt="burger.name" class="carousel-image" />
        <div class="carousel-content">
          <h3>{{ burger.name }}</h3>
          <p>{{ burger.description }}</p>
          <p class="price">R$ {{ burger.price.toFixed(2) }}</p>
          <ButtonComponent
            :buttons="[{ label: 'Adicionar ao Pedido', id: 'add-to-cart' }]"
            backgroundColor="#42b983"
            fontSize="16px"
            buttonSize="12px 24px"
            borderRadius="4px"
            @click="() => openModal(burger)"
          />
        </div>
      </div>
    </Slide>

    <!-- Adiciona os componentes de navegação e paginação -->
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>

  <!-- Modal Component que aparece ao clicar para adicionar -->
  <ModalAdditional
    v-if="showModal"
    :show="showModal"
    :item="selectedItem"
    @close="closeModal"
    @add-to-cart="handleAddToCart"
  />
</template>

<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { computed, ref } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ModalAdditional from "@/components/ModalAdditional.vue";

const props = defineProps({
  burgers: {
    Array,
    required: true,
  },
});

// Define eventos emitidos pelo componente
const emit = defineEmits(["addToCart"]);
const showModal = ref(false);
const selectedItem = ref(null);

// Configurações computadas do carousel com base nos "breakpoints"
const carouselConfig = computed(() => ({
  snapAlign: "center",
  wrapAround: true,
  breakpoints: {
    425: {
      height: 350,
      itemsToShow: 2,
    },
    768: {
      height: 500,
      itemsToShow: 2,
    },
    1024: {
      height: 550,
      itemsToShow: 3,
    },
    1440: {
      height: 600,
      itemsToShow: 4,
    },
  },
}));

//Função para abrir o modal ao clicar no botão
const openModal = (burger) => {
  selectedItem.value = burger;
  showModal.value = true;
};

// Função para fechar o modal
const closeModal = () => {
  showModal.value = false;
  selectedItem.value = null;
};

// Função para adicionar o item ao carrinho
const handleAddToCart = (customizedItem) => {
  emit("addToCart", customizedItem); // Emite o evento para adicionar ao carrinho
  closeModal();
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/carousel';
</style>
