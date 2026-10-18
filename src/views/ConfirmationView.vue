<template>
  <div class="confirmation-page container">
    <div v-if="order" class="confirmation-page__card">
      <font-awesome-icon
        :icon="['fas', 'circle-check']"
        class="confirmation-page__icon"
        aria-hidden="true"
      />
      <h1 ref="titleRef" class="confirmation-page__title" tabindex="-1">Pedido recebido</h1>
      <p class="confirmation-page__meta">
        Pedido <span class="tabular">#{{ order.id }}</span> · {{ order.paymentMethod }}
      </p>

      <OrderSummary :items="order.items" variant="readonly" class="confirmation-page__summary" />

      <div class="confirmation-page__actions">
        <BaseButton to="/menu">Voltar ao cardápio</BaseButton>
        <BaseButton variant="secondary" to="/profile">Ver meus pedidos</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import BaseButton from "@/components/ui/BaseButton.vue";
import OrderSummary from "@/components/OrderSummary.vue";

const userStore = useUserStore();
const titleRef = ref(null);

const order = computed(() =>
  (userStore.orderHistory ?? []).find((item) => item.id === userStore.lastOrderId)
);

// O título recebe o foco ao montar
onMounted(() => titleRef.value?.focus());
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/confirmation";
</style>
