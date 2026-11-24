// AppToast (desenho dos componentes base, §4.1 a §4.3 e §5.1): duas regiões vivas fixas, o tempo por
// tipo, a saída na troca de rota, o foco depois do "Fechar aviso" e a retenção com um diálogo aberto.
import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { createMemoryHistory, createRouter } from 'vue-router';
import AppToast from '../components/ui/AppToast.vue';
import { useToastStore } from '../stores/toast';

const criarRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/cart', component: { template: '<div />' } },
    ],
  });

const mountToasts = (pinia, router) =>
  mount(AppToast, {
    attachTo: document.body,
    global: {
      plugins: [pinia, router],
      stubs: {
        'font-awesome-icon': { template: '<svg class="fa-stub" />' },
        // Sem animação nos testes
        TransitionGroup: { template: '<div><slot /></div>' },
      },
    },
  });

const teclado = () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
const ponteiro = () => document.dispatchEvent(new Event('pointerdown', { bubbles: true }));

describe('AppToast', () => {
  let pinia;
  let store;
  let router;
  let wrapper;
  let main;

  beforeEach(async () => {
    vi.useFakeTimers();
    pinia = createPinia();
    setActivePinia(pinia);
    store = useToastStore();
    router = criarRouter();
    router.push('/');
    await router.isReady();
    main = document.createElement('main');
    main.id = 'conteudo';
    main.tabIndex = -1;
    document.body.appendChild(main);
  });

  afterEach(() => {
    wrapper?.unmount();
    main.remove();
    vi.useRealTimers();
  });

  it('as duas listas vivas existem vazias na montagem, e cada aviso nasce na lista do seu tipo, sem role próprio', async () => {
    wrapper = mountToasts(pinia, router);
    const status = wrapper.find('.toast-region__list--status');
    const alerta = wrapper.find('.toast-region__list--alert');
    expect(status.attributes()).toMatchObject({ role: 'status', 'aria-atomic': 'false' });
    expect(alerta.attributes()).toMatchObject({ role: 'alert', 'aria-atomic': 'true' });
    expect(wrapper.findAll('.toast')).toHaveLength(0);

    store.show({ message: 'Salvo', variant: 'success' });
    store.show({ message: 'Removido', variant: 'info' });
    store.show({ message: 'Falhou', variant: 'error' });
    await flushPromises();

    expect(status.findAll('.toast__message').map((m) => m.text())).toEqual(['Salvo', 'Removido']);
    expect(alerta.findAll('.toast__message').map((m) => m.text())).toEqual(['Falhou']);
    expect(wrapper.findAll('.toast').every((t) => t.attributes('role') === undefined)).toBe(true);
  });

  it('o de sucesso some em 4000 ms', async () => {
    wrapper = mountToasts(pinia, router);
    store.show({ message: 'Oi' });
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(1);

    vi.advanceTimersByTime(3999);
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(1);
    vi.advanceTimersByTime(1);
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  it('pausa no hover e retoma ao sair', async () => {
    wrapper = mountToasts(pinia, router);
    store.show({ message: 'Pausável', duration: 1000 });
    await flushPromises();

    vi.advanceTimersByTime(600);
    await wrapper.find('.toast').trigger('mouseenter');
    vi.advanceTimersByTime(5000);
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(1);

    await wrapper.find('.toast').trigger('mouseleave');
    vi.advanceTimersByTime(399);
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(1);

    vi.advanceTimersByTime(1);
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  it('pausa enquanto o foco está dentro do aviso', async () => {
    wrapper = mountToasts(pinia, router);
    store.show({ message: 'Com foco', duration: 1000 });
    await flushPromises();

    await wrapper.find('.toast').trigger('focusin');
    vi.advanceTimersByTime(3000);
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(1);
  });

  it('o de ação, o de erro e o de duration: 0 não somem sozinhos', async () => {
    wrapper = mountToasts(pinia, router);
    store.show({ message: 'Cheese Bacon removido.', variant: 'info', action: { label: 'Desfazer', onClick: vi.fn() } });
    store.show({ message: 'Falhou', variant: 'error' });
    store.show({ message: 'Confira', variant: 'info', duration: 0 });
    await flushPromises();

    vi.advanceTimersByTime(60000);
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(3);
  });

  it('a troca de rota tira os que não expiram e mantém os de 4 s', async () => {
    wrapper = mountToasts(pinia, router);
    store.show({ message: 'Removido.', variant: 'info', action: { label: 'Desfazer', onClick: vi.fn() } });
    store.show({ message: 'Falhou', variant: 'error' });
    store.show({ message: 'Seu carrinho está vazio.', variant: 'info' });
    await flushPromises();

    await router.push('/cart');
    await flushPromises();
    expect(wrapper.findAll('.toast__message').map((m) => m.text())).toEqual(['Seu carrinho está vazio.']);
  });

  it('a ação "Desfazer" recebe o evento, roda e fecha o aviso; ela é um text button (ghost)', async () => {
    const onClick = vi.fn();
    wrapper = mountToasts(pinia, router);
    store.show({ message: 'Cheese Bacon removido.', variant: 'info', action: { label: 'Desfazer', onClick } });
    await flushPromises();

    const undo = wrapper.find('.toast__action');
    expect(undo.classes()).toContain('m3-botao--texto');
    await undo.trigger('click');
    await flushPromises();

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toBeInstanceOf(Event);
    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  it('só o erro tem o ícone; no máximo 3 avisos', async () => {
    wrapper = mountToasts(pinia, router);
    store.show({ message: 'ok', variant: 'success' });
    store.show({ message: 'info', variant: 'info' });
    await flushPromises();
    expect(wrapper.find('.toast__icon').exists()).toBe(false);

    store.show({ message: 'erro', variant: 'error' });
    await flushPromises();
    expect(wrapper.findAll('.toast__icon')).toHaveLength(1);
    expect(wrapper.find('.toast--error .toast__icon').exists()).toBe(true);

    store.show({ message: '4' });
    await flushPromises();
    expect(wrapper.findAll('.toast__message').map((m) => m.text())).toEqual(['info', '4', 'erro']);
  });

  describe('foco depois do "Fechar aviso" (última entrada de teclado)', () => {
    const fecharPeloTeclado = async (toast) => {
      teclado();
      await toast.find('button[aria-label="Fechar aviso"]').trigger('click');
      await flushPromises();
    };

    it('vai ao primeiro botão do aviso seguinte na pilha', async () => {
      wrapper = mountToasts(pinia, router);
      store.show({ message: 'A', duration: 0 });
      store.show({ message: 'B', duration: 0 });
      await flushPromises();

      await fecharPeloTeclado(wrapper.findAll('.toast')[0]);
      const restante = wrapper.find('.toast');
      expect(restante.find('.toast__message').text()).toBe('B');
      expect(document.activeElement).toBe(restante.find('button').element);
    });

    it('sem outro aviso, volta à origem do foco; sem origem, vai ao #conteudo', async () => {
      const origem = document.createElement('button');
      document.body.appendChild(origem);
      wrapper = mountToasts(pinia, router);
      store.show({ message: 'A', duration: 0 });
      await flushPromises();

      // O foco entra na região vindo da origem (o relógio anda: o Vue ignora, no ouvinte da região, o
      // evento que borbulhou com o mesmo instante em que ele foi ligado)
      vi.advanceTimersByTime(10);
      const fechar = wrapper.find('button[aria-label="Fechar aviso"]');
      fechar.element.dispatchEvent(new FocusEvent('focusin', { bubbles: true, relatedTarget: origem }));
      await fecharPeloTeclado(wrapper.find('.toast'));
      expect(document.activeElement).toBe(origem);

      origem.remove();
      store.show({ message: 'B', duration: 0 });
      await flushPromises();
      await fecharPeloTeclado(wrapper.find('.toast'));
      expect(document.activeElement).toBe(main);
    });

    it('com a última entrada de ponteiro, o foco não se move', async () => {
      const fora = document.createElement('button');
      document.body.appendChild(fora);
      fora.focus();
      wrapper = mountToasts(pinia, router);
      store.show({ message: 'A', duration: 0 });
      store.show({ message: 'B', duration: 0 });
      await flushPromises();

      ponteiro();
      await wrapper.find('button[aria-label="Fechar aviso"]').trigger('click');
      await flushPromises();
      expect(document.activeElement).toBe(fora);
      fora.remove();
    });

    it('depois da ação, com o foco perdido e a última entrada de teclado, vale a mesma regra', async () => {
      wrapper = mountToasts(pinia, router);
      store.show({ message: 'A', variant: 'info', action: { label: 'Desfazer', onClick: vi.fn() } });
      store.show({ message: 'B', duration: 0 });
      await flushPromises();

      const desfazer = wrapper.find('.toast__action');
      desfazer.element.focus();
      teclado();
      await desfazer.trigger('click');
      await flushPromises();
      expect(document.activeElement).toBe(wrapper.find('.toast').find('button').element);
    });
  });

  it('retenção: com um diálogo aberto, o aviso novo não aparece; ao soltar, entra na lista viva', async () => {
    wrapper = mountToasts(pinia, router);
    store.segurar();
    store.show({ message: 'Conta excluída.' });
    await flushPromises();
    expect(wrapper.findAll('.toast')).toHaveLength(0);

    store.soltar();
    await flushPromises();
    expect(wrapper.find('.toast-region__list--status .toast__message').text()).toBe('Conta excluída.');
  });
});
