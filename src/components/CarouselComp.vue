<template>
  <Carousel v-bind="config" class="custom-carousel">
    <Slide v-for="burguer in burgers" :key="burguer.id" class="custom-slide">
      <div class="carousel-item">
        <img :src="burguer.image" :alt="burguer.name" class="carousel-image" />
        <div class="carousel-content">
          <h3>{{ burgers.name }}</h3>
          <p>{{ burguer.description }}</p>
          <p class="price">R$ {{ burguer.price.toFixed(2) }}</p>
          <button class="carousel-button">Adicionar ao Carrinho</button>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

const burgers = [
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
  {
    id: 4,
    name: 'Batata Frita',
    description: 'Batata frita crocante e sequinha.',
    price: 12.9,
    image: '/images/batata-frita.jpg',
  },
  {
    id: 5,
    name: 'x-salada',
    description: 'Pão brioche, pepino, tomate, alface, carne angus e queijo prato.',
    price: 20.9,
    image: '/images/x-salada.jpg',
  }
]

const config = {
  height: 450,
  itemsToShow: 3,
  snapAlign: 'center',
};
</script>

<style scoped>
.custom-carousel {
  padding: 0rem 0rem;
}

:deep(.custom-carousel) {
  padding: 1rem;
}

.carousel-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  height: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.carousel-item:hover {
  transform: translateY(-5px);
}

.carousel-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  aspect-ratio: 16/9;
}

.carousel-content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.carousel-content h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.price {
  color: #42b983;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.carousel-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.carousel-button:hover {
  background: #3aa876;
}

:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: #42b983;
  border: none;
  border-radius: 50%;
}

:deep(.carousel__pagination-button) {
  background-color: #ddd;
}

:deep(.carousel__pagination-button--active) {
  background-color: #42b983;
}
</style>
