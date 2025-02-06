<template>
  <Header title="Smash Burgers" />
  <Banner classBanner="banner" image="/images/banner-burguer.jpg" alt="Hambúrgueres" />
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
import Banner from '@/components/Banner.vue'

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

<style scoped lang="scss">
@use "@/assets/pages/homeView.scss";
</style>
