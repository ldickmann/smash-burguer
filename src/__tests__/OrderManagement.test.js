import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import OrderManagement from '../views/admin/OrderManagement.vue';
import TheNavbarAdmin from '../components/admin/layout/TheNavbarAdmin.vue';
import { useAdminOrdersStore } from '../stores/adminOrders';
import { useToastStore } from '../stores/toast';

const Blank = { template: '<div />' };

const mountWithRouter = async (component, path = '/admin/orders') => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/admin', '/admin/orders', '/admin/login'].map((p) => ({ path: p, component: Blank })),
  });
  await router.push(path);
  const wrapper = mount(component, {
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { template: '<svg />' } },
    },
  });
  return { wrapper, router, store: useAdminOrdersStore(), toast: useToastStore() };
};

const mountPage = (path) => mountWithRouter(OrderManagement, path);

const chips = (wrapper) => wrapper.findAll('.status-chip').map((chip) => chip.text());
const updateButtons = (wrapper) => wrapper.findAll('button').filter((b) => b.text() === 'Atualizar status');

describe('OrderManagement', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('"Atualizar status" leva o pedido de Pendente a Concluído e para no último', async () => {
    const { wrapper, toast } = await mountPage();
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

  it('o filtro fica no endereço, e o pedido atualizado segue o filtro', async () => {
    const { wrapper, router } = await mountPage();
    await wrapper.find('select#statusFilter').setValue('preparing');
    await flushPromises();
    expect(router.currentRoute.value.query).toEqual({ status: 'preparing' });
    expect(chips(wrapper)).toEqual(['Em preparo']);

    await updateButtons(wrapper)[0].trigger('click');
    expect(wrapper.find('.empty-state').exists()).toBe(true);

    await wrapper.find('select#statusFilter').setValue('');
    await flushPromises();
    expect(router.currentRoute.value.query).toEqual({});
    expect(chips(wrapper)).toEqual(['Pendente', 'A caminho']);
  });

  it('quando o botão sai da lista filtrada ou fica desabilitado, o foco vai para o título', async () => {
    const { wrapper } = await mountPage('/admin/orders?status=pending');
    document.body.appendChild(wrapper.element);

    const pending = updateButtons(wrapper)[0];
    pending.element.focus();
    await pending.trigger('click');
    await flushPromises();
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(document.activeElement).toBe(wrapper.find('h1').element);

    const all = await mountPage('/admin/orders?status=preparing');
    document.body.appendChild(all.wrapper.element);
    all.store.advanceStatus(2);
    await all.wrapper.find('select#statusFilter').setValue('');
    await flushPromises();
    const delivery = updateButtons(all.wrapper)[1];
    await delivery.trigger('click');
    await flushPromises();
    expect(delivery.attributes('disabled')).toBeDefined();
    expect(document.activeElement).toBe(all.wrapper.find('h1').element);

    wrapper.element.remove();
    all.wrapper.element.remove();
  });

  it('abre já filtrado pelo status do endereço; status desconhecido vale como "Todos"', async () => {
    const pending = await mountPage('/admin/orders?status=pending');
    expect(pending.wrapper.find('select#statusFilter').element.value).toBe('pending');
    expect(chips(pending.wrapper)).toEqual(['Pendente']);

    const unknown = await mountPage('/admin/orders?status=xyz');
    expect(unknown.wrapper.find('select#statusFilter').element.value).toBe('');
    expect(chips(unknown.wrapper)).toEqual(['Pendente', 'Em preparo']);
  });
});

describe('contadores da barra do painel', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const shortcuts = (wrapper) =>
    wrapper.findAll('.navbar-notifications__item').map((item) => ({
      label: item.find('a').attributes('aria-label'),
      href: item.find('a').attributes('href'),
      count: item.find('.navbar-notifications__count').exists()
        ? item.find('.navbar-notifications__count').text()
        : null,
    }));

  it('contam os pedidos pendentes e em preparo e levam à tela Pedidos filtrada', async () => {
    const { wrapper } = await mountWithRouter(TheNavbarAdmin, '/admin');

    expect(shortcuts(wrapper)).toEqual([
      { label: 'Notificações, 1 pedido pendente', href: '/admin/orders?status=pending', count: '1' },
      { label: 'Tarefas, 1 pedido em preparo', href: '/admin/orders?status=preparing', count: '1' },
    ]);
    expect(wrapper.text()).not.toContain('Mensagens');
  });

  it('acompanham o "Atualizar status": sem pendentes, o selo some', async () => {
    const { wrapper, store } = await mountWithRouter(TheNavbarAdmin, '/admin');

    store.advanceStatus(1);
    await wrapper.vm.$nextTick();

    const [alerts, tasks] = shortcuts(wrapper);
    expect(alerts).toMatchObject({ label: 'Notificações, nenhum pedido pendente', count: null });
    expect(tasks).toMatchObject({ label: 'Tarefas, 2 pedidos em preparo', count: '2' });
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
