import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import OrderManagement from '../views/admin/OrderManagement.vue';
import { useAdminOrdersStore } from '../stores/adminOrders';
import { useToastStore } from '../stores/toast';

const mountPage = () => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const wrapper = mount(OrderManagement, {
    global: {
      plugins: [pinia],
      stubs: { 'font-awesome-icon': { template: '<svg />' } },
    },
  });
  return { wrapper, store: useAdminOrdersStore(), toast: useToastStore() };
};

const chips = (wrapper) => wrapper.findAll('.status-chip').map((chip) => chip.text());
const updateButtons = (wrapper) => wrapper.findAll('button').filter((b) => b.text() === 'Atualizar status');

describe('OrderManagement', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('"Atualizar status" leva o pedido de Pendente a Concluído e para no último', async () => {
    const { wrapper, toast } = mountPage();
    expect(chips(wrapper)).toEqual(['Pendente', 'Em preparo']);

    for (const label of ['Em preparo', 'A caminho', 'Concluído']) {
      await updateButtons(wrapper)[0].trigger('click');
      expect(chips(wrapper)[0]).toBe(label);
      expect(toast.toasts.at(-1).message).toBe(`Pedido #1: ${label}.`);
    }

    const [first, second] = updateButtons(wrapper);
    expect(first.attributes('disabled')).toBeDefined();
    expect(second.attributes('disabled')).toBeUndefined();
    expect(chips(wrapper)[1]).toBe('Em preparo');
  });

  it('o pedido atualizado segue o filtro de status', async () => {
    const { wrapper } = mountPage();
    await wrapper.find('select#statusFilter').setValue('preparing');
    expect(chips(wrapper)).toEqual(['Em preparo']);

    await updateButtons(wrapper)[0].trigger('click');

    expect(wrapper.find('.empty-state').exists()).toBe(true);
  });
});

describe('store de pedidos do painel', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('não avança pedido concluído nem pedido que não existe, e conta por status', () => {
    const store = useAdminOrdersStore();
    store.orders[0].status = 'completed';

    expect(store.advanceStatus(1)).toBeNull();
    expect(store.advanceStatus(99)).toBeNull();
    expect(store.orders[0].status).toBe('completed');
    expect(store.countByStatus('completed')).toBe(1);
    expect(store.countByStatus('pending')).toBe(0);
  });
});
