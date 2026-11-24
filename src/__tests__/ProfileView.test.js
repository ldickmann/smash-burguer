import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import ProfileView from '../views/auth/ProfileView.vue';
import { useUserStore } from '../stores/userStore';
import { useCartStore } from '../stores/cart';
import { ACCOUNT_KEY, authService } from '../services/authServices';
import { formatPrice } from '../utils/formatters';

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

    expect(wrapper.find('#email-erro').text()).toBe('O e-mail é obrigatório');
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

// Desenho da Conta (§5.6 a §5.8 e §9): as seções em contêineres, os campos de endereço somente
// leitura, o CEP como região viva, o "Excluir conta" em danger, a linha do pedido sem "·" com o total
// ao lado do número, o rótulo de status que não é controle e o "Ver itens" nativo
describe('ProfileView no M3', () => {
  const PEDIDO = {
    items: [{ productId: 1, category: 'foods', name: 'Cheese Bacon', unitPrice: 29.49, quantity: 1 }],
    total: 29.49,
    paymentMethod: 'PIX',
    address: ACCOUNT.address,
  };

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    vi.stubGlobal('fetch', viaCep());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  const comPedido = async () => {
    const montado = await mountProfile();
    useUserStore().placeOrder(PEDIDO);
    await flushPromises();
    return montado;
  };

  it('"Seus dados" e "Seus pedidos" são seções nomeadas pelos h2, em .profile-page__secao, nessa ordem', async () => {
    const { wrapper } = await mountProfile();
    const secoes = wrapper.findAll('section.profile-page__secao');
    expect(secoes.map((s) => s.attributes('aria-labelledby'))).toEqual(['seus-dados', 'seus-pedidos']);
    expect(secoes.map((s) => s.find('h2').text())).toEqual(['Seus dados', 'Seus pedidos']);
    expect(wrapper.find('.profile-page__card').exists()).toBe(false);
    expect(wrapper.findAll('h1').map((h) => h.text())).toEqual(['Sua conta']);
  });

  it('Rua, Bairro, Cidade e UF são somente leitura, com .is-readonly', async () => {
    const { wrapper } = await mountProfile();
    for (const id of ['street', 'neighborhood', 'city', 'state']) {
      expect(wrapper.find(`#${id}`).attributes('readonly')).toBeDefined();
      expect(wrapper.find(`#${id}`).element.closest('.form-group').classList.contains('is-readonly')).toBe(true);
    }
  });

  it('o CEP é uma região viva, com a ajuda dentro', async () => {
    const { wrapper } = await mountProfile();
    const regiao = wrapper.find('#CEP').element.closest('.form-group').querySelector('.form-group__mensagens');
    expect(regiao.getAttribute('role')).toBe('status');
    expect(regiao.getAttribute('aria-atomic')).toBe('true');
    expect(regiao.textContent).toContain('ViaCEP');
  });

  it('"Salvar alterações" é tonal e block; o "Excluir conta" da tela usa a variante danger', async () => {
    const { wrapper } = await mountProfile();
    const salvar = buttonByText(wrapper, 'Salvar alterações');
    expect(salvar.classes()).toEqual(expect.arrayContaining(['btn--secondary', 'btn--block']));
    const excluir = wrapper.find('.profile-delete button');
    expect(excluir.text()).toBe('Excluir conta');
    expect(excluir.classes()).toContain('btn--danger');
  });

  it('a linha do pedido: número e total na linha 1; data, contagem e status em parágrafos, sem "·"', async () => {
    const { wrapper } = await comPedido();
    const pedido = wrapper.find('li.profile-order');
    expect(pedido.find('.profile-order__head .profile-order__number').text()).toMatch(/^Pedido #\d+$/);
    expect(pedido.find('.profile-order__head .profile-order__total').text()).toBe(formatPrice(29.49));
    expect(pedido.find('.profile-order__total').classes()).toContain('tabular');
    const meta = pedido.find('.profile-order__meta');
    expect(meta.findAll(':scope > p').map((p) => p.text())).toEqual([
      expect.stringMatching(/^\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}$/),
      '1 item',
      'Recebido',
    ]);
    expect(meta.find('time').attributes('datetime')).toBeTruthy();
    expect(pedido.text()).not.toContain('·');
  });

  it('"Recebido" é um rótulo de status: um p, sem papel, sem tabindex e sem ser botão', async () => {
    const { wrapper } = await comPedido();
    const status = wrapper.find('.profile-order__status');
    expect(status.element.tagName).toBe('P');
    expect(status.attributes('role')).toBeUndefined();
    expect(status.attributes('tabindex')).toBeUndefined();
    expect(status.find('button, a, svg').exists()).toBe(false);
  });

  it('"Ver itens" é o summary de um details, com os dois chevrons decorativos; aberto, mostra o resumo', async () => {
    const { wrapper } = await comPedido();
    const details = wrapper.find('details.profile-order__details');
    const summary = details.find(':scope > summary.profile-order__summary');
    expect(summary.text()).toBe('Ver itens');
    const chevrons = summary.findAll('.profile-order__chevron');
    expect(chevrons).toHaveLength(2);
    for (const chevron of chevrons) expect(chevron.attributes('aria-hidden')).toBe('true');
    expect(summary.attributes('role')).toBeUndefined();
    expect(details.find('.order-summary').exists()).toBe(true);
  });

  it('depois do aviso "Dados salvos.", o foco rola para a vista só se a última entrada foi do teclado', async () => {
    const rolar = vi.fn();
    Element.prototype.scrollIntoView = rolar;
    try {
      const { wrapper } = await mountProfile();
      const salvar = async () => {
        await wrapper.find('form').trigger('submit');
        await vi.advanceTimersByTimeAsync(1000);
        await flushPromises();
      };

      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await salvar();
      expect(rolar).toHaveBeenCalledTimes(1);
      expect(rolar).toHaveBeenCalledWith({ block: 'nearest' });

      // Pelo toque ou pelo mouse, a página não pula
      document.dispatchEvent(new Event('pointerdown'));
      await salvar();
      expect(rolar).toHaveBeenCalledTimes(1);
    } finally {
      delete Element.prototype.scrollIntoView;
    }
  });

  // /code-review: o aviso de erro fica no mesmo lugar do de sucesso e também cobriria o botão
  it('com o aviso de erro ao salvar, o foco também rola, se a última entrada foi do teclado', async () => {
    const rolar = vi.fn();
    Element.prototype.scrollIntoView = rolar;
    try {
      const { wrapper } = await mountProfile();
      vi.spyOn(useUserStore(), 'updateProfile').mockRejectedValue(new Error('cota cheia'));
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      await wrapper.find('form').trigger('submit');
      await flushPromises();
      expect(rolar).toHaveBeenCalledTimes(1);
      expect(rolar).toHaveBeenCalledWith({ block: 'nearest' });
    } finally {
      delete Element.prototype.scrollIntoView;
    }
  });

  it('sem pedidos, o EmptyState com "Ver cardápio" dentro da seção', async () => {
    const { wrapper } = await mountProfile();
    const secao = wrapper.findAll('section.profile-page__secao')[1];
    expect(secao.find('.empty-state').text()).toContain('Você ainda não fez pedidos');
    expect(secao.find('a[href="/menu"]').text()).toBe('Ver cardápio');
  });
});
