<!-- Etiqueta de gôndola: o papel que carrega um dado, preso sob a prateleira, sem relevo de botão
     [E15]. Serve ao item do expositor e ao aviso de prateleira vazia. -->
<template>
  <component :is="tag" class="esq-etiqueta">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: "div",
  },
});
</script>

<style scoped lang="scss">
@use "../scss/etiqueta";
</style>
