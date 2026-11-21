<!-- Uma categoria do cardápio como lista tipográfica (Hambúrgueres, Bebidas ou Sobremesas): nome, preço
     e descrição como texto real, com "Adicionar" em cada linha [H20][M25]. Os lanches e a sobremesa
     levam a nota dos adicionais [H24]. Categoria vazia: o título fica, e uma frase explica o vazio. -->
<template>
  <section :data-secao="id" :aria-labelledby="idTitulo" class="mn-categoria">
    <div class="mn-categoria__interno">
      <h2 :id="idTitulo" class="mn-categoria__titulo" tabindex="-1">{{ categoria.rotulo }}</h2>

      <ul v-if="!categoria.vazia" class="mn-categoria__lista" role="list">
        <MnLinhaCardapio v-for="produto in categoria.itens" :key="produto.id" :produto="produto" :categoria="chave" />
      </ul>
      <p v-else class="mn-categoria__vazia">{{ TEXTOS.categoriaVazia }}</p>

      <MnNotaAdicionais
        v-if="!categoria.vazia"
        class="mn-categoria__nota"
        :id-titulo="`mn-adicionais-${id}`"
        :titulo="TEXTOS.adicionais"
        :adicionais="adicionais"
        :nota="TEXTOS.notaAdicionais"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import MnLinhaCardapio from "../componentes/MnLinhaCardapio.vue";
import MnNotaAdicionais from "../componentes/MnNotaAdicionais.vue";

const props = defineProps({
  // foods, drinks ou desserts
  chave: {
    type: String,
    required: true,
  },
  // data-secao (hamburgueres, bebidas, sobremesas); o h2 é mn-<id>
  id: {
    type: String,
    required: true,
  },
});

const cardapio = useCardapio();
const categoria = cardapio.categoria(props.chave);
const idTitulo = computed(() => `mn-${props.id}`);

// Lanches e sobremesas têm adicionais; bebidas, não
const adicionais = computed(() => {
  if (props.chave === "foods") return cardapio.adicionais.value.lanche;
  if (props.chave === "desserts") return cardapio.adicionais.value.sobremesa;
  return [];
});
</script>

<style scoped lang="scss">
@use "../scss/secao-categoria";
</style>
