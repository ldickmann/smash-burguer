<!-- "Adicionar": preto e cheio [M1]. Ao confirmar no modal, a face branca com o check ("Adicionado")
     aparece por opacidade durante o retorno; o nome acessível e o data-adicionado vêm de atributos
     (atributosAdicionar). O resultado é anunciado pelo modal real [M42]. -->
<template>
  <button
    type="button"
    class="mn-adicionar"
    :class="{ 'is-adicionado': adicionado }"
    v-bind="atributos"
    @click="emit('adicionar')"
  >
    <span class="mn-adicionar__face mn-adicionar__face--frente">{{ TEXTOS.adicionar }}</span>
    <span class="mn-adicionar__face mn-adicionar__face--verso" aria-hidden="true">
      <font-awesome-icon :icon="['fas', 'check']" />
      {{ TEXTOS.adicionado }}
    </span>
  </button>
</template>

<script setup>
import { TEXTOS } from "../textos";

defineProps({
  atributos: {
    type: Object,
    required: true,
  },
  adicionado: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["adicionar"]);
</script>

<style scoped lang="scss">
@use "../scss/botao-adicionar";
</style>
