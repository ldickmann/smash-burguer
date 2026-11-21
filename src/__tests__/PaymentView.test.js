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

const mountPayment = async (items) => {
  useUserStore().setUser(USER);
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
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { template: '<svg />' } },
    },
  });
  await wrapper.find('input[type="radio"][value="pix"]').setValue();
  return { wrapper, router };
};

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
});
