// Foco nunca escondido atrás do cabeçalho fixo (WCAG 2.4.11): enquanto a barra estiver fixa (a partir
// de md), o <html> ganha scroll-padding-top com a altura dela mais --space-4. Atualiza quando a barra
// muda de altura ou a tela cruza o breakpoint, e devolve o valor anterior ao desmontar.
import { onBeforeUnmount, onMounted, toValue } from "vue";

// Mesmo valor do breakpoint md do SCSS (_breakpoints.scss)
const FIXO = "(min-width: 768px)";

export function useFolgaTopo(alvo, { consulta = FIXO } = {}) {
  const html = document.documentElement;
  const anterior = html.style.scrollPaddingTop;
  let media = null;
  let observador = null;

  const aplicar = () => {
    const el = toValue(alvo);
    if (!el || !media?.matches) {
      html.style.scrollPaddingTop = anterior;
      return;
    }
    const altura = Math.ceil(el.getBoundingClientRect().height);
    html.style.scrollPaddingTop = `calc(${altura}px + var(--space-4))`;
  };

  onMounted(() => {
    media = window.matchMedia?.(consulta) ?? null;
    media?.addEventListener?.("change", aplicar);
    const el = toValue(alvo);
    if (el && typeof ResizeObserver === "function") {
      observador = new ResizeObserver(aplicar);
      observador.observe(el);
    }
    aplicar();
  });

  onBeforeUnmount(() => {
    media?.removeEventListener?.("change", aplicar);
    observador?.disconnect();
    html.style.scrollPaddingTop = anterior;
  });
}
