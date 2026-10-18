<template>
  <dialog
    ref="dialogRef"
    class="dialog"
    :aria-labelledby="titleId"
    :style="{ '--dialog-max': maxWidth }"
    @cancel.prevent="requestClose"
    @close="handleNativeClose"
    @pointerdown="handlePointerDown"
    @click="handleBackdropClick"
  >
    <div class="dialog__panel">
      <header class="dialog__header">
        <slot name="header">
          <h2 :id="titleId" ref="titleRef" class="dialog__title" tabindex="-1">{{ title }}</h2>
        </slot>
        <BaseButton
          class="dialog__close"
          variant="ghost"
          icon-only
          icon-start="xmark"
          label="Fechar"
          @click="requestClose"
        />
      </header>

      <div ref="bodyRef" class="dialog__body">
        <slot />
      </div>

      <footer v-if="$slots.footer" class="dialog__footer">
        <slot name="footer" />
      </footer>
    </div>
  </dialog>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useScrollLock } from "@/composables/useScrollLock";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  // id do título apontado por aria-labelledby (quem usa o slot header deve repetir este id)
  titleId: {
    type: String,
    required: true,
  },
  maxWidth: {
    type: String,
    default: "880px",
  },
});

const emit = defineEmits(["close"]);

const dialogRef = ref(null);
const titleRef = ref(null);
const bodyRef = ref(null);
const { lock, unlock } = useScrollLock();

let opener = null;
let pointerStartedOnBackdrop = false;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const focusInitial = () => {
  const dialog = dialogRef.value;
  const target =
    dialog.querySelector("[autofocus]") ||
    bodyRef.value?.querySelector(FOCUSABLE) ||
    dialog.querySelector(`#${props.titleId}`) ||
    titleRef.value;
  target?.focus({ preventScroll: false });
};

const openDialog = async () => {
  const dialog = dialogRef.value;
  if (!dialog || dialog.open) return;
  opener = document.activeElement;
  dialog.showModal();
  lock();
  await nextTick();
  if (bodyRef.value) bodyRef.value.scrollTop = 0;
  focusInitial();
};

const closeDialog = () => {
  const dialog = dialogRef.value;
  unlock();
  if (dialog?.open) dialog.close();
  // O foco volta para quem abriu
  if (opener && document.contains(opener)) opener.focus();
  opener = null;
};

const requestClose = () => emit("close");

// Fechado por fora (ex.: método do navegador): mantém o estado do pai em dia
const handleNativeClose = () => {
  if (props.open) emit("close");
};

// Clique no fundo: só quando o clique começa e termina no próprio <dialog>
const handlePointerDown = (event) => {
  pointerStartedOnBackdrop = event.target === dialogRef.value;
};

const handleBackdropClick = (event) => {
  if (pointerStartedOnBackdrop && event.target === dialogRef.value) requestClose();
  pointerStartedOnBackdrop = false;
};

watch(
  () => props.open,
  (isOpen) => (isOpen ? openDialog() : closeDialog())
);

onMounted(() => {
  if (props.open) openDialog();
});

onBeforeUnmount(() => {
  if (dialogRef.value?.open) closeDialog();
  unlock();
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/base-dialog";
</style>
