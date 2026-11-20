// Liga os tokens de uma direção ao documento inteiro: `data-direcao` e `color-scheme` no <html>.
// Assim o <body>, o modal Personalizar e o toast (componentes reais) acompanham o estilo.
// Chame no início do setup da página, antes de ler qualquer token pelo JS.
import { onBeforeUnmount } from "vue";

export function useEstiloAtivo(slug, { esquema = "light" } = {}) {
  const html = document.documentElement;
  html.dataset.direcao = slug;
  html.style.colorScheme = esquema;

  onBeforeUnmount(() => {
    // Outra página de direção pode já ter assumido o <html>
    if (html.dataset.direcao !== slug) return;
    delete html.dataset.direcao;
    html.style.removeProperty("color-scheme");
  });
}
