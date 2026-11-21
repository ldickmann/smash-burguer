<!-- Sumário do hero: os nomes das seções da própria página, como índice [M18][H22], sem contagem nem
     preço. Cada link leva à Home com o hash (o query fica, para o ?captura=1 não se perder); o router
     rola até o título, e o foco vai para ele. -->
<template>
  <nav class="mn-sumario" :aria-label="rotulo">
    <ul class="mn-sumario__lista" role="list">
      <li v-for="item in itens" :key="item.id">
        <RouterLink v-slot="{ href, navigate }" :to="destino(item.id)" custom>
          <a :href="href" class="mn-sumario__link" @click="ir($event, navigate, item.id)">{{ item.rotulo }}</a>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";

defineProps({
  // [{ id, rotulo }]: o id é o do h2 de destino
  itens: {
    type: Array,
    required: true,
  },
  rotulo: {
    type: String,
    required: true,
  },
});

const route = useRoute();

const destino = (id) => ({ path: route.path, query: route.query, hash: `#${id}` });

async function ir(evento, navigate, id) {
  await navigate(evento);
  // Ctrl+clique e afins: o navegador cuida, sem foco
  if (!evento.defaultPrevented) return;
  // O router rola o título até a borda da janela (e não rola com o mesmo hash de novo). No quadro
  // seguinte, a rolagem é refeita com o scroll-padding da página, sempre igual, e o foco vai ao título.
  requestAnimationFrame(() => {
    const titulo = document.getElementById(id);
    if (!titulo) return;
    titulo.scrollIntoView({ block: "start" });
    titulo.focus({ preventScroll: true });
  });
}
</script>

<style scoped lang="scss">
@use "../scss/sumario";
</style>
