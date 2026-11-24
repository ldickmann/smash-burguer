// QuantityStepper (desenho dos componentes base, §5.4): no limite, aria-disabled no lugar do disabled,
// para o botão continuar focável; o número troca direto, sem transição.
import { mount } from '@vue/test-utils';
import { describe, it, expect, afterEach } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';
import QuantityStepper from '../components/ui/QuantityStepper.vue';

const router = createRouter({ history: createMemoryHistory(), routes: [{ path: '/', component: { template: '<div />' } }] });

let wrapper;

const montar = (props = {}) =>
  mount(QuantityStepper, {
    attachTo: document.body,
    props: { modelValue: 2, min: 1, max: 10, label: 'Coca Cola Lata', ...props },
    global: { plugins: [router], stubs: { 'font-awesome-icon': true } },
  });

const menos = () => wrapper.find('button[aria-label="Diminuir Coca Cola Lata"]');
const mais = () => wrapper.find('button[aria-label="Aumentar Coca Cola Lata"]');

describe('QuantityStepper', () => {
  afterEach(() => {
    wrapper?.unmount();
  });

  it('grupo com "Quantidade de {label}" e os rótulos dos dois botões', () => {
    wrapper = montar();
    expect(wrapper.find('[role="group"]').attributes('aria-label')).toBe('Quantidade de Coca Cola Lata');
    expect(menos().exists()).toBe(true);
    expect(mais().exists()).toBe(true);
  });

  it('no mínimo, o (−) tem aria-disabled="true" e não tem disabled; no máximo, o (+)', () => {
    wrapper = montar({ modelValue: 1 });
    expect(menos().attributes('aria-disabled')).toBe('true');
    expect(menos().attributes('disabled')).toBeUndefined();
    expect(mais().attributes('aria-disabled')).toBeUndefined();
    wrapper.unmount();

    wrapper = montar({ modelValue: 10 });
    expect(mais().attributes('aria-disabled')).toBe('true');
    expect(mais().attributes('disabled')).toBeUndefined();
    expect(menos().attributes('aria-disabled')).toBeUndefined();
  });

  it('com o foco no (−) e cliques até o mínimo, o foco continua no mesmo botão', async () => {
    wrapper = montar({ modelValue: 2, 'onUpdate:modelValue': (valor) => wrapper.setProps({ modelValue: valor }) });
    menos().element.focus();
    await menos().trigger('click');
    expect(wrapper.props('modelValue')).toBe(1);
    expect(menos().attributes('aria-disabled')).toBe('true');
    expect(document.activeElement).toBe(menos().element);
  });

  it('o clique no limite não emite', async () => {
    wrapper = montar({ modelValue: 1 });
    await menos().trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await mais().trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[2]]);
  });

  it('o output com aria-live="polite" mostra o valor, sem <Transition> nem dígito animado', () => {
    wrapper = montar({ modelValue: 3 });
    const output = wrapper.find('output.stepper__value');
    expect(output.attributes('aria-live')).toBe('polite');
    expect(output.text()).toBe('3');
    expect(wrapper.find('.stepper__digit').exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'Transition' }).exists()).toBe(false);
  });

  it('os botões são de ícone tonais (secondary)', () => {
    wrapper = montar();
    for (const botao of [menos(), mais()]) {
      expect(botao.classes()).toEqual(expect.arrayContaining(['m3-botao--tonal', 'btn--icon-only']));
    }
  });
});
