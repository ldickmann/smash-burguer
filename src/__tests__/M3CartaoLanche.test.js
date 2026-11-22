// M3CartaoLanche (SPEC-material §4.1 e §10.3): no destaque, atrás da foto no cookie, uma camada
// decorativa com o mesmo cookie, em primary e um pouco maior, deixa os 12 lobos à vista mesmo com o
// prato claro da foto encostando no fundo do card. O card comum não tem a camada.
import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { CHAVE_PERSONALIZAR } from '@/composables/usePersonalizar';
import M3CartaoLanche from '@/components/M3CartaoLanche.vue';

const PRODUTO = {
  id: 1,
  name: 'Smash Burger',
  description: 'Hambúrguer artesanal',
  price: 22.5,
  image: '/images/foods/smash-burger',
  ingredients: ['Pão', 'Carne'],
};

let wrapper;
afterEach(() => wrapper?.unmount());

const montar = (props) =>
  (wrapper = mount(M3CartaoLanche, {
    props: { produto: PRODUTO, ...props },
    global: {
      provide: { [CHAVE_PERSONALIZAR]: () => {} },
      stubs: { 'font-awesome-icon': { template: '<svg aria-hidden="true" />' } },
    },
  }));

describe('M3CartaoLanche', () => {
  it('no destaque, a camada dos lobos fica atrás da foto no cookie, decorativa (§10.3)', () => {
    montar({ destaque: true });
    const cookie = wrapper.find('.m3-cartao__cookie');
    expect(cookie.exists()).toBe(true);
    const [camada, foto] = cookie.element.children;
    expect(camada.classList.contains('m3-cartao__lobos')).toBe(true);
    expect(camada.getAttribute('aria-hidden')).toBe('true');
    expect(camada.textContent).toBe('');
    expect(foto.classList.contains('m3-foto--cookie')).toBe(true);
  });

  it('o card comum não tem a camada, e a foto fica direto no card', () => {
    montar();
    expect(wrapper.find('.m3-cartao__lobos').exists()).toBe(false);
    expect(wrapper.find('.m3-cartao__cookie').exists()).toBe(false);
    expect(wrapper.find('article > .m3-foto--cartao').exists()).toBe(true);
  });

  // Desenho do Cardápio, 6.e: sem ingredientes não há folha, e a descrição aparece também abaixo de md
  it('sem ingredientes, o card ganha m3-cartao--sem-folha; com eles, não', () => {
    montar({ produto: { ...PRODUTO, name: 'Copo de Refrigerante', ingredients: [] } });
    expect(wrapper.find('article').classes()).toContain('m3-cartao--sem-folha');
    wrapper.unmount();

    montar({ produto: { ...PRODUTO, ingredients: undefined } });
    expect(wrapper.find('article').classes()).toContain('m3-cartao--sem-folha');
    wrapper.unmount();

    montar();
    expect(wrapper.find('article').classes()).not.toContain('m3-cartao--sem-folha');
  });
});
