<template>
  <section class="section-payment">
    <div class="payment-container">
      <h1 class="payment-title">Escolha a forma de Pagamento</h1>
      <form @submit.prevent="handlePayment">
        <div class="payment-options">
          <label>
            <input
              type="radio"
              v-model="selectedPaymentMethod"
              value="creditCard"
              required
            />
            Cartão de Crédito
          </label>
          <label>
            <input
              type="radio"
              v-model="selectedPaymentMethod"
              value="debitCard"
              required
            />
            Cartão de Débito
          </label>
          <label>
            <input type="radio" v-model="selectedPaymentMethod" value="pix" required />
            PIX
          </label>
          <label>
            <input type="radio" v-model="selectedPaymentMethod" value="cash" required />
            Dinheiro na Entrega
          </label>
        </div>
        <ButtonComponent
          :buttons="[{ label: 'Confirmar Pagamento', id: 'confirm-payment' }]"
          backgroundColor="#42b983"
          fontColor="#ffffff"
          fontSize="16px"
          buttonSize="1rem 2rem"
          borderRadius="4px"
          @click="handlePayment"
        />
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ButtonComponent from "@/components/ButtonComponent.vue";

const router = useRouter();
const selectedPaymentMethod = ref("");

const handlePayment = () => {
  // Redireciona para a página de pagamento da API
  router.push(`/payment/${selectedPaymentMethod.value}`);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/payment";
</style>
