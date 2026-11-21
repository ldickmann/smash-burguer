<!-- Foto numa moldura afundada no kraft: retangular (4:3, o visor) ou redonda (as vagas). Sem srcset
     (imagem data: do painel), vai sem <source>. Se a imagem falha, entra o ícone no mesmo poço. -->
<template>
  <div class="neu-foto-poco" :class="`neu-foto-poco--${forma}`">
    <div class="neu-foto-poco__janela">
      <picture v-if="imagem.src && !falhou" class="neu-foto-poco__picture">
        <source v-if="imagem.srcset" type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
        <img
          class="neu-foto-poco__img"
          :src="imagem.src"
          :alt="alt"
          :width="largura"
          :height="altura"
          loading="lazy"
          decoding="async"
          @error="emit('erro')"
        />
      </picture>
      <div v-else class="neu-foto-poco__reserva">
        <font-awesome-icon :icon="icone" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imagem: {
    type: Object,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  forma: {
    type: String,
    default: "retangular",
    validator: (valor) => ["retangular", "redonda"].includes(valor),
  },
  falhou: {
    type: Boolean,
    default: false,
  },
  largura: {
    type: Number,
    default: 960,
  },
  altura: {
    type: Number,
    default: 720,
  },
  icone: {
    type: Array,
    default: () => ["fas", "utensils"],
  },
});

const emit = defineEmits(["erro"]);
</script>

<style scoped lang="scss">
@use "../scss/foto-poco";
</style>
