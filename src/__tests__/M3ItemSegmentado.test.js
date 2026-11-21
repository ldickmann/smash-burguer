// M3ItemSegmentado (SPEC-material §4.1): item de lista agrupada; com href, a linha inteira é o link.
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import M3ItemSegmentado from '@/components/ui/M3ItemSegmentado.vue';
import { NOVA_ABA } from '@/utils/textosLoja';

const montar = (props) =>
  mount(M3ItemSegmentado, {
    props: { titulo: 'Endereço', icone: ['fas', 'location-dot'], ...props },
    global: { stubs: { 'font-awesome-icon': { props: ['icon'], template: '<svg class="fa-stub" :data-icon="icon.join(\' \')" />' } } },
  });

describe('M3ItemSegmentado', () => {
  it('o externo abre em nova aba, avisa no nome acessível e mostra o ícone de saída', () => {
    const wrapper = montar({ apoio: 'Rua Beira da Praia', href: 'https://maps.example/x', externo: true });
    const link = wrapper.find('a');
    expect(link.attributes()).toMatchObject({ href: 'https://maps.example/x', target: '_blank', rel: 'noopener noreferrer' });
    expect(link.find('.visually-hidden').text()).toBe(NOVA_ABA.trim());
    expect(link.find('.m3-segmento__fim').attributes('data-icon')).toBe('fas arrow-up-right-from-square');
    expect(link.text()).toContain('Endereço');
    expect(link.text()).toContain('Rua Beira da Praia');
  });

  it('o link interno não abre em nova aba', () => {
    const link = montar({ titulo: 'E-mail', href: 'mailto:a@b.c' }).find('a');
    expect(link.attributes('target')).toBeUndefined();
    expect(link.attributes('rel')).toBeUndefined();
    expect(link.find('.visually-hidden').exists()).toBe(false);
  });

  it('sem href, é um div estático, sem foco, com o ícone de informação', () => {
    const wrapper = montar({ titulo: 'Horário', apoio: 'Terça a sexta', icone: ['far', 'clock'] });
    expect(wrapper.find('a').exists()).toBe(false);
    const item = wrapper.find('div.m3-segmento');
    expect(item.classes()).toContain('m3-segmento--info');
    expect(item.attributes('tabindex')).toBeUndefined();
    expect(wrapper.element.tagName).toBe('LI');
  });
});
