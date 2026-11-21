<!-- Split button do M3 Expressive [55] (cópia de produção do M3BotaoDividido da Home,
     SPEC-material §4.1 e §7.3): "Adicionar" na frente e, atrás, a metade que abre os ingredientes do
     próprio produto. Expandida, a metade de trás vira pílula inteira e o chevron aponta para cima.
     Sem `rotuloMenu`, sobra só a frente, redonda nos quatro cantos. -->
<template>
  <div
    class="m3-dividido"
    :class="[
      `m3-dividido--${tamanho}`,
      { 'is-expandido': expandido, 'is-adicionado': adicionado, 'is-unico': !rotuloMenu },
    ]"
  >
    <button type="button" class="m3-dividido__frente" v-bind="atributosAcao" @click="emit('acao')">
      <span class="m3-dividido__face m3-dividido__face--frente">Adicionar</span>
      <span class="m3-dividido__face m3-dividido__face--verso" aria-hidden="true">
        <font-awesome-icon :icon="['fas', 'check']" class="m3-dividido__check" />
        Adicionado
      </span>
    </button>
    <button
      v-if="rotuloMenu"
      ref="tras"
      type="button"
      class="m3-dividido__tras"
      :aria-label="rotuloMenu"
      :aria-expanded="String(expandido)"
      :aria-controls="controla || undefined"
      @click="emit('alternar', tras)"
    >
      <span class="m3-dividido__chevron" aria-hidden="true">
        <font-awesome-icon :icon="['fas', 'chevron-down']" class="m3-dividido__seta m3-dividido__seta--baixo" />
        <font-awesome-icon :icon="['fas', 'chevron-up']" class="m3-dividido__seta m3-dividido__seta--cima" />
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  rotuloMenu: {
    type: String,
    default: "",
  },
  controla: {
    type: String,
    default: "",
  },
  expandido: {
    type: Boolean,
    default: false,
  },
  adicionado: {
    type: Boolean,
    default: false,
  },
  atributosAcao: {
    type: Object,
    default: () => ({}),
  },
  tamanho: {
    type: String,
    default: "s",
    validator: (valor) => ["s", "m"].includes(valor),
  },
});

const emit = defineEmits(["acao", "alternar"]);
const tras = ref(null);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/m3-botao-dividido";
</style>
