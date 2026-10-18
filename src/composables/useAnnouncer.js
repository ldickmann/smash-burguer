// Região viva invisível (aria-live="polite") renderizada uma vez no App.vue.
// Anuncia retornos que não precisam de toast, como "adicionado ao carrinho".
import { nextTick, ref } from "vue";

const message = ref("");

export function useAnnouncer() {
  const announce = async (text) => {
    // Limpa antes para que a mesma frase seja anunciada de novo
    message.value = "";
    await nextTick();
    message.value = text;
  };

  return { message, announce };
}
