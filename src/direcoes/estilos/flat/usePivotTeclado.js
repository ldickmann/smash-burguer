// Teclado das abas no padrão da APG [F46]: setas esquerda e direita com volta do fim ao início, Home e
// End, ativação automática e tabindex móvel (só a aba ativa entra na ordem do Tab). Guarda o sentido
// da última troca ("avanca" ou "recua"), para o painel que entra deslizar do lado certo: da última
// aba para a primeira pela seta direita conta como avanço.
import { nextTick, ref, toValue, watch } from "vue";

export function usePivotTeclado({ chaves, atual, mudar }) {
  const botoes = [];
  const sentido = ref("avanca");
  let pedido = null;

  const indice = (chave) => toValue(chaves).indexOf(chave);

  // Clique e troca de fora (ladrilhos): o sentido sai da posição; pelo teclado, do pedido
  watch(
    () => toValue(atual),
    (nova, antiga) => {
      sentido.value = pedido ?? (indice(nova) >= indice(antiga) ? "avanca" : "recua");
      pedido = null;
    }
  );

  const registrar = (el, i) => {
    botoes[i] = el;
  };

  const ir = async (alvo, direcao) => {
    const lista = toValue(chaves);
    if (!lista.length) return;
    const posicao = (alvo + lista.length) % lista.length;
    const chave = lista[posicao];
    if (chave !== toValue(atual)) {
      pedido = direcao;
      mudar(chave);
    }
    await nextTick();
    botoes[posicao]?.focus();
  };

  const aoTeclar = (evento, i) => {
    const ultimo = toValue(chaves).length - 1;
    const passos = {
      ArrowRight: [i + 1, "avanca"],
      ArrowLeft: [i - 1, "recua"],
      Home: [0, "recua"],
      End: [ultimo, "avanca"],
    };
    const passo = passos[evento.key];
    if (!passo) return;
    evento.preventDefault();
    ir(...passo);
  };

  return { sentido, registrar, aoTeclar };
}
