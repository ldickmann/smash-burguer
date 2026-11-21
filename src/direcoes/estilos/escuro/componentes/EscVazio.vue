<!-- Estado vazio de uma categoria (os textos do MenuView), com o caminho para o cardápio. Em painel N12;
     com `plano`, direto na faixa da junto, que já é o degrau. -->
<template>
  <div class="esc-vazio" :class="{ 'esc-vazio--plano': plano }">
    <component :is="`h${nivel}`" class="esc-vazio__titulo">{{ titulo }}</component>
    <p class="esc-vazio__texto">{{ texto }}</p>
    <EscBotao :para="para" variante="tonal">{{ rotuloAcao }}</EscBotao>
  </div>
</template>

<script setup>
import { HERO } from "../../../compartilhado/dados";
import EscBotao from "./EscBotao.vue";

defineProps({
  titulo: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
  nivel: {
    type: Number,
    default: 3,
    validator: (valor) => valor >= 2 && valor <= 6,
  },
  para: {
    type: String,
    default: "/menu",
  },
  rotuloAcao: {
    type: String,
    default: HERO.acao,
  },
  plano: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@use "../scss/vazio";
</style>
