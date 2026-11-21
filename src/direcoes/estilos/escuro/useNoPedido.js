// O que o visitante já tem no pedido, por produto: a soma de `quantity` das linhas do carrinho com o
// mesmo `category` e `productId` (os ids se repetem entre categorias). Só lê o carrinho: não calcula
// preço nem adiciona. É o carrinho do próprio visitante, sincronizado com o cardápio pela store.
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";

export const chaveDoProduto = (categoria, id) => `${categoria}:${id}`;

/**
 * @param {Array<{ category: string, productId: number|string, quantity: number }>} itens
 * @returns {Map<string, number>}
 */
export function somarPorProduto(itens = []) {
  const mapa = new Map();
  for (const item of itens) {
    if (!item || !Number.isFinite(Number(item.quantity))) continue;
    const chave = chaveDoProduto(item.category, item.productId);
    mapa.set(chave, (mapa.get(chave) ?? 0) + Number(item.quantity));
  }
  return mapa;
}

export function useNoPedido() {
  const cartStore = useCartStore();
  const somas = computed(() => somarPorProduto(cartStore.items));
  const quantidadeNoPedido = (produto) => (produto ? somas.value.get(chaveDoProduto(produto.category, produto.id)) ?? 0 : 0);
  return { quantidadeNoPedido };
}
