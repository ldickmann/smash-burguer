<!-- Um grupo de adicionais como parede de palavras: o nome grande e leve sobre o preço pequeno e mais
     pesado, agrupados só pelo espaço, sem linha nem caixa [F51][F7]. Informação, sem alvo. -->
<template>
  <div class="fl-parede">
    <h3 :id="idTitulo" class="fl-parede__titulo">{{ titulo }}</h3>
    <ul class="fl-parede__lista" role="list" :aria-labelledby="idTitulo">
      <li v-for="item in itens" :key="item.id" class="fl-parede__item">
        <span class="fl-parede__nome">{{ item.name }}</span> <span class="fl-parede__preco tabular">{{ item.precoTexto }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  titulo: {
    type: String,
    required: true,
  },
  idTitulo: {
    type: String,
    required: true,
  },
  // [{ id, name, precoTexto }] (precoTexto já com formatPrice, do useCardapio)
  itens: {
    type: Array,
    required: true,
  },
});

defineEmits([]);
</script>

<style scoped lang="scss">
@use "../scss/parede-palavras";
</style>
