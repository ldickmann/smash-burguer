<template>
  <!-- role="region" só com nome acessível: aria-labelledby aponta para o título -->
  <article
    class="admin-card"
    :class="[`admin-card--${variant}`, { 'is-loading': loading }]"
    role="region"
    :aria-labelledby="titleId"
    :aria-busy="loading || undefined"
  >
    <header class="admin-card__header">
      <component :is="`h${headingLevel}`" :id="titleId" class="admin-card__title">{{ title }}</component>
      <slot name="header-actions"></slot>
    </header>

    <div class="admin-card__content">
      <slot></slot>
    </div>

    <footer v-if="$slots.footer" class="admin-card__footer">
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<script setup>
import { useId } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  headingLevel: {
    type: [Number, String],
    default: 2,
  },
  // "kpi": título discreto acima de um número grande
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "kpi"].includes(value),
  },
});

const titleId = `admin-card-${useId()}`;
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/admin-card";
</style>
