// M3BarraFerramentas (SPEC-material §4.1 e §5.1): a toolbar flutuante da loja, com a nav Principal
// numa pílula e o FAB do carrinho com o badge.
import { afterEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import M3BarraFerramentas from '@/components/layout/M3BarraFerramentas.vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/userStore';

const Vazio = { render: () => null };
const ICONE = { props: ['icon'], template: '<svg class="fa-stub" :data-icon="icon.join(\' \')" />' };

let wrapper;

async function montar(rota = '/', { sessao = false } = {}) {
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  if (sessao) useUserStore().$patch({ isAuthenticated: true, user: { firstName: 'Maria' } });
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/menu', '/login', '/profile', '/cart'].map((path) => ({ path, component: Vazio })),
  });
  await router.push(rota);
  await router.isReady();
  wrapper = mount(M3BarraFerramentas, {
    props: { inicio: '/' },
    global: { plugins: [pinia, router], stubs: { 'font-awesome-icon': ICONE } },
  });
  await flushPromises();
  return wrapper;
}

const nav = () => wrapper.find('nav[aria-label="Principal"]');
const fab = () => wrapper.find('a.m3-fab');

afterEach(() => wrapper?.unmount());

describe('M3BarraFerramentas', () => {
  it('a nav tem Início, Cardápio e Entrar, cada um com ícone por nome e rótulo', async () => {
    await montar('/');
    const links = nav().findAll('a');
    expect(links.map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(links.map((a) => a.attributes('href'))).toEqual(['/', '/menu', '/login']);
    expect(links.map((a) => a.find('.fa-stub').attributes('data-icon'))).toEqual(['fas house', 'fas utensils', 'fas user']);
  });

  it('com sessão, Perfil no lugar de Entrar', async () => {
    await montar('/', { sessao: true });
    expect(nav().findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Perfil']);
  });

  it('só o item da rota atual tem aria-current="page"', async () => {
    await montar('/menu');
    expect(nav().findAll('a[aria-current="page"]').map((a) => a.text())).toEqual(['Cardápio']);
  });

  it('a ordem do Tab é a nav e depois o carrinho', async () => {
    await montar('/');
    expect(wrapper.findAll('a').map((a) => a.attributes('href'))).toEqual(['/', '/menu', '/login', '/cart']);
  });

  it('o FAB se chama pelo contador, e o badge é aria-hidden', async () => {
    await montar('/');
    expect(fab().attributes('aria-label')).toBe('Carrinho, vazio');
    expect(fab().find('.m3-badge').exists()).toBe(false);

    useCartStore().$patch({ items: [{ id: 1, quantity: 2 }] });
    await flushPromises();
    expect(fab().attributes('aria-label')).toBe('Carrinho, 2 itens');
    const badge = fab().find('.m3-badge');
    expect(badge.attributes('aria-hidden')).toBe('true');
    expect(badge.text()).toBe('2');
  });

  it('o badge mostra "99+" a partir de 100 itens', async () => {
    await montar('/');
    useCartStore().$patch({ items: [{ id: 1, quantity: 100 }] });
    await flushPromises();
    expect(fab().find('.m3-badge').text()).toBe('99+');
    expect(fab().attributes('aria-label')).toBe('Carrinho, 100 itens');
  });
});
