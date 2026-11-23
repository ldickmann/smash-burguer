<!-- Forma de pagamento (desenho do Carrinho, §5.7): lista segmentada de rádios nativos numa coluna
     [66][81], num fieldset com a legend escondida (o h2 visível fica na seção da PaymentView). Escolha
     exclusiva: o teclado (Tab numa parada só, setas que movem e marcam) e o estado vêm do navegador
     [92][96], como no CategoryTabs. O controle de 24 px no início da linha é o do ListItem de seleção
     única [107]: vazio na desmarcada, primary com o check na marcada [113]. Sem marcado ao abrir: o
     CTA pede a escolha (SPEC.md §5.6). -->
<template>
  <fieldset class="payment-picker">
    <legend class="visually-hidden">Forma de pagamento</legend>

    <div class="payment-picker__options">
      <label
        v-for="option in PAYMENT_METHODS"
        :key="option.value"
        class="payment-option"
        :class="{ 'is-checked': model === option.value }"
      >
        <!-- Escondido, mas com o retângulo do label: a rolagem do foco leva a opção inteira para fora
             das barras (foco não coberto, §5.7) -->
        <input
          v-model="model"
          type="radio"
          name="payment-method"
          :value="option.value"
          class="visually-hidden payment-option__input"
        />
        <span class="payment-option__controle" aria-hidden="true">
          <font-awesome-icon :icon="['fas', 'check']" class="payment-option__check" />
        </span>
        <span class="payment-option__text">
          <span class="payment-option__name">{{ option.label }}</span>
          <span class="payment-option__desc">{{ option.description }}</span>
        </span>
        <font-awesome-icon :icon="option.icon" class="payment-option__icon" aria-hidden="true" />
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
