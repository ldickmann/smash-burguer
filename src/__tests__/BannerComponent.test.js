import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BannerComponent from '../components/BannerComponent.vue';
import SeparatorLines from '../components/SeparatorLines.vue';

describe('BannerComponent', () => {
  const defaultProps = {
    title: 'Test Title',
    paragraph: 'Test Paragraph',
    image: 'test-image.jpg',
    alt: 'Test Alt',
    overlay: false,
    height: 'auto'
  };

  it('renders properly with default props', () => {
    const wrapper = mount(BannerComponent, {
      props: defaultProps,
      global: {
        components: {
          SeparatorLines
        }
      }
    });

    expect(wrapper.find('h1').text()).toBe('Test Title');
    expect(wrapper.find('p').text()).toBe('Test Paragraph');
    expect(wrapper.find('img').attributes('src')).toBe('test-image.jpg');
    expect(wrapper.find('img').attributes('alt')).toBe('Test Alt');
  });

  it('computes correct image height with overlay', () => {
    const wrapper = mount(BannerComponent, {
      props: {
        ...defaultProps,
        overlay: true
      },
      global: {
        components: {
          SeparatorLines
        }
      }
    });

    expect(wrapper.find('img').attributes('style')).toContain('height: 550px');
  });

  it('applies custom height when overlay is false', () => {
    const wrapper = mount(BannerComponent, {
      props: {
        ...defaultProps,
        height: '300px'
      },
      global: {
        components: {
          SeparatorLines
        }
      }
    });

    expect(wrapper.find('img').attributes('style')).toContain('height: 300px');
  });

  it('adds overlay class when overlay prop is true', () => {
    const wrapper = mount(BannerComponent, {
      props: {
        ...defaultProps,
        overlay: true
      },
      global: {
        components: {
          SeparatorLines
        }
      }
    });

    expect(wrapper.find('.banner').classes()).toContain('overlay');
  });
});
