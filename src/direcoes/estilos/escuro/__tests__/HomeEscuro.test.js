// Contrato da Home nova: um h1, as seções do desenho na ordem, botões "Adicionar <nome>" só de
// produtos reais e a Home montando com o cardápio vazio, sem quebrar e com o caminho para o cardápio.
// Mais os widgets do estilo: a barra sem botão de menu, os degraus "no seu pedido" no card e na linha,
// os grupos da junto, a faixa das horas e o rodapé com os contatos reais.
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { useCartStore } from '@/stores/cart';
import Home from '../HomeEscuro.vue';
import desenho from '../../../../../docs/direcoes/desenho/escuro.json';
import { botoesAdicionar, montarHome, nomesProdutos } from '../../../compartilhado/__tests__/montarHome.js';

const ESTILO = 'escuro';
let wrapper;
afterEach(() => wrapper?.unmount());

const item = (produto, quantity = 1) => ({
  productId: produto.id,
  category: produto.category,
  name: produto.name,
  image: produto.image,
  unitPrice: produto.price,
  quantity,
});

describe('Home nova em Dark mode', () => {
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

  it('tem "Adicionar <nome>" para todos os lanches, bebidas e sobremesas', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    expect(botoesAdicionar(wrapper).sort()).toEqual(nomesProdutos(produtos).sort());
  });

  it('monta com o cardápio vazio, sem botões de adicionar e com o caminho para o cardápio', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO, cardapio: 'vazio' }));
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(botoesAdicionar(wrapper)).toEqual([]);
    expect(wrapper.find('main a[href="/menu"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-secao]').map((s) => s.attributes('data-secao'))).toEqual(desenho.secoes);
    expect(wrapper.find('[data-secao="vitrine"]').text()).toContain('Nada nesta categoria por enquanto');
    expect(wrapper.find('[data-secao="junto"]').text()).toContain('Dê uma olhada nas outras categorias.');
    expect(wrapper.find('[data-secao="junto"] .esc-vazio--plano').exists()).toBe(true);
    // Na vitrine, o vazio fica direto na caixa N12, que já é o degrau
    expect(wrapper.find('[data-secao="vitrine"] .esc-vitrine__caixa .esc-vazio--plano').exists()).toBe(true);
  });

  it('o palco tem a foto do Smash Burger com prioridade, e a vitrine abre na caixa com o link de volta ao cardápio', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const img = wrapper.find('[data-secao="palco"] img');
    expect(img.attributes('src')).toContain('/images/foods/smash-burger');
    expect(img.attributes('fetchpriority')).toBe('high');
    expect(img.attributes('alt')).toBeTruthy();
    const caixa = wrapper.find('[data-secao="vitrine"] .esc-vitrine__caixa');
    expect(caixa.find('h2').attributes('id')).toBe('esc-vitrine-titulo');
    expect(caixa.find('a[href="/menu"]').text()).toBe('Ver cardápio');
    expect(caixa.find('ul').exists()).toBe(true);
  });

  it('o palco traz o filtro que neutraliza o fundo da foto, sem texto, e a vitrine mostra a legenda do pedido com o carrinho vazio', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const svg = wrapper.find('[data-secao="palco"] svg');
    expect(svg.attributes('aria-hidden')).toBe('true');
    expect(svg.find('filter#esc-palco-neutro').exists()).toBe(true);
    expect(svg.text()).toBe('');
    // O h1 fica antes do texto e do botão (a ordem do DOM é foto, h1, texto e botão)
    const palco = wrapper.find('[data-secao="palco"] .esc-palco__texto');
    expect(palco.element.firstElementChild.tagName).toBe('H1');
    expect(palco.find('a[href="/menu"]').text()).toBe('Ver cardápio');
    expect(useCartStore().items).toHaveLength(0);
    const legenda = wrapper.find('[data-secao="vitrine"] .esc-vitrine__legenda');
    expect(legenda.text()).toBe('No seu pedido aparece nos lanches que você já adicionou');
  });

  it('a nav Principal tem Início, Cardápio e Entrar, sem botão de menu, e o carrinho tem o nome do contador', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const nav = wrapper.find('nav[aria-label="Principal"]');
    expect(nav.findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(nav.find('a[aria-current="page"]').text()).toBe('Início');
    expect(wrapper.find('header button').exists()).toBe(false);
    expect(wrapper.find('a[href="/cart"]').attributes('aria-label')).toBe('Carrinho, vazio');
  });

  it('a vitrine mostra todos os lanches em cards, com h3 e o id do título', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const cards = wrapper.findAll('[data-secao="vitrine"] article');
    expect(cards).toHaveLength(produtos.foods.length);
    expect(cards[0].attributes('aria-labelledby')).toBe(`esc-lanche-${produtos.foods[0].id}`);
    expect(cards[0].find('h3').text()).toBe(produtos.foods[0].name);
  });

  it('o lanche no pedido sobe de degrau e mostra a marca com a soma das linhas', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const lanche = produtos.foods[0];
    const card = () => wrapper.findAll('[data-secao="vitrine"] article')[0];
    expect(card().classes()).not.toContain('is-no-pedido');
    useCartStore().items.push(item(lanche, 1), item(lanche, 2));
    await nextTick();
    expect(card().classes()).toContain('is-no-pedido');
    expect(card().find('.esc-marca-pedido').text()).toContain('No seu pedido: 3 itens');
    // Uma bebida com o mesmo id não marca o lanche
    useCartStore().items.splice(0);
    useCartStore().items.push({ ...item(produtos.drinks[0]), productId: lanche.id });
    await nextTick();
    expect(card().classes()).not.toContain('is-no-pedido');
  });

  it('a junto traz Bebidas e Sobremesas em linhas, com h4 de id por categoria', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="junto"]');
    expect(secao.find('h2').text()).toBe('Junto com o lanche');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Bebidas', 'Sobremesas']);
    expect(secao.findAll('[data-grupo]').map((g) => g.attributes('data-grupo'))).toEqual(['drinks', 'desserts']);
    expect(secao.findAll('article.esc-linha')).toHaveLength(produtos.drinks.length + produtos.desserts.length);
    const ids = secao.findAll('h4').map((h) => h.attributes('id'));
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids[0]).toBe(`esc-junto-drinks-${produtos.drinks[0].id}`);
  });

  it('a linha no pedido mostra a marca compacta depois do preço', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    useCartStore().items.push(item(produtos.drinks[0], 2));
    await nextTick();
    const linha = wrapper.find('[data-grupo="drinks"] article');
    expect(linha.classes()).toContain('is-no-pedido');
    expect(linha.find('.esc-linha__preco .esc-marca-pedido--compacta').text()).toContain('No seu pedido: 2 itens');
  });

  it('um grupo vazio some junto com o título', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.menuItems.desserts = [];
    await nextTick();
    const secao = wrapper.find('[data-secao="junto"]');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Bebidas']);
  });

  it('o turno mostra o horário real e a faixa acesa cruzando a meia-noite', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="turno"]');
    expect(secao.find('h2').text()).toBe('Horário');
    expect(secao.find('.esc-turno__horario').text()).toBe('Terça a sexta, das 13h à 01h');
    const faixa = secao.find('.esc-faixa');
    expect(faixa.attributes('aria-hidden')).toBe('true');
    expect(faixa.find('.esc-faixa__acesa').attributes('style')).toContain('grid-column: 2 / 14');
    expect(faixa.find('.esc-faixa__corte').exists()).toBe(true);
  });

  it('o rodapé mostra o endereço, o WhatsApp e o e-mail reais, com rótulo e valor separados', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const rodape = wrapper.find('footer');
    expect(rodape.text()).toContain('Rua Beira da Praia - Navegantes, SC');
    expect(rodape.text()).toContain('contato@smashburger.com.br');
    const whatsapp = rodape.find('a[href^="https://wa.me/"]');
    expect(whatsapp.find('.esc-contato__rotulo').text()).toBe('WhatsApp');
    expect(whatsapp.find('.esc-contato__valor').text()).toContain('+55 47 5 6355 3265');
    expect(whatsapp.text()).not.toContain('·');
    const externos = rodape.findAll('a[target="_blank"]');
    expect(externos).toHaveLength(2);
    for (const a of externos) {
      expect(a.attributes('rel')).toBe('noopener noreferrer');
      expect(a.text()).toContain('(abre em nova aba)');
    }
    const nav = rodape.find('nav[aria-label="Rodapé"]');
    expect(nav.findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(nav.find('a[aria-current]').exists()).toBe(false);
  });
});
