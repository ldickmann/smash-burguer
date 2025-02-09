<template>
  <div class="main-layout">
    <TheHeader title="Smash Burgers" />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup>
import TheHeader from "@/components/layout/TheHeader.vue";
</script>
