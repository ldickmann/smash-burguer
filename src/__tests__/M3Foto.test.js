// M3Foto (SPEC-material §4.1 e §9): foto de produto com reserva e forma do catálogo.
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import M3Foto from '@/components/ui/M3Foto.vue';

const montar = (props) =>
  mount(M3Foto, {
    props,
    global: { stubs: { 'font-awesome-icon': { props: ['icon'], template: '<svg class="fa-stub" :data-icon="icon.join(\' \')" />' } } },
  });

const RESPONSIVA = { src: '/img/a-960.png', srcset: '/img/a-480.webp 480w, /img/a-960.webp 960w', sizes: '56px' };

describe('M3Foto', () => {
  it('com srcset, entra o <source> WebP; imagem data: sai sem ele', () => {
    const responsiva = montar({ imagem: RESPONSIVA, alt: 'Cheese Bacon' });
    expect(responsiva.find('source').attributes()).toMatchObject({ type: 'image/webp', srcset: RESPONSIVA.srcset, sizes: '56px' });

    const dados = montar({ imagem: { src: 'data:image/png;base64,AAAA' }, alt: 'Produto do painel' });
    expect(dados.find('source').exists()).toBe(false);
    expect(dados.find('img').attributes('src')).toBe('data:image/png;base64,AAAA');
  });

  it('a imagem sempre tem width, height, loading="lazy" e decoding="async"', () => {
    const wrapper = montar({ imagem: RESPONSIVA, alt: 'Cheese Bacon' });
    expect(wrapper.find('img').attributes()).toMatchObject({
      alt: 'Cheese Bacon',
      width: '960',
      height: '720',
      loading: 'lazy',
      decoding: 'async',
    });
  });

  it('com falhou (ou sem src), mostra o ícone na mesma moldura; erro da imagem emite "erro"', async () => {
    const wrapper = montar({ imagem: RESPONSIVA, alt: 'Cheese Bacon' });
    await wrapper.find('img').trigger('error');
    expect(wrapper.emitted('erro')).toHaveLength(1);

    await wrapper.setProps({ falhou: true, icone: ['fas', 'utensils'] });
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('.fa-stub').attributes('data-icon')).toBe('fas utensils');
    expect(montar({ imagem: { src: '' } }).find('.fa-stub').exists()).toBe(true);
  });

  it('cookie, círculo e flor são sempre quadrados; o cartão usa a proporção pedida', () => {
    expect(montar({ imagem: RESPONSIVA, forma: 'cartao', proporcao: '16 / 9' }).attributes('style')).toContain('aspect-ratio: 16 / 9');
    for (const forma of ['cookie', 'circulo', 'flor']) {
      const wrapper = montar({ imagem: RESPONSIVA, forma, proporcao: '16 / 9' });
      expect(wrapper.classes()).toContain(`m3-foto--${forma}`);
      expect(wrapper.attributes('style')).toContain('aspect-ratio: 1 / 1');
    }
  });
});
