import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import router from '../router';
import { useUserStore } from '../stores/userStore';

describe('guards do roteador', () => {
  beforeEach(async () => {
    // O scrollBehavior chama window.scrollTo, que o jsdom não implementa
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    localStorage.clear();
    setActivePinia(createPinia());
    await router.push('/');
  });

  afterEach(() => vi.restoreAllMocks());

  it('com sessão aberta, o cadastro leva ao perfil', async () => {
    useUserStore().setUser({ firstName: 'Maria', email: 'maria@example.com' });

    await router.push('/register');

    expect(router.currentRoute.value.fullPath).toBe('/profile');
  });

  it('sem sessão, o cadastro abre', async () => {
    await router.push('/register');

    expect(router.currentRoute.value.fullPath).toBe('/register');
  });
});
