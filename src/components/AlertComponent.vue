<template>
  <!-- Alert component -->
  <Transition name="fade">
    <!-- Exibe a mensagem de alerta quando 'show' for true -->
    <div v-if="isVisible" class="alert">
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

// Estado reativo para exibir ou não o alerta
const isVisible = ref(true);

const startTimer = () => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, 3000);
};

watch(
  () => props.message,
  () => {
    startTimer();
  }
);

startTimer();
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/alert';
</style>
