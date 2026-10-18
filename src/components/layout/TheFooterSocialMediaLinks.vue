<template>
  <ul class="footer-social" role="list">
    <li v-for="link in socialMediaLinks" :key="link.name">
      <a
        class="footer-social__link"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`${brand} no ${link.name} (abre em nova aba)`"
      >
        <font-awesome-icon :icon="link.icon" aria-hidden="true" />
      </a>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  brand: {
    type: String,
    default: "Smash Burger",
  },
});

const socialMediaLinks = [
  {
    name: "Facebook",
    icon: ["fab", "facebook-f"],
    url: "https://facebook.com",
  },
  {
    name: "Instagram",
    icon: ["fab", "instagram"],
    url: "https://instagram.com",
  },
];
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/footer-social';
</style>
