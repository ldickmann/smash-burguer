// useCartaoProduto (cópia de produção do composable do acervo, SPEC-material §4.1 e §7.6): os
// ganchos do botão "Adicionar" e o retorno, que dura --dur-base + --dur-hold.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { useCartaoProduto } from '@/composables/useCartaoProduto';
import { formatPrice } from '@/utils/formatters';

const PRODUTO = { id: 1, name: 'Cheese Bacon', price: 25.99, image: '/images/foods/cheese-bacon' };
const raiz = document.documentElement;

let wrapper;
let ganchos;
const montar = (produto = PRODUTO) => {
  const Cartao = defineComponent({
    setup() {
      ganchos = useCartaoProduto(() => produto);
      return () => h('button', ganchos.atributosAdicionar.value, 'Adicionar');
    },
  });
  wrapper = mount(Cartao);
};

beforeEach(() => {
  vi.useFakeTimers();
  // Valores diferentes das reservas do composable (250 ms + 1200 ms), para provar que o JS lê os
  // tokens do CSS; o "1.1s" é a forma que o minificador pode escrever
  raiz.style.setProperty('--dur-base', '300ms');
  raiz.style.setProperty('--dur-hold', '1.1s');
});

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
  vi.useRealTimers();
  raiz.style.removeProperty('--dur-base');
  raiz.style.removeProperty('--dur-hold');
});

describe('useCartaoProduto', () => {
  it('atributosAdicionar dá o nome acessível e marca o retorno', async () => {
    montar();
    expect(wrapper.attributes('aria-label')).toBe('Adicionar Cheese Bacon');
    expect(wrapper.attributes('data-adicionado')).toBeUndefined();
    expect(ganchos.preco.value).toBe(formatPrice(25.99));
    expect(ganchos.imagem.value.src).toContain('cheese-bacon');

    ganchos.contexto.markAdded();
    await nextTick();
    expect(ganchos.adicionado.value).toBe(true);
    expect(wrapper.attributes('data-adicionado')).toBe('true');
  });

  it('o retorno dura --dur-base + --dur-hold e reinicia a cada adição', async () => {
    montar();
    ganchos.contexto.markAdded();
    vi.advanceTimersByTime(1399);
    await nextTick();
    expect(wrapper.attributes('data-adicionado')).toBe('true');

    // Nova adição antes do fim: o tempo recomeça
    ganchos.contexto.markAdded();
    vi.advanceTimersByTime(1399);
    await nextTick();
    expect(wrapper.attributes('data-adicionado')).toBe('true');

    vi.advanceTimersByTime(1);
    await nextTick();
    expect(wrapper.attributes('data-adicionado')).toBeUndefined();
  });

  it('desmontar no meio do retorno limpa o temporizador', () => {
    montar();
    ganchos.contexto.markAdded();
    wrapper.unmount();
    wrapper = null;
    expect(vi.getTimerCount()).toBe(0);
  });
});
