<!-- Foto do produto com o quadro de proporção fixa e a reserva por ícone. A proporção vai numa
     propriedade, para o pai trocá-la por mídia (a comanda: 1:1 deitada, 4:3 em pé). Sem srcset
     (imagem data: do painel), vai sem <source>. Se a imagem falha, o pai marca `falhou` e entra o
     ícone. -->
<template>
  <div class="esq-foto" :style="{ '--esq-foto-proporcao': proporcao }">
    <picture v-if="imagem.src && !falhou" class="esq-foto__picture">
      <source v-if="imagem.srcset" type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
      <img
        class="esq-foto__img"
        :src="imagem.src"
        :alt="alt"
        :width="largura"
        :height="altura"
        loading="lazy"
        decoding="async"
        @error="emit('erro')"
      />
    </picture>
    <div v-else class="esq-foto__reserva">
      <font-awesome-icon :icon="icone" aria-hidden="true" />
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
  proporcao: {
    type: String,
    default: "4 / 3",
  },
  largura: {
    type: Number,
    default: 960,
  },
  altura: {
    type: Number,
    default: 720,
  },
  falhou: {
    type: Boolean,
    default: false,
  },
  icone: {
    type: [Array, Object],
    default: () => ["fas", "burger"],
  },
});

const emit = defineEmits(["erro"]);
</script>

<style scoped lang="scss">
@use "../scss/foto";
</style>
