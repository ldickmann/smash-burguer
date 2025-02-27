// Handlers globais para manipulação de botões com autenticação
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

export function useAuthHandlers() {
  const router = useRouter();
  const userStore = useUserStore();

  // Metodo para lidar com o login do usuário
  const handleLogin = async (credentials) => {
    try {
      await userStore.login(credentials);
      router.push('/');
      return { success: true };
    } catch (error) {
      return {
        error: 'Email ou senha inválidos'
      };
    }
  };

  // Metodo para lidar com o logout do usuário
  const handleLogout = () => {
    userStore.logout();
    router.push('/login');
  };

  // Metodo para lidar com o registro do usuário
  const handleRegister = async (userData) => {
    try {
      await userStore.register(userData);
      router.push('/login');
      return { success: true };
    } catch (error) {
      return {
        error: 'Erro ao registrar usuário'
      };
    }
  };

  return {
    handleLogin,
    handleLogout,
    handleRegister
  };
}
