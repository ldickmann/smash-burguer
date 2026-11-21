// Contador do carrinho, a mesma lógica do CartBadge: quantidade, rótulo para leitor de tela,
// texto com teto de "99+", um dígito por janela (da direita para a esquerda) e o sentido da
// última mudança, para cada estilo animar do seu jeito.
import { computed, ref, watch } from "vue";
import { useCartStore } from "@/stores/cart";
import { formatItemCount } from "@/utils/formatters";

export function useContadorCarrinho() {
  const cartStore = useCartStore();
  const quantidade = computed(() => cartStore.itemCount);

  const rotulo = computed(() =>
    quantidade.value === 0 ? "Carrinho, vazio" : `Carrinho, ${formatItemCount(quantidade.value)}`
  );

  const texto = computed(() => (quantidade.value >= 100 ? "99+" : String(quantidade.value)));

  const digitos = computed(() => {
    const caracteres = [...texto.value];
    return caracteres.map((caractere, index) => {
      const daDireita = caracteres.length - 1 - index;
      return { chave: `pos-${daDireita}`, caractere, daDireita };
    });
  });

  // "sobe", "desce" ou "nenhum" (primeira renderização, entrada 0 → 1 e saída para 0)
  const sentido = ref("nenhum");
  watch(quantidade, (atual, anterior) => {
    if (!anterior || !atual) sentido.value = "nenhum";
    else sentido.value = atual > anterior ? "sobe" : "desce";
  });

  return { quantidade, rotulo, texto, digitos, sentido };
}
