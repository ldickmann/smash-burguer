// O lanche em foco no painel: a tecla marcada e o que o visor mostra. O cardápio é editável no
// painel: se o lanche marcado some, o visor volta ao primeiro da lista; com a lista vazia, null.
// `interagiu` liga na primeira escolha do usuário (o pulso do visor só responde a um gesto).
import { computed, ref, toValue } from "vue";

/**
 * @param {Array | import("vue").Ref<Array> | (() => Array)} lista
 */
export function useLancheNoVisor(lista) {
  const escolhido = ref(null);
  const interagiu = ref(false);

  const produtos = computed(() => toValue(lista) ?? []);
  const produto = computed(
    () => produtos.value.find((item) => item.id === escolhido.value) ?? produtos.value[0] ?? null
  );

  const selecionar = (id) => {
    escolhido.value = id;
    interagiu.value = true;
  };

  // O id marcado de fato (o do produto no visor), para o rádio nunca ficar sem marca
  const idSelecionado = computed({
    get: () => produto.value?.id ?? null,
    set: selecionar,
  });

  return { idSelecionado, produto, interagiu, selecionar };
}
