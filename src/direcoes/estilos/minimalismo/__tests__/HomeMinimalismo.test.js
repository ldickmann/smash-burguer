// Contrato da Home nova: um h1, as seções do desenho na ordem, botões "Adicionar <nome>" só de
// produtos reais e a Home montando com o cardápio vazio, sem quebrar e com o caminho para o cardápio.
// Mais os widgets do estilo: o cardápio inteiro em lista, a regra "uma foto por vez" do "Ver foto",
// as notas dos adicionais, o sumário do hero e o atendimento.
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import Home from '../HomeMinimalismo.vue';
import desenho from '../../../../../docs/direcoes/desenho/minimalismo.json';
import { botoesAdicionar, montarHome, nomesProdutos } from '../../../compartilhado/__tests__/montarHome.js';
import { TEXTOS } from '../textos';

const ESTILO = 'minimalismo';
let wrapper;
afterEach(() => wrapper?.unmount());

const SECOES = { foods: 'hamburgueres', drinks: 'bebidas', desserts: 'sobremesas' };
const verFoto = (w, secao) => w.findAll(`[data-secao="${secao}"] button[data-ver-foto]`);
const abertos = (w) => w.findAll('button[data-ver-foto][aria-expanded="true"]');

describe('Home nova em Minimalismo', () => {
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
    for (const secao of Object.values(SECOES)) {
      const el = wrapper.find(`[data-secao="${secao}"]`);
      expect(el.find('h2').exists()).toBe(true);
      expect(el.text()).toContain(TEXTOS.categoriaVazia);
      expect(el.text()).not.toContain(TEXTOS.adicionais);
    }
    expect(wrapper.findAll('button[data-ver-foto]')).toHaveLength(0);
  });

  it('mostra o cardápio inteiro: um "Adicionar <nome>" por produto, nas três categorias', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    for (const [chave, secao] of Object.entries(SECOES)) {
      const nomes = wrapper
        .findAll(`[data-secao="${secao}"] button[aria-label^="Adicionar "]`)
        .map((b) => b.attributes('aria-label').replace(/^Adicionar /, ''));
      expect(nomes).toEqual(produtos[chave].map((p) => p.name));
    }
    // O nome de cada produto é um h3, e o pontilhado fica fora do leitor de tela
    expect(wrapper.findAll('[data-secao="hamburgueres"] li h3').map((h) => h.text())).toEqual(
      produtos.foods.map((p) => p.name)
    );
    expect(wrapper.findAll('.mn-linha-preco__pontos').every((p) => p.attributes('aria-hidden') === 'true')).toBe(true);
  });

  it('a nav Principal tem Início, Cardápio e Entrar, e o carrinho tem o nome do contador', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const nav = wrapper.find('nav[aria-label="Principal"]');
    expect(nav.findAll('a').map((a) => a.text().replace(/\s+/g, ' ').trim())).toEqual([
      'Início',
      'Cardápio',
      'Entrar',
      'Carrinho 0 itens',
    ]);
    expect(nav.find('a[aria-current="page"]').text()).toBe('Início');
  });

  it('começa com a foto do primeiro lanche aberta, e só ela', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const abertosAgora = abertos(wrapper);
    expect(abertosAgora).toHaveLength(1);
    expect(abertosAgora[0].attributes('aria-label')).toBe(`${TEXTOS.verFoto} de ${produtos.foods[0].name}`);
    const painel = document.getElementById(abertosAgora[0].attributes('aria-controls'));
    expect(painel.style.display).not.toBe('none');
    expect(painel.querySelector('img').getAttribute('alt')).toBe(produtos.foods[0].name);
  });

  it('"Ver foto" abre uma linha e fecha a anterior, em qualquer categoria, e fecha a própria', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const lanche = verFoto(wrapper, 'hamburgueres')[0];
    const bebida = verFoto(wrapper, 'bebidas')[0];
    await bebida.trigger('click');
    await nextTick();
    expect(bebida.attributes('aria-expanded')).toBe('true');
    expect(lanche.attributes('aria-expanded')).toBe('false');
    expect(document.getElementById(lanche.attributes('aria-controls')).style.display).toBe('none');
    expect(abertos(wrapper)).toHaveLength(1);

    await bebida.trigger('click');
    await nextTick();
    expect(abertos(wrapper)).toHaveLength(0);
  });

  it('um produto sem imagem fica sem "Ver foto"', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const antes = verFoto(wrapper, 'bebidas').length;
    produtos.updateProduct('drinks', produtos.drinks[0].id, { image: '' });
    await nextTick();
    expect(verFoto(wrapper, 'bebidas')).toHaveLength(antes - 1);
    expect(wrapper.findAll('[data-secao="bebidas"] button[aria-label^="Adicionar "]')).toHaveLength(produtos.drinks.length);
  });

  it('o produto aberto que some fecha a foto, sem abrir outra', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.removeProduct('foods', produtos.foods[0].id);
    await nextTick();
    await nextTick();
    expect(abertos(wrapper)).toHaveLength(0);
  });

  it('as notas dos adicionais ficam nos lanches e na sobremesa, e somem com a lista vazia', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const nota = (secao) => wrapper.find(`[data-secao="${secao}"] .mn-nota`);
    expect(nota('hamburgueres').findAll('li')).toHaveLength(produtos.foodAdditionals.length);
    expect(nota('sobremesas').findAll('li')).toHaveLength(produtos.dessertAdditionals.length);
    expect(nota('bebidas').exists()).toBe(false);
    expect(nota('hamburgueres').text()).toContain(TEXTOS.notaAdicionais);

    produtos.foodAdditionals = [];
    await nextTick();
    expect(nota('hamburgueres').exists()).toBe(false);
  });

  it('o sumário do hero leva às quatro seções, mantendo o query', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const sumario = wrapper.find(`[data-secao="hero"] nav[aria-label="${TEXTOS.nestaPagina}"]`);
    const links = sumario.findAll('a');
    expect(links.map((a) => a.text())).toEqual(['Hambúrgueres', 'Bebidas', 'Sobremesas', TEXTOS.atendimento]);
    for (const a of links) {
      expect(a.attributes('href')).toMatch(/captura=1#mn-/);
      const id = a.attributes('href').split('#').pop();
      expect(document.getElementById(id)?.tagName).toBe('H2');
    }
    expect(sumario.find('[aria-current]').exists()).toBe(false);
  });

  it('o atendimento mostra horário, endereço, WhatsApp e e-mail com os links reais', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="atendimento"]');
    expect(secao.findAll('dt').map((d) => d.text())).toEqual(['Horário', 'Endereço', TEXTOS.contato]);
    expect(secao.text()).toContain('Terça a sexta, das 13h à 01h');
    expect(secao.find('a[href^="https://www.google.com/maps/"]').attributes('target')).toBe('_blank');
    expect(secao.find('a[href^="https://wa.me/"]').text()).toContain('6355 3265');
    expect(secao.find('a[href^="mailto:"]').attributes('target')).toBeUndefined();
  });
});
