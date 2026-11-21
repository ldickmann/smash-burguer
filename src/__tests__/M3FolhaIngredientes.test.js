// M3FolhaIngredientes (SPEC-material §4.1 e §7.4): fica no DOM (v-show), para o aria-controls da
// metade de trás do split apontar sempre para um id que existe.
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import M3FolhaIngredientes from '@/components/ui/M3FolhaIngredientes.vue';
import { TEXTOS } from '@/utils/textosLoja';

describe('M3FolhaIngredientes', () => {
  it('fechada, continua no DOM com o id; aberta, aparece', async () => {
    const wrapper = mount(M3FolhaIngredientes, { props: { id: 'folha-1', itens: ['Pão', 'Queijo'] } });
    const folha = wrapper.find('#folha-1');
    expect(folha.exists()).toBe(true);
    expect(folha.element.style.display).toBe('none');
    await wrapper.setProps({ aberto: true });
    expect(folha.element.style.display).toBe('');
  });

  it('a lista leva o título como nome; o título padrão é o da produção', () => {
    const wrapper = mount(M3FolhaIngredientes, { props: { id: 'folha-1', itens: ['Pão', 'Queijo'], aberto: true } });
    const titulo = wrapper.find('#folha-1-titulo');
    expect(titulo.text()).toBe(TEXTOS.ingredientes);
    const lista = wrapper.find('ul');
    expect(lista.attributes()).toMatchObject({ role: 'list', 'aria-labelledby': 'folha-1-titulo' });
    expect(lista.findAll('li').map((li) => li.text())).toEqual(['Pão', 'Queijo']);
  });
});
