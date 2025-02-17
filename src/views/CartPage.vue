<template>
  <section class="cart-page-section">
    <div class="cart-page">
      <h1 class="cart-page__title">{{ title }}</h1>

      <div v-if="!userStore.isAuthenticated" class="cart-page__empty">
        <p>Faça login para acessar seu carrinho</p>
        <div class="cart-page__auth-buttons">
          <router-link to="/login" class="cart-page__button">Fazer Login</router-link>
          <router-link to="/register" class="cart-page__button">
            Criar Conta
          </router-link>
        </div>
      </div>

      <div v-else-if="isCartEmpty" class="cart-page__empty">
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
          <router-link to="/payment" class="cart-page__button--primary">
            {{ checkoutText }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/store/cart";
import { useUserStore } from "@/stores/userStore";
import { formatPrice } from "@/utils/formatters";

const router = useRouter();
const cartStore = useCartStore();
const userStore = useUserStore();

onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.push("/login");
  }
});

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
