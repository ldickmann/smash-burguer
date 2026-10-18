<template>
  <div class="empty-state">
    <font-awesome-icon :icon="icon" class="empty-state__icon" aria-hidden="true" />
    <p class="empty-state__title">{{ title }}</p>
    <p v-if="text" class="empty-state__text">{{ text }}</p>
    <div v-if="$slots.action" class="empty-state__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: [String, Array],
    default: "burger",
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/empty-state";
</style>
