<!-- Home em 3D e gradientes suaves, "Camadas", rodada 2 (só desenvolvimento). Só composição: a página
     mostra o lanche por dentro. A ousadia é a fileira (os hambúrgueres desmontados lado a lado e o
     "Juntar camadas"); o resto é argila parada sobre o degradê (docs/direcoes/desenho/3d.md). -->
<template>
  <MolduraDirecao estilo="3d">
    <template #topo>
      <D3Cabecalho :inicio="INICIO" />
    </template>

    <div class="d3-fundo">
      <D3SecaoCapa />
      <D3SecaoFileira />
      <D3SecaoBandeja />
      <D3SecaoDegraus />
    </div>

    <template #rodape>
      <D3Rodape />
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/fredoka";
import "./_tokens.scss";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import D3Cabecalho from "./componentes/D3Cabecalho.vue";
import D3Rodape from "./componentes/D3Rodape.vue";
import D3SecaoBandeja from "./secoes/D3SecaoBandeja.vue";
import D3SecaoCapa from "./secoes/D3SecaoCapa.vue";
import D3SecaoDegraus from "./secoes/D3SecaoDegraus.vue";
import D3SecaoFileira from "./secoes/D3SecaoFileira.vue";

// Antes de tudo: liga os tokens do estilo ao <html>
useEstiloAtivo("3d", { esquema: "light" });

const INICIO = "/direcoes/3d";
</script>

<style scoped lang="scss">
@use "@/assets/styles/base/breakpoints" as *;

// Layout da moldura: a MolduraDirecao não tem estilo próprio
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.moldura :deep(.moldura__conteudo) {
  flex: 1;
  min-width: 0;
}

// O degradê pão, tomate e alface envolve as quatro seções. Ritmo: --space-7 entre seções (--space-8 a
// partir de lg), menos entre a capa e a fileira (--space-6), para o palco aparecer acima da dobra
.d3-fundo {
  --ritmo: var(--space-7);

  display: flex;
  flex-direction: column;
  gap: var(--ritmo);
  padding-bottom: var(--space-8);
  background: var(--3d-fundo);

  @include up(lg) {
    --ritmo: var(--space-8);
  }
}

.d3-fundo > .d3-fileira {
  margin-top: calc(var(--space-6) - var(--ritmo));
}
</style>
