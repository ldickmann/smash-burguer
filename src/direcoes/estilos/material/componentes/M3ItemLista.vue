<!-- Item de lista segmentada [66][81]: miniatura na forma do grupo (círculo nas bebidas, flor na
     sobremesa), nome, descrição, preço e "Adicionar" tonal, que abre o modal Personalizar real.
     O item não é ação: não tem hover próprio. -->
<template>
  <li class="m3-item">
    <M3Foto
      class="m3-item__foto"
      :imagem="imagem"
      :alt="produto.name"
      :forma="forma"
      :falhou="imagemFalhou"
      :icone="['fas', 'utensils']"
      @erro="imagemFalhou = true"
    />
    <div class="m3-item__texto">
      <p class="m3-item__titulo">{{ produto.name }}</p>
      <p v-if="produto.description" class="m3-item__descricao">{{ produto.description }}</p>
      <p v-if="apoio" class="m3-item__apoio">{{ apoio }}</p>
    </div>
    <p class="m3-item__preco tabular">{{ preco }}</p>
    <M3Botao
      class="m3-item__acao"
      variante="tonal"
      tamanho="s"
      :retorno="adicionado"
      v-bind="atributosAdicionar"
      @click="personalizar(produto, contexto)"
    >
      Adicionar
    </M3Botao>
  </li>
</template>

<script setup>
import { useCartaoProduto } from "../../../compartilhado/useCartaoProduto";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import M3Botao from "./M3Botao.vue";
import M3Foto from "./M3Foto.vue";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  forma: {
    type: String,
    default: "circulo",
  },
  apoio: {
    type: String,
    default: "",
  },
});

const personalizar = usePersonalizar();
const { imagem, preco, imagemFalhou, adicionado, contexto, atributosAdicionar } = useCartaoProduto(
  () => props.produto,
  { sizes: "56px" }
);
</script>

<style scoped lang="scss">
@use "../scss/item-lista";
</style>
