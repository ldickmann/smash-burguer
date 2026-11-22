// Contrato da Home nova: um h1, as seções do desenho na ordem, botões "Adicionar <nome>" só de
// produtos reais e a Home montando com o cardápio vazio, sem quebrar e com o caminho para o cardápio.
// Mais os widgets do estilo: o feed com o destaque, o split button com a folha de ingredientes, os
// adicionais em chips estáticos (monte-o-seu) e as listas de bebidas e sobremesas e de horário e contato.
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { formatPrice } from '@/utils/formatters';
import Home from '../HomeMaterial.vue';
import desenho from '../../../../../docs/direcoes/desenho/material.json';
import { botoesAdicionar, montarHome, nomesProdutos } from '../../../compartilhado/__tests__/montarHome.js';

const ESTILO = 'material';
let wrapper;
afterEach(() => wrapper?.unmount());

const traseiros = (w) => w.findAll('[data-secao="lanches"] button[aria-expanded]');

describe('Home nova em Material 3 Expressive', () => {
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
    expect(wrapper.find('[data-secao="lanches"]').text()).toContain('Nada nesta categoria por enquanto');
    // Sem lanches nem sobremesas, não há onde acrescentar: ficam o h2 e o caminho para o cardápio
    const monte = wrapper.find('[data-secao="monte-o-seu"]');
    expect(monte.find('h2').text()).toBe('Monte o seu');
    expect(monte.findAll('h3, li')).toHaveLength(0);
    expect(monte.find('a[href="/menu"]').exists()).toBe(true);
  });

  it('a nav Principal tem Início, Cardápio e Entrar, e o carrinho tem o nome do contador', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const nav = wrapper.find('nav[aria-label="Principal"]');
    expect(nav.findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(nav.find('a[aria-current="page"]').text()).toBe('Início');
    expect(wrapper.find('a[href="/cart"]').attributes('aria-label')).toBe('Carrinho, vazio');
  });

  it('o feed abre com o Smash Burger em destaque e mostra todos os lanches', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const cards = wrapper.findAll('[data-secao="lanches"] article');
    expect(cards).toHaveLength(produtos.foods.length);
    expect(cards[0].classes()).toContain('m3-cartao--destaque');
    expect(cards[0].find('h3').text()).toBe('Smash Burger');
  });

  it('sem o Smash Burger, o primeiro lanche vira o destaque', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const primeiro = produtos.foods.find((p) => p.name !== 'Smash Burger').name;
    produtos.foods.find((p) => p.name === 'Smash Burger').name = 'Smash Renomeado';
    await nextTick();
    const destaque = wrapper.find('[data-secao="lanches"] .m3-cartao--destaque');
    expect(destaque.find('h3').text()).toBe(primeiro);
  });

  it('a metade de trás do split abre a folha de ingredientes, uma por vez, e o Esc devolve o foco', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const [primeiro, segundo] = traseiros(wrapper);
    expect(primeiro.attributes('aria-label')).toBe('Ingredientes de Smash Burger');
    const folha = document.getElementById(primeiro.attributes('aria-controls'));
    expect(folha).toBeTruthy();
    expect(folha.style.display).toBe('none');

    await primeiro.trigger('click');
    expect(primeiro.attributes('aria-expanded')).toBe('true');
    expect(folha.style.display).toBe('');
    expect(folha.textContent).toContain('Cebola caramelizada');

    await segundo.trigger('click');
    expect(primeiro.attributes('aria-expanded')).toBe('false');
    expect(segundo.attributes('aria-expanded')).toBe('true');

    segundo.element.blur();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await nextTick();
    expect(segundo.attributes('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(segundo.element);
  });

  it('o clique fora fecha a folha', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const [primeiro] = traseiros(wrapper);
    await primeiro.trigger('click');
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await nextTick();
    expect(primeiro.attributes('aria-expanded')).toBe('false');
  });

  it('lanche sem ingredientes fica com o split de uma metade só', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.foods.forEach((p) => (p.ingredients = []));
    await nextTick();
    expect(traseiros(wrapper)).toHaveLength(0);
    expect(botoesAdicionar(wrapper)).toContain('Smash Burger');
  });

  it('monte o seu mostra os adicionais em chips estáticos, com o acréscimo pelo formatPrice', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="monte-o-seu"]');
    expect(secao.find('h2').text()).toBe('Monte o seu');
    expect(secao.text()).toContain('Escolha, personalize e peça.');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['No hambúrguer', 'Na sobremesa']);
    // Cada lista tem o nome do próprio grupo (o h3 dela)
    const listas = secao.findAll('ul');
    expect(listas.map((ul) => ul.attributes('role'))).toEqual(['list', 'list']);
    const rotulos = listas.map((ul) => document.getElementById(ul.attributes('aria-labelledby')));
    expect(rotulos.map((h3) => h3?.tagName)).toEqual(['H3', 'H3']);
    expect(rotulos.map((h3) => h3.textContent.trim())).toEqual(['No hambúrguer', 'Na sobremesa']);
    const adicionais = [...produtos.foodAdditionals, ...produtos.dessertAdditionals];
    const chips = secao.findAll('li');
    expect(chips).toHaveLength(adicionais.length);
    chips.forEach((chip, i) => {
      expect(chip.find('.m3-monte__nome').text()).toBe(adicionais[i].name);
      expect(chip.find('.m3-monte__preco').text()).toBe(`+ ${formatPrice(adicionais[i].price)}`);
      expect(chip.find('a, button, [tabindex]').exists()).toBe(false);
    });
    // O chip é informação: o único alvo de foco da seção é o Ver cardápio
    expect(secao.findAll('a, button, [tabindex]').map((el) => el.attributes('href'))).toEqual(['/menu']);
  });

  it('monte o seu: o grupo sem adicionais ou sem a categoria some junto com o título', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const secao = () => wrapper.find('[data-secao="monte-o-seu"]');
    produtos.dessertAdditionals = [];
    await nextTick();
    expect(secao().findAll('h3').map((h) => h.text())).toEqual(['No hambúrguer']);
    expect(secao().findAll('li')).toHaveLength(produtos.foodAdditionals.length);

    produtos.dessertAdditionals = [{ id: 1, name: 'Granulado', price: 1.5, quantity: 0 }];
    produtos.menuItems.foods = [];
    await nextTick();
    expect(secao().findAll('h3').map((h) => h.text())).toEqual(['Na sobremesa']);
    expect(secao().findAll('li')).toHaveLength(1);
  });

  it('bebidas e sobremesas vêm em grupos, sem a contagem dos adicionais (os chips já mostram)', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="bebidas-e-sobremesas"]');
    expect(secao.find('h2').text()).toBe('Bebidas e sobremesas');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Bebidas', 'Sobremesas']);
    expect(secao.findAll('li')).toHaveLength(produtos.drinks.length + produtos.desserts.length);
    expect(secao.text()).not.toMatch(/adiciona(l|is)/);
  });

  it('um grupo vazio some junto com o título', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.menuItems.desserts = [];
    await nextTick();
    const secao = wrapper.find('[data-secao="bebidas-e-sobremesas"]');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Bebidas']);
  });

  it('onde e quando mostra o horário, o endereço e os contatos reais', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="onde"]');
    expect(secao.text()).toContain('Terça a sexta, das 13h à 01h');
    expect(secao.text()).toContain('Rua Beira da Praia - Navegantes, SC');
    expect(secao.text()).toContain('contato@smashburger.com.br');
    const whatsapp = secao.find('a[href^="https://wa.me/"]');
    expect(whatsapp.find('.m3-segmento__titulo').text()).toBe('WhatsApp');
    expect(whatsapp.find('.m3-segmento__apoio').text()).toBe('+55 47 5 6355 3265');
    expect(secao.text()).not.toContain('·');
    const externos = secao.findAll('a[target="_blank"]');
    expect(externos.length).toBe(2);
    for (const a of externos) {
      expect(a.attributes('rel')).toBe('noopener noreferrer');
      expect(a.text()).toContain('(abre em nova aba)');
      expect(a.find('.m3-segmento__fim').exists()).toBe(true);
    }
  });
});
