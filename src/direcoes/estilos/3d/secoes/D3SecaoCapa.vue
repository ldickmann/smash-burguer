<!-- Capa: o que a casa é e quando abre, com o caminho para o cardápio [H1], direto sobre o degradê e
     sem imagem. O palco da fileira, logo abaixo, faz o papel da imagem; o LCP é o h1. -->
<template>
  <section data-secao="capa" aria-labelledby="d3-titulo" class="d3-capa">
    <div class="container d3-capa__grade">
      <h1 id="d3-titulo" class="d3-capa__titulo">{{ HERO.titulo }}</h1>
      <div class="d3-capa__lado">
        <p class="d3-capa__texto">{{ HERO.texto }}</p>
        <D3Inflado class="d3-capa__acao" para="/menu" cor="ketchup" tamanho="grande">{{ HERO.acao }}</D3Inflado>
      </div>
    </div>
  </section>
</template>

<script setup>
import { HERO } from "../../../compartilhado/dados";
import D3Inflado from "../componentes/D3Inflado.vue";
</script>

<style scoped lang="scss">
@use "../scss/secao-capa";
</style>
