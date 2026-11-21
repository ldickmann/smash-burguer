<!-- Os adicionais antes do pedido, com o preço [H24][H23], como o painel de resumo de uma subárea do
     hub [F25]. Tipográfico ("type is information" [F7]) e sem preenchimento colorido: nada aqui se
     clica. Os adicionais se escolhem no modal real, a partir do "Adicionar" de cada produto. -->
<template>
  <section data-secao="adicionais" aria-labelledby="fl-adicionais-titulo" class="fl-adicionais container">
    <h2 id="fl-adicionais-titulo" class="fl-adicionais__titulo" tabindex="-1">{{ TEXTOS.adicionais.titulo }}</h2>
    <template v-if="grupos.length">
      <p class="fl-adicionais__apoio">{{ TEXTOS.adicionais.texto }}</p>
      <div class="fl-adicionais__grupos" :class="{ 'fl-adicionais__grupos--um': grupos.length === 1 }">
        <FlParedePalavras
          v-for="grupo in grupos"
          :key="grupo.id"
          :id-titulo="grupo.id"
          :titulo="grupo.titulo"
          :itens="grupo.itens"
        />
      </div>
    </template>
    <p v-else class="fl-adicionais__vazio">{{ TEXTOS.cardapio.vazio }}</p>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import FlParedePalavras from "../componentes/FlParedePalavras.vue";

defineProps({});
defineEmits([]);

const { adicionais } = useCardapio();

// Grupo com a lista vazia não aparece; com os dois vazios, a seção fica com o h2 e o texto de vazio
const grupos = computed(() =>
  [
    { id: "fl-adicionais-hamburgueres", titulo: TEXTOS.adicionais.hamburgueres, itens: adicionais.value.lanche },
    { id: "fl-adicionais-sobremesas", titulo: TEXTOS.adicionais.sobremesas, itens: adicionais.value.sobremesa },
  ].filter((grupo) => grupo.itens.length)
);
</script>

<style scoped lang="scss">
@use "../scss/secao-adicionais";
</style>
