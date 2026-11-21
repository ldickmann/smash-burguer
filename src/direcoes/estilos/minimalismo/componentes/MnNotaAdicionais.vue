<!-- Nota de rodapé da categoria: os adicionais com o preço, com o mesmo pontilhado do cardápio, mostrando
     antes do modal o que ele oferece [H24]. Sem adicionais, não aparece. -->
<template>
  <div v-if="adicionais.length" class="mn-nota">
    <h3 :id="idTitulo" class="mn-nota__titulo">{{ titulo }}</h3>
    <ul class="mn-nota__lista" role="list" :aria-labelledby="idTitulo">
      <li v-for="adicional in adicionais" :key="adicional.id" class="mn-nota__item">
        <MnLinhaPreco :nome="adicional.name" :preco="adicional.precoTexto" tag="span" tamanho="adicional" />
      </li>
    </ul>
    <p class="mn-nota__texto">{{ nota }}</p>
  </div>
</template>

<script setup>
import MnLinhaPreco from "./MnLinhaPreco.vue";

defineProps({
  idTitulo: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  // [{ id, name, precoTexto }] (useCardapio: preço já por formatPrice)
  adicionais: {
    type: Array,
    default: () => [],
  },
  nota: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "../scss/nota-adicionais";
</style>
