import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import ModalProducts from '../components/admin/ModalProducts.vue';
import { UPLOAD_BUDGET, useProductsStore } from '../stores/products';

const PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0x0d, 0x49, 0x48, 0x44, 0x52]);

const mountModal = (props = {}) => {
  const pinia = createPinia();
  setActivePinia(pinia);
  return mount(ModalProducts, {
    props,
    global: {
      plugins: [pinia],
      stubs: {
        'font-awesome-icon': { template: '<svg />' },
        // O <dialog> nativo não existe no jsdom: o stub só mostra o conteúdo
        BaseDialog: { props: ['open'], template: '<div class="dialog-stub"><slot /><slot name="footer" /></div>' },
      },
    },
  });
};

const chooseFile = async (wrapper, file) => {
  const input = wrapper.find('input#image');
  Object.defineProperty(input.element, 'files', { value: [file], configurable: true });
  await input.trigger('change');
};

const fillFields = async (wrapper, { name = 'Mate', price = '6,50' } = {}) => {
  await wrapper.find('input#name').setValue(name);
  await wrapper.find('input#price').setValue(price);
};

const submit = async (wrapper) => {
  await wrapper.find('form').trigger('submit');
  await flushPromises();
};

describe('ModalProducts', () => {
  it('com os campos vazios, não salva e mostra os erros, inclusive o da imagem', async () => {
    const wrapper = mountModal();

    await submit(wrapper);

    expect(wrapper.emitted('submit')).toBeUndefined();
    expect(wrapper.find('#name-erro').text()).toContain('Informe o nome do produto.');
    expect(wrapper.find('#price-erro').text()).toContain('Informe o preço.');
    expect(wrapper.find('#image-erro').text()).toContain('Escolha uma imagem para o produto.');
    expect(wrapper.find('input#image').attributes('aria-invalid')).toBe('true');
  });

  it('com o preço em texto, não salva', async () => {
    const wrapper = mountModal();
    await fillFields(wrapper, { price: 'vinte e cinco' });
    await chooseFile(wrapper, new File([PNG], 'mate.png', { type: 'image/png' }));
    await vi.waitFor(() => expect(wrapper.find('.file-picker__name').text()).toBe('mate.png'));

    await submit(wrapper);

    expect(wrapper.emitted('submit')).toBeUndefined();
    expect(wrapper.find('#price-erro').text()).toContain('Use só números, como 25,90.');
  });

  it('salva com o preço em número e a imagem lida, mesmo com o envio logo depois da escolha do arquivo', async () => {
    const wrapper = mountModal();
    await fillFields(wrapper, { price: '25,90' });

    await chooseFile(wrapper, new File([PNG], 'mate.png', { type: 'image/png' }));
    // Sem esperar a leitura do arquivo terminar
    await wrapper.find('form').trigger('submit');
    await vi.waitFor(() => expect(wrapper.emitted('submit')).toHaveLength(1));

    const [product] = wrapper.emitted('submit')[0];
    expect(product).toMatchObject({ category: 'foods', name: 'Mate', price: 25.9 });
    expect(product.image.startsWith('data:image/png;base64,')).toBe(true);
    // Quem fecha é a tela, depois de salvar
    expect(wrapper.emitted('close')).toBeUndefined();
  });

  it('recusa um arquivo que não é imagem e não o guarda no produto', async () => {
    const wrapper = mountModal();
    await fillFields(wrapper);

    await chooseFile(wrapper, new File([PNG], 'boa.png', { type: 'image/png' }));
    await vi.waitFor(() => expect(wrapper.find('.file-picker__name').text()).toBe('boa.png'));
    await chooseFile(wrapper, new File(['<html></html>'], 'pagina.html', { type: 'text/html' }));
    await vi.waitFor(() => expect(wrapper.find('#image-erro').exists()).toBe(true));

    expect(wrapper.find('#image-erro').text()).toContain('Escolha uma imagem PNG, JPEG ou WebP.');
    // O arquivo recusado leva o seletor de volta ao estado em que o modal abriu
    expect(wrapper.find('.file-picker__name').text()).toBe('Nenhuma imagem escolhida');

    await submit(wrapper);
    expect(wrapper.emitted('submit')).toBeUndefined();
    expect(wrapper.find('#image-erro').text()).toContain('Escolha uma imagem para o produto.');
  });

  it('na edição, um arquivo recusado depois de outro aceito volta à imagem atual, que pode ser salva', async () => {
    const wrapper = mountModal({
      mode: 'edit',
      product: { id: 1, category: 'drinks', name: 'Mate', price: 6.5, image: '/images/drinks/mate' },
    });

    await chooseFile(wrapper, new File([PNG], 'nova.png', { type: 'image/png' }));
    await vi.waitFor(() => expect(wrapper.find('.file-picker__name').text()).toBe('nova.png'));
    await chooseFile(wrapper, new File(['<html></html>'], 'pagina.png', { type: 'image/png' }));
    await vi.waitFor(() => expect(wrapper.find('#image-erro').exists()).toBe(true));

    expect(wrapper.find('.file-picker__name').text()).toBe('Imagem atual');
    await submit(wrapper);
    expect(wrapper.emitted('submit')[0][0].image).toBe('/images/drinks/mate');
  });

  it('na edição, mostra o preço com vírgula e salva sem trocar a imagem nem exigir quantidade', async () => {
    const wrapper = mountModal({
      mode: 'edit',
      product: { id: 2, category: 'foods', name: 'Smash Burger', price: 22.5, description: 'Clássico', image: '/images/foods/smash-burger' },
    });

    expect(wrapper.find('input#price').element.value).toBe('22,50');
    expect(wrapper.find('.file-picker__name').text()).toBe('Imagem atual');

    await wrapper.find('input#price').setValue('23,90');
    await submit(wrapper);

    const [product] = wrapper.emitted('submit')[0];
    expect(product).toEqual({
      category: 'foods',
      name: 'Smash Burger',
      price: 23.9,
      quantity: null,
      description: 'Clássico',
      image: '/images/foods/smash-burger',
    });
  });

  // Desenho do admin, §5.8 e §9: Preço e Quantidade num par; o seletor de imagem como mais um campo
  it('Preço e Quantidade ficam no mesmo div.modal-product__par, na ordem do Tab', () => {
    const wrapper = mountModal();
    const par = wrapper.find('div.modal-product__par');
    expect(par.exists()).toBe(true);
    expect(par.findAll('input').map((input) => input.attributes('id'))).toEqual(['price', 'quantity']);
    const ordem = wrapper.findAll('form input, form select').map((el) => el.attributes('id'));
    expect(ordem).toEqual(['productType', 'name', 'price', 'quantity', 'description', 'image']);
  });

  it('o seletor: rótulo "Imagem" sem id, o botão e o nome dentro da caixa .file-picker__campo', () => {
    const wrapper = mountModal();
    const rotulo = wrapper.find('.file-picker > .file-picker__label');
    expect(rotulo.text()).toBe('Imagem');
    expect(rotulo.attributes('id')).toBeUndefined();
    const caixa = wrapper.find('.file-picker > .file-picker__campo');
    expect(caixa.find('label.file-picker__button[for="image"] > input#image').exists()).toBe(true);
    expect(caixa.find('.file-picker__name').text()).toBe('Nenhuma imagem escolhida');
  });

  it('sem erro, a ajuda descreve o campo da imagem', () => {
    const wrapper = mountModal();
    expect(wrapper.find('#image-ajuda').text()).toBe('PNG, JPEG ou WebP, com até 300 kB.');
    expect(wrapper.find('#image-erro').exists()).toBe(false);
    expect(wrapper.find('input#image').attributes('aria-describedby')).toBe('image-ajuda');
    expect(wrapper.find('.file-picker').classes()).not.toContain('has-error');
  });

  it('com erro, o erro toma o lugar da ajuda no DOM e no aria-describedby, com o ícone num span', async () => {
    const wrapper = mountModal();
    await submit(wrapper);

    expect(wrapper.find('input#image').attributes('aria-describedby')).toBe('image-erro');
    expect(wrapper.find('#image-ajuda').exists()).toBe(false);
    expect(wrapper.find('.file-picker.has-error > .file-picker__campo').exists()).toBe(true);
    const icone = wrapper.find('#image-erro > span.file-picker__icone');
    expect(icone.attributes('aria-hidden')).toBe('true');
    expect(icone.find('svg').exists()).toBe(true);
    expect(wrapper.find('#image-erro').text()).toBe('Escolha uma imagem para o produto.');
  });

  it('sem espaço no navegador para a imagem, não salva e mostra o erro no campo da imagem', async () => {
    const wrapper = mountModal();
    useProductsStore().addProduct({ category: 'drinks', name: 'Grande', price: 1, image: `data:image/png;base64,${'A'.repeat(UPLOAD_BUDGET)}` });
    await fillFields(wrapper);
    await chooseFile(wrapper, new File([PNG], 'mate.png', { type: 'image/png' }));
    await vi.waitFor(() => expect(wrapper.find('.file-picker__name').text()).toBe('mate.png'));

    await submit(wrapper);

    expect(wrapper.emitted('submit')).toBeUndefined();
    expect(wrapper.find('#image-erro').text()).toContain('Não há espaço neste navegador para mais esta imagem.');
  });
});
