<!-- O "card" que a metade de trás do split abre [55] (cópia de produção do M3FolhaIngredientes da
     Home, SPEC-material §4.1 e §7.4): superfície flutuante com os ingredientes do produto. Fica no
     DOM (v-show), para o aria-controls apontar sempre para um id que existe. O comportamento (uma
     folha por vez, Esc e clique fora) é do useFolhaUnica, em quem a usa. -->
<template>
  <Transition name="m3-folha">
    <div v-show="aberto" :id="id" class="m3-folha">
      <p :id="`${id}-titulo`" class="m3-folha__titulo">{{ titulo }}</p>
      <ul class="m3-folha__lista" role="list" :aria-labelledby="`${id}-titulo`">
        <li v-for="item in itens" :key="item" class="m3-folha__item">{{ item }}</li>
      </ul>
    </div>
  </Transition>
</template>

<script setup>
import { TEXTOS } from "@/utils/textosLoja";

defineProps({
  id: {
    type: String,
    required: true,
  },
  itens: {
    type: Array,
    default: () => [],
  },
  aberto: {
    type: Boolean,
    default: false,
  },
  titulo: {
    type: String,
    default: TEXTOS.ingredientes,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/m3-folha-ingredientes";
</style>
