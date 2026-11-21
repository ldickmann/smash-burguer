<!-- O texto e a ação de um produto [H20]: na fileira, sob a pilha, com a descrição; na bandeja, com a
     foto em pé e sem a descrição. O "Adicionar" abre o modal Personalizar real (usePersonalizar), com
     os ganchos do useCartaoProduto. Com foto, a ficha divide as linhas da bandeja (subgrid). -->
<template>
  <article class="d3-ficha" :class="{ 'd3-ficha--foto': foto }">
    <D3Foto
      v-if="foto"
      class="d3-ficha__foto"
      :imagem="imagem"
      :alt="produto.name"
      :falhou="imagemFalhou"
      :proporcao="proporcao"
      @erro="imagemFalhou = true"
    />
    <h3 class="d3-ficha__nome">{{ produto.name }}</h3>
    <p v-if="descricao && texto" class="d3-ficha__descricao">{{ texto }}</p>
    <p v-if="detalhe" class="d3-ficha__detalhe">{{ detalhe }}</p>
    <p class="d3-ficha__preco tabular">{{ preco }}</p>
    <D3Adicionar
      class="d3-ficha__acao"
      :adicionado="adicionado"
      compacto
      v-bind="atributosAdicionar"
      @click="personalizar(produto, contexto)"
    />
  </article>
</template>

<script setup>
import { computed } from "vue";
import { TAMANHOS_CARD, useCartaoProduto } from "../../../compartilhado/useCartaoProduto";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import D3Adicionar from "./D3Adicionar.vue";
import D3Foto from "./D3Foto.vue";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  foto: {
    type: Boolean,
    default: false,
  },
  descricao: {
    type: Boolean,
    default: true,
  },
  proporcao: {
    type: Array,
    default: () => [4, 3],
  },
  detalhe: {
    type: String,
    default: "",
  },
  tamanhos: {
    type: String,
    default: TAMANHOS_CARD,
  },
});

const personalizar = usePersonalizar();
const { imagem, preco, imagemFalhou, adicionado, contexto, atributosAdicionar } = useCartaoProduto(
  () => props.produto,
  { sizes: props.tamanhos }
);

// A descrição real; se vier vazia (produto editado no painel), os ingredientes reais em lista
const lista = new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" });
const texto = computed(() => {
  const descricao = String(props.produto.description ?? "").trim();
  if (descricao) return descricao;
  const ingredientes = Array.isArray(props.produto.ingredients) ? props.produto.ingredients : [];
  return ingredientes.length ? lista.format(ingredientes) : "";
});
</script>

<style scoped lang="scss">
@use "../scss/ficha";
</style>
