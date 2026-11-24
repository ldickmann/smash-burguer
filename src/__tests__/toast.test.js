// Store dos avisos (desenho dos componentes base, §4.3 e §5.1): o tempo por tipo, os anteriores com
// ação a 10 s, a retenção com um diálogo aberto (segurar e soltar) e o runAction.
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useToastStore } from '../stores/toast';

describe('store dos avisos (toast.js)', () => {
  let store;

  beforeEach(() => {
    vi.useFakeTimers();
    setActivePinia(createPinia());
    store = useToastStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mensagens = () => store.toasts.map((toast) => toast.message);

  it('dois avisos com ação: o primeiro sai 10 s depois do segundo, e o segundo fica', () => {
    store.show({ message: 'A removido.', variant: 'info', action: { label: 'Desfazer', onClick: vi.fn() } });
    vi.advanceTimersByTime(30000);
    expect(mensagens()).toEqual(['A removido.']);

    store.show({ message: 'B removido.', variant: 'info', action: { label: 'Desfazer', onClick: vi.fn() } });
    vi.advanceTimersByTime(9999);
    expect(mensagens()).toEqual(['A removido.', 'B removido.']);
    vi.advanceTimersByTime(1);
    expect(mensagens()).toEqual(['B removido.']);

    vi.advanceTimersByTime(20000);
    expect(mensagens()).toEqual(['B removido.']);
  });

  it('o aviso sem ação não muda o prazo dos que têm ação', () => {
    store.show({ message: 'A removido.', variant: 'info', action: { label: 'Desfazer', onClick: vi.fn() } });
    store.show({ message: 'Salvo' });
    vi.advanceTimersByTime(60000);
    expect(mensagens()).toEqual(['A removido.']);
  });

  it('o tempo não corre com o contador em 1: o aviso fica retido e sai 4 s depois do soltar()', () => {
    store.segurar();
    store.show({ message: 'Conta excluída.' });
    expect(store.toasts[0].retido).toBe(true);

    vi.advanceTimersByTime(10000);
    expect(mensagens()).toEqual(['Conta excluída.']);
    expect(store.toasts[0].retido).toBe(true);

    store.soltar();
    expect(store.toasts[0].retido).toBe(false);
    vi.advanceTimersByTime(3999);
    expect(mensagens()).toEqual(['Conta excluída.']);
    vi.advanceTimersByTime(1);
    expect(mensagens()).toEqual([]);
  });

  it('o segurar() pausa o aviso de 4 s que já estava na tela; o soltar() o retoma', () => {
    store.show({ message: 'Salvo' });
    vi.advanceTimersByTime(3000);
    store.segurar();
    expect(store.toasts[0].retido).toBe(false);
    vi.advanceTimersByTime(10000);
    expect(mensagens()).toEqual(['Salvo']);

    store.soltar();
    vi.advanceTimersByTime(999);
    expect(mensagens()).toEqual(['Salvo']);
    vi.advanceTimersByTime(1);
    expect(mensagens()).toEqual([]);
  });

  it('dois segurar() pedem dois soltar(); o soltar() a mais não desce de 0', () => {
    store.segurar();
    store.segurar();
    store.show({ message: 'Salvo' });

    store.soltar();
    expect(store.dialogosAbertos).toBe(1);
    vi.advanceTimersByTime(10000);
    expect(mensagens()).toEqual(['Salvo']);

    store.soltar();
    store.soltar();
    expect(store.dialogosAbertos).toBe(0);
    vi.advanceTimersByTime(4000);
    expect(mensagens()).toEqual([]);
  });

  it('o resume() não arma o tempo com um diálogo aberto (o mouseleave sobre o aviso parado)', () => {
    store.show({ message: 'Salvo' });
    store.segurar();
    store.resume(store.toasts[0].id);
    vi.advanceTimersByTime(10000);
    expect(mensagens()).toEqual(['Salvo']);
  });

  it('o runAction(id, event) chama o onClick com o evento, fecha o aviso e devolve o resultado', async () => {
    const onClick = vi.fn(async () => 'feito');
    const id = store.show({ message: 'A removido.', variant: 'info', action: { label: 'Desfazer', onClick } });
    const evento = new Event('click');

    const resultado = store.runAction(id, evento);
    expect(onClick).toHaveBeenCalledWith(evento);
    expect(mensagens()).toEqual([]);
    await expect(resultado).resolves.toBe('feito');
  });

  it('o dismissPersistentes() tira só os que não expiram', () => {
    store.show({ message: 'Salvo' });
    store.show({ message: 'Falhou', variant: 'error' });
    store.show({ message: 'Confira', variant: 'info', duration: 0 });
    store.dismissPersistentes();
    expect(mensagens()).toEqual(['Salvo']);
  });
});
