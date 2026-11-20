// Simula a autenticação de um administrador

const ADMIN_KEY = 'admin';

// Valor ilegível na chave conta como nenhum admin salvo. Sem o `try`, o erro do
// `JSON.parse` sairia do `setTimeout`, e a promise do login nunca terminaria
const readSavedAdmin = () => {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_KEY));
  } catch {
    return null;
  }
};

export const adminAuthService = {
  async login(credentials) {
    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const savedAdmin = readSavedAdmin();
          if (savedAdmin?.email === credentials.email &&
            savedAdmin?.password === credentials.password) {
            resolve({ ok: true, user: savedAdmin });
          } else {
            reject(new Error('Credenciais de administrador inválidas'));
          }
        }, 1000);
      });

      return response;
    } catch (error) {
      throw new Error('Erro ao fazer login de administrador: ' + error.message);
    }
  },

  logout() {
    localStorage.removeItem(ADMIN_KEY);
  }
};
