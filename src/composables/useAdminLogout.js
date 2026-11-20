// Saída do painel: encerra a sessão do admin e volta ao login do painel. A barra do topo e
// a sidebar usam a mesma função.
import { useRouter } from "vue-router";
import { useAdminStore } from "@/stores/adminStore";

export function useAdminLogout() {
  const router = useRouter();
  const adminStore = useAdminStore();

  return () => {
    adminStore.logout();
    router.push("/admin/login");
  };
}
