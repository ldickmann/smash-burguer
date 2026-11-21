// Cardápio por categoria (cópia de src/direcoes/compartilhado/useCardapio.js): as listas reais, com
// o rótulo do MenuView, e os derivados sempre calculados (quantidade e menor preço), nunca escritos
// à mão. O cardápio é editável no painel: uma lista pode vir vazia, um produto pode sumir, o preço
// pode mudar.
import { computed } from "vue";
import { useProductsStore } from "@/stores/products";
import { formatPrice } from "@/utils/formatters";
import { CATEGORIAS } from "@/utils/textosLoja";

const precoValido = (produto) => Number.isFinite(Number(produto?.price));

// Menor preço de uma lista (null se não houver nenhum preço válido)
export function menorPreco(lista = []) {
  const precos = lista.filter(precoValido).map((p) => Number(p.price));
  return precos.length ? Math.min(...precos) : null;
}

// Quantidade e menor preço de uma lista, com o preço já formatado (formatPrice)
export function resumoCategoria(lista = []) {
  const menor = menorPreco(lista);
  return {
    quantidade: lista.length,
    menorPreco: menor,
    menorPrecoTexto: menor === null ? "" : formatPrice(menor),
  };
}

// "1 adicional" / "5 adicionais": quem chama dá as palavras; o número sai da lista
export const contar = (quantidade, [singular, plural]) => `${quantidade} ${quantidade === 1 ? singular : plural}`;

export function useCardapio() {
  const produtos = useProductsStore();

  // [{ chave, rotulo, itens, vazia, quantidade, menorPreco, menorPrecoTexto }] na ordem do MenuView
  const categorias = computed(() =>
    CATEGORIAS.map((categoria) => {
      const itens = produtos[categoria.chave] ?? [];
      return { ...categoria, itens, vazia: itens.length === 0, ...resumoCategoria(itens) };
    })
  );

  const categoria = (chave) => computed(() => categorias.value.find((c) => c.chave === chave));

  // Produto por nome, com reserva: o primeiro da categoria quando ele foi excluído ou renomeado
  const produtoOuReserva = (chave, nome) => {
    const lista = produtos[chave] ?? [];
    return lista.find((p) => p.name === nome) ?? lista[0] ?? null;
  };

  // Adicionais com o preço formatado
  const adicionais = computed(() => ({
    lanche: (produtos.foodAdditionals ?? []).map((a) => ({ ...a, precoTexto: formatPrice(a.price) })),
    sobremesa: (produtos.dessertAdditionals ?? []).map((a) => ({ ...a, precoTexto: formatPrice(a.price) })),
  }));

  return { categorias, categoria, produtoOuReserva, adicionais };
}
