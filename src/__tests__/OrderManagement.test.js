import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import OrderManagement from '../views/admin/OrderManagement.vue';
import TheNavbarAdmin from '../components/admin/layout/TheNavbarAdmin.vue';
import { useAdminOrdersStore } from '../stores/adminOrders';
import { useToastStore } from '../stores/toast';
import { formatPrice } from '../utils/formatters';

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
      stubs: {
        'font-awesome-icon': { template: '<svg />' },
        // O <dialog> nativo não existe no jsdom: o stub só mostra o conteúdo quando aberto
        BaseDialog: {
          props: ['open', 'title'],
          template: '<div v-if="open" class="dialog-stub"><h2>{{ title }}</h2><slot /><slot name="footer" /></div>',
        },
      },
    },
  });
  return { wrapper, router, store: useAdminOrdersStore(), toast: useToastStore() };
};

const mountPage = (path) => mountWithRouter(OrderManagement, path);

const chips = (wrapper) => wrapper.findAll('.orders-list .m3-status').map((chip) => chip.text());
// O tom do rótulo de status (M3RotuloStatus): a classe m3-status--{tom}
const tom = (rotulo) => rotulo.classes().find((c) => c.startsWith('m3-status--'))?.replace('m3-status--', '');
const rotulos = (wrapper) =>
  wrapper.findAll('.orders-list .m3-status').map((rotulo) => [rotulo.text(), tom(rotulo)]);
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

describe('OrderManagement no M3 (desenho do admin, §5.5, §5.6 e §4.6)', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
    delete Element.prototype.scrollIntoView;
    document.body.innerHTML = '';
  });

  it('o status é o M3RotuloStatus, um p sem papel, com o tom de cada status', async () => {
    const { wrapper } = await mountPage();
    expect(rotulos(wrapper)).toEqual([
      ['Pendente', 'aviso'],
      ['Em preparo', 'info'],
    ]);
    const primeiro = wrapper.find('.orders-list .m3-status');
    expect(primeiro.element.tagName).toBe('P');
    expect(primeiro.attributes('role')).toBeUndefined();
    expect(primeiro.attributes('tabindex')).toBeUndefined();
    // O rótulo fica no cabeçalho do card, junto do título
    expect(primeiro.element.closest('.admin-card__header')).not.toBeNull();
    expect(wrapper.find('.status-chip').exists()).toBe(false);

    await updateButtons(wrapper)[0].trigger('click');
    await updateButtons(wrapper)[0].trigger('click');
    expect(rotulos(wrapper)[0]).toEqual(['A caminho', 'info']);
    await updateButtons(wrapper)[0].trigger('click');
    expect(rotulos(wrapper)[0]).toEqual(['Concluído', 'sucesso']);
  });

  it('no diálogo "Detalhes", o mesmo rótulo com o tom do status, e o h3 "Itens"', async () => {
    const { wrapper } = await mountPage();
    await wrapper.findAll('button').find((b) => b.text() === 'Detalhes').trigger('click');
    const dialogo = wrapper.find('.dialog-stub');
    const rotulo = dialogo.find('dd .m3-status');
    expect(rotulo.text()).toBe('Pendente');
    expect(tom(rotulo)).toBe('aviso');
    expect(dialogo.findAll('h3').map((h) => h.text())).toEqual(['Itens']);
    expect(dialogo.findAll('dt').map((dt) => dt.text())).toEqual(['Status', 'Cliente', 'Endereço', 'Telefone']);
  });

  it('cada card tem o h2 "Pedido #{id}" e os h3 "Cliente" e "Itens"', async () => {
    const { wrapper } = await mountPage();
    const cards = wrapper.findAll('.orders-list > li');
    expect(cards.map((card) => card.find('h2').text())).toEqual(['Pedido #1', 'Pedido #2']);
    for (const card of cards) {
      expect(card.findAll('h3').map((h) => h.text())).toEqual(['Cliente', 'Itens']);
    }
  });

  it('a linha do item no card mostra "{preço} cada", também na quantidade 1, sem o total da linha', async () => {
    const { wrapper } = await mountPage();
    const linhas = wrapper
      .findAll('.orders-list > li')[0]
      .findAll('.order-info__item')
      .map((li) => li.findAll(':scope > span').map((span) => span.text().replace(/\s+/g, ' ')));
    expect(linhas).toEqual([
      ['2× Smash Burger', `${formatPrice(25.9)} cada`.replace(/\s+/g, ' ')],
      ['1× Coca-Cola', `${formatPrice(8)} cada`.replace(/\s+/g, ' ')],
    ]);
    // O card não calcula preço: o total da linha (2 × 25,90) só aparece no diálogo
    expect(wrapper.find('.orders-list').text()).not.toContain(formatPrice(51.8));
    expect(wrapper.find('.orders-list .order-info__total-value').text()).toBe(formatPrice(59.8));
  });

  it('a região da busca fica sempre no DOM, com aria-atomic, e o "Limpar busca" fica fora dela', async () => {
    const semBusca = await mountPage();
    const vazia = semBusca.wrapper.find('.admin-page__busca > p.admin-page__search-result');
    expect(vazia.attributes('role')).toBe('status');
    expect(vazia.attributes('aria-atomic')).toBe('true');
    expect(vazia.text()).toBe('');
    expect(semBusca.wrapper.findAll('button').some((b) => b.text() === 'Limpar busca')).toBe(false);

    const { wrapper, router } = await mountPage('/admin/orders?q=maria');
    const regiao = wrapper.find('.admin-page__busca > [role="status"]');
    expect(regiao.text()).toBe('1 pedido para “maria”.');
    expect(regiao.find('button').exists()).toBe(false);
    const limpar = wrapper.find('.admin-page__busca > button');
    expect(limpar.text()).toBe('Limpar busca');
    expect(limpar.classes()).toEqual(expect.arrayContaining(['btn--ghost', 'btn--sm', 'm3-botao--texto']));

    await limpar.trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.query).toEqual({});
    expect(wrapper.find('.admin-page__busca > [role="status"]').text()).toBe('');
  });

  it('pelo teclado, depois do aviso, o "Atualizar status" focado rola para a vista; pelo ponteiro, não', async () => {
    const rolar = vi.fn();
    Element.prototype.scrollIntoView = rolar;
    const { wrapper, toast } = await mountPage();
    document.body.appendChild(wrapper.element);

    // Enter no botão do pedido #2 ("Em preparo" → "A caminho"): ele continua na lista e habilitado
    const botao = updateButtons(wrapper)[1];
    botao.element.focus();
    botao.element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await botao.trigger('click');
    await flushPromises();
    expect(toast.toasts.at(-1).message).toBe('Pedido #2: A caminho.');
    expect(document.activeElement).toBe(botao.element);
    expect(rolar).toHaveBeenCalledTimes(1);
    expect(rolar.mock.contexts[0]).toBe(botao.element);
    expect(rolar).toHaveBeenCalledWith({ block: 'nearest' });

    // Pelo ponteiro, a página não pula
    rolar.mockClear();
    const outro = updateButtons(wrapper)[0];
    outro.element.focus();
    outro.element.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await outro.trigger('click');
    await flushPromises();
    expect(toast.toasts.at(-1).message).toBe('Pedido #1: Em preparo.');
    expect(rolar).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('ao sair da tela, a view tira os ouvintes da última entrada do document', async () => {
    const tirar = vi.spyOn(document, 'removeEventListener');
    const { wrapper } = await mountPage();
    wrapper.unmount();
    const tipos = tirar.mock.calls.filter(([, , captura]) => captura === true).map(([tipo]) => tipo);
    expect(tipos).toEqual(expect.arrayContaining(['pointerdown', 'keydown']));
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
