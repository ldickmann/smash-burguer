<!-- Horário e contato, a seção "onde" (cópia de produção do M3SecaoOnde da Home, SPEC-material
     §5.2): horário, endereço com mapa, WhatsApp e e-mail numa lista agrupada sempre aberta [66][81],
     fáceis de achar e de tocar. É o último bloco antes do rodapé, que na Home não repete a lista
     (decisão g). Os itens são os mesmos do rodapé das outras rotas (src/utils/contatos.js). -->
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
import { itensOnde } from "@/utils/contatos";
import { TEXTOS } from "@/utils/textosLoja";
import M3ItemSegmentado from "@/components/ui/M3ItemSegmentado.vue";

const itens = itensOnde(TEXTOS).map((item) => ({ ...item, icone: item.icone ?? ["fas", "circle-info"] }));
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/home/secao-onde";
</style>
