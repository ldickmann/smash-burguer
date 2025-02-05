<template>
  <div>
    <h1>Seu Carrinho 🛒</h1>
    <div v-if="cartItems.length === 0">
      <p>Seu carrinho está vazio.</p>
      <router-link to="/menu">Voltar ao Menu</router-link>
    </div>
    <div v-else>
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          {{ item.name }} - R$ {{ item.price.toFixed(2) }}
          <button @click="removeItem(index)">Remover</button>
        </li>
      </ul>
      <p>
        <strong>Total: R$ {{ total.toFixed(2) }}</strong>
      </p>
      <router-link to="/payment">Finalizar Pedido</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const total = computed(() => cartStore.items.reduce((sum, item) => sum + item.price, 0))

const removeItem = (index) => {
  cartStore.removeItem(index)
}
</script>
