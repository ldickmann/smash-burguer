<template>
  <div class="cart-page container">
    <h1 ref="titleRef" class="cart-page__title" tabindex="-1">Seu carrinho</h1>

    <EmptyState
      v-if="!cartStore.items.length"
      icon="shopping-cart"
      title="Seu carrinho está vazio"
      text="Escolha um burger no cardápio para começar."
    >
      <template #action>
        <BaseButton to="/menu">Ver cardápio</BaseButton>
      </template>
    </EmptyState>

    <div v-else class="cart-page__layout">
      <section class="cart-page__card cart-page__list-card" aria-label="Itens do carrinho">
        <ul ref="listRef" class="cart-page__list" role="list">
          <CartItem
            v-for="(item, index) in cartStore.items"
            :key="`${item.productId}-${item.category}-${index}`"
            :item="item"
            :index="index"
            @update-quantity="cartStore.updateQuantity"
            @remove="removeItem"
          />
        </ul>
      </section>

      <OrderSummary :items="cartStore.items" variant="cart" class="cart-page__card cart-page__summary">
        <template #cta>
          <template v-if="userStore.isAuthenticated">
            <BaseButton size="lg" block to="/payment">Finalizar pedido</BaseButton>
            <BaseButton variant="ghost" block to="/menu">Continuar comprando</BaseButton>
          </template>

          <!-- Visitante: links para entrar ou criar conta, voltando ao pagamento -->
          <template v-else>
            <p class="cart-page__notice">Entre para finalizar seu pedido.</p>
            <BaseButton size="lg" block :to="{ path: '/login', query: { redirect: '/payment' } }">
              Entrar e finalizar
            </BaseButton>
            <BaseButton
              variant="secondary"
              block
              :to="{ path: '/register', query: { redirect: '/payment' } }"
            >
              Criar conta
            </BaseButton>
          </template>
        </template>
      </OrderSummary>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/userStore";
import { useToastStore } from "@/stores/toast";
import BaseButton from "@/components/ui/BaseButton.vue";
import EmptyState from "@/components/ui/EmptyState.vue";
import CartItem from "@/components/CartItem.vue";
import OrderSummary from "@/components/OrderSummary.vue";

const cartStore = useCartStore();
const userStore = useUserStore();
const toastStore = useToastStore();

const titleRef = ref(null);
const listRef = ref(null);

// Tira o item na hora e oferece "Desfazer" por 5 s, devolvendo-o à mesma posição
const removeItem = async (index) => {
  const removed = cartStore.removeItem(index);
  if (!removed) return;

  toastStore.show({
    message: `${removed.name} removido.`,
    variant: "info",
    duration: 5000,
    action: {
      label: "Desfazer",
      icon: "rotate-left",
      onClick: () => cartStore.restoreItem(removed, index),
    },
  });

  // O botão que tinha o foco sumiu: o foco vai para o "Remover" vizinho ou para o título
  await nextTick();
  const buttons = listRef.value?.querySelectorAll("[data-remove]") ?? [];
  const next = buttons[Math.min(index, buttons.length - 1)];
  (next ?? titleRef.value)?.focus();
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/cart-page";
</style>
