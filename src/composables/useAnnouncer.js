// Região viva invisível (aria-live="polite") renderizada uma vez no App.vue.
// Anuncia retornos que não precisam de toast, como "adicionado ao carrinho".
import { nextTick, ref } from "vue";

// O BaseDialog fornece o anunciador dele por esta chave: com o diálogo modal aberto, a página atrás
// é inerte, e a região do App.vue não anuncia (desenho dos componentes base, §5.7)
export const CHAVE_ANUNCIADOR = Symbol("anunciador");

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
