import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // No build, a minificação descarta as chamadas de console.log cujo valor não é usado (warn e error ficam).
  // Uma arrow function de expressão, como `(x) => console.log(x)`, devolve esse valor: use chaves.
  esbuild: {
    pure: ['console.log'],
  },
  // GitHub Pages deployment configuration
  base: `/smash-burguer/`,
});
