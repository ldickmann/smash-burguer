<!-- Turno: o horário real em destaque e a faixa das 24 horas, com o trecho aberto aceso cruzando a
     meia-noite [H31][H29]. Se o texto mudar de formato e não for entendido, a faixa some e o texto fica. -->
<template>
  <section data-secao="turno" aria-labelledby="esc-turno-titulo" class="esc-turno">
    <div class="container">
      <h2 id="esc-turno-titulo" class="esc-turno__titulo">{{ RODAPE.horario }}</h2>
      <p class="esc-turno__horario">{{ HORARIO }}</p>
      <EscFaixaHoras
        v-if="turno"
        class="esc-turno__faixa"
        :abre="turno.abre"
        :fecha="turno.fecha"
        :rotulo-abre="turno.rotuloAbre"
        :rotulo-fecha="turno.rotuloFecha"
        :rotulos="{ meioDia: TEXTOS.meioDia, meiaNoite: TEXTOS.meiaNoite }"
      />
    </div>
  </section>
</template>

<script setup>
import { HORARIO, RODAPE } from "../../../compartilhado/dados";
import EscFaixaHoras from "../componentes/EscFaixaHoras.vue";
import { TEXTOS } from "../textos";
import { lerTurno } from "../turno";

const turno = lerTurno(HORARIO);
</script>

<style scoped lang="scss">
@use "../scss/secao-turno";
</style>
