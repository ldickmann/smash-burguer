<template>
  <section class="section-order__confirmation">
    <div class="order-confirmation">
      <h2>Confirme seu Pedido</h2>
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <span class="item-name">{{ item.name }}</span>
          <div class="item-details">
            <span class="item-quantity">Qtd: {{ item.quantity }}</span>
            <span class="item-price">{{ formatPrice(item.price) }}</span>
          </div>
        </div>
      </div>
      <div class="total">
        <strong>Total: </strong>
        <span>{{ formatPrice(orderTotal) }}</span>
      </div>
      <ButtonsComponents
        :buttons="[confirmButton]"
        backgroundColor="#3498db"
        fontSize="18px"
        buttonSize="16px 32px"
        borderRadius="8px"
        @category-selected="handleConfirm"
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

const orderTotal = computed(() => {
  return props.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const confirmButton = computed(() => ({
  category: "confirm",
  label: "Confirmar Pedido",
  disabled: props.cartItems.length === 0,
}));

const handleConfirm = () => {
  if (props.cartItems.length > 0) {
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
