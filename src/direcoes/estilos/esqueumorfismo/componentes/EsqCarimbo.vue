<!-- O carimbo "Adicionado", impresso sobre a área de texto do papel (nunca sobre a foto, onde o
     vermelho não tem contraste garantido). É decorativo: o modal real já anuncia a adição. -->
<template>
  <span class="esq-carimbo" :class="[`esq-carimbo--${tamanho}`, { 'is-visivel': visivel }]" aria-hidden="true">
    {{ TEXTOS.adicionado }}
  </span>
</template>

<script setup>
import { TEXTOS } from "../textos";

defineProps({
  visivel: {
    type: Boolean,
    default: false,
  },
  tamanho: {
    type: String,
    default: "normal",
    validator: (valor) => ["normal", "pequeno"].includes(valor),
  },
});
</script>

<style scoped lang="scss">
@use "../scss/carimbo";
</style>
