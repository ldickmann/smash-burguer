<template>
  <div class="stepper" role="group" :aria-label="`Quantidade de ${label}`">
    <!-- No limite, aria-disabled no lugar do disabled: o botão continua focável, e o foco não cai no
         viewport quando ele chega ao limite (desenho dos componentes base, §5.4) -->
    <BaseButton
      variant="secondary"
      icon-only
      icon-start="minus"
      :label="`Diminuir ${label}`"
      :aria-disabled="modelValue <= min ? 'true' : undefined"
      @click="change(-1)"
    />
    <output class="stepper__value tabular" aria-live="polite">{{ modelValue }}</output>
    <BaseButton
      variant="secondary"
      icon-only
      icon-start="plus"
      :label="`Aumentar ${label}`"
      :aria-disabled="modelValue >= max ? 'true' : undefined"
      @click="change(1)"
    />
  </div>
</template>

<script setup>
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

const change = (step) => {
  const next = Math.min(props.max, Math.max(props.min, props.modelValue + step));
  if (next === props.modelValue) return;
  emit("update:modelValue", next);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/quantity-stepper";
</style>
