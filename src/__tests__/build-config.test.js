// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { build } from 'vite';
import { JSDOM } from 'jsdom';

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
  // Build de verdade, com o vite.config.js do projeto e uma entrada virtual no lugar do index.html
  const buildEntry = async (code) => {
    const result = await build({
      configFile: fileURLToPath(new URL('../../vite.config.js', import.meta.url)),
      logLevel: 'silent',
      plugins: [
        {
          name: 'entrada-virtual',
          resolveId: (id) => (id === 'virtual:entrada' ? '\0entrada' : null),
          load: (id) => (id === '\0entrada' ? code : null),
        },
      ],
      build: { write: false, rollupOptions: { input: 'virtual:entrada' } },
    });
    return [result]
      .flat()
      .flatMap(({ output }) => output)
      .filter((file) => file.type === 'chunk')
      .map((chunk) => chunk.code)
      .join('\n');
  };

  it('descarta console.log, inclusive em arrow function com chaves, e mantém console.warn e console.error', async () => {
    const code = await buildEntry(`
      console.log('resposta', globalThis.dado);
      globalThis.onPick = (item) => {
        console.log('item', item);
      };
      console.warn('aviso');
      console.error('erro');
    `);

    expect(code).toContain('globalThis.onPick');
    expect(code).not.toContain('console.log');
    expect(code).not.toContain('resposta');
    expect(code).toContain('console.warn');
    expect(code).toContain('console.error');
  });

  describe('admin de teste do yarn dev', () => {
    afterEach(() => {
      vi.unstubAllEnvs();
    });

    // O Vite decide o import.meta.env.DEV pelo NODE_ENV, que no Vitest é "test"
    const buildLogin = (nodeEnv) => {
      vi.stubEnv('NODE_ENV', nodeEnv);
      return buildEntry(`
        import { adminAuthService, devTestAdmin } from '@/services/adminAuthServices';
        import LoginAdminView from '@/views/admin/LoginAdminView.vue';
        globalThis.saida = { adminAuthService, devTestAdmin, LoginAdminView };
      `);
    };

    it('não vai para o build de produção', async () => {
      const production = await buildLogin('production');

      expect(production).toContain('Credenciais de administrador inválidas');
      expect(production).not.toContain('Demo1234');
      expect(production).not.toContain('admin@example.com');
    }, 60000);

    it('controle: fora da produção, o mesmo código leva as credenciais', async () => {
      const development = await buildLogin('development');

      expect(development).toContain('Demo1234');
      expect(development).toContain('admin@example.com');
    }, 60000);
  });
});
