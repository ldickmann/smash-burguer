import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { authService, migrateLegacyAccount, ACCOUNT_KEY } from '../services/authServices';
import { useUserStore } from '../stores/userStore';

const account = { firstName: 'Maria', email: 'maria@exemplo.com', password: 'senha123' };

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
    const assertion = expect(attempt).rejects.toThrow('Credenciais inválidas');
    await vi.advanceTimersByTimeAsync(1000);
    await assertion;
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
