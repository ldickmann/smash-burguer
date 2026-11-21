<!-- Home em neumorfismo, "Kraft prensado", rodada 2 (só desenvolvimento). Só composição: a página é
     uma superfície contínua de kraft, com um único aparelho elevado (o painel); o resto é prensado
     no próprio kraft (docs/direcoes/desenho/neumorfismo.md). -->
<template>
  <MolduraDirecao estilo="neumorfismo">
    <template #topo>
      <NeuTopo :inicio="INICIO" />
    </template>

    <NeuSecaoAbertura />
    <NeuSecaoPainel />
    <NeuSecaoAcompanhamentos />
    <NeuSecaoContato />

    <template #rodape>
      <NeuRodape :inicio="INICIO" />
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/nunito";
import "./_tokens.scss";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import NeuRodape from "./componentes/NeuRodape.vue";
import NeuTopo from "./componentes/NeuTopo.vue";
import NeuSecaoAbertura from "./secoes/NeuSecaoAbertura.vue";
import NeuSecaoAcompanhamentos from "./secoes/NeuSecaoAcompanhamentos.vue";
import NeuSecaoContato from "./secoes/NeuSecaoContato.vue";
import NeuSecaoPainel from "./secoes/NeuSecaoPainel.vue";

// Antes de tudo: liga os tokens do estilo ao <html>
useEstiloAtivo("neumorfismo", { esquema: "light" });

const INICIO = "/direcoes/neumorfismo";
</script>

<style scoped lang="scss">
@use "@/assets/styles/base/breakpoints" as *;

// Layout da moldura: a MolduraDirecao não tem estilo próprio
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

// Ritmo vertical: --space-7 entre as seções e --space-8 a partir de lg
.moldura :deep(.moldura__conteudo) {
  display: grid;
  flex: 1;
  align-content: start;
  gap: var(--space-7);
  min-width: 0;
  padding-block: var(--space-4) var(--space-8);

  @include up(lg) {
    gap: var(--space-8);
    padding-top: var(--space-5);
  }
}
</style>
