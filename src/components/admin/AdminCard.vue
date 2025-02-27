<template>
  <article
    class="admin-card"
    :class="{ 'is-loading': loading }"
    role="region"
    :aria-busy="loading"
  >
    <header class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-actions">
        <slot name="header-actions"></slot>
      </div>
    </header>

    <section class="card-content">
      <slot></slot>
    </section>

    <footer v-if="$slots.footer" class="card-footer">
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
