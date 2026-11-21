<!-- Uma linha do cardápio: nome, pontilhado e preço, a descrição e as ações. "Adicionar" abre o modal
     Personalizar real; "Ver foto" abre a foto da linha e fecha a que estava aberta (uma por vez). A
     partir de 1024 px a foto ocupa as colunas vazias à direita; no celular, vem abaixo dos botões. -->
<template>
  <li class="mn-linha" :class="{ 'is-aberta': aberta }">
    <div class="mn-linha__texto">
      <MnLinhaPreco :nome="produto.name" :preco="preco" />
      <p v-if="produto.description" class="mn-linha__descricao">{{ produto.description }}</p>
      <div class="mn-linha__acoes">
        <MnBotaoAdicionar
          :atributos="atributosAdicionar"
          :adicionado="adicionado"
          @adicionar="personalizar(produto, contexto)"
        />
        <MnBotaoFoto
          v-if="imagem.src"
          :expandido="aberta"
          :controla="idFoto"
          :nome="produto.name"
          @alternar="(botao) => fotos.alternar(chave, botao)"
        />
      </div>
    </div>
    <Transition name="mn-foto" @leave="sairNaHora">
      <MnFoto
        v-if="imagem.src"
        v-show="aberta"
        :id="idFoto"
        class="mn-linha__foto"
        :imagem="imagem"
        :nome="produto.name"
        :falhou="imagemFalhou"
        @erro="aoFalharImagem"
      />
    </Transition>
  </li>
</template>

<script setup>
import { computed, watch } from "vue";
import { useCartaoProduto } from "../../../compartilhado/useCartaoProduto";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import { chaveFoto, useFotoAberta } from "../useFotoAberta";
import MnBotaoAdicionar from "./MnBotaoAdicionar.vue";
import MnBotaoFoto from "./MnBotaoFoto.vue";
import MnFoto from "./MnFoto.vue";
import MnLinhaPreco from "./MnLinhaPreco.vue";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  // foods, drinks ou desserts
  categoria: {
    type: String,
    required: true,
  },
});

const personalizar = usePersonalizar();
const fotos = useFotoAberta();

// A foto aberta tem as colunas 8 a 12 a partir de 1024 px; no celular, a largura toda
const { imagem, preco, imagemFalhou, adicionado, contexto, atributosAdicionar } = useCartaoProduto(
  () => props.produto,
  { sizes: "(min-width: 1024px) 38vw, 92vw" }
);

const chave = computed(() => chaveFoto(props.categoria, props.produto));
const idFoto = computed(() => `mn-foto-${props.categoria}-${props.produto.id}`);
const aberta = computed(() => fotos.aberta(chave.value));

// Imagem que falha: a reserva tipográfica entra no lugar, até a imagem mudar no painel
const aoFalharImagem = () => (imagemFalhou.value = true);
watch(
  () => props.produto.image,
  () => (imagemFalhou.value = false)
);

// A saída é imediata: o painel some na mesma atualização, e a compensação de rolagem já mede o fim
const sairNaHora = (el, pronto) => pronto();
</script>

<style scoped lang="scss">
@use "../scss/linha-cardapio";
</style>
