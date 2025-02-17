import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ButtonComponent from '../components/ButtonComponent.vue';

describe('ButtonComponent', () => {
  const mockButtons = [
    { id: 1, label: 'Adicionar ao Carrinho' },
    { id: 2, label: 'Finalizar Compra', category: 'checkout' }
  ];

  it('deve renderizar botões corretamente', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        buttons: mockButtons
      }
    });

    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toBe('Adicionar ao Carrinho');
    expect(buttons[1].text()).toBe('Finalizar Compra');
  });

  it('deve emitir evento click com o botão clicado', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        buttons: mockButtons
      }
    });

    await wrapper.findAll('button')[0].trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')[0][0]).toEqual(mockButtons[0]);
  });

  it('deve emitir category-selected quando botão tem categoria', async () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        buttons: mockButtons
      }
    });

    await wrapper.findAll('button')[1].trigger('click');

    expect(wrapper.emitted('category-selected')).toBeTruthy();
    expect(wrapper.emitted('category-selected')[0][0]).toBe('checkout');
  });

  it('deve aplicar estilos personalizados', () => {
    const wrapper = mount(ButtonComponent, {
      props: {
        buttons: mockButtons,
        backgroundColor: '#ff0000',
        fontColor: '#ffffff',
        fontSize: '20px'
      }
    });

    const button = wrapper.find('button');
    const styles = button.attributes('style');

    expect(styles).toContain('background-color: rgb(255, 0, 0)');
    expect(styles).toContain('color: rgb(255, 255, 255)');
    expect(styles).toContain('font-size: 20px');
  });
});
