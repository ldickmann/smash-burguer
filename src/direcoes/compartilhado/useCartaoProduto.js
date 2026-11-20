// Lógica do card de produto, a mesma do ProductCard: imagem responsiva, preço formatado,
// erro de imagem e o estado "adicionado", que dura --dur-base + --dur-hold e reinicia a cada adição.
import { computed, onBeforeUnmount, ref, toValue } from "vue";
import { formatPrice } from "@/utils/formatters";
import { responsiveImage } from "@/composables/useResponsiveImage";
import { readDurationToken } from "@/utils/tokens";

// Mesmo `sizes` do card compacto do carrossel real (ProductCard.vue)
export const TAMANHOS_CARD = "(min-width: 1024px) 380px, (min-width: 480px) 45vw, 92vw";

export function useCartaoProduto(produto, { sizes = TAMANHOS_CARD } = {}) {
  const imagem = computed(() => responsiveImage(toValue(produto).image, { sizes }));
  const preco = computed(() => formatPrice(toValue(produto).price));
  const imagemFalhou = ref(false);
  const adicionado = ref(false);
  let temporizador;

  const marcarAdicionado = () => {
    adicionado.value = true;
    clearTimeout(temporizador);
    temporizador = setTimeout(
      () => (adicionado.value = false),
      readDurationToken("--dur-base", 240) + readDurationToken("--dur-hold", 1200)
    );
  };

  onBeforeUnmount(() => clearTimeout(temporizador));

  // Contexto que o useProductModal guarda ao abrir o modal e chama ao confirmar
  const contexto = { markAdded: marcarAdicionado };

  return { imagem, preco, imagemFalhou, adicionado, marcarAdicionado, contexto };
}
