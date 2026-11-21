// Simula a autenticação de um administrador. O cadastro do admin fica na chave `admin`
// (criado à mão no site publicado); a sessão do painel fica em outra chave, na adminStore.
import { isPlainObject } from '@/utils/storedState';
import { hashPassword, verifyPassword } from '@/utils/password';

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

const PROFILE_FIELDS = ['firstName', 'lastName', 'name', 'email', 'role'];

/**
 * Campos do admin que a sessão do painel guarda: sem a senha, como a sessão do cliente.
 * @param {object} admin
 * @returns {object}
 */
export const pickAdminProfile = (admin) =>
  Object.fromEntries(
    PROFILE_FIELDS.filter((field) => field in admin).map((field) => [field, admin[field]])
  );

// Valor ilegível na chave conta como nenhum admin salvo. Sem o `try`, o erro do
// `JSON.parse` sairia do `setTimeout`, e a promise do login nunca terminaria
const readSavedAdmin = () => {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_KEY));
  } catch {
    return null;
  }
};

/**
 * Confere as credenciais com o admin salvo. Um cadastro com a senha em texto puro (criado
 * à mão) entra e passa a guardar o hash; os campos de sessão que a mesma chave guardava
 * antes da separação saem.
 */
const loginSavedAdmin = async (credentials) => {
  const saved = readSavedAdmin();
  if (!isPlainObject(saved) || saved.email !== credentials.email) return null;
  const { ok, needsUpgrade } = await verifyPassword(credentials.password, saved.password);
  if (!ok) return null;
  if (needsUpgrade) {
    // eslint-disable-next-line no-unused-vars
    const { admin, isAuthenticated, ...registration } = saved;
    try {
      localStorage.setItem(
        ADMIN_KEY,
        JSON.stringify({ ...registration, password: await hashPassword(credentials.password) })
      );
    } catch {
      // Cota cheia ou endereço sem WebCrypto: entra assim mesmo, e a troca fica para depois
    }
  }
  return saved;
};

export const adminAuthService = {
  async login(credentials) {
    try {
      // Simular uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const testAdmin = devTestAdmin();
      const admin =
        (await loginSavedAdmin(credentials)) ??
        (testAdmin?.email === credentials.email && testAdmin.password === credentials.password
          ? testAdmin
          : null);
      if (!admin) throw new Error('Credenciais de administrador inválidas');
      return { ok: true, user: pickAdminProfile(admin) };
    } catch (error) {
      throw new Error('Erro ao fazer login de administrador: ' + error.message);
    }
  },
};
