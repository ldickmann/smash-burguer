import { describe, expect, it } from 'vitest';
import { separarDestaque } from '../cardapio.js';

const lista = [{ name: 'Cheese Bacon' }, { name: 'Smash Burger' }, { name: 'Veggie Burger' }, { name: 'X-Salada' }];

describe('separarDestaque', () => {
  it('lista vazia (ou ausente): sem destaque e sem demais', () => {
    expect(separarDestaque([], 'Smash Burger')).toEqual({ destaque: null, demais: [] });
    expect(separarDestaque(undefined, 'Smash Burger')).toEqual({ destaque: null, demais: [] });
  });

  it('acha o produto pelo nome e mantém os demais na ordem da lista', () => {
    const { destaque, demais } = separarDestaque(lista, 'Smash Burger');
    expect(destaque.name).toBe('Smash Burger');
    expect(demais.map((p) => p.name)).toEqual(['Cheese Bacon', 'Veggie Burger', 'X-Salada']);
  });

  it('sem o nome (renomeado ou excluído), o primeiro vira o destaque', () => {
    const { destaque, demais } = separarDestaque(lista, 'Outro');
    expect(destaque.name).toBe('Cheese Bacon');
    expect(demais.map((p) => p.name)).toEqual(['Smash Burger', 'Veggie Burger', 'X-Salada']);
  });

  it('não muda a lista original', () => {
    const copia = [...lista];
    separarDestaque(lista, 'Smash Burger');
    expect(lista).toEqual(copia);
  });
});
