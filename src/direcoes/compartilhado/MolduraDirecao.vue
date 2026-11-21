<!-- Moldura comum às Homes das direções. Só estrutura e lógica, sem estilo próprio: o layout
     (.moldura e .moldura__conteudo) e o visual (navbar, conteúdo e rodapé) são de cada Home.
     O modal Personalizar é o real (ModalAdditional). As seções o abrem com usePersonalizar();
     o slot padrão ainda recebe `personalizar(produto, contexto)`, para as Homes da rodada 1. -->
<template>
  <div class="moldura">
    <a href="#conteudo" class="skip-link" @click.prevent="focarConteudo">Pular para o conteúdo</a>
    <slot name="topo" />
    <main id="conteudo" ref="conteudo" class="moldura__conteudo" tabindex="-1">
      <slot :personalizar="openModal" />
    </main>
    <slot name="rodape" />
    <AssinaturaEncaixe tom="escuro" />
    <ModalAdditional :open="isOpen" :product="product" @close="closeModal" @confirm="confirm" />
    <SeletorDirecao :atual="estilo" />
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import AssinaturaEncaixe from "@/components/AssinaturaEncaixe.vue";
import ModalAdditional from "@/components/ModalAdditional.vue";
import { useProductModal } from "@/composables/useProductModal";
import SeletorDirecao from "../SeletorDirecao.vue";
import { CHAVE_PERSONALIZAR } from "./usePersonalizar";

defineProps({
  estilo: {
    type: String,
    required: true,
  },
});

const conteudo = ref(null);
const { isOpen, product, openModal, closeModal, confirm } = useProductModal();

provide(CHAVE_PERSONALIZAR, openModal);

// O link usa #conteudo, mas a rota é por hash: o foco é movido à mão (como no MainLayout)
const focarConteudo = () => conteudo.value?.focus();
</script>
