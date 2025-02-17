import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

export const useAuthHandlers = () => {
  const userStore = useUserStore();
  const router = useRouter();

  const handleLogin = async (credentials) => {
    try {
      await userStore.login(credentials);
      router.push('/cart');
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { error: 'Email ou senha inválidos' };
    }
  };

  const handleLogout = () => {
    userStore.logout();
    router.push('/login');
  };

  return {
    handleLogin,
    handleLogout
  };
};
