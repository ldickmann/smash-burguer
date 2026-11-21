<!-- Onde e quando: horário, endereço com mapa, WhatsApp e e-mail numa lista agrupada sempre aberta
     [66][81], fáceis de achar e de tocar. É o último bloco antes do rodapé. -->
<template>
  <section data-secao="onde" aria-labelledby="m3-onde-titulo" class="m3-onde">
    <h2 id="m3-onde-titulo" class="m3-onde__titulo">{{ TEXTOS.ondeTitulo }}</h2>
    <ul class="m3-onde__lista" role="list">
      <M3ItemSegmentado
        v-for="item in itens"
        :key="item.chave"
        :titulo="item.titulo"
        :apoio="item.apoio"
        :href="item.href"
        :externo="item.externo"
        :icone="item.icone"
      />
    </ul>
  </section>
</template>

<script setup>
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { itensOnde } from "../contatos";
import { TEXTOS } from "../textos";
import M3ItemSegmentado from "../componentes/M3ItemSegmentado.vue";

const itens = itensOnde(TEXTOS, { iconeHorario: faClock }).map((item) => ({
  ...item,
  icone: item.icone ?? ["fas", "circle-info"],
}));
</script>

<style scoped lang="scss">
@use "../scss/secao-onde";
</style>
