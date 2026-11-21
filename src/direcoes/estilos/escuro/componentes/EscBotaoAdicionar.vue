<!-- "Adicionar" com a face "Adicionado ✓" (ProductCard.vue). O nome acessível vem de `atributos`
     (aria-label "Adicionar <nome>" e data-adicionado); o texto fica em spans, e a face de retorno é
     aria-hidden. As faces trocam por um deslize vertical curto, ou só por opacidade com movimento
     reduzido; o tempo do retorno é o do useCartaoProduto. -->
<template>
  <button
    type="button"
    class="esc-adicionar"
    :class="[`esc-adicionar--${variante}`, { 'is-adicionado': adicionado, 'esc-adicionar--largo': largo }]"
    v-bind="atributos"
    @click="emit('click', $event)"
  >
    <span class="esc-adicionar__face esc-adicionar__face--frente">{{ REAIS.adicionar }}</span>
    <span class="esc-adicionar__face esc-adicionar__face--verso" aria-hidden="true">
      <font-awesome-icon :icon="['fas', 'check']" />
      {{ REAIS.adicionado }}
    </span>
  </button>
</template>

<script setup>
import { REAIS } from "../textos";

defineProps({
  atributos: {
    type: Object,
    required: true,
  },
  adicionado: {
    type: Boolean,
    default: false,
  },
  variante: {
    type: String,
    default: "primaria",
    validator: (valor) => ["primaria", "tonal"].includes(valor),
  },
  // Largura total abaixo de sm (o botão do card da vitrine no celular)
  largo: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
</script>

<style scoped lang="scss">
@use "../scss/botao-adicionar";
</style>
