<template>
  <article
    class="admin-card"
    :class="{ 'is-loading': loading }"
    role="region"
    :aria-busy="loading"
  >
    <header class="admin-card__header">
      <h3 class="admin-card__title">{{ title }}</h3>
      <slot name="header-actions"></slot>
    </header>

    <section class="admin-card__content">
      <slot></slot>
    </section>

    <footer v-if="$slots.footer" class="admin-card__footer">
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/admin-card";
</style>
