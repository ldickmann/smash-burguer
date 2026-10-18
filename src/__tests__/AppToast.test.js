import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import AppToast from '../components/ui/AppToast.vue';
import { useToastStore } from '../stores/toast';

const mountToasts = (pinia) =>
  mount(AppToast, {
    global: {
      plugins: [pinia],
      stubs: {
        'font-awesome-icon': { template: '<svg />' },
        // Sem animação nos testes
        TransitionGroup: { template: '<div><slot /></div>' },
      },
    },
  });

describe('AppToast', () => {
  let pinia;
  let store;

  beforeEach(() => {
    vi.useFakeTimers();
    pinia = createPinia();
    setActivePinia(pinia);
    store = useToastStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('usa role="status" para sucesso e info, e role="alert" para erro', async () => {
    const wrapper = mountToasts(pinia);
    store.show({ message: 'Salvo', variant: 'success' });
    store.show({ message: 'Removido', variant: 'info' });
    store.show({ message: 'Falhou', variant: 'error' });
    await wrapper.vm.$nextTick();

    const toasts = wrapper.findAll('.toast');
    expect(toasts.map((t) => t.attributes('role'))).toEqual(['status', 'status', 'alert']);
  });

  it('some sozinho depois da duração', async () => {
    const wrapper = mountToasts(pinia);
    store.show({ message: 'Oi', duration: 1000 });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.toast')).toHaveLength(1);

    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  it('pausa no hover e retoma ao sair', async () => {
    const wrapper = mountToasts(pinia);
    store.show({ message: 'Pausável', duration: 1000 });
    await wrapper.vm.$nextTick();

    vi.advanceTimersByTime(600);
    await wrapper.find('.toast').trigger('mouseenter');
    vi.advanceTimersByTime(5000);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.toast')).toHaveLength(1);

    await wrapper.find('.toast').trigger('mouseleave');
    vi.advanceTimersByTime(399);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.toast')).toHaveLength(1);

    vi.advanceTimersByTime(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  it('pausa enquanto o foco está dentro do aviso', async () => {
    const wrapper = mountToasts(pinia);
    store.show({ message: 'Com foco', duration: 1000 });
    await wrapper.vm.$nextTick();

    await wrapper.find('.toast').trigger('focusin');
    vi.advanceTimersByTime(3000);
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.toast')).toHaveLength(1);
  });

  it('a ação "Desfazer" executa o callback e fecha o aviso', async () => {
    const onClick = vi.fn();
    const wrapper = mountToasts(pinia);
    store.show({ message: 'Cheese Bacon removido.', variant: 'info', action: { label: 'Desfazer', onClick } });
    await wrapper.vm.$nextTick();

    const undo = wrapper.findAll('button').find((b) => b.text() === 'Desfazer');
    await undo.trigger('click');

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  it('o botão "Fechar aviso" fecha o aviso', async () => {
    const wrapper = mountToasts(pinia);
    store.show({ message: 'Fechável' });
    await wrapper.vm.$nextTick();

    await wrapper.find('button[aria-label="Fechar aviso"]').trigger('click');
    expect(wrapper.findAll('.toast')).toHaveLength(0);
  });

  it('mostra no máximo 3 avisos ao mesmo tempo', async () => {
    const wrapper = mountToasts(pinia);
    ['1', '2', '3', '4'].forEach((message) => store.show({ message }));
    await wrapper.vm.$nextTick();

    const messages = wrapper.findAll('.toast__message').map((m) => m.text());
    expect(messages).toEqual(['2', '3', '4']);
  });
});
