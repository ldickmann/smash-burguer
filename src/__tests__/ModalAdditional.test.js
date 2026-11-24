// Modal Personalizar no M3 (docs/direcoes/desenho/cardapio.md, §5.5 e §9): o montador sobre o prato
// nos hambúrgueres e a M3Foto nos outros produtos; ingredientes em linhas de checkbox (input nativo
// escondido e caixa desenhada); adicionais em lista segmentada; quantidade só nas bebidas; o CTA
// "Adicionar · R$ x" com o total ao vivo. O fluxo e o cálculo são os do SPEC.md §5.4 e §10.2. O
// <dialog> nativo não existe no jsdom: o BaseDialog vira um stub que mostra o conteúdo e o rodapé.
import { afterEach, describe, expect, it } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useProductsStore } from '@/stores/products';
import { formatPrice } from '@/utils/formatters';
import ModalAdditional from '@/components/ModalAdditional.vue';

let wrapper;
afterEach(() => wrapper?.unmount());

function montarModal({ categoria = 'foods', nome = 'Cheese Bacon', semAdicionaisDeSobremesa = false } = {}) {
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  const produtos = useProductsStore();
  if (semAdicionaisDeSobremesa) produtos.dessertAdditionals = [];
  const produto = produtos[categoria].find((p) => p.name === nome);
  wrapper = mount(ModalAdditional, {
    props: { open: true, product: produto },
    global: {
      plugins: [pinia],
      stubs: {
        'font-awesome-icon': { template: '<svg aria-hidden="true" />' },
        BaseDialog: { props: ['open'], template: '<div class="dialog-stub"><slot /><slot name="footer" /></div>' },
      },
    },
  });
  return { produto, produtos };
}

const cta = () => wrapper.find('.dialog-stub button.btn--block, .dialog-stub button.btn--lg');
const nomesIngredientes = () => wrapper.findAll('.ingredients-list__name').map((n) => n.text());

describe('ModalAdditional (Personalizar no M3)', () => {
  it('hambúrguer: o montador sobre o prato, uma caixa por ingrediente e os 5 adicionais', () => {
    const { produto } = montarModal();
    expect(wrapper.find('.customize__visual .customize__prato .burger-stack').exists()).toBe(true);
    expect(wrapper.find('.customize__visual .m3-foto').exists()).toBe(false);
    expect(nomesIngredientes()).toEqual(produto.ingredients);
    const linhas = wrapper.findAll('label.ingredients-list__label');
    expect(linhas).toHaveLength(produto.ingredients.length);
    for (const linha of linhas) {
      // Input nativo escondido, caixa desenhada (decorativa) com o check do Font Awesome
      const input = linha.find('input[type="checkbox"].ingredients-list__checkbox');
      expect(input.classes()).toContain('visually-hidden');
      expect(input.element.checked).toBe(true);
      expect(linha.attributes('for')).toBe(input.attributes('id'));
      const caixa = linha.find('.ingredients-list__caixa');
      expect(caixa.attributes('aria-hidden')).toBe('true');
      expect(caixa.find('.ingredients-list__check').exists()).toBe(true);
    }
    expect(wrapper.find('ul.ingredients-list').attributes('role')).toBe('list');
    expect(wrapper.findAll('.additionals-list > li.additionals-list__item')).toHaveLength(5);
    expect(wrapper.find('#quantidade-titulo').exists()).toBe(false);
  });

  it('Batata Frita: a foto no lugar do prato, sem ingredientes nem adicionais', () => {
    montarModal({ nome: 'Batata Frita' });
    expect(wrapper.find('.burger-stack').exists()).toBe(false);
    expect(wrapper.find('.customize__prato').exists()).toBe(false);
    expect(wrapper.find('.customize__visual .customize__foto.m3-foto--cartao').exists()).toBe(true);
    expect(wrapper.find('.ingredients-list').exists()).toBe(false);
    expect(wrapper.find('.additionals-list').exists()).toBe(false);
    expect(wrapper.find('#quantidade-titulo').exists()).toBe(false);
  });

  it('bebida: a foto 4:3, "Quantidade" de 1 a 10 e nenhum ingrediente', () => {
    montarModal({ categoria: 'drinks', nome: 'Copo de Refrigerante' });
    const foto = wrapper.find('.customize__visual .customize__foto');
    expect(foto.classes()).toContain('m3-foto--cartao');
    expect(foto.attributes('style')).toContain('aspect-ratio: 4 / 3');
    expect(foto.find('img').attributes('alt')).toBe('Copo de Refrigerante');
    expect(wrapper.find('#quantidade-titulo').text()).toBe('Quantidade');
    expect(wrapper.find('.stepper__value').text()).toBe('1');
    // No mínimo, aria-disabled (o botão continua focável), e não disabled
    expect(wrapper.find('button[aria-label="Diminuir Copo de Refrigerante"]').attributes('aria-disabled')).toBe('true');
    expect(wrapper.find('.ingredients-list').exists()).toBe(false);
    expect(wrapper.find('.additionals-list').exists()).toBe(false);
  });

  it('sobremesa: a M3Foto, os 3 ingredientes e os 7 adicionais', () => {
    montarModal({ categoria: 'desserts', nome: 'Sorvete de Pote' });
    expect(wrapper.find('.customize__visual .customize__foto.m3-foto').exists()).toBe(true);
    expect(wrapper.find('.burger-stack').exists()).toBe(false);
    expect(nomesIngredientes()).toEqual(['Leite', 'Açúcar', 'Creme de leite']);
    expect(wrapper.findAll('.additionals-list__item')).toHaveLength(7);
  });

  it('sem adicionais no catálogo, a seção dos adicionais some', () => {
    montarModal({ categoria: 'desserts', nome: 'Sorvete de Pote', semAdicionaisDeSobremesa: true });
    expect(wrapper.find('.ingredients-list').exists()).toBe(true);
    expect(wrapper.find('#adicionais-titulo').exists()).toBe(false);
    expect(wrapper.find('.additionals-list').exists()).toBe(false);
  });

  it('desmarcar "Tomate" mostra "(removido)", e o confirmar emite removedIngredients ["Tomate"]', async () => {
    montarModal();
    const tomate = wrapper.findAll('label.ingredients-list__label').find((l) => l.text().includes('Tomate'));
    const input = tomate.find('input');
    input.element.checked = false;
    await input.trigger('change');
    const linha = wrapper.findAll('label.ingredients-list__label').find((l) => l.text().includes('Tomate'));
    expect(linha.classes()).toContain('is-removed');
    expect(linha.find('.visually-hidden:not(input)').text()).toBe('(removido)');

    await cta().trigger('click');
    const [[item]] = wrapper.emitted('confirm');
    expect(item.removedIngredients).toEqual(['Tomate']);
    expect(item.name).toBe('Cheese Bacon');
  });

  it('somar um Bacon muda o CTA para o preço com o acréscimo', async () => {
    const { produto } = montarModal();
    expect(cta().text()).toBe(`Adicionar · ${formatPrice(produto.price)}`);
    await wrapper.find('button[aria-label="Aumentar Bacon"]').trigger('click');
    await flushPromises();
    expect(wrapper.find('.additionals-list .stepper__value').text()).toBe('1');
    expect(cta().text()).toBe(`Adicionar · ${formatPrice(produto.price + 3.5)}`);

    await cta().trigger('click');
    const [[item]] = wrapper.emitted('confirm');
    expect(item.additionals).toEqual([{ name: 'Bacon', price: 3.5, quantity: 1 }]);
    expect(item.unitPrice).toBeCloseTo(produto.price + 3.5);
  });

  it('o CTA é o filled M (BaseButton lg e block), com "Adicionar · " e o preço tabular', () => {
    const { produto } = montarModal();
    const botao = cta();
    expect(botao.classes()).toEqual(expect.arrayContaining(['btn--lg', 'btn--block']));
    expect(botao.text()).toBe(`Adicionar · ${formatPrice(produto.price)}`);
    expect(botao.find('span.tabular').text()).toBe(formatPrice(produto.price));
  });

  // Desenho da Conta (§5.9): o gap da .customize__section somaria 12 px às margens do campo
  it('a observação é o FormGroup sem a classe customize__section, com o contador como ajuda', () => {
    montarModal();
    const grupo = wrapper.find('#observacao').element.closest('.form-group');
    expect(grupo.classList.contains('customize__section')).toBe(false);
    expect(wrapper.find('#observacao-ajuda').text()).toBe('0/140');
    expect(wrapper.find('#observacao').attributes('aria-describedby')).toBe('observacao-ajuda');
  });

  it('a foto que falhou volta a ser tentada na abertura seguinte', async () => {
    const { produtos } = montarModal({ categoria: 'drinks', nome: 'Copo de Refrigerante' });
    await wrapper.find('.customize__foto img').trigger('error');
    expect(wrapper.find('.customize__foto .m3-foto__reserva').exists()).toBe(true);

    await wrapper.setProps({ open: false });
    await wrapper.setProps({ open: true, product: produtos.drinks[1] });
    expect(wrapper.find('.customize__foto .m3-foto__reserva').exists()).toBe(false);
    expect(wrapper.find('.customize__foto img').attributes('alt')).toBe('Coca Cola Lata');
  });
});
