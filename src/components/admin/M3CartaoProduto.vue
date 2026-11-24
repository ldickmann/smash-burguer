<!-- Card de produto do painel (desenho do admin, §5.7 e §7.1): a anatomia do filled card da loja
     (M3CartaoLanche) [63], com a foto recuada, o nome, a descrição e o preço, sem o split, a folha e o
     usePersonalizar: o admin não compra. Sem o useCartaoProduto, que traz o "Adicionado" e o
     temporizador do fluxo de compra. As ações ("Editar" e "Excluir") vêm pelo slot acoes. Na
     horizontal abaixo de sm; vertical a partir dele. Sem hover nem movimento: só os botões reagem. -->
<template>
  <article class="m3-cartao-produto">
    <!-- A grade mistura as três categorias: na falha, o ícone utensils serve a todas -->
    <M3Foto
      class="m3-cartao-produto__foto"
      :imagem="imagem"
      :alt="produto.name"
      forma="cartao"
      :icone="['fas', 'utensils']"
      :falhou="imagemFalhou"
      @erro="imagemFalhou = true"
    />
    <div class="m3-cartao-produto__corpo">
      <component :is="`h${nivelTitulo}`" class="m3-cartao-produto__nome">{{ produto.name }}</component>
      <p v-if="produto.description" class="m3-cartao-produto__descricao">{{ produto.description }}</p>
      <p class="m3-cartao-produto__preco tabular">{{ preco }}</p>
      <div class="m3-cartao-produto__acoes">
        <slot name="acoes"></slot>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from "vue";
import { responsiveImage } from "@/composables/useResponsiveImage";
import { formatPrice } from "@/utils/formatters";
import M3Foto from "@/components/ui/M3Foto.vue";

const props = defineProps({
  // O produto do cardápio: name, description, price e image
  produto: {
    type: Object,
    required: true,
  },
  // O nível do título: h2 na grade de Produtos
  nivelTitulo: {
    type: [Number, String],
    default: 2,
  },
});

// Estimativa pela grade de Produtos (1, 2, 3 e 4 colunas; 7rem na horizontal abaixo de sm)
const TAMANHOS = "(min-width: 1280px) 280px, (min-width: 768px) 30vw, (min-width: 480px) 45vw, 7rem";

const imagem = computed(() => responsiveImage(props.produto.image, { sizes: TAMANHOS }));
const preco = computed(() => formatPrice(props.produto.price));
const imagemFalhou = ref(false);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/m3-cartao-produto";
</style>
