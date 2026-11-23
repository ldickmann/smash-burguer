// Confirmação no M3 (docs/direcoes/desenho/carrinho-pagamento.md, §5.9 e §9): uma pilha de dois
// segmentos (a faixa primary-container com o h1 e os dados do pedido numa dl, e o resumo somente
// leitura) e as duas ações. O h1 recebe o foco ao montar. "Pedido #1001 · PIX" virou a dl "Pedido" /
// "Forma de pagamento", sem o "·" (troca confirmada pelo usuário em 22/11/2026).
import { afterEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import ConfirmationView from '@/views/ConfirmationView.vue';
import { useUserStore } from '@/stores/userStore';

const Blank = { template: '<div />' };

const PEDIDO = {
  id: 1001,
  date: '2026-11-22T12:00:00.000Z',
  status: 'Recebido',
  total: 34.48,
  paymentMethod: 'PIX',
  address: { street: 'Rua Beira da Praia', neighborhood: 'Centro', city: 'Navegantes', state: 'SC', CEP: '88370000' },
  items: [
    {
      productId: 1,
      category: 'foods',
      name: 'Cheese Bacon',
      unitPrice: 29.49,
      quantity: 1,
      removedIngredients: ['Tomate'],
      additionals: [{ name: 'Bacon', price: 3.5, quantity: 1 }],
      observation: '',
    },
    {
      productId: 2,
      category: 'drinks',
      name: 'Coca Cola Lata',
      unitPrice: 4.99,
      quantity: 1,
      removedIngredients: [],
      additionals: [],
      observation: '',
    },
  ],
};

let wrapper;
afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
});

async function montarConfirmacao() {
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  const usuario = useUserStore();
  usuario.orderHistory = [PEDIDO];
  usuario.lastOrderId = PEDIDO.id;

  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/confirmation', '/menu', '/profile'].map((path) => ({ path, component: Blank })),
  });
  await router.push('/confirmation');

  wrapper = mount(ConfirmationView, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { template: '<svg />' } },
    },
  });
  await flushPromises();
}

const dados = () =>
  wrapper.findAll('dl.confirmation-page__dados > div').map((par) => [par.find('dt').text(), par.find('dd').text()]);

describe('ConfirmationView (Confirmação do Material 3)', () => {
  it('o h1 "Pedido recebido" fica na faixa e recebe o foco ao montar', async () => {
    await montarConfirmacao();
    const titulo = wrapper.find('.confirmation-page__status h1');
    expect(titulo.text()).toBe('Pedido recebido');
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(document.activeElement).toBe(titulo.element);
  });

  it('o número e a forma do pedido numa dl, sem "·"', async () => {
    await montarConfirmacao();
    expect(dados()).toEqual([
      ['Pedido', '#1001'],
      ['Forma de pagamento', 'PIX'],
    ]);
    expect(wrapper.find('.confirmation-page__status').text()).not.toContain('·');
    expect(wrapper.find('.confirmation-page__meta').exists()).toBe(false);
  });

  it('a pilha: a faixa e, colado a ela, o resumo somente leitura com as linhas do pedido', async () => {
    await montarConfirmacao();
    const pilha = wrapper.find('.confirmation-page__coluna > .confirmation-page__pilha');
    const segmentos = pilha.element.children;
    expect(segmentos).toHaveLength(2);
    expect(segmentos[0].classList.contains('confirmation-page__status')).toBe(true);
    expect(segmentos[1].classList.contains('order-summary--readonly')).toBe(true);
    expect(segmentos[1].classList.contains('confirmation-page__resumo')).toBe(true);

    const resumo = wrapper.find('.confirmation-page__resumo');
    expect(resumo.find('h2').text()).toBe('Resumo do pedido');
    expect(resumo.findAll('.order-summary__name').map((n) => n.text())).toEqual(['1× Cheese Bacon', '1× Coca Cola Lata']);
    expect(resumo.findAll('.order-summary__detail').map((d) => d.text())).toEqual(['Sem tomate', '+1 bacon']);
  });

  it('"Voltar ao cardápio" (filled) e "Ver meus pedidos" (tonal), fora da pilha', async () => {
    await montarConfirmacao();
    const links = wrapper.findAll('.confirmation-page__acoes a');
    expect(links.map((link) => [link.text(), link.attributes('href')])).toEqual([
      ['Voltar ao cardápio', '/menu'],
      ['Ver meus pedidos', '/profile'],
    ]);
    expect(links[0].classes()).toEqual(expect.arrayContaining(['m3-botao--filled', 'btn--lg']));
    expect(links[1].classes()).toEqual(expect.arrayContaining(['m3-botao--tonal', 'btn--lg']));
    expect(wrapper.find('.confirmation-page__pilha .confirmation-page__acoes').exists()).toBe(false);
  });
});
