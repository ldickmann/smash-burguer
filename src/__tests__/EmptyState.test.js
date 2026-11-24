// EmptyState (desenho dos componentes base, §5.3): o título é um <p> (não um título de seção), o ícone
// é decorativo, e o texto e a ação só aparecem quando informados.
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import EmptyState from '../components/ui/EmptyState.vue';

const montar = (options = {}) =>
  mount(EmptyState, {
    ...options,
    global: { stubs: { 'font-awesome-icon': { template: '<svg class="fa-stub" />' } } },
  });

describe('EmptyState', () => {
  it('raiz div.empty-state sem role; ícone aria-hidden; título em <p> e nenhum h1 a h6', () => {
    const wrapper = montar({ props: { title: 'Seu carrinho está vazio' } });
    const raiz = wrapper.find('div.empty-state');

    expect(raiz.exists()).toBe(true);
    expect(raiz.attributes('role')).toBeUndefined();
    expect(wrapper.find('.empty-state__icon').attributes('aria-hidden')).toBe('true');
    expect(wrapper.find('p.empty-state__title').text()).toBe('Seu carrinho está vazio');
    expect(wrapper.find('h1, h2, h3, h4, h5, h6').exists()).toBe(false);
  });

  it('o texto só com a prop', () => {
    expect(montar({ props: { title: 'Vazio' } }).find('.empty-state__text').exists()).toBe(false);
    const comTexto = montar({ props: { title: 'Vazio', text: 'Escolha um burger.' } });
    expect(comTexto.find('p.empty-state__text').text()).toBe('Escolha um burger.');
  });

  it('o slot action vai dentro de .empty-state__action, e sem ele o bloco não existe', () => {
    expect(montar({ props: { title: 'Vazio' } }).find('.empty-state__action').exists()).toBe(false);
    const comAcao = montar({ props: { title: 'Vazio' }, slots: { action: '<a href="#/menu">Ver cardápio</a>' } });
    expect(comAcao.find('.empty-state__action a').text()).toBe('Ver cardápio');
  });
});
