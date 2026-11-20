// @vitest-environment node
import { Buffer } from 'node:buffer';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

const html = readFileSync(fileURLToPath(new URL('../../createAdmin.html', import.meta.url)), 'utf8');

// Abre a página como o servidor de desenvolvimento, com o localStorage já preenchido
const openPage = (seed) =>
  new JSDOM(html, {
    url: 'http://localhost:5173/smash-burguer/createAdmin.html',
    runScripts: 'dangerously',
    beforeParse(window) {
      window.localStorage.clear();
      for (const [key, value] of Object.entries(seed)) window.localStorage.setItem(key, value);
    },
  }).window;

describe('createAdmin.html', () => {
  it('apaga só as chaves do Smash Burger e mantém as outras da mesma origem', () => {
    const window = openPage({
      'outro-projeto:preferencias': '{"tema":"escuro"}',
      'smash-burger:cart:v1': '{"items":[]}',
      'smash-burger:session': '{"user":null}',
      'smash-burger:account': '{"email":"maria@example.com"}',
      admin: '{"email":"antigo@example.com"}',
    });
    const storage = window.localStorage;

    expect(storage.getItem('outro-projeto:preferencias')).toBe('{"tema":"escuro"}');
    expect(storage.getItem('smash-burger:cart:v1')).toBeNull();
    expect(storage.getItem('smash-burger:session')).toBeNull();
    expect(storage.getItem('smash-burger:account')).toBeNull();
    expect(JSON.parse(storage.getItem('admin'))).toMatchObject({ email: 'admin@example.com', role: 'admin' });
    expect(window.document.getElementById('status').textContent).toContain('Admin criado com sucesso!');
  });

  it('apaga o cadastro no formato antigo, que o app migraria de volta, e mantém um `user` de outro formato', () => {
    const legacy = openPage({ user: '{"email":"maria@example.com","password":"senha123"}' });
    expect(legacy.localStorage.getItem('user')).toBeNull();

    for (const other of ['{"nome":"João"}', 'joao']) {
      expect(openPage({ user: other }).localStorage.getItem('user')).toBe(other);
    }
  });

  it('declara UTF-8 nos primeiros 1024 bytes, para o navegador não quebrar acentos e emojis', () => {
    const start = Buffer.from(html, 'utf8').subarray(0, 1024).toString('utf8');

    expect(start).toMatch(/<meta charset="UTF-8">/i);
  });
});
