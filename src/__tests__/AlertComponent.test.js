// src/components/__tests__/AlertComponent.spec.js
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AlertComponent from '../components/AlertComponent.vue';

describe('AlertComponent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('renders the component with message', () => {
    const message = 'Test alert message';
    const wrapper = mount(AlertComponent, {
      props: {
        message
      }
    });

    expect(wrapper.text()).toContain(message);
    expect(wrapper.find('.alert').exists()).toBe(true);
  });

  it('shows alert initially', () => {
    const wrapper = mount(AlertComponent, {
      props: {
        message: 'Test message'
      }
    });

    expect(wrapper.find('.alert').isVisible()).toBe(true);
  });

  it('hides alert after 3 seconds', async () => {
    const wrapper = mount(AlertComponent, {
      props: {
        message: 'Test message'
      }
    });

    expect(wrapper.find('.alert').exists()).toBe(true);

    // Fast-forward time by 3 seconds
    vi.advanceTimersByTime(3000);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.alert').exists()).toBe(false);
  });

  it('resets timer when message prop changes', async () => {
    const wrapper = mount(AlertComponent, {
      props: {
        message: 'Initial message'
      }
    });

    // Advance time by 2 seconds
    vi.advanceTimersByTime(2000);

    // Change message prop
    await wrapper.setProps({ message: 'New message' });

    expect(wrapper.find('.alert').exists()).toBe(true);
    expect(wrapper.text()).toContain('New message');

    // Advance time by another 2 seconds
    vi.advanceTimersByTime(2000);
    expect(wrapper.find('.alert').exists()).toBe(true);

    // Advance remaining time
    vi.advanceTimersByTime(1000);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.alert').exists()).toBe(false);
  });
});
