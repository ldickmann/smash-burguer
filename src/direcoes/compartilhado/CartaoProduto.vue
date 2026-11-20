<!-- Card sem marcação própria: entrega a lógica do useCartaoProduto pelo slot, e cada estilo
     desenha o próprio card. -->
<template>
  <slot
    :imagem="imagem"
    :preco="preco"
    :imagemFalhou="imagemFalhou"
    :adicionado="adicionado"
    :contexto="contexto"
    :aoFalharImagem="aoFalharImagem"
  />
</template>

<script setup>
import { TAMANHOS_CARD, useCartaoProduto } from "./useCartaoProduto";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  tamanhos: {
    type: String,
    default: TAMANHOS_CARD,
  },
});

const { imagem, preco, imagemFalhou, adicionado, contexto } = useCartaoProduto(
  () => props.produto,
  { sizes: props.tamanhos }
);

const aoFalharImagem = () => (imagemFalhou.value = true);
</script>
