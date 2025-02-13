<template>
  <Transition name="fade">
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
    required: true,
  },
});

const show = ref(true);

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
