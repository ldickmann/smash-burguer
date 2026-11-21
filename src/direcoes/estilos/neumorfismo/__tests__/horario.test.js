import { describe, expect, it } from 'vitest';
import { HORARIO } from '../../../compartilhado/dados.js';
import { diasAbertos } from '../horario.js';

describe('diasAbertos', () => {
  it('lê "Terça a sexta" do horário real', () => {
    expect(diasAbertos('Terça a sexta, das 13h à 01h')).toEqual([1, 2, 3, 4]);
    expect(diasAbertos(HORARIO)).toEqual([1, 2, 3, 4]);
  });

  it('tolera acento, caixa e "-feira", e dá a volta pelo domingo', () => {
    expect(diasAbertos('terca-feira a SEXTA-FEIRA')).toEqual([1, 2, 3, 4]);
    expect(diasAbertos('Sábado a terça')).toEqual([0, 1, 5, 6]);
    expect(diasAbertos('Segunda a domingo')).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it('devolve null para o que não entende', () => {
    expect(diasAbertos('Todos os dias, das 18h às 23h')).toBeNull();
    expect(diasAbertos('')).toBeNull();
    expect(diasAbertos(undefined)).toBeNull();
  });
});
