<!-- "Adicionar" de argila que achata ao apertar e vira em X para "Adicionado" [D11][D14][D42]. O pai
     passa v-bind="atributosAdicionar" (aria-label "Adicionar <nome>" e data-adicionado), que cai na
     raiz, e o clique abre o modal Personalizar real. Com movimento reduzido, as faces trocam por opacidade. -->
<template>
  <button
    type="button"
    class="d3-adicionar"
    :class="{ 'is-adicionado': adicionado, 'd3-adicionar--compacto': compacto }"
    @click="emit('click', $event)"
  >
    <span class="d3-adicionar__miolo">
      <span class="d3-adicionar__face d3-adicionar__face--frente">{{ TEXTOS.adicionar }}</span>
      <span class="d3-adicionar__face d3-adicionar__face--verso" aria-hidden="true">
        <font-awesome-icon :icon="['fas', 'check']" />
        {{ TEXTOS.adicionado }}
      </span>
    </span>
  </button>
</template>

<script setup>
import { TEXTOS } from "../textos";

defineProps({
  adicionado: {
    type: Boolean,
    default: false,
  },
  compacto: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);
</script>

<style scoped lang="scss">
@use "../scss/adicionar";
</style>
