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
