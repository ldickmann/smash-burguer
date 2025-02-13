<template>
  <section class="cart-page-section">
    <div class="cart-page">
      <h1 class="cart-page__title">{{ title }}</h1>

      <div v-if="isCartEmpty" class="cart-page__empty">
        <p>{{ emptyCartMessage }}</p>
        <router-link to="/menu" class="cart-page__button">
          {{ returnToMenuText }}
        </router-link>
      </div>

      <div v-else class="cart-page__content">
        <ul class="cart-page__list">
          <li
            v-for="(item, index) in cartItems"
            :key="item.id || index"
            class="cart-page__item"
          >
            <div class="cart-page__item-info">
              <span class="cart-page__item-name">{{ item.name }}</span>
              <span class="cart-page__item-price">{{ formatPrice(item.price) }}</span>
            </div>
            <button
              @click="removeItem(index)"
              class="cart-page__button cart-page__button--danger"
            >
              {{ removeButtonText }}
            </button>
          </li>
        </ul>

        <div class="cart-page__summary">
          <p class="cart-page__total">
            <span>{{ totalLabel }}</span>
            <strong>{{ formattedTotal }}</strong>
          </p>
          <router-link to="/menu" class="cart-page__button">
            {{ continueBuyingText }}
          </router-link>
          <router-link
            to="/payment"
            class="cart-page__button--primary"
            :disabled="isCartEmpty"
          >
            {{ checkoutText }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "../store/cart";
import { formatPrice } from "@/utils/formatters";

// Store
const cartStore = useCartStore();

// Computed Properties
const cartItems = computed(() => cartStore.items);
const isCartEmpty = computed(() => cartItems.value.length === 0);
const total = computed(() => cartItems.value.reduce((sum, item) => sum + item.price, 0));
const formattedTotal = computed(() => formatPrice(total.value));

// Text Constants
const title = "Seu Carrinho 🛒";
const emptyCartMessage = "Seu carrinho está vazio.";
const returnToMenuText = "Voltar ao Menu";
const removeButtonText = "Remover";
const totalLabel = "Total:";
const continueBuyingText = "Continuar Comprando";
const checkoutText = "Finalizar Pedido";

// Methods
const removeItem = (index) => {
  cartStore.removeItem(index);
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/cart-page";
</style>
