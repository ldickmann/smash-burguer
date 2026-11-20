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
