// Simula uma chamada à API para autenticação de usuários.
// O "cadastro" do cliente fica em `smash-burger:account`; a sessão (estado da userStore)
// fica em `smash-burger:session`. Antes as duas coisas dividiam a chave `user` (FLX-06).

export const ACCOUNT_KEY = 'smash-burger:account';
const LEGACY_KEY = 'user';

const readAccount = () => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_KEY));
  } catch {
    return null;
  }
};

/**
 * Migração: se `localStorage.user` tiver o formato de cadastro (email e password na raiz),
 * copia para `smash-burger:account` e apaga a chave antiga.
 */
export const migrateLegacyAccount = () => {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    const legacy = raw ? JSON.parse(raw) : null;
    if (legacy && typeof legacy === 'object' && 'email' in legacy && 'password' in legacy) {
      if (!localStorage.getItem(ACCOUNT_KEY)) localStorage.setItem(ACCOUNT_KEY, raw);
      localStorage.removeItem(LEGACY_KEY);
    }
  } catch {
    // Dado antigo ilegível: nada a migrar
  }
};

export const authService = {
  async login(credentials) {
    try {
      // Simular uma chamada à API; credencial inválida rejeita a promise
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const savedUser = readAccount();
          if (savedUser?.email === credentials.email &&
            savedUser?.password === credentials.password) {
            resolve({ ok: true, user: savedUser });
          } else {
            reject(new Error('Credenciais inválidas'));
          }
        }, 1000);
      });

      return response;
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  },

  async register(userData) {
    try {
      // Simular uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(userData));
      return { ok: true };
    } catch (error) {
      throw new Error('Erro ao registrar usuário: ' + error.message);
    }
  },

  async updateProfile(userData) {
    try {
      // Simular uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      const currentUser = readAccount();
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(updatedUser));
      return { ok: true, user: updatedUser };
    } catch (error) {
      throw new Error('Erro ao atualizar perfil: ' + error.message);
    }
  },

  // Sair encerra só a sessão (a userStore limpa o próprio estado); o cadastro continua
  logout() {}
};
