<!-- "Adicionar" com a troca de face chapada: cebola para alface com o check. O aria-label e o
     data-adicionado chegam por v-bind (atributosAdicionar) e caem neste <button>. O anúncio é o do
     modal: a face "Adicionado" é só visual. -->
<template>
  <button type="button" class="fl-adicionar" :class="{ 'is-adicionado': adicionado }" @click="emit('ativar')">
    <span class="fl-adicionar__trilho">
      <span class="fl-adicionar__face fl-adicionar__face--frente">Adicionar</span>
      <span class="fl-adicionar__face fl-adicionar__face--verso" aria-hidden="true">
        <font-awesome-icon :icon="['fas', 'check']" /> Adicionado
      </span>
    </span>
  </button>
</template>

<script setup>
defineProps({
  adicionado: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["ativar"]);
</script>

<style scoped lang="scss">
@use "../scss/botao-adicionar";
</style>
