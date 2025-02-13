<template>
  <section class="section-payment">
    <div class="payment-container">
      <div class="payment-steps">
        <h1 class="payment-title">Finalizar Pedido</h1>

        <!-- Step 1: Order Confirmation -->
        <OrderConfirmation
          v-if="currentStep === 1"
          :cart-items="cartStore.items"
          @confirm="handleOrderConfirm"
        />

        <!-- Step 2: Payment Method Selection -->
        <PaymentMethodSelection
          v-if="currentStep === 2"
          @previous="previousStep"
          @next="nextStep"
          @select="selectPaymentMethod"
        />

        <!-- Step 3: Payment Details -->
        <div v-if="currentStep === 3" class="payment-details">
          <h2>Detalhes do Pagamento</h2>

          <PixPaymentForm
            v-if="selectedPaymentMethod === 'pix'"
            @previous="previousStep"
            @next="handlePixPayment"
          />

          <CardPaymentForm v-else @previous="previousStep" @next="handleCardPayment" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cart";
import OrderConfirmation from "@/components/payment/OrderConfirmation.vue";
import PaymentMethodSelection from "@/components/payment/PaymentMethodSelection.vue";
import PixPaymentForm from "@/components/payment/PixPaymentForm.vue";
import CardPaymentForm from "@/components/payment/CardPaymentForm.vue";

const router = useRouter();
const cartStore = useCartStore();

const currentStep = ref(1);
const selectedPaymentMethod = ref(null);

const handleOrderConfirm = () => {
  nextStep();
};

const nextStep = () => {
  currentStep.value++;
};

const previousStep = () => {
  currentStep.value--;
};

const selectPaymentMethod = (methodType) => {
  selectedPaymentMethod.value = methodType;
};

const handlePaymentSuccess = () => {
  cartStore.clearCart();
  router.push("/confirmation");
};

const handlePixPayment = (data) => {
  console.log("PIX payment data:", data);
  handlePaymentSuccess();
};

const handleCardPayment = (data) => {
  console.log("Card payment data:", data);
  handlePaymentSuccess();
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/payment";
</style>
