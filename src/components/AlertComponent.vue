<template>
  <!-- Alert component -->
  <Transition name="fade">
    <!-- Exibe a mensagem de alerta quando 'show' for true -->
    <div v-if="show" class="alert">
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true, // A mensagem obrigatória
  },
});

// Estado reativo para exibir ou não o alerta
const show = ref(true);

// Monitora mudanças na propriedade 'message'
watch(
  () => props.message,
  () => {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 3000);
  }
);
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/alert';
</style>
