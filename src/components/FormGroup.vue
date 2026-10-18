<template>
  <div class="form-group" :class="{ 'has-error': error, 'is-readonly': readonly || disabled }">
    <label v-if="label" :for="id" class="form-group__label">{{ label }}</label>

    <select
      v-if="type === 'select'"
      :id="id"
      :value="modelValue"
      :name="name || id"
      :required="required"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      class="form-group__field form-group__field--select"
      @change="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <input
      v-else-if="type !== 'textarea'"
      :id="id"
      :type="type"
      :value="displayValue"
      :name="name || id"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :inputmode="inputmode"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      class="form-group__field"
      @input="handleInput"
      @blur="$emit('blur', $event)"
      @keypress="handleKeyPress"
    />

    <textarea
      v-else
      :id="id"
      :value="modelValue"
      :name="name || id"
      :rows="rows"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
      class="form-group__field form-group__field--textarea"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
    ></textarea>

    <p v-if="helper || loading" :id="helperId" class="form-group__help">
      <span v-if="loading" class="form-group__spinner" aria-hidden="true"></span>
      {{ helper }}
    </p>

    <p v-if="error" :id="errorId" class="form-group__error">
      <font-awesome-icon :icon="['fas', 'circle-exclamation']" aria-hidden="true" />
      {{ error }}
    </p>
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
  name: {
    type: String,
    default: "",
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
  // Texto de ajuda, ligado ao campo por aria-describedby
  helper: {
    type: String,
    default: "",
  },
  // Mostra um spinner na ajuda (ex.: consulta do CEP)
  loading: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: undefined,
  },
  inputmode: {
    type: String,
    default: undefined,
  },
  maxlength: {
    type: [Number, String],
    default: undefined,
  },
  rows: {
    type: [Number, String],
    default: 3,
  },
  // Opções do type="select": { value, label }[]
  options: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

// Define o evento que será emitido para atualizar o valor do input
const emit = defineEmits(["update:modelValue", "blur"]);

const errorId = computed(() => `${props.id}-erro`);
const helperId = computed(() => `${props.id}-ajuda`);

const describedBy = computed(() => {
  const ids = [];
  if (props.error) ids.push(errorId.value);
  if (props.helper || props.loading) ids.push(helperId.value);
  return ids.length ? ids.join(" ") : undefined;
});

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
