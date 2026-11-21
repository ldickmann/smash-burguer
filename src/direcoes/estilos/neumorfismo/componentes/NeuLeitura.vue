<!-- Leitura estática num poço raso: o preço do visor, em algarismos tabulares. Não é controle. -->
<template>
  <p class="neu-leitura tabular">{{ valor }}</p>
</template>

<script setup>
defineProps({
  valor: {
    type: String,
    required: true,
  },
});

defineEmits([]);
</script>

<style scoped lang="scss">
@use "../scss/leitura";
</style>
