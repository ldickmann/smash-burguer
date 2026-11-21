<!-- Rodapé quieto: a marca, a navegação repetida no fim da página [M8] e a linha de direitos. Sem redes
     (links genéricos prometem o que não entregam [M7][H26]), sem descrição e sem régua. -->
<template>
  <footer class="mn-rodape">
    <div class="mn-rodape__interno">
      <div class="mn-rodape__linha">
        <p class="mn-rodape__marca">{{ MARCA }}</p>
        <nav class="mn-rodape__nav" :aria-label="TEXTOS.rodape">
          <ul class="mn-rodape__lista" role="list">
            <li v-for="link in links" :key="link.to">
              <RouterLink :to="link.to" class="mn-rodape__link">{{ link.rotulo }}</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <p class="mn-rodape__direitos">{{ RODAPE.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { MARCA, RODAPE } from "../../../compartilhado/dados";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";
import { TEXTOS } from "../textos";

const props = defineProps({
  inicio: {
    type: String,
    required: true,
  },
});

const links = useLinksPrincipais(props.inicio);
</script>

<style scoped lang="scss">
@use "../scss/rodape";
</style>
