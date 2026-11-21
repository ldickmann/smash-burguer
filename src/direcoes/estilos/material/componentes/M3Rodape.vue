<!-- O <footer>: marca, descrição e direitos. Os contatos ficam na seção "onde", logo acima; as redes
     saíram (os links eram genéricos). -->
<template>
  <footer class="m3-rodape">
    <div class="m3-rodape__interno container">
      <p class="m3-rodape__nome">{{ MARCA }}</p>
      <p class="m3-rodape__descricao">{{ DESCRICAO }}</p>
      <p class="m3-rodape__copy">{{ RODAPE.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { DESCRICAO, MARCA, RODAPE } from "../../../compartilhado/dados";
</script>

<style scoped lang="scss">
@use "../scss/rodape";
</style>
