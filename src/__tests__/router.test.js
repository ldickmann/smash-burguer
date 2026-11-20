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

  it('com sessão aberta, o cadastro leva ao destino interno do redirect ou ao perfil', async () => {
    useUserStore().setUser({ firstName: 'Maria', email: 'maria@example.com' });

    await router.push('/register');
    expect(router.currentRoute.value.fullPath).toBe('/profile');

    await router.push('/register?redirect=/menu');
    expect(router.currentRoute.value.fullPath).toBe('/menu');

    await router.push({ path: '/register', query: { redirect: '//example.com' } });
    expect(router.currentRoute.value.fullPath).toBe('/profile');
  });

  it('sem sessão, o perfil leva ao login com o redirect de volta para ele', async () => {
    await router.push('/profile');

    expect(router.currentRoute.value.path).toBe('/login');
    expect(router.currentRoute.value.query).toEqual({ redirect: '/profile' });
  });

  it('sem sessão, o cadastro abre', async () => {
    await router.push('/register');

    expect(router.currentRoute.value.fullPath).toBe('/register');
  });

  it('o painel inteiro exige admin pelo registro pai, e não pelo meta de cada filha', async () => {
    // O `meta` do pai vale para as filhas: uma rota nova do painel já nasce protegida
    const parent = router.getRoutes().find((route) => route.path === '/admin' && route.children.length);
    expect(parent.meta.requiresAdmin).toBe(true);

    const panel = parent.children.map((child) => router.resolve({ name: child.name }).path);
    expect(panel).toEqual(['/admin', '/admin/products', '/admin/orders', '/admin/reports']);

    // Sem sessão do painel, cada rota leva ao login do admin
    for (const path of panel) {
      expect(router.resolve(path).meta.requiresAdmin).toBe(true);
      await router.push(path);
      expect(router.currentRoute.value.path).toBe('/admin/login');
    }
  });

  it('a página de testes /playground não existe mais e cai no 404', async () => {
    expect(router.hasRoute('playground')).toBe(false);

    await router.push('/playground');
    expect(router.currentRoute.value.name).toBe('NotFound');
  });
});
