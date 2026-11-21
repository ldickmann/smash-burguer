import { mount } from '@vue/test-utils';
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

  it('em loading marca aria-busy, mostra o spinner e bloqueia o clique', async () => {
    const onClick = vi.fn();
    const wrapper = mountButton({
      props: { loading: true },
      attrs: { onClick },
      slots: { default: 'Entrando…' },
    });
    const button = wrapper.find('button');

    expect(button.attributes('aria-busy')).toBe('true');
    expect(wrapper.find('.btn__spinner').exists()).toBe(true);
    await button.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
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

  it('pressed vira aria-pressed; sem a prop, o atributo não aparece', () => {
    const pressed = mountButton({ props: { pressed: true }, slots: { default: 'Bebidas' } });
    const notPressed = mountButton({ props: { pressed: false }, slots: { default: 'Bebidas' } });
    const plain = mountButton({ slots: { default: 'Bebidas' } });

    expect(pressed.find('button').attributes('aria-pressed')).toBe('true');
    expect(notPressed.find('button').attributes('aria-pressed')).toBe('false');
    expect(plain.find('button').attributes('aria-pressed')).toBeUndefined();
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

  it('variantes geram as classes do mapa M3; danger, iconOnly e pressed ficam com a forma de hoje', () => {
    const classesDe = (props) => mountButton({ props, slots: { default: 'Ok' } }).find('button').classes();

    expect(classesDe({ variant: 'primary' })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--filled']));
    expect(classesDe({ variant: 'secondary' })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--tonal']));
    expect(classesDe({ variant: 'ghost' })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--texto']));
    // O loading só troca o conteúdo pelo spinner: o botão continua no mapa
    expect(classesDe({ loading: true })).toEqual(expect.arrayContaining(['m3-botao', 'm3-botao--filled']));

    const aDesenhar = [{ variant: 'danger' }, { iconOnly: true, label: 'Fechar', iconStart: 'xmark' }, { pressed: false }];
    for (const props of aDesenhar) {
      const classes = classesDe(props);
      expect(classes).toContain('btn--legado');
      expect(classes.filter((classe) => classe.startsWith('m3-botao'))).toEqual([]);
    }
  });
});
