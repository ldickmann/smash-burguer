import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import RegisterView from '../views/auth/RegisterView.vue';
import { ACCOUNT_KEY, authService } from '../services/authServices';

const Blank = { template: '<div />' };

const mountRegister = async () => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/login', '/register'].map((path) => ({ path, component: Blank })),
  });
  await router.push('/register');

  return mount(RegisterView, {
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { template: '<svg />' } },
    },
  });
};

const fillForm = async (wrapper) => {
  const values = {
    firstName: 'Maria',
    lastName: 'Silva',
    email: 'maria@example.com',
    password: 'senha123',
    dateOfBirth: '1990-05-10',
    phone: '47999999999',
  };
  for (const [id, value] of Object.entries(values)) {
    await wrapper.find(`#${id}`).setValue(value);
  }
};

const viaCepResponse = (logradouro, localidade) => ({
  json: async () => ({ logradouro, bairro: 'Centro', localidade, uf: 'SC' }),
});

describe('RegisterView', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('avisa quando já existe uma conta salva neste navegador', async () => {
    const empty = await mountRegister();
    expect(empty.find('#aviso-conta-salva').exists()).toBe(false);
    expect(empty.find('button[type="submit"]').attributes('aria-describedby')).toBeUndefined();

    localStorage.setItem(ACCOUNT_KEY, JSON.stringify({ email: 'maria@example.com', password: 'senha123' }));
    const wrapper = await mountRegister();

    expect(wrapper.find('#aviso-conta-salva').text()).toContain('a anterior será apagada');
    expect(wrapper.find('button[type="submit"]').attributes('aria-describedby')).toBe('aviso-conta-salva');
  });

  it('avisa no campo que o CEP é consultado no ViaCEP antes de enviá-lo', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const wrapper = await mountRegister();

    expect(wrapper.find('#CEP-ajuda').text()).toContain('ViaCEP');
    expect(wrapper.find('#CEP').attributes('aria-describedby')).toContain('CEP-ajuda');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('com o CEP trocado antes da resposta, a conta é criada uma vez, com o endereço do CEP novo', async () => {
    // O primeiro CEP responde na hora; o segundo, só quando o teste mandar
    let respondSecond;
    vi.stubGlobal(
      'fetch',
      vi.fn((url) =>
        url.includes('88370000')
          ? Promise.resolve(viaCepResponse('Rua Beira da Praia', 'Navegantes'))
          : new Promise((resolve) => {
              respondSecond = () => resolve(viaCepResponse('Praça da Sé', 'São Paulo'));
            })
      )
    );
    const wrapper = await mountRegister();
    const register = vi.spyOn(authService, 'register');
    await fillForm(wrapper);
    await wrapper.find('#CEP').setValue('88370000');
    await flushPromises();

    await wrapper.find('#CEP').setValue('01001000');
    await wrapper.find('form').trigger('submit');
    await wrapper.find('form').trigger('submit'); // segundo envio durante a espera: ignorado
    await vi.advanceTimersByTimeAsync(1000);
    // Sem a resposta do CEP novo, nada é gravado com o endereço do anterior
    expect(localStorage.getItem(ACCOUNT_KEY)).toBeNull();

    respondSecond();
    await flushPromises();
    await vi.advanceTimersByTimeAsync(1000);
    // O hash da senha é calculado de verdade (WebCrypto), fora do relógio falso
    await vi.waitFor(() => expect(localStorage.getItem(ACCOUNT_KEY)).not.toBeNull());

    expect(JSON.parse(localStorage.getItem(ACCOUNT_KEY))).toMatchObject({
      CEP: '01001000',
      address: { street: 'Praça da Sé', city: 'São Paulo' },
    });
    expect(register).toHaveBeenCalledTimes(1);
  });

  it('com CEP único da cidade (sem rua), pede a rua e só cria a conta com ela', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({ json: async () => ({ logradouro: '', bairro: '', localidade: 'Serra Azul', uf: 'MG' }) })
      )
    );
    const wrapper = await mountRegister();
    await fillForm(wrapper);
    await wrapper.find('#CEP').setValue('35588000');
    await flushPromises();

    expect(wrapper.find('#CEP-ajuda').text()).toContain('Serra Azul/MG. Este CEP vale para a cidade toda');
    expect(wrapper.find('#street').exists()).toBe(true);
    expect(wrapper.find('#neighborhood').exists()).toBe(true);

    await wrapper.find('form').trigger('submit');
    await flushPromises();
    expect(wrapper.find('#street-erro').text()).toContain('Informe a rua e o número.');
    expect(localStorage.getItem(ACCOUNT_KEY)).toBeNull();

    await wrapper.find('#street').setValue('Rua das Flores, 10');
    // O erro some durante a digitação, sem esperar o blur (que mudaria o botão de lugar no clique)
    expect(wrapper.find('#street-erro').exists()).toBe(false);
    await wrapper.find('#neighborhood').setValue('Centro');
    await wrapper.find('form').trigger('submit');
    await vi.advanceTimersByTimeAsync(1000);
    await vi.waitFor(() => expect(localStorage.getItem(ACCOUNT_KEY)).not.toBeNull());

    expect(JSON.parse(localStorage.getItem(ACCOUNT_KEY)).address).toEqual({
      street: 'Rua das Flores, 10',
      neighborhood: 'Centro',
      city: 'Serra Azul',
      state: 'MG',
    });
  });
});

// Desenho da Conta (§5.3, §5.5 e §9): o aviso antes do formulário, o CEP como região viva, o erro no
// lugar da ajuda, a instrução da senha como ajuda e o banner junto do botão, com a rolagem do grupo
describe('RegisterView no M3', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    delete Element.prototype.scrollIntoView;
  });

  const preencherComCep = async (wrapper) => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(viaCepResponse('Rua XV de Novembro', 'Blumenau'))));
    await fillForm(wrapper);
    await wrapper.find('#CEP').setValue('89010000');
    await flushPromises();
  };

  it('o aviso de conta salva vem antes do formulário, no topo do painel', async () => {
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify({ email: 'maria@example.com', password: 'senha123' }));
    const wrapper = await mountRegister();
    const aviso = wrapper.find('#aviso-conta-salva');
    expect(aviso.classes()).toEqual(expect.arrayContaining(['auth-alert', 'auth-alert--warning']));
    expect(aviso.attributes('role')).toBeUndefined();
    const form = wrapper.find('form').element;
    expect(aviso.element.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('o CEP é uma região viva desde a montagem, com a ajuda dentro', async () => {
    vi.stubGlobal('fetch', vi.fn());
    const wrapper = await mountRegister();
    const regiao = wrapper.find('#CEP').element.closest('.form-group').querySelector('.form-group__mensagens');
    expect(regiao.getAttribute('role')).toBe('status');
    expect(regiao.getAttribute('aria-atomic')).toBe('true');
    expect(regiao.querySelector('#CEP-ajuda').textContent).toContain('ViaCEP');
  });

  it('a instrução da senha é a ajuda do campo, e o placeholder fica', async () => {
    const wrapper = await mountRegister();
    const senha = wrapper.find('#password');
    expect(senha.attributes('aria-describedby')).toBe('password-ajuda');
    expect(wrapper.find('#password-ajuda').text()).toBe('Mínimo de 6 caracteres, com letra e número');
    expect(senha.attributes('placeholder')).toBe('Mínimo de 6 caracteres, com letra e número');
    expect(senha.attributes('autocomplete')).toBe('new-password');
    expect(wrapper.find('button.form-group__mostrar[aria-controls="password"]').exists()).toBe(true);
  });

  it('envio vazio: aria-invalid e aria-describedby nos erros; no CEP, o erro toma o lugar da ajuda', async () => {
    vi.stubGlobal('fetch', vi.fn());
    const wrapper = await mountRegister();
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    for (const id of ['firstName', 'lastName', 'email', 'password', 'dateOfBirth', 'phone', 'CEP']) {
      expect(wrapper.find(`#${id}`).attributes('aria-invalid')).toBe('true');
      expect(wrapper.find(`#${id}`).attributes('aria-describedby')).toBe(`${id}-erro`);
    }
    expect(wrapper.find('#CEP-erro').text()).toBe('O CEP é obrigatório');
    expect(wrapper.find('#CEP-ajuda').exists()).toBe(false);
    expect(wrapper.find('#password-ajuda').exists()).toBe(false);
    expect(wrapper.find('.auth-alert').exists()).toBe(false);
  });

  it('a região do alerta existe vazia na montagem, logo antes do botão', async () => {
    const wrapper = await mountRegister();
    const regiao = wrapper.find('.auth-form__envio > .auth-form__anuncio');
    expect(regiao.attributes('role')).toBe('alert');
    expect(regiao.attributes('aria-atomic')).toBe('true');
    expect(regiao.text()).toBe('');
    expect(regiao.element.nextElementSibling.matches('button[type="submit"]')).toBe(true);
  });

  it('falha do cadastro: o banner entra na região, e a view rola o grupo de envio', async () => {
    const rolar = vi.fn();
    Element.prototype.scrollIntoView = rolar;
    vi.spyOn(authService, 'register').mockRejectedValue(new Error('falhou'));
    const wrapper = await mountRegister();
    await preencherComCep(wrapper);
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    expect(wrapper.find('.auth-form__anuncio .auth-alert').text()).toBe('Não foi possível criar a conta. Tente de novo.');
    expect(rolar).toHaveBeenCalledTimes(1);
    expect(rolar.mock.contexts[0]).toBe(wrapper.find('.auth-form__envio').element);
    expect(rolar).toHaveBeenCalledWith({ block: 'nearest' });
  });

  it('Nome e Sobrenome ficam no mesmo grupo, antes do e-mail; a ordem do DOM é a do Tab', async () => {
    const wrapper = await mountRegister();
    expect(wrapper.findAll('.auth-form__names input').map((el) => el.attributes('id'))).toEqual(['firstName', 'lastName']);
    const ordem = wrapper.findAll('form input, form button').map((el) => el.attributes('id') ?? el.text());
    expect(ordem).toEqual(['firstName', 'lastName', 'email', 'password', '', 'dateOfBirth', 'phone', 'CEP', 'Criar conta']);
  });
});
