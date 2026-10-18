import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BannerComponent from '../components/BannerComponent.vue';

const BASE_URL = import.meta.env.BASE_URL;

describe('BannerComponent', () => {
  const defaultProps = {
    title: 'Smash na chapa, entregue quente',
    text: 'Hambúrgueres artesanais prensados na hora.',
    image: '/images/fundos/banner-burger-bg',
    alt: 'Hambúrguer artesanal',
  };

  it('usa o título como único h1 e mostra o texto', () => {
    const wrapper = mount(BannerComponent, { props: defaultProps });

    expect(wrapper.findAll('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe(defaultProps.title);
    expect(wrapper.find('.banner__text').text()).toBe(defaultProps.text);
  });

  it('variante hero: foto com <picture>, eager e fetchpriority alta', () => {
    const wrapper = mount(BannerComponent, { props: defaultProps });
    const img = wrapper.find('img');

    expect(wrapper.find('.banner').classes()).toContain('banner--hero');
    expect(wrapper.find('picture source').attributes('type')).toBe('image/webp');
    expect(wrapper.find('picture source').attributes('srcset')).toContain(
      `${BASE_URL}images/fundos/banner-burger-bg-480.webp 480w`
    );
    expect(img.attributes('src')).toBe(`${BASE_URL}images/fundos/banner-burger-bg-960.png`);
    expect(img.attributes('alt')).toBe(defaultProps.alt);
    expect(img.attributes('loading')).toBe('eager');
    expect(img.attributes('fetchpriority')).toBe('high');
    expect(img.attributes('width')).toBeDefined();
    expect(img.attributes('height')).toBeDefined();
  });

  it('variante page: imagem de fundo lazy, sem fetchpriority', () => {
    const wrapper = mount(BannerComponent, {
      props: { ...defaultProps, variant: 'page', image: '/images/fundos/banner-burger-black' },
    });
    const img = wrapper.find('img');

    expect(wrapper.find('.banner').classes()).toContain('banner--page');
    expect(img.attributes('src')).toBe(`${BASE_URL}images/fundos/banner-burger-black-1440.jpg`);
    expect(img.attributes('loading')).toBe('lazy');
    expect(img.attributes('fetchpriority')).toBeUndefined();
  });

  it('renderiza o slot de ações', () => {
    const wrapper = mount(BannerComponent, {
      props: defaultProps,
      slots: { actions: '<a href="#/menu">Ver cardápio</a>' },
    });

    expect(wrapper.find('.banner__actions a').text()).toBe('Ver cardápio');
  });

  it('não aplica estilo inline nem efeito de hover na imagem', () => {
    const wrapper = mount(BannerComponent, { props: defaultProps });
    expect(wrapper.find('img').attributes('style')).toBeUndefined();
  });
});
