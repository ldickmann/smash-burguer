<!-- Cabeçalho na cor da base [87]: a marca, os três links sempre visíveis (com 4 links ou menos, sem
     botão de menu [H14][H15]) e o carrinho. Fixo a partir de md, com a linha inferior só quando a
     página rola. O número do selo troca por opacidade. -->
<template>
  <header class="esc-barra" :class="{ 'is-rolada': rolada }">
    <div class="esc-barra__interno container">
      <RouterLink :to="inicio" class="esc-barra__marca">{{ MARCA }}</RouterLink>

      <nav class="esc-barra__nav" aria-label="Principal">
        <ul class="esc-barra__links" role="list">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="esc-barra__link"
              :aria-current="link.to === inicio ? 'page' : undefined"
            >
              {{ link.rotulo }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <RouterLink to="/cart" class="esc-barra__carrinho" :aria-label="rotulo">
        <font-awesome-icon :icon="['fas', 'shopping-cart']" class="esc-barra__icone" aria-hidden="true" />
        <Transition name="esc-selo">
          <span v-if="quantidade > 0" class="esc-barra__selo tabular" aria-hidden="true">
            <Transition name="esc-selo" mode="out-in">
              <span :key="texto">{{ texto }}</span>
            </Transition>
          </span>
        </Transition>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { MARCA } from "../../../compartilhado/dados";
import { useContadorCarrinho } from "../../../compartilhado/useContadorCarrinho";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";
import { useRolada } from "../useRolada";

const props = defineProps({
  inicio: {
    type: String,
    default: "/direcoes/escuro",
  },
});

const links = useLinksPrincipais(props.inicio);
const { quantidade, rotulo, texto } = useContadorCarrinho();
const { rolada } = useRolada();
</script>

<style scoped lang="scss">
@use "../scss/barra";
</style>
