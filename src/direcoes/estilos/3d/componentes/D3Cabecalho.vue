<!-- Barra de argila flutuante: a marca, os três links sempre visíveis [H14] e o carrinho com o
     contador em odômetro. Fixa e opaca a partir de md; no celular, em duas linhas, rola com a página
     [H17]. Com a barra fixa, o useFolgaTopo mantém o foco fora de baixo dela (2.4.11) [D34]. -->
<template>
  <header ref="cabecalho" class="d3-topo">
    <div class="container">
      <div class="d3-barra">
        <RouterLink :to="inicio" class="d3-marca">{{ MARCA }}</RouterLink>

        <nav class="d3-nav" aria-label="Principal">
          <ul class="d3-nav__lista" role="list">
            <li v-for="link in links" :key="link.to">
              <RouterLink :to="link.to" class="d3-link">{{ link.rotulo }}</RouterLink>
            </li>
          </ul>
        </nav>

        <RouterLink to="/cart" class="d3-carrinho" :aria-label="rotulo">
          <font-awesome-icon :icon="['fas', 'shopping-cart']" class="d3-carrinho__icone" aria-hidden="true" />
          <Transition name="d3-contador">
            <span v-if="quantidade > 0" class="d3-contador tabular" aria-hidden="true">
              <span
                v-for="digito in digitos"
                :key="digito.chave"
                class="d3-odo__janela"
                :style="{ '--i': digito.daDireita }"
              >
                <Transition :name="`d3-odo-${sentido}`">
                  <span :key="digito.caractere" class="d3-odo__digito">{{ digito.caractere }}</span>
                </Transition>
              </span>
            </span>
          </Transition>
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { MARCA } from "../../../compartilhado/dados";
import { useContadorCarrinho } from "../../../compartilhado/useContadorCarrinho";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";
import { useFolgaTopo } from "../useFolgaTopo";

const props = defineProps({
  inicio: {
    type: String,
    required: true,
  },
});

const links = useLinksPrincipais(props.inicio);
const { quantidade, rotulo, digitos, sentido } = useContadorCarrinho();

const cabecalho = ref(null);
useFolgaTopo(cabecalho);
</script>

<style scoped lang="scss">
@use "../scss/cabecalho";
</style>
