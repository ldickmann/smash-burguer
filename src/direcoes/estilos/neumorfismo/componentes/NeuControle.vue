<!-- Controle secundário em relevo com borda: os contatos e o carrinho. Link de fora (`href`, com
     nova aba quando `externo`) ou de dentro (`para`, RouterLink). Redondo, só o ícone; o slot fica
     para o selo. Pressionado, perde o convexo e afunda. -->
<template>
  <RouterLink v-if="para" :to="para" class="neu-controle" :class="{ 'neu-controle--redondo': redondo }">
    <font-awesome-icon :icon="icone" class="neu-controle__icone" aria-hidden="true" />
    <slot v-if="redondo" />
    <span v-else class="neu-controle__texto"><slot /></span>
  </RouterLink>
  <a
    v-else
    :href="href"
    class="neu-controle"
    :class="{ 'neu-controle--redondo': redondo }"
    :target="externo ? '_blank' : undefined"
    :rel="externo ? 'noopener noreferrer' : undefined"
  >
    <font-awesome-icon :icon="icone" class="neu-controle__icone" aria-hidden="true" />
    <slot v-if="redondo" />
    <span v-else class="neu-controle__texto">
      <slot />
      <span v-if="externo" class="visually-hidden">{{ NOVA_ABA }}</span>
    </span>
  </a>
</template>

<script setup>
import { NOVA_ABA } from "../../../compartilhado/dados";

defineProps({
  href: {
    type: String,
    default: "",
  },
  para: {
    type: [String, Object],
    default: null,
  },
  externo: {
    type: Boolean,
    default: false,
  },
  icone: {
    type: Array,
    required: true,
  },
  redondo: {
    type: Boolean,
    default: false,
  },
});

defineEmits([]);
</script>

<style scoped lang="scss">
@use "../scss/controle";
</style>
