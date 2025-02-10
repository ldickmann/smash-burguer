<script setup>
import SeparatorLines from "../SeparatorLines.vue";

const props = defineProps({
  title: String,
  description: String,
  address: String,
  phone: String,
  email: String,
  workingHours: String,
});
</script>

<template>
  <footer>
    <div class="container-utilities">
      <div class="container-general">
        <div class="container-title">
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
        </div>
        <div class="container-contact">
          <h2>Address</h2>
          <div class="container-address-icon">
            <font-awesome-icon :icon="['fas', 'location-dot']" />
            <p>{{ address }}</p>
          </div>
          <div class="container-phone-icon">
            <font-awesome-icon :icon="['fas', 'phone']" />
            <p>{{ phone }}</p>
          </div>
          <div class="container-email-icon">
            <font-awesome-icon :icon="['far', 'envelope']" />
            <p>{{ email }}</p>
          </div>
        </div>
        <div class="container-working-hours">
          <h2>Working Hours</h2>
          <h4>{{ workingHours }}</h4>
        </div>
        <div class="container-social-media">
          <h2>Follow Us</h2>
          <div class="container-icons">
            <font-awesome-icon :icon="['fab', 'facebook-f']" />
            <font-awesome-icon :icon="['fab', 'instagram']" />
            <font-awesome-icon :icon="['fab', 'twitter']" />
            <img src="@/assets/icons/tripadvisor-icon.svg" alt="Tripadvisor" />
          </div>
        </div>
      </div>
      <SeparatorLines
        orientation="horizontal"
        color="#ffffff"
        :thickness="1"
        class="separator-copy"
      />
      <div class="container-copy">
        <p>Copyright © 2025 Smash Burgers</p>
        <p>Desenvolvido por Lucas Elias Dickmann</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/footer';
</style>
