<template>
  <div
    class="form-group"
    :class="{ 'has-error': error, 'is-readonly': readonly && !disabled, 'is-disabled': disabled }"
  >
    <label v-if="label" :for="id" class="form-group__label">{{ label }}</label>

    <!-- A seta é do Font Awesome: o select nativo fica sem a aparência própria (appearance: none) -->
    <span v-if="type === 'select'" class="form-group__select">
      <select
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
      <font-awesome-icon :icon="['fas', 'chevron-down']" class="form-group__seta" aria-hidden="true" />
    </span>

    <textarea
      v-else-if="type === 'textarea'"
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

    <!-- O invólucro posiciona o botão de mostrar a senha no fim do campo, dentro do contorno -->
    <span v-else class="form-group__controle">
      <input
        :id="id"
        :type="inputType"
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
        :class="{ 'form-group__field--senha': isPassword }"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @keypress="handleKeyPress"
      />
      <!-- Toggle da APG: o nome fica fixo e o estado vai no aria-pressed; o foco fica no botão -->
      <button
        v-if="isPassword"
        type="button"
        class="form-group__mostrar"
        aria-label="Mostrar senha"
        :aria-pressed="passwordVisible ? 'true' : 'false'"
        :aria-controls="id"
        :disabled="disabled"
        @click="passwordVisible = !passwordVisible"
      >
        <font-awesome-icon :icon="['fas', passwordVisible ? 'eye-slash' : 'eye']" aria-hidden="true" />
      </button>
    </span>

    <!-- Com live, a região existe desde a montagem: o papel precisa estar lá antes de a mensagem mudar.
         O erro toma o lugar da ajuda, no DOM e no aria-describedby -->
    <div
      v-if="live || error || helper || loading"
      class="form-group__mensagens"
      :role="live ? 'status' : undefined"
      :aria-atomic="live ? 'true' : undefined"
    >
      <p v-if="error" :id="errorId" class="form-group__error">
        <span class="form-group__icone" aria-hidden="true">
          <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
        </span>
        {{ error }}
      </p>
      <p v-else-if="helper || loading" :id="helperId" class="form-group__help">
        <svg v-if="loading" class="form-group__spinner" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="28 10" />
        </svg>
        {{ helper }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { maskPhone, maskCEP, MASK_DIGITS } from "@/utils/masks";

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
  // Texto de ajuda, ligado ao campo por aria-describedby (sai enquanto houver erro)
  helper: {
    type: String,
    default: "",
  },
  // Mostra um spinner na ajuda (ex.: consulta do CEP)
  loading: {
    type: Boolean,
    default: false,
  },
  // As mensagens viram uma região viva (role="status"): o resultado da consulta do CEP é anunciado
  live: {
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

// O erro toma o lugar da ajuda: o campo é descrito por um ou por outro
const describedBy = computed(() => {
  if (props.error) return errorId.value;
  if (props.helper || props.loading) return helperId.value;
  return undefined;
});

// Senha: começa escondida a cada montagem; mostrar só troca o type (valor e autocomplete ficam)
const isPassword = computed(() => props.type === "password");
const passwordVisible = ref(false);
const inputType = computed(() => (isPassword.value && passwordVisible.value ? "text" : props.type));

const maskName = computed(() => props.mask?.toLowerCase() ?? "");
const hasMask = computed(() => maskName.value in MASK_DIGITS);

// Aplica máscara no input de acordo com o tipo
const displayValue = computed(() => {
  if (!props.modelValue) return "";

  switch (maskName.value) {
    case "phone":
      return maskPhone(props.modelValue.toString());
    case "cep":
      return maskCEP(props.modelValue.toString());
    default:
      return props.modelValue;
  }
});

// Campo numérico ou com máscara: só dígitos (teclas de controle, como Enter, passam)
const handleKeyPress = (event) => {
  if ((props.type === "number" || hasMask.value) && event.key.length === 1 && !/\d/.test(event.key)) {
    event.preventDefault();
  }
};

const handleInput = (event) => {
  const value = event.target.value;
  let processedValue = value;

  if (hasMask.value) {
    // Só os dígitos que a máscara mostra: o campo não guarda um 9º dígito de CEP escondido
    processedValue = value.replace(/\D/g, "").slice(0, MASK_DIGITS[maskName.value]);
    // O valor do campo volta à máscara, sem o dígito que passou do limite
    const masked = maskName.value === "phone" ? maskPhone(processedValue) : maskCEP(processedValue);
    if (event.target.value !== masked) event.target.value = masked;
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
