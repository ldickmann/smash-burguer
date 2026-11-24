// Peças do cabeçalho do painel (desenho do admin, §5.2): os atalhos com o selo do badge do M3 ("9+"
// acima de 9; some no 0) e aria-current="false" (o item atual é só o da coluna, §4.3); a busca com o
// rótulo escondido; o avatar com o círculo de 32 px dentro do alvo de 44; o menu do perfil com o
// "Sair" marcado por classe (a linha antes dele é CSS, sem filho no DOM).
import { afterEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter } from 'vue-router';
import NotificationBar from '@/components/admin/layout/navbar/NotificationBar.vue';
import SearchBar from '@/components/admin/layout/navbar/SearchBar.vue';
import UserProfileBar from '@/components/admin/layout/navbar/UserProfileBar.vue';

const Vazio = { render: () => null };
const stubs = { 'font-awesome-icon': { template: '<svg aria-hidden="true" />' } };

let wrapper;
afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
});

async function montarAtalhos(rota, counts) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/admin', '/admin/orders'].map((path) => ({ path, component: Vazio })),
  });
  await router.push(rota);
  const notifications = counts.map((count, i) => ({
    type: `t${i}`,
    label: `Atalho ${i}, ${count}`,
    icon: ['fas', 'bell'],
    count,
    to: { path: '/admin/orders', query: { status: i ? 'preparing' : 'pending' } },
  }));
  wrapper = mount(NotificationBar, { props: { notifications }, global: { plugins: [router], stubs } });
  await flushPromises();
  return wrapper;
}

const selos = (w) =>
  w.findAll('.navbar-notifications__item').map((item) => item.find('.navbar-notifications__count'));

describe('atalhos do cabeçalho', () => {
  it('o selo mostra o número até 9, "9+" acima, e some no 0; fica aria-hidden', async () => {
    await montarAtalhos('/admin', [0, 9, 10, 42]);
    const [zero, nove, dez, muitos] = selos(wrapper);
    expect(zero.exists()).toBe(false);
    expect(nove.text()).toBe('9');
    expect(dez.text()).toBe('9+');
    expect(muitos.text()).toBe('9+');
    expect(nove.attributes('aria-hidden')).toBe('true');
  });

  it('o nome do link leva o número exato, e não o selo', async () => {
    await montarAtalhos('/admin', [12]);
    expect(wrapper.find('a').attributes('aria-label')).toBe('Atalho 0, 12');
  });

  it('aria-current="false" vence o "page" do RouterLink, também em Pedidos com a mesma query', async () => {
    await montarAtalhos('/admin/orders?status=pending', [1, 1]);
    const links = wrapper.findAll('a');
    expect(links.map((a) => a.attributes('aria-current'))).toEqual(['false', 'false']);
    expect(links[0].attributes('href')).toBe('/admin/orders?status=pending');
  });
});

describe('busca do cabeçalho', () => {
  it('role="search", o rótulo escondido ligado ao campo e a lupa decorativa', () => {
    wrapper = mount(SearchBar, { global: { stubs } });
    expect(wrapper.attributes('role')).toBe('search');
    expect(wrapper.find('label.visually-hidden').attributes('for')).toBe('busca-admin');
    expect(wrapper.find('label').text()).toBe('Buscar produtos e pedidos');
    const campo = wrapper.find('input#busca-admin');
    expect(campo.attributes('type')).toBe('search');
    expect(campo.attributes('placeholder')).toBe('Buscar…');
    expect(wrapper.find('.navbar-search__icon').attributes('aria-hidden')).toBe('true');
  });

  it('emite search a cada digitação e submit no Enter', async () => {
    wrapper = mount(SearchBar, { global: { stubs } });
    await wrapper.find('input').setValue('bacon');
    await wrapper.find('input').trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('search').at(-1)).toEqual(['bacon']);
    expect(wrapper.emitted('submit').at(-1)).toEqual(['bacon']);
  });
});

describe('avatar e menu do perfil', () => {
  const montarPerfil = (userName = 'Admin User') => {
    wrapper = mount(UserProfileBar, { props: { userName }, attachTo: document.body, global: { stubs } });
    return wrapper;
  };

  it('o alvo é o botão; o círculo com as iniciais é um span dentro dele, aria-hidden', () => {
    montarPerfil();
    const botao = wrapper.find('button.navbar-profile__avatar');
    expect(botao.attributes('aria-label')).toBe('Menu de Admin User');
    const circulo = botao.find('span.navbar-profile__circulo');
    expect(circulo.text()).toBe('AU');
    expect(circulo.attributes('aria-hidden')).toBe('true');
  });

  it('as iniciais são duas no máximo', () => {
    montarPerfil('Maria da Silva Souza');
    expect(wrapper.find('.navbar-profile__circulo').text()).toBe('MD');
  });

  it('abre com o foco no primeiro item; o menu só tem menuitem, e o "Sair" leva a classe da linha', async () => {
    montarPerfil();
    expect(wrapper.find('.navbar-profile__menu').isVisible()).toBe(false);

    await wrapper.find('.navbar-profile__avatar').trigger('click');
    await flushPromises();

    expect(wrapper.find('.navbar-profile__menu').isVisible()).toBe(true);
    expect(wrapper.find('.navbar-profile__avatar').attributes('aria-expanded')).toBe('true');
    const menu = wrapper.find('[role="menu"]');
    const filhos = [...menu.element.children];
    expect(filhos.every((el) => el.getAttribute('role') === 'menuitem')).toBe(true);
    expect(filhos.map((el) => el.textContent.trim())).toEqual(['Meu perfil', 'Configurações', 'Sair']);
    expect(filhos.at(-1).classList.contains('navbar-profile__sair')).toBe(true);
    expect(filhos.slice(0, -1).some((el) => el.classList.contains('navbar-profile__sair'))).toBe(false);
    expect(document.activeElement?.textContent.trim()).toBe('Meu perfil');
  });
});
