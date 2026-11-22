<!-- Bebidas e sobremesas numa lista segmentada dentro de um contêiner [66][81]: a variedade da casa na
     própria Home. A forma da miniatura marca o grupo: o círculo é o copo ou a lata visto de cima; a
     flor, a bola de sorvete. Grupo vazio some com o h3; os dois vazios deixam o h2 e o aviso. -->
<template>
  <section data-secao="bebidas-e-sobremesas" aria-labelledby="m3-bebidas-titulo" class="m3-acompanha">
    <h2 id="m3-bebidas-titulo" class="m3-acompanha__titulo">{{ titulo }}</h2>

    <div v-for="grupo in grupos" :key="grupo.chave" class="m3-acompanha__grupo">
      <h3 :id="`m3-grupo-${grupo.chave}`" class="m3-acompanha__subtitulo">{{ grupo.rotulo }}</h3>
      <ul class="m3-acompanha__lista" role="list" :aria-labelledby="`m3-grupo-${grupo.chave}`">
        <M3ItemLista v-for="produto in grupo.itens" :key="produto.id" :produto="produto" :forma="grupo.forma" />
      </ul>
    </div>

    <p v-if="!grupos.length" class="m3-acompanha__vazio">{{ TEXTOS.vazio }}</p>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import M3ItemLista from "../componentes/M3ItemLista.vue";

const { categorias } = useCardapio();

const FORMAS = { drinks: "circulo", desserts: "flor" };
const categoriaDe = (chave) => categorias.value.find((c) => c.chave === chave);

// "Bebidas e sobremesas", composto dos rótulos reais das categorias (dados.js)
const titulo = computed(() => `${categoriaDe("drinks").rotulo} e ${categoriaDe("desserts").rotulo.toLowerCase()}`);

// Sem a contagem dos adicionais na sobremesa (etapa 5a): os chips de "Monte o seu", logo acima, já
// mostram quais são
const grupos = computed(() =>
  ["drinks", "desserts"]
    .map(categoriaDe)
    .filter((categoria) => !categoria.vazia)
    .map((categoria) => ({
      chave: categoria.chave,
      rotulo: categoria.rotulo,
      itens: categoria.itens,
      forma: FORMAS[categoria.chave],
    }))
);
</script>

<style scoped lang="scss">
@use "../scss/secao-bebidas-sobremesas";
</style>
