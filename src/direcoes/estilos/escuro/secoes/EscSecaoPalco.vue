<!-- Palco (hero, a ousadia): a foto real do Smash Burger, larga (até 72rem), é a única luz da página. O
     fundo azul-marinho da foto vira cinza neutro no tom da base (filtro SVG abaixo, que só mexe nos pixels
     azulados) e as bordas, o topo e a tábua clara somem por máscara, sem nada pintado por cima [46][47].
     O título, o texto e "Ver cardápio" ficam embaixo, alinhados à esquerda, num bloco sólido da base que
     sobe só sobre a parte já transparente: nunca há texto sobre a foto [H5]. -->
<template>
  <section data-secao="palco" aria-labelledby="esc-palco-titulo" class="esc-palco">
    <svg class="esc-palco__filtros" aria-hidden="true" focusable="false" width="0" height="0">
      <filter id="esc-palco-neutro" color-interpolation-filters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" :values="NEUTRO.cinza" result="cinza" />
        <feColorMatrix in="SourceGraphic" type="matrix" :values="NEUTRO.peso" result="peso" />
        <feComposite in="cinza" in2="peso" operator="in" result="fundo" />
        <feComposite in="fundo" in2="SourceGraphic" operator="over" />
      </filter>
    </svg>

    <picture class="esc-palco__foto">
      <source type="image/webp" :srcset="foto.srcset" :sizes="foto.sizes" />
      <img
        class="esc-palco__img"
        :src="foto.src"
        :alt="TEXTOS.palcoAlt"
        width="960"
        height="683"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      />
    </picture>

    <div class="container">
      <div class="esc-palco__texto">
        <h1 id="esc-palco-titulo" class="esc-palco__titulo">{{ HERO.titulo }}</h1>
        <div class="esc-palco__corpo">
          <p class="esc-palco__descricao">{{ HERO.texto }}</p>
          <EscBotao class="esc-palco__acao" para="/menu" variante="primaria" tamanho="g">{{ HERO.acao }}</EscBotao>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { responsiveImage } from "@/composables/useResponsiveImage";
import { HERO } from "../../../compartilhado/dados";
import EscBotao from "../componentes/EscBotao.vue";
import { TEXTOS } from "../textos";

// Arquivo fixo de public/images (não vem da store: o palco não muda com o painel). A partir de sm, a
// foto tem a largura da caixa (até 72rem); abaixo, o img passa da caixa (152%) para o recorte 4:3
// ficar no lanche
const foto = responsiveImage("/images/foods/smash-burger", {
  sizes: "(min-width: 1152px) 1152px, (min-width: 480px) 100vw, 152vw",
});

// Filtro do palco (--esc-palco-filtro): onde o azul passa do vermelho (B - R acima de 8 em 255, todo o
// fundo da foto e nada do lanche), o pixel vira cinza de croma 0 com 55% da própria luminância, que cai
// no tom da base N6. O pão, o queijo, a carne e o molho ficam como estão.
const NEUTRO = {
  // R, G e B = 0,55 × (0,2126 R + 0,7152 G + 0,0722 B); alfa 1
  cinza: "0.1169 0.3934 0.0397 0 0  0.1169 0.3934 0.0397 0 0  0.1169 0.3934 0.0397 0 0  0 0 0 0 1",
  // alfa = (B - R - 0,031) / 0,078: 0 no lanche, 1 no fundo azulado
  peso: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -12.75 0 12.75 0 -0.4",
};
</script>

<style scoped lang="scss">
@use "../scss/secao-palco";
</style>
