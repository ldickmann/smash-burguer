// Handlers globais de autenticação do cliente
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useToastStore } from '@/stores/toast';

/**
 * Aceita só caminhos internos (começando com uma barra) como destino depois do login.
 * @param {unknown} value - valor de `?redirect=`
 * @returns {string|null}
 */
export const safeRedirect = (value) =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : null;

export function useAuthHandlers() {
  const router = useRouter();
  const userStore = useUserStore();
  const toastStore = useToastStore();

  // Entra e vai para o `redirect` da URL, ou para a Home
  const handleLogin = async (credentials, redirect) => {
    try {
      await userStore.login(credentials);
      router.push(safeRedirect(redirect) ?? '/');
      return { success: true };
    } catch {
      return {
        error: 'E-mail ou senha incorretos.'
      };
    }
  };

  // Metodo para lidar com o logout do usuário
  const handleLogout = () => {
    userStore.logout();
    router.push('/login');
  };

  // Cria a conta e volta ao login mantendo o destino
  const handleRegister = async (userData, redirect) => {
    try {
      await userStore.register(userData);
      toastStore.show({ message: 'Conta criada. Entre para continuar.', variant: 'success' });
      const target = safeRedirect(redirect);
      router.push(target ? { path: '/login', query: { redirect: target } } : '/login');
      return { success: true };
    } catch {
      return {
        error: 'Não foi possível criar a conta. Tente de novo.'
      };
    }
  };

  return {
    handleLogin,
    handleLogout,
    handleRegister
  };
}
