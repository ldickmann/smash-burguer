<template>
  <ul class="footer-contact" role="list">
    <li>
      <a
        class="footer-contact__link"
        :href="getGoogleMapsUrl(address)"
        target="_blank"
        rel="noopener noreferrer"
      >
        <font-awesome-icon :icon="['fas', 'location-dot']" class="footer-contact__icon" aria-hidden="true" />
        <span>{{ address }}<span class="visually-hidden"> (abre em nova aba)</span></span>
      </a>
    </li>
    <li>
      <a
        class="footer-contact__link"
        :href="getWhatsAppUrl(phone)"
        target="_blank"
        rel="noopener noreferrer"
      >
        <font-awesome-icon :icon="['fas', 'phone']" class="footer-contact__icon" aria-hidden="true" />
        <span>
          WhatsApp · {{ phone }}<span class="visually-hidden"> (abre em nova aba)</span>
        </span>
      </a>
    </li>
    <li>
      <a class="footer-contact__link" :href="`mailto:${email}`">
        <font-awesome-icon :icon="['far', 'envelope']" class="footer-contact__icon" aria-hidden="true" />
        <span>{{ email }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
});

/**
 * Generates a Google Maps search URL for a given address.
 *
 * @param {string} address - The address to search for on Google Maps.
 * @returns {string} - The URL to search for the address on Google Maps.
 */
const getGoogleMapsUrl = (address) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
};

/**
 * Generates a WhatsApp URL for a given phone number.
 *
 * @param {string} phone - The phone number to be cleaned and used in the URL.
 * @returns {string} - The WhatsApp URL with the cleaned phone number.
 */
const getWhatsAppUrl = (phone) => {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}`;
};
</script>

<style scoped lang="scss">
@use '@/assets/styles/components/footer-contact';
</style>
