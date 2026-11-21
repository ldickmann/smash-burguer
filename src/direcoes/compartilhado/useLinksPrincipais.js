import { computed } from "vue";
import { useUserStore } from "@/stores/userStore";

// src/components/layout/TheNavbar.vue: o terceiro link depende da sessão. "Início" e a marca
// levam à Home do próprio estilo; o resto abre as telas reais.
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
