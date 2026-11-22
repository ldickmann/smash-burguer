// Contrato da Home de produção (SPEC-material §5.2 e §1.1, item 13): os casos de
// src/direcoes/estilos/material/__tests__/HomeMaterial.test.js, na rota "/" e dentro do MainLayout
// real (cabeçalho, toolbar e rodapé da etapa 4). As seções e a ordem vêm do desenho
// (docs/direcoes/desenho/material.json), com a seção dos adicionais da etapa 5a. Mais o contrato da
// produção: o "Adicionar" abre o modal Personalizar da HomeView (provide do personalizar), sem
// moldura nem tokens do acervo, e nenhuma seção usa o carrinho nem calcula preço.
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h, nextTick } from 'vue';
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import { CATEGORIES, useProductsStore } from '@/stores/products';
import { formatPrice } from '@/utils/formatters';
import MainLayout from '@/layouts/MainLayout.vue';
import HomeView from '@/views/HomeView.vue';
import ModalAdditional from '@/components/ModalAdditional.vue';
import desenho from '../../docs/direcoes/desenho/material.json';

const Vazio = { render: () => null };
const Raiz = defineComponent({ render: () => h(RouterView) });

// APIs do navegador que o jsdom não tem e que a moldura ou a Home usam
function prepararNavegador() {
  window.matchMedia ??= (consulta) => ({
    matches: false,
    media: consulta,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  });
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  globalThis.IntersectionObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

let wrapper;
afterEach(() => wrapper?.unmount());

// A Home em "/" dentro do MainLayout, com Pinia nova e o cardápio real ou vazio. O modal Personalizar,
// a assinatura e os ícones viram stubs (o <dialog> nativo não existe no jsdom; o fluxo real é
// conferido no navegador, flow.mjs)
async function montarHome({ cardapio = 'real' } = {}) {
  prepararNavegador();
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  const produtos = useProductsStore();
  if (cardapio === 'vazio') {
    produtos.menuItems = Object.fromEntries(CATEGORIES.map((c) => [c, []]));
    produtos.loadedCategories = [...CATEGORIES];
  }
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        component: MainLayout,
        children: [
          { path: '', name: 'home', component: HomeView },
          { path: ':resto(.*)*', name: 'outra', component: Vazio },
        ],
      },
    ],
  });
  await router.push('/');
  await router.isReady();
  wrapper = mount(Raiz, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: {
        'font-awesome-icon': { template: '<svg aria-hidden="true" />' },
        ModalAdditional: true,
        AssinaturaEncaixe: true,
      },
    },
  });
  await flushPromises();
  return { wrapper, produtos };
}

const nomesProdutos = (produtos) => CATEGORIES.flatMap((c) => produtos[c] ?? []).map((p) => p.name);
const botoesAdicionar = (w) =>
  w.findAll('button[aria-label^="Adicionar "]').map((b) => b.attributes('aria-label').replace(/^Adicionar /, ''));
const traseiros = (w) => w.findAll('[data-secao="lanches"] button[aria-expanded]');
const secoes = (w) => w.findAll('main [data-secao]').map((s) => s.attributes('data-secao'));

describe('HomeView (Home do Material 3 na produção)', () => {
  it('tem um h1 só e as seções do desenho, na ordem, sem a moldura do acervo', async () => {
    await montarHome();
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.find('main h1').text()).toBe('Smash na chapa, entregue quente');
    expect(secoes(wrapper)).toEqual(desenho.secoes);
    for (const secao of wrapper.findAll('main [data-secao]')) {
      expect(secao.element.tagName).toBe('SECTION');
      const titulo = secao.attributes('aria-labelledby');
      expect(titulo && document.getElementById(titulo)?.textContent.trim()).toBeTruthy();
    }
    expect(document.documentElement.hasAttribute('data-direcao')).toBe(false);
    expect(wrapper.find('.moldura').exists()).toBe(false);
  });

  it('cada "Adicionar <nome>" é de um produto real', async () => {
    const { produtos } = await montarHome();
    const nomes = botoesAdicionar(wrapper);
    expect(nomes.length).toBeGreaterThan(0);
    expect(nomes.filter((n) => !nomesProdutos(produtos).includes(n))).toEqual([]);
  });

  it('"Adicionar" abre o modal Personalizar da HomeView com o produto', async () => {
    await montarHome();
    const modal = wrapper.findComponent(ModalAdditional);
    expect(modal.props('open')).toBe(false);
    await wrapper.find('button[aria-label="Adicionar Cheese Bacon"]').trigger('click');
    expect(modal.props('open')).toBe(true);
    expect(modal.props('product').name).toBe('Cheese Bacon');
    await wrapper.find('button[aria-label="Adicionar Coca Cola Lata"]').trigger('click');
    expect(modal.props('product').name).toBe('Coca Cola Lata');
  });

  it('monta com o cardápio vazio, sem botões de adicionar e com o caminho para o cardápio', async () => {
    await montarHome({ cardapio: 'vazio' });
    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(botoesAdicionar(wrapper)).toEqual([]);
    expect(wrapper.find('main a[href="/menu"]').exists()).toBe(true);
    expect(secoes(wrapper)).toEqual(desenho.secoes);
    expect(wrapper.find('[data-secao="lanches"]').text()).toContain('Nada nesta categoria por enquanto');
    expect(wrapper.find('[data-secao="bebidas-e-sobremesas"]').text()).toContain('Nada nesta categoria por enquanto');
    // Sem lanches nem sobremesas, não há onde acrescentar: ficam o h2 e o caminho para o cardápio
    const adicionais = wrapper.find('[data-secao="monte-o-seu"]');
    expect(adicionais.find('h2').text()).toBe('Adicionais');
    expect(adicionais.findAll('h3, li')).toHaveLength(0);
    expect(adicionais.find('a[href="/menu"]').exists()).toBe(true);
  });

  it('a nav Principal tem Início, Cardápio e Entrar, e o carrinho tem o nome do contador', async () => {
    await montarHome();
    const nav = wrapper.find('nav[aria-label="Principal"]');
    expect(nav.findAll('a').map((a) => a.text())).toEqual(['Início', 'Cardápio', 'Entrar']);
    expect(nav.find('a[aria-current="page"]').text()).toBe('Início');
    expect(wrapper.find('a[href="/cart"]').attributes('aria-label')).toBe('Carrinho, vazio');
  });

  it('o feed abre com o Smash Burger em destaque e mostra todos os lanches', async () => {
    const { produtos } = await montarHome();
    const cards = wrapper.findAll('[data-secao="lanches"] article');
    expect(cards).toHaveLength(produtos.foods.length);
    expect(cards[0].classes()).toContain('m3-cartao--destaque');
    expect(cards[0].find('h3').text()).toBe('Smash Burger');
  });

  it('sem o Smash Burger, o primeiro lanche vira o destaque', async () => {
    const { produtos } = await montarHome();
    const primeiro = produtos.foods.find((p) => p.name !== 'Smash Burger').name;
    produtos.foods.find((p) => p.name === 'Smash Burger').name = 'Smash Renomeado';
    await nextTick();
    const destaque = wrapper.find('[data-secao="lanches"] .m3-cartao--destaque');
    expect(destaque.find('h3').text()).toBe(primeiro);
  });

  it('a metade de trás do split abre a folha de ingredientes, uma por vez, e o Esc devolve o foco', async () => {
    await montarHome();
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
    await montarHome();
    const [primeiro] = traseiros(wrapper);
    await primeiro.trigger('click');
    document.body.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    await nextTick();
    expect(primeiro.attributes('aria-expanded')).toBe('false');
  });

  it('lanche sem ingredientes fica com o split de uma metade só', async () => {
    const { produtos } = await montarHome();
    produtos.foods.forEach((p) => (p.ingredients = []));
    await nextTick();
    expect(traseiros(wrapper)).toHaveLength(0);
    expect(botoesAdicionar(wrapper)).toContain('Smash Burger');
  });

  it('os adicionais aparecem em chips estáticos, com o acréscimo pelo formatPrice', async () => {
    const { produtos } = await montarHome();
    const secao = wrapper.find('[data-secao="monte-o-seu"]');
    expect(secao.find('h2').text()).toBe('Adicionais');
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

  it('o grupo de adicionais sem itens ou sem a categoria some junto com o título', async () => {
    const { produtos } = await montarHome();
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
    const { produtos } = await montarHome();
    const secao = wrapper.find('[data-secao="bebidas-e-sobremesas"]');
    expect(secao.find('h2').text()).toBe('Bebidas e sobremesas');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Bebidas', 'Sobremesas']);
    expect(secao.findAll('li')).toHaveLength(produtos.drinks.length + produtos.desserts.length);
    expect(secao.text()).not.toMatch(/adiciona(l|is)/);
  });

  it('um grupo vazio some junto com o título', async () => {
    const { produtos } = await montarHome();
    produtos.menuItems.desserts = [];
    await nextTick();
    const secao = wrapper.find('[data-secao="bebidas-e-sobremesas"]');
    expect(secao.findAll('h3').map((h) => h.text())).toEqual(['Bebidas']);
  });

  it('horário e contato mostra o horário, o endereço e os contatos reais, uma vez só na página', async () => {
    await montarHome();
    const secao = wrapper.find('[data-secao="onde"]');
    expect(secao.find('h2').text()).toBe('Horário e contato');
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
    // O rodapé da Home não repete a lista (decisão g)
    expect(wrapper.findAll('a[href^="https://wa.me/"]')).toHaveLength(1);
  });
});

// O ?raw das seções e das peças da Home: quem adiciona ao carrinho é o modal (useProductModal), e o
// preço sai sempre do formatPrice, pelo useCartaoProduto
const fontes = import.meta.glob(['../components/home/*.vue', '../components/M3*.vue'], {
  query: '?raw',
  import: 'default',
  eager: true,
});

describe('contrato das seções da Home', () => {
  it('nenhuma seção usa o carrinho nem calcula preço', () => {
    const arquivos = Object.keys(fontes);
    expect(arquivos.filter((a) => a.includes('/home/'))).toHaveLength(5);
    expect(arquivos).toContain('../components/M3CartaoLanche.vue');
    const usos = Object.entries(fontes)
      .filter(([, fonte]) => /useCartStore|cartStore|toFixed/.test(fonte))
      .map(([arquivo]) => arquivo);
    expect(usos).toEqual([]);
  });
});
