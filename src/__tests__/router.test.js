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

  it('o foco por rota age na troca de página, e não quando só a query muda', async () => {
    const main = document.createElement('main');
    main.id = 'conteudo';
    main.tabIndex = -1;
    const search = document.createElement('input');
    document.body.append(main, search);

    await router.push('/menu');
    await new Promise((resolve) => setTimeout(resolve));
    expect(document.activeElement).toBe(main);

    search.focus();
    await router.replace('/menu?q=coca');
    await new Promise((resolve) => setTimeout(resolve));
    expect(document.activeElement).toBe(search);

    main.remove();
    search.remove();
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
    expect(panel).toEqual(['/admin', '/admin/products', '/admin/orders', '/admin/reports', '/admin/profile', '/admin/settings']);

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

// SPEC-material §10.1: o window.scrollTo do vue-router não aplica o scroll-padding-top do html, então a
// âncora desconta o valor computado dele (sem repetir no JS o calc dos tokens)
describe('scrollBehavior', () => {
  const rolar = (to, saved = null) => router.options.scrollBehavior(to, {}, saved);
  const paddingTop = (valor) =>
    vi.spyOn(window, 'getComputedStyle').mockImplementation((el) => {
      expect(el).toBe(document.documentElement);
      return { scrollPaddingTop: valor };
    });

  afterEach(() => vi.restoreAllMocks());

  it('com âncora, para a seção abaixo do scroll-padding-top do html', () => {
    paddingTop('80px');
    expect(rolar({ hash: '#lanches' })).toEqual({ el: '#lanches', top: 80 });
  });

  it('com scroll-padding-top sem valor numérico, só a âncora', () => {
    paddingTop('auto');
    expect(rolar({ hash: '#lanches' })).toEqual({ el: '#lanches' });
  });

  it('sem âncora, vai ao topo', () => {
    paddingTop('80px');
    expect(rolar({ hash: '' })).toEqual({ top: 0 });
  });

  it('no voltar e no avançar, a posição salva vence, com ou sem âncora', () => {
    paddingTop('80px');
    const salva = { left: 0, top: 420 };
    expect(rolar({ hash: '' }, salva)).toBe(salva);
    expect(rolar({ hash: '#lanches' }, salva)).toBe(salva);
  });
});
