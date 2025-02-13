<template>
  <div class="payment-method">
    <h2>Forma de Pagamento</h2>
    <div class="payment-options">
      <div
        v-for="method in paymentMethods"
        :key="method.id"
        class="payment-option"
        :class="{ selected: selectedMethod === method.type }"
        @click="selectMethod(method)"
      >
        <img :src="method.icon" :alt="method.name" />
        <span>{{ method.name }}</span>
      </div>
    </div>
    <ButtonsComponents
      :buttons="[backButton, nextButton]"
      background-color="#3498db"
      fontSize="18px"
      buttonSize="16px 32px"
      borderRadius="8px"
      :gap="16"
      @category-selected="handleButtonClick"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ButtonsComponents from "@/components/ButtonsComponents.vue";

const emit = defineEmits(["previous", "next", "select"]);

const paymentMethods = ref([
  {
    id: 1,
    type: "credit",
    name: "Cartão de Crédito",
    icon: "/icons/credit-card.svg",
  },
  {
    id: 2,
    type: "debit",
    name: "Cartão de Débito",
    icon: "/icons/debit-card.svg",
  },
  {
    id: 3,
    type: "pix",
    name: "PIX",
    icon: "/icons/pix.svg",
  },
]);

const selectedMethod = ref(null);

const backButton = computed(() => ({
  category: "back",
  label: "Voltar",
}));

const nextButton = computed(() => ({
  category: "next",
  label: "Próximo",
  disabled: !selectedMethod.value,
}));

const selectMethod = (method) => {
  selectedMethod.value = method.type;
  emit("select", method.type);
};

const handleButtonClick = (category) => {
  if (category === "back") {
    emit("previous");
  } else if (category === "next" && selectedMethod.value) {
    emit("next");
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/payment/payment-method";
</style>
