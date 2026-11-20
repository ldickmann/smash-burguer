import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import ProductManagement from '../views/admin/ProductManagement.vue';
import { useProductsStore } from '../stores/products';

// O modal real é testado à parte; aqui ele só devolve o que o teste mandar
const ModalStub = {
  name: 'ModalProducts',
  props: ['mode', 'product'],
  emits: ['submit', 'close', 'cancel'],
  template: '<div class="modal-stub" />',
};

const mountPage = () => {
  const pinia = createPinia();
  setActivePinia(pinia);
  const wrapper = mount(ProductManagement, {
    global: {
      plugins: [pinia],
      stubs: {
        'font-awesome-icon': { template: '<svg />' },
        ModalProducts: ModalStub,
        ProductCard: {
          props: ['product'],
          template: '<article class="card-stub"><h2>{{ product.name }}</h2><slot name="actions" /></article>',
        },
      },
    },
  });
  return { wrapper, store: useProductsStore() };
};

const names = (wrapper) => wrapper.findAll('.card-stub h2').map((h) => h.text());
const selectCategory = (wrapper, value) => wrapper.find('select#categorySelect').setValue(value);
const buttonsByText = (wrapper, text) => wrapper.findAll('button').filter((b) => b.text() === text);

describe('ProductManagement', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('os destaques não são sorteados de novo ao trocar o filtro e voltar', async () => {
    const { wrapper } = mountPage();
    const highlights = names(wrapper);
    expect(highlights).toHaveLength(4);

    for (const category of ['drinks', 'desserts', 'foods', '']) {
      await selectCategory(wrapper, category);
    }

    expect(names(wrapper)).toEqual(highlights);
  });

  it('editar e trocar a categoria procura o produto na categoria de origem', async () => {
    const { wrapper, store } = mountPage();
    await selectCategory(wrapper, 'foods');
    const cocaCola = { ...store.drinks.find((p) => p.id === 2) };

    // Editar o Smash Burger (foods, id 2) e mandá-lo para Bebidas
    await buttonsByText(wrapper, 'Editar')[1].trigger('click');
    const modal = wrapper.findComponent(ModalStub);
    expect(modal.props('product')).toMatchObject({ id: 2, name: 'Smash Burger' });
    modal.vm.$emit('submit', { ...modal.props('product'), category: 'drinks' });
    await wrapper.vm.$nextTick();

    expect(store.drinks.find((p) => p.id === 2)).toEqual(cocaCola);
    expect(store.drinks.at(-1)).toMatchObject({ name: 'Smash Burger', category: 'drinks' });
    expect(names(wrapper)).not.toContain('Smash Burger');
  });

  it('criar uma bebida antes de abrir o filtro de bebidas cria o produto e mostra a categoria dele', async () => {
    const { wrapper, store } = mountPage();

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
});
