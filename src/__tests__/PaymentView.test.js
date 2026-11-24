import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import PaymentView from '../views/PaymentView.vue';
import { useCartStore } from '../stores/cart';
import { useUserStore } from '../stores/userStore';
import { useToastStore } from '../stores/toast';
import { useProductsStore } from '../stores/products';
import { unitPriceOf } from '../utils/cartItems';
import { formatPrice } from '../utils/formatters';

const USER = {
  firstName: 'Maria',
  email: 'maria@example.com',
  CEP: '88370000',
  address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' },
};

const Blank = { template: '<div />' };

let pinia;

// Cheese Bacon com 1 bacon, montado como o modal de personalização monta
const burger = () => {
  const additionals = useProductsStore().foodAdditionals.map(({ name, price }) => ({
    name,
    price,
    quantity: name === 'Bacon' ? 1 : 0,
  }));
  return {
    productId: 1,
    category: 'foods',
    name: 'Cheese Bacon',
    image: '/images/foods/cheese-bacon',
    unitPrice: unitPriceOf(25.99, additionals),
    quantity: 2,
    removedIngredients: [],
    additionals: additionals.filter((additional) => additional.quantity > 0),
    observation: '',
  };
};

const mountPayment = async (items, { method = 'pix', user = USER, attachTo } = {}) => {
  useUserStore().setUser(user);
  const cart = useCartStore();
  items.forEach((item) => cart.addItem(item));

  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/cart', '/payment', '/confirmation', '/profile'].map((path) => ({
      path,
      component: Blank,
    })),
  });
  await router.push('/payment');

  const wrapper = mount(PaymentView, {
    attachTo,
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { props: ['icon'], template: '<svg :data-icon="[].concat(icon).join(\'-\')" />' } },
    },
  });
  if (method) await wrapper.find(`input[type="radio"][value="${method}"]`).setValue();
  return { wrapper, router };
};

const ctaOf = (wrapper) => wrapper.find('.payment-page__resumo .order-summary__cta button');

// Confirma e avança a espera simulada do envio
const confirm = async (wrapper) => {
  const button = wrapper.findAll('button').find((b) => b.text().startsWith('Confirmar pedido'));
  await button.trigger('click');
  await vi.advanceTimersByTimeAsync(800);
  await flushPromises();
};

describe('PaymentView', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    pinia = createPinia();
    setActivePinia(pinia);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('um carrinho que bate com o cardápio fecha o pedido na primeira confirmação', async () => {
    const { wrapper, router } = await mountPayment([burger()]);

    await confirm(wrapper);

    const [order] = useUserStore().orderHistory;
    expect(order.total).toBeCloseTo(2 * 29.49);
    expect(useCartStore().items).toEqual([]);
    expect(router.currentRoute.value.path).toBe('/confirmation');
  });

  it('com o preço editado no carrinho, o pedido sai com o total do cardápio, depois de um aviso', async () => {
    const { wrapper, router } = await mountPayment([
      { ...burger(), unitPrice: -500, additionals: [{ name: 'Bacon', price: 0, quantity: 1 }] },
    ]);
    expect(wrapper.text()).toContain(`Confirmar pedido · ${formatPrice(-1000)}`);

    await confirm(wrapper);

    // Não fecha o pedido: o carrinho volta ao preço do cardápio e a pessoa confere
    expect(useUserStore().orderHistory).toEqual([]);
    expect(useCartStore().items).toEqual([burger()]);
    expect(useToastStore().toasts.map((toast) => toast.message)).toEqual([
      'O carrinho foi atualizado com o cardápio. Confira o pedido antes de confirmar.',
    ]);
    expect(wrapper.text()).toContain(`Confirmar pedido · ${formatPrice(58.98)}`);
    expect(router.currentRoute.value.path).toBe('/payment');

    await confirm(wrapper);

    const [order] = useUserStore().orderHistory;
    expect(order.total).toBeCloseTo(2 * 29.49);
    expect(order.items[0].additionals).toEqual([{ name: 'Bacon', price: 3.5, quantity: 1 }]);
    expect(router.currentRoute.value.path).toBe('/confirmation');
  });

  it('o pedido do histórico não guarda a imagem do produto', async () => {
    const { wrapper } = await mountPayment([burger()]);

    await confirm(wrapper);

    const [order] = useUserStore().orderHistory;
    expect(order.items[0]).not.toHaveProperty('image');
    expect(order.items[0]).toMatchObject({ productId: 1, name: 'Cheese Bacon', quantity: 2 });
  });

  it('quem sai da tela durante a espera desiste do pedido', async () => {
    const { wrapper, router } = await mountPayment([burger()]);
    const button = wrapper.findAll('button').find((b) => b.text().startsWith('Confirmar pedido'));
    await button.trigger('click');

    await router.push('/');
    wrapper.unmount();
    await vi.advanceTimersByTimeAsync(800);
    await flushPromises();

    expect(useUserStore().orderHistory).toEqual([]);
    expect(useCartStore().items).toHaveLength(1);
    expect(router.currentRoute.value.path).toBe('/');
  });

  it('se nenhuma linha bate com o cardápio, o pedido não sai e a tela volta ao carrinho', async () => {
    const { wrapper, router } = await mountPayment([{ ...burger(), productId: 99 }]);

    await confirm(wrapper);

    expect(useUserStore().orderHistory).toEqual([]);
    expect(useCartStore().items).toEqual([]);
    expect(router.currentRoute.value.path).toBe('/cart');
  });

  it('com a tela continuando, o aviso da conferência não expira (duration: 0)', async () => {
    const { wrapper } = await mountPayment([
      { ...burger(), unitPrice: -500, additionals: [{ name: 'Bacon', price: 0, quantity: 1 }] },
    ]);

    await confirm(wrapper);
    await vi.advanceTimersByTimeAsync(60000);
    expect(useToastStore().toasts.map((toast) => toast.message)).toEqual([
      'O carrinho foi atualizado com o cardápio. Confira o pedido antes de confirmar.',
    ]);
  });

  it('com o carrinho esvaziado pela conferência, o aviso sobrevive à ida ao /cart e sai em 4 s', async () => {
    const { wrapper, router } = await mountPayment([{ ...burger(), productId: 99 }]);

    await confirm(wrapper);
    expect(router.currentRoute.value.path).toBe('/cart');
    expect(useToastStore().toasts).toHaveLength(1);

    await vi.advanceTimersByTimeAsync(3999);
    expect(useToastStore().toasts).toHaveLength(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(useToastStore().toasts).toHaveLength(0);
  });
});

// Pagamento no M3 (docs/direcoes/desenho/carrinho-pagamento.md, §5.6 a §5.8 e §9). As setas do grupo
// de rádios são do navegador [92][96] e não andam no jsdom: ficam no keyboard.mjs.
describe('PaymentView (Pagamento do Material 3)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    pinia = createPinia();
    setActivePinia(pinia);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('"Entrega" e "Forma de pagamento" em seções com h2; só a Entrega vira região nomeada', async () => {
    const { wrapper } = await mountPayment([burger()], { method: null });
    const secoes = wrapper.findAll('section.payment-page__secao');
    expect(secoes.map((secao) => secao.find('h2').text())).toEqual(['Entrega', 'Forma de pagamento']);
    expect(secoes[0].attributes('aria-labelledby')).toBe('entrega-titulo');
    expect(secoes[0].find('h2').attributes('id')).toBe('entrega-titulo');
    expect(secoes[1].attributes('aria-labelledby')).toBeUndefined();
    expect(secoes[1].find('h2').classes()).not.toContain('visually-hidden');
  });

  it('um fieldset com a legend escondida e quatro rádios no mesmo name, nenhum marcado ao abrir', async () => {
    const { wrapper } = await mountPayment([burger()], { method: null });
    const grupo = wrapper.find('section.payment-page__secao fieldset.payment-picker');
    const legenda = grupo.find('legend');
    expect(legenda.text()).toBe('Forma de pagamento');
    expect(legenda.classes()).toContain('visually-hidden');

    const radios = grupo.findAll('input[type="radio"]');
    expect(radios.map((radio) => radio.element.value)).toEqual(['credit', 'debit', 'pix', 'cash']);
    expect(new Set(radios.map((radio) => radio.attributes('name')))).toEqual(new Set(['payment-method']));
    expect(radios.some((radio) => radio.element.checked)).toBe(false);
    expect(radios.every((radio) => radio.classes().includes('payment-option__input'))).toBe(true);
  });

  it('cada opção tem o controle com o check no início e o ícone da forma no fim; a marcada fica is-checked', async () => {
    const { wrapper } = await mountPayment([burger()]);
    const opcoes = wrapper.findAll('label.payment-option');
    expect(opcoes).toHaveLength(4);
    for (const opcao of opcoes) {
      const filhos = [...opcao.element.children].map((el) => el.getAttribute('class'));
      expect(filhos[0]).toContain('payment-option__input');
      expect(filhos[1]).toContain('payment-option__controle');
      expect(filhos.at(-1)).toContain('payment-option__icon');
      const controle = opcao.find('.payment-option__controle');
      expect(controle.attributes('aria-hidden')).toBe('true');
      expect(controle.find('.payment-option__check').attributes('data-icon')).toBe('fas-check');
    }
    expect(opcoes.map((opcao) => opcao.classes().includes('is-checked'))).toEqual([false, false, true, false]);
    expect(wrapper.find('[data-icon="fas-circle-check"]').exists()).toBe(false);
  });

  it('com endereço: o address e "Alterar no perfil" como text button para /profile', async () => {
    const { wrapper } = await mountPayment([burger()], { method: null });
    expect(wrapper.find('.payment-page address').text()).toContain('Rua Beira da Praia');
    expect(wrapper.find('.payment-page address').text()).toContain('CEP 88370-000');
    const alterar = wrapper.findAll('a').find((a) => a.text() === 'Alterar no perfil');
    expect(alterar.attributes('href')).toBe('/profile');
    expect(alterar.classes()).toContain('m3-botao--texto');
  });

  it('sem endereço: o aviso e "Adicionar endereço" em filled S para /profile; o CTA fica desabilitado', async () => {
    const { wrapper } = await mountPayment([burger()], { user: { ...USER, address: {} } });
    const aviso = wrapper.find('.payment-page__aviso');
    expect(aviso.text()).toContain('Cadastre um endereço para receber o pedido.');
    const adicionar = aviso.find('a');
    expect(adicionar.text()).toBe('Adicionar endereço');
    expect(adicionar.attributes('href')).toBe('/profile');
    expect(adicionar.classes()).toEqual(expect.arrayContaining(['m3-botao--filled', 'btn--sm']));

    // Com a forma marcada, o CTA continua indisponível pela falta do endereço (aria-disabled: segue no Tab)
    const cta = ctaOf(wrapper);
    expect(cta.attributes('aria-disabled')).toBe('true');
    expect(cta.attributes('disabled')).toBeUndefined();
    expect(cta.attributes('aria-describedby')).toBe('pagamento-ajuda');
    expect(wrapper.find('#pagamento-ajuda').text()).toBe('Cadastre um endereço para receber o pedido.');
  });

  it('o CTA fica com aria-disabled (e não disabled) até marcar uma forma; o clique não envia; marcar habilita e tira a ajuda', async () => {
    const { wrapper } = await mountPayment([burger()], { method: null });
    const cta = ctaOf(wrapper);
    expect(cta.classes()).toEqual(expect.arrayContaining(['payment-page__cta', 'm3-botao--filled', 'btn--lg', 'btn--block']));
    expect(cta.attributes('aria-disabled')).toBe('true');
    expect(cta.attributes('disabled')).toBeUndefined();
    expect(cta.attributes('aria-describedby')).toBe('pagamento-ajuda');
    expect(wrapper.find('#pagamento-ajuda').text()).toBe('Escolha uma forma de pagamento');

    await cta.trigger('click');
    expect(ctaOf(wrapper).classes()).not.toContain('is-loading');
    await vi.advanceTimersByTimeAsync(800);
    expect(useUserStore().orderHistory).toEqual([]);

    await wrapper.find('input[type="radio"][value="cash"]').setValue();
    expect(ctaOf(wrapper).attributes('aria-disabled')).toBeUndefined();
    expect(ctaOf(wrapper).attributes('aria-describedby')).toBeUndefined();
    expect(wrapper.find('#pagamento-ajuda').exists()).toBe(false);
    expect(ctaOf(wrapper).text()).toBe(`Confirmar pedido · ${formatPrice(2 * 29.49)}`);
  });

  it('"Enviando pedido…" em is-loading, sem aria-busy, durante os 800 ms', async () => {
    const { wrapper } = await mountPayment([burger()]);
    await ctaOf(wrapper).trigger('click');

    expect(ctaOf(wrapper).text()).toBe('Enviando pedido…');
    expect(ctaOf(wrapper).classes()).toContain('is-loading');
    expect(ctaOf(wrapper).attributes('aria-busy')).toBeUndefined();
    await vi.advanceTimersByTimeAsync(799);
    expect(ctaOf(wrapper).classes()).toContain('is-loading');

    await vi.advanceTimersByTimeAsync(1);
    await flushPromises();
    expect(useUserStore().orderHistory).toHaveLength(1);
  });

  it('depois do aviso da conferência, o elemento focado rola para a vista (block: nearest)', async () => {
    const rolar = vi.fn();
    HTMLElement.prototype.scrollIntoView = rolar;
    try {
      const { wrapper } = await mountPayment(
        [{ ...burger(), unitPrice: -500, additionals: [{ name: 'Bacon', price: 0, quantity: 1 }] }],
        { attachTo: document.body }
      );
      ctaOf(wrapper).element.focus();
      await confirm(wrapper);

      expect(useToastStore().toasts).toHaveLength(1);
      expect(rolar).toHaveBeenCalledWith({ block: 'nearest' });
      expect(rolar.mock.contexts.at(-1)).toBe(document.activeElement);
      wrapper.unmount();
    } finally {
      delete HTMLElement.prototype.scrollIntoView;
    }
  });
});
