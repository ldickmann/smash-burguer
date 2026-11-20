// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';
import { transform } from 'esbuild';
import { JSDOM } from 'jsdom';
import viteConfig from '../../vite.config.js';

const indexHtml = readFileSync(fileURLToPath(new URL('../../index.html', import.meta.url)), 'utf8');

const parsePolicy = (content) =>
  Object.fromEntries(
    content
      .split(';')
      .map((directive) => directive.trim().split(/\s+/))
      .filter(([name]) => name)
      .map(([name, ...values]) => [name, values])
  );

describe('Content-Security-Policy do index.html', () => {
  const { document } = new JSDOM(indexHtml).window;
  const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');

  it('existe no <head> e vem antes de qualquer script ou estilo', () => {
    expect(meta).not.toBeNull();
    expect(meta.parentElement).toBe(document.head);

    for (const el of document.querySelectorAll('script, style, link[rel="stylesheet"], link[rel="modulepreload"]')) {
      expect(meta.compareDocumentPosition(el) & meta.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it('só aceita scripts da própria origem e só se conecta ao ViaCEP', () => {
    const policy = parsePolicy(meta.getAttribute('content'));

    expect(policy['default-src']).toEqual(["'self'"]);
    expect(policy['script-src']).toEqual(["'self'"]);
    expect(policy['connect-src']).toEqual(["'self'", 'https://viacep.com.br']);
    expect(policy['object-src']).toEqual(["'none'"]);
    expect(policy['base-uri']).toEqual(["'self'"]);
    expect(policy['form-action']).toEqual(["'self'"]);
    // Ignorada quando vem por <meta>: o navegador só avisa no console
    expect(policy).not.toHaveProperty('frame-ancestors');
  });
});

describe('build', () => {
  it('a minificação descarta console.log e mantém console.warn e console.error', async () => {
    const source = 'console.log("resposta", data); console.warn("aviso"); console.error("erro");';

    const { code } = await transform(source, { ...viteConfig.esbuild, minify: true });

    expect(code).not.toContain('console.log');
    expect(code).not.toContain('resposta');
    expect(code).toContain('console.warn');
    expect(code).toContain('console.error');
  });
});
