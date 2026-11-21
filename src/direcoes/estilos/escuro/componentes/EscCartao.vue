<!-- Card contornado dos lanches, o único card da página: N17 com contorno [63][87]. Quando o lanche já
     está no pedido, sobe um degrau (N22), ganha a borda tertiary e a marca "No seu pedido" [87][83].
     O card não reage ao hover: só o botão age. -->
<template>
  <CartaoProduto v-slot="cartao" :produto="produto" :tamanhos="tamanhos">
    <article class="esc-cartao" :class="{ 'is-no-pedido': quantidadeNoPedido > 0 }" :aria-labelledby="idTitulo">
      <div class="esc-cartao__midia">
        <EscFoto
          class="esc-cartao__foto"
          :imagem="cartao.imagem"
          :alt="produto.name"
          :falhou="cartao.imagemFalhou"
          :categoria="produto.category"
          @erro="cartao.aoFalharImagem"
        />
        <Transition name="esc-marca">
          <EscMarcaPedido v-if="quantidadeNoPedido > 0" class="esc-cartao__marca" :quantidade="quantidadeNoPedido" />
        </Transition>
      </div>

      <div class="esc-cartao__corpo">
        <h3 :id="idTitulo" class="esc-cartao__nome">{{ produto.name }}</h3>
        <p class="esc-cartao__descricao">{{ produto.description }}</p>
        <div class="esc-cartao__pe">
          <p class="esc-cartao__preco tabular">{{ cartao.preco }}</p>
          <EscBotaoAdicionar
            :atributos="cartao.atributosAdicionar"
            :adicionado="cartao.adicionado"
            variante="primaria"
            largo
            @click="personalizar(produto, cartao.contexto)"
          />
        </div>
      </div>
    </article>
  </CartaoProduto>
</template>

<script setup>
import { computed } from "vue";
import CartaoProduto from "../../../compartilhado/CartaoProduto.vue";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import EscBotaoAdicionar from "./EscBotaoAdicionar.vue";
import EscFoto from "./EscFoto.vue";
import EscMarcaPedido from "./EscMarcaPedido.vue";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  quantidadeNoPedido: {
    type: Number,
    default: 0,
  },
  tamanhos: {
    type: String,
    default: "(min-width: 1024px) 340px, (min-width: 768px) 280px, 160px",
  },
});

const personalizar = usePersonalizar();
const idTitulo = computed(() => `esc-lanche-${props.produto.id}`);
</script>

<style scoped lang="scss">
@use "../scss/cartao";
</style>
