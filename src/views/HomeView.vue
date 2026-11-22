<!-- Home em Material 3 Expressive (SPEC-material §5.2): a composição da Home de referência
     (src/direcoes/estilos/material/HomeMaterial.vue), sem a moldura do acervo. O cabeçalho, a toolbar e o
     rodapé vêm do MainLayout. A prensa do hero é o único gesto expressivo; o resto são superfícies
     tonais, o feed, os adicionais em chips (etapa 5a) e listas segmentadas. O modal Personalizar é
     desta view: as seções o abrem por usePersonalizar() e nenhuma usa o carrinho nem calcula preço. -->
<template>
  <div class="home">
    <M3SecaoHero />
    <M3SecaoLanches />
    <M3SecaoMonte />
    <div class="m3-faixa container">
      <M3SecaoBebidasSobremesas />
      <M3SecaoOnde />
    </div>
  </div>

  <ModalAdditional :open="isOpen" :product="product" @close="closeModal" @confirm="confirm" />
</template>

<script setup>
import { provide } from "vue";
import { useProductModal } from "@/composables/useProductModal";
import { CHAVE_PERSONALIZAR } from "@/composables/usePersonalizar";
import ModalAdditional from "@/components/ModalAdditional.vue";
import M3SecaoBebidasSobremesas from "@/components/home/M3SecaoBebidasSobremesas.vue";
import M3SecaoHero from "@/components/home/M3SecaoHero.vue";
import M3SecaoLanches from "@/components/home/M3SecaoLanches.vue";
import M3SecaoMonte from "@/components/home/M3SecaoMonte.vue";
import M3SecaoOnde from "@/components/home/M3SecaoOnde.vue";

const { isOpen, product, openModal, closeModal, confirm } = useProductModal();

// As seções e os cards abrem o modal com personalizar(produto, contexto)
provide(CHAVE_PERSONALIZAR, openModal);
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/home";
</style>
