<template>
  <div class="admin-card" :class="{ 'is-loading': loading }">
    <div class="admin-card__header">
      <h3 class="admin-card__title">{{ title }}</h3>
      <slot name="header-actions"></slot>
    </div>

    <div class="admin-card__content">
      <slot></slot>
    </div>

    <div class="admin-card__footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
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
