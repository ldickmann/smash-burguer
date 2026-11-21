// Cópia dos casos de src/direcoes/compartilhado/__tests__/useCardapio.test.js para a cópia de
// produção (src/composables/useCardapio.js).
import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useProductsStore } from '@/stores/products';
import { formatPrice } from '@/utils/formatters';
import { contar, menorPreco, resumoCategoria, useCardapio } from '@/composables/useCardapio';

beforeEach(() => {
  localStorage.clear();
  setActivePinia(createPinia());
});

describe('useCardapio', () => {
  it('lista as três categorias na ordem do MenuView, com os derivados calculados', () => {
    const { categorias } = useCardapio();
    const produtos = useProductsStore();
    expect(categorias.value.map((c) => c.rotulo)).toEqual(['Hambúrgueres', 'Bebidas', 'Sobremesas']);
    const lanches = categorias.value[0];
    expect(lanches.quantidade).toBe(produtos.foods.length);
    expect(lanches.menorPreco).toBe(Math.min(...produtos.foods.map((p) => p.price)));
    expect(lanches.menorPrecoTexto).toBe(formatPrice(lanches.menorPreco));
  });

  it('acompanha o cardápio editado: preço novo, produto excluído e categoria vazia', () => {
    const { categorias, produtoOuReserva } = useCardapio();
    const produtos = useProductsStore();
    produtos.drinks[0].price = 1.5;
    expect(categorias.value[1].menorPreco).toBe(1.5);
    produtos.menuItems.desserts = [];
    expect(categorias.value[2]).toMatchObject({ vazia: true, quantidade: 0, menorPreco: null, menorPrecoTexto: '' });
    const primeiro = produtos.foods[0];
    expect(produtoOuReserva('foods', 'Nome que não existe')).toBe(primeiro);
    expect(produtoOuReserva('desserts', 'Sorvete de Pote')).toBeNull();
  });

  it('formata os adicionais e conta no singular e no plural', () => {
    const { adicionais } = useCardapio();
    expect(adicionais.value.lanche.length).toBeGreaterThan(0);
    expect(adicionais.value.lanche[0].precoTexto).toBe(formatPrice(adicionais.value.lanche[0].price));
    expect(contar(1, ['adicional', 'adicionais'])).toBe('1 adicional');
    expect(contar(7, ['adicional', 'adicionais'])).toBe('7 adicionais');
  });

  it('ignora preço inválido no menor preço', () => {
    expect(menorPreco([{ price: 'x' }, { price: 9 }, { price: 4.5 }])).toBe(4.5);
    expect(resumoCategoria([])).toEqual({ quantidade: 0, menorPreco: null, menorPrecoTexto: '' });
  });
});
