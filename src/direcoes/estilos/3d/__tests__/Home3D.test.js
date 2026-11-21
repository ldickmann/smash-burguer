// Contrato da Home nova: um h1, as seções do desenho na ordem, botões "Adicionar <nome>" só de
// produtos reais e a Home montando com o cardápio vazio, sem quebrar e com o caminho para o cardápio.
// Mais os widgets do estilo: o alternador "Juntar camadas", a bandeja de alturas diferentes e os
// degraus (os adicionais do "Personalize" e o carrinho do "Peça").
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { useCartStore } from '@/stores/cart';
import { formatPrice } from '@/utils/formatters';
import Home from '../Home3D.vue';
import desenho from '../../../../../docs/direcoes/desenho/3d.json';
import { botoesAdicionar, montarHome, nomesProdutos } from '../../../compartilhado/__tests__/montarHome.js';

const ESTILO = '3d';
const VAZIO = 'Nada nesta categoria por enquanto';
const CONTRATO_CARRINHO = /^Carrinho,? (vazio|\d+ itens?)$/;
let wrapper;
afterEach(() => wrapper?.unmount());

// Nome acessível simples: aria-label, ou o texto sem o que está em aria-hidden
const nomeAcessivel = (el) => {
  const rotulo = el.getAttribute('aria-label');
  if (rotulo) return rotulo.trim();
  const copia = el.cloneNode(true);
  copia.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
  return copia.textContent.replace(/\s+/g, ' ').trim();
};

const linkPeca = (w) => w.find('[data-secao="degraus"] a[href="/cart"]');

describe('Home nova em 3D e gradientes suaves', () => {
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

  it('cada "Adicionar <nome>" é de um produto real, e os 11 produtos têm o seu', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const nomes = botoesAdicionar(wrapper);
    expect(nomes.length).toBeGreaterThan(0);
    expect(nomes.filter((n) => !nomesProdutos(produtos).includes(n))).toEqual([]);
    expect([...nomes].sort()).toEqual([...nomesProdutos(produtos)].sort());
  });

  it('monta com o cardápio vazio, sem botões de adicionar e com o caminho para o cardápio', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO, cardapio: 'vazio' }));
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(botoesAdicionar(wrapper)).toEqual([]);
    expect(wrapper.find('main a[href="/menu"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-secao]').map((s) => s.attributes('data-secao'))).toEqual(desenho.secoes);
    expect(wrapper.find('[data-secao="fileira"]').text()).toContain(VAZIO);
    expect(wrapper.find('[data-secao="bandeja"]').text()).toContain(VAZIO);
    expect(wrapper.find('[data-secao="fileira"] button[aria-pressed]').exists()).toBe(false);
  });

  it('a nav Principal tem Início, Cardápio e Entrar, sem botão de menu', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const nav = wrapper.find('nav[aria-label="Principal"]');
    expect(nav.findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(nav.find('a[aria-current="page"]').text()).toBe('Início');
    expect(wrapper.find('header button[aria-expanded]').exists()).toBe(false);
  });

  it('a fileira desenha os seis hambúrgueres, e "Juntar camadas" troca o aria-pressed das seis pilhas', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const fileira = wrapper.find('[data-secao="fileira"]');
    expect(fileira.find('h2').text()).toBe('Hambúrgueres');
    expect(fileira.findAll('.d3-pilha')).toHaveLength(6);
    expect(fileira.findAll('h3').map((h) => h.text())).toEqual([
      'Cheese Bacon',
      'Smash Burger',
      'Veggie Burger',
      'X-Salada',
      'Chicken Burger',
      'Burger Picanha',
    ]);
    const botao = fileira.find('button[aria-pressed]');
    expect(botao.text()).toBe('Juntar camadas');
    expect(botao.attributes('aria-pressed')).toBe('false');
    await botao.trigger('click');
    expect(botao.attributes('aria-pressed')).toBe('true');
    expect(fileira.findAll('.d3-pilha.is-junta')).toHaveLength(6);
    await botao.trigger('click');
    expect(botao.attributes('aria-pressed')).toBe('false');
    expect(fileira.findAll('.d3-pilha.is-junta')).toHaveLength(0);
  });

  it('o eixo mostra as linhas presentes, de cima para baixo, e as pilhas são decorativas', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const eixo = wrapper.find('[data-secao="fileira"] .d3-fileira__eixo');
    expect(eixo.attributes('aria-hidden')).toBe('true');
    expect(eixo.findAll('li').map((li) => li.text())).toEqual([
      'Pão de hambúrguer',
      'Ketchup',
      'Alface',
      'Tomate',
      'Pickles',
      'Pepino',
      'Cebola',
      'Bacon',
      'Queijo',
      'Hambúrguer',
      'Maionese',
      'Pão de hambúrguer',
    ]);
    for (const pilha of wrapper.findAll('.d3-pilha')) expect(pilha.attributes('aria-hidden')).toBe('true');
  });

  it('um lanche com ingrediente fora do mapa sai da fileira e entra na bandeja', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.foods[0].ingredients = [...produtos.foods[0].ingredients, 'Ingrediente novo'];
    await nextTick();
    expect(wrapper.findAll('[data-secao="fileira"] .d3-pilha')).toHaveLength(5);
    const bandeja = wrapper.find('[data-secao="bandeja"]');
    expect(bandeja.findAll('h3').map((h) => h.text())).toContain('Cheese Bacon');
    expect(botoesAdicionar(wrapper)).toContain('Cheese Bacon');
  });

  it('na bandeja, a Batata Frita fica deitada (4:3), as bebidas em pé (3:4) e a sobremesa em 4:5', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const bandeja = wrapper.find('[data-secao="bandeja"]');
    expect(bandeja.find('h2').text()).not.toMatch(/junto/i);
    const itens = bandeja.findAll('article').map((a) => ({
      nome: a.find('h3').text(),
      quadro: a.find('.d3-foto__quadro').attributes('style'),
      altura: a.find('img').attributes('height'),
    }));
    expect(itens.map((i) => i.nome)).toEqual([
      'Batata Frita',
      'Copo de Refrigerante',
      'Coca Cola Lata',
      'Suco de Abacaxi',
      'Sorvete de Pote',
    ]);
    expect(itens[0].quadro).toContain('4 / 3');
    expect(itens[0].altura).toBe('720');
    for (const bebida of itens.slice(1, 4)) {
      expect(bebida.quadro).toContain('3 / 4');
      expect(bebida.altura).toBe('1280');
    }
    expect(itens[4].quadro).toContain('4 / 5');
    expect(itens[4].altura).toBe('1200');
  });

  it('a sobremesa mostra a contagem calculada dos adicionais, e só ela', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const detalhes = wrapper.findAll('[data-secao="bandeja"] .d3-ficha__detalhe').map((p) => p.text());
    expect(detalhes).toEqual([`${produtos.dessertAdditionals.length} adicionais`]);
  });

  it('o degrau "Personalize" tem a lista "Adicionais" com os cinco itens e o preço de formatPrice', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const lista = wrapper.find('[data-secao="degraus"] ul[aria-label="Adicionais"]');
    const itens = lista.findAll(':scope > li');
    expect(itens).toHaveLength(produtos.foodAdditionals.length);
    produtos.foodAdditionals.forEach((adicional, i) => {
      expect(itens[i].find('.d3-objeto__nome').text()).toBe(adicional.name);
      expect(itens[i].find('.d3-objeto__preco').text()).toBe(`+ ${formatPrice(adicional.price)}`);
      expect(itens[i].find('.d3-objeto__forma').attributes('aria-hidden')).toBe('true');
    });
    expect(lista.findAll('button, a, [tabindex]')).toHaveLength(0);
  });

  it('as lajes têm só o h3 e o objeto: nenhum parágrafo com o cardápio de hoje', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const lajes = wrapper.findAll('[data-secao="degraus"] ol > li');
    expect(lajes.map((l) => l.find('h3').text())).toEqual(['Escolha', 'Personalize', 'Peça']);
    expect(wrapper.findAll('[data-secao="degraus"] ol p')).toHaveLength(0);
    expect(lajes[0].find('a[href="/menu"]').text()).toBe('Ver cardápio');
  });

  it('sem adicionais, a laje do meio mostra o aviso e a escada continua', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.foodAdditionals = [];
    await nextTick();
    const lajes = wrapper.findAll('[data-secao="degraus"] ol > li');
    expect(lajes).toHaveLength(3);
    expect(lajes[1].find('p').text()).toBe(VAZIO);
  });

  it('um link só casa com o nome do contrato (o do cabeçalho), e o do "Peça" acompanha a contagem', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const casam = () => wrapper.findAll('a').filter((a) => CONTRATO_CARRINHO.test(nomeAcessivel(a.element)));
    expect(casam()).toHaveLength(1);
    expect(casam()[0].element.closest('header')).toBeTruthy();
    expect(nomeAcessivel(linkPeca(wrapper).element)).toBe('Seu carrinho está vazio');
    expect(linkPeca(wrapper).find('.d3-degraus__selo').exists()).toBe(false);

    const carrinho = useCartStore();
    carrinho.items.push({
      productId: 1,
      category: 'foods',
      name: 'Cheese Bacon',
      image: '',
      unitPrice: 25.99,
      quantity: 1,
      removedIngredients: [],
      additionals: [],
      observation: '',
    });
    await nextTick();
    expect(nomeAcessivel(linkPeca(wrapper).element)).toBe('Seu carrinho, 1 item');
    expect(linkPeca(wrapper).find('.d3-degraus__selo').text()).toBe('1');
    expect(nomeAcessivel(wrapper.find('header a[href="/cart"]').element)).toBe('Carrinho, 1 item');
    // O padrão do contrato (itens?) casa a partir de dois itens
    carrinho.items[0].quantity = 2;
    await nextTick();
    expect(nomeAcessivel(linkPeca(wrapper).element)).toBe('Seu carrinho, 2 itens');
    expect(casam()).toHaveLength(1);
    expect(nomeAcessivel(casam()[0].element)).toBe('Carrinho, 2 itens');
  });

  it('o rodapé mostra o endereço, o WhatsApp separado do número e o e-mail, sem as redes', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const rodape = wrapper.find('footer');
    expect(rodape.text()).toContain('Terça a sexta, das 13h à 01h');
    expect(rodape.text()).toContain('Rua Beira da Praia - Navegantes, SC');
    expect(rodape.text()).toContain('contato@smashburger.com.br');
    const whatsapp = rodape.find('a[href^="https://wa.me/"]');
    expect(whatsapp.find('.d3-rodape__tipo').text()).toBe('WhatsApp');
    expect(whatsapp.text()).toContain('+55 47 5 6355 3265');
    expect(whatsapp.text()).not.toContain('·');
    for (const a of rodape.findAll('a[target="_blank"]')) {
      expect(a.attributes('rel')).toBe('noopener noreferrer');
      expect(a.text()).toContain('(abre em nova aba)');
    }
    expect(rodape.find('a[href*="facebook"], a[href*="instagram"]').exists()).toBe(false);
  });
});
