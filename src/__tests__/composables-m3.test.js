// Composables copiados da Home do M3 para a produção (SPEC-material §4.1, "Lógica que vem junto"):
// o personalizar (provide nas views do modal), o contador do carrinho e os links principais.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/userStore';
import { CHAVE_PERSONALIZAR, usePersonalizar } from '@/composables/usePersonalizar';
import { useContadorCarrinho } from '@/composables/useContadorCarrinho';
import { useLinksPrincipais } from '@/composables/useLinksPrincipais';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('usePersonalizar', () => {
  it('devolve o openModal que a view entregou pelo provide', () => {
    const abrir = vi.fn();
    let personalizar;
    const Secao = defineComponent({ setup: () => ((personalizar = usePersonalizar()), () => null) });
    mount(Secao, { global: { provide: { [CHAVE_PERSONALIZAR]: abrir } } });
    expect(personalizar).toBe(abrir);
  });

  it('sem o provide, o erro cita as views que o fazem', () => {
    const Solta = defineComponent({ setup: () => (usePersonalizar(), () => null) });
    const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(() => mount(Solta)).toThrow(/HomeView|MenuView/);
    aviso.mockRestore();
  });
});

describe('useContadorCarrinho', () => {
  it('quantidade, nome do carrinho e texto do badge com teto de "99+"', () => {
    const cart = useCartStore();
    const { quantidade, rotulo, texto } = useContadorCarrinho();
    expect([quantidade.value, rotulo.value, texto.value]).toEqual([0, 'Carrinho, vazio', '0']);

    cart.$patch({ items: [{ id: 1, quantity: 1 }] });
    expect(rotulo.value).toBe('Carrinho, 1 item');
    cart.$patch({ items: [{ id: 1, quantity: 2 }] });
    expect([rotulo.value, texto.value]).toEqual(['Carrinho, 2 itens', '2']);
    cart.$patch({ items: [{ id: 1, quantity: 100 }] });
    expect(texto.value).toBe('99+');
  });

  it('sem o odômetro: não devolve dígitos nem sentido', () => {
    const contador = useContadorCarrinho();
    expect(Object.keys(contador).sort()).toEqual(['quantidade', 'rotulo', 'texto']);
  });
});

describe('useLinksPrincipais', () => {
  it('Início, Cardápio e Entrar; com sessão, Perfil no lugar de Entrar', () => {
    const links = useLinksPrincipais('/');
    expect(links.value).toEqual([
      { to: '/', rotulo: 'Início' },
      { to: '/menu', rotulo: 'Cardápio' },
      { to: '/login', rotulo: 'Entrar' },
    ]);
    useUserStore().$patch({ isAuthenticated: true, user: { name: 'Ana' } });
    expect(links.value[2]).toEqual({ to: '/profile', rotulo: 'Perfil' });
  });
});
