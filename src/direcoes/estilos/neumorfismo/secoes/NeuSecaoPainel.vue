<!-- Painel (a ousadia): o único aparelho elevado da página. Teclas de rádio com os lanches à vista,
     um visor fundo com o escolhido e a régua de adicionais. Sem carrossel e sem leitura de preço no
     cabeçalho: cada tecla já mostra o próprio preço. Com a lista vazia, fica o caminho para o
     cardápio. -->
<template>
  <section data-secao="painel" aria-labelledby="neu-painel-titulo" class="neu-painel container">
    <div class="neu-painel__aparelho">
      <h2 id="neu-painel-titulo" class="neu-painel__titulo">{{ rotulo }}</h2>

      <template v-if="produto">
        <div class="neu-painel__corpo">
          <NeuTeclado
            :produtos="lanches"
            :model-value="idSelecionado"
            :legenda="TEXTOS.painelLegenda"
            @update:model-value="selecionar"
          />
          <NeuVisor class="neu-painel__visor" :produto="produto" :pulsar="interagiu" />

          <div v-if="adicionais.length" class="neu-regua">
            <h3 class="neu-regua__titulo">{{ TEXTOS.adicionais }}</h3>
            <ul class="neu-regua__lista" role="list">
              <li v-for="adicional in adicionais" :key="adicional.id" class="neu-regua__item">
                <span class="neu-regua__nome">{{ adicional.name }}</span>
                <span class="neu-regua__preco tabular">{{ adicional.precoTexto }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <div v-else class="neu-painel__vazio">
        <p class="neu-painel__vazio-texto">{{ TEXTOS.vazio }}</p>
        <NeuAcao para="/menu">{{ HERO.acao }}</NeuAcao>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { CATEGORIAS, HERO } from "../../../compartilhado/dados";
import { useCardapio } from "../../../compartilhado/useCardapio";
import { TEXTOS } from "../textos";
import { useLancheNoVisor } from "../useLancheNoVisor";
import NeuAcao from "../componentes/NeuAcao.vue";
import NeuTeclado from "../componentes/NeuTeclado.vue";
import NeuVisor from "../componentes/NeuVisor.vue";

const produtos = useProductsStore();
const { adicionais: todosAdicionais } = useCardapio();

const rotulo = CATEGORIAS.find((categoria) => categoria.chave === "foods").rotulo;
const lanches = computed(() => produtos.foods ?? []);
const adicionais = computed(() => todosAdicionais.value.lanche);

const { idSelecionado, produto, interagiu, selecionar } = useLancheNoVisor(lanches);
</script>

<style scoped lang="scss">
@use "../scss/secao-painel";
</style>
