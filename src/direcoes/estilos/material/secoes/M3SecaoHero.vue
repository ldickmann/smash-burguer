<!-- Hero, a ousadia da página (hero moment [65]): num contêiner primary-container de canto 48, a prensa
     é o disco de 12 lobos em primary, enorme e cortado pela borda, e o título, o texto e o "Ver cardápio"
     ficam dentro dele, em on-primary. O lanche fica fora do disco, sobre o contêiner, e quebra a borda de
     baixo. No celular, o texto fica no contêiner e o disco, quase inteiro, vem depois do botão, com o
     lanche em cima: o texto nunca fica sobre a foto. -->
<template>
  <section
    data-secao="hero"
    aria-labelledby="m3-hero-titulo"
    class="m3-hero container"
    :style="{ '--m3-hero-proporcao': HERO.altura / HERO.largura }"
  >
    <div class="m3-hero__caixa">
      <div class="m3-hero__palco">
        <M3FormaPrensa class="m3-hero__prensa">
          <h1 id="m3-hero-titulo" class="m3-hero__titulo">{{ HERO.titulo }}</h1>
          <p class="m3-hero__descricao">{{ HERO.texto }}</p>
          <M3Botao class="m3-hero__acao" variante="tonal" tamanho="m" para="/menu">{{ HERO.acao }}</M3Botao>
        </M3FormaPrensa>
      </div>

      <picture class="m3-hero__foto">
        <source type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
        <img
          class="m3-hero__img"
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
  </section>
</template>

<script setup>
import { responsiveImage } from "@/composables/useResponsiveImage";
import { HERO, IMAGEM_HERO } from "../../../compartilhado/dados";
import M3Botao from "../componentes/M3Botao.vue";
import M3FormaPrensa from "../componentes/M3FormaPrensa.vue";

const imagem = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1280px) 544px, (min-width: 1024px) 448px, (min-width: 768px) 320px, 240px",
});
</script>

<style scoped lang="scss">
@use "../scss/secao-hero";
</style>
