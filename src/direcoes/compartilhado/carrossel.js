// Configuração do vue3-carousel das direções, com os rótulos em português do CarouselBurguer.
// A duração do deslize vem de um token de duração do estilo ativo (padrão: --dur-base; zero com
// movimento reduzido), então a página precisa chamar useEstiloAtivo antes de montar a configuração.
import { readDurationToken } from "@/utils/tokens";

// Copiado de src/components/CarouselBurguer.vue
export const ROTULOS_CARROSSEL = {
  ariaNextSlide: "Próximo",
  ariaPreviousSlide: "Anterior",
  ariaNavigateToSlide: "Ir para o item {slideNumber}",
  ariaNavigateToPage: "Ir para a página {slideNumber}",
  ariaGallery: "Mais pedidos",
  itemXofY: "Item {currentSlide} de {slidesCount}",
  iconArrowUp: "Seta para cima",
  iconArrowDown: "Seta para baixo",
  iconArrowLeft: "Seta para a esquerda",
  iconArrowRight: "Seta para a direita",
};

const duracaoDeslize = (token) => {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return 0;
  return readDurationToken(token, 240);
};

// Padrão do carrossel real: 1, 2 e 3 itens a partir de base, sm e lg
export const configCarrossel = ({
  espaco = 24,
  itensPorTela = { 480: 2, 1024: 3 },
  alinhamento = "start",
  duracao = "--dur-base",
} = {}) => ({
  snapAlign: alinhamento,
  wrapAround: true,
  gap: espaco,
  transition: duracaoDeslize(duracao),
  itemsToShow: 1,
  breakpoints: Object.fromEntries(
    Object.entries(itensPorTela).map(([largura, itens]) => [largura, { itemsToShow: itens }])
  ),
  i18n: ROTULOS_CARROSSEL,
});
