import { afterEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import MolduraDirecao from '../MolduraDirecao.vue';
import { usePersonalizar } from '../usePersonalizar';
import { useCartaoProduto } from '../useCartaoProduto';
import { CATEGORIAS, FRASE_CARDAPIO, HORARIO } from '../dados.js';
import { botoesAdicionar, montarHome } from './montarHome.js';

let wrapper;
afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
  vi.useRealTimers();
});

const PRODUTO = { id: 1, name: 'Cheese Bacon', price: 25.99, image: '/images/foods/cheese-bacon' };

// Seção de teste: abre o modal pelo usePersonalizar e expõe os ganchos do botão
const SecaoTeste = defineComponent({
  setup() {
    const personalizar = usePersonalizar();
    const { contexto, atributosAdicionar } = useCartaoProduto(() => PRODUTO);
    return () =>
      h('section', { 'data-secao': 'teste', 'aria-labelledby': 't' }, [
        h('h1', { id: 't' }, 'Teste'),
        h('button', { ...atributosAdicionar.value, onClick: () => personalizar(PRODUTO, contexto) }, 'Adicionar'),
      ]);
  },
});

const HomeTeste = defineComponent({
  setup: () => () => h(MolduraDirecao, { estilo: 'teste' }, { default: () => h(SecaoTeste) }),
});

describe('lógica comum das direções', () => {
  it('a moldura entrega o personalizar às seções', async () => {
    ({ wrapper } = await montarHome(HomeTeste, { estilo: 'teste' }));
    expect(botoesAdicionar(wrapper)).toEqual(['Cheese Bacon']);
    await wrapper.find('button[aria-label="Adicionar Cheese Bacon"]').trigger('click');
    // O stub do ModalAdditional recebe o produto aberto
    expect(wrapper.findComponent({ name: 'ModalAdditional' }).props('product')).toMatchObject({ name: 'Cheese Bacon' });
  });

  it('usePersonalizar fora da moldura avisa o erro', () => {
    const Solta = defineComponent({ setup: () => (usePersonalizar(), () => null) });
    const erro = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => mount(Solta)).toThrow(/MolduraDirecao/);
    erro.mockRestore();
  });

  it('atributosAdicionar dá o nome e marca o retorno', async () => {
    vi.useFakeTimers();
    let ganchos;
    const Cartao = defineComponent({
      setup() {
        ganchos = useCartaoProduto(() => PRODUTO);
        return () => h('button', ganchos.atributosAdicionar.value, 'Adicionar');
      },
    });
    wrapper = mount(Cartao);
    expect(wrapper.attributes('aria-label')).toBe('Adicionar Cheese Bacon');
    expect(wrapper.attributes('data-adicionado')).toBeUndefined();
    ganchos.contexto.markAdded();
    await nextTick();
    expect(wrapper.attributes('data-adicionado')).toBe('true');
    vi.advanceTimersByTime(5000);
    await nextTick();
    expect(wrapper.attributes('data-adicionado')).toBeUndefined();
  });

  it('dados.js traz os textos reais com a origem', () => {
    expect(FRASE_CARDAPIO).toBe('Escolha, personalize e peça.');
    expect(HORARIO).toBe('Terça a sexta, das 13h à 01h');
    expect(CATEGORIAS.map((c) => c.rotulo)).toEqual(['Hambúrgueres', 'Bebidas', 'Sobremesas']);
  });
});
