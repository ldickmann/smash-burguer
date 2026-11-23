// Carrinho no M3 (docs/direcoes/desenho/carrinho-pagamento.md, §5.1 a §5.5 e §9): o h1, a região da
// lista nomeada por um h2 escondido, um item de lista segmentada por linha (miniatura M3Foto na forma
// da categoria), o resumo com os CTAs de quem entrou e do visitante e o EmptyState. Remover tira na
// hora e oferece "Desfazer" no aviso; o "Desfazer" devolve o item à mesma posição e o foco ao
// "Remover" dele (§5.2 e §8, "Lógica"). O AppToast não é montado aqui: a ação roda pela store.
import { afterEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import CartView from '@/views/CartView.vue';
import { useCartStore } from '@/stores/cart';
import { useToastStore } from '@/stores/toast';
import { useUserStore } from '@/stores/userStore';

const Blank = { template: '<div />' };

const linha = (productId, category, name, image, unitPrice, extra = {}) => ({
  productId,
  category,
  name,
  image,
  unitPrice,
  quantity: 1,
  removedIngredients: [],
  additionals: [],
  observation: '',
  ...extra,
});

const BURGER = linha(1, 'foods', 'Cheese Bacon', '/images/foods/cheese-bacon', 29.49, {
  removedIngredients: ['Tomate'],
  additionals: [{ name: 'Bacon', price: 3.5, quantity: 1 }],
});
const COCA = linha(2, 'drinks', 'Coca Cola Lata', '/images/drinks/coca-cola-lata', 4.99);
const SORVETE = linha(1, 'desserts', 'Sorvete de Pote', '/images/desserts/sorvete-pote', 12.9);

let wrapper;
afterEach(() => {
  wrapper?.unmount();
  wrapper = undefined;
});

async function montarCarrinho({ itens = [BURGER, COCA, SORVETE], logado = true } = {}) {
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  if (logado) useUserStore().setUser({ firstName: 'Maria', email: 'maria@example.com' });
  const carrinho = useCartStore();
  itens.forEach((item) => carrinho.addItem({ ...item }));

  const router = createRouter({
    history: createMemoryHistory(),
    routes: ['/', '/cart', '/menu', '/payment', '/login', '/register'].map((path) => ({ path, component: Blank })),
  });
  await router.push('/cart');

  wrapper = mount(CartView, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: { 'font-awesome-icon': { props: ['icon'], template: '<svg :data-icon="[].concat(icon).join(\'-\')" />' } },
    },
  });
  await flushPromises();
  return { carrinho, router };
}

const removers = () => wrapper.findAll('[data-remove]');
const focado = () => document.activeElement;

describe('CartView (Carrinho do Material 3)', () => {
  it('um h1 "Seu carrinho" e a lista numa região nomeada pelo h2 escondido "Itens do carrinho"', async () => {
    await montarCarrinho();
    expect(wrapper.findAll('h1').map((h) => h.text())).toEqual(['Seu carrinho']);

    const lista = wrapper.find('section.cart-page__lista');
    const titulo = lista.find('h2');
    expect(titulo.text()).toBe('Itens do carrinho');
    expect(titulo.classes()).toContain('visually-hidden');
    expect(lista.attributes('aria-labelledby')).toBe(titulo.attributes('id'));
    expect(lista.attributes('aria-label')).toBeUndefined();
  });

  it('um item da lista segmentada por linha, na ordem da store, cada um com "Remover {nome}"', async () => {
    await montarCarrinho();
    const itens = wrapper.findAll('ul.cart-page__itens > li.cart-item');
    expect(itens.map((item) => item.find('.cart-item__name').text())).toEqual([
      'Cheese Bacon',
      'Coca Cola Lata',
      'Sorvete de Pote',
    ]);
    expect(removers().map((botao) => botao.attributes('aria-label'))).toEqual([
      'Remover Cheese Bacon',
      'Remover Coca Cola Lata',
      'Remover Sorvete de Pote',
    ]);
    expect(itens[0].findAll('.cart-item__detail').map((d) => d.text())).toEqual(['Sem tomate', '+1 bacon']);
  });

  it('a miniatura é a M3Foto de 64 px na forma da categoria, sem alt', async () => {
    await montarCarrinho();
    const fotos = wrapper.findAll('.cart-item .m3-foto');
    expect(fotos.map((foto) => foto.classes().find((c) => c.startsWith('m3-foto--')))).toEqual([
      'm3-foto--cartao',
      'm3-foto--circulo',
      'm3-foto--flor',
    ]);
    // O cartão do hambúrguer é quadrado, sem o cookie da Home
    expect(fotos[0].attributes('style')).toContain('aspect-ratio: 1 / 1');
    const img = fotos[0].find('img');
    expect(img.attributes('alt')).toBe('');
    expect(img.attributes('width')).toBe('64');
    expect(img.attributes('height')).toBe('64');
    expect(fotos[0].find('source').attributes('sizes')).toBe('64px');
  });

  it('a imagem que falha dá lugar ao ícone utensils, na mesma forma', async () => {
    await montarCarrinho();
    await wrapper.findAll('.cart-item img')[1].trigger('error');
    const foto = wrapper.findAll('.cart-item .m3-foto')[1];
    expect(foto.find('img').exists()).toBe(false);
    expect(foto.find('[data-icon="fas-utensils"]').exists()).toBe(true);
    expect(foto.classes()).toContain('m3-foto--circulo');
  });

  it('remover mostra o aviso com "Desfazer" e põe o foco no "Remover" vizinho', async () => {
    const { carrinho } = await montarCarrinho();
    removers()[1].element.focus();
    await removers()[1].trigger('click');
    await flushPromises();

    expect(carrinho.items.map((item) => item.name)).toEqual(['Cheese Bacon', 'Sorvete de Pote']);
    const [aviso] = useToastStore().toasts;
    expect(aviso.message).toBe('Coca Cola Lata removido.');
    expect(aviso.action.label).toBe('Desfazer');
    expect(focado().getAttribute('aria-label')).toBe('Remover Sorvete de Pote');
  });

  it('"Desfazer" devolve o item ao mesmo índice e põe o foco no "Remover" dele', async () => {
    const { carrinho } = await montarCarrinho();
    await removers()[1].trigger('click');
    await flushPromises();

    const toasts = useToastStore();
    toasts.runAction(toasts.toasts[0].id);
    await flushPromises();

    expect(carrinho.items.map((item) => item.name)).toEqual(['Cheese Bacon', 'Coca Cola Lata', 'Sorvete de Pote']);
    expect(toasts.toasts).toEqual([]);
    expect(focado().getAttribute('aria-label')).toBe('Remover Coca Cola Lata');
  });

  it('quando o último item sai, o foco vai ao h1 e aparece o carrinho vazio', async () => {
    await montarCarrinho({ itens: [COCA] });
    await removers()[0].trigger('click');
    await flushPromises();

    expect(focado()).toBe(wrapper.find('h1').element);
    expect(wrapper.find('.empty-state').text()).toContain('Seu carrinho está vazio');
    expect(wrapper.find('.cart-page__lista').exists()).toBe(false);
  });

  it('logado: "Finalizar pedido" para /payment e "Continuar comprando" para /menu, no resumo', async () => {
    await montarCarrinho();
    const resumo = wrapper.find('.order-summary.cart-page__resumo');
    expect(resumo.exists()).toBe(true);
    const links = resumo.findAll('.order-summary__cta a');
    expect(links.map((link) => [link.text(), link.attributes('href')])).toEqual([
      ['Finalizar pedido', '/payment'],
      ['Continuar comprando', '/menu'],
    ]);
    expect(links[0].classes()).toEqual(expect.arrayContaining(['m3-botao--filled', 'btn--lg', 'btn--block']));
    expect(links[1].classes()).toEqual(expect.arrayContaining(['m3-botao--texto', 'btn--block']));
  });

  it('visitante: o aviso, "Entrar e finalizar" e "Criar conta", voltando ao pagamento', async () => {
    await montarCarrinho({ logado: false });
    const resumo = wrapper.find('.cart-page__resumo');
    expect(resumo.find('.cart-page__notice').text()).toBe('Entre para finalizar seu pedido.');
    const links = resumo.findAll('.order-summary__cta a');
    expect(links.map((link) => [link.text(), link.attributes('href')])).toEqual([
      ['Entrar e finalizar', '/login?redirect=/payment'],
      ['Criar conta', '/register?redirect=/payment'],
    ]);
    expect(links[0].classes()).toContain('m3-botao--filled');
    expect(links[1].classes()).toContain('m3-botao--tonal');
  });

  it('carrinho vazio: o EmptyState com "Ver cardápio", sem a bandeja nem o resumo', async () => {
    await montarCarrinho({ itens: [] });
    expect(wrapper.find('h1').text()).toBe('Seu carrinho');
    const vazio = wrapper.find('.empty-state');
    expect(vazio.text()).toContain('Seu carrinho está vazio');
    expect(vazio.text()).toContain('Escolha um burger no cardápio para começar.');
    expect(vazio.find('a').attributes('href')).toBe('/menu');
    expect(wrapper.find('.cart-page__lista').exists()).toBe(false);
    expect(wrapper.find('.order-summary').exists()).toBe(false);
  });
});
