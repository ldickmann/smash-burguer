import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import ProfileView from '../views/auth/ProfileView.vue';
import { useUserStore } from '../stores/userStore';
import { useCartStore } from '../stores/cart';
import { ACCOUNT_KEY } from '../services/authServices';

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

const mountProfile = async () => {
  const pinia = createPinia();
  setActivePinia(pinia);
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(ACCOUNT));
  useUserStore().setUser(ACCOUNT);

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

describe('ProfileView', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.spyOn(console, 'log').mockImplementation(() => {});
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

  it('com a consulta do CEP novo em andamento, espera a resposta e salva o endereço dela', async () => {
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

    await wrapper.find('#CEP').setValue('01001000');
    await wrapper.find('form').trigger('submit');
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
