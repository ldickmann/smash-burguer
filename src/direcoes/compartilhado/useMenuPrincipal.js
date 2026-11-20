// Comportamento do menu principal no celular, o mesmo do TheNavbar: abre levando o foco ao
// primeiro link, trava a rolagem, fecha com Esc (devolvendo o foco ao botão), com clique fora,
// na troca de rota e quando a tela passa a mostrar o menu inline.
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useScrollLock } from "@/composables/useScrollLock";

// Mesmo valor do breakpoint md do SCSS (_breakpoints.scss)
const MENU_INLINE = "(min-width: 768px)";

export function useMenuPrincipal({ consultaInline = MENU_INLINE } = {}) {
  const route = useRoute();
  const { lock, unlock } = useScrollLock();
  const media = window.matchMedia?.(consultaInline);

  const cabecalho = ref(null);
  const menu = ref(null);
  const botaoMenu = ref(null);
  const aberto = ref(false);

  const abrir = async () => {
    aberto.value = true;
    lock();
    await nextTick();
    menu.value?.querySelector("a")?.focus();
  };

  const fechar = ({ devolverFoco = false } = {}) => {
    if (!aberto.value) return;
    aberto.value = false;
    unlock();
    if (devolverFoco) botaoMenu.value?.focus();
  };

  const alternar = () => (aberto.value ? fechar() : abrir());

  const aoTeclar = (event) => {
    if (event.key === "Escape" && aberto.value) fechar({ devolverFoco: true });
  };

  const aoApontar = (event) => {
    if (aberto.value && !cabecalho.value?.contains(event.target)) fechar();
  };

  const aoMudarTela = (event) => {
    if (event.matches) fechar();
  };

  watch(() => route.fullPath, () => fechar());

  onMounted(() => {
    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("pointerdown", aoApontar);
    media?.addEventListener("change", aoMudarTela);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", aoTeclar);
    document.removeEventListener("pointerdown", aoApontar);
    media?.removeEventListener("change", aoMudarTela);
    unlock();
  });

  return { cabecalho, menu, botaoMenu, aberto, alternar, fechar };
}
