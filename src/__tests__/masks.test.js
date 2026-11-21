import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FormGroup from '../components/FormGroup.vue';
import { maskCEP, maskPhone } from '../utils/masks';

describe('máscaras', () => {
  it.each([
    ['', ''],
    ['1', '(1'],
    ['11', '(11'],
    ['119', '(11) 9'],
    ['119999', '(11) 9999'],
    ['1199999', '(11) 99999'],
    ['11999999', '(11) 99999-9'],
    ['11999999999', '(11) 99999-9999'],
    ['119999999990', '(11) 99999-9999'],
  ])('celular "%s" vira "%s", sem sumir no meio da digitação', (digits, masked) => {
    expect(maskPhone(digits)).toBe(masked);
  });

  it.each([
    ['', ''],
    ['01001', '01001'],
    ['010010', '01001-0'],
    ['0100100', '01001-00'],
    ['01001000', '01001-000'],
    ['010010009', '01001-000'],
  ])('CEP "%s" vira "%s"', (digits, masked) => {
    expect(maskCEP(digits)).toBe(masked);
  });
});

describe('campo com máscara', () => {
  const mountField = (mask, modelValue = '') =>
    mount(FormGroup, {
      props: { id: mask, mask, modelValue },
      global: { stubs: { 'font-awesome-icon': { template: '<svg />' } } },
    });

  it('não guarda um dígito a mais do que mostra', async () => {
    const cep = mountField('cep', '01001000');
    const input = cep.find('input');

    await input.setValue('01001-0009');

    expect(cep.emitted('update:modelValue').at(-1)).toEqual(['01001000']);
    expect(input.element.value).toBe('01001-000');

    const phone = mountField('phone');
    await phone.find('input').setValue('(11) 99999-99990');
    expect(phone.emitted('update:modelValue').at(-1)).toEqual(['11999999999']);
  });

  it('recusa letras no teclado, mas deixa passar teclas de controle', async () => {
    const wrapper = mountField('phone');
    const input = wrapper.find('input');

    const letter = new KeyboardEvent('keypress', { key: 'a', cancelable: true });
    const digit = new KeyboardEvent('keypress', { key: '7', cancelable: true });
    const enter = new KeyboardEvent('keypress', { key: 'Enter', cancelable: true });
    for (const event of [letter, digit, enter]) input.element.dispatchEvent(event);

    expect(letter.defaultPrevented).toBe(true);
    expect(digit.defaultPrevented).toBe(false);
    expect(enter.defaultPrevented).toBe(false);
  });
});
