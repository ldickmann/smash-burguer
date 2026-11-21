<!-- A bebida ou a sobremesa no expositor: a foto apoiada na prateleira e a etiqueta de gôndola presa
     embaixo, com o nome, o preço, a contagem dos adicionais (só na sobremesa) e o "Adicionar". -->
<template>
  <article class="esq-item" :aria-labelledby="idNome">
    <div class="esq-item__vitrine">
      <EsqFoto
        class="esq-item__foto"
        :imagem="imagem"
        :alt="produto.name"
        proporcao="1 / 1"
        :largura="960"
        :altura="960"
        :icone="icone"
        :falhou="imagemFalhou"
        @erro="imagemFalhou = true"
      />
    </div>
    <EsqEtiqueta class="esq-item__etiqueta">
      <h4 :id="idNome" class="esq-item__nome">{{ produto.name }}</h4>
      <p class="esq-item__preco tabular">{{ preco }}</p>
      <p v-if="adicionais > 0" class="esq-item__adicionais">{{ textoAdicionais }}</p>
      <EsqBotao class="esq-item__botao" v-bind="atributosAdicionar" @click="personalizar(produto, contexto)">
        {{ TEXTOS.adicionar }}
      </EsqBotao>
      <EsqCarimbo class="esq-item__carimbo" tamanho="pequeno" :visivel="adicionado" />
    </EsqEtiqueta>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { faGlassWater, faIceCream } from "@fortawesome/free-solid-svg-icons";
import { useCartaoProduto } from "../../../compartilhado/useCartaoProduto";
import { contar } from "../../../compartilhado/useCardapio";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import { TEXTOS } from "../textos";
import EsqBotao from "./EsqBotao.vue";
import EsqCarimbo from "./EsqCarimbo.vue";
import EsqEtiqueta from "./EsqEtiqueta.vue";
import EsqFoto from "./EsqFoto.vue";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  adicionais: {
    type: Number,
    default: 0,
  },
});

const personalizar = usePersonalizar();
const { imagem, preco, imagemFalhou, adicionado, contexto, atributosAdicionar } = useCartaoProduto(
  () => props.produto,
  { sizes: "(min-width: 1280px) 170px, (min-width: 768px) 220px, 88px" }
);

const idNome = computed(() => `esq-item-${props.produto.category ?? "item"}-${props.produto.id}`);
const icone = computed(() => (props.produto.category === "desserts" ? faIceCream : faGlassWater));
const textoAdicionais = computed(() =>
  contar(props.adicionais, [TEXTOS.expositor.adicional, TEXTOS.expositor.adicionais])
);
</script>

<style scoped lang="scss">
@use "../scss/item-expositor";
</style>
