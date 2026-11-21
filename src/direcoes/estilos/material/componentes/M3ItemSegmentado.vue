<!-- Item de lista agrupada [66][81]: com `href`, a linha inteira é o link (camada de estado e anel por
     dentro); sem, é informação estática. A cor do círculo do ícone separa ação (secondary) de
     informação (tertiary). Externos abrem em nova aba e avisam no nome acessível. -->
<template>
  <li class="m3-segmento-item">
    <a
      v-if="href"
      class="m3-segmento"
      :href="href"
      :target="externo ? '_blank' : undefined"
      :rel="externo ? 'noopener noreferrer' : undefined"
    >
      <span class="m3-segmento__icone"><font-awesome-icon :icon="icone" aria-hidden="true" /></span>
      <span class="m3-segmento__texto">
        <span class="m3-segmento__titulo">{{ titulo }}</span>
        <span v-if="apoio" class="m3-segmento__apoio">{{ apoio }}</span>
        <span v-if="externo" class="visually-hidden">{{ NOVA_ABA }}</span>
      </span>
      <font-awesome-icon v-if="externo" :icon="faArrowUpRightFromSquare" class="m3-segmento__fim" aria-hidden="true" />
    </a>
    <div v-else class="m3-segmento m3-segmento--info">
      <span class="m3-segmento__icone"><font-awesome-icon :icon="icone" aria-hidden="true" /></span>
      <span class="m3-segmento__texto">
        <span class="m3-segmento__titulo">{{ titulo }}</span>
        <span v-if="apoio" class="m3-segmento__apoio">{{ apoio }}</span>
      </span>
    </div>
  </li>
</template>

<script setup>
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { NOVA_ABA } from "../../../compartilhado/dados";

defineProps({
  titulo: {
    type: String,
    required: true,
  },
  apoio: {
    type: String,
    default: "",
  },
  href: {
    type: String,
    default: "",
  },
  externo: {
    type: Boolean,
    default: false,
  },
  icone: {
    type: [Array, Object],
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "../scss/item-segmentado";
</style>
