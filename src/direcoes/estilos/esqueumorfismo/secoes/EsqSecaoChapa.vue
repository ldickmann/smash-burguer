<!-- Hero: a chapa curada com o título estampado e o lanche recortado (lado a lado a partir de lg,
     empilhados abaixo), e a frente de inox com a calha de gordura, onde ficam o texto e a única ação
     (Ver cardápio). A chapa fica parada: a ousadia da página está no cupom. Nenhum texto sobre a foto. -->
<template>
  <section data-secao="chapa" aria-labelledby="esq-chapa-titulo" class="esq-chapa">
    <div class="esq-chapa__superficie">
      <div class="esq-chapa__grade container">
        <h1 id="esq-chapa-titulo" class="esq-chapa__titulo">{{ HERO.titulo }}</h1>
        <picture class="esq-chapa__lanche">
          <source type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
          <img
            class="esq-chapa__img"
            :src="imagem.src"
            :alt="HERO.alt"
            :width="HERO.largura"
            :height="HERO.altura"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>
    </div>

    <div class="esq-chapa__frente">
      <div class="esq-chapa__balcao container">
        <p class="esq-chapa__texto">{{ HERO.texto }}</p>
        <EsqBotao to="/menu" tamanho="grande">{{ HERO.acao }}</EsqBotao>
      </div>
    </div>
  </section>
</template>

<script setup>
import { responsiveImage } from "@/composables/useResponsiveImage";
import { HERO, IMAGEM_HERO } from "../../../compartilhado/dados";
import EsqBotao from "../componentes/EsqBotao.vue";

// A LCP: descobrível no HTML, sem lazy-load e com prioridade alta [E28]
const imagem = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1280px) 440px, (min-width: 1024px) 380px, (min-width: 768px) 320px, 240px",
});
</script>

<style scoped lang="scss">
@use "../scss/secao-chapa";
</style>
