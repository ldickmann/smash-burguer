// @vitest-environment node
// Estilo do campo, do Login, do Cadastro e do Perfil no M3 (docs/direcoes/desenho/conta.md, §5, §6, §7
// e §9): as parciais compiladas pelo sass-embedded, o mesmo compilador do build, e as das páginas
// também pelo <style scoped> do Vue (o :global() do scroll-padding com o aviso). Lidas pelo node:fs (no
// Vitest, um .scss importado com ?raw chega vazio); o alias @/ do Vite é resolvido por um importador.
// Mesmo padrão do carrinho-estilo.test.js.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { initCompiler } from 'sass-embedded';
import { compileStyle } from 'vue/compiler-sfc';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  PARES,
  PARES_CARDAPIO,
  PARES_CONTA,
  PARES_OUTRAS_TELAS,
  PARES_TELAS_BRASA,
  lerTokens,
  medirPar,
} from '@/utils/contraste';

const SRC = fileURLToPath(new URL('../', import.meta.url));
const ESTILOS = `${SRC}assets/styles/`;
const ALIAS = { findFileUrl: (url) => (url.startsWith('@/') ? pathToFileURL(`${SRC}${url.slice(2)}`) : null) };

const PARCIAIS = {
  campo: 'components/_form-group.scss',
  auth: 'pages/auth/_auth.scss',
  login: 'pages/auth/_login.scss',
  cadastro: 'pages/auth/_register.scss',
  perfil: 'pages/auth/_profile.scss',
};
const DESDE_SM = '@media (min-width: 480px)';
const DESDE_MD = '@media (min-width: 768px)';
const DESDE_LG = '@media (min-width: 1024px)';
const ABAIXO_MD = '@media (max-width: 767.98px)';
const DE_MD_A_LG = '@media (min-width: 768px) and (max-width: 1023.98px)';
const HOVER = '@media (hover: hover) and (pointer: fine)';
const MOVIMENTO_OK = '@media (prefers-reduced-motion: no-preference)';
const CORES_FORCADAS = '@media (forced-colors: active)';
const MAIS_CONTRASTE = '@media (prefers-contrast: more)';

const css = {};
beforeAll(() => {
  const sass = initCompiler();
  try {
    // Uma parcial que não compila (ou não existe) fica vazia e reprova só os casos dela
    for (const [nome, caminho] of Object.entries(PARCIAIS)) {
      try {
        css[nome] = sass.compile(`${ESTILOS}${caminho}`, { importers: [ALIAS] }).css;
      } catch {
        css[nome] = '';
      }
    }
  } finally {
    sass.dispose();
  }
});

// Separa o CSS em blocos @media (condição e corpo) e o resto, que vale sempre
function blocos(texto) {
  const lista = [];
  let fora = '';
  let i = 0;
  while (i < texto.length) {
    const at = texto.indexOf('@', i);
    if (at < 0) {
      fora += texto.slice(i);
      break;
    }
    fora += texto.slice(i, at);
    const abre = texto.indexOf('{', at);
    let fim = abre + 1;
    for (let nivel = 1; nivel > 0; fim++) {
      if (texto[fim] === '{') nivel++;
      else if (texto[fim] === '}') nivel--;
    }
    lista.push([texto.slice(at, abre).trim(), texto.slice(abre + 1, fim - 1)]);
    i = fim;
  }
  return { fora, lista };
}

// Valor de uma propriedade num seletor exato: fora dos @media, ou só dentro da condição pedida. A
// última declaração vence.
function valor(texto, seletor, propriedade, condicao) {
  const { fora, lista } = blocos(texto);
  const corpos = condicao ? lista.filter(([c]) => c === condicao).map(([, corpo]) => corpo) : [fora];
  let achado;
  for (const corpo of corpos) {
    for (const [, seletores, declaracoes] of corpo.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      if (!seletores.split(/,(?![^(]*\))/).map((s) => s.trim().replace(/\s+/g, ' ')).includes(seletor)) continue;
      for (const declaracao of declaracoes.split(';')) {
        const [nome, ...resto] = declaracao.split(':');
        if (nome.trim() === propriedade) achado = resto.join(':').trim();
      }
    }
  }
  return achado;
}

const escopado = (fonte, filename) => {
  const { code, errors } = compileStyle({ source: fonte, filename, id: 'data-v-teste', scoped: true });
  expect(errors).toEqual([]);
  return code;
};

describe('FormGroup outlined (§5.1, §6 e §7.1)', () => {
  const campo = '.form-group__field';

  it('o grupo é coluna sem gap: o rótulo e as mensagens dão o espaço por margem', () => {
    expect(valor(css.campo, '.form-group', 'display')).toBe('flex');
    expect(valor(css.campo, '.form-group', 'flex-direction')).toBe('column');
    expect(valor(css.campo, '.form-group', 'gap')).toBeUndefined();
    expect(valor(css.campo, '.form-group__label', 'margin-block-end')).toBe('var(--space-2)');
  });

  it('o rótulo acima: label-l 500 em on-surface (desvio confirmado)', () => {
    expect(valor(css.campo, '.form-group__label', 'font-size')).toBe('var(--m3-label-l)');
    expect(valor(css.campo, '.form-group__label', 'font-weight')).toBe('500');
    expect(valor(css.campo, '.form-group__label', 'color')).toBe('var(--m3-on-surface)');
  });

  it('o campo: sem fundo, contorno outline de 1 px, canto 12, 56 px, padding 16, valor em body-l', () => {
    expect(valor(css.campo, campo, 'min-height')).toBe('3.5rem');
    expect(valor(css.campo, campo, 'padding')).toBe('0 var(--space-4)');
    expect(valor(css.campo, campo, 'border')).toBe('1px solid var(--m3-outline)');
    expect(valor(css.campo, campo, 'border-radius')).toBe('var(--m3-forma-m)');
    expect(valor(css.campo, campo, 'background-color')).toBe('transparent');
    expect(valor(css.campo, campo, 'color')).toBe('var(--m3-on-surface)');
    expect(valor(css.campo, campo, 'caret-color')).toBe('var(--m3-primary)');
    expect(valor(css.campo, campo, 'font-size')).toBe('var(--m3-body-l)');
    expect(valor(css.campo, `${campo}::placeholder`, 'color')).toBe('var(--m3-on-surface-variant)');
  });

  it('hover em on-surface, fora do foco, do desabilitado e do somente leitura; com erro, on-error-container', () => {
    expect(valor(css.campo, `${campo}:hover:not(:focus, :disabled, [readonly])`, 'border-color', HOVER)).toBe(
      'var(--m3-on-surface)'
    );
    expect(
      valor(css.campo, `${campo}[aria-invalid=true]:hover:not(:focus, :disabled, [readonly])`, 'border-color', HOVER)
    ).toBe('var(--m3-on-error-container)');
    expect(valor(css.campo, campo, 'transition')).toBeUndefined();
  });

  it('foco: contorno primary (também no :focus do mouse); com erro, o contorno continua error', () => {
    expect(valor(css.campo, `${campo}:focus`, 'border-color')).toBe('var(--m3-primary)');
    expect(valor(css.campo, `${campo}[aria-invalid=true]`, 'border-color')).toBe('var(--m3-error)');
    expect(valor(css.campo, `${campo}[aria-invalid=true]`, 'caret-color')).toBe('var(--m3-error)');
    // A regra do erro vem depois da do foco, com a mesma especificidade
    expect(css.campo.indexOf(`${campo}[aria-invalid=true]`)).toBeGreaterThan(css.campo.indexOf(`${campo}:focus`));
  });

  it('o rótulo acende com o foco no campo (não no botão da senha) e fica error com erro', () => {
    const foco = '.form-group:not(.has-error, .is-readonly):has(.form-group__field:focus) .form-group__label';
    expect(valor(css.campo, foco, 'color')).toBe('var(--m3-primary)');
    expect(valor(css.campo, '.form-group.has-error .form-group__label', 'color')).toBe('var(--m3-error)');
    expect(
      valor(css.campo, '.form-group.has-error:has(.form-group__field:hover:not(:focus)) .form-group__label', 'color', HOVER)
    ).toBe('var(--m3-on-error-container)');
  });

  it('somente leitura: tracejado em outline, texto inteiro, sem acender no foco', () => {
    expect(valor(css.campo, `${campo}[readonly]`, 'border-style')).toBe('dashed');
    expect(valor(css.campo, `${campo}[readonly]`, 'border-color')).toBe('var(--m3-outline)');
    expect(valor(css.campo, `${campo}[readonly]`, 'color')).toBeUndefined();
    expect(valor(css.campo, `${campo}[readonly]`, 'background-color')).toBeUndefined();
    expect(valor(css.campo, `${campo}[readonly]`, 'cursor')).toBe('default');
    expect(valor(css.campo, `${campo}[readonly]:focus`, 'border-color')).toBe('var(--m3-outline)');
  });

  it('desabilitado: contorno outline-variant e textos em --color-ink-disabled, separado do somente leitura', () => {
    expect(valor(css.campo, `${campo}:disabled`, 'border-color')).toBe('var(--m3-outline-variant)');
    expect(valor(css.campo, `${campo}:disabled`, 'color')).toBe('var(--color-ink-disabled)');
    expect(valor(css.campo, `${campo}:disabled`, 'cursor')).toBe('not-allowed');
    expect(valor(css.campo, `${campo}:disabled::placeholder`, 'color')).toBe('var(--color-ink-disabled)');
    expect(valor(css.campo, '.form-group.is-disabled .form-group__label', 'color')).toBe('var(--color-ink-disabled)');
    expect(valor(css.campo, '.form-group.is-disabled .form-group__help', 'color')).toBe('var(--color-ink-disabled)');
    expect(valor(css.campo, `${campo}:disabled`, 'border-style')).toBeUndefined();
  });

  it('select: appearance none, ponta de 12 + 20 + 16 e o chevron de 20 px em on-surface-variant', () => {
    expect(valor(css.campo, '.form-group__select', 'position')).toBe('relative');
    expect(valor(css.campo, '.form-group__field--select', 'appearance')).toBe('none');
    expect(valor(css.campo, '.form-group__field--select', 'padding-inline-end')).toBe(
      'calc(var(--space-3) + 1.25rem + var(--space-4))'
    );
    expect(valor(css.campo, '.form-group__seta', 'position')).toBe('absolute');
    expect(valor(css.campo, '.form-group__seta', 'inset-inline-end')).toBe('var(--space-3)');
    expect(valor(css.campo, '.form-group__seta', 'font-size')).toBe('1.25rem');
    expect(valor(css.campo, '.form-group__seta', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.campo, '.form-group__seta', 'pointer-events')).toBe('none');
  });

  it('textarea: padding de 16 em todos os lados e resize vertical', () => {
    expect(valor(css.campo, '.form-group__field--textarea', 'padding')).toBe('var(--space-4)');
    expect(valor(css.campo, '.form-group__field--textarea', 'resize')).toBe('vertical');
  });

  it('ajuda e erro: body-m, 4 px abaixo, recuo de 16; a ajuda tabular em on-surface-variant e o erro em error', () => {
    for (const seletor of ['.form-group__help', '.form-group__error']) {
      expect(valor(css.campo, seletor, 'margin-block-start')).toBe('var(--space-1)');
      expect(valor(css.campo, seletor, 'padding-inline')).toBe('var(--space-4)');
      expect(valor(css.campo, seletor, 'font-size')).toBe('var(--m3-body-m)');
      expect(valor(css.campo, seletor, 'align-items')).toBe('flex-start');
    }
    expect(valor(css.campo, '.form-group__help', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.campo, '.form-group__help', 'font-variant-numeric')).toBe('tabular-nums');
    expect(valor(css.campo, '.form-group__error', 'color')).toBe('var(--m3-error)');
    // O ícone centrado na altura da primeira linha
    expect(valor(css.campo, '.form-group__icone', 'height')).toBe('var(--m3-body-m-linha)');
  });

  it('o arco da ajuda só gira com movimento permitido', () => {
    expect(valor(css.campo, '.form-group__spinner', 'animation')).toBeUndefined();
    expect(valor(css.campo, '.form-group__spinner', 'animation', MOVIMENTO_OK)).toMatch(/var\(--dur-spin\)/);
  });

  it('mostrar a senha: alvo de 44 px no fim do campo, ícone em on-surface-variant, camada e anel por dentro', () => {
    expect(valor(css.campo, '.form-group__controle', 'position')).toBe('relative');
    expect(valor(css.campo, '.form-group__field--senha', 'padding-inline-end')).toBe(
      'calc(var(--target-min) + var(--space-2))'
    );
    const botao = '.form-group__mostrar';
    expect(valor(css.campo, botao, 'position')).toBe('absolute');
    expect(valor(css.campo, botao, 'inset-inline-end')).toBe('var(--space-1)');
    expect(valor(css.campo, botao, 'width')).toBe('var(--target-min)');
    expect(valor(css.campo, botao, 'height')).toBe('var(--target-min)');
    expect(valor(css.campo, botao, 'border-radius')).toBe('var(--m3-forma-full)');
    expect(valor(css.campo, botao, 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.campo, botao, 'font-size')).toBe('1.25rem');
    expect(valor(css.campo, `${botao}::before`, 'background')).toBe('currentColor');
    expect(valor(css.campo, `${botao}:focus-visible`, 'outline-offset')).toBe('calc(-1 * var(--focus-width))');
    expect(valor(css.campo, `${botao}:disabled`, 'color')).toBe('var(--color-ink-disabled)');
  });

  it('cores forçadas: contorno CanvasText (tracejado no somente leitura) e o desabilitado em GrayText', () => {
    expect(valor(css.campo, campo, 'border-color', CORES_FORCADAS)).toBe('CanvasText');
    expect(valor(css.campo, `${campo}[readonly]`, 'border-color', CORES_FORCADAS)).toBe('CanvasText');
    expect(valor(css.campo, `${campo}:disabled`, 'border-color', CORES_FORCADAS)).toBe('GrayText');
    expect(valor(css.campo, `${campo}:disabled`, 'color', CORES_FORCADAS)).toBe('GrayText');
    expect(valor(css.campo, '.form-group.is-disabled .form-group__label', 'color', CORES_FORCADAS)).toBe('GrayText');
    expect(valor(css.campo, '.form-group__mostrar', 'color', CORES_FORCADAS)).toBe('ButtonText');
  });

  it('mais contraste: contorno on-surface-variant, contínuo no editável e tracejado no somente leitura', () => {
    expect(valor(css.campo, campo, 'border-color', MAIS_CONTRASTE)).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.campo, `${campo}[readonly]`, 'border-color', MAIS_CONTRASTE)).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.campo, `${campo}[readonly]:focus`, 'border-color', MAIS_CONTRASTE)).toBe(
      'var(--m3-on-surface-variant)'
    );
  });

  it('sem os apelidos da Brasa (--color-input, --color-border-strong, --radius-sm)', () => {
    expect(css.campo).not.toMatch(/--color-input|--color-border|--color-ink-muted|--color-danger|--radius-sm/);
  });
});

describe('painel, banner e aviso do Login e do Cadastro (§5.2, §5.3)', () => {
  it('a página no ritmo do carrinho: a 20 e 40 px do cabeçalho', () => {
    expect(valor(css.auth, '.auth-page', 'padding-block')).toBe('var(--space-5) var(--space-8)');
    expect(valor(css.auth, '.auth-page', 'padding-top', DESDE_MD)).toBe('var(--space-7)');
  });

  it('o painel: surface-container-low, canto 28, sem sombra, 440 px, padding 16, 24 e 32', () => {
    const painel = '.auth-panel';
    expect(valor(css.auth, painel, 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.auth, painel, 'border-radius')).toBe('var(--m3-forma-xl)');
    expect(valor(css.auth, painel, 'box-shadow')).toBeUndefined();
    expect(valor(css.auth, painel, 'max-width')).toBe('440px');
    expect(valor(css.auth, painel, 'gap')).toBe('var(--space-5)');
    expect(valor(css.auth, painel, 'padding')).toBe('var(--space-4)');
    expect(valor(css.auth, painel, 'padding', DESDE_SM)).toBe('var(--space-5)');
    expect(valor(css.auth, painel, 'padding', DESDE_MD)).toBe('var(--space-6)');
    expect(valor(css.auth, painel, 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
    expect(valor(css.auth, painel, 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });

  it('o h1 segue a regra global (--text-page, 500)', () => {
    expect(valor(css.auth, '.auth-panel__title', 'font-size')).toBeUndefined();
  });

  it('o grupo de envio: coluna sem gap; a margem do banner só dentro dele; o botão mantém a de hoje', () => {
    expect(valor(css.auth, '.auth-form__envio', 'display')).toBe('flex');
    expect(valor(css.auth, '.auth-form__envio', 'flex-direction')).toBe('column');
    expect(valor(css.auth, '.auth-form__envio', 'gap')).toBeUndefined();
    expect(valor(css.auth, '.auth-form__envio .auth-alert', 'margin-block-end')).toBe('var(--space-2)');
    expect(valor(css.auth, '.auth-alert', 'margin-block-end')).toBeUndefined();
    expect(valor(css.auth, '.auth-form__submit', 'margin-top')).toBe('var(--space-2)');
  });

  it('o banner: error-container, canto 16, padding 16, texto body-l em on-error-container, ícone de 20 px em error, sem a borda esquerda', () => {
    expect(valor(css.auth, '.auth-alert', 'background')).toBe('var(--m3-error-container)');
    expect(valor(css.auth, '.auth-alert', 'color')).toBe('var(--m3-on-error-container)');
    expect(valor(css.auth, '.auth-alert', 'border-radius')).toBe('var(--m3-forma-l)');
    expect(valor(css.auth, '.auth-alert', 'padding')).toBe('var(--space-4)');
    expect(valor(css.auth, '.auth-alert', 'font-size')).toBe('var(--m3-body-l)');
    expect(valor(css.auth, '.auth-alert', 'border-left')).toBeUndefined();
    expect(valor(css.auth, '.auth-alert__icon', 'color')).toBe('var(--m3-error)');
    expect(valor(css.auth, '.auth-alert__icon', 'font-size')).toBe('1.25rem');
    expect(valor(css.auth, '.auth-alert__icon', 'height')).toBe('var(--m3-body-l-linha)');
    expect(valor(css.auth, '.auth-alert', 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
    expect(valor(css.auth, '.auth-alert', 'border', MAIS_CONTRASTE)).toBe('1px solid var(--m3-outline)');
  });

  it('o aviso de conta salva: aviso sobre aviso-container, texto e ícone na mesma tinta', () => {
    expect(valor(css.auth, '.auth-alert--warning', 'background')).toBe('var(--m3-aviso-container)');
    expect(valor(css.auth, '.auth-alert--warning', 'color')).toBe('var(--m3-aviso)');
    expect(valor(css.auth, '.auth-alert--warning .auth-alert__icon', 'color')).toBe('var(--m3-aviso)');
  });

  it('o rodapé: frase em on-surface-variant, alinhada ao início, link em 500', () => {
    expect(valor(css.auth, '.auth-panel__footer', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.auth, '.auth-panel__footer', 'font-size')).toBe('var(--m3-body-l)');
    expect(valor(css.auth, '.auth-panel__footer', 'text-align')).toBeUndefined();
    expect(valor(css.auth, '.auth-panel__footer .link-inline', 'font-weight')).toBe('500');
  });

  it('o login usa o painel; o cadastro tem 560 px e os nomes lado a lado a partir de sm, alinhados no topo', () => {
    expect(valor(css.login, '.auth-panel', 'max-width')).toBe('440px');
    expect(valor(css.cadastro, '.auth-panel--wide', 'max-width')).toBe('560px');
    expect(valor(css.cadastro, '.auth-form__names', 'gap')).toBe('var(--space-4)');
    expect(valor(css.cadastro, '.auth-form__names', 'align-items')).toBe('start');
    expect(valor(css.cadastro, '.auth-form__names', 'grid-template-columns', DESDE_SM)).toBe(
      'repeat(2, minmax(0, 1fr))'
    );
  });

  it('sem os apelidos da Brasa no painel', () => {
    expect(css.auth).not.toMatch(/--color-surface-2|--elev-1|--color-danger|--color-warning|--radius-sm|--color-ink-muted/);
  });
});

describe('Perfil (§4, §5.6 a §5.8)', () => {
  const comAviso = 'html:has(.profile-page):has(.toast-region .toast)';

  it('foco não coberto pelo aviso: a reserva no pé abaixo de md e no topo de md a lg', () => {
    const code = escopado(css.perfil, 'ProfileView.vue');
    expect(valor(code, comAviso, 'scroll-padding-bottom', ABAIXO_MD)).toBe(
      'calc(var(--m3-barra-reserva) + var(--m3-toast-reserva))'
    );
    expect(valor(code, comAviso, 'scroll-padding-top', DE_MD_A_LG)).toBe(
      'calc(var(--navbar-h) + var(--space-4) + var(--m3-toast-reserva))'
    );
    // A partir de lg, o aviso fica sobre "Seus pedidos" e não cruza "Seus dados"
    expect(valor(code, comAviso, 'scroll-padding-top', DESDE_MD)).toBeUndefined();
    expect(valor(code, comAviso, 'scroll-padding-top', DESDE_LG)).toBeUndefined();
  });

  it('ritmo do carrinho; cabeçalho com o h1 e o "Sair" na mesma linha, que quebra com zoom', () => {
    expect(valor(css.perfil, '.profile-page', 'padding-block')).toBe('var(--space-5) var(--space-8)');
    expect(valor(css.perfil, '.profile-page', 'padding-top', DESDE_MD)).toBe('var(--space-7)');
    expect(valor(css.perfil, '.profile-page__header', 'display')).toBe('flex');
    expect(valor(css.perfil, '.profile-page__header', 'flex-wrap')).toBe('wrap');
    expect(valor(css.perfil, '.profile-page__header', 'align-items')).toBe('center');
    expect(valor(css.perfil, '.profile-page__header', 'margin-bottom')).toBe('var(--space-5)');
    expect(valor(css.perfil, '.profile-page__header', 'margin-bottom', DESDE_MD)).toBe('var(--space-6)');
    expect(valor(css.perfil, '.profile-page__title', 'font-size')).toBeUndefined();
  });

  it('5/12 e 7/12 a partir de lg; as seções em contêineres low de canto 28, sem sombra, padding 16 e 24', () => {
    expect(valor(css.perfil, '.profile-page__layout', 'grid-template-columns', DESDE_LG)).toBe('5fr 7fr');
    expect(valor(css.perfil, '.profile-page__layout', 'gap')).toBe('var(--space-5)');
    expect(valor(css.perfil, '.profile-page__layout', 'align-items')).toBe('start');
    const secao = '.profile-page__secao';
    expect(valor(css.perfil, secao, 'background')).toBe('var(--m3-surface-container-low)');
    expect(valor(css.perfil, secao, 'border-radius')).toBe('var(--m3-forma-xl)');
    expect(valor(css.perfil, secao, 'box-shadow')).toBeUndefined();
    expect(valor(css.perfil, secao, 'padding')).toBe('var(--space-4)');
    expect(valor(css.perfil, secao, 'padding', DESDE_SM)).toBe('var(--space-5)');
    expect(valor(css.perfil, secao, 'gap')).toBe('var(--space-3)');
    expect(valor(css.perfil, secao, 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
  });

  it('bloco de excluir: divisor outline-variant, texto body-m em on-surface-variant', () => {
    expect(valor(css.perfil, '.profile-delete', 'border-top')).toBe('1px solid var(--m3-outline-variant)');
    expect(valor(css.perfil, '.profile-delete', 'margin-top')).toBe('var(--space-6)');
    expect(valor(css.perfil, '.profile-delete', 'padding-top')).toBe('var(--space-5)');
    expect(valor(css.perfil, '.profile-delete__text', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.perfil, '.profile-delete__text', 'font-size')).toBe('var(--m3-body-m)');
  });

  it('histórico em lista segmentada: lowest, cantos 20/4 pela posição, vão de 2 px', () => {
    expect(valor(css.perfil, '.profile-orders', 'gap')).toBe('var(--m3-vao-segmento)');
    const item = '.profile-order';
    expect(valor(css.perfil, item, 'background')).toBe('var(--m3-surface-container-lowest)');
    expect(valor(css.perfil, item, '--m3-item-canto-cima')).toBe('var(--m3-forma-xs)');
    expect(valor(css.perfil, item, '--m3-item-canto-baixo')).toBe('var(--m3-forma-xs)');
    expect(valor(css.perfil, `${item}:first-child`, '--m3-item-canto-cima')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.perfil, `${item}:last-child`, '--m3-item-canto-baixo')).toBe('var(--m3-forma-l-aumentada)');
    expect(valor(css.perfil, item, 'padding')).toBe('var(--space-4)');
    expect(valor(css.perfil, item, 'border')).toBeUndefined();
    expect(valor(css.perfil, item, 'border', CORES_FORCADAS)).toBe('1px solid CanvasText');
  });

  it('linha 1: número e total em title-m 500; linha 2: data e contagem em body-m, o status no fim', () => {
    for (const seletor of ['.profile-order__number', '.profile-order__total']) {
      expect(valor(css.perfil, seletor, 'font-size')).toBe('var(--m3-title-m)');
      expect(valor(css.perfil, seletor, 'font-weight')).toBe('500');
    }
    expect(valor(css.perfil, '.profile-order__meta', 'flex-wrap')).toBe('wrap');
    expect(valor(css.perfil, '.profile-order__meta', 'color')).toBe('var(--m3-on-surface-variant)');
    expect(valor(css.perfil, '.profile-order__meta', 'font-size')).toBe('var(--m3-body-m)');
    expect(valor(css.perfil, '.profile-order__status', 'margin-inline-start')).toBe('auto');
  });

  // O visual do rótulo de status mora no M3RotuloStatus (m3-rotulo-status-estilo.test.js; desenho do
  // admin, §5.5): no perfil, a regra fica só com a margem
  it('o rótulo de status: no perfil, só a margem; o visual é do M3RotuloStatus', () => {
    const status = '.profile-order__status';
    expect(valor(css.perfil, status, 'margin-inline-start')).toBe('auto');
    for (const propriedade of ['color', 'background', 'border-radius', 'padding', 'font-size', 'letter-spacing']) {
      expect(valor(css.perfil, status, propriedade)).toBeUndefined();
    }
    expect(valor(css.perfil, status, 'border', CORES_FORCADAS)).toBeUndefined();
  });

  it('"Ver itens" com cara de text button: 44 px, canto full, label-l 500 em primary, camada e anel por dentro', () => {
    const summary = '.profile-order__summary';
    expect(valor(css.perfil, summary, 'min-height')).toBe('var(--target-min)');
    expect(valor(css.perfil, summary, 'padding-inline')).toBe('var(--space-3)');
    expect(valor(css.perfil, summary, 'margin-inline-start')).toBe('calc(-1 * var(--space-3))');
    expect(valor(css.perfil, summary, 'border-radius')).toBe('var(--m3-forma-full)');
    expect(valor(css.perfil, summary, 'color')).toBe('var(--m3-primary)');
    expect(valor(css.perfil, summary, 'font-size')).toBe('var(--m3-label-l)');
    expect(valor(css.perfil, summary, 'list-style')).toBe('none');
    expect(valor(css.perfil, `${summary}::-webkit-details-marker`, 'display')).toBe('none');
    expect(valor(css.perfil, `${summary}::before`, 'background')).toBe('currentColor');
    expect(valor(css.perfil, `${summary}:focus-visible`, 'outline-offset')).toBe('calc(-1 * var(--focus-width))');
  });

  it('os chevrons trocam por details[open], sem transform', () => {
    expect(valor(css.perfil, '.profile-order__chevron--aberto', 'display')).toBe('none');
    expect(valor(css.perfil, '.profile-order__details[open] .profile-order__chevron--fechado', 'display')).toBe('none');
    expect(valor(css.perfil, '.profile-order__details[open] .profile-order__chevron--aberto', 'display')).toBe(
      'inline-block'
    );
    expect(css.perfil).not.toMatch(/transform/);
  });

  it('sem os apelidos da Brasa no perfil', () => {
    expect(css.perfil).not.toMatch(/--color-surface-2|--elev-1|--color-border|--color-info|--radius-|--color-ink-muted/);
  });
});

describe('pares da Conta (§8)', () => {
  const { ler } = lerTokens(readFileSync(`${ESTILOS}base/_tokens.scss`, 'utf8'));
  const duasCasas = (n) => Math.floor(n * 100) / 100;
  const ESPERADOS = [
    ['m3-outline', 'm3-surface-container', undefined, 3, 3.85],
    ['m3-error', 'm3-surface-container-low', undefined, 4.5, 5.84],
    ['m3-error', 'm3-surface-container', undefined, 4.5, 5.54],
    ['m3-on-error-container', 'm3-surface-container-low', undefined, 4.5, 8.46],
    ['m3-on-error-container', 'm3-surface-container', undefined, 4.5, 8.02],
    ['m3-primary', 'm3-camada-primary-pressionada', 'm3-surface', 4.5, 5.33],
    ['m3-secondary', 'm3-camada-primary-pressionada', 'm3-surface', 3, 5.34],
    ['m3-primary', 'm3-camada-primary-pressionada', 'm3-surface-container-lowest', 4.5, 5.57],
    ['m3-secondary', 'm3-camada-primary-pressionada', 'm3-surface-container-lowest', 3, 5.59],
  ];

  it('são 9, no grupo PARES_CONTA, todos em PARES', () => {
    expect(PARES_CONTA).toHaveLength(ESPERADOS.length);
    for (const par of PARES_CONTA) expect(PARES).toContain(par);
  });

  it.each(ESPERADOS)('%s sobre %s (%s): mínimo %s, medido %s', (frente, fundo, sobre, minimo, medido) => {
    const par = PARES_CONTA.find((p) => p.frente === frente && p.fundo === fundo && p.sobre === sobre);
    expect(par, 'par em PARES_CONTA').toBeTruthy();
    expect(par.minimo).toBe(minimo);
    expect(duasCasas(medirPar(ler, par))).toBe(medido);
  });

  it('saem os pares do campo com fundo e o texto do banner em on-surface', () => {
    const sobreOCampo = PARES.filter((par) => par.fundo === 'm3-surface-container-highest' && /campo/.test(par.onde));
    expect(sobreOCampo).toEqual([]);
    expect(PARES_OUTRAS_TELAS.find((par) => par.onde === 'borda de campo')).toBeUndefined();
    expect(PARES_TELAS_BRASA.find((par) => par.onde === 'erro sobre o campo')).toBeUndefined();
    expect(PARES_TELAS_BRASA.find((par) => par.frente === 'm3-on-surface' && par.fundo === 'm3-error-container')).toBeUndefined();
  });

  it('o primary sobre o diálogo e sobre o item passa a texto: o mínimo sobe para 4,5', () => {
    for (const fundo of ['m3-surface-container', 'm3-surface-container-lowest']) {
      const par = PARES_CARDAPIO.find((p) => p.frente === 'm3-primary' && p.fundo === fundo && !p.sobre);
      expect(par?.minimo).toBe(4.5);
      expect(medirPar(ler, par)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
