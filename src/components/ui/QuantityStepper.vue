<template>
  <div class="stepper" role="group" :aria-label="`Quantidade de ${label}`">
    <BaseButton
      variant="secondary"
      icon-only
      icon-start="minus"
      :label="`Diminuir ${label}`"
      :disabled="modelValue <= min"
      @click="change(-1)"
    />
    <output class="stepper__value tabular" aria-live="polite">
      <Transition :name="direction > 0 ? 'stepper-up' : 'stepper-down'">
        <span :key="modelValue" class="stepper__digit">{{ modelValue }}</span>
      </Transition>
    </output>
    <BaseButton
      variant="secondary"
      icon-only
      icon-start="plus"
      :label="`Aumentar ${label}`"
      :disabled="modelValue >= max"
      @click="change(1)"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 10,
  },
  // Nome do item, usado nos rótulos acessíveis
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const direction = ref(1);

const change = (step) => {
  const next = Math.min(props.max, Math.max(props.min, props.modelValue + step));
  if (next === props.modelValue) return;
  direction.value = step;
  emit("update:modelValue", next);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/quantity-stepper";
</style>
