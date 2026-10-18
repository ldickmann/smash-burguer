<script setup>
import { RouterView } from "vue-router";
import AppToast from "@/components/ui/AppToast.vue";
import { useAnnouncer } from "@/composables/useAnnouncer";

const { message } = useAnnouncer();
</script>

<template>
  <RouterView />
  <AppToast />
  <div class="visually-hidden" aria-live="polite" aria-atomic="true" data-announcer>
    {{ message }}
  </div>
</template>
