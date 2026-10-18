<template>
  <div class="toast-region">
    <TransitionGroup name="toast" tag="div" class="toast-region__list">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.variant}`"
        :role="toast.variant === 'error' ? 'alert' : 'status'"
        @mouseenter="toastStore.pause(toast.id)"
        @mouseleave="toastStore.resume(toast.id)"
        @focusin="toastStore.pause(toast.id)"
        @focusout="handleFocusOut($event, toast.id)"
      >
        <font-awesome-icon :icon="icons[toast.variant]" class="toast__icon" aria-hidden="true" />
        <p class="toast__message">{{ toast.message }}</p>
        <BaseButton
          v-if="toast.action"
          class="toast__action"
          variant="secondary"
          :icon-start="toast.action.icon"
          @click="toastStore.runAction(toast.id)"
        >
          {{ toast.action.label }}
        </BaseButton>
        <BaseButton
          class="toast__close"
          variant="ghost"
          icon-only
          icon-start="xmark"
          label="Fechar aviso"
          @click="toastStore.dismiss(toast.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";
import { useToastStore } from "@/stores/toast";

const toastStore = useToastStore();

const icons = {
  success: ["fas", "circle-check"],
  error: ["fas", "circle-exclamation"],
  info: ["fas", "circle-info"],
};

// Só retoma o tempo quando o foco sai do aviso inteiro
const handleFocusOut = (event, id) => {
  if (!event.currentTarget.contains(event.relatedTarget)) toastStore.resume(id);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/app-toast";
</style>
