<template>
  <div class="navbar-notifications">
    <span v-for="item in notifications" :key="item.type" class="navbar-notifications__item">
      <BaseButton
        variant="ghost"
        icon-only
        :icon-start="item.icon"
        :label="item.label"
        :to="item.to"
      />
      <!-- O número já está no rótulo do link -->
      <span v-if="item.count > 0" class="navbar-notifications__count tabular" aria-hidden="true">
        {{ item.count > 9 ? "9+" : item.count }}
      </span>
    </span>
  </div>
</template>

<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";

// Cada atalho: { type, label (rótulo acessível, com o número), icon, count, to }
defineProps({
  notifications: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/navbar/notification-bar";
</style>
