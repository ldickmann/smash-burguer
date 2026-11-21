<!-- Teclado de rádio dos lanches: fieldset com legend visível e uma tecla por produto. As setas são
     as do navegador (o grupo de rádios nativo já faz o tabindex móvel); a troca é imediata. -->
<template>
  <fieldset class="neu-teclado">
    <legend class="neu-teclado__legenda">{{ legenda }}</legend>
    <div class="neu-teclado__teclas">
      <NeuTecla
        v-for="produto in produtos"
        :key="produto.id"
        :model-value="modelValue"
        :valor="produto.id"
        :nome="nome"
        :rotulo="produto.name"
        :detalhe="formatPrice(produto.price)"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </div>
  </fieldset>
</template>

<script setup>
import { formatPrice } from "@/utils/formatters";
import NeuTecla from "./NeuTecla.vue";

defineProps({
  produtos: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [Number, String],
    default: null,
  },
  legenda: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    default: "neu-lanche",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
@use "../scss/teclado";
</style>
