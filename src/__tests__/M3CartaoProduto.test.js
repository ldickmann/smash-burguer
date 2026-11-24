// M3CartaoProduto (desenho do admin, §5.7 e §7.1): o card de produto do painel, no lugar do card da
// Brasa (variante admin). A anatomia do card da loja (M3Foto, nome, descrição, preço) sem o
// split, a folha, o usePersonalizar e o estado "Adicionado" do fluxo de compra.
import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { formatPrice } from '@/utils/formatters';
import M3CartaoProduto from '@/components/admin/M3CartaoProduto.vue';

const PRODUTO = {
  id: 1,
  category: 'foods',
  name: 'Smash Burger',
  description: 'Hambúrguer artesanal',
  price: 22.5,
  image: '/images/foods/smash-burger',
};

let wrapper;
afterEach(() => wrapper?.unmount());

const montar = (props = {}, slots = {}) =>
  (wrapper = mount(M3CartaoProduto, {
    props: { produto: PRODUTO, ...props },
    slots,
    global: {
      stubs: { 'font-awesome-icon': { props: ['icon'], template: '<svg class="fa-stub" :data-icon="icon.join(\' \')" />' } },
    },
  }));

describe('M3CartaoProduto', () => {
  it('a raiz é article.m3-cartao-produto, com a foto, o corpo e as ações na ordem do desenho', () => {
    montar({}, { acoes: '<button type="button">Editar</button>' });
    const raiz = wrapper.find('article.m3-cartao-produto');
    expect(raiz.exists()).toBe(true);
    const filhos = [...raiz.element.children].map((el) => [...el.classList]);
    expect(filhos[0]).toEqual(expect.arrayContaining(['m3-foto', 'm3-foto--cartao', 'm3-cartao-produto__foto']));
    expect(filhos[1]).toContain('m3-cartao-produto__corpo');
    const corpo = [...raiz.find('.m3-cartao-produto__corpo').element.children].map((el) => el.className);
    expect(corpo).toEqual([
      'm3-cartao-produto__nome',
      'm3-cartao-produto__descricao',
      'm3-cartao-produto__preco tabular',
      'm3-cartao-produto__acoes',
    ]);
  });

  it('o nome fica em h2 por padrão e em h3 com nivelTitulo', () => {
    montar();
    expect(wrapper.find('h2.m3-cartao-produto__nome').text()).toBe('Smash Burger');
    wrapper.unmount();

    montar({ nivelTitulo: 3 });
    expect(wrapper.find('h2').exists()).toBe(false);
    expect(wrapper.find('h3.m3-cartao-produto__nome').text()).toBe('Smash Burger');
    wrapper.unmount();

    montar({ nivelTitulo: '4' });
    expect(wrapper.find('h4.m3-cartao-produto__nome').exists()).toBe(true);
  });

  it('a descrição só existe com texto: sem ela, o p não entra', () => {
    montar();
    expect(wrapper.find('.m3-cartao-produto__descricao').text()).toBe('Hambúrguer artesanal');
    wrapper.unmount();

    montar({ produto: { ...PRODUTO, description: '' } });
    expect(wrapper.find('.m3-cartao-produto__descricao').exists()).toBe(false);
  });

  it('o preço sai do formatPrice, em algarismos tabulares', () => {
    montar();
    const preco = wrapper.find('.m3-cartao-produto__preco');
    expect(preco.text()).toBe(formatPrice(22.5));
    expect(preco.classes()).toContain('tabular');
  });

  it('o slot acoes fica dentro de .m3-cartao-produto__acoes', () => {
    montar({}, { acoes: '<button type="button">Editar</button><button type="button">Excluir</button>' });
    const botoes = wrapper.findAll('.m3-cartao-produto__acoes > button');
    expect(botoes.map((b) => b.text())).toEqual(['Editar', 'Excluir']);
  });

  it('a foto tem o alt igual ao nome, a forma cartao 4:3 e o srcset responsivo com o sizes do desenho', () => {
    montar();
    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBe('Smash Burger');
    expect(wrapper.find('.m3-foto').attributes('style')).toContain('aspect-ratio: 4 / 3');
    const source = wrapper.find('source');
    expect(source.attributes('srcset')).toContain('smash-burger-480.webp 480w');
    expect(source.attributes('sizes')).toBe(
      '(min-width: 1280px) 280px, (min-width: 768px) 30vw, (min-width: 480px) 45vw, 7rem'
    );
  });

  it('a imagem data: (enviada no painel) vai sem <source>', () => {
    montar({ produto: { ...PRODUTO, image: 'data:image/png;base64,AAAA' } });
    expect(wrapper.find('source').exists()).toBe(false);
    expect(wrapper.find('img').attributes('src')).toBe('data:image/png;base64,AAAA');
  });

  it('a imagem que falha dá lugar ao ícone utensils, na mesma moldura', async () => {
    montar();
    await wrapper.find('img').trigger('error');
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('.m3-foto__reserva .fa-stub').attributes('data-icon')).toBe('fas utensils');
  });

  it('sem o fluxo de compra: nenhum "Adicionar", nenhum data-adicionado, nenhum botão próprio', () => {
    montar();
    expect(wrapper.find('button').exists()).toBe(false);
    expect(wrapper.text()).not.toContain('Adicionar');
    expect(wrapper.find('[data-adicionado]').exists()).toBe(false);
    expect(wrapper.find('[aria-label^="Adicionar"]').exists()).toBe(false);
  });
});
