<!-- A comanda do lanche, pendurada no trilho: o nome, a foto, os ingredientes como as linhas do ticket
     [E31][E33], o preço e o "Adicionar", que abre o Personalizar real. Sem ingredientes, mostra a
     descrição; sem os dois, só o nome e o preço. O papel tem o picote embaixo [E34]. -->
<template>
  <article class="esq-comanda" :aria-labelledby="idNome">
    <div class="esq-comanda__papel">
      <h3 :id="idNome" class="esq-comanda__nome">{{ produto.name }}</h3>
      <EsqFoto
        class="esq-comanda__foto"
        :imagem="imagem"
        :alt="produto.name"
        :falhou="imagemFalhou"
        @erro="imagemFalhou = true"
      />
      <ul v-if="linhas.length" class="esq-comanda__linhas" role="list" :aria-label="TEXTOS.comandas.ingredientes">
        <li v-for="(linha, indice) in linhas" :key="`${indice}-${linha}`" class="esq-comanda__linha">{{ linha }}</li>
      </ul>
      <p v-else-if="produto.description" class="esq-comanda__descricao">{{ produto.description }}</p>
      <div class="esq-comanda__total">
        <p class="esq-comanda__preco tabular">{{ preco }}</p>
        <EsqBotao v-bind="atributosAdicionar" @click="personalizar(produto, contexto)">
          {{ TEXTOS.adicionar }}
        </EsqBotao>
      </div>
      <EsqCarimbo class="esq-comanda__carimbo" :visivel="adicionado" />
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { useCartaoProduto } from "../../../compartilhado/useCartaoProduto";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import { TEXTOS } from "../textos";
import EsqBotao from "./EsqBotao.vue";
import EsqCarimbo from "./EsqCarimbo.vue";
import EsqFoto from "./EsqFoto.vue";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
});

const personalizar = usePersonalizar();
const { imagem, preco, imagemFalhou, adicionado, contexto, atributosAdicionar } = useCartaoProduto(
  () => props.produto,
  { sizes: "(min-width: 1280px) 240px, (min-width: 1024px) 300px, 96px" }
);

const idNome = computed(() => `esq-comanda-${props.produto.category ?? "item"}-${props.produto.id}`);

// As linhas do ticket: os ingredientes do produto (um produto do painel pode vir sem eles)
const linhas = computed(() =>
  Array.isArray(props.produto.ingredients) ? props.produto.ingredients.filter(Boolean) : []
);
</script>

<style scoped lang="scss">
@use "../scss/comanda";
</style>
