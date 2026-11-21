// useFolhaUnica (SPEC-material §4.1, M3FolhaIngredientes, e §7.4): uma folha aberta por vez; Esc
// fecha e devolve o foco à metade de trás; o pointerdown fora do card fecha sem mover o foco.
import { afterEach, describe, expect, it } from 'vitest';
import { defineComponent, h } from 'vue';
import { mount } from '@vue/test-utils';
import { useFolhaUnica } from '@/composables/useFolhaUnica';

let wrapper;
let folha;

// Dois cards, cada um com o botão de trás; fora deles, um botão qualquer
const Pagina = defineComponent({
  setup() {
    folha = useFolhaUnica();
    const card = (id) =>
      h('article', { id: `card-${id}` }, [
        h('button', { id: `tras-${id}`, onClick: (e) => folha.alternar(id, e.currentTarget) }, 'Ingredientes'),
      ]);
    return () => h('div', [card(1), card(2), h('button', { id: 'fora' }, 'Fora')]);
  },
});

const montar = () => {
  wrapper = mount(Pagina, { attachTo: document.body });
};

afterEach(() => {
  wrapper?.unmount();
  wrapper = null;
});

describe('useFolhaUnica', () => {
  it('uma folha aberta por vez: abrir outra fecha a anterior, e o mesmo botão alterna', async () => {
    montar();
    await wrapper.find('#tras-1').trigger('click');
    expect(folha.aberta.value).toBe(1);
    await wrapper.find('#tras-2').trigger('click');
    expect(folha.aberta.value).toBe(2);
    await wrapper.find('#tras-2').trigger('click');
    expect(folha.aberta.value).toBeNull();
  });

  it('Esc fecha e devolve o foco ao botão que abriu', async () => {
    montar();
    const tras = wrapper.find('#tras-1');
    await tras.trigger('click');
    document.getElementById('fora').focus();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(folha.aberta.value).toBeNull();
    expect(document.activeElement).toBe(tras.element);
  });

  it('pointerdown fora do card fecha sem mover o foco; dentro do card, não fecha', async () => {
    montar();
    await wrapper.find('#tras-1').trigger('click');

    document.getElementById('card-1').dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(folha.aberta.value).toBe(1);

    const fora = document.getElementById('fora');
    fora.focus();
    fora.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(folha.aberta.value).toBeNull();
    expect(document.activeElement).toBe(fora);
  });

  it('desmontado, deixa de ouvir o documento', async () => {
    montar();
    await wrapper.find('#tras-1').trigger('click');
    const estado = folha;
    wrapper.unmount();
    wrapper = null;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(estado.aberta.value).toBe(1);
  });
});
