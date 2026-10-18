<template>
  <RouterLink to="/cart" class="cart-badge" :aria-label="label">
    <font-awesome-icon :icon="['fas', 'shopping-cart']" class="cart-badge__icon" aria-hidden="true" />
    <Transition name="cart-badge">
      <span v-if="count > 0" class="cart-badge__count tabular" aria-hidden="true">
        <span
          v-for="slot in slots"
          :key="slot.key"
          class="odo__window"
          :style="{ '--i': slot.fromRight }"
        >
          <Transition :name="digitTransition" appear>
            <span :key="slot.char" class="odo__digit">{{ slot.char }}</span>
          </Transition>
        </span>
      </span>
    </Transition>
  </RouterLink>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const count = computed(() => cartStore.itemCount);

const label = computed(() => {
  if (count.value === 0) return "Carrinho, vazio";
  return `Carrinho, ${count.value} ${count.value === 1 ? "item" : "itens"}`;
});

// Cada caractere numa janela própria, da direita para a esquerda
const slots = computed(() => {
  const text = count.value >= 100 ? "99+" : String(count.value);
  const chars = [...text];
  return chars.map((char, index) => {
    const fromRight = chars.length - 1 - index;
    return { key: `pos-${fromRight}`, char, fromRight };
  });
});

// Na primeira renderização e na entrada do badge (0 → 1) não há giro, só opacidade
const digitTransition = ref("odo-none");

watch(count, (next, previous) => {
  if (!previous || !next) {
    digitTransition.value = "odo-none";
    return;
  }
  digitTransition.value = next > previous ? "odo-up" : "odo-down";
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/components/cart-badge";
</style>
