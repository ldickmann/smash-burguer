import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import { createRouter, createMemoryHistory } from 'vue-router';
import OrderManagement from '../views/admin/OrderManagement.vue';
import ProductManagement from '../views/admin/ProductManagement.vue';
import AdminSettings from '../views/admin/AdminSettings.vue';
import AdminProfile from '../views/admin/AdminProfile.vue';
import TheNavbarAdmin from '../components/admin/layout/TheNavbarAdmin.vue';
import { CATALOG_VERSION, UPLOAD_BUDGET, useProductsStore } from '../stores/products';
import { useAdminOrdersStore } from '../stores/adminOrders';
import { useAdminStore } from '../stores/adminStore';
import { useToastStore } from '../stores/toast';
import productsData from '../json/products.json';

const CATALOG_KEY = 'smash-burger:catalog';
const ORDERS_KEY = 'smash-burger:admin-orders';
const PNG = 'data:image/png;base64,iVBORw0KGgo=';

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const saved = (key) => JSON.parse(localStorage.getItem(key));

// Pinia com o plugin de persistência, como no app (ele só roda com um app instalado)
const loadPinia = () => {
  const pinia = createPinia().use(piniaPersist);
  createApp({}).use(pinia);
  setActivePinia(pinia);
  return pinia;
};

const ADMIN_ROUTES = ['/admin', '/admin/products', '/admin/orders', '/admin/reports', '/admin/profile', '/admin/settings', '/admin/login'];

const mountAdmin = async (component, path) => {
  const pinia = loadPinia();
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ADMIN_ROUTES.map((p) => ({ path: p, component: { template: '<div />' } })),
  });
  await router.push(path);
  const wrapper = mount(component, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: {
        'font-awesome-icon': { template: '<svg />' },
        BaseDialog: { props: ['open', 'title'], template: '<div v-if="open" class="dialog-stub"><h2>{{ title }}</h2><slot /><slot name="footer" /></div>' },
        ModalProducts: { name: 'ModalProducts', props: ['mode', 'product'], emits: ['submit', 'close', 'cancel'], template: '<div class="modal-stub" />' },
        ProductCard: { props: ['product'], template: '<article class="card-stub"><h2>{{ product.name }}</h2><slot name="actions" /></article>' },
      },
    },
  });
  return { wrapper, router };
};

const buttonByText = (wrapper, text) => wrapper.findAll('button').find((b) => b.text() === text);
const names = (wrapper) => wrapper.findAll('.card-stub h2').map((h) => h.text());

describe('cardápio salvo pelo painel', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('o que o painel cria, edita e exclui volta ao recarregar a página', () => {
    loadPinia();
    const store = useProductsStore();
    store.addProduct({ category: 'drinks', name: 'Mate', price: 6.5, description: '', image: PNG, quantity: null });
    store.updateProduct('foods', 2, { price: 23.9 });
    store.removeProduct('desserts', 1);
    store.$persist();

    loadPinia();
    const reloaded = useProductsStore();
    expect(reloaded.drinks.at(-1)).toMatchObject({ name: 'Mate', price: 6.5, image: PNG });
    expect(reloaded.foods.find((p) => p.id === 2).price).toBe(23.9);
    expect(reloaded.desserts).toEqual([]);
  });

  it('produto salvo fora do formato sai: preço inválido, imagem de outro tipo, id repetido', () => {
    const drinks = productsData.menuItems.drinks;
    save(CATALOG_KEY, {
      catalogVersion: CATALOG_VERSION,
      lastIds: { drinks: 'x' },
      menuItems: {
        combos: [{ id: 1 }],
        drinks: [
          ...drinks,
          { ...drinks[0], id: 10, price: -5 },
          { ...drinks[0], id: 11, image: 'data:text/html;base64,PGh0bWw+' },
          { ...drinks[0], id: 12, image: 'javascript:alert(1)' },
          { ...drinks[0], id: 13, name: '' },
          { ...drinks[0], id: 1, name: 'Repetido' },
          { ...drinks[0], id: 14, category: 'foods' },
        ],
      },
    });
    loadPinia();

    const store = useProductsStore();
    expect(store.drinks).toEqual(drinks);
    expect(store.lastIds).toEqual({});
    expect(saved(CATALOG_KEY).menuItems).toEqual({ drinks });
  });

  it('com o cardápio publicado mudado, as alterações salvas dão lugar a ele, sem reaproveitar ids', () => {
    save(CATALOG_KEY, {
      catalogVersion: 'versao-antiga',
      lastIds: { drinks: 9 },
      menuItems: { drinks: [{ ...productsData.menuItems.drinks[0], price: 1 }] },
    });
    loadPinia();

    const store = useProductsStore();
    expect(store.drinks).toEqual(productsData.menuItems.drinks);
    expect(store.addProduct({ category: 'drinks', name: 'Mate', price: 6.5, image: PNG }).id).toBe(10);
  });

  it('restaurar o cardápio volta ao publicado, e o id de um produto apagado não volta', () => {
    loadPinia();
    const store = useProductsStore();
    const created = store.addProduct({ category: 'drinks', name: 'Mate', price: 6.5, image: PNG });

    store.resetCatalog();

    expect(store.drinks).toEqual(productsData.menuItems.drinks);
    expect(store.addProduct({ category: 'drinks', name: 'Chá', price: 5, image: PNG }).id).toBe(created.id + 1);
  });

  it('o espaço das imagens enviadas tem limite, e a imagem trocada sai da conta', () => {
    loadPinia();
    const store = useProductsStore();
    const half = `data:image/png;base64,${'A'.repeat(UPLOAD_BUDGET / 2)}`;
    const created = store.addProduct({ category: 'drinks', name: 'Mate', price: 6.5, image: half });

    expect(store.fitsUploadBudget(half)).toBe(false);
    expect(store.fitsUploadBudget(half, created)).toBe(true);
    expect(store.fitsUploadBudget('/images/drinks/suco-abacaxi')).toBe(true);
  });
});

describe('pedidos salvos pelo painel', () => {
  beforeEach(() => localStorage.clear());

  it('o status atualizado volta ao recarregar; Configurações restaura os de exemplo', () => {
    loadPinia();
    useAdminOrdersStore().advanceStatus(1);
    useAdminOrdersStore().$persist();

    loadPinia();
    const store = useAdminOrdersStore();
    expect(store.orders[0].status).toBe('preparing');

    store.resetOrders();
    expect(store.orders[0].status).toBe('pending');
  });

  it('pedido salvo fora do formato sai, e o que não é lista volta aos de exemplo', () => {
    loadPinia();
    const sample = useAdminOrdersStore().orders.map((order) => ({ ...order }));
    save(ORDERS_KEY, { orders: [sample[0], { ...sample[1], status: 'perdido' }, { id: 3 }] });
    loadPinia();
    expect(useAdminOrdersStore().orders).toEqual([sample[0]]);

    save(ORDERS_KEY, { orders: 'x' });
    loadPinia();
    expect(useAdminOrdersStore().orders).toEqual(sample);
  });
});

describe('telas do painel', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('a busca (?q=) acha produtos de qualquer categoria, sem diferença de acento, e "Limpar busca" a tira', async () => {
    const { wrapper, router } = await mountAdmin(ProductManagement, '/admin/products?q=COCA');
    expect(names(wrapper)).toEqual(['Coca Cola Lata']);
    expect(wrapper.find('[role="status"]').text()).toContain('1 produto para “COCA”.');

    await router.replace('/admin/products?q=hamburguer%20de%20soja');
    expect(names(wrapper)).toEqual(['Veggie Burger']);

    await router.replace('/admin/products?q=xyz');
    expect(wrapper.find('.empty-state').text()).toContain('Nenhum produto encontrado');

    await buttonByText(wrapper, 'Limpar busca').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.query).toEqual({});
    expect(names(wrapper)).toHaveLength(4);
  });

  it('pedidos: a busca acha pelo cliente, pelo número e pelo item; "Detalhes" mostra o pedido', async () => {
    const { wrapper, router } = await mountAdmin(OrderManagement, '/admin/orders?q=maria');
    expect(wrapper.findAll('.orders-list > li')).toHaveLength(1);
    expect(wrapper.text()).toContain('Maria de Souza');

    await router.replace('/admin/orders?q=%231');
    expect(wrapper.findAll('.orders-list > li')).toHaveLength(1);
    await router.replace('/admin/orders?q=abacaxi&status=pending');
    expect(wrapper.find('.empty-state').text()).toContain('Nenhum pedido encontrado');

    await router.replace('/admin/orders');
    await buttonByText(wrapper, 'Detalhes').trigger('click');
    const dialog = wrapper.find('.dialog-stub');
    expect(dialog.find('h2').text()).toBe('Pedido #1');
    expect(dialog.text()).toContain('João da Silva');
    expect(dialog.text()).toContain('Rua dos Bobos, 0');
    expect(dialog.text().replace(/\s+/g, ' ')).toContain('2× Smash Burger');
    expect(dialog.text()).toContain('Pendente');

    await buttonByText(wrapper, 'Fechar').trigger('click');
    expect(wrapper.find('.dialog-stub').exists()).toBe(false);
  });

  it('a busca da barra leva a Produtos no Enter fora de Produtos e Pedidos, e o menu de perfil abre as telas', async () => {
    const { wrapper, router } = await mountAdmin(TheNavbarAdmin, '/admin');

    // Digitar não troca de página (o foco sairia do campo); o Enter leva a Produtos
    await wrapper.find('#busca-admin').setValue('coca');
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/admin');
    await wrapper.find('#busca-admin').trigger('keydown', { key: 'Enter' });
    await flushPromises();
    expect(router.currentRoute.value.fullPath).toBe('/admin/products?q=coca');

    // Texto digitado sem Enter numa tela sem busca não fica no campo ao trocar de página
    await router.push('/admin');
    await wrapper.find('#busca-admin').setValue('burger');
    await router.push('/admin/orders?status=pending');
    await flushPromises();
    expect(wrapper.find('#busca-admin').element.value).toBe('');

    await wrapper.find('#busca-admin').setValue('maria');
    await flushPromises();
    expect(router.currentRoute.value.query).toEqual({ status: 'pending', q: 'maria' });

    await wrapper.find('#busca-admin').setValue('');
    await flushPromises();
    expect(router.currentRoute.value.query).toEqual({ status: 'pending' });

    await wrapper.find('.navbar-profile__avatar').trigger('click');
    await wrapper.findAll('[role="menuitem"]').find((item) => item.text() === 'Configurações').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/admin/settings');

    await wrapper.find('.navbar-profile__avatar').trigger('click');
    await wrapper.findAll('[role="menuitem"]').find((item) => item.text() === 'Meu perfil').trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/admin/profile');
  });

  it('Configurações restaura o cardápio e os pedidos, depois da confirmação', async () => {
    const { wrapper } = await mountAdmin(AdminSettings, '/admin/settings');
    const products = useProductsStore();
    const orders = useAdminOrdersStore();
    products.addProduct({ category: 'drinks', name: 'Mate', price: 6.5, image: PNG });
    orders.advanceStatus(1);

    await buttonByText(wrapper, 'Restaurar cardápio original').trigger('click');
    expect(wrapper.find('.dialog-stub h2').text()).toBe('Restaurar o cardápio original?');
    await buttonByText(wrapper, 'Cancelar').trigger('click');
    expect(products.drinks.some((p) => p.name === 'Mate')).toBe(true);

    await buttonByText(wrapper, 'Restaurar cardápio original').trigger('click');
    await buttonByText(wrapper, 'Restaurar').trigger('click');
    expect(products.drinks).toEqual(productsData.menuItems.drinks);

    await buttonByText(wrapper, 'Restaurar pedidos de exemplo').trigger('click');
    await buttonByText(wrapper, 'Restaurar').trigger('click');
    expect(orders.orders[0].status).toBe('pending');
    expect(useToastStore().toasts.map((t) => t.message)).toEqual(['Cardápio original restaurado.', 'Pedidos de exemplo restaurados.']);
  });

  it('Meu perfil mostra o admin logado e sai do painel', async () => {
    const { wrapper, router } = await mountAdmin(AdminProfile, '/admin/profile');
    const admin = useAdminStore();
    admin.setAdmin({ firstName: 'Gerente', lastName: 'Teste', email: 'gerente@example.com', role: 'admin' });
    await flushPromises();

    expect(wrapper.text()).toContain('Gerente Teste');
    expect(wrapper.text()).toContain('gerente@example.com');

    await buttonByText(wrapper, 'Sair').trigger('click');
    await flushPromises();
    expect(admin.isAuthenticated).toBe(false);
    expect(router.currentRoute.value.path).toBe('/admin/login');
  });
});
