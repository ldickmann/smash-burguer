<!-- A foto do produto como a camada da frente, em pé sobre a bandeja: o quadro tem a proporção do tipo
     de objeto, a própria sombra e, no chão, a sombra de contato [D30][D3]. Enquanto carrega, o quadro
     guarda o espaço em pão claro; se a imagem falha ou falta, entra o ícone no mesmo quadro. Sem srcset
     (imagem data: do painel), vai sem <source>. -->
<template>
  <div class="d3-foto">
    <div class="d3-foto__quadro" :style="{ aspectRatio: `${proporcao[0]} / ${proporcao[1]}` }">
      <picture v-if="imagem.src && !falhou" class="d3-foto__picture">
        <source v-if="imagem.srcset" type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
        <img
          class="d3-foto__img"
          :src="imagem.src"
          :alt="alt"
          :width="LARGURA"
          :height="altura"
          loading="lazy"
          decoding="async"
          @error="emit('erro')"
        />
      </picture>
      <div v-else class="d3-foto__reserva">
        <font-awesome-icon :icon="['fas', 'utensils']" aria-hidden="true" />
      </div>
    </div>
    <span class="d3-foto__contato" aria-hidden="true"></span>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Largura da versão de 960 das fotos de produto
const LARGURA = 960;

const props = defineProps({
  // { src, srcset, sizes } do responsiveImage
  imagem: {
    type: Object,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  falhou: {
    type: Boolean,
    default: false,
  },
  // Largura e altura do quadro
  proporcao: {
    type: Array,
    default: () => [4, 3],
  },
});

const emit = defineEmits(["erro"]);

const altura = computed(() => Math.round((LARGURA * props.proporcao[1]) / props.proporcao[0]));
</script>

<style scoped lang="scss">
@use "../scss/foto";
</style>
