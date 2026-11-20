// Simula a autenticação de um administrador
import { isPlainObject } from '@/utils/storedState';

const ADMIN_KEY = 'admin';

/**
 * Admin de teste do `yarn dev`, com credenciais fictícias e públicas. No build,
 * `import.meta.env.DEV` vira `false` e o objeto sai do bundle: no site publicado, o painel
 * só abre com o admin criado à mão na chave `admin`.
 * @returns {object|null}
 */
export const devTestAdmin = () =>
  import.meta.env.DEV
    ? {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: 'Demo1234',
        role: 'admin',
      }
    : null;

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
    const matches = (admin) =>
      isPlainObject(admin) &&
      admin.email === credentials.email &&
      admin.password === credentials.password;

    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          const admin = [readSavedAdmin(), devTestAdmin()].find(matches);
          if (admin) {
            resolve({ ok: true, user: admin });
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
