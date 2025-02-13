<template>
  <div>
    <h1>Pagamento 💳</h1>
    <p>Total: {{ formatPrice(total) }}</p>
    <button @click="confirmPayment">Pagar</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useCartStore } from "../store/cart";
import { formatPrice } from "@/utils/formatters";

const router = useRouter();
const cartStore = useCartStore();

const total = computed(() => cartStore.items.reduce((sum, item) => sum + item.price, 0));

const confirmPayment = () => {
  alert("Pagamento aprovado!");
  cartStore.clearCart();
  router.push("/confirmation");
};
</script>
