<!-- O painel da foto: a única cor da página, dentro da linha aberta. Caixa 4:3 em --color-surface-4
     enquanto carrega (sem salto de layout [M33]), lazy porque não está no hero [M31]. Imagem data: do
     painel vai sem <source>. Se a imagem falha, o nome entra em Archivo Expanded no lugar dela. -->
<template>
  <div :id="id" class="mn-foto">
    <picture v-if="imagem.src && !falhou" class="mn-foto__picture">
      <source v-if="imagem.srcset" type="image/webp" :srcset="imagem.srcset" :sizes="imagem.sizes" />
      <img
        class="mn-foto__img"
        :src="imagem.src"
        :alt="nome"
        width="960"
        height="720"
        loading="lazy"
        decoding="async"
        @error="emit('erro')"
      />
    </picture>
    <p v-else class="mn-foto__reserva" aria-hidden="true">{{ nome }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  // { src, srcset, sizes } do useCartaoProduto
  imagem: {
    type: Object,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  falhou: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["erro"]);
</script>

<style scoped lang="scss">
@use "../scss/foto";
</style>
