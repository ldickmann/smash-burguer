<!-- Moldura comum às Homes das direções. Só estrutura e lógica: o visual (navbar, conteúdo e
     rodapé) vem dos slots de cada estilo. O modal Personalizar é o real (ModalAdditional), e o slot
     padrão recebe `personalizar(produto, contexto)` para abri-lo. -->
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
import { ref } from "vue";
import AssinaturaEncaixe from "@/components/AssinaturaEncaixe.vue";
import ModalAdditional from "@/components/ModalAdditional.vue";
import { useProductModal } from "@/composables/useProductModal";
import SeletorDirecao from "../SeletorDirecao.vue";

defineProps({
  estilo: {
    type: String,
    required: true,
  },
});

const conteudo = ref(null);
const { isOpen, product, openModal, closeModal, confirm } = useProductModal();

// O link usa #conteudo, mas a rota é por hash: o foco é movido à mão (como no MainLayout)
const focarConteudo = () => conteudo.value?.focus();
</script>

<style scoped lang="scss">
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.moldura__conteudo {
  flex: 1;
  min-width: 0;
}
</style>
