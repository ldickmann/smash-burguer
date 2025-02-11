<script setup>
defineProps({
  address: String,
  phone: String,
  email: String,
})

const getGoogleMapsUrl = (address) => {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

const getWhatsAppUrl = (phone) => {
  // Remove non-numeric characters from phone number
  const cleanPhone = phone.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}`
}
</script>

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

<style scoped lang="scss">
@use '@/assets/styles/components/footer';
</style>
