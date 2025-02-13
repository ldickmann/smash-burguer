<template>
  <section class="section-order__confirmation">
    <div class="order-confirmation">
      <h2>Confirme seu Pedido</h2>
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">| {{ formatPrice(item.price) }}</span>
            <span class="item-quantity">| Qtd: {{ item.quantity || 1 }}</span>
          </div>
          <div class="item-subtotal">
            Preço Produto: {{ formatPrice(item.price * (item.quantity || 1)) }}
          </div>
        </div>
      </div>
      <div class="total">
        <strong>Total do Pedido: </strong>
        <span>{{ formatPrice(orderTotal) }}</span>
      </div>
      <ButtonsComponents
        :buttons="[confirmButton]"
        backgroundColor="#3498db"
        fontSize="18px"
        buttonSize="16px 32px"
        borderRadius="8px"
        @click="handleConfirm"
      >
        Confirmar Pedido
      </ButtonsComponents>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { formatPrice } from "@/utils/formatters";
import ButtonsComponents from "@/components/ButtonsComponents.vue";

const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["confirm"]);

const getItemSubtotal = (item) => {
  return item.price * (item.quantity || 1);
};

const orderTotal = computed(() => {
  return props.cartItems.reduce((acc, item) => {
    return acc + getItemSubtotal(item);
  }, 0);
});

const confirmButton = computed(() => ({
  id: "confirm-order",
  label: "Confirmar Pedido",
  disabled: props.cartItems.length === 0,
}));

const handleConfirm = (button) => {
  if (button.id === "confirm-order" && props.cartItems.length > 0) {
    emit("confirm", {
      items: props.cartItems,
      total: orderTotal.value,
    });
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/payment/order-confirmation';
</style>
