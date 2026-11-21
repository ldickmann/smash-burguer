<!-- Ação preenchida (primary) ou tonal (secondary-container). Com `para`, vira RouterLink. A cor vai no
     fundo da ação, e cada papel tem um significado só [81][4]. Hover e pressionado já compostos nos
     tokens [82]; a cor de fundo troca sem transição. -->
<template>
  <RouterLink v-if="para" :to="para" class="esc-botao" :class="classes">
    <slot />
  </RouterLink>
  <button v-else :type="tipo" class="esc-botao" :class="classes" @click="emit('click', $event)">
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  para: {
    type: [String, Object],
    default: null,
  },
  variante: {
    type: String,
    default: "primaria",
    validator: (valor) => ["primaria", "tonal"].includes(valor),
  },
  tamanho: {
    type: String,
    default: "m",
    validator: (valor) => ["m", "g"].includes(valor),
  },
  tipo: {
    type: String,
    default: "button",
  },
});

const emit = defineEmits(["click"]);

const classes = computed(() => [`esc-botao--${props.variante}`, `esc-botao--${props.tamanho}`]);
</script>

<style scoped lang="scss">
@use "../scss/botao";
</style>
