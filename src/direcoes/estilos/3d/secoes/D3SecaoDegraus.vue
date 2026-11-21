<!-- Degraus: "Escolha, personalize e peça." em três lajes de argila em escada, com a elevação crescendo
     junto (G3) [D3]. Cada laje tem só o verbo e o objeto real do passo: o link do cardápio, os
     adicionais como objetos de argila [D40][D4] (o que se pode acrescentar e quanto custa [H23][H24])
     e o carrinho com a contagem. É a chamada final para pedir [D46][D61][D60]. -->
<template>
  <section data-secao="degraus" aria-labelledby="d3-degraus-titulo" class="d3-degraus">
    <div class="container">
      <h2 id="d3-degraus-titulo" class="d3-degraus__titulo">{{ FRASE_CARDAPIO }}</h2>
      <ol class="d3-degraus__lista">
        <li class="d3-degraus__passo">
          <D3Degrau :titulo="escolha" titulo-id="d3-degrau-escolha" :degrau="1">
            <D3Inflado class="d3-degraus__link" para="/menu" cor="carne">{{ HERO.acao }}</D3Inflado>
          </D3Degrau>
        </li>
        <li class="d3-degraus__passo">
          <D3Degrau :titulo="personalize" titulo-id="d3-degrau-personalize" :degrau="2">
            <ul v-if="extras.length" class="d3-degraus__extras" role="list" :aria-label="TEXTOS.extras.rotulo">
              <D3ObjetoExtra
                v-for="extra in extras"
                :key="extra.id"
                :nome="extra.name"
                :preco="Number(extra.price)"
                :forma="extra.forma"
                :cor="extra.cor"
              />
            </ul>
            <p v-else class="d3-degraus__vazio">{{ TEXTOS.vazio }}</p>
          </D3Degrau>
        </li>
        <li class="d3-degraus__passo">
          <D3Degrau :titulo="peca" titulo-id="d3-degrau-peca" :degrau="3">
            <D3Inflado class="d3-degraus__link" para="/cart" cor="carne" :icone="['fas', 'shopping-cart']">
              <span aria-hidden="true">{{ TEXTOS.carrinho.titulo }}</span>
              <span class="visually-hidden">{{ nome }}</span>
              <Transition name="d3-selo">
                <span v-if="quantidade > 0" class="d3-degraus__selo tabular" aria-hidden="true">{{ texto }}</span>
              </Transition>
            </D3Inflado>
          </D3Degrau>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { formatItemCount } from "@/utils/formatters";
import { FRASE_CARDAPIO, HERO } from "../../../compartilhado/dados";
import { useContadorCarrinho } from "../../../compartilhado/useContadorCarrinho";
import { TEXTOS } from "../textos";
import { formaDoExtra } from "../usePilha";
import D3Degrau from "../componentes/D3Degrau.vue";
import D3Inflado from "../componentes/D3Inflado.vue";
import D3ObjetoExtra from "../componentes/D3ObjetoExtra.vue";

const [escolha, personalize, peca] = TEXTOS.degraus.passos;

const produtos = useProductsStore();
// Cada adicional é a camada que ele põe no lanche (EXTRA_CAMADA, cópia do BurgerStack)
const extras = computed(() => (produtos.foodAdditionals ?? []).map((extra) => ({ ...extra, ...formaDoExtra(extra.name) })));

// "Seu carrinho, 2 itens" ou "Seu carrinho está vazio" (textos reais do CartView.vue): o nome começa
// pelo texto visível (2.5.3) e não casa com o nome do carrinho do cabeçalho, que é o do contrato.
// O nome inteiro fica num só trecho escondido, e o texto visível sai da árvore de acessibilidade
const { quantidade, texto } = useContadorCarrinho();
const nome = computed(() =>
  quantidade.value > 0 ? `${TEXTOS.carrinho.titulo}, ${formatItemCount(quantidade.value)}` : TEXTOS.carrinho.vazio
);
</script>

<style scoped lang="scss">
@use "../scss/secao-degraus";
</style>
