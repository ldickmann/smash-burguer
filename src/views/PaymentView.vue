<template>
  <div class="payment-page container">
    <h1 class="payment-page__title">Finalizar pedido</h1>

    <div class="payment-page__layout">
      <div class="payment-page__sections">
        <section class="payment-page__card" aria-labelledby="entrega-titulo">
          <h2 id="entrega-titulo" class="payment-page__section-title">Entrega</h2>

          <template v-if="address">
            <address class="payment-page__address">
              <span>{{ address.street }}</span>
              <span>{{ address.neighborhood }}</span>
              <span>{{ address.city }}/{{ address.state }}</span>
              <span v-if="cep">CEP {{ cep }}</span>
            </address>
            <RouterLink to="/profile" class="payment-page__link">Alterar no perfil</RouterLink>
          </template>

          <div v-else class="payment-page__warning">
            <p class="payment-page__warning-text">
              <font-awesome-icon :icon="['fas', 'circle-exclamation']" aria-hidden="true" />
              Cadastre um endereço para receber o pedido.
            </p>
            <RouterLink to="/profile" class="payment-page__link">Adicionar endereço</RouterLink>
          </div>
        </section>

        <section class="payment-page__card">
          <PaymentMethodPicker v-model="paymentMethod" />
        </section>
      </div>

      <OrderSummary
        :items="cartStore.items"
        variant="compact"
        class="payment-page__card payment-page__summary"
      >
        <template #cta>
          <BaseButton
            size="lg"
            block
            :disabled="!canSubmit"
            :loading="submitting"
            :aria-describedby="canSubmit ? undefined : 'pagamento-ajuda'"
            @click="submit"
          >
            <template v-if="submitting">Enviando pedido…</template>
            <template v-else>
              Confirmar pedido · <span class="tabular">{{ formatPrice(cartStore.subtotal) }}</span>
            </template>
          </BaseButton>
          <p v-if="!canSubmit" id="pagamento-ajuda" class="payment-page__help">{{ helpText }}</p>
        </template>
      </OrderSummary>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/userStore";
import { formatPrice } from "@/utils/formatters";
import { maskCEP } from "@/utils/masks";
import BaseButton from "@/components/ui/BaseButton.vue";
import OrderSummary from "@/components/OrderSummary.vue";
import PaymentMethodPicker, { PAYMENT_METHODS } from "@/components/PaymentMethodPicker.vue";

// Espera simulada, igual à da autenticação
const SUBMIT_DELAY = 800;

const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();

const paymentMethod = ref("");
const submitting = ref(false);

const address = computed(() => {
  const saved = userStore.user?.address;
  return saved?.street ? saved : null;
});
const cep = computed(() => maskCEP(userStore.user?.CEP ?? ""));

const canSubmit = computed(() => Boolean(paymentMethod.value && address.value));
const helpText = computed(() =>
  address.value ? "Escolha uma forma de pagamento" : "Cadastre um endereço para receber o pedido."
);

const submit = async () => {
  if (!canSubmit.value || submitting.value) return;
  submitting.value = true;
  await new Promise((resolve) => setTimeout(resolve, SUBMIT_DELAY));

  const method = PAYMENT_METHODS.find((option) => option.value === paymentMethod.value);
  userStore.placeOrder({
    items: cartStore.items.map((item) => ({ ...item })),
    total: cartStore.subtotal,
    paymentMethod: method.label,
    address: { ...address.value, CEP: userStore.user?.CEP ?? "" },
  });
  cartStore.clearCart();
  submitting.value = false;
  router.push("/confirmation");
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/payment";
</style>
