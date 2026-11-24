import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import BaseButton from '../components/ui/BaseButton.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', component: { template: '<div />' } }, { path: '/menu', component: { template: '<div />' } }],
});

const mountButton = (options = {}) =>
  mount(BaseButton, {
    ...options,
    global: {
      plugins: [router],
      stubs: { 'font-awesome-icon': { template: '<svg class="fa-stub" />' } },
    },
  });

describe('BaseButton', () => {
  it('renderiza um <button type="button"> primário md por padrão', () => {
    const wrapper = mountButton({ slots: { default: 'Adicionar' } });
    const button = wrapper.find('button');

    expect(button.exists()).toBe(true);
    expect(button.attributes('type')).toBe('button');
    expect(button.classes()).toEqual(expect.arrayContaining(['btn', 'btn--primary', 'btn--md']));
    expect(button.text()).toBe('Adicionar');
  });

  it.each(['primary', 'secondary', 'ghost', 'danger'])('aplica a variante %s', (variant) => {
    const wrapper = mountButton({ props: { variant }, slots: { default: 'Ok' } });
    expect(wrapper.find('button').classes()).toContain(`btn--${variant}`);
  });

  it('repassa type="submit"', () => {
    const wrapper = mountButton({ props: { type: 'submit' }, slots: { default: 'Entrar' } });
    expect(wrapper.find('button').attributes('type')).toBe('submit');
  });

  it('em loading mostra o spinner, bloqueia o clique, trava a largura e não põe aria-busy', async () => {
    const onClick = vi.fn();
    const wrapper = mountButton({
      props: { loading: true },
      attrs: { onClick },
      slots: { default: 'Entrando…' },
    });
    const button = wrapper.find('button');

    expect(button.attributes('aria-busy')).toBeUndefined();
    expect(button.classes()).toContain('is-loading');
    expect(wrapper.find('.btn__spinner').exists()).toBe(true);
    await button.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('ao entrar em loading, trava a largura de repouso', async () => {
    const wrapper = mountButton({ slots: { default: 'Entrar' } });
    const button = wrapper.find('button');
    Object.defineProperty(button.element, 'offsetWidth', { configurable: true, value: 120 });

    await wrapper.setProps({ loading: true });
    expect(button.attributes('style')).toContain('min-width: 120px');
  });

  it('desabilitado usa o atributo disabled de verdade e não chama o handler', async () => {
    const onClick = vi.fn();
    const wrapper = mountButton({ props: { disabled: true }, attrs: { onClick }, slots: { default: 'Confirmar' } });
    const button = wrapper.find('button');

    expect(button.attributes('disabled')).toBeDefined();
    await button.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('chama o handler de clique quando habilitado', async () => {
    const onClick = vi.fn();
    const wrapper = mountButton({ attrs: { onClick }, slots: { default: 'Ok' } });
    await wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('iconOnly usa o label como aria-label e não mostra texto', () => {
    const wrapper = mountButton({ props: { iconOnly: true, label: 'Fechar', iconStart: 'xmark' } });
    const button = wrapper.find('button');

    expect(button.attributes('aria-label')).toBe('Fechar');
    expect(button.classes()).toContain('btn--icon-only');
    expect(button.find('.btn__label').exists()).toBe(false);
    expect(button.find('.fa-stub').exists()).toBe(true);
  });

  it('com `to` renderiza um link com a mesma aparência', () => {
    const wrapper = mountButton({ props: { to: '/menu', variant: 'secondary' }, slots: { default: 'Ver cardápio' } });
    const link = wrapper.find('a');

    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('/menu');
    expect(link.classes()).toContain('btn--secondary');
  });

  it('repassa class e data-* para o elemento interativo', () => {
    const wrapper = mountButton({ attrs: { class: 'extra', 'data-test': 'x' }, slots: { default: 'Ok' } });
    const button = wrapper.find('button');

    expect(button.classes()).toContain('extra');
    expect(button.attributes('data-test')).toBe('x');
  });

  it('retorno mostra "Adicionado" sem mudar o nome acessível', async () => {
    const semRetorno = mountButton({ slots: { default: 'Adicionar' } });
    expect(semRetorno.find('.btn__face--verso').exists()).toBe(false);

    const wrapper = mountButton({
      props: { variant: 'secondary', retorno: false },
      attrs: { 'aria-label': 'Adicionar Coca-Cola' },
      slots: { default: 'Adicionar' },
    });
    const button = wrapper.find('button');
    const verso = button.find('.btn__face--verso');

    // A face de trás já está no DOM (a troca é por opacidade), escondida do leitor de tela
    expect(verso.exists()).toBe(true);
    expect(verso.attributes('aria-hidden')).toBe('true');
    expect(verso.text()).toBe('Adicionado');
    expect(verso.find('.btn__check').exists()).toBe(true);
    expect(button.classes()).not.toContain('is-retorno');

    await wrapper.setProps({ retorno: true });
    expect(button.classes()).toContain('is-retorno');
    expect(button.attributes('aria-label')).toBe('Adicionar Coca-Cola');
    expect(button.find('.btn__face--frente').attributes('aria-hidden')).toBeUndefined();
    expect(button.find('.btn__label').text()).toBe('Adicionar');
  });

  it('variantes geram as classes do mapa M3, sem o legado da Brasa', () => {
    const classesDe = (props) => mountButton({ props, slots: { default: 'Ok' } }).find('button').classes();

    expect(classesDe({ variant: 'primary' })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--filled']));
    expect(classesDe({ variant: 'secondary' })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--tonal']));
    expect(classesDe({ variant: 'ghost' })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--texto']));
    expect(classesDe({ variant: 'danger' })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--perigo']));
    // O loading só troca o conteúdo pelo spinner: o botão continua no mapa
    expect(classesDe({ loading: true })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--filled']));

    for (const props of [{ variant: 'danger' }, { iconOnly: true, label: 'Fechar', iconStart: 'xmark' }]) {
      expect(classesDe(props)).not.toContain('btn--legado');
    }
  });

  it('iconOnly: m3-botao, a forma da variant e btn--icon-only (ghost padrão, secondary tonal, primary filled)', () => {
    const classesDe = (variant) =>
      mountButton({ props: { variant, iconOnly: true, label: 'Fechar', iconStart: 'xmark' } }).find('button').classes();

    expect(classesDe('ghost')).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--texto', 'btn--icon-only']));
    expect(classesDe('secondary')).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--tonal', 'btn--icon-only']));
    expect(classesDe('primary')).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--filled', 'btn--icon-only']));
    expect(classesDe('danger')).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--perigo', 'btn--icon-only']));
  });

  it('a prop pressed saiu: nenhum aria-pressed sai do botão', () => {
    expect(BaseButton.props.pressed).toBeUndefined();
    const wrapper = mountButton({ slots: { default: 'Bebidas' } });
    expect(wrapper.find('button').attributes('aria-pressed')).toBeUndefined();
  });

  it('aria-disabled="true" repassado bloqueia o handler, sem pôr disabled (o botão continua focável)', async () => {
    const onClick = vi.fn();
    const wrapper = mountButton({ attrs: { onClick, 'aria-disabled': 'true' }, slots: { default: 'Confirmar' } });
    const button = wrapper.find('button');

    expect(button.attributes('aria-disabled')).toBe('true');
    expect(button.attributes('disabled')).toBeUndefined();
    await button.trigger('click');
    expect(onClick).not.toHaveBeenCalled();

    const livre = mountButton({ attrs: { onClick }, slots: { default: 'Confirmar' } });
    await livre.find('button').trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('BaseButton: anúncio do rótulo de carregamento', () => {
  const Rotulo = {
    components: { BaseButton },
    props: { carregando: Boolean },
    template: '<BaseButton :loading="carregando">{{ carregando ? "Entrando…" : "Entrar" }}</BaseButton>',
  };
  const Fixo = {
    components: { BaseButton },
    props: { carregando: Boolean },
    template: '<BaseButton :loading="carregando">Salvar</BaseButton>',
  };

  it('quando o rótulo muda, o texto novo vai ao anunciador (o do App.vue fora de diálogo)', async () => {
    const { useAnnouncer } = await import('../composables/useAnnouncer');
    const { message } = useAnnouncer();
    message.value = '';
    const wrapper = mount(Rotulo, { global: { plugins: [router], stubs: { 'font-awesome-icon': true } } });

    await wrapper.setProps({ carregando: true });
    await flushPromises();
    expect(message.value).toBe('Entrando…');
  });

  it('quando o rótulo não muda, nada é anunciado', async () => {
    const { useAnnouncer } = await import('../composables/useAnnouncer');
    const { message } = useAnnouncer();
    message.value = '';
    const wrapper = mount(Fixo, { global: { plugins: [router], stubs: { 'font-awesome-icon': true } } });

    await wrapper.setProps({ carregando: true });
    await flushPromises();
    expect(message.value).toBe('');
  });

  it('dentro de um diálogo, vai ao anunciador fornecido por ele', async () => {
    const { CHAVE_ANUNCIADOR } = await import('../composables/useAnnouncer');
    const anunciar = vi.fn();
    const wrapper = mount(Rotulo, {
      global: { plugins: [router], stubs: { 'font-awesome-icon': true }, provide: { [CHAVE_ANUNCIADOR]: anunciar } },
    });

    await wrapper.setProps({ carregando: true });
    await flushPromises();
    expect(anunciar).toHaveBeenCalledWith('Entrando…');
  });
});
