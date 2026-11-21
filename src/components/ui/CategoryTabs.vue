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

// Mesmo valor do breakpoint lg do SCSS (§2.9). A partir dele o cabeçalho é sticky e as abas grudam
// abaixo dele; antes, o cabeçalho rola com a página e elas grudam no topo (SPEC-material §5.1)
const LG_QUERY = "(min-width: 1024px)";

// A borda inferior só aparece quando as abas estão grudadas
const sentinel = ref(null);
const isStuck = ref(false);
let observer;
let lgMedia;

// O observador é refeito quando a tela cruza lg, porque o topo onde as abas grudam muda
const observe = () => {
  observer?.disconnect();
  if (!("IntersectionObserver" in window) || !sentinel.value) return;
  const rootStyle = getComputedStyle(document.documentElement);
  // --navbar-h está em rem
  const navbarH =
    parseFloat(rootStyle.getPropertyValue("--navbar-h")) * parseFloat(rootStyle.fontSize);
  const top = lgMedia?.matches ? navbarH : 0;
  observer = new IntersectionObserver(
    ([entry]) => {
      isStuck.value = !entry.isIntersecting && entry.boundingClientRect.top < top;
    },
    { rootMargin: `${-top}px 0px 0px 0px` }
  );
  observer.observe(sentinel.value);
};

onMounted(() => {
  lgMedia = window.matchMedia?.(LG_QUERY);
  lgMedia?.addEventListener("change", observe);
  observe();
});

onBeforeUnmount(() => {
  lgMedia?.removeEventListener("change", observe);
  observer?.disconnect();
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/category-tabs";
</style>
