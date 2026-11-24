// BaseDialog (desenho dos componentes base, §4.1 e §5.2): showModal, foco inicial, Tab preso (também a
// partir do título), Esc e fundo, devolução do foco, a retenção dos avisos, os atributos repassados, os
// divisores pela rolagem e a região de anúncio.
import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import BaseDialog from '../components/ui/BaseDialog.vue';
import { useToastStore } from '../stores/toast';

// O jsdom não implementa showModal/close: o mínimo para o atributo open e o evento close
beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function showModal() {
    this.setAttribute('open', '');
  });
  HTMLDialogElement.prototype.close = vi.fn(function close() {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  });
});

// O jsdom não calcula layout: todo elemento conta como visível para o Tab preso
const visivel = () => {
  Element.prototype.getClientRects = function getClientRects() {
    return [{ width: 1, height: 1 }];
  };
};

let pinia;
let store;
let wrapper;

const montar = ({ props = {}, slots = {}, attrs = {} } = {}) =>
  mount(BaseDialog, {
    attachTo: document.body,
    props: { open: false, title: 'Excluir conta?', titleId: 'teste-titulo', ...props },
    attrs,
    slots,
    global: { plugins: [pinia], stubs: { 'font-awesome-icon': true } },
  });

const tab = (shiftKey = false) => {
  const evento = new KeyboardEvent('keydown', { key: 'Tab', shiftKey, bubbles: true, cancelable: true });
  document.activeElement.dispatchEvent(evento);
  return evento;
};

describe('BaseDialog', () => {
  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    store = useToastStore();
    visivel();
  });

  afterEach(() => {
    wrapper?.unmount();
    document.body.innerHTML = '';
  });

  it('abrir chama o showModal; a região de anúncio existe vazia', async () => {
    wrapper = montar();
    await wrapper.setProps({ open: true });
    await flushPromises();

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalledTimes(1);
    const regiao = wrapper.find('p[role="status"]');
    expect(regiao.attributes('aria-atomic')).toBe('true');
    expect(regiao.text()).toBe('');
  });

  it('foco inicial: [autofocus], senão o primeiro controle do corpo, senão o título', async () => {
    wrapper = montar({
      slots: {
        default: '<input id="campo" />',
        footer: '<button id="cancelar" autofocus>Cancelar</button>',
      },
    });
    await wrapper.setProps({ open: true });
    await flushPromises();
    expect(document.activeElement.id).toBe('cancelar');
    wrapper.unmount();

    wrapper = montar({ slots: { default: '<input id="campo" />' } });
    await wrapper.setProps({ open: true });
    await flushPromises();
    expect(document.activeElement.id).toBe('campo');
    wrapper.unmount();

    wrapper = montar({ slots: { default: '<p>Só texto</p>' } });
    await wrapper.setProps({ open: true });
    await flushPromises();
    expect(document.activeElement.id).toBe('teste-titulo');
  });

  it('o Tab do último volta ao primeiro, e o Shift+Tab do primeiro vai ao último', async () => {
    wrapper = montar({
      slots: { default: '<input id="campo" />', footer: '<button id="ultimo">Fim</button>' },
    });
    await wrapper.setProps({ open: true });
    await flushPromises();

    const fechar = wrapper.find('button[aria-label="Fechar"]').element;
    const ultimo = document.getElementById('ultimo');
    ultimo.focus();
    expect(tab().defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(fechar);

    expect(tab(true).defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(ultimo);
  });

  it('o Shift+Tab com o foco no título vai ao último focável (o caso dos "Detalhes")', async () => {
    wrapper = montar({ slots: { default: '<p>Pedido</p>', footer: '<button id="fechar-rodape">Fechar</button>' } });
    await wrapper.setProps({ open: true });
    await flushPromises();
    expect(document.activeElement.id).toBe('teste-titulo');

    expect(tab(true).defaultPrevented).toBe(true);
    expect(document.activeElement.id).toBe('fechar-rodape');
  });

  it('abrir chama segurar() e fechar chama soltar(); desmontado aberto, solta', async () => {
    const segurar = vi.spyOn(store, 'segurar');
    const soltar = vi.spyOn(store, 'soltar');
    wrapper = montar();

    await wrapper.setProps({ open: true });
    await flushPromises();
    expect(segurar).toHaveBeenCalledTimes(1);
    expect(store.dialogosAbertos).toBe(1);

    await wrapper.setProps({ open: false });
    await flushPromises();
    expect(soltar).toHaveBeenCalledTimes(1);
    expect(store.dialogosAbertos).toBe(0);

    await wrapper.setProps({ open: true });
    await flushPromises();
    expect(store.dialogosAbertos).toBe(1);
    wrapper.unmount();
    wrapper = null;
    expect(store.dialogosAbertos).toBe(0);
  });

  it('o Esc (cancel) emite close; o clique que começa e termina no <dialog> emite close, e o que começa no painel não', async () => {
    wrapper = montar();
    await wrapper.setProps({ open: true });
    await flushPromises();
    const dialog = wrapper.find('dialog');

    await dialog.trigger('cancel');
    expect(wrapper.emitted('close')).toHaveLength(1);

    await wrapper.find('.dialog__panel').trigger('pointerdown');
    await dialog.trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(1);

    await dialog.trigger('pointerdown');
    await dialog.trigger('click');
    expect(wrapper.emitted('close')).toHaveLength(2);
  });

  it('ao fechar, o foco volta a quem abriu, se ele ainda está na página', async () => {
    const abridor = document.createElement('button');
    document.body.appendChild(abridor);
    abridor.focus();
    wrapper = montar();
    await wrapper.setProps({ open: true });
    await flushPromises();
    expect(document.activeElement).not.toBe(abridor);

    await wrapper.setProps({ open: false });
    await flushPromises();
    expect(document.activeElement).toBe(abridor);
  });

  it('role e aria-describedby repassados chegam ao <dialog>', () => {
    wrapper = montar({ attrs: { role: 'alertdialog', 'aria-describedby': 'texto' } });
    const dialog = wrapper.find('dialog');
    expect(dialog.attributes('role')).toBe('alertdialog');
    expect(dialog.attributes('aria-describedby')).toBe('texto');
    expect(dialog.attributes('aria-labelledby')).toBe('teste-titulo');
  });

  it('os divisores seguem a rolagem do corpo: is-rolado fora do topo e tem-mais com conteúdo abaixo', async () => {
    wrapper = montar({ slots: { default: '<p>Longo</p>', footer: '<button>Ok</button>' } });
    await wrapper.setProps({ open: true });
    await flushPromises();
    const corpo = wrapper.find('.dialog__body');
    const painel = wrapper.find('.dialog__panel');
    Object.defineProperty(corpo.element, 'clientHeight', { configurable: true, value: 200 });
    Object.defineProperty(corpo.element, 'scrollHeight', { configurable: true, value: 600 });

    corpo.element.scrollTop = 0;
    await corpo.trigger('scroll');
    expect(painel.classes()).not.toContain('is-rolado');
    expect(painel.classes()).toContain('tem-mais');

    corpo.element.scrollTop = 150;
    await corpo.trigger('scroll');
    expect(painel.classes()).toEqual(expect.arrayContaining(['is-rolado', 'tem-mais']));

    corpo.element.scrollTop = 400;
    await corpo.trigger('scroll');
    expect(painel.classes()).toContain('is-rolado');
    expect(painel.classes()).not.toContain('tem-mais');
  });

  it('o botão em loading dentro do diálogo anuncia o rótulo novo na região do diálogo', async () => {
    const { default: BaseButton } = await import('../components/ui/BaseButton.vue');
    const Conteudo = {
      components: { BaseDialog, BaseButton },
      props: { carregando: Boolean },
      template: `<BaseDialog :open="true" title="Excluir conta?" title-id="t">
        <BaseButton :loading="carregando">{{ carregando ? 'Excluindo…' : 'Excluir conta' }}</BaseButton>
      </BaseDialog>`,
    };
    wrapper = mount(Conteudo, {
      attachTo: document.body,
      global: { plugins: [pinia], stubs: { 'font-awesome-icon': true } },
    });
    await flushPromises();

    await wrapper.setProps({ carregando: true });
    await flushPromises();
    expect(wrapper.find('.dialog p[role="status"]').text()).toBe('Excluindo…');
  });
});
