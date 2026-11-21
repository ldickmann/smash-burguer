<!-- Item de acompanhamento: a foto num poço redondo prensado no kraft, o nome, o preço e "Adicionar".
     Não é um cartão e não é clicável inteiro: só o botão age. -->
<template>
  <div class="neu-vaga">
    <CartaoProduto v-slot="cartao" :produto="produto" :tamanhos="TAMANHOS">
      <NeuFotoPoco
        class="neu-vaga__poco"
        forma="redonda"
        :imagem="cartao.imagem"
        :alt="produto.name"
        :falhou="cartao.imagemFalhou"
        :icone="['fas', 'utensils']"
        @erro="cartao.aoFalharImagem"
      />
      <div class="neu-vaga__texto">
        <h4 class="neu-vaga__nome">{{ produto.name }}</h4>
        <div class="neu-vaga__compra">
          <p class="neu-vaga__preco tabular">{{ cartao.preco }}</p>
          <NeuAcao
            :adicionado="cartao.adicionado"
            v-bind="cartao.atributosAdicionar"
            @click="personalizar(produto, cartao.contexto)"
          >
            {{ TEXTOS.adicionar }}
          </NeuAcao>
        </div>
      </div>
    </CartaoProduto>
  </div>
</template>

<script setup>
import CartaoProduto from "../../../compartilhado/CartaoProduto.vue";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import { TEXTOS } from "../textos";
import NeuAcao from "./NeuAcao.vue";
import NeuFotoPoco from "./NeuFotoPoco.vue";

const TAMANHOS = "(min-width: 1024px) 160px, 88px";

defineProps({
  produto: {
    type: Object,
    required: true,
  },
});

defineEmits([]);

const personalizar = usePersonalizar();
</script>

<style scoped lang="scss">
@use "../scss/vaga";
</style>
