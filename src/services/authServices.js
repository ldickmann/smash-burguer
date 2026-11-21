// Simula uma chamada à API para autenticação de usuários.
// O "cadastro" do cliente fica em `smash-burger:account`, com a senha em hash e o
// histórico de pedidos; a sessão (estado da userStore) fica em `smash-burger:session`.
// Antes as duas coisas dividiam a chave `user` (FLX-06).
import { hashPassword, verifyPassword } from '@/utils/password';
import { isOrder, isPlainObject } from '@/utils/storedState';

export const ACCOUNT_KEY = 'smash-burger:account';
const LEGACY_KEY = 'user';

const readAccount = () => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_KEY));
  } catch {
    return null;
  }
};

const writeAccount = (account) => localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));

// Espera simulada de uma chamada à API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Histórico guardado no cadastro: os pedidos no formato certo e o próximo número.
 * @param {unknown} account
 * @returns {{ orderHistory: object[], nextOrderId: number|null }}
 */
const ordersOf = (account) => ({
  orderHistory: Array.isArray(account?.orderHistory) ? account.orderHistory.filter(isOrder) : [],
  nextOrderId: Number.isSafeInteger(account?.nextOrderId) ? account.nextOrderId : null,
});

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

// Cadastro: um objeto com email e password na raiz
const isAccountRecord = (value) => isPlainObject(value) && 'email' in value && 'password' in value;

/**
 * Migração da chave antiga `localStorage.user` para `smash-burger:account`. Ela tinha um
 * de dois formatos: o de cadastro (email e password na raiz), de quem só se cadastrou, ou
 * o de sessão (`{ user: { email, password, … }, isAuthenticated, orderHistory }`), de quem
 * entrou na versão antiga. No segundo, o histórico vai junto para o cadastro.
 */
export const migrateLegacyAccount = () => {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    const legacy = raw ? JSON.parse(raw) : null;
    let account = null;
    if (isAccountRecord(legacy)) {
      account = legacy;
    } else if (isPlainObject(legacy) && isAccountRecord(legacy.user)) {
      account = { ...legacy.user, orderHistory: ordersOf(legacy).orderHistory };
    }
    if (account) {
      if (!localStorage.getItem(ACCOUNT_KEY)) writeAccount(account);
      localStorage.removeItem(LEGACY_KEY);
    }
  } catch {
    // Dado antigo ilegível: nada a migrar
  }
};

export const authService = {
  /**
   * @returns {Promise<{ ok: true, user: object, orderHistory: object[], nextOrderId: number|null }>}
   *   o perfil (sem a senha) e o histórico guardado no cadastro
   */
  async login(credentials) {
    try {
      // Simular uma chamada à API
      await delay(1000);
      const savedUser = readAccount();
      if (!isPlainObject(savedUser) || savedUser.email !== credentials.email) {
        throw new Error('Credenciais inválidas');
      }
      const { ok, needsUpgrade } = await verifyPassword(credentials.password, savedUser.password);
      if (!ok) throw new Error('Credenciais inválidas');

      // Cadastro de antes do hash: a senha em texto puro dá lugar ao hash. Se não der (cota
      // cheia, ou um endereço sem WebCrypto), a pessoa entra assim mesmo e a troca fica para depois
      if (needsUpgrade) {
        try {
          writeAccount({ ...savedUser, password: await hashPassword(credentials.password) });
        } catch {
          // Fica para o próximo login
        }
      }
      // A sessão recebe só os campos do perfil; a senha fica no cadastro
      return { ok: true, user: pickProfile(savedUser), ...ordersOf(savedUser) };
    } catch (error) {
      throw new Error('Erro ao fazer login: ' + error.message);
    }
  },

  async register(userData) {
    try {
      // Copiado na hora do envio: o que mudar no formulário durante a espera não entra
      const profile = pickProfile(userData);
      const dateOfBirth = text(userData?.dateOfBirth);
      // O hash é calculado durante a espera simulada
      const [password] = await Promise.all([hashPassword(text(userData?.password)), delay(1000)]);
      writeAccount({ ...profile, password, dateOfBirth, orderHistory: [] });
      return { ok: true };
    } catch (error) {
      throw new Error('Erro ao registrar usuário: ' + error.message);
    }
  },

  /**
   * Guarda o histórico de pedidos no cadastro, se ele for o da sessão. Assim o histórico
   * sobrevive ao "Sair" e volta no próximo login.
   * @param {string} currentEmail - e-mail da sessão
   * @param {{ orderHistory: object[], nextOrderId: number }} orders
   */
  saveOrders(currentEmail, { orderHistory, nextOrderId }) {
    const account = readAccount();
    if (!isPlainObject(account) || !currentEmail || account.email !== currentEmail) return;
    try {
      writeAccount({ ...account, orderHistory, nextOrderId });
    } catch {
      // Cota do localStorage cheia: a cópia do histórico fica para depois, e o "Sair", o
      // login e o pedido seguem
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
      await delay(1000);
      const currentUser = readAccount();
      // Cadastro excluído ou trocado por outro (por exemplo, em outra aba)
      if (!currentUser || currentUser.email !== currentEmail) {
        throw new Error('o cadastro salvo não é o da sessão');
      }
      const updatedUser = { ...currentUser, ...changes };
      writeAccount(updatedUser);
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
      await delay(1000);
      // O cadastro de outra pessoa (trocado em outra aba) não é apagado
      if (readAccount()?.email === currentEmail) localStorage.removeItem(ACCOUNT_KEY);
      return { ok: true };
    } catch (error) {
      throw new Error('Erro ao excluir a conta: ' + error.message);
    }
  },

  // Sair encerra só a sessão (a userStore limpa o próprio estado); o cadastro continua,
  // com o histórico de pedidos
  logout() {}
};
