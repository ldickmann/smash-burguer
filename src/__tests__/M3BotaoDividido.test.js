// M3BotaoDividido (SPEC-material §4.1 e §7.3): split button com "Adicionar" na frente e, atrás, a
// metade que abre os ingredientes.
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import M3BotaoDividido from '@/components/ui/M3BotaoDividido.vue';

const montar = (props = {}) =>
  mount(M3BotaoDividido, {
    props,
    global: { stubs: { 'font-awesome-icon': { template: '<svg class="fa-stub" />' } } },
  });

describe('M3BotaoDividido', () => {
  it('sem rotuloMenu, só a frente, redonda nos quatro cantos', () => {
    const wrapper = montar();
    const botoes = wrapper.findAll('button');
    expect(botoes).toHaveLength(1);
    expect(botoes[0].classes()).toContain('m3-dividido__frente');
    expect(wrapper.classes()).toContain('is-unico');
  });

  it('a metade de trás tem nome, aria-expanded e aria-controls; a frente leva os atributos da ação', async () => {
    const wrapper = montar({
      rotuloMenu: 'Ingredientes de Cheese Bacon',
      controla: 'folha-1',
      atributosAcao: { 'aria-label': 'Adicionar Cheese Bacon', 'data-adicionado': 'true' },
    });
    const [frente, tras] = wrapper.findAll('button');
    expect(frente.attributes('aria-label')).toBe('Adicionar Cheese Bacon');
    expect(frente.attributes('data-adicionado')).toBe('true');
    expect(tras.attributes()).toMatchObject({
      'aria-label': 'Ingredientes de Cheese Bacon',
      'aria-expanded': 'false',
      'aria-controls': 'folha-1',
    });
    // Os ícones e a face "Adicionado" não entram no nome acessível
    expect(wrapper.find('.m3-dividido__face--verso').attributes('aria-hidden')).toBe('true');
    expect(wrapper.find('.m3-dividido__chevron').attributes('aria-hidden')).toBe('true');

    await wrapper.setProps({ expandido: true });
    expect(tras.attributes('aria-expanded')).toBe('true');
    expect(wrapper.classes()).toContain('is-expandido');
  });

  it('emite acao pela frente e alternar com o elemento da metade de trás', async () => {
    const wrapper = montar({ rotuloMenu: 'Ingredientes de Cheese Bacon', controla: 'folha-1' });
    const [frente, tras] = wrapper.findAll('button');
    await frente.trigger('click');
    await tras.trigger('click');
    expect(wrapper.emitted('acao')).toHaveLength(1);
    expect(wrapper.emitted('alternar')[0][0]).toBe(tras.element);
  });

  it('adicionado mostra o retorno nas duas metades', () => {
    const wrapper = montar({ rotuloMenu: 'Ingredientes de X', adicionado: true });
    expect(wrapper.classes()).toContain('is-adicionado');
    expect(wrapper.find('.m3-dividido__face--verso').text()).toBe('Adicionado');
  });
});
