<!-- Home em Material 3 Expressive, "Alface", rodada 2 (só desenvolvimento). Só composição: a prensa do
     hero é o único gesto expressivo; o resto são superfícies tonais, o feed e listas segmentadas
     (docs/direcoes/desenho/material.md). -->
<template>
  <MolduraDirecao estilo="material">
    <template #topo>
      <M3BarraSuperior :inicio="INICIO" />
    </template>

    <M3SecaoHero />
    <M3SecaoLanches />
    <M3SecaoMonte />
    <div class="m3-faixa container">
      <M3SecaoBebidasSobremesas />
      <M3SecaoOnde />
    </div>

    <template #rodape>
      <M3Rodape />
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/roboto";
import "./_tokens.scss";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import M3BarraSuperior from "./componentes/M3BarraSuperior.vue";
import M3Rodape from "./componentes/M3Rodape.vue";
import M3SecaoBebidasSobremesas from "./secoes/M3SecaoBebidasSobremesas.vue";
import M3SecaoHero from "./secoes/M3SecaoHero.vue";
import M3SecaoLanches from "./secoes/M3SecaoLanches.vue";
import M3SecaoMonte from "./secoes/M3SecaoMonte.vue";
import M3SecaoOnde from "./secoes/M3SecaoOnde.vue";

// Antes de tudo: liga os tokens do estilo ao <html>
useEstiloAtivo("material", { esquema: "light" });

const INICIO = "/direcoes/material";
</script>

<style scoped lang="scss">
@use "@/assets/styles/base/breakpoints" as *;

// Layout da moldura: a MolduraDirecao não tem estilo próprio. Abaixo de lg, a toolbar flutua no pé:
// a página reserva o espaço dela, para não cobrir o fim nem o foco (técnica C43).
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  padding-bottom: var(--m3-barra-reserva);

  @include up(lg) {
    padding-bottom: 0;
  }
}

:global(:root[data-direcao="material"]) {
  @include below(lg) {
    scroll-padding-bottom: var(--m3-barra-reserva);
  }
}

// Ritmo vertical: --space-7 entre as seções e --space-8 a partir de lg
.moldura :deep(.moldura__conteudo) {
  display: grid;
  flex: 1;
  align-content: start;
  gap: var(--space-7);
  min-width: 0;
  padding-block: var(--space-2) var(--space-8);

  @include up(lg) {
    gap: var(--space-8);
    padding-top: var(--space-4);
  }
}

// Bebidas e sobremesas ao lado de Onde e quando a partir de lg (7 e 5 colunas de 12). As colunas têm
// alturas diferentes: cada contêiner fica com a altura do próprio conteúdo, alinhado ao topo
.m3-faixa {
  display: grid;
  gap: var(--space-7);

  @include up(lg) {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    align-items: start;
    gap: var(--space-5);
  }
}
</style>
