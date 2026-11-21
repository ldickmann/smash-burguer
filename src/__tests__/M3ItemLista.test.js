// M3ItemLista (SPEC-material §4.1): item de lista segmentada com produto e o "Adicionar" tonal, que
// na produção é o BaseButton variant="secondary" com o retorno.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import M3ItemLista from '@/components/ui/M3ItemLista.vue';
import { CHAVE_PERSONALIZAR } from '@/composables/usePersonalizar';
import { formatPrice } from '@/utils/formatters';

const PRODUTO = { id: 7, name: 'Coca Cola Lata', description: 'Lata de Coca Cola 350ml', price: 4.99, image: '/images/drinks/coca' };
const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] });

let wrapper;
afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
});

const montar = (personalizar = vi.fn(), props = {}) => {
  wrapper = mount(M3ItemLista, {
    props: { produto: PRODUTO, ...props },
    global: {
      plugins: [router],
      provide: { [CHAVE_PERSONALIZAR]: personalizar },
      stubs: { 'font-awesome-icon': { template: '<svg class="fa-stub" />' } },
    },
  });
  return personalizar;
};

describe('M3ItemLista', () => {
  it('mostra nome, descrição, apoio e preço por formatPrice; o nome é parágrafo, não título', () => {
    montar(undefined, { apoio: '7 adicionais' });
    expect(wrapper.element.tagName).toBe('LI');
    expect(wrapper.find('.m3-item__titulo').element.tagName).toBe('P');
    expect(wrapper.find('.m3-item__titulo').text()).toBe('Coca Cola Lata');
    expect(wrapper.find('.m3-item__apoio').text()).toBe('7 adicionais');
    expect(wrapper.find('.m3-item__preco').text()).toBe(formatPrice(4.99));
    expect(wrapper.find('img').attributes('alt')).toBe('Coca Cola Lata');
  });

  it('o "Adicionar" é o BaseButton tonal com o nome do produto e abre o personalizar com o contexto', async () => {
    const personalizar = montar();
    const botao = wrapper.find('button');
    expect(botao.classes()).toEqual(expect.arrayContaining(['btn--secondary', 'm3-botao--tonal']));
    expect(botao.attributes('aria-label')).toBe('Adicionar Coca Cola Lata');
    expect(botao.find('.btn__face--verso').exists()).toBe(true);

    await botao.trigger('click');
    expect(personalizar).toHaveBeenCalledTimes(1);
    const [produto, contexto] = personalizar.mock.calls[0];
    expect(produto).toBe(PRODUTO);

    // O modal confirma pelo contexto: o botão mostra o retorno sem mudar o nome
    contexto.markAdded();
    await wrapper.vm.$nextTick();
    expect(botao.classes()).toContain('is-retorno');
    expect(botao.attributes('data-adicionado')).toBe('true');
    expect(botao.attributes('aria-label')).toBe('Adicionar Coca Cola Lata');
  });
});
