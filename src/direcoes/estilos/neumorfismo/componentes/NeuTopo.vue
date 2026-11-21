<!-- O <header>: uma pílula elevada com a marca, a navegação e o carrinho. Fixa e sobre uma faixa de
     kraft opaca a partir de md; no celular, estática, com os três links visíveis numa segunda
     linha (sem botão de menu). O link atual afunda e ganha sublinhado. -->
<template>
  <header class="neu-topo">
    <div class="container">
      <div class="neu-topo__barra">
        <RouterLink :to="inicio" class="neu-topo__marca">{{ MARCA }}</RouterLink>

        <nav class="neu-topo__nav" aria-label="Principal">
          <ul class="neu-topo__lista" role="list">
            <li v-for="link in links" :key="link.to" class="neu-topo__item">
              <RouterLink :to="link.to" class="neu-topo__link">{{ link.rotulo }}</RouterLink>
            </li>
          </ul>
        </nav>

        <NeuControle
          class="neu-topo__carrinho"
          para="/cart"
          :icone="['fas', 'shopping-cart']"
          redondo
          :aria-label="rotulo"
        >
          <Transition name="neu-selo">
            <span v-if="quantidade > 0" class="neu-topo__selo tabular" aria-hidden="true">{{ texto }}</span>
          </Transition>
        </NeuControle>
      </div>
    </div>
  </header>
</template>

<script setup>
import { MARCA } from "../../../compartilhado/dados";
import { useContadorCarrinho } from "../../../compartilhado/useContadorCarrinho";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";
import NeuControle from "./NeuControle.vue";

const props = defineProps({
  inicio: {
    type: String,
    required: true,
  },
});

defineEmits([]);

const links = useLinksPrincipais(props.inicio);
const { quantidade, rotulo, texto } = useContadorCarrinho();
</script>

<style scoped lang="scss">
@use "../scss/topo";
</style>
