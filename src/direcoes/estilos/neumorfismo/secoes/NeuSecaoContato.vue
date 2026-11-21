<!-- Horário e contato, antes do rodapé e direto no kraft: o horário em poços por dia (uma leitura,
     não um controle) com o texto real logo abaixo, o endereço e os contatos como controles em
     relevo com borda. Rótulo e valor separados, sem juntar com "·". -->
<template>
  <section data-secao="contato" aria-labelledby="neu-contato-titulo" class="neu-contato container">
    <h2 id="neu-contato-titulo" class="neu-contato__titulo">{{ TEXTOS.contatoTitulo }}</h2>

    <div class="neu-contato__grupos">
      <div class="neu-contato__grupo neu-contato__grupo--horario">
        <h3 class="neu-contato__subtitulo">{{ RODAPE.horario }}</h3>
        <NeuSemana :texto="HORARIO" :dias="TEXTOS.diasSemana" />
        <p class="neu-contato__horario">{{ HORARIO }}</p>
      </div>

      <div v-if="endereco" class="neu-contato__grupo">
        <h3 class="neu-contato__subtitulo">{{ RODAPE.endereco }}</h3>
        <NeuControle class="neu-contato__controle" :href="endereco.href" :externo="endereco.externo" :icone="endereco.icone">
          <span class="neu-contato__valor">{{ ENDERECO }}</span>
        </NeuControle>
      </div>

      <div v-if="contatos.length" class="neu-contato__grupo">
        <h3 class="neu-contato__subtitulo">{{ TEXTOS.contatoSubtitulo }}</h3>
        <ul class="neu-contato__lista" role="list">
          <li v-for="contato in contatos" :key="contato.chave">
            <NeuControle class="neu-contato__controle" :href="contato.href" :externo="contato.externo" :icone="contato.icone">
              <span class="neu-contato__rotulo">{{ contato.rotulo }}</span>
              <span class="neu-contato__valor">{{ contato.valor }}</span>
            </NeuControle>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CONTATOS, EMAIL, ENDERECO, HORARIO, RODAPE, TELEFONE } from "../../../compartilhado/dados";
import { TEXTOS } from "../textos";
import NeuControle from "../componentes/NeuControle.vue";
import NeuSemana from "../componentes/NeuSemana.vue";

const endereco = CONTATOS.find((contato) => contato.chave === "endereco");

// O link de cada contato vem de CONTATOS; o rótulo, do textos.js, e o valor, de dados.js
const VALORES = {
  whatsapp: { rotulo: TEXTOS.whatsapp, valor: TELEFONE },
  email: { rotulo: TEXTOS.email, valor: EMAIL },
};
const contatos = CONTATOS.filter((contato) => VALORES[contato.chave]).map((contato) => ({
  ...contato,
  ...VALORES[contato.chave],
}));
</script>

<style scoped lang="scss">
@use "../scss/secao-contato";
</style>
