import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import ProfileView from '../views/auth/ProfileView.vue';
import { useUserStore } from '../stores/userStore';
import { useCartStore } from '../stores/cart';
import { ACCOUNT_KEY, authService } from '../services/authServices';

const ACCOUNT = {
  firstName: 'Maria',
  lastName: 'Silva',
  email: 'maria@example.com',
  password: 'senha123',
  dateOfBirth: '1990-05-10',
  phone: '47999999999',
  CEP: '88370000',
  address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' },
};

const Blank = { template: '<div />' };

const mountProfile = async (account = ACCOUNT) => {
  const pinia = createPinia();
  setActivePinia(pinia);
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  useUserStore().setUser(account);

  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/login', '/menu', '/profile'].map((path) => ({ path, component: Blank })),
  });
  await router.push('/profile');

  const wrapper = mount(ProfileView, {
    global: {
      plugins: [pinia, router],
      stubs: {
        'font-awesome-icon': { template: '<svg />' },
        // O <dialog> nativo não existe no jsdom: o stub só mostra o conteúdo quando aberto
        BaseDialog: { props: ['open'], template: '<div v-if="open" class="dialog-stub"><slot /><slot name="footer" /></div>' },
      },
    },
  });
  return { wrapper, router };
};

const savedAccount = () => JSON.parse(localStorage.getItem(ACCOUNT_KEY));
const buttonByText = (wrapper, text) => wrapper.findAll('button').find((b) => b.text() === text);

// ViaCEP simulado: o CEP de Navegantes tem rua; 35588000 vale para a cidade toda (sem rua)
const viaCep = () =>
  vi.fn((url) =>
    Promise.resolve({
      json: async () =>
        url.includes('35588000')
          ? { logradouro: '', bairro: '', localidade: 'Serra Azul', uf: 'MG' }
          : { logradouro: 'Rua Beira da Praia', bairro: 'Centro', localidade: 'Navegantes', uf: 'SC' },
    })
  );

describe('ProfileView', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    // A tela consulta o CEP salvo ao abrir; nenhum teste vai à rede
    vi.stubGlobal('fetch', viaCep());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('não salva sem e-mail: mostra o erro no campo e o cadastro continua igual', async () => {
    const { wrapper } = await mountProfile();

    await wrapper.find('#email').setValue('');
    await wrapper.find('form').trigger('submit');
    await vi.advanceTimersByTimeAsync(1000);
    await flushPromises();

    expect(wrapper.find('#email-erro').text()).toBe('O email é obrigatório');
    expect(savedAccount()).toEqual(ACCOUNT);
    expect(useUserStore().user.email).toBe(ACCOUNT.email);
  });

  it('avisa no campo que o CEP é consultado no ViaCEP', async () => {
    const { wrapper } = await mountProfile();

    expect(wrapper.find('#CEP-ajuda').text()).toContain('ViaCEP');
    expect(wrapper.find('#CEP').attributes('aria-describedby')).toContain('CEP-ajuda');
  });

  it('CEP incompleto apaga o endereço anterior e bloqueia o envio', async () => {
    const { wrapper } = await mountProfile();

    await wrapper.find('#CEP').setValue('0100100');
    expect(wrapper.find('#street').element.value).toBe('');

    await wrapper.find('form').trigger('submit');
    await vi.advanceTimersByTimeAsync(1000);
    await flushPromises();

    expect(wrapper.find('#CEP-erro').text()).toBe('CEP inválido. Devem conter 8 dígitos');
    expect(savedAccount()).toEqual(ACCOUNT);
  });

  it('com a consulta do CEP novo em andamento, espera a resposta e salva uma vez o endereço dela', async () => {
    let respond;
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            respond = () =>
              resolve({ json: async () => ({ logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' }) });
          })
      )
    );
    const { wrapper } = await mountProfile();
    const save = vi.spyOn(authService, 'updateProfile');

    await wrapper.find('#CEP').setValue('01001000');
    await wrapper.find('form').trigger('submit');
    await wrapper.find('form').trigger('submit'); // segundo envio durante a espera: ignorado
    await vi.advanceTimersByTimeAsync(1000);
    expect(savedAccount()).toEqual(ACCOUNT);

    respond();
    await flushPromises();
    await vi.advanceTimersByTimeAsync(1000);
    await flushPromises();

    expect(savedAccount()).toMatchObject({
      CEP: '01001000',
      password: ACCOUNT.password,
      address: { street: 'Praça da Sé', city: 'São Paulo', state: 'SP' },
    });
    expect(useUserStore().user.address.street).toBe('Praça da Sé');
    expect(save).toHaveBeenCalledTimes(1);
  });

  it('com CEP único da cidade (sem rua), a rua fica editável e é obrigatória', async () => {
    const { wrapper } = await mountProfile();
    await flushPromises();
    expect(wrapper.find('#street').attributes('readonly')).toBeDefined();

    await wrapper.find('#CEP').setValue('35588000');
    await flushPromises();
    expect(wrapper.find('#street').attributes('readonly')).toBeUndefined();
    expect(wrapper.find('#neighborhood').attributes('readonly')).toBeUndefined();

    await wrapper.find('form').trigger('submit');
    await flushPromises();
    expect(wrapper.find('#street-erro').text()).toContain('Informe a rua e o número.');
    expect(savedAccount()).toEqual(ACCOUNT);

    await wrapper.find('#street').setValue('Rua das Flores, 10');
    await wrapper.find('form').trigger('submit');
    await vi.advanceTimersByTimeAsync(1000);
    await flushPromises();

    expect(savedAccount().address).toEqual({ street: 'Rua das Flores, 10', neighborhood: '', city: 'Serra Azul', state: 'MG' });
  });

  it('a rua digitada para um CEP único da cidade continua editável quando o perfil abre', async () => {
    const account = {
      ...ACCOUNT,
      CEP: '35588000',
      address: { street: 'Rua das Flores, 10', neighborhood: '', city: 'Serra Azul', state: 'MG' },
    };
    const { wrapper } = await mountProfile(account);
    await flushPromises();

    expect(wrapper.find('#street').attributes('readonly')).toBeUndefined();
    expect(wrapper.find('#street').element.value).toBe('Rua das Flores, 10');

    await wrapper.find('#street').setValue('Rua das Flores, 12');
    await wrapper.find('form').trigger('submit');
    await vi.advanceTimersByTimeAsync(1000);
    await flushPromises();
    expect(savedAccount().address.street).toBe('Rua das Flores, 12');
  });

  it('"Excluir conta" pede confirmação e apaga a conta, a sessão e o carrinho', async () => {
    const { wrapper, router } = await mountProfile();
    useCartStore().addItem({ productId: 1, name: 'Smash Burger', unitPrice: 22.5 });

    expect(wrapper.find('.dialog-stub').exists()).toBe(false);
    await buttonByText(wrapper, 'Excluir conta').trigger('click');
    const dialog = wrapper.find('.dialog-stub');
    expect(dialog.text()).toContain('Não é possível desfazer.');

    await dialog.findAll('button').find((b) => b.text() === 'Excluir conta').trigger('click');
    await vi.advanceTimersByTimeAsync(1000);
    await flushPromises();

    expect(localStorage.getItem(ACCOUNT_KEY)).toBeNull();
    expect(useUserStore().isAuthenticated).toBe(false);
    expect(useCartStore().items).toEqual([]);
    expect(router.currentRoute.value.path).toBe('/');
  });
});
