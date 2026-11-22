// Cardápio no M3 (docs/direcoes/desenho/cardapio.md, §5.1 a §5.4 e §9): cabeçalho de texto sem o
// banner, grupo de categorias com rádios nativos, região da grade nomeada por um h2 escondido, grade de
// M3CartaoLanche comuns e o EmptyState na categoria vazia. O "Adicionar" abre o modal Personalizar da
// MenuView (provide do personalizar); ao confirmar, o card de origem mostra o retorno "Adicionado" e a
// região viva anuncia (SPEC-material §7.6). O <dialog> nativo não existe no jsdom: o modal vira stub, e
// o retorno do foco é conferido no navegador (flow.mjs).
import { afterEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { CATEGORIES, useProductsStore } from '@/stores/products';
import { useAnnouncer } from '@/composables/useAnnouncer';
import { CATEGORIAS } from '@/utils/textosLoja';
import MenuView from '@/views/MenuView.vue';
import ModalAdditional from '@/components/ModalAdditional.vue';

function prepararNavegador() {
  window.matchMedia ??= (consulta) => ({
    matches: false,
    media: consulta,
    addEventListener() {},
    removeEventListener() {},
  });
  globalThis.IntersectionObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

let wrapper;
afterEach(() => wrapper?.unmount());

async function montarCardapio({ vazias = [] } = {}) {
  prepararNavegador();
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  const produtos = useProductsStore();
  for (const categoria of vazias) {
    produtos.menuItems = { ...produtos.menuItems, [categoria]: [] };
  }
  wrapper = mount(MenuView, {
    attachTo: document.body,
    global: {
      plugins: [pinia],
      stubs: {
        'font-awesome-icon': { template: '<svg aria-hidden="true" />' },
        ModalAdditional: true,
      },
    },
  });
  await flushPromises();
  return { produtos };
}

const marcar = async (valor) => {
  const radio = wrapper.find(`input[type="radio"][value="${valor}"]`);
  radio.element.checked = true;
  await radio.trigger('change');
  await flushPromises();
};
const nomesAdicionar = () =>
  wrapper.findAll('button[aria-label^="Adicionar "]').map((b) => b.attributes('aria-label').replace(/^Adicionar /, ''));
const regiao = () => wrapper.find('section.menu-page__regiao');

describe('MenuView (Cardápio do Material 3)', () => {
  it('tem um h1 só, "Cardápio", com a frase, e nenhuma imagem do banner', async () => {
    await montarCardapio();
    const titulos = wrapper.findAll('h1');
    expect(titulos).toHaveLength(1);
    expect(titulos[0].text()).toBe('Cardápio');
    expect(wrapper.find('.menu-page__cabecalho .menu-page__frase').text()).toBe('Escolha, personalize e peça.');
    expect(wrapper.html()).not.toContain('banner-burger-black');
    expect(wrapper.find('.banner').exists()).toBe(false);
  });

  it('um rádio por categoria, com "Hambúrgueres" marcado ao abrir', async () => {
    await montarCardapio();
    const radios = wrapper.findAll('.category-tabs input[type="radio"]');
    expect(radios.map((r) => r.element.value)).toEqual(CATEGORIAS.map((c) => c.chave));
    expect(wrapper.findAll('.category-tabs label').map((l) => l.text())).toEqual(CATEGORIAS.map((c) => c.rotulo));
    expect(wrapper.find('input[type="radio"]:checked').element.value).toBe('foods');
    expect(wrapper.find('[aria-pressed]').exists()).toBe(false);
  });

  it('o h2 escondido nomeia a região da grade e muda com a categoria', async () => {
    await montarCardapio();
    const titulo = wrapper.find('#menu-categoria-titulo');
    expect(titulo.element.tagName).toBe('H2');
    expect(titulo.classes()).toContain('visually-hidden');
    expect(regiao().attributes('aria-labelledby')).toBe('menu-categoria-titulo');
    expect(titulo.text()).toBe('Hambúrgueres');

    await marcar('drinks');
    expect(wrapper.find('#menu-categoria-titulo').text()).toBe('Bebidas');
    expect(nomesAdicionar()).toEqual(['Copo de Refrigerante', 'Coca Cola Lata', 'Suco de Abacaxi']);
  });

  it('um "Adicionar <nome>" por card da categoria, só de produto real, na ordem do JSON', async () => {
    const { produtos } = await montarCardapio();
    expect(nomesAdicionar()).toEqual(produtos.foods.map((p) => p.name));
    const cards = regiao().findAll('ul.menu-page__grade > li > article.m3-cartao');
    expect(cards).toHaveLength(produtos.foods.length);
    // Card comum, sem destaque, com o nome em h3 (o h2 é o da região)
    expect(regiao().find('.m3-cartao--destaque').exists()).toBe(false);
    expect(cards[0].find('h3').text()).toBe('Cheese Bacon');

    await marcar('desserts');
    expect(nomesAdicionar()).toEqual(produtos.desserts.map((p) => p.name));
  });

  it('a categoria vazia mostra o EmptyState, ainda dentro da região nomeada', async () => {
    await montarCardapio({ vazias: ['desserts'] });
    await marcar('desserts');
    expect(regiao().find('ul').exists()).toBe(false);
    expect(regiao().find('.empty-state').exists()).toBe(true);
    expect(regiao().text()).toContain('Nada nesta categoria por enquanto');
    expect(regiao().text()).toContain('Dê uma olhada nas outras categorias.');
    expect(wrapper.find('#menu-categoria-titulo').text()).toBe('Sobremesas');
  });

  it('a folha aberta fecha ao trocar de categoria (os ids se repetem entre as categorias)', async () => {
    await montarCardapio();
    const tras = wrapper.find('button[aria-label="Ingredientes de Cheese Bacon"]');
    await tras.trigger('click');
    expect(tras.attributes('aria-expanded')).toBe('true');

    // Pelo teclado, a seta troca a categoria sem clique fora do card
    await marcar('desserts');
    expect(wrapper.find('button[aria-label="Ingredientes de Sorvete de Pote"]').attributes('aria-expanded')).toBe('false');

    await marcar('foods');
    expect(wrapper.find('button[aria-label="Ingredientes de Cheese Bacon"]').attributes('aria-expanded')).toBe('false');
  });

  it('"Adicionar" abre o modal Personalizar com o produto; ao confirmar, o card mostra "Adicionado" e a região viva anuncia', async () => {
    await montarCardapio();
    const modal = wrapper.findComponent(ModalAdditional);
    expect(modal.props('open')).toBe(false);
    await wrapper.find('button[aria-label="Adicionar Cheese Bacon"]').trigger('click');
    expect(modal.props('open')).toBe(true);
    expect(modal.props('product').name).toBe('Cheese Bacon');

    modal.vm.$emit('confirm', {
      productId: 1,
      category: 'foods',
      name: 'Cheese Bacon',
      image: '/images/foods/cheese-bacon',
      unitPrice: 25.99,
      quantity: 2,
      removedIngredients: [],
      additionals: [],
      observation: '',
    });
    await flushPromises();
    expect(modal.props('open')).toBe(false);
    expect(wrapper.find('button[aria-label="Adicionar Cheese Bacon"]').attributes('data-adicionado')).toBe('true');
    expect(wrapper.find('button[aria-label="Adicionar Smash Burger"]').attributes('data-adicionado')).toBeUndefined();
    expect(useAnnouncer().message.value).toBe('Cheese Bacon adicionado ao carrinho. 2 itens no carrinho.');
  });

  it('as categorias do grupo são as do cardápio (CATEGORIES da store)', async () => {
    await montarCardapio();
    expect(CATEGORIAS.map((c) => c.chave)).toEqual([...CATEGORIES]);
  });
});
