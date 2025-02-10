<script setup>
import TheFooter from "@/components/layout/TheFooter.vue";
import TheNavbar from "@/components/layout/TheNavbar.vue";
</script>

<template>
  <div class="main-layout">
    <TheNavbar title="Smash Burgers" />
    <main>
      <slot />
    </main>
    <TheFooter
      title="Smash Burgers"
      description="The best burgers in town | We are a burger restaurant that offers the best burgers in town."
      address="Rua Beira da Praia - Navegantes, SC"
      phone="+55 47 9 9999 9999"
      email="smashBurguer@teste.com.br"
      workingHours="Terça a Sexta das 13h à 01h"
    />
  </div>
</template>
