<template>
  <div class="burger-card">
    <img :src="burger.image" :alt="burger.name" class="burguer-image" />
    <h3>{{ burger.name }}</h3>
    <p>R$ {{ formattedPrice }}</p>
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

const emit = defineEmits(["addToCart"]);

const showModal = ref(false);

/**
 * Computes the formatted price of the burger.
 * If the price is available, it formats it to two decimal places.
 * If the price is not available, it defaults to "0.00".
 *
 * @computed
 * @returns {string} The formatted price of the burger.
 */
const formattedPrice = computed(() =>
  props.burger.price ? props.burger.price.toFixed(2) : "0.00"
);

// Open the modal and set the selected item to the burger.
const openModal = () => {
  showModal.value = true;
};

// Close the modal.
const closeModal = () => {
  showModal.value = false;
};

// Handle the addition of the burger to the cart.
const handleAddToCart = (customizedItem) => {
  emit("addToCart", customizedItem);
  closeModal();
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/burger-card";
</style>
