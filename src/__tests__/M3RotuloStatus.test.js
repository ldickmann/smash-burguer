// M3RotuloStatus (desenho do admin, §5.5 e §7.2): o rótulo de status vira componente. Texto num
// contêiner tonal, raiz p, sem papel, foco, camada nem ícone: não é chip, porque não é controle.
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import M3RotuloStatus from '@/components/ui/M3RotuloStatus.vue';

const montar = (props, texto = 'Pendente') => mount(M3RotuloStatus, { props, slots: { default: texto } });

describe('M3RotuloStatus', () => {
  it('a raiz é um p com a classe m3-status, sem papel, sem tabindex e sem filho interativo', () => {
    const wrapper = montar();
    expect(wrapper.element.tagName).toBe('P');
    expect(wrapper.classes()).toContain('m3-status');
    expect(wrapper.attributes('role')).toBeUndefined();
    expect(wrapper.attributes('tabindex')).toBeUndefined();
    expect(wrapper.find('button, a, svg').exists()).toBe(false);
  });

  it('o tom padrão é info', () => {
    expect(montar().classes()).toContain('m3-status--info');
  });

  it('a classe segue o tom: aviso e sucesso', () => {
    expect(montar({ tom: 'aviso' }).classes()).toContain('m3-status--aviso');
    expect(montar({ tom: 'sucesso' }).classes()).toContain('m3-status--sucesso');
    expect(montar({ tom: 'sucesso' }).classes()).not.toContain('m3-status--info');
  });

  it('o validador aceita só info, aviso e sucesso', () => {
    const { validator } = M3RotuloStatus.props.tom;
    for (const tom of ['info', 'aviso', 'sucesso']) expect(validator(tom)).toBe(true);
    for (const tom of ['erro', 'error', '', 'INFO']) expect(validator(tom)).toBe(false);
  });

  it('o slot padrão é o texto', () => {
    expect(montar({ tom: 'info' }, 'Em preparo').text()).toBe('Em preparo');
  });

  it('as classes de quem usa passam para a raiz', () => {
    const wrapper = mount(M3RotuloStatus, { attrs: { class: 'profile-order__status' }, slots: { default: 'Recebido' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['m3-status', 'm3-status--info', 'profile-order__status']));
  });
});
