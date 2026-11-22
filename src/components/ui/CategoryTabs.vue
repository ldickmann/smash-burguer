<!-- Grupo de categorias do Cardápio (desenho do Cardápio, §5.2): visual de grupo conectado [54] com
     rádios nativos num fieldset, como o PaymentMethodPicker. Escolha exclusiva é rádio na APG [93]; o
     teclado (Tab numa parada só, setas que movem e marcam) e o estado vêm do navegador [92][96]. A barra
     gruda no topo abaixo de lg e abaixo do cabeçalho a partir dele (SPEC-material §5.1). -->
<template>
  <div ref="sentinel" class="category-tabs__sentinel" aria-hidden="true"></div>
  <div class="category-tabs" :class="{ 'is-stuck': isStuck }">
    <div class="category-tabs__inner container">
      <fieldset class="category-tabs__grupo">
        <legend class="visually-hidden">Categorias</legend>
        <div class="category-tabs__opcoes">
          <label
            v-for="(option, index) in options"
            :key="option.value"
            class="category-tabs__opcao"
            :class="[`category-tabs__opcao--${posicao(index)}`, { 'is-marcada': option.value === modelValue }]"
          >
            <input
              type="radio"
              class="visually-hidden"
              :name="nome"
              :value="option.value"
              :checked="option.value === modelValue"
              @change="$emit('update:modelValue', option.value)"
            />
            <span class="category-tabs__rotulo">{{ option.label }}</span>
          </label>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, useId } from "vue";

const props = defineProps({
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

// Um name por grupo: os rádios do mesmo grupo se excluem e as setas andam só entre eles
const nome = `categoria-${useId()}`;

// Forma pela posição no grupo conectado: início e fim com os cantos de fora redondos
const posicao = (index) => {
  if (index === 0) return "inicio";
  if (index === props.options.length - 1) return "fim";
  return "meio";
};

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
