// AdminLayout (desenho do admin, §4.2, §4.3, §5.1 e §9): abaixo de lg, a gaveta é um diálogo modal
// de fato (role="dialog", aria-modal e o nome; o skip link, o cabeçalho e o main ficam inert); ao
// fechar pelo Esc, pelo "Fechar" e pelo fundo, o foco volta ao "Alternar menu" só depois de o inert
// sair; na troca de rota, também só de query, o foco que estava na gaveta vai ao main. A partir de
// lg, a coluna fixa, sem papel e sem inert. Os rótulos da navegação são os do h1 (decisão do usuário,
// §12), e só um item fica atual por rota. O jsdom não implementa o inert: a ordem é provada por um
// espião no focus() do botão, e a chegada real do foco fica para o Chromium (e2e).
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';

const Vazio = { render: () => null };
const Raiz = defineComponent({ render: () => h(RouterView) });

let wrapper;

// O matchMedia do lg: a resposta fixa do teste, sem troca
function simularLargura({ desktop }) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((media) => ({
      media,
      matches: desktop,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
}

async function montar(rota, { desktop = false } = {}) {
  simularLargura({ desktop });
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/admin',
        component: AdminLayout,
        children: ['', 'products', 'orders', 'reports', 'profile', 'settings'].map((path) => ({
          path,
          component: Vazio,
        })),
      },
      { path: '/admin/login', component: Vazio },
    ],
  });
  await router.push(rota);
  await router.isReady();
  wrapper = mount(Raiz, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { template: '<svg aria-hidden="true" />' } },
    },
  });
  await flushPromises();
  return { wrapper, router };
}

const gaveta = () => wrapper.find('#admin-sidebar');
const botaoMenu = () => wrapper.find('[aria-label="Alternar menu"]');
const conjuntoInert = () => [wrapper.find('.skip-link'), wrapper.find('header.admin-header'), wrapper.find('main#conteudo')];
const comInert = () => conjuntoInert().map((el) => el.element.hasAttribute('inert'));
const itens = () => wrapper.findAll('.admin-sidebar__lista a.admin-sidebar__item');

async function abrirGaveta() {
  await botaoMenu().trigger('click');
  await flushPromises();
}

// O espião anota, no momento do focus(), se o cabeçalho ainda estava inert
function espiarFocoDoBotao() {
  const botao = botaoMenu().element;
  const chamadas = [];
  const header = wrapper.find('header.admin-header').element;
  vi.spyOn(botao, 'focus').mockImplementation(() => {
    chamadas.push({ headerInert: header.hasAttribute('inert') });
  });
  return chamadas;
}

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('AdminLayout abaixo de lg: a gaveta modal', () => {
  it('fechada ao carregar, sem inert; o contêiner é div, e não aside', async () => {
    await montar('/admin/orders');
    expect(wrapper.find('aside').exists()).toBe(false);
    expect(gaveta().element.tagName).toBe('DIV');
    expect(gaveta().isVisible()).toBe(false);
    expect(comInert()).toEqual([false, false, false]);
    expect(botaoMenu().attributes('aria-expanded')).toBe('false');
  });

  it('aberta: role="dialog", aria-modal e "Menu do painel"; o skip link, o header e o main ficam inert; o foco vai a "Painel"', async () => {
    await montar('/admin/orders');
    await abrirGaveta();

    expect(gaveta().isVisible()).toBe(true);
    expect(gaveta().attributes('role')).toBe('dialog');
    expect(gaveta().attributes('aria-modal')).toBe('true');
    expect(gaveta().attributes('aria-label')).toBe('Menu do painel');
    expect(comInert()).toEqual([true, true, true]);
    expect(wrapper.find('.admin-overlay').exists()).toBe(true);
    expect(document.activeElement?.textContent.trim()).toBe('Painel');
  });

  it('a nav "Seções do painel" envolve a marca, os destinos e o "Sair"', async () => {
    await montar('/admin');
    const nav = gaveta().find('nav[aria-label="Seções do painel"]');
    expect(nav.find('.admin-sidebar__brand').text()).toBe('Smash Burger');
    expect(nav.findAll('.admin-sidebar__lista a')).toHaveLength(4);
    expect(nav.find('.admin-sidebar__footer button[aria-label="Sair"]').exists()).toBe(true);
  });

  it('Esc fecha, e o inert sai antes do focus() no "Alternar menu"', async () => {
    await montar('/admin/orders');
    await abrirGaveta();
    const chamadas = espiarFocoDoBotao();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await flushPromises();

    expect(gaveta().isVisible()).toBe(false);
    expect(comInert()).toEqual([false, false, false]);
    expect(chamadas).toEqual([{ headerInert: false }]);
  });

  it('"Fechar" fecha, e o inert sai antes do focus() no "Alternar menu"', async () => {
    await montar('/admin/orders');
    await abrirGaveta();
    const chamadas = espiarFocoDoBotao();

    await gaveta().find('button[aria-label="Fechar"]').trigger('click');
    await flushPromises();

    expect(gaveta().isVisible()).toBe(false);
    expect(chamadas).toEqual([{ headerInert: false }]);
  });

  it('o clique no fundo fecha e devolve o foco, também depois de o inert sair', async () => {
    await montar('/admin/orders');
    await abrirGaveta();
    const chamadas = espiarFocoDoBotao();

    await wrapper.find('.admin-overlay').trigger('click');
    await flushPromises();

    expect(gaveta().isVisible()).toBe(false);
    expect(wrapper.find('.admin-overlay').exists()).toBe(false);
    expect(chamadas).toEqual([{ headerInert: false }]);
  });

  it('a troca de rota fecha a gaveta e tira o inert; o foco que estava nela vai ao main', async () => {
    const { router } = await montar('/admin/orders');
    await abrirGaveta();

    await router.push('/admin/products');
    await flushPromises();

    expect(gaveta().isVisible()).toBe(false);
    expect(comInert()).toEqual([false, false, false]);
    expect(document.activeElement).toBe(wrapper.find('main#conteudo').element);
  });

  it('a troca só de query, com o foco num link da gaveta, leva o foco ao main', async () => {
    const { router } = await montar('/admin/orders?status=pending');
    await abrirGaveta();
    const pedidos = itens().find((item) => item.text() === 'Pedidos');
    pedidos.element.focus();

    await pedidos.trigger('click');
    await flushPromises();

    expect(router.currentRoute.value.fullPath).toBe('/admin/orders');
    expect(gaveta().isVisible()).toBe(false);
    expect(comInert()).toEqual([false, false, false]);
    expect(document.activeElement).toBe(wrapper.find('main#conteudo').element);
  });

  it('a troca de rota com o foco fora da gaveta não mexe no foco', async () => {
    const { router } = await montar('/admin/orders');
    botaoMenu().element.focus();

    await router.push('/admin/products');
    await flushPromises();

    expect(document.activeElement).toBe(botaoMenu().element);
  });
});

describe('AdminLayout a partir de lg: a coluna fixa', () => {
  it('à vista, sem role, aria-modal nem nome, e nada inert', async () => {
    await montar('/admin/orders', { desktop: true });

    expect(gaveta().isVisible()).toBe(true);
    expect(gaveta().element.tagName).toBe('DIV');
    expect(gaveta().attributes('role')).toBeUndefined();
    expect(gaveta().attributes('aria-modal')).toBeUndefined();
    expect(gaveta().attributes('aria-label')).toBeUndefined();
    expect(gaveta().find('button[aria-label="Fechar"]').exists()).toBe(false);
    expect(wrapper.find('.admin-overlay').exists()).toBe(false);
    expect(comInert()).toEqual([false, false, false]);
  });

  it('o "Alternar menu" não abre gaveta nem põe inert', async () => {
    await montar('/admin/orders', { desktop: true });
    await abrirGaveta();
    expect(wrapper.find('.admin-overlay').exists()).toBe(false);
    expect(comInert()).toEqual([false, false, false]);
  });

  it('a troca de rota não move o foco pelo layout', async () => {
    const { router } = await montar('/admin/orders', { desktop: true });
    const produtos = itens().find((item) => item.text() === 'Produtos');
    produtos.element.focus();

    await router.push('/admin/orders?status=pending');
    await flushPromises();

    expect(document.activeElement).toBe(produtos.element);
  });
});

describe('navegação do painel', () => {
  it('os quatro destinos com os nomes do h1, e nenhum "Gestão de…"', async () => {
    await montar('/admin', { desktop: true });
    expect(itens().map((item) => item.text())).toEqual(['Painel', 'Produtos', 'Pedidos', 'Relatórios']);
    expect(gaveta().text()).not.toMatch(/Gestão de|Relatórios de Vendas/);
  });

  it.each([
    ['/admin', 'Painel'],
    ['/admin/products', 'Produtos'],
    ['/admin/products?q=bacon', 'Produtos'],
    ['/admin/orders', 'Pedidos'],
    ['/admin/orders?status=pending', 'Pedidos'],
    ['/admin/orders?status=preparing', 'Pedidos'],
    ['/admin/reports', 'Relatórios'],
  ])('em %s, só "%s" tem aria-current="page" na página inteira', async (rota, rotulo) => {
    await montar(rota, { desktop: true });
    const atuais = wrapper.findAll('[aria-current="page"]');
    expect(atuais.map((el) => el.text())).toEqual([rotulo]);
    expect(atuais[0].classes()).toContain('admin-sidebar__item');
  });

  it.each(['/admin/profile', '/admin/settings'])('em %s, nenhum item atual', async (rota) => {
    await montar(rota, { desktop: true });
    expect(wrapper.findAll('[aria-current="page"]')).toHaveLength(0);
  });

  it('os atalhos do cabeçalho levam aria-current="false", também na rota de Pedidos', async () => {
    await montar('/admin/orders?status=pending', { desktop: true });
    const atalhos = wrapper.findAll('.navbar-notifications__item a');
    expect(atalhos).toHaveLength(2);
    expect(atalhos.map((a) => a.attributes('aria-current'))).toEqual(['false', 'false']);
  });
});
