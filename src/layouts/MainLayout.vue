<template>
  <div class="main-layout">
    <Navbar title="Smash Burgers" />
    <main>
      <slot />
    </main>
    <TheFooter
      title="Smash Burgers"
      description="The best burgers in town"
      address="Rua Beira da Praia - Navegantes, SC"
      phone="+55 47 9 9999 9999"
      email="smashBurguer@teste.com.br"
      aboutUs="We are a burger restaurant that offers the best burgers in town."
      workingHours="Monday to Friday from 11:00 to 23:00"
      socialMedia="Follow us on Instagram and Facebook"
    />
  </div>
</template>

<script setup>
import TheFooter from "@/components/layout/TheFooter.vue";
import Navbar from "@/components/layout/Navbar.vue";
</script>
