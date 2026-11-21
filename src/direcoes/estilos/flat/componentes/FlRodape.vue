<!-- O <footer>: faixa preta com a marca, a descrição e o copyright [H30]. Sem as redes (os links de
     REDES são genéricos [H25][H26]) e sem repetir a navegação: o contato fica na seção logo acima. -->
<template>
  <footer class="fl-rodape">
    <div class="container">
      <div class="fl-rodape__grade">
        <p class="fl-rodape__marca">{{ MARCA }}</p>
        <p class="fl-rodape__descricao">{{ DESCRICAO }}</p>
      </div>
      <p class="fl-rodape__copy">{{ RODAPE.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { DESCRICAO, MARCA, RODAPE } from "../../../compartilhado/dados";

defineProps({});
defineEmits([]);
</script>

<style scoped lang="scss">
@use "../scss/rodape";
</style>
