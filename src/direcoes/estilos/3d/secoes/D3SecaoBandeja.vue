<!-- Bandeja: o que não vai em pilha (o lanche fora do mapa de camadas, as bebidas e a sobremesa) em pé
     numa superfície de argila, numa fileira única de alturas diferentes [H21][H22][H27]. A altura do
     quadro diz o objeto (bebida em pé, sobremesa quase quadrada, porção deitada); as fotos se apoiam
     num chão comum, com a sombra de contato, como a camada da frente sobre a de trás [D30][D3]. -->
<template>
  <section data-secao="bandeja" aria-labelledby="d3-bandeja-titulo" class="d3-bandeja">
    <div class="container">
      <h2 id="d3-bandeja-titulo" class="d3-bandeja__titulo">{{ TEXTOS.bandeja.titulo }}</h2>
      <div v-if="itens.length" class="d3-bandeja__superficie">
        <ul class="d3-bandeja__fileira" role="list">
          <li v-for="item in itens" :key="`${item.origem}-${item.produto.id}`" class="d3-bandeja__item">
            <D3Ficha
              :produto="item.produto"
              foto
              :descricao="false"
              :proporcao="PROPORCAO_FOTO[item.origem]"
              :detalhe="item.detalhe"
              :tamanhos="TAMANHOS"
            />
          </li>
        </ul>
      </div>
      <p v-else class="d3-bandeja__vazio">{{ TEXTOS.vazio }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { TEXTOS, adicionais } from "../textos";
import { useFileira } from "../usePilha";
import D3Ficha from "../componentes/D3Ficha.vue";

// Proporção do quadro da foto pela lista de origem (dado real): porção deitada, bebida em pé,
// sobremesa quase quadrada. Decisão de desenho, sem fonte: só usa a categoria
const PROPORCAO_FOTO = {
  foods: [4, 3],
  drinks: [3, 4],
  desserts: [4, 5],
};

// A versão de 480 px no desktop; metade da tela no celular
const TAMANHOS = "(min-width: 1280px) 200px, (min-width: 768px) 17vw, 45vw";

const produtos = useProductsStore();
const { foraDaPilha } = useFileira();

const itens = computed(() => {
  const n = produtos.dessertAdditionals?.length ?? 0;
  return [
    ...foraDaPilha.value.map((produto) => ({ produto, origem: "foods", detalhe: "" })),
    ...(produtos.drinks ?? []).map((produto) => ({ produto, origem: "drinks", detalhe: "" })),
    ...(produtos.desserts ?? []).map((produto) => ({ produto, origem: "desserts", detalhe: n > 0 ? adicionais(n) : "" })),
  ];
});
</script>

<style scoped lang="scss">
@use "../scss/secao-bandeja";
</style>
