// CategoryTabs (SPEC-material §4.3 e §5.1): abaixo de lg o cabeçalho rola com a página e as abas
// grudam em top: 0; a partir de lg, abaixo do cabeçalho sticky. O IntersectionObserver da borda
// "grudada" segue a mesma regra, por um matchMedia de lg, e se refaz na troca.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CategoryTabs from '@/components/ui/CategoryTabs.vue';

const LG = '(min-width: 1024px)';
let observadores;
let consulta;

class ObservadorFalso {
  constructor(callback, opcoes) {
    this.callback = callback;
    this.opcoes = opcoes;
    this.desligado = false;
    observadores.push(this);
  }
  observe() {}
  disconnect() {
    this.desligado = true;
  }
}

function prepararTela(largaDeMais) {
  consulta = {
    matches: largaDeMais,
    ouvintes: new Set(),
    addEventListener: vi.fn((tipo, ouvinte) => consulta.ouvintes.add(ouvinte)),
    removeEventListener: vi.fn((tipo, ouvinte) => consulta.ouvintes.delete(ouvinte)),
  };
  vi.stubGlobal('matchMedia', vi.fn((media) => Object.assign(consulta, { media })));
}

function trocarTela(largaDeMais) {
  consulta.matches = largaDeMais;
  for (const ouvinte of consulta.ouvintes) ouvinte({ matches: largaDeMais, media: consulta.media });
}

const montar = () =>
  mount(CategoryTabs, {
    props: { options: [{ value: 'foods', label: 'Hambúrgueres' }], modelValue: 'foods' },
  });

beforeEach(() => {
  observadores = [];
  vi.stubGlobal('IntersectionObserver', ObservadorFalso);
  // --navbar-h: 4rem, com a fonte raiz de 16 px (64 px)
  document.documentElement.style.setProperty('--navbar-h', '4rem');
  document.documentElement.style.fontSize = '16px';
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute('style');
});

describe('CategoryTabs', () => {
  it('abaixo de lg, o observador olha o topo da janela (as abas grudam em top: 0)', () => {
    prepararTela(false);
    montar();
    expect(window.matchMedia).toHaveBeenCalledWith(LG);
    expect(observadores).toHaveLength(1);
    expect(observadores[0].opcoes.rootMargin).toBe('0px 0px 0px 0px');
  });

  it('a partir de lg, o observador desconta o cabeçalho sticky', () => {
    prepararTela(true);
    montar();
    expect(observadores.at(-1).opcoes.rootMargin).toBe('-64px 0px 0px 0px');
  });

  it('ao cruzar lg, o observador antigo se desliga e um novo nasce com a margem certa', () => {
    prepararTela(false);
    montar();
    trocarTela(true);
    expect(observadores).toHaveLength(2);
    expect(observadores[0].desligado).toBe(true);
    expect(observadores[1].opcoes.rootMargin).toBe('-64px 0px 0px 0px');

    trocarTela(false);
    expect(observadores[1].desligado).toBe(true);
    expect(observadores[2].opcoes.rootMargin).toBe('0px 0px 0px 0px');
  });

  it('depois da troca, o observador novo é quem liga a borda', async () => {
    prepararTela(false);
    const wrapper = montar();
    trocarTela(true);
    // A sentinela passou por baixo do cabeçalho sticky (10 px do topo, menos que os 64 dele)
    observadores[1].callback([{ isIntersecting: false, boundingClientRect: { top: 10 } }]);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.category-tabs').classes()).toContain('is-stuck');
  });

  it('ao desmontar, solta o matchMedia e desliga o observador', () => {
    prepararTela(false);
    const wrapper = montar();
    wrapper.unmount();
    expect(consulta.ouvintes.size).toBe(0);
    expect(observadores.every((o) => o.desligado)).toBe(true);
  });
});

// Grupo conectado com rádios nativos (docs/direcoes/desenho/cardapio.md, §5.2 e §9): escolha
// exclusiva é rádio na APG [93]; o teclado e o estado vêm do navegador [92][96]
describe('CategoryTabs: grupo de rádios', () => {
  const OPCOES = [
    { value: 'foods', label: 'Hambúrgueres' },
    { value: 'drinks', label: 'Bebidas' },
    { value: 'desserts', label: 'Sobremesas' },
  ];
  const montarGrupo = (modelValue = 'foods') => {
    prepararTela(false);
    return mount(CategoryTabs, { props: { options: OPCOES, modelValue }, attachTo: document.body });
  };

  it('é um fieldset com a legend "Categorias", escondida', () => {
    const wrapper = montarGrupo();
    const legend = wrapper.find('fieldset.category-tabs__grupo > legend');
    expect(legend.exists()).toBe(true);
    expect(legend.text()).toBe('Categorias');
    expect(legend.classes()).toContain('visually-hidden');
    wrapper.unmount();
  });

  it('um rádio por opção, no mesmo name, com o do modelValue marcado', () => {
    const wrapper = montarGrupo('drinks');
    const radios = wrapper.findAll('input[type="radio"]');
    expect(radios.map((r) => r.element.value)).toEqual(['foods', 'drinks', 'desserts']);
    expect(new Set(radios.map((r) => r.attributes('name'))).size).toBe(1);
    expect(radios.map((r) => r.element.checked)).toEqual([false, true, false]);
    // Cada rádio tem o rótulo da opção como nome acessível (o label o envolve)
    const rotulos = wrapper.findAll('label.category-tabs__opcao').map((l) => l.text());
    expect(rotulos).toEqual(['Hambúrgueres', 'Bebidas', 'Sobremesas']);
    expect(wrapper.findAll('label.category-tabs__opcao.is-marcada').map((l) => l.text())).toEqual(['Bebidas']);
    wrapper.unmount();
  });

  it('as formas de início, meio e fim seguem a posição', () => {
    const wrapper = montarGrupo();
    const classes = wrapper.findAll('label.category-tabs__opcao').map((l) => l.classes());
    expect(classes[0]).toContain('category-tabs__opcao--inicio');
    expect(classes[1]).toContain('category-tabs__opcao--meio');
    expect(classes[2]).toContain('category-tabs__opcao--fim');
    wrapper.unmount();
  });

  it('o change de um rádio emite update:modelValue com o valor', async () => {
    const wrapper = montarGrupo();
    const bebidas = wrapper.find('input[value="drinks"]');
    bebidas.element.checked = true;
    await bebidas.trigger('change');
    expect(wrapper.emitted('update:modelValue')).toEqual([['drinks']]);
    wrapper.unmount();
  });

  it('nenhum aria-pressed, nenhum role="group" e nenhum botão', () => {
    const wrapper = montarGrupo();
    expect(wrapper.find('[aria-pressed]').exists()).toBe(false);
    expect(wrapper.find('[role="group"]').exists()).toBe(false);
    expect(wrapper.find('button').exists()).toBe(false);
    wrapper.unmount();
  });
});
