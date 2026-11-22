<!-- "Monte o seu" (etapa 5a): o que se pode acrescentar e quanto custa, antes do modal. Os 12 adicionais
     em chips estáticos (informação, não ação: sem foco, sem camada de estado e sem selecionado), em dois
     grupos, e o caminho para o cardápio, onde se escolhe e se personaliza. Na superfície, sem contêiner
     nem movimento. Grupo sem adicionais ou sem a categoria some com o h3. -->
<template>
  <section data-secao="monte-o-seu" aria-labelledby="m3-monte-titulo" class="m3-monte container">
    <div class="m3-monte__cabecalho">
      <h2 id="m3-monte-titulo" class="m3-monte__titulo">{{ TEXTOS.monteTitulo }}</h2>
      <p class="m3-monte__frase">{{ FRASE_CARDAPIO }}</p>
    </div>

    <div v-if="grupos.length" class="m3-monte__grupos">
      <div v-for="grupo in grupos" :key="grupo.chave" class="m3-monte__grupo">
        <h3 :id="`m3-monte-${grupo.chave}`" class="m3-monte__subtitulo">{{ grupo.titulo }}</h3>
        <ul class="m3-monte__chips" role="list" :aria-labelledby="`m3-monte-${grupo.chave}`">
          <li v-for="adicional in grupo.itens" :key="adicional.id" class="m3-monte__chip">
            <span class="m3-monte__nome">{{ adicional.name }}</span>
            <span class="m3-monte__preco tabular">+ {{ adicional.precoTexto }}</span>
          </li>
        </ul>
      </div>
    </div>

    <M3Botao class="m3-monte__ver" variante="texto" para="/menu">{{ HERO.acao }}</M3Botao>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { FRASE_CARDAPIO, HERO } from "../../../compartilhado/dados";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import M3Botao from "../componentes/M3Botao.vue";

const { adicionais, categoria } = useCardapio();

// Dois grupos fixos: a chave do adicional, a categoria onde ele se acrescenta e o título
const GRUPOS = [
  { chave: "lanche", categoria: categoria("foods"), titulo: TEXTOS.monteLanche },
  { chave: "sobremesa", categoria: categoria("desserts"), titulo: TEXTOS.monteSobremesa },
];

// O grupo aparece com adicionais e com a categoria dele não vazia (não há onde acrescentar)
const grupos = computed(() =>
  GRUPOS.filter((grupo) => adicionais.value[grupo.chave].length > 0 && !grupo.categoria.value.vazia).map(
    (grupo) => ({ chave: grupo.chave, titulo: grupo.titulo, itens: adicionais.value[grupo.chave] })
  )
);
</script>

<style scoped lang="scss">
@use "../scss/secao-monte";
</style>
