<template>
  <div :class="classCarousel">
    <div class="carousel-container">
      <div v-for="(slide, index) in slides" :key="index" :class="classSlide">
        <img :src="slide.image" :alt="slide.alt" :title="slide.title" />
        <div :class="slideDescription">
          <h3>{{ slide.title }}</h3>
          <p>{{ slide.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="carousel-controls">
    <button @click="prevSlide" :disabled="currentSlide === 0">Anterior</button>
    <button @click="nextSlide" :disabled="currentSlide >= slides.length - 4">Próximo</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentSlide = ref(0)

const props = defineProps({
  classCarousel: {
    type: String,
    default: 'carousel'
  },
  classSlide: {
    type: String,
    default: 'slide'
  },
  slideDescription: {
    type: String,
    default: 'slide-description'
  }
})

const slides = ref([
  {
    image: '/images/banner-burguer.jpg',
    alt: 'Hambúrgueres',
    title: 'Hambúrgueres',
    description: 'Conheça nossos hambúrgueres artesanais.'
  },
  {
    image: '/images/veggie-burger.jpg',
    alt: 'Veggie Burger',
    title: 'Veggie Burger',
    description: 'Experimente nosso hambúrguer vegetariano.'
  },
  {
    image: '/images/smash-burger.jpg',
    alt: 'Smash Burger',
    title: 'Smash Burger',
    description: 'Dois smash burgers com queijo prato e cebola caramelizada.'
  },
  {
    image: '/images/batata-frita.jpg',
    alt: 'Batatas Fritas',
    title: 'Batatas Fritas',
    description: 'Experimente nossas batatas fritas crocantes.'
  },
  {
    image: '/images/refrigerante.jpg',
    alt: 'Refrigerantes',
    title: 'Refrigerantes',
    description: 'Acompanhe seu lanche com nossos refrigerantes.'
  },
])

const visibleSlides = computed(() => {
  return slides.value.slice(currentSlide.value, currentSlide.value + 4)
})

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value -= 4
  }
}

const nextSlide = () => {
  if (currentSlide.value < slides.length - 4) {
    currentSlide.value += 4
  }
}

</script>

<style scoped lang="scss">
@use "@/assets/components/carousel.scss";
</style>
