<!-- O expositor refrigerado aberto do balcão, com as bebidas e a sobremesa: moldura de inox, interior
     escuro com a luz fria no alto e uma prateleira por categoria. Sem porta, vidro nem puxador: nada
     translúcido e nada que prometa um gesto [E6][E15][E26]. A prateleira vazia continua, com o aviso
     numa etiqueta [H16]. -->
<template>
  <section data-secao="expositor" aria-labelledby="esq-expositor-titulo" class="esq-expositor">
    <h2 id="esq-expositor-titulo" class="esq-expositor__titulo">{{ TEXTOS.expositor.titulo }}</h2>

    <div class="esq-expositor__moldura">
      <div class="esq-expositor__interior">
        <div
          v-for="prateleira in prateleiras"
          :key="prateleira.chave"
          class="esq-prateleira"
          :style="{ '--esq-itens': Math.max(prateleira.itens.length, 1) }"
        >
          <h3 :id="`esq-prateleira-${prateleira.chave}`" class="esq-prateleira__titulo">{{ prateleira.rotulo }}</h3>
          <ul
            v-if="!prateleira.vazia"
            class="esq-prateleira__lista"
            role="list"
            :aria-labelledby="`esq-prateleira-${prateleira.chave}`"
          >
            <li v-for="produto in prateleira.itens" :key="`${produto.category}-${produto.id}`" class="esq-prateleira__item">
              <EsqItemExpositor :produto="produto" :adicionais="prateleira.adicionais" />
            </li>
          </ul>
          <EsqEtiqueta v-else class="esq-prateleira__vazia">
            <p>{{ TEXTOS.vazio }}</p>
          </EsqEtiqueta>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import EsqEtiqueta from "../componentes/EsqEtiqueta.vue";
import EsqItemExpositor from "../componentes/EsqItemExpositor.vue";

const { categorias, adicionais } = useCardapio();

// Bebidas e Sobremesas, na ordem do MenuView; a contagem dos adicionais só na sobremesa
const prateleiras = computed(() =>
  categorias.value
    .filter((categoria) => categoria.chave !== "foods")
    .map((categoria) => ({
      ...categoria,
      adicionais: categoria.chave === "desserts" ? adicionais.value.sobremesa.length : 0,
    }))
);
</script>

<style scoped lang="scss">
@use "../scss/secao-expositor";
</style>
