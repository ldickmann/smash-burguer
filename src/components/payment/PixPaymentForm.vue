<template>
  <div class="pix-payment-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="fullName">Nome Completo</label>
        <input
          type="text"
          id="fullName"
          v-model="pixData.fullName"
          required
          placeholder="Digite seu nome completo"
        />
      </div>

      <div class="form-group">
        <label for="cpf">CPF</label>
        <input
          type="text"
          id="cpf"
          v-model="pixData.cpf"
          @input="handleCpfInput"
          maxlength="14"
          required
          placeholder="000.000.000-00"
        />
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
import { formatCPF } from "@/utils/formatters";
import ButtonsComponents from "@/components/ButtonsComponents.vue";

const emit = defineEmits(["previous", "next"]);

const pixData = ref({
  fullName: "",
  cpf: "",
});

const handleCpfInput = (event) => {
  pixData.value.cpf = formatCPF(event.target.value);
};

const backButton = computed(() => ({
  category: "back",
  label: "Voltar",
}));

const nextButton = computed(() => ({
  category: "next",
  label: "Continuar",
  disabled: !pixData.value.fullName || !pixData.value.cpf,
}));

const handleButtonClick = (category) => {
  if (category === "back") {
    emit("previous");
  } else if (category === "next") {
    emit("next", pixData.value);
  }
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/payment/pix-form';
</style>
