<!-- O <header> da loja (cópia de produção da M3BarraSuperior da Home, SPEC-material §4.1 e §5.1):
     top app bar pequena com a marca [59] e a toolbar. Abaixo de lg o cabeçalho rola com a página e a
     toolbar flutua embaixo; a partir de lg ele fica sticky e opaco, sem mudar ao rolar. -->
<template>
  <header class="m3-cabecalho">
    <div class="m3-cabecalho__interno container">
      <RouterLink :to="inicio" class="m3-marca">{{ MARCA }}</RouterLink>
      <M3BarraFerramentas :inicio="inicio" />
    </div>
  </header>
</template>

<script setup>
import M3BarraFerramentas from "@/components/layout/M3BarraFerramentas.vue";
import { MARCA } from "@/utils/textosLoja";

defineProps({
  inicio: {
    type: String,
    default: "/",
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/m3-barra-superior";
</style>
