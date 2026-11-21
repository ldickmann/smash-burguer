// M3Rodape (SPEC-material §4.1, §5.10, §10.2 e decisão g): marca, descrição e direitos; fora da
// Home, também a lista de horário e contato.
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import M3Rodape from '@/components/layout/M3Rodape.vue';
import { DESCRICAO, MARCA } from '@/utils/textosLoja';

const montar = (props = {}) =>
  mount(M3Rodape, { props, global: { stubs: { 'font-awesome-icon': { template: '<svg aria-hidden="true" />' } } } });

describe('M3Rodape', () => {
  it('é o <footer> com a marca e a descrição reais', () => {
    const wrapper = montar();
    expect(wrapper.element.tagName).toBe('FOOTER');
    expect(wrapper.find('.m3-rodape__nome').text()).toBe(MARCA);
    expect(wrapper.find('.m3-rodape__descricao').text()).toBe(DESCRICAO);
  });

  it('a linha de direitos são três itens com o texto de hoje, sem "·" (§10.2)', () => {
    const wrapper = montar();
    const itens = wrapper.findAll('ul.m3-rodape__direitos > li').map((li) => li.text());
    expect(itens).toEqual(['© 2026 Smash Burger', 'Sabiá Operações', 'Desenvolvido por Lucas Elias Dickmann']);
    expect(wrapper.find('ul.m3-rodape__direitos').attributes('role')).toBe('list');
    expect(wrapper.text()).not.toContain('·');
    expect(wrapper.text()).not.toContain('—');
  });

  it('sem a prop, não mostra a lista de horário e contato (a Home tem a seção "onde")', () => {
    expect(montar().find('.m3-rodape__contatos').exists()).toBe(false);
  });

  it('com a prop contatos, mostra horário, endereço, WhatsApp e e-mail, sem "·" (decisão g)', () => {
    const wrapper = montar({ contatos: true });
    const lista = wrapper.find('ul.m3-rodape__contatos');
    expect(lista.attributes('role')).toBe('list');
    expect(lista.findAll('.m3-segmento__titulo').map((t) => t.text())).toEqual(['Horário', 'Endereço', 'WhatsApp', 'E-mail']);
    expect(lista.findAll('a').map((a) => a.attributes('href').split(':')[0])).toEqual(['https', 'https', 'mailto']);
    expect(wrapper.text()).not.toContain('·');
  });
});
