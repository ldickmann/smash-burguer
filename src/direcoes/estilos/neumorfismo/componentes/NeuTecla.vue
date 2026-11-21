<!-- Tecla de rádio do painel: rádio nativo escondido e a face em relevo com borda. Marcada, afunda,
     perde o convexo, ganha a borda de estado em tinta e o check no poço: o estado não depende da
     sombra. O nome acessível é o texto do rótulo (nome e preço). -->
<template>
  <label class="neu-tecla">
    <input
      class="visually-hidden"
      type="radio"
      :name="nome"
      :value="valor"
      :checked="modelValue === valor"
      @change="emit('update:modelValue', valor)"
    />
    <span class="neu-tecla__face">
      <span class="neu-tecla__poco" aria-hidden="true">
        <font-awesome-icon :icon="['fas', 'check']" class="neu-tecla__check" />
      </span>
      <span class="neu-tecla__texto">
        <span class="neu-tecla__nome">{{ rotulo }}</span>
        <span v-if="detalhe" class="neu-tecla__detalhe tabular">{{ detalhe }}</span>
      </span>
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [Number, String],
    default: null,
  },
  valor: {
    type: [Number, String],
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  rotulo: {
    type: String,
    required: true,
  },
  detalhe: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
@use "../scss/tecla";
</style>
