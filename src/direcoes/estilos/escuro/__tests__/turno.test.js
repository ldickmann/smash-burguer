import { describe, expect, it } from 'vitest';
import { HORARIO } from '../../../compartilhado/dados.js';
import { colunaDa, lerTurno, posicoesFaixa } from '../turno.js';

describe('lerTurno', () => {
  it('lê o HORARIO real, com os rótulos recortados do texto', () => {
    expect(lerTurno(HORARIO)).toEqual({ abre: 13, fecha: 1, rotuloAbre: '13', rotuloFecha: '01' });
  });

  it('devolve null para um texto que não casa', () => {
    expect(lerTurno('Todos os dias')).toBeNull();
    expect(lerTurno(undefined)).toBeNull();
  });

  it('lê um horário que não passa da meia-noite', () => {
    expect(lerTurno('Segunda a sábado, das 11h às 22h')).toMatchObject({ abre: 11, fecha: 22 });
  });

  it('recusa horas inválidas e abertura igual ao fechamento', () => {
    expect(lerTurno('das 25h à 01h')).toBeNull();
    expect(lerTurno('das 13h à 24h')).toBeNull();
    expect(lerTurno('das 10h às 10h')).toBeNull();
  });
});

describe('posicoesFaixa', () => {
  it('a coluna 1 é a do meio-dia e a 13 a da meia-noite', () => {
    expect(colunaDa(12)).toBe(1);
    expect(colunaDa(13)).toBe(2);
    expect(colunaDa(0)).toBe(13);
    expect(colunaDa(11)).toBe(24);
  });

  it('o turno real acende das 13h à 01h e cruza a meia-noite', () => {
    const p = posicoesFaixa({ abre: 13, fecha: 1 });
    expect(p.trechos).toEqual([{ inicio: 2, fim: 14 }]);
    expect(p.meiaNoite).toBe(true);
    expect(p.rotuloAbre).toEqual({ inicio: 2, fim: 6 });
    expect(p.rotuloFecha).toEqual({ inicio: 10, fim: 14 });
  });

  it('um turno da tarde não tem o corte da meia-noite', () => {
    const p = posicoesFaixa({ abre: 14, fecha: 22 });
    expect(p.trechos).toEqual([{ inicio: 3, fim: 11 }]);
    expect(p.meiaNoite).toBe(false);
  });

  it('um turno que passa do meio-dia seguinte dá a volta em dois trechos', () => {
    const p = posicoesFaixa({ abre: 20, fecha: 14 });
    expect(p.trechos).toEqual([
      { inicio: 9, fim: 25 },
      { inicio: 1, fim: 3 },
    ]);
    expect(p.rotuloFecha.fim).toBe(5);
  });
});
