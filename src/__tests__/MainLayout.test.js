// MainLayout (SPEC-material §4.3 e §5.1): o cabeçalho e o rodapé do M3 em todas as rotas da loja;
// a lista de contatos do rodapé só fora da Home (decisão g); skip link e assinatura ficam.
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';

const Vazio = { render: () => null };
const Raiz = defineComponent({ render: () => h(RouterView) });

let wrapper;

async function montar(rota) {
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: MainLayout,
        children: [
          { path: '', name: 'home', component: Vazio },
          { path: 'menu', name: 'menu', component: Vazio },
        ],
      },
    ],
  });
  await router.push(rota);
  await router.isReady();
  wrapper = mount(Raiz, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { template: '<svg aria-hidden="true" />' }, AssinaturaEncaixe: true },
    },
  });
  await flushPromises();
  return wrapper;
}

afterEach(() => wrapper?.unmount());

describe('MainLayout', () => {
  it('o cabeçalho do M3 tem a marca para "/" e a toolbar, sem o menu da Brasa', async () => {
    await montar('/menu');
    const marca = wrapper.find('header.m3-cabecalho a.m3-marca');
    expect(marca.text()).toBe('Smash Burger');
    expect(marca.attributes('href')).toBe('/');
    expect(wrapper.find('header nav[aria-label="Principal"]').exists()).toBe(true);
    expect(wrapper.find('header a.m3-fab[href="/cart"]').exists()).toBe(true);
    expect(wrapper.find('[aria-controls="menu-principal"]').exists()).toBe(false);
    expect(wrapper.find('.cart-badge').exists()).toBe(false);
  });

  it('a Home não repete a lista de contatos no rodapé (decisão g)', async () => {
    await montar('/');
    expect(wrapper.find('footer.m3-rodape').exists()).toBe(true);
    expect(wrapper.find('footer .m3-rodape__contatos').exists()).toBe(false);
  });

  it('fora da Home, o rodapé mostra a lista de horário e contato (decisão g)', async () => {
    await montar('/menu');
    expect(wrapper.find('footer .m3-rodape__contatos').exists()).toBe(true);
  });

  it('o skip link vem primeiro, e a assinatura escura logo depois do rodapé', async () => {
    await montar('/');
    const layout = wrapper.find('.main-layout').element;
    expect(layout.firstElementChild.matches('a.skip-link[href="#conteudo"]')).toBe(true);
    const rodape = wrapper.find('footer.m3-rodape').element;
    expect(rodape.nextElementSibling.tagName).toBe('ASSINATURA-ENCAIXE-STUB');
    expect(rodape.nextElementSibling.getAttribute('tom')).toBe('escuro');
  });

  it('o skip link leva o foco ao <main>', async () => {
    await montar('/');
    await wrapper.find('a.skip-link').trigger('click');
    expect(document.activeElement).toBe(wrapper.find('main#conteudo').element);
  });
});
