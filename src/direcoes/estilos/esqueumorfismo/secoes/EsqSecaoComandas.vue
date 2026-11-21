<!-- Os lanches como comandas presas no trilho do passe, todas à vista: sem carrossel, setas nem
     paginação [H6][H8][H9]. Cada li desenha o próprio trecho do trilho; os vizinhos se juntam numa
     barra por fileira. Com a categoria vazia, fica o trilho com uma comanda em branco e o aviso. -->
<template>
  <section data-secao="comandas" aria-labelledby="esq-comandas-titulo" class="esq-comandas">
    <h2 id="esq-comandas-titulo" class="esq-comandas__titulo">{{ lanches.rotulo }}</h2>

    <ul v-if="!lanches.vazia" class="esq-comandas__lista" role="list">
      <li
        v-for="produto in lanches.itens"
        :key="`${produto.category}-${produto.id}`"
        class="esq-comandas__gancho"
      >
        <EsqComanda :produto="produto" />
      </li>
    </ul>

    <div v-else class="esq-comandas__vazio">
      <div class="esq-comandas__gancho">
        <div class="esq-comandas__branco">
          <p>{{ TEXTOS.vazio }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import EsqComanda from "../componentes/EsqComanda.vue";

const { categoria } = useCardapio();
const lanches = categoria("foods");
</script>

<style scoped lang="scss">
@use "../scss/secao-comandas";
</style>
