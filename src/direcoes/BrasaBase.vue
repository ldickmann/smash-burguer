<!-- Linha de base: a Home real (HomeView, dentro do MainLayout), sem nenhuma mudança, com o alternador. -->
<template>
  <HomeView />
  <SeletorDirecao atual="brasa" />
</template>

<script setup>
import HomeView from "@/views/HomeView.vue";
import SeletorDirecao from "./SeletorDirecao.vue";
import { useEstiloAtivo } from "./compartilhado/useEstiloAtivo";

useEstiloAtivo("brasa", { esquema: "dark" });
</script>
