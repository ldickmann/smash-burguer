<!-- Feed "Hambúrgueres" [64]: todos os lanches à vista numa grade, sem carrossel, com o "Smash Burger"
     (o lanche que leva o nome da casa) maior. Uma folha de ingredientes aberta por vez. -->
<template>
  <section data-secao="lanches" aria-labelledby="m3-lanches-titulo" class="m3-lanches container">
    <div class="m3-lanches__cabecalho">
      <h2 id="m3-lanches-titulo" class="m3-lanches__titulo">{{ rotulo }}</h2>
      <M3Botao class="m3-lanches__ver" variante="texto" para="/menu">{{ HERO.acao }}</M3Botao>
    </div>

    <ul v-if="destaque" class="m3-feed" role="list">
      <li class="m3-feed__item m3-feed__item--destaque">
        <M3CartaoLanche
          :key="`destaque-${destaque.id}`"
          :produto="destaque"
          destaque
          :aberto="aberta === destaque.id"
          @alternar="alternar"
        />
      </li>
      <li v-for="produto in demais" :key="produto.id" class="m3-feed__item">
        <M3CartaoLanche :produto="produto" :aberto="aberta === produto.id" @alternar="alternar" />
      </li>
    </ul>
    <p v-else class="m3-lanches__vazio">{{ TEXTOS.vazio }}</p>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { CATEGORIAS, HERO, MARCA } from "../../../compartilhado/dados";
import { separarDestaque } from "../cardapio";
import { TEXTOS } from "../textos";
import { useFolhaUnica } from "../useFolhaUnica";
import M3Botao from "../componentes/M3Botao.vue";
import M3CartaoLanche from "../componentes/M3CartaoLanche.vue";

const produtos = useProductsStore();
const rotulo = CATEGORIAS.find((categoria) => categoria.chave === "foods").rotulo;

const separados = computed(() => separarDestaque(produtos.foods ?? [], MARCA));
const destaque = computed(() => separados.value.destaque);
const demais = computed(() => separados.value.demais);

const { aberta, alternar } = useFolhaUnica();
</script>

<style scoped lang="scss">
@use "../scss/secao-lanches";
</style>
