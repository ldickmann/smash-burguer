import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createApp } from 'vue';
import { createPinia, setActivePinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persistedstate';
import { createRouter, createMemoryHistory } from 'vue-router';
import router from '../router';
import TheNavbarAdmin from '../components/admin/layout/TheNavbarAdmin.vue';
import UserProfileBar from '../components/admin/layout/navbar/UserProfileBar.vue';
import { useCartStore } from '../stores/cart';
import { useUserStore } from '../stores/userStore';
import { useAdminStore } from '../stores/adminStore';

const CART_KEY = 'smash-burger:cart:v1';
const SESSION_KEY = 'smash-burger:session';

const USER = {
  firstName: 'Maria',
  lastName: 'Silva',
  email: 'maria@example.com',
  phone: '47999999999',
  CEP: '88370000',
  address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC' },
};

// Cheese Bacon com 1 bacon, como o app grava
const BURGER = {
  productId: 1,
  category: 'foods',
  name: 'Cheese Bacon',
  image: '/images/foods/cheese-bacon',
  unitPrice: 25.99 + 3.5,
  quantity: 1,
  removedIngredients: ['Tomate'],
  additionals: [{ name: 'Bacon', price: 3.5, quantity: 1 }],
  observation: '',
};

const ORDER = {
  id: 1001,
  date: '2026-11-20T18:00:00.000Z',
  status: 'Recebido',
  items: [BURGER],
  total: BURGER.unitPrice,
  paymentMethod: 'PIX',
  address: { ...USER.address, CEP: USER.CEP },
};

const session = (changes = {}) => ({
  user: USER,
  isAuthenticated: true,
  orderHistory: [ORDER],
  lastOrderId: 1001,
  nextOrderId: 1002,
  ...changes,
});

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const saved = (key) => JSON.parse(localStorage.getItem(key));

// O plugin de persistência só roda com a Pinia instalada num app
const loadPinia = () => {
  const pinia = createPinia().use(piniaPersist);
  createApp({}).use(pinia);
  setActivePinia(pinia);
  return pinia;
};

describe('estado salvo no localStorage', () => {
  beforeEach(() => localStorage.clear());

  afterEach(() => vi.restoreAllMocks());

  describe('carrinho', () => {
    it('com items que não é lista, começa vazio e as contas não quebram', () => {
      save(CART_KEY, { items: 'x' });
      loadPinia();

      const cart = useCartStore();

      expect(cart.items).toEqual([]);
      expect(cart.itemCount).toBe(0);
      expect(cart.subtotal).toBe(0);
      expect(saved(CART_KEY)).toEqual({ items: [] });
    });

    it('preço editado volta ao do cardápio, e a linha fora do cardápio sai', () => {
      save(CART_KEY, {
        items: [
          { ...BURGER, unitPrice: -500 },
          { ...BURGER, productId: 99 },
          { ...BURGER, image: 7 },
        ],
      });
      loadPinia();

      const cart = useCartStore();

      expect(cart.items).toHaveLength(2);
      expect(cart.subtotal).toBeCloseTo(2 * 29.49);
      expect(cart.items.every((item) => item.image === BURGER.image)).toBe(true);
      expect(localStorage.getItem(CART_KEY)).not.toContain('-500');
      expect(saved(CART_KEY).items).toHaveLength(2);
    });

    it('um carrinho que bate com o cardápio não é regravado', () => {
      const raw = JSON.stringify({ items: [BURGER] });
      localStorage.setItem(CART_KEY, raw);
      loadPinia();

      expect(useCartStore().itemCount).toBe(1);
      expect(localStorage.getItem(CART_KEY)).toBe(raw);
    });
  });

  describe('sessão do cliente', () => {
    beforeEach(() => {
      // O scrollBehavior chama window.scrollTo, que o jsdom não implementa
      vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    });

    it('com o histórico em null, abrir a confirmação volta ao cardápio sem erro', async () => {
      save(SESSION_KEY, session({ orderHistory: null }));
      loadPinia();
      await router.push('/');

      await router.push('/confirmation');

      expect(router.currentRoute.value.path).toBe('/menu');
      expect(useUserStore().orderHistory).toEqual([]);
    });

    it('com o pedido salvo, a confirmação abre', async () => {
      save(SESSION_KEY, session());
      loadPinia();
      await router.push('/');

      await router.push('/confirmation');

      expect(router.currentRoute.value.path).toBe('/confirmation');
    });

    it('pedido fora do formato sai do histórico, e o próximo número não repete um existente', () => {
      save(
        SESSION_KEY,
        session({
          orderHistory: [
            { ...ORDER, id: 1005 },
            { ...ORDER, id: 1006, items: null },
            { ...ORDER, id: 1007, items: [{ ...BURGER, quantity: 'muitos' }] },
            { ...ORDER, id: 1008, date: 'ontem' },
            { ...ORDER, id: 1009, total: '10' },
            'pedido',
          ],
          nextOrderId: 1002,
        })
      );
      loadPinia();

      const store = useUserStore();

      expect(store.orderHistory.map((order) => order.id)).toEqual([1005]);
      expect(store.nextOrderId).toBe(1006);
      expect(saved(SESSION_KEY).orderHistory).toHaveLength(1);
    });

    it('tipos trocados no perfil viram texto vazio; sem perfil, a sessão não vale', () => {
      save(SESSION_KEY, session({ user: { ...USER, CEP: 88370000, address: 'x' } }));
      loadPinia();

      expect(useUserStore().user).toMatchObject({ CEP: '', address: { street: '' } });

      localStorage.clear();
      save(SESSION_KEY, session({ user: 'Maria', lastOrderId: '1001', nextOrderId: -5 }));
      loadPinia();

      const store = useUserStore();
      expect(store.isAuthenticated).toBe(false);
      expect(store.user).toBeNull();
      expect(store.lastOrderId).toBeNull();
      expect(store.nextOrderId).toBe(1002);
    });

    it('uma sessão no formato certo não é regravada', () => {
      const raw = JSON.stringify(session());
      localStorage.setItem(SESSION_KEY, raw);
      loadPinia();

      expect(useUserStore().orderHistory).toHaveLength(1);
      expect(localStorage.getItem(SESSION_KEY)).toBe(raw);
    });
  });

  describe('sessão do painel', () => {
    const ADMIN = { firstName: 'Admin', lastName: 'User', email: 'admin@example.com', password: 'Demo1234', role: 'admin' };

    it('admin que não é objeto derruba a sessão do painel', () => {
      save('admin', { admin: 'x', isAuthenticated: true });
      loadPinia();

      const store = useAdminStore();

      expect(store.admin).toBeNull();
      expect(store.isAuthenticated).toBe(false);
      expect(saved('admin')).toMatchObject({ admin: null, isAuthenticated: false });
    });

    it('o cadastro que o createAdmin.html grava na mesma chave fica como está', () => {
      const raw = JSON.stringify(ADMIN);
      localStorage.setItem('admin', raw);
      loadPinia();

      expect(useAdminStore().isAuthenticated).toBe(false);
      expect(localStorage.getItem('admin')).toBe(raw);
    });

    it('nome do admin que não é texto não quebra a barra do painel', () => {
      save('admin', { admin: { ...ADMIN, name: 5, firstName: ['A'] }, isAuthenticated: true });
      const pinia = loadPinia();
      const memoryRouter = createRouter({
        history: createMemoryHistory(),
        routes: [{ path: '/', component: { template: '<div />' } }],
      });

      const wrapper = shallowMount(TheNavbarAdmin, { global: { plugins: [pinia, memoryRouter] } });

      expect(wrapper.findComponent(UserProfileBar).props('userName')).toBe('User');
    });
  });
});
