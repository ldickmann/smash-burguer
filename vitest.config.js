import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';
import vue from '@vitejs/plugin-vue';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // Configurações de cobertura
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'json'],
        reportsDirectory: './coverage',
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
