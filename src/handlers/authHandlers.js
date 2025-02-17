import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

export function useAuthHandlers() {
  const router = useRouter();
  const userStore = useUserStore();

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

  const handleLogout = () => {
    userStore.logout();
    router.push('/login');
  };

  return {
    handleLogin,
    handleLogout
  };
}
