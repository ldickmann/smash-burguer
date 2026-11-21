<!-- Junto com o lanche: as bebidas e a sobremesa numa faixa N12 de ponta a ponta, que é ela mesma o
     degrau de luz [87][81]. As linhas ficam direto na faixa, sem caixa, separadas só pelo espaço (no
     escuro, o divisor fino some [46]). Grupo vazio some; os dois vazios dão o estado vazio, plano. -->
<template>
  <section data-secao="junto" aria-labelledby="esc-junto-titulo" class="esc-junto">
    <div class="container">
      <h2 id="esc-junto-titulo" class="esc-junto__titulo">{{ TEXTOS.juntoTitulo }}</h2>

      <div v-if="grupos.length" class="esc-junto__grupos">
        <div v-for="grupo in grupos" :key="grupo.chave" class="esc-junto__grupo" :data-grupo="grupo.chave">
          <h3 class="esc-junto__grupo-titulo">{{ grupo.rotulo }}</h3>
          <ul class="esc-junto__lista" role="list">
            <li v-for="produto in grupo.itens" :key="produto.id">
              <EscLinha :produto="produto" :quantidade-no-pedido="quantidadeNoPedido(produto)" />
            </li>
          </ul>
        </div>
      </div>
      <EscVazio v-else :titulo="REAIS.vazioTitulo" :texto="REAIS.vazioTexto" :nivel="3" plano />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCardapio } from "../../../compartilhado/useCardapio";
import EscLinha from "../componentes/EscLinha.vue";
import EscVazio from "../componentes/EscVazio.vue";
import { REAIS, TEXTOS } from "../textos";
import { useNoPedido } from "../useNoPedido";

const { categorias } = useCardapio();
const grupos = computed(() => categorias.value.filter((c) => c.chave !== "foods" && !c.vazia));
const { quantidadeNoPedido } = useNoPedido();
</script>

<style scoped lang="scss">
@use "../scss/secao-junto";
</style>
