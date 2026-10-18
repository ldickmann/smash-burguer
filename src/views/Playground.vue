<!-- eslint-disable vue/multi-word-component-names -- nome mantido: a rota de testes fica como está (FLX-10, fora do escopo) -->
<template>
  <div class="demo-container">
    <h1>Playground</h1>
    <BaseButton @click="handleOpenModal">Abrir Modal</BaseButton>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const isModalOpen = ref(false);

const handleOpenModal = () => {
  isModalOpen.value = true;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/_playground.scss";
</style>
