<!-- Link de contato: o valor sublinhado em primary (nunca só a cor [85][94]), com ícone; o rótulo, se
     houver, fica separado do valor, acima. Os externos abrem em nova aba e avisam (NOVA_ABA oculto e
     o ícone de link externo, nas duas larguras) [H34]. -->
<template>
  <a
    class="esc-contato"
    :href="contato.href"
    :target="contato.externo ? '_blank' : undefined"
    :rel="contato.externo ? 'noopener noreferrer' : undefined"
  >
    <font-awesome-icon :icon="contato.icone" class="esc-contato__icone" aria-hidden="true" />
    <span class="esc-contato__corpo">
      <span v-if="contato.rotulo" class="esc-contato__rotulo">{{ contato.rotulo }}</span>
      <span class="esc-contato__valor">
        {{ contato.texto }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
      </span>
    </span>
    <font-awesome-icon v-if="contato.externo" :icon="faArrowUpRightFromSquare" class="esc-contato__externo" aria-hidden="true" />
  </a>
</template>

<script setup>
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { NOVA_ABA } from "../../../compartilhado/dados";

defineProps({
  // { chave, rotulo?, texto, href, externo, icone }
  contato: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped lang="scss">
@use "../scss/link-contato";
</style>
