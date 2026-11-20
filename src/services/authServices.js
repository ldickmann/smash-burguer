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

const text = (value) => (typeof value === 'string' ? value : '');

/**
 * Os campos do perfil: os que a tela edita e os únicos que a sessão guarda (sem a senha
 * nem a data de nascimento). A cópia é feita campo a campo, então não divide objetos com
 * quem chamou, como o endereço reativo do formulário.
 * @param {object} data
 * @returns {{ firstName: string, lastName: string, email: string, phone: string, CEP: string,
 *   address: { street: string, neighborhood: string, city: string, state: string } }}
 */
export const pickProfile = (data) => ({
  firstName: text(data?.firstName),
  lastName: text(data?.lastName),
  email: text(data?.email),
  phone: text(data?.phone),
  CEP: text(data?.CEP),
  address: {
    street: text(data?.address?.street),
    neighborhood: text(data?.address?.neighborhood),
    city: text(data?.address?.city),
    state: text(data?.address?.state),
  },
});

/** Há um cadastro salvo neste navegador? O app guarda um só. */
export const hasSavedAccount = () => readAccount() !== null;

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
            // A sessão recebe só os campos do perfil; a senha fica no cadastro
            resolve({ ok: true, user: pickProfile(savedUser) });
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
      // Copiado na hora do envio: o que mudar no formulário durante a espera não entra
      const account = {
        ...pickProfile(userData),
        password: text(userData?.password),
        dateOfBirth: text(userData?.dateOfBirth),
      };
      // Simular uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
      return { ok: true };
    } catch (error) {
      throw new Error('Erro ao registrar usuário: ' + error.message);
    }
  },

  /**
   * @param {object} userData - dados do formulário do perfil
   * @param {string} currentEmail - e-mail da sessão; o cadastro salvo precisa ser o dela
   */
  async updateProfile(userData, currentEmail) {
    try {
      // Copiado na hora do envio, campo a campo (ver pickProfile)
      const changes = pickProfile(userData);
      // Simular uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      const currentUser = readAccount();
      // Cadastro excluído ou trocado por outro (por exemplo, em outra aba)
      if (!currentUser || currentUser.email !== currentEmail) {
        throw new Error('o cadastro salvo não é o da sessão');
      }
      const updatedUser = { ...currentUser, ...changes };
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify(updatedUser));
      return { ok: true, user: pickProfile(updatedUser) };
    } catch (error) {
      throw new Error('Erro ao atualizar perfil: ' + error.message);
    }
  },

  /**
   * Apaga o cadastro deste navegador, se for o da sessão; a userStore encerra a sessão depois.
   * @param {string} currentEmail - e-mail da sessão
   */
  async deleteAccount(currentEmail) {
    try {
      // Simular uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // O cadastro de outra pessoa (trocado em outra aba) não é apagado
      if (readAccount()?.email === currentEmail) localStorage.removeItem(ACCOUNT_KEY);
      return { ok: true };
    } catch (error) {
      throw new Error('Erro ao excluir a conta: ' + error.message);
    }
  },

  // Sair encerra só a sessão (a userStore limpa o próprio estado); o cadastro continua
  logout() {}
};
