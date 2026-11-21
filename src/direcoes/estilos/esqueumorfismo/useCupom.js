// O cupom da impressora espelha o carrinho real [E17]: as últimas linhas, os detalhes de cada uma
// (as mesmas strings do carrinho, por describeItem) e o subtotal do getter da store. Não calcula
// preço, só formata. `impressao` sobe quando entra uma linha nova depois da montagem (a piscada do
// LED e a linha que sai da fenda); na montagem, nada anima.
import { computed, ref, watch } from "vue";
import { useCartStore } from "@/stores/cart";
import { describeItem, formatItemCount, formatPrice } from "@/utils/formatters";

// A janela do papel: as linhas mais recentes, junto da fenda
export const LINHAS_VISIVEIS = 3;

export function useCupom() {
  const cartStore = useCartStore();

  const vazio = computed(() => cartStore.items.length === 0);
  const inicio = computed(() => Math.max(0, cartStore.items.length - LINHAS_VISIVEIS));

  const linhas = computed(() =>
    cartStore.items.slice(inicio.value).map((item, indice) => ({
      // O índice absoluto separa duas linhas do mesmo produto com escolhas diferentes
      chave: `${item.productId}-${item.category}-${inicio.value + indice}`,
      quantidade: item.quantity,
      nome: item.name,
      preco: formatPrice(item.unitPrice),
      cada: item.quantity > 1,
      detalhes: describeItem(item),
    }))
  );

  // As linhas fora da janela, contadas pela quantidade ("2 itens")
  const ocultos = computed(() => {
    const fora = cartStore.items.slice(0, inicio.value).reduce((total, item) => total + item.quantity, 0);
    return fora ? formatItemCount(fora) : null;
  });

  const subtotal = computed(() => formatPrice(cartStore.subtotal));

  const impressao = ref(0);
  watch(
    () => cartStore.items.length,
    (atual, anterior) => {
      if (atual > anterior) impressao.value += 1;
    }
  );

  return { vazio, linhas, ocultos, subtotal, impressao };
}
