import { describe, expect, it } from 'vitest';
import { chaveDoProduto, somarPorProduto } from '../useNoPedido.js';

describe('somarPorProduto', () => {
  it('soma as linhas do mesmo produto', () => {
    const mapa = somarPorProduto([
      { category: 'foods', productId: 1, quantity: 1 },
      { category: 'foods', productId: 1, quantity: 2 },
    ]);
    expect(mapa.get(chaveDoProduto('foods', 1))).toBe(3);
  });

  it('separa categorias diferentes com o mesmo id', () => {
    const mapa = somarPorProduto([
      { category: 'drinks', productId: 1, quantity: 2 },
      { category: 'desserts', productId: 1, quantity: 1 },
    ]);
    expect(mapa.get(chaveDoProduto('drinks', 1))).toBe(2);
    expect(mapa.get(chaveDoProduto('desserts', 1))).toBe(1);
    expect(mapa.has(chaveDoProduto('foods', 1))).toBe(false);
  });

  it('carrinho vazio dá um mapa vazio', () => {
    expect(somarPorProduto([]).size).toBe(0);
    expect(somarPorProduto().size).toBe(0);
  });
});
