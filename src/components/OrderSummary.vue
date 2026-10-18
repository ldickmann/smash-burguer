<template>
  <section
    class="order-summary"
    :class="`order-summary--${variant}`"
    :aria-labelledby="showTitle ? titleId : undefined"
  >
    <component :is="`h${headingLevel}`" v-if="showTitle" :id="titleId" class="order-summary__title">
      {{ title }}
    </component>

    <ul v-if="variant !== 'cart'" class="order-summary__items" role="list">
      <li v-for="(item, index) in items" :key="`${item.productId}-${item.category}-${index}`" class="order-summary__item">
        <div class="order-summary__line">
          <span class="order-summary__name">
            <span class="tabular">{{ item.quantity }}×</span> {{ item.name }}
          </span>
          <span class="order-summary__line-total tabular">
            {{ formatPrice(item.unitPrice * item.quantity) }}
          </span>
        </div>
        <p v-for="detail in describeItem(item)" :key="detail" class="order-summary__detail">
          {{ detail }}
        </p>
      </li>
    </ul>

    <dl class="order-summary__totals">
      <div class="order-summary__row">
        <dt>Subtotal</dt>
        <dd class="tabular">{{ formatPrice(subtotal) }}</dd>
      </div>
      <div class="order-summary__row order-summary__row--total">
        <dt>Total</dt>
        <dd class="order-summary__value tabular">{{ formatPrice(subtotal) }}</dd>
      </div>
    </dl>

    <div v-if="$slots.cta" class="order-summary__cta">
      <slot name="cta" />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { describeItem, formatPrice } from "@/utils/formatters";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  // cart: só totais e CTA (os itens ficam na lista ao lado)
  // compact: itens resumidos (pagamento); readonly: confirmação e histórico
  variant: {
    type: String,
    default: "cart",
    validator: (value) => ["cart", "compact", "readonly"].includes(value),
  },
  title: {
    type: String,
    default: "Resumo do pedido",
  },
  titleId: {
    type: String,
    default: "resumo-do-pedido",
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  headingLevel: {
    type: [Number, String],
    default: 2,
  },
});

// Sem taxa de entrega nesta versão: o total é o subtotal
const subtotal = computed(() =>
  props.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/order-summary";
</style>
