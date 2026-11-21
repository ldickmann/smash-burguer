<!-- O botão físico vermelho, a única peça com relevo de botão [E15][E18]: aro e lateral num ::before,
     que dá lugar ao ::after apertado. Com `to`, é um RouterLink; sem, um <button>. Os atributos e o
     @click caem na raiz (v-bind="atributosAdicionar" passa direto). -->
<template>
  <RouterLink v-if="to" :to="to" class="esq-botao" :class="`esq-botao--${tamanho}`">
    <slot />
  </RouterLink>
  <button v-else type="button" class="esq-botao" :class="`esq-botao--${tamanho}`">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  to: {
    type: [String, Object],
    default: null,
  },
  tamanho: {
    type: String,
    default: "normal",
    validator: (valor) => ["normal", "grande"].includes(valor),
  },
});
</script>

<style scoped lang="scss">
@use "../scss/botao";
</style>
