<template>
  <div class="main-layout">
    <a href="#conteudo" class="skip-link" @click.prevent="focusMain">Pular para o conteúdo</a>
    <M3BarraSuperior inicio="/" />
    <main id="conteudo" ref="mainRef" class="main-layout__main" tabindex="-1">
      <RouterView />
    </main>
    <!-- Na Home, a seção "onde" já mostra horário e contato (SPEC-material, decisão g) -->
    <M3Rodape :contatos="route.name !== 'home'" />
    <AssinaturaEncaixe tom="escuro" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import AssinaturaEncaixe from "@/components/AssinaturaEncaixe.vue";
import M3BarraSuperior from "@/components/layout/M3BarraSuperior.vue";
import M3Rodape from "@/components/layout/M3Rodape.vue";

const route = useRoute();
const mainRef = ref(null);

// O link usa #conteudo, mas a rota é por hash: o foco é movido à mão
const focusMain = () => mainRef.value?.focus();
</script>

<style scoped lang="scss">
@use "@/assets/styles/layouts/main-layout";
</style>
