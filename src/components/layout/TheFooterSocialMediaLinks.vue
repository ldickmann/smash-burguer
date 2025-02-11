<script setup>
const socialMediaLinks = [
  {
    name: 'facebook',
    icon: ['fab', 'facebook-f'],
    url: 'https://facebook.com',
  },
  {
    name: 'instagram',
    icon: ['fab', 'instagram'],
    url: 'https://instagram.com',
  },
  {
    name: 'twitter',
    icon: ['fab', 'twitter'],
    url: 'https://twitter.com',
  },
  {
    name: 'X',
    icon: ['fab', 'x-twitter'],
    url: 'https://x-twitter.com',
  },
]
</script>

<template>
  <div class="container-social-media">
    <h2>Follow Us</h2>
    <div class="container-icons">
      <a
        v-for="link in socialMediaLinks"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <font-awesome-icon v-if="link.icon" :icon="link.icon" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/components/footer';
</style>
