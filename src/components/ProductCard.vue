<template>
  <article
    ref="cardRef"
    class="product-card"
    :class="[`product-card--${variant}`, { 'has-image-error': imageFailed }]"
  >
    <div class="product-card__media">
      <picture v-if="image.src && !imageFailed">
        <source v-if="image.srcset" type="image/webp" :srcset="image.srcset" :sizes="image.sizes" />
        <img
          class="product-card__img"
          :src="image.src"
          :alt="product.name"
          width="960"
          height="720"
          loading="lazy"
          decoding="async"
          @error="imageFailed = true"
        />
      </picture>
      <div v-else class="product-card__fallback">
        <font-awesome-icon :icon="['fas', 'burger']" aria-hidden="true" />
      </div>
    </div>

    <div class="product-card__body">
      <component :is="`h${headingLevel}`" class="product-card__name">{{ product.name }}</component>
      <p v-if="product.description" class="product-card__desc">{{ product.description }}</p>

      <div class="product-card__footer">
        <p class="product-card__price tabular">{{ formatPrice(product.price) }}</p>

        <!-- Flip "Adicionado ✓" (§7.1). O ::after do botão cobre o card inteiro. -->
        <button
          v-if="variant !== 'admin'"
          type="button"
          class="add-btn"
          :class="{ 'is-added': added }"
          :aria-label="`Adicionar ${product.name}`"
          @click="$emit('add', product, { markAdded })"
        >
          <span class="add-btn__inner">
            <span class="add-btn__face add-btn__face--front">Adicionar</span>
            <span class="add-btn__face add-btn__face--back" aria-hidden="true">
              <font-awesome-icon :icon="['fas', 'check']" /> Adicionado
            </span>
          </span>
        </button>

        <div v-else class="product-card__actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { formatPrice } from "@/utils/formatters";
import { responsiveImage } from "@/composables/useResponsiveImage";
import { useTilt } from "@/composables/useTilt";
import { readDurationToken } from "@/utils/tokens";

const SIZES = {
  menu: "(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 480px) 45vw, 92vw",
  compact: "(min-width: 1024px) 380px, (min-width: 480px) 45vw, 92vw",
  admin: "(min-width: 1280px) 280px, (min-width: 1024px) 30vw, (min-width: 480px) 45vw, 92vw",
};

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: "menu",
    validator: (value) => ["menu", "compact", "admin"].includes(value),
  },
  headingLevel: {
    type: [Number, String],
    default: 3,
  },
});

defineEmits(["add"]);

const cardRef = ref(null);
const imageFailed = ref(false);
const image = computed(() => responsiveImage(props.product.image, { sizes: SIZES[props.variant] }));

// Tilt só na grade do cardápio
if (props.variant === "menu") useTilt(cardRef, { max: 4 });

// O botão fica virado por --dur-base + --dur-hold e volta; uma nova adição reinicia o tempo
const added = ref(false);
let addedTimer;

const markAdded = () => {
  added.value = true;
  clearTimeout(addedTimer);
  addedTimer = setTimeout(
    () => (added.value = false),
    readDurationToken("--dur-base", 240) + readDurationToken("--dur-hold", 1200)
  );
};

onBeforeUnmount(() => clearTimeout(addedTimer));

defineExpose({ markAdded });
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/product-card";
</style>
