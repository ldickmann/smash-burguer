// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { transform } from 'esbuild';
import viteConfig from '../../vite.config.js';

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
