<!-- Botão do M3 Expressive: filled, tonal ou de texto, S (44 px) ou M (56 px). Com `para`, vira
     RouterLink; sem, <button type="button">. O pressionado troca a forma (redondo → cantos menores)
     por opacidade. `retorno` mostra a face "Adicionado" com o check. Os atributos (como o
     atributosAdicionar) vão para a raiz. -->
<template>
  <component
    :is="para ? RouterLink : 'button'"
    :to="para || undefined"
    :type="para ? undefined : 'button'"
    class="m3-botao"
    :class="[`m3-botao--${variante}`, `m3-botao--${tamanho}`, { 'is-retorno': retorno }]"
    @click="emit('click', $event)"
  >
    <span class="m3-botao__face m3-botao__face--frente"><slot /></span>
    <span v-if="!para" class="m3-botao__face m3-botao__face--verso" aria-hidden="true">
      <font-awesome-icon :icon="['fas', 'check']" class="m3-botao__check" />
      Adicionado
    </span>
  </component>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  variante: {
    type: String,
    default: "filled",
    validator: (valor) => ["filled", "tonal", "texto"].includes(valor),
  },
  tamanho: {
    type: String,
    default: "s",
    validator: (valor) => ["s", "m"].includes(valor),
  },
  para: {
    type: [String, Object],
    default: null,
  },
  retorno: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
</script>

<style scoped lang="scss">
@use "../scss/botao";
</style>
