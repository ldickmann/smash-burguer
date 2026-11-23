import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      // Os worktrees ficam em .claude/worktrees/: rodados daqui, usariam o alias @ da raiz
      exclude: [...configDefaults.exclude, 'e2e/**', '.claude/worktrees/**'],
      // A partir do Node 25, o localStorage do Node toma o lugar do jsdom; a flag o desliga nos workers
      execArgv: ['--no-experimental-webstorage'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // Configurações de cobertura
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'json'],
        reportsDirectory: './coverage',
        // Desde o Vitest 4, sem include o relatório só lista os arquivos que os testes importam
        include: ['src/**/*.{js,vue}'],
        exclude: [
          ...configDefaults.exclude,
          'e2e/**',
          'src/main.js',
          'src/router/**',
          '**/*.d.ts',
        ]
      }
    },
  }),
);
