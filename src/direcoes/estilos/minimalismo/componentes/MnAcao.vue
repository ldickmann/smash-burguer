<!-- A ação principal da página: preta, cheia e retangular, nunca vazada [M1]. -->
<template>
  <RouterLink :to="to" class="mn-acao">
    <span class="mn-acao__texto"><slot /></span>
  </RouterLink>
</template>

<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "../scss/acao";
</style>
