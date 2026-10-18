<template>
  <fieldset class="payment-picker">
    <legend class="payment-picker__legend">Forma de pagamento</legend>

    <div class="payment-picker__options">
      <!-- Rádios no mesmo name: as setas trocam a opção (comportamento nativo) -->
      <label
        v-for="option in PAYMENT_METHODS"
        :key="option.value"
        class="payment-option"
        :class="{ 'is-checked': model === option.value }"
      >
        <input
          v-model="model"
          type="radio"
          name="payment-method"
          :value="option.value"
          class="visually-hidden"
        />
        <font-awesome-icon :icon="option.icon" class="payment-option__icon" aria-hidden="true" />
        <span class="payment-option__text">
          <span class="payment-option__name">{{ option.label }}</span>
          <span class="payment-option__desc">{{ option.description }}</span>
        </span>
        <font-awesome-icon
          v-if="model === option.value"
          :icon="['fas', 'circle-check']"
          class="payment-option__check"
          aria-hidden="true"
        />
      </label>
    </div>
  </fieldset>
</template>

<script>
export const PAYMENT_METHODS = [
  { value: "credit", label: "Cartão de crédito", icon: ["fas", "credit-card"], description: "na entrega" },
  { value: "debit", label: "Cartão de débito", icon: ["fas", "credit-card"], description: "na entrega" },
  { value: "pix", label: "PIX", icon: ["fas", "qrcode"], description: "aprovação na hora" },
  { value: "cash", label: "Dinheiro", icon: ["fas", "money-bill"], description: "na entrega" },
];
</script>

<script setup>
const model = defineModel({ type: String, default: "" });
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/payment-method-picker";
</style>
