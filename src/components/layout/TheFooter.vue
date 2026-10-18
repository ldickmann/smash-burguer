<template>
  <footer class="site-footer">
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <p class="site-footer__wordmark">{{ title }}</p>
          <p>{{ description }}</p>
        </div>

        <section class="site-footer__col" aria-labelledby="rodape-endereco">
          <h2 id="rodape-endereco" class="site-footer__heading">Endereço</h2>
          <ContactInfo :address="address" :phone="phone" :email="email" />
        </section>

        <section class="site-footer__col" aria-labelledby="rodape-horario">
          <h2 id="rodape-horario" class="site-footer__heading">Horário</h2>
          <p>{{ workingHours }}</p>
        </section>

        <section class="site-footer__col" aria-labelledby="rodape-redes">
          <h2 id="rodape-redes" class="site-footer__heading">Redes sociais</h2>
          <SocialMediaLinks :brand="title" />
        </section>
      </div>

      <hr class="divider site-footer__divider" />
      <p class="site-footer__copy">
        © 2026 {{ title }} · Sabiá Operações — Desenvolvido por Lucas Elias Dickmann
      </p>
    </div>
  </footer>
</template>

<script setup>
import ContactInfo from "@/components/layout/TheFooterContactInfo.vue";
import SocialMediaLinks from "@/components/layout/TheFooterSocialMediaLinks.vue";

defineProps({
  title: String,
  description: String,
  address: String,
  phone: String,
  email: String,
  workingHours: String,
});
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/footer';
</style>
