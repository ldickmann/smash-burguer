// Login do admin no M3 (docs/direcoes/desenho/admin.md, §5.11 e §9): o invólucro do login da loja. A
// região role="alert" com aria-atomic fica sempre no DOM, junto do botão de envio, e recebe o banner
// depois da falha; o ícone fica num span de 20 px; a view rola o grupo de envio para a vista; o
// "Voltar à loja" é o text button do BaseButton (o mesmo link para /); o bloco do admin de teste só
// existe com o devTestAdmin() (no build, o build-config.test.js confere que ele sai).
import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import LoginAdminView from '@/views/admin/LoginAdminView.vue';
import { adminAuthService } from '@/services/adminAuthServices';
import { NO_WEBCRYPTO_MESSAGE } from '@/handlers/authHandlers';
import { NO_WEBCRYPTO } from '@/utils/password';

const Blank = { template: '<div />' };
let wrapper;

const montarLogin = async () => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/admin', '/admin/login'].map((path) => ({ path, component: Blank })),
  });
  await router.push('/admin/login');
  wrapper = mount(LoginAdminView, {
    attachTo: document.body,
    global: { plugins: [pinia, router], stubs: { 'font-awesome-icon': { template: '<svg />' } } },
  });
  return { wrapper, router };
};

const preencher = async () => {
  await wrapper.find('#email').setValue('gerente@example.com');
  await wrapper.find('#password').setValue('Errada123');
};

const enviar = async () => {
  await wrapper.find('form').trigger('submit');
  await flushPromises();
};

describe('LoginAdminView', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    wrapper?.unmount();
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    delete Element.prototype.scrollIntoView;
  });

  it('o h1 "Painel administrativo" nomeia o painel; a ilustração é decorativa', async () => {
    await montarLogin();
    const painel = wrapper.find('main#conteudo.admin-login section.auth-panel');
    expect(painel.attributes('aria-labelledby')).toBe('admin-login-titulo');
    expect(painel.find('h1#admin-login-titulo').text()).toBe('Painel administrativo');
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.find('.admin-login__img').attributes('alt')).toBe('');
  });

  it('a região do alerta existe vazia na montagem, no grupo de envio, logo antes do botão', async () => {
    await montarLogin();
    const regiao = wrapper.find('form .auth-form__envio > .auth-form__anuncio');
    expect(regiao.attributes('role')).toBe('alert');
    expect(regiao.attributes('aria-atomic')).toBe('true');
    expect(regiao.text()).toBe('');
    expect(regiao.find('.auth-alert').exists()).toBe(false);
    expect(wrapper.findAll('[role="alert"]')).toHaveLength(1);
    const filhos = wrapper.find('.auth-form__envio').element.children;
    expect(filhos).toHaveLength(2);
    expect(filhos[0]).toBe(regiao.element);
    expect(filhos[1].matches('button[type="submit"].auth-form__submit')).toBe(true);
  });

  it('senha errada: o banner entra na região, logo antes do botão, e o foco fica no botão', async () => {
    vi.spyOn(adminAuthService, 'login').mockRejectedValue(new Error('Credenciais de administrador inválidas'));
    await montarLogin();
    await preencher();
    const botao = wrapper.find('button[type="submit"]');
    botao.element.focus();
    await enviar();

    const banner = wrapper.find('.auth-form__anuncio .auth-alert');
    expect(banner.text()).toBe('E-mail ou senha incorretos.');
    expect(banner.attributes('role')).toBeUndefined();
    expect(banner.element.parentElement.nextElementSibling).toBe(botao.element);
    expect(wrapper.find('#email').element.value).toBe('gerente@example.com');
    expect(document.activeElement).toBe(botao.element);
  });

  it('o ícone do banner fica num span.auth-alert__icon, e não no próprio svg', async () => {
    vi.spyOn(adminAuthService, 'login').mockRejectedValue(new Error('Credenciais de administrador inválidas'));
    await montarLogin();
    await preencher();
    await enviar();

    const icone = wrapper.find('.auth-alert > span.auth-alert__icon');
    expect(icone.exists()).toBe(true);
    expect(icone.attributes('aria-hidden')).toBe('true');
    expect(icone.find('svg').exists()).toBe(true);
    expect(wrapper.find('svg.auth-alert__icon').exists()).toBe(false);
  });

  it('sem WebCrypto, o banner traz a mensagem do endereço', async () => {
    vi.spyOn(adminAuthService, 'login').mockRejectedValue(new Error(NO_WEBCRYPTO));
    await montarLogin();
    await preencher();
    await enviar();
    expect(wrapper.find('.auth-form__anuncio .auth-alert').text()).toBe(NO_WEBCRYPTO_MESSAGE);
  });

  it('depois do banner, a view rola o grupo de envio (banner e botão) com block: "nearest"', async () => {
    const rolar = vi.fn();
    Element.prototype.scrollIntoView = rolar;
    vi.spyOn(adminAuthService, 'login').mockRejectedValue(new Error('Credenciais de administrador inválidas'));
    await montarLogin();
    await preencher();
    await enviar();

    expect(rolar).toHaveBeenCalledTimes(1);
    expect(rolar.mock.contexts[0]).toBe(wrapper.find('.auth-form__envio').element);
    expect(rolar).toHaveBeenCalledWith({ block: 'nearest' });
  });

  it('sem scrollIntoView (jsdom), o banner aparece do mesmo jeito', async () => {
    vi.spyOn(adminAuthService, 'login').mockRejectedValue(new Error('Credenciais de administrador inválidas'));
    await montarLogin();
    await preencher();
    await enviar();
    expect(wrapper.find('.auth-alert').exists()).toBe(true);
  });

  it('"Voltar à loja" é link para / com as classes do text button do BaseButton', async () => {
    await montarLogin();
    const voltar = wrapper.findAll('a').find((a) => a.text() === 'Voltar à loja');
    expect(voltar.attributes('href')).toBe('/');
    expect(voltar.classes()).toEqual(expect.arrayContaining(['btn', 'btn--ghost', 'm3-botao', 'm3-botao--texto']));
    expect(voltar.classes()).not.toContain('link-inline');
    expect(wrapper.find('.auth-panel__footer').exists()).toBe(false);
  });

  it('no dev, o bloco do admin de teste fica entre o formulário e o "Voltar à loja"', async () => {
    await montarLogin();
    const bloco = wrapper.find('.admin-login__dev');
    expect(bloco.text()).toContain('Desenvolvimento: o admin de teste entra sem cadastro.');
    const usar = bloco.find('button');
    expect(usar.text()).toBe('Usar admin de teste');
    expect(usar.classes()).toEqual(expect.arrayContaining(['btn--secondary', 'btn--sm']));
    expect(bloco.element.previousElementSibling.matches('form')).toBe(true);
    expect(bloco.element.nextElementSibling.textContent.trim()).toBe('Voltar à loja');
  });

  it('fora do dev (sem o devTestAdmin), o bloco do admin de teste não existe', async () => {
    vi.stubEnv('DEV', false);
    await montarLogin();
    expect(wrapper.find('.admin-login__dev').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('admin de teste');
  });

  it('a ordem do DOM: e-mail, senha, "Mostrar senha", Entrar, "Usar admin de teste" e "Voltar à loja"', async () => {
    await montarLogin();
    const focaveis = wrapper.findAll('input, button, a').map((el) => el.attributes('id') || el.text());
    expect(focaveis).toEqual(['email', 'password', '', 'Entrar', 'Usar admin de teste', 'Voltar à loja']);
  });
});
