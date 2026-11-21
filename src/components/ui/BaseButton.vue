<template>
  <component
    :is="tag"
    ref="root"
    v-bind="elementAttrs"
    :class="classes"
    :style="lockedWidth ? { minWidth: lockedWidth } : undefined"
    @click="handleClick"
  >
    <span class="btn__face btn__face--frente">
      <svg v-if="loading" class="btn__spinner" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="28 10" />
      </svg>
      <font-awesome-icon
        v-else-if="iconStart"
        :icon="iconStart"
        class="btn__icon"
        aria-hidden="true"
      />
      <span v-if="!iconOnly" class="btn__label"><slot /></span>
      <font-awesome-icon
        v-if="iconEnd && !iconOnly"
        :icon="iconEnd"
        class="btn__icon"
        aria-hidden="true"
      />
    </span>
    <!-- Retorno "Adicionado" (SPEC-material §7.6): a face fica no DOM enquanto a prop é usada, para a
         troca ser por opacidade; aria-hidden, para o nome acessível não mudar -->
    <span v-if="retorno !== undefined" class="btn__face btn__face--verso" aria-hidden="true">
      <font-awesome-icon :icon="['fas', 'check']" class="btn__check" />
      Adicionado
    </span>
  </component>
</template>

<script setup>
import { computed, nextTick, ref, useAttrs, watch } from "vue";
import { RouterLink } from "vue-router";

defineOptions({ inheritAttrs: false });

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "ghost", "danger"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  block: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit"].includes(value),
  },
  // Botão alternável: vira aria-pressed (só quando informado)
  pressed: { type: Boolean, default: undefined },
  // Face "Adicionado" com o check, do M3Botao da Home (só existe quando informada)
  retorno: { type: Boolean, default: undefined },
  iconStart: { type: [String, Array], default: "" },
  iconEnd: { type: [String, Array], default: "" },
  // Botão quadrado só com ícone: `label` vira o aria-label (obrigatório)
  iconOnly: { type: Boolean, default: false },
  label: { type: String, default: "" },
  to: { type: [String, Object], default: undefined },
  href: { type: String, default: undefined },
});

const attrs = useAttrs();
const root = ref(null);
const lockedWidth = ref("");

if (props.iconOnly && !props.label) {
  console.warn("BaseButton: `iconOnly` exige `label`.");
}

// Link desabilitado ou carregando não navega: vira <a> sem href
const isInert = computed(() => props.disabled || props.loading);
const isLink = computed(() => Boolean(props.to || props.href));

const tag = computed(() => {
  if (props.to && !isInert.value) return RouterLink;
  if (isLink.value) return "a";
  return "button";
});

const elementAttrs = computed(() => {
  // O clique é repassado por handleClick para respeitar loading/disabled
  // eslint-disable-next-line no-unused-vars
  const { onClick, ...result } = attrs;

  if (tag.value === "button") {
    result.type = props.type;
    result.disabled = props.disabled || undefined;
  } else if (props.to && !isInert.value) {
    result.to = props.to;
  } else if (props.href && !isInert.value) {
    result.href = props.href;
  }

  if (isLink.value && props.disabled) result["aria-disabled"] = "true";
  if (props.loading) result["aria-busy"] = "true";
  if (props.pressed !== undefined) result["aria-pressed"] = String(props.pressed);
  if (props.iconOnly) result["aria-label"] = props.label;

  return result;
});

// Mapa do SPEC-material §4.1: primary vira filled, secondary vira tonal e ghost vira texto.
// danger, iconOnly e pressed ficam com a forma de hoje (.btn--legado) até o desenho deles (§4.2)
const VARIANTE_M3 = { primary: "filled", secondary: "tonal", ghost: "texto" };
const legado = computed(() => props.variant === "danger" || props.iconOnly || props.pressed !== undefined);

const classes = computed(() => [
  "btn",
  `btn--${props.variant}`,
  `btn--${props.size}`,
  legado.value ? "btn--legado" : ["m3-botao", `m3-botao--${VARIANTE_M3[props.variant]}`],
  {
    "btn--block": props.block,
    "btn--icon-only": props.iconOnly,
    "is-loading": props.loading,
    "is-retorno": props.retorno === true,
  },
]);

const handleClick = (event) => {
  if (isInert.value) {
    event.preventDefault();
    return;
  }

  const listener = attrs.onClick;
  if (Array.isArray(listener)) listener.forEach((fn) => fn(event));
  else if (typeof listener === "function") listener(event);
};

// Durante o loading a largura não diminui
watch(
  () => props.loading,
  async (isLoading) => {
    if (isLoading) {
      const el = root.value?.$el ?? root.value;
      if (el?.offsetWidth) lockedWidth.value = `${el.offsetWidth}px`;
    } else {
      await nextTick();
      lockedWidth.value = "";
    }
  }
);

defineExpose({
  focus: () => (root.value?.$el ?? root.value)?.focus(),
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/ui/base-button";
</style>
