<template>
  <!-- Duas regiões vivas fixas, que existem antes da mensagem (ARIA22 e ARIA19): a de status lê só o
       aviso novo (aria-atomic="false", desvio declarado); a de erro interrompe. Os avisos retidos
       (com um diálogo aberto) ficam fora das duas até o diálogo fechar (desenho dos componentes
       base, §4.2 e §5.1) -->
  <div ref="regiao" class="toast-region" @focusin="guardarOrigem">
    <TransitionGroup
      v-for="lista in listas"
      :key="lista.nome"
      name="toast"
      tag="div"
      class="toast-region__list"
      :class="`toast-region__list--${lista.nome}`"
      :role="lista.nome"
      :aria-atomic="lista.atomico"
    >
      <div
        v-for="toast in lista.avisos"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.variant}`"
        :data-toast-id="toast.id"
        @mouseenter="toastStore.pause(toast.id)"
        @mouseleave="toastStore.resume(toast.id)"
        @focusin="toastStore.pause(toast.id)"
        @focusout="handleFocusOut($event, toast.id)"
      >
        <font-awesome-icon
          v-if="toast.variant === 'error'"
          :icon="['fas', 'circle-exclamation']"
          class="toast__icon"
          aria-hidden="true"
        />
        <p class="toast__message">{{ toast.message }}</p>
        <BaseButton
          v-if="toast.action"
          class="toast__action"
          variant="ghost"
          :icon-start="toast.action.icon"
          @click="agir(toast.id, $event)"
        >
          {{ toast.action.label }}
        </BaseButton>
        <BaseButton
          class="toast__close"
          variant="ghost"
          icon-only
          icon-start="xmark"
          label="Fechar aviso"
          @click="fechar(toast.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useToastStore } from "@/stores/toast";

const toastStore = useToastStore();
const route = useRoute();
const regiao = ref(null);

// Só os que não estão retidos aparecem; o erro fica embaixo, perto da borda
const visiveis = computed(() => toastStore.toasts.filter((toast) => !toast.retido));
const listas = computed(() => [
  { nome: "status", atomico: "false", avisos: visiveis.value.filter((toast) => toast.variant !== "error") },
  { nome: "alert", atomico: "true", avisos: visiveis.value.filter((toast) => toast.variant === "error") },
]);
// A pilha na ordem da tela, de cima para baixo
const pilha = computed(() => listas.value.flatMap((lista) => lista.avisos));

// Os que não expiram (com ação, de erro ou duration: 0) saem quando o caminho muda; os de 4 s ficam
// até o tempo deles (o "Seu carrinho está vazio." nasce no guard e sobrevive ao redirecionamento)
watch(
  () => route?.path,
  (novo, antigo) => {
    if (novo !== antigo) toastStore.dismissPersistentes();
  }
);

// Última entrada (teclado ou ponteiro), pela captura do document: o foco só se move depois de fechar
// um aviso se a pessoa usa o teclado (quem clica não vê o anel, e mover o foco rolaria a página)
let ultimaEntrada = "ponteiro";
const marcarPonteiro = () => (ultimaEntrada = "ponteiro");
const marcarTeclado = () => (ultimaEntrada = "teclado");

onMounted(() => {
  document.addEventListener("pointerdown", marcarPonteiro, true);
  document.addEventListener("keydown", marcarTeclado, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", marcarPonteiro, true);
  document.removeEventListener("keydown", marcarTeclado, true);
});

// Origem: o elemento de onde o foco veio quando entrou na região
let origem = null;
const guardarOrigem = (event) => {
  const de = event.relatedTarget;
  if (de && !regiao.value?.contains(de)) origem = de;
};

// Perdido também quando o foco ainda está no aviso dispensado: ele fica no DOM durante a transição de
// saída, e o foco cairia no body quando ele sair
const focoPerdido = (id) => {
  const ativo = document.activeElement;
  return (
    !ativo ||
    ativo === document.body ||
    !document.contains(ativo) ||
    !!ativo.closest?.(`[data-toast-id="${id}"]`)
  );
};

// Destino do foco depois que um aviso sai: o primeiro botão do aviso seguinte na pilha (o de baixo;
// sem ele, o de cima); sem outro aviso, a origem, se ainda está na página; sem origem, o main
const destinoDepoisDe = (id) => {
  const ids = pilha.value.map((toast) => toast.id);
  const indice = ids.indexOf(id);
  const vizinhoId = ids[indice + 1] ?? ids[indice - 1];
  return () => {
    const vizinho =
      vizinhoId !== undefined && regiao.value?.querySelector(`[data-toast-id="${vizinhoId}"] button`);
    if (vizinho) return vizinho;
    if (origem && document.contains(origem) && !regiao.value?.contains(origem)) return origem;
    return document.getElementById("conteudo");
  };
};

const fechar = async (id) => {
  const destino = destinoDepoisDe(id);
  toastStore.dismiss(id);
  if (ultimaEntrada !== "teclado") return;
  await nextTick();
  destino()?.focus();
};

// A ação roda primeiro (o CartView leva o foco ao "Remover" do item devolvido); se o foco ficou
// perdido e a última entrada foi de teclado, vale a regra do "Fechar aviso"
const agir = async (id, event) => {
  const destino = destinoDepoisDe(id);
  await toastStore.runAction(id, event);
  await nextTick();
  if (ultimaEntrada === "teclado" && focoPerdido(id)) destino()?.focus();
};

// Só retoma o tempo quando o foco sai do aviso inteiro
const handleFocusOut = (event, id) => {
  if (!event.currentTarget.contains(event.relatedTarget)) toastStore.resume(id);
};

// O foco que não se move: depois de mostrar um aviso, o elemento focado sobe acima da reserva
// (scroll-padding-bottom), como o CartView, o ProfileView e a OrderManagement já fazem. Olha os ids,
// e não a contagem: o quarto aviso entra e tira o mais antigo no mesmo tick, e a contagem fica em 3
watch(
  () => visiveis.value.map((toast) => toast.id),
  async (agora, antes) => {
    const entrou = agora.some((id) => !antes?.includes(id));
    if (!entrou || ultimaEntrada !== "teclado") return;
    await nextTick();
    const ativo = document.activeElement;
    if (ativo && ativo !== document.body && !regiao.value?.contains(ativo)) {
      ativo.scrollIntoView?.({ block: "nearest" });
    }
  }
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/app-toast";
</style>
