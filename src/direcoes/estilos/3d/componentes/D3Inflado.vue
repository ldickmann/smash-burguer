<!-- Botão de argila que incha como pão e achata ao apertar, como o smash [D3][D42]. Com `para`, é um
     link (RouterLink); sem, um <button type="button">. Com `alternado` diferente de null, vira botão de
     alternar (aria-pressed): ligado, fica afundado em pão claro, com o anel e o check [D23]. -->
<template>
  <RouterLink
    v-if="para"
    :to="para"
    class="d3-inflado"
    :class="[`d3-inflado--${cor}`, `d3-inflado--${tamanho}`]"
  >
    <font-awesome-icon v-if="icone" :icon="icone" class="d3-inflado__icone" aria-hidden="true" />
    <span class="d3-inflado__rotulo"><slot /></span>
  </RouterLink>
  <button
    v-else
    type="button"
    class="d3-inflado"
    :class="[`d3-inflado--${cor}`, `d3-inflado--${tamanho}`, { 'is-ligado': alternado === true }]"
    :aria-pressed="alternado === null ? undefined : String(alternado)"
    @click="emit('click', $event)"
  >
    <font-awesome-icon v-if="iconeFinal" :icon="iconeFinal" class="d3-inflado__icone" aria-hidden="true" />
    <span class="d3-inflado__rotulo"><slot /></span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  para: {
    type: [String, Object],
    default: null,
  },
  cor: {
    type: String,
    default: "ketchup",
    validator: (valor) => ["ketchup", "carne", "maionese"].includes(valor),
  },
  tamanho: {
    type: String,
    default: "normal",
    validator: (valor) => ["normal", "grande"].includes(valor),
  },
  alternado: {
    type: Boolean,
    default: null,
  },
  icone: {
    type: [Array, Object],
    default: null,
  },
});

const emit = defineEmits(["click"]);

// Ligado, o ícone vira o check: o sinal do estado além da sombra
const iconeFinal = computed(() => (props.alternado === true ? ["fas", "check"] : props.icone));
</script>

<style scoped lang="scss">
@use "../scss/inflado";
</style>
