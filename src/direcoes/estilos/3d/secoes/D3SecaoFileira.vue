<!-- A ousadia: os hambúrgueres do cardápio desmontados lado a lado, camada por camada, alinhados pelo
     ingrediente real [D46][D47][D48]. "Juntar camadas" prensa todos de uma vez e fica afundado
     enquanto vale [D42][D50]; nada se move sem um gesto. Com mouse, as pilhas inclinam até 3° [D30].
     As pilhas e o eixo são decorativos: o texto equivalente é a descrição de cada ficha.
     Abaixo de md, sem eixo e em duas colunas, cada par lado a lado usa só as próprias linhas. -->
<template>
  <section data-secao="fileira" aria-labelledby="d3-hamburgueres-titulo" class="d3-fileira">
    <div class="container">
      <div ref="palco" class="d3-palco">
        <div class="d3-palco__cabecalho">
          <h2 id="d3-hamburgueres-titulo" class="d3-palco__titulo">{{ rotulo }}</h2>
          <D3Inflado
            v-if="lanches.length"
            class="d3-palco__alternar"
            cor="maionese"
            :alternado="junta"
            :icone="faLayerGroup"
            @click="junta = !junta"
          >
            {{ TEXTOS.fileira.alternar }}
          </D3Inflado>
        </div>

        <div
          v-if="lanches.length"
          class="d3-fileira__grade"
          :class="{ 'is-junta': junta, 'com-eixo': mostrarEixo }"
          :style="{ '--linhas': linhas.length }"
        >
          <ol v-if="mostrarEixo" class="d3-fileira__eixo" aria-hidden="true">
            <li v-for="linha in eixo" :key="linha.chave" class="d3-fileira__linha">{{ linha.rotulo }}</li>
          </ol>
          <ul class="d3-fileira__lanches" role="list">
            <li v-for="lanche in lanches" :key="lanche.produto.id" class="d3-fileira__lanche">
              <D3Pilha
                :camadas="lanche.camadas"
                :linhas="linhas.length"
                :linhas-par="lanche.linhasPar"
                :junta="junta"
              />
              <D3Ficha :produto="lanche.produto" />
            </li>
          </ul>
        </div>
        <p v-else class="d3-palco__vazio">{{ TEXTOS.vazio }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { useTilt } from "@/composables/useTilt";
import { CATEGORIAS } from "../../../compartilhado/dados";
import { TEXTOS } from "../textos";
import { useFileira } from "../usePilha";
import D3Ficha from "../componentes/D3Ficha.vue";
import D3Inflado from "../componentes/D3Inflado.vue";
import D3Pilha from "../componentes/D3Pilha.vue";

const rotulo = CATEGORIAS.find((categoria) => categoria.chave === "foods").rotulo;
const { lanches, linhas, mostrarEixo } = useFileira();

// O eixo lê de cima para baixo; as linhas vêm de baixo para cima
const eixo = computed(() => [...linhas.value].reverse());

// A página sempre abre separada; o estado não é salvo
const junta = ref(false);

// Inclinação até 3°: o useTilt põe --rx e --ry no palco (só com mouse e sem movimento reduzido)
const palco = ref(null);
useTilt(palco, { max: 3 });
</script>

<style scoped lang="scss">
@use "../scss/secao-fileira";
</style>
