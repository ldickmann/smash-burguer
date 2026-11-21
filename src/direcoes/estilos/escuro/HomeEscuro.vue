<!-- Home em Dark mode, "A Brasa pelas diretrizes", rodada 2 (só desenvolvimento). Só composição: a
     página é uma escala de luz ("degraus de luz", docs/direcoes/desenho/escuro.md): a foto larga do palco
     é a única luz, na base N6; a vitrine abre na caixa N12 com os cards N17 e a legenda em tertiary; a
     faixa da junto em N12, o turno de novo na base e o rodapé afundado em N4. -->
<template>
  <MolduraDirecao estilo="escuro">
    <template #topo>
      <EscBarra :inicio="INICIO" />
    </template>

    <EscSecaoPalco />
    <EscSecaoVitrine />
    <EscSecaoJunto />
    <EscSecaoTurno />

    <template #rodape>
      <EscRodape :inicio="INICIO" />
    </template>
  </MolduraDirecao>
</template>

<script setup>
// As fontes aprovadas (Bebas Neue e Archivo) já são as do app, importadas no main.js
import "./_tokens.scss";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import EscBarra from "./componentes/EscBarra.vue";
import EscRodape from "./componentes/EscRodape.vue";
import EscSecaoJunto from "./secoes/EscSecaoJunto.vue";
import EscSecaoPalco from "./secoes/EscSecaoPalco.vue";
import EscSecaoTurno from "./secoes/EscSecaoTurno.vue";
import EscSecaoVitrine from "./secoes/EscSecaoVitrine.vue";

// Antes de tudo: liga os tokens do estilo ao <html>
useEstiloAtivo("escuro", { esquema: "dark" });

const INICIO = "/direcoes/escuro";
</script>

<style scoped lang="scss">
@use "@/assets/styles/base/breakpoints" as *;

// Layout da moldura: a MolduraDirecao não tem estilo próprio
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

// Ritmo vertical: --space-7 entre as seções e --space-8 a partir de lg. A faixa da junto vai de ponta
// a ponta do <main>; as outras seções usam o contêiner
.moldura :deep(.moldura__conteudo) {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-7);
  min-width: 0;
  padding-bottom: var(--space-7);

  @include up(lg) {
    gap: var(--space-8);
    padding-bottom: var(--space-8);
  }
}
</style>
