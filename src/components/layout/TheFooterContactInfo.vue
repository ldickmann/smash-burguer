<template>
  <div class="container-contact">
    <h2>Address</h2>
    <div class="container-address-icon">
      <font-awesome-icon :icon="['fas', 'location-dot']" />
      <a :href="getGoogleMapsUrl(address)" target="_blank" rel="noopener noreferrer">
        {{ address }}
      </a>
    </div>
    <div class="container-phone-icon">
      <font-awesome-icon :icon="['fas', 'phone']" />
      <a :href="getWhatsAppUrl(phone)" target="_blank" rel="noopener noreferrer">
        {{ phone }}
      </a>
    </div>
    <div class="container-email-icon">
      <font-awesome-icon :icon="['far', 'envelope']" />
      <a :href="`mailto:${email}`">
        {{ email }}
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
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
@use '@/assets/styles/components/footer';
</style>
