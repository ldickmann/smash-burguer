// A página já rolou? A barra ganha a linha inferior só quando há conteúdo passando por baixo dela
// (Atlassian, Elevation [87]). Escuta passiva, um cálculo por quadro, limpa ao desmontar.
import { onBeforeUnmount, onMounted, ref } from "vue";

export function useRolada() {
  const rolada = ref(false);
  let quadro = 0;

  const medir = () => {
    quadro = 0;
    rolada.value = window.scrollY > 0;
  };

  const aoRolar = () => {
    if (!quadro) quadro = requestAnimationFrame(medir);
  };

  onMounted(() => {
    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", aoRolar);
    if (quadro) cancelAnimationFrame(quadro);
  });

  return { rolada };
}
