<!-- Toolbar flutuante com FAB [57][83][81] (cópia de produção da M3BarraFerramentas da Home,
     SPEC-material §4.1 e §5.1): a nav Principal numa pílula, com os rótulos sempre à vista [26], e o
     FAB do carrinho com o badge. Abaixo de lg flutua embaixo, à direita, em todas as rotas da loja; a
     partir de lg fica ancorada no cabeçalho. A barra não anima nem some ao rolar. -->
<template>
  <div class="m3-ferramentas">
    <nav class="m3-ferramentas__nav" aria-label="Principal">
      <ul class="m3-pilula" role="list">
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to" class="m3-pilula__item">
            <font-awesome-icon :icon="iconeDe(link.to)" class="m3-pilula__icone" aria-hidden="true" />
            <span class="m3-pilula__rotulo">{{ link.rotulo }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
    <RouterLink to="/cart" class="m3-fab" :aria-label="rotulo">
      <font-awesome-icon :icon="['fas', 'shopping-cart']" class="m3-fab__icone" aria-hidden="true" />
      <Transition name="m3-badge">
        <span v-if="quantidade > 0" class="m3-badge tabular" aria-hidden="true">{{ texto }}</span>
      </Transition>
    </RouterLink>
  </div>
</template>

<script setup>
import { useContadorCarrinho } from "@/composables/useContadorCarrinho";
import { useLinksPrincipais } from "@/composables/useLinksPrincipais";

const props = defineProps({
  inicio: {
    type: String,
    required: true,
  },
});

const links = useLinksPrincipais(props.inicio);
const { quantidade, rotulo, texto } = useContadorCarrinho();

// Ícones por nome, registrados em src/plugins/fontawesome.js
const iconeDe = (destino) => {
  if (destino === props.inicio) return ["fas", "house"];
  if (destino === "/menu") return ["fas", "utensils"];
  return ["fas", "user"];
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/m3-barra-ferramentas";
</style>
