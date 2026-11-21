<!-- Hero só tipográfico: o título prensado em Archivo Expanded 800, o apoio com o horário, "Ver cardápio"
     e o sumário da própria página no lugar da foto [M18][H1]. Curto, para o cardápio começar acima da
     dobra [M17][H3]. Nenhuma imagem: a LCP é o h1. -->
<template>
  <section data-secao="hero" aria-labelledby="mn-titulo" class="mn-hero">
    <div class="mn-hero__grade">
      <h1 id="mn-titulo" class="mn-hero__titulo">{{ HERO.titulo }}</h1>
      <div class="mn-hero__apoio">
        <p class="mn-hero__texto">{{ HERO.texto }}</p>
        <MnAcao to="/menu">{{ HERO.acao }}</MnAcao>
      </div>
      <MnSumario class="mn-hero__sumario" :itens="itens" :rotulo="TEXTOS.nestaPagina" />
    </div>
  </section>
</template>

<script setup>
import { CATEGORIAS, HERO } from "../../../compartilhado/dados";
import { TEXTOS } from "../textos";
import MnAcao from "../componentes/MnAcao.vue";
import MnSumario from "../componentes/MnSumario.vue";

const props = defineProps({
  // ids das seções de categoria, por chave (foods → hamburgueres)
  ids: {
    type: Object,
    required: true,
  },
});

// O sumário não depende dos produtos: categoria vazia continua nele e leva à seção, que explica o vazio
const itens = [
  ...CATEGORIAS.map((categoria) => ({ id: `mn-${props.ids[categoria.chave]}`, rotulo: categoria.rotulo })),
  { id: "mn-atendimento", rotulo: TEXTOS.atendimento },
];
</script>

<style scoped lang="scss">
@use "../scss/secao-hero";
</style>
