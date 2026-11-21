<!-- A impressora térmica presa ao balcão: o papel sai da fenda para cima, e a carcaça clara tem o LED
     e o botão. O LED acende com itens e pisca uma vez a cada impressão nova (só com movimento).
     A seção põe o conteúdo do papel (slot padrão) e o botão (slot acao, que pode faltar: parada,
     a impressora só tem a fenda e o LED). -->
<template>
  <div class="esq-impressora">
    <div class="esq-impressora__saida">
      <div class="esq-impressora__papel">
        <slot />
      </div>
    </div>
    <div class="esq-impressora__corpo">
      <span class="esq-impressora__fenda" aria-hidden="true"></span>
      <span
        class="esq-impressora__led"
        :class="{ 'is-aceso': aceso, 'is-piscando': piscando }"
        aria-hidden="true"
      ></span>
      <div v-if="$slots.acao" class="esq-impressora__acao">
        <slot name="acao" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import { readDurationToken } from "@/utils/tokens";

const props = defineProps({
  aceso: {
    type: Boolean,
    default: false,
  },
  impressao: {
    type: Number,
    default: 0,
  },
});

// Cada impressão nova liga a piscada pelo tempo do token (o CSS só anima com movimento)
const piscando = ref(false);
let temporizador;

watch(
  () => props.impressao,
  () => {
    clearTimeout(temporizador);
    piscando.value = true;
    temporizador = setTimeout(() => (piscando.value = false), readDurationToken("--esq-dur-led", 520));
  }
);

onBeforeUnmount(() => clearTimeout(temporizador));
</script>

<style scoped lang="scss">
@use "../scss/impressora";
</style>
