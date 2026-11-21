<!-- A pilha de um lanche, desmontada nas linhas do eixo comum (separada) ou fechada na altura real
     (junta) [D46][D47][D48][D50]. Abaixo de md, sem eixo, a separada usa só as linhas do par lado a
     lado (`aPar` e `linhasPar`). Decorativa: o texto equivalente é a descrição da ficha. A cena tem
     preserve-3d e herda --rx e --ry do palco (useTilt); nada de overflow, opacity, filter, clip-path
     nem isolation nela [D9], e nada de will-change permanente [D36]. -->
<template>
  <div
    class="d3-pilha"
    :class="{ 'is-junta': junta }"
    :style="{ '--linhas': linhas, '--linhas-par': linhasPar || linhas }"
    aria-hidden="true"
  >
    <div class="d3-pilha__cena">
      <D3Camada
        v-for="camada in camadas"
        :key="camada.chave"
        :forma="camada.forma"
        :cor="camada.cor"
        :style="{ '--a': camada.a, '--a-par': camada.aPar ?? camada.a, '--b': camada.b, '--j': camada.j }"
      />
    </div>
    <span class="d3-pilha__contato"></span>
  </div>
</template>

<script setup>
import D3Camada from "./D3Camada.vue";

defineProps({
  // { chave, forma, cor, a, aPar, b, j }[]: `a` é a linha no eixo (de baixo, a partir de 0); `aPar`, a
  // linha entre as do par (abaixo de md); `b`, a posição no lanche
  camadas: {
    type: Array,
    required: true,
  },
  // Total de linhas do eixo: fixa a altura da caixa, que não muda ao juntar
  linhas: {
    type: Number,
    required: true,
  },
  // Total de linhas do par (abaixo de md); 0 usa as do eixo
  linhasPar: {
    type: Number,
    default: 0,
  },
  junta: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@use "../scss/pilha";
</style>
