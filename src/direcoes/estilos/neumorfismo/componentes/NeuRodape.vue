<!-- O <footer>: um sulco prensado no kraft e uma linha simples com a marca, a descrição, a navegação
     repetida e os direitos. Sem títulos (a ordem dos h2 e h3 da página não salta) e sem redes, cujos
     links são genéricos. -->
<template>
  <footer class="neu-rodape">
    <div class="container">
      <span class="neu-rodape__sulco" aria-hidden="true" />
      <div class="neu-rodape__grade">
        <div class="neu-rodape__marca">
          <p class="neu-rodape__nome">{{ MARCA }}</p>
          <p class="neu-rodape__descricao">{{ DESCRICAO }}</p>
        </div>

        <nav class="neu-rodape__nav" :aria-label="TEXTOS.rodapeNav">
          <ul class="neu-rodape__lista" role="list">
            <li v-for="link in links" :key="link.to">
              <RouterLink :to="link.to" class="neu-rodape__link">{{ link.rotulo }}</RouterLink>
            </li>
          </ul>
        </nav>

        <p class="neu-rodape__direitos">{{ RODAPE.copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { DESCRICAO, MARCA, RODAPE } from "../../../compartilhado/dados";
import { useLinksPrincipais } from "../../../compartilhado/useLinksPrincipais";
import { TEXTOS } from "../textos";

const props = defineProps({
  inicio: {
    type: String,
    required: true,
  },
});

defineEmits([]);

const links = useLinksPrincipais(props.inicio);
</script>

<style scoped lang="scss">
@use "../scss/rodape";
</style>
