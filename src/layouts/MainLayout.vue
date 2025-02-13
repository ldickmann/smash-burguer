<template>
  <div class="main-layout">
    <TheNavbar title="Smash Burgers" />
    <main>
      <slot />
    </main>
    <TheFooter
      title="Smash Burgers"
      description=" Sabor irresistível em cada mordida! Burgers suculentos, ingredientes fresco e um toque especial que faz a diferença."
      address="Rua Beira da Praia - Navegantes, SC"
      phone="+55 47 9 9999 9999"
      email="smashBurguer@teste.com.br"
      workingHours="Terça a Sexta das 13h à 01h"
    />
  </div>
</template>

<script setup>
import TheFooter from '@/components/layout/TheFooter.vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
</script>
