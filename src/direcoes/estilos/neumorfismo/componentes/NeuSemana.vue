<!-- Leitura do horário em poços, um por dia: os abertos em tinta e com ponto. Repete o texto de
     HORARIO, que vem logo depois e é a informação; por isso é aria-hidden. Se o texto não for
     entendido, não aparece nada. -->
<template>
  <div v-if="abertos" class="neu-semana" aria-hidden="true">
    <span
      v-for="(dia, indice) in dias"
      :key="dia"
      class="neu-semana__dia"
      :class="{ 'is-aberto': abertos.includes(indice) }"
    >
      {{ dia }}
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { diasAbertos } from "../horario";

const props = defineProps({
  texto: {
    type: String,
    required: true,
  },
  dias: {
    type: Array,
    required: true,
  },
});

defineEmits([]);

const abertos = computed(() => (props.dias.length === 7 ? diasAbertos(props.texto) : null));
</script>

<style scoped lang="scss">
@use "../scss/semana";
</style>
