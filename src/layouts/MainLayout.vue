<template>
  <div class="main-layout">
    <a href="#conteudo" class="skip-link" @click.prevent="focusMain">Pular para o conteúdo</a>
    <TheNavbar title="Smash Burger" />
    <main id="conteudo" ref="mainRef" class="main-layout__main" tabindex="-1">
      <RouterView />
    </main>
    <TheFooter
      title="Smash Burger"
      description="Sabor irresistível em cada mordida. Burgers suculentos, ingredientes frescos e um toque especial."
      address="Rua Beira da Praia - Navegantes, SC"
      phone="+55 47 5 6355 3265"
      email="contato@smashburger.com.br"
      workingHours="Terça a sexta, das 13h à 01h"
    />
    <AssinaturaEncaixe tom="escuro" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AssinaturaEncaixe from "@/components/AssinaturaEncaixe.vue";
import TheFooter from "@/components/layout/TheFooter.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";

const mainRef = ref(null);

// O link usa #conteudo, mas a rota é por hash: o foco é movido à mão
const focusMain = () => mainRef.value?.focus();
</script>

<style scoped lang="scss">
@use "@/assets/styles/layouts/main-layout";
</style>
