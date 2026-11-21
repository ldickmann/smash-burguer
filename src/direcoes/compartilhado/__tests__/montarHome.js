// Monta uma Home de direção no jsdom para o teste de contrato de cada estilo: Pinia nova, router
// em memória na rota do estilo e o cardápio real ou vazio. O modal Personalizar, a assinatura e os
// ícones viram stubs (o <dialog> nativo não existe no jsdom; o fluxo real é conferido no navegador).
import { flushPromises, mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import { CATEGORIES, useProductsStore } from '@/stores/products';

// APIs do navegador que o jsdom não tem e que a Home ou o vue3-carousel usam
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

/**
 * @param {object} Home componente da Home do estilo
 * @param {{ estilo: string, cardapio?: 'real' | 'vazio' }} opcoes
 */
export async function montarHome(Home, { estilo, cardapio = 'real' } = {}) {
  prepararNavegador();
  localStorage.clear();
  const pinia = createPinia();
  setActivePinia(pinia);
  const produtos = useProductsStore();
  if (cardapio === 'vazio') {
    produtos.menuItems = Object.fromEntries(CATEGORIES.map((c) => [c, []]));
    produtos.loadedCategories = [...CATEGORIES];
  }
  const inicio = `/direcoes/${estilo}`;
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: inicio, component: Home },
      { path: '/:resto(.*)*', component: { render: () => null } },
    ],
  });
  await router.push(`${inicio}?captura=1`);
  await router.isReady();
  const wrapper = mount(Home, {
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
  return { wrapper, produtos, router };
}

// Nomes de todos os produtos reais (as três categorias)
export const nomesProdutos = (produtos) => CATEGORIES.flatMap((c) => produtos[c] ?? []).map((p) => p.name);

// Botões "Adicionar <nome>" da página
export const botoesAdicionar = (wrapper) =>
  wrapper.findAll('button[aria-label^="Adicionar "]').map((b) => b.attributes('aria-label').replace(/^Adicionar /, ''));
