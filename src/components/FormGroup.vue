<template>
  <div class="form-group">
    <label :for="id" v-if="label">{{ label }}</label>
    <input
      v-if="type !== 'textarea'"
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="['form-input', { 'has-error': error }]"
    />
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
    <span v-if="error" class="form-error">{{ error }}</span>
  </div>
</template>

<script setup>
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
    default: "input",
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

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  const value = props.type === "checkbox" ? event.target.checked : event.target.value;
  emit("update:modelValue", value);
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/form-group';
</style>
