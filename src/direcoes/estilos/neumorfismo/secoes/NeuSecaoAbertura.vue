<!-- Abertura: o h1 sozinho no kraft e, embaixo, uma cova larga e rasa prensada na página, o negativo
     do painel. O lanche fica de pé dentro dela, com o lábio claro por cima da base, e o texto e
     "Ver cardápio" ficam no fundo da cova, ao lado (no celular, depois dela). A cova e o lábio são
     camadas no mesmo grid do lanche e do texto: um DOM só para todas as larguras. -->
<template>
  <section data-secao="abertura" aria-labelledby="neu-abertura-titulo" class="neu-abertura container">
    <h1 id="neu-abertura-titulo" class="neu-abertura__titulo">{{ HERO.titulo }}</h1>

    <div class="neu-abertura__palco">
      <span class="neu-cova" aria-hidden="true" />
      <picture class="neu-cova__lanche">
        <source type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
        <img
          class="neu-cova__img"
          :src="imagem.src"
          :alt="HERO.alt"
          :width="HERO.largura"
          :height="HERO.altura"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
      </picture>
      <span class="neu-cova__labio" aria-hidden="true" />
      <div class="neu-cova__texto">
        <p class="neu-cova__frase">{{ HERO.texto }}</p>
        <NeuAcao para="/menu" tamanho="g">{{ HERO.acao }}</NeuAcao>
      </div>
    </div>
  </section>
</template>

<script setup>
import { responsiveImage } from "@/composables/useResponsiveImage";
import { HERO, IMAGEM_HERO } from "../../../compartilhado/dados";
import NeuAcao from "../componentes/NeuAcao.vue";

const imagem = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1280px) 432px, (min-width: 1024px) 352px, (min-width: 768px) 208px, 192px",
});
</script>

<style scoped lang="scss">
@use "../scss/secao-abertura";
</style>
