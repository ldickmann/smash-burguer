<template>
  <Header />
  <div class="container">
    <h1>🍔 Nossos Hambúrgueres</h1>
    <div class="burger-list">
      <div v-for="burger in burgers" :key="burger.id" class="burger-card">
        <img :src="burger.image" :alt="burger.name" />
        <h2>{{ burger.name }}</h2>
        <p>{{ burger.description }}</p>
        <p class="price">R$ {{ burger.price.toFixed(2) }}</p>
        <button @click="addToCart(burger)">Adicionar ao Carrinho</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/store/cart'
import Header from '@/components/Header.vue'

const cartStore = useCartStore()

const burgers = ref([
  {
    id: 1,
    name: 'Cheese Bacon',
    description: 'Pão brioche, carne angus, cheddar e bacon crocante.',
    price: 25.9,
    image: '/images/cheese-bacon.jpg',
  },
  {
    id: 2,
    name: 'Smash Burger',
    description: 'Dois smash burgers com queijo prato e cebola caramelizada.',
    price: 22.5,
    image: '/images/smash-burger.jpg',
  },
  {
    id: 3,
    name: 'Veggie Burger',
    description: 'Hambúrguer de grão de bico com maionese vegana.',
    price: 24.9,
    image: '/images/veggie-burger.jpg',
  },
])

const addToCart = (burger) => {
  cartStore.addItem(burger)
  alert(`${burger.name} foi adicionado ao carrinho!`)
}
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.burger-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.burger-card {
  width: 300px;
  padding: 15px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.burger-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
}

.price {
  font-weight: bold;
  color: #ff6600;
}

button {
  background: #ff6600;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #e55b00;
}
</style>
