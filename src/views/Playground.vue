<template>
  <div class="demo-container">
    <h1>Playground</h1>
    <ButtonComponent
      :buttons="[{ label: 'Abrir Modal', id: 'open' }]"
      backgroundColor="#f00"
      color="#fff"
      @click="handleOpenModal"
    />

    <ModalAddProducts v-if="isModalOpen" @close="handleCloseModal" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ModalAddProducts from "@/components/admin/ModalAddProducts.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const isModalOpen = ref(false);

const handleOpenModal = () => {
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_playground.scss";
</style>
