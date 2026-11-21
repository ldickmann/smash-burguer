// Contrato da Home nova: um h1, as seções do desenho na ordem, botões "Adicionar <nome>" só de
// produtos reais e a Home montando com o cardápio vazio, sem quebrar e com o caminho para o cardápio.
// Mais os widgets do estilo: as comandas no trilho, o expositor com as prateleiras, a impressora que
// imprime o carrinho (janela de três linhas, linhas ocultas e subtotal) e a coifa sem menu escondido.
import { afterEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import Home from '../HomeEsqueumorfismo.vue';
import desenho from '../../../../../docs/direcoes/desenho/esqueumorfismo.json';
import { botoesAdicionar, montarHome, nomesProdutos } from '../../../compartilhado/__tests__/montarHome.js';
import { useCartStore } from '@/stores/cart';
import { describeItem, formatPrice } from '@/utils/formatters';
import { TEXTOS } from '../textos';
import { LINHAS_VISIVEIS } from '../useCupom';

const ESTILO = 'esqueumorfismo';
let wrapper;
afterEach(() => wrapper?.unmount());

// Uma linha do carrinho como o modal Personalizar grava (o modal é stub no jsdom)
const linha = (produto, extra = {}) => ({
  productId: produto.id,
  category: produto.category,
  name: produto.name,
  image: produto.image,
  unitPrice: produto.price,
  quantity: 1,
  removedIngredients: [],
  additionals: [],
  observation: '',
  ...extra,
});

describe('Home nova em esqueumorfismo', () => {
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

  it('mostra "Adicionar" para os lanches, as bebidas e a sobremesa, na ordem do cardápio', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const esperados = [...produtos.foods, ...produtos.drinks, ...produtos.desserts].map((p) => p.name);
    expect(botoesAdicionar(wrapper)).toEqual(esperados);
    expect(wrapper.findAll('[data-secao="comandas"] article')).toHaveLength(produtos.foods.length);
  });

  it('com o cardápio vazio, ficam a comanda em branco e as duas prateleiras com o aviso', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO, cardapio: 'vazio' }));
    const comandas = wrapper.find('[data-secao="comandas"]');
    expect(comandas.find('.esq-comandas__branco').text()).toBe(TEXTOS.vazio);
    const expositor = wrapper.find('[data-secao="expositor"]');
    expect(expositor.findAll('h3').map((h) => h.text())).toEqual(['Bebidas', 'Sobremesas']);
    expect(expositor.findAll('.esq-prateleira__vazia').map((e) => e.text())).toEqual([TEXTOS.vazio, TEXTOS.vazio]);
  });

  it('as comandas mostram os ingredientes como linhas do ticket, sem "a partir de"', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="comandas"]');
    expect(secao.find('h2').text()).toBe('Hambúrgueres');
    expect(secao.text()).not.toMatch(/a partir de/i);
    const primeira = secao.find('article');
    expect(primeira.find('h3').text()).toBe(produtos.foods[0].name);
    const linhas = primeira.find('ul[aria-label="Ingredientes"]');
    expect(linhas.findAll('li').map((li) => li.text())).toEqual(produtos.foods[0].ingredients);
    expect(primeira.text()).toContain(formatPrice(produtos.foods[0].price));
  });

  it('um lanche criado no painel sem ingredientes mostra a descrição', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.foods[0].ingredients = undefined;
    await nextTick();
    const primeira = wrapper.find('[data-secao="comandas"] article');
    expect(primeira.find('ul[aria-label="Ingredientes"]').exists()).toBe(false);
    expect(primeira.text()).toContain(produtos.foods[0].description);
  });

  it('o expositor tem uma prateleira por categoria e a contagem calculada dos adicionais só na sobremesa', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const secao = wrapper.find('[data-secao="expositor"]');
    expect(secao.find('h2').text()).toBe(TEXTOS.expositor.titulo);
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Bebidas', 'Sobremesas']);
    expect(secao.findAll('h4')).toHaveLength(produtos.drinks.length + produtos.desserts.length);
    const contagem = `${produtos.dessertAdditionals.length} ${TEXTOS.expositor.adicionais}`;
    expect(secao.findAll('.esq-item__adicionais').map((p) => p.text())).toEqual([contagem]);
  });

  it('uma prateleira vazia continua, com o título e o aviso', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    produtos.menuItems.desserts = [];
    await nextTick();
    const secao = wrapper.find('[data-secao="expositor"]');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Bebidas', 'Sobremesas']);
    expect(secao.findAll('.esq-prateleira__vazia').map((e) => e.text())).toEqual([TEXTOS.vazio]);
  });

  it('com o carrinho vazio, o cupom diz que está vazio, sem repetir o "Ver cardápio" da chapa', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const cupom = wrapper.find('[data-secao="cupom"]');
    expect(cupom.find('h2').text()).toBe('Seu carrinho está vazio');
    expect(cupom.text()).toContain('Escolha um burger no cardápio para começar.');
    expect(cupom.find('a').exists()).toBe(false);
    expect(cupom.find('.esq-impressora__acao').exists()).toBe(false);
    expect(wrapper.findAll('main a[href="/menu"]')).toHaveLength(1);
    expect(cupom.find('ul').exists()).toBe(false);
    expect(cupom.find('.esq-impressora__led').classes()).not.toContain('is-aceso');
  });

  it('com quatro linhas no carrinho, imprime as três últimas, a linha oculta e o subtotal', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const carrinho = useCartStore();
    const [a, b, c] = produtos.foods;
    carrinho.items = [
      linha(a),
      linha(b, { quantity: 2 }),
      linha(c, { removedIngredients: ['Tomate', 'Cebola'], observation: 'bem passado' }),
      linha(produtos.drinks[0]),
    ];
    await nextTick();
    const cupom = wrapper.find('[data-secao="cupom"]');
    expect(cupom.find('h2').text()).toBe('Seu carrinho');
    const linhas = cupom.findAll('.esq-cupom__linha');
    expect(linhas).toHaveLength(LINHAS_VISIVEIS);
    expect(linhas[0].text()).toContain(`2× ${b.name}`);
    expect(linhas[0].text()).toContain(`${formatPrice(b.price)} ${TEXTOS.cupom.cada}`);
    for (const detalhe of describeItem(carrinho.items[2])) expect(linhas[1].text()).toContain(detalhe);
    expect(linhas[2].text()).toContain(produtos.drinks[0].name);
    expect(cupom.find('.esq-cupom__ocultos').text()).toBe(`+ 1 item ${TEXTOS.cupom.ocultos}`);
    expect(cupom.find('dl dd').text()).toBe(formatPrice(carrinho.subtotal));
    expect(cupom.find('a[href="/cart"]').text()).toBe(TEXTOS.cupom.acao);
    expect(cupom.find('.esq-impressora__led').classes()).toContain('is-aceso');
  });

  it('uma linha nova depois da montagem faz o LED piscar', async () => {
    let produtos;
    ({ wrapper, produtos } = await montarHome(Home, { estilo: ESTILO }));
    const led = () => wrapper.find('.esq-impressora__led');
    expect(led().classes()).not.toContain('is-piscando');
    useCartStore().items.push(linha(produtos.foods[0]));
    await nextTick();
    await nextTick();
    expect(led().classes()).toContain('is-piscando');
  });

  it('a coifa tem os três links à vista, sem menu escondido, e o carrinho com o nome do contador', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const header = wrapper.find('header');
    const nav = header.find('nav[aria-label="Principal"]');
    expect(nav.findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(nav.find('a[aria-current="page"]').text()).toBe('Início');
    expect(header.find('button[aria-controls]').exists()).toBe(false);
    const carrinho = header.find('a[href="/cart"]');
    expect(carrinho.attributes('aria-label')).toMatch(/^Carrinho,? (vazio|\d+ itens?)$/);
  });

  it('o rodapé mostra horário, endereço e contatos reais, sem as redes genéricas', async () => {
    ({ wrapper } = await montarHome(Home, { estilo: ESTILO }));
    const rodape = wrapper.find('footer');
    expect(rodape.text()).toContain('Terça a sexta, das 13h à 01h');
    expect(rodape.text()).toContain('Rua Beira da Praia - Navegantes, SC');
    expect(rodape.text()).toContain('+55 47 5 6355 3265');
    expect(rodape.text()).toContain('contato@smashburger.com.br');
    expect(rodape.find('.esq-rodape__contatos').text()).not.toContain('·');
    const externos = rodape.findAll('a[target="_blank"]');
    expect(externos).toHaveLength(2);
    for (const a of externos) {
      expect(a.attributes('rel')).toBe('noopener noreferrer');
      expect(a.text()).toContain('(abre em nova aba)');
    }
    expect(rodape.find('a[href*="facebook.com"], a[href*="instagram.com"]').exists()).toBe(false);
  });
});
