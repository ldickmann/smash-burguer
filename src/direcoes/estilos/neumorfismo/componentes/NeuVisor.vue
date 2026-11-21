<!-- O visor do painel: um poço fundo com o lanche marcado (foto, nome, ingredientes, preço e o único
     botão que age). O conteúdo novo entra por opacidade; depois de uma escolha do usuário, o poço
     "recebe a pressão" (camada de sombra mais funda, só por opacidade e só com movimento). -->
<template>
  <div class="neu-visor">
    <span v-if="pulsar" :key="`pulso-${produto.id}`" class="neu-visor__pulso" aria-hidden="true" />
    <Transition name="neu-visor">
      <div :key="produto.id" class="neu-visor__conteudo">
        <CartaoProduto v-slot="cartao" :produto="produto" :tamanhos="TAMANHOS">
          <NeuFotoPoco
            class="neu-visor__foto"
            :imagem="cartao.imagem"
            :alt="produto.name"
            :falhou="cartao.imagemFalhou"
            :icone="['fas', 'burger']"
            @erro="cartao.aoFalharImagem"
          />
          <div class="neu-visor__texto">
            <h3 class="neu-visor__nome">{{ produto.name }}</h3>
            <template v-if="ingredientes.length">
              <h4 class="neu-visor__subtitulo">{{ TEXTOS.ingredientes }}</h4>
              <ul class="neu-visor__ingredientes" role="list">
                <li v-for="(ingrediente, i) in ingredientes" :key="`${i}-${ingrediente}`">{{ ingrediente }}</li>
              </ul>
            </template>
            <p v-else-if="produto.description" class="neu-visor__descricao">{{ produto.description }}</p>
            <div class="neu-visor__compra">
              <NeuLeitura :valor="cartao.preco" />
              <NeuAcao
                tamanho="g"
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
    </Transition>
  </div>
</template>

<script setup>
import { computed } from "vue";
import CartaoProduto from "../../../compartilhado/CartaoProduto.vue";
import { usePersonalizar } from "../../../compartilhado/usePersonalizar";
import { TEXTOS } from "../textos";
import NeuAcao from "./NeuAcao.vue";
import NeuFotoPoco from "./NeuFotoPoco.vue";
import NeuLeitura from "./NeuLeitura.vue";

const TAMANHOS = "(min-width: 1280px) 440px, (min-width: 1024px) 300px, 86vw";

const props = defineProps({
  produto: {
    type: Object,
    required: true,
  },
  pulsar: {
    type: Boolean,
    default: false,
  },
});

defineEmits([]);

const personalizar = usePersonalizar();

const ingredientes = computed(() =>
  Array.isArray(props.produto.ingredients) ? props.produto.ingredients.filter(Boolean) : []
);
</script>

<style scoped lang="scss">
@use "../scss/visor";
</style>
