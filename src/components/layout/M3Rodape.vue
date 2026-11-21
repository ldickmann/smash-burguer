<!-- O <footer> da loja (cópia de produção do M3Rodape da Home, SPEC-material §4.1 e §5.10): marca,
     descrição e direitos, estes em três itens, sem "·" (§10.2); as redes saíram (os links eram
     genéricos). Na Home, os contatos ficam na seção "onde", logo acima; nas outras rotas, a prop
     `contatos` mostra a mesma lista agrupada de horário e contato (decisão g). -->
<template>
  <footer class="m3-rodape" :class="{ 'm3-rodape--contatos': contatos }">
    <div class="m3-rodape__interno container">
      <div class="m3-rodape__marca">
        <p class="m3-rodape__nome">{{ MARCA }}</p>
        <p class="m3-rodape__descricao">{{ DESCRICAO }}</p>
      </div>
      <ul v-if="contatos" class="m3-rodape__contatos" role="list">
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
      <ul class="m3-rodape__direitos" role="list">
        <li v-for="parte in DIREITOS" :key="parte">{{ parte }}</li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import M3ItemSegmentado from "@/components/ui/M3ItemSegmentado.vue";
import { itensOnde } from "@/utils/contatos";
import { DESCRICAO, DIREITOS, MARCA, TEXTOS } from "@/utils/textosLoja";

defineProps({
  contatos: {
    type: Boolean,
    default: false,
  },
});

// Os mesmos itens da seção "onde" da Home (src/utils/contatos.js)
const itens = itensOnde(TEXTOS).map((item) => ({ ...item, icone: item.icone ?? ["fas", "circle-info"] }));
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/m3-rodape";
</style>
