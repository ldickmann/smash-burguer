<!-- Home em flat, "Ladrilhos", rodada 2 (só desenvolvimento). Só composição: abre como a tela Iniciar
     do Metro, um título leve e um mosaico de ladrilhos chapados, cada um um alvo só, com a contagem
     calculada. Cor chapada só no que se clica (docs/direcoes/desenho/flat.md). -->
<template>
  <MolduraDirecao estilo="flat">
    <template #topo>
      <FlTopo :inicio="INICIO" />
    </template>

    <FlSecaoInicio />
    <FlSecaoCardapio />
    <FlSecaoAdicionais />
    <FlSecaoLoja />

    <template #rodape>
      <FlRodape />
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/open-sans";
import "./_tokens.scss";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import { provideHub } from "./useHub";
import FlRodape from "./componentes/FlRodape.vue";
import FlTopo from "./componentes/FlTopo.vue";
import FlSecaoAdicionais from "./secoes/FlSecaoAdicionais.vue";
import FlSecaoCardapio from "./secoes/FlSecaoCardapio.vue";
import FlSecaoInicio from "./secoes/FlSecaoInicio.vue";
import FlSecaoLoja from "./secoes/FlSecaoLoja.vue";

// Antes de tudo: liga os tokens do estilo ao <html>
useEstiloAtivo("flat", { esquema: "light" });

// A aba ativa do pivot, dividida com os ladrilhos da tela inicial
provideHub();

const INICIO = "/direcoes/flat";
</script>

<style scoped lang="scss">
@use "@/assets/styles/base/breakpoints" as *;

// A rolagem (ladrilhos, foco pelo Tab) para logo abaixo da faixa fixa do topo, que tem duas linhas
// abaixo de md: a raiz reserva a altura da faixa, no lugar do --navbar-h global
:global(:root[data-direcao="flat"]) {
  scroll-padding-top: var(--flat-topo-altura);

  @include up(md) {
    scroll-padding-top: var(--flat-topo-altura-md);
  }
}

// Layout da moldura: a MolduraDirecao não tem estilo próprio
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

// Ritmo vertical: --space-7 entre as seções e --space-8 a partir de md
.moldura :deep(.moldura__conteudo) {
  display: grid;
  flex: 1;
  align-content: start;
  gap: var(--space-7);
  min-width: 0;
  padding-bottom: var(--space-8);

  @include up(md) {
    gap: var(--space-8);
  }
}
</style>
