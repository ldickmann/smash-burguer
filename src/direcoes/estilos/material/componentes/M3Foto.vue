<!-- Foto de produto com reserva e forma do catálogo [9]: cartão (canto 28; 16 abaixo de md), cookie
     de 12 lobos, círculo ou flor de 8 lobos. Sem srcset (imagem data: do painel), vai sem <source>.
     Se a imagem falha, entra o ícone na mesma proporção. -->
<template>
  <div class="m3-foto" :class="`m3-foto--${forma}`" :style="{ aspectRatio: proporcaoFinal }">
    <picture v-if="imagem.src && !falhou" class="m3-foto__picture">
      <source v-if="imagem.srcset" type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
      <img
        class="m3-foto__img"
        :src="imagem.src"
        :alt="alt"
        :width="largura"
        :height="altura"
        loading="lazy"
        decoding="async"
        @error="emit('erro')"
      />
    </picture>
    <div v-else class="m3-foto__reserva">
      <font-awesome-icon :icon="icone" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  imagem: {
    type: Object,
    required: true,
  },
  alt: {
    type: String,
    default: "",
  },
  forma: {
    type: String,
    default: "cartao",
    validator: (valor) => ["cartao", "cookie", "circulo", "flor"].includes(valor),
  },
  proporcao: {
    type: String,
    default: "4 / 3",
  },
  falhou: {
    type: Boolean,
    default: false,
  },
  icone: {
    type: Array,
    default: () => ["fas", "burger"],
  },
  largura: {
    type: Number,
    default: 960,
  },
  altura: {
    type: Number,
    default: 720,
  },
});

const emit = defineEmits(["erro"]);

// O cookie, o círculo e a flor são sempre quadrados, para os lobos não deformarem
const proporcaoFinal = computed(() => (props.forma === "cartao" ? props.proporcao : "1 / 1"));
</script>

<style scoped lang="scss">
@use "../scss/foto";
</style>
