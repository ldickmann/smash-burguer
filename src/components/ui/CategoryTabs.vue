<template>
  <div ref="sentinel" class="category-tabs__sentinel" aria-hidden="true"></div>
  <div class="category-tabs" :class="{ 'is-stuck': isStuck }">
    <div class="category-tabs__inner container">
      <div class="category-tabs__group" role="group" aria-label="Categorias">
        <BaseButton
          v-for="option in options"
          :key="option.value"
          class="category-tabs__tab"
          :variant="option.value === modelValue ? 'primary' : 'ghost'"
          :pressed="option.value === modelValue"
          @click="$emit('update:modelValue', option.value)"
        >
          {{ option.label }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";

defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

defineEmits(["update:modelValue"]);

// A borda inferior só aparece quando as abas estão grudadas abaixo da navbar
const sentinel = ref(null);
const isStuck = ref(false);
let observer;

onMounted(() => {
  if (!("IntersectionObserver" in window) || !sentinel.value) return;
  const rootStyle = getComputedStyle(document.documentElement);
  // --navbar-h está em rem
  const navbarH =
    parseFloat(rootStyle.getPropertyValue("--navbar-h")) * parseFloat(rootStyle.fontSize);
  observer = new IntersectionObserver(
    ([entry]) => {
      isStuck.value = !entry.isIntersecting && entry.boundingClientRect.top < navbarH;
    },
    { rootMargin: `-${navbarH}px 0px 0px 0px` }
  );
  observer.observe(sentinel.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/category-tabs";
</style>
