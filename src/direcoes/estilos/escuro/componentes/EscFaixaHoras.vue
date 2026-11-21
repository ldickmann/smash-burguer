<!-- Faixa das 24 horas, de meio-dia a meio-dia: o trecho aberto aceso (on-surface) sobre o trilho
     apagado (N22), com um corte na meia-noite. Redundância visual do texto do horário: aria-hidden.
     Tudo se posiciona pela grade de 24 colunas, sem transform. -->
<template>
  <div class="esc-faixa" aria-hidden="true">
    <span class="esc-faixa__rotulo esc-faixa__rotulo--abre tabular" :style="coluna(posicoes.rotuloAbre)">
      {{ rotuloAbre }}
    </span>
    <span class="esc-faixa__rotulo esc-faixa__rotulo--fecha tabular" :style="coluna(posicoes.rotuloFecha)">
      {{ rotuloFecha }}
    </span>

    <span class="esc-faixa__trilho" />
    <span
      v-for="(trecho, indice) in posicoes.trechos"
      :key="indice"
      class="esc-faixa__acesa"
      :style="coluna(trecho)"
    />
    <span v-if="posicoes.meiaNoite" class="esc-faixa__corte" />

    <span class="esc-faixa__eixo esc-faixa__eixo--inicio">{{ rotulos.meioDia }}</span>
    <span class="esc-faixa__eixo esc-faixa__eixo--meio">{{ rotulos.meiaNoite }}</span>
    <span class="esc-faixa__eixo esc-faixa__eixo--fim">{{ rotulos.meioDia }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { posicoesFaixa } from "../turno";

// Horas de 0 a 23
const props = defineProps({
  abre: {
    type: Number,
    required: true,
    validator: (valor) => Number.isInteger(valor) && valor >= 0 && valor <= 23,
  },
  fecha: {
    type: Number,
    required: true,
    validator: (valor) => Number.isInteger(valor) && valor >= 0 && valor <= 23,
  },
  rotuloAbre: {
    type: String,
    required: true,
  },
  rotuloFecha: {
    type: String,
    required: true,
  },
  rotulos: {
    type: Object,
    required: true,
  },
});

const posicoes = computed(() => posicoesFaixa({ abre: props.abre, fecha: props.fecha }));
const coluna = ({ inicio, fim }) => ({ gridColumn: `${inicio} / ${fim}` });
</script>

<style scoped lang="scss">
@use "../scss/faixa-horas";
</style>
