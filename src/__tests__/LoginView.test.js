// Login no M3 (docs/direcoes/desenho/conta.md, §5.3, §5.4 e §9): a região role="alert" com
// aria-atomic fica sempre no DOM, junto do botão de envio, e recebe o banner depois da falha; o foco
// fica onde estava, e a view rola o grupo de envio (banner e botão) para a vista.
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import LoginView from '@/views/auth/LoginView.vue';
import { authService } from '@/services/authServices';

const Blank = { template: '<div />' };
let wrapper;

const montarLogin = async (url = '/login') => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/login', '/register', '/cart'].map((path) => ({ path, component: Blank })),
  });
  await router.push(url);
  wrapper = mount(LoginView, {
    attachTo: document.body,
    global: { plugins: [pinia, router], stubs: { 'font-awesome-icon': { template: '<svg />' } } },
  });
  return { wrapper, router };
};

const preencher = async () => {
  await wrapper.find('#email').setValue('maria@example.com');
  await wrapper.find('#password').setValue('senha123');
};

const enviar = async () => {
  await wrapper.find('form').trigger('submit');
  await flushPromises();
};

describe('LoginView', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    wrapper?.unmount();
    vi.restoreAllMocks();
    delete Element.prototype.scrollIntoView;
  });

  it('o h1 "Entrar" dentro do painel, nomeando a seção', async () => {
    await montarLogin();
    const painel = wrapper.find('section.auth-panel');
    expect(painel.attributes('aria-labelledby')).toBe('entrar-titulo');
    expect(painel.find('h1#entrar-titulo').text()).toBe('Entrar');
    expect(wrapper.findAll('h1')).toHaveLength(1);
  });

  it('a região do alerta existe vazia na montagem, no grupo de envio, logo antes do botão', async () => {
    await montarLogin();
    const regiao = wrapper.find('form .auth-form__envio > .auth-form__anuncio');
    expect(regiao.attributes('role')).toBe('alert');
    expect(regiao.attributes('aria-atomic')).toBe('true');
    expect(regiao.text()).toBe('');
    expect(regiao.find('.auth-alert').exists()).toBe(false);
    const filhos = wrapper.find('.auth-form__envio').element.children;
    expect(filhos[0]).toBe(regiao.element);
    expect(filhos[1].matches('button[type="submit"].auth-form__submit')).toBe(true);
  });

  it('senha errada: o banner entra na região, o e-mail continua e o foco fica no botão', async () => {
    vi.spyOn(authService, 'login').mockRejectedValue(new Error('Credenciais inválidas'));
    await montarLogin();
    await preencher();
    const botao = wrapper.find('button[type="submit"]');
    botao.element.focus();
    await enviar();

    const banner = wrapper.find('.auth-form__anuncio .auth-alert');
    expect(banner.text()).toBe('E-mail ou senha incorretos.');
    expect(banner.attributes('role')).toBeUndefined();
    expect(wrapper.find('#email').element.value).toBe('maria@example.com');
    expect(document.activeElement).toBe(botao.element);
  });

  it('um segundo envio com o mesmo erro tira o banner e o põe de novo', async () => {
    vi.spyOn(authService, 'login').mockRejectedValue(new Error('Credenciais inválidas'));
    await montarLogin();
    await preencher();
    await enviar();
    expect(wrapper.find('.auth-alert').exists()).toBe(true);

    let resolver;
    authService.login.mockImplementationOnce(() => new Promise((_, rejeitar) => (resolver = rejeitar)));
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    expect(wrapper.find('.auth-alert').exists()).toBe(false);
    resolver(new Error('Credenciais inválidas'));
    await flushPromises();
    expect(wrapper.find('.auth-alert').text()).toBe('E-mail ou senha incorretos.');
  });

  it('depois do banner, a view rola o grupo de envio (banner e botão) com block: "nearest"', async () => {
    const rolar = vi.fn();
    Element.prototype.scrollIntoView = rolar;
    vi.spyOn(authService, 'login').mockRejectedValue(new Error('Credenciais inválidas'));
    await montarLogin();
    await preencher();
    await enviar();

    expect(rolar).toHaveBeenCalledTimes(1);
    expect(rolar.mock.contexts[0]).toBe(wrapper.find('.auth-form__envio').element);
    expect(rolar).toHaveBeenCalledWith({ block: 'nearest' });
  });

  it('sem scrollIntoView (jsdom), o banner aparece do mesmo jeito', async () => {
    vi.spyOn(authService, 'login').mockRejectedValue(new Error('Credenciais inválidas'));
    await montarLogin();
    await preencher();
    await enviar();
    expect(wrapper.find('.auth-alert').exists()).toBe(true);
  });

  it('envio vazio: aria-invalid nos campos, foco no primeiro e nenhum banner', async () => {
    const login = vi.spyOn(authService, 'login');
    await montarLogin();
    await enviar();

    expect(wrapper.find('#email').attributes('aria-invalid')).toBe('true');
    expect(wrapper.find('#email').attributes('aria-describedby')).toBe('email-erro');
    expect(wrapper.find('#email-erro').text()).toBe('O e-mail é obrigatório');
    expect(wrapper.find('#password').attributes('aria-invalid')).toBe('true');
    expect(document.activeElement).toBe(wrapper.find('#email').element);
    expect(wrapper.find('.auth-alert').exists()).toBe(false);
    expect(login).not.toHaveBeenCalled();
  });

  it('a senha tem o botão "Mostrar senha"; a ordem do DOM é e-mail, senha, botão, Entrar e Criar conta', async () => {
    await montarLogin('/login?redirect=/cart');
    const focaveis = wrapper.findAll('input, button, a').map((el) => el.attributes('id') ?? el.text());
    expect(focaveis).toEqual(['email', 'password', '', 'Entrar', 'Criar conta']);
    expect(wrapper.find('button.form-group__mostrar').attributes('aria-label')).toBe('Mostrar senha');
    expect(wrapper.find('#password').attributes('autocomplete')).toBe('current-password');
    expect(wrapper.find('.auth-panel__footer a').attributes('href')).toBe('/register?redirect=/cart');
  });
});
