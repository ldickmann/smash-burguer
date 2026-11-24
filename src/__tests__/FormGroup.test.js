// FormGroup no M3 (docs/direcoes/desenho/conta.md, §5.1, §7.1 e §13): o campo outlined com o rótulo
// acima, o erro no lugar da ajuda (no DOM e no aria-describedby), o somente leitura separado do
// desabilitado, a seta do select, a região viva do CEP (prop live) e o botão de mostrar a senha em
// todo type="password" (toggle da APG: nome fixo e aria-pressed).
import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import FormGroup from '@/components/FormGroup.vue';

let wrapper;
afterEach(() => wrapper?.unmount());

const montar = (props = {}) => {
  wrapper = mount(FormGroup, {
    props: { id: 'campo', label: 'Campo', ...props },
    attachTo: document.body,
    global: {
      stubs: { 'font-awesome-icon': { props: ['icon'], template: '<svg :data-icone="icon[1]" />' } },
    },
  });
  return wrapper;
};

const controle = () => wrapper.find('#campo');

describe('FormGroup: rótulo e mensagens', () => {
  it('o rótulo é um label ligado ao campo, antes dele', () => {
    montar();
    const label = wrapper.find('label.form-group__label');
    expect(label.attributes('for')).toBe('campo');
    expect(label.text()).toBe('Campo');
    expect(label.element.compareDocumentPosition(controle().element) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('com erro: aria-invalid, aria-describedby no erro e o ícone decorativo junto do texto', () => {
    montar({ error: 'O e-mail é obrigatório' });
    expect(controle().attributes('aria-invalid')).toBe('true');
    expect(controle().attributes('aria-describedby')).toBe('campo-erro');
    const erro = wrapper.find('p#campo-erro.form-group__error');
    expect(erro.text()).toBe('O e-mail é obrigatório');
    const icone = erro.find('.form-group__icone');
    expect(icone.attributes('aria-hidden')).toBe('true');
    expect(icone.find('[data-icone="circle-exclamation"]').exists()).toBe(true);
    expect(wrapper.classes()).toContain('has-error');
  });

  it('sem erro, nenhum aria-invalid nem aria-describedby', () => {
    montar();
    expect(controle().attributes('aria-invalid')).toBeUndefined();
    expect(controle().attributes('aria-describedby')).toBeUndefined();
    expect(wrapper.find('.form-group__mensagens').exists()).toBe(false);
  });

  it('com ajuda e sem erro, o aria-describedby aponta a ajuda', () => {
    montar({ helper: 'Mínimo de 6 caracteres, com letra e número' });
    expect(controle().attributes('aria-describedby')).toBe('campo-ajuda');
    expect(wrapper.find('p#campo-ajuda.form-group__help').text()).toBe('Mínimo de 6 caracteres, com letra e número');
  });

  it('com ajuda e erro, o erro toma o lugar da ajuda no DOM e no aria-describedby', () => {
    montar({ helper: 'Consultamos o CEP no ViaCEP para preencher o endereço.', error: 'CEP não encontrado.' });
    expect(controle().attributes('aria-describedby')).toBe('campo-erro');
    expect(wrapper.find('#campo-ajuda').exists()).toBe(false);
    expect(wrapper.find('#campo-erro').text()).toBe('CEP não encontrado.');
  });

  it('carregando: o arco decorativo e o texto na ajuda', () => {
    montar({ helper: 'Buscando endereço…', loading: true });
    const ajuda = wrapper.find('#campo-ajuda');
    expect(ajuda.find('svg.form-group__spinner').attributes('aria-hidden')).toBe('true');
    expect(ajuda.text()).toBe('Buscando endereço…');
    expect(controle().attributes('aria-describedby')).toBe('campo-ajuda');
  });
});

describe('FormGroup: região viva (prop live)', () => {
  it('com live, o contêiner das mensagens tem role="status" e aria-atomic desde a montagem, mesmo sem ajuda', () => {
    montar({ live: true });
    const regiao = wrapper.find('div.form-group__mensagens');
    expect(regiao.exists()).toBe(true);
    expect(regiao.attributes('role')).toBe('status');
    expect(regiao.attributes('aria-atomic')).toBe('true');
    expect(regiao.text()).toBe('');
  });

  it('com live, a ajuda e depois o erro passam pela mesma região', async () => {
    montar({ live: true, helper: 'Consultamos o CEP no ViaCEP para preencher o endereço.' });
    expect(wrapper.find('[role="status"] #campo-ajuda').exists()).toBe(true);
    await wrapper.setProps({ error: 'CEP não encontrado.' });
    expect(wrapper.find('[role="status"] #campo-erro').text()).toBe('CEP não encontrado.');
    expect(wrapper.find('#campo-ajuda').exists()).toBe(false);
  });

  it('sem live, as mensagens não têm papel', () => {
    montar({ helper: 'Ajuda', error: '' });
    expect(wrapper.find('.form-group__mensagens').attributes('role')).toBeUndefined();
    expect(wrapper.find('[role]').exists()).toBe(false);
  });
});

describe('FormGroup: somente leitura e desabilitado', () => {
  it('readonly chega ao campo e só ele dá .is-readonly', () => {
    montar({ readonly: true, modelValue: 'Rua das Flores' });
    expect(controle().attributes('readonly')).toBeDefined();
    expect(controle().attributes('disabled')).toBeUndefined();
    expect(wrapper.classes()).toContain('is-readonly');
    expect(wrapper.classes()).not.toContain('is-disabled');
  });

  it('disabled chega ao campo e dá .is-disabled, separado do somente leitura', () => {
    montar({ disabled: true });
    expect(controle().attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('is-disabled');
    expect(wrapper.classes()).not.toContain('is-readonly');
  });
});

describe('FormGroup: tipos', () => {
  it('select: as opções e a seta decorativa dentro do invólucro', () => {
    montar({
      type: 'select',
      modelValue: 'b',
      options: [
        { value: 'a', label: 'Opção A' },
        { value: 'b', label: 'Opção B' },
      ],
    });
    const select = wrapper.find('span.form-group__select > select.form-group__field--select');
    expect(select.attributes('id')).toBe('campo');
    expect(select.findAll('option').map((o) => o.text())).toEqual(['Opção A', 'Opção B']);
    const seta = wrapper.find('span.form-group__select .form-group__seta');
    expect(seta.attributes('aria-hidden')).toBe('true');
    expect(seta.attributes('data-icone')).toBe('chevron-down');
  });

  it('select: a troca emite o valor', async () => {
    montar({ type: 'select', options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] });
    await controle().setValue('b');
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['b']);
  });

  it('textarea: rows, maxlength e o contador como ajuda', () => {
    montar({ type: 'textarea', rows: 3, maxlength: 140, helper: '0/140' });
    const textarea = wrapper.find('textarea.form-group__field--textarea');
    expect(textarea.attributes('rows')).toBe('3');
    expect(textarea.attributes('maxlength')).toBe('140');
    expect(textarea.attributes('aria-describedby')).toBe('campo-ajuda');
    expect(wrapper.find('#campo-ajuda').text()).toBe('0/140');
  });

  it('as máscaras de celular e de CEP continuam', async () => {
    montar({ mask: 'phone', modelValue: '47999998888' });
    expect(controle().element.value).toBe('(47) 99999-8888');
    wrapper.unmount();
    montar({ mask: 'cep', modelValue: '' });
    await controle().setValue('89010-0009');
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['89010000']);
    expect(controle().element.value).toBe('89010-000');
  });

  it('o botão de mostrar a senha só existe no type="password"', () => {
    for (const type of ['text', 'email', 'tel', 'date', 'textarea']) {
      montar({ type });
      expect(wrapper.find('button').exists()).toBe(false);
      wrapper.unmount();
    }
  });
});

describe('FormGroup: mostrar a senha (decisão do usuário, §13)', () => {
  const botao = () => wrapper.find('button.form-group__mostrar');

  it('botão comum dentro do campo, com nome fixo, aria-pressed falso e aria-controls no campo', () => {
    montar({ type: 'password', modelValue: 'segredo1' });
    expect(botao().attributes('type')).toBe('button');
    expect(botao().attributes('aria-label')).toBe('Mostrar senha');
    expect(botao().attributes('aria-pressed')).toBe('false');
    expect(botao().attributes('aria-controls')).toBe('campo');
    expect(botao().find('[data-icone="eye"]').attributes('aria-hidden')).toBe('true');
    expect(controle().attributes('type')).toBe('password');
    expect(wrapper.find('span.form-group__controle > #campo + button.form-group__mostrar').exists()).toBe(true);
    expect(controle().classes()).toContain('form-group__field--senha');
  });

  it('alterna o tipo e o aria-pressed; o nome não muda; o valor e o autocomplete ficam', async () => {
    montar({ type: 'password', modelValue: 'segredo1', autocomplete: 'current-password' });
    await botao().trigger('click');
    expect(controle().attributes('type')).toBe('text');
    expect(botao().attributes('aria-pressed')).toBe('true');
    expect(botao().attributes('aria-label')).toBe('Mostrar senha');
    expect(botao().find('[data-icone="eye-slash"]').exists()).toBe(true);
    expect(controle().element.value).toBe('segredo1');
    expect(controle().attributes('autocomplete')).toBe('current-password');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();

    await botao().trigger('click');
    expect(controle().attributes('type')).toBe('password');
    expect(botao().attributes('aria-pressed')).toBe('false');
  });

  it('o foco fica no botão depois de alternar', async () => {
    montar({ type: 'password' });
    botao().element.focus();
    await botao().trigger('click');
    expect(document.activeElement).toBe(botao().element);
  });

  it('o botão não envia o formulário em volta', async () => {
    let enviado = false;
    wrapper = mount(
      {
        components: { FormGroup },
        template: '<form @submit.prevent="enviar"><FormGroup id="campo" label="Senha" type="password" /></form>',
        methods: { enviar: () => (enviado = true) },
      },
      { attachTo: document.body, global: { stubs: { 'font-awesome-icon': true } } }
    );
    await wrapper.find('button.form-group__mostrar').trigger('click');
    expect(enviado).toBe(false);
  });

  it('com o campo desabilitado, o botão também fica', () => {
    montar({ type: 'password', disabled: true });
    expect(botao().attributes('disabled')).toBeDefined();
  });

  it('começa escondida a cada montagem', async () => {
    montar({ type: 'password' });
    await botao().trigger('click');
    wrapper.unmount();
    montar({ type: 'password' });
    expect(controle().attributes('type')).toBe('password');
    expect(botao().attributes('aria-pressed')).toBe('false');
  });

  // /code-review: ir do campo ao botão não é sair do campo (o erro não aparece no meio da digitação)
  it('o foco que passa do campo ao botão não emite blur', async () => {
    montar({ type: 'password' });
    await controle().trigger('blur', { relatedTarget: botao().element });
    expect(wrapper.emitted('blur')).toBeUndefined();
  });

  it('o clique no botão não emite blur, mesmo sem relatedTarget (o Safari não foca botões no clique)', async () => {
    montar({ type: 'password' });
    await botao().trigger('pointerdown');
    await controle().trigger('blur', { relatedTarget: null });
    expect(wrapper.emitted('blur')).toBeUndefined();
  });

  it('sair do botão para fora do campo emite blur; voltar ao campo, não', async () => {
    montar({ type: 'password' });
    await botao().trigger('blur', { relatedTarget: controle().element });
    expect(wrapper.emitted('blur')).toBeUndefined();
    await botao().trigger('blur', { relatedTarget: document.body });
    expect(wrapper.emitted('blur')).toHaveLength(1);
  });

  it('sair do campo para outro lugar continua emitindo blur', async () => {
    montar({ type: 'password' });
    await controle().trigger('blur', { relatedTarget: document.body });
    expect(wrapper.emitted('blur')).toHaveLength(1);
  });

  // /code-review: a senha vai como type="password" no envio, para o gerenciador de senhas a reconhecer
  it('o envio do formulário esconde a senha de novo', async () => {
    wrapper = mount(
      {
        components: { FormGroup },
        template: '<form @submit.prevent><FormGroup id="campo" label="Senha" type="password" /></form>',
      },
      { attachTo: document.body, global: { stubs: { 'font-awesome-icon': true } } }
    );
    await wrapper.find('button.form-group__mostrar').trigger('click');
    expect(wrapper.find('#campo').attributes('type')).toBe('text');
    await wrapper.find('form').trigger('submit');
    expect(wrapper.find('#campo').attributes('type')).toBe('password');
    expect(wrapper.find('button.form-group__mostrar').attributes('aria-pressed')).toBe('false');
  });
});
