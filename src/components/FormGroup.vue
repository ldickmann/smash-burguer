<template>
  <!-- FormGroup component -->
  <div class="form-group">
    <!-- Exibe p rótulo apenas se a prop label for passada -->
    <label :for="id" v-if="label">{{ label }}</label>
    <!-- Exibe input ou textarea de acordo com a prop type -->
    <!-- Se o type for diferente de textarea, exibe um input padrão -->
    <input
      v-if="type !== 'textarea'"
      :id="id"
      :type="type"
      :value="displayValue"
      @input="handleInput"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="['form-input', { 'has-error': error }]"
      @keypress="handleKeyPress"
    />

    <!-- Se o type for textarea, exibe o input textarea -->
    <textarea
      v-else
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="['form-textarea', { 'has-error': error }]"
    ></textarea>

    <!-- Exibe a mensagem de erro caso a prop error seja passada -->
    <span v-if="error" class="form-error">{{ error }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { maskPhone, maskCEP } from "@/utils/masks";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Boolean],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  mask: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  autocomplete: {
    type: String,
    default: "off",
  },
});

// Define o evento que será emitido para atualizar o valor do input
const emit = defineEmits(["update:modelValue"]);

const hasMask = computed(() => ["phone", "cep"].includes(props.mask?.toLowerCase()));

// Aplica máscara no input de acordo com o tipo
const displayValue = computed(() => {
  if (!props.modelValue) return "";

  switch (props.mask?.toLowerCase()) {
    case "phone":
      return maskPhone(props.modelValue.toString());
    case "cep":
      return maskCEP(props.modelValue.toString());
    default:
      return props.modelValue;
  }
});

const handleKeyPress = (event) => {
  if ((props.type === "number" || props.mask === "tel") && !/[\d]/.test(event.key)) {
    event.preventDefault();
  }
};

const handleInput = (event) => {
  const value = event.target.value;
  let processedValue = value;

  if (hasMask.value) {
    // Remove caracteres não numéricos para inputs com máscara
    processedValue = value.replace(/\D/g, "");
  } else if (props.type === "number") {
    // Garante que apenas números são processados para type number
    processedValue = value.replace(/\D/g, "");
  }

  emit("update:modelValue", processedValue);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/form-group';
</style>
