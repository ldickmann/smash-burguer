<!-- A linha tipográfica do cardápio: nome, pontilhado e preço [M25]. O pontilhado fica fora do leitor
     de tela [M26], e o preço é um só nó de texto, lido de uma vez [M27]. Nome longo quebra dentro da
     própria caixa; o pontilhado encolhe e o preço fica na última linha. -->
<template>
  <div class="mn-linha-preco" :class="`mn-linha-preco--${tamanho}`">
    <component :is="tag" class="mn-linha-preco__nome">{{ nome }}</component>
    <span class="mn-linha-preco__pontos" aria-hidden="true"></span>
    <span class="mn-linha-preco__valor tabular">{{ preco }}</span>
  </div>
</template>

<script setup>
defineProps({
  nome: {
    type: String,
    required: true,
  },
  // Já formatado por formatPrice
  preco: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "h3",
  },
  tamanho: {
    type: String,
    default: "produto",
    validator: (valor) => ["produto", "adicional"].includes(valor),
  },
});
</script>

<style scoped lang="scss">
@use "../scss/linha-preco";
</style>
