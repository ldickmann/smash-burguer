<template>
  <div class="navbar-notifications">
    <div
      v-for="(item, index) in notifications"
      :key="index"
      class="notification-item"
      @click="handleClick(item.type)"
    >
      <font-awesome-icon :icon="item.icon" />
      <!-- <span v-if="item.count" class="notification-badge">{{ item.count }}</span> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  notifications: {
    type: Array,
    default: () => [
      { type: "messages", icon: ["far", "envelope"], count: 0 },
      { type: "alerts", icon: ["fas", "bell"], count: 0 },
      { type: "tasks", icon: ["fas", "tasks"], count: 0 },
    ],
  },
});

const emit = defineEmits(["notification-click"]);

const handleClick = (type) => {
  emit("notification-click", type);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/admin/navbar/notification-bar";
</style>
