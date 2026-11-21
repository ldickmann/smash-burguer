<!-- Linha de acompanhamento direto na faixa N12, sem caixa: foto pequena atenuada que se apaga na faixa,
     nome, descrição, preço e "Adicionar" tonal. No pedido, a linha sobe um degrau (N17) e ganha a
     borda tertiary e a marca compacta; só as camadas mudam de opacidade, nada muda de tamanho. -->
<template>
  <CartaoProduto v-slot="cartao" :produto="produto" :tamanhos="tamanhos">
    <article class="esc-linha" :class="{ 'is-no-pedido': quantidadeNoPedido > 0 }" :aria-labelledby="idTitulo">
      <EscFoto
        class="esc-linha__foto"
        :imagem="cartao.imagem"
        :alt="produto.name"
        :falhou="cartao.imagemFalhou"
        :categoria="produto.category"
        proporcao="4 / 3"
        atenuada
        dissolvida
        @erro="cartao.aoFalharImagem"
      />
      <div class="esc-linha__texto">
        <h4 :id="idTitulo" class="esc-linha__nome">{{ produto.name }}</h4>
        <p class="esc-linha__descricao">{{ produto.description }}</p>
      </div>
      <div class="esc-linha__preco">
        <p class="tabular">{{ cartao.preco }}</p>
        <Transition name="esc-marca">
          <EscMarcaPedido v-if="quantidadeNoPedido > 0" :quantidade="quantidadeNoPedido" compacta />
        </Transition>
      </div>
      <EscBotaoAdicionar
        class="esc-linha__botao"
        :atributos="cartao.atributosAdicionar"
        :adicionado="cartao.adicionado"
        variante="tonal"
        @click="personalizar(produto, cartao.contexto)"
      />
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
    default: "(min-width: 1024px) 112px, 96px",
  },
});

const personalizar = usePersonalizar();
// Os ids se repetem entre categorias no products.json: a categoria entra no id
const idTitulo = computed(() => `esc-junto-${props.produto.category}-${props.produto.id}`);
</script>

<style scoped lang="scss">
@use "../scss/linha";
</style>
