<template>
  <dialog
    ref="dialogRef"
    class="dialog"
    :aria-labelledby="titleId"
    :style="{ '--dialog-max': maxWidth }"
    @cancel.prevent="requestClose"
    @keydown.tab="trapFocus"
    @close="handleNativeClose"
    @pointerdown="handlePointerDown"
    @click="handleBackdropClick"
  >
    <div class="dialog__panel" :class="{ 'is-rolado': rolado, 'tem-mais': temMais }">
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

      <div
        ref="bodyRef"
        class="dialog__body"
        :class="{ 'dialog__body--sem-rodape': !$slots.footer }"
        @scroll.passive="medirRolagem"
      >
        <slot />
      </div>

      <footer v-if="$slots.footer" class="dialog__footer">
        <slot name="footer" />
      </footer>

      <!-- Região de anúncio do diálogo: com o modal aberto, a página atrás é inerte, e a região do
           App.vue não anuncia (o rótulo de carregamento dos botões vem para cá) -->
      <p class="visually-hidden" role="status" aria-atomic="true">{{ anuncio }}</p>
    </div>
  </dialog>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { CHAVE_ANUNCIADOR } from "@/composables/useAnnouncer";
import { useScrollLock } from "@/composables/useScrollLock";
import { useToastStore } from "@/stores/toast";

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
const rolado = ref(false);
const temMais = ref(false);
const anuncio = ref("");
const { lock, unlock } = useScrollLock();
const toastStore = useToastStore();

let opener = null;
let pointerStartedOnBackdrop = false;
// Se este diálogo segura os avisos (segurar() ao abrir, soltar() ao fechar ou desmontar aberto)
let segurando = false;
let observador = null;
let mutacoes = null;

const anunciar = async (texto) => {
  // Limpa antes para que a mesma frase seja anunciada de novo
  anuncio.value = "";
  await nextTick();
  anuncio.value = texto;
};
provide(CHAVE_ANUNCIADOR, anunciar);

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

// O Tab circula entre o primeiro e o último controle, sem sair para o navegador. O Shift+Tab também
// fica preso quando o foco está fora da lista (o título com tabindex="-1", o próprio <dialog>)
const trapFocus = (event) => {
  const focusables = [...dialogRef.value.querySelectorAll(FOCUSABLE)].filter(
    (el) => el.getClientRects().length > 0
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;
  if (event.shiftKey && (active === first || !focusables.includes(active))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
};

// Divisores só com rolagem: o de cima quando o corpo saiu do topo, o de baixo quando há mais conteúdo
const medirRolagem = () => {
  const body = bodyRef.value;
  if (!body) return;
  rolado.value = body.scrollTop > 0;
  temMais.value = body.scrollTop + body.clientHeight < body.scrollHeight - 1;
};

// No teto (max-height), a caixa do corpo não muda quando o conteúdo cresce: além dela, o ResizeObserver
// olha os filhos do corpo (uma imagem que carrega), e o MutationObserver, o conteúdo que entra ou sai
// (as mensagens de erro), que também passa a ser observado
const observarFilhos = () => {
  for (const filho of bodyRef.value?.children ?? []) observador?.observe(filho);
};

const observarCorpo = () => {
  const body = bodyRef.value;
  if (!body) return;
  if (typeof ResizeObserver !== "undefined") {
    observador = new ResizeObserver(medirRolagem);
    observador.observe(body);
    observarFilhos();
  }
  if (typeof MutationObserver !== "undefined") {
    mutacoes = new MutationObserver(() => {
      observarFilhos();
      medirRolagem();
    });
    mutacoes.observe(body, { childList: true, subtree: true, characterData: true });
  }
};

const pararDeObservar = () => {
  observador?.disconnect();
  observador = null;
  mutacoes?.disconnect();
  mutacoes = null;
};

const soltarAvisos = () => {
  if (!segurando) return;
  segurando = false;
  toastStore.soltar();
};

const openDialog = async () => {
  const dialog = dialogRef.value;
  if (!dialog || dialog.open) return;
  opener = document.activeElement;
  dialog.showModal();
  lock();
  if (!segurando) {
    segurando = true;
    toastStore.segurar();
  }
  rolado.value = false;
  temMais.value = false;
  anuncio.value = "";
  await nextTick();
  if (bodyRef.value) bodyRef.value.scrollTop = 0;
  medirRolagem();
  observarCorpo();
  focusInitial();
};

const closeDialog = () => {
  const dialog = dialogRef.value;
  unlock();
  pararDeObservar();
  if (dialog?.open) dialog.close();
  // O foco volta para quem abriu
  if (opener && document.contains(opener)) opener.focus();
  opener = null;
  soltarAvisos();
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

// Desmontado aberto (o ModalProducts com v-if, o perfil que sai com a rota): fecha e solta os avisos
onBeforeUnmount(() => {
  if (dialogRef.value?.open) closeDialog();
  unlock();
  pararDeObservar();
  soltarAvisos();
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/base-dialog";
</style>
