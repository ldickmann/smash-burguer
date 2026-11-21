<!-- Acompanhamentos: as bebidas e a sobremesa em poços redondos prensados no kraft, direto na
     superfície, sem contêiner elevado (a bandeja de polpa das bebidas do delivery). Um grupo vazio
     some com o título; os dois vazios deixam o caminho para o cardápio. -->
<template>
  <section
    data-secao="acompanhamentos"
    aria-labelledby="neu-acompanhamentos-titulo"
    class="neu-acompanhamentos container"
  >
    <h2 id="neu-acompanhamentos-titulo" class="neu-acompanhamentos__titulo">{{ TEXTOS.acompanhamentosTitulo }}</h2>

    <div v-if="grupos.length" class="neu-acompanhamentos__grupos" :style="{ '--neu-grupos-colunas': colunas }">
      <template v-for="(grupo, indice) in grupos" :key="grupo.chave">
        <span v-if="indice > 0" class="neu-acompanhamentos__sulco" aria-hidden="true" />
        <div class="neu-grupo">
          <h3 :id="`neu-grupo-${grupo.chave}`" class="neu-grupo__titulo">{{ grupo.rotulo }}</h3>
          <ul class="neu-grupo__lista" role="list" :aria-labelledby="`neu-grupo-${grupo.chave}`">
            <li v-for="item in grupo.itens" :key="item.id" class="neu-grupo__item">
              <NeuVaga :produto="item" />
            </li>
          </ul>
        </div>
      </template>
    </div>

    <div v-else class="neu-acompanhamentos__vazio">
      <p class="neu-acompanhamentos__vazio-texto">{{ TEXTOS.vazio }}</p>
      <NeuAcao para="/menu">{{ HERO.acao }}</NeuAcao>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { HERO } from "../../../compartilhado/dados";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import NeuAcao from "../componentes/NeuAcao.vue";
import NeuVaga from "../componentes/NeuVaga.vue";

const { categorias } = useCardapio();

// Bebidas e Sobremesas, na ordem do MenuView; a categoria vazia sai com o título
const grupos = computed(() =>
  categorias.value.filter((categoria) => ["drinks", "desserts"].includes(categoria.chave) && !categoria.vazia)
);

// A partir de lg, cada grupo ocupa a largura proporcional aos itens, com o sulco entre eles
const colunas = computed(() =>
  grupos.value.map((grupo) => `minmax(0, ${grupo.quantidade}fr)`).join(" auto ")
);
</script>

<style scoped lang="scss">
@use "../scss/secao-acompanhamentos";
</style>
