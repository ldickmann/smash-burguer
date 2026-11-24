<!-- Rótulo de status do M3 (desenho do admin, §5.5 e §7.2): texto num contêiner tonal, o "on" do papel
     sobre o contêiner dele. Não é chip, porque o chip do M3 é interativo: sem papel, foco, camada,
     cursor nem ícone. Raiz p: cabe no header do card de pedido, no dd do diálogo e na linha do perfil.
     O texto leva o estado; a cor é sinal a mais (1.4.1). -->
<template>
  <p class="m3-status" :class="`m3-status--${tom}`">
    <slot></slot>
  </p>
</template>

<script setup>
defineProps({
  // info: "Em preparo", "A caminho" e o "Recebido" do perfil; aviso: "Pendente"; sucesso: "Concluído"
  tom: {
    type: String,
    default: "info",
    validator: (valor) => ["info", "aviso", "sucesso"].includes(valor),
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/m3-rotulo-status";
</style>
