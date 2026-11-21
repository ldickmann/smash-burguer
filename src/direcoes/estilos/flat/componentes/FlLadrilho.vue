<!-- Ladrilho da tela inicial: um <button> inteiro e chapado, sem nada clicável dentro, com a área de
     contagem no alto à direita, o ícone ou a imagem no meio e o nome embaixo à esquerda [F28][F37].
     Texto e imagem ficam em células diferentes da grade: nada de texto sobre a foto [F16][H5]. -->
<template>
  <button
    type="button"
    class="fl-ladrilho"
    :class="[`fl-ladrilho--${cor}`, { 'fl-ladrilho--imagem': imagem, 'fl-ladrilho--entra': ordem > 0 }]"
    :style="ordem > 0 ? { '--fl-ordem': ordem } : undefined"
    :data-destino="destino"
    :aria-label="rotuloAcessivel"
    @click="emit('ativar', destino)"
  >
    <span v-if="contagem" class="fl-ladrilho__contagem tabular">{{ contagem }}</span>
    <span class="fl-ladrilho__meio">
      <picture v-if="imagem && !imagemFalhou" class="fl-ladrilho__foto">
        <source v-if="imagem.srcset" type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
        <img
          class="fl-ladrilho__img"
          :src="imagem.src"
          alt=""
          :width="imagem.largura"
          :height="imagem.altura"
          :loading="prioritaria ? 'eager' : 'lazy'"
          :fetchpriority="prioritaria ? 'high' : undefined"
          decoding="async"
          @error="aoFalharImagem"
        />
      </picture>
      <font-awesome-icon v-else-if="icone && !imagem" :icon="icone" class="fl-ladrilho__icone" aria-hidden="true" />
    </span>
    <span class="fl-ladrilho__nome">{{ rotulo }}</span>
    <span v-if="detalhe" class="fl-ladrilho__detalhe">{{ detalhe }}</span>
  </button>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  destino: {
    type: String,
    required: true,
  },
  rotulo: {
    type: String,
    required: true,
  },
  rotuloAcessivel: {
    type: String,
    required: true,
  },
  // cheddar, cebola, alface ou tinta
  cor: {
    type: String,
    default: "cebola",
  },
  contagem: {
    type: String,
    default: "",
  },
  detalhe: {
    type: String,
    default: "",
  },
  icone: {
    type: [Array, Object],
    default: null,
  },
  // { src, srcset, sizes, largura, altura }
  imagem: {
    type: Object,
    default: null,
  },
  prioritaria: {
    type: Boolean,
    default: false,
  },
  // Posição na entrada da montagem (0: não anima)
  ordem: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["ativar"]);

// Imagem que falha: o meio fica vazio e o ladrilho continua inteiro
const imagemFalhou = ref(false);
const aoFalharImagem = () => (imagemFalhou.value = true);
</script>

<style scoped lang="scss">
@use "../scss/ladrilho";
</style>
