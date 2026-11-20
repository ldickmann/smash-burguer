import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import LoginAdminView from '../views/admin/LoginAdminView.vue';
import { adminAuthService, devTestAdmin } from '../services/adminAuthServices';
import { useAdminStore } from '../stores/adminStore';

// Admin fictício criado à mão na chave `admin`, como no site publicado. As credenciais são
// outras que as do admin de teste do `yarn dev`, que o Vitest também vê
const SAVED_ADMIN = {
  firstName: 'Gerente',
  lastName: 'Teste',
  email: 'gerente@example.com',
  password: 'Gerente123',
  role: 'admin',
};

const Blank = { template: '<div />' };

// Roda o login com a espera simulada até o fim; devolve o erro em vez de lançar
const settle = async (promise) => {
  const settled = promise.catch((error) => error);
  await vi.advanceTimersByTimeAsync(1000);
  return settled;
};

const mountLogin = async () => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/admin', '/admin/login'].map((path) => ({ path, component: Blank })),
  });
  await router.push('/admin/login');
  const wrapper = mount(LoginAdminView, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { template: '<svg />' } },
    },
  });
  return { wrapper, router };
};

const buttonByText = (wrapper, text) => wrapper.findAll('button').find((b) => b.text() === text);

describe('login do admin', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    setActivePinia(createPinia());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('com o admin salvo, entra e abre a sessão do painel', async () => {
    localStorage.setItem('admin', JSON.stringify(SAVED_ADMIN));
    const store = useAdminStore();

    const result = await settle(store.login({ email: SAVED_ADMIN.email, password: SAVED_ADMIN.password }));

    expect(result).toBeUndefined();
    expect(store.isAdmin).toBe(true);
  });

  it('com JSON ilegível na chave admin, o login é recusado em vez de ficar pendente', async () => {
    localStorage.setItem('admin', '{');

    const result = await settle(
      adminAuthService.login({ email: SAVED_ADMIN.email, password: SAVED_ADMIN.password })
    );

    expect(result).toBeInstanceOf(Error);
    expect(result.message).toContain('Credenciais de administrador inválidas');
  });

  it('na tela, a chave ilegível mostra o erro e devolve o botão', async () => {
    localStorage.setItem('admin', '{');
    const { wrapper, router } = await mountLogin();

    await wrapper.find('input#email').setValue(SAVED_ADMIN.email);
    await wrapper.find('input#password').setValue(SAVED_ADMIN.password);
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

  describe('admin de teste do yarn dev', () => {
    it('no dev, entra sem nada salvo e de novo depois de sair', async () => {
      const store = useAdminStore();
      const { email, password } = devTestAdmin();

      expect(await settle(store.login({ email, password }))).toBeUndefined();
      expect(store.isAdmin).toBe(true);

      store.logout();
      expect(await settle(store.login({ email, password }))).toBeUndefined();
      expect(store.isAdmin).toBe(true);
    });

    it('fora do dev, não existe e as credenciais dele são recusadas', async () => {
      const { email, password } = devTestAdmin();
      vi.stubEnv('DEV', false);

      expect(devTestAdmin()).toBeNull();
      const result = await settle(adminAuthService.login({ email, password }));
      expect(result.message).toContain('Credenciais de administrador inválidas');
    });

    it('no dev, a tela preenche o formulário e leva o foco ao "Entrar"', async () => {
      const { wrapper, router } = await mountLogin();
      const { email, password } = devTestAdmin();

      await buttonByText(wrapper, 'Usar admin de teste').trigger('click');
      await flushPromises();

      expect(wrapper.find('input#email').element.value).toBe(email);
      expect(wrapper.find('input#password').element.value).toBe(password);
      expect(document.activeElement).toBe(wrapper.find('button[type="submit"]').element);

      await wrapper.find('form').trigger('submit');
      await vi.advanceTimersByTimeAsync(1000);
      await flushPromises();
      expect(router.currentRoute.value.path).toBe('/admin');
    });

    it('fora do dev, a tela não mostra o atalho', async () => {
      vi.stubEnv('DEV', false);
      const { wrapper } = await mountLogin();

      expect(buttonByText(wrapper, 'Usar admin de teste')).toBeUndefined();
      expect(wrapper.text()).not.toContain('admin de teste');
    });
  });
});
