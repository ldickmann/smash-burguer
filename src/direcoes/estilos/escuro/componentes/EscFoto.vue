<!-- Foto de produto com reserva na proporção (N22), falha (ícone da categoria) e imagem data: do painel
     (só o <img>, sem <source>). `atenuada` baixa o brilho (fundos claros no escuro [46][47][50]);
     `dissolvida` apaga a borda do lado do texto, para a foto se apagar na faixa. -->
<template>
  <div
    class="esc-foto"
    :class="{ 'esc-foto--atenuada': atenuada, 'esc-foto--dissolvida': dissolvida && !falhou }"
    :style="{ aspectRatio: proporcao }"
  >
    <picture v-if="imagem.src && !falhou" class="esc-foto__picture">
      <source v-if="imagem.srcset" type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
      <img
        class="esc-foto__img"
        :src="imagem.src"
        :alt="alt"
        :width="largura"
        :height="altura"
        loading="lazy"
        decoding="async"
        @error="emit('erro')"
      />
    </picture>
    <div v-else class="esc-foto__reserva">
      <font-awesome-icon :icon="icone" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { faGlassWater, faIceCream } from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  imagem: {
    type: Object,
    required: true,
  },
  alt: {
    type: String,
    required: true,
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
  categoria: {
    type: String,
    default: "foods",
    validator: (valor) => ["foods", "drinks", "desserts"].includes(valor),
  },
  proporcao: {
    type: String,
    default: "1 / 1",
  },
  atenuada: {
    type: Boolean,
    default: false,
  },
  dissolvida: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["erro"]);

const ICONES = { foods: ["fas", "burger"], drinks: faGlassWater, desserts: faIceCream };
const icone = computed(() => ICONES[props.categoria] ?? ICONES.foods);
</script>

<style scoped lang="scss">
@use "../scss/foto";
</style>
