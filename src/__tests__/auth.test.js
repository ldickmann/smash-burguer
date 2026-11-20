import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createApp, reactive } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import {
  authService,
  migrateLegacyAccount,
  hasSavedAccount,
  ACCOUNT_KEY,
} from '../services/authServices';
import { useUserStore } from '../stores/userStore';
import { useCartStore } from '../stores/cart';

const account = { firstName: 'Maria', email: 'maria@example.com', password: 'senha123' };

// Cadastro completo, como o formulário de cadastro grava
const fullAccount = {
  firstName: 'Maria',
  lastName: 'Silva',
  email: 'maria@example.com',
  password: 'senha123',
  dateOfBirth: '1990-05-10',
  phone: '47999999999',
  CEP: '88370000',
  address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' },
};
const SESSION_KEY = 'smash-burger:session';
const order = { items: [], total: 10, paymentMethod: 'PIX', address: {} };

// Entra com a conta e avança a espera simulada
const loginWith = async (store, data = fullAccount) => {
  const attempt = store.login({ email: data.email, password: data.password });
  await vi.advanceTimersByTimeAsync(1000);
  await attempt;
};

// Roda uma action com espera simulada até o fim
const settle = async (promise) => {
  const settled = promise.catch((error) => error);
  await vi.advanceTimersByTimeAsync(1000);
  return settled;
};

describe('authService e sessão', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    setActivePinia(createPinia());
  });

  afterEach(() => vi.useRealTimers());

  it('login rejeita a promise com credenciais inválidas', async () => {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    const attempt = authService.login({ email: account.email, password: 'errada123' });
    // Evita "unhandled rejection" enquanto o relógio falso avança
    const settled = attempt.catch((error) => error);
    await vi.advanceTimersByTimeAsync(1000);
    await expect(attempt).rejects.toThrow('Credenciais inválidas');
    await settled;
  });

  it('login resolve com o cadastro quando as credenciais batem', async () => {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    const attempt = authService.login({ email: account.email, password: account.password });
    await vi.advanceTimersByTimeAsync(1000);
    await expect(attempt).resolves.toMatchObject({ ok: true, user: { email: account.email } });
  });

  it('sair e entrar de novo funciona: o cadastro não é apagado', async () => {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    const store = useUserStore();

    const first = store.login(account);
    await vi.advanceTimersByTimeAsync(1000);
    await first;
    expect(store.isAuthenticated).toBe(true);

    store.logout();
    expect(store.isAuthenticated).toBe(false);
    expect(JSON.parse(localStorage.getItem(ACCOUNT_KEY)).email).toBe(account.email);

    const second = store.login(account);
    await vi.advanceTimersByTimeAsync(1000);
    await second;
    expect(store.isAuthenticated).toBe(true);
  });

  it('migra o cadastro antigo de `user` para a chave nova', () => {
    localStorage.setItem('user', JSON.stringify(account));
    migrateLegacyAccount();

    expect(localStorage.getItem('user')).toBeNull();
    expect(JSON.parse(localStorage.getItem(ACCOUNT_KEY))).toEqual(account);
  });

  it('não mexe em `user` quando não é um cadastro', () => {
    const session = JSON.stringify({ user: null, isAuthenticated: false });
    localStorage.setItem('user', session);
    migrateLegacyAccount();

    expect(localStorage.getItem('user')).toBe(session);
    expect(localStorage.getItem(ACCOUNT_KEY)).toBeNull();
  });

  it('placeOrder numera a partir de 1001 e põe o mais recente primeiro', () => {
    const store = useUserStore();
    const base = { items: [], total: 10, paymentMethod: 'PIX', address: {} };

    const first = store.placeOrder(base);
    const second = store.placeOrder(base);

    expect(first.id).toBe(1001);
    expect(second.id).toBe(1002);
    expect(store.orderHistory.map((o) => o.id)).toEqual([1002, 1001]);
    expect(store.lastOrderId).toBe(1002);
    expect(second.status).toBe('Recebido');
  });
});

describe('dados da conta na sessão e no cadastro', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    setActivePinia(createPinia());
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(fullAccount));
  });

  afterEach(() => vi.useRealTimers());

  it('a sessão guarda só os campos do perfil, sem a senha nem a data de nascimento', async () => {
    const store = useUserStore();
    await loginWith(store);

    expect(Object.keys(store.user).sort()).toEqual(['CEP', 'address', 'email', 'firstName', 'lastName', 'phone']);
    expect(store.user.address).toEqual(fullAccount.address);
    expect(JSON.stringify(store.$state)).not.toContain(fullAccount.password);
  });

  it('uma sessão gravada com a senha perde a senha ao ser carregada', () => {
    const legacySession = { user: fullAccount, isAuthenticated: true, orderHistory: [], lastOrderId: null, nextOrderId: 1001 };
    localStorage.setItem(SESSION_KEY, JSON.stringify(legacySession));
    // O plugin de persistência só roda com a Pinia instalada num app
    const pinia = createPinia().use(piniaPersist);
    createApp({}).use(pinia);
    setActivePinia(pinia);

    const store = useUserStore();

    expect(store.user).not.toHaveProperty('password');
    expect(store.user.email).toBe(fullAccount.email);
    const saved = localStorage.getItem(SESSION_KEY);
    expect(saved).not.toContain(fullAccount.password);
    expect(saved).not.toContain(fullAccount.dateOfBirth);
  });

  it('sair esvazia o carrinho, com as observações', async () => {
    const store = useUserStore();
    const cart = useCartStore();
    await loginWith(store);
    cart.addItem({ productId: 1, name: 'Smash Burger', unitPrice: 22.5, observation: 'sem cebola' });

    store.logout();

    expect(cart.items).toEqual([]);
  });

  it('entrar com outra conta zera o histórico; a mesma conta o mantém', async () => {
    const store = useUserStore();
    await loginWith(store);
    store.placeOrder(order);

    await loginWith(store);
    expect(store.orderHistory).toHaveLength(1);

    const other = { ...fullAccount, email: 'joao@example.com' };
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(other));
    await loginWith(store, other);

    expect(store.user.email).toBe(other.email);
    expect(store.orderHistory).toEqual([]);
    expect(store.lastOrderId).toBeNull();
  });

  it('excluir a conta apaga o cadastro, a sessão inteira e o carrinho', async () => {
    const store = useUserStore();
    const cart = useCartStore();
    await loginWith(store);
    store.placeOrder(order);
    cart.addItem({ productId: 1, name: 'Smash Burger', unitPrice: 22.5 });

    await settle(store.deleteAccount());

    expect(localStorage.getItem(ACCOUNT_KEY)).toBeNull();
    expect(hasSavedAccount()).toBe(false);
    expect(store.$state).toEqual({ user: null, isAuthenticated: false, orderHistory: [], lastOrderId: null, nextOrderId: 1001 });
    expect(cart.items).toEqual([]);
  });

  it('uma sessão antiga não altera nem apaga o cadastro de outra pessoa', async () => {
    const store = useUserStore();
    await loginWith(store);
    // O cadastro foi trocado por outro, por exemplo em outra aba
    const other = JSON.stringify({ ...fullAccount, email: 'joao@example.com', password: 'outra123' });
    localStorage.setItem(ACCOUNT_KEY, other);

    const error = await settle(store.updateProfile({ ...store.user, firstName: 'Mariana' }));
    expect(error).toBeInstanceOf(Error);
    expect(localStorage.getItem(ACCOUNT_KEY)).toBe(other);

    await settle(store.deleteAccount());
    expect(localStorage.getItem(ACCOUNT_KEY)).toBe(other);
    expect(store.isAuthenticated).toBe(false);
  });

  it('o perfil salvo é uma cópia: o formulário não fica ligado à sessão nem ao cadastro', async () => {
    const store = useUserStore();
    await loginWith(store);
    // Como o formulário do perfil: um objeto reativo com o endereço aninhado
    const form = reactive({
      ...store.user,
      CEP: '01310100',
      address: { street: 'Avenida Paulista', neighborhood: 'Bela Vista', city: 'São Paulo', state: 'SP' },
    });

    const saving = store.updateProfile(form);
    form.CEP = '01001000'; // mudança durante a espera: não entra
    await settle(saving);
    form.address.street = 'Praça da Sé'; // edição depois de salvar: não chega à sessão

    expect(store.user.CEP).toBe('01310100');
    expect(store.user.address.street).toBe('Avenida Paulista');
    expect(JSON.parse(localStorage.getItem(ACCOUNT_KEY))).toMatchObject({
      CEP: '01310100',
      // O login converteu a senha em texto puro do cadastro antigo em hash
      password: expect.stringMatching(/^pbkdf2-sha256\$600000\$/),
      address: { street: 'Avenida Paulista' },
    });
  });

  it('o cadastro grava uma cópia feita na hora do envio, só com os campos do formulário', async () => {
    localStorage.clear();
    expect(hasSavedAccount()).toBe(false);
    const form = reactive({ ...fullAccount, address: { ...fullAccount.address }, extra: 'x' });

    const attempt = authService.register(form);
    form.address.street = 'Outra rua'; // mudança durante a espera: não entra
    await settle(attempt);

    expect(JSON.parse(localStorage.getItem(ACCOUNT_KEY))).toEqual({
      ...fullAccount,
      password: expect.stringMatching(/^pbkdf2-sha256\$600000\$/),
      orderHistory: [],
    });
    expect(hasSavedAccount()).toBe(true);
  });
});

describe('senha em hash no cadastro', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    setActivePinia(createPinia());
  });

  afterEach(() => vi.useRealTimers());

  const savedAccount = () => JSON.parse(localStorage.getItem(ACCOUNT_KEY));

  it('o cadastro guarda o hash, e não a senha, e o login confere com ele', async () => {
    await settle(authService.register(fullAccount));

    expect(savedAccount().password).toMatch(/^pbkdf2-sha256\$600000\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/);
    expect(localStorage.getItem(ACCOUNT_KEY)).not.toContain(fullAccount.password);

    const store = useUserStore();
    await loginWith(store);
    expect(store.isAuthenticated).toBe(true);

    const wrong = await settle(authService.login({ email: fullAccount.email, password: 'errada123' }));
    expect(wrong.message).toContain('Credenciais inválidas');
  });

  it('um cadastro de antes do hash entra com a senha antiga e passa a guardar o hash', async () => {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(fullAccount));

    const wrong = await settle(authService.login({ email: fullAccount.email, password: 'errada123' }));
    expect(wrong).toBeInstanceOf(Error);
    expect(savedAccount().password).toBe(fullAccount.password);

    await settle(authService.login({ email: fullAccount.email, password: fullAccount.password }));
    expect(savedAccount().password).toMatch(/^pbkdf2-sha256\$/);
    expect(savedAccount()).toMatchObject({ email: fullAccount.email, address: fullAccount.address });

    // E continua entrando depois da troca
    const again = await settle(authService.login({ email: fullAccount.email, password: fullAccount.password }));
    expect(again).toMatchObject({ ok: true });
  });
});

describe('histórico de pedidos no cadastro', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    setActivePinia(createPinia());
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(fullAccount));
  });

  afterEach(() => vi.useRealTimers());

  it('"Sair" não apaga o histórico: ele fica no cadastro e volta no próximo login', async () => {
    const store = useUserStore();
    await loginWith(store);
    store.placeOrder(order);
    store.placeOrder(order);

    store.logout();
    expect(store.orderHistory).toEqual([]);
    expect(JSON.parse(localStorage.getItem(ACCOUNT_KEY)).orderHistory.map((o) => o.id)).toEqual([1002, 1001]);

    await loginWith(store);
    expect(store.orderHistory.map((o) => o.id)).toEqual([1002, 1001]);
    // A numeração continua de onde parou
    expect(store.placeOrder(order).id).toBe(1003);
  });

  it('com o localStorage cheio, sair, pedir e entrar continuam funcionando', async () => {
    const store = useUserStore();
    await loginWith(store);
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('cota', 'QuotaExceededError');
    });

    expect(store.placeOrder(order).id).toBe(1001);
    store.logout();
    expect(store.isAuthenticated).toBe(false);
    await loginWith(store);
    expect(store.isAuthenticated).toBe(true);
    setItem.mockRestore();
  });

  it('migra o formato de sessão da versão antiga, com o histórico, para o cadastro', async () => {
    localStorage.clear();
    const oldOrder = { id: 1001, date: '2026-10-17T22:15:00.000Z', status: 'Recebido', total: 10, paymentMethod: 'PIX', items: [] };
    localStorage.setItem('user', JSON.stringify({ user: fullAccount, isAuthenticated: true, orderHistory: [oldOrder, { id: 'x' }] }));

    migrateLegacyAccount();

    expect(localStorage.getItem('user')).toBeNull();
    expect(JSON.parse(localStorage.getItem(ACCOUNT_KEY))).toEqual({ ...fullAccount, orderHistory: [oldOrder] });

    const store = useUserStore();
    await loginWith(store);
    expect(store.orderHistory).toEqual([oldOrder]);
    expect(store.placeOrder(order).id).toBe(1002);
  });
});
