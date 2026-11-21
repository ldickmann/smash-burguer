<!-- A laje de um passo: o verbo e o objeto do passo (um link ou a lista de adicionais), sem parágrafo.
     A elevação cresce com o degrau, como folhas sobrepostas de sombras macias (G3) [D3]. -->
<template>
  <div class="d3-degrau" :class="`d3-degrau--${degrau}`" :style="{ '--degrau': degrau }">
    <h3 :id="tituloId" class="d3-degrau__titulo">{{ titulo }}</h3>
    <div class="d3-degrau__objeto">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    required: true,
  },
  tituloId: {
    type: String,
    required: true,
  },
  // 1 a 3: dá a elevação, o passo da escada e o recuo no celular
  degrau: {
    type: Number,
    default: 1,
    validator: (valor) => [1, 2, 3].includes(valor),
  },
});
</script>

<style scoped lang="scss">
@use "../scss/degrau";
</style>
