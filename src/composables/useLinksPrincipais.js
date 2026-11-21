// Links da navegação principal (cópia de src/direcoes/compartilhado/useLinksPrincipais.js). Vêm do
// src/components/layout/TheNavbar.vue: o terceiro link depende da sessão. `inicio` é o destino de
// "Início" e da marca.
import { computed } from "vue";
import { useUserStore } from "@/stores/userStore";

export function useLinksPrincipais(inicio) {
  const userStore = useUserStore();
  return computed(() => [
    { to: inicio, rotulo: "Início" },
    { to: "/menu", rotulo: "Cardápio" },
    userStore.isAuthenticated
      ? { to: "/profile", rotulo: "Perfil" }
      : { to: "/login", rotulo: "Entrar" },
  ]);
}
