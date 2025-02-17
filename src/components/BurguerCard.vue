<template>
  <!-- Burger card component -->
  <div class="burger-card">
    <img :src="burger.image" :alt="burger.name" class="burguer-image" />
    <h3>{{ burger.name }}</h3>
    <p>R$ {{ formattedPrice }}</p>
    <!-- Button component para adicionar o item ao pedido -->
    <ButtonsComponents
      class="burger-button"
      :buttons="[{ label: 'Adicionar ao pedido' }]"
      backgroundColor="#000000"
      fontColor="#ffffff"
      fontSize="14px"
      buttonSize="8px 16px"
      borderRadius="4px"
      @click="openModal"
    />
  </div>
  <!-- Modal Component que aparece ao clicar para adicionar -->
  <ModalAdditional
    v-if="showModal"
    :show="showModal"
    :item="burger"
    @close="closeModal"
    @add-to-cart="handleAddToCart"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import ButtonsComponents from "@/components/ButtonComponent.vue";
import ModalAdditional from "@/components/ModalAdditional.vue";

const props = defineProps({
  burger: {
    type: Object,
    required: true,
  },
});

// Define eventos emitidos pelo componente ao adicionar ao carrinho
const emit = defineEmits(["addToCart"]);

const showModal = ref(false);

/**
 * Computa o preço formatado do hambúrguer.
 * Se o preço estiver disponível, ele é formatado para 2 casas decimais.
 * Se o preço não estiver disponível, o valor padrão é "0.00".
 *
 * @computed
 * @returns {string} O preço formatado do hambúrguer.
 */
const formattedPrice = computed(() =>
  props.burger.price ? props.burger.price.toFixed(2) : "0.00"
);

//Função para abrir o modal ao clicar no botão
const openModal = () => {
  showModal.value = true;
};

// Função para fechar o modal
const closeModal = () => {
  showModal.value = false;
};

// Função para adicionar o item ao carrinho
const handleAddToCart = (customizedItem) => {
  emit("addToCart", customizedItem); // Emite o evento para adicionar ao carrinho
  closeModal();
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/burger-card";
</style>
