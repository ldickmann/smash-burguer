// Contrato da Home nova: um h1, as seções do desenho na ordem, botões "Adicionar <nome>" só de
// produtos reais e a Home montando com o cardápio vazio, sem quebrar e com o caminho para o cardápio.
// Mais os widgets do estilo: o teclado de rádio com o visor, a régua de adicionais, os poços dos
// acompanhamentos e a seção de horário e contato.
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import Home from '../HomeNeumorfismo.vue';
import desenho from '../../../../../docs/direcoes/desenho/neumorfismo.json';
import { botoesAdicionar, montarHome, nomesProdutos } from '../../../compartilhado/__tests__/montarHome.js';

const ESTILO = 'neumorfismo';
let wrapper;
afterEach(() => wrapper?.unmount());

const painel = (w) => w.find('[data-secao="painel"]');
const radios = (w) => painel(w).findAll('.neu-teclado__teclas input[type="radio"]');
const nomeNoVisor = (w) => painel(w).find('.neu-visor h3').text();

describe('Home nova em Neumorfismo', () => {
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
  });

  it('a nav Principal tem Início, Cardápio e Entrar, e o carrinho tem o nome do contador', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const nav = wrapper.find('nav[aria-label="Principal"]');
    expect(nav.findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(nav.find('a[aria-current="page"]').text()).toBe('Início');
    expect(wrapper.find('header a[href="/cart"]').attributes('aria-label')).toBe('Carrinho, vazio');
    expect(wrapper.find('header button[aria-expanded]').exists()).toBe(false);
  });

  it('o teclado tem uma tecla por lanche, com nome e preço, e o primeiro marcado no visor', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    expect(painel(wrapper).find('fieldset legend').text()).toBe('Escolha um lanche');
    const teclas = painel(wrapper).findAll('.neu-teclado__teclas > label');
    expect(teclas).toHaveLength(produtos.foods.length);
    expect(teclas[0].text()).toContain(produtos.foods[0].name);
    expect(teclas[0].text()).toMatch(/R\$\s?\d+,\d{2}/);
    expect(radios(wrapper)[0].element.checked).toBe(true);
    expect(nomeNoVisor(wrapper)).toBe(produtos.foods[0].name);
    expect(painel(wrapper).findAll('button[aria-label^="Adicionar "]').map((b) => b.attributes('aria-label'))).toEqual([
      `Adicionar ${produtos.foods[0].name}`,
    ]);
  });

  // As setas são as do navegador (rádio nativo): no jsdom, a troca é pela mudança do rádio; o
  // estado "pelas setas" é conferido no navegador pelos portões (desenho/neumorfismo.json)
  it('marcar outra tecla troca o lanche do visor e o botão de adicionar', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    await radios(wrapper)[1].setValue(true);
    expect(radios(wrapper)[1].element.checked).toBe(true);
    expect(nomeNoVisor(wrapper)).toBe(produtos.foods[1].name);
    expect(painel(wrapper).find('button[aria-label^="Adicionar "]').attributes('aria-label')).toBe(
      `Adicionar ${produtos.foods[1].name}`
    );
  });

  it('o visor lista os ingredientes e, sem eles, mostra a descrição', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const visor = () => painel(wrapper).find('.neu-visor');
    expect(visor().find('h4').text()).toBe('Ingredientes');
    expect(visor().findAll('li').map((li) => li.text())).toEqual(produtos.foods[0].ingredients);
    produtos.foods[0].ingredients = [];
    await nextTick();
    expect(visor().find('h4').exists()).toBe(false);
    expect(visor().text()).toContain(produtos.foods[0].description);
  });

  it('o lanche marcado que some do cardápio volta o visor ao primeiro da lista', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    await radios(wrapper)[2].setValue(true);
    const terceiro = produtos.foods[2].name;
    expect(nomeNoVisor(wrapper)).toBe(terceiro);
    produtos.menuItems.foods = produtos.foods.filter((p) => p.name !== terceiro);
    await nextTick();
    expect(nomeNoVisor(wrapper)).toBe(produtos.foods[0].name);
    expect(radios(wrapper)[0].element.checked).toBe(true);
  });

  it('o cabeçalho do painel não mostra "a partir de" nem preço fora das teclas e do visor', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const aparelho = painel(wrapper).find('.neu-painel__aparelho');
    expect(aparelho.text()).not.toMatch(/a partir de/i);
    const titulo = aparelho.find('h2');
    expect(titulo.text()).toBe('Hambúrgueres');
    // Nenhum irmão entre o h2 e o corpo do painel
    expect(titulo.element.nextElementSibling.classList.contains('neu-painel__corpo')).toBe(true);
    const precosForaDoLugar = aparelho
      .findAll('*')
      .filter((el) => el.element.children.length === 0 && /R\$/.test(el.text()))
      .filter((el) => !el.element.closest('.neu-teclado, .neu-visor, .neu-regua'));
    expect(precosForaDoLugar).toEqual([]);
  });

  it('a régua mostra os adicionais reais com o preço, e some com a lista vazia', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const regua = () => painel(wrapper).find('.neu-regua');
    expect(regua().find('h3').text()).toBe('Adicionais');
    expect(regua().findAll('li')).toHaveLength(produtos.foodAdditionals.length);
    expect(regua().find('button').exists()).toBe(false);
    produtos.foodAdditionals = [];
    await nextTick();
    expect(regua().exists()).toBe(false);
  });

  it('com os lanches vazios, o painel mostra o aviso e o link para o cardápio', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.menuItems.foods = [];
    await nextTick();
    expect(painel(wrapper).find('h2').text()).toBe('Hambúrgueres');
    expect(painel(wrapper).find('fieldset').exists()).toBe(false);
    expect(painel(wrapper).text()).toContain('Nada nesta categoria por enquanto');
    expect(painel(wrapper).find('a[href="/menu"]').exists()).toBe(true);
  });

  it('os acompanhamentos vêm em dois grupos de poços e um grupo vazio some com o título', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const secao = () => wrapper.find('[data-secao="acompanhamentos"]');
    expect(secao().find('h2').text()).toBe('Para acompanhar');
    expect(secao().findAll('h3').map((h) => h.text())).toEqual(['Bebidas', 'Sobremesas']);
    expect(secao().findAll('h4')).toHaveLength(produtos.drinks.length + produtos.desserts.length);
    expect(secao().findAll('.neu-acompanhamentos__sulco')).toHaveLength(1);
    produtos.menuItems.desserts = [];
    await nextTick();
    expect(secao().findAll('h3').map((h) => h.text())).toEqual(['Bebidas']);
    expect(secao().findAll('.neu-acompanhamentos__sulco')).toHaveLength(0);
    produtos.menuItems.drinks = [];
    await nextTick();
    expect(secao().text()).toContain('Nada nesta categoria por enquanto');
    expect(secao().find('a[href="/menu"]').exists()).toBe(true);
  });

  it('horário e contato mostra os dias abertos, o horário, o endereço e os contatos reais', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="contato"]');
    expect(secao.find('h2').text()).toBe('Horário e contato');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Horário', 'Endereço', 'Contato']);
    const semana = secao.find('.neu-semana');
    expect(semana.attributes('aria-hidden')).toBe('true');
    expect(semana.findAll('.is-aberto').map((d) => d.text())).toEqual(['ter', 'qua', 'qui', 'sex']);
    expect(secao.text()).toContain('Terça a sexta, das 13h à 01h');
    expect(secao.text()).toContain('Rua Beira da Praia - Navegantes, SC');
    expect(secao.text()).toContain('+55 47 5 6355 3265');
    expect(secao.text()).toContain('contato@smashburger.com.br');
    expect(secao.text()).not.toContain('·');
    const externos = secao.findAll('a[target="_blank"]');
    expect(externos).toHaveLength(2);
    for (const a of externos) {
      expect(a.attributes('rel')).toBe('noopener noreferrer');
      expect(a.text()).toContain('(abre em nova aba)');
    }
  });

  it('o rodapé repete a navegação, sem títulos e sem redes', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const rodape = wrapper.find('footer');
    expect(rodape.find('nav[aria-label="Rodapé"]').findAll('a').map((a) => a.text())).toEqual([
      'Início',
      'Cardápio',
      'Entrar',
    ]);
    expect(rodape.findAll('h1, h2, h3, h4')).toHaveLength(0);
    expect(rodape.find('a[href*="facebook"], a[href*="instagram"]').exists()).toBe(false);
  });
});
