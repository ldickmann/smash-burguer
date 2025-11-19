<template>
  <div class="demo-container">
    <h1>Playground</h1>
    <ButtonComponent
      :buttons="[{ label: 'Abrir Modal', id: 'open' }]"
      backgroundColor="#f00"
      color="#fff"
      @click="handleOpenModal"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const isModalOpen = ref(false);

const handleOpenModal = () => {
  isModalOpen.value = true;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_playground.scss";
</style>
