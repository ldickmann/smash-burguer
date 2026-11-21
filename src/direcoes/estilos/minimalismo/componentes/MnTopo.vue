<!-- Cabeçalho só de texto, sempre visível, também no celular (sem menu escondido [M8]): a marca, a
     navegação principal e o carrinho com o número, no canto superior direito [H35]. -->
<template>
  <header class="mn-topo">
    <div class="mn-topo__interno">
      <RouterLink :to="inicio" class="mn-topo__marca">{{ MARCA }}</RouterLink>
      <nav class="mn-topo__nav" aria-label="Principal">
        <ul class="mn-topo__lista" role="list">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="mn-topo__link">{{ link.rotulo }}</RouterLink>
          </li>
          <li>
            <!-- Nome acessível começa pelo texto visível: "Carrinho 3 itens" -->
            <RouterLink to="/cart" class="mn-topo__link mn-topo__carrinho">
              {{ TEXTOS.carrinho }}
              <span class="mn-topo__numero tabular">
                <Transition name="mn-troca" mode="out-in">
                  <span :key="quantidade">{{ quantidade }}</span>
                </Transition>
              </span>
              <span class="visually-hidden">{{ quantidade === 1 ? " item" : " itens" }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { MARCA } from "../../../compartilhado/dados";
import { useContadorCarrinho } from "../../../compartilhado/useContadorCarrinho";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";
import { TEXTOS } from "../textos";

const props = defineProps({
  inicio: {
    type: String,
    required: true,
  },
});

const links = useLinksPrincipais(props.inicio);
const { quantidade } = useContadorCarrinho();
</script>

<style scoped lang="scss">
@use "../scss/topo";
</style>
