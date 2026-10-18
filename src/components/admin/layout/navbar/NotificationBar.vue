<template>
  <div class="navbar-notifications">
    <BaseButton
      v-for="item in notifications"
      :key="item.type"
      variant="ghost"
      icon-only
      :icon-start="item.icon"
      :label="item.label"
      @click="handleClick(item.type)"
    />
  </div>
</template>

<script setup>
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps({
  notifications: {
    type: Array,
    default: () => [
      { type: "messages", label: "Mensagens", icon: ["far", "envelope"], count: 0 },
      { type: "alerts", label: "Notificações", icon: ["fas", "bell"], count: 0 },
      { type: "tasks", label: "Tarefas", icon: ["fas", "tasks"], count: 0 },
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
