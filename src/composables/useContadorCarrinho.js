// Contador do carrinho (cópia de src/direcoes/compartilhado/useContadorCarrinho.js, a mesma lógica
// do CartBadge): quantidade, nome para o leitor de tela e texto do badge com teto de "99+". Sem os
// dígitos e o sentido do odômetro, que sai no M3 (SPEC-material §7.8).
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { formatItemCount } from "@/utils/formatters";

export function useContadorCarrinho() {
  const cartStore = useCartStore();
  const quantidade = computed(() => cartStore.itemCount);

  const rotulo = computed(() =>
    quantidade.value === 0 ? "Carrinho, vazio" : `Carrinho, ${formatItemCount(quantidade.value)}`
  );

  const texto = computed(() => (quantidade.value >= 100 ? "99+" : String(quantidade.value)));

  return { quantidade, rotulo, texto };
}
