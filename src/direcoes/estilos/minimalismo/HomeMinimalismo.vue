<!-- Home em minimalismo, "Só o que importa", rodada 2 (só desenvolvimento). Só composição: a página
     inteira é um cardápio tipográfico em preto e branco, e a única cor é uma foto de comida por vez,
     aberta com "Ver foto" (docs/direcoes/desenho/minimalismo.md). -->
<template>
  <MolduraDirecao estilo="minimalismo">
    <template #topo>
      <MnTopo :inicio="INICIO" />
    </template>

    <MnSecaoHero :ids="SECOES" />
    <MnSecaoCategoria v-for="(id, chave) in SECOES" :key="chave" :chave="chave" :id="id" />
    <MnSecaoAtendimento />

    <template #rodape>
      <MnRodape :inicio="INICIO" />
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/archivo/wdth.css";
import "./_tokens.scss";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import { useCardapio } from "../../compartilhado/useCardapio";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import { criarFotoAberta } from "./useFotoAberta";
import MnRodape from "./componentes/MnRodape.vue";
import MnTopo from "./componentes/MnTopo.vue";
import MnSecaoAtendimento from "./secoes/MnSecaoAtendimento.vue";
import MnSecaoCategoria from "./secoes/MnSecaoCategoria.vue";
import MnSecaoHero from "./secoes/MnSecaoHero.vue";

// Antes de tudo: liga os tokens do estilo ao <html>
useEstiloAtivo("minimalismo", { esquema: "light" });

const INICIO = "/direcoes/minimalismo";

// data-secao de cada categoria, na ordem do MenuView; o h2 de cada uma é mn-<id>
const SECOES = { foods: "hamburgueres", drinks: "bebidas", desserts: "sobremesas" };

// Uma foto por vez, nas três categorias: começa aberta a do primeiro lanche com imagem
criarFotoAberta(useCardapio().categorias);
</script>

<style scoped lang="scss">
// Layout da moldura: a MolduraDirecao não tem estilo próprio
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  background: var(--min-branco);
}

.moldura :deep(.moldura__conteudo) {
  flex: 1;
  min-width: 0;
}
</style>
