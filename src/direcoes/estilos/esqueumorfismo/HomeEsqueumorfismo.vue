<!-- Home em esqueumorfismo, "O passe da cozinha", rodada 2 (só desenvolvimento). Só composição: a
     coifa de inox, o lanche na chapa, as comandas no trilho, o expositor de bebidas e a impressora
     que imprime o carrinho de verdade, presa ao lado do balcão (docs/direcoes/desenho/esqueumorfismo.md). -->
<template>
  <MolduraDirecao estilo="esqueumorfismo">
    <template #topo>
      <EsqCoifa :inicio="INICIO" />
    </template>

    <EsqSecaoChapa />
    <div class="esq-balcao">
      <div class="esq-balcao__grade container">
        <div class="esq-balcao__linha">
          <EsqSecaoComandas />
          <EsqSecaoExpositor />
        </div>
        <EsqSecaoCupom class="esq-balcao__cupom" />
      </div>
    </div>

    <template #rodape>
      <EsqRodape />
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource/courier-prime/400.css";
import "@fontsource/courier-prime/700.css";
import "./_tokens.scss";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import EsqCoifa from "./componentes/EsqCoifa.vue";
import EsqRodape from "./componentes/EsqRodape.vue";
import EsqSecaoChapa from "./secoes/EsqSecaoChapa.vue";
import EsqSecaoComandas from "./secoes/EsqSecaoComandas.vue";
import EsqSecaoCupom from "./secoes/EsqSecaoCupom.vue";
import EsqSecaoExpositor from "./secoes/EsqSecaoExpositor.vue";

// Antes de tudo: liga os tokens do estilo ao <html>
useEstiloAtivo("esqueumorfismo", { esquema: "light" });

const INICIO = "/direcoes/esqueumorfismo";
</script>

<style scoped lang="scss">
@use "./scss/balcao";
</style>
