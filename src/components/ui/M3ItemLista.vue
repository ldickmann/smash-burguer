<!-- Item de lista segmentada [66][81] (cópia de produção do M3ItemLista da Home, SPEC-material
     §4.1): miniatura na forma do grupo (círculo nas bebidas, flor na sobremesa), nome, descrição,
     preço e "Adicionar" tonal, que abre o modal Personalizar real. O botão é o BaseButton
     secondary (tonal) com o retorno, no lugar do M3Botao. O item não é ação: não tem hover próprio. -->
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
    <BaseButton
      class="m3-item__acao"
      variant="secondary"
      :retorno="adicionado"
      v-bind="atributosAdicionar"
      @click="personalizar(produto, contexto)"
    >
      Adicionar
    </BaseButton>
  </li>
</template>

<script setup>
import { useCartaoProduto } from "@/composables/useCartaoProduto";
import { usePersonalizar } from "@/composables/usePersonalizar";
import BaseButton from "./BaseButton.vue";
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
@use "@/assets/styles/components/ui/m3-item-lista";
</style>
