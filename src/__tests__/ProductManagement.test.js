import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import ProductManagement from '../views/admin/ProductManagement.vue';
import { useProductsStore } from '../stores/products';

// O modal real é testado à parte; aqui ele só devolve o que o teste mandar
const ModalStub = {
  name: 'ModalProducts',
  props: ['mode', 'product'],
  emits: ['submit', 'close', 'cancel'],
  template: '<div class="modal-stub" />',
};

const mountPage = async (path = '/admin/products') => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/admin/products', component: { template: '<div />' } }],
  });
  await router.push(path);
  const wrapper = mount(ProductManagement, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: {
        'font-awesome-icon': { template: '<svg />' },
        ModalProducts: ModalStub,
        // O <dialog> nativo não existe no jsdom: o stub só mostra o conteúdo quando aberto
        BaseDialog: { props: ['open'], template: '<div v-if="open" class="dialog-stub"><slot /><slot name="footer" /></div>' },
        ProductCard: {
          props: ['product'],
          template: '<article class="card-stub"><h2>{{ product.name }}</h2><slot name="actions" /></article>',
        },
      },
    },
  });
  return { wrapper, router, store: useProductsStore() };
};

const names = (wrapper) => wrapper.findAll('.card-stub h2').map((h) => h.text());
const selectCategory = (wrapper, value) => wrapper.find('select#categorySelect').setValue(value);
const buttonsByText = (wrapper, text) => wrapper.findAll('button').filter((b) => b.text() === text);

describe('ProductManagement', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  it('os destaques não são sorteados de novo ao trocar o filtro e voltar', async () => {
    const { wrapper } = await mountPage();
    const highlights = names(wrapper);
    expect(highlights).toHaveLength(4);

    for (const category of ['drinks', 'desserts', 'foods', '']) {
      await selectCategory(wrapper, category);
    }

    expect(names(wrapper)).toEqual(highlights);
  });

  it('editar e trocar a categoria procura o produto na categoria de origem', async () => {
    const { wrapper, store } = await mountPage();
    await selectCategory(wrapper, 'foods');
    const cocaCola = { ...store.drinks.find((p) => p.id === 2) };

    // Editar o Smash Burger (foods, id 2) e mandá-lo para Bebidas
    const edit = buttonsByText(wrapper, 'Editar')[1];
    edit.element.focus();
    await edit.trigger('click');
    const modal = wrapper.findComponent(ModalStub);
    expect(modal.props('product')).toMatchObject({ id: 2, name: 'Smash Burger' });
    modal.vm.$emit('submit', { ...modal.props('product'), category: 'drinks' });
    await flushPromises();

    expect(store.drinks.find((p) => p.id === 2)).toEqual(cocaCola);
    expect(store.drinks.at(-1)).toMatchObject({ name: 'Smash Burger', category: 'drinks' });
    expect(names(wrapper)).not.toContain('Smash Burger');
    // O "Editar" saiu da lista filtrada com o produto: o foco vai para o título
    expect(document.activeElement).toBe(wrapper.find('h1').element);
  });

  it('criar uma bebida antes de abrir o filtro de bebidas cria o produto e mostra a categoria dele', async () => {
    const { wrapper, store } = await mountPage();

    await wrapper.findAll('button').find((b) => b.text().includes('Novo produto')).trigger('click');
    wrapper.findComponent(ModalStub).vm.$emit('submit', {
      category: 'drinks',
      name: 'Mate',
      price: 6.5,
      description: '',
      image: 'data:image/png;base64,AA==',
    });
    await wrapper.vm.$nextTick();

    expect(store.drinks.at(-1)).toMatchObject({ name: 'Mate', price: 6.5 });
    expect(wrapper.find('select#categorySelect').element.value).toBe('drinks');
    expect(names(wrapper)).toContain('Mate');
  });

  it('"Excluir" pede confirmação: cancelar mantém o produto, confirmar o tira da lista e da store', async () => {
    const { wrapper, store } = await mountPage();
    await selectCategory(wrapper, 'drinks');
    const total = store.drinks.length;

    await buttonsByText(wrapper, 'Excluir')[1].trigger('click');
    expect(wrapper.find('.dialog-stub').text()).toContain('“Coca Cola Lata” sai do cardápio salvo neste navegador.');
    expect(wrapper.find('.dialog-stub').text()).toContain('Restaurar cardápio original');
    await buttonsByText(wrapper, 'Cancelar')[0].trigger('click');
    expect(wrapper.find('.dialog-stub').exists()).toBe(false);
    expect(store.drinks).toHaveLength(total);

    await buttonsByText(wrapper, 'Excluir')[1].trigger('click');
    await buttonsByText(wrapper, 'Excluir produto')[0].trigger('click');
    await flushPromises();

    expect(document.activeElement).toBe(wrapper.find('h1').element);
    expect(wrapper.find('.dialog-stub').exists()).toBe(false);
    expect(store.drinks).toHaveLength(total - 1);
    expect(store.drinks.some((p) => p.name === 'Coca Cola Lata')).toBe(false);
    expect(names(wrapper)).not.toContain('Coca Cola Lata');
  });
});
