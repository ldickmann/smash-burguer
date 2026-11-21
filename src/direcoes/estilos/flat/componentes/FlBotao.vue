<!-- Botão principal flat 2.0: preenchido, canto de 4 px, com cara de botão [F3][F5]. É um link
     (navega para outra tela). Hover mais escuro e sem estado desabilitado [F41][F40]. -->
<template>
  <RouterLink :to="para" class="fl-botao">
    <slot />
  </RouterLink>
</template>

<script setup>
defineProps({
  para: {
    type: [String, Object],
    required: true,
  },
});

defineEmits([]);
</script>

<style scoped lang="scss">
@use "../scss/botao";
</style>
