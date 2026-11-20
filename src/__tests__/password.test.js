import { describe, it, expect } from 'vitest';
import { hashPassword, isPasswordHash, verifyPassword } from '../utils/password';

describe('hash de senha', () => {
  it('gera PBKDF2-SHA256 com 600 mil iterações e sal diferente a cada vez', async () => {
    const first = await hashPassword('senha123');
    const second = await hashPassword('senha123');

    expect(first).toMatch(/^pbkdf2-sha256\$600000\$[A-Za-z0-9+/=]{24}\$[A-Za-z0-9+/=]{44}$/);
    expect(first).not.toBe(second);
    expect(first).not.toContain('senha123');
    expect(isPasswordHash(first)).toBe(true);
    expect(isPasswordHash('senha123')).toBe(false);
  });

  it('confere a senha certa e recusa a errada', async () => {
    const stored = await hashPassword('senha123');

    expect(await verifyPassword('senha123', stored)).toEqual({ ok: true, needsUpgrade: false });
    expect(await verifyPassword('senha124', stored)).toEqual({ ok: false, needsUpgrade: false });
    expect(await verifyPassword('', stored)).toEqual({ ok: false, needsUpgrade: false });
  });

  it('senha em texto puro de antes do hash: entra e pede a troca', async () => {
    expect(await verifyPassword('senha123', 'senha123')).toEqual({ ok: true, needsUpgrade: true });
    expect(await verifyPassword('outra', 'senha123')).toEqual({ ok: false, needsUpgrade: false });
  });

  it('hash editado à mão, vazio ou que não é texto: recusa sem lançar', async () => {
    const stored = await hashPassword('senha123');
    const [prefix, iterations, salt] = stored.split('$');

    for (const value of [
      `${prefix}$${iterations}$${salt}$%%%`,
      `${prefix}$0$${salt}$AAAA`,
      `${prefix}$abc$${salt}$AAAA`,
      '',
      null,
      123,
    ]) {
      expect(await verifyPassword('senha123', value)).toEqual({ ok: false, needsUpgrade: false });
    }
  });

  it('hash com menos iterações que o padrão de hoje entra e pede a troca', async () => {
    const stored = await hashPassword('senha123');
    const [prefix, , salt] = stored.split('$');
    // Recalculado com 1000 iterações pelo próprio WebCrypto
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode('senha123'), 'PBKDF2', false, ['deriveBits']);
    const saltBytes = Uint8Array.from(atob(salt), (c) => c.charCodeAt(0));
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: saltBytes, iterations: 1000 }, key, 256);
    const weak = `${prefix}$1000$${salt}$${btoa(String.fromCharCode(...new Uint8Array(bits)))}`;

    expect(await verifyPassword('senha123', weak)).toEqual({ ok: true, needsUpgrade: true });
  });
});
