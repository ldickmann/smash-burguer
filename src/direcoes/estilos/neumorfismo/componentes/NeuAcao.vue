<!-- Ação em cor chapada: ketchup sólido e plano, sem relevo, que só afunda ao apertar. Com `para`,
     é um link (RouterLink, "Ver cardápio"); sem, um botão ("Adicionar"), que repassa aria-label e
     data-adicionado (atributosAdicionar) e mostra a face "Adicionado" no retorno do modal. -->
<template>
  <RouterLink v-if="para" :to="para" class="neu-acao" :class="`neu-acao--${tamanho}`">
    <span class="neu-acao__face"><slot /></span>
  </RouterLink>
  <button
    v-else
    type="button"
    class="neu-acao"
    :class="[`neu-acao--${tamanho}`, { 'is-adicionado': adicionado }]"
    @click="emit('click', $event)"
  >
    <span class="neu-acao__face neu-acao__face--frente"><slot /></span>
    <span class="neu-acao__face neu-acao__face--verso" aria-hidden="true">
      <font-awesome-icon :icon="['fas', 'check']" />
      <span>{{ TEXTOS.adicionado }}</span>
    </span>
  </button>
</template>

<script setup>
import { TEXTOS } from "../textos";

defineProps({
  para: {
    type: [String, Object],
    default: null,
  },
  adicionado: {
    type: Boolean,
    default: false,
  },
  tamanho: {
    type: String,
    default: "m",
    validator: (valor) => ["m", "g"].includes(valor),
  },
});

const emit = defineEmits(["click"]);
</script>

<style scoped lang="scss">
@use "../scss/acao";
</style>
