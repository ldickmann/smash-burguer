<template>
  <footer>
    <div class="container-utilities">
      <div class="container-general">
        <div class="container-title">
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
        </div>
        <SeparatorLines orientation="vertical" color="#ffffff" thickness="1" />
        <div class="container-contact">
          <h2>Address</h2>
          <p>{{ address }}</p>
          <p>{{ phone }}</p>
          <p>{{ email }}</p>
        </div>
        <div class="container-working-hours">
          <h2>Working Hours</h2>
          <h4>{{ workingHours }}</h4>
        </div>
        <div class="container-social-media">
          <h2>Follow Us</h2>
          <p>{{ socialMedia }}</p>
        </div>
      </div>
      <SeparatorLines
        orientation="horizontal"
        color="#ffffff"
        thickness="1"
        class="separator-copy"
      />
      <div class="container-copy">
        <p>Copyright © 2025 Smash Burgers</p>
        <p>Desenvolvido por Lucas Elias Dickmann</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import SeparatorLines from "../SeparatorLines.vue";

const props = defineProps({
  title: String,
  description: String,
  address: String,
  phone: String,
  email: String,
  workingHours: String,
  socialMedia: String,
  isDark: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/footer';
</style>
