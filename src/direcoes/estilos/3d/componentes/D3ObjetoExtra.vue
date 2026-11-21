<!-- Um adicional como objeto de argila: a camada que ele põe no lanche, em tamanho de ícone 3D macio
     [D40][D41][D4][D56], com o nome e o preço em texto. Sem foco nem hover: a escolha acontece no
     modal, depois de "Adicionar". -->
<template>
  <li class="d3-objeto">
    <span class="d3-objeto__forma" aria-hidden="true">
      <D3Camada :forma="forma" :cor="cor" tamanho="objeto" />
      <span class="d3-objeto__contato"></span>
    </span>
    <span class="d3-objeto__nome">{{ nome }}</span>
    <span class="d3-objeto__preco tabular">{{ precoTexto }}</span>
  </li>
</template>

<script setup>
import { computed } from "vue";
import { formatPrice } from "@/utils/formatters";
import { TEXTOS } from "../textos";
import D3Camada from "./D3Camada.vue";

const props = defineProps({
  nome: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  forma: {
    type: String,
    default: "molho",
  },
  cor: {
    type: String,
    default: "maionese",
  },
});

// "+ " é o prefixo real do preço de adicional (AdditionalsList.vue)
const precoTexto = computed(() => `${TEXTOS.extras.prefixo}${formatPrice(props.preco)}`);
</script>

<style scoped lang="scss">
@use "../scss/objeto-extra";
</style>
