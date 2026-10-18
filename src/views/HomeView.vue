<template>
  <BannerComponent
    variant="hero"
    title="Smash na chapa, entregue quente"
    text="Hambúrgueres artesanais prensados na hora. De terça a sexta, das 13h à 01h."
    image="/images/fundos/banner-burger-bg"
    alt="Hambúrguer artesanal com queijo, carne prensada e alface"
    :image-width="960"
    :image-height="906"
  >
    <template #actions>
      <BaseButton size="lg" to="/menu" icon-end="arrow-right">Ver cardápio</BaseButton>
    </template>
  </BannerComponent>

  <section class="home-popular" aria-labelledby="mais-pedidos">
    <div class="container">
      <CarouselBurguer :products="productsStore.foods" @add="openModal">
        <template #title>
          <h2 id="mais-pedidos" class="home-popular__title">Mais pedidos</h2>
        </template>
      </CarouselBurguer>
    </div>
  </section>

  <ModalAdditional :open="isOpen" :product="product" @close="closeModal" @confirm="confirm" />
</template>

<script setup>
import { useProductsStore } from "@/stores/products";
import { useProductModal } from "@/composables/useProductModal";
import BannerComponent from "@/components/BannerComponent.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import CarouselBurguer from "@/components/CarouselBurguer.vue";
import ModalAdditional from "@/components/ModalAdditional.vue";

const productsStore = useProductsStore();
const { isOpen, product, openModal, closeModal, confirm } = useProductModal();
</script>

<style scoped lang="scss">
@use "@/assets/styles/pages/home";
</style>
