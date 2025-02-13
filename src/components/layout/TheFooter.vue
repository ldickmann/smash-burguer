<template>
  <footer>
    <div class="container-utilities">
      <div class="container-general">
        <div class="container-title">
          <h1>{{ title }}</h1>
          <p>{{ description }}</p>
        </div>

        <ContactInfo :address="address" :phone="phone" :email="email" />

        <div class="container-working-hours">
          <h2>Working Hours</h2>
          <p>{{ workingHours }}</p>
        </div>

        <SocialMediaLinks />
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

<script setup>
import SeparatorLines from '../SeparatorLines.vue'
import ContactInfo from './TheFooterContactInfo.vue'
import SocialMediaLinks from './TheFooterSocialMediaLinks.vue'

const props = defineProps({
  title: String,
  description: String,
  address: String,
  phone: String,
  email: String,
  workingHours: String,
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/footer';
</style>
