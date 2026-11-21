<!-- O pivot do Metro no padrão de abas da APG [F27][F46]: cabeçalhos de uma ou duas palavras, em
     texto de título, sem caixa, pílula nem borda. A aba selecionada leva sublinhado, além da cor [F17].
     Os painéis ficam todos no DOM (v-show): a ativação é automática e sem atraso. -->
<template>
  <div class="fl-pivot">
    <div class="fl-pivot__abas" role="tablist" :aria-labelledby="idTitulo">
      <button
        v-for="(aba, i) in abas"
        :id="`fl-aba-${aba.chave}`"
        :key="aba.chave"
        :ref="(el) => registrar(el, i)"
        type="button"
        role="tab"
        class="fl-pivot__aba"
        :aria-selected="String(aba.chave === modelValue)"
        :aria-controls="`fl-painel-${aba.chave}`"
        :tabindex="aba.chave === modelValue ? 0 : -1"
        @click="emit('update:modelValue', aba.chave)"
        @keydown="aoTeclar($event, i)"
      >
        {{ aba.rotulo }}
      </button>
    </div>

    <Transition v-for="aba in abas" :key="aba.chave" :name="`fl-painel-${sentido}`">
      <div
        v-show="aba.chave === modelValue"
        :id="`fl-painel-${aba.chave}`"
        role="tabpanel"
        class="fl-pivot__painel"
        :aria-labelledby="`fl-aba-${aba.chave}`"
      >
        <slot name="painel" :aba="aba" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { usePivotTeclado } from "../usePivotTeclado";

const props = defineProps({
  // [{ chave, rotulo }]
  abas: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  // id do título que rotula a lista de abas
  idTitulo: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { sentido, registrar, aoTeclar } = usePivotTeclado({
  chaves: () => props.abas.map((aba) => aba.chave),
  atual: () => props.modelValue,
  mudar: (chave) => emit("update:modelValue", chave),
});
</script>

<style scoped lang="scss">
@use "../scss/pivot";
</style>
