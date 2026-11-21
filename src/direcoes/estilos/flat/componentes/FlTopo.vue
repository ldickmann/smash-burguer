<!-- O <header>: faixa preta fixa, que se lê como navegação [F1], opaca e baixa [H17]. Marca, os três
     links sempre visíveis (com quatro ou menos, nada de menu escondido [H14]) e o carrinho no canto
     superior direito [H35]. Abaixo de md, duas linhas: marca e carrinho, e os links embaixo. -->
<template>
  <header class="fl-topo">
    <div class="fl-topo__interno container">
      <RouterLink :to="inicio" class="fl-topo__marca">{{ MARCA }}</RouterLink>
      <nav class="fl-topo__nav" aria-label="Principal">
        <ul class="fl-topo__lista" role="list">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="fl-topo__link">{{ link.rotulo }}</RouterLink>
          </li>
        </ul>
      </nav>
      <FlCarrinho class="fl-topo__carrinho" />
    </div>
  </header>
</template>

<script setup>
import { MARCA } from "../../../compartilhado/dados";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";
import FlCarrinho from "./FlCarrinho.vue";

const props = defineProps({
  inicio: {
    type: String,
    default: "/direcoes/flat",
  },
});

defineEmits([]);

const links = useLinksPrincipais(props.inicio);
</script>

<style scoped lang="scss">
@use "../scss/topo";
</style>
