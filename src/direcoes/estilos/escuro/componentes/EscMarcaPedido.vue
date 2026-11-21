<!-- "No seu pedido" com a contagem, em tertiary-container: o papel que marca o que já está no pedido.
     O leitor de tela ouve o texto completo ("No seu pedido: 2 itens"); o ícone e o número são visuais.
     `compacta` mostra só o ícone e o número. -->
<template>
  <p class="esc-marca-pedido" :class="{ 'esc-marca-pedido--compacta': compacta }">
    <font-awesome-icon :icon="['fas', 'shopping-cart']" class="esc-marca-pedido__icone" aria-hidden="true" />
    <span v-if="!compacta" class="esc-marca-pedido__rotulo" aria-hidden="true">{{ TEXTOS.noPedido }}</span>
    <span class="esc-marca-pedido__numero tabular" aria-hidden="true">{{ quantidade }}</span>
    <span class="visually-hidden">{{ textoCompleto }}</span>
  </p>
</template>

<script setup>
import { computed } from "vue";
import { formatItemCount } from "@/utils/formatters";
import { TEXTOS } from "../textos";

const props = defineProps({
  quantidade: {
    type: Number,
    required: true,
    validator: (valor) => valor >= 1,
  },
  compacta: {
    type: Boolean,
    default: false,
  },
});

const textoCompleto = computed(() => `${TEXTOS.noPedido}: ${formatItemCount(props.quantidade)}`);
</script>

<style scoped lang="scss">
@use "../scss/marca-pedido";
</style>
