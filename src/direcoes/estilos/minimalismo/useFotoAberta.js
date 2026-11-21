// Uma foto por vez: a regra da Home do minimalismo. A página inteira é texto, e a única cor é a foto
// da linha que a pessoa abriu com "Ver foto" [M3][M44]. Abrir outra fecha a anterior, em qualquer
// das três categorias; "Ver foto" na linha aberta fecha a foto. A Home cria (provide) e as linhas
// leem (inject).
import { computed, inject, nextTick, provide, ref, watch } from "vue";

const CHAVE_FOTO = Symbol("foto-aberta");

// Os ids se repetem entre as categorias do products.json: a chave leva a categoria
export const chaveFoto = (categoria, produto) => `${categoria}:${produto.id}`;

/**
 * @param {import("vue").Ref<Array<{ chave: string, itens: object[] }>>} categorias as listas do useCardapio
 */
export function criarFotoAberta(categorias) {
  // Chaves das linhas que têm foto, na ordem do catálogo
  const comFoto = computed(() =>
    categorias.value.flatMap((c) => c.itens.filter((p) => p.image).map((p) => chaveFoto(c.chave, p)))
  );

  // Estado inicial: o primeiro lanche com imagem; sem nenhum, nada abre
  const lanches = categorias.value.find((c) => c.chave === "foods");
  const primeiro = lanches?.itens.find((p) => p.image);
  const atual = ref(primeiro ? chaveFoto("foods", primeiro) : null);

  // Produto sumido (ou sem imagem depois de editado): a foto fecha, sem abrir outra
  watch(comFoto, (chaves) => {
    if (atual.value && !chaves.includes(atual.value)) atual.value = null;
  });

  const aberta = (chave) => atual.value === chave;

  // Quando a linha que fecha está acima da clicada, o conteúdo encolhe acima da pessoa: o botão é
  // medido antes e depois da troca, e a rolagem compensa a diferença. Se o navegador já ancorou a
  // rolagem, a diferença é zero e nada acontece.
  async function alternar(chave, botao) {
    const antes = botao?.getBoundingClientRect().top;
    atual.value = atual.value === chave ? null : chave;
    await nextTick();
    if (antes === undefined || !botao.isConnected) return;
    const diferenca = botao.getBoundingClientRect().top - antes;
    if (Math.abs(diferenca) >= 1) window.scrollBy(0, diferenca);
  }

  const api = { atual, aberta, alternar };
  provide(CHAVE_FOTO, api);
  return api;
}

export function useFotoAberta() {
  const api = inject(CHAVE_FOTO, null);
  if (!api) throw new Error("useFotoAberta() precisa da Home do minimalismo (criarFotoAberta).");
  return api;
}
