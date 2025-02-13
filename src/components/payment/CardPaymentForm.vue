<template>
  <div class="card-payment-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="cardName">Nome no Cartão</label>
        <input
          type="text"
          id="cardName"
          v-model="cardData.name"
          required
          placeholder="Nome como está no cartão"
        />
      </div>

      <div class="form-group">
        <label for="cardNumber">Número do Cartão</label>
        <input
          type="text"
          id="cardNumber"
          v-model="cardData.number"
          @input="handleCardNumberInput"
          maxlength="19"
          required
          placeholder="0000 0000 0000 0000"
        />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="expiry">Validade</label>
          <input
            type="text"
            id="expiry"
            v-model="cardData.expiry"
            @input="handleExpiryInput"
            maxlength="5"
            required
            placeholder="MM/AA"
          />
        </div>

        <div class="form-group">
          <label for="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            v-model="cardData.cvv"
            maxlength="3"
            required
            placeholder="000"
          />
        </div>
      </div>

      <div class="buttons">
        <ButtonsComponents
          :buttons="[backButton, nextButton]"
          backgroundColor="#3498db"
          fontSize="18px"
          buttonSize="16px 32px"
          borderRadius="8px"
          :gap="16"
          @category-selected="handleButtonClick"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { formatCardNumber, formatExpiryDate } from "@/utils/formatters";
import ButtonsComponents from "@/components/ButtonsComponents.vue";

const emit = defineEmits(["previous", "next"]);

const cardData = ref({
  name: "",
  number: "",
  expiry: "",
  cvv: "",
});

const handleCardNumberInput = (event) => {
  cardData.value.number = formatCardNumber(event.target.value);
};

const handleExpiryInput = (event) => {
  cardData.value.expiry = formatExpiryDate(event.target.value);
};

const isFormValid = computed(() => {
  return (
    cardData.value.name &&
    cardData.value.number.length === 19 &&
    cardData.value.expiry.length === 5 &&
    cardData.value.cvv.length === 3
  );
});

const backButton = computed(() => ({
  category: "back",
  label: "Voltar",
}));

const nextButton = computed(() => ({
  category: "next",
  label: "Confirmar Pagamento",
  disabled: !isFormValid.value,
}));

const handleButtonClick = (category) => {
  if (category === "back") {
    emit("previous");
  } else if (category === "next" && isFormValid.value) {
    emit("next", cardData.value);
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/payment/card-form';
</style>
