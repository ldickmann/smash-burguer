<!-- "Ver foto": o disclosure que abre a única foto da página [M44][M3]. O estado aberto muda a forma do
     marcador (quadrado vazado → cheio), não só a cor [M37]; o nome acessível começa pelo texto visível. -->
<template>
  <button
    ref="botao"
    type="button"
    class="mn-ver-foto"
    data-ver-foto
    :aria-expanded="expandido ? 'true' : 'false'"
    :aria-controls="controla"
    :aria-label="`${TEXTOS.verFoto} de ${nome}`"
    @click="emit('alternar', botao)"
  >
    <span class="mn-ver-foto__marcador" aria-hidden="true"></span>
    <span class="mn-ver-foto__texto">{{ TEXTOS.verFoto }}</span>
  </button>
</template>

<script setup>
import { ref } from "vue";
import { TEXTOS } from "../textos";

defineProps({
  expandido: {
    type: Boolean,
    default: false,
  },
  // id do painel da foto
  controla: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["alternar"]);
const botao = ref(null);
</script>

<style scoped lang="scss">
@use "../scss/botao-foto";
</style>
