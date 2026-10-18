// Monta src, srcset e sizes a partir do caminho-base da imagem (SPEC §9).
// O caminho-base não tem extensão: "/images/foods/cheese-bacon" vira
// cheese-bacon-480.webp, -960.webp, -1440.webp e o fallback cheese-bacon-960.jpg.
import { computed, toValue } from "vue";

const BASE_URL = import.meta.env.BASE_URL;

// Prefixa o BASE_URL do Vite em caminhos internos
export const withBase = (path) => {
  if (!path) return "";
  if (/^(data:|blob:|https?:)/.test(path) || path.startsWith(BASE_URL)) return path;
  return `${BASE_URL}${path.replace(/^\//, "")}`;
};

/**
 * @param {string} base caminho-base (sem extensão) ou caminho completo
 * @param {{ widths?: number[], sizes?: string, fallbackWidth?: number, fallbackExt?: string }} options
 */
export const responsiveImage = (
  base,
  { widths = [480, 960, 1440], sizes = "100vw", fallbackWidth = 960, fallbackExt = "jpg" } = {}
) => {
  if (!base) return { src: "", srcset: "", sizes: "" };

  // Caminho completo (com extensão), data URL ou URL externa: sem variantes
  if (/^(data:|blob:|https?:)/.test(base) || /\.[a-z0-9]{3,4}$/i.test(base)) {
    return { src: withBase(base), srcset: "", sizes: "" };
  }

  const root = withBase(base);
  return {
    src: `${root}-${fallbackWidth}.${fallbackExt}`,
    srcset: widths.map((width) => `${root}-${width}.webp ${width}w`).join(", "),
    sizes,
  };
};

export function useResponsiveImage(base, options = {}) {
  return computed(() => responsiveImage(toValue(base), toValue(options)));
}
