import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // Desde a v10, o eslint-plugin-vue não declara mais os globais do navegador
  {
    name: 'app/browser-globals',
    languageOptions: {
      globals: globals.browser,
    },
  },

  // O build só descarta console.log cujo valor não é usado (vite.config.js): numa arrow function, use chaves
  {
    name: 'app/console-log-em-arrow',
    files: ['src/**/*.{js,vue}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "ArrowFunctionExpression > CallExpression.body[callee.object.name='console'][callee.property.name='log']",
          message: 'O build só descarta console.log cujo valor não é usado: escreva a arrow function com chaves.',
        },
      ],
    },
  },

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
]
