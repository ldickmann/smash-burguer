// Contrato da Home nova: um h1, as seções do desenho na ordem, botões "Adicionar <nome>" só de
// produtos reais e a Home montando com o cardápio vazio, sem quebrar e com o caminho para o cardápio.
// Mais os widgets do estilo: o mosaico de ladrilhos com as contagens calculadas, o pivot (abas da
// APG, ligadas aos ladrilhos), a parede de adicionais e os contatos da loja.
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { formatPrice } from '@/utils/formatters';
import Home from '../HomeFlat.vue';
import desenho from '../../../../../docs/direcoes/desenho/flat.json';
import { botoesAdicionar, montarHome, nomesProdutos } from '../../../compartilhado/__tests__/montarHome.js';

const ESTILO = 'flat';
let wrapper;
afterEach(() => wrapper?.unmount());

const abas = (w) => w.findAll('[data-secao="cardapio"] [role="tab"]');
const selecionada = (w) => w.find('[data-secao="cardapio"] [role="tab"][aria-selected="true"]');
const painelVisivel = (w) =>
  w.findAll('[data-secao="cardapio"] [role="tabpanel"]').filter((p) => p.element.style.display !== 'none');

describe('Home nova em Flat', () => {
  it('tem um h1 só e as seções do desenho, na ordem', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.findAll('[data-secao]').map((s) => s.attributes('data-secao'))).toEqual(desenho.secoes);
    for (const secao of wrapper.findAll('[data-secao]')) {
      expect(secao.element.tagName).toBe('SECTION');
      const titulo = secao.attributes('aria-labelledby');
      expect(titulo && document.getElementById(titulo)?.textContent.trim()).toBeTruthy();
    }
  });

  it('cada "Adicionar <nome>" é de um produto real', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const nomes = botoesAdicionar(wrapper);
    expect(nomes.length).toBeGreaterThan(0);
    expect(nomes.filter((n) => !nomesProdutos(produtos).includes(n))).toEqual([]);
  });

  it('monta com o cardápio vazio, sem botões de adicionar e com o caminho para o cardápio', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO, cardapio: 'vazio' }));
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(botoesAdicionar(wrapper)).toEqual([]);
    expect(wrapper.find('main a[href="/menu"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-secao]').map((s) => s.attributes('data-secao'))).toEqual(desenho.secoes);
    expect(wrapper.find('[data-destino="foods"]').attributes('aria-label')).toBe('Hambúrgueres, 0 itens');
    expect(wrapper.find('[data-destino="drinks"]').text()).toContain('0 itens');
    expect(abas(wrapper)).toHaveLength(3);
    expect(painelVisivel(wrapper)[0].text()).toContain('Nada nesta categoria por enquanto');
  });

  it('a nav Principal tem Início, Cardápio e Entrar, e o carrinho tem o nome do contador', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const nav = wrapper.find('nav[aria-label="Principal"]');
    expect(nav.findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(nav.find('a[aria-current="page"]').text()).toBe('Início');
    expect(wrapper.find('a[href="/cart"]').attributes('aria-label')).toBe('Carrinho, vazio');
    expect(wrapper.find('header button[aria-expanded]').exists()).toBe(false);
  });

  it('o mosaico tem cinco ladrilhos, cada um um botão inteiro com a contagem calculada', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const ladrilhos = wrapper.findAll('[data-secao="inicio"] .fl-mosaico button');
    expect(ladrilhos.map((b) => b.attributes('data-destino'))).toEqual(['foods', 'drinks', 'desserts', 'adicionais', 'loja']);
    const total = (n) => `${n} ${n === 1 ? 'item' : 'itens'}`;
    expect(ladrilhos.map((b) => b.attributes('aria-label'))).toEqual([
      `Hambúrgueres, ${total(produtos.foods.length)}`,
      `Bebidas, ${total(produtos.drinks.length)}`,
      `Sobremesas, ${total(produtos.desserts.length)}`,
      `Adicionais, ${total(produtos.foodAdditionals.length + produtos.dessertAdditionals.length)}`,
      'Horário: Terça a sexta, das 13h à 01h',
    ]);
    for (const b of ladrilhos) expect(b.findAll('a, button')).toHaveLength(0);
    // Só a imagem do ladrilho Hambúrgueres, decorativa ali, com a prioridade do LCP
    const imagens = wrapper.findAll('[data-secao="inicio"] img');
    expect(imagens).toHaveLength(1);
    expect(imagens[0].attributes('alt')).toBe('');
    expect(imagens[0].attributes('fetchpriority')).toBe('high');
  });

  it('a contagem do ladrilho acompanha o cardápio editado', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.menuItems.drinks = produtos.drinks.slice(0, 1);
    await nextTick();
    expect(wrapper.find('[data-destino="drinks"]').attributes('aria-label')).toBe('Bebidas, 1 item');
  });

  it('o ladrilho de uma categoria seleciona a página do pivot e põe o foco na aba', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    expect(selecionada(wrapper).attributes('id')).toBe('fl-aba-foods');
    await wrapper.find('[data-destino="drinks"]').trigger('click');
    await flushPromises();
    expect(selecionada(wrapper).attributes('id')).toBe('fl-aba-drinks');
    expect(document.activeElement?.id).toBe('fl-aba-drinks');
    expect(painelVisivel(wrapper).map((p) => p.attributes('id'))).toEqual(['fl-painel-drinks']);
  });

  it('os ladrilhos Adicionais e Horário levam o foco ao h2 da seção', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    await wrapper.find('[data-destino="adicionais"]').trigger('click');
    await flushPromises();
    expect(document.activeElement?.id).toBe('fl-adicionais-titulo');
    await wrapper.find('[data-destino="loja"]').trigger('click');
    await flushPromises();
    expect(document.activeElement?.id).toBe('fl-loja-titulo');
  });

  it('o pivot segue a APG: tabindex móvel, setas com volta, Home e End', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const lista = wrapper.find('[data-secao="cardapio"] [role="tablist"]');
    expect(lista.attributes('aria-labelledby')).toBe('fl-cardapio-titulo');
    expect(abas(wrapper).map((a) => a.attributes('tabindex'))).toEqual(['0', '-1', '-1']);
    for (const aba of abas(wrapper)) {
      expect(document.getElementById(aba.attributes('aria-controls'))?.getAttribute('role')).toBe('tabpanel');
    }

    const teclar = async (tecla) => {
      await selecionada(wrapper).trigger('keydown', { key: tecla });
      await flushPromises();
      return document.activeElement?.id;
    };
    expect(await teclar('ArrowRight')).toBe('fl-aba-drinks');
    expect(selecionada(wrapper).attributes('id')).toBe('fl-aba-drinks');
    expect(await teclar('End')).toBe('fl-aba-desserts');
    expect(await teclar('ArrowRight')).toBe('fl-aba-foods');
    expect(await teclar('ArrowLeft')).toBe('fl-aba-desserts');
    expect(await teclar('Home')).toBe('fl-aba-foods');
    expect(abas(wrapper).map((a) => a.attributes('tabindex'))).toEqual(['0', '-1', '-1']);
    expect(painelVisivel(wrapper).map((p) => p.attributes('id'))).toEqual(['fl-painel-foods']);
  });

  it('cada página lista os produtos da categoria, e o produto excluído some', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const painel = () => wrapper.find('#fl-painel-foods');
    expect(painel().findAll('h3').map((h) => h.text())).toEqual(produtos.foods.map((p) => p.name));
    const [primeiro] = produtos.foods;
    produtos.menuItems.foods = produtos.foods.slice(1);
    await nextTick();
    expect(painel().text()).not.toContain(primeiro.name);
    expect(wrapper.find('#fl-painel-drinks').findAll('li')).toHaveLength(produtos.drinks.length);
  });

  it('os adicionais vêm em dois grupos com o preço, e um grupo vazio some', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const secao = () => wrapper.find('[data-secao="adicionais"]');
    expect(secao().findAll('h3').map((h) => h.text())).toEqual(['Nos hambúrgueres', 'Nas sobremesas']);
    expect(secao().findAll('li')).toHaveLength(produtos.foodAdditionals.length + produtos.dessertAdditionals.length);
    const [bacon] = produtos.foodAdditionals;
    expect(secao().find('li').text()).toBe(`${bacon.name} ${formatPrice(bacon.price)}`);

    produtos.dessertAdditionals = [];
    await nextTick();
    expect(secao().findAll('h3').map((h) => h.text())).toEqual(['Nos hambúrgueres']);

    produtos.foodAdditionals = [];
    await nextTick();
    expect(secao().findAll('h3')).toHaveLength(0);
    expect(secao().text()).toContain('Nada nesta categoria por enquanto');
  });

  it('a loja mostra o horário, o endereço e os contatos reais, com rótulo e valor separados', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="loja"]');
    expect(secao.find('h2').text()).toBe('Onde nos achar');
    expect(secao.text()).toContain('Terça a sexta, das 13h à 01h');
    expect(secao.text()).toContain('Rua Beira da Praia - Navegantes, SC');
    expect(secao.text()).toContain('contato@smashburger.com.br');
    expect(secao.text()).not.toContain('·');
    const whatsapp = secao.find('a[href^="https://wa.me/"]');
    expect(whatsapp.find('.fl-contato__rotulo').text()).toBe('WhatsApp');
    expect(whatsapp.find('.fl-contato__valor').text()).toBe('+55 47 5 6355 3265');
    const externos = secao.findAll('a[target="_blank"]');
    expect(externos).toHaveLength(2);
    for (const a of externos) {
      expect(a.attributes('rel')).toBe('noopener noreferrer');
      expect(a.text()).toContain('(abre em nova aba)');
    }
  });

  it('o rodapé não tem links e não repete as redes genéricas', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const rodape = wrapper.find('footer');
    expect(rodape.findAll('a')).toHaveLength(0);
    expect(rodape.text()).toContain('Smash Burger');
  });
});
