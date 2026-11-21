import { describe, it, expect, vi, afterEach } from 'vitest';
import { validateBirthDate, validateEmail } from '../utils/validators';

describe('validateEmail', () => {
  it.each(['maria@example.com', 'maria+loja@example.com', 'm.silva_1%x@sub.example.com.br', 'a@b.technology'])(
    'aceita "%s"',
    (email) => {
      expect(validateEmail(email).isValid).toBe(true);
    }
  );

  it.each(['', 'maria', 'maria@example', 'maria silva@example.com', '@example.com'])('recusa "%s"', (email) => {
    expect(validateEmail(email).isValid).toBe(false);
  });
});

describe('validateBirthDate', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('aceita datas que existem, de 1900 até hoje, inclusive 29/02 de ano bissexto', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 20, 15, 0));

    for (const date of ['1900-01-01', '2000-02-29', '1990-05-10', '2026-11-20']) {
      expect(validateBirthDate(date)).toEqual({ isValid: true, message: '' });
    }
  });

  it('recusa data no futuro, data que não existe, antes de 1900 e formato estranho', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 20, 15, 0));

    expect(validateBirthDate('2026-11-21').message).toBe('A data de nascimento não pode estar no futuro');
    expect(validateBirthDate('2099-05-10').isValid).toBe(false);
    expect(validateBirthDate('2000-02-31').message).toBe('Data de nascimento inválida');
    expect(validateBirthDate('2001-02-29').isValid).toBe(false);
    expect(validateBirthDate('1899-12-31').message).toBe('O ano deve ser 1900 ou depois');
    expect(validateBirthDate('10/05/1990').isValid).toBe(false);
    expect(validateBirthDate('').message).toBe('A data de nascimento é obrigatória');
  });

  it('o segundo argumento que o formulário passa não muda o resultado', () => {
    expect(validateBirthDate('1990-05-10', { dateOfBirth: '1990-05-10' }).isValid).toBe(true);
  });
});
