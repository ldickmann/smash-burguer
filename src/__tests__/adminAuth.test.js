import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import LoginAdminView from '../views/admin/LoginAdminView.vue';
import { adminAuthService } from '../services/adminAuthServices';
import { useAdminStore } from '../stores/adminStore';

// Admin fictício, no formato que o createAdmin.html grava
const ADMIN = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@example.com',
  password: 'Demo1234',
  role: 'admin',
};

const Blank = { template: '<div />' };

// Roda o login com a espera simulada até o fim; devolve o erro em vez de lançar
const settle = async (promise) => {
  const settled = promise.catch((error) => error);
  await vi.advanceTimersByTimeAsync(1000);
  return settled;
};

describe('login do admin', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('com o admin salvo, entra e abre a sessão do painel', async () => {
    localStorage.setItem('admin', JSON.stringify(ADMIN));
    const store = useAdminStore();

    const result = await settle(store.login({ email: ADMIN.email, password: ADMIN.password }));

    expect(result).toBeUndefined();
    expect(store.isAdmin).toBe(true);
  });

  it('com JSON ilegível na chave admin, o login é recusado em vez de ficar pendente', async () => {
    localStorage.setItem('admin', '{');

    const result = await settle(
      adminAuthService.login({ email: ADMIN.email, password: ADMIN.password })
    );

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toContain('Credenciais de administrador inválidas');
  });

  it('na tela, a chave ilegível mostra o erro e devolve o botão', async () => {
    localStorage.setItem('admin', '{');
    const pinia = createPinia();
    setActivePinia(pinia);
    const router = createRouter({
      history: createMemoryHistory(),
      routes: ['/', '/admin', '/admin/login'].map((path) => ({ path, component: Blank })),
    });
    await router.push('/admin/login');
    const wrapper = mount(LoginAdminView, {
      global: {
        plugins: [pinia, router],
        stubs: { 'font-awesome-icon': { template: '<svg />' } },
      },
    });

    await wrapper.find('input#email').setValue(ADMIN.email);
    await wrapper.find('input#password').setValue(ADMIN.password);
    await wrapper.find('form').trigger('submit');
    expect(wrapper.find('button[type="submit"]').attributes('aria-busy')).toBe('true');

    await vi.advanceTimersByTimeAsync(1000);
    await flushPromises();

    const button = wrapper.find('button[type="submit"]');
    expect(button.attributes('aria-busy')).toBeUndefined();
    expect(button.text()).toBe('Entrar');
    expect(wrapper.find('[role="alert"]').text()).toContain('E-mail ou senha incorretos.');
    expect(router.currentRoute.value.path).toBe('/admin/login');
  });
});
