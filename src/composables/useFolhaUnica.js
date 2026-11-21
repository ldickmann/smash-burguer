// Uma folha (disclosure) aberta por vez (cópia de src/direcoes/estilos/material/useFolhaUnica.js):
// abrir outra fecha a anterior; Esc fecha e devolve o foco ao botão que a abriu; o pointerdown fora
// da área do botão (o card) fecha sem mover o foco. Os listeners do documento saem no
// onBeforeUnmount.
import { onBeforeUnmount, onMounted, ref } from "vue";

export function useFolhaUnica({ area = (botao) => botao?.closest("article") ?? botao } = {}) {
  const aberta = ref(null);
  let botaoAtual = null;

  const fechar = ({ devolverFoco = false } = {}) => {
    if (aberta.value === null) return;
    const botao = botaoAtual;
    aberta.value = null;
    botaoAtual = null;
    if (devolverFoco) botao?.focus();
  };

  const alternar = (id, botao = null) => {
    if (aberta.value === id) {
      fechar();
      return;
    }
    aberta.value = id;
    botaoAtual = botao;
  };

  const aoTeclar = (evento) => {
    if (evento.key === "Escape" && aberta.value !== null) fechar({ devolverFoco: true });
  };

  const aoApontar = (evento) => {
    if (aberta.value === null) return;
    const dentro = area(botaoAtual);
    if (!dentro || !dentro.contains(evento.target)) fechar();
  };

  onMounted(() => {
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("pointerdown", aoApontar);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", aoTeclar);
    document.removeEventListener("pointerdown", aoApontar);
  });

  return { aberta, alternar, fechar };
}
