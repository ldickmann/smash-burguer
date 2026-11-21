<!-- Um contato da loja como linha clicável: o quadrado chapado com o ícone marca o alvo [F1], e o
     texto sublinhado diz que é link, não só pela cor [F17]. O rótulo e o valor vêm separados (sem "·"). -->
<template>
  <a
    class="fl-contato"
    :href="contato.href"
    :target="contato.externo ? '_blank' : undefined"
    :rel="contato.externo ? 'noopener noreferrer' : undefined"
  >
    <span class="fl-contato__quadrado" aria-hidden="true">
      <font-awesome-icon :icon="contato.icone" />
    </span>
    <span class="fl-contato__texto">
      <span v-if="contato.rotulo" class="fl-contato__rotulo">{{ contato.rotulo }}</span> <span class="fl-contato__valor">{{ contato.valor }}</span><span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
    </span>
  </a>
</template>

<script setup>
import { NOVA_ABA } from "../../../compartilhado/dados";

defineProps({
  // { chave, href, externo, icone, rotulo, valor }: um item de CONTATOS com o texto separado
  contato: {
    type: Object,
    required: true,
  },
});

defineEmits([]);
</script>

<style scoped lang="scss">
@use "../scss/link-contato";
</style>
