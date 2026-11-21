<!-- Uma camada de argila: a forma de um ingrediente, na pilha da fileira ou como objeto do adicional.
     A face leva o especular e as duas sombras internas [D3]; a espessura é o lado, a mesma cor sob um
     véu escuro. Formas simples e cheias, sobrepostas, dão a profundidade [D40][D4]. Decorativa. -->
<template>
  <span
    class="d3-camada"
    :class="[`d3-camada--${forma}`, `d3-camada--${tamanho}`]"
    :style="estilo"
    aria-hidden="true"
  >
    <span class="d3-camada__lado"></span>
    <span class="d3-camada__face"></span>
  </span>
</template>

<script setup>
import { computed } from "vue";
import { FORMAS } from "../usePilha";

const props = defineProps({
  forma: {
    type: String,
    required: true,
    validator: (valor) => Object.hasOwn(FORMAS, valor),
  },
  cor: {
    type: String,
    required: true,
  },
  tamanho: {
    type: String,
    default: "pilha",
    validator: (valor) => ["pilha", "objeto"].includes(valor),
  },
});

// A cor é o sufixo de um token --3d-camada-*; as medidas saem do mapa de formas (usePilha.js)
const estilo = computed(() => {
  const { w, h, e } = FORMAS[props.forma];
  return { "--cor": `var(--3d-camada-${props.cor})`, "--w": `${w}%`, "--h": `${h}em`, "--e": `${e}em` };
});
</script>

<style scoped lang="scss">
@use "../scss/camada";
</style>
